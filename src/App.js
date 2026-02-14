/**
 * 🐾 PAWSCORD — App.js (Refactored)
 * Main application orchestrator.
 *
 * Extracted modules:
 *   - App/lazyImports.js       → ~200 React.lazy declarations
 *   - App/useFetchWithAuth.js  → Authenticated fetch with token refresh
 *   - App/useAppInit.js        → Combined initialization (user, servers, friends)
 *   - App/useAppEffects.js     → Side effects (splash, PWA, version check, etc.)
 *   - App/useChatConnection.js → Chat + Status WebSocket connections
 *   - App/useMessageHandlers.js→ Message send/delete/pin/search/history
 *   - App/useFileUpload.js     → File upload + drag/drop + voice recording
 *   - App/useServerHandlers.js → Server drag/reorder + auth + user context actions
 *   - App/ToolbarMenu.js       → Toolbar dropdown menu component
 *   - App/InviteServerModal.js → Invite-to-server modal component
 */
import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/modern-theme.css';
import { Capacitor } from '@capacitor/core';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// --- STORES & HOOKS ---
import { useChatStore } from './stores/useChatStore';
import { useUIStore } from './stores/useUIStore';
import useResponsive from './hooks/useResponsive';
import { useOptimizedMessages, useOnlineUsers } from './hooks/useOptimizedMessages';
import { useThrottle } from './utils/performanceOptimization';
import { useDebounce } from './hooks/usePerformanceHooks';

// --- CONTEXTS ---
import { useAuth } from './AuthContext';
import { VoiceProvider, useVoice } from './VoiceContext';
import { useGlobalWebSocket } from './GlobalWebSocketContext';

// --- CRITICAL DIRECT IMPORTS (always needed) ---
import MaintenanceBanner from './components/MaintenanceBanner';
import LoadingSpinner from './components/LoadingSpinner';
import AppModals from './components/AppModals';
import SplashScreen from './SplashScreen';
import ConnectionStatusBar from './components/ConnectionStatusBar';
import ScrollToBottomButton from './components/ScrollToBottomButton';
import MessageDateDivider from './components/MessageDateDivider';
import TypingIndicatorEnhanced from './components/TypingIndicatorEnhanced';
import ImageGalleryGroup from './components/ImageGalleryGroup';
import { FaTimes, FaUsers, FaBell, FaSearch, FaMicrophone, FaHeadphones, FaVideo, FaDesktop, FaPhoneSlash } from 'react-icons/fa';

// --- LAZY IMPORTS ---
import {
    Message, VirtualMessageList, MessageInput,
    LoginPage, WelcomeScreen, KanbanBoard,
    FriendsTab, RoomList, VoiceChatPanel, ChatUserList,
    FloatingVoiceIsland, CinemaPlayer, NotificationDropdown,
    UserContextMenu, VoiceAudioController, StickyMessageBanner,
    VanityInviteScreen, InviteCodeScreen,
} from './App/lazyImports';

// --- CONFIG ---
import {
    isElectron, isNative,
    MEDIA_BASE_URL, API_BASE_URL, ABSOLUTE_HOST_URL,
    WS_PROTOCOL, API_HOST, ROOM_LIST_URL,
    CONVERSATION_LIST_URL, GET_OR_CREATE_CONVERSATION_URL,
    DRAFT_STORAGE_KEY, getTemporaryId,
    MESSAGE_HISTORY_ROOM_URL, MESSAGE_HISTORY_DM_URL,
} from './config/api';
import styles from './styles/appStyles';
import { GOOGLE_WEB_CLIENT_ID } from './utils/constants';
import confirmDialog from './utils/confirmDialog';

// --- EXTRACTED HOOKS ---
import useFetchWithAuth from './App/useFetchWithAuth';
import useAppInit from './App/useAppInit';
import useAppEffects from './App/useAppEffects';
import useChatConnection from './App/useChatConnection';
import useMessageHandlers from './App/useMessageHandlers';
import useFileUpload from './App/useFileUpload';
import useServerHandlers from './App/useServerHandlers';

// --- EXTRACTED COMPONENTS ---
import ToolbarMenu from './App/ToolbarMenu';
import InviteServerModal from './App/InviteServerModal';

// --- MAIN CONTENT ---
const AppContent = () => {
    // ─── AUTH ───
    const { user, isAuthenticated, token, login, logout, isLoading: isAuthLoading, refreshAccessToken } = useAuth();
    const username = user?.username || localStorage.getItem('username') || '';

    // ─── VOICE ───
    const {
        isInVoice, isConnecting, currentRoom: currentVoiceRoom, joinChannel, leaveChannel,
        isMuted, isDeafened, toggleMute, toggleDeafened, toggleVideo, toggleScreenShare,
        remoteVolumes, setRemoteVolume, localCameraStream, remoteStreams, isTalking,
        sendSignal, isScreenSharing, isVideoEnabled, isPttActive, localScreenStream,
        sendReaction, lastReaction, applyVoiceEffect, activeEffect,
        cinemaState, setCinemaState, gameState, sendGameSignal,
        mutedUsers, useNewVoicePanel, showVoiceIsland, setShowVoiceIsland,
        isVoicePanelMinimized, setIsVoicePanelMinimized, focusedStream, setFocusedStream,
        islandState, setIslandState,
    } = useVoice();

    // ─── GLOBAL WS ───
    const { forwardToGlobalContext, setGlobalWsConnected, defaultAvatars, setViewingProfile, viewingProfile, zoomedImage, setZoomedImage, galleryData, setGalleryData } = useGlobalWebSocket();

    // ─── STORES ───
    const { activeChat, setActiveChat, messages, setMessages, encryptionKeys, setEncryptionKey, voiceUsers, setVoiceUsersState, unreadCounts, selectedMessages, setSelectedMessages } = useChatStore();
    const { modals, openModal, closeModal, toggleModal, animationState, setAnimationState, isConnected, setIsConnected, updateStatusText, setUpdateStatusText, downloadProgress, setDownloadProgress, isDownloading, setIsDownloading, searchQuery, setSearchQuery, dropTarget, setDropTarget } = useUIStore();

    // ─── RESPONSIVE ───
    const { isMobile, isLeftSidebarVisible, setIsLeftSidebarVisible, isRightSidebarVisible, setIsRightSidebarVisible, safeAreaBottom } = useResponsive();
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // ─── LOCAL STATE ───
    const [currentTheme, setCurrentTheme] = useState('default');
    const [messageHistoryLoading, setMessageHistoryLoading] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
    const [messageHistoryOffset, setMessageHistoryOffset] = useState(0);
    const [friendsList, setFriendsList] = useState([]);
    const [pendingFriendRequests, setPendingFriendRequests] = useState(0);
    const [serverOrder, setServerOrder] = useState([]);
    const [serverMembers, setServerMembers] = useState([]);
    const [selectedServer, setSelectedServer] = useState(null);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [soundSettings, setSoundSettings] = useState(() => JSON.parse(localStorage.getItem('chat_sound_settings')) || { notifications: true, mentions: true, userJoinLeave: true });
    const [maintenanceMode, setMaintenanceMode] = useState(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);
    const [replyingTo, setReplyingTo] = useState(null);
    const [forwardingMessage, setForwardingMessage] = useState(null);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [userContextMenu, setUserContextMenu] = useState(null);
    const [inviteToServerUser, setInviteToServerUser] = useState(null);
    const [showVanityInvite, setShowVanityInvite] = useState(null);
    const [showInviteCode, setShowInviteCode] = useState(null);
    const [categories, setCategories] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [pinnedMessages, setPinnedMessages] = useState([]);
    const [authError, setAuthError] = useState(null);
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    const [summaryResult, setSummaryResult] = useState("");
    const [chartSymbol, setChartSymbol] = useState(null);
    const [hasDraftMessage, setHasDraftMessage] = useState(false);
    const [draftText, setDraftText] = useState('');

    // ─── REFS ───
    const messagesEndRef = useRef(null);
    const messageBoxRef = useRef(null);
    const searchInputRef = useRef(null);
    const richTextRef = useRef(null);
    const fileInputRefNormal = useRef(null);
    const historyCacheRef = useRef({});
    const statusWsRef = useRef(null);
    const statusWsReconnectRef = useRef(null);
    const activeChatRef = useRef(activeChat);
    const tokenRef = useRef(token);
    const usernameRef = useRef(username);

    useEffect(() => { activeChatRef.current = activeChat; }, [activeChat]);
    useEffect(() => { tokenRef.current = token; }, [token]);
    useEffect(() => { usernameRef.current = username; }, [username]);

    // ─── FETCH WITH AUTH ───
    const { fetchWithAuth } = useFetchWithAuth();

    // ─── COMPUTED ───
    const typingUsers = useChatStore(state => state.typingUsers);
    const activeTypingUsers = useMemo(() => typingUsers.filter(u => u !== username), [typingUsers, username]);
    const onlineUsers = useChatStore(state => state.onlineUsers);
    const { setOnlineUsers } = useChatStore();
    const rawMessages = useChatStore(state => state.messages);
    const optimizedMessages = useOptimizedMessages(rawMessages, debouncedSearchQuery, activeChat);
    const optimizedOnlineUsers = useOnlineUsers(allUsers);

    const isAdmin = username === 'Eastkhan' || username === 'PawPaw' || currentUserProfile?.role === 'admin';

    const currentUserPermissions = useMemo(() => {
        const currentServer = categories?.find(c => c.id === activeChat?.serverId);
        const isServerOwner = currentServer?.owner === username || currentServer?.created_by === username;
        const isMod = serverMembers?.find(m => m.username === username)?.role === 'moderator';
        return {
            isAdmin, isServerOwner, isModerator: isMod,
            canKick: isAdmin || isServerOwner || isMod, canBan: isAdmin || isServerOwner,
            canMute: isAdmin || isServerOwner || isMod, canWarn: isAdmin || isServerOwner || isMod,
            canManageRoles: isAdmin || isServerOwner
        };
    }, [isAdmin, categories, activeChat?.serverId, username, serverMembers]);

    const sortedServers = useMemo(() => {
        if (!categories || categories.length === 0) return [];
        if (!serverOrder || serverOrder.length === 0) return categories;
        const ordered = [], unordered = [];
        serverOrder.forEach(id => { const s = categories.find(c => c.id === id); if (s) ordered.push(s); });
        categories.forEach(s => { if (!serverOrder.includes(s.id)) unordered.push(s); });
        return [...ordered, ...unordered];
    }, [categories, serverOrder]);

    const chatTitle = useMemo(() => {
        if (activeChat.type === 'room') {
            if (categories) {
                for (const server of categories) {
                    if (server.categories) {
                        for (const cat of server.categories) {
                            const foundRoom = cat.rooms?.find(r => r.slug === activeChat.id);
                            if (foundRoom) return String(foundRoom.name);
                        }
                    }
                }
            }
            return String(activeChat.id);
        } else if (activeChat.type === 'dm') return `@ ${String(activeChat.targetUser || 'DM')}`;
        return '';
    }, [activeChat, categories]);

    const activeRoomType = useMemo(() => {
        if (activeChat.type !== 'room' || !categories) return 'text';
        for (const srv of categories) {
            if (srv.categories) {
                for (const cat of srv.categories) {
                    const room = cat.rooms?.find(r => r.slug === activeChat.id);
                    if (room) return room.channel_type;
                }
            }
        }
        return 'text';
    }, [activeChat, categories]);

    const isImageOnlyMessage = (msg) => {
        if (!msg) return false;
        const hasImage = !!(msg.image_url || msg.image);
        const hasFileImage = !!(msg.file_url || msg.file) && !msg.is_voice_message && /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(msg.file_name || '');
        const hasContent = !!(msg.content && msg.content.trim());
        return (hasImage || hasFileImage) && !hasContent && !msg.poll && !msg.reply_to;
    };

    // ─── SCROLL ───
    const scrollToBottom = useCallback((behavior = 'auto') => {
        if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior });
    }, []);

    const isNearBottom = useCallback(() => {
        const el = messageBoxRef.current;
        if (!el) return true;
        return (el.scrollHeight - el.scrollTop - el.clientHeight) < 160;
    }, []);

    const handleMessageScroll = useCallback(() => {
        const el = messageBoxRef.current;
        if (!el) return;
        setShowScrollToBottom((el.scrollHeight - el.scrollTop - el.clientHeight) > 160);
    }, []);

    const throttledHandleMessageScroll = useThrottle(handleMessageScroll, 100);

    // ─── AVATARS ───
    const getDeterministicAvatar = useCallback((uname) => {
        if (uname === '⚡ Signal Bot') return `${MEDIA_BASE_URL}/static/bot/signal.png`;
        if (uname === 'PawPaw AI') return `${MEDIA_BASE_URL}/static/bot/ai.png`;
        if (!uname || !defaultAvatars || defaultAvatars.length === 0) return `${MEDIA_BASE_URL}/avatars/cat_1.png`;
        let hash = 0;
        for (let i = 0; i < uname.length; i++) hash = uname.charCodeAt(i) + ((hash << 5) - hash);
        const index = Math.abs(hash % defaultAvatars.length);
        const avatarItem = defaultAvatars[index];
        let path;
        if (typeof avatarItem === 'object' && avatarItem !== null) path = avatarItem.original || avatarItem.thumbnail || avatarItem.url;
        else if (typeof avatarItem === 'string') path = avatarItem;
        if (!path || typeof path !== 'string') return `${MEDIA_BASE_URL}/avatars/cat_1.png`;
        if (path.startsWith('http') || path.startsWith('blob:')) return path;
        if (!path.startsWith('/')) path = '/' + path;
        return `${MEDIA_BASE_URL}${path}`;
    }, [defaultAvatars]);

    const getRealUserAvatar = useCallback((targetUsername) => {
        const userObj = allUsers.find(u => u.username === targetUsername);
        if (userObj && userObj.avatar && typeof userObj.avatar === 'string') {
            if (userObj.avatar.startsWith('http') || userObj.avatar.startsWith('blob:')) return userObj.avatar;
            let avatarPath = userObj.avatar;
            if (!avatarPath.startsWith('/')) avatarPath = '/' + avatarPath;
            return `${MEDIA_BASE_URL}${avatarPath}`;
        }
        return getDeterministicAvatar(targetUsername);
    }, [allUsers, getDeterministicAvatar]);

    // ─── DRAFT SYSTEM ───
    const chatDraftKey = useMemo(() => (!activeChat || !activeChat.id) ? '' : `${activeChat.type}-${activeChat.id}`, [activeChat]);

    const loadDraftMap = useCallback(() => {
        try { const raw = localStorage.getItem(DRAFT_STORAGE_KEY); if (!raw) return {}; const parsed = JSON.parse(raw); return parsed && typeof parsed === 'object' ? parsed : {}; }
        catch (e) { return {}; }
    }, []);

    const persistDraft = useCallback((value) => {
        if (!chatDraftKey) return;
        const map = loadDraftMap();
        map[chatDraftKey] = value;
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(map));
    }, [chatDraftKey, loadDraftMap]);

    useEffect(() => {
        if (!chatDraftKey) { setDraftText(''); setHasDraftMessage(false); return; }
        const drafts = loadDraftMap();
        const restored = drafts[chatDraftKey] || '';
        setDraftText(restored);
        setHasDraftMessage(!!restored.trim());
    }, [chatDraftKey, loadDraftMap]);

    // ─── NAVIGATION ───
    const handleRoomChange = (slug) => {
        setActiveChat('room', slug);
        if (isMobile) setIsLeftSidebarVisible(false);
    };

    const handleDMClick = (targetUser) => {
        fetchWithAuth(GET_OR_CREATE_CONVERSATION_URL, { method: 'POST', body: JSON.stringify({ target_username: targetUser }) })
            .then(r => r.json())
            .then(data => { setActiveChat('dm', data.conversation_id, targetUser); if (isMobile) setIsLeftSidebarVisible(false); });
    };

    const navigateToPath = useCallback((hashPath) => {
        if (!hashPath) return;
        window.location.hash = hashPath.startsWith('#/') ? hashPath : `#${hashPath.startsWith('/') ? hashPath : `/${hashPath}`}`;
        if (isMobile) setIsRightSidebarVisible(false);
    }, [isMobile]);

    const handleWelcomeClick = useCallback(() => {
        setActiveChat('welcome', 'welcome', null);
        if (isMobile) setIsLeftSidebarVisible(false);
    }, [isMobile]);

    const toggleNotifications = useCallback(() => {
        setSoundSettings(prev => {
            const next = { ...prev, notifications: !prev.notifications };
            localStorage.setItem('chat_sound_settings', JSON.stringify(next));
            return next;
        });
    }, []);

    const handleCopyLink = useCallback(async () => {
        if (!activeChat?.id) return;
        const link = `${window.location.origin}/#/${activeChat.type === 'dm' ? `dm/${activeChat.id}` : `room/${activeChat.id}`}`;
        try { await navigator.clipboard.writeText(link); setUpdateStatusText('Link kopyalandı'); setTimeout(() => setUpdateStatusText(''), 1500); }
        catch (e) { console.error('Link kopyalanamadı', e); }
    }, [activeChat]);

    // ═══════════════════════════════════════════════════════════════
    // EXTRACTED HOOKS
    // ═══════════════════════════════════════════════════════════════

    const { isInitialDataLoaded, stickyMessage, setStickyMessage, handleServerSelect } = useAppInit({
        isAuthenticated, username, token, fetchWithAuth,
        setCategories, setConversations, setAllUsers, setFriendsList,
        setCurrentUserProfile, setServerOrder, setMaintenanceMode,
        setAuthError, setServerMembers,
        API_BASE_URL, ROOM_LIST_URL, CONVERSATION_LIST_URL,
        activeChat, categories, setActiveChat,
    });

    // Shared ws ref to break circular dependency between message handlers and chat connection
    const sharedWsRef = useRef(null);

    const messageHandlers = useMessageHandlers({
        activeChat, username, token, ws: sharedWsRef,
        encryptionKeys, setMessages, scrollToBottom, isNearBottom,
        setEditingMessage, setHasDraftMessage, setDraftText, persistDraft,
        setStickyMessage, richTextRef, fetchWithAuth,
        currentUserProfile, getDeterministicAvatar,
        historyCacheRef, setHasMoreMessages, setMessageHistoryOffset,
        setIsSummaryLoading, setSummaryResult, setPinnedMessages,
        setConversations, setMessageHistoryLoading,
        openModal, closeModal,
        API_BASE_URL, MESSAGE_HISTORY_ROOM_URL, MESSAGE_HISTORY_DM_URL,
    });

    const { ws } = useChatConnection({
        activeChat, username, token, isAuthenticated, isInitialDataLoaded,
        fetchWithAuth, scrollToBottom, isNearBottom, setMessages,
        setIsConnected, historyCacheRef, setHasMoreMessages, setMessageHistoryOffset,
        fetchMessageHistory: messageHandlers.fetchMessageHistory, setShowScrollToBottom,
        API_BASE_URL, API_HOST, WS_PROTOCOL,
        forwardToGlobalContext, setGlobalWsConnected,
        setOnlineUsers, setVoiceUsersState, setAllUsers, setCurrentUserProfile,
        activeChatRef, tokenRef, usernameRef,
        setCategories, ROOM_LIST_URL,
        statusWsRef, statusWsReconnectRef,
        logout, refreshAccessToken,
        setCurrentTheme,
    });

    // Sync ws ref so message handlers always have access to the current WebSocket
    useEffect(() => {
        if (ws) sharedWsRef.current = ws.current;
    }, [ws]);

    const fileUpload = useFileUpload({
        activeChat, username, fetchWithAuth, scrollToBottom,
        setMessages, API_BASE_URL,
        handleDMClick, conversations, categories,
    });

    const serverHandlers = useServerHandlers({
        username, fetchWithAuth, categories, allUsers, friendsList,
        serverMembers, isAdmin, currentVoiceRoom: currentVoiceRoom,
        setUpdateStatusText, setFriendsList, setInviteToServerUser,
        API_BASE_URL, handleDMClick, isInVoice,
        setServerOrder, serverOrder,
        setActiveChat, setCurrentUserProfile, setCategories,
        setConversations, setAllUsers, setIsInitialDataLoaded: () => {},
        setAuthError, login, logout, setViewingProfile,
        ABSOLUTE_HOST_URL, ROOM_LIST_URL,
    });

    const { safeAreaTop } = useAppEffects({
        setAnimationState, setShowVanityInvite, setShowInviteCode,
        setMaintenanceMode, setUpdateAvailable, setAllUsers,
        animationState, isInitialDataLoaded, isAuthenticated, username,
        messages, activeChat, isInVoice, currentVoiceRoom, modals,
        statusWsRef,
        openModal, closeModal, toggleModal, setActiveChat,
        isNative, isElectron,
        fetchWithAuth, isNearBottom, scrollToBottom, handleMessageScroll,
        API_BASE_URL, MEDIA_BASE_URL,
        GOOGLE_WEB_CLIENT_ID,
    });

    // ─── UPDATE HANDLER ---
    const handleStartUpdate = () => {
        if (isElectron) {
            setIsDownloading(true); setUpdateStatusText('İndiriliyor...');
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('start-download', `${ABSOLUTE_HOST_URL}/media/build/Pawscord-Setup.exe`);
        } else {
            window.open(`${ABSOLUTE_HOST_URL}/media/build/Pawscord-Setup.exe`, '_blank');
        }
    };

    useEffect(() => {
        if (isElectron) {
            const { ipcRenderer } = window.require('electron');
            const handleProgress = (event, progress) => setDownloadProgress(Math.round(progress * 100));
            const handleComplete = () => { setUpdateStatusText('Başlatılıyor...'); setDownloadProgress(100); setTimeout(() => setUpdateStatusText('Kapanıyor...'), 1500); };
            const handleError = (event, error) => { setIsDownloading(false); };
            ipcRenderer.on('download-progress', handleProgress);
            ipcRenderer.on('download-complete', handleComplete);
            ipcRenderer.on('download-error', handleError);
            return () => { ipcRenderer.removeAllListeners('download-progress'); ipcRenderer.removeAllListeners('download-complete'); ipcRenderer.removeAllListeners('download-error'); };
        }
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // RENDER
    // ═══════════════════════════════════════════════════════════════

    const showSplash = animationState !== 'finished';
    const mobileWebPadding = (isMobile && !isNative) ? '20px' : safeAreaTop;
    const currentKeyId = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
    const hasKey = !!encryptionKeys[currentKeyId];

    // --- AUTH SCREEN ---
    if (!isAuthenticated) return (
        <>
            {showSplash && <SplashScreen animationState={animationState} />}
            <Suspense fallback={<LoadingSpinner size="large" text="Yükleniyor..." />}>
                <LoginPage onLogin={serverHandlers.handleLogin} onRegister={serverHandlers.handleRegister} error={authError} setAuthError={setAuthError} />
            </Suspense>
        </>
    );

    // --- VANITY / INVITE SCREENS ---
    if (showVanityInvite) return (
        <Suspense fallback={<LoadingSpinner size="large" text="Davet yükleniyor..." />}>
            <VanityInviteScreen vanityPath={showVanityInvite} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL}
                onClose={() => { setShowVanityInvite(null); window.location.hash = '#/'; }} />
        </Suspense>
    );

    if (showInviteCode) return (
        <Suspense fallback={<LoadingSpinner size="large" text="Davet yükleniyor..." />}>
            <InviteCodeScreen inviteCode={showInviteCode} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL}
                onClose={() => { setShowInviteCode(null); window.location.hash = '#/'; }} />
        </Suspense>
    );

    // --- MAIN APP ---
    return (
        <div style={{ ...styles.mainContainer }} className="dark-theme">
            {showSplash && <SplashScreen animationState={animationState} />}
            {maintenanceMode && <MaintenanceBanner message={maintenanceMode.message} endTime={maintenanceMode.endTime} level={maintenanceMode.level} onDismiss={() => setMaintenanceMode(null)} />}

            <AppModals
                fetchWithAuth={fetchWithAuth} activeChat={activeChat} username={username}
                sendMessage={messageHandlers.sendMessage} sendSignal={sendSignal} ws={ws}
                currentUserProfile={currentUserProfile} setCurrentUserProfile={setCurrentUserProfile}
                currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}
                soundSettings={soundSettings} setSoundSettings={setSoundSettings}
                encryptionKeys={encryptionKeys} currentKeyId={currentKeyId} setEncryptionKey={setEncryptionKey}
                chartSymbol={chartSymbol} setChartSymbol={setChartSymbol}
                serverToEdit={serverHandlers.serverToEdit} setServerToEdit={serverHandlers.setServerToEdit}
                serverMembers={serverMembers} friendsList={friendsList}
                conversations={conversations} categories={categories} allUsers={allUsers}
                pinnedMessages={pinnedMessages}
                isSummaryLoading={isSummaryLoading} summaryResult={summaryResult}
                zoomedImage={zoomedImage} setZoomedImage={setZoomedImage}
                galleryData={galleryData} setGalleryData={setGalleryData}
                viewingProfile={viewingProfile} setViewingProfile={setViewingProfile}
                isAdmin={isAdmin} richTextRef={richTextRef} logout={logout}
                getDeterministicAvatar={getDeterministicAvatar}
                handleSendSnippet={messageHandlers.handleSendSnippet}
                handleDMClick={handleDMClick} setActiveChat={setActiveChat}
                setConversations={setConversations}
                isMuted={isMuted} isDeafened={isDeafened} toggleMute={toggleMute} toggleDeafened={toggleDeafened}
            />

            {isMobile && isLeftSidebarVisible && <div style={styles.mobileOverlay} onClick={() => setIsLeftSidebarVisible(false)} />}
            {isMobile && isRightSidebarVisible && <div style={styles.mobileOverlay} onClick={() => setIsRightSidebarVisible(false)} />}

            <ConnectionStatusBar />

            <div style={styles.chatLayout}>
                {/* ─── LEFT SIDEBAR ─── */}
                {(!isMobile || isLeftSidebarVisible) && (
                    <div style={{ ...styles.sidebarWrapper, ...(isMobile && styles.mobileSidebar), paddingTop: mobileWebPadding, paddingBottom: safeAreaBottom, height: '100%', boxSizing: 'border-box' }}>
                        {isMobile && (
                            <div style={styles.mobileSidebarHeader}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src="https://media.pawscord.com/assets/logo.png" alt="" style={{ width: '24px', height: '24px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Pawscord</span>
                                </div>
                                <button onClick={() => setIsLeftSidebarVisible(false)} style={styles.closeSidebarButton}><FaTimes /></button>
                            </div>
                        )}
                        <Suspense fallback={<LoadingSpinner size="medium" text="Kanallar yükleniyor..." />}>
                            <RoomList
                                onFriendsClick={() => setActiveChat('friends', 'friends')}
                                onRoomSelect={handleRoomChange}
                                onDMSelect={(id, targetUsername) => setActiveChat('dm', id, targetUsername)}
                                onWelcomeClick={handleWelcomeClick}
                                setIsLeftSidebarVisible={setIsLeftSidebarVisible}
                                onProfileClick={() => openModal('profilePanel')}
                                onViewUserProfile={(u) => { const usr = allUsers.find(a => a.username === u); if (usr) setViewingProfile(usr); }}
                                onOpenStore={() => openModal('store')}
                                onOpenServerSettings={(server) => serverHandlers.setServerToEdit(server)}
                                categories={sortedServers}
                                onServerDragStart={serverHandlers.handleServerDragStart}
                                onServerDragOver={serverHandlers.handleServerDragOver}
                                onServerDragEnd={serverHandlers.handleServerDragEnd}
                                onServerDrop={serverHandlers.handleServerDrop}
                                onMoveServer={serverHandlers.handleMoveServer}
                                conversations={conversations} allUsers={allUsers} onlineUsers={onlineUsers}
                                serverMembers={serverMembers} isAdmin={isAdmin}
                                friendsList={friendsList} pendingFriendRequests={pendingFriendRequests}
                                currentUsername={username} currentUserProfile={currentUserProfile}
                                getRealUserAvatar={getRealUserAvatar} getDeterministicAvatar={getDeterministicAvatar}
                                unreadCounts={unreadCounts}
                                joinVoiceChat={joinChannel} leaveVoiceChat={leaveChannel}
                                voiceUsers={voiceUsers} isConnecting={isConnecting}
                                currentVoiceRoom={currentVoiceRoom} currentRoom={currentVoiceRoom}
                                currentConversationId={activeChat.type === 'dm' ? activeChat.id : null}
                                remoteVolumes={remoteVolumes} setRemoteVolume={setRemoteVolume}
                                isPttActive={isPttActive} apiBaseUrl={ABSOLUTE_HOST_URL}
                                fetchWithAuth={fetchWithAuth}
                                onHideConversation={messageHandlers.handleHideConversation}
                                handleDrop={() => {}} dropTarget={dropTarget} setDropTarget={setDropTarget}
                                isDragging={fileUpload.isDragging}
                                onOpenCreateGroup={() => openModal('groupModal')}
                                toggleMute={toggleMute} toggleDeafened={toggleDeafened}
                                isMuted={isMuted} isDeafened={isDeafened} isInVoice={isInVoice}
                                toggleVideo={toggleVideo} toggleScreenShare={toggleScreenShare}
                                isVideoEnabled={isVideoEnabled} isScreenSharing={isScreenSharing}
                                updateAvailable={updateAvailable} onUpdateClick={() => openModal('downloadModal')}
                                onOpenAnalytics={() => openModal('analytics')}
                                onOpenAdminPanel={() => openModal('adminPanel')}
                                onOpenPaymentPanel={() => openModal('paymentPanel')}
                                onOpenStoreModal={() => openModal('storeModal')}
                                onOpenDailyRewards={() => openModal('dailyRewards')}
                                onOpenAPIUsage={() => openModal('aPIUsagePanel')}
                                onOpenExportJobs={() => openModal('exportJobsPanel')}
                                onOpenScheduledAnnouncements={() => openModal('scheduledAnnouncements')}
                                onOpenMiniGames={() => openModal('miniGames')}
                                onOpenProjectCollaboration={() => openModal('projectCollaboration')}
                                onOpenAvatarStudio={() => openModal('avatarStudio')}
                                onServerSelect={handleServerSelect}
                            />
                        </Suspense>
                    </div>
                )}

                {/* ─── MAIN CONTENT ─── */}
                <div style={styles.mainContent}>
                    <div style={{ position: 'absolute', top: 60, left: 0, right: 0, zIndex: 90 }}>
                        <Suspense fallback={null}>
                            <StickyMessageBanner message={stickyMessage?.message} type={stickyMessage?.type} onDismiss={() => setStickyMessage(null)} />
                        </Suspense>
                    </div>

                    {activeChat.type === 'friends' ? (
                        <div style={{ width: '100%', height: '100%', paddingTop: mobileWebPadding }}>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Arkadaşlar yükleniyor..." />}>
                                <FriendsTab fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} onStartDM={handleDMClick}
                                    getDeterministicAvatar={getDeterministicAvatar} onClose={() => setActiveChat('welcome', 'welcome')}
                                    onPendingCountChange={setPendingFriendRequests} onlineUsers={onlineUsers} />
                            </Suspense>
                        </div>
                    ) : activeChat.type === 'welcome' ? (
                        <div style={{ width: '100%', height: '100%' }}>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Yükleniyor..." />}>
                                <WelcomeScreen isMobile={isMobile} onOpenMenu={() => setIsLeftSidebarVisible(true)}
                                    onOpenRightMenu={() => setIsRightSidebarVisible(true)}
                                    updateAvailable={updateAvailable} isDownloading={isDownloading}
                                    downloadProgress={downloadProgress} updateStatusText={updateStatusText}
                                    onStartUpdate={handleStartUpdate}
                                    onSwitchToFriends={() => { setActiveChat('friends', 'friends'); if (isMobile) setIsLeftSidebarVisible(false); }}
                                    onSwitchToAI={() => handleRoomChange('ai')}
                                    onSwitchToCinema={() => { openModal('cinema'); if (isMobile) setIsLeftSidebarVisible(false); }} />
                            </Suspense>
                        </div>
                    ) : activeRoomType === 'kanban' ? (
                        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                            <div style={styles.chatHeader}><h2># {chatTitle} (Pano)</h2></div>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Pano yükleniyor..." />}>
                                <KanbanBoard roomSlug={activeChat.id} apiBaseUrl={ABSOLUTE_HOST_URL} fetchWithAuth={fetchWithAuth} />
                            </Suspense>
                        </div>
                    ) : activeChat.type === 'voice' && isInVoice ? (
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#2f3136' }}>
                            <div style={{ ...styles.chatHeader, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {isMobile && <button onClick={() => setActiveChat('welcome', 'welcome')} style={styles.mobileMenuButton}>←</button>}
                                    <h2 style={{ margin: 0, fontSize: '1.2em' }}>🔊 {currentVoiceRoom}</h2>
                                </div>
                                <button onClick={() => { leaveChannel(); setActiveChat('welcome', 'welcome'); }}
                                    style={{ background: '#ed4245', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold' }}>
                                    Bağlantıyı Kes
                                </button>
                            </div>
                            <VoiceChatPanel roomName={currentVoiceRoom} onClose={() => { leaveChannel(); setActiveChat('welcome', 'welcome'); }}
                                isMinimized={false} onToggleMinimize={() => {}}
                                getRealUserAvatar={getRealUserAvatar} allUsers={allUsers} currentUserProfile={currentUserProfile} />
                        </div>
                    ) : (
                        <div style={{ ...styles.chatArea, position: 'relative', paddingTop: mobileWebPadding, boxSizing: 'border-box' }}
                            onDrop={fileUpload.handleChatDrop} onDragOver={(e) => e.preventDefault()}
                            onDragEnter={fileUpload.handleChatDragEnter} onDragLeave={fileUpload.handleChatDragLeave}>

                            {/* CHAT HEADER */}
                            <div style={{ ...styles.chatHeader, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', gap: '8px' }}>
                                    {isMobile && !isLeftSidebarVisible && <button onClick={() => setIsLeftSidebarVisible(true)} style={{ ...styles.mobileMenuButton, fontSize: '1.3em' }}>☰</button>}
                                    {isMobile && (activeChat.type === 'dm' || activeChat.type === 'room') && (
                                        <button onClick={() => { setActiveChat('welcome', 'welcome'); setIsLeftSidebarVisible(false); setIsRightSidebarVisible(false); }} style={{ ...styles.mobileMenuButton, fontSize: '1.2em' }}>←</button>
                                    )}
                                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: 0, fontSize: isMobile ? '1em' : '1.1em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {activeChat.type === 'dm' ? `@ ${String(activeChat.targetUser || 'DM')}` : `# ${String(chatTitle)}`}
                                    </h2>
                                    <div style={isConnected ? styles.connectionPillOnline : styles.connectionPillOffline}>{isConnected ? '✓' : '✗'}</div>
                                </div>
                                <div style={{ display: 'flex', gap: isMobile ? '5px' : '10px', alignItems: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap', position: 'relative' }}>
                                    <form onSubmit={(e) => messageHandlers.handleSearchMessages(e, debouncedSearchQuery)} style={styles.searchForm}>
                                        <input type="text" placeholder="Ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={styles.searchInput} ref={searchInputRef} />
                                        <FaSearch style={styles.searchIcon} />
                                    </form>
                                    {!isMobile && activeTypingUsers.length > 0 && <TypingIndicatorEnhanced users={activeTypingUsers} />}
                                    <button onClick={() => toggleModal('notifications')} style={{ ...styles.iconButton, color: modals.notifications ? '#5865f2' : '#b9bbbe', position: 'relative' }} title="Bildirimler"><FaBell /></button>
                                    {modals.notifications && (
                                        <div style={{ position: 'absolute', top: '54px', right: '20px', zIndex: 1000 }}>
                                            <Suspense fallback={<LoadingSpinner size="small" text="" />}>
                                                <NotificationDropdown currentUser={username} onClose={() => closeModal('notifications')} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL} />
                                            </Suspense>
                                        </div>
                                    )}
                                    <div className="toolbar-menu-container" style={{ position: 'relative' }}>
                                        <button onClick={() => toggleModal('toolbarMenu')} style={{ ...styles.iconButton, color: modals.toolbarMenu ? '#5865f2' : '#b9bbbe', fontSize: '1.2em', fontWeight: 'bold' }} title="Daha Fazla">⋮</button>
                                        {modals.toolbarMenu && (
                                            <ToolbarMenu
                                                activeChat={activeChat} hasKey={hasKey} modals={modals}
                                                soundSettings={soundSettings} isInVoice={isInVoice} username={username}
                                                openModal={openModal} closeModal={closeModal} toggleModal={toggleModal}
                                                handleCopyLink={handleCopyLink} toggleNotifications={toggleNotifications}
                                                handleSummarize={messageHandlers.handleSummarize}
                                                handleClearChat={messageHandlers.handleClearChat}
                                                handleAdminDeleteConversation={messageHandlers.handleAdminDeleteConversation}
                                            />
                                        )}
                                    </div>
                                    {isMobile && !isRightSidebarVisible && <button onClick={() => setIsRightSidebarVisible(true)} style={{ ...styles.mobileMenuButton, fontSize: '1.3em' }}><FaUsers /></button>}
                                </div>
                            </div>

                            {/* MESSAGE LIST */}
                            <div style={styles.messageBox} ref={messageBoxRef} onScroll={throttledHandleMessageScroll}>
                                <Suspense fallback={<p style={styles.systemMessage}>Mesajlar yükleniyor...</p>}>
                                    {messageHistoryLoading ? (
                                        <p style={styles.systemMessage}>Yükleniyor...</p>
                                    ) : optimizedMessages.length > 50 ? (
                                        <VirtualMessageList messages={optimizedMessages} scrollToBottom={true}
                                            renderMessage={(msg, index) => (
                                                <Message key={msg.id || msg.temp_id || index} msg={msg} currentUser={username}
                                                    absoluteHostUrl={ABSOLUTE_HOST_URL} isAdmin={isAdmin}
                                                    onImageClick={setZoomedImage} fetchWithAuth={fetchWithAuth}
                                                    allUsers={allUsers} getDeterministicAvatar={getDeterministicAvatar}
                                                    onShowChart={setChartSymbol} onDelete={messageHandlers.handleDeleteMessage}
                                                    onStartEdit={setEditingMessage} onSetReply={setReplyingTo}
                                                    onToggleReaction={() => {}} onStartForward={setForwardingMessage}
                                                    isSelectionMode={isSelectionMode} isSelected={selectedMessages.has(msg.id)}
                                                    onToggleSelection={(id) => { const s = new Set(selectedMessages); if (s.has(id)) s.delete(id); else s.add(id); setSelectedMessages(s); }}
                                                    onScrollToMessage={messageHandlers.scrollToMessage}
                                                    onViewProfile={(u) => setViewingProfile(allUsers.find(usr => usr.username === u))}
                                                    onTogglePin={messageHandlers.handleTogglePin}
                                                    onVisible={messageHandlers.handleMessageVisible} />
                                            )} />
                                    ) : (
                                        <>
                                            {(() => {
                                                const elements = [];
                                                let i = 0;
                                                while (i < optimizedMessages.length) {
                                                    const msg = optimizedMessages[i];
                                                    const key = msg.id || msg.temp_id || i;
                                                    const prevMsg = i > 0 ? optimizedMessages[i - 1] : null;
                                                    const showDateDivider = !prevMsg || (msg.timestamp && prevMsg.timestamp && new Date(msg.timestamp).toDateString() !== new Date(prevMsg.timestamp).toDateString());

                                                    if (isImageOnlyMessage(msg)) {
                                                        const galleryMsgs = [msg];
                                                        let j = i + 1;
                                                        while (j < optimizedMessages.length && isImageOnlyMessage(optimizedMessages[j]) && optimizedMessages[j].username === msg.username && msg.timestamp && optimizedMessages[j].timestamp && Math.abs(new Date(optimizedMessages[j].timestamp) - new Date(msg.timestamp)) < 300000) { galleryMsgs.push(optimizedMessages[j]); j++; }
                                                        if (galleryMsgs.length >= 2) {
                                                            elements.push(
                                                                <React.Fragment key={`gallery-${galleryMsgs.map(m => m.id || m.temp_id).join('-')}`}>
                                                                    {showDateDivider && msg.timestamp && <MessageDateDivider date={msg.timestamp} />}
                                                                    <ImageGalleryGroup messages={galleryMsgs} currentUser={username} absoluteHostUrl={ABSOLUTE_HOST_URL} isAdmin={isAdmin}
                                                                        onOpenGallery={(images, startIndex) => setGalleryData({ images, startIndex })}
                                                                        onViewProfile={(u) => setViewingProfile(allUsers.find(usr => usr.username === u))}
                                                                        onDelete={messageHandlers.handleDeleteMessage} allUsers={allUsers} getDeterministicAvatar={getDeterministicAvatar}
                                                                        fetchWithAuth={fetchWithAuth} onVisible={messageHandlers.handleMessageVisible} />
                                                                </React.Fragment>
                                                            );
                                                            i = j; continue;
                                                        }
                                                    }

                                                    elements.push(
                                                        <React.Fragment key={key}>
                                                            {showDateDivider && msg.timestamp && <MessageDateDivider date={msg.timestamp} />}
                                                            <Message msg={msg} currentUser={username} absoluteHostUrl={ABSOLUTE_HOST_URL} isAdmin={isAdmin}
                                                                onImageClick={setZoomedImage} fetchWithAuth={fetchWithAuth}
                                                                allUsers={allUsers} getDeterministicAvatar={getDeterministicAvatar}
                                                                onShowChart={setChartSymbol} onDelete={messageHandlers.handleDeleteMessage}
                                                                onStartEdit={setEditingMessage} onSetReply={setReplyingTo}
                                                                onToggleReaction={() => {}} onStartForward={setForwardingMessage}
                                                                isSelectionMode={isSelectionMode} isSelected={selectedMessages.has(msg.id)}
                                                                onToggleSelection={(id) => { const s = new Set(selectedMessages); if (s.has(id)) s.delete(id); else s.add(id); setSelectedMessages(s); }}
                                                                onScrollToMessage={messageHandlers.scrollToMessage}
                                                                onViewProfile={(u) => setViewingProfile(allUsers.find(usr => usr.username === u))}
                                                                onTogglePin={messageHandlers.handleTogglePin}
                                                                onVisible={messageHandlers.handleMessageVisible} />
                                                        </React.Fragment>
                                                    );
                                                    i++;
                                                }
                                                return elements;
                                            })()}
                                            <div ref={messagesEndRef} style={{ float: "left", clear: "both", height: 1 }} />
                                        </>
                                    )}
                                </Suspense>
                            </div>

                            {/* DRAG OVERLAY */}
                            {fileUpload.isDragging && (
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(30, 31, 34, 0.9)', border: '3px dashed #5865f2', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1000 }}>
                                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📁</div>
                                    <div style={{ color: '#5865f2', fontSize: '1.4em', fontWeight: 'bold' }}>Dosyaları buraya bırakın</div>
                                </div>
                            )}

                            {showScrollToBottom && <ScrollToBottomButton onClick={() => { scrollToBottom('smooth'); setShowScrollToBottom(false); }} unreadCount={0} />}

                            <div style={{ ...styles.inputContainer, paddingBottom: isNative ? `calc(16px + ${safeAreaBottom})` : (isMobile ? '25px' : '16px') }}>
                                {fileUpload.isUploading && fileUpload.uploadProgress > 0 && (
                                    <div style={{ position: 'absolute', top: '-40px', left: '16px', right: '16px', backgroundColor: '#2b2d31', borderRadius: '8px', padding: '8px 12px', boxShadow: '0 2px 10px rgba(0,0,0,0.3)', zIndex: 1001 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: '#b9bbbe', fontSize: '12px', whiteSpace: 'nowrap' }}>📤 Yükleniyor: {fileUpload.uploadProgress}%</span>
                                            <div style={{ flex: 1, height: '6px', backgroundColor: '#40444b', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: `${fileUpload.uploadProgress}%`, height: '100%', backgroundColor: '#5865f2', borderRadius: '3px', transition: 'width 0.3s ease' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <Suspense fallback={<div style={{ padding: '12px', color: '#72767d' }}>Yükleniyor...</div>}>
                                    <MessageInput onSendMessage={messageHandlers.sendMessage} onFileUpload={fileUpload.uploadFile}
                                        onShowCodeSnippet={() => openModal('snippetModal')}
                                        placeholder={chatTitle ? `${activeChat.type === 'dm' ? chatTitle : `# ${chatTitle}`} kanalına mesaj gönder` : 'Mesaj yaz...'}
                                        disabled={fileUpload.isUploading} fetchWithAuth={fetchWithAuth} apiBaseUrl={ABSOLUTE_HOST_URL}
                                        activeChat={activeChat} pendingFilesFromDrop={fileUpload.pendingFilesFromDrop}
                                        onClearPendingFiles={() => fileUpload.setPendingFilesFromDrop([])} />
                                </Suspense>
                            </div>
                        </div>
                    )}

                    {/* ─── RIGHT SIDEBAR ─── */}
                    {(!isMobile || isRightSidebarVisible) && (
                        <div style={{ ...styles.chatUserListPanel, ...(isMobile ? styles.mobileRightSidebar : {}), paddingTop: mobileWebPadding }}>
                            {isMobile && (
                                <div style={styles.mobileSidebarHeader}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaUsers size={18} color="#b9bbbe" />
                                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                                            {activeChat.type === 'room' ? 'Sunucu Üyeleri' : 'Arkadaşlar'}
                                        </span>
                                    </div>
                                    <button onClick={() => setIsRightSidebarVisible(false)} style={styles.closeSidebarButton}><FaTimes /></button>
                                </div>
                            )}
                            <Suspense fallback={<LoadingSpinner size="small" text="Kullanıcılar yükleniyor..." />}>
                                <ChatUserList chatUsers={[]} allUsers={allUsers} onlineUsers={onlineUsers}
                                    currentUser={username} currentUserProfile={currentUserProfile}
                                    getDeterministicAvatar={getDeterministicAvatar}
                                    onUserClick={(u) => {
                                        let user = allUsers.find(usr => usr.username === u);
                                        if (!user && serverMembers.length > 0) {
                                            const m = serverMembers.find(m => m.username === u);
                                            if (m) user = { username: m.username, display_name: m.username, avatar: getDeterministicAvatar(m.username), role: m.role || 'member' };
                                        }
                                        if (user) setViewingProfile(user);
                                    }}
                                    onUserContextMenu={(e, targetUsername) => {
                                        if (targetUsername === username) return;
                                        const targetUser = allUsers.find(u => u.username === targetUsername);
                                        if (!targetUser) return;
                                        setUserContextMenu({ x: e.clientX, y: e.clientY, user: targetUser, permissions: currentUserPermissions });
                                    }}
                                    activeChat={activeChat} serverMembers={serverMembers}
                                    friendsList={friendsList} onNavigate={navigateToPath} />
                            </Suspense>
                        </div>
                    )}
                </div>

                {/* ─── VOICE CONTROLS ─── */}
                {isInVoice && (
                    <Suspense fallback={null}>
                        <VoiceAudioController remoteStreams={remoteStreams} remoteVolumes={remoteVolumes} mutedUsers={mutedUsers} />
                    </Suspense>
                )}

                {isInVoice && !showVoiceIsland && activeChat.type !== 'voice' && (
                    <button onClick={() => setShowVoiceIsland(true)}
                        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9998, background: '#5865f2', color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                        title="Ses Panelini Aç">🎤</button>
                )}

                {isInVoice && showVoiceIsland && activeChat.type !== 'voice' && (
                    <VoiceChatPanel roomName={currentVoiceRoom}
                        onClose={() => setShowVoiceIsland(false)}
                        isMinimized={isVoicePanelMinimized}
                        onToggleMinimize={() => setIsVoicePanelMinimized(!isVoicePanelMinimized)}
                        getRealUserAvatar={getRealUserAvatar} allUsers={allUsers} currentUserProfile={currentUserProfile} />
                )}
            </div>

            {/* ─── CONTEXT MENU ─── */}
            {userContextMenu && (
                <Suspense fallback={null}>
                    <UserContextMenu x={userContextMenu.x} y={userContextMenu.y} user={userContextMenu.user}
                        currentUser={username} onClose={() => setUserContextMenu(null)}
                        onAction={serverHandlers.handleUserContextAction}
                        voiceChannels={categories.flatMap(s => (s.categories || []).flatMap(c => (c.rooms || []).filter(r => r.is_voice)))}
                        isAdmin={isAdmin} isInVoiceRoom={isInVoice} friendsList={friendsList} />
                </Suspense>
            )}

            {/* ─── INVITE MODAL ─── */}
            <InviteServerModal inviteToServerUser={inviteToServerUser} setInviteToServerUser={setInviteToServerUser}
                categories={categories} fetchWithAuth={fetchWithAuth} API_BASE_URL={API_BASE_URL} />
        </div>
    );
};

// --- APP WRAPPER ---
function App() {
    return (
        <ErrorBoundary fallbackMessage="Pawscord encountered an error. Please try refreshing the page.">
            <VoiceProvider>
                <AppContent />
            </VoiceProvider>
        </ErrorBoundary>
    );
}

export default App;

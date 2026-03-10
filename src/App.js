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
 *   - App/useAppCallbacks.js   → Scroll, avatar, draft, navigation, computed values
 *   - App/ChatArea.js          → Main chat rendering (header, messages, input)
 */
import React, { useState, useEffect, useRef, useMemo, useCallback, Suspense } from 'react';
import './index.css';
import './styles/modern-theme.css';
import './App.css'; // 🎨 Professional design tokens — overrides legacy purple palette
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SuspenseWithBoundary from './components/SuspenseWithBoundary';

// --- STORES & HOOKS ---
import { useChatStore } from './stores/useChatStore';
import { useUIStore } from './stores/useUIStore';
import useResponsive from './hooks/useResponsive';
import { useOptimizedMessages, useOnlineUsers } from './hooks/useOptimizedMessages';
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
import MobileNav from './components/MobileNav';
import JoinServerModal from './components/JoinServerModal';
import { FaTimes, FaUsers } from 'react-icons/fa';

// --- LAZY IMPORTS ---
import {
    LoginPage, WelcomeScreen, KanbanBoard,
    FriendsTab, RoomList, VoiceChatPanel, ChatUserList,
    FloatingVoiceIsland, CinemaPlayer,
    UserContextMenu, VoiceAudioController, StickyMessageBanner,
    VanityInviteScreen, InviteCodeScreen,
} from './App/lazyImports';

// --- CONFIG ---
import {
    isElectron, isNative,
    MEDIA_BASE_URL, API_BASE_URL, ABSOLUTE_HOST_URL,
    WS_PROTOCOL, API_HOST, ROOM_LIST_URL,
    CONVERSATION_LIST_URL,
    MESSAGE_HISTORY_ROOM_URL, MESSAGE_HISTORY_DM_URL,
} from './config/api';
import styles from './styles/appStyles';
import { GOOGLE_WEB_CLIENT_ID } from './utils/constants';

// --- EXTRACTED HOOKS ---
import useFetchWithAuth from './App/useFetchWithAuth';
import useAppInit from './App/useAppInit';
import useAppEffects from './App/useAppEffects';
import useChatConnection from './App/useChatConnection';
import useMessageHandlers from './App/useMessageHandlers';
import useFileUpload from './App/useFileUpload';
import useServerHandlers from './App/useServerHandlers';

// --- PUSH NOTIFICATIONS ---
import usePushNotifications from './hooks/usePushNotifications';

// --- EXTRACTED COMPONENTS ---
import ChatArea from './App/ChatArea';
import InviteServerModal from './App/InviteServerModal';

// --- EXTRACTED CALLBACKS & COMPUTED ---
import useAppCallbacks from './App/useAppCallbacks';

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
    const { setGlobalData: forwardToGlobalContext, setIsConnected: setGlobalWsConnected } = useGlobalWebSocket();

    // ─── UI STATE (previously missing — these were local state in App.js.backup) ───
    const [defaultAvatars, setDefaultAvatars] = useState([]);
    const [viewingProfile, setViewingProfile] = useState(null);
    const [zoomedImage, setZoomedImage] = useState(null);
    const [galleryData, setGalleryData] = useState(null);

    // ─── STORES ───
    const { activeChat, setActiveChat, messages, setMessages, encryptionKeys, setEncryptionKey, voiceUsers, setVoiceUsersState, unreadCounts, selectedMessages, setSelectedMessages } = useChatStore();
    const { modals, openModal, closeModal, toggleModal, animationState, setAnimationState, isConnected, setIsConnected, updateStatusText, setUpdateStatusText, downloadProgress, setDownloadProgress, isDownloading, setIsDownloading, searchQuery, setSearchQuery, dropTarget, setDropTarget } = useUIStore();

    // ─── RESPONSIVE ───
    const { isMobile } = useResponsive();
    const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(false);
    const [triggerDiscovery, setTriggerDiscovery] = useState(false);
    const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(false);
    const safeAreaBottom = isNative ? 'max(20px, env(safe-area-inset-bottom))' : '0px';
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    // ─── LOCAL STATE ───
    const [currentTheme, setCurrentTheme] = useState('default');
    const [messageHistoryLoading, setMessageHistoryLoading] = useState(false);
    const [hasMoreMessages, setHasMoreMessages] = useState(true);
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
    const [recentNavItems, setRecentNavItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem('pawscord_recent_nav') || '[]'); }
        catch (e) { return []; }
    });

    // ─── REFS ───
    const messagesEndRef = useRef(null);
    const messageBoxRef = useRef(null);
    const searchInputRef = useRef(null);
    const richTextRef = useRef(null);
    const fileInputRefNormal = useRef(null);
    const historyCacheRef = useRef(() => {
        // 🚀 Restore message cache from sessionStorage on mount
        try {
            const saved = sessionStorage.getItem('pawscord_msg_cache');
            if (saved) return JSON.parse(saved);
        } catch (e) { /* corrupt data, ignore */ }
        return {};
    });
    // Initialize the ref value if it's a function (lazy init)
    if (typeof historyCacheRef.current === 'function') {
        historyCacheRef.current = historyCacheRef.current();
    }
    const fetchMessageHistoryRef = useRef(null); // Ref for pagination (breaks circular dep)
    const statusWsRef = useRef(null);
    const statusWsReconnectRef = useRef(null);
    const activeChatRef = useRef(activeChat);
    const tokenRef = useRef(token);
    const usernameRef = useRef(username);

    useEffect(() => { activeChatRef.current = activeChat; }, [activeChat]);
    useEffect(() => { tokenRef.current = token; }, [token]);
    useEffect(() => { usernameRef.current = username; }, [username]);

    // ─── Faz 3.4: ESC closes the topmost open modal ───
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key !== 'Escape') return;
            const openKey = Object.keys(modals).find(k => modals[k] === true);
            if (openKey) closeModal(openKey);
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [modals, closeModal]);

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

    // ─── CALLBACKS & COMPUTED (extracted) ───
    const {
        scrollToBottom, isNearBottom, handleMessageScroll, throttledHandleMessageScroll,
        getDeterministicAvatar, getRealUserAvatar,
        persistDraft,
        handleRoomChange, handleDMClick, navigateToPath, handleWelcomeClick,
        toggleNotifications, handleCopyLink,
        sortedServers, chatTitle, voiceRoomDisplayName,
        activeRoomType, isAdmin, currentUserPermissions,
    } = useAppCallbacks({
        setActiveChat, setIsLeftSidebarVisible, setIsRightSidebarVisible,
        setSoundSettings, setUpdateStatusText, setShowScrollToBottom,
        setDraftText, setHasDraftMessage,
        isMobile, activeChat, defaultAvatars, allUsers,
        categories, serverOrder, currentVoiceRoom,
        username, currentUserProfile, serverMembers,
        hasMoreMessages,
        messagesEndRef, messageBoxRef,
        fetchMessageHistoryRef,
        fetchWithAuth,
    });

    // ─── Recent navigation tracker (needs chatTitle from useAppCallbacks) ───
    useEffect(() => {
        const { type, id } = activeChat || {};
        if (!type || type === 'welcome' || type === 'friends' || type === 'voice') return;
        if (!id) return;
        const label = chatTitle || String(id);
        const item = { type, id, label, ts: Date.now() };
        try {
            const stored = JSON.parse(localStorage.getItem('pawscord_recent_nav') || '[]');
            const filtered = stored.filter(x => !(x.type === type && String(x.id) === String(id)));
            const updated = [item, ...filtered].slice(0, 6);
            localStorage.setItem('pawscord_recent_nav', JSON.stringify(updated));
            setRecentNavItems(updated);
        } catch (e) { }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChat?.type, activeChat?.id, chatTitle]);

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
        historyCacheRef, setHasMoreMessages,
        setIsSummaryLoading, setSummaryResult, setPinnedMessages,
        setConversations, setMessageHistoryLoading,
        openModal, closeModal,
        API_BASE_URL, MESSAGE_HISTORY_ROOM_URL, MESSAGE_HISTORY_DM_URL,
    });

    // --- 🔔 PUSH NOTIFICATIONS ---
    const { notifyMessage } = usePushNotifications(isAuthenticated, username);

    const { ws } = useChatConnection({
        activeChat, username, token, isAuthenticated, isInitialDataLoaded,
        fetchWithAuth, scrollToBottom, isNearBottom, setMessages,
        setIsConnected, historyCacheRef, setHasMoreMessages,
        fetchMessageHistory: messageHandlers.fetchMessageHistory,
        prefetchMessages: messageHandlers.prefetchMessages,
        setShowScrollToBottom,
        API_BASE_URL, API_HOST, WS_PROTOCOL,
        forwardToGlobalContext, setGlobalWsConnected,
        setOnlineUsers, setVoiceUsersState, setAllUsers, setCurrentUserProfile,
        activeChatRef, tokenRef, usernameRef,
        setCategories, ROOM_LIST_URL,
        statusWsRef, statusWsReconnectRef,
        logout, refreshAccessToken,
        setCurrentTheme,
        notifyMessage,
    });

    // Sync ws ref so message handlers always have access to the current WebSocket
    useEffect(() => {
        if (ws) sharedWsRef.current = ws.current;
    }, [ws]);

    // Sync fetchMessageHistory ref for pagination in scroll handler
    useEffect(() => {
        fetchMessageHistoryRef.current = messageHandlers.fetchMessageHistory;
    }, [messageHandlers.fetchMessageHistory]);

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
        setConversations, setAllUsers, setIsInitialDataLoaded: () => { },
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
            const handleComplete = () => { setUpdateStatusText('Kurulum başlatılıyor...'); setDownloadProgress(100); setTimeout(() => { setUpdateStatusText('Uygulama kapanıyor...'); }, 1500); };
            const handleError = (event, error) => { setIsDownloading(false); setUpdateStatusText(''); };
            ipcRenderer.on('download-progress', handleProgress);
            ipcRenderer.on('download-complete', handleComplete);
            ipcRenderer.on('download-error', handleError);
            return () => { ipcRenderer.removeAllListeners('download-progress'); ipcRenderer.removeAllListeners('download-complete'); ipcRenderer.removeAllListeners('download-error'); };
        }
    }, []);

    // ═══════════════════════════════════════════════════════════════
    // STABLE CALLBACK REFS (prevent child re-renders from inline arrows)
    // ═══════════════════════════════════════════════════════════════
    const handleFriendsClick = useCallback(() => setActiveChat('friends', 'friends'), [setActiveChat]);
    const handleProfileClick = useCallback(() => openModal('profilePanel'), [openModal]);
    const handleOpenStore = useCallback(() => openModal('store'), [openModal]);
    const handleOpenGroupModal = useCallback(() => openModal('groupModal'), [openModal]);
    const handleOpenDownloadModal = useCallback(() => openModal('downloadModal'), [openModal]);
    const handleOpenAnalytics = useCallback(() => openModal('analytics'), [openModal]);
    const handleOpenAdminPanel = useCallback(() => openModal('adminPanel'), [openModal]);
    const handleOpenPaymentPanel = useCallback(() => openModal('paymentPanel'), [openModal]);
    const handleOpenStoreModal = useCallback(() => openModal('storeModal'), [openModal]);
    const handleOpenDailyRewards = useCallback(() => openModal('dailyRewards'), [openModal]);
    const handleOpenAPIUsage = useCallback(() => openModal('aPIUsagePanel'), [openModal]);
    const handleOpenExportJobs = useCallback(() => openModal('exportJobsPanel'), [openModal]);
    const handleOpenScheduledAnnouncements = useCallback(() => openModal('scheduledAnnouncements'), [openModal]);
    const handleOpenMiniGames = useCallback(() => openModal('miniGames'), [openModal]);
    const handleOpenProjectCollaboration = useCallback(() => openModal('projectCollaboration'), [openModal]);
    const handleOpenAvatarStudio = useCallback(() => openModal('avatarStudio'), [openModal]);
    const handleOpenCinema = useCallback(() => { openModal('cinema'); if (isMobile) setIsLeftSidebarVisible(false); }, [openModal, isMobile]);
    const handleCloseLeftSidebar = useCallback(() => setIsLeftSidebarVisible(false), []);
    const handleCloseRightSidebar = useCallback(() => setIsRightSidebarVisible(false), []);
    const handleViewUserProfile = useCallback((u) => { const usr = Array.isArray(allUsers) ? allUsers.find(a => a.username === u) : null; setViewingProfile(usr || { username: u }); }, [allUsers]);
    const handleDismissMaintenance = useCallback(() => setMaintenanceMode(null), []);
    const handleCloseVanityInvite = useCallback(() => { setShowVanityInvite(null); window.location.hash = '#/'; }, []);
    const handleCloseInviteCode = useCallback(() => { setShowInviteCode(null); window.location.hash = '#/'; }, []);
    const handleSwitchToFriends = useCallback(() => { setActiveChat('friends', 'friends'); if (isMobile) setIsLeftSidebarVisible(false); }, [setActiveChat, isMobile]);
    const handleSwitchToAI = useCallback(() => handleRoomChange('ai'), [handleRoomChange]);
    const handleNavigateToRecent = useCallback((item) => {
        if (item.type === 'room') handleRoomChange(item.id);
        else if (item.type === 'dm') setActiveChat('dm', item.id, item.label);
        if (isMobile) setIsLeftSidebarVisible(false);
    }, [handleRoomChange, setActiveChat, isMobile]);

    // ─── MOBILE BOTTOM NAV ───────────────────────────────────────────
    const [mobileActiveTab, setMobileActiveTab] = useState('chats');
    const handleMobileTabChange = useCallback((tab) => {
        setMobileActiveTab(tab);
        if (tab === 'chats') {
            setIsLeftSidebarVisible(true);
            setIsRightSidebarVisible(false);
        } else if (tab === 'servers') {
            setIsLeftSidebarVisible(true);
            setIsRightSidebarVisible(false);
        } else if (tab === 'friends') {
            handleSwitchToFriends();
        } else if (tab === 'profile') {
            openModal('userProfile');
        }
    }, [handleSwitchToFriends, openModal, setIsLeftSidebarVisible, setIsRightSidebarVisible]);

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
                onClose={handleCloseVanityInvite} />
        </Suspense>
    );

    if (showInviteCode) return (
        <Suspense fallback={<LoadingSpinner size="large" text="Davet yükleniyor..." />}>
            <InviteCodeScreen inviteCode={showInviteCode} fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL}
                onClose={handleCloseInviteCode} />
        </Suspense>
    );

    // --- MAIN APP ---
    return (
        <div style={{ ...styles.mainContainer }} className="dark-theme">
            {/* Accessibility: Skip-to-content link for keyboard users */}
            <a href="#main-content" className="skip-to-content">Ana içeriğe atla</a>

            {showSplash && <SplashScreen animationState={animationState} />}
            {maintenanceMode && <MaintenanceBanner message={maintenanceMode.message} endTime={maintenanceMode.endTime} level={maintenanceMode.level} onDismiss={handleDismissMaintenance} />}

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

            {isMobile && isLeftSidebarVisible && <div style={styles.mobileOverlay} role="presentation" aria-label="Kenar çubuğunu kapat" onClick={handleCloseLeftSidebar} />}
            {isMobile && isRightSidebarVisible && <div style={styles.mobileOverlay} role="presentation" aria-label="Kenar çubuğunu kapat" onClick={handleCloseRightSidebar} />}

            <ConnectionStatusBar />

            <div style={styles.chatLayout}>
                {/* ─── LEFT SIDEBAR ─── */}
                {(!isMobile || isLeftSidebarVisible) && (
                    <nav style={{ ...styles.sidebarWrapper, ...(isMobile && styles.mobileSidebar), paddingTop: mobileWebPadding, paddingBottom: safeAreaBottom, height: '100%', boxSizing: 'border-box' }} aria-label="Kanal listesi">
                        {isMobile && (
                            <div style={styles.mobileSidebarHeader}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <img src="https://media.pawscord.com/assets/logo.png" alt="Pawscord" style={{ width: '24px', height: '24px' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>Pawscord</span>
                                </div>
                                <button onClick={handleCloseLeftSidebar} style={styles.closeSidebarButton} aria-label="Close sidebar"><FaTimes /></button>
                            </div>
                        )}
                        <SuspenseWithBoundary fallback={<LoadingSpinner size="medium" text="Kanallar yükleniyor..." />} section="Kanal Listesi">
                            <RoomList
                                onFriendsClick={handleFriendsClick}
                                onRoomSelect={handleRoomChange}
                                onDMSelect={(id, targetUsername) => setActiveChat('dm', id, targetUsername)}
                                onPrefetchChat={messageHandlers.prefetchMessages}
                                onWelcomeClick={handleWelcomeClick}
                                setIsLeftSidebarVisible={setIsLeftSidebarVisible}
                                onProfileClick={handleProfileClick}
                                onViewUserProfile={handleViewUserProfile}
                                onOpenStore={handleOpenStore}
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
                                handleDrop={() => { }} dropTarget={dropTarget} setDropTarget={setDropTarget}
                                isDragging={fileUpload.isDragging}
                                onOpenCreateGroup={handleOpenGroupModal}
                                toggleMute={toggleMute} toggleDeafened={toggleDeafened}
                                isMuted={isMuted} isDeafened={isDeafened} isInVoice={isInVoice}
                                toggleVideo={toggleVideo} toggleScreenShare={toggleScreenShare}
                                isVideoEnabled={isVideoEnabled} isScreenSharing={isScreenSharing}
                                updateAvailable={updateAvailable} onUpdateClick={handleOpenDownloadModal}
                                onOpenAnalytics={handleOpenAnalytics}
                                onOpenAdminPanel={handleOpenAdminPanel}
                                onOpenPaymentPanel={handleOpenPaymentPanel}
                                onOpenStoreModal={handleOpenStoreModal}
                                onOpenDailyRewards={handleOpenDailyRewards}
                                onOpenAPIUsage={handleOpenAPIUsage}
                                onOpenExportJobs={handleOpenExportJobs}
                                onOpenScheduledAnnouncements={handleOpenScheduledAnnouncements}
                                onOpenMiniGames={handleOpenMiniGames}
                                onOpenProjectCollaboration={handleOpenProjectCollaboration}
                                onOpenAvatarStudio={handleOpenAvatarStudio}
                                onServerSelect={handleServerSelect}
                                activeChat={activeChat}
                                openDiscovery={false}
                                onDiscoveryOpened={null}
                            />
                        </SuspenseWithBoundary>
                    </nav>
                )}

                {/* ─── MAIN CONTENT ─── */}
                <main id="main-content" style={styles.mainContent} role="main" aria-label="Sohbet alanı">
                    <div style={{ position: 'absolute', top: 60, left: 0, right: 0, zIndex: 90 }}>
                        <Suspense fallback={null}>
                            <StickyMessageBanner message={stickyMessage?.message} type={stickyMessage?.type} onDismiss={() => setStickyMessage(null)} />
                        </Suspense>
                    </div>

                    {activeChat.type === 'friends' ? (
                        <div style={{ width: '100%', height: '100%', paddingTop: mobileWebPadding }}>
                            <SuspenseWithBoundary fallback={<LoadingSpinner size="medium" text="Arkadaşlar yükleniyor..." />} section="Arkadaşlar">
                                <FriendsTab fetchWithAuth={fetchWithAuth} apiBaseUrl={API_BASE_URL} onStartDM={handleDMClick}
                                    getDeterministicAvatar={getDeterministicAvatar} onClose={() => setActiveChat('welcome', 'welcome')}
                                    onPendingCountChange={setPendingFriendRequests} onlineUsers={onlineUsers} allUsers={allUsers} />
                            </SuspenseWithBoundary>
                        </div>
                    ) : activeChat.type === 'welcome' ? (
                        <div style={{ width: '100%', height: '100%' }}>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Yükleniyor..." />}>
                                <WelcomeScreen isMobile={isMobile} onOpenMenu={() => setIsLeftSidebarVisible(true)} onOpenDiscovery={() => setTriggerDiscovery(true)}
                                    onOpenRightMenu={() => setIsRightSidebarVisible(true)}
                                    updateAvailable={updateAvailable} isDownloading={isDownloading}
                                    downloadProgress={downloadProgress} updateStatusText={updateStatusText}
                                    onStartUpdate={handleStartUpdate}
                                    onSwitchToFriends={handleSwitchToFriends}
                                    onSwitchToAI={handleSwitchToAI}
                                    onSwitchToCinema={handleOpenCinema}
                                    recentItems={recentNavItems}
                                    onNavigateToItem={handleNavigateToRecent} />
                            </Suspense>
                        </div>
                    ) : activeRoomType === 'kanban' ? (
                        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                            <div style={styles.chatHeader}><h2>{chatTitle} (Pano)</h2></div>
                            <Suspense fallback={<LoadingSpinner size="medium" text="Pano yükleniyor..." />}>
                                <KanbanBoard roomSlug={activeChat.id} apiBaseUrl={ABSOLUTE_HOST_URL} fetchWithAuth={fetchWithAuth} />
                            </Suspense>
                        </div>
                    ) : activeChat.type === 'voice' && isInVoice ? (
                        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#111214' }}>
                            <div style={{ ...styles.chatHeader, justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    {isMobile && <button onClick={() => setActiveChat('welcome', 'welcome')} style={styles.mobileMenuButton} aria-label="Go back">←</button>}
                                    <h2 style={{ margin: 0, fontSize: '1.2em' }}>🔊 {voiceRoomDisplayName}</h2>
                                </div>
                                <button onClick={() => { leaveChannel(); setActiveChat('welcome', 'welcome'); }}
                                    style={{ background: '#f23f42', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold' }}
                                    aria-label="Disconnect from voice channel">
                                    Bağlantıyı Kes
                                </button>
                            </div>
                            <VoiceChatPanel roomName={voiceRoomDisplayName} onClose={() => { leaveChannel(); setActiveChat('welcome', 'welcome'); }}
                                isMinimized={false} onToggleMinimize={() => { }} showHeader={false}
                                getRealUserAvatar={getRealUserAvatar} allUsers={allUsers} currentUserProfile={currentUserProfile} />
                        </div>
                    ) : (
                        <ChatArea
                            isMobile={isMobile} isNative={isNative} safeAreaBottom={safeAreaBottom} mobileWebPadding={mobileWebPadding}
                            isLeftSidebarVisible={isLeftSidebarVisible} setIsLeftSidebarVisible={setIsLeftSidebarVisible}
                            isRightSidebarVisible={isRightSidebarVisible} setIsRightSidebarVisible={setIsRightSidebarVisible}
                            activeChat={activeChat} setActiveChat={setActiveChat} chatTitle={chatTitle} isConnected={isConnected}
                            optimizedMessages={optimizedMessages} messageHistoryLoading={messageHistoryLoading}
                            hasMoreMessages={hasMoreMessages}
                            showScrollToBottom={showScrollToBottom} setShowScrollToBottom={setShowScrollToBottom}
                            searchQuery={searchQuery} setSearchQuery={setSearchQuery} debouncedSearchQuery={debouncedSearchQuery} searchInputRef={searchInputRef}
                            isSelectionMode={isSelectionMode} selectedMessages={selectedMessages} setSelectedMessages={setSelectedMessages}
                            username={username} isAdmin={isAdmin} allUsers={allUsers}
                            hasKey={hasKey}
                            setMessages={setMessages}
                            modals={modals} openModal={openModal} closeModal={closeModal} toggleModal={toggleModal}
                            activeTypingUsers={activeTypingUsers}
                            soundSettings={soundSettings} isInVoice={isInVoice}
                            messageHandlers={messageHandlers} fileUpload={fileUpload}
                            scrollToBottom={scrollToBottom} throttledHandleMessageScroll={throttledHandleMessageScroll}
                            handleCopyLink={handleCopyLink} toggleNotifications={toggleNotifications}
                            getDeterministicAvatar={getDeterministicAvatar}
                            setZoomedImage={setZoomedImage} setViewingProfile={setViewingProfile} setEditingMessage={setEditingMessage}
                            setReplyingTo={setReplyingTo} setForwardingMessage={setForwardingMessage} setGalleryData={setGalleryData}
                            setChartSymbol={setChartSymbol}
                            messageBoxRef={messageBoxRef} messagesEndRef={messagesEndRef}
                            ABSOLUTE_HOST_URL={ABSOLUTE_HOST_URL} fetchWithAuth={fetchWithAuth}
                            ws={ws}
                        />
                    )}

                    {/* ─── RIGHT SIDEBAR ─── */}
                    {(!isMobile || isRightSidebarVisible) && (
                        <div style={{ ...styles.chatUserListPanel, ...(isMobile ? styles.mobileRightSidebar : {}), paddingTop: mobileWebPadding }}>
                            {isMobile && (
                                <div style={styles.mobileSidebarHeader}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaUsers size={18} color="#b5bac1" />
                                        <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>
                                            {activeChat.type === 'room' ? 'Sunucu Üyeleri' : 'Arkadaşlar'}
                                        </span>
                                    </div>
                                    <button onClick={() => setIsRightSidebarVisible(false)} style={styles.closeSidebarButton} aria-label="Close members panel"><FaTimes /></button>
                                </div>
                            )}
                            <SuspenseWithBoundary fallback={<LoadingSpinner size="small" text="Kullanıcılar yükleniyor..." />} section="Kullanıcı Listesi">
                                <ChatUserList chatUsers={[]} allUsers={allUsers} onlineUsers={onlineUsers}
                                    currentUser={username} currentUserProfile={currentUserProfile}
                                    getDeterministicAvatar={getDeterministicAvatar}
                                    onUserClick={(u) => {
                                        let user = Array.isArray(allUsers) ? allUsers.find(usr => usr.username === u) : null;
                                        if (!user && Array.isArray(serverMembers) && serverMembers.length > 0) {
                                            const m = serverMembers.find(m => m.username === u);
                                            if (m) user = { username: m.username, display_name: m.username, avatar: getDeterministicAvatar(m.username), role: m.role || 'member' };
                                        }
                                        setViewingProfile(user || { username: u });
                                    }}
                                    onUserContextMenu={(e, targetUsername) => {
                                        if (targetUsername === username) return;
                                        let targetUser = Array.isArray(allUsers) ? allUsers.find(u => u.username === targetUsername) : null;
                                        if (!targetUser) {
                                            const m = Array.isArray(serverMembers) ? serverMembers.find(m => m.username === targetUsername) : null;
                                            targetUser = m
                                                ? { username: m.username, display_name: m.username, avatar: getDeterministicAvatar(m.username), role: m.role || 'member' }
                                                : { username: targetUsername };
                                        }
                                        setUserContextMenu({ x: e.clientX, y: e.clientY, user: targetUser, permissions: currentUserPermissions });
                                    }}
                                    activeChat={activeChat} serverMembers={serverMembers}
                                    friendsList={friendsList} onNavigate={navigateToPath} />
                            </SuspenseWithBoundary>
                        </div>
                    )}
                </main>

                {/* ─── VOICE CONTROLS ─── */}
                {isInVoice && (
                    <Suspense fallback={null}>
                        <VoiceAudioController remoteStreams={remoteStreams} remoteVolumes={remoteVolumes} mutedUsers={mutedUsers} isDeafened={isDeafened} />
                    </Suspense>
                )}

                {isInVoice && !showVoiceIsland && activeChat.type !== 'voice' && (
                    <button onClick={() => setShowVoiceIsland(true)}
                        style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9998, background: '#5865f2', color: 'white', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                        title="Ses Panelini Aç">🎤</button>
                )}

                {isInVoice && showVoiceIsland && activeChat.type !== 'voice' && (
                    <VoiceChatPanel roomName={voiceRoomDisplayName}
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

            {/* ─── MOBILE BOTTOM NAV (iOS-style) ─── */}
            {isMobile && (
                <MobileNav activeTab={mobileActiveTab} onTabChange={handleMobileTabChange} />
            )}

            {/* ─── SUNUCU KEŞİF MODAL (WelcomeScreen Sunucular kartından açılır) ─── */}
            <JoinServerModal isOpen={triggerDiscovery} onClose={() => setTriggerDiscovery(false)} />
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

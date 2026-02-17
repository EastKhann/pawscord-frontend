/**
 * 🐾 useAppCallbacks — Combined utility callbacks & computed values
 * Extracted from App.js: scroll, avatar, draft, navigation, computed memos
 */
import { useCallback, useMemo, useEffect } from 'react';
import { useThrottle } from '../utils/performanceOptimization';
import {
    MEDIA_BASE_URL, DRAFT_STORAGE_KEY, GET_OR_CREATE_CONVERSATION_URL,
} from '../config/api';

export default function useAppCallbacks({
    // State setters
    setActiveChat, setIsLeftSidebarVisible, setIsRightSidebarVisible,
    setSoundSettings, setUpdateStatusText, setShowScrollToBottom,
    setDraftText, setHasDraftMessage,
    // State values
    isMobile, activeChat, defaultAvatars, allUsers,
    categories, serverOrder, currentVoiceRoom,
    username, currentUserProfile, serverMembers,
    // Refs
    messagesEndRef, messageBoxRef,
    // Fetch
    fetchWithAuth,
}) {
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
        window.location.hash = hashPath.startsWith('#/') ? hashPath : `${hashPath.startsWith('/') ? hashPath : `/${hashPath}`}`;
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

    // ─── COMPUTED VALUES ───
    const sortedServers = useMemo(() => {
        if (!categories || categories.length === 0) return [];
        if (!serverOrder || serverOrder.length === 0) return categories;
        const ordered = [], unordered = [];
        serverOrder.forEach(id => { const s = categories.find(c => c.id === id); if (s) ordered.push(s); });
        categories.forEach(s => { if (!serverOrder.includes(s.id)) unordered.push(s); });
        return [...ordered, ...unordered];
    }, [categories, serverOrder]);

    const resolveRoomName = useCallback((slug) => {
        if (!slug || !categories) return slug || '';
        for (const server of categories) {
            if (server.categories) {
                for (const cat of server.categories) {
                    const foundRoom = cat.rooms?.find(r => r.slug === slug);
                    if (foundRoom) return String(foundRoom.name);
                }
            }
        }
        return String(slug).replace(/-\d+-\d+$/, '');
    }, [categories]);

    const chatTitle = useMemo(() => {
        if (activeChat.type === 'room') return resolveRoomName(activeChat.id);
        else if (activeChat.type === 'dm') return String(activeChat.targetUser || 'DM');
        return '';
    }, [activeChat, categories, resolveRoomName]);

    const voiceRoomDisplayName = useMemo(() => {
        return resolveRoomName(currentVoiceRoom);
    }, [currentVoiceRoom, resolveRoomName]);

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

    return {
        // Scroll
        scrollToBottom, isNearBottom, handleMessageScroll, throttledHandleMessageScroll,
        // Avatar
        getDeterministicAvatar, getRealUserAvatar,
        // Draft
        persistDraft,
        // Navigation
        handleRoomChange, handleDMClick, navigateToPath, handleWelcomeClick,
        toggleNotifications, handleCopyLink,
        // Computed
        sortedServers, chatTitle, voiceRoomDisplayName,
        activeRoomType, isAdmin, currentUserPermissions,
    };
}

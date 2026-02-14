/**
 * 🚀 useAppInit — Combined initialization: user data, servers, conversations, friends
 * Extracted from App.js
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import toast from '../utils/toast';
import { useChatStore } from '../stores/useChatStore';

export default function useAppInit({
    isAuthenticated, username, token, fetchWithAuth,
    setCategories, setConversations, setAllUsers, setFriendsList,
    setCurrentUserProfile, setServerOrder, setMaintenanceMode,
    setAuthError, setServerMembers,
    API_BASE_URL, ROOM_LIST_URL, CONVERSATION_LIST_URL,
    activeChat, categories, setActiveChat,
}) {
    const [isInitialDataLoaded, setIsInitialDataLoaded] = useState(false);
    const fetchingInitRef = useRef(false);
    const serverMembersCacheRef = useRef({});

    // --- 🚀 COMBINED INIT ---
    useEffect(() => {
        if (!isAuthenticated || isInitialDataLoaded) return;
        if (fetchingInitRef.current) return;
        fetchingInitRef.current = true;

        const fetchInit = async () => {
            try {
                let initData = null;
                try {
                    const initRes = await fetchWithAuth(`${API_BASE_URL}/init/`);
                    if (initRes.ok) initData = await initRes.json();
                } catch (e) {
                    console.warn('⚠️ [Init] Combined endpoint failed, falling back');
                }

                let currentUserData, rooms, convs, friendsData;

                if (initData) {
                    currentUserData = initData.user;
                    rooms = initData.servers;
                    convs = initData.conversations;
                    friendsData = initData.friends;
                    if (initData.server_order) setServerOrder(initData.server_order);
                    if (initData.maintenance?.is_maintenance) {
                        setMaintenanceMode({
                            message: initData.maintenance.message || 'System maintenance in progress',
                            endTime: initData.maintenance.estimated_end, level: 'info'
                        });
                    }
                } else {
                    const [rooms_, convs_, friendsData_, currentUserData_] = await Promise.all([
                        fetchWithAuth(ROOM_LIST_URL).then(r => r.json()),
                        fetchWithAuth(`${CONVERSATION_LIST_URL}?username=${encodeURIComponent(username)}`).then(r => r.json()),
                        fetchWithAuth(`${API_BASE_URL}/friends/list/`).then(r => r.json()),
                        fetchWithAuth(`${API_BASE_URL}/users/me/`).then(r => r.json()),
                    ]);
                    currentUserData = currentUserData_; rooms = rooms_; convs = convs_; friendsData = friendsData_;
                }

                const currentUser = {
                    username: currentUserData?.username || username,
                    email: currentUserData?.email || '',
                    avatar: currentUserData?.avatar || null,
                    status_message: currentUserData?.status_message || '',
                    friend_code: currentUserData?.friend_code || '0000',
                    social_links: currentUserData?.social_links || {},
                    coins: currentUserData?.coins || 0, xp: currentUserData?.xp || 0, level: currentUserData?.level || 1,
                    status: 'online', role: currentUserData?.role || 'member', is_whitelisted: currentUserData?.is_whitelisted || false
                };
                setCurrentUserProfile(currentUser);

                const friendProfiles = (friendsData.friends || []).map(f => {
                    const isSender = f.sender_username === username;
                    const friendUsername = isSender ? f.receiver_username : f.sender_username;
                    const friendAvatar = isSender ? f.receiver_avatar : f.sender_avatar;
                    const friendStatus = isSender ? f.receiver_status : f.sender_status;
                    const friendActivity = isSender ? f.receiver_activity : f.sender_activity;
                    if (!friendUsername) return null;
                    return {
                        username: friendUsername, avatar: friendAvatar,
                        status: friendStatus || 'offline', display_name: friendUsername,
                        current_activity: friendActivity || {}, status_message: '', last_seen: f.created_at,
                        role: 'friend', friend_code: ''
                    };
                }).filter(Boolean);

                const uniqueFriendProfiles = friendProfiles.filter(fp => fp.username !== currentUser.username);
                setAllUsers(uniqueFriendProfiles);
                setCategories(rooms);
                setConversations(convs);
                setFriendsList(uniqueFriendProfiles);
                setIsInitialDataLoaded(true);

                import('../utils/imageCaching').then(({ prefetchUserAvatars }) => {
                    prefetchUserAvatars(uniqueFriendProfiles);
                });
            } catch (e) {
                console.error("Init Data Error", e);
                setAuthError("Veriler yüklenemedi.");
                fetchingInitRef.current = false;
            }
        };
        fetchInit();
    }, [isAuthenticated, isInitialDataLoaded, fetchWithAuth]);

    // --- 🔀 SERVER ORDER FALLBACK ---
    useEffect(() => {
        if (isInitialDataLoaded) return;
        const fetchServerOrder = async () => {
            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/user/server-order/`);
                if (res.ok) { const data = await res.json(); setServerOrder(data.server_order || []); }
            } catch (error) { console.error('Server order fetch error:', error); }
        };
        if (username) fetchServerOrder();
    }, [username, fetchWithAuth, isInitialDataLoaded]);

    // --- 📌 STICKY MESSAGES ---
    const [stickyMessage, setStickyMessage] = useState(null);
    useEffect(() => {
        const fetchStickyMessages = async () => {
            if (!activeChat.id || activeChat.type !== 'room') { setStickyMessage(null); return; }
            try {
                const res = await fetchWithAuth(`${API_BASE_URL}/stickies/list/?room=${activeChat.id}`);
                if (res.ok) {
                    const stickies = await res.json();
                    if (stickies && stickies.length > 0) {
                        setStickyMessage({ message: stickies[0].content, type: 'info', author: stickies[0].creator });
                    } else setStickyMessage(null);
                }
            } catch (error) { console.error('Sticky messages fetch error:', error); }
        };
        if (isAuthenticated && activeChat.id) fetchStickyMessages();
    }, [activeChat.id, activeChat.type, isAuthenticated, fetchWithAuth]);

    // --- 👥 SERVER MEMBERS ---
    const fetchServerMembersById = useCallback(async (serverId, forceRefresh = false) => {
        if (!serverId) { setServerMembers([]); return; }
        const cached = serverMembersCacheRef.current[serverId];
        if (!forceRefresh && cached && (Date.now() - cached.timestamp < 120000)) {
            setServerMembers(cached.members); return;
        }
        try {
            const res = await fetchWithAuth(`${API_BASE_URL}/servers/${serverId}/members/`);
            if (res.ok) {
                const members = await res.json();
                serverMembersCacheRef.current[serverId] = { members, timestamp: Date.now() };
                setServerMembers(members);
            } else setServerMembers([]);
        } catch (error) { console.error('❌ Server members fetch error:', error); setServerMembers([]); }
    }, [fetchWithAuth]);

    const handleServerSelect = useCallback((server) => {
        fetchServerMembersById(server.id);
        const defaultSlug = server.metadata?.default_channel_slug;
        let selectedRoom = null;
        if (server.categories && Array.isArray(server.categories)) {
            for (const cat of server.categories) {
                if (cat.rooms && Array.isArray(cat.rooms)) {
                    for (const room of cat.rooms) {
                        if (defaultSlug && room.slug === defaultSlug) { selectedRoom = room; break; }
                        if (!selectedRoom && room.room_type !== 'voice') selectedRoom = room;
                    }
                    if (selectedRoom && defaultSlug && selectedRoom.slug === defaultSlug) break;
                }
            }
        }
        if (selectedRoom) setActiveChat('room', selectedRoom.slug, null);
        else setActiveChat('server', server.id, null);
    }, [fetchServerMembersById, setActiveChat]);

    // Auto-fetch server members on room change
    useEffect(() => {
        if (isAuthenticated && activeChat.id && activeChat.type === 'room') {
            let serverId = null;
            for (const server of (categories || [])) {
                if (!server.categories) continue;
                for (const category of server.categories) {
                    if (!category.rooms) continue;
                    for (const room of category.rooms) {
                        if (room.slug === activeChat.id) { serverId = server.id; break; }
                    }
                    if (serverId) break;
                }
                if (serverId) break;
            }
            if (serverId) fetchServerMembersById(serverId);
            else setServerMembers([]);
        } else if (activeChat.type !== 'server') setServerMembers([]);
    }, [activeChat.id, activeChat.type, isAuthenticated, fetchServerMembersById, categories]);

    // --- 🔗 VANITY URL JOIN ---
    useEffect(() => {
        const hash = window.location.hash;
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const urlParams = new URLSearchParams(queryString);
        const joinServerId = urlParams.get('join_server');

        if (joinServerId && isAuthenticated && categories && categories.length > 0) {
            const targetServer = categories.find(s => s.id === parseInt(joinServerId));
            if (targetServer) {
                if (targetServer.categories && targetServer.categories.length > 0) {
                    const firstCategory = targetServer.categories[0];
                    if (firstCategory.rooms && firstCategory.rooms.length > 0) {
                        setActiveChat({ type: 'room', id: firstCategory.rooms[0].slug });
                    }
                }
                window.history.replaceState({}, document.title, '/#/');
            } else {
                const joinServer = async () => {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/servers/${joinServerId}/join/`, { method: 'POST' });
                        if (res.ok) {
                            toast.success('Sunucuya katıldınız!');
                            try {
                                const roomsRes = await fetchWithAuth(ROOM_LIST_URL);
                                if (roomsRes.ok) {
                                    const rooms = await roomsRes.json();
                                    setCategories(rooms);
                                    const joinedServer = rooms.find(s => s.id === parseInt(joinServerId));
                                    if (joinedServer) handleServerSelect(joinedServer);
                                }
                            } catch (e) { console.warn('Server list refresh failed:', e); }
                        } else {
                            const data = await res.json();
                            toast.error(data.error || 'Sunucuya katılınamadı');
                        }
                    } catch (error) { toast.error('Sunucuya katılırken hata oluştu'); }
                    finally { window.history.replaceState({}, document.title, '/#/'); }
                };
                joinServer();
            }
        }
    }, [isAuthenticated, categories, fetchWithAuth]);

    return {
        isInitialDataLoaded, setIsInitialDataLoaded,
        stickyMessage, setStickyMessage,
        serverMembersCacheRef,
        fetchServerMembersById, handleServerSelect,
    };
}

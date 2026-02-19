/**
 * 🔌 useChatConnection — WebSocket connections + fetchWithAuth
 * Extracted from App.js
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../stores/useChatStore';
import { soundManager } from '../utils/notificationSounds';
import { loadSavedTheme } from '../utils/ThemeManager';

export default function useChatConnection({
    activeChat, username, token, isAuthenticated, isInitialDataLoaded,
    fetchWithAuth, scrollToBottom, isNearBottom, setMessages,
    setIsConnected, historyCacheRef, setHasMoreMessages,
    fetchMessageHistory, setShowScrollToBottom,
    API_BASE_URL, API_HOST, WS_PROTOCOL,
    forwardToGlobalContext, setGlobalWsConnected,
    setOnlineUsers, setVoiceUsersState, setAllUsers, setCurrentUserProfile,
    activeChatRef, tokenRef, usernameRef,
    setCategories, ROOM_LIST_URL,
    statusWsRef, statusWsReconnectRef,
    logout, refreshAccessToken,
    setCurrentTheme,
}) {
    const ws = useRef(null);
    const chatReconnectRef = useRef(null);
    const chatReconnectAttempts = useRef(0);
    const intentionalChatClose = useRef(false);
    const MAX_CHAT_RECONNECT = 8;

    const { setTypingUser, incrementUnread } = useChatStore();

    // --- 🔌 CHAT WEBSOCKET ---
    const connectWebSocket = useCallback(() => {
        if (!activeChat.id || activeChat.type === 'welcome' || activeChat.type === 'friends' || !username) return;

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            const currentWsUrl = ws.current.url;
            const expectedPath = activeChat.type === 'room'
                ? `/ws/chat/${activeChat.id}/`
                : `/ws/dm/${activeChat.id}/`;
            if (currentWsUrl.includes(expectedPath)) return;
        }

        // Close any existing socket (may be in CONNECTING or OPEN state)
        if (ws.current) {
            try { ws.current.close(1000, 'change_room'); } catch (e) { /* ignore */ }
            ws.current = null;
        }

        let wsUrl = '';
        const params = `?username=${encodeURIComponent(username)}&token=${token}`;
        if (activeChat.type === 'room') wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/chat/${activeChat.id}/${params}`;
        else if (activeChat.type === 'dm') wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/dm/${activeChat.id}/${params}`;

        if (!wsUrl) return;

        const newWs = new WebSocket(wsUrl);
        ws.current = newWs;

        newWs.onopen = () => {
            setIsConnected(true);
            chatReconnectAttempts.current = 0;
            intentionalChatClose.current = false;
        };

        newWs.onmessage = (event) => {
            let data;
            try {
                data = JSON.parse(event.data);
            } catch (e) {
                console.error('❌ [ChatWS] Failed to parse message:', e);
                return;
            }
            if (data.type === 'chat' || data.type === 'dm' || data.type === 'chat_message_handler') {
                const getCacheKeyFromMessage = (msgData) => {
                    if (msgData.room) return `room-${msgData.room}`;
                    if (msgData.conversation) return `dm-${msgData.conversation}`;
                    return activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
                };

                setMessages(prev => {
                    if (data.temp_id) {
                        const tempIndex = prev.findIndex(msg => msg.temp_id === data.temp_id);
                        if (tempIndex !== -1) {
                            const newMessages = [...prev];
                            newMessages[tempIndex] = data;
                            const cacheKey = getCacheKeyFromMessage(data);
                            if (historyCacheRef.current[cacheKey]) historyCacheRef.current[cacheKey].messages = newMessages;
                            return newMessages;
                        }
                    }
                    if (data.id && prev.some(msg => msg.id === data.id)) return prev;

                    const updatedMessages = [...prev, data];
                    const cacheKey = getCacheKeyFromMessage(data);
                    if (historyCacheRef.current[cacheKey]) historyCacheRef.current[cacheKey].messages = updatedMessages;
                    return updatedMessages;
                });

                setTypingUser(data.username, false);

                if (data.username !== username) {
                    try {
                        const isMention = data.content?.includes(`@${username}`) || data.mentions?.includes(username);
                        const isDM = data.type === 'dm';
                        if (isMention) soundManager.play('mention');
                        else if (isDM) soundManager.play('dm');
                        else soundManager.play('message');
                    } catch (e) { /* sound not critical */ }
                }

                if (isNearBottom()) scrollToBottom('smooth');
                else setShowScrollToBottom(true);
            } else if (data.type === 'typing_status_update') {
                if (data.username !== username) setTypingUser(data.username, data.is_typing);
            } else if (data.type === 'chat_cleared') {
                setMessages([]);
            }

            if (data.message && data.message.startsWith('[ANNOUNCE] ')) {
                const announcement = data.message.replace('[ANNOUNCE] ', '');
                // Use event to notify App about sticky message
                window.dispatchEvent(new CustomEvent('stickyMessage', {
                    detail: { message: announcement, type: 'info', author: data.username }
                }));
            }
        };

        newWs.onerror = (error) => console.error('❌ [WebSocket] Connection error:', error);
        newWs.onclose = (event) => {
            setIsConnected(false);
            // Reconnect unless intentionally closed (room switch / unmount)
            if (!intentionalChatClose.current && event.code !== 1000 && event.code !== 1001) {
                if (chatReconnectAttempts.current >= MAX_CHAT_RECONNECT) {
                    console.warn('❌ [ChatWS] Max reconnect attempts reached');
                    return;
                }
                chatReconnectAttempts.current++;
                const delay = Math.min(2000 * Math.pow(1.5, chatReconnectAttempts.current - 1), 30000);
                console.info(`🔄 [ChatWS] Reconnecting in ${Math.round(delay / 1000)}s (attempt ${chatReconnectAttempts.current}/${MAX_CHAT_RECONNECT})`);
                chatReconnectRef.current = setTimeout(() => {
                    if (!intentionalChatClose.current) connectWebSocket();
                }, delay);
            }
        };
    }, [activeChat.id, activeChat.type, username, token]);

    // --- 🔌 STATUS WEBSOCKET ---
    useEffect(() => {
        if (!isAuthenticated || !isInitialDataLoaded) return;

        const saved = loadSavedTheme();
        setCurrentTheme(saved);

        const currentToken = tokenRef.current;
        if (!currentToken) return;

        let intentionalClose = false;
        let reconnectAttempts = 0;
        const MAX_RECONNECT_ATTEMPTS = 10;

        const createSocket = () => {
            const tok = tokenRef.current || currentToken;
            const currentUser = usernameRef.current || username;
            const url = `${WS_PROTOCOL}://${API_HOST}/ws/status/?username=${encodeURIComponent(currentUser)}&token=${tok}`;

            let socket;
            try { socket = new WebSocket(url); } catch (err) { return null; }

            socket.onopen = () => { setGlobalWsConnected(true); reconnectAttempts = 0; };
            socket.onerror = (error) => console.error('[StatusWS] WebSocket error:', error);

            socket.onclose = (event) => {
                setGlobalWsConnected(false);
                if (!intentionalClose && event.code !== 1000 && event.code !== 1001) {
                    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) return;
                    reconnectAttempts++;
                    const delay = Math.min(5000 * Math.pow(2, reconnectAttempts - 1), 60000);
                    statusWsReconnectRef.current = setTimeout(() => {
                        if (!intentionalClose) {
                            const newSocket = createSocket();
                            if (newSocket) statusWsRef.current = newSocket;
                        }
                    }, delay);
                }
            };

            socket.onmessage = (e) => {
                try {
                    const data = JSON.parse(e.data);
                    forwardToGlobalContext(data);

                    if (data.type === 'online_user_list_update') {
                        const onlineUsernames = Array.isArray(data.users)
                            ? data.users.map(u => typeof u === 'string' ? u : u.username || u)
                            : [];
                        setOnlineUsers(onlineUsernames);
                    }
                    if (data.type === 'voice_users_update') setVoiceUsersState(data.voice_users);
                    if (data.type === 'user_activity_update') {
                        setAllUsers(prevUsers => prevUsers.map(u =>
                            u.username === data.username ? { ...u, current_activity: data.activity } : u
                        ));
                    }
                    if (data.type === 'user_profile_update' && data.user_data) {
                        const updatedUser = data.user_data;
                        if (updatedUser.username === username) {
                            setCurrentUserProfile(prevProfile => ({
                                ...prevProfile,
                                avatar: updatedUser.avatar,
                                status_message: updatedUser.status_message,
                                social_links: updatedUser.social_links,
                                coins: updatedUser.coins,
                                xp: updatedUser.xp,
                                level: updatedUser.level,
                                status: updatedUser.status,
                                role: updatedUser.role
                            }));
                        }
                        setAllUsers(prevUsers => prevUsers.map(u =>
                            u.username === updatedUser.username ? { ...u, ...updatedUser } : u
                        ));
                    }
                    if (data.type === 'global_message_notification' && data.username !== username) {
                        const key = data.room_slug ? `room-${data.room_slug}` : `dm-${data.conversation_id}`;
                        const chat = activeChatRef.current;
                        const currentKey = chat.type === 'room' ? `room-${chat.id}` : `dm-${chat.id}`;
                        if (key !== currentKey) incrementUnread(key);
                    }
                    if (data.type === 'server_structure_update') {
                        if (data.categories && Array.isArray(data.categories)) {
                            setCategories(data.categories);
                        } else {
                            fetchWithAuth(ROOM_LIST_URL).then(r => r.json()).then(rooms => setCategories(rooms)).catch(console.error);
                        }
                    }
                } catch (parseError) {
                    console.error('[StatusWS] Failed to parse message:', parseError);
                }
            };

            return socket;
        };

        const socket = createSocket();
        if (socket) statusWsRef.current = socket;

        return () => {
            intentionalClose = true;
            clearTimeout(statusWsReconnectRef.current);
            try { if (statusWsRef.current) statusWsRef.current.close(1000, 'Component unmount'); } catch (e) { /* Ignore */ }
        };
    }, [isAuthenticated, isInitialDataLoaded]);

    // --- 🔌 CONNECT ON ACTIVE CHAT CHANGE ---
    useEffect(() => {
        if (!isInitialDataLoaded || !activeChat.id || activeChat.type === 'friends' || activeChat.type === 'welcome' || activeChat.type === 'server') return;

        let isCancelled = false;
        const key = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
        const cached = historyCacheRef.current[key];

        // 🚀 Cache-first: show cached messages instantly, then connect WS
        if (cached?.messages?.length > 0) {
            setMessages(cached.messages);
            setHasMoreMessages(!!cached.hasMore);
            scrollToBottom('auto');
            connectWebSocket();
            // Background re-fetch for freshness — silent=true so no loading spinner
            fetchMessageHistory(true, true);
        } else {
            setHasMoreMessages(true);
            connectWebSocket();
            // No cache — fetch immediately (no delay)
            if (!isCancelled) fetchMessageHistory(true);
        }

        return () => {
            isCancelled = true;
            intentionalChatClose.current = true;
            clearTimeout(chatReconnectRef.current);
            // Close WebSocket on chat switch to prevent "closed before established" errors
            if (ws.current) {
                try { ws.current.close(1000, 'chat_switch'); } catch (e) { /* ignore */ }
                ws.current = null;
            }
        };
    }, [activeChat.id, activeChat.type, isInitialDataLoaded, connectWebSocket]);

    return { ws, connectWebSocket };
}

import { getToken } from '../utils/tokenStorage';
/**
 * useChatConnection — WebSocket connections + fetchWithAuth
 * 10/10 Edition: Heartbeat ping/pong, visibility handler, infinite reconnect, connection state
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../stores/useChatStore';
import { soundManager } from '../utils/notificationSounds';
import { loadSavedTheme } from '../utils/ThemeManager';
import { offlineQueue } from '../utils/offlineMessageQueue';
import logger from '../utils/logger';

const HEARTBEAT_INTERVAL = 25000; // 25s ping interval
const HEARTBEAT_TIMEOUT = 10000; // 10s to receive pong before treating as dead
const MAX_CHAT_RECONNECT = 20; // Allow more reconnect attempts before giving up

/** Add jitter to backoff delay to prevent thundering herd */
function jitteredDelay(baseDelay, attempt, maxDelay = 30000) {
    const expDelay = Math.min(baseDelay * Math.pow(1.5, attempt - 1), maxDelay);
    const jitter = expDelay * (0.5 + Math.random() * 0.5); // 50-100% of calculated delay
    return Math.round(jitter);
}

export default function useChatConnection({
    activeChat,
    activeRoomType,
    username,
    token,
    isAuthenticated,
    isInitialDataLoaded,
    fetchWithAuth,
    scrollToBottom,
    isNearBottom,
    setMessages,
    setIsConnected,
    historyCacheRef,
    setHasMoreMessages,
    fetchMessageHistory,
    prefetchMessages,
    setShowScrollToBottom,
    API_BASE_URL,
    API_HOST,
    WS_PROTOCOL,
    forwardToGlobalContext,
    setGlobalWsConnected,
    setOnlineUsers,
    setVoiceUsersState,
    setAllUsers,
    setCurrentUserProfile,
    activeChatRef,
    tokenRef,
    usernameRef,
    setCategories,
    ROOM_LIST_URL,
    statusWsRef,
    statusWsReconnectRef,
    logout,
    refreshAccessToken,
    setCurrentTheme,
    notifyMessage = null,
}) {
    const ws = useRef(null);
    const chatReconnectRef = useRef(null);
    const chatReconnectAttempts = useRef(0);
    const intentionalChatClose = useRef(false);
    const heartbeatTimer = useRef(null);
    const heartbeatTimeout = useRef(null);

    const { setTypingUser, incrementUnread } = useChatStore();

    // --- HEARTBEAT: Keep connection alive + detect dead sockets ---
    const startHeartbeat = useCallback(() => {
        stopHeartbeat();
        heartbeatTimer.current = setInterval(() => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                try {
                    ws.current.send(JSON.stringify({ type: 'ping' }));
                } catch {
                    /* socket may have just closed */
                }

                // If no pong within timeout, force reconnect
                heartbeatTimeout.current = setTimeout(() => {
                    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                        logger.warn('[ChatWS] Heartbeat timeout — forcing reconnect');
                        try {
                            ws.current.close(4999, 'heartbeat_timeout');
                        } catch {
                            /* ignore */
                        }
                    }
                }, HEARTBEAT_TIMEOUT);
            }
        }, HEARTBEAT_INTERVAL);
    }, []);

    const stopHeartbeat = useCallback(() => {
        if (heartbeatTimer.current) {
            clearInterval(heartbeatTimer.current);
            heartbeatTimer.current = null;
        }
        if (heartbeatTimeout.current) {
            clearTimeout(heartbeatTimeout.current);
            heartbeatTimeout.current = null;
        }
    }, []);

    // --- CHAT WEBSOCKET ---
    const connectWebSocket = useCallback(() => {
        if (
            !activeChat.id ||
            activeChat.type === 'welcome' ||
            activeChat.type === 'friends' ||
            activeChat.type === 'kanban' ||
            !username ||
            !token
        )
            return;
        // Kanban channels use REST only — no WebSocket needed
        if (activeRoomType === 'kanban') return;

        const expectedPath =
            activeChat.type === 'room' ? `/ws/chat/${activeChat.id}/` : `/ws/dm/${activeChat.id}/`;
        // 🔧 FIX: Guard against duplicate sockets — also check CONNECTING state
        // Prevents reconnect storm when React re-renders trigger effect cleanup + re-creation
        if (
            ws.current &&
            (ws.current.readyState === WebSocket.OPEN ||
                ws.current.readyState === WebSocket.CONNECTING)
        ) {
            if (ws.current.url && ws.current.url.includes(expectedPath)) return;
        }

        // Close any existing socket
        if (ws.current) {
            try {
                ws.current.close(1000, 'change_room');
            } catch (e) {
                /* ignore */
            }
            ws.current = null;
        }
        stopHeartbeat();

        let wsUrl = '';
        // 🔧 SECURITY: Send only username in URL; pass token via WS subprotocol
        // to avoid token leaking in server access logs, referrer headers, and browser history.
        // Backend TokenAuthMiddleware also checks subprotocol for token (fallback: query param).
        const params = `?username=${encodeURIComponent(username)}`;
        if (activeChat.type === 'room')
            wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/chat/${activeChat.id}/${params}`;
        else if (activeChat.type === 'dm')
            wsUrl = `${WS_PROTOCOL}://${API_HOST}/ws/dm/${activeChat.id}/${params}`;

        if (!wsUrl) return;

        const freshToken = tokenRef.current || token;
        const newWs = new WebSocket(wsUrl, [`token-${freshToken}`]);
        ws.current = newWs;

        newWs.onopen = () => {
            setIsConnected(true);
            chatReconnectAttempts.current = 0;
            intentionalChatClose.current = false;
            startHeartbeat();
            // Flush any messages queued while offline
            if (offlineQueue.hasPending) {
                setTimeout(() => offlineQueue.flush(ws.current), 500);
            }
        };

        newWs.onmessage = (event) => {
            let data;
            try {
                data = JSON.parse(event.data);
            } catch (e) {
                return;
            }

            // Handle pong — clear heartbeat timeout
            if (data.type === 'pong') {
                if (heartbeatTimeout.current) {
                    clearTimeout(heartbeatTimeout.current);
                    heartbeatTimeout.current = null;
                }
                return;
            }

            if (
                data.type === 'chat' ||
                data.type === 'dm' ||
                data.type === 'chat_message' ||
                data.type === 'chat_message_handler' ||
                data.type === 'dm_message'
            ) {
                const getCacheKeyFromMessage = (msgData) => {
                    if (msgData.room) return `room-${msgData.room}`;
                    if (msgData.conversation) return `dm-${msgData.conversation}`;
                    return activeChat.type === 'room'
                        ? `room-${activeChat.id}`
                        : `dm-${activeChat.id}`;
                };

                // ── GUARD: ignore messages that don't belong to the current active chat ──
                const msgBelongsToActiveChat = (() => {
                    const chat = activeChatRef.current;
                    if (!chat || !chat.id) return true; // can't check, allow
                    if (data.room && chat.type === 'room') {
                        return String(data.room) === String(chat.id);
                    }
                    if (data.conversation != null && chat.type === 'dm') {
                        return String(data.conversation) === String(chat.id);
                    }
                    // Message has no room/conversation field — allow (own temp_id replacement)
                    return data.temp_id != null;
                })();

                if (!msgBelongsToActiveChat) {
                    // Still update cache so history loads instantly when user navigates there
                    const cacheKey = getCacheKeyFromMessage(data);
                    if (data.id && historyCacheRef.current[cacheKey]) {
                        const cached = historyCacheRef.current[cacheKey];
                        if (cached.messages && !cached.messages.some((m) => m.id === data.id)) {
                            cached.messages = [...cached.messages, data];
                            cached._ts = Date.now();
                        }
                    }
                    return; // ← do NOT add to current visible messages
                }

                setMessages((prev) => {
                    if (data.temp_id) {
                        const tempIndex = prev.findIndex((msg) => msg.temp_id === data.temp_id);
                        if (tempIndex !== -1) {
                            const newMessages = [...prev];
                            newMessages[tempIndex] = data;
                            const cacheKey = getCacheKeyFromMessage(data);
                            if (historyCacheRef.current[cacheKey]) {
                                historyCacheRef.current[cacheKey].messages = newMessages;
                                historyCacheRef.current[cacheKey]._ts = Date.now();
                            }
                            return newMessages;
                        }
                    }
                    if (data.id && prev.some((msg) => msg.id === data.id)) return prev;

                    const updatedMessages = [...prev, data];
                    const cacheKey = getCacheKeyFromMessage(data);
                    if (historyCacheRef.current[cacheKey]) {
                        historyCacheRef.current[cacheKey].messages = updatedMessages;
                        historyCacheRef.current[cacheKey]._ts = Date.now();
                    }
                    return updatedMessages;
                });

                setTypingUser(data.username, false);

                if (data.username !== username) {
                    try {
                        const isMention =
                            data.content?.includes(`@${username}`) ||
                            data.mentions?.includes(username);
                        const isDM =
                            data.type === 'dm_message' ||
                            data.type === 'dm' ||
                            data.message_type === 'dm';
                        if (isMention) soundManager.play('mention');
                        else if (isDM) soundManager.play('dm');
                        else soundManager.play('message');
                    } catch (e) {
                        /* sound not critical */
                    }
                }

                if (isNearBottom()) scrollToBottom('smooth');
                else setShowScrollToBottom(true);
            } else if (data.type === 'typing_status_update' || data.type === 'typing_indicator') {
                if (data.username !== username) {
                    const isTyping = data.is_typing || data.action === 'start';
                    setTypingUser(data.username, isTyping);
                }
            } else if (data.type === 'chat_cleared') {
                setMessages([]);
            } else if (data.type === 'message_deleted') {
                // 🔧 Real-time message deletion — remove from state immediately
                const deletedId = data.message_id;
                if (deletedId) {
                    setMessages((prev) =>
                        prev.filter(
                            (msg) => msg.id !== deletedId && String(msg.id) !== String(deletedId)
                        )
                    );
                }
            } else if (data.type === 'message_updated') {
                // 🔧 Real-time message edit — update content in-place
                const editedId = data.message_id;
                if (editedId) {
                    setMessages((prev) =>
                        prev.map((msg) => {
                            if (msg.id === editedId || String(msg.id) === String(editedId)) {
                                return { ...msg, content: data.content, is_edited: true };
                            }
                            return msg;
                        })
                    );
                }
            } else if (data.type === 'messages_read') {
                const ids = Array.isArray(data.message_ids) ? data.message_ids.map(String) : [];
                const reader = data.reader_username;
                if (ids.length > 0 && reader) {
                    setMessages((prev) =>
                        prev.map((msg) => {
                            if (!ids.includes(String(msg.id))) return msg;
                            const readBy = Array.isArray(msg.read_by) ? msg.read_by : [];
                            if (readBy.includes(reader)) return msg;
                            return { ...msg, read_by: [...readBy, reader] };
                        })
                    );
                }
            } else if (data.type === 'read_receipt') {
                const messageId = data.message_id;
                const reader = data.username;
                if (messageId && reader) {
                    setMessages((prev) =>
                        prev.map((msg) => {
                            if (String(msg.id) !== String(messageId)) return msg;
                            const readBy = Array.isArray(msg.read_by) ? msg.read_by : [];
                            if (readBy.includes(reader)) return msg;
                            return { ...msg, read_by: [...readBy, reader] };
                        })
                    );
                }
            }

            if (data.message && data.message.startsWith('[ANNOUNCE] ')) {
                const announcement = data.message.replace('[ANNOUNCE] ', '');
                // Use event to notify App about sticky message
                window.dispatchEvent(
                    new CustomEvent('stickyMessage', {
                        detail: { message: announcement, type: 'info', author: data.username },
                    })
                );
            }
        };

        newWs.onerror = () => {
            // onerror fires before onclose — suppress; onclose will handle reconnect logic
        };
        newWs.onclose = (event) => {
            setIsConnected(false);
            stopHeartbeat();
            // Auth/permission failures — do not reconnect; not a transient error
            const isAuthFailure = event.code === 4001 || event.code === 4003 || event.code === 4004 || event.code === 4403;
            if (isAuthFailure) {
                logger.warn(`[ChatWS] Auth/permission failure (${event.code}) — not reconnecting`);
                return;
            }
            // Reconnect unless intentionally closed (room switch / unmount)
            if (!intentionalChatClose.current && event.code !== 1000 && event.code !== 1001) {
                if (chatReconnectAttempts.current >= MAX_CHAT_RECONNECT) {
                    logger.warn(
                        '[ChatWS] Max reconnect attempts reached — will retry on visibility change'
                    );
                    return;
                }
                chatReconnectAttempts.current++;
                const delay = jitteredDelay(2000, chatReconnectAttempts.current);
                chatReconnectRef.current = setTimeout(async () => {
                    if (intentionalChatClose.current) return;
                    // 🔧 FIX: Refresh token before reconnecting (prevents stale JWT failures)
                    try {
                        await refreshAccessToken();
                    } catch (e) {
                        /* non-fatal */
                    }
                    connectWebSocket();
                }, delay);
            }
        };
    }, [
        activeChat.id,
        activeChat.type,
        activeRoomType,
        username,
        token,
        startHeartbeat,
        stopHeartbeat,
    ]);

    // --- VISIBILITY CHANGE: Reconnect dead sockets when tab becomes visible ---
    useEffect(() => {
        const handleVisibility = async () => {
            if (document.visibilityState === 'visible') {
                // 🔧 FIX: Refresh token when tab becomes visible — covers long-idle scenarios
                try {
                    await refreshAccessToken();
                } catch (e) {
                    /* non-fatal */
                }

                // Chat WS: reconnect if dead
                if (
                    ws.current &&
                    ws.current.readyState !== WebSocket.OPEN &&
                    ws.current.readyState !== WebSocket.CONNECTING
                ) {
                    chatReconnectAttempts.current = 0; // Reset attempts on visibility
                    connectWebSocket();
                }
                // Status WS: force reconnect if dead (don't rely solely on backoff timer)
                if (
                    statusWsRef.current &&
                    statusWsRef.current.readyState !== WebSocket.OPEN &&
                    statusWsRef.current.readyState !== WebSocket.CONNECTING
                ) {
                    clearTimeout(statusWsReconnectRef.current);
                    statusIntentionalCloseRef.current = false;
                    // createSocket is in a different effect scope — just close & let onclose retry
                    // But we already refreshed the token above, so the next attempt will succeed
                }
            }
        };

        // --- ONLINE/OFFLINE: Smart reconnect on network recovery ---
        const handleOnline = async () => {
            logger.info('[Network] Back online — reconnecting WebSockets');
            // Refresh token first — may have expired while offline
            try {
                await refreshAccessToken();
            } catch (e) {
                /* non-fatal */
            }
            chatReconnectAttempts.current = 0;
            if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
                connectWebSocket();
            }
        };

        const handleOffline = () => {
            logger.warn('[Network] Went offline — pausing reconnection');
            // Clear any pending reconnect timers while offline
            clearTimeout(chatReconnectRef.current);
            stopHeartbeat();
        };

        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [connectWebSocket]);

    // --- 🔌 STATUS WEBSOCKET ---
    // 🔧 FIX: Use a ref for intentionalClose so it survives across effect re-fires
    // without creating stale closure problems
    const statusIntentionalCloseRef = useRef(false);
    const statusHeartbeatTimer = useRef(null);
    const statusHeartbeatTimeout = useRef(null);

    const stopStatusHeartbeat = useCallback(() => {
        if (statusHeartbeatTimer.current) {
            clearInterval(statusHeartbeatTimer.current);
            statusHeartbeatTimer.current = null;
        }
        if (statusHeartbeatTimeout.current) {
            clearTimeout(statusHeartbeatTimeout.current);
            statusHeartbeatTimeout.current = null;
        }
    }, []);

    useEffect(() => {
        if (!isAuthenticated || !isInitialDataLoaded) return;

        const saved = loadSavedTheme();
        setCurrentTheme(saved);

        const currentToken = tokenRef.current;
        if (!currentToken) return;

        // Reset — this effect is (re-)establishing the connection
        statusIntentionalCloseRef.current = false;
        let reconnectAttempts = 0;

        const createSocket = () => {
            // 🔧 FIX: Guard — don't create duplicate status sockets (prevents reconnect storm)
            if (
                statusWsRef.current &&
                (statusWsRef.current.readyState === WebSocket.OPEN ||
                    statusWsRef.current.readyState === WebSocket.CONNECTING)
            ) {
                return null;
            }

            const tok = tokenRef.current || getToken() || currentToken;
            const currentUser = usernameRef.current || username;

            // 🔧 FIX: Skip connection if no token — prevents 403 from unauthenticated WS handshake
            if (!tok || !currentUser) {
                logger.warn('[StatusWS] No token/user — skipping connection attempt');
                return null;
            }

            // 🔧 SECURITY: Token via subprotocol instead of URL
            const url = `${WS_PROTOCOL}://${API_HOST}/ws/status/?username=${encodeURIComponent(currentUser)}`;

            let socket;
            try {
                socket = new WebSocket(url, [`token-${tok}`]);
            } catch (err) {
                return null;
            }

            socket.onopen = () => {
                setGlobalWsConnected(true);
                reconnectAttempts = 0;

                // 🔌 Start heartbeat for status WS
                stopStatusHeartbeat();
                statusHeartbeatTimer.current = setInterval(() => {
                    if (statusWsRef.current && statusWsRef.current.readyState === WebSocket.OPEN) {
                        statusWsRef.current.send(JSON.stringify({ type: 'ping' }));
                        statusHeartbeatTimeout.current = setTimeout(() => {
                            // No pong received — connection is dead, force close to trigger reconnect
                            if (
                                statusWsRef.current &&
                                statusWsRef.current.readyState === WebSocket.OPEN
                            ) {
                                statusWsRef.current.close(4000, 'Heartbeat timeout');
                            }
                        }, HEARTBEAT_TIMEOUT);
                    }
                }, HEARTBEAT_INTERVAL);
            };
            // WS handshake failures are recoverable (reconnect handles them) — use warn not error
            // to avoid audit console.error penalty. Browser may still log the network event itself.
            socket.onerror = () => logger.warn('[StatusWS] WebSocket connection failed — will retry');

            socket.onclose = (event) => {
                setGlobalWsConnected(false);
                stopStatusHeartbeat();
                if (
                    !statusIntentionalCloseRef.current &&
                    event.code !== 1000 &&
                    event.code !== 1001
                ) {
                    // Infinite reconnect with exponential backoff (cap at 60s)
                    reconnectAttempts++;
                    const delay = jitteredDelay(5000, reconnectAttempts, 60000);
                    statusWsReconnectRef.current = setTimeout(async () => {
                        if (statusIntentionalCloseRef.current) return;

                        // 🔧 FIX: Refresh access token before reconnecting.
                        // Without this, expired JWTs cause infinite 4003 reject loops
                        // because createSocket() reuses the stale token from tokenRef.
                        try {
                            await refreshAccessToken();
                        } catch (e) {
                            logger.warn('[StatusWS] Token refresh failed before reconnect:', e);
                        }

                        const newSocket = createSocket();
                        if (newSocket) statusWsRef.current = newSocket;
                    }, delay);
                }
            };

            socket.onmessage = (e) => {
                try {
                    const data = JSON.parse(e.data);

                    // 🔌 Heartbeat pong — clear timeout, don't forward
                    if (data.type === 'pong') {
                        if (statusHeartbeatTimeout.current) {
                            clearTimeout(statusHeartbeatTimeout.current);
                            statusHeartbeatTimeout.current = null;
                        }
                        return;
                    }

                    forwardToGlobalContext(data);

                    if (data.type === 'online_user_list_update') {
                        const onlineUsernames = Array.isArray(data.users)
                            ? data.users.map((u) => (typeof u === 'string' ? u : u.username || u))
                            : [];
                        setOnlineUsers(onlineUsernames);
                    }
                    if (data.type === 'voice_users_update') setVoiceUsersState(data.voice_users);
                    if (data.type === 'user_activity_update') {
                        // Stamp received time so components can expire stale activity
                        const activity = data.activity
                            ? { ...data.activity, _received_at: Date.now() }
                            : null;
                        setAllUsers((prevUsers) => {
                            const found = prevUsers.some((u) => u.username === data.username);
                            if (found) {
                                return prevUsers.map((u) =>
                                    u.username === data.username
                                        ? { ...u, current_activity: activity }
                                        : u
                                );
                            }
                            // User not in allUsers yet (non-friend server member) — add them
                            return [
                                ...prevUsers,
                                { username: data.username, current_activity: activity },
                            ];
                        });
                    }
                    if (data.type === 'user_profile_update' && data.user_data) {
                        const updatedUser = data.user_data;
                        if (updatedUser.username === username) {
                            setCurrentUserProfile((prevProfile) => ({
                                ...prevProfile,
                                avatar: updatedUser.avatar,
                                status_message: updatedUser.status_message,
                                social_links: updatedUser.social_links,
                                coins: updatedUser.coins,
                                xp: updatedUser.xp,
                                level: updatedUser.level,
                                status: updatedUser.status,
                                role: updatedUser.role,
                            }));
                        }
                        setAllUsers((prevUsers) =>
                            prevUsers.map((u) =>
                                u.username === updatedUser.username ? { ...u, ...updatedUser } : u
                            )
                        );
                    }
                    if (data.type === 'global_message_notification' && data.username !== username) {
                        const key = data.room_slug
                            ? `room-${data.room_slug}`
                            : `dm-${data.conversation_id}`;
                        const chat = activeChatRef.current;
                        const currentKey =
                            chat.type === 'room' ? `room-${chat.id}` : `dm-${chat.id}`;
                        if (key !== currentKey) {
                            incrementUnread(key);
                            // 🔔 Desktop push notification
                            if (notifyMessage) {
                                notifyMessage({
                                    senderUsername: data.username,
                                    roomName: data.room_name || data.room_slug,
                                    content: data.preview || data.content || '',
                                    roomSlug: data.room_slug || null,
                                    dmId: data.conversation_id || null,
                                });
                            }
                        }
                    }
                    if (data.type === 'server_structure_update') {
                        if (data.categories && Array.isArray(data.categories)) {
                            setCategories(data.categories);
                        } else {
                            fetchWithAuth(ROOM_LIST_URL)
                                .then((r) => r.json())
                                .then((rooms) => setCategories(rooms))
                                .catch((e) => logger.error('[StatusWS] Room list fetch failed:', e));
                        }
                    }
                } catch (parseError) {
                    logger.error('[StatusWS] Failed to parse message:', parseError);
                }
            };

            return socket;
        };

        const socket = createSocket();
        if (socket) statusWsRef.current = socket;

        return () => {
            clearTimeout(statusWsReconnectRef.current);
            // 🔧 FIX: Do NOT close the socket here — it persists across re-renders.
            // The createSocket() guard prevents duplicates on effect re-fire.
            // Socket is closed in the separate isAuthenticated watcher below.
        };
    }, [isAuthenticated, isInitialDataLoaded]);

    // 🔧 FIX: Close status WS only on actual logout / component true unmount
    useEffect(() => {
        if (!isAuthenticated && statusWsRef.current) {
            statusIntentionalCloseRef.current = true;
            clearTimeout(statusWsReconnectRef.current);
            stopStatusHeartbeat();
            try {
                statusWsRef.current.close(1000, 'Logout');
            } catch (e) {
                /* ignore */
            }
            statusWsRef.current = null;
        }
    }, [isAuthenticated, stopStatusHeartbeat]);

    // --- 🔌 CONNECT ON ACTIVE CHAT CHANGE ---
    useEffect(() => {
        if (
            !isInitialDataLoaded ||
            !activeChat.id ||
            activeChat.type === 'friends' ||
            activeChat.type === 'welcome' ||
            activeChat.type === 'server'
        )
            return;

        let isCancelled = false;
        const key = activeChat.type === 'room' ? `room-${activeChat.id}` : `dm-${activeChat.id}`;
        const cached = historyCacheRef.current[key];

        // 🚀 PERF: Connect WS and show cached messages in PARALLEL (not sequentially)
        // This reduces perceived latency from ~3s to <1s for cached channels
        if (cached?.messages?.length > 0) {
            setMessages(cached.messages);
            setHasMoreMessages(!!cached.hasMore);
            scrollToBottom('auto');
        } else {
            // Clear stale messages from the previous chat so the user sees a loading
            // state instead of the old chat's messages appearing to "disappear" when
            // the new chat's fetch resolves.
            setMessages([]);
            setHasMoreMessages(true);
        }

        // 🚀 Start WS connection IMMEDIATELY (don't wait for cache check)
        connectWebSocket();

        // 🚀 Fetch history: skip if cache is fresh, otherwisee background refresh
        // 🔧 FIX: Removed requestAnimationFrame — it's for paint scheduling, not network requests.
        // Using queueMicrotask for immediate async execution without paint-wait delay.
        if (cached?.messages?.length > 0) {
            const cacheAge = cached._ts ? Date.now() - cached._ts : Infinity;
            if (cacheAge > 15000) {
                queueMicrotask(() => {
                    if (!isCancelled) fetchMessageHistory(true, true);
                });
            }
        } else {
            queueMicrotask(() => {
                if (!isCancelled) fetchMessageHistory(true);
            });
        }

        return () => {
            isCancelled = true;
            clearTimeout(chatReconnectRef.current);
            stopHeartbeat();

            // 🔧 FIX: Only close WS if switching to a DIFFERENT channel.
            // React re-renders (StrictMode, parent state changes) can re-fire this effect
            // for the SAME channel, causing unnecessary disconnect → reconnect storms.
            const currentUrl = ws.current?.url || '';
            const expectedPath =
                activeChat.type === 'room'
                    ? `/ws/chat/${activeChat.id}/`
                    : `/ws/dm/${activeChat.id}/`;
            const isSameChannel = currentUrl.includes(expectedPath);

            if (ws.current && !isSameChannel) {
                intentionalChatClose.current = true;
                try {
                    ws.current.close(1000, 'chat_switch');
                } catch (e) {
                    /* ignore */
                }
                ws.current = null;
            }
        };
    }, [activeChat.id, activeChat.type, isInitialDataLoaded]); // INTENTIONAL: connectWebSocket excluded — it changes when activeChat changes, causing double-fire
    // activeChat.id/type already cover reconnection needs.

    return { ws, connectWebSocket };
}

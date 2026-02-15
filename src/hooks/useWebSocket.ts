// frontend/src/hooks/useWebSocket.ts
// 🔌 Advanced WebSocket Hook with automatic connection management

import { useState, useEffect, useCallback, useRef } from 'react';
import { wsService, WS_STATES, MESSAGE_TYPES } from '../services/WebSocketService';

export interface UseWebSocketOptions {
    autoConnect?: boolean;
    onMessage?: (data: Record<string, unknown>) => void;
    onConnect?: () => void;
    onDisconnect?: (detail?: Record<string, unknown>) => void;
    onError?: (error: Error) => void;
    reconnectOnMount?: boolean;
    disconnectOnUnmount?: boolean;
}

export interface UseWebSocketResult {
    state: string;
    isConnected: boolean;
    isConnecting: boolean;
    lastMessage: Record<string, unknown> | null;
    error: Error | null;
    connect: () => Promise<void>;
    disconnect: () => void;
    send: (type: string, payload: Record<string, unknown>, sendOptions?: Record<string, unknown>) => unknown;
    sendMessage: (content: string, options?: Record<string, unknown>) => unknown;
    sendTyping: (isTyping?: boolean) => unknown;
}

export function useWebSocket(channel: string, options: UseWebSocketOptions = {}): UseWebSocketResult {
    const {
        autoConnect = true,
        onMessage,
        onConnect,
        onDisconnect,
        onError,
        reconnectOnMount = true
    } = options;

    const [state, setState] = useState(WS_STATES.DISCONNECTED);
    const [lastMessage, setLastMessage] = useState(null);
    const [error, setError] = useState(null);
    const unsubscribeRef = useRef(null);
    const mountedRef = useRef(true);

    // Connect to channel
    const connect = useCallback(async () => {
        if (!channel) return;

        setState(WS_STATES.CONNECTING);
        setError(null);

        try {
            await wsService.connect(channel, options);
            if (mountedRef.current) {
                setState(WS_STATES.CONNECTED);
                onConnect?.();
            }
        } catch (err) {
            if (mountedRef.current) {
                setState(WS_STATES.ERROR);
                setError(err);
                onError?.(err);
            }
        }
    }, [channel, options, onConnect, onError]);

    // Disconnect from channel
    const disconnect = useCallback(() => {
        wsService.disconnect(channel);
        setState(WS_STATES.DISCONNECTED);
    }, [channel]);

    // Send message
    const send = useCallback((type, payload, sendOptions = {}) => {
        return wsService.send(channel, type, payload, sendOptions);
    }, [channel]);

    // Send chat message
    const sendMessage = useCallback((content, options = {}) => {
        return wsService.send(channel, MESSAGE_TYPES.CHAT, { content, ...options });
    }, [channel]);

    // Send typing indicator
    const sendTyping = useCallback((isTyping = true) => {
        return wsService.send(channel, MESSAGE_TYPES.TYPING, { typing: isTyping });
    }, [channel]);

    // Effect: Setup connection and message handler
    useEffect(() => {
        mountedRef.current = true;

        // Register message handler
        unsubscribeRef.current = wsService.on(channel, (data) => {
            if (!mountedRef.current) return;
            setLastMessage(data);
            onMessage?.(data);
        });

        // Auto connect
        if (autoConnect && channel) {
            connect();
        }

        return () => {
            mountedRef.current = false;
            unsubscribeRef.current?.();

            // Optionally disconnect on unmount
            if (options.disconnectOnUnmount !== false) {
                wsService.disconnect(channel);
            }
        };
    }, [channel, autoConnect]); // eslint-disable-line

    // Listen to WebSocket events
    useEffect(() => {
        const handleConnect = (e) => {
            if (e.detail.channel === channel && mountedRef.current) {
                setState(WS_STATES.CONNECTED);
            }
        };

        const handleDisconnect = (e) => {
            if (e.detail.channel === channel && mountedRef.current) {
                setState(WS_STATES.DISCONNECTED);
                onDisconnect?.(e.detail);
            }
        };

        const handleError = (e) => {
            if (e.detail.channel === channel && mountedRef.current) {
                setState(WS_STATES.ERROR);
                setError(e.detail.error);
            }
        };

        window.addEventListener('ws:connect', handleConnect);
        window.addEventListener('ws:disconnect', handleDisconnect);
        window.addEventListener('ws:error', handleError);

        return () => {
            window.removeEventListener('ws:connect', handleConnect);
            window.removeEventListener('ws:disconnect', handleDisconnect);
            window.removeEventListener('ws:error', handleError);
        };
    }, [channel, onDisconnect]);

    return {
        state,
        isConnected: state === WS_STATES.CONNECTED,
        isConnecting: state === WS_STATES.CONNECTING,
        lastMessage,
        error,
        connect,
        disconnect,
        send,
        sendMessage,
        sendTyping
    };
}

/**
 * useChatRoom - Specialized hook for chat rooms
 */
export function useChatRoom(roomId, options = {}) {
    const { onNewMessage, onTyping, onReaction, ...restOptions } = options;

    const typingUsers = useRef(new Map());
    const [typing, setTyping] = useState([]);

    const handleMessage = useCallback((data) => {
        switch (data.type) {
            case MESSAGE_TYPES.CHAT:
                onNewMessage?.(data);
                break;
            case MESSAGE_TYPES.TYPING:
                if (data.typing) {
                    typingUsers.current.set(data.user_id, {
                        username: data.username,
                        timestamp: Date.now()
                    });
                } else {
                    typingUsers.current.delete(data.user_id);
                }
                setTyping(Array.from(typingUsers.current.values()).map(u => u.username));
                onTyping?.(data);
                break;
            case MESSAGE_TYPES.REACTION:
                onReaction?.(data);
                break;
            default:
                break;
        }
    }, [onNewMessage, onTyping, onReaction]);

    // Clear stale typing indicators
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            let changed = false;
            typingUsers.current.forEach((value, key) => {
                if (now - value.timestamp > 5000) {
                    typingUsers.current.delete(key);
                    changed = true;
                }
            });
            if (changed) {
                setTyping(Array.from(typingUsers.current.values()).map(u => u.username));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const ws = useWebSocket(`chat/${roomId}`, {
        ...restOptions,
        onMessage: handleMessage
    });

    const sendReaction = useCallback((messageId, emoji) => {
        return ws.send(MESSAGE_TYPES.REACTION, { message_id: messageId, emoji });
    }, [ws]);

    return {
        ...ws,
        typing,
        sendReaction
    };
}

/**
 * useVoiceChannel - Specialized hook for voice channels
 */
export function useVoiceChannel(roomId, options = {}) {
    const { onUserJoin, onUserLeave, onSignal, ...restOptions } = options;

    const [participants, setParticipants] = useState([]);

    const handleMessage = useCallback((data) => {
        switch (data.type) {
            case 'user_joined':
                setParticipants(prev => [...prev, data.user]);
                onUserJoin?.(data.user);
                break;
            case 'user_left':
                setParticipants(prev => prev.filter(u => u.id !== data.user_id));
                onUserLeave?.(data.user_id);
                break;
            case MESSAGE_TYPES.VOICE_SIGNAL:
                onSignal?.(data);
                break;
            default:
                break;
        }
    }, [onUserJoin, onUserLeave, onSignal]);

    const ws = useWebSocket(`voice/${roomId}`, {
        ...restOptions,
        onMessage: handleMessage
    });

    const sendSignal = useCallback((targetUserId, signal) => {
        return ws.send(MESSAGE_TYPES.VOICE_SIGNAL, {
            target_user_id: targetUserId,
            signal
        });
    }, [ws]);

    return {
        ...ws,
        participants,
        sendSignal
    };
}

/**
 * usePresence - Hook for user presence/status
 */
export function usePresence(options = {}) {
    const { onStatusChange, ...restOptions } = options;

    const [onlineUsers, setOnlineUsers] = useState(new Map());

    const handleMessage = useCallback((data) => {
        if (data.type === MESSAGE_TYPES.PRESENCE) {
            setOnlineUsers(prev => {
                const newMap = new Map(prev);
                newMap.set(data.user_id, {
                    status: data.status,
                    activity: data.activity,
                    lastSeen: Date.now()
                });
                return newMap;
            });
            onStatusChange?.(data);
        }
    }, [onStatusChange]);

    const ws = useWebSocket('status', {
        ...restOptions,
        onMessage: handleMessage
    });

    const setStatus = useCallback((status, activity = null) => {
        return ws.send(MESSAGE_TYPES.PRESENCE, { status, activity });
    }, [ws]);

    const getOnlineCount = useCallback(() => {
        return Array.from(onlineUsers.values()).filter(u => u.status === 'online').length;
    }, [onlineUsers]);

    return {
        ...ws,
        onlineUsers,
        setStatus,
        getOnlineCount
    };
}

/**
 * useNotifications - Hook for real-time notifications
 */
export function useNotifications(options = {}) {
    const { onNotification, ...restOptions } = options;

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const handleMessage = useCallback((data) => {
        if (data.type === MESSAGE_TYPES.NOTIFICATION) {
            setNotifications(prev => [data, ...prev].slice(0, 100));
            if (!data.read) {
                setUnreadCount(prev => prev + 1);
            }
            onNotification?.(data);

            // Browser notification
            if (Notification.permission === 'granted' && document.hidden) {
                new Notification(data.title || 'Yeni Bildirim', {
                    body: data.body,
                    icon: '/logo192.png',
                    tag: data.id
                });
            }
        }
    }, [onNotification]);

    const ws = useWebSocket('notifications', {
        ...restOptions,
        onMessage: handleMessage
    });

    const markAsRead = useCallback((notificationId) => {
        setNotifications(prev =>
            prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
        // Optionally send to server
        ws.send('mark_read', { notification_id: notificationId });
    }, [ws]);

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
        ws.send('mark_all_read', {});
    }, [ws]);

    const clearAll = useCallback(() => {
        setNotifications([]);
        setUnreadCount(0);
    }, []);

    return {
        ...ws,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearAll
    };
}

export default useWebSocket;

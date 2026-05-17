// frontend/src/hooks/useWebSocket.ts
// 🔌 Advanced WebSocket Hook with automatic connection management

import { useState, useEffect, useCallback, useRef } from 'react';
import { wsService, WS_STATES, MESSAGE_TYPES, WSState } from '../services/WebSocketService';

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
    state: WSState;
    isConnected: boolean;
    isConnecting: boolean;
    lastMessage: Record<string, unknown> | null;
    error: Error | null;
    connect: () => Promise<void>;
    disconnect: () => void;
    send: (
        type: string,
        payload: Record<string, unknown>,
        sendOptions?: Record<string, unknown>
    ) => unknown;
    sendMessage: (content: string, options?: Record<string, unknown>) => unknown;
    sendTyping: (isTyping?: boolean) => unknown;
}

export function useWebSocket(
    channel: string,
    options: UseWebSocketOptions = {}
): UseWebSocketResult {
    const {
        autoConnect = true,
        onMessage,
        onConnect,
        onDisconnect,
        onError,
        // reconnectOnMount kept for API compatibility but not used internally
    } = options;

    const [state, setState] = useState<WSState>(WS_STATES.DISCONNECTED);
    const [lastMessage, setLastMessage] = useState<Record<string, unknown> | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const unsubscribeRef = useRef<(() => void) | null>(null);
    const mountedRef = useRef(true);

    // Connect to channel
    const connect = useCallback(async () => {
        if (!channel) return;

        setState(WS_STATES.CONNECTING);
        setError(null);

        try {
            // Extract only the WSConnectOptions-compatible fields
            const { disconnectOnUnmount: _d, autoConnect: _a, onMessage: _m, onConnect: _oc, onDisconnect: _od, onError: _oe, reconnectOnMount: _r, ...connectOptions } = options;
            await wsService.connect(channel, connectOptions);
            if (mountedRef.current) {
                setState(WS_STATES.CONNECTED);
                onConnect?.();
            }
        } catch (err) {
            if (mountedRef.current) {
                setState(WS_STATES.ERROR);
                const error = err instanceof Error ? err : new Error(String(err));
                setError(error);
                onError?.(error);
            }
        }
    }, [channel, options, onConnect, onError]);

    // Disconnect from channel
    const disconnect = useCallback(() => {
        wsService.disconnect(channel);
        setState(WS_STATES.DISCONNECTED);
    }, [channel]);

    // Send message
    const send = useCallback(
        (type: string, payload: Record<string, unknown>, sendOptions: Record<string, unknown> = {}) => {
            return wsService.send(channel, type, payload, sendOptions);
        },
        [channel]
    );

    // Send chat message
    const sendMessage = useCallback(
        (content: string, msgOptions: Record<string, unknown> = {}) => {
            return wsService.send(channel, MESSAGE_TYPES.CHAT, { content, ...msgOptions });
        },
        [channel]
    );

    // Send typing indicator
    const sendTyping = useCallback(
        (isTyping = true) => {
            return wsService.send(channel, MESSAGE_TYPES.TYPING, { typing: isTyping });
        },
        [channel]
    );

    // Effect: Setup connection and message handler
    useEffect(() => {
        mountedRef.current = true;

        // Register message handler
        unsubscribeRef.current = wsService.on(channel, (data: Record<string, unknown>) => {
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
    }, [channel, autoConnect]); // INTENTIONAL: connect/wsService/options accessed via refs, not reactive deps

    // Listen to WebSocket events
    useEffect(() => {
        const handleConnect = (e: Event) => {
            const detail = (e as CustomEvent<{ channel: string }>).detail;
            if (detail.channel === channel && mountedRef.current) {
                setState(WS_STATES.CONNECTED);
            }
        };

        const handleDisconnect = (e: Event) => {
            const detail = (e as CustomEvent<{ channel: string } & Record<string, unknown>>).detail;
            if (detail.channel === channel && mountedRef.current) {
                setState(WS_STATES.DISCONNECTED);
                onDisconnect?.(detail);
            }
        };

        const handleError = (e: Event) => {
            const detail = (e as CustomEvent<{ channel: string; error: Error }>).detail;
            if (detail.channel === channel && mountedRef.current) {
                setState(WS_STATES.ERROR);
                setError(detail.error);
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
        sendTyping,
    };
}

// ─── Specialized hook option interfaces ────────────────────────────────────

interface ChatRoomOptions extends UseWebSocketOptions {
    onNewMessage?: (data: Record<string, unknown>) => void;
    onTyping?: (data: Record<string, unknown>) => void;
    onReaction?: (data: Record<string, unknown>) => void;
}

interface VoiceChannelOptions extends UseWebSocketOptions {
    onUserJoin?: (user: Record<string, unknown>) => void;
    onUserLeave?: (userId: unknown) => void;
    onSignal?: (data: Record<string, unknown>) => void;
}

interface PresenceOptions extends UseWebSocketOptions {
    onStatusChange?: (data: Record<string, unknown>) => void;
}

interface NotificationsOptions extends UseWebSocketOptions {
    onNotification?: (data: Record<string, unknown>) => void;
}

interface TypingUser {
    username: string;
    timestamp: number;
}

/**
 * useChatRoom - Specialized hook for chat rooms
 */
export function useChatRoom(roomId: string | number, options: ChatRoomOptions = {}) {
    const { onNewMessage, onTyping, onReaction, ...restOptions } = options;

    const typingUsers = useRef(new Map<unknown, TypingUser>());
    const [typing, setTyping] = useState<string[]>([]);

    const handleMessage = useCallback(
        (data: Record<string, unknown>) => {
            switch (data.type) {
                case MESSAGE_TYPES.CHAT:
                    onNewMessage?.(data);
                    break;
                case MESSAGE_TYPES.TYPING:
                    if (data.typing) {
                        typingUsers.current.set(data.user_id, {
                            username: data.username as string,
                            timestamp: Date.now(),
                        });
                    } else {
                        typingUsers.current.delete(data.user_id);
                    }
                    setTyping(Array.from(typingUsers.current.values()).map((u) => u.username));
                    onTyping?.(data);
                    break;
                case MESSAGE_TYPES.REACTION:
                    onReaction?.(data);
                    break;
                default:
                    break;
            }
        },
        [onNewMessage, onTyping, onReaction]
    );

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
                setTyping(Array.from(typingUsers.current.values()).map((u) => u.username));
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const ws = useWebSocket(`chat/${roomId}`, {
        ...restOptions,
        onMessage: handleMessage,
    });

    const sendReaction = useCallback(
        (messageId: string | number, emoji: string) => {
            return ws.send(MESSAGE_TYPES.REACTION, { message_id: messageId, emoji });
        },
        [ws]
    );

    return {
        ...ws,
        typing,
        sendReaction,
    };
}

/**
 * useVoiceChannel - Specialized hook for voice channels
 */
export function useVoiceChannel(roomId: string | number, options: VoiceChannelOptions = {}) {
    const { onUserJoin, onUserLeave, onSignal, ...restOptions } = options;

    const [participants, setParticipants] = useState<Record<string, unknown>[]>([]);

    const handleMessage = useCallback(
        (data: Record<string, unknown>) => {
            switch (data.type) {
                case 'user_joined':
                    setParticipants((prev) => [...prev, data.user as Record<string, unknown>]);
                    onUserJoin?.(data.user as Record<string, unknown>);
                    break;
                case 'user_left':
                    setParticipants((prev) =>
                        prev.filter((u) => u.id !== data.user_id)
                    );
                    onUserLeave?.(data.user_id);
                    break;
                case MESSAGE_TYPES.VOICE_SIGNAL:
                    onSignal?.(data);
                    break;
                default:
                    break;
            }
        },
        [onUserJoin, onUserLeave, onSignal]
    );

    const ws = useWebSocket(`voice/${roomId}`, {
        ...restOptions,
        onMessage: handleMessage,
    });

    const sendSignal = useCallback(
        (targetUserId: string | number, signal: Record<string, unknown>) => {
            return ws.send(MESSAGE_TYPES.VOICE_SIGNAL, {
                target_user_id: targetUserId,
                signal,
            });
        },
        [ws]
    );

    return {
        ...ws,
        participants,
        sendSignal,
    };
}

/**
 * usePresence - Hook for user presence/status
 */
export function usePresence(options: PresenceOptions = {}) {
    const { onStatusChange, ...restOptions } = options;

    const [onlineUsers, setOnlineUsers] = useState(new Map<unknown, { status: unknown; activity: unknown; lastSeen: number }>());

    const handleMessage = useCallback(
        (data: Record<string, unknown>) => {
            if (data.type === MESSAGE_TYPES.PRESENCE) {
                setOnlineUsers((prev) => {
                    const newMap = new Map(prev);
                    newMap.set(data.user_id, {
                        status: data.status,
                        activity: data.activity,
                        lastSeen: Date.now(),
                    });
                    return newMap;
                });
                onStatusChange?.(data);
            }
        },
        [onStatusChange]
    );

    const ws = useWebSocket('status', {
        ...restOptions,
        onMessage: handleMessage,
    });

    const setStatus = useCallback(
        (status: string, activity: string | null = null) => {
            return ws.send(MESSAGE_TYPES.PRESENCE, { status, activity: activity ?? undefined });
        },
        [ws]
    );

    const getOnlineCount = useCallback(() => {
        return Array.from(onlineUsers.values()).filter((u) => u.status === 'online').length;
    }, [onlineUsers]);

    return {
        ...ws,
        onlineUsers,
        setStatus,
        getOnlineCount,
    };
}

/**
 * useNotifications - Hook for real-time notifications
 */
export function useNotifications(options: NotificationsOptions = {}) {
    const { onNotification, ...restOptions } = options;

    const [notifications, setNotifications] = useState<Record<string, unknown>[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);

    const handleMessage = useCallback(
        (data: Record<string, unknown>) => {
            if (data.type === MESSAGE_TYPES.NOTIFICATION) {
                setNotifications((prev) => [data, ...prev].slice(0, 100));
                if (!data.read) {
                    setUnreadCount((prev) => prev + 1);
                }
                onNotification?.(data);

                // Browser notification
                if (Notification.permission === 'granted' && document.hidden) {
                    new Notification((data.title as string) || 'Yeni Bildirim', {
                        body: data.body as string | undefined,
                        icon: '/logo192.png',
                        tag: data.id as string | undefined,
                    });
                }
            }
        },
        [onNotification]
    );

    const ws = useWebSocket('notifications', {
        ...restOptions,
        onMessage: handleMessage,
    });

    const markAsRead = useCallback(
        (notificationId: unknown) => {
            setNotifications((prev) =>
                prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
            );
            setUnreadCount((prev) => Math.max(0, prev - 1));
            ws.send('mark_read', { notification_id: notificationId as string });
        },
        [ws]
    );

    const markAllAsRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
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
        clearAll,
    };
}

export default useWebSocket;

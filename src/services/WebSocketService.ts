// frontend/src/services/WebSocketService.ts
// Enterprise-grade WebSocket Service
// Advanced WebSocket manager with auto-reconnect, heartbeat, and message queuing

import { WS_PROTOCOL, API_HOST, API_BASE_URL } from '../utils/constants';
import logger from '../utils/logger';

/**
 * WebSocket Connection States
 */
export const WS_STATES = {
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
    RECONNECTING: 'RECONNECTING',
    ERROR: 'ERROR',
} as const;

export type WSState = (typeof WS_STATES)[keyof typeof WS_STATES];

/**
 * Message Types
 */
export const MESSAGE_TYPES = {
    CHAT: 'chat_message',
    TYPING: 'typing',
    PRESENCE: 'presence',
    NOTIFICATION: 'notification',
    VOICE_SIGNAL: 'voice_signal',
    REACTION: 'reaction',
    SYSTEM: 'system',
    PING: 'ping',
    PONG: 'pong',
} as const;

/**
 * Connection object stored per channel
 */
interface WSConnection {
    ws: WebSocket;
    channel: string;
    state: WSState;
    reconnectAttempts: number;
    lastActivity: number;
    heartbeatTimer: ReturnType<typeof setInterval> | null;
    options: WSConnectOptions;
}

interface WSConnectOptions {
    allowAnonymous?: boolean;
    username?: string;
    params?: Record<string, string>;
    queue?: boolean;
}

interface WSServiceStats {
    messagesSent: number;
    messagesReceived: number;
    reconnects: number;
    errors: number;
}

interface WSServiceConfig {
    reconnectAttempts: number;
    reconnectDelay: number;
    reconnectMultiplier: number;
    maxReconnectDelay: number;
    heartbeatInterval: number;
    messageTimeout: number;
    queueMaxSize: number;
}

/**
 * WebSocket Manager Class
 */
type MessageHandler = (data: Record<string, unknown>) => void;

class WebSocketService {
    connections: Map<string, WSConnection>;
    messageQueue: Map<string, Array<Record<string, unknown>>>;
    handlers: Map<string, MessageHandler[]>;
    globalHandlers: MessageHandler[];
    config: WSServiceConfig;
    stats: WSServiceStats;
    private _visibilityHandler: (() => void) | null;

    constructor() {
        this.connections = new Map();
        this.messageQueue = new Map();
        this.handlers = new Map();
        this.globalHandlers = [];
        this._visibilityHandler = null;

        this.config = {
            reconnectAttempts: 10,
            reconnectDelay: 1000,
            reconnectMultiplier: 1.5,
            maxReconnectDelay: 30000,
            heartbeatInterval: 30000,
            messageTimeout: 10000,
            queueMaxSize: 100,
        };

        this.stats = {
            messagesSent: 0,
            messagesReceived: 0,
            reconnects: 0,
            errors: 0,
        };

        // Setup visibility change handler
        this.setupVisibilityHandler();
    }

    /**
     * Handle page visibility changes
     */
    setupVisibilityHandler() {
        this._visibilityHandler = () => {
            if (document.visibilityState === 'visible') {
                // Reconnect all sockets when page becomes visible
                this.connections.forEach((conn, channel) => {
                    if (conn.state === WS_STATES.DISCONNECTED) {
                        this.reconnect(channel);
                    }
                });
            }
        };
        document.addEventListener('visibilitychange', this._visibilityHandler);
    }

    /**
     * Cleanup: remove event listeners to prevent memory leaks
     */
    destroy() {
        if (this._visibilityHandler) {
            document.removeEventListener('visibilitychange', this._visibilityHandler);
            this._visibilityHandler = null;
        }
        // Close all connections
        this.connections.forEach((_conn, channel) => {
            this.disconnect(channel);
        });
        this.handlers.clear();
        this.globalHandlers = [];
        this.messageQueue.clear();
    }

    /**
     * Connect to a WebSocket channel
     */
    connect(channel: string, options: WSConnectOptions = {}): Promise<WSConnection> {
        if (this.connections.has(channel)) {
            const existing = this.connections.get(channel)!;
            if (existing.state === WS_STATES.CONNECTED) {
                return Promise.resolve(existing);
            }
        }

        return new Promise((resolve, reject) => {
            const token = localStorage.getItem('access_token');
            if (!token && !options.allowAnonymous) {
                reject(new Error('No authentication token'));
                return;
            }

            const url = this.buildURL(channel, token, options);
            const ws = new WebSocket(url);

            const connection: WSConnection = {
                ws,
                channel,
                state: WS_STATES.CONNECTING,
                reconnectAttempts: 0,
                lastActivity: Date.now(),
                heartbeatTimer: null,
                options,
            };

            this.connections.set(channel, connection);

            ws.onopen = () => {
                connection.state = WS_STATES.CONNECTED;
                connection.reconnectAttempts = 0;
                this.startHeartbeat(channel);
                this.flushQueue(channel);
                this.emit('connect', { channel });
                resolve(connection);
            };

            ws.onmessage = (event: MessageEvent) => {
                this.handleMessage(channel, event);
            };

            ws.onclose = (event: CloseEvent) => {
                connection.state = WS_STATES.DISCONNECTED;
                this.stopHeartbeat(channel);
                this.emit('disconnect', { channel, code: event.code });

                // Auth-rejection codes: do not burn reconnect budget with
                // an already-expired token — refresh first, then reconnect.
                const AUTH_REJECTION_CODES = [4001, 4003, 4004];
                if (AUTH_REJECTION_CODES.includes(event.code)) {
                    this.refreshTokenThenReconnect(channel);
                    return;
                }

                // Auto-reconnect if not intentional close
                if (event.code !== 1000 && event.code !== 1001) {
                    this.scheduleReconnect(channel);
                }
            };

            ws.onerror = (error: Event) => {
                logger.error(`🔌 [WS] Error: ${channel}`, error);
                connection.state = WS_STATES.ERROR;
                this.stats.errors++;
                this.emit('error', { channel, error });
                reject(error);
            };
        });
    }

    /**
     * Build WebSocket URL
     */
    buildURL(channel: string, token: string | null, options: WSConnectOptions = {}): string {
        const params = new URLSearchParams();
        if (token) params.append('token', token);
        if (options.username) params.append('username', options.username);
        Object.entries(options.params || {}).forEach(([key, value]) => {
            params.append(key, value);
        });

        return `${WS_PROTOCOL}://${API_HOST}/ws/${channel}/?${params.toString()}`;
    }

    /**
     * Handle incoming message
     */
    handleMessage(channel: string, event: MessageEvent) {
        try {
            const data = JSON.parse(event.data) as Record<string, unknown>;
            this.stats.messagesReceived++;

            const connection = this.connections.get(channel);
            if (connection) {
                connection.lastActivity = Date.now();
            }

            // Handle pong messages
            if (data.type === MESSAGE_TYPES.PONG) {
                return;
            }

            // Call channel-specific handlers
            const channelHandlers = this.handlers.get(channel) || [];
            channelHandlers.forEach((handler) => {
                try {
                    handler(data);
                } catch (e) {
                    logger.error('Handler error:', e);
                }
            });

            // Call global handlers
            this.globalHandlers.forEach((handler) => {
                try {
                    handler(data);
                } catch (e) {
                    logger.error('Global handler error:', e);
                }
            });

            // Emit event
            this.emit('message', { channel, data });
        } catch (error) {
            logger.error('Failed to parse WebSocket message:', error);
        }
    }

    /**
     * Send message through WebSocket
     */
    send(channel: string, type: string, payload: Record<string, unknown>, options: WSConnectOptions = {}): boolean {
        const connection = this.connections.get(channel);
        const message: Record<string, unknown> = {
            type,
            ...payload,
            timestamp: Date.now(),
            id: this.generateMessageId(),
        };

        if (!connection || connection.state !== WS_STATES.CONNECTED) {
            // Queue message if not connected
            if (options.queue !== false) {
                this.queueMessage(channel, message);
            }
            return false;
        }

        try {
            connection.ws.send(JSON.stringify(message));
            this.stats.messagesSent++;
            return true;
        } catch (error) {
            logger.error('Failed to send message:', error);
            if (options.queue !== false) {
                this.queueMessage(channel, message);
            }
            return false;
        }
    }

    /**
     * Queue message for later delivery
     */
    queueMessage(channel: string, message: Record<string, unknown>) {
        if (!this.messageQueue.has(channel)) {
            this.messageQueue.set(channel, []);
        }

        const queue = this.messageQueue.get(channel)!;
        if (queue.length < (this.config.queueMaxSize as number)) {
            queue.push(message);
        }
    }

    /**
     * Flush queued messages
     */
    flushQueue(channel: string) {
        const queue = this.messageQueue.get(channel);
        if (!queue || queue.length === 0) return;

        const connection = this.connections.get(channel);
        if (!connection || connection.state !== WS_STATES.CONNECTED) return;

        while (queue.length > 0) {
            const message = queue.shift();
            try {
                connection.ws.send(JSON.stringify(message));
                this.stats.messagesSent++;
            } catch (error) {
                if (message) queue.unshift(message);
                break;
            }
        }
    }

    /**
     * Start heartbeat for connection
     */
    startHeartbeat(channel: string) {
        const connection = this.connections.get(channel);
        if (!connection) return;

        this.stopHeartbeat(channel);

        connection.heartbeatTimer = setInterval(() => {
            if (connection.state === WS_STATES.CONNECTED) {
                this.send(channel, MESSAGE_TYPES.PING, {}, { queue: false });
            }
        }, this.config.heartbeatInterval);
    }

    /**
     * Stop heartbeat for connection
     */
    stopHeartbeat(channel: string) {
        const connection = this.connections.get(channel);
        if (connection?.heartbeatTimer) {
            clearInterval(connection.heartbeatTimer);
            connection.heartbeatTimer = null;
        }
    }

    /**
     * Attempt a token refresh, then reconnect on success.
     * Called when the server closes the socket with an auth-rejection code
     * (4001 unauthorized, 4003 forbidden, 4004 not found/disconnected).
     * Does NOT increment reconnectAttempts — the expired token is not a
     * transient network failure, so the reconnect budget is preserved.
     */
    async refreshTokenThenReconnect(channel: string): Promise<void> {
        const connection = this.connections.get(channel);
        if (!connection) return;

        logger.debug(`[WebSocket] Auth rejection on "${channel}" — attempting token refresh`);

        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refresh: refreshToken }),
            });

            if (!response.ok) {
                throw new Error(`Token refresh failed with status ${response.status}`);
            }

            const data = await response.json() as { access?: string };
            if (data.access) {
                localStorage.setItem('access_token', data.access);
                logger.debug(`[WebSocket] Token refreshed — reconnecting "${channel}"`);
                // Reset attempts so the fresh connection gets a full budget
                connection.reconnectAttempts = 0;
                await this.reconnect(channel);
            } else {
                throw new Error('Token refresh response missing access field');
            }
        } catch (err) {
            logger.error(`[WebSocket] Token refresh failed for "${channel}" — emitting authError`, err);
            this.emit('authError', { channel, error: (err as Error).message });
        }
    }

    /**
     * Schedule reconnection
     */
    scheduleReconnect(channel: string) {
        const connection = this.connections.get(channel);
        if (!connection) return;

        if (connection.reconnectAttempts >= this.config.reconnectAttempts) {
            this.emit('maxReconnectAttempts', { channel });
            return;
        }

        connection.state = WS_STATES.RECONNECTING;
        connection.reconnectAttempts++;
        this.stats.reconnects++;

        const delay = Math.min(
            this.config.reconnectDelay *
                Math.pow(this.config.reconnectMultiplier, connection.reconnectAttempts - 1),
            this.config.maxReconnectDelay
        );

        setTimeout(() => {
            this.reconnect(channel);
        }, delay);
    }

    /**
     * Reconnect to channel
     */
    async reconnect(channel: string) {
        const connection = this.connections.get(channel);
        if (!connection) return;

        // Close existing connection
        if (connection.ws) {
            try {
                connection.ws.close();
            } catch (e) {
                logger.debug('[WebSocket] Close during reconnect:', (e as Error).message);
            }
        }

        // Reconnect with same options
        try {
            await this.connect(channel, connection.options);
        } catch (error) {
            this.scheduleReconnect(channel);
        }
    }

    /**
     * Disconnect from channel
     */
    disconnect(channel: string, code = 1000) {
        const connection = this.connections.get(channel);
        if (!connection) return;

        this.stopHeartbeat(channel);

        if (connection.ws) {
            connection.ws.close(code);
        }

        this.connections.delete(channel);
        this.handlers.delete(channel);
        this.messageQueue.delete(channel);
    }

    /**
     * Disconnect all channels
     */
    disconnectAll() {
        this.connections.forEach((_, channel) => {
            this.disconnect(channel);
        });
    }

    /**
     * Register message handler for channel
     */
    on(channel: string, handler: MessageHandler): () => void {
        if (!this.handlers.has(channel)) {
            this.handlers.set(channel, []);
        }
        this.handlers.get(channel)!.push(handler);

        // Return unsubscribe function
        return () => {
            const handlers = this.handlers.get(channel);
            if (handlers) {
                const index = handlers.indexOf(handler);
                if (index > -1) handlers.splice(index, 1);
            }
        };
    }

    /**
     * Register global message handler
     */
    onGlobal(handler: MessageHandler): () => void {
        this.globalHandlers.push(handler);
        return () => {
            const index = this.globalHandlers.indexOf(handler);
            if (index > -1) this.globalHandlers.splice(index, 1);
        };
    }

    /**
     * Event emitter
     */
    emit(event: string, data: Record<string, unknown>) {
        const customEvent = new CustomEvent(`ws:${event}`, { detail: data });
        window.dispatchEvent(customEvent);
    }

    /**
     * Generate unique message ID
     */
    generateMessageId(): string {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get connection state
     */
    getState(channel: string): WSState {
        const connection = this.connections.get(channel);
        return connection?.state || WS_STATES.DISCONNECTED;
    }

    /**
     * Get all active connections
     */
    getConnections(): Record<string, { state: WSState; lastActivity: number; reconnectAttempts: number }> {
        const result: Record<string, { state: WSState; lastActivity: number; reconnectAttempts: number }> = {};
        this.connections.forEach((conn, channel) => {
            result[channel] = {
                state: conn.state,
                lastActivity: conn.lastActivity,
                reconnectAttempts: conn.reconnectAttempts,
            };
        });
        return result;
    }

    /**
     * Get statistics
     */
    getStats(): WSServiceStats {
        return { ...this.stats };
    }

    // =====================
    // CONVENIENCE METHODS
    // =====================

    /**
     * Connect to chat room
     */
    connectToRoom(roomId: string | number) {
        return this.connect(`chat/${roomId}`, {
            params: { room_id: String(roomId) },
        });
    }

    /**
     * Connect to voice channel
     */
    connectToVoice(roomId: string | number) {
        return this.connect(`voice/${roomId}`, {
            params: { room_id: String(roomId) },
        });
    }

    /**
     * Connect to user presence/status
     */
    connectToStatus(username: string) {
        return this.connect('status', {
            username,
            params: { username },
        });
    }

    /**
     * Connect to notifications
     */
    connectToNotifications() {
        return this.connect('notifications');
    }

    /**
     * Send chat message
     */
    sendChatMessage(roomId: string | number, content: string, options: Record<string, unknown> = {}) {
        return this.send(`chat/${roomId}`, MESSAGE_TYPES.CHAT, {
            content,
            ...options,
        });
    }

    /**
     * Send typing indicator
     */
    sendTyping(roomId: string | number, isTyping = true) {
        return this.send(`chat/${roomId}`, MESSAGE_TYPES.TYPING, {
            typing: isTyping,
        });
    }

    /**
     * Send presence update
     */
    sendPresence(status: string, activity: string | null = null) {
        return this.send('status', MESSAGE_TYPES.PRESENCE, {
            status,
            activity: activity ?? undefined,
        });
    }

    /**
     * Send reaction
     */
    sendReaction(roomId: string | number, messageId: string | number, emoji: string) {
        return this.send(`chat/${roomId}`, MESSAGE_TYPES.REACTION, {
            message_id: messageId,
            emoji,
        });
    }
}

// Export singleton instance
export const wsService = new WebSocketService();
export default wsService;

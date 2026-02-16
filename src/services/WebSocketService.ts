// frontend/src/services/WebSocketService.ts
// Enterprise-grade WebSocket Service
// Advanced WebSocket manager with auto-reconnect, heartbeat, and message queuing

import { WS_PROTOCOL, API_HOST } from '../utils/constants';

/**
 * WebSocket Connection States
 */
export const WS_STATES = {
    CONNECTING: 'CONNECTING',
    CONNECTED: 'CONNECTED',
    DISCONNECTED: 'DISCONNECTED',
    RECONNECTING: 'RECONNECTING',
    ERROR: 'ERROR'
} as const;

export type WSState = typeof WS_STATES[keyof typeof WS_STATES];

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
    PONG: 'pong'
} as const;

/**
 * WebSocket Manager Class
 */
type MessageHandler = (data: Record<string, unknown>) => void;

class WebSocketService {
    connections: Map<string, WebSocket>;
    messageQueue: Map<string, Array<Record<string, unknown>>>;
    handlers: Map<string, Set<MessageHandler>>;
    globalHandlers: MessageHandler[];
    config: Record<string, unknown>;

    constructor() {
        this.connections = new Map();
        this.messageQueue = new Map();
        this.handlers = new Map();
        this.globalHandlers = [];

        this.config = {
            reconnectAttempts: 10,
            reconnectDelay: 1000,
            reconnectMultiplier: 1.5,
            maxReconnectDelay: 30000,
            heartbeatInterval: 30000,
            messageTimeout: 10000,
            queueMaxSize: 100
        };

        this.stats = {
            messagesSent: 0,
            messagesReceived: 0,
            reconnects: 0,
            errors: 0
        };

        // Setup visibility change handler
        this.setupVisibilityHandler();
    }

    /**
     * Handle page visibility changes
     */
    setupVisibilityHandler() {
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                // Reconnect all sockets when page becomes visible
                this.connections.forEach((conn, channel) => {
                    if (conn.state === WS_STATES.DISCONNECTED) {
                        this.reconnect(channel);
                    }
                });
            }
        });
    }

    /**
     * Connect to a WebSocket channel
     */
    connect(channel, options = {}) {
        if (this.connections.has(channel)) {
            const existing = this.connections.get(channel);
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

            const connection = {
                ws,
                channel,
                state: WS_STATES.CONNECTING,
                reconnectAttempts: 0,
                lastActivity: Date.now(),
                heartbeatTimer: null,
                options
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

            ws.onmessage = (event) => {
                this.handleMessage(channel, event);
            };

            ws.onclose = (event) => {
                connection.state = WS_STATES.DISCONNECTED;
                this.stopHeartbeat(channel);
                this.emit('disconnect', { channel, code: event.code });

                // Auto-reconnect if not intentional close
                if (event.code !== 1000 && event.code !== 1001) {
                    this.scheduleReconnect(channel);
                }
            };

            ws.onerror = (error) => {
                console.error(`🔌 [WS] Error: ${channel}`, error);
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
    buildURL(channel, token, options = {}) {
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
    handleMessage(channel, event) {
        try {
            const data = JSON.parse(event.data);
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
            channelHandlers.forEach(handler => {
                try {
                    handler(data, channel);
                } catch (e) {
                    console.error('Handler error:', e);
                }
            });

            // Call global handlers
            this.globalHandlers.forEach(handler => {
                try {
                    handler(data, channel);
                } catch (e) {
                    console.error('Global handler error:', e);
                }
            });

            // Emit event
            this.emit('message', { channel, data });

        } catch (error) {
            console.error('Failed to parse WebSocket message:', error);
        }
    }

    /**
     * Send message through WebSocket
     */
    send(channel, type, payload, options = {}) {
        const connection = this.connections.get(channel);
        const message = {
            type,
            ...payload,
            timestamp: Date.now(),
            id: this.generateMessageId()
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
            console.error('Failed to send message:', error);
            if (options.queue !== false) {
                this.queueMessage(channel, message);
            }
            return false;
        }
    }

    /**
     * Queue message for later delivery
     */
    queueMessage(channel, message) {
        if (!this.messageQueue.has(channel)) {
            this.messageQueue.set(channel, []);
        }

        const queue = this.messageQueue.get(channel);
        if (queue.length < this.config.queueMaxSize) {
            queue.push(message);
        }
    }

    /**
     * Flush queued messages
     */
    flushQueue(channel) {
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
                queue.unshift(message);
                break;
            }
        }
    }

    /**
     * Start heartbeat for connection
     */
    startHeartbeat(channel) {
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
    stopHeartbeat(channel) {
        const connection = this.connections.get(channel);
        if (connection?.heartbeatTimer) {
            clearInterval(connection.heartbeatTimer);
            connection.heartbeatTimer = null;
        }
    }

    /**
     * Schedule reconnection
     */
    scheduleReconnect(channel) {
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
            this.config.reconnectDelay * Math.pow(this.config.reconnectMultiplier, connection.reconnectAttempts - 1),
            this.config.maxReconnectDelay
        );


        setTimeout(() => {
            this.reconnect(channel);
        }, delay);
    }

    /**
     * Reconnect to channel
     */
    async reconnect(channel) {
        const connection = this.connections.get(channel);
        if (!connection) return;

        // Close existing connection
        if (connection.ws) {
            try {
                connection.ws.close();
            } catch (e) { console.debug('[WebSocket] Close during reconnect:', e.message); }
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
    disconnect(channel, code = 1000) {
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
    on(channel, handler) {
        if (!this.handlers.has(channel)) {
            this.handlers.set(channel, []);
        }
        this.handlers.get(channel).push(handler);

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
    onGlobal(handler) {
        this.globalHandlers.push(handler);
        return () => {
            const index = this.globalHandlers.indexOf(handler);
            if (index > -1) this.globalHandlers.splice(index, 1);
        };
    }

    /**
     * Event emitter
     */
    emit(event, data) {
        const customEvent = new CustomEvent(`ws:${event}`, { detail: data });
        window.dispatchEvent(customEvent);
    }

    /**
     * Generate unique message ID
     */
    generateMessageId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Get connection state
     */
    getState(channel) {
        const connection = this.connections.get(channel);
        return connection?.state || WS_STATES.DISCONNECTED;
    }

    /**
     * Get all active connections
     */
    getConnections() {
        const result = {};
        this.connections.forEach((conn, channel) => {
            result[channel] = {
                state: conn.state,
                lastActivity: conn.lastActivity,
                reconnectAttempts: conn.reconnectAttempts
            };
        });
        return result;
    }

    /**
     * Get statistics
     */
    getStats() {
        return { ...this.stats };
    }

    // =====================
    // CONVENIENCE METHODS
    // =====================

    /**
     * Connect to chat room
     */
    connectToRoom(roomId) {
        return this.connect(`chat/${roomId}`, {
            params: { room_id: roomId }
        });
    }

    /**
     * Connect to voice channel
     */
    connectToVoice(roomId) {
        return this.connect(`voice/${roomId}`, {
            params: { room_id: roomId }
        });
    }

    /**
     * Connect to user presence/status
     */
    connectToStatus(username) {
        return this.connect('status', {
            username,
            params: { username }
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
    sendChatMessage(roomId, content, options = {}) {
        return this.send(`chat/${roomId}`, MESSAGE_TYPES.CHAT, {
            content,
            ...options
        });
    }

    /**
     * Send typing indicator
     */
    sendTyping(roomId, isTyping = true) {
        return this.send(`chat/${roomId}`, MESSAGE_TYPES.TYPING, {
            typing: isTyping
        });
    }

    /**
     * Send presence update
     */
    sendPresence(status, activity = null) {
        return this.send('status', MESSAGE_TYPES.PRESENCE, {
            status,
            activity
        });
    }

    /**
     * Send reaction
     */
    sendReaction(roomId, messageId, emoji) {
        return this.send(`chat/${roomId}`, MESSAGE_TYPES.REACTION, {
            message_id: messageId,
            emoji
        });
    }
}

// Export singleton instance
export const wsService = new WebSocketService();
export default wsService;

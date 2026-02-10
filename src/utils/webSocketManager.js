// frontend/src/utils/webSocketManager.js

/**
 * 🔌 WebSocket Manager
 * Robust WebSocket connection with auto-reconnect, heartbeat, and message queue
 */

class WebSocketManager {
    constructor(url, options = {}) {
        this.url = url;
        this.ws = null;
        this.isConnected = false;
        this.isReconnecting = false;

        // Options
        this.reconnectDelay = options.reconnectDelay || 1000;
        this.maxReconnectDelay = options.maxReconnectDelay || 30000;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = options.maxReconnectAttempts || Infinity;
        this.heartbeatInterval = options.heartbeatInterval || 30000;
        this.heartbeatTimeout = options.heartbeatTimeout || 5000;
        this.messageQueueSize = options.messageQueueSize || 100;

        // State
        this.messageQueue = [];
        this.listeners = new Map();
        this.heartbeatTimer = null;
        this.heartbeatTimeoutTimer = null;
        this.reconnectTimer = null;

        // Auto connect
        if (options.autoConnect !== false) {
            this.connect();
        }
    }

    /**
     * Connect to WebSocket
     */
    connect() {
        if (this.ws && (this.ws.readyState === WebSocket.CONNECTING || this.ws.readyState === WebSocket.OPEN)) {
            console.warn('WebSocket already connecting or connected');
            return;
        }

        try {
            this.ws = new WebSocket(this.url);
            this.setupEventHandlers();

            if (import.meta.env.MODE === 'development') {
            }
        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.scheduleReconnect();
        }
    }

    /**
     * Setup WebSocket event handlers
     */
    setupEventHandlers() {
        if (!this.ws) return;

        this.ws.onopen = (event) => {
            this.isConnected = true;
            this.isReconnecting = false;
            this.reconnectAttempts = 0;

            this.emit('open', event);

            // Send queued messages
            this.flushMessageQueue();

            // Start heartbeat
            this.startHeartbeat();
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Handle heartbeat pong
                if (data.type === 'pong') {
                    this.handleHeartbeatResponse();
                    return;
                }

                this.emit('message', data);

                // Emit specific event type
                if (data.type) {
                    this.emit(data.type, data);
                }

                if (import.meta.env.MODE === 'development') {
                }
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
                this.emit('error', error);
            }
        };

        this.ws.onerror = (error) => {
            console.error('❌ [WebSocket] Error:', error);
            this.emit('error', error);
        };

        this.ws.onclose = (event) => {
            this.isConnected = false;
            this.stopHeartbeat();

            this.emit('close', event);

            // Auto reconnect if not a normal closure
            if (event.code !== 1000 && !this.isReconnecting) {
                this.scheduleReconnect();
            }
        };
    }

    /**
     * Send message
     */
    send(data) {
        const message = typeof data === 'string' ? data : JSON.stringify(data);

        if (this.isConnected && this.ws && this.ws.readyState === WebSocket.OPEN) {
            try {
                this.ws.send(message);

                if (import.meta.env.MODE === 'development') {
                }

                return true;
            } catch (error) {
                console.error('Failed to send WebSocket message:', error);
                this.queueMessage(message);
                return false;
            }
        } else {
            this.queueMessage(message);
            return false;
        }
    }

    /**
     * Queue message for later
     */
    queueMessage(message) {
        if (this.messageQueue.length >= this.messageQueueSize) {
            this.messageQueue.shift(); // Remove oldest
        }

        this.messageQueue.push(message);

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Flush message queue
     */
    flushMessageQueue() {
        if (this.messageQueue.length === 0) return;


        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            try {
                this.ws.send(message);
            } catch (error) {
                console.error('Failed to flush message:', error);
                // Re-queue if failed
                this.messageQueue.unshift(message);
                break;
            }
        }
    }

    /**
     * Start heartbeat
     */
    startHeartbeat() {
        this.stopHeartbeat();

        this.heartbeatTimer = setInterval(() => {
            if (this.isConnected) {
                this.send({ type: 'ping', timestamp: Date.now() });

                // Set timeout for pong response
                this.heartbeatTimeoutTimer = setTimeout(() => {
                    console.warn('⚠️ [WebSocket] Heartbeat timeout - reconnecting');
                    this.reconnect();
                }, this.heartbeatTimeout);
            }
        }, this.heartbeatInterval);
    }

    /**
     * Stop heartbeat
     */
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }

        if (this.heartbeatTimeoutTimer) {
            clearTimeout(this.heartbeatTimeoutTimer);
            this.heartbeatTimeoutTimer = null;
        }
    }

    /**
     * Handle heartbeat response
     */
    handleHeartbeatResponse() {
        if (this.heartbeatTimeoutTimer) {
            clearTimeout(this.heartbeatTimeoutTimer);
            this.heartbeatTimeoutTimer = null;
        }
    }

    /**
     * Schedule reconnect
     */
    scheduleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('❌ [WebSocket] Max reconnect attempts reached');
            this.emit('maxReconnectAttempts');
            return;
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;

        // Exponential backoff
        const delay = Math.min(
            this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
            this.maxReconnectDelay
        );


        this.reconnectTimer = setTimeout(() => {
            this.connect();
        }, delay);

        this.emit('reconnecting', {
            attempt: this.reconnectAttempts,
            delay
        });
    }

    /**
     * Reconnect immediately
     */
    reconnect() {
        this.close();

        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }

        this.connect();
    }

    /**
     * Close connection
     */
    close(code = 1000, reason = 'Normal closure') {
        this.stopHeartbeat();

        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }

        if (this.ws) {
            try {
                this.ws.close(code, reason);
            } catch (error) {
                console.error('Error closing WebSocket:', error);
            }
            this.ws = null;
        }

        this.isConnected = false;
        this.isReconnecting = false;
    }

    /**
     * Event emitter
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);

        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.listeners.has(event)) return;

        const callbacks = this.listeners.get(event);
        const index = callbacks.indexOf(callback);

        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }

    emit(event, data) {
        if (!this.listeners.has(event)) return;

        this.listeners.get(event).forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in ${event} listener:`, error);
            }
        });
    }

    /**
     * Get connection state
     */
    getState() {
        if (!this.ws) return 'disconnected';

        const states = {
            [WebSocket.CONNECTING]: 'connecting',
            [WebSocket.OPEN]: 'connected',
            [WebSocket.CLOSING]: 'closing',
            [WebSocket.CLOSED]: 'disconnected'
        };

        return states[this.ws.readyState] || 'unknown';
    }
}

/**
 * React Hook - WebSocket
 */
export const useWebSocket = (url, options = {}) => {
    const [ws] = React.useState(() => new WebSocketManager(url, options));
    const [isConnected, setIsConnected] = React.useState(false);
    const [lastMessage, setLastMessage] = React.useState(null);

    React.useEffect(() => {
        const handleOpen = () => setIsConnected(true);
        const handleClose = () => setIsConnected(false);
        const handleMessage = (data) => setLastMessage(data);

        ws.on('open', handleOpen);
        ws.on('close', handleClose);
        ws.on('message', handleMessage);

        return () => {
            ws.off('open', handleOpen);
            ws.off('close', handleClose);
            ws.off('message', handleMessage);
            ws.close();
        };
    }, [ws]);

    const send = React.useCallback((data) => {
        return ws.send(data);
    }, [ws]);

    const reconnect = React.useCallback(() => {
        ws.reconnect();
    }, [ws]);

    return {
        isConnected,
        lastMessage,
        send,
        reconnect,
        ws
    };
};

/**
 * React Hook - WebSocket with event handlers
 */
export const useWebSocketEvent = (url, eventHandlers = {}, options = {}) => {
    const [ws] = React.useState(() => new WebSocketManager(url, options));
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        const handleOpen = () => setIsConnected(true);
        const handleClose = () => setIsConnected(false);

        ws.on('open', handleOpen);
        ws.on('close', handleClose);

        // Register event handlers
        Object.keys(eventHandlers).forEach(event => {
            ws.on(event, eventHandlers[event]);
        });

        return () => {
            ws.off('open', handleOpen);
            ws.off('close', handleClose);

            Object.keys(eventHandlers).forEach(event => {
                ws.off(event, eventHandlers[event]);
            });

            ws.close();
        };
    }, [ws, eventHandlers]);

    const send = React.useCallback((data) => {
        return ws.send(data);
    }, [ws]);

    return { isConnected, send, ws };
};

export default WebSocketManager;



// ⚡ WEBSOCKET OPTIMIZATION
// Enhanced WebSocket with reconnection, batching, and compression

export class OptimizedWebSocket {
    constructor(url, options = {}) {
        this.url = url;
        this.options = {
            reconnectInterval: 3000,
            reconnectDecay: 1.5,
            maxReconnectInterval: 30000,
            maxReconnectAttempts: 10,
            batchInterval: 50, // Batch messages every 50ms
            enableCompression: true,
            heartbeatInterval: 30000,
            ...options,
        };

        this.ws = null;
        this.reconnectAttempts = 0;
        this.reconnectTimer = null;
        this.messageQueue = [];
        this.batchTimer = null;
        this.heartbeatTimer = null;
        this.listeners = new Map();
        this.isConnected = false;
        this.isReconnecting = false;
    }

    connect() {
        try {
            this.ws = new WebSocket(this.url);
            this.setupEventHandlers();
            this.startHeartbeat();
        } catch (error) {
            console.error('WebSocket connection error:', error);
            this.scheduleReconnect();
        }
    }

    setupEventHandlers() {
        this.ws.onopen = () => {
            this.isConnected = true;
            this.isReconnecting = false;
            this.reconnectAttempts = 0;
            this.emit('open');
            this.flushMessageQueue();
        };

        this.ws.onclose = (event) => {
            this.isConnected = false;
            this.emit('close', event);
            this.stopHeartbeat();

            if (!event.wasClean && this.reconnectAttempts < this.options.maxReconnectAttempts) {
                this.scheduleReconnect();
            }
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.emit('error', error);
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);

                // Handle pong response
                if (data.type === 'pong') {
                    return;
                }

                this.emit('message', data);
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };
    }

    scheduleReconnect() {
        if (this.reconnectTimer || this.reconnectAttempts >= this.options.maxReconnectAttempts) {
            return;
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;

        // Calculate exponential backoff
        const interval = Math.min(
            this.options.reconnectInterval * Math.pow(this.options.reconnectDecay, this.reconnectAttempts - 1),
            this.options.maxReconnectInterval
        );


        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connect();
        }, interval);
    }

    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.isConnected) {
                this.send({ type: 'ping' }, true); // Skip batching for heartbeat
            }
        }, this.options.heartbeatInterval);
    }

    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = null;
        }
    }

    send(data, immediate = false) {
        const message = JSON.stringify(data);

        if (!this.isConnected) {
            // Queue message for later
            this.messageQueue.push(message);
            return;
        }

        if (immediate) {
            // Send immediately (for urgent messages)
            this.ws.send(message);
        } else {
            // Batch message
            this.messageQueue.push(message);
            this.scheduleBatch();
        }
    }

    scheduleBatch() {
        if (this.batchTimer) return;

        this.batchTimer = setTimeout(() => {
            this.flushMessageQueue();
            this.batchTimer = null;
        }, this.options.batchInterval);
    }

    flushMessageQueue() {
        if (this.messageQueue.length === 0 || !this.isConnected) return;

        // Send all queued messages
        while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            try {
                this.ws.send(message);
            } catch (error) {
                console.error('Failed to send message:', error);
                // Re-queue on error
                this.messageQueue.unshift(message);
                break;
            }
        }
    }

    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event).add(callback);

        // Return cleanup function
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.listeners.has(event)) return;
        this.listeners.get(event).delete(callback);
    }

    emit(event, data) {
        if (!this.listeners.has(event)) return;
        this.listeners.get(event).forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in WebSocket event handler for "${event}":`, error);
            }
        });
    }

    close() {
        // Clear timers
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        if (this.batchTimer) {
            clearTimeout(this.batchTimer);
            this.batchTimer = null;
        }
        this.stopHeartbeat();

        // Close connection
        if (this.ws) {
            this.ws.close(1000, 'Client closed connection');
            this.ws = null;
        }

        // Clear state
        this.isConnected = false;
        this.isReconnecting = false;
        this.messageQueue = [];
        this.listeners.clear();
    }

    getState() {
        return {
            isConnected: this.isConnected,
            isReconnecting: this.isReconnecting,
            reconnectAttempts: this.reconnectAttempts,
            queuedMessages: this.messageQueue.length,
            readyState: this.ws ? this.ws.readyState : WebSocket.CLOSED,
        };
    }
}

// React hook for optimized WebSocket
export function useOptimizedWebSocket(url, options = {}) {
    const [socket] = React.useState(() => new OptimizedWebSocket(url, options));
    const [isConnected, setIsConnected] = React.useState(false);

    React.useEffect(() => {
        socket.on('open', () => setIsConnected(true));
        socket.on('close', () => setIsConnected(false));
        socket.connect();

        return () => socket.close();
    }, [socket]);

    return { socket, isConnected };
}

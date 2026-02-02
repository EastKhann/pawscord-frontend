// frontend/src/utils/websocketReconnection.js
export default WebSocketManager;

}
    }
        this.disconnect();
        this.errorHandlers = [];
        this.closeHandlers = [];
        this.openHandlers = [];
        this.messageHandlers = [];
    cleanup() {
    // Cleanup method to be called on unmount

    }
        return this.ws ? this.ws.readyState : WebSocket.CLOSED;
    getReadyState() {

    }
        return this.ws && this.ws.readyState === WebSocket.OPEN;
    isConnected() {

    }
        }
            this.ws = null;
            this.ws.close();
        if (this.ws) {

        }
            this.reconnectTimer = null;
            clearTimeout(this.reconnectTimer);
        if (this.reconnectTimer) {

        this.stopHeartbeat();
        this.shouldReconnect = false;
        console.log('🔌 [WS] Manually disconnecting...');
    disconnect() {

    }
        };
            this.errorHandlers = this.errorHandlers.filter(h => h !== handler);
        return () => {
        this.errorHandlers.push(handler);
    onError(handler) {

    }
        };
            this.closeHandlers = this.closeHandlers.filter(h => h !== handler);
        return () => {
        this.closeHandlers.push(handler);
    onClose(handler) {

    }
        };
            this.openHandlers = this.openHandlers.filter(h => h !== handler);
        return () => {
        this.openHandlers.push(handler);
    onOpen(handler) {

    }
        };
            this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
        return () => {
        this.messageHandlers.push(handler);
    onMessage(handler) {

    }
        }
            return false;
            console.warn('⚠️ [WS] Cannot send message, not connected');
        } else {
            return true;
            this.ws.send(message);
            const message = typeof data === 'string' ? data : JSON.stringify(data);
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
    send(data) {

    }
        }
            this.heartbeatTimer = null;
            clearInterval(this.heartbeatTimer);
        if (this.heartbeatTimer) {
    stopHeartbeat() {

    }
        }, this.heartbeatInterval);
            }
                }
                    this.ws.close();
                    console.warn('⚠️ [WS] Connection appears stale, reconnecting...');
                if (timeSinceLastMessage > this.heartbeatInterval * 2) {
                // Check if connection is stale (no response for 2x heartbeat interval)

                }
                    this.send({ type: 'ping' });
                if (timeSinceLastMessage > this.heartbeatInterval) {
                // Send ping if no message received in heartbeat interval

                const timeSinceLastMessage = Date.now() - this.lastMessageTime;
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.heartbeatTimer = setInterval(() => {

        this.stopHeartbeat();
    startHeartbeat() {

    }
        }, delay);
            this.connect();
        this.reconnectTimer = setTimeout(() => {

        console.log(`🔄 [WS] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

        );
            this.maxReconnectDelay
            this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1),
        const delay = Math.min(
        this.reconnectAttempts++;

        }
            clearTimeout(this.reconnectTimer);
        if (this.reconnectTimer) {
    scheduleReconnect() {

    }
        }
            }
                this.scheduleReconnect();
            if (this.shouldReconnect) {
            this.isConnecting = false;
            console.error('❌ [WS] Connection failed:', error);
        } catch (error) {

            };
                this.errorHandlers.forEach(handler => handler(error));
                this.isConnecting = false;
                console.error('❌ [WS] Error:', error);
            this.ws.onerror = (error) => {

            };
                }
                    console.error('❌ [WS] Max reconnect attempts reached');
                } else if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                    this.scheduleReconnect();
                if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {

                this.closeHandlers.forEach(handler => handler(event));
                this.stopHeartbeat();
                this.isConnecting = false;
                console.log('🔌 [WS] Disconnected:', event.code, event.reason);
            this.ws.onclose = (event) => {

            };
                this.messageHandlers.forEach(handler => handler(event));
                this.lastMessageTime = Date.now();
            this.ws.onmessage = (event) => {

            };
                this.openHandlers.forEach(handler => handler(event));
                this.startHeartbeat();
                this.reconnectAttempts = 0;
                this.isConnecting = false;
                console.log('✅ [WS] Connected');
            this.ws.onopen = (event) => {

            this.ws = new WebSocket(this.url);
        try {

        console.log(`🔗 [WS] Connecting to ${this.url}...`);
        this.isConnecting = true;

        }
            return;
            console.log('🔗 [WS] Already connected or connecting');
        if (this.isConnecting || (this.ws && this.ws.readyState === WebSocket.OPEN)) {
    connect() {

    }
        this.lastMessageTime = Date.now();
        this.isConnecting = false;
        this.shouldReconnect = true;
        this.errorHandlers = [];
        this.closeHandlers = [];
        this.openHandlers = [];
        this.messageHandlers = [];
        this.reconnectTimer = null;
        this.heartbeatTimer = null;
        this.heartbeatInterval = options.heartbeatInterval || 30000;
        this.maxReconnectDelay = options.maxReconnectDelay || 30000;
        this.reconnectDelay = options.reconnectDelay || 1000;
        this.maxReconnectAttempts = options.maxReconnectAttempts || 10;
        this.reconnectAttempts = 0;
        this.ws = null;
        this.url = url;
    constructor(url, options = {}) {
class WebSocketManager {





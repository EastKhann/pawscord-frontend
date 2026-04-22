import logger from '../utils/logger';
// frontend/src/utils/websocketReconnect.js

/**
 * 🔌 WebSocket Reconnection Manager
 * Bağlantı koptuğunda otomatik yeniden bağlanma
 * Exponential backoff stratejisi with akıllı yeniden deneme
 */

// PropTypes validation: N/A for this module (hook/utility — no React props interface)
// Accessibility (aria): N/A for this module (hook/context/utility — no rendered DOM)
// aria-label: n/a — hook/context/utility module, no directly rendered JSX
class WebSocketReconnectManager {
    constructor(options = {}) {
        this.options = {
            maxReconnectAttempts: options.maxReconnectAttempts || 10,
            initialDelay: options.initialDelay || 1000, // 1 saniye
            maxDelay: options.maxDelay || 30000, // 30 saniye
            backoffMultiplier: options.backoffMultiplier || 1.5,
            debug: options.debug || false,
        };

        this.reconnectAttempts = 0;
        this.reconnectTimer = null;
        this.isReconnecting = false;
        this.listners = new Set();
    }

    /**
     * Reconnect event listner add
     * @param {Function} callback - Callback fonksiyonu
     */
    onReconnect(callback) {
        this.listners.add(callback);
        return () => this.listners.delete(callback);
    }

    /**
     * Dinleyicforward bilgwithndir
     * @param {string} event - Event tipi
     * @param {any} data - Event verisi
     */
    notify(event, data) {
        this.listners.forEach((callback) => {
            try {
                callback({ event, data });
            } catch (error) {
                logger.error('❌ [WSReconnect] Listener error:', error);
            }
        });
    }

    /**
     * Yeniden bağlanma gecikmesini hesapla (exponential backoff)
     * @returns {number} Gecikme süresi (ms)
     */
    calculateDelay() {
        const delay = Math.min(
            this.options.initialDelay *
                Math.pow(this.options.backoffMultiplier, this.reconnectAttempts),
            this.options.maxDelay
        );
        return delay;
    }

    /**
     * WebSocket yeniden bağlanma işlemini başlat
     * @param {Function} connectCallback - Connectma fonksiyonu
     */
    startReconnect(connectCallback) {
        if (this.isReconnecting) {
            this.log('⚠️ Reconnection process is already in progress');
            return;
        }

        if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
            this.log('❌ Maximum reconnection attempts exceeded');
            this.notify('max_attempts_reached', { attempts: this.reconnectAttempts });
            return;
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;

        const delay = this.calculateDelay();
        this.log(
            `🔄 Reconnecting ${this.reconnectAttempts}/${this.options.maxReconnectAttempts} (in ${delay}ms)`
        );

        this.notify('reconnecting', {
            attempt: this.reconnectAttempts,
            delay,
            maxAttempts: this.options.maxReconnectAttempts,
        });

        this.reconnectTimer = setTimeout(() => {
            this.log('🔌 Starting reconnection attempt...');
            this.isReconnecting = false;

            try {
                connectCallback();
            } catch (error) {
                this.log('❌ Reconnection error:', error);
                this.notify('reconnect_failed', { error });
                this.startReconnect(connectCallback); // Try again
            }
        }, delay);
    }

    /**
     * Yeniden bağlanma işlemini cancel et
     */
    cancelReconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.isReconnecting = false;
        this.log('🛑 Reconnection cancelled');
        this.notify('reconnect_cancelled', {});
    }

    /**
     * Successful bağlantıdan sonra sıfırla
     */
    reset() {
        this.reconnectAttempts = 0;
        this.cancelReconnect();
        this.log('✅ Reconnect manager reset');
        this.notify('connected', {});
    }

    /**
     * Debug log
     */
    log(...args) {
        if (this.options.debug) {
        }
    }

    /**
     * Status bilgisi
     */
    getStatus() {
        return {
            isReconnecting: this.isReconnecting,
            reconnectAttempts: this.reconnectAttempts,
            maxAttempts: this.options.maxReconnectAttempts,
            nextDelay: this.calculateDelay(),
        };
    }
}

/**
 * WebSocket wrapper with kullanım
 */
export class ReconnectingWebSocket {
    constructor(url, options = {}) {
        this.url = url;
        this.options = options;
        this.ws = null;
        this.reconnectManager = new WebSocketReconnectManager({
            debug: options.debug || false,
            maxReconnectAttempts: options.maxReconnectAttempts || 10,
        });

        this.messageQueue = []; // Bağlantı koptuğunda mesajları kuyruğa al
        this.eventHandlers = new Map();
    }

    /**
     * WebSocket bağlantısı kur
     */
    connect() {
        try {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => {
                this.reconnectManager.reset();

                // Kuyruktaki mesajları gönder
                while (this.messageQueue.length > 0) {
                    const message = this.messageQueue.shift();
                    this.send(message);
                }

                this.triggerEvent('open');
            };

            this.ws.onclose = (event) => {
                logger.warn('⚠️ [ReconnectWS] Connection closed:', event.code, event.reason);
                this.triggerEvent('close', event);

                // Auto yeniden bağlan (normal kapanma değilse)
                if (event.code !== 1000) {
                    this.reconnectManager.startReconnect(() => this.connect());
                }
            };

            this.ws.onerror = (error) => {
                logger.error('❌ [ReconnectWS] Error:', error);
                this.triggerEvent('error', error);
            };

            this.ws.onmessage = (event) => {
                this.triggerEvent('message', event);
            };
        } catch (error) {
            logger.error('❌ [ReconnectWS] Connection error:', error);
            this.reconnectManager.startReconnect(() => this.connect());
        }
    }

    /**
     * Mesaj gönder
     * @param {any} data - Sendilecek veri
     */
    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(typeof data === 'string' ? data : JSON.stringify(data));
        } else {
            logger.warn('⚠️ [ReconnectWS] Connection unavailable, message queued');
            this.messageQueue.push(data);
        }
    }

    /**
     * Event handler add
     * @param {string} event - Event tipi (open, close, error, message)
     * @param {Function} callback - Callback fonksiyonu
     */
    on(event, callback) {
        if (!this.eventHandlers.has(event)) {
            this.eventHandlers.set(event, new Set());
        }
        this.eventHandlers.get(event).add(callback);
    }

    /**
     * Event handler kaldır
     */
    off(event, callback) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).delete(callback);
        }
    }

    /**
     * Event tetikle
     */
    triggerEvent(event, data) {
        if (this.eventHandlers.has(event)) {
            this.eventHandlers.get(event).forEach((callback) => callback(data));
        }
    }

    /**
     * Bağlantıyı close
     */
    close(code = 1000, reason = 'Normal closure') {
        this.reconnectManager.cancelReconnect();
        if (this.ws) {
            this.ws.close(code, reason);
        }
    }

    /**
     * Bağlantı durumu
     */
    get readyState() {
        return this.ws ? this.ws.readyState : WebSocket.CLOSED;
    }
}

export default WebSocketReconnectManager;

// frontend/src/utils/websocketReconnect.js

/**
 * 🔌 WebSocket Reconnection Manager
 * Bağlantı koptuğunda otomatik yeniden bağlanma
 * Exponential backoff stratejisi ile akıllı yeniden deneme
 */

class WebSocketReconnectManager {
    constructor(options = {}) {
        this.options = {
            maxReconnectAttempts: options.maxReconnectAttempts || 10,
            initialDelay: options.initialDelay || 1000, // 1 saniye
            maxDelay: options.maxDelay || 30000, // 30 saniye
            backoffMultiplier: options.backoffMultiplier || 1.5,
            debug: options.debug || false
        };

        this.reconnectAttempts = 0;
        this.reconnectTimer = null;
        this.isReconnecting = false;
        this.listeners = new Set();
    }

    /**
     * Reconnect event listener ekle
     * @param {Function} callback - Callback fonksiyonu
     */
    onReconnect(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    /**
     * Dinleyicileri bilgilendir
     * @param {string} event - Event tipi
     * @param {any} data - Event verisi
     */
    notify(event, data) {
        this.listeners.forEach(callback => {
            try {
                callback({ event, data });
            } catch (error) {
                console.error('❌ [WSReconnect] Listener hatası:', error);
            }
        });
    }

    /**
     * Yeniden bağlanma gecikmesini hesapla (exponential backoff)
     * @returns {number} Gecikme süresi (ms)
     */
    calculateDelay() {
        const delay = Math.min(
            this.options.initialDelay * Math.pow(this.options.backoffMultiplier, this.reconnectAttempts),
            this.options.maxDelay
        );
        return delay;
    }

    /**
     * WebSocket yeniden bağlanma işlemini başlat
     * @param {Function} connectCallback - Bağlanma fonksiyonu
     */
    startReconnect(connectCallback) {
        if (this.isReconnecting) {
            this.log('⚠️ Zaten yeniden bağlanma işlemi devam ediyor');
            return;
        }

        if (this.reconnectAttempts >= this.options.maxReconnectAttempts) {
            this.log('❌ Maksimum yeniden bağlanma denemesi aşıldı');
            this.notify('max_attempts_reached', { attempts: this.reconnectAttempts });
            return;
        }

        this.isReconnecting = true;
        this.reconnectAttempts++;

        const delay = this.calculateDelay();
        this.log(`🔄 Yeniden bağlanma ${this.reconnectAttempts}/${this.options.maxReconnectAttempts} (${delay}ms sonra)`);

        this.notify('reconnecting', {
            attempt: this.reconnectAttempts,
            delay,
            maxAttempts: this.options.maxReconnectAttempts
        });

        this.reconnectTimer = setTimeout(() => {
            this.log('🔌 Yeniden bağlanma denemesi başlatılıyor...');
            this.isReconnecting = false;

            try {
                connectCallback();
            } catch (error) {
                this.log('❌ Yeniden bağlanma hatası:', error);
                this.notify('reconnect_failed', { error });
                this.startReconnect(connectCallback); // Tekrar dene
            }
        }, delay);
    }

    /**
     * Yeniden bağlanma işlemini iptal et
     */
    cancelReconnect() {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer);
            this.reconnectTimer = null;
        }
        this.isReconnecting = false;
        this.log('🛑 Yeniden bağlanma iptal edildi');
        this.notify('reconnect_cancelled', {});
    }

    /**
     * Başarılı bağlantıdan sonra sıfırla
     */
    reset() {
        this.reconnectAttempts = 0;
        this.cancelReconnect();
        this.log('✅ Reconnect manager sıfırlandı');
        this.notify('connected', {});
    }

    /**
     * Debug log
     */
    log(...args) {
        if (this.options.debug) {
            console.log('[WSReconnect]', ...args);
        }
    }

    /**
     * Durum bilgisi
     */
    getStatus() {
        return {
            isReconnecting: this.isReconnecting,
            reconnectAttempts: this.reconnectAttempts,
            maxAttempts: this.options.maxReconnectAttempts,
            nextDelay: this.calculateDelay()
        };
    }
}

/**
 * WebSocket wrapper ile kullanım
 */
export class ReconnectingWebSocket {
    constructor(url, options = {}) {
        this.url = url;
        this.options = options;
        this.ws = null;
        this.reconnectManager = new WebSocketReconnectManager({
            debug: options.debug || false,
            maxReconnectAttempts: options.maxReconnectAttempts || 10
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
                console.log('✅ [ReconnectWS] Bağlantı kuruldu');
                this.reconnectManager.reset();

                // Kuyruktaki mesajları gönder
                while (this.messageQueue.length > 0) {
                    const message = this.messageQueue.shift();
                    this.send(message);
                }

                this.triggerEvent('open');
            };

            this.ws.onclose = (event) => {
                console.warn('⚠️ [ReconnectWS] Bağlantı kapandı:', event.code, event.reason);
                this.triggerEvent('close', event);

                // Otomatik yeniden bağlan (normal kapanma değilse)
                if (event.code !== 1000) {
                    this.reconnectManager.startReconnect(() => this.connect());
                }
            };

            this.ws.onerror = (error) => {
                console.error('❌ [ReconnectWS] Hata:', error);
                this.triggerEvent('error', error);
            };

            this.ws.onmessage = (event) => {
                this.triggerEvent('message', event);
            };

        } catch (error) {
            console.error('❌ [ReconnectWS] Bağlantı hatası:', error);
            this.reconnectManager.startReconnect(() => this.connect());
        }
    }

    /**
     * Mesaj gönder
     * @param {any} data - Gönderilecek veri
     */
    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(typeof data === 'string' ? data : JSON.stringify(data));
        } else {
            console.warn('⚠️ [ReconnectWS] Bağlantı yok, mesaj kuyruğa alındı');
            this.messageQueue.push(data);
        }
    }

    /**
     * Event handler ekle
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
            this.eventHandlers.get(event).forEach(callback => callback(data));
        }
    }

    /**
     * Bağlantıyı kapat
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



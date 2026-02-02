// frontend/src/utils/rateLimiter.js
import toast from './toast';

/**
 * 🛡️ Rate Limiter - Frontend güvenlik katmanı
 * Kullanıcının aşırı istek göndermesini engeller
 * DDoS koruması ve spam önleme
 */

class RateLimiter {
    constructor() {
        this.requests = new Map(); // action -> timestamps[]
        this.limits = {
            // Mesaj gönderme (5 mesaj/saniye)
            sendMessage: { maxRequests: 5, windowMs: 1000 },

            // Dosya yükleme (3 dosya/10 saniye)
            uploadFile: { maxRequests: 3, windowMs: 10000 },

            // API çağrıları (30 istek/dakika)
            apiCall: { maxRequests: 30, windowMs: 60000 },

            // Login denemesi (5 deneme/dakika)
            login: { maxRequests: 5, windowMs: 60000 },

            // Arkadaş ekleme (10 istek/dakika)
            addFriend: { maxRequests: 10, windowMs: 60000 },

            // Mesaj düzenleme (10 düzenleme/dakika)
            editMessage: { maxRequests: 10, windowMs: 60000 },

            // Oda değiştirme (20 değişim/dakika)
            changeRoom: { maxRequests: 20, windowMs: 60000 }
        };
    }

    /**
     * İşlemi rate limit kontrolünden geçir
     * @param {string} action - İşlem tipi (sendMessage, uploadFile, vb.)
     * @param {string} userId - Kullanıcı ID (opsiyonel)
     * @returns {Object} { allowed: boolean, remaining: number, resetIn: number }
     */
    checkLimit(action, userId = 'default') {
        const limit = this.limits[action];
        if (!limit) {
            console.warn(`⚠️ [RateLimiter] Limit tanımlı değil: ${action}`);
            return { allowed: true, remaining: Infinity, resetIn: 0 };
        }

        const key = `${action}_${userId}`;
        const now = Date.now();

        // Eski istekleri temizle
        if (!this.requests.has(key)) {
            this.requests.set(key, []);
        }

        const timestamps = this.requests.get(key);
        const validTimestamps = timestamps.filter(t => now - t < limit.windowMs);
        this.requests.set(key, validTimestamps);

        // Limit kontrolü
        const remaining = limit.maxRequests - validTimestamps.length;
        const allowed = remaining > 0;

        if (!allowed) {
            const oldestTimestamp = validTimestamps[0];
            const resetIn = limit.windowMs - (now - oldestTimestamp);
            console.warn(`🚫 [RateLimiter] Limit aşıldı: ${action} (${resetIn}ms sonra tekrar deneyin)`);
            return { allowed: false, remaining: 0, resetIn };
        }

        // İsteği kaydet
        validTimestamps.push(now);

        return {
            allowed: true,
            remaining: remaining - 1,
            resetIn: 0
        };
    }

    /**
     * Kullanıcı için tüm rate limit'leri sıfırla
     * @param {string} userId - Kullanıcı ID
     */
    resetUser(userId = 'default') {
        for (const [key] of this.requests) {
            if (key.endsWith(`_${userId}`)) {
                this.requests.delete(key);
            }
        }
        console.log(`✅ [RateLimiter] Kullanıcı sıfırlandı: ${userId}`);
    }

    /**
     * Tüm rate limit'leri temizle
     */
    clearAll() {
        this.requests.clear();
        console.log('🗑️ [RateLimiter] Tüm limitler temizlendi');
    }

    /**
     * Throttle fonksiyonu - Belirli sürede bir kez çalışır
     * @param {Function} func - Throttle edilecek fonksiyon
     * @param {number} delay - Gecikme süresi (ms)
     * @returns {Function} Throttle edilmiş fonksiyon
     */
    static throttle(func, delay = 1000) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                return func.apply(this, args);
            }
        };
    }

    /**
     * Debounce fonksiyonu - Son çağrıdan sonra belirli süre bekler
     * @param {Function} func - Debounce edilecek fonksiyon
     * @param {number} delay - Gecikme süresi (ms)
     * @returns {Function} Debounce edilmiş fonksiyon
     */
    static debounce(func, delay = 300) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
}

// Global instance
export const rateLimiter = new RateLimiter();

// Kolay kullanım için helper fonksiyon
export const withRateLimit = (action, callback, userId) => {
    const { allowed, remaining, resetIn } = rateLimiter.checkLimit(action, userId);

    if (!allowed) {
        const resetSeconds = Math.ceil(resetIn / 1000);
        toast.error(`⏳ Çok fazla istek! ${resetSeconds} saniye sonra tekrar deneyin.`);
        return false;
    }

    if (remaining <= 2) {
        console.warn(`⚠️ [RateLimiter] ${action} limit yaklaşıyor (kalan: ${remaining})`);
    }

    callback();
    return true;
};

export default RateLimiter;



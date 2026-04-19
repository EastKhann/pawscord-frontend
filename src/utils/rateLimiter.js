// frontend/src/utils/rateLimiter.js
import toast from './toast';
import logger from '../utils/logger';
import i18n from '../i18n';

/**
 * 🛡️ Rate Limiter - Frontend güvenlik katmanı
 * Usernın aşırı istek göndermesini engeller
 * DDoS koruması ve spam önleme
 */

class RateLimiter {
    constructor() {
        this.requests = new Map(); // action -> timestamps[]
        this.limits = {
            // Mesaj gönderme (5 message/saniye)
            sendMessage: { maxRequests: 5, windowMs: 1000 },

            // File load (3 file/10 saniye)
            uploadFile: { maxRequests: 3, windowMs: 10000 },

            // API çağrıları (30 istek/minute)
            apiCall: { maxRequests: 30, windowMs: 60000 },

            // Login denemesi (5 deneme/minute)
            login: { maxRequests: 5, windowMs: 60000 },

            // Friend addme (10 istek/minute)
            addFriend: { maxRequests: 10, windowMs: 60000 },

            // Mesaj editme (10 editme/minute)
            editMessage: { maxRequests: 10, windowMs: 60000 },

            // Oda değiştirme (20 değişim/minute)
            changeRoom: { maxRequests: 20, windowMs: 60000 },
        };
    }

    /**
     * İşlemi rate limit kontrolünden geçir
     * @param {string} action - İşlem tipi (sendMessage, uploadFile, vb.)
     * @param {string} userId - User ID (opsiyonel)
     * @returns {Object} { allowed: boolean, remaining: number, resetIn: number }
     */
    checkLimit(action, userId = 'default') {
        const limit = this.limits[action];
        if (!limit) {
            logger.warn(`⚠️ [RateLimiter] Limit tanımlı değil: ${action}`);
            return { allowed: true, remaining: Infinity, resetIn: 0 };
        }

        const key = `${action}_${userId}`;
        const now = Date.now();

        // Eski istaddri temizle
        if (!this.requests.has(key)) {
            this.requests.set(key, []);
        }

        const timestamps = this.requests.get(key);
        const validTimestamps = timestamps.filter((t) => now - t < limit.windowMs);
        this.requests.set(key, validTimestamps);

        // Limit kontrolü
        const remaining = limit.maxRequests - validTimestamps.length;
        const allowed = remaining > 0;

        if (!allowed) {
            const oldestTimestamp = validTimestamps[0];
            const resetIn = limit.windowMs - (now - oldestTimestamp);
            logger.warn(
                `🚫 [RateLimiter] Limit exceeded: ${action} (${resetIn}ms try again later)`
            );
            return { allowed: false, remaining: 0, resetIn };
        }

        // İsteği save
        validTimestamps.push(now);

        return {
            allowed: true,
            remaining: remaining - 1,
            resetIn: 0,
        };
    }

    /**
     * User for tüm rate limit'leri sıfırla
     * @param {string} userId - User ID
     */
    resetUser(userId = 'default') {
        for (const [key] of this.requests) {
            if (key.endsWith(`_${userId}`)) {
                this.requests.delete(key);
            }
        }
    }

    /**
     * Tüm rate limit'leri temizle
     */
    clearAll() {
        this.requests.clear();
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

// Easy usage helper function
export const withRateLimit = (action, callback, userId) => {
    const { allowed, remaining, resetIn } = rateLimiter.checkLimit(action, userId);

    if (!allowed) {
        const resetSeconds = Math.ceil(resetIn / 1000);
        toast.error(i18n.t('rateLimiter.tooMany'));
        return false;
    }

    if (remaining <= 2) {
        logger.warn(`⚠️ [RateLimiter] ${action} limit yaklaşıyor (kalan: ${remaining})`);
    }

    callback();
    return true;
};

export default RateLimiter;

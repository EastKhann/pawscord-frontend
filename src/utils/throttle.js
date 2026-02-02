// frontend/src/utils/throttle.js

/**
 * 🚀 Throttle fonksiyonu - Belirli aralıklarla çalışır
 * Örnek: Kullanıcı her tuşa bastığında değil, 2 saniyede bir "typing" gönder
 * 
 * @param {Function} func - Çalıştırılacak fonksiyon
 * @param {number} delay - Minimum bekleme süresi (ms)
 * @returns {Function} Throttle edilmiş fonksiyon
 */
export const throttle = (func, delay = 1000) => {
    let lastCall = 0;
    let timeout = null;

    return function (...args) {
        const now = Date.now();
        const timeSinceLastCall = now - lastCall;

        // İlk çağrı veya yeterli süre geçtiyse
        if (timeSinceLastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        } else {
            // Bekle ve son çağrıyı yap
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                lastCall = Date.now();
                func.apply(this, args);
            }, delay - timeSinceLastCall);
        }
    };
};

/**
 * 🕐 Debounce fonksiyonu - Son çağrıdan sonra belirli süre bekler
 * Örnek: Arama kutusunda kullanıcı yazmayı bitirdikten 500ms sonra ara
 * 
 * @param {Function} func - Çalıştırılacak fonksiyon
 * @param {number} delay - Bekleme süresi (ms)
 * @returns {Function} Debounce edilmiş fonksiyon
 */
export const debounce = (func, delay = 500) => {
    let timeout = null;

    return function (...args) {
        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};

/**
 * 🎯 Leading throttle - İlk çağrıda hemen çalışır, sonra throttle
 * Örnek: Buton tıklamaları - İlk tık hemen, sonrakiler throttle
 */
export const throttleLeading = (func, delay = 1000) => {
    let lastCall = 0;
    let isThrottled = false;

    return function (...args) {
        const now = Date.now();

        if (!isThrottled) {
            func.apply(this, args);
            lastCall = now;
            isThrottled = true;

            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    };
};

/**
 * ⏱️ Rate limiter - Belirli sürede max çağrı sayısı
 * Örnek: Saniyede max 3 API isteği
 */
export const rateLimit = (func, maxCalls = 3, timeWindow = 1000) => {
    const calls = [];

    return function (...args) {
        const now = Date.now();

        // Zaman penceresi dışındaki çağrıları temizle
        while (calls.length > 0 && calls[0] < now - timeWindow) {
            calls.shift();
        }

        // Limit aşılmadıysa çağrı yap
        if (calls.length < maxCalls) {
            calls.push(now);
            func.apply(this, args);
        } else {
            console.warn(`Rate limit aşıldı: ${maxCalls} çağrı/${timeWindow}ms`);
        }
    };
};

export default {
    throttle,
    debounce,
    throttleLeading,
    rateLimit
};



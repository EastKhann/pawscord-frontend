// frontend/src/utils/csrfToken.js

/**
 * 🔒 CSRF Token Manager
 * Cross-Site Request Forgery (CSRF) saldırılarına karşı koruma
 */

class CSRFTokenManager {
    constructor() {
        this.token = null;
        this.tokenKey = 'csrf_token';
    }

    /**
     * CSRF token'ı oluştur
     * @returns {string} Yeni CSRF token
     */
    generateToken() {
        const array = new Uint8Array(32);
        window.crypto.getRandomValues(array);
        this.token = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');

        // localStorage'a kaydet
        localStorage.setItem(this.tokenKey, this.token);

        console.log('🔒 [CSRF] Token oluşturuldu');
        return this.token;
    }

    /**
     * Mevcut token'ı getir veya yeni oluştur
     * @returns {string} CSRF token
     */
    getToken() {
        if (!this.token) {
            // localStorage'dan yükle
            this.token = localStorage.getItem(this.tokenKey);

            // Yoksa yeni oluştur
            if (!this.token) {
                this.generateToken();
            }
        }
        return this.token;
    }

    /**
     * Token'ı doğrula
     * @param {string} token - Kontrol edilecek token
     * @returns {boolean} Token geçerli mi?
     */
    validateToken(token) {
        const currentToken = this.getToken();
        const isValid = token === currentToken;

        if (!isValid) {
            console.error('❌ [CSRF] Token geçersiz!');
        }

        return isValid;
    }

    /**
     * Token'ı yenile
     */
    refreshToken() {
        this.token = null;
        localStorage.removeItem(this.tokenKey);
        this.generateToken();
        console.log('🔄 [CSRF] Token yenilendi');
    }

    /**
     * Fetch request'e CSRF header ekle
     * @param {Object} options - Fetch options
     * @returns {Object} CSRF header eklenmiş options
     */
    addTokenToRequest(options = {}) {
        const token = this.getToken();
        return {
            ...options,
            headers: {
                ...options.headers,
                'X-CSRF-Token': token,
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
    }

    /**
     * Token'ı temizle (logout)
     */
    clearToken() {
        this.token = null;
        localStorage.removeItem(this.tokenKey);
        console.log('🗑️ [CSRF] Token temizlendi');
    }
}

// Global instance
export const csrfManager = new CSRFTokenManager();

// Kolay kullanım için wrapper fonksiyon
export const fetchWithCSRF = async (url, options = {}) => {
    const optionsWithToken = csrfManager.addTokenToRequest(options);

    try {
        const response = await fetch(url, optionsWithToken);

        // 403 Forbidden durumunda token'ı yenile
        if (response.status === 403) {
            console.warn('⚠️ [CSRF] Token geçersiz, yenileniyor...');
            csrfManager.refreshToken();

            // Tekrar dene
            const retryOptions = csrfManager.addTokenToRequest(options);
            return await fetch(url, retryOptions);
        }

        return response;
    } catch (error) {
        console.error('❌ [CSRF] Fetch hatası:', error);
        throw error;
    }
};

export default CSRFTokenManager;



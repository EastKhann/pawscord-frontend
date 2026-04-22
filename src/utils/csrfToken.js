import logger from '../utils/logger';
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
        this.token = Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');

        // localStorage'a save
        localStorage.setItem(this.tokenKey, this.token);

        return this.token;
    }

    /**
     * Mevcut token'ı getir or yeni oluştur
     * @returns {string} CSRF token
     */
    getToken() {
        if (!this.token) {
            // localStorage'dan upload
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
            logger.error('❌ [CSRF] Token invalid!');
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
    }

    /**
     * Fetch request'e CSRF header add
     * @param {Object} options - Fetch options
     * @returns {Object} CSRF header addnmiş options
     */
    addTokenToRequest(options = {}) {
        const token = this.getToken();
        return {
            ...options,
            headers: {
                ...options.headers,
                'X-CSRF-Token': token,
                'X-Requested-With': 'XMLHttpRequest',
            },
        };
    }

    /**
     * Token'ı temizle (logout)
     */
    clearToken() {
        this.token = null;
        localStorage.removeItem(this.tokenKey);
    }
}

// Global instance
export const csrfManager = new CSRFTokenManager();

// Easy usage wrapper function
export const fetchWithCSRF = async (url, options = {}) => {
    const optionsWithToken = csrfManager.addTokenToRequest(options);

    try {
        const response = await fetch(url, optionsWithToken);

        // 403 Forbidden durumunda token'ı yenile
        if (response.status === 403) {
            logger.warn('⚠️ [CSRF] Token invalid, refreshing...');
            csrfManager.refreshToken();

            // Try again
            const retryOptions = csrfManager.addTokenToRequest(options);
            return await fetch(url, retryOptions);
        }

        return response;
    } catch (error) {
        logger.error('❌ [CSRF] Fetch error:', error);
        throw error;
    }
};

export default CSRFTokenManager;

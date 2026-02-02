// utils/security.js
// 🔒 GÜVENLIK UTILITY FONKSIYONLARI

import DOMPurify from 'dompurify';

/**
 * XSS Koruması - HTML içeriği temizler
 * @param {string} dirty - Temizlenecek HTML
 * @returns {string} - Temizlenmiş HTML
 */
export const sanitizeHTML = (dirty) => {
    if (!dirty) return '';

    const config = {
        ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'a', 'code', 'pre', 'br', 'p', 'ul', 'ol', 'li'],
        ALLOWED_ATTR: ['href', 'class', 'target'],
        ALLOW_DATA_ATTR: false,
    };

    return DOMPurify.sanitize(dirty, config);
};

/**
 * Mesaj içeriği temizleme
 * @param {string} content - Mesaj içeriği
 * @returns {string} - Temizlenmiş mesaj
 */
export const sanitizeMessage = (content) => {
    if (!content) return '';

    // XSS temizleme
    let clean = sanitizeHTML(content);

    // Script tag'leri kaldır
    clean = clean.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    // Event handler'ları kaldır
    clean = clean.replace(/on\w+="[^"]*"/gi, '');
    clean = clean.replace(/on\w+='[^']*'/gi, '');

    return clean;
};

/**
 * URL validation
 * @param {string} url - Kontrol edilecek URL
 * @returns {boolean} - Geçerli mi?
 */
export const isValidURL = (url) => {
    try {
        const parsed = new URL(url);
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
};

/**
 * Email validation
 * @param {string} email - Kontrol edilecek email
 * @returns {boolean} - Geçerli mi?
 */
export const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Username validation
 * @param {string} username - Kontrol edilecek kullanıcı adı
 * @returns {boolean} - Geçerli mi?
 */
export const isValidUsername = (username) => {
    // 3-20 karakter, sadece harf, sayı ve alt çizgi
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
};

/**
 * Password strength check
 * @param {string} password - Kontrol edilecek şifre
 * @returns {object} - {strength: 'weak'|'medium'|'strong', score: 0-100}
 */
export const checkPasswordStrength = (password) => {
    let score = 0;

    if (!password) return { strength: 'weak', score: 0 };

    // Length check
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (password.length >= 16) score += 10;

    // Character variety
    if (/[a-z]/.test(password)) score += 15;  // Lowercase
    if (/[A-Z]/.test(password)) score += 15;  // Uppercase
    if (/[0-9]/.test(password)) score += 15;  // Numbers
    if (/[^a-zA-Z0-9]/.test(password)) score += 15;  // Special chars

    let strength = 'weak';
    if (score >= 70) strength = 'strong';
    else if (score >= 40) strength = 'medium';

    return { strength, score };
};

/**
 * Rate limiting - Client-side
 * @param {string} key - Rate limit anahtarı
 * @param {number} maxAttempts - Maksimum deneme
 * @param {number} windowMs - Zaman penceresi (ms)
 * @returns {boolean} - Limit aşıldı mı?
 */
export const checkRateLimit = (key, maxAttempts = 5, windowMs = 60000) => {
    const storageKey = `rateLimit_${key}`;
    const now = Date.now();

    let attempts = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Eski denemeleri temizle
    attempts = attempts.filter(timestamp => now - timestamp < windowMs);

    // Limit kontrolü
    if (attempts.length >= maxAttempts) {
        return false; // Limit aşıldı!
    }

    // Yeni deneme ekle
    attempts.push(now);
    localStorage.setItem(storageKey, JSON.stringify(attempts));

    return true;
};

/**
 * Token expiry check
 * @param {string} token - JWT token
 * @returns {boolean} - Geçerli mi?
 */
export const isTokenExpired = (token) => {
    if (!token) return true;

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

/**
 * Dosya tipi kontrolü
 * @param {File} file - Kontrol edilecek dosya
 * @param {Array} allowedTypes - İzin verilen tipler
 * @returns {boolean} - Geçerli mi?
 */
export const isValidFileType = (file, allowedTypes = ['image/jpeg', 'image/png', 'image/gif']) => {
    return allowedTypes.includes(file.type);
};

/**
 * Dosya boyutu kontrolü
 * @param {File} file - Kontrol edilecek dosya
 * @param {number} maxSizeMB - Maksimum boyut (MB)
 * @returns {boolean} - Geçerli mi?
 */
export const isValidFileSize = (file, maxSizeMB = 10) => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
};

/**
 * Input sanitization - Genel temizleme
 * @param {string} input - Kullanıcı input'u
 * @returns {string} - Temizlenmiş input
 */
export const sanitizeInput = (input) => {
    if (!input) return '';

    return input
        .trim()
        .replace(/[<>]/g, '') // HTML tag'leri kaldır
        .substring(0, 1000); // Max length
};

/**
 * CSRF Token al
 * @returns {string} - CSRF token
 */
export const getCSRFToken = () => {
    const cookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken='));

    return cookie ? cookie.split('=')[1] : '';
};

export default {
    sanitizeHTML,
    sanitizeMessage,
    isValidURL,
    isValidEmail,
    isValidUsername,
    checkPasswordStrength,
    checkRateLimit,
    isTokenExpired,
    isValidFileType,
    isValidFileSize,
    sanitizeInput,
    getCSRFToken
};




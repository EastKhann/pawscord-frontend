/* eslint-disable no-useless-escape */
/**
 * 🛡️ XSS Protection Utility
 *
 * DOMPurify with tüm kullanıcı input'larını sanitize eder
 * HTML injection, Script injection saldırılarını önler
 */

import DOMPurify from 'dompurify';
import logger from '../utils/logger';

/**
 * HTML içeriğini sanitize et
 * @param {string} dirty - Kirli HTML
 * @param {Object} config - DOMPurify config
 * @returns {string} Temiz HTML
 */
export function sanitizeHTML(dirty, config = {}) {
    if (!dirty || typeof dirty !== 'string') {
        return '';
    }

    const defaultConfig = {
        // Default izin verilen taglar
        ALLOWED_TAGS: [
            'b',
            'i',
            'em',
            'strong',
            'a',
            'p',
            'br',
            'ul',
            'ol',
            'li',
            'code',
            'pre',
            'blockquote',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'img',
            'div',
            'span',
            'table',
            'thead',
            'tbody',
            'tr',
            'td',
            'th',
        ],

        // İzin verilen attribute'ler
        ALLOWED_ATTR: [
            'href',
            'src',
            'alt',
            'title',
            'class',
            'id',
            'target',
            'rel',
            'width',
            'height',
            'style',
        ],

        // Protokol whitelist (XSS önleme)
        ALLOWED_URI_REGEXP:
            /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,

        // İzin verilen style properties
        ALLOWED_STYLES: {
            '*': ['color', 'background-color', 'font-size', 'font-weight', 'text-align'],
        },

        // <script> taglarını kaldır
        FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form'],

        // Tehlikeli attribute'leri kaldır
        FORBID_ATTR: ['onerror', 'onclick', 'onload', 'onmouseover'],

        // DOM clobbering'i önle
        SANITIZE_DOM: true,

        // Boş elementleri kaldır
        KEEP_CONTENT: false,

        ...config,
    };

    return DOMPurify.sanitize(dirty, defaultConfig);
}

/**
 * Markdown mesajları for sanitize
 * @param {string} markdown - Markdown içerik
 * @returns {string} Sanitized markdown
 */
export function sanitizeMarkdown(markdown) {
    return sanitizeHTML(markdown, {
        ALLOWED_TAGS: [
            'b',
            'i',
            'em',
            'strong',
            'a',
            'p',
            'br',
            'ul',
            'ol',
            'li',
            'code',
            'pre',
            'blockquote',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
    });
}

/**
 * Username/biyografi for sanitize
 * @param {string} text - User text
 * @returns {string} Sanitized text
 */
export function sanitizeUserInput(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }

    // HTML taglarını komple kaldır
    return DOMPurify.sanitize(text, {
        ALLOWED_TAGS: [],
        KEEP_CONTENT: true,
    });
}

/**
 * URL'i sanitize et
 * @param {string} url - Kontrol edilecek URL
 * @returns {string|null} Güvenli URL or null
 */
export function sanitizeURL(url) {
    if (!url || typeof url !== 'string') {
        return null;
    }

    // Sadece http/https/mailto protokollerine izin ver
    const validProtocols = ['http:', 'https:', 'mailto:'];

    try {
        const parsed = new URL(url);

        if (!validProtocols.includes(parsed.protocol)) {
            logger.warn('🛡️ [XSS] İzinsiz protokol blocked:', parsed.protocol);
            return null;
        }

        // javascript: protokolünü önle
        if (url.toLowerCase().includes('javascript:')) {
            logger.warn('🛡️ [XSS] JavaScript injection blocked');
            return null;
        }

        return url;
    } catch (error) {
        logger.warn('🛡️ [XSS] Geçersiz URL:', url);
        return null;
    }
}

/**
 * JSON string'i sanitize et
 * @param {string} jsonString - JSON string
 * @returns {any|null} Parsed & sanitized JSON
 */
export function sanitizeJSON(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);

        // Recursive sanitize
        if (typeof parsed === 'object' && parsed !== null) {
            return sanitizeObject(parsed);
        }

        return parsed;
    } catch (error) {
        logger.warn('🛡️ [XSS] Geçersiz JSON:', error);
        return null;
    }
}

/**
 * Object fordeki tüm string'leri sanitize et
 * @param {Object} obj - Sanitize edilecek object
 * @returns {Object} Sanitized object
 */
function sanitizeObject(obj) {
    if (Array.isArray(obj)) {
        return obj.map((item) => {
            if (typeof item === 'string') {
                return sanitizeUserInput(item);
            } else if (typeof item === 'object' && item !== null) {
                return sanitizeObject(item);
            }
            return item;
        });
    }

    const sanitized = {};

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            sanitized[key] = sanitizeUserInput(value);
        } else if (typeof value === 'object' && value !== null) {
            sanitized[key] = sanitizeObject(value);
        } else {
            sanitized[key] = value;
        }
    }

    return sanitized;
}

/**
 * SQL injection önleme (parameterized queries kullan)
 * @param {string} input - User input
 * @returns {string} Escaped input
 */
export function escapeSQLInput(input) {
    if (!input || typeof input !== 'string') {
        return '';
    }

    // Tehlikeli karakterleri escape et
    return input
        .replace(/'/g, "''")
        .replace(/;/g, '')
        .replace(/--/g, '')
        .replace(/\/\*/g, '')
        .replace(/\*\//g, '');
}

/**
 * HTML entities encode
 * @param {string} text - Plain text
 * @returns {string} HTML encoded text
 */
export function escapeHTML(text) {
    if (!text || typeof text !== 'string') {
        return '';
    }

    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
}

/**
 * HTML entities decode
 * @param {string} html - HTML encoded text
 * @returns {string} Decoded text
 */
export function unescapeHTML(html) {
    if (!html || typeof html !== 'string') {
        return '';
    }

    const element = document.createElement('div');
    element.innerHTML = html;
    return element.textContent || '';
}

// Export all methods
export default {
    sanitizeHTML,
    sanitizeMarkdown,
    sanitizeUserInput,
    sanitizeURL,
    sanitizeJSON,
    escapeSQLInput,
    escapeHTML,
    unescapeHTML,
};

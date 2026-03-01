// frontend/src/utils/inputSanitizer.js
// 🧹 Client-side input sanitization — defence-in-depth layer

/**
 * HTML-encode dangerous characters in a string.
 * This does NOT replace DOMPurify for rich HTML — it's for plain-text inputs.
 *
 * @param {*} input - Value to sanitize (non-strings pass through)
 * @returns {*} Sanitized string or original non-string value
 */
export const sanitizeInput = (input) => {
    if (typeof input !== 'string') return input;
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

/**
 * Validate and sanitize a URL.
 * Only allows http: and https: protocols; returns empty string for anything else.
 *
 * @param {string} url - URL to validate
 * @returns {string} The original URL if safe, or ''
 */
export const sanitizeUrl = (url) => {
    if (typeof url !== 'string' || !url.trim()) return '';
    try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) return '';
        return url;
    } catch {
        return '';
    }
};

/**
 * Strip all HTML tags from a string (for plain-text display).
 * @param {string} html
 * @returns {string}
 */
export const stripHtml = (html) => {
    if (typeof html !== 'string') return '';
    return html.replace(/<[^>]*>/g, '');
};

/**
 * Sanitize an object's string values recursively.
 * Useful for sanitizing entire form payloads before submission.
 *
 * @param {object} obj
 * @returns {object} New object with sanitized string values
 */
export const sanitizeObject = (obj) => {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sanitizeObject);

    const result = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string') {
            result[key] = sanitizeInput(value);
        } else if (typeof value === 'object' && value !== null) {
            result[key] = sanitizeObject(value);
        } else {
            result[key] = value;
        }
    }
    return result;
};

export default { sanitizeInput, sanitizeUrl, stripHtml, sanitizeObject };

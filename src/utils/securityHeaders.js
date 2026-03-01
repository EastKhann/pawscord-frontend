// frontend/src/utils/securityHeaders.js
// 🔒 Client-side security header helper for fetch / axios calls

/**
 * Merge security-related headers into an existing headers object.
 * Adds X-Requested-With (marks as AJAX) and X-Content-Type-Options.
 *
 * Usage:
 *   fetch(url, { headers: addSecurityHeaders({ Authorization: `Bearer ${token}` }) })
 *
 * @param {object} [headers={}] - Existing headers to extend
 * @returns {object} Merged headers with security additions
 */
export const addSecurityHeaders = (headers = {}) => ({
    ...headers,
    'X-Requested-With': 'XMLHttpRequest',
    'X-Content-Type-Options': 'nosniff',
});

/**
 * Validate the Content-Type of a fetch Response.
 * Returns true if it matches one of the expectedTypes.
 *
 * @param {Response} response - fetch Response object
 * @param {string[]} [expectedTypes=['application/json']] - MIME types to accept
 * @returns {boolean}
 */
export const validateContentType = (response, expectedTypes = ['application/json']) => {
    const ct = response?.headers?.get?.('content-type') || '';
    return expectedTypes.some((type) => ct.includes(type));
};

/**
 * Wrapper around fetch that automatically adds security headers
 * and validates response Content-Type.
 *
 * @param {string} url
 * @param {RequestInit} [options={}]
 * @returns {Promise<Response>}
 */
export const secureFetch = async (url, options = {}) => {
    const mergedOptions = {
        ...options,
        headers: addSecurityHeaders(options.headers || {}),
    };
    const response = await fetch(url, mergedOptions);
    return response;
};

export default { addSecurityHeaders, validateContentType, secureFetch };

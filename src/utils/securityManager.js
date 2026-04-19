import React from 'react';
// frontend/src/utils/securityManager.js

/**
 * 🔒 Security Manager
 * XSS protection, CSP, input sanitization, and security utilities
 * Uses DOMPurify for HTML sanitization (industry-standard, battle-tested).
 */

import DOMPurify from 'dompurify';

class SecurityManager {
    constructor(options = {}) {
        this.cspEnabled = options.cspEnabled !== false;
        this.xssProtection = options.xssProtection !== false;
        this.allowedTags = options.allowedTags || [
            'b',
            'i',
            'em',
            'strong',
            'a',
            'p',
            'br',
            'code',
            'pre',
            'ul',
            'ol',
            'li',
            'blockquote',
            'h1',
            'h2',
            'h3',
            'span',
        ];
        this.allowedAttributes = options.allowedAttributes || [
            'href',
            'title',
            'target',
            'rel',
            'class',
        ];

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        if (this.cspEnabled) {
            this.setupCSP();
        }

        if (this.xssProtection) {
            this.setupXSSProtection();
        }

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Setup Content Security Policy
     */
    setupCSP() {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "img-src 'self' data: blob: https:",
            "font-src 'self' https://fonts.gstatic.com data:",
            "connect-src 'self' ws: wss: https:",
            "object-src 'none'",
            "base-uri 'self'",
            "worker-src 'self' blob:",
            "frame-ancestors 'none'",
        ].join('; ');

        document.head.appendChild(meta);
    }

    /**
     * Setup XSS Protection
     */
    setupXSSProtection() {
        // X-XSS-Protection header (via meta)
        const meta = document.createElement('meta');
        meta.httpEquiv = 'X-XSS-Protection';
        meta.content = '1; mode=block';
        document.head.appendChild(meta);
    }

    /**
     * Sanitize HTML using DOMPurify (safe, comprehensive, widely audited).
     */
    sanitizeHTML(html) {
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: this.allowedTags,
            ALLOWED_ATTR: this.allowedAttributes,
            ALLOW_DATA_ATTR: false,
        });
    }

    /**
     * Escape HTML
     */
    escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Sanitize input
     */
    sanitizeInput(input) {
        return input
            .replace(/[<>]/g, '') // Remove < >
            .replace(/javascript:/gi, '') // Remove javascript:
            .replace(/on\w+=/gi, '') // Remove event handlers
            .trim();
    }

    /**
     * Validate email
     */
    validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Validate URL
     */
    validateURL(url) {
        try {
            const urlObj = new URL(url);
            return ['http:', 'https:'].includes(urlObj.protocol);
        } catch {
            return false;
        }
    }

    /**
     * Generate CSRF token
     */
    generateCSRFToken() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Hash password (client-side)
     */
    async hashPassword(password, salt = '') {
        const encoder = new TextEncoder();
        const data = encoder.encode(password + salt);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Encrypt data
     */
    async encrypt(data, key) {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(data);

        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt']
        );

        const iv = crypto.getRandomValues(new Uint8Array(12));
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            cryptoKey,
            encodedData
        );

        return {
            iv: Array.from(iv),
            data: Array.from(new Uint8Array(encrypted)),
        };
    }

    /**
     * Decrypt data
     */
    async decrypt(encryptedObj, key) {
        const encoder = new TextEncoder();
        const decoder = new TextDecoder();

        const cryptoKey = await crypto.subtle.importKey(
            'raw',
            encoder.encode(key),
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        );

        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: new Uint8Array(encryptedObj.iv) },
            cryptoKey,
            new Uint8Array(encryptedObj.data)
        );

        return decoder.decode(decrypted);
    }

    /**
     * Rate limit check
     */
    checkRateLimit(key, maxRequests = 10, windowMs = 60000) {
        const now = Date.now();
        const storageKey = `rate_limit_${key}`;

        let data = JSON.parse(
            localStorage.getItem(storageKey) || '{"requests": [], "blocked": false}'
        );

        // Clean old requests
        data.requests = data.requests.filter((time) => now - time < windowMs);

        // Check if blocked
        if (data.blocked && now - data.blockedAt < windowMs) {
            return false;
        }

        // Check rate limit
        if (data.requests.length >= maxRequests) {
            data.blocked = true;
            data.blockedAt = now;
            localStorage.setItem(storageKey, JSON.stringify(data));
            return false;
        }

        // Add request
        data.requests.push(now);
        data.blocked = false;
        localStorage.setItem(storageKey, JSON.stringify(data));

        return true;
    }

    /**
     * Detect XSS attempt
     */
    detectXSS(input) {
        const xssPatterns = [
            /<script/i,
            /javascript:/i,
            /on\w+\s*=/i,
            /<iframe/i,
            /<embed/i,
            /<object/i,
            /eval\(/i,
            /expression\(/i,
        ];

        return xssPatterns.some((pattern) => pattern.test(input));
    }

    /**
     * Secure random string
     */
    generateSecureRandom(length = 32) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
    }

    /**
     * Check password strength
     */
    checkPasswordStrength(password) {
        const checks = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            numbers: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };

        const score = Object.values(checks).filter(Boolean).length;

        return {
            score,
            strength: score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong',
            checks,
        };
    }

    /**
     * Prevent clickjacking
     */
    preventClickjacking() {
        if (window.self !== window.top) {
            window.top.location = window.self.location;
        }
    }
}

// Global instance
export const securityManager = new SecurityManager();

/**
 * React Hook - Sanitize
 */
export const useSanitize = () => {
    const sanitizeHTML = React.useCallback((html) => {
        return securityManager.sanitizeHTML(html);
    }, []);

    const sanitizeInput = React.useCallback((input) => {
        return securityManager.sanitizeInput(input);
    }, []);

    const escapeHTML = React.useCallback((str) => {
        return securityManager.escapeHTML(str);
    }, []);

    return {
        sanitizeHTML,
        sanitizeInput,
        escapeHTML,
    };
};

/**
 * React Hook - CSRF Token
 */
export const useCSRFToken = () => {
    const [token, setToken] = React.useState(() => {
        return sessionStorage.getItem('csrf_token') || securityManager.generateCSRFToken();
    });

    React.useEffect(() => {
        sessionStorage.setItem('csrf_token', token);
    }, [token]);

    const regenerate = React.useCallback(() => {
        const newToken = securityManager.generateCSRFToken();
        setToken(newToken);
        return newToken;
    }, []);

    return { token, regenerate };
};

export default SecurityManager;

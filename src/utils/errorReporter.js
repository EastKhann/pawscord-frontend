import logger from '../utils/logger';
import { API_BASE_URL } from '../utils/apiEndpoints';
// frontend/src/utils/errorReporter.js
// 📢 Centralized error reporting — captures, logs, and stores client errors

class ErrorReporter {
    /** @type {Array<{error: Error|string, context: object, timestamp: number}>} */
    static capturedErrors = [];

    /** Maximum number of errors to retain in memory */
    static MAX_ERRORS = 200;

    /**
     * Report an error with optional context metadata.
     * @param {Error|string} error
     * @param {object} [context={}] - Extra info (component, action, userId, etc.)
     */
    static report(error, context = {}) {
        const entry = {
            error,
            message: error?.message || String(error),
            stack: error?.stack || null,
            context,
            timestamp: Date.now(),
            url: typeof window !== 'undefined' ? window.location.href : '',
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        };

        // Console output for dev visibility
        logger.error('[ErrorReporter]', entry.message, context);

        this.capturedErrors.push(entry);

        // Trim oldest entries when over limit
        if (this.capturedErrors.length > this.MAX_ERRORS) {
            this.capturedErrors = this.capturedErrors.slice(-this.MAX_ERRORS);
        }

        // Could send to backend analytics endpoint in production:
        // this._sendToBackend(entry);
    }

    /**
     * Get the most recent captured errors.
     * @param {number} [count=10]
     * @returns {Array}
     */
    static getRecent(count = 10) {
        return this.capturedErrors.slice(-count);
    }

    /**
     * Get all captured errors.
     * @returns {Array}
     */
    static getAll() {
        return [...this.capturedErrors];
    }

    /**
     * Clear all captured errors.
     */
    static clear() {
        this.capturedErrors = [];
    }

    /**
     * Get error count.
     * @returns {number}
     */
    static get count() {
        return this.capturedErrors.length;
    }

    /**
     * Placeholder for sending data to a backend analytics endpoint.
     * @private
     */
    static _sendToBackend(entry) {
        // Future: POST to /api/client-errors/
        // fetch(`${API_BASE_URL}/client-errors/`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(entry),
        // }).catch(() => {});
    }
}

export default ErrorReporter;

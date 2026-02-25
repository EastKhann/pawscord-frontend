// frontend/src/utils/offlineMessageQueue.js
// 🔄 Offline Message Queue — Queues messages when WebSocket is disconnected
// and flushes them automatically when connection is restored.

const QUEUE_KEY = 'pawscord_offline_queue';
const MAX_QUEUE_SIZE = 50;
const MAX_AGE_MS = 5 * 60 * 1000; // 5 minutes max age for queued messages

class OfflineMessageQueue {
    constructor() {
        this._queue = this._loadFromStorage();
        this._flushCallbacks = [];
    }

    /**
     * Load queue from sessionStorage (survives page refresh during offline)
     */
    _loadFromStorage() {
        try {
            const saved = sessionStorage.getItem(QUEUE_KEY);
            if (!saved) return [];
            const parsed = JSON.parse(saved);
            // Filter out expired messages
            const now = Date.now();
            return parsed.filter(msg => (now - msg._queuedAt) < MAX_AGE_MS);
        } catch {
            return [];
        }
    }

    /**
     * Persist queue to sessionStorage
     */
    _saveToStorage() {
        try {
            sessionStorage.setItem(QUEUE_KEY, JSON.stringify(this._queue));
        } catch {
            // Storage full or unavailable — silent fail
        }
    }

    /**
     * Add a message to the offline queue
     * @param {Object} message - WebSocket message payload
     * @returns {boolean} Whether the message was queued
     */
    enqueue(message) {
        if (this._queue.length >= MAX_QUEUE_SIZE) {
            console.warn('[OfflineQueue] Queue full, dropping oldest message');
            this._queue.shift();
        }

        this._queue.push({
            ...message,
            _queuedAt: Date.now(),
            _offlineQueued: true,
        });

        this._saveToStorage();
        return true;
    }

    /**
     * Flush all queued messages through a WebSocket
     * @param {WebSocket} ws - Active WebSocket connection
     * @returns {number} Number of messages flushed
     */
    flush(ws) {
        if (!ws || ws.readyState !== WebSocket.OPEN) return 0;
        if (this._queue.length === 0) return 0;

        const now = Date.now();
        let flushed = 0;

        // Send each queued message, skip expired ones
        const toSend = [...this._queue];
        this._queue = [];

        for (const msg of toSend) {
            if ((now - msg._queuedAt) > MAX_AGE_MS) {
                continue; // Skip expired
            }

            try {
                // Remove internal queue metadata before sending
                const { _queuedAt, _offlineQueued, ...payload } = msg;
                ws.send(JSON.stringify(payload));
                flushed++;
            } catch (e) {
                // If send fails, re-queue
                this._queue.push(msg);
            }
        }

        this._saveToStorage();

        if (flushed > 0) {
            console.info(`[OfflineQueue] Flushed ${flushed} queued message(s)`);
        }

        // Notify callbacks
        this._flushCallbacks.forEach(cb => {
            try { cb(flushed); } catch { /* ignore */ }
        });

        return flushed;
    }

    /**
     * Register a callback to be called after flush
     * @param {Function} callback - (flushedCount) => void
     */
    onFlush(callback) {
        this._flushCallbacks.push(callback);
    }

    /**
     * Get count of pending messages
     */
    get pendingCount() {
        return this._queue.length;
    }

    /**
     * Check if queue has any messages
     */
    get hasPending() {
        return this._queue.length > 0;
    }

    /**
     * Clear all queued messages
     */
    clear() {
        this._queue = [];
        this._saveToStorage();
    }
}

// Singleton instance
export const offlineQueue = new OfflineMessageQueue();
export default offlineQueue;

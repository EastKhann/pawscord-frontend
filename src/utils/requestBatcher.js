// frontend/src/utils/requestBatcher.js

/**
 * 🔄 Request Batcher
 * Birden fazla API isteğini batch'leyerek optimize eder
 * Network overhead'i azaltır
 */

class RequestBatcher {
    constructor(options = {}) {
        this.options = {
            batchSize: options.batchSize || 10,
            batchDelay: options.batchDelay || 50, // ms
            maxWaitTime: options.maxWaitTime || 200, // ms
            ...options
        };

        this.queues = new Map(); // endpoint -> requests[]
        this.timers = new Map(); // endpoint -> timeout
    }

    /**
     * API isteğini batch'e ekle
     * @param {string} endpoint - API endpoint
     * @param {Object} data - Request data
     * @param {Object} options - Request options
     * @returns {Promise} Response promise
     */
    async add(endpoint, data, options = {}) {
        return new Promise((resolve, reject) => {
            // Queue'ya ekle
            if (!this.queues.has(endpoint)) {
                this.queues.set(endpoint, []);
            }

            const queue = this.queues.get(endpoint);
            queue.push({ data, resolve, reject, timestamp: Date.now() });

            // Batch size'a ulaştıysa hemen flush et
            if (queue.length >= this.options.batchSize) {
                this.flush(endpoint);
                return;
            }

            // Timer başlat
            if (!this.timers.has(endpoint)) {
                const timer = setTimeout(() => {
                    this.flush(endpoint);
                }, this.options.batchDelay);
                this.timers.set(endpoint, timer);
            }

            // Max wait time kontrolü
            const oldestRequest = queue[0];
            const waitTime = Date.now() - oldestRequest.timestamp;
            if (waitTime >= this.options.maxWaitTime) {
                this.flush(endpoint);
            }
        });
    }

    /**
     * Batch'i flush et ve API'ye gönder
     * @param {string} endpoint - API endpoint
     */
    async flush(endpoint) {
        const queue = this.queues.get(endpoint);
        if (!queue || queue.length === 0) return;

        // Timer'ı temizle
        if (this.timers.has(endpoint)) {
            clearTimeout(this.timers.get(endpoint));
            this.timers.delete(endpoint);
        }

        // Queue'yu al ve temizle
        const requests = [...queue];
        this.queues.set(endpoint, []);


        try {
            // Batch request gönder
            const batchData = requests.map(r => r.data);
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ batch: batchData })
            });

            if (!response.ok) {
                throw new Error(`Batch request failed: ${response.statusText}`);
            }

            const results = await response.json();

            // Her isteğe sonucunu dön
            requests.forEach((req, index) => {
                const result = results.batch[index];
                if (result.error) {
                    req.reject(new Error(result.error));
                } else {
                    req.resolve(result);
                }
            });

        } catch (error) {
            console.error(`❌ [Batcher] Error:`, error);
            // Tüm istekleri reject et
            requests.forEach(req => req.reject(error));
        }
    }

    /**
     * Belirli endpoint için flush et
     * @param {string} endpoint - API endpoint
     */
    flushEndpoint(endpoint) {
        this.flush(endpoint);
    }

    /**
     * Tüm endpoint'leri flush et
     */
    flushAll() {
        for (const endpoint of this.queues.keys()) {
            this.flush(endpoint);
        }
    }

    /**
     * Temizle
     */
    clear() {
        // Tüm timer'ları temizle
        for (const timer of this.timers.values()) {
            clearTimeout(timer);
        }
        this.timers.clear();
        this.queues.clear();
    }
}

// Global instance
export const requestBatcher = new RequestBatcher({
    batchSize: 10,
    batchDelay: 50,
    maxWaitTime: 200
});

/**
 * Helper: Mesaj gönderme batch
 */
export const batchSendMessages = (messages) => {
    return Promise.all(
        messages.map(msg =>
            requestBatcher.add('/api/messages/', msg)
        )
    );
};

/**
 * Helper: Mesaj okuma batch
 */
export const batchMarkAsRead = (messageIds) => {
    return requestBatcher.add('/api/messages/mark-read/', {
        message_ids: messageIds
    });
};

/**
 * Helper: Kullanıcı bilgisi batch fetch
 */
export const batchFetchUsers = (userIds) => {
    return requestBatcher.add('/api/users/batch/', {
        user_ids: userIds
    });
};

/**
 * Debounced API call helper
 */
export const debouncedApiCall = (() => {
    const timers = new Map();

    return (key, apiCall, delay = 300) => {
        return new Promise((resolve, reject) => {
            // Eski timer'ı temizle
            if (timers.has(key)) {
                clearTimeout(timers.get(key));
            }

            // Yeni timer başlat
            const timer = setTimeout(async () => {
                try {
                    const result = await apiCall();
                    resolve(result);
                } catch (error) {
                    reject(error);
                } finally {
                    timers.delete(key);
                }
            }, delay);

            timers.set(key, timer);
        });
    };
})();

/**
 * Throttled API call helper
 */
export const throttledApiCall = (() => {
    const lastCalls = new Map();

    return async (key, apiCall, delay = 1000) => {
        const now = Date.now();
        const lastCall = lastCalls.get(key) || 0;

        if (now - lastCall < delay) {
            console.warn(`⚠️ [Throttle] ${key} too many calls, waiting...`);
            return null;
        }

        lastCalls.set(key, now);
        return await apiCall();
    };
})();

/**
 * Request Queue with retry
 */
export class RequestQueue {
    constructor(options = {}) {
        this.queue = [];
        this.processing = false;
        this.maxRetries = options.maxRetries || 3;
        this.retryDelay = options.retryDelay || 1000;
    }

    /**
     * Queue'ya istek ekle
     */
    enqueue(request, priority = 0) {
        this.queue.push({ request, priority, retries: 0 });
        this.queue.sort((a, b) => b.priority - a.priority);
        this.process();
    }

    /**
     * Queue'yu işle
     */
    async process() {
        if (this.processing || this.queue.length === 0) return;

        this.processing = true;

        while (this.queue.length > 0) {
            const item = this.queue.shift();

            try {
                await item.request();
            } catch (error) {
                console.error(`❌ [Queue] Request failed:`, error);

                // Retry
                if (item.retries < this.maxRetries) {
                    item.retries++;

                    await new Promise(resolve =>
                        setTimeout(resolve, this.retryDelay * item.retries)
                    );

                    this.queue.unshift(item); // Başa ekle
                } else {
                    console.error(`❌ [Queue] Max retries reached, giving up`);
                }
            }
        }

        this.processing = false;
    }

    /**
     * Queue'yu temizle
     */
    clear() {
        this.queue = [];
    }

    /**
     * Queue durumu
     */
    getStatus() {
        return {
            pending: this.queue.length,
            processing: this.processing
        };
    }
}

export default RequestBatcher;



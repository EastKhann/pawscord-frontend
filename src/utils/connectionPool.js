// frontend/src/utils/connectionPool.js

/**
 * 🌐 HTTP Connection Pool Manager
 * HTTP/2 multiplexing ve connection reuse
 */

class ConnectionPoolManager {
    constructor(options = {}) {
        this.maxConnections = options.maxConnections || 6;
        this.maxConnectionsPerOrigin = options.maxConnectionsPerOrigin || 6;
        this.keepAliveTimeout = options.keepAliveTimeout || 60000; // 1 minute
        this.requestTimeout = options.requestTimeout || 30000; // 30 seconds

        this.pools = new Map();
        this.activeRequests = new Map();
        this.requestQueue = [];
        this.stats = {
            totalRequests: 0,
            activeConnections: 0,
            queuedRequests: 0,
            completedRequests: 0,
            failedRequests: 0,
            timeouts: 0,
            connectionReuses: 0
        };
    }

    /**
     * Get or create connection pool for origin
     */
    getPool(origin) {
        if (!this.pools.has(origin)) {
            this.pools.set(origin, {
                connections: [],
                activeConnections: 0,
                lastActivity: Date.now()
            });
        }
        return this.pools.get(origin);
    }

    /**
     * Execute fetch with connection pooling
     */
    async fetch(url, options = {}) {
        const urlObj = new URL(url, window.location.origin);
        const origin = urlObj.origin;
        const pool = this.getPool(origin);

        this.stats.totalRequests++;

        // Check if we need to queue
        if (pool.activeConnections >= this.maxConnectionsPerOrigin) {
            return this.queueRequest(url, options);
        }

        return this.executeRequest(url, options, pool);
    }

    /**
     * Execute request
     */
    async executeRequest(url, options, pool) {
        const requestId = `${Date.now()}-${Math.random()}`;
        pool.activeConnections++;
        this.stats.activeConnections++;

        // Timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            this.stats.timeouts++;
        }, this.requestTimeout);

        const requestOptions = {
            ...options,
            signal: controller.signal,
            // Enable keep-alive
            keepalive: true
        };

        try {
            this.activeRequests.set(requestId, {
                url,
                startTime: Date.now()
            });

            const response = await fetch(url, requestOptions);

            clearTimeout(timeoutId);

            // Update stats
            this.stats.completedRequests++;
            pool.lastActivity = Date.now();

            // Check for connection reuse (approximate)
            const timing = performance.getEntriesByName(url, 'resource')[0];
            if (timing && timing.connectEnd - timing.connectStart === 0) {
                this.stats.connectionReuses++;
            }

            return response;

        } catch (error) {
            clearTimeout(timeoutId);
            this.stats.failedRequests++;
            throw error;

        } finally {
            pool.activeConnections--;
            this.stats.activeConnections--;
            this.activeRequests.delete(requestId);

            // Process next queued request
            this.processQueue(pool);
        }
    }

    /**
     * Queue request
     */
    async queueRequest(url, options) {
        this.stats.queuedRequests++;

        return new Promise((resolve, reject) => {
            this.requestQueue.push({
                url,
                options,
                resolve,
                reject,
                timestamp: Date.now()
            });

            if (import.meta.env.MODE === 'development') {
                console.log(`📋 [ConnectionPool] Queued request: ${url} (${this.requestQueue.length} in queue)`);
            }
        });
    }

    /**
     * Process queued requests
     */
    async processQueue(pool) {
        if (this.requestQueue.length === 0) return;
        if (pool.activeConnections >= this.maxConnectionsPerOrigin) return;

        const queued = this.requestQueue.shift();
        if (!queued) return;

        this.stats.queuedRequests--;

        try {
            const response = await this.executeRequest(queued.url, queued.options, pool);
            queued.resolve(response);
        } catch (error) {
            queued.reject(error);
        }
    }

    /**
     * Batch requests
     */
    async batchFetch(urls, options = {}) {
        const promises = urls.map(url => this.fetch(url, options));
        return Promise.all(promises);
    }

    /**
     * Parallel requests with limit
     */
    async parallelFetch(urls, options = {}, concurrency = 3) {
        const results = [];
        const executing = [];

        for (const url of urls) {
            const promise = this.fetch(url, options).then(response => {
                executing.splice(executing.indexOf(promise), 1);
                return response;
            });

            results.push(promise);
            executing.push(promise);

            if (executing.length >= concurrency) {
                await Promise.race(executing);
            }
        }

        return Promise.all(results);
    }

    /**
     * Priority fetch
     */
    async priorityFetch(url, priority = 5, options = {}) {
        // Add to front of queue if high priority
        if (priority >= 8) {
            const urlObj = new URL(url, window.location.origin);
            const pool = this.getPool(urlObj.origin);

            if (pool.activeConnections < this.maxConnectionsPerOrigin) {
                return this.executeRequest(url, options, pool);
            }

            return new Promise((resolve, reject) => {
                this.requestQueue.unshift({
                    url,
                    options,
                    resolve,
                    reject,
                    timestamp: Date.now(),
                    priority
                });
            });
        }

        return this.fetch(url, options);
    }

    /**
     * Warm up connections
     */
    warmUp(origins = []) {
        origins.forEach(origin => {
            // Create empty request to establish connection
            const img = new Image();
            img.src = `${origin}/favicon.ico?warm=${Date.now()}`;

            if (import.meta.env.MODE === 'development') {
                console.log(`🔥 [ConnectionPool] Warming up connection: ${origin}`);
            }
        });
    }

    /**
     * Prefetch with priority
     */
    async prefetchResources(resources = []) {
        const sortedResources = resources.sort((a, b) => (b.priority || 0) - (a.priority || 0));

        for (const resource of sortedResources) {
            try {
                await this.fetch(resource.url, {
                    ...resource.options,
                    // Low priority fetch
                    priority: 'low'
                });
            } catch (error) {
                if (import.meta.env.MODE === 'development') {
                    console.warn(`⚠️ [ConnectionPool] Prefetch failed: ${resource.url}`, error);
                }
            }
        }
    }

    /**
     * Cleanup idle connections
     */
    cleanup() {
        const now = Date.now();

        this.pools.forEach((pool, origin) => {
            if (now - pool.lastActivity > this.keepAliveTimeout) {
                this.pools.delete(origin);

                if (import.meta.env.MODE === 'development') {
                    console.log(`🗑️ [ConnectionPool] Cleaned up idle pool: ${origin}`);
                }
            }
        });
    }

    /**
     * Start periodic cleanup
     */
    startCleanup(interval = 60000) {
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, interval);
    }

    /**
     * Stop cleanup
     */
    stopCleanup() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
    }

    /**
     * Cancel all pending requests
     */
    cancelAll() {
        this.requestQueue.forEach(queued => {
            queued.reject(new Error('Request cancelled'));
        });
        this.requestQueue = [];
        this.stats.queuedRequests = 0;
    }

    /**
     * Get stats
     */
    getStats() {
        return {
            ...this.stats,
            activePools: this.pools.size,
            queueLength: this.requestQueue.length,
            reuseRate: this.stats.completedRequests > 0
                ? (this.stats.connectionReuses / this.stats.completedRequests * 100).toFixed(2) + '%'
                : '0%'
        };
    }

    /**
     * Reset stats
     */
    resetStats() {
        this.stats = {
            totalRequests: 0,
            activeConnections: 0,
            queuedRequests: 0,
            completedRequests: 0,
            failedRequests: 0,
            timeouts: 0,
            connectionReuses: 0
        };
    }
}

// Global instance
export const connectionPool = new ConnectionPoolManager({
    maxConnections: 6,
    maxConnectionsPerOrigin: 6,
    keepAliveTimeout: 60000,
    requestTimeout: 30000
});

// Start periodic cleanup
connectionPool.startCleanup();

/**
 * Enhanced fetch with connection pooling
 */
export const pooledFetch = (url, options) => {
    return connectionPool.fetch(url, options);
};

/**
 * React Hook
 */
export const usePooledFetch = (url, options = {}) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        let cancelled = false;

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await connectionPool.fetch(url, options);
                const json = await response.json();

                if (!cancelled) {
                    setData(json);
                    setError(null);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(err);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            cancelled = true;
        };
    }, [url, options]);

    return { data, loading, error };
};

export default ConnectionPoolManager;



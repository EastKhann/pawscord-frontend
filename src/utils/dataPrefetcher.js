// frontend/src/utils/dataPrefetcher.js

/**
 * 🔮 Data Prefetcher
 * Intelligent data prefetching based on user behavior and predictions
 */

class DataPrefetcher {
    constructor(options = {}) {
        this.prefetchQueue = [];
        this.prefetchedData = new Map();
        this.navigationHistory = [];
        this.maxHistorySize = options.maxHistorySize || 100;
        this.maxCacheSize = options.maxCacheSize || 50;
        this.prefetchDelay = options.prefetchDelay || 100;
        this.idleTimeout = options.idleTimeout || 2000;

        this.isIdle = false;
        this.idleTimer = null;
        this.prefetchTimer = null;

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        // Track user activity
        ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => this.resetIdleTimer());
        });

        // Start idle timer
        this.resetIdleTimer();

        // Prefetch on page visibility change
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.prefetchQueue.length > 0) {
                this.processPrefetchQueue();
            }
        });

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Reset idle timer
     */
    resetIdleTimer() {
        this.isIdle = false;

        if (this.idleTimer) {
            clearTimeout(this.idleTimer);
        }

        this.idleTimer = setTimeout(() => {
            this.isIdle = true;
            this.processPrefetchQueue();
        }, this.idleTimeout);
    }

    /**
     * Prefetch data
     */
    prefetch(key, fetchFn, options = {}) {
        const {
            priority = 'normal',
            cache = true,
            immediate = false
        } = options;

        // Check if already cached
        if (this.prefetchedData.has(key)) {
            return Promise.resolve(this.prefetchedData.get(key).data);
        }

        // Check if already in queue
        if (this.prefetchQueue.find(item => item.key === key)) {
            return;
        }

        const prefetchItem = {
            key,
            fetchFn,
            priority,
            cache,
            timestamp: Date.now()
        };

        // Add to queue based on priority
        if (priority === 'high') {
            this.prefetchQueue.unshift(prefetchItem);
        } else {
            this.prefetchQueue.push(prefetchItem);
        }

        // Immediate prefetch or wait for idle
        if (immediate || this.isIdle) {
            this.processPrefetchQueue();
        }
    }

    /**
     * Process prefetch queue
     */
    async processPrefetchQueue() {
        if (this.prefetchQueue.length === 0) return;

        // Process one at a time
        const item = this.prefetchQueue.shift();

        try {
            if (import.meta.env.MODE === 'development') {
            }

            const data = await item.fetchFn();

            if (item.cache) {
                this.setCachedData(item.key, data);
            }

            // Continue processing queue
            if (this.isIdle && this.prefetchQueue.length > 0) {
                setTimeout(() => this.processPrefetchQueue(), this.prefetchDelay);
            }
        } catch (error) {
            console.error(`Failed to prefetch ${item.key}:`, error);
        }
    }

    /**
     * Set cached data
     */
    setCachedData(key, data) {
        // Limit cache size
        if (this.prefetchedData.size >= this.maxCacheSize) {
            const firstKey = this.prefetchedData.keys().next().value;
            this.prefetchedData.delete(firstKey);
        }

        this.prefetchedData.set(key, {
            data,
            timestamp: Date.now()
        });
    }

    /**
     * Get cached data
     */
    getCachedData(key) {
        const cached = this.prefetchedData.get(key);

        if (!cached) return null;

        if (import.meta.env.MODE === 'development') {
        }

        return cached.data;
    }

    /**
     * Prefetch on hover
     */
    prefetchOnHover(element, key, fetchFn, options = {}) {
        let timeoutId;

        const handleMouseEnter = () => {
            timeoutId = setTimeout(() => {
                this.prefetch(key, fetchFn, { ...options, priority: 'high' });
            }, 100);
        };

        const handleMouseLeave = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }

    /**
     * Prefetch visible elements
     */
    prefetchVisible(elements, options = {}) {
        const { rootMargin = '50px', threshold = 0.1 } = options;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const key = entry.target.dataset.prefetch;
                    const url = entry.target.dataset.prefetchUrl;

                    if (key && url) {
                        this.prefetch(key, () => fetch(url).then(r => r.json()), {
                            priority: 'normal'
                        });

                        observer.unobserve(entry.target);
                    }
                }
            });
        }, { rootMargin, threshold });

        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }

    /**
     * Predict next navigation
     */
    predictNextNavigation() {
        if (this.navigationHistory.length < 2) return null;

        // Simple pattern detection (can be improved with ML)
        const recent = this.navigationHistory.slice(-5);
        const patterns = {};

        for (let i = 0; i < recent.length - 1; i++) {
            const current = recent[i];
            const next = recent[i + 1];

            if (!patterns[current]) {
                patterns[current] = {};
            }

            patterns[current][next] = (patterns[current][next] || 0) + 1;
        }

        // Get most likely next route
        const currentRoute = recent[recent.length - 1];
        const predictions = patterns[currentRoute];

        if (!predictions) return null;

        const mostLikely = Object.keys(predictions).reduce((a, b) =>
            predictions[a] > predictions[b] ? a : b
        );

        return mostLikely;
    }

    /**
     * Track navigation
     */
    trackNavigation(route) {
        this.navigationHistory.push(route);

        if (this.navigationHistory.length > this.maxHistorySize) {
            this.navigationHistory.shift();
        }

        // Predict and prefetch next route
        const predicted = this.predictNextNavigation();
        if (predicted) {
            if (import.meta.env.MODE === 'development') {
            }

            // Trigger prediction event
            this.onPredict?.(predicted);
        }
    }

    /**
     * Prefetch links in viewport
     */
    prefetchLinks(selector = 'a[data-prefetch]') {
        const links = document.querySelectorAll(selector);
        this.prefetchVisible(Array.from(links));
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.prefetchedData.clear();
        this.prefetchQueue = [];
    }

    /**
     * Get cache stats
     */
    getStats() {
        return {
            cacheSize: this.prefetchedData.size,
            queueLength: this.prefetchQueue.length,
            historySize: this.navigationHistory.length,
            isIdle: this.isIdle
        };
    }
}

// Global instance
export const dataPrefetcher = new DataPrefetcher();

/**
 * React Hook - Prefetch
 */
export const usePrefetch = (key, fetchFn, options = {}) => {
    const { enabled = true, immediate = false } = options;

    React.useEffect(() => {
        if (enabled) {
            dataPrefetcher.prefetch(key, fetchFn, { ...options, immediate });
        }
    }, [key, fetchFn, enabled, immediate, options]);

    const data = dataPrefetcher.getCachedData(key);

    return data;
};

/**
 * React Hook - Prefetch on hover
 */
export const usePrefetchOnHover = (key, fetchFn, options = {}) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current) {
            return dataPrefetcher.prefetchOnHover(ref.current, key, fetchFn, options);
        }
    }, [key, fetchFn, options]);

    return ref;
};

export default DataPrefetcher;



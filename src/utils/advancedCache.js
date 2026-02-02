// frontend/src/utils/advancedCache.js

/**
 * 🗄️ Advanced Caching System
 * Stale-while-revalidate, background sync, persistence
 */

class AdvancedCache {
    constructor(options = {}) {
        this.name = options.name || 'app-cache';
        this.version = options.version || 1;
        this.maxAge = options.maxAge || 300000; // 5 minutes
        this.maxSize = options.maxSize || 100;
        this.strategy = options.strategy || 'cache-first';

        this.cache = new Map();
        this.metadata = new Map();
        this.requestQueue = new Map();
        this.subscribers = new Map();

        this.initPersistence();
    }

    /**
     * Initialize persistence (IndexedDB)
     */
    async initPersistence() {
        if (!('indexedDB' in window)) return;

        try {
            const request = indexedDB.open(this.name, this.version);

            request.onerror = () => {
                console.warn('⚠️ [Cache] IndexedDB not available');
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                this.loadFromPersistence();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('cache')) {
                    db.createObjectStore('cache', { keyPath: 'key' });
                }
            };
        } catch (error) {
            console.warn('⚠️ [Cache] IndexedDB init failed:', error);
        }
    }

    /**
     * Load cache from IndexedDB
     */
    async loadFromPersistence() {
        if (!this.db) return;

        try {
            const transaction = this.db.transaction(['cache'], 'readonly');
            const store = transaction.objectStore('cache');
            const request = store.getAll();

            request.onsuccess = () => {
                const items = request.result;
                items.forEach(({ key, value, metadata }) => {
                    if (!this.isExpired(metadata)) {
                        this.cache.set(key, value);
                        this.metadata.set(key, metadata);
                    }
                });

                if (import.meta.env.MODE === 'development') {
                    console.log(`📦 [Cache] Loaded ${items.length} items from persistence`);
                }
            };
        } catch (error) {
            console.warn('⚠️ [Cache] Load from persistence failed:', error);
        }
    }

    /**
     * Save to IndexedDB
     */
    async saveToPersistence(key, value, metadata) {
        if (!this.db) return;

        try {
            const transaction = this.db.transaction(['cache'], 'readwrite');
            const store = transaction.objectStore('cache');
            store.put({ key, value, metadata });
        } catch (error) {
            console.warn('⚠️ [Cache] Save to persistence failed:', error);
        }
    }

    /**
     * Get from cache
     */
    get(key) {
        const value = this.cache.get(key);
        const meta = this.metadata.get(key);

        if (!value || !meta) return null;

        // Update access time
        meta.lastAccess = Date.now();
        meta.accessCount++;

        // Stale-while-revalidate
        if (this.isStale(meta) && !this.requestQueue.has(key)) {
            this.revalidate(key);
        }

        return value;
    }

    /**
     * Set to cache
     */
    set(key, value, options = {}) {
        const metadata = {
            timestamp: Date.now(),
            lastAccess: Date.now(),
            accessCount: 1,
            maxAge: options.maxAge || this.maxAge,
            tags: options.tags || [],
            etag: options.etag,
            size: this.calculateSize(value)
        };

        // LRU eviction if needed
        if (this.cache.size >= this.maxSize) {
            this.evictLRU();
        }

        this.cache.set(key, value);
        this.metadata.set(key, metadata);

        // Persist
        this.saveToPersistence(key, value, metadata);

        // Notify subscribers
        this.notifySubscribers(key, value);

        if (import.meta.env.MODE === 'development') {
            console.log(`✅ [Cache] Set: ${key}`);
        }
    }

    /**
     * Fetch with cache
     */
    async fetch(key, fetcher, options = {}) {
        const strategy = options.strategy || this.strategy;

        switch (strategy) {
            case 'cache-first':
                return this.cacheFirst(key, fetcher, options);
            case 'network-first':
                return this.networkFirst(key, fetcher, options);
            case 'stale-while-revalidate':
                return this.staleWhileRevalidate(key, fetcher, options);
            default:
                return this.cacheFirst(key, fetcher, options);
        }
    }

    /**
     * Cache-first strategy
     */
    async cacheFirst(key, fetcher, options) {
        const cached = this.get(key);
        if (cached && !this.isExpired(this.metadata.get(key))) {
            return cached;
        }

        return this.fetchAndCache(key, fetcher, options);
    }

    /**
     * Network-first strategy
     */
    async networkFirst(key, fetcher, options) {
        try {
            return await this.fetchAndCache(key, fetcher, options);
        } catch (error) {
            const cached = this.get(key);
            if (cached) {
                console.warn(`⚠️ [Cache] Network failed, using stale cache for: ${key}`);
                return cached;
            }
            throw error;
        }
    }

    /**
     * Stale-while-revalidate strategy
     */
    async staleWhileRevalidate(key, fetcher, options) {
        const cached = this.get(key);

        // Revalidate in background if stale
        if (cached && this.isStale(this.metadata.get(key))) {
            this.revalidate(key, fetcher, options);
        }

        // Return cached immediately if available
        if (cached) {
            return cached;
        }

        // Otherwise fetch
        return this.fetchAndCache(key, fetcher, options);
    }

    /**
     * Fetch and cache
     */
    async fetchAndCache(key, fetcher, options) {
        // Deduplicate concurrent requests
        if (this.requestQueue.has(key)) {
            return this.requestQueue.get(key);
        }

        const promise = fetcher().then(data => {
            this.set(key, data, options);
            this.requestQueue.delete(key);
            return data;
        }).catch(error => {
            this.requestQueue.delete(key);
            throw error;
        });

        this.requestQueue.set(key, promise);
        return promise;
    }

    /**
     * Background revalidation
     */
    async revalidate(key, fetcher, options) {
        if (!fetcher) return;

        try {
            const data = await fetcher();
            this.set(key, data, options);
        } catch (error) {
            console.warn(`⚠️ [Cache] Revalidation failed for: ${key}`, error);
        }
    }

    /**
     * Check if expired
     */
    isExpired(metadata) {
        if (!metadata) return true;
        return Date.now() - metadata.timestamp > metadata.maxAge;
    }

    /**
     * Check if stale (50% of maxAge)
     */
    isStale(metadata) {
        if (!metadata) return true;
        return Date.now() - metadata.timestamp > metadata.maxAge * 0.5;
    }

    /**
     * LRU eviction
     */
    evictLRU() {
        let lruKey = null;
        let lruTime = Infinity;

        this.metadata.forEach((meta, key) => {
            if (meta.lastAccess < lruTime) {
                lruTime = meta.lastAccess;
                lruKey = key;
            }
        });

        if (lruKey) {
            this.delete(lruKey);
        }
    }

    /**
     * Delete from cache
     */
    delete(key) {
        this.cache.delete(key);
        this.metadata.delete(key);

        // Delete from IndexedDB
        if (this.db) {
            try {
                const transaction = this.db.transaction(['cache'], 'readwrite');
                const store = transaction.objectStore('cache');
                store.delete(key);
            } catch (error) {
                console.warn('⚠️ [Cache] Delete from persistence failed:', error);
            }
        }
    }

    /**
     * Clear cache
     */
    clear() {
        this.cache.clear();
        this.metadata.clear();
        this.requestQueue.clear();

        // Clear IndexedDB
        if (this.db) {
            try {
                const transaction = this.db.transaction(['cache'], 'readwrite');
                const store = transaction.objectStore('cache');
                store.clear();
            } catch (error) {
                console.warn('⚠️ [Cache] Clear persistence failed:', error);
            }
        }
    }

    /**
     * Invalidate by tag
     */
    invalidateByTag(tag) {
        const keysToDelete = [];

        this.metadata.forEach((meta, key) => {
            if (meta.tags && meta.tags.includes(tag)) {
                keysToDelete.push(key);
            }
        });

        keysToDelete.forEach(key => this.delete(key));

        if (import.meta.env.MODE === 'development') {
            console.log(`🗑️ [Cache] Invalidated ${keysToDelete.length} items with tag: ${tag}`);
        }
    }

    /**
     * Subscribe to cache changes
     */
    subscribe(key, callback) {
        if (!this.subscribers.has(key)) {
            this.subscribers.set(key, new Set());
        }
        this.subscribers.get(key).add(callback);

        return () => {
            const subs = this.subscribers.get(key);
            if (subs) {
                subs.delete(callback);
            }
        };
    }

    /**
     * Notify subscribers
     */
    notifySubscribers(key, value) {
        const subs = this.subscribers.get(key);
        if (subs) {
            subs.forEach(callback => callback(value));
        }
    }

    /**
     * Calculate size (rough estimate)
     */
    calculateSize(value) {
        try {
            return JSON.stringify(value).length;
        } catch {
            return 0;
        }
    }

    /**
     * Get stats
     */
    getStats() {
        let totalSize = 0;
        let expiredCount = 0;
        let staleCount = 0;

        this.metadata.forEach((meta) => {
            totalSize += meta.size || 0;
            if (this.isExpired(meta)) expiredCount++;
            if (this.isStale(meta)) staleCount++;
        });

        return {
            size: this.cache.size,
            totalSize,
            expiredCount,
            staleCount,
            maxSize: this.maxSize,
            hitRate: this.calculateHitRate()
        };
    }

    /**
     * Calculate hit rate
     */
    calculateHitRate() {
        let totalAccess = 0;
        this.metadata.forEach((meta) => {
            totalAccess += meta.accessCount;
        });
        return totalAccess > 0 ? this.cache.size / totalAccess : 0;
    }
}

// Global instance
export const advancedCache = new AdvancedCache({
    name: 'pawscord-cache',
    version: 1,
    maxAge: 300000, // 5 minutes
    maxSize: 200,
    strategy: 'stale-while-revalidate'
});

/**
 * React Hook
 */
export const useAdvancedCache = (key, fetcher, options = {}) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        let cancelled = false;

        const loadData = async () => {
            try {
                const result = await advancedCache.fetch(key, fetcher, options);
                if (!cancelled) {
                    setData(result);
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

        loadData();

        // Subscribe to updates
        const unsubscribe = advancedCache.subscribe(key, (newData) => {
            if (!cancelled) {
                setData(newData);
            }
        });

        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, [key, fetcher, options]);

    const refetch = React.useCallback(() => {
        advancedCache.delete(key);
        setLoading(true);
    }, [key]);

    return { data, loading, error, refetch };
};

export default AdvancedCache;



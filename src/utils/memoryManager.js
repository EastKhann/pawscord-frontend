// frontend/src/utils/memoryManager.js

/**
 * 💾 Memory Manager
 * Bellek kullanımını optimize eder
 * Cache yönetimi ve memory leak prevention
 */

class MemoryManager {
    constructor() {
        this.caches = new Map();
        this.maxCacheSize = 50 * 1024 * 1024; // 50MB
        this.currentCacheSize = 0;
        this.isMonitoring = false;

        if (import.meta.env.MODE === 'development') {
            this.startMonitoring();
        }
    }

    /**
     * Bellek kullanımını izle
     */
    startMonitoring() {
        if (this.isMonitoring) return;
        if (!performance.memory) {
            console.warn('⚠️ [Memory] Performance.memory API not available');
            return;
        }

        this.isMonitoring = true;

        setInterval(() => {
            const memoryInfo = performance.memory;
            const usedMB = (memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2);
            const totalMB = (memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2);
            const limitMB = (memoryInfo.jsHeapSizeLimit / 1024 / 1024).toFixed(2);

            const usage = (memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit) * 100;

            // Bellek kullanımı %80'i geçtiyse uyar
            if (usage > 80) {
                console.warn(`⚠️ [Memory] High usage: ${usedMB}MB / ${limitMB}MB (${usage.toFixed(1)}%)`);
                this.cleanup();
            } else if (import.meta.env.MODE === 'development') {
            }
        }, 30000); // Her 30 saniyede bir kontrol et
    }

    /**
     * Cache ekle
     */
    set(key, value, ttl = 300000) { // Default 5 dakika
        const size = this.estimateSize(value);

        // Cache limiti aşılırsa eski cache'leri temizle
        if (this.currentCacheSize + size > this.maxCacheSize) {
            this.evictOldest();
        }

        const cacheItem = {
            value,
            size,
            timestamp: Date.now(),
            ttl,
            hits: 0
        };

        this.caches.set(key, cacheItem);
        this.currentCacheSize += size;

    }

    /**
     * Cache oku
     */
    get(key) {
        const item = this.caches.get(key);

        if (!item) {
            return null;
        }

        // TTL kontrolü
        if (Date.now() - item.timestamp > item.ttl) {
            this.delete(key);
            return null;
        }

        // Hit count artır
        item.hits++;
        return item.value;
    }

    /**
     * Cache sil
     */
    delete(key) {
        const item = this.caches.get(key);
        if (item) {
            this.currentCacheSize -= item.size;
            this.caches.delete(key);
        }
    }

    /**
     * Tüm cache'i temizle
     */
    clear() {
        this.caches.clear();
        this.currentCacheSize = 0;
    }

    /**
     * En eski cache'leri temizle (LRU)
     */
    evictOldest() {
        const sorted = Array.from(this.caches.entries())
            .sort((a, b) => {
                // Hit count düşük olanlar önce
                const scoreA = a[1].hits / (Date.now() - a[1].timestamp);
                const scoreB = b[1].hits / (Date.now() - b[1].timestamp);
                return scoreA - scoreB;
            });

        // İlk %25'i temizle
        const toRemove = Math.ceil(sorted.length * 0.25);
        for (let i = 0; i < toRemove; i++) {
            this.delete(sorted[i][0]);
        }

    }

    /**
     * Genel temizlik
     */
    cleanup() {

        // Süresi dolmuş cache'leri temizle
        const now = Date.now();
        for (const [key, item] of this.caches.entries()) {
            if (now - item.timestamp > item.ttl) {
                this.delete(key);
            }
        }

        // Garbage collection'ı tetikle (modern browser'larda)
        if (global.gc) {
            global.gc();
        }
    }

    /**
     * Nesne boyutunu tahmin et (approximate)
     */
    estimateSize(obj) {
        const json = JSON.stringify(obj);
        return new Blob([json]).size;
    }

    /**
     * Cache istatistikleri
     */
    getStats() {
        return {
            items: this.caches.size,
            size: (this.currentCacheSize / 1024 / 1024).toFixed(2) + ' MB',
            maxSize: (this.maxCacheSize / 1024 / 1024).toFixed(2) + ' MB',
            usage: ((this.currentCacheSize / this.maxCacheSize) * 100).toFixed(1) + '%',
            mostHit: this.getMostHitCache()
        };
    }

    /**
     * En çok hit alan cache
     */
    getMostHitCache() {
        let max = { key: null, hits: 0 };
        for (const [key, item] of this.caches.entries()) {
            if (item.hits > max.hits) {
                max = { key, hits: item.hits };
            }
        }
        return max;
    }
}

// Global instance
export const memoryManager = new MemoryManager();

/**
 * Smart Cache - TTL ve LRU ile otomatik cache
 */
export class SmartCache {
    constructor(name, options = {}) {
        this.name = name;
        this.options = {
            maxAge: options.maxAge || 300000, // 5 dakika
            maxSize: options.maxSize || 100, // Max item sayısı
            ...options
        };
        this.cache = new Map();
    }

    /**
     * Cache'e ekle
     */
    set(key, value) {
        // Max size kontrolü
        if (this.cache.size >= this.options.maxSize) {
            // En eski item'i sil
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    /**
     * Cache'den oku
     */
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;

        // TTL kontrolü
        if (Date.now() - item.timestamp > this.options.maxAge) {
            this.cache.delete(key);
            return null;
        }

        return item.value;
    }

    /**
     * Async fetch with cache
     */
    async fetch(key, fetchFn) {
        // Cache'de var mı?
        const cached = this.get(key);
        if (cached !== null) {
            return cached;
        }

        // Cache'de yok, fetch et
        const value = await fetchFn();
        this.set(key, value);
        return value;
    }

    /**
     * Clear
     */
    clear() {
        this.cache.clear();
    }

    /**
     * Size
     */
    size() {
        return this.cache.size;
    }
}

/**
 * IndexedDB Cache Manager (offline ve büyük data için)
 */
export class IndexedDBCache {
    constructor(dbName = 'PawscordCache', version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }

    /**
     * DB'yi aç
     */
    async open() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('cache')) {
                    const store = db.createObjectStore('cache', { keyPath: 'key' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                }
            };
        });
    }

    /**
     * Set
     */
    async set(key, value, ttl = 3600000) {
        if (!this.db) await this.open();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['cache'], 'readwrite');
            const store = transaction.objectStore('cache');

            const request = store.put({
                key,
                value,
                timestamp: Date.now(),
                ttl
            });

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get
     */
    async get(key) {
        if (!this.db) await this.open();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['cache'], 'readonly');
            const store = transaction.objectStore('cache');
            const request = store.get(key);

            request.onsuccess = () => {
                const item = request.result;
                if (!item) {
                    resolve(null);
                    return;
                }

                // TTL check
                if (Date.now() - item.timestamp > item.ttl) {
                    this.delete(key);
                    resolve(null);
                } else {
                    resolve(item.value);
                }
            };

            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Delete
     */
    async delete(key) {
        if (!this.db) await this.open();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['cache'], 'readwrite');
            const store = transaction.objectStore('cache');
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Clear all
     */
    async clear() {
        if (!this.db) await this.open();

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['cache'], 'readwrite');
            const store = transaction.objectStore('cache');
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
}

// Export helpers
export const createSmartCache = (name, options) => new SmartCache(name, options);
export const createIndexedDBCache = (dbName, version) => new IndexedDBCache(dbName, version);

export default MemoryManager;



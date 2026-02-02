// ⚡ MEMORY OPTIMIZATION UTILITIES
// Prevent memory leaks and optimize memory usage

/**
 * Memory-efficient event emitter with automatic cleanup
 */
export class OptimizedEventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);

        // Return cleanup function
        return () => this.off(event, callback);
    }

    off(event, callback) {
        if (!this.events.has(event)) return;
        this.events.get(event).delete(callback);

        // Clean up empty event sets
        if (this.events.get(event).size === 0) {
            this.events.delete(event);
        }
    }

    emit(event, data) {
        if (!this.events.has(event)) return;
        this.events.get(event).forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error(`Error in event handler for "${event}":`, error);
            }
        });
    }

    clear() {
        this.events.clear();
    }

    getListenerCount(event) {
        return this.events.has(event) ? this.events.get(event).size : 0;
    }
}

/**
 * WeakMap-based cache for objects (automatic garbage collection)
 */
export class WeakCache {
    constructor() {
        this.cache = new WeakMap();
    }

    set(key, value) {
        if (typeof key !== 'object' || key === null) {
            throw new Error('WeakCache keys must be objects');
        }
        this.cache.set(key, value);
    }

    get(key) {
        return this.cache.get(key);
    }

    has(key) {
        return this.cache.has(key);
    }

    delete(key) {
        return this.cache.delete(key);
    }
}

/**
 * LRU Cache with size limit (Least Recently Used)
 */
export class LRUCache {
    constructor(maxSize = 100) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return undefined;

        // Move to end (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);

        return value;
    }

    set(key, value) {
        // Remove if exists
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }

        // Add to end
        this.cache.set(key, value);

        // Remove oldest if over limit
        if (this.cache.size > this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
    }

    has(key) {
        return this.cache.has(key);
    }

    clear() {
        this.cache.clear();
    }

    get size() {
        return this.cache.size;
    }
}

/**
 * Memory usage monitor (Chrome only)
 */
export class MemoryMonitor {
    constructor() {
        this.enabled = 'memory' in performance;
    }

    getUsage() {
        if (!this.enabled) {
            return {
                supported: false,
                usedJSHeapSize: 0,
                totalJSHeapSize: 0,
                jsHeapSizeLimit: 0,
            };
        }

        const memory = performance.memory;
        return {
            supported: true,
            usedJSHeapSize: memory.usedJSHeapSize,
            totalJSHeapSize: memory.totalJSHeapSize,
            jsHeapSizeLimit: memory.jsHeapSizeLimit,
            usagePercent: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
        };
    }

    startMonitoring(interval = 10000) {
        if (!this.enabled) return;

        this.monitoringInterval = setInterval(() => {
            const usage = this.getUsage();
            if (usage.usagePercent > 90) {
                console.warn('⚠️ High memory usage:', usage.usagePercent.toFixed(2) + '%');
            }
        }, interval);
    }

    stopMonitoring() {
        if (this.monitoringInterval) {
            clearInterval(this.monitoringInterval);
        }
    }
}

/**
 * Cleanup helper for React components
 */
export class CleanupManager {
    constructor() {
        this.cleanupFunctions = [];
    }

    add(cleanupFn) {
        if (typeof cleanupFn === 'function') {
            this.cleanupFunctions.push(cleanupFn);
        }
        return this;
    }

    cleanup() {
        this.cleanupFunctions.forEach(fn => {
            try {
                fn();
            } catch (error) {
                console.error('Error during cleanup:', error);
            }
        });
        this.cleanupFunctions = [];
    }
}

// React hook for automatic cleanup
export function useCleanup() {
    const manager = React.useRef(new CleanupManager());

    React.useEffect(() => {
        return () => manager.current.cleanup();
    }, []);

    return manager.current;
}

// Global instances
export const memoryMonitor = new MemoryMonitor();
export const globalEventEmitter = new OptimizedEventEmitter();

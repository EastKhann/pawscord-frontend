// frontend/src/utils/memoizationCache.js

/**
 * 🧠 Advanced Memoization Cache
 * Function result caching with multiple strategies
 */

/**
 * Simple memoization
 */
export function memoize(fn, options = {}) {
    const cache = new Map();
    const { maxSize = 100, keyGenerator = JSON.stringify } = options;

    const memoized = function (...args) {
        const key = keyGenerator(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);

        // LRU eviction
        if (cache.size >= maxSize) {
            const firstKey = cache.keys().next().value;
            cache.delete(firstKey);
        }

        cache.set(key, result);
        return result;
    };

    memoized.cache = cache;
    memoized.clear = () => cache.clear();
    memoized.delete = (key) => cache.delete(key);

    return memoized;
}

/**
 * Async memoization
 */
export function memoizeAsync(fn, options = {}) {
    const cache = new Map();
    const pending = new Map();
    const {
        maxSize = 100,
        ttl = 300000, // 5 minutes
        keyGenerator = JSON.stringify
    } = options;

    const memoized = async function (...args) {
        const key = keyGenerator(args);

        // Check cache
        if (cache.has(key)) {
            const { value, timestamp } = cache.get(key);
            if (Date.now() - timestamp < ttl) {
                return value;
            }
            cache.delete(key);
        }

        // Deduplicate concurrent calls
        if (pending.has(key)) {
            return pending.get(key);
        }

        const promise = fn.apply(this, args)
            .then(result => {
                // LRU eviction
                if (cache.size >= maxSize) {
                    const firstKey = cache.keys().next().value;
                    cache.delete(firstKey);
                }

                cache.set(key, {
                    value: result,
                    timestamp: Date.now()
                });

                pending.delete(key);
                return result;
            })
            .catch(error => {
                pending.delete(key);
                throw error;
            });

        pending.set(key, promise);
        return promise;
    };

    memoized.cache = cache;
    memoized.clear = () => {
        cache.clear();
        pending.clear();
    };
    memoized.delete = (key) => {
        cache.delete(key);
        pending.delete(key);
    };

    return memoized;
}

/**
 * Weak memoization (for object keys)
 */
export function memoizeWeak(fn) {
    const cache = new WeakMap();

    return function (obj, ...args) {
        if (!cache.has(obj)) {
            const result = fn.call(this, obj, ...args);
            cache.set(obj, result);
            return result;
        }
        return cache.get(obj);
    };
}

/**
 * Timed memoization
 */
export function memoizeTimed(fn, ttl = 5000) {
    const cache = new Map();

    return function (...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);

        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.value;
        }

        const result = fn.apply(this, args);
        cache.set(key, {
            value: result,
            timestamp: Date.now()
        });

        return result;
    };
}

/**
 * Memoization with dependencies
 */
export function memoizeWithDeps(fn, deps = []) {
    let cache = null;
    let prevDeps = null;

    return function (...args) {
        if (!prevDeps || !areDepsEqual(deps, prevDeps)) {
            cache = fn.apply(this, args);
            prevDeps = [...deps];
        }
        return cache;
    };
}

/**
 * Multi-key memoization
 */
export function memoizeMultiKey(fn, keyFns = []) {
    const cache = new Map();

    return function (...args) {
        let currentCache = cache;

        // Navigate through nested maps
        for (let i = 0; i < keyFns.length; i++) {
            const key = keyFns[i](...args);

            if (!currentCache.has(key)) {
                if (i === keyFns.length - 1) {
                    const result = fn.apply(this, args);
                    currentCache.set(key, result);
                    return result;
                }
                currentCache.set(key, new Map());
            }

            currentCache = currentCache.get(key);
        }

        return currentCache;
    };
}

/**
 * Fibonacci memoization (classic example)
 */
export const fibonacci = memoize((n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

/**
 * Expensive calculation memoization
 */
export class MemoizationCache {
    constructor(options = {}) {
        this.cache = new Map();
        this.maxSize = options.maxSize || 1000;
        this.ttl = options.ttl || 3600000; // 1 hour
        this.hits = 0;
        this.misses = 0;
    }

    get(key) {
        if (this.cache.has(key)) {
            const { value, timestamp } = this.cache.get(key);

            if (Date.now() - timestamp < this.ttl) {
                this.hits++;
                return value;
            }

            this.cache.delete(key);
        }

        this.misses++;
        return undefined;
    }

    set(key, value) {
        // LRU eviction
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }

        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }

    has(key) {
        if (!this.cache.has(key)) return false;

        const { timestamp } = this.cache.get(key);
        return Date.now() - timestamp < this.ttl;
    }

    delete(key) {
        this.cache.delete(key);
    }

    clear() {
        this.cache.clear();
        this.hits = 0;
        this.misses = 0;
    }

    getStats() {
        return {
            size: this.cache.size,
            maxSize: this.maxSize,
            hits: this.hits,
            misses: this.misses,
            hitRate: this.hits / (this.hits + this.misses) || 0
        };
    }
}

/**
 * React Hook - useMemoizeAsync
 */
export const useMemoizeAsync = (fn, deps = []) => {
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const cacheRef = React.useRef(new Map());

    React.useEffect(() => {
        const key = JSON.stringify(deps);

        if (cacheRef.current.has(key)) {
            setResult(cacheRef.current.get(key));
            return;
        }

        setLoading(true);

        fn().then(data => {
            cacheRef.current.set(key, data);
            setResult(data);
            setLoading(false);
        });
    }, deps);

    return { result, loading };
};

/**
 * Helper functions
 */
function areDepsEqual(deps1, deps2) {
    if (deps1.length !== deps2.length) return false;
    return deps1.every((dep, i) => dep === deps2[i]);
}

/**
 * Decorator for class methods
 */
export function Memoize(options = {}) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        const cache = new Map();
        const { maxSize = 100 } = options;

        descriptor.value = function (...args) {
            const key = JSON.stringify(args);

            if (cache.has(key)) {
                return cache.get(key);
            }

            const result = originalMethod.apply(this, args);

            if (cache.size >= maxSize) {
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }

            cache.set(key, result);
            return result;
        };

        return descriptor;
    };
}

// Global memoization cache
export const globalMemoCache = new MemoizationCache({
    maxSize: 1000,
    ttl: 3600000
});

export default {
    memoize,
    memoizeAsync,
    memoizeWeak,
    memoizeTimed,
    memoizeWithDeps,
    memoizeMultiKey,
    MemoizationCache,
    globalMemoCache
};



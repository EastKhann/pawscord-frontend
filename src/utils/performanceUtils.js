// ⚡ PERFORMANCE OPTIMIZATION UTILITIES
// Comprehensive performance tools for PAWSCORD

import { useCallback, useEffect, useRef, useState, useMemo } from 'react';

// =====================================
// 🎯 MEMOIZATION UTILITIES
// =====================================

// Deep comparison for objects
export const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false;
    if (obj1 === null || obj2 === null) return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
};

// Memoize function with deep comparison
export const memoizeDeep = (fn) => {
    let lastArgs = null;
    let lastResult = null;

    return (...args) => {
        if (lastArgs && deepEqual(args, lastArgs)) {
            return lastResult;
        }
        lastArgs = args;
        lastResult = fn(...args);
        return lastResult;
    };
};

// =====================================
// ⏱️ DEBOUNCE & THROTTLE
// =====================================

// Enhanced debounce with leading/trailing options
export const debounce = (fn, delay, options = {}) => {
    const { leading = false, trailing = true } = options;
    let timeoutId = null;
    let lastCallTime = 0;

    const debounced = (...args) => {
        const now = Date.now();
        const shouldCallLeading = leading && !timeoutId;

        if (timeoutId) clearTimeout(timeoutId);

        if (shouldCallLeading) {
            fn(...args);
            lastCallTime = now;
        }

        if (trailing) {
            timeoutId = setTimeout(() => {
                if (!leading || now - lastCallTime >= delay) {
                    fn(...args);
                }
                timeoutId = null;
            }, delay);
        }
    };

    debounced.cancel = () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = null;
    };

    return debounced;
};

// Enhanced throttle with trailing call
export const throttle = (fn, limit, options = {}) => {
    const { trailing = true } = options;
    let lastCall = 0;
    let timeoutId = null;
    let lastArgs = null;

    const throttled = (...args) => {
        const now = Date.now();
        const remaining = limit - (now - lastCall);

        if (remaining <= 0) {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
            lastCall = now;
            fn(...args);
        } else if (trailing && !timeoutId) {
            lastArgs = args;
            timeoutId = setTimeout(() => {
                lastCall = Date.now();
                timeoutId = null;
                fn(...lastArgs);
            }, remaining);
        }
    };

    throttled.cancel = () => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = null;
    };

    return throttled;
};

// =====================================
// 🪝 PERFORMANCE HOOKS
// =====================================

// Debounced state hook
export const useDebouncedState = (initialValue, delay = 300) => {
    const [value, setValue] = useState(initialValue);
    const [debouncedValue, setDebouncedValue] = useState(initialValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return [debouncedValue, setValue, value];
};

// Throttled callback hook
export const useThrottledCallback = (callback, delay, deps = []) => {
    const throttledRef = useRef(null);

    useEffect(() => {
        throttledRef.current = throttle(callback, delay);
        return () => throttledRef.current?.cancel();
    }, [callback, delay, ...deps]);

    return useCallback((...args) => {
        throttledRef.current?.(...args);
    }, []);
};

// Previous value hook
export const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

// Intersection observer hook (lazy loading)
export const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
            if (entry.isIntersecting) {
                setHasIntersected(true);
            }
        }, {
            threshold: 0.1,
            rootMargin: '50px',
            ...options
        });

        const target = targetRef.current;
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [options.threshold, options.rootMargin]);

    return { targetRef, isIntersecting, hasIntersected };
};

// Render count tracker (dev only)
export const useRenderCount = (componentName) => {
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;
        if (import.meta.env.MODE === 'development') {
            console.log(`[Render] ${componentName}: ${renderCount.current}`);
        }
    });

    return renderCount.current;
};

// =====================================
// 📊 PERFORMANCE MONITORING
// =====================================

// Performance metrics collector
export const performanceMetrics = {
    marks: new Map(),
    measures: new Map(),

    mark: (name) => {
        performance.mark(name);
        performanceMetrics.marks.set(name, performance.now());
    },

    measure: (name, startMark, endMark) => {
        try {
            performance.measure(name, startMark, endMark);
            const entries = performance.getEntriesByName(name);
            if (entries.length > 0) {
                performanceMetrics.measures.set(name, entries[entries.length - 1].duration);
            }
        } catch (e) {
            console.warn(`[Perf] Could not measure ${name}:`, e);
        }
    },

    getMetrics: () => ({
        marks: Object.fromEntries(performanceMetrics.marks),
        measures: Object.fromEntries(performanceMetrics.measures),
        memory: performance.memory ? {
            usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
            totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB'
        } : null
    }),

    clear: () => {
        performance.clearMarks();
        performance.clearMeasures();
        performanceMetrics.marks.clear();
        performanceMetrics.measures.clear();
    }
};

// Component render time tracker
export const useRenderTime = (componentName) => {
    const startTime = useRef(performance.now());

    useEffect(() => {
        const endTime = performance.now();
        const duration = endTime - startTime.current;

        if (duration > 16) { // More than one frame (16ms)
            console.warn(`[Perf] Slow render: ${componentName} took ${duration.toFixed(2)}ms`);
        }
    });
};

// =====================================
// 🔄 REQUEST ANIMATION FRAME UTILS
// =====================================

// RAF-based update scheduler
export const rafScheduler = {
    queue: new Set(),
    scheduled: false,

    schedule: (callback) => {
        rafScheduler.queue.add(callback);

        if (!rafScheduler.scheduled) {
            rafScheduler.scheduled = true;
            requestAnimationFrame(() => {
                const callbacks = Array.from(rafScheduler.queue);
                rafScheduler.queue.clear();
                rafScheduler.scheduled = false;

                callbacks.forEach(cb => cb());
            });
        }
    }
};

// Smooth scroll with RAF
export const smoothScrollTo = (element, options = {}) => {
    const { duration = 300, offset = 0 } = options;
    const start = window.scrollY;
    const target = element.getBoundingClientRect().top + start + offset;
    const distance = target - start;
    const startTime = performance.now();

    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeInOutQuad(progress);

        window.scrollTo(0, start + distance * eased);

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

// =====================================
// 💾 MEMORY MANAGEMENT
// =====================================

// Cleanup manager for subscriptions
export class CleanupManager {
    constructor() {
        this.cleanups = [];
    }

    add(cleanup) {
        if (typeof cleanup === 'function') {
            this.cleanups.push(cleanup);
        }
        return this;
    }

    execute() {
        this.cleanups.forEach(cleanup => {
            try {
                cleanup();
            } catch (e) {
                console.error('[Cleanup] Error:', e);
            }
        });
        this.cleanups = [];
    }
}

// Hook for managing cleanups
export const useCleanup = () => {
    const manager = useRef(new CleanupManager());

    useEffect(() => {
        return () => manager.current.execute();
    }, []);

    return manager.current;
};

// =====================================
// 🎨 VIRTUALIZATION HELPERS
// =====================================

// Calculate visible items for virtual list
export const getVisibleItems = (scrollTop, containerHeight, itemHeight, totalItems, overscan = 3) => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
        totalItems - 1,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );

    return {
        startIndex,
        endIndex,
        visibleCount: endIndex - startIndex + 1,
        offsetY: startIndex * itemHeight
    };
};

// =====================================
// 🔧 EXPORT ALL
// =====================================

export default {
    // Memoization
    deepEqual,
    memoizeDeep,

    // Timing
    debounce,
    throttle,

    // Hooks
    useDebouncedState,
    useThrottledCallback,
    usePrevious,
    useIntersectionObserver,
    useRenderCount,
    useRenderTime,
    useCleanup,

    // Metrics
    performanceMetrics,

    // RAF
    rafScheduler,
    smoothScrollTo,

    // Virtualization
    getVisibleItems,

    // Memory
    CleanupManager
};

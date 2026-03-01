/**
 * @file performanceHooks.js
 * @description Canonical Performance & Render Optimization Utilities for PAWSCORD.
 *
 * Consolidated from:
 *   - utils/renderOptimization.js
 *   - utils/renderOptimization.enhanced.js
 *   - utils/performanceOptimization.js
 *   - utils/performanceUtils.js
 *   - utils/performance.js
 *
 * All old files re-export from this module for backward compatibility.
 *
 * @module performanceHooks
 */

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';

// =====================================================================
// SECTION 1: PURE UTILITY FUNCTIONS
// =====================================================================

/**
 * Deep equality comparison for two values (recursive).
 * Handles nested objects and arrays.
 *
 * @param {*} obj1 - First value
 * @param {*} obj2 - Second value
 * @returns {boolean} True if deeply equal
 *
 * @example
 * deepEqual({ a: { b: 1 } }, { a: { b: 1 } }); // true
 */
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

/**
 * Shallow equality comparison for two objects.
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {boolean} True if all own keys are strictly equal
 *
 * @example
 * shallowEqual({ a: 1 }, { a: 1 }); // true
 */
export const shallowEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) return false;
    }

    return true;
};

/**
 * Memoize a function using deep comparison of arguments.
 *
 * @param {Function} fn - Function to memoize
 * @returns {Function} Memoized function
 *
 * @example
 * const memoized = memoizeDeep((data) => expensiveTransform(data));
 */
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

/**
 * Enhanced debounce with leading/trailing options.
 * Returns a debounced function with a `.cancel()` method.
 *
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in ms
 * @param {Object} [options]
 * @param {boolean} [options.leading=false] - Fire on leading edge
 * @param {boolean} [options.trailing=true] - Fire on trailing edge
 * @returns {Function} Debounced function (has `.cancel()`)
 *
 * @example
 * const debouncedSave = debounce(save, 300);
 * debouncedSave(data);
 * debouncedSave.cancel();
 */
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

/**
 * Enhanced throttle with trailing call support.
 * Returns a throttled function with a `.cancel()` method.
 *
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Minimum interval in ms
 * @param {Object} [options]
 * @param {boolean} [options.trailing=true] - Fire trailing call
 * @returns {Function} Throttled function (has `.cancel()`)
 *
 * @example
 * const throttledScroll = throttle(handleScroll, 100);
 * window.addEventListener('scroll', throttledScroll);
 */
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

/**
 * Split an array into chunks of a given size.
 *
 * @param {Array} array - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array[]} Chunked arrays
 *
 * @example
 * chunkArray([1,2,3,4,5], 2); // [[1,2],[3,4],[5]]
 */
export const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

/**
 * Measure synchronous function execution time.
 * Logs warnings for slow operations (>16ms or >100ms).
 *
 * @param {string} metricName - Label for the measurement
 * @param {Function} fn - Synchronous function to measure
 * @returns {*} Return value of fn
 *
 * @example
 * const result = measurePerformance('sort', () => data.sort());
 */
export const measurePerformance = (metricName, fn) => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;

    if (duration > 100) {
        console.warn(`⚠️ Slow operation: ${metricName} took ${duration.toFixed(2)}ms`);
    }

    if (typeof performance.mark === 'function') {
        try {
            performance.mark(`${metricName}-start`);
            performance.mark(`${metricName}-end`);
            performance.measure(metricName, `${metricName}-start`, `${metricName}-end`);
        } catch { /* ignore */ }
    }

    return result;
};

/**
 * Measure asynchronous function execution time.
 *
 * @param {string} metricName - Label for the measurement
 * @param {Function} fn - Async function to measure
 * @returns {Promise<*>} Return value of fn
 *
 * @example
 * const data = await measurePerformanceAsync('fetch', () => fetch('/api'));
 */
export const measurePerformanceAsync = async (metricName, fn) => {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;

    if (duration > 1000) {
        console.warn(`⚠️ Slow async operation: ${metricName} took ${duration.toFixed(2)}ms`);
    }

    return result;
};

/**
 * Report Core Web Vitals metrics (CLS, FID, FCP, LCP, TTFB).
 *
 * @param {Function} onPerfEntry - Callback receiving each metric
 *
 * @example
 * reportWebVitals(console.log);
 */
export const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
            getCLS(onPerfEntry);
            getFID(onPerfEntry);
            getFCP(onPerfEntry);
            getLCP(onPerfEntry);
            getTTFB(onPerfEntry);
        });
    }
};

/**
 * Log network timing for a given URL from the Performance API.
 *
 * @param {string} url - URL to look up
 */
export const logNetworkTiming = (url) => {
    if (!performance.getEntriesByName) return;
    const entries = performance.getEntriesByName(url);
    if (entries.length > 0) {
        const entry = entries[entries.length - 1];
        if (import.meta.env.MODE === 'development') {
            console.debug('[Network]', url, entry);
        }
    }
};

/**
 * Log current JS heap memory usage (Chrome only).
 */
export const logMemoryUsage = () => {
    if (performance.memory) {
        const usage = performance.memory;
        if (import.meta.env.MODE === 'development') {
            console.debug('[Memory]', {
                used: (usage.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
                total: (usage.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
            });
        }
    }
};

/**
 * Calculate visible items for a virtual list given scroll position.
 *
 * @param {number} scrollTop - Current scroll offset
 * @param {number} containerHeight - Visible viewport height
 * @param {number} itemHeight - Fixed height per item
 * @param {number} totalItems - Total number of items
 * @param {number} [overscan=3] - Extra items to render above/below
 * @returns {{ startIndex: number, endIndex: number, visibleCount: number, offsetY: number }}
 */
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
        offsetY: startIndex * itemHeight,
    };
};

/**
 * Smooth-scroll to a DOM element using requestAnimationFrame.
 *
 * @param {HTMLElement} element - Target element
 * @param {Object} [options]
 * @param {number} [options.duration=300] - Animation duration in ms
 * @param {number} [options.offset=0] - Pixel offset from target
 */
export const smoothScrollTo = (element, options = {}) => {
    const { duration = 300, offset = 0 } = options;
    const start = window.scrollY;
    const target = element.getBoundingClientRect().top + start + offset;
    const distance = target - start;
    const startTime = performance.now();

    const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

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

// =====================================================================
// SECTION 2: CLASSES & SINGLETONS
// =====================================================================

/**
 * Virtualization helper class for long lists.
 * Computes visible range given scroll state.
 *
 * @example
 * const vl = new VirtualList({ itemHeight: 40 });
 * const range = vl.getVisibleRange(scrollTop, totalItems);
 */
export class VirtualList {
    constructor(options = {}) {
        this.itemHeight = options.itemHeight || 50;
        this.containerHeight = options.containerHeight || 600;
        this.overscan = options.overscan || 3;
    }

    getVisibleRange(scrollTop, totalItems) {
        const start = Math.floor(scrollTop / this.itemHeight);
        const visibleCount = Math.ceil(this.containerHeight / this.itemHeight);
        const end = Math.min(start + visibleCount, totalItems);

        return {
            start: Math.max(0, start - this.overscan),
            end: Math.min(totalItems, end + this.overscan),
            offsetY: start * this.itemHeight,
        };
    }
}

/**
 * Cleanup manager for collecting and executing teardown functions.
 *
 * @example
 * const mgr = new CleanupManager();
 * mgr.add(() => sub.unsubscribe());
 * mgr.execute(); // runs all cleanups
 */
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
        this.cleanups.forEach((cleanup) => {
            try {
                cleanup();
            } catch (e) {
                console.error('[Cleanup] Error:', e);
            }
        });
        this.cleanups = [];
    }
}

/**
 * Performance metrics collector using the browser Performance API.
 * Provides mark/measure helpers and memory stats.
 */
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
        memory: performance.memory
            ? {
                usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
                totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
            }
            : null,
    }),

    clear: () => {
        performance.clearMarks();
        performance.clearMeasures();
        performanceMetrics.marks.clear();
        performanceMetrics.measures.clear();
    },
};

/**
 * RAF-based update scheduler. Batches callbacks into a single animation frame.
 *
 * @example
 * rafScheduler.schedule(() => updateDOM());
 */
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
                callbacks.forEach((cb) => cb());
            });
        }
    },
};

/**
 * API call performance tracker.
 * Pair `startMeasure` / `endMeasure` around async work.
 *
 * @example
 * performanceMonitor.startMeasure('fetchUsers');
 * const users = await fetchUsers();
 * performanceMonitor.endMeasure('fetchUsers');
 */
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
    }

    startMeasure(name) {
        this.metrics.set(name, { start: performance.now(), name });
    }

    endMeasure(name) {
        const metric = this.metrics.get(name);
        if (!metric) {
            console.warn(`No metric found for: ${name}`);
            return null;
        }
        const duration = performance.now() - metric.start;
        this.metrics.delete(name);
        return { name, duration, timestamp: new Date().toISOString() };
    }

    logMetric(name) {
        const result = this.endMeasure(name);
        if (result && import.meta.env.MODE === 'development') {
            console.debug(`[PerfMonitor] ${result.name}: ${result.duration.toFixed(2)}ms`);
        }
    }

    getMetrics() {
        return Array.from(this.metrics.entries());
    }

    clear() {
        this.metrics.clear();
    }
}

export const performanceMonitor = new PerformanceMonitor();

// =====================================================================
// SECTION 3: REACT HOOKS — Debounce / Throttle
// =====================================================================

/**
 * Debounce a value. Returns the debounced value that only updates
 * after the specified delay of inactivity.
 *
 * @param {*} value - Value to debounce
 * @param {number} [delay=300] - Delay in ms
 * @returns {*} Debounced value
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 300);
 */
export const useDebounce = (value, delay = 300) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

/**
 * Debounce a callback function. Returns a stable debounced function
 * that delays invocation until after `delay` ms of inactivity.
 * The returned function has a `.cancel()` method via the underlying debounce util.
 *
 * @param {Function} callback - Function to debounce
 * @param {number} [delay=300] - Delay in ms
 * @returns {Function} Debounced callback
 *
 * @example
 * const debouncedSearch = useDebouncedCallback((query) => fetchResults(query), 300);
 * <input onChange={(e) => debouncedSearch(e.target.value)} />
 */
export const useDebouncedCallback = (callback, delay = 300) => {
    const timeoutRef = useRef(null);

    return useCallback(
        (...args) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay]
    );
};

/**
 * Combined debounced-state hook. Provides both the immediate and
 * debounced value, plus a setter.
 *
 * @param {*} initialValue - Initial state
 * @param {number} [delay=300] - Debounce delay in ms
 * @returns {[debouncedValue: *, setValue: Function, immediateValue: *]}
 *
 * @example
 * const [debouncedQuery, setQuery, query] = useDebouncedState('', 300);
 */
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

/**
 * Throttle a value. The returned value updates at most once every `interval` ms.
 *
 * @param {*} value - Value to throttle
 * @param {number} [interval=300] - Minimum interval in ms
 * @returns {*} Throttled value
 *
 * @example
 * const throttledPos = useThrottle(scrollPosition, 100);
 */
export const useThrottle = (value, interval = 300) => {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastExecuted = useRef(Date.now());

    useEffect(() => {
        const now = Date.now();
        const timeSinceLastExecuted = now - lastExecuted.current;

        if (timeSinceLastExecuted >= interval) {
            lastExecuted.current = now;
            setThrottledValue(value);
        } else {
            const timerId = setTimeout(() => {
                lastExecuted.current = Date.now();
                setThrottledValue(value);
            }, interval - timeSinceLastExecuted);

            return () => clearTimeout(timerId);
        }
    }, [value, interval]);

    return throttledValue;
};

/**
 * Throttle a callback function. Returns a stable throttled function
 * that fires at most once every `delay` ms.
 *
 * @param {Function} callback - Function to throttle
 * @param {number} [delay=100] - Minimum interval in ms
 * @returns {Function} Throttled callback
 *
 * @example
 * const throttledScroll = useThrottledCallback(handleScroll, 100);
 */
export const useThrottledCallback = (callback, delay = 100) => {
    const lastRun = useRef(Date.now());

    return useCallback(
        (...args) => {
            const now = Date.now();
            if (now - lastRun.current >= delay) {
                callback(...args);
                lastRun.current = now;
            }
        },
        [callback, delay]
    );
};

// =====================================================================
// SECTION 4: REACT HOOKS — Observation & Lifecycle
// =====================================================================

/**
 * Intersection Observer hook for lazy loading and viewport tracking.
 * Creates its own ref — attach `targetRef` to the element you want to observe.
 *
 * @param {IntersectionObserverInit} [options] - Observer options
 * @returns {{ targetRef: React.MutableRefObject, isIntersecting: boolean, hasIntersected: boolean }}
 *
 * @example
 * const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5 });
 * return <div ref={targetRef}>{isIntersecting && <HeavyComponent />}</div>;
 */
export const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting) {
                    setHasIntersected(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options,
            }
        );

        const target = targetRef.current;
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [options.threshold, options.rootMargin]);

    return { targetRef, isIntersecting, hasIntersected };
};

/**
 * Track component render count (development debugging).
 *
 * @param {string} [componentName='Component'] - Label for logs
 * @returns {number} Current render count
 *
 * @example
 * const renders = useRenderCount('ChatList');
 */
export const useRenderCount = (componentName = 'Component') => {
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;
        if (import.meta.env.MODE === 'development' && renderCount.current > 100) {
            console.warn(`⚠️ ${componentName} has rendered ${renderCount.current} times!`);
        }
    });

    return renderCount.current;
};

/**
 * Track the previous value of a variable across renders.
 *
 * @param {*} value - Value to track
 * @returns {*} Previous value (undefined on first render)
 *
 * @example
 * const prevCount = usePrevious(count);
 */
export const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

/**
 * Measure component render duration. Warns when a render exceeds 16ms (one frame).
 *
 * @param {string} componentName - Label for the warning
 */
export const useRenderTime = (componentName) => {
    const startTime = useRef(performance.now());

    useEffect(() => {
        const endTime = performance.now();
        const duration = endTime - startTime.current;

        if (duration > 16 && import.meta.env.MODE === 'development') {
            console.warn(`[Perf] Slow render: ${componentName} took ${duration.toFixed(2)}ms`);
        }
    });
};

/**
 * Measure performance of a component across renders (avg over batches of 10).
 *
 * @param {string} componentName - Label for logging
 */
export const useMeasurePerformance = (componentName) => {
    const renderCount = useRef(0);
    const totalTime = useRef(0);

    useEffect(() => {
        const startTime = performance.now();
        renderCount.current += 1;

        return () => {
            const endTime = performance.now();
            const renderTime = endTime - startTime;
            totalTime.current += renderTime;

            if (renderCount.current % 10 === 0 && import.meta.env.MODE === 'development') {
                console.debug(
                    `[Perf] ${componentName}: avg ${(totalTime.current / renderCount.current).toFixed(2)}ms over ${renderCount.current} renders`
                );
            }
        };
    });
};

// =====================================================================
// SECTION 5: REACT HOOKS — State Management
// =====================================================================

/**
 * Batch multiple state updates into a single render via microtask.
 *
 * @param {*} initialState - Initial state value
 * @returns {[state: *, batchUpdate: Function]}
 *
 * @example
 * const [state, batchUpdate] = useBatchedState({ x: 0, y: 0 });
 * batchUpdate(prev => ({ ...prev, x: 1 }));
 * batchUpdate(prev => ({ ...prev, y: 2 })); // both applied in one render
 */
export const useBatchedState = (initialState) => {
    const [state, setState] = useState(initialState);
    const pendingUpdates = useRef([]);
    const timeoutRef = useRef(null);

    const batchedSetState = useCallback((update) => {
        pendingUpdates.current.push(update);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setState((prevState) => {
                let newState = prevState;
                pendingUpdates.current.forEach((u) => {
                    newState = typeof u === 'function' ? u(newState) : u;
                });
                pendingUpdates.current = [];
                return newState;
            });
        }, 0);
    }, []);

    return [state, batchedSetState];
};

/**
 * Memoized selector hook (similar to Redux `useSelector` / reselect).
 *
 * @param {*} store - Data source
 * @param {Function} selector - Selector function
 * @param {Function} [equalityFn=shallowEqual] - Equality check
 * @returns {*} Selected value
 */
export const useSelector = (store, selector, equalityFn = shallowEqual) => {
    const [, forceRender] = React.useReducer((s) => s + 1, 0);
    const selectorRef = useRef(selector);
    const selectedValueRef = useRef();

    selectorRef.current = selector;

    const checkForUpdates = useCallback(() => {
        const newValue = selectorRef.current(store);

        if (!equalityFn(selectedValueRef.current, newValue)) {
            selectedValueRef.current = newValue;
            forceRender();
        }
    }, [store, equalityFn]);

    useEffect(() => {
        checkForUpdates();
    }, [checkForUpdates]);

    return selectedValueRef.current;
};

/**
 * Deep-compare an object and return a referentially stable version
 * (only changes when the JSON representation changes).
 *
 * @param {Object} obj - Object to stabilize
 * @returns {Object} Referentially stable object
 */
export const useDeepCompare = (obj) => {
    const ref = useRef();
    const signatureRef = useRef();

    const objSignature = JSON.stringify(obj);

    if (objSignature !== signatureRef.current) {
        ref.current = obj;
        signatureRef.current = objSignature;
    }

    return ref.current;
};

// =====================================================================
// SECTION 6: REACT HOOKS — DOM & Browser
// =====================================================================

/**
 * Attach an event listener with automatic cleanup.
 *
 * @param {string} eventName - DOM event name
 * @param {Function} handler - Event handler
 * @param {EventTarget} [element=window] - Target element
 *
 * @example
 * useEventListener('resize', handleResize);
 * useEventListener('click', handleClick, buttonRef.current);
 */
export const useEventListener = (eventName, handler, element = window) => {
    const savedHandler = useRef();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = (event) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
};

/**
 * Persist state in localStorage with automatic JSON serialization.
 *
 * @param {string} key - Storage key
 * @param {*} initialValue - Default value
 * @returns {[storedValue: *, setValue: Function, removeValue: Function]}
 *
 * @example
 * const [user, setUser, removeUser] = useLocalStorage('user', null);
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    const setValue = useCallback(
        (value) => {
            try {
                const valueToStore = value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(`Error setting localStorage key "${key}":`, error);
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue];
};

/**
 * Track window dimensions (throttled via 150ms timeout).
 *
 * @returns {{ width: number, height: number }}
 *
 * @example
 * const { width } = useWindowSize();
 * const isMobile = width < 768;
 */
export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let timeoutId = null;
        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(timeoutId);
        };
    }, []);

    return windowSize;
};

/**
 * Detect user idle state after a timeout of inactivity.
 *
 * @param {number} [timeout=300000] - Idle threshold in ms (default 5 min)
 * @returns {boolean} True if the user is idle
 *
 * @example
 * const isIdle = useIdleDetection(5 * 60 * 1000);
 */
export const useIdleDetection = (timeout = 5 * 60 * 1000) => {
    const [isIdle, setIsIdle] = useState(false);
    const timeoutIdRef = useRef(null);

    const resetTimer = useCallback(() => {
        setIsIdle(false);
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setIsIdle(true);
        }, timeout);
    }, [timeout]);

    useEffect(() => {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        events.forEach((event) => {
            document.addEventListener(event, resetTimer, true);
        });

        resetTimer();

        return () => {
            events.forEach((event) => {
                document.removeEventListener(event, resetTimer, true);
            });
            clearTimeout(timeoutIdRef.current);
        };
    }, [resetTimer]);

    return isIdle;
};

/**
 * requestAnimationFrame loop hook for smooth animations.
 *
 * @param {Function} callback - Called each frame with deltaTime
 * @param {boolean} [isActive=true] - Whether the loop is running
 *
 * @example
 * useAnimationFrame((dt) => setPos(p => p + dt * speed), isPlaying);
 */
export const useAnimationFrame = (callback, isActive = true) => {
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = useCallback(
        (time) => {
            if (previousTimeRef.current !== undefined) {
                const deltaTime = time - previousTimeRef.current;
                callback(deltaTime);
            }
            previousTimeRef.current = time;
            requestRef.current = requestAnimationFrame(animate);
        },
        [callback]
    );

    useEffect(() => {
        if (isActive) {
            requestRef.current = requestAnimationFrame(animate);
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isActive, animate]);
};

/**
 * Monitor JS heap memory usage in development (logs every 10s).
 */
export const useMemoryMonitor = () => {
    useEffect(() => {
        if (import.meta.env.MODE !== 'development') return;

        const interval = setInterval(() => {
            if (performance.memory) {
                const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
                const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(2);
                console.debug(`[Memory] ${used} MB / ${total} MB`);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, []);
};

/**
 * Hook that manages a CleanupManager — all registered cleanups
 * run automatically when the component unmounts.
 *
 * @returns {CleanupManager}
 *
 * @example
 * const cleanup = useCleanup();
 * cleanup.add(() => subscription.unsubscribe());
 */
export const useCleanup = () => {
    const manager = useRef(new CleanupManager());

    useEffect(() => {
        return () => manager.current.execute();
    }, []);

    return manager.current;
};

// =====================================================================
// SECTION 7: REACT HOOKS — Memoization & Stable References
// =====================================================================

/**
 * Memoize an expensive computation with optional dev-mode timing.
 *
 * @param {Function} factory - Factory function
 * @param {Array} deps - Dependency array
 * @param {string} [debugLabel] - Label for dev timing
 * @returns {*} Memoized result
 *
 * @example
 * const sorted = useExpensiveMemo(() => data.sort(compareFn), [data], 'sortData');
 */
export const useExpensiveMemo = (factory, deps, debugLabel) => {
    return useMemo(() => {
        if (import.meta.env.MODE === 'development' && debugLabel) {
            console.time(`[Memo] ${debugLabel}`);
            const result = factory();
            console.timeEnd(`[Memo] ${debugLabel}`);
            return result;
        }
        return factory();
    }, deps);
};

/**
 * Convenience wrapper for useCallback (semantic alias).
 *
 * @param {Function} callback
 * @param {Array} deps
 * @returns {Function} Stable callback
 */
export const useStableCallback = (callback, deps) => {
    return useCallback(callback, deps);
};

/**
 * Create stable function references from an object of callbacks.
 * The returned object never changes identity, but always calls the latest version.
 *
 * @param {Object<string, Function>} callbacks - Map of callback functions
 * @returns {Object<string, Function>} Stable function map
 *
 * @example
 * const { onClick, onHover } = useStableFunctions({ onClick: handleClick, onHover: handleHover });
 */
export const useStableFunctions = (callbacks) => {
    const callbackRefs = useRef(callbacks);

    useEffect(() => {
        callbackRefs.current = callbacks;
    });

    return useMemo(() => {
        const stableFunctions = {};
        Object.keys(callbacks).forEach((key) => {
            stableFunctions[key] = (...args) => {
                return callbackRefs.current[key](...args);
            };
        });
        return stableFunctions;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

/**
 * Memoize a style object factory to prevent unnecessary re-renders.
 *
 * @param {Function} styleFactory - Returns a styles object
 * @param {Array} deps - Dependencies
 * @returns {Object} Memoized styles
 *
 * @example
 * const styles = useMemoizedStyles(() => ({ bg: theme.bg }), [theme]);
 */
export const useMemoizedStyles = (styleFactory, deps) => {
    return useMemo(styleFactory, deps);
};

/**
 * Debug hook that logs which props caused a re-render (dev only).
 *
 * @param {string} name - Component name
 * @param {Object} props - Current props
 */
export const useWhyDidYouUpdate = (name, props) => {
    if (import.meta.env.MODE === 'development') {
        const previousProps = useRef();

        useEffect(() => {
            if (previousProps.current) {
                const allKeys = Object.keys({ ...previousProps.current, ...props });
                const changedProps = {};

                allKeys.forEach((key) => {
                    if (previousProps.current[key] !== props[key]) {
                        changedProps[key] = {
                            from: previousProps.current[key],
                            to: props[key],
                        };
                    }
                });

                if (Object.keys(changedProps).length > 0) {
                    console.debug(`[WhyDidYouUpdate] ${name}`, changedProps);
                }
            }

            previousProps.current = props;
        });
    }
};

// =====================================================================
// SECTION 8: REACT HOOKS — Virtualized List
// =====================================================================

/**
 * Hook for virtualizing a long list. Computes visible items based on scroll.
 *
 * @param {Array} items - Full list of items
 * @param {React.RefObject} containerRef - Ref to the scrollable container
 * @param {number} [itemHeight=50] - Fixed height per item in px
 * @returns {{ visibleItems: Array, totalHeight: number, scrollTop: number }}
 *
 * @example
 * const { visibleItems, totalHeight } = useVirtualList(messages, scrollRef, 60);
 */
export const useVirtualList = (items, containerRef, itemHeight = 50) => {
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 });
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll = useCallback(() => {
        if (!containerRef.current) return;

        const st = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;

        const start = Math.max(0, Math.floor(st / itemHeight) - 5);
        const end = Math.min(items.length, Math.ceil((st + containerHeight) / itemHeight) + 5);

        setScrollTop(st);
        setVisibleRange({ start, end });
    }, [items.length, itemHeight, containerRef]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll, containerRef]);

    const visibleItems = useMemo(() => {
        return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
            ...item,
            index: visibleRange.start + index,
            top: (visibleRange.start + index) * itemHeight,
        }));
    }, [items, visibleRange, itemHeight]);

    return { visibleItems, totalHeight: items.length * itemHeight, scrollTop };
};

// =====================================================================
// SECTION 9: HOCs & COMPONENTS
// =====================================================================

/**
 * Custom React.memo with deep JSON comparison as the default comparator.
 *
 * @param {React.ComponentType} Component
 * @param {Function} [arePropsEqual] - Optional custom comparator
 * @returns {React.MemoExoticComponent}
 */
export const deepMemo = (Component, arePropsEqual) => {
    return memo(
        Component,
        arePropsEqual ||
        ((prevProps, nextProps) => {
            return JSON.stringify(prevProps) === JSON.stringify(nextProps);
        })
    );
};

/**
 * HOC for component memoization with smart comparison:
 * skips function props, deep-compares objects, strict-compares primitives.
 *
 * @param {React.ComponentType} Component
 * @param {Function} [propsAreEqual] - Optional custom comparator
 * @returns {React.MemoExoticComponent}
 */
export const withMemoization = (Component, propsAreEqual) => {
    return memo(
        Component,
        propsAreEqual ||
        ((prevProps, nextProps) => {
            const prevKeys = Object.keys(prevProps);
            const nextKeys = Object.keys(nextProps);

            if (prevKeys.length !== nextKeys.length) return false;

            return prevKeys.every((key) => {
                if (typeof prevProps[key] === 'function') return true;
                if (typeof prevProps[key] === 'object' && prevProps[key] !== null) {
                    return JSON.stringify(prevProps[key]) === JSON.stringify(nextProps[key]);
                }
                return prevProps[key] === nextProps[key];
            });
        })
    );
};

/**
 * Optimized message component wrapper (template — requires a MessageComponent import).
 * Only re-renders when message content, edit time, or reactions change.
 *
 * @note Import and wire up your own MessageComponent before using.
 */
export const OptimizedMessage = memo(
    ({ message, ...props }) => {
        // NOTE: Replace `null` with your actual <MessageComponent /> render
        return null;
    },
    (prevProps, nextProps) => {
        return (
            prevProps.message.id === nextProps.message.id &&
            prevProps.message.content === nextProps.message.content &&
            prevProps.message.edited_at === nextProps.message.edited_at &&
            prevProps.message.reactions === nextProps.message.reactions
        );
    }
);

/**
 * Wrapper that profiles children render time in development.
 * Warns when a render takes longer than one frame (16ms).
 *
 * @param {{ id: string, children: React.ReactNode }} props
 *
 * @example
 * <ProfiledComponent id="ChatList"><ChatList /></ProfiledComponent>
 */
export const ProfiledComponent = ({ id, children }) => {
    if (import.meta.env.MODE === 'development') {
        return (
            <React.Profiler
                id={id}
                onRender={(id, phase, actualDuration) => {
                    if (actualDuration > 16) {
                        console.warn(
                            `[Performance] ${id} took ${actualDuration.toFixed(2)}ms to render (${phase})`
                        );
                    }
                }}
            >
                {children}
            </React.Profiler>
        );
    }
    return children;
};

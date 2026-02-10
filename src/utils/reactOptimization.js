// ⚡ REACT OPTIMIZATION HOOKS
// Custom hooks for automatic performance optimization

import { useCallback, useMemo, useRef, useEffect, memo } from 'react';

/**
 * Smart useCallback that only updates when dependencies actually change
 * @param {Function} callback - Function to memoize
 * @param {Array} deps - Dependencies
 */
export function useStableCallback(callback, deps = []) {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return useCallback((...args) => {
        return callbackRef.current(...args);
    }, deps);
}

/**
 * Debounced value hook
 * @param {any} value - Value to debounce
 * @param {number} delay - Delay in ms
 */
export function useDebouncedValue(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Throttled value hook
 * @param {any} value - Value to throttle
 * @param {number} limit - Time limit in ms
 */
export function useThrottledValue(value, limit = 500) {
    const [throttledValue, setThrottledValue] = React.useState(value);
    const lastRan = useRef(Date.now());

    useEffect(() => {
        const handler = setTimeout(() => {
            if (Date.now() - lastRan.current >= limit) {
                setThrottledValue(value);
                lastRan.current = Date.now();
            }
        }, limit - (Date.now() - lastRan.current));

        return () => clearTimeout(handler);
    }, [value, limit]);

    return throttledValue;
}

/**
 * Intersection Observer hook for lazy rendering
 * @param {Object} options - IntersectionObserver options
 */
export function useInView(options = {}) {
    const [isInView, setIsInView] = React.useState(false);
    const [hasBeenInView, setHasBeenInView] = React.useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (entry.isIntersecting) {
                    setHasBeenInView(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options,
            }
        );

        observer.observe(ref.current);

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return { ref, isInView, hasBeenInView };
}

/**
 * Memoized selector hook (like reselect)
 * @param {Function} selector - Selector function
 * @param {Array} deps - Dependencies
 */
export function useMemoizedSelector(selector, deps = []) {
    return useMemo(() => selector(), deps);
}

/**
 * Previous value hook
 * @param {any} value - Current value
 */
export function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}

/**
 * Deep comparison memo
 * @param {any} value - Value to memoize
 */
export function useDeepMemo(value) {
    const ref = useRef();

    if (!deepEqual(ref.current, value)) {
        ref.current = value;
    }

    return ref.current;
}

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' ||
        obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

/**
 * Render counter for debugging
 * @param {string} componentName - Component name
 */
export function useRenderCount(componentName) {
    const renderCount = useRef(0);

    useEffect(() => {
        renderCount.current += 1;
        if (import.meta.env.MODE === 'development') {
        }
    });

    return renderCount.current;
}

/**
 * Automatic memo based on props
 * @param {Component} Component - Component to wrap
 * @param {Function} propsAreEqual - Custom comparison
 */
export function autoMemo(Component, propsAreEqual) {
    return memo(Component, propsAreEqual);
}

/**
 * Batch state updates
 * @param {Object} initialState - Initial state
 */
export function useBatchedState(initialState = {}) {
    const [state, setState] = React.useState(initialState);
    const updateQueue = useRef([]);
    const timeoutRef = useRef(null);

    const batchUpdate = useCallback((updates) => {
        updateQueue.current.push(updates);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setState(prevState => {
                const newState = { ...prevState };
                updateQueue.current.forEach(update => {
                    Object.assign(newState, update);
                });
                updateQueue.current = [];
                return newState;
            });
        }, 16); // Batch for one frame (16ms)
    }, []);

    return [state, batchUpdate];
}

/**
 * Optimized event handler
 * @param {Function} handler - Event handler
 * @param {Array} deps - Dependencies
 */
export function useOptimizedHandler(handler, deps = []) {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    return useCallback(
        (...args) => savedHandler.current(...args),
        deps
    );
}

export default {
    useStableCallback,
    useDebouncedValue,
    useThrottledValue,
    useInView,
    useMemoizedSelector,
    usePrevious,
    useDeepMemo,
    useRenderCount,
    autoMemo,
    useBatchedState,
    useOptimizedHandler,
};

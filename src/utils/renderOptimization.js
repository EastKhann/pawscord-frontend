// frontend/src/utils/renderOptimization.js

import React from 'react';

// 🔥 React Render Optimization Utilities

/**
 * Custom memo with deep comparison for props
 */
export const deepMemo = (Component, arePropsEqual) => {
    return React.memo(Component, arePropsEqual || ((prevProps, nextProps) => {
        return JSON.stringify(prevProps) === JSON.stringify(nextProps);
    }));
};

/**
 * Optimized message component wrapper
 */
export const OptimizedMessage = React.memo(
    ({ message, ...props }) => {
        return <MessageComponent message={message} {...props} />;
    },
    (prevProps, nextProps) => {
        // Only re-render if message content changed
        return (
            prevProps.message.id === nextProps.message.id &&
            prevProps.message.content === nextProps.message.content &&
            prevProps.message.edited_at === nextProps.message.edited_at &&
            prevProps.message.reactions === nextProps.message.reactions
        );
    }
);

/**
 * Prevent unnecessary re-renders for list items
 */
export const useStableFunctions = (callbacks) => {
    const callbackRefs = React.useRef(callbacks);

    // Update refs without causing re-render
    React.useEffect(() => {
        callbackRefs.current = callbacks;
    });

    // Return stable function references
    return React.useMemo(() => {
        const stableFunctions = {};
        Object.keys(callbacks).forEach(key => {
            stableFunctions[key] = (...args) => {
                return callbackRefs.current[key](...args);
            };
        });
        return stableFunctions;
    }, []);
};

/**
 * Virtualized list hook
 */
export const useVirtualList = (items, containerRef, itemHeight = 50) => {
    const [visibleRange, setVisibleRange] = React.useState({ start: 0, end: 20 });
    const [scrollTop, setScrollTop] = React.useState(0);

    const handleScroll = React.useCallback(() => {
        if (!containerRef.current) return;

        const scrollTop = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;

        const start = Math.max(0, Math.floor(scrollTop / itemHeight) - 5);
        const end = Math.min(
            items.length,
            Math.ceil((scrollTop + containerHeight) / itemHeight) + 5
        );

        setScrollTop(scrollTop);
        setVisibleRange({ start, end });
    }, [items.length, itemHeight]);

    React.useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial calculation

        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const visibleItems = React.useMemo(() => {
        return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
            ...item,
            index: visibleRange.start + index,
            top: (visibleRange.start + index) * itemHeight
        }));
    }, [items, visibleRange, itemHeight]);

    return {
        visibleItems,
        totalHeight: items.length * itemHeight,
        scrollTop
    };
};

/**
 * Debounced state hook
 */
export const useDebouncedState = (initialValue, delay = 300) => {
    const [value, setValue] = React.useState(initialValue);
    const [debouncedValue, setDebouncedValue] = React.useState(initialValue);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value, delay]);

    return [debouncedValue, setValue, value];
};

/**
 * Throttled callback hook
 */
export const useThrottledCallback = (callback, delay = 100) => {
    const lastRun = React.useRef(Date.now());

    return React.useCallback((...args) => {
        const now = Date.now();
        if (now - lastRun.current >= delay) {
            callback(...args);
            lastRun.current = now;
        }
    }, [callback, delay]);
};

/**
 * Intersection observer hook for lazy loading
 */
export const useIntersectionObserver = (ref, options = {}) => {
    const [isIntersecting, setIsIntersecting] = React.useState(false);
    const [hasIntersected, setHasIntersected] = React.useState(false);

    React.useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
            if (entry.isIntersecting) {
                setHasIntersected(true);
            }
        }, options);

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref, options]);

    return { isIntersecting, hasIntersected };
};

/**
 * Prevent re-renders when props are shallow equal
 */
export const shallowEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) return false;
    }

    return true;
};

/**
 * Batch state updates
 */
export const useBatchedState = (initialState) => {
    const [state, setState] = React.useState(initialState);
    const batchedUpdates = React.useRef([]);
    const timeoutRef = React.useRef(null);

    const batchUpdate = React.useCallback((update) => {
        batchedUpdates.current.push(update);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setState(prevState => {
                let newState = prevState;
                batchedUpdates.current.forEach(update => {
                    newState = typeof update === 'function' ? update(newState) : update;
                });
                batchedUpdates.current = [];
                return newState;
            });
        }, 0);
    }, []);

    return [state, batchUpdate];
};

/**
 * Memoized selector hook (like Redux reselect)
 */
export const useSelector = (store, selector, equalityFn = shallowEqual) => {
    const [, forceRender] = React.useReducer(s => s + 1, 0);
    const selectorRef = React.useRef(selector);
    const selectedValueRef = React.useRef();

    selectorRef.current = selector;

    const checkForUpdates = React.useCallback(() => {
        const newValue = selectorRef.current(store);

        if (!equalityFn(selectedValueRef.current, newValue)) {
            selectedValueRef.current = newValue;
            forceRender();
        }
    }, [store, equalityFn]);

    React.useEffect(() => {
        checkForUpdates();
    }, [checkForUpdates]);

    return selectedValueRef.current;
};

export default {
    deepMemo,
    OptimizedMessage,
    useStableFunctions,
    useVirtualList,
    useDebouncedState,
    useThrottledCallback,
    useIntersectionObserver,
    shallowEqual,
    useBatchedState,
    useSelector
};




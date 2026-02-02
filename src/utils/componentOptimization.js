// ⚡ COMPONENT OPTIMIZATION WRAPPERS
// HOCs and utilities for optimizing React components

import React, { memo, forwardRef, useCallback, useMemo, useRef, useEffect } from 'react';

// =====================================
// 🎯 SMART MEMO: Deep comparison memo
// =====================================

// Custom comparison function for memo
const deepCompare = (prevProps, nextProps) => {
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);

    if (prevKeys.length !== nextKeys.length) return false;

    for (const key of prevKeys) {
        const prevVal = prevProps[key];
        const nextVal = nextProps[key];

        // Skip function comparison (they change on every render)
        if (typeof prevVal === 'function' && typeof nextVal === 'function') {
            continue;
        }

        // Deep compare objects
        if (typeof prevVal === 'object' && typeof nextVal === 'object') {
            if (JSON.stringify(prevVal) !== JSON.stringify(nextVal)) {
                return false;
            }
            continue;
        }

        if (prevVal !== nextVal) return false;
    }

    return true;
};

// Smart memo HOC
export const smartMemo = (Component, options = {}) => {
    const {
        displayName,
        compareProps = deepCompare,
        debug = false
    } = options;

    const MemoizedComponent = memo(Component, (prev, next) => {
        const areEqual = compareProps(prev, next);

        if (debug && !areEqual) {
            console.log(`[SmartMemo] ${displayName || Component.name} re-rendering`);
        }

        return areEqual;
    });

    MemoizedComponent.displayName = displayName || `SmartMemo(${Component.displayName || Component.name})`;

    return MemoizedComponent;
};

// =====================================
// 🚀 LAZY COMPONENT: With preload support
// =====================================

export const lazyWithPreload = (factory) => {
    const Component = React.lazy(factory);

    // Add preload method
    Component.preload = factory;

    return Component;
};

// =====================================
// 🔄 RENDER OPTIMIZATION WRAPPERS
// =====================================

// Prevent unnecessary re-renders from parent
export const withStableProps = (Component, stableKeys = []) => {
    return memo(forwardRef((props, ref) => {
        const stablePropsRef = useRef({});

        // Only update stable props if they actually changed
        stableKeys.forEach(key => {
            if (props[key] !== undefined) {
                const prev = stablePropsRef.current[key];
                const next = props[key];

                if (typeof prev === 'object' && typeof next === 'object') {
                    if (JSON.stringify(prev) !== JSON.stringify(next)) {
                        stablePropsRef.current[key] = next;
                    }
                } else if (prev !== next) {
                    stablePropsRef.current[key] = next;
                }
            }
        });

        const mergedProps = {
            ...props,
            ...stablePropsRef.current,
            ref
        };

        return <Component {...mergedProps} />;
    }));
};

// =====================================
// 📊 RENDER TRACKER: Debug helper
// =====================================

export const withRenderTracker = (Component, componentName) => {
    if (import.meta.env.MODE !== 'development') {
        return Component;
    }

    return (props) => {
        const renderCount = useRef(0);
        const prevProps = useRef(props);

        useEffect(() => {
            renderCount.current += 1;

            // Find changed props
            const changedProps = [];
            Object.keys(props).forEach(key => {
                if (prevProps.current[key] !== props[key]) {
                    changedProps.push(key);
                }
            });

            if (changedProps.length > 0) {
                console.log(
                    `[Render #${renderCount.current}] ${componentName}`,
                    'Changed:', changedProps
                );
            }

            prevProps.current = props;
        });

        return <Component {...props} />;
    };
};

// =====================================
// 🎯 EVENT HANDLER OPTIMIZATION
// =====================================

// Stable event handler hook
export const useStableCallback = (callback, deps = []) => {
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return useCallback((...args) => {
        return callbackRef.current?.(...args);
    }, deps);
};

// Event delegation helper
export const useEventDelegation = (containerRef, eventType, selector, handler) => {
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const delegatedHandler = (event) => {
            const target = event.target.closest(selector);
            if (target && container.contains(target)) {
                handler(event, target);
            }
        };

        container.addEventListener(eventType, delegatedHandler);
        return () => container.removeEventListener(eventType, delegatedHandler);
    }, [containerRef, eventType, selector, handler]);
};

// =====================================
// 🔧 COMPUTED VALUES
// =====================================

// Computed value with automatic dependency tracking
export const useComputed = (computeFn, deps) => {
    return useMemo(computeFn, deps);
};

// Derived state from props
export const useDerivedState = (props, deriveState) => {
    const [state, setState] = React.useState(() => deriveState(props));
    const prevPropsRef = useRef(props);

    if (props !== prevPropsRef.current) {
        const newState = deriveState(props);
        if (JSON.stringify(newState) !== JSON.stringify(state)) {
            setState(newState);
        }
        prevPropsRef.current = props;
    }

    return state;
};

// =====================================
// 🎨 LIST OPTIMIZATION
// =====================================

// Optimized list item wrapper
export const ListItem = memo(({ item, renderItem, index }) => {
    return renderItem(item, index);
}, (prev, next) => {
    return prev.item === next.item && prev.index === next.index;
});

// Keyed list renderer
export const KeyedList = memo(({ items, renderItem, keyExtractor, emptyComponent }) => {
    if (!items || items.length === 0) {
        return emptyComponent || null;
    }

    return items.map((item, index) => (
        <ListItem
            key={keyExtractor ? keyExtractor(item, index) : index}
            item={item}
            index={index}
            renderItem={renderItem}
        />
    ));
});

// =====================================
// 🔄 BATCH UPDATES
// =====================================

// Batch multiple state updates
export const useBatchedUpdates = () => {
    const updatesRef = useRef([]);
    const timeoutRef = useRef(null);
    const [, forceUpdate] = React.useState({});

    const batchUpdate = useCallback((updateFn) => {
        updatesRef.current.push(updateFn);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            const updates = updatesRef.current;
            updatesRef.current = [];

            React.unstable_batchedUpdates(() => {
                updates.forEach(fn => fn());
            });

            forceUpdate({});
        }, 0);
    }, []);

    return batchUpdate;
};

export default {
    smartMemo,
    lazyWithPreload,
    withStableProps,
    withRenderTracker,
    useStableCallback,
    useEventDelegation,
    useComputed,
    useDerivedState,
    ListItem,
    KeyedList,
    useBatchedUpdates
};

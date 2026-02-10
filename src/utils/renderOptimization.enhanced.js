// frontend/src/utils/renderOptimization.enhanced.js
// 🚀 Advanced Render Optimization - React.memo & useMemo strategies

import React, { memo, useMemo, useCallback } from 'react';

/**
 * HOC for component memoization with custom comparison
 */
export const withMemoization = (Component, propsAreEqual) => {
  return memo(Component, propsAreEqual || ((prevProps, nextProps) => {
    // Default: shallow comparison of all props
    const prevKeys = Object.keys(prevProps);
    const nextKeys = Object.keys(nextProps);

    if (prevKeys.length !== nextKeys.length) return false;

    return prevKeys.every(key => {
      // Skip function props (always different reference)
      if (typeof prevProps[key] === 'function') return true;

      // Deep comparison for objects/arrays
      if (typeof prevProps[key] === 'object' && prevProps[key] !== null) {
        return JSON.stringify(prevProps[key]) === JSON.stringify(nextProps[key]);
      }

      return prevProps[key] === nextProps[key];
    });
  }));
};

/**
 * Custom hook for expensive computations
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
 * Custom hook for stable callbacks
 */
export const useStableCallback = (callback, deps) => {
  return useCallback(callback, deps);
};

/**
 * Hook to detect unnecessary re-renders
 */
export const useWhyDidYouUpdate = (name, props) => {
  if (import.meta.env.MODE === 'development') {
    const previousProps = React.useRef();

    React.useEffect(() => {
      if (previousProps.current) {
        const allKeys = Object.keys({ ...previousProps.current, ...props });
        const changedProps = {};

        allKeys.forEach(key => {
          if (previousProps.current[key] !== props[key]) {
            changedProps[key] = {
              from: previousProps.current[key],
              to: props[key]
            };
          }
        });

        if (Object.keys(changedProps).length > 0) {
        }
      }

      previousProps.current = props;
    });
  }
};

/**
 * Virtualization helper for long lists
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
      offsetY: start * this.itemHeight
    };
  }
}

/**
 * Debounce hook for performance
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Throttle hook for performance
 */
export const useThrottle = (value, interval = 300) => {
  const [throttledValue, setThrottledValue] = React.useState(value);
  const lastExecuted = React.useRef(Date.now());

  React.useEffect(() => {
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
 * Intersection Observer hook for lazy loading
 */
export const useIntersectionObserver = (
  ref,
  options = { threshold: 0.1, rootMargin: '0px' }
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isIntersecting;
};

/**
 * Render counter for debugging
 */
export const useRenderCount = (componentName) => {
  const renders = React.useRef(0);

  React.useEffect(() => {
    renders.current += 1;
  });

  if (import.meta.env.MODE === 'development') {
  }

  return renders.current;
};

/**
 * Performance profiler
 */
export const ProfiledComponent = ({ id, children }) => {
  if (import.meta.env.MODE === 'development') {
    return (
      <React.Profiler
        id={id}
        onRender={(id, phase, actualDuration) => {
          if (actualDuration > 16) { // Longer than 1 frame
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

/**
 * Batch state updates
 */
export const useBatchedState = (initialState) => {
  const [state, setState] = React.useState(initialState);
  const pendingUpdates = React.useRef([]);
  const timeoutRef = React.useRef(null);

  const batchedSetState = useCallback((update) => {
    pendingUpdates.current.push(update);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setState(prevState => {
        let newState = prevState;
        pendingUpdates.current.forEach(update => {
          newState = typeof update === 'function' ? update(newState) : update;
        });
        pendingUpdates.current = [];
        return newState;
      });
    }, 0);
  }, []);

  return [state, batchedSetState];
};

export default {
  withMemoization,
  useExpensiveMemo,
  useStableCallback,
  useWhyDidYouUpdate,
  VirtualList,
  useDebounce,
  useThrottle,
  useIntersectionObserver,
  useRenderCount,
  ProfiledComponent,
  useBatchedState
};



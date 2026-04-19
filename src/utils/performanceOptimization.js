/* eslint-disable no-duplicate-imports */
/**
 * @file performanceOptimization.js — Legacy re-export
 * All implementations now live in ./performanceHooks.js
 *
 * NOTE: This file originally exported callback-based useDebounce / useThrottle.
 * They are re-exported here under their original names for backward compatibility
 * (mapped from useDebouncedCallback / useThrottledCallback in the canonical file).
 */
export { useDebouncedCallback as useDebounce } from './performanceHooks';
export { useThrottledCallback as useThrottle } from './performanceHooks';

export {
    useIntersectionObserver,
    chunkArray,
    useEventListener,
    useLocalStorage,
    useAnimationFrame,
    useMeasurePerformance,
    usePrevious,
    useWindowSize,
    useIdleDetection,
    useMemoryMonitor,
    useMemoizedStyles,
    useDeepCompare,
} from './performanceHooks';

import { useDebouncedCallback, useThrottledCallback } from './performanceHooks';
import {
    useIntersectionObserver,
    chunkArray,
    useEventListener,
    useLocalStorage,
    useAnimationFrame,
    useMeasurePerformance,
    usePrevious,
    useWindowSize,
    useIdleDetection,
    useMemoryMonitor,
    useMemoizedStyles,
    useDeepCompare,
} from './performanceHooks';

export default {
    useDebounce: useDebouncedCallback,
    useThrottle: useThrottledCallback,
    useIntersectionObserver,
    chunkArray,
    useEventListener,
    useLocalStorage,
    useAnimationFrame,
    useMeasurePerformance,
    usePrevious,
    useWindowSize,
    useIdleDetection,
    useMemoryMonitor,
    useMemoizedStyles,
    useDeepCompare,
};

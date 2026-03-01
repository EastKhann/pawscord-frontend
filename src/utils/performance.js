/**
 * @file performance.js — Legacy re-export
 * All implementations now live in ./performanceHooks.js
 */
export {
  measurePerformance,
  measurePerformanceAsync,
  useRenderCount,
  reportWebVitals,
  performanceMonitor,
  logNetworkTiming,
  logMemoryUsage,
} from './performanceHooks';

import {
  measurePerformance,
  measurePerformanceAsync,
  useRenderCount,
  reportWebVitals,
  performanceMonitor,
  logNetworkTiming,
  logMemoryUsage,
} from './performanceHooks';

export default {
  measurePerformance,
  measurePerformanceAsync,
  reportWebVitals,
  performanceMonitor,
  logNetworkTiming,
  logMemoryUsage,
};




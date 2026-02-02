// utils/performance.js
// 📊 Performance Monitoring Utilities

/**
 * Fonksiyon performansını ölç
 */
export const measurePerformance = (metricName, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;

  if (duration > 100) {
    console.warn(`⚠️ Slow operation: ${metricName} took ${duration.toFixed(2)}ms`);
  } else if (duration > 16) {
    console.log(`ℹ️ ${metricName}: ${duration.toFixed(2)}ms`);
  }

  // Performance API'ye kaydet
  if (typeof performance.mark === 'function') {
    performance.mark(`${metricName}-end`);
    performance.measure(metricName, `${metricName}-start`, `${metricName}-end`);
  }

  return result;
};

/**
 * Async fonksiyon performansını ölç
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
 * Component render sayısını say
 */
export const useRenderCount = (componentName) => {
  const renderCount = React.useRef(0);

  React.useEffect(() => {
    renderCount.current += 1;

    if (renderCount.current > 100) {
      console.warn(`⚠️ ${componentName} has rendered ${renderCount.current} times!`);
    }
  });

  return renderCount.current;
};

/**
 * Web Vitals metrikleri
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
 * API call tracking
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }

  startMeasure(name) {
    this.metrics.set(name, {
      start: performance.now(),
      name
    });
  }

  endMeasure(name) {
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`No metric found for: ${name}`);
      return null;
    }

    const duration = performance.now() - metric.start;
    this.metrics.delete(name);

    return {
      name,
      duration,
      timestamp: new Date().toISOString()
    };
  }

  logMetric(name) {
    const result = this.endMeasure(name);
    if (result) {
      console.log(`📊 ${result.name}: ${result.duration.toFixed(2)}ms`);
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

/**
 * Network timing
 */
export const logNetworkTiming = (url) => {
  if (!performance.getEntriesByName) return;

  const entries = performance.getEntriesByName(url);
  if (entries.length > 0) {
    const entry = entries[entries.length - 1];
    console.log(`🌐 Network timing for ${url}:`, {
      DNS: entry.domainLookupEnd - entry.domainLookupStart,
      TCP: entry.connectEnd - entry.connectStart,
      Request: entry.responseStart - entry.requestStart,
      Response: entry.responseEnd - entry.responseStart,
      Total: entry.responseEnd - entry.requestStart
    });
  }
};

/**
 * Memory usage
 */
export const logMemoryUsage = () => {
  if (performance.memory) {
    const usage = performance.memory;
    console.log('💾 Memory usage:', {
      used: `${(usage.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      total: `${(usage.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
      limit: `${(usage.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
      percentage: `${((usage.usedJSHeapSize / usage.jsHeapSizeLimit) * 100).toFixed(2)}%`
    });
  }
};

export default {
  measurePerformance,
  measurePerformanceAsync,
  reportWebVitals,
  performanceMonitor,
  logNetworkTiming,
  logMemoryUsage
};




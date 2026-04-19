/**
 * Frontend performance monitoring and Web Vitals tracking.
 * Reports Core Web Vitals (LCP, FID, CLS, TTFB, INP) to backend analytics.
 */

const ANALYTICS_ENDPOINT = '/api/analytics/web-vitals/';
const BATCH_INTERVAL = 10000; // Batch reports every 10s
const metrics = [];

/**
 * Initialize Web Vitals monitoring.
 * Call once in main.jsx/App.jsx after mount.
 */
export function initPerformanceMonitoring() {
    if (typeof window === 'undefined') return;

    // Core Web Vitals via PerformanceObserver
    try {
        // Largest Contentful Paint (LCP)
        observeMetric('largest-contentful-paint', (entries) => {
            const lcp = entries[entries.length - 1];
            reportMetric('LCP', lcp.startTime);
        });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        observeMetric('layout-shift', (entries) => {
            for (const entry of entries) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            reportMetric('CLS', clsValue);
        });

        // First Input Delay (FID) / Interaction to Next Paint (INP)
        observeMetric('first-input', (entries) => {
            const fid = entries[0];
            reportMetric('FID', fid.processingStart - fid.startTime);
        });

        // Time to First Byte (TTFB)
        observeMetric('navigation', (entries) => {
            const nav = entries[0];
            reportMetric('TTFB', nav.responseStart - nav.requestStart);
            reportMetric('DOM_LOAD', nav.domContentLoadedEventEnd - nav.startTime);
            reportMetric('FULL_LOAD', nav.loadEventEnd - nav.startTime);
        });

        // Long Tasks (>50ms)
        observeMetric('longtask', (entries) => {
            for (const entry of entries) {
                if (entry.duration > 100) {
                    reportMetric('LONG_TASK', entry.duration, {
                        name: entry.name,
                        startTime: entry.startTime,
                    });
                }
            }
        });
    } catch {
        // PerformanceObserver not supported
    }

    // Resource loading performance
    window.addEventListener('load', () => {
        setTimeout(() => {
            const resources = performance.getEntriesByType('resource');
            const slowResources = resources
                .filter((r) => r.duration > 500)
                .map((r) => ({
                    name: r.name.split('/').pop(),
                    duration: Math.round(r.duration),
                    size: r.transferSize,
                    type: r.initiatorType,
                }));

            if (slowResources.length > 0) {
                reportMetric('SLOW_RESOURCES', slowResources.length, {
                    resources: slowResources.slice(0, 5),
                });
            }
        }, 3000);
    });

    // Memory usage (Chrome only)
    if (performance.memory) {
        setInterval(() => {
            const { usedJSHeapSize, totalJSHeapSize } = performance.memory;
            const usageMB = Math.round(usedJSHeapSize / 1024 / 1024);
            const totalMB = Math.round(totalJSHeapSize / 1024 / 1024);
            if (usageMB > 200) {
                reportMetric('HIGH_MEMORY', usageMB, { total: totalMB });
            }
        }, 30000);
    }

    // Batch send metrics
    setInterval(flushMetrics, BATCH_INTERVAL);
    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            flushMetrics();
        }
    });
}

function observeMetric(type, callback) {
    try {
        const observer = new PerformanceObserver((list) => {
            callback(list.getEntries());
        });
        observer.observe({ type, buffered: true });
    } catch {
        // Observer type not supported
    }
}

function reportMetric(name, value, meta = {}) {
    metrics.push({
        name,
        value: typeof value === 'number' ? Math.round(value * 100) / 100 : value,
        timestamp: Date.now(),
        url: window.location.pathname,
        ...meta,
    });
}

function flushMetrics() {
    if (metrics.length === 0) return;

    const batch = metrics.splice(0, metrics.length);

    // Use sendBeacon for reliability (works even during page unload)
    if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify({ metrics: batch })], {
            type: 'application/json',
        });
        navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
    } else {
        fetch(ANALYTICS_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ metrics: batch }),
            keepalive: true,
        }).catch(() => {});
    }
}

/**
 * React component performance tracker.
 * Wrap slow components to measure render time.
 *
 * Usage:
 *   <Profiler id="ChatList" onRender={trackRender}>
 *     <ChatList />
 *   </Profiler>
 */
export function trackRender(id, phase, actualDuration, baseDuration) {
    if (actualDuration > 16) {
        // More than 1 frame (60fps)
        reportMetric('SLOW_RENDER', actualDuration, {
            component: id,
            phase,
            baseDuration: Math.round(baseDuration),
        });
    }
}

/**
 * Track route change performance.
 * Call on each route change in router.
 */
export function trackRouteChange(from, to) {
    const start = performance.now();
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const duration = performance.now() - start;
            reportMetric('ROUTE_CHANGE', duration, { from, to });
        });
    });
}

export default { initPerformanceMonitoring, trackRender, trackRouteChange };

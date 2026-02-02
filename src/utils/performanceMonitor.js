// frontend/src/utils/performanceMonitor.js

/**
 * 📊 Performance Monitor
 * React component rendering performansını izler
 * Development modda detaylı log, production'da minimal overhead
 */

class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.isEnabled = import.meta.env.MODE === 'development';
    }

    /**
     * Component render süresini ölç
     * @param {string} componentName - Component adı
     * @param {Function} callback - Render fonksiyonu
     * @returns {any} Callback sonucu
     */
    measureRender(componentName, callback) {
        if (!this.isEnabled) return callback();

        const startTime = performance.now();
        const result = callback();
        const endTime = performance.now();
        const duration = endTime - startTime;

        this.recordMetric(componentName, duration);

        // Yavaş render uyarısı (16ms = 60fps threshold)
        if (duration > 16) {
            console.warn(`⚠️ [Perf] ${componentName} yavaş render: ${duration.toFixed(2)}ms`);
        }

        return result;
    }

    /**
     * Metrik kaydet
     */
    recordMetric(componentName, duration) {
        if (!this.metrics.has(componentName)) {
            this.metrics.set(componentName, {
                count: 0,
                total: 0,
                min: Infinity,
                max: -Infinity,
                avg: 0
            });
        }

        const metric = this.metrics.get(componentName);
        metric.count++;
        metric.total += duration;
        metric.min = Math.min(metric.min, duration);
        metric.max = Math.max(metric.max, duration);
        metric.avg = metric.total / metric.count;
    }

    /**
     * Tüm metrikleri göster
     */
    showMetrics() {
        if (!this.isEnabled) return;

        console.group('📊 Performance Metrics');

        // En yavaş componentler
        const sorted = Array.from(this.metrics.entries())
            .sort((a, b) => b[1].avg - a[1].avg)
            .slice(0, 10);

        console.table(
            sorted.map(([name, metric]) => ({
                Component: name,
                'Avg (ms)': metric.avg.toFixed(2),
                'Min (ms)': metric.min.toFixed(2),
                'Max (ms)': metric.max.toFixed(2),
                'Renders': metric.count
            }))
        );

        console.groupEnd();
    }

    /**
     * Metrikleri sıfırla
     */
    reset() {
        this.metrics.clear();
    }
}

// Global instance
export const perfMonitor = new PerformanceMonitor();

/**
 * React Hook: useMemo wrapper with performance tracking
 */
export const useTrackedMemo = (factory, deps, name = 'Anonymous') => {
    const startTime = performance.now();
    const value = React.useMemo(() => {
        const computeStart = performance.now();
        const result = factory();
        const computeEnd = performance.now();

        const duration = computeEnd - computeStart;
        if (duration > 5 && import.meta.env.MODE === 'development') {
            console.warn(`⚠️ [useMemo] ${name} computation: ${duration.toFixed(2)}ms`);
        }

        return result;
    }, deps);

    return value;
};

/**
 * React Hook: useCallback wrapper with performance tracking
 */
export const useTrackedCallback = (callback, deps, name = 'Anonymous') => {
    return React.useCallback((...args) => {
        const start = performance.now();
        const result = callback(...args);
        const end = performance.now();

        const duration = end - start;
        if (duration > 5 && import.meta.env.MODE === 'development') {
            console.warn(`⚠️ [useCallback] ${name} execution: ${duration.toFixed(2)}ms`);
        }

        return result;
    }, deps);
};

/**
 * Component wrapper - render performance tracking
 */
export const withPerformanceTracking = (Component, name) => {
    if (import.meta.env.MODE !== 'development') {
        return Component;
    }

    return React.forwardRef((props, ref) => {
        const renderCount = React.useRef(0);
        renderCount.current++;

        React.useEffect(() => {
            console.log(`🔄 [Render] ${name || Component.name} mounted (render #${renderCount.current})`);
            return () => {
                console.log(`🗑️ [Unmount] ${name || Component.name}`);
            };
        }, []);

        return perfMonitor.measureRender(
            name || Component.name,
            () => <Component {...props} ref={ref} />
        );
    });
};

/**
 * Web Vitals monitoring (Core Web Vitals)
 */
export const monitorWebVitals = () => {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    try {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('📊 [LCP] Largest Contentful Paint:', lastEntry.renderTime || lastEntry.loadTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // Ignore if not supported
    }

    // First Input Delay (FID)
    try {
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                const delay = entry.processingStart - entry.startTime;
                console.log('📊 [FID] First Input Delay:', delay);
            });
        });
        observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
        // Ignore
    }

    // Cumulative Layout Shift (CLS)
    try {
        let clsScore = 0;
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                    console.log('📊 [CLS] Cumulative Layout Shift:', clsScore);
                }
            });
        });
        observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
        // Ignore
    }
};

/**
 * Bundle size analyzer (development)
 */
export const analyzeBundleSize = () => {
    if (import.meta.env.MODE !== 'development') return;

    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));

    console.group('📦 Bundle Analysis');

    console.log('JavaScript Files:');
    scripts.forEach(script => {
        console.log(`- ${script.src.split('/').pop()}`);
    });

    console.log('\nCSS Files:');
    styles.forEach(style => {
        console.log(`- ${style.href.split('/').pop()}`);
    });

    console.groupEnd();
};

// Auto-start Web Vitals monitoring
if (import.meta.env.MODE === 'development') {
    monitorWebVitals();
}

export default PerformanceMonitor;



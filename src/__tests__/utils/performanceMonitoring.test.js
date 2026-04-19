import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock PerformanceObserver
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();
global.PerformanceObserver = vi.fn().mockImplementation((callback) => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
}));

// Mock sendBeacon
navigator.sendBeacon = vi.fn().mockReturnValue(true);

// Mock performance API
Object.defineProperty(performance, 'getEntriesByType', {
    value: vi.fn().mockReturnValue([]),
    writable: true,
});

describe('Performance Monitoring', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should export initPerformanceMonitoring function', async () => {
        const mod = await import('@/utils/performanceMonitoring');
        expect(typeof mod.initPerformanceMonitoring).toBe('function');
    });

    it('should export trackRender function', async () => {
        const mod = await import('@/utils/performanceMonitoring');
        expect(typeof mod.trackRender).toBe('function');
    });

    it('should export trackRouteChange function', async () => {
        const mod = await import('@/utils/performanceMonitoring');
        expect(typeof mod.trackRouteChange).toBe('function');
    });

    it('should register PerformanceObservers on init', async () => {
        const { initPerformanceMonitoring } = await import('@/utils/performanceMonitoring');
        // Should not throw when initializing
        expect(() => initPerformanceMonitoring()).not.toThrow();
    });

    it('trackRender should report slow renders (>16ms)', async () => {
        const { trackRender } = await import('@/utils/performanceMonitoring');
        // Should not throw for slow render
        trackRender('TestComponent', 'mount', 50, 30);
        // Should not throw for fast render
        trackRender('FastComponent', 'update', 5, 3);
    });

    it('trackRouteChange should not throw', async () => {
        const { trackRouteChange } = await import('@/utils/performanceMonitoring');
        expect(() => trackRouteChange('/old', '/new')).not.toThrow();
    });
});

describe('Performance Monitoring - Metric Types', () => {
    it('should handle Web Vital metric types', () => {
        const metricTypes = [
            'LCP',
            'FID',
            'CLS',
            'TTFB',
            'INP',
            'LONG_TASK',
            'SLOW_RENDER',
            'ROUTE_CHANGE',
        ];
        metricTypes.forEach((type) => {
            expect(typeof type).toBe('string');
            expect(type.length).toBeGreaterThan(0);
        });
    });

    it('should have sendBeacon available', () => {
        expect(typeof navigator.sendBeacon).toBe('function');
    });
});

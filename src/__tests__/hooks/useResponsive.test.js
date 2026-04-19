// frontend/src/__tests__/hooks/useResponsive.test.js
// Tests for useResponsive hook
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResponsive } from '../../hooks/useResponsive';

describe('useResponsive', () => {
    let originalInnerWidth;
    let originalInnerHeight;

    const setWindowSize = (width, height) => {
        Object.defineProperty(window, 'innerWidth', {
            value: width,
            writable: true,
            configurable: true,
        });
        Object.defineProperty(window, 'innerHeight', {
            value: height,
            writable: true,
            configurable: true,
        });
    };

    beforeEach(() => {
        vi.useFakeTimers();
        originalInnerWidth = window.innerWidth;
        originalInnerHeight = window.innerHeight;
    });

    afterEach(() => {
        vi.useRealTimers();
        setWindowSize(originalInnerWidth, originalInnerHeight);
        vi.restoreAllMocks();
    });

    // ── 1. Returns correct shape ──
    it('should return object with isMobile, isTablet, isDesktop, width, height, orientation', () => {
        const { result } = renderHook(() => useResponsive());
        expect(result.current).toHaveProperty('isMobile');
        expect(result.current).toHaveProperty('isTablet');
        expect(result.current).toHaveProperty('isDesktop');
        expect(result.current).toHaveProperty('isUltrawide');
        expect(result.current).toHaveProperty('width');
        expect(result.current).toHaveProperty('height');
        expect(result.current).toHaveProperty('orientation');
        expect(result.current).toHaveProperty('breakpoints');
    });

    // ── 2. Detects mobile viewport ──
    it('should detect mobile viewport (width <= 768)', () => {
        setWindowSize(375, 667);
        const { result } = renderHook(() => useResponsive());

        // Advance past debounce
        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(result.current.isMobile).toBe(true);
        expect(result.current.isTablet).toBe(false);
        expect(result.current.isDesktop).toBe(false);
    });

    // ── 3. Detects tablet viewport ──
    it('should detect tablet viewport (769-1024)', () => {
        setWindowSize(800, 1024);
        const { result } = renderHook(() => useResponsive());

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(result.current.isMobile).toBe(false);
        expect(result.current.isTablet).toBe(true);
    });

    // ── 4. Detects desktop viewport ──
    it('should detect desktop viewport (1025-1920)', () => {
        setWindowSize(1440, 900);
        const { result } = renderHook(() => useResponsive());

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(result.current.isMobile).toBe(false);
        expect(result.current.isTablet).toBe(false);
        expect(result.current.isDesktop).toBe(true);
    });

    // ── 5. Detects ultrawide viewport ──
    it('should detect ultrawide viewport (> 1920)', () => {
        setWindowSize(2560, 1080);
        const { result } = renderHook(() => useResponsive());

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(result.current.isUltrawide).toBe(true);
        expect(result.current.isDesktop).toBe(false);
    });

    // ── 6. Detects portrait orientation ──
    it('should detect portrait orientation when height > width', () => {
        setWindowSize(375, 812);
        const { result } = renderHook(() => useResponsive());

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(result.current.orientation).toBe('portrait');
    });

    // ── 7. Detects landscape orientation ──
    it('should detect landscape orientation when width > height', () => {
        setWindowSize(1920, 1080);
        const { result } = renderHook(() => useResponsive());

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(result.current.orientation).toBe('landscape');
    });

    // ── 8. Updates on resize (debounced) ──
    it('should update dimensions after resize event (debounced)', () => {
        setWindowSize(1920, 1080);
        const { result } = renderHook(() => useResponsive());

        act(() => {
            vi.advanceTimersByTime(200);
        });
        expect(result.current.isDesktop).toBe(true);

        // Simulate resize to mobile
        setWindowSize(375, 667);
        act(() => {
            window.dispatchEvent(new Event('resize'));
            vi.advanceTimersByTime(200);
        });

        expect(result.current.isMobile).toBe(true);
        expect(result.current.width).toBe(375);
    });

    // ── 9. isSmallScreen and isLargeScreen utilities ──
    it('should provide isSmallScreen and isLargeScreen utilities', () => {
        setWindowSize(500, 800);
        const { result } = renderHook(() => useResponsive());

        act(() => {
            vi.advanceTimersByTime(200);
        });

        expect(result.current.isSmallScreen).toBe(true);
        expect(result.current.isLargeScreen).toBe(false);
    });

    // ── 10. Exposes breakpoints ──
    it('should expose breakpoint values', () => {
        const { result } = renderHook(() => useResponsive());
        expect(result.current.breakpoints.mobile).toBe(768);
        expect(result.current.breakpoints.tablet).toBe(1024);
        expect(result.current.breakpoints.desktop).toBe(1920);
    });

    // ── 11. Cleans up listners on unmount ──
    it('should clean up resize and orientationchange listners on unmount', () => {
        const removeSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useResponsive());

        unmount();

        const calls = removeSpy.mock.calls.map((c) => c[0]);
        expect(calls).toContain('resize');
        expect(calls).toContain('orientationchange');
    });
});

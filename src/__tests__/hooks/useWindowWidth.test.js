// frontend/src/__tests__/hooks/useWindowWidth.test.js
// Tests for useWindowWidth hook — responsive breakpoints
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useWindowWidth from '../../hooks/useWindowWidth';

describe('useWindowWidth', () => {
    let originalInnerWidth;

    const setWindowWidth = (width) => {
        Object.defineProperty(window, 'innerWidth', {
            value: width,
            writable: true,
            configurable: true,
        });
    };

    beforeEach(() => {
        originalInnerWidth = window.innerWidth;
        // Make requestAnimationFrame synchronous so resize updates are immediate
        vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(0); return 0; });
    });

    afterEach(() => {
        setWindowWidth(originalInnerWidth);
        vi.restoreAllMocks();
    });

    // ── 1. Returns current width ──
    it('should return current window width', () => {
        setWindowWidth(1200);
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current.width).toBe(1200);
    });

    // ── 2. Detects mobile (width <= 768) ──
    it('should detect mobile when width <= 768', () => {
        setWindowWidth(375);
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current.isMobile).toBe(true);
        expect(result.current.isTablet).toBe(true); // 375 < 1024
    });

    // ── 3. Detects non-mobile for width > 768 ──
    it('should detect non-mobile when width > 768', () => {
        setWindowWidth(1024);
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current.isMobile).toBe(false);
    });

    // ── 4. Detects tablet (width <= 1024) ──
    it('should detect tablet when width <= 1024', () => {
        setWindowWidth(900);
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current.isTablet).toBe(true);
    });

    // ── 5. Detects non-tablet for width > 1024 ──
    it('should detect non-tablet when width > 1024', () => {
        setWindowWidth(1440);
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current.isTablet).toBe(false);
    });

    // ── 6. Updates on resize ──
    it('should update width when window resizes', () => {
        setWindowWidth(1200);
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current.width).toBe(1200);

        act(() => {
            setWindowWidth(500);
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(500);
        expect(result.current.isMobile).toBe(true);
    });

    // ── 7. Cleans up resize listner on unmount ──
    it('should remove resize listner on unmount', () => {
        const spy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useWindowWidth());
        unmount();

        const removedEvents = spy.mock.calls.map((c) => c[0]);
        expect(removedEvents).toContain('resize');
    });

    // ── 8. Boundary: exactly 768 ──
    it('should report isMobile=true at exactly 768px', () => {
        setWindowWidth(768);
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current.isMobile).toBe(true);
    });

    // ── 9. Boundary: exactly 769 ──
    it('should report isMobile=false at 769px', () => {
        setWindowWidth(769);
        const { result } = renderHook(() => useWindowWidth());
        expect(result.current.isMobile).toBe(false);
    });

    // ── 10. Multiple resizes ──
    it('should handle multiple rapid resize events', () => {
        setWindowWidth(1200);
        const { result } = renderHook(() => useWindowWidth());

        act(() => {
            setWindowWidth(800);
            window.dispatchEvent(new Event('resize'));
        });
        expect(result.current.width).toBe(800);

        act(() => {
            setWindowWidth(400);
            window.dispatchEvent(new Event('resize'));
        });
        expect(result.current.width).toBe(400);
        expect(result.current.isMobile).toBe(true);
    });
});

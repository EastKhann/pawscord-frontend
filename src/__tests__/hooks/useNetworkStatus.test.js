// frontend/src/__tests__/hooks/useNetworkStatus.test.js
// Tests for useNetworkStatus (online/offline detection) from useCustomHooks
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNetworkStatus } from '../../hooks/useCustomHooks';

describe('useNetworkStatus', () => {
    let originalOnLine;
    let addEventListenerSpy;
    let removeEventListenerSpy;

    beforeEach(() => {
        originalOnLine = navigator.onLine;
        // Default to online
        Object.defineProperty(navigator, 'onLine', {
            value: true,
            writable: true,
            configurable: true,
        });

        addEventListenerSpy = vi.spyOn(window, 'addEventListener');
        removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    });

    afterEach(() => {
        Object.defineProperty(navigator, 'onLine', {
            value: originalOnLine,
            writable: true,
            configurable: true,
        });
        vi.restoreAllMocks();
    });

    // ── 1. Returns isOnline as true when navigator.onLine is true ──
    it('should return isOnline as true when browser is online', () => {
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.isOnline).toBe(true);
    });

    // ── 2. Returns isOnline as false when navigator.onLine is false ──
    it('should return isOnline as false when browser is offline', () => {
        Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.isOnline).toBe(false);
    });

    // ── 3. Updates to offline when offline event fires ──
    it('should update isOnline to false when offline event fires', () => {
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.isOnline).toBe(true);

        // Find the offline handler registered by the hook
        act(() => {
            window.dispatchEvent(new Event('offline'));
        });

        expect(result.current.isOnline).toBe(false);
    });

    // ── 4. Updates to online when online event fires ──
    it('should update isOnline to true when online event fires', () => {
        Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.isOnline).toBe(false);

        act(() => {
            window.dispatchEvent(new Event('online'));
        });

        expect(result.current.isOnline).toBe(true);
    });

    // ── 5. Registers online and offline event listners ──
    it('should register online and offline event listners', () => {
        renderHook(() => useNetworkStatus());

        const calls = addEventListenerSpy.mock.calls.map((c) => c[0]);
        expect(calls).toContain('online');
        expect(calls).toContain('offline');
    });

    // ── 6. Cleans up listners on unmount ──
    it('should remove event listners on unmount', () => {
        const { unmount } = renderHook(() => useNetworkStatus());
        unmount();

        const calls = removeEventListenerSpy.mock.calls.map((c) => c[0]);
        expect(calls).toContain('online');
        expect(calls).toContain('offline');
    });

    // ── 7. Returns effectiveType as null when Network Info API unavailable ──
    it('should return effectiveType as null when Network Information API is not available', () => {
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.effectiveType).toBeNull();
    });

    // ── 8. Returns downlink as null without Network Info API ──
    it('should return downlink as null without Network Information API', () => {
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.downlink).toBeNull();
    });

    // ── 9. Handles rapid online/offline toggling ──
    it('should handle rapid online/offline toggling', () => {
        const { result } = renderHook(() => useNetworkStatus());

        act(() => {
            window.dispatchEvent(new Event('offline'));
        });
        expect(result.current.isOnline).toBe(false);

        act(() => {
            window.dispatchEvent(new Event('online'));
        });
        expect(result.current.isOnline).toBe(true);

        act(() => {
            window.dispatchEvent(new Event('offline'));
        });
        expect(result.current.isOnline).toBe(false);
    });
});

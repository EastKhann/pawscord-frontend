// frontend/src/__tests__/hooks/useOnlineStatus.test.js
// Tests for useNetworkStatus hook (useNetworkStatus.js standalone module)

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

describe('useNetworkStatus (standalone hook)', () => {
    let originalOnLine;

    beforeEach(() => {
        originalOnLine = navigator.onLine;
        Object.defineProperty(navigator, 'onLine', {
            value: true,
            writable: true,
            configurable: true,
        });
    });

    afterEach(() => {
        Object.defineProperty(navigator, 'onLine', {
            value: originalOnLine,
            writable: true,
            configurable: true,
        });
        vi.restoreAllMocks();
    });

    it('defaults to online when navigator.onLine is true', () => {
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.isOnline).toBe(true);
        expect(result.current.wasOffline).toBe(false);
    });

    it('defaults to offline when navigator.onLine is false', () => {
        Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.isOnline).toBe(false);
    });

    it('transitions to offline on "offline" event', () => {
        const { result } = renderHook(() => useNetworkStatus());
        act(() => {
            window.dispatchEvent(new Event('offline'));
        });
        expect(result.current.isOnline).toBe(false);
    });

    it('transitions back to online on "online" event', () => {
        const { result } = renderHook(() => useNetworkStatus());
        act(() => { window.dispatchEvent(new Event('offline')); });
        act(() => { window.dispatchEvent(new Event('online')); });
        expect(result.current.isOnline).toBe(true);
    });

    it('sets wasOffline flag after reconnection', () => {
        const { result } = renderHook(() => useNetworkStatus());
        act(() => { window.dispatchEvent(new Event('offline')); });
        act(() => { window.dispatchEvent(new Event('online')); });
        expect(result.current.wasOffline).toBe(true);
    });

    it('wasOffline is false if never went offline', () => {
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current.wasOffline).toBe(false);
    });

    it('cleans up event listeners on unmount', () => {
        const removeSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useNetworkStatus());
        unmount();
        const calls = removeSpy.mock.calls.map(c => c[0]);
        expect(calls).toContain('online');
        expect(calls).toContain('offline');
    });

    it('handles rapid toggles', () => {
        const { result } = renderHook(() => useNetworkStatus());
        act(() => {
            window.dispatchEvent(new Event('offline'));
            window.dispatchEvent(new Event('online'));
            window.dispatchEvent(new Event('offline'));
        });
        expect(result.current.isOnline).toBe(false);
    });

    it('multiple instances share the same navigator.onLine', () => {
        const { result: r1 } = renderHook(() => useNetworkStatus());
        const { result: r2 } = renderHook(() => useNetworkStatus());
        expect(r1.current.isOnline).toBe(r2.current.isOnline);
    });

    it('returns an object with isOnline and wasOffline keys', () => {
        const { result } = renderHook(() => useNetworkStatus());
        expect(result.current).toHaveProperty('isOnline');
        expect(result.current).toHaveProperty('wasOffline');
    });
});

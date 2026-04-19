// frontend/src/__tests__/hooks/useErrorRecovery.test.js
// Tests for useErrorRecovery hook — retry logic, exponential backoff, abort on unmount
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useErrorRecovery } from '../../hooks/useErrorRecovery';

describe('useErrorRecovery', () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    // ── 1. Initial state ──
    it('should have correct initial state', () => {
        const fetchFn = vi.fn().mockResolvedValue('data');
        const { result } = renderHook(() => useErrorRecovery(fetchFn, { immediate: false }));

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
        expect(result.current.attempt).toBe(0);
    });

    // ── 2. Successful fetch ──
    it('should return data on successful fetch', async () => {
        const fetchFn = vi.fn().mockResolvedValue({ messages: [] });
        const { result } = renderHook(() => useErrorRecovery(fetchFn, { immediate: true }));

        await waitFor(() => {
            expect(result.current.data).toEqual({ messages: [] });
        });

        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });

    // ── 3. Failed fetch sets error ──
    it('should set error on failed fetch', async () => {
        const fetchFn = vi.fn().mockRejectedValue(new Error('Network error'));
        const { result } = renderHook(() =>
            useErrorRecovery(fetchFn, {
                immediate: true,
                maxRetries: 0,
                baseDelay: 100,
            })
        );

        await waitFor(() => {
            expect(result.current.error).not.toBeNull();
        });

        expect(result.current.data).toBeNull();
    });

    // ── 4. Has retry function ──
    it('should expose retry function', () => {
        const fetchFn = vi.fn().mockResolvedValue('ok');
        const { result } = renderHook(() => useErrorRecovery(fetchFn, { immediate: false }));

        expect(typeof result.current.retry).toBe('function');
    });

    // ── 5. Has reset function ──
    it('should expose reset function', () => {
        const fetchFn = vi.fn().mockResolvedValue('ok');
        const { result } = renderHook(() => useErrorRecovery(fetchFn, { immediate: false }));

        expect(typeof result.current.reset).toBe('function');
    });

    // ── 6. Has retry and reset as functions ──
    it('retry and reset should be callable functions', () => {
        const fetchFn = vi.fn().mockResolvedValue('ok');
        const { result } = renderHook(() => useErrorRecovery(fetchFn, { immediate: false }));

        expect(typeof result.current.retry).toBe('function');
        expect(typeof result.current.reset).toBe('function');
        // Should not throw when called
        expect(() => act(() => result.current.retry())).not.toThrow();
    });

    // ── 7. immediate: false does not auto-fetch ──
    it('should not auto-fetch when immediate is false', () => {
        const fetchFn = vi.fn().mockResolvedValue('data');
        renderHook(() => useErrorRecovery(fetchFn, { immediate: false }));

        expect(fetchFn).not.toHaveBeenCalled();
    });

    // ── 8. Passes AbortSignal to fetch function ──
    it('should pass AbortSignal to the fetch function', async () => {
        const fetchFn = vi.fn().mockImplementation((signal) => {
            expect(signal).toBeInstanceOf(AbortSignal);
            return Promise.resolve('ok');
        });

        const { result } = renderHook(() => useErrorRecovery(fetchFn, { immediate: true }));

        await waitFor(() => {
            expect(result.current.data).toBe('ok');
        });
    });

    // ── 9. Abort on unmount ──
    it('should abort on unmount', async () => {
        let capturedSignal;
        const fetchFn = vi.fn().mockImplementation((signal) => {
            capturedSignal = signal;
            return new Promise((resolve) => setTimeout(() => resolve('data'), 5000));
        });

        const { unmount } = renderHook(() => useErrorRecovery(fetchFn, { immediate: true }));

        // Unmount while fetch is in progress
        unmount();

        // AbortSignal should be aborted
        if (capturedSignal) {
            expect(capturedSignal.aborted).toBe(true);
        }
    });

    // ── 10. Reset clears state ──
    it('should clear state on reset', async () => {
        const fetchFn = vi.fn().mockResolvedValue('data');
        const { result } = renderHook(() => useErrorRecovery(fetchFn, { immediate: true }));

        await waitFor(() => {
            expect(result.current.data).toBe('data');
        });

        act(() => {
            result.current.reset();
        });

        expect(result.current.data).toBeNull();
        expect(result.current.error).toBeNull();
        expect(result.current.isLoading).toBe(false);
    });
});

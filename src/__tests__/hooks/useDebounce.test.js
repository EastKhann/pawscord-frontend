// frontend/src/__tests__/hooks/useDebounce.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../../hooks/useDebounce';

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('hello', 500));
        expect(result.current).toBe('hello');
    });

    it('should debounce value changes', () => {
        const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
            initialProps: { value: 'initial', delay: 500 },
        });

        expect(result.current).toBe('initial');

        // Change value
        rerender({ value: 'updated', delay: 500 });
        // Should still be old value before timeout
        expect(result.current).toBe('initial');

        // Advance time past delay
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current).toBe('updated');
    });

    it('should cancel previous timeout on rapid changes', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
            initialProps: { value: 'a' },
        });

        rerender({ value: 'b' });
        act(() => vi.advanceTimersByTime(100));

        rerender({ value: 'c' });
        act(() => vi.advanceTimersByTime(100));

        rerender({ value: 'd' });
        act(() => vi.advanceTimersByTime(300));

        // Should only have the final value
        expect(result.current).toBe('d');
    });

    it('should use custom delay', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
            initialProps: { value: 'fast' },
        });

        rerender({ value: 'faster' });

        act(() => vi.advanceTimersByTime(100));
        expect(result.current).toBe('faster');
    });

    // ── 5. Should use default 500ms delay ──
    it('should default to 500ms delay when no delay is provided', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
            initialProps: { value: 'start' },
        });

        rerender({ value: 'end' });

        // Not yet at 500ms
        act(() => vi.advanceTimersByTime(400));
        expect(result.current).toBe('start');

        // Now past 500ms
        act(() => vi.advanceTimersByTime(100));
        expect(result.current).toBe('end');
    });

    // ── 6. Should handle number values ──
    it('should work with number values', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 200), {
            initialProps: { value: 0 },
        });

        rerender({ value: 42 });
        expect(result.current).toBe(0);

        act(() => vi.advanceTimersByTime(200));
        expect(result.current).toBe(42);
    });

    // ── 7. Should handle object values ──
    it('should work with object values', () => {
        const initial = { q: '' };
        const updated = { q: 'search' };

        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
            initialProps: { value: initial },
        });

        rerender({ value: updated });
        act(() => vi.advanceTimersByTime(300));
        expect(result.current).toEqual(updated);
    });

    // ── 8. Should not update before delay elapses ──
    it('should not update value halfway through delay', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 1000), {
            initialProps: { value: 'old' },
        });

        rerender({ value: 'new' });

        act(() => vi.advanceTimersByTime(500));
        expect(result.current).toBe('old');

        act(() => vi.advanceTimersByTime(500));
        expect(result.current).toBe('new');
    });

    // ── 9. Should handle falsy values (null, undefined, 0, '') ──
    it('should handle falsy values correctly', () => {
        const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
            initialProps: { value: 'truthy' },
        });

        rerender({ value: null });
        act(() => vi.advanceTimersByTime(100));
        expect(result.current).toBeNull();

        rerender({ value: '' });
        act(() => vi.advanceTimersByTime(100));
        expect(result.current).toBe('');

        rerender({ value: 0 });
        act(() => vi.advanceTimersByTime(100));
        expect(result.current).toBe(0);
    });

    // ── 10. Should clean up timeout on unmount ──
    it('should clean up timeout on unmount without errors', () => {
        const { result, rerender, unmount } = renderHook(({ value }) => useDebounce(value, 500), {
            initialProps: { value: 'a' },
        });

        rerender({ value: 'b' });

        // Unmount before timer fires — should not throw
        expect(() => unmount()).not.toThrow();

        // Advancing timers after unmount should be safe
        act(() => vi.advanceTimersByTime(1000));
    });
});

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
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            { initialProps: { value: 'initial', delay: 500 } }
        );

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
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        );

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
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 100),
            { initialProps: { value: 'fast' } }
        );

        rerender({ value: 'faster' });

        act(() => vi.advanceTimersByTime(100));
        expect(result.current).toBe('faster');
    });
});

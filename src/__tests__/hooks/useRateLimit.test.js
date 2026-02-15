// frontend/src/__tests__/hooks/useRateLimit.test.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRateLimit } from '../../hooks/useRateLimit';

describe('useRateLimit', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.spyOn(console, 'warn').mockImplementation(() => { });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('should allow requests within limit', () => {
        const { result } = renderHook(() => useRateLimit(3, 1000));

        expect(result.current.checkLimit()).toBe(true);
        expect(result.current.checkLimit()).toBe(true);
        expect(result.current.checkLimit()).toBe(true);
    });

    it('should block requests exceeding limit', () => {
        const { result } = renderHook(() => useRateLimit(2, 1000));

        result.current.checkLimit();
        result.current.checkLimit();
        // Third should be blocked
        expect(result.current.checkLimit()).toBe(false);
    });

    it('should reset after time window', () => {
        const { result } = renderHook(() => useRateLimit(2, 1000));

        result.current.checkLimit();
        result.current.checkLimit();
        expect(result.current.checkLimit()).toBe(false);

        // Advance past window
        vi.advanceTimersByTime(1100);

        expect(result.current.checkLimit()).toBe(true);
    });

    it('should track remaining requests', () => {
        const { result } = renderHook(() => useRateLimit(5, 1000));

        expect(result.current.getRemainingRequests()).toBe(5);
        result.current.checkLimit();
        result.current.checkLimit();
        expect(result.current.getRemainingRequests()).toBe(3);
    });

    it('should reset counters', () => {
        const { result } = renderHook(() => useRateLimit(2, 1000));

        result.current.checkLimit();
        result.current.checkLimit();
        expect(result.current.checkLimit()).toBe(false);

        result.current.reset();
        expect(result.current.checkLimit()).toBe(true);
    });
});

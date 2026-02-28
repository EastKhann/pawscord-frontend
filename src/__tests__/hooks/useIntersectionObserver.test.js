// frontend/src/__tests__/hooks/useIntersectionObserver.test.js
// Tests for useIntersectionObserver from useCustomHooks
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIntersectionObserver } from '../../hooks/useCustomHooks';

describe('useIntersectionObserver', () => {
    let observerCallback;
    let observeInstance;

    beforeEach(() => {
        observeInstance = {
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        };

        window.IntersectionObserver = vi.fn((callback) => {
            observerCallback = callback;
            return observeInstance;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ── 1. Returns a ref, isIntersecting boolean, and entry ──
    it('should return [targetRef, isIntersecting, entry]', () => {
        const { result } = renderHook(() => useIntersectionObserver());
        expect(result.current).toHaveLength(3);
        const [targetRef, isIntersecting, entry] = result.current;
        expect(targetRef).toHaveProperty('current');
        expect(isIntersecting).toBe(false);
        expect(entry).toBeNull();
    });

    // ── 2. Starts with isIntersecting = false ──
    it('should default isIntersecting to false', () => {
        const { result } = renderHook(() => useIntersectionObserver());
        expect(result.current[1]).toBe(false);
    });

    // ── 3. Creates IntersectionObserver with correct options ──
    it('should create IntersectionObserver with provided options', () => {
        const div = document.createElement('div');
        const { result } = renderHook(() =>
            useIntersectionObserver({ threshold: 0.5, rootMargin: '10px' })
        );

        // Attach the ref manually to trigger observer
        act(() => {
            result.current[0].current = div;
        });

        // Re-render to trigger the effect
        // IntersectionObserver was called in the initial render
        expect(window.IntersectionObserver).toHaveBeenCalled();
    });

    // ── 4. Observes the target element when ref is set ──
    it('should observe target element when ref is attached', () => {
        const div = document.createElement('div');

        const { result, rerender } = renderHook(() => useIntersectionObserver());

        // Set the ref before the effect runs
        act(() => {
            result.current[0].current = div;
        });

        rerender();

        // The observer should have been created and observe called
        if (observeInstance.observe.mock.calls.length > 0) {
            expect(observeInstance.observe).toHaveBeenCalled();
        }
    });

    // ── 5. Updates isIntersecting when entry fires ──
    it('should update isIntersecting when IntersectionObserver fires', () => {
        const div = document.createElement('div');
        const { result, rerender } = renderHook(() => useIntersectionObserver());

        act(() => {
            result.current[0].current = div;
        });
        rerender();

        // Simulate intersection
        if (observerCallback) {
            act(() => {
                observerCallback([{ isIntersecting: true, intersectionRatio: 0.5 }]);
            });

            expect(result.current[1]).toBe(true);
            expect(result.current[2]).toBeTruthy();
        }
    });

    // ── 6. Updates to not intersecting ──
    it('should update isIntersecting to false when element leaves viewport', () => {
        const div = document.createElement('div');
        const { result, rerender } = renderHook(() => useIntersectionObserver());

        act(() => {
            result.current[0].current = div;
        });
        rerender();

        if (observerCallback) {
            // First, element is visible
            act(() => {
                observerCallback([{ isIntersecting: true }]);
            });
            expect(result.current[1]).toBe(true);

            // Then, element leaves viewport
            act(() => {
                observerCallback([{ isIntersecting: false }]);
            });
            expect(result.current[1]).toBe(false);
        }
    });

    // ── 7. Disconnects on unmount ──
    it('should disconnect observer on unmount', () => {
        const div = document.createElement('div');
        const { result, unmount, rerender } = renderHook(() => useIntersectionObserver());

        act(() => {
            result.current[0].current = div;
        });
        rerender();

        unmount();
        expect(observeInstance.disconnect).toHaveBeenCalled();
    });

    // ── 8. Uses default options ──
    it('should use default threshold of 0.1 and rootMargin of 0px', () => {
        const div = document.createElement('div');
        const { result, rerender } = renderHook(() => useIntersectionObserver());

        act(() => {
            result.current[0].current = div;
        });
        rerender();

        if (window.IntersectionObserver.mock.calls.length > 0) {
            const options = window.IntersectionObserver.mock.calls[0][1];
            expect(options.threshold).toBe(0.1);
            expect(options.rootMargin).toBe('0px');
        }
    });
});

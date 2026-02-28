// frontend/src/__tests__/hooks/useMediaQuery.test.js
// Tests for useMediaQuery from useCustomHooks
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from '../../hooks/useCustomHooks';

describe('useMediaQuery', () => {
    let listeners;
    let mockMatchMedia;

    beforeEach(() => {
        listeners = {};
        mockMatchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: vi.fn((event, handler) => {
                listeners[query] = handler;
            }),
            removeEventListener: vi.fn((event, handler) => {
                delete listeners[query];
            }),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: mockMatchMedia,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ── 1. Returns false by default ──
    it('should return false when media query does not match', () => {
        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
        expect(result.current).toBe(false);
    });

    // ── 2. Returns true when query matches initially ──
    it('should return true when media query matches initially', () => {
        mockMatchMedia.mockImplementation((query) => ({
            matches: true,
            media: query,
            addEventListener: vi.fn((event, handler) => { listeners[query] = handler; }),
            removeEventListener: vi.fn(),
        }));

        const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
        expect(result.current).toBe(true);
    });

    // ── 3. Updates when media query changes ──
    it('should update when media query match state changes', () => {
        const query = '(min-width: 768px)';
        const { result } = renderHook(() => useMediaQuery(query));

        expect(result.current).toBe(false);

        // Simulate the media query starting to match
        act(() => {
            if (listeners[query]) {
                // Simulate the MediaQueryList firing a change event
                mockMatchMedia.mockImplementation((q) => ({
                    matches: true,
                    media: q,
                    addEventListener: vi.fn((event, handler) => { listeners[q] = handler; }),
                    removeEventListener: vi.fn(),
                }));
                listeners[query]();
            }
        });

        // After change listener fires, the hook should see the new matches value
        expect(result.current).toBe(true);
    });

    // ── 4. Calls matchMedia with the query ──
    it('should call window.matchMedia with the provided query', () => {
        renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'));
        expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-color-scheme: dark)');
    });

    // ── 5. Cleans up event listener on unmount ──
    it('should remove event listener on unmount', () => {
        const removeEventListener = vi.fn();
        mockMatchMedia.mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: vi.fn((event, handler) => { listeners[query] = handler; }),
            removeEventListener,
        }));

        const { unmount } = renderHook(() => useMediaQuery('(max-width: 480px)'));
        unmount();

        expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    // ── 6. Handles different query strings ──
    it('should work with portrait orientation query', () => {
        mockMatchMedia.mockImplementation((query) => ({
            matches: query.includes('portrait'),
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }));

        const { result } = renderHook(() => useMediaQuery('(orientation: portrait)'));
        expect(result.current).toBe(true);
    });

    // ── 7. Handles reduced motion query ──
    it('should handle prefers-reduced-motion query', () => {
        renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)'));
        expect(mockMatchMedia).toHaveBeenCalledWith('(prefers-reduced-motion: reduce)');
    });
});

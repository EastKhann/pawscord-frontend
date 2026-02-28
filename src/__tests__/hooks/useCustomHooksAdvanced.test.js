// frontend/src/__tests__/hooks/useCustomHooksAdvanced.test.js
// Tests for utility hooks from useCustomHooks.ts:
//   useToggle, useKeyPress, usePrevious, useClickOutside, useClipboard,
//   useInterval, useTimeout, useHover, useMountedState
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {
    useToggle,
    useKeyPress,
    usePrevious,
    useClickOutside,
    useClipboard,
    useInterval,
    useTimeout,
    useHover,
    useMountedState,
    useThrottle,
    useWindowSize,
} from '../../hooks/useCustomHooks';

// ─── useToggle ───
describe('useToggle', () => {
    it('should default to false', () => {
        const { result } = renderHook(() => useToggle());
        const [value] = result.current;
        expect(value).toBe(false);
    });

    it('should accept initial value', () => {
        const { result } = renderHook(() => useToggle(true));
        const [value] = result.current;
        expect(value).toBe(true);
    });

    it('should toggle value', () => {
        const { result } = renderHook(() => useToggle(false));

        act(() => {
            const [, toggle] = result.current;
            toggle();
        });

        expect(result.current[0]).toBe(true);

        act(() => {
            const [, toggle] = result.current;
            toggle();
        });

        expect(result.current[0]).toBe(false);
    });

    it('should allow direct setValue', () => {
        const { result } = renderHook(() => useToggle(false));

        act(() => {
            const [, , setValue] = result.current;
            setValue(true);
        });

        expect(result.current[0]).toBe(true);
    });
});

// ─── useKeyPress ───
describe('useKeyPress', () => {
    it('should return false initially', () => {
        const { result } = renderHook(() => useKeyPress('Enter'));
        expect(result.current).toBe(false);
    });

    it('should return true when target key is pressed', () => {
        const { result } = renderHook(() => useKeyPress('Enter'));

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        });

        expect(result.current).toBe(true);
    });

    it('should return false when key is released', () => {
        const { result } = renderHook(() => useKeyPress('Enter'));

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        });
        expect(result.current).toBe(true);

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
        });
        expect(result.current).toBe(false);
    });

    it('should not react to other keys', () => {
        const { result } = renderHook(() => useKeyPress('Enter'));

        act(() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        });

        expect(result.current).toBe(false);
    });

    it('should cleanup listeners on unmount', () => {
        const spy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useKeyPress('Enter'));
        unmount();

        const removed = spy.mock.calls.map(c => c[0]);
        expect(removed).toContain('keydown');
        expect(removed).toContain('keyup');
        spy.mockRestore();
    });
});

// ─── usePrevious ───
describe('usePrevious', () => {
    it('should return undefined on first render', () => {
        const { result } = renderHook(() => usePrevious('first'));
        expect(result.current).toBeUndefined();
    });

    it('should return previous value after rerender', () => {
        const { result, rerender } = renderHook(
            ({ value }) => usePrevious(value),
            { initialProps: { value: 'first' } }
        );

        rerender({ value: 'second' });
        expect(result.current).toBe('first');

        rerender({ value: 'third' });
        expect(result.current).toBe('second');
    });

    it('should track numeric values', () => {
        const { result, rerender } = renderHook(
            ({ value }) => usePrevious(value),
            { initialProps: { value: 1 } }
        );

        rerender({ value: 2 });
        expect(result.current).toBe(1);

        rerender({ value: 3 });
        expect(result.current).toBe(2);
    });
});

// ─── useClickOutside ───
describe('useClickOutside', () => {
    it('should call callback when clicking outside element', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useClickOutside(callback));

        // Simulate ref being attached to a DOM element
        const element = document.createElement('div');
        document.body.appendChild(element);
        result.current.current = element;

        // Click outside the element
        act(() => {
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        });

        expect(callback).toHaveBeenCalledTimes(1);
        document.body.removeChild(element);
    });

    it('should NOT call callback when clicking inside element', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useClickOutside(callback));

        const element = document.createElement('div');
        document.body.appendChild(element);
        result.current.current = element;

        // Click inside the element
        act(() => {
            element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        });

        expect(callback).not.toHaveBeenCalled();
        document.body.removeChild(element);
    });
});

// ─── useClipboard ───
describe('useClipboard', () => {
    beforeEach(() => {
        // navigator.clipboard is already mocked in setup.js (non-configurable)
        // Just reset the mock and set up fake timers
        navigator.clipboard.writeText.mockClear();
        navigator.clipboard.writeText.mockResolvedValue(undefined);
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should start with no copied text', () => {
        const { result } = renderHook(() => useClipboard());
        expect(result.current.copiedText).toBeNull();
    });

    it('should copy text and set copiedText', async () => {
        const { result } = renderHook(() => useClipboard());

        await act(async () => {
            await result.current.copy('Hello!');
        });

        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello!');
        expect(result.current.copiedText).toBe('Hello!');
    });

    it('should clear copiedText after 2 seconds', async () => {
        const { result } = renderHook(() => useClipboard());

        await act(async () => {
            await result.current.copy('temp');
        });
        expect(result.current.copiedText).toBe('temp');

        act(() => {
            vi.advanceTimersByTime(2000);
        });

        expect(result.current.copiedText).toBeNull();
    });
});

// ─── useInterval ───
describe('useInterval', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should call callback at specified interval', () => {
        const callback = vi.fn();
        renderHook(() => useInterval(callback, 1000));

        expect(callback).not.toHaveBeenCalled();

        act(() => vi.advanceTimersByTime(1000));
        expect(callback).toHaveBeenCalledTimes(1);

        act(() => vi.advanceTimersByTime(1000));
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should not call callback when delay is null', () => {
        const callback = vi.fn();
        renderHook(() => useInterval(callback, null));

        act(() => vi.advanceTimersByTime(5000));
        expect(callback).not.toHaveBeenCalled();
    });

    it('should stop calling after unmount', () => {
        const callback = vi.fn();
        const { unmount } = renderHook(() => useInterval(callback, 500));

        act(() => vi.advanceTimersByTime(500));
        expect(callback).toHaveBeenCalledTimes(1);

        unmount();

        act(() => vi.advanceTimersByTime(1000));
        expect(callback).toHaveBeenCalledTimes(1);
    });
});

// ─── useTimeout ───
describe('useTimeout', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('should call callback after specified delay', () => {
        const callback = vi.fn();
        renderHook(() => useTimeout(callback, 500));

        expect(callback).not.toHaveBeenCalled();

        act(() => vi.advanceTimersByTime(500));
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not call callback when delay is null', () => {
        const callback = vi.fn();
        renderHook(() => useTimeout(callback, null));

        act(() => vi.advanceTimersByTime(5000));
        expect(callback).not.toHaveBeenCalled();
    });

    it('should only fire once', () => {
        const callback = vi.fn();
        renderHook(() => useTimeout(callback, 200));

        act(() => vi.advanceTimersByTime(1000));
        expect(callback).toHaveBeenCalledTimes(1);
    });
});

// ─── useMountedState ───
describe('useMountedState', () => {
    it('should return true when mounted', () => {
        const { result } = renderHook(() => useMountedState());
        expect(result.current()).toBe(true);
    });

    it('should return false after unmount', () => {
        const { result, unmount } = renderHook(() => useMountedState());
        expect(result.current()).toBe(true);

        unmount();
        expect(result.current()).toBe(false);
    });
});

// ─── useThrottle ───
describe('useThrottle', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    it('should return initial value immediately', () => {
        const { result } = renderHook(() => useThrottle('initial', 300));
        expect(result.current).toBe('initial');
    });

    it('should throttle value updates', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useThrottle(value, 300),
            { initialProps: { value: 'a' } }
        );

        rerender({ value: 'b' });
        act(() => vi.advanceTimersByTime(300));
        expect(result.current).toBe('b');
    });
});

// ─── useWindowSize ───
describe('useWindowSize', () => {
    it('should return current window dimensions', () => {
        const { result } = renderHook(() => useWindowSize());
        expect(result.current).toHaveProperty('width');
        expect(result.current).toHaveProperty('height');
        expect(typeof result.current.width).toBe('number');
        expect(typeof result.current.height).toBe('number');
    });

    it('should update on window resize', () => {
        const { result } = renderHook(() => useWindowSize());

        act(() => {
            Object.defineProperty(window, 'innerWidth', { value: 500, configurable: true });
            Object.defineProperty(window, 'innerHeight', { value: 300, configurable: true });
            window.dispatchEvent(new Event('resize'));
        });

        expect(result.current.width).toBe(500);
        expect(result.current.height).toBe(300);
    });
});

// frontend/src/__tests__/hooks/useClickOutside.test.js
// Comprehensive tests for useClickOutside from useCustomHooks
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useClickOutside } from '../../hooks/useCustomHooks';

describe('useClickOutside', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    // ── 1. Returns a ref object ──
    it('should return a ref object', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useClickOutside(callback));
        expect(result.current).toBeDefined();
        expect(result.current).toHaveProperty('current');
    });

    // ── 2. Calls callback when clicking outside the ref element ──
    it('should call callback when mousedown fires outside ref element', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useClickOutside(callback));

        // Simulate a DOM element attached to the ref
        const inside = document.createElement('div');
        document.body.appendChild(inside);
        result.current.current = inside;

        // Click outside (on body, not inside the div)
        const outsideTarget = document.createElement('span');
        document.body.appendChild(outsideTarget);
        const event = new MouseEvent('mousedown', { bubbles: true });
        Object.defineProperty(event, 'target', { value: outsideTarget });
        document.dispatchEvent(event);

        expect(callback).toHaveBeenCalledTimes(1);

        // Cleanup
        document.body.removeChild(inside);
        document.body.removeChild(outsideTarget);
    });

    // ── 3. Does NOT call callback when clicking inside the ref element ──
    it('should not call callback when mousedown fires inside ref element', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useClickOutside(callback));

        const inside = document.createElement('div');
        const child = document.createElement('span');
        inside.appendChild(child);
        document.body.appendChild(inside);
        result.current.current = inside;

        // Click on child of ref element
        act(() => {
            const event = new MouseEvent('mousedown', { bubbles: true });
            child.dispatchEvent(event);
        });

        expect(callback).not.toHaveBeenCalled();

        document.body.removeChild(inside);
    });

    // ── 4. Does NOT call callback when ref.current is null ──
    it('should not call callback when ref.current is null', () => {
        const callback = vi.fn();
        renderHook(() => useClickOutside(callback));

        // ref.current defaults to null — click anywhere
        act(() => {
            document.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        });

        expect(callback).not.toHaveBeenCalled();
    });

    // ── 5. Cleans up event listner on unmount ──
    it('should remove event listner on unmount', () => {
        const removeSpy = vi.spyOn(document, 'removeEventListener');
        const callback = vi.fn();
        const { unmount } = renderHook(() => useClickOutside(callback));

        unmount();

        expect(removeSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
        removeSpy.mockRestore();
    });

    // ── 6. Works with changing callbacks (latest is called) ──
    it('should use the latest callback after rerender', () => {
        const callback1 = vi.fn();
        const callback2 = vi.fn();
        const { result, rerender } = renderHook(({ cb }) => useClickOutside(cb), {
            initialProps: { cb: callback1 },
        });

        const inside = document.createElement('div');
        document.body.appendChild(inside);
        result.current.current = inside;

        // Rerender with a new callback
        rerender({ cb: callback2 });

        const outsideEl = document.createElement('span');
        document.body.appendChild(outsideEl);
        const event = new MouseEvent('mousedown', { bubbles: true });
        Object.defineProperty(event, 'target', { value: outsideEl });
        document.dispatchEvent(event);

        // callback2 should have been called (it's the latest)
        expect(callback2).toHaveBeenCalled();

        document.body.removeChild(inside);
        document.body.removeChild(outsideEl);
    });

    // ── 7. Multiple instances don't interfere ──
    it('should support multiple independent useClickOutside instances', () => {
        const cb1 = vi.fn();
        const cb2 = vi.fn();
        const { result: r1 } = renderHook(() => useClickOutside(cb1));
        const { result: r2 } = renderHook(() => useClickOutside(cb2));

        const el1 = document.createElement('div');
        const el2 = document.createElement('div');
        document.body.appendChild(el1);
        document.body.appendChild(el2);
        r1.current.current = el1;
        r2.current.current = el2;

        // Click outside both
        const outsideEl = document.createElement('span');
        document.body.appendChild(outsideEl);
        const event = new MouseEvent('mousedown', { bubbles: true });
        Object.defineProperty(event, 'target', { value: outsideEl });
        document.dispatchEvent(event);

        expect(cb1).toHaveBeenCalled();
        expect(cb2).toHaveBeenCalled();

        document.body.removeChild(el1);
        document.body.removeChild(el2);
        document.body.removeChild(outsideEl);
    });

    // ── 8. Click on the ref element itself does not trigger ──
    it('should not trigger when clicking directly on the ref element', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useClickOutside(callback));

        const el = document.createElement('div');
        document.body.appendChild(el);
        result.current.current = el;

        act(() => {
            const event = new MouseEvent('mousedown', { bubbles: true });
            el.dispatchEvent(event);
        });

        expect(callback).not.toHaveBeenCalled();
        document.body.removeChild(el);
    });

    // ── 9. Registers mousedown (not click) ──
    it('should listn specifically for mousedown events', () => {
        const addSpy = vi.spyOn(document, 'addEventListener');
        const callback = vi.fn();
        renderHook(() => useClickOutside(callback));

        expect(addSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
        addSpy.mockRestore();
    });

    // ── 10. Ref can be attached to different elements ──
    it('should work when ref is reassigned to a different element', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useClickOutside(callback));

        const el1 = document.createElement('div');
        const el2 = document.createElement('section');
        document.body.appendChild(el1);
        document.body.appendChild(el2);

        // Attach to el1 first
        result.current.current = el1;

        // Now reassign to el2
        result.current.current = el2;

        // Click on el1 — this is now "outside" el2
        act(() => {
            const event = new MouseEvent('mousedown', { bubbles: true });
            el1.dispatchEvent(event);
        });

        expect(callback).toHaveBeenCalledTimes(1);

        document.body.removeChild(el1);
        document.body.removeChild(el2);
    });
});

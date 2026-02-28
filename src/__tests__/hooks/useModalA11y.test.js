// frontend/src/__tests__/hooks/useModalA11y.test.js
// Tests for useModalA11y – focus trap, Escape close, ARIA props
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useModalA11y from '../../hooks/useModalA11y';

// Helper to create a minimal DOM container for focus trap testing
function createModalDOM() {
    const container = document.createElement('div');
    const btn1 = document.createElement('button');
    btn1.textContent = 'First';
    const input = document.createElement('input');
    input.type = 'text';
    const btn2 = document.createElement('button');
    btn2.textContent = 'Last';
    container.appendChild(btn1);
    container.appendChild(input);
    container.appendChild(btn2);
    document.body.appendChild(container);
    return { container, btn1, input, btn2 };
}

describe('useModalA11y', () => {
    let dom;

    afterEach(() => {
        if (dom?.container && dom.container.parentNode) {
            document.body.removeChild(dom.container);
        }
        dom = null;
    });

    // ── 1. Returns correct shape ──
    it('should return modalRef, overlayProps, and dialogProps', () => {
        const onClose = vi.fn();
        const { result } = renderHook(() => useModalA11y({ onClose }));

        expect(result.current).toHaveProperty('modalRef');
        expect(result.current).toHaveProperty('overlayProps');
        expect(result.current).toHaveProperty('dialogProps');
    });

    // ── 2. dialogProps has correct ARIA attributes ──
    it('should include role=dialog and aria-modal=true in dialogProps', () => {
        const onClose = vi.fn();
        const { result } = renderHook(() => useModalA11y({ onClose, label: 'Test Dialog' }));

        expect(result.current.dialogProps.role).toBe('dialog');
        expect(result.current.dialogProps['aria-modal']).toBe(true);
        expect(result.current.dialogProps['aria-label']).toBe('Test Dialog');
    });

    // ── 3. dialogProps omits aria-label when no label provided ──
    it('should omit aria-label when label is empty', () => {
        const onClose = vi.fn();
        const { result } = renderHook(() => useModalA11y({ onClose, label: '' }));

        expect(result.current.dialogProps['aria-label']).toBeUndefined();
    });

    // ── 4. overlayProps has role=presentation ──
    it('should set role=presentation on overlayProps', () => {
        const onClose = vi.fn();
        const { result } = renderHook(() => useModalA11y({ onClose }));

        expect(result.current.overlayProps.role).toBe('presentation');
        expect(typeof result.current.overlayProps.onClick).toBe('function');
    });

    // ── 5. Escape key calls onClose ──
    it('should call onClose when Escape key is pressed', () => {
        const onClose = vi.fn();
        dom = createModalDOM();

        const { result } = renderHook(() => useModalA11y({ onClose, isOpen: true }));

        // Attach ref manually
        act(() => {
            result.current.modalRef.current = dom.container;
        });

        // Re-render to trigger the effect with the attached ref
        // Simulate Escape keydown
        act(() => {
            const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
            document.dispatchEvent(event);
        });

        expect(onClose).toHaveBeenCalled();
    });

    // ── 6. Overlay click on target calls onClose ──
    it('should call onClose when overlay itself is clicked (not children)', () => {
        const onClose = vi.fn();
        const { result } = renderHook(() => useModalA11y({ onClose }));

        // Simulate click where target === currentTarget (overlay click)
        const mockEvent = { target: 'overlay', currentTarget: 'overlay' };
        act(() => {
            result.current.overlayProps.onClick(mockEvent);
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });

    // ── 7. Overlay click on child does NOT call onClose ──
    it('should NOT call onClose when a child inside the overlay is clicked', () => {
        const onClose = vi.fn();
        const { result } = renderHook(() => useModalA11y({ onClose }));

        const mockEvent = { target: 'child', currentTarget: 'overlay' };
        act(() => {
            result.current.overlayProps.onClick(mockEvent);
        });

        expect(onClose).not.toHaveBeenCalled();
    });

    // ── 8. dialogProps onClick stops propagation ──
    it('should stop propagation on dialogProps onClick', () => {
        const onClose = vi.fn();
        const { result } = renderHook(() => useModalA11y({ onClose }));

        const stopPropagation = vi.fn();
        act(() => {
            result.current.dialogProps.onClick({ stopPropagation });
        });

        expect(stopPropagation).toHaveBeenCalled();
    });

    // ── 9. Does not set up listeners when isOpen=false ──
    it('should not call onClose on Escape when isOpen is false', () => {
        const onClose = vi.fn();
        renderHook(() => useModalA11y({ onClose, isOpen: false }));

        act(() => {
            const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
            document.dispatchEvent(event);
        });

        expect(onClose).not.toHaveBeenCalled();
    });

    // ── 10. modalRef is a ref object ──
    it('should provide a modalRef that is a React ref object', () => {
        const { result } = renderHook(() => useModalA11y({ onClose: vi.fn() }));
        expect(result.current.modalRef).toHaveProperty('current');
    });
});

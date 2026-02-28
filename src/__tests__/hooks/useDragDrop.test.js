// frontend/src/__tests__/hooks/useDragDrop.test.js
// Tests for useDragDrop hook — drag enter/over/leave/drop events
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDragDrop from '../../hooks/useDragDrop';

// Helper: create a minimal DragEvent-like object
const createDragEvent = (files = []) => ({
    preventDefault: vi.fn(),
    stopPropagation: vi.fn(),
    dataTransfer: { files },
});

describe('useDragDrop', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    // ── 1. Initial state ──
    it('should start with isDragging=false', () => {
        const { result } = renderHook(() => useDragDrop());
        expect(result.current.isDragging).toBe(false);
    });

    // ── 2. Returns drag handlers ──
    it('should return all drag handler functions', () => {
        const { result } = renderHook(() => useDragDrop());
        const { dragHandlers } = result.current;
        expect(typeof dragHandlers.onDragEnter).toBe('function');
        expect(typeof dragHandlers.onDragOver).toBe('function');
        expect(typeof dragHandlers.onDragLeave).toBe('function');
        expect(typeof dragHandlers.onDrop).toBe('function');
    });

    // ── 3. dragEnter sets isDragging to true ──
    it('should set isDragging to true on dragEnter', () => {
        const { result } = renderHook(() => useDragDrop());

        act(() => {
            result.current.dragHandlers.onDragEnter(createDragEvent());
        });

        expect(result.current.isDragging).toBe(true);
    });

    // ── 4. dragLeave sets isDragging to false ──
    it('should set isDragging to false when all dragLeave events fire', () => {
        const { result } = renderHook(() => useDragDrop());

        act(() => {
            result.current.dragHandlers.onDragEnter(createDragEvent());
        });
        expect(result.current.isDragging).toBe(true);

        act(() => {
            result.current.dragHandlers.onDragLeave(createDragEvent());
        });
        expect(result.current.isDragging).toBe(false);
    });

    // ── 5. Nested drag enter/leave uses counter ──
    it('should handle nested drag enter/leave via counter', () => {
        const { result } = renderHook(() => useDragDrop());

        // Enter parent, then child = 2 enters
        act(() => {
            result.current.dragHandlers.onDragEnter(createDragEvent());
            result.current.dragHandlers.onDragEnter(createDragEvent());
        });
        expect(result.current.isDragging).toBe(true);

        // Leave child = counter 1, still dragging
        act(() => {
            result.current.dragHandlers.onDragLeave(createDragEvent());
        });
        expect(result.current.isDragging).toBe(true);

        // Leave parent = counter 0, not dragging
        act(() => {
            result.current.dragHandlers.onDragLeave(createDragEvent());
        });
        expect(result.current.isDragging).toBe(false);
    });

    // ── 6. dragOver prevents default ──
    it('should call preventDefault and stopPropagation on dragOver', () => {
        const { result } = renderHook(() => useDragDrop());
        const event = createDragEvent();

        act(() => {
            result.current.dragHandlers.onDragOver(event);
        });

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });

    // ── 7. onDrop calls callback with files ──
    it('should call onFilesDropped with dropped files', () => {
        const onFilesDropped = vi.fn();
        const { result } = renderHook(() => useDragDrop(onFilesDropped));

        const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' });
        const event = createDragEvent([mockFile]);

        act(() => {
            result.current.dragHandlers.onDragEnter(createDragEvent());
        });
        expect(result.current.isDragging).toBe(true);

        act(() => {
            result.current.dragHandlers.onDrop(event);
        });

        expect(result.current.isDragging).toBe(false);
        expect(onFilesDropped).toHaveBeenCalledWith([mockFile]);
    });

    // ── 8. onDrop resets isDragging even without files ──
    it('should reset isDragging on drop even with no files', () => {
        const { result } = renderHook(() => useDragDrop());

        act(() => {
            result.current.dragHandlers.onDragEnter(createDragEvent());
        });

        act(() => {
            result.current.dragHandlers.onDrop(createDragEvent([]));
        });

        expect(result.current.isDragging).toBe(false);
    });

    // ── 9. Does not call callback when no callback provided ──
    it('should not crash when no onFilesDropped callback is provided', () => {
        const { result } = renderHook(() => useDragDrop());

        const mockFile = new File(['a'], 'a.txt');
        const event = createDragEvent([mockFile]);

        expect(() => {
            act(() => {
                result.current.dragHandlers.onDrop(event);
            });
        }).not.toThrow();
    });

    // ── 10. onDrop prevents default and stops propagation ──
    it('should call preventDefault and stopPropagation on drop', () => {
        const { result } = renderHook(() => useDragDrop());
        const event = createDragEvent();

        act(() => {
            result.current.dragHandlers.onDrop(event);
        });

        expect(event.preventDefault).toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
    });
});

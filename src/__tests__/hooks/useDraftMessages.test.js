// frontend/src/__tests__/hooks/useDraftMessages.test.js
// Tests for useDraftMessages hook — auto-save, load, clear drafts via localStorage
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDraftMessages } from '../../hooks/useDraftMessages';

describe('useDraftMessages', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        // Reset mock implementations (setup.js provides localStorage mocks)
        localStorage.getItem.mockReset();
        localStorage.setItem.mockReset();
        localStorage.removeItem.mockReset();
        localStorage.clear.mockReset();
        // Default: getItem returns null (no saved draft)
        localStorage.getItem.mockReturnValue(null);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    // ── 1. Returns empty draft initially for new room ──
    it('should return empty draft for a room with no saved draft', () => {
        const { result } = renderHook(() => useDraftMessages('room-general'));
        expect(result.current.draft).toBe('');
        expect(result.current.hasDraft).toBe(false);
        expect(result.current.lastSaved).toBeNull();
    });

    // ── 2. Loads existing draft from localStorage ──
    it('should load existing draft from localStorage', () => {
        const saved = JSON.stringify({ content: 'Hello world', timestamp: new Date().toISOString() });
        localStorage.getItem.mockImplementation((key) => {
            if (key === 'pawscord_draft_room_room-general') return saved;
            return null;
        });

        const { result } = renderHook(() => useDraftMessages('room-general'));
        expect(result.current.draft).toBe('Hello world');
        expect(result.current.hasDraft).toBe(true);
    });

    // ── 3. setDraft updates draft text ──
    it('should update draft when setDraft is called', () => {
        const { result } = renderHook(() => useDraftMessages('room-general'));

        act(() => {
            result.current.setDraft('typing something...');
        });

        expect(result.current.draft).toBe('typing something...');
    });

    // ── 4. Auto-saves draft to localStorage after delay ──
    it('should auto-save draft to localStorage after 1 second', () => {
        const { result } = renderHook(() => useDraftMessages('room-general'));

        act(() => {
            result.current.setDraft('auto-save test');
        });

        // Advance past AUTO_SAVE_DELAY (1000ms)
        act(() => {
            vi.advanceTimersByTime(1100);
        });

        // Verify setItem was called with the correct key and draft content
        const setItemCalls = localStorage.setItem.mock.calls;
        const draftCall = setItemCalls.find(c => c[0] === 'pawscord_draft_room_room-general');
        expect(draftCall).toBeDefined();
        const parsed = JSON.parse(draftCall[1]);
        expect(parsed.content).toBe('auto-save test');
    });

    // ── 5. clearDraft removes from localStorage and resets state ──
    it('should clear draft from state and localStorage', () => {
        const { result } = renderHook(() => useDraftMessages('room-general'));

        act(() => {
            result.current.setDraft('some draft');
        });

        // Auto-save
        act(() => {
            vi.advanceTimersByTime(1100);
        });

        // Now clear
        act(() => {
            result.current.clearDraft();
        });

        expect(result.current.draft).toBe('');
        expect(result.current.hasDraft).toBe(false);
        expect(result.current.lastSaved).toBeNull();
        // Verify removeItem was called
        expect(localStorage.removeItem).toHaveBeenCalledWith('pawscord_draft_room_room-general');
    });

    // ── 6. hasDraft reflects if non-whitespace draft exists ──
    it('should report hasDraft as false for whitespace-only draft', () => {
        const { result } = renderHook(() => useDraftMessages('room-general'));

        act(() => {
            result.current.setDraft('   ');
        });

        expect(result.current.hasDraft).toBe(false);
    });

    // ── 7. Uses conversation key for DMs ──
    it('should use conversation-based key for DMs', () => {
        const saved = JSON.stringify({ content: 'DM draft', timestamp: new Date().toISOString() });
        localStorage.getItem.mockImplementation((key) => {
            if (key === 'pawscord_draft_conv_42') return saved;
            return null;
        });

        const { result } = renderHook(() => useDraftMessages(null, 42));
        expect(result.current.draft).toBe('DM draft');
    });

    // ── 8. Reloads draft when room changes ──
    it('should reload draft when roomId changes', () => {
        const room2Data = JSON.stringify({ content: 'Room 2 draft', timestamp: new Date().toISOString() });
        localStorage.getItem.mockImplementation((key) => {
            if (key === 'pawscord_draft_room_room-2') return room2Data;
            return null;
        });

        const { result, rerender } = renderHook(
            ({ roomId }) => useDraftMessages(roomId),
            { initialProps: { roomId: 'room-1' } }
        );

        expect(result.current.draft).toBe('');

        rerender({ roomId: 'room-2' });
        expect(result.current.draft).toBe('Room 2 draft');
    });

    // ── 9. Handles corrupt localStorage data ──
    it('should handle corrupt JSON in localStorage gracefully', () => {
        localStorage.getItem.mockReturnValue('not-valid-json{{{');

        const { result } = renderHook(() => useDraftMessages('room-broken'));
        // Should fall back to the raw string rather than crash
        expect(result.current.draft).toBeDefined();
    });

    // ── 10. Empty draft calls removeItem ──
    it('should call removeItem when draft is cleared to empty', () => {
        const { result } = renderHook(() => useDraftMessages('room-clean'));

        act(() => {
            result.current.setDraft('temp');
        });
        act(() => {
            vi.advanceTimersByTime(1100);
        });
        expect(localStorage.setItem).toHaveBeenCalled();

        // Clear the draft
        localStorage.removeItem.mockClear();
        act(() => {
            result.current.setDraft('');
        });
        act(() => {
            vi.advanceTimersByTime(1100);
        });
        expect(localStorage.removeItem).toHaveBeenCalledWith('pawscord_draft_room_room-clean');
    });
});

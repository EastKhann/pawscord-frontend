// frontend/src/__tests__/hooks/useKeyboardShortcuts.test.js
// Tests for useKeyboardShortcuts hook
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useKeyboardShortcuts, getShortcutKey, SHORTCUTS } from '../../hooks/useKeyboardShortcuts';

describe('useKeyboardShortcuts', () => {
    const fireKeyDown = (options) => {
        act(() => {
            const event = new KeyboardEvent('keydown', { bubbles: true, ...options });
            // KeyboardEvent constructor doesn't set ctrlKey etc via options in all envs
            // so we dispatch with overrides
            Object.defineProperty(event, 'ctrlKey', { value: options.ctrlKey ?? false });
            Object.defineProperty(event, 'shiftKey', { value: options.shiftKey ?? false });
            Object.defineProperty(event, 'altKey', { value: options.altKey ?? false });
            Object.defineProperty(event, 'metaKey', { value: options.metaKey ?? false });
            Object.defineProperty(event, 'key', { value: options.key ?? '' });
            window.dispatchEvent(event);
        });
    };

    beforeEach(() => {
        // Mock navigator.platform to Windows (non-Mac)
        Object.defineProperty(navigator, 'platform', {
            value: 'Win32',
            writable: true,
            configurable: true,
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    // ── 1. Ctrl+K triggers onQuickSwitcher ──
    it('should call onQuickSwitcher on Ctrl+K', () => {
        const onQuickSwitcher = vi.fn();
        renderHook(() => useKeyboardShortcuts({ onQuickSwitcher }));

        fireKeyDown({ key: 'k', ctrlKey: true });
        expect(onQuickSwitcher).toHaveBeenCalledTimes(1);
    });

    // ── 2. Ctrl+F triggers onSearch ──
    it('should call onSearch on Ctrl+F', () => {
        const onSearch = vi.fn();
        renderHook(() => useKeyboardShortcuts({ onSearch }));

        fireKeyDown({ key: 'f', ctrlKey: true });
        expect(onSearch).toHaveBeenCalledTimes(1);
    });

    // ── 3. Escape triggers onEscape ──
    it('should call onEscape on Escape key', () => {
        const onEscape = vi.fn();
        renderHook(() => useKeyboardShortcuts({ onEscape }));

        fireKeyDown({ key: 'Escape' });
        expect(onEscape).toHaveBeenCalledTimes(1);
    });

    // ── 4. Ctrl+Shift+M triggers onToggleMute ──
    it('should call onToggleMute on Ctrl+Shift+M', () => {
        const onToggleMute = vi.fn();
        renderHook(() => useKeyboardShortcuts({ onToggleMute }));

        fireKeyDown({ key: 'M', ctrlKey: true, shiftKey: true });
        expect(onToggleMute).toHaveBeenCalledTimes(1);
    });

    // ── 5. Ctrl+B triggers onToggleSidebar ──
    it('should call onToggleSidebar on Ctrl+B', () => {
        const onToggleSidebar = vi.fn();
        renderHook(() => useKeyboardShortcuts({ onToggleSidebar }));

        fireKeyDown({ key: 'b', ctrlKey: true });
        expect(onToggleSidebar).toHaveBeenCalledTimes(1);
    });

    // ── 6. Alt+ArrowUp triggers onNavigateChannel(-1) ──
    it('should call onNavigateChannel(-1) on Alt+ArrowUp', () => {
        const onNavigateChannel = vi.fn();
        renderHook(() => useKeyboardShortcuts({ onNavigateChannel }));

        fireKeyDown({ key: 'ArrowUp', altKey: true });
        expect(onNavigateChannel).toHaveBeenCalledWith(-1);
    });

    // ── 7. Alt+ArrowDown triggers onNavigateChannel(1) ──
    it('should call onNavigateChannel(1) on Alt+ArrowDown', () => {
        const onNavigateChannel = vi.fn();
        renderHook(() => useKeyboardShortcuts({ onNavigateChannel }));

        fireKeyDown({ key: 'ArrowDown', altKey: true });
        expect(onNavigateChannel).toHaveBeenCalledWith(1);
    });

    // ── 8. Ctrl+Enter triggers onSendMessage ──
    it('should call onSendMessage on Ctrl+Enter', () => {
        const onSendMessage = vi.fn();
        renderHook(() => useKeyboardShortcuts({ onSendMessage }));

        fireKeyDown({ key: 'Enter', ctrlKey: true });
        expect(onSendMessage).toHaveBeenCalledTimes(1);
    });

    // ── 9. Does not fire handler for unregistered handler ──
    it('should not throw when handler is not provided', () => {
        renderHook(() => useKeyboardShortcuts({}));

        expect(() => {
            fireKeyDown({ key: 'k', ctrlKey: true });
        }).not.toThrow();
    });

    // ── 10. Cleans up event listner on unmount ──
    it('should remove keydown listner on unmount', () => {
        const onEscape = vi.fn();
        const { unmount } = renderHook(() => useKeyboardShortcuts({ onEscape }));

        unmount();

        // After unmount, the handler should not fire
        fireKeyDown({ key: 'Escape' });
        expect(onEscape).not.toHaveBeenCalled();
    });
});

// ── SHORTCUTS constant tests ──
describe('SHORTCUTS', () => {
    it('should have QUICK_SWITCHER shortcut defined', () => {
        expect(SHORTCUTS.QUICK_SWITCHER).toBeDefined();
        expect(SHORTCUTS.QUICK_SWITCHER.key).toBe('K');
        expect(SHORTCUTS.QUICK_SWITCHER.modifier).toBe('Ctrl');
    });

    it('should have CLOSE shortcut with Esc key', () => {
        expect(SHORTCUTS.CLOSE.key).toBe('Esc');
        expect(SHORTCUTS.CLOSE.modifier).toBe('');
    });

    it('should have all expected shortcut entries', () => {
        const expectedKeys = [
            'QUICK_SWITCHER',
            'SEARCH',
            'COMMAND_LIST',
            'MUTE',
            'DEAFEN',
            'NAVIGATE_UP',
            'NAVIGATE_DOWN',
            'SEND_MESSAGE',
            'CLOSE',
            'TOGGLE_SIDEBAR',
            'TOGGLE_USER_INFO',
            'TOGGLE_EMOJI',
            'TOGGLE_THEME',
            'EDIT_LAST',
        ];
        expectedKeys.forEach((key) => {
            expect(SHORTCUTS[key]).toBeDefined();
            expect(SHORTCUTS[key]).toHaveProperty('key');
            expect(SHORTCUTS[key]).toHaveProperty('description');
        });
    });
});

// ── getShortcutKey tests ──
describe('getShortcutKey', () => {
    it('should return Ctrl for Windows platform', () => {
        Object.defineProperty(navigator, 'platform', { value: 'Win32', configurable: true });
        expect(getShortcutKey()).toBe('Ctrl');
    });

    it('should return ⌘ for Mac platform', () => {
        Object.defineProperty(navigator, 'platform', { value: 'MacIntel', configurable: true });
        expect(getShortcutKey()).toBe('⌘');
    });
});

// hooks/useKeyboardShortcuts.js
// ⌨️ Keyboard Shortcuts Hook - Power User Features

import { useEffect, useCallback } from 'react';

export const useKeyboardShortcuts = (handlers = {}) => {
  const handleKeyDown = useCallback((event) => {
    const { ctrlKey, shiftKey, altKey, metaKey, key } = event;
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const cmdOrCtrl = isMac ? metaKey : ctrlKey;

    // Ctrl/Cmd + K: Quick Switcher
    if (cmdOrCtrl && key === 'k') {
      event.preventDefault();
      handlers.onQuickSwitcher?.();
    }

    // Ctrl/Cmd + F: Advanced Search
    if (cmdOrCtrl && key === 'f') {
      event.preventDefault();
      handlers.onSearch?.();
    }

    // Ctrl/Cmd + /: Command List
    if (cmdOrCtrl && key === '/') {
      event.preventDefault();
      handlers.onCommandList?.();
    }

    // Ctrl/Cmd + Shift + M: Mute/Unmute
    if (cmdOrCtrl && shiftKey && key === 'M') {
      event.preventDefault();
      handlers.onToggleMute?.();
    }

    // Ctrl/Cmd + Shift + D: Deafen/Undeafen
    if (cmdOrCtrl && shiftKey && key === 'D') {
      event.preventDefault();
      handlers.onToggleDeafen?.();
    }

    // Alt + Up/Down: Navigate Channels
    if (altKey && (key === 'ArrowUp' || key === 'ArrowDown')) {
      event.preventDefault();
      handlers.onNavigateChannel?.(key === 'ArrowUp' ? -1 : 1);
    }

    // Ctrl/Cmd + Enter: Send Message
    if (cmdOrCtrl && key === 'Enter') {
      event.preventDefault();
      handlers.onSendMessage?.();
    }

    // Esc: Close Modal/Cancel
    if (key === 'Escape') {
      handlers.onEscape?.();
    }

    // Ctrl/Cmd + B: Toggle Sidebar
    if (cmdOrCtrl && key === 'b') {
      event.preventDefault();
      handlers.onToggleSidebar?.();
    }

    // Ctrl/Cmd + I: Toggle User Info
    if (cmdOrCtrl && key === 'i') {
      event.preventDefault();
      handlers.onToggleUserInfo?.();
    }

    // Ctrl/Cmd + E: Toggle Emoji Picker
    if (cmdOrCtrl && key === 'e') {
      event.preventDefault();
      handlers.onToggleEmoji?.();
    }

    // Ctrl/Cmd + Shift + T: Toggle Theme
    if (cmdOrCtrl && shiftKey && key === 'T') {
      event.preventDefault();
      handlers.onToggleTheme?.();
    }

    // Up Arrow: Edit Last Message (when input is empty)
    if (key === 'ArrowUp' && !cmdOrCtrl && !shiftKey && !altKey) {
      handlers.onEditLastMessage?.();
    }

  }, [handlers]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
};

// Shortcut display helper
export const getShortcutKey = () => {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  return isMac ? '⌘' : 'Ctrl';
};

export const SHORTCUTS = {
  QUICK_SWITCHER: { key: 'K', modifier: 'Ctrl', description: 'Quick Switcher' },
  SEARCH: { key: 'F', modifier: 'Ctrl', description: 'Search Messages' },
  COMMAND_LIST: { key: '/', modifier: 'Ctrl', description: 'Show Commands' },
  MUTE: { key: 'M', modifier: 'Ctrl+Shift', description: 'Mute/Unmute' },
  DEAFEN: { key: 'D', modifier: 'Ctrl+Shift', description: 'Deafen/Undeafen' },
  NAVIGATE_UP: { key: '↑', modifier: 'Alt', description: 'Previous Channel' },
  NAVIGATE_DOWN: { key: '↓', modifier: 'Alt', description: 'Next Channel' },
  SEND_MESSAGE: { key: 'Enter', modifier: 'Ctrl', description: 'Send Message' },
  CLOSE: { key: 'Esc', modifier: '', description: 'Close/Cancel' },
  TOGGLE_SIDEBAR: { key: 'B', modifier: 'Ctrl', description: 'Toggle Sidebar' },
  TOGGLE_USER_INFO: { key: 'I', modifier: 'Ctrl', description: 'Toggle User Info' },
  TOGGLE_EMOJI: { key: 'E', modifier: 'Ctrl', description: 'Toggle Emoji' },
  TOGGLE_THEME: { key: 'T', modifier: 'Ctrl+Shift', description: 'Toggle Theme' },
  EDIT_LAST: { key: '↑', modifier: '', description: 'Edit Last Message' }
};

export default useKeyboardShortcuts;




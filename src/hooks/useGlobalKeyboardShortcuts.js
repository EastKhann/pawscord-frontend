// frontend/src/hooks/useGlobalKeyboardShortcuts.js

/**
 * ⌨️ Global Keyboard Shortcuts Hook
 * Ctrl+K for search, Esc for close, etc.
 */

import { useEffect, useCallback } from 'react';

const useGlobalKeyboardShortcuts = (callbacks = {}) => {
    const {
        onSearch,      // Ctrl+K / Cmd+K
        onNewMessage,  // Ctrl+N
        onSettings,    // Ctrl+,
        onToggleMute,  // Ctrl+M
        onEscape      // Esc
    } = callbacks;

    const handleKeyDown = useCallback((e) => {
        // Check if user is typing in an input
        const isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName);

        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const ctrlKey = isMac ? e.metaKey : e.ctrlKey;

        // Ctrl/Cmd + K → Global Search (works even in input)
        if (ctrlKey && e.key === 'k') {
            e.preventDefault();
            onSearch?.();
            return;
        }

        // Don't trigger other shortcuts if typing
        if (isTyping && e.key !== 'Escape') return;

        // Ctrl/Cmd + N → New Message
        if (ctrlKey && e.key === 'n') {
            e.preventDefault();
            onNewMessage?.();
        }

        // Ctrl/Cmd + , → Settings
        if (ctrlKey && e.key === ',') {
            e.preventDefault();
            onSettings?.();
        }

        // Ctrl/Cmd + M → Toggle Mute
        if (ctrlKey && e.key === 'm') {
            e.preventDefault();
            onToggleMute?.();
        }

        // Escape → Close
        if (e.key === 'Escape') {
            onEscape?.();
        }
    }, [onSearch, onNewMessage, onSettings, onToggleMute, onEscape]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
};

export default useGlobalKeyboardShortcuts;



// frontend/src/utils/keyboardShortcuts.js

/**
 * ⌨️ Keyboard Shortcuts Manager
 * Global keyboard shortcut sistemi
 */

class KeyboardShortcutManager {
    constructor() {
        this.shortcuts = new Map();
        this.isEnabled = true;
        this.pressedKeys = new Set();

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));

        // Blur event'lerinde temizle
        window.addEventListener('blur', () => this.pressedKeys.clear());
    }

    /**
     * Key down handler
     */
    handleKeyDown(event) {
        if (!this.isEnabled) return;

        // Input, textarea, contenteditable içinde değilse
        if (this.isInputElement(event.target)) return;

        // Key'i kaydet
        this.pressedKeys.add(event.key.toLowerCase());

        // Shortcut'ı kontrol et
        const shortcut = this.getShortcutString(event);
        const handler = this.shortcuts.get(shortcut);

        if (handler) {
            event.preventDefault();
            handler.callback(event);

            if (import.meta.env.MODE === 'development') {
            }
        }
    }

    /**
     * Key up handler
     */
    handleKeyUp(event) {
        this.pressedKeys.delete(event.key.toLowerCase());
    }

    /**
     * Input element kontrolü
     */
    isInputElement(element) {
        return ['INPUT', 'TEXTAREA'].includes(element.tagName) ||
            element.contentEditable === 'true';
    }

    /**
     * Shortcut string oluştur
     */
    getShortcutString(event) {
        const parts = [];

        if (event.ctrlKey || event.metaKey) parts.push('ctrl');
        if (event.altKey) parts.push('alt');
        if (event.shiftKey) parts.push('shift');

        const key = event.key.toLowerCase();
        if (!['control', 'alt', 'shift', 'meta'].includes(key)) {
            parts.push(key);
        }

        return parts.join('+');
    }

    /**
     * Shortcut ekle
     */
    register(shortcut, callback, description = '') {
        const normalized = this.normalizeShortcut(shortcut);

        this.shortcuts.set(normalized, {
            callback,
            description,
            shortcut: normalized
        });

        if (import.meta.env.MODE === 'development') {
        }

        return () => this.unregister(normalized);
    }

    /**
     * Shortcut'ı normalize et
     */
    normalizeShortcut(shortcut) {
        return shortcut.toLowerCase()
            .replace('cmd', 'ctrl')
            .replace('command', 'ctrl')
            .split('+')
            .map(s => s.trim())
            .sort()
            .join('+');
    }

    /**
     * Shortcut kaldır
     */
    unregister(shortcut) {
        const normalized = this.normalizeShortcut(shortcut);
        this.shortcuts.delete(normalized);

        if (import.meta.env.MODE === 'development') {
        }
    }

    /**
     * Tüm shortcut'ları kaldır
     */
    unregisterAll() {
        this.shortcuts.clear();
    }

    /**
     * Enable/disable
     */
    enable() {
        this.isEnabled = true;
    }

    disable() {
        this.isEnabled = false;
    }

    toggle() {
        this.isEnabled = !this.isEnabled;
    }

    /**
     * Tüm shortcut'ları listele
     */
    list() {
        const shortcuts = [];
        this.shortcuts.forEach((value, key) => {
            shortcuts.push({
                shortcut: key,
                description: value.description
            });
        });
        return shortcuts;
    }

    /**
     * Help modal için formatlanmış liste
     */
    getFormattedList() {
        const groups = {
            navigation: [],
            editing: [],
            actions: [],
            other: []
        };

        this.shortcuts.forEach((value, key) => {
            const formatted = {
                keys: this.formatShortcutForDisplay(key),
                description: value.description
            };

            // Kategorize et
            if (value.description.toLowerCase().includes('navigate') ||
                value.description.toLowerCase().includes('go to')) {
                groups.navigation.push(formatted);
            } else if (value.description.toLowerCase().includes('edit') ||
                value.description.toLowerCase().includes('delete')) {
                groups.editing.push(formatted);
            } else if (value.description.toLowerCase().includes('send') ||
                value.description.toLowerCase().includes('save')) {
                groups.actions.push(formatted);
            } else {
                groups.other.push(formatted);
            }
        });

        return groups;
    }

    /**
     * Shortcut'ı görsel olarak formatla
     */
    formatShortcutForDisplay(shortcut) {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;

        return shortcut
            .split('+')
            .map(key => {
                if (key === 'ctrl') return isMac ? '⌘' : 'Ctrl';
                if (key === 'alt') return isMac ? '⌥' : 'Alt';
                if (key === 'shift') return isMac ? '⇧' : 'Shift';
                return key.toUpperCase();
            })
            .join(' + ');
    }
}

// Global instance
export const keyboardManager = new KeyboardShortcutManager();

/**
 * Önceden tanımlanmış shortcut'ları kaydet
 */
export const registerDefaultShortcuts = (handlers = {}) => {
    // Navigation
    if (handlers.goToFriends) {
        keyboardManager.register('ctrl+1', handlers.goToFriends, 'Go to Friends');
    }
    if (handlers.goToServers) {
        keyboardManager.register('ctrl+2', handlers.goToServers, 'Go to Servers');
    }
    if (handlers.goToSettings) {
        keyboardManager.register('ctrl+,', handlers.goToSettings, 'Open Settings');
    }

    // Search
    if (handlers.search) {
        keyboardManager.register('ctrl+k', handlers.search, 'Search messages');
        keyboardManager.register('ctrl+f', handlers.search, 'Search messages');
    }

    // Message actions
    if (handlers.sendMessage) {
        keyboardManager.register('enter', handlers.sendMessage, 'Send message');
    }
    if (handlers.newLine) {
        keyboardManager.register('shift+enter', handlers.newLine, 'New line');
    }
    if (handlers.editLastMessage) {
        keyboardManager.register('arrowup', handlers.editLastMessage, 'Edit last message');
    }

    // Clipboard
    if (handlers.copy) {
        keyboardManager.register('ctrl+c', handlers.copy, 'Copy selected text');
    }
    if (handlers.paste) {
        keyboardManager.register('ctrl+v', handlers.paste, 'Paste from clipboard');
    }

    // Window actions
    if (handlers.closeModal) {
        keyboardManager.register('escape', handlers.closeModal, 'Close modal/dialog');
    }
    if (handlers.toggleDevTools) {
        keyboardManager.register('ctrl+shift+i', handlers.toggleDevTools, 'Toggle DevTools');
    }

    // Help
    if (handlers.showHelp) {
        keyboardManager.register('ctrl+/', handlers.showHelp, 'Show keyboard shortcuts');
        keyboardManager.register('ctrl+shift+/', handlers.showHelp, 'Show keyboard shortcuts');
    }

    // Voice
    if (handlers.toggleMute) {
        keyboardManager.register('ctrl+shift+m', handlers.toggleMute, 'Toggle mute');
    }
    if (handlers.toggleDeafen) {
        keyboardManager.register('ctrl+shift+d', handlers.toggleDeafen, 'Toggle deafen');
    }

};

/**
 * React Hook
 */
export const useKeyboardShortcut = (shortcut, callback, options = {}) => {
    const { enabled = true, description = '' } = options;

    React.useEffect(() => {
        if (!enabled) return;

        const unregister = keyboardManager.register(shortcut, callback, description);
        return unregister;
    }, [shortcut, callback, enabled, description]);
};

/**
 * Multiple shortcuts hook
 */
export const useKeyboardShortcuts = (shortcuts) => {
    React.useEffect(() => {
        const unregisterFns = [];

        Object.entries(shortcuts).forEach(([shortcut, config]) => {
            const { callback, description = '', enabled = true } = config;

            if (enabled) {
                const unregister = keyboardManager.register(shortcut, callback, description);
                unregisterFns.push(unregister);
            }
        });

        return () => {
            unregisterFns.forEach(fn => fn());
        };
    }, [shortcuts]);
};

/**
 * Command Palette Helper
 */
export class CommandPalette {
    constructor() {
        this.commands = new Map();
    }

    register(id, command) {
        this.commands.set(id, {
            id,
            label: command.label,
            description: command.description,
            keywords: command.keywords || [],
            action: command.action,
            shortcut: command.shortcut,
            icon: command.icon
        });

        // Shortcut varsa kaydet
        if (command.shortcut) {
            keyboardManager.register(command.shortcut, command.action, command.label);
        }
    }

    unregister(id) {
        const command = this.commands.get(id);
        if (command?.shortcut) {
            keyboardManager.unregister(command.shortcut);
        }
        this.commands.delete(id);
    }

    search(query) {
        const lowerQuery = query.toLowerCase();
        const results = [];

        this.commands.forEach(command => {
            const labelMatch = command.label.toLowerCase().includes(lowerQuery);
            const descMatch = command.description?.toLowerCase().includes(lowerQuery);
            const keywordMatch = command.keywords.some(k => k.toLowerCase().includes(lowerQuery));

            if (labelMatch || descMatch || keywordMatch) {
                results.push(command);
            }
        });

        return results;
    }

    getAll() {
        return Array.from(this.commands.values());
    }
}

export const commandPalette = new CommandPalette();

export default KeyboardShortcutManager;



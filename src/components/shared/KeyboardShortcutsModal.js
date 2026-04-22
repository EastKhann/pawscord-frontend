// frontend/src/components/KeyboardShortcutsModal.js
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaKeyboard, FaSearch } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';

const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery] = useState('');
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen,
        label: 'Keyboard Shortcuts',
    });

    const KEYBOARD_SHORTCUTS = [
        {
            category: t('shortcuts.general'),
            shortcuts: [
                { keys: ['Ctrl', 'K'], description: t('ui.hizli_gecis_search') },
                { keys: ['Ctrl', ','], description: t('shortcuts.userSettings') },
                { keys: ['Ctrl', '/'], description: t('shortcuts.title') },
                { keys: ['Ctrl', 'Shift', 'P'], description: t('shortcuts.commandPalette') },
                { keys: ['Escape'], description: t('shortcuts.closePanel') },
            ],
        },
        {
            category: t('ui.mesajlasma'),
            shortcuts: [
                { keys: ['Enter'], description: t('shortcuts.sendMessage') },
                { keys: ['Shift', 'Enter'], description: t('settings.tabs.keybinds.newLine') },
                { keys: ['↑'], description: t('shortcuts.editLastMessage') },
                { keys: ['Ctrl', 'E'], description: t('shortcuts.emojiPicker') },
            ],
        },
        {
            category: t('shortcuts.navigation'),
            shortcuts: [
                { keys: ['Alt', '↑'], description: t('shortcuts.previousChannel') },
                { keys: ['Alt', '↓'], description: t('shortcuts.nextChannel') },
                { keys: ['Ctrl', 'Shift', 'U'], description: t('shortcuts.fileUpload') },
            ],
        },
        {
            category: t('shortcuts.voice'),
            shortcuts: [
                { keys: ['Ctrl', 'Shift', 'M'], description: t('shortcuts.toggleMic') },
                { keys: ['Ctrl', 'Shift', 'D'], description: t('ui.sagir_modu') },
            ],
        },
    ];
    if (typeof isOpen !== 'undefined' && !isOpen) return null;

    const renderKey = (key) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const displayKey = key === 'Ctrl' && isMac ? '⌘' : key;

        return <kbd style={styles.key}>{displayKey}</kbd>;
    };

    const q = searchQuery.toLowerCase().trim();
    const filteredShortcuts = q
        ? KEYBOARD_SHORTCUTS.map((cat) => ({
            ...cat,
            shortcuts: cat.shortcuts.filter(
                (s) =>
                    s.description.toLowerCase().includes(q) ||
                    s.keys.some((k) => k.toLowerCase().includes(q))
            ),
        })).filter((cat) => cat.shortcuts.length > 0)
        : KEYBOARD_SHORTCUTS;

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <div style={styles.headerTitle}>
                        <FaKeyboard style={styles.headerIcon} />
                        <h2>{t('shortcuts.title')}</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.searchBar}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        type="search"
                        placeholder={t('shortcuts.searchPlaceholder', 'Kısayol ara...')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                        aria-label={t('shortcuts.searchPlaceholder', 'Kısayol ara...')}
                        autoComplete="off"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            style={styles.clearSearch}
                            aria-label={t('common.clear', 'Temizle')}
                        >
                            <FaTimes size={10} />
                        </button>
                    )}
                </div>

                <div style={styles.content}>
                    {filteredShortcuts.length === 0 ? (
                        <div style={styles.noResults}>{t('shortcuts.noResults', 'Sonuç bulunamadı')}</div>
                    ) : (
                        filteredShortcuts.map((category, idx) => (
                            <div key={`item-${idx}`} style={styles.category}>
                                <h3 style={styles.categoryTitle}>{category.category}</h3>
                                <div style={styles.shortcutList}>
                                    {category.shortcuts.map((shortcut, i) => (
                                        <div key={`item-${i}`} style={styles.shortcutItem}>
                                            <div style={styles.shortcutKeys}>
                                                {shortcut.keys.map((key, j) => (
                                                    <React.Fragment key={j}>
                                                        {renderKey(key)}
                                                        {j < shortcut.keys.length - 1 && (
                                                            <span style={styles.plus}>+</span>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                            <div style={styles.shortcutDescription}>
                                                {shortcut.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        <strong>{t('shortcuts.tip')}:</strong> {t('shortcuts.openAnytimeHint')}
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        animation: 'fadeIn 0.2s ease',
    },
    modal: {
        backgroundColor: '#17191c',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 8px 16px rgba(0,0,0,0.24)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #0b0e1b',
        backgroundColor: '#111214',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#fff',
    },
    headerIcon: {
        fontSize: '24px',
        color: '#5865f2',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '4px',
        transition: 'color 0.2s',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
    },
    category: {
        marginBottom: '32px',
    },
    categoryTitle: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '16px',
        paddingBottom: '8px',
        borderBottom: '2px solid #5865f2',
    },
    shortcutList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    shortcutItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#111214',
        borderRadius: '4px',
        transition: 'background 0.2s',
    },
    shortcutKeys: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        minWidth: '200px',
    },
    key: {
        display: 'inline-block',
        padding: '4px 8px',
        backgroundColor: '#0d0e10',
        border: '1px solid #404040',
        borderRadius: '4px',
        color: '#dbdee1',
        fontSize: '13px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        minWidth: '32px',
        textAlign: 'center',
    },
    plus: {
        color: '#b5bac1',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    shortcutDescription: {
        color: '#dbdee1',
        fontSize: '14px',
        flex: 1,
        textAlign: 'right',
    },
    footer: {
        padding: '16px 24px',
        borderTop: '1px solid #0b0e1b',
        backgroundColor: '#111214',
    },
    footerText: {
        color: '#b5bac1',
        fontSize: '13px',
        margin: 0,
        textAlign: 'center',
    },
    searchBar: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: '#111214',
        position: 'relative',
    },
    searchIcon: {
        color: '#80848e',
        flexShrink: 0,
        fontSize: '13px',
    },
    searchInput: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#dbdee1',
        fontSize: '14px',
        padding: '2px 0',
        fontFamily: "'gg sans', 'Noto Sans', sans-serif",
    },
    clearSearch: {
        background: 'none',
        border: 'none',
        color: '#80848e',
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
    },
    noResults: {
        color: '#80848e',
        textAlign: 'center',
        padding: '40px 0',
        fontSize: '14px',
    },
};

// Add animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .shortcutItem:hover {
        background-color: #3a3d44 !important;
    }
`;
document.head.appendChild(styleSheet);

KeyboardShortcutsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
export default KeyboardShortcutsModal;

// frontend/src/components/KeyboardShortcutsModal.js
import React from 'react';
import { FaTimes, FaKeyboard } from 'react-icons/fa';
import { KEYBOARD_SHORTCUTS } from '../hooks/useKeyboardShortcuts';

const KeyboardShortcutsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const renderKey = (key) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const displayKey = key === 'Ctrl' && isMac ? '⌘' : key;

        return (
            <kbd style={styles.key}>{displayKey}</kbd>
        );
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerTitle}>
                        <FaKeyboard style={styles.headerIcon} />
                        <h2>Klavye Kısayolları</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {KEYBOARD_SHORTCUTS.map((category, idx) => (
                        <div key={idx} style={styles.category}>
                            <h3 style={styles.categoryTitle}>{category.category}</h3>
                            <div style={styles.shortcutList}>
                                {category.shortcuts.map((shortcut, i) => (
                                    <div key={i} style={styles.shortcutItem}>
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
                    ))}
                </div>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        <strong>İpucu:</strong> Herhangi bir zamanda <kbd style={styles.key}>Ctrl</kbd> + <kbd style={styles.key}>/</kbd> ile bu pencereyi açabilirsiniz
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
        backgroundColor: '#36393f',
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
        borderBottom: '1px solid #202225',
        backgroundColor: '#2f3136',
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
        color: '#b9bbbe',
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
        backgroundColor: '#2f3136',
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
        backgroundColor: '#202225',
        border: '1px solid #404040',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '13px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        minWidth: '32px',
        textAlign: 'center',
    },
    plus: {
        color: '#b9bbbe',
        fontSize: '12px',
        fontWeight: 'bold',
    },
    shortcutDescription: {
        color: '#dcddde',
        fontSize: '14px',
        flex: 1,
        textAlign: 'right',
    },
    footer: {
        padding: '16px 24px',
        borderTop: '1px solid #202225',
        backgroundColor: '#2f3136',
    },
    footerText: {
        color: '#b9bbbe',
        fontSize: '13px',
        margin: 0,
        textAlign: 'center',
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

export default KeyboardShortcutsModal;




// frontend/src/components/KeyboardShortcutsPanel.js
import React from 'react';
import { FaTimes, FaKeyboard } from 'react-icons/fa';

/**
 * ⌨️ Keyboard Shortcuts Help Panel
 * Kullanıcıya tüm klavye kısayollarını gösterir
 */
const KeyboardShortcutsPanel = ({ onClose }) => {
    const shortcuts = [
        { category: 'Gezinme', items: [
            { key: 'Ctrl + K', description: 'Hızlı ara' },
            { key: 'Ctrl + /', description: 'Bu menüyü aç' },
            { key: 'Alt + ↑/↓', description: 'Kanallar arası geç' },
            { key: 'Esc', description: 'Mevcut pencereyi kapat' },
        ]},
        { category: 'Mesajlaşma', items: [
            { key: 'Enter', description: 'Mesaj gönder' },
            { key: 'Shift + Enter', description: 'Yeni satır ekle' },
            { key: 'Ctrl + B', description: 'Kalın yazı' },
            { key: 'Ctrl + I', description: 'İtalik yazı' },
            { key: 'Ctrl + U', description: 'Altı çizili yazı' },
            { key: 'Ctrl + V', description: 'Dosya yapıştır' },
        ]},
        { category: 'Arama', items: [
            { key: 'Ctrl + F', description: 'Mesajlarda ara' },
            { key: 'Ctrl + G', description: 'GIF ara' },
            { key: 'Ctrl + E', description: 'Emoji seç' },
        ]},
        { category: 'Sesli/Görüntülü', items: [
            { key: 'Ctrl + Shift + M', description: 'Mikrofonu aç/kapat' },
            { key: 'Ctrl + Shift + D', description: 'Kulaklığı aç/kapat' },
            { key: 'Ctrl + Shift + V', description: 'Kamerayı aç/kapat' },
        ]},
        { category: 'İşaretler', items: [
            { key: 'Ctrl + D', description: 'Mesajı kaydet' },
            { key: 'Ctrl + S', description: 'Mesajı yıldızla' },
        ]}
    ];

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.panel} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaKeyboard style={styles.headerIcon} />
                        <h2 style={styles.title}>Klavye Kısayolları</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {shortcuts.map((category, idx) => (
                        <div key={idx} style={styles.category}>
                            <h3 style={styles.categoryTitle}>{category.category}</h3>
                            <div style={styles.shortcutList}>
                                {category.items.map((shortcut, i) => (
                                    <div key={i} style={styles.shortcutItem}>
                                        <div style={styles.key}>
                                            {shortcut.key.split(' + ').map((k, j) => (
                                                <React.Fragment key={j}>
                                                    {j > 0 && <span style={styles.plus}>+</span>}
                                                    <kbd style={styles.kbd}>{k}</kbd>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div style={styles.description}>{shortcut.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        💡 İpucu: Bu menüyü açmak için <kbd style={styles.kbd}>Ctrl</kbd> + <kbd style={styles.kbd}>/</kbd> tuşlarına basın
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        backdropFilter: 'blur(5px)'
    },
    panel: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerIcon: {
        fontSize: '24px',
        color: '#5865f2'
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '24px',
        fontWeight: '600'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '24px',
        padding: '8px',
        borderRadius: '4px',
        transition: 'all 0.2s'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '24px'
    },
    category: {
        marginBottom: '8px'
    },
    categoryTitle: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    shortcutList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    shortcutItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: '#1e1f22',
        borderRadius: '6px'
    },
    key: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    kbd: {
        backgroundColor: '#40444b',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontFamily: 'monospace',
        fontWeight: '600',
        border: '1px solid #1e1f22',
        boxShadow: '0 2px 0 rgba(0,0,0,0.3)'
    },
    plus: {
        color: '#b9bbbe',
        fontSize: '12px',
        margin: '0 2px'
    },
    description: {
        color: '#b9bbbe',
        fontSize: '14px'
    },
    footer: {
        padding: '16px 20px',
        borderTop: '1px solid #1e1f22',
        backgroundColor: '#1e1f22'
    },
    footerText: {
        margin: 0,
        color: '#b9bbbe',
        fontSize: '13px',
        textAlign: 'center'
    }
};

export default KeyboardShortcutsPanel;



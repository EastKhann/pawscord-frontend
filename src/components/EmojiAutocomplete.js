// frontend/src/components/EmojiAutocomplete.js
import React, { useState, useEffect, useRef } from 'react';

/**
 * 😊 Emoji Autocomplete
 * Discord tarzı :smile: yazınca emoji önerisi
 */

// Popüler emojiler listesi
const EMOJI_LIST = [
    { name: 'smile', emoji: '😊', keywords: ['happy', 'smile', 'gülümseme'] },
    { name: 'laugh', emoji: '😂', keywords: ['laugh', 'lol', 'gülme'] },
    { name: 'heart', emoji: '❤️', keywords: ['love', 'heart', 'kalp', 'sevgi'] },
    { name: 'fire', emoji: '🔥', keywords: ['fire', 'hot', 'ateş'] },
    { name: 'star', emoji: '⭐', keywords: ['star', 'yıldız'] },
    { name: 'thumbsup', emoji: '👍', keywords: ['thumbsup', 'like', 'beğen'] },
    { name: 'thumbsdown', emoji: '👎', keywords: ['thumbsdown', 'dislike'] },
    { name: 'pray', emoji: '🙏', keywords: ['pray', 'thanks', 'teşekkür'] },
    { name: 'clap', emoji: '👏', keywords: ['clap', 'alkış'] },
    { name: 'ok', emoji: '👌', keywords: ['ok', 'perfect', 'tamam'] },
    { name: 'wave', emoji: '👋', keywords: ['wave', 'hi', 'merhaba'] },
    { name: 'eyes', emoji: '👀', keywords: ['eyes', 'look', 'bak'] },
    { name: 'think', emoji: '🤔', keywords: ['think', 'thinking', 'düşünme'] },
    { name: 'cry', emoji: '😢', keywords: ['cry', 'sad', 'ağlama', 'üzgün'] },
    { name: 'angry', emoji: '😡', keywords: ['angry', 'mad', 'kızgın'] },
    { name: 'cool', emoji: '😎', keywords: ['cool', 'sunglasses'] },
    { name: 'wink', emoji: '😉', keywords: ['wink', 'göz kırp'] },
    { name: 'kiss', emoji: '😘', keywords: ['kiss', 'öp'] },
    { name: 'shocked', emoji: '😮', keywords: ['shocked', 'surprised', 'şaşkın'] },
    { name: 'party', emoji: '🎉', keywords: ['party', 'celebrate', 'kutlama'] },
    { name: 'rocket', emoji: '🚀', keywords: ['rocket', 'launch', 'roket'] },
    { name: 'trophy', emoji: '🏆', keywords: ['trophy', 'win', 'kupa'] },
    { name: 'coffee', emoji: '☕', keywords: ['coffee', 'kahve'] },
    { name: 'pizza', emoji: '🍕', keywords: ['pizza'] },
    { name: 'beer', emoji: '🍺', keywords: ['beer', 'bira'] },
    { name: 'check', emoji: '✅', keywords: ['check', 'done', 'tamam'] },
    { name: 'x', emoji: '❌', keywords: ['x', 'no', 'hayır'] },
    { name: 'warning', emoji: '⚠️', keywords: ['warning', 'uyarı'] },
    { name: 'question', emoji: '❓', keywords: ['question', 'soru'] },
    { name: 'exclamation', emoji: '❗', keywords: ['exclamation', 'ünlem'] },
];

const EmojiAutocomplete = ({ value, cursorPosition, onSelect, onClose }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef(null);

    useEffect(() => {
        // :emoji: formatında arama
        const beforeCursor = value.substring(0, cursorPosition);
        const match = beforeCursor.match(/:([a-z]+)$/i);

        if (match) {
            const query = match[1].toLowerCase();
            const filtered = EMOJI_LIST.filter(emoji =>
                emoji.name.toLowerCase().includes(query) ||
                emoji.keywords.some(k => k.includes(query))
            ).slice(0, 8); // Max 8 öneri

            setSuggestions(filtered);
            setSelectedIndex(0);
        } else {
            setSuggestions([]);
            onClose && onClose();
        }
    }, [value, cursorPosition]);

    // ⌨️ Klavye navigasyonu
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (suggestions.length === 0) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % suggestions.length);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => prev === 0 ? suggestions.length - 1 : prev - 1);
                    break;
                case 'Enter':
                case 'Tab':
                    if (suggestions[selectedIndex]) {
                        e.preventDefault();
                        handleSelect(suggestions[selectedIndex]);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose && onClose();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [suggestions, selectedIndex]);

    const handleSelect = (emojiItem) => {
        const beforeCursor = value.substring(0, cursorPosition);
        const afterCursor = value.substring(cursorPosition);

        // :emoji formatını bul ve değiştir
        const match = beforeCursor.match(/:([a-z]+)$/i);
        if (match) {
            const startPos = beforeCursor.length - match[0].length;
            const newValue = value.substring(0, startPos) + emojiItem.emoji + ' ' + afterCursor;
            const newCursorPos = startPos + emojiItem.emoji.length + 1;

            onSelect && onSelect(newValue, newCursorPos);
        }
    };

    if (suggestions.length === 0) return null;

    return (
        <div ref={menuRef} style={styles.container}>
            <div style={styles.header}>Emoji</div>
            {suggestions.map((item, index) => (
                <div
                    key={index}
                    style={{
                        ...styles.item,
                        ...(index === selectedIndex ? styles.itemSelected : {})
                    }}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                >
                    <span style={styles.emoji}>{item.emoji}</span>
                    <span style={styles.name}>:{item.name}:</span>
                </div>
            ))}
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        bottom: '100%',
        left: 0,
        marginBottom: '8px',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
        minWidth: '200px',
        maxWidth: '300px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        animation: 'slideUp 0.15s ease-out',
        zIndex: 1000,
    },
    header: {
        padding: '8px 12px',
        fontSize: '11px',
        fontWeight: '700',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        cursor: 'pointer',
        transition: 'background 0.15s',
    },
    itemSelected: {
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
    },
    emoji: {
        fontSize: '20px',
        lineHeight: 1,
    },
    name: {
        fontSize: '14px',
        color: '#dcddde',
        fontFamily: 'monospace',
    },
};

// Add animation
if (typeof document !== 'undefined' && !document.head.querySelector('style[data-emoji-autocomplete]')) {
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-emoji-autocomplete', 'true');
    styleSheet.textContent = `
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

export default React.memo(EmojiAutocomplete);



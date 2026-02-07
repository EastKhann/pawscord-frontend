// frontend/src/components/FormattingToolbar.js
// 🔥 FEATURE 8: Message formatting toolbar
// Floating toolbar above textarea for bold, italic, underline, strikethrough, code, spoiler, link

import React, { memo, useCallback } from 'react';
import { FaBold, FaItalic, FaUnderline, FaStrikethrough, FaCode, FaEyeSlash, FaLink, FaHeading, FaQuoteRight, FaListUl } from 'react-icons/fa';

const FORMATS = [
    { icon: FaBold, label: 'Kalın', prefix: '**', suffix: '**', key: 'b' },
    { icon: FaItalic, label: 'İtalik', prefix: '*', suffix: '*', key: 'i' },
    { icon: FaUnderline, label: 'Altı çizili', prefix: '__', suffix: '__', key: 'u' },
    { icon: FaStrikethrough, label: 'Üstü çizili', prefix: '~~', suffix: '~~', key: null },
    { icon: FaCode, label: 'Kod', prefix: '`', suffix: '`', key: null },
    { icon: FaEyeSlash, label: 'Spoiler', prefix: '||', suffix: '||', key: null },
    { icon: FaHeading, label: 'Başlık', prefix: '# ', suffix: '', key: null },
    { icon: FaQuoteRight, label: 'Alıntı', prefix: '> ', suffix: '', key: null },
    { icon: FaListUl, label: 'Liste', prefix: '- ', suffix: '', key: null },
    { icon: FaLink, label: 'Link', prefix: '[', suffix: '](url)', key: null },
];

const FormattingToolbar = ({ textareaRef, message, setMessage, visible = true }) => {
    const applyFormat = useCallback((format) => {
        const textarea = textareaRef?.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = message.substring(start, end);

        let newText;
        let newCursorStart;
        let newCursorEnd;

        if (selected) {
            // Wrap selected text
            newText = message.substring(0, start) + format.prefix + selected + format.suffix + message.substring(end);
            newCursorStart = start + format.prefix.length;
            newCursorEnd = newCursorStart + selected.length;
        } else {
            // Insert format markers and place cursor between them
            const placeholder = format.label.toLowerCase();
            newText = message.substring(0, start) + format.prefix + placeholder + format.suffix + message.substring(end);
            newCursorStart = start + format.prefix.length;
            newCursorEnd = newCursorStart + placeholder.length;
        }

        setMessage(newText);
        setTimeout(() => {
            textarea.focus();
            textarea.selectionStart = newCursorStart;
            textarea.selectionEnd = newCursorEnd;
        }, 0);
    }, [textareaRef, message, setMessage]);

    if (!visible) return null;

    return (
        <div style={S.toolbar}>
            {FORMATS.map((f, i) => {
                const Icon = f.icon;
                return (
                    <button
                        key={i}
                        type="button"
                        style={S.btn}
                        title={`${f.label}${f.key ? ` (Ctrl+${f.key.toUpperCase()})` : ''}`}
                        onClick={() => applyFormat(f)}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = 'rgba(88,101,242,0.2)'; e.target.style.color = '#5865f2'; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#b9bbbe'; }}
                    >
                        <Icon />
                    </button>
                );
            })}
        </div>
    );
};

const S = {
    toolbar: {
        display: 'flex',
        gap: 2,
        padding: '4px 8px',
        backgroundColor: '#1e1f22',
        borderRadius: '8px 8px 0 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    btn: {
        background: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px 7px',
        borderRadius: 4,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.1s',
    },
};

export default memo(FormattingToolbar);

// frontend/src/components/MarkdownPreviewToggle.js
// 📝 FEATURE 8: Markdown Preview Toggle
// Live preview of markdown before sending

import React, { useState, memo, useMemo } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import DOMPurify from 'dompurify';

const parseMarkdown = (text) => {
    if (!text) return '';
    let html = text
        // Code blocks ```
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background:#1e1f22;padding:8px 12px;border-radius:6px;overflow-x:auto;font-size:13px;margin:4px 0"><code>$2</code></pre>')
        // Inline code `
        .replace(/`([^`]+)`/g, '<code style="background:#1e1f22;padding:2px 6px;border-radius:4px;font-size:13px">$1</code>')
        // Bold **
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        // Italic *
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Underline __
        .replace(/__(.+?)__/g, '<u>$1</u>')
        // Strikethrough ~~
        .replace(/~~(.+?)~~/g, '<s>$1</s>')
        // Spoiler ||
        .replace(/\|\|(.+?)\|\|/g, '<span style="background:#1e1f22;color:#1e1f22;padding:0 4px;border-radius:3px;cursor:pointer" onclick="this.style.color=\'#dcddde\'">$1</span>')
        // Headers
        .replace(/^### (.+)$/gm, '<h3 style="margin:4px 0;font-size:1em">$1</h3>')
        .replace(/^## (.+)$/gm, '<h2 style="margin:4px 0;font-size:1.15em">$1</h2>')
        .replace(/^# (.+)$/gm, '<h1 style="margin:4px 0;font-size:1.3em">$1</h1>')
        // Blockquote
        .replace(/^> (.+)$/gm, '<div style="border-left:3px solid #5865f2;padding-left:10px;color:#b5bac1;margin:4px 0">$1</div>')
        // Links
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#00b0f4;text-decoration:none">$1</a>')
        // Lists
        .replace(/^[-*] (.+)$/gm, '<div style="padding-left:12px">• $1</div>')
        // Line breaks
        .replace(/\n/g, '<br/>');
    return html;
};

const MarkdownPreviewToggle = ({ text, show, onToggle }) => {
    const html = useMemo(() => parseMarkdown(text), [text]);

    return (
        <div style={S.container}>
            <button
                onClick={onToggle}
                style={{ ...S.toggleBtn, ...(show ? S.toggleBtnActive : {}) }}
                title={show ? 'Önizlemeyi kapat' : 'Markdown önizleme'}
            >
                {show ? <FaEyeSlash /> : <FaEye />}
            </button>

            {show && text && (
                <div style={S.preview}>
                    <div style={S.previewLabel}>Önizleme</div>
                    <div
                        style={S.previewContent}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
                    />
                </div>
            )}
        </div>
    );
};

const S = {
    container: { position: 'relative' },
    toggleBtn: {
        background: 'none', border: 'none', color: '#949ba4',
        cursor: 'pointer', fontSize: 14, padding: 4,
        display: 'flex', alignItems: 'center', transition: 'color 0.15s',
    },
    toggleBtnActive: { color: '#5865f2' },
    preview: {
        position: 'absolute', bottom: '100%', left: 0, right: 0,
        marginBottom: 8, backgroundColor: '#2b2d31',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 8, overflow: 'hidden',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        maxHeight: 200, overflowY: 'auto',
        animation: 'mdPreviewIn 0.15s ease-out',
    },
    previewLabel: {
        fontSize: 10, fontWeight: 700, color: '#949ba4',
        letterSpacing: '0.05em', padding: '6px 12px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    previewContent: {
        padding: '10px 12px', color: '#dcddde',
        fontSize: 14, lineHeight: 1.5, wordBreak: 'break-word',
    },
};

if (typeof document !== 'undefined') {
    const id = 'md-preview-css';
    if (!document.getElementById(id)) {
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `@keyframes mdPreviewIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }`;
        document.head.appendChild(s);
    }
}

export default memo(MarkdownPreviewToggle);

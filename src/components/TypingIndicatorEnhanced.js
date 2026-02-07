// frontend/src/components/TypingIndicatorEnhanced.js
// ⌨️ FEATURE 11: Enhanced Typing Indicator
// Shows "X yazıyor..." with animated dots and multiple user support

import React, { memo, useMemo } from 'react';

const TypingIndicatorEnhanced = ({ typingUsers = [], currentUser }) => {
    const filtered = useMemo(
        () => typingUsers.filter(u => u !== currentUser),
        [typingUsers, currentUser]
    );

    if (filtered.length === 0) return null;

    const text = useMemo(() => {
        if (filtered.length === 1) return `${filtered[0]} yazıyor`;
        if (filtered.length === 2) return `${filtered[0]} ve ${filtered[1]} yazıyor`;
        if (filtered.length === 3) return `${filtered[0]}, ${filtered[1]} ve ${filtered[2]} yazıyor`;
        return `${filtered[0]}, ${filtered[1]} ve ${filtered.length - 2} kişi daha yazıyor`;
    }, [filtered]);

    return (
        <div style={S.container}>
            <div style={S.dots}>
                <span style={{ ...S.dot, animationDelay: '0s' }} />
                <span style={{ ...S.dot, animationDelay: '0.2s' }} />
                <span style={{ ...S.dot, animationDelay: '0.4s' }} />
            </div>
            <span style={S.text}>{text}</span>
        </div>
    );
};

const S = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '4px 16px',
        height: 24,
        overflow: 'hidden',
    },
    dots: {
        display: 'flex',
        gap: 3,
        alignItems: 'center',
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: '#fff',
        animation: 'typingDotBounce 1.2s infinite ease-in-out',
    },
    text: {
        color: '#949ba4',
        fontSize: 12,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

if (typeof document !== 'undefined') {
    const id = 'typing-enhanced-css';
    if (!document.getElementById(id)) {
        const s = document.createElement('style');
        s.id = id;
        s.textContent = `
            @keyframes typingDotBounce {
                0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                30% { transform: translateY(-4px); opacity: 1; }
            }
        `;
        document.head.appendChild(s);
    }
}

export default memo(TypingIndicatorEnhanced);

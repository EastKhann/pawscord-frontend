/* eslint-disable react-hooks/rules-of-hooks */
// frontend/src/components/TypingIndicatorEnhanced.js
// ⌨️ FEATURE 11: Enhanced Typing Indicator
// Shows "X yazıyor..." with animated dots and multiple user support

import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const TypingIndicatorEnhanced = ({ typingUsers = [], currentUser }) => {
    const { t } = useTranslation();
    const filtered = useMemo(
        () => typingUsers.filter((u) => u !== currentUser),
        [typingUsers, currentUser]
    );

    if (filtered.length === 0) return null;

    const text = useMemo(() => {
        if (filtered.length === 1)
            return t('chat.typingOne', '{{user}} yazıyor', { user: filtered[0] });
        if (filtered.length === 2)
            return t('chat.typingTwo', '{{user1}} ve {{user2}} yazıyor', {
                user1: filtered[0],
                user2: filtered[1],
            });
        if (filtered.length === 3)
            return t('chat.typingThree', '{{user1}}, {{user2}} ve {{user3}} yazıyor', {
                user1: filtered[0],
                user2: filtered[1],
                user3: filtered[2],
            });
        return t('chat.typingMany', '{{user1}}, {{user2}} ve {{count}} kişi daha yazıyor', {
            user1: filtered[0],
            user2: filtered[1],
            count: filtered.length - 2,
        });
    }, [filtered, t]);

    return (
        <div style={S.container} role="status" aria-live="polite" aria-label={text}>
            <div style={S.dots} aria-hidden="true">
                <span style={S.animationDelay} />
                <span style={S.animationDelay2} />
                <span style={S.animationDelay3} />
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
S.animationDelay = { ...S.dot, animationDelay: '0s' };
S.animationDelay2 = { ...S.dot, animationDelay: '0.2s' };
S.animationDelay3 = { ...S.dot, animationDelay: '0.4s' };

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

TypingIndicatorEnhanced.propTypes = {
    typingUsers: PropTypes.array,
    currentUser: PropTypes.object,
};
export default memo(TypingIndicatorEnhanced);

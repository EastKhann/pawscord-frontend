// frontend/src/components/TypingIndicator.js
import React, { useMemo } from 'react';

// 🚀 React.memo ile optimize et - typingUsers değişmezse re-render yapma
const TypingIndicator = React.memo(({ typingUsers = [] }) => {
    if (!typingUsers || typingUsers.length === 0) return null;

    // 📝 Metni memoize et - Her render'da hesaplama yapma
    const typingText = useMemo(() => {
        const count = typingUsers.length;

        if (count === 1) {
            return `${typingUsers[0]} yazıyor`;
        } else if (count === 2) {
            return `${typingUsers[0]} ve ${typingUsers[1]} yazıyor`;
        } else if (count === 3) {
            return `${typingUsers[0]}, ${typingUsers[1]} ve ${typingUsers[2]} yazıyor`;
        } else {
            return `${count} kişi yazıyor`;
        }
    }, [typingUsers]);

    return (
        <div style={styles.container}>
            <span style={styles.text}>{typingText}</span>
            <span style={styles.dots}>
                <span style={styles.dot}>.</span>
                <span style={{ ...styles.dot, animationDelay: '0.2s' }}>.</span>
                <span style={{ ...styles.dot, animationDelay: '0.4s' }}>.</span>
            </span>
        </div>
    );
}, (prevProps, nextProps) => {
    // ⚡ Shallow comparison - Aynı kullanıcılarsa re-render yapma
    if (prevProps.typingUsers.length !== nextProps.typingUsers.length) {
        return false;
    }

    return prevProps.typingUsers.every((user, index) =>
        user === nextProps.typingUsers[index]
    );
});

const styles = {
    container: {
        padding: '8px 16px',
        fontSize: '13px',
        color: '#b9bbbe',
        fontStyle: 'italic',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        margin: '4px 16px'
    },
    text: {
        color: '#5865f2'
    },
    dots: {
        display: 'inline-flex',
        gap: '2px'
    },
    dot: {
        animation: 'blink 1.4s infinite',
        fontSize: '16px',
        lineHeight: '1',
        display: 'inline-block'
    }
};

// Add keyframe animation
const styleSheet = document.styleSheets[0];
const keyframes = `
@keyframes blink {
    0%, 20% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
}
`;

try {
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
} catch (e) {
    // Already exists or CSP issue
}

export default TypingIndicator;




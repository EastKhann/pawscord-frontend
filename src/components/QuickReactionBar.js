// frontend/src/components/QuickReactionBar.js
import React from 'react';

const QuickReactionBar = ({ onReact }) => {
    const quickEmojis = ['👍', '❤️', '😂', '😮', '😢', '🎉', '🔥'];

    return (
        <div style={styles.container}>
            {quickEmojis.map((emoji, index) => (
                <button
                    key={index}
                    onClick={() => onReact(emoji)}
                    style={styles.emojiButton}
                    title={`React with ${emoji}`}
                >
                    {emoji}
                </button>
            ))}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        gap: '4px',
        padding: '6px 8px',
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        border: '1px solid #1e1f22'
    },
    emojiButton: {
        background: 'none',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '6px 8px',
        borderRadius: '4px',
        transition: 'all 0.15s',
        transform: 'scale(1)',
        ':hover': {
            backgroundColor: '#35373c',
            transform: 'scale(1.2)'
        }
    }
};

export default React.memo(QuickReactionBar);




// frontend/src/ReactionPicker.js

import React, { useEffect, useRef } from 'react';

const REACTION_EMOJI_LIST = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '🚀'];

const ReactionPicker = ({ onEmojiSelect, onClose }) => {
    const pickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSelect = (emoji) => {
        onEmojiSelect(emoji);
        onClose();
    };

    return (
        <div ref={pickerRef} style={styles.pickerContainer}>
            {REACTION_EMOJI_LIST.map(emoji => (
                <span
                    key={emoji}
                    style={styles.emojiItem}
                    onClick={() => handleSelect(emoji)}
                >
                    {emoji}
                </span>
            ))}
        </div>
    );
};

const styles = {
    pickerContainer: {
        position: 'absolute',
        top: '-35px',
        right: '0px',
        backgroundColor: '#2f3136',
        border: '1px solid #1e1f22',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        gap: '8px',
        zIndex: 100,
        boxShadow: '0 8px 16px rgba(0,0,0,0.24)',
    },
    emojiItem: {
        cursor: 'pointer',
        fontSize: '1.2em',
        transition: 'transform 0.1s ease-out',
    },
};

export default React.memo(ReactionPicker);


/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// frontend/src/ReactionPicker.js

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const REACTION_EMOJI_LIST = ['👍', '❤️', '😂', '😮', '😢', '🙏', '🔥', '🚀'];

const ReactionPicker = ({ onEmojiSelect, onClose }) => {
    const pickerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                onClose();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const handleSelect = (emoji) => {
        onEmojiSelect(emoji);
        onClose();
    };

    return (
        <div aria-label="reaction picker" ref={pickerRef} style={styles.pickerContainer}>
            {REACTION_EMOJI_LIST.map((emoji) => (
                <span
                    key={emoji}
                    style={styles.emojiItem}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelect(emoji)}
                    onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelect(emoji)}
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
        backgroundColor: '#17191c',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        gap: '8px',
        zIndex: 100,
        boxShadow: '0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(88,101,242,0.1)',
    },
    emojiItem: {
        cursor: 'pointer',
        fontSize: '1.2em',
        transition: 'transform 0.1s ease-out',
    },
};

ReactionPicker.propTypes = {
    onEmojiSelect: PropTypes.func,
    onClose: PropTypes.func,
};
export default React.memo(ReactionPicker);

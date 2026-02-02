// frontend/src/components/MessageJump.js
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

/**
 * 🎯 Message Jump Component
 * Arama sonuçlarından veya reply'den mesaja tıklandığında o mesajı vurgular
 */
export const jumpToMessage = (messageId) => {
    const element = document.getElementById(`message-${messageId}`);
    
    if (element) {
        // Smooth scroll to message
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });

        // Highlight animation
        element.style.backgroundColor = 'rgba(88, 101, 242, 0.3)';
        element.style.transition = 'background-color 0.3s ease';

        setTimeout(() => {
            element.style.backgroundColor = '';
        }, 2000);
    }
};

/**
 * Jump to Message Button (in search results)
 */
const MessageJumpButton = ({ messageId, onClick }) => {
    const handleClick = () => {
        jumpToMessage(messageId);
        if (onClick) onClick();
    };

    return (
        <button
            onClick={handleClick}
            style={styles.button}
            title="Mesaja git"
        >
            <FaArrowUp style={styles.icon} />
        </button>
    );
};

const styles = {
    button: {
        background: 'none',
        border: 'none',
        color: '#5865f2',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '6px 12px',
        borderRadius: '4px',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
    },
    icon: {
        transform: 'rotate(45deg)'
    }
};

export default MessageJumpButton;



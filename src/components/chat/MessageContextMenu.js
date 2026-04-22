// frontend/src/components/MessageContextMenu.js
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    FaEdit,
    FaTrash,
    FaReply,
    FaShare,
    FaSmile,
    FaThumbTack,
    FaCopy,
    FaFlag,
} from 'react-icons/fa';

const MessageContextMenu = ({
    x,
    y,
    onClose,
    onEdit,
    onDelete,
    onReply,
    onReact,
    onPin,
    onCopy,
    onForward,
    onReport,
    isOwnMessage = false,
    isPinned = false,
    canModerate = false,
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                onClose();
            }
        };

        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    // Menünün ekrandan taşmasını önle
    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            let adjustedX = x;
            let adjustedY = y;

            if (rect.right > viewportWidth) {
                adjustedX = viewportWidth - rect.width - 10;
            }

            if (rect.bottom > viewportHeight) {
                adjustedY = viewportHeight - rect.height - 10;
            }

            menuRef.current.style.left = `${adjustedX}px`;
            menuRef.current.style.top = `${adjustedY}px`;
        }
    }, [x, y]);

    const handleAction = (action) => {
        action();
        onClose();
    };

    const menuItems = [
        {
            icon: FaSmile,
            label: t('messageMenu.addReaction', 'Tepki Ver'),
            action: onReact,
            show: true,
        },
        { icon: FaReply, label: t('messageMenu.reply', 'Reply'), action: onReply, show: true },
        { icon: FaEdit, label: t('messageMenu.edit', 'Edit'), action: onEdit, show: isOwnMessage },
        {
            icon: FaTrash,
            label: t('messageMenu.delete', 'Delete'),
            action: onDelete,
            show: isOwnMessage || canModerate,
            danger: true,
        },
        {
            icon: FaThumbTack,
            label: isPinned ? t('messageMenu.unpin', 'Unpin') : t('messageMenu.pin', 'Pin'),
            action: onPin,
            show: canModerate,
        },
        { icon: FaCopy, label: t('messageMenu.copyMessage', 'Copy'), action: onCopy, show: true },
        {
            icon: FaShare,
            label: t('messageMenu.forward', 'Forward'),
            action: onForward,
            show: true,
        },
        {
            icon: FaFlag,
            label: t('messageMenu.report', 'Report'),
            action: onReport,
            show: !isOwnMessage,
        },
    ];

    const visibleItems = menuItems.filter((item) => item.show);

    const handleKeyDown = (e, index) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = menuRef.current?.querySelectorAll('[role="menuitem"]')[index + 1];
            next?.focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = menuRef.current?.querySelectorAll('[role="menuitem"]')[index - 1];
            prev?.focus();
        }
    };

    return (
        <div ref={menuRef} role="menu" aria-label={t('message.actionsMenu', 'Message actions')} style={styles.menu}>
            {visibleItems.map((item, index) => {
                const Icon = item.icon;
                return (
                    <button
                        role="menuitem"
                        aria-label={item.label}
                        key={`item-${index}`}
                        onClick={() => handleAction(item.action)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        style={{ ...styles.menuItem, ...(item.danger && styles.dangerItem) }}
                    >
                        <Icon style={styles.icon} />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
const styles = {
    menu: {
        position: 'fixed',
        backgroundColor: '#18191c',
        borderRadius: '4px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.24)',
        minWidth: '200px',
        padding: '6px',
        zIndex: 10000,
        animation: 'contextMenuFadeIn 0.1s ease',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '8px 12px',
        background: 'none',
        border: 'none',
        color: '#dbdee1',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '2px',
        transition: 'background 0.15s',
        textAlign: 'left',
    },
    dangerItem: {
        color: '#f23f42',
    },
    icon: {
        fontSize: '16px',
    },
};

// Add animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes contextMenuFadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    button:hover {
        background-color: #4752c4 !important;
    }
    
    button:active {
        transform: scale(0.98);
    }
`;
document.head.appendChild(styleSheet);

MessageContextMenu.propTypes = {
    x: PropTypes.object,
    y: PropTypes.object,
    onClose: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onReply: PropTypes.func,
    onReact: PropTypes.func,
    onPin: PropTypes.func,
    onCopy: PropTypes.func,
    onForward: PropTypes.func,
    onReport: PropTypes.func,
    isOwnMessage: PropTypes.bool,
    isPinned: PropTypes.bool,
    canModerate: PropTypes.bool,
};
export default React.memo(MessageContextMenu);

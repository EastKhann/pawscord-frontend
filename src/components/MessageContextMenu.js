// frontend/src/components/MessageContextMenu.js
import React, { useEffect, useRef } from 'react';
import { FaEdit, FaTrash, FaReply, FaShare, FaSmile, FaThumbTack, FaCopy, FaFlag } from 'react-icons/fa';

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
    canModerate = false
}) => {
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
        { icon: FaSmile, label: 'Tepki Ver', action: onReact, show: true },
        { icon: FaReply, label: 'Yanıtla', action: onReply, show: true },
        { icon: FaEdit, label: 'Düzenle', action: onEdit, show: isOwnMessage },
        { icon: FaTrash, label: 'Sil', action: onDelete, show: isOwnMessage || canModerate, danger: true },
        { icon: FaThumbTack, label: isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle', action: onPin, show: canModerate },
        { icon: FaCopy, label: 'Kopyala', action: onCopy, show: true },
        { icon: FaShare, label: 'İlet', action: onForward, show: true },
        { icon: FaFlag, label: 'Bildir', action: onReport, show: !isOwnMessage },
    ];

    return (
        <div ref={menuRef} style={styles.menu}>
            {menuItems.filter(item => item.show).map((item, index) => {
                const Icon = item.icon;
                return (
                    <button
                        key={index}
                        onClick={() => handleAction(item.action)}
                        style={{
                            ...styles.menuItem,
                            ...(item.danger && styles.dangerItem)
                        }}
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
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '2px',
        transition: 'background 0.15s',
        textAlign: 'left',
    },
    dangerItem: {
        color: '#ed4245',
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

export default React.memo(MessageContextMenu);




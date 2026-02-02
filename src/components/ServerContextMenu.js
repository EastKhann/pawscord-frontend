// frontend/src/components/ServerContextMenu.js
import React, { useEffect, useRef } from 'react';
import {
    FaCog,
    FaSignOutAlt,
    FaBell,
    FaBellSlash,
    FaFolder,
    FaTrash,
    FaArrowUp,
    FaArrowDown,
    FaCopy,
    FaLink,
    FaImage,
    FaLock,
    FaGlobe
} from 'react-icons/fa';

const ServerContextMenu = ({
    x,
    y,
    server,
    isOwner,
    onClose,
    onLeaveServer,
    onServerSettings,
    onMuteServer,
    onUnmuteServer,
    onMoveUp,
    onMoveDown,
    onCopyInvite,
    onDeleteServer,
    onChangeIcon, // 🔥 YENİ: Sunucu ikonu değiştirme
    onChangePrivacy, // 🔥 YENİ: Gizlilik ayarları
    canMoveUp = true,
    canMoveDown = true,
    isMuted = false
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
        {
            icon: FaCopy,
            label: 'Davet Linki Kopyala',
            action: onCopyInvite,
            show: true,
            color: '#5865f2'
        },
        {
            divider: true,
            show: true
        },
        {
            icon: FaImage,
            label: 'Sunucu İkonunu Değiştir',
            action: onChangeIcon,
            show: isOwner,
            color: '#faa61a'
        },
        {
            icon: server.is_public ? FaLock : FaGlobe,
            label: server.is_public ? 'Özel Yap' : 'Herkese Açık Yap',
            action: onChangePrivacy,
            show: isOwner,
            color: server.is_public ? '#ed4245' : '#43b581'
        },
        {
            divider: true,
            show: isOwner
        },
        {
            icon: isMuted ? FaBell : FaBellSlash,
            label: isMuted ? 'Bildirimleri Aç' : 'Bildirimleri Kapat',
            action: isMuted ? onUnmuteServer : onMuteServer,
            show: true
        },
        {
            divider: true,
            show: true
        },
        {
            icon: FaArrowUp,
            label: 'Yukarı Taşı',
            action: onMoveUp,
            show: canMoveUp
        },
        {
            icon: FaArrowDown,
            label: 'Aşağı Taşı',
            action: onMoveDown,
            show: canMoveDown
        },
        {
            divider: true,
            show: canMoveUp || canMoveDown
        },
        {
            icon: FaCog,
            label: 'Sunucu Ayarları',
            action: onServerSettings,
            show: isOwner
        },
        {
            icon: FaTrash,
            label: 'Sunucuyu Sil',
            action: onDeleteServer,
            show: isOwner,
            danger: true
        },
        {
            divider: true,
            show: true
        },
        {
            icon: FaSignOutAlt,
            label: 'Sunucudan Ayrıl',
            action: onLeaveServer,
            show: !isOwner,
            danger: true
        },
    ];

    return (
        <div ref={menuRef} className="server-context-menu" style={styles.menu}>
            <div style={styles.serverHeader}>
                <strong>{server.name}</strong>
            </div>

            {menuItems.filter(item => item.show).map((item, index) => {
                if (item.divider) {
                    return <div key={`divider-${index}`} style={styles.divider} />;
                }

                const Icon = item.icon;
                return (
                    <button
                        key={index}
                        onClick={() => handleAction(item.action)}
                        style={{
                            ...styles.menuItem,
                            ...(item.danger && styles.dangerItem),
                            ...(item.color && { color: item.color })
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
        backgroundColor: '#111214',
        borderRadius: '4px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
        minWidth: '220px',
        padding: '6px',
        zIndex: 100000,
        animation: 'contextMenuFadeIn 0.1s ease',
    },
    serverHeader: {
        padding: '8px 12px',
        color: '#fff',
        fontSize: '14px',
        borderBottom: '1px solid #2b2d31',
        marginBottom: '4px',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        width: '100%',
        padding: '8px 12px',
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '2px',
        transition: 'all 0.15s',
        textAlign: 'left',
    },
    dangerItem: {
        color: '#f23f43',
    },
    icon: {
        fontSize: '16px',
        flexShrink: 0,
    },
    divider: {
        height: '1px',
        backgroundColor: '#2b2d31',
        margin: '4px 0',
    },
};

// Add animation and hover styles
if (!document.getElementById('server-context-menu-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'server-context-menu-styles';
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
        
        /* Menu button hover effect */
        .server-context-menu button:hover {
            background-color: #5865f2 !important;
            color: #fff !important;
        }
        
        .server-context-menu button:active {
            transform: scale(0.98);
        }
        
        /* Menu container class */
        .server-context-menu {
            user-select: none;
        }
    `;
    document.head.appendChild(styleSheet);
}

export default React.memo(ServerContextMenu);



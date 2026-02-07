// frontend/src/components/ChannelContextMenu.js
// 🔥 FEATURE 15: Channel right-click context menu
// Right-click on a channel to see options: mute, notifications, edit, delete, copy link

import React, { useState, useEffect, useCallback, memo } from 'react';
import ReactDOM from 'react-dom';
import { FaBellSlash, FaBell, FaEdit, FaTrash, FaLink, FaCopy, FaVolumeUp, FaVolumeMute, FaUserPlus, FaArchive, FaLock, FaThumbtack, FaExternalLinkAlt, FaCog } from 'react-icons/fa';

const ChannelContextMenu = ({ x, y, channel, onClose, onAction, isAdmin = false }) => {
    const [isMuted, setIsMuted] = useState(channel?.muted || false);

    useEffect(() => {
        const handleClick = () => onClose();
        const handleScroll = () => onClose();
        document.addEventListener('click', handleClick);
        document.addEventListener('scroll', handleScroll, true);
        return () => {
            document.removeEventListener('click', handleClick);
            document.removeEventListener('scroll', handleScroll, true);
        };
    }, [onClose]);

    const menuItems = [
        { icon: FaThumbtack, label: 'Sabitlenmiş Mesajlar', action: 'pinned' },
        { icon: isMuted ? FaBell : FaBellSlash, label: isMuted ? 'Bildirimleri Aç' : 'Bildirimleri Kapat', action: 'toggleMute' },
        { icon: FaCopy, label: 'Kanal Linkini Kopyala', action: 'copyLink' },
        { divider: true },
        ...(isAdmin ? [
            { icon: FaEdit, label: 'Kanalı Düzenle', action: 'edit' },
            { icon: FaCog, label: 'Kanal Ayarları', action: 'settings' },
            { icon: FaUserPlus, label: 'Davet Oluştur', action: 'invite' },
            { icon: FaArchive, label: 'Arşivle', action: 'archive' },
            { icon: FaLock, label: 'İzinler', action: 'permissions' },
            { divider: true },
            { icon: FaTrash, label: 'Kanalı Sil', action: 'delete', danger: true },
        ] : [
            { icon: FaExternalLinkAlt, label: 'Yeni Sekmede Aç', action: 'openTab' },
        ]),
    ];

    const handleAction = useCallback((action) => {
        if (action === 'copyLink') {
            const link = `${window.location.origin}/channels/${channel?.server_id || ''}/${channel?.slug || channel?.id || ''}`;
            navigator.clipboard.writeText(link);
        }
        onAction?.(action, channel);
        onClose();
    }, [channel, onAction, onClose]);

    // Position: keep within viewport
    const menuStyle = {
        ...S.menu,
        left: Math.min(x, window.innerWidth - 220),
        top: Math.min(y, window.innerHeight - 300),
    };

    return ReactDOM.createPortal(
        <div style={menuStyle}>
            {menuItems.map((item, i) => {
                if (item.divider) return <div key={i} style={S.divider} />;
                const Icon = item.icon;
                return (
                    <button
                        key={i}
                        type="button"
                        style={{ ...S.item, color: item.danger ? '#ed4245' : '#dcddde' }}
                        onClick={(e) => { e.stopPropagation(); handleAction(item.action); }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = item.danger ? 'rgba(237,66,69,0.1)' : 'rgba(88,101,242,0.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                        <Icon style={{ fontSize: 14, flexShrink: 0 }} />
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>,
        document.body
    );
};

const S = {
    menu: {
        position: 'fixed', zIndex: 9999,
        backgroundColor: '#111214', borderRadius: 8,
        padding: '6px 0', minWidth: 200,
        boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.06)',
    },
    item: {
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '8px 12px', border: 'none',
        background: 'transparent', cursor: 'pointer', fontSize: 14,
        textAlign: 'left', transition: 'background 0.1s',
    },
    divider: {
        height: 1, backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '4px 8px',
    },
};

export default memo(ChannelContextMenu);

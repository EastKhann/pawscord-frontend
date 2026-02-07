// frontend/src/components/PerChannelNotification.js
// 🔥 FEATURE 36: Per-channel notification override
// Lets users set notification preferences per channel

import React, { useState, memo, useCallback } from 'react';
import { FaBell, FaBellSlash, FaAt, FaVolumeMute, FaCheckCircle } from 'react-icons/fa';

const NOTIFICATION_LEVELS = [
    { key: 'default', label: 'Sunucu Varsayılanı', icon: FaBell, desc: 'Sunucu ayarını kullan' },
    { key: 'all', label: 'Tüm Mesajlar', icon: FaBell, desc: 'Her mesajda bildirim al' },
    { key: 'mentions', label: 'Sadece @Bahsetmeler', icon: FaAt, desc: 'Sadece senden bahsedilince' },
    { key: 'none', label: 'Bildirim Yok', icon: FaBellSlash, desc: 'Hiçbir bildirim alma' },
    { key: 'mute', label: 'Kanal Sustur', icon: FaVolumeMute, desc: 'Tamamen sustur' },
];

const PerChannelNotification = ({ channelId, channelName, currentLevel = 'default', onLevelChange, onClose }) => {
    const [selected, setSelected] = useState(currentLevel);

    const handleSelect = useCallback((level) => {
        setSelected(level);
        onLevelChange?.(channelId, level);
        setTimeout(() => onClose?.(), 300);
    }, [channelId, onLevelChange, onClose]);

    return (
        <div style={S.container}>
            <div style={S.header}>
                <FaBell style={{ fontSize: 14, color: '#5865f2' }} />
                <span style={S.title}>#{channelName} Bildirimleri</span>
            </div>
            <div style={S.divider} />
            {NOTIFICATION_LEVELS.map(level => {
                const Icon = level.icon;
                const isActive = selected === level.key;
                return (
                    <button
                        key={level.key}
                        type="button"
                        style={{
                            ...S.item,
                            backgroundColor: isActive ? 'rgba(88,101,242,0.1)' : 'transparent',
                        }}
                        onClick={() => handleSelect(level.key)}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = isActive ? 'rgba(88,101,242,0.1)' : 'transparent'; }}
                    >
                        <Icon style={{ fontSize: 14, color: isActive ? '#5865f2' : '#b5bac1' }} />
                        <div style={S.info}>
                            <span style={{ ...S.label, color: isActive ? '#f2f3f5' : '#dcddde' }}>{level.label}</span>
                            <span style={S.desc}>{level.desc}</span>
                        </div>
                        {isActive && <FaCheckCircle style={{ fontSize: 14, color: '#5865f2' }} />}
                    </button>
                );
            })}
        </div>
    );
};

const S = {
    container: {
        backgroundColor: '#111214', borderRadius: 8, padding: '8px 0',
        minWidth: 260, boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.06)',
    },
    header: {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 14px',
    },
    title: {
        fontSize: 14, fontWeight: 600, color: '#f2f3f5',
    },
    divider: {
        height: 1, backgroundColor: 'rgba(255,255,255,0.06)', margin: '4px 10px',
    },
    item: {
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '8px 14px', border: 'none',
        background: 'transparent', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.1s',
    },
    info: {
        display: 'flex', flexDirection: 'column', gap: 1, flex: 1,
    },
    label: {
        fontSize: 14, fontWeight: 500,
    },
    desc: {
        fontSize: 11, color: '#4e5058',
    },
};

export default memo(PerChannelNotification);

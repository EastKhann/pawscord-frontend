// frontend/src/components/SystemMessage.js
// 🔥 FEATURE 19: System messages for join/leave/pin/boost events
// Shows special styled messages for server events

import React, { memo } from 'react';
import { FaArrowRight, FaArrowLeft, FaThumbtack, FaRocket, FaPen, FaPhoneAlt, FaCrown, FaUserShield, FaTrash, FaHashtag, FaLock, FaUnlock, FaGift } from 'react-icons/fa';

const SYSTEM_TYPES = {
    join: { icon: FaArrowRight, color: '#57f287', template: (u) => `**${u}** sunucuya katıldı. Hoş geldin!` },
    leave: { icon: FaArrowLeft, color: '#ed4245', template: (u) => `**${u}** sunucudan ayrıldı.` },
    pin: { icon: FaThumbtack, color: '#fee75c', template: (u) => `**${u}** bir mesajı sabitledi.` },
    boost: { icon: FaRocket, color: '#f47fff', template: (u) => `**${u}** sunucuyu boost'ladı! 🎉` },
    nameChange: { icon: FaPen, color: '#5865f2', template: (u, d) => `**${u}** kanal adını **${d}** olarak değiştirdi.` },
    call: { icon: FaPhoneAlt, color: '#57f287', template: (u) => `**${u}** bir sesli görüşme başlattı.` },
    ownerChange: { icon: FaCrown, color: '#fee75c', template: (u, d) => `**${u}** sunucu sahipliğini **${d}** kişisine devretti.` },
    roleAdd: { icon: FaUserShield, color: '#5865f2', template: (u, d) => `**${u}** kullanıcısına **${d}** rolü verildi.` },
    messageDelete: { icon: FaTrash, color: '#ed4245', template: (u) => `**${u}** bir mesajı sildi.` },
    channelCreate: { icon: FaHashtag, color: '#57f287', template: (u, d) => `**${u}** **#${d}** kanalını oluşturdu.` },
    channelPrivate: { icon: FaLock, color: '#fee75c', template: (u, d) => `**${u}** **#${d}** kanalını gizli yaptı.` },
    channelPublic: { icon: FaUnlock, color: '#57f287', template: (u, d) => `**${u}** **#${d}** kanalını herkese açtı.` },
    gift: { icon: FaGift, color: '#f47fff', template: (u) => `**${u}** bir hediye gönderdi!` },
};

const SystemMessage = ({ type, username, detail, timestamp }) => {
    const config = SYSTEM_TYPES[type];
    if (!config) return null;

    const Icon = config.icon;
    const text = config.template(username || 'Bilinmeyen', detail || '');

    // Parse bold markers
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    const rendered = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} style={{ color: '#f2f3f5', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });

    return (
        <div style={S.container}>
            <div style={{ ...S.iconWrap, backgroundColor: `${config.color}15` }}>
                <Icon style={{ fontSize: 14, color: config.color }} />
            </div>
            <div style={S.content}>
                <span style={S.text}>{rendered}</span>
                {timestamp && (
                    <span style={S.time}>
                        {new Date(timestamp).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                )}
            </div>
        </div>
    );
};

const S = {
    container: {
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '4px 48px 4px 72px', minHeight: 30,
    },
    iconWrap: {
        width: 28, height: 28, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    },
    content: {
        display: 'flex', alignItems: 'center', gap: 8,
        flexWrap: 'wrap',
    },
    text: {
        fontSize: 14, color: '#b5bac1', lineHeight: 1.4,
    },
    time: {
        fontSize: 11, color: '#4e5058',
    },
};

export default memo(SystemMessage);

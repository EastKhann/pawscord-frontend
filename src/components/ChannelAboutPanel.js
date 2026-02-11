// frontend/src/components/ChannelAboutPanel.js
// ℹ️ FEATURE 10: Channel About / Info Panel
// Shows channel details, topic, creation date, member count, pinned msgs

import { useState, memo } from 'react';
import { FaTimes, FaThumbtack, FaUsers, FaCalendar, FaClock, FaHashtag, FaLock, FaVolumeUp, FaBell, FaBellSlash } from 'react-icons/fa';

const ChannelAboutPanel = ({
    channel,
    memberCount,
    pinnedCount,
    onClose,
    onToggleMute,
    isMuted,
}) => {
    const [tab, setTab] = useState('about');

    if (!channel) return null;

    const createdAt = channel.created_at ? new Date(channel.created_at).toLocaleDateString('tr-TR', {
        day: 'numeric', month: 'long', year: 'numeric'
    }) : null;

    const channelIcon = channel.is_voice ? <FaVolumeUp style={{ color: '#949ba4' }} /> :
        channel.is_private ? <FaLock style={{ color: '#949ba4' }} /> :
            <FaHashtag style={{ color: '#949ba4' }} />;

    return (
        <div style={S.panel}>
            {/* Header */}
            <div style={S.header}>
                <div style={S.headerTitle}>
                    {channelIcon}
                    <span style={S.channelName}>{channel.name}</span>
                </div>
                <button style={S.closeBtn} onClick={onClose}><FaTimes /></button>
            </div>

            {/* Tabs */}
            <div style={S.tabs}>
                <button style={{ ...S.tab, ...(tab === 'about' ? S.tabActive : {}) }} onClick={() => setTab('about')}>
                    Hakkında
                </button>
                <button style={{ ...S.tab, ...(tab === 'members' ? S.tabActive : {}) }} onClick={() => setTab('members')}>
                    Üyeler
                </button>
            </div>

            {/* Content */}
            <div style={S.content}>
                {tab === 'about' && (
                    <>
                        {/* Topic */}
                        {channel.topic && (
                            <div style={S.section}>
                                <span style={S.sectionLabel}>KONU</span>
                                <p style={S.topicText}>{channel.topic}</p>
                            </div>
                        )}

                        {/* Stats */}
                        <div style={S.section}>
                            <span style={S.sectionLabel}>BİLGİLER</span>
                            <div style={S.infoGrid}>
                                {memberCount != null && (
                                    <div style={S.infoItem}>
                                        <FaUsers style={S.infoIcon} />
                                        <span style={S.infoText}>{memberCount} üye</span>
                                    </div>
                                )}
                                {pinnedCount != null && (
                                    <div style={S.infoItem}>
                                        <FaThumbtack style={S.infoIcon} />
                                        <span style={S.infoText}>{pinnedCount} sabitlenmiş mesaj</span>
                                    </div>
                                )}
                                {createdAt && (
                                    <div style={S.infoItem}>
                                        <FaCalendar style={S.infoIcon} />
                                        <span style={S.infoText}>{createdAt}</span>
                                    </div>
                                )}
                                {channel.slow_mode_interval > 0 && (
                                    <div style={S.infoItem}>
                                        <FaClock style={S.infoIcon} />
                                        <span style={S.infoText}>Yavaş mod: {channel.slow_mode_interval}sn</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Channel type */}
                        <div style={S.section}>
                            <span style={S.sectionLabel}>KANAL TÜRÜ</span>
                            <div style={S.typeBadge}>
                                {channelIcon}
                                <span style={S.typeText}>
                                    {channel.is_voice ? 'Sesli Kanal' :
                                        channel.is_private ? 'Özel Kanal' :
                                            channel.is_forum ? 'Forum Kanal' : 'Metin Kanalı'}
                                </span>
                            </div>
                        </div>

                        {/* Notifications */}
                        <div style={S.section}>
                            <button
                                style={S.muteBtn}
                                onClick={onToggleMute}
                            >
                                {isMuted ? <FaBellSlash /> : <FaBell />}
                                <span>{isMuted ? 'Bildirimleri Aç' : 'Bildirimleri Kapat'}</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

const S = {
    panel: {
        width: 280, height: '100%',
        backgroundColor: '#2b2d31',
        borderLeft: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        flexShrink: 0,
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    headerTitle: { display: 'flex', alignItems: 'center', gap: 8 },
    channelName: { color: '#fff', fontWeight: 700, fontSize: 15 },
    closeBtn: {
        background: 'none', border: 'none', color: '#949ba4',
        cursor: 'pointer', fontSize: 16, padding: 4,
    },
    tabs: {
        display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    tab: {
        flex: 1, padding: '10px 0', background: 'none', border: 'none',
        color: '#949ba4', cursor: 'pointer', fontSize: 13, fontWeight: 600,
        borderBottom: '2px solid transparent', transition: 'all 0.15s',
    },
    tabActive: { color: '#fff', borderBottomColor: '#5865f2' },
    content: { flex: 1, padding: 16, overflow: 'auto' },
    section: { marginBottom: 20 },
    sectionLabel: {
        fontSize: 11, fontWeight: 700, color: '#949ba4',
        letterSpacing: '0.04em', display: 'block', marginBottom: 8,
    },
    topicText: {
        color: '#b5bac1', fontSize: 13, lineHeight: 1.5,
        margin: 0, wordBreak: 'break-word',
    },
    infoGrid: { display: 'flex', flexDirection: 'column', gap: 8 },
    infoItem: { display: 'flex', alignItems: 'center', gap: 8 },
    infoIcon: { color: '#949ba4', fontSize: 14 },
    infoText: { color: '#b5bac1', fontSize: 13 },
    typeBadge: {
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', backgroundColor: 'rgba(255,255,255,0.04)',
        borderRadius: 6,
    },
    typeText: { color: '#b5bac1', fontSize: 13 },
    muteBtn: {
        display: 'flex', alignItems: 'center', gap: 8,
        width: '100%', padding: '10px 14px',
        backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 8, color: '#b5bac1', cursor: 'pointer',
        fontSize: 13, transition: 'background 0.15s',
    },
};

export default memo(ChannelAboutPanel);

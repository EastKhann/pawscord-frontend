// frontend/src/components/AccountActivity.js
// 🔥 FEATURE 49: Account activity summary
// Dashboard showing account usage stats

import React, { memo, useMemo } from 'react';
import { FaComment, FaClock, FaServer, FaUsers, FaImage, FaFile, FaSmile, FaMicrophone, FaCalendar, FaChartBar, FaTrophy, FaFire } from 'react-icons/fa';

const AccountActivity = ({ stats }) => {
    const {
        messageCount = 0,
        totalOnlineHours = 0,
        serverCount = 0,
        friendCount = 0,
        imagesShared = 0,
        filesShared = 0,
        reactionsGiven = 0,
        voiceMinutes = 0,
        memberSince = null,
        streakDays = 0,
    } = stats || {};

    const statCards = useMemo(() => [
        { icon: FaComment, label: 'Gönderilen Mesaj', value: messageCount.toLocaleString('tr-TR'), color: '#5865f2' },
        { icon: FaClock, label: 'Çevrimiçi Süre', value: `${totalOnlineHours}sa`, color: '#57f287' },
        { icon: FaServer, label: 'Sunucu Sayısı', value: serverCount, color: '#fee75c' },
        { icon: FaUsers, label: 'Arkadaş Sayısı', value: friendCount, color: '#eb459e' },
        { icon: FaImage, label: 'Paylaşılan Resim', value: imagesShared, color: '#f47fff' },
        { icon: FaFile, label: 'Paylaşılan Dosya', value: filesShared, color: '#00b0f4' },
        { icon: FaSmile, label: 'Verilen Tepki', value: reactionsGiven, color: '#fee75c' },
        { icon: FaMicrophone, label: 'Sesli Dakika', value: `${voiceMinutes}dk`, color: '#57f287' },
    ], [messageCount, totalOnlineHours, serverCount, friendCount, imagesShared, filesShared, reactionsGiven, voiceMinutes]);

    const memberSinceDate = memberSince ? new Date(memberSince).toLocaleDateString('tr-TR', {
        day: 'numeric', month: 'long', year: 'numeric',
    }) : 'Bilinmiyor';

    const daysSinceJoin = memberSince
        ? Math.floor((Date.now() - new Date(memberSince).getTime()) / 86400000)
        : 0;

    return (
        <div style={S.container}>
            <div style={S.header}>
                <FaChartBar style={{ fontSize: 18, color: '#5865f2' }} />
                <h3 style={S.title}>Hesap Aktivitesi</h3>
            </div>

            {/* Join Date & Streak */}
            <div style={S.topRow}>
                <div style={S.joinCard}>
                    <FaCalendar style={{ fontSize: 16, color: '#5865f2' }} />
                    <div>
                        <span style={S.joinLabel}>Üyelik Tarihi</span>
                        <span style={S.joinDate}>{memberSinceDate}</span>
                        <span style={S.joinDays}>{daysSinceJoin} gündür üye</span>
                    </div>
                </div>
                {streakDays > 0 && (
                    <div style={S.streakCard}>
                        <FaFire style={{ fontSize: 20, color: '#ed4245' }} />
                        <div>
                            <span style={S.streakCount}>{streakDays}</span>
                            <span style={S.streakLabel}>Gün Seri</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div style={S.grid}>
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} style={S.statCard}>
                            <div style={{ ...S.statIcon, backgroundColor: `${stat.color}15` }}>
                                <Icon style={{ fontSize: 16, color: stat.color }} />
                            </div>
                            <span style={S.statValue}>{stat.value}</span>
                            <span style={S.statLabel}>{stat.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* Achievement hint */}
            {messageCount >= 1000 && (
                <div style={S.achievement}>
                    <FaTrophy style={{ fontSize: 16, color: '#fee75c' }} />
                    <span style={S.achievementText}>
                        🎉 {messageCount >= 10000 ? 'Efsane Sohbetçi' : messageCount >= 5000 ? 'Süper Sohbetçi' : 'Aktif Sohbetçi'} başarımını kazandın!
                    </span>
                </div>
            )}
        </div>
    );
};

const S = {
    container: { padding: 16 },
    header: {
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20,
    },
    title: { fontSize: 16, fontWeight: 700, color: '#f2f3f5', margin: 0 },
    topRow: {
        display: 'flex', gap: 12, marginBottom: 16,
    },
    joinCard: {
        flex: 1, display: 'flex', alignItems: 'center', gap: 10,
        padding: 14, backgroundColor: '#2b2d31', borderRadius: 8,
    },
    joinLabel: {
        display: 'block', fontSize: 11, color: '#b5bac1',
        textTransform: 'uppercase', fontWeight: 700,
    },
    joinDate: {
        display: 'block', fontSize: 14, fontWeight: 600, color: '#f2f3f5',
    },
    joinDays: {
        display: 'block', fontSize: 12, color: '#4e5058',
    },
    streakCard: {
        display: 'flex', alignItems: 'center', gap: 10,
        padding: 14, backgroundColor: 'rgba(237,66,69,0.1)',
        borderRadius: 8, minWidth: 100,
    },
    streakCount: {
        display: 'block', fontSize: 24, fontWeight: 800, color: '#ed4245',
    },
    streakLabel: {
        display: 'block', fontSize: 11, color: '#ed4245', fontWeight: 600,
    },
    grid: {
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 10, marginBottom: 16,
    },
    statCard: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6, padding: 14, backgroundColor: '#2b2d31',
        borderRadius: 8, textAlign: 'center',
    },
    statIcon: {
        width: 36, height: 36, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    statValue: {
        fontSize: 18, fontWeight: 700, color: '#f2f3f5',
    },
    statLabel: {
        fontSize: 11, color: '#b5bac1', fontWeight: 500,
    },
    achievement: {
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 14px', backgroundColor: 'rgba(254,231,92,0.1)',
        borderRadius: 8,
    },
    achievementText: {
        fontSize: 14, color: '#fee75c', fontWeight: 500,
    },
};

export default memo(AccountActivity);

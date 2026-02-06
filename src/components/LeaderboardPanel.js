// frontend/src/components/LeaderboardPanel.js
import React, { useState, useEffect } from 'react';
import { FaTrophy, FaMedal, FaStar, FaFire, FaCrown } from 'react-icons/fa';

const LeaderboardPanel = ({ onClose, fetchWithAuth, apiBaseUrl }) => {
    const [leaderboards, setLeaderboards] = useState([]);
    const [selectedBoard, setSelectedBoard] = useState('global');
    const [timeRange, setTimeRange] = useState('all'); // all, month, week, day
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLeaderboard();
    }, [selectedBoard, timeRange]);

    const loadLeaderboard = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(
                `${apiBaseUrl}/leaderboard/${selectedBoard}/?range=${timeRange}`
            );
            if (res.ok) {
                const data = await res.json();
                setLeaderboards(data.leaderboard || []);
            }
        } catch (error) {
            console.error('Leaderboard load error:', error);
        }
        setLoading(false);
    };

    const getRankIcon = (rank) => {
        if (rank === 1) return <FaCrown size={20} color="#faa61a" />;
        if (rank === 2) return <FaMedal size={20} color="#c0c0c0" />;
        if (rank === 3) return <FaMedal size={20} color="#cd7f32" />;
        return <span style={{fontSize: '14px', color: '#72767d'}}>#{rank}</span>;
    };

    const getRankColor = (rank) => {
        if (rank === 1) return '#faa61a';
        if (rank === 2) return '#c0c0c0';
        if (rank === 3) return '#cd7f32';
        return '#36393f';
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaTrophy size={24} color="#faa61a" />
                        <h2 style={styles.title}>Liderlik Tablosu</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>×</button>
                </div>

                {/* Category Tabs */}
                <div style={styles.tabs}>
                    {[
                        { id: 'global', name: 'Genel', icon: FaTrophy },
                        { id: 'messages', name: 'Mesajlar', icon: FaStar },
                        { id: 'voice', name: 'Ses Sohbeti', icon: FaFire },
                        { id: 'games', name: 'Oyunlar', icon: FaMedal }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedBoard(tab.id)}
                            style={{
                                ...styles.tab,
                                backgroundColor: selectedBoard === tab.id ? '#5865f2' : '#2f3136'
                            }}
                        >
                            <tab.icon size={14} />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </div>

                {/* Time Range */}
                <div style={styles.timeRange}>
                    {[
                        { id: 'all', name: 'Tüm Zamanlar' },
                        { id: 'month', name: 'Bu Ay' },
                        { id: 'week', name: 'Bu Hafta' },
                        { id: 'day', name: 'Bugün' }
                    ].map(range => (
                        <button
                            key={range.id}
                            onClick={() => setTimeRange(range.id)}
                            style={{
                                ...styles.timeButton,
                                backgroundColor: timeRange === range.id ? '#36393f' : 'transparent'
                            }}
                        >
                            {range.name}
                        </button>
                    ))}
                </div>

                {/* Leaderboard List */}
                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : leaderboards.length === 0 ? (
                        <div style={styles.empty}>
                            <FaTrophy size={48} color="#4e5058" />
                            <p>Henüz veri yok</p>
                        </div>
                    ) : (
                        <div style={styles.leaderboardList}>
                            {leaderboards.map((entry, index) => (
                                <div
                                    key={entry.user_id}
                                    style={{
                                        ...styles.leaderboardItem,
                                        backgroundColor: getRankColor(index + 1) + '20'
                                    }}
                                >
                                    <div style={styles.rank}>
                                        {getRankIcon(index + 1)}
                                    </div>
                                    <div style={styles.userInfo}>
                                        <img
                                            src={entry.avatar || '/default-avatar.png'}
                                            alt={entry.username}
                                            style={styles.avatar}
                                        />
                                        <div style={styles.userDetails}>
                                            <div style={styles.username}>{entry.username}</div>
                                            <div style={styles.userStats}>
                                                {selectedBoard === 'messages' && `${entry.message_count} mesaj`}
                                                {selectedBoard === 'voice' && `${entry.voice_minutes} dakika`}
                                                {selectedBoard === 'games' && `${entry.game_wins} galibiyet`}
                                                {selectedBoard === 'global' && `${entry.total_points} puan`}
                                            </div>
                                        </div>
                                    </div>
                                    <div style={styles.score}>
                                        {selectedBoard === 'messages' && entry.message_count}
                                        {selectedBoard === 'voice' && `${Math.floor(entry.voice_minutes / 60)}h`}
                                        {selectedBoard === 'games' && entry.game_wins}
                                        {selectedBoard === 'global' && entry.total_points}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Stats */}
                <div style={styles.footer}>
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>Toplam Kullanıcı</span>
                        <span style={styles.statValue}>{leaderboards.length}</span>
                    </div>
                    <div style={styles.statItem}>
                        <span style={styles.statLabel}>Güncellenme</span>
                        <span style={styles.statValue}>Her 5dk</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
    },
    panel: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '28px',
        padding: '0 8px'
    },
    tabs: {
        display: 'flex',
        gap: '8px',
        padding: '16px 20px',
        borderBottom: '1px solid #202225',
        overflowX: 'auto'
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        whiteSpace: 'nowrap'
    },
    timeRange: {
        display: 'flex',
        gap: '8px',
        padding: '12px 20px',
        borderBottom: '1px solid #202225'
    },
    timeButton: {
        padding: '6px 12px',
        borderRadius: '4px',
        border: 'none',
        color: '#dcddde',
        cursor: 'pointer',
        fontSize: '12px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b9bbbe'
    },
    leaderboardList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    leaderboardItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px 16px',
        borderRadius: '8px',
        transition: 'all 0.2s'
    },
    rank: {
        minWidth: '40px',
        textAlign: 'center'
    },
    userInfo: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    userDetails: {
        flex: 1
    },
    username: {
        color: '#ffffff',
        fontSize: '15px',
        fontWeight: '500',
        marginBottom: '2px'
    },
    userStats: {
        color: '#b9bbbe',
        fontSize: '12px'
    },
    score: {
        color: '#ffffff',
        fontSize: '18px',
        fontWeight: 'bold',
        minWidth: '60px',
        textAlign: 'right'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-around',
        padding: '16px 20px',
        borderTop: '1px solid #202225'
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
    },
    statLabel: {
        color: '#72767d',
        fontSize: '11px',
        textTransform: 'uppercase'
    },
    statValue: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold'
    }
};

export default LeaderboardPanel;




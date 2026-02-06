import React, { useState, useEffect } from 'react';
import {
    FaHistory, FaTimes, FaUser, FaCalendarAlt, FaHashtag,
    FaVolumeUp, FaClock, FaComment, FaHeart, FaSignInAlt,
    FaSignOutAlt, FaChartLine, FaFilter, FaDownload, FaSearch,
    FaTrophy, FaGamepad, FaMusic, FaServer, FaStar, FaFire,
    FaMedal, FaGift, FaUserPlus, FaUserMinus, FaEdit
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './UserActivityHistoryPanel.css';

const UserActivityHistoryPanel = ({ userId, username, onClose }) => {
    const [activeTab, setActiveTab] = useState('timeline');
    const [activities, setActivities] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ from: '', to: '' });
    const [page, setPage] = useState(1);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchData();
    }, [userId, filter, dateRange, page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                filter,
                page,
                ...(dateRange.from && { from: dateRange.from }),
                ...(dateRange.to && { to: dateRange.to })
            });

            const [activitiesRes, statsRes] = await Promise.all([
                fetch(`/api/users/${userId}/activity/?${params}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                }),
                fetch(`/api/users/${userId}/activity/stats/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
            ]);

            if (activitiesRes.ok) {
                setActivities((await activitiesRes.json()).activities || []);
            } else {
                setActivities([]);
            }

            if (statsRes.ok) {
                setStats((await statsRes.json()) || emptyStats);
            } else {
                setStats(emptyStats);
            }
        } catch (error) {
            setActivities([]);
            setStats(emptyStats);
        }
        setLoading(false);
    };

    // Boş istatistik objesi
    const emptyStats = {
        total_messages: 0,
        messages_today: 0,
        total_voice_time: 0,
        voice_time_today: 0,
        reactions_given: 0,
        reactions_received: 0,
        servers_joined: 0,
        achievements_count: 0,
        current_streak: 0,
        longest_streak: 0,
        level: 1,
        xp: 0,
        rank: 'Unranked',
        most_active_channel: null,
        most_used_emoji: null,
        favorite_game: null,
        online_time_today: 0,
        join_date: null
    };

    const getActivityIcon = (type) => {
        const icons = {
            message: <FaComment className="activity-message" />,
            voice_join: <FaVolumeUp className="activity-voice" />,
            voice_leave: <FaSignOutAlt className="activity-voice-leave" />,
            reaction: <FaHeart className="activity-reaction" />,
            server_join: <FaUserPlus className="activity-server" />,
            server_leave: <FaUserMinus className="activity-server-leave" />,
            achievement: <FaTrophy className="activity-achievement" />,
            status_change: <FaUser className="activity-status" />,
            profile_update: <FaEdit className="activity-profile" />,
            game_activity: <FaGamepad className="activity-game" />,
            spotify: <FaMusic className="activity-spotify" />,
            gift_sent: <FaGift className="activity-gift" />,
            gift_received: <FaGift className="activity-gift-received" />,
            level_up: <FaStar className="activity-level" />
        };
        return icons[type] || <FaHistory />;
    };

    const getActivityLabel = (type) => {
        const labels = {
            message: 'Mesaj gönderdi',
            voice_join: 'Sesli kanala katıldı',
            voice_leave: 'Sesli kanaldan ayrıldı',
            reaction: 'Tepki verdi',
            server_join: 'Sunucuya katıldı',
            server_leave: 'Sunucudan ayrıldı',
            achievement: 'Başarım kazandı',
            status_change: 'Durum değiştirdi',
            profile_update: 'Profil güncelledi',
            game_activity: 'Oyun oynadı',
            spotify: 'Müzik dinledi',
            gift_sent: 'Hediye gönderdi',
            gift_received: 'Hediye aldı',
            level_up: 'Seviye atladı'
        };
        return labels[type] || type;
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hrs > 0) return `${hrs}sa ${mins}dk`;
        return `${mins}dk`;
    };

    const handleExport = async () => {
        try {
            const response = await fetch(`/api/users/${userId}/activity/export/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `activity-${username}-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                toast.success('Aktivite geçmişi indirildi');
            }
        } catch (error) {
            toast.info('Dışa aktarma (demo)');
        }
    };

    const filteredActivities = activities.filter(a => {
        if (filter === 'all') return true;
        return a.type === filter || a.type.includes(filter);
    });

    return (
        <div className="user-activity-overlay" onClick={(e) => e.target.className === 'user-activity-overlay' && onClose()}>
            <div className="user-activity-panel">
                <div className="panel-header">
                    <div className="user-header">
                        <img src={`/default-avatar.png`} alt="" className="user-avatar" />
                        <div>
                            <h2><FaHistory /> Aktivite Geçmişi</h2>
                            <span className="username">@{username}</span>
                        </div>
                    </div>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="tabs">
                    <button className={`tab ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
                        <FaClock /> Zaman Çizelgesi
                    </button>
                    <button className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => setActiveTab('stats')}>
                        <FaChartLine /> İstatistikler
                    </button>
                    <button className={`tab ${activeTab === 'achievements' ? 'active' : ''}`} onClick={() => setActiveTab('achievements')}>
                        <FaTrophy /> Başarımlar
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : (
                        <>
                            {activeTab === 'timeline' && (
                                <TimelineView
                                    activities={filteredActivities}
                                    filter={filter}
                                    setFilter={setFilter}
                                    dateRange={dateRange}
                                    setDateRange={setDateRange}
                                    getActivityIcon={getActivityIcon}
                                    getActivityLabel={getActivityLabel}
                                    formatTime={formatTime}
                                    formatDuration={formatDuration}
                                    onExport={handleExport}
                                />
                            )}

                            {activeTab === 'stats' && (
                                <StatsView stats={stats} formatDuration={formatDuration} />
                            )}

                            {activeTab === 'achievements' && (
                                <AchievementsView userId={userId} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const TimelineView = ({
    activities, filter, setFilter, dateRange, setDateRange,
    getActivityIcon, getActivityLabel, formatTime, formatDuration, onExport
}) => {
    return (
        <div className="timeline-view">
            <div className="filters-bar">
                <div className="filter-select">
                    <FaFilter />
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">Tüm Aktiviteler</option>
                        <option value="message">Mesajlar</option>
                        <option value="voice">Ses</option>
                        <option value="reaction">Tepkiler</option>
                        <option value="server">Sunucu</option>
                        <option value="game">Oyun</option>
                        <option value="achievement">Başarımlar</option>
                    </select>
                </div>
                <div className="date-filters">
                    <input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                        placeholder="Başlangıç"
                    />
                    <span>-</span>
                    <input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                        placeholder="Bitiş"
                    />
                </div>
                <button className="export-btn" onClick={onExport}>
                    <FaDownload />
                </button>
            </div>

            <div className="timeline">
                {activities.length === 0 ? (
                    <div className="empty-state">
                        <FaHistory />
                        <p>Aktivite bulunamadı</p>
                    </div>
                ) : (
                    activities.map((activity, index) => (
                        <div key={activity.id} className="timeline-item">
                            <div className="timeline-line">
                                <div className="timeline-dot">
                                    {getActivityIcon(activity.type)}
                                </div>
                                {index < activities.length - 1 && <div className="line" />}
                            </div>
                            <div className="timeline-content">
                                <div className="activity-header">
                                    <span className="activity-label">{getActivityLabel(activity.type)}</span>
                                    <span className="activity-time">{formatTime(activity.timestamp)}</span>
                                </div>
                                <ActivityDetails activity={activity} formatDuration={formatDuration} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const ActivityDetails = ({ activity, formatDuration }) => {
    const { type, details } = activity;

    const renderDetails = () => {
        switch (type) {
            case 'message':
                return (
                    <div className="detail-card">
                        <span className="channel"><FaHashtag /> {details.channel}</span>
                        <p className="content">"{details.content}"</p>
                    </div>
                );
            case 'voice_join':
            case 'voice_leave':
                return (
                    <div className="detail-card">
                        <span className="channel"><FaVolumeUp /> {details.channel}</span>
                        {details.duration && <span className="duration">Süre: {formatDuration(details.duration)}</span>}
                    </div>
                );
            case 'reaction':
                return (
                    <div className="detail-card">
                        <span className="emoji">{details.emoji}</span>
                        <span className="message">"{details.message}"</span>
                    </div>
                );
            case 'server_join':
                return (
                    <div className="detail-card">
                        <span className="server"><FaServer /> {details.server}</span>
                    </div>
                );
            case 'achievement':
                return (
                    <div className="detail-card achievement">
                        <span className="badge">{details.badge}</span>
                        <span className="name">{details.name}</span>
                    </div>
                );
            case 'game_activity':
                return (
                    <div className="detail-card">
                        <span className="game"><FaGamepad /> {details.game}</span>
                        {details.duration && <span className="duration">Süre: {formatDuration(details.duration)}</span>}
                    </div>
                );
            case 'spotify':
                return (
                    <div className="detail-card">
                        <span className="track"><FaMusic /> {details.track}</span>
                        <span className="artist">{details.artist}</span>
                    </div>
                );
            case 'level_up':
                return (
                    <div className="detail-card level">
                        <span className="level-badge">Seviye {details.level}</span>
                        <span className="xp">{details.xp.toLocaleString()} XP</span>
                    </div>
                );
            case 'gift_sent':
                return (
                    <div className="detail-card">
                        <span><FaGift /> {details.item}</span>
                        <span>→ @{details.to}</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return <div className="activity-details">{renderDetails()}</div>;
};

const StatsView = ({ stats, formatDuration }) => {
    if (!stats) return <div className="loading">Yükleniyor...</div>;

    return (
        <div className="stats-view">
            <div className="stats-header">
                <div className="level-card">
                    <div className="level-badge">
                        <FaStar />
                        <span>Seviye {stats.level}</span>
                    </div>
                    <div className="xp-bar">
                        <div className="xp-fill" style={{ width: `${(stats.xp % 1000) / 10}%` }} />
                    </div>
                    <span className="xp-text">{stats.xp.toLocaleString()} XP</span>
                </div>
                <div className="rank-badge">
                    <FaMedal />
                    <span>{stats.rank}</span>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <FaComment />
                    <div className="stat-info">
                        <span className="stat-value">{stats.total_messages.toLocaleString()}</span>
                        <span className="stat-label">Toplam Mesaj</span>
                    </div>
                    <span className="stat-today">+{stats.messages_today} bugün</span>
                </div>

                <div className="stat-card">
                    <FaVolumeUp />
                    <div className="stat-info">
                        <span className="stat-value">{formatDuration(stats.total_voice_time)}</span>
                        <span className="stat-label">Toplam Ses</span>
                    </div>
                    <span className="stat-today">+{formatDuration(stats.voice_time_today)} bugün</span>
                </div>

                <div className="stat-card">
                    <FaHeart />
                    <div className="stat-info">
                        <span className="stat-value">{stats.reactions_given}</span>
                        <span className="stat-label">Tepki Verilen</span>
                    </div>
                </div>

                <div className="stat-card">
                    <FaServer />
                    <div className="stat-info">
                        <span className="stat-value">{stats.servers_joined}</span>
                        <span className="stat-label">Sunucu</span>
                    </div>
                </div>

                <div className="stat-card">
                    <FaFire />
                    <div className="stat-info">
                        <span className="stat-value">{stats.current_streak} gün</span>
                        <span className="stat-label">Aktif Seri</span>
                    </div>
                    <span className="stat-record">En uzun: {stats.longest_streak} gün</span>
                </div>

                <div className="stat-card">
                    <FaTrophy />
                    <div className="stat-info">
                        <span className="stat-value">{stats.achievements_count}</span>
                        <span className="stat-label">Başarım</span>
                    </div>
                </div>
            </div>

            <div className="favorites-section">
                <h4>Favoriler</h4>
                <div className="favorites-grid">
                    <div className="favorite-item">
                        <FaHashtag />
                        <span>{stats.most_active_channel}</span>
                        <label>En Aktif Kanal</label>
                    </div>
                    <div className="favorite-item">
                        <span className="emoji">{stats.most_used_emoji}</span>
                        <label>En Çok Kullanılan</label>
                    </div>
                    <div className="favorite-item">
                        <FaGamepad />
                        <span>{stats.favorite_game}</span>
                        <label>Favori Oyun</label>
                    </div>
                </div>
            </div>

            <div className="member-since">
                <FaCalendarAlt />
                <span>Üyelik: {new Date(stats.join_date).toLocaleDateString('tr-TR')}</span>
            </div>
        </div>
    );
};

const AchievementsView = ({ userId }) => {
    const achievements = [
        { id: 1, name: 'İlk Adım', description: 'İlk mesajını gönder', icon: '👋', earned: true, date: '2023-06-15' },
        { id: 2, name: 'Sohbetçi', description: '100 mesaj gönder', icon: '💬', earned: true, date: '2023-07-01' },
        { id: 3, name: 'Sosyal Kelebek', description: '10 sunucuya katıl', icon: '🦋', earned: true, date: '2023-08-15' },
        { id: 4, name: 'Ses Sanatçısı', description: '10 saat sesli sohbet', icon: '🎤', earned: true, date: '2023-09-01' },
        { id: 5, name: 'Tepki Kralı', description: '500 tepki ver', icon: '❤️', earned: true, date: '2023-10-01' },
        { id: 6, name: 'Oyuncu', description: '24 saat oyun aktivitesi', icon: '🎮', earned: false, progress: 75 },
        { id: 7, name: 'Gece Kuşu', description: 'Gece yarısından sonra aktif ol', icon: '🦉', earned: true, date: '2023-06-20' },
        { id: 8, name: 'Haftalık Seri', description: '7 gün üst üste aktif ol', icon: '🔥', earned: true, date: '2024-01-10' },
        { id: 9, name: 'Efsane', description: 'Seviye 50\'ye ulaş', icon: '🏆', earned: false, progress: 30 }
    ];

    return (
        <div className="achievements-view">
            <div className="achievements-summary">
                <span>{achievements.filter(a => a.earned).length} / {achievements.length}</span>
                <label>Kazanılan Başarımlar</label>
            </div>

            <div className="achievements-grid">
                {achievements.map(achievement => (
                    <div key={achievement.id} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
                        <div className="achievement-icon">{achievement.icon}</div>
                        <div className="achievement-info">
                            <h4>{achievement.name}</h4>
                            <p>{achievement.description}</p>
                            {achievement.earned ? (
                                <span className="earned-date">
                                    {new Date(achievement.date).toLocaleDateString('tr-TR')}
                                </span>
                            ) : (
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${achievement.progress}%` }} />
                                    <span>{achievement.progress}%</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserActivityHistoryPanel;

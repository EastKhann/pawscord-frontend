import React, { useState, useEffect } from 'react';
import {
    FaHeart, FaTimes, FaTrophy, FaMedal, FaFire, FaChartLine,
    FaCrown, FaSearch, FaCalendarAlt, FaHashtag, FaSmile,
    FaStar, FaThumbsUp, FaLaugh, FaSadCry, FaAngry, FaArrowUp,
    FaArrowDown, FaEquals, FaFilter, FaDownload
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './ReactionLeaderboardPanel.css';

const ReactionLeaderboardPanel = ({ serverId, onClose }) => {
    const [activeTab, setActiveTab] = useState('users');
    const [timeRange, setTimeRange] = useState('week');
    const [leaderboard, setLeaderboard] = useState([]);
    const [emojiStats, setEmojiStats] = useState([]);
    const [channelStats, setChannelStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchLeaderboard();
    }, [serverId, activeTab, timeRange]);

    const fetchLeaderboard = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/servers/${serverId}/reactions/leaderboard/?type=${activeTab}&range=${timeRange}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                if (activeTab === 'users') {
                    setLeaderboard(data.leaderboard || []);
                } else if (activeTab === 'emojis') {
                    setEmojiStats(data.emojis || []);
                } else if (activeTab === 'channels') {
                    setChannelStats(data.channels || []);
                }
            } else {
                if (activeTab === 'users') setLeaderboard([]);
                if (activeTab === 'emojis') setEmojiStats([]);
                if (activeTab === 'channels') setChannelStats([]);
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
            if (activeTab === 'users') setLeaderboard([]);
            if (activeTab === 'emojis') setEmojiStats([]);
            if (activeTab === 'channels') setChannelStats([]);
        }
        setLoading(false);
    };

    const handleExport = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/reactions/export/?range=${timeRange}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `reaction-stats-${timeRange}.csv`;
                a.click();
                toast.success('İstatistikler indirildi');
            }
        } catch (error) {
            toast.error('Dışa aktarma başarısız');
        }
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1: return <FaTrophy className="gold" />;
            case 2: return <FaMedal className="silver" />;
            case 3: return <FaMedal className="bronze" />;
            default: return <span className="rank-number">{rank}</span>;
        }
    };

    const getTrendIcon = (trend) => {
        switch (trend) {
            case 'up': return <FaArrowUp className="trend-up" />;
            case 'down': return <FaArrowDown className="trend-down" />;
            default: return <FaEquals className="trend-same" />;
        }
    };

    const filteredLeaderboard = leaderboard.filter(item =>
        item.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user?.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="reaction-leaderboard-overlay" onClick={(e) => e.target.className === 'reaction-leaderboard-overlay' && onClose()}>
            <div className="reaction-leaderboard-panel">
                <div className="panel-header">
                    <h2><FaHeart /> Tepki Liderlik Tablosu</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                            onClick={() => setActiveTab('users')}
                        >
                            <FaCrown /> Kullanıcılar
                        </button>
                        <button
                            className={`tab ${activeTab === 'emojis' ? 'active' : ''}`}
                            onClick={() => setActiveTab('emojis')}
                        >
                            <FaSmile /> Emojiler
                        </button>
                        <button
                            className={`tab ${activeTab === 'channels' ? 'active' : ''}`}
                            onClick={() => setActiveTab('channels')}
                        >
                            <FaHashtag /> Kanallar
                        </button>
                    </div>
                    <div className="time-selector">
                        <FaCalendarAlt />
                        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                            <option value="day">Bugün</option>
                            <option value="week">Bu Hafta</option>
                            <option value="month">Bu Ay</option>
                            <option value="all">Tüm Zamanlar</option>
                        </select>
                    </div>
                </div>

                {activeTab === 'users' && (
                    <div className="toolbar">
                        <div className="search-box">
                            <FaSearch />
                            <input
                                type="text"
                                placeholder="Kullanıcı ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="export-btn" onClick={handleExport}>
                            <FaDownload /> Dışa Aktar
                        </button>
                    </div>
                )}

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : (
                        <>
                            {activeTab === 'users' && (
                                <UserLeaderboard
                                    data={filteredLeaderboard}
                                    getRankIcon={getRankIcon}
                                    getTrendIcon={getTrendIcon}
                                />
                            )}

                            {activeTab === 'emojis' && (
                                <EmojiStats
                                    data={emojiStats}
                                    getTrendIcon={getTrendIcon}
                                />
                            )}

                            {activeTab === 'channels' && (
                                <ChannelStats data={channelStats} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const UserLeaderboard = ({ data, getRankIcon, getTrendIcon }) => {
    if (data.length === 0) {
        return (
            <div className="empty-state">
                <FaHeart />
                <p>Liderlik tablosu boş</p>
            </div>
        );
    }

    return (
        <div className="user-leaderboard">
            {/* Top 3 Podium */}
            <div className="podium">
                {data.slice(0, 3).map((item, index) => (
                    <div key={item.user.id} className={`podium-item rank-${item.rank}`}>
                        <div className="podium-avatar">
                            <img
                                src={item.user.avatar || '/default-avatar.png'}
                                alt=""
                            />
                            <span className="rank-badge">{getRankIcon(item.rank)}</span>
                        </div>
                        <h4>{item.user.display_name}</h4>
                        <span className="username">@{item.user.username}</span>
                        <div className="stats">
                            <span><FaHeart /> {item.reactions_given}</span>
                            <span className="trend">{getTrendIcon(item.trend)} {item.change > 0 ? '+' : ''}{item.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rest of the leaderboard */}
            <div className="leaderboard-list">
                {data.slice(3).map(item => (
                    <div key={item.user.id} className="leaderboard-item">
                        <div className="rank">{getRankIcon(item.rank)}</div>
                        <img
                            src={item.user.avatar || '/default-avatar.png'}
                            alt=""
                            className="avatar"
                        />
                        <div className="user-info">
                            <h4>{item.user.display_name}</h4>
                            <span>@{item.user.username}</span>
                        </div>
                        <div className="reaction-stats">
                            <div className="stat">
                                <label>Verilen</label>
                                <span>{item.reactions_given}</span>
                            </div>
                            <div className="stat">
                                <label>Alınan</label>
                                <span>{item.reactions_received}</span>
                            </div>
                        </div>
                        <div className="trend-info">
                            {getTrendIcon(item.trend)}
                            <span className={`change ${item.trend}`}>
                                {item.change > 0 ? '+' : ''}{item.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EmojiStats = ({ data, getTrendIcon }) => {
    const totalReactions = data.reduce((sum, item) => sum + item.count, 0);

    return (
        <div className="emoji-stats">
            <div className="total-stats">
                <FaFire />
                <span>Toplam Tepki: <strong>{totalReactions.toLocaleString()}</strong></span>
            </div>

            <div className="emoji-list">
                {data.map((item, index) => (
                    <div key={item.name} className="emoji-item">
                        <div className="emoji-rank">#{index + 1}</div>
                        <div className="emoji-icon">{item.emoji}</div>
                        <div className="emoji-info">
                            <span className="emoji-name">:{item.name}:</span>
                            <div className="emoji-bar">
                                <div
                                    className="bar-fill"
                                    style={{ width: `${item.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="emoji-count">
                            <span>{item.count.toLocaleString()}</span>
                            <span className="percentage">{item.percentage}%</span>
                        </div>
                        <div className="emoji-trend">
                            {getTrendIcon(item.trend)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChannelStats = ({ data }) => {
    return (
        <div className="channel-stats">
            <div className="channels-list">
                {data.map((item, index) => (
                    <div key={item.channel.id} className="channel-item">
                        <div className="channel-rank">#{index + 1}</div>
                        <div className="channel-info">
                            <h4><FaHashtag /> {item.channel.name}</h4>
                            <div className="channel-meta">
                                <span><FaHeart /> {item.total_reactions.toLocaleString()} tepki</span>
                                <span>👤 {item.active_users} aktif kullanıcı</span>
                            </div>
                        </div>
                        <div className="top-emoji">
                            <label>En Popüler</label>
                            <span className="emoji">{item.top_emoji}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReactionLeaderboardPanel;

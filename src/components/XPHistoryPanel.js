import React, { useState, useEffect } from 'react';
import {
    FaStar, FaTimes, FaHistory, FaArrowUp, FaArrowDown,
    FaGift, FaTrophy, FaComments, FaMicrophone, FaCalendar,
    FaFilter, FaChartLine, FaLevelUpAlt, FaCoins
} from 'react-icons/fa';
import './XPHistoryPanel.css';
import { getApiBase } from '../utils/apiEndpoints';

const XPHistoryPanel = ({ userId, serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('history');
    const [filterType, setFilterType] = useState('all');
    const [timeRange, setTimeRange] = useState('week');
    const [dailyXP, setDailyXP] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        loadData();
    }, [userId, serverId, timeRange]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Try to fetch real data from API
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/leveling/xp-history/?server_id=${serverId}&user_id=${userId || ''}&range=${timeRange}`);
                if (response.ok) {
                    const data = await response.json();
                    setStats({
                        current_level: data.current_level || 1,
                        current_xp: data.current_xp || 0,
                        xp_to_next: data.xp_for_next_level || 100,
                        total_xp: data.total_xp || data.current_xp || 0,
                        rank: data.rank || 1,
                        total_members: data.total_members || 1,
                        xp_this_week: data.xp_this_week || data.history?.reduce((sum, h) => sum + (h.xp_gained || 0), 0) || 0,
                        xp_trend: data.xp_trend || 0
                    });
                    // Convert history format
                    const historyData = (data.history || []).map((h, i) => ({
                        id: h.id || i + 1,
                        type: h.type || 'message',
                        xp: h.xp_gained || h.xp || 0,
                        source: h.source || `Messages on ${h.date}`,
                        timestamp: h.timestamp || h.date,
                        balance: h.balance || data.current_xp || 0
                    }));
                    setHistory(historyData);
                    // Parse daily XP and leaderboard from response
                    setDailyXP(data.daily_xp || []);
                    setLeaderboard(data.leaderboard || []);
                } else {
                    console.error('Failed to fetch XP history:', response.status);
                    // Empty fallback
                    setStats({ current_level: 1, current_xp: 0, xp_to_next: 100, total_xp: 0, rank: 0, total_members: 0, xp_this_week: 0, xp_trend: 0 });
                    setHistory([]);
                    setDailyXP([]);
                    setLeaderboard([]);
                }
            } else {
                // No API credentials
                console.warn('XP History: Missing fetchWithAuth or serverId');
                setStats({ current_level: 1, current_xp: 0, xp_to_next: 100, total_xp: 0, rank: 0, total_members: 0, xp_this_week: 0, xp_trend: 0 });
                setHistory([]);
                setDailyXP([]);
                setLeaderboard([]);
            }
        } catch (error) {
            console.error('Error loading XP history:', error);
            setStats({ current_level: 1, current_xp: 0, xp_to_next: 100, total_xp: 0, rank: 0, total_members: 0, xp_this_week: 0, xp_trend: 0 });
            setHistory([]);
            setDailyXP([]);
            setLeaderboard([]);
        }
        setLoading(false);
    };

    const filteredHistory = history.filter(item => {
        if (filterType === 'all') return true;
        return item.type === filterType;
    });

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'message': return <FaComments className="type-icon message" />;
            case 'voice': return <FaMicrophone className="type-icon voice" />;
            case 'bonus': return <FaStar className="type-icon bonus" />;
            case 'gift': return <FaGift className="type-icon gift" />;
            case 'level_up': return <FaLevelUpAlt className="type-icon level-up" />;
            case 'event': return <FaTrophy className="type-icon event" />;
            case 'penalty': return <FaArrowDown className="type-icon penalty" />;
            case 'reaction': return <span className="type-icon reaction">👍</span>;
            default: return <FaCoins className="type-icon" />;
        }
    };

    const getMaxDailyXP = () => dailyXP.length > 0 ? Math.max(...dailyXP.map(d => d.xp || 0), 1) : 1;

    if (loading) {
        return (
            <div className="xphistory-overlay" onClick={onClose}>
                <div className="xphistory-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading XP history...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="xphistory-overlay" onClick={onClose}>
            <div className="xphistory-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaStar />
                            XP History
                        </h2>
                        <span className="subtitle">Track your experience progress</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Level Progress */}
                {stats && (
                    <div className="level-section">
                        <div className="level-info">
                            <div className="level-badge">
                                <span className="level-number">{stats.current_level}</span>
                                <span className="level-label">LEVEL</span>
                            </div>
                            <div className="level-progress">
                                <div className="progress-header">
                                    <span className="xp-current">{formatNumber(stats.current_xp)} XP</span>
                                    <span className="xp-next">/ {formatNumber(stats.xp_to_next)} XP</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{ width: `${(stats.current_xp / stats.xp_to_next) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="xp-remaining">
                                    {formatNumber(stats.xp_to_next - stats.current_xp)} XP to Level {stats.current_level + 1}
                                </span>
                            </div>
                        </div>
                        <div className="stats-row">
                            <div className="stat-box">
                                <span className="stat-value">{formatNumber(stats.total_xp)}</span>
                                <span className="stat-label">Total XP</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-value">#{stats.rank}</span>
                                <span className="stat-label">Rank</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-value">{formatNumber(stats.xp_this_week)}</span>
                                <span className="stat-label">This Week</span>
                            </div>
                            <div className="stat-box">
                                <span className={`stat-value trend ${stats.xp_trend >= 0 ? 'up' : 'down'}`}>
                                    {stats.xp_trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                                    {Math.abs(stats.xp_trend)}%
                                </span>
                                <span className="stat-label">vs Last Week</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="tabs-bar">
                    <div className="tabs">
                        <button
                            className={activeTab === 'history' ? 'active' : ''}
                            onClick={() => setActiveTab('history')}
                        >
                            <FaHistory /> History
                        </button>
                        <button
                            className={activeTab === 'chart' ? 'active' : ''}
                            onClick={() => setActiveTab('chart')}
                        >
                            <FaChartLine /> Chart
                        </button>
                        <button
                            className={activeTab === 'leaderboard' ? 'active' : ''}
                            onClick={() => setActiveTab('leaderboard')}
                        >
                            <FaTrophy /> Leaderboard
                        </button>
                    </div>
                    <div className="filters">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>
                </div>

                <div className="content">
                    {activeTab === 'history' && (
                        <>
                            {/* Filter */}
                            <div className="filter-bar">
                                <FaFilter />
                                <button
                                    className={filterType === 'all' ? 'active' : ''}
                                    onClick={() => setFilterType('all')}
                                >All</button>
                                <button
                                    className={filterType === 'message' ? 'active' : ''}
                                    onClick={() => setFilterType('message')}
                                >Messages</button>
                                <button
                                    className={filterType === 'voice' ? 'active' : ''}
                                    onClick={() => setFilterType('voice')}
                                >Voice</button>
                                <button
                                    className={filterType === 'bonus' ? 'active' : ''}
                                    onClick={() => setFilterType('bonus')}
                                >Bonus</button>
                                <button
                                    className={filterType === 'gift' ? 'active' : ''}
                                    onClick={() => setFilterType('gift')}
                                >Gifts</button>
                            </div>

                            {/* History List */}
                            <div className="history-list">
                                {filteredHistory.map(item => (
                                    <div key={item.id} className={`history-item ${item.type}`}>
                                        {getTypeIcon(item.type)}
                                        <div className="item-info">
                                            <span className="item-source">{item.source}</span>
                                            <span className="item-time">
                                                <FaCalendar /> {formatTime(item.timestamp)}
                                            </span>
                                        </div>
                                        <div className="item-xp">
                                            {item.xp !== 0 && (
                                                <span className={`xp-amount ${item.xp > 0 ? 'positive' : 'negative'}`}>
                                                    {item.xp > 0 ? '+' : ''}{item.xp} XP
                                                </span>
                                            )}
                                            <span className="xp-balance">{formatNumber(item.balance)} XP total</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'chart' && (
                        <div className="chart-tab">
                            <h3>Daily XP Earned</h3>
                            {dailyXP.length > 0 ? (
                                <div className="daily-chart">
                                    {dailyXP.map((item, i) => (
                                        <div key={i} className="chart-bar-container">
                                            <div
                                                className="chart-bar"
                                                style={{ height: `${item.xp > 0 ? (item.xp / getMaxDailyXP()) * 100 : 5}%` }}
                                            >
                                                <span className="bar-value">{item.xp}</span>
                                            </div>
                                            <span className="bar-label">{item.day}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">No daily XP data available</div>
                            )}
                            <div className="chart-legend">
                                <div className="legend-item">
                                    <div className="legend-color messages"></div>
                                    <span>Messages</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color voice"></div>
                                    <span>Voice</span>
                                </div>
                                <div className="legend-item">
                                    <div className="legend-color bonus"></div>
                                    <span>Bonus</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'leaderboard' && (
                        <div className="leaderboard-tab">
                            {leaderboard.length > 0 ? (
                                <div className="leaderboard-list">
                                    {leaderboard.map((user, i) => (
                                        <div
                                            key={i}
                                            className={`leaderboard-item ${user.isUser ? 'current-user' : ''} ${user.rank <= 3 ? 'top-three' : ''}`}
                                        >
                                            <span className={`rank rank-${user.rank}`}>
                                                {user.rank <= 3 ? (
                                                    <FaTrophy />
                                                ) : (
                                                    `#${user.rank}`
                                                )}
                                            </span>
                                            <div className="user-avatar">
                                                {user.username?.charAt(0).toUpperCase() || '?'}
                                            </div>
                                            <div className="user-info">
                                                <span className="username">{user.username}</span>
                                                <span className="user-level">Level {user.level}</span>
                                            </div>
                                            <span className="user-xp">{formatNumber(user.xp)} XP</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">No leaderboard data available</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default XPHistoryPanel;

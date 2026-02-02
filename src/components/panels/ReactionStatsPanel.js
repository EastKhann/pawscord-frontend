// frontend/src/components/panels/ReactionStatsPanel.js
// 📊 Reaction Statistics Dashboard - Most used reactions, trends, user favorites

import React, { useState, useEffect, useCallback } from 'react';
import { FaTimes, FaSmile, FaHeart, FaThumbsUp, FaFire, FaChartBar, FaTrophy, FaUser, FaClock, FaSync } from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import './ReactionStatsPanel.css';

const ReactionStatsPanel = ({ serverId, onClose, fetchWithAuth }) => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [timeRange, setTimeRange] = useState('week');

    const loadStats = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${getApiBase()}/servers/${serverId}/reaction-stats/?range=${timeRange}`);
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            } else {
                // Fallback empty stats
                setStats({
                    total_reactions: 0,
                    unique_emojis: 0,
                    top_emojis: [],
                    top_reactors: [],
                    hourly_distribution: Array(24).fill(0),
                    daily_trend: [],
                    most_reacted_messages: []
                });
            }
        } catch (error) {
            console.error('Error loading reaction stats:', error);
            setStats({
                total_reactions: 0,
                unique_emojis: 0,
                top_emojis: [],
                top_reactors: [],
                hourly_distribution: Array(24).fill(0),
                daily_trend: [],
                most_reacted_messages: []
            });
        }
        setLoading(false);
    }, [serverId, timeRange, fetchWithAuth]);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num?.toString() || '0';
    };

    const getMaxHourlyValue = () => {
        if (!stats?.hourly_distribution) return 1;
        return Math.max(...stats.hourly_distribution, 1);
    };

    if (loading) {
        return (
            <div className="reaction-stats-overlay" onClick={onClose}>
                <div className="reaction-stats-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading-spinner">
                        <FaSync className="spin" />
                        <span>Loading reaction statistics...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="reaction-stats-overlay" onClick={onClose}>
            <div className="reaction-stats-panel" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaSmile /> Reaction Statistics</h2>
                        <span className="subtitle">Discover emoji trends and patterns</span>
                    </div>
                    <div className="header-actions">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="time-range-select"
                        >
                            <option value="day">Last 24 Hours</option>
                            <option value="week">Last 7 Days</option>
                            <option value="month">Last 30 Days</option>
                            <option value="all">All Time</option>
                        </select>
                        <button className="close-btn" onClick={onClose}><FaTimes /></button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="stats-overview">
                    <div className="stat-card">
                        <div className="stat-icon"><FaHeart /></div>
                        <div className="stat-info">
                            <span className="stat-value">{formatNumber(stats?.total_reactions)}</span>
                            <span className="stat-label">Total Reactions</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon"><FaSmile /></div>
                        <div className="stat-info">
                            <span className="stat-value">{formatNumber(stats?.unique_emojis)}</span>
                            <span className="stat-label">Unique Emojis</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon"><FaUser /></div>
                        <div className="stat-info">
                            <span className="stat-value">{formatNumber(stats?.top_reactors?.length)}</span>
                            <span className="stat-label">Active Reactors</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon"><FaFire /></div>
                        <div className="stat-info">
                            <span className="stat-value">{stats?.top_emojis?.[0]?.emoji || '🔥'}</span>
                            <span className="stat-label">Top Emoji</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FaChartBar /> Overview
                    </button>
                    <button
                        className={`tab ${activeTab === 'emojis' ? 'active' : ''}`}
                        onClick={() => setActiveTab('emojis')}
                    >
                        <FaSmile /> Top Emojis
                    </button>
                    <button
                        className={`tab ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        <FaTrophy /> Top Reactors
                    </button>
                    <button
                        className={`tab ${activeTab === 'time' ? 'active' : ''}`}
                        onClick={() => setActiveTab('time')}
                    >
                        <FaClock /> Activity Pattern
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            <div className="section">
                                <h3>🔥 Trending Emojis</h3>
                                <div className="emoji-grid">
                                    {(stats?.top_emojis || []).slice(0, 10).map((item, index) => (
                                        <div key={index} className="emoji-item">
                                            <span className="emoji">{item.emoji}</span>
                                            <span className="count">{formatNumber(item.count)}</span>
                                            <div className="progress-bar">
                                                <div
                                                    className="progress"
                                                    style={{
                                                        width: `${(item.count / (stats?.top_emojis?.[0]?.count || 1)) * 100}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {(!stats?.top_emojis || stats.top_emojis.length === 0) && (
                                        <div className="empty-state">No reaction data yet</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'emojis' && (
                        <div className="emojis-tab">
                            <div className="emoji-leaderboard">
                                {(stats?.top_emojis || []).map((item, index) => (
                                    <div key={index} className={`leaderboard-item ${index < 3 ? 'top-three' : ''}`}>
                                        <span className="rank">#{index + 1}</span>
                                        <span className="emoji-large">{item.emoji}</span>
                                        <div className="emoji-details">
                                            <span className="emoji-name">{item.name || 'Custom Emoji'}</span>
                                            <span className="emoji-usage">{formatNumber(item.count)} uses</span>
                                        </div>
                                        <div className="emoji-bar">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    width: `${(item.count / (stats?.top_emojis?.[0]?.count || 1)) * 100}%`
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {(!stats?.top_emojis || stats.top_emojis.length === 0) && (
                                    <div className="empty-state">
                                        <FaSmile size={48} />
                                        <p>No emoji data available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="users-tab">
                            <div className="user-leaderboard">
                                {(stats?.top_reactors || []).map((user, index) => (
                                    <div key={index} className={`user-item ${index < 3 ? 'top-three' : ''}`}>
                                        <span className={`rank rank-${index + 1}`}>
                                            {index < 3 ? <FaTrophy /> : `#${index + 1}`}
                                        </span>
                                        <div className="user-avatar">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.username} />
                                            ) : (
                                                user.username?.charAt(0).toUpperCase() || '?'
                                            )}
                                        </div>
                                        <div className="user-info">
                                            <span className="username">{user.username}</span>
                                            <span className="reaction-count">{formatNumber(user.count)} reactions</span>
                                        </div>
                                        <div className="user-favorite">
                                            <span className="favorite-emoji">{user.favorite_emoji || '❤️'}</span>
                                        </div>
                                    </div>
                                ))}
                                {(!stats?.top_reactors || stats.top_reactors.length === 0) && (
                                    <div className="empty-state">
                                        <FaTrophy size={48} />
                                        <p>No reactor data available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'time' && (
                        <div className="time-tab">
                            <div className="section">
                                <h3>⏰ Hourly Activity</h3>
                                <div className="hourly-chart">
                                    {(stats?.hourly_distribution || Array(24).fill(0)).map((value, hour) => (
                                        <div key={hour} className="hour-bar">
                                            <div
                                                className="bar"
                                                style={{
                                                    height: `${Math.max((value / getMaxHourlyValue()) * 100, 5)}%`
                                                }}
                                                title={`${hour}:00 - ${value} reactions`}
                                            />
                                            <span className="hour-label">{hour}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="chart-note">Hours shown in your local timezone</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReactionStatsPanel;

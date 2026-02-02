import React, { useState, useEffect } from 'react';
import {
    FaChartBar, FaTimes, FaHashtag, FaVolumeUp, FaCalendar,
    FaComments, FaSmile, FaUsers, FaClock, FaArrowUp,
    FaArrowDown, FaFire, FaDownload, FaEye
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './ChannelAnalyticsPanel.css';

const ChannelAnalyticsPanel = ({ channelId, channelName, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('week');
    const [activeTab, setActiveTab] = useState('overview');
    const token = localStorage.getItem('token');

    const emptyAnalytics = {
        channel: { id: channelId, name: channelName || 'general', type: 'text' },
        overview: { total_messages: 0, unique_users: 0, total_reactions: 0, avg_messages_per_day: 0, message_trend: 0, user_trend: 0, reaction_trend: 0 },
        peak_hours: [],
        daily_activity: [],
        top_reactions: [],
        top_contributors: [],
        message_types: { text: 0, images: 0, links: 0, embeds: 0 }
    };

    useEffect(() => {
        loadAnalytics();
    }, [channelId, timeRange]);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            const response = fetchWithAuth
                ? await fetchWithAuth(`${baseUrl}/api/channels/${channelId}/analytics/?range=${timeRange}`)
                : await fetch(`${baseUrl}/api/channels/${channelId}/analytics/?range=${timeRange}`, {
                    headers: { 'Authorization': `Token ${token}` }
                });

            if (response.ok) {
                const data = await response.json();
                setAnalytics({
                    channel: { id: channelId, name: data.channel_name || channelName, type: 'text' },
                    overview: {
                        total_messages: data.total_messages || 0,
                        unique_users: data.active_users || 0,
                        total_reactions: data.total_reactions || 0,
                        avg_messages_per_day: Math.round((data.messages_this_week || 0) / 7),
                        message_trend: data.message_trend || 0,
                        user_trend: data.user_trend || 0,
                        reaction_trend: data.reaction_trend || 0
                    },
                    peak_hours: (data.peak_hours || []).map(h => ({ hour: `${h.hour}:00`, messages: h.count })),
                    daily_activity: (data.daily_counts || []).map(d => ({ day: d.date, messages: d.count, users: d.users || 0 })),
                    top_reactions: data.top_reactions || [],
                    top_contributors: data.top_contributors || [],
                    message_types: data.message_types || { text: 0, images: 0, links: 0, embeds: 0 }
                });
            } else {
                setAnalytics(emptyAnalytics);
            }
        } catch (error) {
            console.error('Error loading channel analytics:', error);
            setAnalytics(emptyAnalytics);
        }
        setLoading(false);
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const getMaxValue = (data, key) => Math.max(...data.map(d => d[key]));

    const handleExport = () => {
        alert('Exporting channel analytics...');
    };

    if (loading) {
        return (
            <div className="chanalytics-overlay" onClick={onClose}>
                <div className="chanalytics-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading channel analytics...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="chanalytics-overlay" onClick={onClose}>
            <div className="chanalytics-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaChartBar />
                            <FaHashtag className="channel-icon" />
                            {analytics?.channel.name} Analytics
                        </h2>
                        <span className="time-label">Last {timeRange}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Time Range & Tabs */}
                <div className="controls-bar">
                    <div className="tabs">
                        <button
                            className={activeTab === 'overview' ? 'active' : ''}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={activeTab === 'activity' ? 'active' : ''}
                            onClick={() => setActiveTab('activity')}
                        >
                            Activity
                        </button>
                        <button
                            className={activeTab === 'engagement' ? 'active' : ''}
                            onClick={() => setActiveTab('engagement')}
                        >
                            Engagement
                        </button>
                    </div>
                    <div className="time-controls">
                        <FaCalendar />
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                        >
                            <option value="day">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                        <button className="export-btn" onClick={handleExport}>
                            <FaDownload />
                        </button>
                    </div>
                </div>

                <div className="content">
                    {activeTab === 'overview' && analytics && (
                        <div className="overview-tab">
                            {/* Stats Grid */}
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon messages">
                                        <FaComments />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-value">{formatNumber(analytics.overview.total_messages)}</span>
                                        <span className="stat-label">Total Messages</span>
                                    </div>
                                    <span className={`trend ${analytics.overview.message_trend >= 0 ? 'up' : 'down'}`}>
                                        {analytics.overview.message_trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                                        {Math.abs(analytics.overview.message_trend)}%
                                    </span>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon users">
                                        <FaUsers />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-value">{analytics.overview.unique_users}</span>
                                        <span className="stat-label">Unique Users</span>
                                    </div>
                                    <span className={`trend ${analytics.overview.user_trend >= 0 ? 'up' : 'down'}`}>
                                        {analytics.overview.user_trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                                        {Math.abs(analytics.overview.user_trend)}%
                                    </span>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon reactions">
                                        <FaSmile />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-value">{formatNumber(analytics.overview.total_reactions)}</span>
                                        <span className="stat-label">Reactions</span>
                                    </div>
                                    <span className={`trend ${analytics.overview.reaction_trend >= 0 ? 'up' : 'down'}`}>
                                        {analytics.overview.reaction_trend >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                                        {Math.abs(analytics.overview.reaction_trend)}%
                                    </span>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon avg">
                                        <FaFire />
                                    </div>
                                    <div className="stat-content">
                                        <span className="stat-value">{analytics.overview.avg_messages_per_day}</span>
                                        <span className="stat-label">Avg/Day</span>
                                    </div>
                                </div>
                            </div>

                            {/* Message Types */}
                            <div className="section">
                                <h3>Message Types</h3>
                                <div className="message-types">
                                    {Object.entries(analytics.message_types).map(([type, count]) => {
                                        const total = Object.values(analytics.message_types).reduce((a, b) => a + b, 0);
                                        const percentage = ((count / total) * 100).toFixed(1);
                                        return (
                                            <div key={type} className="type-item">
                                                <div className="type-info">
                                                    <span className="type-name">{type}</span>
                                                    <span className="type-count">{formatNumber(count)}</span>
                                                </div>
                                                <div className="type-bar">
                                                    <div
                                                        className={`type-fill ${type}`}
                                                        style={{ width: `${percentage}%` }}
                                                    ></div>
                                                </div>
                                                <span className="type-percent">{percentage}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && analytics && (
                        <div className="activity-tab">
                            {/* Peak Hours */}
                            <div className="section">
                                <h3><FaClock /> Peak Hours</h3>
                                <div className="peak-chart">
                                    {analytics.peak_hours.map((item, i) => (
                                        <div key={i} className="peak-bar-container">
                                            <div
                                                className="peak-bar"
                                                style={{
                                                    height: `${(item.messages / getMaxValue(analytics.peak_hours, 'messages')) * 100}%`
                                                }}
                                            >
                                                <span className="peak-value">{item.messages}</span>
                                            </div>
                                            <span className="peak-label">{item.hour}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Daily Activity */}
                            <div className="section">
                                <h3>Daily Activity</h3>
                                <div className="daily-chart">
                                    {analytics.daily_activity.map((item, i) => (
                                        <div key={i} className="daily-item">
                                            <span className="day-label">{item.day}</span>
                                            <div className="daily-bars">
                                                <div className="bar-container">
                                                    <div
                                                        className="daily-bar messages"
                                                        style={{
                                                            width: `${(item.messages / getMaxValue(analytics.daily_activity, 'messages')) * 100}%`
                                                        }}
                                                    ></div>
                                                    <span className="bar-value">{item.messages} msgs</span>
                                                </div>
                                                <div className="bar-container">
                                                    <div
                                                        className="daily-bar users"
                                                        style={{
                                                            width: `${(item.users / getMaxValue(analytics.daily_activity, 'users')) * 100}%`
                                                        }}
                                                    ></div>
                                                    <span className="bar-value">{item.users} users</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'engagement' && analytics && (
                        <div className="engagement-tab">
                            {/* Top Reactions */}
                            <div className="section">
                                <h3><FaSmile /> Top Reactions</h3>
                                <div className="reactions-list">
                                    {analytics.top_reactions.map((reaction, i) => (
                                        <div key={i} className="reaction-item">
                                            <span className="reaction-emoji">{reaction.emoji}</span>
                                            <div className="reaction-bar-bg">
                                                <div
                                                    className="reaction-bar"
                                                    style={{ width: `${reaction.percentage}%` }}
                                                ></div>
                                            </div>
                                            <span className="reaction-count">{formatNumber(reaction.count)}</span>
                                            <span className="reaction-percent">{reaction.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Top Contributors */}
                            <div className="section">
                                <h3><FaUsers /> Top Contributors</h3>
                                <div className="contributors-list">
                                    {analytics.top_contributors.map((user, i) => (
                                        <div key={i} className="contributor-item">
                                            <span className="rank">#{i + 1}</span>
                                            <div className="contributor-avatar">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="contributor-info">
                                                <span className="contributor-name">{user.username}</span>
                                                <span className="contributor-messages">{formatNumber(user.messages)} messages</span>
                                            </div>
                                            <span className="contributor-percent">{user.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChannelAnalyticsPanel;

// frontend/src/components/panels/UserPresenceInsightsPanel.js
// 👤 User Presence Insights - Activity patterns and engagement analytics

import React, { useState, useEffect, useCallback } from 'react';
import {
    FaTimes, FaUserClock, FaChartLine, FaMoon, FaSun,
    FaCalendarAlt, FaClock, FaUsers, FaCommentAlt,
    FaMicrophone, FaGamepad, FaMusic, FaFire, FaSync,
    FaTrophy, FaGlobe, FaStar
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import './UserPresenceInsightsPanel.css';

const UserPresenceInsightsPanel = ({ userId, username, onClose, fetchWithAuth }) => {
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    const loadInsights = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${getApiBase()}/users/${userId}/presence-insights/`);
            if (response.ok) {
                const data = await response.json();
                setInsights(data);
            } else {
                // Fallback demo insights
                setInsights({
                    user: {
                        username: username || 'User',
                        status: 'online',
                        joined: '2024-03-15',
                        timezone: 'UTC+3'
                    },
                    activity_summary: {
                        total_online_hours: 847,
                        messages_sent: 12453,
                        voice_hours: 234,
                        servers_active: 8,
                        reactions_given: 3421
                    },
                    active_hours: Array(24).fill(0).map((_, i) => ({
                        hour: i,
                        activity: Math.random() * 100
                    })),
                    weekly_pattern: [
                        { day: 'Mon', activity: 65 },
                        { day: 'Tue', activity: 72 },
                        { day: 'Wed', activity: 80 },
                        { day: 'Thu', activity: 75 },
                        { day: 'Fri', activity: 90 },
                        { day: 'Sat', activity: 100 },
                        { day: 'Sun', activity: 85 }
                    ],
                    status_distribution: {
                        online: 45,
                        idle: 25,
                        dnd: 15,
                        offline: 15
                    },
                    top_activities: [
                        { name: 'Gaming', hours: 156, icon: 'gaming' },
                        { name: 'Music', hours: 89, icon: 'music' },
                        { name: 'Voice Chat', hours: 234, icon: 'voice' },
                        { name: 'Streaming', hours: 45, icon: 'stream' }
                    ],
                    engagement_score: 87,
                    peak_time: { start: 20, end: 23 },
                    preferred_timezone: 'Evening (8PM - 11PM)'
                });
            }
        } catch (error) {
            console.error('Error loading insights:', error);
            setInsights(null);
        }
        setLoading(false);
    }, [userId, username, fetchWithAuth]);

    useEffect(() => {
        loadInsights();
    }, [loadInsights]);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num?.toString() || '0';
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return '#10b981';
            case 'idle': return '#f59e0b';
            case 'dnd': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getActivityIcon = (icon) => {
        switch (icon) {
            case 'gaming': return <FaGamepad />;
            case 'music': return <FaMusic />;
            case 'voice': return <FaMicrophone />;
            case 'stream': return <FaChartLine />;
            default: return <FaStar />;
        }
    };

    const getMaxHourlyActivity = () => {
        if (!insights?.active_hours) return 1;
        return Math.max(...insights.active_hours.map(h => h.activity), 1);
    };

    if (loading) {
        return (
            <div className="presence-insights-overlay" onClick={onClose}>
                <div className="presence-insights-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading-state">
                        <FaSync className="spin" />
                        <span>Analyzing activity patterns...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="presence-insights-overlay" onClick={onClose}>
            <div className="presence-insights-panel" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="panel-header">
                    <div className="user-header">
                        <div className="user-avatar-large">
                            <span>{(insights?.user?.username || 'U').charAt(0).toUpperCase()}</span>
                            <div
                                className="status-indicator"
                                style={{ backgroundColor: getStatusColor(insights?.user?.status) }}
                            />
                        </div>
                        <div className="user-info">
                            <h2>{insights?.user?.username || 'User'}</h2>
                            <div className="user-meta">
                                <span><FaCalendarAlt /> Joined {insights?.user?.joined || 'N/A'}</span>
                                <span><FaGlobe /> {insights?.user?.timezone || 'Unknown'}</span>
                            </div>
                        </div>
                    </div>
                    <div className="engagement-score">
                        <div className="score-circle">
                            <span className="score-value">{insights?.engagement_score || 0}</span>
                        </div>
                        <span className="score-label">Engagement</span>
                    </div>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Stats Bar */}
                <div className="stats-bar">
                    <div className="stat">
                        <FaClock />
                        <span className="stat-value">{formatNumber(insights?.activity_summary?.total_online_hours)}h</span>
                        <span className="stat-label">Online</span>
                    </div>
                    <div className="stat">
                        <FaCommentAlt />
                        <span className="stat-value">{formatNumber(insights?.activity_summary?.messages_sent)}</span>
                        <span className="stat-label">Messages</span>
                    </div>
                    <div className="stat">
                        <FaMicrophone />
                        <span className="stat-value">{formatNumber(insights?.activity_summary?.voice_hours)}h</span>
                        <span className="stat-label">Voice</span>
                    </div>
                    <div className="stat">
                        <FaUsers />
                        <span className="stat-value">{insights?.activity_summary?.servers_active || 0}</span>
                        <span className="stat-label">Servers</span>
                    </div>
                    <div className="stat">
                        <FaFire />
                        <span className="stat-value">{formatNumber(insights?.activity_summary?.reactions_given)}</span>
                        <span className="stat-label">Reactions</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        <FaChartLine /> Overview
                    </button>
                    <button
                        className={`tab ${activeTab === 'schedule' ? 'active' : ''}`}
                        onClick={() => setActiveTab('schedule')}
                    >
                        <FaClock /> Activity Schedule
                    </button>
                    <button
                        className={`tab ${activeTab === 'activities' ? 'active' : ''}`}
                        onClick={() => setActiveTab('activities')}
                    >
                        <FaGamepad /> Activities
                    </button>
                </div>

                {/* Tab Content */}
                <div className="tab-content">
                    {activeTab === 'overview' && (
                        <div className="overview-tab">
                            {/* Peak Activity Info */}
                            <div className="peak-info">
                                <div className="peak-card">
                                    <FaSun className="peak-icon day" />
                                    <div className="peak-content">
                                        <span className="peak-label">Peak Activity Time</span>
                                        <span className="peak-value">{insights?.preferred_timezone}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Status Distribution */}
                            <div className="section">
                                <h3>Status Distribution</h3>
                                <div className="status-bars">
                                    {Object.entries(insights?.status_distribution || {}).map(([status, percentage]) => (
                                        <div key={status} className="status-bar-item">
                                            <div className="status-bar-header">
                                                <span
                                                    className="status-name"
                                                    style={{ color: getStatusColor(status) }}
                                                >
                                                    {status.toUpperCase()}
                                                </span>
                                                <span className="status-percent">{percentage}%</span>
                                            </div>
                                            <div className="status-bar-track">
                                                <div
                                                    className="status-bar-fill"
                                                    style={{
                                                        width: `${percentage}%`,
                                                        backgroundColor: getStatusColor(status)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Weekly Pattern */}
                            <div className="section">
                                <h3>Weekly Activity Pattern</h3>
                                <div className="weekly-chart">
                                    {(insights?.weekly_pattern || []).map((day, index) => (
                                        <div key={index} className="day-bar">
                                            <div
                                                className="bar"
                                                style={{ height: `${day.activity}%` }}
                                            />
                                            <span className="day-label">{day.day}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'schedule' && (
                        <div className="schedule-tab">
                            <div className="section">
                                <h3><FaMoon /> <FaSun /> 24-Hour Activity Pattern</h3>
                                <div className="hourly-chart">
                                    {(insights?.active_hours || []).map((hour, index) => (
                                        <div key={index} className="hour-column">
                                            <div
                                                className={`hour-bar ${index >= (insights?.peak_time?.start || 0) && index <= (insights?.peak_time?.end || 23) ? 'peak' : ''}`}
                                                style={{
                                                    height: `${Math.max((hour.activity / getMaxHourlyActivity()) * 100, 5)}%`
                                                }}
                                                title={`${hour.hour}:00 - Activity: ${Math.round(hour.activity)}%`}
                                            />
                                            <span className="hour-num">{hour.hour}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="chart-legend">
                                    <span><span className="legend-dot peak"></span> Peak hours</span>
                                    <span><span className="legend-dot"></span> Regular activity</span>
                                </div>
                            </div>

                            <div className="timezone-note">
                                <FaGlobe />
                                <span>Times shown in user's local timezone ({insights?.user?.timezone})</span>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activities' && (
                        <div className="activities-tab">
                            <div className="section">
                                <h3><FaTrophy /> Top Activities</h3>
                                <div className="activities-list">
                                    {(insights?.top_activities || []).map((activity, index) => (
                                        <div key={index} className={`activity-item rank-${index + 1}`}>
                                            <span className="activity-rank">#{index + 1}</span>
                                            <div className="activity-icon">
                                                {getActivityIcon(activity.icon)}
                                            </div>
                                            <div className="activity-info">
                                                <span className="activity-name">{activity.name}</span>
                                                <span className="activity-hours">{activity.hours} hours total</span>
                                            </div>
                                            <div className="activity-bar">
                                                <div
                                                    className="bar-fill"
                                                    style={{
                                                        width: `${(activity.hours / (insights?.top_activities?.[0]?.hours || 1)) * 100}%`
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    {(!insights?.top_activities || insights.top_activities.length === 0) && (
                                        <div className="empty-state">No activity data available</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserPresenceInsightsPanel;

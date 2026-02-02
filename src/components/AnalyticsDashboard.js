import React, { useState, useEffect } from 'react';
import './AnalyticsDashboard.css';
import { FaChartLine, FaUsers, FaComments, FaMicrophone, FaTimes, FaClock, FaCalendar, FaFire, FaTrophy, FaHashtag, FaUserPlus, FaServer } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';

const AnalyticsDashboard = ({ serverId, onClose, fetchWithAuth: propsFetchWithAuth, apiBaseUrl: propsApiBaseUrl }) => {
    const [timeRange, setTimeRange] = useState('7d'); // 24h, 7d, 30d, 90d
    const [overview, setOverview] = useState(null);
    const [messageStats, setMessageStats] = useState(null);
    const [voiceStats, setVoiceStats] = useState(null);
    const [userGrowth, setUserGrowth] = useState(null);
    const [channelStats, setChannelStats] = useState(null);
    const [peakHours, setPeakHours] = useState(null);
    const [topUsers, setTopUsers] = useState(null);
    const [topChannels, setTopChannels] = useState(null);
    const [loading, setLoading] = useState(true);

    const apiBaseUrl = propsApiBaseUrl || getApiBase();

    useEffect(() => {
        fetchAllAnalytics();
    }, [serverId, timeRange]);

    const fetchWithAuth = propsFetchWithAuth || (async (url) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    });

    const fetchAllAnalytics = async () => {
        setLoading(true);
        try {
            const [
                overviewData,
                messagesData,
                voiceData,
                growthData,
                channelsData,
                peakData,
                topUsersData,
                topChannelsData
            ] = await Promise.all([
                fetchWithAuth(`${apiBaseUrl}/analytics/${serverId}/overview/?range=${timeRange}`),
                fetchWithAuth(`${apiBaseUrl}/analytics/${serverId}/messages/?range=${timeRange}`),
                fetchWithAuth(`${apiBaseUrl}/analytics/${serverId}/voice/?range=${timeRange}`),
                fetchWithAuth(`${apiBaseUrl}/analytics/${serverId}/user-growth/?range=${timeRange}`),
                fetchWithAuth(`${apiBaseUrl}/analytics/${serverId}/channels/?range=${timeRange}`),
                fetchWithAuth(`${apiBaseUrl}/analytics/${serverId}/peak-hours/?range=${timeRange}`),
                fetchWithAuth(`${apiBaseUrl}/analytics/${serverId}/top-users/?range=${timeRange}&limit=10`),
                fetchWithAuth(`${apiBaseUrl}/analytics/${serverId}/top-channels/?range=${timeRange}&limit=10`)
            ]);

            setOverview(overviewData);
            setMessageStats(messagesData);
            setVoiceStats(voiceData);
            setUserGrowth(growthData);
            setChannelStats(channelsData);
            setPeakHours(peakData);
            setTopUsers(topUsersData);
            setTopChannels(topChannelsData);
        } catch (error) {
            console.error('Analytics fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num?.toString() || '0';
    };

    const formatPercentage = (num) => {
        return num >= 0 ? `+${num.toFixed(1)}%` : `${num.toFixed(1)}%`;
    };

    const getTimeRangeLabel = () => {
        switch (timeRange) {
            case '24h': return 'Last 24 Hours';
            case '7d': return 'Last 7 Days';
            case '30d': return 'Last 30 Days';
            case '90d': return 'Last 90 Days';
            default: return 'Last 7 Days';
        }
    };

    const renderMiniChart = (data, color = '#8b5cf6') => {
        if (!data || data.length === 0) return null;

        const max = Math.max(...data.map(d => d.value));
        const min = Math.min(...data.map(d => d.value));
        const range = max - min || 1;

        return (
            <svg className="mini-chart" viewBox="0 0 100 30" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path
                    d={data.map((point, i) => {
                        const x = (i / (data.length - 1)) * 100;
                        const y = 30 - ((point.value - min) / range) * 30;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                />
                <path
                    d={`${data.map((point, i) => {
                        const x = (i / (data.length - 1)) * 100;
                        const y = 30 - ((point.value - min) / range) * 30;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')} L 100 30 L 0 30 Z`}
                    fill={`url(#gradient-${color})`}
                />
            </svg>
        );
    };

    const renderBarChart = (data, maxHeight = 100) => {
        if (!data || data.length === 0) return null;

        const max = Math.max(...data.map(d => d.value));

        return (
            <div className="bar-chart">
                {data.map((item, index) => (
                    <div key={index} className="bar-item">
                        <div className="bar-wrapper">
                            <div
                                className="bar-fill"
                                style={{ height: `${(item.value / max) * 100}%` }}
                            />
                            <span className="bar-value">{formatNumber(item.value)}</span>
                        </div>
                        <span className="bar-label">{item.label}</span>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="analytics-overlay">
                <div className="analytics-panel loading">
                    <div className="spinner" />
                    <p>Loading Analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="analytics-overlay">
            <div className="analytics-panel">
                <div className="panel-header">
                    <div>
                        <h2><FaChartLine /> Server Analytics</h2>
                        <p className="time-range-label">{getTimeRangeLabel()}</p>
                    </div>
                    <button onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="time-range-selector">
                    <button
                        className={timeRange === '24h' ? 'active' : ''}
                        onClick={() => setTimeRange('24h')}
                    >
                        24 Hours
                    </button>
                    <button
                        className={timeRange === '7d' ? 'active' : ''}
                        onClick={() => setTimeRange('7d')}
                    >
                        7 Days
                    </button>
                    <button
                        className={timeRange === '30d' ? 'active' : ''}
                        onClick={() => setTimeRange('30d')}
                    >
                        30 Days
                    </button>
                    <button
                        className={timeRange === '90d' ? 'active' : ''}
                        onClick={() => setTimeRange('90d')}
                    >
                        90 Days
                    </button>
                </div>

                <div className="analytics-content">
                    {/* Overview Cards */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-icon messages">
                                <FaComments />
                            </div>
                            <div className="stat-info">
                                <h3>{formatNumber(overview?.total_messages || 0)}</h3>
                                <p>Total Messages</p>
                                <span className={`stat-change ${overview?.message_change >= 0 ? 'positive' : 'negative'}`}>
                                    {formatPercentage(overview?.message_change || 0)}
                                </span>
                            </div>
                            {messageStats?.timeline && renderMiniChart(messageStats.timeline, '#8b5cf6')}
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon users">
                                <FaUsers />
                            </div>
                            <div className="stat-info">
                                <h3>{formatNumber(overview?.active_users || 0)}</h3>
                                <p>Active Users</p>
                                <span className={`stat-change ${overview?.user_change >= 0 ? 'positive' : 'negative'}`}>
                                    {formatPercentage(overview?.user_change || 0)}
                                </span>
                            </div>
                            {userGrowth?.timeline && renderMiniChart(userGrowth.timeline, '#34c759')}
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon voice">
                                <FaMicrophone />
                            </div>
                            <div className="stat-info">
                                <h3>{formatNumber(overview?.voice_minutes || 0)}</h3>
                                <p>Voice Minutes</p>
                                <span className={`stat-change ${overview?.voice_change >= 0 ? 'positive' : 'negative'}`}>
                                    {formatPercentage(overview?.voice_change || 0)}
                                </span>
                            </div>
                            {voiceStats?.timeline && renderMiniChart(voiceStats.timeline, '#ff9f0a')}
                        </div>

                        <div className="stat-card">
                            <div className="stat-icon growth">
                                <FaUserPlus />
                            </div>
                            <div className="stat-info">
                                <h3>{formatNumber(overview?.new_members || 0)}</h3>
                                <p>New Members</p>
                                <span className={`stat-change ${overview?.growth_rate >= 0 ? 'positive' : 'negative'}`}>
                                    {formatPercentage(overview?.growth_rate || 0)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Peak Hours */}
                    <div className="chart-section">
                        <h3><FaClock /> Peak Activity Hours</h3>
                        {peakHours?.hourly_data && renderBarChart(peakHours.hourly_data)}
                    </div>

                    {/* Top Users & Channels */}
                    <div className="leaderboards">
                        <div className="leaderboard">
                            <h3><FaTrophy /> Top Active Users</h3>
                            <div className="leaderboard-list">
                                {topUsers?.users?.map((user, index) => (
                                    <div key={user.user_id} className="leaderboard-item">
                                        <div className="rank">#{index + 1}</div>
                                        <img src={user.avatar || '/default-avatar.png'} alt={user.username} />
                                        <div className="user-info">
                                            <span className="username">{user.username}</span>
                                            <span className="message-count">{formatNumber(user.message_count)} messages</span>
                                        </div>
                                        <div className="activity-bar">
                                            <div
                                                className="activity-fill"
                                                style={{ width: `${(user.message_count / topUsers.users[0]?.message_count) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="leaderboard">
                            <h3><FaHashtag /> Most Active Channels</h3>
                            <div className="leaderboard-list">
                                {topChannels?.channels?.map((channel, index) => (
                                    <div key={channel.channel_id} className="leaderboard-item">
                                        <div className="rank">#{index + 1}</div>
                                        <div className="channel-icon">
                                            <FaHashtag />
                                        </div>
                                        <div className="channel-info">
                                            <span className="channel-name">{channel.channel_name}</span>
                                            <span className="message-count">{formatNumber(channel.message_count)} messages</span>
                                        </div>
                                        <div className="activity-bar">
                                            <div
                                                className="activity-fill"
                                                style={{ width: `${(channel.message_count / topChannels.channels[0]?.message_count) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* User Growth Chart */}
                    {userGrowth?.daily_data && (
                        <div className="chart-section">
                            <h3><FaCalendar /> User Growth Trend</h3>
                            {renderBarChart(userGrowth.daily_data)}
                        </div>
                    )}

                    {/* Channel Stats */}
                    {channelStats?.categories && (
                        <div className="channel-breakdown">
                            <h3><FaServer /> Activity by Channel Type</h3>
                            <div className="channel-types">
                                {channelStats.categories.map((cat, index) => (
                                    <div key={index} className="channel-type-card">
                                        <div className="type-header">
                                            <h4>{cat.type}</h4>
                                            <span className="type-count">{cat.count} channels</span>
                                        </div>
                                        <div className="type-stats">
                                            <div className="type-stat">
                                                <span className="stat-label">Messages</span>
                                                <span className="stat-value">{formatNumber(cat.messages)}</span>
                                            </div>
                                            <div className="type-stat">
                                                <span className="stat-label">Active Users</span>
                                                <span className="stat-value">{formatNumber(cat.active_users)}</span>
                                            </div>
                                        </div>
                                        <div className="type-progress">
                                            <div
                                                className="type-progress-fill"
                                                style={{ width: `${(cat.messages / channelStats.total_messages) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;

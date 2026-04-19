// frontend/src/components/panels/ChannelAnalyticsPanel.js
// 📈 Channel Analytics - Detailed channel statistics and activity insights

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    FaTimes,
    FaChartBar,
    FaHashtag,
    FaVolumeUp,
    FaUsers,
    FaComment,
    FaClock,
    FaFire,
    FaTrophy,
    FaArrowUp,
    FaArrowDown,
    FaMinus,
    FaSync,
    FaCalendarAlt,
    FaEye,
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import './ChannelAnalyticsPanel.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const ChannelAnalyticsPanel = ({ serverId, onClose, fetchWithAuth }) => {
    const { t } = useTranslation();

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [timeRange, setTimeRange] = useState('week');

    const loadAnalytics = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${getApiBase()}/servers/${serverId}/channel-analytics/?range=${timeRange}`
            );
            if (response.ok) {
                const data = await response.json();
                setAnalytics(data);
            } else {
                // Fallback demo data
                setAnalytics({
                    summary: {
                        total_channels: 24,
                        active_channels: 18,
                        total_messages: 45823,
                        average_response_time: 2.4,
                    },
                    channels: [
                        {
                            id: 1,
                            name: 'general',
                            type: 'text',
                            messages: 12450,
                            active_users: 234,
                            growth: 15.2,
                            peak_hour: 20,
                        },
                        {
                            id: 2,
                            name: 'announcements',
                            type: 'text',
                            messages: 856,
                            active_users: 512,
                            growth: 8.4,
                            peak_hour: 12,
                        },
                        {
                            id: 3,
                            name: 'memes',
                            type: 'text',
                            messages: 8932,
                            active_users: 189,
                            growth: 22.1,
                            peak_hour: 22,
                        },
                        {
                            id: 4,
                            name: 'gaming',
                            type: 'text',
                            messages: 6721,
                            active_users: 145,
                            growth: -3.2,
                            peak_hour: 21,
                        },
                        {
                            id: 5,
                            name: 'music',
                            type: 'voice',
                            messages: 0,
                            active_users: 67,
                            growth: 5.8,
                            peak_hour: 19,
                        },
                        {
                            id: 6,
                            name: 'help',
                            type: 'text',
                            messages: 3421,
                            active_users: 98,
                            growth: 0,
                            peak_hour: 14,
                        },
                    ],
                    peak_hours: [
                        { hour: 20, activity: 100 },
                        { hour: 21, activity: 95 },
                        { hour: 22, activity: 88 },
                        { hour: 19, activity: 82 },
                        { hour: 18, activity: 75 },
                    ],
                    engagement_rate: 76.4,
                });
            }
        } catch (error) {
            logger.error('Error loading analytics:', error);
            setAnalytics({ summary: {}, channels: [], peak_hours: [] });
        }
        setLoading(false);
    }, [serverId, timeRange, fetchWithAuth]);

    useEffect(() => {
        loadAnalytics();
    }, [loadAnalytics]);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num?.toString() || '0';
    };

    const getGrowthIcon = (growth) => {
        if (growth > 0) return <FaArrowUp className="growth-up" />;
        if (growth < 0) return <FaArrowDown className="growth-down" />;
        return <FaMinus className="growth-neutral" />;
    };

    const getChannelIcon = (type) => {
        return type === 'voice' ? <FaVolumeUp /> : <FaHashtag />;
    };

    if (loading) {
        return (
            <div
                className="channel-analytics-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="channel-analytics-panel"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="loading-state">
                        <FaSync className="spin" />
                        <span>{t('loading_channel_analytics')}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="channel-analytics-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="channel-analytics-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* Header */}
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaChartBar />
                            {t('channel_analytics')}
                        </h2>
                        <span className="subtitle">
                            {t('track_channel_performance_and_engagement')}
                        </span>
                    </div>
                    <div className="header-actions">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="time-select"
                        >
                            <option value="day">{t('last_24_hours')}</option>
                            <option value="week">{t('last_7_days')}</option>
                            <option value="month">{t('last_30_days')}</option>
                        </select>
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="summary-cards">
                    <div className="summary-card">
                        <div className="card-icon">
                            <FaHashtag />
                        </div>
                        <div className="card-content">
                            <span className="card-value">
                                {analytics?.summary?.total_channels || 0}
                            </span>
                            <span className="card-label">{t('total_channels')}</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="card-icon active">
                            <FaFire />
                        </div>
                        <div className="card-content">
                            <span className="card-value">
                                {analytics?.summary?.active_channels || 0}
                            </span>
                            <span className="card-label">{t('active_channels')}</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="card-icon">
                            <FaComment />
                        </div>
                        <div className="card-content">
                            <span className="card-value">
                                {formatNumber(analytics?.summary?.total_messages)}
                            </span>
                            <span className="card-label">{t('total_messages')}</span>
                        </div>
                    </div>
                    <div className="summary-card">
                        <div className="card-icon">
                            <FaEye />
                        </div>
                        <div className="card-content">
                            <span className="card-value">{analytics?.engagement_rate || 0}%</span>
                            <span className="card-label">{t('engagement_rate')}</span>
                        </div>
                    </div>
                </div>

                <div className="panel-body">
                    {/* Channel Leaderboard */}
                    <div className="section">
                        <h3>
                            <FaTrophy />
                            {t('channel_leaderboard')}
                        </h3>
                        <div className="channel-list">
                            {(analytics?.channels || [])
                                .sort((a, b) => b.messages - a.messages)
                                .map((channel, index) => (
                                    <div
                                        key={channel.id}
                                        className={`channel-item ${selectedChannel === channel.id ? 'selected' : ''}`}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() =>
                                            setSelectedChannel(
                                                channel.id === selectedChannel ? null : channel.id
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <span className={`rank ${index < 3 ? 'top' : ''}`}>
                                            {index + 1}
                                        </span>
                                        <span className="channel-icon">
                                            {getChannelIcon(channel.type)}
                                        </span>
                                        <div className="channel-info">
                                            <span className="channel-name">{channel.name}</span>
                                            <div className="channel-stats">
                                                <span>
                                                    <FaComment /> {formatNumber(channel.messages)}
                                                </span>
                                                <span>
                                                    <FaUsers /> {channel.active_users}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="channel-growth">
                                            {getGrowthIcon(channel.growth)}
                                            <span
                                                className={
                                                    channel.growth > 0
                                                        ? 'positive'
                                                        : channel.growth < 0
                                                          ? 'negative'
                                                          : ''
                                                }
                                            >
                                                {Math.abs(channel.growth)}%
                                            </span>
                                        </div>
                                        <div className="channel-bar">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    width: `${(channel.messages / (analytics?.channels?.[0]?.messages || 1)) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            {(!analytics?.channels || analytics.channels.length === 0) && (
                                <div className="empty-state">{t('no_channel_data_available')}</div>
                            )}
                        </div>
                    </div>

                    {/* Peak Activity Hours */}
                    <div className="section">
                        <h3>
                            <FaClock />
                            {t('peak_activity_hours')}
                        </h3>
                        <div className="peak-hours">
                            {(analytics?.peak_hours || []).map((item, index) => (
                                <div key={`item-${index}`} className="peak-item">
                                    <span className="peak-rank">{index + 1}</span>
                                    <div className="peak-time">
                                        <FaCalendarAlt />
                                        <span>
                                            {item.hour}:00 - {item.hour + 1}:00
                                        </span>
                                    </div>
                                    <div className="peak-bar">
                                        <div
                                            className="bar-fill"
                                            style={{ width: `${item.activity}%` }}
                                        />
                                    </div>
                                    <span className="peak-value">{item.activity}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Selected Channel Details */}
                    {selectedChannel && (
                        <div className="section channel-details">
                            <h3>
                                <FaHashtag />
                                {t('channel_details')}
                            </h3>
                            {(() => {
                                const channel = analytics?.channels?.find(
                                    (c) => c.id === selectedChannel
                                );
                                if (!channel) return null;
                                return (
                                    <div className="details-grid">
                                        <div className="detail-card">
                                            <span className="detail-label">{t('peak_hour')}</span>
                                            <span className="detail-value">
                                                {channel.peak_hour}:00
                                            </span>
                                        </div>
                                        <div className="detail-card">
                                            <span className="detail-label">
                                                {t('active_users')}
                                            </span>
                                            <span className="detail-value">
                                                {channel.active_users}
                                            </span>
                                        </div>
                                        <div className="detail-card">
                                            <span className="detail-label">
                                                {t('weekly_growth')}
                                            </span>
                                            <span
                                                className={`detail-value ${channel.growth > 0 ? 'positive' : channel.growth < 0 ? 'negative' : ''}`}
                                            >
                                                {channel.growth > 0 ? '+' : ''}
                                                {channel.growth}%
                                            </span>
                                        </div>
                                        <div className="detail-card">
                                            <span className="detail-label">
                                                {t('messages_day')}
                                            </span>
                                            <span className="detail-value">
                                                {Math.round(channel.messages / 7)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ChannelAnalyticsPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
};
export default ChannelAnalyticsPanel;

import React, { useState, useEffect } from 'react';
import {
    FaChartLine, FaTimes, FaEye, FaClock, FaHeart, FaComment,
    FaUsers, FaPlay, FaCalendar, FaArrowUp, FaArrowDown,
    FaChartBar, FaUserPlus, FaUserMinus, FaDownload, FaSync,
    FaExclamationCircle, FaTrophy, FaFire, FaStar
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './LiveStreamAnalyticsPanel.css';

const LiveStreamAnalyticsPanel = ({ streamId, streamTitle, onClose }) => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('live'); // live, today, week, month
    const [activeTab, setActiveTab] = useState('overview');
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchAnalytics();
    }, [streamId, timeRange]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/streams/${streamId}/analytics/?range=${timeRange}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setAnalytics(await response.json());
            } else {
                setAnalytics(null);
            }
        } catch (error) {
            setAnalytics(null);
        }
        setLoading(false);
    };

    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) return `${hours}sa ${minutes}dk`;
        return `${minutes}dk`;
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const getPercentageColor = (percent) => {
        if (percent >= 70) return '#4caf50';
        if (percent >= 40) return '#ffc107';
        return '#f44336';
    };

    const handleExport = () => {
        toast.success('Analiz raporu indiriliyor...');
    };

    if (!analytics) return null;

    return (
        <div className="streamanalytics-overlay" onClick={(e) => e.target.className === 'streamanalytics-overlay' && onClose()}>
            <div className="streamanalytics-panel">
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaChartLine /> Yayın Analitiği</h2>
                        <span className="stream-title">{streamTitle}</span>
                    </div>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Time Range Selector */}
                <div className="time-selector">
                    <button className={timeRange === 'live' ? 'active' : ''} onClick={() => setTimeRange('live')}>
                        <FaFire /> Canlı
                    </button>
                    <button className={timeRange === 'today' ? 'active' : ''} onClick={() => setTimeRange('today')}>
                        Bugün
                    </button>
                    <button className={timeRange === 'week' ? 'active' : ''} onClick={() => setTimeRange('week')}>
                        Bu Hafta
                    </button>
                    <button className={timeRange === 'month' ? 'active' : ''} onClick={() => setTimeRange('month')}>
                        Bu Ay
                    </button>
                    <button className="refresh-btn" onClick={fetchAnalytics}>
                        <FaSync />
                    </button>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
                        Genel Bakış
                    </button>
                    <button className={activeTab === 'engagement' ? 'active' : ''} onClick={() => setActiveTab('engagement')}>
                        Etkileşim
                    </button>
                    <button className={activeTab === 'audience' ? 'active' : ''} onClick={() => setActiveTab('audience')}>
                        İzleyici
                    </button>
                </div>

                <div className="content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : activeTab === 'overview' ? (
                        /* Overview Tab */
                        <>
                            {/* Main Stats */}
                            <div className="stats-grid">
                                <div className="stat-card highlight">
                                    <FaEye className="stat-icon" />
                                    <div className="stat-content">
                                        <span className="stat-value">{formatNumber(analytics.live_stats.current_viewers)}</span>
                                        <span className="stat-label">Anlık İzleyici</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <FaTrophy className="stat-icon peak" />
                                    <div className="stat-content">
                                        <span className="stat-value">{formatNumber(analytics.live_stats.peak_viewers)}</span>
                                        <span className="stat-label">Zirve</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <FaClock className="stat-icon time" />
                                    <div className="stat-content">
                                        <span className="stat-value">{formatDuration(analytics.live_stats.watch_time_avg)}</span>
                                        <span className="stat-label">Ort. İzleme</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <FaUserPlus className="stat-icon followers" />
                                    <div className="stat-content">
                                        <span className="stat-value">+{analytics.live_stats.new_followers}</span>
                                        <span className="stat-label">Yeni Takipçi</span>
                                    </div>
                                </div>
                            </div>

                            {/* Viewer Timeline */}
                            <div className="chart-section">
                                <h3><FaChartBar /> İzleyici Zaman Çizelgesi</h3>
                                <div className="simple-chart">
                                    {analytics.viewer_timeline.map((point, index) => (
                                        <div key={index} className="chart-bar-container">
                                            <div
                                                className="chart-bar"
                                                style={{
                                                    height: `${(point.viewers / analytics.live_stats.peak_viewers) * 100}%`
                                                }}
                                            >
                                                <span className="bar-value">{formatNumber(point.viewers)}</span>
                                            </div>
                                            <span className="bar-label">{point.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Stream Duration */}
                            <div className="duration-card">
                                <FaPlay />
                                <span>Yayın Süresi: <strong>{formatDuration(analytics.live_stats.stream_duration)}</strong></span>
                            </div>
                        </>
                    ) : activeTab === 'engagement' ? (
                        /* Engagement Tab */
                        <>
                            {/* Engagement Stats */}
                            <div className="engagement-stats">
                                <div className="engagement-card">
                                    <div className="engagement-header">
                                        <FaComment />
                                        <span>Sohbet</span>
                                    </div>
                                    <div className="engagement-value">{formatNumber(analytics.live_stats.chat_messages)}</div>
                                    <div className="engagement-rate">{analytics.engagement.messages_per_minute}/dk</div>
                                </div>
                                <div className="engagement-card">
                                    <div className="engagement-header">
                                        <FaHeart />
                                        <span>Tepkiler</span>
                                    </div>
                                    <div className="engagement-value">{formatNumber(analytics.live_stats.reactions)}</div>
                                    <div className="engagement-rate">{analytics.engagement.reactions_per_minute}/dk</div>
                                </div>
                                <div className="engagement-card highlight">
                                    <div className="engagement-header">
                                        <FaStar />
                                        <span>Etkileşim Oranı</span>
                                    </div>
                                    <div className="engagement-value">{analytics.engagement.engagement_rate}%</div>
                                    <div className="engagement-rate">Mükemmel!</div>
                                </div>
                            </div>

                            {/* Top Chatters */}
                            <div className="top-chatters">
                                <h3><FaTrophy /> En Aktif İzleyiciler</h3>
                                <div className="chatter-list">
                                    {analytics.top_chatters.map((chatter, index) => (
                                        <div key={index} className="chatter-item">
                                            <span className="rank">#{index + 1}</span>
                                            <span className="chatter-name">{chatter.username}</span>
                                            <div className="chatter-stats">
                                                <span><FaComment /> {chatter.messages}</span>
                                                <span><FaHeart /> {chatter.reactions}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        /* Audience Tab */
                        <>
                            {/* Retention */}
                            <div className="retention-section">
                                <h3><FaClock /> İzleyici Kalıcılığı</h3>
                                <div className="retention-bars">
                                    {analytics.retention.map((item, index) => (
                                        <div key={index} className="retention-item">
                                            <span className="retention-time">{item.time}</span>
                                            <div className="retention-bar-bg">
                                                <div
                                                    className="retention-bar"
                                                    style={{
                                                        width: `${item.percentage}%`,
                                                        background: getPercentageColor(item.percentage)
                                                    }}
                                                />
                                            </div>
                                            <span className="retention-value">{item.percentage}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Demographics */}
                            <div className="demographics">
                                <div className="demo-card">
                                    <h4>Platform Dağılımı</h4>
                                    <div className="demo-items">
                                        <div className="demo-item">
                                            <span>Masaüstü</span>
                                            <div className="demo-bar">
                                                <div style={{ width: `${analytics.demographics.platforms.desktop}%` }} />
                                            </div>
                                            <span>{analytics.demographics.platforms.desktop}%</span>
                                        </div>
                                        <div className="demo-item">
                                            <span>Mobil</span>
                                            <div className="demo-bar">
                                                <div style={{ width: `${analytics.demographics.platforms.mobile}%` }} />
                                            </div>
                                            <span>{analytics.demographics.platforms.mobile}%</span>
                                        </div>
                                        <div className="demo-item">
                                            <span>Tablet</span>
                                            <div className="demo-bar">
                                                <div style={{ width: `${analytics.demographics.platforms.tablet}%` }} />
                                            </div>
                                            <span>{analytics.demographics.platforms.tablet}%</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="demo-card">
                                    <h4>Bölge Dağılımı</h4>
                                    <div className="demo-items">
                                        {Object.entries(analytics.demographics.regions).map(([region, percent]) => (
                                            <div key={region} className="demo-item">
                                                <span>{region}</span>
                                                <div className="demo-bar">
                                                    <div style={{ width: `${percent}%` }} />
                                                </div>
                                                <span>{percent}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="panel-footer">
                    <button className="export-btn" onClick={handleExport}>
                        <FaDownload /> Rapor İndir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LiveStreamAnalyticsPanel;

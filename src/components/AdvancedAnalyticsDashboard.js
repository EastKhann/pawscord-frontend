// frontend/src/components/AdvancedAnalyticsDashboard.js - Complete Analytics UI
import { useState, useEffect } from 'react';
import {
    FaChartLine, FaChartBar, FaChartPie, FaUsers, FaComments,
    FaClock, FaCalendar, FaGlobe, FaLink, FaHeart, FaEye,
    FaArrowUp, FaArrowDown, FaMinus, FaTimes, FaDownload,
    FaFilter, FaSyncAlt, FaExpand, FaInfoCircle
} from 'react-icons/fa';
import toast from '../utils/toast';
import './AdvancedAnalyticsDashboard.css';

const AdvancedAnalyticsDashboard = ({ serverId, apiBaseUrl, onClose }) => {
    const [timeRange, setTimeRange] = useState('7d'); // '24h', '7d', '30d', '90d'
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Analytics data
    const [overview, setOverview] = useState({
        total_members: 0,
        active_members: 0,
        messages_count: 0,
        voice_minutes: 0,
        member_growth: 0,
        message_growth: 0
    });

    const [memberActivity, setMemberActivity] = useState([]);
    const [messageActivity, setMessageActivity] = useState([]);
    const [topChannels, setTopChannels] = useState([]);
    const [topMembers, setTopMembers] = useState([]);
    const [geoData, setGeoData] = useState([]);
    const [reactionStats, setReactionStats] = useState([]);
    const [linkClicks, setLinkClicks] = useState([]);
    const [peakHours, setPeakHours] = useState([]);

    useEffect(() => {
        fetchAllAnalytics();
    }, [serverId, timeRange]);

    const fetchAllAnalytics = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const headers = { 'Authorization': `Bearer ${token}` };

            // Fetch all data in parallel
            const [
                overviewRes,
                memberRes,
                messageRes,
                channelsRes,
                membersRes,
                geoRes,
                reactionRes,
                linkRes,
                peakRes
            ] = await Promise.all([
                fetch(`${apiBaseUrl}/analytics/${serverId}/overview/?range=${timeRange}`, { headers }),
                fetch(`${apiBaseUrl}/analytics/${serverId}/member-activity/?range=${timeRange}`, { headers }),
                fetch(`${apiBaseUrl}/analytics/${serverId}/message-activity/?range=${timeRange}`, { headers }),
                fetch(`${apiBaseUrl}/analytics/${serverId}/top-channels/?range=${timeRange}`, { headers }),
                fetch(`${apiBaseUrl}/analytics/${serverId}/top-members/?range=${timeRange}`, { headers }),
                fetch(`${apiBaseUrl}/analytics/${serverId}/geo/?range=${timeRange}`, { headers }),
                fetch(`${apiBaseUrl}/analytics/${serverId}/reactions/?range=${timeRange}`, { headers }),
                fetch(`${apiBaseUrl}/analytics/${serverId}/link-clicks/?range=${timeRange}`, { headers }),
                fetch(`${apiBaseUrl}/analytics/${serverId}/peak-hours/?range=${timeRange}`, { headers })
            ]);

            if (overviewRes.ok) setOverview(await overviewRes.json());
            if (memberRes.ok) setMemberActivity((await memberRes.json()).data || []);
            if (messageRes.ok) setMessageActivity((await messageRes.json()).data || []);
            if (channelsRes.ok) setTopChannels((await channelsRes.json()).channels || []);
            if (membersRes.ok) setTopMembers((await membersRes.json()).members || []);
            if (geoRes.ok) setGeoData((await geoRes.json()).data || []);
            if (reactionRes.ok) setReactionStats((await reactionRes.json()).reactions || []);
            if (linkRes.ok) setLinkClicks((await linkRes.json()).links || []);
            if (peakRes.ok) setPeakHours((await peakRes.json()).hours || []);

        } catch (error) {
            console.error('Fetch analytics error:', error);
            toast.error('❌ Analitik verileri yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchAllAnalytics();
        setRefreshing(false);
        toast.success('🔄 Veriler güncellendi');
    };

    const handleExport = () => {
        const exportData = {
            exported_at: new Date().toISOString(),
            time_range: timeRange,
            overview,
            memberActivity,
            messageActivity,
            topChannels,
            topMembers,
            geoData,
            reactionStats
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `analytics_${serverId}_${timeRange}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('📥 Analitik verileri indirildi');
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const getGrowthIndicator = (value) => {
        if (value > 0) return { icon: FaArrowUp, color: '#23a559', text: `+${value}%` };
        if (value < 0) return { icon: FaArrowDown, color: '#da373c', text: `${value}%` };
        return { icon: FaMinus, color: '#72767d', text: '0%' };
    };

    const renderSimpleChart = (data, color = '#5865f2', height = 60) => {
        if (!data || data.length === 0) return null;
        const max = Math.max(...data.map(d => d.value));
        const width = 100 / data.length;

        return (
            <div className="simple-chart" style={{ height }}>
                {data.map((item, idx) => (
                    <div
                        key={idx}
                        className="chart-bar"
                        style={{
                            width: `${width}%`,
                            height: `${(item.value / max) * 100}%`,
                            background: color
                        }}
                        title={`${item.label}: ${item.value}`}
                    />
                ))}
            </div>
        );
    };

    const renderPeakHoursChart = () => {
        const hours = Array(24).fill(0).map((_, i) => {
            const hour = peakHours.find(h => h.hour === i);
            return { hour: i, value: hour?.value || 0 };
        });
        const max = Math.max(...hours.map(h => h.value));

        return (
            <div className="peak-hours-chart">
                {hours.map((h, idx) => (
                    <div
                        key={idx}
                        className="hour-bar"
                        style={{
                            height: `${max > 0 ? (h.value / max) * 100 : 0}%`,
                            background: h.value > max * 0.8 ? '#23a559' : h.value > max * 0.5 ? '#5865f2' : '#3f4147'
                        }}
                        title={`${h.hour}:00 - ${h.value} mesaj`}
                    >
                        <span className="hour-label">{h.hour}</span>
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="analytics-overlay" onClick={onClose}>
                <div className="analytics-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Analitik verileri yükleniyor...</p>
                    </div>
                </div>
            </div>
        );
    }

    const memberGrowth = getGrowthIndicator(overview.member_growth);
    const messageGrowth = getGrowthIndicator(overview.message_growth);

    return (
        <div className="analytics-overlay" onClick={onClose}>
            <div className="analytics-panel" onClick={e => e.stopPropagation()}>
                <div className="analytics-header">
                    <h2><FaChartLine /> Gelişmiş Analitik</h2>
                    <div className="header-controls">
                        <div className="time-range-selector">
                            {['24h', '7d', '30d', '90d'].map(range => (
                                <button
                                    key={range}
                                    className={`range-btn ${timeRange === range ? 'active' : ''}`}
                                    onClick={() => setTimeRange(range)}
                                >
                                    {range === '24h' ? '24 Saat' : range === '7d' ? '7 Gün' : range === '30d' ? '30 Gün' : '90 Gün'}
                                </button>
                            ))}
                        </div>
                        <button
                            className="action-btn"
                            onClick={handleRefresh}
                            disabled={refreshing}
                        >
                            <FaSyncAlt className={refreshing ? 'spinning' : ''} />
                        </button>
                        <button className="action-btn" onClick={handleExport}>
                            <FaDownload />
                        </button>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="analytics-content">
                    {/* Overview Cards */}
                    <div className="overview-section">
                        <div className="overview-card">
                            <div className="card-icon members">
                                <FaUsers />
                            </div>
                            <div className="card-content">
                                <span className="card-value">{formatNumber(overview.total_members)}</span>
                                <span className="card-label">Toplam Üye</span>
                                <span className="card-growth" style={{ color: memberGrowth.color }}>
                                    <memberGrowth.icon /> {memberGrowth.text}
                                </span>
                            </div>
                        </div>

                        <div className="overview-card">
                            <div className="card-icon active">
                                <FaEye />
                            </div>
                            <div className="card-content">
                                <span className="card-value">{formatNumber(overview.active_members)}</span>
                                <span className="card-label">Aktif Üye</span>
                                <span className="card-detail">
                                    {((overview.active_members / overview.total_members) * 100 || 0).toFixed(1)}% aktiflik
                                </span>
                            </div>
                        </div>

                        <div className="overview-card">
                            <div className="card-icon messages">
                                <FaComments />
                            </div>
                            <div className="card-content">
                                <span className="card-value">{formatNumber(overview.messages_count)}</span>
                                <span className="card-label">Mesaj</span>
                                <span className="card-growth" style={{ color: messageGrowth.color }}>
                                    <messageGrowth.icon /> {messageGrowth.text}
                                </span>
                            </div>
                        </div>

                        <div className="overview-card">
                            <div className="card-icon voice">
                                <FaClock />
                            </div>
                            <div className="card-content">
                                <span className="card-value">{formatNumber(overview.voice_minutes)}</span>
                                <span className="card-label">Sesli Dakika</span>
                                <span className="card-detail">
                                    {Math.round(overview.voice_minutes / 60)} saat
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="charts-grid">
                        {/* Member Activity Chart */}
                        <div className="chart-card">
                            <div className="chart-header">
                                <h3><FaUsers /> Üye Aktivitesi</h3>
                            </div>
                            <div className="chart-body">
                                {memberActivity.length > 0 ? (
                                    renderSimpleChart(memberActivity, '#5865f2', 120)
                                ) : (
                                    <div className="no-data">Veri yok</div>
                                )}
                            </div>
                        </div>

                        {/* Message Activity Chart */}
                        <div className="chart-card">
                            <div className="chart-header">
                                <h3><FaComments /> Mesaj Aktivitesi</h3>
                            </div>
                            <div className="chart-body">
                                {messageActivity.length > 0 ? (
                                    renderSimpleChart(messageActivity, '#23a559', 120)
                                ) : (
                                    <div className="no-data">Veri yok</div>
                                )}
                            </div>
                        </div>

                        {/* Peak Hours Chart */}
                        <div className="chart-card wide">
                            <div className="chart-header">
                                <h3><FaClock /> Yoğunluk Saatleri</h3>
                                <span className="chart-info">
                                    <FaInfoCircle /> En yoğun saatler yeşil ile gösterilir
                                </span>
                            </div>
                            <div className="chart-body">
                                {peakHours.length > 0 ? (
                                    renderPeakHoursChart()
                                ) : (
                                    <div className="no-data">Veri yok</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Top Lists */}
                    <div className="lists-grid">
                        {/* Top Channels */}
                        <div className="list-card">
                            <div className="list-header">
                                <h3><FaChartBar /> En Aktif Kanallar</h3>
                            </div>
                            <div className="list-body">
                                {topChannels.length > 0 ? (
                                    topChannels.map((channel, idx) => (
                                        <div key={channel.id} className="list-item">
                                            <span className="rank">{idx + 1}</span>
                                            <span className="name"># {channel.name}</span>
                                            <div className="bar-container">
                                                <div
                                                    className="bar"
                                                    style={{
                                                        width: `${(channel.messages / topChannels[0].messages) * 100}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="value">{formatNumber(channel.messages)}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-data">Veri yok</div>
                                )}
                            </div>
                        </div>

                        {/* Top Members */}
                        <div className="list-card">
                            <div className="list-header">
                                <h3><FaUsers /> En Aktif Üyeler</h3>
                            </div>
                            <div className="list-body">
                                {topMembers.length > 0 ? (
                                    topMembers.map((member, idx) => (
                                        <div key={member.id} className="list-item">
                                            <span className="rank">{idx + 1}</span>
                                            <img
                                                src={member.avatar || '/default-avatar.png'}
                                                alt={member.username}
                                                className="avatar"
                                            />
                                            <span className="name">{member.username}</span>
                                            <span className="value">{formatNumber(member.messages)} mesaj</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-data">Veri yok</div>
                                )}
                            </div>
                        </div>

                        {/* Reaction Stats */}
                        <div className="list-card">
                            <div className="list-header">
                                <h3><FaHeart /> En Çok Kullanılan Reaksiyonlar</h3>
                            </div>
                            <div className="list-body">
                                {reactionStats.length > 0 ? (
                                    <div className="reactions-grid">
                                        {reactionStats.map((reaction, idx) => (
                                            <div key={idx} className="reaction-item">
                                                <span className="emoji">{reaction.emoji}</span>
                                                <span className="count">{formatNumber(reaction.count)}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-data">Veri yok</div>
                                )}
                            </div>
                        </div>

                        {/* Geo Data */}
                        <div className="list-card">
                            <div className="list-header">
                                <h3><FaGlobe /> Coğrafi Dağılım</h3>
                            </div>
                            <div className="list-body">
                                {geoData.length > 0 ? (
                                    geoData.map((geo, idx) => (
                                        <div key={idx} className="list-item">
                                            <span className="flag">{geo.flag || '🌍'}</span>
                                            <span className="name">{geo.country}</span>
                                            <div className="bar-container">
                                                <div
                                                    className="bar geo"
                                                    style={{
                                                        width: `${(geo.count / geoData[0].count) * 100}%`
                                                    }}
                                                />
                                            </div>
                                            <span className="value">{geo.percentage}%</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-data">Veri yok</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Link Clicks */}
                    {linkClicks.length > 0 && (
                        <div className="links-section">
                            <h3><FaLink /> Link Tıklamaları</h3>
                            <div className="links-table">
                                <div className="table-header">
                                    <span>URL</span>
                                    <span>Tıklama</span>
                                    <span>Benzersiz</span>
                                </div>
                                {linkClicks.map((link, idx) => (
                                    <div key={idx} className="table-row">
                                        <span className="link-url" title={link.url}>
                                            {link.url.length > 50 ? link.url.substring(0, 50) + '...' : link.url}
                                        </span>
                                        <span>{formatNumber(link.clicks)}</span>
                                        <span>{formatNumber(link.unique_clicks)}</span>
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

export default AdvancedAnalyticsDashboard;

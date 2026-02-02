// 📊 SERVER STATISTICS DASHBOARD
// Grafik, kelime bulutu, aktif saatler, üye sıralaması

import React, { useState, useEffect, useCallback } from 'react';
import './ServerStats.css';

const ServerStats = ({ serverId, serverName, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [messageChart, setMessageChart] = useState(null);
    const [activeHours, setActiveHours] = useState(null);
    const [activeDays, setActiveDays] = useState(null);
    const [wordCloud, setWordCloud] = useState(null);
    const [topMembers, setTopMembers] = useState(null);
    const [channelStats, setChannelStats] = useState(null);
    const [growthStats, setGrowthStats] = useState(null);
    const [chartDays, setChartDays] = useState(30);

    const API_URL = window.API_URL || 'https://api.pawscord.com/api';

    const fetchData = useCallback(async (endpoint) => {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/${endpoint}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
    }, [API_URL]);

    const loadOverview = useCallback(async () => {
        try {
            const data = await fetchData(`servers/${serverId}/stats/overview/`);
            setStats(data);
        } catch (e) {
            console.error('Failed to load overview:', e);
        }
    }, [serverId, fetchData]);

    const loadMessageChart = useCallback(async () => {
        try {
            const data = await fetchData(`servers/${serverId}/stats/messages/?days=${chartDays}`);
            setMessageChart(data);
        } catch (e) {
            console.error('Failed to load message chart:', e);
        }
    }, [serverId, chartDays, fetchData]);

    const loadActiveHours = useCallback(async () => {
        try {
            const data = await fetchData(`servers/${serverId}/stats/hours/`);
            setActiveHours(data);
        } catch (e) {
            console.error('Failed to load active hours:', e);
        }
    }, [serverId, fetchData]);

    const loadActiveDays = useCallback(async () => {
        try {
            const data = await fetchData(`servers/${serverId}/stats/days/`);
            setActiveDays(data);
        } catch (e) {
            console.error('Failed to load active days:', e);
        }
    }, [serverId, fetchData]);

    const loadWordCloud = useCallback(async () => {
        try {
            const data = await fetchData(`servers/${serverId}/stats/wordcloud/?limit=50`);
            setWordCloud(data);
        } catch (e) {
            console.error('Failed to load word cloud:', e);
        }
    }, [serverId, fetchData]);

    const loadTopMembers = useCallback(async () => {
        try {
            const data = await fetchData(`servers/${serverId}/stats/top-members/?limit=10`);
            setTopMembers(data);
        } catch (e) {
            console.error('Failed to load top members:', e);
        }
    }, [serverId, fetchData]);

    const loadChannelStats = useCallback(async () => {
        try {
            const data = await fetchData(`servers/${serverId}/stats/channels/`);
            setChannelStats(data);
        } catch (e) {
            console.error('Failed to load channel stats:', e);
        }
    }, [serverId, fetchData]);

    const loadGrowthStats = useCallback(async () => {
        try {
            const data = await fetchData(`servers/${serverId}/stats/growth/?days=${chartDays}`);
            setGrowthStats(data);
        } catch (e) {
            console.error('Failed to load growth stats:', e);
        }
    }, [serverId, chartDays, fetchData]);

    useEffect(() => {
        const loadAll = async () => {
            setLoading(true);
            await Promise.all([
                loadOverview(),
                loadMessageChart(),
                loadActiveHours(),
                loadActiveDays(),
                loadWordCloud(),
                loadTopMembers(),
                loadChannelStats(),
                loadGrowthStats()
            ]);
            setLoading(false);
        };
        loadAll();
    }, [loadOverview, loadMessageChart, loadActiveHours, loadActiveDays, loadWordCloud, loadTopMembers, loadChannelStats, loadGrowthStats]);

    // Mini chart component
    const MiniChart = ({ data, maxHeight = 100, color = '#5865F2' }) => {
        if (!data || data.length === 0) return null;
        const max = Math.max(...data.map(d => d.count), 1);

        return (
            <div className="mini-chart">
                {data.map((item, idx) => (
                    <div
                        key={idx}
                        className="chart-bar"
                        style={{
                            height: `${(item.count / max) * maxHeight}px`,
                            backgroundColor: color
                        }}
                        title={`${item.date || item.hour || item.day}: ${item.count}`}
                    />
                ))}
            </div>
        );
    };

    // Word cloud component
    const WordCloudDisplay = ({ words }) => {
        if (!words || words.length === 0) {
            return <div className="no-data">Henüz yeterli veri yok</div>;
        }

        const colors = ['#5865F2', '#57F287', '#FEE75C', '#ED4245', '#EB459E', '#9B59B6'];

        return (
            <div className="word-cloud">
                {words.map((word, idx) => (
                    <span
                        key={idx}
                        className="cloud-word"
                        style={{
                            fontSize: `${Math.max(12, word.size * 0.3)}px`,
                            color: colors[idx % colors.length],
                            opacity: 0.6 + (word.size / 200)
                        }}
                    >
                        {word.text}
                    </span>
                ))}
            </div>
        );
    };

    // Stat card component
    const StatCard = ({ icon, label, value, subValue, color }) => (
        <div className="stat-card" style={{ borderColor: color }}>
            <div className="stat-icon" style={{ color }}>{icon}</div>
            <div className="stat-content">
                <div className="stat-value">{value}</div>
                <div className="stat-label">{label}</div>
                {subValue && <div className="stat-sub">{subValue}</div>}
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="server-stats-modal">
                <div className="stats-loading">
                    <div className="loading-spinner" />
                    <p>İstatistikler yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="server-stats-modal">
            <div className="stats-header">
                <div className="stats-title">
                    <span className="stats-icon">📊</span>
                    <h2>{serverName || 'Sunucu'} İstatistikleri</h2>
                </div>
                <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="stats-tabs">
                <button
                    className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    📈 Genel
                </button>
                <button
                    className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
                    onClick={() => setActiveTab('messages')}
                >
                    💬 Mesajlar
                </button>
                <button
                    className={`tab ${activeTab === 'members' ? 'active' : ''}`}
                    onClick={() => setActiveTab('members')}
                >
                    👥 Üyeler
                </button>
                <button
                    className={`tab ${activeTab === 'wordcloud' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wordcloud')}
                >
                    ☁️ Kelimeler
                </button>
            </div>

            <div className="stats-content">
                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && stats && (
                    <div className="overview-tab">
                        <div className="stat-cards">
                            <StatCard
                                icon="👥"
                                label="Toplam Üye"
                                value={stats.total_members}
                                subValue={`${stats.online_members} çevrimiçi`}
                                color="#57F287"
                            />
                            <StatCard
                                icon="💬"
                                label="Toplam Mesaj"
                                value={stats.total_messages?.toLocaleString()}
                                subValue={`${stats.messages_last_7_days} son 7 günde`}
                                color="#5865F2"
                            />
                            <StatCard
                                icon="📢"
                                label="Kanal Sayısı"
                                value={stats.total_channels}
                                color="#FEE75C"
                            />
                            <StatCard
                                icon="📅"
                                label="Kuruluş"
                                value={new Date(stats.created_at).toLocaleDateString('tr-TR')}
                                color="#EB459E"
                            />
                        </div>

                        {activeHours && (
                            <div className="chart-section">
                                <h3>⏰ Saatlik Aktivite</h3>
                                <p className="chart-hint">En aktif saat: {activeHours.peak_hour}:00</p>
                                <MiniChart data={activeHours.hourly_data} color="#5865F2" />
                                <div className="chart-labels">
                                    <span>00:00</span>
                                    <span>06:00</span>
                                    <span>12:00</span>
                                    <span>18:00</span>
                                    <span>23:00</span>
                                </div>
                            </div>
                        )}

                        {activeDays && (
                            <div className="chart-section">
                                <h3>📆 Günlük Aktivite</h3>
                                <p className="chart-hint">En aktif gün: {activeDays.peak_day}</p>
                                <div className="days-chart">
                                    {activeDays.daily_data?.map((day, idx) => (
                                        <div key={idx} className="day-bar">
                                            <div
                                                className="bar-fill"
                                                style={{
                                                    height: `${(day.count / Math.max(...activeDays.daily_data.map(d => d.count), 1)) * 80}px`
                                                }}
                                            />
                                            <span className="day-label">{day.day.slice(0, 3)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* MESSAGES TAB */}
                {activeTab === 'messages' && (
                    <div className="messages-tab">
                        <div className="chart-controls">
                            <label>Süre:</label>
                            <select
                                value={chartDays}
                                onChange={(e) => setChartDays(Number(e.target.value))}
                            >
                                <option value={7}>Son 7 Gün</option>
                                <option value={14}>Son 14 Gün</option>
                                <option value={30}>Son 30 Gün</option>
                                <option value={60}>Son 60 Gün</option>
                                <option value={90}>Son 90 Gün</option>
                            </select>
                        </div>

                        {messageChart && (
                            <div className="chart-section large">
                                <h3>💬 Günlük Mesaj Sayısı</h3>
                                <p className="chart-hint">
                                    Toplam: {messageChart.total?.toLocaleString()} mesaj
                                </p>
                                <MiniChart
                                    data={messageChart.data}
                                    maxHeight={150}
                                    color="#57F287"
                                />
                            </div>
                        )}

                        {channelStats && (
                            <div className="channel-stats">
                                <h3>📢 Kanal Bazlı Aktivite</h3>
                                <div className="channel-list">
                                    {channelStats.channels?.slice(0, 10).map((channel, idx) => (
                                        <div key={channel.id} className="channel-row">
                                            <span className="channel-rank">#{idx + 1}</span>
                                            <span className="channel-icon">
                                                {channel.type === 'voice' ? '🔊' : '#'}
                                            </span>
                                            <span className="channel-name">{channel.name}</span>
                                            <span className="channel-count">
                                                {channel.message_count.toLocaleString()}
                                            </span>
                                            <div
                                                className="channel-bar"
                                                style={{
                                                    width: `${(channel.message_count / channelStats.channels[0].message_count) * 100}%`
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* MEMBERS TAB */}
                {activeTab === 'members' && (
                    <div className="members-tab">
                        {topMembers && (
                            <div className="leaderboard">
                                <h3>🏆 En Aktif Üyeler</h3>
                                <div className="member-list">
                                    {topMembers.top_members?.map((member, idx) => (
                                        <div key={idx} className={`member-row rank-${idx + 1}`}>
                                            <span className="rank">
                                                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                                            </span>
                                            <img
                                                src={member.avatar || '/default-avatar.png'}
                                                alt=""
                                                className="member-avatar"
                                            />
                                            <span className="member-name">{member.username}</span>
                                            <span className="member-messages">
                                                {member.message_count.toLocaleString()} mesaj
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {growthStats && (
                            <div className="chart-section">
                                <h3>📈 Üye Büyümesi</h3>
                                <p className="chart-hint">
                                    +{growthStats.total_growth} yeni üye ({chartDays} günde)
                                </p>
                                <MiniChart
                                    data={growthStats.data?.map(d => ({ ...d, count: d.new_members }))}
                                    maxHeight={100}
                                    color="#EB459E"
                                />
                            </div>
                        )}
                    </div>
                )}

                {/* WORD CLOUD TAB */}
                {activeTab === 'wordcloud' && (
                    <div className="wordcloud-tab">
                        <h3>☁️ En Çok Kullanılan Kelimeler</h3>
                        <p className="chart-hint">Son 7 günde en sık geçen kelimeler</p>
                        <WordCloudDisplay words={wordCloud?.words} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServerStats;

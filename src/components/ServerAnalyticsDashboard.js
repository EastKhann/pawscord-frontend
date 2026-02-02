// frontend/src/components/ServerAnalyticsDashboard.js
/**
 * 📊 PAWSCORD - Server Analytics Dashboard
 * ════════════════════════════════════════════════════════════════════════════════
 * Sunucu istatistikleri dashboard'u
 * ════════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
    FaTimes, FaChartLine, FaUsers, FaComments, FaHashtag,
    FaClock, FaArrowUp, FaArrowDown, FaCalendarAlt
} from 'react-icons/fa';

const ServerAnalyticsDashboard = ({
    isOpen,
    onClose,
    serverId,
    serverName,
    fetchWithAuth,
    apiBaseUrl
}) => {
    const [analytics, setAnalytics] = useState(null);
    const [comparison, setComparison] = useState(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('30d');

    // Fetch analytics data
    const fetchAnalytics = useCallback(async () => {
        if (!serverId) return;

        setLoading(true);
        try {
            const [analyticsRes, comparisonRes] = await Promise.all([
                fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/analytics/?period=${period}`),
                fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/analytics/compare/`)
            ]);

            if (analyticsRes.ok) {
                const data = await analyticsRes.json();
                setAnalytics(data);
            }

            if (comparisonRes.ok) {
                const data = await comparisonRes.json();
                setComparison(data);
            }
        } catch (e) {
            console.error('Analytics fetch error:', e);
        } finally {
            setLoading(false);
        }
    }, [serverId, period, fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        if (isOpen && serverId) {
            fetchAnalytics();
        }
    }, [isOpen, serverId, fetchAnalytics]);

    if (!isOpen) return null;

    const modalContent = (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine style={{ color: '#5865f2' }} />
                        <h2 style={styles.title}>{serverName || 'Sunucu'} Analytics</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <select
                            value={period}
                            onChange={e => setPeriod(e.target.value)}
                            style={styles.periodSelect}
                        >
                            <option value="7d">Son 7 Gün</option>
                            <option value="30d">Son 30 Gün</option>
                            <option value="90d">Son 90 Gün</option>
                        </select>
                        <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                    </div>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loadingState}>
                            <div style={styles.spinner}></div>
                            <span>Veriler yükleniyor...</span>
                        </div>
                    ) : analytics ? (
                        <>
                            {/* Quick Stats Row */}
                            <div style={styles.statsRow}>
                                <StatCard
                                    icon={<FaUsers />}
                                    label="Toplam Üye"
                                    value={analytics.member_growth?.total || 0}
                                    change={comparison?.change?.active_users}
                                    color="#5865f2"
                                />
                                <StatCard
                                    icon={<FaComments />}
                                    label="Toplam Mesaj"
                                    value={analytics.message_stats?.total || 0}
                                    subtext={`Günlük ort: ${analytics.message_stats?.daily_average || 0}`}
                                    change={comparison?.change?.messages}
                                    color="#43b581"
                                />
                                <StatCard
                                    icon={<FaUsers />}
                                    label="Aktif Üye"
                                    value={analytics.active_users?.total || 0}
                                    subtext={`%${analytics.active_users?.activity_rate || 0} aktivite`}
                                    color="#faa61a"
                                />
                                <StatCard
                                    icon={<FaClock />}
                                    label="En Yoğun Saat"
                                    value={analytics.peak_hours?.peak_hour_label || '-'}
                                    color="#f04747"
                                />
                            </div>

                            {/* Charts Row */}
                            <div style={styles.chartsRow}>
                                {/* Message Activity Chart */}
                                <div style={styles.chartCard}>
                                    <h3 style={styles.chartTitle}>📈 Mesaj Aktivitesi</h3>
                                    <div style={styles.barChart}>
                                        {analytics.message_stats?.daily?.slice(-14).map((d, i) => {
                                            const maxCount = Math.max(...(analytics.message_stats?.daily?.map(x => x.count) || [1]));
                                            const height = (d.count / maxCount) * 100;
                                            return (
                                                <div key={i} style={styles.barContainer}>
                                                    <div
                                                        style={{
                                                            ...styles.bar,
                                                            height: `${Math.max(height, 5)}%`,
                                                        }}
                                                        title={`${d.date}: ${d.count} mesaj`}
                                                    />
                                                    <span style={styles.barLabel}>
                                                        {new Date(d.date).getDate()}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Hourly Activity Chart */}
                                <div style={styles.chartCard}>
                                    <h3 style={styles.chartTitle}>⏰ Saatlik Aktivite</h3>
                                    <div style={styles.hourlyChart}>
                                        {analytics.peak_hours?.hourly?.map((count, hour) => {
                                            const maxCount = Math.max(...(analytics.peak_hours?.hourly || [1]));
                                            const intensity = count / maxCount;
                                            return (
                                                <div
                                                    key={hour}
                                                    style={{
                                                        ...styles.hourBlock,
                                                        backgroundColor: `rgba(88, 101, 242, ${Math.max(intensity, 0.1)})`,
                                                    }}
                                                    title={`${hour}:00 - ${count} mesaj`}
                                                >
                                                    {hour}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Lists Row */}
                            <div style={styles.listsRow}>
                                {/* Popular Channels */}
                                <div style={styles.listCard}>
                                    <h3 style={styles.listTitle}><FaHashtag /> Popüler Kanallar</h3>
                                    <div style={styles.list}>
                                        {analytics.popular_channels?.slice(0, 5).map((channel, i) => (
                                            <div key={i} style={styles.listItem}>
                                                <span style={styles.listRank}>#{i + 1}</span>
                                                <span style={styles.listName}>{channel.name}</span>
                                                <span style={styles.listValue}>{channel.messages} mesaj</span>
                                            </div>
                                        ))}
                                        {(!analytics.popular_channels || analytics.popular_channels.length === 0) && (
                                            <div style={styles.emptyList}>Veri yok</div>
                                        )}
                                    </div>
                                </div>

                                {/* Top Users */}
                                <div style={styles.listCard}>
                                    <h3 style={styles.listTitle}><FaUsers /> En Aktif Üyeler</h3>
                                    <div style={styles.list}>
                                        {analytics.active_users?.top_users?.slice(0, 5).map((user, i) => (
                                            <div key={i} style={styles.listItem}>
                                                <span style={styles.listRank}>#{i + 1}</span>
                                                <span style={styles.listName}>{user.username}</span>
                                                <span style={styles.listValue}>{user.messages} mesaj</span>
                                            </div>
                                        ))}
                                        {(!analytics.active_users?.top_users || analytics.active_users.top_users.length === 0) && (
                                            <div style={styles.emptyList}>Veri yok</div>
                                        )}
                                    </div>
                                </div>

                                {/* Content Breakdown */}
                                <div style={styles.listCard}>
                                    <h3 style={styles.listTitle}>📊 İçerik Dağılımı</h3>
                                    <div style={styles.pieChart}>
                                        {analytics.content_breakdown && (
                                            <>
                                                <ContentBar
                                                    label="Metin"
                                                    value={analytics.content_breakdown.text_only}
                                                    total={analytics.message_stats?.total || 1}
                                                    color="#5865f2"
                                                />
                                                <ContentBar
                                                    label="Resimli"
                                                    value={analytics.content_breakdown.with_images}
                                                    total={analytics.message_stats?.total || 1}
                                                    color="#43b581"
                                                />
                                                <ContentBar
                                                    label="Dosyalı"
                                                    value={analytics.content_breakdown.with_files}
                                                    total={analytics.message_stats?.total || 1}
                                                    color="#faa61a"
                                                />
                                                <ContentBar
                                                    label="Ses"
                                                    value={analytics.content_breakdown.voice_messages}
                                                    total={analytics.message_stats?.total || 1}
                                                    color="#f04747"
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Comparison Section */}
                            {comparison && (
                                <div style={styles.comparisonSection}>
                                    <h3 style={styles.sectionTitle}>📊 Haftalık Karşılaştırma</h3>
                                    <div style={styles.comparisonGrid}>
                                        <ComparisonCard
                                            label="Mesajlar"
                                            thisWeek={comparison.this_week?.messages}
                                            lastWeek={comparison.last_week?.messages}
                                            change={comparison.change?.messages}
                                        />
                                        <ComparisonCard
                                            label="Aktif Üyeler"
                                            thisWeek={comparison.this_week?.active_users}
                                            lastWeek={comparison.last_week?.active_users}
                                            change={comparison.change?.active_users}
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={styles.errorState}>
                            <span style={{ fontSize: '48px' }}>📊</span>
                            <p>Analytics verileri yüklenemedi</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

// Helper Components
const StatCard = ({ icon, label, value, subtext, change, color }) => (
    <div style={styles.statCard}>
        <div style={{ ...styles.statIcon, backgroundColor: color }}>{icon}</div>
        <div style={styles.statInfo}>
            <span style={styles.statLabel}>{label}</span>
            <span style={styles.statValue}>{typeof value === 'number' ? value.toLocaleString() : value}</span>
            {subtext && <span style={styles.statSubtext}>{subtext}</span>}
            {change !== undefined && (
                <span style={{
                    ...styles.statChange,
                    color: change >= 0 ? '#43b581' : '#f04747'
                }}>
                    {change >= 0 ? <FaArrowUp /> : <FaArrowDown />} {Math.abs(change)}%
                </span>
            )}
        </div>
    </div>
);

const ContentBar = ({ label, value, total, color }) => {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    return (
        <div style={styles.contentBarContainer}>
            <div style={styles.contentBarLabel}>
                <span>{label}</span>
                <span>{value} ({percentage}%)</span>
            </div>
            <div style={styles.contentBarTrack}>
                <div style={{
                    ...styles.contentBarFill,
                    width: `${percentage}%`,
                    backgroundColor: color
                }} />
            </div>
        </div>
    );
};

const ComparisonCard = ({ label, thisWeek, lastWeek, change }) => (
    <div style={styles.comparisonCard}>
        <span style={styles.comparisonLabel}>{label}</span>
        <div style={styles.comparisonValues}>
            <div style={styles.comparisonValue}>
                <span style={styles.comparisonPeriod}>Bu Hafta</span>
                <span style={styles.comparisonNumber}>{thisWeek?.toLocaleString() || 0}</span>
            </div>
            <div style={styles.comparisonValue}>
                <span style={styles.comparisonPeriod}>Geçen Hafta</span>
                <span style={styles.comparisonNumber}>{lastWeek?.toLocaleString() || 0}</span>
            </div>
        </div>
        {change !== undefined && (
            <span style={{
                ...styles.comparisonChange,
                color: change >= 0 ? '#43b581' : '#f04747'
            }}>
                {change >= 0 ? '📈' : '📉'} {change >= 0 ? '+' : ''}{change}%
            </span>
        )}
    </div>
);

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
    },
    modal: {
        width: '95%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        backgroundColor: '#2f3136',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid #202225',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    title: {
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600',
        margin: 0,
    },
    periodSelect: {
        padding: '8px 12px',
        backgroundColor: '#36393f',
        border: '1px solid #40444b',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer',
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#72767d',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '4px',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
    },
    loadingState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        color: '#72767d',
        gap: '16px',
    },
    spinner: {
        width: '40px',
        height: '40px',
        border: '3px solid #36393f',
        borderTopColor: '#5865f2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
    },
    errorState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        color: '#dcddde',
        textAlign: 'center',
    },
    statsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '20px',
        backgroundColor: '#36393f',
        borderRadius: '8px',
    },
    statIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '20px',
    },
    statInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    statLabel: {
        color: '#72767d',
        fontSize: '12px',
        marginBottom: '4px',
    },
    statValue: {
        color: '#fff',
        fontSize: '24px',
        fontWeight: '700',
    },
    statSubtext: {
        color: '#72767d',
        fontSize: '11px',
    },
    statChange: {
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginTop: '4px',
    },
    chartsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
    },
    chartCard: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '20px',
    },
    chartTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '16px',
    },
    barChart: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '4px',
        height: '120px',
    },
    barContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
    },
    bar: {
        width: '100%',
        backgroundColor: '#5865f2',
        borderRadius: '4px 4px 0 0',
        transition: 'height 0.3s',
        minHeight: '4px',
    },
    barLabel: {
        color: '#72767d',
        fontSize: '10px',
        marginTop: '4px',
    },
    hourlyChart: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '4px',
    },
    hourBlock: {
        aspectRatio: '1',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '10px',
        cursor: 'default',
    },
    listsRow: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
    },
    listCard: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '20px',
    },
    listTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        backgroundColor: '#2f3136',
        borderRadius: '4px',
    },
    listRank: {
        color: '#5865f2',
        fontWeight: '600',
        width: '24px',
    },
    listName: {
        color: '#dcddde',
        flex: 1,
    },
    listValue: {
        color: '#72767d',
        fontSize: '12px',
    },
    emptyList: {
        color: '#72767d',
        textAlign: 'center',
        padding: '20px',
    },
    pieChart: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    contentBarContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    contentBarLabel: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#dcddde',
        fontSize: '12px',
    },
    contentBarTrack: {
        height: '8px',
        backgroundColor: '#202225',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    contentBarFill: {
        height: '100%',
        borderRadius: '4px',
        transition: 'width 0.3s',
    },
    comparisonSection: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '20px',
    },
    sectionTitle: {
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '16px',
    },
    comparisonGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
    },
    comparisonCard: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    comparisonLabel: {
        color: '#fff',
        fontWeight: '600',
    },
    comparisonValues: {
        display: 'flex',
        gap: '24px',
    },
    comparisonValue: {
        display: 'flex',
        flexDirection: 'column',
    },
    comparisonPeriod: {
        color: '#72767d',
        fontSize: '11px',
    },
    comparisonNumber: {
        color: '#dcddde',
        fontSize: '18px',
        fontWeight: '600',
    },
    comparisonChange: {
        fontSize: '14px',
    },
};

export default ServerAnalyticsDashboard;

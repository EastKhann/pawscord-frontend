import React, { useState, useEffect } from 'react';
import { FaTimes, FaChartLine, FaUsers, FaArrowUp, FaCalendar } from 'react-icons/fa';
import { toast } from '../utils/toast';

const GrowthMetricsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeRange, setTimeRange] = useState('7d');

    const timeRanges = [
        { value: '24h', label: 'Last 24 Hours' },
        { value: '7d', label: 'Last 7 Days' },
        { value: '30d', label: 'Last 30 Days' },
        { value: '90d', label: 'Last 90 Days' },
        { value: 'all', label: 'All Time' },
    ];

    useEffect(() => {
        fetchMetrics();
    }, [timeRange]);

    const fetchMetrics = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverId}/growth-metrics/?range=${timeRange}`
            );
            const data = await response.json();
            setMetrics(data);
        } catch (error) {
            toast.error('Failed to load growth metrics');
        } finally {
            setLoading(false);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
        return num;
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Growth Metrics</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={styles.select}>
                        {timeRanges.map(range => (
                            <option key={range.value} value={range.value}>{range.label}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading metrics...</div>
                    ) : !metrics ? (
                        <div style={styles.empty}>No metrics available</div>
                    ) : (
                        <div>
                            <div style={styles.statsGrid}>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaUsers style={{ color: '#5865f2', fontSize: '24px' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statLabel}>Total Members</div>
                                        <div style={styles.statValue}>{formatNumber(metrics.total_members || 0)}</div>
                                        {metrics.member_growth !== undefined && (
                                            <div style={{ ...styles.statChange, color: metrics.member_growth >= 0 ? '#43b581' : '#f04747' }}>
                                                <FaArrowUp style={{ transform: metrics.member_growth < 0 ? 'rotate(180deg)' : 'none' }} />
                                                {Math.abs(metrics.member_growth)}% this period
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaChartLine style={{ color: '#43b581', fontSize: '24px' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statLabel}>Active Members</div>
                                        <div style={styles.statValue}>{formatNumber(metrics.active_members || 0)}</div>
                                        <div style={styles.statSubtext}>
                                            {metrics.total_members ? ((metrics.active_members / metrics.total_members) * 100).toFixed(1) : 0}% of total
                                        </div>
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <span style={{ fontSize: '24px' }}>💬</span>
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statLabel}>Messages Sent</div>
                                        <div style={styles.statValue}>{formatNumber(metrics.messages_sent || 0)}</div>
                                        {metrics.message_growth !== undefined && (
                                            <div style={{ ...styles.statChange, color: metrics.message_growth >= 0 ? '#43b581' : '#f04747' }}>
                                                <FaArrowUp style={{ transform: metrics.message_growth < 0 ? 'rotate(180deg)' : 'none' }} />
                                                {Math.abs(metrics.message_growth)}% this period
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaCalendar style={{ color: '#faa61a', fontSize: '24px' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statLabel}>New Joins</div>
                                        <div style={styles.statValue}>{formatNumber(metrics.new_joins || 0)}</div>
                                        <div style={styles.statSubtext}>
                                            {metrics.retention_rate ? `${metrics.retention_rate}% retention` : ''}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {metrics.daily_stats && (
                                <div style={styles.chartSection}>
                                    <h3 style={styles.sectionTitle}>Daily Activity</h3>
                                    <div style={styles.chart}>
                                        {metrics.daily_stats.map((day, idx) => (
                                            <div key={idx} style={styles.chartBar}>
                                                <div
                                                    style={{
                                                        ...styles.chartBarFill,
                                                        height: `${(day.count / Math.max(...metrics.daily_stats.map(d => d.count))) * 100}%`,
                                                    }}
                                                />
                                                <div style={styles.chartLabel}>{new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {metrics.top_contributors && (
                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Top Contributors</h3>
                                    <div style={styles.contributorsList}>
                                        {metrics.top_contributors.slice(0, 10).map((user, idx) => (
                                            <div key={idx} style={styles.contributorCard}>
                                                <div style={styles.contributorRank}>#{idx + 1}</div>
                                                <div style={styles.contributorInfo}>
                                                    <div style={styles.contributorName}>{user.username}</div>
                                                    <div style={styles.contributorStat}>{formatNumber(user.message_count)} messages</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

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
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '1100px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #2c2f33',
    },
    select: {
        padding: '10px',
        backgroundColor: '#2c2f33',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
        width: '200px',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
    },
    statCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        gap: '16px',
    },
    statIcon: {
        minWidth: '48px',
    },
    statInfo: {
        flex: 1,
    },
    statLabel: {
        fontSize: '13px',
        color: '#99aab5',
        marginBottom: '6px',
    },
    statValue: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '6px',
    },
    statChange: {
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    statSubtext: {
        fontSize: '12px',
        color: '#99aab5',
    },
    chartSection: {
        marginBottom: '32px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '16px',
    },
    chart: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '200px',
        padding: '20px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
    },
    chartBar: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
    },
    chartBarFill: {
        width: '80%',
        backgroundColor: '#5865f2',
        borderRadius: '4px 4px 0 0',
        minHeight: '4px',
    },
    chartLabel: {
        fontSize: '10px',
        color: '#99aab5',
        textAlign: 'center',
    },
    section: {
        marginBottom: '32px',
    },
    contributorsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    contributorCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '12px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    contributorRank: {
        fontSize: '16px',
        fontWeight: '700',
        color: '#5865f2',
        minWidth: '40px',
    },
    contributorInfo: {
        flex: 1,
    },
    contributorName: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    contributorStat: {
        fontSize: '12px',
        color: '#99aab5',
    },
};

export default GrowthMetricsPanel;

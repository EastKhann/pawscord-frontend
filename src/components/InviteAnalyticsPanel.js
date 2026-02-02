import React, { useState, useEffect } from 'react';
import { FaTimes, FaChartLine, FaUsers, FaLink } from 'react-icons/fa';
import { toast } from '../utils/toast';

const InviteAnalyticsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeRange, setTimeRange] = useState('7d');

    useEffect(() => {
        fetchAnalytics();
    }, [timeRange]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/api/servers/${serverId}/invite-analytics/?range=${timeRange}`
            );
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const timeRanges = [
        { value: '24h', label: '24 Hours' },
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '90 Days' },
        { value: 'all', label: 'All Time' },
    ];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Invite Analytics</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.timeRangeButtons}>
                        {timeRanges.map(range => (
                            <button
                                key={range.value}
                                onClick={() => setTimeRange(range.value)}
                                style={{
                                    ...styles.timeRangeButton,
                                    ...(timeRange === range.value && styles.timeRangeButtonActive)
                                }}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading analytics...</div>
                    ) : !analytics ? (
                        <div style={styles.empty}>No analytics data available</div>
                    ) : (
                        <>
                            <div style={styles.statsGrid}>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaLink style={{ color: '#5865f2' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>{analytics.total_invites || 0}</div>
                                        <div style={styles.statLabel}>Total Invites</div>
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaUsers style={{ color: '#43b581' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>{analytics.total_joins || 0}</div>
                                        <div style={styles.statLabel}>Total Joins</div>
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaChartLine style={{ color: '#faa61a' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {analytics.total_invites > 0
                                                ? ((analytics.total_joins / analytics.total_invites) * 100).toFixed(1)
                                                : 0}%
                                        </div>
                                        <div style={styles.statLabel}>Conversion Rate</div>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Top Invites</h3>
                                <div style={styles.invitesList}>
                                    {(analytics.top_invites || []).map((invite, idx) => (
                                        <div key={idx} style={styles.inviteCard}>
                                            <div style={styles.inviteRank}>#{idx + 1}</div>
                                            <div style={styles.inviteInfo}>
                                                <div style={styles.inviteCode}>{invite.code}</div>
                                                <div style={styles.inviteMeta}>
                                                    Created by {invite.creator_username}
                                                </div>
                                            </div>
                                            <div style={styles.inviteStats}>
                                                <div style={styles.inviteStat}>
                                                    <span style={styles.inviteStatValue}>{invite.uses}</span>
                                                    <span style={styles.inviteStatLabel}>uses</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Daily Joins</h3>
                                <div style={styles.chartContainer}>
                                    {(analytics.daily_joins || []).map((day, idx) => {
                                        const maxJoins = Math.max(...(analytics.daily_joins || []).map(d => d.joins), 1);
                                        const height = (day.joins / maxJoins) * 100;
                                        return (
                                            <div key={idx} style={styles.barContainer}>
                                                <div style={{ ...styles.bar, height: `${height}%` }}>
                                                    <div style={styles.barValue}>{day.joins}</div>
                                                </div>
                                                <div style={styles.barLabel}>
                                                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </>
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
        maxWidth: '900px',
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
    timeRangeButtons: {
        display: 'flex',
        gap: '8px',
    },
    timeRangeButton: {
        padding: '8px 16px',
        backgroundColor: '#2c2f33',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#dcddde',
        cursor: 'pointer',
        fontSize: '13px',
    },
    timeRangeButtonActive: {
        backgroundColor: '#5865f2',
        borderColor: '#5865f2',
        color: '#ffffff',
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '30px',
    },
    statCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    statIcon: {
        fontSize: '32px',
    },
    statInfo: {
        flex: 1,
    },
    statValue: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '4px',
    },
    statLabel: {
        fontSize: '13px',
        color: '#99aab5',
    },
    section: {
        marginBottom: '30px',
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '16px',
    },
    invitesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    inviteCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    inviteRank: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#5865f2',
        minWidth: '40px',
    },
    inviteInfo: {
        flex: 1,
    },
    inviteCode: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        fontFamily: 'monospace',
        marginBottom: '4px',
    },
    inviteMeta: {
        fontSize: '12px',
        color: '#99aab5',
    },
    inviteStats: {
        display: 'flex',
        gap: '20px',
    },
    inviteStat: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    inviteStatValue: {
        fontSize: '18px',
        fontWeight: '700',
        color: '#43b581',
    },
    inviteStatLabel: {
        fontSize: '11px',
        color: '#99aab5',
    },
    chartContainer: {
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end',
        height: '200px',
        padding: '10px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
    },
    barContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'flex-end',
    },
    bar: {
        width: '100%',
        backgroundColor: '#5865f2',
        borderRadius: '4px 4px 0 0',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '4px 0',
        minHeight: '20px',
    },
    barValue: {
        fontSize: '11px',
        color: '#ffffff',
        fontWeight: '600',
    },
    barLabel: {
        fontSize: '10px',
        color: '#99aab5',
        marginTop: '4px',
        transform: 'rotate(-45deg)',
        transformOrigin: 'center',
    },
};

export default InviteAnalyticsPanel;

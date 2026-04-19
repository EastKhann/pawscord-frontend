import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaChartLine, FaUsers, FaLink } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

const InviteAnalyticsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timeRange, setTimeRange] = useState('7d');
    const getTimeRangeButtonStyle = (value) => ({
        ...styles.timeRangeButton,
        ...(timeRange === value ? styles.timeRangeButtonActive : {}),
    });

    useEffect(() => {
        fetchAnalytics();
    }, [timeRange]);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/servers/${serverId}/invite-analytics/?range=${timeRange}`
            );
            const data = await response.json();
            setAnalytics(data);
        } catch (error) {
            toast.error(t('invite.loadFailed'));
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
                        <FaChartLine className="icon-primary-mr10" />
                        <h2 style={styles.title}>Davet Analitiği</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.timeRangeButtons}>
                        {timeRanges.map((range) => (
                            <button
                                aria-label="Action button"
                                key={range.value}
                                onClick={() => setTimeRange(range.value)}
                                style={getTimeRangeButtonStyle(range.value)}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Analitik yükleniyor...</div>
                    ) : !analytics ? (
                        <div style={styles.empty}>Analitik verisi yok</div>
                    ) : (
                        <>
                            <div style={styles.statsGrid}>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaLink className="icon-primary" />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {analytics.total_invites || 0}
                                        </div>
                                        <div style={styles.statLabel}>Toplam Davetler</div>
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaUsers className="icon-success" />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {analytics.total_joins || 0}
                                        </div>
                                        <div style={styles.statLabel}>Toplam Katılımlar</div>
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaChartLine className="icon-warning" />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {analytics.total_invites > 0
                                                ? (
                                                      (analytics.total_joins /
                                                          analytics.total_invites) *
                                                      100
                                                  ).toFixed(1)
                                                : 0}
                                            %
                                        </div>
                                        <div style={styles.statLabel}>Dönüşüm Oranı</div>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>En İyi Davetler</h3>
                                <div style={styles.invitesList}>
                                    {(analytics.top_invites || []).map((invite, idx) => (
                                        <div key={`item-${idx}`} style={styles.inviteCard}>
                                            <div style={styles.inviteRank}>{idx + 1}</div>
                                            <div style={styles.inviteInfo}>
                                                <div style={styles.inviteCode}>{invite.code}</div>
                                                <div style={styles.inviteMeta}>
                                                    Created by {invite.creator_username}
                                                </div>
                                            </div>
                                            <div style={styles.inviteStats}>
                                                <div style={styles.inviteStat}>
                                                    <span style={styles.inviteStatValue}>
                                                        {invite.uses}
                                                    </span>
                                                    <span style={styles.inviteStatLabel}>uses</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Günlük Katılımlar</h3>
                                <div style={styles.chartContainer}>
                                    {(analytics.daily_joins || []).map((day, idx) => {
                                        const maxJoins = Math.max(
                                            ...(analytics.daily_joins || []).map((d) => d.joins),
                                            1
                                        );
                                        const height = (day.joins / maxJoins) * 100;
                                        return (
                                            <div key={`item-${idx}`} style={styles.barContainer}>
                                                <div
                                                    style={{ ...styles.bar, height: `${height}%` }}
                                                >
                                                    <div style={styles.barValue}>{day.joins}</div>
                                                </div>
                                                <div style={styles.barLabel}>
                                                    {new Date(day.date).toLocaleDateString(
                                                        'en-US',
                                                        { month: 'short', day: 'numeric' }
                                                    )}
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
        borderBottom: '1px solid #0e1222',
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
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        padding: '15px 20px',
        borderBottom: '1px solid #0e1222',
    },
    timeRangeButtons: {
        display: 'flex',
        gap: '8px',
    },
    timeRangeButton: {
        padding: '8px 16px',
        backgroundColor: '#111214',
        border: '1px solid #0e1222',
        borderRadius: '4px',
        color: '#dbdee1',
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
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '30px',
    },
    statCard: {
        backgroundColor: '#111214',
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
        color: '#949ba4',
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
        backgroundColor: '#111214',
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
        color: '#949ba4',
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
        color: '#23a559',
    },
    inviteStatLabel: {
        fontSize: '11px',
        color: '#949ba4',
    },
    chartContainer: {
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-end',
        height: '200px',
        padding: '10px',
        backgroundColor: '#111214',
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
        color: '#949ba4',
        marginTop: '4px',
        transform: 'rotate(-45deg)',
        transformOrigin: 'center',
    },
};

InviteAnalyticsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default InviteAnalyticsPanel;

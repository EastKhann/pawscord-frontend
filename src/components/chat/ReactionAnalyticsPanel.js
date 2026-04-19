import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FaTimes, FaChartLine, FaHeart, FaFire, FaTrophy, FaCalendar } from 'react-icons/fa';
import { toast } from '../../utils/toast';

const ReactionAnalyticsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const { t } = useTranslation();
    const [heatmap, setHeatmap] = useState(null);
    const [dailyStats, setDailyStats] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('heatmap'); // heatmap, daily, leaderboard
    const heartIconStyle = { color: '#f23f42', marginRight: '5px' };
    const tabStyles = {
        heatmap: { ...styles.tab, ...(activeTab === 'heatmap' ? styles.tabActive : {}) },
        daily: { ...styles.tab, ...(activeTab === 'daily' ? styles.tabActive : {}) },
        leaderboard: { ...styles.tab, ...(activeTab === 'leaderboard' ? styles.tabActive : {}) },
    };

    useEffect(() => {
        fetchHeatmap();
        fetchDailyStats();
        fetchLeaderboard();
    }, [roomSlug]);

    const fetchHeatmap = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/rooms/${roomSlug}/reaction_heatmap/`
            );
            const data = await response.json();
            setHeatmap(data);
        } catch (error) {
            toast.error(t('reactions.heatmapFailed'));
        } finally {
            setLoading(false);
        }
    };

    const fetchDailyStats = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/rooms/${roomSlug}/reactions/daily/`
            );
            const data = await response.json();
            setDailyStats(data.stats || []);
        } catch (error) {
            toast.error(t('reactions.statsFailed'));
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/leaderboards/reactions/`);
            const data = await response.json();
            setLeaderboard(data.leaderboard || []);
        } catch (error) {
            toast.error(t('reactions.leaderboardFailed'));
        }
    };

    const getHeatLevel = (value, max) => {
        const percentage = (value / max) * 100;
        if (percentage > 75) return '#f23f42';
        if (percentage > 50) return '#f0b232';
        if (percentage > 25) return '#5865f2';
        return '#111214';
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine className="icon-primary-mr10" />
                        <h2 style={styles.title}>Tepki Analitiği</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button
                        aria-label="Switch tab"
                        onClick={() => setActiveTab('heatmap')}
                        style={tabStyles.heatmap}
                    >
                        <FaFire className="mr-5" />
                        Heatmap
                    </button>
                    <button
                        aria-label="Switch tab"
                        onClick={() => setActiveTab('daily')}
                        style={tabStyles.daily}
                    >
                        <FaCalendar className="mr-5" />
                        Daily Stats
                    </button>
                    <button
                        aria-label="Switch tab"
                        onClick={() => setActiveTab('leaderboard')}
                        style={tabStyles.leaderboard}
                    >
                        <FaTrophy className="mr-5" />
                        Leaderboard
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Analitik yükleniyor...</div>
                    ) : activeTab === 'heatmap' ? (
                        <div style={styles.heatmapContainer}>
                            <div style={styles.heatmapGrid}>
                                <div style={styles.heatmapYAxis}>
                                    {days.map((day) => (
                                        <div key={day} style={styles.dayLabel}>
                                            {day}
                                        </div>
                                    ))}
                                </div>
                                <div style={styles.heatmapCells}>
                                    {heatmap &&
                                        heatmap.data &&
                                        days.map((day, dayIdx) => (
                                            <div key={day} style={styles.heatmapRow}>
                                                {hours.map((hour) => {
                                                    const value = heatmap.data[dayIdx]?.[hour] || 0;
                                                    const maxValue = Math.max(
                                                        ...(heatmap.data
                                                            .flat()
                                                            .filter((v) => v) || [1])
                                                    );
                                                    return (
                                                        <div
                                                            key={hour}
                                                            title={`${day} ${hour}:00 - ${value} reactions`}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        ))}
                                    <div style={styles.heatmapXAxis}>
                                        {hours
                                            .filter((h) => h % 3 === 0)
                                            .map((hour) => (
                                                <div key={hour} style={styles.hourLabel}>
                                                    {hour}h
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            <div style={styles.legend}>
                                <span style={styles.legendLabel}>Az</span>
                                {[0, 25, 50, 75, 100].map((level) => (
                                    <div key={level} />
                                ))}
                                <span style={styles.legendLabel}>Çok</span>
                            </div>
                        </div>
                    ) : activeTab === 'daily' ? (
                        <div style={styles.dailyStats}>
                            {dailyStats.length === 0 ? (
                                <div style={styles.empty}>Günlük istatistik yok</div>
                            ) : (
                                <div style={styles.chartContainer}>
                                    {dailyStats.map((stat, idx) => (
                                        <div key={`item-${idx}`} style={styles.statBar}>
                                            <div style={styles.statDate}>
                                                {new Date(stat.date).toLocaleDateString()}
                                            </div>
                                            <div style={styles.barContainer}>
                                                <div
                                                    style={{
                                                        ...styles.bar,
                                                        width: `${(stat.count / Math.max(...dailyStats.map((s) => s.count))) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                            <div style={styles.statCount}>{stat.count}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={styles.leaderboard}>
                            {leaderboard.length === 0 ? (
                                <div style={styles.empty}>Sıralama verisi yok</div>
                            ) : (
                                leaderboard.map((user, idx) => (
                                    <div key={`item-${idx}`} style={styles.leaderboardItem}>
                                        <div style={styles.rank}>
                                            {idx === 0
                                                ? '🥇'
                                                : idx === 1
                                                  ? '🥈'
                                                  : idx === 2
                                                    ? '🥉'
                                                    : `${idx + 1}`}
                                        </div>
                                        <div style={styles.userInfo}>
                                            <div style={styles.username}>{user.username}</div>
                                            <div style={styles.userReactions}>
                                                <FaHeart style={heartIconStyle} />
                                                {user.reaction_count} reactions
                                            </div>
                                        </div>
                                    </div>
                                ))
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
        maxWidth: '1000px',
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
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #0e1222',
        padding: '0 20px',
    },
    tab: {
        padding: '12px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid transparent',
    },
    tabActive: {
        color: '#5865f2',
        borderBottom: '2px solid #5865f2',
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
    heatmapContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    heatmapGrid: {
        display: 'flex',
        gap: '10px',
    },
    heatmapYAxis: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    dayLabel: {
        fontSize: '12px',
        color: '#949ba4',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    heatmapCells: {
        flex: 1,
    },
    heatmapRow: {
        display: 'flex',
        gap: '2px',
        marginBottom: '2px',
    },
    heatmapCell: {
        width: '20px',
        height: '20px',
        borderRadius: '2px',
        cursor: 'pointer',
    },
    heatmapXAxis: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '5px',
    },
    hourLabel: {
        fontSize: '11px',
        color: '#949ba4',
    },
    legend: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        justifyContent: 'center',
    },
    legendLabel: {
        fontSize: '12px',
        color: '#949ba4',
    },
    legendBox: {
        width: '15px',
        height: '15px',
        borderRadius: '2px',
    },
    dailyStats: {
        display: 'flex',
        flexDirection: 'column',
    },
    chartContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    statBar: {
        display: 'grid',
        gridTemplateColumns: '100px 1fr 60px',
        alignItems: 'center',
        gap: '12px',
    },
    statDate: {
        fontSize: '13px',
        color: '#dbdee1',
    },
    barContainer: {
        height: '24px',
        backgroundColor: '#111214',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    bar: {
        height: '100%',
        backgroundColor: '#5865f2',
        transition: 'width 0.3s',
    },
    statCount: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        textAlign: 'right',
    },
    leaderboard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    leaderboardItem: {
        backgroundColor: '#111214',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    rank: {
        fontSize: '24px',
        fontWeight: '600',
        minWidth: '60px',
        textAlign: 'center',
    },
    userInfo: {
        flex: 1,
    },
    username: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    userReactions: {
        fontSize: '14px',
        color: '#949ba4',
        display: 'flex',
        alignItems: 'center',
    },
};

ReactionAnalyticsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    roomSlug: PropTypes.string,
};
export default ReactionAnalyticsPanel;

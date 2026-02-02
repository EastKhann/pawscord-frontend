import React, { useState, useEffect } from 'react';
import { FaTimes, FaChartLine, FaHeart, FaFire, FaTrophy, FaCalendar } from 'react-icons/fa';
import { toast } from '../utils/toast';

const ReactionAnalyticsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const [heatmap, setHeatmap] = useState(null);
    const [dailyStats, setDailyStats] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('heatmap'); // heatmap, daily, leaderboard

    useEffect(() => {
        fetchHeatmap();
        fetchDailyStats();
        fetchLeaderboard();
    }, [roomSlug]);

    const fetchHeatmap = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/rooms/${roomSlug}/reaction_heatmap/`);
            const data = await response.json();
            setHeatmap(data);
        } catch (error) {
            toast.error('Failed to load reaction heatmap');
        } finally {
            setLoading(false);
        }
    };

    const fetchDailyStats = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/rooms/${roomSlug}/reactions/daily/`);
            const data = await response.json();
            setDailyStats(data.stats || []);
        } catch (error) {
            toast.error('Failed to load daily stats');
        }
    };

    const fetchLeaderboard = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/leaderboards/reactions/`);
            const data = await response.json();
            setLeaderboard(data.leaderboard || []);
        } catch (error) {
            toast.error('Failed to load leaderboard');
        }
    };

    const getHeatLevel = (value, max) => {
        const percentage = (value / max) * 100;
        if (percentage > 75) return '#f04747';
        if (percentage > 50) return '#faa61a';
        if (percentage > 25) return '#5865f2';
        return '#2c2f33';
    };

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Reaction Analytics</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button onClick={() => setActiveTab('heatmap')} style={{ ...styles.tab, ...(activeTab === 'heatmap' && styles.tabActive) }}>
                        <FaFire style={{ marginRight: '5px' }} />
                        Heatmap
                    </button>
                    <button onClick={() => setActiveTab('daily')} style={{ ...styles.tab, ...(activeTab === 'daily' && styles.tabActive) }}>
                        <FaCalendar style={{ marginRight: '5px' }} />
                        Daily Stats
                    </button>
                    <button onClick={() => setActiveTab('leaderboard')} style={{ ...styles.tab, ...(activeTab === 'leaderboard' && styles.tabActive) }}>
                        <FaTrophy style={{ marginRight: '5px' }} />
                        Leaderboard
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading analytics...</div>
                    ) : activeTab === 'heatmap' ? (
                        <div style={styles.heatmapContainer}>
                            <div style={styles.heatmapGrid}>
                                <div style={styles.heatmapYAxis}>
                                    {days.map(day => (
                                        <div key={day} style={styles.dayLabel}>{day}</div>
                                    ))}
                                </div>
                                <div style={styles.heatmapCells}>
                                    {heatmap && heatmap.data && days.map((day, dayIdx) => (
                                        <div key={day} style={styles.heatmapRow}>
                                            {hours.map(hour => {
                                                const value = heatmap.data[dayIdx]?.[hour] || 0;
                                                const maxValue = Math.max(...(heatmap.data.flat().filter(v => v) || [1]));
                                                return (
                                                    <div
                                                        key={hour}
                                                        style={{
                                                            ...styles.heatmapCell,
                                                            backgroundColor: getHeatLevel(value, maxValue)
                                                        }}
                                                        title={`${day} ${hour}:00 - ${value} reactions`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    ))}
                                    <div style={styles.heatmapXAxis}>
                                        {hours.filter(h => h % 3 === 0).map(hour => (
                                            <div key={hour} style={styles.hourLabel}>{hour}h</div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div style={styles.legend}>
                                <span style={styles.legendLabel}>Less</span>
                                {[0, 25, 50, 75, 100].map(level => (
                                    <div key={level} style={{ ...styles.legendBox, backgroundColor: getHeatLevel(level, 100) }} />
                                ))}
                                <span style={styles.legendLabel}>More</span>
                            </div>
                        </div>
                    ) : activeTab === 'daily' ? (
                        <div style={styles.dailyStats}>
                            {dailyStats.length === 0 ? (
                                <div style={styles.empty}>No daily stats available</div>
                            ) : (
                                <div style={styles.chartContainer}>
                                    {dailyStats.map((stat, idx) => (
                                        <div key={idx} style={styles.statBar}>
                                            <div style={styles.statDate}>{new Date(stat.date).toLocaleDateString()}</div>
                                            <div style={styles.barContainer}>
                                                <div
                                                    style={{
                                                        ...styles.bar,
                                                        width: `${(stat.count / Math.max(...dailyStats.map(s => s.count))) * 100}%`
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
                                <div style={styles.empty}>No leaderboard data available</div>
                            ) : (
                                leaderboard.map((user, idx) => (
                                    <div key={idx} style={styles.leaderboardItem}>
                                        <div style={styles.rank}>
                                            {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                                        </div>
                                        <div style={styles.userInfo}>
                                            <div style={styles.username}>{user.username}</div>
                                            <div style={styles.userReactions}>
                                                <FaHeart style={{ color: '#f04747', marginRight: '5px' }} />
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
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #2c2f33',
        padding: '0 20px',
    },
    tab: {
        padding: '12px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#99aab5',
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
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
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
        color: '#99aab5',
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
        color: '#99aab5',
    },
    legend: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        justifyContent: 'center',
    },
    legendLabel: {
        fontSize: '12px',
        color: '#99aab5',
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
        color: '#dcddde',
    },
    barContainer: {
        height: '24px',
        backgroundColor: '#2c2f33',
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
        backgroundColor: '#2c2f33',
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
        color: '#99aab5',
        display: 'flex',
        alignItems: 'center',
    },
};

export default ReactionAnalyticsPanel;

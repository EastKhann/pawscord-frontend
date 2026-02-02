// frontend/src/components/APIUsagePanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaCode, FaChartLine, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 📊 API Usage Analytics Panel
 * Developer analytics and API monitoring
 * 
 * Features:
 * - View API usage statistics
 * - Endpoint breakdown
 * - Rate limit monitoring
 * - Error tracking
 * - Request timeline
 */
const APIUsagePanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [stats, setStats] = useState(null);
    const [endpoints, setEndpoints] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeRange, setTimeRange] = useState('24h'); // 24h, 7d, 30d
    const [selectedEndpoint, setSelectedEndpoint] = useState(null);

    useEffect(() => {
        loadAPIUsage();
    }, [timeRange]);

    const loadAPIUsage = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/analytics/usage/?range=${timeRange}`);
            const data = await response.json();

            setStats(data.stats || {});
            setEndpoints(data.endpoints || []);
            setTimeline(data.timeline || []);
        } catch (error) {
            console.error('Failed to load API usage:', error);
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const getRateLimitStatus = () => {
        if (!stats || !stats.rate_limit) return { color: '#43b581', text: 'Normal' };

        const requestsMade = stats.requests_made || 0;
        const usage = (requestsMade / stats.rate_limit) * 100;

        if (usage >= 90) return { color: '#f04747', text: 'Critical' };
        if (usage >= 70) return { color: '#faa61a', text: 'Warning' };
        return { color: '#43b581', text: 'Normal' };
    };

    // Guard against null stats - initialize with defaults if null
    const safeStats = stats || { requests_made: 0, rate_limit: 10000, success_rate: 0, avg_response_time: 0, errors: 0 };
    const rateLimitStatus = getRateLimitStatus();

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine style={{ fontSize: '24px', color: '#5865f2' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>API Usage Analytics</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            style={styles.timeRangeSelect}
                        >
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                        </select>
                        <button onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading analytics...</div>
                    ) : (
                        <>
                            {/* Overview Cards */}
                            <div style={styles.statsGrid}>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaCode style={{ color: '#5865f2' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {(safeStats.requests_made || 0).toLocaleString()}
                                        </div>
                                        <div style={styles.statLabel}>Total Requests</div>
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaCheckCircle style={{ color: '#43b581' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {safeStats.success_rate ? `${safeStats.success_rate.toFixed(1)}%` : '0%'}
                                        </div>
                                        <div style={styles.statLabel}>Success Rate</div>
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaClock style={{ color: '#faa61a' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {safeStats.avg_response_time ? `${safeStats.avg_response_time}ms` : '0ms'}
                                        </div>
                                        <div style={styles.statLabel}>Avg Response Time</div>
                                    </div>
                                </div>

                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}>
                                        <FaExclamationTriangle style={{ color: '#f04747' }} />
                                    </div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>
                                            {safeStats.errors || 0}
                                        </div>
                                        <div style={styles.statLabel}>Errors</div>
                                    </div>
                                </div>
                            </div>

                            {/* Rate Limit */}
                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Rate Limit Status</h3>
                                <div style={{
                                    ...styles.rateLimitCard,
                                    borderLeftColor: rateLimitStatus.color
                                }}>
                                    <div style={styles.rateLimitInfo}>
                                        <div style={styles.rateLimitText}>
                                            {safeStats.requests_made || 0} / {safeStats.rate_limit || 10000} requests used
                                        </div>
                                        <div style={{
                                            ...styles.rateLimitStatus,
                                            color: rateLimitStatus.color
                                        }}>
                                            {rateLimitStatus.text}
                                        </div>
                                    </div>
                                    <div style={styles.rateLimitBar}>
                                        <div style={{
                                            ...styles.rateLimitProgress,
                                            width: `${Math.min(((safeStats.requests_made || 0) / (safeStats.rate_limit || 10000)) * 100, 100)}%`,
                                            backgroundColor: rateLimitStatus.color
                                        }} />
                                    </div>
                                    {safeStats.reset_at && (
                                        <div style={styles.rateLimitReset}>
                                            Resets in: {calculateTimeUntilReset(safeStats.reset_at)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Top Endpoints */}
                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Top Endpoints</h3>
                                <div style={styles.endpointsList}>
                                    {endpoints.length === 0 ? (
                                        <div style={styles.empty}>No endpoint data</div>
                                    ) : (
                                        endpoints.slice(0, 10).map((endpoint, idx) => (
                                            <div
                                                key={idx}
                                                style={styles.endpointItem}
                                                onClick={() => setSelectedEndpoint(endpoint)}
                                            >
                                                <div style={styles.endpointRank}>#{idx + 1}</div>
                                                <div style={styles.endpointDetails}>
                                                    <div style={styles.endpointPath}>
                                                        <span style={styles.endpointMethod}>
                                                            {endpoint.method}
                                                        </span>
                                                        {endpoint.path}
                                                    </div>
                                                    <div style={styles.endpointStats}>
                                                        <span>{endpoint.count} requests</span>
                                                        <span style={{ margin: '0 8px', color: '#444' }}>•</span>
                                                        <span>{endpoint.avg_time}ms avg</span>
                                                        {endpoint.error_rate > 0 && (
                                                            <>
                                                                <span style={{ margin: '0 8px', color: '#444' }}>•</span>
                                                                <span style={{ color: '#f04747' }}>
                                                                    {endpoint.error_rate}% errors
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div style={styles.endpointBar}>
                                                    <div style={{
                                                        ...styles.endpointBarFill,
                                                        width: `${(endpoint.count / endpoints[0].count) * 100}%`,
                                                        backgroundColor: endpoint.error_rate > 5 ? '#f04747' : '#5865f2'
                                                    }} />
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Recent Activity</h3>
                                <div style={styles.timeline}>
                                    {timeline.length === 0 ? (
                                        <div style={styles.empty}>No recent activity</div>
                                    ) : (
                                        timeline.slice(0, 20).map((event, idx) => (
                                            <div key={idx} style={styles.timelineItem}>
                                                <div style={{
                                                    ...styles.timelineIcon,
                                                    backgroundColor: event.status >= 400 ? '#f04747' : '#43b581'
                                                }}>
                                                    {event.status >= 400 ? (
                                                        <FaExclamationTriangle />
                                                    ) : (
                                                        <FaCheckCircle />
                                                    )}
                                                </div>
                                                <div style={styles.timelineContent}>
                                                    <div style={styles.timelinePath}>
                                                        <span style={styles.timelineMethod}>
                                                            {event.method}
                                                        </span>
                                                        {event.path}
                                                    </div>
                                                    <div style={styles.timelineMeta}>
                                                        <span style={{
                                                            color: event.status >= 400 ? '#f04747' : '#43b581'
                                                        }}>
                                                            {event.status}
                                                        </span>
                                                        <span style={{ margin: '0 8px', color: '#444' }}>•</span>
                                                        <span>{event.response_time}ms</span>
                                                        <span style={{ margin: '0 8px', color: '#444' }}>•</span>
                                                        <span>{new Date(event.timestamp).toLocaleTimeString()}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const calculateTimeUntilReset = (resetAt) => {
    const now = new Date();
    const reset = new Date(resetAt);
    const diff = reset - now;

    if (diff <= 0) return 'Soon';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '95%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    timeRangeSelect: {
        padding: '8px 12px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
    },
    statCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    statIcon: {
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statInfo: {
        flex: 1
    },
    statValue: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    statLabel: {
        fontSize: '12px',
        color: '#99aab5',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    section: {
        marginBottom: '32px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '16px'
    },
    rateLimitCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        borderLeft: '4px solid'
    },
    rateLimitInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    rateLimitText: {
        fontSize: '14px',
        fontWeight: '600'
    },
    rateLimitStatus: {
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    rateLimitBar: {
        height: '8px',
        backgroundColor: '#202225',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '8px'
    },
    rateLimitProgress: {
        height: '100%',
        transition: 'width 0.3s ease'
    },
    rateLimitReset: {
        fontSize: '12px',
        color: '#99aab5'
    },
    endpointsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    endpointItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    endpointRank: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#5865f2',
        minWidth: '40px'
    },
    endpointDetails: {
        flex: 1
    },
    endpointPath: {
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '4px',
        fontFamily: 'monospace'
    },
    endpointMethod: {
        display: 'inline-block',
        padding: '2px 8px',
        backgroundColor: '#5865f2',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 'bold',
        marginRight: '8px'
    },
    endpointStats: {
        fontSize: '12px',
        color: '#99aab5'
    },
    endpointBar: {
        width: '100px',
        height: '6px',
        backgroundColor: '#202225',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    endpointBarFill: {
        height: '100%',
        transition: 'width 0.3s ease'
    },
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    timelineItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    timelineIcon: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
    },
    timelineContent: {
        flex: 1
    },
    timelinePath: {
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'monospace',
        marginBottom: '4px'
    },
    timelineMethod: {
        display: 'inline-block',
        padding: '2px 6px',
        backgroundColor: '#5865f2',
        borderRadius: '3px',
        fontSize: '10px',
        fontWeight: 'bold',
        marginRight: '8px'
    },
    timelineMeta: {
        fontSize: '12px',
        color: '#99aab5'
    },
    empty: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    }
};

export default APIUsagePanel;

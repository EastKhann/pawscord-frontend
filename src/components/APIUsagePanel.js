// frontend/src/components/APIUsagePanel.js
import React from 'react';
import { FaTimes, FaCode, FaChartLine, FaClock, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { styles, calculateTimeUntilReset } from './APIUsagePanel/apiUsageStyles';
import useAPIUsage from './APIUsagePanel/useAPIUsage';

const APIUsagePanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const {
        safeStats, endpoints, timeline, loading,
        timeRange, setTimeRange,
        selectedEndpoint, setSelectedEndpoint,
        rateLimitStatus
    } = useAPIUsage(fetchWithAuth, apiBaseUrl);

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartLine style={{ fontSize: '24px', color: '#5865f2' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>API Usage Analytics</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} style={styles.timeRangeSelect}>
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                        </select>
                        <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                    </div>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading analytics...</div>
                    ) : (
                        <>
                            <div style={styles.statsGrid}>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}><FaCode style={{ color: '#5865f2' }} /></div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>{(safeStats.requests_made || 0).toLocaleString()}</div>
                                        <div style={styles.statLabel}>Total Requests</div>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}><FaCheckCircle style={{ color: '#43b581' }} /></div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>{safeStats.success_rate ? `${safeStats.success_rate.toFixed(1)}%` : '0%'}</div>
                                        <div style={styles.statLabel}>Success Rate</div>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}><FaClock style={{ color: '#faa61a' }} /></div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>{safeStats.avg_response_time ? `${safeStats.avg_response_time}ms` : '0ms'}</div>
                                        <div style={styles.statLabel}>Avg Response Time</div>
                                    </div>
                                </div>
                                <div style={styles.statCard}>
                                    <div style={styles.statIcon}><FaExclamationTriangle style={{ color: '#f04747' }} /></div>
                                    <div style={styles.statInfo}>
                                        <div style={styles.statValue}>{safeStats.errors || 0}</div>
                                        <div style={styles.statLabel}>Errors</div>
                                    </div>
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Rate Limit Status</h3>
                                <div style={{ ...styles.rateLimitCard, borderLeftColor: rateLimitStatus.color }}>
                                    <div style={styles.rateLimitInfo}>
                                        <div style={styles.rateLimitText}>{safeStats.requests_made || 0} / {safeStats.rate_limit || 10000} requests used</div>
                                        <div style={{ ...styles.rateLimitStatus, color: rateLimitStatus.color }}>{rateLimitStatus.text}</div>
                                    </div>
                                    <div style={styles.rateLimitBar}>
                                        <div style={{
                                            ...styles.rateLimitProgress,
                                            width: `${Math.min(((safeStats.requests_made || 0) / (safeStats.rate_limit || 10000)) * 100, 100)}%`,
                                            backgroundColor: rateLimitStatus.color
                                        }} />
                                    </div>
                                    {safeStats.reset_at && (
                                        <div style={styles.rateLimitReset}>Resets in: {calculateTimeUntilReset(safeStats.reset_at)}</div>
                                    )}
                                </div>
                            </div>

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Top Endpoints</h3>
                                <div style={styles.endpointsList}>
                                    {endpoints.length === 0 ? (
                                        <div style={styles.empty}>No endpoint data</div>
                                    ) : (
                                        endpoints.slice(0, 10).map((endpoint, idx) => (
                                            <div key={idx} style={styles.endpointItem} onClick={() => setSelectedEndpoint(endpoint)}>
                                                <div style={styles.endpointRank}>#{idx + 1}</div>
                                                <div style={styles.endpointDetails}>
                                                    <div style={styles.endpointPath}>
                                                        <span style={styles.endpointMethod}>{endpoint.method}</span>
                                                        {endpoint.path}
                                                    </div>
                                                    <div style={styles.endpointStats}>
                                                        <span>{endpoint.count} requests</span>
                                                        <span style={{ margin: '0 8px', color: '#444' }}>•</span>
                                                        <span>{endpoint.avg_time}ms avg</span>
                                                        {endpoint.error_rate > 0 && (
                                                            <>
                                                                <span style={{ margin: '0 8px', color: '#444' }}>•</span>
                                                                <span style={{ color: '#f04747' }}>{endpoint.error_rate}% errors</span>
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

                            <div style={styles.section}>
                                <h3 style={styles.sectionTitle}>Recent Activity</h3>
                                <div style={styles.timeline}>
                                    {timeline.length === 0 ? (
                                        <div style={styles.empty}>No recent activity</div>
                                    ) : (
                                        timeline.slice(0, 20).map((event, idx) => (
                                            <div key={idx} style={styles.timelineItem}>
                                                <div style={{ ...styles.timelineIcon, backgroundColor: event.status >= 400 ? '#f04747' : '#43b581' }}>
                                                    {event.status >= 400 ? <FaExclamationTriangle /> : <FaCheckCircle />}
                                                </div>
                                                <div style={styles.timelineContent}>
                                                    <div style={styles.timelinePath}>
                                                        <span style={styles.timelineMethod}>{event.method}</span>
                                                        {event.path}
                                                    </div>
                                                    <div style={styles.timelineMeta}>
                                                        <span style={{ color: event.status >= 400 ? '#f04747' : '#43b581' }}>{event.status}</span>
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

export default APIUsagePanel;

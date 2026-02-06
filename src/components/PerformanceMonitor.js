// frontend/src/components/PerformanceMonitor.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTachometerAlt, FaDatabase, FaMemory, FaServer, FaSync, FaTrash, FaCheck } from 'react-icons/fa';
import './PerformanceMonitor.css';

/**
 * 📊 Performance Monitoring Dashboard
 * Cache stats, database health, system metrics
 */
const PerformanceMonitor = ({ apiBaseUrl, fetchWithAuth, onClose }) => {
    const [loading, setLoading] = useState(true);
    const [cacheStats, setCacheStats] = useState(null);
    const [cacheHealth, setCacheHealth] = useState(null);
    const [actionLoading, setActionLoading] = useState(null);
    const [lastRefresh, setLastRefresh] = useState(new Date());

    useEffect(() => {
        loadStats();
        const interval = setInterval(loadStats, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const loadStats = async () => {
        setLoading(true);
        try {
            const [statsRes, healthRes] = await Promise.all([
                fetchWithAuth(`${apiBaseUrl}/cache/stats/`),
                fetchWithAuth(`${apiBaseUrl}/cache/health/`)
            ]);

            if (statsRes.ok) {
                const data = await statsRes.json();
                setCacheStats(data);
            }

            if (healthRes.ok) {
                const data = await healthRes.json();
                setCacheHealth(data);
            }

            setLastRefresh(new Date());
        } catch (error) {
            console.error('Failed to load stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (action, confirmMessage) => {
        if (confirmMessage && !window.confirm(confirmMessage)) {
            return;
        }

        setActionLoading(action);
        try {
            let endpoint = '';
            let method = 'POST';

            switch (action) {
                case 'clear-user':
                    endpoint = '/api/cache/user/clear/';
                    break;
                case 'clear-all':
                    endpoint = '/api/cache/clear-all/';
                    break;
                case 'optimize-db':
                    endpoint = '/api/cache/database/optimize/';
                    break;
                default:
                    return;
            }

            const response = await fetchWithAuth(`${apiBaseUrl}${endpoint}`, { method });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message || '✅ Action completed successfully');
                loadStats(); // Reload stats
            } else {
                const error = await response.json();
                toast.error(error.error || '❌ Action failed');
            }
        } catch (error) {
            console.error('Action failed:', error);
            toast.error('❌ Action failed: ' + error.message);
        } finally {
            setActionLoading(null);
        }
    };

    const getHealthColor = (status) => {
        switch (status) {
            case 'healthy':
                return '#43b581';
            case 'degraded':
                return '#faa61a';
            default:
                return '#ed4245';
        }
    };

    const formatBytes = (bytes) => {
        if (!bytes) return 'Unknown';
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    };

    return (
        <div className="perf-monitor-overlay" onClick={onClose}>
            <div className="perf-monitor-modal" onClick={(e) => e.stopPropagation()}>
                <div className="perf-monitor-header">
                    <h2><FaTachometerAlt /> Performance Monitor</h2>
                    <div className="perf-monitor-header-actions">
                        <button
                            className="perf-monitor-refresh-btn"
                            onClick={loadStats}
                            disabled={loading}
                        >
                            <FaSync className={loading ? 'spinning' : ''} />
                        </button>
                        <button className="perf-monitor-close" onClick={onClose}>×</button>
                    </div>
                </div>

                <div className="perf-monitor-content">
                    {/* Health Status */}
                    {cacheHealth && (
                        <div className="perf-monitor-section">
                            <h3>System Health</h3>
                            <div className="perf-monitor-health-grid">
                                <div className="perf-monitor-health-card">
                                    <div
                                        className="perf-monitor-health-indicator"
                                        style={{ background: getHealthColor(cacheHealth.status) }}
                                    >
                                        <FaCheck />
                                    </div>
                                    <div className="perf-monitor-health-info">
                                        <div className="perf-monitor-health-label">Overall Status</div>
                                        <div className="perf-monitor-health-value">
                                            {cacheHealth.status.toUpperCase()}
                                        </div>
                                    </div>
                                </div>

                                <div className="perf-monitor-health-card">
                                    <div
                                        className="perf-monitor-health-indicator"
                                        style={{ background: cacheHealth.cache_available ? '#43b581' : '#ed4245' }}
                                    >
                                        <FaMemory />
                                    </div>
                                    <div className="perf-monitor-health-info">
                                        <div className="perf-monitor-health-label">Cache</div>
                                        <div className="perf-monitor-health-value">
                                            {cacheHealth.cache_available ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                </div>

                                <div className="perf-monitor-health-card">
                                    <div
                                        className="perf-monitor-health-indicator"
                                        style={{ background: cacheHealth.database_available ? '#43b581' : '#ed4245' }}
                                    >
                                        <FaDatabase />
                                    </div>
                                    <div className="perf-monitor-health-info">
                                        <div className="perf-monitor-health-label">Database</div>
                                        <div className="perf-monitor-health-value">
                                            {cacheHealth.database_available ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                </div>

                                <div className="perf-monitor-health-card">
                                    <div className="perf-monitor-health-indicator" style={{ background: '#5865f2' }}>
                                        <FaServer />
                                    </div>
                                    <div className="perf-monitor-health-info">
                                        <div className="perf-monitor-health-label">Response Time</div>
                                        <div className="perf-monitor-health-value">
                                            {cacheHealth.response_time_ms}ms
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Cache Statistics */}
                    {cacheStats && (
                        <>
                            <div className="perf-monitor-section">
                                <h3>Cache Statistics</h3>
                                <div className="perf-monitor-stats-grid">
                                    <div className="perf-monitor-stat-card">
                                        <div className="perf-monitor-stat-label">Cache Backend</div>
                                        <div className="perf-monitor-stat-value">{cacheStats.cache_backend}</div>
                                    </div>
                                    <div className="perf-monitor-stat-card">
                                        <div className="perf-monitor-stat-label">Cache Size</div>
                                        <div className="perf-monitor-stat-value">{cacheStats.cache_size}</div>
                                    </div>
                                    <div className="perf-monitor-stat-card">
                                        <div className="perf-monitor-stat-label">Keys Count</div>
                                        <div className="perf-monitor-stat-value">
                                            {cacheStats.keys_count.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Database Statistics */}
                            {cacheStats.database_stats && (
                                <div className="perf-monitor-section">
                                    <h3>Database Statistics</h3>
                                    <div className="perf-monitor-stats-grid">
                                        {cacheStats.database_stats.database_size && (
                                            <div className="perf-monitor-stat-card">
                                                <div className="perf-monitor-stat-label">Database Size</div>
                                                <div className="perf-monitor-stat-value">
                                                    {cacheStats.database_stats.database_size}
                                                </div>
                                            </div>
                                        )}
                                        {cacheStats.database_stats.row_counts && (
                                            <>
                                                <div className="perf-monitor-stat-card">
                                                    <div className="perf-monitor-stat-label">Servers</div>
                                                    <div className="perf-monitor-stat-value">
                                                        {cacheStats.database_stats.row_counts.servers.toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="perf-monitor-stat-card">
                                                    <div className="perf-monitor-stat-label">Messages</div>
                                                    <div className="perf-monitor-stat-value">
                                                        {cacheStats.database_stats.row_counts.messages.toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="perf-monitor-stat-card">
                                                    <div className="perf-monitor-stat-label">Users</div>
                                                    <div className="perf-monitor-stat-value">
                                                        {cacheStats.database_stats.row_counts.users.toLocaleString()}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Top Tables */}
                                    {cacheStats.database_stats.top_tables && (
                                        <div className="perf-monitor-table">
                                            <h4>Largest Tables</h4>
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Table</th>
                                                        <th>Size</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cacheStats.database_stats.top_tables.map((table, idx) => (
                                                        <tr key={idx}>
                                                            <td>{table.table}</td>
                                                            <td>{table.size}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* Actions */}
                    <div className="perf-monitor-section">
                        <h3>Cache Actions</h3>
                        <div className="perf-monitor-actions">
                            <button
                                className="perf-monitor-action-btn"
                                onClick={() => handleAction('clear-user', 'Clear your cache?')}
                                disabled={actionLoading === 'clear-user'}
                            >
                                <FaTrash /> Clear My Cache
                            </button>
                            <button
                                className="perf-monitor-action-btn danger"
                                onClick={() =>
                                    handleAction(
                                        'clear-all',
                                        'This will clear ALL cache! Continue?'
                                    )
                                }
                                disabled={actionLoading === 'clear-all'}
                            >
                                <FaTrash /> Clear All Cache
                            </button>
                            <button
                                className="perf-monitor-action-btn"
                                onClick={() =>
                                    handleAction('optimize-db', 'Run database optimization?')
                                }
                                disabled={actionLoading === 'optimize-db'}
                            >
                                <FaDatabase /> Optimize Database
                            </button>
                        </div>
                    </div>

                    {/* Last Refresh */}
                    <div className="perf-monitor-footer">
                        Last refreshed: {lastRefresh.toLocaleTimeString()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMonitor;



import { useState, useEffect } from 'react';
import './AuditLogs.css';
import { FaHistory, FaTimes, FaFilter, FaSearch, FaUserShield, FaTrash, FaEdit, FaPlus, FaBan } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const AuditLogs = ({ serverId, onClose, fetchWithAuth: propsFetchWithAuth, apiBaseUrl: propsApiBaseUrl }) => {
    const apiBaseUrl = propsApiBaseUrl || getApiBase();
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [timeRange, setTimeRange] = useState('7d');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const logTypes = [
        { value: 'all', label: 'All Events', icon: <FaHistory /> },
        { value: 'member_join', label: 'Member Join', icon: <FaPlus /> },
        { value: 'member_leave', label: 'Member Leave', icon: <FaTrash /> },
        { value: 'member_ban', label: 'Member Ban', icon: <FaBan /> },
        { value: 'member_unban', label: 'Member Unban', icon: <FaUserShield /> },
        { value: 'message_delete', label: 'Message Delete', icon: <FaTrash /> },
        { value: 'message_edit', label: 'Message Edit', icon: <FaEdit /> },
        { value: 'channel_create', label: 'Channel Create', icon: <FaPlus /> },
        { value: 'channel_delete', label: 'Channel Delete', icon: <FaTrash /> },
        { value: 'channel_update', label: 'Channel Update', icon: <FaEdit /> },
        { value: 'role_create', label: 'Role Create', icon: <FaPlus /> },
        { value: 'role_delete', label: 'Role Delete', icon: <FaTrash /> },
        { value: 'role_update', label: 'Role Update', icon: <FaEdit /> },
        { value: 'server_update', label: 'Server Update', icon: <FaEdit /> }
    ];

    useEffect(() => {
        fetchLogs();
    }, [serverId, timeRange, page]);

    useEffect(() => {
        applyFilters();
    }, [logs, filterType, searchQuery]);

    const fetchWithAuth = propsFetchWithAuth || (async (url, options = {}) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    });

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const data = await fetchWithAuth(
                `${apiBaseUrl}/audit/${serverId}/logs/?range=${timeRange}&page=${page}&limit=50`
            );
            setLogs(data.logs || []);
            setTotalPages(data.total_pages || 1);
        } catch (error) {
            console.error('Audit logs fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = logs;

        if (filterType !== 'all') {
            filtered = filtered.filter(log => log.action_type === filterType);
        }

        if (searchQuery) {
            filtered = filtered.filter(log =>
                log.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                log.details?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredLogs(filtered);
    };

    const exportLogs = async () => {
        try {
            const data = await fetchWithAuth(
                `${apiBaseUrl}/audit/${serverId}/export/?range=${timeRange}&type=${filterType}`
            );

            const blob = new Blob([JSON.stringify(data.logs, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `audit-logs-${serverId}-${Date.now()}.json`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            showToast('Audit logs exported!');
        } catch (error) {
            console.error('Export error:', error);
            showToast('Failed to export logs', 'error');
        }
    };

    const clearOldLogs = async () => {
        if (!await confirmDialog('Are you sure you want to delete logs older than 90 days?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/audit/${serverId}/clear/`, {
                method: 'DELETE',
                body: JSON.stringify({ days: 90 })
            });
            showToast('Old logs cleared!');
            fetchLogs();
        } catch (error) {
            console.error('Clear logs error:', error);
            showToast('Failed to clear logs', 'error');
        }
    };

    const getActionIcon = (actionType) => {
        const type = logTypes.find(t => t.value === actionType);
        return type?.icon || <FaHistory />;
    };

    const getActionColor = (actionType) => {
        if (actionType.includes('create') || actionType.includes('join')) return '#34c759';
        if (actionType.includes('delete') || actionType.includes('ban') || actionType.includes('leave')) return '#ff3b30';
        if (actionType.includes('update') || actionType.includes('edit')) return '#ff9f0a';
        return '#8b5cf6';
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const showToast = (message, type = 'success') => {
    };

    if (loading) {
        return (
            <div className="audit-overlay">
                <div className="audit-panel loading">
                    <div className="spinner" />
                    <p>Loading Audit Logs...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="audit-overlay">
            <div className="audit-panel">
                <div className="panel-header">
                    <div>
                        <h2><FaHistory /> Audit Logs</h2>
                        <p className="logs-count">{filteredLogs.length} events</p>
                    </div>
                    <button onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="controls-bar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search by user or details..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            {logTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.label}
                                </option>
                            ))}
                        </select>

                        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                            <option value="24h">Last 24 Hours</option>
                            <option value="7d">Last 7 Days</option>
                            <option value="30d">Last 30 Days</option>
                            <option value="90d">Last 90 Days</option>
                        </select>

                        <button onClick={exportLogs} className="btn-export">
                            Export
                        </button>

                        <button onClick={clearOldLogs} className="btn-clear-old">
                            Clear Old
                        </button>
                    </div>
                </div>

                <div className="logs-content">
                    {filteredLogs.length === 0 ? (
                        <div className="empty-state">
                            <FaHistory size={64} />
                            <h3>No Audit Logs</h3>
                            <p>No events found for the selected filters</p>
                        </div>
                    ) : (
                        <div className="logs-timeline">
                            {filteredLogs.map(log => (
                                <div key={log.id} className="log-entry">
                                    <div
                                        className="log-icon"
                                        style={{ background: getActionColor(log.action_type) }}
                                    >
                                        {getActionIcon(log.action_type)}
                                    </div>

                                    <div className="log-content">
                                        <div className="log-header">
                                            <div>
                                                <h4>{log.action_name}</h4>
                                                <div className="log-user">
                                                    {log.user_avatar && <img src={log.user_avatar} alt={log.user_name} />}
                                                    <span>{log.user_name}</span>
                                                </div>
                                            </div>
                                            <span className="log-time">{formatTimestamp(log.created_at)}</span>
                                        </div>

                                        {log.details && (
                                            <p className="log-details">{log.details}</p>
                                        )}

                                        {log.changes && Object.keys(log.changes).length > 0 && (
                                            <div className="log-changes">
                                                {Object.entries(log.changes).map(([key, value]) => (
                                                    <div key={key} className="change-item">
                                                        <span className="change-key">{key}:</span>
                                                        <span className="change-old">{value.old || 'None'}</span>
                                                        <span className="change-arrow">→</span>
                                                        <span className="change-new">{value.new || 'None'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {log.metadata && (
                                            <div className="log-metadata">
                                                {log.metadata.ip && (
                                                    <span className="metadata-item">IP: {log.metadata.ip}</span>
                                                )}
                                                {log.metadata.device && (
                                                    <span className="metadata-item">Device: {log.metadata.device}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                onClick={() => setPage(Math.max(1, page - 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </button>
                            <span className="page-info">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;

import React, { useState, useEffect } from 'react';
import {
    FaShieldAlt, FaTimes, FaSearch, FaFilter, FaDownload,
    FaUserPlus, FaUserMinus, FaEdit, FaTrash, FaCog,
    FaCrown, FaChevronDown, FaChevronUp, FaUndo
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './RoleAuditLogsPanel.css';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';

const RoleAuditLogsPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [expandedLog, setExpandedLog] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [dateRange, setDateRange] = useState('week');

    useEffect(() => {
        loadLogs();
    }, [serverId, filterType, dateRange]);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/role-audits/?range=${dateRange}`);
                if (response.ok) {
                    const data = await response.json();
                    const formattedLogs = (data.audit_logs || data.logs || []).map(log => ({
                        id: log.id,
                        action_type: log.action || log.action_type || 'role_updated',
                        role: log.role || { id: 1, name: log.new_role || 'Unknown', color: '#4caf50' },
                        target_user: log.target_user ? { id: 1, username: log.target_user, avatar: null } : null,
                        moderator: { id: 1, username: log.performed_by || log.moderator?.username || 'Unknown', avatar: null },
                        timestamp: log.created_at || log.timestamp,
                        reason: log.reason || null,
                        changes: log.changes || null
                    }));
                    setLogs(formattedLogs);
                } else {
                    setLogs([]);
                }
            } else {
                setLogs([]);
            }
        } catch (error) {
            console.error('Error loading role audit logs:', error);
            setLogs([]);
        }
        setLoading(false);
    };

    const getActionIcon = (type) => {
        switch (type) {
            case 'role_created': return <FaShieldAlt className="action-icon created" />;
            case 'role_deleted': return <FaTrash className="action-icon deleted" />;
            case 'role_updated': return <FaEdit className="action-icon updated" />;
            case 'role_assigned': return <FaUserPlus className="action-icon assigned" />;
            case 'role_removed': return <FaUserMinus className="action-icon removed" />;
            case 'permissions_changed': return <FaCog className="action-icon permissions" />;
            case 'bulk_assign': return <FaUserPlus className="action-icon bulk" />;
            case 'hierarchy_changed': return <FaCrown className="action-icon hierarchy" />;
            default: return <FaShieldAlt className="action-icon" />;
        }
    };

    const getActionLabel = (type) => {
        switch (type) {
            case 'role_created': return 'Role Created';
            case 'role_deleted': return 'Role Deleted';
            case 'role_updated': return 'Role Updated';
            case 'role_assigned': return 'Role Assigned';
            case 'role_removed': return 'Role Removed';
            case 'permissions_changed': return 'Permissions Changed';
            case 'bulk_assign': return 'Bulk Assignment';
            case 'hierarchy_changed': return 'Hierarchy Changed';
            default: return type;
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Just now';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
        if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
        return date.toLocaleDateString();
    };

    const handleRevert = async (logId) => {
        if (!await confirmDialog('Are you sure you want to revert this action?')) return;
        toast.info('Revert functionality - API call would be made here');
    };

    const handleExport = () => {
        const csv = logs.map(log => ({
            action: getActionLabel(log.action_type),
            role: log.role.name,
            moderator: log.moderator.username,
            target: log.target_user?.username || '-',
            reason: log.reason || '-',
            timestamp: new Date(log.timestamp).toISOString()
        }));
        console.log('Exporting:', csv);
        toast.info('Export started - CSV download would begin');
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.moderator.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (log.target_user?.username.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter = filterType === 'all' || log.action_type === filterType;
        return matchesSearch && matchesFilter;
    });

    const renderChanges = (log) => {
        switch (log.action_type) {
            case 'role_created':
                return (
                    <div className="change-details">
                        <div className="change-item">
                            <span className="change-label">Name:</span>
                            <span className="change-value">{log.changes.name}</span>
                        </div>
                        <div className="change-item">
                            <span className="change-label">Color:</span>
                            <span className="color-preview" style={{ background: log.changes.color }}></span>
                        </div>
                        {log.changes.permissions && (
                            <div className="change-item">
                                <span className="change-label">Permissions:</span>
                                <div className="permissions-list">
                                    {log.changes.permissions.map((perm, i) => (
                                        <span key={i} className="perm-badge added">{perm.replace('_', ' ')}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'permissions_changed':
                return (
                    <div className="change-details">
                        {log.changes.added?.length > 0 && (
                            <div className="change-item">
                                <span className="change-label">Added:</span>
                                <div className="permissions-list">
                                    {log.changes.added.map((perm, i) => (
                                        <span key={i} className="perm-badge added">+ {perm.replace('_', ' ')}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {log.changes.removed?.length > 0 && (
                            <div className="change-item">
                                <span className="change-label">Removed:</span>
                                <div className="permissions-list">
                                    {log.changes.removed.map((perm, i) => (
                                        <span key={i} className="perm-badge removed">- {perm.replace('_', ' ')}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            case 'role_updated':
                return (
                    <div className="change-details">
                        {Object.keys(log.changes.before).map(key => (
                            <div key={key} className="change-item">
                                <span className="change-label">{key}:</span>
                                <span className="change-value before">
                                    {key === 'color' ? (
                                        <span className="color-preview" style={{ background: log.changes.before[key] }}></span>
                                    ) : String(log.changes.before[key])}
                                </span>
                                <span className="change-arrow">→</span>
                                <span className="change-value after">
                                    {key === 'color' ? (
                                        <span className="color-preview" style={{ background: log.changes.after[key] }}></span>
                                    ) : String(log.changes.after[key])}
                                </span>
                            </div>
                        ))}
                    </div>
                );
            case 'hierarchy_changed':
                return (
                    <div className="change-details">
                        <div className="change-item">
                            <span className="change-label">Position:</span>
                            <span className="change-value before">#{log.changes.old_position}</span>
                            <span className="change-arrow">→</span>
                            <span className="change-value after">#{log.changes.new_position}</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="roleaudit-overlay" onClick={onClose}>
            <div className="roleaudit-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2><FaShieldAlt /> Role Audit Logs</h2>
                        <span className="log-count">{filteredLogs.length} log entries</span>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Search & Filter Bar */}
                <div className="filter-bar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search roles, users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className={`filter-toggle ${showFilters ? 'active' : ''}`}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <FaFilter /> Filters
                    </button>
                    <button className="export-btn" onClick={handleExport}>
                        <FaDownload /> Export
                    </button>
                </div>

                {showFilters && (
                    <div className="filters-panel">
                        <div className="filter-group">
                            <label>Action Type</label>
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="all">All Actions</option>
                                <option value="role_created">Role Created</option>
                                <option value="role_deleted">Role Deleted</option>
                                <option value="role_updated">Role Updated</option>
                                <option value="role_assigned">Role Assigned</option>
                                <option value="role_removed">Role Removed</option>
                                <option value="permissions_changed">Permissions Changed</option>
                                <option value="bulk_assign">Bulk Assignment</option>
                                <option value="hierarchy_changed">Hierarchy Changed</option>
                            </select>
                        </div>
                        <div className="filter-group">
                            <label>Time Range</label>
                            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                                <option value="day">Last 24 Hours</option>
                                <option value="week">Last Week</option>
                                <option value="month">Last Month</option>
                                <option value="all">All Time</option>
                            </select>
                        </div>
                    </div>
                )}

                {/* Logs List */}
                <div className="logs-content">
                    {loading ? (
                        <div className="loading">Loading audit logs...</div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="empty-state">
                            <FaShieldAlt />
                            <p>No audit logs found</p>
                        </div>
                    ) : (
                        <div className="logs-list">
                            {filteredLogs.map(log => (
                                <div
                                    key={log.id}
                                    className={`log-item ${expandedLog === log.id ? 'expanded' : ''}`}
                                >
                                    <div
                                        className="log-main"
                                        onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                    >
                                        {getActionIcon(log.action_type)}
                                        <div className="log-info">
                                            <div className="log-header">
                                                <span className="action-label">{getActionLabel(log.action_type)}</span>
                                                <span
                                                    className="role-badge"
                                                    style={{
                                                        background: `${log.role.color}20`,
                                                        color: log.role.color,
                                                        borderColor: log.role.color
                                                    }}
                                                >
                                                    {log.role.name}
                                                </span>
                                            </div>
                                            <div className="log-meta">
                                                <span className="moderator">by {log.moderator.username}</span>
                                                {log.target_user && (
                                                    <span className="target">→ {log.target_user.username}</span>
                                                )}
                                                {log.target_count && (
                                                    <span className="target">→ {log.target_count} users</span>
                                                )}
                                                <span className="timestamp">{formatTimestamp(log.timestamp)}</span>
                                            </div>
                                        </div>
                                        <button className="expand-btn">
                                            {expandedLog === log.id ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    </div>
                                    {expandedLog === log.id && (
                                        <div className="log-details">
                                            {log.reason && (
                                                <div className="reason">
                                                    <strong>Reason:</strong> {log.reason}
                                                </div>
                                            )}
                                            {renderChanges(log)}
                                            <div className="log-actions">
                                                <button className="revert-btn" onClick={() => handleRevert(log.id)}>
                                                    <FaUndo /> Revert Action
                                                </button>
                                                <span className="full-timestamp">
                                                    {new Date(log.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoleAuditLogsPanel;

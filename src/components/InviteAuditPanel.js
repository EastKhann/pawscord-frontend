import React, { useState, useEffect } from 'react';
import {
    FaLink, FaTimes, FaSearch, FaFilter, FaDownload,
    FaUser, FaClock, FaCheckCircle, FaTimesCircle, FaEye,
    FaCalendar, FaChartBar, FaUserPlus, FaHistory, FaExclamationTriangle
} from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';
import './InviteAuditPanel.css';

const InviteAuditPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dateRange, setDateRange] = useState('week');
    const [stats, setStats] = useState(null);
    const [selectedLog, setSelectedLog] = useState(null);

    useEffect(() => {
        loadData();
    }, [serverId, dateRange]);

    const loadData = async () => {
        setLoading(true);
        try {
            const baseUrl = apiBaseUrl || getApiBase();
            if (fetchWithAuth && serverId) {
                const response = await fetchWithAuth(`${baseUrl}/api/servers/${serverId}/invite-audit/?range=${dateRange}`);
                if (response.ok) {
                    const data = await response.json();
                    setLogs(data.logs || []);
                    setStats(data.stats || { total_invites: 0, total_uses: 0, active_invites: 0, expired_invites: 0, top_inviter: null, today_joins: 0, week_joins: 0, revoked_count: 0 });
                } else {
                    setLogs([]);
                    setStats({ total_invites: 0, total_uses: 0, active_invites: 0, expired_invites: 0, top_inviter: null, today_joins: 0, week_joins: 0, revoked_count: 0 });
                }
            } else {
                setLogs([]);
                setStats({ total_invites: 0, total_uses: 0, active_invites: 0, expired_invites: 0, top_inviter: null, today_joins: 0, week_joins: 0, revoked_count: 0 });
            }
        } catch (error) {
            console.error('Error loading invite audit logs:', error);
            setLogs([]);
            setStats({ total_invites: 0, total_uses: 0, active_invites: 0, expired_invites: 0, top_inviter: null, today_joins: 0, week_joins: 0, revoked_count: 0 });
        }
        setLoading(false);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success': return <FaCheckCircle className="success" />;
            case 'expired': return <FaTimesCircle className="expired" />;
            case 'revoked': return <FaTimesCircle className="revoked" />;
            case 'suspicious': return <FaExclamationTriangle className="suspicious" />;
            default: return null;
        }
    };

    const exportLogs = () => {
        const csv = logs.map(log => ({
            code: log.invite_code,
            inviter: log.inviter.username,
            used_by: log.used_by?.username || '-',
            status: log.status,
            used_at: log.used_at || '-',
            uses: log.current_uses
        }));
        console.log('Exporting:', csv);
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch =
            log.invite_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.inviter.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (log.used_by?.username?.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="invite-audit-overlay" onClick={onClose}>
                <div className="invite-audit-panel" onClick={e => e.stopPropagation()}>
                    <div className="loading">Loading invite audit logs...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="invite-audit-overlay" onClick={onClose}>
            <div className="invite-audit-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaLink />
                            Invite Audit Log
                        </h2>
                        <span className="subtitle">Track invite usage and member joins</span>
                    </div>
                    <div className="header-actions">
                        <button className="export-btn" onClick={exportLogs}>
                            <FaDownload /> Export
                        </button>
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-icon"><FaLink /></div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.total_invites}</span>
                            <span className="stat-label">Total Invites</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon uses"><FaUserPlus /></div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.total_uses}</span>
                            <span className="stat-label">Total Uses</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon active"><FaCheckCircle /></div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.active_invites}</span>
                            <span className="stat-label">Active</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon today"><FaCalendar /></div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.today_joins}</span>
                            <span className="stat-label">Today</span>
                        </div>
                    </div>
                    <div className="stat-card top-inviter">
                        <div className="stat-icon crown"><FaUser /></div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.top_inviter.username}</span>
                            <span className="stat-label">{stats.top_inviter.uses} invites</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-row">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Search by code, inviter, or user..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <FaFilter />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="success">Success</option>
                            <option value="expired">Expired</option>
                            <option value="revoked">Revoked</option>
                            <option value="suspicious">Suspicious</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <FaCalendar />
                        <select
                            value={dateRange}
                            onChange={(e) => setDateRange(e.target.value)}
                        >
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="all">All Time</option>
                        </select>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="logs-container">
                    <table className="logs-table">
                        <thead>
                            <tr>
                                <th>Status</th>
                                <th>Invite Code</th>
                                <th>Inviter</th>
                                <th>Used By</th>
                                <th>Used At</th>
                                <th>Uses</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map(log => (
                                <tr key={log.id} className={`status-${log.status}`}>
                                    <td>
                                        <span className={`status-badge ${log.status}`}>
                                            {getStatusIcon(log.status)}
                                            {log.status}
                                        </span>
                                    </td>
                                    <td>
                                        <code className="invite-code">{log.invite_code}</code>
                                    </td>
                                    <td>
                                        <div className="user-cell">
                                            <div className="user-avatar">
                                                {log.inviter.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{log.inviter.username}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {log.used_by ? (
                                            <div className="user-cell">
                                                <div className="user-avatar new">
                                                    {log.used_by.username.charAt(0).toUpperCase()}
                                                </div>
                                                <span>{log.used_by.username}</span>
                                            </div>
                                        ) : (
                                            <span className="no-data">-</span>
                                        )}
                                    </td>
                                    <td>
                                        <span className="date-cell">
                                            <FaClock />
                                            {formatDate(log.used_at)}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="uses-cell">
                                            {log.current_uses}
                                            {log.max_uses && <span className="max">/ {log.max_uses}</span>}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="view-details-btn"
                                            onClick={() => setSelectedLog(log)}
                                        >
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredLogs.length === 0 && (
                        <div className="empty-state">
                            <FaHistory />
                            <p>No invite logs found matching your filters</p>
                        </div>
                    )}
                </div>

                {/* Details Modal */}
                {selectedLog && (
                    <div className="details-modal-overlay" onClick={() => setSelectedLog(null)}>
                        <div className="details-modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h3><FaLink /> Invite Details</h3>
                                <button onClick={() => setSelectedLog(null)}><FaTimes /></button>
                            </div>
                            <div className="modal-content">
                                <div className="detail-row">
                                    <span className="detail-label">Invite Code</span>
                                    <code className="detail-value">{selectedLog.invite_code}</code>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Status</span>
                                    <span className={`status-badge ${selectedLog.status}`}>
                                        {getStatusIcon(selectedLog.status)}
                                        {selectedLog.status}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Created By</span>
                                    <span className="detail-value">{selectedLog.inviter.username}</span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Created At</span>
                                    <span className="detail-value">{formatDate(selectedLog.invite_created)}</span>
                                </div>
                                {selectedLog.used_by && (
                                    <div className="detail-row">
                                        <span className="detail-label">Last Used By</span>
                                        <span className="detail-value">{selectedLog.used_by.username}</span>
                                    </div>
                                )}
                                <div className="detail-row">
                                    <span className="detail-label">Total Uses</span>
                                    <span className="detail-value">
                                        {selectedLog.current_uses}
                                        {selectedLog.max_uses && ` / ${selectedLog.max_uses}`}
                                    </span>
                                </div>
                                {selectedLog.revoke_reason && (
                                    <div className="detail-row warning">
                                        <span className="detail-label">Revoke Reason</span>
                                        <span className="detail-value">{selectedLog.revoke_reason}</span>
                                    </div>
                                )}
                                {selectedLog.flag_reason && (
                                    <div className="detail-row warning">
                                        <span className="detail-label">Flag Reason</span>
                                        <span className="detail-value">{selectedLog.flag_reason}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InviteAuditPanel;

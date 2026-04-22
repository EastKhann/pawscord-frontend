import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    FaLink,
    FaTimes,
    FaSearch,
    FaFilter,
    FaDownload,
    FaUser,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaCalendar,
    FaChartBar,
    FaUserPlus,
    FaHistory,
    FaExclamationTriangle,
} from 'react-icons/fa';
import { getApiBase } from '../../utils/apiEndpoints';
import './InviteAuditPanel.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const InviteAuditPanel = ({ serverId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
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
                const response = await fetchWithAuth(
                    `${baseUrl}/api/servers/${serverId}/invite-audit/?range=${dateRange}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setLogs(data.logs || []);
                    setStats(
                        data.stats || {
                            total_invites: 0,
                            total_uses: 0,
                            active_invites: 0,
                            expired_invites: 0,
                            top_inviter: null,
                            today_joins: 0,
                            week_joins: 0,
                            revoked_count: 0,
                        }
                    );
                } else {
                    setLogs([]);
                    setStats({
                        total_invites: 0,
                        total_uses: 0,
                        active_invites: 0,
                        expired_invites: 0,
                        top_inviter: null,
                        today_joins: 0,
                        week_joins: 0,
                        revoked_count: 0,
                    });
                }
            } else {
                setLogs([]);
                setStats({
                    total_invites: 0,
                    total_uses: 0,
                    active_invites: 0,
                    expired_invites: 0,
                    top_inviter: null,
                    today_joins: 0,
                    week_joins: 0,
                    revoked_count: 0,
                });
            }
        } catch (error) {
            logger.error('Error loading invite audit logs:', error);
            setLogs([]);
            setStats({
                total_invites: 0,
                total_uses: 0,
                active_invites: 0,
                expired_invites: 0,
                top_inviter: null,
                today_joins: 0,
                week_joins: 0,
                revoked_count: 0,
            });
        }
        setLoading(false);
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return '-';
        return new Date(timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'success':
                return <FaCheckCircle className="success" />;
            case 'expired':
                return <FaTimesCircle className="expired" />;
            case 'revoked':
                return <FaTimesCircle className="revoked" />;
            case 'suspicious':
                return <FaExclamationTriangle className="suspicious" />;
            default:
                return null;
        }
    };

    const exportLogs = () => {
        const csv = logs.map((log) => ({
            code: log.invite_code,
            inviter: log.inviter.username,
            used_by: log.used_by?.username || '-',
            status: log.status,
            used_at: log.used_at || '-',
            uses: log.current_uses,
        }));
    };

    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.invite_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.inviter.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.used_by?.username?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || log.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div
                className="invite-audit-overlay"
                role="button"
                tabIndex={0}
                onClick={onClose}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div
                    className="invite-audit-panel"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    <div className="loading">{t('admin.loadingInviteLogs', 'Loading invite audit logs...')}</div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="invite-audit-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="invite-audit-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="panel-header">
                    <div className="header-info">
                        <h2>
                            <FaLink />
                            Davet Denetim Logu
                        </h2>
                        <span className="subtitle">
                            {t('inviteAudit.subtitle','Track invite usage and member joins')}
                        </span>
                    </div>
                    <div className="header-actions">
                        <button
                            aria-label={t('admin.exportLogs', 'Export logs')}
                            className="export-btn"
                            onClick={exportLogs}
                        >
                            <FaDownload /> {t('common.export','Export')}
                        </button>
                        <button aria-label={t('common.close')} className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="stats-row">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <FaLink />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.total_invites}</span>
                            <span className="stat-label">Toplam Davet</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon uses">
                            <FaUserPlus />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.total_uses}</span>
                            <span className="stat-label">{t('admin.totalUsage', 'Total Usage')}</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon active">
                            <FaCheckCircle />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.active_invites}</span>
                            <span className="stat-label">Aktif</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon today">
                            <FaCalendar />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.today_joins}</span>
                            <span className="stat-label">{t('common.today', 'Today')}</span>
                        </div>
                    </div>
                    <div className="stat-card top-inviter">
                        <div className="stat-icon crown">
                            <FaUser />
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stats.top_inviter.username}</span>
                            <span className="stat-label">{stats.top_inviter.uses} davet</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-row">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder={t('admin.searchInvites', 'Search by code, inviter or user...')}
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
                            <option value="all">{t('admin.allStatuses', 'All Statuses')}</option>
                            <option value="success">{t('common.success')}</option>
                            <option value="expired">{t('admin.expired', 'Expired')}</option>
                            <option value="revoked">{t('admin.revoked', 'Revoked')}</option>
                            <option value="suspicious">{t('admin.suspicious', 'Suspicious')}</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <FaCalendar />
                        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                            <option value="today">{t('common.today', 'Today')}</option>
                            <option value="week">Bu Hafta</option>
                            <option value="month">Bu Ay</option>
                            <option value="all">{t('admin.allTime', 'All Time')}</option>
                        </select>
                    </div>
                </div>

                {/* Logs Table */}
                <div className="logs-container">
                    <table className="logs-table">
                        <thead>
                            <tr>
                                <th>Durum</th>
                                <th>Davet Kodu</th>
                                <th>Davetci</th>
                                <th>Kullanan</th>
                                <th>{t('admin.usageDate', 'Usage Date')}</th>
                                <th>{t('admin.usage', 'Usage')}</th>
                                <th>Eylemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log) => (
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
                                            {log.max_uses && (
                                                <span className="max">/ {log.max_uses}</span>
                                            )}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            aria-label={t('common.viewDetails', 'View details')}
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
                            <p>{t('admin.noInviteRecords', 'No invite records match your filters')}</p>
                        </div>
                    )}
                </div>

                {/* Details Modal */}
                {selectedLog && (
                    <div
                        className="details-modal-overlay"
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedLog(null)}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div
                            className="details-modal"
                            role="button"
                            tabIndex={0}
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <div className="modal-header">
                                <h3>
                                    <FaLink /> {t('inviteAudit.details','Invite Details')}
                                </h3>
                                <button aria-label={t('common.close')} onClick={() => setSelectedLog(null)}>
                                    <FaTimes />
                                </button>
                            </div>
                            <div className="modal-content">
                                <div className="detail-row">
                                    <span className="detail-label">Davet Kodu</span>
                                    <code className="detail-value">{selectedLog.invite_code}</code>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">Durum</span>
                                    <span className={`status-badge ${selectedLog.status}`}>
                                        {getStatusIcon(selectedLog.status)}
                                        {selectedLog.status}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">{t('admin.createdBy', 'Created By')}</span>
                                    <span className="detail-value">
                                        {selectedLog.inviter.username}
                                    </span>
                                </div>
                                <div className="detail-row">
                                    <span className="detail-label">{t('admin.createdAt', 'Created At')}</span>
                                    <span className="detail-value">
                                        {formatDate(selectedLog.invite_created)}
                                    </span>
                                </div>
                                {selectedLog.used_by && (
                                    <div className="detail-row">
                                        <span className="detail-label">Son Kullanan</span>
                                        <span className="detail-value">
                                            {selectedLog.used_by.username}
                                        </span>
                                    </div>
                                )}
                                <div className="detail-row">
                                    <span className="detail-label">{t('admin.totalUsage', 'Total Usage')}</span>
                                    <span className="detail-value">
                                        {selectedLog.current_uses}
                                        {selectedLog.max_uses && ` / ${selectedLog.max_uses}`}
                                    </span>
                                </div>
                                {selectedLog.revoke_reason && (
                                    <div className="detail-row warning">
                                        <span className="detail-label">{t('admin.cancelReason', 'Cancel Reason')}</span>
                                        <span className="detail-value">
                                            {selectedLog.revoke_reason}
                                        </span>
                                    </div>
                                )}
                                {selectedLog.flag_reason && (
                                    <div className="detail-row warning">
                                        <span className="detail-label">{t('admin.flagReason', 'Flag Reason')}</span>
                                        <span className="detail-value">
                                            {selectedLog.flag_reason}
                                        </span>
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

InviteAuditPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default InviteAuditPanel;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './AuditLogsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';

const AuditLogsPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const [logs, setLogs] = useState([]);
    const [filters, setFilters] = useState({
        action_type: '', // message_delete, message_edit, member_join, member_leave, role_change, channel_create, etc.
        user_id: '',
        target_user_id: '',
        channel_id: '',
        start_date: '',
        end_date: '',
    });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const apiBaseUrl = getApiBase();

    useEffect(() => {
        if (serverId) {
            fetchLogs();
        }
    }, [serverId, page]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const params = new URLSearchParams({
                page,
                ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== '')),
            });

            const response = await fetch(`${apiBaseUrl}/audit-logs/server/${serverId}/?${params}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                if (page === 1) {
                    setLogs(data.logs || []);
                } else {
                    setLogs([...logs, ...(data.logs || [])]);
                }
                setHasMore(data.has_more || false);
            }
        } catch (error) {
            logger.error('Error fetching audit logs:', error);
            toast.error(t('admin.auditLogs.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        setPage(1);
        fetchLogs();
    };

    const clearFilters = () => {
        setFilters({
            action_type: '',
            user_id: '',
            target_user_id: '',
            channel_id: '',
            start_date: '',
            end_date: '',
        });
        setPage(1);
    };

    const exportLogs = async () => {
        try {
            const token = getToken();
            const params = new URLSearchParams({
                ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== '')),
            });

            const response = await fetch(
                `${apiBaseUrl}/audit-logs/server/${serverId}/export/?${params}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `audit_logs_${serverId}.csv`;
                a.click();
                toast.success(t('admin.auditLogs.exported'));
            }
        } catch (error) {
            logger.error('Error exporting logs:', error);
            toast.error(t('admin.auditLogs.exportFailed'));
        }
    };

    const getActionIcon = (actionType) => {
        const icons = {
            message_delete: '🗑️',
            message_edit: '✏️',
            member_join: '👋',
            member_leave: '👋',
            member_kick: '🚫',
            member_ban: '🔨',
            member_unban: '✅',
            role_create: '🎭',
            role_delete: '🗑️',
            role_update: '🎨',
            role_assign: '⭐',
            role_remove: '➖',
            channel_create: '➕',
            channel_delete: '❌',
            channel_update: '🔧',
            server_update: '⚙️',
            invite_create: '🔗',
            webhook_create: '🤖',
            webhook_delete: '🗑️',
            emoji_create: '😀',
            emoji_delete: '😢',
            pin_add: '📌',
            pin_remove: '📌',
            reaction_add: '❤️',
            reaction_remove: '💔',
        };
        return icons[actionType] || '📝';
    };

    const getActionColor = (actionType) => {
        if (
            actionType.includes('delete') ||
            actionType.includes('remove') ||
            actionType.includes('kick') ||
            actionType.includes('ban')
        ) {
            return '#f23f42';
        }
        if (
            actionType.includes('create') ||
            actionType.includes('add') ||
            actionType.includes('join')
        ) {
            return '#10b981';
        }
        if (actionType.includes('edit') || actionType.includes('update')) {
            return '#f59e0b';
        }
        return '#4752c4';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;

        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div
            className="audit-logs-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="audit-logs-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="audit-header">
                    <h2>📋 Audit Logs</h2>
                    <button aria-label={t('common.close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="filters-section">
                    <div className="filter-grid">
                        <div className="filter-group">
                            <label>{t('admin.actionType', 'Action Type')}</label>
                            <select
                                value={filters.action_type}
                                onChange={(e) =>
                                    setFilters({ ...filters, action_type: e.target.value })
                                }
                            >
                                <option value="">{t('common.all', 'All')}</option>
                                <optgroup label={t('common.messages', 'Messages')}>
                                    <option value="message_delete">{t('admin.messageDelete', 'Message Delete')}</option>
                                    <option value="message_edit">{t('admin.messageEdit', 'Message Edit')}</option>
                                    <option value="pin_add">{t('admin.pinAdd', 'Add Pin')}</option>
                                    <option value="pin_remove">{t('admin.pinRemove', 'Remove Pin')}</option>
                                </optgroup>
                                <optgroup label={t('common.members', 'Members')}>
                                    <option value="member_join">{t('admin.memberJoin', 'Member Joined')}</option>
                                    <option value="member_leave">{t('admin.memberLeave', 'Member Left')}</option>
                                    <option value="member_kick">{t('admin.memberKick', 'Member Kicked')}</option>
                                    <option value="member_ban">{t('admin.memberBan', 'Member Banned')}</option>
                                    <option value="member_unban">{t('admin.memberUnban', 'Ban Removed')}</option>
                                </optgroup>
                                <optgroup label={t('common.roles', 'Roles')}>
                                    <option value="role_create">{t('admin.roleCreate', 'Role Created')}</option>
                                    <option value="role_delete">{t('admin.roleDelete', 'Role Delete')}</option>
                                    <option value="role_update">{t('admin.roleUpdate', 'Role Updated')}</option>
                                    <option value="role_assign">{t('admin.roleAssign', 'Role Assign')}</option>
                                    <option value="role_remove">{t('admin.roleRemove', 'Role Remove')}</option>
                                </optgroup>
                                <optgroup label={t('common.channels', 'Channels')}>
                                    <option value="channel_create">{t('admin.channelCreate', 'Channel Created')}</option>
                                    <option value="channel_delete">{t('admin.channelDelete', 'Channel Delete')}</option>
                                    <option value="channel_update">{t('admin.channelUpdate', 'Channel Updated')}</option>
                                </optgroup>
                                <optgroup label={t('common.other', 'Other')}>
                                    <option value="server_update">{t('admin.serverUpdate', 'Server Updated')}</option>
                                    <option value="invite_create">{t('admin.inviteCreate', 'Invite Created')}</option>
                                    <option value="webhook_create">{t('admin.webhookCreate', 'Webhook Created')}</option>
                                    <option value="webhook_delete">{t('admin.webhookDelete', 'Webhook Delete')}</option>
                                    <option value="emoji_create">{t('admin.emojiCreate', 'Add Emoji')}</option>
                                    <option value="emoji_delete">{t('admin.emojiDelete', 'Remove Emoji')}</option>
                                </optgroup>
                            </select>
                        </div>

                        <div className="filter-group">
                            {t('admin.startDate', 'Start Date')}
                            <input
                                type="datetime-local"
                                value={filters.start_date}
                                onChange={(e) =>
                                    setFilters({ ...filters, start_date: e.target.value })
                                }
                            />
                        </div>

                        <div className="filter-group">
                            {t('admin.endDate', 'End Date')}
                            <input
                                type="datetime-local"
                                value={filters.end_date}
                                onChange={(e) =>
                                    setFilters({ ...filters, end_date: e.target.value })
                                }
                            />
                        </div>

                        <div className="filter-group">
                            {t('admin.userIdLabel', 'User ID')}
                            <input
                                type="text"
                                placeholder={t('admin.actionUser', 'User performing action')}
                                value={filters.user_id}
                                onChange={(e) =>
                                    setFilters({ ...filters, user_id: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    <div className="filter-actions">
                        <button
                            aria-label={t('admin.applyFilters', 'Apply Filters')}
                            className="filter-btn apply-btn"
                            onClick={applyFilters}
                        >
                            {t('common.filter', '🔍 Filter')}
                        </button>
                        <button
                            aria-label={t('admin.clearFilters', 'Clear Filters')}
                            className="filter-btn clear-btn"
                            onClick={clearFilters}
                        >
                            🗑️ Clear
                        </button>
                        <button
                            aria-label={t('admin.exportLogs', 'Export logs')}
                            className="filter-btn export-btn"
                            onClick={exportLogs}
                        >
                            📥 Export
                        </button>
                    </div>
                </div>

                <div className="logs-content">
                    {loading && logs.length === 0 ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('admin.logsLoading', 'Loading logs...')}</p>
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">📋</span>
                            <p>{t('admin.noAuditLogs', 'No audit logs yet')}</p>
                            <span>{t('admin.serverActionsHere', 'Server actions will appear here')}</span>
                        </div>
                    ) : (
                        <>
                            <div className="logs-list">
                                {logs.map((log) => (
                                    <div
                                        key={log.id}
                                        className="log-entry"
                                        style={{ borderLeftColor: getActionColor(log.action_type) }}
                                    >
                                        <div
                                            className="log-icon"
                                            style={{
                                                background: `${getActionColor(log.action_type)}20`,
                                            }}
                                        >
                                            {getActionIcon(log.action_type)}
                                        </div>

                                        <div className="log-details">
                                            <div className="log-header-row">
                                                <span
                                                    className="log-action"
                                                    style={{
                                                        color: getActionColor(log.action_type),
                                                    }}
                                                >
                                                    {log.action_display || log.action_type}
                                                </span>
                                                <span className="log-time">
                                                    {formatDate(log.created_at)}
                                                </span>
                                            </div>

                                            <div className="log-description">
                                                {log.description || 'Description yok'}
                                            </div>

                                            {log.metadata &&
                                                Object.keys(log.metadata).length > 0 && (
                                                    <div className="log-metadata">
                                                        {Object.entries(log.metadata).map(
                                                            ([key, value]) => (
                                                                <div
                                                                    key={key}
                                                                    className="metadata-item"
                                                                >
                                                                    <span className="metadata-key">
                                                                        {key}:
                                                                    </span>
                                                                    <span className="metadata-value">
                                                                        {JSON.stringify(value)}
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}

                                            <div className="log-footer">
                                                {log.user && (
                                                    <span className="log-user">
                                                        👤{' '}
                                                        {log.user.username || `User#${log.user.id}`}
                                                    </span>
                                                )}
                                                {log.channel && (
                                                    <span className="log-channel">
                                                        📢 {log.channel.name}
                                                    </span>
                                                )}
                                                {log.target_user && (
                                                    <span className="log-target">
                                                        🎯 {log.target_user.username}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {hasMore && (
                                <button
                                    aria-label={t('common.loadMore', 'Load more')}
                                    className="load-more-btn"
                                    onClick={() => setPage(page + 1)}
                                    disabled={loading}
                                >
                                    {loading ? t('common.loading', 'Loading...') : t('admin.loadMore', '📄 Load More')}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

AuditLogsPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default AuditLogsPanel;

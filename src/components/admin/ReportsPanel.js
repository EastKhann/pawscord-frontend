import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/ReportsPanel.js
import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import './ReportsPanel.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const ReportsPanel = ({ apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'pending', 'resolved', 'dismissed'
    const [selectedReport, setSelectedReport] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/reports/list/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setReports(data.reports || []);
            } else {
                toast.error(t('reports.loadError', '❌ Raporlar yüklenemedi'));
            }
        } catch (error) {
            logger.error('Fetch reports error:', error);
            toast.error(t('common.connectionError', '❌ Bağlantı hatası'));
        } finally {
            setLoading(false);
        }
    };

    const handleReport = async (reportId, action, reason = '') => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/reports/handle/${reportId}/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action, // 'ban', 'warn', 'delete_message', 'dismiss'
                    reason,
                }),
            });

            if (response.ok) {
                const data = await response.json();

                // Update report status
                setReports(
                    reports.map((r) =>
                        r.id === reportId
                            ? {
                                  ...r,
                                  status: action === 'dismiss' ? 'dismissed' : 'resolved',
                                  resolution: action,
                              }
                            : r
                    )
                );

                setSelectedReport(null);
                toast.success(getActionLabel(action));
            } else {
                const error = await response.json();
                toast.error(error.error || t('reports.operationFailed', 'İşlem başarısız'));
            }
        } catch (error) {
            logger.error('Handle report error:', error);
            toast.error(t('common.connectionError', '❌ Bağlantı hatası'));
        }
    };

    const getActionLabel = (action) => {
        const labels = {
            ban: t('reports.userBanned', 'Kullanıcı banlandı'),
            warn: t('reports.userWarned', 'Kullanıcı uyarıldı'),
            delete_message: t('reports.messageDeleted', 'Mesaj silindi'),
            dismiss: t('reports.reportRejected', 'Rapor reddedildi'),
        };
        return labels[action] || t('reports.actionTaken', 'İşlem yapıldı');
    };

    const filteredReports = useMemo(
        () =>
            reports.filter((report) => {
                if (filter === 'all') return true;
                if (filter === 'pending') return report.status === 'pending';
                if (filter === 'resolved') return report.status === 'resolved';
                if (filter === 'dismissed') return report.status === 'dismissed';
                return true;
            }),
        [reports, filter]
    );

    const getStatusBadge = (status) => {
        const badges = {
            pending: { label: 'Bekliyor', className: 'status-pending' },
            resolved: { label: t('reports.resolved','Resolved'), className: 'status-resolved' },
            dismissed: { label: 'Reddedildi', className: 'status-dismissed' },
        };
        return badges[status] || { label: status, className: '' };
    };

    const getSeverityBadge = (reason) => {
        const severities = {
            spam: { label: 'Spam', className: 'severity-low' },
            harassment: { label: 'Taciz', className: 'severity-high' },
            hate_speech: {
                label: t('reports.hateSpeech', 'Nefret Söylemi'),
                className: 'severity-critical',
            },
            inappropriate: {
                label: t('reports.inappropriate', 'Uygunsuz İçerik'),
                className: 'severity-medium',
            },
            scam: { label: t('reports.scam', 'Dolandırıcılık'), className: 'severity-high' },
            other: { label: t('reports.other', 'Diğer'), className: 'severity-low' },
        };
        return severities[reason] || { label: reason, className: '' };
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const stats = {
        total: reports.length,
        pending: reports.filter((r) => r.status === 'pending').length,
        resolved: reports.filter((r) => r.status === 'resolved').length,
        dismissed: reports.filter((r) => r.status === 'dismissed').length,
    };

    return (
        <div
            className="reports-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="reports-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="reports-header">
                    <h2>🚨 {t('reports.title', 'Rapor Yönetimi')}</h2>
                    <button aria-label={t('common.close')} className="close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Stats */}
                <div className="reports-stats">
                    <div className="stat-item">
                        <span className="stat-value">{stats.total}</span>
                        <span className="stat-label">Toplam</span>
                    </div>
                    <div className="stat-item pending">
                        <span className="stat-value">{stats.pending}</span>
                        <span className="stat-label">Bekliyor</span>
                    </div>
                    <div className="stat-item resolved">
                        <span className="stat-value">{stats.resolved}</span>
                        <span className="stat-label">{t('admin.resolved', 'Resolved')}</span>
                    </div>
                    <div className="stat-item dismissed">
                        <span className="stat-value">{stats.dismissed}</span>
                        <span className="stat-label">Reddedildi</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="reports-filters">
                    <button
                        aria-label={t('admin.allReports')}
                        className={filter === 'all' ? 'active' : ''}
                        onClick={() => setFilter('all')}
                    >
                        {t('common.all','All')} ({stats.total})
                    </button>
                    <button
                        aria-label={t('admin.pendingReports')}
                        className={filter === 'pending' ? 'active' : ''}
                        onClick={() => setFilter('pending')}
                    >
                        Bekliyor ({stats.pending})
                    </button>
                    <button
                        aria-label={t('admin.resolvedReports')}
                        className={filter === 'resolved' ? 'active' : ''}
                        onClick={() => setFilter('resolved')}
                    >
                        {t('reports.resolved', 'Çözüldü')} ({stats.resolved})
                    </button>
                    <button
                        aria-label={t('admin.rejectedReports')}
                        className={filter === 'dismissed' ? 'active' : ''}
                        onClick={() => setFilter('dismissed')}
                    >
                        {t('reports.rejected', 'Reddedildi')} ({stats.dismissed})
                    </button>
                </div>

                <div className="reports-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : filteredReports.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🎉</div>
                            <h3>Rapor yok</h3>
                            <p>{t('admin.noReportsFilter', 'No reports found for this filter')}</p>
                        </div>
                    ) : (
                        <div className="reports-list">
                            {filteredReports.map((report) => {
                                const statusBadge = getStatusBadge(report.status);
                                const severityBadge = getSeverityBadge(report.reason);

                                return (
                                    <div key={report.id} className="report-card">
                                        <div className="report-header">
                                            <div className="report-meta">
                                                <span
                                                    className={`status-badge ${statusBadge.className}`}
                                                >
                                                    {statusBadge.label}
                                                </span>
                                                <span
                                                    className={`severity-badge ${severityBadge.className}`}
                                                >
                                                    {severityBadge.label}
                                                </span>
                                            </div>
                                            <span className="report-date">
                                                {formatDate(report.created_at)}
                                            </span>
                                        </div>

                                        <div className="report-body">
                                            <div className="report-info">
                                                <div className="info-row">
                                                    <span className="info-label">Raporlayan:</span>
                                                    <span className="info-value">
                                                        👤 {report.reporter_username}
                                                    </span>
                                                </div>
                                                <div className="info-row">
                                                    <span className="info-label">Raporlanan:</span>
                                                    <span className="info-value">
                                                        ⚠️ {report.reported_user_username}
                                                    </span>
                                                </div>
                                                {report.message_content && (
                                                    <div className="info-row">
                                                        <span className="info-label">Mesaj:</span>
                                                        <div className="message-preview">
                                                            {report.message_content}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {report.description && (
                                                <div className="report-description">
                                                    <strong>{t('admin.descriptionColon', 'Description:')}</strong>
                                                    <p>{report.description}</p>
                                                </div>
                                            )}
                                        </div>

                                        {report.status === 'pending' ? (
                                            <div className="report-actions">
                                                <button
                                                    aria-label={t('admin.banUser')}
                                                    className="action-btn ban"
                                                    onClick={() => {
                                                        const reason = prompt('Banma sebebi:');
                                                        if (reason)
                                                            handleReport(report.id, 'ban', reason);
                                                    }}
                                                    title={t('moderation.banUser', 'Ban User')}
                                                >
                                                    🚫 Banla
                                                </button>
                                                <button
                                                    aria-label={t('admin.warnUser')}
                                                    className="action-btn warn"
                                                    onClick={() =>
                                                        handleReport(
                                                            report.id,
                                                            'warn',
                                                            'Warning issued'
                                                        )
                                                    }
                                                    title={t('moderation.warnUser', 'Warn User')}
                                                >
                                                    ⚠️ Uyar
                                                </button>
                                                <button
                                                    aria-label={t('admin.deleteMessage')}
                                                    className="action-btn delete"
                                                    onClick={() =>
                                                        handleReport(
                                                            report.id,
                                                            'delete_message',
                                                            'Message deleted'
                                                        )
                                                    }
                                                    title={t('common.deleteMessage', 'Delete Message')}
                                                >
                                                    {t('reports.deleteMsg','🗑️ Delete Message')}
                                                </button>
                                                <button
                                                    aria-label={t('admin.rejectReport')}
                                                    className="action-btn dismiss"
                                                    onClick={() =>
                                                        handleReport(
                                                            report.id,
                                                            'dismiss',
                                                            'Invalid report'
                                                        )
                                                    }
                                                    title="Raporu Reddet"
                                                >
                                                    ✕ Reddet
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="report-resolution">
                                                <span className="resolution-label">{t('admin.resolution', 'Resolution:')}</span>
                                                <span className="resolution-value">
                                                    {getActionLabel(report.resolution)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

ReportsPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default ReportsPanel;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/SecurityAlertsPanel.js - Security Alerts Dashboard
import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import PropTypes from 'prop-types';
import {
    FaExclamationTriangle,
    FaTimes,
    FaShieldAlt,
    FaCheckCircle,
    FaBan,
    FaEye,
    FaFilter,
    FaClock,
    FaUser,
    FaGlobe,
    FaBell,
    FaSearch,
    FaSync,
    FaHistory,
    FaLock,
    FaUnlock,
    FaFire,
} from 'react-icons/fa';
import toast from '../../utils/toast';
import useModalA11y from '../../hooks/useModalA11y';
import './SecurityAlertsPanel.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const SecurityAlertsPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'unresolved', 'resolved', 'critical'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        unresolved: 0,
        critical: 0,
        resolved_today: 0,
    });

    const severityLevels = {
        critical: { label: 'Kritik', color: '#f23f42', icon: <FaFire /> },
        high: { label: 'High', color: '#f97316', icon: <FaExclamationTriangle /> },
        medium: { label: 'Orta', color: '#f59e0b', icon: <FaBell /> },
        low: { label: 'Low', color: '#3b82f6', icon: <FaShieldAlt /> },
    };

    const alertTypes = {
        brute_force: t('ui.brute_force_tuedirisi'),
        suspicious_login: t('ui.supheli_entry'),
        unusual_activity: t('ui.olagandisi_aktivite'),
        permission_abuse: 'Yetki Suistimali',
        spam_detected: t('ui.spam_algilandi'),
        raid_attempt: 'Raid Entryimi',
        api_abuse: 'API Suistimali',
        unauthorized_access: 'Unauthorized Access Attempt',
    };

    useEffect(() => {
        fetchAlerts();
        fetchStats();
        const interval = setInterval(fetchAlerts, 30000); // Her 30 saniyede daycelle
        return () => clearInterval(interval);
    }, [serverId]);

    const fetchAlerts = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/security/alerts/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setAlerts(data.alerts || []);
            }
        } catch (error) {
            logger.error('Fetch alerts error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/security/alerts/stats/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            logger.error('Fetch stats error:', error);
        }
    };

    const resolveAlert = async (alertId, resolution) => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/security/alerts/${alertId}/resolve/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resolution }),
            });

            if (response.ok) {
                toast.success(t('ui.uyari_cozumlendi'));
                setAlerts((prev) =>
                    prev.map((a) => (a.id === alertId ? { ...a, resolved: true, resolution } : a))
                );
                setSelectedAlert(null);
                fetchStats();
            }
        } catch (error) {
            logger.error('Resolve alert error:', error);
        }
    };

    const dismissAlert = async (alertId) => {
        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/security/alerts/${alertId}/dismiss/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                toast.success(t('ui.uyari_yok_saildi'));
                setAlerts((prev) => prev.filter((a) => a.id !== alertId));
            }
        } catch (error) {
            logger.error('Dismiss alert error:', error);
        }
    };

    const filteredAlerts = useMemo(
        () =>
            alerts.filter((alert) => {
                const matchesSearch =
                    alert.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    alert.source_ip?.includes(searchQuery) ||
                    alert.user_info?.username?.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesFilter =
                    filter === 'all' ||
                    (filter === 'unresolved' && !alert.resolved) ||
                    (filter === 'resolved' && alert.resolved) ||
                    (filter === 'critical' && alert.severity === 'critical');

                return matchesSearch && matchesFilter;
            }),
        [alerts, searchQuery, filter]
    );

    return (
        <div
            className="security-alerts-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="security-alerts-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="panel-header">
                    <h2>
                        <FaExclamationTriangle /> {t('secAlerts.title', 'Security Alerts')}
                    </h2>
                    <div className="header-actions">
                        <button
                            aria-label={t('common.refresh', 'Refresh')}
                            className="refresh-btn"
                            onClick={fetchAlerts}
                        >
                            <FaSync />
                        </button>
                        <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="stats-bar">
                    <div className="stat-item">
                        <span className="stat-value">{stats.total}</span>
                        <span className="stat-label">Toplam</span>
                    </div>
                    <div className="stat-item danger">
                        <span className="stat-value">{stats.unresolved}</span>
                        <span className="stat-label">Bekleyen</span>
                    </div>
                    <div className="stat-item critical">
                        <span className="stat-value">{stats.critical}</span>
                        <span className="stat-label">Kritik</span>
                    </div>
                    <div className="stat-item success">
                        <span className="stat-value">{stats.resolved_today}</span>
                        <span className="stat-label">{t('secAlerts.todayResolved', 'Resolved Today')}</span>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder={t('ui.uyari_ip_or_kullanici_search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-buttons">
                        {['all', 'unresolved', 'resolved', 'critical'].map((f) => (
                            <button
                                key={f}
                                aria-label={t('secAlerts.filterBtn', 'Filter: {{f}}', { f })}
                            >
                                {f === 'all' && 'All'}
                                {f === 'unresolved' && 'Bekleyen'}
                                {f === 'resolved' && t('ui.cozulen')}
                                {f === 'critical' && 'Kritik'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">{t('common.loading')}</div>
                    ) : filteredAlerts.length === 0 ? (
                        <div className="empty-state">
                            <FaShieldAlt />
                            <p>{t('secAlerts.noAlerts', 'No security alerts found')}</p>
                            <span>{t('secAlerts.systemSafe', 'Your system appears secure')}</span>
                        </div>
                    ) : (
                        <div className="alerts-list">
                            {filteredAlerts.map((alert) => (
                                <AlertCard
                                    key={alert.id}
                                    alert={alert}
                                    severityLevels={severityLevels}
                                    alertTypes={alertTypes}
                                    onView={() => setSelectedAlert(alert)}
                                    onDismiss={() => dismissAlert(alert.id)}
                                    onResolve={(resolution) => resolveAlert(alert.id, resolution)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {selectedAlert && (
                    <AlertDetailModal
                        alert={selectedAlert}
                        severityLevels={severityLevels}
                        alertTypes={alertTypes}
                        onClose={() => setSelectedAlert(null)}
                        onResolve={(resolution) => resolveAlert(selectedAlert.id, resolution)}
                    />
                )}
            </div>
        </div>
    );
};

// Alert Card Component
const AlertCard = ({ alert, severityLevels, alertTypes, onView, onDismiss, onResolve }) => {
    const { t } = useTranslation();
    const severity = severityLevels[alert.severity] || severityLevels.low;

    return (
        <div className={`alert-card ${alert.severity} ${alert.resolved ? 'resolved' : ''}`}>
            <div className="alert-severity" style={{ background: severity.color }}>
                {severity.icon}
            </div>

            <div className="alert-content">
                <div className="alert-header">
                    <span className="alert-type">{alertTypes[alert.type] || alert.type}</span>
                    <span className="alert-time">
                        <FaClock /> {new Date(alert.created_at).toLocaleString('tr-TR')}
                    </span>
                </div>

                <p className="alert-message">{alert.message}</p>

                <div className="alert-meta">
                    {alert.source_ip && (
                        <span>
                            <FaGlobe /> {alert.source_ip}
                        </span>
                    )}
                    {alert.user_info && (
                        <span>
                            <FaUser /> {alert.user_info.username}
                        </span>
                    )}
                    {alert.resolved && (
                        <span className="resolved-badge">
                            <FaCheckCircle /> {t('secAlerts.resolved', 'Resolved')}
                        </span>
                    )}
                </div>
            </div>

            <div className="alert-actions">
                <button aria-label={t('common.view', 'View')} className="view-btn" onClick={onView}>
                    <FaEye />
                </button>
                {!alert.resolved && (
                    <>
                        <button
                            aria-label={t('secAlerts.quickResolve', 'Quick resolve')}
                        >
                            <FaCheckCircle />
                        </button>
                        <button aria-label={t('common.dismiss', 'Dismiss')} className="dismiss-btn" onClick={onDismiss}>
                            <FaTimes />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// Alert Detail Modal
const AlertDetailModal = ({ alert, severityLevels, alertTypes, onClose, onResolve }) => {
    const { t } = useTranslation();
    const [resolution, setResolution] = useState('');
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: !!alert,
        label: 'Security Alert Detail',
    });
    const severity = severityLevels[alert.severity] || severityLevels.low;

    const quickResolutions = [
        'False positive - Normal aktivite',
        t('ui.user_uyarildi'),
        'IP blocked',
        t('ui.hesap_askiya_alindi'),
        t('ui.incelendi_aksiyon_gerekmiyor'),
    ];

    return (
        <div className="modal-overlay" {...overlayProps}>
            <div className="alert-detail-modal" {...dialogProps}>
                <div className="modal-header" style={{ borderLeftColor: severity.color }}>
                    <div className="severity-badge" style={{ background: severity.color }}>
                        {severity.icon} {severity.label}
                    </div>
                    <button aria-label={t('common.close', 'Close')} className="close-modal" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="modal-content">
                    <h3>{alertTypes[alert.type] || alert.type}</h3>
                    <p className="detail-message">{alert.message}</p>

                    <div className="detail-section">
                        <h4>Detaylar</h4>
                        <div className="detail-grid">
                            <div className="detail-item">
                                <label>
                                    <FaClock /> Zaman
                                </label>
                                <span>{new Date(alert.created_at).toLocaleString('tr-TR')}</span>
                            </div>
                            {alert.source_ip && (
                                <div className="detail-item">
                                    <label>
                                        <FaGlobe /> Kaynak IP
                                    </label>
                                    <span className="mono">{alert.source_ip}</span>
                                </div>
                            )}
                            {alert.user_info && (
                                <>
                                    <div className="detail-item">
                                        <label>
                                            <FaUser /> User
                                        </label>
                                        <span>{alert.user_info.username}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>{t('secAlerts.userId', 'User ID')}</label>
                                        <span className="mono">{alert.user_info.id}</span>
                                    </div>
                                </>
                            )}
                            {alert.location && (
                                <div className="detail-item">
                                    <label>Konum</label>
                                    <span>{alert.location}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {alert.additional_data && (
                        <div className="detail-section">
                            <h4>Ek Veriler</h4>
                            <pre className="json-data">
                                {JSON.stringify(alert.additional_data, null, 2)}
                            </pre>
                        </div>
                    )}

                    {!alert.resolved && (
                        <div className="resolution-section">
                            <h4>{t('secAlerts.resolution', 'Resolution')}</h4>
                            <div className="quick-resolutions">
                                {quickResolutions.map((res, idx) => (
                                    <button
                                        key={idx}
                                        aria-label={t('secAlerts.quickResolution', '{{res}}', { res })}
                                        onClick={() => setResolution(res)}
                                    >
                                        {res}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                placeholder={t('ui.or_write_custom_resolution_note')}
                                rows="3"
                            />
                        </div>
                    )}
                </div>

                <div className="modal-actions">
                    <button aria-label={t('common.close', 'Close')} className="cancel-btn" onClick={onClose}>
                        {t('common.close')}
                    </button>
                    {!alert.resolved && (
                        <button
                            aria-label={t('secAlerts.resolve', 'Resolve')}
                            disabled={!resolution}
                        >
                            <FaCheckCircle /> {t('secAlerts.resolve', 'Resolve')}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

SecurityAlertsPanel.propTypes = {
    serverId: PropTypes.string,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};

AlertCard.propTypes = {
    alert: PropTypes.object,
    severityLevels: PropTypes.array,
    alertTypes: PropTypes.array,
    onView: PropTypes.func,
    onDismiss: PropTypes.func,
    onResolve: PropTypes.func,
};

AlertDetailModal.propTypes = {
    alert: PropTypes.object,
    severityLevels: PropTypes.array,
    alertTypes: PropTypes.array,
    onClose: PropTypes.func,
    onResolve: PropTypes.func,
};

export default memo(SecurityAlertsPanel);

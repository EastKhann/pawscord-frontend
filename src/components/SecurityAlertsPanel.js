// frontend/src/components/SecurityAlertsPanel.js - Security Alerts Dashboard
import React, { useState, useEffect } from 'react';
import {
    FaExclamationTriangle, FaTimes, FaShieldAlt, FaCheckCircle,
    FaBan, FaEye, FaFilter, FaClock, FaUser, FaGlobe, FaBell,
    FaSearch, FaSync, FaHistory, FaLock, FaUnlock, FaFire
} from 'react-icons/fa';
import toast from '../utils/toast';
import './SecurityAlertsPanel.css';

const SecurityAlertsPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // 'all', 'unresolved', 'resolved', 'critical'
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedAlert, setSelectedAlert] = useState(null);
    const [stats, setStats] = useState({
        total: 0,
        unresolved: 0,
        critical: 0,
        resolved_today: 0
    });

    const severityLevels = {
        critical: { label: 'Kritik', color: '#ef4444', icon: <FaFire /> },
        high: { label: 'Yüksek', color: '#f97316', icon: <FaExclamationTriangle /> },
        medium: { label: 'Orta', color: '#f59e0b', icon: <FaBell /> },
        low: { label: 'Düşük', color: '#3b82f6', icon: <FaShieldAlt /> }
    };

    const alertTypes = {
        brute_force: 'Brute Force Saldırısı',
        suspicious_login: 'Şüpheli Giriş',
        unusual_activity: 'Olağandışı Aktivite',
        permission_abuse: 'Yetki Suistimali',
        spam_detected: 'Spam Algılandı',
        raid_attempt: 'Raid Girişimi',
        api_abuse: 'API Suistimali',
        unauthorized_access: 'Yetkisiz Erişim Denemesi'
    };

    useEffect(() => {
        fetchAlerts();
        fetchStats();
        const interval = setInterval(fetchAlerts, 30000); // Her 30 saniyede güncelle
        return () => clearInterval(interval);
    }, [serverId]);

    const fetchAlerts = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/security/alerts/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAlerts(data.alerts || []);
            }
        } catch (error) {
            console.error('Fetch alerts error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/security/alerts/stats/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Fetch stats error:', error);
        }
    };

    const resolveAlert = async (alertId, resolution) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/security/alerts/${alertId}/resolve/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ resolution })
            });

            if (response.ok) {
                toast.success('✅ Uyarı çözümlendi');
                setAlerts(prev => prev.map(a =>
                    a.id === alertId ? { ...a, resolved: true, resolution } : a
                ));
                setSelectedAlert(null);
                fetchStats();
            }
        } catch (error) {
            console.error('Resolve alert error:', error);
        }
    };

    const dismissAlert = async (alertId) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/security/alerts/${alertId}/dismiss/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('Uyarı yok sayıldı');
                setAlerts(prev => prev.filter(a => a.id !== alertId));
            }
        } catch (error) {
            console.error('Dismiss alert error:', error);
        }
    };

    const filteredAlerts = alerts.filter(alert => {
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
    });

    return (
        <div className="security-alerts-overlay" onClick={onClose}>
            <div className="security-alerts-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaExclamationTriangle /> Güvenlik Uyarıları</h2>
                    <div className="header-actions">
                        <button className="refresh-btn" onClick={fetchAlerts}>
                            <FaSync />
                        </button>
                        <button className="close-btn" onClick={onClose}>
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
                        <span className="stat-label">Bugün Çözülen</span>
                    </div>
                </div>

                <div className="toolbar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Uyarı, IP veya kullanıcı ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="filter-buttons">
                        {['all', 'unresolved', 'resolved', 'critical'].map(f => (
                            <button
                                key={f}
                                className={`filter-btn ${filter === f ? 'active' : ''}`}
                                onClick={() => setFilter(f)}
                            >
                                {f === 'all' && 'Tümü'}
                                {f === 'unresolved' && 'Bekleyen'}
                                {f === 'resolved' && 'Çözülen'}
                                {f === 'critical' && 'Kritik'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredAlerts.length === 0 ? (
                        <div className="empty-state">
                            <FaShieldAlt />
                            <p>Güvenlik uyarısı bulunmuyor</p>
                            <span>Sisteminiz güvende görünüyor</span>
                        </div>
                    ) : (
                        <div className="alerts-list">
                            {filteredAlerts.map(alert => (
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
    const severity = severityLevels[alert.severity] || severityLevels.low;

    return (
        <div className={`alert-card ${alert.severity} ${alert.resolved ? 'resolved' : ''}`}>
            <div className="alert-severity" style={{ background: severity.color }}>
                {severity.icon}
            </div>

            <div className="alert-content">
                <div className="alert-header">
                    <span className="alert-type">
                        {alertTypes[alert.type] || alert.type}
                    </span>
                    <span className="alert-time">
                        <FaClock /> {new Date(alert.created_at).toLocaleString('tr-TR')}
                    </span>
                </div>

                <p className="alert-message">{alert.message}</p>

                <div className="alert-meta">
                    {alert.source_ip && (
                        <span><FaGlobe /> {alert.source_ip}</span>
                    )}
                    {alert.user_info && (
                        <span><FaUser /> {alert.user_info.username}</span>
                    )}
                    {alert.resolved && (
                        <span className="resolved-badge">
                            <FaCheckCircle /> Çözümlendi
                        </span>
                    )}
                </div>
            </div>

            <div className="alert-actions">
                <button className="view-btn" onClick={onView}>
                    <FaEye />
                </button>
                {!alert.resolved && (
                    <>
                        <button
                            className="resolve-btn"
                            onClick={() => onResolve('Hızlı çözüm')}
                        >
                            <FaCheckCircle />
                        </button>
                        <button className="dismiss-btn" onClick={onDismiss}>
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
    const [resolution, setResolution] = useState('');
    const severity = severityLevels[alert.severity] || severityLevels.low;

    const quickResolutions = [
        'False positive - Normal aktivite',
        'Kullanıcı uyarıldı',
        'IP engellendi',
        'Hesap askıya alındı',
        'İncelendi - Aksiyon gerekmiyor'
    ];

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="alert-detail-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header" style={{ borderLeftColor: severity.color }}>
                    <div className="severity-badge" style={{ background: severity.color }}>
                        {severity.icon} {severity.label}
                    </div>
                    <button className="close-modal" onClick={onClose}>
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
                                <label><FaClock /> Zaman</label>
                                <span>{new Date(alert.created_at).toLocaleString('tr-TR')}</span>
                            </div>
                            {alert.source_ip && (
                                <div className="detail-item">
                                    <label><FaGlobe /> Kaynak IP</label>
                                    <span className="mono">{alert.source_ip}</span>
                                </div>
                            )}
                            {alert.user_info && (
                                <>
                                    <div className="detail-item">
                                        <label><FaUser /> Kullanıcı</label>
                                        <span>{alert.user_info.username}</span>
                                    </div>
                                    <div className="detail-item">
                                        <label>Kullanıcı ID</label>
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
                            <h4>Çözüm</h4>
                            <div className="quick-resolutions">
                                {quickResolutions.map((res, idx) => (
                                    <button
                                        key={idx}
                                        className={`quick-res-btn ${resolution === res ? 'active' : ''}`}
                                        onClick={() => setResolution(res)}
                                    >
                                        {res}
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={resolution}
                                onChange={(e) => setResolution(e.target.value)}
                                placeholder="Veya özel bir çözüm notu yazın..."
                                rows="3"
                            />
                        </div>
                    )}
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>Kapat</button>
                    {!alert.resolved && (
                        <button
                            className="resolve-btn"
                            onClick={() => onResolve(resolution || 'Çözümlendi')}
                            disabled={!resolution}
                        >
                            <FaCheckCircle /> Çözümle
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SecurityAlertsPanel;

// frontend/src/components/GeoLocationLogsPanel.js - User Location Activity Logs
import React, { useState, useEffect } from 'react';
import {
    FaGlobeAmericas, FaTimes, FaSearch, FaFilter, FaMapMarkerAlt,
    FaUser, FaClock, FaExclamationTriangle, FaDownload, FaEye,
    FaShieldAlt, FaBan, FaFlag, FaChartBar, FaCalendar
} from 'react-icons/fa';
import toast from '../utils/toast';
import './GeoLocationLogsPanel.css';
import confirmDialog from '../utils/confirmDialog';

const GeoLocationLogsPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [activeView, setActiveView] = useState('logs'); // 'logs', 'map', 'stats', 'alerts'
    const [logs, setLogs] = useState([]);
    const [stats, setStats] = useState(null);
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: '',
        country: 'all',
        dateRange: '7d',
        suspicious: false
    });
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        fetchLogs();
        fetchStats();
        fetchAlerts();
    }, [serverId, filters.dateRange]);

    const fetchLogs = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(
                `${apiBaseUrl}/moderation/${serverId}/geo-logs/?range=${filters.dateRange}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (response.ok) {
                const data = await response.json();
                setLogs(data.logs || []);

                // Extract unique countries
                const uniqueCountries = [...new Set(data.logs.map(l => l.country).filter(Boolean))];
                setCountries(uniqueCountries);
            }
        } catch (error) {
            console.error('Fetch geo logs error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(
                `${apiBaseUrl}/moderation/${serverId}/geo-stats/`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (response.ok) {
                const data = await response.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Fetch geo stats error:', error);
        }
    };

    const fetchAlerts = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(
                `${apiBaseUrl}/moderation/${serverId}/geo-alerts/`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );
            if (response.ok) {
                const data = await response.json();
                setAlerts(data.alerts || []);
            }
        } catch (error) {
            console.error('Fetch geo alerts error:', error);
        }
    };

    const handleBlockCountry = async (countryCode) => {
        if (!await confirmDialog(`${countryCode} ülkesini engellemek istiyor musunuz?`)) return;

        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/${serverId}/block-country/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ country_code: countryCode })
            });

            if (response.ok) {
                toast.success(`🚫 ${countryCode} engellendi`);
            }
        } catch (error) {
            console.error('Block country error:', error);
        }
    };

    const handleExportLogs = () => {
        const exportData = {
            server_id: serverId,
            exported_at: new Date().toISOString(),
            date_range: filters.dateRange,
            logs: filteredLogs
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `geo_logs_${serverId}_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('📥 Loglar indirildi');
    };

    const filteredLogs = logs.filter(log => {
        const matchesSearch = !filters.search ||
            log.username?.toLowerCase().includes(filters.search.toLowerCase()) ||
            log.ip_address?.includes(filters.search) ||
            log.city?.toLowerCase().includes(filters.search.toLowerCase());

        const matchesCountry = filters.country === 'all' || log.country === filters.country;
        const matchesSuspicious = !filters.suspicious || log.is_suspicious;

        return matchesSearch && matchesCountry && matchesSuspicious;
    });

    const getSuspiciousReason = (log) => {
        if (!log.is_suspicious) return null;
        if (log.vpn_detected) return 'VPN/Proxy Tespit Edildi';
        if (log.location_change) return 'Hızlı Konum Değişikliği';
        if (log.new_country) return 'Yeni Ülke';
        return 'Şüpheli Aktivite';
    };

    return (
        <div className="geo-logs-overlay" onClick={onClose}>
            <div className="geo-logs-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaGlobeAmericas /> Konum Aktivite Logları</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-tabs">
                    <button
                        className={`tab ${activeView === 'logs' ? 'active' : ''}`}
                        onClick={() => setActiveView('logs')}
                    >
                        <FaMapMarkerAlt /> Loglar
                    </button>
                    <button
                        className={`tab ${activeView === 'stats' ? 'active' : ''}`}
                        onClick={() => setActiveView('stats')}
                    >
                        <FaChartBar /> İstatistikler
                    </button>
                    <button
                        className={`tab ${activeView === 'alerts' ? 'active' : ''}`}
                        onClick={() => setActiveView('alerts')}
                    >
                        <FaExclamationTriangle /> Uyarılar
                        {alerts.length > 0 && <span className="badge">{alerts.length}</span>}
                    </button>
                </div>

                <div className="panel-content">
                    {activeView === 'logs' && (
                        <>
                            <div className="filters-bar">
                                <div className="search-box">
                                    <FaSearch />
                                    <input
                                        type="text"
                                        placeholder="Kullanıcı, IP veya şehir ara..."
                                        value={filters.search}
                                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                    />
                                </div>

                                <div className="filter-group">
                                    <select
                                        value={filters.country}
                                        onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                                    >
                                        <option value="all">Tüm Ülkeler</option>
                                        {countries.map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>

                                    <select
                                        value={filters.dateRange}
                                        onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                                    >
                                        <option value="24h">Son 24 Saat</option>
                                        <option value="7d">Son 7 Gün</option>
                                        <option value="30d">Son 30 Gün</option>
                                        <option value="all">Tümü</option>
                                    </select>

                                    <button
                                        className={`suspicious-filter ${filters.suspicious ? 'active' : ''}`}
                                        onClick={() => setFilters({ ...filters, suspicious: !filters.suspicious })}
                                    >
                                        <FaExclamationTriangle /> Şüpheli
                                    </button>
                                </div>

                                <button className="export-btn" onClick={handleExportLogs}>
                                    <FaDownload /> Dışa Aktar
                                </button>
                            </div>

                            {loading ? (
                                <div className="loading">Yükleniyor...</div>
                            ) : filteredLogs.length > 0 ? (
                                <div className="logs-list">
                                    {filteredLogs.map((log, idx) => (
                                        <div
                                            key={idx}
                                            className={`log-item ${log.is_suspicious ? 'suspicious' : ''}`}
                                        >
                                            <div className="log-header">
                                                <div className="user-info">
                                                    <img
                                                        src={log.avatar || '/default-avatar.png'}
                                                        alt={log.username}
                                                        className="avatar"
                                                    />
                                                    <span className="username">{log.username}</span>
                                                </div>
                                                <span className="log-time">
                                                    <FaClock /> {new Date(log.timestamp).toLocaleString('tr-TR')}
                                                </span>
                                            </div>

                                            <div className="log-location">
                                                <div className="location-main">
                                                    <span className="flag">{log.country_flag || '🌍'}</span>
                                                    <span className="country">{log.country}</span>
                                                    {log.city && <span className="city">{log.city}</span>}
                                                </div>
                                                <span className="ip-address">{log.ip_address || 'IP Gizli'}</span>
                                            </div>

                                            {log.is_suspicious && (
                                                <div className="suspicious-alert">
                                                    <FaExclamationTriangle />
                                                    <span>{getSuspiciousReason(log)}</span>
                                                    {log.vpn_detected && (
                                                        <span className="vpn-badge">VPN</span>
                                                    )}
                                                </div>
                                            )}

                                            <div className="log-actions">
                                                <button
                                                    className="action-btn view"
                                                    title="Kullanıcı Detayı"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    className="action-btn block"
                                                    onClick={() => handleBlockCountry(log.country_code)}
                                                    title="Ülkeyi Engelle"
                                                >
                                                    <FaBan />
                                                </button>
                                                <button
                                                    className="action-btn flag"
                                                    title="Raporla"
                                                >
                                                    <FaFlag />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-logs">
                                    <FaGlobeAmericas className="empty-icon" />
                                    <p>Konum logu bulunamadı</p>
                                </div>
                            )}
                        </>
                    )}

                    {activeView === 'stats' && stats && (
                        <div className="stats-view">
                            <div className="stats-cards">
                                <div className="stat-card">
                                    <div className="stat-icon"><FaUser /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.unique_users || 0}</span>
                                        <span className="stat-label">Benzersiz Kullanıcı</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon"><FaGlobeAmericas /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.unique_countries || 0}</span>
                                        <span className="stat-label">Farklı Ülke</span>
                                    </div>
                                </div>
                                <div className="stat-card warning">
                                    <div className="stat-icon"><FaExclamationTriangle /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.suspicious_count || 0}</span>
                                        <span className="stat-label">Şüpheli Aktivite</span>
                                    </div>
                                </div>
                                <div className="stat-card danger">
                                    <div className="stat-icon"><FaShieldAlt /></div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.vpn_count || 0}</span>
                                        <span className="stat-label">VPN Tespit</span>
                                    </div>
                                </div>
                            </div>

                            <div className="top-countries">
                                <h3>En Çok Erişilen Ülkeler</h3>
                                <div className="countries-list">
                                    {(stats.top_countries || []).map((country, idx) => (
                                        <div key={idx} className="country-item">
                                            <span className="rank">#{idx + 1}</span>
                                            <span className="flag">{country.flag || '🌍'}</span>
                                            <span className="name">{country.name}</span>
                                            <span className="count">{country.count} erişim</span>
                                            <div
                                                className="bar"
                                                style={{
                                                    width: `${(country.count / (stats.top_countries[0]?.count || 1)) * 100}%`
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeView === 'alerts' && (
                        <div className="alerts-view">
                            {alerts.length > 0 ? (
                                <div className="alerts-list">
                                    {alerts.map((alert, idx) => (
                                        <div key={idx} className={`alert-item ${alert.severity}`}>
                                            <div className="alert-icon">
                                                <FaExclamationTriangle />
                                            </div>
                                            <div className="alert-content">
                                                <h4>{alert.title}</h4>
                                                <p>{alert.description}</p>
                                                <div className="alert-meta">
                                                    <span className="alert-time">
                                                        <FaClock /> {new Date(alert.timestamp).toLocaleString('tr-TR')}
                                                    </span>
                                                    <span className="alert-user">
                                                        <FaUser /> {alert.username}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="alert-actions">
                                                <button className="dismiss-btn">Kapat</button>
                                                <button className="action-btn">İşlem Yap</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-alerts">
                                    <FaShieldAlt className="empty-icon" />
                                    <p>Aktif uyarı bulunmuyor</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GeoLocationLogsPanel;

// frontend/src/components/PresenceHistoryPanel.js - User Online/Presence History
import React, { useState, useEffect } from 'react';
import {
    FaCircle, FaTimes, FaSearch, FaUser, FaClock, FaCalendarAlt,
    FaChartLine, FaDesktop, FaMobileAlt, FaGlobe, FaFilter,
    FaGamepad, FaHeadphones, FaEye, FaSort, FaDownload
} from 'react-icons/fa';
import toast from '../utils/toast';
import './PresenceHistoryPanel.css';

const PresenceHistoryPanel = ({ apiBaseUrl, userId, serverId, onClose }) => {
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({
        totalOnlineTime: 0,
        averageSession: 0,
        longestSession: 0,
        mostActiveDay: null,
        currentStreak: 0
    });
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('week'); // 'today', 'week', 'month', 'all'
    const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'online', 'idle', 'dnd', 'offline'
    const [viewMode, setViewMode] = useState('timeline'); // 'timeline', 'calendar', 'stats'
    const [selectedUser, setSelectedUser] = useState(userId);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (serverId) {
            fetchServerMembers();
        }
        fetchPresenceHistory();
        fetchStats();
    }, [dateRange, selectedUser]);

    const fetchServerMembers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/members/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data.members || data || []);
            }
        } catch (error) {
            console.error('Fetch members error:', error);
        }
    };

    const fetchPresenceHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = selectedUser
                ? `${apiBaseUrl}/users/${selectedUser}/presence/history/?range=${dateRange}`
                : `${apiBaseUrl}/presence/history/?range=${dateRange}`;

            const response = await fetch(endpoint, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setHistory(data.history || data || []);
            }
        } catch (error) {
            console.error('Fetch presence history error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = selectedUser
                ? `${apiBaseUrl}/users/${selectedUser}/presence/stats/?range=${dateRange}`
                : `${apiBaseUrl}/presence/stats/?range=${dateRange}`;

            const response = await fetch(endpoint, {
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

    const exportHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/presence/export/?user=${selectedUser || ''}&range=${dateRange}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `presence-history-${dateRange}.csv`;
                a.click();
                toast.success('📊 Geçmiş dışa aktarıldı');
            }
        } catch (error) {
            console.error('Export error:', error);
        }
    };

    const formatDuration = (minutes) => {
        if (minutes < 60) return `${minutes} dk`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours < 24) return `${hours}s ${mins}dk`;
        const days = Math.floor(hours / 24);
        return `${days}g ${hours % 24}s`;
    };

    const filteredHistory = history.filter(h =>
        statusFilter === 'all' || h.status === statusFilter
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'online': return '#00d26a';
            case 'idle': return '#f39c12';
            case 'dnd': return '#ff4757';
            case 'offline': return '#747f8d';
            default: return '#747f8d';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'online': return 'Çevrimiçi';
            case 'idle': return 'Boşta';
            case 'dnd': return 'Rahatsız Etmeyin';
            case 'offline': return 'Çevrimdışı';
            default: return status;
        }
    };

    return (
        <div className="presence-history-overlay" onClick={onClose}>
            <div className="presence-history-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaCircle className="status-icon online" /> Presence Geçmişi</h2>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <FaClock className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{formatDuration(stats.totalOnlineTime)}</span>
                            <span className="stat-label">Toplam Çevrimiçi</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FaChartLine className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{formatDuration(stats.averageSession)}</span>
                            <span className="stat-label">Ort. Oturum</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FaGamepad className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{formatDuration(stats.longestSession)}</span>
                            <span className="stat-label">En Uzun Oturum</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <FaCalendarAlt className="stat-icon" />
                        <div className="stat-info">
                            <span className="stat-value">{stats.currentStreak}</span>
                            <span className="stat-label">Gün Serisi</span>
                        </div>
                    </div>
                </div>

                <div className="toolbar">
                    {serverId && users.length > 0 && (
                        <div className="user-selector">
                            <label><FaUser /></label>
                            <select
                                value={selectedUser || ''}
                                onChange={(e) => setSelectedUser(e.target.value || null)}
                            >
                                <option value="">Tüm Kullanıcılar</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>
                                        {user.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="date-filter">
                        <label><FaCalendarAlt /></label>
                        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                            <option value="today">Bugün</option>
                            <option value="week">Bu Hafta</option>
                            <option value="month">Bu Ay</option>
                            <option value="all">Tümü</option>
                        </select>
                    </div>

                    <div className="status-filter">
                        <label><FaFilter /></label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">Tüm Durumlar</option>
                            <option value="online">Çevrimiçi</option>
                            <option value="idle">Boşta</option>
                            <option value="dnd">Rahatsız Etmeyin</option>
                            <option value="offline">Çevrimdışı</option>
                        </select>
                    </div>

                    <div className="view-modes">
                        <button
                            className={`view-mode ${viewMode === 'timeline' ? 'active' : ''}`}
                            onClick={() => setViewMode('timeline')}
                        >
                            Timeline
                        </button>
                        <button
                            className={`view-mode ${viewMode === 'stats' ? 'active' : ''}`}
                            onClick={() => setViewMode('stats')}
                        >
                            İstatistik
                        </button>
                    </div>

                    <button className="export-btn" onClick={exportHistory}>
                        <FaDownload /> Dışa Aktar
                    </button>
                </div>

                <div className="panel-content">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : viewMode === 'timeline' ? (
                        <TimelineView
                            history={filteredHistory}
                            getStatusColor={getStatusColor}
                            getStatusLabel={getStatusLabel}
                            formatDuration={formatDuration}
                        />
                    ) : (
                        <StatsView
                            stats={stats}
                            history={history}
                            formatDuration={formatDuration}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

// Timeline View
const TimelineView = ({ history, getStatusColor, getStatusLabel, formatDuration }) => {
    if (history.length === 0) {
        return (
            <div className="empty-state">
                <FaCircle />
                <p>Presence geçmişi bulunmuyor</p>
            </div>
        );
    }

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Group by date
    const grouped = history.reduce((acc, item) => {
        const date = formatDate(item.started_at);
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
    }, {});

    return (
        <div className="timeline-view">
            {Object.entries(grouped).map(([date, items]) => (
                <div key={date} className="timeline-day">
                    <div className="day-header">{date}</div>
                    <div className="timeline-items">
                        {items.map((item, idx) => (
                            <div key={idx} className="timeline-item">
                                <div
                                    className="status-dot"
                                    style={{ backgroundColor: getStatusColor(item.status) }}
                                />
                                <div className="item-content">
                                    <div className="item-header">
                                        <span className="status-label" style={{ color: getStatusColor(item.status) }}>
                                            {getStatusLabel(item.status)}
                                        </span>
                                        <span className="item-time">
                                            {formatTime(item.started_at)} - {item.ended_at ? formatTime(item.ended_at) : 'Şimdi'}
                                        </span>
                                    </div>
                                    <div className="item-details">
                                        {item.duration && (
                                            <span className="duration">
                                                <FaClock /> {formatDuration(item.duration)}
                                            </span>
                                        )}
                                        {item.device && (
                                            <span className="device">
                                                {item.device === 'desktop' ? <FaDesktop /> : <FaMobileAlt />}
                                                {item.device === 'desktop' ? 'Masaüstü' : 'Mobil'}
                                            </span>
                                        )}
                                        {item.activity && (
                                            <span className="activity">
                                                {item.activity.type === 'playing' ? <FaGamepad /> : <FaHeadphones />}
                                                {item.activity.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

// Stats View
const StatsView = ({ stats, history, formatDuration }) => {
    const statusCounts = history.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + (item.duration || 0);
        return acc;
    }, {});

    const total = Object.values(statusCounts).reduce((a, b) => a + b, 0) || 1;

    const statusData = [
        { status: 'online', label: 'Çevrimiçi', color: '#00d26a' },
        { status: 'idle', label: 'Boşta', color: '#f39c12' },
        { status: 'dnd', label: 'Rahatsız Etmeyin', color: '#ff4757' },
        { status: 'offline', label: 'Çevrimdışı', color: '#747f8d' }
    ];

    return (
        <div className="stats-view">
            <div className="stats-section">
                <h4>Durum Dağılımı</h4>
                <div className="status-bars">
                    {statusData.map(({ status, label, color }) => (
                        <div key={status} className="status-bar-item">
                            <div className="bar-label">
                                <FaCircle style={{ color }} />
                                <span>{label}</span>
                            </div>
                            <div className="bar-container">
                                <div
                                    className="bar-fill"
                                    style={{
                                        width: `${(statusCounts[status] || 0) / total * 100}%`,
                                        backgroundColor: color
                                    }}
                                />
                            </div>
                            <div className="bar-value">
                                <span>{formatDuration(statusCounts[status] || 0)}</span>
                                <span className="percentage">
                                    {Math.round((statusCounts[status] || 0) / total * 100)}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="stats-section">
                <h4>Aktivite Özeti</h4>
                <div className="summary-grid">
                    <div className="summary-item">
                        <span className="label">En Aktif Gün</span>
                        <span className="value">{stats.mostActiveDay || '-'}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Toplam Oturum</span>
                        <span className="value">{history.length}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">En Çok Kullanılan</span>
                        <span className="value">{stats.mostUsedDevice || 'Masaüstü'}</span>
                    </div>
                    <div className="summary-item">
                        <span className="label">Aktif Saat</span>
                        <span className="value">{stats.peakHour || '20:00 - 23:00'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PresenceHistoryPanel;

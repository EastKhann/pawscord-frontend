import { useState, useEffect } from 'react';
import {
    FaShieldAlt, FaTimes, FaSearch, FaFilter, FaCalendarAlt,
    FaBan, FaUserSlash, FaVolumeMute, FaExclamationTriangle,
    FaTrash, FaEdit, FaUndo, FaUserShield, FaEye, FaDownload,
    FaChevronDown, FaChevronUp, FaHashtag, FaUser, FaClock,
    FaFileAlt, FaRobot, FaGavel, FaCheckCircle, FaTimesCircle,
    FaInfoCircle
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './ModerationLogsPanel.css';
import confirmDialog from '../utils/confirmDialog';

const ModerationLogsPanel = ({ serverId, onClose }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        action_type: 'all',
        moderator: '',
        target_user: '',
        date_from: '',
        date_to: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [expandedLog, setExpandedLog] = useState(null);
    const [stats, setStats] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchLogs();
        fetchStats();
    }, [serverId, filters, page]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page,
                ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v && v !== 'all'))
            });

            const response = await fetch(`/api/servers/${serverId}/moderation/logs/?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                if (page === 1) {
                    setLogs(data.logs || []);
                } else {
                    setLogs(prev => [...prev, ...(data.logs || [])]);
                }
                setHasMore(data.has_more ?? true);
            } else {
                setLogs([]);
            }
        } catch (error) {
            console.error('Error fetching moderation logs:', error);
            setLogs([]);
        }
        setLoading(false);
    };

    const fetchStats = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/moderation/stats/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                setStats((await response.json()) || emptyStats);
            } else {
                setStats(emptyStats);
            }
        } catch (error) {
            setStats(emptyStats);
        }
    };

    // Boş istatistik objesi
    const emptyStats = {
        total_actions: 0,
        this_week: 0,
        bans: 0,
        kicks: 0,
        timeouts: 0,
        warns: 0,
        mutes: 0,
        deletes: 0,
        automod_actions: 0,
        top_moderators: []
    };

    const getActionIcon = (type) => {
        const icons = {
            ban: <FaBan className="action-ban" />,
            kick: <FaUserSlash className="action-kick" />,
            timeout: <FaClock className="action-timeout" />,
            mute: <FaVolumeMute className="action-mute" />,
            warn: <FaExclamationTriangle className="action-warn" />,
            delete_messages: <FaTrash className="action-delete" />,
            automod: <FaRobot className="action-automod" />
        };
        return icons[type] || <FaGavel />;
    };

    const getActionLabel = (type) => {
        const labels = {
            ban: 'Yasaklama',
            kick: 'Sunucudan Atma',
            timeout: 'Zaman Aşımı',
            mute: 'Susturma',
            warn: 'Uyarı',
            delete_messages: 'Mesaj Silme',
            automod: 'AutoMod'
        };
        return labels[type] || type;
    };

    const handleRevertAction = async (logId) => {
        if (!await confirmDialog('Bu moderasyon eylemini geri almak istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`/api/servers/${serverId}/moderation/logs/${logId}/revert/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                toast.success('Eylem geri alındı');
                fetchLogs();
            }
        } catch (error) {
            setLogs(logs.map(log => log.id === logId ? { ...log, reverted: true } : log));
            toast.success('Eylem geri alındı');
        }
    };

    const handleExport = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/moderation/logs/export/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `moderation-logs-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                toast.success('Loglar indirildi');
            }
        } catch (error) {
            toast.error('Dışa aktarma başarısız');
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const filteredLogs = logs;

    return (
        <div className="moderation-logs-overlay" onClick={(e) => e.target.className === 'moderation-logs-overlay' && onClose()}>
            <div className="moderation-logs-panel">
                <div className="panel-header">
                    <h2><FaShieldAlt /> Moderasyon Logları</h2>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Stats Bar */}
                {stats && (
                    <div className="stats-bar">
                        <div className="stat-item">
                            <span className="stat-value">{stats.total_actions}</span>
                            <span className="stat-label">Toplam</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">{stats.this_week}</span>
                            <span className="stat-label">Bu Hafta</span>
                        </div>
                        <div className="stat-item ban">
                            <FaBan />
                            <span>{stats.bans}</span>
                        </div>
                        <div className="stat-item kick">
                            <FaUserSlash />
                            <span>{stats.kicks}</span>
                        </div>
                        <div className="stat-item timeout">
                            <FaClock />
                            <span>{stats.timeouts}</span>
                        </div>
                        <div className="stat-item warn">
                            <FaExclamationTriangle />
                            <span>{stats.warns}</span>
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="filters-section">
                    <div className="filters-header">
                        <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                            <FaFilter /> Filtreler
                            {showFilters ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        <button className="export-btn" onClick={handleExport}>
                            <FaDownload /> Dışa Aktar
                        </button>
                    </div>

                    {showFilters && (
                        <div className="filters-content">
                            <div className="filter-group">
                                <label>Eylem Türü</label>
                                <select
                                    value={filters.action_type}
                                    onChange={(e) => { setFilters({ ...filters, action_type: e.target.value }); setPage(1); }}
                                >
                                    <option value="all">Tümü</option>
                                    <option value="ban">Yasaklama</option>
                                    <option value="kick">Atma</option>
                                    <option value="timeout">Zaman Aşımı</option>
                                    <option value="mute">Susturma</option>
                                    <option value="warn">Uyarı</option>
                                    <option value="delete_messages">Mesaj Silme</option>
                                    <option value="automod">AutoMod</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label>Moderatör</label>
                                <input
                                    type="text"
                                    placeholder="Kullanıcı adı"
                                    value={filters.moderator}
                                    onChange={(e) => { setFilters({ ...filters, moderator: e.target.value }); setPage(1); }}
                                />
                            </div>
                            <div className="filter-group">
                                <label>Hedef Kullanıcı</label>
                                <input
                                    type="text"
                                    placeholder="Kullanıcı adı"
                                    value={filters.target_user}
                                    onChange={(e) => { setFilters({ ...filters, target_user: e.target.value }); setPage(1); }}
                                />
                            </div>
                            <div className="filter-group">
                                <label>Başlangıç</label>
                                <input
                                    type="date"
                                    value={filters.date_from}
                                    onChange={(e) => { setFilters({ ...filters, date_from: e.target.value }); setPage(1); }}
                                />
                            </div>
                            <div className="filter-group">
                                <label>Bitiş</label>
                                <input
                                    type="date"
                                    value={filters.date_to}
                                    onChange={(e) => { setFilters({ ...filters, date_to: e.target.value }); setPage(1); }}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Logs List */}
                <div className="panel-content">
                    {loading && page === 1 ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredLogs.length === 0 ? (
                        <div className="empty-state">
                            <FaShieldAlt />
                            <p>Moderasyon logu bulunamadı</p>
                        </div>
                    ) : (
                        <div className="logs-list">
                            {filteredLogs.map(log => (
                                <div key={log.id} className={`log-item ${log.reverted ? 'reverted' : ''}`}>
                                    <div className="log-icon">
                                        {getActionIcon(log.action_type)}
                                    </div>

                                    <div className="log-main">
                                        <div className="log-header">
                                            <span className={`action-badge ${log.action_type}`}>
                                                {getActionLabel(log.action_type)}
                                            </span>
                                            {log.reverted && (
                                                <span className="reverted-badge">
                                                    <FaUndo /> Geri Alındı
                                                </span>
                                            )}
                                            <span className="log-time">
                                                <FaClock /> {formatDate(log.created_at)}
                                            </span>
                                        </div>

                                        <div className="log-users">
                                            <div className="user-info">
                                                <img src={log.moderator.avatar || '/default-avatar.png'} alt="" />
                                                <span>{log.moderator.username}</span>
                                            </div>
                                            <span className="arrow">→</span>
                                            <div className="user-info target">
                                                <img src={log.target_user.avatar || '/default-avatar.png'} alt="" />
                                                <span>{log.target_user.username}</span>
                                            </div>
                                        </div>

                                        <div className="log-reason">
                                            <FaFileAlt /> {log.reason}
                                        </div>

                                        {log.channel && (
                                            <div className="log-channel">
                                                <FaHashtag /> {log.channel.name}
                                            </div>
                                        )}

                                        {expandedLog === log.id && log.details && Object.keys(log.details).length > 0 && (
                                            <div className="log-details">
                                                {log.details.duration && <span><strong>Süre:</strong> {log.details.duration}</span>}
                                                {log.details.message_count && <span><strong>Silinen Mesaj:</strong> {log.details.message_count}</span>}
                                                {log.details.warning_count && <span><strong>Toplam Uyarı:</strong> {log.details.warning_count}</span>}
                                                {log.details.trigger && <span><strong>Tetikleyici:</strong> {log.details.trigger}</span>}
                                                {log.details.evidence && (
                                                    <div className="evidence">
                                                        <strong>Kanıtlar:</strong>
                                                        <ul>
                                                            {log.details.evidence.map((e, i) => <li key={i}>{e}</li>)}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="log-actions">
                                        {Object.keys(log.details || {}).length > 0 && (
                                            <button
                                                className="detail-btn"
                                                onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                                title="Detaylar"
                                            >
                                                {expandedLog === log.id ? <FaChevronUp /> : <FaEye />}
                                            </button>
                                        )}
                                        {!log.reverted && ['ban', 'mute', 'timeout'].includes(log.action_type) && (
                                            <button
                                                className="revert-btn"
                                                onClick={() => handleRevertAction(log.id)}
                                                title="Geri Al"
                                            >
                                                <FaUndo />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {hasMore && (
                                <button className="load-more-btn" onClick={() => setPage(p => p + 1)} disabled={loading}>
                                    {loading ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModerationLogsPanel;

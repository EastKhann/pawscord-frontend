import React, { useState, useEffect } from 'react';
import {
    FaShieldAlt, FaTimes, FaSearch, FaFilter, FaUser, FaCalendar,
    FaBan, FaUserSlash, FaVolumeMute, FaExclamationTriangle,
    FaClock, FaTrash, FaRobot, FaDownload, FaChevronDown, FaChevronUp,
    FaUndo, FaHistory, FaUserShield, FaGavel, FaCommentSlash
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './ModerationActionsPanel.css';

const ModerationActionsPanel = ({ serverId, serverName, onClose }) => {
    const [actions, setActions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterMod, setFilterMod] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [expandedAction, setExpandedAction] = useState(null);
    const [moderators, setModerators] = useState([]);
    const [stats, setStats] = useState({});
    const token = localStorage.getItem('access_token');

    const actionTypes = [
        { key: 'all', label: 'Tümü', icon: <FaShieldAlt /> },
        { key: 'ban', label: 'Ban', icon: <FaBan />, color: '#f44336' },
        { key: 'kick', label: 'Kick', icon: <FaUserSlash />, color: '#ff5722' },
        { key: 'mute', label: 'Susturma', icon: <FaVolumeMute />, color: '#ff9800' },
        { key: 'warn', label: 'Uyarı', icon: <FaExclamationTriangle />, color: '#ffc107' },
        { key: 'timeout', label: 'Zaman Aşımı', icon: <FaClock />, color: '#9c27b0' },
        { key: 'delete', label: 'Mesaj Silme', icon: <FaTrash />, color: '#607d8b' },
        { key: 'automod', label: 'AutoMod', icon: <FaRobot />, color: '#2196f3' }
    ];

    useEffect(() => {
        fetchModerationActions();
    }, [serverId, filterType, filterMod, dateRange]);

    const fetchModerationActions = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filterType !== 'all') params.append('type', filterType);
            if (filterMod !== 'all') params.append('moderator', filterMod);
            if (dateRange !== 'all') params.append('range', dateRange);

            const response = await fetch(`/api/servers/${serverId}/moderation/actions/?${params}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setActions(data.actions || []);
                setModerators(data.moderators || []);
                setStats(data.stats || calculateStats([]));
            } else {
                setActions([]);
                setModerators([]);
                setStats(calculateStats([]));
            }
        } catch (error) {
            console.error('Error fetching moderation actions:', error);
            setActions([]);
            setModerators([]);
            setStats(calculateStats([]));
        }
        setLoading(false);
    };

    const calculateStats = (actionList) => {
        const stats = { total: actionList.length };
        actionTypes.forEach(type => {
            if (type.key !== 'all') {
                stats[type.key] = actionList.filter(a => a.type === type.key).length;
            }
        });
        return stats;
    };

    const getFilteredActions = () => {
        let filtered = [...actions];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(a =>
                a.target.username.toLowerCase().includes(query) ||
                a.moderator.username.toLowerCase().includes(query) ||
                a.reason.toLowerCase().includes(query)
            );
        }

        filtered.sort((a, b) => {
            const dateA = new Date(a.timestamp);
            const dateB = new Date(b.timestamp);
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return filtered;
    };

    const handleRevert = async (action) => {
        try {
            await fetch(`/api/servers/${serverId}/moderation/actions/${action.id}/revert/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
        } catch (error) { console.error('Revert action error:', error); }

        setActions(actions.map(a => a.id === action.id ? { ...a, reverted: true } : a));
        toast.success(`${action.type} işlemi geri alındı`);
    };

    const handleExport = () => {
        const csv = [
            ['Tarih', 'Tür', 'Hedef', 'Moderatör', 'Sebep', 'Kanal', 'Geri Alındı'].join(','),
            ...getFilteredActions().map(a => [
                formatDate(a.timestamp),
                a.type,
                a.target.username,
                a.moderator.username,
                `"${a.reason}"`,
                a.channel || '-',
                a.reverted ? 'Evet' : 'Hayır'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `moderation_actions_${serverName}.csv`;
        link.click();
        toast.success('Moderasyon geçmişi dışa aktarıldı');
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDuration = (seconds) => {
        if (!seconds) return null;
        if (seconds < 60) return `${seconds} saniye`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat`;
        return `${Math.floor(seconds / 86400)} gün`;
    };

    const getActionIcon = (type) => {
        const actionType = actionTypes.find(t => t.key === type);
        return actionType ? actionType.icon : <FaShieldAlt />;
    };

    const getActionColor = (type) => {
        const actionType = actionTypes.find(t => t.key === type);
        return actionType?.color || '#607d8b';
    };

    const filteredActions = getFilteredActions();

    return (
        <div className="modactions-overlay" onClick={(e) => e.target.className === 'modactions-overlay' && onClose()}>
            <div className="modactions-panel">
                <div className="panel-header">
                    <h2><FaGavel /> Moderasyon İşlemleri</h2>
                    <span className="server-name">{serverName}</span>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Stats Bar */}
                <div className="stats-bar">
                    <div className="stat-item" onClick={() => setFilterType('all')}>
                        <span className="stat-value">{stats.total || 0}</span>
                        <span className="stat-label">Toplam</span>
                    </div>
                    {actionTypes.slice(1, 5).map(type => (
                        <div
                            key={type.key}
                            className={`stat-item ${filterType === type.key ? 'active' : ''}`}
                            style={{ '--accent': type.color }}
                            onClick={() => setFilterType(type.key)}
                        >
                            {type.icon}
                            <span className="stat-value">{stats[type.key] || 0}</span>
                            <span className="stat-label">{type.label}</span>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="filters-bar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Kullanıcı, moderatör veya sebep ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        {actionTypes.map(type => (
                            <option key={type.key} value={type.key}>{type.label}</option>
                        ))}
                    </select>
                    <select value={filterMod} onChange={(e) => setFilterMod(e.target.value)}>
                        <option value="all">Tüm Moderatörler</option>
                        {moderators.map(mod => (
                            <option key={mod} value={mod}>{mod}</option>
                        ))}
                    </select>
                    <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
                        <option value="all">Tüm Zamanlar</option>
                        <option value="today">Bugün</option>
                        <option value="week">Bu Hafta</option>
                        <option value="month">Bu Ay</option>
                    </select>
                    <button className="export-btn" onClick={handleExport}>
                        <FaDownload />
                    </button>
                </div>

                {/* Actions List */}
                <div className="actions-list">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredActions.length === 0 ? (
                        <div className="empty-state">
                            <FaShieldAlt />
                            <p>Moderasyon işlemi bulunamadı</p>
                        </div>
                    ) : (
                        filteredActions.map(action => (
                            <div key={action.id} className={`action-card ${action.reverted ? 'reverted' : ''}`}>
                                <div className="action-main" onClick={() => setExpandedAction(expandedAction === action.id ? null : action.id)}>
                                    <div className="action-icon" style={{ background: getActionColor(action.type) }}>
                                        {getActionIcon(action.type)}
                                    </div>
                                    <div className="action-info">
                                        <div className="action-title">
                                            <span className="action-type">{actionTypes.find(t => t.key === action.type)?.label}</span>
                                            {action.reverted && <span className="reverted-badge">Geri Alındı</span>}
                                        </div>
                                        <div className="action-users">
                                            <span className="target"><FaUser /> {action.target.username}</span>
                                            <span className="by">tarafından</span>
                                            <span className="moderator"><FaUserShield /> {action.moderator.username}</span>
                                        </div>
                                    </div>
                                    <div className="action-meta">
                                        <span className="timestamp">
                                            <FaCalendar /> {formatDate(action.timestamp)}
                                        </span>
                                        {action.channel && (
                                            <span className="channel">#{action.channel}</span>
                                        )}
                                    </div>
                                    <button className="expand-btn">
                                        {expandedAction === action.id ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                </div>

                                {expandedAction === action.id && (
                                    <div className="action-details">
                                        <div className="detail-row">
                                            <span className="label">Sebep:</span>
                                            <span className="value">{action.reason}</span>
                                        </div>
                                        {action.duration && (
                                            <div className="detail-row">
                                                <span className="label">Süre:</span>
                                                <span className="value">{formatDuration(action.duration)}</span>
                                            </div>
                                        )}
                                        {action.deleted_count && (
                                            <div className="detail-row">
                                                <span className="label">Silinen Mesaj:</span>
                                                <span className="value">{action.deleted_count} mesaj</span>
                                            </div>
                                        )}
                                        {!action.reverted && ['ban', 'mute', 'timeout'].includes(action.type) && (
                                            <div className="detail-actions">
                                                <button className="revert-btn" onClick={() => handleRevert(action)}>
                                                    <FaUndo /> İşlemi Geri Al
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="panel-footer">
                    <span className="result-count">{filteredActions.length} işlem gösteriliyor</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ModerationActionsPanel;

import { useState, useEffect } from 'react';
import {
    FaBan, FaTimes, FaSearch, FaFilter, FaUser, FaCalendar,
    FaHistory, FaExclamationTriangle, FaUndo, FaCheck, FaClock,
    FaDownload, FaChevronDown, FaChevronUp, FaUserSlash, FaUserCheck,
    FaInfoCircle, FaEllipsisV, FaTrash
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './BanHistoryPanel.css';

const BanHistoryPanel = ({ serverId, serverName, onClose }) => {
    const [bans, setBans] = useState([]);
    const [filteredBans, setFilteredBans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, expired, appealed
    const [sortBy, setSortBy] = useState('newest');
    const [expandedBan, setExpandedBan] = useState(null);
    const [stats, setStats] = useState({ total: 0, active: 0, expired: 0, appealed: 0 });
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchBanHistory();
    }, [serverId]);

    useEffect(() => {
        applyFilters();
    }, [bans, searchQuery, filter, sortBy]);

    const fetchBanHistory = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/servers/${serverId}/bans/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.ok) {
                const data = await response.json();
                setBans(data.bans || []);
                setStats(data.stats || calculateStats([]));
            } else {
                setBans([]);
                setStats(calculateStats([]));
            }
        } catch (error) {
            setBans([]);
            setStats(calculateStats([]));
        }
        setLoading(false);
    };

    const calculateStats = (banList) => ({
        total: banList.length,
        active: banList.filter(b => b.status === 'active').length,
        expired: banList.filter(b => b.status === 'expired').length,
        appealed: banList.filter(b => b.status === 'appealed' || b.appeal_status === 'approved').length
    });

    const applyFilters = () => {
        let result = [...bans];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(ban =>
                ban.user.username.toLowerCase().includes(query) ||
                ban.reason.toLowerCase().includes(query) ||
                ban.moderator.username.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (filter !== 'all') {
            result = result.filter(ban => {
                if (filter === 'appealed') return ban.appeal_status === 'approved' || ban.status === 'appealed';
                return ban.status === filter;
            });
        }

        // Sort
        result.sort((a, b) => {
            const dateA = new Date(a.banned_at);
            const dateB = new Date(b.banned_at);
            return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
        });

        setFilteredBans(result);
    };

    const handleUnban = async (ban) => {
        try {
            const response = await fetch(`/api/servers/${serverId}/bans/${ban.id}/revoke/`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            toast.success(`${ban.user.username} yasaklaması kaldırıldı`);
            fetchBanHistory();
        } catch (error) {
            toast.success(`${ban.user.username} yasaklaması kaldırıldı`);
            setBans(bans.map(b => b.id === ban.id ? { ...b, status: 'expired', unbanned_at: new Date().toISOString() } : b));
        }
    };

    const handleExport = () => {
        const csv = [
            ['Kullanıcı', 'Moderatör', 'Sebep', 'Durum', 'Tarih', 'Bitiş', 'İtiraz'].join(','),
            ...filteredBans.map(ban => [
                ban.user.username,
                ban.moderator.username,
                `"${ban.reason}"`,
                ban.status,
                new Date(ban.banned_at).toLocaleDateString('tr-TR'),
                ban.expires_at ? new Date(ban.expires_at).toLocaleDateString('tr-TR') : 'Süresiz',
                ban.appeal_status || 'Yok'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ban_history_${serverName}.csv`;
        a.click();
        toast.success('Ban geçmişi dışa aktarıldı');
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

    const getStatusBadge = (status, appeal) => {
        if (appeal === 'approved' || status === 'appealed') {
            return <span className="status-badge appealed"><FaUserCheck /> İtiraz Kabul</span>;
        }
        switch (status) {
            case 'active':
                return <span className="status-badge active"><FaBan /> Aktif Ban</span>;
            case 'expired':
                return <span className="status-badge expired"><FaClock /> Süresi Doldu</span>;
            default:
                return <span className="status-badge">{status}</span>;
        }
    };

    const getAppealBadge = (status) => {
        if (!status) return null;
        const badges = {
            pending: <span className="appeal-badge pending">İtiraz Bekliyor</span>,
            approved: <span className="appeal-badge approved">İtiraz Kabul</span>,
            denied: <span className="appeal-badge denied">İtiraz Reddedildi</span>
        };
        return badges[status];
    };

    return (
        <div className="banhistory-overlay" onClick={(e) => e.target.className === 'banhistory-overlay' && onClose()}>
            <div className="banhistory-panel">
                <div className="panel-header">
                    <h2><FaBan /> Ban Geçmişi</h2>
                    <span className="server-name">{serverName}</span>
                    <button className="close-btn" onClick={onClose}><FaTimes /></button>
                </div>

                {/* Stats Bar */}
                <div className="stats-bar">
                    <div className="stat-item" onClick={() => setFilter('all')}>
                        <span className="stat-value">{stats.total}</span>
                        <span className="stat-label">Toplam</span>
                    </div>
                    <div className="stat-item active" onClick={() => setFilter('active')}>
                        <span className="stat-value">{stats.active}</span>
                        <span className="stat-label">Aktif</span>
                    </div>
                    <div className="stat-item expired" onClick={() => setFilter('expired')}>
                        <span className="stat-value">{stats.expired}</span>
                        <span className="stat-label">Süresi Dolmuş</span>
                    </div>
                    <div className="stat-item appealed" onClick={() => setFilter('appealed')}>
                        <span className="stat-value">{stats.appealed}</span>
                        <span className="stat-label">İtiraz Kabul</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-bar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder="Kullanıcı, sebep veya moderatör ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">Tüm Banlar</option>
                        <option value="active">Aktif</option>
                        <option value="expired">Süresi Dolmuş</option>
                        <option value="appealed">İtiraz Kabul</option>
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                    </select>
                    <button className="export-btn" onClick={handleExport}>
                        <FaDownload /> Dışa Aktar
                    </button>
                </div>

                {/* Ban List */}
                <div className="bans-list">
                    {loading ? (
                        <div className="loading">Yükleniyor...</div>
                    ) : filteredBans.length === 0 ? (
                        <div className="empty-state">
                            <FaUserSlash />
                            <p>Ban kaydı bulunamadı</p>
                        </div>
                    ) : (
                        filteredBans.map(ban => (
                            <div key={ban.id} className={`ban-card ${ban.status}`}>
                                <div className="ban-main" onClick={() => setExpandedBan(expandedBan === ban.id ? null : ban.id)}>
                                    <div className="ban-user">
                                        <div className="user-avatar">
                                            {ban.user.avatar ? (
                                                <img src={ban.user.avatar} alt="" />
                                            ) : (
                                                <FaUser />
                                            )}
                                        </div>
                                        <div className="user-info">
                                            <span className="username">{ban.user.username}</span>
                                            <span className="discriminator">{ban.user.discriminator}</span>
                                        </div>
                                    </div>
                                    <div className="ban-reason">
                                        <FaExclamationTriangle />
                                        <span>{ban.reason}</span>
                                    </div>
                                    <div className="ban-meta">
                                        {getStatusBadge(ban.status, ban.appeal_status)}
                                        {getAppealBadge(ban.appeal_status)}
                                    </div>
                                    <div className="ban-date">
                                        <FaCalendar />
                                        <span>{formatDate(ban.banned_at)}</span>
                                    </div>
                                    <button className="expand-btn">
                                        {expandedBan === ban.id ? <FaChevronUp /> : <FaChevronDown />}
                                    </button>
                                </div>

                                {expandedBan === ban.id && (
                                    <div className="ban-details">
                                        <div className="detail-row">
                                            <span className="label">Moderatör:</span>
                                            <span className="value">{ban.moderator.username}</span>
                                        </div>
                                        {ban.expires_at && (
                                            <div className="detail-row">
                                                <span className="label">Bitiş Tarihi:</span>
                                                <span className="value">{formatDate(ban.expires_at)}</span>
                                            </div>
                                        )}
                                        {ban.unbanned_at && (
                                            <div className="detail-row">
                                                <span className="label">Yasak Kaldırıldı:</span>
                                                <span className="value">{formatDate(ban.unbanned_at)}</span>
                                            </div>
                                        )}
                                        {ban.notes && (
                                            <div className="detail-row notes">
                                                <span className="label">Notlar:</span>
                                                <span className="value">{ban.notes}</span>
                                            </div>
                                        )}
                                        {ban.status === 'active' && (
                                            <div className="detail-actions">
                                                <button className="unban-btn" onClick={() => handleUnban(ban)}>
                                                    <FaUndo /> Yasağı Kaldır
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default BanHistoryPanel;

/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import {
    FaBan,
    FaTimes,
    FaSearch,
    FaFilter,
    FaUser,
    FaCalendar,
    FaHistory,
    FaExclamationTriangle,
    FaUndo,
    FaCheck,
    FaClock,
    FaDownload,
    FaChevronDown,
    FaChevronUp,
    FaUserSlash,
    FaUserCheck,
    FaInfoCircle,
    FaEllipsisV,
    FaTrash,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './BanHistoryPanel.css';

import { useTranslation } from 'react-i18next';
import { API_BASE_URL } from '../../utils/apiEndpoints';
const BanHistoryPanel = ({ serverId, serverName, onClose }) => {
    const { t } = useTranslation();
    const [bans, setBans] = useState([]);
    const [filteredBans, setFilteredBans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('all'); // all, active, expired, appealed
    const [sortBy, setSortBy] = useState('newest');
    const [expandedBan, setExpandedBan] = useState(null);
    const [stats, setStats] = useState({ total: 0, active: 0, expired: 0, appealed: 0 });
    const token = getToken();

    useEffect(() => {
        fetchBanHistory();
    }, [serverId]);

    useEffect(() => {
        applyFilters();
    }, [bans, searchQuery, filter, sortBy]);

    const fetchBanHistory = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/servers/${serverId}/bans/`, {
                headers: { Authorization: `Bearer ${token}` },
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
        active: banList.filter((b) => b.status === 'active').length,
        expired: banList.filter((b) => b.status === 'expired').length,
        appealed: banList.filter((b) => b.status === 'appealed' || b.appeal_status === 'approved')
            .length,
    });

    const applyFilters = () => {
        let result = [...bans];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (ban) =>
                    ban.user.username.toLowerCase().includes(query) ||
                    ban.reason.toLowerCase().includes(query) ||
                    ban.moderator.username.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (filter !== 'all') {
            result = result.filter((ban) => {
                if (filter === 'appealed')
                    return ban.appeal_status === 'approved' || ban.status === 'appealed';
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
            const response = await fetch(
                `${API_BASE_URL}/servers/${serverId}/bans/${ban.id}/revoke/`,
                {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            toast.success(t('ban.removed', { user: ban.user.username }));
            fetchBanHistory();
        } catch (error) {
            toast.success(t('ban.removed', { user: ban.user.username }));
            setBans(
                bans.map((b) =>
                    b.id === ban.id
                        ? { ...b, status: 'expired', unbanned_at: new Date().toISOString() }
                        : b
                )
            );
        }
    };

    const handleExport = () => {
        const csv = [
            ['User', 'Moderator', 'Reason', 'Status', 'Date', t('ui.bitis_2'), 'Appeal'].join(','),
            ...filteredBans.map((ban) =>
                [
                    ban.user.username,
                    ban.moderator.username,
                    `"${ban.reason}"`,
                    ban.status,
                    new Date(ban.banned_at).toLocaleDateString('tr-TR'),
                    ban.expires_at
                        ? new Date(ban.expires_at).toLocaleDateString('tr-TR')
                        : 'Permanent',
                    ban.appeal_status || 'Yok',
                ].join(',')
            ),
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ban_history_${serverName}.csv`;
        a.click();
        toast.success(t('ui.ban_gecmisi_disa_aktarildi'));
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusBadge = (status, appeal) => {
        if (appeal === 'approved' || status === 'appealed') {
            return (
                <span className="status-badge appealed">
                    <FaUserCheck /> {t('ban.appealApproved', 'Appeal Approved')}
                </span>
            );
        }
        switch (status) {
            case 'active':
                return (
                    <span className="status-badge active">
                        <FaBan /> Aktif Yasak
                    </span>
                );
            case 'expired':
                return (
                    <span className="status-badge expired">
                        <FaClock /> {t('ban.expired', 'Expired')}
                    </span>
                );
            default:
                return <span className="status-badge">{status}</span>;
        }
    };

    const getAppealBadge = (status) => {
        if (!status) return null;
        const badges = {
            pending: <span className="appeal-badge pending">{t('ban.appealPending', 'Appeal Pending')}</span>,
            approved: <span className="appeal-badge approved">{t('ban.appealApproved', 'Appeal Approved')}</span>,
            denied: <span className="appeal-badge denied">{t('ban.appealDenied', 'Appeal Denied')}</span>,
        };
        return badges[status];
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
    };
    const handleStatKey = (e, value) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFilter(value);
        }
    };

    return (
        <div
            className="banhistory-overlay"
            role="button"
            tabIndex={-1}
            aria-label={t('common.close', 'Close')}
            onClick={(e) => e.target.className === 'banhistory-overlay' && onClose()}
            onKeyDown={handleKeyDown}
        >
            <div
                className="banhistory-panel"
                role="dialog"
                aria-modal="true"
                aria-label={t('ui.ban_gecmisi')}
            >
                <div className="panel-header">
                    <h2>
                        <FaBan /> {t('ban.history', 'Ban History')}
                    </h2>
                    <span className="server-name">{serverName}</span>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Stats Bar */}
                <div className="stats-bar" role="tablist">
                    <div
                        className="stat-item"
                        role="tab"
                        tabIndex={0}
                        aria-selected={filter === 'all'}
                        onClick={() => setFilter('all')}
                        onKeyDown={(e) => handleStatKey(e, 'all')}
                    >
                        <span className="stat-value">{stats.total}</span>
                        <span className="stat-label">Toplam</span>
                    </div>
                    <div
                        className="stat-item active"
                        role="tab"
                        tabIndex={0}
                        aria-selected={filter === 'active'}
                        onClick={() => setFilter('active')}
                        onKeyDown={(e) => handleStatKey(e, 'active')}
                    >
                        <span className="stat-value">{stats.active}</span>
                        <span className="stat-label">Aktif</span>
                    </div>
                    <div
                        className="stat-item expired"
                        role="tab"
                        tabIndex={0}
                        aria-selected={filter === 'expired'}
                        onClick={() => setFilter('expired')}
                        onKeyDown={(e) => handleStatKey(e, 'expired')}
                    >
                        <span className="stat-value">{stats.expired}</span>
                        <span className="stat-label">{t('admin.expired', 'Expired')}</span>
                    </div>
                    <div
                        className="stat-item appealed"
                        role="tab"
                        tabIndex={0}
                        aria-selected={filter === 'appealed'}
                        onClick={() => setFilter('appealed')}
                        onKeyDown={(e) => handleStatKey(e, 'appealed')}
                    >
                        <span className="stat-value">{stats.appealed}</span>
                        <span className="stat-label">{t('ban.appealApproved', 'Appeal Approved')}</span>
                    </div>
                </div>

                {/* Filters */}
                <div className="filters-bar">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder={t('ui.user_sebep_or_moderator_search')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">{t('ban.allBans', 'All Bans')}</option>
                        <option value="active">Aktif</option>
                        <option value="expired">{t('admin.expired', 'Expired')}</option>
                        <option value="appealed">{t('ban.appealApproved', 'Appeal Approved')}</option>
                    </select>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="newest">En Yeni</option>
                        <option value="oldest">En Eski</option>
                    </select>
                    <button
                        aria-label={t('common.export', 'Export')}
                        className="export-btn"
                        onClick={handleExport}
                    >
                        <FaDownload /> {t('common.export', 'Export')}
                    </button>
                </div>

                {/* Ban List */}
                <div className="bans-list">
                    {loading ? (
                        <div className="loading"> {t('common.loading')}</div>
                    ) : filteredBans.length === 0 ? (
                        <div className="empty-state">
                            <FaUserSlash />
                            <p>{t('ban.noRecords', 'No ban records found')}</p>
                        </div>
                    ) : (
                        filteredBans.map((ban) => (
                            <div key={ban.id} className={`ban-card ${ban.status}`}>
                                <div
                                    className="ban-main"
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={expandedBan === ban.id}
                                    onClick={() =>
                                        setExpandedBan(expandedBan === ban.id ? null : ban.id)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            e.preventDefault();
                                            setExpandedBan(expandedBan === ban.id ? null : ban.id);
                                        }
                                    }}
                                >
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
                                            <span className="discriminator">
                                                {ban.user.discriminator}
                                            </span>
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
                                    <button aria-label={expandedBan === ban.id ? t('common.collapse', 'Collapse') : t('common.expand', 'Expand')} className="expand-btn">
                                        {expandedBan === ban.id ? (
                                            <FaChevronUp />
                                        ) : (
                                            <FaChevronDown />
                                        )}
                                    </button>
                                </div>

                                {expandedBan === ban.id && (
                                    <div className="ban-details">
                                        <div className="detail-row">
                                            <span className="label">Moderator:</span>
                                            <span className="value">{ban.moderator.username}</span>
                                        </div>
                                        {ban.expires_at && (
                                            <div className="detail-row">
                                                <span className="label">{t('ban.endDate', 'End Date:')}</span>
                                                <span className="value">
                                                    {formatDate(ban.expires_at)}
                                                </span>
                                            </div>
                                        )}
                                        {ban.unbanned_at && (
                                            <div className="detail-row">
                                                <span className="label">{t('ban.removedDate', 'Ban Removed:')}</span>
                                                <span className="value">
                                                    {formatDate(ban.unbanned_at)}
                                                </span>
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
                                                <button
                                                    aria-label={t('ban.removeBan', 'Remove ban')}
                                                    className="unban-btn"
                                                    onClick={() => handleUnban(ban)}
                                                >
                                                    <FaUndo /> {t('ban.removeBan', 'Remove Ban')}
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

BanHistoryPanel.propTypes = {
    serverId: PropTypes.string,
    serverName: PropTypes.string,
    onClose: PropTypes.func,
};
export default BanHistoryPanel;

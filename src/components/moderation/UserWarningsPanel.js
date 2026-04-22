/* eslint-disable no-undef */
// frontend/src/components/UserWarningsPanel.js
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
    FaExclamationTriangle,
    FaTimes,
    FaPlus,
    FaUser,
    FaBan,
    FaHistory,
    FaSearch,
    FaTrash,
} from 'react-icons/fa';
import styles from '../UserWarningsPanel/styles';
import useWarnings from '../UserWarningsPanel/hooks/useWarnings';
import AddWarningModal from '../UserWarningsPanel/AddWarningModal';

// -- dynamic style helpers (pass 2) --

const S = {
    txt: { ...styles.statIcon, color },
};

const getSeverityColor = (severity) => {
    switch (severity) {
        case 'low':
            return '#23a559';
        case 'medium':
            return '#f0b132';
        case 'high':
            return '#f23f42';
        default:
            return '#949ba4';
    }
};

const UserWarningsPanel = ({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [showAddWarning, setShowAddWarning] = useState(false);

    const { warnings, users, loading, stats, addWarning, removeWarning, banUser } = useWarnings(
        serverId,
        fetchWithAuth,
        apiBaseUrl
    );

    const warningsByUser = useMemo(() => {
        const filtered = warnings.filter(
            (w) =>
                !searchTerm ||
                w.user_username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                w.reason?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filtered.reduce((acc, warning) => {
            if (!acc[warning.user]) {
                acc[warning.user] = {
                    user_id: warning.user,
                    username: warning.user_username,
                    warnings: [],
                };
            }
            acc[warning.user].warnings.push(warning);
            return acc;
        }, {});
    }, [warnings, searchTerm]);

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.panel}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaExclamationTriangle style={styles.headerIcon} />
                        <h2 style={styles.title}>{t('userWarnings.title', 'User Warnings')}</h2>
                    </div>
                    <div style={styles.headerRight}>
                        <button
                            aria-label={t('userWarnings.addWarningBtn', 'Add warning')}
                            onClick={() => setShowAddWarning(true)}
                            style={styles.addBtn}
                        >
                            <FaPlus /> {t('userWarnings.addWarning', 'Add Warning')}
                        </button>
                        <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div style={styles.statsGrid}>
                    {[
                        {
                            icon: FaExclamationTriangle,
                            color: '#f0b132',
                            value: stats.total_warnings,
                            label: 'Total Warnings',
                        },
                        {
                            icon: FaExclamationTriangle,
                            color: '#23a559',
                            value: stats.active_warnings,
                            label: 'Active',
                        },
                        {
                            icon: FaHistory,
                            color: '#949ba4',
                            value: stats.expired_warnings,
                            label: 'Expired',
                        },
                        {
                            icon: FaBan,
                            color: '#f23f42',
                            value: stats.auto_banned_users,
                            label: 'Auto-Banned',
                        },
                    ].map(({ icon: Icon, color, value, label }) => (
                        <div key={label} style={styles.statCard}>
                            <Icon style={S.txt} />
                            <div style={styles.statValue}>{value}</div>
                            <div style={styles.statLabel}>{label}</div>
                        </div>
                    ))}
                </div>

                <div style={styles.searchBar}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder={t('moderation.searchWarnings', 'Search by username or reason...')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>

                <div style={styles.warningsList}>
                    {loading ? (
                        <div style={styles.loading}>{t('userWarnings.loading', 'Loading warnings...')}</div>
                    ) : Object.keys(warningsByUser).length === 0 ? (
                        <div style={styles.empty}>
                            <FaExclamationTriangle style={styles.emptyIcon} />
                            <p>{t('userWarnings.noWarnings', 'No warnings found')}</p>
                        </div>
                    ) : (
                        Object.values(warningsByUser).map(
                            ({ user_id, username, warnings: userWarnings }) => {
                                const activeWarnings = userWarnings.filter((w) => w.is_active);
                                const isAtRisk = activeWarnings.length >= 2;
                                return (
                                    <div key={user_id} style={styles.userCard}>
                                        <div style={styles.userHeader}>
                                            <div style={styles.userInfo}>
                                                <FaUser style={styles.userIcon} />
                                                <div style={styles.userName}>{username}</div>
                                                <span
                                                    style={{
                                                        ...styles.badge,
                                                        backgroundColor: isAtRisk
                                                            ? '#f23f42'
                                                            : '#f0b132',
                                                    }}
                                                >
                                                    {activeWarnings.length} Active Warning
                                                    {activeWarnings.length !== 1 ? 's' : ''}
                                                </span>
                                                {isAtRisk && (
                                                    <span style={styles.riskBadge}>⚠️ AT RISK</span>
                                                )}
                                            </div>
                                            {activeWarnings.length >= 3 && (
                                                <button
                                                    aria-label={t('userWarnings.banUser', 'Ban user')}
                                                    onClick={() =>
                                                        banUser(user_id, 'Auto-ban: 3 warnings')
                                                    }
                                                    style={styles.banBtn}
                                                >
                                                    <FaBan /> Ban User
                                                </button>
                                            )}
                                        </div>
                                        <div style={styles.userWarnings}>
                                            {userWarnings.map((warning) => (
                                                <div
                                                    key={warning.id}
                                                    style={{
                                                        ...styles.warningItem,
                                                        opacity: warning.is_active ? 1 : 0.5,
                                                    }}
                                                >
                                                    <div style={styles.warningLeft}>
                                                        <div />
                                                        <div style={styles.warningContent}>
                                                            <div style={styles.warningReason}>
                                                                {warning.reason}
                                                            </div>
                                                            <div style={styles.warningMeta}>
                                                                <span>
                                                                    {warning.is_auto
                                                                        ? '🤖 Auto'
                                                                        : '👤 Manual'}
                                                                </span>
                                                                <span>•</span>
                                                                <span>
                                                                    {new Date(
                                                                        warning.created_at
                                                                    ).toLocaleString()}
                                                                </span>
                                                                {warning.expires_at && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <span>
                                                                            Expires:{' '}
                                                                            {new Date(
                                                                                warning.expires_at
                                                                            ).toLocaleDateString()}
                                                                        </span>
                                                                    </>
                                                                )}
                                                                {!warning.is_active && (
                                                                    <>
                                                                        <span>•</span>
                                                                        <span className="icon-muted">
                                                                            {t('userWarnings.expired', 'EXPIRED')}
                                                                        </span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {warning.is_active && !warning.is_auto && (
                                                        <button
                                                            aria-label={t('common.removeWarning', 'Remove warning')}
                                                            onClick={() =>
                                                                removeWarning(warning.id)
                                                            }
                                                            style={styles.removeBtn}
                                                            title={t('common.removeWarning', 'Remove warning')}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                        )
                    )}
                </div>

                {showAddWarning && (
                    <AddWarningModal
                        users={users}
                        onAdd={addWarning}
                        onClose={() => setShowAddWarning(false)}
                    />
                )}
            </div>
        </div>
    );
};

UserWarningsPanel.propTypes = {
    serverId: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};
export default UserWarningsPanel;

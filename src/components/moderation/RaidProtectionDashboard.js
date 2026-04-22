import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './RaidProtectionDashboard.css';
import {
    FaShieldAlt,
    FaTimes,
    FaChartLine,
    FaUserShield,
    FaHistory,
    FaCog,
    FaClock,
    FaUsers,
    FaExclamationTriangle,
    FaCheck,
    FaBan,
} from 'react-icons/fa';
import useRaidProtectionDashboard from '../RaidProtectionDashboard/useRaidProtectionDashboard';
import OverviewView from '../RaidProtectionDashboard/OverviewView';
import SettingsView from '../RaidProtectionDashboard/SettingsView';

const RaidProtectionDashboard = ({ serverId, onClose, apiBaseUrl }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const {
        view,
        setView,
        protectionStatus,
        recentActivity,
        pendingVerifications,
        raidLogs,
        settings,
        setSettings,
        loading,
        stats,
        activityRef,
        handleToggleProtection,
        handleLockdown,
        handleVerifyUser,
        handleSaveSettings,
    } = useRaidProtectionDashboard(serverId, apiBaseUrl);

    return (
        <div
            className="raid-dashboard-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="raid-dashboard"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="dashboard-header">
                    <h2>
                        <FaShieldAlt /> Raid Koruma Paneli
                    </h2>
                    <div className="header-status">
                        <span
                            className={`status-badge ${protectionStatus.enabled ? 'active' : 'inactive'}`}
                        >
                            {protectionStatus.enabled ? '🛡️ Koruma Active' : '⚠️ Koruma Closed'}
                        </span>
                        {protectionStatus.lockdown_active && (
                            <span className="status-badge lockdown">🔒 Lockdown</span>
                        )}
                    </div>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="dashboard-nav">
                    <button
                        aria-label={t('raidDash.overviewTab', 'Overview')}
                        onClick={() => setView('overview')}
                    >
                        <FaChartLine /> {t('raidDash.overview', 'Overview')}
                    </button>
                    <button
                        aria-label={t('raidDash.verifyTab', 'Verification')}
                        onClick={() => setView('verify')}
                    >
                        <FaUserShield /> Verification
                        {pendingVerifications.length > 0 && (
                            <span className="badge">{pendingVerifications.length}</span>
                        )}
                    </button>
                    <button
                        aria-label={t('raidDash.logsTab', 'Logs')}
                        onClick={() => setView('logs')}
                    >
                        <FaHistory /> Loglar
                    </button>
                    <button
                        aria-label={t('raidDash.settingsTab', 'Settings')}
                        onClick={() => setView('settings')}
                    >
                        <FaCog /> Ayarlar
                    </button>
                </div>

                <div className="dashboard-content">
                    {view === 'overview' && (
                        <OverviewView
                            protectionStatus={protectionStatus}
                            stats={stats}
                            recentActivity={recentActivity}
                            activityRef={activityRef}
                            handleToggleProtection={handleToggleProtection}
                            handleLockdown={handleLockdown}
                        />
                    )}

                    {view === 'verify' && (
                        <div className="verify-view">
                            <h3>
                                <FaUserShield /> Pending Verifications
                            </h3>
                            {pendingVerifications.length > 0 ? (
                                <div className="verifications-list">
                                    {pendingVerifications.map((user) => (
                                        <div key={user.id} className="verification-card">
                                            <img
                                                src={user.avatar || '/default-avatar.png'}
                                                alt={user.username}
                                                className="user-avatar"
                                            />
                                            <div className="user-info">
                                                <h4>{user.username}</h4>
                                                <div className="user-meta">
                                                    <span>
                                                        <FaClock /> {t('raidDash.joined', 'Joined:')}{' '}
                                                        {new Date(
                                                            user.joined_at
                                                        ).toLocaleDateString('tr-TR')}
                                                    </span>
                                                    <span>
                                                        <FaUsers /> Hesap: {user.account_age_days}{' '}
                                                        day
                                                    </span>
                                                </div>
                                                {user.suspicious_reasons && (
                                                    <div className="suspicious-reasons">
                                                        <FaExclamationTriangle />
                                                        {user.suspicious_reasons.map(
                                                            (reason, idx) => (
                                                                <span
                                                                    key={`item-${idx}`}
                                                                    className="reason-tag"
                                                                >
                                                                    {reason}
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="verification-actions">
                                                <button
                                                    aria-label={t('common.confirm')}
                                                    className="approve-btn"
                                                    onClick={() =>
                                                        handleVerifyUser(user.id, 'approve')
                                                    }
                                                >
                                                    <FaCheck /> Confirm
                                                </button>
                                                <button
                                                    aria-label={t('raidDash.banUser', 'Ban user')}
                                                    className="reject-btn"
                                                    onClick={() =>
                                                        handleVerifyUser(user.id, 'reject')
                                                    }
                                                >
                                                    <FaBan /> Reject
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-verifications">
                                    <FaUserShield className="empty-icon" />
                                    <p>{t('raidDash.noPending', 'No pending verifications')}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {view === 'logs' && (
                        <div className="logs-view">
                            <h3>
                                <FaHistory /> {t('raidDash.raidLogs', 'Raid Logs')}
                            </h3>
                            {raidLogs.length > 0 ? (
                                <div className="logs-list">
                                    {raidLogs.map((log, idx) => (
                                        <div
                                            key={`item-${idx}`}
                                            className={`log-item ${log.severity}`}
                                        >
                                            <div className="log-header">
                                                <span className="log-type">
                                                    {log.type === 'raid_detected' &&
                                                        '🚨 Raid Tespit Edildi'}
                                                    {log.type === 'mass_ban' && '🔨 Mass Ban'}
                                                    {log.type === 'lockdown' && '🔒 Lockdown'}
                                                    {log.type === 'unlock' &&
                                                        t('ui.kilit_openildi')}
                                                    {log.type === 'suspicious_activity' &&
                                                        t('ui.supheli_aktivite')}
                                                </span>
                                                <span className="log-time">
                                                    {new Date(log.timestamp).toLocaleString(
                                                        'tr-TR'
                                                    )}
                                                </span>
                                            </div>
                                            <p className="log-description">{log.description}</p>
                                            {log.affected_users && (
                                                <span className="affected-count">
                                                    {log.affected_users} {t('raidDash.usersAffected', 'users affected')}
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-logs">
                                    <FaHistory className="empty-icon" />
                                    <p>{t('raidDash.noLogs', 'No logs yet')}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {view === 'settings' && (
                        <SettingsView
                            settings={settings}
                            setSettings={setSettings}
                            handleSaveSettings={handleSaveSettings}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

RaidProtectionDashboard.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default RaidProtectionDashboard;

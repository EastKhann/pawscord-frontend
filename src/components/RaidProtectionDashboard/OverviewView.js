import React from 'react';
import PropTypes from 'prop-types';
import {
    FaShieldAlt,
    FaBan,
    FaCheck,
    FaExclamationTriangle,
    FaEye,
    FaClock,
    FaLock,
    FaUnlock,
} from 'react-icons/fa';
import { getActivityIcon, getActivityColor, formatTime } from './useRaidProtectionDashboard';
import { useTranslation } from 'react-i18next';

const OverviewView = ({
    protectionStatus,
    stats,
    recentActivity,
    activityRef,
    handleToggleProtection,
    handleLockdown,
}) => {
    const { t } = useTranslation();

    return (
        <div aria-label={t('raidProtection.overview', 'Overview')} className="overview-view">
            <div className="quick-actions">
                <button
                    className={`action-btn ${protectionStatus.enabled ? 'enabled' : ''}`}
                    onClick={handleToggleProtection}
                >
                    <FaShieldAlt />
                    {protectionStatus.enabled ? t('ui.korumayi_close') : 'Korumayı Aç'}
                </button>
                <button
                    className={`action-btn lockdown ${protectionStatus.lockdown_active ? 'active' : ''}`}
                    onClick={handleLockdown}
                >
                    {protectionStatus.lockdown_active ? <FaUnlock /> : <FaLock />}
                    {protectionStatus.lockdown_active ? 'Kilidi Open' : 'Serveryu Kilitle'}
                </button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon blocked">
                        <FaBan />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.blocked_today}</span>
                        <span className="stat-label">{t('today_blocknen')}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon verified">
                        <FaCheck />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.verified_today}</span>
                        <span className="stat-label">{t('today_doğrulanan')}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon raids">
                        <FaExclamationTriangle />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.raids_detected}</span>
                        <span className="stat-label">{t('tespit_edilen_raid')}</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon suspicious">
                        <FaEye />
                    </div>
                    <div className="stat-info">
                        <span className="stat-value">{stats.suspicious_accounts}</span>
                        <span className="stat-label">{t('şüpheli_hesap')}</span>
                    </div>
                </div>
            </div>

            <div className="activity-section">
                <h3>
                    <FaClock />
                    {t('canlı_aktivite')}
                </h3>
                <div className="activity-feed" ref={activityRef}>
                    {recentActivity.length > 0 ? (
                        recentActivity.map((activity, idx) => (
                            <div
                                key={`item-${idx}`}
                                className="activity-item"
                                style={{ borderLeftColor: getActivityColor(activity.type) }}
                            >
                                <span className="activity-icon">
                                    {getActivityIcon(activity.type)}
                                </span>
                                <div className="activity-info">
                                    <span className="activity-user">{activity.username}</span>
                                    <span className="activity-action">{activity.description}</span>
                                </div>
                                <span className="activity-time">
                                    {formatTime(activity.timestamp)}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="no-activity">
                            <p>{t('not_yet_aktivite_yok')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

OverviewView.propTypes = {
    protectionStatus: PropTypes.func,
    stats: PropTypes.array,
    recentActivity: PropTypes.object,
    activityRef: PropTypes.object,
    handleToggleProtection: PropTypes.func,
    handleLockdown: PropTypes.func,
};
export default OverviewView;

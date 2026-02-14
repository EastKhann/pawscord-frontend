import React from 'react';
import './RaidProtectionDashboard.css';
import {
    FaShieldAlt, FaTimes, FaChartLine, FaUserShield,
    FaHistory, FaCog, FaClock, FaUsers, FaExclamationTriangle,
    FaCheck, FaBan
} from 'react-icons/fa';
import useRaidProtectionDashboard from './RaidProtectionDashboard/useRaidProtectionDashboard';
import OverviewView from './RaidProtectionDashboard/OverviewView';
import SettingsView from './RaidProtectionDashboard/SettingsView';

const RaidProtectionDashboard = ({ serverId, onClose, apiBaseUrl }) => {
    const {
        view, setView,
        protectionStatus,
        recentActivity,
        pendingVerifications,
        raidLogs,
        settings, setSettings,
        loading,
        stats,
        activityRef,
        handleToggleProtection,
        handleLockdown,
        handleVerifyUser,
        handleSaveSettings
    } = useRaidProtectionDashboard(serverId, apiBaseUrl);

    return (
        <div className="raid-dashboard-overlay" onClick={onClose}>
            <div className="raid-dashboard" onClick={e => e.stopPropagation()}>
                <div className="dashboard-header">
                    <h2><FaShieldAlt /> Raid Koruma Paneli</h2>
                    <div className="header-status">
                        <span className={`status-badge ${protectionStatus.enabled ? 'active' : 'inactive'}`}>
                            {protectionStatus.enabled ? '🛡️ Koruma Aktif' : '⚠️ Koruma Kapalı'}
                        </span>
                        {protectionStatus.lockdown_active && (
                            <span className="status-badge lockdown">🔒 Lockdown</span>
                        )}
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="dashboard-nav">
                    <button className={`nav-btn ${view === 'overview' ? 'active' : ''}`} onClick={() => setView('overview')}>
                        <FaChartLine /> Genel Bakış
                    </button>
                    <button className={`nav-btn ${view === 'verify' ? 'active' : ''}`} onClick={() => setView('verify')}>
                        <FaUserShield /> Doğrulama
                        {pendingVerifications.length > 0 && <span className="badge">{pendingVerifications.length}</span>}
                    </button>
                    <button className={`nav-btn ${view === 'logs' ? 'active' : ''}`} onClick={() => setView('logs')}>
                        <FaHistory /> Loglar
                    </button>
                    <button className={`nav-btn ${view === 'settings' ? 'active' : ''}`} onClick={() => setView('settings')}>
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
                            <h3><FaUserShield /> Bekleyen Doğrulamalar</h3>
                            {pendingVerifications.length > 0 ? (
                                <div className="verifications-list">
                                    {pendingVerifications.map(user => (
                                        <div key={user.id} className="verification-card">
                                            <img src={user.avatar || '/default-avatar.png'} alt={user.username} className="user-avatar" />
                                            <div className="user-info">
                                                <h4>{user.username}</h4>
                                                <div className="user-meta">
                                                    <span><FaClock /> Katılım: {new Date(user.joined_at).toLocaleDateString('tr-TR')}</span>
                                                    <span><FaUsers /> Hesap: {user.account_age_days} gün</span>
                                                </div>
                                                {user.suspicious_reasons && (
                                                    <div className="suspicious-reasons">
                                                        <FaExclamationTriangle />
                                                        {user.suspicious_reasons.map((reason, idx) => (
                                                            <span key={idx} className="reason-tag">{reason}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="verification-actions">
                                                <button className="approve-btn" onClick={() => handleVerifyUser(user.id, 'approve')}>
                                                    <FaCheck /> Onayla
                                                </button>
                                                <button className="reject-btn" onClick={() => handleVerifyUser(user.id, 'reject')}>
                                                    <FaBan /> Reddet
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-verifications">
                                    <FaUserShield className="empty-icon" />
                                    <p>Bekleyen doğrulama yok</p>
                                </div>
                            )}
                        </div>
                    )}

                    {view === 'logs' && (
                        <div className="logs-view">
                            <h3><FaHistory /> Raid Logları</h3>
                            {raidLogs.length > 0 ? (
                                <div className="logs-list">
                                    {raidLogs.map((log, idx) => (
                                        <div key={idx} className={`log-item ${log.severity}`}>
                                            <div className="log-header">
                                                <span className="log-type">
                                                    {log.type === 'raid_detected' && '🚨 Raid Tespit Edildi'}
                                                    {log.type === 'mass_ban' && '🔨 Toplu Ban'}
                                                    {log.type === 'lockdown' && '🔒 Lockdown'}
                                                    {log.type === 'unlock' && '🔓 Kilit Açıldı'}
                                                    {log.type === 'suspicious_activity' && '⚠️ Şüpheli Aktivite'}
                                                </span>
                                                <span className="log-time">
                                                    {new Date(log.timestamp).toLocaleString('tr-TR')}
                                                </span>
                                            </div>
                                            <p className="log-description">{log.description}</p>
                                            {log.affected_users && (
                                                <span className="affected-count">{log.affected_users} kullanıcı etkilendi</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-logs">
                                    <FaHistory className="empty-icon" />
                                    <p>Henüz log kaydı yok</p>
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

export default RaidProtectionDashboard;

// frontend/src/components/RaidProtectionDashboard.js - Complete Raid Protection UI
import { useState, useEffect, useRef } from 'react';
import {
    FaShieldAlt, FaLock, FaUnlock, FaExclamationTriangle, FaUserShield,
    FaHistory, FaCog, FaBan, FaCheck, FaTimes, FaUsers, FaRobot,
    FaClock, FaChartLine, FaEye, FaBell, FaQuestionCircle
} from 'react-icons/fa';
import toast from '../utils/toast';
import './RaidProtectionDashboard.css';
import confirmDialog from '../utils/confirmDialog';

const RaidProtectionDashboard = ({ serverId, apiBaseUrl, onClose }) => {
    const [view, setView] = useState('overview'); // 'overview', 'settings', 'logs', 'verify'
    const [protectionStatus, setProtectionStatus] = useState({
        enabled: false,
        level: 'medium',
        lockdown_active: false,
        verification_required: false,
        auto_ban_enabled: true
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [pendingVerifications, setPendingVerifications] = useState([]);
    const [raidLogs, setRaidLogs] = useState([]);
    const [settings, setSettings] = useState({
        join_rate_limit: 10,
        join_time_window: 60,
        mention_limit: 10,
        message_rate_limit: 15,
        new_account_threshold: 7,
        auto_ban_suspicious: true,
        captcha_on_join: false,
        dm_on_join_warning: true
    });
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        blocked_today: 0,
        verified_today: 0,
        raids_detected: 0,
        suspicious_accounts: 0
    });
    const activityRef = useRef(null);

    useEffect(() => {
        fetchProtectionStatus();
        fetchRecentActivity();
        fetchPendingVerifications();
        fetchRaidLogs();

        // Real-time activity updates
        const interval = setInterval(fetchRecentActivity, 5000);
        return () => clearInterval(interval);
    }, [serverId]);

    const fetchProtectionStatus = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/status/${serverId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setProtectionStatus(data.status || protectionStatus);
                setSettings(data.settings || settings);
                setStats(data.stats || stats);
            }
        } catch (error) {
            console.error('Fetch protection status error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchRecentActivity = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/activity/${serverId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setRecentActivity(data.activity || []);
            }
        } catch (error) {
            console.error('Fetch activity error:', error);
        }
    };

    const fetchPendingVerifications = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/pending/${serverId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setPendingVerifications(data.pending || []);
            }
        } catch (error) {
            console.error('Fetch pending error:', error);
        }
    };

    const fetchRaidLogs = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/logs/${serverId}/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setRaidLogs(data.logs || []);
            }
        } catch (error) {
            console.error('Fetch logs error:', error);
        }
    };

    const handleToggleProtection = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const endpoint = protectionStatus.enabled ? 'disable' : 'enable';
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/${endpoint}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: serverId })
            });

            if (response.ok) {
                setProtectionStatus({ ...protectionStatus, enabled: !protectionStatus.enabled });
                toast.success(protectionStatus.enabled ? '🔓 Raid koruması devre dışı' : '🛡️ Raid koruması aktif!');
            }
        } catch (error) {
            console.error('Toggle protection error:', error);
        }
    };

    const handleLockdown = async () => {
        const confirmed = await confirmDialog(
            protectionStatus.lockdown_active
                ? 'Sunucu kilidini açmak istediğinizden emin misiniz?'
                : 'UYARI: Bu işlem sunucuyu kilitleyecek. Yeni üyeler katılamayacak. Devam?'
        );
        if (!confirmed) return;

        try {
            const token = localStorage.getItem('access_token');
            const endpoint = protectionStatus.lockdown_active ? 'unlock' : 'lockdown';
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/${endpoint}/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: serverId })
            });

            if (response.ok) {
                setProtectionStatus({ ...protectionStatus, lockdown_active: !protectionStatus.lockdown_active });
                toast.success(protectionStatus.lockdown_active ? '🔓 Sunucu kilidi açıldı' : '🔒 Sunucu kilitlendi!');
            }
        } catch (error) {
            console.error('Lockdown error:', error);
        }
    };

    const handleVerifyUser = async (userId, action) => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/verify/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    server_id: serverId,
                    user_id: userId,
                    action: action // 'approve' or 'reject'
                })
            });

            if (response.ok) {
                setPendingVerifications(pendingVerifications.filter(u => u.id !== userId));
                toast.success(action === 'approve' ? '✅ Kullanıcı onaylandı' : '❌ Kullanıcı reddedildi');
            }
        } catch (error) {
            console.error('Verify user error:', error);
        }
    };

    const handleSaveSettings = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/settings/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: serverId, ...settings })
            });

            if (response.ok) {
                toast.success('✅ Ayarlar kaydedildi!');
            }
        } catch (error) {
            console.error('Save settings error:', error);
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'join': return '👋';
            case 'leave': return '🚪';
            case 'kick': return '👢';
            case 'ban': return '🔨';
            case 'suspicious': return '⚠️';
            case 'raid_detected': return '🚨';
            case 'verified': return '✅';
            default: return '📋';
        }
    };

    const getActivityColor = (type) => {
        switch (type) {
            case 'join': return '#23a559';
            case 'leave': return '#f0b132';
            case 'kick': case 'ban': return '#da373c';
            case 'suspicious': case 'raid_detected': return '#f0b132';
            case 'verified': return '#5865f2';
            default: return '#72767d';
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    };

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
                    <button
                        className={`nav-btn ${view === 'overview' ? 'active' : ''}`}
                        onClick={() => setView('overview')}
                    >
                        <FaChartLine /> Genel Bakış
                    </button>
                    <button
                        className={`nav-btn ${view === 'verify' ? 'active' : ''}`}
                        onClick={() => setView('verify')}
                    >
                        <FaUserShield /> Doğrulama
                        {pendingVerifications.length > 0 && (
                            <span className="badge">{pendingVerifications.length}</span>
                        )}
                    </button>
                    <button
                        className={`nav-btn ${view === 'logs' ? 'active' : ''}`}
                        onClick={() => setView('logs')}
                    >
                        <FaHistory /> Loglar
                    </button>
                    <button
                        className={`nav-btn ${view === 'settings' ? 'active' : ''}`}
                        onClick={() => setView('settings')}
                    >
                        <FaCog /> Ayarlar
                    </button>
                </div>

                <div className="dashboard-content">
                    {/* Overview View */}
                    {view === 'overview' && (
                        <div className="overview-view">
                            <div className="quick-actions">
                                <button
                                    className={`action-btn ${protectionStatus.enabled ? 'enabled' : ''}`}
                                    onClick={handleToggleProtection}
                                >
                                    <FaShieldAlt />
                                    {protectionStatus.enabled ? 'Korumayı Kapat' : 'Korumayı Aç'}
                                </button>
                                <button
                                    className={`action-btn lockdown ${protectionStatus.lockdown_active ? 'active' : ''}`}
                                    onClick={handleLockdown}
                                >
                                    {protectionStatus.lockdown_active ? <FaUnlock /> : <FaLock />}
                                    {protectionStatus.lockdown_active ? 'Kilidi Aç' : 'Sunucuyu Kilitle'}
                                </button>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-icon blocked">
                                        <FaBan />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.blocked_today}</span>
                                        <span className="stat-label">Bugün Engellenen</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon verified">
                                        <FaCheck />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.verified_today}</span>
                                        <span className="stat-label">Bugün Doğrulanan</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon raids">
                                        <FaExclamationTriangle />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.raids_detected}</span>
                                        <span className="stat-label">Tespit Edilen Raid</span>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon suspicious">
                                        <FaEye />
                                    </div>
                                    <div className="stat-info">
                                        <span className="stat-value">{stats.suspicious_accounts}</span>
                                        <span className="stat-label">Şüpheli Hesap</span>
                                    </div>
                                </div>
                            </div>

                            <div className="activity-section">
                                <h3><FaClock /> Canlı Aktivite</h3>
                                <div className="activity-feed" ref={activityRef}>
                                    {recentActivity.length > 0 ? (
                                        recentActivity.map((activity, idx) => (
                                            <div
                                                key={idx}
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
                                            <p>Henüz aktivite yok</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Verification View */}
                    {view === 'verify' && (
                        <div className="verify-view">
                            <h3><FaUserShield /> Bekleyen Doğrulamalar</h3>

                            {pendingVerifications.length > 0 ? (
                                <div className="verifications-list">
                                    {pendingVerifications.map(user => (
                                        <div key={user.id} className="verification-card">
                                            <img
                                                src={user.avatar || '/default-avatar.png'}
                                                alt={user.username}
                                                className="user-avatar"
                                            />
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
                                                <button
                                                    className="approve-btn"
                                                    onClick={() => handleVerifyUser(user.id, 'approve')}
                                                >
                                                    <FaCheck /> Onayla
                                                </button>
                                                <button
                                                    className="reject-btn"
                                                    onClick={() => handleVerifyUser(user.id, 'reject')}
                                                >
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

                    {/* Logs View */}
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
                                                <span className="affected-count">
                                                    {log.affected_users} kullanıcı etkilendi
                                                </span>
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

                    {/* Settings View */}
                    {view === 'settings' && (
                        <div className="settings-view">
                            <h3><FaCog /> Koruma Ayarları</h3>

                            <div className="settings-section">
                                <h4>Katılım Limitleri</h4>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <label>Katılım Hız Limiti</label>
                                        <p>Belirli süre içinde maksimum katılım sayısı</p>
                                    </div>
                                    <div className="setting-control">
                                        <input
                                            type="number"
                                            value={settings.join_rate_limit}
                                            onChange={(e) => setSettings({ ...settings, join_rate_limit: parseInt(e.target.value) })}
                                            min="1"
                                            max="100"
                                        />
                                        <span>kişi /</span>
                                        <input
                                            type="number"
                                            value={settings.join_time_window}
                                            onChange={(e) => setSettings({ ...settings, join_time_window: parseInt(e.target.value) })}
                                            min="10"
                                            max="300"
                                        />
                                        <span>saniye</span>
                                    </div>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <label>Yeni Hesap Eşiği</label>
                                        <p>Bu günden eski hesaplar şüpheli sayılır</p>
                                    </div>
                                    <div className="setting-control">
                                        <input
                                            type="number"
                                            value={settings.new_account_threshold}
                                            onChange={(e) => setSettings({ ...settings, new_account_threshold: parseInt(e.target.value) })}
                                            min="1"
                                            max="30"
                                        />
                                        <span>gün</span>
                                    </div>
                                </div>
                            </div>

                            <div className="settings-section">
                                <h4>Mesaj Limitleri</h4>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <label>Mention Limiti</label>
                                        <p>Bir mesajdaki maksimum mention sayısı</p>
                                    </div>
                                    <div className="setting-control">
                                        <input
                                            type="number"
                                            value={settings.mention_limit}
                                            onChange={(e) => setSettings({ ...settings, mention_limit: parseInt(e.target.value) })}
                                            min="1"
                                            max="50"
                                        />
                                    </div>
                                </div>

                                <div className="setting-item">
                                    <div className="setting-info">
                                        <label>Mesaj Hız Limiti</label>
                                        <p>10 saniyede maksimum mesaj sayısı</p>
                                    </div>
                                    <div className="setting-control">
                                        <input
                                            type="number"
                                            value={settings.message_rate_limit}
                                            onChange={(e) => setSettings({ ...settings, message_rate_limit: parseInt(e.target.value) })}
                                            min="1"
                                            max="50"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="settings-section">
                                <h4>Otomatik Aksiyonlar</h4>

                                <div className="setting-item toggle">
                                    <div className="setting-info">
                                        <label>Şüpheli Hesapları Otomatik Banla</label>
                                        <p>Raid tespit edildiğinde şüpheli hesapları otomatik banla</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.auto_ban_suspicious}
                                            onChange={(e) => setSettings({ ...settings, auto_ban_suspicious: e.target.checked })}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>

                                <div className="setting-item toggle">
                                    <div className="setting-info">
                                        <label>Katılımda CAPTCHA</label>
                                        <p>Yeni üyeler katılırken CAPTCHA doğrulaması iste</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.captcha_on_join}
                                            onChange={(e) => setSettings({ ...settings, captcha_on_join: e.target.checked })}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>

                                <div className="setting-item toggle">
                                    <div className="setting-info">
                                        <label>Katılım Uyarı DM</label>
                                        <p>Şüpheli hesap katıldığında yöneticilere DM gönder</p>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={settings.dm_on_join_warning}
                                            onChange={(e) => setSettings({ ...settings, dm_on_join_warning: e.target.checked })}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>

                            <div className="settings-actions">
                                <button className="save-btn" onClick={handleSaveSettings}>
                                    Ayarları Kaydet
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RaidProtectionDashboard;

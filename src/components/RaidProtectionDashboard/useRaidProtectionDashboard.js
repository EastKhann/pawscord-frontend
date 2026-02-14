import { useState, useEffect, useRef } from 'react';
import toast from '../../utils/toast';

export const getActivityIcon = (type) => {
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

export const getActivityColor = (type) => {
    switch (type) {
        case 'join': return '#23a559';
        case 'leave': return '#f0b132';
        case 'kick': case 'ban': return '#da373c';
        case 'suspicious': case 'raid_detected': return '#f0b132';
        case 'verified': return '#5865f2';
        default: return '#72767d';
    }
};

export const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
};

const useRaidProtectionDashboard = (serverId, apiBaseUrl) => {
    const [view, setView] = useState('overview');
    const [protectionStatus, setProtectionStatus] = useState({ enabled: false, lockdown_active: false });
    const [recentActivity, setRecentActivity] = useState([]);
    const [pendingVerifications, setPendingVerifications] = useState([]);
    const [raidLogs, setRaidLogs] = useState([]);
    const [settings, setSettings] = useState({
        join_rate_limit: 10,
        join_time_window: 60,
        mention_limit: 10,
        message_rate_limit: 15,
        new_account_threshold: 7,
        auto_ban_suspicious: false,
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

    const fetchProtectionStatus = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/status/?server_id=${serverId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setProtectionStatus(data.status || data);
                if (data.settings) setSettings(data.settings);
                if (data.stats) setStats(data.stats);
            }
        } catch (error) {
            console.error('Fetch protection status error:', error);
        }
    };

    const fetchRecentActivity = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/activity/?server_id=${serverId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setRecentActivity(data.activities || []);
            }
        } catch (error) {
            console.error('Fetch activity error:', error);
        }
    };

    const fetchPendingVerifications = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/pending/?server_id=${serverId}`, {
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
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/logs/?server_id=${serverId}`, {
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

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([
                fetchProtectionStatus(),
                fetchRecentActivity(),
                fetchPendingVerifications(),
                fetchRaidLogs()
            ]);
            setLoading(false);
        };
        loadData();

        const interval = setInterval(fetchRecentActivity, 5000);
        return () => clearInterval(interval);
    }, [serverId]);

    const handleToggleProtection = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await fetch(`${apiBaseUrl}/moderation/raid-protection/toggle/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ server_id: serverId, enabled: !protectionStatus.enabled })
            });

            if (response.ok) {
                setProtectionStatus({ ...protectionStatus, enabled: !protectionStatus.enabled });
                toast.success(protectionStatus.enabled ? '⚠️ Koruma kapatıldı' : '🛡️ Koruma aktif!');
            }
        } catch (error) {
            console.error('Toggle protection error:', error);
        }
    };

    const handleLockdown = async () => {
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
                    action: action
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

    return {
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
    };
};

export default useRaidProtectionDashboard;

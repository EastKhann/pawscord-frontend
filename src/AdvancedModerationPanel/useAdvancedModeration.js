import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { getToken } from '../utils/tokenStorage';
import confirmDialog from '../utils/confirmDialog';
import logger from '../utils/logger';
import { API_BASE_URL } from '../utils/apiEndpoints';

const useAdvancedModeration = (serverId) => {
    const { t } = useTranslation();
    const [selectedUser, setSelectedUser] = useState(null);
    const [timeoutDuration, setTimeoutDuration] = useState(60);
    const [timeoutReason, setTimeoutReason] = useState('');
    const [massActionType, setMassActionType] = useState('');
    const [massActionCriteria, setMassActionCriteria] = useState('');
    const [warnings, setWarnings] = useState([]);
    const [raidProtection, setRaidProtection] = useState(false);
    const [raidSettings, setRaidSettings] = useState({
        threshold: 10,
        timeWindow: 60,
        action: 'kick',
    });
    const [moderationLogs, setModerationLogs] = useState([]);
    const [automodRules, setAutomodRules] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const authHeader = () => ({ Authorization: `Bearer ${getToken()}` });

    const fetchWarnings = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/warnings/${serverId}/`, {
                headers: authHeader(),
            });
            if (res.ok) {
                const data = await res.json();
                setWarnings(data.warnings || []);
            }
        } catch (err) {
            logger.error('Failed to fetch warnings:', err);
        }
    };

    const fetchRaidSettings = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/raid-protection/${serverId}/`, {
                headers: authHeader(),
            });
            if (res.ok) {
                const data = await res.json();
                setRaidProtection(data.enabled || false);
                if (data.settings) setRaidSettings(data.settings);
            }
        } catch (err) {
            logger.error('Failed to fetch raid settings:', err);
        }
    };

    const fetchModerationLogs = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/logs/${serverId}/`, {
                headers: authHeader(),
            });
            if (res.ok) {
                const data = await res.json();
                setModerationLogs(data.logs || []);
            }
        } catch (err) {
            logger.error('Failed to fetch logs:', err);
        }
    };

    const fetchAutomodRules = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/automod/${serverId}/`, {
                headers: authHeader(),
            });
            if (res.ok) {
                const data = await res.json();
                setAutomodRules(data.rules || []);
            }
        } catch (err) {
            logger.error('Failed to fetch automod rules:', err);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            fetchWarnings(),
            fetchRaidSettings(),
            fetchModerationLogs(),
            fetchAutomodRules(),
        ])
            .catch((err) => logger.error('Failed to fetch moderation data:', err))
            .finally(() => setIsLoading(false));
    }, [serverId]);

    const showToast = (message, type) => {};

    const timeoutUser = async () => {
        if (!selectedUser) {
            showToast('Lütfen bir kullanıcı seçin', 'error');
            return;
        }
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/timeout/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    user_id: selectedUser.id,
                    duration: timeoutDuration,
                    reason: timeoutReason,
                }),
            });
            if (res.ok) {
                showToast(
                    t('advMod.timeoutApplied', { user: selectedUser.username, duration: timeoutDuration }),
                    'success'
                );
                setSelectedUser(null);
                setTimeoutDuration(60);
                setTimeoutReason('');
                fetchModerationLogs();
            } else throw new Error('Timeout failed');
        } catch (err) {
            logger.error('Failed to timeout user:', err);
            showToast('Kullanıcıya zaman aşımı uygulanamadı', 'error');
        }
    };

    const executeMassAction = async () => {
        if (!massActionType || !massActionCriteria) {
            showToast('Lütfen eylem tipi ve kriter seçin', 'error');
            return;
        }
        if (!(await confirmDialog(`Execute mass ${massActionType}? This cannot be undone.`)))
            return;
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/mass-action/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    action: massActionType,
                    criteria: massActionCriteria,
                }),
            });
            if (res.ok) {
                const data = await res.json();
                showToast(
                    t('advMod.massActionComplete', { count: data.affected_count }),
                    'success'
                );
                setMassActionType('');
                setMassActionCriteria('');
                fetchModerationLogs();
            } else throw new Error('Mass action failed');
        } catch (err) {
            logger.error('Failed to execute mass action:', err);
            showToast('Toplu eylem gerçekleştirilemedi', 'error');
        }
    };

    const toggleRaidProtection = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/raid-protection/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    enabled: !raidProtection,
                    settings: raidSettings,
                }),
            });
            if (res.ok) {
                setRaidProtection(!raidProtection);
                showToast(
                    t(!raidProtection ? 'advMod.raidEnabled' : 'advMod.raidDisabled'),
                    'success'
                );
            } else throw new Error('Failed to toggle raid protection');
        } catch (err) {
            logger.error('Failed to toggle raid protection:', err);
            showToast('Baskın koruması güncellenemedi', 'error');
        }
    };

    const updateRaidSettings = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/raid-protection/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    enabled: raidProtection,
                    settings: raidSettings,
                }),
            });
            if (res.ok) showToast('Baskın ayarları güncellendi', 'success');
        } catch (err) {
            logger.error('Failed to update raid settings:', err);
            showToast('Ayarlar güncellenemedi', 'error');
        }
    };

    const issueWarning = async (userId, reason) => {
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/warning/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: serverId, user_id: userId, reason }),
            });
            if (res.ok) {
                showToast('Uyarı verildi', 'success');
                fetchWarnings();
                fetchModerationLogs();
            }
        } catch (err) {
            logger.error('Failed to issue warning:', err);
            showToast('Uyarı verilemedi', 'error');
        }
    };

    const clearWarnings = async (userId) => {
        if (!(await confirmDialog('Clear all warnings for this user?'))) return;
        try {
            const res = await fetch(`${API_BASE_URL}/moderation/warning/${userId}/clear/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: serverId }),
            });
            if (res.ok) {
                showToast('Uyarılar temizlendi', 'success');
                fetchWarnings();
            }
        } catch (err) {
            logger.error('Failed to clear warnings:', err);
            showToast('Uyarılar temizlenemedi', 'error');
        }
    };

    const formatDuration = (minutes) => {
        if (minutes < 60) return `${minutes}m`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    };

    return {
        selectedUser,
        setSelectedUser,
        timeoutDuration,
        setTimeoutDuration,
        timeoutReason,
        setTimeoutReason,
        massActionType,
        setMassActionType,
        massActionCriteria,
        setMassActionCriteria,
        warnings,
        raidProtection,
        raidSettings,
        setRaidSettings,
        moderationLogs,
        automodRules,
        isLoading,
        timeoutUser,
        executeMassAction,
        toggleRaidProtection,
        updateRaidSettings,
        issueWarning,
        clearWarnings,
        formatDuration,
    };
};

export const getLogIcon = (action) => {
    const icons = {
        timeout: 'clock',
        kick: 'door-open',
        ban: 'ban',
        warn: 'exclamation-triangle',
        unban: 'check',
        role_add: 'plus',
        role_remove: 'minus',
    };
    return icons[action] || 'info-circle';
};

export default useAdvancedModeration;

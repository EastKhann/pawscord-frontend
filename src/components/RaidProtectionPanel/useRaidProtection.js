import { useState, useEffect } from 'react';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

const useRaidProtection = (serverId, fetchWithAuth, apiBaseUrl) => {
    const [protection, setProtection] = useState({
        enabled: false,
        join_rate_limit: 10,
        new_account_age: 7,
        verification_level: 'medium',
        auto_kick_suspicious: true,
        lockdown_mode: false
    });
    const [raidActivity, setRaidActivity] = useState([]);
    const [stats, setStats] = useState({
        blocked_joins: 0,
        kicked_users: 0,
        raid_attempts: 0,
        last_raid: null
    });
    const [loading, setLoading] = useState(true);

    const loadProtection = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/${serverId}/`);
            if (res.ok) setProtection(await res.json());
        } catch (error) {
            console.error('Failed to load raid protection:', error);
        }
        setLoading(false);
    };

    const checkRaidActivity = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/check/`, {
                method: 'POST',
                body: JSON.stringify({ server_id: serverId })
            });
            if (res.ok) {
                const data = await res.json();
                setRaidActivity(data.recent_activity || []);
                if (data.raid_detected) {
                    toast.error(`\u26a0\ufe0f RAID DETECTED!\n${data.message}\n\nAutomatic protection activated.`);
                }
            }
        } catch (error) {
            console.error('Failed to check raid activity:', error);
        }
    };

    useEffect(() => {
        loadProtection();
        checkRaidActivity();
        const interval = setInterval(checkRaidActivity, 30000);
        return () => clearInterval(interval);
    }, [serverId]);

    const toggleProtection = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/enable/`, {
                method: 'POST',
                body: JSON.stringify({ server_id: serverId, enabled: !protection.enabled })
            });
            if (res.ok) setProtection({ ...protection, enabled: !protection.enabled });
        } catch (error) {
            console.error('Failed to toggle raid protection:', error);
        }
    };

    const updateSetting = async (key, value) => {
        const updated = { ...protection, [key]: value };
        setProtection(updated);
        try {
            await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/update/`, {
                method: 'POST',
                body: JSON.stringify({ server_id: serverId, ...updated })
            });
        } catch (error) {
            console.error('Failed to update setting:', error);
        }
    };

    const activateLockdown = async () => {
        if (!await confirmDialog('\u26a0\ufe0f LOCKDOWN MODE\n\nThis will:\n- Block all new joins\n- Require manual approval for each user\n- Kick suspicious accounts\n\nActivate?')) return;
        try {
            await updateSetting('lockdown_mode', true);
            toast.success('\ud83d\udd12 Lockdown Mode Activated!');
        } catch (error) {
            console.error('Failed to activate lockdown:', error);
        }
    };

    return {
        protection, raidActivity, stats, loading,
        toggleProtection, updateSetting, activateLockdown
    };
};

export default useRaidProtection;

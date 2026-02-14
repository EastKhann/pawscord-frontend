// frontend/src/components/UserWarningsPanel/hooks/useWarnings.js
import { useState, useEffect, useCallback } from 'react';
import toast from '../../../utils/toast';
import confirmDialog from '../../../utils/confirmDialog';

const useWarnings = (serverId, fetchWithAuth, apiBaseUrl) => {
    const [warnings, setWarnings] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_warnings: 0, active_warnings: 0,
        expired_warnings: 0, auto_banned_users: 0
    });

    const loadWarnings = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/${serverId}/`);
            if (res.ok) {
                const data = await res.json();
                setWarnings(data.results || data);
            }
        } catch (error) { console.error('Failed to load warnings:', error); }
        setLoading(false);
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    const loadUsers = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/members/`);
            if (res.ok) setUsers(await res.json());
        } catch (error) { console.error('Failed to load users:', error); }
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    const loadStats = useCallback(async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/stats/${serverId}/`);
            if (res.ok) setStats(await res.json());
        } catch (error) { console.error('Failed to load stats:', error); }
    }, [serverId, fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        loadWarnings();
        loadUsers();
        loadStats();
    }, [loadWarnings, loadUsers, loadStats]);

    const banUser = useCallback(async (userId, reason) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/ban/`, {
                method: 'POST',
                body: JSON.stringify({ server: serverId, user: userId, reason })
            });
            if (res.ok) {
                toast.success('✅ User banned successfully');
                loadWarnings();
                loadStats();
            }
        } catch (error) { console.error('Failed to ban user:', error); }
    }, [serverId, fetchWithAuth, apiBaseUrl, loadWarnings, loadStats]);

    const addWarning = useCallback(async (newWarning) => {
        if (!newWarning.user_id || !newWarning.reason) {
            toast.error('❌ Please select a user and provide a reason');
            return false;
        }
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/create/`, {
                method: 'POST',
                body: JSON.stringify({
                    server: serverId, user: newWarning.user_id,
                    reason: newWarning.reason, severity: newWarning.severity,
                    expires_at: new Date(Date.now() + newWarning.expires_in_days * 24 * 60 * 60 * 1000).toISOString(),
                    is_auto: false
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.total_warnings >= newWarning.auto_ban_on) {
                    if (await confirmDialog(`User has ${data.total_warnings} warnings. Auto-ban now?`)) {
                        await banUser(newWarning.user_id, `Auto-ban: ${newWarning.auto_ban_on} warnings reached`);
                    }
                }
                loadWarnings();
                loadStats();
                return true;
            } else {
                toast.error('❌ Failed to add warning');
            }
        } catch (error) { console.error('Failed to add warning:', error); }
        return false;
    }, [serverId, fetchWithAuth, apiBaseUrl, banUser, loadWarnings, loadStats]);

    const removeWarning = useCallback(async (warningId) => {
        if (!await confirmDialog('Remove this warning?')) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/moderation/warnings/${warningId}/`, { method: 'DELETE' });
            if (res.ok) { loadWarnings(); loadStats(); }
            else toast.error('❌ Failed to remove warning');
        } catch (error) { console.error('Failed to remove warning:', error); }
    }, [fetchWithAuth, apiBaseUrl, loadWarnings, loadStats]);

    return { warnings, users, loading, stats, addWarning, removeWarning, banUser };
};

export default useWarnings;

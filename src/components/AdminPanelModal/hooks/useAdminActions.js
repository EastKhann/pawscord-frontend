import { useState } from 'react';
import toast from '../../../utils/toast';

const useAdminActions = ({ fetchWithAuth, apiBaseUrl, refetchUsers, refetchBannedUsers, refetchServers }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [actionModal, setActionModal] = useState(null);
    const [editUserModal, setEditUserModal] = useState(null);
    const [editUserForm, setEditUserForm] = useState({});
    const [editUserLoading, setEditUserLoading] = useState(false);
    const [selectedServer, setSelectedServer] = useState(null);
    const [serverDetailLoading, setServerDetailLoading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [broadcastModal, setBroadcastModal] = useState(false);
    const [announceText, setAnnounceText] = useState('');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [passwordResetModal, setPasswordResetModal] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [backupStatus, setBackupStatus] = useState(null);
    const [userActivityModal, setUserActivityModal] = useState(null);

    const handleUserAction = async (action, userId, extra = {}) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/user-action/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, user_id: userId, ...extra })
            });
            if (res.ok) {
                toast.success(`\u2705 ${action} i\u015Flemi ba\u015Far\u0131l\u0131!`);
                refetchUsers();
                if (action === 'ban') refetchBannedUsers();
            } else { toast.error('\u274C \u0130\u015Flem ba\u015Far\u0131s\u0131z!'); }
        } catch (err) { toast.error('\u274C Hata olu\u015Ftu!'); }
        setActionModal(null);
        setSelectedUser(null);
    };

    const handleBroadcast = async () => {
        if (!announceText.trim()) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/broadcast/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: announceText })
            });
            if (res.ok) { toast.success('\uD83D\uDCE2 Duyuru g\u00F6nderildi!'); setAnnounceText(''); setBroadcastModal(false); }
        } catch (err) { toast.error('\u274C Duyuru g\u00F6nderilemedi!'); }
    };

    const handleBackup = async () => {
        setBackupStatus('running');
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/backup/`, { method: 'POST' });
            if (res.ok) { setBackupStatus('success'); toast.success('\u2705 Yedekleme tamamland\u0131!'); }
            else { setBackupStatus('error'); }
        } catch (err) { setBackupStatus('error'); }
    };

    const handleClearCache = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/clear-cache/`, { method: 'POST' });
            if (res.ok) { toast.success('\uD83E\uDDF9 Cache temizlendi!'); }
        } catch (err) { toast.error('\u274C Cache temizlenemedi!'); }
    };

    const toggleMaintenance = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/maintenance/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled: !maintenanceMode })
            });
            if (res.ok) {
                setMaintenanceMode(!maintenanceMode);
                toast.success(maintenanceMode ? '\u2705 Bak\u0131m modu kapat\u0131ld\u0131!' : '\uD83D\uDD27 Bak\u0131m modu a\u00E7\u0131ld\u0131!');
            }
        } catch (err) { toast.error('\u274C Hata!'); }
    };

    const openEditUserModal = (user) => {
        setEditUserForm({
            username: user.username || '', email: user.email || '',
            coins: user.coins || 0, level: user.level || 1, xp: user.xp || 0,
            role: user.role || 'member', is_active: user.is_active !== false,
            is_staff: user.is_staff || false, is_premium: user.is_premium || false,
            status_message: user.status_message || '', email_verified: user.email_verified || false,
        });
        setEditUserModal(user);
    };

    const handleUpdateUser = async () => {
        if (!editUserModal) return;
        setEditUserLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/update-user/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: editUserModal.id, ...editUserForm })
            });
            if (res.ok) {
                const data = await res.json();
                toast.success(`\u2705 ${data.message}`);
                setEditUserModal(null);
                refetchUsers();
            } else {
                const data = await res.json();
                toast.error(`\u274C ${data.error || 'G\u00FCncelleme ba\u015Far\u0131s\u0131z!'}`);
            }
        } catch (err) { toast.error('\u274C Hata olu\u015Ftu!'); }
        setEditUserLoading(false);
    };

    const handleServerDetails = async (server) => {
        setServerDetailLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/server-action/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'details', server_id: server.id })
            });
            if (res.ok) { setSelectedServer(await res.json()); }
            else { toast.error('\u274C Sunucu detaylar\u0131 y\u00FCklenemedi!'); }
        } catch (err) { toast.error('\u274C Hata olu\u015Ftu!'); }
        setServerDetailLoading(false);
    };

    const handleServerDelete = async (serverId, serverName) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/server-action/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', server_id: serverId })
            });
            if (res.ok) {
                toast.success(`\u2705 "${serverName}" sunucusu silindi!`);
                setDeleteConfirm(null);
                refetchServers();
            } else { toast.error('\u274C Sunucu silinemedi!'); }
        } catch (err) { toast.error('\u274C Hata olu\u015Ftu!'); }
    };

    const handleDeleteOldLogs = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/delete-old-logs/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ days: 30 })
            });
            if (res.ok) { const data = await res.json(); toast.success(`\u2705 ${data.message}`); }
            else { toast.error('\u274C Loglar silinemedi!'); }
        } catch (err) { toast.error('\u274C Hata olu\u015Ftu!'); }
    };

    const handleExportLogs = async (format, logType, logDateFrom, logDateTo) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/logs/export/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: logType === 'all' ? 'audit' : logType, format, date_from: logDateFrom || null, date_to: logDateTo || null, limit: 5000 })
            });
            if (format === 'csv') {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url;
                a.download = `logs_${logType}_${new Date().toISOString().split('T')[0]}.csv`; a.click();
                toast.success('CSV exported successfully!');
            } else {
                const data = await res.json();
                const blob = new Blob([JSON.stringify(data.logs, null, 2)], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a'); a.href = url;
                a.download = `logs_${logType}_${new Date().toISOString().split('T')[0]}.json`; a.click();
                toast.success('JSON exported successfully!');
            }
        } catch (err) { toast.error('Export failed'); }
    };

    const fetchUserActivity = async (userId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/users/${userId}/activity/?limit=50`);
            if (res.ok) { setUserActivityModal(await res.json()); }
        } catch (err) { toast.error('Failed to fetch user activity'); }
    };

    return {
        selectedUser, setSelectedUser, actionModal, setActionModal,
        editUserModal, setEditUserModal, editUserForm, setEditUserForm, editUserLoading,
        selectedServer, setSelectedServer, serverDetailLoading,
        deleteConfirm, setDeleteConfirm,
        broadcastModal, setBroadcastModal, announceText, setAnnounceText,
        maintenanceMode, passwordResetModal, setPasswordResetModal,
        newPassword, setNewPassword, backupStatus,
        userActivityModal, setUserActivityModal,
        handleUserAction, handleBroadcast, handleBackup, handleClearCache,
        toggleMaintenance, openEditUserModal, handleUpdateUser,
        handleServerDetails, handleServerDelete, handleDeleteOldLogs,
        handleExportLogs, fetchUserActivity,
    };
};

export default useAdminActions;

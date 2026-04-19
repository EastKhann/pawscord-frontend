import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../../utils/toast';

const useAdminActions = ({
    fetchWithAuth,
    apiBaseUrl,
    refetchUsers,
    refetchBannedUsers,
    refetchServers,
}) => {
    const { t } = useTranslation();
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
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action, user_id: userId, ...extra }),
            });
            if (res.ok) {
                toast.success(t('admin.panel.operationSuccess', { action }));
                refetchUsers();
                if (action === 'ban') refetchBannedUsers();
            } else {
                toast.error(t('admin.panel.operationFailed'));
            }
        } catch (err) {
            toast.error(t('admin.panel.actionError'));
        }
        setActionModal(null);
        setSelectedUser(null);
    };

    const handleBroadcast = async () => {
        if (!announceText.trim()) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/broadcast/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: announceText }),
            });
            if (res.ok) {
                toast.success(t('admin.panel.announceSent'));
                setAnnounceText('');
                setBroadcastModal(false);
            }
        } catch (err) {
            toast.error(t('admin.panel.announceFailed'));
        }
    };

    const handleBackup = async () => {
        setBackupStatus('running');
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/backup/`, { method: 'POST' });
            if (res.ok) {
                setBackupStatus('success');
                toast.success(t('admin.panel.backupSuccess'));
            } else {
                setBackupStatus('error');
            }
        } catch (err) {
            setBackupStatus('error');
        }
    };

    const handleClearCache = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/clear-cache/`, {
                method: 'POST',
            });
            if (res.ok) {
                toast.success(t('admin.panel.cacheCleared'));
            }
        } catch (err) {
            toast.error(t('admin.panel.cacheClearFailed'));
        }
    };

    const toggleMaintenance = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/maintenance/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ enabled: !maintenanceMode }),
            });
            if (res.ok) {
                setMaintenanceMode(!maintenanceMode);
                toast.success(
                    maintenanceMode
                        ? t('admin.panel.maintenanceOff')
                        : t('admin.panel.maintenanceOn')
                );
            }
        } catch (err) {
            toast.error(t('admin.panel.actionError'));
        }
    };

    const openEditUserModal = (user) => {
        setEditUserForm({
            username: user.username || '',
            email: user.email || '',
            coins: user.coins || 0,
            level: user.level || 1,
            xp: user.xp || 0,
            role: user.role || 'member',
            is_active: user.is_active !== false,
            is_staff: user.is_staff || false,
            is_premium: user.is_premium || false,
            status_message: user.status_message || '',
            email_verified: user.email_verified || false,
        });
        setEditUserModal(user);
    };

    const handleUpdateUser = async () => {
        if (!editUserModal) return;
        setEditUserLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/update-user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: editUserModal.id, ...editUserForm }),
            });
            if (res.ok) {
                const data = await res.json();
                toast.success(data.message);
                refetchUsers();
            } else {
                const data = await res.json();
                toast.error(data.error || t('admin.panel.operationFailed'));
            }
        } catch (err) {
            toast.error(t('admin.panel.actionError'));
        }
        setEditUserLoading(false);
    };

    const handleServerDetails = async (server) => {
        setServerDetailLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/server-action/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'details', server_id: server.id }),
            });
            if (res.ok) {
                setSelectedServer(await res.json());
            } else {
                toast.error(t('admin.panel.serverLoadFailed'));
            }
        } catch (err) {
            toast.error(t('admin.panel.actionError'));
        }
        setServerDetailLoading(false);
    };

    const handleServerDelete = async (serverId, serverName) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/server-action/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'delete', server_id: serverId }),
            });
            if (res.ok) {
                toast.success(t('admin.panel.serverDeleted', { name: serverName }));
                setDeleteConfirm(null);
                refetchServers();
            } else {
                toast.error(t('admin.panel.serverDeleteFailed'));
            }
        } catch (err) {
            toast.error(t('admin.panel.actionError'));
        }
    };

    const handleDeleteOldLogs = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/delete-old-logs/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ days: 30 }),
            });
            if (res.ok) {
                const data = await res.json();
                toast.success(data.message);
            } else {
                toast.error(t('admin.panel.logDeleteFailed'));
            }
        } catch (err) {
            toast.error(t('admin.panel.actionError'));
        }
    };

    const handleExportLogs = async (format, logType, logDateFrom, logDateTo) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/logs/export/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: logType === 'all' ? 'audit' : logType,
                    format,
                    date_from: logDateFrom || null,
                    date_to: logDateTo || null,
                    limit: 5000,
                }),
            });
            if (format === 'csv') {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `logs_${logType}_${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
                toast.success(t('adminActions.csvExported'));
            } else {
                const data = await res.json();
                const blob = new Blob([JSON.stringify(data.logs, null, 2)], {
                    type: 'application/json',
                });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `logs_${logType}_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
                toast.success(t('adminActions.jsonExported'));
            }
        } catch (err) {
            toast.error(t('adminActions.exportFailed'));
        }
    };

    const fetchUserActivity = async (userId) => {
        try {
            const res = await fetchWithAuth(
                `${apiBaseUrl}/api/admin/users/${userId}/activity/?limit=50`
            );
            if (res.ok) {
                setUserActivityModal(await res.json());
            }
        } catch (err) {
            toast.error(t('adminActions.activityFetchFailed'));
        }
    };

    return {
        selectedUser,
        setSelectedUser,
        actionModal,
        setActionModal,
        editUserModal,
        setEditUserModal,
        editUserForm,
        setEditUserForm,
        editUserLoading,
        selectedServer,
        setSelectedServer,
        serverDetailLoading,
        deleteConfirm,
        setDeleteConfirm,
        broadcastModal,
        setBroadcastModal,
        announceText,
        setAnnounceText,
        maintenanceMode,
        passwordResetModal,
        setPasswordResetModal,
        newPassword,
        setNewPassword,
        backupStatus,
        userActivityModal,
        setUserActivityModal,
        handleUserAction,
        handleBroadcast,
        handleBackup,
        handleClearCache,
        toggleMaintenance,
        openEditUserModal,
        handleUpdateUser,
        handleServerDetails,
        handleServerDelete,
        handleDeleteOldLogs,
        handleExportLogs,
        fetchUserActivity,
    };
};

export default useAdminActions;

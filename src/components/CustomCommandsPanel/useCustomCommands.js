import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';

const DEFAULT_COMMAND = {
    name: '',
    description: '',
    response: '',
    trigger_type: 'exact',
    enabled: true,
    cooldown: 0,
    permissions: 'everyone',
    delete_trigger: false,
    embed: false,
    embed_color: '#5865f2',
};

export default function useCustomCommands(serverId) {
    const { t } = useTranslation();
    const [commands, setCommands] = useState([]);
    const [creating, setCreating] = useState(false);
    const [editingCommand, setEditingCommand] = useState(null);
    const [newCommand, setNewCommand] = useState(DEFAULT_COMMAND);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const apiBaseUrl = getApiBase();

    useEffect(() => {
        if (serverId) {
            fetchCommands();
            fetchStats();
        }
    }, [serverId]);

    const authHeaders = () => ({ Authorization: `Bearer ${getToken()}` });
    const jsonHeaders = () => ({ ...authHeaders(), 'Content-Type': 'application/json' });

    const fetchCommands = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/`, {
                headers: authHeaders(),
            });
            if (r.ok) {
                const d = await r.json();
                setCommands(d.commands || []);
            }
        } catch (e) {
            logger.error('Error fetching commands:', e);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/stats/`, {
                headers: authHeaders(),
            });
            if (r.ok) setStats(await r.json());
        } catch (e) {
            logger.error('Error fetching stats:', e);
        }
    };

    const createCommand = async () => {
        if (!newCommand.name || !newCommand.response) {
            toast.error(t('customCommands.nameRequired'));
            return;
        }
        try {
            const r = await fetch(`${apiBaseUrl}/commands/create/`, {
                method: 'POST',
                headers: jsonHeaders(),
                body: JSON.stringify({ server_id: serverId, ...newCommand }),
            });
            if (r.ok) {
                const d = await r.json();
                setCommands((prev) => [...prev, d.command]);
                setNewCommand(DEFAULT_COMMAND);
                setCreating(false);
                toast.success(t('customCommands.created'));
                fetchStats();
            } else toast.error(t('customCommands.createFailed'));
        } catch (e) {
            logger.error('Error creating command:', e);
            toast.error(t('customCommands.connectionError'));
        }
    };

    const updateCommand = async (commandId, updates) => {
        try {
            const r = await fetch(`${apiBaseUrl}/commands/${commandId}/update/`, {
                method: 'POST',
                headers: jsonHeaders(),
                body: JSON.stringify(updates),
            });
            if (r.ok) {
                const d = await r.json();
                setCommands((prev) => prev.map((c) => (c.id === commandId ? d.command : c)));
                setEditingCommand(null);
                toast.success(t('customCommands.updated'));
            } else toast.error(t('customCommands.updateFailed'));
        } catch (e) {
            logger.error('Error updating command:', e);
            toast.error(t('customCommands.connectionError'));
        }
    };

    const deleteCommand = async (commandId) => {
        if (!(await confirmDialog(t('customCmds.deleteConfirm','Are you sure you want to delete this command?')))) return;
        try {
            const r = await fetch(`${apiBaseUrl}/commands/${commandId}/delete/`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (r.ok) {
                setCommands((prev) => prev.filter((c) => c.id !== commandId));
                toast.success(t('customCommands.deleted'));
                fetchStats();
            } else toast.error(t('customCommands.deleteFailed'));
        } catch (e) {
            logger.error('Error deleting command:', e);
            toast.error(t('customCommands.connectionError'));
        }
    };

    const toggleCommand = async (commandId, enabled) => {
        try {
            const r = await fetch(`${apiBaseUrl}/commands/${commandId}/toggle/`, {
                method: 'POST',
                headers: jsonHeaders(),
                body: JSON.stringify({ enabled }),
            });
            if (r.ok) {
                setCommands((prev) =>
                    prev.map((c) => (c.id === commandId ? { ...c, enabled } : c))
                );
                toast.success(enabled ? t('customCommands.enabled') : t('customCommands.disabled'));
            }
        } catch (e) {
            logger.error('Error toggling command:', e);
            toast.error(t('customCommands.toggleFailed'));
        }
    };

    const exportCommands = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/export/`, {
                headers: authHeaders(),
            });
            if (r.ok) {
                const blob = await r.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `commands_${serverId}.json`;
                a.click();
                toast.success(t('customCommands.exported'));
            }
        } catch (e) {
            logger.error('Error exporting commands:', e);
            toast.error(t('customCommands.exportFailed'));
        }
    };

    const importCommands = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('server_id', serverId);
        try {
            const r = await fetch(`${apiBaseUrl}/commands/import/`, {
                method: 'POST',
                headers: authHeaders(),
                body: formData,
            });
            if (r.ok) {
                fetchCommands();
                toast.success(t('customCommands.imported'));
            } else toast.error(t('customCommands.importFailed'));
        } catch (e) {
            logger.error('Error importing commands:', e);
            toast.error(t('customCommands.connectionError'));
        }
    };

    return {
        commands,
        creating,
        setCreating,
        editingCommand,
        setEditingCommand,
        newCommand,
        setNewCommand,
        loading,
        stats,
        createCommand,
        updateCommand,
        deleteCommand,
        toggleCommand,
        exportCommands,
        importCommands,
    };
}

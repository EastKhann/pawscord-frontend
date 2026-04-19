import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';

export default function useWebhooks(serverId) {
    const { t } = useTranslation();
    const [webhooks, setWebhooks] = useState([]);
    const [creating, setCreating] = useState(false);
    const [newWebhook, setNewWebhook] = useState({ name: '', channel_id: '', avatar_url: '' });
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingWebhook, setEditingWebhook] = useState(null);
    const [logs, setLogs] = useState([]);
    const [viewingLogs, setViewingLogs] = useState(null);

    const apiBaseUrl = getApiBase();

    useEffect(() => {
        if (!serverId) return;
        const token = getToken();
        const headers = { Authorization: `Bearer ${token}` };

        Promise.all([
            fetch(`${apiBaseUrl}/webhooks/server/${serverId}/`, { headers }).then((r) =>
                r.ok ? r.json() : null
            ),
            fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers }).then((r) =>
                r.ok ? r.json() : null
            ),
        ])
            .then(([whData, chData]) => {
                if (whData) setWebhooks(whData.webhooks || []);
                if (chData) setChannels(chData.channels || []);
            })
            .catch((err) => logger.error('Error fetching data:', err))
            .finally(() => setLoading(false));
    }, [serverId, apiBaseUrl]);

    const authHeaders = () => {
        const token = getToken();
        return { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
    };

    const createWebhook = async () => {
        if (!newWebhook.name || !newWebhook.channel_id) {
            toast.error(t('webhook.fieldRequired'));
            return;
        }
        try {
            const res = await fetch(`${apiBaseUrl}/webhooks/create/`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify({ server_id: serverId, ...newWebhook }),
            });
            if (res.ok) {
                const d = await res.json();
                setWebhooks((p) => [...p, d.webhook]);
                setNewWebhook({ name: '', channel_id: '', avatar_url: '' });
                setCreating(false);
                toast.success(t('webhook.created'));
            } else toast.error(t('webhook.createFailed'));
        } catch {
            toast.error(t('webhook.connectionError'));
        }
    };

    const updateWebhook = async (webhookId, updates) => {
        try {
            const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/update/`, {
                method: 'POST',
                headers: authHeaders(),
                body: JSON.stringify(updates),
            });
            if (res.ok) {
                const d = await res.json();
                setWebhooks((p) => p.map((w) => (w.id === webhookId ? d.webhook : w)));
                setEditingWebhook(null);
                toast.success(t('webhook.updated'));
            } else toast.error(t('webhook.updateFailed'));
        } catch {
            toast.error(t('webhook.connectionError'));
        }
    };

    const deleteWebhook = async (webhookId) => {
        if (!(await confirmDialog('Bu webhook’u silmek istediğinizden emin misiniz?'))) return;
        try {
            const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, {
                method: 'DELETE',
                headers: authHeaders(),
            });
            if (res.ok) {
                setWebhooks((p) => p.filter((w) => w.id !== webhookId));
                toast.success(t('webhook.deleted'));
            } else toast.error(t('webhook.deleteFailed'));
        } catch {
            toast.error(t('webhook.connectionError'));
        }
    };

    const testWebhook = async (webhookId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/test/`, {
                method: 'POST',
                headers: authHeaders(),
            });
            res.ok ? toast.success(t('webhook.testSent')) : toast.error(t('webhook.testFailed'));
        } catch {
            toast.error(t('webhook.connectionError'));
        }
    };

    const regenerateToken = async (webhookId) => {
        if (
            !(await confirmDialog(
                'Webhook token’ını yenilemek istediğinizden emin misiniz? Eski token geçersiz hale gelecek.'
            ))
        )
            return;
        try {
            const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/regenerate-token/`, {
                method: 'POST',
                headers: authHeaders(),
            });
            if (res.ok) {
                const d = await res.json();
                setWebhooks((p) =>
                    p.map((w) => (w.id === webhookId ? { ...w, token: d.token } : w))
                );
                toast.success(t('webhook.tokenRefreshed'));
            } else toast.error(t('webhook.tokenFailed'));
        } catch {
            toast.error(t('webhook.connectionError'));
        }
    };

    const fetchWebhookLogs = async (webhookId) => {
        try {
            const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/logs/`, {
                headers: authHeaders(),
            });
            if (res.ok) {
                const d = await res.json();
                setLogs(d.logs || []);
                setViewingLogs(webhookId);
            }
        } catch {
            toast.error(t('webhook.logFailed'));
        }
    };

    const copyWebhookUrl = (webhook) => {
        navigator.clipboard.writeText(`${apiBaseUrl}/webhooks/${webhook.id}/${webhook.token}`);
        toast.success(t('webhook.urlCopied'));
    };

    return {
        webhooks,
        creating,
        setCreating,
        newWebhook,
        setNewWebhook,
        channels,
        loading,
        editingWebhook,
        setEditingWebhook,
        logs,
        viewingLogs,
        setViewingLogs,
        apiBaseUrl,
        createWebhook,
        updateWebhook,
        deleteWebhook,
        testWebhook,
        regenerateToken,
        fetchWebhookLogs,
        copyWebhookUrl,
    };
}

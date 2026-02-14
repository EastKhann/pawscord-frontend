import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

export default function useWebhooks(serverId) {
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
    const token = localStorage.getItem('access_token');
    const headers = { 'Authorization': `Bearer ${token}` };

    Promise.all([
      fetch(`${apiBaseUrl}/webhooks/server/${serverId}/`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers }).then(r => r.ok ? r.json() : null)
    ]).then(([whData, chData]) => {
      if (whData) setWebhooks(whData.webhooks || []);
      if (chData) setChannels(chData.channels || []);
    }).catch(err => console.error('Error fetching data:', err))
      .finally(() => setLoading(false));
  }, [serverId, apiBaseUrl]);

  const authHeaders = () => {
    const token = localStorage.getItem('access_token');
    return { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' };
  };

  const createWebhook = async () => {
    if (!newWebhook.name || !newWebhook.channel_id) { toast.error('\u274C Webhook ad\u0131 ve kanal se\u00e7imi zorunludur'); return; }
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/create/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ server_id: serverId, ...newWebhook }) });
      if (res.ok) { const d = await res.json(); setWebhooks(p => [...p, d.webhook]); setNewWebhook({ name: '', channel_id: '', avatar_url: '' }); setCreating(false); toast.success('\u2705 Webhook ba\u015far\u0131yla olu\u015fturuldu'); }
      else toast.error('\u274C Webhook olu\u015fturulamad\u0131');
    } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
  };

  const updateWebhook = async (webhookId, updates) => {
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/update/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(updates) });
      if (res.ok) { const d = await res.json(); setWebhooks(p => p.map(w => w.id === webhookId ? d.webhook : w)); setEditingWebhook(null); toast.success('\u2705 Webhook g\u00fcncellendi'); }
      else toast.error('\u274C Webhook g\u00fcncellenemedi');
    } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
  };

  const deleteWebhook = async (webhookId) => {
    if (!await confirmDialog('Bu webhook\'u silmek istedi\u011finizden emin misiniz?')) return;
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, { method: 'DELETE', headers: authHeaders() });
      if (res.ok) { setWebhooks(p => p.filter(w => w.id !== webhookId)); toast.success('\u2705 Webhook silindi'); }
      else toast.error('\u274C Webhook silinemedi');
    } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
  };

  const testWebhook = async (webhookId) => {
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/test/`, { method: 'POST', headers: authHeaders() });
      res.ok ? toast.success('\u2705 Test mesaj\u0131 g\u00f6nderildi') : toast.error('\u274C Test mesaj\u0131 g\u00f6nderilemedi');
    } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
  };

  const regenerateToken = async (webhookId) => {
    if (!await confirmDialog('Webhook tokenini yenilemek istedi\u011finizden emin misiniz? Eski token ge\u00e7ersiz hale gelecek.')) return;
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/regenerate-token/`, { method: 'POST', headers: authHeaders() });
      if (res.ok) { const d = await res.json(); setWebhooks(p => p.map(w => w.id === webhookId ? { ...w, token: d.token } : w)); toast.success('\u2705 Token yenilendi'); }
      else toast.error('\u274C Token yenilenemedi');
    } catch { toast.error('\u274C Ba\u011flant\u0131 hatas\u0131'); }
  };

  const fetchWebhookLogs = async (webhookId) => {
    try {
      const res = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/logs/`, { headers: authHeaders() });
      if (res.ok) { const d = await res.json(); setLogs(d.logs || []); setViewingLogs(webhookId); }
    } catch { toast.error('\u274C Loglar y\u00fcklenemedi'); }
  };

  const copyWebhookUrl = (webhook) => {
    navigator.clipboard.writeText(`${apiBaseUrl}/webhooks/${webhook.id}/${webhook.token}`);
    toast.success('\u2705 Webhook URL kopyaland\u0131');
  };

  return {
    webhooks, creating, setCreating, newWebhook, setNewWebhook, channels,
    loading, editingWebhook, setEditingWebhook, logs, viewingLogs, setViewingLogs,
    apiBaseUrl, createWebhook, updateWebhook, deleteWebhook, testWebhook,
    regenerateToken, fetchWebhookLogs, copyWebhookUrl
  };
}

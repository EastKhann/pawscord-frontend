import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

const DEFAULT_COMMAND = {
  name: '', description: '', response: '', trigger_type: 'exact',
  enabled: true, cooldown: 0, permissions: 'everyone',
  delete_trigger: false, embed: false, embed_color: '#5865f2'
};

export default function useCustomCommands(serverId) {
  const [commands, setCommands] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editingCommand, setEditingCommand] = useState(null);
  const [newCommand, setNewCommand] = useState(DEFAULT_COMMAND);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const apiBaseUrl = getApiBase();

  useEffect(() => { if (serverId) { fetchCommands(); fetchStats(); } }, [serverId]);

  const getToken = () => localStorage.getItem('access_token');
  const authHeaders = () => ({ 'Authorization': `Bearer ${getToken()}` });
  const jsonHeaders = () => ({ ...authHeaders(), 'Content-Type': 'application/json' });

  const fetchCommands = async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/`, { headers: authHeaders() });
      if (r.ok) { const d = await r.json(); setCommands(d.commands || []); }
    } catch (e) { console.error('Error fetching commands:', e); }
    finally { setLoading(false); }
  };

  const fetchStats = async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/stats/`, { headers: authHeaders() });
      if (r.ok) setStats(await r.json());
    } catch (e) { console.error('Error fetching stats:', e); }
  };

  const createCommand = async () => {
    if (!newCommand.name || !newCommand.response) { toast.error('❌ Komut adı ve yanıt zorunludur'); return; }
    try {
      const r = await fetch(`${apiBaseUrl}/commands/create/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ server_id: serverId, ...newCommand }) });
      if (r.ok) {
        const d = await r.json();
        setCommands(prev => [...prev, d.command]);
        setNewCommand(DEFAULT_COMMAND);
        setCreating(false);
        toast.success('✅ Komut oluşturuldu');
        fetchStats();
      } else toast.error('❌ Komut oluşturulamadı');
    } catch (e) { console.error('Error creating command:', e); toast.error('❌ Bağlantı hatası'); }
  };

  const updateCommand = async (commandId, updates) => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/${commandId}/update/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(updates) });
      if (r.ok) {
        const d = await r.json();
        setCommands(prev => prev.map(c => c.id === commandId ? d.command : c));
        setEditingCommand(null);
        toast.success('✅ Komut güncellendi');
      } else toast.error('❌ Komut güncellenemedi');
    } catch (e) { console.error('Error updating command:', e); toast.error('❌ Bağlantı hatası'); }
  };

  const deleteCommand = async (commandId) => {
    if (!await confirmDialog('Bu komutu silmek istediğinizden emin misiniz?')) return;
    try {
      const r = await fetch(`${apiBaseUrl}/commands/${commandId}/delete/`, { method: 'DELETE', headers: authHeaders() });
      if (r.ok) { setCommands(prev => prev.filter(c => c.id !== commandId)); toast.success('✅ Komut silindi'); fetchStats(); }
      else toast.error('❌ Komut silinemedi');
    } catch (e) { console.error('Error deleting command:', e); toast.error('❌ Bağlantı hatası'); }
  };

  const toggleCommand = async (commandId, enabled) => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/${commandId}/toggle/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ enabled }) });
      if (r.ok) { setCommands(prev => prev.map(c => c.id === commandId ? { ...c, enabled } : c)); toast.success(`✅ Komut ${enabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}`); }
    } catch (e) { console.error('Error toggling command:', e); toast.error('❌ İşlem başarısız'); }
  };

  const exportCommands = async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/commands/server/${serverId}/export/`, { headers: authHeaders() });
      if (r.ok) { const blob = await r.blob(); const url = window.URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `commands_${serverId}.json`; a.click(); toast.success('✅ Komutlar dışa aktarıldı'); }
    } catch (e) { console.error('Error exporting commands:', e); toast.error('❌ Dışa aktarma başarısız'); }
  };

  const importCommands = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('server_id', serverId);
    try {
      const r = await fetch(`${apiBaseUrl}/commands/import/`, { method: 'POST', headers: authHeaders(), body: formData });
      if (r.ok) { fetchCommands(); toast.success('✅ Komutlar içe aktarıldı'); }
      else toast.error('❌ İçe aktarma başarısız');
    } catch (e) { console.error('Error importing commands:', e); toast.error('❌ Bağlantı hatası'); }
  };

  return { commands, creating, setCreating, editingCommand, setEditingCommand, newCommand, setNewCommand, loading, stats, createCommand, updateCommand, deleteCommand, toggleCommand, exportCommands, importCommands };
}

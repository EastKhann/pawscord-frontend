import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

export const INITIAL_GIVEAWAY = {
  title: '', description: '', prize: '', channel_id: '',
  winners_count: 1, duration: 3600, required_role_id: '',
  required_messages: 0, required_invites: 0, allow_multiple_entries: false
};

export const DURATION_OPTIONS = [
  { value: 1800, label: '30 dakika' }, { value: 3600, label: '1 saat' },
  { value: 10800, label: '3 saat' }, { value: 21600, label: '6 saat' },
  { value: 43200, label: '12 saat' }, { value: 86400, label: '1 g\u00FCn' },
  { value: 172800, label: '2 g\u00FCn' }, { value: 259200, label: '3 g\u00FCn' },
  { value: 604800, label: '1 hafta' }
];

export const getStatusBadge = (status) => {
  const badges = {
    active: { text: 'Aktif', color: '#10b981' },
    ended: { text: 'Sonland\u0131', color: '#6b7280' },
    cancelled: { text: '\u0130ptal', color: '#ef4444' }
  };
  return badges[status] || badges.active;
};

export const formatTimeRemaining = (endTime) => {
  const diff = Math.floor((new Date(endTime) - new Date()) / 1000);
  if (diff <= 0) return 'Sona erdi';
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  if (days > 0) return `${days}g ${hours}s kald\u0131`;
  if (hours > 0) return `${hours}s ${minutes}dk kald\u0131`;
  return `${minutes} dakika kald\u0131`;
};

const useGiveaways = (serverId) => {
  const apiBaseUrl = getApiBase();
  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newGiveaway, setNewGiveaway] = useState(INITIAL_GIVEAWAY);

  const authHeaders = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` };

  const fetchGiveaways = async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/server/${serverId}/`, { headers: authHeaders });
      if (r.ok) setGiveaways(await r.json());
    } catch (e) { console.error('Error fetching giveaways:', e); }
    finally { setLoading(false); }
  };

  const fetchChannels = async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, { headers: authHeaders });
      if (r.ok) { const d = await r.json(); setChannels(d.filter(ch => ch.type === 'text')); }
    } catch (e) { console.error('Error fetching channels:', e); }
  };

  const fetchRoles = async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, { headers: authHeaders });
      if (r.ok) setRoles(await r.json());
    } catch (e) { console.error('Error fetching roles:', e); }
  };

  useEffect(() => { fetchGiveaways(); fetchChannels(); fetchRoles(); }, [serverId]);

  const createGiveaway = async () => {
    if (!newGiveaway.title || !newGiveaway.prize || !newGiveaway.channel_id) {
      toast.error('\u274C L\u00FCtfen t\u00FCm gerekli alanlar\u0131 doldurun'); return;
    }
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/create/`, {
        method: 'POST', headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ server_id: serverId, ...newGiveaway })
      });
      if (r.ok) {
        toast.success('\u2705 \u00C7ekili\u015F olu\u015Fturuldu!');
        setShowCreateModal(false); fetchGiveaways(); setNewGiveaway(INITIAL_GIVEAWAY);
      } else { toast.error('\u274C \u00C7ekili\u015F olu\u015Fturulamad\u0131'); }
    } catch (e) { console.error('Error creating giveaway:', e); toast.error('\u274C Ba\u011Flant\u0131 hatas\u0131'); }
  };

  const endGiveaway = async (id) => {
    if (!await confirmDialog('\u00C7ekili\u015Fi sonland\u0131rmak istedi\u011Finize emin misiniz?')) return;
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/${id}/end/`, { method: 'POST', headers: authHeaders });
      if (r.ok) { const d = await r.json(); toast.success(`\u2705 \u00C7ekili\u015F sonland\u0131! Kazananlar: ${d.winners.join(', ')}`); fetchGiveaways(); }
      else toast.error('\u274C \u00C7ekili\u015F sonland\u0131r\u0131lamad\u0131');
    } catch (e) { console.error('Error ending giveaway:', e); toast.error('\u274C Ba\u011Flant\u0131 hatas\u0131'); }
  };

  const rerollGiveaway = async (id) => {
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/${id}/reroll/`, { method: 'POST', headers: authHeaders });
      if (r.ok) { const d = await r.json(); toast.success(`\u2705 Yeni kazanan: ${d.new_winner}`); fetchGiveaways(); }
      else toast.error('\u274C Reroll yap\u0131lamad\u0131');
    } catch (e) { console.error('Error rerolling giveaway:', e); toast.error('\u274C Ba\u011Flant\u0131 hatas\u0131'); }
  };

  const deleteGiveaway = async (id) => {
    if (!await confirmDialog('\u00C7ekili\u015Fi silmek istedi\u011Finize emin misiniz?')) return;
    try {
      const r = await fetch(`${apiBaseUrl}/giveaways/${id}/delete/`, { method: 'DELETE', headers: authHeaders });
      if (r.ok) { toast.success('\u2705 \u00C7ekili\u015F silindi'); fetchGiveaways(); }
      else toast.error('\u274C \u00C7ekili\u015F silinemedi');
    } catch (e) { console.error('Error deleting giveaway:', e); toast.error('\u274C Ba\u011Flant\u0131 hatas\u0131'); }
  };

  return {
    giveaways, loading, showCreateModal, setShowCreateModal, channels, roles,
    newGiveaway, setNewGiveaway, createGiveaway, endGiveaway, rerollGiveaway, deleteGiveaway
  };
};

export default useGiveaways;

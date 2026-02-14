import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

export const INITIAL_POLL = {
  question: '', channel_id: '', duration: 86400,
  allow_multiple_choices: false, anonymous: false, options: ['', '']
};

export const DURATION_OPTIONS = [
  { value: 3600, label: '1 saat' }, { value: 10800, label: '3 saat' },
  { value: 21600, label: '6 saat' }, { value: 43200, label: '12 saat' },
  { value: 86400, label: '1 gün' }, { value: 172800, label: '2 gün' },
  { value: 259200, label: '3 gün' }, { value: 604800, label: '1 hafta' }
];

export const getStatusBadge = (status) => {
  const badges = { active: { text: 'Aktif', color: '#10b981' }, ended: { text: 'Sonlandı', color: '#6b7280' } };
  return badges[status] || badges.active;
};

export const formatTimeRemaining = (endTime) => {
  const diff = Math.floor((new Date(endTime) - new Date()) / 1000);
  if (diff <= 0) return 'Sona erdi';
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  if (days > 0) return `${days}g ${hours}s kaldı`;
  if (hours > 0) return `${hours}s ${minutes}dk kaldı`;
  return `${minutes} dakika kaldı`;
};

export const calculatePercentage = (votes, totalVotes) => totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);

const usePolls = (serverId) => {
  const apiBaseUrl = getApiBase();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const [newPoll, setNewPoll] = useState(INITIAL_POLL);

  const authHeaders = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` };

  useEffect(() => { fetchPolls(); fetchChannels(); }, [serverId]);

  const fetchPolls = async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/polls/server/${serverId}/`, { headers: authHeaders });
      if (r.ok) setPolls(await r.json());
    } catch (e) { console.error('Error fetching polls:', e); }
    finally { setLoading(false); }
  };

  const fetchChannels = async () => {
    try {
      const r = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, { headers: authHeaders });
      if (r.ok) { const d = await r.json(); setChannels(d.filter(ch => ch.type === 'text')); }
    } catch (e) { console.error('Error fetching channels:', e); }
  };

  const createPoll = async () => {
    const validOptions = newPoll.options.filter(o => o.trim());
    if (!newPoll.question || !newPoll.channel_id) { toast.error('❌ Lütfen soru ve kanal seçin'); return; }
    if (validOptions.length < 2) { toast.error('❌ En az 2 seçenek gerekli'); return; }
    try {
      const r = await fetch(`${apiBaseUrl}/polls/create/`, {
        method: 'POST', headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ server_id: serverId, question: newPoll.question, channel_id: newPoll.channel_id, duration: newPoll.duration, allow_multiple_choices: newPoll.allow_multiple_choices, anonymous: newPoll.anonymous, options: validOptions })
      });
      if (r.ok) { toast.success('✅ Anket oluşturuldu!'); setShowCreateModal(false); fetchPolls(); setNewPoll(INITIAL_POLL); }
      else toast.error('❌ Anket oluşturulamadı');
    } catch (e) { console.error('Error creating poll:', e); toast.error('❌ Bağlantı hatası'); }
  };

  const vote = async (pollId, optionId) => {
    try {
      const r = await fetch(`${apiBaseUrl}/polls/${pollId}/vote/`, {
        method: 'POST', headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ option_id: optionId })
      });
      if (r.ok) { toast.success('✅ Oyunuz kaydedildi'); fetchPolls(); }
      else { const d = await r.json(); toast.error(`❌ ${d.error || 'Oy kullanılamadı'}`); }
    } catch (e) { console.error('Error voting:', e); toast.error('❌ Bağlantı hatası'); }
  };

  const endPoll = async (pollId) => {
    if (!await confirmDialog('Anketi sonlandırmak istediğinize emin misiniz?')) return;
    try {
      const r = await fetch(`${apiBaseUrl}/polls/${pollId}/end/`, { method: 'POST', headers: authHeaders });
      if (r.ok) { toast.success('✅ Anket sonlandırıldı'); fetchPolls(); }
      else toast.error('❌ Anket sonlandırılamadı');
    } catch (e) { console.error('Error ending poll:', e); toast.error('❌ Bağlantı hatası'); }
  };

  const deletePoll = async (pollId) => {
    if (!await confirmDialog('Anketi silmek istediğinize emin misiniz?')) return;
    try {
      const r = await fetch(`${apiBaseUrl}/polls/${pollId}/delete/`, { method: 'DELETE', headers: authHeaders });
      if (r.ok) { toast.success('✅ Anket silindi'); fetchPolls(); }
      else toast.error('❌ Anket silinemedi');
    } catch (e) { console.error('Error deleting poll:', e); toast.error('❌ Bağlantı hatası'); }
  };

  const addOption = () => { if (newPoll.options.length < 10) setNewPoll({ ...newPoll, options: [...newPoll.options, ''] }); else toast.warning('⚠️ Maksimum 10 seçenek eklenebilir'); };
  const removeOption = (i) => { if (newPoll.options.length > 2) setNewPoll({ ...newPoll, options: newPoll.options.filter((_, idx) => idx !== i) }); };
  const updateOption = (i, v) => { const opts = [...newPoll.options]; opts[i] = v; setNewPoll({ ...newPoll, options: opts }); };

  return {
    polls, loading, showCreateModal, setShowCreateModal, channels,
    newPoll, setNewPoll, createPoll, vote, endPoll, deletePoll,
    addOption, removeOption, updateOption
  };
};

export default usePolls;

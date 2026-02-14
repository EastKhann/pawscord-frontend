import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

const useBotDeveloper = (apiBaseUrl) => {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list');
  const [newBot, setNewBot] = useState({ name: '', description: '', avatar_url: '' });
  const [analytics, setAnalytics] = useState(null);
  const [webhooks, setWebhooks] = useState([]);
  const [showCredentials, setShowCredentials] = useState(false);

  const getToken = () => localStorage.getItem('access_token');
  const headers = () => ({ 'Authorization': `Bearer ${getToken()}` });
  const jsonHeaders = () => ({ ...headers(), 'Content-Type': 'application/json' });

  const loadBots = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/bots/my/`, { headers: headers() });
      if (res.ok) { const data = await res.json(); setBots(Array.isArray(data) ? data : []); }
    } catch (e) { console.error('Bots fetch error:', e); }
    finally { setLoading(false); }
  };

  const fetchBotAnalytics = async (botId) => {
    try { const res = await fetch(`${apiBaseUrl}/bots/${botId}/analytics/`, { headers: headers() }); if (res.ok) setAnalytics(await res.json()); } catch (e) { console.error('Analytics fetch error:', e); }
  };

  const fetchBotWebhooks = async (botId) => {
    try { const res = await fetch(`${apiBaseUrl}/bots/${botId}/webhooks/`, { headers: headers() }); if (res.ok) { const data = await res.json(); setWebhooks(Array.isArray(data) ? data : data.webhooks || []); } } catch (e) { console.error('Webhooks fetch error:', e); }
  };

  useEffect(() => { loadBots(); }, []);
  useEffect(() => { if (selectedBot && view === 'details') { fetchBotAnalytics(selectedBot.id); fetchBotWebhooks(selectedBot.id); } }, [selectedBot, view]);

  const handleCreateBot = async () => {
    if (!newBot.name.trim()) { toast.error('⚠️ Bot adı gerekli'); return; }
    try {
      const res = await fetch(`${apiBaseUrl}/bots/create/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(newBot) });
      if (res.ok) {
        const data = await res.json();
        setBots([...bots, data]); setSelectedBot(data); setShowCredentials(true); setView('details');
        toast.success('✅ Bot oluşturuldu!');
        setNewBot({ name: '', description: '', avatar_url: '' });
      } else { const err = await res.json(); toast.error(err.error || '❌ Bot oluşturulamadı'); }
    } catch (e) { console.error('Bot creation error:', e); toast.error('❌ Hata oluştu'); }
  };

  const handleCreateWebhook = async (botId) => {
    const url = prompt('Webhook URL:');
    if (!url) return;
    try {
      const res = await fetch(`${apiBaseUrl}/bots/${botId}/webhook/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ url }) });
      if (res.ok) { const data = await res.json(); setWebhooks([...webhooks, data.webhook]); toast.success('✅ Webhook oluşturuldu!'); }
      else toast.error('❌ Webhook oluşturulamadı');
    } catch (e) { console.error('Webhook creation error:', e); }
  };

  const handleDeleteBot = async (botId) => {
    if (!confirm('Bu botu silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`${apiBaseUrl}/bots/${botId}/delete/`, { method: 'DELETE', headers: headers() });
      if (res.ok) { setBots(bots.filter(b => b.id !== botId)); setSelectedBot(null); setView('list'); toast.success('✅ Bot silindi'); }
    } catch (e) { console.error('Delete error:', e); }
  };

  const copyToClipboard = (text, label) => { navigator.clipboard.writeText(text); toast.success(`✅ ${label} kopyalandı!`); };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num?.toString() || '0';
  };

  return {
    bots, selectedBot, setSelectedBot, loading, view, setView,
    newBot, setNewBot, analytics, webhooks, showCredentials, setShowCredentials,
    handleCreateBot, handleCreateWebhook, handleDeleteBot, copyToClipboard, formatNumber,
  };
};

export default useBotDeveloper;

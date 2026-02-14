import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';

const DEFAULT_CONFIG = {
  welcome_enabled: false, welcome_channel_id: '', welcome_message: 'Ho\u015F geldin {user}! {server} sunucusuna kat\u0131ld\u0131n!',
  welcome_embed: false, welcome_embed_color: '#5865f2', welcome_embed_title: 'Ho\u015F Geldin!', welcome_embed_description: '{user} sunucuya kat\u0131ld\u0131!',
  welcome_dm: false, welcome_dm_message: 'Merhaba {user}! {server} sunucusuna ho\u015F geldin!',
  goodbye_enabled: false, goodbye_channel_id: '', goodbye_message: '{user} sunucudan ayr\u0131ld\u0131. Ho\u015F\u00E7a kal!',
  goodbye_embed: false, goodbye_embed_color: '#ed4245',
  auto_role_enabled: false, auto_role_ids: []
};

export const VARIABLES = [
  { code: '{user}', desc: 'Kullan\u0131c\u0131 ad\u0131' },
  { code: '{user_mention}', desc: 'Kullan\u0131c\u0131 mention' },
  { code: '{server}', desc: 'Sunucu ad\u0131' },
  { code: '{member_count}', desc: '\u00DCye say\u0131s\u0131' },
  { code: '{user_id}', desc: 'Kullan\u0131c\u0131 ID' },
];

const useWelcomeMessages = (serverId) => {
  const [welcomeConfig, setWelcomeConfig] = useState(DEFAULT_CONFIG);
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = getApiBase();
  const headers = () => ({ 'Authorization': `Bearer ${localStorage.getItem('access_token')}` });

  const fetchConfig = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/`, { headers: headers() });
      if (res.ok) { const data = await res.json(); if (data.config) setWelcomeConfig(data.config); }
    } catch (e) { console.error('Error fetching config:', e); }
    finally { setLoading(false); }
  };

  const fetchChannels = async () => {
    try { const res = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers: headers() }); if (res.ok) { const d = await res.json(); setChannels(d.channels || []); } } catch (e) { console.error('Error fetching channels:', e); }
  };

  const fetchRoles = async () => {
    try { const res = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, { headers: headers() }); if (res.ok) { const d = await res.json(); setRoles(d.roles || []); } } catch (e) { console.error('Error fetching roles:', e); }
  };

  const fetchStats = async () => {
    try { const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/stats/`, { headers: headers() }); if (res.ok) setStats(await res.json()); } catch (e) { console.error('Error fetching stats:', e); }
  };

  useEffect(() => { if (serverId) { fetchConfig(); fetchChannels(); fetchRoles(); fetchStats(); } }, [serverId]);

  const saveConfig = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/update/`, { method: 'POST', headers: { ...headers(), 'Content-Type': 'application/json' }, body: JSON.stringify(welcomeConfig) });
      if (res.ok) { toast.success('\u2705 Kar\u015F\u0131lama ayarlar\u0131 kaydedildi'); fetchStats(); } else toast.error('\u274C Kaydetme ba\u015Far\u0131s\u0131z');
    } catch (e) { console.error('Error saving config:', e); toast.error('\u274C Kaydetme ba\u015Far\u0131s\u0131z'); }
  };

  const testWelcomeMessage = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/test/`, { method: 'POST', headers: { ...headers(), 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'welcome' }) });
      if (res.ok) toast.success('\u2705 Test mesaj\u0131 g\u00F6nderildi'); else toast.error('\u274C Test mesaj\u0131 g\u00F6nderilemedi');
    } catch (e) { console.error('Error testing message:', e); toast.error('\u274C Test ba\u015Far\u0131s\u0131z'); }
  };

  const updateConfig = (field, value) => setWelcomeConfig({ ...welcomeConfig, [field]: value });
  const insertVariable = (field, variable) => setWelcomeConfig({ ...welcomeConfig, [field]: welcomeConfig[field] + ` ${variable}` });

  return { welcomeConfig, updateConfig, insertVariable, channels, roles, stats, loading, saveConfig, testWelcomeMessage };
};

export default useWelcomeMessages;

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';

const DEFAULT_CONFIG = {
  welcome_enabled: false, welcome_channel_id: '', welcome_message: 'Hoş geldin {user}! {server} sunucusuna katıldın!',
  welcome_embed: false, welcome_embed_color: '#5865f2', welcome_embed_title: 'Hoş Geldin!', welcome_embed_description: '{user} sunucuya katıldı!',
  welcome_dm: false, welcome_dm_message: 'Merhaba {user}! {server} sunucusuna hoş geldin!',
  goodbye_enabled: false, goodbye_channel_id: '', goodbye_message: '{user} sunucudan ayrıldı. Hoşça kal!',
  goodbye_embed: false, goodbye_embed_color: '#ed4245',
  auto_role_enabled: false, auto_role_ids: []
};

export const VARIABLES = [
  { code: '{user}', desc: 'Kullanıcı adı' },
  { code: '{user_mention}', desc: 'Kullanıcı mention' },
  { code: '{server}', desc: 'Sunucu adı' },
  { code: '{member_count}', desc: 'Üye sayısı' },
  { code: '{user_id}', desc: 'Kullanıcı ID' },
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
      if (res.ok) { toast.success('✅ Karşılama ayarları kaydedildi'); fetchStats(); } else toast.error('❌ Kaydetme başarısız');
    } catch (e) { console.error('Error saving config:', e); toast.error('❌ Kaydetme başarısız'); }
  };

  const testWelcomeMessage = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/test/`, { method: 'POST', headers: { ...headers(), 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'welcome' }) });
      if (res.ok) toast.success('✅ Test mesajı gönderildi'); else toast.error('❌ Test mesajı gönderilemedi');
    } catch (e) { console.error('Error testing message:', e); toast.error('❌ Test başarısız'); }
  };

  const updateConfig = (field, value) => setWelcomeConfig({ ...welcomeConfig, [field]: value });
  const insertVariable = (field, variable) => setWelcomeConfig({ ...welcomeConfig, [field]: welcomeConfig[field] + ` ${variable}` });

  return { welcomeConfig, updateConfig, insertVariable, channels, roles, stats, loading, saveConfig, testWelcomeMessage };
};

export default useWelcomeMessages;

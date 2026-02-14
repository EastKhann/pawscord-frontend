import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

const DEFAULT_CONFIG = {
  enabled: false, xp_per_message: 15, xp_cooldown: 60,
  level_up_message: 'Tebrikler {user}! Seviye {level} oldun! 🎉',
  announce_channel_id: '', stack_roles: false, reset_on_leave: false,
};

export const getRankColor = (rank) => {
  if (rank === 1) return '#fbbf24';
  if (rank === 2) return '#c0c0c0';
  if (rank === 3) return '#cd7f32';
  return '#6366f1';
};

export const getLevelForXP = (xp) => {
  const a = 5, b = 50, c = 100 - xp;
  return Math.max(1, Math.floor((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)));
};
export const getXPForLevel = (level) => 5 * (level ** 2) + 50 * level + 100;

const useLevelingSystem = (serverId) => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [levelRoles, setLevelRoles] = useState([]);
  const [newRole, setNewRole] = useState({ level: 1, role_id: '' });
  const [roles, setRoles] = useState([]);
  const [channels, setChannels] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiBaseUrl = getApiBase();
  const headers = () => ({ 'Authorization': `Bearer ${localStorage.getItem('access_token')}` });
  const jsonHeaders = () => ({ ...headers(), 'Content-Type': 'application/json' });

  const fetchConfig = async () => {
    try { const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/config/`, { headers: headers() }); if (r.ok) { const d = await r.json(); if (d.config) setConfig(d.config); } } catch (e) { console.error('Config fetch error:', e); } finally { setLoading(false); }
  };
  const fetchLevelRoles = async () => {
    try { const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/`, { headers: headers() }); if (r.ok) { const d = await r.json(); setLevelRoles(d.roles || []); } } catch (e) { console.error(e); }
  };
  const fetchRoles = async () => {
    try { const r = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, { headers: headers() }); if (r.ok) { const d = await r.json(); setRoles(d.roles || []); } } catch (e) { console.error(e); }
  };
  const fetchChannels = async () => {
    try { const r = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, { headers: headers() }); if (r.ok) { const d = await r.json(); setChannels(d.channels || []); } } catch (e) { console.error(e); }
  };
  const fetchLeaderboard = async () => {
    try { const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/leaderboard/`, { headers: headers() }); if (r.ok) { const d = await r.json(); setLeaderboard(d.leaderboard || []); } } catch (e) { console.error(e); }
  };

  useEffect(() => { if (serverId) { fetchConfig(); fetchLevelRoles(); fetchRoles(); fetchChannels(); fetchLeaderboard(); } }, [serverId]);

  const saveConfig = async () => {
    try { const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/config/update/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(config) }); if (r.ok) toast.success('✅ Ayarlar kaydedildi'); else toast.error('❌ Kaydetme başarısız'); } catch (e) { toast.error('❌ Hata oluştu'); }
  };

  const addLevelRole = async () => {
    if (!newRole.role_id) { toast.error('⚠️ Rol seçin'); return; }
    try { const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/add/`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(newRole) }); if (r.ok) { fetchLevelRoles(); setNewRole({ level: 1, role_id: '' }); toast.success('✅ Rol eklendi'); } } catch (e) { toast.error('❌ Hata'); }
  };

  const removeLevelRole = async (roleId) => {
    try { const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/${roleId}/delete/`, { method: 'DELETE', headers: headers() }); if (r.ok) { fetchLevelRoles(); toast.success('✅ Rol kaldırıldı'); } } catch (e) { toast.error('❌ Hata'); }
  };

  const resetUserXP = async (userId) => {
    const confirmed = await confirmDialog('Bu kullanıcının XP\'sini sıfırlamak istediğinize emin misiniz?');
    if (!confirmed) return;
    try { const r = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/user/${userId}/reset/`, { method: 'POST', headers: headers() }); if (r.ok) { fetchLeaderboard(); toast.success('✅ XP sıfırlandı'); } } catch (e) { toast.error('❌ Hata'); }
  };

  const updateConfig = (key, value) => setConfig({ ...config, [key]: value });

  return { config, updateConfig, levelRoles, newRole, setNewRole, roles, channels, leaderboard, loading, saveConfig, addLevelRole, removeLevelRole, resetUserXP };
};

export default useLevelingSystem;

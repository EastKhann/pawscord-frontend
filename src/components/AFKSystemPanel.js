import React, { useState, useEffect } from 'react';
import './AFKSystemPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const AFKSystemPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [config, setConfig] = useState({
    enabled: false,
    afk_channel_id: '',
    afk_timeout: 300, // 5 minutes default
    return_on_activity: true,
    notify_on_move: true,
    exclude_role_ids: []
  });
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [afkUsers, setAfkUsers] = useState([]);
  const [stats, setStats] = useState({
    total_afk: 0,
    avg_duration: 0,
    current_afk: 0
  });

  useEffect(() => {
    fetchConfig();
    fetchChannels();
    fetchRoles();
    fetchAfkUsers();
    fetchStats();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/afk/server/${serverId}/config/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter(ch => ch.type === 'voice'));
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchAfkUsers = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/afk/server/${serverId}/users/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAfkUsers(data);
      }
    } catch (error) {
      console.error('Error fetching AFK users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/afk/server/${serverId}/stats/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/afk/server/${serverId}/config/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('✅ AFK ayarları güncellendi');
      } else {
        toast.error('❌ Ayarlar güncellenemedi');
      }
    } catch (error) {
      console.error('Error updating config:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const moveUserBack = async (userId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/afk/user/${userId}/return/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        toast.success('✅ Kullanıcı geri taşındı');
        fetchAfkUsers();
      } else {
        toast.error('❌ Kullanıcı taşınamadı');
      }
    } catch (error) {
      console.error('Error moving user:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}g ${hours % 24}s`;
    if (hours > 0) return `${hours}s ${minutes % 60}dk`;
    return `${minutes} dakika`;
  };

  const getAfkDuration = (startTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = Math.floor((now - start) / 1000);
    return formatDuration(diff);
  };

  const toggleRole = (roleId) => {
    const newExcluded = config.exclude_role_ids.includes(roleId)
      ? config.exclude_role_ids.filter(id => id !== roleId)
      : [...config.exclude_role_ids, roleId];
    
    setConfig({ ...config, exclude_role_ids: newExcluded });
  };

  return (
    <div className="afk-panel-overlay" onClick={onClose}>
      <div className="afk-panel" onClick={(e) => e.stopPropagation()}>
        <div className="afk-header">
          <h2>💤 AFK Sistemi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="afk-content">
          <div className="afk-stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-info">
                <span className="stat-label">Toplam AFK</span>
                <span className="stat-value">{stats.total_afk}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <span className="stat-label">Ort. Süre</span>
                <span className="stat-value">{formatDuration(stats.avg_duration || 0)}</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💤</div>
              <div className="stat-info">
                <span className="stat-label">Şu An AFK</span>
                <span className="stat-value">{stats.current_afk}</span>
              </div>
            </div>
          </div>

          <div className="afk-config-section">
            <h3>⚙️ AFK Ayarları</h3>

            <div className="config-grid">
              <div className="config-item full-width">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">AFK Sistemi Aktif</span>
                </label>
              </div>

              <div className="config-item">
                <label>AFK Kanalı</label>
                <select
                  value={config.afk_channel_id}
                  onChange={(e) => setConfig({ ...config, afk_channel_id: e.target.value })}
                >
                  <option value="">Kanal Seçin</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      🔊 {channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="config-item">
                <label>AFK Süresi (Dakika)</label>
                <select
                  value={config.afk_timeout}
                  onChange={(e) => setConfig({ ...config, afk_timeout: parseInt(e.target.value) })}
                >
                  <option value="60">1 dakika</option>
                  <option value="180">3 dakika</option>
                  <option value="300">5 dakika</option>
                  <option value="600">10 dakika</option>
                  <option value="900">15 dakika</option>
                  <option value="1800">30 dakika</option>
                </select>
              </div>

              <div className="config-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={config.return_on_activity}
                    onChange={(e) => setConfig({ ...config, return_on_activity: e.target.checked })}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Aktivite olunca geri getir</span>
                </label>
              </div>

              <div className="config-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={config.notify_on_move}
                    onChange={(e) => setConfig({ ...config, notify_on_move: e.target.checked })}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Taşınırken bildir</span>
                </label>
              </div>

              <div className="config-item full-width">
                <label>Hariç Tutulan Roller</label>
                <div className="roles-checkbox-list">
                  {roles.map((role) => (
                    <label key={role.id} className="role-checkbox">
                      <input
                        type="checkbox"
                        checked={config.exclude_role_ids.includes(role.id)}
                        onChange={() => toggleRole(role.id)}
                      />
                      <span>{role.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button className="save-btn" onClick={updateConfig}>
              💾 Ayarları Kaydet
            </button>
          </div>

          <div className="afk-users-section">
            <h3>💤 AFK Kullanıcılar ({afkUsers.length})</h3>

            {afkUsers.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">😴</span>
                <p>Şu an AFK kullanıcı yok</p>
              </div>
            ) : (
              <div className="afk-users-list">
                {afkUsers.map((user) => (
                  <div key={user.id} className="afk-user-card">
                    <div className="user-avatar">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} />
                      ) : (
                        <div className="avatar-placeholder">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="user-info">
                      <h4>{user.username}</h4>
                      <div className="user-meta">
                        <span className="meta-item">
                          <span className="meta-icon">⏱️</span>
                          {getAfkDuration(user.afk_since)}
                        </span>
                        <span className="meta-item">
                          <span className="meta-icon">📍</span>
                          {user.previous_channel_name}
                        </span>
                      </div>
                    </div>

                    <button 
                      className="return-btn"
                      onClick={() => moveUserBack(user.id)}
                    >
                      ↩️ Geri Getir
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AFKSystemPanel;


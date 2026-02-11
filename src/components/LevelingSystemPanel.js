import { useState, useEffect } from 'react';
import './LevelingSystemPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const LevelingSystemPanel = ({ serverId, onClose }) => {
  const [config, setConfig] = useState({
    enabled: false,
    xp_per_message: 15,
    xp_cooldown: 60,
    level_up_message: 'Tebrikler {user}! {level} seviyeye ulaştın! 🎉',
    announce_channel_id: '',
    stack_roles: false,
    reset_on_leave: false
  });
  const [levelRoles, setLevelRoles] = useState([]);
  const [newRole, setNewRole] = useState({
    level: 1,
    role_id: ''
  });
  const [roles, setRoles] = useState([]);
  const [channels, setChannels] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    if (serverId) {
      fetchConfig();
      fetchLevelRoles();
      fetchRoles();
      fetchChannels();
      fetchLeaderboard();
    }
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/config/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setConfig(data.config || config);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLevelRoles = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setLevelRoles(data.level_roles || []);
      }
    } catch (error) {
      console.error('Error fetching level roles:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setRoles(data.roles || []);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchChannels = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setChannels(data.channels || []);
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/leaderboard/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  const saveConfig = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/config/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('✅ Ayarlar kaydedildi');
      } else {
        toast.error('❌ Kaydetme başarısız');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('❌ Kaydetme başarısız');
    }
  };

  const addLevelRole = async () => {
    if (!newRole.role_id || newRole.level < 1) {
      toast.error('❌ Rol ve seviye zorunludur');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/add/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRole)
      });

      if (response.ok) {
        const data = await response.json();
        setLevelRoles([...levelRoles, data.level_role]);
        setNewRole({ level: 1, role_id: '' });
        toast.success('✅ Seviye rolü eklendi');
      }
    } catch (error) {
      console.error('Error adding level role:', error);
      toast.error('❌ Ekleme başarısız');
    }
  };

  const removeLevelRole = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/roles/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setLevelRoles(levelRoles.filter(r => r.id !== id));
        toast.success('✅ Seviye rolü kaldırıldı');
      }
    } catch (error) {
      console.error('Error removing level role:', error);
      toast.error('❌ Kaldırma başarısız');
    }
  };

  const resetUserXP = async (userId) => {
    if (!await confirmDialog('Bu kullanıcının XP\'sini sıfırlamak istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/leveling/server/${serverId}/user/${userId}/reset/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        toast.success('✅ XP sıfırlandı');
        fetchLeaderboard();
      }
    } catch (error) {
      console.error('Error resetting XP:', error);
      toast.error('❌ Sıfırlama başarısız');
    }
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#fbbf24'; // Gold
    if (rank === 2) return '#c0c0c0'; // Silver
    if (rank === 3) return '#cd7f32'; // Bronze
    return '#6366f1'; // Default
  };

  const getLevelForXP = (xp) => {
    // XP = 5 * (level ^ 2) + 50 * level + 100
    // Solve for level using quadratic formula
    const a = 5;
    const b = 50;
    const c = 100 - xp;
    const level = Math.floor((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a));
    return Math.max(1, level);
  };

  const getXPForLevel = (level) => {
    return 5 * (level ** 2) + 50 * level + 100;
  };

  if (loading) {
    return (
      <div className="leveling-overlay">
        <div className="leveling-panel">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Seviye sistemi yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="leveling-overlay" onClick={onClose}>
      <div className="leveling-panel" onClick={(e) => e.stopPropagation()}>
        <div className="leveling-header">
          <h2>⭐ Seviye Sistemi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="leveling-content">
          <div className="config-section">
            <div className="section-header">
              <h3>⚙️ Genel Ayarlar</h3>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={config.enabled}
                  onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                />
                <span className="slider"></span>
                <span className="toggle-label">{config.enabled ? 'Aktif' : 'Pasif'}</span>
              </label>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Mesaj Başına XP</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={config.xp_per_message}
                  onChange={(e) => setConfig({ ...config, xp_per_message: parseInt(e.target.value) })}
                  disabled={!config.enabled}
                />
              </div>

              <div className="form-group">
                <label>XP Cooldown (saniye)</label>
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={config.xp_cooldown}
                  onChange={(e) => setConfig({ ...config, xp_cooldown: parseInt(e.target.value) })}
                  disabled={!config.enabled}
                />
              </div>

              <div className="form-group full-width">
                <label>Duyuru Kanalı</label>
                <select
                  value={config.announce_channel_id}
                  onChange={(e) => setConfig({ ...config, announce_channel_id: e.target.value })}
                  disabled={!config.enabled}
                >
                  <option value="">Seçiniz (opsiyonel)</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      #{channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Seviye Atlama Mesajı</label>
                <textarea
                  value={config.level_up_message}
                  onChange={(e) => setConfig({ ...config, level_up_message: e.target.value })}
                  disabled={!config.enabled}
                  rows="2"
                />
                <span className="hint">Kullanılabilir: {'{user}'}, {'{level}'}</span>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={config.stack_roles}
                    onChange={(e) => setConfig({ ...config, stack_roles: e.target.checked })}
                    disabled={!config.enabled}
                  />
                  <span>Rolleri biriktir (önceki seviye rollerini kaldırma)</span>
                </label>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={config.reset_on_leave}
                    onChange={(e) => setConfig({ ...config, reset_on_leave: e.target.checked })}
                    disabled={!config.enabled}
                  />
                  <span>Sunucudan ayrılınca XP'yi sıfırla</span>
                </label>
              </div>
            </div>

            <button className="save-btn" onClick={saveConfig}>
              💾 Ayarları Kaydet
            </button>
          </div>

          <div className="level-roles-section">
            <h3>🎭 Seviye Rolleri</h3>
            
            <div className="add-role-form">
              <input
                type="number"
                placeholder="Seviye"
                min="1"
                value={newRole.level}
                onChange={(e) => setNewRole({ ...newRole, level: parseInt(e.target.value) })}
              />
              <select
                value={newRole.role_id}
                onChange={(e) => setNewRole({ ...newRole, role_id: e.target.value })}
              >
                <option value="">Rol seçin</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
              <button className="add-btn" onClick={addLevelRole}>
                ➕ Ekle
              </button>
            </div>

            <div className="level-roles-list">
              {levelRoles.length === 0 ? (
                <div className="empty-state">
                  <span>Henüz seviye rolü eklenmedi</span>
                </div>
              ) : (
                levelRoles
                  .sort((a, b) => a.level - b.level)
                  .map((lr) => (
                    <div key={lr.id} className="level-role-item">
                      <div className="level-badge">Lv {lr.level}</div>
                      <span className="role-name">{lr.role_name || `Role #${lr.role_id}`}</span>
                      <button className="remove-btn" onClick={() => removeLevelRole(lr.id)}>
                        ×
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>

          <div className="leaderboard-section">
            <h3>🏆 Sıralama</h3>
            <div className="leaderboard-list">
              {leaderboard.length === 0 ? (
                <div className="empty-state">
                  <span>Henüz seviye kazanan üye yok</span>
                </div>
              ) : (
                leaderboard.map((user, index) => {
                  const level = getLevelForXP(user.xp);
                  const currentLevelXP = getXPForLevel(level);
                  const nextLevelXP = getXPForLevel(level + 1);
                  const progress = ((user.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100;

                  return (
                    <div key={user.user_id} className="leaderboard-item">
                      <div className="rank-badge" style={{ background: getRankColor(index + 1) }}>
                        #{index + 1}
                      </div>
                      <div className="user-avatar">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.username} />
                        ) : (
                          <span>{user.username[0]}</span>
                        )}
                      </div>
                      <div className="user-info">
                        <div className="user-name">{user.username}</div>
                        <div className="level-progress">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                          </div>
                          <span className="level-text">Level {level} • {user.xp} XP</span>
                        </div>
                      </div>
                      <button className="reset-btn" onClick={() => resetUserXP(user.user_id)}>
                        🔄
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelingSystemPanel;


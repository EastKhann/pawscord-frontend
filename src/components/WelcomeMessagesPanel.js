import { useState, useEffect } from 'react';
import './WelcomeMessagesPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const WelcomeMessagesPanel = ({ serverId, onClose }) => {
  const [welcomeConfig, setWelcomeConfig] = useState({
    welcome_enabled: false,
    welcome_channel_id: '',
    welcome_message: 'Hoş geldin {user}! {server} sunucusuna katıldın!',
    welcome_embed: false,
    welcome_embed_color: '#5865f2',
    welcome_embed_title: 'Hoş Geldin!',
    welcome_embed_description: '{user} sunucuya katıldı!',
    welcome_dm: false,
    welcome_dm_message: 'Merhaba {user}! {server} sunucusuna hoş geldin!',
    goodbye_enabled: false,
    goodbye_channel_id: '',
    goodbye_message: '{user} sunucudan ayrıldı. Hoşça kal!',
    goodbye_embed: false,
    goodbye_embed_color: '#ed4245',
    auto_role_enabled: false,
    auto_role_ids: []
  });
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(null); // 'welcome' or 'goodbye'

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    if (serverId) {
      fetchConfig();
      fetchChannels();
      fetchRoles();
      fetchStats();
    }
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.config) {
          setWelcomeConfig(data.config);
        }
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    } finally {
      setLoading(false);
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

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/stats/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const saveConfig = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(welcomeConfig)
      });

      if (response.ok) {
        toast.success('✅ Karşılama ayarları kaydedildi');
        fetchStats();
      } else {
        toast.error('❌ Kaydetme başarısız');
      }
    } catch (error) {
      console.error('Error saving config:', error);
      toast.error('❌ Kaydetme başarısız');
    }
  };

  const testWelcomeMessage = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/welcome-messages/server/${serverId}/test/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type: 'welcome' })
      });

      if (response.ok) {
        toast.success('✅ Test mesajı gönderildi');
      } else {
        toast.error('❌ Test mesajı gönderilemedi');
      }
    } catch (error) {
      console.error('Error testing message:', error);
      toast.error('❌ Test başarısız');
    }
  };

  const insertVariable = (field, variable) => {
    setWelcomeConfig({
      ...welcomeConfig,
      [field]: welcomeConfig[field] + ` ${variable}`
    });
  };

  const variables = [
    { code: '{user}', desc: 'Kullanıcı adı' },
    { code: '{user_mention}', desc: 'Kullanıcı mention' },
    { code: '{server}', desc: 'Sunucu adı' },
    { code: '{member_count}', desc: 'Üye sayısı' },
    { code: '{user_id}', desc: 'Kullanıcı ID' }
  ];

  if (loading) {
    return (
      <div className="welcome-messages-overlay">
        <div className="welcome-messages-panel">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Karşılama mesajları yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-messages-overlay" onClick={onClose}>
      <div className="welcome-messages-panel" onClick={(e) => e.stopPropagation()}>
        <div className="welcome-header">
          <h2>👋 Karşılama & Veda Mesajları</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {stats && (
          <div className="stats-overview">
            <div className="stat-card">
              <span className="stat-icon">👋</span>
              <span className="stat-value">{stats.total_welcomes || 0}</span>
              <span className="stat-label">Toplam Karşılama</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">😢</span>
              <span className="stat-value">{stats.total_goodbyes || 0}</span>
              <span className="stat-label">Toplam Veda</span>
            </div>
            <div className="stat-card">
              <span className="stat-icon">📅</span>
              <span className="stat-value">{stats.welcomes_today || 0}</span>
              <span className="stat-label">Bugün Katılan</span>
            </div>
          </div>
        )}

        <div className="config-content">
          {/* Welcome Messages Section */}
          <div className="config-section">
            <div className="section-header">
              <h3>👋 Hoş Geldin Mesajları</h3>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={welcomeConfig.welcome_enabled}
                  onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_enabled: e.target.checked })}
                />
                <span className="slider"></span>
                <span className="toggle-label">{welcomeConfig.welcome_enabled ? 'Aktif' : 'Pasif'}</span>
              </label>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Karşılama Kanalı</label>
                <select
                  value={welcomeConfig.welcome_channel_id}
                  onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_channel_id: e.target.value })}
                  disabled={!welcomeConfig.welcome_enabled}
                >
                  <option value="">Kanal seçin</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      #{channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Hoş Geldin Mesajı</label>
                <textarea
                  value={welcomeConfig.welcome_message}
                  onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_message: e.target.value })}
                  disabled={!welcomeConfig.welcome_enabled}
                  rows="3"
                />
                <div className="variables-bar">
                  {variables.map((v) => (
                    <button
                      key={v.code}
                      className="variable-btn"
                      onClick={() => insertVariable('welcome_message', v.code)}
                      disabled={!welcomeConfig.welcome_enabled}
                      title={v.desc}
                    >
                      {v.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={welcomeConfig.welcome_embed}
                    onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_embed: e.target.checked })}
                    disabled={!welcomeConfig.welcome_enabled}
                  />
                  <span>Embed olarak gönder</span>
                </label>
              </div>

              {welcomeConfig.welcome_embed && (
                <>
                  <div className="form-group">
                    <label>Embed Rengi</label>
                    <input
                      type="color"
                      value={welcomeConfig.welcome_embed_color}
                      onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_embed_color: e.target.value })}
                      disabled={!welcomeConfig.welcome_enabled}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Embed Başlık</label>
                    <input
                      type="text"
                      value={welcomeConfig.welcome_embed_title}
                      onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_embed_title: e.target.value })}
                      disabled={!welcomeConfig.welcome_enabled}
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Embed Açıklama</label>
                    <textarea
                      value={welcomeConfig.welcome_embed_description}
                      onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_embed_description: e.target.value })}
                      disabled={!welcomeConfig.welcome_enabled}
                      rows="3"
                    />
                  </div>
                </>
              )}

              <div className="form-group full-width">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={welcomeConfig.welcome_dm}
                    onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_dm: e.target.checked })}
                    disabled={!welcomeConfig.welcome_enabled}
                  />
                  <span>Kullanıcıya DM gönder</span>
                </label>
              </div>

              {welcomeConfig.welcome_dm && (
                <div className="form-group full-width">
                  <label>DM Mesajı</label>
                  <textarea
                    value={welcomeConfig.welcome_dm_message}
                    onChange={(e) => setWelcomeConfig({ ...welcomeConfig, welcome_dm_message: e.target.value })}
                    disabled={!welcomeConfig.welcome_enabled}
                    rows="3"
                  />
                </div>
              )}
            </div>

            <button className="test-btn" onClick={testWelcomeMessage} disabled={!welcomeConfig.welcome_enabled}>
              🧪 Test Et
            </button>
          </div>

          {/* Goodbye Messages Section */}
          <div className="config-section">
            <div className="section-header">
              <h3>😢 Veda Mesajları</h3>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={welcomeConfig.goodbye_enabled}
                  onChange={(e) => setWelcomeConfig({ ...welcomeConfig, goodbye_enabled: e.target.checked })}
                />
                <span className="slider"></span>
                <span className="toggle-label">{welcomeConfig.goodbye_enabled ? 'Aktif' : 'Pasif'}</span>
              </label>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Veda Kanalı</label>
                <select
                  value={welcomeConfig.goodbye_channel_id}
                  onChange={(e) => setWelcomeConfig({ ...welcomeConfig, goodbye_channel_id: e.target.value })}
                  disabled={!welcomeConfig.goodbye_enabled}
                >
                  <option value="">Kanal seçin</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      #{channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group full-width">
                <label>Veda Mesajı</label>
                <textarea
                  value={welcomeConfig.goodbye_message}
                  onChange={(e) => setWelcomeConfig({ ...welcomeConfig, goodbye_message: e.target.value })}
                  disabled={!welcomeConfig.goodbye_enabled}
                  rows="3"
                />
                <div className="variables-bar">
                  {variables.map((v) => (
                    <button
                      key={v.code}
                      className="variable-btn"
                      onClick={() => insertVariable('goodbye_message', v.code)}
                      disabled={!welcomeConfig.goodbye_enabled}
                      title={v.desc}
                    >
                      {v.code}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={welcomeConfig.goodbye_embed}
                    onChange={(e) => setWelcomeConfig({ ...welcomeConfig, goodbye_embed: e.target.checked })}
                    disabled={!welcomeConfig.goodbye_enabled}
                  />
                  <span>Embed olarak gönder</span>
                </label>
              </div>

              {welcomeConfig.goodbye_embed && (
                <div className="form-group">
                  <label>Embed Rengi</label>
                  <input
                    type="color"
                    value={welcomeConfig.goodbye_embed_color}
                    onChange={(e) => setWelcomeConfig({ ...welcomeConfig, goodbye_embed_color: e.target.value })}
                    disabled={!welcomeConfig.goodbye_enabled}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Auto Role Section */}
          <div className="config-section">
            <div className="section-header">
              <h3>⭐ Otomatik Rol</h3>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={welcomeConfig.auto_role_enabled}
                  onChange={(e) => setWelcomeConfig({ ...welcomeConfig, auto_role_enabled: e.target.checked })}
                />
                <span className="slider"></span>
                <span className="toggle-label">{welcomeConfig.auto_role_enabled ? 'Aktif' : 'Pasif'}</span>
              </label>
            </div>

            <div className="form-group">
              <label>Otomatik verilecek roller</label>
              <div className="roles-selector">
                {roles.map((role) => (
                  <label key={role.id} className="role-checkbox">
                    <input
                      type="checkbox"
                      checked={welcomeConfig.auto_role_ids.includes(role.id)}
                      onChange={(e) => {
                        const newRoles = e.target.checked
                          ? [...welcomeConfig.auto_role_ids, role.id]
                          : welcomeConfig.auto_role_ids.filter(id => id !== role.id);
                        setWelcomeConfig({ ...welcomeConfig, auto_role_ids: newRoles });
                      }}
                      disabled={!welcomeConfig.auto_role_enabled}
                    />
                    <span>{role.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button className="save-btn" onClick={saveConfig}>
            💾 Ayarları Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessagesPanel;


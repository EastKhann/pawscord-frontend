import React, { useState, useEffect } from 'react';
import './StreamAlertsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const StreamAlertsPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [config, setConfig] = useState({
    enabled: false,
    channel_id: '',
    alert_role_id: '',
    platforms: {
      twitch: true,
      youtube: true,
      kick: false
    },
    message_template: '🔴 @{user} canlı yayında! {title}\n{url}'
  });
  const [streamers, setStreamers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStreamer, setNewStreamer] = useState({
    platform: 'twitch',
    username: '',
    custom_message: ''
  });

  useEffect(() => {
    fetchConfig();
    fetchStreamers();
    fetchChannels();
    fetchRoles();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/stream-alerts/server/${serverId}/config/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStreamers = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/stream-alerts/server/${serverId}/streamers/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStreamers(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter(ch => ch.type === 'text'));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/stream-alerts/server/${serverId}/config/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('✅ Ayarlar kaydedildi');
      } else {
        toast.error('❌ Kaydetme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const addStreamer = async () => {
    if (!newStreamer.username) {
      toast.error('❌ Kullanıcı adı gerekli');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/stream-alerts/add-streamer/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ server_id: serverId, ...newStreamer })
      });

      if (response.ok) {
        toast.success('✅ Yayıncı eklendi');
        setShowAddModal(false);
        fetchStreamers();
        setNewStreamer({ platform: 'twitch', username: '', custom_message: '' });
      } else {
        toast.error('❌ Ekleme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const removeStreamer = async (streamerId) => {
    if (!window.confirm('Yayıncıyı kaldırmak istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/stream-alerts/streamer/${streamerId}/remove/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Yayıncı kaldırıldı');
        fetchStreamers();
      }
    } catch (error) {
      toast.error('❌ Silme hatası');
    }
  };

  const getPlatformIcon = (platform) => {
    const icons = {
      twitch: '🟣',
      youtube: '🔴',
      kick: '🟢'
    };
    return icons[platform] || '🔴';
  };

  return (
    <div className="stream-overlay" onClick={onClose}>
      <div className="stream-panel" onClick={(e) => e.stopPropagation()}>
        <div className="stream-header">
          <h2>🎥 Yayın Bildirimleri</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="stream-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : (
            <>
              <div className="config-section">
                <div className="section-header">
                  <h3>⚙️ Ayarlar</h3>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={config.enabled} onChange={(e) => setConfig({...config, enabled: e.target.checked})} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="config-grid">
                  <div className="form-group">
                    <label>📢 Bildirim Kanalı</label>
                    <select value={config.channel_id} onChange={(e) => setConfig({...config, channel_id: e.target.value})}>
                      <option value="">Seçin</option>
                      {channels.map(ch => <option key={ch.id} value={ch.id}># {ch.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>🔔 Bildirim Rolü</label>
                    <select value={config.alert_role_id} onChange={(e) => setConfig({...config, alert_role_id: e.target.value})}>
                      <option value="">Yok</option>
                      {roles.map(r => <option key={r.id} value={r.id}>@{r.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>💬 Mesaj Şablonu</label>
                    <textarea value={config.message_template} onChange={(e) => setConfig({...config, message_template: e.target.value})} rows="3" />
                    <small>Kullanılabilir: {'{user}'}, {'{title}'}, {'{url}'}, {'{game}'}</small>
                  </div>

                  <div className="platforms-group">
                    <label>Platformlar</label>
                    <div className="platform-toggles">
                      <label className="platform-label">
                        <input type="checkbox" checked={config.platforms.twitch} onChange={(e) => setConfig({...config, platforms: {...config.platforms, twitch: e.target.checked}})} />
                        <span>🟣 Twitch</span>
                      </label>
                      <label className="platform-label">
                        <input type="checkbox" checked={config.platforms.youtube} onChange={(e) => setConfig({...config, platforms: {...config.platforms, youtube: e.target.checked}})} />
                        <span>🔴 YouTube</span>
                      </label>
                      <label className="platform-label">
                        <input type="checkbox" checked={config.platforms.kick} onChange={(e) => setConfig({...config, platforms: {...config.platforms, kick: e.target.checked}})} />
                        <span>🟢 Kick</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button className="save-btn" onClick={saveConfig}>💾 Kaydet</button>
              </div>

              <div className="streamers-section">
                <div className="section-header">
                  <h3>👤 Takip Edilen Yayıncılar ({streamers.length})</h3>
                  <button className="add-streamer-btn" onClick={() => setShowAddModal(true)}>+ Yayıncı Ekle</button>
                </div>

                {streamers.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">🎥</span>
                    <p>Henüz yayıncı eklenmedi</p>
                  </div>
                ) : (
                  <div className="streamers-list">
                    {streamers.map((streamer) => (
                      <div key={streamer.id} className="streamer-card">
                        <div className="streamer-info">
                          <span className="platform-icon">{getPlatformIcon(streamer.platform)}</span>
                          <div className="streamer-details">
                            <h4>{streamer.username}</h4>
                            <p>{streamer.platform}</p>
                          </div>
                          {streamer.is_live && <span className="live-badge">🔴 CANLI</span>}
                        </div>
                        <button className="remove-btn" onClick={() => removeStreamer(streamer.id)}>🗑️</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {showAddModal && (
          <div className="add-modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="add-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Yayıncı Ekle</h3>
                <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Platform</label>
                  <select value={newStreamer.platform} onChange={(e) => setNewStreamer({...newStreamer, platform: e.target.value})}>
                    <option value="twitch">🟣 Twitch</option>
                    <option value="youtube">🔴 YouTube</option>
                    <option value="kick">🟢 Kick</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Kullanıcı Adı *</label>
                  <input value={newStreamer.username} onChange={(e) => setNewStreamer({...newStreamer, username: e.target.value})} placeholder="username" />
                </div>
                <div className="form-group">
                  <label>Özel Mesaj (Opsiyonel)</label>
                  <textarea value={newStreamer.custom_message} onChange={(e) => setNewStreamer({...newStreamer, custom_message: e.target.value})} rows="3" placeholder="Bu yayıncı için özel mesaj" />
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setShowAddModal(false)}>İptal</button>
                <button className="submit-btn" onClick={addStreamer}>➕ Ekle</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamAlertsPanel;


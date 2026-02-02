import React, { useState, useEffect } from 'react';
import './StarboardPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const StarboardPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [config, setConfig] = useState({
    enabled: false,
    channel_id: '',
    emoji: '⭐',
    threshold: 3,
    self_star: false,
    allow_nsfw: false
  });
  const [stars, setStars] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
    fetchStars();
    fetchChannels();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/config/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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

  const fetchStars = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/messages/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStars(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter(ch => ch.type === 'text'));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const saveConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/starboard/server/${serverId}/config/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('✅ Starboard ayarları kaydedildi');
      } else {
        toast.error('❌ Kaydetme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const removeMessage = async (messageId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/starboard/message/${messageId}/remove/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        toast.success('✅ Mesaj kaldırıldı');
        fetchStars();
      }
    } catch (error) {
      toast.error('❌ Silme hatası');
    }
  };

  return (
    <div className="starboard-overlay" onClick={onClose}>
      <div className="starboard-panel" onClick={(e) => e.stopPropagation()}>
        <div className="starboard-header">
          <h2>⭐ Starboard</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="starboard-content">
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
                    <label>📢 Starboard Kanalı</label>
                    <select value={config.channel_id} onChange={(e) => setConfig({...config, channel_id: e.target.value})}>
                      <option value="">Seçin</option>
                      {channels.map(ch => <option key={ch.id} value={ch.id}># {ch.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>⭐ Emoji</label>
                    <input type="text" value={config.emoji} onChange={(e) => setConfig({...config, emoji: e.target.value})} placeholder="⭐" />
                  </div>

                  <div className="form-group">
                    <label>🎯 Eşik Değeri</label>
                    <input type="number" min="1" max="50" value={config.threshold} onChange={(e) => setConfig({...config, threshold: parseInt(e.target.value)})} />
                    <small>Mesajın starboard'a eklenebilmesi için gereken minimum yıldız sayısı</small>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.self_star} onChange={(e) => setConfig({...config, self_star: e.target.checked})} />
                      <span>Kendi mesajına yıldız verebilir</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.allow_nsfw} onChange={(e) => setConfig({...config, allow_nsfw: e.target.checked})} />
                      <span>NSFW kanallardan izin ver</span>
                    </label>
                  </div>
                </div>

                <button className="save-btn" onClick={saveConfig}>💾 Kaydet</button>
              </div>

              <div className="stars-section">
                <h3>⭐ Starboard Mesajları ({stars.length})</h3>
                {stars.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">⭐</span>
                    <p>Henüz starboard mesajı yok</p>
                  </div>
                ) : (
                  <div className="stars-list">
                    {stars.map((star) => (
                      <div key={star.message_id} className="star-card">
                        <div className="star-header">
                          <div className="star-author">
                            {star.author_avatar ? <img src={star.author_avatar} alt="" /> : <div className="default-avatar">👤</div>}
                            <span>{star.author_name}</span>
                          </div>
                          <div className="star-count">
                            <span>{config.emoji} {star.star_count}</span>
                          </div>
                        </div>
                        <div className="star-content">
                          <p>{star.content}</p>
                          {star.attachments && star.attachments.length > 0 && (
                            <div className="star-attachments">
                              {star.attachments.map((att, idx) => (
                                <img key={idx} src={att} alt="" />
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="star-footer">
                          <span className="star-channel"># {star.channel_name}</span>
                          <span className="star-time">{new Date(star.created_at).toLocaleString('tr-TR')}</span>
                          <button className="remove-btn" onClick={() => removeMessage(star.message_id)}>🗑️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StarboardPanel;


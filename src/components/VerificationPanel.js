import React, { useState, useEffect } from 'react';
import './VerificationPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const VerificationPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [config, setConfig] = useState({
    enabled: false,
    verification_type: 'button',
    channel_id: '',
    verified_role_id: '',
    unverified_role_id: '',
    message: 'Sunucuya erişmek için aşağıdaki butona tıklayın.',
    button_text: '✅ Doğrula',
    kick_unverified_after: 0,
    captcha_enabled: false
  });
  const [stats, setStats] = useState({
    total_verified: 0,
    pending_verification: 0,
    failed_attempts: 0
  });
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
    fetchStats();
    fetchChannels();
    fetchRoles();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/verification/server/${serverId}/config/`, {
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

  const fetchStats = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/verification/server/${serverId}/stats/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
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

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
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
      const response = await fetch(`${apiBaseUrl}/verification/server/${serverId}/config/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('✅ Doğrulama ayarları kaydedildi');
      } else {
        toast.error('❌ Kaydetme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const sendVerificationMessage = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/verification/server/${serverId}/send-message/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        toast.success('✅ Doğrulama mesajı gönderildi');
      }
    } catch (error) {
      toast.error('❌ Gönderim hatası');
    }
  };

  const resetStats = async () => {
    if (!window.confirm('İstatistikleri sıfırlamak istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/verification/server/${serverId}/reset-stats/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        toast.success('✅ İstatistikler sıfırlandı');
        fetchStats();
      }
    } catch (error) {
      toast.error('❌ Sıfırlama hatası');
    }
  };

  return (
    <div className="verification-overlay" onClick={onClose}>
      <div className="verification-panel" onClick={(e) => e.stopPropagation()}>
        <div className="verification-header">
          <h2>✅ Doğrulama Sistemi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="verification-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : (
            <>
              <div className="stats-section">
                <div className="stat-card">
                  <span className="stat-icon">✅</span>
                  <div className="stat-info">
                    <h3>{stats.total_verified}</h3>
                    <p>Doğrulanmış</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">⏳</span>
                  <div className="stat-info">
                    <h3>{stats.pending_verification}</h3>
                    <p>Bekleyen</p>
                  </div>
                </div>
                <div className="stat-card">
                  <span className="stat-icon">❌</span>
                  <div className="stat-info">
                    <h3>{stats.failed_attempts}</h3>
                    <p>Başarısız</p>
                  </div>
                </div>
              </div>

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
                    <label>📢 Doğrulama Kanalı</label>
                    <select value={config.channel_id} onChange={(e) => setConfig({...config, channel_id: e.target.value})}>
                      <option value="">Seçin</option>
                      {channels.map(ch => <option key={ch.id} value={ch.id}># {ch.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>🔰 Doğrulama Tipi</label>
                    <select value={config.verification_type} onChange={(e) => setConfig({...config, verification_type: e.target.value})}>
                      <option value="button">Buton</option>
                      <option value="reaction">Reaksiyon</option>
                      <option value="captcha">Captcha</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>✅ Doğrulanmış Rolü</label>
                    <select value={config.verified_role_id} onChange={(e) => setConfig({...config, verified_role_id: e.target.value})}>
                      <option value="">Seçin</option>
                      {roles.map(r => <option key={r.id} value={r.id}>@{r.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>❌ Doğrulanmamış Rolü</label>
                    <select value={config.unverified_role_id} onChange={(e) => setConfig({...config, unverified_role_id: e.target.value})}>
                      <option value="">Seçin</option>
                      {roles.map(r => <option key={r.id} value={r.id}>@{r.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>💬 Doğrulama Mesajı</label>
                    <textarea value={config.message} onChange={(e) => setConfig({...config, message: e.target.value})} rows="3" />
                  </div>

                  <div className="form-group">
                    <label>🔘 Buton Metni</label>
                    <input type="text" value={config.button_text} onChange={(e) => setConfig({...config, button_text: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label>⏱️ Doğrulanmayanları At (dk)</label>
                    <input type="number" min="0" max="1440" value={config.kick_unverified_after} onChange={(e) => setConfig({...config, kick_unverified_after: parseInt(e.target.value)})} />
                    <small>0 = Atma</small>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.captcha_enabled} onChange={(e) => setConfig({...config, captcha_enabled: e.target.checked})} />
                      <span>Captcha doğrulaması</span>
                    </label>
                  </div>
                </div>

                <div className="config-actions">
                  <button className="save-btn" onClick={saveConfig}>💾 Kaydet</button>
                  <button className="send-btn" onClick={sendVerificationMessage}>📤 Mesaj Gönder</button>
                  <button className="reset-btn" onClick={resetStats}>🔄 Sıfırla</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPanel;


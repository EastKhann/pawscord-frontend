import { useState, useEffect } from 'react';
import './BirthdaySystemPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const BirthdaySystemPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [config, setConfig] = useState({
    enabled: false,
    announcement_channel_id: '',
    birthday_role_id: '',
    message_template: '🎉 Bugün @{user}\'un doğum günü! Mutlu yıllar! 🎂',
    give_role: true,
    remove_role_after_day: true
  });
  const [birthdays, setBirthdays] = useState([]);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
    fetchBirthdays();
    fetchChannels();
    fetchRoles();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/config/`, {
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

  const fetchBirthdays = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/birthdays/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBirthdays(data.all_birthdays);
        setUpcomingBirthdays(data.upcoming);
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
      const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/config/`, {
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

  const testMessage = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/birthday-system/server/${serverId}/test/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Test mesajı gönderildi');
      }
    } catch (error) {
      toast.error('❌ Gönderim hatası');
    }
  };

  const formatBirthday = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
  };

  const getDaysUntil = (date) => {
    const now = new Date();
    const birthday = new Date(date);
    birthday.setFullYear(now.getFullYear());
    if (birthday < now) birthday.setFullYear(now.getFullYear() + 1);
    const diff = Math.ceil((birthday - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="birthday-overlay" onClick={onClose}>
      <div className="birthday-panel" onClick={(e) => e.stopPropagation()}>
        <div className="birthday-header">
          <h2>🎂 Doğum Günü Sistemi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="birthday-content">
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
                    <label>📢 Duyuru Kanalı</label>
                    <select value={config.announcement_channel_id} onChange={(e) => setConfig({...config, announcement_channel_id: e.target.value})}>
                      <option value="">Seçin</option>
                      {channels.map(ch => <option key={ch.id} value={ch.id}># {ch.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>🎭 Doğum Günü Rolü</label>
                    <select value={config.birthday_role_id} onChange={(e) => setConfig({...config, birthday_role_id: e.target.value})}>
                      <option value="">Yok</option>
                      {roles.map(r => <option key={r.id} value={r.id}>@{r.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label>💬 Mesaj Şablonu</label>
                    <textarea value={config.message_template} onChange={(e) => setConfig({...config, message_template: e.target.value})} rows="2" />
                    <small>Kullanılabilir: {'{user}'}, {'{age}'}, {'{server}'}</small>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.give_role} onChange={(e) => setConfig({...config, give_role: e.target.checked})} />
                      <span>Doğum günü rolü ver</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.remove_role_after_day} onChange={(e) => setConfig({...config, remove_role_after_day: e.target.checked})} />
                      <span>Bir gün sonra rolü kaldır</span>
                    </label>
                  </div>
                </div>

                <div className="config-actions">
                  <button className="save-btn" onClick={saveConfig}>💾 Kaydet</button>
                  <button className="test-btn" onClick={testMessage}>✉️ Test Mesajı</button>
                </div>
              </div>

              <div className="upcoming-section">
                <h3>📅 Yaklaşan Doğum Günleri</h3>
                {upcomingBirthdays.length === 0 ? (
                  <div className="empty-state-small">
                    <p>Yaklaşan doğum günü yok</p>
                  </div>
                ) : (
                  <div className="upcoming-list">
                    {upcomingBirthdays.map((bd) => (
                      <div key={bd.user_id} className="upcoming-card">
                        <div className="upcoming-avatar">
                          {bd.user_avatar ? <img src={bd.user_avatar} alt="" /> : <div className="default-avatar">👤</div>}
                        </div>
                        <div className="upcoming-info">
                          <h4>{bd.user_name}</h4>
                          <p>{formatBirthday(bd.birthday)}</p>
                        </div>
                        <div className="upcoming-days">
                          <span className="days-badge">{getDaysUntil(bd.birthday)} gün</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="all-birthdays-section">
                <h3>📋 Tüm Doğum Günleri ({birthdays.length})</h3>
                <div className="birthdays-grid">
                  {birthdays.map((bd) => (
                    <div key={bd.user_id} className="birthday-item">
                      <span className="user-name">{bd.user_name}</span>
                      <span className="birthday-date">{formatBirthday(bd.birthday)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdaySystemPanel;


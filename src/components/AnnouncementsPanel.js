import { useState, useEffect, useCallback, memo } from 'react';
import './AnnouncementsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const AnnouncementsPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [announcements, setAnnouncements] = useState([]);
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    channel_id: '',
    mention_role_id: '',
    schedule_time: '',
    embed: false,
    embed_color: '#5865f2',
    repeat: 'once'
  });

  useEffect(() => {
    fetchAnnouncements();
    fetchChannels();
    fetchRoles();
  }, [serverId]);

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/announcements/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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

  const createAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content || !newAnnouncement.channel_id) {
      toast.error('❌ Lütfen gerekli alanları doldurun');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/announcements/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ server_id: serverId, ...newAnnouncement })
      });

      if (response.ok) {
        toast.success('✅ Duyuru oluşturuldu');
        setShowCreateModal(false);
        fetchAnnouncements();
        setNewAnnouncement({
          title: '', content: '', channel_id: '', mention_role_id: '',
          schedule_time: '', embed: false, embed_color: '#5865f2', repeat: 'once'
        });
      } else {
        toast.error('❌ Duyuru oluşturulamadı');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const sendNow = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/announcements/${id}/send/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Duyuru gönderildi');
        fetchAnnouncements();
      }
    } catch (error) {
      toast.error('❌ Gönderim hatası');
    }
  };

  const deleteAnnouncement = async (id) => {
    if (!await confirmDialog('Duyuruyu silmek istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/announcements/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Duyuru silindi');
        fetchAnnouncements();
      }
    } catch (error) {
      toast.error('❌ Silme hatası');
    }
  };

  // 🎯 Performance: Memoized event handlers
  const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
  const handleShowCreateModal = useCallback(() => setShowCreateModal(true), []);
  const handleHideCreateModal = useCallback(() => setShowCreateModal(false), []);
  const handleTitleChange = useCallback((e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value })), []);
  const handleContentChange = useCallback((e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value })), []);
  const handleChannelChange = useCallback((e) => setNewAnnouncement(prev => ({ ...prev, channel_id: e.target.value })), []);
  const handleMentionChange = useCallback((e) => setNewAnnouncement(prev => ({ ...prev, mention_role_id: e.target.value })), []);
  const handleScheduleChange = useCallback((e) => setNewAnnouncement(prev => ({ ...prev, schedule_time: e.target.value })), []);
  const handleRepeatChange = useCallback((e) => setNewAnnouncement(prev => ({ ...prev, repeat: e.target.value })), []);
  const handleEmbedToggle = useCallback((e) => setNewAnnouncement(prev => ({ ...prev, embed: e.target.checked })), []);

  return (
    <div className="announcements-overlay" onClick={onClose}>
      <div className="announcements-panel" onClick={handleStopPropagation}>
        <div className="announcements-header">
          <h2>📢 Duyurular</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="announcements-content">
          <button className="create-announcement-btn" onClick={handleShowCreateModal}>
            + Yeni Duyuru Oluştur
          </button>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📢</span>
              <p>Henüz duyuru yok</p>
            </div>
          ) : (
            <div className="announcements-list">
              {announcements.map((ann) => (
                <div key={ann.id} className="announcement-card">
                  <h3>{ann.title}</h3>
                  <p>{ann.content}</p>
                  <div className="announcement-meta">
                    <span>📍 {channels.find(c => c.id === ann.channel_id)?.name}</span>
                    {ann.schedule_time && <span>⏰ {new Date(ann.schedule_time).toLocaleString('tr-TR')}</span>}
                    {ann.repeat !== 'once' && <span>🔄 {ann.repeat}</span>}
                  </div>
                  <div className="announcement-actions">
                    <button onClick={() => sendNow(ann.id)}>📤 Şimdi Gönder</button>
                    <button onClick={() => deleteAnnouncement(ann.id)}>🗑️ Sil</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showCreateModal && (
          <div className="create-modal-overlay" onClick={handleHideCreateModal}>
            <div className="create-modal" onClick={handleStopPropagation}>
              <div className="modal-header">
                <h3>Yeni Duyuru</h3>
                <button className="close-btn" onClick={handleHideCreateModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Başlık *</label>
                  <input value={newAnnouncement.title} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                  <label>İçerik *</label>
                  <textarea value={newAnnouncement.content} onChange={handleContentChange} rows="4" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Kanal *</label>
                    <select value={newAnnouncement.channel_id} onChange={handleChannelChange}>
                      <option value="">Seçin</option>
                      {channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Bahset</label>
                    <select value={newAnnouncement.mention_role_id} onChange={handleMentionChange}>
                      <option value="">Rol yok</option>
                      {roles.map(r => <option key={r.id} value={r.id}>@{r.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Zamanlama</label>
                    <input type="datetime-local" value={newAnnouncement.schedule_time} onChange={handleScheduleChange} />
                  </div>
                  <div className="form-group">
                    <label>Tekrar</label>
                    <select value={newAnnouncement.repeat} onChange={handleRepeatChange}>
                      <option value="once">Bir kez</option>
                      <option value="daily">Günlük</option>
                      <option value="weekly">Haftalık</option>
                      <option value="monthly">Aylık</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={newAnnouncement.embed} onChange={handleEmbedToggle} />
                    <span>Embed olarak gönder</span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={handleHideCreateModal}>İptal</button>
                <button className="submit-btn" onClick={createAnnouncement}>📢 Oluştur</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AnnouncementsPanel);


import { useState, useEffect, useCallback, memo } from 'react';
import './ReminderPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const ReminderPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [reminders, setReminders] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    description: '',
    remind_at: '',
    repeat: 'once',
    channel_id: '',
    mention_user_id: ''
  });
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
  const handleShowCreate = useCallback(() => setShowCreateModal(true), []);
  const handleHideCreate = useCallback(() => setShowCreateModal(false), []);
  const handleTitleChange = useCallback((e) => setNewReminder(prev => ({ ...prev, title: e.target.value })), []);
  const handleDescChange = useCallback((e) => setNewReminder(prev => ({ ...prev, description: e.target.value })), []);
  const handleRemindAtChange = useCallback((e) => setNewReminder(prev => ({ ...prev, remind_at: e.target.value })), []);
  const handleRepeatChange = useCallback((e) => setNewReminder(prev => ({ ...prev, repeat: e.target.value })), []);
  const handleChannelChange = useCallback((e) => setNewReminder(prev => ({ ...prev, channel_id: e.target.value })), []);

  useEffect(() => {
    fetchReminders();
    fetchChannels();
  }, [serverId]);

  const fetchReminders = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/reminders/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setReminders(data);
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

  const createReminder = async () => {
    if (!newReminder.title || !newReminder.remind_at || !newReminder.channel_id) {
      toast.error('❌ Lütfen gerekli alanları doldurun');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/reminders/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ server_id: serverId, ...newReminder })
      });

      if (response.ok) {
        toast.success('✅ Hatırlatıcı oluşturuldu');
        setShowCreateModal(false);
        fetchReminders();
        setNewReminder({ title: '', description: '', remind_at: '', repeat: 'once', channel_id: '', mention_user_id: '' });
      } else {
        toast.error('❌ Oluşturma hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const deleteReminder = async (id) => {
    if (!await confirmDialog('Hatırlatıcıyı silmek istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/reminders/${id}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Hatırlatıcı silindi');
        fetchReminders();
      }
    } catch (error) {
      toast.error('❌ Silme hatası');
    }
  };

  const triggerNow = async (id) => {
    try {
      const response = await fetch(`${apiBaseUrl}/reminders/${id}/trigger/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
      });
      if (response.ok) {
        toast.success('✅ Hatırlatıcı tetiklendi');
      }
    } catch (error) {
      toast.error('❌ Tetikleme hatası');
    }
  };

  const formatTime = (time) => {
    return new Date(time).toLocaleString('tr-TR');
  };

  const getRepeatBadge = (repeat) => {
    const badges = {
      once: { text: 'Bir kez', color: '#6b7280' },
      daily: { text: 'Günlük', color: '#3b82f6' },
      weekly: { text: 'Haftalık', color: '#8b5cf6' },
      monthly: { text: 'Aylık', color: '#ec4899' }
    };
    return badges[repeat] || badges.once;
  };

  return (
    <div className="reminder-overlay" onClick={onClose}>
      <div className="reminder-panel" onClick={handleStopPropagation}>
        <div className="reminder-header">
          <h2>⏰ Hatırlatıcılar</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="reminder-content">
          <button className="create-reminder-btn" onClick={handleShowCreate}>
            + Yeni Hatırlatıcı
          </button>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : reminders.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">⏰</span>
              <p>Henüz hatırlatıcı yok</p>
            </div>
          ) : (
            <div className="reminders-list">
              {reminders.map((reminder) => (
                <div key={reminder.id} className="reminder-card">
                  <div className="reminder-main">
                    <h3>{reminder.title}</h3>
                    {reminder.description && <p>{reminder.description}</p>}
                    <div className="reminder-meta">
                      <span>⏰ {formatTime(reminder.remind_at)}</span>
                      <span>📍 {channels.find(c => c.id === reminder.channel_id)?.name}</span>
                      <span className="repeat-badge" style={{ background: getRepeatBadge(reminder.repeat).color }}>
                        🔄 {getRepeatBadge(reminder.repeat).text}
                      </span>
                    </div>
                  </div>
                  <div className="reminder-actions">
                    <button className="trigger-btn" onClick={() => triggerNow(reminder.id)}>▶️ Tetikle</button>
                    <button className="delete-btn" onClick={() => deleteReminder(reminder.id)}>🗑️</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showCreateModal && (
          <div className="create-modal-overlay" onClick={handleHideCreate}>
            <div className="create-modal" onClick={handleStopPropagation}>
              <div className="modal-header">
                <h3>Yeni Hatırlatıcı</h3>
                <button className="close-btn" onClick={handleHideCreate}>×</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Başlık *</label>
                  <input value={newReminder.title} onChange={handleTitleChange} />
                </div>
                <div className="form-group">
                  <label>Açıklama</label>
                  <textarea value={newReminder.description} onChange={handleDescChange} rows="3" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tarih/Saat *</label>
                    <input type="datetime-local" value={newReminder.remind_at} onChange={handleRemindAtChange} />
                  </div>
                  <div className="form-group">
                    <label>Tekrar</label>
                    <select value={newReminder.repeat} onChange={handleRepeatChange}>
                      <option value="once">Bir kez</option>
                      <option value="daily">Günlük</option>
                      <option value="weekly">Haftalık</option>
                      <option value="monthly">Aylık</option>
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Kanal *</label>
                  <select value={newReminder.channel_id} onChange={handleChannelChange}>
                    <option value="">Seçin</option>
                    {channels.map(ch => <option key={ch.id} value={ch.id}>{ch.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="cancel-btn" onClick={handleHideCreate}>İptal</button>
                <button className="submit-btn" onClick={createReminder}>⏰ Oluştur</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ReminderPanel);


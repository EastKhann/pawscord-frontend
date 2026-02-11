import { useState, useEffect } from 'react';
import './GiveawayPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const GiveawayPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [giveaways, setGiveaways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [channels, setChannels] = useState([]);
  const [roles, setRoles] = useState([]);

  const [newGiveaway, setNewGiveaway] = useState({
    title: '',
    description: '',
    prize: '',
    channel_id: '',
    winners_count: 1,
    duration: 3600, // 1 hour in seconds
    required_role_id: '',
    required_messages: 0,
    required_invites: 0,
    allow_multiple_entries: false
  });

  useEffect(() => {
    fetchGiveaways();
    fetchChannels();
    fetchRoles();
  }, [serverId]);

  const fetchGiveaways = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/giveaways/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setGiveaways(data);
      }
    } catch (error) {
      console.error('Error fetching giveaways:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter(ch => ch.type === 'text'));
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
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

  const createGiveaway = async () => {
    if (!newGiveaway.title || !newGiveaway.prize || !newGiveaway.channel_id) {
      toast.error('❌ Lütfen tüm gerekli alanları doldurun');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/giveaways/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          ...newGiveaway
        })
      });

      if (response.ok) {
        toast.success('✅ Çekiliş oluşturuldu!');
        setShowCreateModal(false);
        fetchGiveaways();
        setNewGiveaway({
          title: '',
          description: '',
          prize: '',
          channel_id: '',
          winners_count: 1,
          duration: 3600,
          required_role_id: '',
          required_messages: 0,
          required_invites: 0,
          allow_multiple_entries: false
        });
      } else {
        toast.error('❌ Çekiliş oluşturulamadı');
      }
    } catch (error) {
      console.error('Error creating giveaway:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const endGiveaway = async (giveawayId) => {
    if (!await confirmDialog('Çekilişi sonlandırmak istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${apiBaseUrl}/giveaways/${giveawayId}/end/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`✅ Çekiliş sonlandı! Kazananlar: ${data.winners.join(', ')}`);
        fetchGiveaways();
      } else {
        toast.error('❌ Çekiliş sonlandırılamadı');
      }
    } catch (error) {
      console.error('Error ending giveaway:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const rerollGiveaway = async (giveawayId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/giveaways/${giveawayId}/reroll/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(`✅ Yeni kazanan: ${data.new_winner}`);
        fetchGiveaways();
      } else {
        toast.error('❌ Reroll yapılamadı');
      }
    } catch (error) {
      console.error('Error rerolling giveaway:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const deleteGiveaway = async (giveawayId) => {
    if (!await confirmDialog('Çekilişi silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${apiBaseUrl}/giveaways/${giveawayId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        toast.success('✅ Çekiliş silindi');
        fetchGiveaways();
      } else {
        toast.error('❌ Çekiliş silinemedi');
      }
    } catch (error) {
      console.error('Error deleting giveaway:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: 'Aktif', color: '#10b981' },
      ended: { text: 'Sonlandı', color: '#6b7280' },
      cancelled: { text: 'İptal', color: '#ef4444' }
    };
    return badges[status] || badges.active;
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) return `${hours} saat`;
    return `${minutes} dakika`;
  };

  const formatTimeRemaining = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = Math.floor((end - now) / 1000);

    if (diff <= 0) return 'Sona erdi';

    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);

    if (days > 0) return `${days}g ${hours}s kaldı`;
    if (hours > 0) return `${hours}s ${minutes}dk kaldı`;
    return `${minutes} dakika kaldı`;
  };

  return (
    <div className="giveaway-panel-overlay" onClick={onClose}>
      <div className="giveaway-panel" onClick={(e) => e.stopPropagation()}>
        <div className="giveaway-header">
          <h2>🎉 Çekilişler</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="giveaway-content">
          <div className="giveaway-actions">
            <button className="create-giveaway-btn" onClick={() => setShowCreateModal(true)}>
              + Yeni Çekiliş Oluştur
            </button>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Çekilişler yükleniyor...</p>
            </div>
          ) : giveaways.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">🎁</span>
              <p>Henüz çekiliş yok</p>
              <span className="empty-hint">Yeni bir çekiliş oluşturun!</span>
            </div>
          ) : (
            <div className="giveaways-list">
              {giveaways.map((giveaway) => (
                <div key={giveaway.id} className="giveaway-card">
                  <div className="giveaway-card-header">
                    <h3>{giveaway.title}</h3>
                    <span 
                      className="status-badge" 
                      style={{ background: getStatusBadge(giveaway.status).color }}
                    >
                      {getStatusBadge(giveaway.status).text}
                    </span>
                  </div>

                  <div className="giveaway-card-body">
                    <div className="giveaway-prize">
                      <span className="prize-icon">🎁</span>
                      <span className="prize-text">{giveaway.prize}</span>
                    </div>

                    {giveaway.description && (
                      <p className="giveaway-description">{giveaway.description}</p>
                    )}

                    <div className="giveaway-info">
                      <div className="info-item">
                        <span className="info-label">Kazanan Sayısı:</span>
                        <span className="info-value">{giveaway.winners_count} kişi</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Katılımcılar:</span>
                        <span className="info-value">{giveaway.entries_count || 0} kişi</span>
                      </div>
                      {giveaway.status === 'active' && (
                        <div className="info-item">
                          <span className="info-label">Kalan Süre:</span>
                          <span className="info-value time-remaining">
                            {formatTimeRemaining(giveaway.end_time)}
                          </span>
                        </div>
                      )}
                    </div>

                    {giveaway.required_role_id && (
                      <div className="requirement-badge">
                        ⭐ Rol gereksinimi var
                      </div>
                    )}
                    {giveaway.required_messages > 0 && (
                      <div className="requirement-badge">
                        💬 {giveaway.required_messages} mesaj gerekli
                      </div>
                    )}
                    {giveaway.required_invites > 0 && (
                      <div className="requirement-badge">
                        👥 {giveaway.required_invites} davet gerekli
                      </div>
                    )}

                    {giveaway.winners && giveaway.winners.length > 0 && (
                      <div className="winners-section">
                        <h4>🎉 Kazananlar:</h4>
                        <ul className="winners-list">
                          {giveaway.winners.map((winner, index) => (
                            <li key={index}>{winner}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="giveaway-card-footer">
                    {giveaway.status === 'active' && (
                      <button 
                        className="end-btn"
                        onClick={() => endGiveaway(giveaway.id)}
                      >
                        🏁 Sonlandır
                      </button>
                    )}
                    {giveaway.status === 'ended' && (
                      <button 
                        className="reroll-btn"
                        onClick={() => rerollGiveaway(giveaway.id)}
                      >
                        🔄 Reroll
                      </button>
                    )}
                    <button 
                      className="delete-btn"
                      onClick={() => deleteGiveaway(giveaway.id)}
                    >
                      🗑️ Sil
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showCreateModal && (
          <div className="create-modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="create-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Yeni Çekiliş Oluştur</h3>
                <button className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Başlık *</label>
                  <input
                    type="text"
                    placeholder="Discord Nitro Çekilişi"
                    value={newGiveaway.title}
                    onChange={(e) => setNewGiveaway({ ...newGiveaway, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Açıklama</label>
                  <textarea
                    placeholder="Çekiliş hakkında detaylar..."
                    value={newGiveaway.description}
                    onChange={(e) => setNewGiveaway({ ...newGiveaway, description: e.target.value })}
                    rows="3"
                  />
                </div>

                <div className="form-group">
                  <label>Ödül *</label>
                  <input
                    type="text"
                    placeholder="1 Aylık Discord Nitro"
                    value={newGiveaway.prize}
                    onChange={(e) => setNewGiveaway({ ...newGiveaway, prize: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kanal *</label>
                    <select
                      value={newGiveaway.channel_id}
                      onChange={(e) => setNewGiveaway({ ...newGiveaway, channel_id: e.target.value })}
                    >
                      <option value="">Kanal Seçin</option>
                      {channels.map((channel) => (
                        <option key={channel.id} value={channel.id}>
                          # {channel.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Kazanan Sayısı</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={newGiveaway.winners_count}
                      onChange={(e) => setNewGiveaway({ ...newGiveaway, winners_count: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Süre</label>
                  <select
                    value={newGiveaway.duration}
                    onChange={(e) => setNewGiveaway({ ...newGiveaway, duration: parseInt(e.target.value) })}
                  >
                    <option value="1800">30 dakika</option>
                    <option value="3600">1 saat</option>
                    <option value="10800">3 saat</option>
                    <option value="21600">6 saat</option>
                    <option value="43200">12 saat</option>
                    <option value="86400">1 gün</option>
                    <option value="172800">2 gün</option>
                    <option value="259200">3 gün</option>
                    <option value="604800">1 hafta</option>
                  </select>
                </div>

                <div className="requirements-section">
                  <h4>Katılım Gereksinimleri (Opsiyonel)</h4>

                  <div className="form-group">
                    <label>Gerekli Rol</label>
                    <select
                      value={newGiveaway.required_role_id}
                      onChange={(e) => setNewGiveaway({ ...newGiveaway, required_role_id: e.target.value })}
                    >
                      <option value="">Rol yok</option>
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Minimum Mesaj Sayısı</label>
                      <input
                        type="number"
                        min="0"
                        value={newGiveaway.required_messages}
                        onChange={(e) => setNewGiveaway({ ...newGiveaway, required_messages: parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="form-group">
                      <label>Minimum Davet Sayısı</label>
                      <input
                        type="number"
                        min="0"
                        value={newGiveaway.required_invites}
                        onChange={(e) => setNewGiveaway({ ...newGiveaway, required_invites: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newGiveaway.allow_multiple_entries}
                        onChange={(e) => setNewGiveaway({ ...newGiveaway, allow_multiple_entries: e.target.checked })}
                      />
                      <span>Birden fazla katılıma izin ver</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                  İptal
                </button>
                <button className="submit-btn" onClick={createGiveaway}>
                  🎉 Çekiliş Oluştur
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiveawayPanel;


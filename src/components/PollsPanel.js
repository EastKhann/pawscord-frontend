import React, { useState, useEffect } from 'react';
import './PollsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const PollsPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [channels, setChannels] = useState([]);

  const [newPoll, setNewPoll] = useState({
    question: '',
    channel_id: '',
    duration: 86400, // 1 day default
    allow_multiple_choices: false,
    anonymous: false,
    options: ['', '']
  });

  useEffect(() => {
    fetchPolls();
    fetchChannels();
  }, [serverId]);

  const fetchPolls = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/polls/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPolls(data);
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
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

  const createPoll = async () => {
    const validOptions = newPoll.options.filter(opt => opt.trim() !== '');
    
    if (!newPoll.question || !newPoll.channel_id) {
      toast.error('❌ Lütfen soru ve kanal seçin');
      return;
    }

    if (validOptions.length < 2) {
      toast.error('❌ En az 2 seçenek gerekli');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/polls/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          question: newPoll.question,
          channel_id: newPoll.channel_id,
          duration: newPoll.duration,
          allow_multiple_choices: newPoll.allow_multiple_choices,
          anonymous: newPoll.anonymous,
          options: validOptions
        })
      });

      if (response.ok) {
        toast.success('✅ Anket oluşturuldu!');
        setShowCreateModal(false);
        fetchPolls();
        setNewPoll({
          question: '',
          channel_id: '',
          duration: 86400,
          allow_multiple_choices: false,
          anonymous: false,
          options: ['', '']
        });
      } else {
        toast.error('❌ Anket oluşturulamadı');
      }
    } catch (error) {
      console.error('Error creating poll:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const vote = async (pollId, optionId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/polls/${pollId}/vote/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option_id: optionId })
      });

      if (response.ok) {
        toast.success('✅ Oyunuz kaydedildi');
        fetchPolls();
      } else {
        const data = await response.json();
        toast.error(`❌ ${data.error || 'Oy kullanılamadı'}`);
      }
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const endPoll = async (pollId) => {
    if (!window.confirm('Anketi sonlandırmak istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${apiBaseUrl}/polls/${pollId}/end/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        toast.success('✅ Anket sonlandırıldı');
        fetchPolls();
      } else {
        toast.error('❌ Anket sonlandırılamadı');
      }
    } catch (error) {
      console.error('Error ending poll:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const deletePoll = async (pollId) => {
    if (!window.confirm('Anketi silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${apiBaseUrl}/polls/${pollId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        toast.success('✅ Anket silindi');
        fetchPolls();
      } else {
        toast.error('❌ Anket silinemedi');
      }
    } catch (error) {
      console.error('Error deleting poll:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const addOption = () => {
    if (newPoll.options.length < 10) {
      setNewPoll({ ...newPoll, options: [...newPoll.options, ''] });
    } else {
      toast.warning('⚠️ Maksimum 10 seçenek eklenebilir');
    }
  };

  const removeOption = (index) => {
    if (newPoll.options.length > 2) {
      const newOptions = newPoll.options.filter((_, i) => i !== index);
      setNewPoll({ ...newPoll, options: newOptions });
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...newPoll.options];
    newOptions[index] = value;
    setNewPoll({ ...newPoll, options: newOptions });
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { text: 'Aktif', color: '#10b981' },
      ended: { text: 'Sonlandı', color: '#6b7280' }
    };
    return badges[status] || badges.active;
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

  const calculatePercentage = (votes, totalVotes) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div className="polls-panel-overlay" onClick={onClose}>
      <div className="polls-panel" onClick={(e) => e.stopPropagation()}>
        <div className="polls-header">
          <h2>📊 Anketler</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="polls-content">
          <div className="polls-actions">
            <button className="create-poll-btn" onClick={() => setShowCreateModal(true)}>
              + Yeni Anket Oluştur
            </button>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Anketler yükleniyor...</p>
            </div>
          ) : polls.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📊</span>
              <p>Henüz anket yok</p>
              <span className="empty-hint">Yeni bir anket oluşturun!</span>
            </div>
          ) : (
            <div className="polls-list">
              {polls.map((poll) => {
                const totalVotes = poll.options.reduce((sum, opt) => sum + (opt.votes || 0), 0);
                
                return (
                  <div key={poll.id} className="poll-card">
                    <div className="poll-card-header">
                      <h3>{poll.question}</h3>
                      <span 
                        className="status-badge" 
                        style={{ background: getStatusBadge(poll.status).color }}
                      >
                        {getStatusBadge(poll.status).text}
                      </span>
                    </div>

                    <div className="poll-info">
                      <div className="info-item">
                        <span className="info-label">Toplam Oy:</span>
                        <span className="info-value">{totalVotes}</span>
                      </div>
                      {poll.status === 'active' && (
                        <div className="info-item">
                          <span className="info-label">Kalan Süre:</span>
                          <span className="info-value time-remaining">
                            {formatTimeRemaining(poll.end_time)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="poll-options">
                      {poll.options.map((option) => {
                        const percentage = calculatePercentage(option.votes || 0, totalVotes);
                        const isWinner = poll.status === 'ended' && option.votes === Math.max(...poll.options.map(o => o.votes || 0));

                        return (
                          <div 
                            key={option.id} 
                            className={`poll-option ${poll.status === 'active' ? 'clickable' : ''} ${isWinner ? 'winner' : ''}`}
                            onClick={() => poll.status === 'active' && vote(poll.id, option.id)}
                          >
                            <div className="option-text">
                              {option.text}
                              {isWinner && <span className="winner-badge">🏆 Kazanan</span>}
                            </div>
                            <div className="option-stats">
                              <span className="option-votes">{option.votes || 0} oy</span>
                              <span className="option-percentage">{percentage}%</span>
                            </div>
                            <div className="option-bar">
                              <div 
                                className="option-bar-fill" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="poll-meta">
                      {poll.allow_multiple_choices && (
                        <span className="meta-badge">✓ Çoklu seçim</span>
                      )}
                      {poll.anonymous && (
                        <span className="meta-badge">🔒 Anonim</span>
                      )}
                    </div>

                    <div className="poll-card-footer">
                      {poll.status === 'active' && (
                        <button 
                          className="end-poll-btn"
                          onClick={() => endPoll(poll.id)}
                        >
                          🏁 Sonlandır
                        </button>
                      )}
                      <button 
                        className="delete-poll-btn"
                        onClick={() => deletePoll(poll.id)}
                      >
                        🗑️ Sil
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {showCreateModal && (
          <div className="create-modal-overlay" onClick={() => setShowCreateModal(false)}>
            <div className="create-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Yeni Anket Oluştur</h3>
                <button className="close-btn" onClick={() => setShowCreateModal(false)}>×</button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label>Soru *</label>
                  <input
                    type="text"
                    placeholder="En sevdiğiniz programlama dili hangisi?"
                    value={newPoll.question}
                    onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Kanal *</label>
                    <select
                      value={newPoll.channel_id}
                      onChange={(e) => setNewPoll({ ...newPoll, channel_id: e.target.value })}
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
                    <label>Süre</label>
                    <select
                      value={newPoll.duration}
                      onChange={(e) => setNewPoll({ ...newPoll, duration: parseInt(e.target.value) })}
                    >
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
                </div>

                <div className="form-group">
                  <label>Seçenekler * (En az 2, en fazla 10)</label>
                  <div className="options-list">
                    {newPoll.options.map((option, index) => (
                      <div key={index} className="option-input-row">
                        <input
                          type="text"
                          placeholder={`Seçenek ${index + 1}`}
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                        />
                        {newPoll.options.length > 2 && (
                          <button 
                            className="remove-option-btn"
                            onClick={() => removeOption(index)}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button className="add-option-btn" onClick={addOption}>
                    + Seçenek Ekle
                  </button>
                </div>

                <div className="poll-settings">
                  <h4>Anket Ayarları</h4>
                  
                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newPoll.allow_multiple_choices}
                        onChange={(e) => setNewPoll({ ...newPoll, allow_multiple_choices: e.target.checked })}
                      />
                      <span>Çoklu seçime izin ver</span>
                    </label>
                    <p className="setting-hint">Kullanıcılar birden fazla seçenek seçebilir</p>
                  </div>

                  <div className="setting-item">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={newPoll.anonymous}
                        onChange={(e) => setNewPoll({ ...newPoll, anonymous: e.target.checked })}
                      />
                      <span>Anonim oylama</span>
                    </label>
                    <p className="setting-hint">Kimler oy verdi gösterilmez</p>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="cancel-btn" onClick={() => setShowCreateModal(false)}>
                  İptal
                </button>
                <button className="submit-btn" onClick={createPoll}>
                  📊 Anket Oluştur
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PollsPanel;


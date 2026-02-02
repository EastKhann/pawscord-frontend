import React, { useState, useEffect } from 'react';
import './SuggestionsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const SuggestionsPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [config, setConfig] = useState({
    enabled: false,
    channel_id: '',
    review_channel_id: '',
    auto_approve: false,
    upvote_emoji: '👍',
    downvote_emoji: '👎',
    min_votes_to_approve: 10
  });
  const [suggestions, setSuggestions] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchConfig();
    fetchSuggestions();
    fetchChannels();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/suggestions/server/${serverId}/config/`, {
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

  const fetchSuggestions = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/suggestions/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data);
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
      const response = await fetch(`${apiBaseUrl}/suggestions/server/${serverId}/config/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('✅ Öneri ayarları kaydedildi');
      } else {
        toast.error('❌ Kaydetme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`${apiBaseUrl}/suggestions/${id}/status/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });
      if (response.ok) {
        toast.success(`✅ Öneri ${status === 'approved' ? 'onaylandı' : status === 'rejected' ? 'reddedildi' : 'güncellendi'}`);
        fetchSuggestions();
      }
    } catch (error) {
      toast.error('❌ Güncelleme hatası');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: 'Beklemede', color: '#f59e0b', icon: '⏳' },
      approved: { text: 'Onaylandı', color: '#22c55e', icon: '✅' },
      rejected: { text: 'Reddedildi', color: '#ef4444', icon: '❌' },
      implemented: { text: 'Uygulandı', color: '#8b5cf6', icon: '🎉' }
    };
    return badges[status] || badges.pending;
  };

  const filteredSuggestions = suggestions.filter(s => 
    filter === 'all' || s.status === filter
  );

  return (
    <div className="suggestions-overlay" onClick={onClose}>
      <div className="suggestions-panel" onClick={(e) => e.stopPropagation()}>
        <div className="suggestions-header">
          <h2>💡 Öneri Sistemi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="suggestions-content">
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
                    <label>📢 Öneri Kanalı</label>
                    <select value={config.channel_id} onChange={(e) => setConfig({...config, channel_id: e.target.value})}>
                      <option value="">Seçin</option>
                      {channels.map(ch => <option key={ch.id} value={ch.id}># {ch.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>📋 İnceleme Kanalı</label>
                    <select value={config.review_channel_id} onChange={(e) => setConfig({...config, review_channel_id: e.target.value})}>
                      <option value="">Seçin</option>
                      {channels.map(ch => <option key={ch.id} value={ch.id}># {ch.name}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>👍 Upvote Emoji</label>
                    <input type="text" value={config.upvote_emoji} onChange={(e) => setConfig({...config, upvote_emoji: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label>👎 Downvote Emoji</label>
                    <input type="text" value={config.downvote_emoji} onChange={(e) => setConfig({...config, downvote_emoji: e.target.value})} />
                  </div>

                  <div className="form-group">
                    <label>🎯 Otomatik Onay Eşiği</label>
                    <input type="number" min="0" max="100" value={config.min_votes_to_approve} onChange={(e) => setConfig({...config, min_votes_to_approve: parseInt(e.target.value)})} />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input type="checkbox" checked={config.auto_approve} onChange={(e) => setConfig({...config, auto_approve: e.target.checked})} />
                      <span>Otomatik onaylama</span>
                    </label>
                  </div>
                </div>

                <button className="save-btn" onClick={saveConfig}>💾 Kaydet</button>
              </div>

              <div className="suggestions-section">
                <div className="suggestions-filters">
                  <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Tümü ({suggestions.length})</button>
                  <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>Beklemede ({suggestions.filter(s => s.status === 'pending').length})</button>
                  <button className={filter === 'approved' ? 'active' : ''} onClick={() => setFilter('approved')}>Onaylı ({suggestions.filter(s => s.status === 'approved').length})</button>
                  <button className={filter === 'rejected' ? 'active' : ''} onClick={() => setFilter('rejected')}>Reddedildi ({suggestions.filter(s => s.status === 'rejected').length})</button>
                </div>

                {filteredSuggestions.length === 0 ? (
                  <div className="empty-state">
                    <span className="empty-icon">💡</span>
                    <p>Öneri bulunamadı</p>
                  </div>
                ) : (
                  <div className="suggestions-list">
                    {filteredSuggestions.map((suggestion) => {
                      const badge = getStatusBadge(suggestion.status);
                      return (
                        <div key={suggestion.id} className="suggestion-card">
                          <div className="suggestion-header">
                            <div className="suggestion-author">
                              {suggestion.author_avatar ? <img src={suggestion.author_avatar} alt="" /> : <div className="default-avatar">👤</div>}
                              <span>{suggestion.author_name}</span>
                            </div>
                            <span className="status-badge" style={{background: badge.color}}>
                              {badge.icon} {badge.text}
                            </span>
                          </div>
                          <div className="suggestion-content">
                            <h4>{suggestion.title}</h4>
                            <p>{suggestion.description}</p>
                          </div>
                          <div className="suggestion-votes">
                            <span className="upvotes">{config.upvote_emoji} {suggestion.upvotes}</span>
                            <span className="downvotes">{config.downvote_emoji} {suggestion.downvotes}</span>
                          </div>
                          {suggestion.status === 'pending' && (
                            <div className="suggestion-actions">
                              <button className="approve-btn" onClick={() => updateStatus(suggestion.id, 'approved')}>✅ Onayla</button>
                              <button className="reject-btn" onClick={() => updateStatus(suggestion.id, 'rejected')}>❌ Reddet</button>
                              <button className="implement-btn" onClick={() => updateStatus(suggestion.id, 'implemented')}>🎉 Uygulandı</button>
                            </div>
                          )}
                        </div>
                      );
                    })}
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

export default SuggestionsPanel;


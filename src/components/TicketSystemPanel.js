import React, { useState, useEffect } from 'react';
import './TicketSystemPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const TicketSystemPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    enabled: false,
    category_id: '',
    support_role_id: '',
    max_tickets_per_user: 3,
    auto_close_after: 48, // hours
    transcript_channel_id: '',
    welcome_message: 'Merhaba! Destek ekibimiz en kısa sürede size yardımcı olacak.'
  });
  const [categories, setCategories] = useState([]);
  const [roles, setRoles] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchConfig();
    fetchTickets();
    fetchCategories();
    fetchRoles();
    fetchChannels();
  }, [serverId]);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/config/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setTickets(data);
      }
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/categories/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  const updateConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/config/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(config)
      });

      if (response.ok) {
        toast.success('✅ Ayarlar güncellendi');
      } else {
        toast.error('❌ Ayarlar güncellenemedi');
      }
    } catch (error) {
      console.error('Error updating config:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const closeTicket = async (ticketId) => {
    if (!await confirmDialog('Ticket\'ı kapatmak istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/close/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        toast.success('✅ Ticket kapatıldı');
        fetchTickets();
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket(null);
        }
      } else {
        toast.error('❌ Ticket kapatılamadı');
      }
    } catch (error) {
      console.error('Error closing ticket:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const assignTicket = async (ticketId, userId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/assign/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userId })
      });

      if (response.ok) {
        toast.success('✅ Ticket atandı');
        fetchTickets();
      } else {
        toast.error('❌ Ticket atanamadı');
      }
    } catch (error) {
      console.error('Error assigning ticket:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const setPriority = async (ticketId, priority) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/priority/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ priority })
      });

      if (response.ok) {
        toast.success('✅ Öncelik güncellendi');
        fetchTickets();
      } else {
        toast.error('❌ Öncelik güncellenemedi');
      }
    } catch (error) {
      console.error('Error setting priority:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${selectedTicket.id}/reply/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: newMessage })
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedTicket({
          ...selectedTicket,
          messages: [...(selectedTicket.messages || []), data.message]
        });
        setNewMessage('');
        toast.success('✅ Mesaj gönderildi');
      } else {
        toast.error('❌ Mesaj gönderilemedi');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const exportTranscript = async (ticketId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/transcript/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${ticketId}-transcript.txt`;
        a.click();
        toast.success('✅ Transcript indirildi');
      } else {
        toast.error('❌ Transcript indirilemedi');
      }
    } catch (error) {
      console.error('Error exporting transcript:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      open: { text: 'Açık', color: '#10b981' },
      assigned: { text: 'Atandı', color: '#f59e0b' },
      closed: { text: 'Kapalı', color: '#6b7280' }
    };
    return badges[status] || badges.open;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: { text: 'Düşük', color: '#10b981' },
      medium: { text: 'Orta', color: '#f59e0b' },
      high: { text: 'Yüksek', color: '#ef4444' },
      urgent: { text: 'Acil', color: '#dc2626' }
    };
    return badges[priority] || badges.medium;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="ticket-panel-overlay" onClick={onClose}>
      <div className="ticket-panel" onClick={(e) => e.stopPropagation()}>
        <div className="ticket-header">
          <h2>🎫 Destek Sistemi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="ticket-content">
          <div className="ticket-config-section">
            <h3>⚙️ Sistem Ayarları</h3>
            
            <div className="config-grid">
              <div className="config-item">
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={config.enabled}
                    onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                  />
                  <span className="toggle-switch"></span>
                  <span className="toggle-text">Ticket Sistemi Aktif</span>
                </label>
              </div>

              <div className="config-item">
                <label>Ticket Kategorisi</label>
                <select
                  value={config.category_id}
                  onChange={(e) => setConfig({ ...config, category_id: e.target.value })}
                >
                  <option value="">Kategori Seçin</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="config-item">
                <label>Destek Rolü</label>
                <select
                  value={config.support_role_id}
                  onChange={(e) => setConfig({ ...config, support_role_id: e.target.value })}
                >
                  <option value="">Rol Seçin</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="config-item">
                <label>Kullanıcı Başına Max Ticket</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={config.max_tickets_per_user}
                  onChange={(e) => setConfig({ ...config, max_tickets_per_user: parseInt(e.target.value) })}
                />
              </div>

              <div className="config-item">
                <label>Otomatik Kapanma (Saat)</label>
                <input
                  type="number"
                  min="1"
                  max="168"
                  value={config.auto_close_after}
                  onChange={(e) => setConfig({ ...config, auto_close_after: parseInt(e.target.value) })}
                />
              </div>

              <div className="config-item">
                <label>Transcript Kanalı</label>
                <select
                  value={config.transcript_channel_id}
                  onChange={(e) => setConfig({ ...config, transcript_channel_id: e.target.value })}
                >
                  <option value="">Kanal Seçin (Opsiyonel)</option>
                  {channels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      # {channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="config-item full-width">
                <label>Hoş Geldin Mesajı</label>
                <textarea
                  value={config.welcome_message}
                  onChange={(e) => setConfig({ ...config, welcome_message: e.target.value })}
                  rows="3"
                />
              </div>
            </div>

            <button className="save-config-btn" onClick={updateConfig}>
              💾 Ayarları Kaydet
            </button>
          </div>

          <div className="tickets-section">
            <h3>📋 Aktif Ticket'lar</h3>

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Ticket'lar yükleniyor...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">🎫</span>
                <p>Henüz ticket yok</p>
                <span className="empty-hint">Kullanıcılar ticket oluşturduğunda burada görünecek</span>
              </div>
            ) : (
              <div className="tickets-grid">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket.id} 
                    className="ticket-card"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="ticket-card-header">
                      <div className="ticket-info">
                        <span className="ticket-id">#{ticket.id}</span>
                        <h4>{ticket.subject || 'Destek Talebi'}</h4>
                      </div>
                      <div className="ticket-badges">
                        <span 
                          className="status-badge" 
                          style={{ background: getStatusBadge(ticket.status).color }}
                        >
                          {getStatusBadge(ticket.status).text}
                        </span>
                        <span 
                          className="priority-badge" 
                          style={{ background: getPriorityBadge(ticket.priority).color }}
                        >
                          {getPriorityBadge(ticket.priority).text}
                        </span>
                      </div>
                    </div>

                    <div className="ticket-meta">
                      <div className="meta-item">
                        <span className="meta-label">Oluşturan:</span>
                        <span className="meta-value">{ticket.creator_username}</span>
                      </div>
                      {ticket.assigned_to && (
                        <div className="meta-item">
                          <span className="meta-label">Atanan:</span>
                          <span className="meta-value">{ticket.assigned_to_username}</span>
                        </div>
                      )}
                      <div className="meta-item">
                        <span className="meta-label">Oluşturulma:</span>
                        <span className="meta-value">{formatDate(ticket.created_at)}</span>
                      </div>
                    </div>

                    <div className="ticket-actions-quick">
                      <button 
                        className="priority-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          const priorities = ['low', 'medium', 'high', 'urgent'];
                          const currentIndex = priorities.indexOf(ticket.priority);
                          const nextPriority = priorities[(currentIndex + 1) % priorities.length];
                          setPriority(ticket.id, nextPriority);
                        }}
                      >
                        🏷️ Öncelik
                      </button>
                      <button 
                        className="close-ticket-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          closeTicket(ticket.id);
                        }}
                      >
                        ✓ Kapat
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedTicket && (
          <div className="ticket-detail-modal" onClick={() => setSelectedTicket(null)}>
            <div className="ticket-detail-panel" onClick={(e) => e.stopPropagation()}>
              <div className="detail-header">
                <div>
                  <span className="ticket-id-large">#{selectedTicket.id}</span>
                  <h3>{selectedTicket.subject || 'Destek Talebi'}</h3>
                </div>
                <button className="close-btn" onClick={() => setSelectedTicket(null)}>×</button>
              </div>

              <div className="detail-body">
                <div className="messages-container">
                  {selectedTicket.messages?.map((msg, index) => (
                    <div key={index} className="message-item">
                      <div className="message-author">
                        <span className="author-name">{msg.author}</span>
                        <span className="message-time">{formatDate(msg.created_at)}</span>
                      </div>
                      <div className="message-content">{msg.content}</div>
                    </div>
                  ))}
                </div>

                <div className="message-input-container">
                  <input
                    type="text"
                    placeholder="Mesajınızı yazın..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <button className="send-btn" onClick={sendMessage}>
                    📤 Gönder
                  </button>
                </div>
              </div>

              <div className="detail-footer">
                <button 
                  className="export-btn"
                  onClick={() => exportTranscript(selectedTicket.id)}
                >
                  📄 Transcript İndir
                </button>
                <button 
                  className="close-ticket-btn-large"
                  onClick={() => closeTicket(selectedTicket.id)}
                >
                  ✓ Ticket'ı Kapat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSystemPanel;


import React, { useState, useEffect } from 'react';
import './WebhooksPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';
import confirmDialog from '../utils/confirmDialog';

const WebhooksPanel = ({ serverId, onClose }) => {
  const [webhooks, setWebhooks] = useState([]);
  const [creating, setCreating] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    channel_id: '',
    avatar_url: ''
  });
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingWebhook, setEditingWebhook] = useState(null);
  const [logs, setLogs] = useState([]);
  const [viewingLogs, setViewingLogs] = useState(null);

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    if (serverId) {
      fetchWebhooks();
      fetchChannels();
    }
  }, [serverId]);

  // Fetch webhooks for server
  const fetchWebhooks = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/webhooks/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWebhooks(data.webhooks || []);
      }
    } catch (error) {
      console.error('Error fetching webhooks:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch channels for server
  const fetchChannels = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setChannels(data.channels || []);
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  // Create webhook
  const createWebhook = async () => {
    if (!newWebhook.name || !newWebhook.channel_id) {
      toast.error('❌ Webhook adı ve kanal seçimi zorunludur');
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/webhooks/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          ...newWebhook
        })
      });

      if (response.ok) {
        const data = await response.json();
        setWebhooks([...webhooks, data.webhook]);
        setNewWebhook({ name: '', channel_id: '', avatar_url: '' });
        setCreating(false);
        toast.success('✅ Webhook başarıyla oluşturuldu');
      } else {
        toast.error('❌ Webhook oluşturulamadı');
      }
    } catch (error) {
      console.error('Error creating webhook:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Update webhook
  const updateWebhook = async (webhookId, updates) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        setWebhooks(webhooks.map(w => w.id === webhookId ? data.webhook : w));
        setEditingWebhook(null);
        toast.success('✅ Webhook güncellendi');
      } else {
        toast.error('❌ Webhook güncellenemedi');
      }
    } catch (error) {
      console.error('Error updating webhook:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Delete webhook
  const deleteWebhook = async (webhookId) => {
    if (!await confirmDialog('Bu webhook\'u silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setWebhooks(webhooks.filter(w => w.id !== webhookId));
        toast.success('✅ Webhook silindi');
      } else {
        toast.error('❌ Webhook silinemedi');
      }
    } catch (error) {
      console.error('Error deleting webhook:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Test webhook
  const testWebhook = async (webhookId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/test/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('✅ Test mesajı gönderildi');
      } else {
        toast.error('❌ Test mesajı gönderilemedi');
      }
    } catch (error) {
      console.error('Error testing webhook:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Regenerate webhook token
  const regenerateToken = async (webhookId) => {
    if (!await confirmDialog('Webhook tokenini yenilemek istediğinizden emin misiniz? Eski token geçersiz hale gelecek.')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/regenerate-token/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWebhooks(webhooks.map(w => w.id === webhookId ? { ...w, token: data.token } : w));
        toast.success('✅ Token yenilendi');
      } else {
        toast.error('❌ Token yenilenemedi');
      }
    } catch (error) {
      console.error('Error regenerating token:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  // Fetch webhook logs
  const fetchWebhookLogs = async (webhookId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${apiBaseUrl}/webhooks/${webhookId}/logs/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLogs(data.logs || []);
        setViewingLogs(webhookId);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      toast.error('❌ Loglar yüklenemedi');
    }
  };

  // Copy webhook URL
  const copyWebhookUrl = (webhook) => {
    const url = `${apiBaseUrl}/webhooks/${webhook.id}/${webhook.token}`;
    navigator.clipboard.writeText(url);
    toast.success('✅ Webhook URL kopyalandı');
  };

  if (loading) {
    return (
      <div className="webhooks-overlay">
        <div className="webhooks-panel">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Webhooklar yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="webhooks-overlay" onClick={onClose}>
      <div className="webhooks-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="webhooks-header">
          <h2>🔗 Webhook Yönetimi</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Content */}
        <div className="webhooks-content">
          {/* Create Webhook Button */}
          {!creating && (
            <button className="create-webhook-btn" onClick={() => setCreating(true)}>
              ➕ Yeni Webhook Oluştur
            </button>
          )}

          {/* Create Webhook Form */}
          {creating && (
            <div className="create-webhook-form">
              <h3>Yeni Webhook</h3>
              <div className="form-group">
                <label>Webhook Adı *</label>
                <input
                  type="text"
                  placeholder="Örn: GitHub Bot"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Kanal *</label>
                <select
                  value={newWebhook.channel_id}
                  onChange={(e) => setNewWebhook({ ...newWebhook, channel_id: e.target.value })}
                >
                  <option value="">Kanal seçin...</option>
                  {channels.map(channel => (
                    <option key={channel.id} value={channel.id}>
                      #{channel.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Avatar URL (Opsiyonel)</label>
                <input
                  type="text"
                  placeholder="https://example.com/avatar.png"
                  value={newWebhook.avatar_url}
                  onChange={(e) => setNewWebhook({ ...newWebhook, avatar_url: e.target.value })}
                />
              </div>

              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setCreating(false)}>
                  İptal
                </button>
                <button className="submit-btn" onClick={createWebhook}>
                  Oluştur
                </button>
              </div>
            </div>
          )}

          {/* Webhooks List */}
          {webhooks.length > 0 ? (
            <div className="webhooks-list">
              {webhooks.map(webhook => (
                <div key={webhook.id} className="webhook-card">
                  {editingWebhook === webhook.id ? (
                    // Edit Mode
                    <div className="edit-webhook-form">
                      <div className="form-group">
                        <label>Webhook Adı</label>
                        <input
                          type="text"
                          defaultValue={webhook.name}
                          id={`edit-name-${webhook.id}`}
                        />
                      </div>

                      <div className="form-group">
                        <label>Kanal</label>
                        <select
                          defaultValue={webhook.channel_id}
                          id={`edit-channel-${webhook.id}`}
                        >
                          {channels.map(channel => (
                            <option key={channel.id} value={channel.id}>
                              #{channel.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Avatar URL</label>
                        <input
                          type="text"
                          defaultValue={webhook.avatar_url || ''}
                          id={`edit-avatar-${webhook.id}`}
                        />
                      </div>

                      <div className="form-actions">
                        <button
                          className="cancel-btn"
                          onClick={() => setEditingWebhook(null)}
                        >
                          İptal
                        </button>
                        <button
                          className="submit-btn"
                          onClick={() => {
                            const name = document.getElementById(`edit-name-${webhook.id}`).value;
                            const channel_id = document.getElementById(`edit-channel-${webhook.id}`).value;
                            const avatar_url = document.getElementById(`edit-avatar-${webhook.id}`).value;
                            updateWebhook(webhook.id, { name, channel_id, avatar_url });
                          }}
                        >
                          Kaydet
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="webhook-info">
                        <div className="webhook-avatar">
                          {webhook.avatar_url ? (
                            <img src={webhook.avatar_url} alt={webhook.name} />
                          ) : (
                            <div className="default-avatar">🔗</div>
                          )}
                        </div>
                        <div className="webhook-details">
                          <h4>{webhook.name}</h4>
                          <p>#{channels.find(c => c.id === webhook.channel_id)?.name || 'Bilinmeyen Kanal'}</p>
                          <span className="webhook-id">ID: {webhook.id}</span>
                        </div>
                      </div>

                      <div className="webhook-url">
                        <label>Webhook URL:</label>
                        <div className="url-display">
                          <code>{`${apiBaseUrl}/webhooks/${webhook.id}/${webhook.token}`}</code>
                          <button
                            className="copy-btn"
                            onClick={() => copyWebhookUrl(webhook)}
                            title="URL'yi kopyala"
                          >
                            📋
                          </button>
                        </div>
                      </div>

                      <div className="webhook-actions">
                        <button
                          className="action-btn test-btn"
                          onClick={() => testWebhook(webhook.id)}
                          title="Test mesajı gönder"
                        >
                          🧪 Test
                        </button>
                        <button
                          className="action-btn logs-btn"
                          onClick={() => fetchWebhookLogs(webhook.id)}
                          title="Logları görüntüle"
                        >
                          📊 Loglar
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => setEditingWebhook(webhook.id)}
                          title="Düzenle"
                        >
                          ✏️
                        </button>
                        <button
                          className="action-btn regenerate-btn"
                          onClick={() => regenerateToken(webhook.id)}
                          title="Token yenile"
                        >
                          🔄
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => deleteWebhook(webhook.id)}
                          title="Sil"
                        >
                          🗑️
                        </button>
                      </div>

                      {/* Webhook Stats */}
                      <div className="webhook-stats">
                        <div className="stat">
                          <span className="stat-label">Toplam Çağrı:</span>
                          <span className="stat-value">{webhook.total_calls || 0}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Başarılı:</span>
                          <span className="stat-value success">{webhook.successful_calls || 0}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Başarısız:</span>
                          <span className="stat-value error">{webhook.failed_calls || 0}</span>
                        </div>
                        <div className="stat">
                          <span className="stat-label">Son Çağrı:</span>
                          <span className="stat-value">
                            {webhook.last_call ? new Date(webhook.last_call).toLocaleString('tr-TR') : 'Hiç'}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : !creating && (
            <div className="empty-state">
              <div className="empty-icon">🔗</div>
              <h3>Henüz webhook yok</h3>
              <p>Dış uygulamalardan mesaj göndermek için webhook oluşturun</p>
            </div>
          )}

          {/* Webhook Logs Modal */}
          {viewingLogs && (
            <div className="logs-modal" onClick={() => setViewingLogs(null)}>
              <div className="logs-content" onClick={(e) => e.stopPropagation()}>
                <div className="logs-header">
                  <h3>📊 Webhook Logları</h3>
                  <button className="close-btn" onClick={() => setViewingLogs(null)}>×</button>
                </div>

                <div className="logs-list">
                  {logs.length > 0 ? (
                    logs.map((log, index) => (
                      <div key={index} className={`log-item ${log.status}`}>
                        <div className="log-time">
                          {new Date(log.timestamp).toLocaleString('tr-TR')}
                        </div>
                        <div className="log-status">
                          {log.status === 'success' ? '✅' : '❌'} {log.status}
                        </div>
                        <div className="log-message">{log.message}</div>
                        {log.error && <div className="log-error">Hata: {log.error}</div>}
                      </div>
                    ))
                  ) : (
                    <p className="empty-state">Henüz log kaydı yok</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebhooksPanel;


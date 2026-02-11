import { useState, useEffect } from 'react';
import './AuditLogsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const AuditLogsPanel = ({ serverId, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    action_type: '', // message_delete, message_edit, member_join, member_leave, role_change, channel_create, etc.
    user_id: '',
    target_user_id: '',
    channel_id: '',
    start_date: '',
    end_date: ''
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    if (serverId) {
      fetchLogs();
    }
  }, [serverId, page]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const params = new URLSearchParams({
        page,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''))
      });

      const response = await fetch(`${apiBaseUrl}/audit-logs/server/${serverId}/?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (page === 1) {
          setLogs(data.logs || []);
        } else {
          setLogs([...logs, ...(data.logs || [])]);
        }
        setHasMore(data.has_more || false);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error('❌ Audit logları yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setPage(1);
    fetchLogs();
  };

  const clearFilters = () => {
    setFilters({
      action_type: '',
      user_id: '',
      target_user_id: '',
      channel_id: '',
      start_date: '',
      end_date: ''
    });
    setPage(1);
  };

  const exportLogs = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const params = new URLSearchParams({
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''))
      });

      const response = await fetch(`${apiBaseUrl}/audit-logs/server/${serverId}/export/?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit_logs_${serverId}.csv`;
        a.click();
        toast.success('✅ Audit logları dışa aktarıldı');
      }
    } catch (error) {
      console.error('Error exporting logs:', error);
      toast.error('❌ Dışa aktarma başarısız');
    }
  };

  const getActionIcon = (actionType) => {
    const icons = {
      'message_delete': '🗑️',
      'message_edit': '✏️',
      'member_join': '👋',
      'member_leave': '👋',
      'member_kick': '🚫',
      'member_ban': '🔨',
      'member_unban': '✅',
      'role_create': '🎭',
      'role_delete': '🗑️',
      'role_update': '🎨',
      'role_assign': '⭐',
      'role_remove': '➖',
      'channel_create': '➕',
      'channel_delete': '❌',
      'channel_update': '🔧',
      'server_update': '⚙️',
      'invite_create': '🔗',
      'webhook_create': '🤖',
      'webhook_delete': '🗑️',
      'emoji_create': '😀',
      'emoji_delete': '😢',
      'pin_add': '📌',
      'pin_remove': '📌',
      'reaction_add': '❤️',
      'reaction_remove': '💔'
    };
    return icons[actionType] || '📝';
  };

  const getActionColor = (actionType) => {
    if (actionType.includes('delete') || actionType.includes('remove') || actionType.includes('kick') || actionType.includes('ban')) {
      return '#ef4444';
    }
    if (actionType.includes('create') || actionType.includes('add') || actionType.includes('join')) {
      return '#10b981';
    }
    if (actionType.includes('edit') || actionType.includes('update')) {
      return '#f59e0b';
    }
    return '#6366f1';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Az önce';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} dakika önce`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} saat önce`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} gün önce`;

    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="audit-logs-overlay" onClick={onClose}>
      <div className="audit-logs-panel" onClick={(e) => e.stopPropagation()}>
        <div className="audit-header">
          <h2>📋 Audit Logs</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="filters-section">
          <div className="filter-grid">
            <div className="filter-group">
              <label>Aksiyon Türü</label>
              <select
                value={filters.action_type}
                onChange={(e) => setFilters({ ...filters, action_type: e.target.value })}
              >
                <option value="">Tümü</option>
                <optgroup label="Mesajlar">
                  <option value="message_delete">Mesaj Silme</option>
                  <option value="message_edit">Mesaj Düzenleme</option>
                  <option value="pin_add">Pin Ekleme</option>
                  <option value="pin_remove">Pin Kaldırma</option>
                </optgroup>
                <optgroup label="Üyeler">
                  <option value="member_join">Üye Katıldı</option>
                  <option value="member_leave">Üye Ayrıldı</option>
                  <option value="member_kick">Üye Atıldı</option>
                  <option value="member_ban">Üye Banlandı</option>
                  <option value="member_unban">Ban Kaldırıldı</option>
                </optgroup>
                <optgroup label="Roller">
                  <option value="role_create">Rol Oluşturma</option>
                  <option value="role_delete">Rol Silme</option>
                  <option value="role_update">Rol Güncelleme</option>
                  <option value="role_assign">Rol Atama</option>
                  <option value="role_remove">Rol Kaldırma</option>
                </optgroup>
                <optgroup label="Kanallar">
                  <option value="channel_create">Kanal Oluşturma</option>
                  <option value="channel_delete">Kanal Silme</option>
                  <option value="channel_update">Kanal Güncelleme</option>
                </optgroup>
                <optgroup label="Diğer">
                  <option value="server_update">Sunucu Güncelleme</option>
                  <option value="invite_create">Davet Oluşturma</option>
                  <option value="webhook_create">Webhook Oluşturma</option>
                  <option value="webhook_delete">Webhook Silme</option>
                  <option value="emoji_create">Emoji Ekleme</option>
                  <option value="emoji_delete">Emoji Silme</option>
                </optgroup>
              </select>
            </div>

            <div className="filter-group">
              <label>Başlangıç Tarihi</label>
              <input
                type="datetime-local"
                value={filters.start_date}
                onChange={(e) => setFilters({ ...filters, start_date: e.target.value })}
              />
            </div>

            <div className="filter-group">
              <label>Bitiş Tarihi</label>
              <input
                type="datetime-local"
                value={filters.end_date}
                onChange={(e) => setFilters({ ...filters, end_date: e.target.value })}
              />
            </div>

            <div className="filter-group">
              <label>Kullanıcı ID</label>
              <input
                type="text"
                placeholder="Aksiyon yapan kullanıcı"
                value={filters.user_id}
                onChange={(e) => setFilters({ ...filters, user_id: e.target.value })}
              />
            </div>
          </div>

          <div className="filter-actions">
            <button className="filter-btn apply-btn" onClick={applyFilters}>
              🔍 Filtrele
            </button>
            <button className="filter-btn clear-btn" onClick={clearFilters}>
              🗑️ Temizle
            </button>
            <button className="filter-btn export-btn" onClick={exportLogs}>
              📥 Dışa Aktar
            </button>
          </div>
        </div>

        <div className="logs-content">
          {loading && logs.length === 0 ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loglar yükleniyor...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>Henüz audit log yok</p>
              <span>Sunucudaki aksiyonlar burada görünecek</span>
            </div>
          ) : (
            <>
              <div className="logs-list">
                {logs.map((log) => (
                  <div
                    key={log.id}
                    className="log-entry"
                    style={{ borderLeftColor: getActionColor(log.action_type) }}
                  >
                    <div className="log-icon" style={{ background: `${getActionColor(log.action_type)}20` }}>
                      {getActionIcon(log.action_type)}
                    </div>

                    <div className="log-details">
                      <div className="log-header-row">
                        <span className="log-action" style={{ color: getActionColor(log.action_type) }}>
                          {log.action_display || log.action_type}
                        </span>
                        <span className="log-time">{formatDate(log.created_at)}</span>
                      </div>

                      <div className="log-description">
                        {log.description || 'Açıklama yok'}
                      </div>

                      {log.metadata && Object.keys(log.metadata).length > 0 && (
                        <div className="log-metadata">
                          {Object.entries(log.metadata).map(([key, value]) => (
                            <div key={key} className="metadata-item">
                              <span className="metadata-key">{key}:</span>
                              <span className="metadata-value">{JSON.stringify(value)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="log-footer">
                        {log.user && (
                          <span className="log-user">
                            👤 {log.user.username || `User#${log.user.id}`}
                          </span>
                        )}
                        {log.channel && (
                          <span className="log-channel">
                            📢 #{log.channel.name}
                          </span>
                        )}
                        {log.target_user && (
                          <span className="log-target">
                            🎯 {log.target_user.username}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {hasMore && (
                <button
                  className="load-more-btn"
                  onClick={() => setPage(page + 1)}
                  disabled={loading}
                >
                  {loading ? '⏳ Yükleniyor...' : '📄 Daha Fazla Yükle'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditLogsPanel;


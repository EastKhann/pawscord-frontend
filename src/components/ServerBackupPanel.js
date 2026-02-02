import React, { useState, useEffect } from 'react';
import './ServerBackupPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const ServerBackupPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [backupOptions, setBackupOptions] = useState({
    include_channels: true,
    include_roles: true,
    include_messages: false,
    include_settings: true,
    include_emojis: true
  });

  useEffect(() => {
    fetchBackups();
  }, [serverId]);

  const fetchBackups = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/backups/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const data = await response.json();
        setBackups(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createBackup = async () => {
    setCreating(true);
    try {
      const response = await fetch(`${apiBaseUrl}/backups/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ server_id: serverId, ...backupOptions })
      });

      if (response.ok) {
        toast.success('✅ Yedek oluşturuluyor...');
        fetchBackups();
      } else {
        toast.error('❌ Yedek oluşturulamadı');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    } finally {
      setCreating(false);
    }
  };

  const restoreBackup = async (backupId) => {
    if (!window.confirm('Sunucuyu bu yedeğe geri yüklemek istediğinize emin misiniz? Bu işlem geri alınamaz!')) return;
    
    try {
      const response = await fetch(`${apiBaseUrl}/backups/${backupId}/restore/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        toast.success('✅ Sunucu geri yükleniyor...');
      } else {
        toast.error('❌ Geri yükleme hatası');
      }
    } catch (error) {
      toast.error('❌ Bağlantı hatası');
    }
  };

  const downloadBackup = async (backupId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/backups/${backupId}/download/`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${backupId}.json`;
        a.click();
        toast.success('✅ Yedek indiriliyor');
      }
    } catch (error) {
      toast.error('❌ İndirme hatası');
    }
  };

  const deleteBackup = async (backupId) => {
    if (!window.confirm('Yedeği silmek istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/backups/${backupId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.ok) {
        toast.success('✅ Yedek silindi');
        fetchBackups();
      }
    } catch (error) {
      toast.error('❌ Silme hatası');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: { text: 'Tamamlandı', color: '#22c55e', icon: '✅' },
      processing: { text: 'İşleniyor', color: '#f59e0b', icon: '⏳' },
      failed: { text: 'Başarısız', color: '#ef4444', icon: '❌' }
    };
    return badges[status] || badges.processing;
  };

  return (
    <div className="backup-overlay" onClick={onClose}>
      <div className="backup-panel" onClick={(e) => e.stopPropagation()}>
        <div className="backup-header">
          <h2>💾 Sunucu Yedekleme</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="backup-content">
          <div className="create-backup-section">
            <h3>Yeni Yedek Oluştur</h3>
            <div className="backup-options">
              <label className="option-label">
                <input type="checkbox" checked={backupOptions.include_channels} onChange={(e) => setBackupOptions({...backupOptions, include_channels: e.target.checked})} />
                <span>📁 Kanalları dahil et</span>
              </label>
              <label className="option-label">
                <input type="checkbox" checked={backupOptions.include_roles} onChange={(e) => setBackupOptions({...backupOptions, include_roles: e.target.checked})} />
                <span>🎭 Rolleri dahil et</span>
              </label>
              <label className="option-label">
                <input type="checkbox" checked={backupOptions.include_messages} onChange={(e) => setBackupOptions({...backupOptions, include_messages: e.target.checked})} />
                <span>💬 Mesajları dahil et (son 100)</span>
              </label>
              <label className="option-label">
                <input type="checkbox" checked={backupOptions.include_settings} onChange={(e) => setBackupOptions({...backupOptions, include_settings: e.target.checked})} />
                <span>⚙️ Ayarları dahil et</span>
              </label>
              <label className="option-label">
                <input type="checkbox" checked={backupOptions.include_emojis} onChange={(e) => setBackupOptions({...backupOptions, include_emojis: e.target.checked})} />
                <span>😀 Emojileri dahil et</span>
              </label>
            </div>
            <button className="create-backup-btn" onClick={createBackup} disabled={creating}>
              {creating ? '⏳ Oluşturuluyor...' : '💾 Yedek Oluştur'}
            </button>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Yükleniyor...</p>
            </div>
          ) : backups.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">💾</span>
              <p>Henüz yedek yok</p>
            </div>
          ) : (
            <div className="backups-list">
              <h3>Mevcut Yedekler ({backups.length})</h3>
              {backups.map((backup) => {
                const badge = getStatusBadge(backup.status);
                return (
                  <div key={backup.id} className="backup-card">
                    <div className="backup-info">
                      <div className="backup-main">
                        <h4>Yedek #{backup.id}</h4>
                        <div className="backup-meta">
                          <span>📅 {new Date(backup.created_at).toLocaleString('tr-TR')}</span>
                          <span>📦 {formatFileSize(backup.file_size)}</span>
                          <span className="status-badge" style={{background: badge.color}}>
                            {badge.icon} {badge.text}
                          </span>
                        </div>
                        <div className="backup-includes">
                          {backup.includes_channels && <span className="include-badge">📁 Kanallar</span>}
                          {backup.includes_roles && <span className="include-badge">🎭 Roller</span>}
                          {backup.includes_messages && <span className="include-badge">💬 Mesajlar</span>}
                          {backup.includes_settings && <span className="include-badge">⚙️ Ayarlar</span>}
                          {backup.includes_emojis && <span className="include-badge">😀 Emojiler</span>}
                        </div>
                      </div>
                    </div>
                    {backup.status === 'completed' && (
                      <div className="backup-actions">
                        <button className="restore-btn" onClick={() => restoreBackup(backup.id)}>🔄 Geri Yükle</button>
                        <button className="download-btn" onClick={() => downloadBackup(backup.id)}>📥 İndir</button>
                        <button className="delete-btn" onClick={() => deleteBackup(backup.id)}>🗑️ Sil</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServerBackupPanel;


import React, { useState, useEffect } from 'react';
import './CustomCommandsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const CustomCommandsPanel = ({ serverId, onClose }) => {
  const [commands, setCommands] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editingCommand, setEditingCommand] = useState(null);
  const [newCommand, setNewCommand] = useState({
    name: '',
    description: '',
    response: '',
    trigger_type: 'exact', // exact, contains, starts_with, regex
    enabled: true,
    cooldown: 0,
    permissions: 'everyone', // everyone, mods, admins
    delete_trigger: false,
    embed: false,
    embed_color: '#5865f2'
  });
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  const apiBaseUrl = getApiBase();

  useEffect(() => {
    if (serverId) {
      fetchCommands();
      fetchStats();
    }
  }, [serverId]);

  const fetchCommands = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/commands/server/${serverId}/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setCommands(data.commands || []);
      }
    } catch (error) {
      console.error('Error fetching commands:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/commands/server/${serverId}/stats/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const createCommand = async () => {
    if (!newCommand.name || !newCommand.response) {
      toast.error('❌ Komut adı ve yanıt zorunludur');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/commands/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          ...newCommand
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCommands([...commands, data.command]);
        setNewCommand({
          name: '', description: '', response: '', trigger_type: 'exact',
          enabled: true, cooldown: 0, permissions: 'everyone',
          delete_trigger: false, embed: false, embed_color: '#5865f2'
        });
        setCreating(false);
        toast.success('✅ Komut oluşturuldu');
        fetchStats();
      } else {
        toast.error('❌ Komut oluşturulamadı');
      }
    } catch (error) {
      console.error('Error creating command:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const updateCommand = async (commandId, updates) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/commands/${commandId}/update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (response.ok) {
        const data = await response.json();
        setCommands(commands.map(c => c.id === commandId ? data.command : c));
        setEditingCommand(null);
        toast.success('✅ Komut güncellendi');
      } else {
        toast.error('❌ Komut güncellenemedi');
      }
    } catch (error) {
      console.error('Error updating command:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const deleteCommand = async (commandId) => {
    if (!window.confirm('Bu komutu silmek istediğinizden emin misiniz?')) return;

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/commands/${commandId}/delete/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setCommands(commands.filter(c => c.id !== commandId));
        toast.success('✅ Komut silindi');
        fetchStats();
      } else {
        toast.error('❌ Komut silinemedi');
      }
    } catch (error) {
      console.error('Error deleting command:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const toggleCommand = async (commandId, enabled) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/commands/${commandId}/toggle/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enabled })
      });

      if (response.ok) {
        setCommands(commands.map(c => c.id === commandId ? { ...c, enabled } : c));
        toast.success(`✅ Komut ${enabled ? 'etkinleştirildi' : 'devre dışı bırakıldı'}`);
      }
    } catch (error) {
      console.error('Error toggling command:', error);
      toast.error('❌ İşlem başarısız');
    }
  };

  const exportCommands = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/commands/server/${serverId}/export/`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `commands_${serverId}.json`;
        a.click();
        toast.success('✅ Komutlar dışa aktarıldı');
      }
    } catch (error) {
      console.error('Error exporting commands:', error);
      toast.error('❌ Dışa aktarma başarısız');
    }
  };

  const importCommands = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('server_id', serverId);

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${apiBaseUrl}/commands/import/`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      if (response.ok) {
        fetchCommands();
        toast.success('✅ Komutlar içe aktarıldı');
      } else {
        toast.error('❌ İçe aktarma başarısız');
      }
    } catch (error) {
      console.error('Error importing commands:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  if (loading) {
    return (
      <div className="custom-commands-overlay">
        <div className="custom-commands-panel">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Komutlar yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-commands-overlay" onClick={onClose}>
      <div className="custom-commands-panel" onClick={(e) => e.stopPropagation()}>
        <div className="commands-header">
          <h2>⚡ Özel Komutlar</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="commands-content">
          {stats && (
            <div className="stats-overview">
              <div className="stat-card">
                <span className="stat-value">{stats.total_commands || 0}</span>
                <span className="stat-label">Toplam Komut</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.enabled_commands || 0}</span>
                <span className="stat-label">Aktif</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{stats.total_uses || 0}</span>
                <span className="stat-label">Kullanım</span>
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="create-btn" onClick={() => setCreating(true)}>
              ➕ Yeni Komut
            </button>
            <button className="export-btn" onClick={exportCommands}>
              📤 Dışa Aktar
            </button>
            <label className="import-btn">
              📥 İçe Aktar
              <input
                type="file"
                accept=".json"
                onChange={(e) => e.target.files[0] && importCommands(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          {creating && (
            <div className="command-form">
              <h3>Yeni Komut Oluştur</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Komut Adı *</label>
                  <input
                    type="text"
                    placeholder="!komut"
                    value={newCommand.name}
                    onChange={(e) => setNewCommand({ ...newCommand, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Açıklama</label>
                  <input
                    type="text"
                    placeholder="Komut açıklaması"
                    value={newCommand.description}
                    onChange={(e) => setNewCommand({ ...newCommand, description: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Yanıt *</label>
                  <textarea
                    placeholder="Komut yanıtı (değişkenler: {user}, {server}, {channel})"
                    value={newCommand.response}
                    onChange={(e) => setNewCommand({ ...newCommand, response: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="form-group">
                  <label>Tetikleme Tipi</label>
                  <select
                    value={newCommand.trigger_type}
                    onChange={(e) => setNewCommand({ ...newCommand, trigger_type: e.target.value })}
                  >
                    <option value="exact">Tam Eşleşme</option>
                    <option value="contains">İçerir</option>
                    <option value="starts_with">İle Başlar</option>
                    <option value="regex">Regex</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>İzinler</label>
                  <select
                    value={newCommand.permissions}
                    onChange={(e) => setNewCommand({ ...newCommand, permissions: e.target.value })}
                  >
                    <option value="everyone">Herkes</option>
                    <option value="mods">Moderatörler</option>
                    <option value="admins">Adminler</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Cooldown (saniye)</label>
                  <input
                    type="number"
                    min="0"
                    max="300"
                    value={newCommand.cooldown}
                    onChange={(e) => setNewCommand({ ...newCommand, cooldown: parseInt(e.target.value) })}
                  />
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newCommand.delete_trigger}
                      onChange={(e) => setNewCommand({ ...newCommand, delete_trigger: e.target.checked })}
                    />
                    Tetikleyici mesajı sil
                  </label>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={newCommand.embed}
                      onChange={(e) => setNewCommand({ ...newCommand, embed: e.target.checked })}
                    />
                    Embed olarak gönder
                  </label>
                </div>

                {newCommand.embed && (
                  <div className="form-group">
                    <label>Embed Rengi</label>
                    <input
                      type="color"
                      value={newCommand.embed_color}
                      onChange={(e) => setNewCommand({ ...newCommand, embed_color: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button className="cancel-btn" onClick={() => setCreating(false)}>İptal</button>
                <button className="submit-btn" onClick={createCommand}>Oluştur</button>
              </div>
            </div>
          )}

          <div className="commands-list">
            {commands.length > 0 ? (
              commands.map(cmd => (
                <div key={cmd.id} className={`command-card ${!cmd.enabled ? 'disabled' : ''}`}>
                  <div className="command-header">
                    <div className="command-info">
                      <h4>{cmd.name}</h4>
                      {cmd.description && <p>{cmd.description}</p>}
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={cmd.enabled}
                        onChange={(e) => toggleCommand(cmd.id, e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="command-response">
                    <strong>Yanıt:</strong> {cmd.response}
                  </div>

                  <div className="command-meta">
                    <span className="meta-item">🎯 {cmd.trigger_type}</span>
                    <span className="meta-item">👥 {cmd.permissions}</span>
                    {cmd.cooldown > 0 && <span className="meta-item">⏱️ {cmd.cooldown}s</span>}
                    <span className="meta-item">📊 {cmd.use_count || 0} kullanım</span>
                  </div>

                  <div className="command-actions">
                    <button className="edit-btn" onClick={() => setEditingCommand(cmd.id)}>✏️</button>
                    <button className="delete-btn" onClick={() => deleteCommand(cmd.id)}>🗑️</button>
                  </div>
                </div>
              ))
            ) : !creating && (
              <div className="empty-state">
                <div className="empty-icon">⚡</div>
                <h3>Henüz özel komut yok</h3>
                <p>Sunucunuz için özel komutlar oluşturun</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCommandsPanel;


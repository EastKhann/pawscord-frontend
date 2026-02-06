import React, { useState, useEffect } from 'react';
import './AutoRolesPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const AutoRolesPanel = ({ serverId, onClose }) => {
  const apiBaseUrl = getApiBase();

  const [autoRoles, setAutoRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAutoRole, setNewAutoRole] = useState({
    role_id: '',
    trigger_type: 'on_join',
    delay: 0,
    required_level: 0,
    required_invites: 0,
    required_messages: 0,
    remove_after: 0,
    enabled: true
  });

  const triggerTypes = [
    { value: 'on_join', label: 'Sunucuya Katılınca', icon: '👋' },
    { value: 'on_verify', label: 'Doğrulama Sonrası', icon: '✅' },
    { value: 'on_level', label: 'Seviyeye Ulaşınca', icon: '⭐' },
    { value: 'on_invites', label: 'Davet Sayısı', icon: '👥' },
    { value: 'on_messages', label: 'Mesaj Sayısı', icon: '💬' },
    { value: 'on_reaction', label: 'Reaksiyon Verince', icon: '😀' },
    { value: 'on_boost', label: 'Sunucu Boost', icon: '🚀' }
  ];

  useEffect(() => {
    fetchAutoRoles();
    fetchRoles();
  }, [serverId]);

  const fetchAutoRoles = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/auto-roles/server/${serverId}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAutoRoles(data);
      }
    } catch (error) {
      console.error('Error fetching auto roles:', error);
    } finally {
      setLoading(false);
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

  const createAutoRole = async () => {
    if (!newAutoRole.role_id) {
      toast.error('❌ Lütfen rol seçin');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/auto-roles/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          server_id: serverId,
          ...newAutoRole
        })
      });

      if (response.ok) {
        toast.success('✅ Otomatik rol oluşturuldu');
        fetchAutoRoles();
        setNewAutoRole({
          role_id: '',
          trigger_type: 'on_join',
          delay: 0,
          required_level: 0,
          required_invites: 0,
          required_messages: 0,
          remove_after: 0,
          enabled: true
        });
      } else {
        toast.error('❌ Otomatik rol oluşturulamadı');
      }
    } catch (error) {
      console.error('Error creating auto role:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const toggleAutoRole = async (autoRoleId, currentStatus) => {
    try {
      const response = await fetch(`${apiBaseUrl}/auto-roles/${autoRoleId}/toggle/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        toast.success(currentStatus ? '✅ Otomatik rol devre dışı' : '✅ Otomatik rol aktif');
        fetchAutoRoles();
      } else {
        toast.error('❌ Durum güncellenemedi');
      }
    } catch (error) {
      console.error('Error toggling auto role:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const deleteAutoRole = async (autoRoleId) => {
    if (!window.confirm('Otomatik rolü silmek istediğinize emin misiniz?')) return;

    try {
      const response = await fetch(`${apiBaseUrl}/auto-roles/${autoRoleId}/delete/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      if (response.ok) {
        toast.success('✅ Otomatik rol silindi');
        fetchAutoRoles();
      } else {
        toast.error('❌ Otomatik rol silinemedi');
      }
    } catch (error) {
      console.error('Error deleting auto role:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : 'Bilinmeyen Rol';
  };

  const getTriggerLabel = (type) => {
    const trigger = triggerTypes.find(t => t.value === type);
    return trigger ? trigger.label : type;
  };

  const getTriggerIcon = (type) => {
    const trigger = triggerTypes.find(t => t.value === type);
    return trigger ? trigger.icon : '⚙️';
  };

  const formatDelay = (seconds) => {
    if (seconds === 0) return 'Anında';
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours > 0) return `${hours} saat`;
    return `${minutes} dakika`;
  };

  return (
    <div className="autoroles-panel-overlay" onClick={onClose}>
      <div className="autoroles-panel" onClick={(e) => e.stopPropagation()}>
        <div className="autoroles-header">
          <h2>⚡ Otomatik Roller</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="autoroles-content">
          <div className="create-autorole-section">
            <h3>Yeni Otomatik Rol Ekle</h3>
            
            <div className="create-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Rol *</label>
                  <select
                    value={newAutoRole.role_id}
                    onChange={(e) => setNewAutoRole({ ...newAutoRole, role_id: e.target.value })}
                  >
                    <option value="">Rol Seçin</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Tetikleyici</label>
                  <select
                    value={newAutoRole.trigger_type}
                    onChange={(e) => setNewAutoRole({ ...newAutoRole, trigger_type: e.target.value })}
                  >
                    {triggerTypes.map((trigger) => (
                      <option key={trigger.value} value={trigger.value}>
                        {trigger.icon} {trigger.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Gecikme (Saniye)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0 = Anında"
                    value={newAutoRole.delay}
                    onChange={(e) => setNewAutoRole({ ...newAutoRole, delay: parseInt(e.target.value) || 0 })}
                  />
                </div>

                {newAutoRole.trigger_type === 'on_level' && (
                  <div className="form-group">
                    <label>Gerekli Seviye</label>
                    <input
                      type="number"
                      min="1"
                      value={newAutoRole.required_level}
                      onChange={(e) => setNewAutoRole({ ...newAutoRole, required_level: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                )}

                {newAutoRole.trigger_type === 'on_invites' && (
                  <div className="form-group">
                    <label>Gerekli Davet</label>
                    <input
                      type="number"
                      min="1"
                      value={newAutoRole.required_invites}
                      onChange={(e) => setNewAutoRole({ ...newAutoRole, required_invites: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                )}

                {newAutoRole.trigger_type === 'on_messages' && (
                  <div className="form-group">
                    <label>Gerekli Mesaj</label>
                    <input
                      type="number"
                      min="1"
                      value={newAutoRole.required_messages}
                      onChange={(e) => setNewAutoRole({ ...newAutoRole, required_messages: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Otomatik Kaldır (Saat)</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0 = Hiçbir zaman"
                    value={newAutoRole.remove_after}
                    onChange={(e) => setNewAutoRole({ ...newAutoRole, remove_after: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <button className="create-btn" onClick={createAutoRole}>
                ⚡ Otomatik Rol Oluştur
              </button>
            </div>
          </div>

          <div className="autoroles-list-section">
            <h3>Aktif Otomatik Roller ({autoRoles.length})</h3>

            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Otomatik roller yükleniyor...</p>
              </div>
            ) : autoRoles.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">⚡</span>
                <p>Henüz otomatik rol yok</p>
                <span className="empty-hint">Kullanıcılara otomatik rol atamaları yapabilirsiniz</span>
              </div>
            ) : (
              <div className="autoroles-list">
                {autoRoles.map((autoRole) => (
                  <div key={autoRole.id} className={`autorole-card ${!autoRole.enabled ? 'disabled' : ''}`}>
                    <div className="autorole-card-header">
                      <div className="role-info">
                        <span className="trigger-icon">{getTriggerIcon(autoRole.trigger_type)}</span>
                        <div>
                          <h4>{getRoleName(autoRole.role_id)}</h4>
                          <span className="trigger-label">{getTriggerLabel(autoRole.trigger_type)}</span>
                        </div>
                      </div>
                      <div className="autorole-actions">
                        <button
                          className={`toggle-btn ${autoRole.enabled ? 'active' : ''}`}
                          onClick={() => toggleAutoRole(autoRole.id, autoRole.enabled)}
                        >
                          {autoRole.enabled ? '✓' : '○'}
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteAutoRole(autoRole.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>

                    <div className="autorole-details">
                      {autoRole.delay > 0 && (
                        <div className="detail-item">
                          <span className="detail-icon">⏱️</span>
                          <span>Gecikme: {formatDelay(autoRole.delay)}</span>
                        </div>
                      )}
                      {autoRole.required_level > 0 && (
                        <div className="detail-item">
                          <span className="detail-icon">⭐</span>
                          <span>Seviye {autoRole.required_level} gerekli</span>
                        </div>
                      )}
                      {autoRole.required_invites > 0 && (
                        <div className="detail-item">
                          <span className="detail-icon">👥</span>
                          <span>{autoRole.required_invites} davet gerekli</span>
                        </div>
                      )}
                      {autoRole.required_messages > 0 && (
                        <div className="detail-item">
                          <span className="detail-icon">💬</span>
                          <span>{autoRole.required_messages} mesaj gerekli</span>
                        </div>
                      )}
                      {autoRole.remove_after > 0 && (
                        <div className="detail-item">
                          <span className="detail-icon">🔄</span>
                          <span>{autoRole.remove_after} saat sonra kaldırılır</span>
                        </div>
                      )}
                      {autoRole.uses_count > 0 && (
                        <div className="detail-item">
                          <span className="detail-icon">📊</span>
                          <span>{autoRole.uses_count} kere kullanıldı</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoRolesPanel;


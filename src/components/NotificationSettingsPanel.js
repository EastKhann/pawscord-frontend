import React, { useState, useEffect } from 'react';
import './NotificationSettingsPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../utils/apiEndpoints';

const NotificationSettingsPanel = ({ onClose }) => {
    const [settings, setSettings] = useState({
        all_messages: true,
        direct_messages: true,
        mentions: true,
        replies: true,
        reactions: false,
        server_updates: true,
        events: true,
        friend_requests: true,
        group_invites: true,
        desktop_notifications: true,
        mobile_push: true,
        email_notifications: false,
        sound_enabled: true,
        notification_sound: 'default',
        quiet_hours_enabled: false,
        quiet_hours_start: '22:00',
        quiet_hours_end: '08:00',
        muted_channels: [],
        muted_servers: []
    });

    const [mutedChannels, setMutedChannels] = useState([]);
    const [mutedServers, setMutedServers] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiBaseUrl = getApiBase();
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        fetchNotificationSettings();
    }, []);

    const fetchNotificationSettings = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/notifications/settings/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            
            if (data.settings) {
                setSettings(data.settings);
            }
            
            setMutedChannels(data.muted_channels || []);
            setMutedServers(data.muted_servers || []);
        } catch (error) {
            console.error('Error fetching notification settings:', error);
            toast.error('❌ Ayarlar yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const updateSettings = async (newSettings) => {
        try {
            const response = await fetch(`${apiBaseUrl}/notifications/settings/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newSettings)
            });

            const data = await response.json();

            if (response.ok) {
                setSettings(newSettings);
                toast.success('✅ Ayarlar kaydedildi');
            } else {
                toast.error(`❌ ${data.error || 'Ayarlar kaydedilemedi'}`);
            }
        } catch (error) {
            console.error('Error updating settings:', error);
            toast.error('❌ Güncelleme hatası');
        }
    };

    const toggleSetting = (key) => {
        const newSettings = { ...settings, [key]: !settings[key] };
        updateSettings(newSettings);
    };

    const updateSoundSetting = (value) => {
        const newSettings = { ...settings, notification_sound: value };
        updateSettings(newSettings);
    };

    const updateQuietHours = (type, value) => {
        const newSettings = { 
            ...settings, 
            [type === 'start' ? 'quiet_hours_start' : 'quiet_hours_end']: value 
        };
        updateSettings(newSettings);
    };

    const unmuteChannel = async (channelId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/channels/${channelId}/unmute/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                toast.success('✅ Kanal sesi açıldı');
                fetchNotificationSettings();
            } else {
                toast.error('❌ İşlem başarısız');
            }
        } catch (error) {
            console.error('Error unmuting channel:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const unmuteServer = async (serverId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/unmute/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                toast.success('✅ Sunucu sesi açıldı');
                fetchNotificationSettings();
            } else {
                toast.error('❌ İşlem başarısız');
            }
        } catch (error) {
            console.error('Error unmuting server:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    const clearAllNotifications = async () => {
        if (!window.confirm('Tüm bildirimleri temizlemek istediğinizden emin misiniz?')) return;

        try {
            const response = await fetch(`${apiBaseUrl}/notifications/clear_all/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                toast.success('✅ Tüm bildirimler temizlendi');
            } else {
                toast.error('❌ İşlem başarısız');
            }
        } catch (error) {
            console.error('Error clearing notifications:', error);
            toast.error('❌ Hata oluştu');
        }
    };

    if (loading) {
        return (
            <div className="notification-overlay">
                <div className="notification-panel">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <span>Yükleniyor...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="notification-overlay" onClick={onClose}>
            <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="notification-header">
                    <h2>🔔 Bildirim Ayarları</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Content */}
                <div className="notification-content">
                    {/* Message Notifications */}
                    <div className="settings-section">
                        <h3>💬 Mesaj Bildirimleri</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Tüm Mesajlar</span>
                                    <span className="setting-desc">Her mesaj için bildirim al</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.all_messages}
                                        onChange={() => toggleSetting('all_messages')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Direkt Mesajlar</span>
                                    <span className="setting-desc">DM bildirimleri</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.direct_messages}
                                        onChange={() => toggleSetting('direct_messages')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Bahsetmeler (@mentions)</span>
                                    <span className="setting-desc">Sizi etiketlediklerinde bildirim</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.mentions}
                                        onChange={() => toggleSetting('mentions')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Yanıtlar</span>
                                    <span className="setting-desc">Mesajlarınıza yanıt geldiğinde</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.replies}
                                        onChange={() => toggleSetting('replies')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Reaksiyonlar</span>
                                    <span className="setting-desc">Mesajlarınıza emoji eklendiğinde</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.reactions}
                                        onChange={() => toggleSetting('reactions')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Server Notifications */}
                    <div className="settings-section">
                        <h3>🏠 Sunucu Bildirimleri</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Sunucu Güncellemeleri</span>
                                    <span className="setting-desc">Yeni kanallar, roller vb.</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.server_updates}
                                        onChange={() => toggleSetting('server_updates')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Etkinlikler</span>
                                    <span className="setting-desc">Etkinlik hatırlatmaları</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.events}
                                        onChange={() => toggleSetting('events')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Arkadaşlık İstekleri</span>
                                    <span className="setting-desc">Yeni arkadaşlık istekleri</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.friend_requests}
                                        onChange={() => toggleSetting('friend_requests')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Grup Davetleri</span>
                                    <span className="setting-desc">Grup sohbetlerine davet</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.group_invites}
                                        onChange={() => toggleSetting('group_invites')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Methods */}
                    <div className="settings-section">
                        <h3>📱 İletim Yöntemleri</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Masaüstü Bildirimleri</span>
                                    <span className="setting-desc">Tarayıcı bildirimleri</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.desktop_notifications}
                                        onChange={() => toggleSetting('desktop_notifications')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Mobil Push Bildirimleri</span>
                                    <span className="setting-desc">Telefon bildirimleri</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.mobile_push}
                                        onChange={() => toggleSetting('mobile_push')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">E-posta Bildirimleri</span>
                                    <span className="setting-desc">Önemli güncellemeler için e-posta</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.email_notifications}
                                        onChange={() => toggleSetting('email_notifications')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Sound Settings */}
                    <div className="settings-section">
                        <h3>🔊 Ses Ayarları</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Bildirim Sesi</span>
                                    <span className="setting-desc">Sesli bildirimler</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.sound_enabled}
                                        onChange={() => toggleSetting('sound_enabled')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            {settings.sound_enabled && (
                                <div className="setting-item">
                                    <div className="setting-info">
                                        <span className="setting-label">Ses Efekti</span>
                                    </div>
                                    <select 
                                        className="sound-select"
                                        value={settings.notification_sound}
                                        onChange={(e) => updateSoundSetting(e.target.value)}
                                    >
                                        <option value="default">Varsayılan</option>
                                        <option value="ping">Ping</option>
                                        <option value="chime">Chime</option>
                                        <option value="bell">Bell</option>
                                        <option value="pop">Pop</option>
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quiet Hours */}
                    <div className="settings-section">
                        <h3>🌙 Sessiz Saatler</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <span className="setting-label">Sessiz Saatleri Etkinleştir</span>
                                    <span className="setting-desc">Belirli saatlerde bildirimleri kapat</span>
                                </div>
                                <label className="toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.quiet_hours_enabled}
                                        onChange={() => toggleSetting('quiet_hours_enabled')}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>

                            {settings.quiet_hours_enabled && (
                                <div className="quiet-hours-time">
                                    <div className="time-input-group">
                                        <label>Başlangıç</label>
                                        <input 
                                            type="time" 
                                            value={settings.quiet_hours_start}
                                            onChange={(e) => updateQuietHours('start', e.target.value)}
                                        />
                                    </div>
                                    <div className="time-input-group">
                                        <label>Bitiş</label>
                                        <input 
                                            type="time" 
                                            value={settings.quiet_hours_end}
                                            onChange={(e) => updateQuietHours('end', e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Muted Channels */}
                    {mutedChannels.length > 0 && (
                        <div className="settings-section">
                            <h3>🔇 Susturulmuş Kanallar</h3>
                            <div className="muted-list">
                                {mutedChannels.map((channel) => (
                                    <div key={channel.id} className="muted-item">
                                        <span className="muted-name">#{channel.name}</span>
                                        <button 
                                            className="unmute-btn"
                                            onClick={() => unmuteChannel(channel.id)}
                                        >
                                            Sesi Aç
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Muted Servers */}
                    {mutedServers.length > 0 && (
                        <div className="settings-section">
                            <h3>🔇 Susturulmuş Sunucular</h3>
                            <div className="muted-list">
                                {mutedServers.map((server) => (
                                    <div key={server.id} className="muted-item">
                                        <span className="muted-name">{server.name}</span>
                                        <button 
                                            className="unmute-btn"
                                            onClick={() => unmuteServer(server.id)}
                                        >
                                            Sesi Aç
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="settings-section">
                        <h3>⚡ Hızlı İşlemler</h3>
                        <button className="clear-all-btn" onClick={clearAllNotifications}>
                            🗑️ Tüm Bildirimleri Temizle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettingsPanel;


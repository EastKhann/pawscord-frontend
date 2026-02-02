// frontend/src/components/GroupMentionSettingsPanel.js - Group Mention Configuration
import React, { useState, useEffect } from 'react';
import {
    FaAt, FaTimes, FaSave, FaUsers, FaUserTag, FaShieldAlt,
    FaBell, FaCog, FaPlus, FaTrash, FaCheck, FaExclamationTriangle,
    FaClock, FaHashtag
} from 'react-icons/fa';
import toast from '../utils/toast';
import './GroupMentionSettingsPanel.css';

const GroupMentionSettingsPanel = ({ serverId, apiBaseUrl, onClose }) => {
    const [settings, setSettings] = useState(null);
    const [roles, setRoles] = useState([]);
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const defaultSettings = {
        everyone_enabled: false,
        everyone_cooldown: 300,
        everyone_allowed_roles: [],
        here_enabled: true,
        here_cooldown: 60,
        here_allowed_roles: [],
        role_mention_enabled: true,
        role_mention_cooldown: 30,
        max_mentions_per_message: 5,
        max_role_mentions_per_message: 3,
        notification_override: false,
        suppress_notifications_channels: [],
        auto_delete_spam_mentions: true,
        spam_threshold: 10,
        log_all_mentions: true
    };

    useEffect(() => {
        fetchSettings();
        fetchRoles();
        fetchChannels();
    }, [serverId]);

    const fetchSettings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/mention-settings/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setSettings({ ...defaultSettings, ...data });
            } else {
                setSettings(defaultSettings);
            }
        } catch (error) {
            console.error('Fetch mention settings error:', error);
            setSettings(defaultSettings);
        } finally {
            setLoading(false);
        }
    };

    const fetchRoles = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/roles/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setRoles(data.roles || []);
            }
        } catch (error) {
            console.error('Fetch roles error:', error);
        }
    };

    const fetchChannels = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/channels/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.channels?.filter(c => c.type === 'text') || []);
            }
        } catch (error) {
            console.error('Fetch channels error:', error);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${apiBaseUrl}/servers/${serverId}/mention-settings/`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settings)
            });

            if (response.ok) {
                toast.success('✅ Mention ayarları kaydedildi');
                setHasChanges(false);
            } else {
                const err = await response.json();
                toast.error(err.error || 'Kaydetme başarısız');
            }
        } catch (error) {
            console.error('Save mention settings error:', error);
            toast.error('Bir hata oluştu');
        } finally {
            setSaving(false);
        }
    };

    const updateSetting = (key, value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
        setHasChanges(true);
    };

    const toggleRole = (key, roleId) => {
        setSettings(prev => {
            const currentRoles = prev[key] || [];
            const newRoles = currentRoles.includes(roleId)
                ? currentRoles.filter(id => id !== roleId)
                : [...currentRoles, roleId];
            return { ...prev, [key]: newRoles };
        });
        setHasChanges(true);
    };

    const toggleChannel = (channelId) => {
        setSettings(prev => {
            const current = prev.suppress_notifications_channels || [];
            const newChannels = current.includes(channelId)
                ? current.filter(id => id !== channelId)
                : [...current, channelId];
            return { ...prev, suppress_notifications_channels: newChannels };
        });
        setHasChanges(true);
    };

    if (loading) {
        return (
            <div className="mention-settings-overlay">
                <div className="mention-settings-panel">
                    <div className="loading">Yükleniyor...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="mention-settings-overlay" onClick={onClose}>
            <div className="mention-settings-panel" onClick={e => e.stopPropagation()}>
                <div className="panel-header">
                    <h2><FaAt /> Grup Mention Ayarları</h2>
                    <div className="header-actions">
                        {hasChanges && (
                            <span className="unsaved-badge">
                                <FaExclamationTriangle /> Değişiklikler var
                            </span>
                        )}
                        <button className="close-btn" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                <div className="panel-content">
                    {/* @everyone Settings */}
                    <div className="settings-section">
                        <div className="section-header">
                            <h3><FaUsers /> @everyone Ayarları</h3>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.everyone_enabled}
                                    onChange={(e) => updateSetting('everyone_enabled', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        {settings.everyone_enabled && (
                            <div className="section-content">
                                <div className="setting-row">
                                    <label>
                                        <FaClock /> Bekleme Süresi (saniye)
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.everyone_cooldown}
                                        onChange={(e) => updateSetting('everyone_cooldown', parseInt(e.target.value))}
                                        min="0"
                                        max="86400"
                                    />
                                </div>

                                <div className="setting-row full">
                                    <label><FaUserTag /> İzin Verilen Roller</label>
                                    <div className="roles-grid">
                                        {roles.map(role => (
                                            <button
                                                key={role.id}
                                                className={`role-chip ${settings.everyone_allowed_roles?.includes(role.id) ? 'selected' : ''}`}
                                                onClick={() => toggleRole('everyone_allowed_roles', role.id)}
                                                style={{
                                                    borderColor: settings.everyone_allowed_roles?.includes(role.id) ? role.color : 'transparent'
                                                }}
                                            >
                                                <span className="role-color" style={{ background: role.color }}></span>
                                                {role.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* @here Settings */}
                    <div className="settings-section">
                        <div className="section-header">
                            <h3><FaBell /> @here Ayarları</h3>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.here_enabled}
                                    onChange={(e) => updateSetting('here_enabled', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        {settings.here_enabled && (
                            <div className="section-content">
                                <div className="setting-row">
                                    <label>
                                        <FaClock /> Bekleme Süresi (saniye)
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.here_cooldown}
                                        onChange={(e) => updateSetting('here_cooldown', parseInt(e.target.value))}
                                        min="0"
                                        max="3600"
                                    />
                                </div>

                                <div className="setting-row full">
                                    <label><FaUserTag /> İzin Verilen Roller</label>
                                    <div className="roles-grid">
                                        {roles.map(role => (
                                            <button
                                                key={role.id}
                                                className={`role-chip ${settings.here_allowed_roles?.includes(role.id) ? 'selected' : ''}`}
                                                onClick={() => toggleRole('here_allowed_roles', role.id)}
                                                style={{
                                                    borderColor: settings.here_allowed_roles?.includes(role.id) ? role.color : 'transparent'
                                                }}
                                            >
                                                <span className="role-color" style={{ background: role.color }}></span>
                                                {role.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Role Mention Settings */}
                    <div className="settings-section">
                        <div className="section-header">
                            <h3><FaUserTag /> Rol Mention Ayarları</h3>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.role_mention_enabled}
                                    onChange={(e) => updateSetting('role_mention_enabled', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        {settings.role_mention_enabled && (
                            <div className="section-content">
                                <div className="setting-row">
                                    <label><FaClock /> Bekleme Süresi (saniye)</label>
                                    <input
                                        type="number"
                                        value={settings.role_mention_cooldown}
                                        onChange={(e) => updateSetting('role_mention_cooldown', parseInt(e.target.value))}
                                        min="0"
                                        max="300"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* General Limits */}
                    <div className="settings-section">
                        <div className="section-header">
                            <h3><FaCog /> Genel Limitler</h3>
                        </div>

                        <div className="section-content">
                            <div className="setting-row">
                                <label>Mesaj Başına Maks. Mention</label>
                                <input
                                    type="number"
                                    value={settings.max_mentions_per_message}
                                    onChange={(e) => updateSetting('max_mentions_per_message', parseInt(e.target.value))}
                                    min="1"
                                    max="50"
                                />
                            </div>

                            <div className="setting-row">
                                <label>Mesaj Başına Maks. Rol Mention</label>
                                <input
                                    type="number"
                                    value={settings.max_role_mentions_per_message}
                                    onChange={(e) => updateSetting('max_role_mentions_per_message', parseInt(e.target.value))}
                                    min="1"
                                    max="20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Spam Protection */}
                    <div className="settings-section">
                        <div className="section-header">
                            <h3><FaShieldAlt /> Spam Koruması</h3>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.auto_delete_spam_mentions}
                                    onChange={(e) => updateSetting('auto_delete_spam_mentions', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>

                        {settings.auto_delete_spam_mentions && (
                            <div className="section-content">
                                <div className="setting-row">
                                    <label>Spam Eşiği (dakikada)</label>
                                    <input
                                        type="number"
                                        value={settings.spam_threshold}
                                        onChange={(e) => updateSetting('spam_threshold', parseInt(e.target.value))}
                                        min="3"
                                        max="50"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Channel Overrides */}
                    <div className="settings-section">
                        <div className="section-header">
                            <h3><FaHashtag /> Bildirim Bastırma</h3>
                        </div>

                        <div className="section-content">
                            <p className="setting-desc">Bu kanallarda mention bildirimleri bastırılır</p>
                            <div className="channels-grid">
                                {channels.map(channel => (
                                    <button
                                        key={channel.id}
                                        className={`channel-chip ${settings.suppress_notifications_channels?.includes(channel.id) ? 'selected' : ''}`}
                                        onClick={() => toggleChannel(channel.id)}
                                    >
                                        <FaHashtag />
                                        {channel.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Logging */}
                    <div className="settings-section">
                        <div className="section-header">
                            <h3><FaCog /> Loglama</h3>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings.log_all_mentions}
                                    onChange={(e) => updateSetting('log_all_mentions', e.target.checked)}
                                />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <p className="setting-desc">Tüm grup mentionları loglanır</p>
                    </div>
                </div>

                <div className="panel-footer">
                    <button
                        className="save-btn"
                        onClick={handleSave}
                        disabled={!hasChanges || saving}
                    >
                        {saving ? 'Kaydediliyor...' : <><FaSave /> Kaydet</>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GroupMentionSettingsPanel;

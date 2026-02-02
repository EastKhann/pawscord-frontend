// frontend/src/components/NotificationSettings.js
// 🔔 SMART NOTIFICATIONS SETTINGS - Akıllı Bildirimler

import React, { useState, useEffect, useCallback } from 'react';
import api from '../api';
import './NotificationSettings.css';

// ========================================
// 🔔 FOCUS MODE TOGGLE
// ========================================
export const FocusModeToggle = ({ onToggle }) => {
    const [focusMode, setFocusMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [endsAt, setEndsAt] = useState(null);

    const toggleFocus = async (duration = null) => {
        setLoading(true);
        try {
            const response = await api.post('/notifications/focus-mode/', { duration });
            setFocusMode(response.data.focus_mode_enabled);
            setEndsAt(response.data.ends_at);
            onToggle?.(response.data.focus_mode_enabled);
        } catch (error) {
            console.error('Focus mode toggle failed:', error);
        }
        setLoading(false);
    };

    return (
        <div className={`focus-mode-toggle ${focusMode ? 'active' : ''}`}>
            <div className="focus-header">
                <span className="focus-icon">🎯</span>
                <span className="focus-title">Odak Modu</span>
                {focusMode && <span className="focus-badge">AKTİF</span>}
            </div>

            <div className="focus-controls">
                <button
                    className={`focus-btn ${focusMode ? 'active' : ''}`}
                    onClick={() => toggleFocus()}
                    disabled={loading}
                >
                    {loading ? '...' : focusMode ? 'Kapat' : 'Aç'}
                </button>

                {!focusMode && (
                    <div className="focus-presets">
                        <button onClick={() => toggleFocus(30)}>30dk</button>
                        <button onClick={() => toggleFocus(60)}>1 saat</button>
                        <button onClick={() => toggleFocus(120)}>2 saat</button>
                    </div>
                )}
            </div>

            {endsAt && (
                <div className="focus-timer">
                    Bitiş: {new Date(endsAt).toLocaleTimeString('tr-TR')}
                </div>
            )}
        </div>
    );
};

// ========================================
// 🔔 DND SCHEDULE
// ========================================
export const DNDSchedule = ({ settings, onUpdate }) => {
    const [schedule, setSchedule] = useState(settings?.scheduled_dnd || {
        enabled: false,
        start_time: '22:00',
        end_time: '08:00',
        days: [0, 1, 2, 3, 4, 5, 6]
    });

    const days = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

    const toggleDay = (index) => {
        const newDays = schedule.days.includes(index)
            ? schedule.days.filter(d => d !== index)
            : [...schedule.days, index].sort();
        const newSchedule = { ...schedule, days: newDays };
        setSchedule(newSchedule);
        onUpdate?.({ scheduled_dnd: newSchedule });
    };

    return (
        <div className="dnd-schedule">
            <div className="dnd-header">
                <span className="dnd-icon">🌙</span>
                <span className="dnd-title">Zamanlanmış Sessiz Mod</span>
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={(e) => {
                            const newSchedule = { ...schedule, enabled: e.target.checked };
                            setSchedule(newSchedule);
                            onUpdate?.({ scheduled_dnd: newSchedule });
                        }}
                    />
                    <span className="toggle-slider"></span>
                </label>
            </div>

            {schedule.enabled && (
                <>
                    <div className="dnd-times">
                        <div className="time-input">
                            <label>Başlangıç</label>
                            <input
                                type="time"
                                value={schedule.start_time}
                                onChange={(e) => {
                                    const newSchedule = { ...schedule, start_time: e.target.value };
                                    setSchedule(newSchedule);
                                    onUpdate?.({ scheduled_dnd: newSchedule });
                                }}
                            />
                        </div>
                        <span className="time-separator">→</span>
                        <div className="time-input">
                            <label>Bitiş</label>
                            <input
                                type="time"
                                value={schedule.end_time}
                                onChange={(e) => {
                                    const newSchedule = { ...schedule, end_time: e.target.value };
                                    setSchedule(newSchedule);
                                    onUpdate?.({ scheduled_dnd: newSchedule });
                                }}
                            />
                        </div>
                    </div>

                    <div className="dnd-days">
                        {days.map((day, index) => (
                            <button
                                key={index}
                                className={`day-btn ${schedule.days.includes(index) ? 'active' : ''}`}
                                onClick={() => toggleDay(index)}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// ========================================
// 🔔 NOTIFICATION TYPES
// ========================================
export const NotificationTypes = ({ types, onUpdate }) => {
    const typeLabels = {
        messages: { label: 'Mesajlar', icon: '💬' },
        mentions: { label: 'Bahsetmeler', icon: '@' },
        replies: { label: 'Yanıtlar', icon: '↩️' },
        reactions: { label: 'Reaksiyonlar', icon: '😀' },
        friend_requests: { label: 'Arkadaşlık İstekleri', icon: '👋' },
        server_invites: { label: 'Sunucu Davetleri', icon: '📨' },
        events: { label: 'Etkinlikler', icon: '📅' },
        level_up: { label: 'Seviye Atlama', icon: '🎮' },
        achievements: { label: 'Başarımlar', icon: '🏆' }
    };

    const toggleType = (type) => {
        const newTypes = { ...types, [type]: !types[type] };
        onUpdate?.({ types: newTypes });
    };

    return (
        <div className="notification-types">
            <h3>📋 Bildirim Türleri</h3>
            <div className="types-grid">
                {Object.entries(typeLabels).map(([key, { label, icon }]) => (
                    <div key={key} className="type-item">
                        <span className="type-icon">{icon}</span>
                        <span className="type-label">{label}</span>
                        <label className="toggle-switch small">
                            <input
                                type="checkbox"
                                checked={types?.[key] ?? true}
                                onChange={() => toggleType(key)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ========================================
// 🔔 PRIORITY CONTACTS
// ========================================
export const PriorityContacts = ({ contacts = [], onAdd, onRemove }) => {
    const [newContact, setNewContact] = useState('');

    const handleAdd = async () => {
        if (newContact.trim()) {
            await onAdd?.(newContact.trim());
            setNewContact('');
        }
    };

    return (
        <div className="priority-contacts">
            <div className="priority-header">
                <span className="priority-icon">⭐</span>
                <h3>Öncelikli Kişiler</h3>
            </div>
            <p className="priority-desc">
                Odak modunda bile bu kişilerden bildirim alırsınız
            </p>

            <div className="add-contact">
                <input
                    type="text"
                    placeholder="Kullanıcı adı..."
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button onClick={handleAdd}>Ekle</button>
            </div>

            <div className="contacts-list">
                {contacts.map((contact, index) => (
                    <div key={index} className="contact-item">
                        <span className="contact-avatar">👤</span>
                        <span className="contact-name">{contact}</span>
                        <button
                            className="remove-btn"
                            onClick={() => onRemove?.(contact)}
                        >
                            ✕
                        </button>
                    </div>
                ))}
                {contacts.length === 0 && (
                    <p className="no-contacts">Henüz öncelikli kişi yok</p>
                )}
            </div>
        </div>
    );
};

// ========================================
// 🔔 NOTIFICATION DIGEST
// ========================================
export const NotificationDigest = ({ digest }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDigest = async () => {
            try {
                const response = await api.get('/notifications/digest/');
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch digest:', error);
            }
            setLoading(false);
        };
        fetchDigest();
    }, []);

    if (loading) {
        return <div className="digest-loading">📊 Özet yükleniyor...</div>;
    }

    if (!data) {
        return null;
    }

    return (
        <div className="notification-digest">
            <h3>📊 Son 24 Saat Özeti</h3>

            <div className="digest-stats">
                <div className="digest-stat">
                    <span className="stat-value">{data.total}</span>
                    <span className="stat-label">Toplam</span>
                </div>
                <div className="digest-stat unread">
                    <span className="stat-value">{data.unread}</span>
                    <span className="stat-label">Okunmamış</span>
                </div>
            </div>

            {data.highlights?.length > 0 && (
                <div className="digest-highlights">
                    {data.highlights.map((highlight, index) => (
                        <div key={index} className="highlight-item">
                            {highlight}
                        </div>
                    ))}
                </div>
            )}

            {data.mentions?.length > 0 && (
                <div className="digest-mentions">
                    <h4>@ Bahsetmeler</h4>
                    {data.mentions.slice(0, 5).map((mention, index) => (
                        <div key={index} className="mention-item">
                            <span className="mention-from">{mention.from}</span>
                            <span className="mention-content">{mention.content}</span>
                            <span className="mention-time">
                                {new Date(mention.time).toLocaleTimeString('tr-TR', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ========================================
// 🔔 SMART SETTINGS
// ========================================
export const SmartSettings = ({ smart, onUpdate }) => {
    const features = [
        { key: 'auto_mute_inactive', label: 'Inaktif sunucuları otomatik sessize al', icon: '🔇' },
        { key: 'quiet_hours_auto', label: 'Uyku saatlerini otomatik algıla', icon: '😴' },
        { key: 'batch_notifications', label: 'Benzer bildirimleri grupla', icon: '📦' },
        { key: 'priority_detection', label: 'Yapay zeka öncelik tespiti', icon: '🤖' }
    ];

    const toggleFeature = (key) => {
        const newSmart = { ...smart, [key]: !smart[key] };
        onUpdate?.({ smart: newSmart });
    };

    return (
        <div className="smart-settings">
            <h3>🧠 Akıllı Özellikler</h3>
            <div className="smart-list">
                {features.map(({ key, label, icon }) => (
                    <div key={key} className="smart-item">
                        <span className="smart-icon">{icon}</span>
                        <span className="smart-label">{label}</span>
                        <label className="toggle-switch small">
                            <input
                                type="checkbox"
                                checked={smart?.[key] ?? true}
                                onChange={() => toggleFeature(key)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

// ========================================
// 🔔 SERVER NOTIFICATION SETTINGS
// ========================================
export const ServerNotificationSettings = ({ server, settings, onUpdate }) => {
    const [serverSettings, setServerSettings] = useState(settings || {
        muted: false,
        notification_level: 'all',
        suppress_everyone: false,
        suppress_roles: false
    });

    const levels = [
        { value: 'all', label: 'Tüm Mesajlar', icon: '🔔' },
        { value: 'mentions', label: 'Sadece Bahsetmeler', icon: '@' },
        { value: 'none', label: 'Hiçbiri', icon: '🔕' }
    ];

    const updateSetting = async (key, value) => {
        const newSettings = { ...serverSettings, [key]: value };
        setServerSettings(newSettings);
        onUpdate?.(server.id, newSettings);
    };

    return (
        <div className="server-notification-settings">
            <div className="server-header">
                <img
                    src={server.icon || '/default-server.png'}
                    alt={server.name}
                    className="server-icon"
                />
                <span className="server-name">{server.name}</span>
            </div>

            <div className="server-options">
                <div className="option-item">
                    <span>Sunucuyu Sessize Al</span>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={serverSettings.muted}
                            onChange={(e) => updateSetting('muted', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="notification-level">
                    <span>Bildirim Seviyesi</span>
                    <div className="level-buttons">
                        {levels.map(({ value, label, icon }) => (
                            <button
                                key={value}
                                className={`level-btn ${serverSettings.notification_level === value ? 'active' : ''}`}
                                onClick={() => updateSetting('notification_level', value)}
                            >
                                {icon} {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="option-item">
                    <span>@everyone ve @here'ı engelle</span>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={serverSettings.suppress_everyone}
                            onChange={(e) => updateSetting('suppress_everyone', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>

                <div className="option-item">
                    <span>Rol bahsetmelerini engelle</span>
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={serverSettings.suppress_roles}
                            onChange={(e) => updateSetting('suppress_roles', e.target.checked)}
                        />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

// ========================================
// 🔔 MAIN NOTIFICATION SETTINGS PANEL
// ========================================
const NotificationSettings = ({ onClose }) => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('general');
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await api.get('/notifications/settings/');
                setSettings(response.data);
            } catch (error) {
                console.error('Failed to fetch notification settings:', error);
            }
            setLoading(false);
        };
        fetchSettings();
    }, []);

    const updateSettings = useCallback(async (updates) => {
        setSaving(true);
        try {
            const response = await api.post('/notifications/settings/update/', updates);
            setSettings(response.data.settings);
        } catch (error) {
            console.error('Failed to update settings:', error);
        }
        setSaving(false);
    }, []);

    const addPriorityContact = async (username) => {
        try {
            const response = await api.post('/notifications/priority/add/', { username });
            setSettings(prev => ({
                ...prev,
                priority_contacts: response.data.priority_contacts
            }));
        } catch (error) {
            console.error('Failed to add priority contact:', error);
        }
    };

    const removePriorityContact = async (username) => {
        try {
            const response = await api.delete(`/notifications/priority/${username}/remove/`);
            setSettings(prev => ({
                ...prev,
                priority_contacts: response.data.priority_contacts
            }));
        } catch (error) {
            console.error('Failed to remove priority contact:', error);
        }
    };

    if (loading) {
        return (
            <div className="notification-settings-panel loading">
                <div className="loading-spinner">🔔</div>
                <p>Ayarlar yükleniyor...</p>
            </div>
        );
    }

    const tabs = [
        { id: 'general', label: 'Genel', icon: '⚙️' },
        { id: 'types', label: 'Türler', icon: '📋' },
        { id: 'schedule', label: 'Zamanlama', icon: '⏰' },
        { id: 'smart', label: 'Akıllı', icon: '🧠' },
        { id: 'digest', label: 'Özet', icon: '📊' }
    ];

    return (
        <div className="notification-settings-panel">
            <div className="panel-header">
                <h2>🔔 Bildirim Ayarları</h2>
                {saving && <span className="saving-indicator">Kaydediliyor...</span>}
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="panel-tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <span className="tab-icon">{tab.icon}</span>
                        <span className="tab-label">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div className="panel-content">
                {activeTab === 'general' && (
                    <div className="tab-general">
                        <div className="global-toggle">
                            <div className="toggle-info">
                                <span className="toggle-icon">🔔</span>
                                <div className="toggle-text">
                                    <span className="toggle-title">Tüm Bildirimleri Etkinleştir</span>
                                    <span className="toggle-desc">Ana bildirim anahtarı</span>
                                </div>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={settings?.enabled}
                                    onChange={(e) => updateSettings({ enabled: e.target.checked })}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="general-options">
                            <div className="option-row">
                                <span>🔊 Ses</span>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings?.sound}
                                        onChange={(e) => updateSettings({ sound: e.target.checked })}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="option-row">
                                <span>🖥️ Masaüstü Bildirimleri</span>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings?.desktop}
                                        onChange={(e) => updateSettings({ desktop: e.target.checked })}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                            <div className="option-row">
                                <span>📱 Mobil Push</span>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings?.mobile_push}
                                        onChange={(e) => updateSettings({ mobile_push: e.target.checked })}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <FocusModeToggle />

                        <PriorityContacts
                            contacts={settings?.priority_contacts || []}
                            onAdd={addPriorityContact}
                            onRemove={removePriorityContact}
                        />
                    </div>
                )}

                {activeTab === 'types' && (
                    <NotificationTypes
                        types={settings?.types}
                        onUpdate={updateSettings}
                    />
                )}

                {activeTab === 'schedule' && (
                    <DNDSchedule
                        settings={settings}
                        onUpdate={updateSettings}
                    />
                )}

                {activeTab === 'smart' && (
                    <SmartSettings
                        smart={settings?.smart}
                        onUpdate={updateSettings}
                    />
                )}

                {activeTab === 'digest' && (
                    <NotificationDigest digest={settings?.digest} />
                )}
            </div>
        </div>
    );
};

export default NotificationSettings;

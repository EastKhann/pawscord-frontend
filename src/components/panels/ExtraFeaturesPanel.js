// frontend/src/components/panels/ExtraFeaturesPanel.js
// 🚀 20 EK YENİ ÖZELLİK PANELİ - 26 Ocak 2026 (PART 2)

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../AuthContext';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';
import './ExtraFeaturesPanel.css';

const API_URL = getApiBase();

// 2️⃣1️⃣ SCHEDULED MESSAGES - Planlanmış Mesajlar
export const ScheduledMessagesPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [scheduled, setScheduled] = useState([]);
    const [newMessage, setNewMessage] = useState({ content: '', scheduled_time: '' });

    useEffect(() => {
        fetchScheduled();
    }, []);

    const fetchScheduled = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/scheduled-messages/`);
            const data = await res.json();
            setScheduled(data.scheduled || []);
        } catch (e) {
            console.error('Scheduled messages error:', e);
        }
    };

    const addScheduled = async () => {
        if (!newMessage.content || !newMessage.scheduled_time) return;
        try {
            await fetchWithAuth(`${API_URL}/features/scheduled-messages/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newMessage, room_id: 1 })
            });
            setNewMessage({ content: '', scheduled_time: '' });
            fetchScheduled();
            toast.success('Mesaj planlandı!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel scheduled-messages">
            <div className="panel-header">
                <h3>📅 Planlanmış Mesajlar</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="scheduled-list">
                    {scheduled.map((msg, i) => (
                        <div key={i} className="scheduled-item">
                            <span className="content">{msg.content}</span>
                            <span className="time">{new Date(msg.scheduled_time).toLocaleString()}</span>
                        </div>
                    ))}
                    {scheduled.length === 0 && <p className="empty">Planlanmış mesaj yok</p>}
                </div>
                <div className="add-scheduled">
                    <input
                        value={newMessage.content}
                        onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                        placeholder="Mesaj içeriği..."
                    />
                    <input
                        type="datetime-local"
                        value={newMessage.scheduled_time}
                        onChange={(e) => setNewMessage({ ...newMessage, scheduled_time: e.target.value })}
                    />
                    <button onClick={addScheduled}>Planla</button>
                </div>
            </div>
        </div>
    );
};

// 2️⃣2️⃣ MOOD STATUS - Ruh Hali
export const MoodStatusPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [currentMood, setCurrentMood] = useState('happy');
    const [moods, setMoods] = useState({});

    useEffect(() => {
        fetchMood();
    }, []);

    const fetchMood = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/mood/`);
            const data = await res.json();
            setCurrentMood(data.current);
            setMoods(data.available_moods || {});
        } catch (e) {
            console.error('Mood error:', e);
        }
    };

    const setMood = async (mood) => {
        try {
            await fetchWithAuth(`${API_URL}/features/mood/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mood })
            });
            setCurrentMood(mood);
            toast.success('Ruh halin güncellendi!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel mood-status">
            <div className="panel-header">
                <h3>😊 Ruh Halin</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="current-mood">
                    <span className="mood-emoji">{moods[currentMood]?.emoji || '😊'}</span>
                    <span className="mood-name">{currentMood}</span>
                </div>
                <div className="mood-grid">
                    {Object.entries(moods).map(([key, data]) => (
                        <button
                            key={key}
                            className={`mood-btn ${currentMood === key ? 'active' : ''}`}
                            onClick={() => setMood(key)}
                            style={{ borderColor: data.color }}
                        >
                            <span className="emoji">{data.emoji}</span>
                            <span className="name">{key}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2️⃣3️⃣ SERVER TEMPLATES - Sunucu Şablonları
export const ServerTemplatesPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [templates, setTemplates] = useState({});

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/server-templates/`);
            const data = await res.json();
            setTemplates(data.templates || {});
        } catch (e) {
            console.error('Templates error:', e);
        }
    };

    const applyTemplate = async (templateId) => {
        try {
            await fetchWithAuth(`${API_URL}/features/server-templates/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ template: templateId, name: 'My Server' })
            });
            toast.success('Şablon hazır!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel server-templates">
            <div className="panel-header">
                <h3>🎨 Sunucu Şablonları</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="templates-grid">
                    {Object.entries(templates).map(([id, template]) => (
                        <div key={id} className="template-card" style={{ borderColor: template.color }}>
                            <h4>{template.name}</h4>
                            <div className="rooms">
                                {template.rooms.map((room, i) => (
                                    <span key={i} className="room-tag">#{room}</span>
                                ))}
                            </div>
                            <div className="roles">
                                {template.roles.map((role, i) => (
                                    <span key={i} className="role-tag">{role}</span>
                                ))}
                            </div>
                            <button onClick={() => applyTemplate(id)}>Kullan</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 2️⃣4️⃣ CUSTOM COMMANDS - Özel Komutlar
export const CustomCommandsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [commands, setCommands] = useState({});
    const [newCmd, setNewCmd] = useState({ name: '', response: '' });

    useEffect(() => {
        fetchCommands();
    }, []);

    const fetchCommands = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/custom-commands/?server_id=${serverId || 1}`);
            const data = await res.json();
            setCommands(data.commands || {});
        } catch (e) {
            console.error('Commands error:', e);
        }
    };

    const addCommand = async () => {
        if (!newCmd.name || !newCmd.response) return;
        try {
            await fetchWithAuth(`${API_URL}/features/custom-commands/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newCmd, server_id: serverId || 1 })
            });
            setNewCmd({ name: '', response: '' });
            fetchCommands();
            toast.success('Komut eklendi!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel custom-commands">
            <div className="panel-header">
                <h3>⚡ Özel Komutlar</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="commands-list">
                    {Object.entries(commands).map(([name, data]) => (
                        <div key={name} className="command-item">
                            <code>{name}</code>
                            <span>{data.response}</span>
                        </div>
                    ))}
                    {Object.keys(commands).length === 0 && <p className="empty">Özel komut yok</p>}
                </div>
                <div className="add-command">
                    <input
                        value={newCmd.name}
                        onChange={(e) => setNewCmd({ ...newCmd, name: e.target.value })}
                        placeholder="!komut"
                    />
                    <input
                        value={newCmd.response}
                        onChange={(e) => setNewCmd({ ...newCmd, response: e.target.value })}
                        placeholder="Yanıt..."
                    />
                    <button onClick={addCommand}>Ekle</button>
                </div>
            </div>
        </div>
    );
};

// 2️⃣5️⃣ SERVER ANALYTICS - Sunucu Analitiği
export const ServerAnalyticsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/server-analytics/${serverId || 1}/`);
            const data = await res.json();
            setAnalytics(data);
        } catch (e) {
            console.error('Analytics error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-panel server-analytics">
            <div className="panel-header">
                <h3>📈 Sunucu Analitiği</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? <div className="loading">Yükleniyor...</div> : analytics && (
                    <>
                        <div className="analytics-grid">
                            <div className="stat-card">
                                <span className="value">{analytics.total_members}</span>
                                <span className="label">Toplam Üye</span>
                            </div>
                            <div className="stat-card">
                                <span className="value">{analytics.new_members_week}</span>
                                <span className="label">Bu Hafta Yeni</span>
                            </div>
                            <div className="stat-card">
                                <span className="value">{analytics.total_messages}</span>
                                <span className="label">Toplam Mesaj</span>
                            </div>
                            <div className="stat-card">
                                <span className="value">{analytics.weekly_messages}</span>
                                <span className="label">Haftalık Mesaj</span>
                            </div>
                        </div>
                        <div className="active-rooms">
                            <h4>En Aktif Odalar</h4>
                            {analytics.active_rooms?.map((room, i) => (
                                <div key={i} className="room-stat">
                                    <span>#{room.room__name}</span>
                                    <span>{room.count} mesaj</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

// 2️⃣6️⃣ MEMBER LEVELS - Üye Seviyeleri
export const MemberLevelsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetchLevels();
    }, []);

    const fetchLevels = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/member-levels/${serverId || 1}/`);
            const data = await res.json();
            setLeaderboard(data.leaderboard || []);
        } catch (e) {
            console.error('Levels error:', e);
        }
    };

    return (
        <div className="feature-panel member-levels">
            <div className="panel-header">
                <h3>🏆 Seviye Sıralaması</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="leaderboard">
                    {leaderboard.map((member, i) => (
                        <div key={i} className={`member-row ${i < 3 ? 'top-' + (i + 1) : ''}`}>
                            <span className="rank">#{i + 1}</span>
                            <span className="username">{member.username}</span>
                            <span className="level">Lv.{member.level}</span>
                            <span className="xp">{member.xp} XP</span>
                        </div>
                    ))}
                    {leaderboard.length === 0 && <p className="empty">Henüz veri yok</p>}
                </div>
            </div>
        </div>
    );
};

// 2️⃣7️⃣ WELCOME MESSAGES - Hoşgeldin Mesajları
export const WelcomeMessagesPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [config, setConfig] = useState({
        enabled: false,
        message: 'Hoş geldin {user}! 🎉',
        dm_enabled: false,
        dm_message: ''
    });

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/welcome-messages/${serverId || 1}/`);
            const data = await res.json();
            setConfig(data);
        } catch (e) {
            console.error('Welcome config error:', e);
        }
    };

    const saveConfig = async () => {
        try {
            await fetchWithAuth(`${API_URL}/features/welcome-messages/${serverId || 1}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config)
            });
            toast.success('Ayarlar kaydedildi!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel welcome-messages">
            <div className="panel-header">
                <h3>👋 Hoşgeldin Mesajları</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="setting-row">
                    <label>
                        <input
                            type="checkbox"
                            checked={config.enabled}
                            onChange={(e) => setConfig({ ...config, enabled: e.target.checked })}
                        />
                        Hoşgeldin mesajı aktif
                    </label>
                </div>
                <div className="setting-row">
                    <label>Mesaj:</label>
                    <textarea
                        value={config.message}
                        onChange={(e) => setConfig({ ...config, message: e.target.value })}
                        placeholder="Hoş geldin {user}!"
                    />
                    <small>Kullanıcı adı için {'{user}'} yazın</small>
                </div>
                <div className="setting-row">
                    <label>
                        <input
                            type="checkbox"
                            checked={config.dm_enabled}
                            onChange={(e) => setConfig({ ...config, dm_enabled: e.target.checked })}
                        />
                        DM ile de gönder
                    </label>
                </div>
                <button onClick={saveConfig} className="save-btn">Kaydet</button>
            </div>
        </div>
    );
};

// 2️⃣8️⃣ PRIVACY SETTINGS - Gizlilik Ayarları
export const PrivacySettingsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [settings, setSettings] = useState({
        show_online_status: true,
        allow_dms_from_strangers: true,
        show_current_activity: true,
        allow_friend_requests: true,
        show_servers: false,
        read_receipts: true
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/privacy-settings/`);
            const data = await res.json();
            setSettings(data);
        } catch (e) {
            console.error('Privacy settings error:', e);
        }
    };

    const saveSettings = async () => {
        try {
            await fetchWithAuth(`${API_URL}/features/privacy-settings/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
            });
            toast.success('Gizlilik ayarları kaydedildi!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="feature-panel privacy-settings">
            <div className="panel-header">
                <h3>🔒 Gizlilik Ayarları</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="privacy-option" onClick={() => toggleSetting('show_online_status')}>
                    <span>Çevrimiçi durumu göster</span>
                    <div className={`toggle ${settings.show_online_status ? 'on' : 'off'}`} />
                </div>
                <div className="privacy-option" onClick={() => toggleSetting('allow_dms_from_strangers')}>
                    <span>Yabancılardan DM al</span>
                    <div className={`toggle ${settings.allow_dms_from_strangers ? 'on' : 'off'}`} />
                </div>
                <div className="privacy-option" onClick={() => toggleSetting('show_current_activity')}>
                    <span>Aktiviteyi göster</span>
                    <div className={`toggle ${settings.show_current_activity ? 'on' : 'off'}`} />
                </div>
                <div className="privacy-option" onClick={() => toggleSetting('allow_friend_requests')}>
                    <span>Arkadaşlık isteklerine izin ver</span>
                    <div className={`toggle ${settings.allow_friend_requests ? 'on' : 'off'}`} />
                </div>
                <div className="privacy-option" onClick={() => toggleSetting('show_servers')}>
                    <span>Sunucularımı göster</span>
                    <div className={`toggle ${settings.show_servers ? 'on' : 'off'}`} />
                </div>
                <div className="privacy-option" onClick={() => toggleSetting('read_receipts')}>
                    <span>Okundu bilgisi</span>
                    <div className={`toggle ${settings.read_receipts ? 'on' : 'off'}`} />
                </div>
                <button onClick={saveSettings} className="save-btn">Kaydet</button>
            </div>
        </div>
    );
};

// 2️⃣9️⃣ USER CONNECTIONS - Bağlı Hesaplar
export const UserConnectionsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [connections, setConnections] = useState([]);
    const [platforms, setPlatforms] = useState({});

    useEffect(() => {
        fetchConnections();
    }, []);

    const fetchConnections = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/user-connections/`);
            const data = await res.json();
            setConnections(data.connections || []);
            setPlatforms(data.available_platforms || {});
        } catch (e) {
            console.error('Connections error:', e);
        }
    };

    const connectPlatform = async (platform) => {
        const username = prompt(`${platforms[platform]?.name} kullanıcı adınızı girin:`);
        if (!username) return;
        try {
            await fetchWithAuth(`${API_URL}/features/user-connections/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ platform, username })
            });
            fetchConnections();
            toast.success('Bağlantı eklendi!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    const disconnectPlatform = async (platform) => {
        try {
            await fetchWithAuth(`${API_URL}/features/user-connections/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ platform })
            });
            fetchConnections();
            toast.success('Bağlantı kaldırıldı!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    const connectedPlatforms = connections.map(c => c.platform);

    return (
        <div className="feature-panel user-connections">
            <div className="panel-header">
                <h3>🔗 Bağlı Hesaplar</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="connected-list">
                    {connections.map((conn, i) => (
                        <div key={i} className="connection-item" style={{ borderColor: conn.color }}>
                            <span className="icon">{conn.icon}</span>
                            <span className="platform">{conn.display_name}</span>
                            <span className="username">@{conn.username}</span>
                            <button onClick={() => disconnectPlatform(conn.platform)} className="disconnect-btn">
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <h4>Bağlanabilir Platformlar</h4>
                <div className="platforms-grid">
                    {Object.entries(platforms).filter(([key]) => !connectedPlatforms.includes(key)).map(([key, data]) => (
                        <button
                            key={key}
                            className="platform-btn"
                            style={{ backgroundColor: data.color }}
                            onClick={() => connectPlatform(key)}
                        >
                            <span>{data.icon}</span>
                            <span>{data.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 3️⃣0️⃣ ACTIVITY STATUS - Aktivite Durumu
export const ActivityStatusPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [activity, setActivity] = useState({ type: 'none', name: '', details: '' });

    useEffect(() => {
        fetchActivity();
    }, []);

    const fetchActivity = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/activity-status/`);
            const data = await res.json();
            setActivity(data);
        } catch (e) {
            console.error('Activity error:', e);
        }
    };

    const updateActivity = async () => {
        try {
            await fetchWithAuth(`${API_URL}/features/activity-status/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(activity)
            });
            toast.success('Aktivite güncellendi!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    const activityTypes = [
        { id: 'playing', label: 'Oynuyor', emoji: '🎮' },
        { id: 'listening', label: 'Dinliyor', emoji: '🎵' },
        { id: 'watching', label: 'İzliyor', emoji: '📺' },
        { id: 'streaming', label: 'Yayında', emoji: '🔴' }
    ];

    return (
        <div className="feature-panel activity-status">
            <div className="panel-header">
                <h3>🎮 Aktivite Durumu</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="activity-types">
                    {activityTypes.map(type => (
                        <button
                            key={type.id}
                            className={`type-btn ${activity.type === type.id ? 'active' : ''}`}
                            onClick={() => setActivity({ ...activity, type: type.id })}
                        >
                            <span>{type.emoji}</span>
                            <span>{type.label}</span>
                        </button>
                    ))}
                </div>
                <input
                    value={activity.name}
                    onChange={(e) => setActivity({ ...activity, name: e.target.value })}
                    placeholder="Oyun / Müzik / Video adı..."
                />
                <input
                    value={activity.details}
                    onChange={(e) => setActivity({ ...activity, details: e.target.value })}
                    placeholder="Detaylar..."
                />
                <button onClick={updateActivity} className="save-btn">Kaydet</button>
            </div>
        </div>
    );
};

// 🏠 MAIN EXTRA FEATURES PANEL
export const ExtraFeaturesPanel = ({ onClose, onOpenFeature }) => {
    const features = [
        { id: 'scheduled', name: 'Planlanmış Mesajlar', emoji: '📅', desc: 'İleri tarihli mesaj gönder' },
        { id: 'mood', name: 'Ruh Hali', emoji: '😊', desc: 'Ruh halini belirle' },
        { id: 'templates', name: 'Sunucu Şablonları', emoji: '🎨', desc: 'Hazır sunucu şablonları' },
        { id: 'commands', name: 'Özel Komutlar', emoji: '⚡', desc: 'Sunucu komutları oluştur' },
        { id: 'analytics', name: 'Sunucu Analitiği', emoji: '📈', desc: 'Detaylı istatistikler' },
        { id: 'levels', name: 'Seviye Sıralaması', emoji: '🏆', desc: 'Üye seviyeleri' },
        { id: 'welcome', name: 'Hoşgeldin Mesajları', emoji: '👋', desc: 'Otomatik karşılama' },
        { id: 'privacy', name: 'Gizlilik Ayarları', emoji: '🔒', desc: 'Gizlilik tercihleri' },
        { id: 'connections', name: 'Bağlı Hesaplar', emoji: '🔗', desc: 'Spotify, GitHub vs.' },
        { id: 'activity', name: 'Aktivite Durumu', emoji: '🎮', desc: 'Ne yaptığını göster' }
    ];

    return (
        <div className="extra-features-panel">
            <div className="panel-header">
                <h2>🚀 Ekstra Özellikler (20+)</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="features-grid">
                {features.map(feature => (
                    <div
                        key={feature.id}
                        className="feature-card"
                        onClick={() => onOpenFeature && onOpenFeature(feature.id)}
                    >
                        <span className="feature-emoji">{feature.emoji}</span>
                        <span className="feature-name">{feature.name}</span>
                        <span className="feature-desc">{feature.desc}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExtraFeaturesPanel;

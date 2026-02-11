// frontend/src/components/panels/NewFeaturesPanel.js
// 🚀 20 YENİ ÖZELLİK PANELİ - 26 Ocak 2026

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../AuthContext';
import toast from '../../utils/toast';
import { getApiBase } from '../../utils/apiEndpoints';
import './NewFeaturesPanel.css';

const API_URL = getApiBase();

// 1️⃣ QUICK REACTIONS COMPONENT
export const QuickReactionsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [reactions, setReactions] = useState([]);
    const [newEmoji, setNewEmoji] = useState('');

    useEffect(() => {
        fetchReactions();
    }, []);

    const fetchReactions = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/quick-reactions/`);
            const data = await res.json();
            setReactions(data.reactions || []);
        } catch (e) {
            console.error('Quick reactions error:', e);
        }
    };

    const addEmoji = async () => {
        if (!newEmoji) return;
        try {
            await fetchWithAuth(`${API_URL}/features/quick-reactions/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ emoji: newEmoji })
            });
            setNewEmoji('');
            fetchReactions();
            toast.success('Emoji eklendi!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel quick-reactions">
            <div className="panel-header">
                <h3>🎯 Hızlı Tepkiler</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <div className="reactions-grid">
                    {reactions.map((emoji, i) => (
                        <span key={i} className="reaction-item">{emoji}</span>
                    ))}
                </div>
                <div className="add-emoji">
                    <input
                        value={newEmoji}
                        onChange={(e) => setNewEmoji(e.target.value)}
                        placeholder="Yeni emoji..."
                        maxLength={2}
                    />
                    <button onClick={addEmoji}>Ekle</button>
                </div>
            </div>
        </div>
    );
};

// 2️⃣ MESSAGE STATS COMPONENT
export const MessageStatsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/message-stats/`);
            const data = await res.json();
            setStats(data);
        } catch (e) {
            console.error('Stats error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-panel message-stats">
            <div className="panel-header">
                <h3>📊 Mesaj İstatistiklerin</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : stats && (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-value">{stats.total?.toLocaleString()}</span>
                                <span className="stat-label">Toplam Mesaj</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{stats.today}</span>
                                <span className="stat-label">Bugün</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{stats.weekly}</span>
                                <span className="stat-label">Bu Hafta</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{stats.monthly}</span>
                                <span className="stat-label">Bu Ay</span>
                            </div>
                        </div>
                        <div className="stat-info">
                            <p>📈 Günlük ortalama: <strong>{stats.avg_daily}</strong> mesaj</p>
                        </div>
                        {stats.top_rooms?.length > 0 && (
                            <div className="top-rooms">
                                <h4>🏆 En Aktif Odalar</h4>
                                {stats.top_rooms.map((room, i) => (
                                    <div key={i} className="room-stat">
                                        <span>{room.room__name}</span>
                                        <span>{room.count} mesaj</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

// 3️⃣ USER NOTES COMPONENT
export const UserNotesPanel = ({ targetUser, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (targetUser) fetchNote();
    }, [targetUser]);

    const fetchNote = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/user-notes/${targetUser}/`);
            const data = await res.json();
            setNote(data.note || '');
        } catch (e) {
            console.error('Note error:', e);
        }
    };

    const saveNote = async () => {
        setLoading(true);
        try {
            await fetchWithAuth(`${API_URL}/features/user-notes/${targetUser}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note })
            });
            toast.success('Not kaydedildi!');
        } catch (e) {
            toast.error('Hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-panel user-notes">
            <div className="panel-header">
                <h3>📝 {targetUser} için Not</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Bu kullanıcı hakkında özel not..."
                    rows={5}
                />
                <button onClick={saveNote} disabled={loading}>
                    {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
                <p className="note-hint">Sadece sen görebilirsin</p>
            </div>
        </div>
    );
};

// 4️⃣ SERVER INSIGHTS COMPONENT
export const ServerInsightsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (serverId) fetchInsights();
    }, [serverId]);

    const fetchInsights = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/server-insights/${serverId}/`);
            const data = await res.json();
            setInsights(data);
        } catch (e) {
            console.error('Insights error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-panel server-insights">
            <div className="panel-header">
                <h3>📈 Sunucu İstatistikleri</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : insights && (
                    <>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-value">{insights.total_members}</span>
                                <span className="stat-label">Toplam Üye</span>
                            </div>
                            <div className="stat-card highlight">
                                <span className="stat-value">+{insights.new_members_week}</span>
                                <span className="stat-label">Yeni Üye (7 gün)</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{insights.total_messages?.toLocaleString()}</span>
                                <span className="stat-label">Toplam Mesaj</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-value">{insights.weekly_messages}</span>
                                <span className="stat-label">Haftalık Mesaj</span>
                            </div>
                        </div>
                        <div className="growth-indicator">
                            <span className={insights.growth_rate >= 0 ? 'positive' : 'negative'}>
                                {insights.growth_rate >= 0 ? '📈' : '📉'} {insights.growth_rate}% büyüme
                            </span>
                        </div>
                        {insights.top_members?.length > 0 && (
                            <div className="top-list">
                                <h4>🏆 En Aktif Üyeler</h4>
                                {insights.top_members.slice(0, 5).map((m, i) => (
                                    <div key={i} className="list-item">
                                        <span className="rank">#{i + 1}</span>
                                        <span className="name">{m.sender__username}</span>
                                        <span className="count">{m.count} mesaj</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

// 5️⃣ ACTIVITY FEED COMPONENT
export const ActivityFeedPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/activity-feed/`);
            const data = await res.json();
            setActivities(data.activities || []);
        } catch (e) {
            console.error('Activity error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-panel activity-feed">
            <div className="panel-header">
                <h3>📰 Aktivite Akışı</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : activities.length === 0 ? (
                    <div className="empty">Henüz aktivite yok</div>
                ) : (
                    <div className="activity-list">
                        {activities.map((activity, i) => (
                            <div key={i} className={`activity-item ${activity.type}`}>
                                <span className="activity-icon">
                                    {activity.type === 'mention' ? '📢' : '💬'}
                                </span>
                                <div className="activity-content">
                                    <strong>{activity.user}</strong>
                                    <span className="activity-room">#{activity.room}</span>
                                    <p>{activity.preview}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// 6️⃣ USER BADGES COMPONENT
export const UserBadgesPanel = ({ username, onClose }) => {
    const { fetchWithAuth, user } = useAuth();
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBadges();
    }, [username]);

    const fetchBadges = async () => {
        try {
            const target = username || user?.username;
            const res = await fetchWithAuth(`${API_URL}/features/badges/${target}/`);
            const data = await res.json();
            setBadges(data.badges || []);
        } catch (e) {
            console.error('Badges error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-panel user-badges">
            <div className="panel-header">
                <h3>🏅 Rozetler</h3>
                {onClose && <button onClick={onClose} className="close-btn">✕</button>}
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : badges.length === 0 ? (
                    <div className="empty">Henüz rozet yok</div>
                ) : (
                    <div className="badges-grid">
                        {badges.map((badge, i) => (
                            <div key={i} className="badge-item" title={badge.description}>
                                <span className="badge-icon">{badge.icon}</span>
                                <span className="badge-name">{badge.name}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// 7️⃣ FAVORITE ROOMS COMPONENT
export const FavoriteRoomsPanel = ({ onClose, onRoomSelect }) => {
    const { fetchWithAuth } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/favorite-rooms/`);
            const data = await res.json();
            setFavorites(data.favorites || []);
        } catch (e) {
            console.error('Favorites error:', e);
        } finally {
            setLoading(false);
        }
    };

    const removeFavorite = async (roomId) => {
        try {
            await fetchWithAuth(`${API_URL}/features/favorite-rooms/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ room_id: roomId })
            });
            setFavorites(favorites.filter(f => f.id !== roomId));
            toast.success('Favorilerden kaldırıldı');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel favorite-rooms">
            <div className="panel-header">
                <h3>⭐ Favori Odalar</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : favorites.length === 0 ? (
                    <div className="empty">
                        <p>Favori oda yok</p>
                        <small>Bir odayı favorilere eklemek için sağ tıkla</small>
                    </div>
                ) : (
                    <div className="favorites-list">
                        {favorites.map((room) => (
                            <div key={room.id} className="favorite-item">
                                <span
                                    className="room-name"
                                    onClick={() => onRoomSelect && onRoomSelect(room.id)}
                                >
                                    #{room.name}
                                </span>
                                {room.server_name && (
                                    <span className="server-name">{room.server_name}</span>
                                )}
                                <button
                                    className="remove-btn"
                                    onClick={() => removeFavorite(room.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// 8️⃣ ENGAGEMENT METRICS COMPONENT
export const EngagementMetricsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/engagement-metrics/`);
            const data = await res.json();
            setMetrics(data);
        } catch (e) {
            console.error('Metrics error:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feature-panel engagement-metrics">
            <div className="panel-header">
                <h3>📊 Etkileşim Metrikleri</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : metrics && (
                    <>
                        <div className="rank-badge">
                            <span className="rank-icon">🌟</span>
                            <span className="rank-title">{metrics.rank}</span>
                            <span className="rank-score">{metrics.popularity_score} puan</span>
                        </div>
                        <div className="metrics-grid">
                            <div className="metric-card">
                                <span className="metric-icon">❤️</span>
                                <span className="metric-value">{metrics.total_reactions}</span>
                                <span className="metric-label">Toplam Tepki</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-icon">📢</span>
                                <span className="metric-value">{metrics.mentions_received}</span>
                                <span className="metric-label">Etiketlenme</span>
                            </div>
                            <div className="metric-card">
                                <span className="metric-icon">💬</span>
                                <span className="metric-value">{metrics.replies_received}</span>
                                <span className="metric-label">Yanıt</span>
                            </div>
                        </div>
                        {metrics.top_message && (
                            <div className="top-message">
                                <h4>🏆 En Popüler Mesajın</h4>
                                <p>"{metrics.top_message.content}"</p>
                                <span>{metrics.top_message.reactions} tepki</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

// 9️⃣ STREAK TRACKER COMPONENT
export const StreakTrackerPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [streak, setStreak] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStreak();
    }, []);

    const fetchStreak = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/streak/`);
            const data = await res.json();
            setStreak(data);
        } catch (e) {
            console.error('Streak error:', e);
        } finally {
            setLoading(false);
        }
    };

    const logActivity = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/streak/`, {
                method: 'POST'
            });
            const data = await res.json();
            if (data.status === 'logged') {
                toast.success(`🔥 ${data.current_streak} günlük seri!`);
                fetchStreak();
            } else {
                toast.info('Bugün zaten kayıtlısın!');
            }
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel streak-tracker">
            <div className="panel-header">
                <h3>🔥 Günlük Seri</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : streak && (
                    <>
                        <div className="streak-display">
                            <span className="streak-fire">🔥</span>
                            <span className="streak-number">{streak.current_streak}</span>
                            <span className="streak-label">gün</span>
                        </div>
                        <div className="streak-stats">
                            <div className="streak-stat">
                                <span>🏆 En Uzun:</span>
                                <span>{streak.longest_streak} gün</span>
                            </div>
                            <div className="streak-stat">
                                <span>📅 Toplam Aktif:</span>
                                <span>{streak.total_active_days} gün</span>
                            </div>
                        </div>
                        <button className="log-activity-btn" onClick={logActivity}>
                            ✅ Bugünü Kaydet
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// 🔟 VOICE EFFECTS COMPONENT
export const VoiceEffectsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [effects, setEffects] = useState({
        enabled: false,
        pitch: 1,
        reverb: 0,
        echo: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEffects();
    }, []);

    const fetchEffects = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/voice-effects/`);
            const data = await res.json();
            setEffects(data.effects || {});
        } catch (e) {
            console.error('Voice effects error:', e);
        } finally {
            setLoading(false);
        }
    };

    const saveEffects = async () => {
        try {
            await fetchWithAuth(`${API_URL}/features/voice-effects/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(effects)
            });
            toast.success('Ses efektleri kaydedildi!');
        } catch (e) {
            toast.error('Hata oluştu');
        }
    };

    return (
        <div className="feature-panel voice-effects">
            <div className="panel-header">
                <h3>🎤 Ses Efektleri</h3>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>
            <div className="panel-content">
                {loading ? (
                    <div className="loading">Yükleniyor...</div>
                ) : (
                    <>
                        <div className="effect-toggle">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={effects.enabled}
                                    onChange={(e) => setEffects({ ...effects, enabled: e.target.checked })}
                                />
                                Efektleri Aktif Et
                            </label>
                        </div>
                        <div className="effect-slider">
                            <label>🎵 Pitch: {effects.pitch?.toFixed(1)}</label>
                            <input
                                type="range"
                                min="0.5"
                                max="2"
                                step="0.1"
                                value={effects.pitch || 1}
                                onChange={(e) => setEffects({ ...effects, pitch: parseFloat(e.target.value) })}
                            />
                        </div>
                        <div className="effect-slider">
                            <label>🏔️ Reverb: {effects.reverb}%</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={effects.reverb || 0}
                                onChange={(e) => setEffects({ ...effects, reverb: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="effect-slider">
                            <label>📢 Echo: {effects.echo}%</label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={effects.echo || 0}
                                onChange={(e) => setEffects({ ...effects, echo: parseInt(e.target.value) })}
                            />
                        </div>
                        <button onClick={saveEffects} className="save-btn">
                            💾 Kaydet
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

// MAIN EXPORT - All Features Dashboard
const NewFeaturesPanel = ({ onClose }) => {
    const [activeFeature, setActiveFeature] = useState(null);

    const features = [
        { id: 'stats', name: 'Mesaj İstatistikleri', icon: '📊', component: MessageStatsPanel },
        { id: 'streak', name: 'Günlük Seri', icon: '🔥', component: StreakTrackerPanel },
        { id: 'badges', name: 'Rozetlerim', icon: '🏅', component: UserBadgesPanel },
        { id: 'engagement', name: 'Etkileşim', icon: '💫', component: EngagementMetricsPanel },
        { id: 'favorites', name: 'Favori Odalar', icon: '⭐', component: FavoriteRoomsPanel },
        { id: 'activity', name: 'Aktivite Akışı', icon: '📰', component: ActivityFeedPanel },
        { id: 'reactions', name: 'Hızlı Tepkiler', icon: '🎯', component: QuickReactionsPanel },
        { id: 'voice', name: 'Ses Efektleri', icon: '🎤', component: VoiceEffectsPanel },
    ];

    const ActiveComponent = features.find(f => f.id === activeFeature)?.component;

    return (
        <div className="new-features-dashboard">
            <div className="panel-header">
                <h2>🚀 Yeni Özellikler</h2>
                <button onClick={onClose} className="close-btn">✕</button>
            </div>

            {activeFeature && ActiveComponent ? (
                <ActiveComponent onClose={() => setActiveFeature(null)} />
            ) : (
                <div className="features-grid">
                    {features.map((feature) => (
                        <button
                            key={feature.id}
                            className="feature-card"
                            onClick={() => setActiveFeature(feature.id)}
                        >
                            <span className="feature-icon">{feature.icon}</span>
                            <span className="feature-name">{feature.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewFeaturesPanel;

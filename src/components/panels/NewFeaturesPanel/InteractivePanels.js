// NewFeaturesPanel/InteractivePanels.js
import { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import toast from '../../../utils/toast';
import { getApiBase } from '../../../utils/apiEndpoints';

const API_URL = getApiBase();

export const UserBadgesPanel = ({ username, onClose }) => {
    const { fetchWithAuth, user } = useAuth();
    const [badges, setBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchBadges(); }, [username]);

    const fetchBadges = async () => {
        try { const target = username || user?.username; const res = await fetchWithAuth(`${API_URL}/features/badges/${target}/`); const data = await res.json(); setBadges(data.badges || []); }
        catch (e) { console.error('Badges error:', e); } finally { setLoading(false); }
    };

    return (
        <div className="feature-panel user-badges">
            <div className="panel-header"><h3>{'🏅'} Rozetler</h3>{onClose && <button onClick={onClose} className="close-btn">{'✕'}</button>}</div>
            <div className="panel-content">
                {loading ? <div className="loading">Yükleniyor...</div>
                    : badges.length === 0 ? <div className="empty">Henüz rozet yok</div>
                        : <div className="badges-grid">{badges.map((badge, i) => (
                            <div key={i} className="badge-item" title={badge.description}><span className="badge-icon">{badge.icon}</span><span className="badge-name">{badge.name}</span></div>
                        ))}</div>}
            </div>
        </div>
    );
};

export const FavoriteRoomsPanel = ({ onClose, onRoomSelect }) => {
    const { fetchWithAuth } = useAuth();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchFavorites(); }, []);

    const fetchFavorites = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/favorite-rooms/`); const data = await res.json(); setFavorites(data.favorites || []); }
        catch (e) { console.error('Favorites error:', e); } finally { setLoading(false); }
    };

    const removeFavorite = async (roomId) => {
        try {
            await fetchWithAuth(`${API_URL}/features/favorite-rooms/`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room_id: roomId }) });
            setFavorites(favorites.filter(f => f.id !== roomId)); toast.success('Favorilerden kaldırıldı');
        } catch (e) { toast.error('Hata oluştu'); }
    };

    return (
        <div className="feature-panel favorite-rooms">
            <div className="panel-header"><h3>{'⭐'} Favori Odalar</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">Yükleniyor...</div>
                    : favorites.length === 0 ? <div className="empty"><p>Favori oda yok</p><small>Bir odayı favorilere eklemek için sağ tıkla</small></div>
                        : <div className="favorites-list">{favorites.map(room => (
                            <div key={room.id} className="favorite-item">
                                <span className="room-name" onClick={() => onRoomSelect && onRoomSelect(room.id)}>#{room.name}</span>
                                {room.server_name && <span className="server-name">{room.server_name}</span>}
                                <button className="remove-btn" onClick={() => removeFavorite(room.id)}>{'✕'}</button>
                            </div>
                        ))}</div>}
            </div>
        </div>
    );
};

export const EngagementMetricsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchMetrics(); }, []);

    const fetchMetrics = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/engagement-metrics/`); const data = await res.json(); setMetrics(data); }
        catch (e) { console.error('Metrics error:', e); } finally { setLoading(false); }
    };

    return (
        <div className="feature-panel engagement-metrics">
            <div className="panel-header"><h3>{'📊'} Etkileşim Metrikleri</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">Yükleniyor...</div> : metrics && <>
                    <div className="rank-badge">
                        <span className="rank-icon">{'🌟'}</span>
                        <span className="rank-title">{metrics.rank}</span>
                        <span className="rank-score">{metrics.popularity_score} puan</span>
                    </div>
                    <div className="metrics-grid">
                        <div className="metric-card"><span className="metric-icon">{'❤️'}</span><span className="metric-value">{metrics.total_reactions}</span><span className="metric-label">Toplam Tepki</span></div>
                        <div className="metric-card"><span className="metric-icon">{'📢'}</span><span className="metric-value">{metrics.mentions_received}</span><span className="metric-label">Etiketlenme</span></div>
                        <div className="metric-card"><span className="metric-icon">{'💬'}</span><span className="metric-value">{metrics.replies_received}</span><span className="metric-label">Yanıt</span></div>
                    </div>
                    {metrics.top_message && (
                        <div className="top-message"><h4>{'🏆'} En Popüler Mesajın</h4><p>"{metrics.top_message.content}"</p><span>{metrics.top_message.reactions} tepki</span></div>
                    )}
                </>}
            </div>
        </div>
    );
};

export const StreakTrackerPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [streak, setStreak] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchStreak(); }, []);

    const fetchStreak = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/streak/`); const data = await res.json(); setStreak(data); }
        catch (e) { console.error('Streak error:', e); } finally { setLoading(false); }
    };

    const logActivity = async () => {
        try {
            const res = await fetchWithAuth(`${API_URL}/features/streak/`, { method: 'POST' });
            const data = await res.json();
            if (data.status === 'logged') { toast.success(`🔥 ${data.current_streak} günlük seri!`); fetchStreak(); }
            else { toast.info('Bugün zaten kayıtlısın!'); }
        } catch (e) { toast.error('Hata oluştu'); }
    };

    return (
        <div className="feature-panel streak-tracker">
            <div className="panel-header"><h3>{'🔥'} Günlük Seri</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">Yükleniyor...</div> : streak && <>
                    <div className="streak-display">
                        <span className="streak-fire">{'🔥'}</span>
                        <span className="streak-number">{streak.current_streak}</span>
                        <span className="streak-label">gün</span>
                    </div>
                    <div className="streak-stats">
                        <div className="streak-stat"><span>{'🏆'} En Uzun:</span><span>{streak.longest_streak} gün</span></div>
                        <div className="streak-stat"><span>{'📅'} Toplam Aktif:</span><span>{streak.total_active_days} gün</span></div>
                    </div>
                    <button className="log-activity-btn" onClick={logActivity}>{'✅'} Bugünü Kaydet</button>
                </>}
            </div>
        </div>
    );
};

export const VoiceEffectsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [effects, setEffects] = useState({ enabled: false, pitch: 1, reverb: 0, echo: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchEffects(); }, []);

    const fetchEffects = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/voice-effects/`); const data = await res.json(); setEffects(data.effects || {}); }
        catch (e) { console.error('Voice effects error:', e); } finally { setLoading(false); }
    };

    const saveEffects = async () => {
        try {
            await fetchWithAuth(`${API_URL}/features/voice-effects/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(effects) });
            toast.success('Ses efektleri kaydedildi!');
        } catch (e) { toast.error('Hata oluştu'); }
    };

    return (
        <div className="feature-panel voice-effects">
            <div className="panel-header"><h3>{'🎤'} Ses Efektleri</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">Yükleniyor...</div> : <>
                    <div className="effect-toggle"><label><input type="checkbox" checked={effects.enabled} onChange={e => setEffects({ ...effects, enabled: e.target.checked })} /> Efektleri Aktif Et</label></div>
                    <div className="effect-slider"><label>{'🎵'} Pitch: {effects.pitch?.toFixed(1)}</label><input type="range" min="0.5" max="2" step="0.1" value={effects.pitch || 1} onChange={e => setEffects({ ...effects, pitch: parseFloat(e.target.value) })} /></div>
                    <div className="effect-slider"><label>{'🏔️'} Reverb: {effects.reverb}%</label><input type="range" min="0" max="100" value={effects.reverb || 0} onChange={e => setEffects({ ...effects, reverb: parseInt(e.target.value) })} /></div>
                    <div className="effect-slider"><label>{'📢'} Echo: {effects.echo}%</label><input type="range" min="0" max="100" value={effects.echo || 0} onChange={e => setEffects({ ...effects, echo: parseInt(e.target.value) })} /></div>
                    <button onClick={saveEffects} className="save-btn">{'💾'} Kaydet</button>
                </>}
            </div>
        </div>
    );
};

// NewFeaturesPanel/DataPanels.js
import { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import toast from '../../../utils/toast';
import { getApiBase } from '../../../utils/apiEndpoints';

const API_URL = getApiBase();

export const QuickReactionsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [reactions, setReactions] = useState([]);
    const [newEmoji, setNewEmoji] = useState('');

    useEffect(() => { fetchReactions(); }, []);

    const fetchReactions = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/quick-reactions/`); const data = await res.json(); setReactions(data.reactions || []); }
        catch (e) { console.error('Quick reactions error:', e); }
    };

    const addEmoji = async () => {
        if (!newEmoji) return;
        try {
            await fetchWithAuth(`${API_URL}/features/quick-reactions/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emoji: newEmoji }) });
            setNewEmoji(''); fetchReactions(); toast.success('Emoji eklendi!');
        } catch (e) { toast.error('Hata olu\u015Ftu'); }
    };

    return (
        <div className="feature-panel quick-reactions">
            <div className="panel-header"><h3>{'\uD83C\uDFAF'} H\u0131zl\u0131 Tepkiler</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                <div className="reactions-grid">{reactions.map((emoji, i) => <span key={i} className="reaction-item">{emoji}</span>)}</div>
                <div className="add-emoji">
                    <input value={newEmoji} onChange={e => setNewEmoji(e.target.value)} placeholder="Yeni emoji..." maxLength={2} />
                    <button onClick={addEmoji}>Ekle</button>
                </div>
            </div>
        </div>
    );
};

export const MessageStatsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchStats(); }, []);

    const fetchStats = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/message-stats/`); const data = await res.json(); setStats(data); }
        catch (e) { console.error('Stats error:', e); } finally { setLoading(false); }
    };

    return (
        <div className="feature-panel message-stats">
            <div className="panel-header"><h3>{'\uD83D\uDCCA'} Mesaj \u0130statistiklerin</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">Y\u00FCkleniyor...</div> : stats && <>
                    <div className="stats-grid">
                        <div className="stat-card"><span className="stat-value">{stats.total?.toLocaleString()}</span><span className="stat-label">Toplam Mesaj</span></div>
                        <div className="stat-card"><span className="stat-value">{stats.today}</span><span className="stat-label">Bug\u00FCn</span></div>
                        <div className="stat-card"><span className="stat-value">{stats.weekly}</span><span className="stat-label">Bu Hafta</span></div>
                        <div className="stat-card"><span className="stat-value">{stats.monthly}</span><span className="stat-label">Bu Ay</span></div>
                    </div>
                    <div className="stat-info"><p>{'\uD83D\uDCC8'} G\u00FCnl\u00FCk ortalama: <strong>{stats.avg_daily}</strong> mesaj</p></div>
                    {stats.top_rooms?.length > 0 && (
                        <div className="top-rooms"><h4>{'\uD83C\uDFC6'} En Aktif Odalar</h4>
                            {stats.top_rooms.map((room, i) => <div key={i} className="room-stat"><span>{room.room__name}</span><span>{room.count} mesaj</span></div>)}
                        </div>
                    )}
                </>}
            </div>
        </div>
    );
};

export const UserNotesPanel = ({ targetUser, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => { if (targetUser) fetchNote(); }, [targetUser]);

    const fetchNote = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/user-notes/${targetUser}/`); const data = await res.json(); setNote(data.note || ''); }
        catch (e) { console.error('Note error:', e); }
    };

    const saveNote = async () => {
        setLoading(true);
        try {
            await fetchWithAuth(`${API_URL}/features/user-notes/${targetUser}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ note }) });
            toast.success('Not kaydedildi!');
        } catch (e) { toast.error('Hata olu\u015Ftu'); } finally { setLoading(false); }
    };

    return (
        <div className="feature-panel user-notes">
            <div className="panel-header"><h3>{'\uD83D\uDCDD'} {targetUser} i\u00E7in Not</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Bu kullan\u0131c\u0131 hakk\u0131nda \u00F6zel not..." rows={5} />
                <button onClick={saveNote} disabled={loading}>{loading ? 'Kaydediliyor...' : 'Kaydet'}</button>
                <p className="note-hint">Sadece sen g\u00F6rebilirsin</p>
            </div>
        </div>
    );
};

export const ServerInsightsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { if (serverId) fetchInsights(); }, [serverId]);

    const fetchInsights = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/server-insights/${serverId}/`); const data = await res.json(); setInsights(data); }
        catch (e) { console.error('Insights error:', e); } finally { setLoading(false); }
    };

    return (
        <div className="feature-panel server-insights">
            <div className="panel-header"><h3>{'\uD83D\uDCC8'} Sunucu \u0130statistikleri</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">Y\u00FCkleniyor...</div> : insights && <>
                    <div className="stats-grid">
                        <div className="stat-card"><span className="stat-value">{insights.total_members}</span><span className="stat-label">Toplam \u00DCye</span></div>
                        <div className="stat-card highlight"><span className="stat-value">+{insights.new_members_week}</span><span className="stat-label">Yeni \u00DCye (7 g\u00FCn)</span></div>
                        <div className="stat-card"><span className="stat-value">{insights.total_messages?.toLocaleString()}</span><span className="stat-label">Toplam Mesaj</span></div>
                        <div className="stat-card"><span className="stat-value">{insights.weekly_messages}</span><span className="stat-label">Haftal\u0131k Mesaj</span></div>
                    </div>
                    <div className="growth-indicator">
                        <span className={insights.growth_rate >= 0 ? 'positive' : 'negative'}>
                            {insights.growth_rate >= 0 ? '\uD83D\uDCC8' : '\uD83D\uDCC9'} {insights.growth_rate}% b\u00FCy\u00FCme
                        </span>
                    </div>
                    {insights.top_members?.length > 0 && (
                        <div className="top-list"><h4>{'\uD83C\uDFC6'} En Aktif \u00DCyeler</h4>
                            {insights.top_members.slice(0, 5).map((m, i) => (
                                <div key={i} className="list-item"><span className="rank">#{i + 1}</span><span className="name">{m.sender__username}</span><span className="count">{m.count} mesaj</span></div>
                            ))}
                        </div>
                    )}
                </>}
            </div>
        </div>
    );
};

export const ActivityFeedPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchActivities(); }, []);

    const fetchActivities = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/activity-feed/`); const data = await res.json(); setActivities(data.activities || []); }
        catch (e) { console.error('Activity error:', e); } finally { setLoading(false); }
    };

    return (
        <div className="feature-panel activity-feed">
            <div className="panel-header"><h3>{'\uD83D\uDCF0'} Aktivite Ak\u0131\u015F\u0131</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">Y\u00FCkleniyor...</div>
                    : activities.length === 0 ? <div className="empty">Hen\u00FCz aktivite yok</div>
                        : <div className="activity-list">
                            {activities.map((activity, i) => (
                                <div key={i} className={`activity-item ${activity.type}`}>
                                    <span className="activity-icon">{activity.type === 'mention' ? '\uD83D\uDCE2' : '\uD83D\uDCAC'}</span>
                                    <div className="activity-content">
                                        <strong>{activity.user}</strong>
                                        <span className="activity-room">#{activity.room}</span>
                                        <p>{activity.preview}</p>
                                    </div>
                                </div>
                            ))}
                        </div>}
            </div>
        </div>
    );
};

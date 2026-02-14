// ExtraFeaturesPanel/DataPanels.js
// Panels 21-25: ScheduledMessages, MoodStatus, ServerTemplates, CustomCommands, ServerAnalytics
import { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import toast from '../../../utils/toast';
import { getApiBase } from '../../../utils/apiEndpoints';

const API_URL = getApiBase();

// 21 SCHEDULED MESSAGES
export const ScheduledMessagesPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [scheduled, setScheduled] = useState([]);
    const [newMessage, setNewMessage] = useState({ content: '', scheduled_time: '' });

    useEffect(() => { fetchScheduled(); }, []);

    const fetchScheduled = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/scheduled-messages/`); const data = await res.json(); setScheduled(data.scheduled || []); }
        catch (e) { console.error('Scheduled messages error:', e); }
    };

    const addScheduled = async () => {
        if (!newMessage.content || !newMessage.scheduled_time) return;
        try {
            await fetchWithAuth(`${API_URL}/features/scheduled-messages/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newMessage, room_id: 1 }) });
            setNewMessage({ content: '', scheduled_time: '' }); fetchScheduled(); toast.success('Mesaj planlandı!');
        } catch (e) { toast.error('Hata oluştu'); }
    };

    return (
        <div className="feature-panel scheduled-messages">
            <div className="panel-header"><h3>{'📅'} Planlanmış Mesajlar</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                <div className="scheduled-list">
                    {scheduled.map((msg, i) => (
                        <div key={i} className="scheduled-item"><span className="content">{msg.content}</span><span className="time">{new Date(msg.scheduled_time).toLocaleString()}</span></div>
                    ))}
                    {scheduled.length === 0 && <p className="empty">Planlanmış mesaj yok</p>}
                </div>
                <div className="add-scheduled">
                    <input value={newMessage.content} onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })} placeholder="Mesaj içeriği..." />
                    <input type="datetime-local" value={newMessage.scheduled_time} onChange={(e) => setNewMessage({ ...newMessage, scheduled_time: e.target.value })} />
                    <button onClick={addScheduled}>Planla</button>
                </div>
            </div>
        </div>
    );
};

// 22 MOOD STATUS
export const MoodStatusPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [currentMood, setCurrentMood] = useState('happy');
    const [moods, setMoods] = useState({});

    useEffect(() => { fetchMood(); }, []);

    const fetchMood = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/mood/`); const data = await res.json(); setCurrentMood(data.current); setMoods(data.available_moods || {}); }
        catch (e) { console.error('Mood error:', e); }
    };

    const setMood = async (mood) => {
        try {
            await fetchWithAuth(`${API_URL}/features/mood/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mood }) });
            setCurrentMood(mood); toast.success('Ruh halin güncellendi!');
        } catch (e) { toast.error('Hata oluştu'); }
    };

    return (
        <div className="feature-panel mood-status">
            <div className="panel-header"><h3>{'😊'} Ruh Halin</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                <div className="current-mood"><span className="mood-emoji">{moods[currentMood]?.emoji || '😊'}</span><span className="mood-name">{currentMood}</span></div>
                <div className="mood-grid">
                    {Object.entries(moods).map(([key, data]) => (
                        <button key={key} className={`mood-btn ${currentMood === key ? 'active' : ''}`} onClick={() => setMood(key)} style={{ borderColor: data.color }}>
                            <span className="emoji">{data.emoji}</span><span className="name">{key}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 23 SERVER TEMPLATES
export const ServerTemplatesPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [templates, setTemplates] = useState({});

    useEffect(() => { fetchTemplates(); }, []);

    const fetchTemplates = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/server-templates/`); const data = await res.json(); setTemplates(data.templates || {}); }
        catch (e) { console.error('Templates error:', e); }
    };

    const applyTemplate = async (templateId) => {
        try {
            await fetchWithAuth(`${API_URL}/features/server-templates/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ template: templateId, name: 'My Server' }) });
            toast.success('Şablon hazır!');
        } catch (e) { toast.error('Hata oluştu'); }
    };

    return (
        <div className="feature-panel server-templates">
            <div className="panel-header"><h3>{'🎨'} Sunucu Şablonları</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                <div className="templates-grid">
                    {Object.entries(templates).map(([id, template]) => (
                        <div key={id} className="template-card" style={{ borderColor: template.color }}>
                            <h4>{template.name}</h4>
                            <div className="rooms">{template.rooms.map((room, i) => (<span key={i} className="room-tag">#{room}</span>))}</div>
                            <div className="roles">{template.roles.map((role, i) => (<span key={i} className="role-tag">{role}</span>))}</div>
                            <button onClick={() => applyTemplate(id)}>Kullan</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 24 CUSTOM COMMANDS
export const CustomCommandsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [commands, setCommands] = useState({});
    const [newCmd, setNewCmd] = useState({ name: '', response: '' });

    useEffect(() => { fetchCommands(); }, []);

    const fetchCommands = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/custom-commands/?server_id=${serverId || 1}`); const data = await res.json(); setCommands(data.commands || {}); }
        catch (e) { console.error('Commands error:', e); }
    };

    const addCommand = async () => {
        if (!newCmd.name || !newCmd.response) return;
        try {
            await fetchWithAuth(`${API_URL}/features/custom-commands/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newCmd, server_id: serverId || 1 }) });
            setNewCmd({ name: '', response: '' }); fetchCommands(); toast.success('Komut eklendi!');
        } catch (e) { toast.error('Hata oluştu'); }
    };

    return (
        <div className="feature-panel custom-commands">
            <div className="panel-header"><h3>{'⚡'} Özel Komutlar</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                <div className="commands-list">
                    {Object.entries(commands).map(([name, data]) => (
                        <div key={name} className="command-item"><code>{name}</code><span>{data.response}</span></div>
                    ))}
                    {Object.keys(commands).length === 0 && <p className="empty">Özel komut yok</p>}
                </div>
                <div className="add-command">
                    <input value={newCmd.name} onChange={(e) => setNewCmd({ ...newCmd, name: e.target.value })} placeholder="!komut" />
                    <input value={newCmd.response} onChange={(e) => setNewCmd({ ...newCmd, response: e.target.value })} placeholder="Yanıt..." />
                    <button onClick={addCommand}>Ekle</button>
                </div>
            </div>
        </div>
    );
};

// 25 SERVER ANALYTICS
export const ServerAnalyticsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchAnalytics(); }, []);

    const fetchAnalytics = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/server-analytics/${serverId || 1}/`); const data = await res.json(); setAnalytics(data); }
        catch (e) { console.error('Analytics error:', e); } finally { setLoading(false); }
    };

    return (
        <div className="feature-panel server-analytics">
            <div className="panel-header"><h3>{'📈'} Sunucu Analitiği</h3><button onClick={onClose} className="close-btn">{'✕'}</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">Yükleniyor...</div> : analytics && (<>
                    <div className="analytics-grid">
                        <div className="stat-card"><span className="value">{analytics.total_members}</span><span className="label">Toplam Üye</span></div>
                        <div className="stat-card"><span className="value">{analytics.new_members_week}</span><span className="label">Bu Hafta Yeni</span></div>
                        <div className="stat-card"><span className="value">{analytics.total_messages}</span><span className="label">Toplam Mesaj</span></div>
                        <div className="stat-card"><span className="value">{analytics.weekly_messages}</span><span className="label">Haftalık Mesaj</span></div>
                    </div>
                    <div className="active-rooms">
                        <h4>En Aktif Odalar</h4>
                        {analytics.active_rooms?.map((room, i) => (<div key={i} className="room-stat"><span>#{room.room__name}</span><span>{room.count} mesaj</span></div>))}
                    </div>
                </>)}
            </div>
        </div>
    );
};

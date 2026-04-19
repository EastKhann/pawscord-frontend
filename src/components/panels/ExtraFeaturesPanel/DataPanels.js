// ExtraFeaturesPanel/DataPanels.js
// Panels 21-25: ScheduledMessages, MoodStatus, ServerTemplates, CustomCommands, ServerAnalytics
import { useState, useEffect, useCallback, memo } from 'react';
import { useAuth } from '../../../AuthContext';
import toast from '../../../utils/toast';
import { getApiBase } from '../../../utils/apiEndpoints';

import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logger from '../../../utils/logger';
const API_URL = getApiBase();

// 21 SCHEDULED MESSAGES
export const ScheduledMessagesPanel = memo(({ onClose }) => {
    const { t } = useTranslation();
    const { fetchWithAuth } = useAuth();
    const [scheduled, setScheduled] = useState([]);
    const [newMessage, setNewMessage] = useState({ content: '', scheduled_time: '' });

    useEffect(() => { fetchScheduled(); }, []);

    const fetchScheduled = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/scheduled-messages/`); const data = await res.json(); setScheduled(data.scheduled || []); }
        catch (e) { logger.error('Scheduled messages error:', e); }
    };

    const addScheduled = async () => {
        if (!newMessage.content || !newMessage.scheduled_time) return;
        try {
            await fetchWithAuth(`${API_URL}/features/scheduled-messages/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newMessage, room_id: 1 }) });
            setNewMessage({ content: '', scheduled_time: '' }); fetchScheduled(); toast.success(t('dataPanels.scheduled'));
        } catch (e) { toast.error(t('common.error')); }
    };

    const handleContentChange = useCallback((e) => setNewMessage(prev => ({ ...prev, content: e.target.value })), []);
    const handleTimeChange = useCallback((e) => setNewMessage(prev => ({ ...prev, scheduled_time: e.target.value })), []);

    return (
        <div className="feature-panel scheduled-messages">
            <div className="panel-header"><h3>{'📅'} Scheduled Messages</h3><button onClick={onClose} className="close-btn">✕</button></div>
            <div className="panel-content">
                <div className="scheduled-list">
                    {scheduled.map((msg, i) => (
                        <div key={`item-${i}`} className="scheduled-item"><span className="content">{msg.content}</span><span className="time">{new Date(msg.scheduled_time).toLocaleString()}</span></div>
                    ))}
                    {scheduled.length === 0 && <p className="empty">{t('planlanm_message_yok')}</p>}
                </div>
                <div className="add-scheduled">
                    <input value={newMessage.content} onChange={handleContentChange} placeholder={t('mesaj_ierii')} aria-label="mesaj ierii" />
                    <input type="datetime-local" value={newMessage.scheduled_time} onChange={handleTimeChange} aria-label="datetime-local" />
                    <button onClick={addScheduled}>{t('planla')}</button>
                </div>
            </div>
        </div>
    );
});

ScheduledMessagesPanel.displayName = 'ScheduledMessagesPanel';

// 22 MOOD STATUS
export const MoodStatusPanel = memo(({ onClose }) => {
    const { t } = useTranslation();
    const { fetchWithAuth } = useAuth();
    const [currentMood, setCurrentMood] = useState('happy');
    const [moods, setMoods] = useState({});

    useEffect(() => { fetchMood(); }, []);

    const fetchMood = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/mood/`); const data = await res.json(); setCurrentMood(data.current); setMoods(data.available_moods || {}); }
        catch (e) { logger.error('Mood error:', e); }
    };

    const setMood = useCallback(async (mood) => {
        try {
            await fetchWithAuth(`${API_URL}/features/mood/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mood }) });
            setCurrentMood(mood); toast.success(t('dataPanels.moodUpdated'));
        } catch (e) { toast.error(t('common.error')); }
    }, [fetchWithAuth]);

    return (
        <div className="feature-panel mood-status">
            <div className="panel-header"><h3>{'😊'} Ruh Halin</h3><button onClick={onClose} className="close-btn">✕</button></div>
            <div className="panel-content">
                <div className="current-mood"><span className="mood-emoji">{moods[currentMood]?.emoji || '😊'}</span><span className="mood-name">{currentMood}</span></div>
                <div className="mood-grid">
                    {Object.entries(moods).map(([key, data]) => {
                        const moodBtnStyle = { borderColor: data.color };
                        return (
                            <button key={key} className={`mood-btn ${currentMood === key ? 'active' : ''}`} onClick={() => setMood(key)} style={moodBtnStyle}>
                                <span className="emoji">{data.emoji}</span><span className="name">{key}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

MoodStatusPanel.displayName = 'MoodStatusPanel';

// 23 SERVER TEMPLATES
export const ServerTemplatesPanel = memo(({ onClose }) => {
    const { t } = useTranslation();
    const { fetchWithAuth } = useAuth();
    const [templates, setTemplates] = useState({});

    useEffect(() => { fetchTemplates(); }, []);

    const fetchTemplates = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/server-templates/`); const data = await res.json(); setTemplates(data.templates || {}); }
        catch (e) { logger.error('Templates error:', e); }
    };

    const applyTemplate = useCallback(async (templateId) => {
        try {
            await fetchWithAuth(`${API_URL}/features/server-templates/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ template: templateId, name: 'My Server' }) });
            toast.success(t('dataPanels.templateReady'));
        } catch (e) { toast.error(t('common.error')); }
    }, [fetchWithAuth]);

    return (
        <div className="feature-panel server-templates">
            <div className="panel-header"><h3>{'🎨'} Server Templates</h3><button onClick={onClose} className="close-btn">✕</button></div>
            <div className="panel-content">
                <div className="templates-grid">
                    {Object.entries(templates).map(([id, template]) => {
                        const templateCardStyle = { borderColor: template.color };
                        return (
                            <div key={id} className="template-card" style={templateCardStyle}>
                                <h4>{template.name}</h4>
                                <div className="rooms">{template.rooms.map((room, i) => (<span key={`item-${i}`} className="room-tag">{room}</span>))}</div>
                                <div className="roles">{template.roles.map((role, i) => (<span key={`item-${i}`} className="role-tag">{role}</span>))}</div>
                                <button onClick={() => applyTemplate(id)}>{t('kullan')}</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});

ServerTemplatesPanel.displayName = 'ServerTemplatesPanel';

// 24 CUSTOM COMMANDS
export const CustomCommandsPanel = memo(({ serverId, onClose }) => {
    const { t } = useTranslation();
    const { fetchWithAuth } = useAuth();
    const [commands, setCommands] = useState({});
    const [newCmd, setNewCmd] = useState({ name: '', response: '' });

    useEffect(() => { fetchCommands(); }, []);

    const fetchCommands = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/custom-commands/?server_id=${serverId || 1}`); const data = await res.json(); setCommands(data.commands || {}); }
        catch (e) { logger.error('Commands error:', e); }
    };

    const addCommand = async () => {
        if (!newCmd.name || !newCmd.response) return;
        try {
            await fetchWithAuth(`${API_URL}/features/custom-commands/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...newCmd, server_id: serverId || 1 }) });
            setNewCmd({ name: '', response: '' }); fetchCommands(); toast.success(t('dataPanels.commandAdded'));
        } catch (e) { toast.error(t('common.error')); }
    };

    const handleCmdNameChange = useCallback((e) => setNewCmd(prev => ({ ...prev, name: e.target.value })), []);
    const handleCmdResponseChange = useCallback((e) => setNewCmd(prev => ({ ...prev, response: e.target.value })), []);

    return (
        <div className="feature-panel custom-commands">
            <div className="panel-header"><h3>⚡ Özel Komutlar</h3><button onClick={onClose} className="close-btn">✕</button></div>
            <div className="panel-content">
                <div className="commands-list">
                    {Object.entries(commands).map(([name, data]) => (
                        <div key={name} className="command-item"><code>{name}</code><span>{data.response}</span></div>
                    ))}
                    {Object.keys(commands).length === 0 && <p className="empty">{t('zel_komut_yok')}</p>}
                </div>
                <div className="add-command">
                    <input value={newCmd.name} onChange={handleCmdNameChange} placeholder={t('komut')} aria-label="komut" />
                    <input value={newCmd.response} onChange={handleCmdResponseChange} placeholder={t('yant')} aria-label="yant" />
                    <button onClick={addCommand}>{t('add')}</button>
                </div>
            </div>
        </div>
    );
});

CustomCommandsPanel.displayName = 'CustomCommandsPanel';

// 25 SERVER ANALYTICS
export const ServerAnalyticsPanel = memo(({ serverId, onClose }) => {
    const { t } = useTranslation();
    const { fetchWithAuth } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchAnalytics(); }, []);

    const fetchAnalytics = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/server-analytics/${serverId || 1}/`); const data = await res.json(); setAnalytics(data); }
        catch (e) { logger.error('Analytics error:', e); } finally { setLoading(false); }
    };

    return (
        <div className="feature-panel server-analytics">
            <div className="panel-header"><h3>{'📈'} Server Analitiği</h3><button onClick={onClose} className="close-btn">✕</button></div>
            <div className="panel-content">
                {loading ? <div className="loading">{t("common.loading")}</div>{t('analytics')}<>
                    <div className="analytics-grid">
                        <div className="stat-card"><span className="value">{analytics.total_members}</span><span className="label">{t('toplam_member')}</span></div>
                        <div className="stat-card"><span className="value">{analytics.new_members_week}</span><span className="label">{t('bu_hafta_yeni')}</span></div>
                        <div className="stat-card"><span className="value">{analytics.total_messages}</span><span className="label">{t('toplam_mesaj')}</span></div>
                        <div className="stat-card"><span className="value">{analytics.weekly_messages}</span><span className="label">{t('haftalk_mesaj')}</span></div>
                    </div>
                    <div className="active-rooms">
                        <h4>{t('en_active_odalar')}</h4>
                        {analytics.active_rooms?.map((room, i) => (<div key={`item-${i}`} className="room-stat"><span>{room.room__name}</span><span>{room.count} message</span></div>))}
                    </div>
                </>)}
            </div>
        </div>
    );
});

ServerAnalyticsPanel.displayName = 'ServerAnalyticsPanel';


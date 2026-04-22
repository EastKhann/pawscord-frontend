// NewFeaturesPanel/DataPanels.js

import { useState, useEffect } from 'react';

import { useAuth } from '../../../AuthContext';

import toast from '../../../utils/toast';

import { getApiBase } from '../../../utils/apiEndpoints';



import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import logger from '../../../utils/logger';

const API_URL = getApiBase();



export const QuickReactionsPanel = ({ onClose }) => {

    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [reactions, setReactions] = useState([]);

    const [newEmoji, setNewEmoji] = useState('');



    useEffect(() => { fetchReactions(); }, []);



    const fetchReactions = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/quick-reactions/`); const data = await res.json(); setReactions(data.reactions || []); }

        catch (e) { logger.error('Quick reactions error:', e); }

    };



    const addEmoji = async () => {

        if (!newEmoji) return;

        try {

            await fetchWithAuth(`${API_URL}/features/quick-reactions/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ emoji: newEmoji }) });

            setNewEmoji(''); fetchReactions(); toast.success(t('dataPanels.emojiAdded'));

        } catch (e) { toast.error(t('common.error')); }

    };



    return (

        <div className="feature-panel quick-reactions">

            <div className="panel-header"><h3>{'🎯'} {t('dataPanels.quickReact','Quick Reactions')}</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                <div className="reactions-grid">{reactions.map((emoji, i) => <span key={`item-${i}`} className="reaction-item">{emoji}</span>)}</div>

                <div className="add-emoji">

                    <input value={newEmoji} onChange={e => setNewEmoji(e.target.value)} placeholder={t('yeni_emoji')} maxLength={2} />

                    <button onClick={addEmoji}>{t('add')}</button>

                </div>

            </div>

        </div>

    );

};



export const MessageStatsPanel = ({ onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => { fetchStats(); }, []);



    const fetchStats = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/message-stats/`); const data = await res.json(); setStats(data); }

        catch (e) { logger.error('Stats error:', e); } finally { setLoading(false); }

    };



    return (

        <div className="feature-panel message-stats">

            <div className="panel-header"><h3>{'📊'} {t('dataPanels.msgStats','Message Statistics')}</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                {loading ? <div className="loading">{t("common.loading")}</div>{t('stats')}<>

                    <div className="stats-grid">

                        <div className="stat-card"><span className="stat-value">{stats.total?.toLocaleString()}</span><span className="stat-label">{t('toplam_mesaj')}</span></div>

                        <div className="stat-card"><span className="stat-value">{stats.today}</span><span className="stat-label">{t('today')}</span></div>

                        <div className="stat-card"><span className="stat-value">{stats.weekly}</span><span className="stat-label">{t('bu_hafta')}</span></div>

                        <div className="stat-card"><span className="stat-value">{stats.monthly}</span><span className="stat-label">{t('bu_ay')}</span></div>

                    </div>

                    <div className="stat-info"><p>{'📈'} {t('dataPanels.dailyAvg','Daily average:')} <strong>{stats.avg_daily}</strong> {t('common.messages','messages')}</p></div>

                    {stats.top_rooms?.length > 0 && (

                        <div className="top-rooms"><h4>{'🏆'} En Active Odalar</h4>

                            {stats.top_rooms.map((room, i) => <div key={`item-${i}`} className="room-stat"><span>{room.room__name}</span><span>{room.count} message</span></div>)}

                        </div>

                    )}

                </>}

            </div>

        </div>

    );

};



export const UserNotesPanel = ({ targetUser, onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [note, setNote] = useState('');

    const [loading, setLoading] = useState(false);



    useEffect(() => { if (targetUser) fetchNote(); }, [targetUser]);



    const fetchNote = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/user-notes/${targetUser}/`); const data = await res.json(); setNote(data.note || ''); }

        catch (e) { logger.error('Note error:', e); }

    };



    const saveNote = async () => {

        setLoading(true);

        try {

            await fetchWithAuth(`${API_URL}/features/user-notes/${targetUser}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ note }) });

            toast.success(t('dataPanels.noteSaved'));

        } catch (e) { toast.error(t('common.error')); } finally { setLoading(false); }

    };



    return (

        <div className="feature-panel user-notes">

            <div className="panel-header"><h3>{'📝'} {targetUser} for Not</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder={t('this_user_hakknda_zel_not')} rows={5} />

                <button onClick={saveNote} disabled={loading}>{loading ? t('common.saving') : 'Save'}</button>

                <p className="note-hint">{t('sadece_sen_grebilirsin')}</p>

            </div>

        </div>

    );

};



export const ServerInsightsPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [insights, setInsights] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => { if (serverId) fetchInsights(); }, [serverId]);



    const fetchInsights = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/server-insights/${serverId}/`); const data = await res.json(); setInsights(data); }

        catch (e) { logger.error('Insights error:', e); } finally { setLoading(false); }

    };



    return (

        <div className="feature-panel server-insights">

            <div className="panel-header"><h3>{'📈'} {t('dataPanels.serverStats','Server Statistics')}</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                {loading ? <div className="loading">{t("common.loading")}</div>{t('insights')}<>

                    <div className="stats-grid">

                        <div className="stat-card"><span className="stat-value">{insights.total_members}</span><span className="stat-label">{t('toplam_member')}</span></div>

                        <div className="stat-card highlight"><span className="stat-value">+{insights.new_members_week}</span><span className="stat-label">{t('yeni_member_7_day')}</span></div>

                        <div className="stat-card"><span className="stat-value">{insights.total_messages?.toLocaleString()}</span><span className="stat-label">{t('toplam_mesaj')}</span></div>

                        <div className="stat-card"><span className="stat-value">{insights.weekly_messages}</span><span className="stat-label">{t('haftalk_mesaj')}</span></div>

                    </div>

                    <div className="growth-indicator">

                        <span className={insights.growth_rate >= 0 ? 'positive' : 'negative'}>

                            {insights.growth_rate >= 0 ? '📈' : '📉'} {insights.growth_rate}% {t('dataPanels.growth','growth')}

                        </span>

                    </div>

                    {insights.top_members?.length > 0 && (

                        <div className="top-list"><h4>{'🏆'} {t('advAnalytics.mostActiveMembers','Most Active Members')}</h4>

                            {insights.top_members.slice(0, 5).map((m, i) => (

                                <div key={`item-${i}`} className="list-item"><span className="rank">{i + 1}</span><span className="name">{m.sender__username}</span><span className="count">{m.count} message</span></div>

                            ))}

                        </div>

                    )}

                </>}

            </div>

        </div>

    );

};



export const ActivityFeedPanel = ({ onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => { fetchActivities(); }, []);



    const fetchActivities = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/activity-feed/`); const data = await res.json(); setActivities(data.activities || []); }

        catch (e) { logger.error('Activity error:', e); } finally { setLoading(false); }

    };



    return (

        <div className="feature-panel activity-feed">

            <div className="panel-header"><h3>{'📰'} {t('dataPanels.activityFeed','Activity Feed')}</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                {loading ? <div className="loading">{t("common.loading")}</div>

                    : activities.length === 0 ? <div className="empty">{t('not_yet_aktivite_yok')}</div>

                        : <div className="activity-list">

                            {activities.map((activity, i) => (

                                <div key={`item-${i}`} className={`activity-item ${activity.type}`}>

                                    <span className="activity-icon">{activity.type === 'mention' ? '📢' : '💬'}</span>

                                    <div className="activity-content">

                                        <strong>{activity.user}</strong>

                                        <span className="activity-room">{activity.room}</span>

                                        <p>{activity.preview}</p>

                                    </div>

                                </div>

                            ))}

                        </div>}

            </div>

        </div>

    );

};



QuickReactionsPanel.propTypes = {

    onClose: PropTypes.func,

};



MessageStatsPanel.propTypes = {

    onClose: PropTypes.func,

};



UserNotesPanel.propTypes = {

    targetUser: PropTypes.object,

    onClose: PropTypes.func,

};



ServerInsightsPanel.propTypes = {

    serverId: PropTypes.string,

    onClose: PropTypes.func,

};



ActivityFeedPanel.propTypes = {

    onClose: PropTypes.func,

};


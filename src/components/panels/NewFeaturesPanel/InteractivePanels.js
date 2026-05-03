/* eslint-disable jsx-a11y/label-has-associated-control */
// ExtraFeaturesPanel/InteractivePanels.js

// Panels 26-30: MemberLevels, WelcomeMessages, PrivacySettings, UserConnections, ActivityStatus

import { useState, useEffect, useCallback, memo } from 'react';

import { useAuth } from '../../../AuthContext';

import toast from '../../../utils/toast';

import { getApiBase } from '../../../utils/apiEndpoints';



import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import logger from '../../../utils/logger';

const API_URL = getApiBase();



// 26 MEMBER LEVELS

export const MemberLevelsPanel = memo(({ serverId, onClose }) => {

    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [leaderboard, setLeaderboard] = useState([]);



    useEffect(() => { fetchLevels(); }, []);



    const fetchLevels = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/member-levels/${serverId || 1}/`); const data = await res.json(); setLeaderboard(data.leaderboard || []); }

        catch (e) { logger.error('Levels error:', e); }

    };



    return (

        <div className="feature-panel member-levels">

            <div className="panel-header"><h3>{'🏆'} Level Ranking</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                <div className="leaderboard">

                    {leaderboard.map((member, i) => (

                        <div key={`item-${i}`} className={`member-row ${i < 3 ? 'top-' + (i + 1) : ''}`}>

                            <span className="rank">{i + 1}</span>

                            <span className="username">{member.username}</span>

                            <span className="level">Lv.{member.level}</span>

                            <span className="xp">{member.xp} XP</span>

                        </div>

                    ))}

                    {leaderboard.length === 0 && <p className="empty">{t('not_yet_veri_yok')}</p>}

                </div>

            </div>

        </div>

    );

});



MemberLevelsPanel.displayName = 'MemberLevelsPanel';



// 27 WELCOME MESSAGES

export const WelcomeMessagesPanel = memo(({ serverId, onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [config, setConfig] = useState({ enabled: false, message: 'Welcome {user}! 🎉', dm_enabled: false, dm_message: '' });



    useEffect(() => { fetchConfig(); }, []);



    const fetchConfig = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/welcome-messages/${serverId || 1}/`); const data = await res.json(); setConfig(data); }

        catch (e) { logger.error('Welcome config error:', e); }

    };



    const saveConfig = async () => {

        try {

            await fetchWithAuth(`${API_URL}/features/welcome-messages/${serverId || 1}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) });

            toast.success(t('interactive.settingsSaved'));

        } catch (e) { toast.error(t('common.error')); }

    };



    const handleEnabledChange = useCallback((e) => setConfig(prev => ({ ...prev, enabled: e.target.checked })), []);

    const handleMessageChange = useCallback((e) => setConfig(prev => ({ ...prev, message: e.target.value })), []);

    const handleDmEnabledChange = useCallback((e) => setConfig(prev => ({ ...prev, dm_enabled: e.target.checked })), []);



    return (

        <div className="feature-panel welcome-messages">

            <div className="panel-header"><h3>{'👋'} Welcome Messages</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                <div className="setting-row">

                    <label><input type="checkbox" checked={config.enabled} onChange={handleEnabledChange} aria-label={t('interactivePanel.enabledToggle', 'Enable welcome message')} />{t('welcome_message_aktif')}</label>

                </div>

                <div className="setting-row">
                    <label>{t('mesaj')}</label>

                    <textarea value={config.message} onChange={handleMessageChange} placeholder={t('welcome_user')} aria-label={t('interactivePanel.messageInput', 'Welcome message')} />

                    <small>{t('interactivePanel.usernameHint', 'Write username for')}{" {'{user}'}"}</small>

                </div>

                <div className="setting-row">

                    <label><input type="checkbox" checked={config.dm_enabled} onChange={handleDmEnabledChange} aria-label={t('interactivePanel.dmToggle', 'Enable DM welcome')} />{t('dm_with_de_gnder')}</label>

                </div>

                <button onClick={saveConfig} className="save-btn">{t("common.save")}</button>

            </div>

        </div>

    );

});



WelcomeMessagesPanel.displayName = 'WelcomeMessagesPanel';



// 28 PRIVACY SETTINGS

export const PrivacySettingsPanel = memo(({ onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [settings, setSettings] = useState({ show_online_status: true, allow_dms_from_strangers: true, show_current_activity: true, allow_friend_requests: true, show_servers: false, read_receipts: true });



    useEffect(() => { fetchSettings(); }, []);



    const fetchSettings = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/privacy-settings/`); const data = await res.json(); setSettings(data); }

        catch (e) { logger.error('Privacy settings error:', e); }

    };



    const saveSettings = async () => {

        try {

            await fetchWithAuth(`${API_URL}/features/privacy-settings/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });

            toast.success(t('interactive.privacySaved'));

        } catch (e) { toast.error(t('common.error')); }

    };



    const toggleSetting = useCallback((key) => { setSettings(prev => ({ ...prev, [key]: !prev[key] })); }, []);



    return (

        <div className="feature-panel privacy-settings">

            <div className="panel-header"><h3>{'🔒'} Privacy Settings</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                <div className="privacy-option" role="button" tabIndex={0} onClick={() => toggleSetting('show_online_status')} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}><span>{t('privacy.showOnlineStatus', 'Show online status')}</span><div className={`toggle ${settings.show_online_status ? 'on' : 'off'}`} /></div>

                <div className="privacy-option" role="button" tabIndex={0} onClick={() => toggleSetting('allow_dms_from_strangers')} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}><span>{t('yabanclardan_dm_al')}</span><div className={`toggle ${settings.allow_dms_from_strangers ? 'on' : 'off'}`} /></div>

                <div className="privacy-option" role="button" tabIndex={0} onClick={() => toggleSetting('show_current_activity')} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}><span>{t('aktiviteyi_gster')}</span><div className={`toggle ${settings.show_current_activity ? 'on' : 'off'}`} /></div>

                <div className="privacy-option" role="button" tabIndex={0} onClick={() => toggleSetting('allow_friend_requests')} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}><span>{t('friendlk_istaddrine_izin_ver')}</span><div className={`toggle ${settings.allow_friend_requests ? 'on' : 'off'}`} /></div>

                <div className="privacy-option" role="button" tabIndex={0} onClick={() => toggleSetting('show_servers')} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}><span>{t('serverlarm_gster')}</span><div className={`toggle ${settings.show_servers ? 'on' : 'off'}`} /></div>

                <div className="privacy-option" role="button" tabIndex={0} onClick={() => toggleSetting('read_receipts')} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}><span>{t('read_bilgisi')}</span><div className={`toggle ${settings.read_receipts ? 'on' : 'off'}`} /></div>

                <button onClick={saveSettings} className="save-btn">{t("common.save")}</button>

            </div>

        </div>

    );

});



PrivacySettingsPanel.displayName = 'PrivacySettingsPanel';



// 29 USER CONNECTIONS

export const UserConnectionsPanel = memo(({ onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [connections, setConnections] = useState([]);

    const [platforms, setPlatforms] = useState({});



    useEffect(() => { fetchConnections(); }, []);



    const fetchConnections = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/user-connections/`); const data = await res.json(); setConnections(data.connections || []); setPlatforms(data.available_platforms || {}); }

        catch (e) { logger.error('Connections error:', e); }

    };



    const connectPlatform = useCallback(async (platform) => {

        const username = prompt(`${platforms[platform]?.name} username:`);

        if (!username) return;

        try {

            await fetchWithAuth(`${API_URL}/features/user-connections/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ platform, username }) });

            fetchConnections(); toast.success(t('interactive.connectionAdded'));

        } catch (e) { toast.error(t('common.error')); }

    }, [fetchWithAuth]);



    const disconnectPlatform = useCallback(async (platform) => {

        try {

            await fetchWithAuth(`${API_URL}/features/user-connections/`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ platform }) });

            fetchConnections(); toast.success(t('interactive.connectionRemoved'));

        } catch (e) { toast.error(t('common.error')); }

    }, [fetchWithAuth]);



    const connectedPlatforms = connections.map(c => c.platform);



    return (

        <div className="feature-panel user-connections">

            <div className="panel-header"><h3>{'🔗'} {t('interactivePanel.connectedAccounts', 'Connected Accounts')}</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                <div className="connected-list">

                    {connections.map((conn, i) => {

                        const connItemStyle = { borderColor: conn.color };

                        return (

                            <div key={`item-${i}`} className="connection-item" style={connItemStyle}>

                                <span className="icon">{conn.icon}</span><span className="platform">{conn.display_name}</span><span className="username">@{conn.username}</span>

                                <button onClick={() => disconnectPlatform(conn.platform)} className="disconnect-btn">✕</button>

                            </div>

                        );

                    })}

                </div>

                <h4>{t('connectabilir_platformlar')}</h4>

                <div className="platforms-grid">

                    {Object.entries(platforms).filter(([key]) => !connectedPlatforms.includes(key)).map(([key, data]) => {

                        const platformBtnStyle = { backgroundColor: data.color };

                        return (

                            <button key={key} className="platform-btn" style={platformBtnStyle} onClick={() => connectPlatform(key)}>

                                <span>{data.icon}</span><span>{data.name}</span>

                            </button>

                        );

                    })}

                </div>

            </div>

        </div>

    );

});



UserConnectionsPanel.displayName = 'UserConnectionsPanel';



// 30 ACTIVITY STATUS

export const ActivityStatusPanel = memo(({ onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [activity, setActivity] = useState({ type: 'none', name: '', details: '' });



    useEffect(() => { fetchActivity(); }, []);



    const fetchActivity = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/activity-status/`); const data = await res.json(); setActivity(data); }

        catch (e) { logger.error('Activity error:', e); }

    };



    const updateActivity = async () => {

        try {

            await fetchWithAuth(`${API_URL}/features/activity-status/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(activity) });

            toast.success(t('interactive.activityUpdated'));

        } catch (e) { toast.error(t('common.error')); }

    };



    const activityTypes = [

        { id: 'playing', label: 'Oynuyor', emoji: '🎮' },

        { id: 'listening', label: 'Listening', emoji: '🎵' },

        { id: 'watching', label: 'Watching', emoji: '📺' },

        { id: 'streaming', label: 'Streaming', emoji: '🔴' }

    ];



    const handleActivityType = useCallback((typeId) => setActivity(prev => ({ ...prev, type: typeId })), []);

    const handleNameChange = useCallback((e) => setActivity(prev => ({ ...prev, name: e.target.value })), []);

    const handleDetailsChange = useCallback((e) => setActivity(prev => ({ ...prev, details: e.target.value })), []);



    return (

        <div className="feature-panel activity-status">

            <div className="panel-header"><h3>{'🎮'} Activity Status</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                <div className="activity-types">

                    {activityTypes.map(type => (

                        <button key={type.id} className={`type-btn ${activity.type === type.id ? 'active' : ''}`} onClick={() => handleActivityType(type.id)}>

                            <span>{type.emoji}</span><span>{type.label}</span>

                        </button>

                    ))}

                </div>

                <input value={activity.name} onChange={handleNameChange} placeholder={t('oyun_mzik_video_ad')} aria-label={t('interactivePanel.activityName', 'Activity name')} />

                <input value={activity.details} onChange={handleDetailsChange} placeholder={t('detaylar')} aria-label={t('interactivePanel.activityDetails', 'Activity details')} />

                <button onClick={updateActivity} className="save-btn">{t("common.save")}</button>

            </div>

        </div>

    );

});



ActivityStatusPanel.displayName = 'ActivityStatusPanel';



// continued

export const UserBadgesPanel = ({ username, onClose }) => {

    const { t } = useTranslation();

    const { fetchWithAuth, user } = useAuth();

    const [badges, setBadges] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => { fetchBadges(); }, [username]);



    const fetchBadges = async () => {

        try { const target = username || user?.username; const res = await fetchWithAuth(`${API_URL}/features/badges/${target}/`); const data = await res.json(); setBadges(data.badges || []); }

        catch (e) { logger.error('Badges error:', e); } finally { setLoading(false); }

    };



    return (

        <div className="feature-panel user-badges">

            <div className="panel-header"><h3>{'🏅'} Badges</h3>{onClose && <button onClick={onClose} className="close-btn">✕</button>}</div>

            <div className="panel-content">

                {loading ? <div className="loading">{t("common.loading")}</div>

                    : badges.length === 0 ? <div className="empty">{t('not_yet_rozet_yok')}</div>

                        : <div className="badges-grid">{badges.map((badge, i) => (

                            <div key={`item-${i}`} className="badge-item" title={badge.description}><span className="badge-icon">{badge.icon}</span><span className="badge-name">{badge.name}</span></div>

                        ))}</div>}

            </div>

        </div>

    );

};



export const FavoriteRoomsPanel = ({ onClose, onRoomSelect }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [favorites, setFavorites] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => { fetchFavorites(); }, []);



    const fetchFavorites = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/favorite-rooms/`); const data = await res.json(); setFavorites(data.favorites || []); }

        catch (e) { logger.error('Favorites error:', e); } finally { setLoading(false); }

    };



    const removeFavorite = async (roomId) => {

        try {

            await fetchWithAuth(`${API_URL}/features/favorite-rooms/`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room_id: roomId }) });

            setFavorites(favorites.filter(f => f.id !== roomId)); toast.success(t('interactive.unfavorited'));

        } catch (e) { toast.error(t('common.error')); }

    };



    return (

        <div className="feature-panel favorite-rooms">

            <div className="panel-header"><h3>⭐ Favorite Rooms</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                {loading ? <div className="loading">{t("common.loading")}</div>

                    : favorites.length === 0 ? <div className="empty"><p>{t('favori_oda_yok')}</p><small>{t('bir_ogn_favorilere_eklemek_for_sa_tkla')}</small></div>

                        : <div className="favorites-list">{favorites.map(room => (

                            <div key={room.id} className="favorite-item">

                                <span className="room-name" onClick={() => onRoomSelect && onRoomSelect(room.id)}>{room.name}</span>

                                {room.server_name && <span className="server-name">{room.server_name}</span>}

                                <button className="remove-btn" onClick={() => removeFavorite(room.id)}>✕</button>

                            </div>

                        ))}</div>}

            </div>

        </div>

    );

};



export const EngagementMetricsPanel = ({ onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [metrics, setMetrics] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => { fetchMetrics(); }, []);



    const fetchMetrics = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/engagement-metrics/`); const data = await res.json(); setMetrics(data); }

        catch (e) { logger.error('Metrics error:', e); } finally { setLoading(false); }

    };



    return (

        <div className="feature-panel engagement-metrics">

            <div className="panel-header"><h3>{'📊'} Engagement Metrics</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                {loading ? <div className="loading">{t("common.loading")}</div> : <>

                    <div className="rank-badge">

                        <span className="rank-icon">{'🌟'}</span>

                        <span className="rank-title">{metrics.rank}</span>

                        <span className="rank-score">{metrics.popularity_score} pts</span>

                    </div>

                    <div className="metrics-grid">

                        <div className="metric-card"><span className="metric-icon">{'❤️'}</span><span className="metric-value">{metrics.total_reactions}</span><span className="metric-label">{t('toplam_tepki')}</span></div>

                        <div className="metric-card"><span className="metric-icon">{'📢'}</span><span className="metric-value">{metrics.mentions_received}</span><span className="metric-label">{t('taglenme')}</span></div>

                        <div className="metric-card"><span className="metric-icon">{'💬'}</span><span className="metric-value">{metrics.replies_received}</span><span className="metric-label">{t('yant')}</span></div>

                    </div>

                    {metrics.top_message && (

                        <div className="top-message"><h4>{'🏆'} Most Popular Message</h4><p>"{metrics.top_message.content}"</p><span>{metrics.top_message.reactions} reactions</span></div>

                    )}

                </>}

            </div>

        </div>

    );

};



export const StreakTrackerPanel = ({ onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [streak, setStreak] = useState(null);

    const [loading, setLoading] = useState(true);



    useEffect(() => { fetchStreak(); }, []);



    const fetchStreak = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/streak/`); const data = await res.json(); setStreak(data); }

        catch (e) { logger.error('Streak error:', e); } finally { setLoading(false); }

    };



    const logActivity = async () => {

        try {

            const res = await fetchWithAuth(`${API_URL}/features/streak/`, { method: 'POST' });

            const data = await res.json();

            if (data.status === 'logged') { toast.success(t('streak.day', { count: data.current_streak })); fetchStreak(); }

            else { toast.info(t('interactive.alreadyCheckedIn')); }

        } catch (e) { toast.error(t('common.error')); }

    };



    return (

        <div className="feature-panel streak-tracker">

            <div className="panel-header"><h3>{'🔥'} Daily Streak</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                {loading ? <div className="loading">{t("common.loading")}</div> : <>

                    <div className="streak-display">

                        <span className="streak-fire">{'🔥'}</span>

                        <span className="streak-number">{streak.current_streak}</span>

                        <span className="streak-label">{t('interactivePanel.days', 'days')}</span>

                    </div>

                    <div className="streak-stats">

                        <div className="streak-stat"><span>{'🏆'} Longest:</span><span>{streak.longest_streak} day</span></div>

                        <div className="streak-stat"><span>{'📅'} Total Active Days:</span><span>{streak.total_active_days} day</span></div>

                    </div>

                    <button className="log-activity-btn" onClick={logActivity}>✅ Check In Today</button>

                </>}

            </div>

        </div>

    );

};



export const VoiceEffectsPanel = ({ onClose }) => {
    const { t } = useTranslation();

    const { fetchWithAuth } = useAuth();

    const [effects, setEffects] = useState({ enabled: false, pitch: 1, reverb: 0, echo: 0 });

    const [loading, setLoading] = useState(true);



    useEffect(() => { fetchEffects(); }, []);



    const fetchEffects = async () => {

        try { const res = await fetchWithAuth(`${API_URL}/features/voice-effects/`); const data = await res.json(); setEffects(data.effects || {}); }

        catch (e) { logger.error('Voice effects error:', e); } finally { setLoading(false); }

    };



    const saveEffects = async () => {

        try {

            await fetchWithAuth(`${API_URL}/features/voice-effects/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(effects) });

            toast.success(t('interactive.soundSaved'));

        } catch (e) { toast.error(t('common.error')); }

    };



    return (

        <div className="feature-panel voice-effects">

            <div className="panel-header"><h3>{'🎤'} Sound Effects</h3><button onClick={onClose} className="close-btn">✕</button></div>

            <div className="panel-content">

                {loading ? <div className="loading">{t("common.loading")}</div> : <>

                    <div className="effect-toggle"><label><input type="checkbox" checked={effects.enabled} onChange={e => setEffects({ ...effects, enabled: e.target.checked })} />{t('efektleri_active_et')}</label></div>

                    <div className="effect-slider"><label>{'🎵'} Pitch: {effects.pitch?.toFixed(1)}</label><input type="range" min="0.5" max="2" step="0.1" value={effects.pitch || 1} onChange={e => setEffects({ ...effects, pitch: parseFloat(e.target.value) })} /></div>

                    <div className="effect-slider"><label>{'🏔️'} Reverb: {effects.reverb}%</label><input type="range" min="0" max="100" value={effects.reverb || 0} onChange={e => setEffects({ ...effects, reverb: parseInt(e.target.value) })} /></div>

                    <div className="effect-slider"><label>{'📢'} Echo: {effects.echo}%</label><input type="range" min="0" max="100" value={effects.echo || 0} onChange={e => setEffects({ ...effects, echo: parseInt(e.target.value) })} /></div>

                    <button onClick={saveEffects} className="save-btn">{'💾'} Save</button>

                </>}

            </div>

        </div>

    );

};



UserBadgesPanel.propTypes = {

    username: PropTypes.string,

    onClose: PropTypes.func,

};



FavoriteRoomsPanel.propTypes = {

    onClose: PropTypes.func,

    onRoomSelect: PropTypes.func,

};



EngagementMetricsPanel.propTypes = {

    onClose: PropTypes.func,

};



StreakTrackerPanel.propTypes = {

    onClose: PropTypes.func,

};



VoiceEffectsPanel.propTypes = {

    onClose: PropTypes.func,

};


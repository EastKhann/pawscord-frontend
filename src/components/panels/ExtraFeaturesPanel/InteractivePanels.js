// ExtraFeaturesPanel/InteractivePanels.js
// Panels 26-30: MemberLevels, WelcomeMessages, PrivacySettings, UserConnections, ActivityStatus
import { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import toast from '../../../utils/toast';
import { getApiBase } from '../../../utils/apiEndpoints';

const API_URL = getApiBase();

// 26 MEMBER LEVELS
export const MemberLevelsPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => { fetchLevels(); }, []);

    const fetchLevels = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/member-levels/${serverId || 1}/`); const data = await res.json(); setLeaderboard(data.leaderboard || []); }
        catch (e) { console.error('Levels error:', e); }
    };

    return (
        <div className="feature-panel member-levels">
            <div className="panel-header"><h3>{'\uD83C\uDFC6'} Seviye S\u0131ralamas\u0131</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
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
                    {leaderboard.length === 0 && <p className="empty">Hen\u00FCz veri yok</p>}
                </div>
            </div>
        </div>
    );
};

// 27 WELCOME MESSAGES
export const WelcomeMessagesPanel = ({ serverId, onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [config, setConfig] = useState({ enabled: false, message: 'Ho\u015F geldin {user}! \uD83C\uDF89', dm_enabled: false, dm_message: '' });

    useEffect(() => { fetchConfig(); }, []);

    const fetchConfig = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/welcome-messages/${serverId || 1}/`); const data = await res.json(); setConfig(data); }
        catch (e) { console.error('Welcome config error:', e); }
    };

    const saveConfig = async () => {
        try {
            await fetchWithAuth(`${API_URL}/features/welcome-messages/${serverId || 1}/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(config) });
            toast.success('Ayarlar kaydedildi!');
        } catch (e) { toast.error('Hata olu\u015Ftu'); }
    };

    return (
        <div className="feature-panel welcome-messages">
            <div className="panel-header"><h3>{'\uD83D\uDC4B'} Ho\u015Fgeldin Mesajlar\u0131</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                <div className="setting-row">
                    <label><input type="checkbox" checked={config.enabled} onChange={(e) => setConfig({ ...config, enabled: e.target.checked })} /> Ho\u015Fgeldin mesaj\u0131 aktif</label>
                </div>
                <div className="setting-row">
                    <label>Mesaj:</label>
                    <textarea value={config.message} onChange={(e) => setConfig({ ...config, message: e.target.value })} placeholder="Ho\u015F geldin {user}!" />
                    <small>Kullan\u0131c\u0131 ad\u0131 i\u00E7in {'{user}'} yaz\u0131n</small>
                </div>
                <div className="setting-row">
                    <label><input type="checkbox" checked={config.dm_enabled} onChange={(e) => setConfig({ ...config, dm_enabled: e.target.checked })} /> DM ile de g\u00F6nder</label>
                </div>
                <button onClick={saveConfig} className="save-btn">Kaydet</button>
            </div>
        </div>
    );
};

// 28 PRIVACY SETTINGS
export const PrivacySettingsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [settings, setSettings] = useState({ show_online_status: true, allow_dms_from_strangers: true, show_current_activity: true, allow_friend_requests: true, show_servers: false, read_receipts: true });

    useEffect(() => { fetchSettings(); }, []);

    const fetchSettings = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/privacy-settings/`); const data = await res.json(); setSettings(data); }
        catch (e) { console.error('Privacy settings error:', e); }
    };

    const saveSettings = async () => {
        try {
            await fetchWithAuth(`${API_URL}/features/privacy-settings/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
            toast.success('Gizlilik ayarlar\u0131 kaydedildi!');
        } catch (e) { toast.error('Hata olu\u015Ftu'); }
    };

    const toggleSetting = (key) => { setSettings(prev => ({ ...prev, [key]: !prev[key] })); };

    return (
        <div className="feature-panel privacy-settings">
            <div className="panel-header"><h3>{'\uD83D\uDD12'} Gizlilik Ayarlar\u0131</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                <div className="privacy-option" onClick={() => toggleSetting('show_online_status')}><span>{'\u00C7'}evrimi\u00E7i durumu g\u00F6ster</span><div className={`toggle ${settings.show_online_status ? 'on' : 'off'}`} /></div>
                <div className="privacy-option" onClick={() => toggleSetting('allow_dms_from_strangers')}><span>Yabanc\u0131lardan DM al</span><div className={`toggle ${settings.allow_dms_from_strangers ? 'on' : 'off'}`} /></div>
                <div className="privacy-option" onClick={() => toggleSetting('show_current_activity')}><span>Aktiviteyi g\u00F6ster</span><div className={`toggle ${settings.show_current_activity ? 'on' : 'off'}`} /></div>
                <div className="privacy-option" onClick={() => toggleSetting('allow_friend_requests')}><span>Arkada\u015Fl\u0131k isteklerine izin ver</span><div className={`toggle ${settings.allow_friend_requests ? 'on' : 'off'}`} /></div>
                <div className="privacy-option" onClick={() => toggleSetting('show_servers')}><span>Sunucular\u0131m\u0131 g\u00F6ster</span><div className={`toggle ${settings.show_servers ? 'on' : 'off'}`} /></div>
                <div className="privacy-option" onClick={() => toggleSetting('read_receipts')}><span>Okundu bilgisi</span><div className={`toggle ${settings.read_receipts ? 'on' : 'off'}`} /></div>
                <button onClick={saveSettings} className="save-btn">Kaydet</button>
            </div>
        </div>
    );
};

// 29 USER CONNECTIONS
export const UserConnectionsPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [connections, setConnections] = useState([]);
    const [platforms, setPlatforms] = useState({});

    useEffect(() => { fetchConnections(); }, []);

    const fetchConnections = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/user-connections/`); const data = await res.json(); setConnections(data.connections || []); setPlatforms(data.available_platforms || {}); }
        catch (e) { console.error('Connections error:', e); }
    };

    const connectPlatform = async (platform) => {
        const username = prompt(`${platforms[platform]?.name} kullan\u0131c\u0131 ad\u0131n\u0131z\u0131 girin:`);
        if (!username) return;
        try {
            await fetchWithAuth(`${API_URL}/features/user-connections/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ platform, username }) });
            fetchConnections(); toast.success('Ba\u011Flant\u0131 eklendi!');
        } catch (e) { toast.error('Hata olu\u015Ftu'); }
    };

    const disconnectPlatform = async (platform) => {
        try {
            await fetchWithAuth(`${API_URL}/features/user-connections/`, { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ platform }) });
            fetchConnections(); toast.success('Ba\u011Flant\u0131 kald\u0131r\u0131ld\u0131!');
        } catch (e) { toast.error('Hata olu\u015Ftu'); }
    };

    const connectedPlatforms = connections.map(c => c.platform);

    return (
        <div className="feature-panel user-connections">
            <div className="panel-header"><h3>{'\uD83D\uDD17'} Ba\u011Fl\u0131 Hesaplar</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                <div className="connected-list">
                    {connections.map((conn, i) => (
                        <div key={i} className="connection-item" style={{ borderColor: conn.color }}>
                            <span className="icon">{conn.icon}</span><span className="platform">{conn.display_name}</span><span className="username">@{conn.username}</span>
                            <button onClick={() => disconnectPlatform(conn.platform)} className="disconnect-btn">{'\u2715'}</button>
                        </div>
                    ))}
                </div>
                <h4>Ba\u011Flanabilir Platformlar</h4>
                <div className="platforms-grid">
                    {Object.entries(platforms).filter(([key]) => !connectedPlatforms.includes(key)).map(([key, data]) => (
                        <button key={key} className="platform-btn" style={{ backgroundColor: data.color }} onClick={() => connectPlatform(key)}>
                            <span>{data.icon}</span><span>{data.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// 30 ACTIVITY STATUS
export const ActivityStatusPanel = ({ onClose }) => {
    const { fetchWithAuth } = useAuth();
    const [activity, setActivity] = useState({ type: 'none', name: '', details: '' });

    useEffect(() => { fetchActivity(); }, []);

    const fetchActivity = async () => {
        try { const res = await fetchWithAuth(`${API_URL}/features/activity-status/`); const data = await res.json(); setActivity(data); }
        catch (e) { console.error('Activity error:', e); }
    };

    const updateActivity = async () => {
        try {
            await fetchWithAuth(`${API_URL}/features/activity-status/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(activity) });
            toast.success('Aktivite g\u00FCncellendi!');
        } catch (e) { toast.error('Hata olu\u015Ftu'); }
    };

    const activityTypes = [
        { id: 'playing', label: 'Oynuyor', emoji: '\uD83C\uDFAE' },
        { id: 'listening', label: 'Dinliyor', emoji: '\uD83C\uDFB5' },
        { id: 'watching', label: '\u0130zliyor', emoji: '\uD83D\uDCFA' },
        { id: 'streaming', label: 'Yay\u0131nda', emoji: '\uD83D\uDD34' }
    ];

    return (
        <div className="feature-panel activity-status">
            <div className="panel-header"><h3>{'\uD83C\uDFAE'} Aktivite Durumu</h3><button onClick={onClose} className="close-btn">{'\u2715'}</button></div>
            <div className="panel-content">
                <div className="activity-types">
                    {activityTypes.map(type => (
                        <button key={type.id} className={`type-btn ${activity.type === type.id ? 'active' : ''}`} onClick={() => setActivity({ ...activity, type: type.id })}>
                            <span>{type.emoji}</span><span>{type.label}</span>
                        </button>
                    ))}
                </div>
                <input value={activity.name} onChange={(e) => setActivity({ ...activity, name: e.target.value })} placeholder="Oyun / M\u00FCzik / Video ad\u0131..." />
                <input value={activity.details} onChange={(e) => setActivity({ ...activity, details: e.target.value })} placeholder="Detaylar..." />
                <button onClick={updateActivity} className="save-btn">Kaydet</button>
            </div>
        </div>
    );
};

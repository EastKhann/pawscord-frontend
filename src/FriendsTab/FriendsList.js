import React, { useState, useMemo } from 'react';
import { FaCommentDots, FaTimes, FaSearch } from 'react-icons/fa';
import LazyImage from '../components/LazyImage';
import styles from './friendsTabStyles';

const IGNORED_APPS = new Set([
    'fps monitor', 'msi afterburner', 'rivatuner', 'fraps', 'nvidia geforce experience',
    'amd radeon software', 'obs', 'obs studio', 'streamlabs', 'xsplit', 'nvidia shadowplay',
    'movavi video suite', 'movavi', 'camtasia', 'bandicam', 'soundpad', 'voicemod',
    'teamspeak', 'mumble', 'overwolf', 'razer cortex',
    'steam', 'epic games launcher', 'origin', 'uplay', 'battle.net', 'gog galaxy',
    'ea app', 'xbox app', 'microsoft store',
]);

const isIgnoredApp = (appName) => {
    if (!appName) return false;
    const lower = appName.toLowerCase().trim();
    for (const ignored of IGNORED_APPS) {
        if (lower.includes(ignored) || ignored.includes(lower)) return true;
    }
    return false;
};

const STATUS_TEXT = { online: 'Çevrimiçi', idle: 'Boşta', dnd: 'Rahatsız Etmeyin', invisible: 'Görünmez', offline: 'Çevrimdışı' };
const STATUS_COLOR = { online: '#23a559', idle: '#f0b232', dnd: '#f23f43', invisible: '#80848e', offline: '#80848e' };

const FriendsList = ({ friends, onlineUsers = [], getDeterministicAvatar, onStartDM, handleRemoveFriend, setActiveTab }) => {
    const [search, setSearch] = useState('');
    const myUsername = localStorage.getItem('chat_username') || '';

    const enriched = useMemo(() => friends.map(friend => {
        const iAmSender = friend.sender_username === myUsername;
        const friendUsername = iAmSender ? friend.receiver_username : friend.sender_username;
        const displayAvatar = iAmSender ? friend.receiver_avatar : friend.sender_avatar;
        const friendActivity = iAmSender ? friend.receiver_activity : friend.sender_activity;
        const isReallyOnline = Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
        return { ...friend, friendUsername, displayAvatar, friendActivity, isReallyOnline };
    }), [friends, onlineUsers, myUsername]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        const list = q ? enriched.filter(f => f.friendUsername.toLowerCase().includes(q)) : enriched;
        // sort: online first
        return [...list].sort((a, b) => (b.isReallyOnline ? 1 : 0) - (a.isReallyOnline ? 1 : 0));
    }, [enriched, search]);

    const onlineCount = enriched.filter(f => f.isReallyOnline).length;

    if (friends.length === 0) {
        return (
            <div style={styles.emptyState}>
                <div style={{ fontSize: '3em', marginBottom: '10px' }}>🥺</div>
                <p style={styles.emptyText}>Henüz kimseyle arkadaş değilsin.</p>
                <button onClick={() => setActiveTab('add')} style={styles.emptyBtn}>Arkadaş Ekle</button>
            </div>
        );
    }

    return (
        <div>
            {/* Header with search + online count */}
            <div style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 6, background: '#1e1f22', borderRadius: 8, padding: '6px 10px' }}>
                    <FaSearch size={11} color="#7a7d87" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Arkadaş ara..."
                        style={{ background: 'transparent', border: 'none', outline: 'none', color: '#dbdee1', fontSize: '0.85em', flex: 1 }}
                    />
                </div>
                <div style={{ fontSize: '0.78em', color: '#7a7d87', whiteSpace: 'nowrap', background: '#2b2d31', borderRadius: 6, padding: '4px 8px' }}>
                    🟢 {onlineCount} / {friends.length}
                </div>
            </div>

            {filtered.map(friend => {
                const { id, friendUsername, displayAvatar, friendActivity, isReallyOnline } = friend;
                const friendStatus = isReallyOnline ? 'online' : 'offline';
                const statusText = STATUS_TEXT[friendStatus] || 'Çevrimdışı';
                const statusColor = STATUS_COLOR[friendStatus] || '#80848e';

                return (
                    <div key={id} style={styles.listItem}>
                        <div style={styles.userInfo} role="button" tabIndex={0} onClick={() => onStartDM(friendUsername)} onKeyDown={e => e.key === 'Enter' && onStartDM(friendUsername)} aria-label={`${friendUsername} ile sohbet et`}>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <LazyImage src={displayAvatar || getDeterministicAvatar(friendUsername)} style={styles.avatar} alt="avatar" />
                                <span style={{
                                    position: 'absolute', bottom: 0, right: 0,
                                    width: 11, height: 11, borderRadius: '50%',
                                    background: statusColor, border: '2px solid #2b2d31'
                                }} />
                            </div>
                            <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                                <div style={styles.username}>{friendUsername}</div>
                                <div style={{ ...styles.status, color: statusColor }}>{statusText}</div>
                                {friendActivity?.spotify && (
                                    <span style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                                        🎵 {friendActivity.spotify.track}
                                    </span>
                                )}
                                {friendActivity?.steam && !isIgnoredApp(friendActivity.steam.game) && (
                                    <span style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                                        🎮 {friendActivity.steam.game}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div style={styles.actions}>
                            <button style={styles.iconButton} title="Mesaj At" onClick={(e) => { e.stopPropagation(); onStartDM(friendUsername); }}>
                                <FaCommentDots />
                            </button>
                            <button style={{ ...styles.iconButton, backgroundColor: '#f23f42' }} title="Arkadaşlıktan Çıkar"
                                onClick={(e) => { e.stopPropagation(); handleRemoveFriend(id, friendUsername); }}>
                                <FaTimes />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default React.memo(FriendsList);

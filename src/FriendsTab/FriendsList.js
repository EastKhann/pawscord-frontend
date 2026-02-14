import React from 'react';
import { FaUserFriends, FaTimes } from '../utils/iconOptimization';
import LazyImage from '../components/LazyImage';
import styles from './friendsTabStyles';

const IGNORED_APPS = new Set([
    'fps monitor', 'msi afterburner', 'rivatuner', 'fraps', 'nvidia geforce experience',
    'amd radeon software', 'obs', 'obs studio', 'streamlabs', 'xsplit', 'nvidia shadowplay',
    'movavi video suite', 'movavi', 'camtasia', 'bandicam', 'soundpad', 'voicemod',
    'discord overlay', 'teamspeak', 'mumble', 'overwolf', 'razer cortex',
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

const STATUS_TEXT = { online: '\u00C7evrimi\u00E7i', idle: 'Bo\u015Fta', dnd: 'Rahats\u0131z Etmeyin', invisible: 'G\u00F6r\u00FCnmez', offline: '\u00C7evrimd\u0131\u015F\u0131' };
const STATUS_COLOR = { online: '#23a559', idle: '#f0b232', dnd: '#f23f43', invisible: '#80848e', offline: '#80848e' };

const FriendsList = ({ friends, onlineUsers = [], getDeterministicAvatar, onStartDM, handleRemoveFriend, setActiveTab }) => {
    if (friends.length === 0) {
        return (
            <div style={styles.emptyState}>
                <div style={{ fontSize: '3em', marginBottom: '10px' }}>{'\uD83E\uDD7A'}</div>
                <p style={styles.emptyText}>Hen\u00FCz kimseyle arkada\u015F de\u011Filsin.</p>
                <button onClick={() => setActiveTab('add')} style={styles.emptyBtn}>Arkada\u015F Ekle</button>
            </div>
        );
    }

    const myUsername = localStorage.getItem('chat_username') || '';

    return friends.map(friend => {
        const iAmSender = friend.sender_username === myUsername;
        const friendUsername = iAmSender ? friend.receiver_username : friend.sender_username;
        const displayAvatar = iAmSender ? friend.receiver_avatar : friend.sender_avatar;
        const friendActivity = iAmSender ? friend.receiver_activity : friend.sender_activity;
        const isReallyOnline = Array.isArray(onlineUsers) && onlineUsers.includes(friendUsername);
        const friendStatus = isReallyOnline ? 'online' : 'offline';
        const statusText = STATUS_TEXT[friendStatus] || '\u00C7evrimd\u0131\u015F\u0131';
        const statusColor = STATUS_COLOR[friendStatus] || '#80848e';

        return (
            <div key={friend.id} style={styles.listItem}>
                <div style={styles.userInfo} onClick={() => onStartDM(friendUsername)}>
                    <LazyImage src={displayAvatar || getDeterministicAvatar(friendUsername)} style={styles.avatar} alt="avatar" />
                    <div style={{ marginLeft: '12px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <div style={styles.username}>{friendUsername}</div>
                        <div style={{ ...styles.status, color: statusColor }}>{statusText}</div>
                        {friendActivity?.spotify && (
                            <span style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                                {'\uD83C\uDFB5'} {friendActivity.spotify.track}
                            </span>
                        )}
                        {friendActivity?.steam && !isIgnoredApp(friendActivity.steam.game) && (
                            <span style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                                {'\uD83C\uDFAE'} {friendActivity.steam.game}
                            </span>
                        )}
                    </div>
                </div>
                <div style={styles.actions}>
                    <button style={styles.iconButton} title="Mesaj At" onClick={(e) => { e.stopPropagation(); onStartDM(friendUsername); }}>
                        <FaUserFriends />
                    </button>
                    <button style={{ ...styles.iconButton, backgroundColor: '#ed4245' }} title="Arkada\u015Fl\u0131ktan \u00C7\u0131kar"
                        onClick={(e) => { e.stopPropagation(); handleRemoveFriend(friend.id, friendUsername); }}>
                        <FaTimes />
                    </button>
                </div>
            </div>
        );
    });
};

export default FriendsList;

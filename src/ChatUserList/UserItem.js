import React from 'react';
import { FaCrown } from 'react-icons/fa';
import { styles } from './chatUserListStyles';

// Ignored apps (tools, utilities - not games)
const IGNORED_APPS = new Set([
    'fps monitor', 'msi afterburner', 'rivatuner', 'fraps', 'nvidia geforce experience',
    'amd radeon software', 'gpu-z', 'cpu-z', 'hwinfo', 'hwmonitor',
    'obs', 'obs studio', 'streamlabs', 'xsplit', 'nvidia shadowplay', 'amd relive',
    'movavi video suite', 'movavi', 'camtasia', 'bandicam', 'action!',
    'soundpad', 'voicemod', 'equalizer apo', 'peace equalizer', 'vb-audio', 'voicemeeter',
    'clownfish', 'morphvox', 'audacity',
    'discord overlay', 'teamspeak', 'mumble', 'overwolf', 'razer cortex',
    'steam', 'epic games launcher', 'origin', 'uplay', 'battle.net', 'gog galaxy',
    'ea app', 'xbox app', 'microsoft store',
]);

const isIgnoredApp = (appName) => {
    if (!appName) return false;
    const lower = appName.toLowerCase().trim();
    for (const ignored of IGNORED_APPS) {
        if (lower.includes(ignored) || ignored.includes(lower)) {
            return true;
        }
    }
    return false;
};

const UserItem = ({ user, isCurrentUser, onClick, onContextMenu }) => {
    const statusColor = user.is_online ? '#43b581' : '#747f8d';
    const isOwner = user.role === 'owner';
    const isModerator = user.role === 'moderator' || user.role === 'mod';

    return (
        <div
            style={{
                ...styles.userItem,
                opacity: user.is_online ? 1 : 0.5,
                backgroundColor: isCurrentUser ? 'rgba(88, 101, 242, 0.1)' : 'transparent'
            }}
            onClick={onClick}
            onContextMenu={onContextMenu}
        >
            {/* AVATAR */}
            <div style={styles.avatarContainer}>
                <img src={user.avatar} alt={user.username} style={styles.avatar} />
                <div style={{ ...styles.statusDot, backgroundColor: statusColor }} />
            </div>

            {/* USERNAME */}
            <div style={styles.userInfo}>
                <div style={styles.usernameRow}>
                    <span style={{
                        ...styles.username,
                        color: isCurrentUser ? '#5865f2' : (user.is_online ? '#ffffff' : '#b9bbbe')
                    }}>
                        {user.display_name || user.username}
                    </span>
                    {isOwner && <FaCrown size={12} color="#faa61a" title="Sunucu Sahibi" />}
                    {isModerator && <FaCrown size={12} color="#5865f2" title="Moderatör" />}
                </div>
                {user.custom_status && (
                    <span style={styles.customStatus}>{user.custom_status}</span>
                )}
                {/* Spotify Activity */}
                {user.current_activity?.spotify && (
                    <div style={styles.activityRow}>
                        <span style={{ fontSize: '10px' }}>🎵</span>
                        <span style={{
                            fontSize: '10px', color: '#1db954',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1
                        }}>
                            {user.current_activity.spotify.track || user.current_activity.spotify.name}
                        </span>
                    </div>
                )}
                {/* Steam Activity */}
                {user.current_activity?.steam && !isIgnoredApp(user.current_activity.steam.game || user.current_activity.steam.name) && (
                    <div style={styles.activityRow}>
                        <span style={{ fontSize: '10px' }}>🎮</span>
                        <span style={{
                            fontSize: '10px', color: '#66c0f4',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1
                        }}>
                            {user.current_activity.steam.game || user.current_activity.steam.name}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserItem;

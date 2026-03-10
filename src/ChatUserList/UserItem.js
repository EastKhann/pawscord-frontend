import React, { useState, useCallback } from 'react';
import { FaCrown } from 'react-icons/fa';
import { styles } from './chatUserListStyles';
import { getFreshActivity } from '../utils/activityUtils';

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
    const statusColor = user.is_online ? '#23a559' : '#80848e';
    const isOwner = user.role === 'owner';
    const isModerator = user.role === 'moderator' || user.role === 'mod';
    const activity = getFreshActivity(user.current_activity);
    // Faz 3.2: profile hover popup
    const [showPopup, setShowPopup] = useState(false);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); }
    };
    const handleMouseEnter = useCallback(() => setShowPopup(true), []);
    const handleMouseLeave = useCallback(() => setShowPopup(false), []);

    return (
        <div
            style={{
                ...styles.userItem,
                position: 'relative',
                opacity: user.is_online ? 1 : 0.5,
                backgroundColor: isCurrentUser ? 'rgba(88, 101, 242, 0.1)' : 'transparent'
            }}
            onClick={onClick}
            onContextMenu={onContextMenu}
            tabIndex={0}
            role="listitem"
            aria-label={`${user.display_name || user.username} — ${user.is_online ? 'çevrimici' : 'çevrimdışı'}`}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* ── Faz 3.2: Profile hover popup card ── */}
            {showPopup && (
                <div style={{
                    position: 'absolute',
                    right: 'calc(100% + 10px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 300,
                    background: '#0d0e10',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '8px',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.65)',
                    padding: '0 0 14px 0',
                    minWidth: '230px',
                    pointerEvents: 'none',
                    animation: 'profilePopupIn 0.12s ease',
                    overflow: 'hidden',
                }}>
                    {/* Banner */}
                    <div style={{ height: '48px', background: 'linear-gradient(135deg,#5865f2 0%,#5865f2 100%)' }} />
                    {/* Avatar */}
                    <div style={{ padding: '0 14px' }}>
                        <img src={user.avatar} alt={user.display_name || user.username}
                            style={{ width: '56px', height: '56px', borderRadius: '50%', border: '4px solid #0b0e1b', marginTop: '-28px', objectFit: 'cover', display: 'block' }} />
                        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: '#f2f3f5', fontWeight: 700, fontSize: '15px', fontFamily: "'gg sans','Noto Sans',sans-serif" }}>
                                {user.display_name || user.username}
                            </span>
                            {isOwner && <FaCrown size={11} color="#f0b232" title="Sunucu sahibi" />}
                            {isModerator && !isOwner && <FaCrown size={11} color="#5865f2" title="Moderatör" />}
                        </div>
                        <div style={{ color: '#949ba4', fontSize: '12px', marginTop: '1px' }}>@{user.username}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: statusColor, flexShrink: 0 }} />
                            <span style={{ color: '#b5bac1', fontSize: '12px' }}>{user.is_online ? 'Çevrimiçi' : 'Çevrimdışı'}</span>
                        </div>
                        {user.custom_status && (
                            <div style={{ color: '#b5bac1', fontSize: '11px', marginTop: '6px', borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '6px' }}>
                                {user.custom_status}
                            </div>
                        )}
                        {activity?.spotify && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px' }}>
                                <span style={{ fontSize: '11px' }}>🎵</span>
                                <span style={{ fontSize: '11px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                    {activity.spotify.track || activity.spotify.name}
                                </span>
                            </div>
                        )}
                        {activity?.steam && !isIgnoredApp(activity.steam.game || activity.steam.name) && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '4px' }}>
                                <span style={{ fontSize: '11px' }}>🎮</span>
                                <span style={{ fontSize: '11px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                                    {activity.steam.game || activity.steam.name}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* AVATAR */}
            <div style={styles.avatarContainer}>
                <img src={user.avatar} alt={user.display_name || user.username} style={styles.avatar} />
                {/* Faz 3.2: pulse animation class for online status dot */}
                <div
                    style={{ ...styles.statusDot, backgroundColor: statusColor }}
                    className={user.is_online ? 'status-online' : ''}
                    aria-hidden="true"
                />
            </div>

            {/* USERNAME */}
            <div style={styles.userInfo}>
                <div style={styles.usernameRow}>
                    <span style={{
                        ...styles.username,
                        color: isCurrentUser ? '#5865f2' : (user.is_online ? '#ffffff' : '#b5bac1')
                    }}>
                        {user.display_name || user.username}
                    </span>
                    {isOwner && <FaCrown size={12} color="#f0b232" title="Sunucu Sahibi" />}
                    {isModerator && <FaCrown size={12} color="#5865f2" title="Moderatör" />}
                </div>
                {user.custom_status && (
                    <span style={styles.customStatus}>{user.custom_status}</span>
                )}
                {/* Spotify Activity */}
                {activity?.spotify && (
                    <div style={styles.activityRow}>
                        <span style={{ fontSize: '10px' }}>🎵</span>
                        <span style={{
                            fontSize: '10px', color: '#1db954',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1
                        }}>
                            {activity.spotify.track || activity.spotify.name}
                        </span>
                    </div>
                )}
                {/* Steam Activity */}
                {activity?.steam && !isIgnoredApp(activity.steam.game || activity.steam.name) && (
                    <div style={styles.activityRow}>
                        <span style={{ fontSize: '10px' }}>🎮</span>
                        <span style={{
                            fontSize: '10px', color: '#66c0f4',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1
                        }}>
                            {activity.steam.game || activity.steam.name}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(UserItem);

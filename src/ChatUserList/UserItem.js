import React, { useState, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaCrown } from 'react-icons/fa';
import { styles } from './chatUserListStyles';
import { getFreshActivity } from '../utils/activityUtils';

// -- dynamic style helpers (pass 2) --
// -- extracted inline style constants --

const _st1062 = styles.statusDot;

// Ignored apps (tools, utilities - not games)
const IGNORED_APPS = new Set([
    'fps monitor',
    'msi afterburner',
    'rivatuner',
    'fraps',
    'nvidia geforce experience',
    'amd radeon software',
    'gpu-z',
    'cpu-z',
    'hwinfo',
    'hwmonitor',
    'obs',
    'obs studio',
    'streamlabs',
    'xsplit',
    'nvidia shadowplay',
    'amd relive',
    'movavi video suite',
    'movavi',
    'camtasia',
    'bandicam',
    'action!',
    'soundpad',
    'voicemod',
    'equalizer apo',
    'peace equalizer',
    'vb-audio',
    'voicemeeter',
    'clownfish',
    'morphvox',
    'audacity',
    'discord overlay',
    'teamspeak',
    'mumble',
    'overwolf',
    'razer cortex',
    'steam',
    'epic games launcher',
    'origin',
    'uplay',
    'battle.net',
    'gog galaxy',
    'ea app',
    'xbox app',
    'microsoft store',
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

const getActivityMeta = (activity) => {
    if (activity?.spotify) {
        return {
            icon: '🎵',
            color: '#1db954',
            background: 'rgba(29, 185, 84, 0.16)',
            text: activity.spotify.track || activity.spotify.name,
        };
    }

    if (activity?.steam && !isIgnoredApp(activity.steam.game || activity.steam.name)) {
        return {
            icon: '🎮',
            color: '#66c0f4',
            background: 'rgba(102, 192, 244, 0.16)',
            text: activity.steam.game || activity.steam.name,
        };
    }

    return null;
};

const UserItem = ({ user, isCurrentUser, onClick, onContextMenu }) => {
    const statusColor = user.is_online ? '#23a559' : '#80848e';
    const isOwner = user.role === 'owner';
    const isModerator = user.role === 'moderator' || user.role === 'mod';
    const activity = getFreshActivity(user.current_activity);
    const activityMeta = getActivityMeta(activity);
    const { t } = useTranslation();
    // Faz 3.2: profile hover popup
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const itemRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
        }
    };
    const handleMouseEnter = useCallback(() => setShowPopup(true), []);
    const handleMouseLeave = useCallback(() => setShowPopup(false), []);

    // Calculate popup position from bounding rect
    const getPopupStyle = () => {
        if (!itemRef.current) return { position: 'fixed', left: -9999, top: -9999 };
        const rect = itemRef.current.getBoundingClientRect();
        let left = rect.left - 288; // 280px width + 8px gap
        let top = rect.top;
        // Keep within viewport
        if (left < 8) left = rect.right + 8;
        if (top + 200 > window.innerHeight) top = window.innerHeight - 210;
        if (top < 8) top = 8;
        return {
            position: 'fixed',
            left,
            top,
            zIndex: 10000,
            width: '280px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#111214',
            boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.08)',
            pointerEvents: 'none',
        };
    };

    return (
        <div
            ref={itemRef}
            style={{
                ...styles.userItem,
                position: 'relative',
                opacity: user.is_online ? 1 : 0.5,
                backgroundColor: isCurrentUser ? 'rgba(88, 101, 242, 0.1)' : 'transparent',
            }}
            onClick={onClick}
            onContextMenu={onContextMenu}
            tabIndex={0}
            role="button"
            aria-label={`${user.display_name || user.username} — ${user.is_online ? t('common.online') : t('common.offline')}`}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* ── Faz 3.2: Profile hover popup card (portal) ── */}
            {showPopup &&
                ReactDOM.createPortal(
                    <div style={getPopupStyle()}>
                        {/* Banner */}
                        <div
                            style={{
                                height: '60px',
                                background: 'linear-gradient(135deg, #5865f2 0%, #3b44b0 100%)',
                            }}
                        />
                        {/* Avatar */}
                        <div style={{ padding: '0 12px 12px', marginTop: '-24px' }}>
                            <img
                                src={user.avatar}
                                alt={user.display_name || user.username}
                                style={{
                                    width: '48px',
                                    height: '48px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '3px solid #111214',
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    marginTop: '6px',
                                }}
                            >
                                <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff' }}>
                                    {user.display_name || user.username}
                                </span>
                                {isOwner && (
                                    <FaCrown size={11} color="#f0b232" title="Sunucu Sahibi" />
                                )}
                                {isModerator && !isOwner && (
                                    <FaCrown size={11} color="#5865f2" title="Modatör" />
                                )}
                            </div>
                            <div style={{ fontSize: '12px', color: '#b5bac1' }}>
                                @{user.username}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginTop: '6px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '50%',
                                        background: statusColor,
                                        flexShrink: 0,
                                    }}
                                />
                                <span style={{ fontSize: '12px', color: '#b5bac1' }}>
                                    {user.is_online ? t('common.online') : t('common.offline')}
                                </span>
                            </div>
                            {user.custom_status && (
                                <div
                                    style={{ fontSize: '11px', color: '#b5bac1', marginTop: '4px' }}
                                >
                                    {user.custom_status}
                                </div>
                            )}
                            {activity?.spotify && (
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '4px',
                                        marginTop: '4px',
                                        fontSize: '11px',
                                        color: '#1db954',
                                    }}
                                >
                                    <span>🎵</span>
                                    <span
                                        style={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {activity.spotify.track || activity.spotify.name}
                                    </span>
                                </div>
                            )}
                            {activity?.steam &&
                                !isIgnoredApp(activity.steam.game || activity.steam.name) && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            marginTop: '4px',
                                            fontSize: '11px',
                                            color: '#66c0f4',
                                        }}
                                    >
                                        <span>🎮</span>
                                        <span
                                            style={{
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }}
                                        >
                                            {activity.steam.game || activity.steam.name}
                                        </span>
                                    </div>
                                )}
                        </div>
                    </div>,
                    document.body
                )}
            {/* AVATAR */}
            <div style={styles.avatarContainer}>
                <img
                    src={user.avatar}
                    alt={user.display_name || user.username}
                    style={styles.avatar}
                />
                {/* Faz 3.2: pulse animation class for online status dot */}
                <div
                    style={_st1062}
                    className={user.is_online ? 'status-online' : ''}
                    aria-hidden="true"
                />
            </div>

            {/* USERNAME */}
            <div style={styles.userInfo}>
                <div style={styles.usernameRow}>
                    <span
                        style={{
                            ...styles.username,
                            color: isCurrentUser
                                ? '#5865f2'
                                : user.is_online
                                  ? '#ffffff'
                                  : '#b5bac1',
                        }}
                    >
                        {user.display_name || user.username}
                    </span>
                    {isOwner && <FaCrown size={12} color="#f0b232" title="Sunucu Sahibi" />}
                    {isModerator && <FaCrown size={12} color="#5865f2" title="Modatör" />}
                </div>
                {user.custom_status && (
                    <span style={styles.customStatus}>{user.custom_status}</span>
                )}
                {activityMeta && (
                    <div style={styles.activityRow}>
                        <span>{activityMeta.icon}</span>
                        <span
                            style={{
                                fontSize: '10px',
                                color: activityMeta.color,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                flex: 1,
                            }}
                        >
                            {activityMeta.text}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

UserItem.propTypes = {
    user: PropTypes.object,
    isCurrentUser: PropTypes.bool,
    onClick: PropTypes.func,
    onContextMenu: PropTypes.func,
};
export default React.memo(UserItem);

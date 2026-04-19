// frontend/src/VoiceUserList/VoiceUserItem.js
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styles from './styles';

// -- extracted inline style constants --
const _st1 = { display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 };
const _st2 = { fontSize: '0.85em', color: '#949ba4' };

const getActivityMeta = (activity) => {
    if (activity?.spotify) {
        return {
            icon: '🎵',
            color: '#1db954',
            background: 'rgba(29, 185, 84, 0.16)',
            text: activity.spotify.name || activity.spotify.track,
        };
    }

    if (activity?.steam) {
        return {
            icon: '🎮',
            color: '#66c0f4',
            background: 'rgba(102, 192, 244, 0.16)',
            text: activity.steam.name || activity.steam.game,
        };
    }

    return null;
};

const getStatusInfo = (userObj) => {
    if (userObj.is_deafened) return { icon: '🔕', style: styles.deafenedUser };
    if (userObj.is_talking) return { icon: '🗣️', style: styles.talkingUser };
    if (userObj.is_mic_off) return { icon: '🔇', style: styles.mutedUser };
    return { icon: '🎤', style: styles.activeUser };
};

const VoiceUserItem = ({
    userObj,
    isSelf,
    getAvatar,
    allUsers,
    isAdmin,
    isDragging,
    draggedUser,
    isClientInThisChannel,
    isPttActive,
    onDragStart,
    onDragEnd,
    onContextMenu,
    onClick,
}) => {
    const { t } = useTranslation();
    const user = userObj.username;
    const { icon: statusIcon, style: userStyle } = getStatusInfo(userObj);

    const foundUser = (allUsers || []).find((u) => u.username === user) || {};
    let avatarUrl = userObj.avatar || userObj.avatarUrl || foundUser.avatar || getAvatar(user);

    // Rich presence activity
    const activity = foundUser.current_activity;
    const activityMeta = getActivityMeta(activity);
    const ActivityBadge = () => {
        if (!activityMeta) return null;
        return (
            <div
                style={{
                    fontSize: '10px',
                    color: activityMeta.color,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '120px',
                    marginTop: '2px',
                }}
            >
                {activityMeta.icon} {activityMeta.text}
            </div>
        );
    };

    const InlineBadge = () => {
        if (!activityMeta) return null;
        return (
            <span
                aria-label="get activity meta"
                style={{
                    flexShrink: 0,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '22px',
                    height: '22px',
                    borderRadius: '999px',
                    background: activityMeta.background,
                    border: `1px solid ${activityMeta.color}33`,
                    color: activityMeta.color,
                    fontSize: '10px',
                    fontWeight: '700',
                }}
            >
                <span aria-hidden="true">{activityMeta.icon}</span>
            </span>
        );
    };

    const avatarBorder = userObj.is_talking ? '2px solid #4CAF50' : '2px solid transparent';
    const avatarShadow = userObj.is_talking ? '0 0 10px rgba(76, 175, 80, 0.6)' : 'none';
    const badgeBg = userObj.is_deafened ? '#e74c3c' : userObj.is_mic_off ? '#e67e22' : '#23a559';
    const avatarStyle = { ...styles.avatar, border: avatarBorder, boxShadow: avatarShadow };
    const statusBadgeStyle = { ...styles.statusBadge, background: badgeBg };
    const selfNameStyle = {
        ...styles.username,
        ...userStyle,
        fontWeight: 'bold',
        flex: '1 1 auto',
        minWidth: 0,
    };
    const nameStyle = { ...styles.username, ...userStyle, flex: '1 1 auto', minWidth: 0 };

    const AvatarSection = () => (
        <div style={styles.avatarContainer}>
            <img
                src={avatarUrl}
                alt={user}
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getAvatar(user);
                }}
                style={avatarStyle}
            />
            <div style={statusBadgeStyle}>{statusIcon}</div>
        </div>
    );

    if (isSelf) {
        return (
            <div style={styles.userItemNew}>
                <AvatarSection />
                <div style={styles.userInfo}>
                    <div style={_st1}>
                        <span
                            className={
                                isClientInThisChannel && isPttActive && !userObj.is_talking
                                    ? 'ptt-active'
                                    : ''
                            }
                            style={selfNameStyle}
                        >
                            {user} <span style={_st2}>({t('voice.you')})</span>
                        </span>
                        <InlineBadge />
                    </div>
                    {userObj.is_sharing && (
                        <div style={styles.sharingIndicator}>🖥️ {t('voice.screenSharing')}</div>
                    )}
                    <ActivityBadge />
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                ...styles.userItemNew,
                ...(isAdmin ? { cursor: 'grab' } : {}),
                ...(isDragging && draggedUser === user
                    ? {
                          opacity: 0.4,
                          border: '1px dashed rgba(88, 101, 242, 0.5)',
                          background: 'rgba(88, 101, 242, 0.05)',
                      }
                    : {}),
            }}
            draggable={isAdmin}
            onDragStart={(e) => onDragStart(e, userObj)}
            onDragEnd={onDragEnd}
            onContextMenu={(e) => onContextMenu(e, userObj)}
        >
            <div
                style={styles.userClickArea}
                onClick={() => onClick(userObj)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onClick(userObj)}
            >
                <AvatarSection />
                <div style={styles.userInfo}>
                    <div style={_st1}>
                        <span
                            className={userObj.is_talking ? 'voice-user-item is-talking' : ''}
                            style={nameStyle}
                        >
                            {user}
                        </span>
                        <InlineBadge />
                    </div>
                    {userObj.is_sharing && (
                        <div style={styles.sharingIndicator}>🖥️ {t('voice.screenSharing')}</div>
                    )}
                    <ActivityBadge />
                </div>
            </div>
        </div>
    );
};

VoiceUserItem.propTypes = {
    userObj: PropTypes.object,
    isSelf: PropTypes.bool,
    getAvatar: PropTypes.func,
    allUsers: PropTypes.array,
    isAdmin: PropTypes.bool,
    isDragging: PropTypes.bool,
    draggedUser: PropTypes.func,
    isClientInThisChannel: PropTypes.bool,
    isPttActive: PropTypes.bool,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onContextMenu: PropTypes.func,
    onClick: PropTypes.func,
};
export default React.memo(VoiceUserItem);

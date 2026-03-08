// frontend/src/VoiceUserList/VoiceUserItem.js
import React from 'react';
import styles from './styles';

const getStatusInfo = (userObj) => {
    if (userObj.is_deafened) return { icon: '🔕', style: styles.deafenedUser };
    if (userObj.is_talking) return { icon: '🗣️', style: styles.talkingUser };
    if (userObj.is_mic_off) return { icon: '🔇', style: styles.mutedUser };
    return { icon: '🎤', style: styles.activeUser };
};

const VoiceUserItem = ({
    userObj, isSelf, getAvatar, allUsers,
    isAdmin, isDragging, draggedUser,
    isClientInThisChannel, isPttActive,
    onDragStart, onDragEnd, onContextMenu, onClick
}) => {
    const user = userObj.username;
    const { icon: statusIcon, style: userStyle } = getStatusInfo(userObj);

    const foundUser = (allUsers || []).find(u => u.username === user) || {};
    let avatarUrl = userObj.avatar || userObj.avatarUrl || foundUser.avatar || getAvatar(user);

    // Rich presence activity
    const activity = foundUser.current_activity;
    const ActivityBadge = () => {
        if (!activity) return null;
        if (activity.spotify)
            return <div style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px', marginTop: '2px' }}>🎵 {activity.spotify.name || activity.spotify.track}</div>;
        if (activity.steam)
            return <div style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '120px', marginTop: '2px' }}>🎮 {activity.steam.name || activity.steam.game}</div>;
        return null;
    };

    const avatarBorder = userObj.is_talking ? '2px solid #4CAF50' : '2px solid transparent';
    const avatarShadow = userObj.is_talking ? '0 0 10px rgba(76, 175, 80, 0.6)' : 'none';
    const badgeBg = userObj.is_deafened ? '#e74c3c' : userObj.is_mic_off ? '#e67e22' : '#23a559';

    const AvatarSection = () => (
        <div style={styles.avatarContainer}>
            <img src={avatarUrl} alt={user}
                onError={(e) => { e.target.onerror = null; e.target.src = getAvatar(user); }}
                style={{ ...styles.avatar, border: avatarBorder, boxShadow: avatarShadow }} />
            <div style={{ ...styles.statusBadge, background: badgeBg }}>{statusIcon}</div>
        </div>
    );

    if (isSelf) {
        return (
            <div style={styles.userItemNew}>
                <AvatarSection />
                <div style={styles.userInfo}>
                    <span className={isClientInThisChannel && isPttActive && !userObj.is_talking ? 'ptt-active' : ''}
                        style={{ ...styles.username, ...userStyle, fontWeight: 'bold' }}>
                        {user} <span style={{ fontSize: '0.85em', color: '#949ba4' }}>(Sen)</span>
                    </span>
                    {userObj.is_sharing && <div style={styles.sharingIndicator}>{'🖥️'} Ekran Payla{'şı'}yor</div>}
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
                ...(isDragging && draggedUser === user ? {
                    opacity: 0.4, border: '1px dashed rgba(88, 101, 242, 0.5)', background: 'rgba(88, 101, 242, 0.05)'
                } : {})
            }}
            draggable={isAdmin}
            onDragStart={(e) => onDragStart(e, userObj)}
            onDragEnd={onDragEnd}
            onContextMenu={(e) => onContextMenu(e, userObj)}
        >
            <div style={styles.userClickArea} onClick={() => onClick(userObj)}>
                <AvatarSection />
                <div style={styles.userInfo}>
                    <span className={userObj.is_talking ? 'voice-user-item is-talking' : ''}
                        style={{ ...styles.username, ...userStyle }}>{user}</span>
                    {userObj.is_sharing && <div style={styles.sharingIndicator}>{'🖥️'} Ekran Payla{'şı'}yor</div>}
                    <ActivityBadge />
                </div>
            </div>
        </div>
    );
};

export default React.memo(VoiceUserItem);

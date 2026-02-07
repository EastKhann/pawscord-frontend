// frontend/src/components/VoiceUsersPreview.js
// 🎤 FEATURE 9: Voice Channel User Preview
// Shows connected users' avatars in channel list

import React, { memo } from 'react';

const VoiceUsersPreview = ({ users = [], maxShow = 5, getDeterministicAvatar }) => {
    if (!users || users.length === 0) return null;

    const visible = users.slice(0, maxShow);
    const overflow = users.length - maxShow;

    return (
        <div style={S.container}>
            {visible.map((user, i) => {
                const avatar = user.avatar || (getDeterministicAvatar ? getDeterministicAvatar(user.username) : null);
                const isSpeaking = user.speaking;
                return (
                    <div key={user.username || i} style={S.userRow}>
                        <div style={{ ...S.avatarWrap, ...(isSpeaking ? S.speaking : {}) }}>
                            {avatar ? (
                                <img src={avatar} alt={user.username} style={S.avatar}
                                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.username}&size=24&background=5865f2&color=fff`; }} />
                            ) : (
                                <div style={S.avatarFallback}>{(user.username || '?')[0].toUpperCase()}</div>
                            )}
                        </div>
                        <span style={S.username}>{user.username}</span>
                        {user.muted && <span style={S.muteIcon}>🔇</span>}
                        {user.deafened && <span style={S.muteIcon}>🔈</span>}
                        {user.streaming && <span style={S.streamBadge}>CANLI</span>}
                    </div>
                );
            })}
            {overflow > 0 && (
                <div style={S.overflow}>ve {overflow} kişi daha</div>
            )}
        </div>
    );
};

const S = {
    container: {
        display: 'flex', flexDirection: 'column', gap: 2,
        paddingLeft: 28, paddingBottom: 4,
    },
    userRow: {
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '2px 8px', borderRadius: 4,
    },
    avatarWrap: {
        width: 20, height: 20, borderRadius: '50%', overflow: 'hidden',
        border: '2px solid transparent', transition: 'border-color 0.2s',
        flexShrink: 0,
    },
    speaking: {
        borderColor: '#23a559',
        boxShadow: '0 0 6px rgba(35,165,89,0.5)',
    },
    avatar: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' },
    avatarFallback: {
        width: '100%', height: '100%', backgroundColor: '#5865f2',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 10, fontWeight: 700, borderRadius: '50%',
    },
    username: { color: '#949ba4', fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    muteIcon: { fontSize: 10 },
    streamBadge: {
        fontSize: 8, fontWeight: 700, color: '#fff',
        backgroundColor: '#da373c', padding: '1px 4px', borderRadius: 3,
    },
    overflow: { color: '#72767d', fontSize: 11, fontStyle: 'italic', paddingLeft: 28 },
};

export default memo(VoiceUsersPreview);

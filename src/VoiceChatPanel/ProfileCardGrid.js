// frontend/src/VoiceChatPanel/ProfileCardGrid.js
// 🎨 Profile card grid — shown when no active streams (voice-only users)

import React from 'react';
import { getDeterministicAvatarFallback } from './avatarUtils';

const getGridLayout = (count, isMobile) => {
    if (isMobile) return { cols: 1, rows: count };
    if (count <= 1) return { cols: 1, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    return { cols: 4, rows: Math.ceil(count / 4) };
};

const ProfileCardGrid = React.memo(({
    combinedUsers,
    activeSpeaker,
    getUserAvatar,
    setContextMenu,
    isMobile,
}) => {
    const { cols, rows } = getGridLayout(combinedUsers.length, isMobile);

    return (
        <div style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: `repeat(${Math.min(cols, 3)}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: '24px',
            padding: '40px',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {combinedUsers.map(user => (
                <div
                    key={user.username}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                        padding: '32px',
                        borderRadius: '16px',
                        background: activeSpeaker === user.username
                            ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.25) 0%, rgba(114, 137, 218, 0.15) 100%)'
                            : 'rgba(47, 49, 54, 0.5)',
                        border: activeSpeaker === user.username
                            ? '2px solid rgba(88, 101, 242, 0.9)'
                            : '2px solid rgba(79, 84, 92, 0.3)',
                        boxShadow: activeSpeaker === user.username
                            ? '0 8px 32px rgba(88, 101, 242, 0.4), 0 0 20px rgba(88, 101, 242, 0.3)'
                            : '0 4px 12px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        position: 'relative',
                        transform: activeSpeaker === user.username ? 'scale(1.05)' : 'scale(1)',
                        animation: 'slideIn 0.4s ease forwards',
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${user.username} profil kartı`}
                    onClick={() => setContextMenu({
                        user,
                        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
                    })}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setContextMenu({ user, position: { x: window.innerWidth / 2, y: window.innerHeight / 2 } }); } }}
                >
                    {/* Avatar */}
                    <div style={{
                        width: '140px',
                        height: '140px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: `5px solid ${activeSpeaker === user.username ? '#5865f2' : '#40444b'}`,
                        boxShadow: activeSpeaker === user.username
                            ? '0 8px 24px rgba(88, 101, 242, 0.6), inset 0 0 20px rgba(88, 101, 242, 0.2)'
                            : '0 4px 12px rgba(0, 0, 0, 0.4)',
                        animation: activeSpeaker === user.username ? 'pulse 1.5s infinite' : 'none',
                        position: 'relative',
                    }}>
                        <img
                            src={getUserAvatar(user.username)}
                            alt={user.username}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getDeterministicAvatarFallback(user.username, 256);
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                filter: activeSpeaker === user.username ? 'brightness(1.1)' : 'brightness(0.95)',
                            }}
                        />
                    </div>

                    {/* Username */}
                    <div style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        color: activeSpeaker === user.username ? '#dee0fc' : '#fff',
                        textAlign: 'center',
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                        letterSpacing: '0.3px',
                    }}>
                        {user.username}
                    </div>

                    {/* Status badges */}
                    <div style={{
                        display: 'flex',
                        gap: '12px',
                        fontSize: '22px',
                        marginTop: '4px',
                    }}>
                        {user.isMuted && (
                            <span
                                title="Mikrofon Kapalı"
                                style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' }}
                            >
                                🔇
                            </span>
                        )}
                        {user.isDeafened && (
                            <span
                                title="Kulaklık Kapalı"
                                style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))' }}
                            >
                                🔈
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
});

ProfileCardGrid.displayName = 'ProfileCardGrid';

export default ProfileCardGrid;

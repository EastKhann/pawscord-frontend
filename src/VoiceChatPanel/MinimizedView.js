// frontend/src/VoiceChatPanel/MinimizedView.js
// 🎨 Küçük Ada - Minimized Voice Panel (Discord Tarzı)

import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import MiniButton from './MiniButton';
import { getDeterministicAvatarFallback } from './avatarUtils';

const MinimizedView = React.memo(({
    roomName,
    userCount,
    combinedUsers,
    currentUser,
    onToggleMinimize,
    onContextMenu,
    getUserAvatar,
    // Voice controls
    isMuted,
    isCameraOn,
    isScreenSharing,
    toggleMute,
    toggleCamera,
    toggleScreenShare,
    leaveVoice,
}) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            handle=".mini-drag-handle"
            defaultPosition={{ x: 20, y: window.innerHeight - 180 }}
            bounds="parent"
        >
            <div
                ref={nodeRef}
                style={{
                    position: 'fixed',
                    zIndex: 9999,
                    background: 'linear-gradient(135deg, #1e2124 0%, #2c2f33 50%, #23272a 100%)',
                    borderRadius: '16px',
                    padding: '16px',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(88, 101, 242, 0.15)',
                    border: '1px solid rgba(88, 101, 242, 0.1)',
                    minWidth: '320px',
                    maxWidth: '400px',
                    backdropFilter: 'blur(12px)',
                    animation: 'slideIn 0.3s ease',
                }}
            >
                {/* MINI HEADER */}
                <div
                    className="mini-drag-handle"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'move',
                        marginBottom: '12px',
                        paddingBottom: '12px',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    <div style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: '#43b581',
                        boxShadow: '0 0 12px #43b581',
                        animation: 'pulse 2s infinite',
                    }} />
                    <span style={{
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 600,
                        flex: 1,
                    }}>
                        🎤 {roomName}
                    </span>
                    <div style={{
                        background: 'rgba(67, 181, 129, 0.2)',
                        borderRadius: '12px',
                        padding: '4px 10px',
                        fontSize: '11px',
                        color: '#43b581',
                        fontWeight: 600,
                    }}>
                        👥 {userCount}
                    </div>
                    <button
                        onClick={onToggleMinimize}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '6px 10px',
                            color: '#fff',
                            cursor: 'pointer',
                            fontSize: '12px',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
                        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    >
                        ⬆️ Aç
                    </button>
                </div>

                {/* KULLANICILAR */}
                <div style={{
                    marginBottom: '12px',
                    maxHeight: '120px',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                }}>
                    {combinedUsers.slice(0, 3).map(user => (
                        <div
                            key={user.username}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                if (user.username !== currentUser?.username) {
                                    onContextMenu({
                                        user,
                                        position: { x: e.clientX, y: e.clientY }
                                    });
                                }
                            }}
                            onClick={(e) => {
                                if (user.username !== currentUser?.username) {
                                    onContextMenu({
                                        user,
                                        position: { x: e.clientX, y: e.clientY }
                                    });
                                }
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '8px',
                                background: user.isTalking
                                    ? 'rgba(67, 181, 129, 0.15)'
                                    : 'rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                                border: user.isTalking
                                    ? '1px solid rgba(67, 181, 129, 0.4)'
                                    : '1px solid transparent',
                                transition: 'all 0.2s',
                                cursor: user.username !== currentUser?.username ? 'pointer' : 'default',
                            }}
                            onMouseEnter={(e) => {
                                if (user.username !== currentUser?.username) {
                                    e.currentTarget.style.background = 'rgba(67, 181, 129, 0.2)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = user.isTalking
                                    ? 'rgba(67, 181, 129, 0.15)'
                                    : 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            <img
                                src={getUserAvatar(user.username)}
                                alt={user.username}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getDeterministicAvatarFallback(user.username, 64);
                                }}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: user.isTalking
                                        ? '2px solid #43b581'
                                        : '2px solid rgba(255, 255, 255, 0.15)',
                                    boxShadow: user.isTalking
                                        ? '0 0 10px rgba(67, 181, 129, 0.5)'
                                        : 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{
                                    color: '#fff',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                }}>
                                    {user.username} {user.isLocal && '(Siz)'}
                                </div>
                                <div style={{
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    fontSize: '11px',
                                }}>
                                    {user.isMuted ? '🔇 Sessiz' : user.isTalking ? '🔊 Konuşuyor' : '🎤 Aktif'}
                                </div>
                            </div>
                            {user.isCameraOn && <span style={{ fontSize: '14px' }}>📹</span>}
                            {user.isScreenSharing && <span style={{ fontSize: '14px' }}>🖥️</span>}
                        </div>
                    ))}
                    {userCount > 3 && (
                        <div style={{
                            textAlign: 'center',
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '11px',
                            padding: '6px',
                        }}>
                            +{userCount - 3} daha...
                        </div>
                    )}
                </div>

                {/* MINI CONTROLS */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '8px',
                }}>
                    <MiniButton
                        icon={isMuted ? '🔇' : '🎤'}
                        active={!isMuted}
                        onClick={toggleMute}
                        title={isMuted ? 'Mikrofonu Aç' : 'Mikrofonu Kapat'}
                    />
                    <MiniButton
                        icon={isCameraOn ? '📹' : '📷'}
                        active={isCameraOn}
                        onClick={toggleCamera}
                        title={isCameraOn ? 'Kamerayı Kapat' : 'Kamerayı Aç'}
                    />
                    <MiniButton
                        icon="🖥️"
                        active={isScreenSharing}
                        onClick={toggleScreenShare}
                        title={isScreenSharing ? 'Paylaşımı Durdur' : 'Ekran Paylaş'}
                    />
                    <MiniButton
                        icon="❌"
                        danger
                        onClick={leaveVoice}
                        title="Ayrıl"
                    />
                </div>
            </div>
        </Draggable>
    );
});

MinimizedView.displayName = 'MinimizedView';

export default MinimizedView;

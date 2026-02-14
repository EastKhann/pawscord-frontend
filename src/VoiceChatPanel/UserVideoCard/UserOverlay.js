// frontend/src/VoiceChatPanel/UserVideoCard/UserOverlay.js
// 🎨 Bottom info overlay with talking indicator, connection quality, username, status icons

import React from 'react';

/**
 * UserOverlay Component
 * Renders the bottom gradient overlay with user info, talking waves,
 * connection quality indicator, and status icons.
 */
const UserOverlay = ({ user, isActive, connectionQuality }) => {
    return (
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 10,
        }}>
            {/* 🔥 Talking Indicator Waves */}
            {user.isTalking && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                }}>
                    <div style={{
                        width: '3px',
                        height: '12px',
                        background: '#43b581',
                        borderRadius: '2px',
                        animation: 'wave1 0.6s ease-in-out infinite',
                    }} />
                    <div style={{
                        width: '3px',
                        height: '16px',
                        background: '#43b581',
                        borderRadius: '2px',
                        animation: 'wave2 0.6s ease-in-out infinite 0.1s',
                    }} />
                    <div style={{
                        width: '3px',
                        height: '12px',
                        background: '#43b581',
                        borderRadius: '2px',
                        animation: 'wave3 0.6s ease-in-out infinite 0.2s',
                    }} />
                </div>
            )}

            {/* 🔥 Connection Quality Indicator */}
            {!user.isLocal && connectionQuality && (
                <div
                    title={`RTT: ${connectionQuality.rtt}ms, Packet Loss: ${connectionQuality.packetLoss}%`}
                    style={{
                        fontSize: '16px',
                        filter: connectionQuality.quality === 'excellent' ? 'none' :
                            connectionQuality.quality === 'good' ? 'hue-rotate(30deg)' :
                                'hue-rotate(90deg) saturate(2)',
                        opacity: 0.9,
                    }}
                >
                    {connectionQuality.quality === 'excellent' ? '📶' :
                        connectionQuality.quality === 'good' ? '📶' :
                            '⚠️'}
                </div>
            )}

            {/* Username */}
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    if (!user.isLocal) {
                        if (window.openUserProfile) {
                            window.openUserProfile(user.username);
                        } else {
                            window.location.hash = `#/profile/${user.username}`;
                        }
                    }
                }}
                style={{
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    flex: 1,
                    cursor: user.isLocal ? 'default' : 'pointer',
                    textDecoration: user.isLocal ? 'none' : 'underline',
                    textDecorationColor: 'rgba(255, 255, 255, 0.3)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                {user.username} {user.streamType === 'screen' && '🖥️ Ekran'}
            </span>

            {/* Status Icons */}
            <div style={{ display: 'flex', gap: '6px' }}>
                {user.isMuted && <span style={{ fontSize: '16px' }}>🔇</span>}
                {user.streamType === 'camera' && user.isCameraOn && <span style={{ fontSize: '16px' }}>📹</span>}
                {isActive && <span style={{ fontSize: '16px' }}>🔊</span>}
            </div>
        </div>
    );
};

export default UserOverlay;

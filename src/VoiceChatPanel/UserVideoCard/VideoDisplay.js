// frontend/src/VoiceChatPanel/UserVideoCard/VideoDisplay.js
// 📹 Video feed or avatar fallback display with talking animation

import React from 'react';
import { getDeterministicAvatarFallback } from '../avatarUtils';

/**
 * VideoDisplay Component
 * Shows live video stream when camera is on, or large avatar with
 * talking animation and status when camera is off.
 */
const VideoDisplay = ({ user, stream, videoRef, getUserAvatar, badge }) => {
    const hasVideo = stream && stream.active && stream.getVideoTracks().length > 0;

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {badge}
            {hasVideo ? (
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted={user.isLocal === true}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: user.streamType === 'screen' ? 'contain' : 'cover',
                        backgroundColor: user.streamType === 'screen' ? '#000' : '#1a1a1a',
                    }}
                />
            ) : (
                // 🔥 Camera off — large avatar with talking animation
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    background: 'linear-gradient(135deg, #36393f 0%, #2f3136 50%, #202225 100%)',
                    position: 'relative',
                }}>
                    {/* Avatar Container with Talking Animation */}
                    <div style={{
                        position: 'relative',
                        padding: '8px',
                        borderRadius: '50%',
                        background: user.isTalking
                            ? 'linear-gradient(135deg, #43b581, #3ca374)'
                            : 'transparent',
                        boxShadow: user.isTalking
                            ? '0 0 20px rgba(67, 181, 129, 0.6), 0 0 40px rgba(67, 181, 129, 0.3)'
                            : 'none',
                        transition: 'all 0.3s ease',
                        animation: user.isTalking ? 'talkingPulse 1s ease-in-out infinite' : 'none',
                    }}>
                        <img
                            src={getUserAvatar(user.username)}
                            alt={user.username}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getDeterministicAvatarFallback(user.username, 256);
                            }}
                            style={{
                                width: '140px',
                                height: '140px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '5px solid #40444b',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                                display: 'block',
                            }}
                            loading="lazy"
                        />
                    </div>
                    {/* Username */}
                    <div style={{
                        color: '#fff',
                        fontSize: '18px',
                        fontWeight: 700,
                        textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                        letterSpacing: '0.5px',
                    }}>
                        {user.username}
                    </div>
                    {/* Status */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 14px',
                        background: user.isMuted ? 'rgba(240, 71, 71, 0.2)' : 'rgba(67, 181, 129, 0.2)',
                        borderRadius: '16px',
                        border: user.isMuted ? '1px solid rgba(240, 71, 71, 0.4)' : '1px solid rgba(67, 181, 129, 0.4)',
                    }}>
                        <span style={{ fontSize: '16px' }}>{user.isMuted ? '🔇' : '🎤'}</span>
                        <span style={{
                            color: user.isMuted ? '#f04747' : '#43b581',
                            fontSize: '13px',
                            fontWeight: 600,
                        }}>
                            {user.isMuted ? 'Sessiz' : (user.isTalking ? 'Konuşuyor...' : 'Dinliyor')}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoDisplay;

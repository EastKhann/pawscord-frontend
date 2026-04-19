// frontend/src/VoiceChatPanel/UserVideoCard/VideoDisplay.js
// 📹 Video feed or avatar fallback display with talking animation

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDeterministicAvatarFallback } from '../avatarUtils';

// -- extracted inline style constants --

/**
 * VideoDisplay Component
 * Shows live video stream when camera is on, or large avatar with
 * talking animation and status when camera is off.
 */
const VideoDisplay = ({ user, stream, videoRef, getUserAvatar, badge }) => {
    const [error, setError] = useState(null);
    const hasVideo = stream && stream.active && stream.getVideoTracks().length > 0;

    return (
        <div aria-label="video display">
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
                >
                    <track kind="captions" />
                </video>
            ) : (
                // 🔥 Camera off — large avatar with talking animation
                <div>
                    {/* Avatar Container with Talking Animation */}
                    <div
                        style={{
                            position: 'relative',
                            padding: '8px',
                            borderRadius: '50%',
                            background: user.isTalking
                                ? 'linear-gradient(135deg, #23a559, #3ca374)'
                                : 'transparent',
                            boxShadow: user.isTalking
                                ? '0 0 20px rgba(67, 181, 129, 0.6), 0 0 40px rgba(67, 181, 129, 0.3)'
                                : 'none',
                            transition: 'all 0.3s ease',
                            animation: user.isTalking
                                ? 'talkingPulse 1s ease-in-out infinite'
                                : 'none',
                        }}
                    >
                        <img
                            src={getUserAvatar(user.username)}
                            alt={user.username}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getDeterministicAvatarFallback(user.username, 256);
                            }}
                            loading="lazy"
                        />
                    </div>
                    {/* Username */}
                    <div>{user.username}</div>
                    {/* Status */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '6px 14px',
                            background: user.isMuted
                                ? 'rgba(240, 71, 71, 0.2)'
                                : 'rgba(67, 181, 129, 0.2)',
                            borderRadius: '16px',
                            border: user.isMuted
                                ? '1px solid rgba(240, 71, 71, 0.4)'
                                : '1px solid rgba(67, 181, 129, 0.4)',
                        }}
                    >
                        <span>{user.isMuted ? '🔇' : '🎤'}</span>
                        <span
                            style={{
                                color: user.isMuted ? '#f23f42' : '#23a559',
                                fontSize: '13px',
                                fontWeight: 600,
                            }}
                        >
                            {user.isMuted ? 'Muted' : user.isTalking ? 'Talking...' : 'Listening'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

VideoDisplay.propTypes = {
    user: PropTypes.object,
    stream: PropTypes.object,
    videoRef: PropTypes.object,
    getUserAvatar: PropTypes.func,
    badge: PropTypes.object,
};
export default VideoDisplay;

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// frontend/src/VoiceChatPanel/UserVideoCard/UserOverlay.js
// 🎨 Bottom info overlay with talking indicator, connection quality, username, status icons

import React, { useState } from 'react';
import PropTypes from 'prop-types';
const _s = (o) => o;

// -- extracted inline style constants --
const _st1 = {
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
};
const _st2 = {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
};
const _st3 = {
    width: '3px',
    height: '12px',
    background: '#23a559',
    borderRadius: '2px',
    animation: 'wave1 0.6s ease-in-out infinite',
};
const _st4 = {
    width: '3px',
    height: '16px',
    background: '#23a559',
    borderRadius: '2px',
    animation: 'wave2 0.6s ease-in-out infinite 0.1s',
};
const _st5 = {
    width: '3px',
    height: '12px',
    background: '#23a559',
    borderRadius: '2px',
    animation: 'wave3 0.6s ease-in-out infinite 0.2s',
};
const _st6 = { display: 'flex', gap: '6px' };
const _st7 = { fontSize: '16px' };

/**
 * UserOverlay Component
 * Renders the bottom gradient overlay with user info, talking waves,
 * connection quality indicator, and status icons.
 */
const UserOverlay = ({ user, isActive, connectionQuality }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    return (
        <div aria-label="user overlay" style={_st1}>
            {/* 🔥 Talking Indicator Waves */}
            {user.isTalking && (
                <div style={_st2}>
                    <div style={_st3} />
                    <div style={_st4} />
                    <div style={_st5} />
                </div>
            )}

            {/* 🔥 Connection Quality Indicator */}
            {!user.isLocal && connectionQuality && (
                <div
                    title={`RTT: ${connectionQuality.rtt}ms, Packet Loss: ${connectionQuality.packetLoss}%`}
                    style={_s({
                        fontSize: '16px',
                        filter:
                            connectionQuality.quality === 'excellent'
                                ? 'none'
                                : connectionQuality.quality === 'good'
                                  ? 'hue-rotate(30deg)'
                                  : 'hue-rotate(90deg) saturate(2)',
                        opacity: 0.9,
                    })}
                >
                    {connectionQuality.quality === 'excellent'
                        ? '📶'
                        : connectionQuality.quality === 'good'
                          ? '📶'
                          : '⚠️'}
                </div>
            )}

            {/* Username */}
            <span
                role="button"
                tabIndex={user.isLocal ? -1 : 0}
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
                onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !user.isLocal) {
                        if (window.openUserProfile) window.openUserProfile(user.username);
                        else window.location.hash = `#/profile/${user.username}`;
                    }
                }}
                style={_s({
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
                })}
            >
                {user.username} {user.streamType === 'screen' && '🖥️ Ekran'}
            </span>

            {/* Status Icons */}
            <div style={_st6}>
                {user.isMuted && <span style={_st7}>🔇</span>}
                {user.streamType === 'camera' && user.isCameraOn && <span style={_st7}>📹</span>}
                {isActive && <span style={_st7}>🔊</span>}
            </div>
        </div>
    );
};

UserOverlay.propTypes = {
    user: PropTypes.object,
    isActive: PropTypes.bool,
    connectionQuality: PropTypes.func,
};
export default UserOverlay;

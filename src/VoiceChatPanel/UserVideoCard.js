/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
// frontend/src/VoiceChatPanel/UserVideoCard.js
// 📹 Voice chat video card - Orchestrator
// Sub-components: useVideoAudio, VideoDisplay, UserOverlay, HoverControls

import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useVideoAudio from './UserVideoCard/useVideoAudio';
import VideoDisplay from './UserVideoCard/VideoDisplay';
import UserOverlay from './UserVideoCard/UserOverlay';
import HoverControls from './UserVideoCard/HoverControls';

// -- extracted inline style constants --
const _st1 = { display: 'none' };
const _st2 = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: '16px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
    zIndex: 9999,
    animation: 'fadeIn 0.2s ease',
    pointerEvents: 'auto',
};
const _st3 = { color: '#fff', fontSize: '14px', fontWeight: 600 };
const _st4 = {
    background: 'rgba(255, 70, 70, 0.9)',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 20px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'background 0.2s',
};

/**
 * UserVideoCard Component
 * Displays a user's video/audio stream in voice chat with
 * avatar fallback, talking animation, connection quality indicator,
 * and hover controls (pin, expand, fullscreen, volume).
 */
const UserVideoCard = React.memo(
    ({
        user,
        stream,
        isActive,
        isPinned,
        onExpand,
        onPin,
        onContextMenu,
        compact = false,
        badge,
        connectionQuality,
        getUserAvatar,
    }) => {
        const { videoRef, audioRef } = useVideoAudio(stream, user);
        const [showFullControls, setShowFullControls] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);

        // 🔥 FIX: Native fullscreen overlay — exit button appears on mouse move
        const [isNativeFullscreen, setIsNativeFullscreen] = useState(false);
        const [showFsControls, setShowFsControls] = useState(false);
        const fsTimerRef = useRef(null);
        const cardRef = useRef(null);

        useEffect(() => {
            const handler = () => {
                // Check if THIS card is the fullscreen element
                const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
                setIsNativeFullscreen(
                    (fsEl && cardRef.current && cardRef.current.contains(fsEl)) ||
                        fsEl === cardRef.current
                );
                if (!fsEl) setShowFsControls(false);
            };
            document.addEventListener('fullscreenchange', handler);
            document.addEventListener('webkitfullscreenchange', handler);
            return () => {
                document.removeEventListener('fullscreenchange', handler);
                document.removeEventListener('webkitfullscreenchange', handler);
                clearTimeout(fsTimerRef.current);
            };
        }, []);

        const handleFsMouseMove = useCallback(() => {
            if (!isNativeFullscreen) return;
            setShowFsControls(true);
            clearTimeout(fsTimerRef.current);
            fsTimerRef.current = setTimeout(() => setShowFsControls(false), 3000);
        }, [isNativeFullscreen]);

        const handleRightClick = useCallback(
            (e) => {
                e.preventDefault();
                if (onContextMenu && user.username !== user.isLocal) {
                    onContextMenu({
                        user,
                        position: { x: e.clientX, y: e.clientY },
                    });
                }
            },
            [onContextMenu, user]
        );

        const handleClick = useCallback(
            (e) => {
                if (!user.isLocal && onContextMenu) {
                    onContextMenu({
                        user,
                        position: { x: e.clientX, y: e.clientY },
                    });
                }
            },
            [user, onContextMenu]
        );

        return (
            <div
                ref={cardRef}
                onContextMenu={handleRightClick}
                role="button"
                tabIndex={0}
                onClick={handleClick}
                onMouseEnter={() => setShowFullControls(true)}
                onMouseLeave={() => setShowFullControls(false)}
                onMouseMove={handleFsMouseMove}
                style={{
                    background: 'linear-gradient(135deg, #111214 0%, #0d0e10 100%)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    position: 'relative',
                    border: isActive
                        ? '3px solid #23a559'
                        : isPinned
                          ? '3px solid #5865f2'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive
                        ? '0 0 20px rgba(67, 181, 129, 0.5)'
                        : '0 4px 16px rgba(0, 0, 0, 0.3)',
                    transition: 'all 0.3s ease',
                    cursor: user.isLocal ? 'default' : 'pointer',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                {/* 🔥 FIX: Audio is played via body-appended hidden <audio> in useWebRTC.
                 This element is only for per-user volume control via data-username selector.
                 Set muted to avoid double audio playback — volume control via GainNode. */}
                {!user.isLocal && stream && (
                    <audio
                        ref={audioRef}
                        autoPlay
                        playsInline
                        muted
                        data-username={user.username}
                        style={_st1}
                    />
                )}

                <VideoDisplay
                    user={user}
                    stream={stream}
                    videoRef={videoRef}
                    getUserAvatar={getUserAvatar}
                    badge={badge}
                />

                <UserOverlay
                    user={user}
                    isActive={isActive}
                    connectionQuality={connectionQuality}
                />

                <HoverControls
                    user={user}
                    isPinned={isPinned}
                    onPin={onPin}
                    onExpand={onExpand}
                    showFullControls={showFullControls}
                    videoRef={videoRef}
                    cardRef={cardRef}
                />

                {/* 🔥 FIX: Native fullscreen exit overlay — appears on mouse move */}
                {isNativeFullscreen && showFsControls && (
                    <div style={_st2}>
                        <span style={_st3}>
                            👤 {user.username}{' '}
                            {user.streamType === 'screen' ? '🖥️ Screen Share' : ''}
                        </span>
                        <button
                            aria-label="Tam ekrandan çık"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (document.exitFullscreen) document.exitFullscreen();
                                else if (document.webkitExitFullscreen)
                                    document.webkitExitFullscreen();
                            }}
                            style={_st4}
                            onMouseOver={(e) =>
                                (e.target.style.background = 'rgba(255, 50, 50, 1)')
                            }
                            onMouseOut={(e) =>
                                (e.target.style.background = 'rgba(255, 70, 70, 0.9)')
                            }
                            onFocus={(e) => (e.target.style.background = 'rgba(255, 50, 50, 1)')}
                            onBlur={(e) => (e.target.style.background = 'rgba(255, 70, 70, 0.9)')}
                        >
                            ✕ Exit Fullscreen
                        </button>
                    </div>
                )}

                <style>{`
                div:hover .hover-actions {
                    opacity: 1;
                }
            `}</style>
            </div>
        );
    },
    (prevProps, nextProps) => {
        // 🔥 PERFORMANS: Only re-render when these props change
        // isTalking is excluded to avoid re-renders every 150ms
        return (
            prevProps.user.username === nextProps.user.username &&
            prevProps.stream === nextProps.stream &&
            prevProps.user.isCameraOn === nextProps.user.isCameraOn &&
            prevProps.user.isScreenSharing === nextProps.user.isScreenSharing &&
            prevProps.user.isMuted === nextProps.user.isMuted &&
            prevProps.user.volume === nextProps.user.volume &&
            prevProps.isActive === nextProps.isActive &&
            prevProps.isPinned === nextProps.isPinned &&
            prevProps.compact === nextProps.compact
        );
    }
);

UserVideoCard.propTypes = {
    user: PropTypes.object,
    stream: PropTypes.object,
    isActive: PropTypes.bool,
    isPinned: PropTypes.bool,
    onExpand: PropTypes.func,
    onPin: PropTypes.func,
    onContextMenu: PropTypes.func,
    compact: PropTypes.bool,
    badge: PropTypes.object,
    connectionQuality: PropTypes.func,
    getUserAvatar: PropTypes.func,
};
export default UserVideoCard;

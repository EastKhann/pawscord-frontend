// frontend/src/VoiceChatPanel/UserVideoCard.js
// 📹 Voice chat video card - Orchestrator
// Sub-components: useVideoAudio, VideoDisplay, UserOverlay, HoverControls

import React, { useState, useCallback } from 'react';
import useVideoAudio from './UserVideoCard/useVideoAudio';
import VideoDisplay from './UserVideoCard/VideoDisplay';
import UserOverlay from './UserVideoCard/UserOverlay';
import HoverControls from './UserVideoCard/HoverControls';

/**
 * UserVideoCard Component
 * Displays a user's video/audio stream in voice chat with
 * avatar fallback, talking animation, connection quality indicator,
 * and hover controls (pin, expand, fullscreen, volume).
 */
const UserVideoCard = React.memo(({
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
    getUserAvatar
}) => {
    const { videoRef, audioRef } = useVideoAudio(stream, user);
    const [showFullControls, setShowFullControls] = useState(false);

    const handleRightClick = useCallback((e) => {
        e.preventDefault();
        if (onContextMenu && user.username !== user.isLocal) {
            onContextMenu({
                user,
                position: { x: e.clientX, y: e.clientY }
            });
        }
    }, [onContextMenu, user]);

    const handleClick = useCallback((e) => {
        if (!user.isLocal && onContextMenu) {
            onContextMenu({
                user,
                position: { x: e.clientX, y: e.clientY }
            });
        }
    }, [user, onContextMenu]);

    return (
        <div
            onContextMenu={handleRightClick}
            onClick={handleClick}
            onMouseEnter={() => setShowFullControls(true)}
            onMouseLeave={() => setShowFullControls(false)}
            style={{
                background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: isActive ? '3px solid #43b581' : isPinned ? '3px solid #5865f2' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isActive ? '0 0 20px rgba(67, 181, 129, 0.5)' : '0 4px 16px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
                cursor: user.isLocal ? 'default' : 'pointer',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
            {/* Hidden audio element for remote user sound output */}
            {!user.isLocal && stream && (
                <audio
                    ref={audioRef}
                    autoPlay
                    playsInline
                    data-username={user.username}
                    style={{ display: 'none' }}
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
            />

            <style>{`
                div:hover .hover-actions {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
}, (prevProps, nextProps) => {
    // 🔥 PERFORMANS: Only re-render when these props change
    // isTalking is excluded to avoid re-renders every 150ms
    return (
        prevProps.user.username === nextProps.user.username &&
        prevProps.stream === nextProps.stream &&
        prevProps.user.isCameraOn === nextProps.user.isCameraOn &&
        prevProps.user.isScreenSharing === nextProps.user.isScreenSharing &&
        prevProps.user.isMuted === nextProps.user.isMuted &&
        prevProps.isActive === nextProps.isActive &&
        prevProps.isPinned === nextProps.isPinned &&
        prevProps.compact === nextProps.compact
    );
});

export default UserVideoCard;

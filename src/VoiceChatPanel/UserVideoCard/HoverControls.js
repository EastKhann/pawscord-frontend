// frontend/src/VoiceChatPanel/UserVideoCard/HoverControls.js
// 🎮 Hover action buttons (pin, expand, fullscreen) and volume slider

import React from 'react';
import ActionButton from '../ActionButton';

/**
 * HoverControls Component
 * Renders action buttons and volume slider that appear on hover.
 * Supports pin, expand, fullscreen, and 0-200% volume control.
 */
const HoverControls = ({ user, isPinned, onPin, onExpand, showFullControls, videoRef }) => {
    return (
        <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            gap: '6px',
            opacity: showFullControls ? 1 : 0,
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            transform: showFullControls ? 'translateY(0)' : 'translateY(-6px)',
            zIndex: 20,
            pointerEvents: showFullControls ? 'auto' : 'none',
        }}>
            <ActionButton
                icon={isPinned ? '📌' : '📍'}
                onClick={(e) => {
                    e.stopPropagation();
                    onPin();
                }}
                title={isPinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}
                bgColor="rgba(88, 101, 242, 0.9)"
            />
            <ActionButton
                icon="⛶"
                onClick={(e) => {
                    e.stopPropagation();
                    onExpand();
                }}
                title="Panelde Genişlet"
                bgColor="rgba(67, 181, 129, 0.9)"
            />
            <ActionButton
                icon="🖥️"
                onClick={(e) => {
                    e.stopPropagation();
                    // 🔥 Fullscreen mode
                    const videoElement = videoRef.current;
                    if (videoElement) {
                        const parentDiv = videoElement.parentElement?.parentElement;
                        const element = parentDiv || videoElement;
                        if (element.requestFullscreen) {
                            element.requestFullscreen();
                        } else if (element.webkitRequestFullscreen) {
                            element.webkitRequestFullscreen();
                        } else if (element.mozRequestFullScreen) {
                            element.mozRequestFullScreen();
                        } else if (element.msRequestFullscreen) {
                            element.msRequestFullscreen();
                        }
                    }
                }}
                title="Tam Ekran İzle"
                bgColor="rgba(250, 166, 26, 0.9)"
            />

            {/* 🔥 Volume Slider (only for remote users, visible on hover) */}
            {!user.isLocal && showFullControls && (
                <div style={{
                    background: 'rgba(0, 0, 0, 0.9)',
                    borderRadius: '10px',
                    padding: '6px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    minWidth: '100px',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    animation: 'fadeIn 0.2s ease',
                }}>
                    <span style={{ fontSize: '12px' }}>
                        {(user.volume || 100) === 0 ? '🔇' : (user.volume || 100) > 100 ? '🔊' : '🔉'}
                    </span>
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={user.volume || 100}
                        onChange={(e) => {
                            e.stopPropagation();
                            if (user.onVolumeChange) {
                                user.onVolumeChange(parseInt(e.target.value));
                            }
                        }}
                        style={{
                            flex: 1,
                            cursor: 'pointer',
                            height: '4px',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span style={{ fontSize: '10px', color: '#fff', minWidth: '30px', fontWeight: 600 }}>
                        {user.volume || 100}%
                    </span>
                </div>
            )}
        </div>
    );
};

export default HoverControls;

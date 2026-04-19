// frontend/src/VoiceChatPanel/UserVideoCard/HoverControls.js
// 🎮 Hover action buttons (pin, expand, fullscreen) and volume slider

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ActionButton from '../ActionButton';
const _s = (o) => o;

// -- extracted inline style constants --
const _st1 = {
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
};
const _st2 = { fontSize: '12px' };
const _st3 = {
    flex: 1,
    cursor: 'pointer',
    height: '4px',
};
const _st4 = { fontSize: '10px', color: '#fff', minWidth: '30px', fontWeight: 600 };

/**
 * HoverControls Component
 * Renders action buttons and volume slider that appear on hover.
 * Supports pin, expand, fullscreen, and 0-200% volume control.
 */
const HoverControls = ({
    user,
    isPinned,
    onPin,
    onExpand,
    showFullControls,
    videoRef,
    cardRef,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    return (
        <div
            aria-label="hover controls"
            style={_s({
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
            })}
        >
            <ActionButton
                icon={isPinned ? '📌' : '📍'}
                onClick={(e) => {
                    e.stopPropagation();
                    onPin();
                }}
                title={isPinned ? 'Unpin' : 'Sabitle'}
                bgColor="rgba(88, 101, 242, 0.9)"
            />
            <ActionButton
                icon="⛶"
                onClick={(e) => {
                    e.stopPropagation();
                    onExpand();
                }}
                title="Büyüt / Küçült"
                bgColor="rgba(67, 181, 129, 0.9)"
            />
            <ActionButton
                icon="🖥️"
                onClick={(e) => {
                    e.stopPropagation();
                    // 🔥 FIX: Use cardRef for fullscreen (the UserVideoCard root div)
                    // so the fullscreen overlay with exit button is visible.
                    const element =
                        cardRef?.current ||
                        videoRef.current?.parentElement?.parentElement ||
                        videoRef.current;
                    if (element) {
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
                title="Tam ekran izle"
                bgColor="rgba(250, 166, 26, 0.9)"
            />

            {/* 🔥 Volume Slider (only for remote users, visible on hover) */}
            {!user.isLocal && showFullControls && (
                <div style={_st1}>
                    <span style={_st2}>
                        {(user.volume || 100) === 0
                            ? '🔇'
                            : (user.volume || 100) > 100
                              ? '🔊'
                              : '🔉'}
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
                        style={_st3}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <span style={_st4}>{user.volume || 100}%</span>
                </div>
            )}
        </div>
    );
};

HoverControls.propTypes = {
    user: PropTypes.object,
    isPinned: PropTypes.bool,
    onPin: PropTypes.func,
    onExpand: PropTypes.func,
    showFullControls: PropTypes.bool,
    videoRef: PropTypes.object,
    cardRef: PropTypes.object,
};
export default HoverControls;

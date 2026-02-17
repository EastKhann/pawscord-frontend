// frontend/src/VoiceChatPanel/StatusBadges.js
// 🎨 Status badge components for voice chat header

import React from 'react';

const badgeBase = {
    padding: '4px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
};

/**
 * StatusBadges — renders recording, screen share, PTT, reconnecting badges
 */
export const StatusBadges = React.memo(({
    isRecording, recordingDuration,
    isScreenSharing, screenShareQuality, screenShareFPS, includeSystemAudio,
    isPTTMode, pttKey, isPTTActive,
    isReconnecting
}) => {
    const badges = [];

    if (isRecording) {
        badges.push(
            <span key="rec" style={{
                ...badgeBase,
                background: 'rgba(237,66,69,0.2)',
                color: '#ed4245',
                border: '1px solid rgba(237,66,69,0.4)',
            }}>
                ⏺️ Kayıtta ({Math.floor(recordingDuration / 60).toString().padStart(2, '0')}:{Math.floor(recordingDuration % 60).toString().padStart(2, '0')})
            </span>
        );
    }

    if (isScreenSharing) {
        badges.push(
            <span key="ss" style={{
                ...badgeBase,
                background: 'rgba(88,101,242,0.15)',
                color: '#8893ff',
                border: '1px solid rgba(88,101,242,0.35)',
            }}>
                🖥️ Paylaşılıyor {screenShareQuality} • {screenShareFPS}fps{includeSystemAudio ? ' • 🔊 Sistem' : ''}
            </span>
        );
    }

    if (isPTTMode) {
        badges.push(
            <span key="ptt" style={{
                ...badgeBase,
                background: 'rgba(250,166,26,0.18)',
                color: '#faa61a',
                border: '1px solid rgba(250,166,26,0.35)',
            }}>
                🎙️ PTT ({pttKey}) {isPTTActive ? '• Aktif' : ''}
            </span>
        );
    }

    if (isReconnecting) {
        badges.push(
            <span key="reconnect" style={{
                ...badgeBase,
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
            }}>
                🔄 Yeniden bağlanıyor
            </span>
        );
    }

    return badges.length
        ? <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>{badges}</div>
        : null;
});

StatusBadges.displayName = 'StatusBadges';

/**
 * StreamBadge — renders screen share or camera badge overlay on a video card
 */
export const StreamBadge = React.memo(({ user }) => {
    if (user.streamType === 'screen') {
        return (
            <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: '0 4px 16px rgba(88, 101, 242, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                animation: 'badgePulse 2s infinite',
            }}>
                🖥️ <span style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}>{user.username} - Ekran Paylaşıyor</span>
            </div>
        );
    }

    if (user.streamType === 'camera') {
        return (
            <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(67, 181, 129, 0.85)',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
            }}>
                📹 Kamera
            </div>
        );
    }

    return null;
});

StreamBadge.displayName = 'StreamBadge';

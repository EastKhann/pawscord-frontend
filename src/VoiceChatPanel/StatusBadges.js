// frontend/src/VoiceChatPanel/StatusBadges.js
// 🎨 Status badge components for voice chat header

import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const badgeBase = {
    padding: '4px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
};

// -- dynamic style helpers (pass 2) --
const _st1100 = {
    ...badgeBase,
    background: 'rgba(237,66,69,0.2)',
    color: '#f23f42',
    border: '1px solid rgba(237,66,69,0.4)',
};
const _st1101 = {
    ...badgeBase,
    background: 'rgba(88,101,242,0.15)',
    color: '#8893ff',
    border: '1px solid rgba(88,101,242,0.35)',
};
const _st1102 = {
    ...badgeBase,
    background: 'rgba(250,166,26,0.18)',
    color: '#f0b232',
    border: '1px solid rgba(250,166,26,0.35)',
};
const _st1103 = {
    ...badgeBase,
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.2)',
};

// -- extracted inline style constants --
const _st1 = { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' };
const _st2 = {
    position: 'absolute',
    top: '12px',
    left: '12px',
    background: 'linear-gradient(135deg, #5865f2 0%, #5865f2 100%)',
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
};
const _st3 = { textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' };
const _st4 = {
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
};

/**
 * StatusBadges — renders recording, screen share, PTT, reconnecting badges
 */
export const StatusBadges = React.memo(
    ({
        isRecording,
        recordingDuration,
        isScreenSharing,
        screenShareQuality,
        screenShareFPS,
        includeSystemAudio,
        isPTTMode,
        pttKey,
        isPTTActive,
        isReconnecting,
    }) => {
        const badges = [];

        if (isRecording) {
            badges.push(
                <span key="rec" style={_st1100}>
                    ⏺️ Recording (
                    {Math.floor(recordingDuration / 60)
                        .toString()
                        .padStart(2, '0')}
                    :
                    {Math.floor(recordingDuration % 60)
                        .toString()
                        .padStart(2, '0')}
                    )
                </span>
            );
        }

        if (isScreenSharing) {
            badges.push(
                <span key="ss" style={_st1101}>
                    🖥️ Sharing {screenShareQuality} • {screenShareFPS}fps
                    {includeSystemAudio ? ' • 🔊 System Audio' : ''}
                </span>
            );
        }

        if (isPTTMode) {
            badges.push(
                <span key="ptt" style={_st1102}>
                    🎙️ PTT ({pttKey}) {isPTTActive ? '• Active' : ''}
                </span>
            );
        }

        if (isReconnecting) {
            badges.push(
                <span key="reconnect" style={_st1103}>
                    🔄 Reconnecting
                </span>
            );
        }

        return badges.length ? <div style={_st1}>{badges}</div> : null;
    }
);

StatusBadges.displayName = 'StatusBadges';

/**
 * StreamBadge — renders screen share or camera badge overlay on a video card
 */
export const StreamBadge = React.memo(({ user }) => {
    const { t } = useTranslation();
    if (user.streamType === 'screen') {
        return (
            <div aria-label={t('aria.streamBadge', 'Screen Share')} style={_st2}>
                🖥️ <span style={_st3}>{user.username} - Screen Sharing</span>
            </div>
        );
    }

    if (user.streamType === 'camera') {
        return <div style={_st4}>📹 Kamera</div>;
    }

    return null;
});

StreamBadge.displayName = 'StreamBadge';

StatusBadges.propTypes = {};

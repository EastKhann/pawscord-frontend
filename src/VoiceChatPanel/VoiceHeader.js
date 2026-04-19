// frontend/src/VoiceChatPanel/VoiceHeader.js
// 🎨 Voice chat header bar with status badges and network quality

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { StatusBadges } from './StatusBadges';

// -- extracted inline style constants --
const _st1 = {
    background: 'linear-gradient(180deg, rgba(30, 31, 34, 0.98) 0%, rgba(26, 27, 30, 0.95) 100%)',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    flexShrink: 0,
};
const _st2 = {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    background: '#23a559',
    boxShadow: '0 0 8px rgba(35, 165, 89, 0.6)',
    animation: 'pulse 2s infinite',
    flexShrink: 0,
};
const _st3 = {
    color: '#fff',
    margin: 0,
    fontSize: '16px',
    fontWeight: 600,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    letterSpacing: '0.2px',
};
const _st4 = {
    background: 'rgba(240, 71, 71, 0.2)',
    border: '1px solid #f23f42',
    borderRadius: '6px',
    padding: '4px 8px',
    fontSize: '12px',
    color: '#f23f42',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
};
const _st5 = {
    background: 'rgba(67, 181, 129, 0.2)',
    border: '1px solid #23a559',
    borderRadius: '6px',
    padding: '4px 8px',
    fontSize: '12px',
    color: '#23a559',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
};
const _st6 = {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
};
const _st7 = {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '10px',
    padding: '8px 16px',
    color: 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    transition: 'all 0.15s ease',
};

const VoiceHeader = React.memo(
    ({
        roomName,
        userCount,
        onToggleMinimize,
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
        networkQuality,
        networkType,
    }) => {
        const { t } = useTranslation();
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
        return (
            <div style={_st1}>
                <div style={_st2} />
                <h2 style={_st3}>
                    🎙️ {roomName}
                    <StatusBadges
                        isRecording={isRecording}
                        recordingDuration={recordingDuration}
                        isScreenSharing={isScreenSharing}
                        screenShareQuality={screenShareQuality}
                        screenShareFPS={screenShareFPS}
                        includeSystemAudio={includeSystemAudio}
                        isPTTMode={isPTTMode}
                        pttKey={pttKey}
                        isPTTActive={isPTTActive}
                        isReconnecting={isReconnecting}
                    />
                    {/* Network Quality Badge */}
                    {networkQuality === 'poor' && (
                        <div style={_st4}>⚠️ {t('voice.weakConnection', 'Weak Connection')}</div>
                    )}
                    {networkQuality === 'excellent' && networkType !== 'unknown' && (
                        <div style={_st5}>📶 {networkType.toUpperCase()}</div>
                    )}
                </h2>
                <div style={_st6}>
                    👥 {userCount} {t('common.members')}
                </div>
                <button
                    onClick={onToggleMinimize}
                    style={_st7}
                    aria-label={t('voice.minimize', 'Minimize')}
                >
                    ⬇️ {t('voice.minimize', 'Minimize')}
                </button>
            </div>
        );
    }
);

VoiceHeader.displayName = 'VoiceHeader';

VoiceHeader.propTypes = {
    roomName: PropTypes.string,
    userCount: PropTypes.number,
    onToggleMinimize: PropTypes.func,
    isRecording: PropTypes.bool,
    recordingDuration: PropTypes.bool,
    isScreenSharing: PropTypes.bool,
    screenShareQuality: PropTypes.object,
    screenShareFPS: PropTypes.array,
    includeSystemAudio: PropTypes.object,
    isPTTMode: PropTypes.bool,
    pttKey: PropTypes.string,
    isPTTActive: PropTypes.bool,
    isReconnecting: PropTypes.bool,
    networkQuality: PropTypes.object,
    networkType: PropTypes.object,
};
export default VoiceHeader;

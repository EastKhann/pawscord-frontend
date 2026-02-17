// frontend/src/VoiceChatPanel/VoiceHeader.js
// 🎨 Voice chat header bar with status badges and network quality

import React from 'react';
import { StatusBadges } from './StatusBadges';

const VoiceHeader = React.memo(({
    roomName, userCount, onToggleMinimize,
    isRecording, recordingDuration,
    isScreenSharing, screenShareQuality, screenShareFPS, includeSystemAudio,
    isPTTMode, pttKey, isPTTActive, isReconnecting,
    networkQuality, networkType,
}) => (
    <div style={{
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
        <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#43b581',
            boxShadow: '0 0 12px #43b581',
            animation: 'pulse 2s infinite',
        }} />
        <h2 style={{
            color: '#fff',
            margin: 0,
            fontSize: '17px',
            fontWeight: 700,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            letterSpacing: '0.3px',
        }}>
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
                <div style={{
                    background: 'rgba(240, 71, 71, 0.2)',
                    border: '1px solid #f04747',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    color: '#f04747',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    ⚠️ Zayıf Bağlantı
                </div>
            )}
            {networkQuality === 'excellent' && networkType !== 'unknown' && (
                <div style={{
                    background: 'rgba(67, 181, 129, 0.2)',
                    border: '1px solid #43b581',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    color: '#43b581',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                }}>
                    📶 {networkType.toUpperCase()}
                </div>
            )}
        </h2>
        <div style={{
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '14px',
        }}>
            👥 {userCount} kişi
        </div>
        <button
            onClick={onToggleMinimize}
            style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '13px',
            }}
        >
            ⬇️ Küçült
        </button>
    </div>
));

VoiceHeader.displayName = 'VoiceHeader';

export default VoiceHeader;

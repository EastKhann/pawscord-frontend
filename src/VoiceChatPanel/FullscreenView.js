// frontend/src/VoiceChatPanel/FullscreenView.js
// 🎨 Fullscreen expanded-user view for voice chat

import React from 'react';
import VideoFeed from './VideoFeed';
import ControlBar from './ControlBar';

const FullscreenView = React.memo(({
    expandedUser,
    allStreams,
    onBack,
    // ControlBar props
    isMuted,
    isDeafened,
    isCameraOn,
    isScreenSharing,
    isSpatialAudioEnabled,
    isRecording,
    recordingDuration,
    toggleMute,
    toggleDeafened,
    toggleCamera,
    toggleScreenShare,
    toggleSpatialAudio,
    startRecording,
    stopRecording,
    leaveVoice,
}) => {
    const streamKey = expandedUser.streamType === 'screen'
        ? `${expandedUser.username}_screen`
        : `${expandedUser.username}_camera`;
    const expandedStream = allStreams[streamKey] || allStreams[expandedUser.username];

    return (
        <div style={{
            width: '100%',
            height: '100%',
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
            {/* FULLSCREEN HEADER */}
            <div style={{
                background: 'rgba(0, 0, 0, 0.8)',
                padding: '16px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
            }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '14px',
                    }}
                >
                    ⬅️ Geri
                </button>
                <h3 style={{ color: '#fff', margin: 0, flex: 1 }}>
                    👤 {expandedUser.username} {expandedUser.streamType === 'screen' && '🖥️ Ekran Paylaşımı'}
                </h3>
            </div>

            {/* FULLSCREEN VIDEO */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#1a1a1a',
            }}>
                <VideoFeed
                    user={expandedUser}
                    stream={expandedStream}
                    fullscreen
                />
            </div>

            {/* FULLSCREEN CONTROLS */}
            <ControlBar
                isMuted={isMuted}
                isDeafened={isDeafened}
                isCameraOn={isCameraOn}
                isScreenSharing={isScreenSharing}
                isSpatialAudio={isSpatialAudioEnabled}
                isRecording={isRecording}
                recordingDuration={recordingDuration}
                onToggleMute={toggleMute}
                onToggleDeafened={toggleDeafened}
                onToggleCamera={toggleCamera}
                onToggleScreenShare={toggleScreenShare}
                onToggleSpatialAudio={toggleSpatialAudio}
                onStartRecording={startRecording}
                onStopRecording={stopRecording}
                onLeave={leaveVoice}
            />
        </div>
    );
});

FullscreenView.displayName = 'FullscreenView';

export default FullscreenView;

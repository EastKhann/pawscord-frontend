// frontend/src/VoiceChatPanel/FullscreenView.js
// 🎨 Fullscreen expanded-user view for voice chat

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import VideoFeed from './VideoFeed';
import ControlBar from './ControlBar';

// -- extracted inline style constants --
const _st1 = {
    width: '100%',
    height: '100%',
    background: '#000',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
};
const _st2 = {
    background: 'rgba(0, 0, 0, 0.8)',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
};
const _st3 = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '14px',
};
const _st4 = { color: '#fff', margin: 0, flex: 1 };
const _st5 = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#1a1a1a',
};

const FullscreenView = React.memo(
    ({
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
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
        const streamKey =
            expandedUser.streamType === 'screen'
                ? `${expandedUser.username}_screen`
                : `${expandedUser.username}_camera`;
        const expandedStream = allStreams[streamKey] || allStreams[expandedUser.username];

        return (
            <div style={_st1}>
                {/* FULLSCREEN HEADER */}
                <div style={_st2}>
                    <button aria-label="on Back" onClick={onBack} style={_st3}>
                        ⬅️ Geri
                    </button>
                    <h3 style={_st4}>
                        👤 {expandedUser.username}{' '}
                        {expandedUser.streamType === 'screen' && '🖥️ Screen Share'}
                    </h3>
                </div>

                {/* FULLSCREEN VIDEO */}
                <div style={_st5}>
                    <VideoFeed user={expandedUser} stream={expandedStream} fullscreen />
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
    }
);

FullscreenView.displayName = 'FullscreenView';

FullscreenView.propTypes = {
    expandedUser: PropTypes.bool,
    allStreams: PropTypes.array,
    onBack: PropTypes.func,
    isDeafened: PropTypes.bool,
    isCameraOn: PropTypes.bool,
    isScreenSharing: PropTypes.bool,
    isSpatialAudioEnabled: PropTypes.bool,
    isRecording: PropTypes.bool,
    recordingDuration: PropTypes.bool,
    toggleMute: PropTypes.func,
    toggleDeafened: PropTypes.func,
    toggleCamera: PropTypes.func,
    toggleScreenShare: PropTypes.func,
    toggleSpatialAudio: PropTypes.func,
    startRecording: PropTypes.object,
    stopRecording: PropTypes.object,
    leaveVoice: PropTypes.object,
};
export default FullscreenView;

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import VoiceControlBtn from './VoiceControlBtn';

// -- extracted inline style constants --

const ControlBar = ({
    isMuted,
    isDeafened,
    isCameraOn,
    isScreenSharing,
    isSpatialAudio,
    isRecording,
    recordingDuration,
    onToggleMute,
    onToggleDeafened,
    onToggleCamera,
    onToggleScreenShare,
    onToggleSpatialAudio,
    onStartRecording,
    onStopRecording,
    onDownloadRecording,
    onLeave,
    onSettings,
}) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const formatDuration = (sec) => {
        const m = Math.floor(sec / 60)
            .toString()
            .padStart(2, '0');
        const s = Math.floor(sec % 60)
            .toString()
            .padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div
            aria-label="control bar"
            style={{
                background:
                    'linear-gradient(180deg, rgba(30, 31, 34, 0.95) 0%, rgba(17, 18, 20, 1) 100%)',
                padding: '14px 28px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                boxShadow: '0 -2px 24px rgba(0, 0, 0, 0.5)',
                flexShrink: 0,
                minHeight: '76px',
                position: 'relative',
                zIndex: 100,
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            {/* Sol Grup: Ses Kontrolleri */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <VoiceControlBtn
                    icon={isMuted ? '🔇' : '🎤'}
                    active={!isMuted}
                    danger={isMuted}
                    onClick={onToggleMute}
                    title={isMuted ? t('voice.unmute') : t('voice.mute')}
                />
                <VoiceControlBtn
                    icon={isDeafened ? '🔈' : '🎧'}
                    active={!isDeafened}
                    danger={isDeafened}
                    onClick={onToggleDeafened}
                    title={isDeafened ? t('voice.undeafen') : t('voice.deafen')}
                />
            </div>

            {/* Separator */}
            <div
                style={{
                    width: '1px',
                    height: '32px',
                    background: 'rgba(255,255,255,0.08)',
                    margin: '0 6px',
                }}
            />

            {/* Orta Grup: Video/Ekran Kontrolleri */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <VoiceControlBtn
                    icon={isCameraOn ? '📹' : '📷'}
                    active={isCameraOn}
                    onClick={onToggleCamera}
                    title={isCameraOn ? t('voice.stopCamera') : t('voice.camera')}
                />
                <VoiceControlBtn
                    icon="🖥️"
                    active={isScreenSharing}
                    special={isScreenSharing}
                    onClick={onToggleScreenShare}
                    title={isScreenSharing ? t('voice.stopScreenShare') : t('voice.screenShare')}
                />
                {onToggleSpatialAudio && (
                    <VoiceControlBtn
                        icon="🔊"
                        active={isSpatialAudio}
                        onClick={onToggleSpatialAudio}
                        title={
                            isSpatialAudio
                                ? `${t('voice.spatialAudio')} (On)`
                                : `${t('voice.spatialAudio')} (Off)`
                        }
                        small
                    />
                )}
            </div>

            {/* Separator */}
            <div
                style={{
                    width: '1px',
                    height: '32px',
                    background: 'rgba(255,255,255,0.08)',
                    margin: '0 6px',
                }}
            />

            {/* Right Group: Record & Settings */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {onStartRecording && onStopRecording && (
                    <VoiceControlBtn
                        icon={isRecording ? '⏹️' : '⏺️'}
                        active={isRecording}
                        danger={isRecording}
                        onClick={isRecording ? onStopRecording : onStartRecording}
                        title={
                            isRecording
                                ? `${t('voice.stopRecording')} (${formatDuration(recordingDuration)})`
                                : t('voice.startRecording')
                        }
                        label={isRecording ? formatDuration(recordingDuration) : null}
                    />
                )}
                {onSettings && (
                    <VoiceControlBtn
                        icon="⚙️"
                        onClick={onSettings}
                        title={t('voice.openSettings')}
                        subtle
                    />
                )}
            </div>

            {/* Separator */}
            <div
                style={{
                    width: '1px',
                    height: '32px',
                    background: 'rgba(255,255,255,0.08)',
                    margin: '0 6px',
                }}
            />

            {/* Leave Butonu */}
            <VoiceControlBtn icon="📞" danger onClick={onLeave} title={t('voice.leave')} isLeave />
        </div>
    );
};

ControlBar.propTypes = {
    isMuted: PropTypes.bool,
    isDeafened: PropTypes.bool,
    isCameraOn: PropTypes.bool,
    isScreenSharing: PropTypes.bool,
    isSpatialAudio: PropTypes.bool,
    isRecording: PropTypes.bool,
    recordingDuration: PropTypes.bool,
    onToggleMute: PropTypes.func,
    onToggleDeafened: PropTypes.func,
    onToggleCamera: PropTypes.func,
    onToggleScreenShare: PropTypes.func,
    onToggleSpatialAudio: PropTypes.func,
    onStartRecording: PropTypes.func,
    onStopRecording: PropTypes.func,
    onDownloadRecording: PropTypes.func,
    onLeave: PropTypes.func,
    onSettings: PropTypes.func,
};
export default ControlBar;

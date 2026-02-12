import VoiceControlBtn from './VoiceControlBtn';

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
    onSettings
}) => {
    const formatDuration = (sec) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div style={{
            background: 'linear-gradient(180deg, rgba(32, 34, 37, 0.98) 0%, rgba(24, 25, 28, 1) 100%)',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.4)',
            flexShrink: 0, // 🔥 FIX: Asla küçülme - her zaman görünsün
            minHeight: '70px', // 🔥 FIX: Minimum yükseklik garantisi
            position: 'relative',
            zIndex: 100,
        }}>
            {/* Sol Grup: Ses Kontrolleri */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <VoiceControlBtn
                    icon={isMuted ? '🔇' : '🎤'}
                    active={!isMuted}
                    danger={isMuted}
                    onClick={onToggleMute}
                    title={isMuted ? 'Mikrofonu Aç' : 'Mikrofonu Kapat'}
                />
                <VoiceControlBtn
                    icon={isDeafened ? '🔈' : '🎧'}
                    active={!isDeafened}
                    danger={isDeafened}
                    onClick={onToggleDeafened}
                    title={isDeafened ? 'Kulaklığı Aç' : 'Kulaklığı Kapat'}
                />
            </div>

            {/* Orta Grup: Video/Ekran Kontrolleri */}
            <div style={{
                display: 'flex',
                gap: '8px',
                padding: '0 16px',
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
                borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
                <VoiceControlBtn
                    icon={isCameraOn ? '📹' : '📷'}
                    active={isCameraOn}
                    onClick={onToggleCamera}
                    title={isCameraOn ? 'Kamerayı Kapat' : 'Kamerayı Aç'}
                />
                <VoiceControlBtn
                    icon="🖥️"
                    active={isScreenSharing}
                    special={isScreenSharing}
                    onClick={onToggleScreenShare}
                    title={isScreenSharing ? 'Paylaşımı Durdur' : 'Ekran Paylaş'}
                />
                {onToggleSpatialAudio && (
                    <VoiceControlBtn
                        icon="🔊"
                        active={isSpatialAudio}
                        onClick={onToggleSpatialAudio}
                        title={isSpatialAudio ? '3D Ses (Açık)' : '3D Ses (Kapalı)'}
                        small
                    />
                )}
            </div>

            {/* Sağ Grup: Kayıt & Ayarlar */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {onStartRecording && onStopRecording && (
                    <VoiceControlBtn
                        icon={isRecording ? '⏹️' : '⏺️'}
                        active={isRecording}
                        danger={isRecording}
                        onClick={isRecording ? onStopRecording : onStartRecording}
                        title={isRecording ? `Kaydı Durdur (${formatDuration(recordingDuration)})` : 'Kayıt Başlat'}
                        label={isRecording ? formatDuration(recordingDuration) : null}
                    />
                )}
                {onSettings && (
                    <VoiceControlBtn
                        icon="⚙️"
                        onClick={onSettings}
                        title="Ayarlar"
                        subtle
                    />
                )}
            </div>

            {/* Ayrıl Butonu - Vurgulu */}
            <VoiceControlBtn
                icon="📞"
                danger
                onClick={onLeave}
                title="Ayrıl"
                isLeave
            />
        </div>
    );
};

export default ControlBar;

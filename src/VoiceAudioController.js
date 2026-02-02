import React, { useEffect, useRef, useState, useCallback } from 'react';
import logger from './utils/logger';
import toast from './utils/toast';

const VoiceAudioController = ({ remoteStreams, remoteVolumes, mutedUsers }) => {
    const [globalAudioEnabled, setGlobalAudioEnabled] = useState(() => {
        const saved = localStorage.getItem('pawscord_audio_enabled');
        return saved === 'true';
    });

    const enableAudioContext = useCallback(() => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();

            if (audioContext.state === 'suspended') {
                audioContext.resume().then(() => {
                    logger.audio('AudioContext resumed successfully');
                });
            }

            setGlobalAudioEnabled(true);
            localStorage.setItem('pawscord_audio_enabled', 'true');
            logger.audio('Global audio enabled');
        } catch (err) {
            logger.error('Failed to enable AudioContext:', err);
            toast.error('❌ Ses sistemi başlatılamadı: ' + err.message);
        }
    }, []);

    useEffect(() => {
        logger.audio("VoiceAudioController MOUNTED! RemoteStreams:", Object.keys(remoteStreams));
        return () => logger.audio("VoiceAudioController UNMOUNTED!");
    }, []);

    return (
        <>
            {/* Ses başlatma butonu - sadece ilk kez gerekli */}
            {!globalAudioEnabled && Object.keys(remoteStreams).length > 0 && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 999999,
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}>
                    <button
                        onClick={enableAudioContext}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#ff4757',
                            color: 'white',
                            fontWeight: 'bold',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '6px',
                            fontSize: '16px',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ee5a6f'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#ff4757'}
                    >
                        🚨 SES SİSTEMİNİ BAŞLAT 🚨
                    </button>
                </div>
            )}

            {/* Ses oynatıcıları - gizli (sadece arka planda çalışır) */}
            <div style={{ display: 'none' }}>
                {Object.entries(remoteStreams).map(([username, stream]) => (
                    <AudioPlayer
                        key={`${username}-${stream.id}-${stream.getAudioTracks().length}`}
                        username={username}
                        stream={stream}
                        volume={remoteVolumes[username] !== undefined ? remoteVolumes[username] : 100}
                        isMuted={mutedUsers ? mutedUsers.has(username) : false}
                        globalEnabled={globalAudioEnabled}
                    />
                ))}
            </div>
        </>
    );
};

const AudioPlayer = ({ username, stream, volume, isMuted, globalEnabled }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (stream) {
            const audioTracks = stream.getAudioTracks();
            logger.log(`[AudioPlayer] ${username} has ${audioTracks.length} audio tracks`);
        }
    }, [stream, username]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !stream) return;

        logger.log(`[AudioPlayer] Setting stream for ${username}`);
        audio.srcObject = stream;
        audio.muted = false;

        const attemptPlay = async () => {
            if (!globalEnabled) {
                logger.log(`[AudioPlayer] Global audio not enabled yet for ${username}`);
                return;
            }

            try {
                const audioTracks = stream.getAudioTracks();
                if (audioTracks.length === 0) {
                    logger.warn(`[AudioPlayer] No audio tracks for ${username}`);
                    return;
                }

                await audio.play();
                logger.log(`✅ [AudioPlayer] Successfully playing ${username}`);
            } catch (err) {
                logger.warn(`[AudioPlayer] Autoplay blocked for ${username}:`, err);
            }
        };

        attemptPlay();
    }, [stream, username, globalEnabled]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const targetVolume = isMuted ? 0 : (volume / 100);
        audio.volume = Math.max(0, Math.min(1, targetVolume));
        logger.log(`[AudioPlayer] ${username} volume set to ${Math.round(targetVolume * 100)}%`);
    }, [volume, isMuted, username]);

    return (
        <audio
            ref={audioRef}
            autoPlay
            playsInline
            style={{ display: 'none' }}
        />
    );
};

export default React.memo(VoiceAudioController);




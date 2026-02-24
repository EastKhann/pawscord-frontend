import React, { useEffect, useRef, useState, useCallback } from 'react';
import logger from './utils/logger';
import toast from './utils/toast';

const VoiceAudioController = ({ remoteStreams, remoteVolumes, mutedUsers }) => {
    // 🔥 FIX: Always enabled — user already interacted to join voice channel.
    // Old behavior required clicking "SES SİSTEMİNİ BAŞLAT" popup which was easily missed → silent audio.
    const [globalAudioEnabled, setGlobalAudioEnabled] = useState(true);

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
    const audioCtxRef = useRef(null);
    const sourceRef = useRef(null);
    const gainRef = useRef(null);

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

                audio.muted = false;
                audio.volume = 1.0;
                await audio.play();
                logger.log(`✅ [AudioPlayer] Successfully playing ${username}`);
            } catch (err) {
                logger.warn(`[AudioPlayer] Autoplay blocked for ${username}:`, err);
                // Retry on user interaction
                const resumeAudio = () => {
                    audio.play().catch(() => { });
                };
                document.addEventListener('click', resumeAudio, { once: true });
                document.addEventListener('keydown', resumeAudio, { once: true });
                // Also retry after short delay
                setTimeout(() => { audio.play().catch(() => { }); }, 500);
            }
        };

        attemptPlay();

        // Cleanup GainNode chain on stream change
        return () => {
            if (sourceRef.current) {
                try { sourceRef.current.disconnect(); } catch (e) { /* */ }
                sourceRef.current = null;
            }
            if (gainRef.current) {
                try { gainRef.current.disconnect(); } catch (e) { /* */ }
                gainRef.current = null;
            }
            if (audioCtxRef.current) {
                try { audioCtxRef.current.close(); } catch (e) { /* */ }
                audioCtxRef.current = null;
            }
        };
    }, [stream, username, globalEnabled]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const targetVolume = isMuted ? 0 : (volume / 100);

        if (targetVolume <= 1) {
            // Normal range (0-100%): use native volume, bypass GainNode
            audio.volume = Math.max(0, targetVolume);
            if (gainRef.current) {
                try { gainRef.current.gain.value = 1; } catch (e) { /* */ }
            }
        } else {
            // >100% amplification: use Web Audio API GainNode
            audio.volume = 1.0; // Max native volume
            try {
                if (!audioCtxRef.current) {
                    const Ctx = window.AudioContext || window.webkitAudioContext;
                    audioCtxRef.current = new Ctx();
                    sourceRef.current = audioCtxRef.current.createMediaElementSource(audio);
                    gainRef.current = audioCtxRef.current.createGain();
                    sourceRef.current.connect(gainRef.current);
                    gainRef.current.connect(audioCtxRef.current.destination);
                }
                if (audioCtxRef.current.state === 'suspended') {
                    audioCtxRef.current.resume();
                }
                gainRef.current.gain.value = targetVolume; // e.g. 1.5 for 150%, 2.0 for 200%
            } catch (e) {
                logger.warn(`[AudioPlayer] GainNode amplification failed for ${username}:`, e);
            }
        }
        logger.log(`[AudioPlayer] ${username} volume set to ${Math.round(targetVolume * 100)}%`);
    }, [volume, isMuted, username]);

    // Cleanup AudioContext on unmount
    useEffect(() => {
        return () => {
            if (sourceRef.current) {
                try { sourceRef.current.disconnect(); } catch (e) { /* */ }
            }
            if (gainRef.current) {
                try { gainRef.current.disconnect(); } catch (e) { /* */ }
            }
            if (audioCtxRef.current) {
                try { audioCtxRef.current.close(); } catch (e) { /* */ }
            }
        };
    }, []);

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




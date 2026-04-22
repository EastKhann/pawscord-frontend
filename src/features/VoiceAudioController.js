/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import logger from '../utils/logger';
import toast from '../utils/toast';

// -- extracted inline style constants --
const _st1 = { display: 'none' };

const VoiceAudioController = ({ remoteStreams, remoteVolumes, mutedUsers, isDeafened }) => {
    const { t } = useTranslation();
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
            toast.error(t('voice.audioInitError', { error: err.message }));
        }
    }, []);

    useEffect(() => {
        logger.audio('VoiceAudioController MOUNTED! RemoteStreams:', Object.keys(remoteStreams));
        return () => logger.audio('VoiceAudioController UNMOUNTED!');
    }, []);

    return (
        <>
            {/* Ses oynatıcıları - gizli (sadece arka planda çalışır) */}
            <div aria-label={t('aria.voiceAudioController', 'Voice Audio')} style={_st1}>
                {Object.entries(remoteStreams).map(([username, stream]) => (
                    <AudioPlayer
                        key={`${username}-${stream.id}-${stream.getAudioTracks().length}`}
                        username={username}
                        stream={stream}
                        volume={
                            remoteVolumes[username] !== undefined ? remoteVolumes[username] : 100
                        }
                        isMuted={mutedUsers ? mutedUsers.has(username) : false}
                        isDeafened={!!isDeafened}
                        globalEnabled={globalAudioEnabled}
                    />
                ))}
            </div>
        </>
    );
};

// BASE_GAIN: Receiver-side amplification for incoming WebRTC audio.
// Sender side applies compressor + makeup gain (1.5-3.0× depending on level).
// Combined sender+receiver gain should be ~6-8× for comfortable volume.
// Limiter at -0.5dB prevents clipping at high volume settings (200%).
const BASE_GAIN = 3.0;

const AudioPlayer = ({ username, stream, volume, isMuted, isDeafened, globalEnabled }) => {
    const audioRef = useRef(null);
    const audioCtxRef = useRef(null);
    const sourceRef = useRef(null);
    const gainRef = useRef(null);
    const limiterRef = useRef(null);
    // Keep a ref to current volume so the GainNode can be initialised with
    // the right value the first time it is created (stream useEffect).
    const volumeRef = useRef(volume);
    const isMutedRef = useRef(isMuted);
    useEffect(() => {
        volumeRef.current = volume;
    }, [volume]);
    useEffect(() => {
        isMutedRef.current = isMuted || isDeafened;
    }, [isMuted, isDeafened]);

    // Helper: create/ensure GainNode chain exists and return the gain node.
    // 🔥 YENİ: Compressor + Limiter zinciri added — alıcı tarafında audio normalizasyonu
    const ensureGainChain = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return null;
        if (gainRef.current) return gainRef.current;
        try {
            const Ctx = window.AudioContext || window.webkitAudioContext;
            audioCtxRef.current = new Ctx({ latencyHint: 'interactive', sampleRate: 48000 });
            sourceRef.current = audioCtxRef.current.createMediaElementSource(audio);

            // 🔥 1. GAIN NODE — kullanıcı audio seviyesi kontrolü
            gainRef.current = audioCtxRef.current.createGain();

            // Sender side already applies a full compressor + makeupGain chain in
            // audioProcessing.js before transmitting. Adding a second compressor here
            // caused double-compression pumping artifacts ("giggling"). Keeping only a
            // brick-wall limiter to prevent clipping at high volume settings.

            // 🔥 LIMITER — clipping protection (no distortion even at 200% volume)
            // The limiter must act as a TRUE brick-wall that catches only the peaks
            // near 0dBFS. Previous -6dB threshold + 6:1 ratio acted as a full
            // compressor, eating ~12dB of the 14dB gain boost and causing extremely
            // low perceived volume (~5%). Now uses -1dB threshold + 20:1 ratio so
            // the GainNode boost passes through UNCOMPRESSED and only near-clipping
            // transients get caught. The 3dB knee provides a small soft transition
            // so the volume slider from 100→200% remains audibly different.
            limiterRef.current = audioCtxRef.current.createDynamicsCompressor();
            limiterRef.current.threshold.value = -0.5; // 🔥 -1→-0.5dB: çok son ana kadar sesi geçir
            limiterRef.current.knee.value = 2; // 🔥 3→2dB: çok dar knee = şeffaf limiting
            limiterRef.current.ratio.value = 20; // 20:1 brick-wall
            limiterRef.current.attack.value = 0.0005; // 🔥 1ms→0.5ms: anında yakala
            limiterRef.current.release.value = 0.03; // 🔥 50ms→30ms: hızlı recovery

            // 🔥 Signal zinciri: source → gain → limiter → destination
            sourceRef.current.connect(gainRef.current);
            gainRef.current.connect(limiterRef.current);
            limiterRef.current.connect(audioCtxRef.current.destination);

            logger.audio(
                `[AudioPlayer] GainNode + Compressor + Limiter chain created for ${username}`
            );
        } catch (e) {
            logger.warn(`[AudioPlayer] GainNode creation failed for ${username}:`, e);
            return null;
        }
        return gainRef.current;
    }, [username]);

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
        // Always keep native volume at max — GainNode handles the actual level.
        audio.volume = 1.0;

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
                await audio.play();
                logger.log(`✅ [AudioPlayer] Successfully playing ${username}`);

                // 🔥 FIX: Create GainNode chain immediately after play so we can
                // apply BASE_GAIN boost to the weak incoming WebRTC signal.
                const gainNode = ensureGainChain();
                if (gainNode) {
                    const targetGain = isMutedRef.current
                        ? 0
                        : (volumeRef.current / 100) * BASE_GAIN;
                    gainNode.gain.value = Math.max(0, targetGain);
                    if (audioCtxRef.current?.state === 'suspended') {
                        audioCtxRef.current.resume();
                    }
                }
            } catch (err) {
                logger.warn(`[AudioPlayer] Autoplay blocked for ${username}:`, err);
                const resumeAudio = () => {
                    audio.play().catch(() => {});
                };
                document.addEventListener('click', resumeAudio, { once: true });
                document.addEventListener('keydown', resumeAudio, { once: true });
                setTimeout(() => {
                    audio.play().catch(() => {});
                }, 500);
            }
        };

        attemptPlay();

        // 🔥 NOTE: Do NOT destroy GainNode chain on stream change.
        // createMediaElementSource is bound to the <audio> element, not the stream.
        // Changing srcObject still routes through the existing GainNode chain.
        // GainNode cleanup is handled by the unmount useEffect below.
    }, [stream, username, globalEnabled, ensureGainChain]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Volume range 0-200 → gain 0 – (2 * BASE_GAIN)
        // 100% → BASE_GAIN (3.0×), 200% → 2 * BASE_GAIN (6.0×)
        // Limiter at -0.5dB prevents clipping even at 200%
        const targetGain = isMuted || isDeafened ? 0 : (volume / 100) * BASE_GAIN;

        // 🔥 Always route through GainNode so we get the boost.
        // If the chain doesn't exist yet (audio not started), it will be
        // created in attemptPlay above; this effect will re-run if needed.
        if (gainRef.current) {
            try {
                if (audioCtxRef.current?.state === 'suspended') {
                    audioCtxRef.current.resume();
                }
                gainRef.current.gain.value = Math.max(0, targetGain);
            } catch (e) {
                logger.warn(`[AudioPlayer] GainNode volume set failed for ${username}:`, e);
            }
        } else {
            // GainNode not yet created (stream hasn't played yet) — fall back to
            // native volume as a safety net (will be overridden once chain exists).
            // 🔥 FIX: Use higher fallback so audio isn't nearly silent when GainNode
            // hasn't been created yet. Native audio.volume max is 1.0 but at least
            // it won't be inaudible like 0.5 was at 50%.
            audio.volume = isMuted || isDeafened ? 0 : 1.0;
        }
        logger.log(`[AudioPlayer] ${username} gain=${targetGain.toFixed(2)} (vol=${volume}%)`);
    }, [volume, isMuted, isDeafened, username]);

    // Cleanup AudioContext on unmount
    useEffect(() => {
        return () => {
            if (sourceRef.current) {
                try {
                    sourceRef.current.disconnect();
                } catch (e) {
                    /* */
                }
            }
            if (gainRef.current) {
                try {
                    gainRef.current.disconnect();
                } catch (e) {
                    /* */
                }
            }
            if (limiterRef.current) {
                try {
                    limiterRef.current.disconnect();
                } catch (e) {
                    /* */
                }
            }
            if (audioCtxRef.current) {
                try {
                    audioCtxRef.current.close();
                } catch (e) {
                    /* */
                }
            }
        };
    }, []);

    return <audio ref={audioRef} autoPlay playsInline style={_st1} />;
};

VoiceAudioController.propTypes = {
    remoteStreams: PropTypes.array,
    remoteVolumes: PropTypes.array,
    mutedUsers: PropTypes.bool,
    isDeafened: PropTypes.bool,
};
export default React.memo(VoiceAudioController);

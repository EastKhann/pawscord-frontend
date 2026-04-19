import { useCallback, useEffect, useRef } from 'react';
import { applyProfessionalAudioFilters } from './audioProcessing';
import logger from '../utils/logger';

/**
 * Noise control hook — manages toggle + mid-session level changes.
 *
 * Key design decisions:
 * - Always acquires fresh getUserMedia (applyConstraints on synthesized
 *   MediaStreamDestination tracks is a silent no-op).
 * - Watches noiseSuppressionLevel and reapplies filters mid-session when it
 *   changes (previously only took effect after rejoin).
 * - Cleans up old stream's noise-gate interval to prevent CPU leak.
 * - Uses refs for values read inside the level-change effect to avoid stale
 *   closures and infinite re-render loops.
 */
export function useNoiseControl({
    isNoiseSuppressionEnabled,
    setIsNoiseSuppressionEnabled,
    noiseSuppressionLevel,
    isInVoice,
    localAudioStream,
    setLocalAudioStream,
    localStreamRef,
    peerConnectionsRef,
    globalAudioContextRef,
}) {
    // Refs for values consumed inside the level-change effect — avoids
    // re-trigbackng the effect when these values change.
    const isEnabledRef = useRef(isNoiseSuppressionEnabled);
    const isInVoiceRef = useRef(isInVoice);
    useEffect(() => {
        isEnabledRef.current = isNoiseSuppressionEnabled;
    }, [isNoiseSuppressionEnabled]);
    useEffect(() => {
        isInVoiceRef.current = isInVoice;
    }, [isInVoice]);

    /**
     * Core helper: acquire a fresh mic stream, optionally run through the
     * professional audio filter chain, and swap the track on all peers.
     * Uses localStreamRef (always current) instead of localAudioStream state
     * so the callback identity is stable.
     */
    const reapplyAudioChain = useCallback(
        async (enableFilters) => {
            const currentStream = localStreamRef.current;
            if (!currentStream) return;

            try {
                const fresh = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        noiseSuppression: enableFilters,
                        echoCancellation: true,
                        autoGainControl: true,
                        googHighpassFilter: true,
                        googNoiseSuppression: enableFilters,
                        googNoiseSuppression2: enableFilters,
                        googEchoCancellation: true,
                        googAutoGainControl: true,
                        googTypingNoiseDetection: true,
                        sampleRate: { ideal: 48000 },
                        latency: { ideal: 0.01 },
                        channelCount: { ideal: 1 },
                    },
                });

                let processedStream = fresh;
                if (enableFilters) {
                    try {
                        processedStream = applyProfessionalAudioFilters(
                            fresh,
                            globalAudioContextRef
                        );
                    } catch (filterErr) {
                        logger.warn('[Noise] Filter apply failed, using raw stream:', filterErr);
                    }
                }

                const processedTrack = processedStream.getAudioTracks()[0];

                // Clean up old noise-gate interval before stopping tracks
                if (currentStream._noiseGateInterval) {
                    clearInterval(currentStream._noiseGateInterval);
                }
                currentStream.getAudioTracks().forEach((t) => {
                    try {
                        t.stop();
                    } catch (e) {
                        /* */
                    }
                });

                const newStream = new MediaStream([processedTrack]);
                setLocalAudioStream(newStream);
                localStreamRef.current = newStream;

                // Replace audio track on all peer connections
                if (peerConnectionsRef?.current) {
                    const promises = [];
                    for (const [peerId, pc] of Object.entries(peerConnectionsRef.current)) {
                        const audioSender = pc.getSenders().find((s) => s.track?.kind === 'audio');
                        if (audioSender) {
                            promises.push(
                                audioSender
                                    .replaceTrack(processedTrack)
                                    .catch((err) =>
                                        logger.warn(
                                            `[Noise] replaceTrack failed for ${peerId}:`,
                                            err
                                        )
                                    )
                            );
                        }
                    }
                    await Promise.all(promises);
                    if (import.meta.env.DEV)
                        logger.log(`[Noise] Track replaced on ${promises.length} peer(s)`);
                }
            } catch (err) {
                logger.error('[Noise] Audio chain reapply failed:', err);
            }
        },
        [globalAudioContextRef, localStreamRef, peerConnectionsRef, setLocalAudioStream]
    );

    const toggleNoiseSuppression = useCallback(async () => {
        const newState = !isNoiseSuppressionEnabled;
        setIsNoiseSuppressionEnabled(newState);
        localStorage.setItem('pawscord_noise_suppression', newState.toString());
        await reapplyAudioChain(newState);
    }, [isNoiseSuppressionEnabled, setIsNoiseSuppressionEnabled, reapplyAudioChain]);

    // Reapply filters when noise suppression LEVEL changes mid-session.
    // updateNoiseSuppressionLevel() saves to localStorage before the state
    // update triggers this effect, so applyProfessionalAudioFilters reads
    // the correct new level from localStorage.
    const prevLevelRef = useRef(noiseSuppressionLevel);
    useEffect(() => {
        if (prevLevelRef.current === noiseSuppressionLevel) return;
        prevLevelRef.current = noiseSuppressionLevel;
        if (!isInVoiceRef.current || !isEnabledRef.current) return;
        reapplyAudioChain(true).then(() => {
            if (import.meta.env.DEV)
                logger.log(`[Noise] Level changed to ${noiseSuppressionLevel}, filters reapplied`);
        });
    }, [noiseSuppressionLevel, reapplyAudioChain]);

    return { toggleNoiseSuppression };
}

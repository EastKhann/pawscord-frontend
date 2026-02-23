import { useEffect, useRef } from 'react';
import { useVoice } from '../VoiceContext';

/**
 * AudioController - Handles remote audio streams playback
 * This component renders invisible <audio> elements for each remote user
 */
const AudioController = () => {
    const { remoteStreams, remoteVolumes, mutedUsers, isDeafened } = useVoice();
    const audioElementsRef = useRef({});

    useEffect(() => {
        // Clean up audio elements for users who left
        Object.keys(audioElementsRef.current).forEach(username => {
            if (!remoteStreams[username]) {
                const audioEl = audioElementsRef.current[username];
                if (audioEl) {
                    audioEl.pause();
                    audioEl.srcObject = null;
                    delete audioElementsRef.current[username];
                }
            }
        });
    }, [remoteStreams]);

    useEffect(() => {
        // Create/update audio elements for each remote stream
        Object.entries(remoteStreams).forEach(([username, stream]) => {
            let audioEl = audioElementsRef.current[username];

            // Create audio element if it doesn't exist
            if (!audioEl) {
                audioEl = document.createElement('audio');
                audioEl.autoplay = true;
                audioEl.playsInline = true;
                audioElementsRef.current[username] = audioEl;
            }

            // Update stream if changed
            if (audioEl.srcObject !== stream) {
                audioEl.srcObject = stream;

                // Attempt to play (may require user interaction)
                audioEl.play().catch(err => {
                    console.warn(`[AudioController] Play failed for ${username}:`, err.message);
                    // Try again after a short delay
                    setTimeout(() => {
                        audioEl.play().catch(e => console.error(`[AudioController] Retry failed for ${username}:`, e));
                    }, 100);
                });
            }

            // Apply volume with >100% amplification via GainNode
            const volume = remoteVolumes[username] !== undefined ? remoteVolumes[username] / 100 : 1;

            if (volume <= 1) {
                // Normal range: use native volume
                audioEl.volume = Math.max(0, volume);
                if (audioEl._gainNode) {
                    try { audioEl._gainNode.gain.value = 1; } catch (e) { /* */ }
                }
            } else {
                // >100%: use Web Audio API GainNode for amplification
                audioEl.volume = 1.0;
                try {
                    if (!audioEl._audioContext) {
                        const Ctx = window.AudioContext || window.webkitAudioContext;
                        audioEl._audioContext = new Ctx();
                        audioEl._sourceNode = audioEl._audioContext.createMediaElementSource(audioEl);
                        audioEl._gainNode = audioEl._audioContext.createGain();
                        audioEl._sourceNode.connect(audioEl._gainNode);
                        audioEl._gainNode.connect(audioEl._audioContext.destination);
                    }
                    if (audioEl._audioContext.state === 'suspended') {
                        audioEl._audioContext.resume();
                    }
                    audioEl._gainNode.gain.value = volume; // e.g. 1.5 for 150%
                } catch (e) {
                    console.warn(`[AudioController] GainNode amplification failed for ${username}:`, e);
                }
            }

            // Apply mute state
            const isMuted = mutedUsers.has(username);
            audioEl.muted = isMuted || isDeafened;

        });
    }, [remoteStreams, remoteVolumes, mutedUsers, isDeafened]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            Object.values(audioElementsRef.current).forEach(audioEl => {
                audioEl.pause();
                audioEl.srcObject = null;
                // Cleanup Web Audio API GainNode chain
                if (audioEl._sourceNode) { try { audioEl._sourceNode.disconnect(); } catch (e) { /* */ } }
                if (audioEl._gainNode) { try { audioEl._gainNode.disconnect(); } catch (e) { /* */ } }
                if (audioEl._audioContext) { try { audioEl._audioContext.close(); } catch (e) { /* */ } }
            });
            audioElementsRef.current = {};
        };
    }, []);

    // This component doesn't render anything visible
    return null;
};

export default AudioController;




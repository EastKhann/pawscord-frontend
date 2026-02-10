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

            // Apply volume
            const volume = remoteVolumes[username] !== undefined ? remoteVolumes[username] / 100 : 1;
            audioEl.volume = volume;

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
            });
            audioElementsRef.current = {};
        };
    }, []);

    // This component doesn't render anything visible
    return null;
};

export default AudioController;




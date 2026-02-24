// frontend/src/VoiceChatPanel/UserVideoCard/useVideoAudio.js
// 🎤 Custom hook for video/audio stream management with WebAudio GainNode amplification

import { useRef, useEffect } from 'react';

/**
 * useVideoAudio Hook
 * Manages video and audio stream binding with volume control.
 * Supports >100% volume via WebAudio API GainNode amplification.
 * 
 * @param {MediaStream} stream - The media stream to bind
 * @param {Object} user - User object with isLocal, volume, username
 * @returns {{ videoRef: React.RefObject, audioRef: React.RefObject }}
 */
const useVideoAudio = (stream, user) => {
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    // Video stream binding
    useEffect(() => {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    // 🔥 Audio stream with volume control via GainNode
    useEffect(() => {
        if (audioRef.current && stream && !user.isLocal) {
            const audioTracks = stream.getAudioTracks();
            if (audioTracks.length > 0) {
                audioRef.current.srcObject = new MediaStream(audioTracks);
                const volumePercent = user.volume || 100;
                const targetVolume = volumePercent / 100;
                const audio = audioRef.current;

                // 🔥 FIX: Once createMediaElementSource() is called, audio.volume has NO EFFECT.
                // All volume must go through GainNode after that point.
                if (audio._gainNode) {
                    // GainNode chain already exists — route all volume through it
                    try {
                        if (audio._audioContext?.state === 'suspended') {
                            audio._audioContext.resume();
                        }
                        audio._gainNode.gain.value = Math.max(0, targetVolume);
                    } catch (e) {
                        console.warn('[Volume] GainNode volume set failed:', e);
                    }
                } else if (volumePercent > 100) {
                    // >100% — create Web Audio API GainNode chain for amplification
                    audio.volume = 1.0;
                    try {
                        audio._audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        audio._sourceNode = audio._audioContext.createMediaElementSource(audio);
                        audio._gainNode = audio._audioContext.createGain();
                        audio._sourceNode.connect(audio._gainNode);
                        audio._gainNode.connect(audio._audioContext.destination);
                        audio._gainNode.gain.value = targetVolume;
                    } catch (e) {
                        console.warn('[Volume] GainNode amplification failed:', e);
                    }
                } else {
                    // Normal range (0-100%): no GainNode yet, use native volume
                    audio.volume = Math.max(0, targetVolume);
                }
            }
        }
    }, [stream, user.isLocal, user.username, user.volume]);

    return { videoRef, audioRef };
};

export default useVideoAudio;

// hooks/useVoiceActivity.js
// 🎤 Voice Activity Detection Hook - Pawscord speaking indicator

import { useState, useEffect, useRef } from 'react';
import logger from '../utils/logger';

// Vendor-prefixed AudioContext present in older Safari builds
declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext;
    }
}

interface VoiceActivityOptions {
    threshold?: number;
    smoothingTimeConstant?: number;
    fftSize?: number;
    minDecibels?: number;
    maxDecibels?: number;
    updateInterval?: number;
}

/**
 * Voice activity detection hook
 * Analyzes audio stream and detects when user is speaking
 */
export const useVoiceActivity = (
    audioStream: MediaStream | null | undefined,
    options: VoiceActivityOptions = {}
) => {
    const {
        threshold = -50,
        smoothingTimeConstant = 0.8,
        fftSize = 512,
        minDecibels = -90,
        maxDecibels = -10,
        updateInterval = 100,
    } = options;

    const [isSpeaking, setIsSpeaking] = useState(false);
    const [volume, setVolume] = useState(0);

    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const lastUpdateRef = useRef(0);

    useEffect(() => {
        if (!audioStream) {
            setIsSpeaking(false);
            return;
        }

        try {
            // Create audio context and analyser
            const AudioCtx = window.AudioContext ?? window.webkitAudioContext ?? AudioContext;
            const audioContext = new AudioCtx();
            const analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaStreamSource(audioStream);

            analyser.fftSize = fftSize;
            analyser.smoothingTimeConstant = smoothingTimeConstant;
            analyser.minDecibels = minDecibels;
            analyser.maxDecibels = maxDecibels;

            source.connect(analyser);

            audioContextRef.current = audioContext;
            analyserRef.current = analyser;
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>;

            const analyze = () => {
                const now = Date.now();

                if (now - lastUpdateRef.current >= updateInterval) {
                    if (!dataArrayRef.current) return;
                    analyser.getByteFrequencyData(dataArrayRef.current);

                    const average =
                        dataArrayRef.current.reduce((a: number, b: number) => a + b, 0) /
                        dataArrayRef.current.length;

                    const db = 20 * Math.log10(average / 255);

                    setVolume(average);
                    setIsSpeaking(db > threshold);

                    lastUpdateRef.current = now;
                }

                animationFrameRef.current = requestAnimationFrame(analyze);
            };

            analyze();

            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                }
                if (audioContextRef.current) {
                    audioContextRef.current.close();
                }
            };
        } catch (error) {
            logger.error('Voice activity detection error:', error);
            setIsSpeaking(false);
        }
    }, [
        audioStream,
        threshold,
        smoothingTimeConstant,
        fftSize,
        minDecibels,
        maxDecibels,
        updateInterval,
    ]);

    return { isSpeaking, volume };
};

/**
 * Simple version - just checks audio level periodically
 */
export const useSimpleVoiceActivity = (
    audioStream: MediaStream | null | undefined,
    threshold = 0.01
): boolean => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        if (!audioStream) {
            setIsSpeaking(false);
            return;
        }

        const AudioCtx = window.AudioContext ?? window.webkitAudioContext ?? AudioContext;
        const audioContext = new AudioCtx();
        const analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(audioStream);

        analyser.fftSize = 256;
        source.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const checkAudio = () => {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((a: number, b: number) => a + b, 0) / dataArray.length;
            setIsSpeaking(average > threshold * 255);
        };

        const interval = setInterval(checkAudio, 100);

        return () => {
            clearInterval(interval);
            audioContext.close();
        };
    }, [audioStream, threshold]);

    return isSpeaking;
};

export default useVoiceActivity;

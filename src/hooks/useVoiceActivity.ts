// hooks/useVoiceActivity.js
// 🎤 Voice Activity Detection Hook - Discord-style speaking indicator

import { useState, useEffect, useRef } from 'react';

/**
 * Voice activity detection hook
 * Analyzes audio stream and detects when user is speaking
 */
export const useVoiceActivity = (audioStream, options = {}) => {
  const {
    threshold = -50, // dB threshold for speaking
    smoothingTimeConstant = 0.8,
    fftSize = 512,
    minDecibels = -90,
    maxDecibels = -10,
    updateInterval = 100 // ms
  } = options;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [volume, setVolume] = useState(0);

  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const dataArrayRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    if (!audioStream) {
      setIsSpeaking(false);
      return;
    }

    try {
      // Create audio context and analyser
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(audioStream);

      analyser.fftSize = fftSize;
      analyser.smoothingTimeConstant = smoothingTimeConstant;
      analyser.minDecibels = minDecibels;
      analyser.maxDecibels = maxDecibels;

      source.connect(analyser);

      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);

      // Start analyzing
      const analyze = () => {
        const now = Date.now();

        if (now - lastUpdateRef.current >= updateInterval) {
          analyser.getByteFrequencyData(dataArrayRef.current);

          // Calculate average volume
          const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;

          // Convert to dB
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
      console.error('Voice activity detection error:', error);
      setIsSpeaking(false);
    }
  }, [audioStream, threshold, smoothingTimeConstant, fftSize, minDecibels, maxDecibels, updateInterval]);

  return { isSpeaking, volume };
};

/**
 * Simple version - just checks audio level periodically
 */
export const useSimpleVoiceActivity = (audioStream, threshold = 0.01) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!audioStream) {
      setIsSpeaking(false);
      return;
    }

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(audioStream);

    analyser.fftSize = 256;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const checkAudio = () => {
      analyser.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
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




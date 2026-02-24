import { useState, useEffect, useRef } from 'react';

const useMicTest = () => {
    const [micLevel, setMicLevel] = useState(0);
    const [isTesting, setIsTesting] = useState(false);
    const testStreamRef = useRef(null);
    const analyserRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!isTesting) {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (testStreamRef.current) {
                testStreamRef.current.getTracks().forEach(track => track.stop());
                testStreamRef.current = null;
            }
            setMicLevel(0);
            return;
        }

        (async () => {
            try {
                // 🔥 Mic test: gürültü engelleme KAPALI — gerçek seviye
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
                });
                testStreamRef.current = stream;

                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 2048;
                analyser.smoothingTimeConstant = 0.4;
                analyserRef.current = analyser;

                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);

                // 🔥 Time-domain RMS+peak hybrid — perceptual scaling
                const dataArray = new Uint8Array(analyser.fftSize);

                const updateLevel = () => {
                    analyser.getByteTimeDomainData(dataArray);
                    let sumSquares = 0;
                    let peak = 0;
                    for (let i = 0; i < dataArray.length; i++) {
                        const amplitude = (dataArray[i] - 128) / 128;
                        sumSquares += amplitude * amplitude;
                        const abs = Math.abs(amplitude);
                        if (abs > peak) peak = abs;
                    }
                    const rms = Math.sqrt(sumSquares / dataArray.length);
                    const hybrid = rms * 0.7 + peak * 0.3;
                    // Power curve: normal konuşma ~%40-70
                    const scaled = Math.min(100, Math.pow(hybrid, 0.35) * 100);
                    setMicLevel(prev => prev * 0.2 + scaled * 0.8);
                    animationRef.current = requestAnimationFrame(updateLevel);
                };

                updateLevel();
            } catch (err) {
                console.error('Mic test error:', err);
                setIsTesting(false);
            }
        })();

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (testStreamRef.current) {
                testStreamRef.current.getTracks().forEach(track => track.stop());
            }
        };
    }, [isTesting]);

    return { micLevel, isTesting, setIsTesting };
};

export default useMicTest;

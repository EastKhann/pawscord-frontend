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
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                testStreamRef.current = stream;

                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                const analyser = audioContext.createAnalyser();
                analyser.fftSize = 256;
                analyser.smoothingTimeConstant = 0.8;
                analyserRef.current = analyser;

                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);

                const dataArray = new Uint8Array(analyser.frequencyBinCount);

                const updateLevel = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
                    setMicLevel(Math.min(100, average * 1.5));
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

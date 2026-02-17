import { useEffect } from 'react';

/**
 * Voice Activity Detection hook — detects when the user is speaking
 * using an AnalyserNode on the local audio stream.
 */
export function useVAD({
    localAudioStream, isInVoice, isMuted, vadSensitivity,
    setIsTalking, globalAudioContextRef
}) {
    // 🔥 VOICE ACTIVITY DETECTION (VAD) - İyileştirilmiş
    useEffect(() => {
        if (!localAudioStream || !isInVoice || isMuted) {
            setIsTalking(false);
            return;
        }

        // 🔥 PERFORMANS: Global AudioContext kullan (RAM optimizasyonu)
        if (!globalAudioContextRef.current) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            globalAudioContextRef.current = new AudioContext();
        }

        const audioContext = globalAudioContextRef.current;
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;  // 🔥 Hassas analiz
        analyser.smoothingTimeConstant = 0.85;  // 🔥 İYİLEŞTİRME: 0.8'den 0.85'e - daha stabil
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const source = audioContext.createMediaStreamSource(localAudioStream);
        source.connect(analyser);

        let talkingTimeout = null;
        const THRESHOLD = vadSensitivity;
        const TALKING_DELAY = 150;

        // 🚀 OPTIMIZATION: setInterval (25ms = 40Hz) — requestAnimationFrame yerine
        // Background tab'larda RAF 1Hz'e düşüyor ve VAD çalışmıyor, setInterval tutarlı.
        const vadIntervalId = setInterval(() => {
            analyser.getByteFrequencyData(dataArray);

            // Konuşma frekansları (300Hz - 3kHz)
            const speechRange = dataArray.slice(10, 100);
            const average = speechRange.reduce((a, b) => a + b, 0) / speechRange.length;

            if (average > THRESHOLD) {
                setIsTalking(true);
                if (talkingTimeout) clearTimeout(talkingTimeout);
                talkingTimeout = setTimeout(() => setIsTalking(false), TALKING_DELAY);
            }
        }, 25); // 40Hz — yeterince hızlı, CPU-friendly

        return () => {
            clearInterval(vadIntervalId);
            if (talkingTimeout) clearTimeout(talkingTimeout);
            source.disconnect();
        };
    }, [localAudioStream, isInVoice, isMuted, vadSensitivity]); // 🔥 YENİ: vadSensitivity dependency
}

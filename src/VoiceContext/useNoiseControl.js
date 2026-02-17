import { useCallback } from 'react';

/**
 * Noise control hook — manages noise suppression toggle
 * with fallback to getUserMedia when applyConstraints fails.
 */
export function useNoiseControl({
    isNoiseSuppressionEnabled, setIsNoiseSuppressionEnabled,
    localAudioStream, setLocalAudioStream, localStreamRef
}) {
    // 🔥 YENİ: Noise Suppression Toggle (fallback ile)
    // 🔥 GELİŞMİŞ GÜRÜLTÜ ENGELLEMESİ - Noise Gate ile birlikte
    const toggleNoiseSuppression = useCallback(async () => {
        const newState = !isNoiseSuppressionEnabled;
        setIsNoiseSuppressionEnabled(newState);
        localStorage.setItem('pawscord_noise_suppression', newState.toString());

        // Mevcut audio track'e uygula
        if (localAudioStream) {
            const audioTrack = localAudioStream.getAudioTracks()[0];
            if (audioTrack && audioTrack.applyConstraints) {
                try {
                    await audioTrack.applyConstraints({
                        noiseSuppression: newState,
                        echoCancellation: true,
                        autoGainControl: true
                    });
                } catch (err) {
                    console.warn('[Noise] Failed to apply, trying fallback getUserMedia:', err);
                    try {
                        const fresh = await navigator.mediaDevices.getUserMedia({
                            audio: {
                                noiseSuppression: newState,
                                echoCancellation: true,
                                autoGainControl: true,
                                // 🔥 GELİŞMİŞ SES AYARLARI
                                googHighpassFilter: true,
                                googNoiseSuppression: newState,
                                googNoiseSuppression2: newState,
                                googEchoCancellation: true,
                                googAutoGainControl: true,
                                googTypingNoiseDetection: true, // Klavye sesi engelleme
                                sampleRate: { ideal: 48000 },
                                latency: { ideal: 0.01 }, // Daha düşük latency
                                channelCount: { ideal: 1 } // Mono = daha iyi gürültü engelleme
                            }
                        });
                        const track = fresh.getAudioTracks()[0];
                        const newStream = new MediaStream([track]);
                        setLocalAudioStream(newStream);
                        localStreamRef.current = newStream;
                    } catch (e2) {
                        console.error('[Noise] Fallback failed:', e2);
                    }
                }
            }
        }
    }, [isNoiseSuppressionEnabled, localAudioStream]);

    return { toggleNoiseSuppression };
}

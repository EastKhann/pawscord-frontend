import { useCallback } from 'react';
import { applyProfessionalAudioFilters } from './audioProcessing';

/**
 * Noise control hook — 10/10 kalite.
 * 
 * İyileştirmeler:
 * - Toggle sonrasında professional audio filter chain yeniden uygulanır
 * - Hem applyConstraints hem fallback getUserMedia desteklenir
 * - Eski stream track'leri düzgün durdurulur (kaynak sızıntısı yok)
 * - globalAudioContextRef kullanılarak tek AudioContext paylaşılır
 */
export function useNoiseControl({
    isNoiseSuppressionEnabled, setIsNoiseSuppressionEnabled,
    localAudioStream, setLocalAudioStream, localStreamRef,
    peerConnectionsRef, globalAudioContextRef
}) {
    const toggleNoiseSuppression = useCallback(async () => {
        const newState = !isNoiseSuppressionEnabled;
        setIsNoiseSuppressionEnabled(newState);
        localStorage.setItem('pawscord_noise_suppression', newState.toString());

        if (!localAudioStream) return;
        const audioTrack = localAudioStream.getAudioTracks()[0];
        if (!audioTrack) return;

        // 🔥 Strateji 1: applyConstraints ile mevcut track'i güncelle
        let needsFreshStream = false;
        try {
            await audioTrack.applyConstraints({
                noiseSuppression: newState,
                echoCancellation: true,
                autoGainControl: true
            });
        } catch (err) {
            console.warn('[Noise] applyConstraints failed, falling back:', err);
            needsFreshStream = true;
        }

        // 🔥 Strateji 2: Yeni getUserMedia stream al
        if (needsFreshStream) {
            try {
                const fresh = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        noiseSuppression: newState,
                        echoCancellation: true,
                        autoGainControl: true,
                        googHighpassFilter: true,
                        googNoiseSuppression: newState,
                        googNoiseSuppression2: newState,
                        googEchoCancellation: true,
                        googAutoGainControl: true,
                        googTypingNoiseDetection: true,
                        sampleRate: { ideal: 48000 },
                        latency: { ideal: 0.01 },
                        channelCount: { ideal: 1 }
                    }
                });

                // 🔥 Professional audio filter chain uygula (yeni stream'e)
                let processedStream = fresh;
                try {
                    processedStream = applyProfessionalAudioFilters(fresh, globalAudioContextRef);
                    console.log('[Noise] Professional audio filters reapplied to fresh stream');
                } catch (filterErr) {
                    console.warn('[Noise] Filter reapply failed, using raw stream:', filterErr);
                }

                const processedTrack = processedStream.getAudioTracks()[0];

                // 🔥 Eski track'leri durdur (kaynak sızıntısı önle)
                localAudioStream.getAudioTracks().forEach(t => {
                    try { t.stop(); } catch (e) { /* */ }
                });

                const newStream = new MediaStream([processedTrack]);
                setLocalAudioStream(newStream);
                localStreamRef.current = newStream;

                // 🔥 Tüm peer connection'lardaki audio track'i değiştir
                if (peerConnectionsRef?.current) {
                    const replacePromises = [];
                    for (const [peerId, pc] of Object.entries(peerConnectionsRef.current)) {
                        const audioSender = pc.getSenders().find(s => s.track?.kind === 'audio');
                        if (audioSender) {
                            replacePromises.push(
                                audioSender.replaceTrack(processedTrack)
                                    .catch(err => console.warn(`[Noise] replaceTrack failed for ${peerId}:`, err))
                            );
                        }
                    }
                    await Promise.all(replacePromises);
                    console.log(`[Noise] Track replaced on ${replacePromises.length} peer(s)`);
                }
            } catch (e2) {
                console.error('[Noise] Fallback getUserMedia failed:', e2);
            }
        }
    }, [isNoiseSuppressionEnabled, localAudioStream, globalAudioContextRef]);

    return { toggleNoiseSuppression };
}

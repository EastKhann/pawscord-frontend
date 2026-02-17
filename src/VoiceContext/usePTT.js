import { useCallback, useEffect } from 'react';

/**
 * Push-to-Talk hook — manages PTT mode toggle and keyboard listener.
 */
export function usePTT({
    isPTTMode, setIsPTTMode, isInVoice, pttKey,
    isPTTActive, setIsPTTActive, localStreamRef, setIsMuted
}) {
    // 🔥 YENİ: PTT Mode Toggle
    const togglePTTMode = useCallback(() => {
        const newMode = !isPTTMode;
        setIsPTTMode(newMode);
        localStorage.setItem('pawscord_ptt_mode', newMode.toString());

        if (newMode) {
            // PTT mode'da mikrofon başlangıçta kapalı
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach(track => {
                    track.enabled = false;
                });
            }
            setIsMuted(true);
        } else {
            // Normal mode'a dönünce mikrofonu aç
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach(track => {
                    track.enabled = true;
                });
            }
            setIsMuted(false);
        }
    }, [isPTTMode]);

    // 🔥 YENİ: PTT Keyboard Listener
    useEffect(() => {
        if (!isPTTMode || !isInVoice) return;

        const handleKeyDown = (e) => {
            // Eğer input/textarea içindeyse PTT'yi tetikleme
            const target = e.target;
            if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
                return;
            }

            if (e.code === pttKey && !e.repeat) {
                setIsPTTActive(true);
                // Mikrofonu aç
                if (localStreamRef.current) {
                    localStreamRef.current.getAudioTracks().forEach(track => {
                        track.enabled = true;
                    });
                }
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === pttKey) {
                setIsPTTActive(false);
                // Mikrofonu kapat
                if (localStreamRef.current) {
                    localStreamRef.current.getAudioTracks().forEach(track => {
                        track.enabled = false;
                    });
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isPTTMode, isInVoice, pttKey]);

    return { togglePTTMode };
}

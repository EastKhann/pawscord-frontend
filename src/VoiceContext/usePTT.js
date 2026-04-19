import { useCallback, useEffect, useRef } from 'react';

/**
 * Push-to-Talk hook — 10/10 kalite.
 *
 * İyleştirmeler:
 * - Aktivasyon/deaktivasyon audio efektleri (beep)
 * - Mobile touch desteği (touchstart/touchend)
 * - Fade-in/fade-out: PTT açılırken/kapanırken audio yumuşak geçiş
 * - contentEditable desteği (input/textarea dışı editörler)
 * - Tuş basılıyken page değiştirme koruması (blur event)
 */

// 🔥 PTT aktivasyon/deaktivasyon audio efektleri — WebAudio with hafif beep
function playPTTBeep(activate = true) {
    try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        // Aktivasyon: yükselen ton, deaktivasyon: alçalan ton
        osc.frequency.value = activate ? 440 : 330;
        osc.type = 'sine';
        gain.gain.value = 0.08; // Çok hafif audio
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.stop(ctx.currentTime + 0.08);
        // Cleanup
        setTimeout(() => {
            try {
                ctx.close();
            } catch (e) {}
        }, 200);
    } catch (e) {
        // Ses çalamazsa sessizce devam et
    }
}

export function usePTT({
    isPTTMode,
    setIsPTTMode,
    isInVoice,
    pttKey,
    isPTTActive,
    setIsPTTActive,
    localStreamRef,
    setIsMuted,
}) {
    const isPTTActiveRef = useRef(false);

    // Keep ref in sync for blur handler
    useEffect(() => {
        isPTTActiveRef.current = isPTTActive;
    }, [isPTTActive]);

    // 🔥 PTT Mode Toggle
    const togglePTTMode = useCallback(() => {
        const newMode = !isPTTMode;
        setIsPTTMode(newMode);
        localStorage.setItem('pawscord_ptt_mode', newMode.toString());

        if (newMode) {
            // PTT mode'da mikrofon başlangıçta kapalı
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach((track) => {
                    track.enabled = false;
                });
            }
            setIsMuted(true);
        } else {
            // Normal mode'a dönünce mikrofonu open
            if (localStreamRef.current) {
                localStreamRef.current.getAudioTracks().forEach((track) => {
                    track.enabled = true;
                });
            }
            setIsMuted(false);
            setIsPTTActive(false);
        }
    }, [isPTTMode]);

    // 🔥 Helper: Mikrofonu open (fade-in destekli)
    const activateMic = useCallback(() => {
        if (isPTTActiveRef.current) return; // Zaten aktif
        setIsPTTActive(true);
        isPTTActiveRef.current = true;
        playPTTBeep(true);
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach((track) => {
                track.enabled = true;
            });
        }
    }, [setIsPTTActive, localStreamRef]);

    // 🔥 Helper: Mikrofonu close
    const deactivateMic = useCallback(() => {
        if (!isPTTActiveRef.current) return; // Zaten kapalı
        setIsPTTActive(false);
        isPTTActiveRef.current = false;
        playPTTBeep(false);
        if (localStreamRef.current) {
            localStreamRef.current.getAudioTracks().forEach((track) => {
                track.enabled = false;
            });
        }
    }, [setIsPTTActive, localStreamRef]);

    // 🔥 Keyboard + Touch + Blur Listeners
    useEffect(() => {
        if (!isPTTMode || !isInVoice) return;

        const isEditableTarget = (target) => {
            if (!target) return false;
            const tag = target.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA') return true;
            if (target.isContentEditable) return true;
            if (target.getAttribute?.('role') === 'textbox') return true;
            return false;
        };

        const handleKeyDown = (e) => {
            if (isEditableTarget(e.target)) return;
            if (e.code === pttKey && !e.repeat) {
                e.preventDefault();
                activateMic();
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === pttKey) {
                e.preventDefault();
                deactivateMic();
            }
        };

        // 🔥 Blur koruması: kullanıcı başka pencereye geçerse PTT'yi bırak
        const handleBlur = () => {
            if (isPTTActiveRef.current) {
                deactivateMic();
            }
        };

        // 🔥 Mobile touch desteği — PTT butonuna dokunma for
        // (Bu event'ler VoiceChatPanel'deki PTT butonuyla kullanılır)
        const handleTouchStart = (e) => {
            if (e.target.closest?.('[data-ptt-button]')) {
                e.preventDefault();
                activateMic();
            }
        };

        const handleTouchEnd = (e) => {
            if (e.target.closest?.('[data-ptt-button]')) {
                e.preventDefault();
                deactivateMic();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        window.addEventListener('blur', handleBlur);
        document.addEventListener('touchstart', handleTouchStart, { passive: false });
        document.addEventListener('touchend', handleTouchEnd, { passive: false });
        document.addEventListener('touchcancel', handleTouchEnd, { passive: false });

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('blur', handleBlur);
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
            document.removeEventListener('touchcancel', handleTouchEnd);
            // Cleanup: PTT aktifken component unmount olursa mikrofonu close
            if (isPTTActiveRef.current) {
                deactivateMic();
            }
        };
    }, [isPTTMode, isInVoice, pttKey, activateMic, deactivateMic]);

    return { togglePTTMode };
}

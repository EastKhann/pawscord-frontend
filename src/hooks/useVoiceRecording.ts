// frontend/src/hooks/useVoiceRecording.js
// Extracted from MessageInput.js — voice recording state cluster
import { useState, useRef, useEffect } from 'react';
import toast from '../utils/toast';

const LOCK_THRESHOLD = 140; // px upward slide to lock (higher = harder to accidentally lock)
const LOCK_DELAY_MS = 500;  // ms after recording starts before lock gesture is active
const CANCEL_THRESHOLD = 80; // px left slide to cancel

const useVoiceRecording = (onFileUpload) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isRecordingLocked, setIsRecordingLocked] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [slideProgress, setSlideProgress] = useState(0);
    const [cancelProgress, setCancelProgress] = useState(0);

    const mediaRecorderRef = useRef(null);
    const recordingTimerRef = useRef(null);
    const micButtonRef = useRef(null);
    const isRecordingRef = useRef(false);
    const isRecordingLockedRef = useRef(false);
    const touchStartYRef = useRef(0);
    const touchStartXRef = useRef(0);
    const recordingStartTimeRef = useRef(0);

    // Keep refs in sync with state (for document-level event listeners)
    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);
    useEffect(() => {
        isRecordingLockedRef.current = isRecordingLocked;
    }, [isRecordingLocked]);

    // Document-level mouse/touch event handlers for slide-to-lock gesture
    useEffect(() => {
        if (!isRecording || isRecordingLocked) return;

        const handleDocMouseMove = (e) => {
            if (!isRecordingRef.current || isRecordingLockedRef.current) return;
            if (Date.now() - recordingStartTimeRef.current < LOCK_DELAY_MS) return;
            const startY = touchStartYRef.current;
            const startX = touchStartXRef.current;
            const deltaY = startY - e.clientY;
            const deltaX = startX - e.clientX; // positive = moved left
            // Cancel gesture takes priority over lock
            if (deltaX > 0 && deltaX > Math.abs(deltaY)) {
                const cp = Math.min(deltaX / CANCEL_THRESHOLD, 1);
                setCancelProgress(cp);
                setSlideProgress(0);
                if (deltaX > CANCEL_THRESHOLD) {
                    cancelRecording();
                    setCancelProgress(0);
                }
                return;
            }
            setCancelProgress(0);
            const progress = Math.min(Math.max(deltaY / LOCK_THRESHOLD, 0), 1);
            setSlideProgress(progress);
            if (deltaY > LOCK_THRESHOLD) {
                setIsRecordingLocked(true);
                setSlideProgress(1);
            }
        };

        const handleDocMouseUp = () => {
            if (!isRecordingRef.current) return;
            if (!isRecordingLockedRef.current) {
                stopRecording();
            }
            setCancelProgress(0);
        };

        const handleDocTouchMove = (e) => {
            if (!isRecordingRef.current || isRecordingLockedRef.current) return;
            if (Date.now() - recordingStartTimeRef.current < LOCK_DELAY_MS) return;
            const currentY = e.touches[0].clientY;
            const currentX = e.touches[0].clientX;
            const startY = touchStartYRef.current;
            const startX = touchStartXRef.current;
            const deltaY = startY - currentY;
            const deltaX = startX - currentX;
            if (deltaX > 0 && deltaX > Math.abs(deltaY)) {
                const cp = Math.min(deltaX / CANCEL_THRESHOLD, 1);
                setCancelProgress(cp);
                setSlideProgress(0);
                if (deltaX > CANCEL_THRESHOLD) {
                    cancelRecording();
                    setCancelProgress(0);
                }
                return;
            }
            setCancelProgress(0);
            const progress = Math.min(Math.max(deltaY / LOCK_THRESHOLD, 0), 1);
            setSlideProgress(progress);
            if (deltaY > LOCK_THRESHOLD) {
                setIsRecordingLocked(true);
                setSlideProgress(1);
            }
        };

        const handleDocTouchEnd = () => {
            if (!isRecordingRef.current) return;
            if (!isRecordingLockedRef.current) {
                stopRecording();
            }
        };

        document.addEventListener('mousemove', handleDocMouseMove);
        document.addEventListener('mouseup', handleDocMouseUp);
        document.addEventListener('touchmove', handleDocTouchMove, { passive: false });
        document.addEventListener('touchend', handleDocTouchEnd);

        return () => {
            document.removeEventListener('mousemove', handleDocMouseMove);
            document.removeEventListener('mouseup', handleDocMouseUp);
            document.removeEventListener('touchmove', handleDocTouchMove);
            document.removeEventListener('touchend', handleDocTouchEnd);
        };
    }, [isRecording, isRecordingLocked]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const file = new File([blob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
                if (onFileUpload) {
                    onFileUpload(file);
                }
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            recordingStartTimeRef.current = Date.now();

            recordingTimerRef.current = setInterval(() => {
                setRecordingTime(t => t + 1);
            }, 1000);
        } catch (err) {
            console.error('Mikrofon erişim hatası:', err);
            toast.error('❌ Mikrofona erişim reddedildi!');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecordingRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsRecordingLocked(false);
            clearInterval(recordingTimerRef.current);
        }
    };

    const cancelRecording = () => {
        if (mediaRecorderRef.current && isRecordingRef.current) {
            const stream = mediaRecorderRef.current.stream;
            mediaRecorderRef.current.onstop = null; // Prevent file upload
            mediaRecorderRef.current.stop();
            stream.getTracks().forEach(track => track.stop());
            // Faz 2.3: Haptic feedback — cancel pattern
            if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate([30, 50, 30]);
            setIsRecording(false);
            setIsRecordingLocked(false);
            clearInterval(recordingTimerRef.current);
        }
    };

    const handleMicMouseDown = (e) => {
        e.preventDefault();
        touchStartYRef.current = e.clientY;
        touchStartXRef.current = e.clientX;
        setSlideProgress(0);
        setCancelProgress(0);
        // Faz 2.3: Haptic feedback — short buzz on record start
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
        startRecording();
    };

    const handleMicTouchStart = (e) => {
        e.preventDefault();
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
        setSlideProgress(0);
        setCancelProgress(0);
        // Faz 2.3: Haptic feedback — short buzz on record start
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
        startRecording();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        isRecording,
        isRecordingLocked,
        recordingTime,
        slideProgress,
        cancelProgress,
        micButtonRef,
        handleMicMouseDown,
        handleMicTouchStart,
        stopRecording,
        cancelRecording,
        formatTime,
    };
};

export default useVoiceRecording;

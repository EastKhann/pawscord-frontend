// frontend/src/hooks/useVoiceRecording.js
// Extracted from MessageInput.js — voice recording state cluster
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../utils/toast';
import logger from '../utils/logger';

const LOCK_THRESHOLD = 140;
const LOCK_DELAY_MS = 500;
const CANCEL_THRESHOLD = 80;

const useVoiceRecording = (onFileUpload?: (file: File) => void) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isRecordingLocked, setIsRecordingLocked] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [slideProgress, setSlideProgress] = useState(0);
    const [cancelProgress, setCancelProgress] = useState(0);
    const { t } = useTranslation();

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const micButtonRef = useRef<HTMLElement | null>(null);
    const isRecordingRef = useRef(false);
    const isRecordingLockedRef = useRef(false);
    const touchStartYRef = useRef(0);
    const touchStartXRef = useRef(0);
    const recordingStartTimeRef = useRef(0);

    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);
    useEffect(() => {
        isRecordingLockedRef.current = isRecordingLocked;
    }, [isRecordingLocked]);

    useEffect(() => {
        if (!isRecording || isRecordingLocked) return;

        const handleDocMouseMove = (e: MouseEvent) => {
            if (!isRecordingRef.current || isRecordingLockedRef.current) return;
            if (Date.now() - recordingStartTimeRef.current < LOCK_DELAY_MS) return;
            const startY = touchStartYRef.current;
            const startX = touchStartXRef.current;
            const deltaY = startY - e.clientY;
            const deltaX = startX - e.clientX;
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

        const handleDocTouchMove = (e: TouchEvent) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecording, isRecordingLocked]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            const chunks: BlobPart[] = [];

            mediaRecorderRef.current.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const file = new File([blob], `voice-${Date.now()}.webm`, { type: 'audio/webm' });
                if (onFileUpload) {
                    onFileUpload(file);
                }
                stream.getTracks().forEach((track) => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            recordingStartTimeRef.current = Date.now();

            recordingTimerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } catch (err) {
            logger.error('Microphone access error:', err);
            toast.error(t('chat.micDenied'));
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecordingRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsRecordingLocked(false);
            if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
        }
    };

    const cancelRecording = () => {
        if (mediaRecorderRef.current && isRecordingRef.current) {
            const stream = mediaRecorderRef.current.stream;
            mediaRecorderRef.current.onstop = null;
            mediaRecorderRef.current.stop();
            stream.getTracks().forEach((track) => track.stop());
            if (typeof navigator !== 'undefined' && navigator.vibrate)
                navigator.vibrate([30, 50, 30]);
            setIsRecording(false);
            setIsRecordingLocked(false);
            if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
        }
    };

    const handleMicMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        touchStartYRef.current = e.clientY;
        touchStartXRef.current = e.clientX;
        setSlideProgress(0);
        setCancelProgress(0);
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
        startRecording();
    };

    const handleMicTouchStart = (e: React.TouchEvent) => {
        e.preventDefault();
        touchStartYRef.current = e.touches[0].clientY;
        touchStartXRef.current = e.touches[0].clientX;
        setSlideProgress(0);
        setCancelProgress(0);
        if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(20);
        startRecording();
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        return () => {
            if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
            if (mediaRecorderRef.current?.state === 'recording') {
                mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
                mediaRecorderRef.current.stop();
            }
        };
    }, []);

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

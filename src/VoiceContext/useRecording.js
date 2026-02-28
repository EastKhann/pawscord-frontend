import { useState, useCallback, useRef, useEffect } from 'react';
import toast from '../utils/toast';

// Maximum recording duration: 2 hours (in seconds)
const MAX_RECORDING_DURATION = 7200;

export function useRecording({ isInVoice, localAudioStream, remoteStreams, currentRoom, voiceWsRef, globalAudioContextRef }) {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const recordingChunksRef = useRef([]);
    const mediaRecorderRef = useRef(null);
    const recordingIntervalRef = useRef(null);
    const recordingAudioCtxRef = useRef(null);

    // 🔥 Helper: Send recording_state consent signal to all users in voice channel
    const sendRecordingState = useCallback((recording) => {
        if (voiceWsRef?.current?.readyState === WebSocket.OPEN) {
            voiceWsRef.current.send(JSON.stringify({
                type: 'recording_state',
                is_recording: recording
            }));
        }
    }, [voiceWsRef]);

    // 🔥 YENİ: Start Recording
    const startRecording = useCallback(() => {
        if (!isInVoice || isRecording) {
            console.warn('[Recording] Cannot start - not in voice or already recording');
            return;
        }

        try {
            // 🔥 FIX: Reuse globalAudioContextRef if available, otherwise create one
            let audioContext;
            if (globalAudioContextRef?.current && globalAudioContextRef.current.state !== 'closed') {
                audioContext = globalAudioContextRef.current;
                if (audioContext.state === 'suspended') {
                    audioContext.resume();
                }
            } else {
                audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 48000 });
            }
            recordingAudioCtxRef.current = audioContext;

            const destination = audioContext.createMediaStreamDestination();

            // Add local audio
            if (localAudioStream) {
                const localSource = audioContext.createMediaStreamSource(localAudioStream);
                localSource.connect(destination);
            }

            // Add all remote audio streams
            Object.entries(remoteStreams).forEach(([key, stream]) => {
                if (!key.includes('_camera') && !key.includes('_screen')) {
                    const audioTracks = stream.getAudioTracks();
                    if (audioTracks.length > 0) {
                        const remoteSource = audioContext.createMediaStreamSource(stream);
                        remoteSource.connect(destination);
                    }
                }
            });

            // Create MediaRecorder
            const mediaRecorder = new MediaRecorder(destination.stream, {
                mimeType: 'audio/webm;codecs=opus',
                audioBitsPerSecond: 128000
            });

            recordingChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordingChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordingChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `pawscord-voice-${currentRoom}-${Date.now()}.webm`;
                a.click();
                URL.revokeObjectURL(url);
            };

            mediaRecorder.start(1000); // Collect data every second
            mediaRecorderRef.current = mediaRecorder;
            setIsRecording(true);
            setRecordingDuration(0);

            // 🔥 Broadcast consent signal — other users will see "🔴 X is recording"
            sendRecordingState(true);

            // Start duration counter
            recordingIntervalRef.current = setInterval(() => {
                setRecordingDuration(prev => {
                    const next = prev + 1;
                    // 🔥 Auto-stop after max duration
                    if (next >= MAX_RECORDING_DURATION) {
                        toast.warning('Kayıt maksimum süreye ulaştı (2 saat). Otomatik durduruluyor.');
                        // Schedule stop for next tick to avoid state mutation inside setState
                        setTimeout(() => stopRecordingInternal(), 0);
                    }
                    return next;
                });
            }, 1000);

        } catch (error) {
            console.error('[Recording] Start error:', error);
            toast.error('Kayıt başlatılamadı: ' + error.message);
        }
    }, [isInVoice, isRecording, localAudioStream, remoteStreams, currentRoom, globalAudioContextRef, sendRecordingState]);

    // Internal stop logic (called from startRecording max duration timer and stopRecording)
    const stopRecordingInternal = useCallback(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
        }

        if (recordingIntervalRef.current) {
            clearInterval(recordingIntervalRef.current);
            recordingIntervalRef.current = null;
        }

        mediaRecorderRef.current = null;
        setIsRecording(false);
        setRecordingDuration(0);

        // 🔥 Broadcast recording stopped
        sendRecordingState(false);
    }, [sendRecordingState]);

    // 🔥 YENİ: Stop Recording (public API)
    const stopRecording = useCallback(() => {
        if (!isRecording) return;
        stopRecordingInternal();
    }, [isRecording, stopRecordingInternal]);

    // 🔥 YENİ: Download Recording Manually
    const downloadRecording = useCallback(() => {
        if (recordingChunksRef.current.length === 0) {
            toast.warning('Henüz kayıt yok!');
            return;
        }

        const blob = new Blob(recordingChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `pawscord-voice-${currentRoom || 'recording'}-${Date.now()}.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [currentRoom]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (recordingIntervalRef.current) {
                clearInterval(recordingIntervalRef.current);
            }
        };
    }, []);

    return {
        isRecording,
        recordingDuration,
        startRecording,
        stopRecording,
        downloadRecording,
    };
}

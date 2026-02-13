import { useState, useCallback, useRef } from 'react';
import toast from '../utils/toast';

export function useRecording({ isInVoice, localAudioStream, remoteStreams, currentRoom }) {
    const [isRecording, setIsRecording] = useState(false);
    const [recordingDuration, setRecordingDuration] = useState(0);
    const recordingChunksRef = useRef([]);
    const mediaRecorderRef = useRef(null);
    const recordingIntervalRef = useRef(null);

    // 🔥 YENİ: Start Recording
    const startRecording = useCallback(() => {
        if (!isInVoice || isRecording) {
            console.warn('[Recording] Cannot start - not in voice or already recording');
            return;
        }

        try {
            // Combine local and remote streams for recording
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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

            // Start duration counter
            recordingIntervalRef.current = setInterval(() => {
                setRecordingDuration(prev => prev + 1);
            }, 1000);

        } catch (error) {
            console.error('[Recording] Start error:', error);
            toast.error('Kayıt başlatılamadı: ' + error.message);
        }
    }, [isInVoice, isRecording, localAudioStream, remoteStreams, currentRoom]);

    // 🔥 YENİ: Stop Recording
    const stopRecording = useCallback(() => {
        if (!isRecording) {
            return;
        }

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
    }, [isRecording]);

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

    return {
        isRecording,
        recordingDuration,
        startRecording,
        stopRecording,
        downloadRecording,
    };
}

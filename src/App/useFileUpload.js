/**
 * 📁 useFileUpload — File upload + drag/drop + voice recording
 * Extracted from App.js
 */
import { useState, useRef, useCallback } from 'react';
import toast from '../utils/toast';
import { getTemporaryId, calculateFileHash } from '../config/api';

export default function useFileUpload({
    activeChat, username, fetchWithAuth, scrollToBottom,
    setMessages, API_BASE_URL,
    handleDMClick, conversations, categories,
}) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [pendingFilesFromDrop, setPendingFilesFromDrop] = useState([]);
    const [isRecordingVoice, setIsRecordingVoice] = useState(false);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const dragCounterRef = useRef(0);

    // --- 📤 UPLOAD FILE (R2 MULTIPART) ---
    const uploadFile = useCallback(async (file, isVoice = false, duration = 0, targetOverride = null) => {
        const showProgress = file.size >= 5 * 1024 * 1024;
        if (showProgress) { setIsUploading(true); setUploadProgress(0); }

        const target = targetOverride || activeChat;
        const tempId = getTemporaryId();

        try {
            const hash = await calculateFileHash(file);
            const contentType = file.type || 'application/octet-stream';
            const CHUNK_SIZE = 10 * 1024 * 1024;
            const PARALLEL_UPLOADS = 5;
            const totalParts = Math.ceil(file.size / CHUNK_SIZE);

            // 1. Init multipart
            const initRes = await fetchWithAuth(`${API_BASE_URL}/upload/multipart/init/`, {
                method: 'POST',
                body: JSON.stringify({
                    file_name: file.name, file_size: file.size, content_type: contentType,
                    file_hash: hash, room_slug: target.type === 'room' ? target.id : null,
                    conversation_id: target.type === 'dm' ? target.id : null,
                    temp_id: tempId, is_voice_message: isVoice ? 'true' : 'false', duration: duration.toString()
                })
            });
            const initData = await initRes.json();

            if (initData.file_exists) {
                if (showProgress) { setIsUploading(false); setUploadProgress(100); }
                if (initData.id && target.id === activeChat.id) {
                    setMessages(prev => {
                        if (initData.temp_id) {
                            const idx = prev.findIndex(msg => msg.temp_id === initData.temp_id);
                            if (idx !== -1) { const n = [...prev]; n[idx] = initData; return n; }
                        }
                        if (prev.some(msg => msg.id === initData.id)) return prev;
                        return [...prev, initData];
                    });
                    scrollToBottom('smooth');
                }
                return;
            }

            const { upload_id, key } = initData;

            // 2. Upload parts
            const parts = [];
            let completedParts = 0;

            const uploadPart = async (partNumber) => {
                const start = (partNumber - 1) * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);

                const formData = new FormData();
                formData.append('upload_id', upload_id);
                formData.append('key', key);
                formData.append('part_number', partNumber.toString());
                formData.append('chunk', chunk, `part_${partNumber}`);

                const uploadRes = await fetchWithAuth(`${API_BASE_URL}/upload/multipart/upload-part/`, {
                    method: 'POST', body: formData, headers: {}
                });
                if (!uploadRes.ok) throw new Error(`Part ${partNumber} upload failed`);

                const { etag, part_number } = await uploadRes.json();
                completedParts++;
                if (showProgress) setUploadProgress(Math.round((completedParts / totalParts) * 95));
                return { ETag: etag, PartNumber: part_number };
            };

            for (let i = 0; i < totalParts; i += PARALLEL_UPLOADS) {
                const batch = [];
                for (let j = 0; j < PARALLEL_UPLOADS && (i + j) < totalParts; j++) batch.push(uploadPart(i + j + 1));
                const batchResults = await Promise.all(batch);
                parts.push(...batchResults);
            }
            parts.sort((a, b) => a.PartNumber - b.PartNumber);

            // 3. Complete multipart
            const completeRes = await fetchWithAuth(`${API_BASE_URL}/upload/multipart/complete/`, {
                method: 'POST',
                body: JSON.stringify({
                    upload_id, key, parts, file_name: file.name, file_hash: hash,
                    room_slug: target.type === 'room' ? target.id : null,
                    conversation_id: target.type === 'dm' ? target.id : null,
                    temp_id: tempId, is_voice_message: isVoice ? 'true' : 'false', duration: duration.toString()
                })
            });
            if (!completeRes.ok) throw new Error(`Complete failed: ${await completeRes.text()}`);

            const data = await completeRes.json();
            if (showProgress) setUploadProgress(100);

            if (target.id === activeChat.id) {
                setMessages(prev => {
                    if (data.temp_id) {
                        const idx = prev.findIndex(msg => msg.temp_id === data.temp_id);
                        if (idx !== -1) { const n = [...prev]; n[idx] = data; return n; }
                    }
                    if (data.id && prev.some(msg => msg.id === data.id)) return prev;
                    return [...prev, data];
                });
                scrollToBottom('smooth');
            }
        } catch (e) {
            console.error('❌ [R2 Multipart] Error:', e);
            toast.error(`Yükleme hatası: ${e.message}`);
        }
        if (showProgress) setIsUploading(false);
    }, [activeChat, fetchWithAuth]);

    // --- 🎤 VOICE RECORDING (uses R2 multipart via uploadFile) ---
    const recordingStartRef = useRef(null);

    const startVoiceRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // 🔧 iOS Safari: prefer audio/mp4 if webm not supported
            let mimeType = 'audio/webm;codecs=opus';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'audio/webm';
                if (!MediaRecorder.isTypeSupported(mimeType)) {
                    mimeType = 'audio/mp4'; // iOS Safari fallback
                    if (!MediaRecorder.isTypeSupported(mimeType)) {
                        mimeType = ''; // Let browser pick default
                    }
                }
            }

            const options = mimeType ? { mimeType } : {};
            mediaRecorderRef.current = new MediaRecorder(stream, options);
            audioChunksRef.current = [];
            recordingStartRef.current = Date.now();

            mediaRecorderRef.current.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
            mediaRecorderRef.current.onstop = async () => {
                const actualMime = mediaRecorderRef.current?.mimeType || mimeType || 'audio/webm';
                const ext = actualMime.includes('mp4') ? 'mp4' : 'webm';
                const audioBlob = new Blob(audioChunksRef.current, { type: actualMime });

                // Calculate actual duration
                const duration = recordingStartRef.current
                    ? Math.round((Date.now() - recordingStartRef.current) / 1000)
                    : 0;
                recordingStartRef.current = null;

                // 🔧 FIX: Use R2 multipart upload instead of legacy chunked endpoint
                const fileName = `voice_${Date.now()}.${ext}`;
                const voiceFile = new File([audioBlob], fileName, { type: actualMime });
                await uploadFile(voiceFile, true, duration);

                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecordingVoice(true);
        } catch (error) {
            console.error('Error starting voice recording:', error);
            if (error.name === 'NotAllowedError') toast.warning('Mikrofon erişimi reddedildi!');
            else if (error.name === 'NotFoundError') toast.warning('Mikrofon bulunamadı!');
            else toast.error('Mikrofon hatası: ' + error.message);
        }
    }, [uploadFile]);

    const stopVoiceRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecordingVoice) {
            mediaRecorderRef.current.stop();
            setIsRecordingVoice(false);
        }
    }, [isRecordingVoice]);

    // --- 🖱️ DRAG & DROP ---
    const handleChatDrop = useCallback((e) => {
        e.preventDefault(); e.stopPropagation();
        dragCounterRef.current = 0;
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // 🔧 FIX: Revoke old blob URLs before creating new ones to prevent memory leak
            setPendingFilesFromDrop(prev => {
                prev.forEach(f => { if (f.previewUrl) URL.revokeObjectURL(f.previewUrl); });
                return [];
            });
            const files = Array.from(e.dataTransfer.files);
            const processedFiles = files.map(file => ({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file, name: file.name, size: file.size, type: file.type,
                previewUrl: (file.type.startsWith('image/') || file.type.startsWith('video/')) ? URL.createObjectURL(file) : null
            }));
            setPendingFilesFromDrop(processedFiles);
        }
    }, []);

    const handleChatDragEnter = useCallback((e) => {
        e.preventDefault(); dragCounterRef.current++; setIsDragging(true);
    }, []);

    const handleChatDragLeave = useCallback((e) => {
        e.preventDefault(); dragCounterRef.current--;
        if (dragCounterRef.current <= 0) { dragCounterRef.current = 0; setIsDragging(false); }
    }, []);

    return {
        isDragging, setIsDragging,
        isUploading, uploadProgress,
        pendingFilesFromDrop, setPendingFilesFromDrop,
        isRecordingVoice,
        uploadFile, startVoiceRecording, stopVoiceRecording,
        handleChatDrop, handleChatDragEnter, handleChatDragLeave,
        dragCounterRef,
    };
}

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

    // --- 🎤 VOICE RECORDING ---
    const startVoiceRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const options = { mimeType: 'audio/webm;codecs=opus' };
            if (!MediaRecorder.isTypeSupported(options.mimeType)) options.mimeType = 'audio/webm';

            mediaRecorderRef.current = new MediaRecorder(stream, options);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm;codecs=opus' });
                await sendVoiceMessage(audioBlob);
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
    }, []);

    const stopVoiceRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecordingVoice) {
            mediaRecorderRef.current.stop();
            setIsRecordingVoice(false);
        }
    }, [isRecordingVoice]);

    const sendVoiceMessage = useCallback(async (audioBlob) => {
        const fileName = `voice_${Date.now()}.webm`;
        const uploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const formData = new FormData();
        formData.append('chunk', audioBlob);
        formData.append('upload_id', uploadId);
        formData.append('chunk_index', '0');
        formData.append('total_chunks', '1');
        formData.append('file_name', fileName);
        formData.append('is_voice_message', 'true');
        if (activeChat.type === 'room') formData.append('room_slug', activeChat.id);
        else if (activeChat.type === 'dm') formData.append('conversation_id', activeChat.id);

        try {
            const response = await fetchWithAuth(`${API_BASE_URL}/messages/upload_file/`, { method: 'POST', body: formData });
            if (!response.ok) throw new Error('Upload failed');
        } catch (error) {
            console.error('Error uploading voice message:', error);
            toast.error('Ses mesajı gönderilemedi');
        }
    }, [activeChat, fetchWithAuth]);

    // --- 🖱️ DRAG & DROP ---
    const handleChatDrop = useCallback((e) => {
        e.preventDefault(); e.stopPropagation();
        dragCounterRef.current = 0;
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
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

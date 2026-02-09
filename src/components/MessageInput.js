// frontend/src/components/MessageInput.js
import React, { useState, useRef, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import toast from '../utils/toast';
import { FaPaperPlane, FaPaperclip, FaMicrophone, FaSmile, FaImage, FaTimes, FaFileAlt, FaClock, FaPlus, FaCode } from 'react-icons/fa';
import EmojiPicker from './EmojiPicker';
// ⚡ OPTIMIZATION: Lazy load GifPicker (heavy component) 
// Using local R2 GIF picker (not Tenor)
const GifPicker = lazy(() => import('../GifPicker'));
import MessageTemplateModal from './MessageTemplateModal';
import ScheduledMessageModal from './ScheduledMessageModal';
import MarkdownPreviewToggle from './MarkdownPreviewToggle';
import ChatAutocomplete from './ChatAutocomplete';
import { useChatStore } from '../stores/useChatStore';
import '../styles/MessageInputMobile.css';

// ⚡ OPTIMIZATION: Performance hooks
import { useDebounce, useMeasurePerformance } from '../utils/performanceOptimization';
// 🖼️ OPTIMIZATION: Image compression
import { compressChatImage } from '../utils/imageCompression';

const MessageInput = ({
    onSendMessage,
    onFileUpload,
    onShowCodeSnippet = null, // 🆕 Code snippet modal için
    placeholder = "Mesaj yaz...",
    editingMessage = null,
    onCancelEdit = null,
    replyingTo = null,
    onCancelReply = null,
    disabled = false,
    activeChat = null, // 🆕 Draft için gerekli
    fetchWithAuth = null, // 🆕 Draft için gerekli
    apiBaseUrl = '', // 🆕 Draft için gerekli
    pendingFilesFromDrop = [], // 🆕 AppContent'ten gelen sürükle-bırak dosyaları
    onClearPendingFiles = null // 🆕 Sürükle-bırak dosyalarını temizle
}) => {
    // ⚡ PERFORMANCE: Measure component render performance
    useMeasurePerformance('MessageInput');

    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false); // 🆕 Templates
    const [showScheduled, setShowScheduled] = useState(false); // 🆕 Scheduled
    const [showMarkdownPreview, setShowMarkdownPreview] = useState(false); // 🆕 Markdown Preview
    const [showMobileMenu, setShowMobileMenu] = useState(false); // 🆕 Mobil açılır menü
    const [isRecording, setIsRecording] = useState(false);
    const [isRecordingLocked, setIsRecordingLocked] = useState(false); // 🎤 Kayıt kilitlendi mi
    const [recordingTime, setRecordingTime] = useState(0);
    const [draftSaved, setDraftSaved] = useState(false); // 🆕 Draft kaydedildi mi?
    const [touchStartY, setTouchStartY] = useState(0); // 🎤 Touch başlangıç pozisyonu
    const [currentTouchY, setCurrentTouchY] = useState(0); // 🎤 Mevcut touch pozisyonu
    const [slideProgress, setSlideProgress] = useState(0); // 🎤 0-1 arası kaydırma ilerlemesi
    const [isDragging, setIsDragging] = useState(false); // 🆕 Drag & Drop state
    const [pendingFiles, setPendingFiles] = useState([]); // 🆕 Dosya önizleme için bekleyen dosyalar
    const [cursorPos, setCursorPos] = useState(0); // 🆕 Autocomplete cursor tracking

    // 🆕 Store data for autocomplete
    const onlineUsers = useChatStore(state => state.onlineUsers);

    // ⚡ PERFORMANCE: Debounce message state for draft saving (500ms delay)
    const debouncedMessage = useDebounce(message, 500);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordingTimerRef = useRef(null);
    const draftTimerRef = useRef(null); // 🆕 Draft timer
    const micButtonRef = useRef(null); // 🎤 Mikrofon butonu ref
    const isRecordingRef = useRef(false); // 🎤 Document event handler için
    const isRecordingLockedRef = useRef(false); // 🎤 Document event handler için
    const touchStartYRef = useRef(0); // 🎤 Document event handler için

    // 🆕 AppContent'ten gelen sürükle-bırak dosyalarını pendingFiles'a ekle
    useEffect(() => {
        if (pendingFilesFromDrop && pendingFilesFromDrop.length > 0) {
            setPendingFiles(prev => [...prev, ...pendingFilesFromDrop]);
            // Parent'taki state'i temizle (duplicate önlemek için)
            if (onClearPendingFiles) {
                onClearPendingFiles();
            }
        }
    }, [pendingFilesFromDrop, onClearPendingFiles]);

    // 📱 APK FIX: Prevent scroll issues on mobile
    useEffect(() => {
        if (window.Capacitor) {
            const handleFocus = () => {
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            };
            const handleBlur = () => {
                document.body.style.position = '';
                document.body.style.width = '';
            };

            textareaRef.current?.addEventListener('focus', handleFocus);
            textareaRef.current?.addEventListener('blur', handleBlur);

            return () => {
                textareaRef.current?.removeEventListener('focus', handleFocus);
                textareaRef.current?.removeEventListener('blur', handleBlur);
            };
        }
    }, []);

    // Düzenleme modunda mesajı yükle
    useEffect(() => {
        if (editingMessage) {
            setMessage(editingMessage.content || '');
            textareaRef.current?.focus();
        }
    }, [editingMessage]);

    // 🆕 Menü dışına tıklayınca kapat
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showMobileMenu && !e.target.closest('.mobile-menu-container') && !e.target.closest('button')) {
                setShowMobileMenu(false);
            }
        };

        if (showMobileMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showMobileMenu]);

    // Textarea auto-resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';

            // 📱 APK FIX: Scroll into view on mobile when typing
            if (window.Capacitor && textareaRef.current === document.activeElement) {
                setTimeout(() => {
                    textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            }
        }
    }, [message]);

    // 🆕 Draft Yükleme - Chat değiştiğinde
    useEffect(() => {
        if (!activeChat || !fetchWithAuth || !apiBaseUrl) return;
        // 🔥 FIX: Sadece room ve dm tipleri için draft yükle
        if (activeChat.type !== 'room' && activeChat.type !== 'dm') return;

        const loadDraft = async () => {
            try {
                const chatKey = activeChat.type === 'room' ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
                const response = await fetchWithAuth(`${apiBaseUrl}/api/drafts/${chatKey}/`);

                if (response.ok) {
                    const data = await response.json();
                    if (data.content) {
                        setMessage(data.content);
                        setDraftSaved(true);
                    }
                }
            } catch (error) {
                console.log('Draft yükleme hatası:', error);
            }
        };

        loadDraft();
    }, [activeChat, fetchWithAuth, apiBaseUrl]);

    // 🆕 Draft Auto-Save - Her 2 saniyede
    useEffect(() => {
        if (!activeChat || !fetchWithAuth || !apiBaseUrl) return;
        // 🔥 FIX: Sadece room ve dm tipleri için draft kaydet
        if (activeChat.type !== 'room' && activeChat.type !== 'dm') return;
        if (!message.trim()) return; // Boş mesaj için kaydetme

        // Clear previous timer
        if (draftTimerRef.current) {
            clearTimeout(draftTimerRef.current);
        }

        // Set new timer
        draftTimerRef.current = setTimeout(async () => {
            try {
                const chatKey = activeChat.type === 'room' ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
                await fetchWithAuth(`${apiBaseUrl}/api/drafts/save/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_key: chatKey,
                        content: message
                    })
                });
                setDraftSaved(true);

                // 1 saniye sonra draft saved badge'i gizle
                setTimeout(() => setDraftSaved(false), 1000);
            } catch (error) {
                console.log('Draft kaydetme hatası:', error);
            }
        }, 2000);

        return () => {
            if (draftTimerRef.current) {
                clearTimeout(draftTimerRef.current);
            }
        };
    }, [message, activeChat, fetchWithAuth, apiBaseUrl]);

    // 🆕 Bekleyen dosyaları gönder (handleSubmit'den önce tanımlanmalı)
    const sendPendingFiles = useCallback(async (filesToSend) => {
        if (!filesToSend || filesToSend.length === 0) return;

        for (const pendingFile of filesToSend) {
            const file = pendingFile.file;

            // 🖼️ If it's an image, compress it first
            if (file.type.startsWith('image/')) {
                try {
                    console.log('🖼️ [MessageInput] Compressing image...');
                    const compressedBlob = await compressChatImage(file);
                    const compressedFile = new File([compressedBlob], file.name, { type: 'image/webp' });

                    console.log('🖼️ [MessageInput] Compression complete:', {
                        original: `${(file.size / 1024).toFixed(2)}KB`,
                        compressed: `${(compressedBlob.size / 1024).toFixed(2)}KB`,
                        savings: `${(((file.size - compressedBlob.size) / file.size) * 100).toFixed(1)}%`
                    });

                    // ✅ await ile sıralı yükle (database lock önleme)
                    if (onFileUpload) await onFileUpload(compressedFile);
                } catch (error) {
                    console.error('❌ [MessageInput] Compression failed, using original:', error);
                    if (onFileUpload) await onFileUpload(file);
                }
            } else {
                // Non-image files: upload directly
                // ✅ await ile sıralı yükle (database lock önleme)
                if (onFileUpload) await onFileUpload(file);
            }

            // URL'i temizle
            if (pendingFile.previewUrl) {
                URL.revokeObjectURL(pendingFile.previewUrl);
            }
        }

        if (filesToSend.length > 1) {
            toast.success(`✅ ${filesToSend.length} dosya yükleniyor...`);
        }
    }, [onFileUpload]);

    const handleSubmit = useCallback(async (e) => {
        e?.preventDefault();
        const trimmedMessage = message.trim();

        // 🆕 Bekleyen dosya varsa önce onları gönder
        if (pendingFiles.length > 0) {
            const filesToSend = [...pendingFiles]; // Kopyasını al
            setPendingFiles([]); // Hemen temizle
            await sendPendingFiles(filesToSend);
        }

        if (!trimmedMessage && pendingFiles.length === 0) return;
        if (disabled) return;

        if (trimmedMessage) {
            onSendMessage(trimmedMessage);
            setMessage('');
        }

        // 🆕 Draft'i temizle
        if (activeChat && fetchWithAuth && apiBaseUrl && (activeChat.type === 'room' || activeChat.type === 'dm')) {
            const chatKey = activeChat.type === 'room' ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
            fetchWithAuth(`${apiBaseUrl}/api/drafts/${chatKey}/`, {
                method: 'DELETE'
            }).catch(console.error);
        }

        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    }, [message, disabled, onSendMessage, activeChat, fetchWithAuth, apiBaseUrl, pendingFiles, sendPendingFiles]);

    const handleKeyDown = useCallback((e) => {
        // Ctrl+Enter veya sadece Enter (Shift yoksa)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }

        // 🆕 Feature 6: Arrow Up to edit last message
        if (e.key === 'ArrowUp' && !message.trim() && !editingMessage) {
            // Empty input + ArrowUp = edit last own message
            e.preventDefault();
            // Dispatch custom event - App.js will handle finding the last message
            window.dispatchEvent(new CustomEvent('pawscord:editLastMessage'));
        }

        // 🆕 Ctrl+T - Templates
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            setShowTemplates(true);
        }

        // Escape tuşu ile düzenleme/yanıt iptal
        if (e.key === 'Escape') {
            if (editingMessage && onCancelEdit) {
                onCancelEdit();
            }
            if (replyingTo && onCancelReply) {
                onCancelReply();
            }
        }
    }, [editingMessage, onCancelEdit, replyingTo, onCancelReply, handleSubmit, message]);

    const handleEmojiSelect = useCallback((emoji) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newMessage = message.substring(0, start) + emoji + message.substring(end);
        setMessage(newMessage);

        // Cursor pozisyonunu ayarla
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
            textarea.focus();
        }, 0);

        setShowEmojiPicker(false);
    }, [message]);

    const handleGifSelect = useCallback((gifUrl) => {
        onSendMessage(`[GIF:${gifUrl}]`);
        setShowGifPicker(false);
    }, [onSendMessage]);

    const handleFileClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileChange = useCallback(async (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // 🆕 Dosyaları önizleme listesine ekle (hemen yükleme)
        const processedFiles = [];
        for (const file of files) {
            // Önizleme URL'i oluştur
            const previewUrl = file.type.startsWith('image/') || file.type.startsWith('video/')
                ? URL.createObjectURL(file)
                : null;

            processedFiles.push({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                previewUrl
            });
        }

        setPendingFiles(prev => [...prev, ...processedFiles]);
        e.target.value = ''; // Reset input
    }, []);

    // 🆕 Bekleyen dosyayı sil
    const removePendingFile = useCallback((fileId) => {
        setPendingFiles(prev => {
            const file = prev.find(f => f.id === fileId);
            if (file?.previewUrl) {
                URL.revokeObjectURL(file.previewUrl);
            }
            return prev.filter(f => f.id !== fileId);
        });
    }, []);

    // 🆕 Drag & Drop handlers
    const dragCounter = useRef(0);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current++;
        setIsDragging(true);
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current--;

        // 🔥 FIX: Sadece tüm drag eventleri bittiğinde animasyonu kaldır
        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback(async (e) => {
        e.preventDefault();
        e.stopPropagation();
        dragCounter.current = 0; // 🔥 FIX: Drop sonrası counter'ı sıfırla
        setIsDragging(false);

        const files = Array.from(e.dataTransfer?.files || []);
        if (files.length === 0) return;

        // 🆕 Dosyaları önizleme listesine ekle (hemen yükleme)
        const processedFiles = [];
        for (const file of files) {
            // Önizleme URL'i oluştur
            const previewUrl = file.type.startsWith('image/') || file.type.startsWith('video/')
                ? URL.createObjectURL(file)
                : null;

            processedFiles.push({
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file,
                name: file.name,
                size: file.size,
                type: file.type,
                previewUrl
            });
        }

        setPendingFiles(prev => [...prev, ...processedFiles]);
    }, []);

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

            recordingTimerRef.current = setInterval(() => {
                setRecordingTime(t => t + 1);
            }, 1000);
        } catch (err) {
            console.error('Mikrofon erişim hatası:', err);
            toast.error('❌ Mikrofona erişim reddedildi!');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsRecordingLocked(false);
            clearInterval(recordingTimerRef.current);
        }
    };

    const cancelRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            const stream = mediaRecorderRef.current.stream;
            mediaRecorderRef.current.onstop = null; // Override to prevent file upload
            mediaRecorderRef.current.stop();
            stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            setIsRecordingLocked(false);
            clearInterval(recordingTimerRef.current);
        }
    };

    // 🎤 Mikrofon butonu gesture handlers
    const LOCK_THRESHOLD = 80; // px yukarı kaydırma eşiği

    // 🔥 FIX: Ref'leri state ile senkron tut (document event listener'lar state closure yakalar)
    useEffect(() => {
        isRecordingRef.current = isRecording;
    }, [isRecording]);
    useEffect(() => {
        isRecordingLockedRef.current = isRecordingLocked;
    }, [isRecordingLocked]);

    // 🔥 FIX: Document-level mouse/touch event handlers
    // Mic butonu recording başlayınca DOM'dan kalkıyor, bu yüzden document üzerinden dinliyoruz
    useEffect(() => {
        if (!isRecording || isRecordingLocked) return;

        const handleDocMouseMove = (e) => {
            if (!isRecordingRef.current || isRecordingLockedRef.current) return;
            const startY = touchStartYRef.current;
            const deltaY = startY - e.clientY;
            const progress = Math.min(Math.max(deltaY / LOCK_THRESHOLD, 0), 1);
            setSlideProgress(progress);
            setCurrentTouchY(e.clientY);
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
        };

        const handleDocTouchMove = (e) => {
            if (!isRecordingRef.current || isRecordingLockedRef.current) return;
            const currentY = e.touches[0].clientY;
            const startY = touchStartYRef.current;
            const deltaY = startY - currentY;
            const progress = Math.min(Math.max(deltaY / LOCK_THRESHOLD, 0), 1);
            setSlideProgress(progress);
            setCurrentTouchY(currentY);
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

    const handleMicMouseDown = (e) => {
        e.preventDefault();
        touchStartYRef.current = e.clientY;
        setTouchStartY(e.clientY);
        setCurrentTouchY(e.clientY);
        setSlideProgress(0);
        startRecording();
    };

    const handleMicTouchStart = (e) => {
        e.preventDefault();
        const startY = e.touches[0].clientY;
        touchStartYRef.current = startY;
        setTouchStartY(startY);
        setCurrentTouchY(startY);
        setSlideProgress(0);
        startRecording();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div
            style={styles.container}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* 🆕 Drag & Drop Overlay */}
            {isDragging && (
                <div style={styles.dragOverlay}>
                    <div style={styles.dragContent}>
                        <FaPaperclip style={{ fontSize: '48px' }} />
                        <h3>Dosyaları buraya bırak</h3>
                        <p>Çoklu dosya yüklemesi destekleniyor</p>
                    </div>
                </div>
            )}

            {/* Reply Preview */}
            {replyingTo && (
                <div style={styles.replyPreview}>
                    <div style={styles.replyContent}>
                        <strong>@{replyingTo.author}</strong>
                        <span>{replyingTo.content?.substring(0, 50)}...</span>
                    </div>
                    <button onClick={onCancelReply} style={styles.cancelButton}>
                        <FaTimes />
                    </button>
                </div>
            )}

            {/* Edit Preview */}
            {editingMessage && (
                <div style={styles.editPreview}>
                    <span>📝 Mesaj düzenleniyor</span>
                    <button onClick={onCancelEdit} style={styles.cancelButton}>
                        <FaTimes />
                    </button>
                </div>
            )}

            {/* 🆕 Draft Saved Indicator */}
            {draftSaved && !editingMessage && (
                <div style={styles.draftSaved}>
                    ✅ Taslak kaydedildi
                </div>
            )}

            {/* 🆕 Pending Files Preview */}
            {pendingFiles.length > 0 && (
                <div style={styles.pendingFilesContainer}>
                    <div style={styles.pendingFilesHeader}>
                        <span>📎 {pendingFiles.length} dosya bekliyor</span>
                        <button
                            onClick={() => setPendingFiles([])}
                            style={styles.clearAllButton}
                            title="Tümünü temizle"
                        >
                            Tümünü Kaldır
                        </button>
                    </div>
                    <div style={styles.pendingFilesList}>
                        {pendingFiles.map((file) => (
                            <div key={file.id} style={styles.pendingFileItem}>
                                {/* Önizleme */}
                                {file.previewUrl && file.type.startsWith('image/') ? (
                                    <img
                                        src={file.previewUrl}
                                        alt={file.name}
                                        style={styles.filePreviewImage}
                                    />
                                ) : file.previewUrl && file.type.startsWith('video/') ? (
                                    <video
                                        src={file.previewUrl}
                                        style={styles.filePreviewVideo}
                                        muted
                                    />
                                ) : (
                                    <div style={styles.filePreviewIcon}>
                                        <FaFileAlt size={24} />
                                    </div>
                                )}
                                <div style={styles.fileInfo}>
                                    <span style={styles.fileName}>{file.name.length > 20 ? file.name.substring(0, 17) + '...' : file.name}</span>
                                    <span style={styles.fileSize}>{(file.size / 1024).toFixed(1)} KB</span>
                                </div>
                                <button
                                    onClick={() => removePendingFile(file.id)}
                                    style={styles.removeFileButton}
                                    title="Dosyayı kaldır"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Input Area */}
            <div style={styles.inputWrapper}>
                {/* Left Actions - Açılır Menü (Tüm Platformlar) */}
                <div style={styles.leftActions}>
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            style={{
                                ...styles.actionButton,
                                backgroundColor: showMobileMenu ? 'rgba(88, 101, 242, 0.2)' : 'transparent',
                                color: showMobileMenu ? '#5865f2' : '#b9bbbe'
                            }}
                            title="Seçenekler"
                            disabled={disabled}
                        >
                            <FaPlus />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            multiple
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            accept="image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
                        />

                        {/* Açılır Menü */}
                        {showMobileMenu && (
                            <div style={styles.mobileMenu} className="mobile-menu-container">
                                <button
                                    onClick={() => {
                                        handleFileClick();
                                        setShowMobileMenu(false);
                                    }}
                                    style={styles.mobileMenuItem}
                                    className="mobile-menu-item"
                                    disabled={disabled}
                                >
                                    <FaPaperclip />
                                    <span>Dosya Ekle</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setShowEmojiPicker(!showEmojiPicker);
                                        setShowGifPicker(false);
                                        setShowMobileMenu(false);
                                    }}
                                    style={styles.mobileMenuItem}
                                    className="mobile-menu-item"
                                    disabled={disabled}
                                >
                                    <FaSmile />
                                    <span>Emoji Ekle</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setShowGifPicker(!showGifPicker);
                                        setShowEmojiPicker(false);
                                        setShowMobileMenu(false);
                                    }}
                                    style={styles.mobileMenuItem}
                                    className="mobile-menu-item"
                                    disabled={disabled}
                                >
                                    <FaImage />
                                    <span>GIF Ekle</span>
                                </button>
                                {onShowCodeSnippet && (
                                    <button
                                        onClick={() => {
                                            onShowCodeSnippet();
                                            setShowMobileMenu(false);
                                        }}
                                        style={styles.mobileMenuItem}
                                        className="mobile-menu-item"
                                        disabled={disabled}
                                    >
                                        <FaCode />
                                        <span>Kod Snippet</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setShowTemplates(true);
                                        setShowMobileMenu(false);
                                    }}
                                    style={styles.mobileMenuItem}
                                    className="mobile-menu-item"
                                    disabled={disabled}
                                >
                                    <FaFileAlt />
                                    <span>Şablon (Ctrl+T)</span>
                                </button>
                                <button
                                    onClick={() => {
                                        setShowScheduled(true);
                                        setShowMobileMenu(false);
                                    }}
                                    style={styles.mobileMenuItem}
                                    className="mobile-menu-item"
                                    disabled={disabled || !message.trim()}
                                >
                                    <FaClock />
                                    <span>Zamanla</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* 📝 Markdown Preview Toggle */}
                <MarkdownPreviewToggle
                    text={message}
                    isPreviewMode={showMarkdownPreview}
                    onToggle={() => setShowMarkdownPreview(prev => !prev)}
                />

                {/* 🔥 Autocomplete Popup */}
                <ChatAutocomplete
                    message={message}
                    cursorPosition={cursorPos}
                    users={onlineUsers || []}
                    channels={activeChat?.rooms || []}
                    textareaRef={textareaRef}
                    onSelect={(newText, newCursorPos) => {
                        setMessage(newText);
                        setCursorPos(newCursorPos);
                        setTimeout(() => {
                            if (textareaRef.current) {
                                textareaRef.current.selectionStart = newCursorPos;
                                textareaRef.current.selectionEnd = newCursorPos;
                                textareaRef.current.focus();
                            }
                        }, 0);
                    }}
                />

                {/* Text Input */}
                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); setCursorPos(e.target.selectionStart); }}
                    onKeyDown={handleKeyDown}
                    onSelect={(e) => setCursorPos(e.target.selectionStart)}
                    onKeyUp={(e) => setCursorPos(e.target.selectionStart)}
                    onPaste={(e) => {
                        // 🆕 Feature 4: Clipboard image paste (Ctrl+V)
                        const items = e.clipboardData?.items;
                        if (!items) return;
                        const imageItems = Array.from(items).filter(i => i.type.startsWith('image/'));
                        if (imageItems.length > 0) {
                            e.preventDefault();
                            imageItems.forEach(item => {
                                const file = item.getAsFile();
                                if (file) {
                                    const previewUrl = URL.createObjectURL(file);
                                    setPendingFiles(prev => [...prev, { file, previewUrl, name: file.name || 'pasted-image.png', size: file.size, type: file.type }]);
                                }
                            });
                            toast.success('📋 Görsel yapıştırıldı!');
                        }
                    }}
                    placeholder={placeholder}
                    style={styles.textarea}
                    disabled={disabled}
                    rows={1}
                />

                {/* Right Actions */}
                <div style={styles.rightActions}>
                    {/* Emoji/GIF Picker Container - Menüden açılır */}
                    {showEmojiPicker && (
                        <div style={styles.pickerWrapper}>
                            <EmojiPicker onSelect={handleEmojiSelect} />
                        </div>
                    )}
                    {showGifPicker && (
                        <div style={styles.pickerWrapper}>
                            <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center', color: '#b9bbbe' }}>GIF yükleniyor...</div>}>
                                <GifPicker
                                    onSelect={handleGifSelect}
                                    onClose={() => setShowGifPicker(false)}
                                    localGifListUrl={`${apiBaseUrl || window.location.origin + '/api'}/gifs/list_local/`}
                                    absoluteHostUrl={window.location.origin}
                                    fetchWithAuth={fetchWithAuth}
                                />
                            </Suspense>
                        </div>
                    )}

                    {/* 🎤 Voice Recording Button or Send Button */}
                    {!message.trim() && !isRecording && pendingFiles.length === 0 ? (
                        <button
                            ref={micButtonRef}
                            onMouseDown={handleMicMouseDown}
                            onTouchStart={handleMicTouchStart}
                            style={styles.micButton}
                            className="mic-button action-button"
                            title="Basılı tut — yukarı kaydır kilitle"
                            disabled={disabled}
                        >
                            <FaMicrophone />
                        </button>
                    ) : isRecording ? (
                        <div style={styles.recordingContainer} className="rec-container-glow">
                            {/* Waveform background animation */}
                            <div style={styles.waveformBg} className="rec-waveform">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="rec-wave-bar" style={{
                                        animationDelay: `${i * 0.08}s`,
                                        opacity: 0.4 + Math.random() * 0.6,
                                    }} />
                                ))}
                            </div>

                            {/* Left: pulsing dot + timer */}
                            <div style={styles.recLeft}>
                                <div style={styles.recordingDot} className="rec-pulse" />
                                <span style={styles.recordingTime}>{formatTime(recordingTime)}</span>
                            </div>

                            {!isRecordingLocked ? (
                                /* Slide-to-lock indicator */
                                <div style={styles.slideToLock}>
                                    <div
                                        style={{
                                            ...styles.slideMicCircle,
                                            backgroundColor: slideProgress > 0.7
                                                ? '#43b581'
                                                : `rgba(237, 66, 69, ${0.6 + slideProgress * 0.4})`,
                                            transform: `scale(${1 + slideProgress * 0.3}) translateY(${-slideProgress * 20}px)`,
                                            boxShadow: slideProgress > 0.5
                                                ? '0 0 12px rgba(67,181,129,0.5)'
                                                : '0 0 8px rgba(237,66,69,0.3)',
                                        }}
                                    >
                                        {slideProgress > 0.7 ? '🔒' : <FaMicrophone style={{ color: 'white', fontSize: '14px' }} />}
                                    </div>
                                    <div style={styles.slideTrack}>
                                        <div style={{
                                            ...styles.slideTrackFill,
                                            height: `${slideProgress * 100}%`,
                                            backgroundColor: slideProgress > 0.7 ? '#43b581' : '#ed4245',
                                        }} />
                                    </div>
                                    <span style={{
                                        ...styles.slideLabel,
                                        color: slideProgress > 0.7 ? '#43b581' : '#72767d',
                                    }}>
                                        {slideProgress > 0.7 ? 'Bırak → Kilitle' : '↑ Kilitle'}
                                    </span>
                                </div>
                            ) : (
                                /* Locked state — cancel & send buttons */
                                <div style={styles.lockedActions}>
                                    <span style={styles.lockedBadge}>🔒 Kilitlendi</span>
                                    <button
                                        onClick={cancelRecording}
                                        style={styles.cancelRecButton}
                                        title="İptal"
                                    >
                                        <FaTimes /> İptal
                                    </button>
                                    <button
                                        onClick={stopRecording}
                                        style={styles.sendVoiceButton}
                                        title="Gönder"
                                    >
                                        <FaPaperPlane /> Gönder
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            style={styles.sendButton}
                            title="Gönder (Enter)"
                            disabled={disabled}
                        >
                            <FaPaperPlane />
                        </button>
                    )}
                </div>
            </div>

            {/* 🆕 Message Templates Modal */}
            {showTemplates && (
                <MessageTemplateModal
                    onClose={() => setShowTemplates(false)}
                    onSelect={(template) => {
                        setMessage(template);
                        setShowTemplates(false);
                    }}
                />
            )}

            {/* 🆕 Scheduled Message Modal */}
            {showScheduled && (
                <ScheduledMessageModal
                    message={message}
                    room={activeChat}
                    onClose={() => setShowScheduled(false)}
                    onSchedule={(scheduledTime) => {
                        console.log('Message scheduled for:', scheduledTime);
                        setShowScheduled(false);
                        setMessage('');
                    }}
                />
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#383a40',
        borderRadius: '8px',
        padding: window.innerWidth <= 768 ? '6px' : '8px', // 🔥 Mobilde az padding
        margin: window.innerWidth <= 768 ? '8px' : '16px', // 🔥 Mobilde az margin
    },
    replyPreview: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        borderLeft: '3px solid #5865f2',
        borderRadius: '4px',
        marginBottom: '8px',
        fontSize: '0.9em',
    },
    replyContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    editPreview: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: 'rgba(250, 166, 26, 0.1)',
        borderLeft: '3px solid #faa61a',
        borderRadius: '4px',
        marginBottom: '8px',
        fontSize: '0.9em',
    },
    recordingIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: 'rgba(237, 66, 69, 0.1)',
        borderRadius: '4px',
        marginBottom: '8px',
    },
    recordingPulse: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#ed4245',
    },
    stopButton: {
        padding: '6px 12px',
        backgroundColor: '#ed4245',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: 'auto',
    },
    cancelButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px 8px',
        transition: 'color 0.2s',
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '4px', // 🔥 Mobil için gap azaltıldı (8px -> 4px)
    },
    leftActions: {
        display: 'flex',
        gap: '2px', // 🔥 Mobil için gap azaltıldı (4px -> 2px)
        marginBottom: '4px',
        flexShrink: 0, // 🔥 Küçülmesin
    },
    rightActions: {
        display: 'flex',
        gap: '2px', // 🔥 Mobil için gap azaltıldı (4px -> 2px)
        marginBottom: '4px',
        flexShrink: 0, // 🔥 Küçülmesin
        flexWrap: 'wrap', // 🔥 Mobilde sığmazsa alt satıra geçsin
    },
    actionButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: window.innerWidth <= 768 ? '16px' : '20px', // 🔥 Mobilde küçük
        padding: window.innerWidth <= 768 ? '6px' : '8px', // 🔥 Mobilde az padding
        borderRadius: '4px',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: window.innerWidth <= 768 ? '32px' : '36px', // 🔥 Mobilde min genişlik
        minHeight: window.innerWidth <= 768 ? '32px' : '36px', // 🔥 Mobilde min yükseklik
    },
    sendButton: {
        background: '#5865f2',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '10px 12px',
        borderRadius: '4px',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textarea: {
        flex: 1,
        background: '#40444b',
        border: 'none',
        outline: 'none',
        color: '#dcddde',
        fontSize: window.innerWidth <= 768 ? '14px' : '15px', // 🔥 Mobilde biraz küçük
        padding: window.innerWidth <= 768 ? '8px 10px' : '11px', // 🔥 Mobilde az padding
        borderRadius: '8px',
        resize: 'none',
        fontFamily: 'inherit',
        lineHeight: '1.375',
        maxHeight: '200px',
        overflowY: 'auto',
        minWidth: 0, // 🔥 Mobilde flex shrink sorunu için
    },
    pickerWrapper: {
        position: 'absolute',
        bottom: '100%',
        right: 0,
        marginBottom: '8px',
        zIndex: 1000,
        boxShadow: '0 8px 16px rgba(0,0,0,0.24)',
        borderRadius: '8px',
    },
    mobileMenu: {
        position: 'absolute',
        bottom: '110%',
        left: 0,
        backgroundColor: '#2b2d31',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '8px',
        minWidth: '200px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    mobileMenuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        textAlign: 'left',
        width: '100%',
        whiteSpace: 'nowrap',
    },
    draftSaved: {
        position: 'absolute',
        top: '-30px',
        right: '10px',
        fontSize: '0.75em',
        color: '#43b581',
        backgroundColor: 'rgba(67, 181, 129, 0.1)',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #43b581',
        animation: 'fadeIn 0.3s ease-in-out',
    },
    // 🎤 Voice Recording Styles
    micButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: window.innerWidth <= 768 ? '18px' : '20px',
        padding: window.innerWidth <= 768 ? '6px' : '8px',
        borderRadius: '50%',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        minWidth: window.innerWidth <= 768 ? '36px' : '40px',
        minHeight: window.innerWidth <= 768 ? '36px' : '40px',
    },
    recordingContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        flex: 1,
        backgroundColor: 'rgba(237, 66, 69, 0.06)',
        borderRadius: '12px',
        padding: '10px 16px',
        border: '1px solid rgba(237, 66, 69, 0.25)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
    },
    waveformBg: {
        position: 'absolute',
        left: '80px',
        right: '120px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        height: '24px',
        pointerEvents: 'none',
        zIndex: 0,
    },
    recLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 1,
    },
    recordingDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#ed4245',
    },
    recordingTime: {
        fontSize: '15px',
        color: '#ed4245',
        fontWeight: '700',
        fontVariantNumeric: 'tabular-nums',
        minWidth: '44px',
        letterSpacing: '0.5px',
    },
    slideToLock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        marginLeft: 'auto',
        zIndex: 1,
        cursor: 'default',
    },
    slideMicCircle: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s ease',
        fontSize: '14px',
    },
    slideTrack: {
        width: '4px',
        height: '22px',
        borderRadius: '2px',
        backgroundColor: 'rgba(114, 118, 125, 0.25)',
        overflow: 'hidden',
        position: 'relative',
    },
    slideTrackFill: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        borderRadius: '2px',
        transition: 'height 0.05s linear',
    },
    slideLabel: {
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'color 0.15s ease',
        whiteSpace: 'nowrap',
    },
    lockedActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginLeft: 'auto',
        zIndex: 1,
    },
    lockedBadge: {
        fontSize: '12px',
        color: '#43b581',
        backgroundColor: 'rgba(67, 181, 129, 0.15)',
        padding: '4px 10px',
        borderRadius: '12px',
        fontWeight: '700',
        border: '1px solid rgba(67,181,129,0.3)',
    },
    cancelRecButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '7px 14px',
        backgroundColor: 'rgba(237, 66, 69, 0.12)',
        color: '#ed4245',
        border: '1px solid rgba(237, 66, 69, 0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.15s',
    },
    sendVoiceButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '7px 14px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.15s',
        boxShadow: '0 2px 8px rgba(88,101,242,0.3)',
    },
    // 🆕 Pending Files Styles
    pendingFilesContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: '8px',
        marginBottom: '8px',
    },
    pendingFilesHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        fontSize: '12px',
        color: '#b9bbbe',
    },
    clearAllButton: {
        background: 'none',
        border: 'none',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '11px',
        padding: '4px 8px',
        borderRadius: '4px',
        transition: 'background 0.2s',
    },
    pendingFilesList: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        maxHeight: '200px',
        overflowY: 'auto',
    },
    pendingFileItem: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#40444b',
        borderRadius: '8px',
        padding: '8px',
        width: '100px',
        gap: '4px',
    },
    filePreviewImage: {
        width: '80px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    filePreviewVideo: {
        width: '80px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    filePreviewIcon: {
        width: '80px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b2d31',
        borderRadius: '4px',
        color: '#b9bbbe',
    },
    fileInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
    },
    fileName: {
        fontSize: '10px',
        color: '#dcddde',
        textAlign: 'center',
        wordBreak: 'break-all',
    },
    fileSize: {
        fontSize: '9px',
        color: '#72767d',
    },
    removeFileButton: {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#ed4245',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        transition: 'transform 0.2s',
    },
    // 🆕 Drag & Drop Overlay Styles
    dragOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(88, 101, 242, 0.9)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        pointerEvents: 'none',
    },
    dragContent: {
        textAlign: 'center',
        color: 'white',
        padding: '20px',
    },
    // Duplicate keys removed - already defined above
};

// Add pulse animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* 🎤 Recording container glow */
    .rec-container-glow {
        animation: recGlow 2s ease-in-out infinite;
    }
    @keyframes recGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(237, 66, 69, 0); border-color: rgba(237, 66, 69, 0.25); }
        50% { box-shadow: 0 0 16px 2px rgba(237, 66, 69, 0.12); border-color: rgba(237, 66, 69, 0.45); }
    }

    /* 🎤 Recording pulse dot */
    .rec-pulse {
        animation: recPulse 1s ease-in-out infinite;
    }
    @keyframes recPulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(237, 66, 69, 0.6); }
        50% { transform: scale(1.2); box-shadow: 0 0 0 8px rgba(237, 66, 69, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(237, 66, 69, 0); }
    }
    
    /* 🎤 Waveform bars */
    .rec-waveform {
        display: flex !important;
    }
    .rec-wave-bar {
        width: 3px;
        border-radius: 2px;
        background: linear-gradient(180deg, #ed4245 0%, #f04747 50%, #ed4245 100%);
        animation: waveBar 0.8s ease-in-out infinite alternate;
    }
    @keyframes waveBar {
        0% { height: 4px; opacity: 0.3; }
        50% { height: 18px; opacity: 0.7; }
        100% { height: 6px; opacity: 0.4; }
    }
    
    /* 🎤 Mic button hover/active states */
    .mic-button:hover {
        color: #ed4245 !important;
        background: rgba(237, 66, 69, 0.1) !important;
    }
    .mic-button:active {
        transform: scale(1.15);
        color: #ed4245 !important;
        background: rgba(237, 66, 69, 0.2) !important;
    }
    
    textarea::-webkit-scrollbar {
        width: 8px;
    }
    
    textarea::-webkit-scrollbar-thumb {
        background: #202225;
        border-radius: 4px;
    }
    
    textarea::-webkit-scrollbar-thumb:hover {
        background: #18191c;
    }
    
    .action-button:hover {
        color: #dcddde;
        background-color: rgba(79, 84, 92, 0.4);
    }
`;
document.head.appendChild(styleSheet);

// 🚀 Performans optimizasyonu: Gereksiz re-render'ları önle
export default React.memo(MessageInput, (prevProps, nextProps) => {
    // Sadece bu prop'lar değişirse re-render et
    return (
        prevProps.disabled === nextProps.disabled &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.editingMessage?.id === nextProps.editingMessage?.id &&
        prevProps.replyingTo?.id === nextProps.replyingTo?.id &&
        prevProps.activeChat?.id === nextProps.activeChat?.id
    );
});




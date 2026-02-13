// frontend/src/components/MessageInput.js
import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
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
import styles from './MessageInput/styles';
import useVoiceRecording from '../hooks/useVoiceRecording';
import useDragDrop from '../hooks/useDragDrop';

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
    const [draftSaved, setDraftSaved] = useState(false); // 🆕 Draft kaydedildi mi?
    const [pendingFiles, setPendingFiles] = useState([]); // 🆕 Dosya önizleme için bekleyen dosyalar
    const [cursorPos, setCursorPos] = useState(0); // 🆕 Autocomplete cursor tracking

    // 🎤 Voice Recording Hook
    const {
        isRecording, isRecordingLocked, recordingTime, slideProgress,
        micButtonRef, handleMicMouseDown, handleMicTouchStart,
        stopRecording, cancelRecording, formatTime,
    } = useVoiceRecording(onFileUpload);

    // 🆕 Drag & Drop Hook
    const { isDragging, dragHandlers } = useDragDrop((files) => {
        const processedFiles = files.map(file => ({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            previewUrl: (file.type.startsWith('image/') || file.type.startsWith('video/'))
                ? URL.createObjectURL(file) : null,
        }));
        setPendingFiles(prev => [...prev, ...processedFiles]);
    });

    // 🆕 Store data for autocomplete
    const onlineUsers = useChatStore(state => state.onlineUsers);

    // ⚡ PERFORMANCE: Debounce message state for draft saving (500ms delay)
    const debouncedMessage = useDebounce(message, 500);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const draftTimerRef = useRef(null); // 🆕 Draft timer

    // 🆕 AppContent'ten gelen sürükle-bırak dosyaları → sendPendingFiles tanımlandıktan sonra useEffect var (aşağıda)

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

    // 🔥 FIX: Chat değiştiğinde bekleyen dosyaları temizle
    useEffect(() => {
        setPendingFiles([]);
    }, [activeChat?.id, activeChat?.type]);

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
                    const compressedBlob = await compressChatImage(file);
                    const compressedFile = new File([compressedBlob], file.name, { type: 'image/webp' });


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

    // 🆕 AppContent'ten gelen sürükle-bırak dosyalarını ÖNİZLEMEYE EKLE
    useEffect(() => {
        if (pendingFilesFromDrop && pendingFilesFromDrop.length > 0) {
            // Parent'taki state'i temizle
            if (onClearPendingFiles) {
                onClearPendingFiles();
            }
            // 📋 Dosyaları önizleme listesine ekle (kullanıcı gönder/iptal seçer)
            setPendingFiles(prev => [...prev, ...pendingFilesFromDrop]);
        }
    }, [pendingFilesFromDrop, onClearPendingFiles]);

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

    return (
        <div
            style={styles.container}
            {...dragHandlers}
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
                        setShowScheduled(false);
                        setMessage('');
                    }}
                />
            )}
        </div>
    );
};

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




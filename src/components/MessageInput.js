// frontend/src/components/MessageInput.js
import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import toast from '../utils/toast';
import { FaPaperclip, FaTimes } from 'react-icons/fa';
import EmojiPicker from './EmojiPicker';
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
import { useDebounce, useMeasurePerformance } from '../utils/performanceOptimization';
import { compressChatImage } from '../utils/imageCompression';
import PendingFilesPreview from './MessageInput/PendingFilesPreview';
import InputMenu from './MessageInput/InputMenu';
import VoiceRecordingUI from './MessageInput/VoiceRecordingUI';
import useMessageDraft from './MessageInput/hooks/useMessageDraft';

const MessageInput = ({
    onSendMessage, onFileUpload, onShowCodeSnippet = null,
    placeholder = "Mesaj yaz...", editingMessage = null, onCancelEdit = null,
    replyingTo = null, onCancelReply = null, disabled = false,
    activeChat = null, fetchWithAuth = null, apiBaseUrl = '',
    pendingFilesFromDrop = [], onClearPendingFiles = null
}) => {
    useMeasurePerformance('MessageInput');

    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showScheduled, setShowScheduled] = useState(false);
    const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [pendingFiles, setPendingFiles] = useState([]);
    const [cursorPos, setCursorPos] = useState(0);

    const {
        isRecording, isRecordingLocked, recordingTime, slideProgress,
        micButtonRef, handleMicMouseDown, handleMicTouchStart,
        stopRecording, cancelRecording, formatTime,
    } = useVoiceRecording(onFileUpload);

    const { isDragging, dragHandlers } = useDragDrop((files) => {
        const processedFiles = files.map(file => ({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file, name: file.name, size: file.size, type: file.type,
            previewUrl: (file.type.startsWith('image/') || file.type.startsWith('video/')) ? URL.createObjectURL(file) : null,
        }));
        setPendingFiles(prev => [...prev, ...processedFiles]);
    });

    const onlineUsers = useChatStore(state => state.onlineUsers);
    const debouncedMessage = useDebounce(message, 500);
    const textareaRef = useRef(null);

    const { draftSaved, clearDraft } = useMessageDraft(activeChat, fetchWithAuth, apiBaseUrl, message, setMessage);

    // Capacitor scroll fix
    useEffect(() => {
        if (window.Capacitor) {
            const el = textareaRef.current;
            const handleFocus = () => { document.body.style.position = 'fixed'; document.body.style.width = '100%'; };
            const handleBlur = () => { document.body.style.position = ''; document.body.style.width = ''; };
            el?.addEventListener('focus', handleFocus);
            el?.addEventListener('blur', handleBlur);
            return () => { el?.removeEventListener('focus', handleFocus); el?.removeEventListener('blur', handleBlur); };
        }
    }, []);

    useEffect(() => {
        if (editingMessage) { setMessage(editingMessage.content || ''); textareaRef.current?.focus(); }
    }, [editingMessage]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showMobileMenu && !e.target.closest('.mobile-menu-container') && !e.target.closest('button')) setShowMobileMenu(false);
        };
        if (showMobileMenu) { document.addEventListener('mousedown', handleClickOutside); document.addEventListener('touchstart', handleClickOutside); }
        return () => { document.removeEventListener('mousedown', handleClickOutside); document.removeEventListener('touchstart', handleClickOutside); };
    }, [showMobileMenu]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
            if (window.Capacitor && textareaRef.current === document.activeElement)
                setTimeout(() => textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
        }
    }, [message]);

    useEffect(() => { setPendingFiles([]); }, [activeChat?.id, activeChat?.type]);

    useEffect(() => {
        if (pendingFilesFromDrop?.length > 0) {
            if (onClearPendingFiles) onClearPendingFiles();
            setPendingFiles(prev => [...prev, ...pendingFilesFromDrop]);
        }
    }, [pendingFilesFromDrop, onClearPendingFiles]);

    const sendPendingFiles = useCallback(async (filesToSend) => {
        if (!filesToSend?.length) return;
        for (const pf of filesToSend) {
            const file = pf.file;
            if (file.type.startsWith('image/')) {
                try {
                    const compressed = await compressChatImage(file);
                    const compressedFile = new File([compressed], file.name, { type: 'image/webp' });
                    if (onFileUpload) await onFileUpload(compressedFile);
                } catch { if (onFileUpload) await onFileUpload(file); }
            } else { if (onFileUpload) await onFileUpload(file); }
            if (pf.previewUrl) URL.revokeObjectURL(pf.previewUrl);
        }
        if (filesToSend.length > 1) toast.success(`$([char]0x2705) ${filesToSend.length} dosya y$([char]0x00FC)kleniyor...`);
    }, [onFileUpload]);

    const handleSubmit = useCallback(async (e) => {
        e?.preventDefault();
        const trimmed = message.trim();
        if (pendingFiles.length > 0) {
            const toSend = [...pendingFiles]; setPendingFiles([]); await sendPendingFiles(toSend);
        }
        if (!trimmed && pendingFiles.length === 0) return;
        if (disabled) return;
        if (trimmed) { onSendMessage(trimmed); setMessage(''); }
        clearDraft();
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }, [message, disabled, onSendMessage, pendingFiles, sendPendingFiles, clearDraft]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
        if (e.key === 'ArrowUp' && !message.trim() && !editingMessage) {
            e.preventDefault(); window.dispatchEvent(new CustomEvent('pawscord:editLastMessage'));
        }
        if (e.ctrlKey && e.key === 't') { e.preventDefault(); setShowTemplates(true); }
        if (e.key === 'Escape') {
            if (editingMessage && onCancelEdit) onCancelEdit();
            if (replyingTo && onCancelReply) onCancelReply();
        }
    }, [editingMessage, onCancelEdit, replyingTo, onCancelReply, handleSubmit, message]);

    const handleEmojiSelect = useCallback((emoji) => {
        const ta = textareaRef.current; const s = ta.selectionStart; const end = ta.selectionEnd;
        setMessage(message.substring(0, s) + emoji + message.substring(end));
        setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + emoji.length; ta.focus(); }, 0);
        setShowEmojiPicker(false);
    }, [message]);

    const handleGifSelect = useCallback((gifUrl) => { onSendMessage(`[GIF:${gifUrl}]`); setShowGifPicker(false); }, [onSendMessage]);

    const removePendingFile = useCallback((fileId) => {
        setPendingFiles(prev => {
            const f = prev.find(x => x.id === fileId);
            if (f?.previewUrl) URL.revokeObjectURL(f.previewUrl);
            return prev.filter(x => x.id !== fileId);
        });
    }, []);

    return (
        <div style={styles.container} {...dragHandlers}>
            {isDragging && (
                <div style={styles.dragOverlay}><div style={styles.dragContent}>
                    <FaPaperclip style={{ fontSize: '48px' }} />
                    <h3>Dosyalar$([char]0x0131) buraya b$([char]0x0131)rak</h3>
                    <p>$([char]0x00C7)oklu dosya y$([char]0x00FC)klemesi destekleniyor</p>
                </div></div>
            )}

            {replyingTo && (
                <div style={styles.replyPreview}><div style={styles.replyContent}>
                    <strong>@{replyingTo.author}</strong>
                    <span>{replyingTo.content?.substring(0, 50)}...</span>
                </div><button onClick={onCancelReply} style={styles.cancelButton}><FaTimes /></button></div>
            )}

            {editingMessage && (
                <div style={styles.editPreview}>
                    <span>{'📝'} Mesaj d$([char]0x00FC)zenleniyor</span>
                    <button onClick={onCancelEdit} style={styles.cancelButton}><FaTimes /></button>
                </div>
            )}

            {draftSaved && !editingMessage && <div style={styles.draftSaved}>{'✅'} Taslak kaydedildi</div>}

            <PendingFilesPreview pendingFiles={pendingFiles} setPendingFiles={setPendingFiles} removePendingFile={removePendingFile} />

            <div style={styles.inputWrapper}>
                <InputMenu
                    showMobileMenu={showMobileMenu} setShowMobileMenu={setShowMobileMenu}
                    setShowEmojiPicker={setShowEmojiPicker} setShowGifPicker={setShowGifPicker}
                    setShowTemplates={setShowTemplates} setShowScheduled={setShowScheduled}
                    onShowCodeSnippet={onShowCodeSnippet}
                    disabled={disabled} message={message} setPendingFiles={setPendingFiles}
                    showEmojiPicker={showEmojiPicker} showGifPicker={showGifPicker}
                />

                <MarkdownPreviewToggle text={message} isPreviewMode={showMarkdownPreview}
                    onToggle={() => setShowMarkdownPreview(prev => !prev)} />

                <ChatAutocomplete message={message} cursorPosition={cursorPos}
                    users={onlineUsers || []} channels={activeChat?.rooms || []}
                    textareaRef={textareaRef}
                    onSelect={(newText, newCursorPos) => {
                        setMessage(newText); setCursorPos(newCursorPos);
                        setTimeout(() => { if (textareaRef.current) { textareaRef.current.selectionStart = newCursorPos; textareaRef.current.selectionEnd = newCursorPos; textareaRef.current.focus(); } }, 0);
                    }} />

                <textarea ref={textareaRef} value={message}
                    onChange={(e) => { setMessage(e.target.value); setCursorPos(e.target.selectionStart); }}
                    onKeyDown={handleKeyDown}
                    onSelect={(e) => setCursorPos(e.target.selectionStart)}
                    onKeyUp={(e) => setCursorPos(e.target.selectionStart)}
                    onPaste={(e) => {
                        const items = e.clipboardData?.items;
                        if (!items) return;
                        const imageItems = Array.from(items).filter(i => i.type.startsWith('image/'));
                        if (imageItems.length > 0) {
                            e.preventDefault();
                            imageItems.forEach(item => {
                                const file = item.getAsFile();
                                if (file) setPendingFiles(prev => [...prev, { file, previewUrl: URL.createObjectURL(file), name: file.name || 'pasted-image.png', size: file.size, type: file.type }]);
                            });
                            toast.success(`$([char]0xD83D)$([char]0xDCCB) G$([char]0x00F6)rsel yap$([char]0x0131)$([char]0x015F)t$([char]0x0131)r$([char]0x0131)ld$([char]0x0131)!`);
                        }
                    }}
                    placeholder={placeholder} style={styles.textarea} disabled={disabled} rows={1} />

                <div style={styles.rightActions}>
                    {showEmojiPicker && <div style={styles.pickerWrapper}><EmojiPicker onSelect={handleEmojiSelect} /></div>}
                    {showGifPicker && (
                        <div style={styles.pickerWrapper}>
                            <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center', color: '#b9bbbe' }}>GIF y$([char]0x00FC)kleniyor...</div>}>
                                <GifPicker onSelect={handleGifSelect} onClose={() => setShowGifPicker(false)}
                                    localGifListUrl={`${apiBaseUrl || window.location.origin + '/api'}/gifs/list_local/`}
                                    absoluteHostUrl={window.location.origin} fetchWithAuth={fetchWithAuth} />
                            </Suspense>
                        </div>
                    )}

                    <VoiceRecordingUI
                        isRecording={isRecording} isRecordingLocked={isRecordingLocked}
                        recordingTime={recordingTime} slideProgress={slideProgress}
                        micButtonRef={micButtonRef} handleMicMouseDown={handleMicMouseDown}
                        handleMicTouchStart={handleMicTouchStart}
                        stopRecording={stopRecording} cancelRecording={cancelRecording} formatTime={formatTime}
                        handleSubmit={handleSubmit} disabled={disabled}
                        hasContent={!!message.trim()} pendingFilesCount={pendingFiles.length}
                    />
                </div>
            </div>

            {showTemplates && <MessageTemplateModal onClose={() => setShowTemplates(false)}
                onSelect={(t) => { setMessage(t); setShowTemplates(false); }} />}

            {showScheduled && <ScheduledMessageModal message={message} room={activeChat}
                onClose={() => setShowScheduled(false)}
                onSchedule={() => { setShowScheduled(false); setMessage(''); }} />}
        </div>
    );
};

export default React.memo(MessageInput, (prevProps, nextProps) => {
    return prevProps.disabled === nextProps.disabled &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.editingMessage?.id === nextProps.editingMessage?.id &&
        prevProps.replyingTo?.id === nextProps.replyingTo?.id &&
        prevProps.activeChat?.id === nextProps.activeChat?.id;
});
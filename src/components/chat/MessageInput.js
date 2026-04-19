// frontend/src/components/MessageInput.js
import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import { FaPaperclip, FaTimes } from 'react-icons/fa';
import EmojiPicker from './EmojiPicker';
const GifPicker = lazy(() => import('../../features/GifPicker'));
import MessageTemplateModal from '../server/MessageTemplateModal';
import ScheduledMessageModal from './ScheduledMessageModal';
import MarkdownPreviewToggle from './MarkdownPreviewToggle';
import ChatAutocomplete from './ChatAutocomplete';
import { useChatStore } from '../../stores/useChatStore';
import '../../styles/MessageInputMobile.css';
import styles from '../MessageInput/styles';
import useVoiceRecording from '../../hooks/useVoiceRecording';
import useDragDrop from '../../hooks/useDragDrop';
import { useDebounce, useMeasurePerformance } from '../../utils/performanceOptimization';
import { compressChatImage } from '../../utils/imageCompression';
import PendingFilesPreview from '../MessageInput/PendingFilesPreview';
import InputMenu from '../MessageInput/InputMenu';
import VoiceRecordingUI from '../MessageInput/VoiceRecordingUI';
import useMessageDraft from '../MessageInput/hooks/useMessageDraft';

const S = {
    txt4: { padding: '20px', textAlign: 'center', color: '#b5bac1' },
    bg: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        padding: 4,
        fontSize: 16,
        lineHeight: 1,
        flexShrink: 0,
    },
    txt3: {
        fontSize: 12,
        color: '#b5bac1',
        marginTop: 2,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    txt2: {
        fontSize: 13,
        fontWeight: 600,
        color: '#f2f3f5',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    txt: {
        fontSize: 11,
        color: '#949ba4',
        marginBottom: 2,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    mar: { width: 24, height: 24, borderRadius: 4, flexShrink: 0, marginTop: 2 },
    border: { width: 56, height: 56, objectFit: 'cover', borderRadius: 6, flexShrink: 0 },
    flex: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
        padding: '8px 12px',
        background: 'rgba(255,255,255,0.04)',
        borderLeft: '3px solid #5865f2',
        borderRadius: '4px',
        margin: '0 0 6px 0',
        position: 'relative',
    },
};

/**
 * @param {Object} props
 * @param {Function} props.onSendMessage - Handler to send a message
 * @param {Function} props.onFileUpload - Handler to upload a file attachment
 * @param {Function} [props.onShowCodeSnippet=null] - Handler to open code snippet modal
 * @param {string} [props.placeholder='Type a message...'] - Input placeholder text
 * @param {Object} [props.editingMessage=null] - Message being edited, or null
 * @param {Function} [props.onCancelEdit=null] - Cancel edit handler
 * @param {Object} [props.replyingTo=null] - Message being replied to, or null
 * @param {Function} [props.onCancelReply=null] - Cancel reply handler
 * @param {boolean} [props.disabled=false] - Whether input is disabled
 * @param {Object} [props.activeChat=null] - Current active chat { type, id }
 * @param {Function} [props.fetchWithAuth=null] - Authenticated fetch wrapper
 * @param {string} [props.apiBaseUrl=''] - API base URL
 * @param {Array} [props.pendingFilesFromDrop=[]] - Files dropped from drag-and-drop
 * @param {Function} [props.onClearPendingFiles=null] - Clear dropped files handler
 */
const MessageInput = ({
    onSendMessage,
    onFileUpload,
    onShowCodeSnippet = null,
    placeholder = 'Type a message...',
    editingMessage = null,
    onCancelEdit = null,
    replyingTo = null,
    onCancelReply = null,
    disabled = false,
    activeChat = null,
    fetchWithAuth = null,
    apiBaseUrl = '',
    pendingFilesFromDrop = [],
    onClearPendingFiles = null,
    ws = null,
    username = null,
}) => {
    const { t } = useTranslation();
    useMeasurePerformance('MessageInput');

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showGifPicker, setShowGifPicker] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showScheduled, setShowScheduled] = useState(false);
    const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);
    const [showMobileeMenu, setShowMobileeMenu] = useState(false);
    const [pendingFiles, setPendingFiles] = useState([]);
    const [cursorPos, setCursorPos] = useState(0);
    const [urlPreview, setUrlPreview] = useState(null);
    const urlPreviewDismissedRef = useRef(null);

    const {
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
    } = useVoiceRecording(onFileUpload);

    const { isDragging, dragHandlers } = useDragDrop((files) => {
        const processedFiles = files.map((file) => ({
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            previewUrl:
                file.type.startsWith('image/') || file.type.startsWith('video/')
                    ? URL.createObjectURL(file)
                    : null,
        }));
        setPendingFiles((prev) => [...prev, ...processedFiles]);
    });

    const onlineUsers = useChatStore((state) => state.onlineUsers);
    const debouncedMessage = useDebounce(message, 500);
    const textareaRef = useRef(null);

    const { draftSaved, clearDraft } = useMessageDraft(
        activeChat,
        fetchWithAuth,
        apiBaseUrl,
        message,
        setMessage
    );

    // --- ⌨️ TYPING INDICATOR ---
    const typingTimeoutRef = useRef(null);
    const isTypingRef = useRef(false);
    const sendTyping = useCallback(
        (isActive) => {
            if (!ws?.current || ws.current.readyState !== WebSocket.OPEN) return;
            if (!activeChat?.id || !username) return;
            try {
                ws.current.send(
                    JSON.stringify({
                        type: isActive ? 'typing_start' : 'typing_stop',
                        username,
                        ...(activeChat.type === 'room'
                            ? { room: activeChat.id }
                            : { conversation: activeChat.id }),
                    })
                );
            } catch {
                /* silently ignore */
            }
        },
        [ws, username, activeChat]
    );

    const handleTypingInput = useCallback(() => {
        if (!isTypingRef.current) {
            isTypingRef.current = true;
            sendTyping(true);
        }
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            if (isTypingRef.current) {
                isTypingRef.current = false;
                sendTyping(false);
            }
        }, 2500);
    }, [sendTyping]);

    // Reset typing state on chat change
    useEffect(() => {
        isTypingRef.current = false;
        clearTimeout(typingTimeoutRef.current);
    }, [activeChat?.id, activeChat?.type]);

    // Capacitor scroll fix
    useEffect(() => {
        if (window.Capacitor) {
            const el = textareaRef.current;
            const handleFocus = () => {
                document.body.style.position = 'fixed';
                document.body.style.width = '100%';
            };
            const handleBlur = () => {
                document.body.style.position = '';
                document.body.style.width = '';
            };
            el?.addEventListener('focus', handleFocus);
            el?.addEventListener('blur', handleBlur);
            return () => {
                el?.removeEventListener('focus', handleFocus);
                el?.removeEventListener('blur', handleBlur);
            };
        }
    }, []);

    useEffect(() => {
        if (editingMessage) {
            setMessage(editingMessage.content || '');
            textareaRef.current?.focus();
        }
    }, [editingMessage]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                showMobileeMenu &&
                !e.target.closest('.mobile-menu-container') &&
                !e.target.closest('button')
            )
                setShowMobileeMenu(false);
        };
        if (showMobileeMenu) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('touchstart', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [showMobileeMenu]);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height =
                Math.min(textareaRef.current.scrollHeight, 200) + 'px';
            if (window.Capacitor && textareaRef.current === document.activeElement)
                setTimeout(
                    () =>
                        textareaRef.current?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                        }),
                    100
                );
        }
    }, [message]);

    useEffect(() => {
        setPendingFiles([]);
    }, [activeChat?.id, activeChat?.type]);

    useEffect(() => {
        if (pendingFilesFromDrop?.length > 0) {
            if (onClearPendingFiles) onClearPendingFiles();
            setPendingFiles((prev) => [...prev, ...pendingFilesFromDrop]);
        }
    }, [pendingFilesFromDrop, onClearPendingFiles]);

    // ─── URL EMBED PREVIEW ──────────────────────────────────────────
    useEffect(() => {
        const URL_REGEX = /https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+/i;
        const match = URL_REGEX.exec(debouncedMessage);

        if (!match) {
            setUrlPreview(null);
            return;
        }

        const url = match[0];
        if (url === urlPreviewDismissedRef.current) return; // user dismissed this URL

        let cancelled = false;
        setUrlPreview({ url, loading: true, title: null, description: null, image: null });

        const load = async () => {
            try {
                let title = null,
                    description = null,
                    image = null;

                if (fetchWithAuth && apiBaseUrl) {
                    const res = await fetchWithAuth(
                        `${apiBaseUrl}/url-preview/?url=${encodeURIComponent(url)}`
                    );
                    if (res.ok) {
                        const data = await res.json();
                        title = data.title;
                        description = data.description;
                        image = data.image;
                    }
                }

                if (!cancelled) {
                    const domain = new URL(url).hostname.replace(/^www\./, '');
                    setUrlPreview({
                        url,
                        loading: false,
                        title: title || domain,
                        description: description || null,
                        image: image || null,
                        domain,
                    });
                }
            } catch {
                if (!cancelled) setUrlPreview(null);
            }
        };

        load();
        return () => {
            cancelled = true;
        };
    }, [debouncedMessage, fetchWithAuth, apiBaseUrl]);

    const sendPendingFiles = useCallback(
        async (filesToSend) => {
            if (!filesToSend?.length) return;
            for (const pf of filesToSend) {
                const file = pf.file;
                if (file.type.startsWith('image/')) {
                    try {
                        const compressed = await compressChatImage(file);
                        const compressedFile = new File([compressed], file.name, {
                            type: 'image/webp',
                        });
                        if (onFileUpload) await onFileUpload(compressedFile);
                    } catch {
                        if (onFileUpload) await onFileUpload(file);
                    }
                } else {
                    if (onFileUpload) await onFileUpload(file);
                }
                if (pf.previewUrl) URL.revokeObjectURL(pf.previewUrl);
            }
            if (filesToSend.length > 1)
                toast.success(t('fileUpload.uploading', { count: filesToSend.length }));
        },
        [onFileUpload]
    );

    const handleSubmit = useCallback(
        async (e) => {
            e?.preventDefault();
            const trimmed = message.trim();
            if (pendingFiles.length > 0) {
                const toSend = [...pendingFiles];
                setPendingFiles([]);
                await sendPendingFiles(toSend);
            }
            if (!trimmed && pendingFiles.length === 0) return;
            if (disabled) return;
            if (trimmed) {
                onSendMessage(trimmed);
                setMessage('');
            }
            clearDraft();
            // Stop typing indicator on send
            clearTimeout(typingTimeoutRef.current);
            if (isTypingRef.current) {
                isTypingRef.current = false;
                sendTyping(false);
            }
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        },
        [message, disabled, onSendMessage, pendingFiles, sendPendingFiles, clearDraft]
    );

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
            }
            if (e.key === 'ArrowUp' && !message.trim() && !editingMessage) {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('pawscord:editLastMessage'));
            }
            if (e.ctrlKey && e.key === 't') {
                e.preventDefault();
                setShowTemplates(true);
            }
            if (e.key === 'Escape') {
                if (editingMessage && onCancelEdit) onCancelEdit();
                if (replyingTo && onCancelReply) onCancelReply();
            }
        },
        [editingMessage, onCancelEdit, replyingTo, onCancelReply, handleSubmit, message]
    );

    const handleEmojiSelect = useCallback(
        (emoji) => {
            const ta = textareaRef.current;
            const s = ta.selectionStart;
            const end = ta.selectionEnd;
            setMessage(message.substring(0, s) + emoji + message.substring(end));
            setTimeout(() => {
                ta.selectionStart = ta.selectionEnd = s + emoji.length;
                ta.focus();
            }, 0);
            setShowEmojiPicker(false);
        },
        [message]
    );

    const handleGifSelect = useCallback(
        (gifUrl) => {
            onSendMessage(`[GIF:${gifUrl}]`);
            setShowGifPicker(false);
        },
        [onSendMessage]
    );

    const removePendingFile = useCallback((fileId) => {
        setPendingFiles((prev) => {
            const f = prev.find((x) => x.id === fileId);
            if (f?.previewUrl) URL.revokeObjectURL(f.previewUrl);
            return prev.filter((x) => x.id !== fileId);
        });
    }, []);

    return (
        <div
            style={styles.container}
            {...dragHandlers}
            role="form"
            aria-label={t('ui.mesaj_gonderme_alani')}
        >
            {isDragging && (
                <div style={styles.dragOverlay}>
                    <div style={styles.dragContent}>
                        <FaPaperclip className="fs-48" />
                        <h3>{t('chat.dropFilesHere', 'Dosyaları buraya bırak')}</h3>
                        <p>{t('chat.multiFileSupported', 'Çoklu dosya yüklemesi destekleniyor')}</p>
                    </div>
                </div>
            )}

            {replyingTo && (
                <div style={styles.replyPreview} role="status" aria-label="Replynan message">
                    <div style={styles.replyContent}>
                        <strong>@{replyingTo.author}</strong>
                        <span>{replyingTo.content?.substring(0, 50)}...</span>
                    </div>
                    <button
                        onClick={onCancelReply}
                        style={styles.cancelButton}
                        aria-label="Cancel reply"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            {editingMessage && (
                <div
                    style={styles.editPreview}
                    role="status"
                    aria-label="Editing message"
                    id="edit-hint"
                >
                    <span>📝 {t('chat.editingMessage', 'Mesaj düzenleniyor')}</span>
                    <button
                        onClick={onCancelEdit}
                        style={styles.cancelButton}
                        aria-label="Cancel edit"
                    >
                        <FaTimes />
                    </button>
                </div>
            )}

            {draftSaved && !editingMessage && <div style={styles.draftSaved}>✅ Draft saved</div>}
            {/* ─── URL EMBED PREVIEW ─── */}
            {urlPreview && !urlPreview.loading && (
                <div style={S.flex}>
                    {urlPreview.image && (
                        <img
                            src={urlPreview.image}
                            alt=""
                            style={S.border}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    )}
                    {!urlPreview.image && (
                        <img
                            src={`https://www.google.com/s2/favicons?domain=${urlPreview.domain}&sz=32`}
                            alt=""
                            style={S.mar}
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    )}
                    <div className="flex-min0">
                        <div style={S.txt}>{urlPreview.domain}</div>
                        {urlPreview.title && <div style={S.txt2}>{urlPreview.title}</div>}
                        {urlPreview.description && (
                            <div style={S.txt3}>{urlPreview.description}</div>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            urlPreviewDismissedRef.current = urlPreview.url;
                            setUrlPreview(null);
                        }}
                        style={S.bg}
                        title="Önizlemeyi kapat"
                        aria-label="URL önizlemesini kapat"
                    >
                        ×
                    </button>
                </div>
            )}

            <PendingFilesPreview
                pendingFiles={pendingFiles}
                setPendingFiles={setPendingFiles}
                removePendingFile={removePendingFile}
            />

            <div style={styles.inputWrapper} className="msg-input-wrapper">
                <InputMenu
                    showMobileeMenu={showMobileeMenu}
                    setShowMobileeMenu={setShowMobileeMenu}
                    setShowEmojiPicker={setShowEmojiPicker}
                    setShowGifPicker={setShowGifPicker}
                    setShowTemplates={setShowTemplates}
                    setShowScheduled={setShowScheduled}
                    onShowCodeSnippet={onShowCodeSnippet}
                    disabled={disabled}
                    message={message}
                    setPendingFiles={setPendingFiles}
                    showEmojiPicker={showEmojiPicker}
                    showGifPicker={showGifPicker}
                />

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

                <textarea
                    ref={textareaRef}
                    value={message}
                    aria-label={
                        editingMessage
                            ? 'Mesaj edit'
                            : replyingTo
                              ? `${replyingTo.author} kullanıcısına yanıt yaz`
                              : placeholder
                    }
                    aria-multiline="true"
                    aria-describedby={editingMessage ? 'edit-hint' : undefined}
                    onChange={(e) => {
                        setMessage(e.target.value);
                        setCursorPos(e.target.selectionStart);
                        handleTypingInput();
                    }}
                    onKeyDown={handleKeyDown}
                    onSelect={(e) => setCursorPos(e.target.selectionStart)}
                    onKeyUp={(e) => setCursorPos(e.target.selectionStart)}
                    onPaste={(e) => {
                        const items = e.clipboardData?.items;
                        if (!items) return;
                        const imageItems = Array.from(items).filter((i) =>
                            i.type.startsWith('image/')
                        );
                        if (imageItems.length > 0) {
                            e.preventDefault();
                            imageItems.forEach((item) => {
                                const file = item.getAsFile();
                                if (file)
                                    setPendingFiles((prev) => [
                                        ...prev,
                                        {
                                            file,
                                            previewUrl: URL.createObjectURL(file),
                                            name:
                                                file.name ||
                                                t('chat.pastedImage', 'pasted-image.png'),
                                            size: file.size,
                                            type: file.type,
                                        },
                                    ]);
                            });
                            toast.success(t('fileUpload.imagePasted'));
                        }
                    }}
                    placeholder={placeholder}
                    style={styles.textarea}
                    disabled={disabled}
                    rows={1}
                    enterKeyHint="send"
                    inputMode="text"
                />

                <div style={styles.rightActions} role="toolbar" aria-label={t('ui.mesaj_araclari')}>
                    {showEmojiPicker && (
                        <div style={styles.pickerWrapper}>
                            <EmojiPicker onSelect={handleEmojiSelect} />
                        </div>
                    )}
                    {showGifPicker && (
                        <div style={styles.pickerWrapper}>
                            <Suspense
                                fallback={
                                    <div style={S.txt4}>
                                        {t('chat.gifLoading', 'GIF yükleniyor...')}
                                    </div>
                                }
                            >
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

                    <MarkdownPreviewToggle
                        text={message}
                        show={showMarkdownPreview}
                        onToggle={() => setShowMarkdownPreview((prev) => !prev)}
                    />

                    <VoiceRecordingUI
                        isRecording={isRecording}
                        isRecordingLocked={isRecordingLocked}
                        recordingTime={recordingTime}
                        slideProgress={slideProgress}
                        cancelProgress={cancelProgress}
                        micButtonRef={micButtonRef}
                        handleMicMouseDown={handleMicMouseDown}
                        handleMicTouchStart={handleMicTouchStart}
                        stopRecording={stopRecording}
                        cancelRecording={cancelRecording}
                        formatTime={formatTime}
                        handleSubmit={handleSubmit}
                        disabled={disabled}
                        hasContent={!!message.trim()}
                        pendingFilesCount={pendingFiles.length}
                    />
                </div>
            </div>

            {showTemplates && (
                <MessageTemplateModal
                    onClose={() => setShowTemplates(false)}
                    onSelect={(t) => {
                        setMessage(t);
                        setShowTemplates(false);
                    }}
                />
            )}
            {showScheduled && (
                <ScheduledMessageModal
                    message={message}
                    room={activeChat}
                    onClose={() => setShowScheduled(false)}
                    onSchedule={() => {
                        setShowScheduled(false);
                        setMessage('');
                    }}
                />
            )}
        </div>
    );
};

const MemoizedMessageInput = React.memo(MessageInput, (prevProps, nextProps) => {
    return (
        prevProps.disabled === nextProps.disabled &&
        prevProps.placeholder === nextProps.placeholder &&
        prevProps.editingMessage?.id === nextProps.editingMessage?.id &&
        prevProps.replyingTo?.id === nextProps.replyingTo?.id &&
        prevProps.activeChat?.id === nextProps.activeChat?.id
    );
});

MemoizedMessageInput.displayName = 'MessageInput';

MemoizedMessageInput.propTypes = {
    onSendMessage: PropTypes.func,
    onFileUpload: PropTypes.func,
    onShowCodeSnippet: PropTypes.func,
    placeholder: PropTypes.string,
    editingMessage: PropTypes.bool,
    onCancelEdit: PropTypes.func,
    replyingTo: PropTypes.object,
    onCancelReply: PropTypes.func,
    disabled: PropTypes.bool,
    activeChat: PropTypes.bool,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    pendingFilesFromDrop: PropTypes.object,
    onClearPendingFiles: PropTypes.func,
    ws: PropTypes.object,
    username: PropTypes.string,
};
export default MemoizedMessageInput;

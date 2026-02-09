// frontend/src/Message.js

import React, { useState, useMemo, useEffect, useRef, memo, useCallback, lazy, Suspense } from 'react';
import {
    FaReply, FaEdit, FaTrash, FaSmile, FaShareSquare,
    FaFileAlt, FaThumbtack, FaCheck, FaDownload, FaLock, FaChartLine, FaBell,
    FaComments, FaExclamationTriangle, FaQuoteLeft
} from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LazyImage from './components/LazyImage'; // 🚀 PERFORMANS: Lazy loading avatarlar
import { useCachedImage } from './utils/imageCaching'; // ⚡ OPTIMIZATION: Image caching

// ⚡ OPTIMIZATION: Lazy load heavy components (not needed immediately)
const ReactionPicker = lazy(() => import(/* webpackChunkName: "message-ui" */ './ReactionPicker'));
const LinkPreview = lazy(() => import(/* webpackChunkName: "message-ui" */ './LinkPreview'));
const CodeBlock = lazy(() => import(/* webpackChunkName: "message-ui" */ './components/CodeBlock'));
const Spoiler = lazy(() => import(/* webpackChunkName: "message-ui" */ './components/Spoiler'));
const VoiceMessagePlayer = lazy(() => import(/* webpackChunkName: "media" */ './components/VoiceMessagePlayer'));
const TicTacToe = lazy(() => import(/* webpackChunkName: "games" */ './components/TicTacToe'));
const FileCodePreview = lazy(() => import(/* webpackChunkName: "message-ui" */ './components/FileCodePreview'));
const BookmarkButton = lazy(() => import(/* webpackChunkName: "message-ui" */ './components/BookmarkButton').then(m => ({ default: m.BookmarkButton })));
const StarButton = lazy(() => import(/* webpackChunkName: "message-ui" */ './components/BookmarkButton').then(m => ({ default: m.StarButton })));
const ReadLaterButton = lazy(() => import(/* webpackChunkName: "message-ui" */ './components/BookmarkButton').then(m => ({ default: m.ReadLaterButton })));
const ReminderModal = lazy(() => import(/* webpackChunkName: "modals" */ './components/ReminderModal'));
const MessageThreads = lazy(() => import(/* webpackChunkName: "message-ui" */ './components/MessageThreads'));
const GameMessage = lazy(() => import(/* webpackChunkName: "games" */ './components/GameMessage'));

// 🔥 File Code Preview utility
import { isCodeFile } from './components/FileCodePreview';

// ✨ Store ve Şifreleme Importları
import { decryptMessage, isEncrypted } from './utils/encryption';
import { useChatStore } from './stores/useChatStore';
import toast from './utils/toast';

// 🔒 GÜVENLİK: XSS Koruması
import { sanitizeHTML, sanitizeMessage } from './utils/security';

// --- YARDIMCI BİLEŞENLER ---

// 1. Tembel Yüklenen Video (Performans İçin) - ⚡ OPTIMIZED: React.memo ile memoize edildi
const LazyVideo = memo(({ src, style }) => {
    const videoRef = useRef(null);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { setShouldLoad(true); observer.disconnect(); }
        }, { threshold: 0.2 });
        if (videoRef.current) observer.observe(videoRef.current);
        return () => { if (videoRef.current) observer.unobserve(videoRef.current); };
    }, []);

    return (
        <div ref={videoRef} style={{ minHeight: '200px', ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000' }}>
            {shouldLoad ? (
                <video controls preload="metadata" src={src} style={style}>
                    Tarayıcınız video oynatmayı desteklemiyor.
                    <a href={src} download>İndir</a>
                </video>
            ) : (
                <span style={{ color: '#aaa' }}>Video Yükleniyor...</span>
            )}
        </div>
    );
});

// 1b. Lazy mount wrapper for heavy children - ⚡ OPTIMIZED: React.memo ile memoize edildi
const LazyMount = memo(({ children, minHeight = 60 }) => {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setShow(true);
                observer.disconnect();
            }
        }, { threshold: 0.1 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{ minHeight }}>
            {show ? children : null}
        </div>
    );
});

// 2. Düzenleme Geçmişi Göstergesi
const EditHistory = ({ messageId, messageEditHistoryUrl, fetchWithAuth }) => {
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const historyRef = useRef(null);

    useEffect(() => {
        if (!showHistory) return;
        const fetchHistory = async () => {
            try {
                const response = await fetchWithAuth(`${messageEditHistoryUrl}${messageId}/edit_history/`);
                if (response.ok) setHistory(await response.json());
            } catch (e) { console.error(e); }
        };
        fetchHistory();
        const handleClickOutside = (e) => {
            if (historyRef.current && !historyRef.current.contains(e.target)) setShowHistory(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showHistory, messageId, messageEditHistoryUrl, fetchWithAuth]);

    return (
        <div style={{ position: 'relative', display: 'inline-block', marginLeft: '5px' }} ref={historyRef}>
            <span
                onClick={(e) => { e.stopPropagation(); setShowHistory(!showHistory); }}
                style={{ fontSize: '0.7em', color: '#72767d', cursor: 'pointer', textDecoration: 'underline' }}
            >
                (düzenlendi)
            </span>
            {showHistory && (
                <div style={styles.historyDropdown}>
                    <h4 style={styles.historyHeader}>Geçmiş ({history.length})</h4>
                    <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {history.map((h, i) => (
                            <div key={i} style={styles.historyItem}>
                                <small>{new Date(h.edited_at).toLocaleString()}</small>
                                <div><del>{h.old_content}</del></div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// 3. Zaman Formatlayıcı
const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const messageDate = new Date(timestamp);
    const now = new Date();
    return messageDate.toDateString() === now.toDateString()
        ? messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : messageDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
};

// --- ANA BİLEŞEN ---
const Message = ({
    msg, currentUser, isAdmin, onDelete, onStartEdit, onToggleReaction, onTogglePin,
    onSetReply, onImageClick, absoluteHostUrl, onScrollToMessage, onVisible,
    messageEditHistoryUrl, onViewProfile, onStartForward, fetchWithAuth,
    isSelectionMode, isSelected, onToggleSelection, allUsers, getDeterministicAvatar, onShowChart,
    // transcription ve isTranscribing prop'larını siliyoruz çünkü içeride yöneteceğiz
    onContentLoad
}) => {

    // 🛡️ GUARD: Bozuk mesaj verisi kontrolü
    if (!msg || typeof msg !== 'object' || !msg.id) {
        console.warn('⚠️ [Message] Invalid message data:', msg);
        return null; // Bozuk mesajı render etme
    }

    // Store'dan Verileri Çek
    const encryptionKeys = useChatStore(state => state.encryptionKeys);
    const currentPermissions = useChatStore(state => state.currentPermissions);

    // ✨ YENİ STATE'LER: Çeviri metni ve yükleniyor durumu
    const [localTranscription, setLocalTranscription] = useState(msg.transcription || null);
    const [localIsTranscribing, setLocalIsTranscribing] = useState(false);
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [showThreadModal, setShowThreadModal] = useState(false);
    const [contextMenu, setContextMenu] = useState(null); // 🆕 Context Menu

    // 🆕 Quote Message Handler
    const handleQuoteMessage = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${absoluteHostUrl}/messages/${msg.id}/quote/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                // Quote message to composer (use msg.content directly to avoid circular dependency)
                const content = msg.content || "";
                const quotedText = `> ${msg.username} said:\n> ${content.split('\n').join('\n> ')}\n\n`;
                // Trigger reply mode with quoted text
                onSetReply({ ...msg, quotedText });
                toast.success('Message quoted!');
            } else {
                toast.error('Failed to quote message');
            }
        } catch (error) {
            console.error('Quote error:', error);
            toast.error('Failed to quote message');
        }
    }, [msg, absoluteHostUrl, fetchWithAuth, onSetReply]);

    const isMyMessage = msg.username === currentUser;
    const isAIMessage = ['Pawscord AI', 'PawPaw AI', '⚡ Signal Bot'].includes(msg.username);
    const messageRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    // 🆕 Context Menu Handler - ⚡ OPTIMIZED: useCallback ile memoize edildi
    const handleContextMenu = useCallback((e) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY
        });
    }, []);

    // 🆕 Close context menu on click outside
    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        if (contextMenu) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [contextMenu]);

    // Görünürlük Kontrolü (Lazy Load vb. için)
    useEffect(() => {
        if (!onVisible || isMyMessage || msg.read_by?.includes(currentUser)) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { onVisible(msg.id); observer.disconnect(); }
        }, { threshold: 0.8 });
        if (messageRef.current) observer.observe(messageRef.current);
        return () => observer.disconnect();
    }, [msg.id, isMyMessage, msg.read_by, onVisible, currentUser]);

    // --- İÇERİK HAZIRLAMA (Şifre Çözme & Link Düzeltme) ---
    const displayContent = useMemo(() => {
        if (!msg.content) return "";
        // 1. Şifreli mi?
        if (isEncrypted(msg.content)) {
            const chatId = msg.room ? `room-${msg.room}` : (msg.conversation ? `dm-${msg.conversation}` : null);
            const secretKey = encryptionKeys[chatId];
            return secretKey ? decryptMessage(msg.content, secretKey) : "🔒 Bu mesaj şifreli. Okumak için anahtarı girin.";
        }
        return msg.content;
    }, [msg.content, msg.room, msg.conversation, encryptionKeys]);

    const isMessageEncrypted = isEncrypted(msg.content);

    // Avatar URL (base)
    const userAvatarBase = useMemo(() => {
        // 1. Önce mesajın kendi avatar field'ına bak (backend'den geliyor)
        let url = msg.avatar;

        // 2. Yoksa allUsers'tan bul
        if (!url) {
            const userObj = allUsers?.find(u => u.username === msg.username);
            url = userObj?.avatar;
        }

        // 3. Hala yoksa deterministic avatar oluştur
        if (!url) {
            url = getDeterministicAvatar(msg.username);
        }

        // 🔥 ui-avatars.com kontrolü - bunlar deterministic avatar'dır, backend'den gelmez
        if (url && url.includes('ui-avatars.com')) {
            return url;
        }

        // R2 URL'leri zaten tam URL olarak geliyor, local path'leri düzelt
        if (url && !url.startsWith('http') && !url.startsWith('blob:')) {
            url = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
        }
        return url;
    }, [msg.avatar, msg.username, allUsers, getDeterministicAvatar, absoluteHostUrl]);

    // ⚡ OPTIMIZATION: Cached avatar (progressive loading)
    const { url: userAvatar } = useCachedImage(userAvatarBase);

    // Medya URL'lerini Düzeltme
    const getFullUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http') || url.startsWith('blob:')) return url;

        // Yerel dosya stream için token ekle
        let finalUrl = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
        if (finalUrl.includes('/media/local/stream/')) {
            const token = localStorage.getItem('access_token');
            if (token) finalUrl += (finalUrl.includes('?') ? '&' : '?') + `token=${token}`;
        }
        return finalUrl;
    };

    const fullImageUrl = getFullUrl(msg.image_url || msg.image);
    const fullFileUrl = getFullUrl(msg.file_url || msg.file);

    // 🖼️ Dosya URL'si varsa ve resim formatıysa, onu image olarak işle
    const isImageFile = useMemo(() => {
        if (!fullFileUrl || fullImageUrl) return false;
        const fileName = (msg.file_name || '').toLowerCase();
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico'];
        return imageExtensions.some(ext => fileName.endsWith(`.${ext}`));
    }, [fullFileUrl, fullImageUrl, msg.file_name]);

    // Eğer file resim ise, onu image URL olarak kullan
    const finalImageUrl = fullImageUrl || (isImageFile ? fullFileUrl : null);
    const finalFileUrl = isImageFile ? null : fullFileUrl; // Resim ise dosya URL'si kullanma

    // Sinyal Botu Coin Linki
    const signalCoin = useMemo(() => {
        if (msg.username === '⚡ Signal Bot' && displayContent) {
            const match = displayContent.match(/\*\*(.*?)\*\*/);
            if (match && match[1]) return match[1];
        }
        return null;
    }, [msg.username, displayContent]);

    // Reaksiyon Gruplama
    const groupedReactions = useMemo(() => {
        if (!msg.reactions) return [];
        const groups = {};
        msg.reactions.forEach(r => {
            if (!groups[r.emoji]) groups[r.emoji] = [];
            groups[r.emoji].push(r.username);
        });
        return Object.entries(groups || {}).map(([emoji, users]) => ({ emoji, users, count: users.length }));
    }, [msg.reactions]);

    const myReaction = useCallback((emoji) => msg.reactions?.some(r => r.username === currentUser && r.emoji === emoji), [msg.reactions, currentUser]);

    // Anket Oy Verme - ⚡ OPTIMIZED: useCallback ile memoize edildi
    const handleVote = useCallback(async (optionId) => {
        if (!msg.poll) return;
        try {
            await fetchWithAuth(`${absoluteHostUrl}/api/polls/${msg.poll.id}/vote/`, {
                method: 'POST',
                body: JSON.stringify({ option_id: optionId })
            });
        } catch (error) { console.error("Oy hatası:", error); }
    }, [msg.poll, fetchWithAuth, absoluteHostUrl]);

    // 🔥 Voice Message Transcription (DÜZELTİLDİ) - ⚡ OPTIMIZED: useCallback ile memoize edildi
    const handleTranscribe = useCallback(async () => {
        // Eğer zaten işlemdeyse veya zaten bir transcription varsa çık
        if (localIsTranscribing || localTranscription) return;

        setLocalIsTranscribing(true);

        try {
            const response = await fetchWithAuth(`${absoluteHostUrl}/api/messages/${msg.id}/transcribe/`, {
                method: 'POST'
            });

            if (response.ok) {
                const data = await response.json();

                // Alert yerine State'i güncelle
                if (data.transcription) {
                    setLocalTranscription(data.transcription);
                } else {
                    toast.error('❌ Çeviri boş döndü.');
                }
            } else {
                const errorData = await response.json();
                toast.error(`❌ Çeviri hatası: ${errorData.error || 'Bilinmeyen hata'}`);
            }
        } catch (error) {
            console.error('Transcription error:', error);
            toast.error('❌ Ses metne çevrilemedi. Lütfen tekrar deneyin.');
        } finally {
            setLocalIsTranscribing(false);
        }
    }, [localIsTranscribing, localTranscription, fetchWithAuth, absoluteHostUrl, msg.id]);

    // --- RENDER BAŞLIYOR ---
    return (
        <div
            ref={messageRef}
            style={{
                ...styles.chatMessage,
                backgroundColor: isSelected ? 'rgba(88, 101, 242, 0.3)' : (isHovered ? 'rgba(4, 4, 5, 0.07)' : 'transparent'),
                cursor: isSelectionMode ? 'pointer' : 'default'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setShowReactionPicker(false); }}
            onContextMenu={handleContextMenu}
            id={`message-${msg.id}`}
            onClick={() => isSelectionMode && onToggleSelection(msg.id)}
        >
            {/* 1. Avatar */}
            <div style={styles.avatarContainer}>
                <LazyImage
                    src={userAvatar}
                    alt={msg.username}
                    style={styles.userAvatar}
                    onClick={() => onViewProfile(msg.username)}
                    placeholder={getDeterministicAvatar(msg.username)}
                />
            </div>

            <div style={styles.contentWrapper}>
                {/* 2. Yanıtlanan Mesaj Gösterimi */}
                {msg.reply_to && (
                    <div style={styles.replyContainer} onClick={() => onScrollToMessage(msg.reply_to.id)}>
                        <div style={styles.replyLine} />
                        <span style={{ fontWeight: 'bold', marginRight: 5 }}>@{msg.reply_to.username}</span>
                        <span style={{ opacity: 0.7, fontSize: '0.9em' }}>
                            {msg.reply_to.content ? msg.reply_to.content.substring(0, 50) + '...' : 'Bir dosya'}
                        </span>
                    </div>
                )}

                {/* 3. Başlık (İsim + Tarih) */}
                <div style={styles.messageHeader}>
                    <strong style={{
                        cursor: 'pointer',
                        color: msg.username === '⚡ Signal Bot' ? '#5865f2' : (isAdmin ? '#f0b232' : '#fff')
                    }} onClick={() => onViewProfile(msg.username)}>
                        {isAIMessage && '🤖 '} {msg.username}
                    </strong>
                    {/* 🆕 Lock Icon - Mesaj kilitli ise */}
                    {msg.is_locked && (
                        <FaLock
                            style={{
                                marginLeft: 8,
                                color: '#f0b232',
                                fontSize: '0.9em'
                            }}
                            title="Locked by moderator - Cannot be edited or deleted"
                        />
                    )}
                    <span style={styles.timestamp}>
                        {formatTimestamp(msg.timestamp)}
                        {msg.is_edited && <EditHistory messageId={msg.id} messageEditHistoryUrl={messageEditHistoryUrl} fetchWithAuth={fetchWithAuth} />}
                        {msg.is_pinned && <FaThumbtack style={{ marginLeft: 5, color: '#f0b232', fontSize: '0.8em' }} />}
                    </span>
                </div>

                {/* 4. Aksiyon Butonları (Hover ile gelir) */}
                {isHovered && !msg.temp_id && !isSelectionMode && (
                    <div style={styles.messageActions}>
                        {showReactionPicker && (
                            <ReactionPicker onEmojiSelect={(e) => onToggleReaction(msg.id, e)} onClose={() => setShowReactionPicker(false)} />
                        )}
                        <button onClick={() => setShowReactionPicker(true)} style={styles.actionButton} title="Tepki"><FaSmile /></button>
                        <button onClick={() => onSetReply(msg)} style={styles.actionButton} title="Yanıtla"><FaReply /></button>
                        <button onClick={handleQuoteMessage} style={styles.actionButton} title="Alıntıla"><FaQuoteLeft /></button>
                        <button onClick={() => onToggleSelection(msg.id)} style={styles.actionButton} title="Seç"><FaCheck /></button>
                        <button onClick={() => onStartForward(msg)} style={styles.actionButton} title="İlet"><FaShareSquare /></button>

                        {/* Yeni: Bookmark, Star, Read Later */}
                        <BookmarkButton
                            messageId={msg.id}
                            isBookmarked={msg.is_bookmarked}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={absoluteHostUrl}
                        />
                        <StarButton
                            messageId={msg.id}
                            isStarred={msg.is_starred}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={absoluteHostUrl}
                        />
                        <ReadLaterButton
                            messageId={msg.id}
                            isReadLater={msg.is_read_later}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={absoluteHostUrl}
                        />

                        {/* Hatırlatıcı */}
                        <button
                            onClick={() => setShowReminderModal(true)}
                            style={styles.actionButton}
                            title="Hatırlatıcı Kur"
                        >
                            <FaBell />
                        </button>

                        {/* Thread Başlat */}
                        <button
                            onClick={() => setShowThreadModal(true)}
                            style={styles.actionButton}
                            title="Thread Başlat"
                        >
                            <FaComments />
                        </button>

                        {/* Rapor Et */}
                        {!isMyMessage && (
                            <button
                                onClick={async () => {
                                    const reason = prompt('Rapor sebebi:');
                                    if (reason) {
                                        await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                                            method: 'POST',
                                            body: JSON.stringify({ message_id: msg.id, reason })
                                        });
                                        toast.success('✅ Rapor gönderildi');
                                    }
                                }}
                                style={styles.actionButton}
                                title="Rapor Et"
                            >
                                <FaExclamationTriangle />
                            </button>
                        )}

                        {isMyMessage && msg.content && (
                            <button onClick={() => onStartEdit(msg)} style={styles.actionButton} title="Düzenle"><FaEdit /></button>
                        )}

                        {/* 👇 SİLME: Kendi mesajıysa VEYA Silme Yetkisi Varsa */}
                        {(isMyMessage || isAdmin || currentPermissions.can_delete_messages) && (
                            <button onClick={() => onDelete(msg.id)} style={styles.actionButton} title="Sil"><FaTrash /></button>
                        )}
                        {isAdmin && msg.room && (
                            <button onClick={() => onTogglePin(msg.id)} style={styles.actionButton} title="Sabitle"><FaThumbtack /></button>
                        )}
                    </div>
                )}

                {/* Reminder Modal */}
                {showReminderModal && (
                    <ReminderModal
                        messageId={msg.id}
                        messageContent={displayContent}
                        onClose={() => setShowReminderModal(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={absoluteHostUrl}
                    />
                )}

                {/* Thread Modal */}
                {showThreadModal && (
                    <MessageThreads
                        messageId={msg.id}
                        onClose={() => setShowThreadModal(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={absoluteHostUrl}
                    />
                )}

                {/* 🆕 Context Menu */}
                {contextMenu && (
                    <div
                        style={{
                            ...styles.contextMenu,
                            left: `${contextMenu.x}px`,
                            top: `${contextMenu.y}px`
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="context-menu-item"
                            style={styles.contextMenuItem}
                            onClick={() => {
                                setShowReactionPicker(true);
                                setContextMenu(null);
                            }}
                        >
                            <FaSmile /> Tepki Ekle
                        </div>

                        <div
                            className="context-menu-item"
                            style={styles.contextMenuItem}
                            onClick={() => {
                                onSetReply(msg);
                                setContextMenu(null);
                            }}
                        >
                            <FaReply /> Yanıtla
                        </div>

                        {isMyMessage && msg.content && (
                            <div
                                className="context-menu-item"
                                style={styles.contextMenuItem}
                                onClick={() => {
                                    onStartEdit(msg);
                                    setContextMenu(null);
                                }}
                            >
                                <FaEdit /> Düzenle
                            </div>
                        )}

                        <div
                            className="context-menu-item"
                            style={styles.contextMenuItem}
                            onClick={() => {
                                navigator.clipboard.writeText(displayContent);
                                toast.success('✅ Mesaj kopyalandı');
                                setContextMenu(null);
                            }}
                        >
                            <FaFileAlt /> Mesajı Kopyala
                        </div>

                        <div
                            className="context-menu-item"
                            style={styles.contextMenuItem}
                            onClick={async () => {
                                await onTogglePin(msg.id);
                                setContextMenu(null);
                            }}
                        >
                            <FaThumbtack /> {msg.is_pinned ? 'Sabitlemeyi Kaldır' : 'Sabitle'}
                        </div>

                        <div
                            className="context-menu-item"
                            style={styles.contextMenuItem}
                            onClick={() => {
                                onStartForward(msg);
                                setContextMenu(null);
                            }}
                        >
                            <FaShareSquare /> İlet
                        </div>

                        <div
                            className="context-menu-item"
                            style={styles.contextMenuItem}
                            onClick={() => {
                                setShowThreadModal(true);
                                setContextMenu(null);
                            }}
                        >
                            <FaComments /> Thread Başlat
                        </div>

                        <div
                            className="context-menu-item"
                            style={styles.contextMenuItem}
                            onClick={() => {
                                setShowReminderModal(true);
                                setContextMenu(null);
                            }}
                        >
                            <FaBell /> Hatırlatıcı Kur
                        </div>

                        <div style={styles.contextMenuDivider}></div>

                        {isMyMessage && (
                            <div
                                className="context-menu-item danger"
                                style={{ ...styles.contextMenuItem, color: '#ed4245' }}
                                onClick={async () => {
                                    if (window.confirm('Bu mesajı silmek istediğinize emin misiniz?')) {
                                        await onDelete(msg.id);
                                        setContextMenu(null);
                                    }
                                }}
                            >
                                <FaTrash /> Sil
                            </div>
                        )}

                        {!isMyMessage && (
                            <div
                                className="context-menu-item danger"
                                style={{ ...styles.contextMenuItem, color: '#ed4245' }}
                                onClick={async () => {
                                    const reason = prompt('Rapor sebebi:');
                                    if (reason) {
                                        await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                                            method: 'POST',
                                            body: JSON.stringify({ message_id: msg.id, reason })
                                        });
                                        toast.success('✅ Rapor gönderildi');
                                        setContextMenu(null);
                                    }
                                }}
                            >
                                <FaExclamationTriangle /> Rapor Et
                            </div>
                        )}
                    </div>
                )}

                {/* 5. İÇERİK RENDER ALANI */}

                {msg.snippet_data && msg.snippet_data.type === 'game_xox' ? (
                    /* --- A. XOX OYUNU --- */
                    <Suspense fallback={<div style={{ padding: '12px', color: '#b9bbbe', fontSize: '0.9em' }}>🎮 Oyun yükleniyor...</div>}>
                        <TicTacToe
                            gameData={msg.snippet_data}
                            currentUser={currentUser}
                            onMove={(gid, idx) => {
                                fetchWithAuth(`${absoluteHostUrl}/api/games/xox/move/`, {
                                    method: 'POST',
                                    body: JSON.stringify({ game_id: gid, index: idx })
                                });
                            }}
                        />
                    </Suspense>
                ) : (
                    msg.snippet_data ? (
                        /* --- B. Kod Bloğu --- */
                        <div style={styles.snippetContainer}>
                            <div style={styles.snippetHeader}>
                                <span>💻 {msg.snippet_data.title || 'Kod Parçası'}</span>
                                <span style={styles.langBadge}>{msg.snippet_data.language}</span>
                            </div>
                            <CodeBlock language={msg.snippet_data.language}>{msg.snippet_data.code}</CodeBlock>
                        </div>
                    ) : (
                        /* --- C. Normal Metin / Markdown --- */
                        displayContent && (
                            <div style={styles.messageContent}>
                                {isMessageEncrypted && (
                                    <span style={{ color: '#43b581', marginRight: 5 }} title="Uçtan Uca Şifreli"><FaLock /></span>
                                )}
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            return !inline
                                                ? <CodeBlock language={className?.replace('language-', '')} value={children} />
                                                : <code className={className} style={styles.inlineCode} {...props}>{children}</code>;
                                        },
                                        p: ({ children }) => {
                                            // Spoiler Kontrolü (||gizli||)
                                            const kids = React.Children.toArray(children);
                                            return <p style={{ margin: 0 }}>{kids.map((child, i) => {
                                                if (typeof child === 'string') {
                                                    const parts = child.split(/(\|\|.*?\|\|)/g);
                                                    return parts.map((part, j) =>
                                                        (part.startsWith('||') && part.endsWith('||'))
                                                            ? <Spoiler key={`${i}-${j}`}>{part.slice(2, -2)}</Spoiler>
                                                            : part
                                                    );
                                                }
                                                return child;
                                            })}</p>
                                        }
                                    }}
                                >
                                    {displayContent}
                                </ReactMarkdown>
                            </div>
                        )
                    )
                )}

                {/* D. Sinyal Butonu */}
                {signalCoin && (
                    <button onClick={() => onShowChart(signalCoin)} style={styles.chartBtn}>
                        <FaChartLine /> {signalCoin} Grafiği
                    </button>
                )}

                {/* E. Link Önizleme (lazy mount) */}
                {msg.link_preview_data && (
                    <LazyMount minHeight={80}>
                        <LinkPreview data={msg.link_preview_data} />
                    </LazyMount>
                )}

                {/* F. Anket (Poll) */}
                {msg.poll && (
                    <div style={styles.pollContainer}>
                        <h4 style={{ marginTop: 0, marginBottom: 10 }}>{msg.poll.question}</h4>
                        <div style={{ fontSize: '0.8em', color: '#b9bbbe', marginBottom: 8 }}>
                            {msg.poll.allow_multiple_votes ? 'Çoklu Seçim' : 'Tek Seçim'} • {msg.poll.total_votes || 0} Oy
                        </div>
                        {msg.poll.options.map(opt => {
                            const voted = opt.is_voted;
                            const total = msg.poll.total_votes || 0;
                            const percent = total > 0 ? Math.round((opt.vote_count / total) * 100) : 0;

                            return (
                                <div key={opt.id} style={{ position: 'relative', marginBottom: 6 }}>
                                    <button
                                        onClick={() => handleVote(opt.id)}
                                        style={{
                                            ...styles.pollOption,
                                            backgroundColor: voted ? '#4752c4' : 'rgba(255,255,255,0.05)',
                                            border: voted ? '1px solid #5865f2' : '1px solid transparent',
                                            justifyContent: 'space-between',
                                            display: 'flex',
                                            alignItems: 'center',
                                            position: 'relative',
                                            zIndex: 2,
                                            width: '100%',
                                            overflow: 'hidden',
                                            padding: '10px 12px'
                                        }}
                                    >
                                        <span style={{ zIndex: 3, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>{opt.text}</span>
                                        <span style={{ zIndex: 3, fontWeight: 'bold' }}>{opt.vote_count} ({percent}%)</span>

                                        {/* Progress Bar Background */}
                                        <div style={{
                                            position: 'absolute',
                                            top: 0, left: 0, bottom: 0,
                                            width: `${percent}%`,
                                            backgroundColor: voted ? 'rgba(255,255,255,0.2)' : 'rgba(88, 101, 242, 0.3)',
                                            zIndex: 1,
                                            transition: 'width 0.3s ease'
                                        }} />
                                    </button>
                                </div>
                            );
                        })}
                        {msg.poll.expires_at && <div style={{ fontSize: '0.75em', color: '#72767d', marginTop: 5 }}>Bitiş: {new Date(msg.poll.expires_at).toLocaleString()}</div>}
                    </div>
                )}

                {/* G. Resim Dosyası */}
                {finalImageUrl && (
                    <img
                        src={finalImageUrl}
                        alt="attachment"
                        style={styles.messageImage}
                        onClick={() => onImageClick(finalImageUrl)}
                        loading="lazy"
                        onLoad={onContentLoad}
                    />
                )}

                {/* H. Ses Dosyası (GÜNCELLENEN KISIM) */}
                {msg.is_voice_message && fullFileUrl && (
                    <Suspense fallback={<div style={{ padding: '12px', color: '#72767d', fontSize: '13px' }}>🎵 Ses yükleniyor...</div>}>
                        <div>
                            <VoiceMessagePlayer
                                audioUrl={fullFileUrl}
                                duration={msg.voice_duration || 0}
                                onDownload={() => {
                                    const a = document.createElement('a');
                                    a.href = fullFileUrl;
                                    a.download = msg.file_name || `voice-${Date.now()}.webm`;
                                    a.click();
                                }}
                            />

                            {/* 🎯 Transcription Section (WhatsApp Style) */}
                            {localTranscription && (
                                <div style={styles.voiceTranscription}>
                                    <div style={styles.transcriptionIcon}>💬</div>
                                    <div style={styles.transcriptionText}>{localTranscription}</div>
                                </div>
                            )}

                            {!localTranscription && !localIsTranscribing && (
                                <button
                                    onClick={handleTranscribe}
                                    style={styles.transcribeButton}
                                >
                                    📝 Metne Çevir
                                </button>
                            )}

                            {localIsTranscribing && (
                                <div style={styles.transcribingLoader}>
                                    ⏳ Çevriliyor...
                                </div>
                            )}
                        </div>
                    </Suspense>
                )}

                {/* I. Video veya Genel Dosya */}
                {finalFileUrl && !msg.is_voice_message && (() => {
                    const ext = (msg.file_name || '').split('.').pop().toLowerCase();
                    const fileName = (msg.file_name || '').toLowerCase();

                    // 🎤 voice_ veya voice- ile başlayan WebM'ler ses mesajıdır
                    if ((fileName.startsWith('voice_') || fileName.startsWith('voice-')) && ext === 'webm') {
                        return (
                            <VoiceMessagePlayer
                                audioUrl={finalFileUrl}
                                duration={msg.voice_duration || 0}
                                onDownload={() => {
                                    const a = document.createElement('a');
                                    a.href = finalFileUrl;
                                    a.download = msg.file_name || `voice-${Date.now()}.webm`;
                                    a.click();
                                }}
                            />
                        );
                    }

                    if (['mp4', 'mov', 'mkv'].includes(ext) || (ext === 'webm' && !fileName.startsWith('voice_') && !fileName.startsWith('voice-'))) {
                        return <LazyVideo src={finalFileUrl} style={styles.messageVideo} />;
                    }
                    if (['mp3', 'wav', 'ogg'].includes(ext)) {
                        return (
                            <VoiceMessagePlayer
                                audioUrl={finalFileUrl}
                                duration={0}
                                onDownload={() => {
                                    const a = document.createElement('a');
                                    a.href = finalFileUrl;
                                    a.download = msg.file_name || `audio-${Date.now()}.${ext}`;
                                    a.click();
                                }}
                            />
                        );
                    }
                    // 🔥 Kod/Text dosyaları için Discord-style önizleme
                    if (isCodeFile(msg.file_name)) {
                        return (
                            <Suspense fallback={
                                <div style={styles.fileAttachment} className="file-attachment-hover">
                                    <div style={styles.fileIcon}>📄</div>
                                    <div style={styles.fileInfo}>
                                        <div style={styles.fileName}>{msg.file_name}</div>
                                        <div style={styles.fileDetails}>Yükleniyor...</div>
                                    </div>
                                </div>
                            }>
                                <FileCodePreview
                                    fileUrl={finalFileUrl}
                                    fileName={msg.file_name}
                                    fileSize={msg.file_size}
                                />
                            </Suspense>
                        );
                    }

                    // RAR, ZIP, PDF vb. dosyalar için gelişmiş indirme butonu
                    const fileExt = ext.toUpperCase();
                    const fileSize = msg.file_size ? `(${(msg.file_size / 1024 / 1024).toFixed(2)} MB)` : '';
                    return (
                        <div style={styles.fileAttachment} className="file-attachment-hover">
                            <div style={styles.fileIcon}>
                                {['zip', 'rar', '7z', 'tar', 'gz'].includes(ext) ? '📦' :
                                    ['pdf'].includes(ext) ? '📄' :
                                        ['doc', 'docx'].includes(ext) ? '📝' :
                                            ['xls', 'xlsx'].includes(ext) ? '📊' :
                                                ['ppt', 'pptx'].includes(ext) ? '📽️' :
                                                    ['txt'].includes(ext) ? '📃' : '📎'}
                            </div>
                            <div style={styles.fileInfo}>
                                <div style={styles.fileName}>{msg.file_name || 'Dosya'}</div>
                                <div style={styles.fileDetails}>{fileExt} {fileSize}</div>
                            </div>
                            <a
                                href={finalFileUrl}
                                download={msg.file_name}
                                style={styles.downloadButton}
                                className="download-button-hover"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaDownload size={18} />
                                <span style={{ marginLeft: '6px' }}>İndir</span>
                            </a>
                        </div>
                    );
                })()}

                {/* 6. Reaksiyonlar ve Okundu Bilgisi */}
                <div style={styles.footerRow}>
                    {groupedReactions.length > 0 && (
                        <div style={styles.reactionsRow}>
                            {groupedReactions.map(({ emoji, count }) => (
                                <span
                                    key={emoji}
                                    onClick={() => onToggleReaction(msg.id, emoji)}
                                    style={{ ...styles.reactionTag, border: myReaction(emoji) ? '1px solid #5865f2' : '1px solid transparent' }}
                                >
                                    {emoji} {count}
                                </span>
                            ))}
                        </div>
                    )}
                    {isMyMessage && !msg.temp_id && (
                        <span style={styles.readReceipt} title="İletildi">✓</span>
                    )}
                </div>

            </div>
        </div>
    );
};
// --- STILLER ---
const styles = {
    chatMessage: {
        display: 'flex',
        padding: '8px 20px', // Geniş padding
        marginBottom: '2px',
        position: 'relative',
        transition: 'background-color 0.1s ease',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '0'
    },
    // Hover efekti mouseOver eventinden değil, CSS'den (className) gelmeli.
    // Ancak inline style kullanılıyorsa, burada 'hover' state'i yok.
    // CSS dosyasında .message-item:hover { background: rgba(0,0,0,0.2) } olması lazım.

    avatarContainer: {
        marginTop: '4px',
        marginRight: '16px',
        flexShrink: 0
    },
    userAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    messageHeader: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '4px',
        gap: '8px'
    },
    username: {
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '1rem',
        lineHeight: '1.375rem',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    timestamp: {
        fontSize: '0.75rem',
        color: '#949ba4',
        fontWeight: '400',
        lineHeight: '1.375rem',
        marginLeft: '4px',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    // Mesaj içeriği
    messageContent: {
        color: '#dcddde',
        fontSize: '1rem',
        lineHeight: '1.375rem',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontWeight: '400',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    contentWrapper: { flex: 1, minWidth: 0, maxWidth: '100%' },

    messageActions: {
        position: 'absolute',
        top: '-10px',
        right: '10px',
        backgroundColor: '#313338',
        borderRadius: '8px',
        padding: '4px',
        display: 'flex',
        gap: '4px',
        border: '1px solid rgba(255,255,255,0.08)',
        zIndex: 50,
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    },
    actionButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.2em',
        padding: '6px',
        display: 'flex',
        borderRadius: '4px',
        transition: 'all 0.1s'
        // Hover: bg-color #404249
    },

    inlineCode: {
        backgroundColor: '#2b2d31',
        padding: '2px 4px',
        borderRadius: '3px',
        fontFamily: "'Consolas', monospace",
        fontSize: '0.85em',
        border: '1px solid rgba(255,255,255,0.05)'
    },

    // Embed & Medya - 🆕 WhatsApp tarzı kompakt görünüm
    messageImage: {
        maxWidth: 'min(300px, 70%)',  // 🔥 Daha kompakt (450px -> 300px)
        maxHeight: '250px',           // 🔥 Yükseklik sınırı
        width: 'auto',
        height: 'auto',
        display: 'block',
        objectFit: 'cover',
        borderRadius: '8px',
        marginTop: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    messageVideo: {
        maxWidth: 'min(400px, 80%)',  // 🔥 Daha kompakt (720px -> 400px)
        maxHeight: '300px',           // 🔥 Yükseklik sınırı
        width: 'auto',
        height: 'auto',
        borderRadius: '8px',
        marginTop: '8px',
        backgroundColor: 'black'
    },

    fileDownload: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#2b2d31',
        borderRadius: '6px',
        marginTop: '6px',
        textDecoration: 'none',
        color: '#00a8fc',
        border: '1px solid rgba(255,255,255,0.05)',
        width: 'fit-content'
    },

    // 🆕 Modern File Attachment Styles (Discord-style)
    fileAttachment: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#2b2d31',
        borderRadius: 8,
        marginTop: 8,
        border: '1px solid rgba(255,255,255,0.06)',
        maxWidth: 490,
        transition: 'all 0.2s ease',
        cursor: 'default'
    },
    fileIcon: {
        fontSize: 28,
        marginRight: 12,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    fileInfo: {
        flex: 1,
        minWidth: 0,
        marginRight: 12
    },
    fileName: {
        color: '#00a8fc',
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    fileDetails: {
        color: '#72767d',
        fontSize: 12,
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    downloadButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        backgroundColor: 'transparent',
        color: '#b5bac1',
        borderRadius: 4,
        textDecoration: 'none',
        fontSize: 20,
        transition: 'all 0.2s ease',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0
    },

    reactionsRow: { display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' },
    reactionTag: {
        backgroundColor: '#2b2d31',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '0.85em',
        cursor: 'pointer',
        color: '#b9bbbe',
        border: '1px solid transparent',
        display: 'flex', alignItems: 'center', gap: '4px'
    },
    activeReaction: {
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        borderColor: '#5865f2',
        color: '#dee0fc'
    },

    footerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', minHeight: '20px' },
    readReceipt: { fontSize: '0.75em', color: '#b9bbbe', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' },

    replyContainer: { display: 'flex', alignItems: 'center', fontSize: '0.85em', color: '#b9bbbe', marginBottom: '4px', opacity: 0.8 },
    replyLine: { width: '30px', borderTop: '2px solid #4f545c', borderLeft: '2px solid #4f545c', height: '10px', marginRight: '8px', borderTopLeftRadius: '6px', marginTop: '6px' },

    historyDropdown: { position: 'absolute', top: '100%', left: 0, width: '280px', backgroundColor: '#1e1f22', border: '1px solid #111214', borderRadius: '8px', padding: '12px', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    historyHeader: { margin: '0 0 10px 0', fontSize: '0.9em', color: '#fff', borderBottom: '1px solid #2f3136', paddingBottom: '8px' },
    historyItem: { marginBottom: '12px', fontSize: '0.85em', color: '#b9bbbe', paddingBottom: '8px', borderBottom: '1px solid #2b2d31' },

    langBadge: { textTransform: 'uppercase', fontSize: '0.7em', fontWeight: 'bold', padding: '2px 4px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: '8px' },
    chartBtn: { marginTop: '5px', backgroundColor: 'rgba(240, 178, 50, 0.1)', border: '1px solid #f0b232', color: '#f0b232', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85em', display: 'inline-flex', alignItems: 'center', gap: '6px' },
    pollContainer: { marginTop: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.2)' },
    pollOption: { display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px', margin: '6px 0', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.05)', transition: 'background 0.2s' },

    // 🆕 Context Menu Styles
    contextMenu: {
        position: 'fixed',
        backgroundColor: '#18191c',
        border: '1px solid #2b2d31',
        borderRadius: '6px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 10000,
        minWidth: '220px',
        overflow: 'hidden',
        padding: '6px 0'
    },
    contextMenuItem: {
        padding: '10px 14px',
        cursor: 'pointer',
        color: '#b5bac1',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.15s',
        backgroundColor: 'transparent'
    },
    contextMenuDivider: {
        height: '1px',
        backgroundColor: '#2b2d31',
        margin: '6px 0'
    },
    // 🎤 Voice Message Transcription Styles (WhatsApp inspired)
    voiceTranscription: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        marginTop: '8px',
        padding: '10px 12px',
        backgroundColor: 'rgba(114, 137, 218, 0.1)',
        border: '1px solid rgba(114, 137, 218, 0.3)',
        borderRadius: '8px',
        maxWidth: '400px'
    },
    transcriptionIcon: {
        fontSize: '16px',
        flexShrink: 0,
        marginTop: '2px'
    },
    transcriptionText: {
        flex: 1,
        fontSize: '13px',
        lineHeight: '1.5',
        color: '#dcddde',
        fontStyle: 'italic'
    },
    transcribeButton: {
        marginTop: '8px',
        padding: '6px 12px',
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        border: '1px solid rgba(88, 101, 242, 0.4)',
        borderRadius: '6px',
        color: '#7289da',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    },
    transcribingLoader: {
        marginTop: '8px',
        padding: '6px 12px',
        color: '#72767d',
        fontSize: '12px',
        fontStyle: 'italic'
    }
};

// CSS Injection for Hover Effects (Message Item & Action Buttons)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .message-hover-trigger:hover { background-color: rgba(255, 255, 255, 0.03) !important; }
    .action-button:hover { background-color: rgba(255, 255, 255, 0.1); color: white; }
    .poll-option:hover { background-color: rgba(255, 255, 255, 0.1) !important; }
    .context-menu-item:hover { background-color: #5865f2 !important; color: #fff !important; }
    .context-menu-item.danger:hover { background-color: #ed4245 !important; }
    
    /* 🆕 File Attachment Hover Effects */
    .file-attachment-hover:hover {
        background-color: #32353b !important;
        border-color: rgba(255,255,255,0.1) !important;
    }
    .download-button-hover:hover {
        color: #dcddde !important;
        background-color: rgba(255,255,255,0.06) !important;
        border-radius: 4px;
    }
    .download-button-hover:active {
        transform: scale(0.95);
    }
    
    /* FileCodePreview hover */
    .file-code-preview-hover:hover {
        border-color: rgba(255,255,255,0.12) !important;
    }
    .file-code-header-btn:hover {
        background-color: rgba(255,255,255,0.1) !important;
        color: #dcddde !important;
    }
    .file-code-footer:hover {
        background-color: #32353b !important;
    }
`;
document.head.appendChild(styleSheet);


// Avoid re-rendering messages that did not change
const areEqual = (prev, next) => {
    const keys = ['msg', 'currentUser', 'isAdmin', 'isSelectionMode', 'isSelected'];
    for (const k of keys) {
        if (prev[k] !== next[k]) return false;
    }
    return true;
};

export default memo(Message, areEqual);


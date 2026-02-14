// frontend/src/Message.js
import React, { useState, useMemo, useEffect, useRef, memo, useCallback, lazy, Suspense } from 'react';
import { FaLock, FaThumbtack } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LazyImage from './components/LazyImage';
import { useCachedImage } from './utils/imageCaching';
import styles from './Message/styles';
import { EditHistory, formatTimestamp } from './Message/components';
import MessageToolbar from './Message/MessageToolbar';
import MessageContextMenu from './Message/MessageContextMenu';
import MessageMedia from './Message/MessageMedia';
import { decryptMessage, isEncrypted } from './utils/encryption';
import { useChatStore } from './stores/useChatStore';
import toast from './utils/toast';

const CodeBlock = lazy(() => import('./components/CodeBlock'));
const Spoiler = lazy(() => import('./components/Spoiler'));
const TicTacToe = lazy(() => import('./components/TicTacToe'));
const ReminderModal = lazy(() => import('./components/ReminderModal'));
const MessageThreads = lazy(() => import('./components/MessageThreads'));

const Message = ({
    msg, currentUser, isAdmin, onDelete, onStartEdit, onToggleReaction, onTogglePin,
    onSetReply, onImageClick, absoluteHostUrl, onScrollToMessage, onVisible,
    messageEditHistoryUrl, onViewProfile, onStartForward, fetchWithAuth,
    isSelectionMode, isSelected, onToggleSelection, allUsers, getDeterministicAvatar, onShowChart,
    onContentLoad
}) => {
    if (!msg || typeof msg !== 'object' || !msg.id) return null;

    const encryptionKeys = useChatStore(state => state.encryptionKeys);
    const currentPermissions = useChatStore(state => state.currentPermissions);

    const [localTranscription, setLocalTranscription] = useState(msg.transcription || null);
    const [localIsTranscribing, setLocalIsTranscribing] = useState(false);
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [showThreadModal, setShowThreadModal] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [showReactionPicker, setShowReactionPicker] = useState(false);

    const isMyMessage = msg.username === currentUser;
    const isAIMessage = ['Pawscord AI', 'PawPaw AI', '\u26A1 Signal Bot'].includes(msg.username);
    const messageRef = useRef(null);

    const handleQuoteMessage = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${absoluteHostUrl}/messages/${msg.id}/quote/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }
            });
            if (response.ok) {
                const content = msg.content || "";
                const quotedText = `> ${msg.username} said:\n> ${content.split('\n').join('\n> ')}\n\n`;
                onSetReply({ ...msg, quotedText });
                toast.success('Message quoted!');
            } else { toast.error('Failed to quote message'); }
        } catch (error) { toast.error('Failed to quote message'); }
    }, [msg, absoluteHostUrl, fetchWithAuth, onSetReply]);

    const handleContextMenu = useCallback((e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    }, []);

    useEffect(() => {
        const handleClick = () => setContextMenu(null);
        if (contextMenu) {
            document.addEventListener('click', handleClick);
            return () => document.removeEventListener('click', handleClick);
        }
    }, [contextMenu]);

    useEffect(() => {
        if (!onVisible || isMyMessage || msg.read_by?.includes(currentUser)) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) { onVisible(msg.id); observer.disconnect(); }
        }, { threshold: 0.8 });
        if (messageRef.current) observer.observe(messageRef.current);
        return () => observer.disconnect();
    }, [msg.id, isMyMessage, msg.read_by, onVisible, currentUser]);

    const displayContent = useMemo(() => {
        if (!msg.content) return "";
        if (isEncrypted(msg.content)) {
            const chatId = msg.room ? `room-${msg.room}` : (msg.conversation ? `dm-${msg.conversation}` : null);
            const secretKey = encryptionKeys[chatId];
            return secretKey ? decryptMessage(msg.content, secretKey) : "\uD83D\uDD12 Bu mesaj \u015Fifreli. Okumak i\u00E7in anahtar\u0131 girin.";
        }
        return msg.content;
    }, [msg.content, msg.room, msg.conversation, encryptionKeys]);

    const isMessageEncrypted = isEncrypted(msg.content);

    const userAvatarBase = useMemo(() => {
        let url = msg.avatar;
        if (!url) { const userObj = allUsers?.find(u => u.username === msg.username); url = userObj?.avatar; }
        if (!url) url = getDeterministicAvatar(msg.username);
        if (url && url.includes('ui-avatars.com')) return url;
        if (url && !url.startsWith('http') && !url.startsWith('blob:'))
            url = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
        return url;
    }, [msg.avatar, msg.username, allUsers, getDeterministicAvatar, absoluteHostUrl]);

    const { url: userAvatar } = useCachedImage(userAvatarBase);

    const getFullUrl = (url) => {
        if (!url) return null;
        if (url.startsWith('http') || url.startsWith('blob:')) return url;
        let finalUrl = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
        if (finalUrl.includes('/media/local/stream/')) {
            const token = localStorage.getItem('access_token');
            if (token) finalUrl += (finalUrl.includes('?') ? '&' : '?') + `token=${token}`;
        }
        return finalUrl;
    };

    const fullImageUrl = getFullUrl(msg.image_url || msg.image);
    const fullFileUrl = getFullUrl(msg.file_url || msg.file);

    const isImageFile = useMemo(() => {
        if (!fullFileUrl || fullImageUrl) return false;
        const fileName = (msg.file_name || '').toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico'].some(ext => fileName.endsWith(`.${ext}`));
    }, [fullFileUrl, fullImageUrl, msg.file_name]);

    const finalImageUrl = fullImageUrl || (isImageFile ? fullFileUrl : null);
    const finalFileUrl = isImageFile ? null : fullFileUrl;

    const signalCoin = useMemo(() => {
        if (msg.username === '\u26A1 Signal Bot' && displayContent) {
            const match = displayContent.match(/\*\*(.*?)\*\*/);
            if (match && match[1]) return match[1];
        }
        return null;
    }, [msg.username, displayContent]);

    const groupedReactions = useMemo(() => {
        if (!msg.reactions) return [];
        const groups = {};
        msg.reactions.forEach(r => { if (!groups[r.emoji]) groups[r.emoji] = []; groups[r.emoji].push(r.username); });
        return Object.entries(groups).map(([emoji, users]) => ({ emoji, users, count: users.length }));
    }, [msg.reactions]);

    const myReaction = useCallback((emoji) => msg.reactions?.some(r => r.username === currentUser && r.emoji === emoji), [msg.reactions, currentUser]);

    const handleVote = useCallback(async (optionId) => {
        if (!msg.poll) return;
        try { await fetchWithAuth(`${absoluteHostUrl}/api/polls/${msg.poll.id}/vote/`, { method: 'POST', body: JSON.stringify({ option_id: optionId }) }); }
        catch (error) { console.error("Oy hatas\u0131:", error); }
    }, [msg.poll, fetchWithAuth, absoluteHostUrl]);

    const handleTranscribe = useCallback(async () => {
        if (localIsTranscribing || localTranscription) return;
        setLocalIsTranscribing(true);
        try {
            const response = await fetchWithAuth(`${absoluteHostUrl}/api/messages/${msg.id}/transcribe/`, { method: 'POST' });
            if (response.ok) {
                const data = await response.json();
                if (data.transcription) setLocalTranscription(data.transcription);
                else toast.error('\u274C \u00C7eviri bo\u015F d\u00F6nd\u00FC.');
            } else { const ed = await response.json(); toast.error(`\u274C \u00C7eviri hatas\u0131: ${ed.error || 'Bilinmeyen hata'}`); }
        } catch (error) { toast.error('\u274C Ses metne \u00E7evrilemedi.'); }
        finally { setLocalIsTranscribing(false); }
    }, [localIsTranscribing, localTranscription, fetchWithAuth, absoluteHostUrl, msg.id]);

    return (
        <div ref={messageRef}
            style={{ ...styles.chatMessage, backgroundColor: isSelected ? 'rgba(88, 101, 242, 0.3)' : (isHovered ? 'rgba(4, 4, 5, 0.07)' : 'transparent'), cursor: isSelectionMode ? 'pointer' : 'default' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { setIsHovered(false); setShowReactionPicker(false); }}
            onContextMenu={handleContextMenu}
            id={`message-${msg.id}`}
            onClick={() => isSelectionMode && onToggleSelection(msg.id)}
        >
            <div style={styles.avatarContainer}>
                <LazyImage src={userAvatar} alt={msg.username} style={styles.userAvatar}
                    onClick={() => onViewProfile(msg.username)} placeholder={getDeterministicAvatar(msg.username)} />
            </div>

            <div style={styles.contentWrapper}>
                {msg.reply_to && (
                    <div style={styles.replyContainer} onClick={() => onScrollToMessage(msg.reply_to.id)}>
                        <div style={styles.replyLine} />
                        <span style={{ fontWeight: 'bold', marginRight: 5 }}>@{msg.reply_to.username}</span>
                        <span style={{ opacity: 0.7, fontSize: '0.9em' }}>
                            {msg.reply_to.content ? msg.reply_to.content.substring(0, 50) + '...' : 'Bir dosya'}
                        </span>
                    </div>
                )}

                <div style={styles.messageHeader}>
                    <strong style={{ cursor: 'pointer', color: msg.username === '\u26A1 Signal Bot' ? '#5865f2' : (isAdmin ? '#f0b232' : '#fff') }}
                        onClick={() => onViewProfile(msg.username)}>
                        {isAIMessage && '\uD83E\uDD16 '} {msg.username}
                    </strong>
                    {msg.is_locked && <FaLock style={{ marginLeft: 8, color: '#f0b232', fontSize: '0.9em' }} title="Locked" />}
                    <span style={styles.timestamp}>
                        {formatTimestamp(msg.timestamp)}
                        {msg.is_edited && <EditHistory messageId={msg.id} messageEditHistoryUrl={messageEditHistoryUrl} fetchWithAuth={fetchWithAuth} />}
                        {msg.is_pinned && <FaThumbtack style={{ marginLeft: 5, color: '#f0b232', fontSize: '0.8em' }} />}
                    </span>
                </div>

                {isHovered && !msg.temp_id && !isSelectionMode && (
                    <Suspense fallback={null}>
                        <MessageToolbar
                            msg={msg} isMyMessage={isMyMessage} isAdmin={isAdmin}
                            currentPermissions={currentPermissions}
                            onSetReply={onSetReply} onStartEdit={onStartEdit} onDelete={onDelete}
                            onTogglePin={onTogglePin} onToggleReaction={onToggleReaction}
                            onToggleSelection={onToggleSelection} onStartForward={onStartForward}
                            onQuote={handleQuoteMessage}
                            showReactionPicker={showReactionPicker} setShowReactionPicker={setShowReactionPicker}
                            setShowReminderModal={setShowReminderModal} setShowThreadModal={setShowThreadModal}
                            fetchWithAuth={fetchWithAuth} absoluteHostUrl={absoluteHostUrl}
                        />
                    </Suspense>
                )}

                {showReminderModal && (
                    <Suspense fallback={null}>
                        <ReminderModal messageId={msg.id} messageContent={displayContent}
                            onClose={() => setShowReminderModal(false)} fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} />
                    </Suspense>
                )}
                {showThreadModal && (
                    <Suspense fallback={null}>
                        <MessageThreads messageId={msg.id} onClose={() => setShowThreadModal(false)}
                            fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} />
                    </Suspense>
                )}

                <MessageContextMenu
                    contextMenu={contextMenu} msg={msg} isMyMessage={isMyMessage} displayContent={displayContent}
                    onSetReply={onSetReply} onStartEdit={onStartEdit} onDelete={onDelete} onTogglePin={onTogglePin}
                    onStartForward={onStartForward} setShowReactionPicker={setShowReactionPicker}
                    setShowThreadModal={setShowThreadModal} setShowReminderModal={setShowReminderModal}
                    setContextMenu={setContextMenu} fetchWithAuth={fetchWithAuth} absoluteHostUrl={absoluteHostUrl}
                />

                {msg.snippet_data && msg.snippet_data.type === 'game_xox' ? (
                    <Suspense fallback={<div style={{ padding: '12px', color: '#b9bbbe', fontSize: '0.9em' }}>{'\uD83C\uDFAE'} Oyun y{'\u00FC'}kleniyor...</div>}>
                        <TicTacToe gameData={msg.snippet_data} currentUser={currentUser}
                            onMove={(gid, idx) => { fetchWithAuth(`${absoluteHostUrl}/api/games/xox/move/`, { method: 'POST', body: JSON.stringify({ game_id: gid, index: idx }) }); }} />
                    </Suspense>
                ) : msg.snippet_data ? (
                    <div style={styles.snippetContainer}>
                        <div style={styles.snippetHeader}>
                            <span>{'\uD83D\uDCBB'} {msg.snippet_data.title || 'Kod Par\u00E7as\u0131'}</span>
                            <span style={styles.langBadge}>{msg.snippet_data.language}</span>
                        </div>
                        <Suspense fallback={null}><CodeBlock language={msg.snippet_data.language}>{msg.snippet_data.code}</CodeBlock></Suspense>
                    </div>
                ) : displayContent && (
                    <div style={styles.messageContent}>
                        {isMessageEncrypted && <span style={{ color: '#43b581', marginRight: 5 }} title="Encrypted"><FaLock /></span>}
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                            code({ node, inline, className, children, ...props }) {
                                return !inline
                                    ? <Suspense fallback={null}><CodeBlock language={className?.replace('language-', '')} value={children} /></Suspense>
                                    : <code className={className} style={styles.inlineCode} {...props}>{children}</code>;
                            },
                            p: ({ children }) => {
                                const kids = React.Children.toArray(children);
                                return <p style={{ margin: 0 }}>{kids.map((child, i) => {
                                    if (typeof child === 'string') {
                                        const parts = child.split(/(\|\|.*?\|\|)/g);
                                        return parts.map((part, j) =>
                                            (part.startsWith('||') && part.endsWith('||'))
                                                ? <Suspense key={`${i}-${j}`} fallback={null}><Spoiler>{part.slice(2, -2)}</Spoiler></Suspense>
                                                : part
                                        );
                                    }
                                    return child;
                                })}</p>;
                            }
                        }}>
                            {displayContent}
                        </ReactMarkdown>
                    </div>
                )}

                <MessageMedia
                    msg={msg} displayContent={displayContent} signalCoin={signalCoin} onShowChart={onShowChart}
                    finalImageUrl={finalImageUrl} finalFileUrl={finalFileUrl} fullFileUrl={fullFileUrl}
                    onImageClick={onImageClick} onContentLoad={onContentLoad}
                    localTranscription={localTranscription} localIsTranscribing={localIsTranscribing}
                    handleTranscribe={handleTranscribe} handleVote={handleVote}
                    fetchWithAuth={fetchWithAuth} absoluteHostUrl={absoluteHostUrl}
                />

                <div style={styles.footerRow}>
                    {groupedReactions.length > 0 && (
                        <div style={styles.reactionsRow}>
                            {groupedReactions.map(({ emoji, count }) => (
                                <span key={emoji} onClick={() => onToggleReaction(msg.id, emoji)}
                                    style={{ ...styles.reactionTag, border: myReaction(emoji) ? '1px solid #5865f2' : '1px solid transparent' }}>
                                    {emoji} {count}
                                </span>
                            ))}
                        </div>
                    )}
                    {isMyMessage && !msg.temp_id && <span style={styles.readReceipt} title="Iletildi">{'\u2713'}</span>}
                </div>
            </div>
        </div>
    );
};

const areEqual = (prev, next) => {
    const keys = ['msg', 'currentUser', 'isAdmin', 'isSelectionMode', 'isSelected'];
    for (const k of keys) { if (prev[k] !== next[k]) return false; }
    return true;
};

export default memo(Message, areEqual);
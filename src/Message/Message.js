/* eslint-disable react-hooks/rules-of-hooks */
import { getToken } from '../utils/tokenStorage';
// frontend/src/Message.js
import React, {
    useState,
    useMemo,
    useEffect,
    useRef,
    memo,
    useCallback,
    lazy,
    Suspense,
} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaLock, FaThumbtack } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LazyImage from '../components/shared/LazyImage';
import { useCachedImage } from '../utils/imageCaching';
import styles from './styles';
import { EditHistory, formatTimestamp } from './components';
import MessageToolbar from './MessageToolbar';
import MessageContextMenu from './MessageContextMenu';
import MessageMedia from './MessageMedia';
import { decryptMessage, isEncrypted } from '../utils/encryption';
import { useChatStore } from '../stores/useChatStore';
import toast from '../utils/toast';
import logger from '../utils/logger';

// -- extracted inline style constants --

const CodeBlock = lazy(() => import('./'));
const Spoiler = lazy(() => import('./'));
const TicTacToe = lazy(() => import('./'));
const ReminderModal = lazy(() => import('./'));
const MessageThreads = lazy(() => import('./'));

/**
 * @param {Object} props
 * @param {Object} props.msg - Message object { id, content, username, image_url, ... }
 * @param {string} props.currentUser - Current logged-in username
 * @param {boolean} props.isAdmin - Whether current user is admin
 * @param {Function} props.onDelete - Delete message handler
 * @param {Function} props.onStartEdit - Start editing a message handler
 * @param {Function} props.onToggleReaction - Toggle reaction on message
 * @param {Function} props.onTogglePin - Toggle pin status on message
 * @param {Function} props.onSetReply - Set message as reply target
 * @param {Function} props.onImageClick - Handler when image in message is clicked
 * @param {string} props.absoluteHostUrl - API base URL
 * @param {Function} [props.onScrollToMessage] - Scroll to a referenced message
 * @param {Function} [props.onVisible] - Callback when message becomes visible (read receipt)
 * @param {boolean} [props.isGrouped=false] - Whether this message is grouped with previous
 */
const Message = ({
    msg,
    currentUser,
    isAdmin,
    onDelete,
    onStartEdit,
    onToggleReaction,
    onTogglePin,
    onSetReply,
    onImageClick,
    absoluteHostUrl,
    onScrollToMessage,
    onVisible,
    messageEditHistoryUrl,
    onViewProfile,
    onStartForward,
    fetchWithAuth,
    isSelectionMode,
    isSelected,
    onToggleSelection,
    allUsers,
    getDeterministicAvatar,
    onShowChart,
    onContentLoad,
    isGrouped = false,
}) => {
    const { t } = useTranslation();
    if (!msg || typeof msg !== 'object' || !msg.id) return null;

    const encryptionKeys = useChatStore((state) => state.encryptionKeys);
    const currentPermissions = useChatStore((state) => state.currentPermissions);

    const [localTranscription, setLocalTranscription] = useState(msg.transcription || null);
    const [localIsTranscribing, setLocalIsTranscribing] = useState(false);
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [showThreadModal, setShowThreadModal] = useState(false);
    const [contextMenu, setContextMenu] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [showReactionPicker, setShowReactionPicker] = useState(false);
    const [swipeOffset, setSwipeOffset] = useState(0);

    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const swipingRef = useRef(false);

    const isMyMessage = msg.username === currentUser;
    const isAIMessage = ['Pawscord AI', 'PawPaw AI', '⚡ Signal Bot'].includes(msg.username);
    const messageRef = useRef(null);

    const handleQuoteMessage = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${absoluteHostUrl}/messages/${msg.id}/quote/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const content = msg.content || '';
                const quotedText = `> ${msg.username} said:\n> ${content.split('\n').join('\n> ')}\n\n`;
                onSetReply({ ...msg, quotedText });
                toast.success(t('message.quoted'));
            } else {
                toast.error(t('message.quoteFailed'));
            }
        } catch (error) {
            toast.error(t('message.quoteFailed'));
        }
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
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    onVisible(msg.id);
                    observer.disconnect();
                }
            },
            { threshold: 0.8 }
        );
        if (messageRef.current) observer.observe(messageRef.current);
        return () => observer.disconnect();
    }, [msg.id, isMyMessage, msg.read_by, onVisible, currentUser]);

    const displayContent = useMemo(() => {
        if (!msg.content) return '';
        if (isEncrypted(msg.content)) {
            const chatId = msg.room
                ? `room-${msg.room}`
                : msg.conversation
                    ? `dm-${msg.conversation}`
                    : null;
            const secretKey = encryptionKeys[chatId];
            return secretKey
                ? decryptMessage(msg.content, secretKey)
                : '🔒 This message is encrypted. Enter the key to decrypt.';
        }
        return msg.content;
    }, [msg.content, msg.room, msg.conversation, encryptionKeys]);

    const isMessageEncrypted = isEncrypted(msg.content);

    const userAvatarBase = useMemo(() => {
        let url = msg.avatar;
        if (!url) {
            const userObj = allUsers?.find((u) => u.username === msg.username);
            url = userObj?.avatar;
        }
        if (!url) url = getDeterministicAvatar(msg.username);
        if (url && url.includes('ui-avatars.com')) return url;
        if (url && !url.startsWith('http') && !url.startsWith('blob:'))
            url = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
        return url;
    }, [msg.avatar, msg.username, allUsers, getDeterministicAvatar, absoluteHostUrl]);

    const { url: userAvatar } = useCachedImage(userAvatarBase);

    const { fullImageUrl, fullFileUrl } = useMemo(() => {
        const getUrl = (url) => {
            if (!url) return null;
            if (url.startsWith('http') || url.startsWith('blob:')) return url;
            let finalUrl = `${absoluteHostUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
            if (finalUrl.includes('/media/local/stream/')) {
                const token = getToken();
                if (token) finalUrl += (finalUrl.includes('?') ? '&' : '?') + `token=${token}`;
            }
            return finalUrl;
        };
        return {
            fullImageUrl: getUrl(msg.image_url || msg.image),
            fullFileUrl: getUrl(msg.file_url || msg.file),
        };
    }, [absoluteHostUrl, msg.image_url, msg.image, msg.file_url, msg.file]);

    const isImageFile = useMemo(() => {
        if (!fullFileUrl || fullImageUrl) return false;
        const fileName = (msg.file_name || '').toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico'].some((ext) =>
            fileName.endsWith(`.${ext}`)
        );
    }, [fullFileUrl, fullImageUrl, msg.file_name]);

    const finalImageUrl = fullImageUrl || (isImageFile ? fullFileUrl : null);
    const finalFileUrl = isImageFile ? null : fullFileUrl;

    const signalCoin = useMemo(() => {
        if (msg.username === '⚡ Signal Bot' && displayContent) {
            const match = displayContent.match(/\*\*(.*?)\*\*/);
            if (match && match[1]) return match[1];
        }
        return null;
    }, [msg.username, displayContent]);

    const groupedReactions = useMemo(() => {
        if (!msg.reactions) return [];
        const groups = {};
        msg.reactions.forEach((r) => {
            if (!groups[r.emoji]) groups[r.emoji] = [];
            groups[r.emoji].push(r.username);
        });
        return Object.entries(groups).map(([emoji, users]) => ({
            emoji,
            users,
            count: users.length,
        }));
    }, [msg.reactions]);

    const myReaction = useCallback(
        (emoji) => msg.reactions?.some((r) => r.username === currentUser && r.emoji === emoji),
        [msg.reactions, currentUser]
    );

    const handleVote = useCallback(
        async (optionId) => {
            if (!msg.poll) return;
            try {
                await fetchWithAuth(`${absoluteHostUrl}/api/polls/${msg.poll.id}/vote/`, {
                    method: 'POST',
                    body: JSON.stringify({ option_id: optionId }),
                });
            } catch (error) {
                logger.error('Vote error:', error);
            }
        },
        [msg.poll, fetchWithAuth, absoluteHostUrl]
    );

    const handleTranscribe = useCallback(async () => {
        if (localIsTranscribing || localTranscription) return;
        setLocalIsTranscribing(true);
        try {
            const response = await fetchWithAuth(
                `${absoluteHostUrl}/api/messages/${msg.id}/transcribe/`,
                { method: 'POST' }
            );
            if (response.ok) {
                const data = await response.json();
                if (data.transcription) setLocalTranscription(data.transcription);
                else toast.error(t('message.transcriptionEmpty'));
            } else {
                const ed = await response.json();
                toast.error(
                    `${t('message.transcriptionError')}: ${ed.error || t('common.unknownError')}`
                );
            }
        } catch (error) {
            toast.error(t('message.transcriptionFailed'));
        } finally {
            setLocalIsTranscribing(false);
        }
    }, [localIsTranscribing, localTranscription, fetchWithAuth, absoluteHostUrl, msg.id]);

    return (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
        <div
            ref={messageRef}
            className="chat-msg"
            style={useMemo(
                () => ({
                    ...(isGrouped ? styles.chatMessageGrouped : styles.chatMessage),
                    backgroundColor: isSelected ? 'rgba(88, 101, 242, 0.3)' : 'transparent',
                    cursor: isSelectionMode ? 'pointer' : 'default',
                    transform:
                        swipeOffset > 0 ? `translateX(${Math.min(swipeOffset, 60)}px)` : 'none',
                    transition:
                        swipeOffset === 0
                            ? 'transform 0.2s ease, background-color 0.1s ease'
                            : 'background-color 0.1s ease',
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                }),
                [isGrouped, isSelected, isSelectionMode, swipeOffset]
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowReactionPicker(false);
            }}
            onContextMenu={handleContextMenu}
            id={`message-${msg.id}`}
            role="button"
            tabIndex={0}
            onClick={() => isSelectionMode && onToggleSelection(msg.id)}
            onTouchStart={(e) => {
                touchStartXRef.current = e.touches[0].clientX;
                touchStartYRef.current = e.touches[0].clientY;
                swipingRef.current = false;
            }}
            onTouchMove={(e) => {
                const dx = e.touches[0].clientX - touchStartXRef.current;
                const dy = Math.abs(e.touches[0].clientY - touchStartYRef.current);
                if (!swipingRef.current && Math.abs(dx) > 10 && dy < 20) swipingRef.current = true;
                if (swipingRef.current && dx > 0) setSwipeOffset(dx);
            }}
            onTouchEnd={() => {
                if (swipeOffset > 50 && onSetReply) {
                    // Faz 2.3: Haptic feedback on swipe-to-reply
                    if (typeof navigator !== 'undefined' && navigator.vibrate)
                        navigator.vibrate(50);
                    onSetReply(msg);
                }
                setSwipeOffset(0);
                swipingRef.current = false;
            }}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div style={styles.avatarContainer}>
                {isGrouped ? (
                    // Grouped: show tiny timestamp at avatar position on hover
                    <span
                        style={{ ...styles.groupedTimestamp, opacity: isHovered ? 1 : 0 }}
                        aria-hidden="true"
                    >
                        {msg.timestamp
                            ? new Date(msg.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : ''}
                    </span>
                ) : (
                    <LazyImage
                        src={userAvatar}
                        alt={msg.username}
                        style={styles.userAvatar}
                        onClick={() => onViewProfile(msg.username)}
                        placeholder={getDeterministicAvatar(msg.username)}
                    />
                )}
            </div>

            <div style={styles.contentWrapper}>
                {msg.reply_to && (
                    <div
                        style={styles.replyContainer}
                        role="button"
                        tabIndex={0}
                        onClick={() => onScrollToMessage(msg.reply_to.id)}
                        onKeyDown={(e) => e.key === 'Enter' && onScrollToMessage(msg.reply_to.id)}
                        aria-label={t('message.goToReply', 'Go to replied message')}
                    >
                        <div style={styles.replyLine} />
                        <span>@{msg.reply_to.username}</span>
                        <span>
                            {msg.reply_to.content
                                ? msg.reply_to.content.substring(0, 50) + '...'
                                : t('message.fileAttachment', 'File attachment')}
                        </span>
                    </div>
                )}

                {/* Only show header for non-grouped messages */}
                {!isGrouped && (
                    <div style={styles.messageHeader}>
                        <span
                            role="button"
                            tabIndex={0}
                            style={{
                                cursor: 'pointer',
                                fontWeight: 700,
                                color:
                                    msg.username === '⚡ Signal Bot'
                                        ? '#5865f2'
                                        : isAdmin
                                            ? '#f0b232'
                                            : '#fff',
                            }}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && onViewProfile(msg.username)
                            }
                            onClick={() => onViewProfile(msg.username)}
                        >
                            {isAIMessage && '🤖 '} {msg.username}
                        </span>
                        {msg.is_locked && <FaLock title="Kilitli" />}
                        <span style={styles.timestamp}>
                            {formatTimestamp(msg.timestamp)}
                            {msg.is_edited && (
                                <EditHistory
                                    messageId={msg.id}
                                    messageEditHistoryUrl={messageEditHistoryUrl}
                                    fetchWithAuth={fetchWithAuth}
                                />
                            )}
                            {msg.is_pinned && <FaThumbtack />}
                        </span>
                    </div>
                )}

                {isHovered && !msg.temp_id && !isSelectionMode && (
                    <Suspense fallback={null}>
                        <MessageToolbar
                            msg={msg}
                            isMyMessage={isMyMessage}
                            isAdmin={isAdmin}
                            currentPermissions={currentPermissions}
                            onSetReply={onSetReply}
                            onStartEdit={onStartEdit}
                            onDelete={onDelete}
                            onTogglePin={onTogglePin}
                            onToggleReaction={onToggleReaction}
                            onToggleSelection={onToggleSelection}
                            onStartForward={onStartForward}
                            onQuote={handleQuoteMessage}
                            showReactionPicker={showReactionPicker}
                            setShowReactionPicker={setShowReactionPicker}
                            setShowReminderModal={setShowReminderModal}
                            setShowThreadModal={setShowThreadModal}
                            fetchWithAuth={fetchWithAuth}
                            absoluteHostUrl={absoluteHostUrl}
                        />
                    </Suspense>
                )}

                {showReminderModal && (
                    <Suspense fallback={null}>
                        <ReminderModal
                            messageId={msg.id}
                            messageContent={displayContent}
                            onClose={() => setShowReminderModal(false)}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={absoluteHostUrl}
                        />
                    </Suspense>
                )}
                {showThreadModal && (
                    <Suspense fallback={null}>
                        <MessageThreads
                            messageId={msg.id}
                            onClose={() => setShowThreadModal(false)}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={absoluteHostUrl}
                        />
                    </Suspense>
                )}

                <MessageContextMenu
                    contextMenu={contextMenu}
                    msg={msg}
                    isMyMessage={isMyMessage}
                    displayContent={displayContent}
                    onSetReply={onSetReply}
                    onStartEdit={onStartEdit}
                    onDelete={onDelete}
                    onTogglePin={onTogglePin}
                    onStartForward={onStartForward}
                    setShowReactionPicker={setShowReactionPicker}
                    setShowThreadModal={setShowThreadModal}
                    setShowReminderModal={setShowReminderModal}
                    setContextMenu={setContextMenu}
                    fetchWithAuth={fetchWithAuth}
                    absoluteHostUrl={absoluteHostUrl}
                />

                {msg.snippet_data && msg.snippet_data.type === 'game_xox' ? (
                    <Suspense fallback={<div>🎮 {t('message.loadingGame')}</div>}>
                        <TicTacToe
                            gameData={msg.snippet_data}
                            currentUser={currentUser}
                            onMove={(gid, idx) => {
                                fetchWithAuth(`${absoluteHostUrl}/api/games/xox/move/`, {
                                    method: 'POST',
                                    body: JSON.stringify({ game_id: gid, index: idx }),
                                });
                            }}
                        />
                    </Suspense>
                ) : msg.snippet_data ? (
                    <div style={styles.snippetContainer}>
                        <div style={styles.snippetHeader}>
                            <span>💻 {msg.snippet_data.title || t('message.codeSnippet')}</span>
                            <span style={styles.langBadge}>{msg.snippet_data.language}</span>
                        </div>
                        <Suspense fallback={null}>
                            <CodeBlock language={msg.snippet_data.language}>
                                {msg.snippet_data.code}
                            </CodeBlock>
                        </Suspense>
                    </div>
                ) : (
                    displayContent && (
                        <div style={styles.messageContent}>
                            {isMessageEncrypted && (
                                <span title={t('security.encrypted', 'Encrypted')}>
                                    <FaLock />
                                </span>
                            )}
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    a({ href, children, ...props }) {
                                        const handleLinkClick = (e) => {
                                            e.preventDefault();
                                            const url = href;
                                            // Electron: open in external browser
                                            if (
                                                typeof window !== 'undefined' &&
                                                typeof window.require === 'function'
                                            ) {
                                                try {
                                                    const { shell } = window.require('electron');
                                                    shell.openExternal(url);
                                                    return;
                                                } catch {
                                                    /* fallback to window.open */
                                                }
                                            }
                                            // Capacitor native: use Browser plugin
                                            if (
                                                typeof window !== 'undefined' &&
                                                window.Capacitor?.isNativePlatform?.()
                                            ) {
                                                try {
                                                    import('@capacitor/browser')
                                                        .then(({ Browser }) => {
                                                            Browser.open({ url });
                                                        })
                                                        .catch(() =>
                                                            window.open(
                                                                url,
                                                                '_blank',
                                                                'noopener,noreferrer'
                                                            )
                                                        );
                                                    return;
                                                } catch {
                                                    /* fallback */
                                                }
                                            }
                                            // Browser: open in new tab
                                            window.open(url, '_blank', 'noopener,noreferrer');
                                        };
                                        return (
                                            <a
                                                href={href}
                                                onClick={handleLinkClick}
                                                title={href}
                                                rel="noopener noreferrer"
                                                {...props}
                                            >
                                                {children}
                                            </a>
                                        );
                                    },
                                    code({ node, inline, className, children, ...props }) {
                                        return !inline ? (
                                            <Suspense fallback={null}>
                                                <CodeBlock
                                                    language={className?.replace('language-', '')}
                                                    value={children}
                                                />
                                            </Suspense>
                                        ) : (
                                            <code
                                                className={className}
                                                style={styles.inlineCode}
                                                {...props}
                                            >
                                                {children}
                                            </code>
                                        );
                                    },
                                    p: ({ children }) => {
                                        const kids = React.Children.toArray(children);
                                        return (
                                            <p>
                                                {kids.map((child, i) => {
                                                    if (typeof child === 'string') {
                                                        const parts = child.split(/(\|\|.*?\|\|)/g);
                                                        return parts.map((part, j) => {
                                                            if (
                                                                part.startsWith('||') &&
                                                                part.endsWith('||')
                                                            )
                                                                return (
                                                                    <Suspense
                                                                        key={`${i}-${j}`}
                                                                        fallback={null}
                                                                    >
                                                                        <Spoiler>
                                                                            {part.slice(2, -2)}
                                                                        </Spoiler>
                                                                    </Suspense>
                                                                );
                                                            // ── Faz 2.2: @mention highlighting ──
                                                            const mentionParts =
                                                                part.split(/(@\w+)/g);
                                                            return mentionParts.map((mp, k) =>
                                                                /^@\w+$/.test(mp) ? (
                                                                    <span
                                                                        key={`${i}-${j}-${k}`}
                                                                        title={mp}
                                                                    >
                                                                        {mp}
                                                                    </span>
                                                                ) : (
                                                                    mp
                                                                )
                                                            );
                                                        });
                                                    }
                                                    return child;
                                                })}
                                            </p>
                                        );
                                    },
                                }}
                            >
                                {displayContent}
                            </ReactMarkdown>
                        </div>
                    )
                )}

                <MessageMedia
                    msg={msg}
                    displayContent={displayContent}
                    signalCoin={signalCoin}
                    onShowChart={onShowChart}
                    finalImageUrl={finalImageUrl}
                    finalFileUrl={finalFileUrl}
                    fullFileUrl={fullFileUrl}
                    onImageClick={onImageClick}
                    onContentLoad={onContentLoad}
                    localTranscription={localTranscription}
                    localIsTranscribing={localIsTranscribing}
                    handleTranscribe={handleTranscribe}
                    handleVote={handleVote}
                    fetchWithAuth={fetchWithAuth}
                    absoluteHostUrl={absoluteHostUrl}
                />

                {(groupedReactions.length > 0 || (isMyMessage && !msg.temp_id)) && (
                    <div style={styles.footerRow}>
                        {groupedReactions.length > 0 && (
                            <div style={styles.reactionsRow}>
                                {groupedReactions.map(({ emoji, count }) => (
                                    <span
                                        key={emoji}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => onToggleReaction(msg.id, emoji)}
                                        onKeyDown={(e) =>
                                            e.key === 'Enter' && onToggleReaction(msg.id, emoji)
                                        }
                                        style={{
                                            ...styles.reactionTag,
                                            border: myReaction(emoji)
                                                ? '1px solid #5865f2'
                                                : '1px solid transparent',
                                            cursor: 'pointer',
                                        }}
                                        aria-label={`${emoji} tepki (${count})`}
                                    >
                                        {emoji} {count}
                                    </span>
                                ))}
                            </div>
                        )}
                        {isMyMessage && !msg.temp_id && (
                            <span style={styles.readReceipt} title={t('message.delivered', 'Delivered')}>
                                ✓
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const areEqual = (prev, next) => {
    // Primary data props
    if (prev.msg !== next.msg) return false;
    if (prev.currentUser !== next.currentUser) return false;
    if (prev.isAdmin !== next.isAdmin) return false;
    if (prev.isSelectionMode !== next.isSelectionMode) return false;
    if (prev.isSelected !== next.isSelected) return false;
    // Handler props — referential equality; if parent re-creates them, re-render
    if (prev.onDelete !== next.onDelete) return false;
    if (prev.onStartEdit !== next.onStartEdit) return false;
    if (prev.onToggleReaction !== next.onToggleReaction) return false;
    if (prev.onTogglePin !== next.onTogglePin) return false;
    if (prev.onSetReply !== next.onSetReply) return false;
    if (prev.onViewProfile !== next.onViewProfile) return false;
    if (prev.onStartForward !== next.onStartForward) return false;
    if (prev.absoluteHostUrl !== next.absoluteHostUrl) return false;
    return true;
};

const MemoizedMessage = memo(Message, areEqual);

MemoizedMessage.displayName = 'Message';

MemoizedMessage.propTypes = {
    msg: PropTypes.object,
    currentUser: PropTypes.object,
    isAdmin: PropTypes.bool,
    onDelete: PropTypes.func,
    onStartEdit: PropTypes.func,
    onToggleReaction: PropTypes.func,
    onTogglePin: PropTypes.func,
    onSetReply: PropTypes.func,
    onImageClick: PropTypes.func,
    absoluteHostUrl: PropTypes.string,
    onScrollToMessage: PropTypes.func,
    onVisible: PropTypes.func,
    messageEditHistoryUrl: PropTypes.string,
    onViewProfile: PropTypes.func,
    onStartForward: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    isSelectionMode: PropTypes.func,
    isSelected: PropTypes.bool,
    onToggleSelection: PropTypes.func,
    allUsers: PropTypes.array,
    getDeterministicAvatar: PropTypes.func,
    onShowChart: PropTypes.func,
    onContentLoad: PropTypes.func,
    isGrouped: PropTypes.bool,
};
export default MemoizedMessage;

// frontend/src/components/Message/MessageActions.js
// 🎯 MESSAGE ACTIONS - Hover action buttons (compact: core + overflow menu)

import { memo, useState, lazy, Suspense, useCallback, useRef, useEffect } from 'react';
import {
    FaReply, FaEdit, FaTrash, FaSmile, FaShareSquare,
    FaThumbtack, FaCheck, FaBell, FaComments, FaExclamationTriangle,
    FaQuoteLeft, FaEllipsisH
} from 'react-icons/fa';
import toast from '../../utils/toast';

// Lazy load heavy components
const ReactionPicker = lazy(() => import('../../ReactionPicker'));
const BookmarkButton = lazy(() => import('../BookmarkButton').then(m => ({ default: m.BookmarkButton })));
const StarButton = lazy(() => import('../BookmarkButton').then(m => ({ default: m.StarButton })));
const ReadLaterButton = lazy(() => import('../BookmarkButton').then(m => ({ default: m.ReadLaterButton })));

export const MessageActions = memo(({
    msg,
    isMyMessage,
    isAdmin,
    currentPermissions,
    showReactionPicker,
    setShowReactionPicker,
    onToggleReaction,
    onSetReply,
    onStartEdit,
    onDelete,
    onTogglePin,
    onStartForward,
    onToggleSelection,
    onQuote,
    onShowReminderModal,
    onShowThreadModal,
    fetchWithAuth,
    absoluteHostUrl
}) => {
    const [showMore, setShowMore] = useState(false);
    const moreRef = useRef(null);

    // Close overflow menu on outside click
    useEffect(() => {
        if (!showMore) return;
        const handler = (e) => { if (moreRef.current && !moreRef.current.contains(e.target)) setShowMore(false); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [showMore]);

    // Report message handler
    const handleReport = useCallback(async () => {
        const reason = prompt('Rapor sebebi:');
        if (reason) {
            await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                method: 'POST',
                body: JSON.stringify({ message_id: msg.id, reason })
            });
            toast.success('\u2705 Rapor g\u00f6nderildi');
        }
    }, [msg.id, fetchWithAuth, absoluteHostUrl]);

    const closeMore = () => setShowMore(false);

    return (
        <div style={styles.messageActions}>
            {showReactionPicker && (
                <Suspense fallback={null}>
                    <ReactionPicker
                        onEmojiSelect={(e) => onToggleReaction(msg.id, e)}
                        onClose={() => setShowReactionPicker(false)}
                    />
                </Suspense>
            )}

            {/* ─── CORE BUTTONS (always visible) ─── */}
            <button onClick={() => setShowReactionPicker(true)} style={styles.actionButton} title="Tepki">
                <FaSmile />
            </button>
            <button onClick={() => onSetReply(msg)} style={styles.actionButton} title="Yan\u0131tla">
                <FaReply />
            </button>

            {isMyMessage && msg.content && (
                <button onClick={() => onStartEdit(msg)} style={styles.actionButton} title="D\u00fczenle">
                    <FaEdit />
                </button>
            )}

            {(isMyMessage || isAdmin || currentPermissions?.can_delete_messages) && (
                <button onClick={() => onDelete(msg.id)} style={styles.actionButton} title="Sil">
                    <FaTrash />
                </button>
            )}

            {/* ─── OVERFLOW "MORE" MENU ─── */}
            <div ref={moreRef} style={{ position: 'relative' }}>
                <button onClick={() => setShowMore(v => !v)} style={{ ...styles.actionButton, color: showMore ? '#5865f2' : '#b9bbbe' }} title="Daha fazla">
                    <FaEllipsisH />
                </button>

                {showMore && (
                    <div style={styles.overflowMenu}>
                        <button onClick={() => { onQuote(); closeMore(); }} style={styles.menuItem}>
                            <FaQuoteLeft style={styles.menuIcon} /><span>Al\u0131nt\u0131la</span>
                        </button>
                        <button onClick={() => { onStartForward(msg); closeMore(); }} style={styles.menuItem}>
                            <FaShareSquare style={styles.menuIcon} /><span>\u0130let</span>
                        </button>
                        <button onClick={() => { onToggleSelection(msg.id); closeMore(); }} style={styles.menuItem}>
                            <FaCheck style={styles.menuIcon} /><span>Se\u00e7</span>
                        </button>
                        <button onClick={() => { onShowThreadModal(); closeMore(); }} style={styles.menuItem}>
                            <FaComments style={styles.menuIcon} /><span>Thread</span>
                        </button>
                        <button onClick={() => { onShowReminderModal(); closeMore(); }} style={styles.menuItem}>
                            <FaBell style={styles.menuIcon} /><span>Hat\u0131rlat\u0131c\u0131</span>
                        </button>

                        {/* Bookmark, Star, Read Later */}
                        <Suspense fallback={null}>
                            <BookmarkButton messageId={msg.id} isBookmarked={msg.is_bookmarked}
                                fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} />
                            <StarButton messageId={msg.id} isStarred={msg.is_starred}
                                fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} />
                            <ReadLaterButton messageId={msg.id} isReadLater={msg.is_read_later}
                                fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} />
                        </Suspense>

                        {isAdmin && msg.room && (
                            <button onClick={() => { onTogglePin(msg.id); closeMore(); }} style={styles.menuItem}>
                                <FaThumbtack style={styles.menuIcon} /><span>Sabitle</span>
                            </button>
                        )}
                        {!isMyMessage && (
                            <button onClick={() => { handleReport(); closeMore(); }} style={{ ...styles.menuItem, color: '#ed4245' }}>
                                <FaExclamationTriangle style={styles.menuIcon} /><span>Rapor Et</span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
});

const styles = {
    messageActions: {
        position: 'absolute',
        top: '4px',
        right: '12px',
        backgroundColor: '#313338',
        borderRadius: '8px',
        padding: '2px 4px',
        display: 'flex',
        gap: '2px',
        border: '1px solid rgba(255,255,255,0.08)',
        zIndex: 50,
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    },
    actionButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '5px',
        display: 'flex',
        borderRadius: '4px',
        transition: 'all 0.1s'
    },
    overflowMenu: {
        position: 'absolute',
        bottom: '100%',
        right: 0,
        marginBottom: '6px',
        backgroundColor: '#2b2d31',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '6px',
        minWidth: '160px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 10px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '13px',
        cursor: 'pointer',
        transition: 'background 0.15s',
        textAlign: 'left',
        width: '100%',
        whiteSpace: 'nowrap',
    },
    menuIcon: {
        fontSize: '13px',
        flexShrink: 0,
        width: '16px',
    },
};

MessageActions.displayName = 'MessageActions';
export default MessageActions;

// frontend/src/components/Message/MessageActions.js
// 🎯 MESSAGE ACTIONS - Hover action buttons

import { memo, lazy, Suspense, useCallback } from 'react';
import {
    FaReply, FaEdit, FaTrash, FaSmile, FaShareSquare,
    FaThumbtack, FaCheck, FaBell, FaComments, FaExclamationTriangle, FaQuoteLeft
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
    // Report message handler
    const handleReport = useCallback(async () => {
        const reason = prompt('Rapor sebebi:');
        if (reason) {
            await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                method: 'POST',
                body: JSON.stringify({ message_id: msg.id, reason })
            });
            toast.success('✅ Rapor gönderildi');
        }
    }, [msg.id, fetchWithAuth, absoluteHostUrl]);

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

            <button onClick={() => setShowReactionPicker(true)} style={styles.actionButton} title="Tepki">
                <FaSmile />
            </button>
            <button onClick={() => onSetReply(msg)} style={styles.actionButton} title="Yanıtla">
                <FaReply />
            </button>
            <button onClick={onQuote} style={styles.actionButton} title="Alıntıla">
                <FaQuoteLeft />
            </button>
            <button onClick={() => onToggleSelection(msg.id)} style={styles.actionButton} title="Seç">
                <FaCheck />
            </button>
            <button onClick={() => onStartForward(msg)} style={styles.actionButton} title="İlet">
                <FaShareSquare />
            </button>

            {/* Bookmark, Star, Read Later */}
            <Suspense fallback={null}>
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
            </Suspense>

            {/* Hatırlatıcı */}
            <button onClick={onShowReminderModal} style={styles.actionButton} title="Hatırlatıcı Kur">
                <FaBell />
            </button>

            {/* Thread Başlat */}
            <button onClick={onShowThreadModal} style={styles.actionButton} title="Thread Başlat">
                <FaComments />
            </button>

            {/* Rapor Et */}
            {!isMyMessage && (
                <button onClick={handleReport} style={styles.actionButton} title="Rapor Et">
                    <FaExclamationTriangle />
                </button>
            )}

            {/* Düzenle */}
            {isMyMessage && msg.content && (
                <button onClick={() => onStartEdit(msg)} style={styles.actionButton} title="Düzenle">
                    <FaEdit />
                </button>
            )}

            {/* Sil */}
            {(isMyMessage || isAdmin || currentPermissions?.can_delete_messages) && (
                <button onClick={() => onDelete(msg.id)} style={styles.actionButton} title="Sil">
                    <FaTrash />
                </button>
            )}

            {/* Sabitle */}
            {isAdmin && msg.room && (
                <button onClick={() => onTogglePin(msg.id)} style={styles.actionButton} title="Sabitle">
                    <FaThumbtack />
                </button>
            )}
        </div>
    );
});

const styles = {
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
    }
};

MessageActions.displayName = 'MessageActions';
export default MessageActions;

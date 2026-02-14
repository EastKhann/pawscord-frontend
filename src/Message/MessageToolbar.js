import React from 'react';
import {
    FaSmile, FaReply, FaQuoteLeft, FaCheck, FaShareSquare,
    FaBell, FaComments, FaExclamationTriangle, FaEdit, FaTrash, FaThumbtack
} from 'react-icons/fa';
import { lazy, Suspense } from 'react';
import styles from './styles';
import toast from '../utils/toast';

const BookmarkButton = lazy(() => import('../components/BookmarkButton').then(m => ({ default: m.BookmarkButton })));
const StarButton = lazy(() => import('../components/BookmarkButton').then(m => ({ default: m.StarButton })));
const ReadLaterButton = lazy(() => import('../components/BookmarkButton').then(m => ({ default: m.ReadLaterButton })));

const MessageToolbar = ({
    msg, isMyMessage, isAdmin, currentPermissions,
    onSetReply, onStartEdit, onDelete, onTogglePin, onToggleReaction,
    onToggleSelection, onStartForward, onQuote,
    showReactionPicker, setShowReactionPicker,
    setShowReminderModal, setShowThreadModal,
    fetchWithAuth, absoluteHostUrl
}) => {
    const ReactionPicker = lazy(() => import('../ReactionPicker'));

    return (
        <div style={styles.messageActions}>
            {showReactionPicker && (
                <Suspense fallback={null}>
                    <ReactionPicker onEmojiSelect={(e) => onToggleReaction(msg.id, e)} onClose={() => setShowReactionPicker(false)} />
                </Suspense>
            )}
            <button onClick={() => setShowReactionPicker(true)} style={styles.actionButton} title="Tepki"><FaSmile /></button>
            <button onClick={() => onSetReply(msg)} style={styles.actionButton} title="Yanıtla"><FaReply /></button>
            <button onClick={onQuote} style={styles.actionButton} title="Alıntıla"><FaQuoteLeft /></button>
            <button onClick={() => onToggleSelection(msg.id)} style={styles.actionButton} title="Seç"><FaCheck /></button>
            <button onClick={() => onStartForward(msg)} style={styles.actionButton} title="İlet"><FaShareSquare /></button>

            <Suspense fallback={null}>
                <BookmarkButton messageId={msg.id} isBookmarked={msg.is_bookmarked} fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} />
                <StarButton messageId={msg.id} isStarred={msg.is_starred} fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} />
                <ReadLaterButton messageId={msg.id} isReadLater={msg.is_read_later} fetchWithAuth={fetchWithAuth} apiBaseUrl={absoluteHostUrl} />
            </Suspense>

            <button onClick={() => setShowReminderModal(true)} style={styles.actionButton} title="Hatırlatıcı Kur"><FaBell /></button>
            <button onClick={() => setShowThreadModal(true)} style={styles.actionButton} title="Thread Başlat"><FaComments /></button>

            {!isMyMessage && (
                <button
                    onClick={async () => {
                        const reason = prompt('Rapor sebebi:');
                        if (reason) {
                            await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                                method: 'POST', body: JSON.stringify({ message_id: msg.id, reason })
                            });
                            toast.success('✅ Rapor gönderildi');
                        }
                    }}
                    style={styles.actionButton} title="Rapor Et"
                ><FaExclamationTriangle /></button>
            )}

            {isMyMessage && msg.content && (
                <button onClick={() => onStartEdit(msg)} style={styles.actionButton} title="Düzenle"><FaEdit /></button>
            )}

            {(isMyMessage || isAdmin || currentPermissions.can_delete_messages) && (
                <button onClick={() => onDelete(msg.id)} style={styles.actionButton} title="Sil"><FaTrash /></button>
            )}

            {isAdmin && msg.room && (
                <button onClick={() => onTogglePin(msg.id)} style={styles.actionButton} title="Sabitle"><FaThumbtack /></button>
            )}
        </div>
    );
};

export default MessageToolbar;

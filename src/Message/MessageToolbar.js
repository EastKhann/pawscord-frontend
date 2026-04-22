/* eslint-disable no-duplicate-imports */
import React from 'react';
import PropTypes from 'prop-types';
import {
    FaSmile,
    FaReply,
    FaQuoteLeft,
    FaCheck,
    FaShareSquare,
    FaBell,
    FaComments,
    FaExclamationTriangle,
    FaEdit,
    FaTrash,
    FaThumbtack,
} from 'react-icons/fa';
import { lazy, Suspense } from 'react';
import styles from './styles';
import toast from '../utils/toast';

import { useTranslation } from 'react-i18next';
const BookmarkButton = lazy(() =>
    import('../components/chat/BookmarkButton').then((m) => ({ default: m.BookmarkButton }))
);
const StarButton = lazy(() =>
    import('../components/chat/BookmarkButton').then((m) => ({ default: m.StarButton }))
);
const ReadLaterButton = lazy(() =>
    import('../components/chat/BookmarkButton').then((m) => ({ default: m.ReadLaterButton }))
);
const ReactionPicker = lazy(() => import('./'));

const MessageToolbar = ({
    msg,
    isMyMessage,
    isAdmin,
    currentPermissions,
    onSetReply,
    onStartEdit,
    onDelete,
    onTogglePin,
    onToggleReaction,
    onToggleSelection,
    onStartForward,
    onQuote,
    showReactionPicker,
    setShowReactionPicker,
    setShowReminderModal,
    setShowThreadModal,
    fetchWithAuth,
    absoluteHostUrl,
}) => {
    const { t } = useTranslation();
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
            <button
                aria-label={t('messageMenu.addReaction', 'Add Reaction')}
                onClick={() => setShowReactionPicker(true)}
                style={styles.actionButton}
                title={t('messageMenu.addReaction', 'Add Reaction')}
            >
                <FaSmile />
            </button>
            <button
                aria-label={t('common.reply', 'Reply')}
                onClick={() => onSetReply(msg)}
                style={styles.actionButton}
                title={t('common.reply', 'Reply')}
            >
                <FaReply />
            </button>
            <button
                aria-label={t('common.quote', 'Quote')}
                onClick={onQuote}
                style={styles.actionButton}
                title={t('common.quote', 'Quote')}
            >
                <FaQuoteLeft />
            </button>
            <button
                aria-label={t('common.select', 'Select')}
                onClick={() => onToggleSelection(msg.id)}
                style={styles.actionButton}
                title={t('common.select', 'Select')}
            >
                <FaCheck />
            </button>
            <button
                aria-label={t('common.forward', 'Forward')}
                onClick={() => onStartForward(msg)}
                style={styles.actionButton}
                title={t('common.forward', 'Forward')}
            >
                <FaShareSquare />
            </button>

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

            <button
                aria-label={t('common.remind', 'Set Reminder')}
                onClick={() => setShowReminderModal(true)}
                style={styles.actionButton}
                title={t('common.remind', 'Set Reminder')}
            >
                <FaBell />
            </button>
            <button
                aria-label={t('messageMenu.startThread', 'Start Thread')}
                onClick={() => setShowThreadModal(true)}
                style={styles.actionButton}
                title={t('messageMenu.startThread', 'Start Thread')}
            >
                <FaComments />
            </button>

            {!isMyMessage && (
                <button
                    aria-label={t('common.report', 'Report')}
                    onClick={async () => {
                        const reason = prompt('Bildirme sebebi:');
                        if (reason) {
                            await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                                method: 'POST',
                                body: JSON.stringify({ message_id: msg.id, reason }),
                            });
                            toast.success(t('message.reportSent'));
                        }
                    }}
                    style={styles.actionButton}
                    title={t('common.report', 'Report')}
                >
                    <FaExclamationTriangle />
                </button>
            )}

            {isMyMessage && msg.content && (
                <button
                    aria-label={t('common.edit', 'Edit')}
                    onClick={() => onStartEdit(msg)}
                    style={styles.actionButton}
                    title={t('common.edit')}
                >
                    <FaEdit />
                </button>
            )}

            {(isMyMessage || isAdmin || currentPermissions.can_delete_messages) && (
                <button
                    aria-label={t('common.delete', 'Delete')}
                    onClick={() => onDelete(msg.id)}
                    style={styles.actionButton}
                    title="Sil"
                >
                    <FaTrash />
                </button>
            )}

            {isAdmin && msg.room && (
                <button
                    aria-label={t('common.pin', 'Pin')}
                    onClick={() => onTogglePin(msg.id)}
                    style={styles.actionButton}
                    title={t('common.pin', 'Pin')}
                >
                    <FaThumbtack />
                </button>
            )}
        </div>
    );
};

MessageToolbar.propTypes = {
    msg: PropTypes.object,
    isMyMessage: PropTypes.bool,
    isAdmin: PropTypes.bool,
    currentPermissions: PropTypes.array,
    onSetReply: PropTypes.func,
    onStartEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onTogglePin: PropTypes.func,
    onToggleReaction: PropTypes.func,
    onToggleSelection: PropTypes.func,
    onStartForward: PropTypes.func,
    onQuote: PropTypes.func,
    showReactionPicker: PropTypes.func,
    setShowReactionPicker: PropTypes.func,
    setShowReminderModal: PropTypes.func,
    setShowThreadModal: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    absoluteHostUrl: PropTypes.string,
};
export default MessageToolbar;

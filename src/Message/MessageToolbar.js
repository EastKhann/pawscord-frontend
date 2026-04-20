/* eslint-disable no-duplicate-imports */
import React, { useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
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
                aria-label="Tepki Ekle"
                onClick={() => setShowReactionPicker(true)}
                style={styles.actionButton}
                title="Tepki Ekle"
            >
                <FaSmile />
            </button>
            <button
                aria-label="Yanıtla"
                onClick={() => onSetReply(msg)}
                style={styles.actionButton}
                title="Yanıtla"
            >
                <FaReply />
            </button>
            <button
                aria-label="Alıntıla"
                onClick={onQuote}
                style={styles.actionButton}
                title="Alıntıla"
            >
                <FaQuoteLeft />
            </button>
            <button
                aria-label="Seç"
                onClick={() => onToggleSelection(msg.id)}
                style={styles.actionButton}
                title="Seç"
            >
                <FaCheck />
            </button>
            <button
                aria-label="İlet"
                onClick={() => onStartForward(msg)}
                style={styles.actionButton}
                title="İlet"
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
                aria-label="Hatırlatıcı Ayarla"
                onClick={() => setShowReminderModal(true)}
                style={styles.actionButton}
                title="Hatırlatıcı Ayarla"
            >
                <FaBell />
            </button>
            <button
                aria-label="Konu Başlat"
                onClick={() => setShowThreadModal(true)}
                style={styles.actionButton}
                title="Konu Başlat"
            >
                <FaComments />
            </button>

            {!isMyMessage && (
                <button
                    aria-label="Bildir"
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
                    title="Bildir"
                >
                    <FaExclamationTriangle />
                </button>
            )}

            {isMyMessage && msg.content && (
                <button
                    aria-label="Düzenle"
                    onClick={() => onStartEdit(msg)}
                    style={styles.actionButton}
                    title={t('common.edit')}
                >
                    <FaEdit />
                </button>
            )}

            {(isMyMessage || isAdmin || currentPermissions.can_delete_messages) && (
                <button
                    aria-label="Sil"
                    onClick={() => onDelete(msg.id)}
                    style={styles.actionButton}
                    title="Sil"
                >
                    <FaTrash />
                </button>
            )}

            {isAdmin && msg.room && (
                <button
                    aria-label="Sabitle"
                    onClick={() => onTogglePin(msg.id)}
                    style={styles.actionButton}
                    title="Sabitle"
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

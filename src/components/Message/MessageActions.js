// frontend/src/components/Message/MessageActions.js
// 🎯 MESSAGE ACTIONS - Hover action buttons (compact: core + overflow menu)

import { memo, useState, lazy, Suspense, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    FaReply,
    FaEdit,
    FaTrash,
    FaSmile,
    FaShareSquare,
    FaThumbtack,
    FaCheck,
    FaBell,
    FaComments,
    FaExclamationTriangle,
    FaQuoteLeft,
    FaEllipsisH,
} from 'react-icons/fa';
const _s = (o) => o;
import toast from '../../utils/toast';

// Lazy load heavy components
const ReactionPicker = lazy(() => import('./'));
const BookmarkButton = lazy(() =>
    import('../chat/BookmarkButton').then((m) => ({ default: m.BookmarkButton }))
);
const StarButton = lazy(() =>
    import('../chat/BookmarkButton').then((m) => ({ default: m.StarButton }))
);
const ReadLaterButton = lazy(() =>
    import('../chat/BookmarkButton').then((m) => ({ default: m.ReadLaterButton }))
);

export const MessageActions = memo(
    ({
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
        absoluteHostUrl,
    }) => {
        const { t } = useTranslation();
        const [showMore, setShowMore] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
        const moreRef = useRef(null);
        const dangerMenuItemStyle = { ...styles.menuItem, color: '#f23f42' };

        // Close overflow menu on outside click
        useEffect(() => {
            if (!showMore) return;
            const handler = (e) => {
                if (moreRef.current && !moreRef.current.contains(e.target)) setShowMore(false);
            };
            document.addEventListener('mousedown', handler);
            return () => document.removeEventListener('mousedown', handler);
        }, [showMore]);

        // Report message handler
        const handleReport = useCallback(async () => {
            const reason = prompt('Rapor sebebi:');
            if (reason) {
                await fetchWithAuth(`${absoluteHostUrl}/api/messages/report/`, {
                    method: 'POST',
                    body: JSON.stringify({ message_id: msg.id, reason }),
                });
                toast.success(t('messages.reported'));
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
                <button
                    aria-label="Tepki"
                    onClick={() => setShowReactionPicker(true)}
                    style={styles.actionButton}
                    title={t('tepki')}
                >
                    <FaSmile />
                </button>
                <button
                    aria-label="Yan U0131Tla"
                    onClick={() => onSetReply(msg)}
                    style={styles.actionButton}
                    title={t('yan_u0131tla')}
                >
                    <FaReply />
                </button>

                {isMyMessage && msg.content && (
                    <button
                        aria-label="D U00Fczenle"
                        onClick={() => onStartEdit(msg)}
                        style={styles.actionButton}
                        title={t('d_u00fczenle')}
                    >
                        <FaEdit />
                    </button>
                )}

                {(isMyMessage || isAdmin || currentPermissions?.can_delete_messages) && (
                    <button
                        aria-label="Delete"
                        onClick={() => onDelete(msg.id)}
                        style={styles.actionButton}
                        title={t('sil')}
                    >
                        <FaTrash />
                    </button>
                )}

                {/* ─── OVERFLOW "MORE" MENU ─── */}
                <div ref={moreRef} className="pos-relative">
                    <button
                        aria-label="Daha Fazla"
                        onClick={() => setShowMore((v) => !v)}
                        style={_s({
                            ...styles.actionButton,
                            color: showMore ? '#5865f2' : '#b5bac1',
                        })}
                        title={t('daha_fazla')}
                    >
                        <FaEllipsisH />
                    </button>

                    {showMore && (
                        <div style={styles.overflowMenu}>
                            <button
                                aria-label="Action button"
                                onClick={() => {
                                    onQuote();
                                    closeMore();
                                }}
                                style={styles.menuItem}
                            >
                                <FaQuoteLeft style={styles.menuIcon} />
                                <span>{t('al_u0131nt_u0131la')}</span>
                            </button>
                            <button
                                aria-label="Close"
                                onClick={() => {
                                    onStartForward(msg);
                                    closeMore();
                                }}
                                style={styles.menuItem}
                            >
                                <FaShareSquare style={styles.menuIcon} />
                                <span>{t('u0130let')}</span>
                            </button>
                            <button
                                aria-label="Action button"
                                onClick={() => {
                                    onToggleSelection(msg.id);
                                    closeMore();
                                }}
                                style={styles.menuItem}
                            >
                                <FaCheck style={styles.menuIcon} />
                                <span>{t('se_u00e7')}</span>
                            </button>
                            <button
                                aria-label="Action button"
                                onClick={() => {
                                    onShowThreadModal();
                                    closeMore();
                                }}
                                style={styles.menuItem}
                            >
                                <FaComments style={styles.menuIcon} />
                                <span>{t('thread')}</span>
                            </button>
                            <button
                                aria-label="Action button"
                                onClick={() => {
                                    onShowReminderModal();
                                    closeMore();
                                }}
                                style={styles.menuItem}
                            >
                                <FaBell style={styles.menuIcon} />
                                <span>{t('hat_u0131rlat_u0131c_u0131')}</span>
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

                            {isAdmin && msg.room && (
                                <button
                                    aria-label="Action button"
                                    onClick={() => {
                                        onTogglePin(msg.id);
                                        closeMore();
                                    }}
                                    style={styles.menuItem}
                                >
                                    <FaThumbtack style={styles.menuIcon} />
                                    <span>{t('sabitle')}</span>
                                </button>
                            )}
                            {!isMyMessage && (
                                <button
                                    aria-label="Action button"
                                    onClick={() => {
                                        handleReport();
                                        closeMore();
                                    }}
                                    style={dangerMenuItemStyle}
                                >
                                    <FaExclamationTriangle style={styles.menuIcon} />
                                    <span>{t('rapor_et')}</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

const styles = {
    messageActions: {
        position: 'absolute',
        top: '4px',
        right: '12px',
        backgroundColor: '#17191c',
        borderRadius: '8px',
        padding: '2px 4px',
        display: 'flex',
        gap: '2px',
        border: '1px solid rgba(255,255,255,0.08)',
        zIndex: 50,
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    },
    actionButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '14px',
        padding: '5px',
        display: 'flex',
        borderRadius: '4px',
        transition: 'all 0.1s',
    },
    overflowMenu: {
        position: 'absolute',
        bottom: '100%',
        right: 0,
        marginBottom: '6px',
        backgroundColor: '#17191c',
        border: '1px solid rgba(255,255,255,0.08)',
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
        color: '#dbdee1',
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
MessageActions.propTypes = {
    msg: PropTypes.object,
    isMyMessage: PropTypes.bool,
    isAdmin: PropTypes.bool,
    currentPermissions: PropTypes.array,
    showReactionPicker: PropTypes.func,
    setShowReactionPicker: PropTypes.func,
    onToggleReaction: PropTypes.func,
    onSetReply: PropTypes.func,
    onStartEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onTogglePin: PropTypes.func,
    onStartForward: PropTypes.func,
    onToggleSelection: PropTypes.func,
    onQuote: PropTypes.func,
    onShowReminderModal: PropTypes.func,
    onShowThreadModal: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    absoluteHostUrl: PropTypes.string,
};
export default MessageActions;

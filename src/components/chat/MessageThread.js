// components/MessageThreads.js
// 💬 Message Threads - Discord-style conversation threads

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaComments, FaTimes, FaReply, FaPaperPlane } from 'react-icons/fa';
import './MessageThread.css';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
const MessageThread = ({
    parentMessage,
    onClose,
    onSendReply,
    fetchWithAuth,
    apiBaseUrl,
    currentUser,
}) => {
    const { t } = useTranslation();
    const [replies, setReplies] = useState([]);
    const [replyText, setReplyText] = useState('');
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        loadThreadReplies();
    }, [parentMessage.id]);

    const loadThreadReplies = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/messages/${parentMessage.id}/thread/`
            );
            if (response.ok) {
                const data = await response.json();
                setReplies(data.replies || []);
            }
        } catch (error) {
            logger.error('Thread could not be loaded:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyText.trim() || sending) return;

        setSending(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/messages/${parentMessage.id}/thread/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: replyText }),
                }
            );

            if (response.ok) {
                const newReply = await response.json();
                setReplies([...replies, newReply]);
                setReplyText('');
                onSendReply?.(newReply);
            }
        } catch (error) {
            logger.error('Reply could not be sent:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="thread-panel">
            {/* Header */}
            <div className="thread-header">
                <div className="thread-title">
                    <FaComments /> Thread
                </div>
                <button aria-label={t('common.close', 'Close')} className="thread-close" onClick={onClose}>
                    <FaTimes />
                </button>
            </div>

            {/* Parent Message */}
            <div className="thread-parent">
                <div className="parent-user">{parentMessage.username}</div>
                <div className="parent-content">{parentMessage.content}</div>
                <div className="parent-meta">
                    {new Date(parentMessage.timestamp).toLocaleString('tr-TR')}
                </div>
            </div>

            {/* Replies */}
            <div className="thread-replies">
                {loading ? (
                    <div className="thread-loading">{t('common.loading')}</div>
                ) : replies.length > 0 ? (
                    replies.map((reply, index) => (
                        <div
                            key={reply.id || `reply-${reply.timestamp}-${index}`}
                            className="thread-reply"
                        >
                            <div className="reply-user">{reply.username}</div>
                            <div className="reply-content">{reply.content}</div>
                            <div className="reply-meta">
                                {new Date(reply.timestamp || reply.created_at).toLocaleString(
                                    'tr-TR'
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="thread-empty">
                        <FaComments size={48} />
                        <p>{t('msgThread.noReplies', 'No replies yet')}</p>
                        <small>{t('msgThread.beFirst', 'Be the first to reply!')}</small>
                    </div>
                )}
            </div>

            {/* Reply Input */}
            <form className="thread-input" onSubmit={handleSendReply}>
                <input
                    type="text"
                    placeholder={t('msgThread.replyPlaceholder', "Thread'e cevap yaz...")}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={sending}
                />
                <button aria-label={t('common.send')} type="submit" disabled={!replyText.trim() || sending}>
                    {sending ? '...' : <FaPaperPlane />}
                </button>
            </form>

            {/* Reply Count Badge */}
            {replies.length > 0 && <div className="thread-count-badge">{replies.length} {t('msgThread.replies', 'cevap')}</div>}
        </div>
    );
};

export const ThreadPreview = ({ message, onClick }) => {
    const replyCount = message.thread_reply_count || 0;

    if (replyCount === 0) return null;

    return (
        <div
            className="thread-preview"
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <FaComments /> {replyCount} cevap
        </div>
    );
};

MessageThread.propTypes = {
    parentMessage: PropTypes.object,
    onClose: PropTypes.func,
    onSendReply: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    currentUser: PropTypes.object,
};

ThreadPreview.propTypes = {
    message: PropTypes.string,
    onClick: PropTypes.func,
};

export default MessageThread;

// frontend/src/components/MessageThreadPanel.js

/**
 * 🧵 Message Thread Panel
 * Side panel for viewing message threads
 */

import React, { useState, useEffect, useRef } from 'react';
import FaReply from 'react-icons/fa/FaReply';
import FaTimes from 'react-icons/fa/FaTimes';
import FaArrowLeft from 'react-icons/fa/FaArrowLeft';
import FaUsers from 'react-icons/fa/FaUsers';

const MessageThreadPanel = ({
    parentMessage,
    onClose,
    apiBaseUrl,
    fetchWithAuth,
    currentUser,
    onSendReply
}) => {
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);
    const repliesEndRef = useRef(null);

    // Fetch thread replies
    useEffect(() => {
        fetchReplies();
    }, [parentMessage.id]);

    const fetchReplies = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(
                `${apiBaseUrl}/messages/${parentMessage.id}/replies/`
            );

            if (response.ok) {
                const data = await response.json();
                setReplies(data.replies || []);
            }
        } catch (error) {
            console.error('Failed to fetch replies:', error);
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
                `${apiBaseUrl}/messages/${parentMessage.id}/replies/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: replyText.trim()
                    })
                }
            );

            if (response.ok) {
                const newReply = await response.json();
                setReplies(prev => [...prev, newReply]);
                setReplyText('');

                setTimeout(() => {
                    repliesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                }, 100);

                if (onSendReply) {
                    onSendReply(newReply);
                }
            }
        } catch (error) {
            console.error('Failed to send reply:', error);
        } finally {
            setSending(false);
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Az önce';
        if (diffMins < 60) return `${diffMins}dk önce`;

        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours}s önce`;

        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <button onClick={onClose} style={styles.backButton}>
                    <FaArrowLeft />
                </button>
                <div style={styles.headerTitle}>
                    <FaReply style={styles.headerIcon} />
                    <span>Thread</span>
                    <span style={styles.replyCount}>
                        {replies.length} yanıt
                    </span>
                </div>
                <button onClick={onClose} style={styles.closeButton}>
                    <FaTimes />
                </button>
            </div>

            {/* Parent Message */}
            <div style={styles.parentMessage}>
                <div style={styles.messageHeader}>
                    <div style={styles.avatar}>
                        {parentMessage.username?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div style={styles.messageInfo}>
                        <span style={styles.username}>{parentMessage.username}</span>
                        <span style={styles.timestamp}>
                            {formatTime(parentMessage.created_at)}
                        </span>
                    </div>
                </div>
                <div style={styles.messageContent}>
                    {parentMessage.content}
                </div>
                <div style={styles.threadDivider}>
                    <FaUsers style={{ fontSize: '12px', opacity: 0.5 }} />
                    <span>{replies.length} yanıt</span>
                </div>
            </div>

            {/* Replies */}
            <div style={styles.repliesContainer}>
                {loading ? (
                    <div style={styles.loadingState}>
                        <div style={styles.spinner} />
                        <span>Yanıtlar yükleniyor...</span>
                    </div>
                ) : replies.length === 0 ? (
                    <div style={styles.emptyState}>
                        <FaReply style={styles.emptyIcon} />
                        <p>Henüz yanıt yok</p>
                        <p style={styles.emptySubtext}>İlk yanıtı sen ver!</p>
                    </div>
                ) : (
                    replies.map((reply) => (
                        <div key={reply.id} style={styles.replyItem}>
                            <div style={styles.replyLine} />
                            <div style={styles.replyAvatar}>
                                {reply.username?.[0]?.toUpperCase() || 'U'}
                            </div>
                            <div style={styles.replyContent}>
                                <div style={styles.replyHeader}>
                                    <span style={styles.replyUsername}>{reply.username}</span>
                                    <span style={styles.replyTimestamp}>
                                        {formatTime(reply.created_at)}
                                    </span>
                                </div>
                                <div style={styles.replyText}>
                                    {reply.content}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={repliesEndRef} />
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendReply} style={styles.inputContainer}>
                <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Bu thread'e yanıt ver..."
                    style={styles.input}
                    disabled={sending}
                    autoFocus
                />
                <button
                    type="submit"
                    style={{
                        ...styles.sendButton,
                        ...((!replyText.trim() || sending) && styles.sendButtonDisabled)
                    }}
                    disabled={!replyText.trim() || sending}
                >
                    {sending ? '...' : 'Gönder'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#36393f',
        color: '#dcddde'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderBottom: '1px solid #202225',
        backgroundColor: '#2f3136'
    },
    backButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center'
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '16px',
        fontWeight: 'bold',
        flex: 1,
        marginLeft: '8px'
    },
    headerIcon: {
        color: '#5865f2'
    },
    replyCount: {
        fontSize: '13px',
        color: '#b9bbbe',
        fontWeight: 'normal'
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '18px',
        cursor: 'pointer',
        padding: '8px'
    },
    parentMessage: {
        padding: '16px',
        borderBottom: '2px solid #202225',
        backgroundColor: '#2f3136'
    },
    messageHeader: {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        marginBottom: '8px'
    },
    avatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#fff'
    },
    messageInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    username: {
        fontWeight: 'bold',
        color: '#fff'
    },
    timestamp: {
        fontSize: '12px',
        color: '#72767d'
    },
    messageContent: {
        fontSize: '15px',
        lineHeight: '1.5',
        color: '#dcddde',
        marginLeft: '52px'
    },
    threadDivider: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginTop: '12px',
        marginLeft: '52px',
        fontSize: '12px',
        color: '#72767d'
    },
    repliesContainer: {
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    loadingState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        color: '#b9bbbe',
        gap: '12px'
    },
    spinner: {
        width: '32px',
        height: '32px',
        border: '3px solid #404249',
        borderTop: '3px solid #5865f2',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        color: '#b9bbbe',
        textAlign: 'center',
        flex: 1
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px',
        opacity: 0.5
    },
    emptySubtext: {
        fontSize: '13px',
        color: '#72767d',
        marginTop: '4px'
    },
    replyItem: {
        display: 'flex',
        gap: '12px',
        position: 'relative',
        paddingLeft: '20px'
    },
    replyLine: {
        position: 'absolute',
        left: '0',
        top: '0',
        bottom: '0',
        width: '2px',
        backgroundColor: '#404249'
    },
    replyAvatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#404249',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#dcddde',
        flexShrink: 0
    },
    replyContent: {
        flex: 1,
        minWidth: 0
    },
    replyHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '4px'
    },
    replyUsername: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: '14px'
    },
    replyTimestamp: {
        fontSize: '11px',
        color: '#72767d'
    },
    replyText: {
        fontSize: '14px',
        lineHeight: '1.4',
        color: '#dcddde'
    },
    inputContainer: {
        padding: '16px',
        borderTop: '1px solid #202225',
        backgroundColor: '#2f3136',
        display: 'flex',
        gap: '8px'
    },
    input: {
        flex: 1,
        backgroundColor: '#40444b',
        border: '1px solid #202225',
        borderRadius: '4px',
        padding: '10px 12px',
        color: '#dcddde',
        fontSize: '14px',
        outline: 'none'
    },
    sendButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    sendButtonDisabled: {
        backgroundColor: '#404249',
        cursor: 'not-allowed',
        opacity: 0.5'
  }
};

export default MessageThreadPanel;



// frontend/src/components/PinnedMessages/PinnedMessages.js

import { useState, useEffect } from 'react';
import './PinnedMessages.css';
import { getApiBase } from '../../utils/apiEndpoints';

/**
 * 📌 Pinned Messages Panel
 * Shows all pinned messages in a channel
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || getApiBase();

const PinnedMessages = ({
    isOpen,
    onClose,
    roomId,
    token,
    onMessageClick,
    onUnpin
}) => {
    const [pinnedMessages, setPinnedMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen && roomId) {
            fetchPinnedMessages();
        }
    }, [isOpen, roomId]);

    const fetchPinnedMessages = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/rooms/${roomId}/pinned/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setPinnedMessages(data.messages || data || []);
            }
        } catch (error) {
            console.error('Failed to fetch pinned messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnpin = async (messageId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/messages/${messageId}/unpin/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                setPinnedMessages(prev => prev.filter(m => m.id !== messageId));
                onUnpin?.(messageId);
            }
        } catch (error) {
            console.error('Failed to unpin message:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!isOpen) return null;

    return (
        <div className="pinned-messages-panel">
            <div className="pinned-header">
                <h3>📌 Pinned Messages</h3>
                <button className="close-btn" onClick={onClose}>✕</button>
            </div>

            <div className="pinned-content">
                {loading ? (
                    <div className="pinned-loading">
                        <span className="spinner">⏳</span>
                        <p>Loading pinned messages...</p>
                    </div>
                ) : pinnedMessages.length > 0 ? (
                    pinnedMessages.map(message => (
                        <div
                            key={message.id}
                            className="pinned-message"
                            onClick={() => onMessageClick?.(message)}
                        >
                            <div className="pinned-message-header">
                                <img
                                    src={message.author?.avatar || message.sender?.avatar || '/default-avatar.png'}
                                    alt=""
                                    className="pinned-avatar"
                                />
                                <div className="pinned-author-info">
                                    <span className="pinned-author">
                                        {message.author?.username || message.sender?.username || message.username}
                                    </span>
                                    <span className="pinned-date">
                                        {formatDate(message.timestamp || message.created_at)}
                                    </span>
                                </div>
                                <button
                                    className="unpin-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnpin(message.id);
                                    }}
                                    title="Unpin message"
                                >
                                    📌
                                </button>
                            </div>
                            <div className="pinned-message-content">
                                {message.content}
                            </div>
                            {message.attachments?.length > 0 && (
                                <div className="pinned-attachments">
                                    📎 {message.attachments.length} attachment(s)
                                </div>
                            )}
                            <button className="jump-btn">
                                Jump to message →
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="no-pinned">
                        <span className="no-pinned-icon">📌</span>
                        <h4>No Pinned Messages</h4>
                        <p>Pin important messages to easily find them later!</p>
                        <p className="tip">Right-click a message → Pin Message</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PinnedMessages;

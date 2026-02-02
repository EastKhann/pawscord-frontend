// frontend/src/components/SavedMessagesModal.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaBookmark, FaStar, FaClock, FaTrash } from 'react-icons/fa';

const SavedMessagesModal = ({ type = 'bookmarks', onClose, fetchWithAuth, apiBaseUrl, onScrollToMessage }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMessages();
    }, [type]);

    const loadMessages = async () => {
        setLoading(true);
        try {
            let endpoint = '';
            if (type === 'bookmarks') endpoint = '/messages/favorites/';
            else if (type === 'starred') endpoint = '/messages/favorites/';
            else if (type === 'readlater') endpoint = '/messages/readlater/list/';

            const res = await fetchWithAuth(`${apiBaseUrl}${endpoint}`);
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages || data.results || []);
            }
        } catch (error) {
            console.error('Load saved messages error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (messageId) => {
        try {
            let endpoint = '';
            if (type === 'bookmarks') endpoint = '/messages/bookmark/toggle/';
            else if (type === 'starred') endpoint = '/messages/star/toggle/';
            else if (type === 'readlater') endpoint = '/messages/readlater/toggle/';

            await fetchWithAuth(`${apiBaseUrl}${endpoint}`, {
                method: 'POST',
                body: JSON.stringify({ message_id: messageId })
            });

            setMessages(prev => prev.filter(msg => msg.id !== messageId));
        } catch (error) {
            console.error('Remove error:', error);
        }
    };

    const getTitle = () => {
        if (type === 'bookmarks') return '📑 Bookmarklar';
        if (type === 'starred') return '⭐ Yıldızlı Mesajlar';
        if (type === 'readlater') return '🕐 Sonra Oku';
        return 'Kaydedilen Mesajlar';
    };

    const getIcon = () => {
        if (type === 'bookmarks') return <FaBookmark />;
        if (type === 'starred') return <FaStar />;
        if (type === 'readlater') return <FaClock />;
        return null;
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        {getIcon()} {getTitle()}
                    </h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : messages.length === 0 ? (
                        <div style={styles.empty}>
                            Henüz kaydedilmiş mesaj yok
                        </div>
                    ) : (
                        <div style={styles.messageList}>
                            {messages.map(msg => (
                                <div key={msg.id} style={styles.messageItem}>
                                    <div style={styles.messageContent}>
                                        <div style={styles.messageHeader}>
                                            <span style={styles.username}>{msg.username}</span>
                                            <span style={styles.timestamp}>
                                                {new Date(msg.timestamp).toLocaleString('tr-TR')}
                                            </span>
                                        </div>
                                        <div style={styles.messageText}>
                                            {msg.content?.substring(0, 150)}
                                            {msg.content?.length > 150 && '...'}
                                        </div>
                                        {msg.room_name && (
                                            <div style={styles.roomTag}>#{msg.room_name}</div>
                                        )}
                                    </div>
                                    <div style={styles.actions}>
                                        <button
                                            onClick={() => {
                                                if (onScrollToMessage) {
                                                    onScrollToMessage(msg.id);
                                                    onClose();
                                                }
                                            }}
                                            style={styles.actionButton}
                                            title="Mesaja git"
                                        >
                                            →
                                        </button>
                                        <button
                                            onClick={() => handleRemove(msg.id)}
                                            style={{ ...styles.actionButton, color: '#f04747' }}
                                            title="Kaldır"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #40444b'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.5em',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.5em',
        padding: '5px'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    loading: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px'
    },
    messageList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    messageItem: {
        backgroundColor: '#40444b',
        borderRadius: '4px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '10px'
    },
    messageContent: {
        flex: 1
    },
    messageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '5px'
    },
    username: {
        color: '#5865f2',
        fontWeight: 'bold',
        fontSize: '0.9em'
    },
    timestamp: {
        color: '#72767d',
        fontSize: '0.75em'
    },
    messageText: {
        color: '#dcddde',
        fontSize: '0.9em',
        marginBottom: '5px'
    },
    roomTag: {
        display: 'inline-block',
        backgroundColor: '#5865f2',
        color: 'white',
        padding: '2px 8px',
        borderRadius: '10px',
        fontSize: '0.7em',
        fontWeight: 'bold'
    },
    actions: {
        display: 'flex',
        gap: '5px'
    },
    actionButton: {
        background: 'none',
        border: '1px solid #72767d',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '0.9em'
    }
};

export default React.memo(SavedMessagesModal);



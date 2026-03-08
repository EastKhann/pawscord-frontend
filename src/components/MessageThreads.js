// frontend/src/components/MessageThreads.js
import { useState } from 'react';
import { FaTimes, FaComments, FaBell, FaBellSlash } from 'react-icons/fa';
import toast from '../utils/toast';

const MessageThreads = ({ messageId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [threadMessage, setThreadMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false); // 🆕 Subscription state

    // 🆕 Toggle subscription
    const handleToggleSubscription = async () => {
        try {
            const endpoint = subscribed ? 'unsubscribe' : 'subscribe';
            const res = await fetchWithAuth(`${apiBaseUrl}/threads/${endpoint}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ thread_id: messageId })
            });

            if (res.ok) {
                setSubscribed(!subscribed);
            }
        } catch (error) {
            console.error('Subscription error:', error);
        }
    };

    const handleSendThread = async () => {
        if (!threadMessage.trim()) return;

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/threads/create/`, {
                method: 'POST',
                body: JSON.stringify({
                    parent_message_id: messageId,
                    content: threadMessage
                })
            });

            if (res.ok) {
                toast.success('✅ Thread oluşturuldu!');
                setThreadMessage('');
                onClose();
            }
        } catch (error) {
            console.error('Thread error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        <FaComments /> Thread Başlat
                    </h3>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {/* 🆕 Subscription Toggle */}
                    <div style={{
                        padding: '12px',
                        backgroundColor: '#111214',
                        borderRadius: '6px',
                        marginBottom: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <span style={{ color: '#dbdee1', fontSize: '14px' }}>
                            {subscribed ? '🔔 Subscribed to notifications' : '🔕 Not subscribed'}
                        </span>
                        <button
                            onClick={handleToggleSubscription}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: subscribed ? '#f23f42' : '#23a559',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontSize: '13px',
                                fontWeight: 'bold'
                            }}
                        >
                            {subscribed ? <><FaBellSlash /> Unsubscribe</> : <><FaBell /> Subscribe</>}
                        </button>
                    </div>

                    <textarea
                        value={threadMessage}
                        onChange={(e) => setThreadMessage(e.target.value)}
                        placeholder="Thread mesajını yazın..."
                        style={styles.textarea}
                    />
                    <button
                        onClick={handleSendThread}
                        disabled={loading || !threadMessage.trim()}
                        style={styles.sendButton}
                    >
                        {loading ? 'Gönderiliyor...' : '💬 Thread Gönder'}
                    </button>
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
        backgroundColor: '#111214',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #182135'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.3em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.3em'
    },
    content: {
        padding: '20px'
    },
    textarea: {
        width: '100%',
        minHeight: '100px',
        padding: '10px',
        backgroundColor: '#1e2024',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
        fontSize: '1em',
        resize: 'vertical',
        marginBottom: '15px'
    },
    sendButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1em'
    }
};

export default MessageThreads;



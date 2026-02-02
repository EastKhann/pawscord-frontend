import React, { useState, useEffect } from 'react';
import { FaTimes, FaHistory, FaHashtag } from 'react-icons/fa';
import { toast } from '../utils/toast';

const TopicHistoryPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const [history, setHistory] = useState([]);
    const [currentTopic, setCurrentTopic] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTopicHistory();
    }, [roomSlug]);

    const fetchTopicHistory = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/topics/${roomSlug}/history/`);
            const data = await response.json();
            setHistory(data.history || []);
            setCurrentTopic(data.current_topic || '');
        } catch (error) {
            toast.error('Failed to load topic history');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaHashtag style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Topic History</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {currentTopic && (
                        <div style={styles.currentTopic}>
                            <div style={styles.currentTopicLabel}>Current Topic</div>
                            <div style={styles.currentTopicText}>{currentTopic}</div>
                        </div>
                    )}

                    {loading ? (
                        <div style={styles.loading}>Loading history...</div>
                    ) : history.length === 0 ? (
                        <div style={styles.empty}>No topic history available</div>
                    ) : (
                        <div style={styles.historyList}>
                            {history.map((entry, idx) => (
                                <div key={idx} style={styles.historyItem}>
                                    <div style={styles.topicText}>{entry.topic}</div>
                                    <div style={styles.topicMeta}>
                                        Set by {entry.user?.username || 'Unknown'} on {new Date(entry.set_at).toLocaleString()}
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
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #2c2f33',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    currentTopic: {
        backgroundColor: '#5865f2',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '20px',
    },
    currentTopicLabel: {
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: '4px',
        fontWeight: '600',
    },
    currentTopicText: {
        fontSize: '16px',
        color: '#ffffff',
        fontWeight: '500',
    },
    loading: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    historyList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    historyItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
    },
    topicText: {
        fontSize: '15px',
        color: '#dcddde',
        marginBottom: '8px',
        fontWeight: '500',
    },
    topicMeta: {
        fontSize: '12px',
        color: '#99aab5',
    },
};

export default TopicHistoryPanel;

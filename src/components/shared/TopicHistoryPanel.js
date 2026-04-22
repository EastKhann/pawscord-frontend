import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaHistory, FaHashtag } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import { useTranslation } from 'react-i18next';

const TopicHistoryPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const { t } = useTranslation();
    const [history, setHistory] = useState([]);
    const [currentTopic, setCurrentTopic] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTopicHistory();
    }, [roomSlug]);

    const fetchTopicHistory = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/topics/${roomSlug}/history/`);
            const data = await response.json();
            setHistory(data.history || []);
            setCurrentTopic(data.current_topic || '');
        } catch (error) {
            toast.error(t('topic.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaHashtag className="icon-primary-mr10" />
                        <h2 style={styles.title}>{t('topicHistory.title', 'Topic History')}</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {currentTopic && (
                        <div style={styles.currentTopic}>
                            <div style={styles.currentTopicLabel}>Mevcut Konu</div>
                            <div style={styles.currentTopicText}>{currentTopic}</div>
                        </div>
                    )}

                    {loading ? (
                        <div style={styles.loading}>{t('topicHistory.loading', 'Loading history...')}</div>
                    ) : history.length === 0 ? (
                        <div style={styles.empty}>{t('topicHistory.empty', 'Topic history not found')}</div>
                    ) : (
                        <div style={styles.historyList}>
                            {history.map((entry, idx) => (
                                <div key={`item-${idx}`} style={styles.historyItem}>
                                    <div style={styles.topicText}>{entry.topic}</div>
                                    <div style={styles.topicMeta}>
                                        {entry.user?.username || t('common.unknown', 'Unknown')} {t('topicHistory.setBy', 'by')}{' '}
                                        {new Date(entry.set_at).toLocaleString('tr-TR')} tarihinde
                                        {t('topicHistory.set', 'set')}
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
        borderBottom: '1px solid #0e1222',
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
        color: '#949ba4',
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
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    historyList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    historyItem: {
        backgroundColor: '#111214',
        borderRadius: '6px',
        padding: '16px',
    },
    topicText: {
        fontSize: '15px',
        color: '#dbdee1',
        marginBottom: '8px',
        fontWeight: '500',
    },
    topicMeta: {
        fontSize: '12px',
        color: '#949ba4',
    },
};

TopicHistoryPanel.propTypes = {
    channelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClose: PropTypes.func.isRequired,
    fetchWithAuth: PropTypes.func.isRequired,
    apiBaseUrl: PropTypes.string.isRequired,
};
export default TopicHistoryPanel;

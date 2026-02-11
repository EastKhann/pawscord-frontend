import { useState, useEffect } from 'react';
import { FaTimes, FaHistory, FaUser } from 'react-icons/fa';
import { toast } from '../utils/toast';

const NicknameHistoryPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, [username]);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/${username}/nicknames/history/`);
            const data = await response.json();
            setHistory(data.history || []);
        } catch (error) {
            toast.error('Failed to load nickname history');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaHistory style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Nickname History - {username}</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading history...</div>
                    ) : history.length === 0 ? (
                        <div style={styles.empty}>No nickname changes recorded</div>
                    ) : (
                        <div style={styles.timeline}>
                            {history.map((entry, idx) => (
                                <div key={idx} style={styles.timelineItem}>
                                    <div style={styles.timelineDot} />
                                    <div style={styles.timelineContent}>
                                        <div style={styles.nicknameChange}>
                                            <div style={styles.oldNickname}>
                                                {entry.old_nickname || 'No nickname'}
                                            </div>
                                            <div style={styles.arrow}>→</div>
                                            <div style={styles.newNickname}>
                                                {entry.new_nickname || 'No nickname'}
                                            </div>
                                        </div>
                                        <div style={styles.changeInfo}>
                                            <div style={styles.server}>
                                                {entry.server_name && `in ${entry.server_name}`}
                                            </div>
                                            <div style={styles.timestamp}>
                                                {new Date(entry.changed_at).toLocaleString()}
                                            </div>
                                        </div>
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
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative',
        paddingLeft: '30px',
    },
    timelineItem: {
        position: 'relative',
        display: 'flex',
        gap: '16px',
    },
    timelineDot: {
        position: 'absolute',
        left: '-34px',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#5865f2',
        border: '3px solid #1e1e1e',
    },
    timelineContent: {
        flex: 1,
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
    },
    nicknameChange: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px',
    },
    oldNickname: {
        fontSize: '14px',
        color: '#99aab5',
        textDecoration: 'line-through',
    },
    arrow: {
        fontSize: '18px',
        color: '#5865f2',
    },
    newNickname: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
    },
    changeInfo: {
        display: 'flex',
        gap: '12px',
        fontSize: '12px',
        color: '#99aab5',
    },
    server: {
        flex: 1,
    },
    timestamp: {
        flex: 1,
        textAlign: 'right',
    },
};

export default NicknameHistoryPanel;

import React, { useState, useEffect } from 'react';
import { FaTimes, FaChartBar, FaClock, FaCalendar } from 'react-icons/fa';
import { toast } from '../utils/toast';

const UserActivityPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [activityLog, setActivityLog] = useState([]);
    const [presenceHistory, setPresenceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('activity'); // activity, presence

    useEffect(() => {
        fetchActivityLog();
        fetchPresenceHistory();
    }, [username]);

    const fetchActivityLog = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/activity/${username}/`);
            const data = await response.json();
            setActivityLog(data.activity || []);
        } catch (error) {
            toast.error('Failed to load activity log');
        } finally {
            setLoading(false);
        }
    };

    const fetchPresenceHistory = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/presence/${username}/`);
            const data = await response.json();
            setPresenceHistory(data.history || []);
        } catch (error) {
            toast.error('Failed to load presence history');
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'message':
                return '💬';
            case 'reaction':
                return '❤️';
            case 'join':
                return '🚪';
            case 'voice':
                return '🎤';
            default:
                return '📊';
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaChartBar style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Activity - {username}</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button onClick={() => setActiveTab('activity')} style={{ ...styles.tab, ...(activeTab === 'activity' && styles.tabActive) }}>
                        <FaClock style={{ marginRight: '5px' }} />
                        Activity Log
                    </button>
                    <button onClick={() => setActiveTab('presence')} style={{ ...styles.tab, ...(activeTab === 'presence' && styles.tabActive) }}>
                        <FaCalendar style={{ marginRight: '5px' }} />
                        Presence History
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading activity...</div>
                    ) : activeTab === 'activity' ? (
                        <div style={styles.activityList}>
                            {activityLog.length === 0 ? (
                                <div style={styles.empty}>No activity data available</div>
                            ) : (
                                activityLog.map((activity, idx) => (
                                    <div key={idx} style={styles.activityItem}>
                                        <div style={styles.activityIcon}>{getActivityIcon(activity.type)}</div>
                                        <div style={styles.activityInfo}>
                                            <div style={styles.activityText}>{activity.description}</div>
                                            <div style={styles.activityTime}>
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        <div style={styles.presenceList}>
                            {presenceHistory.length === 0 ? (
                                <div style={styles.empty}>No presence history available</div>
                            ) : (
                                presenceHistory.map((presence, idx) => (
                                    <div key={idx} style={styles.presenceItem}>
                                        <div style={{
                                            ...styles.statusIndicator,
                                            backgroundColor: presence.status === 'online' ? '#43b581' :
                                                presence.status === 'idle' ? '#faa61a' :
                                                    presence.status === 'dnd' ? '#f04747' : '#99aab5'
                                        }} />
                                        <div style={styles.presenceInfo}>
                                            <div style={styles.presenceStatus}>
                                                {presence.status.charAt(0).toUpperCase() + presence.status.slice(1)}
                                            </div>
                                            <div style={styles.presenceTime}>
                                                {new Date(presence.timestamp).toLocaleString()}
                                            </div>
                                        </div>
                                        {presence.duration && (
                                            <div style={styles.presenceDuration}>
                                                {Math.round(presence.duration / 60)} minutes
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
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
        maxWidth: '700px',
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
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #2c2f33',
        padding: '0 20px',
    },
    tab: {
        padding: '12px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '2px solid transparent',
    },
    tabActive: {
        color: '#5865f2',
        borderBottom: '2px solid #5865f2',
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
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    activityItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    activityIcon: {
        fontSize: '24px',
    },
    activityInfo: {
        flex: 1,
    },
    activityText: {
        fontSize: '14px',
        color: '#dcddde',
        marginBottom: '4px',
    },
    activityTime: {
        fontSize: '12px',
        color: '#99aab5',
    },
    presenceList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    presenceItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
    },
    statusIndicator: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
    },
    presenceInfo: {
        flex: 1,
    },
    presenceStatus: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    presenceTime: {
        fontSize: '12px',
        color: '#99aab5',
    },
    presenceDuration: {
        fontSize: '13px',
        color: '#dcddde',
    },
};

export default UserActivityPanel;

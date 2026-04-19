import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FaTimes, FaChartBar, FaClock, FaCalendar } from 'react-icons/fa';
import { toast } from '../../utils/toast';

const UserActivityPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const { t } = useTranslation();
    const [activityLog, setActivityLog] = useState([]);
    const [presenceHistory, setPresenceHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('activity'); // activity, presence
    const tabStyles = {
        activity: { ...styles.tab, ...(activeTab === 'activity' ? styles.tabActive : {}) },
        presence: { ...styles.tab, ...(activeTab === 'presence' ? styles.tabActive : {}) },
    };

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
            toast.error(t('userActivity.logFailed'));
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
            toast.error(t('userActivity.presenceFailed'));
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
                        <FaChartBar className="icon-primary-mr10" />
                        <h2 style={styles.title}>Activity - {username}</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.tabs}>
                    <button
                        aria-label="Switch tab"
                        onClick={() => setActiveTab('activity')}
                        style={tabStyles.activity}
                    >
                        <FaClock className="mr-5" />
                        Activity Log
                    </button>
                    <button
                        aria-label="Switch tab"
                        onClick={() => setActiveTab('presence')}
                        style={tabStyles.presence}
                    >
                        <FaCalendar className="mr-5" />
                        Presence History
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Aktivite yükleniyor...</div>
                    ) : activeTab === 'activity' ? (
                        <div style={styles.activityList}>
                            {activityLog.length === 0 ? (
                                <div style={styles.empty}>Aktivite verisi yok</div>
                            ) : (
                                activityLog.map((activity, idx) => (
                                    <div key={`item-${idx}`} style={styles.activityItem}>
                                        <div style={styles.activityIcon}>
                                            {getActivityIcon(activity.type)}
                                        </div>
                                        <div style={styles.activityInfo}>
                                            <div style={styles.activityText}>
                                                {activity.description}
                                            </div>
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
                                <div style={styles.empty}>Geçmiş oturum verisi yok</div>
                            ) : (
                                presenceHistory.map((presence, idx) => (
                                    <div key={`item-${idx}`} style={styles.presenceItem}>
                                        <div
                                            style={{
                                                ...styles.statusIndicator,
                                                backgroundColor:
                                                    presence.status === 'online'
                                                        ? '#23a559'
                                                        : presence.status === 'idle'
                                                          ? '#f0b232'
                                                          : presence.status === 'dnd'
                                                            ? '#f23f42'
                                                            : '#949ba4',
                                            }}
                                        />
                                        <div style={styles.presenceInfo}>
                                            <div style={styles.presenceStatus}>
                                                {presence.status.charAt(0).toUpperCase() +
                                                    presence.status.slice(1)}
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
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #0e1222',
        padding: '0 20px',
    },
    tab: {
        padding: '12px 20px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#949ba4',
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
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    activityItem: {
        backgroundColor: '#111214',
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
        color: '#dbdee1',
        marginBottom: '4px',
    },
    activityTime: {
        fontSize: '12px',
        color: '#949ba4',
    },
    presenceList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    presenceItem: {
        backgroundColor: '#111214',
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
        color: '#949ba4',
    },
    presenceDuration: {
        fontSize: '13px',
        color: '#dbdee1',
    },
};

UserActivityPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    username: PropTypes.string,
};
export default UserActivityPanel;

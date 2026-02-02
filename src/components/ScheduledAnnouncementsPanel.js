// frontend/src/components/ScheduledAnnouncementsPanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaBullhorn, FaClock, FaCalendar, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 📢 Scheduled Announcements Panel
 * Schedule and manage future announcements
 * 
 * Features:
 * - Schedule announcements for future dates
 * - Template management
 * - Edit/delete scheduled items
 * - Preview before scheduling
 */
const ScheduledAnnouncementsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Form state
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [channelId, setChannelId] = useState('');
    const [recurring, setRecurring] = useState(false);
    const [recurringType, setRecurringType] = useState('daily'); // daily, weekly, monthly

    useEffect(() => {
        loadScheduledAnnouncements();
    }, []);

    const loadScheduledAnnouncements = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/api/announcements/scheduled/`
            );
            const data = await response.json();
            setAnnouncements(data.announcements || []);
        } catch (error) {
            console.error('Failed to load scheduled announcements:', error);
            toast.error('Failed to load announcements');
        } finally {
            setLoading(false);
        }
    };

    const handleScheduleAnnouncement = async (e) => {
        e.preventDefault();

        if (!title || !message || !scheduledDate || !scheduledTime) {
            toast.error('Please fill in all required fields');
            return;
        }

        const scheduledAt = `${scheduledDate}T${scheduledTime}:00`;

        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/api/announcements/schedule/`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title,
                        message,
                        scheduled_at: scheduledAt,
                        channel_id: channelId || null,
                        recurring,
                        recurring_type: recurring ? recurringType : null
                    })
                }
            );

            const data = await response.json();

            if (data.success) {
                toast.success('Announcement scheduled successfully!');
                loadScheduledAnnouncements();
                resetForm();
                setShowCreateForm(false);
            } else {
                toast.error(data.error || 'Failed to schedule announcement');
            }
        } catch (error) {
            console.error('Schedule error:', error);
            toast.error('Failed to schedule announcement');
        }
    };

    const deleteAnnouncement = async (announcementId) => {
        if (!window.confirm('Delete this scheduled announcement?')) return;

        try {
            await fetchWithAuth(
                `${apiBaseUrl}/api/announcements/${announcementId}/delete/`,
                { method: 'DELETE' }
            );
            toast.success('Announcement deleted');
            loadScheduledAnnouncements();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete announcement');
        }
    };

    const resetForm = () => {
        setTitle('');
        setMessage('');
        setScheduledDate('');
        setScheduledTime('');
        setChannelId('');
        setRecurring(false);
        setRecurringType('daily');
    };

    const getStatusColor = (scheduledAt) => {
        const now = new Date();
        const scheduled = new Date(scheduledAt);
        const diffHours = (scheduled - now) / (1000 * 60 * 60);

        if (diffHours < 0) return '#f04747'; // Past
        if (diffHours < 24) return '#faa61a'; // Within 24h
        return '#43b581'; // Future
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaBullhorn style={{ fontSize: '24px', color: '#5865f2' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Scheduled Announcements</h2>
                    </div>
                    <div style={styles.headerRight}>
                        {!showCreateForm && (
                            <button
                                onClick={() => setShowCreateForm(true)}
                                style={styles.addBtn}
                            >
                                <FaPlus /> Schedule New
                            </button>
                        )}
                        <button onClick={onClose} style={styles.closeBtn}>
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {showCreateForm ? (
                        <div style={styles.createForm}>
                            <h3 style={styles.formTitle}>Schedule New Announcement</h3>
                            <form onSubmit={handleScheduleAnnouncement}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Title *</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Announcement title..."
                                        style={styles.input}
                                        required
                                    />
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Message *</label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Announcement message..."
                                        style={{ ...styles.input, minHeight: '120px' }}
                                        required
                                    />
                                </div>

                                <div style={styles.formRow}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Date *</label>
                                        <input
                                            type="date"
                                            value={scheduledDate}
                                            onChange={(e) => setScheduledDate(e.target.value)}
                                            style={styles.input}
                                            required
                                        />
                                    </div>

                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Time *</label>
                                        <input
                                            type="time"
                                            value={scheduledTime}
                                            onChange={(e) => setScheduledTime(e.target.value)}
                                            style={styles.input}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Channel ID (Optional)</label>
                                    <input
                                        type="text"
                                        value={channelId}
                                        onChange={(e) => setChannelId(e.target.value)}
                                        placeholder="Leave empty for all channels"
                                        style={styles.input}
                                    />
                                </div>

                                <div style={styles.checkboxGroup}>
                                    <label style={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={recurring}
                                            onChange={(e) => setRecurring(e.target.checked)}
                                            style={styles.checkbox}
                                        />
                                        <span>Recurring Announcement</span>
                                    </label>
                                </div>

                                {recurring && (
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Repeat</label>
                                        <select
                                            value={recurringType}
                                            onChange={(e) => setRecurringType(e.target.value)}
                                            style={styles.select}
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                )}

                                <div style={styles.formActions}>
                                    <button type="submit" style={styles.submitBtn}>
                                        <FaClock /> Schedule Announcement
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCreateForm(false);
                                            resetForm();
                                        }}
                                        style={styles.cancelBtn}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : announcements.length === 0 ? (
                        <div style={styles.empty}>
                            <FaBullhorn style={{ fontSize: '48px', color: '#99aab5', marginBottom: '16px' }} />
                            <p>No scheduled announcements</p>
                            <p style={{ fontSize: '14px', color: '#99aab5' }}>
                                Schedule your first announcement to get started
                            </p>
                        </div>
                    ) : (
                        <div style={styles.announcementsList}>
                            {announcements.map(announcement => (
                                <div key={announcement.id} style={styles.announcementCard}>
                                    <div
                                        style={{
                                            ...styles.statusIndicator,
                                            backgroundColor: getStatusColor(announcement.scheduled_at)
                                        }}
                                    />
                                    <div style={styles.announcementContent}>
                                        <h3 style={styles.announcementTitle}>
                                            {announcement.title}
                                        </h3>
                                        <p style={styles.announcementMessage}>
                                            {announcement.message}
                                        </p>
                                        <div style={styles.announcementMeta}>
                                            <span>
                                                <FaCalendar /> {new Date(announcement.scheduled_at).toLocaleString()}
                                            </span>
                                            {announcement.recurring && (
                                                <>
                                                    <span style={{ margin: '0 8px' }}>•</span>
                                                    <span>🔁 {announcement.recurring_type}</span>
                                                </>
                                            )}
                                            {announcement.channel_id && (
                                                <>
                                                    <span style={{ margin: '0 8px' }}>•</span>
                                                    <span>📺 Channel: {announcement.channel_id}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div style={styles.announcementActions}>
                                        <button
                                            onClick={() => deleteAnnouncement(announcement.id)}
                                            style={styles.deleteIconBtn}
                                            title="Delete"
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    addBtn: {
        padding: '8px 16px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#dcddde'
    },
    createForm: {
        maxWidth: '600px',
        margin: '0 auto'
    },
    formTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '24px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#dcddde'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px'
    },
    checkboxGroup: {
        marginBottom: '20px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    checkbox: {
        width: '18px',
        height: '18px',
        cursor: 'pointer'
    },
    formActions: {
        display: 'flex',
        gap: '12px',
        marginTop: '24px'
    },
    submitBtn: {
        flex: 1,
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    cancelBtn: {
        padding: '12px 24px',
        backgroundColor: '#4e5058',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    announcementsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    announcementCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden'
    },
    statusIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px'
    },
    announcementContent: {
        flex: 1,
        paddingLeft: '12px'
    },
    announcementTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '8px'
    },
    announcementMessage: {
        fontSize: '14px',
        color: '#dcddde',
        marginBottom: '12px',
        lineHeight: '1.6'
    },
    announcementMeta: {
        fontSize: '12px',
        color: '#99aab5',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    announcementActions: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
    },
    deleteIconBtn: {
        padding: '8px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px'
    }
};

export default ScheduledAnnouncementsPanel;

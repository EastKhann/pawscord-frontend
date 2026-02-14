import { FaClock } from 'react-icons/fa';
import { styles } from './scheduledAnnouncementsStyles';

const AnnouncementForm = ({
    title, setTitle, message, setMessage,
    scheduledDate, setScheduledDate, scheduledTime, setScheduledTime,
    channelId, setChannelId, recurring, setRecurring,
    recurringType, setRecurringType,
    handleScheduleAnnouncement, setShowCreateForm, resetForm
}) => (
    <div style={styles.createForm}>
        <h3 style={styles.formTitle}>Schedule New Announcement</h3>
        <form onSubmit={handleScheduleAnnouncement}>
            <div style={styles.formGroup}>
                <label style={styles.label}>Title *</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                    placeholder="Announcement title..." style={styles.input} required />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Message *</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                    placeholder="Announcement message..." style={{ ...styles.input, minHeight: '120px' }} required />
            </div>

            <div style={styles.formRow}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Date *</label>
                    <input type="date" value={scheduledDate} onChange={(e) => setScheduledDate(e.target.value)}
                        style={styles.input} required />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Time *</label>
                    <input type="time" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)}
                        style={styles.input} required />
                </div>
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label}>Channel ID (Optional)</label>
                <input type="text" value={channelId} onChange={(e) => setChannelId(e.target.value)}
                    placeholder="Leave empty for all channels" style={styles.input} />
            </div>

            <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                    <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)}
                        style={styles.checkbox} />
                    <span>Recurring Announcement</span>
                </label>
            </div>

            {recurring && (
                <div style={styles.formGroup}>
                    <label style={styles.label}>Repeat</label>
                    <select value={recurringType} onChange={(e) => setRecurringType(e.target.value)} style={styles.select}>
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
                <button type="button" onClick={() => { setShowCreateForm(false); resetForm(); }} style={styles.cancelBtn}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
);

export default AnnouncementForm;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { FaClock } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { styles } from './scheduledAnnouncementsStyles';
import { useTranslation } from 'react-i18next';

// -- dynamic style helpers (pass 2) --

const _st1159 = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#1e1e1e',
    border: '1px solid #0e1222',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'inherit',
    resize: 'vertical',
    minHeight: '100px',
};

const AnnouncementForm = ({
    title,
    setTitle,
    message,
    setMessage,
    scheduledDate,
    setScheduledDate,
    scheduledTime,
    setScheduledTime,
    channelId,
    setChannelId,
    recurring,
    setRecurring,
    recurringType,
    setRecurringType,
    handleScheduleAnnouncement,
    setShowCreateForm,
    resetForm,
}) => {
    const { t } = useTranslation();
    return (
        <div style={styles.createForm}>
            <h3 style={styles.formTitle}>{t('schedule_new_announcement')}</h3>
            <form onSubmit={handleScheduleAnnouncement}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>{t('title')}</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={t('announcement_title')}
                        style={styles.input}
                        required
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.label}>{t('message')}</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('announcements.messagePlaceholder', 'Announcement message...')}
                        style={_st1159}
                        required
                    />
                </div>

                <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>{t('date')}</label>
                        <input
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>{t('time')}</label>
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
                    <label style={styles.label}>{t('channel_id_optional')}</label>
                    <input
                        type="text"
                        value={channelId}
                        onChange={(e) => setChannelId(e.target.value)}
                        placeholder={t('leave_empty_for_all_channels')}
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
                        <span>{t('recurring_announcement')}</span>
                    </label>
                </div>

                {recurring && (
                    <div style={styles.formGroup}>
                        <label style={styles.label}>{t('repeat')}</label>
                        <select
                            value={recurringType}
                            onChange={(e) => setRecurringType(e.target.value)}
                            style={styles.select}
                        >
                            <option value="daily">{t('daily')}</option>
                            <option value="weekly">{t('weekly')}</option>
                            <option value="monthly">{t('monthly')}</option>
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
    );
};

AnnouncementForm.propTypes = {
    title: PropTypes.string,
    setTitle: PropTypes.func,
    message: PropTypes.string,
    setMessage: PropTypes.func,
    scheduledDate: PropTypes.string,
    setScheduledDate: PropTypes.func,
    scheduledTime: PropTypes.string,
    setScheduledTime: PropTypes.func,
    channelId: PropTypes.string,
    setChannelId: PropTypes.func,
    recurring: PropTypes.bool,
    setRecurring: PropTypes.func,
    recurringType: PropTypes.string,
    setRecurringType: PropTypes.func,
    handleScheduleAnnouncement: PropTypes.func,
    setShowCreateForm: PropTypes.func,
    resetForm: PropTypes.func,
};
export default AnnouncementForm;

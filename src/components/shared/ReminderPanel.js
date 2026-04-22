/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect, useCallback, memo } from 'react';
import { getToken } from '../../utils/tokenStorage';
import PropTypes from 'prop-types';
import './ReminderPanel.css';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';

const ReminderPanel = ({ serverId, onClose }) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();

    const [reminders, setReminders] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newReminder, setNewReminder] = useState({
        title: '',
        description: '',
        remind_at: '',
        repeat: 'once',
        channel_id: '',
        mention_user_id: '',
    });
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleShowCreate = useCallback(() => setShowCreateModal(true), []);
    const handleHideCreate = useCallback(() => setShowCreateModal(false), []);
    const handleTitleChange = useCallback(
        (e) => setNewReminder((prev) => ({ ...prev, title: e.target.value })),
        []
    );
    const handleDescChange = useCallback(
        (e) => setNewReminder((prev) => ({ ...prev, description: e.target.value })),
        []
    );
    const handleRemindAtChange = useCallback(
        (e) => setNewReminder((prev) => ({ ...prev, remind_at: e.target.value })),
        []
    );
    const handleRepeatChange = useCallback(
        (e) => setNewReminder((prev) => ({ ...prev, repeat: e.target.value })),
        []
    );
    const handleChannelChange = useCallback(
        (e) => setNewReminder((prev) => ({ ...prev, channel_id: e.target.value })),
        []
    );

    useEffect(() => {
        fetchReminders();
        fetchChannels();
    }, [serverId]);

    const fetchReminders = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/reminders/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setReminders(data);
            }
        } catch (error) {
            logger.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.filter((ch) => ch.type === 'text'));
            }
        } catch (error) {
            logger.error('Error:', error);
        }
    };

    const createReminder = async () => {
        if (!newReminder.title || !newReminder.remind_at || !newReminder.channel_id) {
            toast.error(t('ui.please_gerekli_alanlari_doldurun_2'));
            return;
        }

        try {
            const response = await fetch(`${apiBaseUrl}/reminders/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ server_id: serverId, ...newReminder }),
            });

            if (response.ok) {
                toast.success(t('ui.hatirlatici_created_2'));
                setShowCreateModal(false);
                fetchReminders();
                setNewReminder({
                    title: '',
                    description: '',
                    remind_at: '',
                    repeat: 'once',
                    channel_id: '',
                    mention_user_id: '',
                });
            } else {
                toast.error(t('reminder.createFailed'));
            }
        } catch (error) {
            toast.error(t('common.connectionError'));
        }
    };

    const deleteReminder = async (id) => {
        if (!(await confirmDialog(t('reminder.deleteConfirm', 'Are you sure you want to delete this reminder?')))) return;
        try {
            const response = await fetch(`${apiBaseUrl}/reminders/${id}/delete/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                toast.success(t('ui.hatirlatici_deleted'));
                fetchReminders();
            }
        } catch (error) {
            toast.error(t('common.deleteFailed'));
        }
    };

    const triggerNow = async (id) => {
        try {
            const response = await fetch(`${apiBaseUrl}/reminders/${id}/trigger/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (response.ok) {
                toast.success(t('ui.hatirlatici_tetiklendi'));
            }
        } catch (error) {
            toast.error(t('reminder.triggerError'));
        }
    };

    const formatTime = (time) => {
        return new Date(time).toLocaleString('tr-TR');
    };

    const getRepeatBadge = (repeat) => {
        const badges = {
            once: { text: 'Bir kez', color: '#6b7280' },
            daily: { text: t('ui.gunluk'), color: '#3b82f6' },
            weekly: { text: t('ui.haftalik'), color: '#5865f2' },
            monthly: { text: 'Monthly', color: '#ec4899' },
        };
        return badges[repeat] || badges.once;
    };

    return (
        <div
            className="reminder-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="reminder-panel"
                role="button"
                tabIndex={0}
                onClick={handleStopPropagation}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="reminder-header">
                    <h2>⏰ Reminderlar</h2>
                    <button aria-label={t('common.close', 'Close')} className="close-btn" onClick={onClose}>
                        ×
                    </button>
                </div>

                <div className="reminder-content">
                    <button
                        aria-label={t('reminder.showCreate', 'Create new reminder')}
                        className="create-reminder-btn"
                        onClick={handleShowCreate}
                    >
                        + Yeni Reminder
                    </button>

                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : reminders.length === 0 ? (
                        <div className="empty-state">
                            <span className="empty-icon">⏰</span>
                            <p>{t('reminder.noReminders', 'No reminders yet')}</p>
                        </div>
                    ) : (
                        <div className="reminders-list">
                            {reminders.map((reminder) => (
                                <div key={reminder.id} className="reminder-card">
                                    <div className="reminder-main">
                                        <h3>{reminder.title}</h3>
                                        {reminder.description && <p>{reminder.description}</p>}
                                        <div className="reminder-meta">
                                            <span>⏰ {formatTime(reminder.remind_at)}</span>
                                            <span>
                                                📍{' '}
                                                {
                                                    channels.find(
                                                        (c) => c.id === reminder.channel_id
                                                    )?.name
                                                }
                                            </span>
                                            <span
                                                className="repeat-badge"
                                                style={{
                                                    background: getRepeatBadge(reminder.repeat)
                                                        .color,
                                                }}
                                            >
                                                🔄 {getRepeatBadge(reminder.repeat).text}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="reminder-actions">
                                        <button
                                            aria-label={t('reminder.triggerNow', 'Trigger reminder now')}
                                            className="trigger-btn"
                                            onClick={() => triggerNow(reminder.id)}
                                        >
                                            ▶️ Tetikle
                                        </button>
                                        <button
                                            aria-label={t('reminder.deleteReminder', 'Delete reminder')}
                                            className="delete-btn"
                                            onClick={() => deleteReminder(reminder.id)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showCreateModal && (
                    <div
                        className="create-modal-overlay"
                        role="button"
                        tabIndex={0}
                        onClick={handleHideCreate}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
                        <div
                            className="create-modal"
                            role="dialog"
                            aria-modal="true"
                            aria-label={t('reminder.createModal', 'Create reminder')}
                            onClick={handleStopPropagation}
                        >
                            <div className="modal-header">
                                <h3>{t('reminder.newReminder', 'New Reminder')}</h3>
                                <button
                                    aria-label={t('common.close', 'Close')}
                                    className="close-btn"
                                    onClick={handleHideCreate}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Title *</label>
                                    <input
                                        value={newReminder.title}
                                        onChange={handleTitleChange}
                                        aria-label={t('reminder.titleInput', 'Reminder title')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={newReminder.description}
                                        onChange={handleDescChange}
                                        rows="3"
                                        aria-label={t('reminder.descriptionInput', 'Reminder description')}
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Date/Saat *</label>
                                        <input
                                            type="datetime-local"
                                            value={newReminder.remind_at}
                                            onChange={handleRemindAtChange}
                                            aria-label={t('reminder.dateTimeInput', 'Reminder date and time')}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Tekrar</label>
                                        <select
                                            value={newReminder.repeat}
                                            onChange={handleRepeatChange}
                                            aria-label={t('reminder.repeatSelect', 'Repeat frequency')}>
                                            <option value="daily">{t('common.daily', 'Daily')}</option>
                                            <option value="weekly">{t('common.weekly', 'Weekly')}</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Channel *</label>
                                    <select
                                        value={newReminder.channel_id}
                                        onChange={handleChannelChange}
                                        aria-label={t('reminder.channelSelect', 'Select channel')}
                                    >
                                        {channels.map((ch) => (
                                            <option key={ch.id} value={ch.id}>
                                                {ch.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    aria-label={t('common.cancel', 'Cancel')}
                                    className="cancel-btn"
                                    onClick={handleHideCreate}
                                >
                                    {t('common.cancel')}
                                </button>
                                <button
                                    aria-label={t('reminder.createBtn', 'Create reminder')}
                                    className="submit-btn"
                                    onClick={createReminder}
                                >
                                    ⏰ Create
                                </button>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
        </div >
    );
};

ReminderPanel.propTypes = {
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default memo(ReminderPanel);

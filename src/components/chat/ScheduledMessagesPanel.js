/* eslint-disable jsx-a11y/label-has-associated-control */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/ScheduledMessagesPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import './ScheduledMessagesPanel.css';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import confirmDialog from '../../utils/confirmDialog';
const ScheduledMessagesPanel = ({ apiBaseUrl, roomSlug, onClose }) => {
    const { t } = useTranslation();
    const [scheduledMessages, setScheduledMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newMessage, setNewMessage] = useState({
        content: '',
        scheduled_time: '',
        room_slug: roomSlug || '',
    });

    useEffect(() => {
        fetchScheduledMessages();
    }, []);

    const fetchScheduledMessages = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/scheduled/list/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setScheduledMessages(data.scheduled_messages || []);
            } else {
                toast.error(t('scheduled.loadError'));
            }
        } catch (error) {
            logger.error('Fetch scheduled messages error:', error);
            toast.error(t('common.connectionError'));
        } finally {
            setLoading(false);
        }
    };

    const createScheduledMessage = async () => {
        if (!newMessage.content.trim()) {
            toast.error(t('ui.mesaj_icerigi_bos_olamaz'));
            return;
        }

        if (!newMessage.scheduled_time) {
            toast.error(t('ui.please_select_date_time'));
            return;
        }

        if (!newMessage.room_slug) {
            toast.error(t('ui.please_select_channel'));
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/scheduled/create/`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMessage),
            });

            if (response.ok) {
                const data = await response.json();
                setScheduledMessages([...scheduledMessages, data.scheduled_message]);
                setShowCreateForm(false);
                setNewMessage({ content: '', scheduled_time: '', room_slug: roomSlug || '' });
                toast.success(t('ui.mesaj_zamanlandi'));
            } else {
                const error = await response.json();
                toast.error(error.error || t('scheduled.operationFailed'));
            }
        } catch (error) {
            logger.error('Create scheduled message error:', error);
            toast.error(t('common.connectionError'));
        }
    };

    const cancelScheduledMessage = async (schedId) => {
        if (!(await confirmDialog(t('scheduled.cancelConfirm')))) {
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${apiBaseUrl}/scheduled/cancel/${schedId}/`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                setScheduledMessages(scheduledMessages.filter((msg) => msg.id !== schedId));
                toast.success(t('ui.zamanlanmis_message_cancel_edildi'));
            } else {
                toast.error(t('ui.cancel_failed'));
            }
        } catch (error) {
            logger.error('Cancel scheduled message error:', error);
            toast.error(t('common.connectionError'));
        }
    };

    const getTimeRemaining = (scheduledTime) => {
        const now = new Date();
        const scheduled = new Date(scheduledTime);
        const diff = scheduled - now;

        if (diff < 0) {
            return t('scheduled.sent');
        }

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 24) {
            const days = Math.floor(hours / 24);
            return `${days} ${t('scheduled.day')} ${hours % 24} ${t('scheduled.hour')}`;
        } else if (hours > 0) {
            return `${hours} ${t('scheduled.hour')} ${minutes} ${t('scheduled.minute')}`;
        } else {
            return `${minutes} ${t('scheduled.minute')}`;
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (scheduledTime) => {
        const now = new Date();
        const scheduled = new Date(scheduledTime);
        const diff = scheduled - now;

        if (diff < 0) return 'status-sent';
        if (diff < 3600000) return 'status-imminent'; // Less than 1 hour
        if (diff < 86400000) return 'status-soon'; // Less than 24 hours
        return 'status-scheduled';
    };

    const getMinDateTime = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1);
        return now.toISOString().slice(0, 16);
    };

    return (
        <div
            className="scheduled-messages-overlay"
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="scheduled-messages-panel"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="scheduled-messages-header">
                    <h2>⏰ {t('scheduled.title')}</h2>
                    <div className="header-actions">
                        <button
                            aria-label={
                                showCreateForm ? t('common.cancel') : t('scheduled.newMessage')
                            }
                            className="create-btn"
                            onClick={() => setShowCreateForm(!showCreateForm)}
                        >
                            {showCreateForm
                                ? `✕ ${t('common.cancel')}`
                                : `+ ${t('scheduled.newMessage')}`}
                        </button>
                        <button aria-label="Close" className="close-btn" onClick={onClose}>
                            ✕
                        </button>
                    </div>
                </div>

                {showCreateForm && (
                    <div className="create-form">
                        <h3>📝 {t('scheduled.newTitle')}</h3>

                        <div className="form-group">
                            <label>{t('scheduled.messageContent')}</label>
                            <textarea
                                className="message-textarea"
                                placeholder={t('scheduled.typePlaceholder')}
                                value={newMessage.content}
                                onChange={(e) =>
                                    setNewMessage({ ...newMessage, content: e.target.value })
                                }
                                rows={4}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>{t('scheduled.channel')}</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder={t('scheduled.channelPlaceholder')}
                                    value={newMessage.room_slug}
                                    onChange={(e) =>
                                        setNewMessage({ ...newMessage, room_slug: e.target.value })
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>{t('scheduled.sendTime')}</label>
                                <input
                                    type="datetime-local"
                                    className="form-input"
                                    value={newMessage.scheduled_time}
                                    min={getMinDateTime()}
                                    onChange={(e) =>
                                        setNewMessage({
                                            ...newMessage,
                                            scheduled_time: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                aria-label="Action button"
                                className="cancel-form-btn"
                                onClick={() => {
                                    setShowCreateForm(false);
                                    setNewMessage({
                                        content: '',
                                        scheduled_time: '',
                                        room_slug: roomSlug || '',
                                    });
                                }}
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                aria-label={t('scheduled.schedule')}
                                className="submit-btn"
                                onClick={createScheduledMessage}
                            >
                                ⏰ {t('scheduled.schedule')}
                            </button>
                        </div>
                    </div>
                )}

                <div className="scheduled-messages-content">
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>{t('common.loading')}</p>
                        </div>
                    ) : scheduledMessages.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">⏰</div>
                            <h3>{t('scheduled.noMessages')}</h3>
                            <p>{t('scheduled.noMessagesDesc')}</p>
                            <button
                                aria-label={t('scheduled.scheduleFirst')}
                                className="create-first-btn"
                                onClick={() => setShowCreateForm(true)}
                            >
                                + {t('scheduled.scheduleFirst')}
                            </button>
                        </div>
                    ) : (
                        <div className="messages-list">
                            {scheduledMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`scheduled-message-card ${getStatusColor(msg.scheduled_time)}`}
                                >
                                    <div className="message-header">
                                        <div className="message-info">
                                            <span className="room-badge">{msg.room_slug}</span>
                                            <span className="time-badge">
                                                {formatDateTime(msg.scheduled_time)}
                                            </span>
                                        </div>
                                        <button
                                            aria-label="Action button"
                                            className="cancel-btn"
                                            onClick={() => cancelScheduledMessage(msg.id)}
                                            title={t('common.cancel')}
                                        >
                                            🗑️
                                        </button>
                                    </div>

                                    <div className="message-content">{msg.content}</div>

                                    <div className="message-footer">
                                        <div className="countdown">
                                            <span className="countdown-icon">⏳</span>
                                            <span className="countdown-text">
                                                {getTimeRemaining(msg.scheduled_time)}
                                            </span>
                                        </div>
                                        {msg.sent && (
                                            <div className="sent-badge">
                                                ✅ {t('scheduled.sent')}
                                            </div>
                                        )}
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

ScheduledMessagesPanel.propTypes = {
    apiBaseUrl: PropTypes.string,
    roomSlug: PropTypes.string,
    onClose: PropTypes.func,
};
export default ScheduledMessagesPanel;

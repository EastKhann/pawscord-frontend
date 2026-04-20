/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/ScheduledMessageModal.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import { FaTimes, FaClock } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';
import logger from '../../utils/logger';

const ScheduledMessageModal = ({ room, conversation, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: t('chat.scheduledMessage', 'Zamanlanmış Mesaj'),
    });
    const [message, setMessage] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [loading, setLoading] = useState(false);
    const messageInputStyle = { ...styles.input, minHeight: '100px', resize: 'vertical' };

    const handleSchedule = async () => {
        if (!message.trim()) {
            toast.error(t('ui.mesaj_bos_olamaz'));
            return;
        }

        if (!scheduledTime) {
            toast.error(t('ui.please_select_a_date'));
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/scheduled/create/`, {
                method: 'POST',
                body: JSON.stringify({
                    content: message,
                    scheduled_time: scheduledTime,
                    room_slug: room,
                    conversation_id: conversation,
                }),
            });

            if (res.ok) {
                toast.success(t('ui.mesaj_plandi'));
                onClose();
            } else {
                const data = await res.json();
                toast.error(
                    t('common.errorPrefix') + ': ' + (data.error || t('common.unknownError'))
                );
            }
        } catch (error) {
            logger.error('Schedule error:', error);
            toast.error(t('ui.mesaj_planlanamadi'));
        } finally {
            setLoading(false);
        }
    };

    const getPresetTime = (minutes) => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        return now.toISOString().slice(0, 16);
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        <FaClock /> {t('chat.scheduleMessage', 'Mesaj Zamanla')}
                    </h3>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.presets}>
                        <button
                            aria-label="Action button"
                            onClick={() => setScheduledTime(getPresetTime(5))}
                            style={styles.presetButton}
                        >
                            {t('chat.in5min', '5 dk sonra')}
                        </button>
                        <button
                            aria-label="Action button"
                            onClick={() => setScheduledTime(getPresetTime(30))}
                            style={styles.presetButton}
                        >
                            {t('chat.in30min', '30 dk sonra')}
                        </button>
                        <button
                            aria-label="Action button"
                            onClick={() => setScheduledTime(getPresetTime(60))}
                            style={styles.presetButton}
                        >
                            {t('chat.in1hour', '1 saat sonra')}
                        </button>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>
                            {t('chat.sendTime', 'Gönderilme Zamanı')}
                        </label>
                        <input
                            type="datetime-local"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>{t('chat.message', 'Mesaj')}</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={t('ui.type_scheduled_message')}
                            style={messageInputStyle}
                        />
                    </div>

                    <button
                        aria-label="handle Schedule"
                        onClick={handleSchedule}
                        disabled={loading || !message.trim() || !scheduledTime}
                        style={{
                            ...styles.scheduleButton,
                            opacity: loading || !message.trim() || !scheduledTime ? 0.5 : 1,
                            cursor:
                                loading || !message.trim() || !scheduledTime
                                    ? 'not-allowed'
                                    : 'pointer',
                        }}
                    >
                        {loading
                            ? t('ui.planlaniyor')
                            : '⏰ ' + t('chat.scheduleMessage', 'Mesaj Zamanla')}
                    </button>
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
        zIndex: 10000,
    },
    modal: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #182135',
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.3em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.3em',
        padding: '5px',
    },
    content: {
        padding: '20px',
    },
    presets: {
        display: 'flex',
        gap: '8px',
        marginBottom: '15px',
    },
    presetButton: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#1e2024',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.85em',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        color: '#b5bac1',
        fontSize: '0.85em',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e2024',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
        fontSize: '1em',
    },
    scheduleButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1em',
    },
};

ScheduledMessageModal.propTypes = {
    room: PropTypes.string,
    conversation: PropTypes.object,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default ScheduledMessageModal;

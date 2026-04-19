/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/ReminderModal.js

import { useState } from 'react';

import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';

import toast from '../../utils/toast';

import { FaTimes, FaBell } from 'react-icons/fa';

import useModalA11y from '../../hooks/useModalA11y';

import logger from '../../utils/logger';

const ReminderModal = ({ messageId, messageContent, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Reminder' });

    const { t } = useTranslation();

    const [reminderTime, setReminderTime] = useState('');

    const [reminderNote, setReminderNote] = useState('');

    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!reminderTime) {
            toast.error(t('ui.please_select_a_date_2'));

            return;
        }

        setLoading(true);

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/reminders/create/`, {
                method: 'POST',

                body: JSON.stringify({
                    message_id: messageId,

                    reminder_time: reminderTime,

                    note: reminderNote || messageContent?.substring(0, 100),
                }),
            });

            if (res.ok) {
                toast.success(t('ui.hatirlatici_created'));

                onClose();
            } else {
                const data = await res.json();

                toast.error(
                    t('common.errorPrefix') + ': ' + (data.error || t('common.unknownError'))
                );
            }
        } catch (error) {
            logger.error('Reminder error:', error);

            toast.error(t('ui.hatirlatici_olusturulamadi'));
        } finally {
            setLoading(false);
        }
    };

    const getPresetTime = (hours) => {
        const now = new Date();

        now.setHours(now.getHours() + hours);

        return now.toISOString().slice(0, 16);
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        <FaBell /> Set Reminder
                    </h3>

                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.messagePreview}>
                        {messageContent?.substring(0, 150)}

                        {messageContent?.length > 150 && '...'}
                    </div>

                    <div style={styles.presets}>
                        <button
                            aria-label="Action button"
                            onClick={() => setReminderTime(getPresetTime(1))}
                            style={styles.presetButton}
                        >
                            1 hour sonra
                        </button>

                        <button
                            aria-label="Action button"
                            onClick={() => setReminderTime(getPresetTime(3))}
                            style={styles.presetButton}
                        >
                            3 hour sonra
                        </button>

                        <button
                            aria-label="Action button"
                            onClick={() => setReminderTime(getPresetTime(24))}
                            style={styles.presetButton}
                        >
                            Yarn
                        </button>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Tarih ve Saat</label>

                        <input
                            type="datetime-local"
                            value={reminderTime}
                            onChange={(e) => setReminderTime(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Not (Opsiyonel)</label>

                        <input
                            type="text"
                            value={reminderNote}
                            onChange={(e) => setReminderNote(e.target.value)}
                            placeholder={t('ui.add_reminder_note')}
                            style={styles.input}
                            aria-label="Reminder Note"
                        />
                    </div>

                    <button
                        aria-label="handle Create"
                        onClick={handleCreate}
                        disabled={loading || !reminderTime}
                        style={{
                            ...styles.createButton,

                            opacity: loading || !reminderTime ? 0.5 : 1,

                            cursor: loading || !reminderTime ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {loading ? 'Oluşturuluyor...' : t('ui.hatirlatici_create')}
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

    messagePreview: {
        backgroundColor: '#1e2024',

        padding: '12px',

        borderRadius: '4px',

        color: '#dbdee1',

        fontSize: '0.9em',

        marginBottom: '15px',

        borderLeft: '3px solid #5865f2',
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

    createButton: {
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

ReminderModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,

    onClose: PropTypes.func.isRequired,

    messageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ReminderModal;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaPoll, FaPlus, FaTrash, FaClock, FaDownload, FaCalendar } from 'react-icons/fa';

import { toast } from '../../utils/toast';

import { useTranslation } from 'react-i18next';

const EnhancedPollsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const { t } = useTranslation();

    const [question, setQuestion] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [options, setOptions] = useState(['', '']);

    const [allowMultiple, setAllowMultiple] = useState(false);

    const [anonymous, setAnonymous] = useState(false);

    const [duration, setDuration] = useState(24); // hours

    const [scheduledFor, setScheduledFor] = useState('');
    const getDurationButtonStyle = (value) => ({
        ...styles.durationButton,
        ...(duration === value ? styles.durationButtonActive : {}),
    });

    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        }
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const updateOption = (index, value) => {
        const newOptions = [...options];

        newOptions[index] = value;

        setOptions(newOptions);
    };

    const createPoll = async () => {
        if (!question.trim()) {
            toast.error(t('polls.enterQuestion', 'Lütfen bir soru girin'));

            return;
        }

        const validOptions = options.filter((o) => o.trim());

        if (validOptions.length < 2) {
            toast.error(t('polls.addOptions', 'Please add at least 2 options'));

            return;
        }

        try {
            const payload = {
                question: question.trim(),

                options: validOptions,

                allow_multiple: allowMultiple,

                anonymous: anonymous,

                duration_hours: duration,

                room_slug: roomSlug,
            };

            if (scheduledFor) {
                payload.scheduled_for = new Date(scheduledFor).toISOString();
            }

            await fetchWithAuth(`${apiBaseUrl}/polls/create/`, {
                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify(payload),
            });

            toast.success(
                scheduledFor
                    ? t('polls.pollScheduled', 'Anket başarıyla planlandı')
                    : t('polls.pollCreated', 'Anket başarıyla oluşturuldu')
            );

            onClose();
        } catch (error) {
            toast.error(t('polls.createFailed', 'Anket oluşturulamadı'));
        }
    };

    const exportResults = async (pollId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/polls/${pollId}/export/`);

            const data = await response.json();

            const csv = [
                ['Option', 'Votes', 'Percentage'],

                ...data.results.map((r) => [r.option, r.votes, `${r.percentage}%`]),
            ]
                .map((row) => row.join(','))
                .join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });

            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');

            a.href = url;

            a.download = `poll_results_${pollId}.csv`;

            document.body.appendChild(a);

            a.click();

            window.URL.revokeObjectURL(url);

            document.body.removeChild(a);

            toast.success(t('polls.resultsExported', 'Sonuçlar dışa aktarıldı'));
        } catch (error) {
            toast.error(t('polls.exportFailed', 'Sonuçlar dışa aktarılamadı'));
        }
    };

    const durationOptions = [
        { value: 1, label: t('polls.1hour', '1 Hour') },

        { value: 6, label: t('polls.6hours', '6 Hours') },

        { value: 12, label: t('polls.12hours', '12 Hours') },

        { value: 24, label: t('polls.1day', '1 Day') },

        { value: 48, label: t('polls.2days', '2 Days') },

        { value: 72, label: t('polls.3days', '3 Days') },

        { value: 168, label: t('polls.1week', '1 Week') },
    ];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaPoll className="icon-primary-mr10" />

                        <h2 style={styles.title}>{t('polls.createPoll', 'Anket Oluştur')}</h2>
                    </div>

                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.section}>
                        <label style={styles.label}>{t('polls.question', 'Question')}</label>

                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder={t('polls.whatsYourQuestion', "What's your question?")}
                            style={styles.input}
                            maxLength={200}
                            aria-label="Question"
                        />
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <label style={styles.label}>{t('polls.options', 'Options')}</label>

                            <button
                                aria-label="add Option"
                                onClick={addOption}
                                style={styles.addButton}
                                disabled={options.length >= 10}
                            >
                                <FaPlus className="mr-6" />

                                {t('polls.addOption', 'Seçenek Ekle')}
                            </button>
                        </div>

                        <div style={styles.optionsList}>
                            {options.map((option, idx) => (
                                <div key={`item-${idx}`} style={styles.optionRow}>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => updateOption(idx, e.target.value)}
                                        placeholder={`Option ${idx + 1}`}
                                        style={styles.optionInput}
                                        maxLength={100}
                                        aria-label="Option"
                                    />

                                    {options.length > 2 && (
                                        <button
                                            aria-label="Action button"
                                            onClick={() => removeOption(idx)}
                                            style={styles.removeButton}
                                            title="Kaldır"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>{t('polls.duration', 'Duration')}</label>

                        <div style={styles.durationGrid}>
                            {durationOptions.map((opt) => (
                                <button
                                    aria-label="Action button"
                                    key={opt.value}
                                    onClick={() => setDuration(opt.value)}
                                    style={getDurationButtonStyle(opt.value)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>
                            <FaCalendar className="mr-6" />

                            {t('polls.scheduleOptional', 'Schedule (Optional)')}
                        </label>

                        <input
                            type="datetime-local"
                            value={scheduledFor}
                            onChange={(e) => setScheduledFor(e.target.value)}
                            style={styles.input}
                            min={new Date().toISOString().slice(0, 16)}
                        />

                        {scheduledFor && (
                            <div style={styles.hint}>
                                Poll will be posted on {new Date(scheduledFor).toLocaleString()}
                            </div>
                        )}
                    </div>

                    <div style={styles.checkboxes}>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={allowMultiple}
                                onChange={(e) => setAllowMultiple(e.target.checked)}
                            />

                            <span style={styles.checkboxLabel}>
                                {t('polls.allowMultiple', 'Çoklu seçime izin ver')}
                            </span>
                        </label>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={anonymous}
                                onChange={(e) => setAnonymous(e.target.checked)}
                            />

                            <span style={styles.checkboxLabel}>
                                {t('polls.anonymousVoting', 'Anonim oylama')}
                            </span>
                        </label>
                    </div>

                    <button
                        aria-label="create Poll"
                        onClick={createPoll}
                        style={styles.createButton}
                    >
                        {scheduledFor
                            ? t('polls.schedulePoll', 'Anketi Zamanla')
                            : t('polls.createPoll', 'Anket Oluştur')}
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

    content: {
        padding: '20px',

        overflowY: 'auto',

        flex: 1,
    },

    section: {
        marginBottom: '24px',
    },

    sectionHeader: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        marginBottom: '12px',
    },

    label: {
        display: 'block',

        fontSize: '14px',

        fontWeight: '600',

        color: '#dbdee1',

        marginBottom: '8px',
    },

    input: {
        width: '100%',

        padding: '10px 12px',

        backgroundColor: '#111214',

        border: '1px solid #0e1222',

        borderRadius: '4px',

        color: '#ffffff',

        fontSize: '14px',
    },

    optionsList: {
        display: 'flex',

        flexDirection: 'column',

        gap: '10px',
    },

    optionRow: {
        display: 'flex',

        gap: '10px',
    },

    optionInput: {
        flex: 1,

        padding: '10px 12px',

        backgroundColor: '#111214',

        border: '1px solid #0e1222',

        borderRadius: '4px',

        color: '#ffffff',

        fontSize: '14px',
    },

    addButton: {
        padding: '6px 12px',

        backgroundColor: '#5865f2',

        border: 'none',

        borderRadius: '4px',

        color: '#ffffff',

        cursor: 'pointer',

        fontSize: '12px',

        display: 'flex',

        alignItems: 'center',
    },

    removeButton: {
        background: 'none',

        border: 'none',

        color: '#f23f42',

        cursor: 'pointer',

        fontSize: '14px',

        padding: '8px 12px',
    },

    durationGrid: {
        display: 'grid',

        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',

        gap: '8px',
    },

    durationButton: {
        padding: '10px',

        backgroundColor: '#111214',

        border: '1px solid #0e1222',

        borderRadius: '4px',

        color: '#dbdee1',

        cursor: 'pointer',

        fontSize: '13px',
    },

    durationButtonActive: {
        backgroundColor: '#5865f2',

        borderColor: '#5865f2',

        color: '#ffffff',
    },

    hint: {
        fontSize: '12px',

        color: '#949ba4',

        marginTop: '8px',
    },

    checkboxes: {
        display: 'flex',

        flexDirection: 'column',

        gap: '12px',

        marginBottom: '24px',
    },

    checkbox: {
        display: 'flex',

        alignItems: 'center',

        gap: '8px',

        cursor: 'pointer',
    },

    checkboxLabel: {
        fontSize: '14px',

        color: '#dbdee1',
    },

    createButton: {
        width: '100%',

        padding: '12px',

        backgroundColor: '#23a559',

        border: 'none',

        borderRadius: '4px',

        color: '#ffffff',

        cursor: 'pointer',

        fontSize: '14px',

        fontWeight: '600',
    },
};

EnhancedPollsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    onClose: PropTypes.func,

    roomSlug: PropTypes.string,
};

export default EnhancedPollsPanel;

import { useState } from 'react';
import { FaTimes, FaPoll, FaPlus, FaTrash, FaClock, FaDownload, FaCalendar } from 'react-icons/fa';
import { toast } from '../utils/toast';

const EnhancedPollsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [anonymous, setAnonymous] = useState(false);
    const [duration, setDuration] = useState(24); // hours
    const [scheduledFor, setScheduledFor] = useState('');

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
            toast.error('Please enter a question');
            return;
        }

        const validOptions = options.filter(o => o.trim());
        if (validOptions.length < 2) {
            toast.error('Please add at least 2 options');
            return;
        }

        try {
            const payload = {
                question: question.trim(),
                options: validOptions,
                allow_multiple: allowMultiple,
                anonymous: anonymous,
                duration_hours: duration,
                room_slug: roomSlug
            };

            if (scheduledFor) {
                payload.scheduled_for = new Date(scheduledFor).toISOString();
            }

            await fetchWithAuth(`${apiBaseUrl}/polls/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            toast.success(scheduledFor ? 'Poll scheduled successfully' : 'Poll created successfully');
            onClose();
        } catch (error) {
            toast.error('Failed to create poll');
        }
    };

    const exportResults = async (pollId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/polls/${pollId}/export/`);
            const data = await response.json();

            const csv = [
                ['Option', 'Votes', 'Percentage'],
                ...data.results.map(r => [r.option, r.votes, `${r.percentage}%`])
            ].map(row => row.join(',')).join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `poll_results_${pollId}.csv`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success('Results exported');
        } catch (error) {
            toast.error('Failed to export results');
        }
    };

    const durationOptions = [
        { value: 1, label: '1 Hour' },
        { value: 6, label: '6 Hours' },
        { value: 12, label: '12 Hours' },
        { value: 24, label: '1 Day' },
        { value: 48, label: '2 Days' },
        { value: 72, label: '3 Days' },
        { value: 168, label: '1 Week' },
    ];

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaPoll style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Create Poll</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.section}>
                        <label style={styles.label}>Question</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="What's your question?"
                            style={styles.input}
                            maxLength={200}
                        />
                    </div>

                    <div style={styles.section}>
                        <div style={styles.sectionHeader}>
                            <label style={styles.label}>Options</label>
                            <button onClick={addOption} style={styles.addButton} disabled={options.length >= 10}>
                                <FaPlus style={{ marginRight: '6px' }} />
                                Add Option
                            </button>
                        </div>
                        <div style={styles.optionsList}>
                            {options.map((option, idx) => (
                                <div key={idx} style={styles.optionRow}>
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => updateOption(idx, e.target.value)}
                                        placeholder={`Option ${idx + 1}`}
                                        style={styles.optionInput}
                                        maxLength={100}
                                    />
                                    {options.length > 2 && (
                                        <button
                                            onClick={() => removeOption(idx)}
                                            style={styles.removeButton}
                                            title="Remove"
                                        >
                                            <FaTrash />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>Duration</label>
                        <div style={styles.durationGrid}>
                            {durationOptions.map(opt => (
                                <button
                                    key={opt.value}
                                    onClick={() => setDuration(opt.value)}
                                    style={{
                                        ...styles.durationButton,
                                        ...(duration === opt.value && styles.durationButtonActive)
                                    }}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={styles.section}>
                        <label style={styles.label}>
                            <FaCalendar style={{ marginRight: '6px' }} />
                            Schedule (Optional)
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
                            <span style={styles.checkboxLabel}>Allow multiple selections</span>
                        </label>

                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={anonymous}
                                onChange={(e) => setAnonymous(e.target.checked)}
                            />
                            <span style={styles.checkboxLabel}>Anonymous voting</span>
                        </label>
                    </div>

                    <button onClick={createPoll} style={styles.createButton}>
                        {scheduledFor ? 'Schedule Poll' : 'Create Poll'}
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
        color: '#dcddde',
        marginBottom: '8px',
    },
    input: {
        width: '100%',
        padding: '10px 12px',
        backgroundColor: '#2c2f33',
        border: '1px solid #2c2f33',
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
        backgroundColor: '#2c2f33',
        border: '1px solid #2c2f33',
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
        color: '#f04747',
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
        backgroundColor: '#2c2f33',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#dcddde',
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
        color: '#99aab5',
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
        color: '#dcddde',
    },
    createButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
};

export default EnhancedPollsPanel;

// frontend/src/components/PollCreator.js
import { useState } from 'react';
import toast from '../utils/toast';
import axios from 'axios';
import { getApiBase } from '../utils/apiEndpoints';

const PollCreator = ({ roomSlug, token, onClose, onPollCreated, isMobile }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [duration, setDuration] = useState(24); // hours
    const [isCreating, setIsCreating] = useState(false);

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

    const handleCreate = async () => {
        // Validation
        if (!question.trim()) {
            toast.error('❌ Please enter a question');
            return;
        }

        const validOptions = options.filter(o => o.trim());
        if (validOptions.length < 2) {
            toast.error('❌ Please provide at least 2 options');
            return;
        }

        setIsCreating(true);
        try {
            const response = await axios.post(
                `${getApiBase()}/polls/create/`,
                {
                    room_slug: roomSlug,
                    question: question.trim(),
                    options: validOptions.map(opt => opt.trim()),
                    duration_hours: duration,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (onPollCreated) {
                onPollCreated(response.data);
            }
            onClose();
        } catch (error) {
            console.error('Failed to create poll:', error);
            toast.error('❌ Failed to create poll. Please try again.');
        } finally {
            setIsCreating(false);
        }
    };

    const styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: isMobile ? '20px' : '40px',
        },
        modal: {
            background: 'linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))',
            borderRadius: '16px',
            padding: isMobile ? '20px' : '30px',
            width: '100%',
            maxWidth: isMobile ? '100%' : '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(88, 101, 242, 0.3)',
            border: '1px solid rgba(88, 101, 242, 0.4)',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
        },
        title: {
            fontSize: isMobile ? '20px' : '24px',
            fontWeight: '700',
            color: 'rgba(255, 255, 255, 0.95)',
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        closeButton: {
            background: 'rgba(88, 101, 242, 0.2)',
            border: '1px solid rgba(88, 101, 242, 0.4)',
            borderRadius: '8px',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease',
        },
        formGroup: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '8px',
        },
        input: {
            width: '100%',
            padding: '12px 14px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '15px',
            outline: 'none',
            transition: 'all 0.2s ease',
            boxSizing: 'border-box',
        },
        optionContainer: {
            display: 'flex',
            gap: '8px',
            marginBottom: '10px',
        },
        optionInput: {
            flex: 1,
            padding: '12px 14px',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.95)',
            fontSize: '14px',
            outline: 'none',
        },
        removeButton: {
            background: 'rgba(218, 55, 60, 0.2)',
            border: '1px solid rgba(218, 55, 60, 0.4)',
            borderRadius: '8px',
            padding: '0 16px',
            cursor: 'pointer',
            fontSize: '18px',
            color: '#da373c',
            transition: 'all 0.2s ease',
            minWidth: '44px',
        },
        addButton: {
            background: 'rgba(88, 101, 242, 0.2)',
            border: '1px solid rgba(88, 101, 242, 0.4)',
            borderRadius: '8px',
            padding: '10px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease',
            width: '100%',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            minHeight: '44px',
        },
        durationContainer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
            gap: '10px',
        },
        durationButton: (isActive) => ({
            padding: '12px',
            background: isActive
                ? 'linear-gradient(135deg, rgba(88, 101, 242, 0.3), rgba(114, 137, 218, 0.3))'
                : 'rgba(0, 0, 0, 0.3)',
            border: `1px solid ${isActive ? 'rgba(88, 101, 242, 0.6)' : 'rgba(88, 101, 242, 0.3)'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease',
            fontWeight: isActive ? '600' : '400',
            minHeight: '44px',
        }),
        buttonContainer: {
            display: 'flex',
            gap: '12px',
            marginTop: '24px',
        },
        createButton: {
            flex: 1,
            padding: '14px',
            background: 'linear-gradient(135deg, #5865f2, #7289da)',
            border: 'none',
            borderRadius: '8px',
            cursor: isCreating ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            color: 'white',
            transition: 'all 0.2s ease',
            opacity: isCreating ? 0.6 : 1,
            minHeight: '44px',
        },
        cancelButton: {
            flex: 1,
            padding: '14px',
            background: 'rgba(78, 80, 88, 0.5)',
            border: '1px solid rgba(88, 101, 242, 0.3)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.2s ease',
            minHeight: '44px',
        },
    };

    const durationOptions = [1, 4, 8, 24, 72, 168]; // hours

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <span>📊</span>
                        Create Poll
                    </h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        ✕
                    </button>
                </div>

                {/* Question */}
                <div style={styles.formGroup}>
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

                {/* Options */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Options (2-10)</label>
                    {options.map((option, index) => (
                        <div key={index} style={styles.optionContainer}>
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                style={styles.optionInput}
                                maxLength={100}
                            />
                            {options.length > 2 && (
                                <button
                                    onClick={() => removeOption(index)}
                                    style={styles.removeButton}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    {options.length < 10 && (
                        <button onClick={addOption} style={styles.addButton}>
                            <span>➕</span>
                            Add Option
                        </button>
                    )}
                </div>

                {/* Duration */}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Poll Duration</label>
                    <div style={styles.durationContainer}>
                        {durationOptions.map((hours) => (
                            <button
                                key={hours}
                                onClick={() => setDuration(hours)}
                                style={styles.durationButton(duration === hours)}
                            >
                                {hours < 24 ? `${hours}h` : `${hours / 24}d`}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div style={styles.buttonContainer}>
                    <button onClick={onClose} style={styles.cancelButton}>
                        Cancel
                    </button>
                    <button
                        onClick={handleCreate}
                        disabled={isCreating}
                        style={styles.createButton}
                    >
                        {isCreating ? 'Creating...' : 'Create Poll'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PollCreator;




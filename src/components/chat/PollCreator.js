/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/PollCreator.js
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import toast from '../../utils/toast';
import { authFetch } from '../../utils/authFetch';
import { getApiBase } from '../../utils/apiEndpoints';
import logger from '../../utils/logger';
import './PollCreator.css';

const PollCreator = ({ roomSlug, onClose, onPollCreated, isMobile }) => {
    const { t } = useTranslation();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [duration, setDuration] = useState(24); // hours
    const [isCreating, setIsCreating] = useState(false);

    const addOption = () => {
        if (options.length < 10) setOptions([...options, '']);
    };

    const removeOption = (index) => {
        if (options.length > 2) setOptions(options.filter((_, i) => i !== index));
    };

    const updateOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleCreate = async () => {
        if (!question.trim()) {
            toast.error(t('poll.questionRequired'));
            return;
        }
        const validOptions = options.filter((o) => o.trim());
        if (validOptions.length < 2) {
            toast.error(t('poll.optionsRequired'));
            return;
        }

        setIsCreating(true);
        try {
            const res = await authFetch(`${getApiBase()}/polls/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room_slug: roomSlug,
                    question: question.trim(),
                    options: validOptions.map((opt) => opt.trim()),
                    duration_hours: duration,
                }),
            });
            const pollData = await res.json();
            if (onPollCreated) onPollCreated(pollData);
            onClose();
        } catch (error) {
            logger.error('Failed to create poll:', error);
            toast.error(t('poll.createFailed'));
        } finally {
            setIsCreating(false);
        }
    };

    const durationOptions = [1, 4, 8, 24, 72, 168];

    return (
        <div
            className={`poll-overlay${isMobile ? ' poll-mobile' : ''}`}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                className="poll-modal"
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div className="poll-header">
                    <h2 className="poll-title">
                        <span>📊</span> Anket Oluştur
                    </h2>
                    <button aria-label="Close poll" onClick={onClose} className="poll-close-btn">
                        ✕
                    </button>
                </div>

                <div className="poll-form-group">
                    <label className="poll-label">Soru</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="What's your question?"
                        className="poll-input"
                        maxLength={200}
                        aria-label="Poll question"
                    />
                </div>

                <div className="poll-form-group">
                    <label className="poll-label">Options (2-10)</label>
                    {options.map((option, index) => (
                        <div key={index} className="poll-option-container">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => updateOption(index, e.target.value)}
                                placeholder={`Option ${index + 1}`}
                                className="poll-option-input"
                                maxLength={100}
                                aria-label={`Option ${index + 1}`}
                            />
                            {options.length > 2 && (
                                <button
                                    aria-label={`Remove option ${index + 1}`}
                                    onClick={() => removeOption(index)}
                                    className="poll-remove-btn"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                    {options.length < 10 && (
                        <button
                            aria-label="Add option"
                            onClick={addOption}
                            className="poll-add-btn"
                        >
                            <span>➕</span> Seçenek Ekle
                        </button>
                    )}
                </div>

                <div className="poll-form-group">
                    <label className="poll-label">Anket Süresi</label>
                    <div className="poll-duration-grid">
                        {durationOptions.map((hours) => (
                            <button
                                aria-label={`Duration ${hours < 24 ? hours + ' hours' : hours / 24 + ' days'}`}
                                key={hours}
                                onClick={() => setDuration(hours)}
                                className={`poll-duration-btn${duration === hours ? ' active' : ''}`}
                            >
                                {hours < 24 ? `${hours}h` : `${hours / 24}d`}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="poll-actions">
                    <button aria-label="Cancel" onClick={onClose} className="poll-cancel-btn">
                        İptal
                    </button>
                    <button
                        aria-label="Create poll"
                        onClick={handleCreate}
                        disabled={isCreating}
                        className="poll-create-btn"
                    >
                        {isCreating ? 'Creating...' : 'Create Poll'}
                    </button>
                </div>
            </div>
        </div>
    );
};

PollCreator.propTypes = {
    roomSlug: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onPollCreated: PropTypes.func,
    isMobile: PropTypes.bool,
};

export default PollCreator;

/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import useModalA11y from '../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

const S = {
    bg4: {
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'transparent',
        color: 'white',
        cursor: 'pointer',
    },
    bg3: {
        padding: '8px',
        borderRadius: '4px',
        backgroundColor: '#0d0e10',
        color: 'white',
        border: 'none',
    },
    flex3: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        background: 'none',
        border: 'none',
        color: '#3ba55d',
        cursor: 'pointer',
        alignSelf: 'flex-start',
    },
    bg2: {
        flex: 1,
        padding: '8px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0d0e10',
        color: 'white',
    },
    bg: {
        padding: '10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#0d0e10',
        color: 'white',
    },
    flex2: {
        backgroundColor: '#17191c',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxWidth: '90%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    flex: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
    },
};

const PollCreateModal = ({ onClose, fetchWithAuth, apiBaseUrl, activeRoomSlug }) => {
    const { t } = useTranslation();
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [expiresIn, setExpiresIn] = useState('3600'); // Default 1 hour
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen: true,
        label: 'Create Poll',
    });

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        if (options.length < 10) {
            setOptions([...options, '']);
        }
    };

    const removeOption = (index) => {
        if (options.length > 2) {
            const newOptions = options.filter((_, i) => i !== index);
            setOptions(newOptions);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Validation
        if (!question.trim()) {
            setError(t('ui.soru_bos_olamaz'));
            return;
        }
        const validOptions = options.filter((o) => o.trim() !== '');
        if (validOptions.length < 2) {
            setError(t('ui.en_az_2_secenek_girmelisiniz'));
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/polls/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room_slug: activeRoomSlug,
                    question: question,
                    options: validOptions,
                    allow_multiple: allowMultiple,
                    expires_in: expiresIn ? parseInt(expiresIn) : null,
                }),
            });

            if (response.ok) {
                onClose();
            } else {
                const data = await response.json();
                setError(data.error || t('ui.poll_olusturulamadi'));
            }
        } catch (err) {
            setError('Bir hata oluştu: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={S.flex} {...overlayProps}>
            <div style={S.flex2} {...dialogProps}>
                <div className="flex-between-center">
                    <h3 className="m-0">Anket Oluştur</h3>
                    <button aria-label="Close" onClick={onClose} className="btn-ghost-muted">
                        <FaTimes />
                    </button>
                </div>

                {error && <div className="text-danger-14">{error}</div>}

                <input
                    type="text"
                    placeholder="Soru ne?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={S.bg}
                />

                <div className="scroll-col-gap8">
                    {options.map((opt, idx) => (
                        <div key={`item-${idx}`} className="flex-gap-5">
                            <input
                                type="text"
                                placeholder={`Selectenek ${idx + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                style={S.bg2}
                            />
                            {options.length > 2 && (
                                <button
                                    aria-label="Delete"
                                    onClick={() => removeOption(idx)}
                                    className="btn-ghost-danger"
                                >
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {options.length < 10 && (
                    <button aria-label="add Option" onClick={addOption} style={S.flex3}>
                        <FaPlus /> Selectenek Add
                    </button>
                )}

                <div className="flex-col-gap10">
                    <label className="flex-align-cursor">
                        <input
                            type="checkbox"
                            checked={allowMultiple}
                            onChange={(e) => setAllowMultiple(e.target.checked)}
                        />
                        Birden çok seçime izin ver
                    </label>

                    <select
                        value={expiresIn}
                        onChange={(e) => setExpiresIn(e.target.value)}
                        style={S.bg3}
                    >
                        <option value="3600">1 Saat</option>
                        <option value="86400">24 Saat</option>
                        <option value="604800">1 Hafta</option>
                        <option value="">Permanent</option>
                    </select>
                </div>

                <div className="flex-end-10-mt10">
                    <button aria-label="on Close" onClick={onClose} style={S.bg4}>
                        {t('common.cancel')}
                    </button>
                    <button
                        aria-label="handle Submit"
                        onClick={handleSubmit}
                        disabled={isLoading}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: '#5865f2',
                            color: 'white',
                            cursor: 'pointer',
                            opacity: isLoading ? 0.7 : 1,
                        }}
                    >
                        {isLoading ? 'Oluşturuluyor...' : 'Oluştur'}
                    </button>
                </div>
            </div>
        </div>
    );
};

PollCreateModal.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    activeRoomSlug: PropTypes.bool,
};
export default PollCreateModal;

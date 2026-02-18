
import { useState } from 'react';
import { FaPlus, FaTrash, FaTimes } from 'react-icons/fa';
import useModalA11y from '../hooks/useModalA11y';

const PollCreateModal = ({ onClose, fetchWithAuth, apiBaseUrl, activeRoomSlug }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [expiresIn, setExpiresIn] = useState('3600'); // Default 1 hour
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: true, label: 'Create Poll' });

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
            setError('Soru boş olamaz.');
            return;
        }
        const validOptions = options.filter(o => o.trim() !== '');
        if (validOptions.length < 2) {
            setError('En az 2 seçenek girmelisiniz.');
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
                    expires_in: expiresIn ? parseInt(expiresIn) : null
                })
            });

            if (response.ok) {
                onClose();
            } else {
                const data = await response.json();
                setError(data.error || 'Anket oluşturulamadı.');
            }
        } catch (err) {
            setError('Bir hata oluştu: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
        }} {...overlayProps}>
            <div style={{
                backgroundColor: '#36393f', padding: '20px', borderRadius: '8px', width: '400px', maxWidth: '90%',
                color: 'white', display: 'flex', flexDirection: 'column', gap: '15px'
            }} {...dialogProps}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Anket Oluştur</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer' }}>
                        <FaTimes />
                    </button>
                </div>

                {error && <div style={{ color: '#ed4245', fontSize: '14px' }}>{error}</div>}

                <input
                    type="text"
                    placeholder="Soru ne?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    style={{
                        padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#202225', color: 'white'
                    }}
                />

                <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {options.map((opt, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '5px' }}>
                            <input
                                type="text"
                                placeholder={`Seçenek ${idx + 1}`}
                                value={opt}
                                onChange={(e) => handleOptionChange(idx, e.target.value)}
                                style={{
                                    flex: 1, padding: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#202225', color: 'white'
                                }}
                            />
                            {options.length > 2 && (
                                <button onClick={() => removeOption(idx)} style={{ background: 'none', border: 'none', color: '#ed4245', cursor: 'pointer' }}>
                                    <FaTrash />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {options.length < 10 && (
                    <button onClick={addOption} style={{
                        display: 'flex', alignItems: 'center', gap: '5px', background: 'none', border: 'none', color: '#3ba55d', cursor: 'pointer', alignSelf: 'flex-start'
                    }}>
                        <FaPlus /> Seçenek Ekle
                    </button>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
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
                        style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#202225', color: 'white', border: 'none' }}
                    >
                        <option value="3600">1 Saat</option>
                        <option value="86400">24 Saat</option>
                        <option value="604800">1 Hafta</option>
                        <option value="">Süresiz</option>
                    </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                    <button onClick={onClose} style={{
                        padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: 'transparent', color: 'white', cursor: 'pointer'
                    }}>İptal</button>
                    <button onClick={handleSubmit} disabled={isLoading} style={{
                        padding: '10px 20px', borderRadius: '4px', border: 'none', backgroundColor: '#5865f2', color: 'white', cursor: 'pointer', opacity: isLoading ? 0.7 : 1
                    }}>
                        {isLoading ? 'Oluşturuluyor...' : 'Oluştur'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PollCreateModal;



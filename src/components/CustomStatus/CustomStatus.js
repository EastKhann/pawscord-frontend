import React, { useState, useEffect, useRef } from 'react';
import './CustomStatus.css';

// Preset status emojis
const PRESET_EMOJIS = [
    '😀', '😎', '🎮', '💻', '📚', '🎵', '🎬', '☕',
    '🔥', '💤', '🏃', '🍕', '✈️', '🎉', '💼', '🚫',
    '🤔', '😴', '🎧', '🎸', '📱', '🌙', '☀️', '🌧️'
];

// Preset statuses
const PRESET_STATUSES = [
    { emoji: '🎮', text: 'Oyun oynuyor' },
    { emoji: '💻', text: 'Kod yazıyor' },
    { emoji: '📚', text: 'Çalışıyor' },
    { emoji: '🎵', text: 'Müzik dinliyor' },
    { emoji: '💤', text: 'AFK' },
    { emoji: '🚫', text: 'Rahatsız etmeyin' },
    { emoji: '☕', text: 'Mola veriyor' },
    { emoji: '🍕', text: 'Yemek yiyor' }
];

const CustomStatus = ({
    currentStatus,
    onStatusChange,
    maxLength = 128,
    showPresets = true
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [emoji, setEmoji] = useState(currentStatus?.emoji || '');
    const [text, setText] = useState(currentStatus?.text || '');
    const [clearAfter, setClearAfter] = useState(currentStatus?.clearAfter || 'never');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (currentStatus) {
            setEmoji(currentStatus.emoji || '');
            setText(currentStatus.text || '');
            setClearAfter(currentStatus.clearAfter || 'never');
        }
    }, [currentStatus]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleSave = () => {
        if (text.trim() || emoji) {
            onStatusChange?.({
                emoji,
                text: text.trim(),
                clearAfter,
                setAt: new Date().toISOString()
            });
        }
        setIsEditing(false);
    };

    const handleClear = () => {
        setEmoji('');
        setText('');
        setClearAfter('never');
        onStatusChange?.(null);
        setIsEditing(false);
    };

    const handlePresetClick = (preset) => {
        setEmoji(preset.emoji);
        setText(preset.text);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    const clearAfterOptions = [
        { value: 'never', label: 'Temizleme' },
        { value: '30min', label: '30 dakika' },
        { value: '1hour', label: '1 saat' },
        { value: '4hours', label: '4 saat' },
        { value: 'today', label: 'Bugün' },
        { value: '1week', label: '1 hafta' }
    ];

    if (!isEditing) {
        return (
            <div className="custom-status-display" onClick={() => setIsEditing(true)}>
                {currentStatus ? (
                    <>
                        <span className="status-emoji">{currentStatus.emoji}</span>
                        <span className="status-text">{currentStatus.text}</span>
                        <button className="status-clear-btn" onClick={(e) => {
                            e.stopPropagation();
                            handleClear();
                        }}>
                            ✕
                        </button>
                    </>
                ) : (
                    <span className="status-placeholder">Özel durum ayarla</span>
                )}
            </div>
        );
    }

    return (
        <div className="custom-status-editor">
            <div className="status-header">
                <h3>Özel Durum Ayarla</h3>
                <button className="close-btn" onClick={() => setIsEditing(false)}>✕</button>
            </div>

            <div className="status-input-row">
                <div
                    className="emoji-selector"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    {emoji || '😀'}
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    className="status-input"
                    placeholder="Ne yapıyorsun?"
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, maxLength))}
                    onKeyDown={handleKeyDown}
                />
            </div>

            {showEmojiPicker && (
                <div className="emoji-picker">
                    {PRESET_EMOJIS.map((e, i) => (
                        <button
                            key={i}
                            className="emoji-btn"
                            onClick={() => {
                                setEmoji(e);
                                setShowEmojiPicker(false);
                            }}
                        >
                            {e}
                        </button>
                    ))}
                </div>
            )}

            <div className="character-count">
                {text.length}/{maxLength}
            </div>

            {showPresets && (
                <div className="preset-statuses">
                    <span className="preset-label">Hızlı seçim:</span>
                    <div className="preset-list">
                        {PRESET_STATUSES.map((preset, i) => (
                            <button
                                key={i}
                                className="preset-btn"
                                onClick={() => handlePresetClick(preset)}
                            >
                                {preset.emoji} {preset.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="clear-after-section">
                <label>Şu süre sonra temizle:</label>
                <select
                    value={clearAfter}
                    onChange={(e) => setClearAfter(e.target.value)}
                >
                    {clearAfterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="status-actions">
                <button className="btn-secondary" onClick={handleClear}>
                    Durumu Temizle
                </button>
                <button className="btn-primary" onClick={handleSave}>
                    Kaydet
                </button>
            </div>
        </div>
    );
};

// Status display for user cards/profiles
export const StatusBadge = ({ status, size = 'medium' }) => {
    if (!status) return null;

    return (
        <div className={`status-badge ${size}`}>
            <span className="badge-emoji">{status.emoji}</span>
            <span className="badge-text">{status.text}</span>
        </div>
    );
};

// Mini status indicator
export const StatusIndicator = ({ status, onlineStatus = 'online' }) => {
    const statusColors = {
        online: '#3ba55c',
        idle: '#faa61a',
        dnd: '#ed4245',
        offline: '#747f8d'
    };

    return (
        <div className="status-indicator">
            <div
                className="online-dot"
                style={{ background: statusColors[onlineStatus] }}
            />
            {status && (
                <span className="custom-status-emoji" title={status.text}>
                    {status.emoji}
                </span>
            )}
        </div>
    );
};

// Status hook for managing auto-clear
export const useCustomStatus = (userId) => {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        // Load status from localStorage
        const saved = localStorage.getItem(`customStatus_${userId}`);
        if (saved) {
            const parsed = JSON.parse(saved);

            // Check if should be cleared
            if (parsed.clearAfter !== 'never' && parsed.setAt) {
                const setTime = new Date(parsed.setAt).getTime();
                const now = Date.now();
                let clearTime;

                switch (parsed.clearAfter) {
                    case '30min':
                        clearTime = 30 * 60 * 1000;
                        break;
                    case '1hour':
                        clearTime = 60 * 60 * 1000;
                        break;
                    case '4hours':
                        clearTime = 4 * 60 * 60 * 1000;
                        break;
                    case 'today':
                        const tomorrow = new Date();
                        tomorrow.setHours(0, 0, 0, 0);
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        clearTime = tomorrow.getTime() - setTime;
                        break;
                    case '1week':
                        clearTime = 7 * 24 * 60 * 60 * 1000;
                        break;
                    default:
                        clearTime = Infinity;
                }

                if (now - setTime > clearTime) {
                    localStorage.removeItem(`customStatus_${userId}`);
                    return;
                }
            }

            setStatus(parsed);
        }
    }, [userId]);

    const updateStatus = (newStatus) => {
        if (newStatus) {
            localStorage.setItem(`customStatus_${userId}`, JSON.stringify(newStatus));
        } else {
            localStorage.removeItem(`customStatus_${userId}`);
        }
        setStatus(newStatus);
    };

    return [status, updateStatus];
};

export default CustomStatus;

/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// frontend/src/components/StatusPicker.js

// 🔥 FEATURE 35: Status picker with presets

// Quick status picker: online, idle, dnd, invisible + custom status

import { useState, memo, useCallback } from 'react';

import PropTypes from 'prop-types';

import {
    FaCircle,
    FaMoon,
    FaMinusCircle,
    FaEyeSlash,
    FaSmile,
    FaTimes,
    FaClock,
} from 'react-icons/fa';

import { useTranslation } from 'react-i18next';

const STATUSES = [
    { key: 'online', label: 'Online', icon: FaCircle, color: '#23a559' },

    { key: 'idle', label: 'Idle', icon: FaMoon, color: '#fee75c' },

    {
        key: 'dnd',
        label: 'Rahatsız Etme',
        icon: FaMinusCircle,
        color: '#f23f42',
        desc: 'Bildirim almayacaksın',
    },

    {
        key: 'invisible',
        label: 'Invisible',
        icon: FaEyeSlash,
        color: '#80848e',
        desc: 'Offline görüneceksin',
    },
];

const EXPIRE_OPTIONS = [
    { label: 'Deleteme', value: null },

    { label: '30 minute', value: 30 },

    { label: '1 hour', value: 60 },

    { label: '4 hour', value: 240 },

    { label: 'Today', value: 'today' },
];

const StatusPicker = ({
    currentStatus = 'online',
    customStatus,
    onStatusChange,
    onCustomStatusChange,
    onClose,
}) => {
    const { t } = useTranslation();

    const [showCustom, setShowCustom] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const [customText, setCustomText] = useState(customStatus?.text || '');

    const [customEmoji, setCustomEmoji] = useState(customStatus?.emoji || '😊');

    const [expireAfter, setExpireAfter] = useState(null);

    const handleStatusChange = useCallback(
        (status) => {
            onStatusChange?.(status);

            if (!showCustom) onClose?.();
        },
        [onStatusChange, onClose, showCustom]
    );

    const handleCustomSave = useCallback(() => {
        onCustomStatusChange?.({
            text: customText.trim(),

            emoji: customEmoji,

            expireAfter,
        });

        onClose?.();
    }, [customText, customEmoji, expireAfter, onCustomStatusChange, onClose]);

    const handleClearCustom = useCallback(() => {
        onCustomStatusChange?.(null);

        setCustomText('');
    }, [onCustomStatusChange]);

    const handleToggleCustom = useCallback(() => setShowCustom((prev) => !prev), []);

    const handleClearClick = useCallback(
        (e) => {
            e.stopPropagation();
            handleClearCustom();
        },
        [handleClearCustom]
    );

    const handleCustomTextChange = useCallback((e) => setCustomText(e.target.value), []);

    const handleExpireChange = useCallback((e) => setExpireAfter(e.target.value || null), []);

    const handleEmojiCycle = useCallback(() => {
        const emojis = ['😊', '🎮', '🎵', '💻', '🔥', '💤', '🎉', '', '🚀', '📚'];

        setCustomEmoji((prev) => {
            const idx = emojis.indexOf(prev);

            return emojis[(idx + 1) % emojis.length];
        });
    }, []);

    const handleMouseEnter = useCallback((e) => {
        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
    }, []);

    const handleMouseLeave = useCallback((e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
    }, []);

    return (
        <div style={S.container}>
            {/* Custom Status Section */}

            <button
                aria-label="handle Toggle Custom"
                type="button"
                style={S.customBtn}
                onClick={handleToggleCustom}
            >
                <FaSmile style={S.txt} />

                <span>{customStatus?.text || t('ui.ozel_status_belirle')}</span>

                {customStatus?.text && <FaTimes style={S.txt2} onClick={handleClearClick} />}
            </button>

            {showCustom && (
                <div style={S.customPanel}>
                    <div style={S.customInput}>
                        <span
                            role="button"
                            tabIndex={0}
                            style={S.emojiPick}
                            onClick={handleEmojiCycle}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && handleEmojiCycle()
                            }
                        >
                            {customEmoji}
                        </span>

                        <input
                            type="text"
                            value={customText}
                            onChange={handleCustomTextChange}
                            placeholder="Statusunu ayarla..."
                            style={S.input}
                            maxLength={128}
                            aria-label="Custom Text"
                        />
                    </div>

                    <div style={S.expireRow}>
                        <FaClock className="text-4e-12" />

                        <span style={S.expireLabel}>Sonra temizle:</span>

                        <select
                            style={S.select}
                            value={expireAfter || ''}
                            onChange={handleExpireChange}
                            aria-label="select"
                        >
                            {EXPIRE_OPTIONS.map((opt) => (
                                <option key={opt.label} value={opt.value || ''}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        aria-label="handle Custom Save"
                        type="button"
                        style={S.saveBtn}
                        onClick={handleCustomSave}
                    >
                        Kaydet
                    </button>
                </div>
            )}

            <div style={S.divider} />

            {/* Status List */}

            {STATUSES.map((s) => {
                const Icon = s.icon;

                const isActive = currentStatus === s.key;

                return (
                    <button
                        aria-label="Action button"
                        key={s.key}
                        type="button"
                        style={{
                            ...S.statusItem,

                            backgroundColor: isActive ? 'rgba(88,101,242,0.1)' : 'transparent',
                        }}
                        onClick={() => handleStatusChange(s.key)}
                        onMouseEnter={!isActive ? handleMouseEnter : undefined}
                        onMouseLeave={!isActive ? handleMouseLeave : undefined}
                    >
                        <Icon style={{ fontSize: 12, color: s.color }} />

                        <div style={S.statusInfo}>
                            <span style={S.statusLabel}>{s.label}</span>

                            {s.desc && <span style={S.statusDesc}>{s.desc}</span>}
                        </div>

                        {isActive && <div style={{ ...S.activeDot, backgroundColor: s.color }} />}
                    </button>
                );
            })}
        </div>
    );
};

const S = {
    container: {
        backgroundColor: '#111214',
        borderRadius: 8,
        padding: '8px 0',

        minWidth: 260,
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)',

        border: '1px solid rgba(255,255,255,0.06)',
    },

    customBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,

        width: '100%',
        padding: '10px 14px',
        border: 'none',

        background: 'transparent',
        cursor: 'pointer',

        color: '#dbdee1',
        fontSize: 14,
        textAlign: 'left',
    },

    customPanel: {
        padding: '8px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
    },

    customInput: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,

        backgroundColor: '#0d0e10',
        borderRadius: 6,
        padding: '6px 10px',
    },

    emojiPick: {
        fontSize: 20,
        cursor: 'pointer',
        userSelect: 'none',
    },

    input: {
        flex: 1,
        background: 'transparent',
        border: 'none',
        outline: 'none',

        color: '#dbdee1',
        fontSize: 14,
        fontFamily: 'inherit',
    },

    expireRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
    },

    expireLabel: {
        fontSize: 12,
        color: '#4e5058',
    },

    select: {
        flex: 1,
        backgroundColor: '#0d0e10',
        border: 'none',
        borderRadius: 4,

        color: '#dbdee1',
        fontSize: 12,
        padding: '4px 6px',
        outline: 'none',
    },

    saveBtn: {
        padding: '6px 14px',
        borderRadius: 4,

        border: 'none',
        backgroundColor: '#5865f2',

        color: '#fff',
        fontSize: 13,
        fontWeight: 500,

        cursor: 'pointer',
        alignSelf: 'flex-end',
    },

    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '4px 10px',
    },

    statusItem: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,

        width: '100%',
        padding: '8px 14px',
        border: 'none',

        background: 'transparent',
        cursor: 'pointer',
        textAlign: 'left',

        transition: 'background 0.1s',
    },

    statusInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        flex: 1,
    },

    statusLabel: {
        fontSize: 14,
        color: '#dbdee1',
        fontWeight: 500,
    },

    statusDesc: {
        fontSize: 11,
        color: '#4e5058',
    },

    activeDot: {
        width: 6,
        height: 6,
        borderRadius: '50%',
    },

    txt2: { fontSize: 12, color: '#b5bac1', marginLeft: 'auto' },

    txt: { fontSize: 16, color: '#fee75c' },
};

StatusPicker.propTypes = {
    currentStatus: PropTypes.string,

    customStatus: PropTypes.array,

    onStatusChange: PropTypes.func,

    onCustomStatusChange: PropTypes.func,

    onClose: PropTypes.func,
};

export default memo(StatusPicker);

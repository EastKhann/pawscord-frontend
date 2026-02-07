// frontend/src/components/StatusPicker.js
// 🔥 FEATURE 35: Status picker with presets
// Quick status picker: online, idle, dnd, invisible + custom status

import React, { useState, memo, useCallback } from 'react';
import { FaCircle, FaMoon, FaMinusCircle, FaEyeSlash, FaSmile, FaTimes, FaClock } from 'react-icons/fa';

const STATUSES = [
    { key: 'online', label: 'Çevrimiçi', icon: FaCircle, color: '#57f287' },
    { key: 'idle', label: 'Boşta', icon: FaMoon, color: '#fee75c' },
    { key: 'dnd', label: 'Rahatsız Etmeyin', icon: FaMinusCircle, color: '#ed4245', desc: 'Hiçbir bildirim almayacaksın' },
    { key: 'invisible', label: 'Görünmez', icon: FaEyeSlash, color: '#747f8d', desc: 'Çevrimdışı görüneceksin' },
];

const EXPIRE_OPTIONS = [
    { label: 'Silme', value: null },
    { label: '30 dakika', value: 30 },
    { label: '1 saat', value: 60 },
    { label: '4 saat', value: 240 },
    { label: 'Bugün', value: 'today' },
];

const StatusPicker = ({ currentStatus = 'online', customStatus, onStatusChange, onCustomStatusChange, onClose }) => {
    const [showCustom, setShowCustom] = useState(false);
    const [customText, setCustomText] = useState(customStatus?.text || '');
    const [customEmoji, setCustomEmoji] = useState(customStatus?.emoji || '😊');
    const [expireAfter, setExpireAfter] = useState(null);

    const handleStatusChange = useCallback((status) => {
        onStatusChange?.(status);
        if (!showCustom) onClose?.();
    }, [onStatusChange, onClose, showCustom]);

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

    return (
        <div style={S.container}>
            {/* Custom Status Section */}
            <button
                type="button"
                style={S.customBtn}
                onClick={() => setShowCustom(!showCustom)}
            >
                <FaSmile style={{ fontSize: 16, color: '#fee75c' }} />
                <span>{customStatus?.text || 'Özel Durum Belirle'}</span>
                {customStatus?.text && (
                    <FaTimes
                        style={{ fontSize: 12, color: '#b5bac1', marginLeft: 'auto' }}
                        onClick={(e) => { e.stopPropagation(); handleClearCustom(); }}
                    />
                )}
            </button>

            {showCustom && (
                <div style={S.customPanel}>
                    <div style={S.customInput}>
                        <span
                            style={S.emojiPick}
                            onClick={() => {
                                const emojis = ['😊', '🎮', '🎵', '💻', '🔥', '💤', '🎉', '❤️', '🚀', '📚'];
                                const idx = emojis.indexOf(customEmoji);
                                setCustomEmoji(emojis[(idx + 1) % emojis.length]);
                            }}
                        >
                            {customEmoji}
                        </span>
                        <input
                            type="text"
                            value={customText}
                            onChange={e => setCustomText(e.target.value)}
                            placeholder="Durumunu ayarla..."
                            style={S.input}
                            maxLength={128}
                        />
                    </div>
                    <div style={S.expireRow}>
                        <FaClock style={{ fontSize: 12, color: '#4e5058' }} />
                        <span style={S.expireLabel}>Sonra temizle:</span>
                        <select
                            style={S.select}
                            value={expireAfter || ''}
                            onChange={e => setExpireAfter(e.target.value || null)}
                        >
                            {EXPIRE_OPTIONS.map(opt => (
                                <option key={opt.label} value={opt.value || ''}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                    <button type="button" style={S.saveBtn} onClick={handleCustomSave}>
                        Kaydet
                    </button>
                </div>
            )}

            <div style={S.divider} />

            {/* Status List */}
            {STATUSES.map(s => {
                const Icon = s.icon;
                const isActive = currentStatus === s.key;
                return (
                    <button
                        key={s.key}
                        type="button"
                        style={{
                            ...S.statusItem,
                            backgroundColor: isActive ? 'rgba(88,101,242,0.1)' : 'transparent',
                        }}
                        onClick={() => handleStatusChange(s.key)}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
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
        backgroundColor: '#111214', borderRadius: 8, padding: '8px 0',
        minWidth: 260, boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.06)',
    },
    customBtn: {
        display: 'flex', alignItems: 'center', gap: 8,
        width: '100%', padding: '10px 14px', border: 'none',
        background: 'transparent', cursor: 'pointer',
        color: '#dcddde', fontSize: 14, textAlign: 'left',
    },
    customPanel: {
        padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 8,
    },
    customInput: {
        display: 'flex', alignItems: 'center', gap: 8,
        backgroundColor: '#1e1f22', borderRadius: 6, padding: '6px 10px',
    },
    emojiPick: {
        fontSize: 20, cursor: 'pointer', userSelect: 'none',
    },
    input: {
        flex: 1, background: 'transparent', border: 'none', outline: 'none',
        color: '#dcddde', fontSize: 14, fontFamily: 'inherit',
    },
    expireRow: {
        display: 'flex', alignItems: 'center', gap: 6,
    },
    expireLabel: {
        fontSize: 12, color: '#4e5058',
    },
    select: {
        flex: 1, backgroundColor: '#1e1f22', border: 'none', borderRadius: 4,
        color: '#dcddde', fontSize: 12, padding: '4px 6px', outline: 'none',
    },
    saveBtn: {
        padding: '6px 14px', borderRadius: 4,
        border: 'none', backgroundColor: '#5865f2',
        color: '#fff', fontSize: 13, fontWeight: 500,
        cursor: 'pointer', alignSelf: 'flex-end',
    },
    divider: {
        height: 1, backgroundColor: 'rgba(255,255,255,0.06)', margin: '4px 10px',
    },
    statusItem: {
        display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', padding: '8px 14px', border: 'none',
        background: 'transparent', cursor: 'pointer', textAlign: 'left',
        transition: 'background 0.1s',
    },
    statusInfo: {
        display: 'flex', flexDirection: 'column', gap: 1, flex: 1,
    },
    statusLabel: {
        fontSize: 14, color: '#dcddde', fontWeight: 500,
    },
    statusDesc: {
        fontSize: 11, color: '#4e5058',
    },
    activeDot: {
        width: 6, height: 6, borderRadius: '50%',
    },
};

export default memo(StatusPicker);

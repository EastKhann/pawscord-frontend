// frontend/src/components/SlowModeSelector.js
// 🔥 FEATURE 43: Channel slow mode selector UI
// Admin picks slow mode duration for a channel

import React, { useState, memo, useCallback } from 'react';
import { FaClock, FaCheck } from 'react-icons/fa';

const SLOW_MODE_OPTIONS = [
    { value: 0, label: 'Kapalı', desc: 'Sınırsız mesaj' },
    { value: 5, label: '5s', desc: '5 saniye' },
    { value: 10, label: '10s', desc: '10 saniye' },
    { value: 15, label: '15s', desc: '15 saniye' },
    { value: 30, label: '30s', desc: '30 saniye' },
    { value: 60, label: '1dk', desc: '1 dakika' },
    { value: 120, label: '2dk', desc: '2 dakika' },
    { value: 300, label: '5dk', desc: '5 dakika' },
    { value: 600, label: '10dk', desc: '10 dakika' },
    { value: 900, label: '15dk', desc: '15 dakika' },
    { value: 1800, label: '30dk', desc: '30 dakika' },
    { value: 3600, label: '1sa', desc: '1 saat' },
    { value: 7200, label: '2sa', desc: '2 saat' },
    { value: 21600, label: '6sa', desc: '6 saat' },
];

const SlowModeSelector = ({ currentValue = 0, channelName, onSave }) => {
    const [selected, setSelected] = useState(currentValue);

    const handleSave = useCallback(() => {
        onSave?.(selected);
    }, [selected, onSave]);

    const percentage = SLOW_MODE_OPTIONS.findIndex(o => o.value === selected);
    const sliderPercent = (percentage / (SLOW_MODE_OPTIONS.length - 1)) * 100;

    return (
        <div style={S.container}>
            <div style={S.header}>
                <FaClock style={{ fontSize: 14, color: '#5865f2' }} />
                <span style={S.title}>Yavaş Mod</span>
            </div>
            <p style={S.desc}>
                Üyeler mesajlar arasında bu kadar süre beklemek zorunda
            </p>

            {/* Slider */}
            <div style={S.sliderContainer}>
                <input
                    type="range"
                    min={0}
                    max={SLOW_MODE_OPTIONS.length - 1}
                    value={percentage}
                    onChange={e => setSelected(SLOW_MODE_OPTIONS[Number(e.target.value)].value)}
                    style={S.slider}
                />
                <div style={S.marks}>
                    {SLOW_MODE_OPTIONS.filter((_, i) => i % 3 === 0 || i === SLOW_MODE_OPTIONS.length - 1).map(opt => (
                        <span key={opt.value} style={S.mark}>{opt.label}</span>
                    ))}
                </div>
            </div>

            {/* Current Value Display */}
            <div style={{
                ...S.currentValue,
                backgroundColor: selected === 0 ? 'rgba(87,242,135,0.1)' : 'rgba(88,101,242,0.1)',
            }}>
                <FaClock style={{ fontSize: 14, color: selected === 0 ? '#57f287' : '#5865f2' }} />
                <div>
                    <span style={S.valueLabel}>
                        {SLOW_MODE_OPTIONS.find(o => o.value === selected)?.desc || 'Kapalı'}
                    </span>
                    {selected > 0 && (
                        <span style={S.valueHint}>
                            #{channelName || 'kanal'} için yavaş mod
                        </span>
                    )}
                </div>
            </div>

            {selected !== currentValue && (
                <button type="button" style={S.saveBtn} onClick={handleSave}>
                    <FaCheck /> Kaydet
                </button>
            )}
        </div>
    );
};

const S = {
    container: { padding: 16 },
    header: {
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4,
    },
    title: { fontSize: 14, fontWeight: 600, color: '#f2f3f5' },
    desc: { fontSize: 13, color: '#b5bac1', margin: '0 0 16px' },
    sliderContainer: { marginBottom: 16 },
    slider: {
        width: '100%', height: 6, appearance: 'none',
        backgroundColor: '#1e1f22', borderRadius: 3, outline: 'none',
        cursor: 'pointer',
    },
    marks: {
        display: 'flex', justifyContent: 'space-between',
        fontSize: 10, color: '#4e5058', marginTop: 6,
    },
    mark: {},
    currentValue: {
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px', borderRadius: 8,
    },
    valueLabel: {
        display: 'block', fontSize: 14, fontWeight: 600, color: '#f2f3f5',
    },
    valueHint: {
        display: 'block', fontSize: 12, color: '#b5bac1', marginTop: 2,
    },
    saveBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        marginTop: 12, padding: '8px 20px', borderRadius: 4,
        border: 'none', backgroundColor: '#5865f2',
        color: '#fff', fontSize: 14, fontWeight: 500,
        cursor: 'pointer', width: '100%',
    },
};

export default memo(SlowModeSelector);

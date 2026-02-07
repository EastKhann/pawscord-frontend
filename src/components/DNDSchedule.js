// frontend/src/components/DNDSchedule.js
// 🔥 FEATURE 37: Do Not Disturb auto-schedule
// Set DND hours to automatically activate

import React, { useState, memo, useCallback } from 'react';
import { FaMinusCircle, FaClock, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const DNDSchedule = ({ schedule, onSave }) => {
    const [enabled, setEnabled] = useState(schedule?.enabled || false);
    const [startTime, setStartTime] = useState(schedule?.startTime || '22:00');
    const [endTime, setEndTime] = useState(schedule?.endTime || '08:00');
    const [days, setDays] = useState(schedule?.days || [0, 1, 2, 3, 4, 5, 6]); // All days by default

    const DAY_LABELS = ['Pzr', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

    const toggleDay = useCallback((day) => {
        setDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort()
        );
    }, []);

    const handleSave = useCallback(() => {
        onSave?.({ enabled, startTime, endTime, days });
    }, [enabled, startTime, endTime, days, onSave]);

    return (
        <div style={S.container}>
            <div style={S.header}>
                <FaMinusCircle style={{ fontSize: 14, color: '#ed4245' }} />
                <span style={S.title}>Rahatsız Etmeyin Zamanlayıcı</span>
                <button
                    type="button"
                    style={S.toggleBtn}
                    onClick={() => setEnabled(!enabled)}
                >
                    {enabled ? (
                        <FaToggleOn style={{ fontSize: 24, color: '#5865f2' }} />
                    ) : (
                        <FaToggleOff style={{ fontSize: 24, color: '#4e5058' }} />
                    )}
                </button>
            </div>

            {enabled && (
                <>
                    <div style={S.timeRow}>
                        <div style={S.timeField}>
                            <label style={S.label}>Başlangıç</label>
                            <div style={S.timeInput}>
                                <FaClock style={{ fontSize: 12, color: '#4e5058' }} />
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                    style={S.input}
                                />
                            </div>
                        </div>
                        <span style={S.arrow}>→</span>
                        <div style={S.timeField}>
                            <label style={S.label}>Bitiş</label>
                            <div style={S.timeInput}>
                                <FaClock style={{ fontSize: 12, color: '#4e5058' }} />
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={e => setEndTime(e.target.value)}
                                    style={S.input}
                                />
                            </div>
                        </div>
                    </div>

                    <div style={S.daysRow}>
                        <label style={S.label}>Günler</label>
                        <div style={S.dayBtns}>
                            {DAY_LABELS.map((label, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    style={{
                                        ...S.dayBtn,
                                        backgroundColor: days.includes(i) ? '#5865f2' : 'rgba(255,255,255,0.06)',
                                        color: days.includes(i) ? '#fff' : '#b5bac1',
                                    }}
                                    onClick={() => toggleDay(i)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={S.preview}>
                        <FaClock style={{ fontSize: 11, color: '#4e5058' }} />
                        <span style={S.previewText}>
                            {startTime} - {endTime} arası DND aktif
                        </span>
                    </div>

                    <button type="button" style={S.saveBtn} onClick={handleSave}>
                        Kaydet
                    </button>
                </>
            )}
        </div>
    );
};

const S = {
    container: {
        padding: 16, backgroundColor: '#2b2d31', borderRadius: 8,
    },
    header: {
        display: 'flex', alignItems: 'center', gap: 8,
    },
    title: {
        fontSize: 14, fontWeight: 600, color: '#f2f3f5', flex: 1,
    },
    toggleBtn: {
        background: 'transparent', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center',
    },
    timeRow: {
        display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 16,
    },
    timeField: {
        flex: 1, display: 'flex', flexDirection: 'column', gap: 4,
    },
    label: {
        fontSize: 12, fontWeight: 600, color: '#b5bac1',
        textTransform: 'uppercase', letterSpacing: '0.5px',
    },
    timeInput: {
        display: 'flex', alignItems: 'center', gap: 6,
        backgroundColor: '#1e1f22', borderRadius: 4, padding: '6px 10px',
    },
    input: {
        flex: 1, background: 'transparent', border: 'none', outline: 'none',
        color: '#dcddde', fontSize: 14, fontFamily: 'inherit',
    },
    arrow: {
        fontSize: 16, color: '#4e5058', paddingBottom: 6,
    },
    daysRow: {
        marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8,
    },
    dayBtns: {
        display: 'flex', gap: 4,
    },
    dayBtn: {
        padding: '4px 8px', borderRadius: 4, border: 'none',
        fontSize: 12, fontWeight: 500, cursor: 'pointer',
        transition: 'all 0.15s',
    },
    preview: {
        display: 'flex', alignItems: 'center', gap: 6,
        marginTop: 12, padding: '6px 10px',
        backgroundColor: 'rgba(237,66,69,0.1)', borderRadius: 4,
    },
    previewText: {
        fontSize: 12, color: '#ed4245',
    },
    saveBtn: {
        marginTop: 12, padding: '8px 20px', borderRadius: 4,
        border: 'none', backgroundColor: '#5865f2',
        color: '#fff', fontSize: 14, fontWeight: 500,
        cursor: 'pointer', width: '100%',
    },
};

export default memo(DNDSchedule);

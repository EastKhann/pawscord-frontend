// frontend/src/components/MessageSchedulePicker.js
// 📅 FEATURE — Message Schedule UI Picker
// Calendar + time picker for scheduling messages

import { useState, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaClock, FaCalendar, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const pad = (n) => String(n).padStart(2, '0');

const MessageSchedulePicker = ({ onSchedule, onClose }) => {
    const { t } = useTranslation();
    const QUICK_OPTIONS = [
        { label: '15 minute', minutes: 15 },
        { label: '1 hour', minutes: 60 },
        { label: '3 hour', minutes: 180 },
        {
            label: t('ui.yarin_sabah'),
            getDate: () => {
                const d = new Date();
                d.setDate(d.getDate() + 1);
                d.setHours(9, 0, 0, 0);
                return d;
            },
        },
        {
            label: t('ui.yarin_aksam'),
            getDate: () => {
                const d = new Date();
                d.setDate(d.getDate() + 1);
                d.setHours(18, 0, 0, 0);
                return d;
            },
        },
    ];
    const now = new Date();
    const [date, setDate] = useState(
        `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
    );
    const [time, setTime] = useState(`${pad(now.getHours())}:${pad(now.getMinutes() + 5)}`);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleQuickOption = useCallback((opt) => {
        let targetDate;
        if (opt.getDate) {
            targetDate = opt.getDate();
        } else {
            targetDate = new Date(Date.now() + opt.minutes * 60000);
        }
        setDate(
            `${targetDate.getFullYear()}-${pad(targetDate.getMonth() + 1)}-${pad(targetDate.getDate())}`
        );
        setTime(`${pad(targetDate.getHours())}:${pad(targetDate.getMinutes())}`);
        setError('');
    }, []);

    const handleSchedule = useCallback(() => {
        const scheduled = new Date(`${date}T${time}`);
        if (scheduled <= new Date()) {
            setError('Geçmiş zaman seçemezsiniz');
            return;
        }
        onSchedule?.(scheduled.toISOString());
    }, [date, time, onSchedule]);

    return (
        <div
            style={S.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={S.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={S.header}>
                    <div style={S.headerTitle}>
                        <FaClock className="icon-primary" />
                        <span>Mesaj Zamanlama</span>
                    </div>
                    <button aria-label="Close" style={S.closeBtn} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Quick options */}
                <div style={S.quickOptions}>
                    {QUICK_OPTIONS.map((opt, i) => (
                        <button
                            aria-label="Action button"
                            key={`item-${i}`}
                            style={S.quickBtn}
                            onClick={() => handleQuickOption(opt)}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>

                <div style={S.divider} />

                {/* Custom date/time */}
                <div style={S.customSection}>
                    <span style={S.sectionLabel}>ÖZEL TARİH & SAAT</span>
                    <div style={S.inputs}>
                        <div style={S.inputGroup}>
                            <FaCalendar style={S.inputIcon} />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => {
                                    setDate(e.target.value);
                                    setError('');
                                }}
                                style={S.input}
                            />
                        </div>
                        <div style={S.inputGroup}>
                            <FaClock style={S.inputIcon} />
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => {
                                    setTime(e.target.value);
                                    setError('');
                                }}
                                style={S.input}
                            />
                        </div>
                    </div>
                </div>

                {error && <div style={S.error}>{error}</div>}
                {/* Preview */}
                <div style={S.preview}>
                    Sendilecek:{' '}
                    <strong>{new Date(`${date}T${time}`).toLocaleString('tr-TR')}</strong>
                </div>

                <button aria-label="handle Schedule" style={S.scheduleBtn} onClick={handleSchedule}>
                    <FaPaperPlane /> Zamanla
                </button>
            </div>
        </div>
    );
};

const S = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5000,
    },
    modal: {
        backgroundColor: '#111214',
        borderRadius: 12,
        padding: 20,
        width: 380,
        maxWidth: '90vw',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: '#fff',
        fontWeight: 700,
        fontSize: 16,
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: 16,
        padding: 4,
    },
    quickOptions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
    },
    quickBtn: {
        padding: '6px 14px',
        backgroundColor: 'rgba(88,101,242,0.1)',
        border: '1px solid rgba(88,101,242,0.3)',
        borderRadius: 8,
        color: '#dbdee1',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: 500,
        transition: 'all 0.15s',
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '16px 0',
    },
    customSection: {},
    sectionLabel: {
        fontSize: 11,
        fontWeight: 700,
        color: '#949ba4',
        letterSpacing: '0.04em',
        display: 'block',
        marginBottom: 10,
    },
    inputs: { display: 'flex', gap: 10 },
    inputGroup: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#0d0e10',
        borderRadius: 8,
        padding: '8px 12px',
    },
    inputIcon: { color: '#949ba4', fontSize: 14, flexShrink: 0 },
    input: {
        flex: 1,
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: 14,
        outline: 'none',
    },
    error: {
        color: '#da373c',
        fontSize: 12,
        marginTop: 8,
        padding: '4px 8px',
        backgroundColor: 'rgba(218,55,60,0.1)',
        borderRadius: 4,
    },
    preview: {
        color: '#949ba4',
        fontSize: 13,
        marginTop: 16,
        padding: '8px 12px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 8,
    },
    scheduleBtn: {
        width: '100%',
        marginTop: 16,
        padding: '10px 0',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'background 0.15s',
    },
};

MessageSchedulePicker.propTypes = {
    onSchedule: PropTypes.func,
    onClose: PropTypes.func,
};
export default memo(MessageSchedulePicker);

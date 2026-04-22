/* eslint-disable jsx-a11y/label-has-associated-control */
import { getToken } from '../../utils/tokenStorage';
// frontend/src/components/CustomStatusModal.js

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaGamepad, FaHeadphones, FaEye, FaTwitch, FaTrophy, FaPen } from 'react-icons/fa';

import { API_BASE_URL } from '../../utils/constants';

import useModalA11y from '../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';

const EXPIRY_OPTIONS = [
    { label: 'Clearme', value: null },

    { label: '30 minute', value: 30 },

    { label: '1 hour', value: 60 },

    { label: '4 hour', value: 240 },

    { label: 'Today', value: 'today' },
];

const CustomStatusModal = ({ isOpen, onClose, onStatusChange }) => {
    const { t } = useTranslation();

    const STATUS_TYPES = [
        {
            key: 'custom',
            label: t('ui.ozel_2'),
            icon: '✨',
            color: '#5865F2',
            placeholder: t('customStatusModal.customPlaceholder', 'Write your custom status...'),
        },

        {
            key: 'gaming',
            label: 'Oynuyor',
            icon: '🎮',
            color: '#23a559',
            placeholder: 'Hangi oyunu oynuyorsun?',
        },

        {
            key: 'happy',
            label: 'Listening',
            icon: '🎧',
            color: '#1DB954',
            placeholder: 'Ne dinliyorsun?',
        },

        {
            key: 'focused',
            label: t('ui.izliyor'),
            icon: '👀',
            color: '#E91E63',
            placeholder: 'Ne izliyorsun?',
        },

        {
            key: 'creative',
            label: t('ui.yayinda'),
            icon: '📡',
            color: '#9146FF',
            placeholder: t('customStatusModal.streamPlaceholder', 'Stream title...'),
        },

        {
            key: 'excited',
            label: t('ui.yarisiyor'),
            icon: '',
            color: '#f0b232',
            placeholder: t('customStatusModal.competitionPlaceholder', 'Which competition?'),
        },

        {
            key: 'working',
            label: t('ui.calisiyor_2'),
            icon: '💼',
            color: '#80848e',
            placeholder: t('customStatusModal.workingPlaceholder', 'What are you working on?'),
        },

        {
            key: 'studying',
            label: 'Okuyor',
            icon: '📚',
            color: '#5865F2',
            placeholder: 'Ne okuyorsun?',
        },
    ];

    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        isOpen,
        label: 'Statusu Ayarla',
    });

    const [statusType, setStatusType] = useState('custom');

    const [error, setError] = useState(null);

    const [emoji, setEmoji] = useState('✨');

    const [text, setText] = useState('');

    const [expiresIn, setExpiresIn] = useState(null);

    const [loading, setLoading] = useState(false);

    const [currentStatus, setCurrentStatus] = useState(null);

    // Fetch current status on open

    useEffect(() => {
        if (!isOpen) return;

        const fetchStatus = async () => {
            try {
                const token = getToken();

                const res = await fetch(`${API_BASE_URL}/api/status/custom/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (res.ok) {
                    const data = await res.json();

                    if (data.type) {
                        setCurrentStatus(data);

                        setStatusType(data.type);

                        setEmoji(data.emoji || '✨');

                        setText(data.text || data.activity || '');
                    }
                }
            } catch {
                /* ignore */
            }
        };

        fetchStatus();
    }, [isOpen]);

    const handleSave = async () => {
        setLoading(true);

        try {
            const token = getToken();

            let expMin = expiresIn;

            if (expiresIn === 'today') {
                const now = new Date();

                const endOfDay = new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    now.getDate(),
                    23,
                    59,
                    59
                );

                expMin = Math.floor((endOfDay - now) / 60000);
            }

            const res = await fetch(`${API_BASE_URL}/api/status/custom/`, {
                method: 'POST',

                headers: {
                    Authorization: `Bearer ${token}`,

                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    type: statusType,

                    emoji,

                    text,

                    activity: text,

                    expires_in: expMin,
                }),
            });

            if (res.ok) {
                const data = await res.json();

                onStatusChange?.(data);

                onClose();
            }
        } catch {
            /* ignore */
        } finally {
            setLoading(false);
        }
    };

    const handleClear = async () => {
        setLoading(true);

        try {
            const token = getToken();

            await fetch(`${API_BASE_URL}/api/status/custom/`, {
                method: 'DELETE',

                headers: { Authorization: `Bearer ${token}` },
            });

            setCurrentStatus(null);

            setStatusType('custom');

            setEmoji('✨');

            setText('');

            onStatusChange?.(null);

            onClose();
        } catch {
            /* ignore */
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const selectedType = STATUS_TYPES.find((t) => t.key === statusType) || STATUS_TYPES[0];

    const previewBorderStyle = { ...styles.preview, borderColor: selectedType.color };

    const selectedTypeColorStyle = { color: selectedType.color, fontWeight: 600, fontSize: 12 };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                {/* Header */}

                <div style={styles.header}>
                    <h3 style={styles.title}>{t('status.setStatus', 'Set Status')}</h3>

                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* Preview */}

                <div style={previewBorderStyle}>
                    <span style={styles.previewEmoji}>{emoji}</span>

                    <div style={styles.previewText}>
                        <span style={selectedTypeColorStyle}>{selectedType.label}</span>

                        <span style={styles.previewContent}>
                            {text || selectedType.placeholder}
                        </span>
                    </div>
                </div>

                {/* Status Type Selector */}

                <div style={styles.section}>
                    <label style={styles.label}>Durum Tipi</label>

                    <div style={styles.typeGrid}>
                        {STATUS_TYPES.map((type) => {
                            const typeBtnStyle = {
                                ...styles.typeBtn,
                                ...(statusType === type.key
                                    ? {
                                        backgroundColor: `${type.color}20`,
                                        borderColor: type.color,
                                        color: type.color,
                                    }
                                    : {}),
                            };

                            return (
                                <button
                                    aria-label={t('status.selectType', 'Select status type {{type}}', { type: type.label })}
                                >
                                    <span>{type.icon}</span>

                                    <span className="fs-11">{type.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Custom Emoji */}

                <div style={styles.section}>
                    <label style={styles.label}>Emoji</label>

                    <input
                        type="text"
                        value={emoji}
                        onChange={(e) => setEmoji(e.target.value.slice(-2))}
                        style={styles.emojiInput}
                        maxLength={4}
                        aria-label={t('customStatus.emojiInput', 'Status emoji')}
                    />
                </div>

                {/* Status Text */}

                <div style={styles.section}>
                    <label style={styles.label}>Durum Metni</label>

                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={selectedType.placeholder}
                        style={styles.textInput}
                        maxLength={100}
                        aria-label={t('customStatus.textInput', 'Status text')}
                    />

                    <span style={styles.charCount}>{text.length}/100</span>
                </div>

                {/* Expiry */}

                <div style={styles.section}>
                    <label style={styles.label}>Otomatik Temizle</label>

                    <div style={styles.expiryRow}>
                        {EXPIRY_OPTIONS.map((opt) => {
                            const expiryBtnStyle = {
                                ...styles.expiryBtn,
                                ...(expiresIn === opt.value ? styles.expiryBtnActive : {}),
                            };

                            return (
                                <button
                                    aria-label={t('status.expiry', 'Clear after {{when}}', { when: opt.label })}
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Actions */}

                <div style={styles.actions}>
                    {currentStatus && (
                        <button
                            aria-label={t('status.clearStatus', 'Clear status')}
                            onClick={handleClear}
                            style={styles.clearBtn}
                            disabled={loading}
                        >
                            {t('status.clearStatus', 'Clear Status')}
                        </button>
                    )}

                    <div className="flex-1" />

                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.cancelBtn}>
                        {t('common.cancel')}
                    </button>

                    <button
                        aria-label={t('common.save', 'Save')}
                        onClick={handleSave}
                        style={styles.saveBtn}
                        disabled={loading || !text.trim()}
                    >
                        {loading ? '...' : t('common.save', 'Save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',

        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        backgroundColor: 'rgba(0,0,0,0.6)',

        display: 'flex',

        justifyContent: 'center',

        alignItems: 'center',

        zIndex: 1100,
    },

    modal: {
        width: '440px',

        maxWidth: '90vw',

        backgroundColor: '#17191c',

        borderRadius: '12px',

        overflow: 'hidden',

        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    },

    header: {
        display: 'flex',

        justifyContent: 'space-between',

        alignItems: 'center',

        padding: '16px 20px',

        borderBottom: '1px solid #0e1222',
    },

    title: {
        margin: 0,

        fontSize: '18px',

        fontWeight: 700,

        color: '#fff',
    },

    closeBtn: {
        background: 'none',

        border: 'none',

        color: '#b5bac1',

        cursor: 'pointer',

        fontSize: '16px',

        padding: '4px',
    },

    preview: {
        display: 'flex',

        alignItems: 'center',

        gap: '12px',

        margin: '16px 20px',

        padding: '14px 16px',

        backgroundColor: '#111214',

        borderRadius: '8px',

        borderLeft: '4px solid #5865F2',
    },

    previewEmoji: {
        fontSize: '28px',
    },

    previewText: {
        display: 'flex',

        flexDirection: 'column',

        gap: '2px',
    },

    previewContent: {
        color: '#dbdee1',

        fontSize: '14px',
    },

    section: {
        padding: '0 20px',

        marginBottom: '16px',

        position: 'relative',
    },

    label: {
        display: 'block',

        color: '#b5bac1',

        fontSize: '12px',

        fontWeight: 700,

        textTransform: 'uppercase',

        marginBottom: '8px',
    },

    typeGrid: {
        display: 'grid',

        gridTemplateColumns: 'repeat(4, 1fr)',

        gap: '6px',
    },

    typeBtn: {
        display: 'flex',

        flexDirection: 'column',

        alignItems: 'center',

        gap: '4px',

        padding: '10px 8px',

        backgroundColor: '#111214',

        border: '2px solid transparent',

        borderRadius: '8px',

        color: '#b5bac1',

        cursor: 'pointer',

        transition: 'all 0.15s',

        fontSize: '16px',
    },

    emojiInput: {
        width: '60px',

        padding: '8px 12px',

        backgroundColor: '#0d0e10',

        border: '1px solid #182135',

        borderRadius: '6px',

        color: '#fff',

        fontSize: '24px',

        textAlign: 'center',

        outline: 'none',
    },

    textInput: {
        width: '100%',

        padding: '10px 14px',

        backgroundColor: '#0d0e10',

        border: '1px solid #182135',

        borderRadius: '6px',

        color: '#dbdee1',

        fontSize: '14px',

        outline: 'none',

        boxSizing: 'border-box',
    },

    charCount: {
        position: 'absolute',

        right: '28px',

        bottom: '-16px',

        fontSize: '11px',

        color: '#949ba4',
    },

    expiryRow: {
        display: 'flex',

        gap: '6px',

        flexWrap: 'wrap',
    },

    expiryBtn: {
        padding: '6px 12px',

        backgroundColor: '#111214',

        border: '1px solid #182135',

        borderRadius: '6px',

        color: '#b5bac1',

        cursor: 'pointer',

        fontSize: '12px',

        transition: 'all 0.15s',
    },

    expiryBtnActive: {
        backgroundColor: '#5865F2',

        borderColor: '#5865F2',

        color: '#fff',
    },

    actions: {
        display: 'flex',

        alignItems: 'center',

        gap: '8px',

        padding: '16px 20px',

        borderTop: '1px solid #0e1222',

        backgroundColor: '#111214',
    },

    clearBtn: {
        padding: '8px 16px',

        backgroundColor: 'transparent',

        border: '1px solid #f23f42',

        borderRadius: '6px',

        color: '#f23f42',

        cursor: 'pointer',

        fontSize: '13px',

        fontWeight: 500,
    },

    cancelBtn: {
        padding: '8px 16px',

        backgroundColor: 'transparent',

        border: 'none',

        color: '#b5bac1',

        cursor: 'pointer',

        fontSize: '13px',

        fontWeight: 500,
    },

    saveBtn: {
        padding: '8px 20px',

        backgroundColor: '#5865F2',

        border: 'none',

        borderRadius: '6px',

        color: '#fff',

        cursor: 'pointer',

        fontSize: '13px',

        fontWeight: 600,

        transition: 'background 0.15s',
    },
};

CustomStatusModal.propTypes = {
    isOpen: PropTypes.bool,

    onClose: PropTypes.func,

    onStatusChange: PropTypes.func,
};

export default React.memo(CustomStatusModal);

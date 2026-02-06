// frontend/src/components/CustomStatusModal.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaGamepad, FaHeadphones, FaEye, FaTwitch, FaTrophy, FaPen } from 'react-icons/fa';
import { API_BASE_URL } from '../utils/constants';

const STATUS_TYPES = [
    { key: 'custom', label: 'Özel', icon: '✨', color: '#5865F2', placeholder: 'Özel durumunu yaz...' },
    { key: 'gaming', label: 'Oynuyor', icon: '🎮', color: '#57F287', placeholder: 'Hangi oyunu oynuyorsun?' },
    { key: 'happy', label: 'Dinliyor', icon: '🎧', color: '#1DB954', placeholder: 'Ne dinliyorsun?' },
    { key: 'focused', label: 'İzliyor', icon: '👀', color: '#E91E63', placeholder: 'Ne izliyorsun?' },
    { key: 'creative', label: 'Yayında', icon: '📡', color: '#9146FF', placeholder: 'Yayın başlığı...' },
    { key: 'excited', label: 'Yarışıyor', icon: '🏆', color: '#FAA61A', placeholder: 'Hangi yarışma?' },
    { key: 'working', label: 'Çalışıyor', icon: '💼', color: '#747F8D', placeholder: 'Ne üzerinde çalışıyorsun?' },
    { key: 'studying', label: 'Okuyor', icon: '📚', color: '#5865F2', placeholder: 'Ne okuyorsun?' },
];

const EXPIRY_OPTIONS = [
    { label: 'Temizleme', value: null },
    { label: '30 dakika', value: 30 },
    { label: '1 saat', value: 60 },
    { label: '4 saat', value: 240 },
    { label: 'Bugün', value: 'today' },
];

const CustomStatusModal = ({ isOpen, onClose, onStatusChange }) => {
    const [statusType, setStatusType] = useState('custom');
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
                const token = localStorage.getItem('access_token');
                const res = await fetch(`${API_BASE_URL}/api/status/custom/`, {
                    headers: { 'Authorization': `Bearer ${token}` }
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
            } catch { /* ignore */ }
        };
        fetchStatus();
    }, [isOpen]);

    const handleSave = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            let expMin = expiresIn;
            if (expiresIn === 'today') {
                const now = new Date();
                const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
                expMin = Math.floor((endOfDay - now) / 60000);
            }

            const res = await fetch(`${API_BASE_URL}/api/status/custom/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
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
        } catch { /* ignore */ } finally {
            setLoading(false);
        }
    };

    const handleClear = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            await fetch(`${API_BASE_URL}/api/status/custom/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setCurrentStatus(null);
            setStatusType('custom');
            setEmoji('✨');
            setText('');
            onStatusChange?.(null);
            onClose();
        } catch { /* ignore */ } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const selectedType = STATUS_TYPES.find(t => t.key === statusType) || STATUS_TYPES[0];

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <h3 style={styles.title}>Durumunu Ayarla</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                {/* Preview */}
                <div style={{ ...styles.preview, borderColor: selectedType.color }}>
                    <span style={styles.previewEmoji}>{emoji}</span>
                    <div style={styles.previewText}>
                        <span style={{ color: selectedType.color, fontWeight: 600, fontSize: 12 }}>
                            {selectedType.label}
                        </span>
                        <span style={styles.previewContent}>
                            {text || selectedType.placeholder}
                        </span>
                    </div>
                </div>

                {/* Status Type Selector */}
                <div style={styles.section}>
                    <label style={styles.label}>Durum Tipi</label>
                    <div style={styles.typeGrid}>
                        {STATUS_TYPES.map(type => (
                            <button
                                key={type.key}
                                onClick={() => {
                                    setStatusType(type.key);
                                    setEmoji(type.icon);
                                }}
                                style={{
                                    ...styles.typeBtn,
                                    ...(statusType === type.key ? {
                                        backgroundColor: `${type.color}20`,
                                        borderColor: type.color,
                                        color: type.color,
                                    } : {})
                                }}
                            >
                                <span>{type.icon}</span>
                                <span style={{ fontSize: 11 }}>{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Custom Emoji */}
                <div style={styles.section}>
                    <label style={styles.label}>Emoji</label>
                    <input
                        type="text"
                        value={emoji}
                        onChange={e => setEmoji(e.target.value.slice(-2))}
                        style={styles.emojiInput}
                        maxLength={4}
                    />
                </div>

                {/* Status Text */}
                <div style={styles.section}>
                    <label style={styles.label}>Durum Metni</label>
                    <input
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder={selectedType.placeholder}
                        style={styles.textInput}
                        maxLength={100}
                    />
                    <span style={styles.charCount}>{text.length}/100</span>
                </div>

                {/* Expiry */}
                <div style={styles.section}>
                    <label style={styles.label}>Otomatik Temizle</label>
                    <div style={styles.expiryRow}>
                        {EXPIRY_OPTIONS.map(opt => (
                            <button
                                key={opt.label}
                                onClick={() => setExpiresIn(opt.value)}
                                style={{
                                    ...styles.expiryBtn,
                                    ...(expiresIn === opt.value ? styles.expiryBtnActive : {})
                                }}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div style={styles.actions}>
                    {currentStatus && (
                        <button onClick={handleClear} style={styles.clearBtn} disabled={loading}>
                            Durumu Temizle
                        </button>
                    )}
                    <div style={{ flex: 1 }} />
                    <button onClick={onClose} style={styles.cancelBtn}>İptal</button>
                    <button onClick={handleSave} style={styles.saveBtn} disabled={loading || !text.trim()}>
                        {loading ? '...' : 'Kaydet'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1100,
    },
    modal: {
        width: '440px',
        maxWidth: '90vw',
        backgroundColor: '#36393f',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #2f3136',
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
        color: '#b9bbbe',
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
        backgroundColor: '#2f3136',
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
        color: '#dcddde',
        fontSize: '14px',
    },
    section: {
        padding: '0 20px',
        marginBottom: '16px',
        position: 'relative',
    },
    label: {
        display: 'block',
        color: '#b9bbbe',
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
        backgroundColor: '#2f3136',
        border: '2px solid transparent',
        borderRadius: '8px',
        color: '#b9bbbe',
        cursor: 'pointer',
        transition: 'all 0.15s',
        fontSize: '16px',
    },
    emojiInput: {
        width: '60px',
        padding: '8px 12px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '24px',
        textAlign: 'center',
        outline: 'none',
    },
    textInput: {
        width: '100%',
        padding: '10px 14px',
        backgroundColor: '#202225',
        border: '1px solid #40444b',
        borderRadius: '6px',
        color: '#dcddde',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
    },
    charCount: {
        position: 'absolute',
        right: '28px',
        bottom: '-16px',
        fontSize: '11px',
        color: '#72767d',
    },
    expiryRow: {
        display: 'flex',
        gap: '6px',
        flexWrap: 'wrap',
    },
    expiryBtn: {
        padding: '6px 12px',
        backgroundColor: '#2f3136',
        border: '1px solid #40444b',
        borderRadius: '6px',
        color: '#b9bbbe',
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
        borderTop: '1px solid #2f3136',
        backgroundColor: '#2f3136',
    },
    clearBtn: {
        padding: '8px 16px',
        backgroundColor: 'transparent',
        border: '1px solid #ed4245',
        borderRadius: '6px',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 500,
    },
    cancelBtn: {
        padding: '8px 16px',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
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

export default React.memo(CustomStatusModal);

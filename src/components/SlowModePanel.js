// frontend/src/components/SlowModePanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaClock, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * ⏱️ Slow Mode Panel
 * Kanal mesaj hızını sınırlama
 */

const SlowModePanel = ({ fetchWithAuth, apiBaseUrl, roomSlug, onClose }) => {
    const [slowMode, setSlowMode] = useState({
        enabled: false,
        interval_seconds: 5
    });
    const [loading, setLoading] = useState(true);

    const presetIntervals = [
        { label: '5 saniye', value: 5 },
        { label: '10 saniye', value: 10 },
        { label: '15 saniye', value: 15 },
        { label: '30 saniye', value: 30 },
        { label: '1 dakika', value: 60 },
        { label: '2 dakika', value: 120 },
        { label: '5 dakika', value: 300 },
        { label: '10 dakika', value: 600 },
        { label: '15 dakika', value: 900 }
    ];

    useEffect(() => {
        loadSlowMode();
    }, []);

    const loadSlowMode = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/slowmode/`);
            if (response.ok) {
                const data = await response.json();
                if (data) setSlowMode(data);
            }
        } catch (error) {
            console.error('Slow mode yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const saveSlowMode = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/slowmode/set/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room_slug: roomSlug,
                    ...slowMode
                })
            });

            if (response.ok) {
                toast.success('Slow mode ayarları kaydedildi');
                onClose();
            } else {
                toast.error('Ayarlar kaydedilemedi');
            }
        } catch (error) {
            console.error('Slow mode kaydetme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaClock style={{ color: '#faa61a' }} />
                        <h2 style={{ margin: 0 }}>Slow Mode</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    <div style={styles.toggle}>
                        <div style={styles.toggleInfo}>
                            <strong>Slow Mode'u Etkinleştir</strong>
                            <p style={styles.desc}>
                                Kullanıcılar mesaj gönderdikten sonra belirli bir süre beklemek zorunda kalır
                            </p>
                        </div>
                        <button
                            onClick={() => setSlowMode({ ...slowMode, enabled: !slowMode.enabled })}
                            style={styles.toggleBtn}
                        >
                            {slowMode.enabled ?
                                <FaToggleOn style={{ color: '#43b581', fontSize: '32px' }} /> :
                                <FaToggleOff style={{ color: '#888', fontSize: '32px' }} />
                            }
                        </button>
                    </div>

                    {slowMode.enabled && (
                        <>
                            <div style={styles.field}>
                                <label style={styles.label}>Mesajlar Arası Bekleme Süresi</label>
                                <div style={styles.presetGrid}>
                                    {presetIntervals.map((preset) => (
                                        <button
                                            key={preset.value}
                                            onClick={() => setSlowMode({ ...slowMode, interval_seconds: preset.value })}
                                            style={{
                                                ...styles.presetBtn,
                                                backgroundColor: slowMode.interval_seconds === preset.value ? '#5865f2' : '#2c2f33'
                                            }}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={styles.field}>
                                <label style={styles.label}>Özel Süre (saniye)</label>
                                <input
                                    type="number"
                                    value={slowMode.interval_seconds}
                                    onChange={(e) => setSlowMode({ ...slowMode, interval_seconds: parseInt(e.target.value) || 0 })}
                                    min="1"
                                    max="21600"
                                    style={styles.input}
                                />
                            </div>

                            <div style={styles.info}>
                                ⏱️ Kullanıcılar her <strong>{slowMode.interval_seconds} saniye</strong>'de bir mesaj gönderebilecek
                            </div>
                        </>
                    )}
                </div>

                <div style={styles.footer}>
                    <button onClick={onClose} style={styles.cancelBtn}>
                        İptal
                    </button>
                    <button onClick={saveSlowMode} style={styles.saveBtn}>
                        Kaydet
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
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    toggle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        marginBottom: '20px'
    },
    toggleInfo: {
        flex: 1
    },
    desc: {
        fontSize: '13px',
        color: '#888',
        margin: '6px 0 0 0'
    },
    toggleBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '0'
    },
    field: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '12px',
        color: '#dcddde',
        fontSize: '14px',
        fontWeight: '600'
    },
    presetGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '15px'
    },
    presetBtn: {
        padding: '12px',
        border: 'none',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '13px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'background-color 0.2s'
    },
    input: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    info: {
        backgroundColor: '#5865f21a',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        padding: '15px',
        color: '#5865f2',
        fontSize: '14px',
        textAlign: 'center'
    },
    footer: {
        display: 'flex',
        gap: '10px',
        padding: '20px',
        borderTop: '1px solid #333'
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#2c2f33',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600'
    },
    saveBtn: {
        flex: 1,
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600'
    }
};

export default SlowModePanel;

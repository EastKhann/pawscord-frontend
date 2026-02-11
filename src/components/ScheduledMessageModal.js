// frontend/src/components/ScheduledMessageModal.js
import { useState } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaClock } from 'react-icons/fa';

const ScheduledMessageModal = ({ room, conversation, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [message, setMessage] = useState('');
    const [scheduledTime, setScheduledTime] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSchedule = async () => {
        if (!message.trim()) {
            toast.error('❌ Mesaj boş olamaz');
            return;
        }

        if (!scheduledTime) {
            toast.error('❌ Lütfen bir tarih seçin');
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/scheduled/create/`, {
                method: 'POST',
                body: JSON.stringify({
                    content: message,
                    scheduled_time: scheduledTime,
                    room_slug: room,
                    conversation_id: conversation
                })
            });

            if (res.ok) {
                toast.success('✅ Mesaj plandı!');
                onClose();
            } else {
                const data = await res.json();
                toast.error('❌ Hata: ' + (data.error || 'Bilinmeyen hata'));
            }
        } catch (error) {
            console.error('Schedule error:', error);
            toast.error('❌ Mesaj planlanamadı');
        } finally {
            setLoading(false);
        }
    };

    const getPresetTime = (minutes) => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        return now.toISOString().slice(0, 16);
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        <FaClock /> Mesaj Planla
                    </h3>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <div style={styles.presets}>
                        <button onClick={() => setScheduledTime(getPresetTime(5))} style={styles.presetButton}>
                            5 dk sonra
                        </button>
                        <button onClick={() => setScheduledTime(getPresetTime(30))} style={styles.presetButton}>
                            30 dk sonra
                        </button>
                        <button onClick={() => setScheduledTime(getPresetTime(60))} style={styles.presetButton}>
                            1 saat sonra
                        </button>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Gönderilme Zamanı</label>
                        <input
                            type="datetime-local"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Mesaj</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Planlanacak mesajı yazın..."
                            style={{ ...styles.input, minHeight: '100px', resize: 'vertical' }}
                        />
                    </div>

                    <button
                        onClick={handleSchedule}
                        disabled={loading || !message.trim() || !scheduledTime}
                        style={{
                            ...styles.scheduleButton,
                            opacity: loading || !message.trim() || !scheduledTime ? 0.5 : 1,
                            cursor: loading || !message.trim() || !scheduledTime ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Planlanıyor...' : '⏰ Mesajı Planla'}
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #40444b'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.3em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.3em',
        padding: '5px'
    },
    content: {
        padding: '20px'
    },
    presets: {
        display: 'flex',
        gap: '8px',
        marginBottom: '15px'
    },
    presetButton: {
        flex: 1,
        padding: '8px',
        backgroundColor: '#40444b',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        fontSize: '0.85em'
    },
    inputGroup: {
        marginBottom: '15px'
    },
    label: {
        display: 'block',
        color: '#b9bbbe',
        fontSize: '0.85em',
        marginBottom: '5px',
        fontWeight: 'bold'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#40444b',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
        fontSize: '1em'
    },
    scheduleButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1em'
    }
};

export default ScheduledMessageModal;



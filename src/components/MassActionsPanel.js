// frontend/src/components/MassActionsPanel.js
import { useState } from 'react';
import { FaTimes, FaUsers, FaBan, FaVolumeUp, FaTrash } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * ⚡ Mass Actions Panel
 * Toplu moderasyon işlemleri
 */

const MassActionsPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
    const [actionType, setActionType] = useState('ban');
    const [userIds, setUserIds] = useState('');
    const [reason, setReason] = useState('');
    const [duration, setDuration] = useState('');
    const [processing, setProcessing] = useState(false);

    const executeAction = async () => {
        if (!userIds.trim()) {
            toast.error('Kullanıcı ID\'leri girin');
            return;
        }

        const ids = userIds.split('\n').map(id => id.trim()).filter(id => id);

        if (ids.length === 0) {
            toast.error('Geçerli kullanıcı ID\'si bulunamadı');
            return;
        }

        try {
            setProcessing(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/moderation/mass_action/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    action_type: actionType,
                    user_ids: ids,
                    reason,
                    duration: duration || null
                })
            });

            if (response.ok) {
                toast.success(`${ids.length} kullanıcıya ${actionType} işlemi uygulandı`);
                setUserIds('');
                setReason('');
                setDuration('');
            } else {
                toast.error('İşlem başarısız oldu');
            }
        } catch (error) {
            console.error('Mass action hatası:', error);
            toast.error('Bir hata oluştu');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaUsers style={{ color: '#f23f42' }} />
                        <h2 style={{ margin: 0 }}>Toplu Moderasyon</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    <div style={styles.field}>
                        <label style={styles.label}>İşlem Türü</label>
                        <select
                            value={actionType}
                            onChange={(e) => setActionType(e.target.value)}
                            style={styles.select}
                        >
                            <option value="ban">🔨 Ban (Yasakla)</option>
                            <option value="kick">👢 Kick (At)</option>
                            <option value="mute">🔇 Mute (Sustur)</option>
                            <option value="timeout">⏰ Timeout (Zaman Aşımı)</option>
                            <option value="warn">⚠️ Warn (Uyar)</option>
                            <option value="delete_messages">🗑️ Delete Messages (Mesajları Sil)</option>
                        </select>
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>
                            Kullanıcı ID'leri (Her satırda bir tane)
                        </label>
                        <textarea
                            value={userIds}
                            onChange={(e) => setUserIds(e.target.value)}
                            placeholder="123456789&#10;987654321&#10;555555555"
                            style={styles.textarea}
                            rows={8}
                        />
                    </div>

                    {(actionType === 'mute' || actionType === 'timeout') && (
                        <div style={styles.field}>
                            <label style={styles.label}>Süre (dakika)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="60"
                                style={styles.input}
                            />
                        </div>
                    )}

                    <div style={styles.field}>
                        <label style={styles.label}>Sebep (opsiyonel)</label>
                        <input
                            type="text"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Spam, kural ihlali, vb."
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.warning}>
                        ⚠️ Bu işlem <strong>{userIds.split('\n').filter(id => id.trim()).length}</strong> kullanıcıyı etkileyecek!
                    </div>
                </div>

                <div style={styles.footer}>
                    <button onClick={onClose} style={styles.cancelBtn}>
                        İptal
                    </button>
                    <button
                        onClick={executeAction}
                        disabled={processing}
                        style={styles.executeBtn}
                    >
                        {processing ? 'İşleniyor...' : 'Uygula'}
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
    field: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        color: '#dbdee1',
        fontSize: '14px',
        fontWeight: '600'
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        fontFamily: 'monospace',
        resize: 'vertical'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px'
    },
    warning: {
        backgroundColor: '#f0b2321a',
        border: '1px solid #f0b232',
        borderRadius: '4px',
        padding: '15px',
        color: '#f0b232',
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
        backgroundColor: '#111214',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600'
    },
    executeBtn: {
        flex: 1,
        backgroundColor: '#f23f42',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600'
    }
};

export default MassActionsPanel;

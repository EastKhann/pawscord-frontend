// frontend/src/components/StickyMessagesPanel.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaThumbtack, FaPlus, FaTrash } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 📌 Sticky Messages Panel
 * Sabitlenen mesajlar (her zaman üstte)
 */

const StickyMessagesPanel = ({ fetchWithAuth, apiBaseUrl, roomSlug, onClose }) => {
    const [stickies, setStickies] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStickies();
    }, []);

    const loadStickies = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/stickies/list/?room_slug=${roomSlug}`);
            if (response.ok) {
                const data = await response.json();
                setStickies(data);
            }
        } catch (error) {
            console.error('Sticky yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const createSticky = async () => {
        if (!newMessage.trim()) {
            toast.error('Mesaj girin');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/stickies/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room_slug: roomSlug,
                    message: newMessage
                })
            });

            if (response.ok) {
                toast.success('Sticky mesaj oluşturuldu');
                setNewMessage('');
                loadStickies();
            } else {
                toast.error('Sticky oluşturulamadı');
            }
        } catch (error) {
            console.error('Sticky oluşturma hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const deleteSticky = async (stickyId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/stickies/${stickyId}/delete/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                toast.success('Sticky mesaj silindi');
                loadStickies();
            } else {
                toast.error('Sticky silinemedi');
            }
        } catch (error) {
            console.error('Sticky silme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaThumbtack style={{ color: '#faa61a' }} />
                        <h2 style={{ margin: 0 }}>Sticky Mesajlar</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.createSection}>
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Bu mesaj kanalın en üstünde sabitlenecek..."
                        style={styles.textarea}
                        rows={3}
                    />
                    <button onClick={createSticky} style={styles.createBtn}>
                        <FaPlus /> Sticky Oluştur
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : stickies.length === 0 ? (
                        <div style={styles.empty}>
                            <FaThumbtack style={{ fontSize: '48px', color: '#555', marginBottom: '10px' }} />
                            <p>Henüz sticky mesaj yok</p>
                            <p style={{ fontSize: '12px', color: '#888' }}>
                                Sticky mesajlar kanalın en üstünde sabitlenir
                            </p>
                        </div>
                    ) : (
                        stickies.map((sticky) => (
                            <div key={sticky.id} style={styles.stickyCard}>
                                <div style={styles.stickyIcon}>
                                    <FaThumbtack style={{ color: '#faa61a' }} />
                                </div>
                                <div style={styles.stickyContent}>
                                    <div style={styles.stickyMessage}>{sticky.message}</div>
                                    <div style={styles.stickyMeta}>
                                        Oluşturan: {sticky.created_by} • {new Date(sticky.created_at).toLocaleString('tr-TR')}
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteSticky(sticky.id)}
                                    style={styles.deleteBtn}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))
                    )}
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
        maxWidth: '700px',
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
    createSection: {
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    textarea: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        resize: 'vertical',
        marginBottom: '10px'
    },
    createBtn: {
        width: '100%',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    stickyCard: {
        display: 'flex',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#faa61a1a',
        border: '1px solid #faa61a',
        borderRadius: '8px',
        marginBottom: '10px'
    },
    stickyIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#faa61a33',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        flexShrink: 0
    },
    stickyContent: {
        flex: 1
    },
    stickyMessage: {
        color: '#dcddde',
        fontSize: '14px',
        marginBottom: '8px',
        lineHeight: '1.5'
    },
    stickyMeta: {
        fontSize: '12px',
        color: '#888'
    },
    deleteBtn: {
        backgroundColor: '#f04747',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        alignSelf: 'flex-start'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#888'
    }
};

export default StickyMessagesPanel;

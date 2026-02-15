// frontend/src/components/ArchivedRoomsPanel.js
import { useState, useEffect } from 'react';
import { FaTimes, FaArchive, FaUndo, FaTrash, FaClock } from 'react-icons/fa';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';

/**
 * 📦 Archived Rooms Panel
 * Arşivlenmiş kanalları görüntüleme ve geri yükleme
 */

const ArchivedRoomsPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
    const [archivedRooms, setArchivedRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArchivedRooms();
    }, []);

    const loadArchivedRooms = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/archived/list/?server_id=${serverId}`);
            if (response.ok) {
                const data = await response.json();
                setArchivedRooms(data);
            }
        } catch (error) {
            console.error('Arşiv yükleme hatası:', error);
        } finally {
            setLoading(false);
        }
    };

    const unarchiveRoom = async (roomSlug) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/unarchive/`, {
                method: 'POST'
            });

            if (response.ok) {
                toast.success('Kanal geri yüklendi');
                loadArchivedRooms();
            } else {
                toast.error('Kanal geri yüklenemedi');
            }
        } catch (error) {
            console.error('Unarchive hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const permanentlyDelete = async (roomSlug) => {
        if (!await confirmDialog('Bu kanalı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!')) {
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/delete/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                toast.success('Kanal kalıcı olarak silindi');
                loadArchivedRooms();
            } else {
                toast.error('Kanal silinemedi');
            }
        } catch (error) {
            console.error('Delete hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaArchive style={{ color: '#888' }} />
                        <h2 style={{ margin: 0 }}>Arşivlenmiş Kanallar</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : archivedRooms.length === 0 ? (
                        <div style={styles.empty}>
                            <FaArchive style={{ fontSize: '48px', color: '#555', marginBottom: '10px' }} />
                            <p>Arşivlenmiş kanal yok</p>
                            <p style={{ fontSize: '12px', color: '#888' }}>
                                Arşivlenen kanallar burada görünür
                            </p>
                        </div>
                    ) : (
                        archivedRooms.map((room) => (
                            <div key={room.id} style={styles.roomCard}>
                                <div style={styles.roomIcon}>
                                    <FaArchive style={{ color: '#888' }} />
                                </div>
                                <div style={styles.roomContent}>
                                    <div style={styles.roomName}>{room.name}</div>
                                    <div style={styles.roomMeta}>
                                        <FaClock style={{ fontSize: '12px' }} />
                                        <span>Arşivlendi: {new Date(room.archived_at).toLocaleDateString('tr-TR')}</span>
                                    </div>
                                    {room.archived_reason && (
                                        <div style={styles.roomReason}>
                                            Sebep: {room.archived_reason}
                                        </div>
                                    )}
                                </div>
                                <div style={styles.roomActions}>
                                    <button
                                        onClick={() => unarchiveRoom(room.slug)}
                                        style={styles.unarchiveBtn}
                                        title="Geri yükle"
                                    >
                                        <FaUndo /> Geri Yükle
                                    </button>
                                    <button
                                        onClick={() => permanentlyDelete(room.slug)}
                                        style={styles.deleteBtn}
                                        title="Kalıcı olarak sil"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
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
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    roomCard: {
        display: 'flex',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        marginBottom: '10px'
    },
    roomIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#1e1e1e',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        flexShrink: 0
    },
    roomContent: {
        flex: 1
    },
    roomName: {
        fontWeight: '600',
        fontSize: '16px',
        marginBottom: '6px',
        color: '#dcddde'
    },
    roomMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: '#888',
        marginBottom: '4px'
    },
    roomReason: {
        fontSize: '13px',
        color: '#888',
        fontStyle: 'italic'
    },
    roomActions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    unarchiveBtn: {
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        whiteSpace: 'nowrap'
    },
    deleteBtn: {
        backgroundColor: '#f04747',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px'
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

export default ArchivedRoomsPanel;

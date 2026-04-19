// frontend/src/components/ArchivedRoomsPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaArchive, FaUndo, FaTrash, FaClock } from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
/**
 * 📦 Archived Rooms Panel
 * Arşivlenmiş kanalları görüntüleme ve back load
 */

const ArchivedRoomsPanel = ({ fetchWithAuth, apiBaseUrl, serverId, onClose }) => {
    const { t } = useTranslation();
    const [archivedRooms, setArchivedRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadArchivedRooms();
    }, []);

    const loadArchivedRooms = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(
                `${apiBaseUrl}/rooms/archived/list/?server_id=${serverId}`
            );
            if (response.ok) {
                const data = await response.json();
                setArchivedRooms(data);
            }
        } catch (error) {
            logger.error(t('ui.arsiv_load_hatasi'), error);
        } finally {
            setLoading(false);
        }
    };

    const unarchiveRoom = async (roomSlug) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/unarchive/`, {
                method: 'POST',
            });

            if (response.ok) {
                toast.success(t('ui.channel_back_yuklendi'));
                loadArchivedRooms();
            } else {
                toast.error(t('archive.loadFailed'));
            }
        } catch (error) {
            logger.error(t('ui.unarchive_hatasi'), error);
            toast.error(t('common.errorOccurred'));
        }
    };

    const permanentlyDelete = async (roomSlug) => {
        if (
            !(await confirmDialog(
                'Bu kanalı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!'
            ))
        ) {
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/delete/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success(t('ui.channel_kalici_olarak_deleted'));
                loadArchivedRooms();
            } else {
                toast.error(t('archive.deleteFailed'));
            }
        } catch (error) {
            logger.error('Delete error:', error);
            toast.error(t('common.errorOccurred'));
        }
    };

    return (
        <div
            style={styles.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div
                style={styles.modal}
                role="button"
                tabIndex={0}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
            >
                <div style={styles.header}>
                    <div className="flex-align-10">
                        <FaArchive className="icon-gray" />
                        <h2 className="m-0">Arşivlenmiş Kanallar</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : archivedRooms.length === 0 ? (
                        <div style={styles.empty}>
                            <FaArchive className="icon-lg-mb10" />
                            <p>Arşivlenmiş kanal yok</p>
                            <p className="text-gray-12">Arşivlenen kanallar burada görünür</p>
                        </div>
                    ) : (
                        archivedRooms.map((room) => (
                            <div key={room.id} style={styles.roomCard}>
                                <div style={styles.roomIcon}>
                                    <FaArchive className="icon-gray" />
                                </div>
                                <div style={styles.roomContent}>
                                    <div style={styles.roomName}>{room.name}</div>
                                    <div style={styles.roomMeta}>
                                        <FaClock className="fs-12" />
                                        <span>
                                            Arşivlendi:{' '}
                                            {new Date(room.archived_at).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                    {room.archived_reason && (
                                        <div style={styles.roomReason}>
                                            Reason: {room.archived_reason}
                                        </div>
                                    )}
                                </div>
                                <div style={styles.roomActions}>
                                    <button
                                        aria-label="Action button"
                                        onClick={() => unarchiveRoom(room.slug)}
                                        style={styles.unarchiveBtn}
                                        title="Geri yükle"
                                    >
                                        <FaUndo /> Geri Upload
                                    </button>
                                    <button
                                        aria-label="Action button"
                                        onClick={() => permanentlyDelete(room.slug)}
                                        style={styles.deleteBtn}
                                        title={t('ui.kalici_olarak_delete_2')}
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
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    closeBtn: {
        cursor: 'pointer',
        fontSize: '24px',
        color: '#888',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    roomCard: {
        display: 'flex',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        marginBottom: '10px',
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
        flexShrink: 0,
    },
    roomContent: {
        flex: 1,
    },
    roomName: {
        fontWeight: '600',
        fontSize: '16px',
        marginBottom: '6px',
        color: '#dbdee1',
    },
    roomMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '12px',
        color: '#888',
        marginBottom: '4px',
    },
    roomReason: {
        fontSize: '13px',
        color: '#888',
        fontStyle: 'italic',
    },
    roomActions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    unarchiveBtn: {
        backgroundColor: '#23a559',
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
        whiteSpace: 'nowrap',
    },
    deleteBtn: {
        backgroundColor: '#f23f42',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#888',
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#888',
    },
};

ArchivedRoomsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    serverId: PropTypes.string,
    onClose: PropTypes.func,
};
export default ArchivedRoomsPanel;

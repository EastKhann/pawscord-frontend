// frontend/src/components/StickyMessagesPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaThumbtack, FaPlus, FaTrash } from 'react-icons/fa';
import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
/**
 * 📌 Sticky Messages Panel
 * Pinnen messagelar (her zaman üstte)
 */

const StickyMessagesPanel = ({ fetchWithAuth, apiBaseUrl, roomSlug, onClose }) => {
    const { t } = useTranslation();
    const [stickies, setStickies] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStickies();
    }, []);

    const loadStickies = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(
                `${apiBaseUrl}/stickies/list/?room_slug=${roomSlug}`
            );
            if (response.ok) {
                const data = await response.json();
                setStickies(data);
            }
        } catch (error) {
            logger.error(t('ui.sticky_load_hatasi'), error);
        } finally {
            setLoading(false);
        }
    };

    const createSticky = async () => {
        if (!newMessage.trim()) {
            toast.error(t('stickyMessages.messageRequired'));
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/stickies/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    room_slug: roomSlug,
                    message: newMessage,
                }),
            });

            if (response.ok) {
                toast.success(t('stickyMessages.created'));
                setNewMessage('');
                loadStickies();
            } else {
                toast.error(t('ui.sticky_olusturulamadi'));
            }
        } catch (error) {
            logger.error(t('ui.sticky_olusturma_hatasi'), error);
            toast.error(t('common.error'));
        }
    };

    const deleteSticky = async (stickyId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/stickies/${stickyId}/delete/`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success(t('stickyMessages.deleted'));
                loadStickies();
            } else {
                toast.error(t('stickyMessages.deleteFailed'));
            }
        } catch (error) {
            logger.error(t('ui.sticky_silme_hatasi'), error);
            toast.error(t('common.error'));
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
                        <FaThumbtack className="icon-warning" />
                        <h2 className="m-0">Sabitlenmiş Mesajlar</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.createSection}>
                    <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={t('ui.bu_message_kanalin_en_ustunde_sabitlenec')}
                        style={styles.textarea}
                        rows={3}
                    />
                    <button
                        aria-label="create Sticky"
                        onClick={createSticky}
                        style={styles.createBtn}
                    >
                        <FaPlus /> Sabitle
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : stickies.length === 0 ? (
                        <div style={styles.empty}>
                            <FaThumbtack className="icon-lg-mb10" />
                            <p>Henüz sabitlenmiş mesaj yok</p>
                            <p className="text-gray-12">
                                Sticky mesajlar kanalın en üstüne sabitlenir
                            </p>
                        </div>
                    ) : (
                        stickies.map((sticky) => (
                            <div key={sticky.id} style={styles.stickyCard}>
                                <div style={styles.stickyIcon}>
                                    <FaThumbtack className="icon-warning" />
                                </div>
                                <div style={styles.stickyContent}>
                                    <div style={styles.stickyMessage}>{sticky.message}</div>
                                    <div style={styles.stickyMeta}>
                                        Created by: {sticky.created_by} •{' '}
                                        {new Date(sticky.created_at).toLocaleString('tr-TR')}
                                    </div>
                                </div>
                                <button
                                    aria-label="Action button"
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
    createSection: {
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    textarea: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        resize: 'vertical',
        marginBottom: '10px',
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
        gap: '8px',
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    stickyCard: {
        display: 'flex',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#f0b2321a',
        border: '1px solid #f0b232',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    stickyIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#f0b23233',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        flexShrink: 0,
    },
    stickyContent: {
        flex: 1,
    },
    stickyMessage: {
        color: '#dbdee1',
        fontSize: '14px',
        marginBottom: '8px',
        lineHeight: '1.5',
    },
    stickyMeta: {
        fontSize: '12px',
        color: '#888',
    },
    deleteBtn: {
        backgroundColor: '#f23f42',
        color: '#fff',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        alignSelf: 'flex-start',
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

StickyMessagesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    roomSlug: PropTypes.string,
    onClose: PropTypes.func,
};
export default StickyMessagesPanel;

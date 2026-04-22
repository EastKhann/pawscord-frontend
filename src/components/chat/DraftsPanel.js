import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaEdit, FaTrash, FaClock } from 'react-icons/fa';
import { toast } from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';

const S = {
    mar: { marginRight: '6px', fontSize: '11px' },
};

const DraftsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const { t } = useTranslation();
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDrafts();
    }, []);

    const fetchDrafts = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/drafts/?room_slug=${roomSlug}`);
            const data = await response.json();
            setDrafts(data.drafts || []);
        } catch (error) {
            toast.error(t('drafts.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const loadDraft = (draft) => {
        // Emit event to load draft into message input
        window.dispatchEvent(new CustomEvent('loadDraft', { detail: draft }));
        toast.success(t('drafts.loadedIntoMessageBox', 'Taslak mesaj kutusuna yüklendi'));
        onClose();
    };

    const deleteDraft = async (draftId) => {
        if (!(await confirmDialog(t('drafts.deleteConfirm')))) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/api/drafts/${draftId}/delete/`, {
                method: 'DELETE',
            });

            toast.success(t('drafts.deleted', 'Taslak silindi'));
            fetchDrafts();
        } catch (error) {
            toast.error(t('drafts.deleteFailed'));
        }
    };

    const deleteAllDrafts = async () => {
        if (!(await confirmDialog(t('drafts.deleteAllConfirm', { count: drafts.length })))) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/api/drafts/delete-all/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ room_slug: roomSlug }),
            });

            toast.success(t('drafts.allDeleted', 'Tüm taslaklar silindi'));
            fetchDrafts();
        } catch (error) {
            toast.error(t('drafts.allDeleteFailed'));
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaEdit className="icon-primary-mr10" />
                        <h2 style={styles.title}>{t('drafts.title', 'Mesaj Taslakları')}</h2>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {drafts.length > 0 && (
                    <div style={styles.toolbar}>
                        <div style={styles.draftCount}>
                            {drafts.length} {drafts.length === 1 ? 'draft' : 'drafts'}
                        </div>
                        <button
                            aria-label={t('drafts.deleteAll', 'Delete all drafts')}
                            onClick={deleteAllDrafts}
                            style={styles.deleteAllButton}
                        >
                            {t('drafts.deleteAll', 'Tümünü Sil')}
                        </button>
                    </div>
                )}

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>
                            {t('drafts.loading', 'Taslaklar yükleniyor...')}
                        </div>
                    ) : drafts.length === 0 ? (
                        <div style={styles.empty}>
                            <FaEdit className="icon-48-111-mb16" />
                            <div>{t('drafts.empty', 'Kaydedilmiş taslak yok')}</div>
                            <div style={styles.emptySubtext}>
                                {t(
                                    'drafts.emptyHint',
                                    t('drafts.hint', 'Start writing a message and it will be automatically saved as a draft')
                                )}
                            </div>
                        </div>
                    ) : (
                        <div style={styles.draftsList}>
                            {drafts.map((draft, idx) => (
                                <div key={`item-${idx}`} style={styles.draftCard}>
                                    <div
                                        style={styles.draftContent}
                                        role="button"
                                        tabIndex={0}
                                        onClick={() => loadDraft(draft)}
                                        onKeyDown={(e) =>
                                            (e.key === 'Enter' || e.key === ' ') &&
                                            e.currentTarget.click()
                                        }
                                    >
                                        <div style={styles.draftText}>
                                            {draft.content.substring(0, 200)}
                                            {draft.content.length > 200 && '...'}
                                        </div>
                                        <div style={styles.draftMeta}>
                                            <FaClock style={S.mar} />
                                            {new Date(draft.updated_at).toLocaleString()}
                                        </div>
                                        {draft.room_name && (
                                            <div style={styles.draftRoom}>#{draft.room_name}</div>
                                        )}
                                    </div>
                                    <button
                                        aria-label={t('drafts.deleteDraft', 'Delete draft')}
                                        style={styles.deleteButton}
                                        title={t('common.deleteDraft', 'Delete draft')}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
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
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #0e1222',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        borderBottom: '1px solid #0e1222',
        backgroundColor: '#111214',
    },
    draftCount: {
        fontSize: '13px',
        color: '#dbdee1',
    },
    deleteAllButton: {
        padding: '6px 12px',
        backgroundColor: '#f23f42',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '500',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    emptySubtext: {
        fontSize: '13px',
        marginTop: '8px',
        maxWidth: '300px',
    },
    draftsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    draftCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
    },
    draftContent: {
        flex: 1,
        cursor: 'pointer',
    },
    draftText: {
        fontSize: '14px',
        color: '#dbdee1',
        lineHeight: '1.5',
        marginBottom: '8px',
        whiteSpace: 'pre-wrap',
    },
    draftMeta: {
        fontSize: '12px',
        color: '#949ba4',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '4px',
    },
    draftRoom: {
        fontSize: '12px',
        color: '#5865f2',
        fontWeight: '500',
    },
    deleteButton: {
        background: 'none',
        border: 'none',
        color: '#f23f42',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '8px',
    },
};

DraftsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    roomSlug: PropTypes.string,
};
export default DraftsPanel;

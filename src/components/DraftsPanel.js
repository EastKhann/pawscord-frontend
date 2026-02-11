import { useState, useEffect } from 'react';
import { FaTimes, FaEdit, FaTrash, FaClock } from 'react-icons/fa';
import { toast } from '../utils/toast';

const DraftsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
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
            toast.error('Failed to load drafts');
        } finally {
            setLoading(false);
        }
    };

    const loadDraft = (draft) => {
        // Emit event to load draft into message input
        window.dispatchEvent(new CustomEvent('loadDraft', { detail: draft }));
        toast.success('Draft loaded into message box');
        onClose();
    };

    const deleteDraft = async (draftId) => {
        if (!confirm('Delete this draft?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/api/drafts/${draftId}/delete/`, {
                method: 'DELETE'
            });

            toast.success('Draft deleted');
            fetchDrafts();
        } catch (error) {
            toast.error('Failed to delete draft');
        }
    };

    const deleteAllDrafts = async () => {
        if (!confirm(`Delete all ${drafts.length} drafts?`)) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/api/drafts/delete-all/`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ room_slug: roomSlug })
            });

            toast.success('All drafts deleted');
            fetchDrafts();
        } catch (error) {
            toast.error('Failed to delete drafts');
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaEdit style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Message Drafts</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {drafts.length > 0 && (
                    <div style={styles.toolbar}>
                        <div style={styles.draftCount}>{drafts.length} {drafts.length === 1 ? 'draft' : 'drafts'}</div>
                        <button onClick={deleteAllDrafts} style={styles.deleteAllButton}>
                            Delete All
                        </button>
                    </div>
                )}

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading drafts...</div>
                    ) : drafts.length === 0 ? (
                        <div style={styles.empty}>
                            <FaEdit style={{ fontSize: '48px', color: '#2c2f33', marginBottom: '16px' }} />
                            <div>No drafts saved</div>
                            <div style={styles.emptySubtext}>
                                Start typing a message and it will be automatically saved as a draft
                            </div>
                        </div>
                    ) : (
                        <div style={styles.draftsList}>
                            {drafts.map((draft, idx) => (
                                <div key={idx} style={styles.draftCard}>
                                    <div style={styles.draftContent} onClick={() => loadDraft(draft)}>
                                        <div style={styles.draftText}>
                                            {draft.content.substring(0, 200)}
                                            {draft.content.length > 200 && '...'}
                                        </div>
                                        <div style={styles.draftMeta}>
                                            <FaClock style={{ marginRight: '6px', fontSize: '11px' }} />
                                            {new Date(draft.updated_at).toLocaleString()}
                                        </div>
                                        {draft.room_name && (
                                            <div style={styles.draftRoom}>
                                                #{draft.room_name}
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => deleteDraft(draft.id)}
                                        style={styles.deleteButton}
                                        title="Delete Draft"
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
        borderBottom: '1px solid #2c2f33',
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
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        borderBottom: '1px solid #2c2f33',
        backgroundColor: '#2c2f33',
    },
    draftCount: {
        fontSize: '13px',
        color: '#dcddde',
    },
    deleteAllButton: {
        padding: '6px 12px',
        backgroundColor: '#f04747',
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
        color: '#99aab5',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
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
        backgroundColor: '#2c2f33',
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
        color: '#dcddde',
        lineHeight: '1.5',
        marginBottom: '8px',
        whiteSpace: 'pre-wrap',
    },
    draftMeta: {
        fontSize: '12px',
        color: '#99aab5',
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
        color: '#f04747',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '8px',
    },
};

export default DraftsPanel;

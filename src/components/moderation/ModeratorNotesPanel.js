// frontend/src/components/ModeratorNotesPanel.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaStickyNote, FaPlus, FaTrash } from 'react-icons/fa';
import toast from '../../utils/toast';

import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
/**
 * 📝 Moderator Notes Panel
 * Users hakkında moderatör notları
 */

const ModeratorNotesPanel = ({ fetchWithAuth, apiBaseUrl, username, onClose }) => {
    const { t } = useTranslation();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        loadNotes();
    }, [username]);

    const loadNotes = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(
                `${apiBaseUrl}/moderation/notes/list/?username=${username}`
            );
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            }
        } catch (error) {
            logger.error(t('ui.not_load_hatasi'), error);
            toast.error(t('moderatorNotes.loadFailed'));
        } finally {
            setLoading(false);
        }
    };

    const addNote = async () => {
        if (!newNote.trim()) {
            toast.error(t('ui.not_icerigi_bos_olamaz'));
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    note: newNote,
                }),
            });

            if (response.ok) {
                toast.success(t('moderatorNotes.added'));
                setNewNote('');
                loadNotes();
            } else {
                toast.error(t('moderatorNotes.addFailed'));
            }
        } catch (error) {
            logger.error(t('ui.not_addme_hatasi'), error);
            toast.error(t('common.error'));
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/moderation/notes/${noteId}/delete/`,
                {
                    method: 'DELETE',
                }
            );

            if (response.ok) {
                toast.success(t('moderatorNotes.deleted'));
                loadNotes();
            }
        } catch (error) {
            logger.error(t('ui.not_silme_hatasi'), error);
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
                        <FaStickyNote className="icon-warning" />
                        <h2 className="m-0">{t('modNotes.title', 'Moderator Notes')} - {username}</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.addNote}>
                    <textarea
                        placeholder={t('modNotes.addPlaceholder', 'Add a new note...')}
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        style={styles.textarea}
                        rows={3}
                    />
                    <button aria-label={t('modNotes.addNote', 'Add note')} onClick={addNote} style={styles.addBtn}>
                        <FaPlus /> {t('modNotes.addNote', 'Add Note')}
                    </button>
                </div>

                <div style={styles.notesList}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : notes.length === 0 ? (
                        <div style={styles.empty}>
                            <FaStickyNote className="icon-lg" />
                            <p>{t('modNotes.noNotes', 'No notes yet')}</p>
                        </div>
                    ) : (
                        notes.map((note) => (
                            <div key={note.id} style={styles.noteItem}>
                                <div style={styles.noteContent}>
                                    <div style={styles.noteMeta}>
                                        <strong>{note.moderator_username}</strong>
                                        <span className="text-gray-sm">
                                            {new Date(note.created_at).toLocaleString('tr-TR')}
                                        </span>
                                    </div>
                                    <div style={styles.noteText}>{note.note}</div>
                                </div>
                                <button
                                    aria-label={t('common.delete', 'Delete')}
                                    onClick={() => deleteNote(note.id)}
                                    style={styles.deleteBtn}
                                    title={t('common.delete', 'Delete')}
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
    addNote: {
        padding: '20px',
        borderBottom: '1px solid #333',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#111214',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginBottom: '10px',
        resize: 'vertical',
        fontFamily: 'inherit',
    },
    addBtn: {
        backgroundColor: '#23a559',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500',
    },
    notesList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
    },
    noteItem: {
        display: 'flex',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    noteContent: {
        flex: 1,
    },
    noteMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
    },
    noteText: {
        color: '#dbdee1',
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
    },
    deleteBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#f23f42',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '10px',
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

ModeratorNotesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    username: PropTypes.string,
    onClose: PropTypes.func,
};
export default ModeratorNotesPanel;

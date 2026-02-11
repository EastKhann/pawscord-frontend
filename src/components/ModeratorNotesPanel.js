// frontend/src/components/ModeratorNotesPanel.js
import { useState, useEffect } from 'react';
import { FaTimes, FaStickyNote, FaPlus, FaTrash } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 📝 Moderator Notes Panel
 * Kullanıcılar hakkında moderatör notları
 */

const ModeratorNotesPanel = ({ fetchWithAuth, apiBaseUrl, username, onClose }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        loadNotes();
    }, [username]);

    const loadNotes = async () => {
        try {
            setLoading(true);
            const response = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/list/?username=${username}`);
            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            }
        } catch (error) {
            console.error('Not yükleme hatası:', error);
            toast.error('Notlar yüklenemedi');
        } finally {
            setLoading(false);
        }
    };

    const addNote = async () => {
        if (!newNote.trim()) {
            toast.error('Not içeriği boş olamaz');
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    note: newNote
                })
            });

            if (response.ok) {
                toast.success('Not eklendi');
                setNewNote('');
                loadNotes();
            } else {
                toast.error('Not eklenemedi');
            }
        } catch (error) {
            console.error('Not ekleme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    const deleteNote = async (noteId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/moderation/notes/${noteId}/delete/`, {
                method: 'DELETE'
            });

            if (response.ok) {
                toast.success('Not silindi');
                loadNotes();
            }
        } catch (error) {
            console.error('Not silme hatası:', error);
            toast.error('Bir hata oluştu');
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaStickyNote style={{ color: '#faa61a' }} />
                        <h2 style={{ margin: 0 }}>Moderatör Notları - {username}</h2>
                    </div>
                    <FaTimes onClick={onClose} style={styles.closeBtn} />
                </div>

                <div style={styles.addNote}>
                    <textarea
                        placeholder="Yeni not ekle..."
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        style={styles.textarea}
                        rows={3}
                    />
                    <button onClick={addNote} style={styles.addBtn}>
                        <FaPlus /> Not Ekle
                    </button>
                </div>

                <div style={styles.notesList}>
                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : notes.length === 0 ? (
                        <div style={styles.empty}>
                            <FaStickyNote style={{ fontSize: '48px', color: '#555' }} />
                            <p>Henüz not yok</p>
                        </div>
                    ) : (
                        notes.map(note => (
                            <div key={note.id} style={styles.noteItem}>
                                <div style={styles.noteContent}>
                                    <div style={styles.noteMeta}>
                                        <strong>{note.moderator_username}</strong>
                                        <span style={{ color: '#888', fontSize: '12px' }}>
                                            {new Date(note.created_at).toLocaleString('tr-TR')}
                                        </span>
                                    </div>
                                    <div style={styles.noteText}>{note.note}</div>
                                </div>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    style={styles.deleteBtn}
                                    title="Sil"
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
    addNote: {
        padding: '20px',
        borderBottom: '1px solid #333'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '14px',
        marginBottom: '10px',
        resize: 'vertical',
        fontFamily: 'inherit'
    },
    addBtn: {
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '500'
    },
    notesList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    noteItem: {
        display: 'flex',
        gap: '15px',
        padding: '15px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        marginBottom: '10px'
    },
    noteContent: {
        flex: 1
    },
    noteMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px'
    },
    noteText: {
        color: '#dcddde',
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap'
    },
    deleteBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '10px'
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

export default ModeratorNotesPanel;

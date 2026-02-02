// frontend/src/components/UserNotesModal.js
import React, { useState, useEffect } from 'react';
import { FaStickyNote, FaSave, FaTimes } from 'react-icons/fa';

const UserNotesModal = ({ targetUser, apiBaseUrl, fetchWithAuth, onClose }) => {
    const [note, setNote] = useState('');
    const [color, setColor] = useState('yellow');
    const [saving, setSaving] = useState(false);

    const colors = [
        { name: 'yellow', value: '#fef3bd' },
        { name: 'green', value: '#d4edda' },
        { name: 'blue', value: '#d1ecf1' },
        { name: 'red', value: '#f8d7da' },
        { name: 'purple', value: '#e2d9f3' }
    ];

    useEffect(() => {
        loadNote();
    }, [targetUser]);

    const loadNote = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/user-notes/${targetUser}/`);
            if (response.ok) {
                const data = await response.json();
                setNote(data.note || '');
                setColor(data.color || 'yellow');
            }
        } catch (error) {
            console.error('Failed to load note:', error);
        }
    };

    const saveNote = async () => {
        setSaving(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/user-notes/${targetUser}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ note, color })
            });
            if (response.ok) {
                onClose();
            }
        } catch (error) {
            console.error('Failed to save note:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.title}>
                        <FaStickyNote /> {targetUser} Hakkında Not
                    </h3>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    <p style={styles.info}>Bu not sadece sen görebilirsin</p>

                    <div style={styles.colorPicker}>
                        <label style={styles.label}>Renk:</label>
                        <div style={styles.colors}>
                            {colors.map(c => (
                                <button
                                    key={c.name}
                                    onClick={() => setColor(c.name)}
                                    style={{
                                        ...styles.colorButton,
                                        backgroundColor: c.value,
                                        ...(color === c.name ? styles.colorButtonActive : {})
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Notunu buraya yaz..."
                        style={{
                            ...styles.textarea,
                            backgroundColor: colors.find(c => c.name === color)?.value
                        }}
                        maxLength={500}
                    />

                    <div style={styles.footer}>
                        <span style={styles.charCount}>{note.length}/500</span>
                        <button
                            onClick={saveNote}
                            disabled={saving}
                            style={styles.saveButton}
                        >
                            <FaSave /> {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                    </div>
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
        zIndex: 1000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        width: '500px',
        maxWidth: '90vw',
        boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
    },
    header: {
        padding: '16px 20px',
        borderBottom: '1px solid #1e1f22',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        color: '#fff',
        fontSize: '18px',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '4px'
    },
    content: {
        padding: '20px'
    },
    info: {
        color: '#72767d',
        fontSize: '13px',
        marginBottom: '16px',
        fontStyle: 'italic'
    },
    colorPicker: {
        marginBottom: '16px'
    },
    label: {
        color: '#b9bbbe',
        fontSize: '14px',
        marginBottom: '8px',
        display: 'block'
    },
    colors: {
        display: 'flex',
        gap: '8px'
    },
    colorButton: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        border: '2px solid transparent',
        cursor: 'pointer',
        transition: 'transform 0.2s'
    },
    colorButtonActive: {
        border: '2px solid #5865f2',
        transform: 'scale(1.1)'
    },
    textarea: {
        width: '100%',
        minHeight: '150px',
        padding: '12px',
        border: '1px solid #4e5058',
        borderRadius: '6px',
        fontSize: '14px',
        color: '#1e1f22',
        resize: 'vertical',
        fontFamily: 'inherit',
        marginBottom: '12px'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    charCount: {
        color: '#72767d',
        fontSize: '12px'
    },
    saveButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }
};

export default UserNotesModal;




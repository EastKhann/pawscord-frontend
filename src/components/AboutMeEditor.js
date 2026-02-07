// frontend/src/components/AboutMeEditor.js
// 🔥 FEATURE 31: About Me bio editor
// Editable bio section for user profiles with character limit

import React, { useState, memo, useCallback } from 'react';
import { FaPen, FaCheck, FaTimes } from 'react-icons/fa';

const MAX_BIO_LENGTH = 190;

const AboutMeEditor = ({ bio = '', editable = false, onSave }) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(bio);

    const handleSave = useCallback(() => {
        onSave?.(draft.trim());
        setEditing(false);
    }, [draft, onSave]);

    const handleCancel = () => {
        setDraft(bio);
        setEditing(false);
    };

    if (editing) {
        return (
            <div style={S.container}>
                <div style={S.header}>
                    <span style={S.title}>HAKKIMDA</span>
                    <span style={{
                        ...S.counter,
                        color: draft.length > MAX_BIO_LENGTH ? '#ed4245' : '#4e5058',
                    }}>
                        {draft.length}/{MAX_BIO_LENGTH}
                    </span>
                </div>
                <textarea
                    value={draft}
                    onChange={e => setDraft(e.target.value.slice(0, MAX_BIO_LENGTH))}
                    placeholder="Kendin hakkında bir şeyler yaz..."
                    style={S.textarea}
                    autoFocus
                    rows={3}
                    maxLength={MAX_BIO_LENGTH}
                />
                <div style={S.actions}>
                    <button type="button" style={S.saveBtn} onClick={handleSave}>
                        <FaCheck /> Kaydet
                    </button>
                    <button type="button" style={S.cancelBtn} onClick={handleCancel}>
                        <FaTimes /> İptal
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={S.container}>
            <div style={S.header}>
                <span style={S.title}>HAKKIMDA</span>
                {editable && (
                    <button type="button" style={S.editBtn} onClick={() => setEditing(true)}>
                        <FaPen style={{ fontSize: 10 }} />
                    </button>
                )}
            </div>
            {bio ? (
                <p style={S.bioText}>{bio}</p>
            ) : (
                <p style={S.placeholder}>
                    {editable ? 'Profiline bir biyografi ekle...' : 'Biyografi yok'}
                </p>
            )}
        </div>
    );
};

const S = {
    container: {
        padding: '12px 0',
    },
    header: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 6,
    },
    title: {
        fontSize: 12, fontWeight: 700, color: '#f2f3f5',
        textTransform: 'uppercase', letterSpacing: '0.5px',
    },
    counter: {
        fontSize: 11, fontWeight: 500,
    },
    bioText: {
        fontSize: 14, color: '#dcddde', lineHeight: 1.5,
        margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
    },
    placeholder: {
        fontSize: 14, color: '#4e5058', fontStyle: 'italic',
        margin: 0,
    },
    textarea: {
        width: '100%', resize: 'none', padding: '8px 10px',
        backgroundColor: '#1e1f22', border: '1px solid rgba(88,101,242,0.3)',
        borderRadius: 6, color: '#dcddde', fontSize: 14,
        outline: 'none', lineHeight: 1.5, fontFamily: 'inherit',
        boxSizing: 'border-box',
    },
    actions: {
        display: 'flex', gap: 6, marginTop: 8,
    },
    saveBtn: {
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '4px 12px', borderRadius: 4,
        border: 'none', backgroundColor: '#5865f2',
        color: '#fff', fontSize: 12, fontWeight: 500,
        cursor: 'pointer',
    },
    cancelBtn: {
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '4px 12px', borderRadius: 4,
        border: 'none', backgroundColor: 'transparent',
        color: '#b5bac1', fontSize: 12, fontWeight: 500,
        cursor: 'pointer',
    },
    editBtn: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 22, height: 22, borderRadius: 4,
        border: 'none', background: 'rgba(255,255,255,0.06)',
        color: '#b5bac1', cursor: 'pointer',
    },
};

export default memo(AboutMeEditor);

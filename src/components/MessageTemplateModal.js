import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash, FaCheck, FaStickyNote } from 'react-icons/fa';
import confirmDialog from '../utils/confirmDialog';

const MessageTemplateModal = ({ onClose, onSelect, fetchWithAuth, apiBaseUrl, isAdmin }) => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [newTemplate, setNewTemplate] = useState({ name: '', content: '', is_global: false });

    useEffect(() => {
        loadTemplates();
    }, []);

    const loadTemplates = async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/templates/`);
            if (res.ok) {
                const data = await res.json();
                setTemplates(data || []);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const handleCreate = async () => {
        if (!newTemplate.name || !newTemplate.content) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/templates/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTemplate)
            });
            if (res.ok) {
                setNewTemplate({ name: '', content: '', is_global: false });
                setCreating(false);
                loadTemplates();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (!await confirmDialog("Bu şablonu silmek istediğine emin misin?")) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/templates/${id}/`, { method: 'DELETE' });
            if (res.ok) {
                setTemplates(prev => prev.filter(t => t.id !== id));
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                {/* HEAD */}
                <div style={headerStyle}>
                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <FaStickyNote /> Hazır Şablonlar
                    </h3>
                    <button onClick={onClose} style={closeButtonStyle}><FaTimes /></button>
                </div>

                {/* CONTENT */}
                <div style={contentStyle}>
                    {creating ? (
                        <div style={formStyle}>
                            <input
                                placeholder="Şablon Adı"
                                value={newTemplate.name}
                                onChange={e => setNewTemplate({ ...newTemplate, name: e.target.value })}
                                style={inputStyle}
                            />
                            <textarea
                                placeholder="Şablon İçeriği..."
                                value={newTemplate.content}
                                onChange={e => setNewTemplate({ ...newTemplate, content: e.target.value })}
                                style={textareaStyle}
                            />
                            {isAdmin && (
                                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px' }}>
                                    <input
                                        type="checkbox"
                                        checked={newTemplate.is_global}
                                        onChange={e => setNewTemplate({ ...newTemplate, is_global: e.target.checked })}
                                    />
                                    Herkese Açık (Global)
                                </label>
                            )}
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button onClick={handleCreate} style={saveButtonStyle}><FaCheck /> Kaydet</button>
                                <button onClick={() => setCreating(false)} style={cancelButtonStyle}>İptal</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => setCreating(true)} style={addButtonStyle}>
                                <FaPlus /> Yeni Şablon Oluştur
                            </button>
                            <div style={listStyle}>
                                {loading ? <p>Yükleniyor...</p> : templates.length === 0 ? <p style={{ opacity: 0.5 }}>Henüz şablon yok.</p> : (
                                    templates.map(t => (
                                        <div key={t.id} style={itemStyle} onClick={() => onSelect(t.content)}>
                                            <div>
                                                <div style={{ fontWeight: 'bold' }}>{t.name}</div>
                                                <div style={{ fontSize: '12px', opacity: 0.7, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{t.content}</div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                {t.is_global && <span style={badgeStyle}>Global</span>}
                                                <button onClick={(e) => handleDelete(t.id, e)} style={deleteButtonStyle}><FaTrash /></button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- STYLES ---
const overlayStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    backdropFilter: 'blur(5px)'
};
const modalStyle = {
    backgroundColor: '#313338', width: '400px', borderRadius: '8px', overflow: 'hidden',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)', color: 'white', display: 'flex', flexDirection: 'column', maxHeight: '80vh'
};
const headerStyle = {
    padding: '16px', backgroundColor: '#2B2D31', borderBottom: '1px solid #1F2023',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
};
const closeButtonStyle = { background: 'none', border: 'none', color: '#B5BAC1', cursor: 'pointer', fontSize: '16px' };
const contentStyle = { padding: '16px', overflowY: 'auto' };
const addButtonStyle = {
    width: '100%', padding: '10px', backgroundColor: '#5865F2', color: 'white', border: 'none', borderRadius: '4px',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginBottom: '15px'
};
const listStyle = { display: 'flex', flexDirection: 'column', gap: '8px' };
const itemStyle = {
    backgroundColor: '#2B2D31', padding: '10px', borderRadius: '4px', cursor: 'pointer',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: '0.2s'
};
const badgeStyle = { fontSize: '10px', backgroundColor: '#FAA61A', color: 'black', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' };
const deleteButtonStyle = { background: 'none', border: 'none', color: '#DA373C', cursor: 'pointer' };
const formStyle = { display: 'flex', flexDirection: 'column', gap: '10px' };
const inputStyle = { padding: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#1E1F22', color: 'white' };
const textareaStyle = { padding: '8px', borderRadius: '4px', border: 'none', backgroundColor: '#1E1F22', color: 'white', minHeight: '100px', resize: 'vertical' };
const saveButtonStyle = { flex: 1, padding: '8px', backgroundColor: '#23A559', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const cancelButtonStyle = { flex: 1, padding: '8px', backgroundColor: '#DA373C', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

export default MessageTemplateModal;



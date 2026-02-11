// frontend/src/components/AutoResponderManager.js
import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTimes, FaPlus, FaRobot, FaTrash } from 'react-icons/fa';

const AutoResponderManager = ({ onClose, fetchWithAuth, apiBaseUrl, serverId, embedded = false }) => {
    const [responders, setResponders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newResponder, setNewResponder] = useState({ trigger: '', response: '', is_regex: false });

    useEffect(() => {
        loadResponders();
    }, []);

    const loadResponders = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/autoresponders/list/`);
            if (res.ok) {
                const data = await res.json();
                setResponders(data.responders || []);
            }
        } catch (error) {
            console.error('Load responders error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newResponder.trigger || !newResponder.response) {
            toast.error('❌ Tetikleyici ve yanıt gerekli');
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/autoresponders/create/`, {
                method: 'POST',
                body: JSON.stringify(newResponder)
            });

            if (res.ok) {
                toast.success('✅ Auto-responder oluşturuldu!');
                setShowCreate(false);
                setNewResponder({ trigger: '', response: '', is_regex: false });
                loadResponders();
            }
        } catch (error) {
            console.error('Create responder error:', error);
        }
    };

    // İçerik alanını oluştur
    const content = (
        <>
            {!showCreate && (
                <button onClick={() => setShowCreate(true)} style={styles.createButton}>
                    <FaPlus /> Yeni Otomatik Yanıt
                </button>
            )}

            {showCreate && (
                <div style={styles.createForm}>
                    <input
                        type="text"
                        placeholder="Tetikleyici kelime (örn: merhaba)"
                        value={newResponder.trigger}
                        onChange={(e) => setNewResponder({ ...newResponder, trigger: e.target.value })}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Otomatik yanıt mesajı"
                        value={newResponder.response}
                        onChange={(e) => setNewResponder({ ...newResponder, response: e.target.value })}
                        style={styles.textarea}
                    />
                    <label style={styles.checkbox}>
                        <input
                            type="checkbox"
                            checked={newResponder.is_regex}
                            onChange={(e) => setNewResponder({ ...newResponder, is_regex: e.target.checked })}
                        />
                        <span style={{ marginLeft: '8px', color: '#b9bbbe' }}>Regex kullan</span>
                    </label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={handleCreate} style={styles.submitButton}>Oluştur</button>
                        <button onClick={() => setShowCreate(false)} style={styles.cancelButton}>İptal</button>
                    </div>
                </div>
            )}

            {loading ? (
                <div style={styles.loading}>Yükleniyor...</div>
            ) : responders.length === 0 ? (
                <div style={styles.empty}>Henüz otomatik yanıt oluşturulmamış</div>
            ) : (
                <div style={styles.responderList}>
                    {responders.map(resp => (
                        <div key={resp.id} style={styles.responderItem}>
                            <div>
                                <div style={styles.trigger}>🤖 {resp.trigger}</div>
                                <div style={styles.response}>{resp.response}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );

    // Embedded mode: sadece içeriği render et
    if (embedded) {
        return <div style={styles.content}>{content}</div>;
    }

    // Standalone mode: overlay ve modal ile render et
    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>
                        <FaRobot /> Otomatik Yanıtlar
                    </h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>
                <div style={styles.content}>{content}</div>
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
        zIndex: 10000
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #40444b'
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.5em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.5em'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    createButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '15px'
    },
    createForm: {
        backgroundColor: '#40444b',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px'
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#2b2d31',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white'
    },
    textarea: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        minHeight: '80px',
        backgroundColor: '#2b2d31',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
        resize: 'vertical'
    },
    checkbox: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
    },
    submitButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#3ba55d',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    cancelButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer'
    },
    loading: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px'
    },
    responderList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    responderItem: {
        backgroundColor: '#40444b',
        padding: '15px',
        borderRadius: '8px'
    },
    trigger: {
        color: '#5865f2',
        fontWeight: 'bold',
        marginBottom: '8px'
    },
    response: {
        color: '#dcddde',
        fontSize: '0.9em'
    }
};

export default AutoResponderManager;



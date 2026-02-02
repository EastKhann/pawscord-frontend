// frontend/src/components/WebhookManager.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaPlus, FaTrash, FaCopy } from 'react-icons/fa';
import toast from '../utils/toast';

const WebhookManager = ({ onClose, fetchWithAuth, apiBaseUrl, serverId }) => {
    const [webhooks, setWebhooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [newWebhook, setNewWebhook] = useState({ name: '', url: '', events: [] });

    useEffect(() => {
        loadWebhooks();
    }, []);

    const loadWebhooks = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/list/`);
            if (res.ok) {
                const data = await res.json();
                setWebhooks(data.webhooks || []);
            }
        } catch (error) {
            console.error('Load webhooks error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newWebhook.name || !newWebhook.url) {
            toast.warning('İsim ve URL gerekli');
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
                method: 'POST',
                body: JSON.stringify(newWebhook)
            });

            if (res.ok) {
                toast.success('Webhook oluşturuldu!');
                setShowCreate(false);
                setNewWebhook({ name: '', url: '', events: [] });
                loadWebhooks();
            }
        } catch (error) {
            console.error('Create webhook error:', error);
        }
    };

    const handleDelete = async (webhookId) => {
        if (!confirm('Bu webhook\'u silmek istediğinizden emin misiniz?')) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, {
                method: 'DELETE'
            });

            if (res.ok) {
                setWebhooks(prev => prev.filter(w => w.id !== webhookId));
            }
        } catch (error) {
            console.error('Delete webhook error:', error);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>🔗 Webhook Yönetimi</h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {!showCreate && (
                        <button onClick={() => setShowCreate(true)} style={styles.createButton}>
                            <FaPlus /> Yeni Webhook
                        </button>
                    )}

                    {showCreate && (
                        <div style={styles.createForm}>
                            <input
                                type="text"
                                placeholder="Webhook İsmi"
                                value={newWebhook.name}
                                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                                style={styles.input}
                            />
                            <input
                                type="url"
                                placeholder="Webhook URL"
                                value={newWebhook.url}
                                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                                style={styles.input}
                            />
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={handleCreate} style={styles.submitButton}>Oluştur</button>
                                <button onClick={() => setShowCreate(false)} style={styles.cancelButton}>İptal</button>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : webhooks.length === 0 ? (
                        <div style={styles.empty}>Henüz webhook oluşturulmamış</div>
                    ) : (
                        <div style={styles.webhookList}>
                            {webhooks.map(webhook => (
                                <div key={webhook.id} style={styles.webhookItem}>
                                    <div>
                                        <div style={styles.webhookName}>{webhook.name}</div>
                                        <div style={styles.webhookUrl}>{webhook.url}</div>
                                    </div>
                                    <button onClick={() => handleDelete(webhook.id)} style={styles.deleteButton}>
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
        fontSize: '1.5em'
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
    webhookList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    webhookItem: {
        backgroundColor: '#40444b',
        padding: '15px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    webhookName: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    webhookUrl: {
        color: '#b9bbbe',
        fontSize: '0.85em'
    },
    deleteButton: {
        backgroundColor: '#f04747',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer'
    }
};

export default WebhookManager;



// frontend/src/components/WebhookPanel.js
import React, { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaPlus, FaTimes, FaTrash, FaEdit, FaCopy, FaSync } from 'react-icons/fa';

const WebhookPanel = ({ serverId, channelId, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [webhooks, setWebhooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingWebhook, setEditingWebhook] = useState(null);

    useEffect(() => {
        loadWebhooks();
    }, [serverId, channelId]);

    const loadWebhooks = async () => {
        setLoading(true);
        try {
            const endpoint = channelId
                ? `${apiBaseUrl}/api/channels/${channelId}/webhooks/`
                : `${apiBaseUrl}/api/servers/${serverId}/webhooks/`;
            const res = await fetchWithAuth(endpoint);
            if (res.ok) {
                const data = await res.json();
                setWebhooks(data.webhooks || []);
            }
        } catch (error) {
            console.error('Webhook load error:', error);
        }
        setLoading(false);
    };

    const createWebhook = async (name, avatar) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/channels/${channelId}/webhooks/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, avatar })
            });
            if (res.ok) {
                const data = await res.json();
                setWebhooks([...webhooks, data.webhook]);
                setShowCreateModal(false);
            }
        } catch (error) {
            console.error('Webhook create error:', error);
        }
    };

    const deleteWebhook = async (webhookId) => {
        if (!confirm('Bu webhook\'u silmek istediğinize emin misiniz?')) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/webhooks/${webhookId}/`, {
                method: 'DELETE'
            });
            if (res.ok) {
                setWebhooks(webhooks.filter(w => w.id !== webhookId));
            }
        } catch (error) {
            console.error('Webhook delete error:', error);
        }
    };

    const regenerateToken = async (webhookId) => {
        if (!confirm('Token\'ı yenilemek istediğinize emin misiniz? Eski token geçersiz olacak.')) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/webhooks/${webhookId}/regenerate/`, {
                method: 'POST'
            });
            if (res.ok) {
                const data = await res.json();
                setWebhooks(webhooks.map(w => w.id === webhookId ? data.webhook : w));
                toast.success('✅ Token yenilendi!');
            }
        } catch (error) {
            console.error('Token regenerate error:', error);
        }
    };

    const copyWebhookUrl = (webhook) => {
        const url = `${apiBaseUrl}/api/webhooks/${webhook.id}/${webhook.token}`;
        navigator.clipboard.writeText(url);
        toast.success('✅ Webhook URL kopyalandı!');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Webhook Yönetimi</h2>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes size={20} />
                    </button>
                </div>

                <div style={styles.content}>
                    {channelId && (
                        <button
                            onClick={() => setShowCreateModal(true)}
                            style={styles.createButton}
                        >
                            <FaPlus size={14} />
                            <span>Yeni Webhook Oluştur</span>
                        </button>
                    )}

                    {loading ? (
                        <div style={styles.loading}>Yükleniyor...</div>
                    ) : webhooks.length === 0 ? (
                        <div style={styles.empty}>
                            <p>Henüz webhook yok</p>
                            {channelId && <p style={{fontSize: '12px', color: '#72767d'}}>Webhook oluşturarak otomatik mesaj gönderebilirsiniz</p>}
                        </div>
                    ) : (
                        <div style={styles.webhookList}>
                            {webhooks.map(webhook => (
                                <div key={webhook.id} style={styles.webhookItem}>
                                    <div style={styles.webhookAvatar}>
                                        {webhook.avatar ? (
                                            <img src={webhook.avatar} alt={webhook.name} style={styles.avatar} />
                                        ) : (
                                            <div style={styles.defaultAvatar}>🪝</div>
                                        )}
                                    </div>
                                    <div style={styles.webhookInfo}>
                                        <div style={styles.webhookName}>{webhook.name}</div>
                                        <div style={styles.webhookUrl}>
                                            {apiBaseUrl}/api/webhooks/{webhook.id}/...
                                        </div>
                                        <div style={styles.webhookMeta}>
                                            Oluşturuldu: {new Date(webhook.created_at).toLocaleDateString('tr-TR')}
                                        </div>
                                    </div>
                                    <div style={styles.webhookActions}>
                                        <button
                                            onClick={() => copyWebhookUrl(webhook)}
                                            style={styles.actionButton}
                                            title="URL'yi Kopyala"
                                        >
                                            <FaCopy size={14} />
                                        </button>
                                        <button
                                            onClick={() => regenerateToken(webhook.id)}
                                            style={styles.actionButton}
                                            title="Token Yenile"
                                        >
                                            <FaSync size={14} />
                                        </button>
                                        <button
                                            onClick={() => setEditingWebhook(webhook)}
                                            style={styles.actionButton}
                                            title="Düzenle"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                        <button
                                            onClick={() => deleteWebhook(webhook.id)}
                                            style={{...styles.actionButton, color: '#ed4245'}}
                                            title="Sil"
                                        >
                                            <FaTrash size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {showCreateModal && (
                    <WebhookCreateModal
                        onClose={() => setShowCreateModal(false)}
                        onCreate={createWebhook}
                    />
                )}

                {editingWebhook && (
                    <WebhookEditModal
                        webhook={editingWebhook}
                        onClose={() => setEditingWebhook(null)}
                        onSave={(name, avatar) => {
                            // Update webhook
                            fetchWithAuth(`${apiBaseUrl}/api/webhooks/${editingWebhook.id}/`, {
                                method: 'PATCH',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ name, avatar })
                            }).then(() => {
                                loadWebhooks();
                                setEditingWebhook(null);
                            });
                        }}
                    />
                )}
            </div>
        </div>
    );
};

const WebhookCreateModal = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h3 style={styles.modalTitle}>Yeni Webhook Oluştur</h3>
                <input
                    type="text"
                    placeholder="Webhook Adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Avatar URL (opsiyonel)"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.modalButtons}>
                    <button onClick={onClose} style={styles.cancelButton}>İptal</button>
                    <button
                        onClick={() => onCreate(name, avatar)}
                        disabled={!name.trim()}
                        style={styles.submitButton}
                    >
                        Oluştur
                    </button>
                </div>
            </div>
        </div>
    );
};

const WebhookEditModal = ({ webhook, onClose, onSave }) => {
    const [name, setName] = useState(webhook.name);
    const [avatar, setAvatar] = useState(webhook.avatar || '');

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h3 style={styles.modalTitle}>Webhook Düzenle</h3>
                <input
                    type="text"
                    placeholder="Webhook Adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Avatar URL"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.modalButtons}>
                    <button onClick={onClose} style={styles.cancelButton}>İptal</button>
                    <button
                        onClick={() => onSave(name, avatar)}
                        style={styles.submitButton}
                    >
                        Kaydet
                    </button>
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
    panel: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    createButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '10px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        marginBottom: '16px'
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe'
    },
    empty: {
        textAlign: 'center',
        padding: '40px',
        color: '#b9bbbe'
    },
    webhookList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    webhookItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#36393f',
        padding: '16px',
        borderRadius: '8px'
    },
    webhookAvatar: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        overflow: 'hidden'
    },
    avatar: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    defaultAvatar: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5865f2',
        fontSize: '24px'
    },
    webhookInfo: {
        flex: 1
    },
    webhookName: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    webhookUrl: {
        color: '#72767d',
        fontSize: '12px',
        fontFamily: 'monospace',
        marginBottom: '4px'
    },
    webhookMeta: {
        color: '#72767d',
        fontSize: '11px'
    },
    webhookActions: {
        display: 'flex',
        gap: '8px'
    },
    actionButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '4px',
        transition: 'all 0.2s'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001
    },
    modal: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '24px',
        width: '90%',
        maxWidth: '400px'
    },
    modalTitle: {
        color: '#ffffff',
        marginBottom: '16px'
    },
    input: {
        width: '100%',
        backgroundColor: '#202225',
        border: '1px solid #202225',
        color: '#dcddde',
        padding: '10px',
        borderRadius: '4px',
        fontSize: '14px',
        marginBottom: '12px',
        outline: 'none'
    },
    modalButtons: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end',
        marginTop: '16px'
    },
    cancelButton: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    submitButton: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
    }
};

export default WebhookPanel;




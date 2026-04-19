// frontend/src/components/WebhookManager.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaPlus, FaTrash, FaCopy } from 'react-icons/fa';
import toast from '../../utils/toast';
import { useTranslation } from 'react-i18next';
import logger from '../../utils/logger';
import confirmDialog from '../../utils/confirmDialog';
const WebhookManager = ({ onClose, fetchWithAuth, apiBaseUrl, serverId }) => {
    const { t } = useTranslation();
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
            logger.error('Load webhooks error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!newWebhook.name || !newWebhook.url) {
            toast.warning(t('webhookManager.nameUrlRequired'));
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
                method: 'POST',
                body: JSON.stringify(newWebhook),
            });

            if (res.ok) {
                toast.success(t('webhookManager.created'));
                setShowCreate(false);
                setNewWebhook({ name: '', url: '', events: [] });
                loadWebhooks();
            }
        } catch (error) {
            logger.error('Create webhook error:', error);
        }
    };

    const handleDelete = async (webhookId) => {
        if (!(await confirmDialog(t('webhookManager.deleteConfirm')))) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setWebhooks((prev) => prev.filter((w) => w.id !== webhookId));
            }
        } catch (error) {
            logger.error('Delete webhook error:', error);
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
                    <h2 style={styles.title}>🔗 Webhook Yönetimi</h2>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {!showCreate && (
                        <button
                            aria-label="Create"
                            onClick={() => setShowCreate(true)}
                            style={styles.createButton}
                        >
                            <FaPlus /> Yeni Webhook
                        </button>
                    )}

                    {showCreate && (
                        <div style={styles.createForm}>
                            <input
                                type="text"
                                placeholder={t('ui.webhook_ismi')}
                                value={newWebhook.name}
                                onChange={(e) =>
                                    setNewWebhook({ ...newWebhook, name: e.target.value })
                                }
                                style={styles.input}
                            />
                            <input
                                type="url"
                                placeholder="Webhook URL"
                                value={newWebhook.url}
                                onChange={(e) =>
                                    setNewWebhook({ ...newWebhook, url: e.target.value })
                                }
                                style={styles.input}
                            />
                            <div className="flex-gap-10">
                                <button
                                    aria-label="handle Create"
                                    onClick={handleCreate}
                                    style={styles.submitButton}
                                >
                                    Oluştur
                                </button>
                                <button
                                    aria-label="Create"
                                    onClick={() => setShowCreate(false)}
                                    style={styles.cancelButton}
                                >
                                    {t('common.cancel')}
                                </button>
                            </div>
                        </div>
                    )}

                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : webhooks.length === 0 ? (
                        <div style={styles.empty}>Henüz webhook oluşturulmadı</div>
                    ) : (
                        <div style={styles.webhookList}>
                            {webhooks.map((webhook) => (
                                <div key={webhook.id} style={styles.webhookItem}>
                                    <div>
                                        <div style={styles.webhookName}>{webhook.name}</div>
                                        <div style={styles.webhookUrl}>{webhook.url}</div>
                                    </div>
                                    <button
                                        aria-label="Delete"
                                        onClick={() => handleDelete(webhook.id)}
                                        style={styles.deleteButton}
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
        zIndex: 10000,
    },
    modal: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #182135',
    },
    title: {
        color: 'white',
        margin: 0,
        fontSize: '1.5em',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '1.5em',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
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
        marginBottom: '15px',
    },
    createForm: {
        backgroundColor: '#1e2024',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#111214',
        border: '1px solid #5865f2',
        borderRadius: '4px',
        color: 'white',
    },
    submitButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#3ba55d',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    cancelButton: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#f23f42',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        color: '#b5bac1',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#b5bac1',
        padding: '40px',
    },
    webhookList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    webhookItem: {
        backgroundColor: '#1e2024',
        padding: '15px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    webhookName: {
        color: 'white',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    webhookUrl: {
        color: '#b5bac1',
        fontSize: '0.85em',
    },
    deleteButton: {
        backgroundColor: '#f23f42',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
    },
};

WebhookManager.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    serverId: PropTypes.string,
};
export default WebhookManager;

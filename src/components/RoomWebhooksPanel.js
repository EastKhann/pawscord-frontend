import React, { useState, useEffect } from 'react';
import { FaTimes, FaLink, FaPlus, FaTrash, FaHistory, FaRedo, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from '../utils/toast';

const RoomWebhooksPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const [webhooks, setWebhooks] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedWebhook, setSelectedWebhook] = useState(null);
    const [newWebhook, setNewWebhook] = useState({ name: '', url: '', events: [] });

    const eventTypes = [
        'message.created', 'message.updated', 'message.deleted',
        'member.joined', 'member.left', 'member.updated',
        'channel.created', 'channel.updated', 'channel.deleted',
        'role.created', 'role.updated', 'role.deleted'
    ];

    useEffect(() => {
        fetchWebhooks();
    }, [roomSlug]);

    const fetchWebhooks = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/webhooks/`);
            const data = await response.json();
            setWebhooks(data.webhooks || []);
        } catch (error) {
            toast.error('Failed to load webhooks');
        } finally {
            setLoading(false);
        }
    };

    const fetchDeliveries = async (webhookId) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/webhooks/${webhookId}/deliveries/`);
            const data = await response.json();
            setDeliveries(data.deliveries || []);
            setSelectedWebhook(webhookId);
        } catch (error) {
            toast.error('Failed to load delivery logs');
        }
    };

    const createWebhook = async () => {
        if (!newWebhook.name || !newWebhook.url) {
            toast.error('Name and URL are required');
            return;
        }

        try {
            await fetchWithAuth(`${apiBaseUrl}/webhooks/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newWebhook,
                    room_slug: roomSlug
                })
            });

            toast.success('Webhook created successfully');
            setShowCreateForm(false);
            setNewWebhook({ name: '', url: '', events: [] });
            fetchWebhooks();
        } catch (error) {
            toast.error('Failed to create webhook');
        }
    };

    const deleteWebhook = async (webhookId) => {
        if (!confirm('Are you sure you want to delete this webhook?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/webhooks/${webhookId}/delete/`, {
                method: 'DELETE'
            });

            toast.success('Webhook deleted successfully');
            fetchWebhooks();
        } catch (error) {
            toast.error('Failed to delete webhook');
        }
    };

    const retryDelivery = async (deliveryId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/webhook/deliveries/retry/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ delivery_id: deliveryId })
            });

            toast.success('Delivery retried successfully');
            if (selectedWebhook) {
                fetchDeliveries(selectedWebhook);
            }
        } catch (error) {
            toast.error('Failed to retry delivery');
        }
    };

    const toggleEvent = (event) => {
        setNewWebhook(prev => ({
            ...prev,
            events: prev.events.includes(event)
                ? prev.events.filter(e => e !== event)
                : [...prev.events, event]
        }));
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaLink style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Channel Webhooks</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading webhooks...</div>
                    ) : (
                        <>
                            <div style={styles.section}>
                                <div style={styles.sectionHeader}>
                                    <h3 style={styles.sectionTitle}>Webhooks</h3>
                                    <button onClick={() => setShowCreateForm(!showCreateForm)} style={styles.addButton}>
                                        <FaPlus style={{ marginRight: '5px' }} />
                                        Create Webhook
                                    </button>
                                </div>

                                {showCreateForm && (
                                    <div style={styles.createForm}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Webhook Name</label>
                                            <input
                                                type="text"
                                                value={newWebhook.name}
                                                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                                                placeholder="My Webhook"
                                                style={styles.input}
                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Payload URL</label>
                                            <input
                                                type="url"
                                                value={newWebhook.url}
                                                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                                                placeholder="https://example.com/webhook"
                                                style={styles.input}
                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Events to Subscribe</label>
                                            <div style={styles.eventsGrid}>
                                                {eventTypes.map(event => (
                                                    <label key={event} style={styles.eventCheckbox}>
                                                        <input
                                                            type="checkbox"
                                                            checked={newWebhook.events.includes(event)}
                                                            onChange={() => toggleEvent(event)}
                                                        />
                                                        <span style={styles.eventLabel}>{event}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={styles.formActions}>
                                            <button onClick={createWebhook} style={styles.createButton}>
                                                Create Webhook
                                            </button>
                                            <button onClick={() => setShowCreateForm(false)} style={styles.cancelButton}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div style={styles.webhooksList}>
                                    {webhooks.length === 0 ? (
                                        <div style={styles.empty}>No webhooks configured for this channel</div>
                                    ) : (
                                        webhooks.map((webhook) => (
                                            <div key={webhook.id} style={styles.webhookCard}>
                                                <div style={styles.webhookHeader}>
                                                    <div>
                                                        <div style={styles.webhookName}>{webhook.name}</div>
                                                        <div style={styles.webhookUrl}>{webhook.url}</div>
                                                        <div style={styles.webhookEvents}>
                                                            {webhook.events?.join(', ') || 'All events'}
                                                        </div>
                                                    </div>
                                                    <div style={styles.webhookActions}>
                                                        <button
                                                            onClick={() => fetchDeliveries(webhook.id)}
                                                            style={styles.iconButton}
                                                            title="View Deliveries"
                                                        >
                                                            <FaHistory />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteWebhook(webhook.id)}
                                                            style={{ ...styles.iconButton, color: '#f04747' }}
                                                            title="Delete Webhook"
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {selectedWebhook && (
                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Recent Deliveries</h3>
                                    <div style={styles.deliveriesList}>
                                        {deliveries.length === 0 ? (
                                            <div style={styles.empty}>No deliveries yet</div>
                                        ) : (
                                            deliveries.map((delivery) => (
                                                <div key={delivery.id} style={styles.deliveryCard}>
                                                    <div style={styles.deliveryHeader}>
                                                        <div style={styles.deliveryStatus}>
                                                            {delivery.status === 'success' ? (
                                                                <FaCheckCircle style={{ color: '#43b581' }} />
                                                            ) : (
                                                                <FaExclamationTriangle style={{ color: '#f04747' }} />
                                                            )}
                                                            <span style={styles.deliveryStatusText}>
                                                                {delivery.status === 'success' ? 'Success' : 'Failed'}
                                                            </span>
                                                        </div>
                                                        <div style={styles.deliveryTime}>
                                                            {new Date(delivery.delivered_at).toLocaleString()}
                                                        </div>
                                                    </div>

                                                    <div style={styles.deliveryBody}>
                                                        <div style={styles.deliveryInfo}>
                                                            <strong>Event:</strong> {delivery.event_type}
                                                        </div>
                                                        <div style={styles.deliveryInfo}>
                                                            <strong>Response Code:</strong> {delivery.response_code || 'N/A'}
                                                        </div>
                                                        {delivery.error && (
                                                            <div style={styles.deliveryError}>
                                                                <strong>Error:</strong> {delivery.error}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {delivery.status === 'failed' && (
                                                        <button
                                                            onClick={() => retryDelivery(delivery.id)}
                                                            style={styles.retryButton}
                                                        >
                                                            <FaRedo style={{ marginRight: '5px' }} />
                                                            Retry
                                                        </button>
                                                    )}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
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
        maxWidth: '900px',
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
    section: {
        marginBottom: '24px',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px',
    },
    sectionTitle: {
        margin: 0,
        fontSize: '16px',
        color: '#ffffff',
        fontWeight: '600',
    },
    addButton: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        display: 'flex',
        alignItems: 'center',
    },
    createForm: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '20px',
        marginBottom: '16px',
    },
    formGroup: {
        marginBottom: '16px',
    },
    label: {
        display: 'block',
        color: '#dcddde',
        fontSize: '14px',
        marginBottom: '8px',
        fontWeight: '500',
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #2c2f33',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '14px',
    },
    eventsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
    },
    eventCheckbox: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer',
    },
    eventLabel: {
        userSelect: 'none',
    },
    formActions: {
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-end',
    },
    createButton: {
        padding: '10px 20px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
    },
    cancelButton: {
        padding: '10px 20px',
        backgroundColor: '#4f545c',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
    },
    webhooksList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    empty: {
        textAlign: 'center',
        color: '#99aab5',
        padding: '40px',
    },
    webhookCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
    },
    webhookHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    webhookName: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '4px',
    },
    webhookUrl: {
        fontSize: '13px',
        color: '#5865f2',
        marginBottom: '4px',
        wordBreak: 'break-all',
    },
    webhookEvents: {
        fontSize: '12px',
        color: '#99aab5',
    },
    webhookActions: {
        display: 'flex',
        gap: '8px',
    },
    iconButton: {
        background: 'none',
        border: 'none',
        color: '#99aab5',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '5px',
    },
    deliveriesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxHeight: '300px',
        overflowY: 'auto',
    },
    deliveryCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '12px',
    },
    deliveryHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    deliveryStatus: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    deliveryStatusText: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#ffffff',
    },
    deliveryTime: {
        fontSize: '12px',
        color: '#99aab5',
    },
    deliveryBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        fontSize: '13px',
        color: '#dcddde',
    },
    deliveryInfo: {
        display: 'flex',
        gap: '8px',
    },
    deliveryError: {
        color: '#f04747',
        marginTop: '4px',
    },
    retryButton: {
        marginTop: '12px',
        padding: '6px 12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
    },
};

export default RoomWebhooksPanel;

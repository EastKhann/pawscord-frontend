import React from 'react';
import { FaTimes, FaLink, FaPlus, FaTrash, FaHistory, FaRedo, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { styles } from './RoomWebhooksPanel/roomWebhooksStyles';
import useRoomWebhooks, { eventTypes } from './RoomWebhooksPanel/useRoomWebhooks';

const RoomWebhooksPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const {
        webhooks, deliveries, loading,
        showCreateForm, setShowCreateForm,
        selectedWebhook,
        newWebhook, setNewWebhook,
        fetchDeliveries, createWebhook, deleteWebhook, retryDelivery, toggleEvent
    } = useRoomWebhooks(fetchWithAuth, apiBaseUrl, roomSlug);

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
                                            <button onClick={createWebhook} style={styles.createButton}>Create Webhook</button>
                                            <button onClick={() => setShowCreateForm(false)} style={styles.cancelButton}>Cancel</button>
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
                                                        <button onClick={() => fetchDeliveries(webhook.id)} style={styles.iconButton} title="View Deliveries">
                                                            <FaHistory />
                                                        </button>
                                                        <button onClick={() => deleteWebhook(webhook.id)} style={{ ...styles.iconButton, color: '#f04747' }} title="Delete Webhook">
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
                                                        <div style={styles.deliveryInfo}><strong>Event:</strong> {delivery.event_type}</div>
                                                        <div style={styles.deliveryInfo}><strong>Response Code:</strong> {delivery.response_code || 'N/A'}</div>
                                                        {delivery.error && (
                                                            <div style={styles.deliveryError}><strong>Error:</strong> {delivery.error}</div>
                                                        )}
                                                    </div>
                                                    {delivery.status === 'failed' && (
                                                        <button onClick={() => retryDelivery(delivery.id)} style={styles.retryButton}>
                                                            <FaRedo style={{ marginRight: '5px' }} /> Retry
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

export default RoomWebhooksPanel;

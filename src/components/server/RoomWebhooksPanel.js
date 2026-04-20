/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import {
    FaTimes,
    FaLink,
    FaPlus,
    FaTrash,
    FaHistory,
    FaRedo,
    FaCheckCircle,
    FaExclamationTriangle,
} from 'react-icons/fa';
import { styles } from '../RoomWebhooksPanel/roomWebhooksStyles';
import useRoomWebhooks, { eventTypes } from '../RoomWebhooksPanel/useRoomWebhooks';

import { useTranslation } from 'react-i18next';

const S = {
    txt: { ...styles.iconButton, color: '#f23f42' },
};

const RoomWebhooksPanel = ({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
    const { t } = useTranslation();
    const {
        webhooks,
        deliveries,
        loading,
        showCreateForm,
        setShowCreateForm,
        selectedWebhook,
        newWebhook,
        setNewWebhook,
        fetchDeliveries,
        createWebhook,
        deleteWebhook,
        retryDelivery,
        toggleEvent,
    } = useRoomWebhooks(fetchWithAuth, apiBaseUrl, roomSlug);

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaLink className="icon-primary-mr10" />
                        <h2 style={styles.title}>Kanal Webhook'ları</h2>
                    </div>
                    <button aria-label="Close" onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Webhook'lar yükleniyor...</div>
                    ) : (
                        <>
                            <div style={styles.section}>
                                <div style={styles.sectionHeader}>
                                    <h3 style={styles.sectionTitle}>Webhooks</h3>
                                    <button
                                        aria-label="Create"
                                        onClick={() => setShowCreateForm(!showCreateForm)}
                                        style={styles.addButton}
                                    >
                                        <FaPlus className="mr-5" />
                                        Create Webhook
                                    </button>
                                </div>

                                {showCreateForm && (
                                    <div style={styles.createForm}>
                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Webhook Adı</label>
                                            <input
                                                type="text"
                                                value={newWebhook.name}
                                                onChange={(e) =>
                                                    setNewWebhook({
                                                        ...newWebhook,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="Webhooküm"
                                                style={styles.input}
                                                aria-label="Ad"
                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>Payload URL</label>
                                            <input
                                                type="url"
                                                value={newWebhook.url}
                                                onChange={(e) =>
                                                    setNewWebhook({
                                                        ...newWebhook,
                                                        url: e.target.value,
                                                    })
                                                }
                                                placeholder="https://example.com/webhook"
                                                style={styles.input}
                                                aria-label="Url"
                                            />
                                        </div>

                                        <div style={styles.formGroup}>
                                            <label style={styles.label}>
                                                Abone Olunacak Olaylar
                                            </label>
                                            <div style={styles.eventsGrid}>
                                                {eventTypes.map((event) => (
                                                    <label key={event} style={styles.eventCheckbox}>
                                                        <input
                                                            type="checkbox"
                                                            checked={newWebhook.events.includes(
                                                                event
                                                            )}
                                                            onChange={() => toggleEvent(event)}
                                                        />
                                                        <span style={styles.eventLabel}>
                                                            {event}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={styles.formActions}>
                                            <button
                                                aria-label="create Webhook"
                                                onClick={createWebhook}
                                                style={styles.createButton}
                                            >
                                                Webhook Oluştur
                                            </button>
                                            <button
                                                aria-label="Create"
                                                onClick={() => setShowCreateForm(false)}
                                                style={styles.cancelButton}
                                            >
                                                {t('common.cancel')}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div style={styles.webhooksList}>
                                    {webhooks.length === 0 ? (
                                        <div style={styles.empty}>
                                            Bu kanal için webhook yapılandırılmamış
                                        </div>
                                    ) : (
                                        webhooks.map((webhook) => (
                                            <div key={webhook.id} style={styles.webhookCard}>
                                                <div style={styles.webhookHeader}>
                                                    <div>
                                                        <div style={styles.webhookName}>
                                                            {webhook.name}
                                                        </div>
                                                        <div style={styles.webhookUrl}>
                                                            {webhook.url}
                                                        </div>
                                                        <div style={styles.webhookEvents}>
                                                            {webhook.events?.join(', ') ||
                                                                'All events'}
                                                        </div>
                                                    </div>
                                                    <div style={styles.webhookActions}>
                                                        <button
                                                            aria-label="Gönderimleri görüntüle"
                                                            onClick={() =>
                                                                fetchDeliveries(webhook.id)
                                                            }
                                                            style={styles.iconButton}
                                                            title="Gönderimleri görüntüle"
                                                        >
                                                            <FaHistory />
                                                        </button>
                                                        <button
                                                            aria-label="Webhook sil"
                                                            onClick={() =>
                                                                deleteWebhook(webhook.id)
                                                            }
                                                            style={S.txt}
                                                            title="Webhook sil"
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
                                    <h3 style={styles.sectionTitle}>Son Teslimatlar</h3>
                                    <div style={styles.deliveriesList}>
                                        {deliveries.length === 0 ? (
                                            <div style={styles.empty}>Henüz teslimat yok</div>
                                        ) : (
                                            deliveries.map((delivery) => (
                                                <div key={delivery.id} style={styles.deliveryCard}>
                                                    <div style={styles.deliveryHeader}>
                                                        <div style={styles.deliveryStatus}>
                                                            {delivery.status === 'success' ? (
                                                                <FaCheckCircle className="icon-success" />
                                                            ) : (
                                                                <FaExclamationTriangle className="icon-danger" />
                                                            )}
                                                            <span style={styles.deliveryStatusText}>
                                                                {delivery.status === 'success'
                                                                    ? 'Success'
                                                                    : 'Failed'}
                                                            </span>
                                                        </div>
                                                        <div style={styles.deliveryTime}>
                                                            {new Date(
                                                                delivery.delivered_at
                                                            ).toLocaleString()}
                                                        </div>
                                                    </div>
                                                    <div style={styles.deliveryBody}>
                                                        <div style={styles.deliveryInfo}>
                                                            <strong>Event:</strong>{' '}
                                                            {delivery.event_type}
                                                        </div>
                                                        <div style={styles.deliveryInfo}>
                                                            <strong>Response Code:</strong>{' '}
                                                            {delivery.response_code || 'N/A'}
                                                        </div>
                                                        {delivery.error && (
                                                            <div style={styles.deliveryError}>
                                                                <strong>Error:</strong>{' '}
                                                                {delivery.error}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {delivery.status === 'failed' && (
                                                        <button
                                                            aria-label="Action button"
                                                            onClick={() =>
                                                                retryDelivery(delivery.id)
                                                            }
                                                            style={styles.retryButton}
                                                        >
                                                            <FaRedo className="mr-5" /> Retry
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

RoomWebhooksPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    roomSlug: PropTypes.string,
};
export default RoomWebhooksPanel;

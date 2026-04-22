/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { FaBell, FaPlus, FaTimes } from 'react-icons/fa';

import { toast } from 'react-toastify';

import confirmDialog from '../../utils/confirmDialog';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const CreateWebhookModal = ({ serverId, token, onClose, onCreated }) => {
    const { t } = useTranslation();

    const [name, setName] = useState('');

    const [channelId, setChannelId] = useState('');

    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch(`${API_BASE_URL}/servers/${serverId}/channels/`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())

            .then((data) => setChannels(data.channels || []))

            .catch(() => { });
    }, []);

    const handleCreate = async () => {
        if (!name || !channelId) {
            toast.warning(t('ui.tum_alanlari_doldurun'));

            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/servers/${serverId}/webhooks/`, {
                method: 'POST',

                headers: {
                    Authorization: `Bearer ${token}`,

                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ name, channel_id: channelId }),
            });

            if (response.ok) {
                toast.success(t('webhooks.created'));

                onCreated();
            }
        } catch (error) {
            toast.error(t('ui.webhook_olusturulamadi'));
        }
    };

    return (
        <div
            className="modal-overlay"
            role="button"
            tabIndex={0}
            onClick={(e) => e.target.className === 'modal-overlay' && onClose()}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()}
        >
            <div className="webhook-modal">
                <h3>
                    <FaPlus />
                    {t('create_new_webhook')}
                </h3>

                <div className="form-group">
                    <label>{t('webhook_name')}</label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={t('example_github_bot')}
                        aria-label={t('webhooks.nameInput', 'Webhook name')}
                    />
                </div>

                <div className="form-group">
                    <label>{t('channel')}</label>

                    <select value={channelId} onChange={(e) => setChannelId(e.target.value)}>
                        <option value="">{t('select_channel')}</option>

                        {channels.map((ch) => (
                            <option key={ch.id} value={ch.id}>
                                {ch.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>
                        {t('common.cancel')}
                    </button>

                    <button className="create-btn" onClick={handleCreate}>
                        {t('create')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const WebhooksView = ({ serverId, token }) => {
    const { t } = useTranslation();

    const [webhooks, setWebhooks] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchWebhooks();
    }, []);

    const fetchWebhooks = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/servers/${serverId}/webhooks/`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();

                setWebhooks(data.webhooks || []);
            }
        } catch (error) {
            logger.error('Error fetching webhooks:', error);
        }
    };

    const handleDeleteWebhook = async (webhookId) => {
        if (!(await confirmDialog(t('webhooks.deleteConfirm', 'Are you sure you want to delete this webhook?')))) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/servers/${serverId}/webhooks/${webhookId}/`,
                {
                    method: 'DELETE',

                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.ok) {
                toast.success(t('webhooks.deleted'));

                fetchWebhooks();
            }
        } catch (error) {
            toast.error(t('webhooks.deleteFailed'));
        }
    };

    return (
        <div className="webhooks-view">
            <div className="webhooks-header">
                <p>{t('webhooks_with_dış_servislerden_otomatik_messagelar_alın')}</p>

                <button className="create-webhook-btn" onClick={() => setShowCreateModal(true)}>
                    <FaPlus /> Yeni Webhook
                </button>
            </div>

            {webhooks.length === 0 ? (
                <div className="empty-state">
                    <FaBell />

                    <p>{t('not_yet_webhook_oluşturulmamış')}</p>
                </div>
            ) : (
                <div className="webhooks-list">
                    {webhooks.map((webhook) => (
                        <div key={webhook.id} className="webhook-item">
                            <div className="webhook-avatar">
                                {webhook.avatar ? <img src={webhook.avatar} alt="" /> : <FaBell />}
                            </div>

                            <div className="webhook-info">
                                <h4>{webhook.name}</h4>

                                <span className="webhook-channel">{webhook.channel_name}</span>

                                <div className="webhook-url">
                                    <code>{webhook.url.substring(0, 40)}...</code>

                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(webhook.url);

                                            toast.success(t('webhooks.urlCopied'));
                                        }}
                                    >
                                        {t('kopyala')}
                                    </button>
                                </div>
                            </div>

                            <div className="webhook-actions">
                                <button
                                    className="action-btn delete"
                                    onClick={() => handleDeleteWebhook(webhook.id)}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showCreateModal && (
                <CreateWebhookModal
                    serverId={serverId}
                    token={token}
                    onClose={() => setShowCreateModal(false)}
                    onCreated={() => {
                        fetchWebhooks();

                        setShowCreateModal(false);
                    }}
                />
            )}
        </div>
    );
};

WebhooksView.propTypes = {
    serverId: PropTypes.string,

    token: PropTypes.string,

    onClose: PropTypes.func,

    onCreated: PropTypes.func,
};

CreateWebhookModal.propTypes = {
    serverId: PropTypes.string,

    token: PropTypes.string,

    onClose: PropTypes.func,

    onCreated: PropTypes.func,
};

export default WebhooksView;

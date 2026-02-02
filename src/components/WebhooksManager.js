import React, { useState, useEffect } from 'react';
import './WebhooksManager.css';
import { FaPlug, FaTimes, FaPlus, FaTrash, FaEdit, FaCopy, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { getApiBase } from '../utils/apiEndpoints';

const WebhooksManager = ({ serverId, onClose }) => {
    const [webhooks, setWebhooks] = useState([]);
    const [channels, setChannels] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingWebhook, setEditingWebhook] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form state
    const [name, setName] = useState('');
    const [channelId, setChannelId] = useState('');
    const [avatar, setAvatar] = useState('');
    const [events, setEvents] = useState([]);

    const availableEvents = [
        { id: 'message_create', label: 'Message Sent', description: 'When a message is sent in the channel' },
        { id: 'message_delete', label: 'Message Deleted', description: 'When a message is deleted' },
        { id: 'message_edit', label: 'Message Edited', description: 'When a message is edited' },
        { id: 'member_join', label: 'Member Joined', description: 'When a member joins the server' },
        { id: 'member_leave', label: 'Member Left', description: 'When a member leaves the server' },
        { id: 'member_update', label: 'Member Updated', description: 'When a member profile is updated' },
        { id: 'role_create', label: 'Role Created', description: 'When a new role is created' },
        { id: 'role_delete', label: 'Role Deleted', description: 'When a role is deleted' },
        { id: 'channel_create', label: 'Channel Created', description: 'When a new channel is created' },
        { id: 'channel_delete', label: 'Channel Deleted', description: 'When a channel is deleted' },
        { id: 'ban_add', label: 'Member Banned', description: 'When a member is banned' },
        { id: 'ban_remove', label: 'Member Unbanned', description: 'When a member is unbanned' }
    ];

    useEffect(() => {
        fetchWebhooks();
        fetchChannels();
    }, [serverId]);

    const fetchWithAuth = async (url, options = {}) => {
        const token = localStorage.getItem('token');
        const response = await fetch(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    };

    const fetchWebhooks = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/webhooks/${serverId}/list/`);
            setWebhooks(data.webhooks || []);
        } catch (error) {
            console.error('Webhooks fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const data = await fetchWithAuth(`${getApiBase()}/servers/${serverId}/channels/`);
            setChannels(data.channels || []);
        } catch (error) {
            console.error('Channels fetch error:', error);
        }
    };

    const createWebhook = async () => {
        try {
            await fetchWithAuth(`${getApiBase()}/webhooks/${serverId}/create/`, {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    channel_id: channelId,
                    avatar_url: avatar,
                    events
                })
            });
            showToast('Webhook created!');
            resetForm();
            setShowCreateModal(false);
            fetchWebhooks();
        } catch (error) {
            console.error('Webhook creation error:', error);
            showToast('Failed to create webhook', 'error');
        }
    };

    const updateWebhook = async (webhookId) => {
        try {
            await fetchWithAuth(`${getApiBase()}/webhooks/${serverId}/${webhookId}/update/`, {
                method: 'PUT',
                body: JSON.stringify({
                    name,
                    channel_id: channelId,
                    avatar_url: avatar,
                    events
                })
            });
            showToast('Webhook updated!');
            resetForm();
            setEditingWebhook(null);
            fetchWebhooks();
        } catch (error) {
            console.error('Webhook update error:', error);
            showToast('Failed to update webhook', 'error');
        }
    };

    const deleteWebhook = async (webhookId) => {
        if (!window.confirm('Are you sure you want to delete this webhook?')) return;

        try {
            await fetchWithAuth(`${getApiBase()}/webhooks/${serverId}/${webhookId}/delete/`, {
                method: 'DELETE'
            });
            showToast('Webhook deleted!');
            fetchWebhooks();
        } catch (error) {
            console.error('Webhook deletion error:', error);
            showToast('Failed to delete webhook', 'error');
        }
    };

    const testWebhook = async (webhookId) => {
        try {
            await fetchWithAuth(`${getApiBase()}/webhooks/${serverId}/${webhookId}/test/`, {
                method: 'POST',
                body: JSON.stringify({
                    content: '🔔 This is a test message from your webhook!',
                    embeds: [{
                        title: 'Webhook Test',
                        description: 'Your webhook is working correctly!',
                        color: 9055487,
                        timestamp: new Date().toISOString()
                    }]
                })
            });
            showToast('Test message sent!');
        } catch (error) {
            console.error('Webhook test error:', error);
            showToast('Failed to send test message', 'error');
        }
    };

    const copyWebhookUrl = async (webhookUrl) => {
        try {
            await navigator.clipboard.writeText(webhookUrl);
            showToast('Webhook URL copied!');
        } catch (error) {
            console.error('Copy error:', error);
            showToast('Failed to copy URL', 'error');
        }
    };

    const resetForm = () => {
        setName('');
        setChannelId('');
        setAvatar('');
        setEvents([]);
    };

    const openEditModal = (webhook) => {
        setEditingWebhook(webhook);
        setName(webhook.name);
        setChannelId(webhook.channel_id);
        setAvatar(webhook.avatar_url || '');
        setEvents(webhook.events || []);
    };

    const toggleEvent = (eventId) => {
        if (events.includes(eventId)) {
            setEvents(events.filter(e => e !== eventId));
        } else {
            setEvents([...events, eventId]);
        }
    };

    const showToast = (message, type = 'success') => {
        console.log(`[${type}] ${message}`);
    };

    if (loading) {
        return (
            <div className="webhooks-overlay">
                <div className="webhooks-panel loading">
                    <div className="spinner" />
                    <p>Loading Webhooks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="webhooks-overlay">
            <div className="webhooks-panel">
                <div className="panel-header">
                    <div>
                        <h2><FaPlug /> Webhooks</h2>
                        <p className="webhook-count">{webhooks.length} webhook{webhooks.length !== 1 ? 's' : ''}</p>
                    </div>
                    <button onClick={onClose} className="btn-close">
                        <FaTimes />
                    </button>
                </div>

                <div className="panel-actions">
                    <button onClick={() => setShowCreateModal(true)} className="btn-create">
                        <FaPlus /> Create Webhook
                    </button>
                </div>

                <div className="webhooks-content">
                    {webhooks.length === 0 ? (
                        <div className="empty-state">
                            <FaPlug size={64} />
                            <h3>No Webhooks Yet</h3>
                            <p>Create a webhook to send automated messages to your channels</p>
                            <button onClick={() => setShowCreateModal(true)} className="btn-create-large">
                                <FaPlus /> Create Your First Webhook
                            </button>
                        </div>
                    ) : (
                        <div className="webhooks-list">
                            {webhooks.map(webhook => (
                                <div key={webhook.id} className="webhook-card">
                                    <div className="webhook-avatar">
                                        {webhook.avatar_url ? (
                                            <img src={webhook.avatar_url} alt={webhook.name} />
                                        ) : (
                                            <div className="default-avatar">
                                                <FaPlug />
                                            </div>
                                        )}
                                    </div>

                                    <div className="webhook-info">
                                        <h3>{webhook.name}</h3>
                                        <p className="webhook-channel">
                                            #{channels.find(c => c.id === webhook.channel_id)?.name || 'Unknown Channel'}
                                        </p>
                                        <div className="webhook-events">
                                            {webhook.events?.slice(0, 3).map(event => (
                                                <span key={event} className="event-badge">
                                                    {availableEvents.find(e => e.id === event)?.label || event}
                                                </span>
                                            ))}
                                            {webhook.events?.length > 3 && (
                                                <span className="event-badge more">+{webhook.events.length - 3} more</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="webhook-url">
                                        <code>{webhook.url}</code>
                                        <button onClick={() => copyWebhookUrl(webhook.url)} className="btn-copy">
                                            <FaCopy /> Copy
                                        </button>
                                    </div>

                                    <div className="webhook-actions">
                                        <button onClick={() => testWebhook(webhook.id)} className="btn-test">
                                            <FaPaperPlane /> Test
                                        </button>
                                        <button onClick={() => openEditModal(webhook)} className="btn-edit">
                                            <FaEdit /> Edit
                                        </button>
                                        <button onClick={() => deleteWebhook(webhook.id)} className="btn-delete">
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Create/Edit Modal */}
                {(showCreateModal || editingWebhook) && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>{editingWebhook ? 'Edit Webhook' : 'Create Webhook'}</h3>
                                <button onClick={() => { setShowCreateModal(false); setEditingWebhook(null); resetForm(); }}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Webhook Name *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., GitHub Bot"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Channel *</label>
                                    <select value={channelId} onChange={(e) => setChannelId(e.target.value)}>
                                        <option value="">Select a channel...</option>
                                        {channels.filter(c => c.type === 'text').map(channel => (
                                            <option key={channel.id} value={channel.id}>
                                                #{channel.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Avatar URL (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Events to Subscribe *</label>
                                    <div className="events-grid">
                                        {availableEvents.map(event => (
                                            <div
                                                key={event.id}
                                                className={`event-option ${events.includes(event.id) ? 'selected' : ''}`}
                                                onClick={() => toggleEvent(event.id)}
                                            >
                                                <div className="event-checkbox">
                                                    {events.includes(event.id) && <FaCheck />}
                                                </div>
                                                <div className="event-details">
                                                    <h4>{event.label}</h4>
                                                    <p>{event.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button onClick={() => { setShowCreateModal(false); setEditingWebhook(null); resetForm(); }} className="btn-cancel">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => editingWebhook ? updateWebhook(editingWebhook.id) : createWebhook()}
                                    className="btn-submit"
                                    disabled={!name || !channelId || events.length === 0}
                                >
                                    {editingWebhook ? 'Update Webhook' : 'Create Webhook'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WebhooksManager;

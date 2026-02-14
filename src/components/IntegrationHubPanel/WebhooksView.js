import React, { useState, useEffect } from 'react';
import { FaBell, FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import confirmDialog from '../../utils/confirmDialog';

const CreateWebhookModal = ({ serverId, token, onClose, onCreated }) => {
    const [name, setName] = useState('');
    const [channelId, setChannelId] = useState('');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        fetch(`/api/servers/${serverId}/channels/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setChannels(data.channels || []))
            .catch(() => { });
    }, []);

    const handleCreate = async () => {
        if (!name || !channelId) {
            toast.warning('Tüm alanları doldurun');
            return;
        }

        try {
            const response = await fetch(`/api/servers/${serverId}/webhooks/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, channel_id: channelId })
            });

            if (response.ok) {
                toast.success('Webhook oluşturuldu');
                onCreated();
            }
        } catch (error) {
            toast.error('Webhook oluşturulamadı');
        }
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target.className === 'modal-overlay' && onClose()}>
            <div className="webhook-modal">
                <h3><FaPlus /> Yeni Webhook Oluştur</h3>

                <div className="form-group">
                    <label>Webhook Adı</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="örn: GitHub Bot"
                    />
                </div>

                <div className="form-group">
                    <label>Kanal</label>
                    <select value={channelId} onChange={(e) => setChannelId(e.target.value)}>
                        <option value="">Kanal seçin...</option>
                        {channels.map(ch => (
                            <option key={ch.id} value={ch.id}>#{ch.name}</option>
                        ))}
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="cancel-btn" onClick={onClose}>İptal</button>
                    <button className="create-btn" onClick={handleCreate}>Oluştur</button>
                </div>
            </div>
        </div>
    );
};

const WebhooksView = ({ serverId, token }) => {
    const [webhooks, setWebhooks] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        fetchWebhooks();
    }, []);

    const fetchWebhooks = async () => {
        try {
            const response = await fetch(`/api/servers/${serverId}/webhooks/`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setWebhooks(data.webhooks || []);
            }
        } catch (error) {
            console.error('Error fetching webhooks:', error);
        }
    };

    const handleDeleteWebhook = async (webhookId) => {
        if (!await confirmDialog('Bu webhook\'u silmek istediğinize emin misiniz?')) return;

        try {
            const response = await fetch(`/api/servers/${serverId}/webhooks/${webhookId}/`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                toast.success('Webhook silindi');
                fetchWebhooks();
            }
        } catch (error) {
            toast.error('Webhook silinemedi');
        }
    };

    return (
        <div className="webhooks-view">
            <div className="webhooks-header">
                <p>Webhooks ile dış servislerden otomatik mesajlar alın</p>
                <button className="create-webhook-btn" onClick={() => setShowCreateModal(true)}>
                    <FaPlus /> Yeni Webhook
                </button>
            </div>

            {webhooks.length === 0 ? (
                <div className="empty-state">
                    <FaBell />
                    <p>Henüz webhook oluşturulmamış</p>
                </div>
            ) : (
                <div className="webhooks-list">
                    {webhooks.map(webhook => (
                        <div key={webhook.id} className="webhook-item">
                            <div className="webhook-avatar">
                                {webhook.avatar ? (
                                    <img src={webhook.avatar} alt="" />
                                ) : (
                                    <FaBell />
                                )}
                            </div>
                            <div className="webhook-info">
                                <h4>{webhook.name}</h4>
                                <span className="webhook-channel">#{webhook.channel_name}</span>
                                <div className="webhook-url">
                                    <code>{webhook.url.substring(0, 40)}...</code>
                                    <button onClick={() => {
                                        navigator.clipboard.writeText(webhook.url);
                                        toast.success('URL kopyalandı');
                                    }}>Kopyala</button>
                                </div>
                            </div>
                            <div className="webhook-actions">
                                <button className="action-btn delete" onClick={() => handleDeleteWebhook(webhook.id)}>
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

export default WebhooksView;

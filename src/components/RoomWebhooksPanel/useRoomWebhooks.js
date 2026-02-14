import { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

export const eventTypes = [
    'message.created', 'message.updated', 'message.deleted',
    'member.joined', 'member.left', 'member.updated',
    'channel.created', 'channel.updated', 'channel.deleted',
    'role.created', 'role.updated', 'role.deleted'
];

const useRoomWebhooks = (fetchWithAuth, apiBaseUrl, roomSlug) => {
    const [webhooks, setWebhooks] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedWebhook, setSelectedWebhook] = useState(null);
    const [newWebhook, setNewWebhook] = useState({ name: '', url: '', events: [] });

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

    return {
        webhooks,
        deliveries,
        loading,
        showCreateForm, setShowCreateForm,
        selectedWebhook,
        newWebhook, setNewWebhook,
        fetchDeliveries,
        createWebhook,
        deleteWebhook,
        retryDelivery,
        toggleEvent
    };
};

export default useRoomWebhooks;

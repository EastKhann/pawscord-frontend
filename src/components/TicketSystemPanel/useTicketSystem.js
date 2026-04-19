import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import logger from '../../utils/logger';

const useTicketSystem = (serverId) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();
    const authHeader = () => ({
        Authorization: `Bearer ${getToken()}`,
    });

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [config, setConfig] = useState({
        enabled: false,
        category_id: '',
        support_role_id: '',
        max_tickets_per_user: 3,
        auto_close_after: 48,
        transcript_channel_id: '',
        welcome_message: 'Hello! Our support team will assist you as soon as possible.',
    });
    const [categories, setCategories] = useState([]);
    const [roles, setRoles] = useState([]);
    const [channels, setChannels] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [newMessage, setNewMessage] = useState('');

    const fetchConfig = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/config/`, {
                headers: authHeader(),
            });
            if (response.ok) setConfig(await response.json());
        } catch (error) {
            logger.error('Error fetching config:', error);
        }
    };

    const fetchTickets = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/`, {
                headers: authHeader(),
            });
            if (response.ok) setTickets(await response.json());
        } catch (error) {
            logger.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/categories/`, {
                headers: authHeader(),
            });
            if (response.ok) setCategories(await response.json());
        } catch (error) {
            logger.error('Error fetching categories:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
                headers: authHeader(),
            });
            if (response.ok) setRoles(await response.json());
        } catch (error) {
            logger.error('Error fetching roles:', error);
        }
    };

    const fetchChannels = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
                headers: authHeader(),
            });
            if (response.ok) {
                const data = await response.json();
                setChannels(data.filter((ch) => ch.type === 'text'));
            }
        } catch (error) {
            logger.error('Error fetching channels:', error);
        }
    };

    useEffect(() => {
        fetchConfig();
        fetchTickets();
        fetchCategories();
        fetchRoles();
        fetchChannels();
    }, [serverId]);

    const updateConfig = async () => {
        try {
            const response = await fetch(
                `${apiBaseUrl}/tickets/server/${serverId}/config/update/`,
                {
                    method: 'POST',
                    headers: { ...authHeader(), 'Content-Type': 'application/json' },
                    body: JSON.stringify(config),
                }
            );
            if (response.ok) toast.success(t('ticket.settingsSaved'));
            else toast.error(t('ticket.settingsFailed'));
        } catch (error) {
            logger.error('Error updating config:', error);
            toast.error(t('ticket.connectionError'));
        }
    };

    const closeTicket = async (ticketId) => {
        if (!(await confirmDialog('Bu bileti kapatmak istediğinizden emin misiniz?'))) return;
        try {
            const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/close/`, {
                method: 'POST',
                headers: authHeader(),
            });
            if (response.ok) {
                toast.success(t('ticket.closed'));
                fetchTickets();
                if (selectedTicket?.id === ticketId) setSelectedTicket(null);
            } else {
                toast.error(t('ticket.closeFailed'));
            }
        } catch (error) {
            logger.error('Error closing ticket:', error);
            toast.error(t('ticket.connectionError'));
        }
    };

    const assignTicket = async (ticketId, userId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/assign/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId }),
            });
            if (response.ok) {
                toast.success(t('ticket.assigned'));
                fetchTickets();
            } else toast.error(t('ticket.assignFailed'));
        } catch (error) {
            logger.error('Error assigning ticket:', error);
            toast.error(t('ticket.connectionError'));
        }
    };

    const setPriority = async (ticketId, priority) => {
        try {
            const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/priority/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ priority }),
            });
            if (response.ok) {
                toast.success(t('ticket.priorityUpdated'));
                fetchTickets();
            } else toast.error(t('ticket.priorityFailed'));
        } catch (error) {
            logger.error('Error setting priority:', error);
            toast.error(t('ticket.connectionError'));
        }
    };

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            const response = await fetch(`${apiBaseUrl}/tickets/${selectedTicket.id}/reply/`, {
                method: 'POST',
                headers: { ...authHeader(), 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: newMessage }),
            });
            if (response.ok) {
                const data = await response.json();
                setSelectedTicket({
                    ...selectedTicket,
                    messages: [...(selectedTicket.messages || []), data.message],
                });
                setNewMessage('');
                toast.success(t('ticket.messageSent'));
            } else {
                toast.error(t('ticket.messageFailed'));
            }
        } catch (error) {
            logger.error('Error sending message:', error);
            toast.error(t('ticket.connectionError'));
        }
    };

    const exportTranscript = async (ticketId) => {
        try {
            const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/transcript/`, {
                headers: authHeader(),
            });
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ticket-${ticketId}-transcript.txt`;
                a.click();
                toast.success(t('ticket.transcriptDownloaded'));
            } else {
                toast.error(t('ticket.transcriptFailed'));
            }
        } catch (error) {
            logger.error('Error exporting transcript:', error);
            toast.error(t('ticket.connectionError'));
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            open: { text: 'Open', color: '#10b981' },
            assigned: { text: 'Assigned', color: '#f59e0b' },
            closed: { text: 'Closed', color: '#6b7280' },
        };
        return badges[status] || badges.open;
    };

    const getPriorityBadge = (priority) => {
        const badges = {
            low: { text: 'Low', color: '#10b981' },
            medium: { text: 'Orta', color: '#f59e0b' },
            high: { text: 'High', color: '#f23f42' },
            urgent: { text: 'Acil', color: '#dc2626' },
        };
        return badges[priority] || badges.medium;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return {
        tickets,
        loading,
        config,
        setConfig,
        categories,
        roles,
        channels,
        selectedTicket,
        setSelectedTicket,
        newMessage,
        setNewMessage,
        updateConfig,
        closeTicket,
        assignTicket,
        setPriority,
        sendMessage,
        exportTranscript,
        getStatusBadge,
        getPriorityBadge,
        formatDate,
    };
};

export default useTicketSystem;

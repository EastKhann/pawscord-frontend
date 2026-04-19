import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getToken } from '../../utils/tokenStorage';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import { formatTimeRemaining } from '../../utils/dateFormatters';
import logger from '../../utils/logger';

export const INITIAL_GIVEAWAY = {
    title: '',
    description: '',
    prize: '',
    channel_id: '',
    winners_count: 1,
    duration: 3600,
    required_role_id: '',
    required_messages: 0,
    required_invites: 0,
    allow_multiple_entries: false,
};

export const DURATION_OPTIONS = [
    { value: 1800, label: '30 minute' },
    { value: 3600, label: '1 hour' },
    { value: 10800, label: '3 hour' },
    { value: 21600, label: '6 hour' },
    { value: 43200, label: '12 hour' },
    { value: 86400, label: '1 day' },
    { value: 172800, label: '2 day' },
    { value: 259200, label: '3 day' },
    { value: 604800, label: '1 week' },
];

export const getStatusBadge = (status) => {
    const badges = {
        active: { text: 'Active', color: '#10b981' },
        ended: { text: 'Ended', color: '#6b7280' },
        cancelled: { text: 'Cancel', color: '#f23f42' },
    };
    return badges[status] || badges.active;
};

// Re-export for backward compatibility with GiveawayCard imports
export { formatTimeRemaining } from '../../utils/dateFormatters';

const useGiveaways = (serverId) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();
    const [giveaways, setGiveaways] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [channels, setChannels] = useState([]);
    const [roles, setRoles] = useState([]);
    const [newGiveaway, setNewGiveaway] = useState(INITIAL_GIVEAWAY);

    const authHeaders = { Authorization: `Bearer ${getToken()}` };

    const fetchGiveaways = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/giveaways/server/${serverId}/`, {
                headers: authHeaders,
            });
            if (r.ok) setGiveaways(await r.json());
        } catch (e) {
            logger.error('Error fetching giveaways:', e);
        } finally {
            setLoading(false);
        }
    };

    const fetchChannels = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
                headers: authHeaders,
            });
            if (r.ok) {
                const d = await r.json();
                setChannels(d.filter((ch) => ch.type === 'text'));
            }
        } catch (e) {
            logger.error('Error fetching channels:', e);
        }
    };

    const fetchRoles = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
                headers: authHeaders,
            });
            if (r.ok) setRoles(await r.json());
        } catch (e) {
            logger.error('Error fetching roles:', e);
        }
    };

    useEffect(() => {
        fetchGiveaways();
        fetchChannels();
        fetchRoles();
    }, [serverId]);

    const createGiveaway = async () => {
        if (!newGiveaway.title || !newGiveaway.prize || !newGiveaway.channel_id) {
            toast.error(t('giveaways.fieldsRequired'));
            return;
        }
        try {
            const r = await fetch(`${apiBaseUrl}/giveaways/create/`, {
                method: 'POST',
                headers: { ...authHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: serverId, ...newGiveaway }),
            });
            if (r.ok) {
                toast.success(t('giveaways.created'));
                setShowCreateModal(false);
                fetchGiveaways();
                setNewGiveaway(INITIAL_GIVEAWAY);
            } else {
                toast.error(t('giveaways.createFailed'));
            }
        } catch (e) {
            logger.error('Error creating giveaway:', e);
            toast.error(t('giveaways.connectionError'));
        }
    };

    const endGiveaway = async (id) => {
        if (!(await confirmDialog('Bu çekilişi sonlandırmak istediğinizden emin misiniz?'))) return;
        try {
            const r = await fetch(`${apiBaseUrl}/giveaways/${id}/end/`, {
                method: 'POST',
                headers: authHeaders,
            });
            if (r.ok) {
                const d = await r.json();
                toast.success(t('giveaways.ended', { winners: d.winners.join(', ') }));
                fetchGiveaways();
            } else toast.error(t('giveaways.endFailed'));
        } catch (e) {
            logger.error('Error ending giveaway:', e);
            toast.error(t('giveaways.connectionError'));
        }
    };

    const rerollGiveaway = async (id) => {
        try {
            const r = await fetch(`${apiBaseUrl}/giveaways/${id}/reroll/`, {
                method: 'POST',
                headers: authHeaders,
            });
            if (r.ok) {
                const d = await r.json();
                toast.success(t('giveaways.rerolled', { winner: d.new_winner }));
                fetchGiveaways();
            } else toast.error(t('giveaways.rerollFailed'));
        } catch (e) {
            logger.error('Error rerolling giveaway:', e);
            toast.error(t('giveaways.connectionError'));
        }
    };

    const deleteGiveaway = async (id) => {
        if (!(await confirmDialog('Bu çekilişi silmek istediğinizden emin misiniz?'))) return;
        try {
            const r = await fetch(`${apiBaseUrl}/giveaways/${id}/delete/`, {
                method: 'DELETE',
                headers: authHeaders,
            });
            if (r.ok) {
                toast.success(t('giveaways.deleted'));
                fetchGiveaways();
            } else toast.error(t('giveaways.deleteFailed'));
        } catch (e) {
            logger.error('Error deleting giveaway:', e);
            toast.error(t('giveaways.connectionError'));
        }
    };

    return {
        giveaways,
        loading,
        showCreateModal,
        setShowCreateModal,
        channels,
        roles,
        newGiveaway,
        setNewGiveaway,
        createGiveaway,
        endGiveaway,
        rerollGiveaway,
        deleteGiveaway,
    };
};

export default useGiveaways;

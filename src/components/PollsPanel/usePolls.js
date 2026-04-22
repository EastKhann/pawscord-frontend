import { useState, useEffect } from 'react';
import { getToken } from '../../utils/tokenStorage';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';
import { formatTimeRemaining } from '../../utils/dateFormatters';
import logger from '../../utils/logger';

export const INITIAL_POLL = {
    question: '',
    channel_id: '',
    duration: 86400,
    allow_multiple_choices: false,
    anonymous: false,
    options: ['', ''],
};

export const DURATION_OPTIONS = [
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
    };
    return badges[status] || badges.active;
};

// Re-export for backward compatibility with PollCard imports
export { formatTimeRemaining } from '../../utils/dateFormatters';

export const calculatePercentage = (votes, totalVotes) =>
    totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);

const usePolls = (serverId) => {
    const { t } = useTranslation();
    const apiBaseUrl = getApiBase();
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [channels, setChannels] = useState([]);
    const [newPoll, setNewPoll] = useState(INITIAL_POLL);

    const authHeaders = { Authorization: `Bearer ${getToken()}` };

    useEffect(() => {
        fetchPolls();
        fetchChannels();
    }, [serverId]);

    const fetchPolls = async () => {
        try {
            const r = await fetch(`${apiBaseUrl}/polls/server/${serverId}/`, {
                headers: authHeaders,
            });
            if (r.ok) setPolls(await r.json());
        } catch (e) {
            logger.error('Error fetching polls:', e);
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

    const createPoll = async () => {
        const validOptions = newPoll.options.filter((o) => o.trim());
        if (!newPoll.question || !newPoll.channel_id) {
            toast.error(t('ui.please_select_question_and_channel'));
            return;
        }
        if (validOptions.length < 2) {
            toast.error(t('ui.en_az_2_secenek_gerekli'));
            return;
        }
        try {
            const r = await fetch(`${apiBaseUrl}/polls/create/`, {
                method: 'POST',
                headers: { ...authHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    question: newPoll.question,
                    channel_id: newPoll.channel_id,
                    duration: newPoll.duration,
                    allow_multiple_choices: newPoll.allow_multiple_choices,
                    anonymous: newPoll.anonymous,
                    options: validOptions,
                }),
            });
            if (r.ok) {
                toast.success(t('polls.created'));
                setShowCreateModal(false);
                fetchPolls();
                setNewPoll(INITIAL_POLL);
            } else toast.error(t('ui.poll_olusturulamadi_2'));
        } catch (e) {
            logger.error('Error creating poll:', e);
            toast.error(t('polls.connectionError'));
        }
    };

    const vote = async (pollId, optionId) => {
        try {
            const r = await fetch(`${apiBaseUrl}/polls/${pollId}/vote/`, {
                method: 'POST',
                headers: { ...authHeaders, 'Content-Type': 'application/json' },
                body: JSON.stringify({ option_id: optionId }),
            });
            if (r.ok) {
                toast.success(t('polls.voteRecorded'));
                fetchPolls();
            } else {
                const d = await r.json();
                toast.error(d.error ? `❌ ${d.error}` : t('polls.voteFailed'));
            }
        } catch (e) {
            logger.error('Error voting:', e);
            toast.error(t('polls.connectionError'));
        }
    };

    const endPoll = async (pollId) => {
        if (!(await confirmDialog(t('poll.endConfirm','Are you sure you want to end this poll?')))) return;
        try {
            const r = await fetch(`${apiBaseUrl}/polls/${pollId}/end/`, {
                method: 'POST',
                headers: authHeaders,
            });
            if (r.ok) {
                toast.success(t('ui.poll_sonlandirildi'));
                fetchPolls();
            } else toast.error(t('ui.poll_sonlandirilamadi'));
        } catch (e) {
            logger.error('Error ending poll:', e);
            toast.error(t('polls.connectionError'));
        }
    };

    const deletePoll = async (pollId) => {
        if (!(await confirmDialog(t('poll.deleteConfirm','Are you sure you want to delete this poll?')))) return;
        try {
            const r = await fetch(`${apiBaseUrl}/polls/${pollId}/delete/`, {
                method: 'DELETE',
                headers: authHeaders,
            });
            if (r.ok) {
                toast.success(t('polls.deleted'));
                fetchPolls();
            } else toast.error(t('polls.deleteFailed'));
        } catch (e) {
            logger.error('Error deleting poll:', e);
            toast.error(t('polls.connectionError'));
        }
    };

    const addOption = () => {
        if (newPoll.options.length < 10)
            setNewPoll({ ...newPoll, options: [...newPoll.options, ''] });
        else toast.warning(t('polls.maxOptions'));
    };
    const removeOption = (i) => {
        if (newPoll.options.length > 2)
            setNewPoll({ ...newPoll, options: newPoll.options.filter((_, idx) => idx !== i) });
    };
    const updateOption = (i, v) => {
        const opts = [...newPoll.options];
        opts[i] = v;
        setNewPoll({ ...newPoll, options: opts });
    };

    return {
        polls,
        loading,
        showCreateModal,
        setShowCreateModal,
        channels,
        newPoll,
        setNewPoll,
        createPoll,
        vote,
        endPoll,
        deletePoll,
        addOption,
        removeOption,
        updateOption,
    };
};

export default usePolls;

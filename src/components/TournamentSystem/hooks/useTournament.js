import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../../utils/toast';
import logger from '../../../utils/logger';
import confirmDialog from '../../../utils/confirmDialog';

export const useTournament = ({ fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [tournaments, setTournaments] = useState([]);
    const [activeTournament, setActiveTournament] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filter, setFilter] = useState('all');

    const loadTournaments = async (currentFilter) => {
        try {
            const f = currentFilter || filter;
            const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/?filter=${f}`);
            if (res.ok) {
                const data = await res.json();
                setTournaments(data.tournaments || []);
            }
        } catch (error) {
            logger.error('Tournament load error:', error);
        }
    };

    const createTournament = async (tournamentData) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tournamentData),
            });

            if (res.ok) {
                const data = await res.json();
                setTournaments([data.tournament, ...tournaments]);
                setShowCreateModal(false);
            }
        } catch (error) {
            logger.error('Tournament create error:', error);
        }
    };

    const joinTournament = async (tournamentId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournamentId}/join/`, {
                method: 'POST',
            });

            if (res.ok) {
                toast.success(t('tournament.joined'));
                loadTournaments();
            }
        } catch (error) {
            logger.error('Join error:', error);
        }
    };

    const leaveTournament = async (tournamentId) => {
        if (!(await confirmDialog(t('tournament.leaveConfirm')))) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournamentId}/leave/`, {
                method: 'POST',
            });
            loadTournaments();
        } catch (error) {
            logger.error('Leave error:', error);
        }
    };

    return {
        tournaments,
        activeTournament,
        setActiveTournament,
        showCreateModal,
        setShowCreateModal,
        filter,
        setFilter,
        loadTournaments,
        createTournament,
        joinTournament,
        leaveTournament,
    };
};

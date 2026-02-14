import { useState } from 'react';
import toast from '../../../utils/toast';

export const useTournament = ({ fetchWithAuth, apiBaseUrl }) => {
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
            console.error('Tournament load error:', error);
        }
    };

    const createTournament = async (tournamentData) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(tournamentData)
            });

            if (res.ok) {
                const data = await res.json();
                setTournaments([data.tournament, ...tournaments]);
                setShowCreateModal(false);
            }
        } catch (error) {
            console.error('Tournament create error:', error);
        }
    };

    const joinTournament = async (tournamentId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournamentId}/join/`, {
                method: 'POST'
            });

            if (res.ok) {
                toast.success('\u2705 Turnuvaya kat\u0131ld\u0131n\u0131z!');
                loadTournaments();
            }
        } catch (error) {
            console.error('Join error:', error);
        }
    };

    const leaveTournament = async (tournamentId) => {
        if (!confirm('Turnuvadan ayr\u0131lmak istedi\u011Finize emin misiniz?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournamentId}/leave/`, {
                method: 'POST'
            });
            loadTournaments();
        } catch (error) {
            console.error('Leave error:', error);
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
        leaveTournament
    };
};

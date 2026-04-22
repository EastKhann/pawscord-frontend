// frontend/src/components/TournamentSystem.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTrophy, FaPlus, FaTimes } from 'react-icons/fa';
import { useTournament } from '../TournamentSystem/hooks/useTournament';
import TournamentCard from '../TournamentSystem/TournamentCard';
import CreateTournamentModal from '../TournamentSystem/CreateTournamentModal';
import TournamentDetailModal from '../TournamentSystem/TournamentDetailModal';
import styles from '../TournamentSystem/styles';
import { useTranslation } from 'react-i18next';

const TournamentSystem = ({ onClose, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const {
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
    } = useTournament({ fetchWithAuth, apiBaseUrl });

    useEffect(() => {
        loadTournaments();
    }, [filter]);

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaTrophy size={24} color="#f0b232" />
                        <h2 style={styles.title}>Turnuvalar</h2>
                    </div>
                    <div style={styles.headerActions}>
                        <button
                            aria-label={t('common.create')}
                            onClick={() => setShowCreateModal(true)}
                            style={styles.createButton}
                        >
                            <FaPlus size={14} />
                            <span>Yeni Turnuva</span>
                        </button>
                        <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>

                <div style={styles.filters}>
                    {['all', 'active', 'upcoming', 'completed'].map((f) => (
                        <button
                            aria-label={t('tournament.joinTournament', 'Join tournament')}
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                ...styles.filterButton,
                                backgroundColor: filter === f ? '#5865f2' : '#111214',
                            }}
                        >
                            {f === 'all'
                                ? 'All'
                                : f === 'active'
                                    ? 'Active'
                                    : f === 'upcoming'
                                        ? t('ui.yaklasan')
                                        : 'Completed'}
                        </button>
                    ))}
                </div>

                <div style={styles.content}>
                    {tournaments.length === 0 ? (
                        <div style={styles.empty}>
                            <FaTrophy size={48} color="#4e5058" />
                            <p>Hen�z turnuva yok</p>
                        </div>
                    ) : (
                        <div style={styles.tournamentGrid}>
                            {tournaments.map((tournament) => (
                                <TournamentCard
                                    key={tournament.id}
                                    tournament={tournament}
                                    currentUser={currentUser}
                                    onJoin={() => joinTournament(tournament.id)}
                                    onLeave={() => leaveTournament(tournament.id)}
                                    onView={() => setActiveTournament(tournament)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {showCreateModal && (
                    <CreateTournamentModal
                        onClose={() => setShowCreateModal(false)}
                        onCreate={createTournament}
                    />
                )}

                {activeTournament && (
                    <TournamentDetailModal
                        tournament={activeTournament}
                        onClose={() => setActiveTournament(null)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />
                )}
            </div>
        </div>
    );
};

TournamentSystem.propTypes = {
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    currentUser: PropTypes.object,
};
export default TournamentSystem;

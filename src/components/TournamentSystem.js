// frontend/src/components/TournamentSystem.js
import { useEffect } from 'react';
import { FaTrophy, FaPlus, FaTimes } from 'react-icons/fa';
import { useTournament } from './TournamentSystem/hooks/useTournament';
import TournamentCard from './TournamentSystem/TournamentCard';
import CreateTournamentModal from './TournamentSystem/CreateTournamentModal';
import TournamentDetailModal from './TournamentSystem/TournamentDetailModal';
import styles from './TournamentSystem/styles';

const TournamentSystem = ({ onClose, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const {
        tournaments, activeTournament, setActiveTournament,
        showCreateModal, setShowCreateModal, filter, setFilter,
        loadTournaments, createTournament, joinTournament, leaveTournament
    } = useTournament({ fetchWithAuth, apiBaseUrl });

    useEffect(() => { loadTournaments(); }, [filter]);

    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaTrophy size={24} color="#faa61a" />
                        <h2 style={styles.title}>Turnuvalar</h2>
                    </div>
                    <div style={styles.headerActions}>
                        <button onClick={() => setShowCreateModal(true)} style={styles.createButton}>
                            <FaPlus size={14} />
                            <span>Yeni Turnuva</span>
                        </button>
                        <button onClick={onClose} style={styles.closeButton}>
                            <FaTimes size={20} />
                        </button>
                    </div>
                </div>

                <div style={styles.filters}>
                    {['all', 'active', 'upcoming', 'completed'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                ...styles.filterButton,
                                backgroundColor: filter === f ? '#5865f2' : '#2f3136'
                            }}
                        >
                            {f === 'all' ? 'T\u00FCm\u00FC' : f === 'active' ? 'Aktif' : f === 'upcoming' ? 'Yakla\u015Fan' : 'Tamamlanan'}
                        </button>
                    ))}
                </div>

                <div style={styles.content}>
                    {tournaments.length === 0 ? (
                        <div style={styles.empty}>
                            <FaTrophy size={48} color="#4e5058" />
                            <p>Hen\u00FCz turnuva yok</p>
                        </div>
                    ) : (
                        <div style={styles.tournamentGrid}>
                            {tournaments.map(tournament => (
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

export default TournamentSystem;




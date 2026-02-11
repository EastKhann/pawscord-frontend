// frontend/src/components/TournamentSystem.js
import { useState, useEffect } from 'react';
import toast from '../utils/toast';
import { FaTrophy, FaPlus, FaUsers, FaClock, FaCheck, FaTimes } from 'react-icons/fa';

const TournamentSystem = ({ onClose, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [tournaments, setTournaments] = useState([]);
    const [activeTournament, setActiveTournament] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filter, setFilter] = useState('all'); // all, active, upcoming, completed

    useEffect(() => {
        loadTournaments();
    }, [filter]);

    const loadTournaments = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/?filter=${filter}`);
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
                toast.success('✅ Turnuvaya katıldınız!');
                loadTournaments();
            }
        } catch (error) {
            console.error('Join error:', error);
        }
    };

    const leaveTournament = async (tournamentId) => {
        if (!confirm('Turnuvadan ayrılmak istediğinize emin misiniz?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournamentId}/leave/`, {
                method: 'POST'
            });
            loadTournaments();
        } catch (error) {
            console.error('Leave error:', error);
        }
    };

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

                {/* Filters */}
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
                            {f === 'all' ? 'Tümü' : f === 'active' ? 'Aktif' : f === 'upcoming' ? 'Yaklaşan' : 'Tamamlanan'}
                        </button>
                    ))}
                </div>

                {/* Tournament List */}
                <div style={styles.content}>
                    {tournaments.length === 0 ? (
                        <div style={styles.empty}>
                            <FaTrophy size={48} color="#4e5058" />
                            <p>Henüz turnuva yok</p>
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

const TournamentCard = ({ tournament, currentUser, onJoin, onLeave, onView }) => {
    const isParticipant = tournament.participants?.some(p => p.username === currentUser);
    const isFull = tournament.participants?.length >= tournament.max_participants;
    const isActive = tournament.status === 'active';
    const isCompleted = tournament.status === 'completed';

    return (
        <div style={styles.tournamentCard}>
            <div style={styles.cardHeader}>
                <div style={styles.tournamentName}>{tournament.name}</div>
                <div style={{
                    ...styles.statusBadge,
                    backgroundColor: isActive ? '#3ba55d' : isCompleted ? '#72767d' : '#faa61a'
                }}>
                    {tournament.status}
                </div>
            </div>

            <div style={styles.cardBody}>
                <div style={styles.cardInfo}>
                    <FaUsers size={14} />
                    <span>{tournament.participants?.length || 0}/{tournament.max_participants}</span>
                </div>
                <div style={styles.cardInfo}>
                    <FaClock size={14} />
                    <span>{new Date(tournament.start_date).toLocaleDateString('tr-TR')}</span>
                </div>
            </div>

            <div style={styles.cardFooter}>
                <button onClick={onView} style={styles.viewButton}>
                    Detaylar
                </button>
                {!isCompleted && (
                    isParticipant ? (
                        <button onClick={onLeave} style={styles.leaveButton}>
                            Ayrıl
                        </button>
                    ) : (
                        <button
                            onClick={onJoin}
                            disabled={isFull}
                            style={{
                                ...styles.joinButton,
                                opacity: isFull ? 0.5 : 1,
                                cursor: isFull ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isFull ? 'Dolu' : 'Katıl'}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

const CreateTournamentModal = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        name: '',
        game: '',
        max_participants: 8,
        start_date: '',
        prize: '',
        rules: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                <h3 style={styles.modalTitle}>Yeni Turnuva Oluştur</h3>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Turnuva Adı"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Oyun"
                        value={formData.game}
                        onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <select
                        value={formData.max_participants}
                        onChange={(e) => setFormData({ ...formData, max_participants: parseInt(e.target.value) })}
                        style={styles.input}
                    >
                        <option value={4}>4 Kişi</option>
                        <option value={8}>8 Kişi</option>
                        <option value={16}>16 Kişi</option>
                        <option value={32}>32 Kişi</option>
                    </select>
                    <input
                        type="datetime-local"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        style={styles.input}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Ödül (opsiyonel)"
                        value={formData.prize}
                        onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Kurallar"
                        value={formData.rules}
                        onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                        style={{ ...styles.input, minHeight: '100px' }}
                    />
                    <div style={styles.modalButtons}>
                        <button type="button" onClick={onClose} style={styles.cancelButton}>
                            İptal
                        </button>
                        <button type="submit" style={styles.submitButton}>
                            Oluştur
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TournamentDetailModal = ({ tournament, onClose, fetchWithAuth, apiBaseUrl }) => {
    const [bracket, setBracket] = useState(null);

    useEffect(() => {
        loadBracket();
    }, [tournament.id]);

    const loadBracket = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/tournaments/${tournament.id}/bracket/`);
            if (res.ok) {
                const data = await res.json();
                setBracket(data.bracket);
            }
        } catch (error) {
            console.error('Bracket load error:', error);
        }
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={{ ...styles.modal, maxWidth: '800px' }}>
                <div style={styles.modalHeader}>
                    <h3 style={styles.modalTitle}>{tournament.name}</h3>
                    <button onClick={onClose} style={styles.modalClose}>
                        <FaTimes size={18} />
                    </button>
                </div>

                <div style={styles.modalContent}>
                    {/* Tournament Info */}
                    <div style={styles.detailSection}>
                        <h4>Bilgiler</h4>
                        <p><strong>Oyun:</strong> {tournament.game}</p>
                        <p><strong>Katılımcı:</strong> {tournament.participants?.length}/{tournament.max_participants}</p>
                        <p><strong>Başlangıç:</strong> {new Date(tournament.start_date).toLocaleString('tr-TR')}</p>
                        {tournament.prize && <p><strong>Ödül:</strong> {tournament.prize}</p>}
                    </div>

                    {/* Rules */}
                    {tournament.rules && (
                        <div style={styles.detailSection}>
                            <h4>Kurallar</h4>
                            <p>{tournament.rules}</p>
                        </div>
                    )}

                    {/* Bracket */}
                    {bracket && (
                        <div style={styles.detailSection}>
                            <h4>Eşleşmeler</h4>
                            {(() => {
                                const rounds = {};
                                (Array.isArray(bracket) ? bracket : []).forEach(m => {
                                    const r = m.round || 1;
                                    if (!rounds[r]) rounds[r] = [];
                                    rounds[r].push(m);
                                });
                                const roundKeys = Object.keys(rounds).sort((a, b) => a - b);
                                return (
                                    <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '12px 0' }}>
                                        {roundKeys.map(rk => (
                                            <div key={rk} style={{ minWidth: '200px', flex: '0 0 auto' }}>
                                                <div style={{ color: '#5865f2', fontWeight: 600, fontSize: '0.85em', marginBottom: '10px', textAlign: 'center' }}>
                                                    {roundKeys.length === 1 ? 'Final' : `Tur ${rk}`}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    {rounds[rk].map(match => (
                                                        <div key={match.id} style={{ backgroundColor: '#1e1f22', borderRadius: '8px', overflow: 'hidden', border: match.status === 'completed' ? '1px solid #23a559' : '1px solid #3f4147' }}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: match.winner && match.winner === match.participant1?.user_id ? 'rgba(35,165,89,0.1)' : 'transparent', borderBottom: '1px solid #2b2d31' }}>
                                                                <span style={{ color: '#dbdee1', fontSize: '0.85em', fontWeight: match.winner === match.participant1?.user_id ? 700 : 400 }}>
                                                                    {match.participant1?.username || 'TBD'}
                                                                </span>
                                                                <span style={{ color: '#949ba4', fontSize: '0.8em', fontWeight: 600 }}>{match.score1 ?? '-'}</span>
                                                            </div>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: match.winner && match.winner === match.participant2?.user_id ? 'rgba(35,165,89,0.1)' : 'transparent' }}>
                                                                <span style={{ color: '#dbdee1', fontSize: '0.85em', fontWeight: match.winner === match.participant2?.user_id ? 700 : 400 }}>
                                                                    {match.participant2?.username || 'TBD'}
                                                                </span>
                                                                <span style={{ color: '#949ba4', fontSize: '0.8em', fontWeight: 600 }}>{match.score2 ?? '-'}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}
                        </div>
                    )}

                    {/* Participants */}
                    <div style={styles.detailSection}>
                        <h4>Katılımcılar</h4>
                        <div style={styles.participantList}>
                            {tournament.participants?.map(p => (
                                <div key={p.id} style={styles.participant}>
                                    <span>{p.username}</span>
                                    {p.seed && <span style={styles.seed}>#{p.seed}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '20px'
    },
    panel: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerActions: {
        display: 'flex',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff'
    },
    createButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px'
    },
    filters: {
        display: 'flex',
        gap: '8px',
        padding: '16px 20px',
        borderBottom: '1px solid #202225'
    },
    filterButton: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b9bbbe'
    },
    tournamentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px'
    },
    tournamentCard: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start'
    },
    tournamentName: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        flex: 1
    },
    statusBadge: {
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        color: '#ffffff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    cardInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#b9bbbe',
        fontSize: '13px'
    },
    cardFooter: {
        display: 'flex',
        gap: '8px',
        marginTop: 'auto'
    },
    viewButton: {
        flex: 1,
        backgroundColor: '#202225',
        color: '#ffffff',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px'
    },
    joinButton: {
        flex: 1,
        backgroundColor: '#3ba55d',
        color: '#ffffff',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold'
    },
    leaveButton: {
        flex: 1,
        backgroundColor: '#ed4245',
        color: '#ffffff',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001
    },
    modal: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '24px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
    },
    modalTitle: {
        color: '#ffffff',
        marginBottom: '16px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    input: {
        width: '100%',
        backgroundColor: '#202225',
        border: 'none',
        color: '#dcddde',
        padding: '10px',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none'
    },
    modalButtons: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end',
        marginTop: '16px'
    },
    cancelButton: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    submitButton: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    modalClose: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    detailSection: {
        backgroundColor: '#2f3136',
        padding: '16px',
        borderRadius: '8px'
    },
    bracketInfo: {
        textAlign: 'center',
        padding: '20px',
        color: '#b9bbbe'
    },
    participantList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '8px'
    },
    participant: {
        backgroundColor: '#36393f',
        padding: '8px 12px',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '13px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    seed: {
        color: '#faa61a',
        fontWeight: 'bold'
    }
};

export default TournamentSystem;




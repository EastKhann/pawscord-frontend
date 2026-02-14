import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './styles';

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

    const renderBracket = () => {
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
                    <div style={styles.detailSection}>
                        <h4>Bilgiler</h4>
                        <p><strong>Oyun:</strong> {tournament.game}</p>
                        <p><strong>Kat{'ı'}l{'ı'}mc{'ı'}:</strong> {tournament.participants?.length}/{tournament.max_participants}</p>
                        <p><strong>Ba{'ş'}lang{'ıç'}:</strong> {new Date(tournament.start_date).toLocaleString('tr-TR')}</p>
                        {tournament.prize && <p><strong>{'Ö'}d{'ü'}l:</strong> {tournament.prize}</p>}
                    </div>

                    {tournament.rules && (
                        <div style={styles.detailSection}>
                            <h4>Kurallar</h4>
                            <p>{tournament.rules}</p>
                        </div>
                    )}

                    {bracket && (
                        <div style={styles.detailSection}>
                            <h4>E{'ş'}le{'ş'}meler</h4>
                            {renderBracket()}
                        </div>
                    )}

                    <div style={styles.detailSection}>
                        <h4>Kat{'ı'}l{'ı'}mc{'ı'}lar</h4>
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

export default TournamentDetailModal;

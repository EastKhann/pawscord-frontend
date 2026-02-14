import { FaUsers, FaClock } from 'react-icons/fa';
import styles from './styles';

const TournamentCard = ({ tournament, currentUser, onJoin, onLeave, onView }) => {
    const isParticipant = tournament.participants?.some(p => p.username === currentUser);
    const isFull = tournament.participants?.length >= tournament.max_participants;
    const isCompleted = tournament.status === 'completed';
    const isActive = tournament.status === 'active';

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
                            Ayr{'\u0131'}l
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
                            {isFull ? 'Dolu' : 'Kat\u0131l'}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default TournamentCard;

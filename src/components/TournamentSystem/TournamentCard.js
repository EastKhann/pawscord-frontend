import { FaUsers, FaClock } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './styles';
import { useTranslation } from 'react-i18next';

const TournamentCard = ({ tournament, currentUser, onJoin, onLeave, onView }) => {
    const isParticipant = tournament.participants?.some((p) => p.username === currentUser);
    const isFull = tournament.participants?.length >= tournament.max_participants;
    const isCompleted = tournament.status === 'completed';
    const isActive = tournament.status === 'active';
    const statusBadgeStyle = {
        ...styles.statusBadge,
        backgroundColor: isActive ? '#3ba55d' : isCompleted ? '#949ba4' : '#f0b232',
    };
    const joinButtonStyle = {
        ...styles.joinButton,
        opacity: isFull ? 0.5 : 1,
        cursor: isFull ? 'not-allowed' : 'pointer',
    };

    const { t } = useTranslation();
    return (
        <div aria-label={t('tournament.card', 'Tournament card')} style={styles.tournamentCard}>
            <div style={styles.cardHeader}>
                <div style={styles.tournamentName}>{tournament.name}</div>
                <div style={statusBadgeStyle}>{tournament.status}</div>
            </div>

            <div style={styles.cardBody}>
                <div style={styles.cardInfo}>
                    <FaUsers size={14} />
                    <span>
                        {tournament.participants?.length || 0}/{tournament.max_participants}
                    </span>
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
                {!isCompleted &&
                    (isParticipant ? (
                        <button onClick={onLeave} style={styles.leaveButton}>
                            {t('tournament.leave', 'Leave')}
                        </button>
                    ) : (
                        <button onClick={onJoin} disabled={isFull} style={joinButtonStyle}>
                            {isFull ? 'Dolu' : 'Join'}
                        </button>
                    ))}
            </div>
        </div>
    );
};

TournamentCard.propTypes = {
    tournament: PropTypes.object,
    currentUser: PropTypes.object,
    onJoin: PropTypes.func,
    onLeave: PropTypes.func,
    onView: PropTypes.func,
};
export default TournamentCard;

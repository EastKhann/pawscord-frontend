// WeeklyChallengesPanel/ChallengeCard.js
import { FaLock, FaCheck, FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
    getIcon,
    getDifficultyColor,
    getDifficultyStars,
    getRewardIcon,
    getRewardText,
} from './hooks/useChallenges';

const ChallengeCard = ({ challenge, isDaily, styles }) => {
    const progress = (challenge.current / challenge.target) * 100;
    const isCompleted = challenge.status === 'completed';
    const isLocked = challenge.status === 'locked';
    const cardStyle = {
        ...styles.challengeCard,
        opacity: isCompleted ? 0.7 : 1,
        backgroundColor: isCompleted ? '#0d0e10' : '#111214',
    };
    const diffColorStyle = { color: getDifficultyColor(challenge.difficulty) };
    const fillStyle = {
        ...styles.progressFill,
        width: `${Math.min(progress, 100)}%`,
        backgroundColor: isCompleted ? '#23a559' : '#5865f2',
    };

    return (
        <div aria-label="challenge card" style={cardStyle}>
            <div style={styles.challengeIcon}>
                {isLocked ? (
                    <FaLock size={20} color="#949ba4" />
                ) : isCompleted ? (
                    <FaCheck size={20} color="#23a559" />
                ) : (
                    <span style={diffColorStyle}>{getIcon(challenge.icon)}</span>
                )}
            </div>

            <div style={styles.challengeContent}>
                <div style={styles.challengeHeader}>
                    <h4 style={styles.challengeTitle}>{challenge.title}</h4>
                    {!isDaily && challenge.difficulty && (
                        <div style={styles.difficultyStars}>
                            {getDifficultyStars(challenge.difficulty)}
                        </div>
                    )}
                </div>
                <p style={styles.challengeDescription}>{challenge.description}</p>
                <div style={styles.progressContainer}>
                    <div style={styles.progressBar}>
                        <div style={fillStyle} />
                    </div>
                    <span style={styles.progressText}>
                        {challenge.current}/{challenge.target}
                    </span>
                </div>
            </div>

            <div style={styles.challengeReward}>
                <div style={styles.pointsBadge}>
                    <FaStar size={10} color="#f0b232" />
                    <span>{challenge.points}</span>
                </div>
                {challenge.reward && (
                    <div style={styles.rewardBadge}>
                        {getRewardIcon(challenge.reward)}
                        <span>{getRewardText(challenge.reward)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

ChallengeCard.propTypes = {
    challenge: PropTypes.object,
    isDaily: PropTypes.bool,
    styles: PropTypes.array,
};
export default ChallengeCard;

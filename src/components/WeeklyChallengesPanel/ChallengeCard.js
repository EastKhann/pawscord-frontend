// WeeklyChallengesPanel/ChallengeCard.js
import { FaLock, FaCheck, FaStar } from 'react-icons/fa';
import { getIcon, getDifficultyColor, getDifficultyStars, getRewardIcon, getRewardText } from './hooks/useChallenges';

const ChallengeCard = ({ challenge, isDaily, styles }) => {
    const progress = (challenge.current / challenge.target) * 100;
    const isCompleted = challenge.status === 'completed';
    const isLocked = challenge.status === 'locked';

    return (
        <div style={{
            ...styles.challengeCard,
            opacity: isCompleted ? 0.7 : 1,
            backgroundColor: isCompleted ? '#202225' : '#2f3136'
        }}>
            <div style={styles.challengeIcon}>
                {isLocked ? <FaLock size={20} color="#72767d" />
                    : isCompleted ? <FaCheck size={20} color="#43b581" />
                        : <span style={{ color: getDifficultyColor(challenge.difficulty) }}>{getIcon(challenge.icon)}</span>}
            </div>

            <div style={styles.challengeContent}>
                <div style={styles.challengeHeader}>
                    <h4 style={styles.challengeTitle}>{challenge.title}</h4>
                    {!isDaily && challenge.difficulty && (
                        <div style={styles.difficultyStars}>{getDifficultyStars(challenge.difficulty)}</div>
                    )}
                </div>
                <p style={styles.challengeDescription}>{challenge.description}</p>
                <div style={styles.progressContainer}>
                    <div style={styles.progressBar}>
                        <div style={{
                            ...styles.progressFill,
                            width: `${Math.min(progress, 100)}%`,
                            backgroundColor: isCompleted ? '#43b581' : '#5865f2'
                        }} />
                    </div>
                    <span style={styles.progressText}>{challenge.current}/{challenge.target}</span>
                </div>
            </div>

            <div style={styles.challengeReward}>
                <div style={styles.pointsBadge}>
                    <FaStar size={10} color="#faa61a" /><span>{challenge.points}</span>
                </div>
                {challenge.reward && (
                    <div style={styles.rewardBadge}>
                        {getRewardIcon(challenge.reward)}<span>{getRewardText(challenge.reward)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengeCard;

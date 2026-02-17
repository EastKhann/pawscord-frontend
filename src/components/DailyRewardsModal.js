import { FaTimes, FaGift, FaFire, FaCoins, FaCrown, FaCheckCircle } from 'react-icons/fa';
import styles from './DailyRewardsModal/dailyRewardsStyles';
import useDailyRewards, { calculateTimeUntilNextReward } from './DailyRewardsModal/useDailyRewards';
import useModalA11y from '../hooks/useModalA11y';

const getRewardIcon = (type) => {
  switch (type) {
    case 'coins': return <FaCoins style={{ color: '#faa61a' }} />;
    case 'premium': return <FaCrown style={{ color: '#f04747' }} />;
    default: return <FaGift style={{ color: '#5865f2' }} />;
  }
};

const DailyRewardsModal = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Günlük Ödüller' });
  const { rewards, streak, canClaim, loading, claiming, lastClaimed, nextReward, handleClaim } = useDailyRewards({ fetchWithAuth, apiBaseUrl });

  return (
    <div style={styles.overlay} {...overlayProps}>
      <div style={styles.modal} {...dialogProps}>
        <div style={styles.header}>
          <div style={styles.headerLeft}><FaGift style={{ fontSize: '24px', color: '#43b581' }} /><h2 style={{ margin: 0, fontSize: '20px' }}>Daily Rewards</h2></div>
          <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
        </div>

        <div style={styles.content}>
          {loading ? <div style={styles.loading}>Loading...</div> : (
            <>
              <div style={styles.streakCard}>
                <FaFire style={{ fontSize: '48px', color: '#f04747' }} />
                <div style={styles.streakInfo}><div style={styles.streakNumber}>{streak}</div><div style={styles.streakLabel}>Day Streak</div></div>
              </div>

              {canClaim && nextReward && (
                <div style={styles.claimSection}>
                  <h3 style={styles.sectionTitle}>Today's Reward</h3>
                  <div style={styles.currentRewardCard}>
                    <div style={styles.rewardIcon}>{getRewardIcon(nextReward.type)}</div>
                    <div style={styles.rewardDetails}><div style={styles.rewardAmount}>{nextReward.amount} {nextReward.type}</div><div style={styles.rewardDescription}>{nextReward.description}</div></div>
                  </div>
                  <button onClick={handleClaim} disabled={claiming} style={styles.claimBtn}>{claiming ? 'Claiming...' : 'Claim Reward 🎁'}</button>
                </div>
              )}

              {!canClaim && lastClaimed && (
                <div style={styles.alreadyClaimed}>
                  <FaCheckCircle style={{ color: '#43b581', fontSize: '48px' }} /><h3>Already Claimed!</h3><p>Come back tomorrow for your next reward</p>
                  <div style={styles.nextRewardTime}>Next reward in: {calculateTimeUntilNextReward(lastClaimed)}</div>
                </div>
              )}

              <div style={styles.calendarSection}>
                <h3 style={styles.sectionTitle}>7-Day Reward Cycle</h3>
                <div style={styles.calendar}>
                  {rewards.map((reward, idx) => {
                    const isToday = idx === (streak % 7);
                    const isClaimed = idx < (streak % 7);
                    return (
                      <div key={idx} style={{ ...styles.calendarDay, ...(isToday && styles.calendarDayActive), ...(isClaimed && styles.calendarDayClaimed) }}>
                        <div style={styles.dayNumber}>Day {idx + 1}</div>
                        <div style={styles.dayIcon}>{getRewardIcon(reward.type)}</div>
                        <div style={styles.dayReward}>{reward.amount}</div>
                        {isClaimed && <div style={styles.claimedBadge}><FaCheckCircle /></div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={styles.info}>
                <p style={styles.infoText}>📅 Log in every day to maintain your streak and earn rewards!</p>
                <p style={styles.infoText}>🔥 Missing a day will reset your streak to 0</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyRewardsModal;

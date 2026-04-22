import PropTypes from 'prop-types';
import { FaTimes, FaGift, FaFire, FaCoins, FaCrown, FaCheckCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import styles from '../DailyRewardsModal/dailyRewardsStyles';
import useDailyRewards, {
    calculateTimeUntilNextReward,
} from '../DailyRewardsModal/useDailyRewards';
import useModalA11y from '../../hooks/useModalA11y';

const ICON_STYLES = {
    claimed: { color: '#23a559', fontSize: '48px' },
    streak: { fontSize: '48px', color: '#f23f42' },
    header: { fontSize: '24px', color: '#23a559' },
};

const getRewardIcon = (type) => {
    switch (type) {
        case 'coins':
            return <FaCoins className="icon-warning" />;
        case 'premium':
            return <FaCrown className="icon-danger" />;
        default:
            return <FaGift className="icon-primary" />;
    }
};

const DailyRewardsModal = ({ fetchWithAuth, apiBaseUrl, onClose }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: t('dailyRewards.title', 'Daily Rewards') });
    const { rewards, streak, canClaim, loading, claiming, lastClaimed, nextReward, handleClaim } =
        useDailyRewards({ fetchWithAuth, apiBaseUrl });
    const cycleIndex = streak % 7;

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaGift style={ICON_STYLES.header} />
                        <h2 className="m0-fs20">{t('dailyRewards.title', 'Günlük Ödüller')}</h2>
                    </div>
                    <button aria-label={t('common.close')} onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : (
                        <>
                            <div style={styles.streakCard}>
                                <FaFire style={ICON_STYLES.streak} />
                                <div style={styles.streakInfo}>
                                    <div style={styles.streakNumber}>{streak}</div>
                                    <div style={styles.streakLabel}>
                                        {t('dailyRewards.dayStreak', 'Gün Serisi')}
                                    </div>
                                </div>
                            </div>

                            {canClaim && nextReward && (
                                <div style={styles.claimSection}>
                                    <h3 style={styles.sectionTitle}>
                                        {t('dailyRewards.todaysReward', "Today's Reward")}
                                    </h3>
                                    <div style={styles.currentRewardCard}>
                                        <div style={styles.rewardIcon}>
                                            {getRewardIcon(nextReward.type)}
                                        </div>
                                        <div style={styles.rewardDetails}>
                                            <div style={styles.rewardAmount}>
                                                {nextReward.amount} {nextReward.type}
                                            </div>
                                            <div style={styles.rewardDescription}>
                                                {nextReward.description}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        aria-label={t('dailyRewards.claimReward', 'Claim Reward')}
                                        onClick={handleClaim}
                                        disabled={claiming}
                                        style={styles.claimBtn}
                                    >
                                        {claiming
                                            ? t('dailyRewards.claiming', 'Alınıyor...')
                                            : t('dailyRewards.claimReward', 'Ödülü Al 🎁')}
                                    </button>
                                </div>
                            )}

                            {!canClaim && lastClaimed && (
                                <div style={styles.alreadyClaimed}>
                                    <FaCheckCircle style={ICON_STYLES.claimed} />
                                    <h3>{t('dailyRewards.alreadyClaimed', 'Zaten Alındı!')}</h3>
                                    <p>
                                        {t(
                                            'dailyRewards.comeBackTomorrow',
                                            t('dailyRewards.comeTomorrow','Come back tomorrow for the next reward')
                                        )}
                                    </p>
                                    <div style={styles.nextRewardTime}>
                                        {t('dailyRewards.nextRewardIn', 'Sonraki ödül')}:{' '}
                                        {calculateTimeUntilNextReward(lastClaimed)}
                                    </div>
                                </div>
                            )}

                            <div style={styles.calendarSection}>
                                <h3 style={styles.sectionTitle}>
                                    {t('dailyRewards.rewardCycle', '7-Day Reward Cycle')}
                                </h3>
                                <div style={styles.calendar}>
                                    {rewards.map((reward, idx) => {
                                        const isToday = idx === cycleIndex;
                                        const isClaimed = idx < cycleIndex;
                                        const calendarDayStyle = {
                                            ...styles.calendarDay,
                                            ...(isToday ? styles.calendarDayActive : {}),
                                            ...(isClaimed ? styles.calendarDayClaimed : {}),
                                        };

                                        return (
                                            <div key={`item-${idx}`} style={calendarDayStyle}>
                                                <div style={styles.dayNumber}>
                                                    {t('dailyRewards.day', 'Day')} {idx + 1}
                                                </div>
                                                <div style={styles.dayIcon}>
                                                    {getRewardIcon(reward.type)}
                                                </div>
                                                <div style={styles.dayReward}>{reward.amount}</div>
                                                {isClaimed && (
                                                    <div style={styles.claimedBadge}>
                                                        <FaCheckCircle />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div style={styles.info}>
                                <p style={styles.infoText}>
                                    📅{' '}
                                    {t(
                                        'dailyRewards.loginDaily',
                                        t('dailyRewards.desc','Log in every day to maintain your streak and earn rewards!')
                                    )}
                                </p>
                                <p style={styles.infoText}>
                                    🔥{' '}
                                    {t(
                                        'dailyRewards.missingDay',
                                        'Missing a day will reset your streak to 0'
                                    )}
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

DailyRewardsModal.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
};

export default DailyRewardsModal;

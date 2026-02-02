// frontend/src/components/DailyRewardsModal.js
import React, { useState, useEffect } from 'react';
import { FaTimes, FaGift, FaFire, FaCoins, FaCrown, FaCheckCircle } from 'react-icons/fa';
import toast from '../utils/toast';

/**
 * 🎁 Daily Rewards Modal
 * Daily login rewards and streak tracking
 * 
 * Features:
 * - View daily reward calendar
 * - Claim daily rewards
 * - Track login streak
 * - Show reward preview
 */
const DailyRewardsModal = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [rewards, setRewards] = useState([]);
    const [streak, setStreak] = useState(0);
    const [canClaim, setCanClaim] = useState(false);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [lastClaimed, setLastClaimed] = useState(null);

    useEffect(() => {
        loadDailyRewards();
    }, []);

    const loadDailyRewards = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/rewards/daily/`);
            const data = await response.json();

            setRewards(data.rewards || []);
            setStreak(data.streak || 0);
            setCanClaim(data.can_claim || false);
            setLastClaimed(data.last_claimed);
        } catch (error) {
            console.error('Failed to load daily rewards:', error);
            toast.error('Failed to load rewards');
        } finally {
            setLoading(false);
        }
    };

    const handleClaim = async () => {
        if (!canClaim) {
            toast.error('Already claimed today!');
            return;
        }

        setClaiming(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/rewards/claim/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`Claimed ${data.reward.amount} ${data.reward.type}! 🎁`);
                loadDailyRewards();
            } else {
                toast.error(data.error || 'Failed to claim reward');
            }
        } catch (error) {
            console.error('Claim error:', error);
            toast.error('Failed to claim reward');
        } finally {
            setClaiming(false);
        }
    };

    const getRewardIcon = (type) => {
        switch (type) {
            case 'coins': return <FaCoins style={{ color: '#faa61a' }} />;
            case 'premium': return <FaCrown style={{ color: '#f04747' }} />;
            default: return <FaGift style={{ color: '#5865f2' }} />;
        }
    };

    const getNextReward = () => {
        const today = streak % 7;
        return rewards[today] || null;
    };

    const nextReward = getNextReward();

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaGift style={{ fontSize: '24px', color: '#43b581' }} />
                        <h2 style={{ margin: 0, fontSize: '20px' }}>Daily Rewards</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* Content */}
                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>Loading...</div>
                    ) : (
                        <>
                            {/* Streak Display */}
                            <div style={styles.streakCard}>
                                <FaFire style={{ fontSize: '48px', color: '#f04747' }} />
                                <div style={styles.streakInfo}>
                                    <div style={styles.streakNumber}>{streak}</div>
                                    <div style={styles.streakLabel}>Day Streak</div>
                                </div>
                            </div>

                            {/* Current Reward */}
                            {canClaim && nextReward && (
                                <div style={styles.claimSection}>
                                    <h3 style={styles.sectionTitle}>Today's Reward</h3>
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
                                        onClick={handleClaim}
                                        disabled={claiming}
                                        style={styles.claimBtn}
                                    >
                                        {claiming ? 'Claiming...' : 'Claim Reward 🎁'}
                                    </button>
                                </div>
                            )}

                            {!canClaim && lastClaimed && (
                                <div style={styles.alreadyClaimed}>
                                    <FaCheckCircle style={{ color: '#43b581', fontSize: '48px' }} />
                                    <h3>Already Claimed!</h3>
                                    <p>Come back tomorrow for your next reward</p>
                                    <div style={styles.nextRewardTime}>
                                        Next reward in: {calculateTimeUntilNextReward(lastClaimed)}
                                    </div>
                                </div>
                            )}

                            {/* Reward Calendar */}
                            <div style={styles.calendarSection}>
                                <h3 style={styles.sectionTitle}>7-Day Reward Cycle</h3>
                                <div style={styles.calendar}>
                                    {rewards.map((reward, idx) => {
                                        const isToday = idx === (streak % 7);
                                        const isClaimed = idx < (streak % 7);

                                        return (
                                            <div
                                                key={idx}
                                                style={{
                                                    ...styles.calendarDay,
                                                    ...(isToday && styles.calendarDayActive),
                                                    ...(isClaimed && styles.calendarDayClaimed)
                                                }}
                                            >
                                                <div style={styles.dayNumber}>Day {idx + 1}</div>
                                                <div style={styles.dayIcon}>
                                                    {getRewardIcon(reward.type)}
                                                </div>
                                                <div style={styles.dayReward}>
                                                    {reward.amount}
                                                </div>
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

                            {/* Info */}
                            <div style={styles.info}>
                                <p style={styles.infoText}>
                                    📅 Log in every day to maintain your streak and earn rewards!
                                </p>
                                <p style={styles.infoText}>
                                    🔥 Missing a day will reset your streak to 0
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

const calculateTimeUntilNextReward = (lastClaimed) => {
    const now = new Date();
    const claimed = new Date(lastClaimed);
    const tomorrow = new Date(claimed);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '700px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    },
    streakCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '24px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
    },
    streakInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    streakNumber: {
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#f04747',
        lineHeight: 1
    },
    streakLabel: {
        fontSize: '14px',
        color: '#99aab5',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    claimSection: {
        marginBottom: '32px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '16px',
        color: '#dcddde'
    },
    currentRewardCard: {
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        background: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '16px',
        boxShadow: '0 8px 16px rgba(88, 101, 242, 0.3)'
    },
    rewardIcon: {
        fontSize: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rewardDetails: {
        flex: 1
    },
    rewardAmount: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    rewardDescription: {
        fontSize: '14px',
        opacity: 0.9
    },
    claimBtn: {
        width: '100%',
        padding: '16px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '8px',
        color: '#fff',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: '0 4px 12px rgba(67, 181, 129, 0.3)'
    },
    alreadyClaimed: {
        textAlign: 'center',
        padding: '40px 20px',
        marginBottom: '32px'
    },
    nextRewardTime: {
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600'
    },
    calendarSection: {
        marginBottom: '24px'
    },
    calendar: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
        gap: '12px'
    },
    calendarDay: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        border: '2px solid transparent',
        transition: 'all 0.2s',
        position: 'relative'
    },
    calendarDayActive: {
        borderColor: '#43b581',
        backgroundColor: '#2c3136',
        boxShadow: '0 0 20px rgba(67, 181, 129, 0.3)'
    },
    calendarDayClaimed: {
        opacity: 0.5
    },
    dayNumber: {
        fontSize: '12px',
        color: '#99aab5',
        marginBottom: '8px',
        fontWeight: '600'
    },
    dayIcon: {
        fontSize: '32px',
        marginBottom: '8px',
        display: 'flex',
        justifyContent: 'center'
    },
    dayReward: {
        fontSize: '16px',
        fontWeight: 'bold'
    },
    claimedBadge: {
        position: 'absolute',
        top: '8px',
        right: '8px',
        color: '#43b581',
        fontSize: '16px'
    },
    info: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '16px'
    },
    infoText: {
        fontSize: '14px',
        color: '#dcddde',
        margin: '8px 0',
        lineHeight: '1.6'
    }
};

export default DailyRewardsModal;

import { useState, useEffect } from 'react';
import { FaTimes, FaGift, FaTrophy, FaCoins, FaUsers } from 'react-icons/fa';
import { toast } from '../utils/toast';

const ReferralRewardsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const [rewards, setRewards] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [referralLink, setReferralLink] = useState('');

    useEffect(() => {
        fetchRewards();
        fetchStats();
    }, []);

    const fetchRewards = async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/referrals/rewards/`);
            const data = await response.json();
            setRewards(data.rewards || []);
            setReferralLink(data.referral_link || '');
        } catch (error) {
            toast.error('Failed to load rewards');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/referrals/stats/`);
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Failed to load stats');
        }
    };

    const claimReward = async (rewardId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/referrals/rewards/${rewardId}/claim/`, {
                method: 'POST'
            });
            toast.success('Reward claimed!');
            fetchRewards();
            fetchStats();
        } catch (error) {
            toast.error('Failed to claim reward');
        }
    };

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink);
        toast.success('Referral link copied to clipboard!');
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaGift style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Referral Rewards</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {referralLink && (
                    <div style={styles.referralSection}>
                        <div style={styles.referralLabel}>Your Referral Link</div>
                        <div style={styles.referralLinkBox}>
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                style={styles.referralInput}
                            />
                            <button onClick={copyReferralLink} style={styles.copyButton}>
                                Copy
                            </button>
                        </div>
                        <div style={styles.referralHint}>
                            Share this link to earn rewards when friends join!
                        </div>
                    </div>
                )}

                {stats && (
                    <div style={styles.statsSection}>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaUsers style={{ color: '#5865f2', fontSize: '24px' }} />
                            </div>
                            <div>
                                <div style={styles.statValue}>{stats.total_referrals || 0}</div>
                                <div style={styles.statLabel}>Total Referrals</div>
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaCoins style={{ color: '#f0b232', fontSize: '24px' }} />
                            </div>
                            <div>
                                <div style={styles.statValue}>{stats.coins_earned || 0}</div>
                                <div style={styles.statLabel}>Coins Earned</div>
                            </div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaTrophy style={{ color: '#23a559', fontSize: '24px' }} />
                            </div>
                            <div>
                                <div style={styles.statValue}>{stats.rewards_claimed || 0}</div>
                                <div style={styles.statLabel}>Rewards Claimed</div>
                            </div>
                        </div>
                    </div>
                )}

                <div style={styles.content}>
                    <h3 style={styles.sectionTitle}>Available Rewards</h3>
                    {loading ? (
                        <div style={styles.loading}>Loading rewards...</div>
                    ) : rewards.length === 0 ? (
                        <div style={styles.empty}>No rewards available</div>
                    ) : (
                        <div style={styles.rewardsList}>
                            {rewards.map((reward, idx) => (
                                <div key={idx} style={styles.rewardCard}>
                                    <div style={styles.rewardIcon}>
                                        {reward.type === 'coins' && <FaCoins style={{ color: '#f0b232', fontSize: '32px' }} />}
                                        {reward.type === 'badge' && <FaTrophy style={{ color: '#5865f2', fontSize: '32px' }} />}
                                        {reward.type === 'item' && <FaGift style={{ color: '#23a559', fontSize: '32px' }} />}
                                    </div>
                                    <div style={styles.rewardInfo}>
                                        <div style={styles.rewardName}>{reward.name}</div>
                                        <div style={styles.rewardDescription}>{reward.description}</div>
                                        <div style={styles.rewardRequirement}>
                                            Requires {reward.referrals_required} referrals
                                        </div>
                                        {reward.progress !== undefined && (
                                            <div style={styles.progressBar}>
                                                <div
                                                    style={{
                                                        ...styles.progressFill,
                                                        width: `${(reward.progress / reward.referrals_required) * 100}%`
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div style={styles.rewardActions}>
                                        {reward.claimed ? (
                                            <div style={styles.claimedBadge}>✓ Claimed</div>
                                        ) : reward.claimable ? (
                                            <button onClick={() => claimReward(reward.id)} style={styles.claimButton}>
                                                Claim
                                            </button>
                                        ) : (
                                            <div style={styles.lockedBadge}>
                                                🔒 Locked
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
        zIndex: 999999,
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #0e1222',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff',
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '20px',
        padding: '5px',
    },
    referralSection: {
        padding: '20px',
        borderBottom: '1px solid #0e1222',
        backgroundColor: '#111214',
    },
    referralLabel: {
        fontSize: '13px',
        color: '#dbdee1',
        marginBottom: '8px',
    },
    referralLinkBox: {
        display: 'flex',
        gap: '12px',
        marginBottom: '8px',
    },
    referralInput: {
        flex: 1,
        padding: '10px',
        backgroundColor: '#1e1e1e',
        border: '1px solid #1e1e1e',
        borderRadius: '4px',
        color: '#ffffff',
        fontSize: '13px',
    },
    copyButton: {
        padding: '10px 20px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
    },
    referralHint: {
        fontSize: '12px',
        color: '#949ba4',
        fontStyle: 'italic',
    },
    statsSection: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        padding: '20px',
        borderBottom: '1px solid #0e1222',
    },
    statCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    statIcon: {
        minWidth: '48px',
    },
    statValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: '4px',
    },
    statLabel: {
        fontSize: '12px',
        color: '#949ba4',
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1,
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '16px',
    },
    loading: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    empty: {
        textAlign: 'center',
        color: '#949ba4',
        padding: '40px',
    },
    rewardsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    rewardCard: {
        backgroundColor: '#111214',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
    },
    rewardIcon: {
        minWidth: '48px',
    },
    rewardInfo: {
        flex: 1,
    },
    rewardName: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#ffffff',
        marginBottom: '6px',
    },
    rewardDescription: {
        fontSize: '13px',
        color: '#dbdee1',
        marginBottom: '6px',
    },
    rewardRequirement: {
        fontSize: '12px',
        color: '#949ba4',
        marginBottom: '8px',
    },
    progressBar: {
        height: '6px',
        backgroundColor: '#1e1e1e',
        borderRadius: '3px',
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#5865f2',
        transition: 'width 0.3s',
    },
    rewardActions: {
        minWidth: '100px',
    },
    claimButton: {
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#23a559',
        border: 'none',
        borderRadius: '4px',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
    },
    claimedBadge: {
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#111214',
        border: '1px solid #23a559',
        borderRadius: '4px',
        color: '#23a559',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '600',
    },
    lockedBadge: {
        width: '100%',
        padding: '10px 20px',
        backgroundColor: '#111214',
        border: '1px solid #949ba4',
        borderRadius: '4px',
        color: '#949ba4',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '600',
    },
};

export default ReferralRewardsPanel;

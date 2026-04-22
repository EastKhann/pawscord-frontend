import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { FaTimes, FaGift, FaTrophy, FaCoins, FaUsers } from 'react-icons/fa';

import { toast } from '../../utils/toast';

import { useTranslation } from 'react-i18next';

import logger from '../../utils/logger';

const S = {
    txt2: { color: '#5865f2', fontSize: '32px' },

    txt: { color: '#f0b232', fontSize: '32px' },
};

const ReferralRewardsPanel = ({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
    const { t } = useTranslation();

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
            toast.error(t('referrals.loadFailed', 'Ödüller yüklenemedi'));
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
            logger.error('Failed to load stats');
        }
    };

    const claimReward = async (rewardId) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/referrals/rewards/${rewardId}/claim/`, {
                method: 'POST',
            });

            toast.success(t('referrals.rewardClaimed', 'Ödül alındı!'));

            fetchRewards();

            fetchStats();
        } catch (error) {
            toast.error(t('referrals.claimFailed', 'Ödül alınamadı'));
        }
    };

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink);

        toast.success(t('referrals.linkCopied', 'Yönlendirme bağlantısı kopyalandı!'));
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaGift className="icon-primary-mr10" />

                        <h2 style={styles.title}>{t('referrals.title', 'Yönlendirme Ödülleri')}</h2>
                    </div>

                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                {referralLink && (
                    <div style={styles.referralSection}>
                        <div style={styles.referralLabel}>
                            {t('referrals.yourLink', 'Yönlendirme Bağlantınız')}
                        </div>

                        <div style={styles.referralLinkBox}>
                            <input
                                type="text"
                                value={referralLink}
                                readOnly
                                style={styles.referralInput}
                                aria-label={t('referral.referralLink', 'Referral Link')}
                            />

                            <button
                                aria-label={t('referral.copyLink', 'Copy referral link')}
                                onClick={copyReferralLink}
                                style={styles.copyButton}
                            >
                                {t('referrals.copy', 'Kopyala')}
                            </button>
                        </div>

                        <div style={styles.referralHint}>
                            {t(
                                'referrals.shareHint',
                                t('referral.shareHint', 'Share this link to earn rewards when friends join!')
                            )}
                        </div>
                    </div>
                )}

                {stats && (
                    <div style={styles.statsSection}>
                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaUsers className="text-5865-24" />
                            </div>

                            <div>
                                <div style={styles.statValue}>{stats.total_referrals || 0}</div>

                                <div style={styles.statLabel}>
                                    {t('referrals.totalReferrals', 'Toplam Yönlendirme')}
                                </div>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaCoins className="text-f0b-24" />
                            </div>

                            <div>
                                <div style={styles.statValue}>{stats.coins_earned || 0}</div>

                                <div style={styles.statLabel}>
                                    {t('referrals.coinsEarned', 'Kazanılan Coinler')}
                                </div>
                            </div>
                        </div>

                        <div style={styles.statCard}>
                            <div style={styles.statIcon}>
                                <FaTrophy className="icon-success" />
                            </div>

                            <div>
                                <div style={styles.statValue}>{stats.rewards_claimed || 0}</div>

                                <div style={styles.statLabel}>
                                    {t('referrals.rewardsClaimed', 'Alınan Ödüller')}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div style={styles.content}>
                    <h3 style={styles.sectionTitle}>
                        {t('referrals.availableRewards', 'Mevcut Ödüller')}
                    </h3>

                    {loading ? (
                        <div style={styles.loading}>
                            {t('referrals.loading', 'Ödüller yükleniyor...')}
                        </div>
                    ) : rewards.length === 0 ? (
                        <div style={styles.empty}>
                            {t('referrals.noRewards', 'Mevcut ödül yok')}
                        </div>
                    ) : (
                        <div style={styles.rewardsList}>
                            {rewards.map((reward, idx) => (
                                <div key={`item-${idx}`} style={styles.rewardCard}>
                                    <div style={styles.rewardIcon}>
                                        {reward.type === 'coins' && <FaCoins style={S.txt} />}

                                        {reward.type === 'badge' && <FaTrophy style={S.txt2} />}

                                        {reward.type === 'item' && (
                                            <FaGift className="icon-success-32" />
                                        )}
                                    </div>

                                    <div style={styles.rewardInfo}>
                                        <div style={styles.rewardName}>{reward.name}</div>

                                        <div style={styles.rewardDescription}>
                                            {reward.description}
                                        </div>

                                        <div style={styles.rewardRequirement}>
                                            {t(
                                                'referrals.requiresReferrals',
                                                `Requires ${reward.referrals_required} referrals`
                                            )}
                                        </div>

                                        {reward.progress !== undefined && (
                                            <div style={styles.progressBar}>
                                                <div
                                                    style={{
                                                        ...styles.progressFill,

                                                        width: `${(reward.progress / reward.referrals_required) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div style={styles.rewardActions}>
                                        {reward.claimed ? (
                                            <div style={styles.claimedBadge}>
                                                ✓ {t('referrals.claimed', 'Alındı')}
                                            </div>
                                        ) : reward.claimable ? (
                                            <button
                                                aria-label={t('referrals.claim', 'Claim reward')}
                                                onClick={() => claimReward(reward.id)}
                                                style={styles.claimButton}
                                            >
                                                {t('referrals.claim', 'Al')}
                                            </button>
                                        ) : (
                                            <div style={styles.lockedBadge}>
                                                🔒 {t('referrals.locked', 'Kilitli')}
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

ReferralRewardsPanel.propTypes = {
    fetchWithAuth: PropTypes.func,

    apiBaseUrl: PropTypes.string,

    onClose: PropTypes.func,

    username: PropTypes.string,
};

export default ReferralRewardsPanel;

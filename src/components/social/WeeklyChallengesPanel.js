// frontend/src/components/WeeklyChallengesPanel.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTrophy, FaStar, FaFire, FaGem, FaMedal, FaGift, FaClock } from 'react-icons/fa';
import styles from '../WeeklyChallengesPanel/styles';
import useChallenges from '../WeeklyChallengesPanel/hooks/useChallenges';
import ChallengeCard from '../WeeklyChallengesPanel/ChallengeCard';
import { useTranslation } from 'react-i18next';

const WeeklyChallengesPanel = ({ fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { t } = useTranslation();
    const { challenges, userProgress, loading, activeTab, setActiveTab, timeRemaining } =
        useChallenges(fetchWithAuth, apiBaseUrl);

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaTrophy className="pulse" size={32} color="#f0b232" />
                    <span>Görevler yükleniyor...</span>
                </div>
            </div>
        );
    }

    const completedWeekly = challenges.weekly.filter((c) => c.status === 'completed').length;
    const weeklyTotal = challenges.weekly.length;
    const completionPct = weeklyTotal > 0 ? Math.round((completedWeekly / weeklyTotal) * 100) : 0;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaTrophy size={24} color="#f0b232" />
                    <div>
                        <h2 style={styles.title}>Haftalık Görevler</h2>
                        <p style={styles.subtitle}>Complete challenges, earn rewards!</p>
                    </div>
                </div>
                <div style={styles.timer}>
                    <FaClock size={14} color="#949ba4" />
                    <span>
                        {timeRemaining.days}g {timeRemaining.hours}s {timeRemaining.minutes}d kaldı
                    </span>
                </div>
            </div>

            <div style={styles.statsGrid}>
                {[
                    {
                        icon: <FaFire size={20} color="#f23f42" />,
                        value: userProgress.streak,
                        label: t('ui.gunluk_seri_2'),
                    },
                    {
                        icon: <FaStar size={20} color="#f0b232" />,
                        value: userProgress.weeklyPoints,
                        label: t('ui.haftalik_score'),
                    },
                    {
                        icon: <FaTrophy size={20} color="#5865f2" />,
                        value: `${userProgress.rank}`,
                        label: 'Sortma',
                    },
                    {
                        icon: <FaMedal size={20} color="#23a559" />,
                        value: userProgress.completedChallenges,
                        label: 'Completed',
                    },
                ].map((s) => (
                    <div key={s.label} style={styles.statCard}>
                        {s.icon}
                        <div style={styles.statInfo}>
                            <span style={styles.statValue}>{s.value}</span>
                            <span style={styles.statLabel}>{s.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={styles.tabs}>
                {[
                    {
                        key: 'weekly',
                        icon: <FaTrophy size={14} />,
                        label: `Haftalık (${challenges.weekly.length})`,
                    },
                    {
                        key: 'daily',
                        icon: <FaStar size={14} />,
                        label: `Günlük (${challenges.daily.length})`,
                    },
                    {
                        key: 'special',
                        icon: <FaGem size={14} />,
                        label: `Özel (${challenges.special.length})`,
                    },
                ].map((t) => (
                    <button
                        aria-label="Switch tab"
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        style={{ ...styles.tab, ...(activeTab === t.key ? styles.tabActive : {}) }}
                    >
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            <div style={styles.challengesList}>
                {challenges[activeTab].map((c) => (
                    <ChallengeCard
                        key={c.id}
                        challenge={c}
                        isDaily={activeTab === 'daily'}
                        styles={styles}
                    />
                ))}
            </div>

            {userProgress.rewards.length > 0 && (
                <div style={styles.rewardsSection}>
                    <h3 style={styles.rewardsSectionTitle}>
                        <FaGift size={14} /> Kazanılan Rewardler
                    </h3>
                    <div style={styles.rewardsList}>
                        {userProgress.rewards.map((reward, index) => (
                            <div key={`item-${index}`} style={styles.earnedReward}>
                                <FaMedal size={16} color="#f0b232" />
                                <span>{reward.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={styles.summaryCard}>
                <div style={styles.summaryHeader}>
                    <FaGem size={16} color="#e91e63" />
                    <span>Bu Hafta</span>
                </div>
                <div style={styles.summaryStats}>
                    {[
                        { value: `${completedWeekly}/${weeklyTotal}`, label: t('ui.gorev') },
                        { value: userProgress.weeklyPoints, label: 'Score' },
                        { value: `${completionPct}%`, label: 'Progress' },
                    ].map((s) => (
                        <div key={s.label} style={styles.summaryItem}>
                            <span style={styles.summaryValue}>{s.value}</span>
                            <span style={styles.summaryLabel}>{s.label}</span>
                        </div>
                    ))}
                </div>
                <div style={styles.totalProgressBar}>
                    <div style={{ ...styles.totalProgressFill, width: `${completionPct}%` }} />
                </div>
            </div>
        </div>
    );
};

WeeklyChallengesPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    currentUser: PropTypes.object,
};
export default WeeklyChallengesPanel;

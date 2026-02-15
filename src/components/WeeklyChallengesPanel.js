// frontend/src/components/WeeklyChallengesPanel.js
import { FaTrophy, FaStar, FaFire, FaGem, FaMedal, FaGift, FaClock } from 'react-icons/fa';
import styles from './WeeklyChallengesPanel/styles';
import useChallenges from './WeeklyChallengesPanel/hooks/useChallenges';
import ChallengeCard from './WeeklyChallengesPanel/ChallengeCard';

const WeeklyChallengesPanel = ({ fetchWithAuth, apiBaseUrl, currentUser }) => {
    const { challenges, userProgress, loading, activeTab, setActiveTab, timeRemaining } = useChallenges(fetchWithAuth, apiBaseUrl);

    if (loading) {
        return (<div style={styles.container}><div style={styles.loading}>
            <FaTrophy className="pulse" size={32} color="#faa61a" />
            <span>Görevler yükleniyor...</span>
        </div></div>);
    }

    const completedWeekly = challenges.weekly.filter(c => c.status === 'completed').length;
    const weeklyTotal = challenges.weekly.length;
    const completionPct = weeklyTotal > 0 ? Math.round((completedWeekly / weeklyTotal) * 100) : 0;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <FaTrophy size={24} color="#faa61a" />
                    <div>
                        <h2 style={styles.title}>Haftalık Görevler</h2>
                        <p style={styles.subtitle}>Görevleri tamamla, ödüller kazan!</p>
                    </div>
                </div>
                <div style={styles.timer}>
                    <FaClock size={14} color="#72767d" />
                    <span>{timeRemaining.days}g {timeRemaining.hours}s {timeRemaining.minutes}d kaldı</span>
                </div>
            </div>

            <div style={styles.statsGrid}>
                {[
                    { icon: <FaFire size={20} color="#f04747" />, value: userProgress.streak, label: 'Günlük Seri' },
                    { icon: <FaStar size={20} color="#faa61a" />, value: userProgress.weeklyPoints, label: 'Haftalık Puan' },
                    { icon: <FaTrophy size={20} color="#5865f2" />, value: `${userProgress.rank}`, label: 'Sıralama' },
                    { icon: <FaMedal size={20} color="#43b581" />, value: userProgress.completedChallenges, label: 'Tamamlanan' }
                ].map(s => (
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
                    { key: 'weekly', icon: <FaTrophy size={14} />, label: `Haftalık (${challenges.weekly.length})` },
                    { key: 'daily', icon: <FaStar size={14} />, label: `Günlük (${challenges.daily.length})` },
                    { key: 'special', icon: <FaGem size={14} />, label: `Özel (${challenges.special.length})` }
                ].map(t => (
                    <button key={t.key} onClick={() => setActiveTab(t.key)}
                        style={{ ...styles.tab, ...(activeTab === t.key ? styles.tabActive : {}) }}>
                        {t.icon} {t.label}
                    </button>
                ))}
            </div>

            <div style={styles.challengesList}>
                {challenges[activeTab].map(c => (
                    <ChallengeCard key={c.id} challenge={c} isDaily={activeTab === 'daily'} styles={styles} />
                ))}
            </div>

            {userProgress.rewards.length > 0 && (
                <div style={styles.rewardsSection}>
                    <h3 style={styles.rewardsSectionTitle}>
                        <FaGift size={14} /> Kazanılan Ödüller
                    </h3>
                    <div style={styles.rewardsList}>
                        {userProgress.rewards.map((reward, index) => (
                            <div key={index} style={styles.earnedReward}>
                                <FaMedal size={16} color="#faa61a" /><span>{reward.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={styles.summaryCard}>
                <div style={styles.summaryHeader}><FaGem size={16} color="#e91e63" /><span>Bu Hafta</span></div>
                <div style={styles.summaryStats}>
                    {[
                        { value: `${completedWeekly}/${weeklyTotal}`, label: 'Görev' },
                        { value: userProgress.weeklyPoints, label: 'Puan' },
                        { value: `${completionPct}%`, label: 'İlerleme' }
                    ].map(s => (
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

export default WeeklyChallengesPanel;
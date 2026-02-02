// frontend/src/components/WeeklyChallengesPanel.js
// 🏆 Weekly Challenges System - Gamification Component

import React, { useState, useEffect, useCallback } from 'react';
import {
    FaTrophy, FaStar, FaFire, FaGem, FaMedal, FaGift,
    FaClock, FaCheck, FaLock, FaArrowRight, FaCoins,
    FaUsers, FaMicrophone, FaComments, FaGamepad,
    FaHeart, FaShare, FaMusic, FaVideo
} from 'react-icons/fa';

/**
 * WeeklyChallengesPanel Component
 * Weekly challenges and rewards system for gamification
 */
const WeeklyChallengesPanel = ({ fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [challenges, setChallenges] = useState({
        weekly: [],
        daily: [],
        special: []
    });
    const [userProgress, setUserProgress] = useState({
        totalPoints: 0,
        weeklyPoints: 0,
        streak: 0,
        completedChallenges: 0,
        rank: 1,
        rewards: []
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('weekly');
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0 });

    const fetchChallenges = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/api/challenges/`);
            if (response.ok) {
                const data = await response.json();
                setChallenges(data.challenges);
                setUserProgress(data.userProgress);
            } else {
                // Demo data
                setChallenges({
                    weekly: [
                        {
                            id: 1,
                            title: 'Sosyal Kelebek',
                            description: '50 mesaj gönder',
                            icon: 'comments',
                            type: 'messages',
                            target: 50,
                            current: 32,
                            points: 100,
                            reward: { type: 'badge', name: 'Konuşkan' },
                            difficulty: 'easy',
                            status: 'in_progress'
                        },
                        {
                            id: 2,
                            title: 'Ses Ustası',
                            description: '2 saat sesli sohbette kal',
                            icon: 'microphone',
                            type: 'voice_time',
                            target: 120,
                            current: 85,
                            points: 200,
                            reward: { type: 'coins', amount: 500 },
                            difficulty: 'medium',
                            status: 'in_progress'
                        },
                        {
                            id: 3,
                            title: 'Topluluk Yıldızı',
                            description: '10 farklı sunucuda aktif ol',
                            icon: 'users',
                            type: 'servers_active',
                            target: 10,
                            current: 10,
                            points: 300,
                            reward: { type: 'badge', name: 'Yıldız' },
                            difficulty: 'hard',
                            status: 'completed'
                        },
                        {
                            id: 4,
                            title: 'Oyun Maratonu',
                            description: '5 oyun aktivitesi başlat',
                            icon: 'gamepad',
                            type: 'games_played',
                            target: 5,
                            current: 2,
                            points: 150,
                            reward: { type: 'xp', amount: 1000 },
                            difficulty: 'medium',
                            status: 'in_progress'
                        },
                        {
                            id: 5,
                            title: 'Kalp Dağıtıcı',
                            description: '25 mesaja tepki ver',
                            icon: 'heart',
                            type: 'reactions',
                            target: 25,
                            current: 0,
                            points: 75,
                            reward: { type: 'emoji', name: '❤️‍🔥' },
                            difficulty: 'easy',
                            status: 'not_started'
                        }
                    ],
                    daily: [
                        {
                            id: 101,
                            title: 'Günlük Selamlama',
                            description: 'İlk mesajını gönder',
                            icon: 'comments',
                            target: 1,
                            current: 1,
                            points: 25,
                            status: 'completed'
                        },
                        {
                            id: 102,
                            title: 'Sesli Katılım',
                            description: 'Bir sesli kanala katıl',
                            icon: 'microphone',
                            target: 1,
                            current: 0,
                            points: 25,
                            status: 'not_started'
                        },
                        {
                            id: 103,
                            title: 'Tepki Ver',
                            description: '5 mesaja emoji tepkisi ver',
                            icon: 'heart',
                            target: 5,
                            current: 3,
                            points: 25,
                            status: 'in_progress'
                        }
                    ],
                    special: [
                        {
                            id: 201,
                            title: 'Yeni Yıl Özel',
                            description: 'Yeni yıl kutlamasına katıl',
                            icon: 'gift',
                            target: 1,
                            current: 0,
                            points: 500,
                            reward: { type: 'special_badge', name: '2026 Yıldızı' },
                            endsAt: '2026-01-31T23:59:59',
                            status: 'locked'
                        }
                    ]
                });
                setUserProgress({
                    totalPoints: 2450,
                    weeklyPoints: 625,
                    streak: 7,
                    completedChallenges: 23,
                    rank: 156,
                    rewards: [
                        { type: 'badge', name: 'Konuşkan', earnedAt: '2026-01-20' },
                        { type: 'badge', name: 'Yeni Başlayan', earnedAt: '2026-01-15' }
                    ]
                });
            }
        } catch (err) {
            console.error('Failed to fetch challenges:', err);
        } finally {
            setLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        fetchChallenges();
    }, [fetchChallenges]);

    // Countdown timer
    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const endOfWeek = new Date();
            endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);

            const diff = endOfWeek - now;
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

            setTimeRemaining({ days, hours, minutes });
        };

        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 60000);
        return () => clearInterval(interval);
    }, []);

    const getIcon = (iconName) => {
        const icons = {
            comments: FaComments,
            microphone: FaMicrophone,
            users: FaUsers,
            gamepad: FaGamepad,
            heart: FaHeart,
            share: FaShare,
            music: FaMusic,
            video: FaVideo,
            gift: FaGift
        };
        const IconComponent = icons[iconName] || FaStar;
        return <IconComponent />;
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy': return '#43b581';
            case 'medium': return '#faa61a';
            case 'hard': return '#f04747';
            default: return '#72767d';
        }
    };

    const getDifficultyStars = (difficulty) => {
        const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
        return Array(count).fill(0).map((_, i) => (
            <FaStar key={i} size={10} color={getDifficultyColor(difficulty)} />
        ));
    };

    const getRewardIcon = (reward) => {
        if (!reward) return null;
        switch (reward.type) {
            case 'badge': return <FaMedal color="#faa61a" />;
            case 'coins': return <FaCoins color="#f1c40f" />;
            case 'xp': return <FaStar color="#5865f2" />;
            case 'emoji': return <span>{reward.name}</span>;
            case 'special_badge': return <FaGem color="#e91e63" />;
            default: return <FaGift color="#43b581" />;
        }
    };

    const getRewardText = (reward) => {
        if (!reward) return '';
        switch (reward.type) {
            case 'badge': return reward.name;
            case 'coins': return `${reward.amount} Coin`;
            case 'xp': return `${reward.amount} XP`;
            case 'emoji': return 'Özel Emoji';
            case 'special_badge': return reward.name;
            default: return 'Ödül';
        }
    };

    const renderChallengeCard = (challenge, isDaily = false) => {
        const progress = (challenge.current / challenge.target) * 100;
        const isCompleted = challenge.status === 'completed';
        const isLocked = challenge.status === 'locked';

        return (
            <div
                key={challenge.id}
                style={{
                    ...styles.challengeCard,
                    opacity: isCompleted ? 0.7 : 1,
                    backgroundColor: isCompleted ? '#202225' : '#2f3136'
                }}
            >
                <div style={styles.challengeIcon}>
                    {isLocked ? (
                        <FaLock size={20} color="#72767d" />
                    ) : isCompleted ? (
                        <FaCheck size={20} color="#43b581" />
                    ) : (
                        <span style={{ color: getDifficultyColor(challenge.difficulty) }}>
                            {getIcon(challenge.icon)}
                        </span>
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
                            <div
                                style={{
                                    ...styles.progressFill,
                                    width: `${Math.min(progress, 100)}%`,
                                    backgroundColor: isCompleted ? '#43b581' : '#5865f2'
                                }}
                            />
                        </div>
                        <span style={styles.progressText}>
                            {challenge.current}/{challenge.target}
                        </span>
                    </div>
                </div>

                <div style={styles.challengeReward}>
                    <div style={styles.pointsBadge}>
                        <FaStar size={10} color="#faa61a" />
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

    if (loading) {
        return (
            <div style={styles.container}>
                <div style={styles.loading}>
                    <FaTrophy className="pulse" size={32} color="#faa61a" />
                    <span>Görevler yükleniyor...</span>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {/* Header with Stats */}
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

            {/* User Stats */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <FaFire size={20} color="#f04747" />
                    <div style={styles.statInfo}>
                        <span style={styles.statValue}>{userProgress.streak}</span>
                        <span style={styles.statLabel}>Günlük Seri</span>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <FaStar size={20} color="#faa61a" />
                    <div style={styles.statInfo}>
                        <span style={styles.statValue}>{userProgress.weeklyPoints}</span>
                        <span style={styles.statLabel}>Haftalık Puan</span>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <FaTrophy size={20} color="#5865f2" />
                    <div style={styles.statInfo}>
                        <span style={styles.statValue}>#{userProgress.rank}</span>
                        <span style={styles.statLabel}>Sıralama</span>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <FaMedal size={20} color="#43b581" />
                    <div style={styles.statInfo}>
                        <span style={styles.statValue}>{userProgress.completedChallenges}</span>
                        <span style={styles.statLabel}>Tamamlanan</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div style={styles.tabs}>
                <button
                    style={{
                        ...styles.tab,
                        ...(activeTab === 'weekly' ? styles.tabActive : {})
                    }}
                    onClick={() => setActiveTab('weekly')}
                >
                    <FaTrophy size={14} />
                    Haftalık ({challenges.weekly.length})
                </button>
                <button
                    style={{
                        ...styles.tab,
                        ...(activeTab === 'daily' ? styles.tabActive : {})
                    }}
                    onClick={() => setActiveTab('daily')}
                >
                    <FaStar size={14} />
                    Günlük ({challenges.daily.length})
                </button>
                <button
                    style={{
                        ...styles.tab,
                        ...(activeTab === 'special' ? styles.tabActive : {})
                    }}
                    onClick={() => setActiveTab('special')}
                >
                    <FaGem size={14} />
                    Özel ({challenges.special.length})
                </button>
            </div>

            {/* Challenges List */}
            <div style={styles.challengesList}>
                {activeTab === 'weekly' && challenges.weekly.map(c => renderChallengeCard(c))}
                {activeTab === 'daily' && challenges.daily.map(c => renderChallengeCard(c, true))}
                {activeTab === 'special' && challenges.special.map(c => renderChallengeCard(c))}
            </div>

            {/* Rewards Section */}
            {userProgress.rewards.length > 0 && (
                <div style={styles.rewardsSection}>
                    <h3 style={styles.rewardsSectionTitle}>
                        <FaGift size={14} /> Kazanılan Ödüller
                    </h3>
                    <div style={styles.rewardsList}>
                        {userProgress.rewards.map((reward, index) => (
                            <div key={index} style={styles.earnedReward}>
                                <FaMedal size={16} color="#faa61a" />
                                <span>{reward.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Weekly Summary */}
            <div style={styles.summaryCard}>
                <div style={styles.summaryHeader}>
                    <FaGem size={16} color="#e91e63" />
                    <span>Bu Hafta</span>
                </div>
                <div style={styles.summaryStats}>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryValue}>
                            {challenges.weekly.filter(c => c.status === 'completed').length}/{challenges.weekly.length}
                        </span>
                        <span style={styles.summaryLabel}>Görev</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryValue}>{userProgress.weeklyPoints}</span>
                        <span style={styles.summaryLabel}>Puan</span>
                    </div>
                    <div style={styles.summaryItem}>
                        <span style={styles.summaryValue}>
                            {Math.round((challenges.weekly.filter(c => c.status === 'completed').length / challenges.weekly.length) * 100)}%
                        </span>
                        <span style={styles.summaryLabel}>İlerleme</span>
                    </div>
                </div>
                <div style={styles.totalProgressBar}>
                    <div
                        style={{
                            ...styles.totalProgressFill,
                            width: `${(challenges.weekly.filter(c => c.status === 'completed').length / challenges.weekly.length) * 100}%`
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '20px',
        color: '#dcddde'
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '60px',
        color: '#b9bbbe'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    title: {
        margin: 0,
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff'
    },
    subtitle: {
        margin: '4px 0 0',
        fontSize: '13px',
        color: '#72767d'
    },
    timer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: '#2f3136',
        borderRadius: '4px',
        fontSize: '13px',
        color: '#b9bbbe'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '12px',
        marginBottom: '20px'
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#2f3136',
        borderRadius: '8px'
    },
    statInfo: {
        display: 'flex',
        flexDirection: 'column'
    },
    statValue: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#fff'
    },
    statLabel: {
        fontSize: '11px',
        color: '#72767d',
        textTransform: 'uppercase'
    },
    tabs: {
        display: 'flex',
        gap: '8px',
        marginBottom: '16px',
        borderBottom: '1px solid #40444b',
        paddingBottom: '12px'
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#72767d',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    tabActive: {
        backgroundColor: '#5865f2',
        color: '#fff'
    },
    challengesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginBottom: '20px'
    },
    challengeCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        transition: 'transform 0.2s'
    },
    challengeIcon: {
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202225',
        borderRadius: '12px',
        fontSize: '20px'
    },
    challengeContent: {
        flex: 1
    },
    challengeHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '4px'
    },
    challengeTitle: {
        margin: 0,
        fontSize: '15px',
        fontWeight: '600',
        color: '#fff'
    },
    difficultyStars: {
        display: 'flex',
        gap: '2px'
    },
    challengeDescription: {
        margin: '0 0 8px',
        fontSize: '13px',
        color: '#b9bbbe'
    },
    progressContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    progressBar: {
        flex: 1,
        height: '6px',
        backgroundColor: '#202225',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#5865f2',
        borderRadius: '3px',
        transition: 'width 0.3s'
    },
    progressText: {
        fontSize: '12px',
        color: '#72767d',
        minWidth: '45px',
        textAlign: 'right'
    },
    challengeReward: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px'
    },
    pointsBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        backgroundColor: 'rgba(250, 166, 26, 0.2)',
        borderRadius: '12px',
        fontSize: '12px',
        color: '#faa61a',
        fontWeight: '600'
    },
    rewardBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        backgroundColor: 'rgba(88, 101, 242, 0.2)',
        borderRadius: '12px',
        fontSize: '11px',
        color: '#dcddde'
    },
    rewardsSection: {
        marginBottom: '20px'
    },
    rewardsSectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '0 0 12px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff'
    },
    rewardsList: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px'
    },
    earnedReward: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 12px',
        backgroundColor: '#2f3136',
        borderRadius: '16px',
        fontSize: '13px',
        color: '#dcddde'
    },
    summaryCard: {
        padding: '20px',
        backgroundColor: 'linear-gradient(135deg, #5865f2 0%, #7289da 100%)',
        background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.3) 0%, rgba(114, 137, 218, 0.3) 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(88, 101, 242, 0.5)'
    },
    summaryHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '16px',
        fontSize: '14px',
        fontWeight: '600',
        color: '#fff'
    },
    summaryStats: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '16px'
    },
    summaryItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    summaryValue: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#fff'
    },
    summaryLabel: {
        fontSize: '11px',
        color: '#b9bbbe',
        textTransform: 'uppercase'
    },
    totalProgressBar: {
        height: '8px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '4px',
        overflow: 'hidden'
    },
    totalProgressFill: {
        height: '100%',
        backgroundColor: '#43b581',
        borderRadius: '4px',
        transition: 'width 0.3s'
    }
};

export default WeeklyChallengesPanel;

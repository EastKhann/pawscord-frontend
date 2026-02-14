// WeeklyChallengesPanel/hooks/useChallenges.js
import { useState, useEffect, useCallback } from 'react';
import { FaComments, FaMicrophone, FaUsers, FaGamepad, FaHeart, FaShare, FaMusic, FaVideo, FaGift, FaStar, FaMedal, FaCoins, FaGem } from 'react-icons/fa';

const DEMO_CHALLENGES = {
    weekly: [
        { id: 1, title: 'Sosyal Kelebek', description: '50 mesaj g\u00F6nder', icon: 'comments', type: 'messages', target: 50, current: 32, points: 100, reward: { type: 'badge', name: 'Konu\u015Fkan' }, difficulty: 'easy', status: 'in_progress' },
        { id: 2, title: 'Ses Ustas\u0131', description: '2 saat sesli sohbette kal', icon: 'microphone', type: 'voice_time', target: 120, current: 85, points: 200, reward: { type: 'coins', amount: 500 }, difficulty: 'medium', status: 'in_progress' },
        { id: 3, title: 'Topluluk Y\u0131ld\u0131z\u0131', description: '10 farkl\u0131 sunucuda aktif ol', icon: 'users', type: 'servers_active', target: 10, current: 10, points: 300, reward: { type: 'badge', name: 'Y\u0131ld\u0131z' }, difficulty: 'hard', status: 'completed' },
        { id: 4, title: 'Oyun Maratonu', description: '5 oyun aktivitesi ba\u015Flat', icon: 'gamepad', type: 'games_played', target: 5, current: 2, points: 150, reward: { type: 'xp', amount: 1000 }, difficulty: 'medium', status: 'in_progress' },
        { id: 5, title: 'Kalp Da\u011F\u0131t\u0131c\u0131', description: '25 mesaja tepki ver', icon: 'heart', type: 'reactions', target: 25, current: 0, points: 75, reward: { type: 'emoji', name: '\u2764\uFE0F\u200D\uD83D\uDD25' }, difficulty: 'easy', status: 'not_started' }
    ],
    daily: [
        { id: 101, title: 'G\u00FCnl\u00FCk Selamlama', description: '\u0130lk mesaj\u0131n\u0131 g\u00F6nder', icon: 'comments', target: 1, current: 1, points: 25, status: 'completed' },
        { id: 102, title: 'Sesli Kat\u0131l\u0131m', description: 'Bir sesli kanala kat\u0131l', icon: 'microphone', target: 1, current: 0, points: 25, status: 'not_started' },
        { id: 103, title: 'Tepki Ver', description: '5 mesaja emoji tepkisi ver', icon: 'heart', target: 5, current: 3, points: 25, status: 'in_progress' }
    ],
    special: [
        { id: 201, title: 'Yeni Y\u0131l \u00D6zel', description: 'Yeni y\u0131l kutlamas\u0131na kat\u0131l', icon: 'gift', target: 1, current: 0, points: 500, reward: { type: 'special_badge', name: '2026 Y\u0131ld\u0131z\u0131' }, endsAt: '2026-01-31T23:59:59', status: 'locked' }
    ]
};

const DEMO_PROGRESS = {
    totalPoints: 2450, weeklyPoints: 625, streak: 7, completedChallenges: 23, rank: 156,
    rewards: [
        { type: 'badge', name: 'Konu\u015Fkan', earnedAt: '2026-01-20' },
        { type: 'badge', name: 'Yeni Ba\u015Flayan', earnedAt: '2026-01-15' }
    ]
};

const ICON_MAP = {
    comments: FaComments, microphone: FaMicrophone, users: FaUsers,
    gamepad: FaGamepad, heart: FaHeart, share: FaShare,
    music: FaMusic, video: FaVideo, gift: FaGift
};

export const getIcon = (iconName) => {
    const Icon = ICON_MAP[iconName] || FaStar;
    return <Icon />;
};

export const getDifficultyColor = (d) => d === 'easy' ? '#43b581' : d === 'medium' ? '#faa61a' : d === 'hard' ? '#f04747' : '#72767d';

export const getDifficultyStars = (difficulty) => {
    const count = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array(count).fill(0).map((_, i) => <FaStar key={i} size={10} color={getDifficultyColor(difficulty)} />);
};

export const getRewardIcon = (reward) => {
    if (!reward) return null;
    const map = { badge: <FaMedal color="#faa61a" />, coins: <FaCoins color="#f1c40f" />, xp: <FaStar color="#5865f2" />, emoji: <span>{reward.name}</span>, special_badge: <FaGem color="#e91e63" /> };
    return map[reward.type] || <FaGift color="#43b581" />;
};

export const getRewardText = (reward) => {
    if (!reward) return '';
    const map = { badge: reward.name, coins: `${reward.amount} Coin`, xp: `${reward.amount} XP`, emoji: '\u00D6zel Emoji', special_badge: reward.name };
    return map[reward.type] || '\u00D6d\u00FCl';
};

const useChallenges = (fetchWithAuth, apiBaseUrl) => {
    const [challenges, setChallenges] = useState({ weekly: [], daily: [], special: [] });
    const [userProgress, setUserProgress] = useState({ totalPoints: 0, weeklyPoints: 0, streak: 0, completedChallenges: 0, rank: 1, rewards: [] });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('weekly');
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0 });

    const fetchChallenges = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/challenges/`);
            if (response.ok) {
                const data = await response.json();
                setChallenges(data.challenges);
                setUserProgress(data.userProgress);
            } else {
                setChallenges(DEMO_CHALLENGES);
                setUserProgress(DEMO_PROGRESS);
            }
        } catch (err) {
            console.error('Failed to fetch challenges:', err);
        } finally {
            setLoading(false);
        }
    }, [fetchWithAuth, apiBaseUrl]);

    useEffect(() => { fetchChallenges(); }, [fetchChallenges]);

    useEffect(() => {
        const calc = () => {
            const now = new Date();
            const endOfWeek = new Date();
            endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
            endOfWeek.setHours(23, 59, 59, 999);
            const diff = endOfWeek - now;
            setTimeRemaining({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
            });
        };
        calc();
        const interval = setInterval(calc, 60000);
        return () => clearInterval(interval);
    }, []);

    return { challenges, userProgress, loading, activeTab, setActiveTab, timeRemaining };
};

export default useChallenges;

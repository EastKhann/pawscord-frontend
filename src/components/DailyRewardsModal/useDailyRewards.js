import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

export const calculateTimeUntilNextReward = (lastClaimed) => {
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

export default function useDailyRewards({ fetchWithAuth, apiBaseUrl }) {
    const [rewards, setRewards] = useState([]);
    const [streak, setStreak] = useState(0);
    const [canClaim, setCanClaim] = useState(false);
    const [loading, setLoading] = useState(true);
    const [claiming, setClaiming] = useState(false);
    const [lastClaimed, setLastClaimed] = useState(null);

    useEffect(() => { loadDailyRewards(); }, []);

    const loadDailyRewards = async () => {
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/rewards/daily/`);
            const data = await r.json();
            setRewards(data.rewards || []); setStreak(data.streak || 0); setCanClaim(data.can_claim || false); setLastClaimed(data.last_claimed);
        } catch (e) { console.error('Failed to load daily rewards:', e); toast.error('Failed to load rewards'); }
        finally { setLoading(false); }
    };

    const handleClaim = async () => {
        if (!canClaim) { toast.error('Already claimed today!'); return; }
        setClaiming(true);
        try {
            const r = await fetchWithAuth(`${apiBaseUrl}/rewards/claim/`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
            const data = await r.json();
            if (data.success) { toast.success(`Claimed ${data.reward.amount} ${data.reward.type}! 🎁`); loadDailyRewards(); }
            else toast.error(data.error || 'Failed to claim reward');
        } catch (e) { console.error('Claim error:', e); toast.error('Failed to claim reward'); }
        finally { setClaiming(false); }
    };

    const nextReward = rewards[streak % 7] || null;

    return { rewards, streak, canClaim, loading, claiming, lastClaimed, nextReward, handleClaim };
}

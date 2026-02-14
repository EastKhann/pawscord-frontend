import { useState } from 'react';
import toast from '../../utils/toast';
import { authGet, authPost, authDelete } from './profileApiUtils';

const useProfileData = ({ user }) => {
    const [badges, setBadges] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [userStats, setUserStats] = useState({
        level: 1, xp: 0, next_level_xp: 100, total_messages: 0, coins: 0,
    });
    const [premiumStatus, setPremiumStatus] = useState(null);
    const [storeBalance, setStoreBalance] = useState(0);
    const [userActivity, setUserActivity] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [gdprExports, setGdprExports] = useState([]);
    const [exportRequested, setExportRequested] = useState(false);

    const fetchBadges = async () => {
        try {
            const response = await authGet('/api/user/badges/');
            setBadges(response.data || []);
        } catch (err) { console.error('Badges fetch failed:', err); setBadges([]); }
    };

    const fetchAchievements = async () => {
        try {
            const response = await authGet('/api/user/achievements/');
            setAchievements(response.data || []);
        } catch (err) { console.error('Achievements fetch failed:', err); setAchievements([]); }
    };

    const calculateXPProgress = () => {
        const { xp, next_level_xp } = userStats;
        return Math.min((xp / next_level_xp) * 100, 100);
    };

    const fetchPremiumStatus = async () => {
        try {
            const response = await authGet('/api/premium/status/');
            setPremiumStatus(response.data);
        } catch (err) { console.error('Premium status fetch failed:', err); }
    };

    const fetchStoreBalance = async () => {
        try {
            const response = await authGet('/api/store/balance/');
            setStoreBalance(response.data?.balance || 0);
        } catch (err) { console.error('Store balance fetch failed:', err); }
    };

    const fetchUserActivity = async () => {
        try {
            const response = await authGet(`/activity/${user.username}/`);
            setUserActivity(response.data || []);
        } catch (err) { console.error('User activity fetch failed:', err); setUserActivity([]); }
    };

    const fetchDrafts = async () => {
        try {
            const response = await authGet('/api/drafts/list/');
            setDrafts(response.data || []);
        } catch (err) { console.error('Drafts fetch failed:', err); setDrafts([]); }
    };

    const deleteDraft = async (draftKey) => {
        try {
            await authDelete(`/api/drafts/${draftKey}/`);
            toast.success('Taslak silindi.');
            fetchDrafts();
        } catch (err) { toast.error('Taslak silinemedi.'); }
    };

    const requestGDPRExport = async () => {
        try {
            setExportRequested(true);
            const response = await authPost('/gdpr/request/');
            toast.success('\u2705 GDPR d\u0131\u015Fa aktarma talebi olu\u015Fturuldu!');
            setGdprExports(prev => [response.data, ...prev]);
        } catch (err) {
            toast.error('GDPR talebi olu\u015Fturulamad\u0131: ' + (err.response?.data?.error || 'Hata'));
        } finally { setExportRequested(false); }
    };

    const fetchGDPRExports = async () => { setGdprExports([]); };

    return {
        badges, achievements, userStats, premiumStatus, storeBalance,
        userActivity, drafts, bookmarks, gdprExports, exportRequested,
        fetchBadges, fetchAchievements, calculateXPProgress,
        fetchPremiumStatus, fetchStoreBalance, fetchUserActivity,
        fetchDrafts, deleteDraft, requestGDPRExport, fetchGDPRExports,
    };
};

export default useProfileData;

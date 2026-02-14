// UserProfileModal/hooks/useProfileModal.js
import { useState, useEffect } from 'react';
import toast from '../../utils/toast';

export const getIconForLink = (key) => {
    if (key.includes('steam')) return 'fab fa-steam';
    if (key.includes('x')) return 'fab fa-twitter';
    if (key.includes('instagram')) return 'fab fa-instagram';
    return 'fa fa-link';
};

export const formatUrl = (url, key) => {
    if (!url || url.trim() === '') return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (key === 'x') return `https://x.com/${url.replace('@', '')}`;
    if (key === 'instagram') return `https://instagram.com/${url.replace('@', '')}`;
    return `https://${url}`;
};

export const linkDisplayNames = {
    steam_trade: 'Steam Trade URL',
    steam_profile: 'Steam Profili',
    steam_friend_code: 'Steam Arkada\u015F Kodu',
    x: 'X (Twitter)',
    instagram: 'Instagram'
};

export const useProfileModal = ({ user, fetchWithAuth, apiBaseUrl, currentUser, friendsList }) => {
    const [requestStatus, setRequestStatus] = useState('idle');
    const [showSessionManager, setShowSessionManager] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [presenceHistory, setPresenceHistory] = useState([]);

    useEffect(() => {
        if (activeTab === 'activity' && user?.username) {
            const fetchPresenceHistory = async () => {
                try {
                    const response = await fetchWithAuth(`${apiBaseUrl}/presence/${user.username}/`);
                    if (response.ok) {
                        const data = await response.json();
                        setPresenceHistory(data.presence || []);
                    }
                } catch (error) {
                    console.error('Failed to fetch presence history:', error);
                    setPresenceHistory([]);
                }
            };
            fetchPresenceHistory();
        }
    }, [activeTab, user?.username, fetchWithAuth, apiBaseUrl]);

    const isFriend = friendsList && Array.isArray(friendsList) && (
        friendsList.some(f => {
            if (typeof f === 'string') return f === user?.username;
            return f.username === user?.username || f.sender_username === user?.username || f.receiver_username === user?.username;
        })
    );
    const isSelf = user?.username === currentUser;

    const handleAddFriend = async () => {
        setRequestStatus('loading');
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/send/`, { method: 'POST', body: JSON.stringify({ username: user.username }) });
            if (response.ok) { setRequestStatus('success'); }
            else { toast.error('\u274C \u0130stek g\u00F6nderilemedi. Zaten ekli veya bekliyor olabilir.'); setRequestStatus('idle'); }
        } catch (error) { console.error('Arkada\u015F ekleme hatas\u0131:', error); setRequestStatus('idle'); }
    };

    const copyToClipboard = (text, key) => {
        try { navigator.clipboard.writeText(text); toast.success(`\u2705 '${key}' panoya kopyaland\u0131`); }
        catch (err) { toast.error('\u274C Kopyalama hatas\u0131.'); }
    };

    const handleSendMoney = async () => {
        const amount = prompt(`Ne kadar Coin g\u00F6ndermek istiyorsun? (${user.username} ki\u015Fisine)`);
        if (!amount) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/transfer/`, { method: 'POST', body: JSON.stringify({ target_username: user.username, amount }) });
            const data = await res.json();
            if (res.ok) { toast.success(data.message); } else { toast.error(data.error); }
        } catch (e) { toast.error('\u274C Hata.'); }
    };

    const socialLinks = user?.social_links || {};
    const validLinks = Object.entries(socialLinks).filter(([, value]) => value && value.trim() !== '');

    return {
        requestStatus, showSessionManager, setShowSessionManager,
        showNotes, setShowNotes, activeTab, setActiveTab,
        presenceHistory, isFriend, isSelf,
        handleAddFriend, copyToClipboard, handleSendMoney, validLinks
    };
};

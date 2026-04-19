// UserProfileModal/hooks/useProfileModal.js
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../../utils/toast';
import logger from '../../utils/logger';

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
    steam_friend_code: 'Steam Friend Kodu',
    x: 'X (Twitter)',
    instagram: 'Instagram',
};

export const useProfileModal = ({ user, fetchWithAuth, apiBaseUrl, currentUser, friendsList }) => {
    const { t } = useTranslation();
    const [requestStatus, setRequestStatus] = useState('idle');
    const [isLoading, setIsLoading] = useState(false);
    const [showSessionManager, setShowSessionManager] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [presenceHistory, setPresenceHistory] = useState([]);

    useEffect(() => {
        if (activeTab === 'activity' && user?.username) {
            const fetchPresenceHistory = async () => {
                try {
                    const response = await fetchWithAuth(
                        `${apiBaseUrl}/presence/${user.username}/`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        setPresenceHistory(data.presence || []);
                    }
                } catch (error) {
                    logger.error('Failed to fetch presence history:', error);
                    setPresenceHistory([]);
                }
            };
            fetchPresenceHistory();
        }
    }, [activeTab, user?.username, fetchWithAuth, apiBaseUrl]);

    const isFriend =
        friendsList &&
        Array.isArray(friendsList) &&
        friendsList.some((f) => {
            if (typeof f === 'string') return f === user?.username;
            return (
                f.username === user?.username ||
                f.sender_username === user?.username ||
                f.receiver_username === user?.username
            );
        });
    const isSelf = user?.username === currentUser;

    const handleAddFriend = async () => {
        setRequestStatus('loading');
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/send/`, {
                method: 'POST',
                body: JSON.stringify({ username: user.username }),
            });
            if (response.ok) {
                setRequestStatus('success');
            } else {
                toast.error(t('profile.friendRequestFailed'));
                setRequestStatus('idle');
            }
        } catch (error) {
            logger.error('Friend addme hatası:', error);
            setRequestStatus('idle');
        }
    };

    const copyToClipboard = (text, key) => {
        try {
            navigator.clipboard.writeText(text);
            toast.success(t('profile.copied', { key }));
        } catch (err) {
            toast.error(t('profile.copyFailed'));
        }
    };

    const handleSendMoney = async () => {
        const amount = prompt(`How many coins do you want to send to ${user.username}?`);
        if (!amount) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/store/transfer/`, {
                method: 'POST',
                body: JSON.stringify({ target_username: user.username, amount }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.error);
            }
        } catch (e) {
            toast.error(t('profile.actionError'));
        }
    };

    const socialLinks = user?.social_links || {};
    const validLinks = Object.entries(socialLinks).filter(
        ([, value]) => value && value.trim() !== ''
    );

    return {
        requestStatus,
        showSessionManager,
        setShowSessionManager,
        showNotes,
        setShowNotes,
        activeTab,
        setActiveTab,
        presenceHistory,
        isFriend,
        isSelf,
        handleAddFriend,
        copyToClipboard,
        handleSendMoney,
        validLinks,
    };
};

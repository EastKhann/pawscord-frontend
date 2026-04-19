import { useState } from 'react';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import { authGet, authPost, authDelete } from './profileApiUtils';
import logger from '../../utils/logger';
import { useTranslation } from 'react-i18next';

const useProfileSocial = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState({});
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const fetchBlockedUsers = async () => {
        try {
            const response = await authGet('/blocks/list/');
            setBlockedUsers(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            logger.error('Blocked users fetch failed:', err);
            setBlockedUsers([]);
        }
    };

    const unblockUser = async (userId) => {
        try {
            await authPost('/blocks/unblock/', { user_id: userId });
            toast.success(t('profile.blockRemoved'));
            fetchBlockedUsers();
        } catch (err) {
            toast.error(t('profile.blockRemoveFailed'));
        }
    };

    const fetchFriendRequests = async () => {
        try {
            const response = await authGet('/friends/requests/');
            setFriendRequests(response.data?.pending || []);
            setFriends(response.data?.friends || []);
        } catch (err) {
            logger.error('Friend requests fetch failed:', err);
            setFriendRequests([]);
            setFriends([]);
        }
    };

    const respondToFriendRequest = async (requestId, action) => {
        try {
            await authPost(`/friends/respond/${requestId}/`, { action });
            toast.success(action === 'accept' ? '✅ Friend added!' : '❌ Request rejected.');
            fetchFriendRequests();
        } catch (err) {
            toast.error(t('common.errorOccurred'));
        }
    };

    const removeFriend = async (friendshipId) => {
        if (!(await confirmDialog('Are you sure you want to remove this friend?'))) return;
        try {
            await authDelete(`/friends/remove/${friendshipId}/`);
            toast.success(t('profile.friendRemoved'));
            fetchFriendRequests();
        } catch (err) {
            toast.error(t('profile.friendRemoveFailed'));
        }
    };

    return {
        loading,
        blockedUsers,
        friendRequests,
        friends,
        fetchBlockedUsers,
        unblockUser,
        fetchFriendRequests,
        respondToFriendRequest,
        removeFriend,
    };
};

export default useProfileSocial;

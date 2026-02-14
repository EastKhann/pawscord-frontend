import { useState } from 'react';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import { authGet, authPost, authDelete } from './profileApiUtils';

const useProfileSocial = () => {
    const [loading, setLoading] = useState({});
    const [blockedUsers, setBlockedUsers] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    const fetchBlockedUsers = async () => {
        try {
            const response = await authGet('/blocks/list/');
            setBlockedUsers(Array.isArray(response.data) ? response.data : []);
        } catch (err) { console.error('Blocked users fetch failed:', err); setBlockedUsers([]); }
    };

    const unblockUser = async (userId) => {
        try {
            await authPost('/blocks/unblock/', { user_id: userId });
            toast.success('\u2705 Kullan\u0131c\u0131 engeli kald\u0131r\u0131ld\u0131!');
            fetchBlockedUsers();
        } catch (err) { toast.error('Engel kald\u0131r\u0131lamad\u0131.'); }
    };

    const fetchFriendRequests = async () => {
        try {
            const response = await authGet('/friends/requests/');
            setFriendRequests(response.data?.pending || []);
            setFriends(response.data?.friends || []);
        } catch (err) { console.error('Friend requests fetch failed:', err); setFriendRequests([]); setFriends([]); }
    };

    const respondToFriendRequest = async (requestId, action) => {
        try {
            await authPost(`/friends/respond/${requestId}/`, { action });
            toast.success(action === 'accept' ? '\u2705 Arkada\u015F eklendi!' : '\u274C \u0130stek reddedildi.');
            fetchFriendRequests();
        } catch (err) { toast.error('\u0130\u015Flem ba\u015Far\u0131s\u0131z.'); }
    };

    const removeFriend = async (friendshipId) => {
        if (!await confirmDialog('Arkada\u015F\u0131 kald\u0131rmak istedi\u011Finize emin misiniz?')) return;
        try {
            await authDelete(`/friends/remove/${friendshipId}/`);
            toast.success('Arkada\u015F kald\u0131r\u0131ld\u0131.');
            fetchFriendRequests();
        } catch (err) { toast.error('Arkada\u015F kald\u0131r\u0131lamad\u0131.'); }
    };

    return {
        loading, blockedUsers, friendRequests, friends,
        fetchBlockedUsers, unblockUser, fetchFriendRequests,
        respondToFriendRequest, removeFriend,
    };
};

export default useProfileSocial;

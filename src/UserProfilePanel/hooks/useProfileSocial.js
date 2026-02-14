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
            toast.success('✅ Kullanıcı engeli kaldırıldı!');
            fetchBlockedUsers();
        } catch (err) { toast.error('Engel kaldırılamadı.'); }
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
            toast.success(action === 'accept' ? '✅ Arkadaş eklendi!' : '❌ İstek reddedildi.');
            fetchFriendRequests();
        } catch (err) { toast.error('İşlem başarısız.'); }
    };

    const removeFriend = async (friendshipId) => {
        if (!await confirmDialog('Arkadaşı kaldırmak istediğinize emin misiniz?')) return;
        try {
            await authDelete(`/friends/remove/${friendshipId}/`);
            toast.success('Arkadaş kaldırıldı.');
            fetchFriendRequests();
        } catch (err) { toast.error('Arkadaş kaldırılamadı.'); }
    };

    return {
        loading, blockedUsers, friendRequests, friends,
        fetchBlockedUsers, unblockUser, fetchFriendRequests,
        respondToFriendRequest, removeFriend,
    };
};

export default useProfileSocial;

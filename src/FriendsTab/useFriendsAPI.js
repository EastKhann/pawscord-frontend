import { useState, useEffect, useCallback } from 'react';
import { useGlobalWebSocket } from '../GlobalWebSocketContext';
import confirmDialog from '../utils/confirmDialog';

const useFriendsAPI = ({ fetchWithAuth, apiBaseUrl, onPendingCountChange }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [friends, setFriends] = useState([]);
    const [requests, setRequests] = useState([]);
    const [outgoing, setOutgoing] = useState([]);
    const [addUsername, setAddUsername] = useState('');
    const [loading, setLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState(null);

    const { globalData } = useGlobalWebSocket();

    const fetchFriendData = useCallback(async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/list/`);
            if (response.ok) {
                const data = await response.json();
                setFriends(data.friends || []);
                setRequests(data.incoming_requests || []);
                setOutgoing(data.outgoing_requests || []);
                if (onPendingCountChange) onPendingCountChange((data.incoming_requests || []).length);
            }
        } catch (error) {
            console.error("Arkadaş listesi çekilemedi:", error);
        } finally { setLoading(false); }
    }, [apiBaseUrl, fetchWithAuth, onPendingCountChange]);

    useEffect(() => { fetchFriendData(); }, [fetchFriendData]);

    useEffect(() => {
        if (globalData?.type === 'friend_list_update') {
            fetchFriendData();
            setStatusMsg({ type: 'info', text: '🔔 Arkadaş listeniz güncellendi! "Bekleyenler" sekmesini kontrol edin.' });
            setTimeout(() => setStatusMsg(null), 5000);
        }
    }, [globalData, fetchFriendData]);

    const handleSendRequest = useCallback(async (e) => {
        e.preventDefault();
        if (!addUsername.trim()) return;
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/send/`, {
                method: 'POST', body: JSON.stringify({ username: addUsername.trim() })
            });
            const data = await response.json();
            if (response.ok) {
                setStatusMsg({ type: 'success', text: `✅ İstek gönderildi: ${addUsername}` });
                setAddUsername(''); fetchFriendData();
            } else { setStatusMsg({ type: 'error', text: `❌ ${data.error || 'Hata.'}` }); }
        } catch (error) { setStatusMsg({ type: 'error', text: '❌ Sunucu hatası.' }); }
    }, [addUsername, apiBaseUrl, fetchWithAuth, fetchFriendData]);

    const handleRespond = useCallback(async (requestId, action) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/respond/${requestId}/`, {
                method: 'POST', body: JSON.stringify({ action })
            });
            if (response.ok) {
                fetchFriendData();
                setStatusMsg({ type: 'success', text: action === 'accept' ? 'Arkadaşlık kabul edildi!' : 'İstek reddedildi.' });
            }
        } catch (error) { console.error("İşlem başarısız:", error); }
    }, [apiBaseUrl, fetchWithAuth, fetchFriendData]);

    const handleRemoveFriend = useCallback(async (friendId, friendUsername) => {
        if (!await confirmDialog(`${friendUsername} ile arkadaşlığı sonlandırmak istediğinize emin misiniz?`)) return;
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/remove/${friendId}/`, { method: 'DELETE' });
            if (response.ok) { fetchFriendData(); setStatusMsg({ type: 'success', text: '❌ Arkadaşlık sonlandırıldı.' }); }
            else { setStatusMsg({ type: 'error', text: '❌ Silme başarısız.' }); }
        } catch (error) { console.error("Arkadaş silme hatası:", error); setStatusMsg({ type: 'error', text: '❌ Sunucu hatası.' }); }
    }, [apiBaseUrl, fetchWithAuth, fetchFriendData]);

    return {
        activeTab, setActiveTab, friends, requests, outgoing,
        addUsername, setAddUsername, loading, statusMsg, setStatusMsg,
        handleSendRequest, handleRespond, handleRemoveFriend
    };
};

export default useFriendsAPI;

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
            console.error("Arkada\u015F listesi \u00E7ekilemedi:", error);
        } finally { setLoading(false); }
    }, [apiBaseUrl, fetchWithAuth, onPendingCountChange]);

    useEffect(() => { fetchFriendData(); }, [fetchFriendData]);

    useEffect(() => {
        if (globalData?.type === 'friend_list_update') {
            fetchFriendData();
            setStatusMsg({ type: 'info', text: '\uD83D\uDD14 Arkada\u015F listeniz g\u00FCncellendi! "Bekleyenler" sekmesini kontrol edin.' });
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
                setStatusMsg({ type: 'success', text: `\u2705 \u0130stek g\u00F6nderildi: ${addUsername}` });
                setAddUsername(''); fetchFriendData();
            } else { setStatusMsg({ type: 'error', text: `\u274C ${data.error || 'Hata.'}` }); }
        } catch (error) { setStatusMsg({ type: 'error', text: '\u274C Sunucu hatas\u0131.' }); }
    }, [addUsername, apiBaseUrl, fetchWithAuth, fetchFriendData]);

    const handleRespond = useCallback(async (requestId, action) => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/respond/${requestId}/`, {
                method: 'POST', body: JSON.stringify({ action })
            });
            if (response.ok) {
                fetchFriendData();
                setStatusMsg({ type: 'success', text: action === 'accept' ? 'Arkada\u015Fl\u0131k kabul edildi!' : '\u0130stek reddedildi.' });
            }
        } catch (error) { console.error("\u0130\u015Flem ba\u015Far\u0131s\u0131z:", error); }
    }, [apiBaseUrl, fetchWithAuth, fetchFriendData]);

    const handleRemoveFriend = useCallback(async (friendId, friendUsername) => {
        if (!await confirmDialog(`${friendUsername} ile arkada\u015Fl\u0131\u011F\u0131 sonland\u0131rmak istedi\u011Finize emin misiniz?`)) return;
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/friends/remove/${friendId}/`, { method: 'DELETE' });
            if (response.ok) { fetchFriendData(); setStatusMsg({ type: 'success', text: '\u274C Arkada\u015Fl\u0131k sonland\u0131r\u0131ld\u0131.' }); }
            else { setStatusMsg({ type: 'error', text: '\u274C Silme ba\u015Far\u0131s\u0131z.' }); }
        } catch (error) { console.error("Arkada\u015F silme hatas\u0131:", error); setStatusMsg({ type: 'error', text: '\u274C Sunucu hatas\u0131.' }); }
    }, [apiBaseUrl, fetchWithAuth, fetchFriendData]);

    return {
        activeTab, setActiveTab, friends, requests, outgoing,
        addUsername, setAddUsername, loading, statusMsg, setStatusMsg,
        handleSendRequest, handleRespond, handleRemoveFriend
    };
};

export default useFriendsAPI;

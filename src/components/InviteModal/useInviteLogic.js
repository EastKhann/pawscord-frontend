import { useState, useEffect, useRef } from 'react';
import toast from '../../utils/toast';
import { PRODUCTION_URL } from '../../utils/constants';

const useInviteLogic = ({ server, fetchWithAuth, apiBaseUrl, currentUser }) => {
    const [friends, setFriends] = useState([]);
    const [loadingFriends, setLoadingFriends] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [invitedUsers, setInvitedUsers] = useState(new Set());
    const [inviteLink, setInviteLink] = useState('');
    const [copied, setCopied] = useState(false);
    const [loadingLink, setLoadingLink] = useState(true);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        fetchFriends();
        getOrCreatePermanentLink();
        setTimeout(() => searchRef.current?.focus(), 100);
    }, []);

    const getOrCreatePermanentLink = async () => {
        if (!server?.id) { setLoadingLink(false); return; }
        setLoadingLink(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: server.id, max_uses: 0, expires_in_hours: 0 })
            });
            if (res.ok) {
                const data = await res.json();
                setInviteLink(data.url || data.invite_link || `${PRODUCTION_URL}/#/invite/${data.code}`);
            } else {
                console.error('[InviteModal] Create failed:', await res.json().catch(() => ({})));
            }
        } catch (e) {
            console.error('[InviteModal] Create error:', e);
        } finally {
            setLoadingLink(false);
        }
    };

    const regenerateLink = async () => {
        if (!server?.id) return;
        setIsRegenerating(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_id: server.id, max_uses: 0, expires_in_hours: 0 })
            });
            if (res.ok) {
                const data = await res.json();
                setInviteLink(data.url || data.invite_link || `${PRODUCTION_URL}/#/invite/${data.code}`);
                toast.success('\uD83D\uDD17 Yeni davet linki olu\u015Fturuldu!');
            } else {
                toast.error('Link olu\u015Fturulamad\u0131');
            }
        } catch (e) {
            toast.error('Link olu\u015Fturulurken hata: ' + e.message);
        } finally {
            setIsRegenerating(false);
        }
    };

    const fetchFriends = async () => {
        setLoadingFriends(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/friends/list/`);
            if (res.ok) {
                const data = await res.json();
                setFriends(Array.isArray(data) ? data : (data.friends || []));
            }
        } catch (e) {
            console.error("Arkada\u015F listesi hatas\u0131:", e);
        } finally {
            setLoadingFriends(false);
        }
    };

    const sendInviteToFriend = async (friendUsername) => {
        setInvitedUsers(prev => new Set(prev).add(friendUsername));
        try {
            let link = inviteLink;
            if (!link) {
                const inviteRes = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ server_id: server.id, max_uses: 1, expires_in_hours: 24 })
                });
                if (!inviteRes.ok) throw new Error('Davet olu\u015Fturulamad\u0131');
                const inviteData = await inviteRes.json();
                link = inviteData.url || inviteData.invite_link;
            }
            const convRes = await fetchWithAuth(`${apiBaseUrl}/conversations/find_or_create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ target_username: friendUsername })
            });
            if (!convRes.ok) throw new Error('DM olu\u015Fturulamad\u0131');
            const convData = await convRes.json();
            const msgRes = await fetchWithAuth(`${apiBaseUrl}/messages/send_dm/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    conversation_id: convData.conversation_id,
                    content: `Hey! Seni **${server?.name || 'sunucu'}** sunucusuna davet ediyorum! \uD83C\uDF89\n${link}`
                })
            });
            if (msgRes.ok) {
                toast.success(`\u2705 ${friendUsername} kullan\u0131c\u0131s\u0131na davet g\u00F6nderildi!`);
            } else {
                navigator.clipboard.writeText(link);
                toast.success(`Link kopyaland\u0131! ${friendUsername} ile payla\u015Fabilirsiniz.`);
            }
        } catch (e) {
            setInvitedUsers(prev => {
                const next = new Set(prev);
                next.delete(friendUsername);
                return next;
            });
            toast.error("Davet g\u00F6nderilemedi: " + e.message);
        }
    };

    const getFriendName = (friendship) => {
        if (!currentUser) return friendship.receiver_username;
        return friendship.sender_username === currentUser
            ? friendship.receiver_username
            : friendship.sender_username;
    };

    const getFriendAvatar = (friendship) => {
        const name = getFriendName(friendship);
        return friendship.sender_username === name
            ? friendship.sender_avatar
            : friendship.receiver_avatar;
    };

    const filteredFriends = friends.filter(f => {
        const name = getFriendName(f);
        return name?.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        toast.success('\uD83D\uDCCB Davet linki kopyaland\u0131!');
        setTimeout(() => setCopied(false), 2000);
    };

    return {
        friends, loadingFriends, searchQuery, setSearchQuery,
        invitedUsers, inviteLink, copied, loadingLink, isRegenerating,
        searchRef, filteredFriends,
        getOrCreatePermanentLink, regenerateLink, sendInviteToFriend,
        getFriendName, getFriendAvatar, copyToClipboard,
    };
};

export default useInviteLogic;

/**
 * 🔧 useServerHandlers — Server drag/drop/reorder, auth, user context actions
 * Extracted from App.js
 */
import { useState, useCallback } from 'react';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';

export default function useServerHandlers({
    username, fetchWithAuth, categories, allUsers, friendsList,
    serverMembers, isAdmin, currentVoiceRoom,
    setUpdateStatusText, setFriendsList, setInviteToServerUser,
    API_BASE_URL, handleDMClick, isInVoice,
    setServerOrder, serverOrder,
    setActiveChat, setCurrentUserProfile, setCategories,
    setConversations, setAllUsers, setIsInitialDataLoaded,
    setAuthError, login, logout, setViewingProfile,
    ABSOLUTE_HOST_URL, ROOM_LIST_URL,
}) {
    const [serverToEdit, setServerToEdit] = useState(null);

    // --- 🔀 SERVER ORDER ---
    const saveServerOrder = useCallback(async (newOrder) => {
        try {
            await fetchWithAuth(`${API_BASE_URL}/user/server-order/update/`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ server_order: newOrder })
            });
        } catch (error) { console.error('Server order save error:', error); }
    }, [fetchWithAuth]);

    const handleServerDragStart = useCallback((e, serverId, index) => {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('serverId', serverId.toString());
        e.dataTransfer.setData('sourceIndex', index.toString());
        const dragElement = e.currentTarget.cloneNode(true);
        dragElement.style.position = 'absolute';
        dragElement.style.top = '-9999px';
        dragElement.style.opacity = '0.8';
        dragElement.style.transform = 'rotate(5deg)';
        dragElement.style.pointerEvents = 'none';
        document.body.appendChild(dragElement);
        e.dataTransfer.setDragImage(dragElement, 24, 24);
        setTimeout(() => { if (document.body.contains(dragElement)) document.body.removeChild(dragElement); }, 0);
        e.currentTarget.style.opacity = '0.4';
    }, []);

    const handleServerDragOver = useCallback((e) => {
        e.preventDefault(); e.dataTransfer.dropEffect = 'move';
    }, []);

    const handleServerDragEnd = useCallback((e) => {
        e.currentTarget.style.opacity = '1';
    }, []);

    const handleMoveServer = useCallback((serverId, direction) => {
        let currentOrder = serverOrder.length > 0 ? [...serverOrder] : categories.map(c => c.id);
        categories.forEach(c => { if (!currentOrder.includes(c.id)) currentOrder.push(c.id); });

        const sourceIndex = currentOrder.indexOf(serverId);
        if (sourceIndex === -1) return;
        const targetIndex = direction === 'up' ? sourceIndex - 1 : sourceIndex + 1;
        if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

        const [draggedId] = currentOrder.splice(sourceIndex, 1);
        currentOrder.splice(targetIndex, 0, draggedId);
        setServerOrder(currentOrder);
        saveServerOrder(currentOrder);
    }, [serverOrder, categories, saveServerOrder]);

    const handleServerDrop = useCallback((e, targetIndex) => {
        e.preventDefault();
        const serverId = parseInt(e.dataTransfer.getData('serverId'));
        if (isNaN(serverId)) return;

        let currentOrder = serverOrder.length > 0 ? [...serverOrder] : categories.map(c => c.id);
        categories.forEach(c => { if (!currentOrder.includes(c.id)) currentOrder.push(c.id); });

        const sourceIndex = currentOrder.indexOf(serverId);
        if (sourceIndex === -1) return;
        if (sourceIndex === targetIndex || sourceIndex + 1 === targetIndex) return;

        const [draggedId] = currentOrder.splice(sourceIndex, 1);
        const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
        currentOrder.splice(adjustedTargetIndex, 0, draggedId);

        setServerOrder(currentOrder);
        saveServerOrder(currentOrder);
    }, [serverOrder, categories, saveServerOrder]);

    // --- 🔐 AUTH HANDLERS ---
    const handleLogin = useCallback(async (u, p) => {
        try {
            const LOGIN_URL = `${API_BASE_URL}/auth/login/`;
            const res = await fetch(LOGIN_URL, {
                method: 'POST', body: JSON.stringify({ username: u, password: p }),
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'  // 🔒 Required: store httpOnly refresh_token cookie from response
            });
            const data = await res.json();

            if (res.ok) {
                login(data.access, data.refresh);
            } else {
                if (res.status === 401 && data.requires_2fa && data.temp_token) {
                    window.location.href = `/#/2fa-login?temp_token=${encodeURIComponent(data.temp_token)}`;
                    return;
                }
                if (res.status === 401) setAuthError('Kullanıcı adı veya şifre hatalı');
                else if (res.status === 400) setAuthError(data.detail || data.error || 'Geçersiz giriş bilgileri');
                else if (res.status >= 500) setAuthError('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
                else setAuthError(data.detail || data.error || 'Giriş başarısız');
            }
        } catch (e) {
            console.error('❌ [Auth] Network error:', e);
            setAuthError("Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.");
        }
    }, [login, setAuthError, API_BASE_URL]);

    const handleRegister = useCallback(async (u, e, p) => {
        try {
            const REGISTER_URL = `${API_BASE_URL}/auth/register/`;
            const res = await fetch(REGISTER_URL, {
                method: 'POST', body: JSON.stringify({ username: u, email: e, password: p }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.status === 201) return true;

            const data = await res.json();
            let errorMessage = '';
            if (data.username) errorMessage = data.username.join(' ');
            else if (data.email) errorMessage = data.email.join(' ');
            else if (data.password) errorMessage = data.password.join(' ');
            else if (data.detail) errorMessage = data.detail;
            else errorMessage = Object.values(data).flat().join(' ');

            setAuthError(errorMessage || 'Kayıt işlemi başarısız');
            return false;
        } catch (err) {
            console.error('❌ [Auth] Network error:', err);
            setAuthError("Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.");
            return false;
        }
    }, [setAuthError, API_BASE_URL]);

    // --- 🖱️ USER CONTEXT MENU ACTION ---
    const handleUserContextAction = useCallback(async (action, user, extraData) => {
        switch (action) {
            case 'profile': {
                const userProfile = Array.isArray(allUsers) ? allUsers.find(u => u.username === user.username) : null;
                setViewingProfile(userProfile || user);
                break;
            }
            case 'message': handleDMClick(user.username); break;
            case 'volume': break;
            case 'move':
                if (isAdmin && extraData && currentVoiceRoom) {
                    try {
                        await fetchWithAuth(`${API_BASE_URL}/voice/move_user/`, {
                            method: 'POST', body: JSON.stringify({ username: user.username, from_channel: currentVoiceRoom, to_channel: extraData })
                        });
                    } catch (e) { console.error('Move user error:', e); }
                }
                break;
            case 'kick':
                if (isAdmin && await confirmDialog(`${user.username} kullanıcısını kanaldan atmak istediğine emin misin?`)) {
                    try {
                        await fetchWithAuth(`${API_BASE_URL}/voice/kick_user/`, {
                            method: 'POST', body: JSON.stringify({ username: user.username, room: currentVoiceRoom })
                        });
                    } catch (e) { console.error('Kick user error:', e); }
                }
                break;
            case 'server_mute':
                if (isAdmin) {
                    try {
                        await fetchWithAuth(`${API_BASE_URL}/voice/server_mute/`, {
                            method: 'POST', body: JSON.stringify({ username: user.username, room: currentVoiceRoom })
                        });
                    } catch (e) { console.error('Server mute error:', e); }
                }
                break;
            case 'add_friend':
                try {
                    const res = await fetchWithAuth(`${API_BASE_URL}/friends/send/`, {
                        method: 'POST', body: JSON.stringify({ username: user.username })
                    });
                    if (res.ok) {
                        setUpdateStatusText(`✅ ${user.username} kullanıcısına arkadaşlık isteği gönderildi!`);
                        setTimeout(() => setUpdateStatusText(''), 3000);
                    } else {
                        const data = await res.json();
                        setUpdateStatusText(`❌ ${data.error || 'İstek gönderilemedi'}`);
                        setTimeout(() => setUpdateStatusText(''), 3000);
                    }
                } catch (e) { setUpdateStatusText('❌ Arkadaş ekleme hatası'); setTimeout(() => setUpdateStatusText(''), 3000); }
                break;
            case 'remove_friend':
                if (await confirmDialog(`${user.username} ile arkadaşlığı sonlandırmak istediğinize emin misiniz?`)) {
                    try {
                        const friendship = Array.isArray(friendsList) ? friendsList.find(f => f.sender_username === user.username || f.receiver_username === user.username) : null;
                        if (friendship) {
                            const res = await fetchWithAuth(`${API_BASE_URL}/friends/remove/${friendship.id}/`, { method: 'DELETE' });
                            if (res.ok) {
                                setUpdateStatusText(`✅ ${user.username} ile arkadaşlık sonlandırıldı`);
                                setTimeout(() => setUpdateStatusText(''), 3000);
                                const friendsRes = await fetchWithAuth(`${API_BASE_URL}/friends/list/`);
                                if (friendsRes.ok) { const data = await friendsRes.json(); setFriendsList(data.friends || []); }
                            }
                        }
                    } catch (e) { setUpdateStatusText('❌ Arkadaşlık sonlandırma hatası'); setTimeout(() => setUpdateStatusText(''), 3000); }
                }
                break;
            case 'invite_to_server': setInviteToServerUser({ username: user.username }); break;
            case 'mute_user':
                try {
                    const res = await fetchWithAuth(`${API_BASE_URL}/users/${user.username}/mute/`, { method: 'POST' });
                    if (res.ok) toast.success(`🔇 ${user.username} sessize alındı`);
                    else { const data = await res.json(); toast.error(`❌ ${data.error || 'Sessize alma başarısız'}`); }
                } catch (e) { toast.error('❌ Sessize alma hatası'); }
                break;
            case 'block_user':
                if (await confirmDialog(`${user.username} kullanıcısını engellemek istediğinize emin misiniz?`)) {
                    try {
                        const res = await fetchWithAuth(`${API_BASE_URL}/users/${user.username}/block/`, { method: 'POST' });
                        if (res.ok) {
                            toast.success(`🚫 ${user.username} engellendi`);
                            const friendsRes = await fetchWithAuth(`${API_BASE_URL}/friends/list/`);
                            if (friendsRes.ok) { const data = await friendsRes.json(); setFriendsList(data.friends || []); }
                        } else { const data = await res.json(); toast.error(`❌ ${data.error || 'Engelleme başarısız'}`); }
                    } catch (e) { toast.error('❌ Engelleme hatası'); }
                }
                break;
            default: break;
        }
    }, [allUsers, isAdmin, currentVoiceRoom, fetchWithAuth, API_BASE_URL, handleDMClick, friendsList]);

    return {
        serverToEdit, setServerToEdit,
        saveServerOrder, handleServerDragStart, handleServerDragOver, handleServerDragEnd,
        handleMoveServer, handleServerDrop,
        handleLogin, handleRegister,
        handleUserContextAction,
    };
}

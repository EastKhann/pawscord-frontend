import { useState } from 'react';
import toast from '../utils/toast';

const useDMActions = ({ apiUrl, fetchWithAuth, servers, onViewUserProfile }) => {
    const [dmContextMenu, setDmContextMenu] = useState(null); // { x, y, conversation }
    const [inviteToServerModal, setInviteToServerModal] = useState(null); // { username: string, isOpen: boolean }

    // --- DM TEMİZLEME / GİZLEME ---
    const handleClearDM = async (conversationId) => {
        if (!confirm('Bu konuşmadaki tüm mesajları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiUrl}/conversations/${conversationId}/clear/`, {
                method: 'POST'
            });

            if (res.ok) {
                toast.success('✅ Konuşma temizlendi!');
                // WebSocket state'i otomatik güncelleyecek
            } else {
                const data = await res.json();
                toast.error(`❌ Hata: ${data.error || 'Konuşma temizlenemedi'}`);
            }
        } catch (error) {
            console.error('❌ DM clear error:', error);
            toast.error('❌ Bağlantı hatası');
        }

        setDmContextMenu(null);
    };

    const handleHideDM = async (conversationId) => {
        if (!confirm('Bu konuşmayı gizlemek istediğinizden emin misiniz?')) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiUrl}/conversations/${conversationId}/hide/`, {
                method: 'POST'
            });

            if (res.ok) {
                toast.success('✅ Konuşma gizlendi!');
                // WebSocket state'i otomatik güncelleyecek
            } else {
                const data = await res.json();
                toast.error(`❌ Hata: ${data.error || 'Konuşma gizlenemedi'}`);
            }
        } catch (error) {
            console.error('❌ DM hide error:', error);
            toast.error('❌ Bağlantı hatası');
        }

        setDmContextMenu(null);
    };

    // --- DM CONTEXT MENU FONKSİYONLARI ---
    const handleViewProfile = (username) => {
        // 🔥 FIX: onViewUserProfile callback kullan
        if (onViewUserProfile) {
            onViewUserProfile(username);
        } else {
            toast.info(`👤 ${username} profili görüntülenemiyor`);
        }
        setDmContextMenu(null);
    };

    const handleInviteToServer = (username) => {
        // 🔥 FIX: Sunucu seçme modal'ını aç
        if (!servers || servers.length === 0) {
            toast.error('❌ Davet edebileceğiniz sunucu bulunmuyor');
            setDmContextMenu(null);
            return;
        }
        setInviteToServerModal({ username, isOpen: true });
        setDmContextMenu(null);
    };

    const handleSendServerInvite = async (serverId, username) => {
        try {
            // Sunucu davetiyesi oluştur
            const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/invite/`, {
                method: 'POST',
                body: JSON.stringify({ target_username: username })
            });

            if (res.ok) {
                const data = await res.json();
                toast.success(`🎫 ${username} kullanıcısına davetiye gönderildi!`);
            } else {
                const data = await res.json();
                toast.error(`❌ ${data.error || 'Davet gönderilemedi'}`);
            }
        } catch (error) {
            console.error('❌ Invite error:', error);
            toast.error('❌ Bağlantı hatası');
        }
        setInviteToServerModal(null);
    };

    const handleMuteUser = async (username, conversationId) => {
        // 🔥 FIX: Kullanıcıyı sessize alma - localStorage + API
        try {
            const mutedUsers = JSON.parse(localStorage.getItem('mutedDMUsers') || '{}');

            if (mutedUsers[username]) {
                // Zaten sessiz, sesini aç
                delete mutedUsers[username];
                localStorage.setItem('mutedDMUsers', JSON.stringify(mutedUsers));
                toast.success(`🔊 ${username} artık sessize alınmadı`);
            } else {
                // Sessize al
                mutedUsers[username] = { timestamp: Date.now(), conversationId };
                localStorage.setItem('mutedDMUsers', JSON.stringify(mutedUsers));
                toast.success(`🔇 ${username} sessize alındı. Bildirimleri almayacaksınız.`);
            }
        } catch (error) {
            console.error('❌ Mute error:', error);
            toast.error('❌ Sessize alma hatası');
        }
        setDmContextMenu(null);
    };

    const handlePinConversation = async (conversationId) => {
        // 🔥 FIX: Konuşmayı sabitleme - localStorage
        try {
            const pinnedConvs = JSON.parse(localStorage.getItem('pinnedConversations') || '[]');

            if (pinnedConvs.includes(conversationId)) {
                // Zaten sabit, sabitlemeyi kaldır
                const newPinned = pinnedConvs.filter(id => id !== conversationId);
                localStorage.setItem('pinnedConversations', JSON.stringify(newPinned));
                toast.success('📌 Konuşma sabitleme kaldırıldı');
            } else {
                // Sabitle (max 5)
                if (pinnedConvs.length >= 5) {
                    toast.warning('⚠️ En fazla 5 konuşma sabitleyebilirsiniz');
                } else {
                    pinnedConvs.push(conversationId);
                    localStorage.setItem('pinnedConversations', JSON.stringify(pinnedConvs));
                    toast.success('📌 Konuşma sabitlendi!');
                }
            }
        } catch (error) {
            console.error('❌ Pin error:', error);
            toast.error('❌ Sabitleme hatası');
        }
        setDmContextMenu(null);
    };

    const handleBlockUser = async (username) => {
        if (!confirm(`${username} kullanıcısını engellemek istediğinizden emin misiniz?`)) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiUrl}/users/${username}/block/`, {
                method: 'POST'
            });

            if (res.ok) {
                toast.success(`✅ ${username} engellendi!`);
                // WebSocket otomatik güncelleyecek
            } else {
                toast.error('❌ Kullanıcı engellenemedi');
            }
        } catch (error) {
            console.error('❌ Block error:', error);
            toast.error('❌ Bağlantı hatası');
        }

        setDmContextMenu(null);
    };

    // 🔥 YENİ: ARKADAŞ EKLEME
    const handleAddFriend = async (username) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/friends/send/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            if (res.ok) {

                // 🔥 YENİ: Bildirim göster
                if (window.Notification && Notification.permission === 'granted') {
                    new Notification('Arkadaşlık İsteği Gönderildi', {
                        body: `${username} kullanıcısına arkadaşlık isteği gönderildi!`,
                        icon: '/logo192.png'
                    });
                }
            } else {
                const error = await res.json();
                console.error(`❌ Arkadaşlık isteği hatası: ${error.error || 'Bilinmeyen hata'}`);
            }
        } catch (error) {
            console.error('❌ Arkadaş ekleme hatası:', error);
        }
    };

    // 🔥 YENİ: ARKADAŞ ÇIKARMA
    const handleRemoveFriend = async (username) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/friends/remove/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            if (res.ok) {

                // Bildirim göster
                if (window.Notification && Notification.permission === 'granted') {
                    new Notification('Arkadaş Çıkarıldı', {
                        body: `${username} arkadaş listesinden çıkarıldı.`,
                        icon: '/logo192.png'
                    });
                }
            } else {
                const error = await res.json();
                console.error(`❌ Arkadaş çıkarma hatası: ${error.error || 'Bilinmeyen hata'}`);
            }
        } catch (error) {
            console.error('❌ Arkadaş çıkarma hatası:', error);
        }
    };

    return {
        // Functions
        handleClearDM,
        handleHideDM,
        handleViewProfile,
        handleInviteToServer,
        handleSendServerInvite,
        handleMuteUser,
        handlePinConversation,
        handleBlockUser,
        handleAddFriend,
        handleRemoveFriend,
        // State
        dmContextMenu,
        setDmContextMenu,
        inviteToServerModal,
        setInviteToServerModal,
    };
};

export default useDMActions;

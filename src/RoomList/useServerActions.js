import { useState } from 'react';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';

const useServerActions = ({ apiUrl, fetchWithAuth, servers, currentUsername, selectedServerId, setSelectedServerId, onWelcomeClick, onMoveServer }) => {
    const [publicServers, setPublicServers] = useState([]);
    const [newServerName, setNewServerName] = useState('');
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomType, setNewRoomType] = useState('text');
    const [isNewServerPublic, setIsNewServerPublic] = useState(false);
    const [activeServerIdForCategory, setActiveServerIdForCategory] = useState(null);
    const [activeCategoryIdForRoom, setActiveCategoryIdForRoom] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editName, setEditName] = useState('');
    const [leaveServerModal, setLeaveServerModal] = useState(null);
    const [deleteServerModal, setDeleteServerModal] = useState(null);

    // 🆕 SUNUCUDAN AYRIL
    const handleLeaveServer = async (serverId) => {
        // Owner kontrolü - eğer owner ise sunucuyu silmesi gerektiğini söyle
        const server = servers.find(s => s.id === serverId);
        if (server && server.owner_username === currentUsername) {
            toast.warning('Sunucu sahibi sunucudan ayrılamaz!\n\nSunucuyu silmek için:\n1. Sunucuya sağ tıklayın\n2. "Sunucuyu Sil" seçeneğini tıklayın\n\nVeya önce sahipliği başka birine devredin.', 7000);
            return;
        }

        // Styled modal ile onayla
        setLeaveServerModal({ server, isOpen: true });
    };

    // Gerçek leave işlemi - modal onayından sonra çağrılır
    const executeLeaveServer = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/leave/`, {
                method: 'POST'
            });

            if (res.ok) {
                const data = await res.json();

                // Ana sayfaya dön
                setSelectedServerId('home');
                onWelcomeClick();

                // WebSocket sunucu listesini otomatik güncelleyecek
                toast.success('✅ Sunucudan başarıyla ayrıldınız!');
            } else {
                const error = await res.json();
                const errorMessage = error.error || 'Sunucudan ayrılırken hata oluştu';
                console.error('❌ Sunucudan ayrılma hatası:', errorMessage);
                toast.error(`❌ Hata: ${errorMessage}`);
            }
        } catch (error) {
            console.error('❌ Sunucudan ayrılma hatası:', error);
            toast.error('❌ Sunucudan ayrılırken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    // 🆕 SUNUCU İKONU DEĞİŞTİRME
    const handleChangeServerIcon = async (serverId) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // Dosya boyutu kontrolü (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.warning('Dosya boyutu çok büyük! Maksimum 5MB olmalıdır.');
                return;
            }

            const formData = new FormData();
            formData.append('icon', file);

            try {
                const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/icon/`, {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    const data = await res.json();
                    // WebSocket güncelleme gönderecek, sayfa otomatik yenilenecek
                } else {
                    const error = await res.json();
                    toast.error(`İkon güncellenirken hata: ${error.error || 'Bilinmeyen hata'}`);
                }
            } catch (error) {
                console.error('❌ İkon yükleme hatası:', error);
                toast.error('İkon yüklenirken bir hata oluştu.');
            }
        };

        input.click();
    };

    // 🆕 SUNUCU GİZLİLİK AYARI DEĞİŞTİRME
    const handleChangeServerPrivacy = async (serverId) => {
        const server = servers.find(s => s.id === serverId);
        if (!server) return;

        const newPrivacy = !server.is_public;
        const message = newPrivacy
            ? 'Sunucuyu herkese açık yapmak istediğinize emin misiniz? Herkes bu sunucuyu bulabilir ve katılabilir.'
            : 'Sunucuyu özel yapmak istediğinize emin misiniz? Sadece davet edilen kişiler katılabilir.';

        if (!await confirmDialog(message)) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/privacy/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_public: newPrivacy })
            });

            if (res.ok) {
                const data = await res.json();
                // WebSocket güncelleme gönderecek
            } else {
                const error = await res.json();
                toast.error(`Gizlilik ayarı değiştirilirken hata: ${error.error || 'Bilinmeyen hata'}`);
            }
        } catch (error) {
            console.error('❌ Gizlilik ayarı hatası:', error);
            toast.error('Gizlilik ayarı değiştirilirken bir hata oluştu.');
        }
    };

    // 🆕 DAVET LİNKİ KOPYALA
    const handleCopyServerInvite = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    max_uses: 0,
                    expires_hours: 0
                })
            });

            if (res.ok) {
                const data = await res.json();

                // 🔥 FIX: Production URL belirleme
                const productionUrl = import.meta.env.VITE_PRODUCTION_URL || 'https://www.pawscord.com';
                const isProduction = import.meta.env.MODE === 'production' ||
                    window.location.hostname === 'pawscord.com' ||
                    window.location.hostname === 'www.pawscord.com';

                const baseUrl = isProduction ? productionUrl : window.location.origin;

                const inviteUrl = `${baseUrl}/#/invite/${data.code}`;

                await navigator.clipboard.writeText(inviteUrl);
                toast.success(`Davet linki kopyalandı!\n\n${inviteUrl}`, 4000);
            } else {
                const error = await res.json();
                console.error('❌ Davet oluşturma hatası:', error.error || 'Davet oluşturulamadı');
                toast.error(`Hata: ${error.error || 'Davet oluşturulamadı'}`);
            }
        } catch (error) {
            console.error('❌ Davet kopyalama hatası:', error);
        }
    };

    const handleCreateServer = async (nameOrEvent, isPublic) => {
        // Called from AddServerModal with (name, isPublic) or from a form with (event)
        if (nameOrEvent?.preventDefault) {
            nameOrEvent.preventDefault();
        }
        const serverName = typeof nameOrEvent === 'string' ? nameOrEvent : newServerName;
        const serverPublic = typeof nameOrEvent === 'string' ? isPublic : isNewServerPublic;
        if (!serverName?.trim()) return;
        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/create/`, {
                method: 'POST',
                body: JSON.stringify({ name: serverName, is_public: !!serverPublic })
            });
            if (res.ok) {
                toast.success(`✅ "${serverName}" sunucusu oluşturuldu!`);
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Sunucu oluşturulamadı.');
            }
        } catch (e) {
            toast.error('Bağlantı hatası. Sunucu oluşturulamadı.');
        }
        setNewServerName('');
        setIsNewServerPublic(false);
    };

    const handleCreateCategory = async (e, serverId) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        await fetchWithAuth(`${apiUrl}/categories/create/`, { method: 'POST', body: JSON.stringify({ server_id: serverId, name: newCategoryName }) });
        setNewCategoryName('');
        setActiveServerIdForCategory(null);
    };

    const handleCreateRoom = async (e, categoryId) => {
        e.preventDefault();
        if (!newRoomName.trim()) return;
        await fetchWithAuth(`${apiUrl}/categories/${categoryId}/create_room/`, { method: 'POST', body: JSON.stringify({ name: newRoomName, channel_type: newRoomType }) });
        setNewRoomName('');
        setActiveCategoryIdForRoom(null);
    };

    const handleRenameCategory = async (e, catId) => {
        e.preventDefault();
        await fetchWithAuth(`${apiUrl}/categories/${catId}/rename/`, {
            method: 'POST', body: JSON.stringify({ new_name: editName })
        });
        setEditingItemId(null);
    };

    const handleDeleteCategory = async (e, catId) => {
        e.stopPropagation();
        if (!await confirmDialog("Kategoriyi silmek istediğine emin misin? İçindeki odalar da silinecek!")) return;
        await fetchWithAuth(`${apiUrl}/categories/${catId}/delete/`, { method: 'POST' });
    };

    const handleRenameRoom = async (e, slug) => {
        e.preventDefault();
        await fetchWithAuth(`${apiUrl}/rooms/${slug}/rename/`, {
            method: 'POST', body: JSON.stringify({ new_name: editName })
        });
        setEditingItemId(null);
    };

    const handleDeleteRoom = async (e, slug) => {
        e.stopPropagation();
        if (!await confirmDialog("Kanalı silmek istediğine emin misin?")) return;
        await fetchWithAuth(`${apiUrl}/rooms/${slug}/delete/`, { method: 'POST' });
    };

    // 🆕 SUNUCU SIRASI DEĞİŞTİRME
    const handleMoveServer = (serverId, direction) => {
        if (onMoveServer) {
            onMoveServer(serverId, direction);
        }
    };

    // 🆕 KULLANICIYI BAŞKA KANALA TAŞI
    const handleMoveUserToChannel = async (username, fromChannel, toChannel) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/voice/move_user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    from_channel: fromChannel,
                    to_channel: toChannel
                })
            });

            if (res.ok) {
                const data = await res.json();
            } else {
                const error = await res.json();
                console.error(`❌ ${error.error || 'Kullanıcı taşınamadı'}`);
            }
        } catch (error) {
            console.error('❌ Kullanıcı taşıma hatası:', error);
        }
    };

    // 🆕 KULLANICIYI KANALDAN AT
    const handleKickUserFromChannel = async (username, channel) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/voice/kick_user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    channel: channel
                })
            });

            if (res.ok) {
                const data = await res.json();
            } else {
                const error = await res.json();
                console.error(`❌ ${error.error || 'Kullanıcı atılamadı'}`);
            }
        } catch (error) {
            console.error('❌ Kullanıcı atma hatası:', error);
        }
    };

    // --- KEŞFETME İŞLEMLERİ ---
    const handleOpenDiscovery = async () => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/public/`);
            const data = await res.json();
            // Backend paginated response ({ results: [...] }) veya düz dizi her ikisini destekle
            setPublicServers(Array.isArray(data) ? data : (data.results || []));
        } catch (e) {
            console.error("Sunucular çekilemedi", e);
        }
    };

    const handleJoinServer = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/join/`, { method: 'POST' });
            if (res.ok) {
                toast.success('✅ Sunucuya başarıyla katıldın!');
            }
        } catch (e) {
            console.error("❌ Sunucuya katılma hatası:", e);
        }
    };

    const handleJoinViaCode = async (code) => {
        if (!code.trim()) return;
        try {
            const res = await fetchWithAuth(`${apiUrl}/invites/join/`, {
                method: 'POST',
                body: JSON.stringify({ code })
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(`✅ "${data.server_name}" sunucusuna katıldın!`);
            } else {
                console.error("❌ Sunucuya katılma hatası:", data.error || "Sunucuya katılınamadı.");
            }
        } catch (error) {
            console.error("❌ Davet kodu hatası:", error);
        }
    };

    return {
        // Functions
        handleLeaveServer,
        executeLeaveServer,
        handleChangeServerIcon,
        handleChangeServerPrivacy,
        handleCopyServerInvite,
        handleCreateServer,
        handleCreateCategory,
        handleCreateRoom,
        handleRenameCategory,
        handleDeleteCategory,
        handleRenameRoom,
        handleDeleteRoom,
        handleMoveServer,
        handleMoveUserToChannel,
        handleKickUserFromChannel,
        handleOpenDiscovery,
        handleJoinServer,
        handleJoinViaCode,
        // State
        publicServers,
        setPublicServers,
        newServerName,
        setNewServerName,
        newCategoryName,
        setNewCategoryName,
        newRoomName,
        setNewRoomName,
        newRoomType,
        setNewRoomType,
        isNewServerPublic,
        setIsNewServerPublic,
        activeServerIdForCategory,
        setActiveServerIdForCategory,
        activeCategoryIdForRoom,
        setActiveCategoryIdForRoom,
        editingItemId,
        setEditingItemId,
        editName,
        setEditName,
        leaveServerModal,
        setLeaveServerModal,
        deleteServerModal,
        setDeleteServerModal,
    };
};

export default useServerActions;

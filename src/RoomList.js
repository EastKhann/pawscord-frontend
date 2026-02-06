// frontend/src/RoomList.js

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
    FaUserFriends, FaChevronDown, FaChevronRight, FaPlus, FaCog,
    FaVolumeUp, FaRobot, FaChartLine, FaServer, FaTimes,
    FaUserPlus, FaTrash, FaEdit, FaCompass, FaHeart, FaCoffee, FaBitcoin, FaCopy,
    FaMicrophone, FaMicrophoneSlash, FaHeadphones,
    FaFilm, FaDesktop, FaVideoSlash, FaPhoneSlash,
    TbHeadphonesOff // ⚡ OPTIMIZATION: Tek yerden import
} from './utils/iconOptimization'; // ⚡ OPTIMIZATION: -130KB bundle size
import VoiceUserList from './VoiceUserList';
import toast from './utils/toast';
import UserFooter from './components/UserFooter'; // 🔥 Profesyonel user footer
import { styles } from './SidebarStyles';
import InviteModal from './components/InviteModal';
import SavedMessagesModal from './components/SavedMessagesModal';
import ScheduledMessageModal from './components/ScheduledMessageModal';
import WebhookManager from './components/WebhookManager';
import ModeratorTools from './components/ModeratorTools';
import QuickActionsMenu from './components/QuickActionsMenu';
import AuditLogViewer from './components/AuditLogViewer';
import ReportsViewer from './components/ReportsViewer';
import VanityURLManager from './components/VanityURLManager';
import AutoResponderManager from './components/AutoResponderManager';
import ServerContextMenu from './components/ServerContextMenu';
import ChannelSettingsModal from './components/ChannelSettingsModal';
import LazyImage from './components/LazyImage'; // ⚡ OPTIMIZATION: Progressive image loading
import ConfirmModal from './components/ConfirmModal'; // 🔥 YENİ: Modern confirmation dialog

const RoomList = ({
    onFriendsClick, onWelcomeClick, isAdmin, categories: servers = [],
    conversations = [], currentRoom,
    currentConversationId,
    onRoomSelect, onDMSelect, joinVoiceChat, leaveVoiceChat,
    unreadCounts = {}, // Hata koruması
    voiceUsers, currentUsername, currentUserProfile, currentVoiceRoom, remoteVolumes,
    setRemoteVolume, onProfileClick, onViewUserProfile, getDeterministicAvatar, isPttActive,
    setIsLeftSidebarVisible, apiBaseUrl, fetchWithAuth,
    activeChat, onOpenServerSettings, allUsers, onlineUsers, // ✨ EKLENDİ: Arkadaş kodu ve online durumu için gerekli
    friendsList = [], // 🔥 YENİ: Arkadaş listesi
    pendingFriendRequests = 0, // 🔥 YENİ: Bekleyen arkadaşlık istekleri sayısı
    toggleMute, toggleDeafened, isMuted, isDeafened, // 🎤 YENİ: Ses Kontrolleri
    isInVoice, isConnecting, toggleVideo, toggleScreenShare, isVideoEnabled, isScreenSharing, // 🎥 YENİ: Video/Ekran
    onServerDragStart, onServerDragOver, onServerDragEnd, onServerDrop, // 🔥 YENİ: Drag & Drop
    updateAvailable = false, // 🔥 YENİ: Güncelleme durumu
    onUpdateClick, // 🔥 YENİ: Güncelleme butonu handler
    onOpenStore, // 🔥 YENİ: Mağaza modal'ı aç
    onOpenAnalytics, // 🔥 YENİ: Analytics panel aç
    onOpenAdminPanel, // 🔥 Admin Panel modal
    // 💰 Payment & Engagement System (2026-01-19)
    onOpenPaymentPanel,
    onOpenStoreModal,
    onOpenDailyRewards,
    onOpenAPIUsage,
    onOpenExportJobs,
    onOpenScheduledAnnouncements,
    // 🎮 New Features (2026-01-28)
    onOpenMiniGames,
    onOpenProjectCollaboration,
    onOpenAvatarStudio,
    onServerSelect // 🔥 YENİ: Sunucu seçildiğinde sağ panelde üyeleri göster
}) => {
    // --- GÜVENLİK ÖNLEMİ ---
    const safeUnreadCounts = unreadCounts || {};

    // 🔥 Avatar URL Helper - relative path'leri tam URL'ye çevir
    const getAvatarUrl = useCallback((avatarPath, fallbackUsername) => {
        // 🔥 FIX: avatarPath string değilse veya boşsa fallback kullan
        if (!avatarPath || typeof avatarPath !== 'string') {
            return getDeterministicAvatar(fallbackUsername);
        }
        // HTTP/HTTPS/Blob URL'ler zaten tam
        if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://') || avatarPath.startsWith('blob:')) {
            return avatarPath;
        }
        // ui-avatars.com kontrolü
        if (avatarPath.includes('ui-avatars.com')) return avatarPath;
        // Relative path -> tam URL
        let path = avatarPath.startsWith('/') ? avatarPath : `/${avatarPath}`;
        return `${apiBaseUrl}${path}`;
    }, [apiBaseUrl, getDeterministicAvatar]);

    // 🔥 currentRoom değerini hesapla (activeChat'ten veya prop'tan)
    const actualCurrentRoom = currentRoom || (activeChat?.type === 'room' ? activeChat.id : null);

    const [inviteCodeInput, setInviteCodeInput] = useState('');
    const [selectedServerId, setSelectedServerId] = useState('home');
    const [collapsedCategories, setCollapsedCategories] = useState({});
    const [draggedServerId, setDraggedServerId] = useState(null); // 🔥 YENİ: Sürüklenen sunucu
    const [dropTargetIndex, setDropTargetIndex] = useState(null); // 🔥 YENİ: Drop hedefi index
    const [dropPosition, setDropPosition] = useState(null); // 🔥 YENİ: 'before' veya 'after'
    const [actionMenu, setActionMenu] = useState(null); // { type: 'category' | 'room', id: string, name: string }
    const [serverContextMenu, setServerContextMenu] = useState(null); // { x, y, server, isOwner }

    // Modallar - TÜM STATE'LER BAŞTA TANIMLANMALI
    const [showDiscovery, setShowDiscovery] = useState(false);
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [isCreatingServer, setIsCreatingServer] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteModalServer, setInviteModalServer] = useState(null);
    const [showSavedMessages, setShowSavedMessages] = useState(null);
    const [showScheduledMessages, setShowScheduledMessages] = useState(false);
    const [showWebhooks, setShowWebhooks] = useState(false);
    const [showModTools, setShowModTools] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);
    const [showAuditLogs, setShowAuditLogs] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [showVanityURL, setShowVanityURL] = useState(false);
    const [showAutoResponder, setShowAutoResponder] = useState(false);
    const [showChannelSettings, setShowChannelSettings] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
    const [publicServers, setPublicServers] = useState([]);
    const [copiedAddress, setCopiedAddress] = useState(null);

    // 🔥 DM Context Menu
    const [dmContextMenu, setDmContextMenu] = useState(null); // { x, y, conversation }

    // 🔥 YENİ: Sunucuya davet modal state
    const [inviteToServerModal, setInviteToServerModal] = useState(null); // { username: string, isOpen: boolean }

    // 🔥 YENİ: Sunucu silme confirmation modal state
    const [deleteServerModal, setDeleteServerModal] = useState(null); // { server: {...}, isOpen: boolean }

    // Düzenleme State'leri
    const [editingItemId, setEditingItemId] = useState(null);
    const [editName, setEditName] = useState('');

    // 🔇 Muted Servers (LocalStorage'dan yükle)
    const [mutedServers, setMutedServers] = useState(() => {
        const saved = localStorage.getItem('mutedServers');
        return saved ? JSON.parse(saved) : [];
    });

    const [newServerName, setNewServerName] = useState('');
    const [activeServerIdForCategory, setActiveServerIdForCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [activeCategoryIdForRoom, setActiveCategoryIdForRoom] = useState(null);
    const [newRoomName, setNewRoomName] = useState('');
    const [newRoomType, setNewRoomType] = useState('text');
    const [isNewServerPublic, setIsNewServerPublic] = useState(false);

    const activeVoiceUsers = voiceUsers || {};
    const [dropTargetChannel, setDropTargetChannel] = useState(null);

    // ✅ TÜM HOOKS TANIMLANDI - ŞİMDİ FONKSİYONLAR

    useEffect(() => {
        if (activeChat && (activeChat.type === 'welcome' || activeChat.type === 'friends' || activeChat.type === 'dm')) {
            setSelectedServerId('home');
        }
    }, [activeChat]);

    // 🔥 Click outside to close DM context menu
    useEffect(() => {
        const handleClickOutside = () => setDmContextMenu(null);
        if (dmContextMenu) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [dmContextMenu]);

    const toggleCategory = (id) => setCollapsedCategories(p => ({ ...p, [id]: !p[id] }));

    const handleServerClick = (server) => {
        setSelectedServerId(server.id);
        // 🔥 YENİ: Sunucu seçildiğinde App.js'e bildir - sağ panelde üyeleri göster
        if (onServerSelect) {
            onServerSelect(server);
        }
    };

    const handleOpenActionMenu = (e, type, id, name) => {
        e.stopPropagation();
        console.log('🎯 Context menu açılıyor:', { type, id, name });
        setActionMenu({ type, id, name });
    };

    const executeRename = (e) => {
        e.preventDefault();
        if (actionMenu.type === 'category') {
            setEditingItemId(`cat-${actionMenu.id}`);
            setEditName(actionMenu.name);
        } else {
            setEditingItemId(`room-${actionMenu.id}`);
            setEditName(actionMenu.name);
        }
        setActionMenu(null);
    };

    const executeDelete = (e) => {
        if (actionMenu.type === 'category') handleDeleteCategory(e, actionMenu.id);
        else handleDeleteRoom(e, actionMenu.id);
        setActionMenu(null);
    };

    const executeSettings = (e) => {
        e.preventDefault();

        console.log('🔧 executeSettings çağrıldı:', actionMenu);
        console.log('🔧 Mevcut servers:', servers);
        console.log('🔧 selectedServerId:', selectedServerId);

        if (actionMenu.type === 'room') {
            // Kanal ayarlarını aç - server.categories.rooms yapısında ara
            let foundRoom = null;
            let foundServerId = null;

            servers?.forEach(server => {
                console.log(`🔍 ${server.name} sunucusunda arıyorum...`);
                server.categories?.forEach(category => {
                    console.log(`  📁 ${category.name} kategorisinde arıyorum...`);
                    if (category.rooms) {
                        const room = category.rooms.find(ch => ch.slug === actionMenu.id);
                        if (room) {
                            console.log(`  ✅ Kanal bulundu:`, room);
                            foundRoom = { ...room, server_id: server.id, category_id: category.id };
                            foundServerId = server.id;
                        }
                    }
                });
            });

            if (foundRoom) {
                console.log('✅ Kanal ayarları açılıyor:', foundRoom);
                setSelectedRoom(foundRoom);
                setSelectedServerId(foundServerId);
                setShowChannelSettings(true);
            } else {
                console.error('❌ Kanal bulunamadı:', actionMenu.id);
                toast.error('Kanal ayarları açılırken bir hata oluştu. Kanal bulunamadı.');
            }
        }
        setActionMenu(null);
    };

    // 🆕 KULLANICIYI BAŞKA KANALA TAŞI
    const handleMoveUserToChannel = async (username, fromChannel, toChannel) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/voice/move_user/`, {
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
                console.log(`✅ ${data.message || `${username} başarıyla ${toChannel} kanalına taşındı!`}`);
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
            const res = await fetchWithAuth(`${apiBaseUrl}/voice/kick_user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    channel: channel
                })
            });

            if (res.ok) {
                const data = await res.json();
                console.log(`✅ ${data.message || `${username} kanaldan atıldı!`}`);
            } else {
                const error = await res.json();
                console.error(`❌ ${error.error || 'Kullanıcı atılamadı'}`);
            }
        } catch (error) {
            console.error('❌ Kullanıcı atma hatası:', error);
        }
    };

    // 🆕 SUNUCU SAĞ TIK
    const handleServerContextMenu = (e, server) => {
        e.preventDefault();
        e.stopPropagation();

        const isOwner = server.owner_username === currentUsername;

        setServerContextMenu({
            x: e.clientX,
            y: e.clientY,
            server,
            isOwner
        });
    };

    // 🔥 YENİ: Drag & Drop Wrapper Fonksiyonları (Visual Feedback için)
    const handleServerDragStartWrapper = (e, serverId, index) => {
        setDraggedServerId(serverId);
        if (onServerDragStart) onServerDragStart(e, serverId, index);
    };

    const handleServerDragOverWrapper = (e, index) => {
        e.preventDefault();

        // 🔥 YENİ: Mouse pozisyonuna göre üst/alt yarı hesapla
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseY = e.clientY;
        const elementMiddle = rect.top + (rect.height / 2);

        // Mouse üst yarıdaysa 'before', alt yarıdaysa 'after'
        const position = mouseY < elementMiddle ? 'before' : 'after';

        setDropTargetIndex(index);
        setDropPosition(position);

        if (onServerDragOver) onServerDragOver(e);
    };

    const handleServerDragEndWrapper = (e) => {
        setDraggedServerId(null);
        setDropTargetIndex(null);
        setDropPosition(null);
        if (onServerDragEnd) onServerDragEnd(e);
    };

    const handleServerDropWrapper = (e, index) => {
        const position = dropPosition; // Mevcut pozisyonu al
        setDropTargetIndex(null);
        setDropPosition(null);
        setDraggedServerId(null);

        // Position bilgisini parent'a ilet
        if (onServerDrop) {
            // Position'a göre hedef index'i ayarla
            const actualTargetIndex = position === 'after' ? index + 1 : index;
            onServerDrop(e, actualTargetIndex);
        }
    };

    // 🆕 SUNUCUDAN AYRIL
    const handleLeaveServer = async (serverId) => {
        // Owner kontrolü - eğer owner ise sunucuyu silmesi gerektiğini söyle
        const server = servers.find(s => s.id === serverId);
        if (server && server.owner && server.owner.user.username === username) {
            toast.warning('Sunucu sahibi sunucudan ayrılamaz!\n\nSunucuyu silmek için:\n1. Sunucuya sağ tıklayın\n2. "Sunucuyu Sil" seçeneğini tıklayın\n\nVeya önce sahipliği başka birine devredin.', 7000);
            return;
        }

        if (!window.confirm('Bu sunucudan ayrılmak istediğinizden emin misiniz?')) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/leave/`, {
                method: 'POST'
            });

            if (res.ok) {
                const data = await res.json();
                console.log('✅ Sunucudan ayrıldınız:', data);

                // Ana sayfaya dön
                setSelectedServerId('home');
                onWelcomeClick();

                // Sayfayı yenile (sunucu listesi güncellensin)
                window.location.reload();
            } else {
                const error = await res.json();
                const errorMessage = error.error || 'Sunucudan ayrılırken hata oluştu';
                console.error('❌ Sunucudan ayrılma hatası:', errorMessage);

                // Kullanıcıya hata mesajını göster
                toast.error(`❌ Hata: ${errorMessage}\n\nEğer sunucu sahibiyseniz, sunucuyu silmeniz gerekir.\nSunucuya sağ tıklayıp "Sunucuyu Sil" seçeneğini kullanın.`);
            }
        } catch (error) {
            console.error('❌ Sunucudan ayrılma hatası:', error);
            toast.error('❌ Sunucudan ayrılırken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    // 🆕 SUNUCU SIRASI DEĞİŞTİRME
    const handleMoveServer = async (serverId, direction) => {
        if (!servers || !Array.isArray(servers)) return;

        const serverIndex = servers.findIndex(s => s.id === serverId);
        if (serverIndex === -1) return;

        const newIndex = direction === 'up' ? serverIndex - 1 : serverIndex + 1;
        if (newIndex < 0 || newIndex >= servers.length) return;

        // Yeni sıralamayı oluştur
        const newServers = [...servers];
        const [movedServer] = newServers.splice(serverIndex, 1);
        newServers.splice(newIndex, 0, movedServer);

        // Sıra numaralarını güncelle
        const updatedServers = newServers.map((server, index) => ({
            id: server.id,
            order: index
        }));

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/reorder/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'server',
                    items: updatedServers
                })
            });

            if (res.ok) {
                console.log('✅ Sunucu sırası güncellendi');
                // Global WebSocket zaten güncelleme gönderecek
            } else {
                const error = await res.json();
                console.error('❌ Sıralama hatası:', error);
            }
        } catch (error) {
            console.error('❌ Sunucu sıralama hatası:', error);
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
                const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/icon/`, {
                    method: 'POST',
                    body: formData
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('✅ Sunucu ikonu güncellendi:', data);
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

        if (!window.confirm(message)) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/privacy/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_public: newPrivacy })
            });

            if (res.ok) {
                const data = await res.json();
                console.log('✅ Sunucu gizlilik ayarı güncellendi:', data);
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

    // 🔥 YENİ: ARKADAŞ EKLEME
    const handleAddFriend = async (username) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/friends/send/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            if (res.ok) {
                console.log(`✅ ${username} kullanıcısına arkadaşlık isteği gönderildi`);

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
            const res = await fetchWithAuth(`${apiBaseUrl}/friends/remove/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            });

            if (res.ok) {
                console.log(`✅ ${username} arkadaş listesinden çıkarıldı`);

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

    // 🆕 DAVET LİNKİ KOPYALA
    const handleCopyServerInvite = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/create/`, {
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
                // Öncelik sırası:
                // 1. Environment variable (production build için)
                // 2. Hostname kontrolü (pawscord.com)
                // 3. Fallback olarak window.location.origin

                const productionUrl = import.meta.env.VITE_PRODUCTION_URL || 'https://www.pawscord.com';
                const isProduction = import.meta.env.MODE === 'production' ||
                    window.location.hostname === 'pawscord.com' ||
                    window.location.hostname === 'www.pawscord.com';

                const baseUrl = isProduction ? productionUrl : window.location.origin;

                console.log('🔍 [Invite] URL Bilgileri:', {
                    NODE_ENV: process.env.NODE_ENV,
                    hostname: window.location.hostname,
                    origin: window.location.origin,
                    isProduction,
                    baseUrl
                });

                const inviteUrl = `${baseUrl}/#/invite/${data.code}`;
                console.log('✅ [Invite] Oluşturulan link:', inviteUrl);

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

    // --- DESTEK İŞLEMLERİ ---
    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedAddress(type);
            setTimeout(() => setCopiedAddress(null), 2000);
        });
    };

    const cryptoAddresses = {
        sol: 'Bk6ywhae86fp6BHmGtxabS6ncEGsFxhcnZEWJRZLVr9z',
        eth: '0xeaa14d4651a8ea7488289209b9294a1309dde37c',
        usdt: 'TGAny6VmDAWdVmTXCPrpsbLKKQQdvyvnWC',
        coffee: 'https://buymeacoffee.com/dogudoguweo'
    };

    // --- KEŞFETME İŞLEMLERİ ---
    const handleOpenDiscovery = async () => {
        setShowDiscovery(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/public/`);
            const data = await res.json();
            setPublicServers(data);
        } catch (e) {
            console.error("Sunucular çekilemedi", e);
        }
    };

    const handleJoinServer = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/join/`, { method: 'POST' });
            if (res.ok) {
                console.log("✅ Sunucuya katıldın!");
                setShowDiscovery(false);
                window.location.reload();
            }
        } catch (e) {
            console.error("❌ Sunucuya katılma hatası:", e);
        }
    };

    const handleJoinViaCode = async (e) => {
        e.preventDefault();
        if (!inviteCodeInput.trim()) return;
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/invites/join/`, {
                method: 'POST',
                body: JSON.stringify({ code: inviteCodeInput })
            });
            const data = await res.json();
            if (res.ok) {
                console.log(`✅ Başarılı! "${data.server_name}" sunucusuna katıldın.`);
                setInviteCodeInput('');
                setShowDiscovery(false);
                window.location.reload();
            } else {
                console.error("❌ Sunucuya katılma hatası:", data.error || "Sunucuya katılınamadı.");
            }
        } catch (error) {
            console.error("❌ Davet kodu hatası:", error);
        }
    };

    // --- DAVET OLUŞTURMA ---
    const handleCreateInvite = (e, server) => {
        e.stopPropagation();
        setInviteModalServer(server);
        setShowInviteModal(true);
    };

    // --- DM TEMİZLEME / GİZLEME ---
    const handleClearDM = async (conversationId) => {
        if (!confirm('Bu konuşmadaki tüm mesajları silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/conversations/${conversationId}/clear/`, {
                method: 'POST'
            });

            if (res.ok) {
                toast.success('✅ Konuşma temizlendi!');
                // Sayfayı yenile veya state'i güncelle
                window.location.reload();
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
            const res = await fetchWithAuth(`${apiBaseUrl}/conversations/${conversationId}/hide/`, {
                method: 'POST'
            });

            if (res.ok) {
                toast.success('✅ Konuşma gizlendi!');
                // Sayfayı yenile veya state'i güncelle
                window.location.reload();
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
            const res = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/invite/`, {
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
            const res = await fetchWithAuth(`${apiBaseUrl}/users/${username}/block/`, {
                method: 'POST'
            });

            if (res.ok) {
                toast.success(`✅ ${username} engellendi!`);
                window.location.reload();
            } else {
                toast.error('❌ Kullanıcı engellenemedi');
            }
        } catch (error) {
            console.error('❌ Block error:', error);
            toast.error('❌ Bağlantı hatası');
        }

        setDmContextMenu(null);
    };

    // --- DÜZENLEME / SİLME İŞLEMLERİ ---
    const startEditing = (e, id, currentName) => {
        e.stopPropagation();
        setEditingItemId(id);
        setEditName(currentName);
    };

    const handleRenameCategory = async (e, catId) => {
        e.preventDefault();
        await fetchWithAuth(`${apiBaseUrl}/categories/${catId}/rename/`, {
            method: 'POST', body: JSON.stringify({ new_name: editName })
        });
        setEditingItemId(null);
    };

    const handleDeleteCategory = async (e, catId) => {
        e.stopPropagation();
        if (!window.confirm("Kategoriyi silmek istediğine emin misin? İçindeki odalar da silinecek!")) return;
        await fetchWithAuth(`${apiBaseUrl}/categories/${catId}/delete/`, { method: 'POST' });
    };

    const handleRenameRoom = async (e, slug) => {
        e.preventDefault();
        await fetchWithAuth(`${apiBaseUrl}/rooms/${slug}/rename/`, {
            method: 'POST', body: JSON.stringify({ new_name: editName })
        });
        setEditingItemId(null);
    };

    const handleDeleteRoom = async (e, slug) => {
        e.stopPropagation();
        if (!window.confirm("Kanalı silmek istediğine emin misin?")) return;
        await fetchWithAuth(`${apiBaseUrl}/rooms/${slug}/delete/`, { method: 'POST' });
    };

    const handleCreateServer = async (e) => {
        e.preventDefault();
        if (!newServerName.trim()) return;
        await fetchWithAuth(`${apiBaseUrl}/servers/create/`, {
            method: 'POST',
            body: JSON.stringify({ name: newServerName, is_public: isNewServerPublic })
        });
        setNewServerName('');
        setIsNewServerPublic(false);
        setIsCreatingServer(false);
        setShowAddMenu(false);
    };

    const handleCreateCategory = async (e, serverId) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        await fetchWithAuth(`${apiBaseUrl}/categories/create/`, { method: 'POST', body: JSON.stringify({ server_id: serverId, name: newCategoryName }) });
        setNewCategoryName('');
        setActiveServerIdForCategory(null);
    };

    const handleCreateRoom = async (e, categoryId) => {
        e.preventDefault();
        if (!newRoomName.trim()) return;
        await fetchWithAuth(`${apiBaseUrl}/categories/${categoryId}/create_room/`, { method: 'POST', body: JSON.stringify({ name: newRoomName, channel_type: newRoomType }) });
        setNewRoomName('');
        setActiveCategoryIdForRoom(null);
    };

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%' }}>

            {/* --- AKSİYON MENÜSÜ MODALI (Edit/Delete) --- */}
            {actionMenu && (
                <div style={styles.modalOverlay} onClick={() => setActionMenu(null)}>
                    <div style={{ ...styles.selectionModalContent, width: '250px' }} onClick={e => e.stopPropagation()}>
                        <h4 style={{ color: 'white', marginTop: 0, borderBottom: '1px solid #4f545c', paddingBottom: 10 }}>{actionMenu.name}</h4>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {actionMenu.type === 'room' && (
                                <button
                                    onClick={executeSettings}
                                    style={{ backgroundColor: '#5865f2', color: 'white', border: 'none', padding: '10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                                >
                                    <FaCog /> Kanal Ayarları
                                </button>
                            )}

                            <button
                                onClick={executeRename}
                                style={{ backgroundColor: '#5865f2', color: 'white', border: 'none', padding: '10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                            >
                                <FaEdit /> Yeniden Adlandır
                            </button>

                            <button
                                onClick={executeDelete}
                                style={{ backgroundColor: '#da373c', color: 'white', border: 'none', padding: '10px', borderRadius: 4, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
                            >
                                <FaTrash /> Sil
                            </button>
                        </div>
                        <button style={{ marginTop: 15, background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', width: '100%' }} onClick={() => setActionMenu(null)}>İptal</button>
                    </div>
                </div>
            )}

            {/* --- DESTEK MODALI --- */}
            {showSupportModal && (
                <div style={styles.modalOverlay} onClick={() => setShowSupportModal(false)}>
                    <div style={styles.selectionModalContent} onClick={e => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <h3 style={{ color: 'white', margin: 0 }}>Bizi Destekle <FaHeart color="#eb459e" /></h3>
                            <FaTimes style={{ cursor: 'pointer', color: '#b9bbbe' }} onClick={() => setShowSupportModal(false)} />
                        </div>

                        {/* Kahve */}
                        <div style={{ backgroundColor: '#1e1f22', padding: 15, borderRadius: 8, marginBottom: 15 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                                <FaCoffee color="#FFDD00" size={24} />
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ color: 'white', fontWeight: 'bold' }}>Buy Me a Coffee</div>
                                    <div style={{ fontSize: '0.8em', color: '#b9bbbe' }}>En kolay destek yöntemi</div>
                                </div>
                            </div>
                            <button onClick={() => window.open(cryptoAddresses.coffee, '_blank')} style={{ width: '100%', padding: 10, backgroundColor: '#FFDD00', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Kahve Ismarla ☕</button>
                        </div>

                        {/* Kripto */}
                        <div style={{ backgroundColor: '#1e1f22', padding: 15, borderRadius: 8 }}>
                            <h4 style={{ margin: '0 0 10px 0', color: 'white', textAlign: 'left' }}><FaBitcoin color="#f7931a" /> Kripto ile Destek</h4>

                            {/* Solana */}
                            <div style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#b9bbbe', marginBottom: 5 }}>
                                    <span>Solana (SOL)</span>
                                    <button onClick={() => copyToClipboard(cryptoAddresses.sol, 'sol')} style={{ cursor: 'pointer', color: '#5865f2', display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, fontSize: 'inherit' }}>
                                        {copiedAddress === 'sol' ? 'Kopyalandı!' : <><FaCopy /> Kopyala</>}
                                    </button>
                                </div>
                                <div style={{ backgroundColor: '#111214', padding: 8, borderRadius: 4, fontSize: '0.8em', color: '#dcddde', wordBreak: 'break-all' }}>{cryptoAddresses.sol}</div>
                            </div>

                            {/* Ethereum */}
                            <div style={{ marginBottom: 10 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#b9bbbe', marginBottom: 5 }}>
                                    <span>Ethereum (ETH)</span>
                                    <button onClick={() => copyToClipboard(cryptoAddresses.eth, 'eth')} style={{ cursor: 'pointer', color: '#5865f2', display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, fontSize: 'inherit' }}>
                                        {copiedAddress === 'eth' ? 'Kopyalandı!' : <><FaCopy /> Kopyala</>}
                                    </button>
                                </div>
                                <div style={{ backgroundColor: '#111214', padding: 8, borderRadius: 4, fontSize: '0.8em', color: '#dcddde', wordBreak: 'break-all' }}>{cryptoAddresses.eth}</div>
                            </div>

                            {/* USDT */}
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#b9bbbe', marginBottom: 5 }}>
                                    <span>USDT (TRC20)</span>
                                    <button onClick={() => copyToClipboard(cryptoAddresses.usdt, 'usdt')} style={{ cursor: 'pointer', color: '#5865f2', display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, fontSize: 'inherit' }}>
                                        {copiedAddress === 'usdt' ? 'Kopyalandı!' : <><FaCopy /> Kopyala</>}
                                    </button>
                                </div>
                                <div style={{ backgroundColor: '#111214', padding: 8, borderRadius: 4, fontSize: '0.8em', color: '#dcddde', wordBreak: 'break-all' }}>{cryptoAddresses.usdt}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 1. KOLON: SERVER RAIL */}
            <div style={styles.serverRail}>
                <div style={{ ...styles.serverIcon, backgroundColor: selectedServerId === 'home' ? '#5865f2' : '#313338', width: '56px', height: '56px' }} onClick={() => { setSelectedServerId('home'); onWelcomeClick(); }} title="Ana Sayfa">
                    <img src="https://media.pawscord.com/assets/logo.png" alt="Pawscord" style={{ width: '48px', height: '48px', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none' }} />
                </div>
                <div style={styles.separator} />

                {servers && servers.map((server, index) => {
                    const initials = server.name.substring(0, 2).toUpperCase();
                    const isActive = selectedServerId === server.id;
                    const isDragging = draggedServerId === server.id;
                    const isDropTarget = dropTargetIndex === index && !isDragging;

                    // Calculate server unread count (moved out of useMemo - can't use hooks in loops!)
                    const serverUnread = Object.keys(safeUnreadCounts)
                        .filter(k => k.startsWith(`room-`) && server.categories?.some(cat => cat.rooms?.some(r => `room-${r.slug}` === k)))
                        .reduce((sum, k) => sum + (safeUnreadCounts[k] || 0), 0);

                    return (
                        <div
                            key={server.id}
                            style={{
                                position: 'relative',
                                marginBottom: '8px'
                            }}
                        >
                            {/* 🔥 YENİ: Üst drop indicator çizgisi */}
                            {isDropTarget && dropPosition === 'before' && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '40px',
                                    height: '3px',
                                    backgroundColor: '#43b581',
                                    borderRadius: '2px',
                                    zIndex: 1000,
                                    boxShadow: '0 0 8px rgba(67, 181, 129, 0.6)'
                                }} />
                            )}

                            <div
                                draggable={true}
                                onDragStart={(e) => handleServerDragStartWrapper(e, server.id, index)}
                                onDragOver={(e) => handleServerDragOverWrapper(e, index)}
                                onDragEnd={handleServerDragEndWrapper}
                                onDrop={(e) => handleServerDropWrapper(e, index)}
                                style={{
                                    ...styles.serverIcon,
                                    backgroundColor: isActive ? '#5865f2' : '#313338',
                                    cursor: isDragging ? 'grabbing' : 'grab',
                                    position: 'relative',
                                    transition: 'opacity 0.2s ease, transform 0.1s ease',
                                    opacity: isDragging ? 0.4 : 1,
                                    marginBottom: 0
                                }}
                                onClick={() => handleServerClick(server)}
                                onContextMenu={(e) => handleServerContextMenu(e, server)}
                                onMouseDown={(e) => {
                                    e.currentTarget.style.cursor = 'grabbing';
                                    e.currentTarget.style.transform = 'scale(0.95)';
                                }}
                                onMouseUp={(e) => {
                                    e.currentTarget.style.cursor = 'grab';
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                                title={server.name}
                            >
                                {server.icon ? (
                                    <LazyImage src={server.icon} alt={server.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: 'white' }}>{initials}</span>
                                )}
                                {serverUnread > 0 && (
                                    <div style={styles.serverBadge}>{serverUnread > 99 ? '99+' : serverUnread}</div>
                                )}
                            </div>

                            {/* 🔥 YENİ: Alt drop indicator çizgisi */}
                            {isDropTarget && dropPosition === 'after' && (
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-4px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '40px',
                                    height: '3px',
                                    backgroundColor: '#43b581',
                                    borderRadius: '2px',
                                    zIndex: 1000,
                                    boxShadow: '0 0 8px rgba(67, 181, 129, 0.6)'
                                }} />
                            )}
                        </div>
                    );
                })}

                <div style={{ ...styles.serverIcon, backgroundColor: '#23a559', color: 'white', marginTop: '10px' }} onClick={handleOpenDiscovery} title="Sunucu Keşfet">
                    <FaCompass size={24} />
                </div>

                {/* 🛒 MAĞAZA İKONU */}
                <div
                    style={{
                        ...styles.serverIcon,
                        background: 'linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)',
                        color: '#000',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                    onClick={onOpenStore}
                    title="Premium Mağaza"
                >
                    🛒
                </div>

                <div style={{ ...styles.serverIcon, backgroundColor: '#23a559', color: 'white' }} onClick={() => setShowAddMenu(true)} title="Ekle"><FaPlus size={20} /></div>
            </div>

            {/* 2. KOLON: PANEL */}
            <div style={styles.sidebar}>
                {selectedServerId === 'home' && (
                    <div style={styles.topSection}>
                        <div style={styles.headerTitle}>Ana Sayfa</div>
                        <div style={styles.channelsContainer}>
                            <div style={{ ...styles.roomItem, marginBottom: 5 }} onClick={() => onRoomSelect('ai')}>
                                <div style={styles.channelContent}><FaRobot style={{ marginRight: 8 }} /> <span>PawPaw AI</span></div>
                            </div>
                            <div style={{ ...styles.roomItem, marginBottom: 15 }} onClick={() => onRoomSelect('sinyal-bot')}>
                                <div style={styles.channelContent}><FaChartLine style={{ marginRight: 8 }} /> <span>Sinyal Bot</span></div>
                            </div>
                        </div>
                        <div style={styles.dmListContainer}>
                            <div style={styles.groupHeader}>
                                <span>ÖZEL MESAJLAR</span>
                                <button onClick={onFriendsClick} style={{ ...styles.addDmButton, position: 'relative' }}>
                                    <FaUserFriends /> Ekle
                                    {/* 🔥 YENİ: Bekleyen arkadaşlık istekleri badge'i */}
                                    {pendingFriendRequests > 0 && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '-6px',
                                            right: '-6px',
                                            backgroundColor: '#ed4245',
                                            color: 'white',
                                            borderRadius: '50%',
                                            width: '18px',
                                            height: '18px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '11px',
                                            fontWeight: 'bold',
                                            border: '2px solid #2b2d31',
                                            zIndex: 1
                                        }}>
                                            {pendingFriendRequests > 9 ? '9+' : pendingFriendRequests}
                                        </div>
                                    )}
                                </button>
                            </div>
                            {console.log('📋 [RoomList] Conversations:', conversations?.length || 0, 'items')}
                            {!conversations || conversations.length === 0 ? (
                                <div style={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    color: '#72767d',
                                    fontSize: '0.9em'
                                }}>
                                    Henüz özel mesaj yok.<br />
                                    Arkadaş ekle butonuna tıklayarak başla!
                                </div>
                            ) : (
                                conversations.map(conv => {
                                    const otherUser = conv.participants.find(p => p.username !== currentUsername);
                                    if (!otherUser) return null;
                                    const unread = safeUnreadCounts[`dm-${conv.id}`] || 0;
                                    return (
                                        <div
                                            key={conv.id}
                                            style={{
                                                ...styles.dmItem,
                                                backgroundColor: currentConversationId === conv.id ? 'rgba(255,255,255,0.1)' : 'transparent',
                                                position: 'relative'
                                            }}
                                            onClick={() => onDMSelect(conv.id, otherUser.username)}
                                            onContextMenu={(e) => {
                                                e.preventDefault();
                                                setDmContextMenu({
                                                    x: e.clientX,
                                                    y: e.clientY,
                                                    conversation: conv
                                                });
                                            }}
                                            onDragOver={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.3)';
                                            }}
                                            onDragLeave={(e) => {
                                                e.preventDefault();
                                                e.currentTarget.style.backgroundColor = currentConversationId === conv.id ? 'rgba(255,255,255,0.1)' : 'transparent';
                                            }}
                                            onDrop={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                e.currentTarget.style.backgroundColor = currentConversationId === conv.id ? 'rgba(255,255,255,0.1)' : 'transparent';
                                                const files = e.dataTransfer.files;
                                                if (files && files.length > 0) {
                                                    onDMSelect(conv.id, otherUser.username);
                                                    setTimeout(() => {
                                                        const fileInput = document.querySelector('input[type="file"]');
                                                        if (fileInput) {
                                                            const dt = new DataTransfer();
                                                            for (let i = 0; i < files.length; i++) {
                                                                dt.items.add(files[i]);
                                                            }
                                                            fileInput.files = dt.files;
                                                            fileInput.dispatchEvent(new Event('change', { bubbles: true }));
                                                        }
                                                    }, 100);
                                                    toast.success(`📎 ${files.length} dosya ${otherUser.username}'a gönderiliyor...`);
                                                }
                                            }}
                                        >
                                            <div style={{ position: 'relative', width: 32, height: 32 }}>
                                                <LazyImage src={getAvatarUrl(otherUser.avatar, otherUser.username)} style={{ ...styles.avatarSmall, width: 32, height: 32 }} alt="" />
                                                {/* Status Dot */}
                                                {(() => {
                                                    const isOnline = onlineUsers.includes(otherUser.username);
                                                    const statusColor = isOnline ? '#23a559' : '#80848e';
                                                    return (
                                                        <div style={{
                                                            position: 'absolute', bottom: -2, right: -2, width: 12, height: 12,
                                                            borderRadius: '50%', backgroundColor: statusColor, border: '2px solid #2b2d31'
                                                        }} />
                                                    );
                                                })()}
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: 8, overflow: 'hidden' }}>
                                                <span style={{ fontWeight: unread ? 'bold' : 'normal', color: '#dbdee1' }}>{otherUser.username}</span>
                                                {(() => {
                                                    const liveUser = allUsers?.find(u => u.username === otherUser.username) || otherUser;
                                                    const activity = liveUser.current_activity;
                                                    if (!activity) return null;

                                                    const els = [];
                                                    // Check for composite structure
                                                    if (activity.steam) {
                                                        els.push(
                                                            <span key="steam" style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                🎮 {activity.steam.name}
                                                            </span>
                                                        );
                                                    }
                                                    if (activity.spotify) {
                                                        els.push(
                                                            <span key="spotify" style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                                🎵 {activity.spotify.name}
                                                            </span>
                                                        );
                                                    }
                                                    // Fallback for flat structure
                                                    if (els.length === 0) {
                                                        if (activity.type === 'listening') {
                                                            els.push(<span key="leg-sp" style={{ fontSize: '10px', color: '#1db954', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🎵 {activity.name}</span>);
                                                        } else if (activity.type === 'playing') {
                                                            els.push(<span key="leg-st" style={{ fontSize: '10px', color: '#66c0f4', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🎮 {activity.name}</span>);
                                                        }
                                                    }

                                                    return els;
                                                })()}
                                            </div>
                                            {unread > 0 && <span style={styles.unreadBadge}>{unread}</span>}
                                        </div>
                                    );
                                }))}
                        </div>
                    </div>
                )}

                {selectedServerId !== 'home' && servers && (
                    <div style={styles.topSection}>
                        {servers.filter(s => s.id === selectedServerId).map(server => {
                            const isOwner = server.owner_username === currentUsername || isAdmin;
                            const canManage = isOwner || server.my_permissions?.is_owner;

                            return (
                                <div key={server.id}>
                                    {/* SERVER HEADER */}
                                    <div style={styles.serverHeader}>
                                        <h3 style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{server.name}</h3>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button style={styles.iconBtn} onClick={(e) => handleCreateInvite(e, server)} title="Davet Linki">
                                                <FaUserPlus />
                                            </button>

                                            {isOwner && <button style={styles.iconBtn} onClick={(e) => { e.stopPropagation(); setActiveServerIdForCategory(server.id) }} title="Kategori Ekle"><FaPlus /></button>}

                                            {canManage && (
                                                <button
                                                    style={styles.iconBtn}
                                                    onClick={(e) => { e.stopPropagation(); if (onOpenServerSettings) onOpenServerSettings(server); }}
                                                    title="Sunucu Ayarları"
                                                >
                                                    <FaCog />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* KATEGORİ EKLEME FORMU */}
                                    {activeServerIdForCategory === server.id && (
                                        <form onSubmit={(e) => handleCreateCategory(e, server.id)} style={styles.addCategoryForm}>
                                            <input autoFocus placeholder="Kategori Adı..." value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} style={styles.addRoomInput} />
                                            <div style={styles.addRoomControls}><button type="submit" style={styles.addRoomButton}>Ekle</button><button type="button" onClick={() => setActiveServerIdForCategory(null)} style={{ ...styles.addRoomButton, background: '#da373c' }}>X</button></div>
                                        </form>
                                    )}

                                    {server.categories && server.categories.map(cat => {
                                        const isCollapsed = collapsedCategories[cat.id];
                                        const isEditingThisCat = editingItemId === `cat-${cat.id}`;

                                        return (
                                            <div key={cat.id} style={{ marginBottom: 5 }}>
                                                <div style={styles.categoryHeader} onClick={() => toggleCategory(cat.id)}>
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {isCollapsed ? <FaChevronRight size={9} /> : <FaChevronDown size={9} />}

                                                        {isEditingThisCat ? (
                                                            <form onSubmit={(e) => handleRenameCategory(e, cat.id)} onClick={e => e.stopPropagation()} style={{ marginLeft: 5 }}>
                                                                <input autoFocus value={editName} onChange={e => setEditName(e.target.value)} onBlur={() => setEditingItemId(null)} style={styles.inlineInput} />
                                                            </form>
                                                        ) : (
                                                            <span style={{ marginLeft: 5 }}>{cat.name}</span>
                                                        )}
                                                    </div>

                                                    {isOwner && (
                                                        <div style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                                            {/* TEK DÜZENLEME BUTONU VE EKLEME BUTONU (2 TABE) */}
                                                            <button style={styles.iconBtn} onClick={(e) => handleOpenActionMenu(e, 'category', cat.id, cat.name)}><FaCog size={10} /></button>
                                                            <button style={styles.iconBtn} onClick={(e) => { e.stopPropagation(); setActiveCategoryIdForRoom(cat.id) }}><FaPlus size={10} /></button>
                                                        </div>
                                                    )}
                                                </div>

                                                {activeCategoryIdForRoom === cat.id && (
                                                    <form onSubmit={(e) => handleCreateRoom(e, cat.id)} style={{ padding: '5px 10px' }}>
                                                        <input autoFocus placeholder="Kanal Adı..." value={newRoomName} onChange={e => setNewRoomName(e.target.value)} style={styles.addRoomInput} />
                                                        <select value={newRoomType} onChange={e => setNewRoomType(e.target.value)} style={styles.channelTypeSelect}>
                                                            <option value="text">📝 Metin</option>
                                                            <option value="voice">🎤 Sesli</option>
                                                            <option value="kanban">📋 Kanban Board</option>
                                                        </select>
                                                        <div style={styles.addRoomControls}><button type="submit" style={styles.addRoomButton}>Ekle</button><button type="button" onClick={() => setActiveCategoryIdForRoom(null)} style={{ ...styles.addRoomButton, background: '#da373c' }}>X</button></div>
                                                    </form>
                                                )}

                                                {!isCollapsed && cat.rooms && cat.rooms.map(room => {
                                                    const isActive = currentVoiceRoom === room.slug;
                                                    const unread = safeUnreadCounts[`room-${room.slug}`] || 0;
                                                    const isVoice = room.channel_type === 'voice';
                                                    const isEditingThisRoom = editingItemId === `room-${room.slug}`;
                                                    const userCount = isVoice && activeVoiceUsers[room.slug] ? activeVoiceUsers[room.slug].length : 0;
                                                    const isLocked = room.is_locked || room.is_private; // 🔒 Kilitli veya özel kanal
                                                    const isFull = isVoice && room.user_limit && userCount >= room.user_limit; // 👥 Kanal dolu

                                                    return (
                                                        <div key={room.id} className="channel-wrapper">
                                                            <div
                                                                className={`channel-item ${isVoice ? 'voice-channel' : 'text-channel'} ${isActive ? 'active' : ''} ${dropTargetChannel === room.slug ? 'voice-channel-drop-target' : ''}`}
                                                                style={{
                                                                    ...styles.roomItem,
                                                                    marginLeft: 8,
                                                                    backgroundColor: dropTargetChannel === room.slug
                                                                        ? 'rgba(88, 101, 242, 0.2)'
                                                                        : isActive ? 'rgba(88, 101, 242, 0.15)' : 'transparent',
                                                                    color: isActive ? '#fff' : '#949ba4',
                                                                    borderLeft: dropTargetChannel === room.slug
                                                                        ? '3px solid #5865f2'
                                                                        : isActive ? '3px solid #5865f2' : '3px solid transparent',
                                                                    paddingLeft: isActive ? '5px' : '8px',
                                                                    transition: 'all 0.2s ease',
                                                                    borderRadius: '6px',
                                                                    margin: '2px 8px',
                                                                    position: 'relative',
                                                                    ...(dropTargetChannel === room.slug ? {
                                                                        boxShadow: 'inset 0 0 12px rgba(88, 101, 242, 0.15), 0 0 8px rgba(88, 101, 242, 0.2)',
                                                                        border: '1px dashed rgba(88, 101, 242, 0.5)',
                                                                    } : {})
                                                                }}
                                                                onClick={() => { if (isVoice) joinVoiceChat(room.slug); else onRoomSelect(room.slug); }}
                                                                onDragOver={(e) => {
                                                                    if (!isVoice) return;
                                                                    e.preventDefault();
                                                                    e.dataTransfer.dropEffect = 'move';
                                                                    setDropTargetChannel(room.slug);
                                                                }}
                                                                onDragLeave={(e) => {
                                                                    if (dropTargetChannel === room.slug) {
                                                                        setDropTargetChannel(null);
                                                                    }
                                                                }}
                                                                onDrop={(e) => {
                                                                    e.preventDefault();
                                                                    setDropTargetChannel(null);
                                                                    if (!isVoice || !isAdmin) return;
                                                                    try {
                                                                        const data = JSON.parse(e.dataTransfer.getData('application/json'));
                                                                        if (data.username && data.fromChannel && data.fromChannel !== room.slug) {
                                                                            handleMoveUserToChannel(data.username, data.fromChannel, room.slug);
                                                                        }
                                                                    } catch (err) {
                                                                        console.error('Drop error:', err);
                                                                    }
                                                                }}
                                                            >
                                                                <div style={styles.channelContent}>
                                                                    {isVoice && (
                                                                        <FaVolumeUp
                                                                            style={{
                                                                                ...styles.voiceIcon,
                                                                                color: isActive ? '#43b581' : '#949ba4',
                                                                                transition: 'color 0.2s ease'
                                                                            }}
                                                                        />
                                                                    )}
                                                                    {!isVoice && <FaCog style={{ ...styles.hashtagIcon, fontSize: '0.9em' }} />}

                                                                    {isEditingThisRoom ? (
                                                                        <form onSubmit={(e) => handleRenameRoom(e, room.slug)} onClick={e => e.stopPropagation()} style={{ flex: 1 }}>
                                                                            <input autoFocus value={editName} onChange={e => setEditName(e.target.value)} onBlur={() => setEditingItemId(null)} style={styles.inlineInput} />
                                                                        </form>
                                                                    ) : (
                                                                        <span style={{
                                                                            ...styles.channelNameText,
                                                                            paddingLeft: '5px',
                                                                            fontWeight: isActive ? '600' : 'normal',
                                                                            flex: 1,
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '6px'
                                                                        }}>
                                                                            {room.name}

                                                                            {/* 🔥 KANAL BADGE'LERİ */}
                                                                            {room.is_private && <span style={{ fontSize: '0.7em', color: '#faa61a', border: '1px solid #faa61a', borderRadius: '3px', padding: '1px 4px' }}>🔒</span>}
                                                                            {room.is_nsfw && <span style={{ fontSize: '0.7em', color: '#f04747', border: '1px solid #f04747', borderRadius: '3px', padding: '1px 4px' }}>18+</span>}
                                                                            {room.is_locked && <span style={{ fontSize: '0.7em', color: '#949ba4', border: '1px solid #949ba4', borderRadius: '3px', padding: '1px 4px' }}>🔐</span>}
                                                                            {room.admin_only_chat && <span style={{ fontSize: '0.7em', color: '#43b581', border: '1px solid #43b581', borderRadius: '3px', padding: '1px 4px' }}>📢</span>}
                                                                        </span>
                                                                    )}

                                                                    {/* Kullanıcı Sayısı (Voice için) - (2/5) veya (2/∞) formatı */}
                                                                    {isVoice && (
                                                                        <span style={{
                                                                            fontSize: '0.75em',
                                                                            color: userCount > 0 ? '#43b581' : '#72767d',
                                                                            fontWeight: '500',
                                                                            marginLeft: 'auto',
                                                                            marginRight: '4px',
                                                                        }}>
                                                                            ({userCount}/{room.user_limit > 0 ? room.user_limit : '∞'})
                                                                        </span>
                                                                    )}
                                                                </div>

                                                                {isOwner && !isEditingThisRoom && (
                                                                    <div style={{ display: 'flex', gap: '3px', marginLeft: '5px' }}>
                                                                        {/* ODA İÇİN TEK SIMGE */}
                                                                        <button style={styles.iconBtn} onClick={(e) => handleOpenActionMenu(e, 'room', room.slug, room.name)}><FaCog size={12} /></button>
                                                                    </div>
                                                                )}

                                                                {unread > 0 && <span style={styles.unreadBadge}>{unread}</span>}
                                                            </div>

                                                            {/* Sesli Kanalda Kim Var - Her Zaman Göster */}
                                                            {isVoice && (
                                                                <div style={{
                                                                    marginLeft: '28px',
                                                                    marginTop: '2px',
                                                                    marginBottom: '2px',
                                                                    // backgroundColor: kaldırıldı - şeffaf olacak
                                                                    padding: '0', // Padding kaldırıldı
                                                                    position: 'relative', // Context menu için
                                                                    zIndex: 1
                                                                }}>
                                                                    <VoiceUserList
                                                                        voiceUsers={activeVoiceUsers}
                                                                        roomName={room.slug}
                                                                        currentUsername={currentUsername}
                                                                        remoteVolumes={remoteVolumes}
                                                                        setRemoteVolume={setRemoteVolume}
                                                                        isClientInThisChannel={currentVoiceRoom === room.slug}
                                                                        isPttActive={isPttActive}
                                                                        isAdmin={isAdmin}
                                                                        voiceChannels={cat.rooms.filter(r => r.is_voice)}
                                                                        friendsList={friendsList} // 🔥 YENİ: Arkadaş listesi
                                                                        getDeterministicAvatar={getDeterministicAvatar} // 🔥 Avatar helper function
                                                                        allUsers={allUsers} // 🔥 Tüm kullanıcılar
                                                                        onUserAction={(action, username, targetChannel) => {
                                                                            if (action === 'profile') {
                                                                                onViewUserProfile?.(username);
                                                                            } else if (action === 'message' || action === 'dm') {
                                                                                // DM açma
                                                                                const conversation = conversations.find(c =>
                                                                                    c.participants.some(p => p.username === username)
                                                                                );
                                                                                if (conversation) {
                                                                                    onDMSelect(conversation.id, username);
                                                                                } else {
                                                                                    console.log(`💬 ${username} ile DM konuşması bulunamadı. Önce arkadaş ekleyin.`);
                                                                                }
                                                                            } else if (action === 'add_friend') {
                                                                                // 🔥 YENİ: Gerçek arkadaş ekleme
                                                                                handleAddFriend(username);
                                                                            } else if (action === 'remove_friend') {
                                                                                // 🔥 YENİ: Arkadaş çıkarma
                                                                                handleRemoveFriend(username);
                                                                            } else if (action === 'mute_local') {
                                                                                // Lokal susturma - console log yeterli
                                                                                console.log(`🔇 ${username} lokal olarak sessize alındı`);
                                                                            } else if (action === 'move' && targetChannel) {
                                                                                // Kullanıcıyı başka kanala taşı - direkt yap
                                                                                handleMoveUserToChannel(username, room.slug, targetChannel);
                                                                            } else if (action === 'kick') {
                                                                                // Kullanıcıyı kanaldan at - direkt yap
                                                                                handleKickUserFromChannel(username, room.slug);
                                                                            } else if (action === 'server_mute') {
                                                                                // Sunucu susturma - console log
                                                                                console.log(`🔇 ${username} sunucu susturma yapılacak`);
                                                                            } else if (action === 'server_deafen') {
                                                                                // Sunucu sağırlaştırma - console log
                                                                                console.log(`🙉 ${username} sunucu sağırlaştırma yapılacak`);
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* EKLEME MENÜSÜ MODALI */}
                {/* EKLEME MENÜSÜ MODALI */}
                {showAddMenu && createPortal(
                    <div style={styles.modalOverlay} onClick={() => setShowAddMenu(false)}>
                        <div style={styles.selectionModalContent} onClick={e => e.stopPropagation()}>
                            <h3 style={{ color: 'white', margin: 0 }}>Ne Yapmak İstersin?</h3>
                            <button style={{ ...styles.selectionButton, backgroundColor: '#5865f2' }} onClick={() => { setShowAddMenu(false); setIsCreatingServer(true); }}><FaServer /> Sunucu Oluştur</button>
                            <button style={{ ...styles.selectionButton, backgroundColor: '#23a559' }} onClick={() => { setShowAddMenu(false); onFriendsClick(); }}><FaUserFriends /> Arkadaş Ekle</button>
                            <button style={{ marginTop: 10, background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer' }} onClick={() => setShowAddMenu(false)}>İptal</button>
                        </div>
                    </div>,
                    document.body
                )}

                {/* SUNUCU OLUŞTURMA MODALI */}
                {/* SUNUCU OLUŞTURMA MODALI */}
                {isCreatingServer && createPortal(
                    <div style={styles.modalOverlay}>
                        <form onSubmit={handleCreateServer} style={styles.addCategoryForm}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, color: 'white' }}>Sunucu Oluştur</h3>
                                <FaTimes style={{ cursor: 'pointer', color: '#b9bbbe' }} onClick={() => setIsCreatingServer(false)} />
                            </div>
                            <p style={{ color: '#b9bbbe', fontSize: '0.9em' }}>Sunucuna bir isim ver.</p>
                            <input autoFocus placeholder="Sunucu Adı..." value={newServerName} onChange={e => setNewServerName(e.target.value)} style={styles.addRoomInput} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '10px 0' }}>
                                <input type="checkbox" id="publicCheck" checked={isNewServerPublic} onChange={(e) => setIsNewServerPublic(e.target.checked)} style={{ width: '16px', height: '16px', accentColor: '#23a559' }} />
                                <label htmlFor="publicCheck" style={{ color: '#dbdee1', fontSize: '0.9em', cursor: 'pointer' }}>Herkese Açık (Keşfet'te Görünür)</label>
                            </div>
                            <button type="submit" style={styles.addRoomButton}>Oluştur</button>
                        </form>
                    </div>,
                    document.body
                )}

                <div style={styles.bottomSection}>

                    {/* 🔥 Modern Admin Panel Button */}
                    {isAdmin && (
                        <button
                            onClick={onOpenAdminPanel}
                            style={{
                                width: '100%',
                                padding: '12px',
                                marginBottom: '10px',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontWeight: '600',
                                fontSize: '0.95em',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                            }}
                        >
                            <FaCog size={16} />
                            <span>Admin Panel</span>
                        </button>
                    )}

                    {/* 💰 Quick Access Buttons - Compact Horizontal Layout */}
                    <div style={{
                        display: 'flex',
                        gap: '5px',
                        marginBottom: '10px',
                        padding: '5px',
                        backgroundColor: '#1e1f22',
                        borderRadius: '8px',
                        overflowX: 'auto',
                        scrollbarWidth: 'thin'
                    }}>
                        {onOpenPaymentPanel && (
                            <button onClick={onOpenPaymentPanel} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="💰 Payment Panel" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                💰
                            </button>
                        )}
                        {onOpenStoreModal && (
                            <button onClick={onOpenStoreModal} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="🛒 Store" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                🛒
                            </button>
                        )}
                        {onOpenDailyRewards && (
                            <button onClick={onOpenDailyRewards} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="🎁 Daily Rewards" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                🎁
                            </button>
                        )}
                        {onOpenAPIUsage && (
                            <button onClick={onOpenAPIUsage} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="📊 API Usage" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                📊
                            </button>
                        )}
                        {onOpenExportJobs && (
                            <button onClick={onOpenExportJobs} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="📥 Export Jobs" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                📥
                            </button>
                        )}
                        {onOpenScheduledAnnouncements && (
                            <button onClick={onOpenScheduledAnnouncements} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="📢 Scheduled Announcements" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                📢
                            </button>
                        )}
                        {/* 🎮 NEW FEATURES (2026-01-28) */}
                        {onOpenMiniGames && (
                            <button onClick={onOpenMiniGames} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="🎮 Mini Games" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                🎮
                            </button>
                        )}
                        {onOpenProjectCollaboration && (
                            <button onClick={onOpenProjectCollaboration} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="📂 Projects" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                📂
                            </button>
                        )}
                        {onOpenAvatarStudio && (
                            <button onClick={onOpenAvatarStudio} style={{
                                minWidth: '36px',
                                width: '36px',
                                height: '36px',
                                padding: '0',
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '18px',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }} title="🎨 Avatar Studio" onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                                🎨
                            </button>
                        )}
                    </div>

                    {(isInVoice || isConnecting) && (
                        <div style={{
                            padding: '8px',
                            backgroundColor: '#232428',
                            borderTop: '1px solid #1e1f22',
                            borderBottom: '1px solid #1e1f22'
                        }}>
                            {/* 🔥 Avatar ve Kanal Bilgisi */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '8px',
                                padding: '0 4px'
                            }}>
                                {/* 🔥 Kullanıcı Avatarı */}
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={getAvatarUrl(currentUserProfile?.avatar, currentUsername)}
                                        alt={currentUsername}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            border: '2px solid #23a559',
                                            boxShadow: '0 0 8px rgba(35, 165, 89, 0.5)'
                                        }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = getDeterministicAvatar(currentUsername);
                                        }}
                                    />
                                    {/* 🎤 Mikrofon Status Badge */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-2px',
                                        right: '-2px',
                                        width: '16px',
                                        height: '16px',
                                        borderRadius: '50%',
                                        backgroundColor: isMuted ? '#f04747' : '#23a559',
                                        border: '2px solid #232428',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '8px'
                                    }}>
                                        {isMuted ? '🔇' : '🎤'}
                                    </div>
                                </div>

                                {/* 🔥 Kanal Bilgisi ve Durum */}
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{ color: isConnecting ? '#eba61e' : '#23a559', fontWeight: 'bold', fontSize: '0.8em' }}>
                                        {isConnecting ? 'Bağlanılıyor...' : 'Ses Bağlandı'}
                                    </div>
                                    <div style={{ fontSize: '0.7em', color: '#b9bbbe', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {currentVoiceRoom} / Genel
                                    </div>
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '5px'
                            }}>
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleVideo(); }}
                                    style={{
                                        flex: 1,
                                        background: isVideoEnabled ? '#23a559' : '#2b2d31',
                                        border: 'none',
                                        color: 'white',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    title={isVideoEnabled ? "Kamerayı Kapat" : "Kamerayı Aç"}
                                >
                                    {isVideoEnabled ? <FaFilm size={16} /> : <FaVideoSlash size={16} />}
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleScreenShare(); }}
                                    style={{
                                        flex: 1,
                                        background: isScreenSharing ? '#23a559' : '#2b2d31',
                                        border: 'none',
                                        color: 'white',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    title={isScreenSharing ? "Paylaşımı Durdur" : "Ekran Paylaş"}
                                >
                                    <FaDesktop size={16} />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                                    style={{
                                        flex: 1,
                                        background: isMuted ? '#da373c' : '#2b2d31',
                                        border: 'none',
                                        color: 'white',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    title={isMuted ? "Sesi Aç" : "Sessize Al"}
                                >
                                    {isMuted ? <FaMicrophoneSlash size={16} /> : <FaMicrophone size={16} />}
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleDeafened(); }}
                                    style={{
                                        flex: 1,
                                        background: isDeafened ? '#da373c' : '#2b2d31',
                                        border: 'none',
                                        color: 'white',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    title={isDeafened ? "Duy" : "Sağırlaştır"}
                                >
                                    {isDeafened ? <TbHeadphonesOff size={18} /> : <FaHeadphones size={16} />}
                                </button>

                                {/* � AYARLAR BUTONU */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Ses ayarları modal'ını aç - VoiceChatPanel'e mesaj gönder
                                        window.dispatchEvent(new CustomEvent('openVoiceSettings'));
                                    }}
                                    style={{
                                        flex: 1,
                                        background: '#2b2d31',
                                        border: 'none',
                                        color: 'white',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    title="Ses Ayarları"
                                >
                                    <FaCog size={16} />
                                </button>

                                {/* �🔥 ÇIKIŞ BUTONU */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (typeof leaveVoiceChat === 'function') {
                                            leaveVoiceChat();
                                        } else {
                                            console.error('leaveVoiceChat is not a function');
                                        }
                                    }}
                                    style={{
                                        flex: 1,
                                        background: '#da373c',
                                        border: 'none',
                                        color: 'white',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s'
                                    }}
                                    title="Sesli Kanaldan Çık"
                                >
                                    <FaPhoneSlash size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 💝 DEVELOPER SUPPORT BUTTON - Sesli sohbet moduna uyumlu */}
                    <div
                        onClick={() => setShowSupportModal(true)}
                        style={{
                            backgroundColor: '#1e1f22',
                            padding: (isInVoice || isConnecting) ? '6px 10px' : '10px 14px',
                            margin: '0 8px 8px 8px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: (isInVoice || isConnecting) ? '8px' : '12px',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            border: '1px solid transparent',
                            background: 'linear-gradient(135deg, rgba(235, 69, 158, 0.06) 0%, rgba(88, 101, 242, 0.06) 100%)',
                            overflow: 'hidden',
                            flexShrink: 0,
                            minHeight: (isInVoice || isConnecting) ? '36px' : '44px',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(235, 69, 158, 0.12) 0%, rgba(88, 101, 242, 0.12) 100%)';
                            e.currentTarget.style.borderColor = '#eb459e';
                            e.currentTarget.style.transform = 'scale(1.01)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(235, 69, 158, 0.06) 0%, rgba(88, 101, 242, 0.06) 100%)';
                            e.currentTarget.style.borderColor = 'transparent';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        title="Geliştiriciye Destek Ol"
                    >
                        <FaHeart style={{
                            color: '#eb459e',
                            fontSize: (isInVoice || isConnecting) ? '14px' : '18px',
                            flexShrink: 0,
                            animation: 'heartPulse 2s ease-in-out infinite',
                        }} />
                        <div style={{ flex: 1, textAlign: 'left', overflow: 'hidden' }}>
                            <div style={{
                                color: 'white',
                                fontWeight: '600',
                                fontSize: (isInVoice || isConnecting) ? '11px' : '13px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}>
                                {(isInVoice || isConnecting) ? "Destekle" : "Developer'ı Destekle"}
                            </div>
                        </div>
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(235, 69, 158, 0.2) 0%, rgba(88, 101, 242, 0.2) 100%)',
                            padding: (isInVoice || isConnecting) ? '2px 6px' : '4px 8px',
                            borderRadius: '10px',
                            fontSize: (isInVoice || isConnecting) ? '10px' : '12px',
                            color: '#eb459e',
                            fontWeight: 'bold',
                            flexShrink: 0,
                        }}>
                            ☕
                        </div>
                    </div>

                    {/* 👤 USER FOOTER - Profesyonel ses kontrolleri ile */}
                    <UserFooter
                        currentUserProfile={currentUserProfile}
                        currentUsername={currentUsername}
                        getDeterministicAvatar={getDeterministicAvatar}
                        onProfileClick={onProfileClick}
                        updateAvailable={updateAvailable}
                        onUpdateClick={onUpdateClick}
                    />
                </div>
            </div>

            {/* KEŞFET PENCERESİ */}
            {/* KEŞFET PENCERESİ */}
            {
                showDiscovery && createPortal(
                    <div style={{ ...styles.modalOverlay, display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => setShowDiscovery(false)}>
                        <div style={{ ...styles.selectionModalContent, width: '600px', maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottom: '1px solid #1e1f22' }}>
                                <h3 style={{ color: 'white', margin: 0, fontSize: '1.5em' }}>🌍 Sunucuya Katıl</h3>
                                <FaTimes style={{ cursor: 'pointer', color: '#b9bbbe', fontSize: '1.3em' }} onClick={() => setShowDiscovery(false)} />
                            </div>

                            <div style={{ backgroundColor: '#202225', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                                <p style={{ color: '#b9bbbe', fontSize: '0.9em', marginTop: 0 }}>Elinizde bir davet kodu veya linki varsa aşağıya yapıştırın.</p>
                                <form onSubmit={handleJoinViaCode} style={{ display: 'flex', gap: '10px' }}>
                                    <input value={inviteCodeInput} onChange={(e) => setInviteCodeInput(e.target.value)} placeholder="https://www.pawscord.com/invite/..." style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #1e1f22', backgroundColor: '#313338', color: 'white', outline: 'none' }} />
                                    <button type="submit" style={{ backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', padding: '0 20px', fontWeight: 'bold', cursor: 'pointer' }}>Katıl</button>
                                </form>
                            </div>

                            <h4 style={{ textAlign: 'left', color: '#dbdee1', borderBottom: '1px solid #4f545c', paddingBottom: '5px', marginBottom: '10px' }}>
                                <FaCompass style={{ marginRight: 8 }} /> Toplulukları Keşfet
                            </h4>

                            {publicServers.length === 0 ? (
                                <p style={{ color: '#b9bbbe', fontStyle: 'italic' }}>Şu an katılabileceğin halka açık sunucu yok.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {publicServers.map(srv => (
                                        <div key={srv.id} style={{ backgroundColor: '#2b2d31', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #1f2023' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                {srv.icon ? (<img src={`https://www.pawscord.com${srv.icon}`} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />) : (<div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#5865f2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'white' }}>{srv.name.substring(0, 2).toUpperCase()}</div>)}
                                                <div style={{ textAlign: 'left' }}>
                                                    <div style={{ color: 'white', fontWeight: 'bold' }}>{srv.name}</div>
                                                    <div style={{ color: '#b9bbbe', fontSize: '0.8em' }}>{srv.member_count} Üye • Kurucu: {srv.owner}</div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleJoinServer(srv.id)} style={{ backgroundColor: '#23a559', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Katıl</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body
                )
            }

            {/* Davet Modal */}
            {
                showInviteModal && inviteModalServer && (
                    <InviteModal
                        onClose={() => {
                            setShowInviteModal(false);
                            setInviteModalServer(null);
                        }}
                        server={inviteModalServer}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />
                )
            }

            {/* Saved Messages Modal */}
            {
                showSavedMessages && createPortal(
                    <SavedMessagesModal
                        type={showSavedMessages}
                        onClose={() => setShowSavedMessages(null)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )
            }

            {/* Scheduled Message Modal */}
            {
                showScheduledMessages && createPortal(
                    <ScheduledMessageModal
                        room={actualCurrentRoom}
                        conversation={currentConversationId}
                        onClose={() => setShowScheduledMessages(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )
            }

            {/* Webhook Manager */}
            {
                showWebhooks && createPortal(
                    <WebhookManager
                        serverId={selectedServerId}
                        onClose={() => setShowWebhooks(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )
            }

            {/* Moderator Tools */}
            {
                showModTools && createPortal(
                    <ModeratorTools
                        serverId={selectedServerId}
                        onClose={() => setShowModTools(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )
            }

            {/* Quick Actions Menu */}
            {
                showQuickActions && createPortal(
                    <QuickActionsMenu
                        onClose={() => setShowQuickActions(false)}
                        onOpenWebhooks={() => { setShowQuickActions(false); setShowWebhooks(true); }}
                        onOpenAuditLogs={() => { setShowQuickActions(false); setShowAuditLogs(true); }}
                        onOpenReports={() => { setShowQuickActions(false); setShowReports(true); }}
                        onOpenVanityURL={() => { setShowQuickActions(false); setShowVanityURL(true); }}
                        onOpenAutoResponder={() => { setShowQuickActions(false); setShowAutoResponder(true); }}
                    />,
                    document.body
                )
            }

            {/* Audit Log Viewer */}
            {
                showAuditLogs && createPortal(
                    <AuditLogViewer
                        serverId={selectedServerId}
                        onClose={() => setShowAuditLogs(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )
            }

            {/* Reports Viewer */}
            {
                showReports && createPortal(
                    <ReportsViewer
                        serverId={selectedServerId}
                        onClose={() => setShowReports(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )
            }

            {/* Vanity URL Manager */}
            {
                showVanityURL && createPortal(
                    <VanityURLManager
                        serverId={selectedServerId}
                        onClose={() => setShowVanityURL(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )
            }

            {/* Auto Responder Manager */}
            {
                showAutoResponder && createPortal(
                    <AutoResponderManager
                        serverId={selectedServerId}
                        onClose={() => setShowAutoResponder(false)}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />,
                    document.body
                )
            }

            {/* 🆕 SUNUCU CONTEXT MENU */}
            {serverContextMenu && createPortal(
                <ServerContextMenu
                    x={serverContextMenu.x}
                    y={serverContextMenu.y}
                    server={serverContextMenu.server}
                    isOwner={serverContextMenu.isOwner}
                    onClose={() => setServerContextMenu(null)}
                    onLeaveServer={() => handleLeaveServer(serverContextMenu.server.id)}
                    onServerSettings={() => {
                        onOpenServerSettings(serverContextMenu.server);
                        setServerContextMenu(null);
                    }}
                    onMuteServer={() => {
                        const serverId = serverContextMenu.server.id;
                        setMutedServers(prev => {
                            const updated = [...prev, serverId];
                            localStorage.setItem('mutedServers', JSON.stringify(updated));
                            return updated;
                        });
                        setServerContextMenu(null);
                    }}
                    onUnmuteServer={() => {
                        const serverId = serverContextMenu.server.id;
                        setMutedServers(prev => {
                            const updated = prev.filter(id => id !== serverId);
                            localStorage.setItem('mutedServers', JSON.stringify(updated));
                            return updated;
                        });
                        setServerContextMenu(null);
                    }}
                    onMoveUp={() => handleMoveServer(serverContextMenu.server.id, 'up')}
                    onMoveDown={() => handleMoveServer(serverContextMenu.server.id, 'down')}
                    onCopyInvite={() => handleCopyServerInvite(serverContextMenu.server.id)}
                    onChangeIcon={() => {
                        handleChangeServerIcon(serverContextMenu.server.id);
                        setServerContextMenu(null);
                    }}
                    onChangePrivacy={() => {
                        handleChangeServerPrivacy(serverContextMenu.server.id);
                        setServerContextMenu(null);
                    }}
                    onDeleteServer={async () => {
                        const serverId = serverContextMenu.server.id;
                        const serverName = serverContextMenu.server.name;

                        // Modern confirm modal'ı aç
                        setDeleteServerModal({
                            server: serverContextMenu.server,
                            isOpen: true
                        });

                        setServerContextMenu(null);
                    }}
                    canMoveUp={servers && servers.findIndex(s => s.id === serverContextMenu.server.id) > 0}
                    canMoveDown={servers && servers.findIndex(s => s.id === serverContextMenu.server.id) < servers.length - 1}
                    isMuted={mutedServers.includes(serverContextMenu.server.id)}
                />,
                document.body
            )}

            {/* 🆕 DM CONTEXT MENU - Modern & Feature-Rich */}
            {dmContextMenu && createPortal(
                (() => {
                    const otherUser = dmContextMenu.conversation.participants.find(p => p.username !== currentUsername);
                    if (!otherUser) return null;

                    const menuItems = [
                        {
                            icon: '👤',
                            label: 'Profili Görüntüle',
                            color: '#dbdee1',
                            onClick: () => handleViewProfile(otherUser.username),
                            divider: false
                        },
                        {
                            icon: '💬',
                            label: 'Mesaj Gönder',
                            color: '#dbdee1',
                            onClick: () => {
                                const otherParticipant = dmContextMenu.conversation.participants?.find(p => p.username !== currentUsername);
                                onDMSelect(dmContextMenu.conversation.id, otherParticipant?.username);
                                setDmContextMenu(null);
                            },
                            divider: true
                        },
                        {
                            icon: '🎫',
                            label: 'Sunucuya Davet Et',
                            color: '#5865f2',
                            onClick: () => handleInviteToServer(otherUser.username),
                            divider: false
                        },
                        {
                            icon: '📌',
                            label: 'Konuşmayı Sabitle',
                            color: '#dbdee1',
                            onClick: () => handlePinConversation(dmContextMenu.conversation.id),
                            divider: true
                        },
                        {
                            icon: '🔇',
                            label: 'Sessize Al',
                            color: '#b9bbbe',
                            onClick: () => handleMuteUser(otherUser.username, dmContextMenu.conversation.id),
                            divider: false
                        },
                        {
                            icon: '👁️‍🗨️',
                            label: 'Konuşmayı Gizle',
                            color: '#b9bbbe',
                            onClick: () => handleHideDM(dmContextMenu.conversation.id),
                            divider: true
                        },
                        {
                            icon: '🗑️',
                            label: 'Konuşmayı Temizle',
                            color: '#f23f42',
                            onClick: () => handleClearDM(dmContextMenu.conversation.id),
                            divider: false
                        },
                        {
                            icon: '🚫',
                            label: 'Kullanıcıyı Engelle',
                            color: '#ed4245',
                            onClick: () => handleBlockUser(otherUser.username),
                            divider: false
                        }
                    ];

                    return (
                        <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'fixed',
                                top: dmContextMenu.y,
                                left: dmContextMenu.x,
                                backgroundColor: '#111214',
                                border: '1px solid #2b2d31',
                                borderRadius: '8px',
                                minWidth: '220px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.4), 0 0 1px rgba(0,0,0,0.5)',
                                zIndex: 999999,
                                overflow: 'hidden',
                                animation: 'contextMenuSlide 0.1s ease-out'
                            }}
                        >
                            {/* User Info Header */}
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#1e1f22',
                                borderBottom: '1px solid #2b2d31',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>
                                <img
                                    src={getAvatarUrl(otherUser.avatar, otherUser.username)}
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                    alt=""
                                />
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <div style={{
                                        color: '#f2f3f5',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {otherUser.username}
                                    </div>
                                    <div style={{
                                        color: '#b9bbbe',
                                        fontSize: '12px',
                                        marginTop: '2px'
                                    }}>
                                        {onlineUsers.includes(otherUser.username) ? '🟢 Çevrimiçi' : '⚫ Çevrimdışı'}
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            {menuItems.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div
                                        onClick={item.onClick}
                                        style={{
                                            padding: '10px 12px',
                                            cursor: 'pointer',
                                            color: item.color,
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            transition: 'all 0.1s ease',
                                            backgroundColor: 'transparent'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = item.color === '#f23f42' || item.color === '#ed4245'
                                                ? 'rgba(237, 66, 69, 0.15)'
                                                : 'rgba(88, 101, 242, 0.1)';
                                            e.currentTarget.style.paddingLeft = '16px';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.paddingLeft = '12px';
                                        }}
                                    >
                                        <span style={{ fontSize: '16px', width: '20px', textAlign: 'center' }}>
                                            {item.icon}
                                        </span>
                                        <span style={{ flex: 1 }}>{item.label}</span>
                                    </div>
                                    {item.divider && (
                                        <div style={{
                                            height: '1px',
                                            backgroundColor: '#2b2d31',
                                            margin: '4px 8px'
                                        }} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    );
                })(),
                document.body
            )}

            {/* 🔥 Server Delete Confirmation Modal */}
            {deleteServerModal?.isOpen && (
                <ConfirmModal
                    isOpen={deleteServerModal.isOpen}
                    onClose={() => setDeleteServerModal(null)}
                    onConfirm={async () => {
                        const serverId = deleteServerModal.server.id;
                        const serverName = deleteServerModal.server.name;

                        try {
                            const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/delete/`, {
                                method: 'DELETE'
                            });

                            if (response.ok) {
                                console.log('✅ Sunucu başarıyla silindi!');
                                toast.success(`"${serverName}" sunucusu başarıyla silindi!`, 5000);

                                // Ana sayfaya dön
                                setSelectedServerId('home');
                                onWelcomeClick();

                                // Sunucu listesini yenile
                                window.location.reload();
                            } else {
                                const error = await response.json();
                                console.error('❌ Sunucu silinirken hata:', error);
                                toast.error(`Hata: ${error.error || 'Sunucu silinirken bir hata oluştu'}`);
                            }
                        } catch (error) {
                            console.error('❌ Sunucu silme hatası:', error);
                            toast.error('Sunucu silinirken bir hata oluştu. Lütfen tekrar deneyin.');
                        }
                    }}
                    title="⚠️ Sunucuyu Sil"
                    message={`"${deleteServerModal.server.name}" sunucusunu KALİCİ OLARAK silmek üzeresiniz!`}
                    confirmText="Sunucuyu Sil"
                    cancelText="İptal"
                    type="danger"
                    requireTextConfirmation={true}
                    confirmationText={deleteServerModal.server.name}
                    inputPlaceholder={`Onaylamak için "${deleteServerModal.server.name}" yazın...`}
                    dangerDetails={[
                        'Sunucudaki TÜM kanallar silinecek',
                        'Sunucudaki TÜM mesajlar silinecek',
                        'TÜM üyeler atılacak',
                        'Tüm roller ve ayarlar silinecek'
                    ]}
                />
            )}

            {/* 🆕 SUNUCUYA DAVET MODAL - Sunucu Seçimi */}
            {inviteToServerModal && inviteToServerModal.isOpen && createPortal(
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 999999
                    }}
                    onClick={() => setInviteToServerModal(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#2b2d31',
                            borderRadius: '12px',
                            width: '400px',
                            maxHeight: '80vh',
                            overflow: 'hidden',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '20px',
                            borderBottom: '1px solid #3f4147',
                            textAlign: 'center'
                        }}>
                            <h2 style={{ color: '#f2f3f5', margin: 0, fontSize: '18px' }}>
                                🎫 Sunucuya Davet Et
                            </h2>
                            <p style={{ color: '#b9bbbe', margin: '8px 0 0', fontSize: '14px' }}>
                                <strong>{inviteToServerModal.username}</strong> kullanıcısını hangi sunucuya davet etmek istiyorsunuz?
                            </p>
                        </div>

                        {/* Server List */}
                        <div style={{
                            maxHeight: '300px',
                            overflowY: 'auto',
                            padding: '12px'
                        }}>
                            {servers.map(server => (
                                <div
                                    key={server.id}
                                    onClick={() => handleSendServerInvite(server.id, inviteToServerModal.username)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        backgroundColor: 'rgba(255,255,255,0.02)',
                                        marginBottom: '8px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(88, 101, 242, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)';
                                    }}
                                >
                                    {server.icon ? (
                                        <img
                                            src={server.icon}
                                            alt={server.name}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : (
                                        <div style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: '50%',
                                            backgroundColor: '#5865f2',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            fontSize: '16px'
                                        }}>
                                            {server.name?.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: '#f2f3f5', fontWeight: '600' }}>
                                            {server.name}
                                        </div>
                                        <div style={{ color: '#b9bbbe', fontSize: '12px' }}>
                                            {server.member_count || server.categories?.length || 0} üye
                                        </div>
                                    </div>
                                    <div style={{ color: '#5865f2', fontSize: '20px' }}>→</div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '16px 20px',
                            borderTop: '1px solid #3f4147',
                            textAlign: 'center'
                        }}>
                            <button
                                onClick={() => setInviteToServerModal(null)}
                                style={{
                                    backgroundColor: '#4f545c',
                                    color: '#f2f3f5',
                                    border: 'none',
                                    padding: '10px 24px',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontWeight: '600'
                                }}
                            >
                                İptal
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}

            {/* Channel Settings Modal */}
            {showChannelSettings && selectedRoom && (() => {
                // Sunucunun rollerini bul
                const currentServer = servers?.find(s => s.id === selectedRoom.server_id);
                const serverRoles = currentServer?.roles || [];

                return (
                    <ChannelSettingsModal
                        room={selectedRoom}
                        serverId={selectedRoom.server_id || selectedServerId}
                        serverRoles={serverRoles}
                        onClose={() => {
                            setShowChannelSettings(false);
                            setSelectedRoom(null);
                        }}
                        onUpdate={(updatedRoom) => {
                            setShowChannelSettings(false);
                            setSelectedRoom(null);
                        }}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                    />
                );
            })()}
        </div >
    );
};

// 🎨 CSS Animasyonları ve Hover Efektleri
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        /* Kanal Hover Efektleri */
        .channel-item {
            position: relative;
            overflow: hidden;
        }
        
        .channel-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 50%;
            background: linear-gradient(90deg, rgba(88, 101, 242, 0.4), transparent);
            transition: width 0.3s ease;
            border-radius: 0 4px 4px 0;
        }
        
        .channel-item:hover::before {
            width: 4px;
        }
        
        .channel-item:hover {
            background: rgba(255, 255, 255, 0.05) !important;
            color: #fff !important;
            transform: translateX(2px);
        }
        
        .channel-item.active {
            background: rgba(88, 101, 242, 0.15) !important;
            box-shadow: 0 2px 8px rgba(88, 101, 242, 0.2);
        }
        
        /* Voice Channel Özel Animasyonlar */
        .voice-channel.active {
            background: linear-gradient(90deg, rgba(67, 181, 129, 0.15), rgba(88, 101, 242, 0.1)) !important;
        }
        
        .voice-channel:hover {
            background: rgba(67, 181, 129, 0.08) !important;
        }
        
        /* Kullanıcı Listesi Fade-in Animasyonu */
        .channel-wrapper {
            animation: channelFadeIn 0.3s ease;
        }
        
        @keyframes channelFadeIn {
            from {
                opacity: 0;
                transform: translateY(-5px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Kanal İkon Pulse Animasyonu (Aktif Sesli Kanal için) */
        
    /* 💝 Developer Support Heart Animation */
    @keyframes heartPulse {
        0%, 100% { transform: scale(1); }
        25% { transform: scale(1.15); }
        50% { transform: scale(1); }
        75% { transform: scale(1.1); }
    }
    
    .voice-channel.active svg {
            animation: iconPulse 2s infinite;
        }
        
        @keyframes iconPulse {
            0%, 100% {
                transform: scale(1);
                opacity: 1;
            }
            50% {
                transform: scale(1.1);
                opacity: 0.8;
            }
        }
        
        /* Kullanıcı Sayısı Badge Pulse */
        .voice-channel.active > div > div:last-child {
            animation: badgePulse 1.5s infinite;
        }
        
        @keyframes badgePulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.4);
            }
            50% {
                box-shadow: 0 0 0 4px rgba(67, 181, 129, 0);
            }
        }

        /* Context Menu Slide Animation */
        @keyframes contextMenuSlide {
            from {
                opacity: 0;
                transform: translateY(-8px) scale(0.96);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;

    if (!document.head.querySelector('style[data-roomlist-animations]')) {
        styleSheet.setAttribute('data-roomlist-animations', 'true');
        document.head.appendChild(styleSheet);
    }
}

// ✨ PERFORMANS İÇİN MEMO EKLENDİ
export default React.memo(RoomList);
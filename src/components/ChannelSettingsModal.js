// frontend/src/components/ChannelSettingsModal.js
// 🔥 FULL DISCORD-STYLE CHANNEL SETTINGS WITH ADVANCED PERMISSIONS

import { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes, FaCog, FaShieldAlt, FaLink, FaHistory } from 'react-icons/fa';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';
import useModalA11y from '../hooks/useModalA11y';
import styles from './ChannelSettingsModal/styles';
import GeneralTab from './ChannelSettingsModal/GeneralTab';
import PermissionsTab from './ChannelSettingsModal/PermissionsTab';
import IntegrationsTab from './ChannelSettingsModal/IntegrationsTab';
import AdvancedTab from './ChannelSettingsModal/AdvancedTab';

const ChannelSettingsModal = ({ room, serverRoles, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Kanal Ayarları' });
    const [activeTab, setActiveTab] = useState('general'); // 'general', 'permissions'
    const [name, setName] = useState(room.name);
    const [selectedRoles, setSelectedRoles] = useState(room.allowed_roles || []);

    // 🔥 YENİ: Tüm kanal özellikleri
    const [isPrivate, setIsPrivate] = useState(room.is_private || false);
    const [isNsfw, setIsNsfw] = useState(room.is_nsfw || false);
    const [isLocked, setIsLocked] = useState(room.is_locked || false);
    const [isReadOnly, setIsReadOnly] = useState(room.admin_only_chat || false);
    const [userLimit, setUserLimit] = useState(room.user_limit || 0);
    const [bitrate, setBitrate] = useState(room.bitrate || 64);

    // 🔒 Gelişmiş İzinler
    const [permissions, setPermissions] = useState({ role_permissions: [], user_permissions: [], available_roles: [], available_users: [] });
    const [showAddPermission, setShowAddPermission] = useState(false);
    const [permissionType, setPermissionType] = useState('role'); // 'role' or 'user'
    const [selectedRoleForPerm, setSelectedRoleForPerm] = useState(null);
    const [selectedUserForPerm, setSelectedUserForPerm] = useState(null); // 🔥 YENİ: Seçilen kullanıcı
    const [searchUser, setSearchUser] = useState('');
    const [searchResults, setSearchResults] = useState([]); // 🔥 YENİ: Arama sonuçları
    const [notificationPref, setNotificationPref] = useState('all'); // 🔥 YENİ: Bildirim tercihi
    const [deleteHistoryDays, setDeleteHistoryDays] = useState('7'); // 🔥 YENİ: Mesaj geçmişi silme süresi

    const isVoiceChannel = room.channel_type === 'voice';

    const handlePrivateChange = useCallback((e) => {
        setIsPrivate(e.target.checked);
        updateChannelRestriction({ is_private: e.target.checked });
    }, []);

    const handleNsfwChange = useCallback((e) => {
        setIsNsfw(e.target.checked);
    }, []);

    const handleLockedChange = useCallback((e) => {
        setIsLocked(e.target.checked);
        updateChannelRestriction({ is_locked: e.target.checked });
    }, []);

    const handleReadOnlyChange = useCallback((e) => {
        setIsReadOnly(e.target.checked);
    }, []);

    const handleUserLimitChange = useCallback((e) => {
        const val = parseInt(e.target.value) || 0;
        setUserLimit(val);
        updateChannelRestriction({ user_limit: val });
    }, []);

    // İzinleri yükle
    useEffect(() => {
        if (activeTab === 'permissions') {
            loadPermissions();
        }
    }, [activeTab]);

    const loadPermissions = async () => {
        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/permissions/`);
            const data = await response.json();
            setPermissions(data);
        } catch (error) {
            console.error('❌ İzinler yüklenemedi:', error);
        }
    };

    const handleSave = async () => {
        try {
            // 1. İsim Değişikliği
            if (name !== room.name) {
                await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                    method: 'POST',
                    body: JSON.stringify({ action: 'rename', name })
                });
            }

            // 2. Rol Bazlı Erişim
            if (isPrivate) {
                await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'update_roles',
                        allowed_roles: selectedRoles
                    })
                });
            }

            // 3. 🔥 YENİ: Tüm Kanal Ayarları (NSFW, Locked, Read-Only, etc.)
            await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'update_settings',
                    is_private: isPrivate,
                    is_nsfw: isNsfw,
                    is_locked: isLocked,
                    admin_only_chat: isReadOnly,
                    user_limit: isVoiceChannel ? userLimit : null,
                    bitrate: isVoiceChannel ? bitrate : null
                })
            });

            // ✅ Ayarlar kaydedildi - alert kaldırıldı
            onClose();
        } catch (e) {
            console.error("❌ Ayarlar kaydedilemedi:", e);
            toast.error("❌ Hata oluştu.");
        }
    };

    const handleDelete = async () => {
        if (!await confirmDialog("Bu kanalı kalıcı olarak silmek istiyor musun?")) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                method: 'POST',
                body: JSON.stringify({ action: 'delete' })
            });
            onClose();
        } catch (e) { console.error(e); }
    };

    const toggleRole = (roleId) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles(prev => prev.filter(id => id !== roleId));
        } else {
            setSelectedRoles(prev => [...prev, roleId]);
        }
    };

    const addPermission = async () => {
        // 🔥 ROL veya USER kontrolü
        if (permissionType === 'role' && !selectedRoleForPerm) {
            toast.error('❌ Lütfen bir rol seçin!');
            return;
        }
        if (permissionType === 'user' && !selectedUserForPerm) {
            toast.error('❌ Lütfen bir kullanıcı seçin!');
            return;
        }

        try {
            const body = {
                room_id: room.id,
                permissions: {
                    can_view: true,
                    can_send_messages: true,
                    can_read_history: true,
                    can_connect: true,
                    can_speak: true,
                    can_video: true
                }
            };

            // Rol veya user ID'sini ekle
            if (permissionType === 'role') {
                body.role_id = selectedRoleForPerm;
            } else {
                body.user_id = selectedUserForPerm;
            }

            await fetchWithAuth(`${apiBaseUrl}/channels/permissions/add/`, {
                method: 'POST',
                body: JSON.stringify(body)
            });

            setShowAddPermission(false);
            setSelectedRoleForPerm(null);
            setSelectedUserForPerm(null); // 🔥 YENİ: User seçimini sıfırla
            setSearchUser(''); // 🔥 YENİ: Arama kutusunu temizle
            setSearchResults([]); // 🔥 YENİ: Arama sonuçlarını temizle
            loadPermissions();
            // ✅ İzin eklendi - alert kaldırıldı
        } catch (error) {
            console.error('❌ İzin eklenemedi:', error);
            toast.error('❌ İzin eklenemedi! Hata: ' + (error.message || 'Bilinmeyen hata'));
        }
    };

    // 🔥 YENİ: Kullanıcı arama fonksiyonu
    const searchUsers = async (query) => {
        if (!query || query.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetchWithAuth(`${apiBaseUrl}/users/search/?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setSearchResults(data.users || data || []);
        } catch (error) {
            console.error('❌ Kullanıcı arama hatası:', error);
            setSearchResults([]);
        }
    };

    const removePermission = async (permId) => {
        if (!await confirmDialog('Bu izni kaldırmak istediğinizden emin misiniz?')) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/channels/permissions/${permId}/remove/`, {
                method: 'DELETE'
            });
            loadPermissions();
        } catch (error) {
            console.error('❌ İzin silinemedi:', error);
        }
    };

    const updateChannelRestriction = async (updates) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/restriction/`, {
                method: 'PATCH',
                body: JSON.stringify(updates)
            });
            // ✅ Kısıtlamalar güncellendi - alert kaldırıldı
        } catch (error) {
            console.error('❌ Kısıtlama güncellenemedi:', error);
            toast.error('❌ Hata oluştu!');
        }
    };

    const modalContent = (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                {/* HEADER - Profesyonel Görünüm */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <div style={styles.channelIcon}>
                            {isVoiceChannel ? '🔊' : '#'}
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.1em', color: '#fff' }}>{room.name}</h3>
                            <span style={{ fontSize: '0.8em', color: '#72767d' }}>
                                {isVoiceChannel ? 'Ses Kanalı' : 'Metin Kanalı'} Ayarları
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                {/* 🔥 TAB NAVIGATION - Daha Fazla Tab */}
                <div style={styles.tabs}>
                    <button
                        style={activeTab === 'general' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('general')}
                    >
                        <FaCog /> Genel
                    </button>
                    <button
                        style={activeTab === 'permissions' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('permissions')}
                    >
                        <FaShieldAlt /> İzinler
                    </button>
                    <button
                        style={activeTab === 'integrations' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('integrations')}
                    >
                        <FaLink /> Entegrasyonlar
                    </button>
                    <button
                        style={activeTab === 'advanced' ? styles.tabActive : styles.tab}
                        onClick={() => setActiveTab('advanced')}
                    >
                        <FaHistory /> Gelişmiş
                    </button>
                </div>

                <div style={styles.body}>
                    {activeTab === 'general' && (
                        <GeneralTab
                            name={name} setName={setName}
                            isPrivate={isPrivate} handlePrivateChange={handlePrivateChange}
                            isNsfw={isNsfw} handleNsfwChange={handleNsfwChange}
                            isLocked={isLocked} handleLockedChange={handleLockedChange}
                            isReadOnly={isReadOnly} handleReadOnlyChange={handleReadOnlyChange}
                            isVoiceChannel={isVoiceChannel}
                            userLimit={userLimit} handleUserLimitChange={handleUserLimitChange}
                            bitrate={bitrate} setBitrate={setBitrate}
                            selectedRoles={selectedRoles} toggleRole={toggleRole}
                            serverRoles={serverRoles}
                            handleDelete={handleDelete} handleSave={handleSave}
                        />
                    )}

                    {activeTab === 'permissions' && (
                        <PermissionsTab
                            permissions={permissions}
                            showAddPermission={showAddPermission} setShowAddPermission={setShowAddPermission}
                            permissionType={permissionType} setPermissionType={setPermissionType}
                            selectedRoleForPerm={selectedRoleForPerm} setSelectedRoleForPerm={setSelectedRoleForPerm}
                            selectedUserForPerm={selectedUserForPerm} setSelectedUserForPerm={setSelectedUserForPerm}
                            searchUser={searchUser} setSearchUser={setSearchUser}
                            searchResults={searchResults} setSearchResults={setSearchResults}
                            searchUsers={searchUsers}
                            removePermission={removePermission}
                            addPermission={addPermission}
                        />
                    )}

                    {activeTab === 'integrations' && (
                        <IntegrationsTab
                            room={room}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={apiBaseUrl}
                            notificationPref={notificationPref} setNotificationPref={setNotificationPref}
                        />
                    )}

                    {activeTab === 'advanced' && (
                        <AdvancedTab
                            room={room}
                            serverRoles={serverRoles}
                            deleteHistoryDays={deleteHistoryDays} setDeleteHistoryDays={setDeleteHistoryDays}
                            fetchWithAuth={fetchWithAuth}
                            apiBaseUrl={apiBaseUrl}
                            updateChannelRestriction={updateChannelRestriction}
                            handleDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </div>
    );

    // 🔥 Portal ile document.body'ye render et (positioning sorununu çözer)
    return ReactDOM.createPortal(modalContent, document.body);
};

export default ChannelSettingsModal;

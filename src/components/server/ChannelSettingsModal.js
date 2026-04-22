// frontend/src/components/ChannelSettingsModal.js
// 🔥 FULL PAWSCORD CHANNEL SETTINGS WITH ADVANCED PERMISSIONS

import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FaTimes, FaCog, FaShieldAlt, FaLink, FaHistory } from 'react-icons/fa';
import toast from '../../utils/toast';
import confirmDialog from '../../utils/confirmDialog';
import useModalA11y from '../../hooks/useModalA11y';
import styles from '../ChannelSettingsModal/styles';
import GeneralTab from '../ChannelSettingsModal/GeneralTab';
import PermissionsTab from '../ChannelSettingsModal/PermissionsTab';
import IntegrationsTab from '../ChannelSettingsModal/IntegrationsTab';
import AdvancedTab from '../ChannelSettingsModal/AdvancedTab';
import logger from '../../utils/logger';

const ChannelSettingsModal = ({ room, serverRoles, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: t('settings.channelSettings'),
    });
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

    // 🔒 Advanced İzinler
    const [permissions, setPermissions] = useState({
        role_permissions: [],
        user_permissions: [],
        available_roles: [],
        available_users: [],
    });
    const [showAddPermission, setShowAddPermission] = useState(false);
    const [permissionType, setPermissionType] = useState('role'); // 'role' or 'user'
    const [selectedRoleForThum, setSelectedRoleForThum] = useState(null);
    const [selectedUserForThum, setSelectedUserForThum] = useState(null); // 🔥 YENİ: Seçilen kullanıcı
    const [searchUser, setSearchUser] = useState('');
    const [searchResults, setSearchResults] = useState([]); // 🔥 YENİ: Search resultları
    const [notificationPref, setNotificationPref] = useState('all'); // 🔥 YENİ: Reportim tercihi
    const [deleteHistoryDays, setDeleteHistoryDays] = useState('7'); // 🔥 YENİ: Mesaj geçmişi deleteme süresi

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

    // İzinleri upload
    useEffect(() => {
        if (activeTab === 'permissions') {
            loadPermissions();
        }
    }, [activeTab]);

    const loadPermissions = async () => {
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/channels/${room.slug}/permissions/`
            );
            const data = await response.json();
            setPermissions(data);
        } catch (error) {
            logger.error('❌ Permissions could not be loaded:', error);
        }
    };

    const handleSave = async () => {
        try {
            // 1. Name Değişikliği
            if (name !== room.name) {
                await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                    method: 'POST',
                    body: JSON.stringify({ action: 'rename', name }),
                });
            }

            // 2. Role Bazlı Erişim
            if (isPrivate) {
                await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'update_roles',
                        allowed_roles: selectedRoles,
                    }),
                });
            }

            // 3. 🔥 YENİ: Tüm Channel Settings (NSFW, Locked, Read-Only, etc.)
            await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'update_settings',
                    is_private: isPrivate,
                    is_nsfw: isNsfw,
                    is_locked: isLocked,
                    admin_only_chat: isReadOnly,
                    user_limit: isVoiceChannel ? userLimit : null,
                    bitrate: isVoiceChannel ? bitrate : null,
                }),
            });

            // ✅ Settings saved - alert removed
            onClose();
        } catch (e) {
            logger.error('❌ Settings could not be saved:', e);
            toast.error('❌ An error occurred.');
        }
    };

    const handleDelete = async () => {
        if (!(await confirmDialog(t('panels.confirmDelete')))) return;
        try {
            await fetchWithAuth(`${apiBaseUrl}/rooms/${room.slug}/settings/`, {
                method: 'POST',
                body: JSON.stringify({ action: 'delete' }),
            });
            onClose();
        } catch (e) {
            logger.error(e);
        }
    };

    const toggleRole = (roleId) => {
        if (selectedRoles.includes(roleId)) {
            setSelectedRoles((prev) => prev.filter((id) => id !== roleId));
        } else {
            setSelectedRoles((prev) => [...prev, roleId]);
        }
    };

    const addPermission = async () => {
        // 🔥 ROL or USER kontrolü
        if (permissionType === 'role' && !selectedRoleForThum) {
            toast.error(t('ui.please_select_a_role'));
            return;
        }
        if (permissionType === 'user' && !selectedUserForThum) {
            toast.error(t('ui.please_select_a_user_2'));
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
                    can_video: true,
                },
            };

            // Role or user ID'sini add
            if (permissionType === 'role') {
                body.role_id = selectedRoleForThum;
            } else {
                body.user_id = selectedUserForThum;
            }

            await fetchWithAuth(`${apiBaseUrl}/channels/permissions/add/`, {
                method: 'POST',
                body: JSON.stringify(body),
            });

            setShowAddPermission(false);
            setSelectedRoleForThum(null);
            setSelectedUserForThum(null); // 🔥 YENİ: User seçimini sıfırla
            setSearchUser(''); // 🔥 YENİ: Search kutusunu temizle
            setSearchResults([]); // 🔥 YENİ: Search resultlarını temizle
            loadPermissions();
            // ✅ İzin added - alert removed
        } catch (error) {
            logger.error('❌ Permission could not be added:', error);
            toast.error(
                t('channelPerms.addFailed', { error: error.message || t('common.unknownError') })
            );
        }
    };

    // 🔥 YENİ: User search fonksiyonu
    const searchUsers = async (query) => {
        if (!query || query.length < 2) {
            setSearchResults([]);
            return;
        }

        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/users/search/?q=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            setSearchResults(data.users || data || []);
        } catch (error) {
            logger.error(t('ui.user_search_hatasi'), error);
            setSearchResults([]);
        }
    };

    const removePermission = async (permId) => {
        if (!(await confirmDialog(t('panels.confirmDelete')))) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/channels/permissions/${permId}/remove/`, {
                method: 'DELETE',
            });
            loadPermissions();
        } catch (error) {
            logger.error('❌ Permission could not be deleted:', error);
        }
    };

    const updateChannelRestriction = async (updates) => {
        try {
            await fetchWithAuth(`${apiBaseUrl}/channels/${room.slug}/restriction/`, {
                method: 'PATCH',
                body: JSON.stringify(updates),
            });
            // ✅ Kısıtlamalar updated - alert removed
        } catch (error) {
            logger.error('❌ Restriction could not be updated:', error);
            toast.error(t('common.errorOccurred'));
        }
    };

    const modalContent = (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                {/* HEADER - Profesyonel Appearance */}
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <div style={styles.channelIcon}>{isVoiceChannel ? '🔊' : '#'}</div>
                        <div>
                            <h3 className="m0-fs11em">{room.name}</h3>
                            <span className="text-949-08em">
                                {isVoiceChannel ? t('ui.ses_channeli') : 'Text Channel'} Ayarları
                            </span>
                        </div>
                    </div>
                    <button aria-label={t('common.close', 'Close')} onClick={onClose} style={styles.closeBtn}>
                        <FaTimes />
                    </button>
                </div>

                {/* 🔥 TAB NAVIGATION - Daha Fazla Tab */}
                <div style={styles.tabs}>
                    <button
                        aria-label={t('channel.generalTab', 'General settings')}>
                    </button>
                <button
                    aria-label={t('channel.permissionsTab', 'Permissions settings')}
                >
                    <FaShieldAlt /> {t('channel.permissions', 'Permissions')}
                </button>
                <button
                    aria-label={t('channel.integrationsTab', 'Integration settings')}
                    style={activeTab === 'integrations' ? styles.tabActive : styles.tab}
                    onClick={() => setActiveTab('integrations')}
                >
                    <FaLink /> {t('channel.integrations', 'Integrations')}
                </button>
                <button
                    aria-label={t('channel.advancedTab', 'Advanced settings')}
                    style={activeTab === 'advanced' ? styles.tabActive : styles.tab}
                    onClick={() => setActiveTab('advanced')}
                >
                    <FaHistory /> {t('common.advanced', 'Advanced')}
                </button>
            </div>

            <div style={styles.body}>
                {activeTab === 'general' && (
                    <GeneralTab
                        name={name}
                        setName={setName}
                        isPrivate={isPrivate}
                        handlePrivateChange={handlePrivateChange}
                        isNsfw={isNsfw}
                        handleNsfwChange={handleNsfwChange}
                        isLocked={isLocked}
                        handleLockedChange={handleLockedChange}
                        isReadOnly={isReadOnly}
                        handleReadOnlyChange={handleReadOnlyChange}
                        isVoiceChannel={isVoiceChannel}
                        userLimit={userLimit}
                        handleUserLimitChange={handleUserLimitChange}
                        bitrate={bitrate}
                        setBitrate={setBitrate}
                        selectedRoles={selectedRoles}
                        toggleRole={toggleRole}
                        serverRoles={serverRoles}
                        handleDelete={handleDelete}
                        handleSave={handleSave}
                    />
                )}

                {activeTab === 'permissions' && (
                    <PermissionsTab
                        permissions={permissions}
                        showAddPermission={showAddPermission}
                        setShowAddPermission={setShowAddPermission}
                        permissionType={permissionType}
                        setPermissionType={setPermissionType}
                        selectedRoleForThum={selectedRoleForThum}
                        setSelectedRoleForThum={setSelectedRoleForThum}
                        selectedUserForThum={selectedUserForThum}
                        setSelectedUserForThum={setSelectedUserForThum}
                        searchUser={searchUser}
                        setSearchUser={setSearchUser}
                        searchResults={searchResults}
                        setSearchResults={setSearchResults}
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
                        notificationPref={notificationPref}
                        setNotificationPref={setNotificationPref}
                    />
                )}

                {activeTab === 'advanced' && (
                    <AdvancedTab
                        room={room}
                        serverRoles={serverRoles}
                        deleteHistoryDays={deleteHistoryDays}
                        setDeleteHistoryDays={setDeleteHistoryDays}
                        fetchWithAuth={fetchWithAuth}
                        apiBaseUrl={apiBaseUrl}
                        updateChannelRestriction={updateChannelRestriction}
                        handleDelete={handleDelete}
                    />
                )}
            </div>
        </div>
        </div >
    );

// 🔥 Portal with document.body'ye render et (positioning sorununu zer)
return ReactDOM.createPortal(modalContent, document.body);
};

ChannelSettingsModal.propTypes = {
    room: PropTypes.string,
    serverRoles: PropTypes.array,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default ChannelSettingsModal;

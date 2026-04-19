import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../utils/toast';
import confirmDialog from '../utils/confirmDialog';
import logger from '../utils/logger';

const useServerActions = ({
    apiUrl,
    fetchWithAuth,
    servers,
    currentUsername,
    selectedServerId,
    setSelectedServerId,
    onWelcomeClick,
    onMoveServer,
}) => {
    const { t } = useTranslation();
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
        // Owner check - if owner, tell them to delete the server
        const server = servers.find((s) => s.id === serverId);
        if (server && server.owner_username === currentUsername) {
            toast.warning(t('server.ownerCannotLeave'), 7000);
            return;
        }

        // Styled modal with confirm
        setLeaveServerModal({ server, isOpen: true });
    };

    // Actual leave operation - called after modal confirmation
    const executeLeaveServer = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/leave/`, {
                method: 'POST',
            });

            if (res.ok) {
                const data = await res.json();

                // Return to main page
                setSelectedServerId('home');
                onWelcomeClick();

                // WebSocket sunucu listsini otomatik daycelleyecek
                toast.success(t('server.leftSuccess'));
            } else {
                const error = await res.json();
                const errorMessage = error.error || 'Error leaving server';
                logger.error('❌ Error leaving server:', errorMessage);
                toast.error(errorMessage);
            }
        } catch (error) {
            logger.error('❌ Error leaving server:', error);
            toast.error(t('server.leaveFailed'));
        }
    };

    // 🆕 SERVER ICON CHANGE
    const handleChangeServerIcon = async (serverId) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            // File size check (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.warning(t('server.fileTooLarge'));
                return;
            }

            const formData = new FormData();
            formData.append('icon', file);

            try {
                const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/icon/`, {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    const data = await res.json();
                    // WebSocket update will be sent, page will refresh automatically
                } else {
                    const error = await res.json();
                    toast.error(error.error || t('common.unknownError'));
                }
            } catch (error) {
                logger.error('❌ Icon upload error:', error);
                toast.error(t('server.iconUploadFailed'));
            }
        };

        input.click();
    };

    // 🆕 SERVER PRIVACY SETTING CHANGE
    const handleChangeServerPrivacy = async (serverId) => {
        const server = servers.find((s) => s.id === serverId);
        if (!server) return;

        const newPrivacy = !server.is_public;
        const message = newPrivacy
            ? 'Are you sure you want to make this server public? Anyone can discover and join it.'
            : 'Are you sure you want to make this server private? Only invited users can join.';

        if (!(await confirmDialog(message))) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/privacy/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_public: newPrivacy }),
            });

            if (res.ok) {
                const data = await res.json();
                // WebSocket update will be sent
            } else {
                const error = await res.json();
                toast.error(error.error || t('common.unknownError'));
            }
        } catch (error) {
            logger.error('❌ Privacy setting error:', error);
            toast.error(t('server.privacyFailed'));
        }
    };

    // 🆕 COPY INVITE LINK
    const handleCopyServerInvite = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/invites/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    server_id: serverId,
                    max_uses: 0,
                    expires_hours: 0,
                }),
            });

            if (res.ok) {
                const data = await res.json();

                // 🔥 FIX: Production URL belirleme
                const productionUrl =
                    import.meta.env.VITE_PRODUCTION_URL || 'https://www.pawscord.com';
                const isProduction =
                    import.meta.env.MODE === 'production' ||
                    window.location.hostname === 'pawscord.com' ||
                    window.location.hostname === 'www.pawscord.com';

                const baseUrl = isProduction ? productionUrl : window.location.origin;

                const inviteUrl = `${baseUrl}/#/invite/${data.code}`;

                await navigator.clipboard.writeText(inviteUrl);
                toast.success(t('server.inviteUrlCopied', { url: inviteUrl }), 4000);
            } else {
                const error = await res.json();
                logger.error('❌ Invite creation error:', error.error || 'Could not create invite');
                toast.error(error.error || t('invite.createFailed'));
            }
        } catch (error) {
            logger.error('❌ Copy invite error:', error);
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
                body: JSON.stringify({ name: serverName, is_public: !!serverPublic }),
            });
            if (res.ok) {
                toast.success(t('server.serverCreated', { name: serverName }));
            } else {
                const data = await res.json().catch(() => ({}));
                toast.error(data.error || 'Failed to create server.');
            }
        } catch (e) {
            toast.error(t('server.createConnectionError'));
        }
        setNewServerName('');
        setIsNewServerPublic(false);
    };

    const handleCreateCategory = async (e, serverId) => {
        e.preventDefault();
        if (!newCategoryName.trim()) return;
        await fetchWithAuth(`${apiUrl}/categories/create/`, {
            method: 'POST',
            body: JSON.stringify({ server_id: serverId, name: newCategoryName }),
        });
        setNewCategoryName('');
        setActiveServerIdForCategory(null);
    };

    const handleCreateRoom = async (e, categoryId) => {
        e.preventDefault();
        if (!newRoomName.trim()) return;
        await fetchWithAuth(`${apiUrl}/categories/${categoryId}/create_room/`, {
            method: 'POST',
            body: JSON.stringify({ name: newRoomName, channel_type: newRoomType }),
        });
        setNewRoomName('');
        setActiveCategoryIdForRoom(null);
    };

    const handleRenameCategory = async (e, catId) => {
        e.preventDefault();
        await fetchWithAuth(`${apiUrl}/categories/${catId}/rename/`, {
            method: 'POST',
            body: JSON.stringify({ new_name: editName }),
        });
        setEditingItemId(null);
    };

    const handleDeleteCategory = async (e, catId) => {
        e.stopPropagation();
        if (
            !(await confirmDialog(
                'Are you sure you want to delete this category? All rooms inside will also be deleted!'
            ))
        )
            return;
        await fetchWithAuth(`${apiUrl}/categories/${catId}/delete/`, { method: 'POST' });
    };

    const handleRenameRoom = async (e, slug) => {
        e.preventDefault();
        await fetchWithAuth(`${apiUrl}/rooms/${slug}/rename/`, {
            method: 'POST',
            body: JSON.stringify({ new_name: editName }),
        });
        setEditingItemId(null);
    };

    const handleDeleteRoom = async (e, slug) => {
        e.stopPropagation();
        if (!(await confirmDialog('Are you sure you want to delete this channel?'))) return;
        await fetchWithAuth(`${apiUrl}/rooms/${slug}/delete/`, { method: 'POST' });
    };

    // 🆕 SERVER ORDER CHANGE
    const handleMoveServer = (serverId, direction) => {
        if (onMoveServer) {
            onMoveServer(serverId, direction);
        }
    };

    // 🆕 MOVE USER TO ANOTHER CHANNEL
    const handleMoveUserToChannel = async (username, fromChannel, toChannel) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/voice/move_user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    from_channel: fromChannel,
                    to_channel: toChannel,
                }),
            });

            if (res.ok) {
                const data = await res.json();
            } else {
                const error = await res.json();
                logger.error(`❌ ${error.error || 'Could not move user'}`);
            }
        } catch (error) {
            logger.error('❌ User move error:', error);
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
                    channel: channel,
                }),
            });

            if (res.ok) {
                const data = await res.json();
            } else {
                const error = await res.json();
                logger.error(`❌ ${error.error || 'Could not kick user'}`);
            }
        } catch (error) {
            logger.error('❌ User kick error:', error);
        }
    };

    // --- DISCOVERY OPERATIONS ---
    const handleOpenDiscovery = async () => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/public/`);
            const data = await res.json();
            // Backend paginated response ({ results: [...] }) or plain array, both supported
            setPublicServers(Array.isArray(data) ? data : data.results || []);
        } catch (e) {
            logger.error('Could not load servers', e);
        }
    };

    const handleJoinServer = async (serverId) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/join/`, {
                method: 'POST',
            });
            if (res.ok) {
                toast.success(t('server.joinedSuccess'));
            }
        } catch (e) {
            logger.error('❌ Error joining server:', e);
        }
    };

    const handleJoinViaCode = async (code) => {
        if (!code.trim()) return;
        try {
            const res = await fetchWithAuth(`${apiUrl}/invites/join/`, {
                method: 'POST',
                body: JSON.stringify({ code }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(t('server.joinedNamed', { name: data.server_name }));
            } else {
                logger.error('❌ Error joining server:', data.error || 'Failed to join server.');
            }
        } catch (error) {
            logger.error('❌ Invite code error:', error);
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

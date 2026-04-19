import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../utils/toast';
import logger from '../utils/logger';
import confirmDialog from '../utils/confirmDialog';

const useDMActions = ({ apiUrl, fetchWithAuth, servers, onViewUserProfile }) => {
    const { t } = useTranslation();
    const [dmContextMenu, setDmContextMenu] = useState(null); // { x, y, conversation }
    const [inviteToServerModal, setInviteToServerModal] = useState(null); // { username: string, isOpen: boolean }

    // --- DM CLEAR / HIDE ---
    const handleClearDM = async (conversationId) => {
        if (!(await confirmDialog(t('dm.confirmClearAll')))) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiUrl}/conversations/${conversationId}/clear/`, {
                method: 'POST',
            });

            if (res.ok) {
                toast.success(t('dm.conversationCleared'));
            } else {
                const data = await res.json();
                toast.error(data.error || t('dm.couldNotClear'));
            }
        } catch (error) {
            logger.error('DM clear error:', error);
            toast.error(t('dm.connectionError'));
        }

        setDmContextMenu(null);
    };

    const handleHideDM = async (conversationId) => {
        if (!(await confirmDialog(t('dm.confirmHide')))) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiUrl}/conversations/${conversationId}/hide/`, {
                method: 'POST',
            });

            if (res.ok) {
                toast.success(t('dm.conversationHidden'));
            } else {
                const data = await res.json();
                toast.error(data.error || t('dm.couldNotHide'));
            }
        } catch (error) {
            logger.error('DM hide error:', error);
            toast.error(t('dm.connectionError'));
        }

        setDmContextMenu(null);
    };

    // --- DM CONTEXT MENU FUNCTIONS ---
    const handleViewProfile = (username) => {
        // 🔥 FIX: onViewUserProfile callback kullan
        if (onViewUserProfile) {
            onViewUserProfile(username);
        } else {
            toast.info(t('dm.cannotViewProfile', { username }));
        }
        setDmContextMenu(null);
    };

    const handleInviteToServer = (username) => {
        // 🔥 FIX: Open server selection modal
        if (!servers || servers.length === 0) {
            toast.error(t('dm.noServerToInvite'));
            setDmContextMenu(null);
            return;
        }
        setInviteToServerModal({ username, isOpen: true });
        setDmContextMenu(null);
    };

    const handleSendServerInvite = async (serverId, username) => {
        try {
            // Create server invite
            const res = await fetchWithAuth(`${apiUrl}/servers/${serverId}/invite/`, {
                method: 'POST',
                body: JSON.stringify({ target_username: username }),
            });

            if (res.ok) {
                const data = await res.json();
                toast.success(t('dm.inviteSent', { username }));
            } else {
                const data = await res.json();
                toast.error(data.error || t('dm.inviteFailed'));
            }
        } catch (error) {
            logger.error('❌ Invite error:', error);
            toast.error(t('dm.connectionError'));
        }
        setInviteToServerModal(null);
    };

    const handleMuteUser = async (username, conversationId) => {
        // 🔥 FIX: Mute user - localStorage + API
        try {
            const mutedUsers = JSON.parse(localStorage.getItem('mutedDMUsers') || '{}');

            if (mutedUsers[username]) {
                // Zaten sessiz, sesini open
                delete mutedUsers[username];
                localStorage.setItem('mutedDMUsers', JSON.stringify(mutedUsers));
                toast.success(t('dm.unmuted', { username }));
            } else {
                // Sessize al
                mutedUsers[username] = { timestamp: Date.now(), conversationId };
                localStorage.setItem('mutedDMUsers', JSON.stringify(mutedUsers));
                toast.success(t('dm.muted', { username }));
            }
        } catch (error) {
            logger.error('❌ Mute error:', error);
            toast.error(t('dm.muteError'));
        }
        setDmContextMenu(null);
    };

    const handlePinConversation = async (conversationId) => {
        // 🔥 FIX: Pin conversation - localStorage
        try {
            const pinnedConvs = JSON.parse(localStorage.getItem('pinnedConversations') || '[]');

            if (pinnedConvs.includes(conversationId)) {
                // Already pinned, unpin it
                const newPinned = pinnedConvs.filter((id) => id !== conversationId);
                localStorage.setItem('pinnedConversations', JSON.stringify(newPinned));
                toast.success(t('dm.unpinned'));
            } else {
                // Pin (max 5)
                if (pinnedConvs.length >= 5) {
                    toast.warning(t('dm.maxPinned'));
                } else {
                    pinnedConvs.push(conversationId);
                    localStorage.setItem('pinnedConversations', JSON.stringify(pinnedConvs));
                    toast.success(t('dm.pinned'));
                }
            }
        } catch (error) {
            logger.error('❌ Pin error:', error);
            toast.error(t('dm.pinError'));
        }
        setDmContextMenu(null);
    };

    const handleBlockUser = async (username) => {
        if (!(await confirmDialog(t('dm.confirmBlock', { username })))) {
            return;
        }

        try {
            const res = await fetchWithAuth(`${apiUrl}/blocks/block/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });

            if (res.ok) {
                toast.success(t('dm.blocked', { username }));
                // WebSocket otomatik daycelleyecek
            } else {
                toast.error(t('dm.blockFailed'));
            }
        } catch (error) {
            logger.error('❌ Block error:', error);
            toast.error(t('dm.connectionError'));
        }

        setDmContextMenu(null);
    };

    // 🔥 NEW: ADD FRIEND
    const handleAddFriend = async (username) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/friends/send/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });

            if (res.ok) {
                // 🔥 NEW: Show notification
                if (window.Notification && Notification.permission === 'granted') {
                    new Notification(t('dm.friendRequestSent'), {
                        body: t('dm.friendRequestSentBody', { username }),
                        icon: '/logo192.png',
                    });
                }
            } else {
                const error = await res.json();
                logger.error(`❌ Friend request error: ${error.error || t('common.unknownError')}`);
            }
        } catch (error) {
            logger.error('❌ Add friend error:', error);
        }
    };

    // 🔥 NEW: REMOVE FRIEND
    const handleRemoveFriend = async (username) => {
        try {
            const res = await fetchWithAuth(`${apiUrl}/friends/remove/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username }),
            });

            if (res.ok) {
                // Show notification
                if (window.Notification && Notification.permission === 'granted') {
                    new Notification(t('dm.friendRemoved'), {
                        body: t('dm.friendRemovedBody', { username }),
                        icon: '/logo192.png',
                    });
                }
            } else {
                const error = await res.json();
                logger.error(`❌ Remove friend error: ${error.error || t('common.unknownError')}`);
            }
        } catch (error) {
            logger.error('❌ Remove friend error:', error);
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

import { getToken } from '../utils/tokenStorage';
// frontend/src/VoiceChatPanel/useVoiceInteractions.js
// 🎯 Voice chat interaction handlers (context menu actions)

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import toast from '../utils/toast';
import logger from '../utils/logger';
import { API_BASE_URL } from '../utils/apiEndpoints';

const useVoiceInteractions = ({ setContextMenu, setVolumeSettings, setRemoteVolume }) => {
    const { t } = useTranslation();
    const handleSendMessage = useCallback(async (targetUser) => {
        window.location.hash = `#/dm/${targetUser.username}`;
    }, []);

    const handleAddFriend = useCallback(async (targetUser) => {
        try {
            const response = await fetch(`${API_BASE_URL}/friends/send/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ username: targetUser.username }),
            });
            if (response.ok) {
                toast.success(t('dm.inviteSent', { username: targetUser.username }));
            } else {
                toast.error(t('dm.inviteFailed'));
            }
        } catch (error) {
            logger.error('Friend request error:', error);
            toast.error(t('bot.error'));
        }
    }, []);

    const handleBlock = useCallback(async (targetUser) => {
        try {
            const response = await fetch(`${API_BASE_URL}/blocks/block/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                body: JSON.stringify({ username: targetUser.username }),
            });
            if (response.ok) {
                toast.success(t('voiceInteractions.blocked', { user: targetUser.username }));
            } else {
                toast.error(t('voiceInteractions.blockFailed'));
            }
        } catch (error) {
            logger.error('Block error:', error);
            toast.error(t('common.error'));
        }
    }, []);

    const handleViewProfile = useCallback(
        (targetUser) => {
            setContextMenu(null);
            // 🔥 Profil panelini open
            if (window.openUserProfile) {
                window.openUserProfile(targetUser.username);
            } else {
                // Fallback - profile pagesına git
                window.location.hash = `#/profile/${targetUser.username}`;
            }
        },
        [setContextMenu]
    );

    const handleMuteUser = useCallback(
        (targetUser) => {
            setVolumeSettings((prev) => ({
                ...prev,
                [targetUser.username]: {
                    ...prev[targetUser.username],
                    isMuted: !prev[targetUser.username]?.isMuted,
                },
            }));
        },
        [setVolumeSettings]
    );

    const handleAdjustVolume = useCallback(
        (targetUser, newVolume) => {
            const volume = Math.max(0, Math.min(200, newVolume)); // 0-200% range

            setVolumeSettings((prev) => ({
                ...prev,
                [targetUser.username]: {
                    ...prev[targetUser.username],
                    volume: volume,
                },
            }));

            // 🔥 FIX: Route through VoiceContext remoteVolumes state → VoiceAudioController
            // This ensures the SINGLE AudioPlayer per user handles volume (with GainNode for >100%).
            // Previously, this directly manipulated DOM audio elements, causing double-audio volume jumps.
            if (setRemoteVolume) {
                setRemoteVolume(targetUser.username, volume);
            }
        },
        [setVolumeSettings, setRemoteVolume]
    );

    return {
        handleSendMessage,
        handleAddFriend,
        handleBlock,
        handleViewProfile,
        handleMuteUser,
        handleAdjustVolume,
    };
};

export default useVoiceInteractions;

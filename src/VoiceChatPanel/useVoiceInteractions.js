// frontend/src/VoiceChatPanel/useVoiceInteractions.js
// 🎯 Voice chat interaction handlers (context menu actions)

import { useCallback } from 'react';
import toast from '../utils/toast';

const useVoiceInteractions = ({ setContextMenu, setVolumeSettings, setRemoteVolume }) => {
    const handleSendMessage = useCallback(async (targetUser) => {
        window.location.hash = `#/dm/${targetUser.username}`;
    }, []);

    const handleAddFriend = useCallback(async (targetUser) => {
        try {
            const response = await fetch(`/api/friends/send_request/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({ username: targetUser.username })
            });
            if (response.ok) {
                toast.success(`✅ ${targetUser.username} kullanıcısına arkadaşlık isteği gönderildi!`);
            } else {
                toast.error('❌ Arkadaşlık isteği gönderilemedi');
            }
        } catch (error) {
            console.error('Friend request error:', error);
            toast.error('❌ Bir hata oluştu');
        }
    }, []);

    const handleBlock = useCallback(async (targetUser) => {
        try {
            const response = await fetch(`/api/users/block/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify({ username: targetUser.username })
            });
            if (response.ok) {
                toast.success(`✅ ${targetUser.username} engellendi!`);
            } else {
                toast.error('❌ Engelleme işlemi başarısız');
            }
        } catch (error) {
            console.error('Block error:', error);
            toast.error('❌ Bir hata oluştu');
        }
    }, []);

    const handleViewProfile = useCallback((targetUser) => {
        setContextMenu(null);
        // 🔥 Profil panelini aç
        if (window.openUserProfile) {
            window.openUserProfile(targetUser.username);
        } else {
            // Fallback - profil sayfasına git
            window.location.hash = `#/profile/${targetUser.username}`;
        }
    }, [setContextMenu]);

    const handleMuteUser = useCallback((targetUser) => {
        setVolumeSettings(prev => ({
            ...prev,
            [targetUser.username]: {
                ...prev[targetUser.username],
                isMuted: !prev[targetUser.username]?.isMuted
            }
        }));
    }, [setVolumeSettings]);

    const handleAdjustVolume = useCallback((targetUser, newVolume) => {
        const volume = Math.max(0, Math.min(200, newVolume)); // 0-200% range

        setVolumeSettings(prev => ({
            ...prev,
            [targetUser.username]: {
                ...prev[targetUser.username],
                volume: volume
            }
        }));

        // 🔥 FIX: Route through VoiceContext remoteVolumes state → VoiceAudioController
        // This ensures the SINGLE AudioPlayer per user handles volume (with GainNode for >100%).
        // Previously, this directly manipulated DOM audio elements, causing double-audio volume jumps.
        if (setRemoteVolume) {
            setRemoteVolume(targetUser.username, volume);
        }
    }, [setVolumeSettings, setRemoteVolume]);

    return {
        handleSendMessage,
        handleAddFriend,
        handleBlock,
        handleViewProfile,
        handleMuteUser,
        handleAdjustVolume
    };
};

export default useVoiceInteractions;

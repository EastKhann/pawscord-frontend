// frontend/src/VoiceChatPanel/useVoiceInteractions.js
// 🎯 Voice chat interaction handlers (context menu actions)

import { useCallback } from 'react';
import toast from '../utils/toast';

const useVoiceInteractions = ({ setContextMenu, setVolumeSettings }) => {
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

        // 🔥 İYİLEŞTİRME: Audio element'e anında uygula (GainNode ile >100% destek)
        const audioElements = document.querySelectorAll(`audio[data-username="${targetUser.username}"]`);
        audioElements.forEach(audio => {
            if (volume <= 100) {
                // Normal range — use native volume
                audio.volume = volume / 100;
                // Disconnect any existing GainNode
                if (audio._gainNode) {
                    try { audio._gainNode.gain.value = 1; } catch (e) { /* */ }
                }
            } else {
                // >100% — use Web Audio API GainNode for amplification
                audio.volume = 1.0; // Max native volume
                try {
                    if (!audio._audioContext) {
                        audio._audioContext = new (window.AudioContext || window.webkitAudioContext)();
                        audio._sourceNode = audio._audioContext.createMediaElementSource(audio);
                        audio._gainNode = audio._audioContext.createGain();
                        audio._sourceNode.connect(audio._gainNode);
                        audio._gainNode.connect(audio._audioContext.destination);
                    }
                    audio._gainNode.gain.value = volume / 100; // e.g., 1.5 for 150%, 2.0 for 200%
                } catch (e) {
                    console.warn('[Volume] GainNode amplification failed:', e);
                }
            }
        });
    }, [setVolumeSettings]);

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

// frontend/src/VoiceChatPanel/useVoiceChatState.js
// 🔥 Combined state hook: combinedUsers, getUserAvatar, allStreams

import { useMemo, useCallback } from 'react';
import { PRODUCTION_URL } from '../utils/constants';
import { getDeterministicAvatarFallback, getFullResolutionAvatar } from './avatarUtils';

const useVoiceChatState = ({
    connectedUsers, currentUser,
    isMuted, isCameraOn, isScreenSharing, isTalking,
    currentUserProfile, getRealUserAvatar, allUsers,
    remoteStreams, localCameraStream, localScreenStream,
}) => {
    // 🔥 Combine local and remote users
    const combinedUsers = useMemo(() => {
        const users = [...connectedUsers];
        if (currentUser && !users.some(u => u.username === currentUser.username)) {
            users.push({
                username: currentUser.username,
                isMuted, isCameraOn, isScreenSharing, isTalking,
                isLocal: true
            });
        } else if (currentUser) {
            const index = users.findIndex(u => u.username === currentUser.username);
            if (index >= 0) {
                users[index] = {
                    ...users[index],
                    isMuted, isCameraOn, isScreenSharing, isTalking,
                    isLocal: true
                };
            }
        }
        return users;
    }, [connectedUsers, currentUser, isMuted, isCameraOn, isScreenSharing]);
    // 🔥 PERFORMANS: isTalking çıkarıldı! Her 150ms re-render engellenecek

    // 🔥 Full-resolution avatar resolver
    const getUserAvatar = useCallback((username) => {
        let avatarUrl = null;

        // 1. currentUserProfile (own avatar)
        if (currentUserProfile && username === currentUser?.username) {
            if (currentUserProfile.avatar && typeof currentUserProfile.avatar === 'string') {
                if (currentUserProfile.avatar.startsWith('http') || currentUserProfile.avatar.startsWith('blob:')) {
                    avatarUrl = currentUserProfile.avatar;
                } else {
                    avatarUrl = `${PRODUCTION_URL}${currentUserProfile.avatar.startsWith('/') ? '' : '/'}${currentUserProfile.avatar}`;
                }
            }
        }

        // 2. getRealUserAvatar prop
        if (!avatarUrl && getRealUserAvatar) {
            avatarUrl = getRealUserAvatar(username);
        }

        // 3. allUsers list
        if (!avatarUrl) {
            const userFromList = allUsers.find(u => u.username === username);
            if (userFromList?.avatar && typeof userFromList.avatar === 'string') {
                if (userFromList.avatar.startsWith('http') || userFromList.avatar.startsWith('blob:')) {
                    avatarUrl = userFromList.avatar;
                } else {
                    avatarUrl = `${PRODUCTION_URL}${userFromList.avatar.startsWith('/') ? '' : '/'}${userFromList.avatar}`;
                }
            }
        }

        // 4. Full-resolution version
        if (avatarUrl) return getFullResolutionAvatar(avatarUrl);

        // 5. Deterministic fallback
        return getDeterministicAvatarFallback(username, 256);
    }, [currentUserProfile, currentUser, getRealUserAvatar, allUsers]);

    // 🔥 Merge local + remote streams
    const allStreams = useMemo(() => {
        const streams = { ...remoteStreams };
        if (currentUser?.username) {
            if (localCameraStream) streams[`${currentUser.username}_camera`] = localCameraStream;
            if (localScreenStream) streams[`${currentUser.username}_screen`] = localScreenStream;
        }
        return streams;
    }, [remoteStreams, currentUser, localCameraStream, localScreenStream]);

    return { combinedUsers, getUserAvatar, allStreams };
};

export default useVoiceChatState;

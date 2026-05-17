// frontend/src/hooks/useVoicePermissions.js

/**
 * 🔐 Voice Channel Permission Hook
 * Check if user can join a voice channel based on roles and permissions
 */

import { useState, useCallback } from 'react';
import logger from '../utils/logger';

interface ChannelPermissionData {
    isPrivate?: boolean;
    deniedUsers?: (string | number)[];
    allowedUsers?: (string | number)[];
    allowedRoles?: (string | number)[];
    maxUsers?: number;
    [key: string]: unknown;
}

interface ChannelLike {
    id: string | number;
    [key: string]: unknown;
}

interface UserLike {
    id: string | number;
    [key: string]: unknown;
}

export const useVoicePermissions = (
    apiBaseUrl: string,
    fetchWithAuth: (url: string) => Promise<Response>
) => {
    const [channelPermissions, setChannelPermissions] = useState<Record<string | number, ChannelPermissionData>>({});
    const [loading, setLoading] = useState(false);

    const loadChannelPermissions = useCallback(
        async (channelId: string | number) => {
            if (!channelId) return null;

            if (channelPermissions[channelId]) {
                return channelPermissions[channelId];
            }

            setLoading(true);
            try {
                const response = await fetchWithAuth(
                    `${apiBaseUrl}/channels/${channelId}/permissions/`
                );

                if (response.ok) {
                    const data = await response.json() as ChannelPermissionData;
                    setChannelPermissions((prev) => ({
                        ...prev,
                        [channelId]: data,
                    }));
                    return data;
                }
            } catch (error) {
                logger.error('Failed to load permissions:', error);
            } finally {
                setLoading(false);
            }

            return null;
        },
        [channelPermissions, apiBaseUrl, fetchWithAuth]
    );

    const canJoinVoiceChannel = useCallback(
        (channel: ChannelLike, user: UserLike, userRoles: (string | number)[] = []): boolean => {
            if (!channel || !user) return false;

            const perms = channelPermissions[channel.id];

            if (!perms || !perms.isPrivate) {
                return true;
            }

            if (perms.deniedUsers?.includes(user.id)) {
                return false;
            }

            if (perms.allowedUsers?.includes(user.id)) {
                return true;
            }

            const hasAllowedRole = userRoles.some((roleId) => perms.allowedRoles?.includes(roleId));

            return hasAllowedRole;
        },
        [channelPermissions]
    );

    const isChannelFull = useCallback(
        (channel: ChannelLike, currentUserCount = 0): boolean => {
            const perms = channelPermissions[channel.id];

            if (!perms || !perms.maxUsers) {
                return false;
            }

            return currentUserCount >= perms.maxUsers;
        },
        [channelPermissions]
    );

    const getJoinError = useCallback(
        (channel: ChannelLike, user: UserLike, userRoles: (string | number)[] = [], currentUserCount = 0): string | null => {
            if (!canJoinVoiceChannel(channel, user, userRoles)) {
                const perms = channelPermissions[channel.id];

                if (perms?.deniedUsers?.includes(user.id)) {
                    return 'You are banned from this channel';
                }

                if (perms?.isPrivate) {
                    return 'You do not have permission to enter this channel';
                }

                return 'Bu kanala giremezsiniz';
            }

            if (isChannelFull(channel, currentUserCount)) {
                return `Channel is full (${channelPermissions[channel.id].maxUsers} people)`;
            }

            return null;
        },
        [canJoinVoiceChannel, isChannelFull, channelPermissions]
    );

    const clearChannelCache = useCallback((channelId: string | number) => {
        setChannelPermissions((prev) => {
            const updated = { ...prev };
            delete updated[channelId];
            return updated;
        });
    }, []);

    const clearAllCache = useCallback(() => {
        setChannelPermissions({});
    }, []);

    return {
        loadChannelPermissions,
        canJoinVoiceChannel,
        isChannelFull,
        getJoinError,
        clearChannelCache,
        clearAllCache,
        loading,
    };
};

export default useVoicePermissions;

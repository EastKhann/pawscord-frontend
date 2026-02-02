// frontend/src/hooks/useVoicePermissions.js

/**
 * 🔐 Voice Channel Permission Hook
 * Check if user can join a voice channel based on roles and permissions
 */

import { useState, useEffect, useCallback } from 'react';

export const useVoicePermissions = (apiBaseUrl, fetchWithAuth) => {
    const [channelPermissions, setChannelPermissions] = useState({});
    const [loading, setLoading] = useState(false);

    // Load permissions for a channel
    const loadChannelPermissions = useCallback(async (channelId) => {
        if (!channelId) return null;

        // Check cache
        if (channelPermissions[channelId]) {
            return channelPermissions[channelId];
        }

        setLoading(true);
        try {
            const response = await fetchWithAuth(
                `${apiBaseUrl}/channels/${channelId}/permissions/`
            );

            if (response.ok) {
                const data = await response.json();
                setChannelPermissions(prev => ({
                    ...prev,
                    [channelId]: data
                }));
                return data;
            }
        } catch (error) {
            console.error('Failed to load permissions:', error);
        } finally {
            setLoading(false);
        }

        return null;
    }, [channelPermissions, apiBaseUrl, fetchWithAuth]);

    // Check if user can join a voice channel
    const canJoinVoiceChannel = useCallback((channel, user, userRoles = []) => {
        if (!channel || !user) return false;

        const perms = channelPermissions[channel.id];

        // If no permissions set or channel is public, everyone can join
        if (!perms || !perms.isPrivate) {
            return true;
        }

        // Check if user is explicitly denied
        if (perms.deniedUsers?.includes(user.id)) {
            return false;
        }

        // Check if user is explicitly allowed
        if (perms.allowedUsers?.includes(user.id)) {
            return true;
        }

        // Check if any of user's roles are allowed
        const hasAllowedRole = userRoles.some(roleId =>
            perms.allowedRoles?.includes(roleId)
        );

        return hasAllowedRole;
    }, [channelPermissions]);

    // Check if channel is full
    const isChannelFull = useCallback((channel, currentUserCount = 0) => {
        const perms = channelPermissions[channel.id];

        if (!perms || !perms.maxUsers) {
            return false; // No limit
        }

        return currentUserCount >= perms.maxUsers;
    }, [channelPermissions]);

    // Get join error message
    const getJoinError = useCallback((channel, user, userRoles = [], currentUserCount = 0) => {
        if (!canJoinVoiceChannel(channel, user, userRoles)) {
            const perms = channelPermissions[channel.id];

            if (perms?.deniedUsers?.includes(user.id)) {
                return 'Bu kanala girmeniz yasaklanmış';
            }

            if (perms?.isPrivate) {
                return 'Bu kanala giriş izniniz yok';
            }

            return 'Bu kanala giremezsiniz';
        }

        if (isChannelFull(channel, currentUserCount)) {
            return `Kanal dolu (${channelPermissions[channel.id].maxUsers} kişi)`;
        }

        return null;
    }, [canJoinVoiceChannel, isChannelFull, channelPermissions]);

    // Clear cache for a channel
    const clearChannelCache = useCallback((channelId) => {
        setChannelPermissions(prev => {
            const updated = { ...prev };
            delete updated[channelId];
            return updated;
        });
    }, []);

    // Clear all cache
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
        loading
    };
};

export default useVoicePermissions;



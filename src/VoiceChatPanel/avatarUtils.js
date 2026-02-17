// frontend/src/VoiceChatPanel/avatarUtils.js
// 🔥 Shared avatar helper utilities for VoiceChatPanel components

import SparkMD5 from 'spark-md5';

/**
 * Remove thumbnail suffixes from avatar URLs to get full resolution
 */
export const getFullResolutionAvatar = (avatarUrl) => {
    if (!avatarUrl) return null;
    return avatarUrl
        .replace(/_100x100\./gi, '.')
        .replace(/_150x150\./gi, '.')
        .replace(/_50x50\./gi, '.')
        .replace(/\?.*$/, '');
};

/**
 * Generate a deterministic avatar fallback URL based on username hash
 * @param {string} username - The username to generate avatar for
 * @param {number} size - Avatar size in pixels
 * @returns {string} Avatar URL from ui-avatars.com
 */
export const getDeterministicAvatarFallback = (username, size = 256) => {
    if (!username) return `https://ui-avatars.com/api/?name=User&background=5865f2&color=fff&bold=true&size=${size}`;
    const hash = SparkMD5.hash(username);
    const hue = parseInt(hash.substring(0, 8), 16) % 360;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${hue.toString(16).padStart(2, '0')}${((hue + 60) % 360).toString(16).padStart(2, '0')}${((hue + 120) % 360).toString(16).padStart(2, '0')}&color=fff&bold=true&size=${size}`;
};

import { getApiBase } from '../utils/apiEndpoints';
// frontend/src/utils/cdn.js
// 🌐 CDN (Content Delivery Network) Integration - ENHANCED VERSION

// ✅ Cloudflare R2 CDN Base URL
export const R2_CDN_URL = 'https://media.pawscord.com';
export const R2_ASSETS_URL = `${R2_CDN_URL}/assets`;
export const R2_AVATARS_URL = `${R2_CDN_URL}/avatars`;
export const R2_UPLOADS_URL = `${R2_CDN_URL}/uploads`;

// Logo URL (for consistent usage across the app)
export const LOGO_URL = `${R2_ASSETS_URL}/logo.png`;
export const LOGO_WEBP_URL = `${R2_ASSETS_URL}/logo.webp`;

// CDN configuration
const CDN_CONFIG = {
    enabled: import.meta.env.VITE_CDN_ENABLED === 'true',
    baseUrl: import.meta.env.VITE_CDN_URL || R2_CDN_URL,
    fallbackUrl: import.meta.env.VITE_BACKEND_URL || getApiBase().replace('/api', ''),
    optimizeImages: true
};

/**
 * Get optimized CDN URL for media files
 * @param {string} url - Original media URL
 * @param {object} options - Optimization options (width, height, quality, format)
 * @returns {string} - Optimized CDN URL
 */
export const getCDNUrl = (url, options = {}) => {
    if (!url) return '';

    // If already a full URL with CDN, return as-is
    if (url.includes(CDN_CONFIG.baseUrl)) {
        return url;
    }

    // If it's a full external URL, return as-is
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // Build CDN URL
    let cdnUrl = url;
    if (CDN_CONFIG.enabled) {
        // Remove leading slash
        const cleanPath = url.startsWith('/') ? url.substring(1) : url;
        cdnUrl = `${CDN_CONFIG.baseUrl}/${cleanPath}`;
    } else {
        // Fallback to backend
        cdnUrl = `${CDN_CONFIG.fallbackUrl}${url.startsWith('/') ? url : '/' + url}`;
    }

    // Image optimization parameters
    if (CDN_CONFIG.optimizeImages && isImageUrl(url)) {
        const params = buildImageParams(options);
        if (params) {
            cdnUrl += `?${params}`;
        }
    }

    return cdnUrl;
};

/**
 * Check if URL is an image
 */
const isImageUrl = (url) => {
    const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExts.some(ext => url.toLowerCase().includes(ext));
};

/**
 * Build image optimization parameters
 */
const buildImageParams = (options) => {
    const params = [];

    if (options.width) {
        params.push(`w=${options.width}`);
    }

    if (options.height) {
        params.push(`h=${options.height}`);
    }

    if (options.quality) {
        params.push(`q=${options.quality}`);
    }

    if (options.format) {
        params.push(`f=${options.format}`);
    }

    return params.join('&');
};

/**
 * Upload file to CDN via backend
 */
export const uploadToCDN = async (file, folder = 'uploads') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    try {
        const response = await fetch(`${CDN_CONFIG.fallbackUrl}/api/cdn/upload/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        return data.url; // CDN URL
    } catch (error) {
        console.error('CDN upload error:', error);
        throw error;
    }
};

/**
 * Delete file from CDN
 */
export const deleteFromCDN = async (fileUrl) => {
    try {
        const response = await fetch(`${CDN_CONFIG.fallbackUrl}/api/cdn/delete/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: fileUrl })
        });

        if (!response.ok) {
            throw new Error('Delete failed');
        }

        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('CDN delete error:', error);
        return false;
    }
};

/**
 * Get media file URL
 */
export const getMediaUrl = (mediaPath, options = {}) => {
    if (!mediaPath || typeof mediaPath !== 'string') return '';
    const path = mediaPath.startsWith('media/') ? mediaPath : `media/${mediaPath}`;
    return getCDNUrl(path, options);
};

/**
 * Get avatar URL with optimization
 */
export const getAvatarUrl = (avatarPath, size = 128) => {
    if (!avatarPath || typeof avatarPath !== 'string') return '/default-avatar.png';

    const path = avatarPath.startsWith('media/') ? avatarPath : `media/avatars/${avatarPath}`;

    return getCDNUrl(path, {
        width: size,
        height: size,
        quality: 90,
        format: 'webp'
    });
};

/**
 * Get file URL
 */
export const getFileUrl = (filePath) => {
    if (!filePath || typeof filePath !== 'string') return '';
    const path = filePath.startsWith('media/') ? filePath : `media/files/${filePath}`;
    return getCDNUrl(path);
};

/**
 * Get optimized image URL (Cloudflare Image Resizing)
 */
export const getOptimizedImageUrl = (imagePath, width, quality = 80) => {
    if (!imagePath) return '';
    if (!CDN_ENABLED) return getCDNUrl(imagePath);

    const baseUrl = getCDNUrl(imagePath);
    return `${baseUrl}?width=${width}&quality=${quality}&format=auto`;
};

/**
 * Get thumbnail URL
 */
export const getThumbnailUrl = (imagePath, size = 256) => {
    return getOptimizedImageUrl(imagePath, size, 75);
};

/**
 * Preload image
 */
export const preloadImage = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = reject;
        img.src = url;
    });
};

/**
 * Check if CDN is enabled
 */
export const isCDNEnabled = () => CDN_CONFIG.enabled;

/**
 * Get CDN status
 */
export const getCDNStatus = () => ({
    enabled: CDN_CONFIG.enabled,
    url: CDN_CONFIG.baseUrl,
    provider: import.meta.env.VITE_CDN_PROVIDER || 'cloudfront',
    optimizeImages: CDN_CONFIG.optimizeImages
});

export default {
    getCDNUrl,
    getMediaUrl,
    getAvatarUrl,
    getFileUrl,
    getOptimizedImageUrl,
    getThumbnailUrl,
    preloadImage,
    uploadToCDN,
    deleteFromCDN,
    isCDNEnabled,
    getCDNStatus,
    CDN_CONFIG
};





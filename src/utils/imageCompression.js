// frontend/src/utils/imageCompression.js

/**
 * 🖼️ Image Compression & WebP Conversion Utility
 * Automatically compress images before upload
 * Convert to WebP format for better compression
 */

/**
 * Compress image and convert to WebP
 * @param {File|Blob} file - Original image file
 * @param {Object} options - Compression options
 * @returns {Promise<Blob>} Compressed WebP blob
 */
export async function compressImage(file, options = {}) {
    const {
        maxWidth = 1920,
        maxHeight = 1080,
        quality = 0.85,
        convertToWebP = true,
        maintainAspectRatio = true
    } = options;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                try {
                    // Calculate new dimensions
                    let { width, height } = img;

                    if (maintainAspectRatio) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        if (ratio < 1) {
                            width *= ratio;
                            height *= ratio;
                        }
                    } else {
                        width = Math.min(width, maxWidth);
                        height = Math.min(height, maxHeight);
                    }

                    // Create canvas
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');

                    // Enable image smoothing for better quality
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';

                    // Draw image
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert to blob
                    const mimeType = convertToWebP ? 'image/webp' : file.type;

                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Failed to compress image'));
                        }
                    }, mimeType, quality);

                } catch (error) {
                    reject(error);
                }
            };

            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = e.target.result;
        };

        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

/**
 * Compress avatar image (smaller, square)
 * @param {File|Blob} file - Original avatar
 * @returns {Promise<Blob>} Compressed 512x512 WebP
 */
export async function compressAvatar(file) {
    return compressImage(file, {
        maxWidth: 512,
        maxHeight: 512,
        quality: 0.9,
        convertToWebP: true,
        maintainAspectRatio: false // Force square
    });
}

/**
 * Compress banner image (wide)
 * @param {File|Blob} file - Original banner
 * @returns {Promise<Blob>} Compressed 1920x480 WebP
 */
export async function compressBanner(file) {
    return compressImage(file, {
        maxWidth: 1920,
        maxHeight: 480,
        quality: 0.85,
        convertToWebP: true,
        maintainAspectRatio: true
    });
}

/**
 * Compress chat image/attachment
 * @param {File|Blob} file - Original image
 * @returns {Promise<Blob>} Compressed WebP
 */
export async function compressChatImage(file) {
    return compressImage(file, {
        maxWidth: 1920,
        maxHeight: 1080,
        quality: 0.85,
        convertToWebP: true,
        maintainAspectRatio: true
    });
}

/**
 * Batch compress multiple images
 * @param {File[]} files - Array of image files
 * @param {Object} options - Compression options
 * @returns {Promise<Blob[]>} Array of compressed blobs
 */
export async function compressMultipleImages(files, options = {}) {
    const promises = files.map(file => compressImage(file, options));
    return Promise.all(promises);
}

/**
 * Check if browser supports WebP
 * @returns {Promise<boolean>} True if WebP is supported
 */
export function supportsWebP() {
    return new Promise((resolve) => {
        const webP = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        const img = new Image();
        img.onload = () => resolve(img.width === 2);
        img.onerror = () => resolve(false);
        img.src = webP;
    });
}

/**
 * Create thumbnail from image
 * @param {File|Blob} file - Original image
 * @param {number} size - Thumbnail size (default 150px)
 * @returns {Promise<Blob>} Thumbnail blob
 */
export async function createThumbnail(file, size = 150) {
    return compressImage(file, {
        maxWidth: size,
        maxHeight: size,
        quality: 0.8,
        convertToWebP: true,
        maintainAspectRatio: true
    });
}

/**
 * Progressive image loader
 * Load thumbnail first, then full image
 */
export class ProgressiveImageLoader {
    constructor(imageUrl, thumbnailUrl) {
        this.imageUrl = imageUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.thumbnail = null;
        this.fullImage = null;
    }

    async loadThumbnail() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.thumbnail = img;
                resolve(img);
            };
            img.onerror = reject;
            img.src = this.thumbnailUrl;
        });
    }

    async loadFullImage() {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.fullImage = img;
                resolve(img);
            };
            img.onerror = reject;
            img.src = this.imageUrl;
        });
    }

    async load(onThumbnailLoad, onFullImageLoad) {
        try {
            // Load thumbnail first
            const thumbnail = await this.loadThumbnail();
            if (onThumbnailLoad) onThumbnailLoad(thumbnail);

            // Then load full image
            const fullImage = await this.loadFullImage();
            if (onFullImageLoad) onFullImageLoad(fullImage);

            return { thumbnail, fullImage };
        } catch (error) {
            console.error('❌ [ProgressiveLoader] Failed:', error);
            throw error;
        }
    }
}

/**
 * Image format converter
 * @param {File|Blob} file - Original image
 * @param {string} format - Target format (webp, jpeg, png)
 * @param {number} quality - Compression quality (0-1)
 * @returns {Promise<Blob>} Converted image blob
 */
export async function convertImageFormat(file, format = 'webp', quality = 0.85) {
    const mimeTypes = {
        webp: 'image/webp',
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png'
    };

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const mimeType = mimeTypes[format] || 'image/webp';

                canvas.toBlob((blob) => {
                    if (blob) resolve(blob);
                    else reject(new Error('Conversion failed'));
                }, mimeType, quality);
            };

            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Get image dimensions without loading full image
 * @param {File|Blob} file - Image file
 * @returns {Promise<{width: number, height: number}>} Dimensions
 */
export async function getImageDimensions(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve({ width: img.width, height: img.height });
            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default {
    compressImage,
    compressAvatar,
    compressBanner,
    compressChatImage,
    compressMultipleImages,
    supportsWebP,
    createThumbnail,
    ProgressiveImageLoader,
    convertImageFormat,
    getImageDimensions
};



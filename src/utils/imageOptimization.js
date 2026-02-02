// frontend/src/utils/imageOptimization.js

/**
 * 🖼️ Image Optimization Utilities
 * Resim yükleme ve optimizasyon işlemleri
 */

/**
 * WebP desteğini kontrol et
 */
export const supportsWebP = (() => {
    if (typeof window === 'undefined') return false;

    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
})();

/**
 * Resim URL'sine WebP desteğine göre format ekle
 * @param {string} url - Resim URL
 * @param {object} options - Opsiyonlar
 * @returns {string} Optimize edilmiş URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
    if (!url) return '';

    const {
        width,
        height,
        quality = 85,
        format = 'auto'
    } = options;

    // Zaten optimize edilmiş URL ise olduğu gibi dön
    if (url.includes('?')) return url;

    // WebP desteği varsa ve auto format seçiliyse
    const targetFormat = format === 'auto' ? (supportsWebP ? 'webp' : 'jpg') : format;

    // URL parametreleri oluştur
    const params = new URLSearchParams();
    if (width) params.append('w', width);
    if (height) params.append('h', height);
    if (quality) params.append('q', quality);
    if (targetFormat !== 'auto') params.append('f', targetFormat);

    const queryString = params.toString();
    return queryString ? `${url}?${queryString}` : url;
};

/**
 * Lazy image loader component için intersection observer
 */
export class LazyImageLoader {
    constructor(options = {}) {
        this.options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.01,
            ...options
        };

        this.observer = null;
        this.init();
    }

    init() {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            return;
        }

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, this.options);
    }

    observe(element) {
        if (this.observer) {
            this.observer.observe(element);
        } else {
            // Fallback: IntersectionObserver yoksa direkt yükle
            this.loadImage(element);
        }
    }

    loadImage(img) {
        const src = img.dataset.src;
        const srcset = img.dataset.srcset;

        if (src) {
            img.src = src;
            img.removeAttribute('data-src');
        }

        if (srcset) {
            img.srcset = srcset;
            img.removeAttribute('data-srcset');
        }

        img.classList.add('loaded');
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

/**
 * Resim boyutunu optimize et
 * @param {File} file - Resim dosyası
 * @param {object} options - Opsiyonlar
 * @returns {Promise<Blob>} Optimize edilmiş resim
 */
export const optimizeImage = async (file, options = {}) => {
    const {
        maxWidth = 1920,
        maxHeight = 1080,
        quality = 0.85,
        outputFormat = 'image/jpeg'
    } = options;

    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Boyut kontrolü
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = width * ratio;
                    height = height * ratio;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            resolve(blob);
                        } else {
                            reject(new Error('Canvas toBlob başarısız'));
                        }
                    },
                    outputFormat,
                    quality
                );
            };

            img.onerror = () => reject(new Error('Resim yüklenemedi'));
            img.src = e.target.result;
        };

        reader.onerror = () => reject(new Error('Dosya okunamadı'));
        reader.readAsDataURL(file);
    });
};

/**
 * Progressive image loading için blur hash oluştur (basit versiyon)
 */
export const generatePlaceholder = (width = 10, height = 10) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#2f3136');
    gradient.addColorStop(1, '#36393f');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    return canvas.toDataURL('image/jpeg', 0.1);
};

/**
 * Responsive image srcset oluştur
 */
export const generateSrcSet = (baseUrl, sizes = [320, 640, 960, 1280, 1920]) => {
    return sizes
        .map(size => `${getOptimizedImageUrl(baseUrl, { width: size })} ${size}w`)
        .join(', ');
};

/**
 * Image preload
 */
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Multiple images preload
 */
export const preloadImages = async (srcs) => {
    return Promise.all(srcs.map(src => preloadImage(src)));
};

export default {
    supportsWebP,
    getOptimizedImageUrl,
    LazyImageLoader,
    optimizeImage,
    generatePlaceholder,
    generateSrcSet,
    preloadImage,
    preloadImages
};



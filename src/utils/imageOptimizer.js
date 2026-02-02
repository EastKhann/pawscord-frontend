// frontend/src/utils/imageOptimizer.js

/**
 * 🖼️ Image Optimization Manager
 * Advanced image loading, optimization, and responsive images
 */

class ImageOptimizer {
    constructor(options = {}) {
        this.defaultQuality = options.defaultQuality || 0.8;
        this.formats = options.formats || ['webp', 'avif', 'jpg'];
        this.breakpoints = options.breakpoints || [320, 640, 768, 1024, 1280, 1920];
        this.lazyLoadMargin = options.lazyLoadMargin || '200px';
        this.placeholderQuality = options.placeholderQuality || 0.1;

        this.observers = new Map();
        this.cache = new Map();
        this.loadQueue = [];
        this.isProcessing = false;

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        // Check for native lazy loading support
        this.supportsNativeLazy = 'loading' in HTMLImageElement.prototype;

        // Check for WebP support
        this.checkFormatSupport();

        if (import.meta.env.MODE === 'development') {
            console.log('🖼️ [ImageOptimizer] Initialized', {
                nativeLazy: this.supportsNativeLazy,
                webp: this.supportsWebP,
                avif: this.supportsAvif
            });
        }
    }

    /**
     * Check format support
     */
    async checkFormatSupport() {
        // WebP
        this.supportsWebP = await this.canPlayFormat('image/webp');

        // AVIF
        this.supportsAvif = await this.canPlayFormat('image/avif');
    }

    /**
     * Can play format
     */
    canPlayFormat(format) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img.width === 1);
            img.onerror = () => resolve(false);

            const testImages = {
                'image/webp': 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
                'image/avif': 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
            };

            img.src = testImages[format];
        });
    }

    /**
     * Get best format
     */
    getBestFormat(originalFormat = 'jpg') {
        if (this.supportsAvif && this.formats.includes('avif')) {
            return 'avif';
        }
        if (this.supportsWebP && this.formats.includes('webp')) {
            return 'webp';
        }
        return originalFormat;
    }

    /**
     * Generate srcset
     */
    generateSrcSet(src, options = {}) {
        const { breakpoints = this.breakpoints, format } = options;

        return breakpoints.map(width => {
            const url = this.getResponsiveUrl(src, { width, format });
            return `${url} ${width}w`;
        }).join(', ');
    }

    /**
     * Get responsive image URL
     */
    getResponsiveUrl(src, options = {}) {
        const { width, height, quality = this.defaultQuality, format } = options;

        // If using a CDN, add query params
        // Example: Cloudinary, imgix, etc.
        const url = new URL(src, window.location.origin);

        if (width) url.searchParams.set('w', width);
        if (height) url.searchParams.set('h', height);
        if (quality) url.searchParams.set('q', Math.round(quality * 100));
        if (format) url.searchParams.set('f', format);

        return url.toString();
    }

    /**
     * Lazy load image
     */
    lazyLoad(img, options = {}) {
        const { src, srcset, sizes, onLoad, onError } = options;

        // Use native lazy loading if supported
        if (this.supportsNativeLazy) {
            img.loading = 'lazy';
            img.src = src;
            if (srcset) img.srcset = srcset;
            if (sizes) img.sizes = sizes;

            if (onLoad) img.addEventListener('load', onLoad);
            if (onError) img.addEventListener('error', onError);

            return;
        }

        // Fallback: Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(img, { src, srcset, sizes, onLoad, onError });
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: this.lazyLoadMargin
        });

        observer.observe(img);
        this.observers.set(img, observer);
    }

    /**
     * Load image
     */
    loadImage(img, options = {}) {
        const { src, srcset, sizes, onLoad, onError } = options;

        const tempImg = new Image();

        tempImg.onload = () => {
            img.src = src;
            if (srcset) img.srcset = srcset;
            if (sizes) img.sizes = sizes;

            img.classList.add('loaded');
            if (onLoad) onLoad();
        };

        tempImg.onerror = () => {
            img.classList.add('error');
            if (onError) onError();
        };

        tempImg.src = src;
        if (srcset) tempImg.srcset = srcset;
    }

    /**
     * Generate placeholder (low quality)
     */
    async generatePlaceholder(src, options = {}) {
        const { width = 20, height = 20, blur = 10 } = options;

        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Apply blur
                if (blur > 0) {
                    ctx.filter = `blur(${blur}px)`;
                    ctx.drawImage(canvas, 0, 0);
                }

                resolve(canvas.toDataURL('image/jpeg', this.placeholderQuality));
            };

            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Progressive image loading
     */
    progressive(container, src, options = {}) {
        const { placeholder, srcset, sizes, onLoad } = options;

        const img = container.querySelector('img') || document.createElement('img');
        img.classList.add('progressive-image');

        // Set placeholder
        if (placeholder) {
            img.src = placeholder;
            img.classList.add('placeholder');
        }

        // Load full image
        this.lazyLoad(img, {
            src,
            srcset,
            sizes,
            onLoad: () => {
                img.classList.remove('placeholder');
                img.classList.add('loaded');
                if (onLoad) onLoad();
            }
        });

        if (!container.contains(img)) {
            container.appendChild(img);
        }

        return img;
    }

    /**
     * Preload image
     */
    preload(src, options = {}) {
        if (this.cache.has(src)) {
            return Promise.resolve(this.cache.get(src));
        }

        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                this.cache.set(src, img);
                resolve(img);
            };

            img.onerror = reject;
            img.src = src;

            if (options.srcset) img.srcset = options.srcset;
        });
    }

    /**
     * Batch preload
     */
    async preloadBatch(sources, options = {}) {
        const { parallel = 3 } = options;
        const results = [];

        for (let i = 0; i < sources.length; i += parallel) {
            const batch = sources.slice(i, i + parallel);
            const promises = batch.map(src =>
                this.preload(src).catch(err => ({ error: err, src }))
            );

            const batchResults = await Promise.all(promises);
            results.push(...batchResults);
        }

        return results;
    }

    /**
     * Compress image (client-side)
     */
    async compress(file, options = {}) {
        const {
            maxWidth = 1920,
            maxHeight = 1920,
            quality = this.defaultQuality,
            format = 'image/jpeg'
        } = options;

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    const canvas = document.createElement('canvas');

                    let { width, height } = img;

                    // Calculate new dimensions
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width *= ratio;
                        height *= ratio;
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, {
                            type: format,
                            lastModified: Date.now()
                        }));
                    }, format, quality);
                };

                img.onerror = reject;
                img.src = e.target.result;
            };

            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Get image dimensions
     */
    async getDimensions(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };

            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Cleanup observers
     */
    cleanup(img) {
        const observer = this.observers.get(img);
        if (observer) {
            observer.unobserve(img);
            this.observers.delete(img);
        }
    }

    /**
     * Clear cache
     */
    clearCache() {
        this.cache.clear();
    }
}

// Global instance
export const imageOptimizer = new ImageOptimizer();

/**
 * React Hook - Progressive Image
 */
export const useProgressiveImage = (src, placeholder) => {
    const [currentSrc, setCurrentSrc] = React.useState(placeholder || src);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        imageOptimizer.preload(src).then(() => {
            setCurrentSrc(src);
            setLoading(false);
        });
    }, [src]);

    return { src: currentSrc, loading };
};

/**
 * React Hook - Lazy Load Image
 */
export const useLazyImage = (src, options = {}) => {
    const imgRef = React.useRef(null);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        if (imgRef.current) {
            imageOptimizer.lazyLoad(imgRef.current, {
                src,
                ...options,
                onLoad: () => {
                    setLoaded(true);
                    if (options.onLoad) options.onLoad();
                }
            });
        }

        return () => {
            if (imgRef.current) {
                imageOptimizer.cleanup(imgRef.current);
            }
        };
    }, [src, options]);

    return { imgRef, loaded };
};

/**
 * React Component - Progressive Image
 */
export const ProgressiveImage = ({ src, placeholder, alt, className, ...props }) => {
    const { src: currentSrc, loading } = useProgressiveImage(src, placeholder);

    return (
        <img
            src={currentSrc}
            alt={alt}
            className={`progressive-image ${loading ? 'loading' : 'loaded'} ${className || ''}`}
            {...props}
        />
    );
};

export default ImageOptimizer;



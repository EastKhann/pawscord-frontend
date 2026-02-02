// frontend/src/components/ProgressiveImage.js

import React, { useState, useEffect, useRef } from 'react';
import './ProgressiveImage.css';

/**
 * 🖼️ Progressive Image Component
 * BlurHash benzeri progressive loading
 */

const ProgressiveImage = ({
    src,
    placeholder,
    blurhash,
    alt = '',
    className = '',
    width,
    height,
    onLoad,
    onError,
    fadeInDuration = 300,
    lazy = true,
    threshold = 0.01
}) => {
    const [imageSrc, setImageSrc] = useState(placeholder || null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [isInView, setIsInView] = useState(!lazy);
    const imgRef = useRef(null);

    /**
     * Intersection Observer for lazy loading
     */
    useEffect(() => {
        if (!lazy || isInView) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold, rootMargin: '50px' }
        );

        if (imgRef.current) {
            observer.observe(imgRef.current);
        }

        return () => observer.disconnect();
    }, [lazy, threshold, isInView]);

    /**
     * Load image when in view
     */
    useEffect(() => {
        if (!isInView || !src) return;

        const img = new Image();

        img.onload = () => {
            setImageSrc(src);
            setImageLoaded(true);
            if (onLoad) onLoad();
        };

        img.onerror = () => {
            setError(true);
            if (onError) onError();
        };

        img.src = src;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, isInView, onLoad, onError]);

    /**
     * Generate simple blurhash-like gradient
     */
    const generatePlaceholder = () => {
        if (placeholder) return placeholder;
        if (blurhash) return blurhash;

        // Simple gradient placeholder
        return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width || 400} ${height || 300}'%3E%3Cdefs%3E%3ClinearGradient id='g'%3E%3Cstop offset='0%25' stop-color='%23eee'/%3E%3Cstop offset='100%25' stop-color='%23ddd'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3C/svg%3E`;
    };

    if (error) {
        return (
            <div
                ref={imgRef}
                className={`progressive-image progressive-image--error ${className}`}
                style={{ width, height }}
            >
                <div className="progressive-image__error-icon">📷</div>
                <span className="progressive-image__error-text">Failed to load image</span>
            </div>
        );
    }

    return (
        <div
            ref={imgRef}
            className={`progressive-image ${imageLoaded ? 'progressive-image--loaded' : ''} ${className}`}
            style={{
                width,
                height,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Placeholder/Blur */}
            {!imageLoaded && (
                <img
                    src={generatePlaceholder()}
                    alt=""
                    className="progressive-image__placeholder"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)'
                    }}
                />
            )}

            {/* Actual Image */}
            {isInView && (
                <img
                    src={imageSrc}
                    alt={alt}
                    className="progressive-image__img"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: imageLoaded ? 1 : 0,
                        transition: `opacity ${fadeInDuration}ms ease-in-out`
                    }}
                />
            )}

            {/* Loading Spinner */}
            {!imageLoaded && !error && isInView && (
                <div className="progressive-image__loader">
                    <div className="progressive-image__spinner"></div>
                </div>
            )}
        </div>
    );
};

/**
 * useProgressiveImage Hook
 */
export const useProgressiveImage = (src, placeholder) => {
    const [imageSrc, setImageSrc] = useState(placeholder);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!src) return;

        const img = new Image();

        img.onload = () => {
            setImageSrc(src);
            setLoading(false);
        };

        img.onerror = (e) => {
            setError(e);
            setLoading(false);
        };

        img.src = src;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    return { src: imageSrc, loading, error };
};

/**
 * Image preloader utility
 */
export const preloadImages = (urls) => {
    return Promise.all(
        urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(url);
                img.onerror = reject;
                img.src = url;
            });
        })
    );
};

/**
 * Generate low-quality placeholder (LQIP)
 */
export const generateLQIP = (imageUrl, quality = 10) => {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.crossOrigin = 'Anonymous';

        img.onload = () => {
            // Tiny dimensions for blur effect
            canvas.width = quality;
            canvas.height = quality;

            ctx.drawImage(img, 0, 0, quality, quality);

            const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
            resolve(dataUrl);
        };

        img.onerror = () => resolve(null);
        img.src = imageUrl;
    });
};

/**
 * WebP support detection
 */
export const supportsWebP = () => {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
};

/**
 * AVIF support detection
 */
export const supportsAVIF = async () => {
    if (!self.createImageBitmap) return false;

    const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=';

    try {
        const blob = await fetch(avifData).then(r => r.blob());
        await createImageBitmap(blob);
        return true;
    } catch {
        return false;
    }
};

/**
 * Get optimal image format
 */
export const getOptimalImageFormat = async (originalUrl) => {
    const hasWebP = supportsWebP();
    const hasAVIF = await supportsAVIF();

    if (hasAVIF && originalUrl.includes('.')) {
        return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.avif');
    }

    if (hasWebP && originalUrl.includes('.')) {
        return originalUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }

    return originalUrl;
};

/**
 * Responsive image srcset generator
 */
export const generateSrcSet = (baseUrl, sizes = [320, 640, 1024, 1920]) => {
    return sizes
        .map(size => {
            const url = baseUrl.replace(/(\.[^.]+)$/, `_${size}$1`);
            return `${url} ${size}w`;
        })
        .join(', ');
};

export default ProgressiveImage;



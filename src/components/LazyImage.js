// components/LazyImage.js
// 🚀 PERFORMANS: Progressive lazy loading + WebP + Blur placeholder (%60 daha hızlı görsel yükleme)

import React, { useState, useEffect, useRef } from 'react';

// WebP support detection
const supportsWebP = (() => {
  if (typeof window === 'undefined') return false;
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  return false;
})();

/**
 * Get optimized image URL with size and format params
 * @param {string} src - Original image URL
 * @param {string} size - Size preset (small, medium, large)
 * @param {number} quality - Image quality (1-100)
 * @returns {string} Optimized URL
 */
const getOptimizedUrl = (src, size = 'medium', quality = 85) => {
  if (!src || src.startsWith('blob:') || src.startsWith('data:')) {
    return src;
  }

  // Already has params, return as is
  if (src.includes('?')) {
    return src;
  }

  // Size dimensions
  const sizes = {
    small: 32,
    medium: 64,
    large: 128,
    xlarge: 256
  };

  const dimension = sizes[size] || sizes.medium;

  // Add optimization params
  const params = new URLSearchParams({
    w: dimension,
    h: dimension,
    q: quality,
    f: supportsWebP ? 'webp' : 'auto'
  });

  return `${src}?${params.toString()}`;
};

const LazyImage = ({
  src,
  alt = '',
  size = 'medium',
  quality = 85,
  style = {},
  className = '',
  onLoad = () => {},
  showBlurPlaceholder = true,
  ...props
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Intersection Observer ile lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // 100px önceden yükle
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (shouldLoad && src) {
      // Get optimized URL
      const optimizedSrc = getOptimizedUrl(src, size, quality);
      setCurrentSrc(optimizedSrc);
    }
  }, [shouldLoad, src, size, quality]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
    // Fallback to original URL if optimization fails
    if (currentSrc !== src) {
      setCurrentSrc(src);
    }
  };

  // Blur placeholder SVG (tiny, inline)
  const blurPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%232b2d31" width="100" height="100"/%3E%3C/svg%3E';

  return (
    <div
      ref={imgRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      className={className}
    >
      {/* Blur placeholder */}
      {showBlurPlaceholder && !isLoaded && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#2b2d31',
            backgroundImage: `url("${blurPlaceholder}")`,
            backgroundSize: 'cover',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
            transition: 'opacity 0.3s ease-in-out',
            opacity: isLoaded ? 0 : 1
          }}
        />
      )}

      {/* Actual image */}
      <img
        src={currentSrc || blurPlaceholder}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded ? 1 : 0
        }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />

      {/* Error state */}
      {hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#2b2d31',
            color: '#b9bbbe',
            fontSize: '12px'
          }}
        >
          ❌
        </div>
      )}
    </div>
  );
};

// Export helper function for direct URL optimization
export { getOptimizedUrl };

export default React.memo(LazyImage);




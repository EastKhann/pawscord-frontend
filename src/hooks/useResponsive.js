// frontend/src/hooks/useResponsive.js
// 📱 Responsive Design Hook - Mobile/Tablet/Desktop Detection

import { useState, useEffect } from 'react';

/**
 * Responsive breakpoints
 */
const BREAKPOINTS = {
    mobile: 768,      // 0-768px = Mobile
    tablet: 1024,     // 769-1024px = Tablet
    desktop: 1920,    // 1025-1920px = Desktop
    ultrawide: 2560   // 1921+ = Ultrawide
};

/**
 * useResponsive Hook
 * Detects screen size and provides responsive utilities
 *
 * @returns {Object} {
 *   isMobile: boolean,
 *   isTablet: boolean,
 *   isDesktop: boolean,
 *   isUltrawide: boolean,
 *   width: number,
 *   height: number,
 *   orientation: 'portrait' | 'landscape'
 * }
 */
export const useResponsive = () => {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: typeof window !== 'undefined' ? window.innerHeight : 1080
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        let timeoutId;

        const handleResize = () => {
            // Debounce resize events (performance optimization)
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }, 150); // 150ms debounce
        };

        // Initial measurement
        handleResize();

        // Listen to resize events
        window.addEventListener('resize', handleResize);

        // Listen to orientation changes (mobile)
        window.addEventListener('orientationchange', handleResize);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('orientationchange', handleResize);
        };
    }, []);

    const { width, height } = dimensions;

    return {
        // Device type flags
        isMobile: width <= BREAKPOINTS.mobile,
        isTablet: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
        isDesktop: width > BREAKPOINTS.tablet && width <= BREAKPOINTS.desktop,
        isUltrawide: width > BREAKPOINTS.desktop,

        // Dimensions
        width,
        height,

        // Orientation
        orientation: height > width ? 'portrait' : 'landscape',

        // Utility functions
        isSmallScreen: width <= BREAKPOINTS.mobile,
        isMediumScreen: width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet,
        isLargeScreen: width > BREAKPOINTS.tablet,

        // Touch device detection
        isTouchDevice: typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0),

        // Breakpoints (for custom comparisons)
        breakpoints: BREAKPOINTS
    };
};

export default useResponsive;




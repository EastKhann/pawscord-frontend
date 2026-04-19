// hooks/useWindowWidth.ts
// Shared hook for responsive breakpoints
import { useState, useEffect, useRef } from 'react';

interface WindowWidthResult {
    isMobile: boolean;
    isTablet: boolean;
    width: number;
}

const useWindowWidth = (): WindowWidthResult => {
    const [width, setWidth] = useState(window.innerWidth);
    const rafRef = useRef<number | null>(null);
    useEffect(() => {
        const h = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                setWidth(window.innerWidth);
                rafRef.current = null;
            });
        };
        window.addEventListener('resize', h);
        return () => {
            window.removeEventListener('resize', h);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);
    return { isMobile: width <= 768, isTablet: width <= 1024, width };
};

export default useWindowWidth;

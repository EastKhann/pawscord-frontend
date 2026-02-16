// hooks/usePullToRefresh.js
// 📱 Pull to Refresh Hook

import { useRef, useState, useCallback } from 'react';

export const usePullToRefresh = (onRefresh, options = {}) => {
  const {
    threshold = 80,
    resistance = 2.5,
    enabled = true
  } = options;

  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const startY = useRef(0);
  const currentY = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = useCallback((e) => {
    if (!enabled || window.scrollY > 0) return;

    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, [enabled]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current || !enabled) return;

    currentY.current = e.touches[0].clientY;
    const diff = currentY.current - startY.current;

    if (diff > 0 && window.scrollY === 0) {
      // Direnç uygula
      const distance = Math.min(diff / resistance, threshold * 1.5);
      setPullDistance(distance);
      setPulling(distance >= threshold);

      // Scroll'u engelle
      if (distance > 10) {
        e.preventDefault();
      }
    }
  }, [enabled, threshold, resistance]);

  const handleTouchEnd = useCallback(async () => {
    if (!isDragging.current) return;

    isDragging.current = false;

    if (pullDistance >= threshold && !refreshing) {
      setRefreshing(true);
      setPullDistance(threshold);

      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setTimeout(() => {
          setRefreshing(false);
          setPullDistance(0);
          setPulling(false);
        }, 500);
      }
    } else {
      setPullDistance(0);
      setPulling(false);
    }
  }, [pullDistance, threshold, onRefresh, refreshing]);

  return {
    pulling,
    pullDistance,
    refreshing,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    }
  };
};

export default usePullToRefresh;




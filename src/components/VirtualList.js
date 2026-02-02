// frontend/src/components/VirtualList.js

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './VirtualList.css';

/**
 * 🚀 Virtual List Component
 * Sadece görünür öğeleri render eder - 1000+ item için %90+ performance boost
 */

const VirtualList = ({
    items = [],
    itemHeight = 50,
    height = 600,
    overscan = 3,
    renderItem,
    estimatedItemHeight,
    onScroll,
    className = '',
    loading = false,
    onLoadMore,
    hasMore = false,
    scrollToIndex,
    maintainScrollPosition = true
}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);
    const scrollPositionRef = useRef(0);
    const itemHeightsRef = useRef(new Map());
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef(null);

    // Dynamic item heights için cache
    const usesDynamicHeight = !!estimatedItemHeight;

    /**
     * Get item height (dynamic or fixed)
     */
    const getItemHeight = useCallback((index) => {
        if (usesDynamicHeight) {
            return itemHeightsRef.current.get(index) || estimatedItemHeight;
        }
        return itemHeight;
    }, [itemHeight, estimatedItemHeight, usesDynamicHeight]);

    /**
     * Set item height (dynamic only)
     */
    const setItemHeight = useCallback((index, height) => {
        if (usesDynamicHeight && height !== itemHeightsRef.current.get(index)) {
            itemHeightsRef.current.set(index, height);
        }
    }, [usesDynamicHeight]);

    /**
     * Calculate total height
     */
    const totalHeight = useMemo(() => {
        if (!usesDynamicHeight) {
            return items.length * itemHeight;
        }

        let total = 0;
        for (let i = 0; i < items.length; i++) {
            total += getItemHeight(i);
        }
        return total;
    }, [items.length, itemHeight, usesDynamicHeight, getItemHeight]);

    /**
     * Calculate visible range
     */
    const getVisibleRange = useCallback(() => {
        const containerHeight = height;
        let startIndex = 0;
        let endIndex = 0;
        let offsetY = 0;

        if (!usesDynamicHeight) {
            // Fixed height - simple calculation
            startIndex = Math.floor(scrollTop / itemHeight);
            endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);
        } else {
            // Dynamic height - iterate to find range
            for (let i = 0; i < items.length; i++) {
                const currentHeight = getItemHeight(i);

                if (offsetY + currentHeight > scrollTop && startIndex === 0) {
                    startIndex = i;
                }

                if (offsetY > scrollTop + containerHeight) {
                    endIndex = i;
                    break;
                }

                offsetY += currentHeight;
            }

            if (endIndex === 0) endIndex = items.length;
        }

        // Apply overscan
        startIndex = Math.max(0, startIndex - overscan);
        endIndex = Math.min(items.length, endIndex + overscan);

        return { startIndex, endIndex };
    }, [scrollTop, height, itemHeight, items.length, overscan, usesDynamicHeight, getItemHeight]);

    const { startIndex, endIndex } = getVisibleRange();

    /**
     * Calculate offset for first visible item
     */
    const getOffsetForIndex = useCallback((index) => {
        if (!usesDynamicHeight) {
            return index * itemHeight;
        }

        let offset = 0;
        for (let i = 0; i < index; i++) {
            offset += getItemHeight(i);
        }
        return offset;
    }, [itemHeight, usesDynamicHeight, getItemHeight]);

    const offsetY = getOffsetForIndex(startIndex);

    /**
     * Visible items
     */
    const visibleItems = useMemo(() => {
        return items.slice(startIndex, endIndex).map((item, idx) => ({
            item,
            index: startIndex + idx,
            originalIndex: startIndex + idx
        }));
    }, [items, startIndex, endIndex]);

    /**
     * Scroll handler
     */
    const handleScroll = useCallback((e) => {
        const newScrollTop = e.target.scrollTop;
        setScrollTop(newScrollTop);
        scrollPositionRef.current = newScrollTop;

        // Scrolling flag
        isScrollingRef.current = true;
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
        }, 150);

        // Custom scroll callback
        if (onScroll) {
            onScroll(e, {
                scrollTop: newScrollTop,
                scrollHeight: totalHeight,
                clientHeight: height,
                isScrolling: true
            });
        }

        // Infinite scroll - load more
        if (hasMore && onLoadMore && !loading) {
            const scrollPercentage = (newScrollTop + height) / totalHeight;
            if (scrollPercentage > 0.8) {
                onLoadMore();
            }
        }
    }, [onScroll, totalHeight, height, hasMore, onLoadMore, loading]);

    /**
     * Scroll to specific index
     */
    const scrollToItem = useCallback((index, behavior = 'smooth') => {
        if (!containerRef.current) return;

        const offset = getOffsetForIndex(index);
        containerRef.current.scrollTo({
            top: offset,
            behavior
        });
    }, [getOffsetForIndex]);

    /**
     * Scroll to index effect
     */
    useEffect(() => {
        if (scrollToIndex !== undefined && scrollToIndex >= 0 && scrollToIndex < items.length) {
            scrollToItem(scrollToIndex);
        }
    }, [scrollToIndex, scrollToItem, items.length]);

    /**
     * Maintain scroll position when items change
     */
    useEffect(() => {
        if (!maintainScrollPosition || !containerRef.current) return;

        const currentScroll = scrollPositionRef.current;
        if (currentScroll > 0) {
            containerRef.current.scrollTop = currentScroll;
        }
    }, [items.length, maintainScrollPosition]);

    /**
     * Cleanup
     */
    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    if (import.meta.env.MODE === 'development') {
        console.log(`📊 [VirtualList] Rendering ${endIndex - startIndex} of ${items.length} items`);
    }

    return (
        <div
            ref={containerRef}
            className={`virtual-list ${className}`}
            style={{ height, overflow: 'auto', position: 'relative' }}
            onScroll={handleScroll}
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ transform: `translateY(${offsetY}px)`, position: 'absolute', width: '100%' }}>
                    {visibleItems.map(({ item, index, originalIndex }) => (
                        <VirtualListItem
                            key={originalIndex}
                            index={originalIndex}
                            style={{ height: usesDynamicHeight ? 'auto' : itemHeight }}
                            setItemHeight={setItemHeight}
                            usesDynamicHeight={usesDynamicHeight}
                        >
                            {renderItem(item, originalIndex)}
                        </VirtualListItem>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="virtual-list-loading">
                    <div className="spinner"></div>
                    Loading more...
                </div>
            )}
        </div>
    );
};

/**
 * Virtual List Item wrapper
 */
const VirtualListItem = React.memo(({
    children,
    index,
    style,
    setItemHeight,
    usesDynamicHeight
}) => {
    const ref = useRef(null);

    useEffect(() => {
        if (usesDynamicHeight && ref.current) {
            const height = ref.current.getBoundingClientRect().height;
            setItemHeight(index, height);
        }
    }, [children, index, setItemHeight, usesDynamicHeight]);

    return (
        <div ref={ref} style={style} className="virtual-list-item">
            {children}
        </div>
    );
});

VirtualListItem.displayName = 'VirtualListItem';

/**
 * useVirtualList Hook
 */
export const useVirtualList = (items, options = {}) => {
    const {
        itemHeight = 50,
        containerHeight = 600,
        overscan = 3
    } = options;

    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);

    const visibleRange = useMemo(() => {
        const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
        const endIndex = Math.min(
            items.length,
            Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
        );

        return { startIndex, endIndex };
    }, [scrollTop, itemHeight, containerHeight, items.length, overscan]);

    const visibleItems = useMemo(() => {
        return items.slice(visibleRange.startIndex, visibleRange.endIndex);
    }, [items, visibleRange]);

    const totalHeight = items.length * itemHeight;
    const offsetY = visibleRange.startIndex * itemHeight;

    const handleScroll = useCallback((e) => {
        setScrollTop(e.target.scrollTop);
    }, []);

    return {
        visibleItems,
        totalHeight,
        offsetY,
        containerRef,
        handleScroll,
        visibleRange
    };
};

export default VirtualList;



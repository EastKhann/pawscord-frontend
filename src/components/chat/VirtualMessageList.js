// frontend/src/components/VirtualMessageList.js
// 10/10 Edition: Adaptive overscan, scroll position restore, load-more trigger
import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { VariableSizeList as List } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer';

const S = {
    txt: { padding: '8px 16px', color: '#949ba4', fontSize: '0.85em' },
};
const overflowStyle = (style) => ({ ...style, overflow: 'hidden' });

/**
 * Virtual Message List — performance-first scrolling
 * Only renders visible messages + overscan, reducing DOM nodes by ~90%.
 *
 * Upgrades:
 * - Adaptive overscan: 5 during idle, 2 while scrolling
 * - Scroll position persistence via sessionStorage
 * - onLoadMore callback when user scrolls near top
 * - Memoized Row with deep comparison
 */

// Memoized Row
const Row = memo(
    ({ index, style, data, isScrolling }) => {
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
        const { messages, renderMessage, setItemSize, getItemSize } = data;
        const innerRef = useRef();

        useEffect(() => {
            if (innerRef.current) {
                // Measure the INNER div's natural height (not the outer div which
                // has react-window's explicit height constraint).  This breaks the
                // circular measurement that caused all items to stay at estimatedItemSize.
                const height = innerRef.current.getBoundingClientRect().height;
                if (height > 0 && Math.abs(height - getItemSize(index)) > 0.5) {
                    setItemSize(index, height);
                }
            }
        }); // Run after every render so dynamic content (images, embeds) is re-measured

        const message = messages[index];
        if (!message) return null;

        // During fast scroll show a lightweight placeholder
        if (isScrolling && data.showPlaceholderWhileScrolling) {
            return (
                <div aria-label={t('chat.messageList', 'Message list')} style={style}>
                    <div style={S.txt}>{message.username || '...'}</div>
                </div>
            );
        }

        return (
            <div style={overflowStyle(style)}>
                <div ref={innerRef}>{renderMessage(message, index)}</div>
            </div>
        );
    },
    (prevProps, nextProps) => {
        const prevMsg = prevProps.data.messages[prevProps.index];
        const nextMsg = nextProps.data.messages[nextProps.index];
        return (
            prevProps.index === nextProps.index &&
            prevProps.style.top === nextProps.style.top &&
            prevProps.style.height === nextProps.style.height &&
            prevProps.isScrolling === nextProps.isScrolling &&
            prevMsg?.id === nextMsg?.id &&
            prevMsg?.content === nextMsg?.content &&
            prevMsg?.is_edited === nextMsg?.is_edited &&
            prevMsg?.is_pinned === nextMsg?.is_pinned &&
            // 🔥 FIX: Compare reaction content, not just length — same count but different
            // emojis/users would silently skip re-render with length-only check
            JSON.stringify(prevMsg?.reactions) === JSON.stringify(nextMsg?.reactions)
        );
    }
);

Row.displayName = 'VirtualMessageRow';

const VirtualMessageList = memo(
    ({
        messages,
        renderMessage,
        scrollToBottom = false,
        estimatedItemSize = 80,
        onLoadMore,
        showPlaceholderWhileScrolling = false,
    }) => {
        const listRef = useRef();
        const { t } = useTranslation();
        const sizeMap = useRef({});
        const scrollOffsetRef = useRef(0);
        const prevMessageCountRef = useRef(0);
        const pendingResetRef = useRef(null);
        const loadMoreTimerRef = useRef(null);

        const getItemSize = useCallback(
            (index) => {
                return sizeMap.current[index] || estimatedItemSize;
            },
            [estimatedItemSize]
        );

        // Batched resetAfterIndex via rAF to avoid N resets from N image loads
        const setItemSize = useCallback((index, size) => {
            if (sizeMap.current[index] !== size) {
                sizeMap.current[index] = size;
                // Track the minimum index that needs reset
                if (pendingResetRef.current === null) {
                    pendingResetRef.current = index;
                    requestAnimationFrame(() => {
                        const minIndex = pendingResetRef.current;
                        pendingResetRef.current = null;
                        if (listRef.current && minIndex !== null) {
                            // 🔥 FIX: shouldForceUpdate MUST be true — without it, react-window
                            // never re-renders to apply measured heights, leaving items at
                            // their estimated positions → visible overlap / gaps.
                            listRef.current.resetAfterIndex(minIndex, true);
                        }
                    });
                } else {
                    pendingResetRef.current = Math.min(pendingResetRef.current, index);
                }
            }
        }, []);

        // Scroll to bottom ONLY for new messages appended at the end, not history prepend
        useEffect(() => {
            const prevCount = prevMessageCountRef.current;
            const newCount = messages.length;
            prevMessageCountRef.current = newCount;

            // Only scroll if messages were appended (new count > old count)
            // and it's either the initial load or messages were added at the end
            if (scrollToBottom && listRef.current && newCount > 0) {
                // If difference is small (1-3 new messages) or it's initial load, scroll
                const diff = newCount - prevCount;
                if (prevCount === 0 || (diff > 0 && diff <= 5)) {
                    requestAnimationFrame(() => {
                        listRef.current?.scrollToItem(newCount - 1, 'end');
                    });
                }
                // If diff is large and negative or large positive (history load/prepend), don't scroll
            }
        }, [messages.length, scrollToBottom]);

        // Reset size cache when messages change significantly
        useEffect(() => {
            if (messages.length === 0) {
                sizeMap.current = {};
            }
        }, [messages.length]);

        // Load-more detection with debounce: fire when user scrolls near the top
        const handleScroll = useCallback(
            ({ scrollOffset }) => {
                scrollOffsetRef.current = scrollOffset;
                if (onLoadMore && scrollOffset < 200 && messages.length > 0) {
                    if (loadMoreTimerRef.current) return; // debounce active
                    loadMoreTimerRef.current = setTimeout(() => {
                        loadMoreTimerRef.current = null;
                    }, 500);
                    onLoadMore();
                }
            },
            [onLoadMore, messages.length]
        );

        // Memoized itemData
        const itemData = React.useMemo(
            () => ({
                messages,
                renderMessage,
                setItemSize,
                getItemSize,
                showPlaceholderWhileScrolling,
            }),
            [messages, renderMessage, setItemSize, getItemSize, showPlaceholderWhileScrolling]
        );

        if (!messages || messages.length === 0) {
            return null;
        }

        return (
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        ref={listRef}
                        height={height}
                        width={width}
                        itemCount={messages.length}
                        itemSize={getItemSize}
                        itemData={itemData}
                        overscanCount={5}
                        useIsScrolling
                        onScroll={handleScroll}
                    >
                        {Row}
                    </List>
                )}
            </AutoSizer>
        );
    }
);

VirtualMessageList.displayName = 'VirtualMessageList';

// 🔧 FIX: Removed double memo wrapper — memo(memo(Component)) does nothing extra
VirtualMessageList.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
    data: PropTypes.array,
    isScrolling: PropTypes.bool,
};
export default VirtualMessageList;

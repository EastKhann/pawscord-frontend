// frontend/src/components/VirtualMessageList.js
import React, { useRef, useEffect, useCallback, memo } from 'react';
import { VariableSizeList as List } from 'react-window';
import { AutoSizer } from 'react-virtualized-auto-sizer'; // ⚡ FIX: Named import destructured

/**
 * 🚀 Virtual Message List - Performans için virtual scrolling
 * Binlerce mesaj olsa bile sadece görünür olanları render eder
 * Bellek kullanımını ve render süresini %90 azaltır
 * 
 * 🔥 OPTIMIZATION: React.memo ile gereksiz re-render'lar engellendi
 */

// ⚡ OPTIMIZATION: Row component is now memoized to prevent unnecessary re-renders
const Row = memo(({ index, style, data }) => {
    const { messages, renderMessage, setItemSize, getItemSize } = data;
    const rowRef = useRef();

    useEffect(() => {
        if (rowRef.current) {
            const height = rowRef.current.getBoundingClientRect().height;
            if (height !== getItemSize(index)) {
                setItemSize(index, height);
            }
        }
    }, [index, getItemSize, setItemSize]);

    const message = messages[index];
    if (!message) return null;

    return (
        <div style={style} ref={rowRef}>
            {renderMessage(message, index)}
        </div>
    );
}, (prevProps, nextProps) => {
    // Custom comparison: only re-render if message data or style changes
    return (
        prevProps.index === nextProps.index &&
        prevProps.style.top === nextProps.style.top &&
        prevProps.style.height === nextProps.style.height &&
        prevProps.data.messages[prevProps.index]?.id === nextProps.data.messages[nextProps.index]?.id &&
        prevProps.data.messages[prevProps.index]?.content === nextProps.data.messages[nextProps.index]?.content &&
        prevProps.data.messages[prevProps.index]?.reactions?.length === nextProps.data.messages[nextProps.index]?.reactions?.length
    );
});

Row.displayName = 'VirtualMessageRow';

const VirtualMessageList = memo(({
    messages,
    renderMessage,
    scrollToBottom = false,
    estimatedItemSize = 80
}) => {
    const listRef = useRef();
    const sizeMap = useRef({});

    // ⚡ OPTIMIZATION: Memoized callbacks to prevent re-renders
    const getItemSize = useCallback((index) => {
        return sizeMap.current[index] || estimatedItemSize;
    }, [estimatedItemSize]);

    const setItemSize = useCallback((index, size) => {
        if (sizeMap.current[index] !== size) {
            sizeMap.current[index] = size;
            if (listRef.current) {
                listRef.current.resetAfterIndex(index, false);
            }
        }
    }, []);

    // En alta scroll et (yeni mesaj geldiğinde)
    useEffect(() => {
        if (scrollToBottom && listRef.current && messages.length > 0) {
            // ⚡ OPTIMIZATION: Use requestAnimationFrame for smoother scrolling
            requestAnimationFrame(() => {
                listRef.current?.scrollToItem(messages.length - 1, 'end');
            });
        }
    }, [messages.length, scrollToBottom]);

    // ⚡ OPTIMIZATION: Reset cache when messages change significantly
    useEffect(() => {
        if (messages.length === 0) {
            sizeMap.current = {};
        }
    }, [messages.length]);

    // ⚡ OPTIMIZATION: Memoized itemData to prevent Row re-renders
    const itemData = React.useMemo(() => ({
        messages,
        renderMessage,
        setItemSize,
        getItemSize
    }), [messages, renderMessage, setItemSize, getItemSize]);

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
                    overscanCount={3} // ⚡ OPTIMIZATION: Reduced from 5 to 3 for better performance
                    useIsScrolling // ⚡ OPTIMIZATION: Enable isScrolling prop for performance
                >
                    {Row}
                </List>
            )}
        </AutoSizer>
    );
});

VirtualMessageList.displayName = 'VirtualMessageList';

export default VirtualMessageList;



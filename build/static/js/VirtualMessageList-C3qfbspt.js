var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, a as React, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { q, V as VariableSizeList } from "./perf-vendor-C7SkqPhC.js";
const Row = reactExports.memo(({ index, style, data }) => {
  const { messages, renderMessage, setItemSize, getItemSize } = data;
  const rowRef = reactExports.useRef();
  reactExports.useEffect(() => {
    if (rowRef.current) {
      const height = rowRef.current.getBoundingClientRect().height;
      if (height !== getItemSize(index)) {
        setItemSize(index, height);
      }
    }
  }, [index, getItemSize, setItemSize]);
  const message = messages[index];
  if (!message) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style, ref: rowRef, children: renderMessage(message, index) });
}, (prevProps, nextProps) => {
  return prevProps.index === nextProps.index && prevProps.style.top === nextProps.style.top && prevProps.style.height === nextProps.style.height && prevProps.data.messages[prevProps.index]?.id === nextProps.data.messages[nextProps.index]?.id && prevProps.data.messages[prevProps.index]?.content === nextProps.data.messages[nextProps.index]?.content && prevProps.data.messages[prevProps.index]?.reactions?.length === nextProps.data.messages[nextProps.index]?.reactions?.length;
});
Row.displayName = "VirtualMessageRow";
const VirtualMessageList = reactExports.memo(({
  messages,
  renderMessage,
  scrollToBottom = false,
  estimatedItemSize = 80
}) => {
  const listRef = reactExports.useRef();
  const sizeMap = reactExports.useRef({});
  const getItemSize = reactExports.useCallback((index) => {
    return sizeMap.current[index] || estimatedItemSize;
  }, [estimatedItemSize]);
  const setItemSize = reactExports.useCallback((index, size) => {
    if (sizeMap.current[index] !== size) {
      sizeMap.current[index] = size;
      if (listRef.current) {
        listRef.current.resetAfterIndex(index, false);
      }
    }
  }, []);
  reactExports.useEffect(() => {
    if (scrollToBottom && listRef.current && messages.length > 0) {
      requestAnimationFrame(() => {
        listRef.current?.scrollToItem(messages.length - 1, "end");
      });
    }
  }, [messages.length, scrollToBottom]);
  reactExports.useEffect(() => {
    if (messages.length === 0) {
      sizeMap.current = {};
    }
  }, [messages.length]);
  const itemData = React.useMemo(() => ({
    messages,
    renderMessage,
    setItemSize,
    getItemSize
  }), [messages, renderMessage, setItemSize, getItemSize]);
  if (!messages || messages.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(q, { children: /* @__PURE__ */ __name(({ height, width }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    VariableSizeList,
    {
      ref: listRef,
      height,
      width,
      itemCount: messages.length,
      itemSize: getItemSize,
      itemData,
      overscanCount: 3,
      useIsScrolling: true,
      children: Row
    }
  ), "children") });
});
VirtualMessageList.displayName = "VirtualMessageList";
export {
  VirtualMessageList as default
};

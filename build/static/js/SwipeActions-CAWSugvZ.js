var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const SwipeActions = /* @__PURE__ */ __name(({
  children,
  leftActions = [],
  rightActions = [],
  onActionClick
}) => {
  const [swipeX, setSwipeX] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const startX = React.useRef(0);
  const currentX = React.useRef(0);
  const handleTouchStart = /* @__PURE__ */ __name((e) => {
    startX.current = e.touches[0].clientX;
    setIsDragging(true);
  }, "handleTouchStart");
  const handleTouchMove = /* @__PURE__ */ __name((e) => {
    if (!isDragging) return;
    currentX.current = e.touches[0].clientX;
    const diff = currentX.current - startX.current;
    const maxSwipe = 100;
    const limitedDiff = Math.max(-maxSwipe, Math.min(maxSwipe, diff));
    setSwipeX(limitedDiff);
  }, "handleTouchMove");
  const handleTouchEnd = /* @__PURE__ */ __name(() => {
    setIsDragging(false);
    if (Math.abs(swipeX) > 60) {
      if (swipeX > 0 && leftActions.length > 0) {
        onActionClick?.(leftActions[0].id);
      } else if (swipeX < 0 && rightActions.length > 0) {
        onActionClick?.(rightActions[0].id);
      }
    }
    setSwipeX(0);
  }, "handleTouchEnd");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "swipe-container", children: [
    leftActions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "swipe-actions left", children: leftActions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `swipe-action ${action.color || "primary"}`,
        onClick: /* @__PURE__ */ __name(() => {
          onActionClick?.(action.id);
          setSwipeX(0);
        }, "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "action-icon", children: action.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "action-label", children: action.label })
        ]
      },
      action.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "swipe-content",
        style: {
          transform: `translateX(${swipeX}px)`,
          transition: isDragging ? "none" : "transform 0.3s ease"
        },
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children
      }
    ),
    rightActions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "swipe-actions right", children: rightActions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: `swipe-action ${action.color || "primary"}`,
        onClick: /* @__PURE__ */ __name(() => {
          onActionClick?.(action.id);
          setSwipeX(0);
        }, "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "action-icon", children: action.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "action-label", children: action.label })
        ]
      },
      action.id
    )) })
  ] });
}, "SwipeActions");
export {
  SwipeActions as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const REACTION_EMOJI_LIST = ["👍", "❤️", "😂", "😮", "😢", "🙏", "🔥", "🚀"];
const ReactionPicker = /* @__PURE__ */ __name(({ onEmojiSelect, onClose }) => {
  const pickerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        onClose();
      }
    }
    __name(handleClickOutside, "handleClickOutside");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  const handleSelect = /* @__PURE__ */ __name((emoji) => {
    onEmojiSelect(emoji);
    onClose();
  }, "handleSelect");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: pickerRef, style: styles.pickerContainer, children: REACTION_EMOJI_LIST.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      style: styles.emojiItem,
      onClick: /* @__PURE__ */ __name(() => handleSelect(emoji), "onClick"),
      children: emoji
    },
    emoji
  )) });
}, "ReactionPicker");
const styles = {
  pickerContainer: {
    position: "absolute",
    top: "-35px",
    right: "0px",
    backgroundColor: "#2f3136",
    border: "1px solid #1e1f22",
    borderRadius: "8px",
    padding: "8px",
    display: "flex",
    gap: "8px",
    zIndex: 100,
    boxShadow: "0 8px 16px rgba(0,0,0,0.24)"
  },
  emojiItem: {
    cursor: "pointer",
    fontSize: "1.2em",
    transition: "transform 0.1s ease-out"
  }
};
const ReactionPicker_default = React.memo(ReactionPicker);
export {
  ReactionPicker_default as default
};

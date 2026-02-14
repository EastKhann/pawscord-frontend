var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const Spoiler = /* @__PURE__ */ __name(({ children }) => {
  const [revealed, setRevealed] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      onClick: /* @__PURE__ */ __name((e) => {
        e.stopPropagation();
        setRevealed(true);
      }, "onClick"),
      style: {
        backgroundColor: revealed ? "rgba(255,255,255,0.1)" : "#202225",
        color: revealed ? "inherit" : "transparent",
        borderRadius: "3px",
        padding: "0 2px",
        cursor: revealed ? "default" : "pointer",
        userSelect: revealed ? "auto" : "none",
        transition: "all 0.2s",
        // Blurlu efekt veya siyah kutu
        filter: revealed ? "none" : "blur(4px)"
      },
      title: revealed ? "" : "Görmek için tıkla",
      children
    }
  );
}, "Spoiler");
export {
  Spoiler as default
};

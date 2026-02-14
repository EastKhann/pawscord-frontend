var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const StickerPicker = /* @__PURE__ */ __name(({ categoryId, onSelect, onClose, fetchWithAuth, apiBaseUrl }) => {
  const [stickers, setStickers] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!categoryId) return;
    fetchWithAuth(`${apiBaseUrl}/servers/${categoryId}/stickers/`).then((res) => res.json()).then((data) => setStickers(data)).catch((err) => console.error("Sticker hatası:", err));
  }, [categoryId, apiBaseUrl, fetchWithAuth]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pickerContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.header, children: "Sunucu Stickerları" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.grid, children: [
      stickers.map((sticker) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: sticker.image,
          alt: sticker.name,
          style: styles.sticker,
          onClick: /* @__PURE__ */ __name(() => onSelect(sticker.image), "onClick")
        },
        sticker.id
      )),
      stickers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { padding: 10 }, children: "Bu sunucuda sticker yok." })
    ] })
  ] });
}, "StickerPicker");
const styles = {
  pickerContainer: {
    position: "absolute",
    bottom: "60px",
    right: "10px",
    width: "300px",
    height: "250px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.5)",
    zIndex: 100,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  header: { padding: "10px", fontWeight: "bold", borderBottom: "1px solid #202225", color: "#fff" },
  grid: { padding: "10px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", overflowY: "auto" },
  sticker: { width: "100%", cursor: "pointer", transition: "transform 0.1s" }
};
const StickerPicker_default = React.memo(StickerPicker);
export {
  StickerPicker_default as default
};

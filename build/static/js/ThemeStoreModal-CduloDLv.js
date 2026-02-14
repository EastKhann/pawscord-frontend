var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { T as THEMES, e as applyTheme } from "./index-DGqPEDt8.js";
import { ap as FaPalette, a9 as FaCheck } from "./icons-vendor-2VDeY8fW.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ThemeStoreModal = /* @__PURE__ */ __name(({ onClose, currentTheme, onThemeChange }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPalette, { style: { marginRight: 10, fontSize: "1.2em", color: "#f0b232" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Tema Mağazası" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.grid, children: Object.entries(THEMES).map(([key, theme]) => {
      const isActive = currentTheme === key;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            ...styles.card,
            border: isActive ? "2px solid #5865f2" : "2px solid transparent",
            backgroundColor: theme.colors["--background-primary"]
          },
          onClick: /* @__PURE__ */ __name(() => {
            applyTheme(key);
            onThemeChange(key);
          }, "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.previewContainer, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorCircle, backgroundColor: theme.colors["--background-secondary"] } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorCircle, backgroundColor: theme.colors["--button-primary"] } }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.colorCircle, backgroundColor: theme.colors["--text-primary"] } })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              ...styles.themeName,
              color: theme.colors["--text-primary"],
              backgroundColor: theme.colors["--background-secondary"]
            }, children: [
              theme.name,
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { marginLeft: 5, color: "#23a559" } })
            ] })
          ]
        },
        key
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: "Kapat" })
  ] }) });
}, "ThemeStoreModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 2e3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeIn 0.2s ease"
  },
  modal: {
    backgroundColor: "var(--background-secondary)",
    padding: "30px",
    borderRadius: "12px",
    width: "600px",
    maxWidth: "90vw",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
    color: "var(--text-primary)",
    borderBottom: "1px solid var(--border-primary)",
    paddingBottom: "15px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
    marginBottom: "20px"
  },
  card: {
    borderRadius: "12px",
    cursor: "pointer",
    height: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    transition: "transform 0.2s, box-shadow 0.2s",
    overflow: "hidden"
  },
  previewContainer: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    paddingTop: "20px"
  },
  colorCircle: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.1)"
  },
  themeName: {
    padding: "8px",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "0.9em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  closeButton: {
    padding: "12px",
    backgroundColor: "var(--button-secondary)",
    color: "var(--text-primary)",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    alignSelf: "flex-end",
    marginTop: "10px"
  }
};
export {
  ThemeStoreModal as default
};

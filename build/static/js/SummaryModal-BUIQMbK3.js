var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { r as FaMagic, a as FaTimes, B as FaRobot } from "./icons-vendor-2VDeY8fW.js";
const SummaryModal = /* @__PURE__ */ __name(({ isLoading, summaryText, onClose }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMagic, { style: { color: "#eb459e" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Sohbet Özeti" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.loadingState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ai-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRobot, { size: 40, color: "#5865f2" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginTop: 15, color: "#dbdee1" }, children: "Sohbet okunuyor ve analiz ediliyor..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.8em", color: "#949ba4" }, children: "(Bu işlem sohbet yoğunluğuna göre 5-10 sn sürebilir)" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.summaryText, children: summaryText ? summaryText.split("\n").map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 8px 0" }, children: line }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#da373c" }, children: "Özet çıkarılamadı veya hata oluştu." }) }) })
  ] }) });
}, "SummaryModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // Arka planı hafif karart
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    backdropFilter: "blur(2px)"
  },
  modal: {
    width: "90%",
    maxWidth: "500px",
    backgroundColor: "#2b2d31",
    // Discord koyu gri
    borderRadius: "12px",
    boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
    border: "1px solid #1e1f22",
    overflow: "hidden",
    animation: "popIn 0.3s ease-out"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#1e1f22",
    borderBottom: "1px solid #111214"
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1.1em",
    fontWeight: "bold",
    color: "#fff"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.2em",
    padding: "5px",
    display: "flex",
    alignItems: "center"
  },
  content: {
    padding: "25px",
    minHeight: "150px",
    maxHeight: "60vh",
    overflowY: "auto",
    color: "#dcddde",
    lineHeight: "1.5",
    fontSize: "0.95em"
  },
  loadingState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: "100%",
    padding: "20px 0"
  },
  summaryText: {
    whiteSpace: "pre-wrap"
  }
};
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes popIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    .ai-pulse {
        animation: aiPulse 1.5s infinite ease-in-out;
    }
    @keyframes aiPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);
const SummaryModal_default = React.memo(SummaryModal);
export {
  SummaryModal_default as default
};

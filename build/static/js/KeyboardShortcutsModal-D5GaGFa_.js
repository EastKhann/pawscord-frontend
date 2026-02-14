var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, a as React } from "./react-core-BiY6fgAJ.js";
import { bS as FaKeyboard, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
const KEYBOARD_SHORTCUTS = [
  {
    category: "Genel",
    shortcuts: [
      { keys: ["Ctrl", "K"], description: "Hızlı Geçiş / Arama" },
      { keys: ["Ctrl", ","], description: "Kullanıcı Ayarları" },
      { keys: ["Ctrl", "/"], description: "Kısayol Tuşları" },
      { keys: ["Ctrl", "Shift", "P"], description: "Komut Paleti" },
      { keys: ["Escape"], description: "Paneli Kapat" }
    ]
  },
  {
    category: "Mesajlaşma",
    shortcuts: [
      { keys: ["Enter"], description: "Mesaj Gönder" },
      { keys: ["Shift", "Enter"], description: "Yeni Satır" },
      { keys: ["↑"], description: "Son Mesajı Düzenle" },
      { keys: ["Ctrl", "E"], description: "Emoji Seçici" }
    ]
  },
  {
    category: "Navigasyon",
    shortcuts: [
      { keys: ["Alt", "↑"], description: "Önceki Kanal" },
      { keys: ["Alt", "↓"], description: "Sonraki Kanal" },
      { keys: ["Ctrl", "Shift", "U"], description: "Dosya Yükle" }
    ]
  },
  {
    category: "Sesli Sohbet",
    shortcuts: [
      { keys: ["Ctrl", "Shift", "M"], description: "Mikrofon Aç/Kapat" },
      { keys: ["Ctrl", "Shift", "D"], description: "Sağır Modu" }
    ]
  }
];
const KeyboardShortcutsModal = /* @__PURE__ */ __name(({ isOpen, onClose }) => {
  if (typeof isOpen !== "undefined" && !isOpen) return null;
  const renderKey = /* @__PURE__ */ __name((key) => {
    const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
    const displayKey = key === "Ctrl" && isMac ? "⌘" : key;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { style: styles.key, children: displayKey });
  }, "renderKey");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaKeyboard, { style: styles.headerIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Klavye Kısayolları" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: KEYBOARD_SHORTCUTS.map((category, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.category, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.categoryTitle, children: category.category }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.shortcutList, children: category.shortcuts.map((shortcut, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.shortcutItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.shortcutKeys, children: shortcut.keys.map((key, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs(React.Fragment, { children: [
          renderKey(key),
          j < shortcut.keys.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.plus, children: "+" })
        ] }, j)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.shortcutDescription, children: shortcut.description })
      ] }, i)) })
    ] }, idx)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.footer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.footerText, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "İpucu:" }),
      " Herhangi bir zamanda ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { style: styles.key, children: "Ctrl" }),
      " + ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { style: styles.key, children: "/" }),
      " ile bu pencereyi açabilirsiniz"
    ] }) })
  ] }) });
}, "KeyboardShortcutsModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4,
    animation: "fadeIn 0.2s ease"
  },
  modal: {
    backgroundColor: "#36393f",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "800px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    boxShadow: "0 8px 16px rgba(0,0,0,0.24)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #202225",
    backgroundColor: "#2f3136"
  },
  headerTitle: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#fff"
  },
  headerIcon: {
    fontSize: "24px",
    color: "#5865f2"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    fontSize: "24px",
    cursor: "pointer",
    padding: "4px",
    transition: "color 0.2s"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px"
  },
  category: {
    marginBottom: "32px"
  },
  categoryTitle: {
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "16px",
    paddingBottom: "8px",
    borderBottom: "2px solid #5865f2"
  },
  shortcutList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  shortcutItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    backgroundColor: "#2f3136",
    borderRadius: "4px",
    transition: "background 0.2s"
  },
  shortcutKeys: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    minWidth: "200px"
  },
  key: {
    display: "inline-block",
    padding: "4px 8px",
    backgroundColor: "#202225",
    border: "1px solid #404040",
    borderRadius: "4px",
    color: "#dcddde",
    fontSize: "13px",
    fontWeight: "bold",
    fontFamily: "monospace",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    minWidth: "32px",
    textAlign: "center"
  },
  plus: {
    color: "#b9bbbe",
    fontSize: "12px",
    fontWeight: "bold"
  },
  shortcutDescription: {
    color: "#dcddde",
    fontSize: "14px",
    flex: 1,
    textAlign: "right"
  },
  footer: {
    padding: "16px 24px",
    borderTop: "1px solid #202225",
    backgroundColor: "#2f3136"
  },
  footerText: {
    color: "#b9bbbe",
    fontSize: "13px",
    margin: 0,
    textAlign: "center"
  }
};
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .shortcutItem:hover {
        background-color: #3a3d44 !important;
    }
`;
document.head.appendChild(styleSheet);
export {
  KeyboardShortcutsModal as default
};

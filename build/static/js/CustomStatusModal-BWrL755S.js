var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { A as API_BASE_URL } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const STATUS_TYPES = [
  { key: "custom", label: "Özel", icon: "✨", color: "#5865F2", placeholder: "Özel durumunu yaz..." },
  { key: "gaming", label: "Oynuyor", icon: "🎮", color: "#57F287", placeholder: "Hangi oyunu oynuyorsun?" },
  { key: "happy", label: "Dinliyor", icon: "🎧", color: "#1DB954", placeholder: "Ne dinliyorsun?" },
  { key: "focused", label: "İzliyor", icon: "👀", color: "#E91E63", placeholder: "Ne izliyorsun?" },
  { key: "creative", label: "Yayında", icon: "📡", color: "#9146FF", placeholder: "Yayın başlığı..." },
  { key: "excited", label: "Yarışıyor", icon: "🏆", color: "#FAA61A", placeholder: "Hangi yarışma?" },
  { key: "working", label: "Çalışıyor", icon: "💼", color: "#747F8D", placeholder: "Ne üzerinde çalışıyorsun?" },
  { key: "studying", label: "Okuyor", icon: "📚", color: "#5865F2", placeholder: "Ne okuyorsun?" }
];
const EXPIRY_OPTIONS = [
  { label: "Temizleme", value: null },
  { label: "30 dakika", value: 30 },
  { label: "1 saat", value: 60 },
  { label: "4 saat", value: 240 },
  { label: "Bugün", value: "today" }
];
const CustomStatusModal = /* @__PURE__ */ __name(({ isOpen, onClose, onStatusChange }) => {
  const [statusType, setStatusType] = reactExports.useState("custom");
  const [emoji, setEmoji] = reactExports.useState("✨");
  const [text, setText] = reactExports.useState("");
  const [expiresIn, setExpiresIn] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [currentStatus, setCurrentStatus] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    const fetchStatus = /* @__PURE__ */ __name(async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await fetch(`${API_BASE_URL}/api/status/custom/`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.type) {
            setCurrentStatus(data);
            setStatusType(data.type);
            setEmoji(data.emoji || "✨");
            setText(data.text || data.activity || "");
          }
        }
      } catch {
      }
    }, "fetchStatus");
    fetchStatus();
  }, [isOpen]);
  const handleSave = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      let expMin = expiresIn;
      if (expiresIn === "today") {
        const now = /* @__PURE__ */ new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        expMin = Math.floor((endOfDay - now) / 6e4);
      }
      const res = await fetch(`${API_BASE_URL}/api/status/custom/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: statusType,
          emoji,
          text,
          activity: text,
          expires_in: expMin
        })
      });
      if (res.ok) {
        const data = await res.json();
        onStatusChange?.(data);
        onClose();
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, "handleSave");
  const handleClear = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      await fetch(`${API_BASE_URL}/api/status/custom/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      setCurrentStatus(null);
      setStatusType("custom");
      setEmoji("✨");
      setText("");
      onStatusChange?.(null);
      onClose();
    } catch {
    } finally {
      setLoading(false);
    }
  }, "handleClear");
  if (!isOpen) return null;
  const selectedType = STATUS_TYPES.find((t) => t.key === statusType) || STATUS_TYPES[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.title, children: "Durumunu Ayarla" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.preview, borderColor: selectedType.color }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.previewEmoji, children: emoji }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.previewText, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: selectedType.color, fontWeight: 600, fontSize: 12 }, children: selectedType.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.previewContent, children: text || selectedType.placeholder })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Durum Tipi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.typeGrid, children: STATUS_TYPES.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            setStatusType(type.key);
            setEmoji(type.icon);
          }, "onClick"),
          style: {
            ...styles.typeBtn,
            ...statusType === type.key ? {
              backgroundColor: `${type.color}20`,
              borderColor: type.color,
              color: type.color
            } : {}
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: type.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 11 }, children: type.label })
          ]
        },
        type.key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Emoji" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: emoji,
          onChange: /* @__PURE__ */ __name((e) => setEmoji(e.target.value.slice(-2)), "onChange"),
          style: styles.emojiInput,
          maxLength: 4
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Durum Metni" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: text,
          onChange: /* @__PURE__ */ __name((e) => setText(e.target.value), "onChange"),
          placeholder: selectedType.placeholder,
          style: styles.textInput,
          maxLength: 100
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.charCount, children: [
        text.length,
        "/100"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Otomatik Temizle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.expiryRow, children: EXPIRY_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setExpiresIn(opt.value), "onClick"),
          style: {
            ...styles.expiryBtn,
            ...expiresIn === opt.value ? styles.expiryBtnActive : {}
          },
          children: opt.label
        },
        opt.label
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.actions, children: [
      currentStatus && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleClear, style: styles.clearBtn, disabled: loading, children: "Durumu Temizle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { flex: 1 } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.cancelBtn, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSave, style: styles.saveBtn, disabled: loading || !text.trim(), children: loading ? "..." : "Kaydet" })
    ] })
  ] }) });
}, "CustomStatusModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1100
  },
  modal: {
    width: "440px",
    maxWidth: "90vw",
    backgroundColor: "#36393f",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #2f3136"
  },
  title: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 700,
    color: "#fff"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px"
  },
  preview: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "16px 20px",
    padding: "14px 16px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    borderLeft: "4px solid #5865F2"
  },
  previewEmoji: {
    fontSize: "28px"
  },
  previewText: {
    display: "flex",
    flexDirection: "column",
    gap: "2px"
  },
  previewContent: {
    color: "#dcddde",
    fontSize: "14px"
  },
  section: {
    padding: "0 20px",
    marginBottom: "16px",
    position: "relative"
  },
  label: {
    display: "block",
    color: "#b9bbbe",
    fontSize: "12px",
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: "8px"
  },
  typeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "6px"
  },
  typeBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "10px 8px",
    backgroundColor: "#2f3136",
    border: "2px solid transparent",
    borderRadius: "8px",
    color: "#b9bbbe",
    cursor: "pointer",
    transition: "all 0.15s",
    fontSize: "16px"
  },
  emojiInput: {
    width: "60px",
    padding: "8px 12px",
    backgroundColor: "#202225",
    border: "1px solid #40444b",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "24px",
    textAlign: "center",
    outline: "none"
  },
  textInput: {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "#202225",
    border: "1px solid #40444b",
    borderRadius: "6px",
    color: "#dcddde",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  },
  charCount: {
    position: "absolute",
    right: "28px",
    bottom: "-16px",
    fontSize: "11px",
    color: "#72767d"
  },
  expiryRow: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap"
  },
  expiryBtn: {
    padding: "6px 12px",
    backgroundColor: "#2f3136",
    border: "1px solid #40444b",
    borderRadius: "6px",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "12px",
    transition: "all 0.15s"
  },
  expiryBtnActive: {
    backgroundColor: "#5865F2",
    borderColor: "#5865F2",
    color: "#fff"
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 20px",
    borderTop: "1px solid #2f3136",
    backgroundColor: "#2f3136"
  },
  clearBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    border: "1px solid #ed4245",
    borderRadius: "6px",
    color: "#ed4245",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500
  },
  cancelBtn: {
    padding: "8px 16px",
    backgroundColor: "transparent",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500
  },
  saveBtn: {
    padding: "8px 20px",
    backgroundColor: "#5865F2",
    border: "none",
    borderRadius: "6px",
    color: "#fff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    transition: "background 0.15s"
  }
};
const CustomStatusModal_default = React.memo(CustomStatusModal);
export {
  CustomStatusModal_default as default
};

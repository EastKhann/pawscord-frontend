var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { n as FaSmile, a as FaTimes, z as FaClock, aW as FaCircle, bT as FaMoon, cK as FaMinusCircle, $ as FaEyeSlash } from "./icons-vendor-2VDeY8fW.js";
const STATUSES = [
  { key: "online", label: "Çevrimiçi", icon: FaCircle, color: "#57f287" },
  { key: "idle", label: "Boşta", icon: FaMoon, color: "#fee75c" },
  { key: "dnd", label: "Rahatsız Etmeyin", icon: FaMinusCircle, color: "#ed4245", desc: "Hiçbir bildirim almayacaksın" },
  { key: "invisible", label: "Görünmez", icon: FaEyeSlash, color: "#747f8d", desc: "Çevrimdışı görüneceksin" }
];
const EXPIRE_OPTIONS = [
  { label: "Silme", value: null },
  { label: "30 dakika", value: 30 },
  { label: "1 saat", value: 60 },
  { label: "4 saat", value: 240 },
  { label: "Bugün", value: "today" }
];
const StatusPicker = /* @__PURE__ */ __name(({ currentStatus = "online", customStatus, onStatusChange, onCustomStatusChange, onClose }) => {
  const [showCustom, setShowCustom] = reactExports.useState(false);
  const [customText, setCustomText] = reactExports.useState(customStatus?.text || "");
  const [customEmoji, setCustomEmoji] = reactExports.useState(customStatus?.emoji || "😊");
  const [expireAfter, setExpireAfter] = reactExports.useState(null);
  const handleStatusChange = reactExports.useCallback((status) => {
    onStatusChange?.(status);
    if (!showCustom) onClose?.();
  }, [onStatusChange, onClose, showCustom]);
  const handleCustomSave = reactExports.useCallback(() => {
    onCustomStatusChange?.({
      text: customText.trim(),
      emoji: customEmoji,
      expireAfter
    });
    onClose?.();
  }, [customText, customEmoji, expireAfter, onCustomStatusChange, onClose]);
  const handleClearCustom = reactExports.useCallback(() => {
    onCustomStatusChange?.(null);
    setCustomText("");
  }, [onCustomStatusChange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        style: S.customBtn,
        onClick: /* @__PURE__ */ __name(() => setShowCustom(!showCustom), "onClick"),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, { style: { fontSize: 16, color: "#fee75c" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: customStatus?.text || "Özel Durum Belirle" }),
          customStatus?.text && /* @__PURE__ */ jsxRuntimeExports.jsx(
            FaTimes,
            {
              style: { fontSize: 12, color: "#b5bac1", marginLeft: "auto" },
              onClick: /* @__PURE__ */ __name((e) => {
                e.stopPropagation();
                handleClearCustom();
              }, "onClick")
            }
          )
        ]
      }
    ),
    showCustom && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.customPanel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.customInput, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            style: S.emojiPick,
            onClick: /* @__PURE__ */ __name(() => {
              const emojis = ["😊", "🎮", "🎵", "💻", "🔥", "💤", "🎉", "❤️", "🚀", "📚"];
              const idx = emojis.indexOf(customEmoji);
              setCustomEmoji(emojis[(idx + 1) % emojis.length]);
            }, "onClick"),
            children: customEmoji
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: customText,
            onChange: /* @__PURE__ */ __name((e) => setCustomText(e.target.value), "onChange"),
            placeholder: "Durumunu ayarla...",
            style: S.input,
            maxLength: 128
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.expireRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { fontSize: 12, color: "#4e5058" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.expireLabel, children: "Sonra temizle:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            style: S.select,
            value: expireAfter || "",
            onChange: /* @__PURE__ */ __name((e) => setExpireAfter(e.target.value || null), "onChange"),
            children: EXPIRE_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value || "", children: opt.label }, opt.label))
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: S.saveBtn, onClick: handleCustomSave, children: "Kaydet" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.divider }),
    STATUSES.map((s) => {
      const Icon = s.icon;
      const isActive = currentStatus === s.key;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          style: {
            ...S.statusItem,
            backgroundColor: isActive ? "rgba(88,101,242,0.1)" : "transparent"
          },
          onClick: /* @__PURE__ */ __name(() => handleStatusChange(s.key), "onClick"),
          onMouseEnter: /* @__PURE__ */ __name((e) => {
            if (!isActive) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
          }, "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name((e) => {
            if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
          }, "onMouseLeave"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: { fontSize: 12, color: s.color } }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.statusInfo, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.statusLabel, children: s.label }),
              s.desc && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.statusDesc, children: s.desc })
            ] }),
            isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...S.activeDot, backgroundColor: s.color } })
          ]
        },
        s.key
      );
    })
  ] });
}, "StatusPicker");
const S = {
  container: {
    backgroundColor: "#111214",
    borderRadius: 8,
    padding: "8px 0",
    minWidth: 260,
    boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.06)"
  },
  customBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    width: "100%",
    padding: "10px 14px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#dcddde",
    fontSize: 14,
    textAlign: "left"
  },
  customPanel: {
    padding: "8px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  customInput: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1e1f22",
    borderRadius: 6,
    padding: "6px 10px"
  },
  emojiPick: {
    fontSize: 20,
    cursor: "pointer",
    userSelect: "none"
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#dcddde",
    fontSize: 14,
    fontFamily: "inherit"
  },
  expireRow: {
    display: "flex",
    alignItems: "center",
    gap: 6
  },
  expireLabel: {
    fontSize: 12,
    color: "#4e5058"
  },
  select: {
    flex: 1,
    backgroundColor: "#1e1f22",
    border: "none",
    borderRadius: 4,
    color: "#dcddde",
    fontSize: 12,
    padding: "4px 6px",
    outline: "none"
  },
  saveBtn: {
    padding: "6px 14px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#5865f2",
    color: "#fff",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    alignSelf: "flex-end"
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    margin: "4px 10px"
  },
  statusItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: "8px 14px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
    transition: "background 0.1s"
  },
  statusInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    flex: 1
  },
  statusLabel: {
    fontSize: 14,
    color: "#dcddde",
    fontWeight: 500
  },
  statusDesc: {
    fontSize: 11,
    color: "#4e5058"
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: "50%"
  }
};
const StatusPicker_default = reactExports.memo(StatusPicker);
export {
  StatusPicker_default as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { at as FaEdit, a0 as FaEye, bu as FaGripVertical, g as FaTrash, an as FaPlus, aY as FaSave } from "./icons-vendor-2VDeY8fW.js";
const EMOJI_PRESETS = ["👋", "📢", "📖", "🎮", "💬", "🎵", "🎨", "📌", "🔧", "⭐", "🚀", "❤️"];
const WelcomeScreenEditor = /* @__PURE__ */ __name(({ serverName, initialConfig, channels = [], onSave }) => {
  const [description, setDescription] = reactExports.useState(initialConfig?.description || `${serverName} sunucusuna hoş geldin!`);
  const [welcomeChannels, setWelcomeChannels] = reactExports.useState(
    initialConfig?.channels || [
      { channelId: null, description: "Sohbete katıl", emoji: "💬" }
    ]
  );
  const [preview, setPreview] = reactExports.useState(false);
  const addChannel = reactExports.useCallback(() => {
    if (welcomeChannels.length >= 5) return;
    setWelcomeChannels((prev) => [...prev, { channelId: null, description: "", emoji: "📌" }]);
  }, [welcomeChannels.length]);
  const removeChannel = reactExports.useCallback((index) => {
    setWelcomeChannels((prev) => prev.filter((_, i) => i !== index));
  }, []);
  const updateChannel = reactExports.useCallback((index, field, value) => {
    setWelcomeChannels((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);
  const handleSave = reactExports.useCallback(() => {
    onSave?.({
      description,
      channels: welcomeChannels.filter((c) => c.channelId)
    });
  }, [description, welcomeChannels, onSave]);
  if (preview) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.previewContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.previewHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: S.previewTitle, children: serverName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: S.previewDesc, children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.previewChannels, children: welcomeChannels.filter((c) => c.channelId || c.description).map((wc, i) => {
        const channel = channels.find((c) => c.id === wc.channelId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.previewChannel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.previewEmoji, children: wc.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.previewChannelName, children: [
              "#",
              channel?.name || "kanal"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.previewChannelDesc, children: wc.description })
          ] })
        ] }, i);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: S.backBtn, onClick: /* @__PURE__ */ __name(() => setPreview(false), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaEdit, {}),
        " Düzenlemeye Dön"
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.headerRow, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: S.title, children: "Hoş Geldin Ekranı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: S.previewBtn, onClick: /* @__PURE__ */ __name(() => setPreview(true), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}),
        " Önizle"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.field, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: S.label, children: "Açıklama" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: description,
          onChange: /* @__PURE__ */ __name((e) => setDescription(e.target.value), "onChange"),
          placeholder: "Sunucu açıklaması...",
          style: S.textarea,
          maxLength: 300,
          rows: 2
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.charCount, children: [
        description.length,
        "/300"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.field, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: S.label, children: [
        "Önerilen Kanallar (",
        welcomeChannels.length,
        "/5)"
      ] }),
      welcomeChannels.map((wc, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.channelRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGripVertical, { style: { fontSize: 12, color: "#4e5058", cursor: "grab" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "select",
          {
            style: S.emojiSelect,
            value: wc.emoji,
            onChange: /* @__PURE__ */ __name((e) => updateChannel(i, "emoji", e.target.value), "onChange"),
            children: EMOJI_PRESETS.map((em) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: em, children: em }, em))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            style: S.channelSelect,
            value: wc.channelId || "",
            onChange: /* @__PURE__ */ __name((e) => updateChannel(i, "channelId", e.target.value || null), "onChange"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Kanal seç..." }),
              channels.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: c.id, children: [
                "#",
                c.name
              ] }, c.id))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: wc.description,
            onChange: /* @__PURE__ */ __name((e) => updateChannel(i, "description", e.target.value), "onChange"),
            placeholder: "Kanal açıklaması",
            style: S.descInput,
            maxLength: 50
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: S.removeBtn, onClick: /* @__PURE__ */ __name(() => removeChannel(i), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, { style: { fontSize: 12 } }) })
      ] }, i)),
      welcomeChannels.length < 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: S.addBtn, onClick: addChannel, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
        " Kanal Ekle"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", style: S.saveBtn, onClick: handleSave, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
      " Kaydet"
    ] })
  ] });
}, "WelcomeScreenEditor");
const S = {
  container: { padding: 20 },
  headerRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20
  },
  title: { fontSize: 18, fontWeight: 700, color: "#f2f3f5", margin: 0 },
  previewBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 12px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#dcddde",
    fontSize: 13,
    cursor: "pointer"
  },
  field: {
    marginBottom: 20,
    position: "relative"
  },
  label: {
    display: "block",
    fontSize: 12,
    fontWeight: 700,
    color: "#b5bac1",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: 8
  },
  textarea: {
    width: "100%",
    resize: "none",
    padding: "8px 10px",
    backgroundColor: "#1e1f22",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: 6,
    color: "#dcddde",
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    boxSizing: "border-box"
  },
  charCount: {
    position: "absolute",
    right: 8,
    bottom: 8,
    fontSize: 11,
    color: "#4e5058"
  },
  channelRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    padding: "6px 8px",
    backgroundColor: "#1e1f22",
    borderRadius: 6
  },
  emojiSelect: {
    width: 42,
    backgroundColor: "#2b2d31",
    border: "none",
    borderRadius: 4,
    color: "#dcddde",
    fontSize: 16,
    padding: "4px",
    textAlign: "center",
    outline: "none",
    cursor: "pointer"
  },
  channelSelect: {
    flex: 1,
    backgroundColor: "#2b2d31",
    border: "none",
    borderRadius: 4,
    color: "#dcddde",
    fontSize: 13,
    padding: "6px 8px",
    outline: "none"
  },
  descInput: {
    flex: 1,
    backgroundColor: "#2b2d31",
    border: "none",
    borderRadius: 4,
    color: "#dcddde",
    fontSize: 13,
    padding: "6px 8px",
    outline: "none"
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    background: "transparent",
    color: "#ed4245",
    cursor: "pointer"
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px dashed rgba(255,255,255,0.1)",
    background: "transparent",
    color: "#5865f2",
    fontSize: 13,
    cursor: "pointer",
    width: "100%",
    justifyContent: "center"
  },
  saveBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 24px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#5865f2",
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer"
  },
  // Preview styles
  previewContainer: {
    padding: 20,
    textAlign: "center"
  },
  previewHeader: {
    marginBottom: 20
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: 700,
    color: "#f2f3f5",
    margin: 0
  },
  previewDesc: {
    fontSize: 14,
    color: "#b5bac1",
    margin: "8px 0 0"
  },
  previewChannels: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    maxWidth: 400,
    margin: "0 auto"
  },
  previewChannel: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    backgroundColor: "#2b2d31",
    borderRadius: 8,
    textAlign: "left"
  },
  previewEmoji: { fontSize: 24 },
  previewChannelName: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#f2f3f5"
  },
  previewChannelDesc: {
    display: "block",
    fontSize: 12,
    color: "#b5bac1",
    marginTop: 2
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    margin: "20px auto 0",
    padding: "8px 16px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#dcddde",
    fontSize: 14,
    cursor: "pointer"
  }
};
const WelcomeScreenEditor_default = reactExports.memo(WelcomeScreenEditor);
export {
  WelcomeScreenEditor_default as default
};

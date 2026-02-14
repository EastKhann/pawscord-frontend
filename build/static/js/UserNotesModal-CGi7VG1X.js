var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aJ as FaStickyNote, a as FaTimes, aY as FaSave } from "./icons-vendor-2VDeY8fW.js";
const UserNotesModal = /* @__PURE__ */ __name(({ targetUser, apiBaseUrl, fetchWithAuth, onClose, inline = false }) => {
  const [note, setNote] = reactExports.useState("");
  const [color, setColor] = reactExports.useState("yellow");
  const [saving, setSaving] = reactExports.useState(false);
  const colors = [
    { name: "yellow", value: "#fef3bd" },
    { name: "green", value: "#d4edda" },
    { name: "blue", value: "#d1ecf1" },
    { name: "red", value: "#f8d7da" },
    { name: "purple", value: "#e2d9f3" }
  ];
  reactExports.useEffect(() => {
    loadNote();
  }, [targetUser]);
  const loadNote = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/user-notes/${targetUser}/`);
      if (response.ok) {
        const data = await response.json();
        setNote(data.note || "");
        setColor(data.color || "yellow");
      }
    } catch (error) {
      console.error("Failed to load note:", error);
    }
  }, "loadNote");
  const saveNote = /* @__PURE__ */ __name(async () => {
    setSaving(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/user-notes/${targetUser}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note, color })
      });
      if (response.ok) {
        if (!inline) onClose();
        else setSaving(false);
      }
    } catch (error) {
      console.error("Failed to save note:", error);
    } finally {
      setSaving(false);
    }
  }, "saveNote");
  if (inline) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: "8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.info, children: "Bu not sadece sen görebilirsin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.colorPicker, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Renk:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.colors, children: colors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setColor(c.name), "onClick"),
            style: {
              ...styles.colorButton,
              backgroundColor: c.value,
              ...color === c.name ? styles.colorButtonActive : {}
            }
          },
          c.name
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: note,
          onChange: /* @__PURE__ */ __name((e) => setNote(e.target.value), "onChange"),
          placeholder: "Notunu buraya yaz...",
          style: {
            ...styles.textarea,
            backgroundColor: colors.find((c) => c.name === color)?.value
          },
          maxLength: 500
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.charCount, children: [
          note.length,
          "/500"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: saveNote,
            disabled: saving,
            style: styles.saveButton,
            children: saving ? "Kaydediliyor..." : "💾 Kaydet"
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStickyNote, {}),
        " ",
        targetUser,
        " Hakkında Not"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.info, children: "Bu not sadece sen görebilirsin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.colorPicker, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Renk:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.colors, children: colors.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setColor(c.name), "onClick"),
            style: {
              ...styles.colorButton,
              backgroundColor: c.value,
              ...color === c.name ? styles.colorButtonActive : {}
            }
          },
          c.name
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: note,
          onChange: /* @__PURE__ */ __name((e) => setNote(e.target.value), "onChange"),
          placeholder: "Notunu buraya yaz...",
          style: {
            ...styles.textarea,
            backgroundColor: colors.find((c) => c.name === color)?.value
          },
          maxLength: 500
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.charCount, children: [
          note.length,
          "/500"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: saveNote,
            disabled: saving,
            style: styles.saveButton,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaSave, {}),
              " ",
              saving ? "Kaydediliyor..." : "Kaydet"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}, "UserNotesModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e3
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    width: "500px",
    maxWidth: "90vw",
    boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
  },
  header: {
    padding: "16px 20px",
    borderBottom: "1px solid #1e1f22",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    color: "#fff",
    fontSize: "18px",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    fontSize: "20px",
    cursor: "pointer",
    padding: "4px"
  },
  content: {
    padding: "20px"
  },
  info: {
    color: "#72767d",
    fontSize: "13px",
    marginBottom: "16px",
    fontStyle: "italic"
  },
  colorPicker: {
    marginBottom: "16px"
  },
  label: {
    color: "#b9bbbe",
    fontSize: "14px",
    marginBottom: "8px",
    display: "block"
  },
  colors: {
    display: "flex",
    gap: "8px"
  },
  colorButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "2px solid transparent",
    cursor: "pointer",
    transition: "transform 0.2s"
  },
  colorButtonActive: {
    border: "2px solid #5865f2",
    transform: "scale(1.1)"
  },
  textarea: {
    width: "100%",
    minHeight: "150px",
    padding: "12px",
    border: "1px solid #4e5058",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#1e1f22",
    resize: "vertical",
    fontFamily: "inherit",
    marginBottom: "12px"
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  charCount: {
    color: "#72767d",
    fontSize: "12px"
  },
  saveButton: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }
};
export {
  UserNotesModal as default
};

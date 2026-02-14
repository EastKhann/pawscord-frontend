var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { k as FaBell, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ReminderModal = /* @__PURE__ */ __name(({ messageId, messageContent, onClose, fetchWithAuth, apiBaseUrl }) => {
  const [reminderTime, setReminderTime] = reactExports.useState("");
  const [reminderNote, setReminderNote] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleCreate = /* @__PURE__ */ __name(async () => {
    if (!reminderTime) {
      toast.error("❌ Lütfen bir tarih seçin");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/reminders/create/`, {
        method: "POST",
        body: JSON.stringify({
          message_id: messageId,
          reminder_time: reminderTime,
          note: reminderNote || messageContent?.substring(0, 100)
        })
      });
      if (res.ok) {
        toast.success("✅ Hatırlatıcı oluşturuldu!");
        onClose();
      } else {
        const data = await res.json();
        toast.error("❌ Hata: " + (data.error || "Bilinmeyen hata"));
      }
    } catch (error) {
      console.error("Reminder error:", error);
      toast.error("❌ Hatırlatıcı oluşturulamadı");
    } finally {
      setLoading(false);
    }
  }, "handleCreate");
  const getPresetTime = /* @__PURE__ */ __name((hours) => {
    const now = /* @__PURE__ */ new Date();
    now.setHours(now.getHours() + hours);
    return now.toISOString().slice(0, 16);
  }, "getPresetTime");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, {}),
        " Hatırlatıcı Kur"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.messagePreview, children: [
        messageContent?.substring(0, 150),
        messageContent?.length > 150 && "..."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presets, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setReminderTime(getPresetTime(1)), "onClick"), style: styles.presetButton, children: "1 saat sonra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setReminderTime(getPresetTime(3)), "onClick"), style: styles.presetButton, children: "3 saat sonra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setReminderTime(getPresetTime(24)), "onClick"), style: styles.presetButton, children: "Yarın" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Tarih ve Saat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "datetime-local",
            value: reminderTime,
            onChange: /* @__PURE__ */ __name((e) => setReminderTime(e.target.value), "onChange"),
            style: styles.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Not (Opsiyonel)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: reminderNote,
            onChange: /* @__PURE__ */ __name((e) => setReminderNote(e.target.value), "onChange"),
            placeholder: "Hatırlatıcı için not ekle...",
            style: styles.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleCreate,
          disabled: loading || !reminderTime,
          style: {
            ...styles.createButton,
            opacity: loading || !reminderTime ? 0.5 : 1,
            cursor: loading || !reminderTime ? "not-allowed" : "pointer"
          },
          children: loading ? "Oluşturuluyor..." : "✅ Hatırlatıcı Oluştur"
        }
      )
    ] })
  ] }) });
}, "ReminderModal");
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
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  title: {
    color: "white",
    margin: 0,
    fontSize: "1.3em",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "1.3em",
    padding: "5px"
  },
  content: {
    padding: "20px"
  },
  messagePreview: {
    backgroundColor: "#40444b",
    padding: "12px",
    borderRadius: "4px",
    color: "#dcddde",
    fontSize: "0.9em",
    marginBottom: "15px",
    borderLeft: "3px solid #5865f2"
  },
  presets: {
    display: "flex",
    gap: "8px",
    marginBottom: "15px"
  },
  presetButton: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#40444b",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.85em"
  },
  inputGroup: {
    marginBottom: "15px"
  },
  label: {
    display: "block",
    color: "#b9bbbe",
    fontSize: "0.85em",
    marginBottom: "5px",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#40444b",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    color: "white",
    fontSize: "1em"
  },
  createButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
    fontSize: "1em"
  }
};
export {
  ReminderModal as default
};

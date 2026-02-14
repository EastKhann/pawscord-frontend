var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { z as FaClock, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
const ScheduledMessageModal = /* @__PURE__ */ __name(({ room, conversation, onClose, fetchWithAuth, apiBaseUrl }) => {
  const [message, setMessage] = reactExports.useState("");
  const [scheduledTime, setScheduledTime] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const handleSchedule = /* @__PURE__ */ __name(async () => {
    if (!message.trim()) {
      toast.error("❌ Mesaj boş olamaz");
      return;
    }
    if (!scheduledTime) {
      toast.error("❌ Lütfen bir tarih seçin");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/scheduled/create/`, {
        method: "POST",
        body: JSON.stringify({
          content: message,
          scheduled_time: scheduledTime,
          room_slug: room,
          conversation_id: conversation
        })
      });
      if (res.ok) {
        toast.success("✅ Mesaj plandı!");
        onClose();
      } else {
        const data = await res.json();
        toast.error("❌ Hata: " + (data.error || "Bilinmeyen hata"));
      }
    } catch (error) {
      console.error("Schedule error:", error);
      toast.error("❌ Mesaj planlanamadı");
    } finally {
      setLoading(false);
    }
  }, "handleSchedule");
  const getPresetTime = /* @__PURE__ */ __name((minutes) => {
    const now = /* @__PURE__ */ new Date();
    now.setMinutes(now.getMinutes() + minutes);
    return now.toISOString().slice(0, 16);
  }, "getPresetTime");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
        " Mesaj Planla"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.presets, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setScheduledTime(getPresetTime(5)), "onClick"), style: styles.presetButton, children: "5 dk sonra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setScheduledTime(getPresetTime(30)), "onClick"), style: styles.presetButton, children: "30 dk sonra" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setScheduledTime(getPresetTime(60)), "onClick"), style: styles.presetButton, children: "1 saat sonra" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Gönderilme Zamanı" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "datetime-local",
            value: scheduledTime,
            onChange: /* @__PURE__ */ __name((e) => setScheduledTime(e.target.value), "onChange"),
            style: styles.input
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Mesaj" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: message,
            onChange: /* @__PURE__ */ __name((e) => setMessage(e.target.value), "onChange"),
            placeholder: "Planlanacak mesajı yazın...",
            style: { ...styles.input, minHeight: "100px", resize: "vertical" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSchedule,
          disabled: loading || !message.trim() || !scheduledTime,
          style: {
            ...styles.scheduleButton,
            opacity: loading || !message.trim() || !scheduledTime ? 0.5 : 1,
            cursor: loading || !message.trim() || !scheduledTime ? "not-allowed" : "pointer"
          },
          children: loading ? "Planlanıyor..." : "⏰ Mesajı Planla"
        }
      )
    ] })
  ] }) });
}, "ScheduledMessageModal");
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
  scheduleButton: {
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
  ScheduledMessageModal as S
};

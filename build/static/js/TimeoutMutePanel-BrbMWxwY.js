var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { z as FaClock, a as FaTimes, G as FaVolumeUp } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const TimeoutMutePanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, roomSlug, userId, username, onClose }) => {
  const [duration, setDuration] = reactExports.useState("60");
  const [reason, setReason] = reactExports.useState("");
  const [processing, setProcessing] = reactExports.useState(false);
  const presetDurations = [
    { label: "1 Dakika", value: "1" },
    { label: "5 Dakika", value: "5" },
    { label: "10 Dakika", value: "10" },
    { label: "30 Dakika", value: "30" },
    { label: "1 Saat", value: "60" },
    { label: "6 Saat", value: "360" },
    { label: "12 Saat", value: "720" },
    { label: "24 Saat", value: "1440" },
    { label: "7 Gün", value: "10080" }
  ];
  const applyMute = /* @__PURE__ */ __name(async () => {
    if (!duration || parseInt(duration) <= 0) {
      toast.error("Geçerli bir süre girin");
      return;
    }
    try {
      setProcessing(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/mute/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_slug: roomSlug,
          user_id: userId,
          duration_minutes: parseInt(duration),
          reason
        })
      });
      if (response.ok) {
        toast.success(`${username} ${duration} dakika susturuldu`);
        onClose();
      } else {
        toast.error("Susturma başarısız oldu");
      }
    } catch (error) {
      console.error("Mute hatası:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setProcessing(false);
    }
  }, "applyMute");
  const removeMute = /* @__PURE__ */ __name(async () => {
    try {
      setProcessing(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/unmute/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_slug: roomSlug,
          user_id: userId
        })
      });
      if (response.ok) {
        toast.success(`${username} susturması kaldırıldı`);
        onClose();
      } else {
        toast.error("İşlem başarısız oldu");
      }
    } catch (error) {
      console.error("Unmute hatası:", error);
      toast.error("Bir hata oluştu");
    } finally {
      setProcessing(false);
    }
  }, "removeMute");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { margin: 0 }, children: [
          "Timeout - ",
          username
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.presets, children: presetDurations.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setDuration(preset.value), "onClick"),
          style: {
            ...styles.presetBtn,
            backgroundColor: duration === preset.value ? "#5865f2" : "#2c2f33"
          },
          children: preset.label
        },
        preset.value
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Özel Süre (dakika)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            value: duration,
            onChange: /* @__PURE__ */ __name((e) => setDuration(e.target.value), "onChange"),
            placeholder: "60",
            style: styles.input,
            min: "1"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Sebep (opsiyonel)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: reason,
            onChange: /* @__PURE__ */ __name((e) => setReason(e.target.value), "onChange"),
            placeholder: "Spam, kural ihlali, vb.",
            style: styles.textarea,
            rows: 3
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
        "⏰ Kullanıcı ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          duration,
          " dakika"
        ] }),
        " boyunca mesaj gönderemeyecek"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: removeMute, style: styles.unmuteBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, {}),
        " Susturmayı Kaldır"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: applyMute,
          disabled: processing,
          style: styles.muteBtn,
          children: processing ? "İşleniyor..." : "Timeout Uygula"
        }
      )
    ] })
  ] }) });
}, "TimeoutMutePanel");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #333"
  },
  closeBtn: {
    cursor: "pointer",
    fontSize: "24px",
    color: "#888"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "20px"
  },
  presets: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "20px"
  },
  presetBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  field: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    marginBottom: "8px",
    color: "#dcddde",
    fontSize: "14px",
    fontWeight: "600"
  },
  input: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px",
    resize: "vertical"
  },
  info: {
    backgroundColor: "#5865f21a",
    border: "1px solid #5865f2",
    borderRadius: "4px",
    padding: "15px",
    color: "#5865f2",
    fontSize: "14px",
    textAlign: "center"
  },
  footer: {
    display: "flex",
    gap: "10px",
    padding: "20px",
    borderTop: "1px solid #333"
  },
  unmuteBtn: {
    flex: 1,
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  muteBtn: {
    flex: 1,
    backgroundColor: "#faa61a",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  }
};
export {
  TimeoutMutePanel as default
};

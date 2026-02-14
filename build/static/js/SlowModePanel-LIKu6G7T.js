var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { z as FaClock, a as FaTimes, bo as FaToggleOn, bp as FaToggleOff } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const SlowModePanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, roomSlug, onClose }) => {
  const [slowMode, setSlowMode] = reactExports.useState({
    enabled: false,
    interval_seconds: 5
  });
  const [loading, setLoading] = reactExports.useState(true);
  const presetIntervals = [
    { label: "5 saniye", value: 5 },
    { label: "10 saniye", value: 10 },
    { label: "15 saniye", value: 15 },
    { label: "30 saniye", value: 30 },
    { label: "1 dakika", value: 60 },
    { label: "2 dakika", value: 120 },
    { label: "5 dakika", value: 300 },
    { label: "10 dakika", value: 600 },
    { label: "15 dakika", value: 900 }
  ];
  reactExports.useEffect(() => {
    loadSlowMode();
  }, []);
  const loadSlowMode = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/slowmode/`);
      if (response.ok) {
        const data = await response.json();
        if (data) setSlowMode(data);
      }
    } catch (error) {
      console.error("Slow mode yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadSlowMode");
  const saveSlowMode = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/slowmode/set/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_slug: roomSlug,
          ...slowMode
        })
      });
      if (response.ok) {
        toast.success("Slow mode ayarları kaydedildi");
        onClose();
      } else {
        toast.error("Ayarlar kaydedilemedi");
      }
    } catch (error) {
      console.error("Slow mode kaydetme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "saveSlowMode");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { color: "#faa61a" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Slow Mode" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toggle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toggleInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Slow Mode'u Etkinleştir" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.desc, children: "Kullanıcılar mesaj gönderdikten sonra belirli bir süre beklemek zorunda kalır" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setSlowMode({ ...slowMode, enabled: !slowMode.enabled }), "onClick"),
            style: styles.toggleBtn,
            children: slowMode.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "32px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#888", fontSize: "32px" } })
          }
        )
      ] }),
      slowMode.enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Mesajlar Arası Bekleme Süresi" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.presetGrid, children: presetIntervals.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => setSlowMode({ ...slowMode, interval_seconds: preset.value }), "onClick"),
              style: {
                ...styles.presetBtn,
                backgroundColor: slowMode.interval_seconds === preset.value ? "#5865f2" : "#2c2f33"
              },
              children: preset.label
            },
            preset.value
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.field, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Özel Süre (saniye)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "number",
              value: slowMode.interval_seconds,
              onChange: /* @__PURE__ */ __name((e) => setSlowMode({ ...slowMode, interval_seconds: parseInt(e.target.value) || 0 }), "onChange"),
              min: "1",
              max: "21600",
              style: styles.input
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
          "⏱️ Kullanıcılar her ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
            slowMode.interval_seconds,
            " saniye"
          ] }),
          "'de bir mesaj gönderebilecek"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.footer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.cancelBtn, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveSlowMode, style: styles.saveBtn, children: "Kaydet" })
    ] })
  ] }) });
}, "SlowModePanel");
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
  toggle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  toggleInfo: {
    flex: 1
  },
  desc: {
    fontSize: "13px",
    color: "#888",
    margin: "6px 0 0 0"
  },
  toggleBtn: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0"
  },
  field: {
    marginBottom: "20px"
  },
  label: {
    display: "block",
    marginBottom: "12px",
    color: "#dcddde",
    fontSize: "14px",
    fontWeight: "600"
  },
  presetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "15px"
  },
  presetBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.2s"
  },
  input: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
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
  cancelBtn: {
    flex: 1,
    backgroundColor: "#2c2f33",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600"
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "#43b581",
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
  SlowModePanel as default
};

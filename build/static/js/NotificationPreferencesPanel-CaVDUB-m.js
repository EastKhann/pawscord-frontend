var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { k as FaBell, a as FaTimes, bo as FaToggleOn, bp as FaToggleOff, z as FaClock } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const NotificationPreferencesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const [preferences, setPreferences] = reactExports.useState({
    all_messages: true,
    mentions_only: false,
    direct_messages: true,
    server_notifications: true,
    keyword_notifications: [],
    muted_channels: [],
    muted_servers: [],
    sound_enabled: true,
    desktop_enabled: true,
    email_enabled: false,
    dnd_enabled: false,
    dnd_start: "22:00",
    dnd_end: "08:00"
  });
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadPreferences();
  }, []);
  const loadPreferences = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/notifications/preferences/`);
      if (response.ok) {
        const data = await response.json();
        setPreferences({ ...preferences, ...data });
      }
    } catch (error) {
      console.error("Tercih yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  }, "loadPreferences");
  const savePreferences = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/notifications/preferences/update/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences)
      });
      if (response.ok) {
        toast.success("Tercihler kaydedildi");
      } else {
        toast.error("Tercihler kaydedilemedi");
      }
    } catch (error) {
      console.error("Kaydetme hatası:", error);
      toast.error("Bir hata oluştu");
    }
  }, "savePreferences");
  const togglePref = /* @__PURE__ */ __name((key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  }, "togglePref");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBell, { style: { color: "#43b581" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0 }, children: "Bildirim Tercihleri" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { onClick: onClose, style: styles.closeBtn })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Mesaj Bildirimleri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Tüm Mesajlar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.settingDesc, children: "Her yeni mesajdan bildirim al" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => togglePref("all_messages"), "onClick"),
              style: styles.toggle,
              children: preferences.all_messages ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "32px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#888", fontSize: "32px" } })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Sadece Mention'lar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.settingDesc, children: "Yalnızca etiketlendiğinizde bildirim" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => togglePref("mentions_only"), "onClick"),
              style: styles.toggle,
              children: preferences.mentions_only ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "32px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#888", fontSize: "32px" } })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Direkt Mesajlar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.settingDesc, children: "DM'lerden bildirim al" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => togglePref("direct_messages"), "onClick"),
              style: styles.toggle,
              children: preferences.direct_messages ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "32px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#888", fontSize: "32px" } })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Bildirim Kanalları" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Ses Bildirimleri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.settingDesc, children: "Bildirim geldiğinde ses çal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => togglePref("sound_enabled"), "onClick"),
              style: styles.toggle,
              children: preferences.sound_enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "32px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#888", fontSize: "32px" } })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Masaüstü Bildirimleri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.settingDesc, children: "Tarayıcı bildirimleri" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => togglePref("desktop_enabled"), "onClick"),
              style: styles.toggle,
              children: preferences.desktop_enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "32px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#888", fontSize: "32px" } })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Email Bildirimleri" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.settingDesc, children: "Önemli bildirimleri email'le al" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => togglePref("email_enabled"), "onClick"),
              style: styles.toggle,
              children: preferences.email_enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "32px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#888", fontSize: "32px" } })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { marginRight: "8px" } }),
          "Rahatsız Etme Saatleri"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Rahatsız Etme Modu" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.settingDesc, children: "Belirli saatlerde bildirimleri kapat" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => togglePref("dnd_enabled"), "onClick"),
              style: styles.toggle,
              children: preferences.dnd_enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { color: "#43b581", fontSize: "32px" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { color: "#888", fontSize: "32px" } })
            }
          )
        ] }),
        preferences.dnd_enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timeRange, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timeInput, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Başlangıç:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "time",
                value: preferences.dnd_start,
                onChange: /* @__PURE__ */ __name((e) => setPreferences({ ...preferences, dnd_start: e.target.value }), "onChange"),
                style: styles.input
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timeInput, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Bitiş:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "time",
                value: preferences.dnd_end,
                onChange: /* @__PURE__ */ __name((e) => setPreferences({ ...preferences, dnd_end: e.target.value }), "onChange"),
                style: styles.input
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.footer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: savePreferences, style: styles.saveBtn, children: "Kaydet" }) })
  ] }) });
}, "NotificationPreferencesPanel");
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
  section: {
    marginBottom: "30px"
  },
  sectionTitle: {
    color: "#5865f2",
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center"
  },
  setting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  settingInfo: {
    flex: 1
  },
  settingDesc: {
    fontSize: "12px",
    color: "#888",
    margin: "4px 0 0 0"
  },
  toggle: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0"
  },
  timeRange: {
    display: "flex",
    gap: "20px",
    padding: "15px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    marginTop: "10px"
  },
  timeInput: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  input: {
    padding: "8px",
    backgroundColor: "#1e1e1e",
    border: "1px solid #444",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "14px"
  },
  footer: {
    padding: "20px",
    borderTop: "1px solid #333"
  },
  saveBtn: {
    width: "100%",
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
  NotificationPreferencesPanel as default
};

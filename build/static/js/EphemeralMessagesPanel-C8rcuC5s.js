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
const EphemeralMessagesPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
  const [settings, setSettings] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [ttl, setTtl] = reactExports.useState(3600);
  const ttlOptions = [
    { value: 300, label: "5 minutes" },
    { value: 600, label: "10 minutes" },
    { value: 1800, label: "30 minutes" },
    { value: 3600, label: "1 hour" },
    { value: 7200, label: "2 hours" },
    { value: 14400, label: "4 hours" },
    { value: 28800, label: "8 hours" },
    { value: 86400, label: "24 hours" },
    { value: 604800, label: "7 days" }
  ];
  reactExports.useEffect(() => {
    fetchSettings();
  }, [roomSlug]);
  const fetchSettings = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/ephemeral/`);
      const data = await response.json();
      setSettings(data);
      if (data.ttl) setTtl(data.ttl);
    } catch (error) {
      toast.error("Failed to load ephemeral settings");
    } finally {
      setLoading(false);
    }
  }, "fetchSettings");
  const toggleEphemeral = /* @__PURE__ */ __name(async () => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/ephemeral/set/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enabled: !settings?.enabled,
          ttl
        })
      });
      toast.success(`Ephemeral messages ${!settings?.enabled ? "enabled" : "disabled"}`);
      fetchSettings();
    } catch (error) {
      toast.error("Failed to update settings");
    }
  }, "toggleEphemeral");
  const updateTTL = /* @__PURE__ */ __name(async (newTTL) => {
    setTtl(newTTL);
    if (settings?.enabled) {
      try {
        await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/ephemeral/set/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enabled: true,
            ttl: newTTL
          })
        });
        toast.success("Auto-delete time updated");
        fetchSettings();
      } catch (error) {
        toast.error("Failed to update TTL");
      }
    }
  }, "updateTTL");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Auto-Delete Messages" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading settings..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toggleSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toggleLabel, children: "Enable Auto-Delete" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toggleDescription, children: "Messages will automatically delete after the specified time" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: toggleEphemeral, style: styles.toggleButton, children: settings?.enabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOn, { style: { fontSize: "32px", color: "#43b581" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaToggleOff, { style: { fontSize: "32px", color: "#99aab5" } }) })
      ] }),
      settings?.enabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.ttlSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.label, children: "Auto-Delete After" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.optionsGrid, children: ttlOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => updateTTL(option.value), "onClick"),
            style: {
              ...styles.optionButton,
              ...ttl === option.value && styles.optionButtonActive
            },
            children: option.label
          },
          option.value
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.info, children: [
          "⏱️ Current setting: Messages auto-delete after",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: ttlOptions.find((o) => o.value === ttl)?.label || `${ttl} seconds` })
        ] })
      ] }),
      !settings?.enabled && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.disabledMessage, children: "Ephemeral messages are currently disabled. Enable them to automatically delete messages after a set time period." })
    ] }) })
  ] }) });
}, "EphemeralMessagesPanel");
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
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  toggleSection: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  toggleLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  toggleDescription: {
    fontSize: "13px",
    color: "#99aab5"
  },
  toggleButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "5px"
  },
  ttlSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#dcddde"
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px"
  },
  optionButton: {
    padding: "12px",
    backgroundColor: "#2c2f33",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.2s"
  },
  optionButtonActive: {
    backgroundColor: "#5865f2"
  },
  info: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "12px",
    fontSize: "14px",
    color: "#dcddde",
    textAlign: "center"
  },
  disabledMessage: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "20px",
    fontSize: "14px",
    color: "#99aab5",
    textAlign: "center"
  }
};
export {
  EphemeralMessagesPanel as default
};

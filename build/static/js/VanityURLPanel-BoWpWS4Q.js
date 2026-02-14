var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { j as FaLink, a as FaTimes, a9 as FaCheck, aB as FaHistory } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const VanityURLPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [vanityUrl, setVanityUrl] = reactExports.useState("");
  const [currentVanity, setCurrentVanity] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const [checking, setChecking] = reactExports.useState(false);
  const [available, setAvailable] = reactExports.useState(null);
  reactExports.useEffect(() => {
    fetchVanity();
  }, []);
  const fetchVanity = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/vanity/get/${serverId}/`);
      const data = await response.json();
      setCurrentVanity(data.vanity_url);
      setHistory(data.history || []);
    } catch (error) {
    }
  }, "fetchVanity");
  const checkAvailability = /* @__PURE__ */ __name(async (url) => {
    if (!url || url.length < 3) {
      setAvailable(null);
      return;
    }
    setChecking(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/vanity/check/?url=${url}`);
      const data = await response.json();
      setAvailable(data.available);
    } catch (error) {
      setAvailable(false);
    } finally {
      setChecking(false);
    }
  }, "checkAvailability");
  const setVanity = /* @__PURE__ */ __name(async () => {
    if (!vanityUrl || vanityUrl.length < 3) {
      toast.error("Vanity URL must be at least 3 characters");
      return;
    }
    if (!available) {
      toast.error("This vanity URL is not available");
      return;
    }
    try {
      await fetchWithAuth(`${apiBaseUrl}/vanity/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          server_id: serverId,
          vanity_url: vanityUrl
        })
      });
      toast.success("Vanity URL set successfully");
      setVanityUrl("");
      setAvailable(null);
      fetchVanity();
    } catch (error) {
      toast.error("Failed to set vanity URL");
    }
  }, "setVanity");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Vanity URL" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      currentVanity && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.currentSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.label, children: "Current Vanity URL:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.currentUrl, children: [
          "pawscord.com/",
          currentVanity
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.label, children: "Set New Vanity URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.prefix, children: "pawscord.com/" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: vanityUrl,
              onChange: /* @__PURE__ */ __name((e) => {
                const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "");
                setVanityUrl(val);
                checkAvailability(val);
              }, "onChange"),
              placeholder: "my-server",
              style: styles.input,
              maxLength: 32
            }
          ),
          checking && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.checking, children: "Checking..." }),
          !checking && available === true && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { color: "#43b581", fontSize: "20px" } }),
          !checking && available === false && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.unavailable, children: "Unavailable" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.hint, children: "3-32 characters, letters, numbers, and hyphens only" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: setVanity,
            disabled: !available,
            style: {
              ...styles.setButton,
              ...!available && styles.setButtonDisabled
            },
            children: "Set Vanity URL"
          }
        )
      ] }),
      history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sectionTitle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { style: { marginRight: "8px" } }),
          "History"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.historyList, children: history.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.historyItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.historyUrl, children: item.vanity_url }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.historyDate, children: new Date(item.created_at).toLocaleDateString() })
        ] }, idx)) })
      ] })
    ] })
  ] }) });
}, "VanityURLPanel");
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
  currentSection: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "24px"
  },
  currentUrl: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#5865f2",
    fontFamily: "monospace"
  },
  section: {
    marginBottom: "24px"
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#dcddde",
    marginBottom: "8px"
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#2c2f33",
    borderRadius: "4px",
    padding: "10px 12px"
  },
  prefix: {
    fontSize: "14px",
    color: "#99aab5"
  },
  input: {
    flex: 1,
    background: "none",
    border: "none",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none"
  },
  checking: {
    fontSize: "12px",
    color: "#faa61a"
  },
  unavailable: {
    fontSize: "12px",
    color: "#f04747"
  },
  hint: {
    fontSize: "12px",
    color: "#99aab5",
    marginTop: "8px",
    marginBottom: "16px"
  },
  setButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600"
  },
  setButtonDisabled: {
    backgroundColor: "#2c2f33",
    cursor: "not-allowed"
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#dcddde",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center"
  },
  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  historyItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "4px",
    padding: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  historyUrl: {
    fontSize: "14px",
    color: "#dcddde",
    fontFamily: "monospace"
  },
  historyDate: {
    fontSize: "12px",
    color: "#99aab5"
  }
};
export {
  VanityURLPanel as default
};

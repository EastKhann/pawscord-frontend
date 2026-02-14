var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { d as FaExclamationTriangle, ay as FaBan, a0 as FaEye, a1 as FaShieldAlt, w as FaCheckCircle } from "./icons-vendor-2VDeY8fW.js";
import { a as axios } from "./index-BnLT0o6q.js";
import { g as getApiBase, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const getStyles = /* @__PURE__ */ __name((isMobile) => ({
  container: { padding: isMobile ? "16px" : "24px", maxWidth: "1200px", margin: "0 auto" },
  header: { marginBottom: "32px" },
  title: { fontSize: isMobile ? "24px" : "32px", fontWeight: "700", color: "rgba(255,255,255,0.95)", display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" },
  subtitle: { fontSize: isMobile ? "14px" : "16px", color: "rgba(255,255,255,0.6)" },
  statsGrid: { display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" },
  statCard: { background: "linear-gradient(135deg, rgba(88,101,242,0.1), rgba(114,137,218,0.1))", border: "1px solid rgba(88,101,242,0.3)", borderRadius: "12px", padding: "20px", textAlign: "center" },
  statValue: { fontSize: isMobile ? "24px" : "32px", fontWeight: "700", color: "#5865f2", marginBottom: "8px" },
  statLabel: { fontSize: "14px", color: "rgba(255,255,255,0.7)" },
  section: { background: "rgba(30,31,34,0.6)", border: "1px solid rgba(88,101,242,0.2)", borderRadius: "16px", padding: isMobile ? "20px" : "24px", marginBottom: "24px" },
  sectionTitle: { fontSize: "20px", fontWeight: "600", color: "rgba(255,255,255,0.9)", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" },
  setting: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid rgba(88,101,242,0.1)" },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: "16px", fontWeight: "500", color: "rgba(255,255,255,0.9)", marginBottom: "4px" },
  settingDesc: { fontSize: "13px", color: "rgba(255,255,255,0.6)" },
  switch: /* @__PURE__ */ __name((on) => ({ width: "56px", height: "32px", background: on ? "linear-gradient(135deg, #43b581, #4caf50)" : "rgba(255,255,255,0.2)", borderRadius: "16px", position: "relative", cursor: "pointer", transition: "all 0.3s ease", border: "2px solid rgba(88,101,242,0.3)" }), "switch"),
  switchKnob: /* @__PURE__ */ __name((on) => ({ width: "26px", height: "26px", background: "white", borderRadius: "50%", position: "absolute", top: "1px", left: on ? "26px" : "1px", transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }), "switchKnob"),
  slider: { width: "100%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.2)", outline: "none", marginTop: "8px" },
  flagsList: { display: "flex", flexDirection: "column", gap: "12px" },
  flagCard: { background: "rgba(0,0,0,0.3)", border: "1px solid rgba(218,55,60,0.4)", borderRadius: "12px", padding: "16px" },
  flagHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" },
  flagType: /* @__PURE__ */ __name((type) => ({ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", background: type === "spam" ? "rgba(218,55,60,0.2)" : type === "nsfw" ? "rgba(240,183,50,0.2)" : "rgba(88,101,242,0.2)", color: type === "spam" ? "#da373c" : type === "nsfw" ? "#f0b732" : "#5865f2" }), "flagType"),
  flagMessage: { background: "rgba(0,0,0,0.4)", padding: "12px", borderRadius: "8px", color: "rgba(255,255,255,0.8)", fontSize: "14px", marginBottom: "12px", fontFamily: "monospace" },
  flagActions: { display: "flex", gap: "8px", flexWrap: "wrap" },
  actionBtn: /* @__PURE__ */ __name((type) => ({ padding: "8px 16px", borderRadius: "6px", fontSize: "14px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", transition: "all 0.2s ease", minHeight: "36px", background: type === "delete" ? "rgba(218,55,60,0.2)" : type === "timeout" ? "rgba(240,183,50,0.2)" : "rgba(67,181,129,0.2)", color: type === "delete" ? "#da373c" : type === "timeout" ? "#f0b732" : "#43b581", border: `1px solid ${type === "delete" ? "rgba(218,55,60,0.4)" : type === "timeout" ? "rgba(240,183,50,0.4)" : "rgba(67,181,129,0.4)"}` }), "actionBtn"),
  saveBtn: { width: "100%", padding: "16px", background: "linear-gradient(135deg, #5865f2, #7289da)", border: "none", borderRadius: "12px", color: "white", fontSize: "16px", fontWeight: "600", cursor: "pointer", marginTop: "24px", transition: "all 0.2s ease", minHeight: "48px" }
}), "getStyles");
const DEFAULT_SETTINGS = {
  spamDetection: true,
  profanityFilter: true,
  nsfwDetection: true,
  toxicityThreshold: 70,
  autoTimeout: false,
  autoDelete: false,
  warningCount: 3
};
const useAIModeration = /* @__PURE__ */ __name((serverSlug, token) => {
  const [settings, setSettings] = reactExports.useState(DEFAULT_SETTINGS);
  const [recentFlags, setRecentFlags] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState({ messagesScanned: 0, flaggedToday: 0, autoModActions: 0, accuracy: 0 });
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const loadModeration = /* @__PURE__ */ __name(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${getApiBase()}/moderation/${serverSlug}/`, { headers: { Authorization: `Bearer ${token}` } });
      if (response.data.settings) setSettings(response.data.settings);
      if (response.data.recent_flags) setRecentFlags(response.data.recent_flags);
      if (response.data.stats) setStats(response.data.stats);
    } catch (error) {
      console.error("Failed to load moderation:", error);
    } finally {
      setIsLoading(false);
    }
  }, "loadModeration");
  reactExports.useEffect(() => {
    loadModeration();
  }, []);
  const saveSettings = /* @__PURE__ */ __name(async () => {
    try {
      await axios.post(`${getApiBase()}/moderation/${serverSlug}/update/`, { settings }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("✅ Moderation settings saved!");
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error("❌ Failed to save settings");
    }
  }, "saveSettings");
  const handleAction = /* @__PURE__ */ __name(async (flagId, action) => {
    try {
      await axios.post(`${getApiBase()}/moderation/flag/${flagId}/action/`, { action }, { headers: { Authorization: `Bearer ${token}` } });
      loadModeration();
    } catch (error) {
      console.error("Action failed:", error);
    }
  }, "handleAction");
  return { settings, setSettings, recentFlags, stats, isLoading, saveSettings, handleAction };
}, "useAIModeration");
const FlagCard = /* @__PURE__ */ __name(({ flag, styles, onAction }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.flagCard, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.flagHeader, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.flagType(flag.type), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
        " ",
        flag.type.toUpperCase()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "8px" }, children: [
        flag.user,
        " ",
        "•",
        " ",
        flag.timestamp
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "18px", fontWeight: "700", color: flag.confidence > 80 ? "#da373c" : "#f0b732" }, children: [
      flag.confidence,
      "%"
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.flagMessage, children: flag.message }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.flagActions, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => onAction(flag.id, "delete"), "onClick"), style: styles.actionBtn("delete"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaBan, {}),
      " Delete"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => onAction(flag.id, "timeout"), "onClick"), style: styles.actionBtn("timeout"), children: "Timeout User" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => onAction(flag.id, "dismiss"), "onClick"), style: styles.actionBtn("dismiss"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}),
      " Dismiss"
    ] })
  ] })
] }), "FlagCard");
const TOGGLES = [
  { key: "spamDetection", label: "Spam Detection", desc: "Detect repeated or mass messages" },
  { key: "profanityFilter", label: "Profanity Filter", desc: "Block offensive language" },
  { key: "nsfwDetection", label: "NSFW Detection", desc: "Detect inappropriate images" }
];
const STAT_ITEMS = [
  { key: "messagesScanned", label: "Messages Scanned", fmt: /* @__PURE__ */ __name((v) => v.toLocaleString(), "fmt") },
  { key: "flaggedToday", label: "Flagged Today" },
  { key: "autoModActions", label: "Auto Actions" },
  { key: "accuracy", label: "Accuracy", suffix: "%" }
];
const AIModerationPanel = /* @__PURE__ */ __name(({ serverSlug, token, isMobile }) => {
  const { settings, setSettings, recentFlags, stats, saveSettings, handleAction } = useAIModeration(serverSlug, token);
  const styles = getStyles(isMobile);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: styles.title, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, {}),
        " AI Moderation"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.subtitle, children: "Automated content filtering powered by machine learning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statsGrid, children: STAT_ITEMS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statValue, children: [
        s.fmt ? s.fmt(stats[s.key]) : stats[s.key],
        s.suffix || ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: s.label })
    ] }, s.key)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.sectionTitle, children: [
        "⚙️",
        " Detection Settings"
      ] }),
      TOGGLES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingLabel, children: t.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: t.desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.switch(settings[t.key]), onClick: /* @__PURE__ */ __name(() => setSettings({ ...settings, [t.key]: !settings[t.key] }), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.switchKnob(settings[t.key]) }) })
      ] }, t.key)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingLabel, children: [
            "Toxicity Threshold: ",
            settings.toxicityThreshold,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Sensitivity level for toxic content" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "0", max: "100", value: settings.toxicityThreshold, onChange: /* @__PURE__ */ __name((e) => setSettings({ ...settings, toxicityThreshold: parseInt(e.target.value) }), "onChange"), style: styles.slider })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.sectionTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
        " Recent Flags (",
        recentFlags.length,
        ")"
      ] }),
      recentFlags.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", padding: "40px", color: "rgba(255,255,255,0.5)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { size: 48 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginTop: "16px" }, children: "No recent violations detected" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.flagsList, children: recentFlags.map((flag) => /* @__PURE__ */ jsxRuntimeExports.jsx(FlagCard, { flag, styles, onAction: handleAction }, flag.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: saveSettings, style: styles.saveBtn, children: [
      "💾",
      " Save Settings"
    ] })
  ] });
}, "AIModerationPanel");
export {
  AIModerationPanel as default
};

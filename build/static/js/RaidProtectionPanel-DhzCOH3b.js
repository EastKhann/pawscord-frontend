var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a1 as FaShieldAlt, a as FaTimes, aC as FaUserSlash, bq as FaBolt, aL as FaExclamationCircle, aE as FaChartBar, az as FaCog } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const useRaidProtection = /* @__PURE__ */ __name((serverId, fetchWithAuth, apiBaseUrl) => {
  const [protection, setProtection] = reactExports.useState({
    enabled: false,
    join_rate_limit: 10,
    new_account_age: 7,
    verification_level: "medium",
    auto_kick_suspicious: true,
    lockdown_mode: false
  });
  const [raidActivity, setRaidActivity] = reactExports.useState([]);
  const [stats, setStats] = reactExports.useState({
    blocked_joins: 0,
    kicked_users: 0,
    raid_attempts: 0,
    last_raid: null
  });
  const [loading, setLoading] = reactExports.useState(true);
  const loadProtection = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/${serverId}/`);
      if (res.ok) setProtection(await res.json());
    } catch (error) {
      console.error("Failed to load raid protection:", error);
    }
    setLoading(false);
  }, "loadProtection");
  const checkRaidActivity = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/check/`, {
        method: "POST",
        body: JSON.stringify({ server_id: serverId })
      });
      if (res.ok) {
        const data = await res.json();
        setRaidActivity(data.recent_activity || []);
        if (data.raid_detected) {
          toast.error(`⚠️ RAID DETECTED!
${data.message}

Automatic protection activated.`);
        }
      }
    } catch (error) {
      console.error("Failed to check raid activity:", error);
    }
  }, "checkRaidActivity");
  reactExports.useEffect(() => {
    loadProtection();
    checkRaidActivity();
    const interval = setInterval(checkRaidActivity, 3e4);
    return () => clearInterval(interval);
  }, [serverId]);
  const toggleProtection = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/enable/`, {
        method: "POST",
        body: JSON.stringify({ server_id: serverId, enabled: !protection.enabled })
      });
      if (res.ok) setProtection({ ...protection, enabled: !protection.enabled });
    } catch (error) {
      console.error("Failed to toggle raid protection:", error);
    }
  }, "toggleProtection");
  const updateSetting = /* @__PURE__ */ __name(async (key, value) => {
    const updated = { ...protection, [key]: value };
    setProtection(updated);
    try {
      await fetchWithAuth(`${apiBaseUrl}/moderation/raid-protection/update/`, {
        method: "POST",
        body: JSON.stringify({ server_id: serverId, ...updated })
      });
    } catch (error) {
      console.error("Failed to update setting:", error);
    }
  }, "updateSetting");
  const activateLockdown = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("⚠️ LOCKDOWN MODE\n\nThis will:\n- Block all new joins\n- Require manual approval for each user\n- Kick suspicious accounts\n\nActivate?")) return;
    try {
      await updateSetting("lockdown_mode", true);
      toast.success("🔒 Lockdown Mode Activated!");
    } catch (error) {
      console.error("Failed to activate lockdown:", error);
    }
  }, "activateLockdown");
  return {
    protection,
    raidActivity,
    stats,
    loading,
    toggleProtection,
    updateSetting,
    activateLockdown
  };
}, "useRaidProtection");
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
    zIndex: 1e4,
    backdropFilter: "blur(5px)"
  },
  panel: {
    backgroundColor: "#2b2d31",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "900px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #1e1f22"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  headerIcon: { fontSize: "24px" },
  title: { margin: 0, color: "#fff", fontSize: "24px", fontWeight: "600" },
  lockdownBadge: {
    backgroundColor: "#ed4245",
    color: "#fff",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "700",
    animation: "pulse 1.5s infinite"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "24px",
    padding: "8px",
    borderRadius: "4px"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    padding: "20px",
    borderBottom: "1px solid #1e1f22"
  },
  statCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center"
  },
  statIcon: { fontSize: "32px", marginBottom: "8px" },
  statValue: { fontSize: "28px", fontWeight: "bold", color: "#fff", marginBottom: "4px" },
  statLabel: { fontSize: "13px", color: "#b9bbbe" },
  section: {
    padding: "20px",
    borderBottom: "1px solid #1e1f22",
    overflowY: "auto"
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  masterSwitch: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer"
  },
  switchSlider: {
    position: "relative",
    width: "48px",
    height: "24px",
    backgroundColor: "#72767d",
    borderRadius: "24px",
    transition: "0.3s"
  },
  switchLabel: { color: "#fff", fontSize: "14px", fontWeight: "600" },
  settings: { display: "flex", flexDirection: "column", gap: "20px" },
  setting: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#1e1f22",
    borderRadius: "8px"
  },
  settingInfo: { flex: 1 },
  settingLabel: { color: "#fff", fontSize: "15px", fontWeight: "600", marginBottom: "4px" },
  settingDesc: { color: "#b9bbbe", fontSize: "13px" },
  slider: { width: "200px", marginLeft: "20px" },
  select: {
    backgroundColor: "#2b2d31",
    border: "1px solid #1e1f22",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#fff",
    fontSize: "14px",
    marginLeft: "20px",
    minWidth: "150px"
  },
  toggleSwitch: {
    position: "relative",
    width: "48px",
    height: "24px",
    marginLeft: "20px"
  },
  toggleSlider: {
    position: "absolute",
    cursor: "pointer",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#72767d",
    transition: "0.3s",
    borderRadius: "24px"
  },
  lockdownBtn: {
    backgroundColor: "#ed4245",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "20px"
  },
  lockdownDeactivateBtn: {
    backgroundColor: "#43b581",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    marginLeft: "20px"
  },
  activityList: { display: "flex", flexDirection: "column", gap: "12px" },
  empty: { textAlign: "center", color: "#b9bbbe", padding: "40px", fontSize: "14px" },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#1e1f22",
    borderRadius: "6px"
  },
  activityIcon: { fontSize: "24px" },
  activityContent: { flex: 1 },
  activityText: { color: "#fff", fontSize: "14px", marginBottom: "4px" },
  activityTime: { color: "#72767d", fontSize: "12px" },
  activityAction: { marginLeft: "auto" },
  actionBadge: {
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: "#5865f2",
    color: "#fff"
  },
  infoBox: {
    display: "flex",
    gap: "16px",
    padding: "20px",
    backgroundColor: "rgba(88, 101, 242, 0.1)",
    borderTop: "1px solid #5865f2"
  },
  infoIcon: { fontSize: "24px", color: "#5865f2", marginTop: "4px" },
  infoContent: { color: "#fff", fontSize: "14px" },
  infoList: { margin: "8px 0 0 0", paddingLeft: "20px", color: "#b9bbbe" }
};
const RaidProtectionPanel = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl, onClose }) => {
  const r = useRaidProtection(serverId, fetchWithAuth, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: { ...styles.headerIcon, color: r.protection.enabled ? "#43b581" : "#72767d" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Raid Protection" }),
        r.protection.lockdown_mode && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.lockdownBadge, children: [
          "🔒",
          " LOCKDOWN"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserSlash, { style: { ...styles.statIcon, color: "#ed4245" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: r.stats.blocked_joins }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Blocked Joins" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBolt, { style: { ...styles.statIcon, color: "#f0b132" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: r.stats.kicked_users }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Auto-Kicked" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationCircle, { style: { ...styles.statIcon, color: "#f04747" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: r.stats.raid_attempts }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Raid Attempts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, { style: { ...styles.statIcon, color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: r.protection.enabled ? "ACTIVE" : "OFF" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Status" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sectionHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}),
          " Protection Settings"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.masterSwitch, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: r.protection.enabled, onChange: r.toggleProtection }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.switchSlider }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.switchLabel, children: r.protection.enabled ? "Enabled" : "Disabled" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settings, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingLabel, children: "Join Rate Limit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingDesc, children: [
              "Maximum users per minute: ",
              r.protection.join_rate_limit
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: "5",
              max: "50",
              value: r.protection.join_rate_limit,
              onChange: /* @__PURE__ */ __name((e) => r.updateSetting("join_rate_limit", parseInt(e.target.value)), "onChange"),
              style: styles.slider,
              disabled: !r.protection.enabled
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingLabel, children: "New Account Age Limit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingDesc, children: [
              "Block accounts younger than ",
              r.protection.new_account_age,
              " days"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: r.protection.new_account_age,
              onChange: /* @__PURE__ */ __name((e) => r.updateSetting("new_account_age", parseInt(e.target.value)), "onChange"),
              style: styles.select,
              disabled: !r.protection.enabled,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1", children: "1 day" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "3", children: "3 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7", children: "7 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "14", children: "14 days" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30", children: "30 days" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingLabel, children: "Verification Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingDesc, children: [
              r.protection.verification_level === "low" && "Basic: Email verification",
              r.protection.verification_level === "medium" && "Medium: Email + Phone",
              r.protection.verification_level === "high" && "High: Email + Phone + Captcha"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: r.protection.verification_level,
              onChange: /* @__PURE__ */ __name((e) => r.updateSetting("verification_level", e.target.value), "onChange"),
              style: styles.select,
              disabled: !r.protection.enabled,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Low" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medium", children: "Medium" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "High" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingLabel, children: "Auto-Kick Suspicious Accounts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Automatically kick accounts flagged as suspicious" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.toggleSwitch, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "checkbox",
                checked: r.protection.auto_kick_suspicious,
                onChange: /* @__PURE__ */ __name((e) => r.updateSetting("auto_kick_suspicious", e.target.checked), "onChange"),
                disabled: !r.protection.enabled
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.toggleSlider })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.setting, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingLabel, children: [
              "🔒",
              " Lockdown Mode"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.settingDesc, children: "Block ALL new joins (emergency mode)" })
          ] }),
          r.protection.lockdown_mode ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => r.updateSetting("lockdown_mode", false), "onClick"), style: styles.lockdownDeactivateBtn, children: "Deactivate" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: r.activateLockdown, style: styles.lockdownBtn, disabled: !r.protection.enabled, children: "Activate" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBolt, {}),
        " Recent Activity"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityList, children: r.raidActivity.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No suspicious activity detected" }) : r.raidActivity.map((activity, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.activityItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityIcon, children: activity.type === "raid" ? "⚠️" : activity.type === "suspicious" ? "👀" : "✅" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.activityContent, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityText, children: activity.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityTime, children: new Date(activity.timestamp).toLocaleString() })
        ] }),
        activity.action && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityAction, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.actionBadge, children: activity.action }) })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoBox, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: styles.infoIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.infoContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "How Raid Protection Works:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles.infoList, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Monitors join rate (users per minute)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Checks account age and activity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Auto-kicks suspicious patterns" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Activates lockdown during active raids" })
        ] })
      ] })
    ] })
  ] }) });
}, "RaidProtectionPanel");
export {
  RaidProtectionPanel as default
};

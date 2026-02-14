var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { ao as FaRocket, a as FaTimes, aB as FaHistory, bC as FaGift, ah as FaCrown, u as FaUsers, Q as FaStar } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
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
    maxWidth: "800px",
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
  headerLeft: { display: "flex", alignItems: "center" },
  title: { margin: 0, fontSize: "20px", color: "#ffffff" },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  tabs: { display: "flex", borderBottom: "1px solid #2c2f33", padding: "0 20px" },
  tab: {
    padding: "12px 20px",
    backgroundColor: "transparent",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s"
  },
  tabActive: { color: "#5865f2", borderBottom: "2px solid #5865f2" },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  loading: { textAlign: "center", color: "#99aab5", padding: "40px" },
  overview: { display: "flex", flexDirection: "column", gap: "20px" },
  boostCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  boostLevel: { textAlign: "center", padding: "24px", borderRadius: "8px", color: "#ffffff" },
  levelText: { fontSize: "24px", fontWeight: "600", marginTop: "8px" },
  boostCountText: { fontSize: "14px", opacity: 0.9, marginTop: "4px" },
  progressSection: { display: "flex", flexDirection: "column", gap: "8px" },
  progressHeader: { display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#dcddde" },
  progressBar: { height: "8px", backgroundColor: "#1e1e1e", borderRadius: "4px", overflow: "hidden" },
  progressFill: { height: "100%", transition: "width 0.3s" },
  progressFooter: { fontSize: "12px", color: "#99aab5", textAlign: "center" },
  boostButton: {
    padding: "12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s"
  },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "15px" },
  statCard: { backgroundColor: "#2c2f33", borderRadius: "8px", padding: "20px", textAlign: "center" },
  statIcon: { fontSize: "24px", color: "#5865f2", marginBottom: "8px" },
  statValue: { fontSize: "24px", fontWeight: "600", color: "#ffffff", marginBottom: "4px" },
  statLabel: { fontSize: "12px", color: "#99aab5" },
  boostsList: { display: "flex", flexDirection: "column", gap: "10px" },
  empty: { textAlign: "center", color: "#99aab5", padding: "40px" },
  boostItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  boostUser: { display: "flex", alignItems: "center" },
  boostUsername: { color: "#ffffff", fontWeight: "500" },
  boostDate: { fontSize: "12px", color: "#99aab5", marginTop: "2px" },
  boostExpires: { fontSize: "12px", color: "#faa61a" },
  perksList: { display: "flex", flexDirection: "column", gap: "24px" },
  perkLevel: { display: "flex", flexDirection: "column", gap: "12px" },
  perkLevelHeader: { fontSize: "18px", fontWeight: "600", color: "#ffffff", display: "flex", alignItems: "center" },
  perkRequirement: { fontSize: "12px", color: "#99aab5", marginLeft: "8px", fontWeight: "400" },
  perksGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" },
  perkCard: { backgroundColor: "#2c2f33", borderRadius: "6px", padding: "16px", display: "flex", flexDirection: "column", gap: "8px" },
  perkIcon: { fontSize: "32px" },
  perkName: { fontSize: "14px", fontWeight: "600", color: "#ffffff" },
  perkDescription: { fontSize: "12px", color: "#99aab5" },
  perkUnlocked: { fontSize: "12px", color: "#43b581", fontWeight: "600", marginTop: "4px" }
};
const PERKS = [
  { level: 1, icon: "🎨", name: "128 Emoji Slots", description: "Upload up to 128 custom emojis" },
  { level: 1, icon: "🎵", name: "128kbps Audio", description: "Higher quality voice channels" },
  { level: 1, icon: "🖼️", name: "Animated Icon", description: "Set an animated server icon" },
  { level: 1, icon: "🌟", name: "Custom Invite Background", description: "Customize your invite splash" },
  { level: 2, icon: "😀", name: "256 Emoji Slots", description: "Even more custom emojis" },
  { level: 2, icon: "🎤", name: "256kbps Audio", description: "Crystal clear voice quality" },
  { level: 2, icon: "📤", name: "50MB Upload Limit", description: "Share larger files" },
  { level: 2, icon: "🎬", name: "1080p Screen Share", description: "HD screen sharing" },
  { level: 3, icon: "🎭", name: "500 Emoji Slots", description: "Maximum emoji capacity" },
  { level: 3, icon: "🎧", name: "384kbps Audio", description: "Professional audio quality" },
  { level: 3, icon: "📦", name: "100MB Upload Limit", description: "Share even larger files" },
  { level: 3, icon: "🔗", name: "Custom Vanity URL", description: "Custom server invite link" }
];
const getBoostLevel = /* @__PURE__ */ __name((boostCount) => {
  if (boostCount >= 30) return { level: 3, name: "Level 3", color: "#9b59b6" };
  if (boostCount >= 15) return { level: 2, name: "Level 2", color: "#e91e63" };
  if (boostCount >= 2) return { level: 1, name: "Level 1", color: "#5865f2" };
  return { level: 0, name: "No Level", color: "#99aab5" };
}, "getBoostLevel");
const getNextLevelProgress = /* @__PURE__ */ __name((boostCount) => {
  if (boostCount >= 30) return { current: boostCount, target: 30, percentage: 100 };
  if (boostCount >= 15) return { current: boostCount, target: 30, percentage: (boostCount - 15) / 15 * 100 };
  if (boostCount >= 2) return { current: boostCount, target: 15, percentage: (boostCount - 2) / 13 * 100 };
  return { current: boostCount, target: 2, percentage: boostCount / 2 * 100 };
}, "getNextLevelProgress");
const useServerBoost = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl, serverId) => {
  const [boosts, setBoosts] = reactExports.useState([]);
  const [serverStats, setServerStats] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  reactExports.useEffect(() => {
    fetchBoosts();
    fetchServerStats();
  }, [serverId]);
  const fetchBoosts = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/boosts/`);
      const data = await response.json();
      setBoosts(data.boosts || []);
    } catch (error) {
      toast.error("Failed to load boosts");
    }
  }, "fetchBoosts");
  const fetchServerStats = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/boost_stats/`);
      const data = await response.json();
      setServerStats(data);
    } catch (error) {
      toast.error("Failed to load server stats");
    } finally {
      setLoading(false);
    }
  }, "fetchServerStats");
  const boostServer = /* @__PURE__ */ __name(async () => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/servers/boost/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ server_id: serverId })
      });
      toast.success("🚀 Server boosted successfully!");
      fetchBoosts();
      fetchServerStats();
    } catch (error) {
      toast.error("Failed to boost server");
    }
  }, "boostServer");
  const currentBoostCount = serverStats?.boost_count || 0;
  const currentLevel = getBoostLevel(currentBoostCount);
  const progress = getNextLevelProgress(currentBoostCount);
  return {
    boosts,
    serverStats,
    loading,
    activeTab,
    setActiveTab,
    boostServer,
    currentBoostCount,
    currentLevel,
    progress
  };
}, "useServerBoost");
const ServerBoostPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const {
    boosts,
    serverStats,
    loading,
    activeTab,
    setActiveTab,
    boostServer,
    currentBoostCount,
    currentLevel,
    progress
  } = useServerBoost(fetchWithAuth, apiBaseUrl, serverId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRocket, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Server Boost" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tabs, children: [
      { key: "overview", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRocket, { style: { marginRight: "5px" } }), label: "Overview" },
      { key: "boosts", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, { style: { marginRight: "5px" } }), label: `Boosts (${boosts.length})` },
      { key: "perks", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { style: { marginRight: "5px" } }), label: "Perks" }
    ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setActiveTab(t.key), "onClick"),
        style: { ...styles.tab, ...activeTab === t.key && styles.tabActive },
        children: [
          t.icon,
          t.label
        ]
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading..." }) : activeTab === "overview" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.overview, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.boostCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.boostLevel, backgroundColor: currentLevel.color }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { style: { fontSize: "32px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.levelText, children: currentLevel.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.boostCountText, children: [
            currentBoostCount,
            " Boosts"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.progressSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.progressHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Progress to Next Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              progress.current,
              " / ",
              progress.target
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.progressBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.progressFill, width: `${Math.min(progress.percentage, 100)}%`, backgroundColor: currentLevel.color } }) }),
          currentBoostCount < 30 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.progressFooter, children: [
            progress.target - progress.current,
            " more boosts needed"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: boostServer, style: styles.boostButton, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaRocket, { style: { marginRight: "8px" } }),
          " Boost This Server"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statsGrid, children: [
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: styles.statIcon }), value: serverStats?.total_boosters || 0, label: "Boosters" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { style: styles.statIcon }), value: serverStats?.total_boosts || 0, label: "Total Boosts" },
        { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { style: styles.statIcon }), value: currentLevel.level, label: "Current Level" }
      ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
        s.icon,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: s.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: s.label })
      ] }, i)) })
    ] }) : activeTab === "boosts" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.boostsList, children: boosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No boosts yet. Be the first to boost this server!" }) : boosts.map((boost, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.boostItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.boostUser, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaRocket, { style: { color: "#5865f2", marginRight: "10px" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.boostUsername, children: boost.user?.username || "Anonymous" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.boostDate, children: [
            "Boosted ",
            new Date(boost.boosted_at).toLocaleDateString()
          ] })
        ] })
      ] }),
      boost.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.boostExpires, children: [
        "Expires ",
        new Date(boost.expires_at).toLocaleDateString()
      ] })
    ] }, index)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.perksList, children: [1, 2, 3].map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.perkLevel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.perkLevelHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { style: { marginRight: "8px", color: getBoostLevel(level === 1 ? 2 : level === 2 ? 15 : 30).color } }),
        "Level ",
        level,
        " Perks",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.perkRequirement, children: [
          "(",
          level === 1 ? "2" : level === 2 ? "15" : "30",
          " boosts required)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.perksGrid, children: PERKS.filter((p) => p.level === level).map((perk, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.perkCard, opacity: currentLevel.level >= level ? 1 : 0.5 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.perkIcon, children: perk.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.perkName, children: perk.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.perkDescription, children: perk.description }),
        currentLevel.level >= level && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.perkUnlocked, children: [
          "✓",
          " Unlocked"
        ] })
      ] }, idx)) })
    ] }, level)) }) })
  ] }) });
}, "ServerBoostPanel");
export {
  ServerBoostPanel as default
};

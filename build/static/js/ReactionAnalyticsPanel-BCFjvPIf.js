var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { O as FaChartLine, a as FaTimes, R as FaFire, bv as FaCalendar, P as FaTrophy, by as FaHeart } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ReactionAnalyticsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, roomSlug }) => {
  const [heatmap, setHeatmap] = reactExports.useState(null);
  const [dailyStats, setDailyStats] = reactExports.useState([]);
  const [leaderboard, setLeaderboard] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("heatmap");
  reactExports.useEffect(() => {
    fetchHeatmap();
    fetchDailyStats();
    fetchLeaderboard();
  }, [roomSlug]);
  const fetchHeatmap = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/reaction_heatmap/`);
      const data = await response.json();
      setHeatmap(data);
    } catch (error) {
      toast.error("Failed to load reaction heatmap");
    } finally {
      setLoading(false);
    }
  }, "fetchHeatmap");
  const fetchDailyStats = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/rooms/${roomSlug}/reactions/daily/`);
      const data = await response.json();
      setDailyStats(data.stats || []);
    } catch (error) {
      toast.error("Failed to load daily stats");
    }
  }, "fetchDailyStats");
  const fetchLeaderboard = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/leaderboards/reactions/`);
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      toast.error("Failed to load leaderboard");
    }
  }, "fetchLeaderboard");
  const getHeatLevel = /* @__PURE__ */ __name((value, max) => {
    const percentage = value / max * 100;
    if (percentage > 75) return "#f04747";
    if (percentage > 50) return "#faa61a";
    if (percentage > 25) return "#5865f2";
    return "#2c2f33";
  }, "getHeatLevel");
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Reaction Analytics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("heatmap"), "onClick"), style: { ...styles.tab, ...activeTab === "heatmap" && styles.tabActive }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, { style: { marginRight: "5px" } }),
        "Heatmap"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("daily"), "onClick"), style: { ...styles.tab, ...activeTab === "daily" && styles.tabActive }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: { marginRight: "5px" } }),
        "Daily Stats"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("leaderboard"), "onClick"), style: { ...styles.tab, ...activeTab === "leaderboard" && styles.tabActive }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { style: { marginRight: "5px" } }),
        "Leaderboard"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading analytics..." }) : activeTab === "heatmap" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.heatmapContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.heatmapGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.heatmapYAxis, children: days.map((day) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.dayLabel, children: day }, day)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.heatmapCells, children: [
          heatmap && heatmap.data && days.map((day, dayIdx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.heatmapRow, children: hours.map((hour) => {
            const value = heatmap.data[dayIdx]?.[hour] || 0;
            const maxValue = Math.max(...heatmap.data.flat().filter((v) => v) || [1]);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                style: {
                  ...styles.heatmapCell,
                  backgroundColor: getHeatLevel(value, maxValue)
                },
                title: `${day} ${hour}:00 - ${value} reactions`
              },
              hour
            );
          }) }, day)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.heatmapXAxis, children: hours.filter((h) => h % 3 === 0).map((hour) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.hourLabel, children: [
            hour,
            "h"
          ] }, hour)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.legend, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.legendLabel, children: "Less" }),
        [0, 25, 50, 75, 100].map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.legendBox, backgroundColor: getHeatLevel(level, 100) } }, level)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.legendLabel, children: "More" })
      ] })
    ] }) : activeTab === "daily" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.dailyStats, children: dailyStats.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No daily stats available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.chartContainer, children: dailyStats.map((stat, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statBar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statDate, children: new Date(stat.date).toLocaleDateString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.barContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: {
            ...styles.bar,
            width: `${stat.count / Math.max(...dailyStats.map((s) => s.count)) * 100}%`
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statCount, children: stat.count })
    ] }, idx)) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.leaderboard, children: leaderboard.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No leaderboard data available" }) : leaderboard.map((user, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.leaderboardItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rank, children: idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.userInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.username, children: user.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.userReactions, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeart, { style: { color: "#f04747", marginRight: "5px" } }),
          user.reaction_count,
          " reactions"
        ] })
      ] })
    ] }, idx)) }) })
  ] }) });
}, "ReactionAnalyticsPanel");
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
    maxWidth: "1000px",
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
  tabs: {
    display: "flex",
    borderBottom: "1px solid #2c2f33",
    padding: "0 20px"
  },
  tab: {
    padding: "12px 20px",
    backgroundColor: "transparent",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid transparent"
  },
  tabActive: {
    color: "#5865f2",
    borderBottom: "2px solid #5865f2"
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
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  heatmapContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  heatmapGrid: {
    display: "flex",
    gap: "10px"
  },
  heatmapYAxis: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  dayLabel: {
    fontSize: "12px",
    color: "#99aab5",
    height: "20px",
    display: "flex",
    alignItems: "center"
  },
  heatmapCells: {
    flex: 1
  },
  heatmapRow: {
    display: "flex",
    gap: "2px",
    marginBottom: "2px"
  },
  heatmapCell: {
    width: "20px",
    height: "20px",
    borderRadius: "2px",
    cursor: "pointer"
  },
  heatmapXAxis: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "5px"
  },
  hourLabel: {
    fontSize: "11px",
    color: "#99aab5"
  },
  legend: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    justifyContent: "center"
  },
  legendLabel: {
    fontSize: "12px",
    color: "#99aab5"
  },
  legendBox: {
    width: "15px",
    height: "15px",
    borderRadius: "2px"
  },
  dailyStats: {
    display: "flex",
    flexDirection: "column"
  },
  chartContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  statBar: {
    display: "grid",
    gridTemplateColumns: "100px 1fr 60px",
    alignItems: "center",
    gap: "12px"
  },
  statDate: {
    fontSize: "13px",
    color: "#dcddde"
  },
  barContainer: {
    height: "24px",
    backgroundColor: "#2c2f33",
    borderRadius: "4px",
    overflow: "hidden"
  },
  bar: {
    height: "100%",
    backgroundColor: "#5865f2",
    transition: "width 0.3s"
  },
  statCount: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "right"
  },
  leaderboard: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  leaderboardItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  rank: {
    fontSize: "24px",
    fontWeight: "600",
    minWidth: "60px",
    textAlign: "center"
  },
  userInfo: {
    flex: 1
  },
  username: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  userReactions: {
    fontSize: "14px",
    color: "#99aab5",
    display: "flex",
    alignItems: "center"
  }
};
export {
  ReactionAnalyticsPanel as default
};

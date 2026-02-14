var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { O as FaChartLine, a as FaTimes, j as FaLink, u as FaUsers } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const InviteAnalyticsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [analytics, setAnalytics] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [timeRange, setTimeRange] = reactExports.useState("7d");
  reactExports.useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);
  const fetchAnalytics = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(
        `${apiBaseUrl}/servers/${serverId}/invite-analytics/?range=${timeRange}`
      );
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, "fetchAnalytics");
  const timeRanges = [
    { value: "24h", label: "24 Hours" },
    { value: "7d", label: "7 Days" },
    { value: "30d", label: "30 Days" },
    { value: "90d", label: "90 Days" },
    { value: "all", label: "All Time" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Invite Analytics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toolbar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.timeRangeButtons, children: timeRanges.map((range) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setTimeRange(range.value), "onClick"),
        style: {
          ...styles.timeRangeButton,
          ...timeRange === range.value && styles.timeRangeButtonActive
        },
        children: range.label
      },
      range.value
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading analytics..." }) : !analytics ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No analytics data available" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { color: "#5865f2" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: analytics.total_invites || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Total Invites" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { color: "#43b581" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: analytics.total_joins || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Total Joins" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { color: "#faa61a" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statValue, children: [
              analytics.total_invites > 0 ? (analytics.total_joins / analytics.total_invites * 100).toFixed(1) : 0,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Conversion Rate" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Top Invites" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.invitesList, children: (analytics.top_invites || []).map((invite, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteRank, children: [
            "#",
            idx + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.inviteCode, children: invite.code }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteMeta, children: [
              "Created by ",
              invite.creator_username
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.inviteStats, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteStat, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.inviteStatValue, children: invite.uses }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.inviteStatLabel, children: "uses" })
          ] }) })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Daily Joins" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.chartContainer, children: (analytics.daily_joins || []).map((day, idx) => {
          const maxJoins = Math.max(...(analytics.daily_joins || []).map((d) => d.joins), 1);
          const height = day.joins / maxJoins * 100;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.barContainer, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.bar, height: `${height}%` }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.barValue, children: day.joins }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.barLabel, children: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) })
          ] }, idx);
        }) })
      ] })
    ] }) })
  ] }) });
}, "InviteAnalyticsPanel");
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
    maxWidth: "900px",
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
  toolbar: {
    padding: "15px 20px",
    borderBottom: "1px solid #2c2f33"
  },
  timeRangeButtons: {
    display: "flex",
    gap: "8px"
  },
  timeRangeButton: {
    padding: "8px 16px",
    backgroundColor: "#2c2f33",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#dcddde",
    cursor: "pointer",
    fontSize: "13px"
  },
  timeRangeButtonActive: {
    backgroundColor: "#5865f2",
    borderColor: "#5865f2",
    color: "#ffffff"
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
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "30px"
  },
  statCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },
  statIcon: {
    fontSize: "32px"
  },
  statInfo: {
    flex: 1
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "4px"
  },
  statLabel: {
    fontSize: "13px",
    color: "#99aab5"
  },
  section: {
    marginBottom: "30px"
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "16px"
  },
  invitesList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  inviteCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },
  inviteRank: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#5865f2",
    minWidth: "40px"
  },
  inviteInfo: {
    flex: 1
  },
  inviteCode: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "monospace",
    marginBottom: "4px"
  },
  inviteMeta: {
    fontSize: "12px",
    color: "#99aab5"
  },
  inviteStats: {
    display: "flex",
    gap: "20px"
  },
  inviteStat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  inviteStatValue: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#43b581"
  },
  inviteStatLabel: {
    fontSize: "11px",
    color: "#99aab5"
  },
  chartContainer: {
    display: "flex",
    gap: "8px",
    alignItems: "flex-end",
    height: "200px",
    padding: "10px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px"
  },
  barContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end"
  },
  bar: {
    width: "100%",
    backgroundColor: "#5865f2",
    borderRadius: "4px 4px 0 0",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "4px 0",
    minHeight: "20px"
  },
  barValue: {
    fontSize: "11px",
    color: "#ffffff",
    fontWeight: "600"
  },
  barLabel: {
    fontSize: "10px",
    color: "#99aab5",
    marginTop: "4px",
    transform: "rotate(-45deg)",
    transformOrigin: "center"
  }
};
export {
  InviteAnalyticsPanel as default
};

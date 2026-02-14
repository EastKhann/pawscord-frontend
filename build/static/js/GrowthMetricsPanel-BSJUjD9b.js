var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { O as FaChartLine, a as FaTimes, u as FaUsers, aa as FaArrowUp, bv as FaCalendar } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const GrowthMetricsPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [metrics, setMetrics] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [timeRange, setTimeRange] = reactExports.useState("7d");
  const timeRanges = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "all", label: "All Time" }
  ];
  reactExports.useEffect(() => {
    fetchMetrics();
  }, [timeRange]);
  const fetchMetrics = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(
        `${apiBaseUrl}/servers/${serverId}/growth-metrics/?range=${timeRange}`
      );
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      toast.error("Failed to load growth metrics");
    } finally {
      setLoading(false);
    }
  }, "fetchMetrics");
  const formatNumber = /* @__PURE__ */ __name((num) => {
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num;
  }, "formatNumber");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Growth Metrics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.toolbar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: timeRange, onChange: /* @__PURE__ */ __name((e) => setTimeRange(e.target.value), "onChange"), style: styles.select, children: timeRanges.map((range) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: range.value, children: range.label }, range.value)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading metrics..." }) : !metrics ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No metrics available" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { color: "#5865f2", fontSize: "24px" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Total Members" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: formatNumber(metrics.total_members || 0) }),
            metrics.member_growth !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.statChange, color: metrics.member_growth >= 0 ? "#43b581" : "#f04747" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowUp, { style: { transform: metrics.member_growth < 0 ? "rotate(180deg)" : "none" } }),
              Math.abs(metrics.member_growth),
              "% this period"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { color: "#43b581", fontSize: "24px" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Active Members" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: formatNumber(metrics.active_members || 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statSubtext, children: [
              metrics.total_members ? (metrics.active_members / metrics.total_members * 100).toFixed(1) : 0,
              "% of total"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "24px" }, children: "💬" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Messages Sent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: formatNumber(metrics.messages_sent || 0) }),
            metrics.message_growth !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.statChange, color: metrics.message_growth >= 0 ? "#43b581" : "#f04747" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowUp, { style: { transform: metrics.message_growth < 0 ? "rotate(180deg)" : "none" } }),
              Math.abs(metrics.message_growth),
              "% this period"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendar, { style: { color: "#faa61a", fontSize: "24px" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "New Joins" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: formatNumber(metrics.new_joins || 0) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statSubtext, children: metrics.retention_rate ? `${metrics.retention_rate}% retention` : "" })
          ] })
        ] })
      ] }),
      metrics.daily_stats && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.chartSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Daily Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.chart, children: metrics.daily_stats.map((day, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.chartBar, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                ...styles.chartBarFill,
                height: `${day.count / Math.max(...metrics.daily_stats.map((d) => d.count)) * 100}%`
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.chartLabel, children: new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) })
        ] }, idx)) })
      ] }),
      metrics.top_contributors && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Top Contributors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.contributorsList, children: metrics.top_contributors.slice(0, 10).map((user, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contributorCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contributorRank, children: [
            "#",
            idx + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contributorInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.contributorName, children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contributorStat, children: [
              formatNumber(user.message_count),
              " messages"
            ] })
          ] })
        ] }, idx)) })
      ] })
    ] }) })
  ] }) });
}, "GrowthMetricsPanel");
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
    maxWidth: "1100px",
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
  select: {
    padding: "10px",
    backgroundColor: "#2c2f33",
    border: "1px solid #2c2f33",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: "14px",
    width: "200px"
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
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "32px"
  },
  statCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    gap: "16px"
  },
  statIcon: {
    minWidth: "48px"
  },
  statInfo: {
    flex: 1
  },
  statLabel: {
    fontSize: "13px",
    color: "#99aab5",
    marginBottom: "6px"
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "6px"
  },
  statChange: {
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  statSubtext: {
    fontSize: "12px",
    color: "#99aab5"
  },
  chartSection: {
    marginBottom: "32px"
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "16px"
  },
  chart: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "200px",
    padding: "20px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px"
  },
  chartBar: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px"
  },
  chartBarFill: {
    width: "80%",
    backgroundColor: "#5865f2",
    borderRadius: "4px 4px 0 0",
    minHeight: "4px"
  },
  chartLabel: {
    fontSize: "10px",
    color: "#99aab5",
    textAlign: "center"
  },
  section: {
    marginBottom: "32px"
  },
  contributorsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  contributorCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "12px",
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },
  contributorRank: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#5865f2",
    minWidth: "40px"
  },
  contributorInfo: {
    flex: 1
  },
  contributorName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "4px"
  },
  contributorStat: {
    fontSize: "12px",
    color: "#99aab5"
  }
};
export {
  GrowthMetricsPanel as default
};

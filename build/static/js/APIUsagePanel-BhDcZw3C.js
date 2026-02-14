var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { O as FaChartLine, a as FaTimes, q as FaCode, w as FaCheckCircle, z as FaClock, d as FaExclamationTriangle } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const calculateTimeUntilReset = /* @__PURE__ */ __name((resetAt) => {
  const now = /* @__PURE__ */ new Date();
  const reset = new Date(resetAt);
  const diff = reset - now;
  if (diff <= 0) return "Soon";
  const hours = Math.floor(diff / (1e3 * 60 * 60));
  const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}, "calculateTimeUntilReset");
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
    width: "95%",
    maxWidth: "1200px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff"
  },
  header: {
    padding: "20px",
    borderBottom: "1px solid #444",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  timeRangeSelect: {
    padding: "8px 12px",
    backgroundColor: "#2c2f33",
    border: "1px solid #444",
    borderRadius: "6px",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#fff",
    fontSize: "24px",
    cursor: "pointer",
    padding: "8px"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    padding: "40px",
    color: "#99aab5"
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "32px"
  },
  statCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "16px"
  },
  statIcon: {
    fontSize: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  statInfo: {
    flex: 1
  },
  statValue: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "4px"
  },
  statLabel: {
    fontSize: "12px",
    color: "#99aab5",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  section: {
    marginBottom: "32px"
  },
  sectionTitle: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "16px"
  },
  rateLimitCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    borderLeft: "4px solid"
  },
  rateLimitInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px"
  },
  rateLimitText: {
    fontSize: "14px",
    fontWeight: "600"
  },
  rateLimitStatus: {
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "1px"
  },
  rateLimitBar: {
    height: "8px",
    backgroundColor: "#202225",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "8px"
  },
  rateLimitProgress: {
    height: "100%",
    transition: "width 0.3s ease"
  },
  rateLimitReset: {
    fontSize: "12px",
    color: "#99aab5"
  },
  endpointsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  endpointItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "16px",
    cursor: "pointer",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  endpointRank: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#5865f2",
    minWidth: "40px"
  },
  endpointDetails: {
    flex: 1
  },
  endpointPath: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "4px",
    fontFamily: "monospace"
  },
  endpointMethod: {
    display: "inline-block",
    padding: "2px 8px",
    backgroundColor: "#5865f2",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: "bold",
    marginRight: "8px"
  },
  endpointStats: {
    fontSize: "12px",
    color: "#99aab5"
  },
  endpointBar: {
    width: "100px",
    height: "6px",
    backgroundColor: "#202225",
    borderRadius: "3px",
    overflow: "hidden"
  },
  endpointBarFill: {
    height: "100%",
    transition: "width 0.3s ease"
  },
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  timelineItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "6px",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  timelineIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff"
  },
  timelineContent: {
    flex: 1
  },
  timelinePath: {
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: "monospace",
    marginBottom: "4px"
  },
  timelineMethod: {
    display: "inline-block",
    padding: "2px 6px",
    backgroundColor: "#5865f2",
    borderRadius: "3px",
    fontSize: "10px",
    fontWeight: "bold",
    marginRight: "8px"
  },
  timelineMeta: {
    fontSize: "12px",
    color: "#99aab5"
  },
  empty: {
    textAlign: "center",
    padding: "40px",
    color: "#99aab5"
  }
};
const useAPIUsage = /* @__PURE__ */ __name((fetchWithAuth, apiBaseUrl) => {
  const [stats, setStats] = reactExports.useState(null);
  const [endpoints, setEndpoints] = reactExports.useState([]);
  const [timeline, setTimeline] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [timeRange, setTimeRange] = reactExports.useState("24h");
  const [selectedEndpoint, setSelectedEndpoint] = reactExports.useState(null);
  reactExports.useEffect(() => {
    loadAPIUsage();
  }, [timeRange]);
  const loadAPIUsage = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/analytics/usage/?range=${timeRange}`);
      const data = await response.json();
      setStats(data.stats || {});
      setEndpoints(data.endpoints || []);
      setTimeline(data.timeline || []);
    } catch (error) {
      console.error("Failed to load API usage:", error);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }, "loadAPIUsage");
  const getRateLimitStatus = /* @__PURE__ */ __name(() => {
    if (!stats || !stats.rate_limit) return { color: "#43b581", text: "Normal" };
    const requestsMade = stats.requests_made || 0;
    const usage = requestsMade / stats.rate_limit * 100;
    if (usage >= 90) return { color: "#f04747", text: "Critical" };
    if (usage >= 70) return { color: "#faa61a", text: "Warning" };
    return { color: "#43b581", text: "Normal" };
  }, "getRateLimitStatus");
  const safeStats = stats || { requests_made: 0, rate_limit: 1e4, success_rate: 0, avg_response_time: 0, errors: 0 };
  const rateLimitStatus = getRateLimitStatus();
  return {
    safeStats,
    endpoints,
    timeline,
    loading,
    timeRange,
    setTimeRange,
    selectedEndpoint,
    setSelectedEndpoint,
    rateLimitStatus
  };
}, "useAPIUsage");
const APIUsagePanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
  const {
    safeStats,
    endpoints,
    timeline,
    loading,
    timeRange,
    setTimeRange,
    setSelectedEndpoint,
    rateLimitStatus
  } = useAPIUsage(fetchWithAuth, apiBaseUrl);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { fontSize: "24px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: "20px" }, children: "API Usage Analytics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: timeRange, onChange: /* @__PURE__ */ __name((e) => setTimeRange(e.target.value), "onChange"), style: styles.timeRangeSelect, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "24h", children: "Last 24 Hours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "7d", children: "Last 7 Days" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30d", children: "Last 30 Days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading analytics..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, { style: { color: "#5865f2" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: (safeStats.requests_made || 0).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Total Requests" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { color: "#43b581" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: safeStats.success_rate ? `${safeStats.success_rate.toFixed(1)}%` : "0%" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Success Rate" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, { style: { color: "#faa61a" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: safeStats.avg_response_time ? `${safeStats.avg_response_time}ms` : "0ms" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Avg Response Time" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { style: { color: "#f04747" } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: safeStats.errors || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: "Errors" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Rate Limit Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.rateLimitCard, borderLeftColor: rateLimitStatus.color }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rateLimitInfo, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rateLimitText, children: [
              safeStats.requests_made || 0,
              " / ",
              safeStats.rate_limit || 1e4,
              " requests used"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.rateLimitStatus, color: rateLimitStatus.color }, children: rateLimitStatus.text })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rateLimitBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            ...styles.rateLimitProgress,
            width: `${Math.min((safeStats.requests_made || 0) / (safeStats.rate_limit || 1e4) * 100, 100)}%`,
            backgroundColor: rateLimitStatus.color
          } }) }),
          safeStats.reset_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rateLimitReset, children: [
            "Resets in: ",
            calculateTimeUntilReset(safeStats.reset_at)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Top Endpoints" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.endpointsList, children: endpoints.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No endpoint data" }) : endpoints.slice(0, 10).map((endpoint, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.endpointItem, onClick: /* @__PURE__ */ __name(() => setSelectedEndpoint(endpoint), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.endpointRank, children: [
            "#",
            idx + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.endpointDetails, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.endpointPath, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.endpointMethod, children: endpoint.method }),
              endpoint.path
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.endpointStats, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                endpoint.count,
                " requests"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 8px", color: "#444" }, children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                endpoint.avg_time,
                "ms avg"
              ] }),
              endpoint.error_rate > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 8px", color: "#444" }, children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#f04747" }, children: [
                  endpoint.error_rate,
                  "% errors"
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.endpointBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            ...styles.endpointBarFill,
            width: `${endpoint.count / endpoints[0].count * 100}%`,
            backgroundColor: endpoint.error_rate > 5 ? "#f04747" : "#5865f2"
          } }) })
        ] }, idx)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Recent Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.timeline, children: timeline.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No recent activity" }) : timeline.slice(0, 20).map((event, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timelineItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.timelineIcon, backgroundColor: event.status >= 400 ? "#f04747" : "#43b581" }, children: event.status >= 400 ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timelineContent, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timelinePath, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.timelineMethod, children: event.method }),
              event.path
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timelineMeta, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: event.status >= 400 ? "#f04747" : "#43b581" }, children: event.status }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 8px", color: "#444" }, children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                event.response_time,
                "ms"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { margin: "0 8px", color: "#444" }, children: "•" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(event.timestamp).toLocaleTimeString() })
            ] })
          ] })
        ] }, idx)) })
      ] })
    ] }) })
  ] }) });
}, "APIUsagePanel");
export {
  APIUsagePanel as default
};

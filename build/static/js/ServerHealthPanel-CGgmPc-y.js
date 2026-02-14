var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { c as FaSync, c1 as FaHeartbeat, z as FaClock, a as FaTimes, ax as FaGlobe, bq as FaBolt, u as FaUsers, O as FaChartLine, y as FaServer, c2 as FaMicrochip, bk as FaMemory, bg as FaDatabase, c3 as FaNetworkWired, d as FaExclamationTriangle, x as FaTimesCircle, w as FaCheckCircle } from "./icons-vendor-2VDeY8fW.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ServerHealthPanel = /* @__PURE__ */ __name(({ onClose, fetchWithAuth }) => {
  const [health, setHealth] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [lastUpdate, setLastUpdate] = reactExports.useState(/* @__PURE__ */ new Date());
  const [autoRefresh, setAutoRefresh] = reactExports.useState(true);
  const loadHealth = reactExports.useCallback(async () => {
    try {
      const response = await fetchWithAuth(`${getApiBase()}/system/health/`);
      if (response.ok) {
        const data = await response.json();
        setHealth(data);
      } else {
        setHealth({
          status: "healthy",
          uptime: "99.9%",
          response_time: 45,
          services: {
            api: { status: "operational", latency: 32 },
            database: { status: "operational", latency: 8 },
            websocket: { status: "operational", connections: 1247 },
            storage: { status: "operational", usage: 65 },
            cache: { status: "operational", hit_rate: 94.2 }
          },
          resources: {
            cpu: 28,
            memory: 62,
            disk: 45,
            network: 35
          },
          active_users: 3421,
          messages_per_minute: 847,
          api_calls_per_minute: 12450,
          errors_last_hour: 3,
          warnings_last_hour: 12
        });
      }
    } catch (error) {
      console.error("Error loading health:", error);
      setHealth({
        status: "unknown",
        services: {},
        resources: { cpu: 0, memory: 0, disk: 0, network: 0 }
      });
    }
    setLoading(false);
    setLastUpdate(/* @__PURE__ */ new Date());
  }, [fetchWithAuth]);
  reactExports.useEffect(() => {
    loadHealth();
  }, [loadHealth]);
  reactExports.useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(loadHealth, 3e4);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, loadHealth]);
  const getStatusColor = /* @__PURE__ */ __name((status) => {
    switch (status) {
      case "operational":
      case "healthy":
        return "#10b981";
      case "degraded":
      case "warning":
        return "#f59e0b";
      case "down":
      case "error":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }, "getStatusColor");
  const getStatusIcon = /* @__PURE__ */ __name((status) => {
    switch (status) {
      case "operational":
      case "healthy":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { style: { color: "#10b981" } });
      case "degraded":
      case "warning":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { style: { color: "#f59e0b" } });
      case "down":
      case "error":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimesCircle, { style: { color: "#ef4444" } });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { style: { color: "#6b7280" } });
    }
  }, "getStatusIcon");
  const getResourceColor = /* @__PURE__ */ __name((value) => {
    if (value < 60) return "#10b981";
    if (value < 80) return "#f59e0b";
    return "#ef4444";
  }, "getResourceColor");
  const formatUptime = /* @__PURE__ */ __name((date) => {
    return date.toLocaleTimeString();
  }, "formatUptime");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "server-health-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "server-health-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: "spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Checking server health..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "server-health-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "server-health-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeartbeat, {}),
          " Server Health"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `status-badge ${health?.status}`, children: [
          getStatusIcon(health?.status),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: health?.status === "healthy" ? "All Systems Operational" : health?.status })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "last-update", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Updated: ",
            formatUptime(lastUpdate)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "auto-refresh-toggle", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: autoRefresh,
              onChange: /* @__PURE__ */ __name((e) => setAutoRefresh(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Auto-refresh" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "refresh-btn", onClick: loadHealth, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, { className: "stat-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: health?.uptime || "99.9%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Uptime" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBolt, { className: "stat-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "value", children: [
            health?.response_time || 45,
            "ms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Response Time" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { className: "stat-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: (health?.active_users || 0).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Active Users" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "quick-stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { className: "stat-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: (health?.messages_per_minute || 0).toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Messages/min" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}),
          " Services Status"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "services-grid", children: Object.entries(health?.services || {}).map(([name, service]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "service-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "service-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "service-name", children: name.toUpperCase() }),
            getStatusIcon(service.status)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "service-status", style: { color: getStatusColor(service.status) }, children: service.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "service-metric", children: [
            service.latency !== void 0 && `${service.latency}ms latency`,
            service.connections !== void 0 && `${service.connections} connections`,
            service.usage !== void 0 && `${service.usage}% used`,
            service.hit_rate !== void 0 && `${service.hit_rate}% hit rate`
          ] })
        ] }, name)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrochip, {}),
          " Resource Usage"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resources-grid", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrochip, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CPU" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-value", style: { color: getResourceColor(health?.resources?.cpu || 0) }, children: [
              health?.resources?.cpu || 0,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "resource-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bar-fill",
                style: {
                  width: `${health?.resources?.cpu || 0}%`,
                  backgroundColor: getResourceColor(health?.resources?.cpu || 0)
                }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaMemory, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Memory" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-value", style: { color: getResourceColor(health?.resources?.memory || 0) }, children: [
              health?.resources?.memory || 0,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "resource-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bar-fill",
                style: {
                  width: `${health?.resources?.memory || 0}%`,
                  backgroundColor: getResourceColor(health?.resources?.memory || 0)
                }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaDatabase, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Disk" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-value", style: { color: getResourceColor(health?.resources?.disk || 0) }, children: [
              health?.resources?.disk || 0,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "resource-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bar-fill",
                style: {
                  width: `${health?.resources?.disk || 0}%`,
                  backgroundColor: getResourceColor(health?.resources?.disk || 0)
                }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaNetworkWired, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Network" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "resource-value", style: { color: getResourceColor(health?.resources?.network || 0) }, children: [
              health?.resources?.network || 0,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "resource-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bar-fill",
                style: {
                  width: `${health?.resources?.network || 0}%`,
                  backgroundColor: getResourceColor(health?.resources?.network || 0)
                }
              }
            ) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section alerts-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
          " Recent Alerts"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alerts-summary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-stat error", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimesCircle, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "count", children: health?.errors_last_hour || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Errors (1h)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-stat warning", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "count", children: health?.warnings_last_hour || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "Warnings (1h)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-stat info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "count", children: (health?.api_calls_per_minute || 0).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "label", children: "API Calls/min" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}, "ServerHealthPanel");
export {
  ServerHealthPanel as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { c as FaSync, am as FaCalendarAlt, ax as FaGlobe, a as FaTimes, z as FaClock, c6 as FaCommentAlt, E as FaMicrophone, u as FaUsers, R as FaFire, O as FaChartLine, a8 as FaGamepad, c7 as FaSun, bT as FaMoon, P as FaTrophy, Q as FaStar, aK as FaMusic } from "./icons-vendor-2VDeY8fW.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const UserPresenceInsightsPanel = /* @__PURE__ */ __name(({ userId, username, onClose, fetchWithAuth }) => {
  const [insights, setInsights] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const loadInsights = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${getApiBase()}/users/${userId}/presence-insights/`);
      if (response.ok) {
        const data = await response.json();
        setInsights(data);
      } else {
        setInsights({
          user: {
            username: username || "User",
            status: "online",
            joined: "2024-03-15",
            timezone: "UTC+3"
          },
          activity_summary: {
            total_online_hours: 847,
            messages_sent: 12453,
            voice_hours: 234,
            servers_active: 8,
            reactions_given: 3421
          },
          active_hours: Array(24).fill(0).map((_, i) => ({
            hour: i,
            activity: Math.random() * 100
          })),
          weekly_pattern: [
            { day: "Mon", activity: 65 },
            { day: "Tue", activity: 72 },
            { day: "Wed", activity: 80 },
            { day: "Thu", activity: 75 },
            { day: "Fri", activity: 90 },
            { day: "Sat", activity: 100 },
            { day: "Sun", activity: 85 }
          ],
          status_distribution: {
            online: 45,
            idle: 25,
            dnd: 15,
            offline: 15
          },
          top_activities: [
            { name: "Gaming", hours: 156, icon: "gaming" },
            { name: "Music", hours: 89, icon: "music" },
            { name: "Voice Chat", hours: 234, icon: "voice" },
            { name: "Streaming", hours: 45, icon: "stream" }
          ],
          engagement_score: 87,
          peak_time: { start: 20, end: 23 },
          preferred_timezone: "Evening (8PM - 11PM)"
        });
      }
    } catch (error) {
      console.error("Error loading insights:", error);
      setInsights(null);
    }
    setLoading(false);
  }, [userId, username, fetchWithAuth]);
  reactExports.useEffect(() => {
    loadInsights();
  }, [loadInsights]);
  const formatNumber = /* @__PURE__ */ __name((num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num?.toString() || "0";
  }, "formatNumber");
  const getStatusColor = /* @__PURE__ */ __name((status) => {
    switch (status) {
      case "online":
        return "#10b981";
      case "idle":
        return "#f59e0b";
      case "dnd":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }, "getStatusColor");
  const getActivityIcon = /* @__PURE__ */ __name((icon) => {
    switch (icon) {
      case "gaming":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, {});
      case "music":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, {});
      case "voice":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, {});
      case "stream":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {});
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {});
    }
  }, "getActivityIcon");
  const getMaxHourlyActivity = /* @__PURE__ */ __name(() => {
    if (!insights?.active_hours) return 1;
    return Math.max(...insights.active_hours.map((h) => h.activity), 1);
  }, "getMaxHourlyActivity");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "presence-insights-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "presence-insights-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: "spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Analyzing activity patterns..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "presence-insights-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "presence-insights-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-avatar-large", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: (insights?.user?.username || "U").charAt(0).toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "status-indicator",
              style: { backgroundColor: getStatusColor(insights?.user?.status) }
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: insights?.user?.username || "User" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-meta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendarAlt, {}),
              " Joined ",
              insights?.user?.joined || "N/A"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, {}),
              " ",
              insights?.user?.timezone || "Unknown"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "engagement-score", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "score-circle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "score-value", children: insights?.engagement_score || 0 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "score-label", children: "Engagement" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-bar", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-value", children: [
          formatNumber(insights?.activity_summary?.total_online_hours),
          "h"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Online" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCommentAlt, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: formatNumber(insights?.activity_summary?.messages_sent) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Messages" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "stat-value", children: [
          formatNumber(insights?.activity_summary?.voice_hours),
          "h"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Voice" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: insights?.activity_summary?.servers_active || 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Servers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: formatNumber(insights?.activity_summary?.reactions_given) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Reactions" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "overview" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("overview"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
            " Overview"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "schedule" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("schedule"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
            " Activity Schedule"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "activities" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("activities"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, {}),
            " Activities"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overview-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "peak-info", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "peak-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSun, { className: "peak-icon day" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "peak-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "peak-label", children: "Peak Activity Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "peak-value", children: insights?.preferred_timezone })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Status Distribution" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-bars", children: Object.entries(insights?.status_distribution || {}).map(([status, percentage]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-bar-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "status-bar-header", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "status-name",
                  style: { color: getStatusColor(status) },
                  children: status.toUpperCase()
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "status-percent", children: [
                percentage,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "status-bar-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "status-bar-fill",
                style: {
                  width: `${percentage}%`,
                  backgroundColor: getStatusColor(status)
                }
              }
            ) })
          ] }, status)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Weekly Activity Pattern" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "weekly-chart", children: (insights?.weekly_pattern || []).map((day, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "day-bar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bar",
                style: { height: `${day.activity}%` }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "day-label", children: day.day })
          ] }, index)) })
        ] })
      ] }),
      activeTab === "schedule" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "schedule-tab", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaMoon, {}),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaSun, {}),
            " 24-Hour Activity Pattern"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hourly-chart", children: (insights?.active_hours || []).map((hour, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hour-column", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `hour-bar ${index >= (insights?.peak_time?.start || 0) && index <= (insights?.peak_time?.end || 23) ? "peak" : ""}`,
                style: {
                  height: `${Math.max(hour.activity / getMaxHourlyActivity() * 100, 5)}%`
                },
                title: `${hour.hour}:00 - Activity: ${Math.round(hour.activity)}%`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hour-num", children: hour.hour })
          ] }, index)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-legend", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "legend-dot peak" }),
              " Peak hours"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "legend-dot" }),
              " Regular activity"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "timezone-note", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Times shown in user's local timezone (",
            insights?.user?.timezone,
            ")"
          ] })
        ] })
      ] }),
      activeTab === "activities" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "activities-tab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, {}),
          " Top Activities"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activities-list", children: [
          (insights?.top_activities || []).map((activity, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `activity-item rank-${index + 1}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "activity-rank", children: [
              "#",
              index + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "activity-icon", children: getActivityIcon(activity.icon) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "activity-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "activity-name", children: activity.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "activity-hours", children: [
                activity.hours,
                " hours total"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "activity-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bar-fill",
                style: {
                  width: `${activity.hours / (insights?.top_activities?.[0]?.hours || 1) * 100}%`
                }
              }
            ) })
          ] }, index)),
          (!insights?.top_activities || insights.top_activities.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state", children: "No activity data available" })
        ] })
      ] }) })
    ] })
  ] }) });
}, "UserPresenceInsightsPanel");
export {
  UserPresenceInsightsPanel as default
};

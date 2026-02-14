var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { c as FaSync, n as FaSmile, a as FaTimes, by as FaHeart, C as FaUser, R as FaFire, aE as FaChartBar, P as FaTrophy, z as FaClock } from "./icons-vendor-2VDeY8fW.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ReactionStatsPanel = /* @__PURE__ */ __name(({ serverId, onClose, fetchWithAuth }) => {
  const [stats, setStats] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [timeRange, setTimeRange] = reactExports.useState("week");
  const loadStats = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${getApiBase()}/servers/${serverId}/reaction-stats/?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        setStats({
          total_reactions: 0,
          unique_emojis: 0,
          top_emojis: [],
          top_reactors: [],
          hourly_distribution: Array(24).fill(0),
          daily_trend: [],
          most_reacted_messages: []
        });
      }
    } catch (error) {
      console.error("Error loading reaction stats:", error);
      setStats({
        total_reactions: 0,
        unique_emojis: 0,
        top_emojis: [],
        top_reactors: [],
        hourly_distribution: Array(24).fill(0),
        daily_trend: [],
        most_reacted_messages: []
      });
    }
    setLoading(false);
  }, [serverId, timeRange, fetchWithAuth]);
  reactExports.useEffect(() => {
    loadStats();
  }, [loadStats]);
  const formatNumber = /* @__PURE__ */ __name((num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num?.toString() || "0";
  }, "formatNumber");
  const getMaxHourlyValue = /* @__PURE__ */ __name(() => {
    if (!stats?.hourly_distribution) return 1;
    return Math.max(...stats.hourly_distribution, 1);
  }, "getMaxHourlyValue");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reaction-stats-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reaction-stats-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-spinner", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: "spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading reaction statistics..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reaction-stats-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reaction-stats-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, {}),
          " Reaction Statistics"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subtitle", children: "Discover emoji trends and patterns" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: timeRange,
            onChange: /* @__PURE__ */ __name((e) => setTimeRange(e.target.value), "onChange"),
            className: "time-range-select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "day", children: "Last 24 Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "week", children: "Last 7 Days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "month", children: "Last 30 Days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Time" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-overview", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeart, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: formatNumber(stats?.total_reactions) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Total Reactions" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: formatNumber(stats?.unique_emojis) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Unique Emojis" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: formatNumber(stats?.top_reactors?.length) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Active Reactors" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-value", children: stats?.top_emojis?.[0]?.emoji || "🔥" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "stat-label", children: "Top Emoji" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tabs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "overview" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("overview"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, {}),
            " Overview"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "emojis" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("emojis"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, {}),
            " Top Emojis"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "users" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("users"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, {}),
            " Top Reactors"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `tab ${activeTab === "time" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setActiveTab("time"), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
            " Activity Pattern"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tab-content", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overview-tab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🔥 Trending Emojis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "emoji-grid", children: [
          (stats?.top_emojis || []).slice(0, 10).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "emoji-item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "emoji", children: item.emoji }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "count", children: formatNumber(item.count) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "progress",
                style: {
                  width: `${item.count / (stats?.top_emojis?.[0]?.count || 1) * 100}%`
                }
              }
            ) })
          ] }, index)),
          (!stats?.top_emojis || stats.top_emojis.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state", children: "No reaction data yet" })
        ] })
      ] }) }),
      activeTab === "emojis" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "emojis-tab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "emoji-leaderboard", children: [
        (stats?.top_emojis || []).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `leaderboard-item ${index < 3 ? "top-three" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "rank", children: [
            "#",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "emoji-large", children: item.emoji }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "emoji-details", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "emoji-name", children: item.name || "Custom Emoji" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "emoji-usage", children: [
              formatNumber(item.count),
              " uses"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "emoji-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bar-fill",
              style: {
                width: `${item.count / (stats?.top_emojis?.[0]?.count || 1) * 100}%`
              }
            }
          ) })
        ] }, index)),
        (!stats?.top_emojis || stats.top_emojis.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, { size: 48 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No emoji data available" })
        ] })
      ] }) }),
      activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "users-tab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-leaderboard", children: [
        (stats?.top_reactors || []).map((user, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `user-item ${index < 3 ? "top-three" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `rank rank-${index + 1}`, children: index < 3 ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, {}) : `#${index + 1}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-avatar", children: user.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: user.avatar, alt: user.username }) : user.username?.charAt(0).toUpperCase() || "?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "user-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "username", children: user.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "reaction-count", children: [
              formatNumber(user.count),
              " reactions"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "user-favorite", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "favorite-emoji", children: user.favorite_emoji || "❤️" }) })
        ] }, index)),
        (!stats?.top_reactors || stats.top_reactors.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { size: 48 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No reactor data available" })
        ] })
      ] }) }),
      activeTab === "time" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "time-tab", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "⏰ Hourly Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hourly-chart", children: (stats?.hourly_distribution || Array(24).fill(0)).map((value, hour) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hour-bar", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bar",
              style: {
                height: `${Math.max(value / getMaxHourlyValue() * 100, 5)}%`
              },
              title: `${hour}:00 - ${value} reactions`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hour-label", children: hour })
        ] }, hour)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "chart-note", children: "Hours shown in your local timezone" })
      ] }) })
    ] })
  ] }) });
}, "ReactionStatsPanel");
export {
  ReactionStatsPanel as default
};

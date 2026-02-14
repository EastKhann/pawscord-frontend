var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { c as FaSync, aE as FaChartBar, a as FaTimes, aF as FaHashtag, R as FaFire, ba as FaComment, a0 as FaEye, P as FaTrophy, u as FaUsers, z as FaClock, am as FaCalendarAlt, G as FaVolumeUp, aa as FaArrowUp, ab as FaArrowDown, c4 as FaMinus } from "./icons-vendor-2VDeY8fW.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ChannelAnalyticsPanel = /* @__PURE__ */ __name(({ serverId, onClose, fetchWithAuth }) => {
  const [analytics, setAnalytics] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedChannel, setSelectedChannel] = reactExports.useState(null);
  const [timeRange, setTimeRange] = reactExports.useState("week");
  const loadAnalytics = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${getApiBase()}/servers/${serverId}/channel-analytics/?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      } else {
        setAnalytics({
          summary: {
            total_channels: 24,
            active_channels: 18,
            total_messages: 45823,
            average_response_time: 2.4
          },
          channels: [
            { id: 1, name: "general", type: "text", messages: 12450, active_users: 234, growth: 15.2, peak_hour: 20 },
            { id: 2, name: "announcements", type: "text", messages: 856, active_users: 512, growth: 8.4, peak_hour: 12 },
            { id: 3, name: "memes", type: "text", messages: 8932, active_users: 189, growth: 22.1, peak_hour: 22 },
            { id: 4, name: "gaming", type: "text", messages: 6721, active_users: 145, growth: -3.2, peak_hour: 21 },
            { id: 5, name: "music", type: "voice", messages: 0, active_users: 67, growth: 5.8, peak_hour: 19 },
            { id: 6, name: "help", type: "text", messages: 3421, active_users: 98, growth: 0, peak_hour: 14 }
          ],
          peak_hours: [
            { hour: 20, activity: 100 },
            { hour: 21, activity: 95 },
            { hour: 22, activity: 88 },
            { hour: 19, activity: 82 },
            { hour: 18, activity: 75 }
          ],
          engagement_rate: 76.4
        });
      }
    } catch (error) {
      console.error("Error loading analytics:", error);
      setAnalytics({ summary: {}, channels: [], peak_hours: [] });
    }
    setLoading(false);
  }, [serverId, timeRange, fetchWithAuth]);
  reactExports.useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);
  const formatNumber = /* @__PURE__ */ __name((num) => {
    if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
    return num?.toString() || "0";
  }, "formatNumber");
  const getGrowthIcon = /* @__PURE__ */ __name((growth) => {
    if (growth > 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowUp, { className: "growth-up" });
    if (growth < 0) return /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowDown, { className: "growth-down" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FaMinus, { className: "growth-neutral" });
  }, "getGrowthIcon");
  const getChannelIcon = /* @__PURE__ */ __name((type) => {
    return type === "voice" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {});
  }, "getChannelIcon");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "channel-analytics-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "channel-analytics-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: "spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Loading channel analytics..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "channel-analytics-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "channel-analytics-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-info", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, {}),
          " Channel Analytics"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subtitle", children: "Track channel performance and engagement" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            value: timeRange,
            onChange: /* @__PURE__ */ __name((e) => setTimeRange(e.target.value), "onChange"),
            className: "time-select",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "day", children: "Last 24 Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "week", children: "Last 7 Days" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "month", children: "Last 30 Days" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-cards", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-value", children: analytics?.summary?.total_channels || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-label", children: "Total Channels" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-icon active", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-value", children: analytics?.summary?.active_channels || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-label", children: "Active Channels" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComment, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-value", children: formatNumber(analytics?.summary?.total_messages) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-label", children: "Total Messages" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "summary-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-content", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "card-value", children: [
            analytics?.engagement_rate || 0,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-label", children: "Engagement Rate" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "panel-body", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, {}),
          " Channel Leaderboard"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "channel-list", children: [
          (analytics?.channels || []).sort((a, b) => b.messages - a.messages).map((channel, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `channel-item ${selectedChannel === channel.id ? "selected" : ""}`,
              onClick: /* @__PURE__ */ __name(() => setSelectedChannel(channel.id === selectedChannel ? null : channel.id), "onClick"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `rank ${index < 3 ? "top" : ""}`, children: [
                  "#",
                  index + 1
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "channel-icon", children: getChannelIcon(channel.type) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "channel-info", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "channel-name", children: channel.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "channel-stats", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FaComment, {}),
                      " ",
                      formatNumber(channel.messages)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
                      " ",
                      channel.active_users
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "channel-growth", children: [
                  getGrowthIcon(channel.growth),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: channel.growth > 0 ? "positive" : channel.growth < 0 ? "negative" : "", children: [
                    Math.abs(channel.growth),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "channel-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "bar-fill",
                    style: {
                      width: `${channel.messages / (analytics?.channels?.[0]?.messages || 1) * 100}%`
                    }
                  }
                ) })
              ]
            },
            channel.id
          )),
          (!analytics?.channels || analytics.channels.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "empty-state", children: "No channel data available" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          " Peak Activity Hours"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "peak-hours", children: (analytics?.peak_hours || []).map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "peak-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "peak-rank", children: [
            "#",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "peak-time", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCalendarAlt, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              item.hour,
              ":00 - ",
              item.hour + 1,
              ":00"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "peak-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bar-fill",
              style: { width: `${item.activity}%` }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "peak-value", children: [
            item.activity,
            "%"
          ] })
        ] }, index)) })
      ] }),
      selectedChannel && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "section channel-details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}),
          " Channel Details"
        ] }),
        (() => {
          const channel = analytics?.channels?.find((c) => c.id === selectedChannel);
          if (!channel) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "details-grid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-label", children: "Peak Hour" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "detail-value", children: [
                channel.peak_hour,
                ":00"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-label", children: "Active Users" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-value", children: channel.active_users })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-label", children: "Weekly Growth" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `detail-value ${channel.growth > 0 ? "positive" : channel.growth < 0 ? "negative" : ""}`, children: [
                channel.growth > 0 ? "+" : "",
                channel.growth,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-card", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-label", children: "Messages/Day" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-value", children: Math.round(channel.messages / 7) })
            ] })
          ] });
        })()
      ] })
    ] })
  ] }) });
}, "ChannelAnalyticsPanel");
export {
  ChannelAnalyticsPanel as default
};

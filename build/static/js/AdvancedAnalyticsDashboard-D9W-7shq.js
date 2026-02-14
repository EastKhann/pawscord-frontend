var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aa as FaArrowUp, ab as FaArrowDown, c4 as FaMinus, u as FaUsers, a0 as FaEye, ac as FaComments, z as FaClock, aT as FaInfoCircle, aE as FaChartBar, by as FaHeart, ax as FaGlobe, j as FaLink, O as FaChartLine, cL as FaSyncAlt, a5 as FaDownload, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const DEFAULT_OVERVIEW = {
  total_members: 0,
  active_members: 0,
  messages_count: 0,
  voice_minutes: 0,
  member_growth: 0,
  message_growth: 0
};
const formatNumber = /* @__PURE__ */ __name((num) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toString();
}, "formatNumber");
const getGrowthIndicator = /* @__PURE__ */ __name((value) => {
  if (value > 0) return { icon: FaArrowUp, color: "#23a559", text: `+${value}%` };
  if (value < 0) return { icon: FaArrowDown, color: "#da373c", text: `${value}%` };
  return { icon: FaMinus, color: "#72767d", text: "0%" };
}, "getGrowthIndicator");
const renderSimpleChart = /* @__PURE__ */ __name((data, color = "#5865f2", height = 60) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map((d) => d.value));
  const width = 100 / data.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "simple-chart", style: { height }, children: data.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-bar", style: { width: `${width}%`, height: `${item.value / max * 100}%`, background: color }, title: `${item.label}: ${item.value}` }, idx)) });
}, "renderSimpleChart");
const useAdvancedAnalytics = /* @__PURE__ */ __name((serverId, apiBaseUrl) => {
  const [timeRange, setTimeRange] = reactExports.useState("7d");
  const [loading, setLoading] = reactExports.useState(true);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [overview, setOverview] = reactExports.useState(DEFAULT_OVERVIEW);
  const [memberActivity, setMemberActivity] = reactExports.useState([]);
  const [messageActivity, setMessageActivity] = reactExports.useState([]);
  const [topChannels, setTopChannels] = reactExports.useState([]);
  const [topMembers, setTopMembers] = reactExports.useState([]);
  const [geoData, setGeoData] = reactExports.useState([]);
  const [reactionStats, setReactionStats] = reactExports.useState([]);
  const [linkClicks, setLinkClicks] = reactExports.useState([]);
  const [peakHours, setPeakHours] = reactExports.useState([]);
  const fetchAllAnalytics = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      const headers = { "Authorization": `Bearer ${token}` };
      const base = `${apiBaseUrl}/analytics/${serverId}`;
      const endpoints = ["overview", "member-activity", "message-activity", "top-channels", "top-members", "geo", "reactions", "link-clicks", "peak-hours"];
      const results = await Promise.all(endpoints.map((ep) => fetch(`${base}/${ep}/?range=${timeRange}`, { headers })));
      const [oRes, mRes, msgRes, chRes, memRes, gRes, rRes, lRes, pRes] = results;
      if (oRes.ok) setOverview(await oRes.json());
      if (mRes.ok) setMemberActivity((await mRes.json()).data || []);
      if (msgRes.ok) setMessageActivity((await msgRes.json()).data || []);
      if (chRes.ok) setTopChannels((await chRes.json()).channels || []);
      if (memRes.ok) setTopMembers((await memRes.json()).members || []);
      if (gRes.ok) setGeoData((await gRes.json()).data || []);
      if (rRes.ok) setReactionStats((await rRes.json()).reactions || []);
      if (lRes.ok) setLinkClicks((await lRes.json()).links || []);
      if (pRes.ok) setPeakHours((await pRes.json()).hours || []);
    } catch (error) {
      console.error("Fetch analytics error:", error);
      toast.error("❌ Analitik verileri yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, "fetchAllAnalytics");
  reactExports.useEffect(() => {
    fetchAllAnalytics();
  }, [serverId, timeRange]);
  const handleRefresh = /* @__PURE__ */ __name(async () => {
    setRefreshing(true);
    await fetchAllAnalytics();
    setRefreshing(false);
    toast.success("🔄 Veriler güncellendi");
  }, "handleRefresh");
  const handleExport = /* @__PURE__ */ __name(() => {
    const exportData = {
      exported_at: (/* @__PURE__ */ new Date()).toISOString(),
      time_range: timeRange,
      overview,
      memberActivity,
      messageActivity,
      topChannels,
      topMembers,
      geoData,
      reactionStats
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics_${serverId}_${timeRange}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("📥 Analitik verileri indirildi");
  }, "handleExport");
  return {
    timeRange,
    setTimeRange,
    loading,
    refreshing,
    overview,
    memberActivity,
    messageActivity,
    topChannels,
    topMembers,
    geoData,
    reactionStats,
    linkClicks,
    peakHours,
    handleRefresh,
    handleExport
  };
}, "useAdvancedAnalytics");
const CARDS = [
  { key: "total_members", icon: FaUsers, label: "Toplam Üye", cls: "members", growth: "member" },
  { key: "active_members", icon: FaEye, label: "Aktif Üye", cls: "active" },
  { key: "messages_count", icon: FaComments, label: "Mesaj", cls: "messages", growth: "message" },
  { key: "voice_minutes", icon: FaClock, label: "Sesli Dakika", cls: "voice" }
];
const OverviewCards = /* @__PURE__ */ __name(({ overview }) => {
  const memberGrowth = getGrowthIndicator(overview.member_growth);
  const messageGrowth = getGrowthIndicator(overview.message_growth);
  const growths = { member: memberGrowth, message: messageGrowth };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overview-section", children: CARDS.map((card) => {
    const g = card.growth ? growths[card.growth] : null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overview-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `card-icon ${card.cls}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(card.icon, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-value", children: formatNumber(overview[card.key]) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "card-label", children: card.label }),
        g ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "card-growth", style: { color: g.color }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(g.icon, {}),
          " ",
          g.text
        ] }) : card.key === "active_members" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "card-detail", children: [
          (overview.active_members / overview.total_members * 100 || 0).toFixed(1),
          "% aktiflik"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "card-detail", children: [
          Math.round(overview.voice_minutes / 60),
          " saat"
        ] })
      ] })
    ] }, card.key);
  }) });
}, "OverviewCards");
const ChartsSection = /* @__PURE__ */ __name(({ memberActivity, messageActivity, peakHours }) => {
  const renderPeakHoursChart = /* @__PURE__ */ __name(() => {
    const hours = Array(24).fill(0).map((_, i) => {
      const h = peakHours.find((x) => x.hour === i);
      return { hour: i, value: h?.value || 0 };
    });
    const max = Math.max(...hours.map((h) => h.value));
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "peak-hours-chart", children: hours.map((h, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hour-bar", style: { height: `${max > 0 ? h.value / max * 100 : 0}%`, background: h.value > max * 0.8 ? "#23a559" : h.value > max * 0.5 ? "#5865f2" : "#3f4147" }, title: `${h.hour}:00 - ${h.value} mesaj`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hour-label", children: h.hour }) }, idx)) });
  }, "renderPeakHoursChart");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "charts-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
        " ",
        "Ü",
        "ye Aktivitesi"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-body", children: memberActivity.length > 0 ? renderSimpleChart(memberActivity, "#5865f2", 120) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-data", children: "Veri yok" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}),
        " Mesaj Aktivitesi"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-body", children: messageActivity.length > 0 ? renderSimpleChart(messageActivity, "#23a559", 120) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-data", children: "Veri yok" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card wide", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          " Yo",
          "ğ",
          "unluk Saatleri"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "chart-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaInfoCircle, {}),
          " En yo",
          "ğ",
          "un saatler ye",
          "ş",
          "il ile g",
          "ö",
          "sterilir"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-body", children: peakHours.length > 0 ? renderPeakHoursChart() : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-data", children: "Veri yok" }) })
    ] })
  ] });
}, "ChartsSection");
const ListsSection = /* @__PURE__ */ __name(({ topChannels, topMembers, reactionStats, geoData }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lists-grid", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "list-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartBar, {}),
      " En Aktif Kanallar"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-body", children: topChannels.length > 0 ? topChannels.map((ch, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "list-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rank", children: idx + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "name", children: [
        "# ",
        ch.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar", style: { width: `${ch.messages / topChannels[0].messages * 100}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "value", children: formatNumber(ch.messages) })
    ] }, ch.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-data", children: "Veri yok" }) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "list-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
      " En Aktif ",
      "Ü",
      "yeler"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-body", children: topMembers.length > 0 ? topMembers.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "list-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rank", children: idx + 1 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: m.avatar || "/default-avatar.png", alt: m.username, className: "avatar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "name", children: m.username }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "value", children: [
        formatNumber(m.messages),
        " mesaj"
      ] })
    ] }, m.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-data", children: "Veri yok" }) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "list-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaHeart, {}),
      " En ",
      "Ç",
      "ok Kullan",
      "ı",
      "lan Reaksiyonlar"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-body", children: reactionStats.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reactions-grid", children: reactionStats.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reaction-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "emoji", children: r.emoji }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "count", children: formatNumber(r.count) })
    ] }, idx)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-data", children: "Veri yok" }) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "list-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, {}),
      " Co",
      "ğ",
      "rafi Da",
      "ğı",
      "l",
      "ı",
      "m"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "list-body", children: geoData.length > 0 ? geoData.map((g, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "list-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flag", children: g.flag || "🌍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "name", children: g.country }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bar geo", style: { width: `${g.count / geoData[0].count * 100}%` } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "value", children: [
        g.percentage,
        "%"
      ] })
    ] }, idx)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-data", children: "Veri yok" }) })
  ] })
] }), "ListsSection");
const LinkClicksSection = /* @__PURE__ */ __name(({ linkClicks }) => {
  if (linkClicks.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "links-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
      " Link T",
      "ı",
      "klamalar",
      "ı"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "links-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "table-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "URL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "T",
          "ı",
          "klama"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Benzersiz" })
      ] }),
      linkClicks.map((link, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "table-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "link-url", title: link.url, children: link.url.length > 50 ? link.url.substring(0, 50) + "..." : link.url }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatNumber(link.clicks) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatNumber(link.unique_clicks) })
      ] }, idx))
    ] })
  ] });
}, "LinkClicksSection");
const TIME_RANGES = [
  { value: "24h", label: "24 Saat" },
  { value: "7d", label: "7 Gün" },
  { value: "30d", label: "30 Gün" },
  { value: "90d", label: "90 Gün" }
];
const AdvancedAnalyticsDashboard = /* @__PURE__ */ __name(({ serverId, apiBaseUrl, onClose }) => {
  const {
    timeRange,
    setTimeRange,
    loading,
    refreshing,
    overview,
    memberActivity,
    messageActivity,
    topChannels,
    topMembers,
    geoData,
    reactionStats,
    linkClicks,
    peakHours,
    handleRefresh,
    handleExport
  } = useAdvancedAnalytics(serverId, apiBaseUrl);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Analitik verileri y",
        "ü",
        "kleniyor..."
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "analytics-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}),
        " Geli",
        "ş",
        "mi",
        "ş",
        " Analitik"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "time-range-selector", children: TIME_RANGES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `range-btn ${timeRange === r.value ? "active" : ""}`, onClick: /* @__PURE__ */ __name(() => setTimeRange(r.value), "onClick"), children: r.label }, r.value)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn", onClick: handleRefresh, disabled: refreshing, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSyncAlt, { className: refreshing ? "spinning" : "" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "action-btn", onClick: handleExport, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "analytics-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewCards, { overview }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartsSection, { memberActivity, messageActivity, peakHours }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListsSection, { topChannels, topMembers, reactionStats, geoData }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(LinkClicksSection, { linkClicks })
    ] })
  ] }) });
}, "AdvancedAnalyticsDashboard");
export {
  AdvancedAnalyticsDashboard as default
};

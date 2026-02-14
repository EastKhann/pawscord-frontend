var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, r as reactExports } from "./react-core-BiY6fgAJ.js";
import { aa as FaArrowUp, ab as FaArrowDown, ac as FaComments, ad as FaUserPlus, u as FaUsers, a0 as FaEye, ae as FaMobile, af as FaDesktop, ag as FaUserMinus, ah as FaCrown, ai as FaShoppingCart, O as FaChartLine, y as FaServer, a5 as FaDownload, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, f as Area, L as LineChart, b as Line, B as BarChart, c as Bar } from "./chart-vendor-4kC5cP2G.js";
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
    zIndex: 1e4,
    backdropFilter: "blur(5px)"
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "1200px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)"
  },
  header: {
    padding: "20px",
    borderBottom: "1px solid #1e1f22",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px", color: "#fff" },
  headerRight: { display: "flex", gap: "10px" },
  title: { margin: 0, fontSize: "24px", color: "#fff" },
  exportButton: {
    background: "#23a559",
    border: "none",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  closeButton: {
    background: "#da373c",
    border: "none",
    color: "#fff",
    padding: "10px 15px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px"
  },
  tabs: {
    display: "flex",
    padding: "0 20px",
    borderBottom: "1px solid #1e1f22",
    gap: "5px"
  },
  tab: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    borderBottom: "2px solid transparent",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s"
  },
  activeTab: { color: "#fff", borderBottomColor: "#5865f2" },
  content: { flex: 1, overflow: "auto", padding: "20px" },
  tabContent: { display: "flex", flexDirection: "column", gap: "20px" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px"
  },
  statCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  statIcon: { fontSize: "32px" },
  statContent: { flex: 1 },
  statLabel: { color: "#b9bbbe", fontSize: "12px", marginBottom: "5px" },
  statValue: { color: "#fff", fontSize: "24px", fontWeight: "bold" },
  statSubtitle: { color: "#747f8d", fontSize: "11px", marginTop: "3px" },
  section: { backgroundColor: "#1e1f22", borderRadius: "8px", padding: "20px" },
  sectionTitle: { color: "#fff", fontSize: "16px", marginBottom: "15px", margin: "0 0 15px 0" },
  activityList: { display: "flex", flexDirection: "column", gap: "10px" },
  activityItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#2b2d31",
    borderRadius: "6px"
  },
  activityIcon: { color: "#5865f2", marginRight: "12px", fontSize: "18px" },
  activityLabel: { flex: 1, color: "#b9bbbe", fontSize: "14px" },
  activityValue: { color: "#fff", fontSize: "16px", fontWeight: "bold" },
  list: { display: "flex", flexDirection: "column", gap: "8px" },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    backgroundColor: "#2b2d31",
    borderRadius: "6px",
    color: "#b9bbbe",
    fontSize: "14px"
  },
  pieChart: { display: "flex", flexDirection: "column", gap: "12px" },
  pieItem: { display: "flex", alignItems: "center", gap: "12px" },
  pieColor: { width: "20px", height: "20px", borderRadius: "4px" },
  pieLabel: { flex: 1, color: "#b9bbbe", fontSize: "14px" },
  pieValue: { color: "#fff", fontSize: "16px", fontWeight: "bold" },
  loading: { color: "#fff", textAlign: "center", padding: "40px" },
  error: { color: "#da373c", textAlign: "center", padding: "40px" },
  growthSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
    marginBottom: "20px"
  },
  growthCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  growthLabel: { color: "#b9bbbe", fontSize: "12px" },
  growthValue: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "20px",
    fontWeight: "bold"
  },
  deviceStats: { display: "flex", gap: "20px", flexWrap: "wrap" },
  deviceCard: {
    flex: "1 1 200px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    backgroundColor: "#2b2d31",
    padding: "20px",
    borderRadius: "8px"
  },
  deviceInfo: { display: "flex", flexDirection: "column", gap: "4px" },
  deviceLabel: { color: "#b9bbbe", fontSize: "12px" },
  deviceValue: { color: "#fff", fontSize: "24px", fontWeight: "bold" },
  devicePercent: { color: "#5865f2", fontSize: "14px", fontWeight: "bold" }
};
const formatNumber = /* @__PURE__ */ __name((num) => {
  if (num === void 0 || num === null) return "0";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num.toLocaleString();
}, "formatNumber");
const StatCard = /* @__PURE__ */ __name(({ icon, label, value, color, subtitle }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.statCard, borderTop: `3px solid ${color}` }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.statIcon, color }, children: icon }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statContent, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statLabel, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statValue, children: value }),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.statSubtitle, children: subtitle })
  ] })
] }), "StatCard");
const GrowthCard = /* @__PURE__ */ __name(({ label, value, isPositive, suffix = "%", icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.growthCard, borderLeft: `4px solid ${isPositive ? "#23a559" : "#ed4245"}` }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.growthLabel, children: label }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.growthValue, color: isPositive ? "#23a559" : "#ed4245" }, children: [
    icon || (isPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowDown, {})),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      typeof value === "number" ? value.toFixed(1) : value,
      suffix
    ] })
  ] })
] }), "GrowthCard");
const ActivityItem = /* @__PURE__ */ __name(({ icon, label, value, color = "#5865f2" }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.activityItem, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.activityIcon, color }, children: icon }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.activityLabel, children: label }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.activityValue, color }, children: value })
] }), "ActivityItem");
const PieItem = /* @__PURE__ */ __name(({ label, value, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pieItem, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.pieColor, backgroundColor: color } }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pieLabel, children: label }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pieValue, children: value })
] }), "PieItem");
const tooltipStyle = /* @__PURE__ */ __name((borderColor) => ({
  backgroundColor: "#1e1f22",
  border: `1px solid ${borderColor}`,
  borderRadius: "6px",
  color: "#fff"
}), "tooltipStyle");
const axisProps = {
  stroke: "#b9bbbe",
  tick: { fill: "#b9bbbe", fontSize: 12 },
  interval: 4
};
const OverviewTab = /* @__PURE__ */ __name(({ stats }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabContent, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.growthSection, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthCard, { label: "Mesaj Artışı (24h)", value: stats.message_growth_24h || 0, isPositive: (stats.message_growth_24h || 0) >= 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthCard, { label: "Kayıt Artışı (24h)", value: stats.signup_growth_24h || 0, isPositive: (stats.signup_growth_24h || 0) >= 0 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthCard, { label: "Günlük Ort. Mesaj", value: stats.avg_messages_per_day || 0, isPositive: true, suffix: "", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GrowthCard, { label: "Günlük Ort. Kayıt", value: stats.avg_signups_per_day || 0, isPositive: true, suffix: "", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserPlus, {}) })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
        label: "Toplam Kullanıcı",
        value: stats.total_users || 0,
        color: "#5865f2",
        subtitle: `Online: ${stats.online_users || 0} | Aktif: ${stats.active_users || 0}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}),
        label: "Toplam Sunucu",
        value: stats.total_servers || 0,
        color: "#23a559",
        subtitle: `Son 24h: +${stats.new_servers_24h || 0}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}),
        label: "Toplam Mesaj",
        value: formatNumber(stats.total_messages || 0),
        color: "#f0b132",
        subtitle: `Son 24h: ${formatNumber(stats.messages_24h || 0)}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}),
        label: "Toplam Ziyaret",
        value: formatNumber(stats.total_page_views || 0),
        color: "#e91e63",
        subtitle: `Son 24h: ${formatNumber(stats.page_views_24h || 0)}`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
        label: "Premium Kullanıcı",
        value: stats.premium_users || 0,
        color: "#9b59b6",
        subtitle: `Gelir: ${stats.monthly_revenue || 0} TL/ay`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
        label: "Benzersiz Ziyaretçi",
        value: formatNumber(stats.unique_visitors_30d || 0),
        color: "#00bcd4",
        subtitle: `Son 24h: ${formatNumber(stats.unique_visitors_24h || 0)}`
      }
    )
  ] }),
  (stats.mobile_views > 0 || stats.desktop_views > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "📱 Cihaz Dağılımı (Son 7 Gün)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deviceStats, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deviceCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMobile, { size: 32, color: "#5865f2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deviceInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.deviceLabel, children: "Mobil" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.deviceValue, children: formatNumber(stats.mobile_views || 0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.devicePercent, children: [
            Math.round((stats.mobile_views || 0) / ((stats.mobile_views || 0) + (stats.desktop_views || 1)) * 100),
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deviceCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, { size: 32, color: "#23a559" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.deviceInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.deviceLabel, children: "Masaüstü" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.deviceValue, children: formatNumber(stats.desktop_views || 0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.devicePercent, children: [
            Math.round((stats.desktop_views || 0) / ((stats.mobile_views || 0) + (stats.desktop_views || 1)) * 100),
            "%"
          ] })
        ] })
      ] })
    ] })
  ] }),
  stats.daily_stats && stats.daily_stats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "📨 Günlük Mesaj Sayısı (Son 30 Gün)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: stats.daily_stats, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorMessages", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#5865f2", stopOpacity: 0.8 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#5865f2", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1e1f22" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", ...axisProps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#b9bbbe", tick: { fill: "#b9bbbe", fontSize: 12 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle("#5865f2") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "messages", stroke: "#5865f2", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorMessages)" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "👥 Günlük Aktif Kullanıcı (Son 30 Gün)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: stats.daily_stats, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1e1f22" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", ...axisProps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#b9bbbe", tick: { fill: "#b9bbbe", fontSize: 12 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle("#23a559") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "active_users", stroke: "#23a559", strokeWidth: 3, dot: { fill: "#23a559", r: 4 }, activeDot: { r: 6 } })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "🆕 Günlük Yeni Kayıtlar (Son 30 Gün)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: stats.daily_stats, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1e1f22" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", ...axisProps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#b9bbbe", tick: { fill: "#b9bbbe", fontSize: 12 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle("#f0b132") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "signups", fill: "#f0b132", radius: [8, 8, 0, 0] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "👁️ Günlük Ziyaret Sayısı (Son 30 Gün)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: stats.daily_stats, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "colorPageViews", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#e91e63", stopOpacity: 0.8 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#e91e63", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1e1f22" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", ...axisProps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#b9bbbe", tick: { fill: "#b9bbbe", fontSize: 12 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle("#e91e63") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "page_views", stroke: "#e91e63", strokeWidth: 2, fillOpacity: 1, fill: "url(#colorPageViews)" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "👥 Günlük Benzersiz Ziyaretçi (Son 30 Gün)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 250, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: stats.daily_stats, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#1e1f22" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", ...axisProps }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "#b9bbbe", tick: { fill: "#b9bbbe", fontSize: 12 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle("#00bcd4") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "unique_visitors", stroke: "#00bcd4", strokeWidth: 3, dot: { fill: "#00bcd4", r: 4 }, activeDot: { r: 6 } })
      ] }) })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Son Aktiviteler (24 Saat)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.activityList, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserPlus, {}), label: "Yeni Kayıtlar", value: stats.new_signups_24h || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}), label: "Yeni Sunucular", value: stats.new_servers_24h || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}), label: "Mesajlar", value: stats.messages_24h || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}), label: "Aktif Kullanıcı", value: stats.active_users_24h || 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}), label: "Sayfa Ziyareti", value: stats.page_views_24h || 0, color: "#e91e63" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActivityItem, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}), label: "Benzersiz Ziyaretçi", value: stats.unique_visitors_24h || 0, color: "#00bcd4" })
    ] })
  ] }),
  stats.top_pages && stats.top_pages.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "📊 En Çok Ziyaret Edilen Sayfalar (Son 30 Gün)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.list, children: stats.top_pages.slice(0, 10).map((page, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "#",
        index + 1,
        " ",
        page?.path || "Unknown"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#e91e63", fontWeight: "bold" }, children: [
        (page?.views || 0).toLocaleString(),
        " ziyaret"
      ] })
    ] }, index)) })
  ] })
] }), "OverviewTab");
const UsersTab = /* @__PURE__ */ __name(({ stats }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabContent, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}), label: "Toplam Kullanıcı", value: stats.total_users || 0, color: "#5865f2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserPlus, {}), label: "Online", value: stats.online_users || 0, color: "#23a559" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserMinus, {}), label: "Offline", value: stats.total_users - stats.online_users || 0, color: "#747f8d" })
  ] }),
  stats.top_users && stats.top_users.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "En Aktif Kullanıcılar" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.list, children: stats.top_users.map((user, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "#",
        index + 1,
        " ",
        user.username
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        user.message_count,
        " mesaj"
      ] })
    ] }, index)) })
  ] })
] }), "UsersTab");
const PremiumTab = /* @__PURE__ */ __name(({ stats }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabContent, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, {}), label: "Premium Kullanıcı", value: stats.premium_users || 0, color: "#9b59b6" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaShoppingCart, {}), label: "Aylık Gelir", value: `${stats.monthly_revenue || 0} TL`, color: "#f0b132" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}), label: "Yıllık Tahmin", value: `${(stats.monthly_revenue || 0) * 12} TL`, color: "#23a559" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "Premium Dağılımı" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pieChart, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PieItem, { label: "Ücretsiz", value: stats.free_users || 0, color: "#747f8d" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PieItem, { label: "Nitro Basic", value: stats.basic_users || 0, color: "#5865f2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PieItem, { label: "Nitro Premium", value: stats.premium_tier_users || 0, color: "#9b59b6" })
    ] })
  ] })
] }), "PremiumTab");
const ServersTab = /* @__PURE__ */ __name(({ stats }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabContent, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsGrid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}), label: "Toplam Sunucu", value: stats.total_servers || 0, color: "#5865f2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}), label: "Genel Sunucu", value: stats.public_servers || 0, color: "#23a559" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}), label: "Ortalama Üye", value: stats.avg_server_members || 0, color: "#f0b132" })
  ] }),
  stats.top_servers && stats.top_servers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: "En Büyük Sunucular" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.list, children: stats.top_servers.map((server, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "#",
        index + 1,
        " ",
        server.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        server.member_count,
        " üye"
      ] })
    ] }, index)) })
  ] })
] }), "ServersTab");
const AdminAnalyticsPanel = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl }) => {
  const [stats, setStats] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  reactExports.useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 3e4);
    return () => clearInterval(interval);
  }, []);
  const fetchStats = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/admin/analytics/`);
      if (response.ok) setStats(await response.json());
    } catch (error) {
      console.error("Analytics fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchStats");
  const exportData = /* @__PURE__ */ __name(() => {
    if (!stats) return;
    const dataBlob = new Blob([JSON.stringify(stats, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.json`;
    link.click();
  }, "exportData");
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modal, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Yükleniyor..." }) }) });
  if (!stats) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modal, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.error, children: "Analytics verisi yüklenemedi" }) }) });
  const TABS = [
    { key: "overview", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}), label: "Genel" },
    { key: "users", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}), label: "Kullanıcılar" },
    { key: "premium", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, {}), label: "Premium" },
    { key: "servers", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaServer, {}), label: "Sunucular" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { size: 24 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Admin Analytics" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: exportData, style: styles.exportButton, title: "Export JSON", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tabs, children: TABS.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setActiveTab(t.key), "onClick"),
        style: { ...styles.tab, ...activeTab === t.key && styles.activeTab },
        children: [
          t.icon,
          " ",
          t.label
        ]
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      activeTab === "overview" && /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, { stats }),
      activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, { stats }),
      activeTab === "premium" && /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumTab, { stats }),
      activeTab === "servers" && /* @__PURE__ */ jsxRuntimeExports.jsx(ServersTab, { stats })
    ] })
  ] }) });
}, "AdminAnalyticsPanel");
export {
  AdminAnalyticsPanel as default
};

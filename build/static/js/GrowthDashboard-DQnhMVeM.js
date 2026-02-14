var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as axios } from "./index-BnLT0o6q.js";
import { R as ResponsiveContainer, L as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Legend, b as Line, B as BarChart, c as Bar, P as PieChart, d as Pie, e as Cell } from "./chart-vendor-4kC5cP2G.js";
import "./ui-vendor-iPoN0WGz.js";
function GrowthDashboard() {
  const [metrics, setMetrics] = reactExports.useState([]);
  const [totals, setTotals] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, 5 * 60 * 1e3);
    return () => clearInterval(interval);
  }, []);
  const loadDashboard = /* @__PURE__ */ __name(async () => {
    try {
      const response = await axios.get("/api/growth/dashboard/");
      setMetrics(response.data.metrics);
      setTotals(response.data.totals);
    } catch (error) {
      console.error("Failed to load dashboard:", error);
    } finally {
      setLoading(false);
    }
  }, "loadDashboard");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading growth dashboard..." });
  }
  const sourceData = metrics.reduce((acc, day) => {
    Object.entries(day.sources || {}).forEach(([source, count]) => {
      acc[source] = (acc[source] || 0) + count;
    });
    return acc;
  }, {});
  const pieData = Object.entries(sourceData).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];
  const avgActiveRate = metrics.length > 0 ? (metrics.reduce((sum, m) => sum + m.active_users, 0) / metrics.length).toFixed(0) : 0;
  const lastWeekUsers = metrics.slice(-7).reduce((sum, m) => sum + m.new_users, 0);
  const prevWeekUsers = metrics.slice(-14, -7).reduce((sum, m) => sum + m.new_users, 0);
  const growthRate = prevWeekUsers > 0 ? ((lastWeekUsers - prevWeekUsers) / prevWeekUsers * 100).toFixed(1) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "growth-dashboard", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "dashboard-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "📈 Growth Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: loadDashboard, className: "refresh-btn", children: "🔄 Refresh" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metrics-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-icon", children: "👥" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-value", children: totals.users?.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label", children: "Total Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-change positive", children: [
          "+",
          lastWeekUsers,
          " this week"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-icon", children: "⚡" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-value", children: avgActiveRate }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label", children: "Avg Daily Active" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-change", children: [
          (avgActiveRate / totals.users * 100).toFixed(1),
          "% rate"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-icon", children: "💰" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-value", children: [
          "$",
          totals.revenue?.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label", children: "Total Revenue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-change positive", children: [
          "MRR: $",
          (totals.revenue / 12).toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-icon", children: "📧" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-value", children: totals.waitlist?.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metric-label", children: "Waitlist Signups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metric-change", children: [
          (totals.waitlist / (totals.users || 1) * 100).toFixed(0),
          "% conversion"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "growth-rate-banner", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "📊 Week-over-Week Growth" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `growth-percentage ${growthRate > 0 ? "positive" : "negative"}`, children: [
        growthRate > 0 ? "+" : "",
        growthRate,
        "%"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Last week: ",
        lastWeekUsers,
        " users | Previous week: ",
        prevWeekUsers,
        " users"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "charts-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "New Users (Last 14 Days)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: metrics, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "new_users", stroke: "#8884d8", strokeWidth: 2, name: "New Users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "active_users", stroke: "#82ca9d", strokeWidth: 2, name: "Active Users" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Revenue & Premium Signups" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: metrics, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "revenue", fill: "#82ca9d", name: "Revenue ($)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "premium", fill: "#ffc658", name: "Premium Signups" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Traffic Sources" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Pie,
            {
              data: pieData,
              cx: "50%",
              cy: "50%",
              labelLine: false,
              label: /* @__PURE__ */ __name(({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`, "label"),
              outerRadius: 80,
              fill: "#8884d8",
              dataKey: "value",
              children: pieData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Source Breakdown (Last 7 Days)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: metrics.slice(-7), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "sources.producthunt", stackId: "a", fill: "#ff6384", name: "ProductHunt" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "sources.reddit", stackId: "a", fill: "#36a2eb", name: "Reddit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "sources.hackernews", stackId: "a", fill: "#ffce56", name: "Hacker News" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "sources.organic", stackId: "a", fill: "#4bc0c0", name: "Organic" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "sources.referral", stackId: "a", fill: "#9966ff", name: "Referral" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "sources.paid", stackId: "a", fill: "#ff9f40", name: "Paid Ads" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats-table-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "📅 Daily Statistics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "stats-table", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "New Users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Active Users" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Premium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Revenue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Top Source" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: metrics.slice().reverse().map((day, index) => {
          const topSource = Object.entries(day.sources || {}).sort((a, b) => b[1] - a[1])[0];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: day.date }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "number", children: day.new_users }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "number", children: day.active_users }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "number", children: day.premium }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "number", children: [
              "$",
              day.revenue
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: topSource ? topSource[0] : "N/A" })
          ] }, index);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "goals-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎯 Launch Goals (Jan 22 - Feb 5)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "goal-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "goal-label", children: "1000 Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "progress-fill",
            style: { width: `${Math.min(totals.users / 1e3 * 100, 100)}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "goal-value", children: [
          totals.users,
          " / 1000 (",
          (totals.users / 1e3 * 100).toFixed(1),
          "%)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "goal-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "goal-label", children: "$250 MRR" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "progress-fill",
            style: { width: `${Math.min(totals.revenue / 12 / 250 * 100, 100)}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "goal-value", children: [
          "$",
          (totals.revenue / 12).toFixed(2),
          " / $250"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "goal-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "goal-label", children: "200 Waitlist" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "progress-fill",
            style: { width: `${Math.min(totals.waitlist / 200 * 100, 100)}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "goal-value", children: [
          totals.waitlist,
          " / 200 (",
          (totals.waitlist / 200 * 100).toFixed(1),
          "%)"
        ] })
      ] })
    ] })
  ] });
}
__name(GrowthDashboard, "GrowthDashboard");
export {
  GrowthDashboard as default
};

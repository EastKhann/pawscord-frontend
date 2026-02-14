var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports, e as reactDomExports } from "./react-core-BiY6fgAJ.js";
import { aa as FaArrowUp, ab as FaArrowDown, O as FaChartLine, a as FaTimes, u as FaUsers, ac as FaComments, z as FaClock, aF as FaHashtag } from "./icons-vendor-2VDeY8fW.js";
const useServerAnalytics = /* @__PURE__ */ __name(({ serverId, fetchWithAuth, apiBaseUrl }) => {
  const [analytics, setAnalytics] = reactExports.useState(null);
  const [comparison, setComparison] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [period, setPeriod] = reactExports.useState("30d");
  const fetchAnalytics = reactExports.useCallback(async () => {
    if (!serverId) return;
    setLoading(true);
    try {
      const [analyticsRes, comparisonRes] = await Promise.all([
        fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/analytics/?period=${period}`),
        fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/analytics/compare/`)
      ]);
      if (analyticsRes.ok) {
        const data = await analyticsRes.json();
        setAnalytics(data);
      }
      if (comparisonRes.ok) {
        const data = await comparisonRes.json();
        setComparison(data);
      }
    } catch (e) {
      console.error("Analytics fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [serverId, period, fetchWithAuth, apiBaseUrl]);
  return { analytics, comparison, loading, period, setPeriod, fetchAnalytics };
}, "useServerAnalytics");
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
    zIndex: 1e4
  },
  modal: {
    width: "95%",
    maxWidth: "1200px",
    maxHeight: "90vh",
    backgroundColor: "#2f3136",
    borderRadius: "12px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderBottom: "1px solid #202225"
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
  title: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "600",
    margin: 0
  },
  periodSelect: {
    padding: "8px 12px",
    backgroundColor: "#36393f",
    border: "1px solid #40444b",
    borderRadius: "4px",
    color: "#dcddde",
    fontSize: "14px",
    cursor: "pointer"
  },
  closeBtn: {
    background: "none",
    border: "none",
    color: "#72767d",
    fontSize: "20px",
    cursor: "pointer",
    padding: "4px"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px"
  },
  loadingState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    color: "#72767d",
    gap: "16px"
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #36393f",
    borderTopColor: "#5865f2",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  errorState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    color: "#dcddde",
    textAlign: "center"
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    marginBottom: "24px"
  },
  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "20px",
    backgroundColor: "#36393f",
    borderRadius: "8px"
  },
  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "20px"
  },
  statInfo: {
    display: "flex",
    flexDirection: "column"
  },
  statLabel: {
    color: "#72767d",
    fontSize: "12px",
    marginBottom: "4px"
  },
  statValue: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "700"
  },
  statSubtext: {
    color: "#72767d",
    fontSize: "11px"
  },
  statChange: {
    fontSize: "12px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginTop: "4px"
  },
  chartsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "16px",
    marginBottom: "24px"
  },
  chartCard: {
    backgroundColor: "#36393f",
    borderRadius: "8px",
    padding: "20px"
  },
  chartTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px"
  },
  barChart: {
    display: "flex",
    alignItems: "flex-end",
    gap: "4px",
    height: "120px"
  },
  barContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%"
  },
  bar: {
    width: "100%",
    backgroundColor: "#5865f2",
    borderRadius: "4px 4px 0 0",
    transition: "height 0.3s",
    minHeight: "4px"
  },
  barLabel: {
    color: "#72767d",
    fontSize: "10px",
    marginTop: "4px"
  },
  hourlyChart: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "4px"
  },
  hourBlock: {
    aspectRatio: "1",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "10px",
    cursor: "default"
  },
  listsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
    marginBottom: "24px"
  },
  listCard: {
    backgroundColor: "#36393f",
    borderRadius: "8px",
    padding: "20px"
  },
  listTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    backgroundColor: "#2f3136",
    borderRadius: "4px"
  },
  listRank: {
    color: "#5865f2",
    fontWeight: "600",
    width: "24px"
  },
  listName: {
    color: "#dcddde",
    flex: 1
  },
  listValue: {
    color: "#72767d",
    fontSize: "12px"
  },
  emptyList: {
    color: "#72767d",
    textAlign: "center",
    padding: "20px"
  },
  pieChart: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  contentBarContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  contentBarLabel: {
    display: "flex",
    justifyContent: "space-between",
    color: "#dcddde",
    fontSize: "12px"
  },
  contentBarTrack: {
    height: "8px",
    backgroundColor: "#202225",
    borderRadius: "4px",
    overflow: "hidden"
  },
  contentBarFill: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.3s"
  },
  comparisonSection: {
    backgroundColor: "#36393f",
    borderRadius: "8px",
    padding: "20px"
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "16px"
  },
  comparisonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px"
  },
  comparisonCard: {
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  comparisonLabel: {
    color: "#fff",
    fontWeight: "600"
  },
  comparisonValues: {
    display: "flex",
    gap: "24px"
  },
  comparisonValue: {
    display: "flex",
    flexDirection: "column"
  },
  comparisonPeriod: {
    color: "#72767d",
    fontSize: "11px"
  },
  comparisonNumber: {
    color: "#dcddde",
    fontSize: "18px",
    fontWeight: "600"
  },
  comparisonChange: {
    fontSize: "14px"
  }
};
const StatCard = /* @__PURE__ */ __name(({ icon, label, value, subtext, change, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statCard, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.statIcon, backgroundColor: color }, children: icon }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statInfo, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statLabel, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statValue, children: typeof value === "number" ? value.toLocaleString() : value }),
    subtext && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.statSubtext, children: subtext }),
    change !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
      ...styles.statChange,
      color: change >= 0 ? "#43b581" : "#f04747"
    }, children: [
      change >= 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowUp, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowDown, {}),
      " ",
      Math.abs(change),
      "%"
    ] })
  ] })
] }), "StatCard");
const ContentBar = /* @__PURE__ */ __name(({ label, value, total, color }) => {
  const percentage = total > 0 ? Math.round(value / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contentBarContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contentBarLabel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        value,
        " (",
        percentage,
        "%)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.contentBarTrack, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      ...styles.contentBarFill,
      width: `${percentage}%`,
      backgroundColor: color
    } }) })
  ] });
}, "ContentBar");
const ComparisonCard = /* @__PURE__ */ __name(({ label, thisWeek, lastWeek, change }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.comparisonCard, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.comparisonLabel, children: label }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.comparisonValues, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.comparisonValue, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.comparisonPeriod, children: "Bu Hafta" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.comparisonNumber, children: thisWeek?.toLocaleString() || 0 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.comparisonValue, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.comparisonPeriod, children: [
        "Ge",
        "ç",
        "en Hafta"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.comparisonNumber, children: lastWeek?.toLocaleString() || 0 })
    ] })
  ] }),
  change !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
    ...styles.comparisonChange,
    color: change >= 0 ? "#43b581" : "#f04747"
  }, children: [
    change >= 0 ? "📈" : "📉",
    " ",
    change >= 0 ? "+" : "",
    change,
    "%"
  ] })
] }), "ComparisonCard");
const ServerAnalyticsDashboard = /* @__PURE__ */ __name(({ isOpen, onClose, serverId, serverName, fetchWithAuth, apiBaseUrl }) => {
  const { analytics, comparison, loading, period, setPeriod, fetchAnalytics } = useServerAnalytics({ serverId, fetchWithAuth, apiBaseUrl });
  reactExports.useEffect(() => {
    if (isOpen && serverId) fetchAnalytics();
  }, [isOpen, serverId, fetchAnalytics]);
  if (!isOpen) return null;
  const modalContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.title, children: [
          serverName || "Sunucu",
          " Analytics"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: period, onChange: /* @__PURE__ */ __name((e) => setPeriod(e.target.value), "onChange"), style: styles.periodSelect, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "7d", children: [
            "Son 7 G",
            "ü",
            "n"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "30d", children: [
            "Son 30 G",
            "ü",
            "n"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: "90d", children: [
            "Son 90 G",
            "ü",
            "n"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.loadingState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.spinner }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "Veriler y",
        "ü",
        "kleniyor..."
      ] })
    ] }) : analytics ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}), label: `Toplam Üye`, value: analytics.member_growth?.total || 0, change: comparison?.change?.active_users, color: "#5865f2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, {}), label: "Toplam Mesaj", value: analytics.message_stats?.total || 0, subtext: `Günlük ort: ${analytics.message_stats?.daily_average || 0}`, change: comparison?.change?.messages, color: "#43b581" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}), label: `Aktif Üye`, value: analytics.active_users?.total || 0, subtext: `%${analytics.active_users?.activity_rate || 0} aktivite`, color: "#faa61a" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}), label: "En Yoğun Saat", value: analytics.peak_hours?.peak_hour_label || "-", color: "#f04747" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.chartsRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.chartCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.chartTitle, children: [
            "📈",
            " Mesaj Aktivitesi"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.barChart, children: analytics.message_stats?.daily?.slice(-14).map((d, i) => {
            const maxCount = Math.max(...analytics.message_stats?.daily?.map((x) => x.count) || [1]);
            const height = d.count / maxCount * 100;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.barContainer, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.bar, height: `${Math.max(height, 5)}%` }, title: `${d.date}: ${d.count} mesaj` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.barLabel, children: new Date(d.date).getDate() })
            ] }, i);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.chartCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.chartTitle, children: [
            "⏰",
            " Saatlik Aktivite"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.hourlyChart, children: analytics.peak_hours?.hourly?.map((count, hour) => {
            const maxCount = Math.max(...analytics.peak_hours?.hourly || [1]);
            const intensity = count / maxCount;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.hourBlock, backgroundColor: `rgba(88, 101, 242, ${Math.max(intensity, 0.1)})` }, title: `${hour}:00 - ${count} mesaj`, children: hour }, hour);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listsRow, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.listTitle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, {}),
            " Pop",
            "ü",
            "ler Kanallar"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.list, children: [
            analytics.popular_channels?.slice(0, 5).map((channel, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listItem, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.listRank, children: [
                "#",
                i + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.listName, children: channel.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.listValue, children: [
                channel.messages,
                " mesaj"
              ] })
            ] }, i)),
            (!analytics.popular_channels || analytics.popular_channels.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emptyList, children: "Veri yok" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.listTitle, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
            " En Aktif ",
            "Ü",
            "yeler"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.list, children: [
            analytics.active_users?.top_users?.slice(0, 5).map((user, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listItem, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.listRank, children: [
                "#",
                i + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.listName, children: user.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.listValue, children: [
                user.messages,
                " mesaj"
              ] })
            ] }, i)),
            (!analytics.active_users?.top_users || analytics.active_users.top_users.length === 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.emptyList, children: "Veri yok" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.listCard, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.listTitle, children: [
            "📊",
            " ",
            "İç",
            "erik Da",
            "ğı",
            "l",
            "ı",
            "m",
            "ı"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pieChart, children: analytics.content_breakdown && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContentBar, { label: "Metin", value: analytics.content_breakdown.text_only, total: analytics.message_stats?.total || 1, color: "#5865f2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContentBar, { label: "Resimli", value: analytics.content_breakdown.with_images, total: analytics.message_stats?.total || 1, color: "#43b581" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContentBar, { label: "Dosyalı", value: analytics.content_breakdown.with_files, total: analytics.message_stats?.total || 1, color: "#faa61a" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ContentBar, { label: "Ses", value: analytics.content_breakdown.voice_messages, total: analytics.message_stats?.total || 1, color: "#f04747" })
          ] }) })
        ] })
      ] }),
      comparison && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.comparisonSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          "📊",
          " Haftal",
          "ı",
          "k Kar",
          "şı",
          "la",
          "ş",
          "t",
          "ı",
          "rma"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.comparisonGrid, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComparisonCard, { label: "Mesajlar", thisWeek: comparison.this_week?.messages, lastWeek: comparison.last_week?.messages, change: comparison.change?.messages }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComparisonCard, { label: `Aktif Üyeler`, thisWeek: comparison.this_week?.active_users, lastWeek: comparison.last_week?.active_users, change: comparison.change?.active_users })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.errorState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "48px" }, children: "📊" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Analytics verileri y",
        "ü",
        "klenemedi"
      ] })
    ] }) })
  ] }) });
  return reactDomExports.createPortal(modalContent, document.body);
}, "ServerAnalyticsDashboard");
export {
  ServerAnalyticsDashboard as default
};

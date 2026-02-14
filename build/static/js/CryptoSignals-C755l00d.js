var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, r as reactExports, a as React } from "./react-core-BiY6fgAJ.js";
import { J as FaBitcoin, X as FaExternalLinkAlt, A as FaArrowLeft, z as FaClock, c as FaSync, O as FaChartLine, P as FaTrophy, V as FaFilter, a as FaTimes, T as FaWallet, Y as FaSortAmountUp, Z as FaSortAmountDown } from "./icons-vendor-2VDeY8fW.js";
import { L as Link } from "./router-vendor-DrLUSS4j.js";
import { u as useWindowWidth } from "./useWindowWidth-1OHah2CZ.js";
import { g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const formatPrice = /* @__PURE__ */ __name((price) => {
  if (!price || price === "-") return "-";
  const num = parseFloat(String(price).replace(/,/g, ""));
  if (isNaN(num)) return String(price);
  if (num >= 1e3) return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 1) return num.toFixed(4);
  return num.toPrecision(4);
}, "formatPrice");
const parsePnl = /* @__PURE__ */ __name((pnl) => {
  if (!pnl) return 0;
  return parseFloat(String(pnl).replace("%", "").replace("+", "")) || 0;
}, "parsePnl");
const getTabConfig = /* @__PURE__ */ __name((tabKey) => {
  const defaults = {
    icon: "📋",
    label: tabKey.replace(/_/g, " "),
    shortLabel: tabKey.slice(0, 8),
    color: "#5865f2"
  };
  const key = tabKey.toUpperCase();
  if (key.includes("ACIK") || key.includes("POZISYON")) {
    return { icon: "💼", label: tabKey.replace(/_/g, " "), shortLabel: "Açık Poz.", color: "#f0b232" };
  }
  if (key.includes("ZARAR")) {
    return { icon: "🔴", label: tabKey.replace(/_/g, " "), shortLabel: "Zararda", color: "#da373c" };
  }
  if (key.includes("ALIM") || key.includes("FIRSAT")) {
    return { icon: "💰", label: tabKey.replace(/_/g, " "), shortLabel: "Alım Fır.", color: "#23a559" };
  }
  if (key.includes("OLMAYAN") || key.includes("YOK")) {
    return { icon: "🔍", label: tabKey.replace(/_/g, " "), shortLabel: "Poz. Yok", color: "#949ba4" };
  }
  return defaults;
}, "getTabConfig");
const pnlColor = /* @__PURE__ */ __name((val) => {
  const n = parsePnl(val);
  if (n > 0) return "#23a559";
  if (n < 0) return "#da373c";
  return "#949ba4";
}, "pnlColor");
const SignalBadge = /* @__PURE__ */ __name(({ value }) => {
  if (!value || value === "-") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4" }, children: "-" });
  const isLong = String(value).toUpperCase() === "LONG";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "3px 10px",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: "0.82em",
    backgroundColor: isLong ? "rgba(35,165,89,0.12)" : "rgba(218,55,60,0.12)",
    color: isLong ? "#23a559" : "#da373c",
    border: `1px solid ${isLong ? "rgba(35,165,89,0.25)" : "rgba(218,55,60,0.25)"}`
  }, children: [
    isLong ? "▲" : "▼",
    " ",
    value
  ] });
}, "SignalBadge");
const StatusBadge = /* @__PURE__ */ __name(({ status }) => {
  if (!status) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4" }, children: "-" });
  const s = String(status);
  const isProfit = s.includes("KAR") || s.includes("UYUYOR");
  const isLoss = s.includes("ZARAR") || s.includes("TERS");
  const clean = s.replace(/[\u{1F7E2}\u{1F534}\u{2705}\u{26A0}\u{FE0F}]/gu, "").trim();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
    padding: "3px 10px",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: "0.82em",
    backgroundColor: isProfit ? "rgba(35,165,89,0.12)" : isLoss ? "rgba(218,55,60,0.12)" : "rgba(240,178,50,0.12)",
    color: isProfit ? "#57F287" : isLoss ? "#ED4245" : "#f0b232"
  }, children: [
    isProfit ? "✅" : isLoss ? "🔴" : "⚪",
    " ",
    clean
  ] });
}, "StatusBadge");
const S = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#1e1f22",
    color: "#dbdee1",
    padding: "16px",
    boxSizing: "border-box",
    paddingTop: "max(16px, env(safe-area-inset-top))",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  loadingBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: "1px solid #2b2d31",
    flexWrap: "wrap",
    gap: 10
  },
  headerLeft: { display: "flex", flexDirection: "column", gap: 4 },
  headerRight: { display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" },
  backBtn: {
    textDecoration: "none",
    color: "#949ba4",
    fontSize: "0.85em",
    display: "flex",
    alignItems: "center",
    gap: 5
  },
  title: {
    margin: 0,
    fontSize: "1.4em",
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontWeight: 700,
    color: "#fff"
  },
  versionBadge: {
    fontSize: "0.4em",
    color: "#949ba4",
    backgroundColor: "#2b2d31",
    padding: "2px 8px",
    borderRadius: 8
  },
  updateTime: {
    fontSize: "0.8em",
    color: "#949ba4",
    display: "flex",
    alignItems: "center",
    gap: 4
  },
  checkboxLabel: {
    fontSize: "0.8em",
    color: "#b9bbbe",
    display: "flex",
    alignItems: "center",
    gap: 4,
    cursor: "pointer"
  },
  primaryBtn: {
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 600,
    fontSize: "0.85em",
    transition: "background-color 0.2s"
  },
  modeToggle: { display: "flex", gap: 8, marginBottom: 12 },
  fileTabBar: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
    alignItems: "center",
    overflowX: "auto",
    paddingBottom: 8,
    paddingTop: 2,
    borderBottom: "2px solid #2f3136"
  },
  fileTabBtn: {
    backgroundColor: "#2b2d31",
    border: "2px solid #40444b",
    color: "#949ba4",
    padding: "10px 20px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.9em",
    whiteSpace: "nowrap",
    transition: "all 0.2s",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    gap: 6
  },
  fileTabBtnActive: {
    backgroundColor: "#5865f2",
    borderColor: "#5865f2",
    color: "#fff",
    boxShadow: "0 4px 14px rgba(88,101,242,0.35)"
  },
  modeBtn: {
    flex: 1,
    padding: "10px 16px",
    borderRadius: 10,
    border: "2px solid #40444b",
    backgroundColor: "#2b2d31",
    color: "#949ba4",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.9em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    transition: "all 0.2s"
  },
  modeBtnActive: {
    backgroundColor: "#313338",
    color: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
  },
  statsBar: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
    gap: 8,
    marginBottom: 12
  },
  statCard: {
    backgroundColor: "#2b2d31",
    borderRadius: 10,
    padding: "10px 8px",
    textAlign: "center",
    border: "1px solid #2f3136"
  },
  statNum: { display: "block", fontSize: "1.2em", fontWeight: 700, color: "#fff" },
  statLabel: { display: "block", fontSize: "0.72em", color: "#949ba4", marginTop: 2 },
  tabBar: {
    display: "flex",
    gap: 6,
    marginBottom: 12,
    overflowX: "auto",
    paddingBottom: 4
  },
  tabBtn: {
    backgroundColor: "#2b2d31",
    border: "1px solid #40444b",
    color: "#949ba4",
    padding: "8px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.85em",
    display: "flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
    transition: "all 0.2s",
    flexShrink: 0
  },
  filterBar: {
    display: "flex",
    gap: 10,
    marginBottom: 12,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2b2d31",
    borderRadius: 8,
    padding: "7px 12px",
    border: "1px solid #40444b",
    flex: 1,
    maxWidth: 360,
    gap: 8
  },
  searchInput: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: "#dbdee1",
    fontSize: "0.88em",
    flex: 1
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "#949ba4",
    cursor: "pointer",
    padding: "2px 4px",
    fontSize: "0.9em"
  },
  viewToggle: {
    backgroundColor: "#2b2d31",
    border: "1px solid #40444b",
    color: "#dbdee1",
    padding: "6px 10px",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "1em"
  },
  posBanner: {
    padding: "10px 14px",
    backgroundColor: "rgba(240,178,50,0.06)",
    border: "1px solid rgba(240,178,50,0.15)",
    borderRadius: 10,
    marginBottom: 12,
    fontSize: "0.85em",
    color: "#dbdee1",
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap"
  },
  posTag: {
    padding: "3px 10px",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: "0.82em",
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    transition: "all 0.2s"
  },
  tableWrap: {
    overflowX: "auto",
    borderRadius: 12,
    border: "1px solid #2f3136",
    backgroundColor: "#2b2d31"
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.85em" },
  th: {
    padding: "10px 10px",
    textAlign: "center",
    backgroundColor: "#202225",
    color: "#b9bbbe",
    fontWeight: 600,
    fontSize: "0.82em",
    borderBottom: "2px solid #40444b",
    position: "sticky",
    top: 0,
    zIndex: 1
  },
  td: {
    padding: "8px 8px",
    textAlign: "center",
    borderBottom: "1px solid rgba(47,49,54,0.6)"
  },
  tfBadge: {
    backgroundColor: "#40444b",
    color: "#dbdee1",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: "0.82em",
    fontWeight: 600
  },
  linkBtn: {
    color: "#5865f2",
    fontSize: "0.85em",
    padding: "4px 8px",
    borderRadius: 4,
    display: "inline-flex"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
    paddingBottom: 24
  },
  pageBtn: {
    backgroundColor: "#2b2d31",
    border: "1px solid #40444b",
    color: "#dbdee1",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600
  },
  pageNumBtn: {
    backgroundColor: "#2b2d31",
    border: "1px solid #40444b",
    color: "#949ba4",
    padding: "6px 10px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: "0.85em",
    minWidth: 32,
    textAlign: "center"
  },
  pageNumActive: {
    backgroundColor: "#5865f2",
    borderColor: "#5865f2",
    color: "#fff",
    fontWeight: 700
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: 12
  },
  coinCard: {
    backgroundColor: "#2b2d31",
    borderRadius: 12,
    padding: 14,
    border: "1px solid #2f3136",
    cursor: "pointer",
    transition: "all 0.2s ease"
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottom: "1px solid #40444b"
  },
  cardCoinName: { color: "#f0b232", fontWeight: 700, fontSize: "1.1em" },
  cardBody: { display: "flex", flexDirection: "column", gap: 6 },
  cardRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 0"
  },
  cardRowLabel: { color: "#949ba4", fontSize: "0.82em" },
  cardRowValue: { color: "#dbdee1", fontSize: "0.9em", fontWeight: 600 },
  cardFooter: { marginTop: 10, paddingTop: 8, borderTop: "1px solid #40444b" },
  miniBarBg: {
    width: "100%",
    height: 4,
    backgroundColor: "#da373c",
    borderRadius: 4,
    overflow: "hidden"
  },
  miniBar: { height: "100%", borderRadius: 4, backgroundColor: "#23a559", transition: "width 0.3s ease" },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "#949ba4"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.85)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2e3,
    padding: 16,
    backdropFilter: "blur(6px)"
  },
  modal: {
    backgroundColor: "#1e1f22",
    borderRadius: 16,
    width: "100%",
    maxWidth: 700,
    maxHeight: "88vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    border: "1px solid #f0b232",
    boxShadow: "0 20px 60px rgba(240,178,50,0.2)"
  },
  modalHeader: {
    padding: "16px 20px",
    borderBottom: "1px solid #2f3136",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(135deg, #2b2d31 0%, #1e1f22 100%)"
  },
  modalBadge: {
    padding: "4px 10px",
    backgroundColor: "#5865f2",
    borderRadius: 16,
    fontSize: "0.72em",
    fontWeight: 600,
    color: "#fff"
  },
  modalCloseBtn: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    fontSize: 22,
    cursor: "pointer",
    padding: 8,
    borderRadius: 8,
    lineHeight: 1,
    transition: "color 0.2s"
  },
  modalStats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: 10,
    padding: "16px 20px",
    borderBottom: "1px solid #2f3136",
    background: "linear-gradient(180deg, rgba(240,178,50,0.04) 0%, transparent 100%)"
  },
  mStatCard: {
    textAlign: "center",
    padding: "10px 6px",
    backgroundColor: "#2b2d31",
    borderRadius: 10,
    border: "1px solid #40444b"
  },
  mStatLabel: { display: "block", fontSize: "0.7em", color: "#949ba4", marginTop: 2, textTransform: "uppercase" },
  modalBody: { flex: 1, overflow: "auto", padding: "16px 20px" },
  strategyList: { display: "flex", flexDirection: "column", gap: 10 },
  strategyCard: {
    backgroundColor: "#2b2d31",
    borderRadius: 10,
    padding: 14,
    border: "1px solid #40444b",
    animation: "cryptoSlideIn 0.35s ease forwards",
    opacity: 0,
    transform: "translateX(15px)"
  },
  strategyGrid: {
    display: "grid",
    gridTemplateColumns: window.innerWidth < 640 ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
    gap: 8
  },
  stratItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 10px",
    backgroundColor: "#202225",
    borderRadius: 6,
    fontSize: "0.85em"
  },
  stratItemLabel: { color: "#949ba4", fontSize: "0.85em" },
  stratItemVal: { color: "#dbdee1", fontWeight: 600 }
};
if (typeof document !== "undefined" && !document.getElementById("crypto-signals-v4-styles")) {
  const sheet = document.createElement("style");
  sheet.id = "crypto-signals-v4-styles";
  sheet.textContent = `
        @keyframes cryptoSlideIn {
            from { opacity: 0; transform: translateX(15px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes cryptoSpin {
            100% { transform: rotate(360deg); }
        }
        .crypto-spin { animation: cryptoSpin 1s linear infinite; display: inline-block; }
    `;
  document.head.appendChild(sheet);
}
const API_BASE = getApiBase();
const SIGNALS_URL = `${API_BASE}/api/crypto/signals/`;
const SIGNALS_LIST_URL = `${API_BASE}/api/crypto/signals/list/`;
const useCryptoSignals = /* @__PURE__ */ __name(() => {
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [lastUpdate, setLastUpdate] = reactExports.useState(null);
  const [availableFiles, setAvailableFiles] = reactExports.useState([]);
  const [activeFileKey, setActiveFileKey] = reactExports.useState("");
  const [activeMode, setActiveMode] = reactExports.useState("balance_mode");
  const [activeTab, setActiveTab] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sortBy, setSortBy] = reactExports.useState("rank");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [viewMode, setViewMode] = reactExports.useState("table");
  const [page, setPage] = reactExports.useState(1);
  const [autoRefresh, setAutoRefresh] = reactExports.useState(true);
  const [selectedCoin, setSelectedCoin] = reactExports.useState(null);
  const ITEMS_PER_PAGE = 50;
  const tableRef = reactExports.useRef(null);
  const scrollRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    setPage(1);
  }, [activeTab, activeMode, searchQuery, activeFileKey]);
  reactExports.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(SIGNALS_LIST_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const files = json.files || [];
        setAvailableFiles(files);
        if (files.length > 0) setActiveFileKey(files[0].key);
      } catch (err) {
        console.error("Signal list fetch error:", err);
        setError("Sinyal dosyaları yüklenemedi");
      }
    })();
  }, []);
  const fetchData = reactExports.useCallback(async (fileKey) => {
    const key = fileKey || activeFileKey;
    if (!key) return;
    try {
      if (tableRef.current) scrollRef.current = tableRef.current.scrollTop;
      const res = await fetch(`${SIGNALS_URL}?t=${Date.now()}&file=${key}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) {
        setError(json.error);
        setLoading(false);
        return;
      }
      setData(json);
      setLastUpdate(new Date(json.meta?.export_time || Date.now()));
      setError(null);
      setTimeout(() => {
        if (tableRef.current && scrollRef.current > 0) tableRef.current.scrollTop = scrollRef.current;
      }, 50);
    } catch (err) {
      console.error("Signal fetch error:", err);
      if (!data) setError("Sunucuya bağlanılamadı: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [activeFileKey]);
  reactExports.useEffect(() => {
    if (activeFileKey) {
      setLoading(true);
      setActiveTab(null);
      fetchData(activeFileKey);
    }
  }, [activeFileKey]);
  reactExports.useEffect(() => {
    if (!autoRefresh || !activeFileKey) return;
    const iv = setInterval(() => fetchData(activeFileKey), 3e4);
    return () => clearInterval(iv);
  }, [autoRefresh, fetchData, activeFileKey]);
  const meta = data?.meta || {};
  const positionCoins = meta.position_coins || [];
  const modeData = reactExports.useMemo(() => data?.[activeMode] || null, [data, activeMode]);
  const allTabs = reactExports.useMemo(() => modeData?.tabs || {}, [modeData]);
  const currentTab = reactExports.useMemo(() => allTabs[activeTab] || null, [allTabs, activeTab]);
  const tabData = reactExports.useMemo(() => currentTab?.data || [], [currentTab]);
  reactExports.useEffect(() => {
    const tabKeys = Object.keys(allTabs);
    if (tabKeys.length > 0 && (!activeTab || !allTabs[activeTab])) setActiveTab(tabKeys[0]);
  }, [allTabs, activeTab]);
  const processedData = reactExports.useMemo(() => {
    let items = [...tabData];
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toUpperCase();
      items = items.filter(
        (item) => item.coin?.toUpperCase().includes(q) || item.timeframe?.toUpperCase().includes(q) || item.signal?.toUpperCase().includes(q)
      );
    }
    items.sort((a, b) => {
      let valA, valB;
      switch (sortBy) {
        case "coin":
          valA = a.coin || "";
          valB = b.coin || "";
          return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        case "pnl":
          valA = parsePnl(a.pnl_percent);
          valB = parsePnl(b.pnl_percent);
          break;
        case "win_rate":
          valA = parseFloat(String(a.win_rate || "0").replace("%", ""));
          valB = parseFloat(String(b.win_rate || "0").replace("%", ""));
          break;
        case "x_kat":
          valA = parseFloat(String(a.x_kat || "0").replace("x", ""));
          valB = parseFloat(String(b.x_kat || "0").replace("x", ""));
          break;
        case "trades":
          valA = parseInt(a.trades || 0);
          valB = parseInt(b.trades || 0);
          break;
        default:
          valA = a.rank || 9999;
          valB = b.rank || 9999;
          break;
      }
      if (typeof valA === "string") return 0;
      return sortDir === "asc" ? valA - valB : valB - valA;
    });
    return items;
  }, [tabData, searchQuery, sortBy, sortDir]);
  const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
  const pagedData = processedData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const isPositionsTab = activeTab === "ACIK_POZISYONLAR";
  const handleSort = /* @__PURE__ */ __name((field) => {
    if (sortBy === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortBy(field);
      setSortDir(field === "rank" ? "asc" : "desc");
    }
  }, "handleSort");
  const stats = reactExports.useMemo(() => {
    if (!tabData.length) return null;
    const profits = tabData.filter((i) => parsePnl(i.pnl_percent) > 0);
    const losses = tabData.filter((i) => parsePnl(i.pnl_percent) < 0);
    const avgPnl = tabData.reduce((s, i) => s + parsePnl(i.pnl_percent), 0) / tabData.length;
    const avgWr = tabData.reduce((s, i) => s + parseFloat(String(i.win_rate || "0").replace("%", "")), 0) / tabData.length;
    const uniqueCoins = [...new Set(tabData.map((i) => i.coin))];
    const tersSinyal = tabData.filter((i) => i.ters_sinyal === true).length;
    const uyumluSinyal = tabData.filter((i) => i.ters_sinyal !== true).length;
    return { profits: profits.length, losses: losses.length, avgPnl, avgWr, uniqueCoins: uniqueCoins.length, total: tabData.length, tersSinyal, uyumluSinyal };
  }, [tabData]);
  const positionCoinStatus = reactExports.useMemo(() => {
    const statusMap = {};
    if (positionCoins.length > 0 && tabData.length > 0) {
      positionCoins.forEach((coin) => {
        const rows = tabData.filter((r) => r.coin === coin);
        statusMap[coin] = { hasTersSinyal: rows.some((r) => r.ters_sinyal === true), rows };
      });
    }
    return statusMap;
  }, [positionCoins, tabData]);
  const coinGroups = reactExports.useMemo(() => {
    const groups = {};
    processedData.forEach((row) => {
      const coin = row.coin || "UNKNOWN";
      if (!groups[coin]) groups[coin] = [];
      groups[coin].push(row);
    });
    return groups;
  }, [processedData]);
  return {
    data,
    loading,
    error,
    lastUpdate,
    availableFiles,
    activeFileKey,
    setActiveFileKey,
    activeMode,
    setActiveMode,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortDir,
    viewMode,
    setViewMode,
    page,
    setPage,
    autoRefresh,
    setAutoRefresh,
    selectedCoin,
    setSelectedCoin,
    tableRef,
    meta,
    positionCoins,
    allTabs,
    currentTab,
    tabData,
    processedData,
    pagedData,
    totalPages,
    isPositionsTab,
    handleSort,
    stats,
    positionCoinStatus,
    coinGroups,
    fetchData,
    ITEMS_PER_PAGE
  };
}, "useCryptoSignals");
const CoinDetailModal = /* @__PURE__ */ __name(({ selectedCoin, isPositionsTab, onClose }) => {
  if (!selectedCoin) return null;
  const rows = selectedCoin.data;
  const coinStats = reactExports.useMemo(() => {
    const profits = rows.filter((r) => parsePnl(r.pnl_percent) > 0).length;
    const losses = rows.filter((r) => parsePnl(r.pnl_percent) < 0).length;
    const tersCount = rows.filter((r) => r.ters_sinyal === true).length;
    const uyumluCount = rows.filter((r) => r.ters_sinyal !== true).length;
    const avgPnl = rows.reduce((s, r) => s + parsePnl(r.pnl_percent), 0) / rows.length;
    const avgWr = rows.reduce((s, r) => s + parseFloat(String(r.win_rate || "0").replace("%", "")), 0) / rows.length;
    const price = rows[0]?.current_price;
    return { profits, losses, tersCount, uyumluCount, avgPnl, avgWr, price };
  }, [rows]);
  const binanceUrl = `https://www.binance.com/en/futures/${selectedCoin.name.endsWith("USDT") ? selectedCoin.name : selectedCoin.name + "USDT"}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.modalHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBitcoin, { style: { fontSize: 28, color: "#f0b232" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, color: "#f0b232", fontWeight: 700 }, children: selectedCoin.name.replace("USDT", "") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.modalBadge, children: [
          rows.length,
          " Strateji"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: S.modalCloseBtn, children: "✕" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.modalStats, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.mStatCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.3em", fontWeight: 700, color: "#23a559" }, children: isPositionsTab ? coinStats.uyumluCount : coinStats.profits }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.mStatLabel, children: isPositionsTab ? "✅ Uyumlu" : "Kârda" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.mStatCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "1.3em", fontWeight: 700, color: "#da373c" }, children: isPositionsTab ? coinStats.tersCount : coinStats.losses }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.mStatLabel, children: isPositionsTab ? "⚠️ Ters Sinyal" : "Zararda" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.mStatCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "1.3em", fontWeight: 700, color: coinStats.avgPnl >= 0 ? "#23a559" : "#da373c" }, children: [
          coinStats.avgPnl >= 0 ? "+" : "",
          coinStats.avgPnl.toFixed(2),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.mStatLabel, children: "Ort. PNL" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.mStatCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "1.3em", fontWeight: 700, color: "#f0b232" }, children: [
          coinStats.avgWr.toFixed(1),
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.mStatLabel, children: "Ort. WR" })
      ] }),
      coinStats.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.mStatCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "1.3em", fontWeight: 700, color: "#fff" }, children: [
          "$",
          formatPrice(coinStats.price)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.mStatLabel, children: "Fiyat" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.modalBody, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: "0 0 12px", color: "#fff", fontSize: "1em" }, children: [
        "📊",
        " Strateji Detaylar",
        "ı"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.strategyList, children: rows.map((row, idx) => {
        const pnl = parsePnl(row.pnl_percent);
        const isProfit = pnl > 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...S.strategyCard, borderLeft: `4px solid ${isProfit ? "#23a559" : "#da373c"}`, animationDelay: `${idx * 0.04}s` }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#5865f2", fontWeight: 700, fontSize: "1.05em" }, children: row.timeframe }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBadge, { value: row.signal || row.sinyal_yonu || row.pozisyon_yonu || "-" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.strategyGrid, children: [
            { label: "Giriş", val: `$${formatPrice(row.entry_price)}` },
            { label: "Güncel", val: `$${formatPrice(row.current_price)}` },
            { label: "PNL", val: row.pnl_percent || "-", color: isProfit ? "#23a559" : "#da373c", bold: true },
            { label: "WR", val: row.win_rate || "-" },
            { label: "X Kat", val: row.x_kat || "-", color: "#f0b232" },
            { label: "Hedef", val: row.hedef_roe || "-", color: "#5865f2" }
          ].map(({ label, val, color, bold }, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.stratItem, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.stratItemLabel, children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...S.stratItemVal, ...color ? { color } : {}, ...bold ? { fontWeight: 700 } : {} }, children: val })
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 8, borderTop: "1px solid #40444b" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: row.status }),
            row.days_ago !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#949ba4", fontSize: "0.78em" }, children: [
              row.days_ago,
              " g",
              "ü",
              "n ",
              "·",
              " ",
              row.bars_ago,
              " bar"
            ] })
          ] })
        ] }, idx);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "12px 20px", borderTop: "1px solid #2f3136", textAlign: "center" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: binanceUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: { color: "#f0b232", textDecoration: "none", fontWeight: 600, fontSize: "0.9em" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaExternalLinkAlt, {}),
          " Binance Futures'da A",
          "ç"
        ]
      }
    ) })
  ] }) });
}, "CoinDetailModal");
const CoinDetailModal$1 = React.memo(CoinDetailModal);
const CryptoSignals = /* @__PURE__ */ __name(() => {
  const { isMobile } = useWindowWidth();
  const {
    data,
    loading,
    error,
    lastUpdate,
    availableFiles,
    activeFileKey,
    setActiveFileKey,
    activeMode,
    setActiveMode,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortDir,
    viewMode,
    setViewMode,
    page,
    setPage,
    autoRefresh,
    setAutoRefresh,
    selectedCoin,
    setSelectedCoin,
    tableRef,
    meta,
    positionCoins,
    allTabs,
    currentTab,
    tabData,
    processedData,
    pagedData,
    totalPages,
    isPositionsTab,
    handleSort,
    stats,
    positionCoinStatus,
    coinGroups,
    fetchData
  } = useCryptoSignals();
  const SortHeader = /* @__PURE__ */ __name(({ field, children, style: extra }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { onClick: /* @__PURE__ */ __name(() => handleSort(field), "onClick"), style: {
    ...S.th,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    color: sortBy === field ? "#f0b232" : "#b9bbbe",
    ...extra
  }, children: [
    children,
    " ",
    sortBy === field && (sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaSortAmountUp, { style: { fontSize: "0.7em" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaSortAmountDown, { style: { fontSize: "0.7em" } }))
  ] }), "SortHeader");
  if (loading && !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.page, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.loadingBox, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "crypto-spin", style: { fontSize: 48 }, children: "₿" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#f0b232", fontSize: "1.1em", marginTop: 16 }, children: "Kripto Verileri Yükleniyor..." })
    ] }) });
  }
  if (error && !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.page, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginTop: 80 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 60, marginBottom: 16 }, children: "⚠️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { color: "#da373c", marginBottom: 8 }, children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => fetchData(activeFileKey), "onClick"), style: S.primaryBtn, children: "Tekrar Dene" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.page, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { style: S.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", style: S.backBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowLeft, {}),
          " Geri"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: S.title, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBitcoin, { style: { color: "#f0b232" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kripto Sinyaller" }),
          meta.version && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.versionBadge, children: [
            "v",
            meta.version
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.headerRight, children: [
        lastUpdate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.updateTime, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
          " ",
          lastUpdate.toLocaleTimeString("tr-TR")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: S.checkboxLabel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: autoRefresh, onChange: /* @__PURE__ */ __name((e) => setAutoRefresh(e.target.checked), "onChange") }),
          " Oto"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => fetchData(activeFileKey), "onClick"), style: S.primaryBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: loading ? "crypto-spin" : "" }),
          " Yenile"
        ] })
      ] })
    ] }),
    availableFiles.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.fileTabBar, children: availableFiles.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => {
          if (activeFileKey !== f.key) setActiveFileKey(f.key);
        }, "onClick"),
        style: { ...S.fileTabBtn, ...activeFileKey === f.key ? S.fileTabBtnActive : {} },
        children: [
          "📊",
          " ",
          f.label,
          activeFileKey === f.key && loading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "crypto-spin", style: { marginLeft: 6, fontSize: "0.85em" }, children: "⏳" })
        ]
      },
      f.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.modeToggle, children: [
      { key: "balance_mode", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, {}), label: isMobile ? "Balance" : "💰 Balance Sıralama", color: "#f0b232" },
      { key: "winrate_mode", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, {}), label: isMobile ? "Winrate" : "🏆 Winrate Sıralama", color: "#23a559" }
    ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setActiveMode(m.key), "onClick"),
        style: { ...S.modeBtn, ...activeMode === m.key ? S.modeBtnActive : {}, borderColor: activeMode === m.key ? m.color : "#40444b" },
        children: [
          m.icon,
          " ",
          m.label
        ]
      },
      m.key
    )) }),
    stats && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.statsBar, children: [
      { num: stats.total, label: "Strateji" },
      { num: stats.uniqueCoins, label: "Coin" },
      { num: isPositionsTab ? stats.uyumluSinyal : stats.profits, label: isPositionsTab ? "✅ Uyumlu" : "Kârda", color: "#23a559" },
      { num: isPositionsTab ? stats.tersSinyal : stats.losses, label: isPositionsTab ? "⚠️ Ters Sinyal" : "Zararda", color: "#da373c" },
      { num: `${stats.avgPnl >= 0 ? "+" : ""}${stats.avgPnl.toFixed(2)}%`, label: "Ort. PNL", color: stats.avgPnl >= 0 ? "#23a559" : "#da373c" },
      { num: `${stats.avgWr.toFixed(1)}%`, label: "Ort. WR", color: stats.avgWr >= 50 ? "#23a559" : "#f0b232" }
    ].map(({ num, label, color }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.statCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...S.statNum, ...color ? { color } : {} }, children: num }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.statLabel, children: label })
    ] }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.tabBar, children: Object.keys(allTabs).map((tabKey) => {
      const cfg = getTabConfig(tabKey);
      const tab = allTabs[tabKey];
      const isActive = activeTab === tabKey;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setActiveTab(tabKey), "onClick"),
          style: { ...S.tabBtn, ...isActive ? { backgroundColor: cfg.color, borderColor: cfg.color, color: "#fff", boxShadow: `0 4px 14px ${cfg.color}44` } : {} },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cfg.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isMobile ? cfg.shortLabel : cfg.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { backgroundColor: isActive ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.08)", padding: "2px 8px", borderRadius: 12, fontSize: "0.75em", fontWeight: 700 }, children: tab?.count || 0 })
          ]
        },
        tabKey
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.filterBar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.searchBox, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, { style: { color: "#949ba4", flexShrink: 0 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: searchQuery,
            onChange: /* @__PURE__ */ __name((e) => setSearchQuery(e.target.value), "onChange"),
            placeholder: "Coin ara... (BTC, ETH, SOL)",
            style: S.searchInput
          }
        ),
        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setSearchQuery(""), "onClick"), style: S.clearBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#949ba4", fontSize: "0.85em" }, children: [
          processedData.length,
          " sonuç"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setViewMode((v) => v === "table" ? "cards" : "table"), "onClick"),
            style: S.viewToggle,
            title: viewMode === "table" ? "Kart görünümü" : "Tablo görünümü",
            children: viewMode === "table" ? "🃏 " : "📋 "
          }
        )
      ] })
    ] }),
    isPositionsTab && positionCoins.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.posBanner, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaWallet, { style: { marginRight: 6 } }),
        "Açık Pozisyon (",
        positionCoins.length,
        "):"
      ] }),
      positionCoins.map((c, i) => {
        const isTers = positionCoinStatus[c]?.hasTersSinyal;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
          ...S.posTag,
          backgroundColor: isTers ? "rgba(218,55,60,0.15)" : "rgba(35,165,89,0.15)",
          color: isTers ? "#da373c" : "#23a559",
          border: `1px solid ${isTers ? "rgba(218,55,60,0.4)" : "rgba(35,165,89,0.4)"}`
        }, children: [
          i + 1,
          ". ",
          isTers ? "⚠️ " : "✅ ",
          " ",
          c.replace("USDT", "")
        ] }, c);
      })
    ] }),
    !currentTab ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.emptyState, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: 48, marginBottom: 12 }, children: "📭" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bu modda veri bulunamadı" })
    ] }) : viewMode === "cards" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.cardGrid, children: Object.entries(coinGroups).map(([coin, rows]) => {
      const goodRows = isPositionsTab ? rows.filter((r) => r.ters_sinyal !== true) : rows.filter((r) => parsePnl(r.pnl_percent) > 0);
      const badRows = isPositionsTab ? rows.filter((r) => r.ters_sinyal === true) : rows.filter((r) => parsePnl(r.pnl_percent) < 0);
      const avgPnl = rows.reduce((s, r) => s + parsePnl(r.pnl_percent), 0) / rows.length;
      const bestWr = Math.max(...rows.map((r) => parseFloat(String(r.win_rate || "0").replace("%", ""))));
      const firstRow = rows[0] || {};
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: S.coinCard,
          onClick: /* @__PURE__ */ __name(() => setSelectedCoin({ name: coin, data: rows }), "onClick"),
          onMouseEnter: /* @__PURE__ */ __name((e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.borderColor = "#f0b232";
          }, "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name((e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#2f3136";
          }, "onMouseLeave"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.cardHeader, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.cardCoinName, children: coin.replace("USDT", "") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBadge, { value: firstRow.signal || firstRow.sinyal_yonu || "-" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#949ba4", fontSize: "0.78em" }, children: [
                rows.length,
                " str."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.cardBody, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.cardRow, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.cardRowLabel, children: "Fiyat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.cardRowValue, children: [
                  "$",
                  formatPrice(firstRow.current_price)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.cardRow, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.cardRowLabel, children: "Ort. PNL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { ...S.cardRowValue, color: pnlColor(avgPnl.toString()), fontWeight: 700 }, children: [
                  avgPnl >= 0 ? "+" : "",
                  avgPnl.toFixed(2),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.cardRow, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.cardRowLabel, children: "En İyi WR" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { ...S.cardRowValue, color: bestWr >= 50 ? "#23a559" : "#da373c" }, children: [
                  bestWr.toFixed(1),
                  "%"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.cardFooter, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.miniBarBg, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...S.miniBar, width: `${goodRows.length / Math.max(rows.length, 1) * 100}%` } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.75em", marginTop: 4 }, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#23a559" }, children: [
                  isPositionsTab ? "✅ " : "✓ ",
                  " ",
                  goodRows.length
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#da373c" }, children: [
                  isPositionsTab ? "⚠️ " : "✗ ",
                  " ",
                  badRows.length
                ] })
              ] })
            ] })
          ]
        },
        coin
      );
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: tableRef, style: S.tableWrap, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: S.table, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "rank", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "coin", children: "Coin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "TF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "Sinyal" }),
          isPositionsTab && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "Poz.Yönü" }),
          isPositionsTab && /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "Uyum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "Giriş" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "Güncel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "pnl", children: "PNL%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "win_rate", children: "WR%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "trades", children: "İşlem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "x_kat", children: "X Kat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "Hedef ROE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "Durum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: S.th, children: "Link" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: pagedData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: isPositionsTab ? 15 : 13, style: { textAlign: "center", padding: 40, color: "#949ba4" }, children: searchQuery ? `"${searchQuery}" için sonuç bulunamadı` : "Bu sekmede veri yok" }) }) : pagedData.map((item, idx) => {
          const coinShort = (item.coin || "").replace("USDT", "");
          const binanceSymbol = item.coin?.endsWith("USDT") ? item.coin : `${item.coin}USDT`;
          const rowBg = idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              style: { backgroundColor: rowBg, transition: "background-color 0.15s" },
              onMouseEnter: /* @__PURE__ */ __name((e) => e.currentTarget.style.backgroundColor = "rgba(88,101,242,0.06)", "onMouseEnter"),
              onMouseLeave: /* @__PURE__ */ __name((e) => e.currentTarget.style.backgroundColor = rowBg, "onMouseLeave"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4", fontWeight: 600 }, children: item.rank }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    style: { color: "#f0b232", fontWeight: 700, cursor: "pointer" },
                    onClick: /* @__PURE__ */ __name(() => setSelectedCoin({ name: item.coin, data: tabData.filter((r) => r.coin === item.coin) }), "onClick"),
                    children: coinShort
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.tfBadge, children: item.timeframe }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBadge, { value: item.signal || item.sinyal_yonu || "-" }) }),
                isPositionsTab && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBadge, { value: item.pozisyon_yonu || "-" }) }),
                isPositionsTab && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "0.8em", fontWeight: 600, color: item.ters_sinyal ? "#da373c" : "#23a559" }, children: item.ters_sinyal ? "⚠️ Ters" : "✅ Uyumlu" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { ...S.td, color: "#b9bbbe", fontSize: "0.85em" }, children: [
                  "$",
                  formatPrice(item.entry_price)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { ...S.td, color: "#dbdee1", fontSize: "0.85em" }, children: [
                  "$",
                  formatPrice(item.current_price)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { ...S.td, color: pnlColor(item.pnl_percent), fontWeight: 700 }, children: item.pnl_percent || "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { ...S.td, fontWeight: 600, color: parseFloat(String(item.win_rate || "0").replace("%", "")) >= 50 ? "#23a559" : "#da373c" }, children: item.win_rate || "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: item.trades || "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { ...S.td, color: "#f0b232", fontWeight: 700 }, children: item.x_kat || "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { ...S.td, color: "#5865f2", fontWeight: 600 }, children: item.hedef_roe || "-" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: item.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: S.td, children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://www.binance.com/en/futures/${binanceSymbol}`, target: "_blank", rel: "noopener noreferrer", style: S.linkBtn, title: `${coinShort} Binance Futures`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExternalLinkAlt, {}) }) })
              ]
            },
            `${item.rank}-${item.coin}-${item.timeframe}-${idx}`
          );
        }) })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.pagination, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setPage((p) => Math.max(1, p - 1)), "onClick"), disabled: page === 1, style: { ...S.pageBtn, opacity: page === 1 ? 0.4 : 1 }, children: "◄" }),
        Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
          let num;
          if (totalPages <= 7) num = i + 1;
          else if (page <= 4) num = i + 1;
          else if (page >= totalPages - 3) num = totalPages - 6 + i;
          else num = page - 3 + i;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setPage(num), "onClick"), style: { ...S.pageNumBtn, ...page === num ? S.pageNumActive : {} }, children: num }, num);
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setPage((p) => Math.min(totalPages, p + 1)), "onClick"), disabled: page === totalPages, style: { ...S.pageBtn, opacity: page === totalPages ? 0.4 : 1 }, children: "►" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CoinDetailModal$1, { selectedCoin, isPositionsTab, onClose: /* @__PURE__ */ __name(() => setSelectedCoin(null), "onClose") })
  ] });
}, "CryptoSignals");
export {
  CryptoSignals as default
};

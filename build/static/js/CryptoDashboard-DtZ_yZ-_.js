var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { L as Link } from "./router-vendor-DrLUSS4j.js";
import { a as FaTimes, A as FaArrowLeft, J as FaBitcoin, T as FaWallet, c as FaSync, U as FaBug, O as FaChartLine, P as FaTrophy, V as FaFilter, W as FaExchangeAlt } from "./icons-vendor-2VDeY8fW.js";
import { a as useAuth, g as getApiBase, b as getMediaBase, t as toast } from "./index-DGqPEDt8.js";
import { u as useWindowWidth } from "./useWindowWidth-1OHah2CZ.js";
import "./media-vendor-BRMiuG2Y.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const API_BASE = getApiBase();
const MEDIA_BASE = getMediaBase();
const SIGNALS_URL = `${API_BASE}/api/crypto/signals/`;
const useCryptoData = /* @__PURE__ */ __name(() => {
  const [data, setData] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const [debugInfo, setDebugInfo] = reactExports.useState("");
  const [activeMode, setActiveMode] = reactExports.useState("balance_mode");
  const [activeTab, setActiveTab] = reactExports.useState("TUM_STRATEJILER");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sortBy, setSortBy] = reactExports.useState("rank");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [page, setPage] = reactExports.useState(1);
  const ITEMS_PER_PAGE = 50;
  const [showPortfolio, setShowPortfolio] = reactExports.useState(false);
  const [tradeData, setTradeData] = reactExports.useState(null);
  const [portfolio, setPortfolio] = reactExports.useState(null);
  const [prices, setPrices] = reactExports.useState({});
  const dataRef = reactExports.useRef(data);
  const { token } = useAuth();
  const { isMobile } = useWindowWidth();
  reactExports.useEffect(() => {
    dataRef.current = data;
  }, [data]);
  reactExports.useEffect(() => {
    setPage(1);
  }, [activeTab, activeMode, searchQuery]);
  const fetchData = reactExports.useCallback(async () => {
    if (!dataRef.current) setLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch(SIGNALS_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      if (result.error) {
        setErrorMsg(result.error);
        setLoading(false);
        return;
      }
      setData(result);
    } catch (error) {
      console.error("Fetch Hatası:", error);
      if (!dataRef.current) setErrorMsg("Sunucuya bağlanılamadı: " + error.message);
    } finally {
      setLoading(false);
    }
  }, []);
  const fetchPortfolio = reactExports.useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/portfolio/my/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) setPortfolio(await res.json());
    } catch (e) {
      console.debug("[CryptoDashboard] Portfolio fetch skipped:", e.message);
    }
  }, [token]);
  const fetchPricesFromLocal = reactExports.useCallback(async () => {
    try {
      const url = `${MEDIA_BASE}/crypto_prices.json?t=${Date.now()}`;
      const res = await fetch(url);
      if (res.ok) setPrices(await res.json());
    } catch (e) {
      console.error("Fiyat Okuma Hatası:", e);
    }
  }, []);
  reactExports.useEffect(() => {
    fetchData();
    fetchPortfolio();
    fetchPricesFromLocal();
    const priceInterval = setInterval(fetchPricesFromLocal, 1500);
    const dataInterval = setInterval(fetchData, 1e4);
    return () => {
      clearInterval(priceInterval);
      clearInterval(dataInterval);
    };
  }, [token, fetchData, fetchPortfolio, fetchPricesFromLocal]);
  const extractCoinSymbol = /* @__PURE__ */ __name((rawName) => {
    if (!rawName) return null;
    const upper = rawName.toUpperCase();
    const match = upper.match(/([A-Z0-9]+USDT)/);
    return match ? match[0] : upper.replace(/[^A-Z0-9]/g, "");
  }, "extractCoinSymbol");
  const getLivePrice = /* @__PURE__ */ __name((coin) => {
    const symbol = extractCoinSymbol(coin);
    if (symbol && prices[symbol]) return prices[symbol];
    const short = symbol?.replace("USDT", "");
    if (short && prices[short]) return prices[short];
    return null;
  }, "getLivePrice");
  const handleTrade = /* @__PURE__ */ __name(async (action, symbol, amount, price) => {
    if (!token) return toast.error("❌ Giriş yapmalısınız!");
    let finalSymbol = symbol.toUpperCase();
    if (!finalSymbol.endsWith("USDT")) finalSymbol += "USDT";
    try {
      const res = await fetch(`${API_BASE}/portfolio/trade/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ symbol: finalSymbol, action, amount, price })
      });
      const resData = await res.json();
      if (res.ok) {
        toast.success("✅ İşlem Başarılı!");
        setPortfolio(resData);
        setTradeData(null);
      } else {
        toast.error(`❌ Hata: ${resData.error}`);
      }
    } catch (e) {
      toast.error("❌ Sunucu hatası.");
    }
  }, "handleTrade");
  const modeData = reactExports.useMemo(() => {
    if (!data || !data[activeMode]) return null;
    return data[activeMode];
  }, [data, activeMode]);
  const tabData = reactExports.useMemo(() => {
    if (!modeData || !modeData.tabs || !modeData.tabs[activeTab]) return [];
    return modeData.tabs[activeTab].data || [];
  }, [modeData, activeTab]);
  const tabInfo = reactExports.useMemo(() => {
    if (!modeData || !modeData.tabs || !modeData.tabs[activeTab]) return null;
    return modeData.tabs[activeTab];
  }, [modeData, activeTab]);
  const processedData = reactExports.useMemo(() => {
    let items = [...tabData];
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toUpperCase();
      items = items.filter(
        (item) => item.coin && item.coin.toUpperCase().includes(q) || item.timeframe && item.timeframe.toUpperCase().includes(q) || item.signal && item.signal.toUpperCase().includes(q)
      );
    }
    items.sort((a, b) => {
      let valA, valB;
      switch (sortBy) {
        case "rank":
          valA = a.rank || 9999;
          valB = b.rank || 9999;
          break;
        case "coin":
          valA = a.coin || "";
          valB = b.coin || "";
          return sortDir === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        case "pnl":
          valA = parseFloat(String(a.pnl_percent || "0").replace("%", "").replace("+", ""));
          valB = parseFloat(String(b.pnl_percent || "0").replace("%", "").replace("+", ""));
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
      }
      return sortDir === "asc" ? valA - valB : valB - valA;
    });
    return items;
  }, [tabData, searchQuery, sortBy, sortDir]);
  const totalPages = Math.max(1, Math.ceil(processedData.length / ITEMS_PER_PAGE));
  const pagedData = processedData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const isPositionsTab = activeTab === "ACIK_POZISYONLAR";
  const meta = data?.meta || {};
  const positionCoins = meta.position_coins || [];
  const positionCoinStatus = reactExports.useMemo(() => {
    const statusMap = {};
    if (positionCoins.length > 0 && processedData.length > 0) {
      positionCoins.forEach((coin) => {
        const rows = processedData.filter((r) => r.coin === coin);
        const hasTersSinyal = rows.some((r) => r.ters_sinyal === true);
        statusMap[coin] = { hasTersSinyal, rows };
      });
    }
    return statusMap;
  }, [positionCoins, processedData]);
  const handleSort = /* @__PURE__ */ __name((field) => {
    if (sortBy === field) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else {
      setSortBy(field);
      setSortDir(field === "rank" ? "asc" : "desc");
    }
  }, "handleSort");
  return {
    data,
    loading,
    errorMsg,
    debugInfo,
    activeMode,
    setActiveMode,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    sortBy,
    sortDir,
    handleSort,
    page,
    setPage,
    showPortfolio,
    setShowPortfolio,
    tradeData,
    setTradeData,
    portfolio,
    prices,
    fetchData,
    handleTrade,
    modeData,
    tabInfo,
    processedData,
    pagedData,
    totalPages,
    isPositionsTab,
    meta,
    positionCoins,
    positionCoinStatus,
    extractCoinSymbol,
    getLivePrice,
    isMobile
  };
}, "useCryptoData");
const safeRender = /* @__PURE__ */ __name((value) => {
  if (value === null || value === void 0) return "-";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}, "safeRender");
const formatPrice = /* @__PURE__ */ __name((price) => {
  if (!price || price === "Yükleniyor..." || price === "Fiyat Bekleniyor...") return price;
  return parseFloat(price).toString();
}, "formatPrice");
const pnlColor = /* @__PURE__ */ __name((pnl) => {
  if (!pnl) return "#949ba4";
  const str = String(pnl);
  if (str.startsWith("+")) return "#23a559";
  if (str.startsWith("-")) return "#da373c";
  return "#f0b232";
}, "pnlColor");
const TAB_CONFIG = {
  TUM_STRATEJILER: { icon: "📊", shortLabel: "Tümü", color: "#5865f2" },
  ACIK_POZISYONLAR: { icon: "💼", shortLabel: "Açık Poz.", color: "#f0b232" },
  POZISYON_OLMAYAN: { icon: "🔍", shortLabel: "Poz. Yok", color: "#949ba4" },
  ZARARDA_OLANLAR: { icon: "🔴", shortLabel: "Zararda", color: "#da373c" },
  ALIM_FIRSATI: { icon: "💰", shortLabel: "Alım Fır.", color: "#23a559" }
};
const LivePrice = /* @__PURE__ */ __name(({ price }) => {
  const [prevPrice, setPrevPrice] = reactExports.useState(price);
  const [colorClass, setColorClass] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (!price || price === "Yükleniyor..." || price === "Fiyat Bekleniyor..." || price === "...") return;
    const current = parseFloat(price);
    const previous = parseFloat(prevPrice);
    if (current > previous) setColorClass("flash-green");
    else if (current < previous) setColorClass("flash-red");
    setPrevPrice(price);
    const timer = setTimeout(() => setColorClass(""), 1e3);
    return () => clearTimeout(timer);
  }, [price]);
  const displayPrice = formatPrice(price);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: colorClass, style: {
    fontSize: "0.95em",
    fontWeight: "bold",
    color: price === "Yükleniyor..." || price === "Fiyat Bekleniyor..." || price === "..." ? "#999" : colorClass === "flash-green" ? "#23a559" : colorClass === "flash-red" ? "#da373c" : "#23a559",
    transition: "color 0.5s ease"
  }, children: price !== "Yükleniyor..." && price !== "Fiyat Bekleniyor..." && price !== "..." ? `$${displayPrice}` : price });
}, "LivePrice");
const SignalBadge = /* @__PURE__ */ __name(({ signal }) => {
  if (!signal || signal === "-") return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4" }, children: "-" });
  const isLong = signal === "LONG";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
    backgroundColor: isLong ? "rgba(35,165,89,0.15)" : "rgba(218,55,60,0.15)",
    color: isLong ? "#23a559" : "#da373c",
    padding: "2px 8px",
    borderRadius: 4,
    fontWeight: 700,
    fontSize: "0.8em",
    border: `1px solid ${isLong ? "rgba(35,165,89,0.3)" : "rgba(218,55,60,0.3)"}`
  }, children: [
    isLong ? "▲" : "▼",
    " ",
    signal
  ] });
}, "SignalBadge");
const StatusBadge = /* @__PURE__ */ __name(({ status }) => {
  if (!status) return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#949ba4" }, children: "-" });
  const str = String(status);
  const isProfit = str.includes("KAR") || str.includes("UYUYOR");
  const isLoss = str.includes("ZARAR") || str.includes("TERS");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
    fontSize: "0.8em",
    fontWeight: 600,
    color: isProfit ? "#23a559" : isLoss ? "#da373c" : "#f0b232"
  }, children: str });
}, "StatusBadge");
const styles = {
  pageContainer: {
    minHeight: "100%",
    backgroundColor: "#1e1f22",
    color: "#dbdee1",
    padding: "20px",
    boxSizing: "border-box"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    paddingBottom: "15px",
    borderBottom: "1px solid #2b2d31",
    flexWrap: "wrap",
    gap: 10
  },
  headerLeft: { display: "flex", flexDirection: "column", gap: "5px" },
  title: {
    margin: 0,
    fontSize: "1.4em",
    display: "flex",
    alignItems: "center",
    fontWeight: "700",
    color: "#fff"
  },
  backButton: {
    textDecoration: "none",
    color: "#949ba4",
    fontSize: "0.9em",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  refreshButton: {
    backgroundColor: "#5865f2",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontWeight: "600"
  },
  portfolioBtn: {
    backgroundColor: "#2b2d31",
    border: "1px solid #f0b232",
    color: "#f0b232",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  metaBar: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    padding: "8px 12px",
    backgroundColor: "#2b2d31",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: "0.85em",
    color: "#dbdee1",
    alignItems: "center"
  },
  modeToggleContainer: { display: "flex", gap: 10, marginBottom: 15 },
  modeToggleBtn: {
    flex: 1,
    padding: "12px 20px",
    borderRadius: 8,
    border: "2px solid #40444b",
    backgroundColor: "#2b2d31",
    color: "#949ba4",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.95em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  },
  modeToggleActive: {
    backgroundColor: "#313338",
    color: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
  },
  tabBar: { marginBottom: 15, overflowX: "auto" },
  tabs: { display: "flex", gap: "6px", paddingBottom: "5px", minWidth: "max-content" },
  tabButton: {
    backgroundColor: "#2b2d31",
    border: "1px solid #40444b",
    color: "#949ba4",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "0.85em",
    display: "flex",
    alignItems: "center",
    gap: 4,
    whiteSpace: "nowrap",
    transition: "all 0.2s"
  },
  activeTab: { color: "#fff", fontWeight: "700", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" },
  filterBar: {
    display: "flex",
    gap: 15,
    marginBottom: 15,
    alignItems: "center",
    flexWrap: "wrap"
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#2b2d31",
    borderRadius: 8,
    padding: "6px 12px",
    border: "1px solid #40444b",
    flex: 1,
    maxWidth: 400
  },
  searchInput: {
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    color: "#dbdee1",
    fontSize: "0.9em",
    flex: 1
  },
  clearSearchBtn: {
    background: "none",
    border: "none",
    color: "#949ba4",
    cursor: "pointer",
    padding: "2px 5px"
  },
  resultInfo: { display: "flex", alignItems: "center", gap: 10 },
  positionBanner: {
    padding: "10px 15px",
    backgroundColor: "rgba(240,178,50,0.08)",
    border: "1px solid rgba(240,178,50,0.2)",
    borderRadius: 8,
    marginBottom: 15,
    fontSize: "0.85em",
    color: "#dbdee1",
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap"
  },
  positionCoinTag: {
    padding: "3px 10px",
    borderRadius: 6,
    fontWeight: 700,
    fontSize: "0.8em",
    display: "inline-flex",
    alignItems: "center",
    gap: 3,
    transition: "all 0.2s"
  },
  content: {},
  tableContainer: {
    overflowX: "auto",
    borderRadius: 10,
    border: "1px solid #2f3136",
    backgroundColor: "#2b2d31"
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.85em" },
  tableHeaderRow: { backgroundColor: "#202225", borderBottom: "2px solid #40444b" },
  tfBadge: {
    backgroundColor: "#40444b",
    color: "#dbdee1",
    padding: "2px 6px",
    borderRadius: 4,
    fontSize: "0.8em",
    fontWeight: 600
  },
  miniTradeBtn: {
    backgroundColor: "#23a559",
    color: "white",
    border: "none",
    padding: "5px 8px",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: "0.8em",
    display: "flex",
    alignItems: "center"
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    paddingBottom: 30
  },
  pageBtn: {
    backgroundColor: "#2b2d31",
    border: "1px solid #40444b",
    color: "#dbdee1",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.85em"
  },
  pageNumbers: { display: "flex", gap: 4 },
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
  loader: { textAlign: "center", marginTop: 80, color: "#949ba4", fontSize: "1.1em" },
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
    zIndex: 2e3
  },
  modalContent: {
    backgroundColor: "#313338",
    padding: "25px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    border: "1px solid #40444b",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    color: "white",
    borderBottom: "1px solid #444",
    paddingBottom: 10
  },
  closeBtn: { background: "none", border: "none", color: "#bbb", fontSize: "1.2em", cursor: "pointer" },
  modeBtn: {
    flex: 1,
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "1em"
  },
  inputWrapper: { marginBottom: 15 },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "6px 0 0 6px",
    border: "1px solid #40444b",
    backgroundColor: "#202225",
    color: "white",
    fontSize: "1.1em",
    outline: "none",
    width: "100%"
  },
  maxBtn: {
    padding: "0 15px",
    backgroundColor: "#40444b",
    border: "1px solid #40444b",
    borderRadius: "0 6px 6px 0",
    color: "#f0b232",
    fontWeight: "bold",
    cursor: "pointer"
  },
  confirmBtn: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1em",
    cursor: "pointer",
    marginTop: 10
  },
  balanceCard: {
    backgroundColor: "#202225",
    padding: "15px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "20px",
    border: "1px solid #f0b232"
  },
  holdingsList: { maxHeight: "250px", overflowY: "auto", margin: "10px 0" },
  holdingItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #40444b",
    alignItems: "center"
  }
};
if (typeof document !== "undefined") {
  const id = "crypto-dashboard-styles";
  if (!document.getElementById(id)) {
    const styleSheet = document.createElement("style");
    styleSheet.id = id;
    styleSheet.innerText = `
  @keyframes flashGreen { 0% { color: #fff; background: rgba(35, 165, 89, 0.5); } 100% { color: #23a559; background: transparent; } }
  @keyframes flashRed { 0% { color: #fff; background: rgba(218, 55, 60, 0.5); } 100% { color: #da373c; background: transparent; } }
  .flash-green { animation: flashGreen 1s ease-out; }
  .flash-red { animation: flashRed 1s ease-out; }
  td, th { padding: 8px 10px; text-align: center; border-bottom: 1px solid #2f3136; }
  th { color: #949ba4; font-weight: 600; font-size: 0.8em; }
  input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`;
    document.head.appendChild(styleSheet);
  }
}
const TradeModal = /* @__PURE__ */ __name(({ coin, initialPrice, livePrices, portfolio, onClose, onTrade }) => {
  const [amount, setAmount] = reactExports.useState("");
  const [usdtTotal, setUsdtTotal] = reactExports.useState("");
  const [mode, setMode] = reactExports.useState("BUY");
  const symbolKey = Object.keys(livePrices).find((k) => k === coin || k === `${coin}USDT`) || coin;
  const currentLivePrice = livePrices[symbolKey] || initialPrice;
  const numericPrice = parseFloat(String(currentLivePrice).replace(/,/g, "").replace("$", ""));
  const userBalance = parseFloat(portfolio?.balance || 0);
  const findHolding = /* @__PURE__ */ __name(() => {
    if (!portfolio?.holdings) return 0;
    const keys = Object.keys(portfolio.holdings);
    const found = keys.find((k) => k.includes(coin));
    return found ? parseFloat(portfolio.holdings[found]) : 0;
  }, "findHolding");
  const userCoinHolding = findHolding();
  reactExports.useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      setUsdtTotal((parseFloat(amount) * numericPrice).toFixed(2));
    }
  }, [numericPrice]);
  const handleAmountChange = /* @__PURE__ */ __name((val) => {
    setAmount(val);
    if (!val || isNaN(parseFloat(val))) {
      setUsdtTotal("");
      return;
    }
    setUsdtTotal((parseFloat(val) * numericPrice).toFixed(2));
  }, "handleAmountChange");
  const handleUsdtChange = /* @__PURE__ */ __name((val) => {
    setUsdtTotal(val);
    if (!val || isNaN(parseFloat(val))) {
      setAmount("");
      return;
    }
    setAmount(parseFloat((parseFloat(val) / numericPrice).toFixed(6)).toString());
  }, "handleUsdtChange");
  const handleMax = /* @__PURE__ */ __name(() => {
    if (mode === "BUY") handleUsdtChange(userBalance.toString());
    else handleAmountChange(userCoinHolding.toString());
  }, "handleMax");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modalOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalContent, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        mode === "BUY" ? "🟢 Alış" : "🔴 Satış",
        ": ",
        coin
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: 10, borderRadius: 8, marginBottom: 15, textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#999", fontSize: "0.9em" }, children: "Canlı Piyasa Fiyatı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "1.4em", fontWeight: "bold" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LivePrice, { price: currentLivePrice }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 15 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            setMode("BUY");
            setAmount("");
            setUsdtTotal("");
          }, "onClick"),
          style: { ...styles.modeBtn, backgroundColor: mode === "BUY" ? "#23a559" : "#2b2d31", opacity: mode === "BUY" ? 1 : 0.5 },
          children: "AL (Buy)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            setMode("SELL");
            setAmount("");
            setUsdtTotal("");
          }, "onClick"),
          style: { ...styles.modeBtn, backgroundColor: mode === "SELL" ? "#da373c" : "#2b2d31", opacity: mode === "SELL" ? 1 : 0.5 },
          children: "SAT (Sell)"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 10, fontSize: "0.85em", color: "#dbdee1", display: "flex", justifyContent: "space-between", padding: "0 5px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "💰 Bakiye: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#23a559" }, children: [
          "$",
          userBalance.toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "🪙 Varlık: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#f0b232" }, children: [
          formatPrice(userCoinHolding),
          " ",
          coin
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputWrapper, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
        "Miktar (",
        coin,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: amount, onChange: /* @__PURE__ */ __name((e) => handleAmountChange(e.target.value), "onChange"), style: styles.input, placeholder: "0" }),
        mode === "SELL" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleMax, style: styles.maxBtn, children: "MAX" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputWrapper, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Toplam (USDT)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "number", value: usdtTotal, onChange: /* @__PURE__ */ __name((e) => handleUsdtChange(e.target.value), "onChange"), style: styles.input, placeholder: "0" }),
        mode === "BUY" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleMax, style: styles.maxBtn, children: "MAX" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => onTrade(mode, coin, amount, numericPrice), "onClick"),
        style: { ...styles.confirmBtn, backgroundColor: mode === "BUY" ? "#23a559" : "#da373c" },
        disabled: !amount || parseFloat(amount) <= 0,
        children: mode === "BUY" ? "SATIN AL" : "SATIŞ YAP"
      }
    )
  ] }) });
}, "TradeModal");
const PortfolioModal = /* @__PURE__ */ __name(({ portfolio, onClose }) => {
  if (!portfolio) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.modalOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalContent, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modalHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "💼 Cüzdanım" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.balanceCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Toplam Bakiye (USDT)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: { color: "#23a559", margin: "5px 0" }, children: [
        "$",
        formatPrice(portfolio.balance)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: { borderBottom: "1px solid #444", paddingBottom: 5, marginBottom: 10 }, children: "Varlıklarım" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.holdingsList, children: !portfolio.holdings || Object.keys(portfolio.holdings).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#999", textAlign: "center" }, children: "Henüz coin almadınız." }) : Object.entries(portfolio.holdings).map(([symbol, qty]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.holdingItem, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#fff", fontSize: "1.1em" }, children: symbol.replace("USDT", "") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#f0b232" }, children: [
        formatPrice(qty),
        " Adet"
      ] })
    ] }, symbol)) })
  ] }) });
}, "PortfolioModal");
const CryptoDashboard = /* @__PURE__ */ __name(() => {
  const api = useCryptoData();
  const SortHeader = /* @__PURE__ */ __name(({ field, children, style: extraStyle }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { onClick: /* @__PURE__ */ __name(() => api.handleSort(field), "onClick"), style: {
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    color: api.sortBy === field ? "#f0b232" : "#949ba4",
    ...extraStyle
  }, children: [
    children,
    " ",
    api.sortBy === field ? api.sortDir === "asc" ? "▲" : "▼" : ""
  ] }), "SortHeader");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.pageContainer, paddingTop: api.isMobile ? "max(10px, env(safe-area-inset-top))" : "20px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", style: styles.backButton, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaArrowLeft, {}),
          " Ana Menü"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: styles.title, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBitcoin, { style: { color: "#f0b232", marginRight: "10px" } }),
          "Crypto AI Dashboard",
          api.meta.version && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "0.5em", color: "#949ba4", marginLeft: 10 }, children: [
            "v",
            api.meta.version
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => api.setShowPortfolio(true), "onClick"), style: styles.portfolioBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaWallet, {}),
          " Cüzdan ($",
          formatPrice(api.portfolio?.balance || "0"),
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: api.fetchData, style: styles.refreshButton, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaSync, { className: api.loading ? "spin" : "" }),
          " ",
          api.loading ? "" : "Yenile"
        ] })
      ] })
    ] }),
    api.meta.export_date && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.metaBar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "📅 Son Güncelleme: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: api.meta.export_date })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "📊 Strateji: ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: api.activeMode === "balance_mode" ? api.meta.balance_strategies : api.meta.winrate_strategies })
      ] }),
      api.positionCoins.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "💼 Açık Poz: ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#f0b232" }, children: [
          api.positionCoins.length,
          " Coin"
        ] })
      ] })
    ] }),
    api.loading && !api.data ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.loader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spin", style: { fontSize: 40, display: "inline-block" }, children: "⏳" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Kripto Verileri Yükleniyor..." })
    ] }) : api.errorMsg ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginTop: 50 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#da373c" }, children: [
        "⚠️ ",
        api.errorMsg
      ] }),
      api.debugInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { backgroundColor: "#2b2d31", padding: 10, margin: "20px auto", maxWidth: 600, borderRadius: 8, textAlign: "left" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#f0b232" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaBug, {}),
          " Hata Verisi:"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: { color: "#dbdee1", fontSize: "0.8em", whiteSpace: "pre-wrap" }, children: api.debugInfo })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: api.fetchData, style: { ...styles.confirmBtn, maxWidth: 200, margin: "20px auto" }, children: "Tekrar Dene" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modeToggleContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => api.setActiveMode("balance_mode"), "onClick"),
            style: {
              ...styles.modeToggleBtn,
              ...api.activeMode === "balance_mode" ? styles.modeToggleActive : {},
              borderColor: api.activeMode === "balance_mode" ? "#f0b232" : "#40444b"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaChartLine, { style: { marginRight: 6 } }),
              api.isMobile ? "Balance" : "💰 Balance Sıralama"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => api.setActiveMode("winrate_mode"), "onClick"),
            style: {
              ...styles.modeToggleBtn,
              ...api.activeMode === "winrate_mode" ? styles.modeToggleActive : {},
              borderColor: api.activeMode === "winrate_mode" ? "#23a559" : "#40444b"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrophy, { style: { marginRight: 6 } }),
              api.isMobile ? "Winrate" : "🏆 Winrate Sıralama"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tabBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tabs, children: api.modeData && api.modeData.tabs && Object.keys(api.modeData.tabs).map((tabKey) => {
        const config = TAB_CONFIG[tabKey] || { icon: "📋", shortLabel: tabKey, color: "#949ba4" };
        const tab = api.modeData.tabs[tabKey];
        const isActive = api.activeTab === tabKey;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => api.setActiveTab(tabKey), "onClick"),
            style: {
              ...styles.tabButton,
              ...isActive ? { ...styles.activeTab, backgroundColor: config.color, borderColor: config.color } : {}
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: config.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: api.isMobile ? config.shortLabel : tab.title || tabKey }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                backgroundColor: isActive ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.1)",
                padding: "1px 6px",
                borderRadius: 10,
                fontSize: "0.75em",
                marginLeft: 4
              }, children: tab.count || 0 })
            ]
          },
          tabKey
        );
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filterBar, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.searchBox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaFilter, { style: { color: "#949ba4", marginRight: 8 } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: api.searchQuery,
              onChange: /* @__PURE__ */ __name((e) => api.setSearchQuery(e.target.value), "onChange"),
              placeholder: "Coin ara... (BTC, ETH, SOL)",
              style: styles.searchInput
            }
          ),
          api.searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => api.setSearchQuery(""), "onClick"), style: styles.clearSearchBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.resultInfo, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#949ba4", fontSize: "0.85em" }, children: [
          api.processedData.length,
          " sonuç ",
          api.searchQuery && `"${api.searchQuery}" için`
        ] }) })
      ] }),
      api.isPositionsTab && api.positionCoins.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.positionBanner, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          "💼 Açık Pozisyon (",
          api.positionCoins.length,
          "):"
        ] }),
        " ",
        api.positionCoins.map((c, i) => {
          const status = api.positionCoinStatus[c];
          const isTers = status?.hasTersSinyal;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
            ...styles.positionCoinTag,
            backgroundColor: isTers ? "rgba(218,55,60,0.15)" : "rgba(35,165,89,0.15)",
            color: isTers ? "#da373c" : "#23a559",
            border: `1px solid ${isTers ? "rgba(218,55,60,0.4)" : "rgba(35,165,89,0.4)"}`
          }, children: [
            i + 1,
            ". ",
            isTers ? "⚠️" : "✅",
            " ",
            c.replace("USDT", "")
          ] }, c);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.tableContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { style: styles.table, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: styles.tableHeaderRow, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "rank", children: "#" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "coin", children: "Coin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "TF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "Sinyal" }),
          api.isPositionsTab && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "Poz.Yönü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "Uyum" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "Giriş" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "Güncel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "pnl", children: "PNL%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "win_rate", children: "WR%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "trades", children: "İşlem" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SortHeader, { field: "x_kat", children: "X Kat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "Hedef" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "Durum" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { style: { color: "#949ba4" }, children: "Al/Sat" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: api.pagedData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: api.isPositionsTab ? 15 : 13, style: { textAlign: "center", padding: 40, color: "#949ba4" }, children: api.searchQuery ? "Arama sonucu bulunamadı." : "Bu sekmede veri yok." }) }) : api.pagedData.map((item, idx) => {
          const livePrice = api.getLivePrice(item.coin);
          const coinSymbol = api.extractCoinSymbol(item.coin)?.replace("USDT", "") || item.coin;
          const rowBg = idx % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              style: {
                backgroundColor: rowBg,
                transition: "background-color 0.2s"
              },
              onMouseEnter: /* @__PURE__ */ __name((e) => e.currentTarget.style.backgroundColor = "rgba(88,101,242,0.08)", "onMouseEnter"),
              onMouseLeave: /* @__PURE__ */ __name((e) => e.currentTarget.style.backgroundColor = rowBg, "onMouseLeave"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "#949ba4", fontWeight: 600 }, children: item.rank }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { style: { color: "#fff", fontSize: "0.9em" }, children: coinSymbol }),
                  livePrice && /* @__PURE__ */ jsxRuntimeExports.jsx(LivePrice, { price: livePrice })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.tfBadge, children: item.timeframe }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBadge, { signal: item.signal || item.sinyal_yonu || "-" }) }),
                api.isPositionsTab && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignalBadge, { signal: item.pozisyon_yonu || "-" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    fontSize: "0.8em",
                    color: item.ters_sinyal ? "#da373c" : "#23a559",
                    fontWeight: 600
                  }, children: item.yon_uyumu || "-" }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { color: "#dbdee1", fontSize: "0.85em" }, children: [
                  "$",
                  formatPrice(item.entry_price)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { style: { color: "#dbdee1", fontSize: "0.85em" }, children: [
                  "$",
                  formatPrice(item.current_price)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: pnlColor(item.pnl_percent), fontWeight: 700 }, children: safeRender(item.pnl_percent) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: {
                  color: parseFloat(String(item.win_rate || "0").replace("%", "")) >= 50 ? "#23a559" : "#da373c",
                  fontWeight: 600
                }, children: safeRender(item.win_rate) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "#dbdee1" }, children: safeRender(item.trades) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "#f0b232", fontWeight: 700 }, children: safeRender(item.x_kat) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { style: { color: "#5865f2", fontWeight: 600 }, children: safeRender(item.hedef_roe) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: item.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: /* @__PURE__ */ __name(() => api.setTradeData({ coin: coinSymbol, price: livePrice }), "onClick"),
                    style: {
                      ...styles.miniTradeBtn,
                      opacity: livePrice ? 1 : 0.4,
                      cursor: livePrice ? "pointer" : "not-allowed"
                    },
                    disabled: !livePrice,
                    title: livePrice ? `${coinSymbol} Al/Sat` : "Canlı fiyat bekleniyor",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExchangeAlt, {})
                  }
                ) })
              ]
            },
            `${item.rank}-${item.coin}-${item.timeframe}-${idx}`
          );
        }) })
      ] }) }),
      api.totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pagination, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => api.setPage((p) => Math.max(1, p - 1)), "onClick"),
            disabled: api.page === 1,
            style: { ...styles.pageBtn, opacity: api.page === 1 ? 0.4 : 1 },
            children: "◄ Önceki"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pageNumbers, children: Array.from({ length: Math.min(api.totalPages, 7) }, (_, i) => {
          let pageNum;
          if (api.totalPages <= 7) pageNum = i + 1;
          else if (api.page <= 4) pageNum = i + 1;
          else if (api.page >= api.totalPages - 3) pageNum = api.totalPages - 6 + i;
          else pageNum = api.page - 3 + i;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: /* @__PURE__ */ __name(() => api.setPage(pageNum), "onClick"),
              style: {
                ...styles.pageNumBtn,
                ...api.page === pageNum ? styles.pageNumActive : {}
              },
              children: pageNum
            },
            pageNum
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => api.setPage((p) => Math.min(api.totalPages, p + 1)), "onClick"),
            disabled: api.page === api.totalPages,
            style: { ...styles.pageBtn, opacity: api.page === api.totalPages ? 0.4 : 1 },
            children: "Sonraki ►"
          }
        )
      ] })
    ] }),
    api.showPortfolio && /* @__PURE__ */ jsxRuntimeExports.jsx(PortfolioModal, { portfolio: api.portfolio, onClose: /* @__PURE__ */ __name(() => api.setShowPortfolio(false), "onClose") }),
    api.tradeData && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TradeModal,
      {
        coin: api.tradeData.coin,
        initialPrice: api.tradeData.price,
        livePrices: api.prices,
        portfolio: api.portfolio,
        onClose: /* @__PURE__ */ __name(() => api.setTradeData(null), "onClose"),
        onTrade: api.handleTrade
      }
    )
  ] });
}, "CryptoDashboard");
export {
  CryptoDashboard as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { h as FaLock, a9 as FaCheck, aq as FaCoins, a as FaTimes, ar as FaShoppingBag, J as FaBitcoin, as as FaTshirt } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const PACKAGES = [
  { id: "p1", coins: 1e3, price: "15 USDT", note: "Başlangıç paketi" },
  { id: "p2", coins: 2500, price: "35 USDT", note: "Popüler seçim" },
  { id: "p3", coins: 6e3, price: "75 USDT", note: "En iyi değer" },
  { id: "p4", coins: 15e3, price: "180 USDT", note: "Topluluk paketi" }
];
const DEPOSIT_ADDRESSES = [
  { label: "USDT (TRC20)", value: "TGAny6VmDAWdVmTXCPrpsbLKKQQdvyvnWC" },
  { label: "USDT (ERC20)", value: "0xeaa14d4651a8ea7488289209b9294a1309dde37c" },
  { label: "SOL (Solana)", value: "Bk6ywhae86fp6BHmGtxabS6ncEGsFxhcnZEWJRZLVr9z" }
];
const useCryptoStore = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose }) => {
  const [activeTab, setActiveTab] = reactExports.useState("store");
  const [balance, setBalance] = reactExports.useState(0);
  const [storeItems, setStoreItems] = reactExports.useState([]);
  const [inventory, setInventory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [dailyInfo, setDailyInfo] = reactExports.useState(null);
  const [txid, setTxid] = reactExports.useState("");
  const [txidResult, setTxidResult] = reactExports.useState(null);
  const [selectedPack, setSelectedPack] = reactExports.useState(PACKAGES[0]);
  const refreshData = /* @__PURE__ */ __name(() => {
    fetchWithAuth(`${apiBaseUrl}/store/balance/`).then((r) => r.json()).then((d) => setBalance(d.coins));
    fetchWithAuth(`${apiBaseUrl}/store/items/`).then((r) => r.json()).then((d) => setStoreItems(d));
    fetchWithAuth(`${apiBaseUrl}/store/inventory/`).then((r) => r.json()).then((d) => setInventory(d));
  }, "refreshData");
  reactExports.useEffect(() => {
    refreshData();
  }, [apiBaseUrl, fetchWithAuth]);
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const handleDailyClaim = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/store/daily-reward/`, { method: "POST" });
      let data = null;
      try {
        data = await res.json();
      } catch (_) {
        data = null;
      }
      if (res.ok && data) {
        const safe = {
          claimed: !!data.claimed,
          added_coins: typeof data.added_coins === "number" ? data.added_coins : 0,
          new_balance: typeof data.new_balance === "number" ? data.new_balance : balance,
          streak: typeof data.streak === "number" ? data.streak : void 0,
          reason: data.reason,
          remaining_seconds: typeof data.remaining_seconds === "number" ? data.remaining_seconds : void 0,
          error: data.error
        };
        setDailyInfo(safe);
        if (safe.claimed && typeof safe.new_balance === "number") setBalance(safe.new_balance);
        refreshData();
      } else {
        const msg = data && (data.error || data.message || data.detail) || "İstek başarısız";
        setDailyInfo({ claimed: false, error: msg });
      }
    } catch (e) {
      console.error("[DailyReward] exception", e);
      setDailyInfo({ claimed: false, error: "Beklenmeyen hata" });
    }
    setLoading(false);
  }, "handleDailyClaim");
  const handleBuy = /* @__PURE__ */ __name(async (itemId) => {
    if (!await confirmDialog("Bu ürünü satın almak istiyor musunuz?")) return;
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/store/buy/`, { method: "POST", body: JSON.stringify({ item_id: itemId }) });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        refreshData();
      } else {
        toast.error(data.error);
      }
    } catch (e) {
      toast.error("❌ Hata oluştu.");
    }
    setLoading(false);
  }, "handleBuy");
  const handleEquip = /* @__PURE__ */ __name(async (inventoryId) => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/store/equip/${inventoryId}/`, { method: "POST" });
      if (res.ok) refreshData();
    } catch (e) {
      console.error("Equip error:", e);
      toast.error("Item equip failed");
    }
    setLoading(false);
  }, "handleEquip");
  const handleVerifyTxid = /* @__PURE__ */ __name(async () => {
    const trimmed = txid.trim();
    if (!trimmed) {
      toast.error("❌ Lütfen işlem ID girin");
      return;
    }
    if (trimmed.length < 6) {
      setTxidResult({ success: false, message: "İşlem ID çok kısa görünüyor" });
      return;
    }
    setLoading(true);
    setTxidResult(null);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/store/verify-txid/`, { method: "POST", body: JSON.stringify({ txid: trimmed }) });
      const data = await res.json();
      if (res.ok) {
        setTxidResult({ success: true, message: data.message || "Ödeme doğrulandı!", added_coins: data.added_coins });
        refreshData();
        setTxid("");
      } else {
        setTxidResult({ success: false, message: data.error || data.detail || "Doğrulama başarısız" });
      }
    } catch (e) {
      console.error("[VerifyTXID] exception", e);
      setTxidResult({ success: false, message: "Beklenmeyen hata" });
    }
    setLoading(false);
  }, "handleVerifyTxid");
  const handleCopyAddress = /* @__PURE__ */ __name(async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("✅ Adres kopyalandı: " + value);
    } catch (err) {
      toast.error("❌ Kopyalama başarısız oldu");
    }
  }, "handleCopyAddress");
  const handlePasteTxid = /* @__PURE__ */ __name(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setTxid(text.trim());
    } catch (e) {
      console.error("Clipboard read failed", e);
    }
  }, "handlePasteTxid");
  return {
    activeTab,
    setActiveTab,
    balance,
    storeItems,
    inventory,
    loading,
    dailyInfo,
    txid,
    setTxid,
    txidResult,
    selectedPack,
    setSelectedPack,
    handleDailyClaim,
    handleBuy,
    handleEquip,
    handleVerifyTxid,
    handleCopyAddress,
    handlePasteTxid
  };
}, "useCryptoStore");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.8)", zIndex: 3e3, display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", boxSizing: "border-box" },
  modal: { backgroundColor: "#2b2d31", width: "100%", maxWidth: "600px", maxHeight: "90vh", borderRadius: "12px", overflow: "hidden", border: "1px solid #1e1f22", display: "flex", flexDirection: "column" },
  header: { padding: "20px", backgroundColor: "#202225", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 },
  closeBtn: { background: "none", border: "none", color: "#bbb", cursor: "pointer", fontSize: "1.2em", padding: "10px", minWidth: "44px", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" },
  balanceBar: { padding: "10px 12px", backgroundColor: "#2f3136", color: "white", borderBottom: "1px solid #1e1f22", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" },
  tabs: { display: "flex", borderBottom: "1px solid #1e1f22", backgroundColor: "#202225", flexShrink: 0 },
  tab: { flex: 1, padding: "15px", background: "none", border: "none", color: "#bbb", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "44px", touchAction: "manipulation" },
  activeTab: { flex: 1, padding: "15px", background: "rgba(255,255,255,0.05)", border: "none", color: "white", cursor: "pointer", borderBottom: "2px solid #5865f2", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", minHeight: "44px", touchAction: "manipulation" },
  content: { padding: "20px", overflowY: "auto", flex: 1, WebkitOverflowScrolling: "touch", overflowX: "hidden" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "15px", paddingBottom: "20px" },
  itemCard: { backgroundColor: "#202225", padding: "15px", borderRadius: "8px", textAlign: "center", border: "1px solid #1e1f22", display: "flex", flexDirection: "column", alignItems: "center", color: "white", minHeight: "180px" },
  iconPlace: { width: 60, height: 60, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, flexShrink: 0 },
  buyBtn: { marginTop: "auto", padding: "12px", backgroundColor: "#5865f2", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%", fontSize: "0.9em", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, minHeight: "44px", touchAction: "manipulation", fontWeight: "600" },
  ownedBtn: { marginTop: "auto", padding: "12px", backgroundColor: "#40444b", color: "#aaa", border: "none", borderRadius: "4px", width: "100%", fontSize: "0.9em", minHeight: "44px" },
  useBtn: { marginTop: "auto", padding: "12px", backgroundColor: "#23a559", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", width: "100%", fontSize: "0.9em", minHeight: "44px", touchAction: "manipulation", fontWeight: "600" },
  equippedBtn: { marginTop: "auto", padding: "12px", backgroundColor: "transparent", color: "#23a559", border: "1px solid #23a559", borderRadius: "4px", width: "100%", fontSize: "0.9em", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, minHeight: "44px" },
  dailyBtn: { padding: "4px 8px", backgroundColor: "#5865f2", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontSize: "0.75em", lineHeight: 1, minHeight: "24px", marginLeft: "8px" }
};
const StoreTab = /* @__PURE__ */ __name(({ storeItems, loading, balance, handleBuy }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.grid, children: [
  storeItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.itemCard, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.iconPlace, children: item.preview_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.preview_image, alt: item.name, style: { width: 50, height: 50 } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "2em" }, children: "🎁" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: item.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.8em", color: "#999" }, children: item.description }),
    item.rarity && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "0.75em", color: "#b9bbbe", marginBottom: 6 }, children: [
      "Nadirlik: ",
      item.rarity
    ] }),
    item.is_owned ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles.ownedBtn, disabled: true, children: "Sahipsin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => handleBuy(item.id), "onClick"), style: styles.buyBtn, disabled: loading || balance < item.price, children: [
      balance < item.price ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaLock, {}) : null,
      " ",
      item.price,
      " Coin"
    ] })
  ] }, item.id)),
  storeItems.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#ccc" }, children: "Mağazada ürün yok." })
] }), "StoreTab");
const InventoryTab = /* @__PURE__ */ __name(({ inventory, loading, handleEquip }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.grid, children: [
  inventory.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.itemCard, border: entry.is_equipped ? "1px solid #23a559" : "1px solid #1e1f22" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.iconPlace, children: entry.preview_image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: entry.preview_image, alt: entry.name, style: { width: 50, height: 50 } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "2em" }, children: "🎒" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: entry.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.8em", color: "#999" }, children: entry.item_type }),
    entry.is_equipped ? /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.equippedBtn, disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}),
      " Kuşanıldı"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => handleEquip(entry.id), "onClick"), style: styles.useBtn, disabled: loading, children: "Kuşan" })
  ] }, entry.id)),
  inventory.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#ccc" }, children: "Henüz bir şey satın almadın." })
] }), "InventoryTab");
const DepositTab = /* @__PURE__ */ __name(({ selectedPack, setSelectedPack, txid, setTxid, txidResult, loading, handleVerifyTxid, handleCopyAddress, handlePasteTxid }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "10px", color: "white" }, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { marginTop: 0, color: "#f0b232" }, children: [
    "💰",
    " PawsCoin Satın Al"
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#b9bbbe", fontSize: "0.9em" }, children: "Kripto para ile PawsCoin satın alın. Ödemenizi yaptıktan sonra işlem ID'sini (TXID) aşağıya girin." }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, margin: "16px 0" }, children: PACKAGES.map((pkg) => {
    const selected = selectedPack?.id === pkg.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onClick: /* @__PURE__ */ __name(() => setSelectedPack(pkg), "onClick"),
        style: {
          backgroundColor: selected ? "#3b3f47" : "#202225",
          border: `1px solid ${selected ? "#5865f2" : "#1e1f22"}`,
          borderRadius: 10,
          padding: 12,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          transition: "border-color 0.2s, background-color 0.2s"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontWeight: 700, color: "white" }, children: [
              pkg.coins.toLocaleString(),
              " Coin"
            ] }),
            selected && /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { color: "#23a559" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#f0b232", fontWeight: 600 }, children: pkg.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#b9bbbe", fontSize: "0.8em" }, children: pkg.note })
        ]
      },
      pkg.id
    );
  }) }),
  selectedPack && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 14, padding: 12, backgroundColor: "#202225", borderRadius: 8, border: "1px solid #1e1f22", color: "#b9bbbe", fontSize: "0.9em" }, children: [
    "Seçilen paket: ",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "white" }, children: [
      selectedPack.coins.toLocaleString(),
      " Coin"
    ] }),
    " ",
    "–",
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#f0b232", fontWeight: 600 }, children: [
      " ",
      selectedPack.price
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 20, marginBottom: 20, padding: 15, backgroundColor: "#202225", borderRadius: 8, border: "1px solid #1e1f22" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { style: { margin: "0 0 10px 0", color: "#5865f2" }, children: [
      "📋",
      " Ödeme Bilgileri"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "0.85em", color: "#b9bbbe", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: 8 }, children: DEPOSIT_ADDRESSES.map((addr) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: 0 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          addr.label,
          ":"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => handleCopyAddress(addr.value), "onClick"),
            style: { backgroundColor: "#2f3136", color: "white", border: "1px solid #1e1f22", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: "0.8em" },
            children: "Kopyala"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { style: { display: "block", padding: 8, backgroundColor: "#2b2d31", borderRadius: 4, wordBreak: "break-all" }, children: addr.value })
    ] }, addr.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { fontSize: "0.75em", color: "#999", marginTop: 10 }, children: "Ödeme sonrası işlem ID'sini (TXID) aşağıya girin. Not: Şu an seçilen paket bilgisi bilgilendirme amaçlı, TXID doğrulaması işlem miktarını otomatik algılamaz." })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginBottom: 15 }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: { display: "block", marginBottom: 8, fontSize: "0.9em", color: "#b9bbbe" }, children: [
      "İ",
      "şlem ID (TXID):"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: txid,
          onChange: /* @__PURE__ */ __name((e) => setTxid(e.target.value), "onChange"),
          onKeyDown: /* @__PURE__ */ __name((e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleVerifyTxid();
            }
          }, "onKeyDown"),
          placeholder: "İşlem ID'sini buraya yapıştırın",
          style: { width: "100%", padding: "10px", backgroundColor: "#2b2d31", border: "1px solid #1e1f22", borderRadius: "4px", color: "white", fontSize: "0.9em" },
          disabled: loading
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handlePasteTxid,
          style: { padding: "0 12px", backgroundColor: "#5865f2", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1 },
          disabled: loading,
          children: "Yapıştır"
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: handleVerifyTxid,
      style: { width: "100%", padding: "12px", backgroundColor: "#5865f2", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer", fontSize: "1em", fontWeight: "600", opacity: loading ? 0.6 : 1 },
      disabled: loading,
      children: loading ? "Doğrulanıyor..." : "Doğrula ve Coin Al"
    }
  ),
  txidResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { marginTop: 15, padding: 12, backgroundColor: txidResult.success ? "#23a55933" : "#ff5d5d33", border: `1px solid ${txidResult.success ? "#23a559" : "#ff5d5d"}`, borderRadius: 6, color: txidResult.success ? "#23a559" : "#ff5d5d" }, children: [
    txidResult.success ? "✅" : "❌",
    " ",
    txidResult.message,
    txidResult.added_coins && /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
      " (+",
      txidResult.added_coins,
      " coin)"
    ] })
  ] })
] }), "DepositTab");
const CryptoStoreModal = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl }) => {
  const store = useCryptoStore({ fetchWithAuth, apiBaseUrl, onClose });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "10px" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { color: "#f0b232", size: 24 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: { margin: 0, color: "white" }, children: [
          "Pawscord Ma",
          "ğ",
          "aza"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.balanceBar, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mevcut Bakiye:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { style: { color: "#f0b232", fontSize: "1.2em" }, children: [
        store.balance,
        " Coin"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: store.handleDailyClaim, style: styles.dailyBtn, disabled: store.loading, children: [
        "🎁",
        " +10"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: store.activeTab === "store" ? styles.activeTab : styles.tab, onClick: /* @__PURE__ */ __name(() => store.setActiveTab("store"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShoppingBag, {}),
        " Ma",
        "ğ",
        "aza"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: store.activeTab === "deposit" ? styles.activeTab : styles.tab, onClick: /* @__PURE__ */ __name(() => store.setActiveTab("deposit"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaBitcoin, {}),
        " PawsCoin Sat",
        "ı",
        "n Al"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: store.activeTab === "inventory" ? styles.activeTab : styles.tab, onClick: /* @__PURE__ */ __name(() => store.setActiveTab("inventory"), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaTshirt, {}),
        " Envanterim"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      store.activeTab === "store" && /* @__PURE__ */ jsxRuntimeExports.jsx(StoreTab, { storeItems: store.storeItems, loading: store.loading, balance: store.balance, handleBuy: store.handleBuy }),
      store.activeTab === "inventory" && /* @__PURE__ */ jsxRuntimeExports.jsx(InventoryTab, { inventory: store.inventory, loading: store.loading, handleEquip: store.handleEquip }),
      store.activeTab === "deposit" && /* @__PURE__ */ jsxRuntimeExports.jsx(DepositTab, { ...store })
    ] }),
    store.dailyInfo && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "10px 20px", borderTop: "1px solid #1e1f22", backgroundColor: "#202225" }, children: store.dailyInfo.claimed ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#23a559" }, children: [
      "🎁",
      " ",
      store.dailyInfo.added_coins ?? 0,
      " coin ald",
      "ı",
      "n! Yeni bakiye: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: store.dailyInfo.new_balance ?? store.balance }),
      ".",
      typeof store.dailyInfo.streak !== "undefined" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { marginLeft: 8, color: "#b9bbbe" }, children: [
        "Streak: ",
        store.dailyInfo.streak
      ] })
    ] }) : store.dailyInfo.reason === "cooldown" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#b9bbbe" }, children: [
      "⏳",
      " G",
      "ü",
      "nl",
      "ü",
      "k ",
      "ö",
      "d",
      "ü",
      "l i",
      "ç",
      "in bekle: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: Math.max(0, store.dailyInfo.remaining_seconds ?? 0) }),
      " sn"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color: "#ff5d5d" }, children: [
      "⚠️",
      " ",
      store.dailyInfo.error || "Ödül alınamadı."
    ] }) })
  ] }) });
}, "CryptoStoreModal");
export {
  CryptoStoreModal as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, bC as FaGift, aq as FaCoins, ai as FaShoppingCart, ah as FaCrown, R as FaFire, aI as FaMedal, ap as FaPalette } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const useStoreAPI = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl }) => {
  const [items, setItems] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [balance, setBalance] = reactExports.useState(0);
  const [selectedCategory, setSelectedCategory] = reactExports.useState("all");
  const [selectedItem, setSelectedItem] = reactExports.useState(null);
  const loadStoreItems = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/store/items/`);
      const data = await response.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Failed to load store items:", error);
      toast.error("Failed to load store");
    } finally {
      setLoading(false);
    }
  }, "loadStoreItems");
  const loadBalance = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/users/balance/`);
      const data = await response.json();
      setBalance(data.balance || 0);
    } catch (error) {
      console.error("Failed to load balance:", error);
    }
  }, "loadBalance");
  const handlePurchase = /* @__PURE__ */ __name(async (item) => {
    if (balance < item.price) {
      toast.error("Insufficient coins!");
      return;
    }
    if (!await confirmDialog(`Purchase ${item.name} for ${item.price} coins?`)) return;
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/store/buy/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_id: item.id })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Successfully purchased ${item.name}!`);
        loadBalance();
        setSelectedItem(null);
      } else {
        toast.error(data.error || "Purchase failed");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      toast.error("Purchase failed");
    }
  }, "handlePurchase");
  reactExports.useEffect(() => {
    loadStoreItems();
    loadBalance();
  }, []);
  const filteredItems = selectedCategory === "all" ? items : items.filter((item) => item.category === selectedCategory);
  const featuredItems = items.filter((item) => item.featured);
  return {
    items,
    loading,
    balance,
    selectedCategory,
    setSelectedCategory,
    selectedItem,
    setSelectedItem,
    filteredItems,
    featuredItems,
    handlePurchase
  };
}, "useStoreAPI");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999999 },
  modal: { backgroundColor: "#1e1e1e", borderRadius: "8px", width: "95%", maxWidth: "1200px", maxHeight: "90vh", display: "flex", flexDirection: "column", color: "#fff" },
  header: { padding: "20px", borderBottom: "1px solid #444", display: "flex", justifyContent: "space-between", alignItems: "center" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  headerRight: { display: "flex", alignItems: "center", gap: "16px" },
  balance: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#2c2f33", padding: "8px 16px", borderRadius: "20px", fontSize: "16px", fontWeight: "600" },
  closeBtn: { background: "none", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer", padding: "8px" },
  categories: { display: "flex", gap: "8px", padding: "16px 20px", borderBottom: "1px solid #444", overflowX: "auto" },
  categoryBtn: { background: "none", border: "none", color: "#99aab5", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", whiteSpace: "nowrap", transition: "all 0.2s" },
  activeCategoryBtn: { backgroundColor: "#5865f2", color: "#fff" },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  loading: { textAlign: "center", padding: "40px", color: "#99aab5" },
  section: { marginBottom: "32px" },
  sectionTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },
  itemsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px" },
  itemCard: { backgroundColor: "#2c2f33", borderRadius: "8px", padding: "12px", cursor: "pointer", transition: "transform 0.2s", position: "relative", overflow: "hidden" },
  itemImage: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" },
  itemPlaceholder: { width: "100%", height: "150px", backgroundColor: "#202225", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px" },
  itemInfo: { display: "flex", flexDirection: "column", gap: "8px" },
  itemName: { fontSize: "14px", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  itemPrice: { display: "flex", alignItems: "center", gap: "6px", fontSize: "16px", fontWeight: "bold" },
  limitedBadge: { position: "absolute", top: "12px", right: "12px", backgroundColor: "#f04747", color: "#fff", padding: "4px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: "bold" },
  empty: { textAlign: "center", padding: "40px", color: "#99aab5" },
  detailOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.9)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e6 },
  detailModal: { backgroundColor: "#2c2f33", borderRadius: "12px", padding: "32px", maxWidth: "500px", width: "90%", position: "relative", textAlign: "center" },
  detailClose: { position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer" },
  detailImage: { width: "100%", maxHeight: "300px", objectFit: "cover", borderRadius: "8px", marginBottom: "20px" },
  detailPlaceholder: { width: "100%", height: "300px", backgroundColor: "#202225", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" },
  detailName: { fontSize: "28px", fontWeight: "bold", marginBottom: "12px" },
  detailRarity: { display: "inline-block", padding: "6px 12px", backgroundColor: "#202225", borderRadius: "6px", fontSize: "12px", fontWeight: "bold", marginBottom: "16px" },
  detailDescription: { fontSize: "14px", color: "#dcddde", lineHeight: "1.6", marginBottom: "24px" },
  detailPrice: { display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "24px", color: "#faa61a" },
  purchaseBtn: { width: "100%", padding: "14px", backgroundColor: "#43b581", border: "none", borderRadius: "6px", color: "#fff", fontSize: "16px", fontWeight: "600", cursor: "pointer", transition: "background 0.2s" },
  purchaseBtnDisabled: { backgroundColor: "#555", cursor: "not-allowed" }
};
const CATEGORIES = [
  { id: "all", name: "All Items", icon: "FaShoppingCart" },
  { id: "cosmetics", name: "Cosmetics", icon: "FaPalette" },
  { id: "badges", name: "Badges", icon: "FaMedal" },
  { id: "boosters", name: "Boosters", icon: "FaFire" },
  { id: "special", name: "Special", icon: "FaCrown" }
];
const getRarityColor = /* @__PURE__ */ __name((rarity) => {
  const colors = { common: "#b0b0b0", uncommon: "#1eff00", rare: "#0070dd", epic: "#a335ee", legendary: "#ff8000" };
  return colors[rarity] || colors.common;
}, "getRarityColor");
const ItemDetailModal = /* @__PURE__ */ __name(({ item, balance, onClose, onPurchase }) => {
  if (!item) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.detailOverlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailModal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.detailClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) }),
    item.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, style: styles.detailImage }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.detailPlaceholder, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { style: { fontSize: "120px", color: "#99aab5" } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { ...styles.detailName, color: getRarityColor(item.rarity) }, children: item.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.detailRarity, children: item.rarity.toUpperCase() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.detailDescription, children: item.description || "No description available." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.detailPrice, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { fontSize: "24px", color: "#faa61a" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "32px", fontWeight: "bold" }, children: item.price.toLocaleString() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => onPurchase(item), "onClick"),
        disabled: balance < item.price,
        style: { ...styles.purchaseBtn, ...balance < item.price && styles.purchaseBtnDisabled },
        children: balance < item.price ? "Insufficient Coins" : "Purchase"
      }
    )
  ] }) });
}, "ItemDetailModal");
const ICON_MAP = { FaShoppingCart, FaPalette, FaMedal, FaFire, FaCrown };
const ItemCard = /* @__PURE__ */ __name(({ item, onClick }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.itemCard, onClick: /* @__PURE__ */ __name(() => onClick(item), "onClick"), children: [
  item.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.image, alt: item.name, style: styles.itemImage }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.itemPlaceholder, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, { style: { fontSize: "48px", color: "#99aab5" } }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.itemInfo, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.itemName, color: getRarityColor(item.rarity) }, children: item.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.itemPrice, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { color: "#faa61a" } }),
      item.price.toLocaleString()
    ] })
  ] }),
  item.limited && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.limitedBadge, children: "LIMITED" })
] }), "ItemCard");
const StoreModal = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, username }) => {
  const store = useStoreAPI({ fetchWithAuth, apiBaseUrl });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShoppingCart, { style: { fontSize: "24px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: 0, fontSize: "20px" }, children: "Item Store" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerRight, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.balance, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: { color: "#faa61a" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: store.balance.toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.categories, children: CATEGORIES.map((cat) => {
      const Icon = ICON_MAP[cat.icon];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => store.setSelectedCategory(cat.id), "onClick"),
          style: { ...styles.categoryBtn, ...store.selectedCategory === cat.id && styles.activeCategoryBtn },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: cat.name })
          ]
        },
        cat.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: store.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading store..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      store.selectedCategory === "all" && store.featuredItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles.sectionTitle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaFire, { style: { color: "#f04747" } }),
          " Featured Items"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.itemsGrid, children: store.featuredItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ItemCard, { item, onClick: store.setSelectedItem }, item.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.section, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.sectionTitle, children: CATEGORIES.find((c) => c.id === store.selectedCategory)?.name || "All Items" }),
        store.filteredItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No items in this category" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.itemsGrid, children: store.filteredItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ItemCard, { item, onClick: store.setSelectedItem }, item.id)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ItemDetailModal,
      {
        item: store.selectedItem,
        balance: store.balance,
        onClose: /* @__PURE__ */ __name(() => store.setSelectedItem(null), "onClose"),
        onPurchase: store.handlePurchase
      }
    )
  ] }) });
}, "StoreModal");
export {
  StoreModal as default
};

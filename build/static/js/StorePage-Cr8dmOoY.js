var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as useAuth, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const CATEGORIES = [
  { id: "frames", name: "🖼️ Çerçeveler", icon: "🖼️" },
  { id: "badges", name: "🏆 Rozetler", icon: "🏆" },
  { id: "banners", name: "🎨 Banner", icon: "🎨" },
  { id: "emojis", name: "😎 Emoji", icon: "😎" },
  { id: "voices", name: "🎙️ Ses Efekti", icon: "🎙️" },
  { id: "themes", name: "🌈 Tema", icon: "🌈" }
];
const RARITY_COLORS = { common: "#FFFFFF", rare: "#5865F2", epic: "#9B59B6", legendary: "#F1C40F", unique: "#E74C3C" };
const getRarityColor = /* @__PURE__ */ __name((rarity) => RARITY_COLORS[rarity] || "#FFFFFF", "getRarityColor");
const useStorePage = /* @__PURE__ */ __name(() => {
  const { token } = useAuth();
  const [activeCategory, setActiveCategory] = reactExports.useState("frames");
  const [items, setItems] = reactExports.useState([]);
  const [inventory, setInventory] = reactExports.useState([]);
  const [userCoins, setUserCoins] = reactExports.useState(0);
  const [premiumTier, setPremiumTier] = reactExports.useState("free");
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedItem, setSelectedItem] = reactExports.useState(null);
  const API_URL = "https://api.pawscord.com";
  reactExports.useEffect(() => {
    fetchUserData();
    fetchItems();
    fetchInventory();
  }, [activeCategory]);
  const fetchUserData = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${API_URL}/api/store/coins/balance/`, { headers: { "Authorization": `Bearer ${token}` } });
      const d = await r.json();
      setUserCoins(d.coins);
      setPremiumTier(d.premium_tier);
    } catch (e) {
      console.error("Error fetching user data:", e);
    }
  }, "fetchUserData");
  const fetchItems = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/api/store/items/?category=${activeCategory}`, { headers: { "Authorization": `Bearer ${token}` } });
      const d = await r.json();
      setItems(d.results || d);
    } catch (e) {
      console.error("Error fetching items:", e);
    }
    setLoading(false);
  }, "fetchItems");
  const fetchInventory = /* @__PURE__ */ __name(async () => {
    try {
      const r = await fetch(`${API_URL}/api/store/inventory/`, { headers: { "Authorization": `Bearer ${token}` } });
      const d = await r.json();
      setInventory(d.results || d);
    } catch (e) {
      console.error("Error fetching inventory:", e);
    }
  }, "fetchInventory");
  const handlePurchase = /* @__PURE__ */ __name(async (item) => {
    if (userCoins < item.price) {
      toast.error(`❌ Yetersiz coin! ${item.price} coin gerekli, ${userCoins} coin var.`);
      return;
    }
    if (item.premium_required && premiumTier === "free") {
      toast.error(`❌ ${item.premium_required} üyelik gerekli!`);
      return;
    }
    try {
      const r = await fetch(`${API_URL}/api/store/items/${item.id}/purchase/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" }
      });
      const d = await r.json();
      if (r.ok) {
        toast.success(`✅ ${item.name} satın alındı!`);
        setUserCoins(d.coins_remaining);
        fetchInventory();
        setSelectedItem(null);
      } else toast.error(`❌ ${d.error || "Satın alma başarısız"}`);
    } catch (e) {
      console.error("Purchase error:", e);
      toast.error("❌ Bir hata oluştu");
    }
  }, "handlePurchase");
  const isOwned = /* @__PURE__ */ __name((itemId) => inventory.some((inv) => inv.item.item_id === itemId), "isOwned");
  return {
    activeCategory,
    setActiveCategory,
    items,
    userCoins,
    premiumTier,
    loading,
    selectedItem,
    setSelectedItem,
    handlePurchase,
    isOwned
  };
}, "useStorePage");
const ItemDetailModal = /* @__PURE__ */ __name(({ item, isOwned, onPurchase, onClose }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e4 }, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "linear-gradient(135deg, #2c2f33 0%, #23272a 100%)", borderRadius: "20px", padding: "40px", maxWidth: "500px", width: "90%", border: `3px solid ${getRarityColor(item.rarity)}`, boxShadow: `0 0 40px ${getRarityColor(item.rarity)}60` }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", fontSize: "100px", marginBottom: "20px" }, children: item.preview_url || "🎁" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: { margin: "0 0 10px", fontSize: "28px", color: getRarityColor(item.rarity) }, children: item.name }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 20px", color: "#aaa", fontSize: "16px" }, children: item.description }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", marginTop: "30px" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: { background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", padding: "12px 24px", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }, children: "Kapat" }),
    !isOwned && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => onPurchase(item), "onClick"), style: { background: "linear-gradient(135deg, #43b581 0%, #3ca374 100%)", border: "none", color: "#fff", padding: "12px 32px", borderRadius: "10px", cursor: "pointer", fontWeight: 700, fontSize: "16px" }, children: [
      "Sat",
      "ı",
      "n Al (",
      item.price,
      " ",
      "💰",
      ")"
    ] })
  ] })
] }) }), "ItemDetailModal");
const StorePage = /* @__PURE__ */ __name(() => {
  const s = useStorePage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { width: "100%", minHeight: "100vh", background: "linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)", color: "#fff" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "rgba(0,0,0,0.3)", padding: "20px 40px", borderBottom: "2px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { style: { margin: 0, fontSize: "32px", fontWeight: 700 }, children: [
        "🛒",
        " Pawscord Ma",
        "ğ",
        "aza"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "20px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { background: "linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)", padding: "12px 24px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "10px", fontWeight: 700, fontSize: "18px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "💰" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            s.userCoins.toLocaleString(),
            " Coins"
          ] })
        ] }),
        s.premiumTier !== "free" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { background: s.premiumTier === "elite" ? "linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)" : "linear-gradient(135deg, #5865F2 0%, #4752C4 100%)", padding: "12px 24px", borderRadius: "12px", fontWeight: 700 }, children: s.premiumTier === "elite" ? "👑 Elite" : "💎 Premium" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "30px 40px", borderBottom: "1px solid rgba(255,255,255,0.1)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => s.setActiveCategory(cat.id), "onClick"),
        style: { background: s.activeCategory === cat.id ? "linear-gradient(135deg, #5865F2 0%, #4752C4 100%)" : "rgba(255,255,255,0.05)", border: s.activeCategory === cat.id ? "2px solid #5865F2" : "1px solid rgba(255,255,255,0.1)", color: "#fff", padding: "12px 24px", borderRadius: "12px", cursor: "pointer", fontSize: "16px", fontWeight: 600, transition: "all 0.3s" },
        onMouseEnter: /* @__PURE__ */ __name((e) => {
          if (s.activeCategory !== cat.id) e.target.style.background = "rgba(255,255,255,0.1)";
        }, "onMouseEnter"),
        onMouseLeave: /* @__PURE__ */ __name((e) => {
          if (s.activeCategory !== cat.id) e.target.style.background = "rgba(255,255,255,0.05)";
        }, "onMouseLeave"),
        children: cat.name
      },
      cat.id
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "40px" }, children: s.loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", padding: "60px", fontSize: "20px" }, children: [
      "⏳",
      " Y",
      "ü",
      "kleniyor..."
    ] }) : s.items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", padding: "60px", fontSize: "18px", color: "#888" }, children: [
      "Bu kategoride hen",
      "ü",
      "z ",
      "öğ",
      "e yok"
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }, children: s.items.map((item) => {
      const owned = s.isOwned(item.item_id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: /* @__PURE__ */ __name(() => s.setSelectedItem(item), "onClick"),
          style: { background: "linear-gradient(135deg, #2c2f33 0%, #23272a 100%)", borderRadius: "16px", padding: "20px", border: `2px solid ${getRarityColor(item.rarity)}`, boxShadow: `0 0 20px ${getRarityColor(item.rarity)}40`, cursor: "pointer", transition: "transform 0.3s", position: "relative" },
          onMouseEnter: /* @__PURE__ */ __name((e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
          }, "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name((e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }, "onMouseLeave"),
          children: [
            owned && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", top: "10px", right: "10px", background: "#43b581", padding: "4px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 700 }, children: [
              "✅",
              " Sahip"
            ] }),
            item.premium_required && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: "10px", left: "10px", background: item.premium_required === "elite" ? "#E74C3C" : "#5865F2", padding: "4px 12px", borderRadius: "8px", fontSize: "12px", fontWeight: 700 }, children: item.premium_required === "elite" ? "👑 Elite" : "💎 Premium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: "150px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "80px", marginTop: item.premium_required ? "30px" : "0" }, children: item.preview_url || "🎁" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { margin: "16px 0 8px", fontSize: "20px", color: getRarityColor(item.rarity) }, children: item.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { margin: "0 0 16px", fontSize: "14px", color: "#aaa", minHeight: "40px" }, children: item.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "12px", color: getRarityColor(item.rarity), fontWeight: 700, textTransform: "uppercase", marginBottom: "12px" }, children: item.rarity }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", fontWeight: 700, color: "#F1C40F" }, children: item.price === 0 ? "ÜCRETSIZ" : `${item.price} 💰` }),
              !owned && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  onClick: /* @__PURE__ */ __name((e) => {
                    e.stopPropagation();
                    s.handlePurchase(item);
                  }, "onClick"),
                  style: { background: "linear-gradient(135deg, #43b581 0%, #3ca374 100%)", border: "none", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "14px" },
                  onMouseEnter: /* @__PURE__ */ __name((e) => {
                    e.target.style.transform = "scale(1.05)";
                  }, "onMouseEnter"),
                  onMouseLeave: /* @__PURE__ */ __name((e) => {
                    e.target.style.transform = "scale(1)";
                  }, "onMouseLeave"),
                  children: [
                    "Sat",
                    "ı",
                    "n Al"
                  ]
                }
              )
            ] })
          ]
        },
        item.id
      );
    }) }) }),
    s.selectedItem && /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDetailModal, { item: s.selectedItem, isOwned: s.isOwned(s.selectedItem.item_id), onPurchase: s.handlePurchase, onClose: /* @__PURE__ */ __name(() => s.setSelectedItem(null), "onClose") })
  ] });
}, "StorePage");
export {
  StorePage as default
};

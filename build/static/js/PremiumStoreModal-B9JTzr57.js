var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports, r as reactExports } from "./react-core-BiY6fgAJ.js";
import { t as toast, a as useAuth, d as confirmDialog } from "./index-DGqPEDt8.js";
import { Q as FaStar, ah as FaCrown, a as FaTimes, ai as FaShoppingCart, ao as FaRocket } from "./icons-vendor-2VDeY8fW.js";
import CoinStoreModal from "./CoinStoreModal-BXmYuior.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
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
    padding: "20px"
  },
  modal: {
    backgroundColor: "#2b2d31",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "1200px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
    overflow: "hidden"
  },
  header: {
    padding: "20px 24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    fontSize: "24px",
    cursor: "pointer",
    padding: "8px",
    transition: "color 0.2s"
  },
  tabs: {
    display: "flex",
    padding: "0 24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    gap: "8px"
  },
  tab: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    padding: "12px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s"
  },
  activeTab: {
    color: "#fff",
    borderBottomColor: "#5865f2"
  },
  content: {
    flex: 1,
    overflowY: "auto",
    padding: "24px"
  },
  sectionTitle: {
    color: "#fff",
    fontSize: "20px",
    marginBottom: "20px",
    fontWeight: "bold"
  },
  plansGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },
  planCard: {
    backgroundColor: "#1e1f22",
    borderRadius: "12px",
    padding: "20px",
    border: "2px solid transparent",
    transition: "all 0.3s",
    position: "relative"
  },
  popularCard: {
    border: "2px solid #f0b232",
    transform: "scale(1.05)"
  },
  popularBadge: {
    position: "absolute",
    top: "-12px",
    right: "20px",
    backgroundColor: "#f0b232",
    color: "#000",
    padding: "4px 12px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  planHeader: {
    borderBottom: "2px solid #5865f2",
    paddingBottom: "16px",
    marginBottom: "16px"
  },
  planName: {
    color: "#fff",
    fontSize: "18px",
    margin: "0 0 8px 0",
    fontWeight: "bold"
  },
  planPrice: {
    display: "flex",
    alignItems: "baseline",
    gap: "4px"
  },
  price: {
    color: "#fff",
    fontSize: "32px",
    fontWeight: "bold"
  },
  currency: {
    color: "#b9bbbe",
    fontSize: "14px"
  },
  featuresList: {
    marginBottom: "20px"
  },
  feature: {
    color: "#dcddde",
    fontSize: "14px",
    padding: "8px 0",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
  },
  purchaseButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "8px",
    transition: "transform 0.2s"
  },
  yearlyButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #5865f2",
    backgroundColor: "transparent",
    color: "#5865f2",
    fontWeight: "600",
    fontSize: "12px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  currentPlanButton: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #4e5058",
    backgroundColor: "transparent",
    color: "#4e5058",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "not-allowed"
  },
  storeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px"
  },
  storeItem: {
    backgroundColor: "#1e1f22",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s"
  },
  itemIcon: {
    fontSize: "48px",
    marginBottom: "12px"
  },
  itemName: {
    color: "#fff",
    fontSize: "16px",
    margin: "0 0 8px 0",
    fontWeight: "bold"
  },
  itemDescription: {
    color: "#b9bbbe",
    fontSize: "13px",
    margin: "0 0 12px 0"
  },
  itemPrice: {
    color: "#f0b232",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "12px"
  },
  buyButton: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#5865f2",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  boostDescription: {
    color: "#b9bbbe",
    fontSize: "14px",
    marginBottom: "24px"
  },
  boostTiers: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    marginBottom: "24px"
  },
  boostTier: {
    backgroundColor: "#1e1f22",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)"
  },
  boostButton: {
    width: "100%",
    maxWidth: "400px",
    padding: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f0b232",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    display: "block",
    margin: "0 auto"
  },
  boostTab: {
    padding: "10px 0"
  },
  boostHeader: {
    textAlign: "center",
    marginBottom: "30px"
  },
  boostTitle: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 10px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  boostIcon: {
    fontSize: "32px"
  },
  boostSubtitle: {
    color: "#b9bbbe",
    fontSize: "15px",
    margin: 0
  },
  boostTiersContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginBottom: "30px"
  },
  boostTierCard: {
    background: "linear-gradient(145deg, #2b2d31, #1e1f22)",
    borderRadius: "16px",
    padding: "25px 20px",
    border: "2px solid",
    position: "relative",
    transition: "all 0.3s ease",
    textAlign: "center"
  },
  tierBadge: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px auto",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)"
  },
  tierNumber: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "bold",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)"
  },
  tierTitle: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: "700",
    margin: "0 0 5px 0"
  },
  tierRequirement: {
    color: "#72767d",
    fontSize: "13px",
    margin: "0 0 15px 0"
  },
  tierFeatureList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    textAlign: "left"
  },
  tierFeature: {
    color: "#dcddde",
    fontSize: "13px",
    padding: "6px 0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)"
  },
  featureIcon: {
    fontSize: "14px"
  },
  popularBadgeAlt: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #5865f2, #7c8af2)",
    color: "#fff",
    fontSize: "11px",
    fontWeight: "bold",
    padding: "4px 14px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(88, 101, 242, 0.4)"
  },
  premiumBadge: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "linear-gradient(135deg, #ffd700, #ff8c00)",
    color: "#000",
    fontSize: "11px",
    fontWeight: "bold",
    padding: "4px 14px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(255, 215, 0, 0.4)"
  },
  boostPurchaseButton: {
    width: "100%",
    maxWidth: "350px",
    padding: "16px 24px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, #ff6b9d, #f0b232, #ffd700)",
    color: "#000",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    margin: "0 auto",
    boxShadow: "0 4px 20px rgba(240, 178, 50, 0.4)",
    transition: "all 0.3s ease"
  },
  boostButtonIcon: {
    fontSize: "20px"
  }
};
const premiumPlans = {
  basic: {
    tier: "basic",
    name: "Pawscord Nitro Basic",
    price: 29.99,
    priceYearly: 299.99,
    color: "#5865f2",
    features: [
      { text: "100 sunucu", included: true },
      { text: "Sınırsız arkadaş", included: true },
      { text: "50 MB dosya yükleme", included: true },
      { text: "1080p video kalitesi", included: true },
      { text: "50 özel emoji", included: true },
      { text: "Animated avatar", included: true },
      { text: "HD ekran paylaşımı", included: true },
      { text: "Özel rozet", included: true },
      { text: "Server boosting", included: false },
      { text: "4K video", included: false }
    ]
  },
  premium: {
    tier: "premium",
    name: "Pawscord Nitro Premium",
    price: 49.99,
    priceYearly: 499.99,
    color: "#f0b232",
    popular: true,
    features: [
      { text: "Sınırsız sunucu", included: true },
      { text: "Sınırsız arkadaş", included: true },
      { text: "500 MB dosya yükleme", included: true },
      { text: "4K video kalitesi", included: true },
      { text: "200 özel emoji", included: true },
      { text: "Animated avatar + banner", included: true },
      { text: "4K ekran paylaşımı 60FPS", included: true },
      { text: "2x Server boost dahil", included: true },
      { text: "AI asistan", included: true },
      { text: "Özel profil temaları", included: true }
    ]
  }
};
const PremiumTab = /* @__PURE__ */ __name(({ styles: styles2, handlePurchase }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.premiumTab, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles2.sectionTitle, children: "Premium Üyelik Planları" }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.plansGrid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.planCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.planHeader, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles2.planName, children: "Ücretsiz" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.planPrice, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.price, children: "0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.currency, children: "TL/ay" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.featuresList, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.feature, children: "✅ 50 sunucu" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.feature, children: "✅ 100 arkadaş" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.feature, children: "✅ 8 MB dosya yükleme" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.feature, children: "✅ 720p video" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles2.feature, opacity: 0.5 }, children: "❌ Özel emoji" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles2.feature, opacity: 0.5 }, children: "❌ Animated avatar" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles2.currentPlanButton, disabled: true, children: "Mevcut Plan" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.planCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles2.planHeader, borderColor: premiumPlans.basic.color }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles2.planName, children: premiumPlans.basic.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.planPrice, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.price, children: premiumPlans.basic.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.currency, children: "TL/ay" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.featuresList, children: premiumPlans.basic.features.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles2.feature, opacity: feature.included ? 1 : 0.5 }, children: [
        feature.included ? "✅" : "❌",
        " ",
        feature.text
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handlePurchase(premiumPlans.basic, false), "onClick"),
          style: { ...styles2.purchaseButton, backgroundColor: premiumPlans.basic.color },
          children: "Satın Al (Aylık)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handlePurchase(premiumPlans.basic, true), "onClick"),
          style: styles2.yearlyButton,
          children: [
            "Yıllık Al (%16 İndirim) - ",
            premiumPlans.basic.priceYearly,
            " TL"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles2.planCard, ...styles2.popularCard }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.popularBadge, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, {}),
        " EN POPÜLER"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles2.planHeader, borderColor: premiumPlans.premium.color }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles2.planName, children: premiumPlans.premium.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.planPrice, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.price, children: premiumPlans.premium.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.currency, children: "TL/ay" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.featuresList, children: premiumPlans.premium.features.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles2.feature, opacity: feature.included ? 1 : 0.5 }, children: [
        feature.included ? "✅" : "❌",
        " ",
        feature.text
      ] }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handlePurchase(premiumPlans.premium, false), "onClick"),
          style: { ...styles2.purchaseButton, backgroundColor: premiumPlans.premium.color },
          children: "Satın Al (Aylık)"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handlePurchase(premiumPlans.premium, true), "onClick"),
          style: styles2.yearlyButton,
          children: [
            "Yıllık Al (%16 İndirim) - ",
            premiumPlans.premium.priceYearly,
            " TL"
          ]
        }
      )
    ] })
  ] })
] }), "PremiumTab");
const defaultStoreItems = [
  { id: 1, name: "Özel Emoji Paketi", price: 9.99, description: "50 premium emoji", icon: "😎", type: "one_time" },
  { id: 2, name: "Profil Teması", price: 14.99, description: "Özel profil arka planı", icon: "🎨", type: "one_time" },
  { id: 3, name: "Server Boost", price: 19.99, description: "Sunucunu güçlendir (1 ay)", icon: "🚀", type: "subscription" },
  { id: 4, name: "Özel Rozet", price: 24.99, description: "Kendi rozetini yükle", icon: "⭐", type: "one_time" },
  { id: 5, name: "Ses Efektleri", price: 12.99, description: "10 ses efekti paketi", icon: "🎵", type: "one_time" },
  { id: 6, name: "Animated Sticker Paketi", price: 16.99, description: "30 animated sticker", icon: "✨", type: "one_time" }
];
const StoreTab = /* @__PURE__ */ __name(({ styles: styles2, storeItems, userInventory, handleBuyItem, loading }) => {
  const displayItems = storeItems.length > 0 ? storeItems : defaultStoreItems;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.storeTab, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles2.sectionTitle, children: "Mağaza Ürünleri" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.storeGrid, children: displayItems.map((item) => {
      const isOwned = userInventory.some(
        (inv) => inv.item_details?.id === item.id || inv.item === item.id
      );
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        ...styles2.storeItem,
        ...isOwned && { opacity: 0.6, borderColor: "#43b581" }
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.itemIcon, children: item.icon || "🎁" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles2.itemName, children: item.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles2.itemDescription, children: item.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.itemPrice, children: [
          item.price,
          " TL"
        ] }),
        isOwned ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            disabled: true,
            style: {
              ...styles2.buyButton,
              backgroundColor: "#43b581",
              cursor: "not-allowed",
              opacity: 0.7
            },
            children: "✓ Sahip"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => handleBuyItem(item), "onClick"),
            style: styles2.buyButton,
            disabled: loading,
            children: loading ? "Yükleniyor..." : "Satın Al"
          }
        )
      ] }, item.id);
    }) })
  ] });
}, "StoreTab");
const BoostTab = /* @__PURE__ */ __name(({ styles: styles2, loading, setLoading, token, API_BASE_URL }) => {
  const handleBoost = /* @__PURE__ */ __name(async () => {
    const serverId = prompt("Boost yapmak istediğin sunucu ID'sini gir:");
    if (!serverId) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/servers/boost/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ server_id: serverId, level: 1 })
      });
      const data = await res.json();
      if (data.status === "boosted") {
        toast.success("🚀 Sunucu başarıyla boost edildi!");
      } else {
        toast.error(`❌ ${data.error || "Boost yapılamadı"}`);
      }
    } catch (err) {
      toast.error("❌ Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  }, "handleBoost");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.boostTab, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.boostHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: styles2.boostTitle, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.boostIcon, children: "🚀" }),
        "Server Boosting"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles2.boostSubtitle, children: "Sevdiğin sunucuları güçlendir ve özel özellikler kazan!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles2.boostTiersContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles2.boostTierCard, borderColor: "#cd7f32" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles2.tierBadge, background: "linear-gradient(135deg, #cd7f32, #a0522d)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.tierNumber, children: "1" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles2.tierTitle, children: "Seviye 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles2.tierRequirement, children: "2 Boost gerekli" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles2.tierFeatureList, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "🎨" }),
            " 100 emoji slot"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "🎵" }),
            " 256 kbps ses kalitesi"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "📁" }),
            " 50 MB dosya yükleme"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "✨" }),
            " Animated sunucu ikonu"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles2.boostTierCard, borderColor: "#c0c0c0", transform: "scale(1.02)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles2.tierBadge, background: "linear-gradient(135deg, #c0c0c0, #808080)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.tierNumber, children: "2" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles2.popularBadge, children: "⭐ Popüler" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles2.tierTitle, children: "Seviye 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles2.tierRequirement, children: "7 Boost gerekli" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles2.tierFeatureList, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "🎨" }),
            " 150 emoji slot"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "🎵" }),
            " 384 kbps ses kalitesi"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "📁" }),
            " 100 MB dosya yükleme"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "📺" }),
            " 1080p Go Live stream"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "🔗" }),
            " Özel davet linki"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles2.boostTierCard, borderColor: "#ffd700", boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles2.tierBadge, background: "linear-gradient(135deg, #ffd700, #ff8c00)" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.tierNumber, children: "3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles2.premiumBadge }, children: "👑 Premium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles2.tierTitle, children: "Seviye 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles2.tierRequirement, children: "14 Boost gerekli" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { style: styles2.tierFeatureList, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "🎨" }),
            " 250 emoji slot"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "🎵" }),
            " 384 kbps ses kalitesi"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "📁" }),
            " 500 MB dosya yükleme"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "📺" }),
            " 4K Go Live 60FPS"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: styles2.tierFeature, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.featureIcon, children: "🔊" }),
            " Özel ses efektleri"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: handleBoost,
        style: styles2.boostPurchaseButton,
        disabled: loading,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles2.boostButtonIcon, children: "🚀" }),
          "Boost Satın Al (19.99 TL/ay)"
        ]
      }
    )
  ] });
}, "BoostTab");
const PremiumStoreModal = /* @__PURE__ */ __name(({ onClose }) => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = reactExports.useState("premium");
  const [premiumStatus, setPremiumStatus] = reactExports.useState(null);
  const [storeItems, setStoreItems] = reactExports.useState([]);
  const [userInventory, setUserInventory] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [showCoinStore, setShowCoinStore] = reactExports.useState(false);
  const API_BASE_URL = "https://api.pawscord.com";
  reactExports.useEffect(() => {
    fetchPremiumStatus();
    fetchStoreItems();
    fetchUserInventory();
  }, []);
  const fetchPremiumStatus = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/premium/status/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      setPremiumStatus(await response.json());
    } catch (error) {
      console.error("Premium status error:", error);
    }
  }, "fetchPremiumStatus");
  const fetchStoreItems = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/store/items/`);
      setStoreItems(await response.json());
    } catch (error) {
      console.error("Store items error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchStoreItems");
  const fetchUserInventory = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/store/inventory/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      setUserInventory(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Inventory error:", error);
      setUserInventory([]);
    }
  }, "fetchUserInventory");
  const handlePurchase = /* @__PURE__ */ __name(async (plan, isYearly = false) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/premium/subscribe/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tier: plan.tier,
          is_yearly: isYearly,
          payment_method: "test"
        })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`${plan.name} basariyla aktif edildi!`);
        await fetchPremiumStatus();
        onClose();
      } else {
        toast.error(`Hata: ${data.message}`);
      }
    } catch (error) {
      toast.error("Bir hata olustu. Lutfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }, "handlePurchase");
  const handleBuyItem = /* @__PURE__ */ __name(async (item) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/store/purchase/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ item_id: item.id, payment_method: "test" })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(`${item.name} satin alindi!`);
        await fetchUserInventory();
      } else if (data.insufficient_coins) {
        const buyCoins = await confirmDialog(
          `Yetersiz bakiye!
Gerekli: ${data.required} coin
Mevcut: ${data.current} coin
Coin satin almak ister misiniz?`
        );
        if (buyCoins) setShowCoinStore(true);
      } else {
        toast.error(`Hata: ${data.message || "Bilinmeyen hata"}`);
      }
    } catch (error) {
      toast.error("Bir hata olustu.");
    } finally {
      setLoading(false);
    }
  }, "handleBuyItem");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.overlay, children: [
    showCoinStore && /* @__PURE__ */ jsxRuntimeExports.jsx(
      CoinStoreModal,
      {
        onClose: /* @__PURE__ */ __name(() => setShowCoinStore(false), "onClose"),
        currentCoins: premiumStatus?.coins || 0,
        onPurchaseComplete: /* @__PURE__ */ __name((newBalance) => {
          setPremiumStatus((prev) => prev ? { ...prev, coins: newBalance } : null);
          fetchPremiumStatus();
        }, "onPurchaseComplete")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, { style: { color: "#f0b232", marginRight: "10px" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Premium Magaza" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                background: "linear-gradient(135deg, #f0b232 0%, #c79100 100%)",
                padding: "8px 16px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer"
              },
              onClick: /* @__PURE__ */ __name(() => setShowCoinStore(true), "onClick"),
              title: "Coin satin al",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "18px" }, children: "💰" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontWeight: "bold", color: "#000", fontSize: "14px" }, children: (premiumStatus?.coins || 0).toLocaleString() })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.tabs, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("premium"), "onClick"), style: { ...styles.tab, ...activeTab === "premium" && styles.activeTab }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, {}),
          " Premium"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("store"), "onClick"), style: { ...styles.tab, ...activeTab === "store" && styles.activeTab }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaShoppingCart, {}),
          " Magaza"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setActiveTab("boost"), "onClick"), style: { ...styles.tab, ...activeTab === "boost" && styles.activeTab }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaRocket, {}),
          " Server Boost"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
        activeTab === "premium" && /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumTab, { styles, handlePurchase }),
        activeTab === "store" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          StoreTab,
          {
            styles,
            storeItems,
            userInventory,
            handleBuyItem,
            loading
          }
        ),
        activeTab === "boost" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          BoostTab,
          {
            styles,
            loading,
            setLoading,
            token,
            API_BASE_URL
          }
        )
      ] })
    ] })
  ] });
}, "PremiumStoreModal");
export {
  PremiumStoreModal as default
};

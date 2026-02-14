var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { Q as FaStar, ah as FaCrown, aU as GiSparkles, aq as FaCoins, a9 as FaCheck, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ICON_MAP = { "💰": FaCoins, "💎": GiSparkles, "👑": FaCrown, "🌟": FaStar };
const getPackageIcon = /* @__PURE__ */ __name((icon) => ICON_MAP[icon] || FaCoins, "getPackageIcon");
function useCoinStore(onPurchaseComplete, onClose) {
  const [packages, setPackages] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [selectedPackage, setSelectedPackage] = reactExports.useState(null);
  const API_BASE_URL = "https://api.pawscord.com";
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/coins/packages/`);
        const data = await res.json();
        if (data.success) setPackages(data.packages);
      } catch (err) {
        console.error("❌ Coin paketleri yüklenemedi:", err);
      }
    })();
  }, []);
  const handlePurchase = /* @__PURE__ */ __name(async (pkg) => {
    setSelectedPackage(pkg.id);
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/coins/checkout/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ package_id: pkg.id, payment_method: "stripe" })
      });
      const data = await res.json();
      if (data.success) {
        if (data.test_mode) {
          toast.success(`✅ ${pkg.coins + (pkg.bonus || 0)} coin eklendi!

Yeni bakiye: ${data.new_balance} coin`, { duration: 4e3 });
          if (onPurchaseComplete) onPurchaseComplete(data.new_balance);
          onClose();
        } else {
          window.location.href = data.checkout_url;
        }
      }
    } catch (err) {
      console.error("❌ Satın alma hatası:", err);
      toast.error("Satın alma başarısız oldu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
      setSelectedPackage(null);
    }
  }, "handlePurchase");
  return { packages, loading, selectedPackage, handlePurchase };
}
__name(useCoinStore, "useCoinStore");
const card = /* @__PURE__ */ __name((isPopular) => ({
  position: "relative",
  background: isPopular ? "linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(88, 101, 242, 0.05) 100%)" : "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
  borderRadius: "20px",
  padding: "28px",
  border: isPopular ? "2px solid rgba(88, 101, 242, 0.5)" : "2px solid rgba(255, 255, 255, 0.1)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  boxShadow: isPopular ? "0 8px 32px rgba(88, 101, 242, 0.3), inset 0 0 60px rgba(88, 101, 242, 0.1)" : "0 4px 20px rgba(0, 0, 0, 0.3)",
  transform: "translateY(0)",
  overflow: "hidden"
}), "card");
const hoverShadow = /* @__PURE__ */ __name((isPopular, enter) => isPopular ? enter ? "0 12px 48px rgba(88, 101, 242, 0.4), inset 0 0 80px rgba(88, 101, 242, 0.15)" : "0 8px 32px rgba(88, 101, 242, 0.3), inset 0 0 60px rgba(88, 101, 242, 0.1)" : enter ? "0 8px 32px rgba(255, 215, 0, 0.2)" : "0 4px 20px rgba(0, 0, 0, 0.3)", "hoverShadow");
const hoverBorder = /* @__PURE__ */ __name((isPopular, enter) => isPopular ? `2px solid rgba(88, 101, 242, ${enter ? 0.8 : 0.5})` : `2px solid ${enter ? "rgba(255, 215, 0, 0.3)" : "rgba(255, 255, 255, 0.1)"}`, "hoverBorder");
const buyBtn = /* @__PURE__ */ __name((isPopular, loading) => ({
  width: "100%",
  padding: "16px",
  borderRadius: "12px",
  fontWeight: "bold",
  fontSize: "16px",
  color: "white",
  background: isPopular ? "linear-gradient(135deg, #5865f2 0%, #4752c4 100%)" : "linear-gradient(135deg, #57f287 0%, #3ba55d 100%)",
  border: "none",
  cursor: loading ? "not-allowed" : "pointer",
  transition: "all 0.3s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  boxShadow: isPopular ? "0 6px 20px rgba(88, 101, 242, 0.4)" : "0 6px 20px rgba(87, 242, 135, 0.3)",
  opacity: loading ? 0.6 : 1,
  position: "relative",
  zIndex: 1,
  overflow: "hidden"
}), "buyBtn");
const btnShadow = /* @__PURE__ */ __name((isPopular, enter) => isPopular ? `0 ${enter ? 8 : 6}px ${enter ? 28 : 20}px rgba(88, 101, 242, ${enter ? 0.6 : 0.4})` : `0 ${enter ? 8 : 6}px ${enter ? 28 : 20}px rgba(87, 242, 135, ${enter ? 0.5 : 0.3})`, "btnShadow");
const PackageCard = /* @__PURE__ */ __name(({ pkg, loading, selectedPackage, onPurchase }) => {
  const Icon = getPackageIcon(pkg.icon);
  const totalCoins = pkg.coins + (pkg.bonus || 0);
  const isPopular = pkg.popular;
  const isLoading = loading && selectedPackage === pkg.id;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: card(isPopular),
      onMouseEnter: /* @__PURE__ */ __name((e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = hoverShadow(isPopular, true);
        e.currentTarget.style.border = hoverBorder(isPopular, true);
      }, "onMouseEnter"),
      onMouseLeave: /* @__PURE__ */ __name((e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = hoverShadow(isPopular, false);
        e.currentTarget.style.border = hoverBorder(isPopular, false);
      }, "onMouseLeave"),
      children: [
        isPopular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%", background: "radial-gradient(circle, rgba(88, 101, 242, 0.1) 0%, transparent 70%)", animation: "rotate 8s linear infinite", pointerEvents: "none" } }),
        isPopular && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #5865f2 0%, #4752c4 100%)", color: "white", fontSize: "12px", fontWeight: "bold", padding: "6px 16px", borderRadius: "20px", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 4px 12px rgba(88, 101, 242, 0.4)", border: "1px solid rgba(255, 255, 255, 0.2)", animation: "pulse 2s ease-in-out infinite" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaStar, { style: { fontSize: "12px" } }),
          " EN POPÜLER"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", justifyContent: "center", marginBottom: "20px", marginTop: isPopular ? "12px" : "0", position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isPopular ? "linear-gradient(135deg, rgba(88, 101, 242, 0.3) 0%, rgba(88, 101, 242, 0.1) 100%)" : "linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)",
          boxShadow: isPopular ? "0 0 40px rgba(88, 101, 242, 0.3), inset 0 0 20px rgba(88, 101, 242, 0.2)" : "0 0 30px rgba(255, 215, 0, 0.2), inset 0 0 20px rgba(255, 215, 0, 0.1)",
          border: `2px solid ${isPopular ? "rgba(88, 101, 242, 0.3)" : "rgba(255, 215, 0, 0.2)"}`
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { style: { fontSize: "48px", color: isPopular ? "#5865f2" : "#ffd700", filter: `drop-shadow(0 0 15px ${isPopular ? "rgba(88, 101, 242, 0.5)" : "rgba(255, 215, 0, 0.5)"})` } }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: { fontSize: "24px", fontWeight: "bold", color: "white", textAlign: "center", marginBottom: "16px", textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)", position: "relative", zIndex: 1 }, children: pkg.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center", marginBottom: "20px", position: "relative", zIndex: 1 }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "42px", fontWeight: "bold", background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", textShadow: "0 0 30px rgba(255, 215, 0, 0.3)", marginBottom: "8px" }, children: pkg.coins.toLocaleString() }),
          pkg.bonus && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "16px", color: "#57f287", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "8px", textShadow: "0 0 10px rgba(87, 242, 135, 0.3)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GiSparkles, { style: { fontSize: "18px" } }),
              " +",
              pkg.bonus.toLocaleString(),
              " Bonus!"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "13px", color: "#b9bbbe", marginTop: "6px" }, children: [
              "Toplam: ",
              totalCoins.toLocaleString(),
              " coin"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: "center", marginBottom: "20px", position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "32px", fontWeight: "bold", color: "white", textShadow: "0 2px 12px rgba(0, 0, 0, 0.4)" }, children: [
          pkg.price.toFixed(2),
          " ",
          pkg.currency
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => onPurchase(pkg), "onClick"),
            disabled: loading,
            style: buyBtn(isPopular, loading),
            onMouseEnter: /* @__PURE__ */ __name((e) => {
              if (!loading) {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = btnShadow(isPopular, true);
              }
            }, "onMouseEnter"),
            onMouseLeave: /* @__PURE__ */ __name((e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = btnShadow(isPopular, false);
            }, "onMouseLeave"),
            children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: "20px", height: "20px", border: "3px solid rgba(255, 255, 255, 0.3)", borderTop: "3px solid white", borderRadius: "50%", animation: "spin 1s linear infinite" } }),
              " İşleniyor..."
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { fontSize: "18px" } }),
              " Satın Al"
            ] })
          }
        )
      ]
    }
  );
}, "PackageCard");
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.85)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "20px",
    animation: "fadeIn 0.2s ease-in"
  },
  modal: {
    background: "linear-gradient(135deg, #2a2d35 0%, #1e2024 100%)",
    borderRadius: "24px",
    maxWidth: "1000px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(255, 215, 0, 0.1)",
    border: "1px solid rgba(255, 215, 0, 0.2)",
    animation: "slideUp 0.3s ease-out"
  },
  header: {
    position: "sticky",
    top: 0,
    background: "linear-gradient(135deg, #2a2d35 0%, #1e2024 100%)",
    borderBottom: "2px solid rgba(255, 215, 0, 0.15)",
    padding: "24px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
    borderRadius: "24px 24px 0 0"
  },
  headerTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px"
  },
  coinIcon: { fontSize: "36px", color: "#ffd700", filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))" },
  balanceText: { fontSize: "14px", color: "#b9bbbe", marginTop: "4px" },
  balanceAmount: { color: "#ffd700", fontWeight: "bold", fontSize: "16px", textShadow: "0 0 10px rgba(255, 215, 0, 0.3)" },
  closeBtn: {
    color: "#b9bbbe",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    padding: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  packagesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px"
  },
  infoBox: {
    marginTop: "32px",
    padding: "24px",
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
  },
  infoList: { fontSize: "14px", color: "#dcddde", display: "flex", flexDirection: "column", gap: "12px" },
  infoItem: { display: "flex", alignItems: "flex-start", gap: "10px" }
};
const ANIMATIONS_CSS = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.05); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes rotate { to { transform: rotate(360deg); } }
`;
const INFO_ITEMS = [
  { icon: "✓", color: "#57f287", text: "Coin'ler hesabınıza anında eklenir" },
  { icon: "✓", color: "#57f287", text: "Güvenli ödeme Stripe ile korunuyor" },
  { icon: "✓", color: "#57f287", text: "Bonus coin'ler belirli paketlere dahildir" },
  { icon: "⚠", color: "#faa61a", text: "Test modunda çalışıyor - gerçek ödeme alınmıyor", small: true }
];
const CoinStoreModal = /* @__PURE__ */ __name(({ onClose, currentCoins, onPurchaseComplete }) => {
  const { packages, loading, selectedPackage, handlePurchase } = useCoinStore(onPurchaseComplete, onClose);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: styles.headerTitle, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCoins, { style: styles.coinIcon }),
          "💰 Coin Mağazası"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.balanceText, children: [
          "Mevcut bakiye: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.balanceAmount, children: currentCoins?.toLocaleString() || 0 }),
          " coin"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onClose,
          style: styles.closeBtn,
          onMouseEnter: /* @__PURE__ */ __name((e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.color = "#ffffff";
            e.target.style.transform = "scale(1.1)";
          }, "onMouseEnter"),
          onMouseLeave: /* @__PURE__ */ __name((e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.color = "#b9bbbe";
            e.target.style.transform = "scale(1)";
          }, "onMouseLeave"),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { style: { fontSize: "24px" } })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "32px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.packagesGrid, children: packages.map((pkg) => /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCard, { pkg, loading, selectedPackage, onPurchase: handlePurchase }, pkg.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.infoBox, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.infoList, children: INFO_ITEMS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.infoItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: item.color, fontSize: "16px" }, children: item.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: item.small ? { color: "#b9bbbe", fontSize: "12px" } : void 0, children: item.text })
      ] }, i)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: ANIMATIONS_CSS })
  ] }) });
}, "CoinStoreModal");
export {
  CoinStoreModal as default
};

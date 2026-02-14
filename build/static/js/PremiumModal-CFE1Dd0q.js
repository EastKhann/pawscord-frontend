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
const PremiumModal = /* @__PURE__ */ __name(({ isOpen, onClose }) => {
  const { token } = useAuth();
  const [tiers, setTiers] = reactExports.useState([]);
  const [currentTier, setCurrentTier] = reactExports.useState("free");
  const [selectedTier, setSelectedTier] = reactExports.useState("premium");
  const [billingCycle, setBillingCycle] = reactExports.useState("monthly");
  const [loading, setLoading] = reactExports.useState(false);
  const API_URL = "https://api.pawscord.com";
  reactExports.useEffect(() => {
    if (isOpen) {
      fetchPremiumTiers();
    }
  }, [isOpen]);
  const fetchPremiumTiers = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${API_URL}/api/store/premium/tiers/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      setTiers(data.tiers);
      setCurrentTier(data.current_tier);
    } catch (error) {
      console.error("Error fetching tiers:", error);
    }
  }, "fetchPremiumTiers");
  const handleSubscribe = /* @__PURE__ */ __name(async () => {
    if (selectedTier === "free") return;
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/store/premium/subscribe/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tier: selectedTier,
          billing_cycle: billingCycle
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(`✅ ${selectedTier === "elite" ? "Elite" : "Premium"} üyeliğiniz başladı!`);
        onClose();
        window.location.reload();
      } else {
        toast.error(`❌ ${data.error || "Bir hata oluştu"}`);
      }
    } catch (error) {
      console.error("Subscribe error:", error);
      toast.error("❌ Bir hata oluştu");
    }
    setLoading(false);
  }, "handleSubscribe");
  if (!isOpen) return null;
  const getTierColor = /* @__PURE__ */ __name((tierId) => {
    const colors = {
      free: "#7F8C8D",
      premium: "#5865F2",
      elite: "#E74C3C"
    };
    return colors[tierId] || "#fff";
  }, "getTierColor");
  const getTierIcon = /* @__PURE__ */ __name((tierId) => {
    const icons = {
      free: "🌟",
      premium: "💎",
      elite: "👑"
    };
    return icons[tierId] || "";
  }, "getTierIcon");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.9)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4,
    padding: "20px"
  }, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    background: "linear-gradient(135deg, #2c2f33 0%, #23272a 100%)",
    borderRadius: "24px",
    maxWidth: "1200px",
    width: "100%",
    maxHeight: "90vh",
    overflowY: "auto",
    padding: "40px",
    position: "relative"
  }, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        style: {
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          border: "none",
          color: "#fff",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          cursor: "pointer",
          fontSize: "20px"
        },
        children: "✕"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: {
      margin: "0 0 10px",
      fontSize: "36px",
      fontWeight: 700,
      textAlign: "center",
      background: "linear-gradient(135deg, #5865F2 0%, #E74C3C 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }, children: "Pawscord Premium'a Geçin! 💎" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { textAlign: "center", color: "#aaa", marginBottom: "40px" }, children: "Profilinizi özelleştirin ve premium özelliklere erişin!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "30px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setBillingCycle("monthly"), "onClick"),
          style: {
            background: billingCycle === "monthly" ? "#5865F2" : "rgba(255, 255, 255, 0.1)",
            border: "none",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600
          },
          children: "Aylık"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setBillingCycle("yearly"), "onClick"),
          style: {
            background: billingCycle === "yearly" ? "#5865F2" : "rgba(255, 255, 255, 0.1)",
            border: "none",
            color: "#fff",
            padding: "12px 24px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: 600,
            position: "relative"
          },
          children: [
            "Yıllık",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
              position: "absolute",
              top: "-8px",
              right: "-8px",
              background: "#43b581",
              padding: "2px 8px",
              borderRadius: "8px",
              fontSize: "10px",
              fontWeight: 700
            }, children: "%17 İndirim" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px"
    }, children: tiers.map((tier) => {
      const isCurrentTier = tier.id === currentTier;
      const isSelected = tier.id === selectedTier;
      const price = billingCycle === "yearly" ? tier.price_yearly : tier.price;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          style: {
            background: isSelected ? `linear-gradient(135deg, ${getTierColor(tier.id)}20 0%, ${getTierColor(tier.id)}10 100%)` : "rgba(255, 255, 255, 0.05)",
            border: isSelected ? `3px solid ${getTierColor(tier.id)}` : "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "16px",
            padding: "30px",
            cursor: tier.id !== "free" ? "pointer" : "default",
            transition: "all 0.3s",
            position: "relative"
          },
          onClick: /* @__PURE__ */ __name(() => tier.id !== "free" && setSelectedTier(tier.id), "onClick"),
          children: [
            isCurrentTier && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              position: "absolute",
              top: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#43b581",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700
            }, children: "✅ Mevcut Paketiniz" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "60px", textAlign: "center", marginBottom: "20px" }, children: getTierIcon(tier.id) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: {
              margin: "0 0 10px",
              fontSize: "28px",
              fontWeight: 700,
              textAlign: "center",
              color: getTierColor(tier.id)
            }, children: tier.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
              textAlign: "center",
              marginBottom: "20px"
            }, children: tier.id === "free" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "32px", fontWeight: 700, color: "#fff" }, children: "ÜCRETSİZ" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "32px", fontWeight: 700, color: "#fff" }, children: [
                "₺",
                price.toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "14px", color: "#888" }, children: billingCycle === "yearly" ? "/yıl" : "/ay" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { style: {
              listStyle: "none",
              padding: 0,
              margin: "0 0 20px"
            }, children: tier.features.map((feature, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { style: {
              padding: "8px 0",
              fontSize: "14px",
              color: "#ddd",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#43b581" }, children: "✓" }),
              feature
            ] }, index)) }),
            tier.id !== "free" && !isCurrentTier && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  setSelectedTier(tier.id);
                }, "onClick"),
                style: {
                  width: "100%",
                  background: isSelected ? `linear-gradient(135deg, ${getTierColor(tier.id)} 0%, ${getTierColor(tier.id)}CC 100%)` : "rgba(255, 255, 255, 0.1)",
                  border: "none",
                  color: "#fff",
                  padding: "14px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "16px"
                },
                children: isSelected ? "Seçildi ✓" : "Seç"
              }
            )
          ]
        },
        tier.id
      );
    }) }),
    selectedTier !== "free" && selectedTier !== currentTier && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      marginTop: "40px",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleSubscribe,
          disabled: loading,
          style: {
            background: loading ? "rgba(255, 255, 255, 0.2)" : `linear-gradient(135deg, ${getTierColor(selectedTier)} 0%, ${getTierColor(selectedTier)}CC 100%)`,
            border: "none",
            color: "#fff",
            padding: "18px 60px",
            borderRadius: "14px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 700,
            fontSize: "18px",
            boxShadow: `0 8px 24px ${getTierColor(selectedTier)}40`
          },
          children: loading ? "⏳ İşleniyor..." : `${selectedTier === "elite" ? "👑 Elite" : "💎 Premium"} Satın Al`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#888", fontSize: "12px", marginTop: "10px" }, children: "⚠️ Bu bir prototip - gerçek ödeme entegrasyonu yapılmamıştır" })
    ] })
  ] }) });
}, "PremiumModal");
export {
  PremiumModal as default
};

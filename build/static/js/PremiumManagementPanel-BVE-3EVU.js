var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { g as getApiBase, d as confirmDialog } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const PremiumManagementPanel = /* @__PURE__ */ __name(({ onClose }) => {
  const [pricingTiers, setPricingTiers] = reactExports.useState([]);
  const [currentSubscription, setCurrentSubscription] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedTier, setSelectedTier] = reactExports.useState("classic");
  const [billingCycle, setBillingCycle] = reactExports.useState("monthly");
  const apiBaseUrl = getApiBase();
  const token = localStorage.getItem("access_token");
  reactExports.useEffect(() => {
    fetchPricingTiers();
    fetchCurrentSubscription();
  }, []);
  const fetchPricingTiers = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/nitro/pricing/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setPricingTiers(data.tiers || []);
    } catch (error) {
      console.error("Error fetching pricing:", error);
      y.error("❌ Fiyatlandırma bilgileri yüklenemedi");
    }
  }, "fetchPricingTiers");
  const fetchCurrentSubscription = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/nitro/my-subscription/`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      setCurrentSubscription(data.subscription || null);
    } catch (error) {
      console.error("Error fetching subscription:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchCurrentSubscription");
  const subscribe = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/nitro/subscribe/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          tier: selectedTier,
          billing_cycle: billingCycle,
          payment_method: "stripe"
          // or 'test' for testing
        })
      });
      const data = await response.json();
      if (response.ok) {
        y.success("🎉 Abonelik başarıyla başlatıldı!");
        fetchCurrentSubscription();
      } else {
        y.error(`❌ ${data.error || "Abonelik başlatılamadı"}`);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      y.error("❌ Abonelik hatası");
    }
  }, "subscribe");
  const cancelSubscription = /* @__PURE__ */ __name(async () => {
    if (!await confirmDialog("Aboneliğinizi iptal etmek istediğinizden emin misiniz?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/nitro/cancel/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      if (response.ok) {
        y.info("ℹ️ Abonelik iptal edildi");
        fetchCurrentSubscription();
      } else {
        y.error(`❌ ${data.error || "İptal edilemedi"}`);
      }
    } catch (error) {
      console.error("Error canceling:", error);
      y.error("❌ İptal hatası");
    }
  }, "cancelSubscription");
  const upgradeSubscription = /* @__PURE__ */ __name(async (newTier) => {
    try {
      const response = await fetch(`${apiBaseUrl}/nitro/upgrade/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          new_tier: newTier
        })
      });
      const data = await response.json();
      if (response.ok) {
        y.success("⬆️ Abonelik yükseltildi!");
        fetchCurrentSubscription();
      } else {
        y.error(`❌ ${data.error || "Yükseltilemedi"}`);
      }
    } catch (error) {
      console.error("Error upgrading:", error);
      y.error("❌ Yükseltme hatası");
    }
  }, "upgradeSubscription");
  const getTierColor = /* @__PURE__ */ __name((tier) => {
    const colors = {
      "basic": "#3b82f6",
      "classic": "#8b5cf6",
      "elite": "#f59e0b"
    };
    return colors[tier] || colors.classic;
  }, "getTierColor");
  const getTierIcon = /* @__PURE__ */ __name((tier) => {
    const icons = {
      "basic": "🌟",
      "classic": "💎",
      "elite": "👑"
    };
    return icons[tier] || icons.classic;
  }, "getTierIcon");
  const getFeatureIcon = /* @__PURE__ */ __name((featureName) => {
    const iconMap = {
      "upload_limit_mb": "📤",
      "video_quality": "🎥",
      "emoji_slots": "😀",
      "custom_tag": "🏷️",
      "animated_avatar": "🎭",
      "server_boosts": "🚀",
      "custom_profiles": "✨",
      "hd_video": "📺",
      "screen_share_quality": "🖥️",
      "profile_banner": "🎨",
      "custom_discriminator": "#️⃣",
      "badge": "🏆",
      "early_access": "🔓",
      "priority_support": "💬"
    };
    return iconMap[featureName] || "✓";
  }, "getFeatureIcon");
  const formatFeatureValue = /* @__PURE__ */ __name((key, value) => {
    if (typeof value === "boolean") return value ? "Evet" : "Hayır";
    if (key === "upload_limit_mb") return `${value} MB`;
    if (key.includes("quality")) return value;
    return value;
  }, "formatFeatureValue");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "premium-overlay", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "premium-panel", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "premium-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "💎 Pawscord Premium" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    currentSubscription ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "current-subscription", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "subscription-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subscription-icon", children: getTierIcon(currentSubscription.tier) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "subscription-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: currentSubscription.tier_name || currentSubscription.tier.toUpperCase() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "subscription-status", children: currentSubscription.is_active ? "✓ Aktif" : "⏸ Durdurulmuş" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "subscription-actions", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: cancelSubscription, children: "İptal Et" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "subscription-details", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-label", children: "Başlangıç:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-value", children: new Date(currentSubscription.start_date).toLocaleDateString("tr-TR") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-label", children: "Bitiş:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-value", children: new Date(currentSubscription.end_date).toLocaleDateString("tr-TR") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-label", children: "Otomatik Yenileme:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "detail-value", children: currentSubscription.auto_renew ? "Açık" : "Kapalı" })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-subscription", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-subscription-icon", children: "💎" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Premium Üyelik Yok" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Premium özelliklerden yararlanmak için aşağıdaki planlardan birini seçin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "billing-toggle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: `billing-option ${billingCycle === "monthly" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setBillingCycle("monthly"), "onClick"),
          children: "Aylık"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: `billing-option ${billingCycle === "yearly" ? "active" : ""}`,
          onClick: /* @__PURE__ */ __name(() => setBillingCycle("yearly"), "onClick"),
          children: [
            "Yıllık ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "save-badge", children: "%17 İndirim" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pricing-tiers", children: Object.keys(pricingTiers).map((tierKey) => {
      const tier = pricingTiers[tierKey];
      const isCurrentTier = currentSubscription?.tier === tierKey;
      const price = billingCycle === "yearly" ? tier.price_yearly : tier.price_monthly;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `tier-card ${selectedTier === tierKey ? "selected" : ""} ${isCurrentTier ? "current" : ""}`,
          style: { borderColor: getTierColor(tierKey) },
          onClick: /* @__PURE__ */ __name(() => !isCurrentTier && setSelectedTier(tierKey), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-header", style: { background: `linear-gradient(135deg, ${getTierColor(tierKey)}, ${getTierColor(tierKey)}99)` }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tier-icon", children: getTierIcon(tierKey) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: tier.name }),
              isCurrentTier && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "current-badge", children: "Mevcut Plan" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-price", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "price-amount", children: [
                "$",
                price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "price-period", children: [
                "/",
                billingCycle === "yearly" ? "yıl" : "ay"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-features", children: Object.entries(tier.features).map(([key, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "feature-icon", children: getFeatureIcon(key) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "feature-label", children: [
                key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
                ":"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "feature-value", children: formatFeatureValue(key, value) })
            ] }, key)) }),
            !isCurrentTier && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-actions", children: currentSubscription ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "upgrade-btn",
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  upgradeSubscription(tierKey);
                }, "onClick"),
                style: { background: `linear-gradient(135deg, ${getTierColor(tierKey)}, ${getTierColor(tierKey)}dd)` },
                children: "Yükselt"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "subscribe-btn",
                onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  subscribe();
                }, "onClick"),
                style: { background: `linear-gradient(135deg, ${getTierColor(tierKey)}, ${getTierColor(tierKey)}dd)` },
                children: "Abone Ol"
              }
            ) })
          ]
        },
        tierKey
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-banner", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "info-icon", children: "ℹ️" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Premium abonelikler Stripe ile güvenli şekilde işlenir. İstediğiniz zaman iptal edebilirsiniz." })
    ] })
  ] }) });
}, "PremiumManagementPanel");
export {
  PremiumManagementPanel as default
};

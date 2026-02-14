var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import { a as axios } from "./index-BnLT0o6q.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const PremiumMarketplace = /* @__PURE__ */ __name(() => {
  const [plans, setPlans] = reactExports.useState([]);
  const [selectedPlan, setSelectedPlan] = reactExports.useState(null);
  const [billingCycle, setBillingCycle] = reactExports.useState("yearly");
  const [promotion, setPromotion] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    fetchPlans();
  }, []);
  const fetchPlans = /* @__PURE__ */ __name(async () => {
    try {
      const response = await axios.get("/api/premium/plans/");
      setPlans(response.data.plans);
      setPromotion(response.data.promotion);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch plans:", error);
      setLoading(false);
    }
  }, "fetchPlans");
  const handlePurchase = /* @__PURE__ */ __name(async (plan) => {
    setSelectedPlan(plan);
    try {
      const response = await axios.post("/api/premium/purchase/", {
        plan_id: plan.id,
        billing_cycle: billingCycle
      });
      if (response.data.checkout_url) {
        window.location.href = response.data.checkout_url;
        return;
      }
      toast.info(`📋 Purchasing ${plan.name} - ${billingCycle} plan`);
    } catch (error) {
      console.error("Purchase failed:", error);
      toast.error("❌ Purchase failed. Please try again.");
    }
  }, "handlePurchase");
  const calculateSavings = /* @__PURE__ */ __name((plan) => {
    const monthlyTotal = plan.monthly_price * 12;
    const yearlyPrice = plan.yearly_price;
    const savings = monthlyTotal - yearlyPrice;
    const percentage = Math.round(savings / monthlyTotal * 100);
    return { amount: savings.toFixed(2), percentage };
  }, "calculateSavings");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading premium plans..." });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-marketplace", children: [
    promotion && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "promotion-banner", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: promotion.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "🔥 Save ",
        promotion.discount_percent,
        "% on all plans!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "promotion-ends", children: [
        "Ends: ",
        new Date(promotion.ends_at).toLocaleDateString()
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "billing-toggle", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: billingCycle === "monthly" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setBillingCycle("monthly"), "onClick"),
          children: "Monthly"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: billingCycle === "yearly" ? "active" : "",
          onClick: /* @__PURE__ */ __name(() => setBillingCycle("yearly"), "onClick"),
          children: [
            "Yearly ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "save-badge", children: "Save 17%" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "plans-grid", children: plans.map((plan, index) => {
      const savings = calculateSavings(plan);
      const price = billingCycle === "yearly" ? plan.yearly_price : plan.monthly_price;
      const originalPrice = plan.original_yearly_price || plan.original_monthly_price;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        PremiumPlanCard,
        {
          plan,
          price,
          originalPrice,
          billingCycle,
          savings,
          promotion,
          onPurchase: /* @__PURE__ */ __name(() => handlePurchase(plan), "onPurchase"),
          featured: index === 1
        },
        plan.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-faq", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Frequently Asked Questions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "faq-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Can I cancel anytime?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yes! Cancel anytime and keep your benefits until the end of the billing period." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "faq-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "What payment methods do you accept?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We accept all major credit cards, PayPal, and cryptocurrencies." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "faq-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Is there a free trial?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yes! 7-day free trial on all plans. No credit card required." })
      ] })
    ] })
  ] });
}, "PremiumMarketplace");
const PremiumPlanCard = /* @__PURE__ */ __name(({ plan, price, originalPrice, billingCycle, savings, promotion, onPurchase, featured }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `premium-plan-card ${featured ? "featured" : ""}`, children: [
    featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "featured-badge", children: "🌟 Most Popular" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "plan-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: plan.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "plan-price", children: [
        originalPrice && promotion && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "original-price", children: [
          "$",
          originalPrice
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "current-price", children: [
          "$",
          price,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "billing-period", children: [
            "/",
            billingCycle === "yearly" ? "year" : "month"
          ] })
        ] }),
        billingCycle === "yearly" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "savings-badge", children: [
          "💰 Save $",
          savings.amount,
          "/year (",
          savings.percentage,
          "% off)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "plan-features", children: plan.features.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "check", children: "✓" }),
      " ",
      feature
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "purchase-btn", onClick: onPurchase, children: featured ? "🚀 Upgrade Now" : "Get Started" }),
    billingCycle === "yearly" && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "monthly-equivalent", children: [
      "Just $",
      (price / 12).toFixed(2),
      "/month"
    ] })
  ] });
}, "PremiumPlanCard");
export {
  PremiumMarketplace as default
};

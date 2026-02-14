var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bC as FaGift, C as FaUser, ah as FaCrown } from "./icons-vendor-2VDeY8fW.js";
function GiftPremiumPanel({ apiBaseUrl, fetchWithAuth }) {
  const [recipientUsername, setRecipientUsername] = reactExports.useState("");
  const [duration, setDuration] = reactExports.useState("1");
  const [message, setMessage] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [giftMessage, setGiftMessage] = reactExports.useState("");
  const giftPremium = /* @__PURE__ */ __name(async () => {
    if (!recipientUsername.trim()) {
      setMessage("❌ Please enter recipient username");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/adv/gift-premium/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipient_username: recipientUsername,
          duration_months: parseInt(duration),
          gift_message: giftMessage || null
        })
      });
      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Premium gifted to ${recipientUsername}!`);
        setRecipientUsername("");
        setGiftMessage("");
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || "Failed to gift premium"}`);
      }
    } catch (err) {
      setMessage("❌ Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  }, "giftPremium");
  const plans = [
    { months: 1, price: 9.99, discount: 0 },
    { months: 3, price: 24.99, discount: 17 },
    { months: 6, price: 44.99, discount: 25 },
    { months: 12, price: 79.99, discount: 33 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gift-premium-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gift-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, {}),
        " Gift Premium"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Give the gift of premium features to someone special!" })
    ] }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gift-message-alert", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gift-form", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, {}),
          " Recipient"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "input-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Enter username",
              value: recipientUsername,
              onChange: /* @__PURE__ */ __name((e) => setRecipientUsername(e.target.value), "onChange"),
              className: "form-input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCrown, {}),
          " Duration"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "plans-grid", children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `plan-card ${duration === plan.months.toString() ? "selected" : ""}`,
            onClick: /* @__PURE__ */ __name(() => setDuration(plan.months.toString()), "onClick"),
            children: [
              plan.discount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "discount-badge", children: [
                plan.discount,
                "% OFF"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "plan-duration", children: [
                plan.months,
                " Month",
                plan.months > 1 ? "s" : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "plan-price", children: [
                "$",
                plan.price
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "plan-per-month", children: [
                "$",
                (plan.price / plan.months).toFixed(2),
                "/mo"
              ] })
            ]
          },
          plan.months
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "💌 Personal Message (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "Add a personal message to your gift...",
            value: giftMessage,
            onChange: /* @__PURE__ */ __name((e) => setGiftMessage(e.target.value), "onChange"),
            className: "message-textarea",
            rows: "4",
            maxLength: "500"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "char-count", children: [
          giftMessage.length,
          "/500"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "gift-btn",
          onClick: giftPremium,
          disabled: loading,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaGift, {}),
            " ",
            loading ? "Sending Gift..." : "Gift Premium"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "premium-features", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "✨ Premium Features Included" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "features-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "🎨" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-text", children: "Custom profile themes" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "📁" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-text", children: "100MB file uploads" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "😀" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-text", children: "Unlimited custom emojis" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "🎭" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-text", children: "Animated avatars" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "⚡" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-text", children: "Priority support" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "🏷️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-text", children: "Premium badge" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "info-box", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "ℹ️ How Gifting Works" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Recipient will receive a notification about your gift" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Premium features activate immediately" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your personal message will be included in the notification" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Gift subscriptions auto-renew for the recipient if they choose" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "You can track your gift history in your account settings" })
      ] })
    ] })
  ] });
}
__name(GiftPremiumPanel, "GiftPremiumPanel");
export {
  GiftPremiumPanel as default
};

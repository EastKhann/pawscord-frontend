var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as axios } from "./index-BnLT0o6q.js";
import { P as PRODUCTION_URL, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
function ReferralProgram({ user }) {
  const [referralCode, setReferralCode] = reactExports.useState("");
  const [referralCount, setReferralCount] = reactExports.useState(0);
  const [rewards, setRewards] = reactExports.useState([]);
  const [copied, setCopied] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (user) {
      loadReferralData();
    }
  }, [user]);
  const loadReferralData = /* @__PURE__ */ __name(async () => {
    try {
      const response = await axios.get("/api/user/profile/");
      setReferralCode(response.data.referral_code || generateCode());
      setReferralCount(response.data.referral_count || 0);
    } catch (error) {
      console.error("Failed to load referral data:", error);
    }
  }, "loadReferralData");
  const generateCode = /* @__PURE__ */ __name(() => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }, "generateCode");
  const copyReferralLink = /* @__PURE__ */ __name(() => {
    const link = `${PRODUCTION_URL}/join/${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }, "copyReferralLink");
  const shareOnTwitter = /* @__PURE__ */ __name(() => {
    const text = `Join me on Pawscord - a privacy-first Discord alternative! 🐾

No tracking. No ads. 100% open source.

Sign up with my link for 3 months free premium:`;
    const url = `${PRODUCTION_URL}/join/${referralCode}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
  }, "shareOnTwitter");
  const claimReward = /* @__PURE__ */ __name(async () => {
    try {
      const response = await axios.post("/api/referral/claim/");
      toast.success(`Reward claimed! You got ${response.data.reward}`);
      loadReferralData();
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to claim reward");
    }
  }, "claimReward");
  const getReferralTier = /* @__PURE__ */ __name(() => {
    if (referralCount >= 10) return "lifetime";
    if (referralCount >= 5) return "6months";
    if (referralCount >= 1) return "1month";
    return "none";
  }, "getReferralTier");
  const tier = getReferralTier();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "referral-program", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "referral-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🎁 Invite Friends, Get Rewards" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Share Pawscord and earn free premium for every friend who joins!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "referral-link-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Your Referral Link:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "link-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: `${PRODUCTION_URL}/join/${referralCode}`,
            readOnly: true,
            className: "referral-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copyReferralLink, className: "copy-btn", children: copied ? "✅ Copied!" : "📋 Copy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: shareOnTwitter, className: "share-btn twitter", children: "🐦 Share on Twitter" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "referral-stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", children: referralCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Friends Referred" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-value", children: tier === "lifetime" ? "∞" : tier === "6months" ? "6mo" : tier === "1month" ? "1mo" : "0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "stat-label", children: "Premium Earned" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rewards-tiers", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Reward Tiers:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `tier-item ${referralCount >= 1 ? "unlocked" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-icon", children: "🥉" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-title", children: "Bronze" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-reward", children: "1 Month Premium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-requirement", children: "1 Friend" })
          ] }),
          referralCount >= 1 && referralCount < 5 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: claimReward, className: "claim-btn", children: "Claim" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `tier-item ${referralCount >= 5 ? "unlocked" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-icon", children: "🥈" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-title", children: "Silver" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-reward", children: "6 Months Premium" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-requirement", children: "5 Friends" })
          ] }),
          referralCount >= 5 && referralCount < 10 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: claimReward, className: "claim-btn", children: "Claim" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `tier-item ${referralCount >= 10 ? "unlocked" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-icon", children: "🥇" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tier-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-title", children: "Gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-reward", children: "Lifetime Premium 🚀" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tier-requirement", children: "10 Friends" })
          ] }),
          referralCount >= 10 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: claimReward, className: "claim-btn", children: "Claim" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Your Progress:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "progress-fill",
          style: { width: `${Math.min(referralCount / 10 * 100, 100)}%` },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            referralCount,
            " / 10"
          ] })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "progress-hint", children: referralCount >= 10 ? "🎉 You unlocked Lifetime Premium!" : referralCount >= 5 ? `${10 - referralCount} more friends for Lifetime Premium!` : referralCount >= 1 ? `${5 - referralCount} more for 6 Months Premium!` : "Share your link to start earning rewards!" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "how-it-works", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "How It Works:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "📤 Share your unique referral link with friends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "✅ They sign up using your link" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "🎁 You automatically earn premium time!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "🔁 Keep sharing to unlock more rewards" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "social-share", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Share on:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "share-buttons", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${PRODUCTION_URL}/join/${referralCode}`, "_blank"), "onClick"),
            className: "share-btn facebook",
            children: "📘 Facebook"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => window.open(`https://www.reddit.com/submit?url=${PRODUCTION_URL}/join/${referralCode}&title=Check out Pawscord!`, "_blank"), "onClick"),
            className: "share-btn reddit",
            children: "🤖 Reddit"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => window.open(`https://wa.me/?text=Join me on Pawscord! ${PRODUCTION_URL}/join/${referralCode}`, "_blank"), "onClick"),
            className: "share-btn whatsapp",
            children: "💬 WhatsApp"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => window.open(`https://t.me/share/url?url=${PRODUCTION_URL}/join/${referralCode}&text=Check out Pawscord!`, "_blank"), "onClick"),
            className: "share-btn telegram",
            children: "✈️ Telegram"
          }
        )
      ] })
    ] })
  ] });
}
__name(ReferralProgram, "ReferralProgram");
export {
  ReferralProgram as default
};

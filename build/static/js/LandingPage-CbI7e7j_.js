var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as axios } from "./index-BnLT0o6q.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
function LandingPage() {
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [success, setSuccess] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const handleSubmit = /* @__PURE__ */ __name(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/waitlist/", { email });
      setSuccess(true);
      setEmail("");
      if (response.data.referral_code) {
        toast.success(`You're on the list! Share this link for VIP early access: pawscord.com/join/${response.data.referral_code}`, 5e3);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, "handleSubmit");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "landing-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "hero", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hero-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "hero-title", children: [
          "Discord Alternative That ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "highlight", children: "Respects Your Privacy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hero-subtitle", children: "Real-time chat, voice channels, 100MB uploads. No tracking. No ads. 100% open source." }),
        !success ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "waitlist-form", onSubmit: handleSubmit, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "email",
              placeholder: "Enter your email",
              value: email,
              onChange: /* @__PURE__ */ __name((e) => setEmail(e.target.value), "onChange"),
              required: true,
              className: "waitlist-input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "waitlist-btn", children: loading ? "Joining..." : "Join Waitlist" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "success-message", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎉 You're on the list!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We'll notify you when we launch on January 22." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "referral-hint", children: "Check your email for your VIP referral link!" })
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "launch-date", children: "🚀 Launching January 22, 2026 • Join 500+ beta testers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-image", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/static/images/hero-screenshot.png", alt: "Pawscord Interface" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "features", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "Why Pawscord?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "features-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "🔒" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Privacy First" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No data mining. No tracking. GDPR compliant. Your conversations stay yours." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "⚡" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Real-Time Chat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "WebSocket-powered instant messaging. Sub-second message delivery." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "🎤" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Voice Channels" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Crystal-clear WebRTC voice chat. Up to 4K quality for premium users." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "📁" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "100MB Uploads" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "4x larger than Discord. Share videos, presentations, anything." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "📱" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Cross-Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Web, Android APK, Windows EXE. iOS app coming February." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "feature-icon", children: "💎" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Premium Features" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Starting at $4.99/mo. Custom emojis, unlimited uploads, priority support." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "screenshots", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "section-title", children: "See It In Action" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "screenshots-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/static/images/screenshot-chat.png", alt: "Chat Interface" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/static/images/screenshot-voice.png", alt: "Voice Channels" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/static/images/screenshot-mobile.png", alt: "Mobile App" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "social-proof", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stats", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "500+" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Beta Testers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "279 KB" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bundle Size" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "99.9%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Uptime SLA" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "stat", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "100%" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Open Source" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Ready to Join?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Be part of the first 1,000 users. Get 3 months free premium." }),
      !success && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "waitlist-form", onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            placeholder: "Your email address",
            value: email,
            onChange: /* @__PURE__ */ __name((e) => setEmail(e.target.value), "onChange"),
            required: true,
            className: "waitlist-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "waitlist-btn", children: loading ? "Joining..." : "Get Early Access" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-links", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com/pawscord/pawscord", target: "_blank", rel: "noopener noreferrer", children: "GitHub" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/privacy", children: "Privacy Policy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/terms", children: "Terms of Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:hello@pawscord.com", children: "Contact" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "copyright", children: "© 2026 Pawscord. Built with ❤️ for privacy." })
    ] }) })
  ] });
}
__name(LandingPage, "LandingPage");
export {
  LandingPage as default
};

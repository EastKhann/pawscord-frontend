var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as useParams, b as useNavigate } from "./router-vendor-DrLUSS4j.js";
const EmailVerification = /* @__PURE__ */ __name(() => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = reactExports.useState("verifying");
  const [message, setMessage] = reactExports.useState("Verifying your email...");
  reactExports.useEffect(() => {
    verifyEmail();
  }, [token]);
  const verifyEmail = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch("/api/auth/verify-email/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token })
      });
      const data = await response.json();
      if (data.success) {
        setStatus("success");
        setMessage("Email verified successfully! Redirecting...");
        setTimeout(() => {
          navigate("/login");
        }, 3e3);
      } else {
        setStatus("error");
        setMessage(data.error || "Verification failed");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
      setMessage("An error occurred during verification");
    }
  }, "verifyEmail");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "email-verification", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "verification-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `status-icon ${status}`, children: [
      status === "verifying" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 6L9 17l-5-5", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }),
      status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "12", r: "10", strokeWidth: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M15 9l-6 6M9 9l6 6", strokeWidth: "2", strokeLinecap: "round" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: status === "success" ? "Email Verified!" : status === "error" ? "Verification Failed" : "Verifying Email" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: message }),
    status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "btn-primary",
        onClick: /* @__PURE__ */ __name(() => navigate("/login"), "onClick"),
        children: "Go to Login"
      }
    ),
    status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        className: "btn-secondary",
        onClick: /* @__PURE__ */ __name(() => navigate("/register"), "onClick"),
        children: "Back to Registration"
      }
    )
  ] }) });
}, "EmailVerification");
export {
  EmailVerification as default
};

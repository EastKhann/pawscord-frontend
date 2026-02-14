var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aA as FaGavel, x as FaTimesCircle, aZ as FaPaperPlane, aB as FaHistory, w as FaCheckCircle } from "./icons-vendor-2VDeY8fW.js";
function BanAppealsPanel({ apiBaseUrl, fetchWithAuth }) {
  const [appeals, setAppeals] = reactExports.useState([]);
  const [reason, setReason] = reactExports.useState("");
  const [details, setDetails] = reactExports.useState("");
  const [banInfo, setBanInfo] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  reactExports.useEffect(() => {
    loadAppeals();
    loadBanInfo();
  }, []);
  const loadAppeals = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ban-appeals/list/`);
      if (response.ok) {
        const data = await response.json();
        setAppeals(data.appeals || []);
      }
    } catch (err) {
      console.error("Error loading appeals:", err);
    } finally {
      setLoading(false);
    }
  }, "loadAppeals");
  const loadBanInfo = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/ban-appeals/status/`);
      if (response.ok) {
        const data = await response.json();
        setBanInfo(data);
      }
    } catch (err) {
      console.error("Error loading ban info:", err);
    }
  }, "loadBanInfo");
  const submitAppeal = /* @__PURE__ */ __name(async () => {
    if (!reason.trim()) {
      setMessage("❌ Please provide a reason");
      return;
    }
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/adv/ban-appeal/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason,
          details: details || null
        })
      });
      if (response.ok) {
        setMessage("✅ Appeal submitted successfully!");
        setReason("");
        setDetails("");
        loadAppeals();
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || "Failed to submit appeal"}`);
      }
    } catch (err) {
      setMessage("❌ Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  }, "submitAppeal");
  const getStatusBadge = /* @__PURE__ */ __name((status) => {
    const badges = {
      pending: { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}), color: "#faa61a", text: "Pending" },
      approved: { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}), color: "#43b581", text: "Approved" },
      rejected: { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimesCircle, {}), color: "#f04747", text: "Rejected" }
    };
    return badges[status] || badges.pending;
  }, "getStatusBadge");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-appeals-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "appeals-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaGavel, {}),
      " Ban Appeals"
    ] }) }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "appeal-message", children: message }),
    banInfo && banInfo.is_banned && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ban-info-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-warning", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimesCircle, { className: "warning-icon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "warning-text", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "You are currently banned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: banInfo.ban_reason || "No reason provided" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ban-meta", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Banned on: ",
            new Date(banInfo.banned_at).toLocaleDateString()
          ] }),
          banInfo.expires_at && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Expires: ",
            new Date(banInfo.expires_at).toLocaleDateString()
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "submit-appeal-section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {}),
        " Submit New Appeal"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appeal-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Reason for Appeal:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              placeholder: "Why should you be unbanned?",
              value: reason,
              onChange: /* @__PURE__ */ __name((e) => setReason(e.target.value), "onChange"),
              className: "form-input",
              maxLength: 200
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "char-count", children: [
            reason.length,
            "/200"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Additional Details (optional):" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              placeholder: "Provide any additional context or evidence...",
              value: details,
              onChange: /* @__PURE__ */ __name((e) => setDetails(e.target.value), "onChange"),
              className: "form-textarea",
              rows: 5,
              maxLength: 1e3
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "char-count", children: [
            details.length,
            "/1000"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "submit-btn",
            onClick: submitAppeal,
            disabled: loading || !reason.trim(),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {}),
              " Submit Appeal"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appeal-guidelines", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "📋 Guidelines:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Be honest and respectful in your appeal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Explain why you believe the ban was unfair or a mistake" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Provide evidence if available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Appeals are reviewed within 24-48 hours" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appeals-history", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
        " Your Appeals (",
        appeals.length,
        ")"
      ] }),
      loading && appeals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading", children: "Loading appeals..." }) : appeals.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-appeals", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaGavel, { className: "empty-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No appeals submitted yet" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "appeals-list", children: appeals.map((appeal, idx) => {
        const statusBadge = getStatusBadge(appeal.status);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `appeal-item status-${appeal.status}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appeal-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "appeal-date", children: new Date(appeal.created_at).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appeal-status", style: { background: statusBadge.color }, children: [
              statusBadge.icon,
              " ",
              statusBadge.text
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appeal-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appeal-reason", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Reason:" }),
              " ",
              appeal.reason
            ] }),
            appeal.details && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "appeal-details", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Details:" }),
              " ",
              appeal.details
            ] })
          ] }),
          appeal.admin_response && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "admin-response", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Admin Response:" }),
            " ",
            appeal.admin_response,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "response-date", children: [
              "Reviewed: ",
              new Date(appeal.reviewed_at).toLocaleString()
            ] })
          ] })
        ] }, idx);
      }) })
    ] })
  ] });
}
__name(BanAppealsPanel, "BanAppealsPanel");
export {
  BanAppealsPanel as default
};

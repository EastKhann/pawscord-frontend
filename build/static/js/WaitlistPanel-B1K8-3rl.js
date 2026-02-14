var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { u as FaUsers, a as FaTimes, j as FaLink, w as FaCheckCircle } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const WaitlistPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [waitlist, setWaitlist] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [referralCode, setReferralCode] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetchWaitlist();
  }, []);
  const fetchWaitlist = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverId}/waitlist/`);
      const data = await response.json();
      setWaitlist(data.entries || []);
      setReferralCode(data.referral_code || "");
    } catch (error) {
      toast.error("Failed to load waitlist");
    } finally {
      setLoading(false);
    }
  }, "fetchWaitlist");
  const approveEntry = /* @__PURE__ */ __name(async (entryId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/waitlist/${entryId}/approve/`, {
        method: "POST"
      });
      toast.success("Waitlist entry approved");
      fetchWaitlist();
    } catch (error) {
      toast.error("Failed to approve entry");
    }
  }, "approveEntry");
  const rejectEntry = /* @__PURE__ */ __name(async (entryId) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/waitlist/${entryId}/reject/`, {
        method: "POST"
      });
      toast.success("Waitlist entry rejected");
      fetchWaitlist();
    } catch (error) {
      toast.error("Failed to reject entry");
    }
  }, "rejectEntry");
  const copyReferralCode = /* @__PURE__ */ __name(() => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard");
  }, "copyReferralCode");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Server Waitlist" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    referralCode && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.referralSection, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.referralLabel, children: "Your Referral Code" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.referralCode, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: referralCode }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: copyReferralCode, style: styles.copyButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.referralHint, children: "Share this code with others to move up in the waitlist" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading waitlist..." }) : waitlist.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No waitlist entries" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.entriesList, children: waitlist.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.entryCard, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.entryInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.entryHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.entryPosition, children: [
            "#",
            entry.position
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.entryEmail, children: entry.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.entryMeta, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Joined: ",
            new Date(entry.created_at).toLocaleDateString()
          ] }),
          entry.referrals_count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: " • " }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.referralsCount, children: [
              entry.referrals_count,
              " referral",
              entry.referrals_count !== 1 ? "s" : ""
            ] })
          ] })
        ] }),
        entry.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.approvedBadge, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, {}),
          " Approved"
        ] }),
        entry.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.rejectedBadge, children: "Rejected" })
      ] }),
      entry.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.entryActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => approveEntry(entry.id), "onClick"), style: styles.approveButton, children: "Approve" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => rejectEntry(entry.id), "onClick"), style: styles.rejectButton, children: "Reject" })
      ] })
    ] }, idx)) }) })
  ] }) });
}, "WaitlistPanel");
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
    zIndex: 999999
  },
  modal: {
    backgroundColor: "#1e1e1e",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "700px",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #2c2f33"
  },
  headerLeft: {
    display: "flex",
    alignItems: "center"
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#ffffff"
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#99aab5",
    cursor: "pointer",
    fontSize: "20px",
    padding: "5px"
  },
  referralSection: {
    padding: "20px",
    borderBottom: "1px solid #2c2f33",
    backgroundColor: "#2c2f33"
  },
  referralLabel: {
    fontSize: "13px",
    color: "#dcddde",
    marginBottom: "8px"
  },
  referralCode: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px"
  },
  copyButton: {
    padding: "8px 12px",
    backgroundColor: "#5865f2",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "14px"
  },
  referralHint: {
    fontSize: "12px",
    color: "#99aab5",
    fontStyle: "italic"
  },
  content: {
    padding: "20px",
    overflowY: "auto",
    flex: 1
  },
  loading: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  empty: {
    textAlign: "center",
    color: "#99aab5",
    padding: "40px"
  },
  entriesList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  entryCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  entryInfo: {
    flex: 1
  },
  entryHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px"
  },
  entryPosition: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#5865f2"
  },
  entryEmail: {
    fontSize: "14px",
    color: "#ffffff"
  },
  entryMeta: {
    fontSize: "12px",
    color: "#99aab5",
    marginBottom: "8px"
  },
  referralsCount: {
    color: "#43b581",
    fontWeight: "600"
  },
  approvedBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    backgroundColor: "#43b581",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#ffffff",
    fontWeight: "600"
  },
  rejectedBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    backgroundColor: "#f04747",
    borderRadius: "4px",
    fontSize: "12px",
    color: "#ffffff",
    fontWeight: "600"
  },
  entryActions: {
    display: "flex",
    gap: "8px"
  },
  approveButton: {
    padding: "8px 16px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600"
  },
  rejectButton: {
    padding: "8px 16px",
    backgroundColor: "#f04747",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600"
  }
};
export {
  WaitlistPanel as default
};

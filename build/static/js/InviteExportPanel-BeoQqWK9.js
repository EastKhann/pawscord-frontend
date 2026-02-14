var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a5 as FaDownload, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const InviteExportPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [invites, setInvites] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(false);
  const [includeExpired, setIncludeExpired] = reactExports.useState(false);
  const [includeRevoked, setIncludeRevoked] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchInvites();
  }, [includeExpired, includeRevoked]);
  const fetchInvites = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        include_expired: includeExpired,
        include_revoked: includeRevoked
      });
      const response = await fetchWithAuth(
        `${apiBaseUrl}/servers/${serverId}/invites/?${params}`
      );
      const data = await response.json();
      setInvites(data.invites || []);
    } catch (error) {
      toast.error("Failed to load invites");
    } finally {
      setLoading(false);
    }
  }, "fetchInvites");
  const exportCSV = /* @__PURE__ */ __name(() => {
    const csv = [
      ["Code", "Creator", "Uses", "Max Uses", "Created", "Expires", "Status"],
      ...invites.map((inv) => [
        inv.code,
        inv.creator_username,
        inv.uses,
        inv.max_uses || "Unlimited",
        new Date(inv.created_at).toLocaleString(),
        inv.expires_at ? new Date(inv.expires_at).toLocaleString() : "Never",
        inv.revoked ? "Revoked" : inv.is_expired ? "Expired" : "Active"
      ])
    ].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `server_invites_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success("Invites exported");
  }, "exportCSV");
  const exportJSON = /* @__PURE__ */ __name(() => {
    const json = JSON.stringify(invites, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `server_invites_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    toast.success("Invites exported");
  }, "exportJSON");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Export Invites" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.filters, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: includeExpired,
              onChange: /* @__PURE__ */ __name((e) => setIncludeExpired(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.checkboxLabel, children: "Include expired" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.checkbox, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "checkbox",
              checked: includeRevoked,
              onChange: /* @__PURE__ */ __name((e) => setIncludeRevoked(e.target.checked), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.checkboxLabel, children: "Include revoked" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.exportButtons, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportCSV, style: styles.exportButton, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "6px" } }),
          "Export CSV"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: exportJSON, style: { ...styles.exportButton, backgroundColor: "#5865f2" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "6px" } }),
          "Export JSON"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.content, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loading, children: "Loading invites..." }) : invites.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.empty, children: "No invites found" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.summary, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.summaryItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.summaryValue, children: invites.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.summaryLabel, children: "Total Invites" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.summaryItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.summaryValue, children: invites.filter((i) => !i.revoked && !i.is_expired).length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.summaryLabel, children: "Active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.summaryItem, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.summaryValue, children: invites.reduce((sum, i) => sum + i.uses, 0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.summaryLabel, children: "Total Uses" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.invitesList, children: invites.map((invite, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteCard, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.inviteCode, children: invite.code }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteDetails, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteDetail, children: [
            "Creator: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.inviteValue, children: invite.creator_username })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteDetail, children: [
            "Uses: ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.inviteValue, children: [
              invite.uses,
              "/",
              invite.max_uses || "∞"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inviteDetail, children: [
            "Created: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.inviteValue, children: new Date(invite.created_at).toLocaleDateString() })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.inviteStatus, children: invite.revoked ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.statusBadge, backgroundColor: "#f04747" }, children: "Revoked" }) : invite.is_expired ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.statusBadge, backgroundColor: "#99aab5" }, children: "Expired" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.statusBadge, backgroundColor: "#43b581" }, children: "Active" }) })
      ] }, idx)) })
    ] }) })
  ] }) });
}, "InviteExportPanel");
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
    maxWidth: "900px",
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
  toolbar: {
    padding: "15px 20px",
    borderBottom: "1px solid #2c2f33",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  filters: {
    display: "flex",
    gap: "16px"
  },
  checkbox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  },
  checkboxLabel: {
    fontSize: "13px",
    color: "#dcddde"
  },
  exportButtons: {
    display: "flex",
    gap: "8px"
  },
  exportButton: {
    padding: "8px 16px",
    backgroundColor: "#43b581",
    border: "none",
    borderRadius: "4px",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center"
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
  summary: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "24px"
  },
  summaryItem: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center"
  },
  summaryValue: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#5865f2",
    marginBottom: "8px"
  },
  summaryLabel: {
    fontSize: "13px",
    color: "#99aab5"
  },
  invitesList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  inviteCard: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    gap: "16px",
    alignItems: "center"
  },
  inviteCode: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "monospace",
    minWidth: "120px"
  },
  inviteDetails: {
    flex: 1,
    display: "flex",
    gap: "20px"
  },
  inviteDetail: {
    fontSize: "13px",
    color: "#99aab5"
  },
  inviteValue: {
    color: "#dcddde",
    fontWeight: "500"
  },
  inviteStatus: {
    minWidth: "80px",
    textAlign: "right"
  },
  statusBadge: {
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#ffffff"
  }
};
export {
  InviteExportPanel as default
};

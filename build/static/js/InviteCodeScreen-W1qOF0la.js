var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
function InviteCodeScreen({ inviteCode, fetchWithAuth, onClose, apiBaseUrl }) {
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [inviteInfo, setInviteInfo] = reactExports.useState(null);
  const [joining, setJoining] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadInviteInfo();
  }, [inviteCode]);
  const loadInviteInfo = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${apiBaseUrl}/invites/${inviteCode}/`);
      if (!response.ok) {
        const data2 = await response.json().catch(() => ({}));
        throw new Error(data2.error || "Davet bulunamadı veya süresi dolmuş");
      }
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Davet bulunamadı");
      }
      const data = await response.json();
      setInviteInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, "loadInviteInfo");
  const handleAccept = /* @__PURE__ */ __name(async () => {
    if (!inviteInfo) return;
    if (!fetchWithAuth) {
      toast.warning("🔐 Sunucuya katılmak için giriş yapmalısınız!");
      sessionStorage.setItem("pending_invite", inviteCode);
      window.location.hash = "#/";
      return;
    }
    try {
      setJoining(true);
      const isVanity = inviteInfo?.type === "vanity";
      const url = isVanity ? `${apiBaseUrl}/servers/${inviteInfo.server.id}/join/` : `${apiBaseUrl}/invites/${inviteCode}/accept/`;
      const response = await fetchWithAuth(url, {
        method: "POST"
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok || data.success) {
        toast.success(`✅ ${data.server_name || data.message || "Sunucuya katıldınız!"}`);
        onClose();
      } else if (data.error && data.error.includes("zaten")) {
        toast.info("ℹ️ Zaten bu sunucudasınız!");
        onClose();
      } else {
        throw new Error(data.error || "Sunucuya katılınamadı");
      }
    } catch (err) {
      toast.error("❌ " + err.message);
    } finally {
      setJoining(false);
    }
  }, "handleAccept");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loadingSpinner }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.loadingText, children: "Davet bilgileri yükleniyor..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.errorIcon, children: "❌" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.errorTitle, children: "Davet Bulunamadı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.errorText, children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: "Ana Sayfaya Dön" })
    ] }) });
  }
  const server = inviteInfo?.server;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.serverIconContainer, children: server?.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: server.icon, alt: server?.name, style: styles.serverIcon }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.serverIconPlaceholder, children: server?.name?.charAt(0)?.toUpperCase() || "?" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.invitedBy, children: [
      inviteInfo?.inviter?.username || "Birisi",
      " seni davet ediyor:"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.serverName, children: server?.name || "Bilinmeyen Sunucu" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.memberInfo, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.memberCount, children: [
      "👥 ",
      server?.member_count || 0,
      " üye"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: handleAccept,
        disabled: joining,
        style: {
          ...styles.joinButton,
          opacity: joining ? 0.7 : 1
        },
        children: joining ? "⏳ Katılınıyor..." : "✅ Sunucuya Katıl"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.backButton, children: "← Geri Dön" })
  ] }) });
}
__name(InviteCodeScreen, "InviteCodeScreen");
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    padding: "20px"
  },
  card: {
    background: "#2b2d31",
    borderRadius: "16px",
    padding: "40px",
    maxWidth: "440px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
  },
  serverIconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  serverIcon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #5865f2"
  },
  serverIconPlaceholder: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "36px",
    fontWeight: "bold",
    color: "#fff"
  },
  invitedBy: {
    color: "#b5bac1",
    fontSize: "14px",
    marginBottom: "8px"
  },
  serverName: {
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "12px"
  },
  memberInfo: {
    marginBottom: "24px"
  },
  memberCount: {
    color: "#b5bac1",
    fontSize: "14px"
  },
  joinButton: {
    width: "100%",
    padding: "14px",
    background: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
    marginBottom: "12px"
  },
  backButton: {
    width: "100%",
    padding: "10px",
    background: "transparent",
    color: "#b5bac1",
    border: "1px solid #4e5058",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer"
  },
  loadingSpinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #4e5058",
    borderTop: "3px solid #5865f2",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 16px"
  },
  loadingText: {
    color: "#b5bac1",
    fontSize: "16px"
  },
  errorIcon: {
    fontSize: "48px",
    marginBottom: "16px"
  },
  errorTitle: {
    color: "#fff",
    fontSize: "20px",
    marginBottom: "8px"
  },
  errorText: {
    color: "#b5bac1",
    fontSize: "14px",
    marginBottom: "20px"
  },
  closeButton: {
    padding: "12px 24px",
    background: "#4e5058",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer"
  }
};
export {
  InviteCodeScreen as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
function VanityInviteScreen({ vanityPath, fetchWithAuth, onClose, apiBaseUrl }) {
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [serverInfo, setServerInfo] = reactExports.useState(null);
  const [joining, setJoining] = reactExports.useState(false);
  reactExports.useEffect(() => {
    loadServerInfo();
  }, [vanityPath]);
  const loadServerInfo = /* @__PURE__ */ __name(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBaseUrl}/vanity/${vanityPath}/`);
      if (!response.ok) {
        throw new Error("Sunucu bulunamadı");
      }
      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        throw new Error("Sunucu bulunamadı");
      }
      const data = await response.json();
      setServerInfo(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, "loadServerInfo");
  const handleJoin = /* @__PURE__ */ __name(async () => {
    if (!serverInfo) return;
    if (!fetchWithAuth) {
      y.warning("🔐 Sunucuya katılmak için giriş yapmalısınız!");
      window.location.hash = "#/";
      return;
    }
    try {
      setJoining(true);
      const response = await fetchWithAuth(`${apiBaseUrl}/servers/${serverInfo.server_id}/join/`, {
        method: "POST"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.message || "Sunucuya katılınamadı";
        throw new Error(errorMessage);
      }
      y.success(`✅ ${serverInfo.server_name} sunucusuna katıldınız!`);
      if (onClose) onClose();
      else window.location.hash = "#/";
    } catch (err) {
      if (err.message.includes("zaten")) {
        y.info("ℹ️ Zaten bu sunucudasınız!");
      } else {
        y.error("❌ " + err.message);
      }
    } finally {
      setJoining(false);
    }
  }, "handleJoin");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loadingSpinner, children: "🔄" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.loadingText, children: "Sunucu bilgileri yükleniyor..." })
    ] }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: styles.errorTitle, children: "❌ Sunucu Bulunamadı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.errorText, children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          style: styles.backButton,
          onClick: /* @__PURE__ */ __name(() => {
            if (onClose) onClose();
            else window.location.hash = "#/";
          }, "onClick"),
          children: "Ana Sayfaya Dön"
        }
      )
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.container, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.avatarContainer, children: serverInfo.server_avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: serverInfo.server_avatar,
        alt: serverInfo.server_name,
        style: styles.avatar
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.defaultAvatar, children: serverInfo.server_name.charAt(0).toUpperCase() }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: styles.serverName, children: serverInfo.server_name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.inviteText, children: [
      "seni ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: serverInfo.server_name }),
      " sunucusuna davet etti"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statsContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stat, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.onlineDot, children: "●" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.statText, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: serverInfo.online_count }),
          " Çevrimiçi"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.stat, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.memberDot, children: "●" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.statText, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: serverInfo.member_count }),
          " Üye"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        style: {
          ...styles.joinButton,
          ...joining ? styles.joinButtonDisabled : {}
        },
        onClick: handleJoin,
        disabled: joining,
        children: joining ? "Katılınıyor..." : `${serverInfo.server_name} Sunucusuna Katıl`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { style: styles.vanityInfo, children: [
      "pawscord.com/join/",
      serverInfo.vanity_path
    ] })
  ] }) });
}
__name(VanityInviteScreen, "VanityInviteScreen");
const styles = {
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
    overflow: "auto"
  },
  card: {
    backgroundColor: "#36393f",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "450px",
    width: "100%",
    textAlign: "center",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)"
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #5865f2"
  },
  defaultAvatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    fontWeight: "bold",
    color: "#fff",
    border: "4px solid #4752c4"
  },
  serverName: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "10px"
  },
  inviteText: {
    fontSize: "16px",
    color: "#b9bbbe",
    marginBottom: "25px"
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "30px",
    padding: "15px",
    backgroundColor: "#2f3136",
    borderRadius: "8px"
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  onlineDot: {
    color: "#3ba55d",
    fontSize: "12px"
  },
  memberDot: {
    color: "#747f8d",
    fontSize: "12px"
  },
  statText: {
    color: "#b9bbbe",
    fontSize: "14px"
  },
  joinButton: {
    width: "100%",
    padding: "15px",
    backgroundColor: "#5865f2",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s",
    marginBottom: "15px"
  },
  joinButtonDisabled: {
    backgroundColor: "#4752c4",
    cursor: "not-allowed",
    opacity: 0.6
  },
  vanityInfo: {
    fontSize: "12px",
    color: "#72767d",
    marginTop: "10px"
  },
  loadingSpinner: {
    fontSize: "48px",
    marginBottom: "20px",
    animation: "spin 1s linear infinite"
  },
  loadingText: {
    color: "#b9bbbe",
    fontSize: "16px"
  },
  errorTitle: {
    fontSize: "24px",
    color: "#ed4245",
    marginBottom: "15px"
  },
  errorText: {
    color: "#b9bbbe",
    marginBottom: "20px"
  },
  backButton: {
    padding: "12px 24px",
    backgroundColor: "#4f545c",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer"
  }
};
export {
  VanityInviteScreen as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a1 as FaShieldAlt, ax as FaGlobe, aX as FaTablet, ae as FaMobile, af as FaDesktop, cl as FaSafari, cm as FaEdge, cn as FaFirefox, co as FaChrome, d as FaExclamationTriangle, a9 as FaCheck, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
const DEVICE_ICONS = {
  desktop: FaDesktop,
  mobile: FaMobile,
  tablet: FaTablet,
  unknown: FaGlobe
};
const BROWSER_ICONS = {
  chrome: FaChrome,
  firefox: FaFirefox,
  edge: FaEdge,
  safari: FaSafari
};
const LoginHistory = /* @__PURE__ */ __name(({ logins = [], onRevokeSession, onRevokeAll }) => {
  const [expanded, setExpanded] = reactExports.useState(null);
  const handleRevoke = reactExports.useCallback((sessionId) => {
    onRevokeSession?.(sessionId);
  }, [onRevokeSession]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: { fontSize: 18, color: "#5865f2" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: S.title, children: "Giriş Geçmişi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.subtitle, children: "Son 30 gündeki giriş aktiviteleri" })
      ] }),
      logins.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", style: S.revokeAllBtn, onClick: onRevokeAll, children: "Tüm Oturumları Kapat" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.list, children: [
      logins.map((login, i) => {
        const DeviceIcon = DEVICE_ICONS[login.device] || DEVICE_ICONS.unknown;
        const BrowserIcon = BROWSER_ICONS[login.browser?.toLowerCase()] || FaGlobe;
        const isSuccess = login.success !== false;
        const isCurrent = login.current === true;
        const isExpanded = expanded === i;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            style: {
              ...S.loginItem,
              borderLeftColor: isSuccess ? isCurrent ? "#57f287" : "#5865f2" : "#ed4245"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  style: S.loginMain,
                  onClick: /* @__PURE__ */ __name(() => setExpanded(isExpanded ? null : i), "onClick"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                      ...S.deviceIcon,
                      backgroundColor: isSuccess ? "rgba(88,101,242,0.1)" : "rgba(237,66,69,0.1)"
                    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceIcon, { style: {
                      fontSize: 18,
                      color: isSuccess ? "#5865f2" : "#ed4245"
                    } }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.loginInfo, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.loginTitle, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.deviceName, children: login.os || "Bilinmeyen İşletim Sistemi" }),
                        isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.currentBadge, children: "Şu anki oturum" }),
                        !isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationTriangle, { style: { fontSize: 12, color: "#ed4245" } })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.loginMeta, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserIcon, { style: { fontSize: 10 } }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: login.browser || "Bilinmeyen tarayıcı" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: login.ip || "?.?.?.?" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: login.location || "Bilinmeyen konum" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.loginTime, children: login.timestamp ? new Date(login.timestamp).toLocaleString("tr-TR") : "Bilinmiyor" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.statusIcon, children: isSuccess ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { style: { color: "#57f287", fontSize: 14 } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { style: { color: "#ed4245", fontSize: 14 } }) })
                  ]
                }
              ),
              isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.details, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.detailRow, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.detailLabel, children: "IP Adresi" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.detailValue, children: login.ip || "Bilinmiyor" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.detailRow, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.detailLabel, children: "Konum" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.detailValue, children: login.location || "Bilinmiyor" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.detailRow, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.detailLabel, children: "Tarayıcı" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.detailValue, children: [
                    login.browser || "Bilinmiyor",
                    " ",
                    login.browserVersion || ""
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.detailRow, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.detailLabel, children: "Durum" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
                    ...S.detailValue,
                    color: isSuccess ? "#57f287" : "#ed4245"
                  }, children: isSuccess ? "Başarılı" : "Başarısız" })
                ] }),
                !isCurrent && isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    style: S.revokeBtn,
                    onClick: /* @__PURE__ */ __name(() => handleRevoke(login.id), "onClick"),
                    children: "Oturumu Kapat"
                  }
                )
              ] })
            ]
          },
          login.id || i
        );
      }),
      logins.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.empty, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaShieldAlt, { style: { fontSize: 24, color: "#4e5058" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Giriş geçmişi bulunamadı" })
      ] })
    ] })
  ] });
}, "LoginHistory");
const S = {
  container: { padding: 16 },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20
  },
  title: { fontSize: 16, fontWeight: 700, color: "#f2f3f5", margin: 0 },
  subtitle: { fontSize: 12, color: "#b5bac1", display: "block" },
  revokeAllBtn: {
    padding: "6px 14px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "#ed4245",
    color: "#fff",
    fontSize: 12,
    fontWeight: 500,
    cursor: "pointer"
  },
  list: { display: "flex", flexDirection: "column", gap: 6 },
  loginItem: {
    backgroundColor: "#2b2d31",
    borderRadius: 8,
    borderLeft: "3px solid",
    overflow: "hidden"
  },
  loginMain: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    cursor: "pointer"
  },
  deviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  loginInfo: { flex: 1, minWidth: 0 },
  loginTitle: {
    display: "flex",
    alignItems: "center",
    gap: 6
  },
  deviceName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#f2f3f5"
  },
  currentBadge: {
    fontSize: 10,
    fontWeight: 600,
    color: "#57f287",
    backgroundColor: "rgba(87,242,135,0.1)",
    padding: "1px 6px",
    borderRadius: 4
  },
  loginMeta: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#4e5058",
    marginTop: 2
  },
  loginTime: {
    fontSize: 11,
    color: "#4e5058",
    marginTop: 2,
    display: "block"
  },
  statusIcon: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0
  },
  details: {
    padding: "0 14px 14px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
    display: "flex",
    flexDirection: "column",
    gap: 6,
    paddingTop: 12
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between"
  },
  detailLabel: { fontSize: 13, color: "#b5bac1" },
  detailValue: { fontSize: 13, color: "#dcddde", fontWeight: 500 },
  revokeBtn: {
    marginTop: 8,
    padding: "6px 14px",
    borderRadius: 4,
    border: "none",
    backgroundColor: "rgba(237,66,69,0.1)",
    color: "#ed4245",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    alignSelf: "flex-start"
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    padding: 40,
    color: "#4e5058",
    fontSize: 14
  }
};
const LoginHistory_default = reactExports.memo(LoginHistory);
export {
  LoginHistory_default as default
};

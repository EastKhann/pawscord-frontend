var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a4 as FaBars, a5 as FaDownload, u as FaUsers, a6 as FaUserFriends, a7 as FaCompass, a8 as FaGamepad, r as FaMagic, a9 as FaCheck } from "./icons-vendor-2VDeY8fW.js";
import DownloadModal from "./DownloadModal-BmcJJ7ja.js";
import { C as Capacitor, g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const WelcomeScreen = /* @__PURE__ */ __name(({
  isMobile,
  onOpenMenu,
  onOpenRightMenu,
  // App.js'den gelen veriler:
  updateAvailable,
  isDownloading,
  downloadProgress,
  updateStatusText,
  onStartUpdate,
  // 🔥 YENİ: Navigasyon Fonksiyonları
  onSwitchToFriends,
  onSwitchToAI,
  onSwitchToCinema
}) => {
  const [showDownload, setShowDownload] = reactExports.useState(false);
  const isNativeApp = Capacitor.isNativePlatform();
  const isElectron = typeof window !== "undefined" && typeof window.require === "function";
  const shouldShowDownloadBtn = !isNativeApp && !isElectron;
  const getGreeting = /* @__PURE__ */ __name(() => {
    const hour = (/* @__PURE__ */ new Date()).getHours();
    if (hour >= 5 && hour < 12) return "Günaydın!";
    if (hour >= 12 && hour < 18) return "Tünaydın!";
    if (hour >= 18 && hour < 22) return "İyi Akşamlar!";
    return "İyi Geceler!";
  }, "getGreeting");
  const API_BASE_URL = getApiBase();
  const UpdateButtonComponent = /* @__PURE__ */ __name(() => {
    if (!updateAvailable) return null;
    if (isDownloading) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerProgressContainer, title: updateStatusText, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.headerProgressBarFill, width: `${downloadProgress}%` } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.headerProgressText, children: downloadProgress < 100 ? `%${downloadProgress}` : /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, {}) })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onStartUpdate,
        style: styles.headerUpdateBtn,
        title: "Yeni Güncelleme Mevcut! (Tıkla & Kur)",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { marginLeft: "5px", fontSize: "12px" }, children: "GÜNCELLE" })
        ]
      }
    );
  }, "UpdateButtonComponent");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    showDownload && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DownloadModal,
      {
        onClose: /* @__PURE__ */ __name(() => setShowDownload(false), "onClose"),
        apiBaseUrl: API_BASE_URL
      }
    ),
    isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.mobileHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenMenu, style: styles.menuButton, title: "Menüyü Aç", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaBars, { size: 22 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.headerTitle, children: "Pawscord" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "5px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UpdateButtonComponent, {}),
        shouldShowDownloadBtn && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setShowDownload(true), "onClick"), style: { ...styles.menuButton, padding: "6px" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onOpenRightMenu, style: styles.menuButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { size: 22 }) })
      ] })
    ] }),
    !isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.desktopTopRight, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UpdateButtonComponent, {}),
      shouldShowDownloadBtn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setShowDownload(true), "onClick"),
          style: styles.desktopDownloadBtn,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: "8px" } }),
            " İndir"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      ...styles.scrollContent,
      // Reduce top padding so content sits higher on both mobile and desktop
      paddingTop: isMobile ? "calc(60px + env(safe-area-inset-top))" : "20px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.heroSection, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: "https://media.pawscord.com/assets/logo.png",
            alt: "Logo",
            style: isMobile ? styles.logoMobile : styles.logo,
            onError: /* @__PURE__ */ __name((e) => {
              e.target.style.display = "none";
            }, "onError")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { style: isMobile ? styles.titleMobile : styles.title, children: getGreeting() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.subtitle, children: "Arkadaşlarınla sohbet etmeye, oyun oynamaya ve topluluklara katılmaya hazır mısın?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.cardsGrid, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, onClick: onSwitchToFriends, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.iconBox, background: "rgba(88, 101, 242, 0.15)", color: "#5865f2" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUserFriends, { size: isMobile ? 20 : 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.cardTitle, children: "Arkadaşların" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.cardDesc, children: "Arkadaş listene git ve sohbet etmeye başla." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, onClick: onOpenMenu, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.iconBox, background: "rgba(35, 165, 89, 0.15)", color: "#23a559" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCompass, { size: isMobile ? 20 : 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.cardTitle, children: "Sunucular" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.cardDesc, children: "Menüyü aç ve topluluklarına göz at." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, onClick: onSwitchToCinema, children: [
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.iconBox, background: "rgba(240, 178, 50, 0.15)", color: "#f0b232" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, { size: isMobile ? 20 : 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.cardTitle, children: "Aktiviteler" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.cardDesc, children: "Birlikte video izle, müzik dinle veya oyun oyna." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.card, onClick: onSwitchToAI, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.iconBox, background: "rgba(235, 69, 158, 0.15)", color: "#eb459e" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMagic, { size: isMobile ? 20 : 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.cardTitle, children: "Yapay Zeka" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.cardDesc, children: "PawPaw AI ile sohbet ederek sorularına cevap bul." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.footer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "© 2025 Pawscord" }) })
    ] })
  ] });
}, "WelcomeScreen");
const styles = {
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#313338",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden"
  },
  mobileHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#2b2d31",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px",
    boxSizing: "border-box",
    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
    zIndex: 50,
    borderBottom: "1px solid #1f2023",
    paddingTop: "env(safe-area-inset-top)",
    height: "calc(55px + env(safe-area-inset-top))"
  },
  menuButton: {
    background: "none",
    border: "none",
    color: "#dbdee1",
    cursor: "pointer",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: "1.1em",
    letterSpacing: "1px",
    color: "#fff"
  },
  desktopTopRight: {
    position: "absolute",
    top: "20px",
    right: "20px",
    zIndex: 60,
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  headerUpdateBtn: {
    backgroundColor: "#f0b232",
    color: "#000",
    border: "none",
    padding: "6px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    animation: "pulse 2s infinite",
    boxShadow: "0 0 10px rgba(240, 178, 50, 0.4)"
  },
  headerProgressContainer: {
    width: "100px",
    height: "24px",
    backgroundColor: "#202225",
    borderRadius: "12px",
    position: "relative",
    overflow: "hidden",
    border: "1px solid #f0b232",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  headerProgressBarFill: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    backgroundColor: "#f0b232",
    transition: "width 0.2s ease"
  },
  headerProgressText: {
    position: "relative",
    zIndex: 2,
    fontSize: "11px",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "0 1px 2px black"
  },
  desktopDownloadBtn: {
    backgroundColor: "#23a559",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.2s"
  },
  scrollContent: { flex: 1, overflowY: "auto", overflowX: "hidden", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center", boxSizing: "border-box", WebkitOverflowScrolling: "touch" },
  heroSection: { textAlign: "center", marginBottom: "30px", maxWidth: "600px", animation: "fadeIn 0.8s ease-out", display: "flex", flexDirection: "column", alignItems: "center", width: "100%" },
  logo: { width: "100px", height: "100px", marginBottom: "15px", filter: "drop-shadow(0 0 15px rgba(88, 101, 242, 0.4))" },
  logoMobile: { width: "80px", height: "80px", marginBottom: "10px", filter: "drop-shadow(0 0 15px rgba(88, 101, 242, 0.4))" },
  title: { fontSize: "2.2em", fontWeight: "800", marginBottom: "5px", background: "linear-gradient(90deg, #5865f2, #9b59b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 },
  titleMobile: { fontSize: "1.8em", fontWeight: "800", marginBottom: "5px", background: "linear-gradient(90deg, #5865f2, #9b59b6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: 0 },
  subtitle: { color: "#b5bac1", fontSize: "0.95em", lineHeight: "1.4", marginTop: "10px" },
  cardsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", width: "100%", maxWidth: "500px", marginBottom: "20px" },
  // 🔥 GÜNCELLEME: Card stiline cursor pointer eklendi
  card: { backgroundColor: "#2b2d31", padding: "15px", borderRadius: "16px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", boxShadow: "0 4px 8px rgba(0,0,0,0.15)", border: "1px solid #232428", minHeight: "140px", cursor: "pointer", transition: "transform 0.1s" },
  iconBox: { width: "45px", height: "45px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" },
  cardTitle: { margin: "0 0 5px 0", fontSize: "0.95em", color: "#dbdee1", fontWeight: "600" },
  cardDesc: { margin: 0, fontSize: "0.75em", color: "#949ba4", lineHeight: "1.3" },
  footer: { marginTop: "auto", color: "#5e6064", fontSize: "0.75em", textAlign: "center", paddingTop: "20px" }
};
const styleSheet = document.createElement("style");
styleSheet.innerText = `@keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } } @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .card:active { transform: scale(0.98); }`;
document.head.appendChild(styleSheet);
const WelcomeScreen_default = React.memo(WelcomeScreen);
export {
  WelcomeScreen_default as default
};

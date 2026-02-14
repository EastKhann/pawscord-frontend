var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, aQ as FaWindows, a5 as FaDownload, aR as FaAndroid, aS as FaApple, aT as FaInfoCircle } from "./icons-vendor-2VDeY8fW.js";
import { C as Capacitor } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const DownloadModal = /* @__PURE__ */ __name(({ onClose, apiBaseUrl }) => {
  const isNativeApp = Capacitor.isNativePlatform();
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const handleDownload = /* @__PURE__ */ __name((platform) => {
    if (platform === "windows") {
      window.location.href = "https://media.pawscord.com/builds/Pawscord-Setup.exe";
    } else if (platform === "android") {
      if (isNativeApp) {
        window.open("https://media.pawscord.com/builds/Pawscord.apk", "_system");
      } else {
        window.location.href = "https://media.pawscord.com/builds/Pawscord.apk";
      }
    }
  }, "handleDownload");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Pawscord'u İndir" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.subtitle, children: "Cihazına uygun sürümü seç ve topluluğa tam gaz katıl!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.grid, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.card, borderBottom: "4px solid #00a8fc" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaWindows, { size: 40, color: "#00a8fc", style: { marginBottom: 15 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.platformName, children: "Windows" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.versionInfo, children: "Windows 10/11 (64-bit)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => handleDownload("windows"), "onClick"), style: { ...styles.downloadBtn, backgroundColor: "#00a8fc" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: 8 } }),
          " İndir (.exe)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.card, borderBottom: "4px solid #3ddc84" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaAndroid, { size: 40, color: "#3ddc84", style: { marginBottom: 15 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.platformName, children: "Android" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.versionInfo, children: "APK Dosyası" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => handleDownload("android"), "onClick"), style: { ...styles.downloadBtn, backgroundColor: "#3ddc84", color: "#000" }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, { style: { marginRight: 8 } }),
          " İndir (.apk)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { ...styles.card, borderBottom: "4px solid #999", opacity: 0.7 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaApple, { size: 40, color: "#fff", style: { marginBottom: 15 } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.platformName, children: "iOS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.versionInfo, children: "iPhone & iPad" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: true, style: styles.disabledBtn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaInfoCircle, { style: { marginRight: 8 } }),
          " Henüz Erişilemez"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.footer, children: 'Not: APK dosyasını yüklerken "Bilinmeyen Kaynaklar" izni vermeniz gerekebilir.' })
  ] }) });
}, "DownloadModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(5px)",
    zIndex: 2e3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box"
  },
  modal: {
    backgroundColor: "#1e1f22",
    width: "100%",
    maxWidth: "800px",
    borderRadius: "16px",
    padding: "30px",
    position: "relative",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    border: "1px solid #2b2d31",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // 🔥🔥🔥 DÜZELTME BURADA 🔥🔥🔥
    maxHeight: "90vh",
    // Ekranın %90'ından uzun olmasın
    overflowY: "auto",
    // İçerik taşarsa kaydırma çubuğu çıksın
    WebkitOverflowScrolling: "touch"
    // iOS için akıcı kaydırma
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    flexShrink: 0
    // Header kaybolmasın, sıkışmasın
  },
  title: { margin: 0, color: "white", fontSize: "1.8em" },
  closeBtn: { background: "none", border: "none", color: "#b9bbbe", fontSize: "1.5em", cursor: "pointer" },
  subtitle: { color: "#b9bbbe", textAlign: "center", marginBottom: "30px", fontSize: "1.1em", flexShrink: 0 },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    width: "100%",
    // Mobilde grid'in aşağıya taşmasını engellemek için esneklik verelim
    flexGrow: 1
  },
  card: {
    backgroundColor: "#2b2d31",
    padding: "25px",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    transition: "transform 0.2s"
  },
  platformName: { color: "white", margin: "0 0 5px 0", fontSize: "1.4em" },
  versionInfo: { color: "#949ba4", fontSize: "0.85em", marginBottom: "20px" },
  downloadBtn: {
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.2s"
  },
  disabledBtn: {
    width: "100%",
    padding: "10px",
    border: "1px solid #4f545c",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "#949ba4",
    fontSize: "0.9em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "not-allowed"
  },
  footer: { marginTop: "30px", color: "#5e6064", fontSize: "0.8em", textAlign: "center", flexShrink: 0 }
};
export {
  DownloadModal as default
};

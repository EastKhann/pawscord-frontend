var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { af as FaDesktop, cq as FaCompress, b2 as FaExpand, a as FaTimes, D as FaStop } from "./icons-vendor-2VDeY8fW.js";
const ScreenShareModal = /* @__PURE__ */ __name(({
  isOpen,
  onClose,
  onStopSharing,
  screenStream,
  isSharing,
  participants = []
}) => {
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [quality, setQuality] = reactExports.useState("1080p");
  const videoRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (videoRef.current && screenStream) {
      videoRef.current.srcObject = screenStream;
    }
  }, [screenStream]);
  const toggleFullscreen = /* @__PURE__ */ __name(async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error("Fullscreen failed:", error);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, "toggleFullscreen");
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: containerRef, style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, { style: styles.headerIcon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.title, children: "Ekran Paylaşımı" }),
        isSharing && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.badge, children: [
          "🔴 Paylaşılıyor (",
          participants.length,
          " izleyici)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleFullscreen,
            style: styles.headerButton,
            title: "Tam ekran",
            children: isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCompress, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaExpand, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onClose,
            style: styles.closeButton,
            title: "Kapat",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.videoContainer, children: screenStream ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        ref: videoRef,
        autoPlay: true,
        playsInline: true,
        style: styles.video
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.placeholder, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, { style: styles.placeholderIcon }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.placeholderText, children: "Ekran paylaşımı başlatılmadı" })
    ] }) }),
    isSharing && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.qualityBadge, children: [
      quality,
      " • ",
      screenStream?.getVideoTracks()[0]?.getSettings().frameRate || 30,
      " FPS"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.controls, children: isSharing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: onStopSharing,
        style: styles.stopButton,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaStop, { style: { marginRight: "8px" } }),
          "Paylaşımı Durdur"
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.info, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.infoText, children: "Ekran paylaşımı sona erdi" }) }) }),
    participants.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.participants, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.participantsTitle, children: "İzleyenler:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.participantList, children: participants.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.participant, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.participantAvatar, children: p.username?.[0]?.toUpperCase() || "U" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.participantName, children: p.username })
      ] }, i)) })
    ] })
  ] }) });
}, "ScreenShareModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    zIndex: 1e4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    width: "90%",
    maxWidth: "1200px",
    height: "90%",
    backgroundColor: "#1e1f22",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#2f3136",
    borderBottom: "1px solid #1e1f22"
  },
  headerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px"
  },
  headerIcon: {
    color: "#5865f2",
    fontSize: "20px"
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff"
  },
  badge: {
    fontSize: "13px",
    color: "#f04747",
    backgroundColor: "rgba(240, 71, 71, 0.1)",
    padding: "4px 12px",
    borderRadius: "12px"
  },
  headerActions: {
    display: "flex",
    gap: "8px"
  },
  headerButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#b9bbbe",
    fontSize: "18px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px"
  },
  closeButton: {
    backgroundColor: "#f04747",
    border: "none",
    color: "#fff",
    fontSize: "18px",
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "4px"
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  video: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    color: "#b9bbbe"
  },
  placeholderIcon: {
    fontSize: "64px",
    opacity: 0.5
  },
  placeholderText: {
    fontSize: "16px"
  },
  qualityBadge: {
    position: "absolute",
    top: "80px",
    right: "24px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: "bold"
  },
  controls: {
    padding: "24px",
    backgroundColor: "#2f3136",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  stopButton: {
    backgroundColor: "#f04747",
    color: "#fff",
    border: "none",
    padding: "12px 32px",
    borderRadius: "4px",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.2s"
  },
  info: {
    textAlign: "center"
  },
  infoText: {
    color: "#b9bbbe",
    fontSize: "14px"
  },
  participants: {
    position: "absolute",
    bottom: "100px",
    left: "24px",
    backgroundColor: "rgba(47, 49, 54, 0.9)",
    borderRadius: "8px",
    padding: "12px",
    maxWidth: "200px"
  },
  participantsTitle: {
    fontSize: "12px",
    color: "#b9bbbe",
    fontWeight: "bold",
    display: "block",
    marginBottom: "8px"
  },
  participantList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  participant: {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  participantAvatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff"
  },
  participantName: {
    fontSize: "13px",
    color: "#dcddde"
  }
};
export {
  ScreenShareModal as default
};

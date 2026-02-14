var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { az as FaCog, cq as FaCompress, b2 as FaExpand, a as FaTimes, bL as FaMicrophoneSlash, E as FaMicrophone, bb as FaVideo, bK as FaVideoSlash, cr as FaPhone } from "./icons-vendor-2VDeY8fW.js";
const formatDuration = /* @__PURE__ */ __name((seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}, "formatDuration");
function useVideoCall(isOpen, localStream, remoteStream) {
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [showSettings, setShowSettings] = reactExports.useState(false);
  const [selectedCamera, setSelectedCamera] = reactExports.useState("");
  const [selectedMicrophone, setSelectedMicrophone] = reactExports.useState("");
  const [devices, setDevices] = reactExports.useState({ cameras: [], microphones: [] });
  const [videoQuality, setVideoQuality] = reactExports.useState("720p");
  const localVideoRef = reactExports.useRef(null);
  const remoteVideoRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const deviceList = await navigator.mediaDevices.enumerateDevices();
        const cameras = deviceList.filter((d) => d.kind === "videoinput");
        const microphones = deviceList.filter((d) => d.kind === "audioinput");
        setDevices({ cameras, microphones });
        if (cameras.length > 0 && !selectedCamera) setSelectedCamera(cameras[0].deviceId);
        if (microphones.length > 0 && !selectedMicrophone) setSelectedMicrophone(microphones[0].deviceId);
      } catch (err) {
        console.error("Failed to enumerate devices:", err);
      }
    })();
  }, [isOpen]);
  reactExports.useEffect(() => {
    if (localVideoRef.current && localStream) localVideoRef.current.srcObject = localStream;
  }, [localStream]);
  reactExports.useEffect(() => {
    if (remoteVideoRef.current && remoteStream) remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteStream]);
  const toggleFullscreen = /* @__PURE__ */ __name(async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Fullscreen failed:", err);
      }
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, "toggleFullscreen");
  return {
    isFullscreen,
    showSettings,
    setShowSettings,
    selectedCamera,
    setSelectedCamera,
    selectedMicrophone,
    setSelectedMicrophone,
    devices,
    videoQuality,
    setVideoQuality,
    localVideoRef,
    remoteVideoRef,
    containerRef,
    toggleFullscreen
  };
}
__name(useVideoCall, "useVideoCall");
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
    width: "100%",
    height: "100%",
    backgroundColor: "#1e1f22",
    display: "flex",
    flexDirection: "column",
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
  headerInfo: { display: "flex", alignItems: "center", gap: "12px" },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#fff"
  },
  userInfo: { display: "flex", flexDirection: "column", gap: "4px" },
  username: { fontSize: "16px", fontWeight: "bold", color: "#fff" },
  status: { fontSize: "13px", color: "#b9bbbe" },
  headerActions: { display: "flex", gap: "8px" },
  headerButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "#b9bbbe",
    fontSize: "18px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    transition: "background-color 0.2s"
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
  settingsPanel: {
    position: "absolute",
    top: "70px",
    right: "24px",
    backgroundColor: "#2f3136",
    border: "1px solid #1e1f22",
    borderRadius: "8px",
    padding: "16px",
    width: "280px",
    zIndex: 100,
    boxShadow: "0 8px 16px rgba(0,0,0,0.4)"
  },
  settingsTitle: { fontSize: "14px", fontWeight: "bold", color: "#fff", marginBottom: "12px" },
  settingGroup: { marginBottom: "12px" },
  settingLabel: { display: "block", fontSize: "12px", color: "#b9bbbe", marginBottom: "6px" },
  settingSelect: {
    width: "100%",
    backgroundColor: "#40444b",
    border: "1px solid #1e1f22",
    borderRadius: "4px",
    padding: "8px",
    color: "#dcddde",
    fontSize: "13px"
  },
  videoGrid: { flex: 1, position: "relative", backgroundColor: "#000" },
  remoteVideoContainer: { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" },
  remoteVideo: { width: "100%", height: "100%", objectFit: "contain" },
  videoPlaceholder: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", color: "#b9bbbe" },
  placeholderAvatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    fontWeight: "bold",
    color: "#fff"
  },
  localVideoContainer: {
    position: "absolute",
    bottom: "100px",
    right: "24px",
    width: "240px",
    height: "180px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "2px solid #5865f2",
    backgroundColor: "#000",
    boxShadow: "0 4px 12px rgba(0,0,0,0.5)"
  },
  localVideo: { width: "100%", height: "100%", objectFit: "cover", transform: "scaleX(-1)" },
  localVideoPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2f3136"
  },
  placeholderAvatarSmall: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#5865f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff"
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    padding: "24px",
    backgroundColor: "#2f3136"
  },
  controlButton: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#40444b",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  },
  controlButtonActive: { backgroundColor: "#f04747" },
  hangupButton: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#f04747",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  }
};
const VideoCallModal = /* @__PURE__ */ __name(({ isOpen, onClose, targetUser, currentUser, localStream, remoteStream, onToggleVideo, onToggleMute, isVideoEnabled, isMuted, callDuration = 0, callStatus = "connecting" }) => {
  const v = useVideoCall(isOpen, localStream, remoteStream);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: v.containerRef, style: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.avatar, children: targetUser?.username?.[0]?.toUpperCase() || "U" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.userInfo, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.username, children: targetUser?.username || "Unknown" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.status, children: [
            callStatus === "connecting" && "🔄 Bağlanıyor...",
            callStatus === "active" && `⏱️ ${formatDuration(callDuration)}`,
            callStatus === "ended" && "📞 Arama sona erdi"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => v.setShowSettings(!v.showSettings), "onClick"), style: styles.headerButton, title: "Ayarlar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaCog, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: v.toggleFullscreen, style: styles.headerButton, title: "Tam ekran", children: v.isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCompress, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaExpand, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, title: "Kapat", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    v.showSettings && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingsPanel, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.settingsTitle, children: "Video Ayarları" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.settingLabel, children: "Kamera" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: v.selectedCamera, onChange: /* @__PURE__ */ __name((e) => v.setSelectedCamera(e.target.value), "onChange"), style: styles.settingSelect, children: v.devices.cameras.map((cam, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cam.deviceId, children: cam.label || `Kamera ${i + 1}` }, cam.deviceId)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.settingLabel, children: "Mikrofon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: v.selectedMicrophone, onChange: /* @__PURE__ */ __name((e) => v.setSelectedMicrophone(e.target.value), "onChange"), style: styles.settingSelect, children: v.devices.microphones.map((mic, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: mic.deviceId, children: mic.label || `Mikrofon ${i + 1}` }, mic.deviceId)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingGroup, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { style: styles.settingLabel, children: "Kalite" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: v.videoQuality, onChange: /* @__PURE__ */ __name((e) => v.setVideoQuality(e.target.value), "onChange"), style: styles.settingSelect, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "480p", children: "480p (Düşük)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "720p", children: "720p (Orta)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1080p", children: "1080p (Yüksek)" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.videoGrid, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.remoteVideoContainer, children: remoteStream ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: v.remoteVideoRef, autoPlay: true, playsInline: true, style: styles.remoteVideo }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.videoPlaceholder, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.placeholderAvatar, children: targetUser?.username?.[0]?.toUpperCase() || "U" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Kamera açılmadı" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.localVideoContainer, children: localStream && isVideoEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: v.localVideoRef, autoPlay: true, playsInline: true, muted: true, style: styles.localVideo }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.localVideoPlaceholder, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.placeholderAvatarSmall, children: currentUser?.[0]?.toUpperCase() || "M" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.controls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggleMute, style: { ...styles.controlButton, ...isMuted && styles.controlButtonActive }, title: isMuted ? "Mikrofonu aç" : "Mikrofonu kapat", children: isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophoneSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onToggleVideo, style: { ...styles.controlButton, ...!isVideoEnabled && styles.controlButtonActive }, title: isVideoEnabled ? "Kamerayı kapat" : "Kamerayı aç", children: isVideoEnabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideoSlash, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.hangupButton, title: "Aramayı sonlandır", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPhone, { style: { transform: "rotate(135deg)" } }) })
    ] })
  ] }) });
}, "VideoCallModal");
export {
  VideoCallModal as default
};

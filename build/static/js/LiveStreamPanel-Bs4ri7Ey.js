var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bb as FaVideo, a as FaTimes, E as FaMicrophone, af as FaDesktop, u as FaUsers, ac as FaComments } from "./icons-vendor-2VDeY8fW.js";
const LiveStreamPanel = /* @__PURE__ */ __name(({ onClose, currentUser, ws, channelId, fetchWithAuth, apiBaseUrl, roomSlug }) => {
  const [isStreaming, setIsStreaming] = reactExports.useState(false);
  const [viewers, setViewers] = reactExports.useState([]);
  const [streamSettings, setStreamSettings] = reactExports.useState({
    quality: "720p",
    camera: true,
    microphone: true,
    screenShare: false
  });
  const [chatMessages, setChatMessages] = reactExports.useState([]);
  const [messageInput, setMessageInput] = reactExports.useState("");
  const videoRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const peerConnections = reactExports.useRef({});
  const startStream = /* @__PURE__ */ __name(async () => {
    try {
      const constraints = {
        video: streamSettings.camera ? {
          width: { ideal: streamSettings.quality === "1080p" ? 1920 : 1280 },
          height: { ideal: streamSettings.quality === "1080p" ? 1080 : 720 }
        } : false,
        audio: streamSettings.microphone
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (streamSettings.screenShare) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        stream.getTracks().forEach((track) => screenStream.addTrack(track));
        streamRef.current = screenStream;
      } else {
        streamRef.current = stream;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
      setIsStreaming(true);
    } catch (error) {
      console.error("Stream start error:", error);
    }
  }, "startStream");
  const stopStream = /* @__PURE__ */ __name(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};
    setIsStreaming(false);
    setViewers([]);
  }, "stopStream");
  const sendChatMessage = /* @__PURE__ */ __name(() => {
    if (!messageInput.trim()) return;
    setChatMessages((prev) => [...prev, { author: currentUser || "Sen", text: messageInput }]);
    setMessageInput("");
  }, "sendChatMessage");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.panel, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, { size: 20, color: "#ed4245" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Canlı Yayın" }),
        isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.liveBadge, children: "🔴 CANLI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => {
        if (isStreaming) stopStream();
        onClose();
      }, "onClick"), style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, { size: 20 }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.mainArea, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.videoContainer, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, autoPlay: true, muted: true, style: styles.video }),
          !isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.noStream, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, { size: 48, color: "#4e5058" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yayın başlatılmadı" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.controls, children: !isStreaming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.settingsGroup, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.settingLabel, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: streamSettings.camera,
                  onChange: /* @__PURE__ */ __name((e) => setStreamSettings({ ...streamSettings, camera: e.target.checked }), "onChange")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, { size: 14 }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kamera" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.settingLabel, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: streamSettings.microphone,
                  onChange: /* @__PURE__ */ __name((e) => setStreamSettings({ ...streamSettings, microphone: e.target.checked }), "onChange")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { size: 14 }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mikrofon" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { style: styles.settingLabel, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "checkbox",
                  checked: streamSettings.screenShare,
                  onChange: /* @__PURE__ */ __name((e) => setStreamSettings({ ...streamSettings, screenShare: e.target.checked }), "onChange")
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, { size: 14 }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ekran Paylaşımı" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "select",
            {
              value: streamSettings.quality,
              onChange: /* @__PURE__ */ __name((e) => setStreamSettings({ ...streamSettings, quality: e.target.value }), "onChange"),
              style: styles.qualitySelect,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "480p", children: "480p" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "720p", children: "720p HD" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1080p", children: "1080p Full HD" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: startStream, style: styles.startButton, children: "Yayını Başlat" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: stopStream, style: styles.stopButton, children: "Yayını Durdur" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sidebar, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.viewersSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sectionHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, { size: 16 }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "İzleyiciler (",
              viewers.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.viewersList, children: viewers.map((viewer, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.viewer, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.viewerAvatar, children: viewer.name?.[0] || "?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: viewer.name })
          ] }, idx)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.chatSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.sectionHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaComments, { size: 16 }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sohbet" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.chatMessages, children: chatMessages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.chatMessage, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.chatAuthor, children: [
              msg.author,
              ":"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.chatText, children: msg.text })
          ] }, idx)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.chatInput, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                placeholder: "Mesaj yaz...",
                value: messageInput,
                onChange: /* @__PURE__ */ __name((e) => setMessageInput(e.target.value), "onChange"),
                onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && sendChatMessage(), "onKeyPress"),
                style: styles.input
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: sendChatMessage, style: styles.sendButton, children: "Gönder" })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}, "LiveStreamPanel");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0, 0, 0, 0.95)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e4 },
  panel: { backgroundColor: "#2f3136", borderRadius: "8px", width: "95%", maxWidth: "1400px", height: "90vh", display: "flex", flexDirection: "column" },
  header: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #202225" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  title: { margin: 0, fontSize: "18px", color: "#ffffff" },
  liveBadge: { backgroundColor: "#ed4245", color: "#ffffff", padding: "4px 12px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" },
  closeButton: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", padding: "8px" },
  content: { display: "flex", flex: 1, gap: "16px", padding: "16px", overflow: "hidden" },
  mainArea: { flex: 1, display: "flex", flexDirection: "column", gap: "16px" },
  videoContainer: { flex: 1, backgroundColor: "#000000", borderRadius: "8px", position: "relative", overflow: "hidden" },
  video: { width: "100%", height: "100%", objectFit: "contain" },
  noStream: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center", color: "#b9bbbe" },
  controls: { backgroundColor: "#36393f", borderRadius: "8px", padding: "16px", display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" },
  settingsGroup: { display: "flex", gap: "16px", flex: 1 },
  settingLabel: { display: "flex", alignItems: "center", gap: "8px", color: "#dcddde", cursor: "pointer" },
  qualitySelect: { backgroundColor: "#202225", border: "none", color: "#dcddde", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" },
  startButton: { backgroundColor: "#3ba55d", color: "#ffffff", border: "none", padding: "10px 24px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  stopButton: { backgroundColor: "#ed4245", color: "#ffffff", border: "none", padding: "10px 24px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" },
  sidebar: { width: "300px", display: "flex", flexDirection: "column", gap: "16px" },
  viewersSection: { backgroundColor: "#36393f", borderRadius: "8px", padding: "16px", maxHeight: "250px", display: "flex", flexDirection: "column" },
  sectionHeader: { display: "flex", alignItems: "center", gap: "8px", color: "#ffffff", fontWeight: "bold", marginBottom: "12px" },
  viewersList: { flex: 1, overflowY: "auto" },
  viewer: { display: "flex", alignItems: "center", gap: "8px", padding: "8px 0", color: "#dcddde" },
  viewerAvatar: { width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" },
  chatSection: { backgroundColor: "#36393f", borderRadius: "8px", padding: "16px", flex: 1, display: "flex", flexDirection: "column" },
  chatMessages: { flex: 1, overflowY: "auto", marginBottom: "12px" },
  chatMessage: { marginBottom: "8px", color: "#dcddde", fontSize: "14px" },
  chatAuthor: { fontWeight: "bold", color: "#5865f2", marginRight: "4px" },
  chatText: { color: "#dcddde" },
  chatInput: { display: "flex", gap: "8px" },
  input: { flex: 1, backgroundColor: "#202225", border: "none", color: "#dcddde", padding: "8px 12px", borderRadius: "4px", outline: "none" },
  sendButton: { backgroundColor: "#5865f2", color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }
};
export {
  LiveStreamPanel as default
};

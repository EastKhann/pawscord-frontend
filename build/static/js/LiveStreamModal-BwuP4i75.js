var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bb as FaVideo, a as FaTimes, a0 as FaEye, af as FaDesktop, bL as FaMicrophoneSlash, E as FaMicrophone, D as FaStop, u as FaUsers } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const rtcConfig = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" }
  ]
};
const useLiveStream = /* @__PURE__ */ __name(({ roomSlug, ws, onClose }) => {
  const [isStreaming, setIsStreaming] = reactExports.useState(false);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [streamType, setStreamType] = reactExports.useState("camera");
  const [viewers, setViewers] = reactExports.useState(0);
  const [chatMessages, setChatMessages] = reactExports.useState([]);
  const [chatInput, setChatInput] = reactExports.useState("");
  const videoRef = reactExports.useRef(null);
  const streamRef = reactExports.useRef(null);
  const peerConnectionsRef = reactExports.useRef({});
  const createPeerConnection = /* @__PURE__ */ __name(async (viewerId) => {
    if (!streamRef.current) return;
    const pc = new RTCPeerConnection(rtcConfig);
    peerConnectionsRef.current[viewerId] = pc;
    streamRef.current.getTracks().forEach((track) => {
      pc.addTrack(track, streamRef.current);
    });
    pc.onicecandidate = (event) => {
      if (event.candidate && ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: "ice_candidate", candidate: event.candidate, viewer_id: viewerId }));
      }
    };
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "stream_offer", sdp: pc.localDescription, viewer_id: viewerId }));
    }
  }, "createPeerConnection");
  reactExports.useEffect(() => {
    if (!ws.current) return;
    const handleMessage = /* @__PURE__ */ __name((event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "stream_viewer_count") setViewers(data.count);
        else if (data.type === "stream_chat") {
          setChatMessages((prev) => [...prev, { id: Date.now(), user: data.username, message: data.message, timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString() }]);
        } else if (data.type === "stream_viewer_join") createPeerConnection(data.viewerId);
      } catch (e) {
        console.error("Stream WS error:", e);
      }
    }, "handleMessage");
    ws.current.addEventListener("message", handleMessage);
    return () => ws.current?.removeEventListener("message", handleMessage);
  }, [ws]);
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const startStream = /* @__PURE__ */ __name(async () => {
    try {
      let stream;
      if (streamType === "camera") {
        stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 }, frameRate: { ideal: 30 } }, audio: true });
      } else {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: { width: { ideal: 1920 }, height: { ideal: 1080 }, frameRate: { ideal: 30 } }, audio: true });
      }
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setIsStreaming(true);
      if (ws.current?.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ type: "stream_start", room_slug: roomSlug, stream_type: streamType }));
      }
    } catch (error) {
      console.error("Failed to start stream:", error);
      toast.error("❌ Failed to start stream. Please check permissions.");
    }
  }, "startStream");
  const stopStream = /* @__PURE__ */ __name(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    Object.values(peerConnectionsRef.current).forEach((pc) => pc.close());
    peerConnectionsRef.current = {};
    if (videoRef.current) videoRef.current.srcObject = null;
    setIsStreaming(false);
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "stream_stop", room_slug: roomSlug }));
    }
  }, "stopStream");
  const toggleMute = /* @__PURE__ */ __name(() => {
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = isMuted;
      });
      setIsMuted(!isMuted);
    }
  }, "toggleMute");
  const sendChatMessage = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "stream_chat", room_slug: roomSlug, message: chatInput }));
    }
    setChatInput("");
  }, "sendChatMessage");
  return {
    isStreaming,
    isMuted,
    streamType,
    setStreamType,
    viewers,
    chatMessages,
    chatInput,
    setChatInput,
    videoRef,
    startStream,
    stopStream,
    toggleMute,
    sendChatMessage
  };
}, "useLiveStream");
const getStyles = /* @__PURE__ */ __name((isMobile) => ({
  overlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0, 0, 0, 0.95)", backdropFilter: "blur(10px)", zIndex: 1e4, display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "0" : "20px" },
  modal: { width: "100%", maxWidth: isMobile ? "100%" : "1400px", height: isMobile ? "100%" : "auto", maxHeight: "90vh", background: "linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))", borderRadius: isMobile ? "0" : "16px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(218, 55, 60, 0.3)", border: isMobile ? "none" : "1px solid rgba(218, 55, 60, 0.4)" },
  header: { padding: isMobile ? "12px 16px" : "16px 24px", background: "linear-gradient(135deg, rgba(218, 55, 60, 0.15), rgba(240, 71, 71, 0.15))", borderBottom: "1px solid rgba(218, 55, 60, 0.3)", display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: isMobile ? "18px" : "22px", fontWeight: "700", color: "rgba(255, 255, 255, 0.95)", display: "flex", alignItems: "center", gap: "10px" },
  liveIndicator: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", background: "rgba(218, 55, 60, 0.3)", borderRadius: "12px", fontSize: "12px", fontWeight: "600", color: "#da373c", border: "1px solid rgba(218, 55, 60, 0.5)" },
  liveDot: { width: "8px", height: "8px", background: "#da373c", borderRadius: "50%", animation: "pulse 1.5s ease-in-out infinite" },
  closeBtn: { background: "rgba(218, 55, 60, 0.2)", border: "1px solid rgba(218, 55, 60, 0.4)", borderRadius: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#da373c", fontSize: "18px" },
  content: { flex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", overflow: "hidden" },
  streamSection: { flex: 1, display: "flex", flexDirection: "column", background: "#000", position: "relative" },
  videoContainer: { flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#000", position: "relative" },
  video: { width: "100%", height: "100%", objectFit: "contain" },
  placeholder: { textAlign: "center", color: "rgba(255, 255, 255, 0.5)" },
  viewerCount: { position: "absolute", top: "16px", right: "16px", display: "flex", alignItems: "center", gap: "8px", padding: "8px 16px", background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(10px)", borderRadius: "20px", fontSize: "14px", fontWeight: "600", color: "white" },
  controls: { padding: "16px", background: "rgba(0, 0, 0, 0.8)", borderTop: "1px solid rgba(218, 55, 60, 0.2)", display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" },
  controlBtn: /* @__PURE__ */ __name((active) => ({ padding: "12px 24px", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s ease", minHeight: "44px", background: active ? "rgba(218, 55, 60, 0.3)" : "rgba(88, 101, 242, 0.2)", color: active ? "#da373c" : "rgba(255, 255, 255, 0.9)", border: `1px solid ${active ? "rgba(218, 55, 60, 0.5)" : "rgba(88, 101, 242, 0.4)"}` }), "controlBtn"),
  startBtn: { padding: "12px 32px", borderRadius: "8px", border: "none", fontSize: "16px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", background: "linear-gradient(135deg, #da373c, #f04747)", color: "white", transition: "all 0.2s ease", minHeight: "48px" },
  chatSection: { width: isMobile ? "100%" : "350px", maxHeight: isMobile ? "300px" : "auto", background: "rgba(0, 0, 0, 0.3)", borderLeft: isMobile ? "none" : "1px solid rgba(218, 55, 60, 0.2)", display: "flex", flexDirection: "column" },
  chatHeader: { padding: "16px", borderBottom: "1px solid rgba(218, 55, 60, 0.2)", fontSize: "16px", fontWeight: "600", color: "rgba(255, 255, 255, 0.9)" },
  chatMessages: { flex: 1, overflowY: "auto", padding: "12px", display: "flex", flexDirection: "column", gap: "8px" },
  chatMessage: { padding: "8px 12px", background: "rgba(0, 0, 0, 0.3)", borderRadius: "8px", fontSize: "14px" },
  chatUsername: { fontWeight: "600", color: "#5865f2", marginBottom: "4px" },
  chatText: { color: "rgba(255, 255, 255, 0.8)" },
  chatInputArea: { padding: "12px", borderTop: "1px solid rgba(218, 55, 60, 0.2)", display: "flex", gap: "8px" },
  input: { flex: 1, padding: "12px", background: "rgba(0, 0, 0, 0.3)", border: "1px solid rgba(218, 55, 60, 0.3)", borderRadius: "8px", color: "rgba(255, 255, 255, 0.95)", fontSize: "14px", outline: "none" },
  sendBtn: { padding: "12px 20px", background: "linear-gradient(135deg, #da373c, #f04747)", border: "none", borderRadius: "8px", color: "white", fontWeight: "600", cursor: "pointer", minHeight: "44px" }
}), "getStyles");
const LiveStreamModal = /* @__PURE__ */ __name(({ onClose, roomSlug, ws, token, isMobile }) => {
  const s = getStyles(isMobile);
  const stream = useLiveStream({ roomSlug, ws, onClose });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: s.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.header, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: s.title, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, {}),
          " Live Stream",
          stream.isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: s.liveIndicator, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: s.liveDot }),
            "LIVE"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: s.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.content, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.streamSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: s.videoContainer, children: stream.isStreaming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: stream.videoRef, autoPlay: true, muted: true, style: s.video }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.viewerCount, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {}),
              " ",
              stream.viewers,
              " viewers"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.placeholder, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, { size: 64 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginTop: "16px", fontSize: "18px" }, children: 'Click "Start Stream" to begin' })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: s.controls, children: !stream.isStreaming ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => stream.setStreamType("camera"), "onClick"), style: s.controlBtn(stream.streamType === "camera"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, {}),
              " Camera"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => stream.setStreamType("screen"), "onClick"), style: s.controlBtn(stream.streamType === "screen"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaDesktop, {}),
              " Screen"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: stream.startStream, style: s.startBtn, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaVideo, {}),
              " Start Stream"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: stream.toggleMute, style: s.controlBtn(stream.isMuted), children: [
              stream.isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophoneSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, {}),
              stream.isMuted ? "Unmute" : "Mute"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: stream.stopStream, style: { ...s.startBtn, background: "linear-gradient(135deg, #da373c, #b83030)" }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaStop, {}),
              " Stop Stream"
            ] })
          ] }) })
        ] }),
        stream.isStreaming && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.chatSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.chatHeader, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
            " Stream Chat"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: s.chatMessages, children: stream.chatMessages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: s.chatMessage, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: s.chatUsername, children: msg.user }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: s.chatText, children: msg.message })
          ] }, msg.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: stream.sendChatMessage, style: s.chatInputArea, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: stream.chatInput,
                onChange: /* @__PURE__ */ __name((e) => stream.setChatInput(e.target.value), "onChange"),
                placeholder: "Send a message...",
                style: s.input
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: s.sendBtn, children: "Send" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}, "LiveStreamModal");
export {
  LiveStreamModal as default
};

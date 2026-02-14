var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { an as FaPlus, u as FaUsers, a as FaTimes, aM as FaPause, aN as FaPlay, au as FaVolumeMute, G as FaVolumeUp, cq as FaCompress, b2 as FaExpand } from "./icons-vendor-2VDeY8fW.js";
import { t as toast, W as WS_PROTOCOL, r as API_HOST, A as API_BASE_URL } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const REACTION_EMOJIS = ["👍", "❤️", "😂", "😮", "😢", "🔥", "👏", "🎉"];
const extractYouTubeId = /* @__PURE__ */ __name((url) => {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : "";
}, "extractYouTubeId");
function useWatchParty(roomId, onClose) {
  const [party, setParty] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [showCreateModal, setShowCreateModal] = reactExports.useState(false);
  const [videoUrl, setVideoUrl] = reactExports.useState("");
  const [viewers, setViewers] = reactExports.useState([]);
  const [messages, setMessages] = reactExports.useState([]);
  const [newMessage, setNewMessage] = reactExports.useState("");
  const [isHost, setIsHost] = reactExports.useState(false);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const [showChat, setShowChat] = reactExports.useState(true);
  const [reactions, setReactions] = reactExports.useState([]);
  const wsRef = reactExports.useRef(null);
  const playerRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const chatEndRef = reactExports.useRef(null);
  const heartbeatRef = reactExports.useRef(null);
  const token = localStorage.getItem("access_token");
  const handleSyncPlayback = reactExports.useCallback((data) => {
    if (data.by_user === "system" || !isHost) {
      setCurrentTime(data.current_time);
      setIsPlaying(data.status === "playing");
      if (playerRef.current) {
        playerRef.current.seekTo(data.current_time);
        data.status === "playing" ? playerRef.current.play() : playerRef.current.pause();
      }
    }
  }, [isHost]);
  const handleReaction = reactExports.useCallback((data) => {
    const reactionId = Date.now() + Math.random();
    setReactions((prev) => [...prev, { ...data, id: reactionId }]);
    setTimeout(() => setReactions((prev) => prev.filter((r) => r.id !== reactionId)), 3e3);
  }, []);
  const handleChatMessage = reactExports.useCallback((data) => {
    setMessages((prev) => [...prev, data]);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, []);
  const handleViewerJoined = reactExports.useCallback((data) => {
    toast.success(`${data.username} katıldı!`);
    setViewers((prev) => prev.find((v) => v.username === data.username) ? prev : [...prev, { username: data.username, id: data.user_id }]);
  }, []);
  const handleViewerLeft = reactExports.useCallback((data) => {
    setViewers((prev) => prev.filter((v) => v.username !== data.username));
  }, []);
  const handlePartyEnded = reactExports.useCallback(() => {
    toast.info("Watch Party sona erdi");
    setParty(null);
    onClose?.();
  }, [onClose]);
  const handleVideoChanged = reactExports.useCallback((data) => {
    setParty((prev) => ({ ...prev, video_url: data.video_url, video_title: data.video_title, embed_url: data.embed_url }));
    setCurrentTime(0);
    setIsPlaying(false);
  }, []);
  const connectWebSocket = reactExports.useCallback((partyId) => {
    if (wsRef.current) wsRef.current.close();
    const ws = new WebSocket(`${WS_PROTOCOL}://${API_HOST}/ws/watch-party/${partyId}/?token=${token}`);
    ws.onopen = () => ws.send(JSON.stringify({ type: "request_sync" }));
    ws.onmessage = (event) => {
      const d = JSON.parse(event.data);
      const handlers = {
        sync_playback: handleSyncPlayback,
        reaction: handleReaction,
        chat_message: handleChatMessage,
        viewer_joined: handleViewerJoined,
        viewer_left: handleViewerLeft,
        party_ended: handlePartyEnded,
        video_changed: handleVideoChanged
      };
      handlers[d.type]?.(d);
    };
    ws.onerror = (err) => console.error("📺 Watch Party WebSocket error:", err);
    wsRef.current = ws;
    heartbeatRef.current = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "heartbeat", local_time: currentTime, is_buffering: false }));
      }
    }, 5e3);
  }, [token, currentTime, handleSyncPlayback, handleReaction, handleChatMessage, handleViewerJoined, handleViewerLeft, handlePartyEnded, handleVideoChanged]);
  const createWatchParty = /* @__PURE__ */ __name(async () => {
    if (!videoUrl.trim()) {
      toast.error("Video URL gerekli");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/rooms/${roomId}/watch-party/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ video_url: videoUrl, allow_control: false })
      });
      if (res.ok) {
        const data = await res.json();
        setParty(data);
        setIsHost(true);
        setShowCreateModal(false);
        connectWebSocket(data.id);
        toast.success("Watch Party oluşturuldu! 🎉");
      } else {
        const err = await res.json();
        toast.error(err.error || "Watch Party oluşturulamadı");
      }
    } catch {
      toast.error("Bağlantı hatası");
    } finally {
      setIsLoading(false);
    }
  }, "createWatchParty");
  const joinWatchParty = /* @__PURE__ */ __name(async (partyId) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/watch-party/${partyId}/join/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (res.ok) {
        const partyRes = await fetch(`${API_BASE_URL}/watch-party/${partyId}/`, { headers: { "Authorization": `Bearer ${token}` } });
        const partyData = await partyRes.json();
        setParty(partyData);
        setIsHost(partyData.is_host);
        setViewers(partyData.viewers || []);
        setCurrentTime(partyData.current_time);
        setIsPlaying(partyData.status === "playing");
        connectWebSocket(partyId);
        toast.success("Watch Party'ye katıldın! 🎬");
      } else {
        const err = await res.json();
        toast.error(err.error || "Katılınamadı");
      }
    } catch {
      toast.error("Bağlantı hatası");
    } finally {
      setIsLoading(false);
    }
  }, "joinWatchParty");
  const sendSync = /* @__PURE__ */ __name((action) => {
    if (!isHost || !wsRef.current) return;
    wsRef.current.send(JSON.stringify({ type: "sync", action, current_time: currentTime, playback_rate: 1 }));
  }, "sendSync");
  const sendReaction = /* @__PURE__ */ __name((emoji) => {
    if (!wsRef.current) return;
    wsRef.current.send(JSON.stringify({ type: "reaction", emoji, video_time: currentTime }));
  }, "sendReaction");
  const sendMessage = /* @__PURE__ */ __name(() => {
    if (!newMessage.trim() || !wsRef.current) return;
    wsRef.current.send(JSON.stringify({ type: "message", content: newMessage, video_time: currentTime }));
    setNewMessage("");
  }, "sendMessage");
  const endParty = /* @__PURE__ */ __name(async () => {
    if (!party || !isHost) return;
    try {
      await fetch(`${API_BASE_URL}/watch-party/${party.id}/end/`, { method: "POST", headers: { "Authorization": `Bearer ${token}` } });
    } catch (err) {
      console.error("End party error:", err);
    }
  }, "endParty");
  const togglePlay = /* @__PURE__ */ __name(() => {
    if (isHost) sendSync(isPlaying ? "pause" : "play");
    setIsPlaying(!isPlaying);
  }, "togglePlay");
  const toggleFullscreen = /* @__PURE__ */ __name(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, "toggleFullscreen");
  reactExports.useEffect(() => () => {
    wsRef.current?.close();
    if (heartbeatRef.current) clearInterval(heartbeatRef.current);
  }, []);
  return {
    party,
    isLoading,
    showCreateModal,
    setShowCreateModal,
    videoUrl,
    setVideoUrl,
    viewers,
    messages,
    newMessage,
    setNewMessage,
    isHost,
    isPlaying,
    currentTime,
    isMuted,
    setIsMuted,
    isFullscreen,
    showChat,
    setShowChat,
    reactions,
    playerRef,
    containerRef,
    chatEndRef,
    createWatchParty,
    joinWatchParty,
    sendReaction,
    sendMessage,
    endParty,
    togglePlay,
    toggleFullscreen
  };
}
__name(useWatchParty, "useWatchParty");
const WatchTogether = /* @__PURE__ */ __name(({ roomId, onClose }) => {
  const w = useWatchParty(roomId, onClose);
  if (!w.party) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-together-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-together-empty", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          "📺",
          " Watch Together"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Arkadaşlarınla birlikte video izle!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "create-party-btn", onClick: /* @__PURE__ */ __name(() => w.setShowCreateModal(true), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
          " Yeni Watch Party Oluştur"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "supported-platforms", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Desteklenen platformlar:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "platforms", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "YouTube" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Twitch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Vimeo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dailymotion" })
          ] })
        ] })
      ] }),
      w.showCreateModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "watch-modal-overlay", onClick: /* @__PURE__ */ __name(() => w.setShowCreateModal(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "🎬",
          " Watch Party Oluştur"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "url", placeholder: "Video URL'sini yapıştır...", value: w.videoUrl, onChange: /* @__PURE__ */ __name((e) => w.setVideoUrl(e.target.value), "onChange"), autoFocus: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "cancel-btn", onClick: /* @__PURE__ */ __name(() => w.setShowCreateModal(false), "onClick"), children: "İptal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-btn", onClick: w.createWatchParty, disabled: w.isLoading, children: w.isLoading ? "Oluşturuluyor..." : "Oluştur" })
        ] })
      ] }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-together-container", ref: w.containerRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-title", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "live-badge", children: "CANLI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: w.party.video_title || "Watch Party" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-viewers", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          w.viewers.length,
          " izleyici"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-player", children: [
      w.party.video_source === "youtube" && /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { ref: w.playerRef, src: `https://www.youtube.com/embed/${extractYouTubeId(w.party.video_url)}?autoplay=${w.isPlaying ? 1 : 0}&start=${Math.floor(w.currentTime)}&enablejsapi=1`, title: "Watch Party", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: true }),
      w.party.video_source === "direct" && /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: w.playerRef, src: w.party.video_url, autoPlay: w.isPlaying, muted: w.isMuted }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reaction-overlay", children: w.reactions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "floating-reaction", style: { left: `${Math.random() * 80 + 10}%` }, children: r.emoji }, r.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "control-left", children: [
        w.isHost && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: w.togglePlay, children: w.isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => w.setIsMuted(!w.isMuted), "onClick"), children: w.isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeMute, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reactions-bar", children: REACTION_EMOJIS.map((emoji) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "reaction-btn", onClick: /* @__PURE__ */ __name(() => w.sendReaction(emoji), "onClick"), children: emoji }, emoji)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "control-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => w.setShowChat(!w.showChat), "onClick"), children: "💬" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: w.toggleFullscreen, children: w.isFullscreen ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaCompress, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaExpand, {}) }),
        w.isHost && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "end-btn", onClick: w.endParty, children: "Bitir" })
      ] })
    ] }),
    w.showChat && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "watch-chat", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-messages", children: [
        w.messages.map((msg, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-message", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: msg.avatar || "/default-avatar.png", alt: msg.user, className: "chat-avatar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-content", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-user", children: msg.user }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "chat-text", children: msg.content })
          ] })
        ] }, idx)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: w.chatEndRef })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chat-input", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Mesaj yaz...", value: w.newMessage, onChange: /* @__PURE__ */ __name((e) => w.setNewMessage(e.target.value), "onChange"), onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && w.sendMessage(), "onKeyPress") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: w.sendMessage, children: "Gönder" })
      ] })
    ] })
  ] });
}, "WatchTogether");
export {
  WatchTogether as default
};

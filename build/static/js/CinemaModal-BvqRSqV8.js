const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["static/js/media-vendor-BRMiuG2Y.js","static/js/react-core-BiY6fgAJ.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { _ as __vitePreload } from "./media-vendor-BRMiuG2Y.js";
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, aL as FaExclamationCircle, j as FaLink, aM as FaPause, aN as FaPlay } from "./icons-vendor-2VDeY8fW.js";
const ReactPlayer = reactExports.lazy(() => __vitePreload(() => import("./media-vendor-BRMiuG2Y.js").then((n) => n.i), true ? __vite__mapDeps([0,1]) : void 0));
const CinemaModal = /* @__PURE__ */ __name(({ onClose, ws }) => {
  const [url, setUrl] = reactExports.useState("https://www.youtube.com/watch?v=jfKfPfyJRdk");
  const [inputUrl, setInputUrl] = reactExports.useState("");
  const [playing, setPlaying] = reactExports.useState(false);
  const [volume, setVolume] = reactExports.useState(0.8);
  const [error, setError] = reactExports.useState(null);
  const [isReady, setIsReady] = reactExports.useState(false);
  const playerRef = reactExports.useRef(null);
  const isRemoteUpdate = reactExports.useRef(false);
  const getCurrentTimeSafe = /* @__PURE__ */ __name(() => {
    if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
      try {
        return playerRef.current.getCurrentTime();
      } catch (e) {
        return 0;
      }
    }
    return 0;
  }, "getCurrentTimeSafe");
  reactExports.useEffect(() => {
    if (!ws.current) return;
    const handleMessage = /* @__PURE__ */ __name((event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "media_sync") {
          isRemoteUpdate.current = true;
          if (data.action === "change_url") {
            setPlaying(false);
            setIsReady(false);
            setUrl(data.payload.url);
            setError(null);
          } else if (data.action === "play") {
            const currentTime = getCurrentTimeSafe();
            if (Math.abs(currentTime - data.payload.time) > 2) {
              if (playerRef.current && typeof playerRef.current.seekTo === "function") {
                playerRef.current.seekTo(data.payload.time);
              }
            }
            setPlaying(true);
          } else if (data.action === "pause") {
            setPlaying(false);
          }
          setTimeout(() => {
            isRemoteUpdate.current = false;
          }, 1e3);
        }
      } catch (e) {
        console.error("WS Hatası:", e);
      }
    }, "handleMessage");
    ws.current.addEventListener("message", handleMessage);
    return () => ws.current?.removeEventListener("message", handleMessage);
  }, [ws]);
  const sendSignal = /* @__PURE__ */ __name((action, payload = {}) => {
    if (isRemoteUpdate.current) return;
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "media_sync", action, payload }));
    }
  }, "sendSignal");
  const handleLoadUrl = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    isRemoteUpdate.current = false;
    setPlaying(false);
    setIsReady(false);
    setUrl(inputUrl);
    setError(null);
    sendSignal("change_url", { url: inputUrl });
    setInputUrl("");
  }, "handleLoadUrl");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🍿 Sinema & Müzik" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.playerWrapper, children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statusOverlay, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationCircle, { size: 40, color: "#f04747" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginTop: 10 }, children: error })
      ] }),
      !isReady && !error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.statusOverlay, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { marginTop: 10 }, children: "Yükleniyor..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", padding: "50px", textAlign: "center" }, children: "Loading player..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReactPlayer,
        {
          ref: playerRef,
          url,
          playing,
          volume,
          controls: true,
          width: "100%",
          height: "100%",
          style: { position: "absolute", top: 0, left: 0 },
          onReady: /* @__PURE__ */ __name(() => {
            setIsReady(true);
          }, "onReady"),
          onError: /* @__PURE__ */ __name((e) => {
            console.error("Video Oynatma Hatası:", e);
            setError("Video oynatılamadı. Link geçersiz olabilir.");
            setIsReady(true);
          }, "onError"),
          onPlay: /* @__PURE__ */ __name(() => {
            const t = getCurrentTimeSafe();
            sendSignal("play", { time: t });
          }, "onPlay"),
          onPause: /* @__PURE__ */ __name(() => {
            sendSignal("pause");
          }, "onPause"),
          onProgress: /* @__PURE__ */ __name(() => {
          }, "onProgress")
        },
        url
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.controls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLoadUrl, style: styles.urlForm, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { color: "#b9bbbe" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: inputUrl,
            onChange: /* @__PURE__ */ __name((e) => setInputUrl(e.target.value), "onChange"),
            placeholder: "YouTube linki yapıştır...",
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: styles.loadBtn, children: "Yükle" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            isRemoteUpdate.current = false;
            if (playing) {
              setPlaying(false);
              sendSignal("pause");
            } else {
              setPlaying(true);
              const t = getCurrentTimeSafe();
              sendSignal("play", { time: t });
            }
          }, "onClick"),
          style: { ...styles.loadBtn, backgroundColor: playing ? "#da373c" : "#43b581", marginLeft: 10, width: 110, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 },
          children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, {}),
            " Durdur"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}),
            " Oynat"
          ] })
        }
      )
    ] })
  ] }) });
}, "CinemaModal");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.9)", zIndex: 2e3, display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { width: "90%", maxWidth: "900px", backgroundColor: "#202225", borderRadius: "12px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" },
  header: { padding: "15px", backgroundColor: "#2f3136", display: "flex", justifyContent: "space-between", color: "white" },
  playerWrapper: { position: "relative", paddingTop: "56.25%", backgroundColor: "black" },
  closeBtn: { background: "none", border: "none", color: "white", fontSize: "1.5em", cursor: "pointer" },
  controls: { padding: "20px", display: "flex", alignItems: "center" },
  urlForm: { display: "flex", gap: "10px", backgroundColor: "#40444b", padding: "10px", borderRadius: "8px", flex: 1 },
  input: { flex: 1, background: "transparent", border: "none", color: "white", outline: "none" },
  loadBtn: { padding: "8px 20px", backgroundColor: "#5865f2", border: "none", borderRadius: "4px", color: "white", fontWeight: "bold", cursor: "pointer" },
  statusOverlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)", color: "white", zIndex: 10 }
};
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .spinner {
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top: 4px solid #ffffff;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
    }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);
export {
  CinemaModal as default
};

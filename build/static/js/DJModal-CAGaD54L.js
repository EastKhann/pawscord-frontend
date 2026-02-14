const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["static/js/media-vendor-BRMiuG2Y.js","static/js/react-core-BiY6fgAJ.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { _ as __vitePreload } from "./media-vendor-BRMiuG2Y.js";
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, an as FaPlus, H as FaForward, aK as FaMusic } from "./icons-vendor-2VDeY8fW.js";
const ReactPlayer = reactExports.lazy(() => __vitePreload(() => import("./media-vendor-BRMiuG2Y.js").then((n) => n.i), true ? __vite__mapDeps([0,1]) : void 0));
const DJModal = /* @__PURE__ */ __name(({ onClose, ws, roomSlug }) => {
  const [queue, setQueue] = reactExports.useState([]);
  const [currentUrl, setCurrentUrl] = reactExports.useState("");
  const [inputUrl, setInputUrl] = reactExports.useState("");
  const [playing, setPlaying] = reactExports.useState(false);
  const addToQueue = /* @__PURE__ */ __name(() => {
    if (!inputUrl) return;
    const newQueue = [...queue, inputUrl];
    setQueue(newQueue);
    setInputUrl("");
    sendSignal("queue_update", { queue: newQueue });
  }, "addToQueue");
  const playNext = /* @__PURE__ */ __name(() => {
    if (queue.length > 0) {
      const next = queue[0];
      const remaining = queue.slice(1);
      setCurrentUrl(next);
      setQueue(remaining);
      setPlaying(true);
      sendSignal("play_track", { url: next, queue: remaining });
    }
  }, "playNext");
  const sendSignal = /* @__PURE__ */ __name((action, payload) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "media_sync", action, payload }));
    }
  }, "sendSignal");
  reactExports.useEffect(() => {
    const handleMessage = /* @__PURE__ */ __name((event) => {
      const data = JSON.parse(event.data);
      if (data.type === "media_sync") {
        if (data.action === "queue_update") setQueue(data.payload.queue);
        if (data.action === "play_track") {
          setCurrentUrl(data.payload.url);
          setQueue(data.payload.queue);
          setPlaying(true);
        }
      }
    }, "handleMessage");
    ws.current?.addEventListener("message", handleMessage);
    return () => ws.current?.removeEventListener("message", handleMessage);
  }, [ws]);
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎵 DJ Odası" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.playerWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { color: "#fff", padding: "20px", textAlign: "center" }, children: "Loading player..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ReactPlayer, { url: currentUrl, playing, controls: true, width: "100%", height: "200px" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.controls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: inputUrl,
          onChange: /* @__PURE__ */ __name((e) => setInputUrl(e.target.value), "onChange"),
          placeholder: "YouTube Şarkı Linki...",
          style: styles.input
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addToQueue, style: styles.addBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: playNext, style: styles.nextBtn, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaForward, {}),
        " Sıradaki"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.queueList, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { children: [
        "Sıradakiler (",
        queue.length,
        ")"
      ] }),
      queue.map((link, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.queueItem, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, { color: "#ccc" }),
        " ",
        link
      ] }, i))
    ] })
  ] }) });
}, "DJModal");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.8)", zIndex: 2e3, display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { background: "#2b2d31", width: "500px", borderRadius: "12px", padding: "20px" },
  header: { display: "flex", justifyContent: "space-between", color: "white", marginBottom: 20 },
  closeBtn: { background: "none", border: "none", color: "white", fontSize: "1.2em", cursor: "pointer" },
  playerWrapper: { marginBottom: 20, borderRadius: "8px", overflow: "hidden" },
  controls: { display: "flex", gap: 10, marginBottom: 20 },
  input: { flex: 1, padding: 8, borderRadius: 4, border: "1px solid #444", background: "#202225", color: "white" },
  addBtn: { padding: "8px 12px", background: "#5865f2", color: "white", border: "none", borderRadius: 4, cursor: "pointer" },
  nextBtn: { padding: "8px 12px", background: "#23a559", color: "white", border: "none", borderRadius: 4, cursor: "pointer" },
  queueList: { maxHeight: 200, overflowY: "auto", color: "#ccc" },
  queueItem: { padding: "8px", borderBottom: "1px solid #444", fontSize: "0.9em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
};
const DJModal_default = React.memo(DJModal);
export {
  DJModal_default as default
};

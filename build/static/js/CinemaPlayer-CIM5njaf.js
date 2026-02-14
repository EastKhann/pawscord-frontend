const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["static/js/media-vendor-BRMiuG2Y.js","static/js/react-core-BiY6fgAJ.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { _ as __vitePreload } from "./media-vendor-BRMiuG2Y.js";
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aL as FaExclamationCircle, aM as FaPause, aN as FaPlay, j as FaLink } from "./icons-vendor-2VDeY8fW.js";
import { o as useVoice } from "./index-DGqPEDt8.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ReactPlayer = reactExports.lazy(() => __vitePreload(() => import("./media-vendor-BRMiuG2Y.js").then((n) => n.i), true ? __vite__mapDeps([0,1]) : void 0));
const CinemaPlayer = /* @__PURE__ */ __name(() => {
  const { cinemaState, sendCinemaSignal, setCinemaState } = useVoice();
  const { url, playing, time, lastSyncAction } = cinemaState;
  const [inputUrl, setInputUrl] = reactExports.useState("");
  const [volume, setVolume] = reactExports.useState(0.8);
  const [error, setError] = reactExports.useState(null);
  const [isReady, setIsReady] = reactExports.useState(false);
  const playerRef = reactExports.useRef(null);
  reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (lastSyncAction === "change_url") {
      setIsReady(false);
      setError(null);
    } else if (lastSyncAction === "play") {
      if (Math.abs(getCurrentTimeSafe() - time) > 2) {
        if (playerRef.current) playerRef.current.seekTo(time);
      }
    }
  }, [url, playing, time, lastSyncAction]);
  const getCurrentTimeSafe = /* @__PURE__ */ __name(() => {
    try {
      return playerRef.current ? playerRef.current.getCurrentTime() : 0;
    } catch {
      return 0;
    }
  }, "getCurrentTimeSafe");
  const handleLoadUrl = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    sendCinemaSignal("change_url", { url: inputUrl });
    setInputUrl("");
  }, "handleLoadUrl");
  const handlePlayPause = /* @__PURE__ */ __name(() => {
    if (playing) {
      sendCinemaSignal("pause");
    } else {
      sendCinemaSignal("play", { time: getCurrentTimeSafe() });
    }
  }, "handlePlayPause");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
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
          onReady: /* @__PURE__ */ __name(() => setIsReady(true), "onReady"),
          onError: /* @__PURE__ */ __name(() => {
            setError("Video oynatılamadı.");
            setIsReady(true);
          }, "onError"),
          onPlay: /* @__PURE__ */ __name(() => {
            if (!playing) sendCinemaSignal("play", { time: getCurrentTimeSafe() });
          }, "onPlay"),
          onPause: /* @__PURE__ */ __name(() => {
            if (playing) sendCinemaSignal("pause");
          }, "onPause")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.controls, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handlePlayPause,
          style: {
            ...styles.btn,
            backgroundColor: playing ? "#da373c" : "#43b581",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { style: { marginLeft: 2 } })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLoadUrl, style: styles.urlForm, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, { style: { color: "#b9bbbe" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: inputUrl,
            onChange: /* @__PURE__ */ __name((e) => setInputUrl(e.target.value), "onChange"),
            placeholder: "YouTube Link...",
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: { ...styles.btn, backgroundColor: "#5865f2", padding: "0 15px" }, children: "Yükle" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                .spinner {
                    border: 4px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top: 4px solid #ffffff;
                    width: 30px; height: 30px;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            ` })
  ] });
}, "CinemaPlayer");
const styles = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "black"
  },
  playerWrapper: {
    flex: 1,
    position: "relative",
    overflow: "hidden"
  },
  controls: {
    padding: "10px",
    display: "flex",
    gap: "10px",
    backgroundColor: "#202225",
    alignItems: "center"
  },
  urlForm: {
    flex: 1,
    display: "flex",
    gap: "8px",
    backgroundColor: "#40444b",
    padding: "5px 10px",
    borderRadius: "4px",
    alignItems: "center"
  },
  input: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "white",
    outline: "none",
    fontSize: "14px"
  },
  btn: {
    border: "none",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
    fontWeight: "bold"
  },
  statusOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    zIndex: 10
  }
};
export {
  CinemaPlayer as default
};

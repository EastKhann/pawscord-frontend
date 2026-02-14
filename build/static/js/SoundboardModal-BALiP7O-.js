var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aK as FaMusic, a as FaTimes, G as FaVolumeUp } from "./icons-vendor-2VDeY8fW.js";
const SoundboardModal = /* @__PURE__ */ __name(({ onClose, fetchWithAuth, apiBaseUrl, sendSignal, absoluteHostUrl }) => {
  const [sounds, setSounds] = reactExports.useState([]);
  reactExports.useEffect(() => {
    fetchWithAuth(`${apiBaseUrl}/sounds/list/`).then((res) => res.json()).then((data) => setSounds(data)).catch((err) => console.error(err));
  }, [apiBaseUrl, fetchWithAuth]);
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  const playSound = /* @__PURE__ */ __name((soundUrl) => {
    const fullUrl = soundUrl.startsWith("http") ? soundUrl : `${absoluteHostUrl}${soundUrl}`;
    sendSignal({ type: "play_sound", url: fullUrl });
    const audio = new Audio(fullUrl);
    audio.volume = 0.5;
    audio.play();
  }, "playSound");
  const fallbackSounds = [
    { id: "f1", name: "Airhorn", file: "https://www.myinstants.com/media/sounds/airhorn.mp3" },
    { id: "f2", name: "Vine Boom", file: "https://www.myinstants.com/media/sounds/vine-boom.mp3" },
    { id: "f3", name: "Alkış", file: "https://www.myinstants.com/media/sounds/applause.mp3" },
    { id: "f4", name: "Bruh", file: "https://www.myinstants.com/media/sounds/movie_1.mp3" },
    { id: "f5", name: "Cricket", file: "https://www.myinstants.com/media/sounds/cricket_2.mp3" },
    { id: "f6", name: "Drum", file: "https://www.myinstants.com/media/sounds/ba-dum-tss.mp3" }
  ];
  const displaySounds = sounds.length > 0 ? sounds : fallbackSounds;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { margin: 0, display: "flex", alignItems: "center", gap: 10, textShadow: "0 0 10px rgba(235, 69, 158, 0.5)" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, { color: "#eb459e" }),
        " Ses Paneli"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.grid, children: displaySounds.map((sound) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => playSound(sound.file), "onClick"), style: styles.soundBtn, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, { size: 24, style: { marginBottom: 5, filter: "drop-shadow(0 0 5px rgba(255,255,255,0.5))" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: sound.name })
    ] }, sound.id)) })
  ] }) });
}, "SoundboardModal");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)", zIndex: 3e3, display: "flex", justifyContent: "center", alignItems: "center" },
  modal: {
    background: "linear-gradient(135deg, rgba(43, 45, 49, 0.9), rgba(30, 31, 34, 0.95))",
    backdropFilter: "blur(20px)",
    width: "90%",
    maxWidth: "500px",
    borderRadius: "16px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5)"
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", color: "white", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "15px" },
  closeBtn: { background: "none", border: "none", color: "#b9bbbe", fontSize: "1.2em", cursor: "pointer", transition: "color 0.2s", ":hover": { color: "#fff" } },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "12px" },
  soundBtn: {
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#dbdee1",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: "0.95em",
    fontWeight: "bold",
    ":hover": {
      backgroundColor: "rgba(235, 69, 158, 0.2)",
      transform: "translateY(-2px)",
      borderColor: "#eb459e",
      color: "white"
    }
  }
};
export {
  SoundboardModal as default
};

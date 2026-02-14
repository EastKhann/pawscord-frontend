var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { m as logger, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const VoiceAudioController = /* @__PURE__ */ __name(({ remoteStreams, remoteVolumes, mutedUsers }) => {
  const [globalAudioEnabled, setGlobalAudioEnabled] = reactExports.useState(() => {
    const saved = localStorage.getItem("pawscord_audio_enabled");
    return saved === "true";
  });
  const enableAudioContext = reactExports.useCallback(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      if (audioContext.state === "suspended") {
        audioContext.resume().then(() => {
          logger.audio("AudioContext resumed successfully");
        });
      }
      setGlobalAudioEnabled(true);
      localStorage.setItem("pawscord_audio_enabled", "true");
      logger.audio("Global audio enabled");
    } catch (err) {
      logger.error("Failed to enable AudioContext:", err);
      toast.error("❌ Ses sistemi başlatılamadı: " + err.message);
    }
  }, []);
  reactExports.useEffect(() => {
    return () => logger.audio("VoiceAudioController UNMOUNTED!");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    !globalAudioEnabled && Object.keys(remoteStreams).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 999999,
      backgroundColor: "rgba(0,0,0,0.9)",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: enableAudioContext,
        style: {
          padding: "12px 24px",
          backgroundColor: "#ff4757",
          color: "white",
          fontWeight: "bold",
          border: "none",
          cursor: "pointer",
          borderRadius: "6px",
          fontSize: "16px",
          transition: "all 0.2s",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
        },
        onMouseOver: /* @__PURE__ */ __name((e) => e.target.style.backgroundColor = "#ee5a6f", "onMouseOver"),
        onMouseOut: /* @__PURE__ */ __name((e) => e.target.style.backgroundColor = "#ff4757", "onMouseOut"),
        children: "🚨 SES SİSTEMİNİ BAŞLAT 🚨"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "none" }, children: Object.entries(remoteStreams).map(([username, stream]) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      AudioPlayer,
      {
        username,
        stream,
        volume: remoteVolumes[username] !== void 0 ? remoteVolumes[username] : 100,
        isMuted: mutedUsers ? mutedUsers.has(username) : false,
        globalEnabled: globalAudioEnabled
      },
      `${username}-${stream.id}-${stream.getAudioTracks().length}`
    )) })
  ] });
}, "VoiceAudioController");
const AudioPlayer = /* @__PURE__ */ __name(({ username, stream, volume, isMuted, globalEnabled }) => {
  const audioRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (stream) {
      const audioTracks = stream.getAudioTracks();
      logger.log(`[AudioPlayer] ${username} has ${audioTracks.length} audio tracks`);
    }
  }, [stream, username]);
  reactExports.useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !stream) return;
    audio.srcObject = stream;
    audio.muted = false;
    const attemptPlay = /* @__PURE__ */ __name(async () => {
      if (!globalEnabled) {
        return;
      }
      try {
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length === 0) {
          logger.warn(`[AudioPlayer] No audio tracks for ${username}`);
          return;
        }
        await audio.play();
        logger.log(`✅ [AudioPlayer] Successfully playing ${username}`);
      } catch (err) {
      }
    }, "attemptPlay");
    attemptPlay();
  }, [stream, username, globalEnabled]);
  reactExports.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const targetVolume = isMuted ? 0 : volume / 100;
    audio.volume = Math.max(0, Math.min(1, targetVolume));
  }, [volume, isMuted, username]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "audio",
    {
      ref: audioRef,
      autoPlay: true,
      playsInline: true,
      style: { display: "none" }
    }
  );
}, "AudioPlayer");
const VoiceAudioController_default = React.memo(VoiceAudioController);
export {
  VoiceAudioController_default as default
};

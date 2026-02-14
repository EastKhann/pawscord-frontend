var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { aM as FaPause, aN as FaPlay, a5 as FaDownload } from "./icons-vendor-2VDeY8fW.js";
const VoiceMessagePlayer = /* @__PURE__ */ __name(({ audioUrl, duration, onDownload, messageId, fetchWithAuth, apiBaseUrl }) => {
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [audioDuration, setAudioDuration] = reactExports.useState(duration || 0);
  const [waveformData, setWaveformData] = reactExports.useState([]);
  const [hasError, setHasError] = reactExports.useState(false);
  const [transcription, setTranscription] = reactExports.useState(null);
  const [isTranscribing, setIsTranscribing] = reactExports.useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = reactExports.useState(audioUrl);
  const [triedProxy, setTriedProxy] = reactExports.useState(false);
  const audioRef = reactExports.useRef(null);
  const animationRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
  }, [audioUrl, currentAudioUrl, triedProxy, apiBaseUrl]);
  reactExports.useEffect(() => {
    if (audioUrl && audioUrl !== currentAudioUrl && !triedProxy) {
      setCurrentAudioUrl(audioUrl);
      setTriedProxy(false);
      setHasError(false);
    }
  }, [audioUrl]);
  const handleTranscribe = /* @__PURE__ */ __name(async () => {
    if (isTranscribing || transcription) return;
    setIsTranscribing(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/messages/${messageId}/transcribe/`, {
        method: "POST"
      });
      if (response.ok) {
        const data = await response.json();
        setTranscription(data.transcription || "Çeviri yapılamadı");
      } else {
        setTranscription("❌ Çeviri başarısız");
      }
    } catch (error) {
      console.error("Transcription error:", error);
      setTranscription("❌ Hata oluştu");
    } finally {
      setIsTranscribing(false);
    }
  }, "handleTranscribe");
  reactExports.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleLoadedMetadata = /* @__PURE__ */ __name(() => {
      setAudioDuration(audio.duration);
      generateWaveform();
      setHasError(false);
    }, "handleLoadedMetadata");
    const handleError = /* @__PURE__ */ __name((e) => {
      const error = audio.error;
      const errorCode = error ? error.code : "unknown";
      const errorMessage = error ? error.message : "No error info";
      console.warn("[VoicePlayer] ❌ Ses dosyası yüklenemedi:", {
        url: currentAudioUrl,
        errorCode,
        errorMessage,
        networkState: audio.networkState,
        readyState: audio.readyState
      });
      if (!triedProxy && currentAudioUrl) {
        let filePath = null;
        if (currentAudioUrl.includes(".r2.dev/")) {
          filePath = currentAudioUrl.split(".r2.dev/")[1];
        } else if (currentAudioUrl.includes("r2.dev/")) {
          const parts = currentAudioUrl.split("r2.dev/");
          filePath = parts[parts.length - 1];
        } else if (currentAudioUrl.includes("/attachments/")) {
          const parts = currentAudioUrl.split("/attachments/");
          filePath = "attachments/" + parts[parts.length - 1];
        }
        if (filePath) {
          const proxyUrl = `${apiBaseUrl || window.location.origin}/api/voice-proxy/${filePath}`;
          setCurrentAudioUrl(proxyUrl);
          setTriedProxy(true);
          setHasError(false);
          return;
        }
      }
      setHasError(true);
    }, "handleError");
    const handleCanPlay = /* @__PURE__ */ __name(() => {
    }, "handleCanPlay");
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("error", handleError);
    audio.addEventListener("canplay", handleCanPlay);
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [currentAudioUrl, triedProxy, apiBaseUrl]);
  const generateWaveform = reactExports.useCallback(() => {
    const bars = 40;
    const data = [];
    for (let i = 0; i < bars; i++) {
      const baseHeight = Math.random() * 0.5 + 0.3;
      const variance = Math.sin(i / 5) * 0.2;
      data.push(Math.max(0.2, Math.min(1, baseHeight + variance)));
    }
    setWaveformData(data);
  }, []);
  const togglePlayPause = reactExports.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animationRef.current);
    } else {
      audio.play();
      updateProgress();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);
  const updateProgress = reactExports.useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    if (!audio.paused) {
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  }, []);
  const handleWaveformClick = reactExports.useCallback((e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * audioDuration;
    setCurrentTime(audio.currentTime);
  }, [audioDuration]);
  reactExports.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleEnded = /* @__PURE__ */ __name(() => {
      setIsPlaying(false);
      setCurrentTime(0);
      cancelAnimationFrame(animationRef.current);
    }, "handleEnded");
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);
  const formatTime = /* @__PURE__ */ __name((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, "formatTime");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    hasError ? (
      /* 📛 Error State */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.errorContainer, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.errorIcon, children: "🔇" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.errorText, children: "Ses dosyası bulunamadı (eski mesaj)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontSize: "10px", color: "#72767d", marginTop: "4px", wordBreak: "break-all" }, children: [
          audioUrl?.substring(0, 80),
          "..."
        ] })
      ] })
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, src: currentAudioUrl, preload: "metadata", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: togglePlayPause, style: styles.playButton, children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { style: { marginLeft: "2px" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.waveformContainer, onClick: handleWaveformClick, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.waveform, children: waveformData.map((height, index) => {
          const progress = currentTime / audioDuration;
          const barProgress = index / waveformData.length;
          const isActive = barProgress <= progress;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              style: {
                ...styles.waveBar,
                height: `${height * 100}%`,
                backgroundColor: isActive ? "#5865f2" : "#4f545c",
                opacity: isActive ? 1 : 0.5
              }
            },
            index
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.timeDisplay, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTime(currentTime) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#72767d" }, children: [
            " / ",
            formatTime(audioDuration)
          ] })
        ] })
      ] }),
      onDownload && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onDownload, style: styles.downloadButton, title: "İndir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}) }),
      messageId && fetchWithAuth && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: handleTranscribe,
          disabled: isTranscribing || !!transcription,
          style: {
            ...styles.downloadButton,
            backgroundColor: transcription ? "rgba(67, 181, 129, 0.1)" : "transparent",
            color: isTranscribing ? "#faa61a" : transcription ? "#43b581" : "#b9bbbe",
            cursor: isTranscribing || transcription ? "default" : "pointer"
          },
          title: transcription ? "Çevrildi" : "Metne Çevir",
          children: isTranscribing ? "⏳" : transcription ? "✅" : "📝"
        }
      )
    ] }),
    transcription && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.transcriptionText, children: transcription })
  ] });
}, "VoiceMessagePlayer");
const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "rgba(88, 101, 242, 0.08)",
    border: "1px solid rgba(88, 101, 242, 0.2)",
    borderRadius: "12px",
    padding: "12px 16px",
    maxWidth: "400px",
    transition: "all 0.2s"
  },
  playButton: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#5865f2",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
    flexShrink: 0
  },
  waveformContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    cursor: "pointer",
    minWidth: 0
  },
  waveform: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    height: "32px"
  },
  waveBar: {
    flex: 1,
    minWidth: "2px",
    borderRadius: "2px",
    transition: "all 0.15s ease-out"
  },
  timeDisplay: {
    fontSize: "11px",
    color: "#dcddde",
    fontWeight: "500"
  },
  downloadButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "transparent",
    color: "#b9bbbe",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "14px",
    transition: "all 0.2s",
    flexShrink: 0
  },
  errorContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "4px",
    width: "100%"
  },
  errorIcon: {
    fontSize: "20px",
    opacity: 0.5
  },
  errorText: {
    fontSize: "12px",
    color: "#72767d",
    fontStyle: "italic"
  },
  transcriptionText: {
    marginTop: "8px",
    padding: "8px 12px",
    backgroundColor: "rgba(79, 84, 92, 0.3)",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#dcddde",
    lineHeight: "1.4",
    fontStyle: "italic"
  }
};
const VoiceMessagePlayer_default = React.memo(VoiceMessagePlayer);
export {
  VoiceMessagePlayer_default as default
};

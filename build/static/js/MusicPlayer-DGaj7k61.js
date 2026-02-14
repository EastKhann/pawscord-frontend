var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bZ as FaYoutube, bU as FaSpotify, ca as FaRandom, cs as FaStepBackward, aM as FaPause, aN as FaPlay, ct as FaStepForward, I as FaRedo, cu as FaListUl, an as FaPlus, au as FaVolumeMute, G as FaVolumeUp, a as FaTimes } from "./icons-vendor-2VDeY8fW.js";
import { s as API_BASE_URL, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const MusicPlayer = /* @__PURE__ */ __name(({ channelId }) => {
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTrack, setCurrentTrack] = reactExports.useState(null);
  const [queue, setQueue] = reactExports.useState([]);
  const [volume, setVolume] = reactExports.useState(70);
  const [isMuted, setIsMuted] = reactExports.useState(false);
  const [shuffle, setShuffle] = reactExports.useState(false);
  const [repeat, setRepeat] = reactExports.useState(false);
  const [showQueue, setShowQueue] = reactExports.useState(false);
  const [showAddTrack, setShowAddTrack] = reactExports.useState(false);
  const [trackUrl, setTrackUrl] = reactExports.useState("");
  const [progress, setProgress] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const audioRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    fetchPlayerStatus();
    const interval = setInterval(() => {
      if (isPlaying && audioRef.current) {
        setProgress(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    }, 1e3);
    return () => clearInterval(interval);
  }, [isPlaying]);
  const fetchPlayerStatus = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/music/${channelId}/status/`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentTrack(data.current_track);
        setQueue(data.queue || []);
        setIsPlaying(data.is_playing);
        setVolume(data.volume || 70);
      }
    } catch (error) {
      console.error("Failed to fetch player status:", error);
    }
  }, "fetchPlayerStatus");
  const handlePlayPause = /* @__PURE__ */ __name(async () => {
    try {
      const endpoint = isPlaying ? "pause" : "play";
      const response = await fetch(`${API_BASE_URL}/music/${channelId}/${endpoint}/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        setIsPlaying(!isPlaying);
        toast.success(isPlaying ? "⏸️ Durakladı" : "▶️ Çalıyor");
      }
    } catch (error) {
      toast.error("❌ İşlem başarısız");
    }
  }, "handlePlayPause");
  const handleNext = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/music/${channelId}/skip/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentTrack(data.current_track);
        toast.success("⏭️ Sonraki şarkı");
      }
    } catch (error) {
      toast.error("❌ Atlama başarısız");
    }
  }, "handleNext");
  const handlePrevious = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/music/${channelId}/previous/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentTrack(data.current_track);
        toast.success("⏮️ Önceki şarkı");
      }
    } catch (error) {
      toast.error("❌ Geri alma başarısız");
    }
  }, "handlePrevious");
  const handleVolumeChange = /* @__PURE__ */ __name(async (newVolume) => {
    setVolume(newVolume);
    try {
      await fetch(`${API_BASE_URL}/music/${channelId}/volume/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ volume: newVolume })
      });
    } catch (error) {
      console.error("Volume change failed:", error);
    }
  }, "handleVolumeChange");
  const handleAddTrack = /* @__PURE__ */ __name(async () => {
    if (!trackUrl.trim()) {
      toast.error("❌ URL girin");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/music/${channelId}/add/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: trackUrl })
      });
      if (response.ok) {
        const data = await response.json();
        setQueue([...queue, data.track]);
        setTrackUrl("");
        setShowAddTrack(false);
        toast.success("✅ Sıraya eklendi");
      } else {
        toast.error("❌ Eklenemedi");
      }
    } catch (error) {
      toast.error("❌ Bağlantı hatası");
    }
  }, "handleAddTrack");
  const removeFromQueue = /* @__PURE__ */ __name(async (trackId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/music/${channelId}/remove/${trackId}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      if (response.ok) {
        setQueue(queue.filter((t) => t.id !== trackId));
        toast.success("✅ Sıradan çıkarıldı");
      }
    } catch (error) {
      toast.error("❌ İşlem başarısız");
    }
  }, "removeFromQueue");
  const formatTime = /* @__PURE__ */ __name((seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, "formatTime");
  const handleSeek = /* @__PURE__ */ __name((e) => {
    const newProgress = e.target.value / 100 * duration;
    setProgress(newProgress);
    if (audioRef.current) {
      audioRef.current.currentTime = newProgress;
    }
  }, "handleSeek");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "music-player", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { ref: audioRef, src: currentTrack?.audio_url }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-main", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "track-info", children: currentTrack ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: currentTrack.thumbnail || "/default-music.png",
            alt: currentTrack.title,
            className: "track-thumbnail"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "track-details", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "track-title", children: currentTrack.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "track-artist", children: currentTrack.artist || "Bilinmeyen Sanatçı" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "track-source", children: [
          currentTrack.source === "youtube" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaYoutube, { className: "source-icon youtube" }),
          currentTrack.source === "spotify" && /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpotify, { className: "source-icon spotify" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-track", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Şarkı seçilmedi" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-controls", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "control-buttons", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `control-btn ${shuffle ? "active" : ""}`,
              onClick: /* @__PURE__ */ __name(() => setShuffle(!shuffle), "onClick"),
              title: "Karıştır",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRandom, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "control-btn", onClick: handlePrevious, title: "Önceki", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStepBackward, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "control-btn play-btn", onClick: handlePlayPause, children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "control-btn", onClick: handleNext, title: "Sonraki", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaStepForward, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: `control-btn ${repeat ? "active" : ""}`,
              onClick: /* @__PURE__ */ __name(() => setRepeat(!repeat), "onClick"),
              title: "Tekrarla",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaRedo, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "progress-container", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "time-display", children: formatTime(progress) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              className: "progress-bar",
              min: "0",
              max: "100",
              value: progress / duration * 100 || 0,
              onChange: handleSeek
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "time-display", children: formatTime(duration) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "player-extras", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "extra-btn",
            onClick: /* @__PURE__ */ __name(() => setShowQueue(!showQueue), "onClick"),
            title: "Sıra",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaListUl, {}),
              queue.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "queue-count", children: queue.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "extra-btn",
            onClick: /* @__PURE__ */ __name(() => setShowAddTrack(!showAddTrack), "onClick"),
            title: "Şarkı Ekle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "volume-control", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "extra-btn",
              onClick: /* @__PURE__ */ __name(() => setIsMuted(!isMuted), "onClick"),
              children: isMuted || volume === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeMute, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              className: "volume-slider",
              min: "0",
              max: "100",
              value: isMuted ? 0 : volume,
              onChange: /* @__PURE__ */ __name((e) => handleVolumeChange(parseInt(e.target.value)), "onChange")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "volume-display", children: [
            isMuted ? 0 : volume,
            "%"
          ] })
        ] })
      ] })
    ] }),
    showQueue && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "queue-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "queue-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "Sıra (",
          queue.length,
          ")"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: /* @__PURE__ */ __name(() => setShowQueue(false), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "queue-list", children: queue.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "queue-empty", children: "Sıra boş" }) : queue.map((track, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "queue-item", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "queue-index", children: index + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: track.thumbnail, alt: track.title, className: "queue-thumbnail" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "queue-track-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "queue-track-title", children: track.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "queue-track-artist", children: track.artist || "Bilinmeyen" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "remove-btn",
            onClick: /* @__PURE__ */ __name(() => removeFromQueue(track.id), "onClick"),
            title: "Sıradan Çıkar",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
          }
        )
      ] }, track.id)) })
    ] }),
    showAddTrack && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "add-track-modal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "add-track-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Şarkı Ekle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          className: "track-url-input",
          placeholder: "YouTube veya Spotify URL'si girin...",
          value: trackUrl,
          onChange: /* @__PURE__ */ __name((e) => setTrackUrl(e.target.value), "onChange"),
          onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && handleAddTrack(), "onKeyPress")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "modal-actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-cancel", onClick: /* @__PURE__ */ __name(() => setShowAddTrack(false), "onClick"), children: "İptal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-add", onClick: handleAddTrack, children: "Ekle" })
      ] })
    ] }) })
  ] });
}, "MusicPlayer");
export {
  MusicPlayer as default
};

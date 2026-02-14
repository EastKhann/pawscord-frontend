var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { bU as FaSpotify, a9 as FaCheck, b$ as FaUnlink, aK as FaMusic, aN as FaPlay, aM as FaPause } from "./icons-vendor-2VDeY8fW.js";
function SpotifyIntegrationPanel({ apiBaseUrl, fetchWithAuth }) {
  const [connected, setConnected] = reactExports.useState(false);
  const [currentTrack, setCurrentTrack] = reactExports.useState(null);
  const [showActivity, setShowActivity] = reactExports.useState(true);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  reactExports.useEffect(() => {
    checkSpotifyConnection();
    if (connected) {
      fetchCurrentTrack();
      const interval = setInterval(fetchCurrentTrack, 3e4);
      return () => clearInterval(interval);
    }
  }, [connected]);
  const checkSpotifyConnection = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/auth/spotify/status/`);
      if (response.ok) {
        const data = await response.json();
        setConnected(data.connected);
        setShowActivity(data.show_activity);
      }
    } catch (err) {
      console.error("Error checking Spotify connection:", err);
    }
  }, "checkSpotifyConnection");
  const connectSpotify = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/auth/spotify/start/`);
      if (response.ok) {
        const data = await response.json();
        window.location.href = data.url || data.auth_url;
      }
    } catch (err) {
      setError("Failed to connect: " + err.message);
    } finally {
      setLoading(false);
    }
  }, "connectSpotify");
  const disconnectSpotify = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/auth/spotify/disconnect/`, {
        method: "POST"
      });
      if (response.ok) {
        setConnected(false);
        setCurrentTrack(null);
        setError("");
      }
    } catch (err) {
      setError("Failed to disconnect: " + err.message);
    } finally {
      setLoading(false);
    }
  }, "disconnectSpotify");
  const fetchCurrentTrack = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/spotify/current-track/`);
      if (response.ok) {
        const data = await response.json();
        setCurrentTrack(data.track);
      }
    } catch (err) {
      console.error("Error fetching current track:", err);
    }
  }, "fetchCurrentTrack");
  const toggleActivityStatus = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/spotify/toggle-activity/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ show_activity: !showActivity })
      });
      if (response.ok) {
        setShowActivity(!showActivity);
      }
    } catch (err) {
      setError("Failed to toggle activity: " + err.message);
    }
  }, "toggleActivityStatus");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spotify-panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spotify-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpotify, { className: "spotify-icon" }),
      " Spotify Integration"
    ] }) }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spotify-error", children: error }),
    !connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spotify-connect", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spotify-logo-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpotify, { className: "spotify-logo" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Connect Your Spotify" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Share what you're listening to with your friends!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "connect-btn",
          onClick: connectSpotify,
          disabled: loading,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpotify, {}),
            " Connect Spotify"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spotify-features", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Show currently playing track" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Display in your status" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "feature-item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "check-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Privacy controls" })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spotify-connected", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-status", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheck, { className: "status-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Connected to Spotify" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "disconnect-btn",
            onClick: disconnectSpotify,
            disabled: loading,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaUnlink, {}),
              " Disconnect"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "activity-toggle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-label", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "checkbox",
            checked: showActivity,
            onChange: toggleActivityStatus
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-slider" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-text", children: "Show listening activity" })
      ] }) }),
      currentTrack ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "current-track", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "track-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, { className: "music-icon" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Now Playing" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "track-info", children: [
          currentTrack.album_art && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: currentTrack.album_art,
              alt: "Album art",
              className: "album-art"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "track-details", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "track-name", children: currentTrack.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "track-artist", children: currentTrack.artist }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "track-album", children: currentTrack.album })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "track-status", children: currentTrack.is_playing ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { className: "playing-icon" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaPause, { className: "paused-icon" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "track-progress", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "progress-bar",
            style: { width: `${currentTrack.progress_percent || 0}%` }
          }
        ) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-track", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, { className: "no-track-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Not playing anything right now" })
      ] })
    ] })
  ] });
}
__name(SpotifyIntegrationPanel, "SpotifyIntegrationPanel");
export {
  SpotifyIntegrationPanel as default
};

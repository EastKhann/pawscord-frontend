var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { v as FaSpinner, a as FaTimes, j as FaLink, a8 as FaGamepad, bU as FaSpotify, bV as FaSteam, bW as FaXbox, bX as FaTwitch, bY as FaGithub, bZ as FaYoutube, b_ as FaDiscord, aK as FaMusic, aL as FaExclamationCircle, w as FaCheckCircle, b$ as FaUnlink } from "./icons-vendor-2VDeY8fW.js";
import { a as useAuth, g as getApiBase, t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ConnectionsPanel = /* @__PURE__ */ __name(({ onClose }) => {
  const { token, user } = useAuth();
  const [connections, setConnections] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(true);
  const [connecting, setConnecting] = reactExports.useState(null);
  const popupIntervalRef = reactExports.useRef(null);
  const popupTimeoutRef = reactExports.useRef(null);
  const API_URL = getApiBase().replace("/api", "");
  const platforms = [
    {
      id: "spotify",
      name: "Spotify",
      icon: FaSpotify,
      color: "#1DB954",
      description: "Dinlediğin müziği profilinde göster",
      oauth: true,
      features: ["Now Playing", "Rich Presence"]
    },
    {
      id: "steam",
      name: "Steam",
      icon: FaSteam,
      color: "#171A21",
      description: "Oynadığın oyunları profilinde göster",
      oauth: true,
      features: ["Game Activity", "Rich Presence", "Achievements"]
    },
    {
      id: "xbox",
      name: "Xbox",
      icon: FaXbox,
      color: "#107C10",
      description: "Xbox Live hesabını bağla",
      oauth: true,
      features: ["Gamertag", "Game Activity", "Achievements"]
    },
    {
      id: "twitch",
      name: "Twitch",
      icon: FaTwitch,
      color: "#9146FF",
      description: "Twitch yayın durumunu göster",
      oauth: true,
      features: ["Stream Status", "Rich Presence"]
    },
    {
      id: "github",
      name: "GitHub",
      icon: FaGithub,
      color: "#333333",
      description: "GitHub profilini bağla",
      oauth: true,
      features: ["Repositories", "Contributions", "Profile"]
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: FaYoutube,
      color: "#FF0000",
      description: "YouTube kanalını bağla",
      oauth: true,
      features: ["Channel", "Subscribers", "Videos"]
    },
    {
      id: "discord",
      name: "Discord",
      icon: FaDiscord,
      color: "#5865F2",
      description: "Discord hesabını bağla (migration)",
      oauth: true,
      features: ["Profile", "Friends Import"]
    }
    // Yakında eklenecek platformlar:
    // PlayStation, Epic Games, Battle.net, Riot Games, Twitter
  ];
  const loadConnections = reactExports.useCallback(async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1e4);
    try {
      const response = await fetch(`${API_URL}/api/connections/status/`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (response.ok) {
        const data = await response.json();
        setConnections(data.connections || {});
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Connections loading timeout (10s)");
        toast.error("Bağlantılar yüklenemedi - zaman aşımı");
      } else {
        console.error("Failed to load connections:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [token, API_URL]);
  reactExports.useEffect(() => {
    loadConnections();
    return () => {
      if (popupIntervalRef.current) clearInterval(popupIntervalRef.current);
      if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    };
  }, [loadConnections]);
  const handleConnect = /* @__PURE__ */ __name((platformId) => {
    if (popupIntervalRef.current) clearInterval(popupIntervalRef.current);
    if (popupTimeoutRef.current) clearTimeout(popupTimeoutRef.current);
    setConnecting(platformId);
    const width = 500;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      `${API_URL}/api/auth/${platformId}/start/?username=${user?.username || "anonymous"}`,
      `${platformId}_oauth`,
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no`
    );
    if (!popup) {
      toast.error("Popup blocker tarafından engellendi. Lütfen popup'lara izin verin.");
      setConnecting(null);
      return;
    }
    popupIntervalRef.current = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupIntervalRef.current);
        popupIntervalRef.current = null;
        setConnecting(null);
        loadConnections();
        toast.success(`${platformId} bağlantısı kontrol ediliyor...`);
      }
    }, 500);
    popupTimeoutRef.current = setTimeout(() => {
      if (popupIntervalRef.current) {
        clearInterval(popupIntervalRef.current);
        popupIntervalRef.current = null;
      }
      if (!popup.closed) {
        popup.close();
      }
      setConnecting(null);
    }, 12e4);
  }, "handleConnect");
  const handleDisconnect = /* @__PURE__ */ __name(async (platformId) => {
    if (!confirm(`${platformId} bağlantısını kesmek istediğinize emin misiniz?`)) {
      return;
    }
    setConnecting(platformId);
    try {
      const response = await fetch(`${API_URL}/api/connections/${platformId}/disconnect/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        toast.success(`${platformId} bağlantısı kesildi`);
        loadConnections();
      } else {
        toast.error("Bağlantı kesilemedi");
      }
    } catch (error) {
      console.error("Disconnect error:", error);
      toast.error("Bağlantı kesme hatası");
    } finally {
      setConnecting(null);
    }
  }, "handleDisconnect");
  const renderPlatform = /* @__PURE__ */ __name((platform) => {
    const connection = connections[platform.id];
    const isConnected = connection?.connected;
    const isConnecting = connecting === platform.id;
    const Icon = platform.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `connection-card ${isConnected ? "connected" : ""}`,
        style: { "--platform-color": platform.color },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "platform-icon", style: { backgroundColor: platform.color }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "platform-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: platform.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: platform.description })
            ] })
          ] }),
          isConnected && connection.username && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-details", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "connected-as", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaCheckCircle, { className: "status-icon success" }),
              "Bağlı: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: connection.username })
            ] }),
            connection.data && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-data", children: [
              connection.data.game && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "activity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, {}),
                " ",
                connection.data.game
              ] }),
              connection.data.track && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "activity", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, {}),
                " ",
                connection.data.track
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "connection-features", children: platform.features.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "feature-tag", children: feature }, feature)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "connection-actions", children: isConnected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "disconnect-btn",
              onClick: /* @__PURE__ */ __name(() => handleDisconnect(platform.id), "onClick"),
              disabled: isConnecting,
              children: [
                isConnecting ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaUnlink, {}),
                "Bağlantıyı Kes"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "connect-btn",
              onClick: /* @__PURE__ */ __name(() => handleConnect(platform.id), "onClick"),
              disabled: isConnecting,
              style: { backgroundColor: platform.color },
              children: [
                isConnecting ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
                "Bağlan"
              ]
            }
          ) })
        ]
      },
      platform.id
    );
  }, "renderPlatform");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "connections-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "connections-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connections-panel loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaSpinner, { className: "spin large" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bağlantılar yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "connections-modal-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connections-modal", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "connections-close-btn", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connections-panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connections-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
          " Bağlantılar"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hesaplarını bağlayarak profilini zenginleştir ve aktivitelerini göster" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connections-grid", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "section-title", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaGamepad, {}),
            " Oyun Platformları"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "platforms-grid", children: platforms.filter((p) => ["steam", "epic", "xbox", "playstation", "battlenet", "riot"].includes(p.id)).map(renderPlatform) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "section-title", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaMusic, {}),
            " Müzik & Streaming"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "platforms-grid", children: platforms.filter((p) => ["spotify", "twitch", "youtube"].includes(p.id)).map(renderPlatform) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "connection-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "section-title", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaLink, {}),
            " Sosyal Medya"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "platforms-grid", children: platforms.filter((p) => ["discord", "twitter", "github"].includes(p.id)).map(renderPlatform) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "connections-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "privacy-note", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaExclamationCircle, {}),
        "Bağlantılar sadece izin verdiğin bilgilere erişir. İstediğin zaman bağlantıyı kesebilirsin."
      ] }) })
    ] })
  ] }) });
}, "ConnectionsPanel");
export {
  ConnectionsPanel as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports, a as React } from "./react-core-BiY6fgAJ.js";
import { o as useVoice, a as useAuth, P as PRODUCTION_URL, p as useResponsive, t as toast } from "./index-DGqPEDt8.js";
import UserContextMenu from "./UserContextMenu-D-FXCTVo.js";
import VoiceSettingsPanel from "./VoiceSettingsPanel-C5MXlqa8.js";
import { S as SparkMD5 } from "./crypto-vendor-NANfm9jb.js";
import { D as Draggable } from "./cjs-B_ypQz0b.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const useVideoAudio = /* @__PURE__ */ __name((stream, user) => {
  const videoRef = reactExports.useRef(null);
  const audioRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  reactExports.useEffect(() => {
    if (audioRef.current && stream && !user.isLocal) {
      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        audioRef.current.srcObject = new MediaStream(audioTracks);
        const volumePercent = user.volume || 100;
        if (volumePercent <= 100) {
          audioRef.current.volume = Math.max(0, volumePercent / 100);
        } else {
          audioRef.current.volume = 1;
          try {
            const audio = audioRef.current;
            if (!audio._audioContext) {
              audio._audioContext = new (window.AudioContext || window.webkitAudioContext)();
              audio._sourceNode = audio._audioContext.createMediaElementSource(audio);
              audio._gainNode = audio._audioContext.createGain();
              audio._sourceNode.connect(audio._gainNode);
              audio._gainNode.connect(audio._audioContext.destination);
            }
            audio._gainNode.gain.value = volumePercent / 100;
          } catch (e) {
            console.warn("[Volume] GainNode amplification failed:", e);
          }
        }
      }
    }
  }, [stream, user.isLocal, user.username, user.volume]);
  return { videoRef, audioRef };
}, "useVideoAudio");
const getDeterministicAvatarFallback = /* @__PURE__ */ __name((username, size = 256) => {
  if (!username) return `https://ui-avatars.com/api/?name=User&background=5865f2&color=fff&bold=true&size=${size}`;
  const hash = SparkMD5.hash(username);
  const hue = parseInt(hash.substring(0, 8), 16) % 360;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${hue.toString(16).padStart(2, "0")}${((hue + 60) % 360).toString(16).padStart(2, "0")}${((hue + 120) % 360).toString(16).padStart(2, "0")}&color=fff&bold=true&size=${size}`;
}, "getDeterministicAvatarFallback");
const VideoDisplay = /* @__PURE__ */ __name(({ user, stream, videoRef, getUserAvatar, badge }) => {
  const hasVideo = stream && stream.active && stream.getVideoTracks().length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    width: "100%",
    height: "100%",
    background: "#1a1a1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, children: [
    badge,
    hasVideo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "video",
      {
        ref: videoRef,
        autoPlay: true,
        playsInline: true,
        muted: user.isLocal === true,
        style: {
          width: "100%",
          height: "100%",
          objectFit: user.streamType === "screen" ? "contain" : "cover",
          backgroundColor: user.streamType === "screen" ? "#000" : "#1a1a1a"
        }
      }
    ) : (
      // 🔥 Camera off — large avatar with talking animation
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "linear-gradient(135deg, #36393f 0%, #2f3136 50%, #202225 100%)",
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          position: "relative",
          padding: "8px",
          borderRadius: "50%",
          background: user.isTalking ? "linear-gradient(135deg, #43b581, #3ca374)" : "transparent",
          boxShadow: user.isTalking ? "0 0 20px rgba(67, 181, 129, 0.6), 0 0 40px rgba(67, 181, 129, 0.3)" : "none",
          transition: "all 0.3s ease",
          animation: user.isTalking ? "talkingPulse 1s ease-in-out infinite" : "none"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: getUserAvatar(user.username),
            alt: user.username,
            onError: /* @__PURE__ */ __name((e) => {
              e.target.onerror = null;
              e.target.src = getDeterministicAvatarFallback(user.username, 256);
            }, "onError"),
            style: {
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "5px solid #40444b",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
              display: "block"
            },
            loading: "lazy"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          color: "#fff",
          fontSize: "18px",
          fontWeight: 700,
          textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
          letterSpacing: "0.5px"
        }, children: user.username }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          background: user.isMuted ? "rgba(240, 71, 71, 0.2)" : "rgba(67, 181, 129, 0.2)",
          borderRadius: "16px",
          border: user.isMuted ? "1px solid rgba(240, 71, 71, 0.4)" : "1px solid rgba(67, 181, 129, 0.4)"
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "16px" }, children: user.isMuted ? "🔇" : "🎤" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
            color: user.isMuted ? "#f04747" : "#43b581",
            fontSize: "13px",
            fontWeight: 600
          }, children: user.isMuted ? "Sessiz" : user.isTalking ? "Konuşuyor..." : "Dinliyor" })
        ] })
      ] })
    )
  ] });
}, "VideoDisplay");
const UserOverlay = /* @__PURE__ */ __name(({ user, isActive, connectionQuality }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    background: "linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent)",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    zIndex: 10
  }, children: [
    user.isTalking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: "3px"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "3px",
        height: "12px",
        background: "#43b581",
        borderRadius: "2px",
        animation: "wave1 0.6s ease-in-out infinite"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "3px",
        height: "16px",
        background: "#43b581",
        borderRadius: "2px",
        animation: "wave2 0.6s ease-in-out infinite 0.1s"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "3px",
        height: "12px",
        background: "#43b581",
        borderRadius: "2px",
        animation: "wave3 0.6s ease-in-out infinite 0.2s"
      } })
    ] }),
    !user.isLocal && connectionQuality && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        title: `RTT: ${connectionQuality.rtt}ms, Packet Loss: ${connectionQuality.packetLoss}%`,
        style: {
          fontSize: "16px",
          filter: connectionQuality.quality === "excellent" ? "none" : connectionQuality.quality === "good" ? "hue-rotate(30deg)" : "hue-rotate(90deg) saturate(2)",
          opacity: 0.9
        },
        children: connectionQuality.quality === "excellent" ? "📶" : connectionQuality.quality === "good" ? "📶" : "⚠️"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        onClick: /* @__PURE__ */ __name((e) => {
          e.stopPropagation();
          if (!user.isLocal) {
            if (window.openUserProfile) {
              window.openUserProfile(user.username);
            } else {
              window.location.hash = `#/profile/${user.username}`;
            }
          }
        }, "onClick"),
        style: {
          color: "#fff",
          fontSize: "14px",
          fontWeight: 600,
          flex: 1,
          cursor: user.isLocal ? "default" : "pointer",
          textDecoration: user.isLocal ? "none" : "underline",
          textDecorationColor: "rgba(255, 255, 255, 0.3)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        },
        children: [
          user.username,
          " ",
          user.streamType === "screen" && "🖥️ Ekran"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "6px" }, children: [
      user.isMuted && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "16px" }, children: "🔇" }),
      user.streamType === "camera" && user.isCameraOn && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "16px" }, children: "📹" }),
      isActive && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "16px" }, children: "🔊" })
    ] })
  ] });
}, "UserOverlay");
const ActionButton = /* @__PURE__ */ __name(({ icon, onClick, title, bgColor = "rgba(0, 0, 0, 0.7)" }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick,
      title,
      style: {
        background: bgColor,
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "8px",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "14px",
        color: "#fff",
        fontWeight: "bold",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
      },
      onMouseEnter: /* @__PURE__ */ __name((e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(255, 255, 255, 0.3)";
      }, "onMouseEnter"),
      onMouseLeave: /* @__PURE__ */ __name((e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.3)";
      }, "onMouseLeave"),
      children: icon
    }
  );
}, "ActionButton");
const HoverControls = /* @__PURE__ */ __name(({ user, isPinned, onPin, onExpand, showFullControls, videoRef }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    position: "absolute",
    top: "12px",
    right: "12px",
    display: "flex",
    gap: "6px",
    opacity: showFullControls ? 1 : 0,
    transition: "opacity 0.25s ease, transform 0.25s ease",
    transform: showFullControls ? "translateY(0)" : "translateY(-6px)",
    zIndex: 20,
    pointerEvents: showFullControls ? "auto" : "none"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionButton,
      {
        icon: isPinned ? "📌" : "📍",
        onClick: /* @__PURE__ */ __name((e) => {
          e.stopPropagation();
          onPin();
        }, "onClick"),
        title: isPinned ? "Sabitlemeyi Kaldır" : "Sabitle",
        bgColor: "rgba(88, 101, 242, 0.9)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionButton,
      {
        icon: "⛶",
        onClick: /* @__PURE__ */ __name((e) => {
          e.stopPropagation();
          onExpand();
        }, "onClick"),
        title: "Panelde Genişlet",
        bgColor: "rgba(67, 181, 129, 0.9)"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionButton,
      {
        icon: "🖥️",
        onClick: /* @__PURE__ */ __name((e) => {
          e.stopPropagation();
          const videoElement = videoRef.current;
          if (videoElement) {
            const parentDiv = videoElement.parentElement?.parentElement;
            const element = parentDiv || videoElement;
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
              element.msRequestFullscreen();
            }
          }
        }, "onClick"),
        title: "Tam Ekran İzle",
        bgColor: "rgba(250, 166, 26, 0.9)"
      }
    ),
    !user.isLocal && showFullControls && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      background: "rgba(0, 0, 0, 0.9)",
      borderRadius: "10px",
      padding: "6px 10px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      minWidth: "100px",
      backdropFilter: "blur(8px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      animation: "fadeIn 0.2s ease"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "12px" }, children: (user.volume || 100) === 0 ? "🔇" : (user.volume || 100) > 100 ? "🔊" : "🔉" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "range",
          min: "0",
          max: "200",
          value: user.volume || 100,
          onChange: /* @__PURE__ */ __name((e) => {
            e.stopPropagation();
            if (user.onVolumeChange) {
              user.onVolumeChange(parseInt(e.target.value));
            }
          }, "onChange"),
          style: {
            flex: 1,
            cursor: "pointer",
            height: "4px"
          },
          onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { fontSize: "10px", color: "#fff", minWidth: "30px", fontWeight: 600 }, children: [
        user.volume || 100,
        "%"
      ] })
    ] })
  ] });
}, "HoverControls");
const UserVideoCard = React.memo(({
  user,
  stream,
  isActive,
  isPinned,
  onExpand,
  onPin,
  onContextMenu,
  compact = false,
  badge,
  connectionQuality,
  getUserAvatar
}) => {
  const { videoRef, audioRef } = useVideoAudio(stream, user);
  const [showFullControls, setShowFullControls] = reactExports.useState(false);
  const handleRightClick = reactExports.useCallback((e) => {
    e.preventDefault();
    if (onContextMenu && user.username !== user.isLocal) {
      onContextMenu({
        user,
        position: { x: e.clientX, y: e.clientY }
      });
    }
  }, [onContextMenu, user]);
  const handleClick = reactExports.useCallback((e) => {
    if (!user.isLocal && onContextMenu) {
      onContextMenu({
        user,
        position: { x: e.clientX, y: e.clientY }
      });
    }
  }, [user, onContextMenu]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onContextMenu: handleRightClick,
      onClick: handleClick,
      onMouseEnter: /* @__PURE__ */ __name(() => setShowFullControls(true), "onMouseEnter"),
      onMouseLeave: /* @__PURE__ */ __name(() => setShowFullControls(false), "onMouseLeave"),
      style: {
        background: "linear-gradient(135deg, #2c2f33 0%, #23272a 100%)",
        borderRadius: "16px",
        overflow: "hidden",
        position: "relative",
        border: isActive ? "3px solid #43b581" : isPinned ? "3px solid #5865f2" : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: isActive ? "0 0 20px rgba(67, 181, 129, 0.5)" : "0 4px 16px rgba(0, 0, 0, 0.3)",
        transition: "all 0.3s ease",
        cursor: user.isLocal ? "default" : "pointer",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      },
      children: [
        !user.isLocal && stream && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "audio",
          {
            ref: audioRef,
            autoPlay: true,
            playsInline: true,
            "data-username": user.username,
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          VideoDisplay,
          {
            user,
            stream,
            videoRef,
            getUserAvatar,
            badge
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserOverlay,
          {
            user,
            isActive,
            connectionQuality
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          HoverControls,
          {
            user,
            isPinned,
            onPin,
            onExpand,
            showFullControls,
            videoRef
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                div:hover .hover-actions {
                    opacity: 1;
                }
            ` })
      ]
    }
  );
}, (prevProps, nextProps) => {
  return prevProps.user.username === nextProps.user.username && prevProps.stream === nextProps.stream && prevProps.user.isCameraOn === nextProps.user.isCameraOn && prevProps.user.isScreenSharing === nextProps.user.isScreenSharing && prevProps.user.isMuted === nextProps.user.isMuted && prevProps.isActive === nextProps.isActive && prevProps.isPinned === nextProps.isPinned && prevProps.compact === nextProps.compact;
});
const VoiceControlBtn = /* @__PURE__ */ __name(({ icon, active, danger, special, subtle, small, isLeave, onClick, title, label }) => {
  const getBackground = /* @__PURE__ */ __name(() => {
    if (isLeave) return "linear-gradient(135deg, #ed4245 0%, #c03537 100%)";
    if (danger && active) return "rgba(240, 71, 71, 0.4)";
    if (danger) return "rgba(240, 71, 71, 0.15)";
    if (special) return "linear-gradient(135deg, #5865f2 0%, #4752c4 100%)";
    if (active) return "rgba(67, 181, 129, 0.25)";
    if (subtle) return "rgba(255, 255, 255, 0.05)";
    return "rgba(255, 255, 255, 0.1)";
  }, "getBackground");
  const getBorder = /* @__PURE__ */ __name(() => {
    if (isLeave) return "none";
    if (danger && active) return "2px solid rgba(240, 71, 71, 0.6)";
    if (active) return "2px solid rgba(67, 181, 129, 0.5)";
    if (special) return "2px solid rgba(88, 101, 242, 0.5)";
    return "2px solid transparent";
  }, "getBorder");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      title,
      style: {
        background: getBackground(),
        border: getBorder(),
        borderRadius: isLeave ? "50%" : "12px",
        width: isLeave ? "48px" : small ? "40px" : "48px",
        height: isLeave ? "48px" : small ? "40px" : "48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: small ? "16px" : "20px",
        color: "#fff",
        transition: "all 0.2s ease",
        boxShadow: isLeave ? "0 4px 15px rgba(237, 66, 69, 0.4)" : active ? "0 2px 10px rgba(67, 181, 129, 0.3)" : "none",
        transform: "scale(1)"
      },
      onMouseEnter: /* @__PURE__ */ __name((e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = isLeave ? "0 6px 20px rgba(237, 66, 69, 0.6)" : "0 4px 15px rgba(255, 255, 255, 0.2)";
      }, "onMouseEnter"),
      onMouseLeave: /* @__PURE__ */ __name((e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = isLeave ? "0 4px 15px rgba(237, 66, 69, 0.4)" : active ? "0 2px 10px rgba(67, 181, 129, 0.3)" : "none";
      }, "onMouseLeave"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: icon }),
        label && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "9px", marginTop: "2px", fontWeight: 600 }, children: label })
      ]
    }
  );
}, "VoiceControlBtn");
const ControlBar = /* @__PURE__ */ __name(({
  isMuted,
  isDeafened,
  isCameraOn,
  isScreenSharing,
  isSpatialAudio,
  isRecording,
  recordingDuration,
  onToggleMute,
  onToggleDeafened,
  onToggleCamera,
  onToggleScreenShare,
  onToggleSpatialAudio,
  onStartRecording,
  onStopRecording,
  onDownloadRecording,
  onLeave,
  onSettings
}) => {
  const formatDuration = /* @__PURE__ */ __name((sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, "formatDuration");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    background: "linear-gradient(180deg, rgba(32, 34, 37, 0.98) 0%, rgba(24, 25, 28, 1) 100%)",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.4)",
    flexShrink: 0,
    // 🔥 FIX: Asla küçülme - her zaman görünsün
    minHeight: "70px",
    // 🔥 FIX: Minimum yükseklik garantisi
    position: "relative",
    zIndex: 100
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceControlBtn,
        {
          icon: isMuted ? "🔇" : "🎤",
          active: !isMuted,
          danger: isMuted,
          onClick: onToggleMute,
          title: isMuted ? "Mikrofonu Aç" : "Mikrofonu Kapat"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceControlBtn,
        {
          icon: isDeafened ? "🔈" : "🎧",
          active: !isDeafened,
          danger: isDeafened,
          onClick: onToggleDeafened,
          title: isDeafened ? "Kulaklığı Aç" : "Kulaklığı Kapat"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      display: "flex",
      gap: "8px",
      padding: "0 16px",
      borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
      borderRight: "1px solid rgba(255, 255, 255, 0.1)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceControlBtn,
        {
          icon: isCameraOn ? "📹" : "📷",
          active: isCameraOn,
          onClick: onToggleCamera,
          title: isCameraOn ? "Kamerayı Kapat" : "Kamerayı Aç"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceControlBtn,
        {
          icon: "🖥️",
          active: isScreenSharing,
          special: isScreenSharing,
          onClick: onToggleScreenShare,
          title: isScreenSharing ? "Paylaşımı Durdur" : "Ekran Paylaş"
        }
      ),
      onToggleSpatialAudio && /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceControlBtn,
        {
          icon: "🔊",
          active: isSpatialAudio,
          onClick: onToggleSpatialAudio,
          title: isSpatialAudio ? "3D Ses (Açık)" : "3D Ses (Kapalı)",
          small: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
      onStartRecording && onStopRecording && /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceControlBtn,
        {
          icon: isRecording ? "⏹️" : "⏺️",
          active: isRecording,
          danger: isRecording,
          onClick: isRecording ? onStopRecording : onStartRecording,
          title: isRecording ? `Kaydı Durdur (${formatDuration(recordingDuration)})` : "Kayıt Başlat",
          label: isRecording ? formatDuration(recordingDuration) : null
        }
      ),
      onSettings && /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceControlBtn,
        {
          icon: "⚙️",
          onClick: onSettings,
          title: "Ayarlar",
          subtle: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoiceControlBtn,
      {
        icon: "📞",
        danger: true,
        onClick: onLeave,
        title: "Ayrıl",
        isLeave: true
      }
    )
  ] });
}, "ControlBar");
const VideoFeed = /* @__PURE__ */ __name(({ stream, fullscreen }) => {
  const videoRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "video",
    {
      ref: videoRef,
      autoPlay: true,
      playsInline: true,
      muted: false,
      style: {
        width: "100%",
        height: "100%",
        objectFit: fullscreen ? "contain" : "cover",
        background: "#000"
      }
    }
  );
}, "VideoFeed");
const MiniButton = /* @__PURE__ */ __name(({ icon, active, danger, onClick, title }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick,
      title,
      style: {
        background: active ? "rgba(88, 101, 242, 0.8)" : danger ? "rgba(237, 66, 69, 0.8)" : "rgba(255, 255, 255, 0.15)",
        border: "none",
        borderRadius: "8px",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "16px",
        transition: "all 0.2s ease"
      },
      children: icon
    }
  );
}, "MiniButton");
const MinimizedView = React.memo(({
  roomName,
  userCount,
  combinedUsers,
  currentUser,
  onToggleMinimize,
  onContextMenu,
  getUserAvatar,
  // Voice controls
  isMuted,
  isCameraOn,
  isScreenSharing,
  toggleMute,
  toggleCamera,
  toggleScreenShare,
  leaveVoice
}) => {
  const nodeRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Draggable,
    {
      nodeRef,
      handle: ".mini-drag-handle",
      defaultPosition: { x: 20, y: window.innerHeight - 180 },
      bounds: "parent",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          ref: nodeRef,
          style: {
            position: "fixed",
            zIndex: 9999,
            background: "linear-gradient(135deg, #1e2124 0%, #2c2f33 50%, #23272a 100%)",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 12px 48px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(88, 101, 242, 0.15)",
            border: "1px solid rgba(88, 101, 242, 0.1)",
            minWidth: "320px",
            maxWidth: "400px",
            backdropFilter: "blur(12px)",
            animation: "slideIn 0.3s ease"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "mini-drag-handle",
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  cursor: "move",
                  marginBottom: "12px",
                  paddingBottom: "12px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: "#43b581",
                    boxShadow: "0 0 12px #43b581",
                    animation: "pulse 2s infinite"
                  } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: {
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 600,
                    flex: 1
                  }, children: [
                    "🎤 ",
                    roomName
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                    background: "rgba(67, 181, 129, 0.2)",
                    borderRadius: "12px",
                    padding: "4px 10px",
                    fontSize: "11px",
                    color: "#43b581",
                    fontWeight: 600
                  }, children: [
                    "👥 ",
                    userCount
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: onToggleMinimize,
                      style: {
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "12px",
                        transition: "all 0.2s"
                      },
                      onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.background = "rgba(255, 255, 255, 0.2)", "onMouseEnter"),
                      onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.background = "rgba(255, 255, 255, 0.1)", "onMouseLeave"),
                      children: "⬆️ Aç"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              marginBottom: "12px",
              maxHeight: "120px",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "6px"
            }, children: [
              combinedUsers.slice(0, 3).map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  onContextMenu: /* @__PURE__ */ __name((e) => {
                    e.preventDefault();
                    if (user.username !== currentUser?.username) {
                      onContextMenu({
                        user,
                        position: { x: e.clientX, y: e.clientY }
                      });
                    }
                  }, "onContextMenu"),
                  onClick: /* @__PURE__ */ __name((e) => {
                    if (user.username !== currentUser?.username) {
                      onContextMenu({
                        user,
                        position: { x: e.clientX, y: e.clientY }
                      });
                    }
                  }, "onClick"),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px",
                    background: user.isTalking ? "rgba(67, 181, 129, 0.15)" : "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    border: user.isTalking ? "1px solid rgba(67, 181, 129, 0.4)" : "1px solid transparent",
                    transition: "all 0.2s",
                    cursor: user.username !== currentUser?.username ? "pointer" : "default"
                  },
                  onMouseEnter: /* @__PURE__ */ __name((e) => {
                    if (user.username !== currentUser?.username) {
                      e.currentTarget.style.background = "rgba(67, 181, 129, 0.2)";
                    }
                  }, "onMouseEnter"),
                  onMouseLeave: /* @__PURE__ */ __name((e) => {
                    e.currentTarget.style.background = user.isTalking ? "rgba(67, 181, 129, 0.15)" : "rgba(255, 255, 255, 0.05)";
                  }, "onMouseLeave"),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: getUserAvatar(user.username),
                        alt: user.username,
                        onError: /* @__PURE__ */ __name((e) => {
                          e.target.onerror = null;
                          e.target.src = getDeterministicAvatarFallback(user.username, 64);
                        }, "onError"),
                        style: {
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: user.isTalking ? "2px solid #43b581" : "2px solid rgba(255, 255, 255, 0.15)",
                          boxShadow: user.isTalking ? "0 0 10px rgba(67, 181, 129, 0.5)" : "none",
                          transition: "all 0.3s ease"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                        color: "#fff",
                        fontSize: "13px",
                        fontWeight: 600
                      }, children: [
                        user.username,
                        " ",
                        user.isLocal && "(Siz)"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "11px"
                      }, children: user.isMuted ? "🔇 Sessiz" : user.isTalking ? "🔊 Konuşuyor" : "🎤 Aktif" })
                    ] }),
                    user.isCameraOn && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px" }, children: "📹" }),
                    user.isScreenSharing && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: "14px" }, children: "🖥️" })
                  ]
                },
                user.username
              )),
              userCount > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                textAlign: "center",
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "11px",
                padding: "6px"
              }, children: [
                "+",
                userCount - 3,
                " daha..."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px"
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MiniButton,
                {
                  icon: isMuted ? "🔇" : "🎤",
                  active: !isMuted,
                  onClick: toggleMute,
                  title: isMuted ? "Mikrofonu Aç" : "Mikrofonu Kapat"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MiniButton,
                {
                  icon: isCameraOn ? "📹" : "📷",
                  active: isCameraOn,
                  onClick: toggleCamera,
                  title: isCameraOn ? "Kamerayı Kapat" : "Kamerayı Aç"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MiniButton,
                {
                  icon: "🖥️",
                  active: isScreenSharing,
                  onClick: toggleScreenShare,
                  title: isScreenSharing ? "Paylaşımı Durdur" : "Ekran Paylaş"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                MiniButton,
                {
                  icon: "❌",
                  danger: true,
                  onClick: leaveVoice,
                  title: "Ayrıl"
                }
              )
            ] })
          ]
        }
      )
    }
  );
});
MinimizedView.displayName = "MinimizedView";
function useVoiceMonitoring({
  isInVoice,
  localAudioStream,
  isMuted,
  startStatsMonitoring,
  stopStatsMonitoring,
  screenShareQuality,
  updateScreenQuality
}) {
  const [connectionQuality, setConnectionQuality] = reactExports.useState({});
  const [hasEchoRisk, setHasEchoRisk] = reactExports.useState(false);
  const [networkQuality, setNetworkQuality] = reactExports.useState("good");
  const [networkType, setNetworkType] = reactExports.useState("unknown");
  const [autoQualityEnabled, setAutoQualityEnabled] = reactExports.useState(true);
  const [volumeNormalization, setVolumeNormalization] = reactExports.useState(true);
  const [userAudioLevels, setUserAudioLevels] = reactExports.useState({});
  const [normalizedGains, setNormalizedGains] = reactExports.useState({});
  const [talkingIndicators, setTalkingIndicators] = reactExports.useState({});
  const [activeSpeaker, setActiveSpeaker] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!isInVoice) return;
    const monitorConnections = /* @__PURE__ */ __name(async () => {
      const peerConnections = window.__pawscord_peer_connections__ || {};
      for (const [username, pc] of Object.entries(peerConnections)) {
        if (pc && pc.getStats) {
          try {
            const stats = await pc.getStats();
            stats.forEach((report) => {
              if (report.type === "candidate-pair" && report.state === "succeeded") {
                setConnectionQuality((prev) => ({
                  ...prev,
                  [username]: {
                    rtt: Math.round((report.currentRoundTripTime || 0) * 1e3),
                    // ms
                    packetLoss: report.packetsLost && report.packetsSent ? Math.round(report.packetsLost / report.packetsSent * 100 * 10) / 10 : 0,
                    quality: (report.currentRoundTripTime || 0) < 0.1 ? "excellent" : (report.currentRoundTripTime || 0) < 0.2 ? "good" : "poor"
                  }
                }));
              }
            });
          } catch (err) {
            console.warn("[Quality] Failed to get stats for", username, err);
          }
        }
      }
    }, "monitorConnections");
    const interval = setInterval(monitorConnections, 3e3);
    monitorConnections();
    return () => clearInterval(interval);
  }, [isInVoice]);
  reactExports.useEffect(() => {
    if (isInVoice && startStatsMonitoring) {
      startStatsMonitoring();
    }
    return () => {
      if (stopStatsMonitoring) {
        stopStatsMonitoring();
      }
    };
  }, [isInVoice, startStatsMonitoring, stopStatsMonitoring]);
  reactExports.useEffect(() => {
    if (!localAudioStream || isMuted || !isInVoice) {
      setHasEchoRisk(false);
      return;
    }
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      const source = audioContext.createMediaStreamSource(localAudioStream);
      source.connect(analyser);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let consecutiveHighReadings = 0;
      const detectEcho = /* @__PURE__ */ __name(() => {
        analyser.getByteFrequencyData(dataArray);
        const highFreqRange = dataArray.slice(80, 160);
        const highFreqPeak = Math.max(...highFreqRange);
        const highFreqAvg = highFreqRange.reduce((a, b) => a + b, 0) / highFreqRange.length;
        const lowFreqRange = dataArray.slice(10, 40);
        const lowFreqAvg = lowFreqRange.reduce((a, b) => a + b, 0) / lowFreqRange.length;
        if (highFreqPeak > 180 && highFreqAvg > 100 && highFreqAvg > lowFreqAvg * 1.5) {
          consecutiveHighReadings++;
          if (consecutiveHighReadings > 3) {
            setHasEchoRisk(true);
          }
        } else {
          consecutiveHighReadings = 0;
          if (highFreqPeak < 120) {
            setHasEchoRisk(false);
          }
        }
      }, "detectEcho");
      const interval = setInterval(detectEcho, 1e3);
      return () => {
        clearInterval(interval);
        source.disconnect();
        audioContext.close();
      };
    } catch (err) {
      console.warn("[Echo] Detection failed:", err);
    }
  }, [localAudioStream, isMuted, isInVoice]);
  reactExports.useEffect(() => {
    if (!isInVoice) return;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const updateNetworkQuality = /* @__PURE__ */ __name(() => {
      if (!connection) {
        setNetworkQuality("good");
        setNetworkType("unknown");
        return;
      }
      const effectiveType = connection.effectiveType || "unknown";
      setNetworkType(effectiveType);
      const downlink = connection.downlink || 10;
      const rtt = connection.rtt || 50;
      let quality = "good";
      if (effectiveType === "4g" && downlink >= 5 && rtt < 100) {
        quality = "excellent";
      } else if (effectiveType === "slow-2g" || downlink < 1 || rtt > 300) {
        quality = "poor";
      } else if (effectiveType === "2g" || effectiveType === "3g" || downlink < 3 || rtt > 150) {
        quality = "good";
      } else {
        quality = "excellent";
      }
      setNetworkQuality(quality);
      if (autoQualityEnabled && updateScreenQuality) {
        if (quality === "poor" && screenShareQuality !== "720p") {
          updateScreenQuality("720p");
        } else if (quality === "excellent" && screenShareQuality === "720p") {
          updateScreenQuality("1080p");
        }
      }
    }, "updateNetworkQuality");
    updateNetworkQuality();
    if (connection) {
      connection.addEventListener("change", updateNetworkQuality);
    }
    const interval = setInterval(updateNetworkQuality, 1e4);
    return () => {
      clearInterval(interval);
      if (connection) {
        connection.removeEventListener("change", updateNetworkQuality);
      }
    };
  }, [isInVoice, autoQualityEnabled, screenShareQuality, updateScreenQuality]);
  reactExports.useEffect(() => {
    if (!volumeNormalization || !isInVoice) return;
    const monitorAudioLevels = /* @__PURE__ */ __name(() => {
      const remoteAudios = document.querySelectorAll("audio[data-username]");
      const levels = {};
      const newGains = { ...normalizedGains };
      remoteAudios.forEach((audio) => {
        const username = audio.getAttribute("data-username");
        if (!username) return;
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const source = audioContext.createMediaElementSource(audio);
          const analyser = audioContext.createAnalyser();
          analyser.fftSize = 256;
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
          levels[username] = average;
          if (average > 0) {
            if (average < 50) {
              newGains[username] = Math.min(1.5, (newGains[username] || 1) * 1.05);
            } else if (average > 120) {
              newGains[username] = Math.max(0.7, (newGains[username] || 1) * 0.95);
            }
          }
          audioContext.close();
        } catch (err) {
          console.debug("Audio analysis error (expected):", err.message);
        }
      });
      setUserAudioLevels(levels);
      setNormalizedGains(newGains);
    }, "monitorAudioLevels");
    const interval = setInterval(monitorAudioLevels, 2e3);
    return () => clearInterval(interval);
  }, [volumeNormalization, isInVoice, normalizedGains]);
  reactExports.useEffect(() => {
    if (!isInVoice) return;
    const detectTalking = /* @__PURE__ */ __name(() => {
      const indicators = {};
      let loudestUser = null;
      let maxLevel = 0;
      Object.entries(userAudioLevels).forEach(([username, level]) => {
        if (level > 30) {
          indicators[username] = true;
          if (level > maxLevel) {
            maxLevel = level;
            loudestUser = username;
          }
        } else {
          indicators[username] = false;
        }
      });
      setTalkingIndicators(indicators);
      if (loudestUser && maxLevel > 50) {
        setActiveSpeaker(loudestUser);
      } else if (maxLevel === 0) {
        setActiveSpeaker(null);
      }
    }, "detectTalking");
    const interval = setInterval(detectTalking, 100);
    return () => clearInterval(interval);
  }, [isInVoice, userAudioLevels]);
  return {
    // Connection quality
    connectionQuality,
    setConnectionQuality,
    // Echo detection
    hasEchoRisk,
    setHasEchoRisk,
    // Network quality
    networkQuality,
    setNetworkQuality,
    networkType,
    setNetworkType,
    autoQualityEnabled,
    setAutoQualityEnabled,
    // Volume normalization
    volumeNormalization,
    setVolumeNormalization,
    userAudioLevels,
    setUserAudioLevels,
    normalizedGains,
    setNormalizedGains,
    // Talking indicators & active speaker
    talkingIndicators,
    setTalkingIndicators,
    activeSpeaker,
    setActiveSpeaker
  };
}
__name(useVoiceMonitoring, "useVoiceMonitoring");
function injectVoicePanelStyles() {
  if (typeof document === "undefined") return;
  if (document.head.querySelector("style#voice-fullscreen-styles")) return;
  const style = document.createElement("style");
  style.id = "voice-fullscreen-styles";
  style.textContent = `
            /* Tam Ekran Video Stilleri */
            div:fullscreen video,
            div:-webkit-full-screen video,
            div:-moz-full-screen video,
            div:-ms-fullscreen video {
                width: 100% !important;
                height: 100% !important;
                object-fit: contain !important;
                background: #000 !important;
            }

            /* Tam Ekran Container */
            div:fullscreen,
            div:-webkit-full-screen,
            div:-moz-full-screen,
            div:-ms-fullscreen {
                background: #000 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }

            /* Tam Ekran Kontrolleri */
            div:fullscreen .hover-actions,
            div:-webkit-full-screen .hover-actions,
            div:-moz-full-screen .hover-actions,
            div:-ms-fullscreen .hover-actions {
                opacity: 1 !important;
                z-index: 9999 !important;
            }

            /* 🔥 YENİ: Badge Animasyonları */
            @keyframes badgePulse {
                0%, 100% {
                    transform: scale(1);
                    box-shadow: 0 4px 16px rgba(88, 101, 242, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2);
                }
                50% {
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(88, 101, 242, 0.9), 0 0 0 3px rgba(255, 255, 255, 0.4);
                }
            }

            @keyframes pulse {
                0%, 100% {
                    opacity: 1;
                    transform: scale(1);
                }
                50% {
                    opacity: 0.7;
                    transform: scale(1.2);
                }
            }

            /* 🔥 YENİ: Talking Indicator Wave Animations */
            @keyframes wave1 {
                0%, 100% { height: 12px; }
                50% { height: 20px; }
            }
            @keyframes wave2 {
                0%, 100% { height: 16px; }
                50% { height: 24px; }
            }
            @keyframes wave3 {
                0%, 100% { height: 12px; }
                50% { height: 20px; }
            }

            /* 🔥 YENİ: Avatar Talking Pulse Animation */
            @keyframes talkingPulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(67, 181, 129, 0.7);
                    transform: scale(1);
                }
                50% {
                    box-shadow: 0 0 0 15px rgba(67, 181, 129, 0);
                    transform: scale(1.02);
                }
            }

            @keyframes slideIn {
                from { opacity: 0; transform: translateY(10px) scale(0.95); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes connectionGlow {
                0%, 100% { box-shadow: 0 0 12px rgba(67, 181, 129, 0.3); }
                50% { box-shadow: 0 0 20px rgba(67, 181, 129, 0.6); }
            }
            @keyframes screenShareGlow {
                0%, 100% { border-color: rgba(88, 101, 242, 0.5); }
                50% { border-color: rgba(88, 101, 242, 0.9); }
            }

            /* Smooth grid transitions */
            .voice-grid-item {
                animation: slideIn 0.3s ease forwards;
            }
            /* Video card hover effects */
            .voice-video-card:hover {
                transform: scale(1.01);
                z-index: 10;
            }
            /* Active speaker highlight */
            .voice-active-speaker {
                animation: connectionGlow 2s ease-in-out infinite;
            }
            /* Screen share border animation */
            .voice-screen-share {
                animation: screenShareGlow 2s ease-in-out infinite;
            }
    `;
  document.head.appendChild(style);
}
__name(injectVoicePanelStyles, "injectVoicePanelStyles");
injectVoicePanelStyles();
const getFullResolutionAvatar = /* @__PURE__ */ __name((avatarUrl) => {
  if (!avatarUrl) return null;
  return avatarUrl.replace(/_100x100\./gi, ".").replace(/_150x150\./gi, ".").replace(/_50x50\./gi, ".").replace(/\?.*$/, "");
}, "getFullResolutionAvatar");
const VoiceChatPanel = /* @__PURE__ */ __name(({
  roomName,
  onClose,
  isMinimized,
  onToggleMinimize,
  getRealUserAvatar,
  // ðŸ”¥ YENÄ°: GerÃ§ek avatar URL alÄ±cÄ±
  allUsers = [],
  // ðŸ”¥ YENÄ°: TÃ¼m kullanÄ±cÄ± listesi
  currentUserProfile
  // ðŸ”¥ YENÄ°: Mevcut kullanÄ±cÄ±nÄ±n profili
}) => {
  const {
    isInVoice,
    isMuted,
    isDeafened,
    isVideoEnabled,
    isScreenSharing,
    isSpatialAudioEnabled,
    vadSensitivity,
    isNoiseSuppressionEnabled,
    screenShareQuality,
    screenShareFPS,
    isRecording,
    recordingDuration,
    isPTTMode,
    isPTTActive,
    pttKey,
    includeSystemAudio,
    connectedUsers = [],
    isReconnecting = false,
    connectionStats = {},
    startStatsMonitoring,
    stopStatsMonitoring,
    toggleMute,
    toggleDeafened,
    toggleCamera,
    toggleScreenShare,
    toggleSpatialAudio,
    updateVadSensitivity,
    toggleNoiseSuppression,
    updateScreenQuality,
    updateScreenFPS,
    toggleSystemAudio,
    togglePTTMode,
    updatePTTKey,
    startRecording,
    stopRecording,
    downloadRecording,
    leaveVoiceRoom: leaveVoice,
    localAudioStream,
    remoteStreams = {},
    remoteVolumes = {},
    setRemoteVolume,
    localCameraStream,
    localScreenStream,
    isTalking = false
  } = useVoice();
  const isCameraOn = isVideoEnabled;
  const { user: currentUser } = useAuth();
  const combinedUsers = React.useMemo(() => {
    const users = [...connectedUsers];
    if (currentUser && !users.some((u) => u.username === currentUser.username)) {
      users.push({
        username: currentUser.username,
        isMuted,
        isCameraOn,
        isScreenSharing,
        isTalking,
        // Burada kullan ama dependency'de deÄŸil
        isLocal: true
        // ðŸ”¥ Flag to identify local user
      });
    } else if (currentUser) {
      const index = users.findIndex((u) => u.username === currentUser.username);
      if (index >= 0) {
        users[index] = {
          ...users[index],
          isMuted,
          isCameraOn,
          isScreenSharing,
          isTalking,
          // Burada kullan ama dependency'de deÄŸil
          isLocal: true
        };
      }
    }
    return users;
  }, [connectedUsers, currentUser, isMuted, isCameraOn, isScreenSharing]);
  const getUserAvatar = reactExports.useCallback((username) => {
    let avatarUrl = null;
    if (currentUserProfile && username === currentUser?.username) {
      if (currentUserProfile.avatar && typeof currentUserProfile.avatar === "string") {
        if (currentUserProfile.avatar.startsWith("http") || currentUserProfile.avatar.startsWith("blob:")) {
          avatarUrl = currentUserProfile.avatar;
        } else {
          avatarUrl = `${PRODUCTION_URL}${currentUserProfile.avatar.startsWith("/") ? "" : "/"}${currentUserProfile.avatar}`;
        }
      }
    }
    if (!avatarUrl && getRealUserAvatar) {
      avatarUrl = getRealUserAvatar(username);
    }
    if (!avatarUrl) {
      const userFromList = allUsers.find((u) => u.username === username);
      if (userFromList?.avatar && typeof userFromList.avatar === "string") {
        if (userFromList.avatar.startsWith("http") || userFromList.avatar.startsWith("blob:")) {
          avatarUrl = userFromList.avatar;
        } else {
          avatarUrl = `${PRODUCTION_URL}${userFromList.avatar.startsWith("/") ? "" : "/"}${userFromList.avatar}`;
        }
      }
    }
    if (avatarUrl) {
      return getFullResolutionAvatar(avatarUrl);
    }
    return getDeterministicAvatarFallback(username, 256);
  }, [currentUserProfile, currentUser, getRealUserAvatar, allUsers]);
  const allStreams = React.useMemo(() => {
    const streams = { ...remoteStreams };
    if (currentUser?.username) {
      if (localCameraStream) {
        streams[`${currentUser.username}_camera`] = localCameraStream;
      }
      if (localScreenStream) {
        streams[`${currentUser.username}_screen`] = localScreenStream;
      }
    }
    return streams;
  }, [remoteStreams, currentUser, localCameraStream, localScreenStream]);
  const [expandedUser, setExpandedUser] = reactExports.useState(null);
  const [pinnedUser, setPinnedUser] = reactExports.useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = reactExports.useState(false);
  const [contextMenu, setContextMenu] = reactExports.useState(null);
  const [volumeSettings, setVolumeSettings] = reactExports.useState(() => {
    try {
      const saved = localStorage.getItem("pawscord_voice_volumes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showEchoWarning, setShowEchoWarning] = reactExports.useState(true);
  const {
    connectionQuality,
    hasEchoRisk,
    networkQuality,
    networkType,
    talkingIndicators,
    activeSpeaker
  } = useVoiceMonitoring({
    isInVoice,
    localAudioStream,
    isMuted,
    startStatsMonitoring,
    stopStatsMonitoring,
    screenShareQuality,
    updateScreenQuality
  });
  reactExports.useEffect(() => {
    const handleOpenSettings = /* @__PURE__ */ __name(() => {
      setIsSettingsOpen(true);
    }, "handleOpenSettings");
    window.addEventListener("openVoiceSettings", handleOpenSettings);
    return () => window.removeEventListener("openVoiceSettings", handleOpenSettings);
  }, []);
  reactExports.useEffect(() => {
    try {
      localStorage.setItem("pawscord_voice_volumes", JSON.stringify(volumeSettings));
    } catch (err) {
      console.warn("Failed to save volume settings:", err);
    }
  }, [volumeSettings]);
  const { isMobile } = useResponsive();
  const renderMode = expandedUser ? "fullscreen" : isMinimized ? "minimized" : isMobile ? "mobile" : "grid";
  reactExports.useEffect(() => {
    if (!isInVoice) {
      onClose();
    }
  }, [isInVoice, onClose]);
  const getGridLayout = /* @__PURE__ */ __name((count) => {
    if (isMobile) {
      return { cols: 1, rows: count };
    }
    if (count <= 1) return { cols: 1, rows: 1 };
    if (count <= 4) return { cols: 2, rows: 2 };
    if (count <= 6) return { cols: 3, rows: 2 };
    if (count <= 9) return { cols: 3, rows: 3 };
    return { cols: 4, rows: Math.ceil(count / 4) };
  }, "getGridLayout");
  const totalStreamCount = React.useMemo(() => {
    let count = combinedUsers.length;
    combinedUsers.forEach((user) => {
      const baseKey = user.username;
      const hasScreenStream = allStreams[`${baseKey}_screen`];
      if (hasScreenStream && user.isScreenSharing) {
        count++;
      }
    });
    return count;
  }, [combinedUsers, allStreams]);
  const userCount = combinedUsers.length;
  const { cols, rows } = getGridLayout(totalStreamCount);
  const handleSendMessage = reactExports.useCallback(async (targetUser) => {
    window.location.hash = `#/dm/${targetUser.username}`;
  }, []);
  const handleAddFriend = reactExports.useCallback(async (targetUser) => {
    try {
      const response = await fetch(`/api/friends/send_request/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({ username: targetUser.username })
      });
      if (response.ok) {
        toast.success(`âœ… ${targetUser.username} kullanÄ±cÄ±sÄ±na arkadaÅŸlÄ±k isteÄŸi gÃ¶nderildi!`);
      } else {
        toast.error("âŒ ArkadaÅŸlÄ±k isteÄŸi gÃ¶nderilemedi");
      }
    } catch (error) {
      console.error("Friend request error:", error);
      toast.error("âŒ Bir hata oluÅŸtu");
    }
  }, []);
  const handleBlock = reactExports.useCallback(async (targetUser) => {
    try {
      const response = await fetch(`/api/users/block/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`
        },
        body: JSON.stringify({ username: targetUser.username })
      });
      if (response.ok) {
        toast.success(`âœ… ${targetUser.username} engellendi!`);
      } else {
        toast.error("âŒ Engelleme iÅŸlemi baÅŸarÄ±sÄ±z");
      }
    } catch (error) {
      console.error("Block error:", error);
      toast.error("âŒ Bir hata oluÅŸtu");
    }
  }, []);
  const handleViewProfile = reactExports.useCallback((targetUser) => {
    setContextMenu(null);
    if (window.openUserProfile) {
      window.openUserProfile(targetUser.username);
    } else {
      window.location.hash = `#/profile/${targetUser.username}`;
    }
  }, []);
  const handleMuteUser = reactExports.useCallback((targetUser) => {
    setVolumeSettings((prev) => ({
      ...prev,
      [targetUser.username]: {
        ...prev[targetUser.username],
        isMuted: !prev[targetUser.username]?.isMuted
      }
    }));
  }, []);
  const handleAdjustVolume = reactExports.useCallback((targetUser, newVolume) => {
    const volume = Math.max(0, Math.min(200, newVolume));
    setVolumeSettings((prev) => ({
      ...prev,
      [targetUser.username]: {
        ...prev[targetUser.username],
        volume
      }
    }));
    const audioElements = document.querySelectorAll(`audio[data-username="${targetUser.username}"]`);
    audioElements.forEach((audio) => {
      if (volume <= 100) {
        audio.volume = volume / 100;
        if (audio._gainNode) {
          try {
            audio._gainNode.gain.value = 1;
          } catch (e) {
          }
        }
      } else {
        audio.volume = 1;
        try {
          if (!audio._audioContext) {
            audio._audioContext = new (window.AudioContext || window.webkitAudioContext)();
            audio._sourceNode = audio._audioContext.createMediaElementSource(audio);
            audio._gainNode = audio._audioContext.createGain();
            audio._sourceNode.connect(audio._gainNode);
            audio._gainNode.connect(audio._audioContext.destination);
          }
          audio._gainNode.gain.value = volume / 100;
        } catch (e) {
          console.warn("[Volume] GainNode amplification failed:", e);
        }
      }
    });
  }, []);
  const renderStatusBadges = /* @__PURE__ */ __name(() => {
    const badges = [];
    if (isRecording) {
      badges.push(
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { background: "rgba(237,66,69,0.2)", color: "#ed4245", border: "1px solid rgba(237,66,69,0.4)", padding: "4px 8px", borderRadius: "10px", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }, children: [
          "âºï¸ KayÄ±tta (",
          Math.floor(recordingDuration / 60).toString().padStart(2, "0"),
          ":",
          Math.floor(recordingDuration % 60).toString().padStart(2, "0"),
          ")"
        ] }, "rec")
      );
    }
    if (isScreenSharing) {
      badges.push(
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { background: "rgba(88,101,242,0.15)", color: "#8893ff", border: "1px solid rgba(88,101,242,0.35)", padding: "4px 8px", borderRadius: "10px", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }, children: [
          "ðŸ–¥ï¸ PaylaÅŸÄ±lÄ±yor ",
          screenShareQuality,
          " â€¢ ",
          screenShareFPS,
          "fps",
          includeSystemAudio ? " â€¢ ðŸ”Š Sistem" : ""
        ] }, "ss")
      );
    }
    if (isPTTMode) {
      badges.push(
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { background: "rgba(250,166,26,0.18)", color: "#faa61a", border: "1px solid rgba(250,166,26,0.35)", padding: "4px 8px", borderRadius: "10px", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }, children: [
          "ðŸŽ™ï¸ PTT (",
          pttKey,
          ") ",
          isPTTActive ? "â€¢ Aktif" : ""
        ] }, "ptt")
      );
    }
    if (isReconnecting) {
      badges.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "4px 8px", borderRadius: "10px", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "6px" }, children: "ðŸ”„ Yeniden baÄŸlanÄ±yor" }, "reconnect")
      );
    }
    return badges.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }, children: badges }) : null;
  }, "renderStatusBadges");
  const renderStreamBadge = /* @__PURE__ */ __name((user) => {
    if (user.streamType === "screen") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        position: "absolute",
        top: "12px",
        left: "12px",
        background: "linear-gradient(135deg, #5865f2 0%, #7289da 100%)",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "12px",
        fontSize: "13px",
        fontWeight: 700,
        boxShadow: "0 4px 16px rgba(88, 101, 242, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        animation: "badgePulse 2s infinite"
      }, children: [
        "ðŸ–¥ï¸ ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)" }, children: [
          user.username,
          " - Ekran PaylaÅŸÄ±yor"
        ] })
      ] });
    } else if (user.streamType === "camera") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        position: "absolute",
        top: "12px",
        left: "12px",
        background: "rgba(67, 181, 129, 0.85)",
        color: "#fff",
        padding: "6px 12px",
        borderRadius: "8px",
        fontSize: "11px",
        fontWeight: 600,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }, children: "ðŸ“¹ Kamera" });
    }
    return null;
  }, "renderStreamBadge");
  if (renderMode === "minimized") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MinimizedView,
      {
        roomName,
        userCount,
        combinedUsers,
        currentUser,
        onToggleMinimize,
        onContextMenu: /* @__PURE__ */ __name((data) => setContextMenu(data), "onContextMenu"),
        getUserAvatar,
        isMuted,
        isCameraOn,
        isScreenSharing,
        toggleMute,
        toggleCamera,
        toggleScreenShare,
        leaveVoice
      }
    );
  }
  if (renderMode === "fullscreen" && expandedUser) {
    const streamKey = expandedUser.streamType === "screen" ? `${expandedUser.username}_screen` : `${expandedUser.username}_camera`;
    const expandedStream = allStreams[streamKey] || allStreams[expandedUser.username];
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      width: "100%",
      height: "100%",
      background: "#000",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        background: "rgba(0, 0, 0, 0.8)",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        gap: "16px"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setExpandedUser(null), "onClick"),
            style: {
              background: "rgba(255, 255, 255, 0.1)",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px"
            },
            children: "â¬…ï¸ Geri"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { style: { color: "#fff", margin: 0, flex: 1 }, children: [
          "ðŸ‘¤ ",
          expandedUser.username,
          " ",
          expandedUser.streamType === "screen" && "ðŸ–¥ï¸ Ekran PaylaÅŸÄ±mÄ±"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1a1a1a"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        VideoFeed,
        {
          user: expandedUser,
          stream: expandedStream,
          fullscreen: true
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ControlBar,
        {
          isMuted,
          isDeafened,
          isCameraOn,
          isScreenSharing,
          isSpatialAudio: isSpatialAudioEnabled,
          isRecording,
          recordingDuration,
          onToggleMute: toggleMute,
          onToggleDeafened: toggleDeafened,
          onToggleCamera: toggleCamera,
          onToggleScreenShare: toggleScreenShare,
          onToggleSpatialAudio: toggleSpatialAudio,
          onStartRecording: startRecording,
          onStopRecording: stopRecording,
          onLeave: leaveVoice
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      background: "rgba(0, 0, 0, 0.3)",
      padding: "16px 24px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "#43b581",
        boxShadow: "0 0 12px #43b581",
        animation: "pulse 2s infinite"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { style: {
        color: "#fff",
        margin: 0,
        fontSize: "17px",
        fontWeight: 700,
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        letterSpacing: "0.3px"
      }, children: [
        "ðŸŽ™ï¸ ",
        roomName,
        renderStatusBadges(),
        networkQuality === "poor" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          background: "rgba(240, 71, 71, 0.2)",
          border: "1px solid #f04747",
          borderRadius: "6px",
          padding: "4px 8px",
          fontSize: "12px",
          color: "#f04747",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }, children: "âš ï¸ ZayÄ±f BaÄŸlantÄ±" }),
        networkQuality === "excellent" && networkType !== "unknown" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          background: "rgba(67, 181, 129, 0.2)",
          border: "1px solid #43b581",
          borderRadius: "6px",
          padding: "4px 8px",
          fontSize: "12px",
          color: "#43b581",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "4px"
        }, children: [
          "ðŸ“¶ ",
          networkType.toUpperCase()
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        color: "rgba(255, 255, 255, 0.7)",
        fontSize: "14px"
      }, children: [
        "ðŸ‘¥ ",
        userCount,
        " kiÅŸi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onToggleMinimize,
          style: {
            background: "rgba(255, 255, 255, 0.1)",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "13px"
          },
          children: "â¬‡ï¸ KÃ¼Ã§Ã¼lt"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
      flex: 1,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      overflow: "auto",
      // ðŸ”¥ FIX: auto olsun ki scroll yapÄ±labilsin
      position: "relative",
      minHeight: 0
      // ðŸ”¥ FIX: Flex child overflow iÃ§in gerekli
    }, children: (() => {
      const screenShares = combinedUsers.filter((u) => u.isScreenSharing && allStreams[`${u.username}_screen`]);
      const hasScreenShares = screenShares.length > 0;
      if (hasScreenShares) {
        const allItems = [];
        screenShares.forEach((user) => {
          const screenStream = allStreams[`${user.username}_screen`];
          if (screenStream) {
            allItems.push({
              key: `${user.username}_screen`,
              username: user.username,
              type: "screen",
              component: /* @__PURE__ */ jsxRuntimeExports.jsx(
                UserVideoCard,
                {
                  user: { ...user, streamType: "screen" },
                  stream: screenStream,
                  isActive: false,
                  isPinned: false,
                  onExpand: /* @__PURE__ */ __name(() => setExpandedUser({ ...user, streamType: "screen" }), "onExpand"),
                  onPin: /* @__PURE__ */ __name(() => {
                  }, "onPin"),
                  onContextMenu: /* @__PURE__ */ __name((data) => setContextMenu(data), "onContextMenu"),
                  badge: renderStreamBadge({ ...user, streamType: "screen" }),
                  connectionQuality: connectionQuality[user.username],
                  getUserAvatar
                },
                `${user.username}_screen`
              )
            });
          }
        });
        combinedUsers.forEach((user) => {
          const cameraStream = allStreams[`${user.username}_camera`] || allStreams[user.username];
          const shouldShow = cameraStream && cameraStream.active || user.isLocal;
          if (shouldShow) {
            allItems.push({
              key: `${user.username}_camera`,
              username: user.username,
              type: "camera",
              component: /* @__PURE__ */ jsxRuntimeExports.jsx(
                UserVideoCard,
                {
                  user: {
                    ...user,
                    streamType: "camera",
                    volume: remoteVolumes[user.username] || 100,
                    onVolumeChange: /* @__PURE__ */ __name((vol) => setRemoteVolume(user.username, vol), "onVolumeChange"),
                    isTalking: talkingIndicators[user.username] || false
                    // ðŸ”¥ YENÄ°
                  },
                  stream: cameraStream,
                  isActive: activeSpeaker === user.username,
                  isPinned: pinnedUser === user.username,
                  onExpand: /* @__PURE__ */ __name(() => setExpandedUser({ ...user, streamType: "camera" }), "onExpand"),
                  onPin: /* @__PURE__ */ __name(() => setPinnedUser(pinnedUser === user.username ? null : user.username), "onPin"),
                  onContextMenu: /* @__PURE__ */ __name((data) => setContextMenu(data), "onContextMenu"),
                  badge: renderStreamBadge(user),
                  connectionQuality: connectionQuality[user.username],
                  getUserAvatar
                },
                `${user.username}_camera`
              )
            });
          }
        });
        const totalItems = allItems.length;
        let cols2, rows2;
        if (totalItems <= 2) {
          cols2 = totalItems;
          rows2 = 1;
        } else if (totalItems <= 4) {
          cols2 = 2;
          rows2 = 2;
        } else if (totalItems <= 6) {
          cols2 = 3;
          rows2 = 2;
        } else {
          cols2 = 3;
          rows2 = Math.ceil(totalItems / 3);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: `repeat(${cols2}, 1fr)`,
          gridTemplateRows: `repeat(${rows2}, 1fr)`,
          gap: "16px",
          padding: "0",
          position: "relative"
          // ðŸ”¥ FIX: Parent relative olmalÄ±
        }, children: allItems.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "relative",
              // ðŸ”¥ FIX: Her cell relative
              width: "100%",
              height: "100%",
              overflow: "hidden",
              // ðŸ”¥ FIX: TaÅŸmayÄ± Ã¶nle
              zIndex: 1,
              // ðŸ”¥ FIX: Base z-index
              isolation: "isolate"
              // ðŸ”¥ FIX: Z-index context izolasyonu
            },
            children: item.component
          },
          item.key
        )) });
      } else {
        const hasAnyActiveStream = combinedUsers.some((u) => {
          const cameraStream = allStreams[`${u.username}_camera`] || allStreams[u.username];
          return cameraStream && cameraStream.active;
        });
        if (!hasAnyActiveStream) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            flex: 1,
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(cols, 3)}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: "24px",
            padding: "40px",
            alignItems: "center",
            justifyContent: "center"
          }, children: combinedUsers.map((user) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "32px",
                borderRadius: "16px",
                background: activeSpeaker === user.username ? "linear-gradient(135deg, rgba(88, 101, 242, 0.25) 0%, rgba(114, 137, 218, 0.15) 100%)" : "rgba(47, 49, 54, 0.5)",
                border: activeSpeaker === user.username ? "2px solid rgba(88, 101, 242, 0.9)" : "2px solid rgba(79, 84, 92, 0.3)",
                boxShadow: activeSpeaker === user.username ? "0 8px 32px rgba(88, 101, 242, 0.4), 0 0 20px rgba(88, 101, 242, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                position: "relative",
                transform: activeSpeaker === user.username ? "scale(1.05)" : "scale(1)",
                animation: "slideIn 0.4s ease forwards"
              },
              onClick: /* @__PURE__ */ __name(() => setContextMenu({
                user,
                position: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
              }), "onClick"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  width: "140px",
                  height: "140px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `5px solid ${activeSpeaker === user.username ? "#5865f2" : "#40444b"}`,
                  boxShadow: activeSpeaker === user.username ? "0 8px 24px rgba(88, 101, 242, 0.6), inset 0 0 20px rgba(88, 101, 242, 0.2)" : "0 4px 12px rgba(0, 0, 0, 0.4)",
                  animation: activeSpeaker === user.username ? "pulse 1.5s infinite" : "none",
                  position: "relative"
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: getUserAvatar(user.username),
                    alt: user.username,
                    onError: /* @__PURE__ */ __name((e) => {
                      e.target.onerror = null;
                      e.target.src = getDeterministicAvatarFallback(user.username, 256);
                    }, "onError"),
                    style: {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: activeSpeaker === user.username ? "brightness(1.1)" : "brightness(0.95)"
                    }
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
                  fontSize: "20px",
                  fontWeight: "700",
                  color: activeSpeaker === user.username ? "#dee0fc" : "#fff",
                  textAlign: "center",
                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.7)",
                  letterSpacing: "0.3px"
                }, children: user.username }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
                  display: "flex",
                  gap: "12px",
                  fontSize: "22px",
                  marginTop: "4px"
                }, children: [
                  user.isMuted && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      title: "Mikrofon KapalÄ±",
                      style: {
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))"
                      },
                      children: "ðŸ”‡"
                    }
                  ),
                  user.isDeafened && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      title: "KulaklÄ±k KapalÄ±",
                      style: {
                        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))"
                      },
                      children: "ðŸ”ˆ"
                    }
                  )
                ] })
              ]
            },
            user.username
          )) });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          flex: 1,
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: "16px",
          // ðŸ”¥ FIX: Responsive sizing
          minHeight: "400px",
          height: "100%"
        }, children: combinedUsers.map((user) => {
          const cameraStream = allStreams[`${user.username}_camera`] || (user.isLocal ? null : allStreams[user.username]);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            UserVideoCard,
            {
              user: {
                ...user,
                streamType: "camera",
                volume: remoteVolumes[user.username] || 100,
                onVolumeChange: /* @__PURE__ */ __name((vol) => setRemoteVolume(user.username, vol), "onVolumeChange")
              },
              stream: cameraStream,
              isActive: activeSpeaker === user.username,
              isPinned: pinnedUser === user.username,
              onExpand: /* @__PURE__ */ __name(() => setExpandedUser({ ...user, streamType: "camera" }), "onExpand"),
              onPin: /* @__PURE__ */ __name(() => setPinnedUser(pinnedUser === user.username ? null : user.username), "onPin"),
              onContextMenu: /* @__PURE__ */ __name((data) => setContextMenu(data), "onContextMenu"),
              badge: renderStreamBadge({ ...user, streamType: "camera" }),
              connectionQuality: connectionQuality[user.username],
              getUserAvatar
            },
            `${user.username}_camera`
          );
        }) });
      }
    })() }),
    hasEchoRisk && showEchoWarning && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      position: "absolute",
      bottom: "100px",
      left: "50%",
      transform: "translateX(-50%)",
      background: "linear-gradient(135deg, rgba(250, 166, 26, 0.95) 0%, rgba(237, 66, 69, 0.95) 100%)",
      color: "#fff",
      padding: "16px 24px",
      borderRadius: "12px",
      zIndex: 1e3,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: "0 8px 32px rgba(250, 166, 26, 0.6)",
      animation: "pulse 2s infinite",
      maxWidth: "90%"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "24px", animation: "pulse 1.5s infinite" }, children: "âš ï¸" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontWeight: "bold", marginBottom: "4px", fontSize: "15px" }, children: "Echo Tespit Edildi!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "13px", opacity: 0.9 }, children: "KulaklÄ±k kullanmanÄ±z Ã¶nerilir. HoparlÃ¶r kullanÄ±mÄ± echo'ya neden olur." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setShowEchoWarning(false), "onClick"),
          style: {
            background: "rgba(255, 255, 255, 0.2)",
            border: "none",
            borderRadius: "6px",
            color: "#fff",
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "bold"
          },
          children: "Kapat"
        }
      )
    ] }),
    isSettingsOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoiceSettingsPanel,
      {
        onClose: /* @__PURE__ */ __name(() => setIsSettingsOpen(false), "onClose"),
        channelId: roomName
      }
    ),
    contextMenu && /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserContextMenu,
      {
        user: contextMenu.user,
        position: contextMenu.position,
        onClose: /* @__PURE__ */ __name(() => setContextMenu(null), "onClose"),
        onSendMessage: handleSendMessage,
        onAddFriend: handleAddFriend,
        onBlock: handleBlock,
        onViewProfile: handleViewProfile,
        onMuteUser: handleMuteUser,
        onAdjustVolume: handleAdjustVolume,
        currentUser,
        isInVoiceChat: true
      }
    )
  ] });
}, "VoiceChatPanel");
const VoiceChatPanel_default = React.memo(VoiceChatPanel);
export {
  VoiceChatPanel_default as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const VideoPlayer = /* @__PURE__ */ __name(({ stream, isMirrored, objectFit = "cover", muted = false }) => {
  const videoRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current.play().catch((err) => {
          console.error("❌ Video play error:", err);
        });
      };
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [stream]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "video",
    {
      ref: videoRef,
      style: { ...styles.videoElement, transform: isMirrored ? "scaleX(-1)" : "none", objectFit },
      autoPlay: true,
      playsInline: true,
      muted: true
    }
  );
}, "VideoPlayer");
const UserVideoContainer = /* @__PURE__ */ __name(({ id, user, track, streamType, avatarUrl, isLocal, onClick, style, lastReaction, gameMove }) => {
  const containerRef = reactExports.useRef(null);
  const [isFullscreen, setIsFullscreen] = reactExports.useState(false);
  const videoStream = reactExports.useMemo(() => {
    if (track && track.kind === "video") {
      return new MediaStream([track]);
    }
    return null;
  }, [track]);
  const toggleFullscreen = /* @__PURE__ */ __name((e) => {
    e.stopPropagation();
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Tam ekran hatası:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  }, "toggleFullscreen");
  reactExports.useEffect(() => {
    const handleFullscreenChange = /* @__PURE__ */ __name(() => {
      setIsFullscreen(!!document.fullscreenElement);
    }, "handleFullscreenChange");
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);
  const [reactions, setReactions] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (lastReaction && lastReaction.username === user.username) {
      const id2 = Date.now() + Math.random();
      setReactions((prev) => [...prev, { id: id2, emoji: lastReaction.emoji }]);
      setTimeout(() => {
        setReactions((prev) => prev.filter((r) => r.id !== id2));
      }, 2e3);
    }
  }, [lastReaction, user.username]);
  const isMirrored = isLocal && streamType === "camera";
  const displayName = isLocal ? `${user.username} (Siz)` : user.username;
  const containerClasses = user.is_talking ? "talking-border talking-pulse" : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: containerRef,
      className: containerClasses,
      style: {
        ...styles.containerOuter,
        cursor: "pointer",
        border: user.is_talking ? "none" : "1px solid rgba(0,0,0,0.2)",
        // ✅ Tam ekrandayken düzgün görünüm
        ...isFullscreen && {
          width: "100vw",
          height: "100vh",
          maxWidth: "none",
          paddingBottom: 0
          // ✅ Tam ekranda padding trick iptal
        },
        ...style
        // Allow style overrides (en son, çünkü dışarıdan gelen override olabilir)
      },
      onClick: /* @__PURE__ */ __name(() => onClick && onClick(id), "onClick"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                @keyframes floatUp {
                    0% { transform: translateY(0) scale(0.5); opacity: 0; }
                    20% { opacity: 1; transform: translateY(-20px) scale(1.2); }
                    100% { transform: translateY(-100px) scale(1); opacity: 0; }
                }
            ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          ...styles.aspectRatioWrapper,
          // ✅ Tam ekrandayken full yükseklik
          height: isFullscreen ? "100%" : styles.aspectRatioWrapper.height
        }, children: [
          videoStream ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.videoFull, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              VideoPlayer,
              {
                stream: videoStream,
                isMirrored,
                objectFit: "cover"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: toggleFullscreen,
                style: {
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  backgroundColor: "rgba(0,0,0,0.7)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  fontSize: "14px",
                  zIndex: 15,
                  backdropFilter: "blur(4px)",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px"
                },
                onMouseEnter: /* @__PURE__ */ __name((e) => e.target.style.backgroundColor = "rgba(88, 101, 242, 0.8)", "onMouseEnter"),
                onMouseLeave: /* @__PURE__ */ __name((e) => e.target.style.backgroundColor = "rgba(0,0,0,0.7)", "onMouseLeave"),
                title: isFullscreen ? "Tam Ekrandan Çık (ESC)" : "Tam Ekran",
                children: isFullscreen ? "🔙" : "🔳"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.label, children: streamType === "screen" ? "🖥️" : "📷" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.avatarPlaceholder, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: avatarUrl || "https://media.pawscord.com/assets/logo.png",
                style: {
                  ...styles.avatarImage,
                  border: user.is_talking ? "3px solid #3ba55c" : "2px solid #202225",
                  transform: user.is_talking ? "scale(1.1)" : "scale(1)",
                  transition: "all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                },
                alt: user.username,
                onError: /* @__PURE__ */ __name((e) => {
                  e.target.onerror = null;
                  e.target.src = "https://media.pawscord.com/assets/logo.png";
                }, "onError")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.micStatus, children: user.is_deafened ? "🔕" : user.is_mic_off ? "🔇" : user.is_talking ? "🔊" : "🎤" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { position: "absolute", bottom: "10px", right: "10px", pointerEvents: "none", zIndex: 20 }, children: reactions.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            bottom: 0,
            right: 0 + Math.random() * 20,
            fontSize: "32px",
            animation: "floatUp 2s ease-out forwards"
          }, children: r.emoji }, r.id)) }),
          gameMove && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "64px",
            filter: "drop-shadow(0 0 10px rgba(0,0,0,0.8))",
            zIndex: 30,
            animation: "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }, children: gameMove === "rock" ? "🪨" : gameMove === "paper" ? "📄" : "✂️" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
                    @keyframes popIn {
                        from { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                        to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    }
                ` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.usernameOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: displayName }) })
        ] })
      ]
    }
  );
}, "UserVideoContainer");
const styles = {
  containerOuter: {
    flexGrow: 1,
    borderRadius: "12px",
    overflow: "hidden",
    // ✅ Scroll çıkmasın
    backgroundColor: "#2b2d31",
    boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
    transition: "all 0.2s ease-in-out",
    position: "relative",
    width: "100%",
    // ✅ Parent'a göre ayarla
    paddingBottom: "56.25%",
    // ✅ 16:9 aspect ratio (9/16 = 0.5625)
    minWidth: "200px"
  },
  aspectRatioWrapper: {
    position: "absolute",
    // ✅ Padding-bottom trick için absolute
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
    overflow: "hidden"
    // ✅ İçerik taşmasın
  },
  videoFull: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    overflow: "hidden"
    // ✅ Video taşmasın
  },
  videoElement: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "relative",
    zIndex: 2,
    display: "block"
    // ✅ Inline spacing kaldır
  },
  avatarPlaceholder: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e1f22"
  },
  avatarImage: {
    width: "65px",
    // Biraz büyüttüm
    height: "65px",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow: "0 5px 15px rgba(0,0,0,0.5)"
  },
  usernameOverlay: {
    position: "absolute",
    bottom: "8px",
    left: "8px",
    backgroundColor: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(4px)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "6px",
    fontSize: "0.75em",
    zIndex: 10,
    fontWeight: "bold",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "85%",
    border: "1px solid rgba(255,255,255,0.1)"
  },
  label: {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "4px",
    borderRadius: "4px",
    fontSize: "0.8em",
    zIndex: 1
  },
  micStatus: {
    position: "absolute",
    bottom: "8px",
    right: "8px",
    fontSize: "1.1em",
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "4px",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    border: "1px solid rgba(255,255,255,0.1)"
  }
};
const UserVideoContainer_default = React.memo(UserVideoContainer);
export {
  UserVideoContainer_default as default
};

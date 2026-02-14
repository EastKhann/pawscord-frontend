var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, aN as FaPlay, X as FaExternalLinkAlt } from "./icons-vendor-2VDeY8fW.js";
const LinkPreviewRenderer = /* @__PURE__ */ __name(({ url, onRemove }) => {
  const [preview, setPreview] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    fetchPreview();
  }, [url]);
  const fetchPreview = /* @__PURE__ */ __name(async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/link-preview/?url=${encodeURIComponent(url)}`);
      if (!response.ok) throw new Error("Failed to fetch preview");
      const data = await response.json();
      setPreview(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, "fetchPreview");
  const getProviderColor = /* @__PURE__ */ __name((provider) => {
    const colors = {
      youtube: "#FF0000",
      twitter: "#1DA1F2",
      github: "#333333",
      spotify: "#1DB954",
      twitch: "#9146FF"
    };
    return colors[provider?.toLowerCase()] || "#5865f2";
  }, "getProviderColor");
  const isVideo = /* @__PURE__ */ __name((url2) => {
    return url2.includes("youtube.com") || url2.includes("youtu.be") || url2.includes("vimeo.com") || preview?.type === "video";
  }, "isVideo");
  const getVideoThumbnail = /* @__PURE__ */ __name((url2) => {
    if (url2.includes("youtube.com") || url2.includes("youtu.be")) {
      const videoId = url2.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
    }
    return preview?.image;
  }, "getVideoThumbnail");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.loadingContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.loadingSpinner }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.loadingText, children: "Loading preview..." })
    ] });
  }
  if (error || !preview) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, children: [
    onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onRemove, style: styles.removeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) }),
    isVideo(url) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.videoPreview, children: [
      getVideoThumbnail(url) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.videoThumbnail, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: getVideoThumbnail(url), alt: "Video thumbnail", style: styles.videoImage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.playOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlay, { style: styles.playIcon }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.videoInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.videoTitle, children: preview.title || "Video" }),
        preview.description && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.videoDescription, children: [
          preview.description.substring(0, 150),
          "..."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: url, target: "_blank", rel: "noopener noreferrer", style: styles.videoLink, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaExternalLinkAlt, { style: { marginRight: "6px" } }),
          "Watch on ",
          preview.provider || "YouTube"
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: url, target: "_blank", rel: "noopener noreferrer", style: styles.linkPreview, children: [
      preview.image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.imageContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview.image, alt: preview.title, style: styles.image }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.contentContainer, children: [
        preview.provider && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.provider, borderLeftColor: getProviderColor(preview.provider) }, children: preview.provider }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.title, children: preview.title }),
        preview.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.description, children: preview.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.url, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaExternalLinkAlt, { style: { marginRight: "6px", fontSize: "10px" } }),
          new URL(url).hostname
        ] })
      ] })
    ] })
  ] });
}, "LinkPreviewRenderer");
const styles = {
  container: {
    position: "relative",
    marginTop: "12px",
    marginBottom: "8px"
  },
  loadingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    borderLeft: "4px solid #5865f2"
  },
  loadingSpinner: {
    width: "20px",
    height: "20px",
    border: "3px solid #2c2f33",
    borderTop: "3px solid #5865f2",
    borderRadius: "50%",
    animation: "spin 1s linear infinite"
  },
  loadingText: {
    fontSize: "13px",
    color: "#99aab5"
  },
  removeButton: {
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "rgba(0, 0, 0, 0.7)",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    cursor: "pointer",
    zIndex: 10,
    fontSize: "12px"
  },
  linkPreview: {
    display: "flex",
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    overflow: "hidden",
    textDecoration: "none",
    color: "inherit",
    transition: "transform 0.2s",
    borderLeft: "4px solid #5865f2",
    maxWidth: "500px"
  },
  imageContainer: {
    minWidth: "120px",
    maxWidth: "120px",
    height: "120px",
    overflow: "hidden",
    backgroundColor: "#1e1e1e"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  contentContainer: {
    padding: "12px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  provider: {
    fontSize: "11px",
    fontWeight: "600",
    color: "#5865f2",
    textTransform: "uppercase",
    borderLeft: "3px solid #5865f2",
    paddingLeft: "8px"
  },
  title: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    lineHeight: "1.3",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  },
  description: {
    fontSize: "12px",
    color: "#dcddde",
    lineHeight: "1.4",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical"
  },
  url: {
    fontSize: "11px",
    color: "#99aab5",
    display: "flex",
    alignItems: "center",
    marginTop: "auto"
  },
  videoPreview: {
    backgroundColor: "#2c2f33",
    borderRadius: "8px",
    overflow: "hidden",
    borderLeft: "4px solid #FF0000",
    maxWidth: "500px"
  },
  videoThumbnail: {
    position: "relative",
    width: "100%",
    paddingBottom: "56.25%",
    backgroundColor: "#1e1e1e",
    overflow: "hidden"
  },
  videoImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  playOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60px",
    height: "60px",
    backgroundColor: "rgba(255, 0, 0, 0.9)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer"
  },
  playIcon: {
    color: "#ffffff",
    fontSize: "24px",
    marginLeft: "4px"
  },
  videoInfo: {
    padding: "12px"
  },
  videoTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "6px",
    lineHeight: "1.3"
  },
  videoDescription: {
    fontSize: "12px",
    color: "#dcddde",
    marginBottom: "8px",
    lineHeight: "1.4"
  },
  videoLink: {
    fontSize: "12px",
    color: "#5865f2",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    fontWeight: "600"
  }
};
export {
  LinkPreviewRenderer as default
};

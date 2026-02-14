var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const getYouTubeVideoId = /* @__PURE__ */ __name((url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) return match[2];
  return null;
}, "getYouTubeVideoId");
const getYouTubeEmbedUrl = /* @__PURE__ */ __name((url) => {
  const id = getYouTubeVideoId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}, "getYouTubeEmbedUrl");
const getSpotifyEmbedUrl = /* @__PURE__ */ __name((url) => {
  if (!url) return null;
  const match = url.match(/https:\/\/open\.spotify\.com\/(track|album|playlist|episode)\/([a-zA-Z0-9]+)/);
  if (match) return `https://open.spotify.com/embed/${match[1]}/${match[2]}`;
  return null;
}, "getSpotifyEmbedUrl");
const getProviderInfo = /* @__PURE__ */ __name((url, siteName) => {
  if (!url) return { name: "Website", color: "#5865f2" };
  const u = url.toLowerCase();
  if (u.includes("youtube.com") || u.includes("youtu.be")) return { name: "YouTube", color: "#FF0000" };
  if (u.includes("spotify.com")) return { name: "Spotify", color: "#1DB954" };
  if (u.includes("twitter.com") || u.includes("x.com")) return { name: "Twitter", color: "#1DA1F2" };
  if (u.includes("github.com")) return { name: "GitHub", color: "#f0f6fc" };
  if (u.includes("twitch.tv")) return { name: "Twitch", color: "#9146FF" };
  if (u.includes("reddit.com")) return { name: "Reddit", color: "#FF4500" };
  if (u.includes("instagram.com")) return { name: "Instagram", color: "#E4405F" };
  if (u.includes("tiktok.com")) return { name: "TikTok", color: "#00f2ea" };
  if (u.includes("steam")) return { name: "Steam", color: "#66c0f4" };
  if (u.includes("wikipedia.org")) return { name: "Wikipedia", color: "#636466" };
  return { name: siteName || getDomain(url), color: "#5865f2" };
}, "getProviderInfo");
const getDomain = /* @__PURE__ */ __name((url) => {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}, "getDomain");
const LinkPreview = /* @__PURE__ */ __name(({ data }) => {
  if (!data || !data.url) return null;
  const youtubeEmbedUrl = getYouTubeEmbedUrl(data.url);
  const spotifyEmbedUrl = getSpotifyEmbedUrl(data.url);
  const provider = getProviderInfo(data.url, data.site_name);
  if (youtubeEmbedUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.embedContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.accentBar, backgroundColor: provider.color } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.embedBody, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.providerRow, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.providerName, color: provider.color }, children: provider.name }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: data.url, target: "_blank", rel: "noopener noreferrer", style: styles.embedTitle, children: data.title || "YouTube Video" }),
        data.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.embedDescription, children: data.description.length > 200 ? data.description.substring(0, 200) + "…" : data.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.videoWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            src: youtubeEmbedUrl,
            style: styles.videoIframe,
            title: "YouTube video player",
            frameBorder: "0",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true
          }
        ) })
      ] })
    ] });
  }
  if (spotifyEmbedUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.embedContainer, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.accentBar, backgroundColor: "#1DB954" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.embedBody, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.providerRow, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.providerName, color: "#1DB954" }, children: "Spotify" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.spotifyWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            src: spotifyEmbedUrl,
            style: { width: "100%", height: "80px", border: "none", borderRadius: 8 },
            title: "Spotify Player",
            allow: "encrypted-media"
          }
        ) })
      ] })
    ] });
  }
  const hasLargeImage = data.image && (data.title || data.description);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.embedContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles.accentBar, backgroundColor: provider.color } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.embedBody, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.providerRow, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { ...styles.providerName, color: provider.color }, children: provider.name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.embedContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.embedTextArea, children: [
          data.title && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: data.url, target: "_blank", rel: "noopener noreferrer", style: styles.embedTitle, children: data.title }),
          data.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.embedDescription, children: data.description.length > 300 ? data.description.substring(0, 300) + "…" : data.description })
        ] }),
        data.image && data.description && data.description.length < 100 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.thumbnailContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.image, alt: "", style: styles.thumbnailImg, loading: "lazy" }) })
      ] }),
      hasLargeImage && (!data.description || data.description.length >= 100) && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: data.url, target: "_blank", rel: "noopener noreferrer", style: { display: "block", marginTop: 8 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: data.image, alt: "", style: styles.largeImage, loading: "lazy" }) })
    ] })
  ] });
}, "LinkPreview");
const styles = {
  embedContainer: {
    display: "flex",
    marginTop: 6,
    maxWidth: 516,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "#2b2d31",
    border: "1px solid rgba(255,255,255,0.04)"
  },
  accentBar: {
    width: 4,
    flexShrink: 0,
    borderRadius: "4px 0 0 4px"
  },
  embedBody: {
    padding: "8px 16px 16px 12px",
    flex: 1,
    minWidth: 0,
    overflow: "hidden"
  },
  providerRow: {
    marginBottom: 4
  },
  providerName: {
    fontSize: 12,
    fontWeight: 500,
    lineHeight: "16px"
  },
  embedTitle: {
    display: "block",
    color: "#00a8fc",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "1rem",
    lineHeight: "1.25rem",
    marginBottom: 4,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  embedDescription: {
    fontSize: "0.875rem",
    color: "#dcddde",
    margin: 0,
    lineHeight: "1.125rem",
    maxHeight: 54,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical"
  },
  embedContent: {
    display: "flex",
    gap: 16
  },
  embedTextArea: {
    flex: 1,
    minWidth: 0
  },
  thumbnailContainer: {
    flexShrink: 0,
    width: 80,
    height: 80,
    borderRadius: 4,
    overflow: "hidden"
  },
  thumbnailImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  largeImage: {
    maxWidth: "100%",
    maxHeight: 300,
    borderRadius: 4,
    objectFit: "cover",
    display: "block"
  },
  videoWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: 400,
    aspectRatio: "16/9",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 8,
    backgroundColor: "#000"
  },
  videoIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none"
  },
  spotifyWrapper: {
    marginTop: 4,
    borderRadius: 8,
    overflow: "hidden"
  }
};
const LinkPreview_default = reactExports.memo(LinkPreview);
export {
  LinkPreview_default as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./react-core-BiY6fgAJ.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const initializeDeepLinkHandler = /* @__PURE__ */ __name((navigate) => {
  if (!window.Capacitor?.isNativePlatform()) {
    return;
  }
  window.Capacitor.Plugins.App.addListener("appUrlOpen", (data) => {
    handleDeepLink(data.url, navigate);
  });
}, "initializeDeepLinkHandler");
const handleDeepLink = /* @__PURE__ */ __name((url, navigate) => {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const params = new URLSearchParams(urlObj.search);
    if (path.startsWith("/chat/")) {
      const conversationId = path.split("/chat/")[1];
      navigate(`/chat/${conversationId}`);
    } else if (path.startsWith("/server/")) {
      const serverId = path.split("/server/")[1];
      navigate(`/server/${serverId}`);
    } else if (path.startsWith("/profile/")) {
      const userId = path.split("/profile/")[1];
      navigate(`/profile/${userId}`);
    } else if (path === "/notifications") {
      navigate("/notifications");
    } else {
      navigate(path || "/");
    }
  } catch (error) {
    console.error("❌ Deep link error:", error);
  }
}, "handleDeepLink");
export {
  handleDeepLink,
  initializeDeepLinkHandler
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const MobileNav = /* @__PURE__ */ __name(({ activeTab, onTabChange }) => {
  const [isKeyboardVisible, setIsKeyboardVisible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const handleResize = /* @__PURE__ */ __name(() => {
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.innerHeight;
      setIsKeyboardVisible(viewportHeight < windowHeight * 0.75);
    }, "handleResize");
    window.visualViewport?.addEventListener("resize", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  if (isKeyboardVisible) {
    return null;
  }
  const tabs = [
    { id: "chats", icon: "💬", label: "Chats" },
    { id: "servers", icon: "🏠", label: "Servers" },
    { id: "friends", icon: "👥", label: "Friends" },
    { id: "profile", icon: "👤", label: "Profile" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "mobile-nav", children: tabs.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      className: `nav-tab ${activeTab === tab.id ? "active" : ""}`,
      onClick: /* @__PURE__ */ __name(() => onTabChange(tab.id), "onClick"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-icon", children: tab.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tab-label", children: tab.label }),
        activeTab === tab.id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tab-indicator" })
      ]
    },
    tab.id
  )) });
}, "MobileNav");
export {
  MobileNav as default
};

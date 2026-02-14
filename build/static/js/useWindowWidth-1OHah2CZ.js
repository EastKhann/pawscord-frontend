var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports } from "./react-core-BiY6fgAJ.js";
const useWindowWidth = /* @__PURE__ */ __name(() => {
  const [width, setWidth] = reactExports.useState(window.innerWidth);
  reactExports.useEffect(() => {
    const h = /* @__PURE__ */ __name(() => setWidth(window.innerWidth), "h");
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile: width <= 768, isTablet: width <= 1024, width };
}, "useWindowWidth");
export {
  useWindowWidth as u
};

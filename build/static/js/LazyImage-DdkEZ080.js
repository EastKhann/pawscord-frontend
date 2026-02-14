var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const supportsWebP = (() => {
  if (typeof window === "undefined") return false;
  const canvas = document.createElement("canvas");
  if (canvas.getContext && canvas.getContext("2d")) {
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  }
  return false;
})();
const getOptimizedUrl = /* @__PURE__ */ __name((src, size = "medium", quality = 85) => {
  if (!src || src.startsWith("blob:") || src.startsWith("data:")) {
    return src;
  }
  if (src.includes("?")) {
    return src;
  }
  const sizes = {
    small: 32,
    medium: 64,
    large: 128,
    xlarge: 256
  };
  const dimension = sizes[size] || sizes.medium;
  const params = new URLSearchParams({
    w: dimension,
    h: dimension,
    q: quality,
    f: supportsWebP ? "webp" : "auto"
  });
  return `${src}?${params.toString()}`;
}, "getOptimizedUrl");
const LazyImage = /* @__PURE__ */ __name(({
  src,
  alt = "",
  size = "medium",
  quality = 85,
  style = {},
  className = "",
  onLoad = /* @__PURE__ */ __name(() => {
  }, "onLoad"),
  showBlurPlaceholder = true,
  ...props
}) => {
  const [shouldLoad, setShouldLoad] = reactExports.useState(false);
  const [isLoaded, setIsLoaded] = reactExports.useState(false);
  const [currentSrc, setCurrentSrc] = reactExports.useState(null);
  const [hasError, setHasError] = reactExports.useState(false);
  const imgRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "100px",
        // 100px önceden yükle
        threshold: 0.01
      }
    );
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    return () => {
      if (observer && imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);
  reactExports.useEffect(() => {
    if (shouldLoad && src) {
      const optimizedSrc = getOptimizedUrl(src, size, quality);
      setCurrentSrc(optimizedSrc);
    }
  }, [shouldLoad, src, size, quality]);
  const handleLoad = /* @__PURE__ */ __name(() => {
    setIsLoaded(true);
    setHasError(false);
    onLoad();
  }, "handleLoad");
  const handleError = /* @__PURE__ */ __name(() => {
    setHasError(true);
    if (currentSrc !== src) {
      setCurrentSrc(src);
    }
  }, "handleError");
  const blurPlaceholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect fill="%232b2d31" width="100" height="100"/%3E%3C/svg%3E';
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref: imgRef,
      style: {
        position: "relative",
        overflow: "hidden",
        ...style
      },
      className,
      children: [
        showBlurPlaceholder && !isLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#2b2d31",
              backgroundImage: `url("${blurPlaceholder}")`,
              backgroundSize: "cover",
              filter: "blur(10px)",
              transform: "scale(1.1)",
              transition: "opacity 0.3s ease-in-out",
              opacity: isLoaded ? 0 : 1
            }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: currentSrc || blurPlaceholder,
            alt,
            style: {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.3s ease-in-out",
              opacity: isLoaded ? 1 : 0
            },
            onLoad: handleLoad,
            onError: handleError,
            loading: "lazy",
            ...props
          }
        ),
        hasError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2b2d31",
              color: "#b9bbbe",
              fontSize: "12px"
            },
            children: "❌"
          }
        )
      ]
    }
  );
}, "LazyImage");
const LazyImage$1 = React.memo(LazyImage);
export {
  LazyImage$1 as L
};

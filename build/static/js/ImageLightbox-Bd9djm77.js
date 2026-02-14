var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, j as jsxRuntimeExports, f as ReactDOM } from "./react-core-BiY6fgAJ.js";
import { cb as FaSearchMinus, cc as FaSearchPlus, aD as FaUndo, b2 as FaExpand, a5 as FaDownload, a as FaTimes, cd as FaChevronLeft, bJ as FaChevronRight } from "./icons-vendor-2VDeY8fW.js";
const ImageLightbox = /* @__PURE__ */ __name(({ imageUrl, images = [], startIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = reactExports.useState(startIndex);
  const [zoom, setZoom] = reactExports.useState(1);
  const [rotation, setRotation] = reactExports.useState(0);
  const [position, setPosition] = reactExports.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const dragRef = reactExports.useRef({ startX: 0, startY: 0, startPosX: 0, startPosY: 0 });
  const imageList = images.length > 0 ? images : imageUrl ? [imageUrl] : [];
  const currentImage = imageList[currentIndex] || imageUrl;
  const hasMultiple = imageList.length > 1;
  const goNext = reactExports.useCallback(() => {
    if (hasMultiple) {
      setCurrentIndex((i) => (i + 1) % imageList.length);
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [hasMultiple, imageList.length]);
  const goPrev = reactExports.useCallback(() => {
    if (hasMultiple) {
      setCurrentIndex((i) => (i - 1 + imageList.length) % imageList.length);
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [hasMultiple, imageList.length]);
  const handleZoomIn = reactExports.useCallback(() => setZoom((z) => Math.min(z + 0.5, 5)), []);
  const handleZoomOut = reactExports.useCallback(() => {
    setZoom((z) => {
      const nz = Math.max(z - 0.5, 0.5);
      if (nz <= 1) setPosition({ x: 0, y: 0 });
      return nz;
    });
  }, []);
  const handleRotate = reactExports.useCallback(() => setRotation((r) => (r + 90) % 360), []);
  const handleReset = reactExports.useCallback(() => {
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, []);
  const handleDownload = reactExports.useCallback(() => {
    const a = document.createElement("a");
    a.href = currentImage;
    a.download = currentImage.split("/").pop() || "image";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [currentImage]);
  reactExports.useEffect(() => {
    const handler = /* @__PURE__ */ __name((e) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "r":
          handleRotate();
          break;
        case "0":
          handleReset();
          break;
      }
    }, "handler");
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, goNext, goPrev, handleZoomIn, handleZoomOut, handleRotate, handleReset]);
  const handleWheel = reactExports.useCallback((e) => {
    e.preventDefault();
    if (e.deltaY < 0) setZoom((z) => Math.min(z + 0.2, 5));
    else setZoom((z) => Math.max(z - 0.2, 0.5));
  }, []);
  const handleMouseDown = reactExports.useCallback((e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, startPosX: position.x, startPosY: position.y };
  }, [zoom, position]);
  const handleMouseMove = reactExports.useCallback((e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setPosition({ x: dragRef.current.startPosX + dx, y: dragRef.current.startPosY + dy });
  }, [isDragging]);
  const handleMouseUp = reactExports.useCallback(() => setIsDragging(false), []);
  reactExports.useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.overlay, onClick: /* @__PURE__ */ __name((e) => e.target === e.currentTarget && onClose(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.toolbarLeft, children: [
        hasMultiple && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.counter, children: [
          currentIndex + 1,
          " / ",
          imageList.length
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: S.zoomLabel, children: [
          Math.round(zoom * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.toolbarActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: S.toolBtn, onClick: handleZoomOut, title: "Uzaklaştır (-)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearchMinus, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: S.toolBtn, onClick: handleZoomIn, title: "Yakınlaştır (+)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaSearchPlus, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: S.toolBtn, onClick: handleRotate, title: "Döndür (R)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaUndo, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: S.toolBtn, onClick: handleReset, title: "Sıfırla (0)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaExpand, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.toolDivider }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: S.toolBtn, onClick: handleDownload, title: "İndir", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaDownload, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...S.toolBtn, ...S.closeBtn }, onClick: onClose, title: "Kapat (Esc)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
      ] })
    ] }),
    hasMultiple && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...S.navBtn, left: 16 }, onClick: goPrev, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronLeft, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: { ...S.navBtn, right: 16 }, onClick: goNext, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaChevronRight, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: S.imageContainer,
        onWheel: handleWheel,
        onMouseDown: handleMouseDown,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: currentImage,
            alt: "Preview",
            draggable: false,
            style: {
              ...S.image,
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              cursor: zoom > 1 ? isDragging ? "grabbing" : "grab" : "default",
              transition: isDragging ? "none" : "transform 0.2s ease"
            }
          }
        )
      }
    ),
    hasMultiple && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S.thumbStrip, children: imageList.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        onClick: /* @__PURE__ */ __name(() => {
          setCurrentIndex(i);
          setZoom(1);
          setRotation(0);
          setPosition({ x: 0, y: 0 });
        }, "onClick"),
        style: {
          ...S.thumb,
          borderColor: i === currentIndex ? "#5865f2" : "transparent",
          opacity: i === currentIndex ? 1 : 0.5
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", style: S.thumbImg })
      },
      i
    )) })
  ] });
  return ReactDOM.createPortal(content, document.body);
}, "ImageLightbox");
const S = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.92)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1e4
  },
  toolbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 20px",
    background: "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
    zIndex: 10
  },
  toolbarLeft: { display: "flex", alignItems: "center", gap: 12 },
  toolbarActions: { display: "flex", alignItems: "center", gap: 4 },
  counter: { color: "#fff", fontSize: 14, fontWeight: 600 },
  zoomLabel: { color: "#949ba4", fontSize: 12 },
  toolBtn: {
    background: "rgba(255,255,255,0.1)",
    border: "none",
    color: "#fff",
    width: 36,
    height: 36,
    borderRadius: 8,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    transition: "background 0.15s"
  },
  closeBtn: { background: "rgba(218,55,60,0.3)" },
  toolDivider: { width: 1, height: 20, backgroundColor: "rgba(255,255,255,0.2)", margin: "0 4px" },
  navBtn: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.6)",
    border: "none",
    color: "#fff",
    width: 48,
    height: 48,
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    zIndex: 10,
    transition: "background 0.15s"
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%"
  },
  image: {
    maxWidth: "90vw",
    maxHeight: "80vh",
    objectFit: "contain",
    userSelect: "none",
    pointerEvents: "none"
  },
  thumbStrip: {
    position: "absolute",
    bottom: 16,
    display: "flex",
    gap: 8,
    padding: "8px 12px",
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
    maxWidth: "80vw",
    overflowX: "auto"
  },
  thumb: {
    width: 48,
    height: 48,
    borderRadius: 6,
    border: "2px solid transparent",
    cursor: "pointer",
    overflow: "hidden",
    flexShrink: 0,
    transition: "all 0.15s"
  },
  thumbImg: { width: "100%", height: "100%", objectFit: "cover" }
};
if (typeof document !== "undefined") {
  const id = "lightbox-styles";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
            [data-lb-tool]:hover { background: rgba(255,255,255,0.2) !important; }
            [data-lb-nav]:hover { background: rgba(0,0,0,0.8) !important; }
        `;
    document.head.appendChild(s);
  }
}
const ImageLightbox_default = React.memo(ImageLightbox);
export {
  ImageLightbox_default as default
};

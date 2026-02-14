var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { a as React, r as reactExports, f as ReactDOM, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
const ImageModal = /* @__PURE__ */ __name(({ imageUrl, onClose }) => {
  reactExports.useEffect(() => {
    const handleKeyDown = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") {
        onClose();
      }
    }, "handleKeyDown");
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  const modalContent = /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: imageUrl, style: styles.image, alt: "Büyütülmüş Resim" }) });
  return ReactDOM.createPortal(modalContent, document.body);
}, "ImageModal");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2e3,
    cursor: "pointer"
  },
  image: {
    maxWidth: "90vw",
    maxHeight: "90vh",
    objectFit: "contain",
    boxShadow: "0 0 30px rgba(0,0,0,0.5)"
  }
};
const ImageModal_default = React.memo(ImageModal);
export {
  ImageModal_default as default
};

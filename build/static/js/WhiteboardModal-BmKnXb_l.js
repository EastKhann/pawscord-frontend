var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { a as FaTimes, aO as FaEraser, aP as FaPen, g as FaTrash } from "./icons-vendor-2VDeY8fW.js";
const WhiteboardModal = /* @__PURE__ */ __name(({ roomSlug, onClose, wsProtocol, apiHost }) => {
  const canvasRef = reactExports.useRef(null);
  const ws = reactExports.useRef(null);
  const [isDrawing, setIsDrawing] = reactExports.useState(false);
  const [color, setColor] = reactExports.useState("#000000");
  const [lineWidth, setLineWidth] = reactExports.useState(3);
  reactExports.useEffect(() => {
    const url = `${wsProtocol}://${apiHost}/ws/whiteboard/${roomSlug}/`;
    ws.current = new WebSocket(url);
    ws.current.onmessage = (event) => {
      const { x, y, type, color: remoteColor, width: remoteWidth, prevX, prevY } = JSON.parse(event.data);
      const ctx = canvasRef.current.getContext("2d");
      if (type === "draw") {
        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = remoteColor;
        ctx.lineWidth = remoteWidth;
        ctx.lineCap = "round";
        ctx.stroke();
      } else if (type === "clear") {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
    return () => ws.current.close();
  }, [roomSlug, wsProtocol, apiHost]);
  reactExports.useEffect(() => {
    const handleEsc = /* @__PURE__ */ __name((e) => {
      if (e.key === "Escape") onClose();
    }, "handleEsc");
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  const startDrawing = /* @__PURE__ */ __name(({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    canvasRef.current.lastX = offsetX;
    canvasRef.current.lastY = offsetY;
  }, "startDrawing");
  const draw = /* @__PURE__ */ __name(({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(canvasRef.current.lastX, canvasRef.current.lastY);
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.stroke();
    if (ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: "draw",
        x: offsetX,
        y: offsetY,
        prevX: canvasRef.current.lastX,
        prevY: canvasRef.current.lastY,
        color,
        width: lineWidth
      }));
    }
    canvasRef.current.lastX = offsetX;
    canvasRef.current.lastY = offsetY;
  }, "draw");
  const stopDrawing = /* @__PURE__ */ __name(() => {
    setIsDrawing(false);
  }, "stopDrawing");
  const clearBoard = /* @__PURE__ */ __name(() => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ws.current.send(JSON.stringify({ type: "clear" }));
  }, "clearBoard");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "🎨 Ortak Çizim Tahtası" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.toolbar, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: color, onChange: /* @__PURE__ */ __name((e) => setColor(e.target.value), "onChange"), style: styles.colorPicker }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: "1", max: "20", value: lineWidth, onChange: /* @__PURE__ */ __name((e) => setLineWidth(e.target.value), "onChange") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setColor("#ffffff"), "onClick"), style: styles.toolBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaEraser, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setColor("#000000"), "onClick"), style: styles.toolBtn, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPen, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearBoard, style: { ...styles.toolBtn, color: "red" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTrash, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.canvasContainer, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        onMouseDown: startDrawing,
        onMouseMove: draw,
        onMouseUp: stopDrawing,
        onMouseLeave: stopDrawing,
        style: styles.canvas
      }
    ) })
  ] }) });
}, "WhiteboardModal");
const styles = {
  overlay: { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.85)", zIndex: 3e3, display: "flex", justifyContent: "center", alignItems: "center" },
  modal: { backgroundColor: "#2b2d31", borderRadius: "12px", padding: "10px", display: "flex", flexDirection: "column", gap: "10px" },
  header: { display: "flex", justifyContent: "space-between", color: "white", padding: "0 10px" },
  closeBtn: { background: "none", border: "none", color: "white", fontSize: "1.5em", cursor: "pointer" },
  toolbar: { display: "flex", gap: "10px", alignItems: "center", backgroundColor: "#1e1f22", padding: "10px", borderRadius: "8px" },
  canvasContainer: { border: "1px solid #1e1f22", borderRadius: "4px", overflow: "hidden", backgroundColor: "white" },
  canvas: { cursor: "crosshair", touchAction: "none" },
  toolBtn: { background: "none", border: "none", color: "#ccc", fontSize: "1.2em", cursor: "pointer" },
  colorPicker: { border: "none", width: "30px", height: "30px", cursor: "pointer", padding: 0 }
};
export {
  WhiteboardModal as default
};

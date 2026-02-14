var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var _a;
import { r as reactExports, a as React, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
var _ = Object.defineProperty;
var $ = /* @__PURE__ */ __name((a, h, e) => h in a ? _(a, h, { enumerable: true, configurable: true, writable: true, value: e }) : a[h] = e, "$");
var m = /* @__PURE__ */ __name((a, h, e) => $(a, typeof h != "symbol" ? h + "" : h, e), "m");
const E = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, b = /* @__PURE__ */ __name((a, h, e) => Math.min(Math.max(a, h), e), "b"), H = /* @__PURE__ */ __name((...a) => a.filter((h) => h && typeof h == "string").join(" "), "H"), X = /* @__PURE__ */ __name((a, h) => a === h || a.width === h.width && a.height === h.height && a.x === h.x && a.y === h.y && a.unit === h.unit, "X");
function v(a, h, e) {
  return a.unit === "%" ? { ...E, ...a, unit: "%" } : {
    unit: "%",
    x: a.x ? a.x / h * 100 : 0,
    y: a.y ? a.y / e * 100 : 0,
    width: a.width ? a.width / h * 100 : 0,
    height: a.height ? a.height / e * 100 : 0
  };
}
__name(v, "v");
function D(a, h, e) {
  return a.unit ? a.unit === "px" ? { ...E, ...a, unit: "px" } : {
    unit: "px",
    x: a.x ? a.x * h / 100 : 0,
    y: a.y ? a.y * e / 100 : 0,
    width: a.width ? a.width * h / 100 : 0,
    height: a.height ? a.height * e / 100 : 0
  } : { ...E, ...a, unit: "px" };
}
__name(D, "D");
function k(a, h, e, n, t, d = 0, r = 0, o = n, w = t) {
  const i = { ...a };
  let s = Math.min(d, n), c = Math.min(r, t), g = Math.min(o, n), p = Math.min(w, t);
  h && (h > 1 ? (s = r ? r * h : s, c = s / h, g = o * h) : (c = d ? d / h : c, s = c * h, p = w / h)), i.y < 0 && (i.height = Math.max(i.height + i.y, c), i.y = 0), i.x < 0 && (i.width = Math.max(i.width + i.x, s), i.x = 0);
  const l = n - (i.x + i.width);
  l < 0 && (i.x = Math.min(i.x, n - s), i.width += l);
  const C = t - (i.y + i.height);
  if (C < 0 && (i.y = Math.min(i.y, t - c), i.height += C), i.width < s && ((e === "sw" || e == "nw") && (i.x -= s - i.width), i.width = s), i.height < c && ((e === "nw" || e == "ne") && (i.y -= c - i.height), i.height = c), i.width > g && ((e === "sw" || e == "nw") && (i.x -= g - i.width), i.width = g), i.height > p && ((e === "nw" || e == "ne") && (i.y -= p - i.height), i.height = p), h) {
    const y = i.width / i.height;
    if (y < h) {
      const f = Math.max(i.width / h, c);
      (e === "nw" || e == "ne") && (i.y -= f - i.height), i.height = f;
    } else if (y > h) {
      const f = Math.max(i.height * h, s);
      (e === "sw" || e == "nw") && (i.x -= f - i.width), i.width = f;
    }
  }
  return i;
}
__name(k, "k");
function I(a, h, e, n) {
  const t = { ...a };
  return h === "ArrowLeft" ? n === "nw" ? (t.x -= e, t.y -= e, t.width += e, t.height += e) : n === "w" ? (t.x -= e, t.width += e) : n === "sw" ? (t.x -= e, t.width += e, t.height += e) : n === "ne" ? (t.y += e, t.width -= e, t.height -= e) : n === "e" ? t.width -= e : n === "se" && (t.width -= e, t.height -= e) : h === "ArrowRight" && (n === "nw" ? (t.x += e, t.y += e, t.width -= e, t.height -= e) : n === "w" ? (t.x += e, t.width -= e) : n === "sw" ? (t.x += e, t.width -= e, t.height -= e) : n === "ne" ? (t.y -= e, t.width += e, t.height += e) : n === "e" ? t.width += e : n === "se" && (t.width += e, t.height += e)), h === "ArrowUp" ? n === "nw" ? (t.x -= e, t.y -= e, t.width += e, t.height += e) : n === "n" ? (t.y -= e, t.height += e) : n === "ne" ? (t.y -= e, t.width += e, t.height += e) : n === "sw" ? (t.x += e, t.width -= e, t.height -= e) : n === "s" ? t.height -= e : n === "se" && (t.width -= e, t.height -= e) : h === "ArrowDown" && (n === "nw" ? (t.x += e, t.y += e, t.width -= e, t.height -= e) : n === "n" ? (t.y += e, t.height -= e) : n === "ne" ? (t.y += e, t.width -= e, t.height -= e) : n === "sw" ? (t.x -= e, t.width += e, t.height += e) : n === "s" ? t.height += e : n === "se" && (t.width += e, t.height += e)), t;
}
__name(I, "I");
const M = { capture: true, passive: false };
let N = 0;
const x = (_a = class extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    m(this, "docMoveBound", false);
    m(this, "mouseDownOnCrop", false);
    m(this, "dragStarted", false);
    m(this, "evData", {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: true
    });
    m(this, "componentRef", reactExports.createRef());
    m(this, "mediaRef", reactExports.createRef());
    m(this, "resizeObserver");
    m(this, "initChangeCalled", false);
    m(this, "instanceId", `rc-${N++}`);
    m(this, "state", {
      cropIsActive: false,
      newCropIsBeingDrawn: false
    });
    m(this, "onCropPointerDown", (e) => {
      const { crop: n, disabled: t } = this.props, d = this.getBox();
      if (!n)
        return;
      const r = D(n, d.width, d.height);
      if (t)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: true });
      const o = e.target.dataset.ord, w = !!o;
      let i = e.clientX, s = e.clientY, c = r.x, g = r.y;
      if (o) {
        const p = e.clientX - d.x, l = e.clientY - d.y;
        let C = 0, y = 0;
        o === "ne" || o == "e" ? (C = p - (r.x + r.width), y = l - r.y, c = r.x, g = r.y + r.height) : o === "se" || o === "s" ? (C = p - (r.x + r.width), y = l - (r.y + r.height), c = r.x, g = r.y) : o === "sw" || o == "w" ? (C = p - r.x, y = l - (r.y + r.height), c = r.x + r.width, g = r.y) : (o === "nw" || o == "n") && (C = p - r.x, y = l - r.y, c = r.x + r.width, g = r.y + r.height), i = c + d.x + C, s = g + d.y + y;
      }
      this.evData = {
        startClientX: i,
        startClientY: s,
        startCropX: c,
        startCropY: g,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: w,
        ord: o
      }, this.mouseDownOnCrop = true, this.setState({ cropIsActive: true });
    });
    m(this, "onComponentPointerDown", (e) => {
      const { crop: n, disabled: t, locked: d, keepSelection: r, onChange: o } = this.props, w = this.getBox();
      if (t || d || r && n)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: true });
      const i = e.clientX - w.x, s = e.clientY - w.y, c = {
        unit: "px",
        x: i,
        y: s,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startCropX: i,
        startCropY: s,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: true
      }, this.mouseDownOnCrop = true, o(D(c, w.width, w.height), v(c, w.width, w.height)), this.setState({ cropIsActive: true, newCropIsBeingDrawn: true });
    });
    m(this, "onDocPointerMove", (e) => {
      const { crop: n, disabled: t, onChange: d, onDragStart: r } = this.props, o = this.getBox();
      if (t || !n || !this.mouseDownOnCrop)
        return;
      e.cancelable && e.preventDefault(), this.dragStarted || (this.dragStarted = true, r && r(e));
      const { evData: w } = this;
      w.clientX = e.clientX, w.clientY = e.clientY;
      let i;
      w.isResize ? i = this.resizeCrop() : i = this.dragCrop(), X(n, i) || d(
        D(i, o.width, o.height),
        v(i, o.width, o.height)
      );
    });
    m(this, "onComponentKeyDown", (e) => {
      const { crop: n, disabled: t, onChange: d, onComplete: r } = this.props;
      if (t)
        return;
      const o = e.key;
      let w = false;
      if (!n)
        return;
      const i = this.getBox(), s = this.makePixelCrop(i), g = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? _a.nudgeStepLarge : e.shiftKey ? _a.nudgeStepMedium : _a.nudgeStep;
      if (o === "ArrowLeft" ? (s.x -= g, w = true) : o === "ArrowRight" ? (s.x += g, w = true) : o === "ArrowUp" ? (s.y -= g, w = true) : o === "ArrowDown" && (s.y += g, w = true), w) {
        e.cancelable && e.preventDefault(), s.x = b(s.x, 0, i.width - s.width), s.y = b(s.y, 0, i.height - s.height);
        const p = D(s, i.width, i.height), l = v(s, i.width, i.height);
        d(p, l), r && r(p, l);
      }
    });
    m(this, "onHandlerKeyDown", (e, n) => {
      const {
        aspect: t = 0,
        crop: d,
        disabled: r,
        minWidth: o = 0,
        minHeight: w = 0,
        maxWidth: i,
        maxHeight: s,
        onChange: c,
        onComplete: g
      } = this.props, p = this.getBox();
      if (r || !d)
        return;
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")
        e.stopPropagation(), e.preventDefault();
      else
        return;
      const C = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? _a.nudgeStepLarge : e.shiftKey ? _a.nudgeStepMedium : _a.nudgeStep, y = D(d, p.width, p.height), f = I(y, e.key, C, n), R = k(
        f,
        t,
        n,
        p.width,
        p.height,
        o,
        w,
        i,
        s
      );
      if (!X(d, R)) {
        const Y = v(R, p.width, p.height);
        c(R, Y), g && g(R, Y);
      }
    });
    m(this, "onDocPointerDone", (e) => {
      const { crop: n, disabled: t, onComplete: d, onDragEnd: r } = this.props, o = this.getBox();
      this.unbindDocMove(), !(t || !n) && this.mouseDownOnCrop && (this.mouseDownOnCrop = false, this.dragStarted = false, r && r(e), d && d(D(n, o.width, o.height), v(n, o.width, o.height)), this.setState({ cropIsActive: false, newCropIsBeingDrawn: false }));
    });
    m(this, "onDragFocus", () => {
      var e;
      (e = this.componentRef.current) == null || e.scrollTo(0, 0);
    });
  }
  get document() {
    return document;
  }
  // We unfortunately get the bounding box every time as x+y changes
  // due to scrolling.
  getBox() {
    const e = this.mediaRef.current;
    if (!e)
      return { x: 0, y: 0, width: 0, height: 0 };
    const { x: n, y: t, width: d, height: r } = e.getBoundingClientRect();
    return { x: n, y: t, width: d, height: r };
  }
  componentDidUpdate(e) {
    const { crop: n, onComplete: t } = this.props;
    if (t && !e.crop && n) {
      const { width: d, height: r } = this.getBox();
      d && r && t(D(n, d, r), v(n, d, r));
    }
  }
  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect(), this.unbindDocMove();
  }
  bindDocMove() {
    this.docMoveBound || (this.document.addEventListener("pointermove", this.onDocPointerMove, M), this.document.addEventListener("pointerup", this.onDocPointerDone, M), this.document.addEventListener("pointercancel", this.onDocPointerDone, M), this.docMoveBound = true);
  }
  unbindDocMove() {
    this.docMoveBound && (this.document.removeEventListener("pointermove", this.onDocPointerMove, M), this.document.removeEventListener("pointerup", this.onDocPointerDone, M), this.document.removeEventListener("pointercancel", this.onDocPointerDone, M), this.docMoveBound = false);
  }
  getCropStyle() {
    const { crop: e } = this.props;
    if (e)
      return {
        top: `${e.y}${e.unit}`,
        left: `${e.x}${e.unit}`,
        width: `${e.width}${e.unit}`,
        height: `${e.height}${e.unit}`
      };
  }
  dragCrop() {
    const { evData: e } = this, n = this.getBox(), t = this.makePixelCrop(n), d = e.clientX - e.startClientX, r = e.clientY - e.startClientY;
    return t.x = b(e.startCropX + d, 0, n.width - t.width), t.y = b(e.startCropY + r, 0, n.height - t.height), t;
  }
  getPointRegion(e, n, t, d) {
    const { evData: r } = this, o = r.clientX - e.x, w = r.clientY - e.y;
    let i;
    d && n ? i = n === "nw" || n === "n" || n === "ne" : i = w < r.startCropY;
    let s;
    return t && n ? s = n === "nw" || n === "w" || n === "sw" : s = o < r.startCropX, s ? i ? "nw" : "sw" : i ? "ne" : "se";
  }
  resolveMinDimensions(e, n, t = 0, d = 0) {
    const r = Math.min(t, e.width), o = Math.min(d, e.height);
    return !n || !r && !o ? [r, o] : n > 1 ? r ? [r, r / n] : [o * n, o] : o ? [o * n, o] : [r, r / n];
  }
  resizeCrop() {
    const { evData: e } = this, { aspect: n = 0, maxWidth: t, maxHeight: d } = this.props, r = this.getBox(), [o, w] = this.resolveMinDimensions(r, n, this.props.minWidth, this.props.minHeight);
    let i = this.makePixelCrop(r);
    const s = this.getPointRegion(r, e.ord, o, w), c = e.ord || s;
    let g = e.clientX - e.startClientX, p = e.clientY - e.startClientY;
    (o && c === "nw" || c === "w" || c === "sw") && (g = Math.min(g, -o)), (w && c === "nw" || c === "n" || c === "ne") && (p = Math.min(p, -w));
    const l = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    s === "ne" ? (l.x = e.startCropX, l.width = g, n ? (l.height = l.width / n, l.y = e.startCropY - l.height) : (l.height = Math.abs(p), l.y = e.startCropY - l.height)) : s === "se" ? (l.x = e.startCropX, l.y = e.startCropY, l.width = g, n ? l.height = l.width / n : l.height = p) : s === "sw" ? (l.x = e.startCropX + g, l.y = e.startCropY, l.width = Math.abs(g), n ? l.height = l.width / n : l.height = p) : s === "nw" && (l.x = e.startCropX + g, l.width = Math.abs(g), n ? (l.height = l.width / n, l.y = e.startCropY - l.height) : (l.height = Math.abs(p), l.y = e.startCropY + p));
    const C = k(
      l,
      n,
      s,
      r.width,
      r.height,
      o,
      w,
      t,
      d
    );
    return n || _a.xyOrds.indexOf(c) > -1 ? i = C : _a.xOrds.indexOf(c) > -1 ? (i.x = C.x, i.width = C.width) : _a.yOrds.indexOf(c) > -1 && (i.y = C.y, i.height = C.height), i.x = b(i.x, 0, r.width - i.width), i.y = b(i.y, 0, r.height - i.height), i;
  }
  renderCropSelection() {
    const {
      ariaLabels: e = _a.defaultProps.ariaLabels,
      disabled: n,
      locked: t,
      renderSelectionAddon: d,
      ruleOfThirds: r,
      crop: o
    } = this.props, w = this.getCropStyle();
    if (o)
      return /* @__PURE__ */ React.createElement(
        "div",
        {
          style: w,
          className: "ReactCrop__crop-selection",
          onPointerDown: this.onCropPointerDown,
          "aria-label": e.cropArea,
          tabIndex: 0,
          onKeyDown: this.onComponentKeyDown,
          role: "group"
        },
        !n && !t && /* @__PURE__ */ React.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ React.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ React.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ React.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ React.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": e.nwDragHandle,
            onKeyDown: /* @__PURE__ */ __name((i) => this.onHandlerKeyDown(i, "nw"), "onKeyDown"),
            role: "button"
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": e.nDragHandle,
            onKeyDown: /* @__PURE__ */ __name((i) => this.onHandlerKeyDown(i, "n"), "onKeyDown"),
            role: "button"
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": e.neDragHandle,
            onKeyDown: /* @__PURE__ */ __name((i) => this.onHandlerKeyDown(i, "ne"), "onKeyDown"),
            role: "button"
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": e.eDragHandle,
            onKeyDown: /* @__PURE__ */ __name((i) => this.onHandlerKeyDown(i, "e"), "onKeyDown"),
            role: "button"
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": e.seDragHandle,
            onKeyDown: /* @__PURE__ */ __name((i) => this.onHandlerKeyDown(i, "se"), "onKeyDown"),
            role: "button"
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": e.sDragHandle,
            onKeyDown: /* @__PURE__ */ __name((i) => this.onHandlerKeyDown(i, "s"), "onKeyDown"),
            role: "button"
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": e.swDragHandle,
            onKeyDown: /* @__PURE__ */ __name((i) => this.onHandlerKeyDown(i, "sw"), "onKeyDown"),
            role: "button"
          }
        ), /* @__PURE__ */ React.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-w",
            "data-ord": "w",
            tabIndex: 0,
            "aria-label": e.wDragHandle,
            onKeyDown: /* @__PURE__ */ __name((i) => this.onHandlerKeyDown(i, "w"), "onKeyDown"),
            role: "button"
          }
        )),
        d && /* @__PURE__ */ React.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: /* @__PURE__ */ __name((i) => i.stopPropagation(), "onPointerDown") }, d(this.state)),
        r && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ React.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(e) {
    const n = { ...E, ...this.props.crop || {} };
    return D(n, e.width, e.height);
  }
  render() {
    const { aspect: e, children: n, circularCrop: t, className: d, crop: r, disabled: o, locked: w, style: i, ruleOfThirds: s } = this.props, { cropIsActive: c, newCropIsBeingDrawn: g } = this.state, p = r ? this.renderCropSelection() : null, l = H(
      "ReactCrop",
      d,
      c && "ReactCrop--active",
      o && "ReactCrop--disabled",
      w && "ReactCrop--locked",
      g && "ReactCrop--new-crop",
      r && e && "ReactCrop--fixed-aspect",
      r && t && "ReactCrop--circular-crop",
      r && s && "ReactCrop--rule-of-thirds",
      !this.dragStarted && r && !r.width && !r.height && "ReactCrop--invisible-crop",
      t && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ React.createElement("div", { ref: this.componentRef, className: l, style: i }, /* @__PURE__ */ React.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, n), r ? /* @__PURE__ */ React.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ React.createElement("rect", { width: "100%", height: "100%", fill: "white" }), t ? /* @__PURE__ */ React.createElement(
      "ellipse",
      {
        cx: `${r.x + r.width / 2}${r.unit}`,
        cy: `${r.y + r.height / 2}${r.unit}`,
        rx: `${r.width / 2}${r.unit}`,
        ry: `${r.height / 2}${r.unit}`,
        fill: "black"
      }
    ) : /* @__PURE__ */ React.createElement(
      "rect",
      {
        x: `${r.x}${r.unit}`,
        y: `${r.y}${r.unit}`,
        width: `${r.width}${r.unit}`,
        height: `${r.height}${r.unit}`,
        fill: "black"
      }
    ))), /* @__PURE__ */ React.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: `url(#hole-${this.instanceId})` })) : void 0, p);
  }
}, __name(_a, "x"), _a);
m(x, "xOrds", ["e", "w"]), m(x, "yOrds", ["n", "s"]), m(x, "xyOrds", ["nw", "ne", "se", "sw"]), m(x, "nudgeStep", 1), m(x, "nudgeStepMedium", 10), m(x, "nudgeStepLarge", 100), m(x, "defaultProps", {
  ariaLabels: {
    cropArea: "Use the arrow keys to move the crop selection area",
    nwDragHandle: "Use the arrow keys to move the north west drag handle to change the crop selection area",
    nDragHandle: "Use the up and down arrow keys to move the north drag handle to change the crop selection area",
    neDragHandle: "Use the arrow keys to move the north east drag handle to change the crop selection area",
    eDragHandle: "Use the up and down arrow keys to move the east drag handle to change the crop selection area",
    seDragHandle: "Use the arrow keys to move the south east drag handle to change the crop selection area",
    sDragHandle: "Use the up and down arrow keys to move the south drag handle to change the crop selection area",
    swDragHandle: "Use the arrow keys to move the south west drag handle to change the crop selection area",
    wDragHandle: "Use the up and down arrow keys to move the west drag handle to change the crop selection area"
  }
});
let S = x;
const AvatarCropper = /* @__PURE__ */ __name(({ onCropComplete, onCancel, imageFile }) => {
  const [src, setSrc] = reactExports.useState(null);
  const [crop, setCrop] = reactExports.useState({
    unit: "%",
    width: 50,
    aspect: 1
    // Tam kare (1:1)
  });
  const [completedCrop, setCompletedCrop] = reactExports.useState(null);
  const imgRef = reactExports.useRef(null);
  const previewCanvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSrc(reader.result);
      });
      reader.readAsDataURL(imageFile);
    }
  }, [imageFile]);
  const onImageLoad = reactExports.useCallback((img) => {
    imgRef.current = img;
    const width = img.width;
    const height = img.height;
    const size = Math.min(width, height);
    const x2 = (width - size) / 2;
    const y = (height - size) / 2;
    const crop2 = {
      unit: "px",
      width: size,
      height: size,
      x: x2,
      y,
      aspect: 1
    };
    setCrop(crop2);
    setCompletedCrop(crop2);
  }, []);
  reactExports.useEffect(() => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop2 = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio || 1;
    const targetSize = 180;
    canvas.width = targetSize * pixelRatio;
    canvas.height = targetSize * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop2.x * scaleX,
      crop2.y * scaleY,
      crop2.width * scaleX,
      crop2.height * scaleY,
      0,
      0,
      targetSize,
      targetSize
    );
  }, [completedCrop]);
  const handleCropComplete = reactExports.useCallback(async () => {
    if (!completedCrop || !imgRef.current || !previewCanvasRef.current) {
      return;
    }
    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop2 = completedCrop;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;
    const targetSize = 512;
    canvas.width = targetSize * pixelRatio;
    canvas.height = targetSize * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(
      image,
      crop2.x * scaleX,
      crop2.y * scaleY,
      crop2.width * scaleX,
      crop2.height * scaleY,
      0,
      0,
      targetSize,
      targetSize
    );
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            console.error("Canvas is empty");
            return;
          }
          blob.name = "avatar.png";
          onCropComplete(blob);
          resolve();
        },
        "image/png",
        1
      );
    });
  }, [completedCrop, onCropComplete]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "avatar-cropper-modal", onClick: onCancel, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-cropper-content", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-cropper-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "📸 Profil Fotoğrafını Düzenle" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onCancel, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-cropper-body", children: [
      !src && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { padding: "40px", textAlign: "center", color: "#dcddde" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { fontSize: "48px", marginBottom: "16px" }, children: "⏳" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Fotoğraf yükleniyor..." }),
        !imageFile && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: { color: "#f04747", marginTop: "8px" }, children: "⚠️ Dosya bulunamadı!" })
      ] }),
      src && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "crop-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          S,
          {
            crop,
            onChange: /* @__PURE__ */ __name((c) => setCrop(c), "onChange"),
            onComplete: /* @__PURE__ */ __name((c) => setCompletedCrop(c), "onComplete"),
            aspect: 1,
            circularCrop: false,
            keepSelection: true,
            minWidth: 100,
            minHeight: 100,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                ref: imgRef,
                src,
                alt: "Crop",
                onLoad: /* @__PURE__ */ __name((e) => onImageLoad(e.currentTarget), "onLoad"),
                style: {
                  maxWidth: "100%",
                  maxHeight: "55vh",
                  display: "block",
                  objectFit: "contain"
                }
              }
            )
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "preview-section", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Önizleme:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "preview-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "canvas",
            {
              ref: previewCanvasRef,
              style: {
                width: 180,
                height: 180,
                borderRadius: "50%",
                objectFit: "cover"
              }
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "preview-note", children: "ℹ️ Tam kare (1:1)" })
        ] })
      ] })
    ] }),
    src && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "avatar-cropper-footer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-secondary", onClick: onCancel, children: "İptal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-primary", onClick: handleCropComplete, children: "✓ Kaydet" })
    ] })
  ] }) });
}, "AvatarCropper");
export {
  AvatarCropper as default
};

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, c as commonjsGlobal, d as requireReact, b as getDefaultExportFromCjs, a as React } from "./react-core-BiY6fgAJ.js";
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
__name(r, "r");
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
__name(clsx, "clsx");
function Mt(t) {
  if (typeof document == "undefined") return;
  let o = document.head || document.getElementsByTagName("head")[0], e = document.createElement("style");
  e.type = "text/css", o.firstChild ? o.insertBefore(e, o.firstChild) : o.appendChild(e), e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
__name(Mt, "Mt");
Mt(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);
var L = /* @__PURE__ */ __name((t) => typeof t == "number" && !isNaN(t), "L"), N = /* @__PURE__ */ __name((t) => typeof t == "string", "N"), P = /* @__PURE__ */ __name((t) => typeof t == "function", "P"), mt = /* @__PURE__ */ __name((t) => N(t) || L(t), "mt"), z = /* @__PURE__ */ __name((t) => reactExports.isValidElement(t) || N(t) || P(t) || L(t), "z");
var Xt = 1, at = /* @__PURE__ */ __name(() => `${Xt++}`, "at");
var I = /* @__PURE__ */ new Map(), F = [], st = /* @__PURE__ */ new Set(), bt = /* @__PURE__ */ __name(() => I.size > 0, "bt");
var vt = /* @__PURE__ */ __name((t, { containerId: o }) => {
  var e;
  return (e = I.get(o || 1)) == null ? void 0 : e.toasts.get(t);
}, "vt");
function X(t, o) {
  var r2;
  if (o) return !!((r2 = I.get(o)) != null && r2.isToastActive(t));
  let e = false;
  return I.forEach((s) => {
    s.isToastActive(t) && (e = true);
  }), e;
}
__name(X, "X");
function ht(t) {
  if (!bt()) {
    F = F.filter((o) => t != null && o.options.toastId !== t);
    return;
  }
  if (t == null || mt(t)) I.forEach((o) => {
    o.removeToast(t);
  });
  else if (t && ("containerId" in t || "id" in t)) {
    let o = I.get(t.containerId);
    o ? o.removeToast(t.id) : I.forEach((e) => {
      e.removeToast(t.id);
    });
  }
}
__name(ht, "ht");
var Ct = /* @__PURE__ */ __name((t = {}) => {
  I.forEach((o) => {
    o.props.limit && (!t.containerId || o.id === t.containerId) && o.clearQueue();
  });
}, "Ct");
function nt(t, o) {
  z(t) && (bt() || F.push({ content: t, options: o }), I.forEach((e) => {
    e.buildToast(t, o);
  }));
}
__name(nt, "nt");
function rt(t, o) {
  I.forEach((e) => {
    (o == null || !(o != null && o.containerId) || (o == null ? void 0 : o.containerId) === e.id) && e.toggle(t, o == null ? void 0 : o.id);
  });
}
__name(rt, "rt");
function Pt(t) {
  return st.add(t), () => {
    st.delete(t);
  };
}
__name(Pt, "Pt");
function Wt(t) {
  return t && (N(t.toastId) || L(t.toastId)) ? t.toastId : at();
}
__name(Wt, "Wt");
function U(t, o) {
  return nt(t, o), o.toastId;
}
__name(U, "U");
function V(t, o) {
  return { ...o, type: o && o.type || t, toastId: Wt(o) };
}
__name(V, "V");
function Q(t) {
  return (o, e) => U(o, V(t, e));
}
__name(Q, "Q");
function y(t, o) {
  return U(t, V("default", o));
}
__name(y, "y");
y.loading = (t, o) => U(t, V("default", { isLoading: true, autoClose: false, closeOnClick: false, closeButton: false, draggable: false, ...o }));
function Gt(t, { pending: o, error: e, success: r2 }, s) {
  let l;
  o && (l = N(o) ? y.loading(o, s) : y.loading(o.render, { ...s, ...o }));
  let a = { isLoading: null, autoClose: null, closeOnClick: null, closeButton: null, draggable: null }, d = /* @__PURE__ */ __name((T, g, v) => {
    if (g == null) {
      y.dismiss(l);
      return;
    }
    let x = { type: T, ...a, ...s, data: v }, C = N(g) ? { render: g } : g;
    return l ? y.update(l, { ...x, ...C }) : y(C.render, { ...x, ...C }), v;
  }, "d"), c = P(t) ? t() : t;
  return c.then((T) => d("success", r2, T)).catch((T) => d("error", e, T)), c;
}
__name(Gt, "Gt");
y.promise = Gt;
y.success = Q("success");
y.info = Q("info");
y.error = Q("error");
y.warning = Q("warning");
y.warn = y.warning;
y.dark = (t, o) => U(t, V("default", { theme: "dark", ...o }));
function qt(t) {
  ht(t);
}
__name(qt, "qt");
y.dismiss = qt;
y.clearWaitingQueue = Ct;
y.isActive = X;
y.update = (t, o = {}) => {
  let e = vt(t, o);
  if (e) {
    let { props: r2, content: s } = e, l = { delay: 100, ...r2, ...o, toastId: o.toastId || t, updateId: at() };
    l.toastId !== t && (l.staleId = t);
    let a = l.render || s;
    delete l.render, U(a, l);
  }
};
y.done = (t) => {
  y.update(t, { progress: 1 });
};
y.onChange = Pt;
y.play = (t) => rt(true, t);
y.pause = (t) => rt(false, t);
var lib = {};
var flattenNames = {};
var _freeGlobal;
var hasRequired_freeGlobal;
function require_freeGlobal() {
  if (hasRequired_freeGlobal) return _freeGlobal;
  hasRequired_freeGlobal = 1;
  var freeGlobal2 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  _freeGlobal = freeGlobal2;
  return _freeGlobal;
}
__name(require_freeGlobal, "require_freeGlobal");
var _root;
var hasRequired_root;
function require_root() {
  if (hasRequired_root) return _root;
  hasRequired_root = 1;
  var freeGlobal2 = require_freeGlobal();
  var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
  var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
  _root = root2;
  return _root;
}
__name(require_root, "require_root");
var _Symbol;
var hasRequired_Symbol;
function require_Symbol() {
  if (hasRequired_Symbol) return _Symbol;
  hasRequired_Symbol = 1;
  var root2 = require_root();
  var Symbol2 = root2.Symbol;
  _Symbol = Symbol2;
  return _Symbol;
}
__name(require_Symbol, "require_Symbol");
var _getRawTag;
var hasRequired_getRawTag;
function require_getRawTag() {
  if (hasRequired_getRawTag) return _getRawTag;
  hasRequired_getRawTag = 1;
  var Symbol2 = require_Symbol();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var nativeObjectToString2 = objectProto2.toString;
  var symToStringTag2 = Symbol2 ? Symbol2.toStringTag : void 0;
  function getRawTag2(value) {
    var isOwn = hasOwnProperty2.call(value, symToStringTag2), tag = value[symToStringTag2];
    try {
      value[symToStringTag2] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString2.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag2] = tag;
      } else {
        delete value[symToStringTag2];
      }
    }
    return result;
  }
  __name(getRawTag2, "getRawTag");
  _getRawTag = getRawTag2;
  return _getRawTag;
}
__name(require_getRawTag, "require_getRawTag");
var _objectToString;
var hasRequired_objectToString;
function require_objectToString() {
  if (hasRequired_objectToString) return _objectToString;
  hasRequired_objectToString = 1;
  var objectProto2 = Object.prototype;
  var nativeObjectToString2 = objectProto2.toString;
  function objectToString2(value) {
    return nativeObjectToString2.call(value);
  }
  __name(objectToString2, "objectToString");
  _objectToString = objectToString2;
  return _objectToString;
}
__name(require_objectToString, "require_objectToString");
var _baseGetTag;
var hasRequired_baseGetTag;
function require_baseGetTag() {
  if (hasRequired_baseGetTag) return _baseGetTag;
  hasRequired_baseGetTag = 1;
  var Symbol2 = require_Symbol(), getRawTag2 = require_getRawTag(), objectToString2 = require_objectToString();
  var nullTag2 = "[object Null]", undefinedTag2 = "[object Undefined]";
  var symToStringTag2 = Symbol2 ? Symbol2.toStringTag : void 0;
  function baseGetTag2(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag2 : nullTag2;
    }
    return symToStringTag2 && symToStringTag2 in Object(value) ? getRawTag2(value) : objectToString2(value);
  }
  __name(baseGetTag2, "baseGetTag");
  _baseGetTag = baseGetTag2;
  return _baseGetTag;
}
__name(require_baseGetTag, "require_baseGetTag");
var isArray_1;
var hasRequiredIsArray;
function requireIsArray() {
  if (hasRequiredIsArray) return isArray_1;
  hasRequiredIsArray = 1;
  var isArray2 = Array.isArray;
  isArray_1 = isArray2;
  return isArray_1;
}
__name(requireIsArray, "requireIsArray");
var isObjectLike_1;
var hasRequiredIsObjectLike;
function requireIsObjectLike() {
  if (hasRequiredIsObjectLike) return isObjectLike_1;
  hasRequiredIsObjectLike = 1;
  function isObjectLike2(value) {
    return value != null && typeof value == "object";
  }
  __name(isObjectLike2, "isObjectLike");
  isObjectLike_1 = isObjectLike2;
  return isObjectLike_1;
}
__name(requireIsObjectLike, "requireIsObjectLike");
var isString_1;
var hasRequiredIsString;
function requireIsString() {
  if (hasRequiredIsString) return isString_1;
  hasRequiredIsString = 1;
  var baseGetTag2 = require_baseGetTag(), isArray2 = requireIsArray(), isObjectLike2 = requireIsObjectLike();
  var stringTag2 = "[object String]";
  function isString(value) {
    return typeof value == "string" || !isArray2(value) && isObjectLike2(value) && baseGetTag2(value) == stringTag2;
  }
  __name(isString, "isString");
  isString_1 = isString;
  return isString_1;
}
__name(requireIsString, "requireIsString");
var _createBaseFor;
var hasRequired_createBaseFor;
function require_createBaseFor() {
  if (hasRequired_createBaseFor) return _createBaseFor;
  hasRequired_createBaseFor = 1;
  function createBaseFor2(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
      while (length--) {
        var key = props[fromRight ? length : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  __name(createBaseFor2, "createBaseFor");
  _createBaseFor = createBaseFor2;
  return _createBaseFor;
}
__name(require_createBaseFor, "require_createBaseFor");
var _baseFor;
var hasRequired_baseFor;
function require_baseFor() {
  if (hasRequired_baseFor) return _baseFor;
  hasRequired_baseFor = 1;
  var createBaseFor2 = require_createBaseFor();
  var baseFor2 = createBaseFor2();
  _baseFor = baseFor2;
  return _baseFor;
}
__name(require_baseFor, "require_baseFor");
var _baseTimes;
var hasRequired_baseTimes;
function require_baseTimes() {
  if (hasRequired_baseTimes) return _baseTimes;
  hasRequired_baseTimes = 1;
  function baseTimes2(n, iteratee) {
    var index = -1, result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  __name(baseTimes2, "baseTimes");
  _baseTimes = baseTimes2;
  return _baseTimes;
}
__name(require_baseTimes, "require_baseTimes");
var _baseIsArguments;
var hasRequired_baseIsArguments;
function require_baseIsArguments() {
  if (hasRequired_baseIsArguments) return _baseIsArguments;
  hasRequired_baseIsArguments = 1;
  var baseGetTag2 = require_baseGetTag(), isObjectLike2 = requireIsObjectLike();
  var argsTag2 = "[object Arguments]";
  function baseIsArguments2(value) {
    return isObjectLike2(value) && baseGetTag2(value) == argsTag2;
  }
  __name(baseIsArguments2, "baseIsArguments");
  _baseIsArguments = baseIsArguments2;
  return _baseIsArguments;
}
__name(require_baseIsArguments, "require_baseIsArguments");
var isArguments_1;
var hasRequiredIsArguments;
function requireIsArguments() {
  if (hasRequiredIsArguments) return isArguments_1;
  hasRequiredIsArguments = 1;
  var baseIsArguments2 = require_baseIsArguments(), isObjectLike2 = requireIsObjectLike();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var propertyIsEnumerable2 = objectProto2.propertyIsEnumerable;
  var isArguments2 = baseIsArguments2(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? baseIsArguments2 : function(value) {
    return isObjectLike2(value) && hasOwnProperty2.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
  };
  isArguments_1 = isArguments2;
  return isArguments_1;
}
__name(requireIsArguments, "requireIsArguments");
var isBuffer$1 = { exports: {} };
var stubFalse_1;
var hasRequiredStubFalse;
function requireStubFalse() {
  if (hasRequiredStubFalse) return stubFalse_1;
  hasRequiredStubFalse = 1;
  function stubFalse2() {
    return false;
  }
  __name(stubFalse2, "stubFalse");
  stubFalse_1 = stubFalse2;
  return stubFalse_1;
}
__name(requireStubFalse, "requireStubFalse");
isBuffer$1.exports;
var hasRequiredIsBuffer;
function requireIsBuffer() {
  if (hasRequiredIsBuffer) return isBuffer$1.exports;
  hasRequiredIsBuffer = 1;
  (function(module2, exports$1) {
    var root2 = require_root(), stubFalse2 = requireStubFalse();
    var freeExports2 = exports$1 && !exports$1.nodeType && exports$1;
    var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
    var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
    var Buffer3 = moduleExports2 ? root2.Buffer : void 0;
    var nativeIsBuffer2 = Buffer3 ? Buffer3.isBuffer : void 0;
    var isBuffer2 = nativeIsBuffer2 || stubFalse2;
    module2.exports = isBuffer2;
  })(isBuffer$1, isBuffer$1.exports);
  return isBuffer$1.exports;
}
__name(requireIsBuffer, "requireIsBuffer");
var _isIndex;
var hasRequired_isIndex;
function require_isIndex() {
  if (hasRequired_isIndex) return _isIndex;
  hasRequired_isIndex = 1;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var reIsUint2 = /^(?:0|[1-9]\d*)$/;
  function isIndex2(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER2 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  __name(isIndex2, "isIndex");
  _isIndex = isIndex2;
  return _isIndex;
}
__name(require_isIndex, "require_isIndex");
var isLength_1;
var hasRequiredIsLength;
function requireIsLength() {
  if (hasRequiredIsLength) return isLength_1;
  hasRequiredIsLength = 1;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  function isLength2(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER2;
  }
  __name(isLength2, "isLength");
  isLength_1 = isLength2;
  return isLength_1;
}
__name(requireIsLength, "requireIsLength");
var _baseIsTypedArray;
var hasRequired_baseIsTypedArray;
function require_baseIsTypedArray() {
  if (hasRequired_baseIsTypedArray) return _baseIsTypedArray;
  hasRequired_baseIsTypedArray = 1;
  var baseGetTag2 = require_baseGetTag(), isLength2 = requireIsLength(), isObjectLike2 = requireIsObjectLike();
  var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", errorTag2 = "[object Error]", funcTag2 = "[object Function]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", objectTag2 = "[object Object]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", weakMapTag2 = "[object WeakMap]";
  var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
  var typedArrayTags2 = {};
  typedArrayTags2[float32Tag2] = typedArrayTags2[float64Tag2] = typedArrayTags2[int8Tag2] = typedArrayTags2[int16Tag2] = typedArrayTags2[int32Tag2] = typedArrayTags2[uint8Tag2] = typedArrayTags2[uint8ClampedTag2] = typedArrayTags2[uint16Tag2] = typedArrayTags2[uint32Tag2] = true;
  typedArrayTags2[argsTag2] = typedArrayTags2[arrayTag2] = typedArrayTags2[arrayBufferTag2] = typedArrayTags2[boolTag2] = typedArrayTags2[dataViewTag2] = typedArrayTags2[dateTag2] = typedArrayTags2[errorTag2] = typedArrayTags2[funcTag2] = typedArrayTags2[mapTag2] = typedArrayTags2[numberTag2] = typedArrayTags2[objectTag2] = typedArrayTags2[regexpTag2] = typedArrayTags2[setTag2] = typedArrayTags2[stringTag2] = typedArrayTags2[weakMapTag2] = false;
  function baseIsTypedArray2(value) {
    return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags2[baseGetTag2(value)];
  }
  __name(baseIsTypedArray2, "baseIsTypedArray");
  _baseIsTypedArray = baseIsTypedArray2;
  return _baseIsTypedArray;
}
__name(require_baseIsTypedArray, "require_baseIsTypedArray");
var _baseUnary;
var hasRequired_baseUnary;
function require_baseUnary() {
  if (hasRequired_baseUnary) return _baseUnary;
  hasRequired_baseUnary = 1;
  function baseUnary2(func) {
    return function(value) {
      return func(value);
    };
  }
  __name(baseUnary2, "baseUnary");
  _baseUnary = baseUnary2;
  return _baseUnary;
}
__name(require_baseUnary, "require_baseUnary");
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
var hasRequired_nodeUtil;
function require_nodeUtil() {
  if (hasRequired_nodeUtil) return _nodeUtil.exports;
  hasRequired_nodeUtil = 1;
  (function(module2, exports$1) {
    var freeGlobal2 = require_freeGlobal();
    var freeExports2 = exports$1 && !exports$1.nodeType && exports$1;
    var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
    var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
    var freeProcess2 = moduleExports2 && freeGlobal2.process;
    var nodeUtil2 = (function() {
      try {
        var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess2 && freeProcess2.binding && freeProcess2.binding("util");
      } catch (e) {
      }
    })();
    module2.exports = nodeUtil2;
  })(_nodeUtil, _nodeUtil.exports);
  return _nodeUtil.exports;
}
__name(require_nodeUtil, "require_nodeUtil");
var isTypedArray_1;
var hasRequiredIsTypedArray;
function requireIsTypedArray() {
  if (hasRequiredIsTypedArray) return isTypedArray_1;
  hasRequiredIsTypedArray = 1;
  var baseIsTypedArray2 = require_baseIsTypedArray(), baseUnary2 = require_baseUnary(), nodeUtil2 = require_nodeUtil();
  var nodeIsTypedArray2 = nodeUtil2 && nodeUtil2.isTypedArray;
  var isTypedArray2 = nodeIsTypedArray2 ? baseUnary2(nodeIsTypedArray2) : baseIsTypedArray2;
  isTypedArray_1 = isTypedArray2;
  return isTypedArray_1;
}
__name(requireIsTypedArray, "requireIsTypedArray");
var _arrayLikeKeys;
var hasRequired_arrayLikeKeys;
function require_arrayLikeKeys() {
  if (hasRequired_arrayLikeKeys) return _arrayLikeKeys;
  hasRequired_arrayLikeKeys = 1;
  var baseTimes2 = require_baseTimes(), isArguments2 = requireIsArguments(), isArray2 = requireIsArray(), isBuffer2 = requireIsBuffer(), isIndex2 = require_isIndex(), isTypedArray2 = requireIsTypedArray();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function arrayLikeKeys2(value, inherited) {
    var isArr = isArray2(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer2(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes2(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty2.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
      (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
      isIndex2(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  __name(arrayLikeKeys2, "arrayLikeKeys");
  _arrayLikeKeys = arrayLikeKeys2;
  return _arrayLikeKeys;
}
__name(require_arrayLikeKeys, "require_arrayLikeKeys");
var _isPrototype;
var hasRequired_isPrototype;
function require_isPrototype() {
  if (hasRequired_isPrototype) return _isPrototype;
  hasRequired_isPrototype = 1;
  var objectProto2 = Object.prototype;
  function isPrototype2(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto2;
    return value === proto;
  }
  __name(isPrototype2, "isPrototype");
  _isPrototype = isPrototype2;
  return _isPrototype;
}
__name(require_isPrototype, "require_isPrototype");
var _overArg;
var hasRequired_overArg;
function require_overArg() {
  if (hasRequired_overArg) return _overArg;
  hasRequired_overArg = 1;
  function overArg2(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }
  __name(overArg2, "overArg");
  _overArg = overArg2;
  return _overArg;
}
__name(require_overArg, "require_overArg");
var _nativeKeys;
var hasRequired_nativeKeys;
function require_nativeKeys() {
  if (hasRequired_nativeKeys) return _nativeKeys;
  hasRequired_nativeKeys = 1;
  var overArg2 = require_overArg();
  var nativeKeys2 = overArg2(Object.keys, Object);
  _nativeKeys = nativeKeys2;
  return _nativeKeys;
}
__name(require_nativeKeys, "require_nativeKeys");
var _baseKeys;
var hasRequired_baseKeys;
function require_baseKeys() {
  if (hasRequired_baseKeys) return _baseKeys;
  hasRequired_baseKeys = 1;
  var isPrototype2 = require_isPrototype(), nativeKeys2 = require_nativeKeys();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function baseKeys2(object) {
    if (!isPrototype2(object)) {
      return nativeKeys2(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty2.call(object, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  __name(baseKeys2, "baseKeys");
  _baseKeys = baseKeys2;
  return _baseKeys;
}
__name(require_baseKeys, "require_baseKeys");
var isObject_1;
var hasRequiredIsObject;
function requireIsObject() {
  if (hasRequiredIsObject) return isObject_1;
  hasRequiredIsObject = 1;
  function isObject2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  __name(isObject2, "isObject");
  isObject_1 = isObject2;
  return isObject_1;
}
__name(requireIsObject, "requireIsObject");
var isFunction_1;
var hasRequiredIsFunction;
function requireIsFunction() {
  if (hasRequiredIsFunction) return isFunction_1;
  hasRequiredIsFunction = 1;
  var baseGetTag2 = require_baseGetTag(), isObject2 = requireIsObject();
  var asyncTag2 = "[object AsyncFunction]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", proxyTag2 = "[object Proxy]";
  function isFunction2(value) {
    if (!isObject2(value)) {
      return false;
    }
    var tag = baseGetTag2(value);
    return tag == funcTag2 || tag == genTag2 || tag == asyncTag2 || tag == proxyTag2;
  }
  __name(isFunction2, "isFunction");
  isFunction_1 = isFunction2;
  return isFunction_1;
}
__name(requireIsFunction, "requireIsFunction");
var isArrayLike_1;
var hasRequiredIsArrayLike;
function requireIsArrayLike() {
  if (hasRequiredIsArrayLike) return isArrayLike_1;
  hasRequiredIsArrayLike = 1;
  var isFunction2 = requireIsFunction(), isLength2 = requireIsLength();
  function isArrayLike2(value) {
    return value != null && isLength2(value.length) && !isFunction2(value);
  }
  __name(isArrayLike2, "isArrayLike");
  isArrayLike_1 = isArrayLike2;
  return isArrayLike_1;
}
__name(requireIsArrayLike, "requireIsArrayLike");
var keys_1;
var hasRequiredKeys;
function requireKeys() {
  if (hasRequiredKeys) return keys_1;
  hasRequiredKeys = 1;
  var arrayLikeKeys2 = require_arrayLikeKeys(), baseKeys2 = require_baseKeys(), isArrayLike2 = requireIsArrayLike();
  function keys2(object) {
    return isArrayLike2(object) ? arrayLikeKeys2(object) : baseKeys2(object);
  }
  __name(keys2, "keys");
  keys_1 = keys2;
  return keys_1;
}
__name(requireKeys, "requireKeys");
var _baseForOwn;
var hasRequired_baseForOwn;
function require_baseForOwn() {
  if (hasRequired_baseForOwn) return _baseForOwn;
  hasRequired_baseForOwn = 1;
  var baseFor2 = require_baseFor(), keys2 = requireKeys();
  function baseForOwn2(object, iteratee) {
    return object && baseFor2(object, iteratee, keys2);
  }
  __name(baseForOwn2, "baseForOwn");
  _baseForOwn = baseForOwn2;
  return _baseForOwn;
}
__name(require_baseForOwn, "require_baseForOwn");
var identity_1;
var hasRequiredIdentity;
function requireIdentity() {
  if (hasRequiredIdentity) return identity_1;
  hasRequiredIdentity = 1;
  function identity2(value) {
    return value;
  }
  __name(identity2, "identity");
  identity_1 = identity2;
  return identity_1;
}
__name(requireIdentity, "requireIdentity");
var _castFunction;
var hasRequired_castFunction;
function require_castFunction() {
  if (hasRequired_castFunction) return _castFunction;
  hasRequired_castFunction = 1;
  var identity2 = requireIdentity();
  function castFunction2(value) {
    return typeof value == "function" ? value : identity2;
  }
  __name(castFunction2, "castFunction");
  _castFunction = castFunction2;
  return _castFunction;
}
__name(require_castFunction, "require_castFunction");
var forOwn_1;
var hasRequiredForOwn;
function requireForOwn() {
  if (hasRequiredForOwn) return forOwn_1;
  hasRequiredForOwn = 1;
  var baseForOwn2 = require_baseForOwn(), castFunction2 = require_castFunction();
  function forOwn(object, iteratee) {
    return object && baseForOwn2(object, castFunction2(iteratee));
  }
  __name(forOwn, "forOwn");
  forOwn_1 = forOwn;
  return forOwn_1;
}
__name(requireForOwn, "requireForOwn");
var _getPrototype;
var hasRequired_getPrototype;
function require_getPrototype() {
  if (hasRequired_getPrototype) return _getPrototype;
  hasRequired_getPrototype = 1;
  var overArg2 = require_overArg();
  var getPrototype2 = overArg2(Object.getPrototypeOf, Object);
  _getPrototype = getPrototype2;
  return _getPrototype;
}
__name(require_getPrototype, "require_getPrototype");
var isPlainObject_1;
var hasRequiredIsPlainObject;
function requireIsPlainObject() {
  if (hasRequiredIsPlainObject) return isPlainObject_1;
  hasRequiredIsPlainObject = 1;
  var baseGetTag2 = require_baseGetTag(), getPrototype2 = require_getPrototype(), isObjectLike2 = requireIsObjectLike();
  var objectTag2 = "[object Object]";
  var funcProto2 = Function.prototype, objectProto2 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var objectCtorString2 = funcToString2.call(Object);
  function isPlainObject2(value) {
    if (!isObjectLike2(value) || baseGetTag2(value) != objectTag2) {
      return false;
    }
    var proto = getPrototype2(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty2.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString2.call(Ctor) == objectCtorString2;
  }
  __name(isPlainObject2, "isPlainObject");
  isPlainObject_1 = isPlainObject2;
  return isPlainObject_1;
}
__name(requireIsPlainObject, "requireIsPlainObject");
var _arrayMap;
var hasRequired_arrayMap;
function require_arrayMap() {
  if (hasRequired_arrayMap) return _arrayMap;
  hasRequired_arrayMap = 1;
  function arrayMap2(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }
  __name(arrayMap2, "arrayMap");
  _arrayMap = arrayMap2;
  return _arrayMap;
}
__name(require_arrayMap, "require_arrayMap");
var _listCacheClear;
var hasRequired_listCacheClear;
function require_listCacheClear() {
  if (hasRequired_listCacheClear) return _listCacheClear;
  hasRequired_listCacheClear = 1;
  function listCacheClear2() {
    this.__data__ = [];
    this.size = 0;
  }
  __name(listCacheClear2, "listCacheClear");
  _listCacheClear = listCacheClear2;
  return _listCacheClear;
}
__name(require_listCacheClear, "require_listCacheClear");
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq) return eq_1;
  hasRequiredEq = 1;
  function eq2(value, other) {
    return value === other || value !== value && other !== other;
  }
  __name(eq2, "eq");
  eq_1 = eq2;
  return eq_1;
}
__name(requireEq, "requireEq");
var _assocIndexOf;
var hasRequired_assocIndexOf;
function require_assocIndexOf() {
  if (hasRequired_assocIndexOf) return _assocIndexOf;
  hasRequired_assocIndexOf = 1;
  var eq2 = requireEq();
  function assocIndexOf2(array, key) {
    var length = array.length;
    while (length--) {
      if (eq2(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  __name(assocIndexOf2, "assocIndexOf");
  _assocIndexOf = assocIndexOf2;
  return _assocIndexOf;
}
__name(require_assocIndexOf, "require_assocIndexOf");
var _listCacheDelete;
var hasRequired_listCacheDelete;
function require_listCacheDelete() {
  if (hasRequired_listCacheDelete) return _listCacheDelete;
  hasRequired_listCacheDelete = 1;
  var assocIndexOf2 = require_assocIndexOf();
  var arrayProto2 = Array.prototype;
  var splice2 = arrayProto2.splice;
  function listCacheDelete2(key) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice2.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  __name(listCacheDelete2, "listCacheDelete");
  _listCacheDelete = listCacheDelete2;
  return _listCacheDelete;
}
__name(require_listCacheDelete, "require_listCacheDelete");
var _listCacheGet;
var hasRequired_listCacheGet;
function require_listCacheGet() {
  if (hasRequired_listCacheGet) return _listCacheGet;
  hasRequired_listCacheGet = 1;
  var assocIndexOf2 = require_assocIndexOf();
  function listCacheGet2(key) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  __name(listCacheGet2, "listCacheGet");
  _listCacheGet = listCacheGet2;
  return _listCacheGet;
}
__name(require_listCacheGet, "require_listCacheGet");
var _listCacheHas;
var hasRequired_listCacheHas;
function require_listCacheHas() {
  if (hasRequired_listCacheHas) return _listCacheHas;
  hasRequired_listCacheHas = 1;
  var assocIndexOf2 = require_assocIndexOf();
  function listCacheHas2(key) {
    return assocIndexOf2(this.__data__, key) > -1;
  }
  __name(listCacheHas2, "listCacheHas");
  _listCacheHas = listCacheHas2;
  return _listCacheHas;
}
__name(require_listCacheHas, "require_listCacheHas");
var _listCacheSet;
var hasRequired_listCacheSet;
function require_listCacheSet() {
  if (hasRequired_listCacheSet) return _listCacheSet;
  hasRequired_listCacheSet = 1;
  var assocIndexOf2 = require_assocIndexOf();
  function listCacheSet2(key, value) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  __name(listCacheSet2, "listCacheSet");
  _listCacheSet = listCacheSet2;
  return _listCacheSet;
}
__name(require_listCacheSet, "require_listCacheSet");
var _ListCache;
var hasRequired_ListCache;
function require_ListCache() {
  if (hasRequired_ListCache) return _ListCache;
  hasRequired_ListCache = 1;
  var listCacheClear2 = require_listCacheClear(), listCacheDelete2 = require_listCacheDelete(), listCacheGet2 = require_listCacheGet(), listCacheHas2 = require_listCacheHas(), listCacheSet2 = require_listCacheSet();
  function ListCache2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  __name(ListCache2, "ListCache");
  ListCache2.prototype.clear = listCacheClear2;
  ListCache2.prototype["delete"] = listCacheDelete2;
  ListCache2.prototype.get = listCacheGet2;
  ListCache2.prototype.has = listCacheHas2;
  ListCache2.prototype.set = listCacheSet2;
  _ListCache = ListCache2;
  return _ListCache;
}
__name(require_ListCache, "require_ListCache");
var _stackClear;
var hasRequired_stackClear;
function require_stackClear() {
  if (hasRequired_stackClear) return _stackClear;
  hasRequired_stackClear = 1;
  var ListCache2 = require_ListCache();
  function stackClear2() {
    this.__data__ = new ListCache2();
    this.size = 0;
  }
  __name(stackClear2, "stackClear");
  _stackClear = stackClear2;
  return _stackClear;
}
__name(require_stackClear, "require_stackClear");
var _stackDelete;
var hasRequired_stackDelete;
function require_stackDelete() {
  if (hasRequired_stackDelete) return _stackDelete;
  hasRequired_stackDelete = 1;
  function stackDelete2(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  __name(stackDelete2, "stackDelete");
  _stackDelete = stackDelete2;
  return _stackDelete;
}
__name(require_stackDelete, "require_stackDelete");
var _stackGet;
var hasRequired_stackGet;
function require_stackGet() {
  if (hasRequired_stackGet) return _stackGet;
  hasRequired_stackGet = 1;
  function stackGet2(key) {
    return this.__data__.get(key);
  }
  __name(stackGet2, "stackGet");
  _stackGet = stackGet2;
  return _stackGet;
}
__name(require_stackGet, "require_stackGet");
var _stackHas;
var hasRequired_stackHas;
function require_stackHas() {
  if (hasRequired_stackHas) return _stackHas;
  hasRequired_stackHas = 1;
  function stackHas2(key) {
    return this.__data__.has(key);
  }
  __name(stackHas2, "stackHas");
  _stackHas = stackHas2;
  return _stackHas;
}
__name(require_stackHas, "require_stackHas");
var _coreJsData;
var hasRequired_coreJsData;
function require_coreJsData() {
  if (hasRequired_coreJsData) return _coreJsData;
  hasRequired_coreJsData = 1;
  var root2 = require_root();
  var coreJsData2 = root2["__core-js_shared__"];
  _coreJsData = coreJsData2;
  return _coreJsData;
}
__name(require_coreJsData, "require_coreJsData");
var _isMasked;
var hasRequired_isMasked;
function require_isMasked() {
  if (hasRequired_isMasked) return _isMasked;
  hasRequired_isMasked = 1;
  var coreJsData2 = require_coreJsData();
  var maskSrcKey2 = (function() {
    var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  function isMasked2(func) {
    return !!maskSrcKey2 && maskSrcKey2 in func;
  }
  __name(isMasked2, "isMasked");
  _isMasked = isMasked2;
  return _isMasked;
}
__name(require_isMasked, "require_isMasked");
var _toSource;
var hasRequired_toSource;
function require_toSource() {
  if (hasRequired_toSource) return _toSource;
  hasRequired_toSource = 1;
  var funcProto2 = Function.prototype;
  var funcToString2 = funcProto2.toString;
  function toSource2(func) {
    if (func != null) {
      try {
        return funcToString2.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  __name(toSource2, "toSource");
  _toSource = toSource2;
  return _toSource;
}
__name(require_toSource, "require_toSource");
var _baseIsNative;
var hasRequired_baseIsNative;
function require_baseIsNative() {
  if (hasRequired_baseIsNative) return _baseIsNative;
  hasRequired_baseIsNative = 1;
  var isFunction2 = requireIsFunction(), isMasked2 = require_isMasked(), isObject2 = requireIsObject(), toSource2 = require_toSource();
  var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
  var funcProto2 = Function.prototype, objectProto2 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var reIsNative2 = RegExp(
    "^" + funcToString2.call(hasOwnProperty2).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative2(value) {
    if (!isObject2(value) || isMasked2(value)) {
      return false;
    }
    var pattern = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
    return pattern.test(toSource2(value));
  }
  __name(baseIsNative2, "baseIsNative");
  _baseIsNative = baseIsNative2;
  return _baseIsNative;
}
__name(require_baseIsNative, "require_baseIsNative");
var _getValue;
var hasRequired_getValue;
function require_getValue() {
  if (hasRequired_getValue) return _getValue;
  hasRequired_getValue = 1;
  function getValue2(object, key) {
    return object == null ? void 0 : object[key];
  }
  __name(getValue2, "getValue");
  _getValue = getValue2;
  return _getValue;
}
__name(require_getValue, "require_getValue");
var _getNative;
var hasRequired_getNative;
function require_getNative() {
  if (hasRequired_getNative) return _getNative;
  hasRequired_getNative = 1;
  var baseIsNative2 = require_baseIsNative(), getValue2 = require_getValue();
  function getNative2(object, key) {
    var value = getValue2(object, key);
    return baseIsNative2(value) ? value : void 0;
  }
  __name(getNative2, "getNative");
  _getNative = getNative2;
  return _getNative;
}
__name(require_getNative, "require_getNative");
var _Map;
var hasRequired_Map;
function require_Map() {
  if (hasRequired_Map) return _Map;
  hasRequired_Map = 1;
  var getNative2 = require_getNative(), root2 = require_root();
  var Map2 = getNative2(root2, "Map");
  _Map = Map2;
  return _Map;
}
__name(require_Map, "require_Map");
var _nativeCreate;
var hasRequired_nativeCreate;
function require_nativeCreate() {
  if (hasRequired_nativeCreate) return _nativeCreate;
  hasRequired_nativeCreate = 1;
  var getNative2 = require_getNative();
  var nativeCreate2 = getNative2(Object, "create");
  _nativeCreate = nativeCreate2;
  return _nativeCreate;
}
__name(require_nativeCreate, "require_nativeCreate");
var _hashClear;
var hasRequired_hashClear;
function require_hashClear() {
  if (hasRequired_hashClear) return _hashClear;
  hasRequired_hashClear = 1;
  var nativeCreate2 = require_nativeCreate();
  function hashClear2() {
    this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
    this.size = 0;
  }
  __name(hashClear2, "hashClear");
  _hashClear = hashClear2;
  return _hashClear;
}
__name(require_hashClear, "require_hashClear");
var _hashDelete;
var hasRequired_hashDelete;
function require_hashDelete() {
  if (hasRequired_hashDelete) return _hashDelete;
  hasRequired_hashDelete = 1;
  function hashDelete2(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  __name(hashDelete2, "hashDelete");
  _hashDelete = hashDelete2;
  return _hashDelete;
}
__name(require_hashDelete, "require_hashDelete");
var _hashGet;
var hasRequired_hashGet;
function require_hashGet() {
  if (hasRequired_hashGet) return _hashGet;
  hasRequired_hashGet = 1;
  var nativeCreate2 = require_nativeCreate();
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function hashGet2(key) {
    var data = this.__data__;
    if (nativeCreate2) {
      var result = data[key];
      return result === HASH_UNDEFINED2 ? void 0 : result;
    }
    return hasOwnProperty2.call(data, key) ? data[key] : void 0;
  }
  __name(hashGet2, "hashGet");
  _hashGet = hashGet2;
  return _hashGet;
}
__name(require_hashGet, "require_hashGet");
var _hashHas;
var hasRequired_hashHas;
function require_hashHas() {
  if (hasRequired_hashHas) return _hashHas;
  hasRequired_hashHas = 1;
  var nativeCreate2 = require_nativeCreate();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function hashHas2(key) {
    var data = this.__data__;
    return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
  }
  __name(hashHas2, "hashHas");
  _hashHas = hashHas2;
  return _hashHas;
}
__name(require_hashHas, "require_hashHas");
var _hashSet;
var hasRequired_hashSet;
function require_hashSet() {
  if (hasRequired_hashSet) return _hashSet;
  hasRequired_hashSet = 1;
  var nativeCreate2 = require_nativeCreate();
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function hashSet2(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate2 && value === void 0 ? HASH_UNDEFINED2 : value;
    return this;
  }
  __name(hashSet2, "hashSet");
  _hashSet = hashSet2;
  return _hashSet;
}
__name(require_hashSet, "require_hashSet");
var _Hash;
var hasRequired_Hash;
function require_Hash() {
  if (hasRequired_Hash) return _Hash;
  hasRequired_Hash = 1;
  var hashClear2 = require_hashClear(), hashDelete2 = require_hashDelete(), hashGet2 = require_hashGet(), hashHas2 = require_hashHas(), hashSet2 = require_hashSet();
  function Hash2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  __name(Hash2, "Hash");
  Hash2.prototype.clear = hashClear2;
  Hash2.prototype["delete"] = hashDelete2;
  Hash2.prototype.get = hashGet2;
  Hash2.prototype.has = hashHas2;
  Hash2.prototype.set = hashSet2;
  _Hash = Hash2;
  return _Hash;
}
__name(require_Hash, "require_Hash");
var _mapCacheClear;
var hasRequired_mapCacheClear;
function require_mapCacheClear() {
  if (hasRequired_mapCacheClear) return _mapCacheClear;
  hasRequired_mapCacheClear = 1;
  var Hash2 = require_Hash(), ListCache2 = require_ListCache(), Map2 = require_Map();
  function mapCacheClear2() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash2(),
      "map": new (Map2 || ListCache2)(),
      "string": new Hash2()
    };
  }
  __name(mapCacheClear2, "mapCacheClear");
  _mapCacheClear = mapCacheClear2;
  return _mapCacheClear;
}
__name(require_mapCacheClear, "require_mapCacheClear");
var _isKeyable;
var hasRequired_isKeyable;
function require_isKeyable() {
  if (hasRequired_isKeyable) return _isKeyable;
  hasRequired_isKeyable = 1;
  function isKeyable2(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  __name(isKeyable2, "isKeyable");
  _isKeyable = isKeyable2;
  return _isKeyable;
}
__name(require_isKeyable, "require_isKeyable");
var _getMapData;
var hasRequired_getMapData;
function require_getMapData() {
  if (hasRequired_getMapData) return _getMapData;
  hasRequired_getMapData = 1;
  var isKeyable2 = require_isKeyable();
  function getMapData2(map2, key) {
    var data = map2.__data__;
    return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  __name(getMapData2, "getMapData");
  _getMapData = getMapData2;
  return _getMapData;
}
__name(require_getMapData, "require_getMapData");
var _mapCacheDelete;
var hasRequired_mapCacheDelete;
function require_mapCacheDelete() {
  if (hasRequired_mapCacheDelete) return _mapCacheDelete;
  hasRequired_mapCacheDelete = 1;
  var getMapData2 = require_getMapData();
  function mapCacheDelete2(key) {
    var result = getMapData2(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  __name(mapCacheDelete2, "mapCacheDelete");
  _mapCacheDelete = mapCacheDelete2;
  return _mapCacheDelete;
}
__name(require_mapCacheDelete, "require_mapCacheDelete");
var _mapCacheGet;
var hasRequired_mapCacheGet;
function require_mapCacheGet() {
  if (hasRequired_mapCacheGet) return _mapCacheGet;
  hasRequired_mapCacheGet = 1;
  var getMapData2 = require_getMapData();
  function mapCacheGet2(key) {
    return getMapData2(this, key).get(key);
  }
  __name(mapCacheGet2, "mapCacheGet");
  _mapCacheGet = mapCacheGet2;
  return _mapCacheGet;
}
__name(require_mapCacheGet, "require_mapCacheGet");
var _mapCacheHas;
var hasRequired_mapCacheHas;
function require_mapCacheHas() {
  if (hasRequired_mapCacheHas) return _mapCacheHas;
  hasRequired_mapCacheHas = 1;
  var getMapData2 = require_getMapData();
  function mapCacheHas2(key) {
    return getMapData2(this, key).has(key);
  }
  __name(mapCacheHas2, "mapCacheHas");
  _mapCacheHas = mapCacheHas2;
  return _mapCacheHas;
}
__name(require_mapCacheHas, "require_mapCacheHas");
var _mapCacheSet;
var hasRequired_mapCacheSet;
function require_mapCacheSet() {
  if (hasRequired_mapCacheSet) return _mapCacheSet;
  hasRequired_mapCacheSet = 1;
  var getMapData2 = require_getMapData();
  function mapCacheSet2(key, value) {
    var data = getMapData2(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  __name(mapCacheSet2, "mapCacheSet");
  _mapCacheSet = mapCacheSet2;
  return _mapCacheSet;
}
__name(require_mapCacheSet, "require_mapCacheSet");
var _MapCache;
var hasRequired_MapCache;
function require_MapCache() {
  if (hasRequired_MapCache) return _MapCache;
  hasRequired_MapCache = 1;
  var mapCacheClear2 = require_mapCacheClear(), mapCacheDelete2 = require_mapCacheDelete(), mapCacheGet2 = require_mapCacheGet(), mapCacheHas2 = require_mapCacheHas(), mapCacheSet2 = require_mapCacheSet();
  function MapCache2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  __name(MapCache2, "MapCache");
  MapCache2.prototype.clear = mapCacheClear2;
  MapCache2.prototype["delete"] = mapCacheDelete2;
  MapCache2.prototype.get = mapCacheGet2;
  MapCache2.prototype.has = mapCacheHas2;
  MapCache2.prototype.set = mapCacheSet2;
  _MapCache = MapCache2;
  return _MapCache;
}
__name(require_MapCache, "require_MapCache");
var _stackSet;
var hasRequired_stackSet;
function require_stackSet() {
  if (hasRequired_stackSet) return _stackSet;
  hasRequired_stackSet = 1;
  var ListCache2 = require_ListCache(), Map2 = require_Map(), MapCache2 = require_MapCache();
  var LARGE_ARRAY_SIZE2 = 200;
  function stackSet2(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache2) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache2(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  __name(stackSet2, "stackSet");
  _stackSet = stackSet2;
  return _stackSet;
}
__name(require_stackSet, "require_stackSet");
var _Stack;
var hasRequired_Stack;
function require_Stack() {
  if (hasRequired_Stack) return _Stack;
  hasRequired_Stack = 1;
  var ListCache2 = require_ListCache(), stackClear2 = require_stackClear(), stackDelete2 = require_stackDelete(), stackGet2 = require_stackGet(), stackHas2 = require_stackHas(), stackSet2 = require_stackSet();
  function Stack2(entries) {
    var data = this.__data__ = new ListCache2(entries);
    this.size = data.size;
  }
  __name(Stack2, "Stack");
  Stack2.prototype.clear = stackClear2;
  Stack2.prototype["delete"] = stackDelete2;
  Stack2.prototype.get = stackGet2;
  Stack2.prototype.has = stackHas2;
  Stack2.prototype.set = stackSet2;
  _Stack = Stack2;
  return _Stack;
}
__name(require_Stack, "require_Stack");
var _setCacheAdd;
var hasRequired_setCacheAdd;
function require_setCacheAdd() {
  if (hasRequired_setCacheAdd) return _setCacheAdd;
  hasRequired_setCacheAdd = 1;
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  function setCacheAdd2(value) {
    this.__data__.set(value, HASH_UNDEFINED2);
    return this;
  }
  __name(setCacheAdd2, "setCacheAdd");
  _setCacheAdd = setCacheAdd2;
  return _setCacheAdd;
}
__name(require_setCacheAdd, "require_setCacheAdd");
var _setCacheHas;
var hasRequired_setCacheHas;
function require_setCacheHas() {
  if (hasRequired_setCacheHas) return _setCacheHas;
  hasRequired_setCacheHas = 1;
  function setCacheHas2(value) {
    return this.__data__.has(value);
  }
  __name(setCacheHas2, "setCacheHas");
  _setCacheHas = setCacheHas2;
  return _setCacheHas;
}
__name(require_setCacheHas, "require_setCacheHas");
var _SetCache;
var hasRequired_SetCache;
function require_SetCache() {
  if (hasRequired_SetCache) return _SetCache;
  hasRequired_SetCache = 1;
  var MapCache2 = require_MapCache(), setCacheAdd2 = require_setCacheAdd(), setCacheHas2 = require_setCacheHas();
  function SetCache2(values) {
    var index = -1, length = values == null ? 0 : values.length;
    this.__data__ = new MapCache2();
    while (++index < length) {
      this.add(values[index]);
    }
  }
  __name(SetCache2, "SetCache");
  SetCache2.prototype.add = SetCache2.prototype.push = setCacheAdd2;
  SetCache2.prototype.has = setCacheHas2;
  _SetCache = SetCache2;
  return _SetCache;
}
__name(require_SetCache, "require_SetCache");
var _arraySome;
var hasRequired_arraySome;
function require_arraySome() {
  if (hasRequired_arraySome) return _arraySome;
  hasRequired_arraySome = 1;
  function arraySome2(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  __name(arraySome2, "arraySome");
  _arraySome = arraySome2;
  return _arraySome;
}
__name(require_arraySome, "require_arraySome");
var _cacheHas;
var hasRequired_cacheHas;
function require_cacheHas() {
  if (hasRequired_cacheHas) return _cacheHas;
  hasRequired_cacheHas = 1;
  function cacheHas2(cache, key) {
    return cache.has(key);
  }
  __name(cacheHas2, "cacheHas");
  _cacheHas = cacheHas2;
  return _cacheHas;
}
__name(require_cacheHas, "require_cacheHas");
var _equalArrays;
var hasRequired_equalArrays;
function require_equalArrays() {
  if (hasRequired_equalArrays) return _equalArrays;
  hasRequired_equalArrays = 1;
  var SetCache2 = require_SetCache(), arraySome2 = require_arraySome(), cacheHas2 = require_cacheHas();
  var COMPARE_PARTIAL_FLAG2 = 1, COMPARE_UNORDERED_FLAG2 = 2;
  function equalArrays2(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG2 ? new SetCache2() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome2(other, function(othValue2, othIndex) {
          if (!cacheHas2(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  __name(equalArrays2, "equalArrays");
  _equalArrays = equalArrays2;
  return _equalArrays;
}
__name(require_equalArrays, "require_equalArrays");
var _Uint8Array;
var hasRequired_Uint8Array;
function require_Uint8Array() {
  if (hasRequired_Uint8Array) return _Uint8Array;
  hasRequired_Uint8Array = 1;
  var root2 = require_root();
  var Uint8Array3 = root2.Uint8Array;
  _Uint8Array = Uint8Array3;
  return _Uint8Array;
}
__name(require_Uint8Array, "require_Uint8Array");
var _mapToArray;
var hasRequired_mapToArray;
function require_mapToArray() {
  if (hasRequired_mapToArray) return _mapToArray;
  hasRequired_mapToArray = 1;
  function mapToArray2(map2) {
    var index = -1, result = Array(map2.size);
    map2.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  __name(mapToArray2, "mapToArray");
  _mapToArray = mapToArray2;
  return _mapToArray;
}
__name(require_mapToArray, "require_mapToArray");
var _setToArray;
var hasRequired_setToArray;
function require_setToArray() {
  if (hasRequired_setToArray) return _setToArray;
  hasRequired_setToArray = 1;
  function setToArray2(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  __name(setToArray2, "setToArray");
  _setToArray = setToArray2;
  return _setToArray;
}
__name(require_setToArray, "require_setToArray");
var _equalByTag;
var hasRequired_equalByTag;
function require_equalByTag() {
  if (hasRequired_equalByTag) return _equalByTag;
  hasRequired_equalByTag = 1;
  var Symbol2 = require_Symbol(), Uint8Array3 = require_Uint8Array(), eq2 = requireEq(), equalArrays2 = require_equalArrays(), mapToArray2 = require_mapToArray(), setToArray2 = require_setToArray();
  var COMPARE_PARTIAL_FLAG2 = 1, COMPARE_UNORDERED_FLAG2 = 2;
  var boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", errorTag2 = "[object Error]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]";
  var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]";
  var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
  function equalByTag2(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag2:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag2:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array3(object), new Uint8Array3(other))) {
          return false;
        }
        return true;
      case boolTag2:
      case dateTag2:
      case numberTag2:
        return eq2(+object, +other);
      case errorTag2:
        return object.name == other.name && object.message == other.message;
      case regexpTag2:
      case stringTag2:
        return object == other + "";
      case mapTag2:
        var convert = mapToArray2;
      case setTag2:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG2;
        convert || (convert = setToArray2);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG2;
        stack.set(object, other);
        var result = equalArrays2(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag2:
        if (symbolValueOf2) {
          return symbolValueOf2.call(object) == symbolValueOf2.call(other);
        }
    }
    return false;
  }
  __name(equalByTag2, "equalByTag");
  _equalByTag = equalByTag2;
  return _equalByTag;
}
__name(require_equalByTag, "require_equalByTag");
var _arrayPush;
var hasRequired_arrayPush;
function require_arrayPush() {
  if (hasRequired_arrayPush) return _arrayPush;
  hasRequired_arrayPush = 1;
  function arrayPush2(array, values) {
    var index = -1, length = values.length, offset = array.length;
    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  __name(arrayPush2, "arrayPush");
  _arrayPush = arrayPush2;
  return _arrayPush;
}
__name(require_arrayPush, "require_arrayPush");
var _baseGetAllKeys;
var hasRequired_baseGetAllKeys;
function require_baseGetAllKeys() {
  if (hasRequired_baseGetAllKeys) return _baseGetAllKeys;
  hasRequired_baseGetAllKeys = 1;
  var arrayPush2 = require_arrayPush(), isArray2 = requireIsArray();
  function baseGetAllKeys2(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray2(object) ? result : arrayPush2(result, symbolsFunc(object));
  }
  __name(baseGetAllKeys2, "baseGetAllKeys");
  _baseGetAllKeys = baseGetAllKeys2;
  return _baseGetAllKeys;
}
__name(require_baseGetAllKeys, "require_baseGetAllKeys");
var _arrayFilter;
var hasRequired_arrayFilter;
function require_arrayFilter() {
  if (hasRequired_arrayFilter) return _arrayFilter;
  hasRequired_arrayFilter = 1;
  function arrayFilter2(array, predicate) {
    var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  __name(arrayFilter2, "arrayFilter");
  _arrayFilter = arrayFilter2;
  return _arrayFilter;
}
__name(require_arrayFilter, "require_arrayFilter");
var stubArray_1;
var hasRequiredStubArray;
function requireStubArray() {
  if (hasRequiredStubArray) return stubArray_1;
  hasRequiredStubArray = 1;
  function stubArray2() {
    return [];
  }
  __name(stubArray2, "stubArray");
  stubArray_1 = stubArray2;
  return stubArray_1;
}
__name(requireStubArray, "requireStubArray");
var _getSymbols;
var hasRequired_getSymbols;
function require_getSymbols() {
  if (hasRequired_getSymbols) return _getSymbols;
  hasRequired_getSymbols = 1;
  var arrayFilter2 = require_arrayFilter(), stubArray2 = requireStubArray();
  var objectProto2 = Object.prototype;
  var propertyIsEnumerable2 = objectProto2.propertyIsEnumerable;
  var nativeGetSymbols2 = Object.getOwnPropertySymbols;
  var getSymbols2 = !nativeGetSymbols2 ? stubArray2 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter2(nativeGetSymbols2(object), function(symbol) {
      return propertyIsEnumerable2.call(object, symbol);
    });
  };
  _getSymbols = getSymbols2;
  return _getSymbols;
}
__name(require_getSymbols, "require_getSymbols");
var _getAllKeys;
var hasRequired_getAllKeys;
function require_getAllKeys() {
  if (hasRequired_getAllKeys) return _getAllKeys;
  hasRequired_getAllKeys = 1;
  var baseGetAllKeys2 = require_baseGetAllKeys(), getSymbols2 = require_getSymbols(), keys2 = requireKeys();
  function getAllKeys2(object) {
    return baseGetAllKeys2(object, keys2, getSymbols2);
  }
  __name(getAllKeys2, "getAllKeys");
  _getAllKeys = getAllKeys2;
  return _getAllKeys;
}
__name(require_getAllKeys, "require_getAllKeys");
var _equalObjects;
var hasRequired_equalObjects;
function require_equalObjects() {
  if (hasRequired_equalObjects) return _equalObjects;
  hasRequired_equalObjects = 1;
  var getAllKeys2 = require_getAllKeys();
  var COMPARE_PARTIAL_FLAG2 = 1;
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function equalObjects2(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG2, objProps = getAllKeys2(object), objLength = objProps.length, othProps = getAllKeys2(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  __name(equalObjects2, "equalObjects");
  _equalObjects = equalObjects2;
  return _equalObjects;
}
__name(require_equalObjects, "require_equalObjects");
var _DataView;
var hasRequired_DataView;
function require_DataView() {
  if (hasRequired_DataView) return _DataView;
  hasRequired_DataView = 1;
  var getNative2 = require_getNative(), root2 = require_root();
  var DataView2 = getNative2(root2, "DataView");
  _DataView = DataView2;
  return _DataView;
}
__name(require_DataView, "require_DataView");
var _Promise;
var hasRequired_Promise;
function require_Promise() {
  if (hasRequired_Promise) return _Promise;
  hasRequired_Promise = 1;
  var getNative2 = require_getNative(), root2 = require_root();
  var Promise2 = getNative2(root2, "Promise");
  _Promise = Promise2;
  return _Promise;
}
__name(require_Promise, "require_Promise");
var _Set;
var hasRequired_Set;
function require_Set() {
  if (hasRequired_Set) return _Set;
  hasRequired_Set = 1;
  var getNative2 = require_getNative(), root2 = require_root();
  var Set2 = getNative2(root2, "Set");
  _Set = Set2;
  return _Set;
}
__name(require_Set, "require_Set");
var _WeakMap;
var hasRequired_WeakMap;
function require_WeakMap() {
  if (hasRequired_WeakMap) return _WeakMap;
  hasRequired_WeakMap = 1;
  var getNative2 = require_getNative(), root2 = require_root();
  var WeakMap2 = getNative2(root2, "WeakMap");
  _WeakMap = WeakMap2;
  return _WeakMap;
}
__name(require_WeakMap, "require_WeakMap");
var _getTag;
var hasRequired_getTag;
function require_getTag() {
  if (hasRequired_getTag) return _getTag;
  hasRequired_getTag = 1;
  var DataView2 = require_DataView(), Map2 = require_Map(), Promise2 = require_Promise(), Set2 = require_Set(), WeakMap2 = require_WeakMap(), baseGetTag2 = require_baseGetTag(), toSource2 = require_toSource();
  var mapTag2 = "[object Map]", objectTag2 = "[object Object]", promiseTag2 = "[object Promise]", setTag2 = "[object Set]", weakMapTag2 = "[object WeakMap]";
  var dataViewTag2 = "[object DataView]";
  var dataViewCtorString2 = toSource2(DataView2), mapCtorString2 = toSource2(Map2), promiseCtorString2 = toSource2(Promise2), setCtorString2 = toSource2(Set2), weakMapCtorString2 = toSource2(WeakMap2);
  var getTag2 = baseGetTag2;
  if (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag2 || Map2 && getTag2(new Map2()) != mapTag2 || Promise2 && getTag2(Promise2.resolve()) != promiseTag2 || Set2 && getTag2(new Set2()) != setTag2 || WeakMap2 && getTag2(new WeakMap2()) != weakMapTag2) {
    getTag2 = /* @__PURE__ */ __name(function(value) {
      var result = baseGetTag2(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource2(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString2:
            return dataViewTag2;
          case mapCtorString2:
            return mapTag2;
          case promiseCtorString2:
            return promiseTag2;
          case setCtorString2:
            return setTag2;
          case weakMapCtorString2:
            return weakMapTag2;
        }
      }
      return result;
    }, "getTag");
  }
  _getTag = getTag2;
  return _getTag;
}
__name(require_getTag, "require_getTag");
var _baseIsEqualDeep;
var hasRequired_baseIsEqualDeep;
function require_baseIsEqualDeep() {
  if (hasRequired_baseIsEqualDeep) return _baseIsEqualDeep;
  hasRequired_baseIsEqualDeep = 1;
  var Stack2 = require_Stack(), equalArrays2 = require_equalArrays(), equalByTag2 = require_equalByTag(), equalObjects2 = require_equalObjects(), getTag2 = require_getTag(), isArray2 = requireIsArray(), isBuffer2 = requireIsBuffer(), isTypedArray2 = requireIsTypedArray();
  var COMPARE_PARTIAL_FLAG2 = 1;
  var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", objectTag2 = "[object Object]";
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function baseIsEqualDeep2(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag2 : getTag2(object), othTag = othIsArr ? arrayTag2 : getTag2(other);
    objTag = objTag == argsTag2 ? objectTag2 : objTag;
    othTag = othTag == argsTag2 ? objectTag2 : othTag;
    var objIsObj = objTag == objectTag2, othIsObj = othTag == objectTag2, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer2(object)) {
      if (!isBuffer2(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack2());
      return objIsArr || isTypedArray2(object) ? equalArrays2(object, other, bitmask, customizer, equalFunc, stack) : equalByTag2(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG2)) {
      var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack2());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack2());
    return equalObjects2(object, other, bitmask, customizer, equalFunc, stack);
  }
  __name(baseIsEqualDeep2, "baseIsEqualDeep");
  _baseIsEqualDeep = baseIsEqualDeep2;
  return _baseIsEqualDeep;
}
__name(require_baseIsEqualDeep, "require_baseIsEqualDeep");
var _baseIsEqual;
var hasRequired_baseIsEqual;
function require_baseIsEqual() {
  if (hasRequired_baseIsEqual) return _baseIsEqual;
  hasRequired_baseIsEqual = 1;
  var baseIsEqualDeep2 = require_baseIsEqualDeep(), isObjectLike2 = requireIsObjectLike();
  function baseIsEqual2(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep2(value, other, bitmask, customizer, baseIsEqual2, stack);
  }
  __name(baseIsEqual2, "baseIsEqual");
  _baseIsEqual = baseIsEqual2;
  return _baseIsEqual;
}
__name(require_baseIsEqual, "require_baseIsEqual");
var _baseIsMatch;
var hasRequired_baseIsMatch;
function require_baseIsMatch() {
  if (hasRequired_baseIsMatch) return _baseIsMatch;
  hasRequired_baseIsMatch = 1;
  var Stack2 = require_Stack(), baseIsEqual2 = require_baseIsEqual();
  var COMPARE_PARTIAL_FLAG2 = 1, COMPARE_UNORDERED_FLAG2 = 2;
  function baseIsMatch2(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) {
      return !length;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index < length) {
      data = matchData[index];
      var key = data[0], objValue = object[key], srcValue = data[1];
      if (noCustomizer && data[2]) {
        if (objValue === void 0 && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack2();
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === void 0 ? baseIsEqual2(srcValue, objValue, COMPARE_PARTIAL_FLAG2 | COMPARE_UNORDERED_FLAG2, customizer, stack) : result)) {
          return false;
        }
      }
    }
    return true;
  }
  __name(baseIsMatch2, "baseIsMatch");
  _baseIsMatch = baseIsMatch2;
  return _baseIsMatch;
}
__name(require_baseIsMatch, "require_baseIsMatch");
var _isStrictComparable;
var hasRequired_isStrictComparable;
function require_isStrictComparable() {
  if (hasRequired_isStrictComparable) return _isStrictComparable;
  hasRequired_isStrictComparable = 1;
  var isObject2 = requireIsObject();
  function isStrictComparable2(value) {
    return value === value && !isObject2(value);
  }
  __name(isStrictComparable2, "isStrictComparable");
  _isStrictComparable = isStrictComparable2;
  return _isStrictComparable;
}
__name(require_isStrictComparable, "require_isStrictComparable");
var _getMatchData;
var hasRequired_getMatchData;
function require_getMatchData() {
  if (hasRequired_getMatchData) return _getMatchData;
  hasRequired_getMatchData = 1;
  var isStrictComparable2 = require_isStrictComparable(), keys2 = requireKeys();
  function getMatchData2(object) {
    var result = keys2(object), length = result.length;
    while (length--) {
      var key = result[length], value = object[key];
      result[length] = [key, value, isStrictComparable2(value)];
    }
    return result;
  }
  __name(getMatchData2, "getMatchData");
  _getMatchData = getMatchData2;
  return _getMatchData;
}
__name(require_getMatchData, "require_getMatchData");
var _matchesStrictComparable;
var hasRequired_matchesStrictComparable;
function require_matchesStrictComparable() {
  if (hasRequired_matchesStrictComparable) return _matchesStrictComparable;
  hasRequired_matchesStrictComparable = 1;
  function matchesStrictComparable2(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
    };
  }
  __name(matchesStrictComparable2, "matchesStrictComparable");
  _matchesStrictComparable = matchesStrictComparable2;
  return _matchesStrictComparable;
}
__name(require_matchesStrictComparable, "require_matchesStrictComparable");
var _baseMatches;
var hasRequired_baseMatches;
function require_baseMatches() {
  if (hasRequired_baseMatches) return _baseMatches;
  hasRequired_baseMatches = 1;
  var baseIsMatch2 = require_baseIsMatch(), getMatchData2 = require_getMatchData(), matchesStrictComparable2 = require_matchesStrictComparable();
  function baseMatches2(source) {
    var matchData = getMatchData2(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable2(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch2(object, source, matchData);
    };
  }
  __name(baseMatches2, "baseMatches");
  _baseMatches = baseMatches2;
  return _baseMatches;
}
__name(require_baseMatches, "require_baseMatches");
var isSymbol_1;
var hasRequiredIsSymbol;
function requireIsSymbol() {
  if (hasRequiredIsSymbol) return isSymbol_1;
  hasRequiredIsSymbol = 1;
  var baseGetTag2 = require_baseGetTag(), isObjectLike2 = requireIsObjectLike();
  var symbolTag2 = "[object Symbol]";
  function isSymbol2(value) {
    return typeof value == "symbol" || isObjectLike2(value) && baseGetTag2(value) == symbolTag2;
  }
  __name(isSymbol2, "isSymbol");
  isSymbol_1 = isSymbol2;
  return isSymbol_1;
}
__name(requireIsSymbol, "requireIsSymbol");
var _isKey;
var hasRequired_isKey;
function require_isKey() {
  if (hasRequired_isKey) return _isKey;
  hasRequired_isKey = 1;
  var isArray2 = requireIsArray(), isSymbol2 = requireIsSymbol();
  var reIsDeepProp2 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp2 = /^\w*$/;
  function isKey2(value, object) {
    if (isArray2(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol2(value)) {
      return true;
    }
    return reIsPlainProp2.test(value) || !reIsDeepProp2.test(value) || object != null && value in Object(object);
  }
  __name(isKey2, "isKey");
  _isKey = isKey2;
  return _isKey;
}
__name(require_isKey, "require_isKey");
var memoize_1;
var hasRequiredMemoize;
function requireMemoize() {
  if (hasRequiredMemoize) return memoize_1;
  hasRequiredMemoize = 1;
  var MapCache2 = require_MapCache();
  var FUNC_ERROR_TEXT2 = "Expected a function";
  function memoize2(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT2);
    }
    var memoized = /* @__PURE__ */ __name(function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    }, "memoized");
    memoized.cache = new (memoize2.Cache || MapCache2)();
    return memoized;
  }
  __name(memoize2, "memoize");
  memoize2.Cache = MapCache2;
  memoize_1 = memoize2;
  return memoize_1;
}
__name(requireMemoize, "requireMemoize");
var _memoizeCapped;
var hasRequired_memoizeCapped;
function require_memoizeCapped() {
  if (hasRequired_memoizeCapped) return _memoizeCapped;
  hasRequired_memoizeCapped = 1;
  var memoize2 = requireMemoize();
  var MAX_MEMOIZE_SIZE2 = 500;
  function memoizeCapped2(func) {
    var result = memoize2(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE2) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  __name(memoizeCapped2, "memoizeCapped");
  _memoizeCapped = memoizeCapped2;
  return _memoizeCapped;
}
__name(require_memoizeCapped, "require_memoizeCapped");
var _stringToPath;
var hasRequired_stringToPath;
function require_stringToPath() {
  if (hasRequired_stringToPath) return _stringToPath;
  hasRequired_stringToPath = 1;
  var memoizeCapped2 = require_memoizeCapped();
  var rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar2 = /\\(\\)?/g;
  var stringToPath2 = memoizeCapped2(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName2, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar2, "$1") : number || match);
    });
    return result;
  });
  _stringToPath = stringToPath2;
  return _stringToPath;
}
__name(require_stringToPath, "require_stringToPath");
var _baseToString;
var hasRequired_baseToString;
function require_baseToString() {
  if (hasRequired_baseToString) return _baseToString;
  hasRequired_baseToString = 1;
  var Symbol2 = require_Symbol(), arrayMap2 = require_arrayMap(), isArray2 = requireIsArray(), isSymbol2 = requireIsSymbol();
  var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0, symbolToString2 = symbolProto2 ? symbolProto2.toString : void 0;
  function baseToString2(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray2(value)) {
      return arrayMap2(value, baseToString2) + "";
    }
    if (isSymbol2(value)) {
      return symbolToString2 ? symbolToString2.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  __name(baseToString2, "baseToString");
  _baseToString = baseToString2;
  return _baseToString;
}
__name(require_baseToString, "require_baseToString");
var toString_1;
var hasRequiredToString;
function requireToString() {
  if (hasRequiredToString) return toString_1;
  hasRequiredToString = 1;
  var baseToString2 = require_baseToString();
  function toString3(value) {
    return value == null ? "" : baseToString2(value);
  }
  __name(toString3, "toString");
  toString_1 = toString3;
  return toString_1;
}
__name(requireToString, "requireToString");
var _castPath;
var hasRequired_castPath;
function require_castPath() {
  if (hasRequired_castPath) return _castPath;
  hasRequired_castPath = 1;
  var isArray2 = requireIsArray(), isKey2 = require_isKey(), stringToPath2 = require_stringToPath(), toString3 = requireToString();
  function castPath2(value, object) {
    if (isArray2(value)) {
      return value;
    }
    return isKey2(value, object) ? [value] : stringToPath2(toString3(value));
  }
  __name(castPath2, "castPath");
  _castPath = castPath2;
  return _castPath;
}
__name(require_castPath, "require_castPath");
var _toKey;
var hasRequired_toKey;
function require_toKey() {
  if (hasRequired_toKey) return _toKey;
  hasRequired_toKey = 1;
  var isSymbol2 = requireIsSymbol();
  function toKey2(value) {
    if (typeof value == "string" || isSymbol2(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -Infinity ? "-0" : result;
  }
  __name(toKey2, "toKey");
  _toKey = toKey2;
  return _toKey;
}
__name(require_toKey, "require_toKey");
var _baseGet;
var hasRequired_baseGet;
function require_baseGet() {
  if (hasRequired_baseGet) return _baseGet;
  hasRequired_baseGet = 1;
  var castPath2 = require_castPath(), toKey2 = require_toKey();
  function baseGet2(object, path) {
    path = castPath2(path, object);
    var index = 0, length = path.length;
    while (object != null && index < length) {
      object = object[toKey2(path[index++])];
    }
    return index && index == length ? object : void 0;
  }
  __name(baseGet2, "baseGet");
  _baseGet = baseGet2;
  return _baseGet;
}
__name(require_baseGet, "require_baseGet");
var get_1;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet) return get_1;
  hasRequiredGet = 1;
  var baseGet2 = require_baseGet();
  function get3(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet2(object, path);
    return result === void 0 ? defaultValue : result;
  }
  __name(get3, "get");
  get_1 = get3;
  return get_1;
}
__name(requireGet, "requireGet");
var _baseHasIn;
var hasRequired_baseHasIn;
function require_baseHasIn() {
  if (hasRequired_baseHasIn) return _baseHasIn;
  hasRequired_baseHasIn = 1;
  function baseHasIn2(object, key) {
    return object != null && key in Object(object);
  }
  __name(baseHasIn2, "baseHasIn");
  _baseHasIn = baseHasIn2;
  return _baseHasIn;
}
__name(require_baseHasIn, "require_baseHasIn");
var _hasPath;
var hasRequired_hasPath;
function require_hasPath() {
  if (hasRequired_hasPath) return _hasPath;
  hasRequired_hasPath = 1;
  var castPath2 = require_castPath(), isArguments2 = requireIsArguments(), isArray2 = requireIsArray(), isIndex2 = require_isIndex(), isLength2 = requireIsLength(), toKey2 = require_toKey();
  function hasPath2(object, path, hasFunc) {
    path = castPath2(path, object);
    var index = -1, length = path.length, result = false;
    while (++index < length) {
      var key = toKey2(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength2(length) && isIndex2(key, length) && (isArray2(object) || isArguments2(object));
  }
  __name(hasPath2, "hasPath");
  _hasPath = hasPath2;
  return _hasPath;
}
__name(require_hasPath, "require_hasPath");
var hasIn_1;
var hasRequiredHasIn;
function requireHasIn() {
  if (hasRequiredHasIn) return hasIn_1;
  hasRequiredHasIn = 1;
  var baseHasIn2 = require_baseHasIn(), hasPath2 = require_hasPath();
  function hasIn2(object, path) {
    return object != null && hasPath2(object, path, baseHasIn2);
  }
  __name(hasIn2, "hasIn");
  hasIn_1 = hasIn2;
  return hasIn_1;
}
__name(requireHasIn, "requireHasIn");
var _baseMatchesProperty;
var hasRequired_baseMatchesProperty;
function require_baseMatchesProperty() {
  if (hasRequired_baseMatchesProperty) return _baseMatchesProperty;
  hasRequired_baseMatchesProperty = 1;
  var baseIsEqual2 = require_baseIsEqual(), get3 = requireGet(), hasIn2 = requireHasIn(), isKey2 = require_isKey(), isStrictComparable2 = require_isStrictComparable(), matchesStrictComparable2 = require_matchesStrictComparable(), toKey2 = require_toKey();
  var COMPARE_PARTIAL_FLAG2 = 1, COMPARE_UNORDERED_FLAG2 = 2;
  function baseMatchesProperty2(path, srcValue) {
    if (isKey2(path) && isStrictComparable2(srcValue)) {
      return matchesStrictComparable2(toKey2(path), srcValue);
    }
    return function(object) {
      var objValue = get3(object, path);
      return objValue === void 0 && objValue === srcValue ? hasIn2(object, path) : baseIsEqual2(srcValue, objValue, COMPARE_PARTIAL_FLAG2 | COMPARE_UNORDERED_FLAG2);
    };
  }
  __name(baseMatchesProperty2, "baseMatchesProperty");
  _baseMatchesProperty = baseMatchesProperty2;
  return _baseMatchesProperty;
}
__name(require_baseMatchesProperty, "require_baseMatchesProperty");
var _baseProperty;
var hasRequired_baseProperty;
function require_baseProperty() {
  if (hasRequired_baseProperty) return _baseProperty;
  hasRequired_baseProperty = 1;
  function baseProperty2(key) {
    return function(object) {
      return object == null ? void 0 : object[key];
    };
  }
  __name(baseProperty2, "baseProperty");
  _baseProperty = baseProperty2;
  return _baseProperty;
}
__name(require_baseProperty, "require_baseProperty");
var _basePropertyDeep;
var hasRequired_basePropertyDeep;
function require_basePropertyDeep() {
  if (hasRequired_basePropertyDeep) return _basePropertyDeep;
  hasRequired_basePropertyDeep = 1;
  var baseGet2 = require_baseGet();
  function basePropertyDeep2(path) {
    return function(object) {
      return baseGet2(object, path);
    };
  }
  __name(basePropertyDeep2, "basePropertyDeep");
  _basePropertyDeep = basePropertyDeep2;
  return _basePropertyDeep;
}
__name(require_basePropertyDeep, "require_basePropertyDeep");
var property_1;
var hasRequiredProperty;
function requireProperty() {
  if (hasRequiredProperty) return property_1;
  hasRequiredProperty = 1;
  var baseProperty2 = require_baseProperty(), basePropertyDeep2 = require_basePropertyDeep(), isKey2 = require_isKey(), toKey2 = require_toKey();
  function property2(path) {
    return isKey2(path) ? baseProperty2(toKey2(path)) : basePropertyDeep2(path);
  }
  __name(property2, "property");
  property_1 = property2;
  return property_1;
}
__name(requireProperty, "requireProperty");
var _baseIteratee;
var hasRequired_baseIteratee;
function require_baseIteratee() {
  if (hasRequired_baseIteratee) return _baseIteratee;
  hasRequired_baseIteratee = 1;
  var baseMatches2 = require_baseMatches(), baseMatchesProperty2 = require_baseMatchesProperty(), identity2 = requireIdentity(), isArray2 = requireIsArray(), property2 = requireProperty();
  function baseIteratee2(value) {
    if (typeof value == "function") {
      return value;
    }
    if (value == null) {
      return identity2;
    }
    if (typeof value == "object") {
      return isArray2(value) ? baseMatchesProperty2(value[0], value[1]) : baseMatches2(value);
    }
    return property2(value);
  }
  __name(baseIteratee2, "baseIteratee");
  _baseIteratee = baseIteratee2;
  return _baseIteratee;
}
__name(require_baseIteratee, "require_baseIteratee");
var _createBaseEach;
var hasRequired_createBaseEach;
function require_createBaseEach() {
  if (hasRequired_createBaseEach) return _createBaseEach;
  hasRequired_createBaseEach = 1;
  var isArrayLike2 = requireIsArrayLike();
  function createBaseEach2(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike2(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
      while (fromRight ? index-- : ++index < length) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }
  __name(createBaseEach2, "createBaseEach");
  _createBaseEach = createBaseEach2;
  return _createBaseEach;
}
__name(require_createBaseEach, "require_createBaseEach");
var _baseEach;
var hasRequired_baseEach;
function require_baseEach() {
  if (hasRequired_baseEach) return _baseEach;
  hasRequired_baseEach = 1;
  var baseForOwn2 = require_baseForOwn(), createBaseEach2 = require_createBaseEach();
  var baseEach2 = createBaseEach2(baseForOwn2);
  _baseEach = baseEach2;
  return _baseEach;
}
__name(require_baseEach, "require_baseEach");
var _baseMap;
var hasRequired_baseMap;
function require_baseMap() {
  if (hasRequired_baseMap) return _baseMap;
  hasRequired_baseMap = 1;
  var baseEach2 = require_baseEach(), isArrayLike2 = requireIsArrayLike();
  function baseMap2(collection, iteratee) {
    var index = -1, result = isArrayLike2(collection) ? Array(collection.length) : [];
    baseEach2(collection, function(value, key, collection2) {
      result[++index] = iteratee(value, key, collection2);
    });
    return result;
  }
  __name(baseMap2, "baseMap");
  _baseMap = baseMap2;
  return _baseMap;
}
__name(require_baseMap, "require_baseMap");
var map_1;
var hasRequiredMap;
function requireMap() {
  if (hasRequiredMap) return map_1;
  hasRequiredMap = 1;
  var arrayMap2 = require_arrayMap(), baseIteratee2 = require_baseIteratee(), baseMap2 = require_baseMap(), isArray2 = requireIsArray();
  function map2(collection, iteratee) {
    var func = isArray2(collection) ? arrayMap2 : baseMap2;
    return func(collection, baseIteratee2(iteratee, 3));
  }
  __name(map2, "map");
  map_1 = map2;
  return map_1;
}
__name(requireMap, "requireMap");
var hasRequiredFlattenNames;
function requireFlattenNames() {
  if (hasRequiredFlattenNames) return flattenNames;
  hasRequiredFlattenNames = 1;
  Object.defineProperty(flattenNames, "__esModule", {
    value: true
  });
  flattenNames.flattenNames = void 0;
  var _isString2 = requireIsString();
  var _isString3 = _interopRequireDefault(_isString2);
  var _forOwn2 = requireForOwn();
  var _forOwn3 = _interopRequireDefault(_forOwn2);
  var _isPlainObject2 = requireIsPlainObject();
  var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);
  var _map2 = requireMap();
  var _map3 = _interopRequireDefault(_map2);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  var flattenNames$1 = flattenNames.flattenNames = /* @__PURE__ */ __name(function flattenNames2() {
    var things = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    var names2 = [];
    (0, _map3.default)(things, function(thing) {
      if (Array.isArray(thing)) {
        flattenNames2(thing).map(function(name) {
          return names2.push(name);
        });
      } else if ((0, _isPlainObject3.default)(thing)) {
        (0, _forOwn3.default)(thing, function(value, key) {
          value === true && names2.push(key);
          names2.push(key + "-" + value);
        });
      } else if ((0, _isString3.default)(thing)) {
        names2.push(thing);
      }
    });
    return names2;
  }, "flattenNames");
  flattenNames.default = flattenNames$1;
  return flattenNames;
}
__name(requireFlattenNames, "requireFlattenNames");
var mergeClasses = {};
var _arrayEach;
var hasRequired_arrayEach;
function require_arrayEach() {
  if (hasRequired_arrayEach) return _arrayEach;
  hasRequired_arrayEach = 1;
  function arrayEach2(array, iteratee) {
    var index = -1, length = array == null ? 0 : array.length;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  __name(arrayEach2, "arrayEach");
  _arrayEach = arrayEach2;
  return _arrayEach;
}
__name(require_arrayEach, "require_arrayEach");
var _defineProperty$1;
var hasRequired_defineProperty;
function require_defineProperty() {
  if (hasRequired_defineProperty) return _defineProperty$1;
  hasRequired_defineProperty = 1;
  var getNative2 = require_getNative();
  var defineProperty2 = (function() {
    try {
      var func = getNative2(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  })();
  _defineProperty$1 = defineProperty2;
  return _defineProperty$1;
}
__name(require_defineProperty, "require_defineProperty");
var _baseAssignValue;
var hasRequired_baseAssignValue;
function require_baseAssignValue() {
  if (hasRequired_baseAssignValue) return _baseAssignValue;
  hasRequired_baseAssignValue = 1;
  var defineProperty2 = require_defineProperty();
  function baseAssignValue2(object, key, value) {
    if (key == "__proto__" && defineProperty2) {
      defineProperty2(object, key, {
        "configurable": true,
        "enumerable": true,
        "value": value,
        "writable": true
      });
    } else {
      object[key] = value;
    }
  }
  __name(baseAssignValue2, "baseAssignValue");
  _baseAssignValue = baseAssignValue2;
  return _baseAssignValue;
}
__name(require_baseAssignValue, "require_baseAssignValue");
var _assignValue;
var hasRequired_assignValue;
function require_assignValue() {
  if (hasRequired_assignValue) return _assignValue;
  hasRequired_assignValue = 1;
  var baseAssignValue2 = require_baseAssignValue(), eq2 = requireEq();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function assignValue2(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty2.call(object, key) && eq2(objValue, value)) || value === void 0 && !(key in object)) {
      baseAssignValue2(object, key, value);
    }
  }
  __name(assignValue2, "assignValue");
  _assignValue = assignValue2;
  return _assignValue;
}
__name(require_assignValue, "require_assignValue");
var _copyObject;
var hasRequired_copyObject;
function require_copyObject() {
  if (hasRequired_copyObject) return _copyObject;
  hasRequired_copyObject = 1;
  var assignValue2 = require_assignValue(), baseAssignValue2 = require_baseAssignValue();
  function copyObject2(source, props, object, customizer) {
    var isNew = !object;
    object || (object = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue2(object, key, newValue);
      } else {
        assignValue2(object, key, newValue);
      }
    }
    return object;
  }
  __name(copyObject2, "copyObject");
  _copyObject = copyObject2;
  return _copyObject;
}
__name(require_copyObject, "require_copyObject");
var _baseAssign;
var hasRequired_baseAssign;
function require_baseAssign() {
  if (hasRequired_baseAssign) return _baseAssign;
  hasRequired_baseAssign = 1;
  var copyObject2 = require_copyObject(), keys2 = requireKeys();
  function baseAssign(object, source) {
    return object && copyObject2(source, keys2(source), object);
  }
  __name(baseAssign, "baseAssign");
  _baseAssign = baseAssign;
  return _baseAssign;
}
__name(require_baseAssign, "require_baseAssign");
var _nativeKeysIn;
var hasRequired_nativeKeysIn;
function require_nativeKeysIn() {
  if (hasRequired_nativeKeysIn) return _nativeKeysIn;
  hasRequired_nativeKeysIn = 1;
  function nativeKeysIn2(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }
  __name(nativeKeysIn2, "nativeKeysIn");
  _nativeKeysIn = nativeKeysIn2;
  return _nativeKeysIn;
}
__name(require_nativeKeysIn, "require_nativeKeysIn");
var _baseKeysIn;
var hasRequired_baseKeysIn;
function require_baseKeysIn() {
  if (hasRequired_baseKeysIn) return _baseKeysIn;
  hasRequired_baseKeysIn = 1;
  var isObject2 = requireIsObject(), isPrototype2 = require_isPrototype(), nativeKeysIn2 = require_nativeKeysIn();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function baseKeysIn2(object) {
    if (!isObject2(object)) {
      return nativeKeysIn2(object);
    }
    var isProto = isPrototype2(object), result = [];
    for (var key in object) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty2.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  __name(baseKeysIn2, "baseKeysIn");
  _baseKeysIn = baseKeysIn2;
  return _baseKeysIn;
}
__name(require_baseKeysIn, "require_baseKeysIn");
var keysIn_1;
var hasRequiredKeysIn;
function requireKeysIn() {
  if (hasRequiredKeysIn) return keysIn_1;
  hasRequiredKeysIn = 1;
  var arrayLikeKeys2 = require_arrayLikeKeys(), baseKeysIn2 = require_baseKeysIn(), isArrayLike2 = requireIsArrayLike();
  function keysIn2(object) {
    return isArrayLike2(object) ? arrayLikeKeys2(object, true) : baseKeysIn2(object);
  }
  __name(keysIn2, "keysIn");
  keysIn_1 = keysIn2;
  return keysIn_1;
}
__name(requireKeysIn, "requireKeysIn");
var _baseAssignIn;
var hasRequired_baseAssignIn;
function require_baseAssignIn() {
  if (hasRequired_baseAssignIn) return _baseAssignIn;
  hasRequired_baseAssignIn = 1;
  var copyObject2 = require_copyObject(), keysIn2 = requireKeysIn();
  function baseAssignIn(object, source) {
    return object && copyObject2(source, keysIn2(source), object);
  }
  __name(baseAssignIn, "baseAssignIn");
  _baseAssignIn = baseAssignIn;
  return _baseAssignIn;
}
__name(require_baseAssignIn, "require_baseAssignIn");
var _cloneBuffer = { exports: {} };
_cloneBuffer.exports;
var hasRequired_cloneBuffer;
function require_cloneBuffer() {
  if (hasRequired_cloneBuffer) return _cloneBuffer.exports;
  hasRequired_cloneBuffer = 1;
  (function(module2, exports$1) {
    var root2 = require_root();
    var freeExports2 = exports$1 && !exports$1.nodeType && exports$1;
    var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
    var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
    var Buffer3 = moduleExports2 ? root2.Buffer : void 0, allocUnsafe = Buffer3 ? Buffer3.allocUnsafe : void 0;
    function cloneBuffer2(buffer, isDeep) {
      if (isDeep) {
        return buffer.slice();
      }
      var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
      buffer.copy(result);
      return result;
    }
    __name(cloneBuffer2, "cloneBuffer");
    module2.exports = cloneBuffer2;
  })(_cloneBuffer, _cloneBuffer.exports);
  return _cloneBuffer.exports;
}
__name(require_cloneBuffer, "require_cloneBuffer");
var _copyArray;
var hasRequired_copyArray;
function require_copyArray() {
  if (hasRequired_copyArray) return _copyArray;
  hasRequired_copyArray = 1;
  function copyArray2(source, array) {
    var index = -1, length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }
  __name(copyArray2, "copyArray");
  _copyArray = copyArray2;
  return _copyArray;
}
__name(require_copyArray, "require_copyArray");
var _copySymbols;
var hasRequired_copySymbols;
function require_copySymbols() {
  if (hasRequired_copySymbols) return _copySymbols;
  hasRequired_copySymbols = 1;
  var copyObject2 = require_copyObject(), getSymbols2 = require_getSymbols();
  function copySymbols(source, object) {
    return copyObject2(source, getSymbols2(source), object);
  }
  __name(copySymbols, "copySymbols");
  _copySymbols = copySymbols;
  return _copySymbols;
}
__name(require_copySymbols, "require_copySymbols");
var _getSymbolsIn;
var hasRequired_getSymbolsIn;
function require_getSymbolsIn() {
  if (hasRequired_getSymbolsIn) return _getSymbolsIn;
  hasRequired_getSymbolsIn = 1;
  var arrayPush2 = require_arrayPush(), getPrototype2 = require_getPrototype(), getSymbols2 = require_getSymbols(), stubArray2 = requireStubArray();
  var nativeGetSymbols2 = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols2 ? stubArray2 : function(object) {
    var result = [];
    while (object) {
      arrayPush2(result, getSymbols2(object));
      object = getPrototype2(object);
    }
    return result;
  };
  _getSymbolsIn = getSymbolsIn;
  return _getSymbolsIn;
}
__name(require_getSymbolsIn, "require_getSymbolsIn");
var _copySymbolsIn;
var hasRequired_copySymbolsIn;
function require_copySymbolsIn() {
  if (hasRequired_copySymbolsIn) return _copySymbolsIn;
  hasRequired_copySymbolsIn = 1;
  var copyObject2 = require_copyObject(), getSymbolsIn = require_getSymbolsIn();
  function copySymbolsIn(source, object) {
    return copyObject2(source, getSymbolsIn(source), object);
  }
  __name(copySymbolsIn, "copySymbolsIn");
  _copySymbolsIn = copySymbolsIn;
  return _copySymbolsIn;
}
__name(require_copySymbolsIn, "require_copySymbolsIn");
var _getAllKeysIn;
var hasRequired_getAllKeysIn;
function require_getAllKeysIn() {
  if (hasRequired_getAllKeysIn) return _getAllKeysIn;
  hasRequired_getAllKeysIn = 1;
  var baseGetAllKeys2 = require_baseGetAllKeys(), getSymbolsIn = require_getSymbolsIn(), keysIn2 = requireKeysIn();
  function getAllKeysIn(object) {
    return baseGetAllKeys2(object, keysIn2, getSymbolsIn);
  }
  __name(getAllKeysIn, "getAllKeysIn");
  _getAllKeysIn = getAllKeysIn;
  return _getAllKeysIn;
}
__name(require_getAllKeysIn, "require_getAllKeysIn");
var _initCloneArray;
var hasRequired_initCloneArray;
function require_initCloneArray() {
  if (hasRequired_initCloneArray) return _initCloneArray;
  hasRequired_initCloneArray = 1;
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function initCloneArray(array) {
    var length = array.length, result = new array.constructor(length);
    if (length && typeof array[0] == "string" && hasOwnProperty2.call(array, "index")) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }
  __name(initCloneArray, "initCloneArray");
  _initCloneArray = initCloneArray;
  return _initCloneArray;
}
__name(require_initCloneArray, "require_initCloneArray");
var _cloneArrayBuffer;
var hasRequired_cloneArrayBuffer;
function require_cloneArrayBuffer() {
  if (hasRequired_cloneArrayBuffer) return _cloneArrayBuffer;
  hasRequired_cloneArrayBuffer = 1;
  var Uint8Array3 = require_Uint8Array();
  function cloneArrayBuffer2(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array3(result).set(new Uint8Array3(arrayBuffer));
    return result;
  }
  __name(cloneArrayBuffer2, "cloneArrayBuffer");
  _cloneArrayBuffer = cloneArrayBuffer2;
  return _cloneArrayBuffer;
}
__name(require_cloneArrayBuffer, "require_cloneArrayBuffer");
var _cloneDataView;
var hasRequired_cloneDataView;
function require_cloneDataView() {
  if (hasRequired_cloneDataView) return _cloneDataView;
  hasRequired_cloneDataView = 1;
  var cloneArrayBuffer2 = require_cloneArrayBuffer();
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer2(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  __name(cloneDataView, "cloneDataView");
  _cloneDataView = cloneDataView;
  return _cloneDataView;
}
__name(require_cloneDataView, "require_cloneDataView");
var _cloneRegExp;
var hasRequired_cloneRegExp;
function require_cloneRegExp() {
  if (hasRequired_cloneRegExp) return _cloneRegExp;
  hasRequired_cloneRegExp = 1;
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  __name(cloneRegExp, "cloneRegExp");
  _cloneRegExp = cloneRegExp;
  return _cloneRegExp;
}
__name(require_cloneRegExp, "require_cloneRegExp");
var _cloneSymbol;
var hasRequired_cloneSymbol;
function require_cloneSymbol() {
  if (hasRequired_cloneSymbol) return _cloneSymbol;
  hasRequired_cloneSymbol = 1;
  var Symbol2 = require_Symbol();
  var symbolProto2 = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf2 ? Object(symbolValueOf2.call(symbol)) : {};
  }
  __name(cloneSymbol, "cloneSymbol");
  _cloneSymbol = cloneSymbol;
  return _cloneSymbol;
}
__name(require_cloneSymbol, "require_cloneSymbol");
var _cloneTypedArray;
var hasRequired_cloneTypedArray;
function require_cloneTypedArray() {
  if (hasRequired_cloneTypedArray) return _cloneTypedArray;
  hasRequired_cloneTypedArray = 1;
  var cloneArrayBuffer2 = require_cloneArrayBuffer();
  function cloneTypedArray2(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer2(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  __name(cloneTypedArray2, "cloneTypedArray");
  _cloneTypedArray = cloneTypedArray2;
  return _cloneTypedArray;
}
__name(require_cloneTypedArray, "require_cloneTypedArray");
var _initCloneByTag;
var hasRequired_initCloneByTag;
function require_initCloneByTag() {
  if (hasRequired_initCloneByTag) return _initCloneByTag;
  hasRequired_initCloneByTag = 1;
  var cloneArrayBuffer2 = require_cloneArrayBuffer(), cloneDataView = require_cloneDataView(), cloneRegExp = require_cloneRegExp(), cloneSymbol = require_cloneSymbol(), cloneTypedArray2 = require_cloneTypedArray();
  var boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]";
  var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag2:
        return cloneArrayBuffer2(object);
      case boolTag2:
      case dateTag2:
        return new Ctor(+object);
      case dataViewTag2:
        return cloneDataView(object, isDeep);
      case float32Tag2:
      case float64Tag2:
      case int8Tag2:
      case int16Tag2:
      case int32Tag2:
      case uint8Tag2:
      case uint8ClampedTag2:
      case uint16Tag2:
      case uint32Tag2:
        return cloneTypedArray2(object, isDeep);
      case mapTag2:
        return new Ctor();
      case numberTag2:
      case stringTag2:
        return new Ctor(object);
      case regexpTag2:
        return cloneRegExp(object);
      case setTag2:
        return new Ctor();
      case symbolTag2:
        return cloneSymbol(object);
    }
  }
  __name(initCloneByTag, "initCloneByTag");
  _initCloneByTag = initCloneByTag;
  return _initCloneByTag;
}
__name(require_initCloneByTag, "require_initCloneByTag");
var _baseCreate;
var hasRequired_baseCreate;
function require_baseCreate() {
  if (hasRequired_baseCreate) return _baseCreate;
  hasRequired_baseCreate = 1;
  var isObject2 = requireIsObject();
  var objectCreate2 = Object.create;
  var baseCreate2 = /* @__PURE__ */ (function() {
    function object() {
    }
    __name(object, "object");
    return function(proto) {
      if (!isObject2(proto)) {
        return {};
      }
      if (objectCreate2) {
        return objectCreate2(proto);
      }
      object.prototype = proto;
      var result = new object();
      object.prototype = void 0;
      return result;
    };
  })();
  _baseCreate = baseCreate2;
  return _baseCreate;
}
__name(require_baseCreate, "require_baseCreate");
var _initCloneObject;
var hasRequired_initCloneObject;
function require_initCloneObject() {
  if (hasRequired_initCloneObject) return _initCloneObject;
  hasRequired_initCloneObject = 1;
  var baseCreate2 = require_baseCreate(), getPrototype2 = require_getPrototype(), isPrototype2 = require_isPrototype();
  function initCloneObject2(object) {
    return typeof object.constructor == "function" && !isPrototype2(object) ? baseCreate2(getPrototype2(object)) : {};
  }
  __name(initCloneObject2, "initCloneObject");
  _initCloneObject = initCloneObject2;
  return _initCloneObject;
}
__name(require_initCloneObject, "require_initCloneObject");
var _baseIsMap;
var hasRequired_baseIsMap;
function require_baseIsMap() {
  if (hasRequired_baseIsMap) return _baseIsMap;
  hasRequired_baseIsMap = 1;
  var getTag2 = require_getTag(), isObjectLike2 = requireIsObjectLike();
  var mapTag2 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike2(value) && getTag2(value) == mapTag2;
  }
  __name(baseIsMap, "baseIsMap");
  _baseIsMap = baseIsMap;
  return _baseIsMap;
}
__name(require_baseIsMap, "require_baseIsMap");
var isMap_1;
var hasRequiredIsMap;
function requireIsMap() {
  if (hasRequiredIsMap) return isMap_1;
  hasRequiredIsMap = 1;
  var baseIsMap = require_baseIsMap(), baseUnary2 = require_baseUnary(), nodeUtil2 = require_nodeUtil();
  var nodeIsMap = nodeUtil2 && nodeUtil2.isMap;
  var isMap = nodeIsMap ? baseUnary2(nodeIsMap) : baseIsMap;
  isMap_1 = isMap;
  return isMap_1;
}
__name(requireIsMap, "requireIsMap");
var _baseIsSet;
var hasRequired_baseIsSet;
function require_baseIsSet() {
  if (hasRequired_baseIsSet) return _baseIsSet;
  hasRequired_baseIsSet = 1;
  var getTag2 = require_getTag(), isObjectLike2 = requireIsObjectLike();
  var setTag2 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike2(value) && getTag2(value) == setTag2;
  }
  __name(baseIsSet, "baseIsSet");
  _baseIsSet = baseIsSet;
  return _baseIsSet;
}
__name(require_baseIsSet, "require_baseIsSet");
var isSet_1;
var hasRequiredIsSet;
function requireIsSet() {
  if (hasRequiredIsSet) return isSet_1;
  hasRequiredIsSet = 1;
  var baseIsSet = require_baseIsSet(), baseUnary2 = require_baseUnary(), nodeUtil2 = require_nodeUtil();
  var nodeIsSet = nodeUtil2 && nodeUtil2.isSet;
  var isSet = nodeIsSet ? baseUnary2(nodeIsSet) : baseIsSet;
  isSet_1 = isSet;
  return isSet_1;
}
__name(requireIsSet, "requireIsSet");
var _baseClone;
var hasRequired_baseClone;
function require_baseClone() {
  if (hasRequired_baseClone) return _baseClone;
  hasRequired_baseClone = 1;
  var Stack2 = require_Stack(), arrayEach2 = require_arrayEach(), assignValue2 = require_assignValue(), baseAssign = require_baseAssign(), baseAssignIn = require_baseAssignIn(), cloneBuffer2 = require_cloneBuffer(), copyArray2 = require_copyArray(), copySymbols = require_copySymbols(), copySymbolsIn = require_copySymbolsIn(), getAllKeys2 = require_getAllKeys(), getAllKeysIn = require_getAllKeysIn(), getTag2 = require_getTag(), initCloneArray = require_initCloneArray(), initCloneByTag = require_initCloneByTag(), initCloneObject2 = require_initCloneObject(), isArray2 = requireIsArray(), isBuffer2 = requireIsBuffer(), isMap = requireIsMap(), isObject2 = requireIsObject(), isSet = requireIsSet(), keys2 = requireKeys(), keysIn2 = requireKeysIn();
  var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
  var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", errorTag2 = "[object Error]", funcTag2 = "[object Function]", genTag2 = "[object GeneratorFunction]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", objectTag2 = "[object Object]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag2 = "[object Symbol]", weakMapTag2 = "[object WeakMap]";
  var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]", float32Tag2 = "[object Float32Array]", float64Tag2 = "[object Float64Array]", int8Tag2 = "[object Int8Array]", int16Tag2 = "[object Int16Array]", int32Tag2 = "[object Int32Array]", uint8Tag2 = "[object Uint8Array]", uint8ClampedTag2 = "[object Uint8ClampedArray]", uint16Tag2 = "[object Uint16Array]", uint32Tag2 = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag2] = cloneableTags[arrayTag2] = cloneableTags[arrayBufferTag2] = cloneableTags[dataViewTag2] = cloneableTags[boolTag2] = cloneableTags[dateTag2] = cloneableTags[float32Tag2] = cloneableTags[float64Tag2] = cloneableTags[int8Tag2] = cloneableTags[int16Tag2] = cloneableTags[int32Tag2] = cloneableTags[mapTag2] = cloneableTags[numberTag2] = cloneableTags[objectTag2] = cloneableTags[regexpTag2] = cloneableTags[setTag2] = cloneableTags[stringTag2] = cloneableTags[symbolTag2] = cloneableTags[uint8Tag2] = cloneableTags[uint8ClampedTag2] = cloneableTags[uint16Tag2] = cloneableTags[uint32Tag2] = true;
  cloneableTags[errorTag2] = cloneableTags[funcTag2] = cloneableTags[weakMapTag2] = false;
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject2(value)) {
      return value;
    }
    var isArr = isArray2(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray2(value, result);
      }
    } else {
      var tag = getTag2(value), isFunc = tag == funcTag2 || tag == genTag2;
      if (isBuffer2(value)) {
        return cloneBuffer2(value, isDeep);
      }
      if (tag == objectTag2 || tag == argsTag2 || isFunc && !object) {
        result = isFlat || isFunc ? {} : initCloneObject2(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack2());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys2 : isFlat ? keysIn2 : keys2;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach2(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue2(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  __name(baseClone, "baseClone");
  _baseClone = baseClone;
  return _baseClone;
}
__name(require_baseClone, "require_baseClone");
var cloneDeep_1;
var hasRequiredCloneDeep;
function requireCloneDeep() {
  if (hasRequiredCloneDeep) return cloneDeep_1;
  hasRequiredCloneDeep = 1;
  var baseClone = require_baseClone();
  var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
  function cloneDeep(value) {
    return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
  }
  __name(cloneDeep, "cloneDeep");
  cloneDeep_1 = cloneDeep;
  return cloneDeep_1;
}
__name(requireCloneDeep, "requireCloneDeep");
var hasRequiredMergeClasses;
function requireMergeClasses() {
  if (hasRequiredMergeClasses) return mergeClasses;
  hasRequiredMergeClasses = 1;
  Object.defineProperty(mergeClasses, "__esModule", {
    value: true
  });
  mergeClasses.mergeClasses = void 0;
  var _forOwn2 = requireForOwn();
  var _forOwn3 = _interopRequireDefault(_forOwn2);
  var _cloneDeep2 = requireCloneDeep();
  var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);
  var _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  var mergeClasses$1 = mergeClasses.mergeClasses = /* @__PURE__ */ __name(function mergeClasses2(classes) {
    var activeNames = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var styles = classes.default && (0, _cloneDeep3.default)(classes.default) || {};
    activeNames.map(function(name) {
      var toMerge = classes[name];
      if (toMerge) {
        (0, _forOwn3.default)(toMerge, function(value, key) {
          if (!styles[key]) {
            styles[key] = {};
          }
          styles[key] = _extends2({}, styles[key], toMerge[key]);
        });
      }
      return name;
    });
    return styles;
  }, "mergeClasses");
  mergeClasses.default = mergeClasses$1;
  return mergeClasses;
}
__name(requireMergeClasses, "requireMergeClasses");
var autoprefix = {};
var hasRequiredAutoprefix;
function requireAutoprefix() {
  if (hasRequiredAutoprefix) return autoprefix;
  hasRequiredAutoprefix = 1;
  Object.defineProperty(autoprefix, "__esModule", {
    value: true
  });
  autoprefix.autoprefix = void 0;
  var _forOwn2 = requireForOwn();
  var _forOwn3 = _interopRequireDefault(_forOwn2);
  var _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  var transforms = {
    borderRadius: /* @__PURE__ */ __name(function borderRadius(value) {
      return {
        msBorderRadius: value,
        MozBorderRadius: value,
        OBorderRadius: value,
        WebkitBorderRadius: value,
        borderRadius: value
      };
    }, "borderRadius"),
    boxShadow: /* @__PURE__ */ __name(function boxShadow(value) {
      return {
        msBoxShadow: value,
        MozBoxShadow: value,
        OBoxShadow: value,
        WebkitBoxShadow: value,
        boxShadow: value
      };
    }, "boxShadow"),
    userSelect: /* @__PURE__ */ __name(function userSelect(value) {
      return {
        WebkitTouchCallout: value,
        KhtmlUserSelect: value,
        MozUserSelect: value,
        msUserSelect: value,
        WebkitUserSelect: value,
        userSelect: value
      };
    }, "userSelect"),
    flex: /* @__PURE__ */ __name(function flex(value) {
      return {
        WebkitBoxFlex: value,
        MozBoxFlex: value,
        WebkitFlex: value,
        msFlex: value,
        flex: value
      };
    }, "flex"),
    flexBasis: /* @__PURE__ */ __name(function flexBasis(value) {
      return {
        WebkitFlexBasis: value,
        flexBasis: value
      };
    }, "flexBasis"),
    justifyContent: /* @__PURE__ */ __name(function justifyContent(value) {
      return {
        WebkitJustifyContent: value,
        justifyContent: value
      };
    }, "justifyContent"),
    transition: /* @__PURE__ */ __name(function transition(value) {
      return {
        msTransition: value,
        MozTransition: value,
        OTransition: value,
        WebkitTransition: value,
        transition: value
      };
    }, "transition"),
    transform: /* @__PURE__ */ __name(function transform(value) {
      return {
        msTransform: value,
        MozTransform: value,
        OTransform: value,
        WebkitTransform: value,
        transform: value
      };
    }, "transform"),
    absolute: /* @__PURE__ */ __name(function absolute(value) {
      var direction = value && value.split(" ");
      return {
        position: "absolute",
        top: direction && direction[0],
        right: direction && direction[1],
        bottom: direction && direction[2],
        left: direction && direction[3]
      };
    }, "absolute"),
    extend: /* @__PURE__ */ __name(function extend(name, otherElementStyles) {
      var otherStyle = otherElementStyles[name];
      if (otherStyle) {
        return otherStyle;
      }
      return {
        "extend": name
      };
    }, "extend")
  };
  var autoprefix$1 = autoprefix.autoprefix = /* @__PURE__ */ __name(function autoprefix2(elements) {
    var prefixed = {};
    (0, _forOwn3.default)(elements, function(styles, element) {
      var expanded = {};
      (0, _forOwn3.default)(styles, function(value, key) {
        var transform = transforms[key];
        if (transform) {
          expanded = _extends2({}, expanded, transform(value));
        } else {
          expanded[key] = value;
        }
      });
      prefixed[element] = expanded;
    });
    return prefixed;
  }, "autoprefix");
  autoprefix.default = autoprefix$1;
  return autoprefix;
}
__name(requireAutoprefix, "requireAutoprefix");
var hover = {};
var hasRequiredHover;
function requireHover() {
  if (hasRequiredHover) return hover;
  hasRequiredHover = 1;
  Object.defineProperty(hover, "__esModule", {
    value: true
  });
  hover.hover = void 0;
  var _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _react = requireReact();
  var _react2 = _interopRequireDefault(_react);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  __name(_classCallCheck2, "_classCallCheck");
  function _possibleConstructorReturn2(self2, call) {
    if (!self2) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self2;
  }
  __name(_possibleConstructorReturn2, "_possibleConstructorReturn");
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  __name(_inherits2, "_inherits");
  var hover$1 = hover.hover = /* @__PURE__ */ __name(function hover2(Component) {
    var Span = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "span";
    return (function(_React$Component) {
      _inherits2(Hover, _React$Component);
      function Hover() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck2(this, Hover);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn2(this, (_ref = Hover.__proto__ || Object.getPrototypeOf(Hover)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hover: false }, _this.handleMouseOver = function() {
          return _this.setState({ hover: true });
        }, _this.handleMouseOut = function() {
          return _this.setState({ hover: false });
        }, _this.render = function() {
          return _react2.default.createElement(
            Span,
            { onMouseOver: _this.handleMouseOver, onMouseOut: _this.handleMouseOut },
            _react2.default.createElement(Component, _extends2({}, _this.props, _this.state))
          );
        }, _temp), _possibleConstructorReturn2(_this, _ret);
      }
      __name(Hover, "Hover");
      return Hover;
    })(_react2.default.Component);
  }, "hover");
  hover.default = hover$1;
  return hover;
}
__name(requireHover, "requireHover");
var active = {};
var hasRequiredActive;
function requireActive() {
  if (hasRequiredActive) return active;
  hasRequiredActive = 1;
  Object.defineProperty(active, "__esModule", {
    value: true
  });
  active.active = void 0;
  var _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _react = requireReact();
  var _react2 = _interopRequireDefault(_react);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  function _classCallCheck2(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  __name(_classCallCheck2, "_classCallCheck");
  function _possibleConstructorReturn2(self2, call) {
    if (!self2) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self2;
  }
  __name(_possibleConstructorReturn2, "_possibleConstructorReturn");
  function _inherits2(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }
  __name(_inherits2, "_inherits");
  var active$1 = active.active = /* @__PURE__ */ __name(function active2(Component) {
    var Span = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "span";
    return (function(_React$Component) {
      _inherits2(Active, _React$Component);
      function Active() {
        var _ref;
        var _temp, _this, _ret;
        _classCallCheck2(this, Active);
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        return _ret = (_temp = (_this = _possibleConstructorReturn2(this, (_ref = Active.__proto__ || Object.getPrototypeOf(Active)).call.apply(_ref, [this].concat(args))), _this), _this.state = { active: false }, _this.handleMouseDown = function() {
          return _this.setState({ active: true });
        }, _this.handleMouseUp = function() {
          return _this.setState({ active: false });
        }, _this.render = function() {
          return _react2.default.createElement(
            Span,
            { onMouseDown: _this.handleMouseDown, onMouseUp: _this.handleMouseUp },
            _react2.default.createElement(Component, _extends2({}, _this.props, _this.state))
          );
        }, _temp), _possibleConstructorReturn2(_this, _ret);
      }
      __name(Active, "Active");
      return Active;
    })(_react2.default.Component);
  }, "active");
  active.default = active$1;
  return active;
}
__name(requireActive, "requireActive");
var loop = {};
var hasRequiredLoop;
function requireLoop() {
  if (hasRequiredLoop) return loop;
  hasRequiredLoop = 1;
  Object.defineProperty(loop, "__esModule", {
    value: true
  });
  var loopable = /* @__PURE__ */ __name(function loopable2(i, length) {
    var props = {};
    var setProp = /* @__PURE__ */ __name(function setProp2(name) {
      var value = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      props[name] = value;
    }, "setProp");
    i === 0 && setProp("first-child");
    i === length - 1 && setProp("last-child");
    (i === 0 || i % 2 === 0) && setProp("even");
    Math.abs(i % 2) === 1 && setProp("odd");
    setProp("nth-child", i);
    return props;
  }, "loopable");
  loop.default = loopable;
  return loop;
}
__name(requireLoop, "requireLoop");
var hasRequiredLib;
function requireLib() {
  if (hasRequiredLib) return lib;
  hasRequiredLib = 1;
  Object.defineProperty(lib, "__esModule", {
    value: true
  });
  lib.ReactCSS = lib.loop = lib.handleActive = lib.handleHover = lib.hover = void 0;
  var _flattenNames = requireFlattenNames();
  var _flattenNames2 = _interopRequireDefault(_flattenNames);
  var _mergeClasses = requireMergeClasses();
  var _mergeClasses2 = _interopRequireDefault(_mergeClasses);
  var _autoprefix = requireAutoprefix();
  var _autoprefix2 = _interopRequireDefault(_autoprefix);
  var _hover2 = requireHover();
  var _hover3 = _interopRequireDefault(_hover2);
  var _active = requireActive();
  var _active2 = _interopRequireDefault(_active);
  var _loop2 = requireLoop();
  var _loop3 = _interopRequireDefault(_loop2);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  lib.hover = _hover3.default;
  lib.handleHover = _hover3.default;
  lib.handleActive = _active2.default;
  lib.loop = _loop3.default;
  var ReactCSS = lib.ReactCSS = /* @__PURE__ */ __name(function ReactCSS2(classes) {
    for (var _len = arguments.length, activations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      activations[_key - 1] = arguments[_key];
    }
    var activeNames = (0, _flattenNames2.default)(activations);
    var merged = (0, _mergeClasses2.default)(classes, activeNames);
    return (0, _autoprefix2.default)(merged);
  }, "ReactCSS");
  lib.default = ReactCSS;
  return lib;
}
__name(requireLib, "requireLib");
var libExports = requireLib();
const reactCSS = /* @__PURE__ */ getDefaultExportFromCjs(libExports);
var calculateChange$2 = /* @__PURE__ */ __name(function calculateChange(e, hsl, direction, initialA, container) {
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;
  var x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
  var y2 = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;
  var left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y2 - (container.getBoundingClientRect().top + window.pageYOffset);
  if (direction === "vertical") {
    var a = void 0;
    if (top < 0) {
      a = 0;
    } else if (top > containerHeight) {
      a = 1;
    } else {
      a = Math.round(top * 100 / containerHeight) / 100;
    }
    if (hsl.a !== a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a,
        source: "rgb"
      };
    }
  } else {
    var _a = void 0;
    if (left < 0) {
      _a = 0;
    } else if (left > containerWidth) {
      _a = 1;
    } else {
      _a = Math.round(left * 100 / containerWidth) / 100;
    }
    if (initialA !== _a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: _a,
        source: "rgb"
      };
    }
  }
  return null;
}, "calculateChange");
var checkboardCache = {};
var render = /* @__PURE__ */ __name(function render2(c1, c2, size, serverCanvas) {
  if (typeof document === "undefined" && !serverCanvas) {
    return null;
  }
  var canvas = serverCanvas ? new serverCanvas() : document.createElement("canvas");
  canvas.width = size * 2;
  canvas.height = size * 2;
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
}, "render");
var get$1 = /* @__PURE__ */ __name(function get(c1, c2, size, serverCanvas) {
  var key = c1 + "-" + c2 + "-" + size + (serverCanvas ? "-server" : "");
  if (checkboardCache[key]) {
    return checkboardCache[key];
  }
  var checkboard = render(c1, c2, size, serverCanvas);
  checkboardCache[key] = checkboard;
  return checkboard;
}, "get");
var _extends$8 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var Checkboard = /* @__PURE__ */ __name(function Checkboard2(_ref) {
  var white = _ref.white, grey = _ref.grey, size = _ref.size, renderers = _ref.renderers, borderRadius = _ref.borderRadius, boxShadow = _ref.boxShadow, children = _ref.children;
  var styles = reactCSS({
    "default": {
      grid: {
        borderRadius,
        boxShadow,
        absolute: "0px 0px 0px 0px",
        background: "url(" + get$1(white, grey, size, renderers.canvas) + ") center left"
      }
    }
  });
  return reactExports.isValidElement(children) ? React.cloneElement(children, _extends$8({}, children.props, { style: _extends$8({}, children.props.style, styles.grid) })) : React.createElement("div", { style: styles.grid });
}, "Checkboard");
Checkboard.defaultProps = {
  size: 8,
  white: "transparent",
  grey: "rgba(0,0,0,.08)",
  renderers: {}
};
var _extends$7 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$7 = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  __name(defineProperties, "defineProperties");
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck$7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck$7, "_classCallCheck$7");
function _possibleConstructorReturn$7(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
__name(_possibleConstructorReturn$7, "_possibleConstructorReturn$7");
function _inherits$7(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
__name(_inherits$7, "_inherits$7");
var Alpha = (function(_ref) {
  _inherits$7(Alpha2, _ref);
  function Alpha2() {
    var _ref2;
    var _temp, _this, _ret;
    _classCallCheck$7(this, Alpha2);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn$7(this, (_ref2 = Alpha2.__proto__ || Object.getPrototypeOf(Alpha2)).call.apply(_ref2, [this].concat(args))), _this), _this.handleChange = function(e) {
      var change = calculateChange$2(e, _this.props.hsl, _this.props.direction, _this.props.a, _this.container);
      change && typeof _this.props.onChange === "function" && _this.props.onChange(change, e);
    }, _this.handleMouseDown = function(e) {
      _this.handleChange(e);
      window.addEventListener("mousemove", _this.handleChange);
      window.addEventListener("mouseup", _this.handleMouseUp);
    }, _this.handleMouseUp = function() {
      _this.unbindEventListeners();
    }, _this.unbindEventListeners = function() {
      window.removeEventListener("mousemove", _this.handleChange);
      window.removeEventListener("mouseup", _this.handleMouseUp);
    }, _temp), _possibleConstructorReturn$7(_this, _ret);
  }
  __name(Alpha2, "Alpha");
  _createClass$7(Alpha2, [{
    key: "componentWillUnmount",
    value: /* @__PURE__ */ __name(function componentWillUnmount() {
      this.unbindEventListeners();
    }, "componentWillUnmount")
  }, {
    key: "render",
    value: /* @__PURE__ */ __name(function render3() {
      var _this2 = this;
      var rgb = this.props.rgb;
      var styles = reactCSS({
        "default": {
          alpha: {
            absolute: "0px 0px 0px 0px",
            borderRadius: this.props.radius
          },
          checkboard: {
            absolute: "0px 0px 0px 0px",
            overflow: "hidden",
            borderRadius: this.props.radius
          },
          gradient: {
            absolute: "0px 0px 0px 0px",
            background: "linear-gradient(to right, rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0) 0%,\n           rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 1) 100%)",
            boxShadow: this.props.shadow,
            borderRadius: this.props.radius
          },
          container: {
            position: "relative",
            height: "100%",
            margin: "0 3px"
          },
          pointer: {
            position: "absolute",
            left: rgb.a * 100 + "%"
          },
          slider: {
            width: "4px",
            borderRadius: "1px",
            height: "8px",
            boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
            background: "#fff",
            marginTop: "1px",
            transform: "translateX(-2px)"
          }
        },
        "vertical": {
          gradient: {
            background: "linear-gradient(to bottom, rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0) 0%,\n           rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 1) 100%)"
          },
          pointer: {
            left: 0,
            top: rgb.a * 100 + "%"
          }
        },
        "overwrite": _extends$7({}, this.props.style)
      }, {
        vertical: this.props.direction === "vertical",
        overwrite: true
      });
      return React.createElement(
        "div",
        { style: styles.alpha },
        React.createElement(
          "div",
          { style: styles.checkboard },
          React.createElement(Checkboard, { renderers: this.props.renderers })
        ),
        React.createElement("div", { style: styles.gradient }),
        React.createElement(
          "div",
          {
            style: styles.container,
            ref: /* @__PURE__ */ __name(function ref(container) {
              return _this2.container = container;
            }, "ref"),
            onMouseDown: this.handleMouseDown,
            onTouchMove: this.handleChange,
            onTouchStart: this.handleChange
          },
          React.createElement(
            "div",
            { style: styles.pointer },
            this.props.pointer ? React.createElement(this.props.pointer, this.props) : React.createElement("div", { style: styles.slider })
          )
        )
      );
    }, "render")
  }]);
  return Alpha2;
})(reactExports.PureComponent || reactExports.Component);
var _createClass$6 = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  __name(defineProperties, "defineProperties");
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
__name(_defineProperty, "_defineProperty");
function _classCallCheck$6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck$6, "_classCallCheck$6");
function _possibleConstructorReturn$6(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
__name(_possibleConstructorReturn$6, "_possibleConstructorReturn$6");
function _inherits$6(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
__name(_inherits$6, "_inherits$6");
var DEFAULT_ARROW_OFFSET = 1;
var UP_KEY_CODE = 38;
var DOWN_KEY_CODE = 40;
var VALID_KEY_CODES = [UP_KEY_CODE, DOWN_KEY_CODE];
var isValidKeyCode = /* @__PURE__ */ __name(function isValidKeyCode2(keyCode) {
  return VALID_KEY_CODES.indexOf(keyCode) > -1;
}, "isValidKeyCode");
var getNumberValue = /* @__PURE__ */ __name(function getNumberValue2(value) {
  return Number(String(value).replace(/%/g, ""));
}, "getNumberValue");
var idCounter = 1;
var EditableInput = (function(_ref) {
  _inherits$6(EditableInput2, _ref);
  function EditableInput2(props) {
    _classCallCheck$6(this, EditableInput2);
    var _this = _possibleConstructorReturn$6(this, (EditableInput2.__proto__ || Object.getPrototypeOf(EditableInput2)).call(this));
    _this.handleBlur = function() {
      if (_this.state.blurValue) {
        _this.setState({ value: _this.state.blurValue, blurValue: null });
      }
    };
    _this.handleChange = function(e) {
      _this.setUpdatedValue(e.target.value, e);
    };
    _this.handleKeyDown = function(e) {
      var value = getNumberValue(e.target.value);
      if (!isNaN(value) && isValidKeyCode(e.keyCode)) {
        var offset = _this.getArrowOffset();
        var updatedValue = e.keyCode === UP_KEY_CODE ? value + offset : value - offset;
        _this.setUpdatedValue(updatedValue, e);
      }
    };
    _this.handleDrag = function(e) {
      if (_this.props.dragLabel) {
        var newValue = Math.round(_this.props.value + e.movementX);
        if (newValue >= 0 && newValue <= _this.props.dragMax) {
          _this.props.onChange && _this.props.onChange(_this.getValueObjectWithLabel(newValue), e);
        }
      }
    };
    _this.handleMouseDown = function(e) {
      if (_this.props.dragLabel) {
        e.preventDefault();
        _this.handleDrag(e);
        window.addEventListener("mousemove", _this.handleDrag);
        window.addEventListener("mouseup", _this.handleMouseUp);
      }
    };
    _this.handleMouseUp = function() {
      _this.unbindEventListeners();
    };
    _this.unbindEventListeners = function() {
      window.removeEventListener("mousemove", _this.handleDrag);
      window.removeEventListener("mouseup", _this.handleMouseUp);
    };
    _this.state = {
      value: String(props.value).toUpperCase(),
      blurValue: String(props.value).toUpperCase()
    };
    _this.inputId = "rc-editable-input-" + idCounter++;
    return _this;
  }
  __name(EditableInput2, "EditableInput");
  _createClass$6(EditableInput2, [{
    key: "componentDidUpdate",
    value: /* @__PURE__ */ __name(function componentDidUpdate(prevProps, prevState) {
      if (this.props.value !== this.state.value && (prevProps.value !== this.props.value || prevState.value !== this.state.value)) {
        if (this.input === document.activeElement) {
          this.setState({ blurValue: String(this.props.value).toUpperCase() });
        } else {
          this.setState({ value: String(this.props.value).toUpperCase(), blurValue: !this.state.blurValue && String(this.props.value).toUpperCase() });
        }
      }
    }, "componentDidUpdate")
  }, {
    key: "componentWillUnmount",
    value: /* @__PURE__ */ __name(function componentWillUnmount() {
      this.unbindEventListeners();
    }, "componentWillUnmount")
  }, {
    key: "getValueObjectWithLabel",
    value: /* @__PURE__ */ __name(function getValueObjectWithLabel(value) {
      return _defineProperty({}, this.props.label, value);
    }, "getValueObjectWithLabel")
  }, {
    key: "getArrowOffset",
    value: /* @__PURE__ */ __name(function getArrowOffset() {
      return this.props.arrowOffset || DEFAULT_ARROW_OFFSET;
    }, "getArrowOffset")
  }, {
    key: "setUpdatedValue",
    value: /* @__PURE__ */ __name(function setUpdatedValue(value, e) {
      var onChangeValue = this.props.label ? this.getValueObjectWithLabel(value) : value;
      this.props.onChange && this.props.onChange(onChangeValue, e);
      this.setState({ value });
    }, "setUpdatedValue")
  }, {
    key: "render",
    value: /* @__PURE__ */ __name(function render3() {
      var _this2 = this;
      var styles = reactCSS({
        "default": {
          wrap: {
            position: "relative"
          }
        },
        "user-override": {
          wrap: this.props.style && this.props.style.wrap ? this.props.style.wrap : {},
          input: this.props.style && this.props.style.input ? this.props.style.input : {},
          label: this.props.style && this.props.style.label ? this.props.style.label : {}
        },
        "dragLabel-true": {
          label: {
            cursor: "ew-resize"
          }
        }
      }, {
        "user-override": true
      }, this.props);
      return React.createElement(
        "div",
        { style: styles.wrap },
        React.createElement("input", {
          id: this.inputId,
          style: styles.input,
          ref: /* @__PURE__ */ __name(function ref(input) {
            return _this2.input = input;
          }, "ref"),
          value: this.state.value,
          onKeyDown: this.handleKeyDown,
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          placeholder: this.props.placeholder,
          spellCheck: "false"
        }),
        this.props.label && !this.props.hideLabel ? React.createElement(
          "label",
          {
            htmlFor: this.inputId,
            style: styles.label,
            onMouseDown: this.handleMouseDown
          },
          this.props.label
        ) : null
      );
    }, "render")
  }]);
  return EditableInput2;
})(reactExports.PureComponent || reactExports.Component);
var calculateChange$1 = /* @__PURE__ */ __name(function calculateChange2(e, direction, hsl, container) {
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;
  var x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
  var y2 = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;
  var left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y2 - (container.getBoundingClientRect().top + window.pageYOffset);
  if (direction === "vertical") {
    var h = void 0;
    if (top < 0) {
      h = 359;
    } else if (top > containerHeight) {
      h = 0;
    } else {
      var percent = -(top * 100 / containerHeight) + 100;
      h = 360 * percent / 100;
    }
    if (hsl.h !== h) {
      return {
        h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: "hsl"
      };
    }
  } else {
    var _h = void 0;
    if (left < 0) {
      _h = 0;
    } else if (left > containerWidth) {
      _h = 359;
    } else {
      var _percent = left * 100 / containerWidth;
      _h = 360 * _percent / 100;
    }
    if (hsl.h !== _h) {
      return {
        h: _h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: "hsl"
      };
    }
  }
  return null;
}, "calculateChange");
var _createClass$5 = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  __name(defineProperties, "defineProperties");
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck$5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck$5, "_classCallCheck$5");
function _possibleConstructorReturn$5(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
__name(_possibleConstructorReturn$5, "_possibleConstructorReturn$5");
function _inherits$5(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
__name(_inherits$5, "_inherits$5");
var Hue = (function(_ref) {
  _inherits$5(Hue2, _ref);
  function Hue2() {
    var _ref2;
    var _temp, _this, _ret;
    _classCallCheck$5(this, Hue2);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn$5(this, (_ref2 = Hue2.__proto__ || Object.getPrototypeOf(Hue2)).call.apply(_ref2, [this].concat(args))), _this), _this.handleChange = function(e) {
      var change = calculateChange$1(e, _this.props.direction, _this.props.hsl, _this.container);
      change && typeof _this.props.onChange === "function" && _this.props.onChange(change, e);
    }, _this.handleMouseDown = function(e) {
      _this.handleChange(e);
      window.addEventListener("mousemove", _this.handleChange);
      window.addEventListener("mouseup", _this.handleMouseUp);
    }, _this.handleMouseUp = function() {
      _this.unbindEventListeners();
    }, _temp), _possibleConstructorReturn$5(_this, _ret);
  }
  __name(Hue2, "Hue");
  _createClass$5(Hue2, [{
    key: "componentWillUnmount",
    value: /* @__PURE__ */ __name(function componentWillUnmount() {
      this.unbindEventListeners();
    }, "componentWillUnmount")
  }, {
    key: "unbindEventListeners",
    value: /* @__PURE__ */ __name(function unbindEventListeners() {
      window.removeEventListener("mousemove", this.handleChange);
      window.removeEventListener("mouseup", this.handleMouseUp);
    }, "unbindEventListeners")
  }, {
    key: "render",
    value: /* @__PURE__ */ __name(function render3() {
      var _this2 = this;
      var _props$direction = this.props.direction, direction = _props$direction === void 0 ? "horizontal" : _props$direction;
      var styles = reactCSS({
        "default": {
          hue: {
            absolute: "0px 0px 0px 0px",
            borderRadius: this.props.radius,
            boxShadow: this.props.shadow
          },
          container: {
            padding: "0 2px",
            position: "relative",
            height: "100%",
            borderRadius: this.props.radius
          },
          pointer: {
            position: "absolute",
            left: this.props.hsl.h * 100 / 360 + "%"
          },
          slider: {
            marginTop: "1px",
            width: "4px",
            borderRadius: "1px",
            height: "8px",
            boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
            background: "#fff",
            transform: "translateX(-2px)"
          }
        },
        "vertical": {
          pointer: {
            left: "0px",
            top: -(this.props.hsl.h * 100 / 360) + 100 + "%"
          }
        }
      }, { vertical: direction === "vertical" });
      return React.createElement(
        "div",
        { style: styles.hue },
        React.createElement(
          "div",
          {
            className: "hue-" + direction,
            style: styles.container,
            ref: /* @__PURE__ */ __name(function ref(container) {
              return _this2.container = container;
            }, "ref"),
            onMouseDown: this.handleMouseDown,
            onTouchMove: this.handleChange,
            onTouchStart: this.handleChange
          },
          React.createElement(
            "style",
            null,
            "\n            .hue-horizontal {\n              background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0\n                33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n              background: -webkit-linear-gradient(to right, #f00 0%, #ff0\n                17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n            }\n\n            .hue-vertical {\n              background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%,\n                #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n              background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%,\n                #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%);\n            }\n          "
          ),
          React.createElement(
            "div",
            { style: styles.pointer },
            this.props.pointer ? React.createElement(this.props.pointer, this.props) : React.createElement("div", { style: styles.slider })
          )
        )
      );
    }, "render")
  }]);
  return Hue2;
})(reactExports.PureComponent || reactExports.Component);
var propTypes = { exports: {} };
var ReactPropTypesSecret_1;
var hasRequiredReactPropTypesSecret;
function requireReactPropTypesSecret() {
  if (hasRequiredReactPropTypesSecret) return ReactPropTypesSecret_1;
  hasRequiredReactPropTypesSecret = 1;
  var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  ReactPropTypesSecret_1 = ReactPropTypesSecret;
  return ReactPropTypesSecret_1;
}
__name(requireReactPropTypesSecret, "requireReactPropTypesSecret");
var factoryWithThrowingShims;
var hasRequiredFactoryWithThrowingShims;
function requireFactoryWithThrowingShims() {
  if (hasRequiredFactoryWithThrowingShims) return factoryWithThrowingShims;
  hasRequiredFactoryWithThrowingShims = 1;
  var ReactPropTypesSecret = /* @__PURE__ */ requireReactPropTypesSecret();
  function emptyFunction() {
  }
  __name(emptyFunction, "emptyFunction");
  function emptyFunctionWithReset() {
  }
  __name(emptyFunctionWithReset, "emptyFunctionWithReset");
  emptyFunctionWithReset.resetWarningCache = emptyFunction;
  factoryWithThrowingShims = /* @__PURE__ */ __name(function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
      if (secret === ReactPropTypesSecret) {
        return;
      }
      var err = new Error(
        "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
      );
      err.name = "Invariant Violation";
      throw err;
    }
    __name(shim, "shim");
    shim.isRequired = shim;
    function getShim() {
      return shim;
    }
    __name(getShim, "getShim");
    var ReactPropTypes = {
      array: shim,
      bigint: shim,
      bool: shim,
      func: shim,
      number: shim,
      object: shim,
      string: shim,
      symbol: shim,
      any: shim,
      arrayOf: getShim,
      element: shim,
      elementType: shim,
      instanceOf: getShim,
      node: shim,
      objectOf: getShim,
      oneOf: getShim,
      oneOfType: getShim,
      shape: getShim,
      exact: getShim,
      checkPropTypes: emptyFunctionWithReset,
      resetWarningCache: emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
  }, "factoryWithThrowingShims");
  return factoryWithThrowingShims;
}
__name(requireFactoryWithThrowingShims, "requireFactoryWithThrowingShims");
var hasRequiredPropTypes;
function requirePropTypes() {
  if (hasRequiredPropTypes) return propTypes.exports;
  hasRequiredPropTypes = 1;
  {
    propTypes.exports = /* @__PURE__ */ requireFactoryWithThrowingShims()();
  }
  return propTypes.exports;
}
__name(requirePropTypes, "requirePropTypes");
var propTypesExports = /* @__PURE__ */ requirePropTypes();
const PropTypes = /* @__PURE__ */ getDefaultExportFromCjs(propTypesExports);
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
__name(listCacheClear, "listCacheClear");
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
__name(eq, "eq");
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
__name(assocIndexOf, "assocIndexOf");
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
__name(listCacheDelete, "listCacheDelete");
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
__name(listCacheGet, "listCacheGet");
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
__name(listCacheHas, "listCacheHas");
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
__name(listCacheSet, "listCacheSet");
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
__name(ListCache, "ListCache");
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
__name(stackClear, "stackClear");
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
__name(stackDelete, "stackDelete");
function stackGet(key) {
  return this.__data__.get(key);
}
__name(stackGet, "stackGet");
function stackHas(key) {
  return this.__data__.has(key);
}
__name(stackHas, "stackHas");
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$e = Object.prototype;
var hasOwnProperty$b = objectProto$e.hasOwnProperty;
var nativeObjectToString$1 = objectProto$e.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
__name(getRawTag, "getRawTag");
var objectProto$d = Object.prototype;
var nativeObjectToString = objectProto$d.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
__name(objectToString, "objectToString");
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
__name(baseGetTag, "baseGetTag");
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
__name(isObject, "isObject");
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
__name(isFunction, "isFunction");
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
})();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
__name(isMasked, "isMasked");
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
__name(toSource, "toSource");
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$c = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString$1.call(hasOwnProperty$a).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
__name(baseIsNative, "baseIsNative");
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
__name(getValue, "getValue");
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
__name(getNative, "getNative");
var Map$1 = getNative(root, "Map");
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
__name(hashClear, "hashClear");
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
__name(hashDelete, "hashDelete");
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$9.call(data, key) ? data[key] : void 0;
}
__name(hashGet, "hashGet");
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty$8.call(data, key);
}
__name(hashHas, "hashHas");
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
__name(hashSet, "hashSet");
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
__name(Hash, "Hash");
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
__name(mapCacheClear, "mapCacheClear");
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
__name(isKeyable, "isKeyable");
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
__name(getMapData, "getMapData");
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
__name(mapCacheDelete, "mapCacheDelete");
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
__name(mapCacheGet, "mapCacheGet");
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
__name(mapCacheHas, "mapCacheHas");
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
__name(mapCacheSet, "mapCacheSet");
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
__name(MapCache, "MapCache");
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
__name(stackSet, "stackSet");
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
__name(Stack, "Stack");
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var defineProperty = (function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
})();
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
__name(baseAssignValue, "baseAssignValue");
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
__name(assignMergeValue, "assignMergeValue");
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
__name(createBaseFor, "createBaseFor");
var baseFor = createBaseFor();
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root.Buffer : void 0;
Buffer$1 ? Buffer$1.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  {
    return buffer.slice();
  }
}
__name(cloneBuffer, "cloneBuffer");
var Uint8Array2 = root.Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array2(result).set(new Uint8Array2(arrayBuffer));
  return result;
}
__name(cloneArrayBuffer, "cloneArrayBuffer");
function cloneTypedArray(typedArray, isDeep) {
  var buffer = cloneArrayBuffer(typedArray.buffer);
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
__name(cloneTypedArray, "cloneTypedArray");
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
__name(copyArray, "copyArray");
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ (function() {
  function object() {
  }
  __name(object, "object");
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
})();
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
__name(overArg, "overArg");
var getPrototype = overArg(Object.getPrototypeOf, Object);
var objectProto$9 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$9;
  return value === proto;
}
__name(isPrototype, "isPrototype");
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}
__name(initCloneObject, "initCloneObject");
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
__name(isObjectLike, "isObjectLike");
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
__name(baseIsArguments, "baseIsArguments");
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
  return arguments;
})()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$7.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArray = Array.isArray;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
__name(isLength, "isLength");
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
__name(isArrayLike, "isArrayLike");
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
__name(isArrayLikeObject, "isArrayLikeObject");
function stubFalse() {
  return false;
}
__name(stubFalse, "stubFalse");
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer2 = moduleExports$1 ? root.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var objectTag$3 = "[object Object]";
var funcProto = Function.prototype, objectProto$7 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$6.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
__name(isPlainObject, "isPlainObject");
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
__name(baseIsTypedArray, "baseIsTypedArray");
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
__name(baseUnary, "baseUnary");
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal.process;
var nodeUtil = (function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
})();
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
__name(safeGet, "safeGet");
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
__name(assignValue, "assignValue");
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
__name(copyObject, "copyObject");
function baseTimes(n, iteratee) {
  var index = -1, result = Array(n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
__name(baseTimes, "baseTimes");
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
__name(isIndex, "isIndex");
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
__name(arrayLikeKeys, "arrayLikeKeys");
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
__name(nativeKeysIn, "nativeKeysIn");
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
__name(baseKeysIn, "baseKeysIn");
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
__name(keysIn, "keysIn");
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
__name(toPlainObject, "toPlainObject");
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
__name(baseMergeDeep, "baseMergeDeep");
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
__name(baseMerge, "baseMerge");
function identity(value) {
  return value;
}
__name(identity, "identity");
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
__name(apply, "apply");
var nativeMax$1 = Math.max;
function overRest(func, start, transform) {
  start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax$1(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
__name(overRest, "overRest");
function constant(value) {
  return function() {
    return value;
  };
}
__name(constant, "constant");
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
__name(shortOut, "shortOut");
var setToString = shortOut(baseSetToString);
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}
__name(baseRest, "baseRest");
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
__name(isIterateeCall, "isIterateeCall");
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
__name(createAssigner, "createAssigner");
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var Raised = /* @__PURE__ */ __name(function Raised2(_ref) {
  var zDepth = _ref.zDepth, radius = _ref.radius, background = _ref.background, children = _ref.children, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles;
  var styles = reactCSS(merge({
    "default": {
      wrap: {
        position: "relative",
        display: "inline-block"
      },
      content: {
        position: "relative"
      },
      bg: {
        absolute: "0px 0px 0px 0px",
        boxShadow: "0 " + zDepth + "px " + zDepth * 4 + "px rgba(0,0,0,.24)",
        borderRadius: radius,
        background
      }
    },
    "zDepth-0": {
      bg: {
        boxShadow: "none"
      }
    },
    "zDepth-1": {
      bg: {
        boxShadow: "0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)"
      }
    },
    "zDepth-2": {
      bg: {
        boxShadow: "0 6px 20px rgba(0,0,0,.19), 0 8px 17px rgba(0,0,0,.2)"
      }
    },
    "zDepth-3": {
      bg: {
        boxShadow: "0 17px 50px rgba(0,0,0,.19), 0 12px 15px rgba(0,0,0,.24)"
      }
    },
    "zDepth-4": {
      bg: {
        boxShadow: "0 25px 55px rgba(0,0,0,.21), 0 16px 28px rgba(0,0,0,.22)"
      }
    },
    "zDepth-5": {
      bg: {
        boxShadow: "0 40px 77px rgba(0,0,0,.22), 0 27px 24px rgba(0,0,0,.2)"
      }
    },
    "square": {
      bg: {
        borderRadius: "0"
      }
    },
    "circle": {
      bg: {
        borderRadius: "50%"
      }
    }
  }, passedStyles), { "zDepth-1": zDepth === 1 });
  return React.createElement(
    "div",
    { style: styles.wrap },
    React.createElement("div", { style: styles.bg }),
    React.createElement(
      "div",
      { style: styles.content },
      children
    )
  );
}, "Raised");
Raised.propTypes = {
  background: PropTypes.string,
  zDepth: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  radius: PropTypes.number,
  styles: PropTypes.object
};
Raised.defaultProps = {
  background: "#fff",
  zDepth: 1,
  radius: 2,
  styles: {}
};
var now = /* @__PURE__ */ __name(function() {
  return root.Date.now();
}, "now");
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
__name(trimmedEndIndex, "trimmedEndIndex");
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
__name(baseTrim, "baseTrim");
var symbolTag$1 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
}
__name(isSymbol, "isSymbol");
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
__name(toNumber, "toNumber");
var FUNC_ERROR_TEXT$2 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  __name(invokeFunc, "invokeFunc");
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  __name(leadingEdge, "leadingEdge");
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  __name(remainingWait, "remainingWait");
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  __name(shouldInvoke, "shouldInvoke");
  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  __name(timerExpired, "timerExpired");
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  __name(trailingEdge, "trailingEdge");
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  __name(cancel, "cancel");
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now());
  }
  __name(flush, "flush");
  function debounced() {
    var time = now(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  __name(debounced, "debounced");
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
__name(debounce, "debounce");
var FUNC_ERROR_TEXT$1 = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
__name(throttle, "throttle");
var calculateChange3 = /* @__PURE__ */ __name(function calculateChange4(e, hsl, container) {
  var _container$getBoundin = container.getBoundingClientRect(), containerWidth = _container$getBoundin.width, containerHeight = _container$getBoundin.height;
  var x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
  var y2 = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;
  var left = x - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y2 - (container.getBoundingClientRect().top + window.pageYOffset);
  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  }
  if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }
  var saturation = left / containerWidth;
  var bright = 1 - top / containerHeight;
  return {
    h: hsl.h,
    s: saturation,
    v: bright,
    a: hsl.a,
    source: "hsv"
  };
}, "calculateChange");
var _createClass$4 = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  __name(defineProperties, "defineProperties");
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck$4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck$4, "_classCallCheck$4");
function _possibleConstructorReturn$4(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
__name(_possibleConstructorReturn$4, "_possibleConstructorReturn$4");
function _inherits$4(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
__name(_inherits$4, "_inherits$4");
var Saturation = (function(_ref) {
  _inherits$4(Saturation2, _ref);
  function Saturation2(props) {
    _classCallCheck$4(this, Saturation2);
    var _this = _possibleConstructorReturn$4(this, (Saturation2.__proto__ || Object.getPrototypeOf(Saturation2)).call(this, props));
    _this.handleChange = function(e) {
      typeof _this.props.onChange === "function" && _this.throttle(_this.props.onChange, calculateChange3(e, _this.props.hsl, _this.container), e);
    };
    _this.handleMouseDown = function(e) {
      _this.handleChange(e);
      var renderWindow = _this.getContainerRenderWindow();
      renderWindow.addEventListener("mousemove", _this.handleChange);
      renderWindow.addEventListener("mouseup", _this.handleMouseUp);
    };
    _this.handleMouseUp = function() {
      _this.unbindEventListeners();
    };
    _this.throttle = throttle(function(fn, data, e) {
      fn(data, e);
    }, 50);
    return _this;
  }
  __name(Saturation2, "Saturation");
  _createClass$4(Saturation2, [{
    key: "componentWillUnmount",
    value: /* @__PURE__ */ __name(function componentWillUnmount() {
      this.throttle.cancel();
      this.unbindEventListeners();
    }, "componentWillUnmount")
  }, {
    key: "getContainerRenderWindow",
    value: /* @__PURE__ */ __name(function getContainerRenderWindow() {
      var container = this.container;
      var renderWindow = window;
      while (!renderWindow.document.contains(container) && renderWindow.parent !== renderWindow) {
        renderWindow = renderWindow.parent;
      }
      return renderWindow;
    }, "getContainerRenderWindow")
  }, {
    key: "unbindEventListeners",
    value: /* @__PURE__ */ __name(function unbindEventListeners() {
      var renderWindow = this.getContainerRenderWindow();
      renderWindow.removeEventListener("mousemove", this.handleChange);
      renderWindow.removeEventListener("mouseup", this.handleMouseUp);
    }, "unbindEventListeners")
  }, {
    key: "render",
    value: /* @__PURE__ */ __name(function render3() {
      var _this2 = this;
      var _ref2 = this.props.style || {}, color = _ref2.color, white = _ref2.white, black = _ref2.black, pointer = _ref2.pointer, circle = _ref2.circle;
      var styles = reactCSS({
        "default": {
          color: {
            absolute: "0px 0px 0px 0px",
            background: "hsl(" + this.props.hsl.h + ",100%, 50%)",
            borderRadius: this.props.radius
          },
          white: {
            absolute: "0px 0px 0px 0px",
            borderRadius: this.props.radius
          },
          black: {
            absolute: "0px 0px 0px 0px",
            boxShadow: this.props.shadow,
            borderRadius: this.props.radius
          },
          pointer: {
            position: "absolute",
            top: -(this.props.hsv.v * 100) + 100 + "%",
            left: this.props.hsv.s * 100 + "%",
            cursor: "default"
          },
          circle: {
            width: "4px",
            height: "4px",
            boxShadow: "0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),\n            0 0 1px 2px rgba(0,0,0,.4)",
            borderRadius: "50%",
            cursor: "hand",
            transform: "translate(-2px, -2px)"
          }
        },
        "custom": {
          color,
          white,
          black,
          pointer,
          circle
        }
      }, { "custom": !!this.props.style });
      return React.createElement(
        "div",
        {
          style: styles.color,
          ref: /* @__PURE__ */ __name(function ref(container) {
            return _this2.container = container;
          }, "ref"),
          onMouseDown: this.handleMouseDown,
          onTouchMove: this.handleChange,
          onTouchStart: this.handleChange
        },
        React.createElement(
          "style",
          null,
          "\n          .saturation-white {\n            background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0));\n            background: linear-gradient(to right, #fff, rgba(255,255,255,0));\n          }\n          .saturation-black {\n            background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0));\n            background: linear-gradient(to top, #000, rgba(0,0,0,0));\n          }\n        "
        ),
        React.createElement(
          "div",
          { style: styles.white, className: "saturation-white" },
          React.createElement("div", { style: styles.black, className: "saturation-black" }),
          React.createElement(
            "div",
            { style: styles.pointer },
            this.props.pointer ? React.createElement(this.props.pointer, this.props) : React.createElement("div", { style: styles.circle })
          )
        )
      );
    }, "render")
  }]);
  return Saturation2;
})(reactExports.PureComponent || reactExports.Component);
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
__name(arrayEach, "arrayEach");
var nativeKeys = overArg(Object.keys, Object);
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
__name(baseKeys, "baseKeys");
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
__name(keys, "keys");
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}
__name(baseForOwn, "baseForOwn");
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = -1, iterable = Object(collection);
    while (++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
__name(createBaseEach, "createBaseEach");
var baseEach = createBaseEach(baseForOwn);
function castFunction(value) {
  return typeof value == "function" ? value : identity;
}
__name(castFunction, "castFunction");
function forEach(collection, iteratee) {
  var func = isArray(collection) ? arrayEach : baseEach;
  return func(collection, castFunction(iteratee));
}
__name(forEach, "forEach");
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
__name(_typeof, "_typeof");
var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : "";
  opts = opts || {};
  if (color instanceof tinycolor) {
    return color;
  }
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
__name(tinycolor, "tinycolor");
tinycolor.prototype = {
  isDark: /* @__PURE__ */ __name(function isDark() {
    return this.getBrightness() < 128;
  }, "isDark"),
  isLight: /* @__PURE__ */ __name(function isLight() {
    return !this.isDark();
  }, "isLight"),
  isValid: /* @__PURE__ */ __name(function isValid() {
    return this._ok;
  }, "isValid"),
  getOriginalInput: /* @__PURE__ */ __name(function getOriginalInput() {
    return this._originalInput;
  }, "getOriginalInput"),
  getFormat: /* @__PURE__ */ __name(function getFormat() {
    return this._format;
  }, "getFormat"),
  getAlpha: /* @__PURE__ */ __name(function getAlpha() {
    return this._a;
  }, "getAlpha"),
  getBrightness: /* @__PURE__ */ __name(function getBrightness() {
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
  }, "getBrightness"),
  getLuminance: /* @__PURE__ */ __name(function getLuminance() {
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;
    else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;
    else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;
    else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }, "getLuminance"),
  setAlpha: /* @__PURE__ */ __name(function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  }, "setAlpha"),
  toHsv: /* @__PURE__ */ __name(function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a
    };
  }, "toHsv"),
  toHsvString: /* @__PURE__ */ __name(function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h = Math.round(hsv.h * 360), s = Math.round(hsv.s * 100), v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  }, "toHsvString"),
  toHsl: /* @__PURE__ */ __name(function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a
    };
  }, "toHsl"),
  toHslString: /* @__PURE__ */ __name(function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h = Math.round(hsl.h * 360), s = Math.round(hsl.s * 100), l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  }, "toHslString"),
  toHex: /* @__PURE__ */ __name(function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  }, "toHex"),
  toHexString: /* @__PURE__ */ __name(function toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  }, "toHexString"),
  toHex8: /* @__PURE__ */ __name(function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  }, "toHex8"),
  toHex8String: /* @__PURE__ */ __name(function toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  }, "toHex8String"),
  toRgb: /* @__PURE__ */ __name(function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  }, "toRgb"),
  toRgbString: /* @__PURE__ */ __name(function toRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  }, "toRgbString"),
  toPercentageRgb: /* @__PURE__ */ __name(function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  }, "toPercentageRgb"),
  toPercentageRgbString: /* @__PURE__ */ __name(function toPercentageRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  }, "toPercentageRgbString"),
  toName: /* @__PURE__ */ __name(function toName() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  }, "toName"),
  toFilter: /* @__PURE__ */ __name(function toFilter(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  }, "toFilter"),
  toString: /* @__PURE__ */ __name(function toString(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  }, "toString"),
  clone: /* @__PURE__ */ __name(function clone() {
    return tinycolor(this.toString());
  }, "clone"),
  _applyModification: /* @__PURE__ */ __name(function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  }, "_applyModification"),
  lighten: /* @__PURE__ */ __name(function lighten() {
    return this._applyModification(_lighten, arguments);
  }, "lighten"),
  brighten: /* @__PURE__ */ __name(function brighten() {
    return this._applyModification(_brighten, arguments);
  }, "brighten"),
  darken: /* @__PURE__ */ __name(function darken() {
    return this._applyModification(_darken, arguments);
  }, "darken"),
  desaturate: /* @__PURE__ */ __name(function desaturate() {
    return this._applyModification(_desaturate, arguments);
  }, "desaturate"),
  saturate: /* @__PURE__ */ __name(function saturate() {
    return this._applyModification(_saturate, arguments);
  }, "saturate"),
  greyscale: /* @__PURE__ */ __name(function greyscale() {
    return this._applyModification(_greyscale, arguments);
  }, "greyscale"),
  spin: /* @__PURE__ */ __name(function spin() {
    return this._applyModification(_spin, arguments);
  }, "spin"),
  _applyCombination: /* @__PURE__ */ __name(function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  }, "_applyCombination"),
  analogous: /* @__PURE__ */ __name(function analogous() {
    return this._applyCombination(_analogous, arguments);
  }, "analogous"),
  complement: /* @__PURE__ */ __name(function complement() {
    return this._applyCombination(_complement, arguments);
  }, "complement"),
  monochromatic: /* @__PURE__ */ __name(function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  }, "monochromatic"),
  splitcomplement: /* @__PURE__ */ __name(function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  }, "splitcomplement"),
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: /* @__PURE__ */ __name(function triad() {
    return this._applyCombination(polyad, [3]);
  }, "triad"),
  tetrad: /* @__PURE__ */ __name(function tetrad() {
    return this._applyCombination(polyad, [4]);
  }, "tetrad")
};
tinycolor.fromRatio = function(color, opts) {
  if (_typeof(color) == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
__name(inputToRGB, "inputToRGB");
function rgbToRgb(r2, g, b) {
  return {
    r: bound01(r2, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
__name(rgbToRgb, "rgbToRgb");
function rgbToHsl(r2, g, b) {
  r2 = bound01(r2, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r2, g, b), min = Math.min(r2, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r2:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r2) / d + 2;
        break;
      case b:
        h = (r2 - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h,
    s,
    l
  };
}
__name(rgbToHsl, "rgbToHsl");
function hslToRgb(h, s, l) {
  var r2, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p2, q2, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
    if (t < 1 / 2) return q2;
    if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
    return p2;
  }
  __name(hue2rgb, "hue2rgb");
  if (s === 0) {
    r2 = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r2 = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: r2 * 255,
    g: g * 255,
    b: b * 255
  };
}
__name(hslToRgb, "hslToRgb");
function rgbToHsv(r2, g, b) {
  r2 = bound01(r2, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r2, g, b), min = Math.min(r2, g, b);
  var h, s, v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r2:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r2) / d + 2;
        break;
      case b:
        h = (r2 - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h,
    s,
    v
  };
}
__name(rgbToHsv, "rgbToHsv");
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r2 = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
  return {
    r: r2 * 255,
    g: g * 255,
    b: b * 255
  };
}
__name(hsvToRgb, "hsvToRgb");
function rgbToHex(r2, g, b, allow3Char) {
  var hex = [pad2(Math.round(r2).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
__name(rgbToHex, "rgbToHex");
function rgbaToHex(r2, g, b, a, allow4Char) {
  var hex = [pad2(Math.round(r2).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
__name(rgbaToHex, "rgbaToHex");
function rgbaToArgbHex(r2, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r2).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join("");
}
__name(rgbaToArgbHex, "rgbaToArgbHex");
tinycolor.equals = function(color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function() {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
__name(_desaturate, "_desaturate");
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
__name(_saturate, "_saturate");
function _greyscale(color) {
  return tinycolor(color).desaturate(100);
}
__name(_greyscale, "_greyscale");
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
__name(_lighten, "_lighten");
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
__name(_brighten, "_brighten");
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
__name(_darken, "_darken");
function _spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}
__name(_spin, "_spin");
function _complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
__name(_complement, "_complement");
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor({
      h: (hsl.h + i * step) % 360,
      s: hsl.s,
      l: hsl.l
    }));
  }
  return result;
}
__name(polyad, "polyad");
function _splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h = hsl.h;
  return [tinycolor(color), tinycolor({
    h: (h + 72) % 360,
    s: hsl.s,
    l: hsl.l
  }), tinycolor({
    h: (h + 216) % 360,
    s: hsl.s,
    l: hsl.l
  })];
}
__name(_splitcomplement, "_splitcomplement");
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
__name(_analogous, "_analogous");
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h = hsv.h, s = hsv.s, v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor({
      h,
      s,
      v
    }));
    v = (v + modification) % 1;
  }
  return ret;
}
__name(_monochromatic, "_monochromatic");
tinycolor.mix = function(color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor(rgba);
};
tinycolor.readability = function(color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};
tinycolor.isReadable = function(color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};
tinycolor.mostReadable = function(baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (tinycolor.isReadable(baseColor, bestColor, {
    level,
    size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};
var names = tinycolor.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
var hexNames = tinycolor.hexNames = flip(names);
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}
__name(flip, "flip");
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
__name(boundAlpha, "boundAlpha");
function bound01(n, max) {
  if (isOnePointZero(n)) n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  return n % max / parseFloat(max);
}
__name(bound01, "bound01");
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
__name(clamp01, "clamp01");
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
__name(parseIntFromHex, "parseIntFromHex");
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}
__name(isOnePointZero, "isOnePointZero");
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}
__name(isPercentage, "isPercentage");
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}
__name(pad2, "pad2");
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}
__name(convertToPercentage, "convertToPercentage");
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
__name(convertDecimalToHex, "convertDecimalToHex");
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
__name(convertHexToDecimal, "convertHexToDecimal");
var matchers = (function() {
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
})();
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}
__name(isValidCSSUnit, "isValidCSSUnit");
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  }
  var match;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsv.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }
  if (match = matchers.hsva.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
__name(stringInputToObject, "stringInputToObject");
function validateWCAG2Parms(parms) {
  var level, size;
  parms = parms || {
    level: "AA",
    size: "small"
  };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return {
    level,
    size
  };
}
__name(validateWCAG2Parms, "validateWCAG2Parms");
var simpleCheckForValidColor = /* @__PURE__ */ __name(function simpleCheckForValidColor2(data) {
  var keysToCheck = ["r", "g", "b", "a", "h", "s", "l", "v"];
  var checked = 0;
  var passed = 0;
  forEach(keysToCheck, function(letter) {
    if (data[letter]) {
      checked += 1;
      if (!isNaN(data[letter])) {
        passed += 1;
      }
      if (letter === "s" || letter === "l") {
        var percentPatt = /^\d+%$/;
        if (percentPatt.test(data[letter])) {
          passed += 1;
        }
      }
    }
  });
  return checked === passed ? data : false;
}, "simpleCheckForValidColor");
var toState = /* @__PURE__ */ __name(function toState2(data, oldHue) {
  var color = data.hex ? tinycolor(data.hex) : tinycolor(data);
  var hsl = color.toHsl();
  var hsv = color.toHsv();
  var rgb = color.toRgb();
  var hex = color.toHex();
  if (hsl.s === 0) {
    hsl.h = oldHue || 0;
    hsv.h = oldHue || 0;
  }
  var transparent = hex === "000000" && rgb.a === 0;
  return {
    hsl,
    hex: transparent ? "transparent" : "#" + hex,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source
  };
}, "toState");
var isValidHex = /* @__PURE__ */ __name(function isValidHex2(hex) {
  if (hex === "transparent") {
    return true;
  }
  var lh = String(hex).charAt(0) === "#" ? 1 : 0;
  return hex.length !== 4 + lh && hex.length < 7 + lh && tinycolor(hex).isValid();
}, "isValidHex");
var getContrastingColor = /* @__PURE__ */ __name(function getContrastingColor2(data) {
  if (!data) {
    return "#fff";
  }
  var col = toState(data);
  if (col.hex === "transparent") {
    return "rgba(0,0,0,0.4)";
  }
  var yiq = (col.rgb.r * 299 + col.rgb.g * 587 + col.rgb.b * 114) / 1e3;
  return yiq >= 128 ? "#000" : "#fff";
}, "getContrastingColor");
var isvalidColorString = /* @__PURE__ */ __name(function isvalidColorString2(string, type) {
  var stringWithoutDegree = string.replace("°", "");
  return tinycolor(type + " (" + stringWithoutDegree + ")")._ok;
}, "isvalidColorString");
var _extends$6 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$3 = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  __name(defineProperties, "defineProperties");
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck$3, "_classCallCheck$3");
function _possibleConstructorReturn$3(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
__name(_possibleConstructorReturn$3, "_possibleConstructorReturn$3");
function _inherits$3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
__name(_inherits$3, "_inherits$3");
var ColorWrap = /* @__PURE__ */ __name(function ColorWrap2(Picker) {
  var ColorPicker = (function(_ref) {
    _inherits$3(ColorPicker2, _ref);
    function ColorPicker2(props) {
      _classCallCheck$3(this, ColorPicker2);
      var _this = _possibleConstructorReturn$3(this, (ColorPicker2.__proto__ || Object.getPrototypeOf(ColorPicker2)).call(this));
      _this.handleChange = function(data, event) {
        var isValidColor = simpleCheckForValidColor(data);
        if (isValidColor) {
          var colors = toState(data, data.h || _this.state.oldHue);
          _this.setState(colors);
          _this.props.onChangeComplete && _this.debounce(_this.props.onChangeComplete, colors, event);
          _this.props.onChange && _this.props.onChange(colors, event);
        }
      };
      _this.handleSwatchHover = function(data, event) {
        var isValidColor = simpleCheckForValidColor(data);
        if (isValidColor) {
          var colors = toState(data, data.h || _this.state.oldHue);
          _this.props.onSwatchHover && _this.props.onSwatchHover(colors, event);
        }
      };
      _this.state = _extends$6({}, toState(props.color, 0));
      _this.debounce = debounce(function(fn, data, event) {
        fn(data, event);
      }, 100);
      return _this;
    }
    __name(ColorPicker2, "ColorPicker");
    _createClass$3(ColorPicker2, [{
      key: "render",
      value: /* @__PURE__ */ __name(function render3() {
        var optionalEvents = {};
        if (this.props.onSwatchHover) {
          optionalEvents.onSwatchHover = this.handleSwatchHover;
        }
        return React.createElement(Picker, _extends$6({}, this.props, this.state, {
          onChange: this.handleChange
        }, optionalEvents));
      }, "render")
    }], [{
      key: "getDerivedStateFromProps",
      value: /* @__PURE__ */ __name(function getDerivedStateFromProps(nextProps, state) {
        return _extends$6({}, toState(nextProps.color, state.oldHue));
      }, "getDerivedStateFromProps")
    }]);
    return ColorPicker2;
  })(reactExports.PureComponent || reactExports.Component);
  ColorPicker.propTypes = _extends$6({}, Picker.propTypes);
  ColorPicker.defaultProps = _extends$6({}, Picker.defaultProps, {
    color: {
      h: 250,
      s: 0.5,
      l: 0.2,
      a: 1
    }
  });
  return ColorPicker;
}, "ColorWrap");
var _extends$5 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$2 = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  __name(defineProperties, "defineProperties");
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck$2, "_classCallCheck$2");
function _possibleConstructorReturn$2(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
__name(_possibleConstructorReturn$2, "_possibleConstructorReturn$2");
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
__name(_inherits$2, "_inherits$2");
var handleFocus = /* @__PURE__ */ __name(function handleFocus2(Component) {
  var Span = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "span";
  return (function(_React$Component) {
    _inherits$2(Focus, _React$Component);
    function Focus() {
      var _ref;
      var _temp, _this, _ret;
      _classCallCheck$2(this, Focus);
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn$2(this, (_ref = Focus.__proto__ || Object.getPrototypeOf(Focus)).call.apply(_ref, [this].concat(args))), _this), _this.state = { focus: false }, _this.handleFocus = function() {
        return _this.setState({ focus: true });
      }, _this.handleBlur = function() {
        return _this.setState({ focus: false });
      }, _temp), _possibleConstructorReturn$2(_this, _ret);
    }
    __name(Focus, "Focus");
    _createClass$2(Focus, [{
      key: "render",
      value: /* @__PURE__ */ __name(function render3() {
        return React.createElement(
          Span,
          { onFocus: this.handleFocus, onBlur: this.handleBlur },
          React.createElement(Component, _extends$5({}, this.props, this.state))
        );
      }, "render")
    }]);
    return Focus;
  })(React.Component);
}, "handleFocus");
var _extends$4 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var ENTER = 13;
var Swatch = /* @__PURE__ */ __name(function Swatch2(_ref) {
  var color = _ref.color, style = _ref.style, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, onHover = _ref.onHover, _ref$title = _ref.title, title = _ref$title === void 0 ? color : _ref$title, children = _ref.children, focus = _ref.focus, _ref$focusStyle = _ref.focusStyle, focusStyle = _ref$focusStyle === void 0 ? {} : _ref$focusStyle;
  var transparent = color === "transparent";
  var styles = reactCSS({
    default: {
      swatch: _extends$4({
        background: color,
        height: "100%",
        width: "100%",
        cursor: "pointer",
        position: "relative",
        outline: "none"
      }, style, focus ? focusStyle : {})
    }
  });
  var handleClick = /* @__PURE__ */ __name(function handleClick2(e) {
    return onClick(color, e);
  }, "handleClick");
  var handleKeyDown = /* @__PURE__ */ __name(function handleKeyDown2(e) {
    return e.keyCode === ENTER && onClick(color, e);
  }, "handleKeyDown");
  var handleHover = /* @__PURE__ */ __name(function handleHover2(e) {
    return onHover(color, e);
  }, "handleHover");
  var optionalEvents = {};
  if (onHover) {
    optionalEvents.onMouseOver = handleHover;
  }
  return React.createElement(
    "div",
    _extends$4({
      style: styles.swatch,
      onClick: handleClick,
      title,
      tabIndex: 0,
      onKeyDown: handleKeyDown
    }, optionalEvents),
    children,
    transparent && React.createElement(Checkboard, {
      borderRadius: styles.swatch.borderRadius,
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)"
    })
  );
}, "Swatch");
const Swatch$1 = handleFocus(Swatch);
var AlphaPointer = /* @__PURE__ */ __name(function AlphaPointer2(_ref) {
  var direction = _ref.direction;
  var styles = reactCSS({
    "default": {
      picker: {
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        transform: "translate(-9px, -1px)",
        backgroundColor: "rgb(248, 248, 248)",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
      }
    },
    "vertical": {
      picker: {
        transform: "translate(-3px, -9px)"
      }
    }
  }, { vertical: direction === "vertical" });
  return React.createElement("div", { style: styles.picker });
}, "AlphaPointer");
var _extends$3 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var AlphaPicker = /* @__PURE__ */ __name(function AlphaPicker2(_ref) {
  var rgb = _ref.rgb, hsl = _ref.hsl, width = _ref.width, height = _ref.height, onChange = _ref.onChange, direction = _ref.direction, style = _ref.style, renderers = _ref.renderers, pointer = _ref.pointer, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS({
    "default": {
      picker: {
        position: "relative",
        width,
        height
      },
      alpha: {
        radius: "2px",
        style
      }
    }
  });
  return React.createElement(
    "div",
    { style: styles.picker, className: "alpha-picker " + className },
    React.createElement(Alpha, _extends$3({}, styles.alpha, {
      rgb,
      hsl,
      pointer,
      renderers,
      onChange,
      direction
    }))
  );
}, "AlphaPicker");
AlphaPicker.defaultProps = {
  width: "316px",
  height: "16px",
  direction: "horizontal",
  pointer: AlphaPointer
};
ColorWrap(AlphaPicker);
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
__name(arrayMap, "arrayMap");
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
__name(setCacheAdd, "setCacheAdd");
function setCacheHas(value) {
  return this.__data__.has(value);
}
__name(setCacheHas, "setCacheHas");
function SetCache(values) {
  var index = -1, length = values == null ? 0 : values.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values[index]);
  }
}
__name(SetCache, "SetCache");
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
__name(arraySome, "arraySome");
function cacheHas(cache, key) {
  return cache.has(key);
}
__name(cacheHas, "cacheHas");
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
__name(equalArrays, "equalArrays");
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
__name(mapToArray, "mapToArray");
function setToArray(set) {
  var index = -1, result = Array(set.size);
  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
__name(setToArray, "setToArray");
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag$1 = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag$1 = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]";
var symbolProto$1 = Symbol$1 ? Symbol$1.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$1:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag$1:
      var convert = mapToArray;
    case setTag$1:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
__name(equalByTag, "equalByTag");
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
__name(arrayPush, "arrayPush");
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
__name(baseGetAllKeys, "baseGetAllKeys");
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
__name(arrayFilter, "arrayFilter");
function stubArray() {
  return [];
}
__name(stubArray, "stubArray");
var objectProto$2 = Object.prototype;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}
__name(getAllKeys, "getAllKeys");
var COMPARE_PARTIAL_FLAG$3 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
__name(equalObjects, "equalObjects");
var DataView = getNative(root, "DataView");
var Promise$1 = getNative(root, "Promise");
var Set$1 = getNative(root, "Set");
var WeakMap = getNative(root, "WeakMap");
var mapTag = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap);
var getTag = baseGetTag;
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map$1 && getTag(new Map$1()) != mapTag || Promise$1 && getTag(Promise$1.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
  getTag = /* @__PURE__ */ __name(function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  }, "getTag");
}
var COMPARE_PARTIAL_FLAG$2 = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
__name(baseIsEqualDeep, "baseIsEqualDeep");
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
__name(baseIsEqual, "baseIsEqual");
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();
      var result;
      if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
__name(baseIsMatch, "baseIsMatch");
function isStrictComparable(value) {
  return value === value && !isObject(value);
}
__name(isStrictComparable, "isStrictComparable");
function getMatchData(object) {
  var result = keys(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}
__name(getMatchData, "getMatchData");
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
__name(matchesStrictComparable, "matchesStrictComparable");
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}
__name(baseMatches, "baseMatches");
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
__name(isKey, "isKey");
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = /* @__PURE__ */ __name(function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  }, "memoized");
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
__name(memoize, "memoize");
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
__name(memoizeCapped, "memoizeCapped");
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
__name(baseToString, "baseToString");
function toString2(value) {
  return value == null ? "" : baseToString(value);
}
__name(toString2, "toString");
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString2(value));
}
__name(castPath, "castPath");
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
__name(toKey, "toKey");
function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : void 0;
}
__name(baseGet, "baseGet");
function get2(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
__name(get2, "get");
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
__name(baseHasIn, "baseHasIn");
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}
__name(hasPath, "hasPath");
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
__name(hasIn, "hasIn");
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get2(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
__name(baseMatchesProperty, "baseMatchesProperty");
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
__name(baseProperty, "baseProperty");
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}
__name(basePropertyDeep, "basePropertyDeep");
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
__name(property, "property");
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == "object") {
    return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}
__name(baseIteratee, "baseIteratee");
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
  baseEach(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
__name(baseMap, "baseMap");
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee));
}
__name(map, "map");
var BlockSwatches = /* @__PURE__ */ __name(function BlockSwatches2(_ref) {
  var colors = _ref.colors, onClick = _ref.onClick, onSwatchHover = _ref.onSwatchHover;
  var styles = reactCSS({
    "default": {
      swatches: {
        marginRight: "-10px"
      },
      swatch: {
        width: "22px",
        height: "22px",
        float: "left",
        marginRight: "10px",
        marginBottom: "10px",
        borderRadius: "4px"
      },
      clear: {
        clear: "both"
      }
    }
  });
  return React.createElement(
    "div",
    { style: styles.swatches },
    map(colors, function(c) {
      return React.createElement(Swatch$1, {
        key: c,
        color: c,
        style: styles.swatch,
        onClick,
        onHover: onSwatchHover,
        focusStyle: {
          boxShadow: "0 0 4px " + c
        }
      });
    }),
    React.createElement("div", { style: styles.clear })
  );
}, "BlockSwatches");
var Block = /* @__PURE__ */ __name(function Block2(_ref) {
  var onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, hex = _ref.hex, colors = _ref.colors, width = _ref.width, triangle = _ref.triangle, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var transparent = hex === "transparent";
  var handleChange = /* @__PURE__ */ __name(function handleChange2(hexCode, e) {
    isValidHex(hexCode) && onChange({
      hex: hexCode,
      source: "hex"
    }, e);
  }, "handleChange");
  var styles = reactCSS(merge({
    "default": {
      card: {
        width,
        background: "#fff",
        boxShadow: "0 1px rgba(0,0,0,.1)",
        borderRadius: "6px",
        position: "relative"
      },
      head: {
        height: "110px",
        background: hex,
        borderRadius: "6px 6px 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      },
      body: {
        padding: "10px"
      },
      label: {
        fontSize: "18px",
        color: getContrastingColor(hex),
        position: "relative"
      },
      triangle: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 10px 10px 10px",
        borderColor: "transparent transparent " + hex + " transparent",
        position: "absolute",
        top: "-10px",
        left: "50%",
        marginLeft: "-10px"
      },
      input: {
        width: "100%",
        fontSize: "12px",
        color: "#666",
        border: "0px",
        outline: "none",
        height: "22px",
        boxShadow: "inset 0 0 0 1px #ddd",
        borderRadius: "4px",
        padding: "0 7px",
        boxSizing: "border-box"
      }
    },
    "hide-triangle": {
      triangle: {
        display: "none"
      }
    }
  }, passedStyles), { "hide-triangle": triangle === "hide" });
  return React.createElement(
    "div",
    { style: styles.card, className: "block-picker " + className },
    React.createElement("div", { style: styles.triangle }),
    React.createElement(
      "div",
      { style: styles.head },
      transparent && React.createElement(Checkboard, { borderRadius: "6px 6px 0 0" }),
      React.createElement(
        "div",
        { style: styles.label },
        hex
      )
    ),
    React.createElement(
      "div",
      { style: styles.body },
      React.createElement(BlockSwatches, { colors, onClick: handleChange, onSwatchHover }),
      React.createElement(EditableInput, {
        style: { input: styles.input },
        value: hex,
        onChange: handleChange
      })
    )
  );
}, "Block");
Block.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  triangle: PropTypes.oneOf(["top", "hide"]),
  styles: PropTypes.object
};
Block.defaultProps = {
  width: 170,
  colors: ["#D9E3F0", "#F47373", "#697689", "#37D67A", "#2CCCE4", "#555555", "#dce775", "#ff8a65", "#ba68c8"],
  triangle: "top",
  styles: {}
};
ColorWrap(Block);
var red = { "100": "#ffcdd2", "300": "#e57373", "500": "#f44336", "700": "#d32f2f", "900": "#b71c1c" };
var pink = { "100": "#f8bbd0", "300": "#f06292", "500": "#e91e63", "700": "#c2185b", "900": "#880e4f" };
var purple = { "100": "#e1bee7", "300": "#ba68c8", "500": "#9c27b0", "700": "#7b1fa2", "900": "#4a148c" };
var deepPurple = { "100": "#d1c4e9", "300": "#9575cd", "500": "#673ab7", "700": "#512da8", "900": "#311b92" };
var indigo = { "100": "#c5cae9", "300": "#7986cb", "500": "#3f51b5", "700": "#303f9f", "900": "#1a237e" };
var blue = { "100": "#bbdefb", "300": "#64b5f6", "500": "#2196f3", "700": "#1976d2", "900": "#0d47a1" };
var lightBlue = { "100": "#b3e5fc", "300": "#4fc3f7", "500": "#03a9f4", "700": "#0288d1", "900": "#01579b" };
var cyan = { "100": "#b2ebf2", "300": "#4dd0e1", "500": "#00bcd4", "700": "#0097a7", "900": "#006064" };
var teal = { "100": "#b2dfdb", "300": "#4db6ac", "500": "#009688", "700": "#00796b", "900": "#004d40" };
var green = { "100": "#c8e6c9", "300": "#81c784", "500": "#4caf50", "700": "#388e3c" };
var lightGreen = { "100": "#dcedc8", "300": "#aed581", "500": "#8bc34a", "700": "#689f38", "900": "#33691e" };
var lime = { "100": "#f0f4c3", "300": "#dce775", "500": "#cddc39", "700": "#afb42b", "900": "#827717" };
var yellow = { "100": "#fff9c4", "300": "#fff176", "500": "#ffeb3b", "700": "#fbc02d", "900": "#f57f17" };
var amber = { "100": "#ffecb3", "300": "#ffd54f", "500": "#ffc107", "700": "#ffa000", "900": "#ff6f00" };
var orange = { "100": "#ffe0b2", "300": "#ffb74d", "500": "#ff9800", "700": "#f57c00", "900": "#e65100" };
var deepOrange = { "100": "#ffccbc", "300": "#ff8a65", "500": "#ff5722", "700": "#e64a19", "900": "#bf360c" };
var brown = { "100": "#d7ccc8", "300": "#a1887f", "500": "#795548", "700": "#5d4037", "900": "#3e2723" };
var blueGrey = { "100": "#cfd8dc", "300": "#90a4ae", "500": "#607d8b", "700": "#455a64", "900": "#263238" };
var CircleSwatch = /* @__PURE__ */ __name(function CircleSwatch2(_ref) {
  var color = _ref.color, onClick = _ref.onClick, onSwatchHover = _ref.onSwatchHover, hover2 = _ref.hover, active2 = _ref.active, circleSize = _ref.circleSize, circleSpacing = _ref.circleSpacing;
  var styles = reactCSS({
    "default": {
      swatch: {
        width: circleSize,
        height: circleSize,
        marginRight: circleSpacing,
        marginBottom: circleSpacing,
        transform: "scale(1)",
        transition: "100ms transform ease"
      },
      Swatch: {
        borderRadius: "50%",
        background: "transparent",
        boxShadow: "inset 0 0 0 " + (circleSize / 2 + 1) + "px " + color,
        transition: "100ms box-shadow ease"
      }
    },
    "hover": {
      swatch: {
        transform: "scale(1.2)"
      }
    },
    "active": {
      Swatch: {
        boxShadow: "inset 0 0 0 3px " + color
      }
    }
  }, { hover: hover2, active: active2 });
  return React.createElement(
    "div",
    { style: styles.swatch },
    React.createElement(Swatch$1, {
      style: styles.Swatch,
      color,
      onClick,
      onHover: onSwatchHover,
      focusStyle: { boxShadow: styles.Swatch.boxShadow + ", 0 0 5px " + color }
    })
  );
}, "CircleSwatch");
CircleSwatch.defaultProps = {
  circleSize: 28,
  circleSpacing: 14
};
const CircleSwatch$1 = libExports.handleHover(CircleSwatch);
var Circle = /* @__PURE__ */ __name(function Circle2(_ref) {
  var width = _ref.width, onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, colors = _ref.colors, hex = _ref.hex, circleSize = _ref.circleSize, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, circleSpacing = _ref.circleSpacing, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      card: {
        width,
        display: "flex",
        flexWrap: "wrap",
        marginRight: -circleSpacing,
        marginBottom: -circleSpacing
      }
    }
  }, passedStyles));
  var handleChange = /* @__PURE__ */ __name(function handleChange2(hexCode, e) {
    return onChange({ hex: hexCode, source: "hex" }, e);
  }, "handleChange");
  return React.createElement(
    "div",
    { style: styles.card, className: "circle-picker " + className },
    map(colors, function(c) {
      return React.createElement(CircleSwatch$1, {
        key: c,
        color: c,
        onClick: handleChange,
        onSwatchHover,
        active: hex === c.toLowerCase(),
        circleSize,
        circleSpacing
      });
    })
  );
}, "Circle");
Circle.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circleSize: PropTypes.number,
  circleSpacing: PropTypes.number,
  styles: PropTypes.object
};
Circle.defaultProps = {
  width: 252,
  circleSize: 28,
  circleSpacing: 14,
  colors: [red["500"], pink["500"], purple["500"], deepPurple["500"], indigo["500"], blue["500"], lightBlue["500"], cyan["500"], teal["500"], green["500"], lightGreen["500"], lime["500"], yellow["500"], amber["500"], orange["500"], deepOrange["500"], brown["500"], blueGrey["500"]],
  styles: {}
};
ColorWrap(Circle);
function isUndefined(value) {
  return value === void 0;
}
__name(isUndefined, "isUndefined");
var UnfoldMoreHorizontalIcon$1 = {};
var hasRequiredUnfoldMoreHorizontalIcon;
function requireUnfoldMoreHorizontalIcon() {
  if (hasRequiredUnfoldMoreHorizontalIcon) return UnfoldMoreHorizontalIcon$1;
  hasRequiredUnfoldMoreHorizontalIcon = 1;
  Object.defineProperty(UnfoldMoreHorizontalIcon$1, "__esModule", {
    value: true
  });
  var _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _react = requireReact();
  var _react2 = _interopRequireDefault(_react);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  function _objectWithoutProperties(obj, keys2) {
    var target = {};
    for (var i in obj) {
      if (keys2.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  __name(_objectWithoutProperties, "_objectWithoutProperties");
  var DEFAULT_SIZE = 24;
  UnfoldMoreHorizontalIcon$1.default = function(_ref) {
    var _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "currentColor" : _ref$fill, _ref$width = _ref.width, width = _ref$width === void 0 ? DEFAULT_SIZE : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? DEFAULT_SIZE : _ref$height, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, props = _objectWithoutProperties(_ref, ["fill", "width", "height", "style"]);
    return _react2.default.createElement(
      "svg",
      _extends2({
        viewBox: "0 0 " + DEFAULT_SIZE + " " + DEFAULT_SIZE,
        style: _extends2({ fill, width, height }, style)
      }, props),
      _react2.default.createElement("path", { d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" })
    );
  };
  return UnfoldMoreHorizontalIcon$1;
}
__name(requireUnfoldMoreHorizontalIcon, "requireUnfoldMoreHorizontalIcon");
var UnfoldMoreHorizontalIconExports = requireUnfoldMoreHorizontalIcon();
const UnfoldMoreHorizontalIcon = /* @__PURE__ */ getDefaultExportFromCjs(UnfoldMoreHorizontalIconExports);
var _createClass$1 = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  __name(defineProperties, "defineProperties");
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck$1, "_classCallCheck$1");
function _possibleConstructorReturn$1(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
__name(_possibleConstructorReturn$1, "_possibleConstructorReturn$1");
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
__name(_inherits$1, "_inherits$1");
var ChromeFields = (function(_React$Component) {
  _inherits$1(ChromeFields2, _React$Component);
  function ChromeFields2(props) {
    _classCallCheck$1(this, ChromeFields2);
    var _this = _possibleConstructorReturn$1(this, (ChromeFields2.__proto__ || Object.getPrototypeOf(ChromeFields2)).call(this));
    _this.toggleViews = function() {
      if (_this.state.view === "hex") {
        _this.setState({ view: "rgb" });
      } else if (_this.state.view === "rgb") {
        _this.setState({ view: "hsl" });
      } else if (_this.state.view === "hsl") {
        if (_this.props.hsl.a === 1) {
          _this.setState({ view: "hex" });
        } else {
          _this.setState({ view: "rgb" });
        }
      }
    };
    _this.handleChange = function(data, e) {
      if (data.hex) {
        isValidHex(data.hex) && _this.props.onChange({
          hex: data.hex,
          source: "hex"
        }, e);
      } else if (data.r || data.g || data.b) {
        _this.props.onChange({
          r: data.r || _this.props.rgb.r,
          g: data.g || _this.props.rgb.g,
          b: data.b || _this.props.rgb.b,
          source: "rgb"
        }, e);
      } else if (data.a) {
        if (data.a < 0) {
          data.a = 0;
        } else if (data.a > 1) {
          data.a = 1;
        }
        _this.props.onChange({
          h: _this.props.hsl.h,
          s: _this.props.hsl.s,
          l: _this.props.hsl.l,
          a: Math.round(data.a * 100) / 100,
          source: "rgb"
        }, e);
      } else if (data.h || data.s || data.l) {
        if (typeof data.s === "string" && data.s.includes("%")) {
          data.s = data.s.replace("%", "");
        }
        if (typeof data.l === "string" && data.l.includes("%")) {
          data.l = data.l.replace("%", "");
        }
        if (data.s == 1) {
          data.s = 0.01;
        } else if (data.l == 1) {
          data.l = 0.01;
        }
        _this.props.onChange({
          h: data.h || _this.props.hsl.h,
          s: Number(!isUndefined(data.s) ? data.s : _this.props.hsl.s),
          l: Number(!isUndefined(data.l) ? data.l : _this.props.hsl.l),
          source: "hsl"
        }, e);
      }
    };
    _this.showHighlight = function(e) {
      e.currentTarget.style.background = "#eee";
    };
    _this.hideHighlight = function(e) {
      e.currentTarget.style.background = "transparent";
    };
    if (props.hsl.a !== 1 && props.view === "hex") {
      _this.state = {
        view: "rgb"
      };
    } else {
      _this.state = {
        view: props.view
      };
    }
    return _this;
  }
  __name(ChromeFields2, "ChromeFields");
  _createClass$1(ChromeFields2, [{
    key: "render",
    value: /* @__PURE__ */ __name(function render3() {
      var _this2 = this;
      var styles = reactCSS({
        "default": {
          wrap: {
            paddingTop: "16px",
            display: "flex"
          },
          fields: {
            flex: "1",
            display: "flex",
            marginLeft: "-6px"
          },
          field: {
            paddingLeft: "6px",
            width: "100%"
          },
          alpha: {
            paddingLeft: "6px",
            width: "100%"
          },
          toggle: {
            width: "32px",
            textAlign: "right",
            position: "relative"
          },
          icon: {
            marginRight: "-4px",
            marginTop: "12px",
            cursor: "pointer",
            position: "relative"
          },
          iconHighlight: {
            position: "absolute",
            width: "24px",
            height: "28px",
            background: "#eee",
            borderRadius: "4px",
            top: "10px",
            left: "12px",
            display: "none"
          },
          input: {
            fontSize: "11px",
            color: "#333",
            width: "100%",
            borderRadius: "2px",
            border: "none",
            boxShadow: "inset 0 0 0 1px #dadada",
            height: "21px",
            textAlign: "center"
          },
          label: {
            textTransform: "uppercase",
            fontSize: "11px",
            lineHeight: "11px",
            color: "#969696",
            textAlign: "center",
            display: "block",
            marginTop: "12px"
          },
          svg: {
            fill: "#333",
            width: "24px",
            height: "24px",
            border: "1px transparent solid",
            borderRadius: "5px"
          }
        },
        "disableAlpha": {
          alpha: {
            display: "none"
          }
        }
      }, this.props, this.state);
      var fields = void 0;
      if (this.state.view === "hex") {
        fields = React.createElement(
          "div",
          { style: styles.fields, className: "flexbox-fix" },
          React.createElement(
            "div",
            { style: styles.field },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "hex",
              value: this.props.hex,
              onChange: this.handleChange
            })
          )
        );
      } else if (this.state.view === "rgb") {
        fields = React.createElement(
          "div",
          { style: styles.fields, className: "flexbox-fix" },
          React.createElement(
            "div",
            { style: styles.field },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "r",
              value: this.props.rgb.r,
              onChange: this.handleChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.field },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "g",
              value: this.props.rgb.g,
              onChange: this.handleChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.field },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "b",
              value: this.props.rgb.b,
              onChange: this.handleChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.alpha },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "a",
              value: this.props.rgb.a,
              arrowOffset: 0.01,
              onChange: this.handleChange
            })
          )
        );
      } else if (this.state.view === "hsl") {
        fields = React.createElement(
          "div",
          { style: styles.fields, className: "flexbox-fix" },
          React.createElement(
            "div",
            { style: styles.field },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "h",
              value: Math.round(this.props.hsl.h),
              onChange: this.handleChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.field },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "s",
              value: Math.round(this.props.hsl.s * 100) + "%",
              onChange: this.handleChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.field },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "l",
              value: Math.round(this.props.hsl.l * 100) + "%",
              onChange: this.handleChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.alpha },
            React.createElement(EditableInput, {
              style: { input: styles.input, label: styles.label },
              label: "a",
              value: this.props.hsl.a,
              arrowOffset: 0.01,
              onChange: this.handleChange
            })
          )
        );
      }
      return React.createElement(
        "div",
        { style: styles.wrap, className: "flexbox-fix" },
        fields,
        React.createElement(
          "div",
          { style: styles.toggle },
          React.createElement(
            "div",
            { style: styles.icon, onClick: this.toggleViews, ref: /* @__PURE__ */ __name(function ref(icon) {
              return _this2.icon = icon;
            }, "ref") },
            React.createElement(UnfoldMoreHorizontalIcon, {
              style: styles.svg,
              onMouseOver: this.showHighlight,
              onMouseEnter: this.showHighlight,
              onMouseOut: this.hideHighlight
            })
          )
        )
      );
    }, "render")
  }], [{
    key: "getDerivedStateFromProps",
    value: /* @__PURE__ */ __name(function getDerivedStateFromProps(nextProps, state) {
      if (nextProps.hsl.a !== 1 && state.view === "hex") {
        return { view: "rgb" };
      }
      return null;
    }, "getDerivedStateFromProps")
  }]);
  return ChromeFields2;
})(React.Component);
ChromeFields.defaultProps = {
  view: "hex"
};
var ChromePointer = /* @__PURE__ */ __name(function ChromePointer2() {
  var styles = reactCSS({
    "default": {
      picker: {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        transform: "translate(-6px, -1px)",
        backgroundColor: "rgb(248, 248, 248)",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
      }
    }
  });
  return React.createElement("div", { style: styles.picker });
}, "ChromePointer");
var ChromePointerCircle = /* @__PURE__ */ __name(function ChromePointerCircle2() {
  var styles = reactCSS({
    "default": {
      picker: {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        boxShadow: "inset 0 0 0 1px #fff",
        transform: "translate(-6px, -6px)"
      }
    }
  });
  return React.createElement("div", { style: styles.picker });
}, "ChromePointerCircle");
var Chrome = /* @__PURE__ */ __name(function Chrome2(_ref) {
  var width = _ref.width, onChange = _ref.onChange, disableAlpha = _ref.disableAlpha, rgb = _ref.rgb, hsl = _ref.hsl, hsv = _ref.hsv, hex = _ref.hex, renderers = _ref.renderers, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, defaultView = _ref.defaultView;
  var styles = reactCSS(merge({
    "default": {
      picker: {
        width,
        background: "#fff",
        borderRadius: "2px",
        boxShadow: "0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)",
        boxSizing: "initial",
        fontFamily: "Menlo"
      },
      saturation: {
        width: "100%",
        paddingBottom: "55%",
        position: "relative",
        borderRadius: "2px 2px 0 0",
        overflow: "hidden"
      },
      Saturation: {
        radius: "2px 2px 0 0"
      },
      body: {
        padding: "16px 16px 12px"
      },
      controls: {
        display: "flex"
      },
      color: {
        width: "32px"
      },
      swatch: {
        marginTop: "6px",
        width: "16px",
        height: "16px",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden"
      },
      active: {
        absolute: "0px 0px 0px 0px",
        borderRadius: "8px",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.1)",
        background: "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + rgb.a + ")",
        zIndex: "2"
      },
      toggles: {
        flex: "1"
      },
      hue: {
        height: "10px",
        position: "relative",
        marginBottom: "8px"
      },
      Hue: {
        radius: "2px"
      },
      alpha: {
        height: "10px",
        position: "relative"
      },
      Alpha: {
        radius: "2px"
      }
    },
    "disableAlpha": {
      color: {
        width: "22px"
      },
      alpha: {
        display: "none"
      },
      hue: {
        marginBottom: "0px"
      },
      swatch: {
        width: "10px",
        height: "10px",
        marginTop: "0px"
      }
    }
  }, passedStyles), { disableAlpha });
  return React.createElement(
    "div",
    { style: styles.picker, className: "chrome-picker " + className },
    React.createElement(
      "div",
      { style: styles.saturation },
      React.createElement(Saturation, {
        style: styles.Saturation,
        hsl,
        hsv,
        pointer: ChromePointerCircle,
        onChange
      })
    ),
    React.createElement(
      "div",
      { style: styles.body },
      React.createElement(
        "div",
        { style: styles.controls, className: "flexbox-fix" },
        React.createElement(
          "div",
          { style: styles.color },
          React.createElement(
            "div",
            { style: styles.swatch },
            React.createElement("div", { style: styles.active }),
            React.createElement(Checkboard, { renderers })
          )
        ),
        React.createElement(
          "div",
          { style: styles.toggles },
          React.createElement(
            "div",
            { style: styles.hue },
            React.createElement(Hue, {
              style: styles.Hue,
              hsl,
              pointer: ChromePointer,
              onChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.alpha },
            React.createElement(Alpha, {
              style: styles.Alpha,
              rgb,
              hsl,
              pointer: ChromePointer,
              renderers,
              onChange
            })
          )
        )
      ),
      React.createElement(ChromeFields, {
        rgb,
        hsl,
        hex,
        view: defaultView,
        onChange,
        disableAlpha
      })
    )
  );
}, "Chrome");
Chrome.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disableAlpha: PropTypes.bool,
  styles: PropTypes.object,
  defaultView: PropTypes.oneOf(["hex", "rgb", "hsl"])
};
Chrome.defaultProps = {
  width: 225,
  disableAlpha: false,
  styles: {}
};
const ChromePicker = ColorWrap(Chrome);
var CompactColor = /* @__PURE__ */ __name(function CompactColor2(_ref) {
  var color = _ref.color, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, onSwatchHover = _ref.onSwatchHover, active2 = _ref.active;
  var styles = reactCSS({
    "default": {
      color: {
        background: color,
        width: "15px",
        height: "15px",
        float: "left",
        marginRight: "5px",
        marginBottom: "5px",
        position: "relative",
        cursor: "pointer"
      },
      dot: {
        absolute: "5px 5px 5px 5px",
        background: getContrastingColor(color),
        borderRadius: "50%",
        opacity: "0"
      }
    },
    "active": {
      dot: {
        opacity: "1"
      }
    },
    "color-#FFFFFF": {
      color: {
        boxShadow: "inset 0 0 0 1px #ddd"
      },
      dot: {
        background: "#000"
      }
    },
    "transparent": {
      dot: {
        background: "#000"
      }
    }
  }, { active: active2, "color-#FFFFFF": color === "#FFFFFF", "transparent": color === "transparent" });
  return React.createElement(
    Swatch$1,
    {
      style: styles.color,
      color,
      onClick,
      onHover: onSwatchHover,
      focusStyle: { boxShadow: "0 0 4px " + color }
    },
    React.createElement("div", { style: styles.dot })
  );
}, "CompactColor");
var CompactFields = /* @__PURE__ */ __name(function CompactFields2(_ref) {
  var hex = _ref.hex, rgb = _ref.rgb, onChange = _ref.onChange;
  var styles = reactCSS({
    "default": {
      fields: {
        display: "flex",
        paddingBottom: "6px",
        paddingRight: "5px",
        position: "relative"
      },
      active: {
        position: "absolute",
        top: "6px",
        left: "5px",
        height: "9px",
        width: "9px",
        background: hex
      },
      HEXwrap: {
        flex: "6",
        position: "relative"
      },
      HEXinput: {
        width: "80%",
        padding: "0px",
        paddingLeft: "20%",
        border: "none",
        outline: "none",
        background: "none",
        fontSize: "12px",
        color: "#333",
        height: "16px"
      },
      HEXlabel: {
        display: "none"
      },
      RGBwrap: {
        flex: "3",
        position: "relative"
      },
      RGBinput: {
        width: "70%",
        padding: "0px",
        paddingLeft: "30%",
        border: "none",
        outline: "none",
        background: "none",
        fontSize: "12px",
        color: "#333",
        height: "16px"
      },
      RGBlabel: {
        position: "absolute",
        top: "3px",
        left: "0px",
        lineHeight: "16px",
        textTransform: "uppercase",
        fontSize: "12px",
        color: "#999"
      }
    }
  });
  var handleChange = /* @__PURE__ */ __name(function handleChange2(data, e) {
    if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: "rgb"
      }, e);
    } else {
      onChange({
        hex: data.hex,
        source: "hex"
      }, e);
    }
  }, "handleChange");
  return React.createElement(
    "div",
    { style: styles.fields, className: "flexbox-fix" },
    React.createElement("div", { style: styles.active }),
    React.createElement(EditableInput, {
      style: { wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel },
      label: "hex",
      value: hex,
      onChange: handleChange
    }),
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "r",
      value: rgb.r,
      onChange: handleChange
    }),
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "g",
      value: rgb.g,
      onChange: handleChange
    }),
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "b",
      value: rgb.b,
      onChange: handleChange
    })
  );
}, "CompactFields");
var Compact = /* @__PURE__ */ __name(function Compact2(_ref) {
  var onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, colors = _ref.colors, hex = _ref.hex, rgb = _ref.rgb, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      Compact: {
        background: "#f6f6f6",
        radius: "4px"
      },
      compact: {
        paddingTop: "5px",
        paddingLeft: "5px",
        boxSizing: "initial",
        width: "240px"
      },
      clear: {
        clear: "both"
      }
    }
  }, passedStyles));
  var handleChange = /* @__PURE__ */ __name(function handleChange2(data, e) {
    if (data.hex) {
      isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: "hex"
      }, e);
    } else {
      onChange(data, e);
    }
  }, "handleChange");
  return React.createElement(
    Raised,
    { style: styles.Compact, styles: passedStyles },
    React.createElement(
      "div",
      { style: styles.compact, className: "compact-picker " + className },
      React.createElement(
        "div",
        null,
        map(colors, function(c) {
          return React.createElement(CompactColor, {
            key: c,
            color: c,
            active: c.toLowerCase() === hex,
            onClick: handleChange,
            onSwatchHover
          });
        }),
        React.createElement("div", { style: styles.clear })
      ),
      React.createElement(CompactFields, { hex, rgb, onChange: handleChange })
    )
  );
}, "Compact");
Compact.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object
};
Compact.defaultProps = {
  colors: ["#4D4D4D", "#999999", "#FFFFFF", "#F44E3B", "#FE9200", "#FCDC00", "#DBDF00", "#A4DD00", "#68CCCA", "#73D8FF", "#AEA1FF", "#FDA1FF", "#333333", "#808080", "#cccccc", "#D33115", "#E27300", "#FCC400", "#B0BC00", "#68BC00", "#16A5A5", "#009CE0", "#7B64FF", "#FA28FF", "#000000", "#666666", "#B3B3B3", "#9F0500", "#C45100", "#FB9E00", "#808900", "#194D33", "#0C797D", "#0062B1", "#653294", "#AB149E"],
  styles: {}
};
ColorWrap(Compact);
var GithubSwatch = /* @__PURE__ */ __name(function GithubSwatch2(_ref) {
  var hover2 = _ref.hover, color = _ref.color, onClick = _ref.onClick, onSwatchHover = _ref.onSwatchHover;
  var hoverSwatch = {
    position: "relative",
    zIndex: "2",
    outline: "2px solid #fff",
    boxShadow: "0 0 5px 2px rgba(0,0,0,0.25)"
  };
  var styles = reactCSS({
    "default": {
      swatch: {
        width: "25px",
        height: "25px",
        fontSize: "0"
      }
    },
    "hover": {
      swatch: hoverSwatch
    }
  }, { hover: hover2 });
  return React.createElement(
    "div",
    { style: styles.swatch },
    React.createElement(Swatch$1, {
      color,
      onClick,
      onHover: onSwatchHover,
      focusStyle: hoverSwatch
    })
  );
}, "GithubSwatch");
const GithubSwatch$1 = libExports.handleHover(GithubSwatch);
var Github = /* @__PURE__ */ __name(function Github2(_ref) {
  var width = _ref.width, colors = _ref.colors, onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, triangle = _ref.triangle, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      card: {
        width,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.2)",
        boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
        borderRadius: "4px",
        position: "relative",
        padding: "5px",
        display: "flex",
        flexWrap: "wrap"
      },
      triangle: {
        position: "absolute",
        border: "7px solid transparent",
        borderBottomColor: "#fff"
      },
      triangleShadow: {
        position: "absolute",
        border: "8px solid transparent",
        borderBottomColor: "rgba(0,0,0,0.15)"
      }
    },
    "hide-triangle": {
      triangle: {
        display: "none"
      },
      triangleShadow: {
        display: "none"
      }
    },
    "top-left-triangle": {
      triangle: {
        top: "-14px",
        left: "10px"
      },
      triangleShadow: {
        top: "-16px",
        left: "9px"
      }
    },
    "top-right-triangle": {
      triangle: {
        top: "-14px",
        right: "10px"
      },
      triangleShadow: {
        top: "-16px",
        right: "9px"
      }
    },
    "bottom-left-triangle": {
      triangle: {
        top: "35px",
        left: "10px",
        transform: "rotate(180deg)"
      },
      triangleShadow: {
        top: "37px",
        left: "9px",
        transform: "rotate(180deg)"
      }
    },
    "bottom-right-triangle": {
      triangle: {
        top: "35px",
        right: "10px",
        transform: "rotate(180deg)"
      },
      triangleShadow: {
        top: "37px",
        right: "9px",
        transform: "rotate(180deg)"
      }
    }
  }, passedStyles), {
    "hide-triangle": triangle === "hide",
    "top-left-triangle": triangle === "top-left",
    "top-right-triangle": triangle === "top-right",
    "bottom-left-triangle": triangle === "bottom-left",
    "bottom-right-triangle": triangle === "bottom-right"
  });
  var handleChange = /* @__PURE__ */ __name(function handleChange2(hex, e) {
    return onChange({ hex, source: "hex" }, e);
  }, "handleChange");
  return React.createElement(
    "div",
    { style: styles.card, className: "github-picker " + className },
    React.createElement("div", { style: styles.triangleShadow }),
    React.createElement("div", { style: styles.triangle }),
    map(colors, function(c) {
      return React.createElement(GithubSwatch$1, {
        color: c,
        key: c,
        onClick: handleChange,
        onSwatchHover
      });
    })
  );
}, "Github");
Github.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  triangle: PropTypes.oneOf(["hide", "top-left", "top-right", "bottom-left", "bottom-right"]),
  styles: PropTypes.object
};
Github.defaultProps = {
  width: 200,
  colors: ["#B80000", "#DB3E00", "#FCCB00", "#008B02", "#006B76", "#1273DE", "#004DCF", "#5300EB", "#EB9694", "#FAD0C3", "#FEF3BD", "#C1E1C5", "#BEDADC", "#C4DEF6", "#BED3F3", "#D4C4FB"],
  triangle: "top-left",
  styles: {}
};
ColorWrap(Github);
var SliderPointer$1 = /* @__PURE__ */ __name(function SliderPointer(_ref) {
  var direction = _ref.direction;
  var styles = reactCSS({
    "default": {
      picker: {
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        transform: "translate(-9px, -1px)",
        backgroundColor: "rgb(248, 248, 248)",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
      }
    },
    "vertical": {
      picker: {
        transform: "translate(-3px, -9px)"
      }
    }
  }, { vertical: direction === "vertical" });
  return React.createElement("div", { style: styles.picker });
}, "SliderPointer");
var _extends$2 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var HuePicker = /* @__PURE__ */ __name(function HuePicker2(_ref) {
  var width = _ref.width, height = _ref.height, onChange = _ref.onChange, hsl = _ref.hsl, direction = _ref.direction, pointer = _ref.pointer, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      picker: {
        position: "relative",
        width,
        height
      },
      hue: {
        radius: "2px"
      }
    }
  }, passedStyles));
  var handleChange = /* @__PURE__ */ __name(function handleChange2(data) {
    return onChange({ a: 1, h: data.h, l: 0.5, s: 1 });
  }, "handleChange");
  return React.createElement(
    "div",
    { style: styles.picker, className: "hue-picker " + className },
    React.createElement(Hue, _extends$2({}, styles.hue, {
      hsl,
      pointer,
      onChange: handleChange,
      direction
    }))
  );
}, "HuePicker");
HuePicker.propTypes = {
  styles: PropTypes.object
};
HuePicker.defaultProps = {
  width: "316px",
  height: "16px",
  direction: "horizontal",
  pointer: SliderPointer$1,
  styles: {}
};
ColorWrap(HuePicker);
var Material = /* @__PURE__ */ __name(function Material2(_ref) {
  var onChange = _ref.onChange, hex = _ref.hex, rgb = _ref.rgb, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      material: {
        width: "98px",
        height: "98px",
        padding: "16px",
        fontFamily: "Roboto"
      },
      HEXwrap: {
        position: "relative"
      },
      HEXinput: {
        width: "100%",
        marginTop: "12px",
        fontSize: "15px",
        color: "#333",
        padding: "0px",
        border: "0px",
        borderBottom: "2px solid " + hex,
        outline: "none",
        height: "30px"
      },
      HEXlabel: {
        position: "absolute",
        top: "0px",
        left: "0px",
        fontSize: "11px",
        color: "#999999",
        textTransform: "capitalize"
      },
      Hex: {
        style: {}
      },
      RGBwrap: {
        position: "relative"
      },
      RGBinput: {
        width: "100%",
        marginTop: "12px",
        fontSize: "15px",
        color: "#333",
        padding: "0px",
        border: "0px",
        borderBottom: "1px solid #eee",
        outline: "none",
        height: "30px"
      },
      RGBlabel: {
        position: "absolute",
        top: "0px",
        left: "0px",
        fontSize: "11px",
        color: "#999999",
        textTransform: "capitalize"
      },
      split: {
        display: "flex",
        marginRight: "-10px",
        paddingTop: "11px"
      },
      third: {
        flex: "1",
        paddingRight: "10px"
      }
    }
  }, passedStyles));
  var handleChange = /* @__PURE__ */ __name(function handleChange2(data, e) {
    if (data.hex) {
      isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: "hex"
      }, e);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: "rgb"
      }, e);
    }
  }, "handleChange");
  return React.createElement(
    Raised,
    { styles: passedStyles },
    React.createElement(
      "div",
      { style: styles.material, className: "material-picker " + className },
      React.createElement(EditableInput, {
        style: { wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel },
        label: "hex",
        value: hex,
        onChange: handleChange
      }),
      React.createElement(
        "div",
        { style: styles.split, className: "flexbox-fix" },
        React.createElement(
          "div",
          { style: styles.third },
          React.createElement(EditableInput, {
            style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
            label: "r",
            value: rgb.r,
            onChange: handleChange
          })
        ),
        React.createElement(
          "div",
          { style: styles.third },
          React.createElement(EditableInput, {
            style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
            label: "g",
            value: rgb.g,
            onChange: handleChange
          })
        ),
        React.createElement(
          "div",
          { style: styles.third },
          React.createElement(EditableInput, {
            style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
            label: "b",
            value: rgb.b,
            onChange: handleChange
          })
        )
      )
    )
  );
}, "Material");
ColorWrap(Material);
var PhotoshopPicker = /* @__PURE__ */ __name(function PhotoshopPicker2(_ref) {
  var onChange = _ref.onChange, rgb = _ref.rgb, hsv = _ref.hsv, hex = _ref.hex;
  var styles = reactCSS({
    "default": {
      fields: {
        paddingTop: "5px",
        paddingBottom: "9px",
        width: "80px",
        position: "relative"
      },
      divider: {
        height: "5px"
      },
      RGBwrap: {
        position: "relative"
      },
      RGBinput: {
        marginLeft: "40%",
        width: "40%",
        height: "18px",
        border: "1px solid #888888",
        boxShadow: "inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC",
        marginBottom: "5px",
        fontSize: "13px",
        paddingLeft: "3px",
        marginRight: "10px"
      },
      RGBlabel: {
        left: "0px",
        top: "0px",
        width: "34px",
        textTransform: "uppercase",
        fontSize: "13px",
        height: "18px",
        lineHeight: "22px",
        position: "absolute"
      },
      HEXwrap: {
        position: "relative"
      },
      HEXinput: {
        marginLeft: "20%",
        width: "80%",
        height: "18px",
        border: "1px solid #888888",
        boxShadow: "inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC",
        marginBottom: "6px",
        fontSize: "13px",
        paddingLeft: "3px"
      },
      HEXlabel: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "14px",
        textTransform: "uppercase",
        fontSize: "13px",
        height: "18px",
        lineHeight: "22px"
      },
      fieldSymbols: {
        position: "absolute",
        top: "5px",
        right: "-7px",
        fontSize: "13px"
      },
      symbol: {
        height: "20px",
        lineHeight: "22px",
        paddingBottom: "7px"
      }
    }
  });
  var handleChange = /* @__PURE__ */ __name(function handleChange2(data, e) {
    if (data["#"]) {
      isValidHex(data["#"]) && onChange({
        hex: data["#"],
        source: "hex"
      }, e);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: "rgb"
      }, e);
    } else if (data.h || data.s || data.v) {
      onChange({
        h: data.h || hsv.h,
        s: data.s || hsv.s,
        v: data.v || hsv.v,
        source: "hsv"
      }, e);
    }
  }, "handleChange");
  return React.createElement(
    "div",
    { style: styles.fields },
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "h",
      value: Math.round(hsv.h),
      onChange: handleChange
    }),
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "s",
      value: Math.round(hsv.s * 100),
      onChange: handleChange
    }),
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "v",
      value: Math.round(hsv.v * 100),
      onChange: handleChange
    }),
    React.createElement("div", { style: styles.divider }),
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "r",
      value: rgb.r,
      onChange: handleChange
    }),
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "g",
      value: rgb.g,
      onChange: handleChange
    }),
    React.createElement(EditableInput, {
      style: { wrap: styles.RGBwrap, input: styles.RGBinput, label: styles.RGBlabel },
      label: "b",
      value: rgb.b,
      onChange: handleChange
    }),
    React.createElement("div", { style: styles.divider }),
    React.createElement(EditableInput, {
      style: { wrap: styles.HEXwrap, input: styles.HEXinput, label: styles.HEXlabel },
      label: "#",
      value: hex.replace("#", ""),
      onChange: handleChange
    }),
    React.createElement(
      "div",
      { style: styles.fieldSymbols },
      React.createElement(
        "div",
        { style: styles.symbol },
        "°"
      ),
      React.createElement(
        "div",
        { style: styles.symbol },
        "%"
      ),
      React.createElement(
        "div",
        { style: styles.symbol },
        "%"
      )
    )
  );
}, "PhotoshopPicker");
var PhotoshopPointerCircle$1 = /* @__PURE__ */ __name(function PhotoshopPointerCircle(_ref) {
  var hsl = _ref.hsl;
  var styles = reactCSS({
    "default": {
      picker: {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        boxShadow: "inset 0 0 0 1px #fff",
        transform: "translate(-6px, -6px)"
      }
    },
    "black-outline": {
      picker: {
        boxShadow: "inset 0 0 0 1px #000"
      }
    }
  }, { "black-outline": hsl.l > 0.5 });
  return React.createElement("div", { style: styles.picker });
}, "PhotoshopPointerCircle");
var PhotoshopPointerCircle2 = /* @__PURE__ */ __name(function PhotoshopPointerCircle3() {
  var styles = reactCSS({
    "default": {
      triangle: {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "4px 0 4px 6px",
        borderColor: "transparent transparent transparent #fff",
        position: "absolute",
        top: "1px",
        left: "1px"
      },
      triangleBorder: {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "5px 0 5px 8px",
        borderColor: "transparent transparent transparent #555"
      },
      left: {
        Extend: "triangleBorder",
        transform: "translate(-13px, -4px)"
      },
      leftInside: {
        Extend: "triangle",
        transform: "translate(-8px, -5px)"
      },
      right: {
        Extend: "triangleBorder",
        transform: "translate(20px, -14px) rotate(180deg)"
      },
      rightInside: {
        Extend: "triangle",
        transform: "translate(-8px, -5px)"
      }
    }
  });
  return React.createElement(
    "div",
    { style: styles.pointer },
    React.createElement(
      "div",
      { style: styles.left },
      React.createElement("div", { style: styles.leftInside })
    ),
    React.createElement(
      "div",
      { style: styles.right },
      React.createElement("div", { style: styles.rightInside })
    )
  );
}, "PhotoshopPointerCircle");
var PhotoshopButton = /* @__PURE__ */ __name(function PhotoshopButton2(_ref) {
  var onClick = _ref.onClick, label = _ref.label, children = _ref.children, active2 = _ref.active;
  var styles = reactCSS({
    "default": {
      button: {
        backgroundImage: "linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%)",
        border: "1px solid #878787",
        borderRadius: "2px",
        height: "20px",
        boxShadow: "0 1px 0 0 #EAEAEA",
        fontSize: "14px",
        color: "#000",
        lineHeight: "20px",
        textAlign: "center",
        marginBottom: "10px",
        cursor: "pointer"
      }
    },
    "active": {
      button: {
        boxShadow: "0 0 0 1px #878787"
      }
    }
  }, { active: active2 });
  return React.createElement(
    "div",
    { style: styles.button, onClick },
    label || children
  );
}, "PhotoshopButton");
var PhotoshopPreviews = /* @__PURE__ */ __name(function PhotoshopPreviews2(_ref) {
  var rgb = _ref.rgb, currentColor = _ref.currentColor;
  var styles = reactCSS({
    "default": {
      swatches: {
        border: "1px solid #B3B3B3",
        borderBottom: "1px solid #F0F0F0",
        marginBottom: "2px",
        marginTop: "1px"
      },
      new: {
        height: "34px",
        background: "rgb(" + rgb.r + "," + rgb.g + ", " + rgb.b + ")",
        boxShadow: "inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000"
      },
      current: {
        height: "34px",
        background: currentColor,
        boxShadow: "inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 -1px 0 #000"
      },
      label: {
        fontSize: "14px",
        color: "#000",
        textAlign: "center"
      }
    }
  });
  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { style: styles.label },
      "new"
    ),
    React.createElement(
      "div",
      { style: styles.swatches },
      React.createElement("div", { style: styles.new }),
      React.createElement("div", { style: styles.current })
    ),
    React.createElement(
      "div",
      { style: styles.label },
      "current"
    )
  );
}, "PhotoshopPreviews");
var _createClass = /* @__PURE__ */ (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  __name(defineProperties, "defineProperties");
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
__name(_classCallCheck, "_classCallCheck");
function _possibleConstructorReturn(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
__name(_possibleConstructorReturn, "_possibleConstructorReturn");
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
__name(_inherits, "_inherits");
var Photoshop = (function(_React$Component) {
  _inherits(Photoshop2, _React$Component);
  function Photoshop2(props) {
    _classCallCheck(this, Photoshop2);
    var _this = _possibleConstructorReturn(this, (Photoshop2.__proto__ || Object.getPrototypeOf(Photoshop2)).call(this));
    _this.state = {
      currentColor: props.hex
    };
    return _this;
  }
  __name(Photoshop2, "Photoshop");
  _createClass(Photoshop2, [{
    key: "render",
    value: /* @__PURE__ */ __name(function render3() {
      var _props = this.props, _props$styles = _props.styles, passedStyles = _props$styles === void 0 ? {} : _props$styles, _props$className = _props.className, className = _props$className === void 0 ? "" : _props$className;
      var styles = reactCSS(merge({
        "default": {
          picker: {
            background: "#DCDCDC",
            borderRadius: "4px",
            boxShadow: "0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)",
            boxSizing: "initial",
            width: "513px"
          },
          head: {
            backgroundImage: "linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)",
            borderBottom: "1px solid #B1B1B1",
            boxShadow: "inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)",
            height: "23px",
            lineHeight: "24px",
            borderRadius: "4px 4px 0 0",
            fontSize: "13px",
            color: "#4D4D4D",
            textAlign: "center"
          },
          body: {
            padding: "15px 15px 0",
            display: "flex"
          },
          saturation: {
            width: "256px",
            height: "256px",
            position: "relative",
            border: "2px solid #B3B3B3",
            borderBottom: "2px solid #F0F0F0",
            overflow: "hidden"
          },
          hue: {
            position: "relative",
            height: "256px",
            width: "19px",
            marginLeft: "10px",
            border: "2px solid #B3B3B3",
            borderBottom: "2px solid #F0F0F0"
          },
          controls: {
            width: "180px",
            marginLeft: "10px"
          },
          top: {
            display: "flex"
          },
          previews: {
            width: "60px"
          },
          actions: {
            flex: "1",
            marginLeft: "20px"
          }
        }
      }, passedStyles));
      return React.createElement(
        "div",
        { style: styles.picker, className: "photoshop-picker " + className },
        React.createElement(
          "div",
          { style: styles.head },
          this.props.header
        ),
        React.createElement(
          "div",
          { style: styles.body, className: "flexbox-fix" },
          React.createElement(
            "div",
            { style: styles.saturation },
            React.createElement(Saturation, {
              hsl: this.props.hsl,
              hsv: this.props.hsv,
              pointer: PhotoshopPointerCircle$1,
              onChange: this.props.onChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.hue },
            React.createElement(Hue, {
              direction: "vertical",
              hsl: this.props.hsl,
              pointer: PhotoshopPointerCircle2,
              onChange: this.props.onChange
            })
          ),
          React.createElement(
            "div",
            { style: styles.controls },
            React.createElement(
              "div",
              { style: styles.top, className: "flexbox-fix" },
              React.createElement(
                "div",
                { style: styles.previews },
                React.createElement(PhotoshopPreviews, {
                  rgb: this.props.rgb,
                  currentColor: this.state.currentColor
                })
              ),
              React.createElement(
                "div",
                { style: styles.actions },
                React.createElement(PhotoshopButton, { label: "OK", onClick: this.props.onAccept, active: true }),
                React.createElement(PhotoshopButton, { label: "Cancel", onClick: this.props.onCancel }),
                React.createElement(PhotoshopPicker, {
                  onChange: this.props.onChange,
                  rgb: this.props.rgb,
                  hsv: this.props.hsv,
                  hex: this.props.hex
                })
              )
            )
          )
        )
      );
    }, "render")
  }]);
  return Photoshop2;
})(React.Component);
Photoshop.propTypes = {
  header: PropTypes.string,
  styles: PropTypes.object
};
Photoshop.defaultProps = {
  header: "Color Picker",
  styles: {}
};
ColorWrap(Photoshop);
var SketchFields = /* @__PURE__ */ __name(function SketchFields2(_ref) {
  var onChange = _ref.onChange, rgb = _ref.rgb, hsl = _ref.hsl, hex = _ref.hex, disableAlpha = _ref.disableAlpha;
  var styles = reactCSS({
    "default": {
      fields: {
        display: "flex",
        paddingTop: "4px"
      },
      single: {
        flex: "1",
        paddingLeft: "6px"
      },
      alpha: {
        flex: "1",
        paddingLeft: "6px"
      },
      double: {
        flex: "2"
      },
      input: {
        width: "80%",
        padding: "4px 10% 3px",
        border: "none",
        boxShadow: "inset 0 0 0 1px #ccc",
        fontSize: "11px"
      },
      label: {
        display: "block",
        textAlign: "center",
        fontSize: "11px",
        color: "#222",
        paddingTop: "3px",
        paddingBottom: "4px",
        textTransform: "capitalize"
      }
    },
    "disableAlpha": {
      alpha: {
        display: "none"
      }
    }
  }, { disableAlpha });
  var handleChange = /* @__PURE__ */ __name(function handleChange2(data, e) {
    if (data.hex) {
      isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: "hex"
      }, e);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        a: rgb.a,
        source: "rgb"
      }, e);
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }
      data.a /= 100;
      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: data.a,
        source: "rgb"
      }, e);
    }
  }, "handleChange");
  return React.createElement(
    "div",
    { style: styles.fields, className: "flexbox-fix" },
    React.createElement(
      "div",
      { style: styles.double },
      React.createElement(EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: "hex",
        value: hex.replace("#", ""),
        onChange: handleChange
      })
    ),
    React.createElement(
      "div",
      { style: styles.single },
      React.createElement(EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: "r",
        value: rgb.r,
        onChange: handleChange,
        dragLabel: "true",
        dragMax: "255"
      })
    ),
    React.createElement(
      "div",
      { style: styles.single },
      React.createElement(EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: "g",
        value: rgb.g,
        onChange: handleChange,
        dragLabel: "true",
        dragMax: "255"
      })
    ),
    React.createElement(
      "div",
      { style: styles.single },
      React.createElement(EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: "b",
        value: rgb.b,
        onChange: handleChange,
        dragLabel: "true",
        dragMax: "255"
      })
    ),
    React.createElement(
      "div",
      { style: styles.alpha },
      React.createElement(EditableInput, {
        style: { input: styles.input, label: styles.label },
        label: "a",
        value: Math.round(rgb.a * 100),
        onChange: handleChange,
        dragLabel: "true",
        dragMax: "100"
      })
    )
  );
}, "SketchFields");
var _extends$1 = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var SketchPresetColors = /* @__PURE__ */ __name(function SketchPresetColors2(_ref) {
  var colors = _ref.colors, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, onSwatchHover = _ref.onSwatchHover;
  var styles = reactCSS({
    "default": {
      colors: {
        margin: "0 -10px",
        padding: "10px 0 0 10px",
        borderTop: "1px solid #eee",
        display: "flex",
        flexWrap: "wrap",
        position: "relative"
      },
      swatchWrap: {
        width: "16px",
        height: "16px",
        margin: "0 10px 10px 0"
      },
      swatch: {
        borderRadius: "3px",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15)"
      }
    },
    "no-presets": {
      colors: {
        display: "none"
      }
    }
  }, {
    "no-presets": !colors || !colors.length
  });
  var handleClick = /* @__PURE__ */ __name(function handleClick2(hex, e) {
    onClick({
      hex,
      source: "hex"
    }, e);
  }, "handleClick");
  return React.createElement(
    "div",
    { style: styles.colors, className: "flexbox-fix" },
    colors.map(function(colorObjOrString) {
      var c = typeof colorObjOrString === "string" ? { color: colorObjOrString } : colorObjOrString;
      var key = "" + c.color + (c.title || "");
      return React.createElement(
        "div",
        { key, style: styles.swatchWrap },
        React.createElement(Swatch$1, _extends$1({}, c, {
          style: styles.swatch,
          onClick: handleClick,
          onHover: onSwatchHover,
          focusStyle: {
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px " + c.color
          }
        }))
      );
    })
  );
}, "SketchPresetColors");
SketchPresetColors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    color: PropTypes.string,
    title: PropTypes.string
  })])).isRequired
};
var _extends = Object.assign || function(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var Sketch = /* @__PURE__ */ __name(function Sketch2(_ref) {
  var width = _ref.width, rgb = _ref.rgb, hex = _ref.hex, hsv = _ref.hsv, hsl = _ref.hsl, onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, disableAlpha = _ref.disableAlpha, presetColors = _ref.presetColors, renderers = _ref.renderers, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": _extends({
      picker: {
        width,
        padding: "10px 10px 0",
        boxSizing: "initial",
        background: "#fff",
        borderRadius: "4px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)"
      },
      saturation: {
        width: "100%",
        paddingBottom: "75%",
        position: "relative",
        overflow: "hidden"
      },
      Saturation: {
        radius: "3px",
        shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
      },
      controls: {
        display: "flex"
      },
      sliders: {
        padding: "4px 0",
        flex: "1"
      },
      color: {
        width: "24px",
        height: "24px",
        position: "relative",
        marginTop: "4px",
        marginLeft: "4px",
        borderRadius: "3px"
      },
      activeColor: {
        absolute: "0px 0px 0px 0px",
        borderRadius: "2px",
        background: "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + rgb.a + ")",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
      },
      hue: {
        position: "relative",
        height: "10px",
        overflow: "hidden"
      },
      Hue: {
        radius: "2px",
        shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
      },
      alpha: {
        position: "relative",
        height: "10px",
        marginTop: "4px",
        overflow: "hidden"
      },
      Alpha: {
        radius: "2px",
        shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
      }
    }, passedStyles),
    "disableAlpha": {
      color: {
        height: "10px"
      },
      hue: {
        height: "10px"
      },
      alpha: {
        display: "none"
      }
    }
  }, passedStyles), { disableAlpha });
  return React.createElement(
    "div",
    { style: styles.picker, className: "sketch-picker " + className },
    React.createElement(
      "div",
      { style: styles.saturation },
      React.createElement(Saturation, {
        style: styles.Saturation,
        hsl,
        hsv,
        onChange
      })
    ),
    React.createElement(
      "div",
      { style: styles.controls, className: "flexbox-fix" },
      React.createElement(
        "div",
        { style: styles.sliders },
        React.createElement(
          "div",
          { style: styles.hue },
          React.createElement(Hue, {
            style: styles.Hue,
            hsl,
            onChange
          })
        ),
        React.createElement(
          "div",
          { style: styles.alpha },
          React.createElement(Alpha, {
            style: styles.Alpha,
            rgb,
            hsl,
            renderers,
            onChange
          })
        )
      ),
      React.createElement(
        "div",
        { style: styles.color },
        React.createElement(Checkboard, null),
        React.createElement("div", { style: styles.activeColor })
      )
    ),
    React.createElement(SketchFields, {
      rgb,
      hsl,
      hex,
      onChange,
      disableAlpha
    }),
    React.createElement(SketchPresetColors, {
      colors: presetColors,
      onClick: onChange,
      onSwatchHover
    })
  );
}, "Sketch");
Sketch.propTypes = {
  disableAlpha: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styles: PropTypes.object
};
Sketch.defaultProps = {
  disableAlpha: false,
  width: 200,
  styles: {},
  presetColors: ["#D0021B", "#F5A623", "#F8E71C", "#8B572A", "#7ED321", "#417505", "#BD10E0", "#9013FE", "#4A90E2", "#50E3C2", "#B8E986", "#000000", "#4A4A4A", "#9B9B9B", "#FFFFFF"]
};
ColorWrap(Sketch);
var SliderSwatch = /* @__PURE__ */ __name(function SliderSwatch2(_ref) {
  var hsl = _ref.hsl, offset = _ref.offset, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, active2 = _ref.active, first = _ref.first, last = _ref.last;
  var styles = reactCSS({
    "default": {
      swatch: {
        height: "12px",
        background: "hsl(" + hsl.h + ", 50%, " + offset * 100 + "%)",
        cursor: "pointer"
      }
    },
    "first": {
      swatch: {
        borderRadius: "2px 0 0 2px"
      }
    },
    "last": {
      swatch: {
        borderRadius: "0 2px 2px 0"
      }
    },
    "active": {
      swatch: {
        transform: "scaleY(1.8)",
        borderRadius: "3.6px/2px"
      }
    }
  }, { active: active2, first, last });
  var handleClick = /* @__PURE__ */ __name(function handleClick2(e) {
    return onClick({
      h: hsl.h,
      s: 0.5,
      l: offset,
      source: "hsl"
    }, e);
  }, "handleClick");
  return React.createElement("div", { style: styles.swatch, onClick: handleClick });
}, "SliderSwatch");
var SliderSwatches = /* @__PURE__ */ __name(function SliderSwatches2(_ref) {
  var onClick = _ref.onClick, hsl = _ref.hsl;
  var styles = reactCSS({
    "default": {
      swatches: {
        marginTop: "20px"
      },
      swatch: {
        boxSizing: "border-box",
        width: "20%",
        paddingRight: "1px",
        float: "left"
      },
      clear: {
        clear: "both"
      }
    }
  });
  var epsilon = 0.1;
  return React.createElement(
    "div",
    { style: styles.swatches },
    React.createElement(
      "div",
      { style: styles.swatch },
      React.createElement(SliderSwatch, {
        hsl,
        offset: ".80",
        active: Math.abs(hsl.l - 0.8) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
        onClick,
        first: true
      })
    ),
    React.createElement(
      "div",
      { style: styles.swatch },
      React.createElement(SliderSwatch, {
        hsl,
        offset: ".65",
        active: Math.abs(hsl.l - 0.65) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
        onClick
      })
    ),
    React.createElement(
      "div",
      { style: styles.swatch },
      React.createElement(SliderSwatch, {
        hsl,
        offset: ".50",
        active: Math.abs(hsl.l - 0.5) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
        onClick
      })
    ),
    React.createElement(
      "div",
      { style: styles.swatch },
      React.createElement(SliderSwatch, {
        hsl,
        offset: ".35",
        active: Math.abs(hsl.l - 0.35) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
        onClick
      })
    ),
    React.createElement(
      "div",
      { style: styles.swatch },
      React.createElement(SliderSwatch, {
        hsl,
        offset: ".20",
        active: Math.abs(hsl.l - 0.2) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
        onClick,
        last: true
      })
    ),
    React.createElement("div", { style: styles.clear })
  );
}, "SliderSwatches");
var SliderPointer2 = /* @__PURE__ */ __name(function SliderPointer3() {
  var styles = reactCSS({
    "default": {
      picker: {
        width: "14px",
        height: "14px",
        borderRadius: "6px",
        transform: "translate(-7px, -1px)",
        backgroundColor: "rgb(248, 248, 248)",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
      }
    }
  });
  return React.createElement("div", { style: styles.picker });
}, "SliderPointer");
var Slider = /* @__PURE__ */ __name(function Slider2(_ref) {
  var hsl = _ref.hsl, onChange = _ref.onChange, pointer = _ref.pointer, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      hue: {
        height: "12px",
        position: "relative"
      },
      Hue: {
        radius: "2px"
      }
    }
  }, passedStyles));
  return React.createElement(
    "div",
    { style: styles.wrap || {}, className: "slider-picker " + className },
    React.createElement(
      "div",
      { style: styles.hue },
      React.createElement(Hue, {
        style: styles.Hue,
        hsl,
        pointer,
        onChange
      })
    ),
    React.createElement(
      "div",
      { style: styles.swatches },
      React.createElement(SliderSwatches, { hsl, onClick: onChange })
    )
  );
}, "Slider");
Slider.propTypes = {
  styles: PropTypes.object
};
Slider.defaultProps = {
  pointer: SliderPointer2,
  styles: {}
};
ColorWrap(Slider);
var CheckIcon$1 = {};
var hasRequiredCheckIcon;
function requireCheckIcon() {
  if (hasRequiredCheckIcon) return CheckIcon$1;
  hasRequiredCheckIcon = 1;
  Object.defineProperty(CheckIcon$1, "__esModule", {
    value: true
  });
  var _extends2 = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  var _react = requireReact();
  var _react2 = _interopRequireDefault(_react);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  __name(_interopRequireDefault, "_interopRequireDefault");
  function _objectWithoutProperties(obj, keys2) {
    var target = {};
    for (var i in obj) {
      if (keys2.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }
    return target;
  }
  __name(_objectWithoutProperties, "_objectWithoutProperties");
  var DEFAULT_SIZE = 24;
  CheckIcon$1.default = function(_ref) {
    var _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "currentColor" : _ref$fill, _ref$width = _ref.width, width = _ref$width === void 0 ? DEFAULT_SIZE : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? DEFAULT_SIZE : _ref$height, _ref$style = _ref.style, style = _ref$style === void 0 ? {} : _ref$style, props = _objectWithoutProperties(_ref, ["fill", "width", "height", "style"]);
    return _react2.default.createElement(
      "svg",
      _extends2({
        viewBox: "0 0 " + DEFAULT_SIZE + " " + DEFAULT_SIZE,
        style: _extends2({ fill, width, height }, style)
      }, props),
      _react2.default.createElement("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" })
    );
  };
  return CheckIcon$1;
}
__name(requireCheckIcon, "requireCheckIcon");
var CheckIconExports = requireCheckIcon();
const CheckIcon = /* @__PURE__ */ getDefaultExportFromCjs(CheckIconExports);
var SwatchesColor = /* @__PURE__ */ __name(function SwatchesColor2(_ref) {
  var color = _ref.color, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, onSwatchHover = _ref.onSwatchHover, first = _ref.first, last = _ref.last, active2 = _ref.active;
  var styles = reactCSS({
    "default": {
      color: {
        width: "40px",
        height: "24px",
        cursor: "pointer",
        background: color,
        marginBottom: "1px"
      },
      check: {
        color: getContrastingColor(color),
        marginLeft: "8px",
        display: "none"
      }
    },
    "first": {
      color: {
        overflow: "hidden",
        borderRadius: "2px 2px 0 0"
      }
    },
    "last": {
      color: {
        overflow: "hidden",
        borderRadius: "0 0 2px 2px"
      }
    },
    "active": {
      check: {
        display: "block"
      }
    },
    "color-#FFFFFF": {
      color: {
        boxShadow: "inset 0 0 0 1px #ddd"
      },
      check: {
        color: "#333"
      }
    },
    "transparent": {
      check: {
        color: "#333"
      }
    }
  }, {
    first,
    last,
    active: active2,
    "color-#FFFFFF": color === "#FFFFFF",
    "transparent": color === "transparent"
  });
  return React.createElement(
    Swatch$1,
    {
      color,
      style: styles.color,
      onClick,
      onHover: onSwatchHover,
      focusStyle: { boxShadow: "0 0 4px " + color }
    },
    React.createElement(
      "div",
      { style: styles.check },
      React.createElement(CheckIcon, null)
    )
  );
}, "SwatchesColor");
var SwatchesGroup = /* @__PURE__ */ __name(function SwatchesGroup2(_ref) {
  var onClick = _ref.onClick, onSwatchHover = _ref.onSwatchHover, group = _ref.group, active2 = _ref.active;
  var styles = reactCSS({
    "default": {
      group: {
        paddingBottom: "10px",
        width: "40px",
        float: "left",
        marginRight: "10px"
      }
    }
  });
  return React.createElement(
    "div",
    { style: styles.group },
    map(group, function(color, i) {
      return React.createElement(SwatchesColor, {
        key: color,
        color,
        active: color.toLowerCase() === active2,
        first: i === 0,
        last: i === group.length - 1,
        onClick,
        onSwatchHover
      });
    })
  );
}, "SwatchesGroup");
var Swatches = /* @__PURE__ */ __name(function Swatches2(_ref) {
  var width = _ref.width, height = _ref.height, onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, colors = _ref.colors, hex = _ref.hex, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      picker: {
        width,
        height
      },
      overflow: {
        height,
        overflowY: "scroll"
      },
      body: {
        padding: "16px 0 6px 16px"
      },
      clear: {
        clear: "both"
      }
    }
  }, passedStyles));
  var handleChange = /* @__PURE__ */ __name(function handleChange2(data, e) {
    return onChange({ hex: data, source: "hex" }, e);
  }, "handleChange");
  return React.createElement(
    "div",
    { style: styles.picker, className: "swatches-picker " + className },
    React.createElement(
      Raised,
      null,
      React.createElement(
        "div",
        { style: styles.overflow },
        React.createElement(
          "div",
          { style: styles.body },
          map(colors, function(group) {
            return React.createElement(SwatchesGroup, {
              key: group.toString(),
              group,
              active: hex,
              onClick: handleChange,
              onSwatchHover
            });
          }),
          React.createElement("div", { style: styles.clear })
        )
      )
    )
  );
}, "Swatches");
Swatches.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  styles: PropTypes.object
  /* eslint-disable max-len */
};
Swatches.defaultProps = {
  width: 320,
  height: 240,
  colors: [[red["900"], red["700"], red["500"], red["300"], red["100"]], [pink["900"], pink["700"], pink["500"], pink["300"], pink["100"]], [purple["900"], purple["700"], purple["500"], purple["300"], purple["100"]], [deepPurple["900"], deepPurple["700"], deepPurple["500"], deepPurple["300"], deepPurple["100"]], [indigo["900"], indigo["700"], indigo["500"], indigo["300"], indigo["100"]], [blue["900"], blue["700"], blue["500"], blue["300"], blue["100"]], [lightBlue["900"], lightBlue["700"], lightBlue["500"], lightBlue["300"], lightBlue["100"]], [cyan["900"], cyan["700"], cyan["500"], cyan["300"], cyan["100"]], [teal["900"], teal["700"], teal["500"], teal["300"], teal["100"]], ["#194D33", green["700"], green["500"], green["300"], green["100"]], [lightGreen["900"], lightGreen["700"], lightGreen["500"], lightGreen["300"], lightGreen["100"]], [lime["900"], lime["700"], lime["500"], lime["300"], lime["100"]], [yellow["900"], yellow["700"], yellow["500"], yellow["300"], yellow["100"]], [amber["900"], amber["700"], amber["500"], amber["300"], amber["100"]], [orange["900"], orange["700"], orange["500"], orange["300"], orange["100"]], [deepOrange["900"], deepOrange["700"], deepOrange["500"], deepOrange["300"], deepOrange["100"]], [brown["900"], brown["700"], brown["500"], brown["300"], brown["100"]], [blueGrey["900"], blueGrey["700"], blueGrey["500"], blueGrey["300"], blueGrey["100"]], ["#000000", "#525252", "#969696", "#D9D9D9", "#FFFFFF"]],
  styles: {}
};
ColorWrap(Swatches);
var Twitter = /* @__PURE__ */ __name(function Twitter2(_ref) {
  var onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, hex = _ref.hex, colors = _ref.colors, width = _ref.width, triangle = _ref.triangle, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      card: {
        width,
        background: "#fff",
        border: "0 solid rgba(0,0,0,0.25)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        borderRadius: "4px",
        position: "relative"
      },
      body: {
        padding: "15px 9px 9px 15px"
      },
      label: {
        fontSize: "18px",
        color: "#fff"
      },
      triangle: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 9px 10px 9px",
        borderColor: "transparent transparent #fff transparent",
        position: "absolute"
      },
      triangleShadow: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 9px 10px 9px",
        borderColor: "transparent transparent rgba(0,0,0,.1) transparent",
        position: "absolute"
      },
      hash: {
        background: "#F0F0F0",
        height: "30px",
        width: "30px",
        borderRadius: "4px 0 0 4px",
        float: "left",
        color: "#98A1A4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      input: {
        width: "100px",
        fontSize: "14px",
        color: "#666",
        border: "0px",
        outline: "none",
        height: "28px",
        boxShadow: "inset 0 0 0 1px #F0F0F0",
        boxSizing: "content-box",
        borderRadius: "0 4px 4px 0",
        float: "left",
        paddingLeft: "8px"
      },
      swatch: {
        width: "30px",
        height: "30px",
        float: "left",
        borderRadius: "4px",
        margin: "0 6px 6px 0"
      },
      clear: {
        clear: "both"
      }
    },
    "hide-triangle": {
      triangle: {
        display: "none"
      },
      triangleShadow: {
        display: "none"
      }
    },
    "top-left-triangle": {
      triangle: {
        top: "-10px",
        left: "12px"
      },
      triangleShadow: {
        top: "-11px",
        left: "12px"
      }
    },
    "top-right-triangle": {
      triangle: {
        top: "-10px",
        right: "12px"
      },
      triangleShadow: {
        top: "-11px",
        right: "12px"
      }
    }
  }, passedStyles), {
    "hide-triangle": triangle === "hide",
    "top-left-triangle": triangle === "top-left",
    "top-right-triangle": triangle === "top-right"
  });
  var handleChange = /* @__PURE__ */ __name(function handleChange2(hexcode, e) {
    isValidHex(hexcode) && onChange({
      hex: hexcode,
      source: "hex"
    }, e);
  }, "handleChange");
  return React.createElement(
    "div",
    { style: styles.card, className: "twitter-picker " + className },
    React.createElement("div", { style: styles.triangleShadow }),
    React.createElement("div", { style: styles.triangle }),
    React.createElement(
      "div",
      { style: styles.body },
      map(colors, function(c, i) {
        return React.createElement(Swatch$1, {
          key: i,
          color: c,
          hex: c,
          style: styles.swatch,
          onClick: handleChange,
          onHover: onSwatchHover,
          focusStyle: {
            boxShadow: "0 0 4px " + c
          }
        });
      }),
      React.createElement(
        "div",
        { style: styles.hash },
        "#"
      ),
      React.createElement(EditableInput, {
        label: null,
        style: { input: styles.input },
        value: hex.replace("#", ""),
        onChange: handleChange
      }),
      React.createElement("div", { style: styles.clear })
    )
  );
}, "Twitter");
Twitter.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  triangle: PropTypes.oneOf(["hide", "top-left", "top-right"]),
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object
};
Twitter.defaultProps = {
  width: 276,
  colors: ["#FF6900", "#FCB900", "#7BDCB5", "#00D084", "#8ED1FC", "#0693E3", "#ABB8C3", "#EB144C", "#F78DA7", "#9900EF"],
  triangle: "top-left",
  styles: {}
};
ColorWrap(Twitter);
var GooglePointerCircle = /* @__PURE__ */ __name(function GooglePointerCircle2(props) {
  var styles = reactCSS({
    "default": {
      picker: {
        width: "20px",
        height: "20px",
        borderRadius: "22px",
        border: "2px #fff solid",
        transform: "translate(-12px, -13px)",
        background: "hsl(" + Math.round(props.hsl.h) + ", " + Math.round(props.hsl.s * 100) + "%, " + Math.round(props.hsl.l * 100) + "%)"
      }
    }
  });
  return React.createElement("div", { style: styles.picker });
}, "GooglePointerCircle");
GooglePointerCircle.propTypes = {
  hsl: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
    a: PropTypes.number
  })
};
GooglePointerCircle.defaultProps = {
  hsl: { a: 1, h: 249.94, l: 0.2, s: 0.5 }
};
var GooglePointer = /* @__PURE__ */ __name(function GooglePointer2(props) {
  var styles = reactCSS({
    "default": {
      picker: {
        width: "20px",
        height: "20px",
        borderRadius: "22px",
        transform: "translate(-10px, -7px)",
        background: "hsl(" + Math.round(props.hsl.h) + ", 100%, 50%)",
        border: "2px white solid"
      }
    }
  });
  return React.createElement("div", { style: styles.picker });
}, "GooglePointer");
GooglePointer.propTypes = {
  hsl: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
    a: PropTypes.number
  })
};
GooglePointer.defaultProps = {
  hsl: { a: 1, h: 249.94, l: 0.2, s: 0.5 }
};
var GoogleFields = /* @__PURE__ */ __name(function GoogleFields2(_ref) {
  var onChange = _ref.onChange, rgb = _ref.rgb, hsl = _ref.hsl, hex = _ref.hex, hsv = _ref.hsv;
  var handleChange = /* @__PURE__ */ __name(function handleChange2(data, e) {
    if (data.hex) {
      isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: "hex"
      }, e);
    } else if (data.rgb) {
      var values = data.rgb.split(",");
      isvalidColorString(data.rgb, "rgb") && onChange({
        r: values[0],
        g: values[1],
        b: values[2],
        a: 1,
        source: "rgb"
      }, e);
    } else if (data.hsv) {
      var _values = data.hsv.split(",");
      if (isvalidColorString(data.hsv, "hsv")) {
        _values[2] = _values[2].replace("%", "");
        _values[1] = _values[1].replace("%", "");
        _values[0] = _values[0].replace("°", "");
        if (_values[1] == 1) {
          _values[1] = 0.01;
        } else if (_values[2] == 1) {
          _values[2] = 0.01;
        }
        onChange({
          h: Number(_values[0]),
          s: Number(_values[1]),
          v: Number(_values[2]),
          source: "hsv"
        }, e);
      }
    } else if (data.hsl) {
      var _values2 = data.hsl.split(",");
      if (isvalidColorString(data.hsl, "hsl")) {
        _values2[2] = _values2[2].replace("%", "");
        _values2[1] = _values2[1].replace("%", "");
        _values2[0] = _values2[0].replace("°", "");
        if (hsvValue[1] == 1) {
          hsvValue[1] = 0.01;
        } else if (hsvValue[2] == 1) {
          hsvValue[2] = 0.01;
        }
        onChange({
          h: Number(_values2[0]),
          s: Number(_values2[1]),
          v: Number(_values2[2]),
          source: "hsl"
        }, e);
      }
    }
  }, "handleChange");
  var styles = reactCSS({
    "default": {
      wrap: {
        display: "flex",
        height: "100px",
        marginTop: "4px"
      },
      fields: {
        width: "100%"
      },
      column: {
        paddingTop: "10px",
        display: "flex",
        justifyContent: "space-between"
      },
      double: {
        padding: "0px 4.4px",
        boxSizing: "border-box"
      },
      input: {
        width: "100%",
        height: "38px",
        boxSizing: "border-box",
        padding: "4px 10% 3px",
        textAlign: "center",
        border: "1px solid #dadce0",
        fontSize: "11px",
        textTransform: "lowercase",
        borderRadius: "5px",
        outline: "none",
        fontFamily: "Roboto,Arial,sans-serif"
      },
      input2: {
        height: "38px",
        width: "100%",
        border: "1px solid #dadce0",
        boxSizing: "border-box",
        fontSize: "11px",
        textTransform: "lowercase",
        borderRadius: "5px",
        outline: "none",
        paddingLeft: "10px",
        fontFamily: "Roboto,Arial,sans-serif"
      },
      label: {
        textAlign: "center",
        fontSize: "12px",
        background: "#fff",
        position: "absolute",
        textTransform: "uppercase",
        color: "#3c4043",
        width: "35px",
        top: "-6px",
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: "Roboto,Arial,sans-serif"
      },
      label2: {
        left: "10px",
        textAlign: "center",
        fontSize: "12px",
        background: "#fff",
        position: "absolute",
        textTransform: "uppercase",
        color: "#3c4043",
        width: "32px",
        top: "-6px",
        fontFamily: "Roboto,Arial,sans-serif"
      },
      single: {
        flexGrow: "1",
        margin: "0px 4.4px"
      }
    }
  });
  var rgbValue = rgb.r + ", " + rgb.g + ", " + rgb.b;
  var hslValue = Math.round(hsl.h) + "°, " + Math.round(hsl.s * 100) + "%, " + Math.round(hsl.l * 100) + "%";
  var hsvValue = Math.round(hsv.h) + "°, " + Math.round(hsv.s * 100) + "%, " + Math.round(hsv.v * 100) + "%";
  return React.createElement(
    "div",
    { style: styles.wrap, className: "flexbox-fix" },
    React.createElement(
      "div",
      { style: styles.fields },
      React.createElement(
        "div",
        { style: styles.double },
        React.createElement(EditableInput, {
          style: { input: styles.input, label: styles.label },
          label: "hex",
          value: hex,
          onChange: handleChange
        })
      ),
      React.createElement(
        "div",
        { style: styles.column },
        React.createElement(
          "div",
          { style: styles.single },
          React.createElement(EditableInput, {
            style: { input: styles.input2, label: styles.label2 },
            label: "rgb",
            value: rgbValue,
            onChange: handleChange
          })
        ),
        React.createElement(
          "div",
          { style: styles.single },
          React.createElement(EditableInput, {
            style: { input: styles.input2, label: styles.label2 },
            label: "hsv",
            value: hsvValue,
            onChange: handleChange
          })
        ),
        React.createElement(
          "div",
          { style: styles.single },
          React.createElement(EditableInput, {
            style: { input: styles.input2, label: styles.label2 },
            label: "hsl",
            value: hslValue,
            onChange: handleChange
          })
        )
      )
    )
  );
}, "GoogleFields");
var Google = /* @__PURE__ */ __name(function Google2(_ref) {
  var width = _ref.width, onChange = _ref.onChange, rgb = _ref.rgb, hsl = _ref.hsl, hsv = _ref.hsv, hex = _ref.hex, header = _ref.header, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles = reactCSS(merge({
    "default": {
      picker: {
        width,
        background: "#fff",
        border: "1px solid #dfe1e5",
        boxSizing: "initial",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "8px 8px 0px 0px"
      },
      head: {
        height: "57px",
        width: "100%",
        paddingTop: "16px",
        paddingBottom: "16px",
        paddingLeft: "16px",
        fontSize: "20px",
        boxSizing: "border-box",
        fontFamily: "Roboto-Regular,HelveticaNeue,Arial,sans-serif"
      },
      saturation: {
        width: "70%",
        padding: "0px",
        position: "relative",
        overflow: "hidden"
      },
      swatch: {
        width: "30%",
        height: "228px",
        padding: "0px",
        background: "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 1)",
        position: "relative",
        overflow: "hidden"
      },
      body: {
        margin: "auto",
        width: "95%"
      },
      controls: {
        display: "flex",
        boxSizing: "border-box",
        height: "52px",
        paddingTop: "22px"
      },
      color: {
        width: "32px"
      },
      hue: {
        height: "8px",
        position: "relative",
        margin: "0px 16px 0px 16px",
        width: "100%"
      },
      Hue: {
        radius: "2px"
      }
    }
  }, passedStyles));
  return React.createElement(
    "div",
    { style: styles.picker, className: "google-picker " + className },
    React.createElement(
      "div",
      { style: styles.head },
      header
    ),
    React.createElement("div", { style: styles.swatch }),
    React.createElement(
      "div",
      { style: styles.saturation },
      React.createElement(Saturation, {
        hsl,
        hsv,
        pointer: GooglePointerCircle,
        onChange
      })
    ),
    React.createElement(
      "div",
      { style: styles.body },
      React.createElement(
        "div",
        { style: styles.controls, className: "flexbox-fix" },
        React.createElement(
          "div",
          { style: styles.hue },
          React.createElement(Hue, {
            style: styles.Hue,
            hsl,
            radius: "4px",
            pointer: GooglePointer,
            onChange
          })
        )
      ),
      React.createElement(GoogleFields, {
        rgb,
        hsl,
        hex,
        hsv,
        onChange
      })
    )
  );
}, "Google");
Google.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styles: PropTypes.object,
  header: PropTypes.string
};
Google.defaultProps = {
  width: 652,
  styles: {},
  header: "Color picker"
};
ColorWrap(Google);
export {
  ChromePicker as C,
  clsx as c,
  requirePropTypes as r,
  y
};

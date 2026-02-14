var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
import { a as React } from "./react-core-BiY6fgAJ.js";
const Events = [
  "abort",
  "canplay",
  "canplaythrough",
  "durationchange",
  "emptied",
  "encrypted",
  "ended",
  "error",
  "loadeddata",
  "loadedmetadata",
  "loadstart",
  "pause",
  "play",
  "playing",
  "progress",
  "ratechange",
  "seeked",
  "seeking",
  "stalled",
  "suspend",
  "timeupdate",
  "volumechange",
  "waiting",
  "waitingforkey",
  "resize",
  "enterpictureinpicture",
  "leavepictureinpicture",
  "webkitbeginfullscreen",
  "webkitendfullscreen",
  "webkitpresentationmodechanged"
];
const template = globalThis.document?.createElement("template");
if (template) {
  template.innerHTML = /*html*/
  `
    <style>
      :host {
        display: inline-block;
        line-height: 0;
      }

      video,
      audio {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
      }
    </style>
    <slot></slot>
  `;
}
const SuperMediaMixin = /* @__PURE__ */ __name((superclass, { tag, is }) => {
  var _a2, _isDefined, _SuperMedia_static, define_fn, _isInit, _loadComplete, _hasLoaded, _isLoaded, _nativeEl, _standinEl, _SuperMedia_instances, init_fn, upgradeProperty_fn, initStandinEl_fn, initNativeEl_fn, loadSrc_fn, forwardAttribute_fn;
  const nativeElTest = globalThis.document?.createElement(tag, { is });
  const nativeElProps = nativeElTest ? getNativeElProps(nativeElTest) : [];
  return _a2 = class extends superclass {
    constructor() {
      super();
      __privateAdd(this, _SuperMedia_instances);
      __privateAdd(this, _isInit);
      __privateAdd(this, _loadComplete);
      __privateAdd(this, _hasLoaded, false);
      __privateAdd(this, _isLoaded, false);
      __privateAdd(this, _nativeEl);
      __privateAdd(this, _standinEl);
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
        this.shadowRoot.append(this.constructor.template.content.cloneNode(true));
      }
      if (this.load !== _a2.prototype.load) {
        this.loadComplete = new PublicPromise();
      }
    }
    static get observedAttributes() {
      var _a3;
      __privateMethod(_a3 = _a2, _SuperMedia_static, define_fn).call(_a3);
      const natAttrs = nativeElTest?.constructor?.observedAttributes ?? [];
      return [
        ...natAttrs,
        "autopictureinpicture",
        "disablepictureinpicture",
        "disableremoteplayback",
        "autoplay",
        "controls",
        "controlslist",
        "crossorigin",
        "loop",
        "muted",
        "playsinline",
        "poster",
        "preload",
        "src"
      ];
    }
    get loadComplete() {
      return __privateGet(this, _loadComplete);
    }
    set loadComplete(promise) {
      __privateSet(this, _isLoaded, false);
      __privateSet(this, _loadComplete, promise);
      promise?.then(() => {
        __privateSet(this, _isLoaded, true);
      });
    }
    get isLoaded() {
      return __privateGet(this, _isLoaded);
    }
    get nativeEl() {
      return __privateGet(this, _nativeEl) ?? this.shadowRoot.querySelector(tag) ?? this.querySelector(tag);
    }
    set nativeEl(val) {
      __privateSet(this, _nativeEl, val);
    }
    get defaultMuted() {
      return this.hasAttribute("muted");
    }
    set defaultMuted(val) {
      this.toggleAttribute("muted", Boolean(val));
    }
    get src() {
      return this.getAttribute("src");
    }
    set src(val) {
      this.setAttribute("src", `${val}`);
    }
    get preload() {
      return this.getAttribute("preload") ?? this.nativeEl?.preload;
    }
    set preload(val) {
      this.setAttribute("preload", `${val}`);
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
      if (attrName === "src" && this.load !== _a2.prototype.load) {
        __privateMethod(this, _SuperMedia_instances, loadSrc_fn).call(this);
      }
      __privateMethod(this, _SuperMedia_instances, forwardAttribute_fn).call(this, attrName, oldValue, newValue);
    }
    connectedCallback() {
      __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
    }
  }, _isDefined = new WeakMap(), _SuperMedia_static = new WeakSet(), define_fn = /* @__PURE__ */ __name(function() {
    if (__privateGet(this, _isDefined)) return;
    __privateSet(this, _isDefined, true);
    const propsToAttrs = new Set(this.observedAttributes);
    propsToAttrs.delete("muted");
    for (let prop of nativeElProps) {
      if (prop in this.prototype) continue;
      const type = typeof nativeElTest[prop];
      if (type == "function") {
        this.prototype[prop] = function(...args) {
          __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
          const fn = /* @__PURE__ */ __name(() => {
            if (this.call) return this.call(prop, ...args);
            return this.nativeEl[prop].apply(this.nativeEl, args);
          }, "fn");
          if (this.loadComplete && !this.isLoaded) {
            return this.loadComplete.then(fn);
          }
          return fn();
        };
      } else {
        let config = {
          get() {
            __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
            let attr = prop.toLowerCase();
            if (propsToAttrs.has(attr)) {
              const val = this.getAttribute(attr);
              return val === null ? false : val === "" ? true : val;
            }
            return this.get?.(prop) ?? this.nativeEl?.[prop] ?? __privateGet(this, _standinEl)[prop];
          }
        };
        if (prop !== prop.toUpperCase()) {
          config.set = async function(val) {
            __privateMethod(this, _SuperMedia_instances, init_fn).call(this);
            let attr = prop.toLowerCase();
            if (propsToAttrs.has(attr)) {
              if (val === true || val === false || val == null) {
                this.toggleAttribute(attr, Boolean(val));
              } else {
                this.setAttribute(attr, val);
              }
              return;
            }
            if (this.loadComplete && !this.isLoaded) await this.loadComplete;
            if (this.set) {
              this.set(prop, val);
              return;
            }
            this.nativeEl[prop] = val;
          };
        }
        Object.defineProperty(this.prototype, prop, config);
      }
    }
  }, "#define"), _isInit = new WeakMap(), _loadComplete = new WeakMap(), _hasLoaded = new WeakMap(), _isLoaded = new WeakMap(), _nativeEl = new WeakMap(), _standinEl = new WeakMap(), _SuperMedia_instances = new WeakSet(), init_fn = /* @__PURE__ */ __name(async function() {
    if (__privateGet(this, _isInit)) return;
    __privateSet(this, _isInit, true);
    __privateMethod(this, _SuperMedia_instances, initStandinEl_fn).call(this);
    __privateMethod(this, _SuperMedia_instances, initNativeEl_fn).call(this);
    for (let prop of nativeElProps)
      __privateMethod(this, _SuperMedia_instances, upgradeProperty_fn).call(this, prop);
    const childMap = /* @__PURE__ */ new Map();
    const slotEl = this.shadowRoot.querySelector("slot:not([name])");
    slotEl?.addEventListener("slotchange", () => {
      const removeNativeChildren = new Map(childMap);
      slotEl.assignedElements().filter((el) => ["track", "source"].includes(el.localName)).forEach(async (el) => {
        removeNativeChildren.delete(el);
        let clone = childMap.get(el);
        if (!clone) {
          clone = el.cloneNode();
          childMap.set(el, clone);
        }
        if (this.loadComplete && !this.isLoaded) await this.loadComplete;
        this.nativeEl.append?.(clone);
      });
      removeNativeChildren.forEach((el) => el.remove());
    });
    for (let type of this.constructor.Events) {
      this.shadowRoot.addEventListener?.(type, (evt) => {
        if (evt.target !== this.nativeEl) return;
        this.dispatchEvent(new CustomEvent(evt.type, { detail: evt.detail }));
      }, true);
    }
  }, "#init"), upgradeProperty_fn = /* @__PURE__ */ __name(function(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }, "#upgradeProperty"), initStandinEl_fn = /* @__PURE__ */ __name(function() {
    const dummyEl = document.createElement(tag, { is });
    dummyEl.muted = this.hasAttribute("muted");
    for (let { name, value } of this.attributes) {
      dummyEl.setAttribute(name, value);
    }
    __privateSet(this, _standinEl, {});
    for (let name of getNativeElProps(dummyEl)) {
      __privateGet(this, _standinEl)[name] = dummyEl[name];
    }
    dummyEl.removeAttribute("src");
    dummyEl.load();
  }, "#initStandinEl"), initNativeEl_fn = /* @__PURE__ */ __name(async function() {
    if (this.loadComplete && !this.isLoaded) await this.loadComplete;
    if (!this.nativeEl) {
      const nativeEl = document.createElement(tag, { is });
      nativeEl.part = tag;
      this.shadowRoot.append(nativeEl);
    }
    this.nativeEl.muted = this.hasAttribute("muted");
  }, "#initNativeEl"), loadSrc_fn = /* @__PURE__ */ __name(async function() {
    if (__privateGet(this, _hasLoaded)) this.loadComplete = new PublicPromise();
    __privateSet(this, _hasLoaded, true);
    await Promise.resolve();
    await this.load();
    this.loadComplete?.resolve();
    await this.loadComplete;
  }, "#loadSrc"), forwardAttribute_fn = /* @__PURE__ */ __name(async function(attrName, oldValue, newValue) {
    if (this.loadComplete && !this.isLoaded) await this.loadComplete;
    if (["id", "class", ...this.constructor.skipAttributes].includes(attrName)) {
      return;
    }
    if (newValue === null) {
      this.nativeEl.removeAttribute?.(attrName);
    } else {
      this.nativeEl.setAttribute?.(attrName, newValue);
    }
  }, "#forwardAttribute"), __privateAdd(_a2, _SuperMedia_static), __name(_a2, "SuperMedia"), __publicField(_a2, "Events", Events), __publicField(_a2, "template", template), __publicField(_a2, "skipAttributes", []), __privateAdd(_a2, _isDefined), _a2;
}, "SuperMediaMixin");
function getNativeElProps(nativeElTest) {
  let nativeElProps = [];
  for (let proto = Object.getPrototypeOf(nativeElTest); proto && proto !== HTMLElement.prototype; proto = Object.getPrototypeOf(proto)) {
    nativeElProps.push(...Object.getOwnPropertyNames(proto));
  }
  return nativeElProps;
}
__name(getNativeElProps, "getNativeElProps");
const _PublicPromise = class _PublicPromise extends Promise {
  constructor(executor = () => {
  }) {
    let res, rej;
    super((resolve, reject) => {
      executor(resolve, reject);
      res = resolve;
      rej = reject;
    });
    this.resolve = res;
    this.reject = rej;
  }
};
__name(_PublicPromise, "PublicPromise");
let PublicPromise = _PublicPromise;
const SuperVideoElement = globalThis.document ? SuperMediaMixin(HTMLElement, { tag: "video" }) : class {
};
globalThis.document ? SuperMediaMixin(HTMLElement, { tag: "audio" }) : class {
};
var _a, _b;
const templateLightDOM = (_a = globalThis.document) == null ? void 0 : _a.createElement("template");
if (templateLightDOM) {
  templateLightDOM.innerHTML = /*html*/
  `
  <div class="wistia_embed"></div>
  `;
}
const templateShadowDOM = (_b = globalThis.document) == null ? void 0 : _b.createElement("template");
if (templateShadowDOM) {
  templateShadowDOM.innerHTML = /*html*/
  `
  <style>
    :host {
      display: inline-block;
      min-width: 300px;
      min-height: 150px;
      position: relative;
    }
    ::slotted(.wistia_embed) {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  </style>
  <slot></slot>
  `;
}
const _WistiaVideoElement = class _WistiaVideoElement extends SuperVideoElement {
  get nativeEl() {
    var _a2;
    return ((_a2 = this.api) == null ? void 0 : _a2.elem()) ?? this.querySelector("video");
  }
  async load() {
    var _a2;
    (_a2 = this.querySelector(".wistia_embed")) == null ? void 0 : _a2.remove();
    if (!this.src) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
    const MATCH_SRC = /(?:wistia\.com|wi\.st)\/(?:medias|embed)\/(.*)$/i;
    const id = this.src.match(MATCH_SRC)[1];
    const options = {
      autoPlay: this.autoplay,
      preload: this.preload ?? "metadata",
      playsinline: this.playsInline,
      endVideoBehavior: this.loop && "loop",
      chromeless: !this.controls,
      playButton: this.controls,
      muted: this.defaultMuted
    };
    this.append(templateLightDOM.content.cloneNode(true));
    const div = this.querySelector(".wistia_embed");
    if (!div.id) div.id = uniqueId(id);
    div.classList.add(`wistia_async_${id}`);
    const scriptUrl = "https://fast.wistia.com/assets/external/E-v1.js";
    await loadScript(scriptUrl, "Wistia");
    this.api = await new Promise((onReady) => {
      globalThis._wq.push({
        id: div.id,
        onReady,
        options
      });
    });
  }
  async attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "controls") {
      await this.loadComplete;
      switch (attrName) {
        case "controls":
          this.api.bigPlayButtonEnabled(this.controls);
          this.controls ? this.api.releaseChromeless() : this.api.requestChromeless();
          break;
      }
      return;
    }
    super.attributeChangedCallback(attrName, oldValue, newValue);
  }
  // Override some methods w/ defaults if the video element is not ready yet when called.
  // Some methods require the Wistia API instead of the native video element API.
  get duration() {
    var _a2;
    return (_a2 = this.api) == null ? void 0 : _a2.duration();
  }
  async play() {
    await this.loadComplete;
    this.api.play();
    return new Promise((resolve) => this.addEventListener("playing", resolve));
  }
};
__name(_WistiaVideoElement, "WistiaVideoElement");
__publicField(_WistiaVideoElement, "template", templateShadowDOM);
__publicField(_WistiaVideoElement, "skipAttributes", ["src"]);
let WistiaVideoElement = _WistiaVideoElement;
const loadScriptCache = {};
async function loadScript(src, globalName) {
  if (loadScriptCache[src]) return loadScriptCache[src];
  if (self[globalName]) return self[globalName];
  return loadScriptCache[src] = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.defer = true;
    script.src = src;
    script.onload = () => resolve(self[globalName]);
    script.onerror = reject;
    document.head.append(script);
  });
}
__name(loadScript, "loadScript");
let idCounter = 0;
function uniqueId(prefix) {
  const id = ++idCounter;
  return `${prefix}${id}`;
}
__name(uniqueId, "uniqueId");
if (globalThis.customElements && !globalThis.customElements.get("wistia-video")) {
  globalThis.customElements.define("wistia-video", WistiaVideoElement);
}
var wistia_video_element_default = WistiaVideoElement;
var reservedReactProps = /* @__PURE__ */ new Set([
  "style",
  "children",
  "ref",
  "key",
  "suppressContentEditableWarning",
  "suppressHydrationWarning",
  "dangerouslySetInnerHTML"
]);
var reactPropToAttrNameMap = {
  className: "class",
  htmlFor: "for"
};
function defaultToAttributeName(propName) {
  return propName.toLowerCase();
}
__name(defaultToAttributeName, "defaultToAttributeName");
function defaultToAttributeValue(propValue) {
  if (typeof propValue === "boolean") return propValue ? "" : void 0;
  if (typeof propValue === "function") return void 0;
  if (typeof propValue === "object" && propValue !== null) return void 0;
  return propValue;
}
__name(defaultToAttributeValue, "defaultToAttributeValue");
function createComponent({
  react: React2,
  tagName,
  elementClass,
  events,
  displayName,
  defaultProps,
  toAttributeName = defaultToAttributeName,
  toAttributeValue = defaultToAttributeValue
}) {
  const IS_REACT_19_OR_NEWER = Number.parseInt(React2.version) >= 19;
  const ReactComponent = React2.forwardRef((props, ref) => {
    var _a2, _b2;
    const elementRef = React2.useRef(null);
    const prevElemPropsRef = React2.useRef(/* @__PURE__ */ new Map());
    const eventProps = {};
    const attrs = {};
    const reactProps = {};
    const elementProps = {};
    for (const [k, v] of Object.entries(props)) {
      if (reservedReactProps.has(k)) {
        reactProps[k] = v;
        continue;
      }
      const attrName = toAttributeName(reactPropToAttrNameMap[k] ?? k);
      if (elementClass.prototype && k in elementClass.prototype && !(k in (((_a2 = globalThis.HTMLElement) == null ? void 0 : _a2.prototype) ?? {})) && !((_b2 = elementClass.observedAttributes) == null ? void 0 : _b2.some((attr) => attr === attrName))) {
        elementProps[k] = v;
        continue;
      }
      if (k.startsWith("on")) {
        eventProps[k] = v;
        continue;
      }
      const attrValue = toAttributeValue(v);
      if (attrName && attrValue != null) {
        attrs[attrName] = String(attrValue);
        if (!IS_REACT_19_OR_NEWER) {
          reactProps[attrName] = attrValue;
        }
      }
      if (attrName && IS_REACT_19_OR_NEWER) {
        const attrValueFromDefault = defaultToAttributeValue(v);
        if (attrValue !== attrValueFromDefault) {
          reactProps[attrName] = attrValue;
        } else {
          reactProps[attrName] = v;
        }
      }
    }
    if (typeof window !== "undefined") {
      for (const propName in eventProps) {
        const callback = eventProps[propName];
        const useCapture = propName.endsWith("Capture");
        const eventName = ((events == null ? void 0 : events[propName]) ?? propName.slice(2).toLowerCase()).slice(
          0,
          useCapture ? -7 : void 0
        );
        React2.useLayoutEffect(() => {
          const eventTarget = elementRef == null ? void 0 : elementRef.current;
          if (!eventTarget || typeof callback !== "function") return;
          eventTarget.addEventListener(eventName, callback, useCapture);
          return () => {
            eventTarget.removeEventListener(eventName, callback, useCapture);
          };
        }, [elementRef == null ? void 0 : elementRef.current, callback]);
      }
      React2.useLayoutEffect(() => {
        if (elementRef.current === null) return;
        const newElemProps = /* @__PURE__ */ new Map();
        for (const key in elementProps) {
          setProperty(elementRef.current, key, elementProps[key]);
          prevElemPropsRef.current.delete(key);
          newElemProps.set(key, elementProps[key]);
        }
        for (const [key, _value] of prevElemPropsRef.current) {
          setProperty(elementRef.current, key, void 0);
        }
        prevElemPropsRef.current = newElemProps;
      });
    }
    if (typeof window === "undefined" && (elementClass == null ? void 0 : elementClass.getTemplateHTML) && (elementClass == null ? void 0 : elementClass.shadowRootOptions)) {
      const { mode, delegatesFocus } = elementClass.shadowRootOptions;
      const templateShadowRoot = React2.createElement("template", {
        shadowrootmode: mode,
        shadowrootdelegatesfocus: delegatesFocus,
        dangerouslySetInnerHTML: {
          __html: elementClass.getTemplateHTML(attrs, props)
        },
        key: "ce-la-react-ssr-template-shadow-root"
      });
      reactProps.children = [templateShadowRoot, reactProps.children];
    }
    return React2.createElement(tagName, {
      ...defaultProps,
      ...reactProps,
      ref: React2.useCallback(
        (node) => {
          elementRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref !== null) {
            ref.current = node;
          }
        },
        [ref]
      )
    }, reactProps.children);
  });
  ReactComponent.displayName = displayName ?? elementClass.name;
  return ReactComponent;
}
__name(createComponent, "createComponent");
function setProperty(node, name, value) {
  var _a2;
  node[name] = value;
  if (value == null && name in (((_a2 = globalThis.HTMLElement) == null ? void 0 : _a2.prototype) ?? {})) {
    node.removeAttribute(name);
  }
}
__name(setProperty, "setProperty");
var react_default = createComponent({
  react: React,
  tagName: "wistia-video",
  elementClass: wistia_video_element_default,
  toAttributeName(propName) {
    if (propName === "muted") return "";
    if (propName === "defaultMuted") return "muted";
    return defaultToAttributeName(propName);
  }
});
export {
  react_default as default
};

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
var _addTrackCallback, _removeTrackCallback, _changeCallback, _VideoTrackList_instances, tracks_get, _addRenditionCallback, _removeRenditionCallback, _changeCallback2, _selected, _selected2, _addRenditionCallback2, _removeRenditionCallback2, _changeCallback3, _selected3, _addTrackCallback2, _removeTrackCallback2, _changeCallback4, _AudioTrackList_instances, tracks_get2, _enabled;
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
const Attributes = [
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
function getAudioTemplateHTML(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        display: inline-flex;
        line-height: 0;
        flex-direction: column;
        justify-content: end;
      }

      audio {
        width: 100%;
      }
    </style>
    <slot name="media">
      <audio${serializeAttributes(attrs)}></audio>
    </slot>
    <slot></slot>
  `
  );
}
__name(getAudioTemplateHTML, "getAudioTemplateHTML");
function getVideoTemplateHTML(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        display: inline-block;
        line-height: 0;
      }

      video {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, 50% 50%);
      }

      video::-webkit-media-text-track-container {
        transform: var(--media-webkit-text-track-transform);
        transition: var(--media-webkit-text-track-transition);
      }
    </style>
    <slot name="media">
      <video${serializeAttributes(attrs)}></video>
    </slot>
    <slot></slot>
  `
  );
}
__name(getVideoTemplateHTML, "getVideoTemplateHTML");
function CustomMediaMixin(superclass, { tag, is }) {
  var _a, _isDefined, _CustomMedia_static, define_fn, _isInit, _nativeEl, _childMap, _childObserver, _CustomMedia_instances, init_fn, syncMediaChildren_fn, syncMediaChildAttribute_fn, enableDefaultTrack_fn, upgradeProperty_fn, forwardAttribute_fn;
  const nativeElTest = globalThis.document?.createElement?.(tag, { is });
  const nativeElProps = nativeElTest ? getNativeElProps(nativeElTest) : [];
  return _a = class extends superclass {
    constructor() {
      super(...arguments);
      __privateAdd(this, _CustomMedia_instances);
      // Private fields
      __privateAdd(this, _isInit, false);
      __privateAdd(this, _nativeEl, null);
      __privateAdd(this, _childMap, /* @__PURE__ */ new Map());
      __privateAdd(this, _childObserver);
      __publicField(this, "get");
      __publicField(this, "set");
      __publicField(this, "call");
    }
    static get observedAttributes() {
      var _a2;
      __privateMethod(_a2 = _a, _CustomMedia_static, define_fn).call(_a2);
      const natAttrs = nativeElTest?.constructor?.observedAttributes ?? [];
      return [
        ...natAttrs,
        ...Attributes
      ];
    }
    // If the custom element is defined before the custom element's HTML is parsed
    // no attributes will be available in the constructor (construction process).
    // Wait until initializing in the attributeChangedCallback or
    // connectedCallback or accessing any properties.
    get nativeEl() {
      __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
      return __privateGet(this, _nativeEl) ?? this.querySelector(":scope > [slot=media]") ?? this.querySelector(tag) ?? this.shadowRoot?.querySelector(tag) ?? null;
    }
    set nativeEl(val) {
      __privateSet(this, _nativeEl, val);
    }
    get defaultMuted() {
      return this.hasAttribute("muted");
    }
    set defaultMuted(val) {
      this.toggleAttribute("muted", val);
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
    init() {
      if (!this.shadowRoot) {
        this.attachShadow({ mode: "open" });
        const attrs = namedNodeMapToObject(this.attributes);
        if (is) attrs.is = is;
        if (tag) attrs.part = tag;
        this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
      }
      this.nativeEl.muted = this.hasAttribute("muted");
      for (const prop of nativeElProps) {
        __privateMethod(this, _CustomMedia_instances, upgradeProperty_fn).call(this, prop);
      }
      __privateSet(this, _childObserver, new MutationObserver(__privateMethod(this, _CustomMedia_instances, syncMediaChildAttribute_fn).bind(this)));
      this.shadowRoot.addEventListener("slotchange", () => __privateMethod(this, _CustomMedia_instances, syncMediaChildren_fn).call(this));
      __privateMethod(this, _CustomMedia_instances, syncMediaChildren_fn).call(this);
      for (const type of this.constructor.Events) {
        this.shadowRoot.addEventListener(type, this, true);
      }
    }
    handleEvent(event) {
      if (event.target === this.nativeEl) {
        this.dispatchEvent(new CustomEvent(event.type, { detail: event.detail }));
      }
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
      __privateMethod(this, _CustomMedia_instances, forwardAttribute_fn).call(this, attrName, oldValue, newValue);
    }
    connectedCallback() {
      __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
    }
  }, _isDefined = new WeakMap(), _CustomMedia_static = new WeakSet(), define_fn = /* @__PURE__ */ __name(function() {
    if (__privateGet(this, _isDefined)) return;
    __privateSet(this, _isDefined, true);
    const propsToAttrs = new Set(this.observedAttributes);
    propsToAttrs.delete("muted");
    for (const prop of nativeElProps) {
      if (prop in this.prototype) continue;
      if (typeof nativeElTest[prop] === "function") {
        this.prototype[prop] = function(...args) {
          __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
          const fn = /* @__PURE__ */ __name(() => {
            if (this.call) return this.call(prop, ...args);
            const nativeFn = this.nativeEl?.[prop];
            return nativeFn?.apply(this.nativeEl, args);
          }, "fn");
          return fn();
        };
      } else {
        const config = {
          get() {
            __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
            const attr = prop.toLowerCase();
            if (propsToAttrs.has(attr)) {
              const val = this.getAttribute(attr);
              return val === null ? false : val === "" ? true : val;
            }
            return this.get?.(prop) ?? this.nativeEl?.[prop];
          }
        };
        if (prop !== prop.toUpperCase()) {
          config.set = function(val) {
            __privateMethod(this, _CustomMedia_instances, init_fn).call(this);
            const attr = prop.toLowerCase();
            if (propsToAttrs.has(attr)) {
              if (val === true || val === false || val == null) {
                this.toggleAttribute(attr, Boolean(val));
              } else {
                this.setAttribute(attr, val);
              }
              return;
            }
            if (this.set) {
              this.set(prop, val);
              return;
            }
            if (this.nativeEl) {
              this.nativeEl[prop] = val;
            }
          };
        }
        Object.defineProperty(this.prototype, prop, config);
      }
    }
  }, "#define"), _isInit = new WeakMap(), _nativeEl = new WeakMap(), _childMap = new WeakMap(), _childObserver = new WeakMap(), _CustomMedia_instances = new WeakSet(), init_fn = /* @__PURE__ */ __name(function() {
    if (__privateGet(this, _isInit)) return;
    __privateSet(this, _isInit, true);
    this.init();
  }, "#init"), syncMediaChildren_fn = /* @__PURE__ */ __name(function() {
    const removeNativeChildren = new Map(__privateGet(this, _childMap));
    const defaultSlot = this.shadowRoot?.querySelector("slot:not([name])");
    const mediaChildren = defaultSlot?.assignedElements({ flatten: true }).filter((el) => ["track", "source"].includes(el.localName));
    mediaChildren.forEach((el) => {
      removeNativeChildren.delete(el);
      let clone = __privateGet(this, _childMap).get(el);
      if (!clone) {
        clone = el.cloneNode();
        __privateGet(this, _childMap).set(el, clone);
        __privateGet(this, _childObserver)?.observe(el, { attributes: true });
      }
      this.nativeEl?.append(clone);
      __privateMethod(this, _CustomMedia_instances, enableDefaultTrack_fn).call(this, clone);
    });
    removeNativeChildren.forEach((clone, el) => {
      clone.remove();
      __privateGet(this, _childMap).delete(el);
    });
  }, "#syncMediaChildren"), syncMediaChildAttribute_fn = /* @__PURE__ */ __name(function(mutations) {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        const { target, attributeName } = mutation;
        const clone = __privateGet(this, _childMap).get(target);
        if (clone && attributeName) {
          clone.setAttribute(attributeName, target.getAttribute(attributeName) ?? "");
          __privateMethod(this, _CustomMedia_instances, enableDefaultTrack_fn).call(this, clone);
        }
      }
    }
  }, "#syncMediaChildAttribute"), enableDefaultTrack_fn = /* @__PURE__ */ __name(function(trackEl) {
    if (trackEl && trackEl.localName === "track" && trackEl.default && (trackEl.kind === "chapters" || trackEl.kind === "metadata") && trackEl.track.mode === "disabled") {
      trackEl.track.mode = "hidden";
    }
  }, "#enableDefaultTrack"), upgradeProperty_fn = /* @__PURE__ */ __name(function(prop) {
    if (Object.prototype.hasOwnProperty.call(this, prop)) {
      const value = this[prop];
      delete this[prop];
      this[prop] = value;
    }
  }, "#upgradeProperty"), forwardAttribute_fn = /* @__PURE__ */ __name(function(attrName, _oldValue, newValue) {
    if (["id", "class"].includes(attrName)) return;
    if (!_a.observedAttributes.includes(attrName) && this.constructor.observedAttributes.includes(attrName)) {
      return;
    }
    if (newValue === null) {
      this.nativeEl?.removeAttribute(attrName);
    } else if (this.nativeEl?.getAttribute(attrName) !== newValue) {
      this.nativeEl?.setAttribute(attrName, newValue);
    }
  }, "#forwardAttribute"), __privateAdd(_a, _CustomMedia_static), __name(_a, "CustomMedia"), __publicField(_a, "getTemplateHTML", tag.endsWith("audio") ? getAudioTemplateHTML : getVideoTemplateHTML), __publicField(_a, "shadowRootOptions", { mode: "open" }), __publicField(_a, "Events", Events), __privateAdd(_a, _isDefined, false), _a;
}
__name(CustomMediaMixin, "CustomMediaMixin");
function getNativeElProps(nativeElTest) {
  const nativeElProps = [];
  for (let proto = Object.getPrototypeOf(nativeElTest); proto && proto !== HTMLElement.prototype; proto = Object.getPrototypeOf(proto)) {
    const props = Object.getOwnPropertyNames(proto);
    nativeElProps.push(...props);
  }
  return nativeElProps;
}
__name(getNativeElProps, "getNativeElProps");
function serializeAttributes(attrs) {
  let html = "";
  for (const key in attrs) {
    if (!Attributes.includes(key)) continue;
    const value = attrs[key];
    if (value === "") html += ` ${key}`;
    else html += ` ${key}="${value}"`;
  }
  return html;
}
__name(serializeAttributes, "serializeAttributes");
function namedNodeMapToObject(namedNodeMap) {
  const obj = {};
  for (const attr of namedNodeMap) {
    obj[attr.name] = attr.value;
  }
  return obj;
}
__name(namedNodeMapToObject, "namedNodeMapToObject");
const CustomVideoElement = CustomMediaMixin(globalThis.HTMLElement ?? class {
}, {
  tag: "video"
});
CustomMediaMixin(globalThis.HTMLElement ?? class {
}, {
  tag: "audio"
});
const _TrackEvent = class _TrackEvent extends Event {
  constructor(type, init) {
    super(type);
    __publicField(this, "track");
    this.track = init.track;
  }
};
__name(_TrackEvent, "TrackEvent");
let TrackEvent = _TrackEvent;
const privateProps = /* @__PURE__ */ new WeakMap();
function getPrivate(instance) {
  return privateProps.get(instance) ?? setPrivate(instance, {});
}
__name(getPrivate, "getPrivate");
function setPrivate(instance, props) {
  let saved = privateProps.get(instance);
  if (!saved) privateProps.set(instance, saved = {});
  return Object.assign(saved, props);
}
__name(setPrivate, "setPrivate");
function addVideoTrack(media, track) {
  const trackList = media.videoTracks;
  getPrivate(track).media = media;
  if (!getPrivate(track).renditionSet) {
    getPrivate(track).renditionSet = /* @__PURE__ */ new Set();
  }
  const trackSet = getPrivate(trackList).trackSet;
  trackSet.add(track);
  const index = trackSet.size - 1;
  if (!(index in VideoTrackList.prototype)) {
    Object.defineProperty(VideoTrackList.prototype, index, {
      get() {
        return [...getPrivate(this).trackSet][index];
      }
    });
  }
  queueMicrotask(() => {
    trackList.dispatchEvent(new TrackEvent("addtrack", { track }));
  });
}
__name(addVideoTrack, "addVideoTrack");
function removeVideoTrack(track) {
  const trackList = getPrivate(track).media?.videoTracks;
  if (!trackList) return;
  const trackSet = getPrivate(trackList).trackSet;
  trackSet.delete(track);
  queueMicrotask(() => {
    trackList.dispatchEvent(new TrackEvent("removetrack", { track }));
  });
}
__name(removeVideoTrack, "removeVideoTrack");
function selectedChanged$2(selected) {
  const trackList = getPrivate(selected).media.videoTracks ?? [];
  let hasUnselected = false;
  for (const track of trackList) {
    if (track === selected) continue;
    track.selected = false;
    hasUnselected = true;
  }
  if (hasUnselected) {
    if (getPrivate(trackList).changeRequested) return;
    getPrivate(trackList).changeRequested = true;
    queueMicrotask(() => {
      delete getPrivate(trackList).changeRequested;
      trackList.dispatchEvent(new Event("change"));
    });
  }
}
__name(selectedChanged$2, "selectedChanged$2");
const _VideoTrackList = class _VideoTrackList extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _VideoTrackList_instances);
    __privateAdd(this, _addTrackCallback);
    __privateAdd(this, _removeTrackCallback);
    __privateAdd(this, _changeCallback);
    getPrivate(this).trackSet = /* @__PURE__ */ new Set();
  }
  [Symbol.iterator]() {
    return __privateGet(this, _VideoTrackList_instances, tracks_get).values();
  }
  get length() {
    return __privateGet(this, _VideoTrackList_instances, tracks_get).size;
  }
  getTrackById(id) {
    return [...__privateGet(this, _VideoTrackList_instances, tracks_get)].find((track) => track.id === id) ?? null;
  }
  get selectedIndex() {
    return [...__privateGet(this, _VideoTrackList_instances, tracks_get)].findIndex((track) => track.selected);
  }
  get onaddtrack() {
    return __privateGet(this, _addTrackCallback);
  }
  set onaddtrack(callback) {
    if (__privateGet(this, _addTrackCallback)) {
      this.removeEventListener("addtrack", __privateGet(this, _addTrackCallback));
      __privateSet(this, _addTrackCallback, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _addTrackCallback, callback);
      this.addEventListener("addtrack", callback);
    }
  }
  get onremovetrack() {
    return __privateGet(this, _removeTrackCallback);
  }
  set onremovetrack(callback) {
    if (__privateGet(this, _removeTrackCallback)) {
      this.removeEventListener("removetrack", __privateGet(this, _removeTrackCallback));
      __privateSet(this, _removeTrackCallback, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _removeTrackCallback, callback);
      this.addEventListener("removetrack", callback);
    }
  }
  get onchange() {
    return __privateGet(this, _changeCallback);
  }
  set onchange(callback) {
    if (__privateGet(this, _changeCallback)) {
      this.removeEventListener("change", __privateGet(this, _changeCallback));
      __privateSet(this, _changeCallback, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _changeCallback, callback);
      this.addEventListener("change", callback);
    }
  }
};
_addTrackCallback = new WeakMap();
_removeTrackCallback = new WeakMap();
_changeCallback = new WeakMap();
_VideoTrackList_instances = new WeakSet();
tracks_get = /* @__PURE__ */ __name(function() {
  return getPrivate(this).trackSet;
}, "#tracks");
__name(_VideoTrackList, "VideoTrackList");
let VideoTrackList = _VideoTrackList;
const _RenditionEvent = class _RenditionEvent extends Event {
  constructor(type, init) {
    super(type);
    __publicField(this, "rendition");
    this.rendition = init.rendition;
  }
};
__name(_RenditionEvent, "RenditionEvent");
let RenditionEvent = _RenditionEvent;
function addRendition$1(track, rendition) {
  const renditionList = getPrivate(track).media.videoRenditions;
  getPrivate(rendition).media = getPrivate(track).media;
  getPrivate(rendition).track = track;
  const renditionSet = getPrivate(track).renditionSet;
  renditionSet.add(rendition);
  const index = renditionSet.size - 1;
  if (!(index in VideoRenditionList.prototype)) {
    Object.defineProperty(VideoRenditionList.prototype, index, {
      get() {
        return getCurrentRenditions$1(this)[index];
      }
    });
  }
  queueMicrotask(() => {
    if (!track.selected) return;
    renditionList.dispatchEvent(new RenditionEvent("addrendition", { rendition }));
  });
}
__name(addRendition$1, "addRendition$1");
function removeRendition$1(rendition) {
  const renditionList = getPrivate(rendition).media.videoRenditions;
  const track = getPrivate(rendition).track;
  const renditionSet = getPrivate(track).renditionSet;
  renditionSet.delete(rendition);
  queueMicrotask(() => {
    const track2 = getPrivate(rendition).track;
    if (!track2.selected) return;
    renditionList.dispatchEvent(new RenditionEvent("removerendition", { rendition }));
  });
}
__name(removeRendition$1, "removeRendition$1");
function selectedChanged$1(rendition) {
  const renditionList = getPrivate(rendition).media.videoRenditions;
  if (!renditionList || getPrivate(renditionList).changeRequested) return;
  getPrivate(renditionList).changeRequested = true;
  queueMicrotask(() => {
    delete getPrivate(renditionList).changeRequested;
    const track = getPrivate(rendition).track;
    if (!track.selected) return;
    renditionList.dispatchEvent(new Event("change"));
  });
}
__name(selectedChanged$1, "selectedChanged$1");
function getCurrentRenditions$1(renditionList) {
  const media = getPrivate(renditionList).media;
  return [...media.videoTracks].filter((track) => track.selected).flatMap((track) => [...getPrivate(track).renditionSet]);
}
__name(getCurrentRenditions$1, "getCurrentRenditions$1");
const _VideoRenditionList = class _VideoRenditionList extends EventTarget {
  constructor() {
    super(...arguments);
    __privateAdd(this, _addRenditionCallback);
    __privateAdd(this, _removeRenditionCallback);
    __privateAdd(this, _changeCallback2);
  }
  [Symbol.iterator]() {
    return getCurrentRenditions$1(this).values();
  }
  get length() {
    return getCurrentRenditions$1(this).length;
  }
  getRenditionById(id) {
    return getCurrentRenditions$1(this).find((rendition) => `${rendition.id}` === `${id}`) ?? null;
  }
  get selectedIndex() {
    return getCurrentRenditions$1(this).findIndex((rendition) => rendition.selected);
  }
  set selectedIndex(index) {
    for (const [i, rendition] of getCurrentRenditions$1(this).entries()) {
      rendition.selected = i === index;
    }
  }
  get onaddrendition() {
    return __privateGet(this, _addRenditionCallback);
  }
  set onaddrendition(callback) {
    if (__privateGet(this, _addRenditionCallback)) {
      this.removeEventListener("addrendition", __privateGet(this, _addRenditionCallback));
      __privateSet(this, _addRenditionCallback, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _addRenditionCallback, callback);
      this.addEventListener("addrendition", callback);
    }
  }
  get onremoverendition() {
    return __privateGet(this, _removeRenditionCallback);
  }
  set onremoverendition(callback) {
    if (__privateGet(this, _removeRenditionCallback)) {
      this.removeEventListener("removerendition", __privateGet(this, _removeRenditionCallback));
      __privateSet(this, _removeRenditionCallback, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _removeRenditionCallback, callback);
      this.addEventListener("removerendition", callback);
    }
  }
  get onchange() {
    return __privateGet(this, _changeCallback2);
  }
  set onchange(callback) {
    if (__privateGet(this, _changeCallback2)) {
      this.removeEventListener("change", __privateGet(this, _changeCallback2));
      __privateSet(this, _changeCallback2, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _changeCallback2, callback);
      this.addEventListener("change", callback);
    }
  }
};
_addRenditionCallback = new WeakMap();
_removeRenditionCallback = new WeakMap();
_changeCallback2 = new WeakMap();
__name(_VideoRenditionList, "VideoRenditionList");
let VideoRenditionList = _VideoRenditionList;
const _VideoRendition = class _VideoRendition {
  constructor() {
    __publicField(this, "src");
    __publicField(this, "id");
    __publicField(this, "width");
    __publicField(this, "height");
    __publicField(this, "bitrate");
    __publicField(this, "frameRate");
    __publicField(this, "codec");
    __privateAdd(this, _selected, false);
  }
  get selected() {
    return __privateGet(this, _selected);
  }
  set selected(val) {
    if (__privateGet(this, _selected) === val) return;
    __privateSet(this, _selected, val);
    selectedChanged$1(this);
  }
};
_selected = new WeakMap();
__name(_VideoRendition, "VideoRendition");
let VideoRendition = _VideoRendition;
const _VideoTrack = class _VideoTrack {
  constructor() {
    __publicField(this, "id");
    __publicField(this, "kind");
    __publicField(this, "label", "");
    __publicField(this, "language", "");
    __publicField(this, "sourceBuffer");
    __privateAdd(this, _selected2, false);
  }
  addRendition(src, width, height, codec, bitrate, frameRate) {
    const rendition = new VideoRendition();
    rendition.src = src;
    rendition.width = width;
    rendition.height = height;
    rendition.frameRate = frameRate;
    rendition.bitrate = bitrate;
    rendition.codec = codec;
    addRendition$1(this, rendition);
    return rendition;
  }
  removeRendition(rendition) {
    removeRendition$1(rendition);
  }
  get selected() {
    return __privateGet(this, _selected2);
  }
  set selected(val) {
    if (__privateGet(this, _selected2) === val) return;
    __privateSet(this, _selected2, val);
    if (val !== true) return;
    selectedChanged$2(this);
  }
};
_selected2 = new WeakMap();
__name(_VideoTrack, "VideoTrack");
let VideoTrack = _VideoTrack;
function addRendition(track, rendition) {
  const renditionList = getPrivate(track).media.audioRenditions;
  getPrivate(rendition).media = getPrivate(track).media;
  getPrivate(rendition).track = track;
  const renditionSet = getPrivate(track).renditionSet;
  renditionSet.add(rendition);
  const index = renditionSet.size - 1;
  if (!(index in AudioRenditionList.prototype)) {
    Object.defineProperty(AudioRenditionList.prototype, index, {
      get() {
        return getCurrentRenditions(this)[index];
      }
    });
  }
  queueMicrotask(() => {
    if (!track.enabled) return;
    renditionList.dispatchEvent(new RenditionEvent("addrendition", { rendition }));
  });
}
__name(addRendition, "addRendition");
function removeRendition(rendition) {
  const renditionList = getPrivate(rendition).media.audioRenditions;
  const track = getPrivate(rendition).track;
  const renditionSet = getPrivate(track).renditionSet;
  renditionSet.delete(rendition);
  queueMicrotask(() => {
    const track2 = getPrivate(rendition).track;
    if (!track2.enabled) return;
    renditionList.dispatchEvent(new RenditionEvent("removerendition", { rendition }));
  });
}
__name(removeRendition, "removeRendition");
function selectedChanged(rendition) {
  const renditionList = getPrivate(rendition).media.audioRenditions;
  if (!renditionList || getPrivate(renditionList).changeRequested) return;
  getPrivate(renditionList).changeRequested = true;
  queueMicrotask(() => {
    delete getPrivate(renditionList).changeRequested;
    const track = getPrivate(rendition).track;
    if (!track.enabled) return;
    renditionList.dispatchEvent(new Event("change"));
  });
}
__name(selectedChanged, "selectedChanged");
function getCurrentRenditions(renditionList) {
  const media = getPrivate(renditionList).media;
  return [...media.audioTracks].filter((track) => track.enabled).flatMap((track) => [...getPrivate(track).renditionSet]);
}
__name(getCurrentRenditions, "getCurrentRenditions");
const _AudioRenditionList = class _AudioRenditionList extends EventTarget {
  constructor() {
    super(...arguments);
    __privateAdd(this, _addRenditionCallback2);
    __privateAdd(this, _removeRenditionCallback2);
    __privateAdd(this, _changeCallback3);
  }
  [Symbol.iterator]() {
    return getCurrentRenditions(this).values();
  }
  get length() {
    return getCurrentRenditions(this).length;
  }
  getRenditionById(id) {
    return getCurrentRenditions(this).find((rendition) => `${rendition.id}` === `${id}`) ?? null;
  }
  get selectedIndex() {
    return getCurrentRenditions(this).findIndex((rendition) => rendition.selected);
  }
  set selectedIndex(index) {
    for (const [i, rendition] of getCurrentRenditions(this).entries()) {
      rendition.selected = i === index;
    }
  }
  get onaddrendition() {
    return __privateGet(this, _addRenditionCallback2);
  }
  set onaddrendition(callback) {
    if (__privateGet(this, _addRenditionCallback2)) {
      this.removeEventListener("addrendition", __privateGet(this, _addRenditionCallback2));
      __privateSet(this, _addRenditionCallback2, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _addRenditionCallback2, callback);
      this.addEventListener("addrendition", callback);
    }
  }
  get onremoverendition() {
    return __privateGet(this, _removeRenditionCallback2);
  }
  set onremoverendition(callback) {
    if (__privateGet(this, _removeRenditionCallback2)) {
      this.removeEventListener("removerendition", __privateGet(this, _removeRenditionCallback2));
      __privateSet(this, _removeRenditionCallback2, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _removeRenditionCallback2, callback);
      this.addEventListener("removerendition", callback);
    }
  }
  get onchange() {
    return __privateGet(this, _changeCallback3);
  }
  set onchange(callback) {
    if (__privateGet(this, _changeCallback3)) {
      this.removeEventListener("change", __privateGet(this, _changeCallback3));
      __privateSet(this, _changeCallback3, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _changeCallback3, callback);
      this.addEventListener("change", callback);
    }
  }
};
_addRenditionCallback2 = new WeakMap();
_removeRenditionCallback2 = new WeakMap();
_changeCallback3 = new WeakMap();
__name(_AudioRenditionList, "AudioRenditionList");
let AudioRenditionList = _AudioRenditionList;
const _AudioRendition = class _AudioRendition {
  constructor() {
    __publicField(this, "src");
    __publicField(this, "id");
    __publicField(this, "bitrate");
    __publicField(this, "codec");
    __privateAdd(this, _selected3, false);
  }
  get selected() {
    return __privateGet(this, _selected3);
  }
  set selected(val) {
    if (__privateGet(this, _selected3) === val) return;
    __privateSet(this, _selected3, val);
    selectedChanged(this);
  }
};
_selected3 = new WeakMap();
__name(_AudioRendition, "AudioRendition");
let AudioRendition = _AudioRendition;
function addAudioTrack(media, track) {
  const trackList = media.audioTracks;
  getPrivate(track).media = media;
  if (!getPrivate(track).renditionSet) {
    getPrivate(track).renditionSet = /* @__PURE__ */ new Set();
  }
  const trackSet = getPrivate(trackList).trackSet;
  trackSet.add(track);
  const index = trackSet.size - 1;
  if (!(index in AudioTrackList.prototype)) {
    Object.defineProperty(AudioTrackList.prototype, index, {
      get() {
        return [...getPrivate(this).trackSet][index];
      }
    });
  }
  queueMicrotask(() => {
    trackList.dispatchEvent(new TrackEvent("addtrack", { track }));
  });
}
__name(addAudioTrack, "addAudioTrack");
function removeAudioTrack(track) {
  const trackList = getPrivate(track).media?.audioTracks;
  if (!trackList) return;
  const trackSet = getPrivate(trackList).trackSet;
  trackSet.delete(track);
  queueMicrotask(() => {
    trackList.dispatchEvent(new TrackEvent("removetrack", { track }));
  });
}
__name(removeAudioTrack, "removeAudioTrack");
function enabledChanged(track) {
  const trackList = getPrivate(track).media.audioTracks;
  if (!trackList || getPrivate(trackList).changeRequested) return;
  getPrivate(trackList).changeRequested = true;
  queueMicrotask(() => {
    delete getPrivate(trackList).changeRequested;
    trackList.dispatchEvent(new Event("change"));
  });
}
__name(enabledChanged, "enabledChanged");
const _AudioTrackList = class _AudioTrackList extends EventTarget {
  constructor() {
    super();
    __privateAdd(this, _AudioTrackList_instances);
    __privateAdd(this, _addTrackCallback2);
    __privateAdd(this, _removeTrackCallback2);
    __privateAdd(this, _changeCallback4);
    getPrivate(this).trackSet = /* @__PURE__ */ new Set();
  }
  [Symbol.iterator]() {
    return __privateGet(this, _AudioTrackList_instances, tracks_get2).values();
  }
  get length() {
    return __privateGet(this, _AudioTrackList_instances, tracks_get2).size;
  }
  getTrackById(id) {
    return [...__privateGet(this, _AudioTrackList_instances, tracks_get2)].find((track) => track.id === id) ?? null;
  }
  get onaddtrack() {
    return __privateGet(this, _addTrackCallback2);
  }
  set onaddtrack(callback) {
    if (__privateGet(this, _addTrackCallback2)) {
      this.removeEventListener("addtrack", __privateGet(this, _addTrackCallback2));
      __privateSet(this, _addTrackCallback2, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _addTrackCallback2, callback);
      this.addEventListener("addtrack", callback);
    }
  }
  get onremovetrack() {
    return __privateGet(this, _removeTrackCallback2);
  }
  set onremovetrack(callback) {
    if (__privateGet(this, _removeTrackCallback2)) {
      this.removeEventListener("removetrack", __privateGet(this, _removeTrackCallback2));
      __privateSet(this, _removeTrackCallback2, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _removeTrackCallback2, callback);
      this.addEventListener("removetrack", callback);
    }
  }
  get onchange() {
    return __privateGet(this, _changeCallback4);
  }
  set onchange(callback) {
    if (__privateGet(this, _changeCallback4)) {
      this.removeEventListener("change", __privateGet(this, _changeCallback4));
      __privateSet(this, _changeCallback4, void 0);
    }
    if (typeof callback == "function") {
      __privateSet(this, _changeCallback4, callback);
      this.addEventListener("change", callback);
    }
  }
};
_addTrackCallback2 = new WeakMap();
_removeTrackCallback2 = new WeakMap();
_changeCallback4 = new WeakMap();
_AudioTrackList_instances = new WeakSet();
tracks_get2 = /* @__PURE__ */ __name(function() {
  return getPrivate(this).trackSet;
}, "#tracks");
__name(_AudioTrackList, "AudioTrackList");
let AudioTrackList = _AudioTrackList;
const _AudioTrack = class _AudioTrack {
  constructor() {
    __publicField(this, "id");
    __publicField(this, "kind");
    __publicField(this, "label", "");
    __publicField(this, "language", "");
    __publicField(this, "sourceBuffer");
    __privateAdd(this, _enabled, false);
  }
  addRendition(src, codec, bitrate) {
    const rendition = new AudioRendition();
    rendition.src = src;
    rendition.codec = codec;
    rendition.bitrate = bitrate;
    addRendition(this, rendition);
    return rendition;
  }
  removeRendition(rendition) {
    removeRendition(rendition);
  }
  get enabled() {
    return __privateGet(this, _enabled);
  }
  set enabled(val) {
    if (__privateGet(this, _enabled) === val) return;
    __privateSet(this, _enabled, val);
    enabledChanged(this);
  }
};
_enabled = new WeakMap();
__name(_AudioTrack, "AudioTrack");
let AudioTrack = _AudioTrack;
const nativeVideoTracksFn = getBaseMediaTracksFn(globalThis.HTMLMediaElement, "video");
const nativeAudioTracksFn = getBaseMediaTracksFn(globalThis.HTMLMediaElement, "audio");
function MediaTracksMixin(MediaElementClass) {
  if (!MediaElementClass?.prototype) return MediaElementClass;
  const videoTracksFn = getBaseMediaTracksFn(MediaElementClass, "video");
  if (!videoTracksFn || `${videoTracksFn}`.includes("[native code]")) {
    Object.defineProperty(MediaElementClass.prototype, "videoTracks", {
      get() {
        return getVideoTracks(this);
      }
    });
  }
  const audioTracksFn = getBaseMediaTracksFn(MediaElementClass, "audio");
  if (!audioTracksFn || `${audioTracksFn}`.includes("[native code]")) {
    Object.defineProperty(MediaElementClass.prototype, "audioTracks", {
      get() {
        return getAudioTracks(this);
      }
    });
  }
  if (!("addVideoTrack" in MediaElementClass.prototype)) {
    MediaElementClass.prototype.addVideoTrack = function(kind, label = "", language = "") {
      const track = new VideoTrack();
      track.kind = kind;
      track.label = label;
      track.language = language;
      addVideoTrack(this, track);
      return track;
    };
  }
  if (!("removeVideoTrack" in MediaElementClass.prototype)) {
    MediaElementClass.prototype.removeVideoTrack = removeVideoTrack;
  }
  if (!("addAudioTrack" in MediaElementClass.prototype)) {
    MediaElementClass.prototype.addAudioTrack = function(kind, label = "", language = "") {
      const track = new AudioTrack();
      track.kind = kind;
      track.label = label;
      track.language = language;
      addAudioTrack(this, track);
      return track;
    };
  }
  if (!("removeAudioTrack" in MediaElementClass.prototype)) {
    MediaElementClass.prototype.removeAudioTrack = removeAudioTrack;
  }
  if (!("videoRenditions" in MediaElementClass.prototype)) {
    Object.defineProperty(MediaElementClass.prototype, "videoRenditions", {
      get() {
        return initVideoRenditions(this);
      }
    });
  }
  const initVideoRenditions = /* @__PURE__ */ __name((media) => {
    let renditions = getPrivate(media).videoRenditions;
    if (!renditions) {
      renditions = new VideoRenditionList();
      getPrivate(renditions).media = media;
      getPrivate(media).videoRenditions = renditions;
    }
    return renditions;
  }, "initVideoRenditions");
  if (!("audioRenditions" in MediaElementClass.prototype)) {
    Object.defineProperty(MediaElementClass.prototype, "audioRenditions", {
      get() {
        return initAudioRenditions(this);
      }
    });
  }
  const initAudioRenditions = /* @__PURE__ */ __name((media) => {
    let renditions = getPrivate(media).audioRenditions;
    if (!renditions) {
      renditions = new AudioRenditionList();
      getPrivate(renditions).media = media;
      getPrivate(media).audioRenditions = renditions;
    }
    return renditions;
  }, "initAudioRenditions");
  return MediaElementClass;
}
__name(MediaTracksMixin, "MediaTracksMixin");
function getBaseMediaTracksFn(MediaElementClass, type) {
  if (MediaElementClass?.prototype) {
    return Object.getOwnPropertyDescriptor(MediaElementClass.prototype, `${type}Tracks`)?.get;
  }
}
__name(getBaseMediaTracksFn, "getBaseMediaTracksFn");
function getVideoTracks(media) {
  let tracks = getPrivate(media).videoTracks;
  if (!tracks) {
    tracks = new VideoTrackList();
    getPrivate(media).videoTracks = tracks;
    if (nativeVideoTracksFn) {
      const nativeTracks = nativeVideoTracksFn.call(media.nativeEl ?? media);
      for (const nativeTrack of nativeTracks) {
        addVideoTrack(media, nativeTrack);
      }
      nativeTracks.addEventListener("change", () => {
        tracks.dispatchEvent(new Event("change"));
      });
      nativeTracks.addEventListener("addtrack", (event) => {
        if ([...tracks].some((t) => t instanceof VideoTrack)) {
          for (const nativeTrack of nativeTracks) {
            removeVideoTrack(nativeTrack);
          }
          return;
        }
        addVideoTrack(media, event.track);
      });
      nativeTracks.addEventListener("removetrack", (event) => {
        removeVideoTrack(event.track);
      });
    }
  }
  return tracks;
}
__name(getVideoTracks, "getVideoTracks");
function getAudioTracks(media) {
  let tracks = getPrivate(media).audioTracks;
  if (!tracks) {
    tracks = new AudioTrackList();
    getPrivate(media).audioTracks = tracks;
    if (nativeAudioTracksFn) {
      const nativeTracks = nativeAudioTracksFn.call(media.nativeEl ?? media);
      for (const nativeTrack of nativeTracks) {
        addAudioTrack(media, nativeTrack);
      }
      nativeTracks.addEventListener("change", () => {
        tracks.dispatchEvent(new Event("change"));
      });
      nativeTracks.addEventListener("addtrack", (event) => {
        if ([...tracks].some((t) => t instanceof AudioTrack)) {
          for (const nativeTrack of nativeTracks) {
            removeAudioTrack(nativeTrack);
          }
          return;
        }
        addAudioTrack(media, event.track);
      });
      nativeTracks.addEventListener("removetrack", (event) => {
        removeAudioTrack(event.track);
      });
    }
  }
  return tracks;
}
__name(getAudioTracks, "getAudioTracks");
export {
  CustomVideoElement as C,
  MediaTracksMixin as M
};

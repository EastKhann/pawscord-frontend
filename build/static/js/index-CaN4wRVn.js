var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __reflectGet = Reflect.get;
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
var __superGet = (cls, obj, key) => __reflectGet(__getProtoOf(cls), key, obj);
var _a, _b, _c, _d, _media, _isInit2, _remotePlayer, _remoteListeners, _state, _available, _callbacks, _callbackIds, _RemotePlayback_instances, castPlayer_get, disconnect_fn, hasDevicesAvailable_fn, onCastStateChanged_fn, onSessionStateChanged_fn, init_fn2, onRemoteMediaLoaded_fn, updateRemoteTextTrack_fn, _e, _f, _g, _h, _i2, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t2, _u, _v, _w, _x;
import { a as React, r as reactExports } from "./react-core-BiY6fgAJ.js";
import { H as Hls } from "./hls-AjjzD-Zs.js";
import { C as CustomVideoElement, M as MediaTracksMixin } from "./mixin-CIU_olEC.js";
var Yr = Object.create;
var ft$1 = Object.defineProperty;
var Xr$1 = Object.getOwnPropertyDescriptor;
var $r = Object.getOwnPropertyNames;
var Zr$1 = Object.getPrototypeOf, ea$1 = Object.prototype.hasOwnProperty;
var pt$2 = /* @__PURE__ */ __name(function(r10, e2) {
  return function() {
    return r10 && (e2 = r10(r10 = 0)), e2;
  };
}, "pt$2");
var B$3 = /* @__PURE__ */ __name(function(r10, e2) {
  return function() {
    return e2 || r10((e2 = { exports: {} }).exports, e2), e2.exports;
  };
}, "B$3");
var ta$1 = /* @__PURE__ */ __name(function(r10, e2, t2, i2) {
  if (e2 && typeof e2 == "object" || typeof e2 == "function") for (var a = $r(e2), n2 = 0, o2 = a.length, s2; n2 < o2; n2++) s2 = a[n2], !ea$1.call(r10, s2) && s2 !== t2 && ft$1(r10, s2, { get: function(u2) {
    return e2[u2];
  }.bind(null, s2), enumerable: !(i2 = Xr$1(e2, s2)) || i2.enumerable });
  return r10;
}, "ta$1");
var V$2 = /* @__PURE__ */ __name(function(r10, e2, t2) {
  return t2 = r10 != null ? Yr(Zr$1(r10)) : {}, ta$1(!r10 || !r10.__esModule ? ft$1(t2, "default", { value: r10, enumerable: true }) : t2, r10);
}, "V$2");
var J$2 = B$3(function(ji, yt2) {
  var xe2;
  typeof window != "undefined" ? xe2 = window : typeof global != "undefined" ? xe2 = global : typeof self != "undefined" ? xe2 = self : xe2 = {};
  yt2.exports = xe2;
});
function U$2(r10, e2) {
  return e2 != null && typeof Symbol != "undefined" && e2[Symbol.hasInstance] ? !!e2[Symbol.hasInstance](r10) : U$2(r10, e2);
}
__name(U$2, "U$2");
var te$3 = pt$2(function() {
  te$3();
});
function Ne$2(r10) {
  "@swc/helpers - typeof";
  return r10 && typeof Symbol != "undefined" && r10.constructor === Symbol ? "symbol" : typeof r10;
}
__name(Ne$2, "Ne$2");
var Je$2 = pt$2(function() {
});
var Ye$1 = B$3(function(Ts, cr) {
  var lr = Array.prototype.slice;
  cr.exports = Pa;
  function Pa(r10, e2) {
    for (("length" in r10) || (r10 = [r10]), r10 = lr.call(r10); r10.length; ) {
      var t2 = r10.shift(), i2 = e2(t2);
      if (i2) return i2;
      t2.childNodes && t2.childNodes.length && (r10 = lr.call(t2.childNodes).concat(r10));
    }
  }
  __name(Pa, "Pa");
});
var fr = B$3(function(Es, _r2) {
  te$3();
  _r2.exports = me2;
  function me2(r10, e2) {
    if (!U$2(this, me2)) return new me2(r10, e2);
    this.data = r10, this.nodeValue = r10, this.length = r10.length, this.ownerDocument = e2 || null;
  }
  __name(me2, "me");
  me2.prototype.nodeType = 8;
  me2.prototype.nodeName = "#comment";
  me2.prototype.toString = function() {
    return "[object Comment]";
  };
});
var vr = B$3(function(xs, pr) {
  te$3();
  pr.exports = ae2;
  function ae2(r10, e2) {
    if (!U$2(this, ae2)) return new ae2(r10);
    this.data = r10 || "", this.length = this.data.length, this.ownerDocument = e2 || null;
  }
  __name(ae2, "ae");
  ae2.prototype.type = "DOMTextNode";
  ae2.prototype.nodeType = 3;
  ae2.prototype.nodeName = "#text";
  ae2.prototype.toString = function() {
    return this.data;
  };
  ae2.prototype.replaceData = function(e2, t2, i2) {
    var a = this.data, n2 = a.substring(0, e2), o2 = a.substring(e2 + t2, a.length);
    this.data = n2 + i2 + o2, this.length = this.data.length;
  };
});
var Xe$1 = B$3(function(Ds, mr) {
  mr.exports = Ia;
  function Ia(r10) {
    var e2 = this, t2 = r10.type;
    r10.target || (r10.target = e2), e2.listeners || (e2.listeners = {});
    var i2 = e2.listeners[t2];
    if (i2) return i2.forEach(function(a) {
      r10.currentTarget = e2, typeof a == "function" ? a(r10) : a.handleEvent(r10);
    });
    e2.parentNode && e2.parentNode.dispatchEvent(r10);
  }
  __name(Ia, "Ia");
});
var $e$1 = B$3(function(Ss, hr) {
  hr.exports = Na;
  function Na(r10, e2) {
    var t2 = this;
    t2.listeners || (t2.listeners = {}), t2.listeners[r10] || (t2.listeners[r10] = []), t2.listeners[r10].indexOf(e2) === -1 && t2.listeners[r10].push(e2);
  }
  __name(Na, "Na");
});
var Ze$1 = B$3(function(Rs, yr) {
  yr.exports = La;
  function La(r10, e2) {
    var t2 = this;
    if (t2.listeners && t2.listeners[r10]) {
      var i2 = t2.listeners[r10], a = i2.indexOf(e2);
      a !== -1 && i2.splice(a, 1);
    }
  }
  __name(La, "La");
});
var wr = B$3(function(As, Tr) {
  Je$2();
  Tr.exports = gr;
  var Ca2 = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr"];
  function gr(r10) {
    switch (r10.nodeType) {
      case 3:
        return et2(r10.data);
      case 8:
        return "<!--" + r10.data + "-->";
      default:
        return Ma(r10);
    }
  }
  __name(gr, "gr");
  function Ma(r10) {
    var e2 = [], t2 = r10.tagName;
    return r10.namespaceURI === "http://www.w3.org/1999/xhtml" && (t2 = t2.toLowerCase()), e2.push("<" + t2 + Fa(r10) + Ua(r10)), Ca2.indexOf(t2) > -1 ? e2.push(" />") : (e2.push(">"), r10.childNodes.length ? e2.push.apply(e2, r10.childNodes.map(gr)) : r10.textContent || r10.innerText ? e2.push(et2(r10.textContent || r10.innerText)) : r10.innerHTML && e2.push(r10.innerHTML), e2.push("</" + t2 + ">")), e2.join("");
  }
  __name(Ma, "Ma");
  function Ha(r10, e2) {
    var t2 = Ne$2(r10[e2]);
    return e2 === "style" && Object.keys(r10.style).length > 0 ? true : r10.hasOwnProperty(e2) && (t2 === "string" || t2 === "boolean" || t2 === "number") && e2 !== "nodeName" && e2 !== "className" && e2 !== "tagName" && e2 !== "textContent" && e2 !== "innerText" && e2 !== "namespaceURI" && e2 !== "innerHTML";
  }
  __name(Ha, "Ha");
  function Ba(r10) {
    if (typeof r10 == "string") return r10;
    var e2 = "";
    return Object.keys(r10).forEach(function(t2) {
      var i2 = r10[t2];
      t2 = t2.replace(/[A-Z]/g, function(a) {
        return "-" + a.toLowerCase();
      }), e2 += t2 + ":" + i2 + ";";
    }), e2;
  }
  __name(Ba, "Ba");
  function Ua(r10) {
    var e2 = r10.dataset, t2 = [];
    for (var i2 in e2) t2.push({ name: "data-" + i2, value: e2[i2] });
    return t2.length ? br(t2) : "";
  }
  __name(Ua, "Ua");
  function br(r10) {
    var e2 = [];
    return r10.forEach(function(t2) {
      var i2 = t2.name, a = t2.value;
      i2 === "style" && (a = Ba(a)), e2.push(i2 + '="' + Va(a) + '"');
    }), e2.length ? " " + e2.join(" ") : "";
  }
  __name(br, "br");
  function Fa(r10) {
    var e2 = [];
    for (var t2 in r10) Ha(r10, t2) && e2.push({ name: t2, value: r10[t2] });
    for (var i2 in r10._attributes) for (var a in r10._attributes[i2]) {
      var n2 = r10._attributes[i2][a], o2 = (n2.prefix ? n2.prefix + ":" : "") + a;
      e2.push({ name: o2, value: n2.value });
    }
    return r10.className && e2.push({ name: "class", value: r10.className }), e2.length ? br(e2) : "";
  }
  __name(Fa, "Fa");
  function et2(r10) {
    var e2 = "";
    return typeof r10 == "string" ? e2 = r10 : r10 && (e2 = r10.toString()), e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  __name(et2, "et");
  function Va(r10) {
    return et2(r10).replace(/"/g, "&quot;");
  }
  __name(Va, "Va");
});
var rt$2 = B$3(function(Ps, kr) {
  te$3();
  var tt2 = Ye$1(), Wa = Xe$1(), ja = $e$1(), Ga = Ze$1(), Ja = wr(), Er = "http://www.w3.org/1999/xhtml";
  kr.exports = I2;
  function I2(r10, e2, t2) {
    if (!U$2(this, I2)) return new I2(r10);
    var i2 = t2 === void 0 ? Er : t2 || null;
    this.tagName = i2 === Er ? String(r10).toUpperCase() : r10, this.nodeName = this.tagName, this.className = "", this.dataset = {}, this.childNodes = [], this.parentNode = null, this.style = {}, this.ownerDocument = e2 || null, this.namespaceURI = i2, this._attributes = {}, this.tagName === "INPUT" && (this.type = "text");
  }
  __name(I2, "I");
  I2.prototype.type = "DOMElement";
  I2.prototype.nodeType = 1;
  I2.prototype.appendChild = function(e2) {
    return e2.parentNode && e2.parentNode.removeChild(e2), this.childNodes.push(e2), e2.parentNode = this, e2;
  };
  I2.prototype.replaceChild = function(e2, t2) {
    e2.parentNode && e2.parentNode.removeChild(e2);
    var i2 = this.childNodes.indexOf(t2);
    return t2.parentNode = null, this.childNodes[i2] = e2, e2.parentNode = this, t2;
  };
  I2.prototype.removeChild = function(e2) {
    var t2 = this.childNodes.indexOf(e2);
    return this.childNodes.splice(t2, 1), e2.parentNode = null, e2;
  };
  I2.prototype.insertBefore = function(e2, t2) {
    e2.parentNode && e2.parentNode.removeChild(e2);
    var i2 = t2 == null ? -1 : this.childNodes.indexOf(t2);
    return i2 > -1 ? this.childNodes.splice(i2, 0, e2) : this.childNodes.push(e2), e2.parentNode = this, e2;
  };
  I2.prototype.setAttributeNS = function(e2, t2, i2) {
    var a = null, n2 = t2, o2 = t2.indexOf(":");
    if (o2 > -1 && (a = t2.substr(0, o2), n2 = t2.substr(o2 + 1)), this.tagName === "INPUT" && t2 === "type") this.type = i2;
    else {
      var s2 = this._attributes[e2] || (this._attributes[e2] = {});
      s2[n2] = { value: i2, prefix: a };
    }
  };
  I2.prototype.getAttributeNS = function(e2, t2) {
    var i2 = this._attributes[e2], a = i2 && i2[t2] && i2[t2].value;
    return this.tagName === "INPUT" && t2 === "type" ? this.type : typeof a != "string" ? null : a;
  };
  I2.prototype.removeAttributeNS = function(e2, t2) {
    var i2 = this._attributes[e2];
    i2 && delete i2[t2];
  };
  I2.prototype.hasAttributeNS = function(e2, t2) {
    var i2 = this._attributes[e2];
    return !!i2 && t2 in i2;
  };
  I2.prototype.setAttribute = function(e2, t2) {
    return this.setAttributeNS(null, e2, t2);
  };
  I2.prototype.getAttribute = function(e2) {
    return this.getAttributeNS(null, e2);
  };
  I2.prototype.removeAttribute = function(e2) {
    return this.removeAttributeNS(null, e2);
  };
  I2.prototype.hasAttribute = function(e2) {
    return this.hasAttributeNS(null, e2);
  };
  I2.prototype.removeEventListener = Ga;
  I2.prototype.addEventListener = ja;
  I2.prototype.dispatchEvent = Wa;
  I2.prototype.focus = function() {
  };
  I2.prototype.toString = function() {
    return Ja(this);
  };
  I2.prototype.getElementsByClassName = function(e2) {
    var t2 = e2.split(" "), i2 = [];
    return tt2(this, function(a) {
      if (a.nodeType === 1) {
        var n2 = a.className || "", o2 = n2.split(" ");
        t2.every(function(s2) {
          return o2.indexOf(s2) !== -1;
        }) && i2.push(a);
      }
    }), i2;
  };
  I2.prototype.getElementsByTagName = function(e2) {
    e2 = e2.toLowerCase();
    var t2 = [];
    return tt2(this.childNodes, function(i2) {
      i2.nodeType === 1 && (e2 === "*" || i2.tagName.toLowerCase() === e2) && t2.push(i2);
    }), t2;
  };
  I2.prototype.contains = function(e2) {
    return tt2(this, function(t2) {
      return e2 === t2;
    }) || false;
  };
});
var Dr = B$3(function(Ns, xr) {
  te$3();
  var at2 = rt$2();
  xr.exports = K2;
  function K2(r10) {
    if (!U$2(this, K2)) return new K2();
    this.childNodes = [], this.parentNode = null, this.ownerDocument = r10 || null;
  }
  __name(K2, "K");
  K2.prototype.type = "DocumentFragment";
  K2.prototype.nodeType = 11;
  K2.prototype.nodeName = "#document-fragment";
  K2.prototype.appendChild = at2.prototype.appendChild;
  K2.prototype.replaceChild = at2.prototype.replaceChild;
  K2.prototype.removeChild = at2.prototype.removeChild;
  K2.prototype.toString = function() {
    return this.childNodes.map(function(e2) {
      return String(e2);
    }).join("");
  };
});
var Rr = B$3(function(Ls, Sr) {
  Sr.exports = it2;
  function it2(r10) {
  }
  __name(it2, "it");
  it2.prototype.initEvent = function(e2, t2, i2) {
    this.type = e2, this.bubbles = t2, this.cancelable = i2;
  };
  it2.prototype.preventDefault = function() {
  };
});
var Ar = B$3(function(Ms, qr2) {
  te$3();
  var Qa = Ye$1(), za = fr(), Ka = vr(), Re2 = rt$2(), Ya = Dr(), Xa = Rr(), $a = Xe$1(), Za = $e$1(), ei = Ze$1();
  qr2.exports = Be2;
  function Be2() {
    if (!U$2(this, Be2)) return new Be2();
    this.head = this.createElement("head"), this.body = this.createElement("body"), this.documentElement = this.createElement("html"), this.documentElement.appendChild(this.head), this.documentElement.appendChild(this.body), this.childNodes = [this.documentElement], this.nodeType = 9;
  }
  __name(Be2, "Be");
  var j2 = Be2.prototype;
  j2.createTextNode = function(e2) {
    return new Ka(e2, this);
  };
  j2.createElementNS = function(e2, t2) {
    var i2 = e2 === null ? null : String(e2);
    return new Re2(t2, this, i2);
  };
  j2.createElement = function(e2) {
    return new Re2(e2, this);
  };
  j2.createDocumentFragment = function() {
    return new Ya(this);
  };
  j2.createEvent = function(e2) {
    return new Xa(e2);
  };
  j2.createComment = function(e2) {
    return new za(e2, this);
  };
  j2.getElementById = function(e2) {
    e2 = String(e2);
    var t2 = Qa(this.childNodes, function(i2) {
      if (String(i2.id) === e2) return i2;
    });
    return t2 || null;
  };
  j2.getElementsByClassName = Re2.prototype.getElementsByClassName;
  j2.getElementsByTagName = Re2.prototype.getElementsByTagName;
  j2.contains = Re2.prototype.contains;
  j2.removeEventListener = ei;
  j2.addEventListener = Za;
  j2.dispatchEvent = $a;
});
var Pr = B$3(function(Hs, Or) {
  var ti = Ar();
  Or.exports = new ti();
});
var nt$2 = B$3(function(Bs, Nr) {
  var Ir = typeof global != "undefined" ? global : typeof window != "undefined" ? window : {}, ri = Pr(), qe2;
  typeof document != "undefined" ? qe2 = document : (qe2 = Ir["__GLOBAL_DOCUMENT_CACHE@4"], qe2 || (qe2 = Ir["__GLOBAL_DOCUMENT_CACHE@4"] = ri));
  Nr.exports = qe2;
});
function vt$2(r10) {
  if (Array.isArray(r10)) return r10;
}
__name(vt$2, "vt$2");
function mt$2(r10, e2) {
  var t2 = r10 == null ? null : typeof Symbol != "undefined" && r10[Symbol.iterator] || r10["@@iterator"];
  if (t2 != null) {
    var i2 = [], a = true, n2 = false, o2, s2;
    try {
      for (t2 = t2.call(r10); !(a = (o2 = t2.next()).done) && (i2.push(o2.value), !(e2 && i2.length === e2)); a = true) ;
    } catch (u2) {
      n2 = true, s2 = u2;
    } finally {
      try {
        !a && t2.return != null && t2.return();
      } finally {
        if (n2) throw s2;
      }
    }
    return i2;
  }
}
__name(mt$2, "mt$2");
function ht$1() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
__name(ht$1, "ht$1");
function ke$2(r10, e2) {
  (e2 == null || e2 > r10.length) && (e2 = r10.length);
  for (var t2 = 0, i2 = new Array(e2); t2 < e2; t2++) i2[t2] = r10[t2];
  return i2;
}
__name(ke$2, "ke$2");
function Ae$2(r10, e2) {
  if (r10) {
    if (typeof r10 == "string") return ke$2(r10, e2);
    var t2 = Object.prototype.toString.call(r10).slice(8, -1);
    if (t2 === "Object" && r10.constructor && (t2 = r10.constructor.name), t2 === "Map" || t2 === "Set") return Array.from(t2);
    if (t2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2)) return ke$2(r10, e2);
  }
}
__name(Ae$2, "Ae$2");
function H$2(r10, e2) {
  return vt$2(r10) || mt$2(r10, e2) || Ae$2(r10, e2) || ht$1();
}
__name(H$2, "H$2");
var be$1 = V$2(J$2());
var Ge$1 = V$2(J$2());
var gt$2 = V$2(J$2()), ra = { now: /* @__PURE__ */ __name(function() {
  var r10 = gt$2.default.performance, e2 = r10 && r10.timing, t2 = e2 && e2.navigationStart, i2 = typeof t2 == "number" && typeof r10.now == "function" ? t2 + r10.now() : Date.now();
  return Math.round(i2);
}, "now") }, A$1 = ra;
var ee$3 = /* @__PURE__ */ __name(function() {
  var e2, t2, i2;
  if (typeof ((e2 = Ge$1.default.crypto) === null || e2 === void 0 ? void 0 : e2.getRandomValues) == "function") {
    i2 = new Uint8Array(32), Ge$1.default.crypto.getRandomValues(i2);
    for (var a = 0; a < 32; a++) i2[a] = i2[a] % 16;
  } else {
    i2 = [];
    for (var n2 = 0; n2 < 32; n2++) i2[n2] = Math.random() * 16 | 0;
  }
  var o2 = 0;
  t2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(p2) {
    var b2 = p2 === "x" ? i2[o2] : i2[o2] & 3 | 8;
    return o2++, b2.toString(16);
  });
  var s2 = A$1.now(), u2 = s2 == null ? void 0 : s2.toString(16).substring(3);
  return u2 ? t2.substring(0, 28) + u2 : t2;
}, "ee$3"), Oe$1 = /* @__PURE__ */ __name(function() {
  return ("000000" + (Math.random() * Math.pow(36, 6) << 0).toString(36)).slice(-6);
}, "Oe$1");
var Q$2 = /* @__PURE__ */ __name(function(e2) {
  if (e2 && typeof e2.nodeName != "undefined") return e2.muxId || (e2.muxId = Oe$1()), e2.muxId;
  var t2;
  try {
    t2 = document.querySelector(e2);
  } catch (i2) {
  }
  return t2 && !t2.muxId && (t2.muxId = e2), (t2 == null ? void 0 : t2.muxId) || e2;
}, "Q$2"), se$3 = /* @__PURE__ */ __name(function(e2) {
  var t2;
  e2 && typeof e2.nodeName != "undefined" ? (t2 = e2, e2 = Q$2(t2)) : t2 = document.querySelector(e2);
  var i2 = t2 && t2.nodeName ? t2.nodeName.toLowerCase() : "";
  return [t2, e2, i2];
}, "se$3");
function bt$2(r10) {
  if (Array.isArray(r10)) return ke$2(r10);
}
__name(bt$2, "bt$2");
function Tt$2(r10) {
  if (typeof Symbol != "undefined" && r10[Symbol.iterator] != null || r10["@@iterator"] != null) return Array.from(r10);
}
__name(Tt$2, "Tt$2");
function wt$2() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
__name(wt$2, "wt$2");
function W$1(r10) {
  return bt$2(r10) || Tt$2(r10) || Ae$2(r10) || wt$2();
}
__name(W$1, "W$1");
var Y$2 = { TRACE: 0, DEBUG: 1, INFO: 2, WARN: 3, ERROR: 4 }, Et$2 = /* @__PURE__ */ __name(function(r10) {
  var e2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 3, t2, i2, a, n2, o2, s2 = [console, r10], u2 = (t2 = console.trace).bind.apply(t2, W$1(s2)), p2 = (i2 = console.info).bind.apply(i2, W$1(s2)), b2 = (a = console.debug).bind.apply(a, W$1(s2)), k2 = (n2 = console.warn).bind.apply(n2, W$1(s2)), y2 = (o2 = console.error).bind.apply(o2, W$1(s2)), c2 = e2;
  return { trace: /* @__PURE__ */ __name(function() {
    for (var T2 = arguments.length, x2 = new Array(T2), m2 = 0; m2 < T2; m2++) x2[m2] = arguments[m2];
    if (!(c2 > Y$2.TRACE)) return u2.apply(void 0, W$1(x2));
  }, "trace"), debug: /* @__PURE__ */ __name(function() {
    for (var T2 = arguments.length, x2 = new Array(T2), m2 = 0; m2 < T2; m2++) x2[m2] = arguments[m2];
    if (!(c2 > Y$2.DEBUG)) return b2.apply(void 0, W$1(x2));
  }, "debug"), info: /* @__PURE__ */ __name(function() {
    for (var T2 = arguments.length, x2 = new Array(T2), m2 = 0; m2 < T2; m2++) x2[m2] = arguments[m2];
    if (!(c2 > Y$2.INFO)) return p2.apply(void 0, W$1(x2));
  }, "info"), warn: /* @__PURE__ */ __name(function() {
    for (var T2 = arguments.length, x2 = new Array(T2), m2 = 0; m2 < T2; m2++) x2[m2] = arguments[m2];
    if (!(c2 > Y$2.WARN)) return k2.apply(void 0, W$1(x2));
  }, "warn"), error: /* @__PURE__ */ __name(function() {
    for (var T2 = arguments.length, x2 = new Array(T2), m2 = 0; m2 < T2; m2++) x2[m2] = arguments[m2];
    if (!(c2 > Y$2.ERROR)) return y2.apply(void 0, W$1(x2));
  }, "error"), get level() {
    return c2;
  }, set level(v2) {
    v2 !== this.level && (c2 = v2 != null ? v2 : e2);
  } };
}, "Et$2");
var q$2 = Et$2("[mux]");
var Pe$2 = V$2(J$2());
function ce$1() {
  var r10 = Pe$2.default.doNotTrack || Pe$2.default.navigator && Pe$2.default.navigator.doNotTrack;
  return r10 === "1";
}
__name(ce$1, "ce$1");
function g$5(r10) {
  if (r10 === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return r10;
}
__name(g$5, "g$5");
te$3();
function D$3(r10, e2) {
  if (!U$2(r10, e2)) throw new TypeError("Cannot call a class as a function");
}
__name(D$3, "D$3");
function kt$1(r10, e2) {
  for (var t2 = 0; t2 < e2.length; t2++) {
    var i2 = e2[t2];
    i2.enumerable = i2.enumerable || false, i2.configurable = true, "value" in i2 && (i2.writable = true), Object.defineProperty(r10, i2.key, i2);
  }
}
__name(kt$1, "kt$1");
function L$1(r10, e2, t2) {
  return e2 && kt$1(r10.prototype, e2), r10;
}
__name(L$1, "L$1");
function l$1(r10, e2, t2) {
  return e2 in r10 ? Object.defineProperty(r10, e2, { value: t2, enumerable: true, configurable: true, writable: true }) : r10[e2] = t2, r10;
}
__name(l$1, "l$1");
function X$2(r10) {
  return X$2 = Object.setPrototypeOf ? Object.getPrototypeOf : function(t2) {
    return t2.__proto__ || Object.getPrototypeOf(t2);
  }, X$2(r10);
}
__name(X$2, "X$2");
function xt$2(r10, e2) {
  for (; !Object.prototype.hasOwnProperty.call(r10, e2) && (r10 = X$2(r10), r10 !== null); ) ;
  return r10;
}
__name(xt$2, "xt$2");
function De$1(r10, e2, t2) {
  return typeof Reflect != "undefined" && Reflect.get ? De$1 = Reflect.get : De$1 = /* @__PURE__ */ __name(function(a, n2, o2) {
    var s2 = xt$2(a, n2);
    if (s2) {
      var u2 = Object.getOwnPropertyDescriptor(s2, n2);
      return u2.get ? u2.get.call(o2 || a) : u2.value;
    }
  }, "De$1"), De$1(r10, e2, t2 || r10);
}
__name(De$1, "De$1");
function Ie$1(r10, e2) {
  return Ie$1 = Object.setPrototypeOf || function(i2, a) {
    return i2.__proto__ = a, i2;
  }, Ie$1(r10, e2);
}
__name(Ie$1, "Ie$1");
function Dt$2(r10, e2) {
  if (typeof e2 != "function" && e2 !== null) throw new TypeError("Super expression must either be null or a function");
  r10.prototype = Object.create(e2 && e2.prototype, { constructor: { value: r10, writable: true, configurable: true } }), e2 && Ie$1(r10, e2);
}
__name(Dt$2, "Dt$2");
function St$1() {
  if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham) return false;
  if (typeof Proxy == "function") return true;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), true;
  } catch (r10) {
    return false;
  }
}
__name(St$1, "St$1");
Je$2();
function Rt$1(r10, e2) {
  return e2 && (Ne$2(e2) === "object" || typeof e2 == "function") ? e2 : g$5(r10);
}
__name(Rt$1, "Rt$1");
function qt$2(r10) {
  var e2 = St$1();
  return function() {
    var i2 = X$2(r10), a;
    if (e2) {
      var n2 = X$2(this).constructor;
      a = Reflect.construct(i2, arguments, n2);
    } else a = i2.apply(this, arguments);
    return Rt$1(this, a);
  };
}
__name(qt$2, "qt$2");
var F$2 = /* @__PURE__ */ __name(function(r10) {
  return re$3(r10)[0];
}, "F$2");
var re$3 = /* @__PURE__ */ __name(function(r10) {
  if (typeof r10 != "string" || r10 === "") return ["localhost"];
  var e2 = /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, t2 = r10.match(e2) || [], i2 = t2[4], a;
  return i2 && (a = (i2.match(/[^\.]+\.[^\.]+$/) || [])[0]), [i2, a];
}, "re$3");
var Le$1 = V$2(J$2()), aa$1 = { exists: /* @__PURE__ */ __name(function() {
  var r10 = Le$1.default.performance, e2 = r10 && r10.timing;
  return e2 !== void 0;
}, "exists"), domContentLoadedEventEnd: /* @__PURE__ */ __name(function() {
  var r10 = Le$1.default.performance, e2 = r10 && r10.timing;
  return e2 && e2.domContentLoadedEventEnd;
}, "domContentLoadedEventEnd"), navigationStart: /* @__PURE__ */ __name(function() {
  var r10 = Le$1.default.performance, e2 = r10 && r10.timing;
  return e2 && e2.navigationStart;
}, "navigationStart") }, _e$2 = aa$1;
function O$2(r10, e2, t2) {
  t2 = t2 === void 0 ? 1 : t2, r10[e2] = r10[e2] || 0, r10[e2] += t2;
}
__name(O$2, "O$2");
function ue$1(r10) {
  for (var e2 = 1; e2 < arguments.length; e2++) {
    var t2 = arguments[e2] != null ? arguments[e2] : {}, i2 = Object.keys(t2);
    typeof Object.getOwnPropertySymbols == "function" && (i2 = i2.concat(Object.getOwnPropertySymbols(t2).filter(function(a) {
      return Object.getOwnPropertyDescriptor(t2, a).enumerable;
    }))), i2.forEach(function(a) {
      l$1(r10, a, t2[a]);
    });
  }
  return r10;
}
__name(ue$1, "ue$1");
function ia$1(r10, e2) {
  var t2 = Object.keys(r10);
  if (Object.getOwnPropertySymbols) {
    var i2 = Object.getOwnPropertySymbols(r10);
    t2.push.apply(t2, i2);
  }
  return t2;
}
__name(ia$1, "ia$1");
function fe$2(r10, e2) {
  return e2 = e2 != null ? e2 : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(r10, Object.getOwnPropertyDescriptors(e2)) : ia$1(Object(e2)).forEach(function(t2) {
    Object.defineProperty(r10, t2, Object.getOwnPropertyDescriptor(e2, t2));
  }), r10;
}
__name(fe$2, "fe$2");
var na$1 = ["x-cdn", "content-type"], At$2 = ["x-request-id", "cf-ray", "x-amz-cf-id", "x-akamai-request-id"], oa$1 = na$1.concat(At$2);
function pe(r10) {
  r10 = r10 || "";
  var e2 = {}, t2 = r10.trim().split(/[\r\n]+/);
  return t2.forEach(function(i2) {
    if (i2) {
      var a = i2.split(": "), n2 = a.shift();
      n2 && (oa$1.indexOf(n2.toLowerCase()) >= 0 || n2.toLowerCase().indexOf("x-litix-") === 0) && (e2[n2] = a.join(": "));
    }
  }), e2;
}
__name(pe, "pe");
function de$3(r10) {
  if (r10) {
    var e2 = At$2.find(function(t2) {
      return r10[t2] !== void 0;
    });
    return e2 ? r10[e2] : void 0;
  }
}
__name(de$3, "de$3");
var sa$1 = /* @__PURE__ */ __name(function(r10) {
  var e2 = {};
  for (var t2 in r10) {
    var i2 = r10[t2], a = i2["DATA-ID"].search("io.litix.data.");
    if (a !== -1) {
      var n2 = i2["DATA-ID"].replace("io.litix.data.", "");
      e2[n2] = i2.VALUE;
    }
  }
  return e2;
}, "sa$1"), Ce$2 = sa$1;
var Me$1 = /* @__PURE__ */ __name(function(r10) {
  if (!r10) return {};
  var e2 = _e$2.navigationStart(), t2 = r10.loading, i2 = t2 ? t2.start : r10.trequest, a = t2 ? t2.first : r10.tfirst, n2 = t2 ? t2.end : r10.tload;
  return { bytesLoaded: r10.total, requestStart: Math.round(e2 + i2), responseStart: Math.round(e2 + a), responseEnd: Math.round(e2 + n2) };
}, "Me$1"), Se$2 = /* @__PURE__ */ __name(function(r10) {
  if (!(!r10 || typeof r10.getAllResponseHeaders != "function")) return pe(r10.getAllResponseHeaders());
}, "Se$2"), Ot$2 = /* @__PURE__ */ __name(function(r10, e2, t2) {
  var a = arguments.length > 4 ? arguments[4] : void 0, n2 = r10.log, o2 = r10.utils.secondsToMs, s2 = /* @__PURE__ */ __name(function(m2) {
    var f2 = parseInt(a.version), _2;
    return f2 === 1 && m2.programDateTime !== null && (_2 = m2.programDateTime), f2 === 0 && m2.pdt !== null && (_2 = m2.pdt), _2;
  }, "s");
  if (!_e$2.exists()) {
    n2.warn("performance timing not supported. Not tracking HLS.js.");
    return;
  }
  var u2 = /* @__PURE__ */ __name(function(m2, f2) {
    return r10.emit(e2, m2, f2);
  }, "u"), p2 = /* @__PURE__ */ __name(function(m2, f2) {
    var _2 = f2.levels, d2 = f2.audioTracks, h2 = f2.url, w2 = f2.stats, E2 = f2.networkDetails, S2 = f2.sessionData, N2 = {}, M2 = {};
    _2.forEach(function(G2, oe2) {
      N2[oe2] = { width: G2.width, height: G2.height, bitrate: G2.bitrate, attrs: G2.attrs };
    }), d2.forEach(function(G2, oe2) {
      M2[oe2] = { name: G2.name, language: G2.lang, bitrate: G2.bitrate };
    });
    var P2 = Me$1(w2), R2 = P2.bytesLoaded, Z2 = P2.requestStart, Te2 = P2.responseStart, we2 = P2.responseEnd;
    u2("requestcompleted", fe$2(ue$1({}, Ce$2(S2)), { request_event_type: m2, request_bytes_loaded: R2, request_start: Z2, request_response_start: Te2, request_response_end: we2, request_type: "manifest", request_hostname: F$2(h2), request_response_headers: Se$2(E2), request_rendition_lists: { media: N2, audio: M2, video: {} } }));
  }, "p");
  t2.on(a.Events.MANIFEST_LOADED, p2);
  var b2 = /* @__PURE__ */ __name(function(m2, f2) {
    var _2 = f2.details, d2 = f2.level, h2 = f2.networkDetails, w2 = f2.stats, E2 = Me$1(w2), S2 = E2.bytesLoaded, N2 = E2.requestStart, M2 = E2.responseStart, P2 = E2.responseEnd, R2 = _2.fragments[_2.fragments.length - 1], Z2 = s2(R2) + o2(R2.duration);
    u2("requestcompleted", { request_event_type: m2, request_bytes_loaded: S2, request_start: N2, request_response_start: M2, request_response_end: P2, request_current_level: d2, request_type: "manifest", request_hostname: F$2(_2.url), request_response_headers: Se$2(h2), video_holdback: _2.holdBack && o2(_2.holdBack), video_part_holdback: _2.partHoldBack && o2(_2.partHoldBack), video_part_target_duration: _2.partTarget && o2(_2.partTarget), video_target_duration: _2.targetduration && o2(_2.targetduration), video_source_is_live: _2.live, player_manifest_newest_program_time: isNaN(Z2) ? void 0 : Z2 });
  }, "b");
  t2.on(a.Events.LEVEL_LOADED, b2);
  var k2 = /* @__PURE__ */ __name(function(m2, f2) {
    var _2 = f2.details, d2 = f2.networkDetails, h2 = f2.stats, w2 = Me$1(h2), E2 = w2.bytesLoaded, S2 = w2.requestStart, N2 = w2.responseStart, M2 = w2.responseEnd;
    u2("requestcompleted", { request_event_type: m2, request_bytes_loaded: E2, request_start: S2, request_response_start: N2, request_response_end: M2, request_type: "manifest", request_hostname: F$2(_2.url), request_response_headers: Se$2(d2) });
  }, "k");
  t2.on(a.Events.AUDIO_TRACK_LOADED, k2);
  var y2 = /* @__PURE__ */ __name(function(m2, f2) {
    var _2 = f2.stats, d2 = f2.networkDetails, h2 = f2.frag;
    _2 = _2 || h2.stats;
    var w2 = Me$1(_2), E2 = w2.bytesLoaded, S2 = w2.requestStart, N2 = w2.responseStart, M2 = w2.responseEnd, P2 = d2 ? Se$2(d2) : void 0, R2 = { request_event_type: m2, request_bytes_loaded: E2, request_start: S2, request_response_start: N2, request_response_end: M2, request_hostname: d2 ? F$2(d2.responseURL) : void 0, request_id: P2 ? de$3(P2) : void 0, request_response_headers: P2, request_media_duration: h2.duration, request_url: d2 == null ? void 0 : d2.responseURL };
    h2.type === "main" ? (R2.request_type = "media", R2.request_current_level = h2.level, R2.request_video_width = (t2.levels[h2.level] || {}).width, R2.request_video_height = (t2.levels[h2.level] || {}).height, R2.request_labeled_bitrate = (t2.levels[h2.level] || {}).bitrate) : R2.request_type = h2.type, u2("requestcompleted", R2);
  }, "y");
  t2.on(a.Events.FRAG_LOADED, y2);
  var c2 = /* @__PURE__ */ __name(function(m2, f2) {
    var _2 = f2.frag, d2 = _2.start, h2 = s2(_2), w2 = { currentFragmentPDT: h2, currentFragmentStart: o2(d2) };
    u2("fragmentchange", w2);
  }, "c");
  t2.on(a.Events.FRAG_CHANGED, c2);
  var v2 = /* @__PURE__ */ __name(function(m2, f2) {
    var _2 = f2.type, d2 = f2.details, h2 = f2.response, w2 = f2.fatal, E2 = f2.frag, S2 = f2.networkDetails, N2 = (E2 == null ? void 0 : E2.url) || f2.url || "", M2 = S2 ? Se$2(S2) : void 0;
    if ((d2 === a.ErrorDetails.MANIFEST_LOAD_ERROR || d2 === a.ErrorDetails.MANIFEST_LOAD_TIMEOUT || d2 === a.ErrorDetails.FRAG_LOAD_ERROR || d2 === a.ErrorDetails.FRAG_LOAD_TIMEOUT || d2 === a.ErrorDetails.LEVEL_LOAD_ERROR || d2 === a.ErrorDetails.LEVEL_LOAD_TIMEOUT || d2 === a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR || d2 === a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT || d2 === a.ErrorDetails.SUBTITLE_LOAD_ERROR || d2 === a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT || d2 === a.ErrorDetails.KEY_LOAD_ERROR || d2 === a.ErrorDetails.KEY_LOAD_TIMEOUT) && u2("requestfailed", { request_error: d2, request_url: N2, request_hostname: F$2(N2), request_id: M2 ? de$3(M2) : void 0, request_type: d2 === a.ErrorDetails.FRAG_LOAD_ERROR || d2 === a.ErrorDetails.FRAG_LOAD_TIMEOUT ? "media" : d2 === a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR || d2 === a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT ? "audio" : d2 === a.ErrorDetails.SUBTITLE_LOAD_ERROR || d2 === a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT ? "subtitle" : d2 === a.ErrorDetails.KEY_LOAD_ERROR || d2 === a.ErrorDetails.KEY_LOAD_TIMEOUT ? "encryption" : "manifest", request_error_code: h2 == null ? void 0 : h2.code, request_error_text: h2 == null ? void 0 : h2.text }), w2) {
      var P2, R2 = "".concat(N2 ? "url: ".concat(N2, "\n") : "") + "".concat(h2 && (h2.code || h2.text) ? "response: ".concat(h2.code, ", ").concat(h2.text, "\n") : "") + "".concat(f2.reason ? "failure reason: ".concat(f2.reason, "\n") : "") + "".concat(f2.level ? "level: ".concat(f2.level, "\n") : "") + "".concat(f2.parent ? "parent stream controller: ".concat(f2.parent, "\n") : "") + "".concat(f2.buffer ? "buffer length: ".concat(f2.buffer, "\n") : "") + "".concat(f2.error ? "error: ".concat(f2.error, "\n") : "") + "".concat(f2.event ? "event: ".concat(f2.event, "\n") : "") + "".concat(f2.err ? "error message: ".concat((P2 = f2.err) === null || P2 === void 0 ? void 0 : P2.message, "\n") : "");
      u2("error", { player_error_code: _2, player_error_message: d2, player_error_context: R2 });
    }
  }, "v");
  t2.on(a.Events.ERROR, v2);
  var T2 = /* @__PURE__ */ __name(function(m2, f2) {
    var _2 = f2.frag, d2 = _2 && _2._url || "";
    u2("requestcanceled", { request_event_type: m2, request_url: d2, request_type: "media", request_hostname: F$2(d2) });
  }, "T");
  t2.on(a.Events.FRAG_LOAD_EMERGENCY_ABORTED, T2);
  var x2 = /* @__PURE__ */ __name(function(m2, f2) {
    var _2 = f2.level, d2 = t2.levels[_2];
    if (d2 && d2.attrs && d2.attrs.BANDWIDTH) {
      var h2 = d2.attrs.BANDWIDTH, w2, E2 = parseFloat(d2.attrs["FRAME-RATE"]);
      isNaN(E2) || (w2 = E2), h2 ? u2("renditionchange", { video_source_fps: w2, video_source_bitrate: h2, video_source_width: d2.width, video_source_height: d2.height, video_source_rendition_name: d2.name, video_source_codec: d2 == null ? void 0 : d2.videoCodec }) : n2.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js");
    }
  }, "x");
  t2.on(a.Events.LEVEL_SWITCHED, x2), t2._stopMuxMonitor = function() {
    t2.off(a.Events.MANIFEST_LOADED, p2), t2.off(a.Events.LEVEL_LOADED, b2), t2.off(a.Events.AUDIO_TRACK_LOADED, k2), t2.off(a.Events.FRAG_LOADED, y2), t2.off(a.Events.FRAG_CHANGED, c2), t2.off(a.Events.ERROR, v2), t2.off(a.Events.FRAG_LOAD_EMERGENCY_ABORTED, T2), t2.off(a.Events.LEVEL_SWITCHED, x2), t2.off(a.Events.DESTROYING, t2._stopMuxMonitor), delete t2._stopMuxMonitor;
  }, t2.on(a.Events.DESTROYING, t2._stopMuxMonitor);
}, "Ot$2"), Pt$2 = /* @__PURE__ */ __name(function(r10) {
  r10 && typeof r10._stopMuxMonitor == "function" && r10._stopMuxMonitor();
}, "Pt$2");
var It$2 = /* @__PURE__ */ __name(function(r10, e2) {
  if (!r10 || !r10.requestEndDate) return {};
  var t2 = F$2(r10.url), i2 = r10.url, a = r10.bytesLoaded, n2 = new Date(r10.requestStartDate).getTime(), o2 = new Date(r10.firstByteDate).getTime(), s2 = new Date(r10.requestEndDate).getTime(), u2 = isNaN(r10.duration) ? 0 : r10.duration, p2 = typeof e2.getMetricsFor == "function" ? e2.getMetricsFor(r10.mediaType).HttpList : e2.getDashMetrics().getHttpRequests(r10.mediaType), b2;
  p2.length > 0 && (b2 = pe(p2[p2.length - 1]._responseHeaders || ""));
  var k2 = b2 ? de$3(b2) : void 0;
  return { requestStart: n2, requestResponseStart: o2, requestResponseEnd: s2, requestBytesLoaded: a, requestResponseHeaders: b2, requestMediaDuration: u2, requestHostname: t2, requestUrl: i2, requestId: k2 };
}, "It$2"), ua$1 = /* @__PURE__ */ __name(function(r10, e2) {
  var t2 = e2.getQualityFor(r10), i2 = e2.getCurrentTrackFor(r10).bitrateList;
  return i2 ? { currentLevel: t2, renditionWidth: i2[t2].width || null, renditionHeight: i2[t2].height || null, renditionBitrate: i2[t2].bandwidth } : {};
}, "ua$1"), da$1 = /* @__PURE__ */ __name(function(r10) {
  var e2;
  return (e2 = r10.match(/.*codecs\*?="(.*)"/)) === null || e2 === void 0 ? void 0 : e2[1];
}, "da$1"), la$1 = /* @__PURE__ */ __name(function(e2) {
  try {
    var t2, i2, a = (i2 = e2.getVersion) === null || i2 === void 0 || (t2 = i2.call(e2)) === null || t2 === void 0 ? void 0 : t2.split(".").map(function(n2) {
      return parseInt(n2);
    })[0];
    return a;
  } catch (n2) {
    return false;
  }
}, "la$1"), Nt$2 = /* @__PURE__ */ __name(function(r10, e2, t2) {
  var a = r10.log;
  if (!t2 || !t2.on) {
    a.warn("Invalid dash.js player reference. Monitoring blocked.");
    return;
  }
  var n2 = la$1(t2), o2 = /* @__PURE__ */ __name(function(_2, d2) {
    return r10.emit(e2, _2, d2);
  }, "o"), s2 = /* @__PURE__ */ __name(function(_2) {
    var d2 = _2.type, h2 = _2.data, w2 = (h2 || {}).url;
    o2("requestcompleted", { request_event_type: d2, request_start: 0, request_response_start: 0, request_response_end: 0, request_bytes_loaded: -1, request_type: "manifest", request_hostname: F$2(w2), request_url: w2 });
  }, "s");
  t2.on("manifestLoaded", s2);
  var u2 = {}, p2 = /* @__PURE__ */ __name(function(_2) {
    if (typeof _2.getRequests != "function") return null;
    var d2 = _2.getRequests({ state: "executed" });
    return d2.length === 0 ? null : d2[d2.length - 1];
  }, "p"), b2 = /* @__PURE__ */ __name(function(_2) {
    var d2 = _2.type, h2 = _2.fragmentModel, w2 = _2.chunk, E2 = p2(h2);
    k2({ type: d2, request: E2, chunk: w2 });
  }, "b"), k2 = /* @__PURE__ */ __name(function(_2) {
    var d2 = _2.type, h2 = _2.chunk, w2 = _2.request, E2 = (h2 || {}).mediaInfo, S2 = E2 || {}, N2 = S2.type, M2 = S2.bitrateList;
    M2 = M2 || [];
    var P2 = {};
    M2.forEach(function(Ee2, z2) {
      P2[z2] = {}, P2[z2].width = Ee2.width, P2[z2].height = Ee2.height, P2[z2].bitrate = Ee2.bandwidth, P2[z2].attrs = {};
    }), N2 === "video" ? u2.video = P2 : N2 === "audio" ? u2.audio = P2 : u2.media = P2;
    var R2 = It$2(w2, t2), Z2 = R2.requestStart, Te2 = R2.requestResponseStart, we2 = R2.requestResponseEnd, G2 = R2.requestResponseHeaders, oe2 = R2.requestMediaDuration, Ve2 = R2.requestHostname, We2 = R2.requestUrl, je2 = R2.requestId;
    o2("requestcompleted", { request_event_type: d2, request_start: Z2, request_response_start: Te2, request_response_end: we2, request_bytes_loaded: -1, request_type: N2 + "_init", request_response_headers: G2, request_hostname: Ve2, request_id: je2, request_url: We2, request_media_duration: oe2, request_rendition_lists: u2 });
  }, "k");
  n2 >= 4 ? t2.on("initFragmentLoaded", k2) : t2.on("initFragmentLoaded", b2);
  var y2 = /* @__PURE__ */ __name(function(_2) {
    var d2 = _2.type, h2 = _2.fragmentModel, w2 = _2.chunk, E2 = p2(h2);
    c2({ type: d2, request: E2, chunk: w2 });
  }, "y"), c2 = /* @__PURE__ */ __name(function(_2) {
    var d2 = _2.type, h2 = _2.chunk, w2 = _2.request, E2 = h2 || {}, S2 = E2.mediaInfo, N2 = E2.start, M2 = S2 || {}, P2 = M2.type, R2 = It$2(w2, t2), Z2 = R2.requestStart, Te2 = R2.requestResponseStart, we2 = R2.requestResponseEnd, G2 = R2.requestBytesLoaded, oe2 = R2.requestResponseHeaders, Ve2 = R2.requestMediaDuration, We2 = R2.requestHostname, je2 = R2.requestUrl, Ee2 = R2.requestId, z2 = ua$1(P2, t2), Jr = z2.currentLevel, Qr2 = z2.renditionWidth, zr2 = z2.renditionHeight, Kr = z2.renditionBitrate;
    o2("requestcompleted", { request_event_type: d2, request_start: Z2, request_response_start: Te2, request_response_end: we2, request_bytes_loaded: G2, request_type: P2, request_response_headers: oe2, request_hostname: We2, request_id: Ee2, request_url: je2, request_media_start_time: N2, request_media_duration: Ve2, request_current_level: Jr, request_labeled_bitrate: Kr, request_video_width: Qr2, request_video_height: zr2 });
  }, "c");
  n2 >= 4 ? t2.on("mediaFragmentLoaded", c2) : t2.on("mediaFragmentLoaded", y2);
  var v2 = { video: void 0, audio: void 0, totalBitrate: void 0 }, T2 = /* @__PURE__ */ __name(function() {
    if (v2.video && typeof v2.video.bitrate == "number") {
      if (!(v2.video.width && v2.video.height)) {
        a.warn("have bitrate info for video but missing width/height");
        return;
      }
      var _2 = v2.video.bitrate;
      if (v2.audio && typeof v2.audio.bitrate == "number" && (_2 += v2.audio.bitrate), _2 !== v2.totalBitrate) return v2.totalBitrate = _2, { video_source_bitrate: _2, video_source_height: v2.video.height, video_source_width: v2.video.width, video_source_codec: da$1(v2.video.codec) };
    }
  }, "T"), x2 = /* @__PURE__ */ __name(function(_2, d2, h2) {
    if (typeof _2.newQuality != "number") {
      a.warn("missing evt.newQuality in qualityChangeRendered event", _2);
      return;
    }
    var w2 = _2.mediaType;
    if (w2 === "audio" || w2 === "video") {
      var E2 = t2.getBitrateInfoListFor(w2).find(function(N2) {
        var M2 = N2.qualityIndex;
        return M2 === _2.newQuality;
      });
      if (!(E2 && typeof E2.bitrate == "number")) {
        a.warn("missing bitrate info for ".concat(w2));
        return;
      }
      v2[w2] = fe$2(ue$1({}, E2), { codec: t2.getCurrentTrackFor(w2).codec });
      var S2 = T2();
      S2 && o2("renditionchange", S2);
    }
  }, "x");
  t2.on("qualityChangeRendered", x2);
  var m2 = /* @__PURE__ */ __name(function(_2) {
    var d2 = _2.request, h2 = _2.mediaType;
    d2 = d2 || {}, o2("requestcanceled", { request_event_type: d2.type + "_" + d2.action, request_url: d2.url, request_type: h2, request_hostname: F$2(d2.url) });
  }, "m");
  t2.on("fragmentLoadingAbandoned", m2);
  var f2 = /* @__PURE__ */ __name(function(_2) {
    var d2 = _2.error, h2, w2, E2 = (d2 == null || (h2 = d2.data) === null || h2 === void 0 ? void 0 : h2.request) || {}, S2 = (d2 == null || (w2 = d2.data) === null || w2 === void 0 ? void 0 : w2.response) || {};
    (d2 == null ? void 0 : d2.code) === 27 && o2("requestfailed", { request_error: E2.type + "_" + E2.action, request_url: E2.url, request_hostname: F$2(E2.url), request_type: E2.mediaType, request_error_code: S2.status, request_error_text: S2.statusText });
    var N2 = "".concat(E2 != null && E2.url ? "url: ".concat(E2.url, "\n") : "") + "".concat(S2 != null && S2.status || S2 != null && S2.statusText ? "response: ".concat(S2 == null ? void 0 : S2.status, ", ").concat(S2 == null ? void 0 : S2.statusText, "\n") : "");
    o2("error", { player_error_code: d2 == null ? void 0 : d2.code, player_error_message: d2 == null ? void 0 : d2.message, player_error_context: N2 });
  }, "f");
  t2.on("error", f2), t2._stopMuxMonitor = function() {
    t2.off("manifestLoaded", s2), t2.off("initFragmentLoaded", k2), t2.off("mediaFragmentLoaded", c2), t2.off("qualityChangeRendered", x2), t2.off("error", f2), t2.off("fragmentLoadingAbandoned", m2), delete t2._stopMuxMonitor;
  };
}, "Nt$2"), Lt$2 = /* @__PURE__ */ __name(function(r10) {
  r10 && typeof r10._stopMuxMonitor == "function" && r10._stopMuxMonitor();
}, "Lt$2");
var Ct$2 = 0, ca$1 = (function() {
  function r10() {
    D$3(this, r10), l$1(this, "_listeners", void 0);
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "on", value: /* @__PURE__ */ __name(function(t2, i2, a) {
    return i2._eventEmitterGuid = i2._eventEmitterGuid || ++Ct$2, this._listeners = this._listeners || {}, this._listeners[t2] = this._listeners[t2] || [], a && (i2 = i2.bind(a)), this._listeners[t2].push(i2), i2;
  }, "value") }, { key: "off", value: /* @__PURE__ */ __name(function(t2, i2) {
    var a = this._listeners && this._listeners[t2];
    a && a.forEach(function(n2, o2) {
      n2._eventEmitterGuid === i2._eventEmitterGuid && a.splice(o2, 1);
    });
  }, "value") }, { key: "one", value: /* @__PURE__ */ __name(function(t2, i2, a) {
    var n2 = this;
    i2._eventEmitterGuid = i2._eventEmitterGuid || ++Ct$2;
    var o2 = /* @__PURE__ */ __name(function() {
      n2.off(t2, o2), i2.apply(a || this, arguments);
    }, "o");
    o2._eventEmitterGuid = i2._eventEmitterGuid, this.on(t2, o2);
  }, "value") }, { key: "emit", value: /* @__PURE__ */ __name(function(t2, i2) {
    var a = this;
    if (this._listeners) {
      i2 = i2 || {};
      var n2 = this._listeners["before*"] || [], o2 = this._listeners[t2] || [], s2 = this._listeners["after" + t2] || [], u2 = /* @__PURE__ */ __name(function(p2, b2) {
        p2 = p2.slice(), p2.forEach(function(k2) {
          k2.call(a, { type: t2 }, b2);
        });
      }, "u");
      u2(n2, i2), u2(o2, i2), u2(s2, i2);
    }
  }, "value") }]), r10;
})(), Mt$2 = ca$1;
var He$1 = V$2(J$2()), _a$2 = (function() {
  function r10(e2) {
    var t2 = this;
    D$3(this, r10), l$1(this, "_playbackHeartbeatInterval", void 0), l$1(this, "_playheadShouldBeProgressing", void 0), l$1(this, "pm", void 0), this.pm = e2, this._playbackHeartbeatInterval = null, this._playheadShouldBeProgressing = false, e2.on("playing", function() {
      t2._playheadShouldBeProgressing = true;
    }), e2.on("play", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("playing", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("adbreakstart", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("adplay", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("adplaying", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("devicewake", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("viewstart", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("rebufferstart", this._startPlaybackHeartbeatInterval.bind(this)), e2.on("pause", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("ended", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("viewend", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("error", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("aderror", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("adpause", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("adended", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("adbreakend", this._stopPlaybackHeartbeatInterval.bind(this)), e2.on("seeked", function() {
      e2.data.player_is_paused ? t2._stopPlaybackHeartbeatInterval() : t2._startPlaybackHeartbeatInterval();
    }), e2.on("timeupdate", function() {
      t2._playbackHeartbeatInterval !== null && e2.emit("playbackheartbeat");
    }), e2.on("devicesleep", function(i2, a) {
      t2._playbackHeartbeatInterval !== null && (He$1.default.clearInterval(t2._playbackHeartbeatInterval), e2.emit("playbackheartbeatend", { viewer_time: a.viewer_time }), t2._playbackHeartbeatInterval = null);
    });
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "_startPlaybackHeartbeatInterval", value: /* @__PURE__ */ __name(function() {
    var t2 = this;
    this._playbackHeartbeatInterval === null && (this.pm.emit("playbackheartbeat"), this._playbackHeartbeatInterval = He$1.default.setInterval(function() {
      t2.pm.emit("playbackheartbeat");
    }, this.pm.playbackHeartbeatTime));
  }, "value") }, { key: "_stopPlaybackHeartbeatInterval", value: /* @__PURE__ */ __name(function() {
    this._playheadShouldBeProgressing = false, this._playbackHeartbeatInterval !== null && (He$1.default.clearInterval(this._playbackHeartbeatInterval), this.pm.emit("playbackheartbeatend"), this._playbackHeartbeatInterval = null);
  }, "value") }]), r10;
})(), Ht$2 = _a$2;
var fa = /* @__PURE__ */ __name(function r(e2) {
  var t2 = this;
  D$3(this, r), l$1(this, "viewErrored", void 0), e2.on("viewinit", function() {
    t2.viewErrored = false;
  }), e2.on("error", function(i2, a) {
    try {
      var n2 = e2.errorTranslator({ player_error_code: a.player_error_code, player_error_message: a.player_error_message, player_error_context: a.player_error_context, player_error_severity: a.player_error_severity, player_error_business_exception: a.player_error_business_exception });
      n2 && (e2.data.player_error_code = n2.player_error_code || a.player_error_code, e2.data.player_error_message = n2.player_error_message || a.player_error_message, e2.data.player_error_context = n2.player_error_context || a.player_error_context, e2.data.player_error_severity = n2.player_error_severity || a.player_error_severity, e2.data.player_error_business_exception = n2.player_error_business_exception || a.player_error_business_exception, t2.viewErrored = true);
    } catch (o2) {
      e2.mux.log.warn("Exception in error translator callback.", o2), t2.viewErrored = true;
    }
  }), e2.on("aftererror", function() {
    var i2, a, n2, o2, s2;
    (i2 = e2.data) === null || i2 === void 0 || delete i2.player_error_code, (a = e2.data) === null || a === void 0 || delete a.player_error_message, (n2 = e2.data) === null || n2 === void 0 || delete n2.player_error_context, (o2 = e2.data) === null || o2 === void 0 || delete o2.player_error_severity, (s2 = e2.data) === null || s2 === void 0 || delete s2.player_error_business_exception;
  });
}, "r"), Bt$2 = fa;
var pa = (function() {
  function r10(e2) {
    D$3(this, r10), l$1(this, "_watchTimeTrackerLastCheckedTime", void 0), l$1(this, "pm", void 0), this.pm = e2, this._watchTimeTrackerLastCheckedTime = null, e2.on("playbackheartbeat", this._updateWatchTime.bind(this)), e2.on("playbackheartbeatend", this._clearWatchTimeState.bind(this));
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "_updateWatchTime", value: /* @__PURE__ */ __name(function(t2, i2) {
    var a = i2.viewer_time;
    this._watchTimeTrackerLastCheckedTime === null && (this._watchTimeTrackerLastCheckedTime = a), O$2(this.pm.data, "view_watch_time", a - this._watchTimeTrackerLastCheckedTime), this._watchTimeTrackerLastCheckedTime = a;
  }, "value") }, { key: "_clearWatchTimeState", value: /* @__PURE__ */ __name(function(t2, i2) {
    this._updateWatchTime(t2, i2), this._watchTimeTrackerLastCheckedTime = null;
  }, "value") }]), r10;
})(), Ut$2 = pa;
var va$1 = (function() {
  function r10(e2) {
    var t2 = this;
    D$3(this, r10), l$1(this, "_playbackTimeTrackerLastPlayheadPosition", void 0), l$1(this, "_lastTime", void 0), l$1(this, "_isAdPlaying", void 0), l$1(this, "_callbackUpdatePlaybackTime", void 0), l$1(this, "pm", void 0), this.pm = e2, this._playbackTimeTrackerLastPlayheadPosition = -1, this._lastTime = A$1.now(), this._isAdPlaying = false, this._callbackUpdatePlaybackTime = null;
    var i2 = this._startPlaybackTimeTracking.bind(this);
    e2.on("playing", i2), e2.on("adplaying", i2), e2.on("seeked", i2);
    var a = this._stopPlaybackTimeTracking.bind(this);
    e2.on("playbackheartbeatend", a), e2.on("seeking", a), e2.on("adplaying", function() {
      t2._isAdPlaying = true;
    }), e2.on("adended", function() {
      t2._isAdPlaying = false;
    }), e2.on("adpause", function() {
      t2._isAdPlaying = false;
    }), e2.on("adbreakstart", function() {
      t2._isAdPlaying = false;
    }), e2.on("adbreakend", function() {
      t2._isAdPlaying = false;
    }), e2.on("adplay", function() {
      t2._isAdPlaying = false;
    }), e2.on("viewinit", function() {
      t2._playbackTimeTrackerLastPlayheadPosition = -1, t2._lastTime = A$1.now(), t2._isAdPlaying = false, t2._callbackUpdatePlaybackTime = null;
    });
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "_startPlaybackTimeTracking", value: /* @__PURE__ */ __name(function() {
    this._callbackUpdatePlaybackTime === null && (this._callbackUpdatePlaybackTime = this._updatePlaybackTime.bind(this), this._playbackTimeTrackerLastPlayheadPosition = this.pm.data.player_playhead_time, this.pm.on("playbackheartbeat", this._callbackUpdatePlaybackTime));
  }, "value") }, { key: "_stopPlaybackTimeTracking", value: /* @__PURE__ */ __name(function() {
    this._callbackUpdatePlaybackTime && (this._updatePlaybackTime(), this.pm.off("playbackheartbeat", this._callbackUpdatePlaybackTime), this._callbackUpdatePlaybackTime = null, this._playbackTimeTrackerLastPlayheadPosition = -1);
  }, "value") }, { key: "_updatePlaybackTime", value: /* @__PURE__ */ __name(function() {
    var t2 = this.pm.data.player_playhead_time, i2 = A$1.now(), a = -1;
    this._playbackTimeTrackerLastPlayheadPosition >= 0 && t2 > this._playbackTimeTrackerLastPlayheadPosition ? a = t2 - this._playbackTimeTrackerLastPlayheadPosition : this._isAdPlaying && (a = i2 - this._lastTime), a > 0 && a <= 1e3 && O$2(this.pm.data, "view_content_playback_time", a), this._playbackTimeTrackerLastPlayheadPosition = t2, this._lastTime = i2;
  }, "value") }]), r10;
})(), Ft$1 = va$1;
var ma$1 = (function() {
  function r10(e2) {
    D$3(this, r10), l$1(this, "pm", void 0), this.pm = e2;
    var t2 = this._updatePlayheadTime.bind(this);
    e2.on("playbackheartbeat", t2), e2.on("playbackheartbeatend", t2), e2.on("timeupdate", t2), e2.on("destroy", function() {
      e2.off("timeupdate", t2);
    });
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "_updateMaxPlayheadPosition", value: /* @__PURE__ */ __name(function() {
    this.pm.data.view_max_playhead_position = typeof this.pm.data.view_max_playhead_position == "undefined" ? this.pm.data.player_playhead_time : Math.max(this.pm.data.view_max_playhead_position, this.pm.data.player_playhead_time);
  }, "value") }, { key: "_updatePlayheadTime", value: /* @__PURE__ */ __name(function(t2, i2) {
    var a = this, n2 = /* @__PURE__ */ __name(function() {
      a.pm.currentFragmentPDT && a.pm.currentFragmentStart && (a.pm.data.player_program_time = a.pm.currentFragmentPDT + a.pm.data.player_playhead_time - a.pm.currentFragmentStart);
    }, "n");
    if (i2 && i2.player_playhead_time) this.pm.data.player_playhead_time = i2.player_playhead_time, n2(), this._updateMaxPlayheadPosition();
    else if (this.pm.getPlayheadTime) {
      var o2 = this.pm.getPlayheadTime();
      typeof o2 != "undefined" && (this.pm.data.player_playhead_time = o2, n2(), this._updateMaxPlayheadPosition());
    }
  }, "value") }]), r10;
})(), Vt$2 = ma$1;
var Wt$2 = 5 * 60 * 1e3, ha = /* @__PURE__ */ __name(function r2(e2) {
  if (D$3(this, r2), !e2.disableRebufferTracking) {
    var t2, i2 = /* @__PURE__ */ __name(function(n2, o2) {
      a(o2), t2 = void 0;
    }, "i"), a = /* @__PURE__ */ __name(function(n2) {
      if (t2) {
        var o2 = n2.viewer_time - t2;
        O$2(e2.data, "view_rebuffer_duration", o2), t2 = n2.viewer_time, e2.data.view_rebuffer_duration > Wt$2 && (e2.emit("viewend"), e2.send("viewend"), e2.mux.log.warn("Ending view after rebuffering for longer than ".concat(Wt$2, "ms, future events will be ignored unless a programchange or videochange occurs.")));
      }
      e2.data.view_watch_time >= 0 && e2.data.view_rebuffer_count > 0 && (e2.data.view_rebuffer_frequency = e2.data.view_rebuffer_count / e2.data.view_watch_time, e2.data.view_rebuffer_percentage = e2.data.view_rebuffer_duration / e2.data.view_watch_time);
    }, "a");
    e2.on("playbackheartbeat", function(n2, o2) {
      return a(o2);
    }), e2.on("rebufferstart", function(n2, o2) {
      t2 || (O$2(e2.data, "view_rebuffer_count", 1), t2 = o2.viewer_time, e2.one("rebufferend", i2));
    }), e2.on("viewinit", function() {
      t2 = void 0, e2.off("rebufferend", i2);
    });
  }
}, "r"), jt$1 = ha;
var ya = (function() {
  function r10(e2) {
    var t2 = this;
    D$3(this, r10), l$1(this, "_lastCheckedTime", void 0), l$1(this, "_lastPlayheadTime", void 0), l$1(this, "_lastPlayheadTimeUpdatedTime", void 0), l$1(this, "_rebuffering", void 0), l$1(this, "pm", void 0), this.pm = e2, !(e2.disableRebufferTracking || e2.disablePlayheadRebufferTracking) && (this._lastCheckedTime = null, this._lastPlayheadTime = null, this._lastPlayheadTimeUpdatedTime = null, e2.on("playbackheartbeat", this._checkIfRebuffering.bind(this)), e2.on("playbackheartbeatend", this._cleanupRebufferTracker.bind(this)), e2.on("seeking", function() {
      t2._cleanupRebufferTracker(null, { viewer_time: A$1.now() });
    }));
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "_checkIfRebuffering", value: /* @__PURE__ */ __name(function(t2, i2) {
    if (this.pm.seekingTracker.isSeeking || this.pm.adTracker.isAdBreak || !this.pm.playbackHeartbeat._playheadShouldBeProgressing) {
      this._cleanupRebufferTracker(t2, i2);
      return;
    }
    if (this._lastCheckedTime === null) {
      this._prepareRebufferTrackerState(i2.viewer_time);
      return;
    }
    if (this._lastPlayheadTime !== this.pm.data.player_playhead_time) {
      this._cleanupRebufferTracker(t2, i2, true);
      return;
    }
    var a = i2.viewer_time - this._lastPlayheadTimeUpdatedTime;
    typeof this.pm.sustainedRebufferThreshold == "number" && a >= this.pm.sustainedRebufferThreshold && (this._rebuffering || (this._rebuffering = true, this.pm.emit("rebufferstart", { viewer_time: this._lastPlayheadTimeUpdatedTime }))), this._lastCheckedTime = i2.viewer_time;
  }, "value") }, { key: "_clearRebufferTrackerState", value: /* @__PURE__ */ __name(function() {
    this._lastCheckedTime = null, this._lastPlayheadTime = null, this._lastPlayheadTimeUpdatedTime = null;
  }, "value") }, { key: "_prepareRebufferTrackerState", value: /* @__PURE__ */ __name(function(t2) {
    this._lastCheckedTime = t2, this._lastPlayheadTime = this.pm.data.player_playhead_time, this._lastPlayheadTimeUpdatedTime = t2;
  }, "value") }, { key: "_cleanupRebufferTracker", value: /* @__PURE__ */ __name(function(t2, i2) {
    var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
    if (this._rebuffering) this._rebuffering = false, this.pm.emit("rebufferend", { viewer_time: i2.viewer_time });
    else {
      if (this._lastCheckedTime === null) return;
      var n2 = this.pm.data.player_playhead_time - this._lastPlayheadTime, o2 = i2.viewer_time - this._lastPlayheadTimeUpdatedTime;
      typeof this.pm.minimumRebufferDuration == "number" && n2 > 0 && o2 - n2 > this.pm.minimumRebufferDuration && (this._lastCheckedTime = null, this.pm.emit("rebufferstart", { viewer_time: this._lastPlayheadTimeUpdatedTime }), this.pm.emit("rebufferend", { viewer_time: this._lastPlayheadTimeUpdatedTime + o2 - n2 }));
    }
    a ? this._prepareRebufferTrackerState(i2.viewer_time) : this._clearRebufferTrackerState();
  }, "value") }]), r10;
})(), Gt$1 = ya;
var ga = (function() {
  function r10(e2) {
    var t2 = this;
    D$3(this, r10), l$1(this, "NAVIGATION_START", void 0), l$1(this, "pm", void 0), this.pm = e2, e2.on("viewinit", function() {
      var i2 = e2.data, a = i2.view_id;
      if (!i2.view_program_changed) {
        var n2 = /* @__PURE__ */ __name(function(o2, s2) {
          var u2 = s2.viewer_time;
          o2.type === "playing" && typeof e2.data.view_time_to_first_frame == "undefined" ? t2.calculateTimeToFirstFrame(u2 || A$1.now(), a) : o2.type === "adplaying" && (typeof e2.data.view_time_to_first_frame == "undefined" || t2._inPrerollPosition()) && t2.calculateTimeToFirstFrame(u2 || A$1.now(), a);
        }, "n");
        e2.one("playing", n2), e2.one("adplaying", n2), e2.one("viewend", function() {
          e2.off("playing", n2), e2.off("adplaying", n2);
        });
      }
    });
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "_inPrerollPosition", value: /* @__PURE__ */ __name(function() {
    return typeof this.pm.data.view_content_playback_time == "undefined" || this.pm.data.view_content_playback_time <= 1e3;
  }, "value") }, { key: "calculateTimeToFirstFrame", value: /* @__PURE__ */ __name(function(t2, i2) {
    i2 === this.pm.data.view_id && (this.pm.watchTimeTracker._updateWatchTime(null, { viewer_time: t2 }), this.pm.data.view_time_to_first_frame = this.pm.data.view_watch_time, (this.pm.data.player_autoplay_on || this.pm.data.video_is_autoplay) && this.NAVIGATION_START && (this.pm.data.view_aggregate_startup_time = this.pm.data.view_start + this.pm.data.view_watch_time - this.NAVIGATION_START));
  }, "value") }]), r10;
})(), Jt$2 = ga;
var ba = /* @__PURE__ */ __name(function r3(e2) {
  var t2 = this;
  D$3(this, r3), l$1(this, "_lastPlayerHeight", void 0), l$1(this, "_lastPlayerWidth", void 0), l$1(this, "_lastPlayheadPosition", void 0), l$1(this, "_lastSourceHeight", void 0), l$1(this, "_lastSourceWidth", void 0), e2.on("viewinit", function() {
    t2._lastPlayheadPosition = -1;
  });
  var i2 = ["pause", "rebufferstart", "seeking", "error", "adbreakstart", "hb", "renditionchange", "orientationchange", "viewend"], a = ["playing", "hb", "renditionchange", "orientationchange"];
  i2.forEach(function(n2) {
    e2.on(n2, function() {
      if (t2._lastPlayheadPosition >= 0 && e2.data.player_playhead_time >= 0 && t2._lastPlayerWidth >= 0 && t2._lastSourceWidth > 0 && t2._lastPlayerHeight >= 0 && t2._lastSourceHeight > 0) {
        var o2 = e2.data.player_playhead_time - t2._lastPlayheadPosition;
        if (o2 < 0) {
          t2._lastPlayheadPosition = -1;
          return;
        }
        var s2 = Math.min(t2._lastPlayerWidth / t2._lastSourceWidth, t2._lastPlayerHeight / t2._lastSourceHeight), u2 = Math.max(0, s2 - 1), p2 = Math.max(0, 1 - s2);
        e2.data.view_max_upscale_percentage = Math.max(e2.data.view_max_upscale_percentage || 0, u2), e2.data.view_max_downscale_percentage = Math.max(e2.data.view_max_downscale_percentage || 0, p2), O$2(e2.data, "view_total_content_playback_time", o2), O$2(e2.data, "view_total_upscaling", u2 * o2), O$2(e2.data, "view_total_downscaling", p2 * o2);
      }
      t2._lastPlayheadPosition = -1;
    });
  }), a.forEach(function(n2) {
    e2.on(n2, function() {
      t2._lastPlayheadPosition = e2.data.player_playhead_time, t2._lastPlayerWidth = e2.data.player_width, t2._lastPlayerHeight = e2.data.player_height, t2._lastSourceWidth = e2.data.video_source_width, t2._lastSourceHeight = e2.data.video_source_height;
    });
  });
}, "r"), Qt$1 = ba;
var Ta$1 = 2e3, wa = /* @__PURE__ */ __name(function r4(e2) {
  var t2 = this;
  D$3(this, r4), l$1(this, "isSeeking", void 0), this.isSeeking = false;
  var i2 = -1, a = /* @__PURE__ */ __name(function() {
    var n2 = A$1.now(), o2 = (e2.data.viewer_time || n2) - (i2 || n2);
    O$2(e2.data, "view_seek_duration", o2), e2.data.view_max_seek_time = Math.max(e2.data.view_max_seek_time || 0, o2), t2.isSeeking = false, i2 = -1;
  }, "a");
  e2.on("seeking", function(n2, o2) {
    if (Object.assign(e2.data, o2), t2.isSeeking && o2.viewer_time - i2 <= Ta$1) {
      i2 = o2.viewer_time;
      return;
    }
    t2.isSeeking && a(), t2.isSeeking = true, i2 = o2.viewer_time, O$2(e2.data, "view_seek_count", 1), e2.send("seeking");
  }), e2.on("seeked", function() {
    a();
  }), e2.on("viewend", function() {
    t2.isSeeking && (a(), e2.send("seeked")), t2.isSeeking = false, i2 = -1;
  });
}, "r"), zt$1 = wa;
var Kt$2 = /* @__PURE__ */ __name(function(e2, t2) {
  e2.push(t2), e2.sort(function(i2, a) {
    return i2.viewer_time - a.viewer_time;
  });
}, "Kt$2"), Ea$1 = ["adbreakstart", "adrequest", "adresponse", "adplay", "adplaying", "adpause", "adended", "adbreakend", "aderror", "adclicked", "adskipped"], ka$1 = (function() {
  function r10(e2) {
    var t2 = this;
    D$3(this, r10), l$1(this, "_adHasPlayed", void 0), l$1(this, "_adRequests", void 0), l$1(this, "_adResponses", void 0), l$1(this, "_currentAdRequestNumber", void 0), l$1(this, "_currentAdResponseNumber", void 0), l$1(this, "_prerollPlayTime", void 0), l$1(this, "_wouldBeNewAdPlay", void 0), l$1(this, "isAdBreak", void 0), l$1(this, "pm", void 0), this.pm = e2, e2.on("viewinit", function() {
      t2.isAdBreak = false, t2._currentAdRequestNumber = 0, t2._currentAdResponseNumber = 0, t2._adRequests = [], t2._adResponses = [], t2._adHasPlayed = false, t2._wouldBeNewAdPlay = true, t2._prerollPlayTime = void 0;
    }), Ea$1.forEach(function(a) {
      return e2.on(a, t2._updateAdData.bind(t2));
    });
    var i2 = /* @__PURE__ */ __name(function() {
      t2.isAdBreak = false;
    }, "i");
    e2.on("adbreakstart", function() {
      t2.isAdBreak = true;
    }), e2.on("play", i2), e2.on("playing", i2), e2.on("viewend", i2), e2.on("adrequest", function(a, n2) {
      n2 = Object.assign({ ad_request_id: "generatedAdRequestId" + t2._currentAdRequestNumber++ }, n2), Kt$2(t2._adRequests, n2), O$2(e2.data, "view_ad_request_count"), t2.inPrerollPosition() && (e2.data.view_preroll_requested = true, t2._adHasPlayed || O$2(e2.data, "view_preroll_request_count"));
    }), e2.on("adresponse", function(a, n2) {
      n2 = Object.assign({ ad_request_id: "generatedAdRequestId" + t2._currentAdResponseNumber++ }, n2), Kt$2(t2._adResponses, n2);
      var o2 = t2.findAdRequest(n2.ad_request_id);
      o2 && O$2(e2.data, "view_ad_request_time", Math.max(0, n2.viewer_time - o2.viewer_time));
    }), e2.on("adplay", function(a, n2) {
      t2._adHasPlayed = true, t2._wouldBeNewAdPlay && (t2._wouldBeNewAdPlay = false, O$2(e2.data, "view_ad_played_count")), t2.inPrerollPosition() && !e2.data.view_preroll_played && (e2.data.view_preroll_played = true, t2._adRequests.length > 0 && (e2.data.view_preroll_request_time = Math.max(0, n2.viewer_time - t2._adRequests[0].viewer_time)), e2.data.view_start && (e2.data.view_startup_preroll_request_time = Math.max(0, n2.viewer_time - e2.data.view_start)), t2._prerollPlayTime = n2.viewer_time);
    }), e2.on("adplaying", function(a, n2) {
      t2.inPrerollPosition() && typeof e2.data.view_preroll_load_time == "undefined" && typeof t2._prerollPlayTime != "undefined" && (e2.data.view_preroll_load_time = n2.viewer_time - t2._prerollPlayTime, e2.data.view_startup_preroll_load_time = n2.viewer_time - t2._prerollPlayTime);
    }), e2.on("adclicked", function(a, n2) {
      t2._wouldBeNewAdPlay || O$2(e2.data, "view_ad_clicked_count");
    }), e2.on("adskipped", function(a, n2) {
      t2._wouldBeNewAdPlay || O$2(e2.data, "view_ad_skipped_count");
    }), e2.on("adended", function() {
      t2._wouldBeNewAdPlay = true;
    }), e2.on("aderror", function() {
      t2._wouldBeNewAdPlay = true;
    });
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "inPrerollPosition", value: /* @__PURE__ */ __name(function() {
    return typeof this.pm.data.view_content_playback_time == "undefined" || this.pm.data.view_content_playback_time <= 1e3;
  }, "value") }, { key: "findAdRequest", value: /* @__PURE__ */ __name(function(t2) {
    for (var i2 = 0; i2 < this._adRequests.length; i2++) if (this._adRequests[i2].ad_request_id === t2) return this._adRequests[i2];
  }, "value") }, { key: "_updateAdData", value: /* @__PURE__ */ __name(function(t2, i2) {
    if (this.inPrerollPosition()) {
      if (!this.pm.data.view_preroll_ad_tag_hostname && i2.ad_tag_url) {
        var a = H$2(re$3(i2.ad_tag_url), 2), n2 = a[0], o2 = a[1];
        this.pm.data.view_preroll_ad_tag_domain = o2, this.pm.data.view_preroll_ad_tag_hostname = n2;
      }
      if (!this.pm.data.view_preroll_ad_asset_hostname && i2.ad_asset_url) {
        var s2 = H$2(re$3(i2.ad_asset_url), 2), u2 = s2[0], p2 = s2[1];
        this.pm.data.view_preroll_ad_asset_domain = p2, this.pm.data.view_preroll_ad_asset_hostname = u2;
      }
    }
    this.pm.data.ad_asset_url = i2 == null ? void 0 : i2.ad_asset_url, this.pm.data.ad_tag_url = i2 == null ? void 0 : i2.ad_tag_url, this.pm.data.ad_creative_id = i2 == null ? void 0 : i2.ad_creative_id, this.pm.data.ad_id = i2 == null ? void 0 : i2.ad_id, this.pm.data.ad_universal_id = i2 == null ? void 0 : i2.ad_universal_id;
  }, "value") }]), r10;
})(), Yt$2 = ka$1;
var Qe$1 = V$2(J$2());
var xa$1 = /* @__PURE__ */ __name(function r5(e2) {
  D$3(this, r5);
  var t2, i2, a = /* @__PURE__ */ __name(function() {
    e2.disableRebufferTracking || (O$2(e2.data, "view_waiting_rebuffer_count", 1), t2 = A$1.now(), i2 = Qe$1.default.setInterval(function() {
      if (t2) {
        var p2 = A$1.now();
        O$2(e2.data, "view_waiting_rebuffer_duration", p2 - t2), t2 = p2;
      }
    }, 250));
  }, "a"), n2 = /* @__PURE__ */ __name(function() {
    e2.disableRebufferTracking || t2 && (O$2(e2.data, "view_waiting_rebuffer_duration", A$1.now() - t2), t2 = false, Qe$1.default.clearInterval(i2));
  }, "n"), o2 = false, s2 = /* @__PURE__ */ __name(function() {
    o2 = true;
  }, "s"), u2 = /* @__PURE__ */ __name(function() {
    o2 = false, n2();
  }, "u");
  e2.on("waiting", function() {
    o2 && a();
  }), e2.on("playing", function() {
    n2(), s2();
  }), e2.on("pause", u2), e2.on("seeking", u2);
}, "r"), Xt$1 = xa$1;
var Da = /* @__PURE__ */ __name(function r6(e2) {
  var t2 = this;
  D$3(this, r6), l$1(this, "lastWallClockTime", void 0);
  var i2 = /* @__PURE__ */ __name(function() {
    t2.lastWallClockTime = A$1.now(), e2.on("before*", a);
  }, "i"), a = /* @__PURE__ */ __name(function(n2) {
    var o2 = A$1.now(), s2 = t2.lastWallClockTime;
    t2.lastWallClockTime = o2, o2 - s2 > 3e4 && (e2.emit("devicesleep", { viewer_time: s2 }), Object.assign(e2.data, { viewer_time: s2 }), e2.send("devicesleep"), e2.emit("devicewake", { viewer_time: o2 }), Object.assign(e2.data, { viewer_time: o2 }), e2.send("devicewake"));
  }, "a");
  e2.one("playbackheartbeat", i2), e2.on("playbackheartbeatend", function() {
    e2.off("before*", a), e2.one("playbackheartbeat", i2);
  });
}, "r"), $t$2 = Da;
var Ue$1 = V$2(J$2());
var ze$2 = (function(r10) {
  return r10();
})(function() {
  var r10 = /* @__PURE__ */ __name(function() {
    for (var i2 = 0, a = {}; i2 < arguments.length; i2++) {
      var n2 = arguments[i2];
      for (var o2 in n2) a[o2] = n2[o2];
    }
    return a;
  }, "r");
  function e2(t2) {
    function i2(a, n2, o2) {
      var s2;
      if (typeof document != "undefined") {
        if (arguments.length > 1) {
          if (o2 = r10({ path: "/" }, i2.defaults, o2), typeof o2.expires == "number") {
            var u2 = /* @__PURE__ */ new Date();
            u2.setMilliseconds(u2.getMilliseconds() + o2.expires * 864e5), o2.expires = u2;
          }
          try {
            s2 = JSON.stringify(n2), /^[\{\[]/.test(s2) && (n2 = s2);
          } catch (T2) {
          }
          return t2.write ? n2 = t2.write(n2, a) : n2 = encodeURIComponent(String(n2)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), a = encodeURIComponent(String(a)), a = a.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent), a = a.replace(/[\(\)]/g, escape), document.cookie = [a, "=", n2, o2.expires ? "; expires=" + o2.expires.toUTCString() : "", o2.path ? "; path=" + o2.path : "", o2.domain ? "; domain=" + o2.domain : "", o2.secure ? "; secure" : ""].join("");
        }
        a || (s2 = {});
        for (var p2 = document.cookie ? document.cookie.split("; ") : [], b2 = /(%[0-9A-Z]{2})+/g, k2 = 0; k2 < p2.length; k2++) {
          var y2 = p2[k2].split("="), c2 = y2.slice(1).join("=");
          c2.charAt(0) === '"' && (c2 = c2.slice(1, -1));
          try {
            var v2 = y2[0].replace(b2, decodeURIComponent);
            if (c2 = t2.read ? t2.read(c2, v2) : t2(c2, v2) || c2.replace(b2, decodeURIComponent), this.json) try {
              c2 = JSON.parse(c2);
            } catch (T2) {
            }
            if (a === v2) {
              s2 = c2;
              break;
            }
            a || (s2[v2] = c2);
          } catch (T2) {
          }
        }
        return s2;
      }
    }
    __name(i2, "i");
    return i2.set = i2, i2.get = function(a) {
      return i2.call(i2, a);
    }, i2.getJSON = function() {
      return i2.apply({ json: true }, [].slice.call(arguments));
    }, i2.defaults = {}, i2.remove = function(a, n2) {
      i2(a, "", r10(n2, { expires: -1 }));
    }, i2.withConverter = e2, i2;
  }
  __name(e2, "e");
  return e2(function() {
  });
});
var Zt$2 = "muxData", Sa = /* @__PURE__ */ __name(function(r10) {
  return Object.entries(r10).map(function(e2) {
    var t2 = H$2(e2, 2), i2 = t2[0], a = t2[1];
    return "".concat(i2, "=").concat(a);
  }).join("&");
}, "Sa"), Ra$1 = /* @__PURE__ */ __name(function(r10) {
  return r10.split("&").reduce(function(e2, t2) {
    var i2 = H$2(t2.split("="), 2), a = i2[0], n2 = i2[1], o2 = +n2, s2 = n2 && o2 == n2 ? o2 : n2;
    return e2[a] = s2, e2;
  }, {});
}, "Ra$1"), er = /* @__PURE__ */ __name(function() {
  var e2;
  try {
    e2 = Ra$1(ze$2.get(Zt$2) || "");
  } catch (t2) {
    e2 = {};
  }
  return e2;
}, "er"), tr = /* @__PURE__ */ __name(function(e2) {
  try {
    ze$2.set(Zt$2, Sa(e2), { expires: 365 });
  } catch (t2) {
  }
}, "tr"), rr$1 = /* @__PURE__ */ __name(function() {
  var e2 = er();
  return e2.mux_viewer_id = e2.mux_viewer_id || ee$3(), e2.msn = e2.msn || Math.random(), tr(e2), { mux_viewer_id: e2.mux_viewer_id, mux_sample_number: e2.msn };
}, "rr$1"), ar = /* @__PURE__ */ __name(function() {
  var e2 = er(), t2 = A$1.now();
  return e2.session_start && (e2.sst = e2.session_start, delete e2.session_start), e2.session_id && (e2.sid = e2.session_id, delete e2.session_id), e2.session_expires && (e2.sex = e2.session_expires, delete e2.session_expires), (!e2.sex || e2.sex < t2) && (e2.sid = ee$3(), e2.sst = t2), e2.sex = t2 + 25 * 60 * 1e3, tr(e2), { session_id: e2.sid, session_start: e2.sst, session_expires: e2.sex };
}, "ar");
function Ke$1(r10, e2) {
  var t2 = e2.beaconCollectionDomain, i2 = e2.beaconDomain;
  if (t2) return "https://" + t2;
  r10 = r10 || "inferred";
  var a = i2 || "litix.io";
  return r10.match(/^[a-z0-9]+$/) ? "https://" + r10 + "." + a : "https://img.litix.io/a.gif";
}
__name(Ke$1, "Ke$1");
var ir = V$2(J$2()), nr$1 = /* @__PURE__ */ __name(function() {
  var e2;
  switch (or$1()) {
    case "cellular":
      e2 = "cellular";
      break;
    case "ethernet":
      e2 = "wired";
      break;
    case "wifi":
      e2 = "wifi";
      break;
    case void 0:
      break;
    default:
      e2 = "other";
  }
  return e2;
}, "nr$1"), or$1 = /* @__PURE__ */ __name(function() {
  var e2 = ir.default.navigator, t2 = e2 && (e2.connection || e2.mozConnection || e2.webkitConnection);
  return t2 && t2.type;
}, "or$1");
nr$1.getConnectionFromAPI = or$1;
var sr = nr$1;
var qa = { a: "env", b: "beacon", c: "custom", d: "ad", e: "event", f: "experiment", i: "internal", m: "mux", n: "response", p: "player", q: "request", r: "retry", s: "session", t: "timestamp", u: "viewer", v: "video", w: "page", x: "view", y: "sub" }, Aa$1 = dr(qa), Oa = { ad: "ad", af: "affiliate", ag: "aggregate", ap: "api", al: "application", ao: "audio", ar: "architecture", as: "asset", au: "autoplay", av: "average", bi: "bitrate", bn: "brand", br: "break", bw: "browser", by: "bytes", bz: "business", ca: "cached", cb: "cancel", cc: "codec", cd: "code", cg: "category", ch: "changed", ci: "client", ck: "clicked", cl: "canceled", cn: "config", co: "count", ce: "counter", cp: "complete", cq: "creator", cr: "creative", cs: "captions", ct: "content", cu: "current", cx: "connection", cz: "context", dg: "downscaling", dm: "domain", dn: "cdn", do: "downscale", dr: "drm", dp: "dropped", du: "duration", dv: "device", dy: "dynamic", eb: "enabled", ec: "encoding", ed: "edge", en: "end", eg: "engine", em: "embed", er: "error", ep: "experiments", es: "errorcode", et: "errortext", ee: "event", ev: "events", ex: "expires", ez: "exception", fa: "failed", fi: "first", fm: "family", ft: "format", fp: "fps", fq: "frequency", fr: "frame", fs: "fullscreen", ha: "has", hb: "holdback", he: "headers", ho: "host", hn: "hostname", ht: "height", id: "id", ii: "init", in: "instance", ip: "ip", is: "is", ke: "key", la: "language", lb: "labeled", le: "level", li: "live", ld: "loaded", lo: "load", ls: "lists", lt: "latency", ma: "max", md: "media", me: "message", mf: "manifest", mi: "mime", ml: "midroll", mm: "min", mn: "manufacturer", mo: "model", mx: "mux", ne: "newest", nm: "name", no: "number", on: "on", or: "origin", os: "os", pa: "paused", pb: "playback", pd: "producer", pe: "percentage", pf: "played", pg: "program", ph: "playhead", pi: "plugin", pl: "preroll", pn: "playing", po: "poster", pp: "pip", pr: "preload", ps: "position", pt: "part", py: "property", px: "pop", pz: "plan", ra: "rate", rd: "requested", re: "rebuffer", rf: "rendition", rg: "range", rm: "remote", ro: "ratio", rp: "response", rq: "request", rs: "requests", sa: "sample", sd: "skipped", se: "session", sh: "shift", sk: "seek", sm: "stream", so: "source", sq: "sequence", sr: "series", ss: "status", st: "start", su: "startup", sv: "server", sw: "software", sy: "severity", ta: "tag", tc: "tech", te: "text", tg: "target", th: "throughput", ti: "time", tl: "total", to: "to", tt: "title", ty: "type", ug: "upscaling", un: "universal", up: "upscale", ur: "url", us: "user", va: "variant", vd: "viewed", vi: "video", ve: "version", vw: "view", vr: "viewer", wd: "width", wa: "watch", wt: "waiting" }, ur = dr(Oa);
function dr(r10) {
  var e2 = {};
  for (var t2 in r10) r10.hasOwnProperty(t2) && (e2[r10[t2]] = t2);
  return e2;
}
__name(dr, "dr");
function ve$2(r10) {
  var e2 = {}, t2 = {};
  return Object.keys(r10).forEach(function(i2) {
    var a = false;
    if (r10.hasOwnProperty(i2) && r10[i2] !== void 0) {
      var n2 = i2.split("_"), o2 = n2[0], s2 = Aa$1[o2];
      s2 || (q$2.info("Data key word `" + n2[0] + "` not expected in " + i2), s2 = o2 + "_"), n2.splice(1).forEach(function(u2) {
        u2 === "url" && (a = true), ur[u2] ? s2 += ur[u2] : Number.isInteger(Number(u2)) ? s2 += u2 : (q$2.info("Data key word `" + u2 + "` not expected in " + i2), s2 += "_" + u2 + "_");
      }), a ? t2[s2] = r10[i2] : e2[s2] = r10[i2];
    }
  }), Object.assign(e2, t2);
}
__name(ve$2, "ve$2");
var ie$2 = V$2(J$2()), Lr = V$2(nt$2());
var ai = { maxBeaconSize: 300, maxQueueLength: 3600, baseTimeBetweenBeacons: 1e4, maxPayloadKBSize: 500 }, ii = 56 * 1024, ni = ["hb", "requestcompleted", "requestfailed", "requestcanceled"], oi = "https://img.litix.io", $$1 = /* @__PURE__ */ __name(function(e2) {
  var t2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  this._beaconUrl = e2 || oi, this._eventQueue = [], this._postInFlight = false, this._resendAfterPost = false, this._failureCount = 0, this._sendTimeout = false, this._options = Object.assign({}, ai, t2);
}, "$$1");
$$1.prototype.queueEvent = function(r10, e2) {
  var t2 = Object.assign({}, e2);
  return this._eventQueue.length <= this._options.maxQueueLength || r10 === "eventrateexceeded" ? (this._eventQueue.push(t2), this._sendTimeout || this._startBeaconSending(), this._eventQueue.length <= this._options.maxQueueLength) : false;
};
$$1.prototype.flushEvents = function() {
  var r10 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
  if (r10 && this._eventQueue.length === 1) {
    this._eventQueue.pop();
    return;
  }
  this._eventQueue.length && this._sendBeaconQueue(), this._startBeaconSending();
};
$$1.prototype.destroy = function() {
  var r10 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
  this.destroyed = true, r10 ? this._clearBeaconQueue() : this.flushEvents(), ie$2.default.clearTimeout(this._sendTimeout);
};
$$1.prototype._clearBeaconQueue = function() {
  var r10 = this._eventQueue.length > this._options.maxBeaconSize ? this._eventQueue.length - this._options.maxBeaconSize : 0, e2 = this._eventQueue.slice(r10);
  r10 > 0 && Object.assign(e2[e2.length - 1], ve$2({ mux_view_message: "event queue truncated" }));
  var t2 = this._createPayload(e2);
  Cr(this._beaconUrl, t2, true, function() {
  });
};
$$1.prototype._sendBeaconQueue = function() {
  var r10 = this;
  if (this._postInFlight) {
    this._resendAfterPost = true;
    return;
  }
  var e2 = this._eventQueue.slice(0, this._options.maxBeaconSize);
  this._eventQueue = this._eventQueue.slice(this._options.maxBeaconSize), this._postInFlight = true;
  var t2 = this._createPayload(e2), i2 = A$1.now();
  Cr(this._beaconUrl, t2, false, function(a, n2) {
    n2 ? (r10._eventQueue = e2.concat(r10._eventQueue), r10._failureCount += 1, q$2.info("Error sending beacon: " + n2)) : r10._failureCount = 0, r10._roundTripTime = A$1.now() - i2, r10._postInFlight = false, r10._resendAfterPost && (r10._resendAfterPost = false, r10._eventQueue.length > 0 && r10._sendBeaconQueue());
  });
};
$$1.prototype._getNextBeaconTime = function() {
  if (!this._failureCount) return this._options.baseTimeBetweenBeacons;
  var r10 = Math.pow(2, this._failureCount - 1);
  return r10 = r10 * Math.random(), (1 + r10) * this._options.baseTimeBetweenBeacons;
};
$$1.prototype._startBeaconSending = function() {
  var r10 = this;
  ie$2.default.clearTimeout(this._sendTimeout), !this.destroyed && (this._sendTimeout = ie$2.default.setTimeout(function() {
    r10._eventQueue.length && r10._sendBeaconQueue(), r10._startBeaconSending();
  }, this._getNextBeaconTime()));
};
$$1.prototype._createPayload = function(r10) {
  var e2 = this, t2 = { transmission_timestamp: Math.round(A$1.now()) };
  this._roundTripTime && (t2.rtt_ms = Math.round(this._roundTripTime));
  var i2, a, n2, o2 = /* @__PURE__ */ __name(function() {
    i2 = JSON.stringify({ metadata: t2, events: a || r10 }), n2 = i2.length / 1024;
  }, "o"), s2 = /* @__PURE__ */ __name(function() {
    return n2 <= e2._options.maxPayloadKBSize;
  }, "s");
  return o2(), s2() || (q$2.info("Payload size is too big (" + n2 + " kb). Removing unnecessary events."), a = r10.filter(function(u2) {
    return ni.indexOf(u2.e) === -1;
  }), o2()), s2() || (q$2.info("Payload size still too big (" + n2 + " kb). Cropping fields.."), a.forEach(function(u2) {
    for (var p2 in u2) {
      var b2 = u2[p2], k2 = 50 * 1024;
      typeof b2 == "string" && b2.length > k2 && (u2[p2] = b2.substring(0, k2));
    }
  }), o2()), i2;
};
var si = typeof Lr.default.exitPictureInPicture == "function" ? function(r10) {
  return r10.length <= ii;
} : function(r10) {
  return false;
}, Cr = /* @__PURE__ */ __name(function(r10, e2, t2, i2) {
  if (t2 && navigator && navigator.sendBeacon && navigator.sendBeacon(r10, e2)) {
    i2();
    return;
  }
  if (ie$2.default.fetch) {
    ie$2.default.fetch(r10, { method: "POST", body: e2, headers: { "Content-Type": "text/plain" }, keepalive: si(e2) }).then(function(n2) {
      return i2(null, n2.ok ? null : "Error");
    }).catch(function(n2) {
      return i2(null, n2);
    });
    return;
  }
  if (ie$2.default.XMLHttpRequest) {
    var a = new ie$2.default.XMLHttpRequest();
    a.onreadystatechange = function() {
      if (a.readyState === 4) return i2(null, a.status !== 200 ? "error" : void 0);
    }, a.open("POST", r10), a.setRequestHeader("Content-Type", "text/plain"), a.send(e2);
    return;
  }
  i2();
}, "Cr"), Mr = $$1;
var ui = ["env_key", "view_id", "view_sequence_number", "player_sequence_number", "beacon_domain", "player_playhead_time", "viewer_time", "mux_api_version", "event", "video_id", "player_instance_id", "player_error_code", "player_error_message", "player_error_context", "player_error_severity", "player_error_business_exception"], di = ["adplay", "adplaying", "adpause", "adfirstquartile", "admidpoint", "adthirdquartile", "adended", "adresponse", "adrequest"], li = ["ad_id", "ad_creative_id", "ad_universal_id"], ci = ["viewstart", "error", "ended", "viewend"], _i = 10 * 60 * 1e3, Hr = (function() {
  function r10(e2, t2) {
    var i2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    D$3(this, r10);
    var a, n2, o2, s2, u2, p2, b2, k2, y2, c2, v2, T2;
    l$1(this, "mux", void 0), l$1(this, "envKey", void 0), l$1(this, "options", void 0), l$1(this, "eventQueue", void 0), l$1(this, "sampleRate", void 0), l$1(this, "disableCookies", void 0), l$1(this, "respectDoNotTrack", void 0), l$1(this, "previousBeaconData", void 0), l$1(this, "lastEventTime", void 0), l$1(this, "rateLimited", void 0), l$1(this, "pageLevelData", void 0), l$1(this, "viewerData", void 0), this.mux = e2, this.envKey = t2, this.options = i2, this.previousBeaconData = null, this.lastEventTime = 0, this.rateLimited = false, this.eventQueue = new Mr(Ke$1(this.envKey, this.options));
    var x2;
    this.sampleRate = (x2 = this.options.sampleRate) !== null && x2 !== void 0 ? x2 : 1;
    var m2;
    this.disableCookies = (m2 = this.options.disableCookies) !== null && m2 !== void 0 ? m2 : false;
    var f2;
    this.respectDoNotTrack = (f2 = this.options.respectDoNotTrack) !== null && f2 !== void 0 ? f2 : false, this.previousBeaconData = null, this.lastEventTime = 0, this.rateLimited = false, this.pageLevelData = { mux_api_version: this.mux.API_VERSION, mux_embed: this.mux.NAME, mux_embed_version: this.mux.VERSION, viewer_application_name: (a = this.options.platform) === null || a === void 0 ? void 0 : a.name, viewer_application_version: (n2 = this.options.platform) === null || n2 === void 0 ? void 0 : n2.version, viewer_application_engine: (o2 = this.options.platform) === null || o2 === void 0 ? void 0 : o2.layout, viewer_device_name: (s2 = this.options.platform) === null || s2 === void 0 ? void 0 : s2.product, viewer_device_category: "", viewer_device_manufacturer: (u2 = this.options.platform) === null || u2 === void 0 ? void 0 : u2.manufacturer, viewer_os_family: (b2 = this.options.platform) === null || b2 === void 0 || (p2 = b2.os) === null || p2 === void 0 ? void 0 : p2.family, viewer_os_architecture: (y2 = this.options.platform) === null || y2 === void 0 || (k2 = y2.os) === null || k2 === void 0 ? void 0 : k2.architecture, viewer_os_version: (v2 = this.options.platform) === null || v2 === void 0 || (c2 = v2.os) === null || c2 === void 0 ? void 0 : c2.version, viewer_connection_type: sr(), page_url: Ue$1.default === null || Ue$1.default === void 0 || (T2 = Ue$1.default.location) === null || T2 === void 0 ? void 0 : T2.href }, this.viewerData = this.disableCookies ? {} : rr$1();
  }
  __name(r10, "r");
  return L$1(r10, [{ key: "send", value: /* @__PURE__ */ __name(function(t2, i2) {
    if (!(!t2 || !(i2 != null && i2.view_id))) {
      if (this.respectDoNotTrack && ce$1()) return q$2.info("Not sending `" + t2 + "` because Do Not Track is enabled");
      if (!i2 || typeof i2 != "object") return q$2.error("A data object was expected in send() but was not provided");
      var a = this.disableCookies ? {} : ar(), n2 = fe$2(ue$1({}, this.pageLevelData, i2, a, this.viewerData), { event: t2, env_key: this.envKey });
      n2.user_id && (n2.viewer_user_id = n2.user_id, delete n2.user_id);
      var o2, s2 = ((o2 = n2.mux_sample_number) !== null && o2 !== void 0 ? o2 : 0) >= this.sampleRate, u2 = this._deduplicateBeaconData(t2, n2), p2 = ve$2(u2);
      if (this.lastEventTime = this.mux.utils.now(), s2) return q$2.info("Not sending event due to sample rate restriction", t2, n2, p2);
      if (this.envKey || q$2.info("Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL", t2, n2, p2), !this.rateLimited) {
        if (q$2.info("Sending event", t2, n2, p2), this.rateLimited = !this.eventQueue.queueEvent(t2, p2), this.mux.WINDOW_UNLOADING && t2 === "viewend") this.eventQueue.destroy(true);
        else if (this.mux.WINDOW_HIDDEN && t2 === "hb" ? this.eventQueue.flushEvents(true) : ci.indexOf(t2) >= 0 && this.eventQueue.flushEvents(), this.rateLimited) return n2.event = "eventrateexceeded", p2 = ve$2(n2), this.eventQueue.queueEvent(n2.event, p2), q$2.error("Beaconing disabled due to rate limit.");
      }
    }
  }, "value") }, { key: "destroy", value: /* @__PURE__ */ __name(function() {
    this.eventQueue.destroy(false);
  }, "value") }, { key: "_deduplicateBeaconData", value: /* @__PURE__ */ __name(function(t2, i2) {
    var a = this, n2 = {}, o2 = i2.view_id;
    if (o2 === "-1" || t2 === "viewstart" || t2 === "viewend" || !this.previousBeaconData || this.mux.utils.now() - this.lastEventTime >= _i) n2 = ue$1({}, i2), o2 && (this.previousBeaconData = n2), o2 && t2 === "viewend" && (this.previousBeaconData = null);
    else {
      var s2 = t2.indexOf("request") === 0;
      Object.entries(i2).forEach(function(u2) {
        var p2 = H$2(u2, 2), b2 = p2[0], k2 = p2[1];
        a.previousBeaconData && (k2 !== a.previousBeaconData[b2] || ui.indexOf(b2) > -1 || a.objectHasChanged(s2, b2, k2, a.previousBeaconData[b2]) || a.eventRequiresKey(t2, b2)) && (n2[b2] = k2, a.previousBeaconData[b2] = k2);
      });
    }
    return n2;
  }, "value") }, { key: "objectHasChanged", value: /* @__PURE__ */ __name(function(t2, i2, a, n2) {
    return !t2 || i2.indexOf("request_") !== 0 ? false : i2 === "request_response_headers" || typeof a != "object" || typeof n2 != "object" ? true : Object.keys(a || {}).length !== Object.keys(n2 || {}).length;
  }, "value") }, { key: "eventRequiresKey", value: /* @__PURE__ */ __name(function(t2, i2) {
    return !!(t2 === "renditionchange" && i2.indexOf("video_source_") === 0 || li.includes(i2) && di.includes(t2));
  }, "value") }]), r10;
})();
var fi = /* @__PURE__ */ __name(function r7(e2) {
  D$3(this, r7);
  var t2 = 0, i2 = 0, a = 0, n2 = 0, o2 = 0, s2 = 0, u2 = 0, p2 = /* @__PURE__ */ __name(function(y2, c2) {
    var v2 = c2.request_start, T2 = c2.request_response_start, x2 = c2.request_response_end, m2 = c2.request_bytes_loaded;
    n2++;
    var f2, _2;
    if (T2 ? (f2 = T2 - (v2 != null ? v2 : 0), _2 = (x2 != null ? x2 : 0) - T2) : _2 = (x2 != null ? x2 : 0) - (v2 != null ? v2 : 0), _2 > 0 && m2 && m2 > 0) {
      var d2 = m2 / _2 * 8e3;
      o2++, i2 += m2, a += _2, e2.data.view_min_request_throughput = Math.min(e2.data.view_min_request_throughput || 1 / 0, d2), e2.data.view_average_request_throughput = i2 / a * 8e3, e2.data.view_request_count = n2, f2 > 0 && (t2 += f2, e2.data.view_max_request_latency = Math.max(e2.data.view_max_request_latency || 0, f2), e2.data.view_average_request_latency = t2 / o2);
    }
  }, "p"), b2 = /* @__PURE__ */ __name(function(y2, c2) {
    n2++, s2++, e2.data.view_request_count = n2, e2.data.view_request_failed_count = s2;
  }, "b"), k2 = /* @__PURE__ */ __name(function(y2, c2) {
    n2++, u2++, e2.data.view_request_count = n2, e2.data.view_request_canceled_count = u2;
  }, "k");
  e2.on("requestcompleted", p2), e2.on("requestfailed", b2), e2.on("requestcanceled", k2);
}, "r"), Br = fi;
var pi = 60 * 60 * 1e3, vi = /* @__PURE__ */ __name(function r8(e2) {
  var t2 = this;
  D$3(this, r8), l$1(this, "_lastEventTime", void 0), e2.on("before*", function(i2, a) {
    var n2 = a.viewer_time, o2 = A$1.now(), s2 = t2._lastEventTime;
    if (t2._lastEventTime = o2, s2 && o2 - s2 > pi) {
      var u2 = Object.keys(e2.data).reduce(function(b2, k2) {
        return k2.indexOf("video_") === 0 ? Object.assign(b2, l$1({}, k2, e2.data[k2])) : b2;
      }, {});
      e2.mux.log.info("Received event after at least an hour inactivity, creating a new view");
      var p2 = e2.playbackHeartbeat._playheadShouldBeProgressing;
      e2._resetView(Object.assign({ viewer_time: n2 }, u2)), e2.playbackHeartbeat._playheadShouldBeProgressing = p2, e2.playbackHeartbeat._playheadShouldBeProgressing && i2.type !== "play" && i2.type !== "adbreakstart" && (e2.emit("play", { viewer_time: n2 }), i2.type !== "playing" && e2.emit("playing", { viewer_time: n2 }));
    }
  });
}, "r"), Ur = vi;
var mi = ["viewstart", "ended", "loadstart", "pause", "play", "playing", "ratechange", "waiting", "adplay", "adpause", "adended", "aderror", "adplaying", "adrequest", "adresponse", "adbreakstart", "adbreakend", "adfirstquartile", "admidpoint", "adthirdquartile", "rebufferstart", "rebufferend", "seeked", "error", "hb", "requestcompleted", "requestfailed", "requestcanceled", "renditionchange"], hi = /* @__PURE__ */ new Set(["requestcompleted", "requestfailed", "requestcanceled"]), yi = (function(r10) {
  Dt$2(t2, r10);
  var e2 = qt$2(t2);
  function t2(i2, a, n2) {
    D$3(this, t2);
    var o2;
    o2 = e2.call(this), l$1(g$5(o2), "DOM_CONTENT_LOADED_EVENT_END", void 0), l$1(g$5(o2), "NAVIGATION_START", void 0), l$1(g$5(o2), "_destroyed", void 0), l$1(g$5(o2), "_heartBeatTimeout", void 0), l$1(g$5(o2), "adTracker", void 0), l$1(g$5(o2), "dashjs", void 0), l$1(g$5(o2), "data", void 0), l$1(g$5(o2), "disablePlayheadRebufferTracking", void 0), l$1(g$5(o2), "disableRebufferTracking", void 0), l$1(g$5(o2), "errorTracker", void 0), l$1(g$5(o2), "errorTranslator", void 0), l$1(g$5(o2), "emitTranslator", void 0), l$1(g$5(o2), "getAdData", void 0), l$1(g$5(o2), "getPlayheadTime", void 0), l$1(g$5(o2), "getStateData", void 0), l$1(g$5(o2), "stateDataTranslator", void 0), l$1(g$5(o2), "hlsjs", void 0), l$1(g$5(o2), "id", void 0), l$1(g$5(o2), "longResumeTracker", void 0), l$1(g$5(o2), "minimumRebufferDuration", void 0), l$1(g$5(o2), "mux", void 0), l$1(g$5(o2), "playbackEventDispatcher", void 0), l$1(g$5(o2), "playbackHeartbeat", void 0), l$1(g$5(o2), "playbackHeartbeatTime", void 0), l$1(g$5(o2), "playheadTime", void 0), l$1(g$5(o2), "seekingTracker", void 0), l$1(g$5(o2), "sustainedRebufferThreshold", void 0), l$1(g$5(o2), "watchTimeTracker", void 0), l$1(g$5(o2), "currentFragmentPDT", void 0), l$1(g$5(o2), "currentFragmentStart", void 0), o2.DOM_CONTENT_LOADED_EVENT_END = _e$2.domContentLoadedEventEnd(), o2.NAVIGATION_START = _e$2.navigationStart();
    var s2 = { debug: false, minimumRebufferDuration: 250, sustainedRebufferThreshold: 1e3, playbackHeartbeatTime: 25, beaconDomain: "litix.io", sampleRate: 1, disableCookies: false, respectDoNotTrack: false, disableRebufferTracking: false, disablePlayheadRebufferTracking: false, errorTranslator: /* @__PURE__ */ __name(function(y2) {
      return y2;
    }, "errorTranslator"), emitTranslator: /* @__PURE__ */ __name(function() {
      for (var y2 = arguments.length, c2 = new Array(y2), v2 = 0; v2 < y2; v2++) c2[v2] = arguments[v2];
      return c2;
    }, "emitTranslator"), stateDataTranslator: /* @__PURE__ */ __name(function(y2) {
      return y2;
    }, "stateDataTranslator") };
    o2.mux = i2, o2.id = a, n2 != null && n2.beaconDomain && o2.mux.log.warn("The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`."), n2 = Object.assign(s2, n2), n2.data = n2.data || {}, n2.data.property_key && (n2.data.env_key = n2.data.property_key, delete n2.data.property_key), q$2.level = n2.debug ? Y$2.DEBUG : Y$2.WARN, o2.getPlayheadTime = n2.getPlayheadTime, o2.getStateData = n2.getStateData || function() {
      return {};
    }, o2.getAdData = n2.getAdData || function() {
    }, o2.minimumRebufferDuration = n2.minimumRebufferDuration, o2.sustainedRebufferThreshold = n2.sustainedRebufferThreshold, o2.playbackHeartbeatTime = n2.playbackHeartbeatTime, o2.disableRebufferTracking = n2.disableRebufferTracking, o2.disableRebufferTracking && o2.mux.log.warn("Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering."), o2.disablePlayheadRebufferTracking = n2.disablePlayheadRebufferTracking, o2.errorTranslator = n2.errorTranslator, o2.emitTranslator = n2.emitTranslator, o2.stateDataTranslator = n2.stateDataTranslator, o2.playbackEventDispatcher = new Hr(i2, n2.data.env_key, n2), o2.data = { player_instance_id: ee$3(), mux_sample_rate: n2.sampleRate, beacon_domain: n2.beaconCollectionDomain || n2.beaconDomain }, o2.data.view_sequence_number = 1, o2.data.player_sequence_number = 1;
    var u2 = function() {
      typeof this.data.view_start == "undefined" && (this.data.view_start = this.mux.utils.now(), this.emit("viewstart"));
    }.bind(g$5(o2));
    if (o2.on("viewinit", function(y2, c2) {
      this._resetVideoData(), this._resetViewData(), this._resetErrorData(), this._updateStateData(), Object.assign(this.data, c2), this._initializeViewData(), this.one("play", u2), this.one("adbreakstart", u2);
    }), o2.on("videochange", function(y2, c2) {
      this._resetView(c2);
    }), o2.on("programchange", function(y2, c2) {
      this.data.player_is_paused && this.mux.log.warn("The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information."), this._resetView(Object.assign(c2, { view_program_changed: true })), u2(), this.emit("play"), this.emit("playing");
    }), o2.on("fragmentchange", function(y2, c2) {
      this.currentFragmentPDT = c2.currentFragmentPDT, this.currentFragmentStart = c2.currentFragmentStart;
    }), o2.on("destroy", o2.destroy), typeof window != "undefined" && typeof window.addEventListener == "function" && typeof window.removeEventListener == "function") {
      var p2 = /* @__PURE__ */ __name(function() {
        var y2 = typeof o2.data.view_start != "undefined";
        o2.mux.WINDOW_HIDDEN = document.visibilityState === "hidden", y2 && o2.mux.WINDOW_HIDDEN && (o2.data.player_is_paused || o2.emit("hb"));
      }, "p");
      window.addEventListener("visibilitychange", p2, false);
      var b2 = /* @__PURE__ */ __name(function(y2) {
        y2.persisted || o2.destroy();
      }, "b");
      window.addEventListener("pagehide", b2, false), o2.on("destroy", function() {
        window.removeEventListener("visibilitychange", p2), window.removeEventListener("pagehide", b2);
      });
    }
    o2.on("playerready", function(y2, c2) {
      Object.assign(this.data, c2);
    }), mi.forEach(function(y2) {
      o2.on(y2, function(c2, v2) {
        y2.indexOf("ad") !== 0 && this._updateStateData(), Object.assign(this.data, v2), this._sanitizeData();
      }), o2.on("after" + y2, function() {
        (y2 !== "error" || this.errorTracker.viewErrored) && this.send(y2);
      });
    }), o2.on("viewend", function(y2, c2) {
      Object.assign(o2.data, c2);
    });
    var k2 = /* @__PURE__ */ __name(function(c2) {
      var v2 = this.mux.utils.now();
      this.data.player_init_time && (this.data.player_startup_time = v2 - this.data.player_init_time), !this.mux.PLAYER_TRACKED && this.NAVIGATION_START && (this.mux.PLAYER_TRACKED = true, (this.data.player_init_time || this.DOM_CONTENT_LOADED_EVENT_END) && (this.data.page_load_time = Math.min(this.data.player_init_time || 1 / 0, this.DOM_CONTENT_LOADED_EVENT_END || 1 / 0) - this.NAVIGATION_START)), this.send("playerready"), delete this.data.player_startup_time, delete this.data.page_load_time;
    }, "k");
    return o2.one("playerready", k2), o2.longResumeTracker = new Ur(g$5(o2)), o2.errorTracker = new Bt$2(g$5(o2)), new $t$2(g$5(o2)), o2.seekingTracker = new zt$1(g$5(o2)), o2.playheadTime = new Vt$2(g$5(o2)), o2.playbackHeartbeat = new Ht$2(g$5(o2)), new Qt$1(g$5(o2)), o2.watchTimeTracker = new Ut$2(g$5(o2)), new Ft$1(g$5(o2)), o2.adTracker = new Yt$2(g$5(o2)), new Gt$1(g$5(o2)), new jt$1(g$5(o2)), new Jt$2(g$5(o2)), new Xt$1(g$5(o2)), new Br(g$5(o2)), n2.hlsjs && o2.addHLSJS(n2), n2.dashjs && o2.addDashJS(n2), o2.emit("viewinit", n2.data), o2;
  }
  __name(t2, "t");
  return L$1(t2, [{ key: "emit", value: /* @__PURE__ */ __name(function(a, n2) {
    var o2, s2 = Object.assign({ viewer_time: this.mux.utils.now() }, n2), u2 = [a, s2];
    if (this.emitTranslator) try {
      u2 = this.emitTranslator(a, s2);
    } catch (p2) {
      this.mux.log.warn("Exception in emit translator callback.", p2);
    }
    u2 != null && u2.length && (o2 = De$1(X$2(t2.prototype), "emit", this)).call.apply(o2, [this].concat(W$1(u2)));
  }, "value") }, { key: "destroy", value: /* @__PURE__ */ __name(function() {
    this._destroyed || (this._destroyed = true, typeof this.data.view_start != "undefined" && (this.emit("viewend"), this.send("viewend")), this.playbackEventDispatcher.destroy(), this.removeHLSJS(), this.removeDashJS(), window.clearTimeout(this._heartBeatTimeout));
  }, "value") }, { key: "send", value: /* @__PURE__ */ __name(function(a) {
    if (this.data.view_id) {
      var n2 = Object.assign({}, this.data), o2 = ["player_program_time", "player_manifest_newest_program_time", "player_live_edge_program_time", "player_program_time", "video_holdback", "video_part_holdback", "video_target_duration", "video_part_target_duration"];
      if (n2.video_source_is_live === void 0 && (n2.player_source_duration === 1 / 0 || n2.video_source_duration === 1 / 0 ? n2.video_source_is_live = true : (n2.player_source_duration > 0 || n2.video_source_duration > 0) && (n2.video_source_is_live = false)), n2.video_source_is_live || o2.forEach(function(b2) {
        n2[b2] = void 0;
      }), n2.video_source_url = n2.video_source_url || n2.player_source_url, n2.video_source_url) {
        var s2 = H$2(re$3(n2.video_source_url), 2), u2 = s2[0], p2 = s2[1];
        n2.video_source_domain = p2, n2.video_source_hostname = u2;
      }
      delete n2.ad_request_id, this.playbackEventDispatcher.send(a, n2), this.data.view_sequence_number++, this.data.player_sequence_number++, hi.has(a) || this._restartHeartBeat(), a === "viewend" && delete this.data.view_id;
    }
  }, "value") }, { key: "_resetView", value: /* @__PURE__ */ __name(function(a) {
    this.emit("viewend"), this.send("viewend"), this.emit("viewinit", a);
  }, "value") }, { key: "_updateStateData", value: /* @__PURE__ */ __name(function() {
    var a = this.getStateData();
    if (typeof this.stateDataTranslator == "function") try {
      a = this.stateDataTranslator(a);
    } catch (n2) {
      this.mux.log.warn("Exception in stateDataTranslator translator callback.", n2);
    }
    Object.assign(this.data, a), this.playheadTime._updatePlayheadTime(), this._sanitizeData();
  }, "value") }, { key: "_sanitizeData", value: /* @__PURE__ */ __name(function() {
    var a = this, n2 = ["player_width", "player_height", "video_source_width", "video_source_height", "player_playhead_time", "video_source_bitrate"];
    n2.forEach(function(s2) {
      var u2 = parseInt(a.data[s2], 10);
      a.data[s2] = isNaN(u2) ? void 0 : u2;
    });
    var o2 = ["player_source_url", "video_source_url"];
    o2.forEach(function(s2) {
      if (a.data[s2]) {
        var u2 = a.data[s2].toLowerCase();
        (u2.indexOf("data:") === 0 || u2.indexOf("blob:") === 0) && (a.data[s2] = "MSE style URL");
      }
    });
  }, "value") }, { key: "_resetVideoData", value: /* @__PURE__ */ __name(function() {
    var a = this;
    Object.keys(this.data).forEach(function(n2) {
      n2.indexOf("video_") === 0 && delete a.data[n2];
    });
  }, "value") }, { key: "_resetViewData", value: /* @__PURE__ */ __name(function() {
    var a = this;
    Object.keys(this.data).forEach(function(n2) {
      n2.indexOf("view_") === 0 && delete a.data[n2];
    }), this.data.view_sequence_number = 1;
  }, "value") }, { key: "_resetErrorData", value: /* @__PURE__ */ __name(function() {
    delete this.data.player_error_code, delete this.data.player_error_message, delete this.data.player_error_context, delete this.data.player_error_severity, delete this.data.player_error_business_exception;
  }, "value") }, { key: "_initializeViewData", value: /* @__PURE__ */ __name(function() {
    var a = this, n2 = this.data.view_id = ee$3(), o2 = /* @__PURE__ */ __name(function() {
      n2 === a.data.view_id && O$2(a.data, "player_view_count", 1);
    }, "o");
    this.data.player_is_paused ? this.one("play", o2) : o2();
  }, "value") }, { key: "_restartHeartBeat", value: /* @__PURE__ */ __name(function() {
    var a = this;
    window.clearTimeout(this._heartBeatTimeout), this._heartBeatTimeout = window.setTimeout(function() {
      a.data.player_is_paused || a.emit("hb");
    }, 1e4);
  }, "value") }, { key: "addHLSJS", value: /* @__PURE__ */ __name(function(a) {
    if (!a.hlsjs) {
      this.mux.log.warn("You must pass a valid hlsjs instance in order to track it.");
      return;
    }
    if (this.hlsjs) {
      this.mux.log.warn("An instance of HLS.js is already being monitored for this player.");
      return;
    }
    this.hlsjs = a.hlsjs, Ot$2(this.mux, this.id, a.hlsjs, {}, a.Hls || window.Hls);
  }, "value") }, { key: "removeHLSJS", value: /* @__PURE__ */ __name(function() {
    this.hlsjs && (Pt$2(this.hlsjs), this.hlsjs = void 0);
  }, "value") }, { key: "addDashJS", value: /* @__PURE__ */ __name(function(a) {
    if (!a.dashjs) {
      this.mux.log.warn("You must pass a valid dashjs instance in order to track it.");
      return;
    }
    if (this.dashjs) {
      this.mux.log.warn("An instance of Dash.js is already being monitored for this player.");
      return;
    }
    this.dashjs = a.dashjs, Nt$2(this.mux, this.id, a.dashjs);
  }, "value") }, { key: "removeDashJS", value: /* @__PURE__ */ __name(function() {
    this.dashjs && (Lt$2(this.dashjs), this.dashjs = void 0);
  }, "value") }]), t2;
})(Mt$2), Fr = yi;
var he$2 = V$2(nt$2());
function ot$1() {
  return he$2.default && !!(he$2.default.fullscreenElement || he$2.default.webkitFullscreenElement || he$2.default.mozFullScreenElement || he$2.default.msFullscreenElement);
}
__name(ot$1, "ot$1");
var gi = ["loadstart", "pause", "play", "playing", "seeking", "seeked", "timeupdate", "ratechange", "stalled", "waiting", "error", "ended"], bi = { 1: "MEDIA_ERR_ABORTED", 2: "MEDIA_ERR_NETWORK", 3: "MEDIA_ERR_DECODE", 4: "MEDIA_ERR_SRC_NOT_SUPPORTED" };
function st$2(r10, e2, t2) {
  var i2 = H$2(se$3(e2), 3), a = i2[0], n2 = i2[1], o2 = i2[2], s2 = r10.log, u2 = r10.utils.getComputedStyle, p2 = r10.utils.secondsToMs, b2 = { automaticErrorTracking: true };
  if (a) {
    if (o2 !== "video" && o2 !== "audio") return s2.error("The element of `" + n2 + "` was not a media element.");
  } else return s2.error("No element was found with the `" + n2 + "` query selector.");
  a.mux && (a.mux.destroy(), delete a.mux, s2.warn("Already monitoring this video element, replacing existing event listeners"));
  var k2 = { getPlayheadTime: /* @__PURE__ */ __name(function() {
    return p2(a.currentTime);
  }, "getPlayheadTime"), getStateData: /* @__PURE__ */ __name(function() {
    var v2, T2, x2, m2 = ((v2 = (T2 = this).getPlayheadTime) === null || v2 === void 0 ? void 0 : v2.call(T2)) || p2(a.currentTime), f2 = this.hlsjs && this.hlsjs.url, _2 = this.dashjs && typeof this.dashjs.getSource == "function" && this.dashjs.getSource(), d2 = { player_is_paused: a.paused, player_width: parseInt(u2(a, "width")), player_height: parseInt(u2(a, "height")), player_autoplay_on: a.autoplay, player_preload_on: a.preload, player_language_code: a.lang, player_is_fullscreen: ot$1(), video_poster_url: a.poster, video_source_url: f2 || _2 || a.currentSrc, video_source_duration: p2(a.duration), video_source_height: a.videoHeight, video_source_width: a.videoWidth, view_dropped_frame_count: a == null || (x2 = a.getVideoPlaybackQuality) === null || x2 === void 0 ? void 0 : x2.call(a).droppedVideoFrames };
    if (a.getStartDate && m2 > 0) {
      var h2 = a.getStartDate();
      if (h2 && typeof h2.getTime == "function" && h2.getTime()) {
        var w2 = h2.getTime();
        if (d2.player_program_time = w2 + m2, a.seekable.length > 0) {
          var E2 = w2 + a.seekable.end(a.seekable.length - 1);
          d2.player_live_edge_program_time = E2;
        }
      }
    }
    return d2;
  }, "getStateData") };
  t2 = Object.assign(b2, t2, k2), t2.data = Object.assign({ player_software: "HTML5 Video Element", player_mux_plugin_name: "VideoElementMonitor", player_mux_plugin_version: r10.VERSION }, t2.data), a.mux = a.mux || {}, a.mux.deleted = false, a.mux.emit = function(c2, v2) {
    r10.emit(n2, c2, v2);
  }, a.mux.updateData = function(c2) {
    a.mux.emit("hb", c2);
  };
  var y2 = /* @__PURE__ */ __name(function() {
    s2.error("The monitor for this video element has already been destroyed.");
  }, "y");
  a.mux.destroy = function() {
    Object.keys(a.mux.listeners).forEach(function(c2) {
      a.removeEventListener(c2, a.mux.listeners[c2], false);
    }), delete a.mux.listeners, a.mux.destroy = y2, a.mux.swapElement = y2, a.mux.emit = y2, a.mux.addHLSJS = y2, a.mux.addDashJS = y2, a.mux.removeHLSJS = y2, a.mux.removeDashJS = y2, a.mux.updateData = y2, a.mux.setEmitTranslator = y2, a.mux.setStateDataTranslator = y2, a.mux.setGetPlayheadTime = y2, a.mux.deleted = true, r10.emit(n2, "destroy");
  }, a.mux.swapElement = function(c2) {
    var v2 = H$2(se$3(c2), 3), T2 = v2[0], x2 = v2[1], m2 = v2[2];
    if (T2) {
      if (m2 !== "video" && m2 !== "audio") return r10.log.error("The element of `" + x2 + "` was not a media element.");
    } else return r10.log.error("No element was found with the `" + x2 + "` query selector.");
    T2.muxId = a.muxId, delete a.muxId, T2.mux = T2.mux || {}, T2.mux.listeners = Object.assign({}, a.mux.listeners), delete a.mux.listeners, Object.keys(T2.mux.listeners).forEach(function(f2) {
      a.removeEventListener(f2, T2.mux.listeners[f2], false), T2.addEventListener(f2, T2.mux.listeners[f2], false);
    }), T2.mux.swapElement = a.mux.swapElement, T2.mux.destroy = a.mux.destroy, delete a.mux, a = T2;
  }, a.mux.addHLSJS = function(c2) {
    r10.addHLSJS(n2, c2);
  }, a.mux.addDashJS = function(c2) {
    r10.addDashJS(n2, c2);
  }, a.mux.removeHLSJS = function() {
    r10.removeHLSJS(n2);
  }, a.mux.removeDashJS = function() {
    r10.removeDashJS(n2);
  }, a.mux.setEmitTranslator = function(c2) {
    r10.setEmitTranslator(n2, c2);
  }, a.mux.setStateDataTranslator = function(c2) {
    r10.setStateDataTranslator(n2, c2);
  }, a.mux.setGetPlayheadTime = function(c2) {
    c2 || (c2 = t2.getPlayheadTime), r10.setGetPlayheadTime(n2, c2);
  }, r10.init(n2, t2), r10.emit(n2, "playerready"), a.paused || (r10.emit(n2, "play"), a.readyState > 2 && r10.emit(n2, "playing")), a.mux.listeners = {}, gi.forEach(function(c2) {
    c2 === "error" && !t2.automaticErrorTracking || (a.mux.listeners[c2] = function() {
      var v2 = {};
      if (c2 === "error") {
        if (!a.error || a.error.code === 1) return;
        v2.player_error_code = a.error.code, v2.player_error_message = bi[a.error.code] || a.error.message;
      }
      r10.emit(n2, c2, v2);
    }, a.addEventListener(c2, a.mux.listeners[c2], false));
  });
}
__name(st$2, "st$2");
function ut$2(r10, e2, t2, i2) {
  var a = i2;
  if (r10 && typeof r10[e2] == "function") try {
    a = r10[e2].apply(r10, t2);
  } catch (n2) {
    q$2.info("safeCall error", n2);
  }
  return a;
}
__name(ut$2, "ut$2");
var ge$3 = V$2(J$2()), ye$3;
ge$3.default && ge$3.default.WeakMap && (ye$3 = /* @__PURE__ */ new WeakMap());
function dt$2(r10, e2) {
  if (!r10 || !e2 || !ge$3.default || typeof ge$3.default.getComputedStyle != "function") return "";
  var t2;
  return ye$3 && ye$3.has(r10) && (t2 = ye$3.get(r10)), t2 || (t2 = ge$3.default.getComputedStyle(r10, null), ye$3 && ye$3.set(r10, t2)), t2.getPropertyValue(e2);
}
__name(dt$2, "dt$2");
function lt$1(r10) {
  return Math.floor(r10 * 1e3);
}
__name(lt$1, "lt$1");
var le$1 = { TARGET_DURATION: "#EXT-X-TARGETDURATION", PART_INF: "#EXT-X-PART-INF", SERVER_CONTROL: "#EXT-X-SERVER-CONTROL", INF: "#EXTINF", PROGRAM_DATE_TIME: "#EXT-X-PROGRAM-DATE-TIME", VERSION: "#EXT-X-VERSION", SESSION_DATA: "#EXT-X-SESSION-DATA" }, Fe$1 = /* @__PURE__ */ __name(function(e2) {
  return this.buffer = "", this.manifest = { segments: [], serverControl: {}, sessionData: {} }, this.currentUri = {}, this.process(e2), this.manifest;
}, "Fe$1");
Fe$1.prototype.process = function(r10) {
  var e2;
  for (this.buffer += r10, e2 = this.buffer.indexOf("\n"); e2 > -1; e2 = this.buffer.indexOf("\n")) this.processLine(this.buffer.substring(0, e2)), this.buffer = this.buffer.substring(e2 + 1);
};
Fe$1.prototype.processLine = function(r10) {
  var e2 = r10.indexOf(":"), t2 = ki(r10, e2), i2 = t2[0], a = t2.length === 2 ? _t$1(t2[1]) : void 0;
  if (i2[0] !== "#") this.currentUri.uri = i2, this.manifest.segments.push(this.currentUri), this.manifest.targetDuration && !("duration" in this.currentUri) && (this.currentUri.duration = this.manifest.targetDuration), this.currentUri = {};
  else switch (i2) {
    case le$1.TARGET_DURATION: {
      if (!isFinite(a) || a < 0) return;
      this.manifest.targetDuration = a, this.setHoldBack();
      break;
    }
    case le$1.PART_INF: {
      ct$2(this.manifest, t2), this.manifest.partInf.partTarget && (this.manifest.partTargetDuration = this.manifest.partInf.partTarget), this.setHoldBack();
      break;
    }
    case le$1.SERVER_CONTROL: {
      ct$2(this.manifest, t2), this.setHoldBack();
      break;
    }
    case le$1.INF: {
      a === 0 ? this.currentUri.duration = 0.01 : a > 0 && (this.currentUri.duration = a);
      break;
    }
    case le$1.PROGRAM_DATE_TIME: {
      var n2 = a, o2 = new Date(n2);
      this.manifest.dateTimeString || (this.manifest.dateTimeString = n2, this.manifest.dateTimeObject = o2), this.currentUri.dateTimeString = n2, this.currentUri.dateTimeObject = o2;
      break;
    }
    case le$1.VERSION: {
      ct$2(this.manifest, t2);
      break;
    }
    case le$1.SESSION_DATA: {
      var s2 = xi(t2[1]), u2 = Ce$2(s2);
      Object.assign(this.manifest.sessionData, u2);
    }
  }
};
Fe$1.prototype.setHoldBack = function() {
  var r10 = this.manifest, e2 = r10.serverControl, t2 = r10.targetDuration, i2 = r10.partTargetDuration;
  if (e2) {
    var a = "holdBack", n2 = "partHoldBack", o2 = t2 && t2 * 3, s2 = i2 && i2 * 2;
    t2 && !e2.hasOwnProperty(a) && (e2[a] = o2), o2 && e2[a] < o2 && (e2[a] = o2), i2 && !e2.hasOwnProperty(n2) && (e2[n2] = i2 * 3), i2 && e2[n2] < s2 && (e2[n2] = s2);
  }
};
var ct$2 = /* @__PURE__ */ __name(function(r10, e2) {
  var t2 = Vr(e2[0].replace("#EXT-X-", "")), i2;
  Ei(e2[1]) ? (i2 = {}, i2 = Object.assign(wi(e2[1]), i2)) : i2 = _t$1(e2[1]), r10[t2] = i2;
}, "ct$2"), Vr = /* @__PURE__ */ __name(function(r10) {
  return r10.toLowerCase().replace(/-(\w)/g, function(e2) {
    return e2[1].toUpperCase();
  });
}, "Vr"), _t$1 = /* @__PURE__ */ __name(function(r10) {
  if (r10.toLowerCase() === "yes" || r10.toLowerCase() === "no") return r10.toLowerCase() === "yes";
  var e2 = r10.indexOf(":") !== -1 ? r10 : parseFloat(r10);
  return isNaN(e2) ? r10 : e2;
}, "_t$1"), Ti = /* @__PURE__ */ __name(function(r10) {
  var e2 = {}, t2 = r10.split("=");
  if (t2.length > 1) {
    var i2 = Vr(t2[0]);
    e2[i2] = _t$1(t2[1]);
  }
  return e2;
}, "Ti"), wi = /* @__PURE__ */ __name(function(r10) {
  for (var e2 = r10.split(","), t2 = {}, i2 = 0; e2.length > i2; i2++) {
    var a = e2[i2], n2 = Ti(a);
    t2 = Object.assign(n2, t2);
  }
  return t2;
}, "wi"), Ei = /* @__PURE__ */ __name(function(r10) {
  return r10.indexOf("=") > -1;
}, "Ei"), ki = /* @__PURE__ */ __name(function(r10, e2) {
  return e2 === -1 ? [r10] : [r10.substring(0, e2), r10.substring(e2 + 1)];
}, "ki"), xi = /* @__PURE__ */ __name(function(r10) {
  var e2 = {};
  if (r10) {
    var t2 = r10.search(","), i2 = r10.slice(0, t2), a = r10.slice(t2 + 1), n2 = [i2, a];
    return n2.forEach(function(o2, s2) {
      for (var u2 = o2.replace(/['"]+/g, "").split("="), p2 = 0; p2 < u2.length; p2++) u2[p2] === "DATA-ID" && (e2["DATA-ID"] = u2[1 - p2]), u2[p2] === "VALUE" && (e2.VALUE = u2[1 - p2]);
    }), { data: e2 };
  }
}, "xi"), Wr = Fe$1;
var Di = { safeCall: ut$2, safeIncrement: O$2, getComputedStyle: dt$2, secondsToMs: lt$1, assign: Object.assign, headersStringToObject: pe, cdnHeadersToRequestId: de$3, extractHostnameAndDomain: re$3, extractHostname: F$2, manifestParser: Wr, generateShortID: Oe$1, generateUUID: ee$3, now: A$1.now, findMediaElement: se$3 }, jr = Di;
var Si = { PLAYER_READY: "playerready", VIEW_INIT: "viewinit", VIDEO_CHANGE: "videochange", PLAY: "play", PAUSE: "pause", PLAYING: "playing", TIME_UPDATE: "timeupdate", SEEKING: "seeking", SEEKED: "seeked", REBUFFER_START: "rebufferstart", REBUFFER_END: "rebufferend", ERROR: "error", ENDED: "ended", RENDITION_CHANGE: "renditionchange", ORIENTATION_CHANGE: "orientationchange", AD_REQUEST: "adrequest", AD_RESPONSE: "adresponse", AD_BREAK_START: "adbreakstart", AD_PLAY: "adplay", AD_PLAYING: "adplaying", AD_PAUSE: "adpause", AD_FIRST_QUARTILE: "adfirstquartile", AD_MID_POINT: "admidpoint", AD_THIRD_QUARTILE: "adthirdquartile", AD_ENDED: "adended", AD_BREAK_END: "adbreakend", AD_ERROR: "aderror", REQUEST_COMPLETED: "requestcompleted", REQUEST_FAILED: "requestfailed", REQUEST_CANCELLED: "requestcanceled", HEARTBEAT: "hb", DESTROY: "destroy" }, Gr$1 = Si;
var Ri = "mux-embed", qi = "5.9.0", Ai = "2.1", C$3 = {}, ne$3 = /* @__PURE__ */ __name(function(e2) {
  var t2 = arguments;
  typeof e2 == "string" ? ne$3.hasOwnProperty(e2) ? be$1.default.setTimeout(function() {
    t2 = Array.prototype.splice.call(t2, 1), ne$3[e2].apply(null, t2);
  }, 0) : q$2.warn("`" + e2 + "` is an unknown task") : typeof e2 == "function" ? be$1.default.setTimeout(function() {
    e2(ne$3);
  }, 0) : q$2.warn("`" + e2 + "` is invalid.");
}, "ne$3"), Oi = { loaded: A$1.now(), NAME: Ri, VERSION: qi, API_VERSION: Ai, PLAYER_TRACKED: false, monitor: /* @__PURE__ */ __name(function(e2, t2) {
  return st$2(ne$3, e2, t2);
}, "monitor"), destroyMonitor: /* @__PURE__ */ __name(function(e2) {
  var t2 = H$2(se$3(e2), 1), i2 = t2[0];
  i2 && i2.mux && typeof i2.mux.destroy == "function" ? i2.mux.destroy() : q$2.error("A video element monitor for `" + e2 + "` has not been initialized via `mux.monitor`.");
}, "destroyMonitor"), addHLSJS: /* @__PURE__ */ __name(function(e2, t2) {
  var i2 = Q$2(e2);
  C$3[i2] ? C$3[i2].addHLSJS(t2) : q$2.error("A monitor for `" + i2 + "` has not been initialized.");
}, "addHLSJS"), addDashJS: /* @__PURE__ */ __name(function(e2, t2) {
  var i2 = Q$2(e2);
  C$3[i2] ? C$3[i2].addDashJS(t2) : q$2.error("A monitor for `" + i2 + "` has not been initialized.");
}, "addDashJS"), removeHLSJS: /* @__PURE__ */ __name(function(e2) {
  var t2 = Q$2(e2);
  C$3[t2] ? C$3[t2].removeHLSJS() : q$2.error("A monitor for `" + t2 + "` has not been initialized.");
}, "removeHLSJS"), removeDashJS: /* @__PURE__ */ __name(function(e2) {
  var t2 = Q$2(e2);
  C$3[t2] ? C$3[t2].removeDashJS() : q$2.error("A monitor for `" + t2 + "` has not been initialized.");
}, "removeDashJS"), init: /* @__PURE__ */ __name(function(e2, t2) {
  ce$1() && t2 && t2.respectDoNotTrack && q$2.info("The browser's Do Not Track flag is enabled - Mux beaconing is disabled.");
  var i2 = Q$2(e2);
  C$3[i2] = new Fr(ne$3, i2, t2);
}, "init"), emit: /* @__PURE__ */ __name(function(e2, t2, i2) {
  var a = Q$2(e2);
  C$3[a] ? (C$3[a].emit(t2, i2), t2 === "destroy" && delete C$3[a]) : q$2.error("A monitor for `" + a + "` has not been initialized.");
}, "emit"), updateData: /* @__PURE__ */ __name(function(e2, t2) {
  var i2 = Q$2(e2);
  C$3[i2] ? C$3[i2].emit("hb", t2) : q$2.error("A monitor for `" + i2 + "` has not been initialized.");
}, "updateData"), setEmitTranslator: /* @__PURE__ */ __name(function(e2, t2) {
  var i2 = Q$2(e2);
  C$3[i2] ? C$3[i2].emitTranslator = t2 : q$2.error("A monitor for `" + i2 + "` has not been initialized.");
}, "setEmitTranslator"), setStateDataTranslator: /* @__PURE__ */ __name(function(e2, t2) {
  var i2 = Q$2(e2);
  C$3[i2] ? C$3[i2].stateDataTranslator = t2 : q$2.error("A monitor for `" + i2 + "` has not been initialized.");
}, "setStateDataTranslator"), setGetPlayheadTime: /* @__PURE__ */ __name(function(e2, t2) {
  var i2 = Q$2(e2);
  C$3[i2] ? C$3[i2].getPlayheadTime = t2 : q$2.error("A monitor for `" + i2 + "` has not been initialized.");
}, "setGetPlayheadTime"), checkDoNotTrack: ce$1, log: q$2, utils: jr, events: Gr$1, WINDOW_HIDDEN: false, WINDOW_UNLOADING: false };
Object.assign(ne$3, Oi);
typeof be$1.default != "undefined" && typeof be$1.default.addEventListener == "function" && be$1.default.addEventListener("pagehide", function(r10) {
  r10.persisted || (ne$3.WINDOW_UNLOADING = true);
}, false);
var Ed = ne$3;
var g$4 = Hls;
var C$2 = { VIDEO: "video", THUMBNAIL: "thumbnail", STORYBOARD: "storyboard", DRM: "drm" }, D$2 = { NOT_AN_ERROR: 0, NETWORK_OFFLINE: 2000002, NETWORK_UNKNOWN_ERROR: 2e6, NETWORK_NO_STATUS: 2000001, NETWORK_INVALID_URL: 24e5, NETWORK_NOT_FOUND: 2404e3, NETWORK_NOT_READY: 2412e3, NETWORK_GENERIC_SERVER_FAIL: 25e5, NETWORK_TOKEN_MISSING: 2403201, NETWORK_TOKEN_MALFORMED: 2412202, NETWORK_TOKEN_EXPIRED: 2403210, NETWORK_TOKEN_AUD_MISSING: 2403221, NETWORK_TOKEN_AUD_MISMATCH: 2403222, NETWORK_TOKEN_SUB_MISMATCH: 2403232, ENCRYPTED_ERROR: 5e6, ENCRYPTED_UNSUPPORTED_KEY_SYSTEM: 5000001, ENCRYPTED_GENERATE_REQUEST_FAILED: 5000002, ENCRYPTED_UPDATE_LICENSE_FAILED: 5000003, ENCRYPTED_UPDATE_SERVER_CERT_FAILED: 5000004, ENCRYPTED_CDM_ERROR: 5000005, ENCRYPTED_OUTPUT_RESTRICTED: 5000006, ENCRYPTED_MISSING_TOKEN: 5000002 }, V$1 = /* @__PURE__ */ __name((e2) => e2 === C$2.VIDEO ? "playback" : e2, "V$1"), L = (_a = class extends Error {
  constructor(t2, r10 = _a.MEDIA_ERR_CUSTOM, n2, o2) {
    var s2;
    super(t2), this.name = "MediaError", this.code = r10, this.context = o2, this.fatal = n2 != null ? n2 : r10 >= _a.MEDIA_ERR_NETWORK && r10 <= _a.MEDIA_ERR_ENCRYPTED, this.message || (this.message = (s2 = _a.defaultMessages[this.code]) != null ? s2 : "");
  }
}, __name(_a, "L"), _a);
L.MEDIA_ERR_ABORTED = 1, L.MEDIA_ERR_NETWORK = 2, L.MEDIA_ERR_DECODE = 3, L.MEDIA_ERR_SRC_NOT_SUPPORTED = 4, L.MEDIA_ERR_ENCRYPTED = 5, L.MEDIA_ERR_CUSTOM = 100, L.defaultMessages = { 1: "You aborted the media playback", 2: "A network error caused the media download to fail.", 3: "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.", 4: "An unsupported error occurred. The server or network failed, or your browser does not support this format.", 5: "The media is encrypted and there are no keys to decrypt it." };
var f$3 = L;
var at$2 = /* @__PURE__ */ __name((e2) => e2 == null, "at$2"), O$1 = /* @__PURE__ */ __name((e2, t2) => at$2(t2) ? false : e2 in t2, "O$1"), K$2 = { ANY: "any", MUTED: "muted" }, _$1 = { ON_DEMAND: "on-demand", LIVE: "live", UNKNOWN: "unknown" }, X$1 = { MSE: "mse", NATIVE: "native" }, S = { HEADER: "header", QUERY: "query", NONE: "none" }, Zt$1 = Object.values(S), I$2 = { M3U8: "application/vnd.apple.mpegurl", MP4: "video/mp4" }, W = { HLS: I$2.M3U8 };
[...Object.values(I$2), "hls", "HLS"];
var rr = { upTo720p: "720p", upTo1080p: "1080p", upTo1440p: "1440p", upTo2160p: "2160p" }, nr = { noLessThan480p: "480p", noLessThan540p: "540p", noLessThan720p: "720p", noLessThan1080p: "1080p", noLessThan1440p: "1440p", noLessThan2160p: "2160p" }, or = { DESCENDING: "desc" };
var st$1 = "en", Y$1 = { code: st$1 };
var v$2 = /* @__PURE__ */ __name((e2, t2, r10, n2, o2 = e2) => {
  o2.addEventListener(t2, r10, n2), e2.addEventListener("teardown", () => {
    o2.removeEventListener(t2, r10);
  }, { once: true });
}, "v$2");
function Te$1(e2, t2, r10) {
  t2 && r10 > t2 && (r10 = t2);
  for (let n2 = 0; n2 < e2.length; n2++) if (e2.start(n2) <= r10 && e2.end(n2) >= r10) return true;
  return false;
}
__name(Te$1, "Te$1");
var F$1 = /* @__PURE__ */ __name((e2) => {
  let t2 = e2.indexOf("?");
  if (t2 < 0) return [e2];
  let r10 = e2.slice(0, t2), n2 = e2.slice(t2);
  return [r10, n2];
}, "F$1"), U$1 = /* @__PURE__ */ __name((e2) => {
  let { type: t2 } = e2;
  if (t2) {
    let r10 = t2.toUpperCase();
    return O$1(r10, W) ? W[r10] : t2;
  }
  return it(e2);
}, "U$1"), Q$1 = /* @__PURE__ */ __name((e2) => e2 === "VOD" ? _$1.ON_DEMAND : _$1.LIVE, "Q$1"), Z = /* @__PURE__ */ __name((e2) => e2 === "EVENT" ? Number.POSITIVE_INFINITY : e2 === "VOD" ? Number.NaN : 0, "Z"), it = /* @__PURE__ */ __name((e2) => {
  let { src: t2 } = e2;
  if (!t2) return "";
  let r10 = "";
  try {
    r10 = new URL(t2).pathname;
  } catch {
    console.error("invalid url");
  }
  let n2 = r10.lastIndexOf(".");
  if (n2 < 0) return ut$1(e2) ? I$2.M3U8 : "";
  let s2 = r10.slice(n2 + 1).toUpperCase();
  return O$1(s2, I$2) ? I$2[s2] : "";
}, "it"), ct$1 = "mux.com", ut$1 = /* @__PURE__ */ __name(({ src: e2, customDomain: t2 = ct$1 }) => {
  let r10;
  try {
    r10 = new URL(`${e2}`);
  } catch {
    return false;
  }
  let n2 = r10.protocol === "https:", o2 = r10.hostname === `stream.${t2}`.toLowerCase(), s2 = r10.pathname.split("/"), a = s2.length === 2, i2 = !(s2 != null && s2[1].includes("."));
  return n2 && o2 && a && i2;
}, "ut$1"), ee$2 = /* @__PURE__ */ __name((e2) => {
  let t2 = (e2 != null ? e2 : "").split(".")[1];
  if (t2) try {
    let r10 = t2.replace(/-/g, "+").replace(/_/g, "/"), n2 = decodeURIComponent(atob(r10).split("").map(function(o2) {
      return "%" + ("00" + o2.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));
    return JSON.parse(n2);
  } catch {
    return;
  }
}, "ee$2"), ye$2 = /* @__PURE__ */ __name(({ exp: e2 }, t2 = Date.now()) => !e2 || e2 * 1e3 < t2, "ye$2"), me$2 = /* @__PURE__ */ __name(({ sub: e2 }, t2) => e2 !== t2, "me$2"), Ee = /* @__PURE__ */ __name(({ aud: e2 }, t2) => !e2, "Ee"), ge$2 = /* @__PURE__ */ __name(({ aud: e2 }, t2) => e2 !== t2, "ge$2"), Me = "en";
function x$4(e2, t2 = true) {
  var o2, s2;
  let r10 = t2 && (s2 = (o2 = Y$1) == null ? void 0 : o2[e2]) != null ? s2 : e2, n2 = t2 ? Y$1.code : Me;
  return new z$1(r10, n2);
}
__name(x$4, "x$4");
var z$1 = (_b = class {
  constructor(t2, r10 = ((n2) => (n2 = Y$1) != null ? n2 : Me)()) {
    this.message = t2, this.locale = r10;
  }
  format(t2) {
    return this.message.replace(/\{(\w+)\}/g, (r10, n2) => {
      var o2;
      return (o2 = t2[n2]) != null ? o2 : "";
    });
  }
  toString() {
    return this.message;
  }
}, __name(_b, "z"), _b);
var dt$1 = Object.values(K$2), xe$2 = /* @__PURE__ */ __name((e2) => typeof e2 == "boolean" || typeof e2 == "string" && dt$1.includes(e2), "xe$2"), Re$1 = /* @__PURE__ */ __name((e2, t2, r10) => {
  let { autoplay: n2 } = e2, o2 = false, s2 = false, a = xe$2(n2) ? n2 : !!n2, i2 = /* @__PURE__ */ __name(() => {
    o2 || v$2(t2, "playing", () => {
      o2 = true;
    }, { once: true });
  }, "i");
  if (i2(), v$2(t2, "loadstart", () => {
    o2 = false, i2(), te$2(t2, a);
  }, { once: true }), v$2(t2, "loadstart", () => {
    r10 || (e2.streamType && e2.streamType !== _$1.UNKNOWN ? s2 = e2.streamType === _$1.LIVE : s2 = !Number.isFinite(t2.duration)), te$2(t2, a);
  }, { once: true }), r10 && r10.once(g$4.Events.LEVEL_LOADED, (u2, c2) => {
    var d2;
    e2.streamType && e2.streamType !== _$1.UNKNOWN ? s2 = e2.streamType === _$1.LIVE : s2 = (d2 = c2.details.live) != null ? d2 : false;
  }), !a) {
    let u2 = /* @__PURE__ */ __name(() => {
      !s2 || Number.isFinite(e2.startTime) || (r10 != null && r10.liveSyncPosition ? t2.currentTime = r10.liveSyncPosition : Number.isFinite(t2.seekable.end(0)) && (t2.currentTime = t2.seekable.end(0)));
    }, "u");
    r10 && v$2(t2, "play", () => {
      t2.preload === "metadata" ? r10.once(g$4.Events.LEVEL_UPDATED, u2) : u2();
    }, { once: true });
  }
  return (u2) => {
    o2 || (a = xe$2(u2) ? u2 : !!u2, te$2(t2, a));
  };
}, "Re$1"), te$2 = /* @__PURE__ */ __name((e2, t2) => {
  if (!t2) return;
  let r10 = e2.muted, n2 = /* @__PURE__ */ __name(() => e2.muted = r10, "n");
  switch (t2) {
    case K$2.ANY:
      e2.play().catch(() => {
        e2.muted = true, e2.play().catch(n2);
      });
      break;
    case K$2.MUTED:
      e2.muted = true, e2.play().catch(n2);
      break;
    default:
      e2.play().catch(() => {
      });
      break;
  }
}, "te$2");
var be = /* @__PURE__ */ __name(({ preload: e2, src: t2 }, r10, n2) => {
  let o2 = /* @__PURE__ */ __name((d2) => {
    d2 != null && ["", "none", "metadata", "auto"].includes(d2) ? r10.setAttribute("preload", d2) : r10.removeAttribute("preload");
  }, "o");
  if (!n2) return o2(e2), o2;
  let s2 = false, a = false, i2 = n2.config.maxBufferLength, l2 = n2.config.maxBufferSize, u2 = /* @__PURE__ */ __name((d2) => {
    o2(d2);
    let p2 = d2 != null ? d2 : r10.preload;
    a || p2 === "none" || (p2 === "metadata" ? (n2.config.maxBufferLength = 1, n2.config.maxBufferSize = 1) : (n2.config.maxBufferLength = i2, n2.config.maxBufferSize = l2), c2());
  }, "u"), c2 = /* @__PURE__ */ __name(() => {
    !s2 && t2 && (s2 = true, n2.loadSource(t2));
  }, "c");
  return v$2(r10, "play", () => {
    a = true, n2.config.maxBufferLength = i2, n2.config.maxBufferSize = l2, c2();
  }, { once: true }), u2(e2), u2;
}, "be");
function De(e2, t2) {
  var i2;
  if (!("videoTracks" in e2)) return;
  let r10 = /* @__PURE__ */ new WeakMap();
  t2.on(g$4.Events.MANIFEST_PARSED, function(l2, u2) {
    a();
    let c2 = e2.addVideoTrack("main");
    c2.selected = true;
    for (let [d2, p2] of u2.levels.entries()) {
      let T2 = c2.addRendition(p2.url[0], p2.width, p2.height, p2.videoCodec, p2.bitrate);
      r10.set(p2, `${d2}`), T2.id = `${d2}`;
    }
  }), t2.on(g$4.Events.AUDIO_TRACKS_UPDATED, function(l2, u2) {
    s2();
    for (let c2 of u2.audioTracks) {
      let d2 = c2.default ? "main" : "alternative", p2 = e2.addAudioTrack(d2, c2.name, c2.lang);
      p2.id = `${c2.id}`, c2.default && (p2.enabled = true);
    }
  }), e2.audioTracks.addEventListener("change", () => {
    var c2;
    let l2 = +((c2 = [...e2.audioTracks].find((d2) => d2.enabled)) == null ? void 0 : c2.id), u2 = t2.audioTracks.map((d2) => d2.id);
    l2 != t2.audioTrack && u2.includes(l2) && (t2.audioTrack = l2);
  }), t2.on(g$4.Events.LEVELS_UPDATED, function(l2, u2) {
    var p2;
    let c2 = e2.videoTracks[(p2 = e2.videoTracks.selectedIndex) != null ? p2 : 0];
    if (!c2) return;
    let d2 = u2.levels.map((T2) => r10.get(T2));
    for (let T2 of e2.videoRenditions) T2.id && !d2.includes(T2.id) && c2.removeRendition(T2);
  });
  let n2 = /* @__PURE__ */ __name((l2) => {
    let u2 = l2.target.selectedIndex;
    u2 != t2.nextLevel && (t2.nextLevel = u2);
  }, "n");
  (i2 = e2.videoRenditions) == null || i2.addEventListener("change", n2);
  let o2 = /* @__PURE__ */ __name(() => {
    for (let l2 of e2.videoTracks) e2.removeVideoTrack(l2);
  }, "o"), s2 = /* @__PURE__ */ __name(() => {
    for (let l2 of e2.audioTracks) e2.removeAudioTrack(l2);
  }, "s"), a = /* @__PURE__ */ __name(() => {
    o2(), s2();
  }, "a");
  t2.once(g$4.Events.DESTROYING, a);
}
__name(De, "De");
var re$2 = /* @__PURE__ */ __name((e2) => "time" in e2 ? e2.time : e2.startTime, "re$2");
function Ce$1(e2, t2) {
  t2.on(g$4.Events.NON_NATIVE_TEXT_TRACKS_FOUND, (o2, { tracks: s2 }) => {
    s2.forEach((a) => {
      var c2, d2;
      let i2 = (c2 = a.subtitleTrack) != null ? c2 : a.closedCaptions, l2 = t2.subtitleTracks.findIndex(({ lang: p2, name: T2, type: m2 }) => p2 == (i2 == null ? void 0 : i2.lang) && T2 === a.label && m2.toLowerCase() === a.kind), u2 = ((d2 = a._id) != null ? d2 : a.default) ? "default" : `${a.kind}${l2}`;
      ne$2(e2, a.kind, a.label, i2 == null ? void 0 : i2.lang, u2, a.default);
    });
  });
  let r10 = /* @__PURE__ */ __name(() => {
    if (!t2.subtitleTracks.length) return;
    let o2 = Array.from(e2.textTracks).find((i2) => i2.id && i2.mode === "showing" && ["subtitles", "captions"].includes(i2.kind));
    if (!o2) return;
    let s2 = t2.subtitleTracks[t2.subtitleTrack], a = s2 ? s2.default ? "default" : `${t2.subtitleTracks[t2.subtitleTrack].type.toLowerCase()}${t2.subtitleTrack}` : void 0;
    if (t2.subtitleTrack < 0 || (o2 == null ? void 0 : o2.id) !== a) {
      let i2 = t2.subtitleTracks.findIndex(({ lang: l2, name: u2, type: c2, default: d2 }) => o2.id === "default" && d2 || l2 == o2.language && u2 === o2.label && c2.toLowerCase() === o2.kind);
      t2.subtitleTrack = i2;
    }
    (o2 == null ? void 0 : o2.id) === a && o2.cues && Array.from(o2.cues).forEach((i2) => {
      o2.addCue(i2);
    });
  }, "r");
  e2.textTracks.addEventListener("change", r10), t2.on(g$4.Events.CUES_PARSED, (o2, { track: s2, cues: a }) => {
    let i2 = e2.textTracks.getTrackById(s2);
    if (!i2) return;
    let l2 = i2.mode === "disabled";
    l2 && (i2.mode = "hidden"), a.forEach((u2) => {
      var c2;
      (c2 = i2.cues) != null && c2.getCueById(u2.id) || i2.addCue(u2);
    }), l2 && (i2.mode = "disabled");
  }), t2.once(g$4.Events.DESTROYING, () => {
    e2.textTracks.removeEventListener("change", r10), e2.querySelectorAll("track[data-removeondestroy]").forEach((s2) => {
      s2.remove();
    });
  });
  let n2 = /* @__PURE__ */ __name(() => {
    Array.from(e2.textTracks).forEach((o2) => {
      var s2, a;
      if (!["subtitles", "caption"].includes(o2.kind) && (o2.label === "thumbnails" || o2.kind === "chapters")) {
        if (!((s2 = o2.cues) != null && s2.length)) {
          let i2 = "track";
          o2.kind && (i2 += `[kind="${o2.kind}"]`), o2.label && (i2 += `[label="${o2.label}"]`);
          let l2 = e2.querySelector(i2), u2 = (a = l2 == null ? void 0 : l2.getAttribute("src")) != null ? a : "";
          l2 == null || l2.removeAttribute("src"), setTimeout(() => {
            l2 == null || l2.setAttribute("src", u2);
          }, 0);
        }
        o2.mode !== "hidden" && (o2.mode = "hidden");
      }
    });
  }, "n");
  t2.once(g$4.Events.MANIFEST_LOADED, n2), t2.once(g$4.Events.MEDIA_ATTACHED, n2);
}
__name(Ce$1, "Ce$1");
function ne$2(e2, t2, r10, n2, o2, s2) {
  let a = document.createElement("track");
  return a.kind = t2, a.label = r10, n2 && (a.srclang = n2), o2 && (a.id = o2), s2 && (a.default = true), a.track.mode = ["subtitles", "captions"].includes(t2) ? "disabled" : "hidden", a.setAttribute("data-removeondestroy", ""), e2.append(a), a.track;
}
__name(ne$2, "ne$2");
function lt(e2, t2) {
  let r10 = Array.prototype.find.call(e2.querySelectorAll("track"), (n2) => n2.track === t2);
  r10 == null || r10.remove();
}
__name(lt, "lt");
function w$1(e2, t2, r10) {
  var n2;
  return (n2 = Array.from(e2.querySelectorAll("track")).find((o2) => o2.track.label === t2 && o2.track.kind === r10)) == null ? void 0 : n2.track;
}
__name(w$1, "w$1");
async function ve$1(e2, t2, r10, n2) {
  let o2 = w$1(e2, r10, n2);
  return o2 || (o2 = ne$2(e2, n2, r10), o2.mode = "hidden", await new Promise((s2) => setTimeout(() => s2(void 0), 0))), o2.mode !== "hidden" && (o2.mode = "hidden"), [...t2].sort((s2, a) => re$2(a) - re$2(s2)).forEach((s2) => {
    var l2, u2;
    let a = s2.value, i2 = re$2(s2);
    if ("endTime" in s2 && s2.endTime != null) o2 == null || o2.addCue(new VTTCue(i2, s2.endTime, n2 === "chapters" ? a : JSON.stringify(a != null ? a : null)));
    else {
      let c2 = Array.prototype.findIndex.call(o2 == null ? void 0 : o2.cues, (m2) => m2.startTime >= i2), d2 = (l2 = o2 == null ? void 0 : o2.cues) == null ? void 0 : l2[c2], p2 = d2 ? d2.startTime : Number.isFinite(e2.duration) ? e2.duration : Number.MAX_SAFE_INTEGER, T2 = (u2 = o2 == null ? void 0 : o2.cues) == null ? void 0 : u2[c2 - 1];
      T2 && (T2.endTime = i2), o2 == null || o2.addCue(new VTTCue(i2, p2, n2 === "chapters" ? a : JSON.stringify(a != null ? a : null)));
    }
  }), e2.textTracks.dispatchEvent(new Event("change", { bubbles: true, composed: true })), o2;
}
__name(ve$1, "ve$1");
var oe$2 = "cuepoints", Pe$1 = Object.freeze({ label: oe$2 });
async function _e$1(e2, t2, r10 = Pe$1) {
  return ve$1(e2, t2, r10.label, "metadata");
}
__name(_e$1, "_e$1");
var $ = /* @__PURE__ */ __name((e2) => ({ time: e2.startTime, value: JSON.parse(e2.text) }), "$");
function pt$1(e2, t2 = { label: oe$2 }) {
  let r10 = w$1(e2, t2.label, "metadata");
  return r10 != null && r10.cues ? Array.from(r10.cues, (n2) => $(n2)) : [];
}
__name(pt$1, "pt$1");
function ke$1(e2, t2 = { label: oe$2 }) {
  var s2, a;
  let r10 = w$1(e2, t2.label, "metadata");
  if (!((s2 = r10 == null ? void 0 : r10.activeCues) != null && s2.length)) return;
  if (r10.activeCues.length === 1) return $(r10.activeCues[0]);
  let { currentTime: n2 } = e2, o2 = Array.prototype.find.call((a = r10.activeCues) != null ? a : [], ({ startTime: i2, endTime: l2 }) => i2 <= n2 && l2 > n2);
  return $(o2 || r10.activeCues[0]);
}
__name(ke$1, "ke$1");
async function he$1(e2, t2 = Pe$1) {
  return new Promise((r10) => {
    v$2(e2, "loadstart", async () => {
      let n2 = await _e$1(e2, [], t2);
      v$2(e2, "cuechange", () => {
        let o2 = ke$1(e2);
        if (o2) {
          let s2 = new CustomEvent("cuepointchange", { composed: true, bubbles: true, detail: o2 });
          e2.dispatchEvent(s2);
        }
      }, {}, n2), r10(n2);
    });
  });
}
__name(he$1, "he$1");
var ae$2 = "chapters", Le = Object.freeze({ label: ae$2 }), B$2 = /* @__PURE__ */ __name((e2) => ({ startTime: e2.startTime, endTime: e2.endTime, value: e2.text }), "B$2");
async function Ne$1(e2, t2, r10 = Le) {
  return ve$1(e2, t2, r10.label, "chapters");
}
__name(Ne$1, "Ne$1");
function ft(e2, t2 = { label: ae$2 }) {
  var n2;
  let r10 = w$1(e2, t2.label, "chapters");
  return (n2 = r10 == null ? void 0 : r10.cues) != null && n2.length ? Array.from(r10.cues, (o2) => B$2(o2)) : [];
}
__name(ft, "ft");
function Ie(e2, t2 = { label: ae$2 }) {
  var s2, a;
  let r10 = w$1(e2, t2.label, "chapters");
  if (!((s2 = r10 == null ? void 0 : r10.activeCues) != null && s2.length)) return;
  if (r10.activeCues.length === 1) return B$2(r10.activeCues[0]);
  let { currentTime: n2 } = e2, o2 = Array.prototype.find.call((a = r10.activeCues) != null ? a : [], ({ startTime: i2, endTime: l2 }) => i2 <= n2 && l2 > n2);
  return B$2(o2 || r10.activeCues[0]);
}
__name(Ie, "Ie");
async function Ae$1(e2, t2 = Le) {
  return new Promise((r10) => {
    v$2(e2, "loadstart", async () => {
      let n2 = await Ne$1(e2, [], t2);
      v$2(e2, "cuechange", () => {
        let o2 = Ie(e2);
        if (o2) {
          let s2 = new CustomEvent("chapterchange", { composed: true, bubbles: true, detail: o2 });
          e2.dispatchEvent(s2);
        }
      }, {}, n2), r10(n2);
    });
  });
}
__name(Ae$1, "Ae$1");
function Tt$1(e2, t2) {
  if (t2) {
    let r10 = t2.playingDate;
    if (r10 != null) return new Date(r10.getTime() - e2.currentTime * 1e3);
  }
  return typeof e2.getStartDate == "function" ? e2.getStartDate() : /* @__PURE__ */ new Date(NaN);
}
__name(Tt$1, "Tt$1");
function yt(e2, t2) {
  if (t2 && t2.playingDate) return t2.playingDate;
  if (typeof e2.getStartDate == "function") {
    let r10 = e2.getStartDate();
    return new Date(r10.getTime() + e2.currentTime * 1e3);
  }
  return /* @__PURE__ */ new Date(NaN);
}
__name(yt, "yt");
var se$2 = { VIDEO: "v", THUMBNAIL: "t", STORYBOARD: "s", DRM: "d" }, mt$1 = /* @__PURE__ */ __name((e2) => {
  if (e2 === C$2.VIDEO) return se$2.VIDEO;
  if (e2 === C$2.DRM) return se$2.DRM;
}, "mt$1"), Et$1 = /* @__PURE__ */ __name((e2, t2) => {
  var o2, s2;
  let r10 = V$1(e2), n2 = `${r10}Token`;
  return (o2 = t2.tokens) != null && o2[r10] ? (s2 = t2.tokens) == null ? void 0 : s2[r10] : O$1(n2, t2) ? t2[n2] : void 0;
}, "Et$1"), H$1 = /* @__PURE__ */ __name((e2, t2, r10, n2, o2 = false, s2 = !((a) => (a = globalThis.navigator) == null ? void 0 : a.onLine)()) => {
  var M2, h2;
  if (s2) {
    let b2 = x$4("Your device appears to be offline", o2), E2 = void 0, y2 = f$3.MEDIA_ERR_NETWORK, k2 = new f$3(b2, y2, false, E2);
    return k2.errorCategory = t2, k2.muxCode = D$2.NETWORK_OFFLINE, k2.data = e2, k2;
  }
  let i2 = "status" in e2 ? e2.status : e2.code, l2 = Date.now(), u2 = f$3.MEDIA_ERR_NETWORK;
  if (i2 === 200) return;
  let c2 = V$1(t2), d2 = Et$1(t2, r10), p2 = mt$1(t2), [T2] = F$1((M2 = r10.playbackId) != null ? M2 : "");
  if (!i2 || !T2) return;
  let m2 = ee$2(d2);
  if (d2 && !m2) {
    let b2 = x$4("The {tokenNamePrefix}-token provided is invalid or malformed.", o2).format({ tokenNamePrefix: c2 }), E2 = x$4("Compact JWT string: {token}", o2).format({ token: d2 }), y2 = new f$3(b2, u2, true, E2);
    return y2.errorCategory = t2, y2.muxCode = D$2.NETWORK_TOKEN_MALFORMED, y2.data = e2, y2;
  }
  if (i2 >= 500) {
    let b2 = new f$3("", u2, n2 != null ? n2 : true);
    return b2.errorCategory = t2, b2.muxCode = D$2.NETWORK_UNKNOWN_ERROR, b2;
  }
  if (i2 === 403) if (m2) {
    if (ye$2(m2, l2)) {
      let b2 = { timeStyle: "medium", dateStyle: "medium" }, E2 = x$4("The video’s secured {tokenNamePrefix}-token has expired.", o2).format({ tokenNamePrefix: c2 }), y2 = x$4("Expired at: {expiredDate}. Current time: {currentDate}.", o2).format({ expiredDate: new Intl.DateTimeFormat("en", b2).format((h2 = m2.exp) != null ? h2 : 0 * 1e3), currentDate: new Intl.DateTimeFormat("en", b2).format(l2) }), k2 = new f$3(E2, u2, true, y2);
      return k2.errorCategory = t2, k2.muxCode = D$2.NETWORK_TOKEN_EXPIRED, k2.data = e2, k2;
    }
    if (me$2(m2, T2)) {
      let b2 = x$4("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.", o2).format({ tokenNamePrefix: c2 }), E2 = x$4("Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}", o2).format({ tokenNamePrefix: c2, playbackId: T2, tokenPlaybackId: m2.sub }), y2 = new f$3(b2, u2, true, E2);
      return y2.errorCategory = t2, y2.muxCode = D$2.NETWORK_TOKEN_SUB_MISMATCH, y2.data = e2, y2;
    }
    if (Ee(m2)) {
      let b2 = x$4("The {tokenNamePrefix}-token is formatted with incorrect information.", o2).format({ tokenNamePrefix: c2 }), E2 = x$4("The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.", o2).format({ tokenNamePrefix: c2, expectedAud: p2 }), y2 = new f$3(b2, u2, true, E2);
      return y2.errorCategory = t2, y2.muxCode = D$2.NETWORK_TOKEN_AUD_MISSING, y2.data = e2, y2;
    }
    if (ge$2(m2, p2)) {
      let b2 = x$4("The {tokenNamePrefix}-token is formatted with incorrect information.", o2).format({ tokenNamePrefix: c2 }), E2 = x$4("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.", o2).format({ tokenNamePrefix: c2, expectedAud: p2, aud: m2.aud }), y2 = new f$3(b2, u2, true, E2);
      return y2.errorCategory = t2, y2.muxCode = D$2.NETWORK_TOKEN_AUD_MISMATCH, y2.data = e2, y2;
    }
  } else {
    let b2 = x$4("Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.", o2).format({ tokenNamePrefix: c2, category: t2 }), E2 = x$4("Specified playback ID: {playbackId}", o2).format({ playbackId: T2 }), y2 = new f$3(b2, u2, n2 != null ? n2 : true, E2);
    return y2.errorCategory = t2, y2.muxCode = D$2.NETWORK_TOKEN_MISSING, y2.data = e2, y2;
  }
  if (i2 === 412) {
    let b2 = x$4("This playback-id may belong to a live stream that is not currently active or an asset that is not ready.", o2), E2 = x$4("Specified playback ID: {playbackId}", o2).format({ playbackId: T2 }), y2 = new f$3(b2, u2, n2 != null ? n2 : true, E2);
    return y2.errorCategory = t2, y2.muxCode = D$2.NETWORK_NOT_READY, y2.streamType = r10.streamType === _$1.LIVE ? "live" : r10.streamType === _$1.ON_DEMAND ? "on-demand" : "unknown", y2.data = e2, y2;
  }
  if (i2 === 404) {
    let b2 = x$4("This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.", o2), E2 = x$4("Specified playback ID: {playbackId}", o2).format({ playbackId: T2 }), y2 = new f$3(b2, u2, n2 != null ? n2 : true, E2);
    return y2.errorCategory = t2, y2.muxCode = D$2.NETWORK_NOT_FOUND, y2.data = e2, y2;
  }
  if (i2 === 400) {
    let b2 = x$4("The URL or playback-id was invalid. You may have used an invalid value as a playback-id."), E2 = x$4("Specified playback ID: {playbackId}", o2).format({ playbackId: T2 }), y2 = new f$3(b2, u2, n2 != null ? n2 : true, E2);
    return y2.errorCategory = t2, y2.muxCode = D$2.NETWORK_INVALID_URL, y2.data = e2, y2;
  }
  let R2 = new f$3("", u2, n2 != null ? n2 : true);
  return R2.errorCategory = t2, R2.muxCode = D$2.NETWORK_UNKNOWN_ERROR, R2.data = e2, R2;
}, "H$1");
var Se$1 = g$4.DefaultConfig.capLevelController, j$1 = (_c = class extends Se$1 {
  constructor(t2) {
    super(t2);
  }
  get levels() {
    var t2;
    return (t2 = this.hls.levels) != null ? t2 : [];
  }
  getValidLevels(t2) {
    return this.levels.filter((r10, n2) => this.isLevelAllowed(r10) && n2 <= t2);
  }
  getMaxLevel(t2) {
    let r10 = super.getMaxLevel(t2), n2 = this.getValidLevels(t2);
    if (!n2[r10]) return r10;
    let o2 = Math.min(n2[r10].width, n2[r10].height), s2 = _c.minMaxResolution;
    return o2 >= s2 ? r10 : Se$1.getMaxLevelByMediaSize(n2, s2 * (16 / 9), s2);
  }
}, __name(_c, "j"), _c);
j$1.minMaxResolution = 720;
var ie$1 = j$1, we$1 = ie$1;
var J$1 = { FAIRPLAY: "fairplay", PLAYREADY: "playready", WIDEVINE: "widevine" }, gt$1 = /* @__PURE__ */ __name((e2) => {
  if (e2.includes("fps")) return J$1.FAIRPLAY;
  if (e2.includes("playready")) return J$1.PLAYREADY;
  if (e2.includes("widevine")) return J$1.WIDEVINE;
}, "gt$1"), Mt$1 = /* @__PURE__ */ __name((e2) => {
  let t2 = e2.split(`
`).find((r10, n2, o2) => n2 && o2[n2 - 1].startsWith("#EXT-X-STREAM-INF"));
  return fetch(t2).then((r10) => r10.status !== 200 ? Promise.reject(r10) : r10.text());
}, "Mt$1"), xt$1 = /* @__PURE__ */ __name((e2) => {
  let t2 = e2.split(`
`).filter((n2) => n2.startsWith("#EXT-X-SESSION-DATA"));
  if (!t2.length) return {};
  let r10 = {};
  for (let n2 of t2) {
    let o2 = bt$1(n2), s2 = o2["DATA-ID"];
    s2 && (r10[s2] = { ...o2 });
  }
  return { sessionData: r10 };
}, "xt$1"), Rt = /([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g;
function bt$1(e2) {
  let t2 = [...e2.matchAll(Rt)];
  return Object.fromEntries(t2.map(([, r10, n2]) => [r10, n2]));
}
__name(bt$1, "bt$1");
var Dt$1 = /* @__PURE__ */ __name((e2) => {
  var i2, l2, u2;
  let t2 = e2.split(`
`), n2 = (l2 = ((i2 = t2.find((c2) => c2.startsWith("#EXT-X-PLAYLIST-TYPE"))) != null ? i2 : "").split(":")[1]) == null ? void 0 : l2.trim(), o2 = Q$1(n2), s2 = Z(n2), a;
  if (o2 === _$1.LIVE) {
    let c2 = t2.find((p2) => p2.startsWith("#EXT-X-PART-INF"));
    if (!!c2) a = +c2.split(":")[1].split("=")[1] * 2;
    else {
      let p2 = t2.find((R2) => R2.startsWith("#EXT-X-TARGETDURATION")), T2 = (u2 = p2 == null ? void 0 : p2.split(":")) == null ? void 0 : u2[1];
      a = +(T2 != null ? T2 : 6) * 3;
    }
  }
  return { streamType: o2, targetLiveWindow: s2, liveEdgeStartOffset: a };
}, "Dt$1"), Ct$1 = /* @__PURE__ */ __name(async (e2, t2) => {
  if (t2 === I$2.MP4) return { streamType: _$1.ON_DEMAND, targetLiveWindow: Number.NaN, liveEdgeStartOffset: void 0, sessionData: void 0 };
  if (t2 === I$2.M3U8) {
    let r10 = await fetch(e2);
    if (!r10.ok) return Promise.reject(r10);
    let n2 = await r10.text(), o2 = await Mt$1(n2);
    return { ...xt$1(n2), ...Dt$1(o2) };
  }
  return console.error(`Media type ${t2} is an unrecognized or unsupported type for src ${e2}.`), { streamType: void 0, targetLiveWindow: void 0, liveEdgeStartOffset: void 0, sessionData: void 0 };
}, "Ct$1"), vt$1 = /* @__PURE__ */ __name(async (e2, t2, r10 = U$1({ src: e2 })) => {
  var l2, u2, c2, d2;
  let { streamType: n2, targetLiveWindow: o2, liveEdgeStartOffset: s2, sessionData: a } = await Ct$1(e2, r10), i2 = a == null ? void 0 : a["com.apple.hls.chapters"];
  (i2 != null && i2.URI || i2 != null && i2.VALUE.toLocaleLowerCase().startsWith("http")) && de$2((l2 = i2.URI) != null ? l2 : i2.VALUE, t2), ((u2 = P$3.get(t2)) != null ? u2 : {}).liveEdgeStartOffset = s2, ((c2 = P$3.get(t2)) != null ? c2 : {}).targetLiveWindow = o2, t2.dispatchEvent(new CustomEvent("targetlivewindowchange", { composed: true, bubbles: true })), ((d2 = P$3.get(t2)) != null ? d2 : {}).streamType = n2, t2.dispatchEvent(new CustomEvent("streamtypechange", { composed: true, bubbles: true }));
}, "vt$1"), de$2 = /* @__PURE__ */ __name(async (e2, t2) => {
  var r10, n2;
  try {
    let o2 = await fetch(e2);
    if (!o2.ok) throw new Error(`Failed to fetch Mux metadata: ${o2.status} ${o2.statusText}`);
    let s2 = await o2.json(), a = {};
    if (!((r10 = s2 == null ? void 0 : s2[0]) != null && r10.metadata)) return;
    for (let l2 of s2[0].metadata) l2.key && l2.value && (a[l2.key] = l2.value);
    ((n2 = P$3.get(t2)) != null ? n2 : {}).metadata = a;
    let i2 = new CustomEvent("muxmetadata");
    t2.dispatchEvent(i2);
  } catch (o2) {
    console.error(o2);
  }
}, "de$2"), Pt$1 = /* @__PURE__ */ __name((e2) => {
  var a;
  let t2 = e2.type, r10 = Q$1(t2), n2 = Z(t2), o2, s2 = !!((a = e2.partList) != null && a.length);
  return r10 === _$1.LIVE && (o2 = s2 ? e2.partTarget * 2 : e2.targetduration * 3), { streamType: r10, targetLiveWindow: n2, liveEdgeStartOffset: o2, lowLatency: s2 };
}, "Pt$1"), _t = /* @__PURE__ */ __name((e2, t2, r10) => {
  var i2, l2, u2, c2, d2, p2, T2, m2;
  let { streamType: n2, targetLiveWindow: o2, liveEdgeStartOffset: s2, lowLatency: a } = Pt$1(e2);
  if (n2 === _$1.LIVE) {
    a ? (r10.config.backBufferLength = (i2 = r10.userConfig.backBufferLength) != null ? i2 : 4, r10.config.maxFragLookUpTolerance = (l2 = r10.userConfig.maxFragLookUpTolerance) != null ? l2 : 1e-3, r10.config.abrBandWidthUpFactor = (u2 = r10.userConfig.abrBandWidthUpFactor) != null ? u2 : r10.config.abrBandWidthFactor) : r10.config.backBufferLength = (c2 = r10.userConfig.backBufferLength) != null ? c2 : 8;
    let R2 = Object.freeze({ get length() {
      return t2.seekable.length;
    }, start(M2) {
      return t2.seekable.start(M2);
    }, end(M2) {
      var h2;
      return M2 > this.length || M2 < 0 || Number.isFinite(t2.duration) ? t2.seekable.end(M2) : (h2 = r10.liveSyncPosition) != null ? h2 : t2.seekable.end(M2);
    } });
    ((d2 = P$3.get(t2)) != null ? d2 : {}).seekable = R2;
  }
  ((p2 = P$3.get(t2)) != null ? p2 : {}).liveEdgeStartOffset = s2, ((T2 = P$3.get(t2)) != null ? T2 : {}).targetLiveWindow = o2, t2.dispatchEvent(new CustomEvent("targetlivewindowchange", { composed: true, bubbles: true })), ((m2 = P$3.get(t2)) != null ? m2 : {}).streamType = n2, t2.dispatchEvent(new CustomEvent("streamtypechange", { composed: true, bubbles: true }));
}, "_t"), He, Ve, kt = (Ve = (He = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : He.userAgent) != null ? Ve : "", Ke, We, Ye, ht = (Ye = (We = (Ke = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : Ke.userAgentData) == null ? void 0 : We.platform) != null ? Ye : "", Fe, $e, Be, Lt$1 = (Be = ($e = (Fe = globalThis == null ? void 0 : globalThis.navigator) == null ? void 0 : Fe.userAgentData) == null ? void 0 : $e.brands) != null ? Be : [], Nt$1 = kt.toLowerCase().includes("android") || ["x11", "android"].some((e2) => ht.toLowerCase().includes(e2)), Oe = Lt$1.find((e2) => e2.brand === "Google Chrome"), It$1 = /* @__PURE__ */ __name((e2) => {
  var t2;
  return Oe && parseInt((t2 = Oe.version) != null ? t2 : "0") >= 141 && !!e2.canPlayType("application/vnd.apple.mpegurl");
}, "It$1"), P$3 = /* @__PURE__ */ new WeakMap(), A = "mux.com", je, Je$1, Ge = (Je$1 = (je = g$4).isSupported) == null ? void 0 : Je$1.call(je), At$1 = /* @__PURE__ */ __name((e2) => Nt$1 || It$1(e2), "At$1"), Gr = /* @__PURE__ */ __name(() => Ed.utils.now(), "Gr"), St = Ed.utils.generateUUID, qr = /* @__PURE__ */ __name(({ playbackId: e2, customDomain: t2 = A, maxResolution: r10, minResolution: n2, renditionOrder: o2, programStartTime: s2, programEndTime: a, assetStartTime: i2, assetEndTime: l2, playbackToken: u2, tokens: { playback: c2 = u2 } = {}, extraSourceParams: d2 = {} } = {}) => {
  if (!e2) return;
  let [p2, T2 = ""] = F$1(e2), m2 = new URL(`https://stream.${t2}/${p2}.m3u8${T2}`);
  return c2 || m2.searchParams.has("token") ? (m2.searchParams.forEach((R2, M2) => {
    M2 != "token" && m2.searchParams.delete(M2);
  }), c2 && m2.searchParams.set("token", c2)) : (r10 && m2.searchParams.set("max_resolution", r10), n2 && (m2.searchParams.set("min_resolution", n2), r10 && +r10.slice(0, -1) < +n2.slice(0, -1) && console.error("minResolution must be <= maxResolution", "minResolution", n2, "maxResolution", r10)), o2 && m2.searchParams.set("rendition_order", o2), s2 && m2.searchParams.set("program_start_time", `${s2}`), a && m2.searchParams.set("program_end_time", `${a}`), i2 && m2.searchParams.set("asset_start_time", `${i2}`), l2 && m2.searchParams.set("asset_end_time", `${l2}`), Object.entries(d2).forEach(([R2, M2]) => {
    M2 != null && m2.searchParams.set(R2, M2);
  })), m2.toString();
}, "qr"), q$1 = /* @__PURE__ */ __name((e2) => {
  if (!e2) return;
  let [t2] = e2.split("?");
  return t2 || void 0;
}, "q$1"), qe = /* @__PURE__ */ __name((e2) => {
  if (!e2 || !e2.startsWith("https://stream.")) return;
  let [t2] = new URL(e2).pathname.slice(1).split(/\.m3u8|\//);
  return t2 || void 0;
}, "qe"), wt$1 = /* @__PURE__ */ __name((e2) => {
  var t2, r10, n2;
  return (t2 = e2 == null ? void 0 : e2.metadata) != null && t2.video_id ? e2.metadata.video_id : tt$1(e2) && (n2 = (r10 = q$1(e2.playbackId)) != null ? r10 : qe(e2.src)) != null ? n2 : e2.src;
}, "wt$1"), Ot$1 = /* @__PURE__ */ __name((e2) => {
  var t2;
  return (t2 = P$3.get(e2)) == null ? void 0 : t2.error;
}, "Ot$1"), Xr = /* @__PURE__ */ __name((e2) => {
  var t2;
  return (t2 = P$3.get(e2)) == null ? void 0 : t2.metadata;
}, "Xr"), Ue = /* @__PURE__ */ __name((e2) => {
  var t2, r10;
  return (r10 = (t2 = P$3.get(e2)) == null ? void 0 : t2.streamType) != null ? r10 : _$1.UNKNOWN;
}, "Ue"), zr = /* @__PURE__ */ __name((e2) => {
  var t2, r10;
  return (r10 = (t2 = P$3.get(e2)) == null ? void 0 : t2.targetLiveWindow) != null ? r10 : Number.NaN;
}, "zr"), Xe = /* @__PURE__ */ __name((e2) => {
  var t2, r10;
  return (r10 = (t2 = P$3.get(e2)) == null ? void 0 : t2.seekable) != null ? r10 : e2.seekable;
}, "Xe"), Qr = /* @__PURE__ */ __name((e2) => {
  var n2;
  let t2 = (n2 = P$3.get(e2)) == null ? void 0 : n2.liveEdgeStartOffset;
  if (typeof t2 != "number") return Number.NaN;
  let r10 = Xe(e2);
  return r10.length ? r10.end(r10.length - 1) - t2 : Number.NaN;
}, "Qr"), le = 0.034, Ut$1 = /* @__PURE__ */ __name((e2, t2, r10 = le) => Math.abs(e2 - t2) <= r10, "Ut$1"), ze$1 = /* @__PURE__ */ __name((e2, t2, r10 = le) => e2 > t2 || Ut$1(e2, t2, r10), "ze$1"), Ht$1 = /* @__PURE__ */ __name((e2, t2 = le) => e2.paused && ze$1(e2.currentTime, e2.duration, t2), "Ht$1"), Qe = /* @__PURE__ */ __name((e2, t2) => {
  var u2, c2, d2;
  if (!t2 || !e2.buffered.length) return;
  if (e2.readyState > 2) return false;
  let r10 = t2.currentLevel >= 0 ? (c2 = (u2 = t2.levels) == null ? void 0 : u2[t2.currentLevel]) == null ? void 0 : c2.details : (d2 = t2.levels.find((p2) => !!p2.details)) == null ? void 0 : d2.details;
  if (!r10 || r10.live) return;
  let { fragments: n2 } = r10;
  if (!(n2 != null && n2.length)) return;
  if (e2.currentTime < e2.duration - (r10.targetduration + 0.5)) return false;
  let o2 = n2[n2.length - 1];
  if (e2.currentTime <= o2.start) return false;
  let s2 = o2.start + o2.duration / 2, a = e2.buffered.start(e2.buffered.length - 1), i2 = e2.buffered.end(e2.buffered.length - 1);
  return s2 > a && s2 < i2;
}, "Qe"), Vt$1 = /* @__PURE__ */ __name((e2, t2) => e2.ended || e2.loop ? e2.ended : t2 && Qe(e2, t2) ? true : Ht$1(e2), "Vt$1"), Zr = /* @__PURE__ */ __name((e2, t2, r10) => {
  Kt$1(t2, r10, e2);
  let { metadata: n2 = {} } = e2, { view_session_id: o2 = St() } = n2, s2 = wt$1(e2);
  n2.view_session_id = o2, n2.video_id = s2, e2.metadata = n2;
  let a = /* @__PURE__ */ __name((c2) => {
    var d2;
    (d2 = t2.mux) == null || d2.emit("hb", { view_drm_type: c2 });
  }, "a");
  e2.drmTypeCb = a, P$3.set(t2, { retryCount: 0 });
  let i2 = Wt$1(e2, t2), l2 = be(e2, t2, i2);
  e2 != null && e2.muxDataKeepSession && (t2 != null && t2.mux) && !t2.mux.deleted ? i2 && t2.mux.addHLSJS({ hlsjs: i2, Hls: i2 ? g$4 : void 0 }) : Jt$1(e2, t2, i2), Gt(e2, t2, i2), he$1(t2), Ae$1(t2);
  let u2 = Re$1(e2, t2, i2);
  return { engine: i2, setAutoplay: u2, setPreload: l2 };
}, "Zr"), Kt$1 = /* @__PURE__ */ __name((e2, t2, r10) => {
  let n2 = t2 == null ? void 0 : t2.engine;
  e2 != null && e2.mux && !e2.mux.deleted && (r10 != null && r10.muxDataKeepSession ? n2 && e2.mux.removeHLSJS() : (e2.mux.destroy(), delete e2.mux)), n2 && (n2.detachMedia(), n2.destroy()), e2 && (e2.hasAttribute("src") && (e2.removeAttribute("src"), e2.load()), e2.removeEventListener("error", nt$1), e2.removeEventListener("error", ce), e2.removeEventListener("durationchange", rt$1), P$3.delete(e2), e2.dispatchEvent(new Event("teardown")));
}, "Kt$1");
function Ze(e2, t2) {
  var u2;
  let r10 = U$1(e2);
  if (!(r10 === I$2.M3U8)) return true;
  let o2 = !r10 || ((u2 = t2.canPlayType(r10)) != null ? u2 : true), { preferPlayback: s2 } = e2, a = s2 === X$1.MSE, i2 = s2 === X$1.NATIVE, l2 = Ge && (a || At$1(t2));
  return o2 && (i2 || !l2);
}
__name(Ze, "Ze");
var Wt$1 = /* @__PURE__ */ __name((e2, t2) => {
  let { debug: r10, streamType: n2, startTime: o2 = -1, metadata: s2, preferCmcd: a, _hlsConfig: i2 = {} } = e2, u2 = U$1(e2) === I$2.M3U8, c2 = Ze(e2, t2);
  if (u2 && !c2 && Ge) {
    let d2 = { backBufferLength: 30, renderTextTracksNatively: false, liveDurationInfinity: true, capLevelToPlayerSize: true, capLevelOnFPSDrop: true }, p2 = Yt$1(n2), T2 = Ft(e2), m2 = [S.QUERY, S.HEADER].includes(a) ? { useHeaders: a === S.HEADER, sessionId: s2 == null ? void 0 : s2.view_session_id, contentId: s2 == null ? void 0 : s2.video_id } : void 0, R2 = i2.capLevelToPlayerSize == null ? { capLevelController: we$1 } : {}, M2 = new g$4({ debug: r10, startPosition: o2, cmcd: m2, xhrSetup: /* @__PURE__ */ __name((h2, b2) => {
      var k2, pe2;
      if (a && a !== S.QUERY) return;
      let E2 = new URL(b2);
      if (!E2.searchParams.has("CMCD")) return;
      let y2 = ((pe2 = (k2 = E2.searchParams.get("CMCD")) == null ? void 0 : k2.split(",")) != null ? pe2 : []).filter((fe2) => fe2.startsWith("sid") || fe2.startsWith("cid")).join(",");
      E2.searchParams.set("CMCD", y2), h2.open("GET", E2);
    }, "xhrSetup"), ...R2, ...d2, ...p2, ...T2, ...i2 });
    return M2.on(g$4.Events.MANIFEST_PARSED, async function(h2, b2) {
      var y2, k2;
      let E2 = (y2 = b2.sessionData) == null ? void 0 : y2["com.apple.hls.chapters"];
      (E2 != null && E2.URI || E2 != null && E2.VALUE.toLocaleLowerCase().startsWith("http")) && de$2((k2 = E2 == null ? void 0 : E2.URI) != null ? k2 : E2 == null ? void 0 : E2.VALUE, t2);
    }), M2;
  }
}, "Wt$1"), Yt$1 = /* @__PURE__ */ __name((e2) => e2 === _$1.LIVE ? { backBufferLength: 8 } : {}, "Yt$1"), Ft = /* @__PURE__ */ __name((e2) => {
  let { tokens: { drm: t2 } = {}, playbackId: r10, drmTypeCb: n2 } = e2, o2 = q$1(r10);
  return !t2 || !o2 ? {} : { emeEnabled: true, drmSystems: { "com.apple.fps": { licenseUrl: G$1(e2, "fairplay"), serverCertificateUrl: et$1(e2, "fairplay") }, "com.widevine.alpha": { licenseUrl: G$1(e2, "widevine") }, "com.microsoft.playready": { licenseUrl: G$1(e2, "playready") } }, requestMediaKeySystemAccessFunc: /* @__PURE__ */ __name((s2, a) => (s2 === "com.widevine.alpha" && (a = [...a.map((i2) => {
    var u2;
    let l2 = (u2 = i2.videoCapabilities) == null ? void 0 : u2.map((c2) => ({ ...c2, robustness: "HW_SECURE_ALL" }));
    return { ...i2, videoCapabilities: l2 };
  }), ...a]), navigator.requestMediaKeySystemAccess(s2, a).then((i2) => {
    let l2 = gt$1(s2);
    return n2 == null || n2(l2), i2;
  })), "requestMediaKeySystemAccessFunc") };
}, "Ft"), $t$1 = /* @__PURE__ */ __name(async (e2) => {
  let t2 = await fetch(e2);
  return t2.status !== 200 ? Promise.reject(t2) : await t2.arrayBuffer();
}, "$t$1"), Bt$1 = /* @__PURE__ */ __name(async (e2, t2) => {
  let r10 = await fetch(t2, { method: "POST", headers: { "Content-type": "application/octet-stream" }, body: e2 });
  if (r10.status !== 200) return Promise.reject(r10);
  let n2 = await r10.arrayBuffer();
  return new Uint8Array(n2);
}, "Bt$1"), jt = /* @__PURE__ */ __name((e2, t2) => {
  v$2(t2, "encrypted", async (n2) => {
    try {
      let o2 = n2.initDataType;
      if (o2 !== "skd") {
        console.error(`Received unexpected initialization data type "${o2}"`);
        return;
      }
      if (!t2.mediaKeys) {
        let u2 = await navigator.requestMediaKeySystemAccess("com.apple.fps", [{ initDataTypes: [o2], videoCapabilities: [{ contentType: "application/vnd.apple.mpegurl", robustness: "" }], distinctiveIdentifier: "not-allowed", persistentState: "not-allowed", sessionTypes: ["temporary"] }]).then((d2) => {
          var p2;
          return (p2 = e2.drmTypeCb) == null || p2.call(e2, J$1.FAIRPLAY), d2;
        }).catch(() => {
          let d2 = x$4("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."), p2 = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, true);
          p2.errorCategory = C$2.DRM, p2.muxCode = D$2.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM, N$2(t2, p2);
        });
        if (!u2) return;
        let c2 = await u2.createMediaKeys();
        try {
          let d2 = await $t$1(et$1(e2, "fairplay")).catch((p2) => {
            if (p2 instanceof Response) {
              let T2 = H$1(p2, C$2.DRM, e2);
              return console.error("mediaError", T2 == null ? void 0 : T2.message, T2 == null ? void 0 : T2.context), T2 ? Promise.reject(T2) : Promise.reject(new Error("Unexpected error in app cert request"));
            }
            return Promise.reject(p2);
          });
          await c2.setServerCertificate(d2).catch(() => {
            let p2 = x$4("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."), T2 = new f$3(p2, f$3.MEDIA_ERR_ENCRYPTED, true);
            return T2.errorCategory = C$2.DRM, T2.muxCode = D$2.ENCRYPTED_UPDATE_SERVER_CERT_FAILED, Promise.reject(T2);
          });
        } catch (d2) {
          N$2(t2, d2);
          return;
        }
        await t2.setMediaKeys(c2);
      }
      let s2 = n2.initData;
      if (s2 == null) {
        console.error(`Could not start encrypted playback due to missing initData in ${n2.type} event`);
        return;
      }
      let a = t2.mediaKeys.createSession();
      a.addEventListener("keystatuseschange", () => {
        a.keyStatuses.forEach((u2) => {
          let c2;
          if (u2 === "internal-error") {
            let d2 = x$4("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");
            c2 = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, true), c2.errorCategory = C$2.DRM, c2.muxCode = D$2.ENCRYPTED_CDM_ERROR;
          } else if (u2 === "output-restricted" || u2 === "output-downscaled") {
            let d2 = x$4("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");
            c2 = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, false), c2.errorCategory = C$2.DRM, c2.muxCode = D$2.ENCRYPTED_OUTPUT_RESTRICTED;
          }
          c2 && N$2(t2, c2);
        });
      });
      let i2 = await Promise.all([a.generateRequest(o2, s2).catch(() => {
        let u2 = x$4("Failed to generate a DRM license request. This may be an issue with the player or your protected content."), c2 = new f$3(u2, f$3.MEDIA_ERR_ENCRYPTED, true);
        c2.errorCategory = C$2.DRM, c2.muxCode = D$2.ENCRYPTED_GENERATE_REQUEST_FAILED, N$2(t2, c2);
      }), new Promise((u2) => {
        a.addEventListener("message", (c2) => {
          u2(c2.message);
        }, { once: true });
      })]).then(([, u2]) => u2), l2 = await Bt$1(i2, G$1(e2, "fairplay")).catch((u2) => {
        if (u2 instanceof Response) {
          let c2 = H$1(u2, C$2.DRM, e2);
          return console.error("mediaError", c2 == null ? void 0 : c2.message, c2 == null ? void 0 : c2.context), c2 ? Promise.reject(c2) : Promise.reject(new Error("Unexpected error in license key request"));
        }
        return Promise.reject(u2);
      });
      await a.update(l2).catch(() => {
        let u2 = x$4("Failed to update DRM license. This may be an issue with the player or your protected content."), c2 = new f$3(u2, f$3.MEDIA_ERR_ENCRYPTED, true);
        return c2.errorCategory = C$2.DRM, c2.muxCode = D$2.ENCRYPTED_UPDATE_LICENSE_FAILED, Promise.reject(c2);
      });
    } catch (o2) {
      N$2(t2, o2);
      return;
    }
  });
}, "jt"), G$1 = /* @__PURE__ */ __name(({ playbackId: e2, tokens: { drm: t2 } = {}, customDomain: r10 = A }, n2) => {
  let o2 = q$1(e2);
  return `https://license.${r10.toLocaleLowerCase().endsWith(A) ? r10 : A}/license/${n2}/${o2}?token=${t2}`;
}, "G$1"), et$1 = /* @__PURE__ */ __name(({ playbackId: e2, tokens: { drm: t2 } = {}, customDomain: r10 = A }, n2) => {
  let o2 = q$1(e2);
  return `https://license.${r10.toLocaleLowerCase().endsWith(A) ? r10 : A}/appcert/${n2}/${o2}?token=${t2}`;
}, "et$1"), tt$1 = /* @__PURE__ */ __name(({ playbackId: e2, src: t2, customDomain: r10 }) => {
  if (e2) return true;
  if (typeof t2 != "string") return false;
  let n2 = window == null ? void 0 : window.location.href, o2 = new URL(t2, n2).hostname.toLocaleLowerCase();
  return o2.includes(A) || !!r10 && o2.includes(r10.toLocaleLowerCase());
}, "tt$1"), Jt$1 = /* @__PURE__ */ __name((e2, t2, r10) => {
  var l2;
  let { envKey: n2, disableTracking: o2, muxDataSDK: s2 = Ed, muxDataSDKOptions: a = {} } = e2, i2 = tt$1(e2);
  if (!o2 && (n2 || i2)) {
    let { playerInitTime: u2, playerSoftwareName: c2, playerSoftwareVersion: d2, beaconCollectionDomain: p2, debug: T2, disableCookies: m2 } = e2, R2 = { ...e2.metadata, video_title: ((l2 = e2 == null ? void 0 : e2.metadata) == null ? void 0 : l2.video_title) || void 0 }, M2 = /* @__PURE__ */ __name((h2) => typeof h2.player_error_code == "string" ? false : typeof e2.errorTranslator == "function" ? e2.errorTranslator(h2) : h2, "M");
    s2.monitor(t2, { debug: T2, beaconCollectionDomain: p2, hlsjs: r10, Hls: r10 ? g$4 : void 0, automaticErrorTracking: false, errorTranslator: M2, disableCookies: m2, ...a, data: { ...n2 ? { env_key: n2 } : {}, player_software_name: c2, player_software: c2, player_software_version: d2, player_init_time: u2, ...R2 } });
  }
}, "Jt$1"), Gt = /* @__PURE__ */ __name((e2, t2, r10) => {
  var c2, d2;
  let n2 = Ze(e2, t2), { src: o2, customDomain: s2 = A } = e2, a = /* @__PURE__ */ __name(() => {
    t2.ended || e2.disablePseudoEnded || !Vt$1(t2, r10) || (Qe(t2, r10) ? t2.currentTime = t2.buffered.end(t2.buffered.length - 1) : t2.dispatchEvent(new Event("ended")));
  }, "a"), i2, l2, u2 = /* @__PURE__ */ __name(() => {
    let p2 = Xe(t2), T2, m2;
    p2.length > 0 && (T2 = p2.start(0), m2 = p2.end(0)), (l2 !== m2 || i2 !== T2) && t2.dispatchEvent(new CustomEvent("seekablechange", { composed: true })), i2 = T2, l2 = m2;
  }, "u");
  if (v$2(t2, "durationchange", u2), t2 && n2) {
    let p2 = U$1(e2);
    if (typeof o2 == "string") {
      if (o2.endsWith(".mp4") && o2.includes(s2)) {
        let R2 = qe(o2), M2 = new URL(`https://stream.${s2}/${R2}/metadata.json`);
        de$2(M2.toString(), t2);
      }
      let T2 = /* @__PURE__ */ __name(() => {
        if (Ue(t2) !== _$1.LIVE || Number.isFinite(t2.duration)) return;
        let R2 = setInterval(u2, 1e3);
        t2.addEventListener("teardown", () => {
          clearInterval(R2);
        }, { once: true }), v$2(t2, "durationchange", () => {
          Number.isFinite(t2.duration) && clearInterval(R2);
        });
      }, "T"), m2 = /* @__PURE__ */ __name(async () => vt$1(o2, t2, p2).then(T2).catch((R2) => {
        if (R2 instanceof Response) {
          let M2 = H$1(R2, C$2.VIDEO, e2);
          if (M2) {
            N$2(t2, M2);
            return;
          }
        }
      }), "m");
      if (t2.preload === "none") {
        let R2 = /* @__PURE__ */ __name(() => {
          m2(), t2.removeEventListener("loadedmetadata", M2);
        }, "R"), M2 = /* @__PURE__ */ __name(() => {
          m2(), t2.removeEventListener("play", R2);
        }, "M");
        v$2(t2, "play", R2, { once: true }), v$2(t2, "loadedmetadata", M2, { once: true });
      } else m2();
      (c2 = e2.tokens) != null && c2.drm ? jt(e2, t2) : v$2(t2, "encrypted", () => {
        let R2 = x$4("Attempting to play DRM-protected content without providing a DRM token."), M2 = new f$3(R2, f$3.MEDIA_ERR_ENCRYPTED, true);
        M2.errorCategory = C$2.DRM, M2.muxCode = D$2.ENCRYPTED_MISSING_TOKEN, N$2(t2, M2);
      }, { once: true }), t2.setAttribute("src", o2), e2.startTime && (((d2 = P$3.get(t2)) != null ? d2 : {}).startTime = e2.startTime, t2.addEventListener("durationchange", rt$1, { once: true }));
    } else t2.removeAttribute("src");
    t2.addEventListener("error", nt$1), t2.addEventListener("error", ce), t2.addEventListener("emptied", () => {
      t2.querySelectorAll("track[data-removeondestroy]").forEach((m2) => {
        m2.remove();
      });
    }, { once: true }), v$2(t2, "pause", a), v$2(t2, "seeked", a), v$2(t2, "play", () => {
      t2.ended || ze$1(t2.currentTime, t2.duration) && (t2.currentTime = t2.seekable.length ? t2.seekable.start(0) : 0);
    });
  } else r10 && o2 ? (r10.once(g$4.Events.LEVEL_LOADED, (p2, T2) => {
    _t(T2.details, t2, r10), u2(), Ue(t2) === _$1.LIVE && !Number.isFinite(t2.duration) && (r10.on(g$4.Events.LEVEL_UPDATED, u2), v$2(t2, "durationchange", () => {
      Number.isFinite(t2.duration) && r10.off(g$4.Events.LEVELS_UPDATED, u2);
    }));
  }), r10.on(g$4.Events.ERROR, (p2, T2) => {
    var R2, M2;
    let m2 = qt$1(T2, e2);
    if (m2.muxCode === D$2.NETWORK_NOT_READY) {
      let b2 = (R2 = P$3.get(t2)) != null ? R2 : {}, E2 = (M2 = b2.retryCount) != null ? M2 : 0;
      if (E2 < 6) {
        let y2 = E2 === 0 ? 5e3 : 6e4, k2 = new f$3(`Retrying in ${y2 / 1e3} seconds...`, m2.code, m2.fatal);
        Object.assign(k2, m2), N$2(t2, k2), setTimeout(() => {
          b2.retryCount = E2 + 1, T2.details === "manifestLoadError" && T2.url && r10.loadSource(T2.url);
        }, y2);
        return;
      } else {
        b2.retryCount = 0;
        let y2 = new f$3('Try again later or <a href="#" onclick="window.location.reload(); return false;" style="color: #4a90e2;">click here to retry</a>', m2.code, m2.fatal);
        Object.assign(y2, m2), N$2(t2, y2);
        return;
      }
    }
    N$2(t2, m2);
  }), r10.on(g$4.Events.MANIFEST_LOADED, () => {
    let p2 = P$3.get(t2);
    p2 && p2.error && (p2.error = null, p2.retryCount = 0, t2.dispatchEvent(new Event("emptied")), t2.dispatchEvent(new Event("loadstart")));
  }), t2.addEventListener("error", ce), v$2(t2, "waiting", a), De(e2, r10), Ce$1(t2, r10), r10.attachMedia(t2)) : console.error("It looks like the video you're trying to play will not work on this system! If possible, try upgrading to the newest versions of your browser or software.");
}, "Gt");
function rt$1(e2) {
  var n2;
  let t2 = e2.target, r10 = (n2 = P$3.get(t2)) == null ? void 0 : n2.startTime;
  if (r10 && Te$1(t2.seekable, t2.duration, r10)) {
    let o2 = t2.preload === "auto";
    o2 && (t2.preload = "none"), t2.currentTime = r10, o2 && (t2.preload = "auto");
  }
}
__name(rt$1, "rt$1");
async function nt$1(e2) {
  if (!e2.isTrusted) return;
  e2.stopImmediatePropagation();
  let t2 = e2.target;
  if (!(t2 != null && t2.error)) return;
  let { message: r10, code: n2 } = t2.error, o2 = new f$3(r10, n2);
  if (t2.src && n2 === f$3.MEDIA_ERR_SRC_NOT_SUPPORTED && t2.readyState === HTMLMediaElement.HAVE_NOTHING) {
    setTimeout(() => {
      var a;
      let s2 = (a = Ot$1(t2)) != null ? a : t2.error;
      (s2 == null ? void 0 : s2.code) === f$3.MEDIA_ERR_SRC_NOT_SUPPORTED && N$2(t2, o2);
    }, 500);
    return;
  }
  if (t2.src && (n2 !== f$3.MEDIA_ERR_DECODE || n2 !== void 0)) try {
    let { status: s2 } = await fetch(t2.src);
    o2.data = { response: { code: s2 } };
  } catch {
  }
  N$2(t2, o2);
}
__name(nt$1, "nt$1");
function N$2(e2, t2) {
  var r10;
  t2.fatal && (((r10 = P$3.get(e2)) != null ? r10 : {}).error = t2, e2.dispatchEvent(new CustomEvent("error", { detail: t2 })));
}
__name(N$2, "N$2");
function ce(e2) {
  var n2, o2;
  if (!(e2 instanceof CustomEvent) || !(e2.detail instanceof f$3)) return;
  let t2 = e2.target, r10 = e2.detail;
  !r10 || !r10.fatal || (((n2 = P$3.get(t2)) != null ? n2 : {}).error = r10, (o2 = t2.mux) == null || o2.emit("error", { player_error_code: r10.code, player_error_message: r10.message, player_error_context: r10.context }));
}
__name(ce, "ce");
var qt$1 = /* @__PURE__ */ __name((e2, t2) => {
  var l2, u2, c2;
  !e2.fatal ? t2.debug && console.warn("getErrorFromHlsErrorData() (non-fatal)", e2) : console.error("getErrorFromHlsErrorData()", e2);
  let n2 = { [g$4.ErrorTypes.NETWORK_ERROR]: f$3.MEDIA_ERR_NETWORK, [g$4.ErrorTypes.MEDIA_ERROR]: f$3.MEDIA_ERR_DECODE, [g$4.ErrorTypes.KEY_SYSTEM_ERROR]: f$3.MEDIA_ERR_ENCRYPTED }, o2 = /* @__PURE__ */ __name((d2) => [g$4.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED, g$4.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED].includes(d2.details) ? f$3.MEDIA_ERR_NETWORK : n2[d2.type], "o"), s2 = /* @__PURE__ */ __name((d2) => {
    if (d2.type === g$4.ErrorTypes.KEY_SYSTEM_ERROR) return C$2.DRM;
    if (d2.type === g$4.ErrorTypes.NETWORK_ERROR) return C$2.VIDEO;
  }, "s"), a, i2 = o2(e2);
  if (i2 === f$3.MEDIA_ERR_NETWORK && e2.response) {
    let d2 = (l2 = s2(e2)) != null ? l2 : C$2.VIDEO;
    a = (u2 = H$1(e2.response, d2, t2, e2.fatal)) != null ? u2 : new f$3("", i2, e2.fatal);
  } else if (i2 === f$3.MEDIA_ERR_ENCRYPTED) if (e2.details === g$4.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE) {
    let d2 = x$4("Attempting to play DRM-protected content without providing a DRM token.");
    a = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, e2.fatal), a.errorCategory = C$2.DRM, a.muxCode = D$2.ENCRYPTED_MISSING_TOKEN;
  } else if (e2.details === g$4.ErrorDetails.KEY_SYSTEM_NO_ACCESS) {
    let d2 = x$4("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.");
    a = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, e2.fatal), a.errorCategory = C$2.DRM, a.muxCode = D$2.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM;
  } else if (e2.details === g$4.ErrorDetails.KEY_SYSTEM_NO_SESSION) {
    let d2 = x$4("Failed to generate a DRM license request. This may be an issue with the player or your protected content.");
    a = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, true), a.errorCategory = C$2.DRM, a.muxCode = D$2.ENCRYPTED_GENERATE_REQUEST_FAILED;
  } else if (e2.details === g$4.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED) {
    let d2 = x$4("Failed to update DRM license. This may be an issue with the player or your protected content.");
    a = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, e2.fatal), a.errorCategory = C$2.DRM, a.muxCode = D$2.ENCRYPTED_UPDATE_LICENSE_FAILED;
  } else if (e2.details === g$4.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED) {
    let d2 = x$4("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.");
    a = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, e2.fatal), a.errorCategory = C$2.DRM, a.muxCode = D$2.ENCRYPTED_UPDATE_SERVER_CERT_FAILED;
  } else if (e2.details === g$4.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR) {
    let d2 = x$4("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");
    a = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, e2.fatal), a.errorCategory = C$2.DRM, a.muxCode = D$2.ENCRYPTED_CDM_ERROR;
  } else if (e2.details === g$4.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED) {
    let d2 = x$4("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");
    a = new f$3(d2, f$3.MEDIA_ERR_ENCRYPTED, false), a.errorCategory = C$2.DRM, a.muxCode = D$2.ENCRYPTED_OUTPUT_RESTRICTED;
  } else a = new f$3(e2.error.message, f$3.MEDIA_ERR_ENCRYPTED, e2.fatal), a.errorCategory = C$2.DRM, a.muxCode = D$2.ENCRYPTED_ERROR;
  else a = new f$3("", i2, e2.fatal);
  return a.context || (a.context = `${e2.url ? `url: ${e2.url}
` : ""}${e2.response && (e2.response.code || e2.response.text) ? `response: ${e2.response.code}, ${e2.response.text}
` : ""}${e2.reason ? `failure reason: ${e2.reason}
` : ""}${e2.level ? `level: ${e2.level}
` : ""}${e2.parent ? `parent stream controller: ${e2.parent}
` : ""}${e2.buffer ? `buffer length: ${e2.buffer}
` : ""}${e2.error ? `error: ${e2.error}
` : ""}${e2.event ? `event: ${e2.event}
` : ""}${e2.err ? `error message: ${(c2 = e2.err) == null ? void 0 : c2.message}
` : ""}`), a.data = e2, a;
}, "qt$1");
var C$1 = /* @__PURE__ */ __name((s2) => {
  throw TypeError(s2);
}, "C$1");
var N$1 = /* @__PURE__ */ __name((s2, a, t2) => a.has(s2) || C$1("Cannot " + t2), "N$1");
var n$1 = /* @__PURE__ */ __name((s2, a, t2) => (N$1(s2, a, "read from private field"), t2 ? t2.call(s2) : a.get(s2)), "n$1"), d$1 = /* @__PURE__ */ __name((s2, a, t2) => a.has(s2) ? C$1("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(s2) : a.set(s2, t2), "d$1"), o$2 = /* @__PURE__ */ __name((s2, a, t2, i2) => (N$1(s2, a, "write to private field"), a.set(s2, t2), t2), "o$2"), b$2 = /* @__PURE__ */ __name((s2, a, t2) => (N$1(s2, a, "access private method"), t2), "b$2");
var B$1 = /* @__PURE__ */ __name(() => {
  try {
    return "0.28.2";
  } catch {
  }
  return "UNKNOWN";
}, "B$1"), Y = B$1(), P$2 = /* @__PURE__ */ __name(() => Y, "P$2");
var D$1 = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`;
var e = { BEACON_COLLECTION_DOMAIN: "beacon-collection-domain", CUSTOM_DOMAIN: "custom-domain", DEBUG: "debug", DISABLE_TRACKING: "disable-tracking", DISABLE_COOKIES: "disable-cookies", DISABLE_PSEUDO_ENDED: "disable-pseudo-ended", DRM_TOKEN: "drm-token", PLAYBACK_TOKEN: "playback-token", ENV_KEY: "env-key", MAX_RESOLUTION: "max-resolution", MIN_RESOLUTION: "min-resolution", RENDITION_ORDER: "rendition-order", PROGRAM_START_TIME: "program-start-time", PROGRAM_END_TIME: "program-end-time", ASSET_START_TIME: "asset-start-time", ASSET_END_TIME: "asset-end-time", METADATA_URL: "metadata-url", PLAYBACK_ID: "playback-id", PLAYER_SOFTWARE_NAME: "player-software-name", PLAYER_SOFTWARE_VERSION: "player-software-version", PLAYER_INIT_TIME: "player-init-time", PREFER_CMCD: "prefer-cmcd", PREFER_PLAYBACK: "prefer-playback", START_TIME: "start-time", STREAM_TYPE: "stream-type", TARGET_LIVE_WINDOW: "target-live-window", LIVE_EDGE_OFFSET: "live-edge-offset", TYPE: "type", LOGO: "logo" }, at$1 = Object.values(e), v$1 = P$2(), x$3 = "mux-video", E$3, g$3, p$2, m$2, _, O, I$1, R, M$2, c$1, f$2, T$1, K$1 = (_d = class extends CustomVideoElement {
  constructor() {
    super();
    d$1(this, f$2);
    d$1(this, E$3);
    d$1(this, g$3);
    d$1(this, p$2);
    d$1(this, m$2, {});
    d$1(this, _, {});
    d$1(this, O);
    d$1(this, I$1);
    d$1(this, R);
    d$1(this, M$2);
    d$1(this, c$1, "");
    o$2(this, p$2, Gr()), this.nativeEl.addEventListener("muxmetadata", (t2) => {
      var l2;
      let i2 = Xr(this.nativeEl), r10 = (l2 = this.metadata) != null ? l2 : {};
      this.metadata = { ...i2, ...r10 }, (i2 == null ? void 0 : i2["com.mux.video.branding"]) === "mux-free-plan" && (o$2(this, c$1, "default"), this.updateLogo());
    });
  }
  static get NAME() {
    return x$3;
  }
  static get VERSION() {
    return v$1;
  }
  static get observedAttributes() {
    var t2;
    return [...at$1, ...(t2 = CustomVideoElement.observedAttributes) != null ? t2 : []];
  }
  static getLogoHTML(t2) {
    return !t2 || t2 === "false" ? "" : t2 === "default" ? D$1 : `<img part="logo" src="${t2}" />`;
  }
  static getTemplateHTML(t2 = {}) {
    var i2;
    return `
      ${CustomVideoElement.getTemplateHTML(t2)}
      <style>
        :host {
          position: relative;
        }
        slot[name="logo"] {
          display: flex;
          justify-content: end;
          position: absolute;
          top: 1rem;
          right: 1rem;
          opacity: 0;
          transition: opacity 0.25s ease-in-out;
          z-index: 1;
        }
        slot[name="logo"]:has([part="logo"]) {
          opacity: 1;
        }
        slot[name="logo"] [part="logo"] {
          width: 5rem;
          pointer-events: none;
          user-select: none;
        }
      </style>
      <slot name="logo">
        ${this.getLogoHTML((i2 = t2[e.LOGO]) != null ? i2 : "")}
      </slot>
    `;
  }
  get preferCmcd() {
    var t2;
    return (t2 = this.getAttribute(e.PREFER_CMCD)) != null ? t2 : void 0;
  }
  set preferCmcd(t2) {
    t2 !== this.preferCmcd && (t2 ? Zt$1.includes(t2) ? this.setAttribute(e.PREFER_CMCD, t2) : console.warn(`Invalid value for preferCmcd. Must be one of ${Zt$1.join()}`) : this.removeAttribute(e.PREFER_CMCD));
  }
  get playerInitTime() {
    return this.hasAttribute(e.PLAYER_INIT_TIME) ? +this.getAttribute(e.PLAYER_INIT_TIME) : n$1(this, p$2);
  }
  set playerInitTime(t2) {
    t2 != this.playerInitTime && (t2 == null ? this.removeAttribute(e.PLAYER_INIT_TIME) : this.setAttribute(e.PLAYER_INIT_TIME, `${+t2}`));
  }
  get playerSoftwareName() {
    var t2;
    return (t2 = n$1(this, R)) != null ? t2 : x$3;
  }
  set playerSoftwareName(t2) {
    o$2(this, R, t2);
  }
  get playerSoftwareVersion() {
    var t2;
    return (t2 = n$1(this, I$1)) != null ? t2 : v$1;
  }
  set playerSoftwareVersion(t2) {
    o$2(this, I$1, t2);
  }
  get _hls() {
    var t2;
    return (t2 = n$1(this, E$3)) == null ? void 0 : t2.engine;
  }
  get mux() {
    var t2;
    return (t2 = this.nativeEl) == null ? void 0 : t2.mux;
  }
  get error() {
    var t2;
    return (t2 = Ot$1(this.nativeEl)) != null ? t2 : null;
  }
  get errorTranslator() {
    return n$1(this, M$2);
  }
  set errorTranslator(t2) {
    o$2(this, M$2, t2);
  }
  get src() {
    return this.getAttribute("src");
  }
  set src(t2) {
    t2 !== this.src && (t2 == null ? this.removeAttribute("src") : this.setAttribute("src", t2));
  }
  get type() {
    var t2;
    return (t2 = this.getAttribute(e.TYPE)) != null ? t2 : void 0;
  }
  set type(t2) {
    t2 !== this.type && (t2 ? this.setAttribute(e.TYPE, t2) : this.removeAttribute(e.TYPE));
  }
  get preload() {
    let t2 = this.getAttribute("preload");
    return t2 === "" ? "auto" : ["none", "metadata", "auto"].includes(t2) ? t2 : super.preload;
  }
  set preload(t2) {
    t2 != this.getAttribute("preload") && (["", "none", "metadata", "auto"].includes(t2) ? this.setAttribute("preload", t2) : this.removeAttribute("preload"));
  }
  get debug() {
    return this.getAttribute(e.DEBUG) != null;
  }
  set debug(t2) {
    t2 !== this.debug && (t2 ? this.setAttribute(e.DEBUG, "") : this.removeAttribute(e.DEBUG));
  }
  get disableTracking() {
    return this.hasAttribute(e.DISABLE_TRACKING);
  }
  set disableTracking(t2) {
    t2 !== this.disableTracking && this.toggleAttribute(e.DISABLE_TRACKING, !!t2);
  }
  get disableCookies() {
    return this.hasAttribute(e.DISABLE_COOKIES);
  }
  set disableCookies(t2) {
    t2 !== this.disableCookies && (t2 ? this.setAttribute(e.DISABLE_COOKIES, "") : this.removeAttribute(e.DISABLE_COOKIES));
  }
  get disablePseudoEnded() {
    return this.hasAttribute(e.DISABLE_PSEUDO_ENDED);
  }
  set disablePseudoEnded(t2) {
    t2 !== this.disablePseudoEnded && (t2 ? this.setAttribute(e.DISABLE_PSEUDO_ENDED, "") : this.removeAttribute(e.DISABLE_PSEUDO_ENDED));
  }
  get startTime() {
    let t2 = this.getAttribute(e.START_TIME);
    if (t2 == null) return;
    let i2 = +t2;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set startTime(t2) {
    t2 !== this.startTime && (t2 == null ? this.removeAttribute(e.START_TIME) : this.setAttribute(e.START_TIME, `${t2}`));
  }
  get playbackId() {
    var t2;
    return this.hasAttribute(e.PLAYBACK_ID) ? this.getAttribute(e.PLAYBACK_ID) : (t2 = qe(this.src)) != null ? t2 : void 0;
  }
  set playbackId(t2) {
    t2 !== this.playbackId && (t2 ? this.setAttribute(e.PLAYBACK_ID, t2) : this.removeAttribute(e.PLAYBACK_ID));
  }
  get maxResolution() {
    var t2;
    return (t2 = this.getAttribute(e.MAX_RESOLUTION)) != null ? t2 : void 0;
  }
  set maxResolution(t2) {
    t2 !== this.maxResolution && (t2 ? this.setAttribute(e.MAX_RESOLUTION, t2) : this.removeAttribute(e.MAX_RESOLUTION));
  }
  get minResolution() {
    var t2;
    return (t2 = this.getAttribute(e.MIN_RESOLUTION)) != null ? t2 : void 0;
  }
  set minResolution(t2) {
    t2 !== this.minResolution && (t2 ? this.setAttribute(e.MIN_RESOLUTION, t2) : this.removeAttribute(e.MIN_RESOLUTION));
  }
  get renditionOrder() {
    var t2;
    return (t2 = this.getAttribute(e.RENDITION_ORDER)) != null ? t2 : void 0;
  }
  set renditionOrder(t2) {
    t2 !== this.renditionOrder && (t2 ? this.setAttribute(e.RENDITION_ORDER, t2) : this.removeAttribute(e.RENDITION_ORDER));
  }
  get programStartTime() {
    let t2 = this.getAttribute(e.PROGRAM_START_TIME);
    if (t2 == null) return;
    let i2 = +t2;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set programStartTime(t2) {
    t2 == null ? this.removeAttribute(e.PROGRAM_START_TIME) : this.setAttribute(e.PROGRAM_START_TIME, `${t2}`);
  }
  get programEndTime() {
    let t2 = this.getAttribute(e.PROGRAM_END_TIME);
    if (t2 == null) return;
    let i2 = +t2;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set programEndTime(t2) {
    t2 == null ? this.removeAttribute(e.PROGRAM_END_TIME) : this.setAttribute(e.PROGRAM_END_TIME, `${t2}`);
  }
  get assetStartTime() {
    let t2 = this.getAttribute(e.ASSET_START_TIME);
    if (t2 == null) return;
    let i2 = +t2;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set assetStartTime(t2) {
    t2 == null ? this.removeAttribute(e.ASSET_START_TIME) : this.setAttribute(e.ASSET_START_TIME, `${t2}`);
  }
  get assetEndTime() {
    let t2 = this.getAttribute(e.ASSET_END_TIME);
    if (t2 == null) return;
    let i2 = +t2;
    return Number.isNaN(i2) ? void 0 : i2;
  }
  set assetEndTime(t2) {
    t2 == null ? this.removeAttribute(e.ASSET_END_TIME) : this.setAttribute(e.ASSET_END_TIME, `${t2}`);
  }
  get customDomain() {
    var t2;
    return (t2 = this.getAttribute(e.CUSTOM_DOMAIN)) != null ? t2 : void 0;
  }
  set customDomain(t2) {
    t2 !== this.customDomain && (t2 ? this.setAttribute(e.CUSTOM_DOMAIN, t2) : this.removeAttribute(e.CUSTOM_DOMAIN));
  }
  get drmToken() {
    var t2;
    return (t2 = this.getAttribute(e.DRM_TOKEN)) != null ? t2 : void 0;
  }
  set drmToken(t2) {
    t2 !== this.drmToken && (t2 ? this.setAttribute(e.DRM_TOKEN, t2) : this.removeAttribute(e.DRM_TOKEN));
  }
  get playbackToken() {
    var t2, i2, r10, l2;
    if (this.hasAttribute(e.PLAYBACK_TOKEN)) return (t2 = this.getAttribute(e.PLAYBACK_TOKEN)) != null ? t2 : void 0;
    if (this.hasAttribute(e.PLAYBACK_ID)) {
      let [, A2] = F$1((i2 = this.playbackId) != null ? i2 : "");
      return (r10 = new URLSearchParams(A2).get("token")) != null ? r10 : void 0;
    }
    if (this.src) return (l2 = new URLSearchParams(this.src).get("token")) != null ? l2 : void 0;
  }
  set playbackToken(t2) {
    t2 !== this.playbackToken && (t2 ? this.setAttribute(e.PLAYBACK_TOKEN, t2) : this.removeAttribute(e.PLAYBACK_TOKEN));
  }
  get tokens() {
    let t2 = this.getAttribute(e.PLAYBACK_TOKEN), i2 = this.getAttribute(e.DRM_TOKEN);
    return { ...n$1(this, _), ...t2 != null ? { playback: t2 } : {}, ...i2 != null ? { drm: i2 } : {} };
  }
  set tokens(t2) {
    o$2(this, _, t2 != null ? t2 : {});
  }
  get ended() {
    return Vt$1(this.nativeEl, this._hls);
  }
  get envKey() {
    var t2;
    return (t2 = this.getAttribute(e.ENV_KEY)) != null ? t2 : void 0;
  }
  set envKey(t2) {
    t2 !== this.envKey && (t2 ? this.setAttribute(e.ENV_KEY, t2) : this.removeAttribute(e.ENV_KEY));
  }
  get beaconCollectionDomain() {
    var t2;
    return (t2 = this.getAttribute(e.BEACON_COLLECTION_DOMAIN)) != null ? t2 : void 0;
  }
  set beaconCollectionDomain(t2) {
    t2 !== this.beaconCollectionDomain && (t2 ? this.setAttribute(e.BEACON_COLLECTION_DOMAIN, t2) : this.removeAttribute(e.BEACON_COLLECTION_DOMAIN));
  }
  get streamType() {
    var t2;
    return (t2 = this.getAttribute(e.STREAM_TYPE)) != null ? t2 : Ue(this.nativeEl);
  }
  set streamType(t2) {
    t2 !== this.streamType && (t2 ? this.setAttribute(e.STREAM_TYPE, t2) : this.removeAttribute(e.STREAM_TYPE));
  }
  get targetLiveWindow() {
    return this.hasAttribute(e.TARGET_LIVE_WINDOW) ? +this.getAttribute(e.TARGET_LIVE_WINDOW) : zr(this.nativeEl);
  }
  set targetLiveWindow(t2) {
    t2 != this.targetLiveWindow && (t2 == null ? this.removeAttribute(e.TARGET_LIVE_WINDOW) : this.setAttribute(e.TARGET_LIVE_WINDOW, `${+t2}`));
  }
  get liveEdgeStart() {
    var t2, i2;
    if (this.hasAttribute(e.LIVE_EDGE_OFFSET)) {
      let { liveEdgeOffset: r10 } = this, l2 = (t2 = this.nativeEl.seekable.end(0)) != null ? t2 : 0, A2 = (i2 = this.nativeEl.seekable.start(0)) != null ? i2 : 0;
      return Math.max(A2, l2 - r10);
    }
    return Qr(this.nativeEl);
  }
  get liveEdgeOffset() {
    if (this.hasAttribute(e.LIVE_EDGE_OFFSET)) return +this.getAttribute(e.LIVE_EDGE_OFFSET);
  }
  set liveEdgeOffset(t2) {
    t2 != this.liveEdgeOffset && (t2 == null ? this.removeAttribute(e.LIVE_EDGE_OFFSET) : this.setAttribute(e.LIVE_EDGE_OFFSET, `${+t2}`));
  }
  get seekable() {
    return Xe(this.nativeEl);
  }
  async addCuePoints(t2) {
    return _e$1(this.nativeEl, t2);
  }
  get activeCuePoint() {
    return ke$1(this.nativeEl);
  }
  get cuePoints() {
    return pt$1(this.nativeEl);
  }
  async addChapters(t2) {
    return Ne$1(this.nativeEl, t2);
  }
  get activeChapter() {
    return Ie(this.nativeEl);
  }
  get chapters() {
    return ft(this.nativeEl);
  }
  getStartDate() {
    return Tt$1(this.nativeEl, this._hls);
  }
  get currentPdt() {
    return yt(this.nativeEl, this._hls);
  }
  get preferPlayback() {
    let t2 = this.getAttribute(e.PREFER_PLAYBACK);
    if (t2 === X$1.MSE || t2 === X$1.NATIVE) return t2;
  }
  set preferPlayback(t2) {
    t2 !== this.preferPlayback && (t2 === X$1.MSE || t2 === X$1.NATIVE ? this.setAttribute(e.PREFER_PLAYBACK, t2) : this.removeAttribute(e.PREFER_PLAYBACK));
  }
  get metadata() {
    return { ...this.getAttributeNames().filter((i2) => i2.startsWith("metadata-") && ![e.METADATA_URL].includes(i2)).reduce((i2, r10) => {
      let l2 = this.getAttribute(r10);
      return l2 != null && (i2[r10.replace(/^metadata-/, "").replace(/-/g, "_")] = l2), i2;
    }, {}), ...n$1(this, m$2) };
  }
  set metadata(t2) {
    o$2(this, m$2, t2 != null ? t2 : {}), this.mux && this.mux.emit("hb", n$1(this, m$2));
  }
  get _hlsConfig() {
    return n$1(this, O);
  }
  set _hlsConfig(t2) {
    o$2(this, O, t2);
  }
  get logo() {
    var t2;
    return (t2 = this.getAttribute(e.LOGO)) != null ? t2 : n$1(this, c$1);
  }
  set logo(t2) {
    t2 ? this.setAttribute(e.LOGO, t2) : this.removeAttribute(e.LOGO);
  }
  load() {
    o$2(this, E$3, Zr(this, this.nativeEl, n$1(this, E$3)));
  }
  unload() {
    Kt$1(this.nativeEl, n$1(this, E$3), this), o$2(this, E$3, void 0);
  }
  attributeChangedCallback(t2, i2, r10) {
    var A2, L2;
    switch (CustomVideoElement.observedAttributes.includes(t2) && !["src", "autoplay", "preload"].includes(t2) && super.attributeChangedCallback(t2, i2, r10), t2) {
      case e.PLAYER_SOFTWARE_NAME:
        this.playerSoftwareName = r10 != null ? r10 : void 0;
        break;
      case e.PLAYER_SOFTWARE_VERSION:
        this.playerSoftwareVersion = r10 != null ? r10 : void 0;
        break;
      case "src": {
        let u2 = !!i2, h2 = !!r10;
        !u2 && h2 ? b$2(this, f$2, T$1).call(this) : u2 && !h2 ? this.unload() : u2 && h2 && (this.unload(), b$2(this, f$2, T$1).call(this));
        break;
      }
      case "autoplay":
        if (r10 === i2) break;
        (A2 = n$1(this, E$3)) == null || A2.setAutoplay(this.autoplay);
        break;
      case "preload":
        if (r10 === i2) break;
        (L2 = n$1(this, E$3)) == null || L2.setPreload(r10);
        break;
      case e.PLAYBACK_ID:
        this.src = qr(this);
        break;
      case e.DEBUG: {
        let u2 = this.debug;
        this.mux && console.info("Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."), this._hls && (this._hls.config.debug = u2);
        break;
      }
      case e.METADATA_URL:
        r10 && fetch(r10).then((u2) => u2.json()).then((u2) => this.metadata = u2).catch(() => console.error(`Unable to load or parse metadata JSON from metadata-url ${r10}!`));
        break;
      case e.STREAM_TYPE:
        (r10 == null || r10 !== i2) && this.dispatchEvent(new CustomEvent("streamtypechange", { composed: true, bubbles: true }));
        break;
      case e.TARGET_LIVE_WINDOW:
        (r10 == null || r10 !== i2) && this.dispatchEvent(new CustomEvent("targetlivewindowchange", { composed: true, bubbles: true, detail: this.targetLiveWindow }));
        break;
      case e.LOGO:
        (r10 == null || r10 !== i2) && this.updateLogo();
        break;
      case e.DISABLE_TRACKING: {
        if (r10 == null || r10 !== i2) {
          let u2 = this.currentTime, h2 = this.paused;
          this.unload(), b$2(this, f$2, T$1).call(this).then(() => {
            this.currentTime = u2, h2 || this.play();
          });
        }
        break;
      }
      case e.DISABLE_COOKIES: {
        (r10 == null || r10 !== i2) && this.disableCookies && document.cookie.split(";").forEach((h2) => {
          h2.trim().startsWith("muxData") && (document.cookie = h2.replace(/^ +/, "").replace(/=.*/, "=;expires=" + (/* @__PURE__ */ new Date()).toUTCString() + ";path=/"));
        });
        break;
      }
    }
  }
  updateLogo() {
    if (!this.shadowRoot) return;
    let t2 = this.shadowRoot.querySelector('slot[name="logo"]');
    if (!t2) return;
    let i2 = this.constructor.getLogoHTML(n$1(this, c$1) || this.logo);
    t2.innerHTML = i2;
  }
  connectedCallback() {
    var t2;
    (t2 = super.connectedCallback) == null || t2.call(this), this.nativeEl && this.src && !n$1(this, E$3) && b$2(this, f$2, T$1).call(this);
  }
  disconnectedCallback() {
    this.unload();
  }
  handleEvent(t2) {
    t2.target === this.nativeEl && this.dispatchEvent(new CustomEvent(t2.type, { composed: true, detail: t2.detail }));
  }
}, __name(_d, "K"), _d);
E$3 = /* @__PURE__ */ new WeakMap(), g$3 = /* @__PURE__ */ new WeakMap(), p$2 = /* @__PURE__ */ new WeakMap(), m$2 = /* @__PURE__ */ new WeakMap(), _ = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), I$1 = /* @__PURE__ */ new WeakMap(), R = /* @__PURE__ */ new WeakMap(), M$2 = /* @__PURE__ */ new WeakMap(), c$1 = /* @__PURE__ */ new WeakMap(), f$2 = /* @__PURE__ */ new WeakSet(), T$1 = /* @__PURE__ */ __name(async function() {
  n$1(this, g$3) || (await o$2(this, g$3, Promise.resolve()), o$2(this, g$3, null), this.load());
}, "T$1");
const privateProps = /* @__PURE__ */ new WeakMap();
const _InvalidStateError = class _InvalidStateError extends Error {
};
__name(_InvalidStateError, "InvalidStateError");
let InvalidStateError = _InvalidStateError;
const _NotSupportedError = class _NotSupportedError extends Error {
};
__name(_NotSupportedError, "NotSupportedError");
let NotSupportedError = _NotSupportedError;
const HLS_RESPONSE_HEADERS = ["application/x-mpegURL", "application/vnd.apple.mpegurl", "audio/mpegurl"];
const IterableWeakSet = globalThis.WeakRef ? class extends Set {
  add(el) {
    super.add(new WeakRef(el));
  }
  forEach(fn) {
    super.forEach((ref) => {
      const value = ref.deref();
      if (value) fn(value);
    });
  }
} : Set;
function onCastApiAvailable(callback) {
  if (!globalThis.chrome?.cast?.isAvailable) {
    globalThis.__onGCastApiAvailable = () => {
      customElements.whenDefined("google-cast-button").then(callback);
    };
  } else if (!globalThis.cast?.framework) {
    customElements.whenDefined("google-cast-button").then(callback);
  } else {
    callback();
  }
}
__name(onCastApiAvailable, "onCastApiAvailable");
function requiresCastFramework() {
  return globalThis.chrome;
}
__name(requiresCastFramework, "requiresCastFramework");
function loadCastFramework() {
  const sdkUrl = "https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";
  if (globalThis.chrome?.cast || document.querySelector(`script[src="${sdkUrl}"]`)) return;
  const script = document.createElement("script");
  script.src = sdkUrl;
  document.head.append(script);
}
__name(loadCastFramework, "loadCastFramework");
function castContext() {
  return globalThis.cast?.framework?.CastContext.getInstance();
}
__name(castContext, "castContext");
function currentSession() {
  return castContext()?.getCurrentSession();
}
__name(currentSession, "currentSession");
function currentMedia() {
  return currentSession()?.getSessionObj().media[0];
}
__name(currentMedia, "currentMedia");
function editTracksInfo(request2) {
  return new Promise((resolve, reject) => {
    currentMedia().editTracksInfo(request2, resolve, reject);
  });
}
__name(editTracksInfo, "editTracksInfo");
function getMediaStatus(request2) {
  return new Promise((resolve, reject) => {
    currentMedia().getStatus(request2, resolve, reject);
  });
}
__name(getMediaStatus, "getMediaStatus");
function setCastOptions(options) {
  return castContext().setOptions({
    ...getDefaultCastOptions(),
    ...options
  });
}
__name(setCastOptions, "setCastOptions");
function getDefaultCastOptions() {
  return {
    // Set the receiver application ID to your own (created in the
    // Google Cast Developer Console), or optionally
    // use the chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
    receiverApplicationId: "CC1AD845",
    // Auto join policy can be one of the following three:
    // ORIGIN_SCOPED - Auto connect from same appId and page origin
    // TAB_AND_ORIGIN_SCOPED - Auto connect from same appId, page origin, and tab
    // PAGE_SCOPED - No auto connect
    autoJoinPolicy: "origin_scoped",
    // The following flag enables Cast Connect(requires Chrome 87 or higher)
    // https://developers.googleblog.com/2020/08/introducing-cast-connect-android-tv.html
    androidReceiverCompatible: false,
    language: "en-US",
    resumeSavedSession: true
  };
}
__name(getDefaultCastOptions, "getDefaultCastOptions");
function getFormat(segment) {
  if (!segment) return void 0;
  const regex = /\.([a-zA-Z0-9]+)(?:\?.*)?$/;
  const match = segment.match(regex);
  return match ? match[1] : null;
}
__name(getFormat, "getFormat");
function parsePlaylistUrls(playlistContent) {
  const lines = playlistContent.split("\n");
  const urls = [];
  for (let i2 = 0; i2 < lines.length; i2++) {
    const line = lines[i2].trim();
    if (line.startsWith("#EXT-X-STREAM-INF")) {
      const nextLine = lines[i2 + 1] ? lines[i2 + 1].trim() : "";
      if (nextLine && !nextLine.startsWith("#")) {
        urls.push(nextLine);
      }
    }
  }
  return urls;
}
__name(parsePlaylistUrls, "parsePlaylistUrls");
function parseSegment(playlistContent) {
  const lines = playlistContent.split("\n");
  const url = lines.find((line) => !line.trim().startsWith("#") && line.trim() !== "");
  return url;
}
__name(parseSegment, "parseSegment");
async function isHls(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    const contentType = response.headers.get("Content-Type");
    return HLS_RESPONSE_HEADERS.some((header) => contentType === header);
  } catch (err) {
    console.error("Error while trying to get the Content-Type of the manifest", err);
    return false;
  }
}
__name(isHls, "isHls");
async function getPlaylistSegmentFormat(url) {
  try {
    const mainManifestContent = await (await fetch(url)).text();
    let availableChunksContent = mainManifestContent;
    const playlists = parsePlaylistUrls(mainManifestContent);
    if (playlists.length > 0) {
      const chosenPlaylistUrl = new URL(playlists[0], url).toString();
      availableChunksContent = await (await fetch(chosenPlaylistUrl)).text();
    }
    const segment = parseSegment(availableChunksContent);
    const format = getFormat(segment);
    return format;
  } catch (err) {
    console.error("Error while trying to parse the manifest playlist", err);
    return void 0;
  }
}
__name(getPlaylistSegmentFormat, "getPlaylistSegmentFormat");
const remoteInstances = new IterableWeakSet();
const castElementRef = /* @__PURE__ */ new WeakSet();
let cf;
onCastApiAvailable(() => {
  if (!globalThis.chrome?.cast?.isAvailable) {
    console.debug("chrome.cast.isAvailable", globalThis.chrome?.cast?.isAvailable);
    return;
  }
  if (!cf) {
    cf = cast.framework;
    castContext().addEventListener(cf.CastContextEventType.CAST_STATE_CHANGED, (e2) => {
      remoteInstances.forEach((r10) => privateProps.get(r10).onCastStateChanged?.(e2));
    });
    castContext().addEventListener(cf.CastContextEventType.SESSION_STATE_CHANGED, (e2) => {
      remoteInstances.forEach((r10) => privateProps.get(r10).onSessionStateChanged?.(e2));
    });
    remoteInstances.forEach((r10) => privateProps.get(r10).init?.());
  }
});
let remotePlaybackCallbackIdCount = 0;
const _RemotePlayback = class _RemotePlayback extends EventTarget {
  constructor(media) {
    super();
    __privateAdd(this, _RemotePlayback_instances);
    __privateAdd(this, _media);
    __privateAdd(this, _isInit2);
    __privateAdd(this, _remotePlayer);
    __privateAdd(this, _remoteListeners);
    __privateAdd(this, _state, "disconnected");
    __privateAdd(this, _available, false);
    __privateAdd(this, _callbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _callbackIds, /* @__PURE__ */ new WeakMap());
    __privateSet(this, _media, media);
    remoteInstances.add(this);
    privateProps.set(this, {
      init: /* @__PURE__ */ __name(() => __privateMethod(this, _RemotePlayback_instances, init_fn2).call(this), "init"),
      onCastStateChanged: /* @__PURE__ */ __name(() => __privateMethod(this, _RemotePlayback_instances, onCastStateChanged_fn).call(this), "onCastStateChanged"),
      onSessionStateChanged: /* @__PURE__ */ __name(() => __privateMethod(this, _RemotePlayback_instances, onSessionStateChanged_fn).call(this), "onSessionStateChanged"),
      getCastPlayer: /* @__PURE__ */ __name(() => __privateGet(this, _RemotePlayback_instances, castPlayer_get), "getCastPlayer")
    });
    __privateMethod(this, _RemotePlayback_instances, init_fn2).call(this);
  }
  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/RemotePlayback/state
   * @return {'disconnected'|'connecting'|'connected'}
   */
  get state() {
    return __privateGet(this, _state);
  }
  async watchAvailability(callback) {
    if (__privateGet(this, _media).disableRemotePlayback) {
      throw new InvalidStateError("disableRemotePlayback attribute is present.");
    }
    __privateGet(this, _callbackIds).set(callback, ++remotePlaybackCallbackIdCount);
    __privateGet(this, _callbacks).add(callback);
    queueMicrotask(() => callback(__privateMethod(this, _RemotePlayback_instances, hasDevicesAvailable_fn).call(this)));
    return remotePlaybackCallbackIdCount;
  }
  async cancelWatchAvailability(callback) {
    if (__privateGet(this, _media).disableRemotePlayback) {
      throw new InvalidStateError("disableRemotePlayback attribute is present.");
    }
    if (callback) {
      __privateGet(this, _callbacks).delete(callback);
    } else {
      __privateGet(this, _callbacks).clear();
    }
  }
  async prompt() {
    if (__privateGet(this, _media).disableRemotePlayback) {
      throw new InvalidStateError("disableRemotePlayback attribute is present.");
    }
    if (!globalThis.chrome?.cast?.isAvailable) {
      throw new NotSupportedError("The RemotePlayback API is disabled on this platform.");
    }
    const willDisconnect = castElementRef.has(__privateGet(this, _media));
    castElementRef.add(__privateGet(this, _media));
    setCastOptions(__privateGet(this, _media).castOptions);
    Object.entries(__privateGet(this, _remoteListeners)).forEach(([event, listener]) => {
      __privateGet(this, _remotePlayer).controller.addEventListener(event, listener);
    });
    try {
      await castContext().requestSession();
    } catch (err) {
      if (!willDisconnect) {
        castElementRef.delete(__privateGet(this, _media));
      }
      if (err === "cancel") {
        return;
      }
      throw new Error(err);
    }
    privateProps.get(__privateGet(this, _media))?.loadOnPrompt?.();
  }
};
_media = new WeakMap();
_isInit2 = new WeakMap();
_remotePlayer = new WeakMap();
_remoteListeners = new WeakMap();
_state = new WeakMap();
_available = new WeakMap();
_callbacks = new WeakMap();
_callbackIds = new WeakMap();
_RemotePlayback_instances = new WeakSet();
castPlayer_get = /* @__PURE__ */ __name(function() {
  if (castElementRef.has(__privateGet(this, _media))) return __privateGet(this, _remotePlayer);
  return void 0;
}, "#castPlayer");
disconnect_fn = /* @__PURE__ */ __name(function() {
  if (!castElementRef.has(__privateGet(this, _media))) return;
  Object.entries(__privateGet(this, _remoteListeners)).forEach(([event, listener]) => {
    __privateGet(this, _remotePlayer).controller.removeEventListener(event, listener);
  });
  castElementRef.delete(__privateGet(this, _media));
  __privateGet(this, _media).muted = __privateGet(this, _remotePlayer).isMuted;
  __privateGet(this, _media).currentTime = __privateGet(this, _remotePlayer).savedPlayerState.currentTime;
  if (__privateGet(this, _remotePlayer).savedPlayerState.isPaused === false) {
    __privateGet(this, _media).play();
  }
}, "#disconnect");
hasDevicesAvailable_fn = /* @__PURE__ */ __name(function() {
  const castState = castContext()?.getCastState();
  return castState && castState !== "NO_DEVICES_AVAILABLE";
}, "#hasDevicesAvailable");
onCastStateChanged_fn = /* @__PURE__ */ __name(function() {
  const castState = castContext().getCastState();
  if (castElementRef.has(__privateGet(this, _media))) {
    if (castState === "CONNECTING") {
      __privateSet(this, _state, "connecting");
      this.dispatchEvent(new Event("connecting"));
    }
  }
  if (!__privateGet(this, _available) && castState?.includes("CONNECT")) {
    __privateSet(this, _available, true);
    for (let callback of __privateGet(this, _callbacks)) callback(true);
  } else if (__privateGet(this, _available) && (!castState || castState === "NO_DEVICES_AVAILABLE")) {
    __privateSet(this, _available, false);
    for (let callback of __privateGet(this, _callbacks)) callback(false);
  }
}, "#onCastStateChanged");
onSessionStateChanged_fn = /* @__PURE__ */ __name(async function() {
  const { SESSION_RESUMED } = cf.SessionState;
  if (castContext().getSessionState() === SESSION_RESUMED) {
    if (__privateGet(this, _media).castSrc === currentMedia()?.media.contentId) {
      castElementRef.add(__privateGet(this, _media));
      Object.entries(__privateGet(this, _remoteListeners)).forEach(([event, listener]) => {
        __privateGet(this, _remotePlayer).controller.addEventListener(event, listener);
      });
      try {
        await getMediaStatus(new chrome.cast.media.GetStatusRequest());
      } catch (error) {
        console.error(error);
      }
      __privateGet(this, _remoteListeners)[cf.RemotePlayerEventType.IS_PAUSED_CHANGED]();
      __privateGet(this, _remoteListeners)[cf.RemotePlayerEventType.PLAYER_STATE_CHANGED]();
    }
  }
}, "#onSessionStateChanged");
init_fn2 = /* @__PURE__ */ __name(function() {
  if (!cf || __privateGet(this, _isInit2)) return;
  __privateSet(this, _isInit2, true);
  setCastOptions(__privateGet(this, _media).castOptions);
  __privateGet(this, _media).textTracks.addEventListener("change", () => __privateMethod(this, _RemotePlayback_instances, updateRemoteTextTrack_fn).call(this));
  __privateMethod(this, _RemotePlayback_instances, onCastStateChanged_fn).call(this);
  __privateSet(this, _remotePlayer, new cf.RemotePlayer());
  new cf.RemotePlayerController(__privateGet(this, _remotePlayer));
  __privateSet(this, _remoteListeners, {
    [cf.RemotePlayerEventType.IS_CONNECTED_CHANGED]: ({ value }) => {
      if (value === true) {
        __privateSet(this, _state, "connected");
        this.dispatchEvent(new Event("connect"));
      } else {
        __privateMethod(this, _RemotePlayback_instances, disconnect_fn).call(this);
        __privateSet(this, _state, "disconnected");
        this.dispatchEvent(new Event("disconnect"));
      }
    },
    [cf.RemotePlayerEventType.DURATION_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event("durationchange"));
    },
    [cf.RemotePlayerEventType.VOLUME_LEVEL_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event("volumechange"));
    },
    [cf.RemotePlayerEventType.IS_MUTED_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event("volumechange"));
    },
    [cf.RemotePlayerEventType.CURRENT_TIME_CHANGED]: () => {
      if (!__privateGet(this, _RemotePlayback_instances, castPlayer_get)?.isMediaLoaded) return;
      __privateGet(this, _media).dispatchEvent(new Event("timeupdate"));
    },
    [cf.RemotePlayerEventType.VIDEO_INFO_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event("resize"));
    },
    [cf.RemotePlayerEventType.IS_PAUSED_CHANGED]: () => {
      __privateGet(this, _media).dispatchEvent(new Event(this.paused ? "pause" : "play"));
    },
    [cf.RemotePlayerEventType.PLAYER_STATE_CHANGED]: () => {
      if (__privateGet(this, _RemotePlayback_instances, castPlayer_get)?.playerState === chrome.cast.media.PlayerState.PAUSED) {
        return;
      }
      __privateGet(this, _media).dispatchEvent(
        new Event(
          {
            [chrome.cast.media.PlayerState.PLAYING]: "playing",
            [chrome.cast.media.PlayerState.BUFFERING]: "waiting",
            [chrome.cast.media.PlayerState.IDLE]: "emptied"
          }[__privateGet(this, _RemotePlayback_instances, castPlayer_get)?.playerState]
        )
      );
    },
    [cf.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED]: async () => {
      if (!__privateGet(this, _RemotePlayback_instances, castPlayer_get)?.isMediaLoaded) return;
      await Promise.resolve();
      __privateMethod(this, _RemotePlayback_instances, onRemoteMediaLoaded_fn).call(this);
    }
  });
}, "#init");
onRemoteMediaLoaded_fn = /* @__PURE__ */ __name(function() {
  __privateMethod(this, _RemotePlayback_instances, updateRemoteTextTrack_fn).call(this);
}, "#onRemoteMediaLoaded");
updateRemoteTextTrack_fn = /* @__PURE__ */ __name(async function() {
  if (!__privateGet(this, _RemotePlayback_instances, castPlayer_get)) return;
  const remoteTracks = __privateGet(this, _remotePlayer).mediaInfo?.tracks ?? [];
  const remoteSubtitles = remoteTracks.filter(
    ({ type }) => type === chrome.cast.media.TrackType.TEXT
  );
  const localSubtitles = [...__privateGet(this, _media).textTracks].filter(
    ({ kind }) => kind === "subtitles" || kind === "captions"
  );
  const subtitles = remoteSubtitles.map(({ language, name, trackId }) => {
    const { mode } = localSubtitles.find(
      (local) => local.language === language && local.label === name
    ) ?? {};
    if (mode) return { mode, trackId };
    return false;
  }).filter(Boolean);
  const hiddenSubtitles = subtitles.filter(
    ({ mode }) => mode !== "showing"
  );
  const hiddenTrackIds = hiddenSubtitles.map(({ trackId }) => trackId);
  const showingSubtitle = subtitles.find(({ mode }) => mode === "showing");
  const activeTrackIds = currentSession()?.getSessionObj().media[0]?.activeTrackIds ?? [];
  let requestTrackIds = activeTrackIds;
  if (activeTrackIds.length) {
    requestTrackIds = requestTrackIds.filter(
      (id) => !hiddenTrackIds.includes(id)
    );
  }
  if (showingSubtitle?.trackId) {
    requestTrackIds = [...requestTrackIds, showingSubtitle.trackId];
  }
  requestTrackIds = [...new Set(requestTrackIds)];
  const arrayEquals = /* @__PURE__ */ __name((a, b2) => a.length === b2.length && a.every((a2) => b2.includes(a2)), "arrayEquals");
  if (!arrayEquals(activeTrackIds, requestTrackIds)) {
    try {
      const request2 = new chrome.cast.media.EditTracksInfoRequest(
        requestTrackIds
      );
      await editTracksInfo(request2);
    } catch (error) {
      console.error(error);
    }
  }
}, "#updateRemoteTextTrack");
__name(_RemotePlayback, "RemotePlayback");
let RemotePlayback = _RemotePlayback;
const CastableMediaMixin = /* @__PURE__ */ __name((superclass) => {
  var _a3, _localState, _castOptions, _castCustomData, _remote, _CastableMedia_instances, castPlayer_get2, loadOnPrompt_fn;
  return _a3 = class extends superclass {
    constructor() {
      super(...arguments);
      __privateAdd(this, _CastableMedia_instances);
      __privateAdd(this, _localState, { paused: false });
      __privateAdd(this, _castOptions, getDefaultCastOptions());
      __privateAdd(this, _castCustomData);
      __privateAdd(this, _remote);
    }
    get remote() {
      if (__privateGet(this, _remote)) return __privateGet(this, _remote);
      if (requiresCastFramework()) {
        if (!this.disableRemotePlayback) {
          loadCastFramework();
        }
        privateProps.set(this, {
          loadOnPrompt: /* @__PURE__ */ __name(() => __privateMethod(this, _CastableMedia_instances, loadOnPrompt_fn).call(this), "loadOnPrompt")
        });
        return __privateSet(this, _remote, new RemotePlayback(this));
      }
      return super.remote;
    }
    attributeChangedCallback(attrName, oldValue, newValue) {
      super.attributeChangedCallback(attrName, oldValue, newValue);
      if (attrName === "cast-receiver" && newValue) {
        __privateGet(this, _castOptions).receiverApplicationId = newValue;
        return;
      }
      if (!__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return;
      switch (attrName) {
        case "cast-stream-type":
        case "cast-src":
          this.load();
          break;
      }
    }
    async load() {
      if (!__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return super.load();
      const mediaInfo = new chrome.cast.media.MediaInfo(this.castSrc, this.castContentType);
      mediaInfo.customData = this.castCustomData;
      const subtitles = [...this.querySelectorAll("track")].filter(
        ({ kind, src }) => src && (kind === "subtitles" || kind === "captions")
      );
      const activeTrackIds = [];
      let textTrackIdCount = 0;
      if (subtitles.length) {
        mediaInfo.tracks = subtitles.map((trackEl) => {
          const trackId = ++textTrackIdCount;
          if (activeTrackIds.length === 0 && trackEl.track.mode === "showing") {
            activeTrackIds.push(trackId);
          }
          const track = new chrome.cast.media.Track(
            trackId,
            chrome.cast.media.TrackType.TEXT
          );
          track.trackContentId = trackEl.src;
          track.trackContentType = "text/vtt";
          track.subtype = trackEl.kind === "captions" ? chrome.cast.media.TextTrackType.CAPTIONS : chrome.cast.media.TextTrackType.SUBTITLES;
          track.name = trackEl.label;
          track.language = trackEl.srclang;
          return track;
        });
      }
      if (this.castStreamType === "live") {
        mediaInfo.streamType = chrome.cast.media.StreamType.LIVE;
      } else {
        mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED;
      }
      mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
      mediaInfo.metadata.title = this.title;
      mediaInfo.metadata.images = [{ url: this.poster }];
      if (isHls(this.castSrc)) {
        const segmentFormat = await getPlaylistSegmentFormat(this.castSrc);
        const isFragmentedMP4 = segmentFormat?.includes("m4s") || segmentFormat?.includes("mp4");
        if (isFragmentedMP4) {
          mediaInfo.hlsSegmentFormat = chrome.cast.media.HlsSegmentFormat.FMP4;
          mediaInfo.hlsVideoSegmentFormat = chrome.cast.media.HlsVideoSegmentFormat.FMP4;
        } else if (segmentFormat?.includes("ts")) {
          mediaInfo.hlsSegmentFormat = chrome.cast.media.HlsSegmentFormat.TS;
          mediaInfo.hlsVideoSegmentFormat = chrome.cast.media.HlsVideoSegmentFormat.TS;
        }
      }
      const request2 = new chrome.cast.media.LoadRequest(mediaInfo);
      request2.currentTime = super.currentTime ?? 0;
      request2.autoplay = !__privateGet(this, _localState).paused;
      request2.activeTrackIds = activeTrackIds;
      await currentSession()?.loadMedia(request2);
      this.dispatchEvent(new Event("volumechange"));
    }
    play() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        if (__privateGet(this, _CastableMedia_instances, castPlayer_get2).isPaused) {
          __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller?.playOrPause();
        }
        return;
      }
      return super.play();
    }
    pause() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        if (!__privateGet(this, _CastableMedia_instances, castPlayer_get2).isPaused) {
          __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller?.playOrPause();
        }
        return;
      }
      super.pause();
    }
    /**
     * @see https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastOptions
     * @readonly
     *
     * @typedef {Object} CastOptions
     * @property {string} [receiverApplicationId='CC1AD845'] - The app id of the cast receiver.
     * @property {string} [autoJoinPolicy='origin_scoped'] - The auto join policy.
     * @property {string} [language='en-US'] - The language to use for the cast receiver.
     * @property {boolean} [androidReceiverCompatible=false] - Whether to use the Cast Connect.
     * @property {boolean} [resumeSavedSession=true] - Whether to resume the last session.
     *
     * @return {CastOptions}
     */
    get castOptions() {
      return __privateGet(this, _castOptions);
    }
    get castReceiver() {
      return this.getAttribute("cast-receiver") ?? void 0;
    }
    set castReceiver(val) {
      if (this.castReceiver == val) return;
      this.setAttribute("cast-receiver", `${val}`);
    }
    // Allow the cast source url to be different than <video src>, could be a blob.
    get castSrc() {
      return this.getAttribute("cast-src") ?? this.querySelector("source")?.src ?? this.currentSrc;
    }
    set castSrc(val) {
      if (this.castSrc == val) return;
      this.setAttribute("cast-src", `${val}`);
    }
    get castContentType() {
      return this.getAttribute("cast-content-type") ?? void 0;
    }
    set castContentType(val) {
      this.setAttribute("cast-content-type", `${val}`);
    }
    get castStreamType() {
      return this.getAttribute("cast-stream-type") ?? this.streamType ?? void 0;
    }
    set castStreamType(val) {
      this.setAttribute("cast-stream-type", `${val}`);
    }
    get castCustomData() {
      return __privateGet(this, _castCustomData);
    }
    set castCustomData(val) {
      const valType = typeof val;
      if (!["object", "undefined"].includes(valType)) {
        console.error(`castCustomData must be nullish or an object but value was of type ${valType}`);
        return;
      }
      __privateSet(this, _castCustomData, val);
    }
    get readyState() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        switch (__privateGet(this, _CastableMedia_instances, castPlayer_get2).playerState) {
          case chrome.cast.media.PlayerState.IDLE:
            return 0;
          case chrome.cast.media.PlayerState.BUFFERING:
            return 2;
          default:
            return 3;
        }
      }
      return super.readyState;
    }
    get paused() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return __privateGet(this, _CastableMedia_instances, castPlayer_get2).isPaused;
      return super.paused;
    }
    get muted() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return __privateGet(this, _CastableMedia_instances, castPlayer_get2)?.isMuted;
      return super.muted;
    }
    set muted(val) {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        if (val && !__privateGet(this, _CastableMedia_instances, castPlayer_get2).isMuted || !val && __privateGet(this, _CastableMedia_instances, castPlayer_get2).isMuted) {
          __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller?.muteOrUnmute();
        }
        return;
      }
      super.muted = val;
    }
    get volume() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) return __privateGet(this, _CastableMedia_instances, castPlayer_get2)?.volumeLevel ?? 1;
      return super.volume;
    }
    set volume(val) {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        __privateGet(this, _CastableMedia_instances, castPlayer_get2).volumeLevel = +val;
        __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller?.setVolumeLevel();
        return;
      }
      super.volume = val;
    }
    get duration() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2) && __privateGet(this, _CastableMedia_instances, castPlayer_get2)?.isMediaLoaded) {
        return __privateGet(this, _CastableMedia_instances, castPlayer_get2)?.duration ?? NaN;
      }
      return super.duration;
    }
    get currentTime() {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2) && __privateGet(this, _CastableMedia_instances, castPlayer_get2)?.isMediaLoaded) {
        return __privateGet(this, _CastableMedia_instances, castPlayer_get2)?.currentTime ?? 0;
      }
      return super.currentTime;
    }
    set currentTime(val) {
      if (__privateGet(this, _CastableMedia_instances, castPlayer_get2)) {
        __privateGet(this, _CastableMedia_instances, castPlayer_get2).currentTime = val;
        __privateGet(this, _CastableMedia_instances, castPlayer_get2).controller?.seek();
        return;
      }
      super.currentTime = val;
    }
  }, _localState = new WeakMap(), _castOptions = new WeakMap(), _castCustomData = new WeakMap(), _remote = new WeakMap(), _CastableMedia_instances = new WeakSet(), castPlayer_get2 = /* @__PURE__ */ __name(function() {
    return privateProps.get(this.remote)?.getCastPlayer?.();
  }, "#castPlayer"), loadOnPrompt_fn = /* @__PURE__ */ __name(async function() {
    __privateGet(this, _localState).paused = __superGet(_a3.prototype, this, "paused");
    __superGet(_a3.prototype, this, "pause").call(this);
    this.muted = __superGet(_a3.prototype, this, "muted");
    try {
      await this.load();
    } catch (err) {
      console.error(err);
    }
  }, "#loadOnPrompt"), __name(_a3, "CastableMedia"), __publicField(_a3, "observedAttributes", [
    ...superclass.observedAttributes ?? [],
    "cast-src",
    "cast-content-type",
    "cast-stream-type",
    "cast-receiver"
  ]), _a3;
}, "CastableMediaMixin");
var f$1 = /* @__PURE__ */ __name((e2) => {
  throw TypeError(e2);
}, "f$1");
var g$2 = /* @__PURE__ */ __name((e2, o2, t2) => o2.has(e2) || f$1("Cannot " + t2), "g$2");
var u$2 = /* @__PURE__ */ __name((e2, o2, t2) => (g$2(e2, o2, "read from private field"), t2 ? t2.call(e2) : o2.get(e2)), "u$2"), m$1 = /* @__PURE__ */ __name((e2, o2, t2) => o2.has(e2) ? f$1("Cannot add the same private member more than once") : o2 instanceof WeakSet ? o2.add(e2) : o2.set(e2, t2), "m$1"), d = /* @__PURE__ */ __name((e2, o2, t2, l2) => (g$2(e2, o2, "write to private field"), o2.set(e2, t2), t2), "d");
var s$1 = (_e = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent(o2) {
    return true;
  }
}, __name(_e, "s"), _e);
if (typeof DocumentFragment == "undefined") {
  const _e3 = class _e3 extends s$1 {
  };
  __name(_e3, "e");
  let e2 = _e3;
  globalThis.DocumentFragment = e2;
}
var n = (_f = class extends s$1 {
}, __name(_f, "n"), _f), x$2 = { get(e2) {
}, define(e2, o2, t2) {
}, getName(e2) {
  return null;
}, upgrade(e2) {
}, whenDefined(e2) {
  return Promise.resolve(n);
} };
var y$1 = { customElements: x$2 }, b$1 = typeof window == "undefined" || typeof globalThis.customElements == "undefined", c = b$1 ? y$1 : globalThis;
var r$1, i = (_g = class extends CastableMediaMixin(MediaTracksMixin(K$1)) {
  constructor() {
    super(...arguments);
    m$1(this, r$1);
  }
  get autoplay() {
    let t2 = this.getAttribute("autoplay");
    return t2 === null ? false : t2 === "" ? true : t2;
  }
  set autoplay(t2) {
    let l2 = this.autoplay;
    t2 !== l2 && (t2 ? this.setAttribute("autoplay", typeof t2 == "string" ? t2 : "") : this.removeAttribute("autoplay"));
  }
  get muxCastCustomData() {
    return { mux: { playbackId: this.playbackId, minResolution: this.minResolution, maxResolution: this.maxResolution, renditionOrder: this.renditionOrder, customDomain: this.customDomain, tokens: { drm: this.drmToken }, envKey: this.envKey, metadata: this.metadata, disableCookies: this.disableCookies, disableTracking: this.disableTracking, beaconCollectionDomain: this.beaconCollectionDomain, startTime: this.startTime, preferCmcd: this.preferCmcd } };
  }
  get castCustomData() {
    var t2;
    return (t2 = u$2(this, r$1)) != null ? t2 : this.muxCastCustomData;
  }
  set castCustomData(t2) {
    d(this, r$1, t2);
  }
}, __name(_g, "i"), _g);
r$1 = /* @__PURE__ */ new WeakMap();
c.customElements.get("mux-video") || (c.customElements.define("mux-video", i), c.MuxVideoElement = i);
const MediaUIEvents = {
  MEDIA_PLAY_REQUEST: "mediaplayrequest",
  MEDIA_PAUSE_REQUEST: "mediapauserequest",
  MEDIA_MUTE_REQUEST: "mediamuterequest",
  MEDIA_UNMUTE_REQUEST: "mediaunmuterequest",
  MEDIA_LOOP_REQUEST: "medialooprequest",
  MEDIA_VOLUME_REQUEST: "mediavolumerequest",
  MEDIA_SEEK_REQUEST: "mediaseekrequest",
  MEDIA_AIRPLAY_REQUEST: "mediaairplayrequest",
  MEDIA_ENTER_FULLSCREEN_REQUEST: "mediaenterfullscreenrequest",
  MEDIA_EXIT_FULLSCREEN_REQUEST: "mediaexitfullscreenrequest",
  MEDIA_PREVIEW_REQUEST: "mediapreviewrequest",
  MEDIA_ENTER_PIP_REQUEST: "mediaenterpiprequest",
  MEDIA_EXIT_PIP_REQUEST: "mediaexitpiprequest",
  MEDIA_ENTER_CAST_REQUEST: "mediaentercastrequest",
  MEDIA_EXIT_CAST_REQUEST: "mediaexitcastrequest",
  MEDIA_SHOW_TEXT_TRACKS_REQUEST: "mediashowtexttracksrequest",
  MEDIA_HIDE_TEXT_TRACKS_REQUEST: "mediahidetexttracksrequest",
  MEDIA_SHOW_SUBTITLES_REQUEST: "mediashowsubtitlesrequest",
  MEDIA_DISABLE_SUBTITLES_REQUEST: "mediadisablesubtitlesrequest",
  MEDIA_TOGGLE_SUBTITLES_REQUEST: "mediatogglesubtitlesrequest",
  MEDIA_PLAYBACK_RATE_REQUEST: "mediaplaybackraterequest",
  MEDIA_RENDITION_REQUEST: "mediarenditionrequest",
  MEDIA_AUDIO_TRACK_REQUEST: "mediaaudiotrackrequest",
  MEDIA_SEEK_TO_LIVE_REQUEST: "mediaseektoliverequest",
  REGISTER_MEDIA_STATE_RECEIVER: "registermediastatereceiver",
  UNREGISTER_MEDIA_STATE_RECEIVER: "unregistermediastatereceiver"
};
const MediaStateReceiverAttributes = {
  MEDIA_CHROME_ATTRIBUTES: "mediachromeattributes",
  MEDIA_CONTROLLER: "mediacontroller"
};
const MediaUIProps = {
  MEDIA_AIRPLAY_UNAVAILABLE: "mediaAirplayUnavailable",
  MEDIA_AUDIO_TRACK_ENABLED: "mediaAudioTrackEnabled",
  MEDIA_AUDIO_TRACK_LIST: "mediaAudioTrackList",
  MEDIA_AUDIO_TRACK_UNAVAILABLE: "mediaAudioTrackUnavailable",
  MEDIA_BUFFERED: "mediaBuffered",
  MEDIA_CAST_UNAVAILABLE: "mediaCastUnavailable",
  MEDIA_CHAPTERS_CUES: "mediaChaptersCues",
  MEDIA_CURRENT_TIME: "mediaCurrentTime",
  MEDIA_DURATION: "mediaDuration",
  MEDIA_ENDED: "mediaEnded",
  MEDIA_ERROR: "mediaError",
  MEDIA_ERROR_CODE: "mediaErrorCode",
  MEDIA_ERROR_MESSAGE: "mediaErrorMessage",
  MEDIA_FULLSCREEN_UNAVAILABLE: "mediaFullscreenUnavailable",
  MEDIA_HAS_PLAYED: "mediaHasPlayed",
  MEDIA_HEIGHT: "mediaHeight",
  MEDIA_IS_AIRPLAYING: "mediaIsAirplaying",
  MEDIA_IS_CASTING: "mediaIsCasting",
  MEDIA_IS_FULLSCREEN: "mediaIsFullscreen",
  MEDIA_IS_PIP: "mediaIsPip",
  MEDIA_LOADING: "mediaLoading",
  MEDIA_MUTED: "mediaMuted",
  MEDIA_LOOP: "mediaLoop",
  MEDIA_PAUSED: "mediaPaused",
  MEDIA_PIP_UNAVAILABLE: "mediaPipUnavailable",
  MEDIA_PLAYBACK_RATE: "mediaPlaybackRate",
  MEDIA_PREVIEW_CHAPTER: "mediaPreviewChapter",
  MEDIA_PREVIEW_COORDS: "mediaPreviewCoords",
  MEDIA_PREVIEW_IMAGE: "mediaPreviewImage",
  MEDIA_PREVIEW_TIME: "mediaPreviewTime",
  MEDIA_RENDITION_LIST: "mediaRenditionList",
  MEDIA_RENDITION_SELECTED: "mediaRenditionSelected",
  MEDIA_RENDITION_UNAVAILABLE: "mediaRenditionUnavailable",
  MEDIA_SEEKABLE: "mediaSeekable",
  MEDIA_STREAM_TYPE: "mediaStreamType",
  MEDIA_SUBTITLES_LIST: "mediaSubtitlesList",
  MEDIA_SUBTITLES_SHOWING: "mediaSubtitlesShowing",
  MEDIA_TARGET_LIVE_WINDOW: "mediaTargetLiveWindow",
  MEDIA_TIME_IS_LIVE: "mediaTimeIsLive",
  MEDIA_VOLUME: "mediaVolume",
  MEDIA_VOLUME_LEVEL: "mediaVolumeLevel",
  MEDIA_VOLUME_UNAVAILABLE: "mediaVolumeUnavailable",
  MEDIA_LANG: "mediaLang",
  MEDIA_WIDTH: "mediaWidth"
};
const MediaUIPropsEntries = Object.entries(
  MediaUIProps
);
const MediaUIAttributes = MediaUIPropsEntries.reduce(
  (dictObj, [key, propName]) => {
    dictObj[key] = propName.toLowerCase();
    return dictObj;
  },
  {}
);
const AdditionalStateChangeEvents = {
  USER_INACTIVE_CHANGE: "userinactivechange",
  BREAKPOINTS_CHANGE: "breakpointchange",
  BREAKPOINTS_COMPUTED: "breakpointscomputed"
};
const MediaStateChangeEvents = MediaUIPropsEntries.reduce(
  (dictObj, [key, propName]) => {
    dictObj[key] = propName.toLowerCase();
    return dictObj;
  },
  { ...AdditionalStateChangeEvents }
);
Object.entries(
  MediaStateChangeEvents
).reduce(
  (mapObj, [key, eventType]) => {
    const attrName = MediaUIAttributes[key];
    if (attrName) {
      mapObj[eventType] = attrName;
    }
    return mapObj;
  },
  { userinactivechange: "userinactive" }
);
const AttributeToStateChangeEventMap = Object.entries(
  MediaUIAttributes
).reduce(
  (mapObj, [key, attrName]) => {
    const evtType = MediaStateChangeEvents[key];
    if (evtType) {
      mapObj[attrName] = evtType;
    }
    return mapObj;
  },
  { userinactive: "userinactivechange" }
);
const TextTrackKinds = {
  SUBTITLES: "subtitles",
  CAPTIONS: "captions",
  CHAPTERS: "chapters",
  METADATA: "metadata"
};
const TextTrackModes = {
  DISABLED: "disabled",
  SHOWING: "showing"
};
const PointerTypes = {
  MOUSE: "mouse",
  PEN: "pen",
  TOUCH: "touch"
};
const AvailabilityStates = {
  UNAVAILABLE: "unavailable",
  UNSUPPORTED: "unsupported"
};
const StreamTypes = {
  LIVE: "live",
  ON_DEMAND: "on-demand",
  UNKNOWN: "unknown"
};
const WebkitPresentationModes = {
  FULLSCREEN: "fullscreen"
};
function stringifyRenditionList(renditions) {
  return renditions == null ? void 0 : renditions.map(stringifyRendition).join(" ");
}
__name(stringifyRenditionList, "stringifyRenditionList");
function parseRenditionList(renditions) {
  return renditions == null ? void 0 : renditions.split(/\s+/).map(parseRendition);
}
__name(parseRenditionList, "parseRenditionList");
function stringifyRendition(rendition) {
  if (rendition) {
    const { id, width, height } = rendition;
    return [id, width, height].filter((a) => a != null).join(":");
  }
}
__name(stringifyRendition, "stringifyRendition");
function parseRendition(rendition) {
  if (rendition) {
    const [id, width, height] = rendition.split(":");
    return { id, width: +width, height: +height };
  }
}
__name(parseRendition, "parseRendition");
function stringifyAudioTrackList(audioTracks) {
  return audioTracks == null ? void 0 : audioTracks.map(stringifyAudioTrack).join(" ");
}
__name(stringifyAudioTrackList, "stringifyAudioTrackList");
function parseAudioTrackList(audioTracks) {
  return audioTracks == null ? void 0 : audioTracks.split(/\s+/).map(parseAudioTrack);
}
__name(parseAudioTrackList, "parseAudioTrackList");
function stringifyAudioTrack(audioTrack) {
  if (audioTrack) {
    const { id, kind, language, label } = audioTrack;
    return [id, kind, language, label].filter((a) => a != null).join(":");
  }
}
__name(stringifyAudioTrack, "stringifyAudioTrack");
function parseAudioTrack(audioTrack) {
  if (audioTrack) {
    const [id, kind, language, label] = audioTrack.split(":");
    return {
      id,
      kind,
      language,
      label
    };
  }
}
__name(parseAudioTrack, "parseAudioTrack");
function camelCase(name) {
  return name.replace(/[-_]([a-z])/g, ($0, $1) => $1.toUpperCase());
}
__name(camelCase, "camelCase");
function isValidNumber(x2) {
  return typeof x2 === "number" && !Number.isNaN(x2) && Number.isFinite(x2);
}
__name(isValidNumber, "isValidNumber");
function isNumericString(str) {
  if (typeof str != "string")
    return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
__name(isNumericString, "isNumericString");
const delay = /* @__PURE__ */ __name((ms) => new Promise((resolve) => setTimeout(resolve, ms)), "delay");
const UnitLabels = [
  {
    singular: "hour",
    plural: "hours"
  },
  {
    singular: "minute",
    plural: "minutes"
  },
  {
    singular: "second",
    plural: "seconds"
  }
];
const toTimeUnitPhrase = /* @__PURE__ */ __name((timeUnitValue, unitIndex) => {
  const unitLabel = timeUnitValue === 1 ? UnitLabels[unitIndex].singular : UnitLabels[unitIndex].plural;
  return `${timeUnitValue} ${unitLabel}`;
}, "toTimeUnitPhrase");
const formatAsTimePhrase = /* @__PURE__ */ __name((seconds) => {
  if (!isValidNumber(seconds))
    return "";
  const positiveSeconds = Math.abs(seconds);
  const negative = positiveSeconds !== seconds;
  const secondsDateTime = new Date(0, 0, 0, 0, 0, positiveSeconds, 0);
  const timeParts = [
    secondsDateTime.getHours(),
    secondsDateTime.getMinutes(),
    secondsDateTime.getSeconds()
  ];
  const timeString = timeParts.map(
    (timeUnitValue, index) => timeUnitValue && toTimeUnitPhrase(timeUnitValue, index)
  ).filter((x2) => x2).join(", ");
  const negativeSuffix = negative ? " remaining" : "";
  return `${timeString}${negativeSuffix}`;
}, "formatAsTimePhrase");
function formatTime(seconds, guide) {
  let negative = false;
  if (seconds < 0) {
    negative = true;
    seconds = 0 - seconds;
  }
  seconds = seconds < 0 ? 0 : seconds;
  let s2 = Math.floor(seconds % 60);
  let m2 = Math.floor(seconds / 60 % 60);
  let h2 = Math.floor(seconds / 3600);
  const gm = Math.floor(guide / 60 % 60);
  const gh = Math.floor(guide / 3600);
  if (isNaN(seconds) || seconds === Infinity) {
    h2 = m2 = s2 = "0";
  }
  h2 = h2 > 0 || gh > 0 ? h2 + ":" : "";
  m2 = ((h2 || gm >= 10) && m2 < 10 ? "0" + m2 : m2) + ":";
  s2 = s2 < 10 ? "0" + s2 : s2;
  return (negative ? "-" : "") + h2 + m2 + s2;
}
__name(formatTime, "formatTime");
const En = {
  "Start airplay": "Start airplay",
  "Stop airplay": "Stop airplay",
  Audio: "Audio",
  Captions: "Captions",
  "Enable captions": "Enable captions",
  "Disable captions": "Disable captions",
  "Start casting": "Start casting",
  "Stop casting": "Stop casting",
  "Enter fullscreen mode": "Enter fullscreen mode",
  "Exit fullscreen mode": "Exit fullscreen mode",
  Mute: "Mute",
  Unmute: "Unmute",
  Loop: "Loop",
  "Enter picture in picture mode": "Enter picture in picture mode",
  "Exit picture in picture mode": "Exit picture in picture mode",
  Play: "Play",
  Pause: "Pause",
  "Playback rate": "Playback rate",
  "Playback rate {playbackRate}": "Playback rate {playbackRate}",
  Quality: "Quality",
  "Seek backward": "Seek backward",
  "Seek forward": "Seek forward",
  Settings: "Settings",
  Auto: "Auto",
  "audio player": "audio player",
  "video player": "video player",
  volume: "volume",
  seek: "seek",
  "closed captions": "closed captions",
  "current playback rate": "current playback rate",
  "playback time": "playback time",
  "media loading": "media loading",
  settings: "settings",
  "audio tracks": "audio tracks",
  quality: "quality",
  play: "play",
  pause: "pause",
  mute: "mute",
  unmute: "unmute",
  "chapter: {chapterName}": "chapter: {chapterName}",
  live: "live",
  Off: "Off",
  "start airplay": "start airplay",
  "stop airplay": "stop airplay",
  "start casting": "start casting",
  "stop casting": "stop casting",
  "enter fullscreen mode": "enter fullscreen mode",
  "exit fullscreen mode": "exit fullscreen mode",
  "enter picture in picture mode": "enter picture in picture mode",
  "exit picture in picture mode": "exit picture in picture mode",
  "seek to live": "seek to live",
  "playing live": "playing live",
  "seek back {seekOffset} seconds": "seek back {seekOffset} seconds",
  "seek forward {seekOffset} seconds": "seek forward {seekOffset} seconds",
  "Network Error": "Network Error",
  "Decode Error": "Decode Error",
  "Source Not Supported": "Source Not Supported",
  "Encryption Error": "Encryption Error",
  "A network error caused the media download to fail.": "A network error caused the media download to fail.",
  "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.": "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",
  "An unsupported error occurred. The server or network failed, or your browser does not support this format.": "An unsupported error occurred. The server or network failed, or your browser does not support this format.",
  "The media is encrypted and there are no keys to decrypt it.": "The media is encrypted and there are no keys to decrypt it."
};
var _a$1;
const translations = {
  en: En
};
let currentLang = ((_a$1 = globalThis.navigator) == null ? void 0 : _a$1.language) || "en";
const setLanguage = /* @__PURE__ */ __name((langCode) => {
  currentLang = langCode;
}, "setLanguage");
const resolveTranslation = /* @__PURE__ */ __name((key) => {
  var _a22, _b2, _c2;
  const [base] = currentLang.split("-");
  return ((_a22 = translations[currentLang]) == null ? void 0 : _a22[key]) || ((_b2 = translations[base]) == null ? void 0 : _b2[key]) || ((_c2 = translations.en) == null ? void 0 : _c2[key]) || key;
}, "resolveTranslation");
const t = /* @__PURE__ */ __name((key, vars = {}) => resolveTranslation(key).replace(
  /\{(\w+)\}/g,
  (_2, v2) => v2 in vars ? String(vars[v2]) : `{${v2}}`
), "t");
let EventTarget$1 = (_h = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent() {
    return true;
  }
}, __name(_h, "EventTarget"), _h);
const _Node = class _Node extends EventTarget$1 {
};
__name(_Node, "Node");
let Node = _Node;
let Element$1 = (_i2 = class extends Node {
  constructor() {
    super(...arguments);
    this.role = null;
  }
}, __name(_i2, "Element"), _i2);
const _ResizeObserver = class _ResizeObserver {
  observe() {
  }
  unobserve() {
  }
  disconnect() {
  }
};
__name(_ResizeObserver, "ResizeObserver");
let ResizeObserver = _ResizeObserver;
const documentShim = {
  createElement: /* @__PURE__ */ __name(function() {
    return new globalThisShim.HTMLElement();
  }, "createElement"),
  createElementNS: /* @__PURE__ */ __name(function() {
    return new globalThisShim.HTMLElement();
  }, "createElementNS"),
  addEventListener() {
  },
  removeEventListener() {
  },
  dispatchEvent(_event) {
    return false;
  }
};
const globalThisShim = {
  ResizeObserver,
  document: documentShim,
  Node,
  Element: Element$1,
  HTMLElement: (_j = class extends Element$1 {
    constructor() {
      super(...arguments);
      this.innerHTML = "";
    }
    get content() {
      return new globalThisShim.DocumentFragment();
    }
  }, __name(_j, "HTMLElement"), _j),
  DocumentFragment: (_k = class extends EventTarget$1 {
  }, __name(_k, "DocumentFragment"), _k),
  customElements: {
    get: /* @__PURE__ */ __name(function() {
    }, "get"),
    define: /* @__PURE__ */ __name(function() {
    }, "define"),
    whenDefined: /* @__PURE__ */ __name(function() {
    }, "whenDefined")
  },
  localStorage: {
    getItem(_key) {
      return null;
    },
    setItem(_key, _value2) {
    },
    removeItem(_key) {
    }
  },
  CustomEvent: /* @__PURE__ */ __name(function CustomEvent2() {
  }, "CustomEvent"),
  getComputedStyle: /* @__PURE__ */ __name(function() {
  }, "getComputedStyle"),
  navigator: {
    languages: [],
    get userAgent() {
      return "";
    }
  },
  matchMedia(media) {
    return {
      matches: false,
      media
    };
  },
  DOMParser: (_l = class {
    parseFromString(string, _contentType) {
      return {
        body: {
          textContent: string
        }
      };
    }
  }, __name(_l, "DOMParser"), _l)
};
const isServer = "global" in globalThis && (globalThis == null ? void 0 : globalThis.global) === globalThis || // node or node-like environments, whether or not there are global polyfills like jsdom
typeof window === "undefined" || typeof window.customElements === "undefined";
const isShimmed = Object.keys(globalThisShim).every((key) => key in globalThis);
const GlobalThis = isServer && !isShimmed ? globalThisShim : globalThis;
const Document$1 = isServer && !isShimmed ? documentShim : globalThis.document;
const callbacksMap = /* @__PURE__ */ new WeakMap();
const getCallbacks = /* @__PURE__ */ __name((element) => {
  let callbacks = callbacksMap.get(element);
  if (!callbacks)
    callbacksMap.set(element, callbacks = /* @__PURE__ */ new Set());
  return callbacks;
}, "getCallbacks");
const observer = new GlobalThis.ResizeObserver(
  (entries) => {
    for (const entry of entries) {
      for (const callback of getCallbacks(entry.target)) {
        callback(entry);
      }
    }
  }
);
function observeResize(element, callback) {
  getCallbacks(element).add(callback);
  observer.observe(element);
}
__name(observeResize, "observeResize");
function unobserveResize(element, callback) {
  const callbacks = getCallbacks(element);
  callbacks.delete(callback);
  if (!callbacks.size) {
    observer.unobserve(element);
  }
}
__name(unobserveResize, "unobserveResize");
function namedNodeMapToObject(namedNodeMap) {
  const obj = {};
  for (const attr of namedNodeMap) {
    obj[attr.name] = attr.value;
  }
  return obj;
}
__name(namedNodeMapToObject, "namedNodeMapToObject");
function getMediaController(host) {
  var _a3;
  return (_a3 = getAttributeMediaController(host)) != null ? _a3 : closestComposedNode(host, "media-controller");
}
__name(getMediaController, "getMediaController");
function getAttributeMediaController(host) {
  var _a3;
  const { MEDIA_CONTROLLER } = MediaStateReceiverAttributes;
  const mediaControllerId = host.getAttribute(MEDIA_CONTROLLER);
  if (mediaControllerId) {
    return (_a3 = getDocumentOrShadowRoot(host)) == null ? void 0 : _a3.getElementById(
      mediaControllerId
    );
  }
}
__name(getAttributeMediaController, "getAttributeMediaController");
const updateIconText = /* @__PURE__ */ __name((svg, value, selector = ".value") => {
  const node = svg.querySelector(selector);
  if (!node)
    return;
  node.textContent = value;
}, "updateIconText");
const getAllSlotted = /* @__PURE__ */ __name((el, name) => {
  const slotSelector = `slot[name="${name}"]`;
  const slot = el.shadowRoot.querySelector(slotSelector);
  if (!slot)
    return [];
  return slot.children;
}, "getAllSlotted");
const getSlotted = /* @__PURE__ */ __name((el, name) => getAllSlotted(el, name)[0], "getSlotted");
const containsComposedNode = /* @__PURE__ */ __name((rootNode, childNode) => {
  if (!rootNode || !childNode)
    return false;
  if (rootNode == null ? void 0 : rootNode.contains(childNode))
    return true;
  return containsComposedNode(
    rootNode,
    childNode.getRootNode().host
  );
}, "containsComposedNode");
const closestComposedNode = /* @__PURE__ */ __name((childNode, selector) => {
  if (!childNode)
    return null;
  const closest = childNode.closest(selector);
  if (closest)
    return closest;
  return closestComposedNode(
    childNode.getRootNode().host,
    selector
  );
}, "closestComposedNode");
function getActiveElement(root = document) {
  var _a3;
  const activeEl = root == null ? void 0 : root.activeElement;
  if (!activeEl)
    return null;
  return (_a3 = getActiveElement(activeEl.shadowRoot)) != null ? _a3 : activeEl;
}
__name(getActiveElement, "getActiveElement");
function getDocumentOrShadowRoot(node) {
  var _a3;
  const rootNode = (_a3 = node == null ? void 0 : node.getRootNode) == null ? void 0 : _a3.call(node);
  if (rootNode instanceof ShadowRoot || rootNode instanceof Document) {
    return rootNode;
  }
  return null;
}
__name(getDocumentOrShadowRoot, "getDocumentOrShadowRoot");
function isElementVisible(element, { depth = 3, checkOpacity = true, checkVisibilityCSS = true } = {}) {
  if (element.checkVisibility) {
    return element.checkVisibility({
      checkOpacity,
      checkVisibilityCSS
    });
  }
  let el = element;
  while (el && depth > 0) {
    const style = getComputedStyle(el);
    if (checkOpacity && style.opacity === "0" || checkVisibilityCSS && style.visibility === "hidden" || style.display === "none") {
      return false;
    }
    el = el.parentElement;
    depth--;
  }
  return true;
}
__name(isElementVisible, "isElementVisible");
function getPointProgressOnLine(x2, y2, p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const lengthSquared = dx * dx + dy * dy;
  if (lengthSquared === 0)
    return 0;
  const projection = ((x2 - p1.x) * dx + (y2 - p1.y) * dy) / lengthSquared;
  return Math.max(0, Math.min(1, projection));
}
__name(getPointProgressOnLine, "getPointProgressOnLine");
function getOrInsertCSSRule(styleParent, selectorText) {
  const cssRule = getCSSRule(styleParent, (st2) => st2 === selectorText);
  if (cssRule)
    return cssRule;
  return insertCSSRule(styleParent, selectorText);
}
__name(getOrInsertCSSRule, "getOrInsertCSSRule");
function getCSSRule(styleParent, predicate) {
  var _a3, _b2;
  let style;
  for (style of (_a3 = styleParent.querySelectorAll("style:not([media])")) != null ? _a3 : []) {
    let cssRules;
    try {
      cssRules = (_b2 = style.sheet) == null ? void 0 : _b2.cssRules;
    } catch {
      continue;
    }
    for (const rule of cssRules != null ? cssRules : []) {
      if (predicate(rule.selectorText))
        return rule;
    }
  }
}
__name(getCSSRule, "getCSSRule");
function insertCSSRule(styleParent, selectorText) {
  var _a3, _b2;
  const styles = (_a3 = styleParent.querySelectorAll("style:not([media])")) != null ? _a3 : [];
  const style = styles == null ? void 0 : styles[styles.length - 1];
  if (!(style == null ? void 0 : style.sheet)) {
    console.warn(
      "Media Chrome: No style sheet found on style tag of",
      styleParent
    );
    return {
      // @ts-ignore
      style: {
        setProperty: /* @__PURE__ */ __name(() => {
        }, "setProperty"),
        removeProperty: /* @__PURE__ */ __name(() => "", "removeProperty"),
        getPropertyValue: /* @__PURE__ */ __name(() => "", "getPropertyValue")
      }
    };
  }
  style == null ? void 0 : style.sheet.insertRule(`${selectorText}{}`, style.sheet.cssRules.length);
  return (
    /** @type {CSSStyleRule} */
    (_b2 = style.sheet.cssRules) == null ? void 0 : _b2[style.sheet.cssRules.length - 1]
  );
}
__name(insertCSSRule, "insertCSSRule");
function getNumericAttr(el, attrName, defaultValue = Number.NaN) {
  const attrVal = el.getAttribute(attrName);
  return attrVal != null ? +attrVal : defaultValue;
}
__name(getNumericAttr, "getNumericAttr");
function setNumericAttr(el, attrName, value) {
  const nextNumericValue = +value;
  if (value == null || Number.isNaN(nextNumericValue)) {
    if (el.hasAttribute(attrName)) {
      el.removeAttribute(attrName);
    }
    return;
  }
  if (getNumericAttr(el, attrName, void 0) === nextNumericValue)
    return;
  el.setAttribute(attrName, `${nextNumericValue}`);
}
__name(setNumericAttr, "setNumericAttr");
function getBooleanAttr(el, attrName) {
  return el.hasAttribute(attrName);
}
__name(getBooleanAttr, "getBooleanAttr");
function setBooleanAttr(el, attrName, value) {
  if (value == null) {
    if (el.hasAttribute(attrName)) {
      el.removeAttribute(attrName);
    }
    return;
  }
  if (getBooleanAttr(el, attrName) == value)
    return;
  el.toggleAttribute(attrName, value);
}
__name(setBooleanAttr, "setBooleanAttr");
function getStringAttr(el, attrName, defaultValue = null) {
  var _a3;
  return (_a3 = el.getAttribute(attrName)) != null ? _a3 : defaultValue;
}
__name(getStringAttr, "getStringAttr");
function setStringAttr(el, attrName, value) {
  if (value == null) {
    if (el.hasAttribute(attrName)) {
      el.removeAttribute(attrName);
    }
    return;
  }
  const nextValue = `${value}`;
  if (getStringAttr(el, attrName, void 0) === nextValue)
    return;
  el.setAttribute(attrName, nextValue);
}
__name(setStringAttr, "setStringAttr");
var __accessCheck$t = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$t");
var __privateGet$t = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$t(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$t");
var __privateAdd$t = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$t");
var __privateSet$q = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$t(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$q");
var _mediaController$7;
function getTemplateHTML$i(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `
  );
}
__name(getTemplateHTML$i, "getTemplateHTML$i");
const _MediaGestureReceiver = class _MediaGestureReceiver extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$t(this, _mediaController$7, void 0);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  // NOTE: Currently "baking in" actions + attrs until we come up with
  // a more robust architecture (CJP)
  static get observedAttributes() {
    return [
      MediaStateReceiverAttributes.MEDIA_CONTROLLER,
      MediaUIAttributes.MEDIA_PAUSED
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2, _e3;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b2 = (_a3 = __privateGet$t(this, _mediaController$7)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
        __privateSet$q(this, _mediaController$7, null);
      }
      if (newValue && this.isConnected) {
        __privateSet$q(this, _mediaController$7, (_c2 = this.getRootNode()) == null ? void 0 : _c2.getElementById(newValue));
        (_e3 = (_d2 = __privateGet$t(this, _mediaController$7)) == null ? void 0 : _d2.associateElement) == null ? void 0 : _e3.call(_d2, this);
      }
    }
  }
  connectedCallback() {
    var _a3, _b2, _c2, _d2;
    this.tabIndex = -1;
    this.setAttribute("aria-hidden", "true");
    __privateSet$q(this, _mediaController$7, getMediaControllerEl(this));
    if (this.getAttribute(MediaStateReceiverAttributes.MEDIA_CONTROLLER)) {
      (_b2 = (_a3 = __privateGet$t(this, _mediaController$7)) == null ? void 0 : _a3.associateElement) == null ? void 0 : _b2.call(_a3, this);
    }
    (_c2 = __privateGet$t(this, _mediaController$7)) == null ? void 0 : _c2.addEventListener("pointerdown", this);
    (_d2 = __privateGet$t(this, _mediaController$7)) == null ? void 0 : _d2.addEventListener("click", this);
  }
  disconnectedCallback() {
    var _a3, _b2, _c2, _d2;
    if (this.getAttribute(MediaStateReceiverAttributes.MEDIA_CONTROLLER)) {
      (_b2 = (_a3 = __privateGet$t(this, _mediaController$7)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
    }
    (_c2 = __privateGet$t(this, _mediaController$7)) == null ? void 0 : _c2.removeEventListener("pointerdown", this);
    (_d2 = __privateGet$t(this, _mediaController$7)) == null ? void 0 : _d2.removeEventListener("click", this);
    __privateSet$q(this, _mediaController$7, null);
  }
  handleEvent(event) {
    var _a3;
    const composedTarget = (_a3 = event.composedPath()) == null ? void 0 : _a3[0];
    const allowList = ["video", "media-controller"];
    if (!allowList.includes(composedTarget == null ? void 0 : composedTarget.localName))
      return;
    if (event.type === "pointerdown") {
      this._pointerType = event.pointerType;
    } else if (event.type === "click") {
      const { clientX, clientY } = event;
      const { left, top, width, height } = this.getBoundingClientRect();
      const x2 = clientX - left;
      const y2 = clientY - top;
      if (x2 < 0 || y2 < 0 || x2 > width || y2 > height || // In case this element has no dimensions (or display: none) return.
      width === 0 && height === 0) {
        return;
      }
      const pointerType = this._pointerType || "mouse";
      this._pointerType = void 0;
      if (pointerType === PointerTypes.TOUCH) {
        this.handleTap(event);
        return;
      } else if (pointerType === PointerTypes.MOUSE || pointerType === PointerTypes.PEN) {
        this.handleMouseClick(event);
        return;
      }
    }
  }
  /**
   * @type {boolean} Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  // NOTE: Currently "baking in" actions + attrs until we come up with
  // a more robust architecture (CJP)
  /**
   * @abstract
   * @argument {Event} e
   */
  handleTap(e2) {
  }
  // eslint-disable-line
  // eslint-disable-next-line
  handleMouseClick(e2) {
    const eventName = this.mediaPaused ? MediaUIEvents.MEDIA_PLAY_REQUEST : MediaUIEvents.MEDIA_PAUSE_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
__name(_MediaGestureReceiver, "MediaGestureReceiver");
let MediaGestureReceiver = _MediaGestureReceiver;
_mediaController$7 = /* @__PURE__ */ new WeakMap();
MediaGestureReceiver.shadowRootOptions = { mode: "open" };
MediaGestureReceiver.getTemplateHTML = getTemplateHTML$i;
function getMediaControllerEl(controlEl) {
  var _a3;
  const mediaControllerId = controlEl.getAttribute(
    MediaStateReceiverAttributes.MEDIA_CONTROLLER
  );
  if (mediaControllerId) {
    return (_a3 = controlEl.getRootNode()) == null ? void 0 : _a3.getElementById(mediaControllerId);
  }
  return closestComposedNode(controlEl, "media-controller");
}
__name(getMediaControllerEl, "getMediaControllerEl");
if (!GlobalThis.customElements.get("media-gesture-receiver")) {
  GlobalThis.customElements.define(
    "media-gesture-receiver",
    MediaGestureReceiver
  );
}
var media_gesture_receiver_default = MediaGestureReceiver;
var __accessCheck$s = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$s");
var __privateGet$s = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$s(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$s");
var __privateAdd$s = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$s");
var __privateSet$p = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$s(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$p");
var __privateMethod$d = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$s(obj, member, "access private method");
  return method;
}, "__privateMethod$d");
var _pointerDownTimeStamp, _currentMedia, _inactiveTimeout, _autohide, _mutationObserver$1, _handleMutation, handleMutation_fn, _isResizePending, _handleResize, _handlePointerMove$2, handlePointerMove_fn$2, _handlePointerUp$1, handlePointerUp_fn$1, _setInactive, setInactive_fn, _setActive, setActive_fn, _scheduleInactive, scheduleInactive_fn;
const Attributes$d = {
  AUDIO: "audio",
  AUTOHIDE: "autohide",
  BREAKPOINTS: "breakpoints",
  GESTURES_DISABLED: "gesturesdisabled",
  KEYBOARD_CONTROL: "keyboardcontrol",
  NO_AUTOHIDE: "noautohide",
  USER_INACTIVE: "userinactive",
  AUTOHIDE_OVER_CONTROLS: "autohideovercontrols"
};
function getTemplateHTML$h(_attrs) {
  return (
    /*html*/
    `
    <style>
      ${/*
    * outline on media is turned off because it is allowed to get focus to faciliate hotkeys.
    * However, on keyboard interactions, the focus outline is shown,
    * which is particularly noticeable when going fullscreen via hotkeys.
    */
    ""}
      :host([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
        outline: none;
      }

      :host {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        line-height: 0;
        background-color: var(--media-background-color, #000);
        overflow: hidden;
      }

      :host(:not([${Attributes$d.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        display: flex;
        flex-flow: column nowrap;
        align-items: start;
        pointer-events: none;
        background: none;
      }

      slot[name=media] {
        display: var(--media-slot-display, contents);
      }

      ${/*
    * when in audio mode, hide the slotted media element by default
    */
    ""}
      :host([${Attributes$d.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      ${/*
    * when in audio mode, hide the gesture-layer which causes media-controller to be taller than the control bar
    */
    ""}
      :host([${Attributes$d.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      ${/*
    * if gestures are disabled, don't accept pointer-events
    */
    ""}
      :host(:not([${Attributes$d.AUDIO}])[${Attributes$d.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${Attributes$d.AUDIO}])[${Attributes$d.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      ${/*
    * any slotted element that isn't a poster or media slot should be pointer-events auto
    * we'll want to add here any slotted elements that shouldn't get pointer-events by default when slotted
    */
    ""}
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${Attributes$d.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${Attributes$d.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${Attributes$d.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      ${/* Position the media and poster elements to fill the container */
    ""}
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      ${/* Video specific styles */
    ""}
      :host(:not([${Attributes$d.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      ${/* Safari needs this to actually make the element fill the window */
    ""}
      :host(:-webkit-full-screen) {
        ${/* Needs to use !important otherwise easy to break */
    ""}
        width: 100% !important;
        height: 100% !important;
      }

      ${/* Only add these if auto hide is not disabled */
    ""}
      ::slotted(:not([slot=media]):not([slot=poster]):not([${Attributes$d.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      ${/* Hide controls when inactive, not paused, not audio and auto hide not disabled */
    ""}
      :host([${Attributes$d.USER_INACTIVE}]:not([${MediaUIAttributes.MEDIA_PAUSED}]):not([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}]):not([${MediaUIAttributes.MEDIA_IS_CASTING}]):not([${Attributes$d.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${Attributes$d.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${Attributes$d.USER_INACTIVE}]:not([${Attributes$d.NO_AUTOHIDE}]):not([${MediaUIAttributes.MEDIA_PAUSED}]):not([${MediaUIAttributes.MEDIA_IS_CASTING}]):not([${Attributes$d.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${Attributes$d.USER_INACTIVE}][${Attributes$d.AUTOHIDE_OVER_CONTROLS}]:not([${Attributes$d.NO_AUTOHIDE}]):not([${MediaUIAttributes.MEDIA_PAUSED}]):not([${MediaUIAttributes.MEDIA_IS_CASTING}]):not([${Attributes$d.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      ${/* ::slotted([slot=poster]) doesn't work for slot fallback content so hide parent slot instead */
    ""}
      :host(:not([${Attributes$d.AUDIO}])[${MediaUIAttributes.MEDIA_HAS_PLAYED}]) slot[name=poster] {
        display: none;
      }

      ::slotted([role=dialog]) {
        width: 100%;
        height: 100%;
        align-self: center;
      }

      ::slotted([role=menu]) {
        align-self: end;
      }
    </style>

    <slot name="media" part="layer media-layer"></slot>
    <slot name="poster" part="layer poster-layer"></slot>
    <slot name="gestures-chrome" part="layer gesture-layer">
      <media-gesture-receiver slot="gestures-chrome">
        <template shadowrootmode="${media_gesture_receiver_default.shadowRootOptions.mode}">
          ${media_gesture_receiver_default.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      ${/* default, effectively "bottom-chrome" */
    ""}
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `
  );
}
__name(getTemplateHTML$h, "getTemplateHTML$h");
const MEDIA_UI_ATTRIBUTE_NAMES$1 = Object.values(MediaUIAttributes);
const defaultBreakpoints = "sm:384 md:576 lg:768 xl:960";
function resizeCallback(entry) {
  setBreakpoints(entry.target, entry.contentRect.width);
}
__name(resizeCallback, "resizeCallback");
function setBreakpoints(container, width) {
  var _a3;
  if (!container.isConnected)
    return;
  const breakpoints = (_a3 = container.getAttribute(Attributes$d.BREAKPOINTS)) != null ? _a3 : defaultBreakpoints;
  const ranges = createBreakpointMap(breakpoints);
  const activeBreakpoints = getBreakpoints(ranges, width);
  let changed = false;
  Object.keys(ranges).forEach((name) => {
    if (activeBreakpoints.includes(name)) {
      if (!container.hasAttribute(`breakpoint${name}`)) {
        container.setAttribute(`breakpoint${name}`, "");
        changed = true;
      }
      return;
    }
    if (container.hasAttribute(`breakpoint${name}`)) {
      container.removeAttribute(`breakpoint${name}`);
      changed = true;
    }
  });
  if (changed) {
    const evt = new CustomEvent(MediaStateChangeEvents.BREAKPOINTS_CHANGE, {
      detail: activeBreakpoints
    });
    container.dispatchEvent(evt);
  }
  if (!container.breakpointsComputed) {
    container.breakpointsComputed = true;
    container.dispatchEvent(
      new CustomEvent(MediaStateChangeEvents.BREAKPOINTS_COMPUTED, {
        bubbles: true,
        composed: true
      })
    );
  }
}
__name(setBreakpoints, "setBreakpoints");
function createBreakpointMap(breakpoints) {
  const pairs = breakpoints.split(/\s+/);
  return Object.fromEntries(pairs.map((pair) => pair.split(":")));
}
__name(createBreakpointMap, "createBreakpointMap");
function getBreakpoints(breakpoints, width) {
  return Object.keys(breakpoints).filter((name) => {
    return width >= parseInt(breakpoints[name]);
  });
}
__name(getBreakpoints, "getBreakpoints");
const _MediaContainer = class _MediaContainer extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$s(this, _handleMutation);
    __privateAdd$s(this, _handlePointerMove$2);
    __privateAdd$s(this, _handlePointerUp$1);
    __privateAdd$s(this, _setInactive);
    __privateAdd$s(this, _setActive);
    __privateAdd$s(this, _scheduleInactive);
    __privateAdd$s(this, _pointerDownTimeStamp, 0);
    __privateAdd$s(this, _currentMedia, null);
    __privateAdd$s(this, _inactiveTimeout, null);
    __privateAdd$s(this, _autohide, void 0);
    this.breakpointsComputed = false;
    __privateAdd$s(this, _mutationObserver$1, new MutationObserver(__privateMethod$d(this, _handleMutation, handleMutation_fn).bind(this)));
    __privateAdd$s(this, _isResizePending, false);
    __privateAdd$s(this, _handleResize, (entry) => {
      if (__privateGet$s(this, _isResizePending))
        return;
      setTimeout(() => {
        resizeCallback(entry);
        __privateSet$p(this, _isResizePending, false);
      }, 0);
      __privateSet$p(this, _isResizePending, true);
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      const html = this.constructor.getTemplateHTML(attrs);
      this.shadowRoot.setHTMLUnsafe ? this.shadowRoot.setHTMLUnsafe(html) : this.shadowRoot.innerHTML = html;
    }
    const chainedSlot = this.querySelector(
      ":scope > slot[slot=media]"
    );
    if (chainedSlot) {
      chainedSlot.addEventListener("slotchange", () => {
        const slotEls = chainedSlot.assignedElements({ flatten: true });
        if (!slotEls.length) {
          if (__privateGet$s(this, _currentMedia)) {
            this.mediaUnsetCallback(__privateGet$s(this, _currentMedia));
          }
          return;
        }
        this.handleMediaUpdated(this.media);
      });
    }
  }
  static get observedAttributes() {
    return [Attributes$d.AUTOHIDE, Attributes$d.GESTURES_DISABLED].concat(MEDIA_UI_ATTRIBUTE_NAMES$1).filter(
      (name) => ![
        MediaUIAttributes.MEDIA_RENDITION_LIST,
        MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST,
        MediaUIAttributes.MEDIA_CHAPTERS_CUES,
        MediaUIAttributes.MEDIA_WIDTH,
        MediaUIAttributes.MEDIA_HEIGHT,
        MediaUIAttributes.MEDIA_ERROR,
        MediaUIAttributes.MEDIA_ERROR_MESSAGE
      ].includes(name)
    );
  }
  // Could share this code with media-chrome-html-element instead
  attributeChangedCallback(attrName, _oldValue, newValue) {
    if (attrName.toLowerCase() == Attributes$d.AUTOHIDE) {
      this.autohide = newValue;
    }
  }
  // First direct child with slot=media, or null
  get media() {
    let media = this.querySelector(":scope > [slot=media]");
    if ((media == null ? void 0 : media.nodeName) == "SLOT")
      media = media.assignedElements({ flatten: true })[0];
    return media;
  }
  async handleMediaUpdated(media) {
    if (!media)
      return;
    __privateSet$p(this, _currentMedia, media);
    if (media.localName.includes("-")) {
      await GlobalThis.customElements.whenDefined(media.localName);
    }
    this.mediaSetCallback(media);
  }
  connectedCallback() {
    var _a3;
    __privateGet$s(this, _mutationObserver$1).observe(this, { childList: true, subtree: true });
    observeResize(this, __privateGet$s(this, _handleResize));
    const isAudioChrome = this.getAttribute(Attributes$d.AUDIO) != null;
    const label = isAudioChrome ? t("audio player") : t("video player");
    this.setAttribute("role", "region");
    this.setAttribute("aria-label", label);
    this.handleMediaUpdated(this.media);
    this.setAttribute(Attributes$d.USER_INACTIVE, "");
    setBreakpoints(this, this.getBoundingClientRect().width);
    this.addEventListener("pointerdown", this);
    this.addEventListener("pointermove", this);
    this.addEventListener("pointerup", this);
    this.addEventListener("mouseleave", this);
    this.addEventListener("keyup", this);
    (_a3 = GlobalThis.window) == null ? void 0 : _a3.addEventListener("mouseup", this);
  }
  disconnectedCallback() {
    var _a3;
    __privateGet$s(this, _mutationObserver$1).disconnect();
    unobserveResize(this, __privateGet$s(this, _handleResize));
    if (this.media) {
      this.mediaUnsetCallback(this.media);
    }
    (_a3 = GlobalThis.window) == null ? void 0 : _a3.removeEventListener("mouseup", this);
  }
  /**
   * @abstract
   */
  mediaSetCallback(_media2) {
  }
  mediaUnsetCallback(_media2) {
    __privateSet$p(this, _currentMedia, null);
  }
  handleEvent(event) {
    switch (event.type) {
      case "pointerdown":
        __privateSet$p(this, _pointerDownTimeStamp, event.timeStamp);
        break;
      case "pointermove":
        __privateMethod$d(this, _handlePointerMove$2, handlePointerMove_fn$2).call(this, event);
        break;
      case "pointerup":
        __privateMethod$d(this, _handlePointerUp$1, handlePointerUp_fn$1).call(this, event);
        break;
      case "mouseleave":
        __privateMethod$d(this, _setInactive, setInactive_fn).call(this);
        break;
      case "mouseup":
        this.removeAttribute(Attributes$d.KEYBOARD_CONTROL);
        break;
      case "keyup":
        __privateMethod$d(this, _scheduleInactive, scheduleInactive_fn).call(this);
        this.setAttribute(Attributes$d.KEYBOARD_CONTROL, "");
        break;
    }
  }
  set autohide(seconds) {
    const parsedSeconds = Number(seconds);
    __privateSet$p(this, _autohide, isNaN(parsedSeconds) ? 0 : parsedSeconds);
  }
  get autohide() {
    return (__privateGet$s(this, _autohide) === void 0 ? 2 : __privateGet$s(this, _autohide)).toString();
  }
  get breakpoints() {
    return getStringAttr(this, Attributes$d.BREAKPOINTS);
  }
  set breakpoints(value) {
    setStringAttr(this, Attributes$d.BREAKPOINTS, value);
  }
  get audio() {
    return getBooleanAttr(this, Attributes$d.AUDIO);
  }
  set audio(value) {
    setBooleanAttr(this, Attributes$d.AUDIO, value);
  }
  get gesturesDisabled() {
    return getBooleanAttr(this, Attributes$d.GESTURES_DISABLED);
  }
  set gesturesDisabled(value) {
    setBooleanAttr(this, Attributes$d.GESTURES_DISABLED, value);
  }
  get keyboardControl() {
    return getBooleanAttr(this, Attributes$d.KEYBOARD_CONTROL);
  }
  set keyboardControl(value) {
    setBooleanAttr(this, Attributes$d.KEYBOARD_CONTROL, value);
  }
  get noAutohide() {
    return getBooleanAttr(this, Attributes$d.NO_AUTOHIDE);
  }
  set noAutohide(value) {
    setBooleanAttr(this, Attributes$d.NO_AUTOHIDE, value);
  }
  get autohideOverControls() {
    return getBooleanAttr(this, Attributes$d.AUTOHIDE_OVER_CONTROLS);
  }
  set autohideOverControls(value) {
    setBooleanAttr(this, Attributes$d.AUTOHIDE_OVER_CONTROLS, value);
  }
  get userInteractive() {
    return getBooleanAttr(this, Attributes$d.USER_INACTIVE);
  }
  set userInteractive(value) {
    setBooleanAttr(this, Attributes$d.USER_INACTIVE, value);
  }
};
__name(_MediaContainer, "MediaContainer");
let MediaContainer = _MediaContainer;
_pointerDownTimeStamp = /* @__PURE__ */ new WeakMap();
_currentMedia = /* @__PURE__ */ new WeakMap();
_inactiveTimeout = /* @__PURE__ */ new WeakMap();
_autohide = /* @__PURE__ */ new WeakMap();
_mutationObserver$1 = /* @__PURE__ */ new WeakMap();
_handleMutation = /* @__PURE__ */ new WeakSet();
handleMutation_fn = /* @__PURE__ */ __name(function(mutationsList) {
  const media = this.media;
  for (const mutation of mutationsList) {
    if (mutation.type !== "childList")
      continue;
    const removedNodes = mutation.removedNodes;
    for (const node of removedNodes) {
      if (node.slot != "media" || mutation.target != this)
        continue;
      let previousSibling = mutation.previousSibling && mutation.previousSibling.previousElementSibling;
      if (!previousSibling || !media) {
        this.mediaUnsetCallback(node);
      } else {
        let wasFirst = previousSibling.slot !== "media";
        while ((previousSibling = previousSibling.previousSibling) !== null) {
          if (previousSibling.slot == "media")
            wasFirst = false;
        }
        if (wasFirst)
          this.mediaUnsetCallback(node);
      }
    }
    if (media) {
      for (const node of mutation.addedNodes) {
        if (node === media)
          this.handleMediaUpdated(media);
      }
    }
  }
}, "handleMutation_fn");
_isResizePending = /* @__PURE__ */ new WeakMap();
_handleResize = /* @__PURE__ */ new WeakMap();
_handlePointerMove$2 = /* @__PURE__ */ new WeakSet();
handlePointerMove_fn$2 = /* @__PURE__ */ __name(function(event) {
  if (event.pointerType !== "mouse") {
    const MAX_TAP_DURATION = 250;
    if (event.timeStamp - __privateGet$s(this, _pointerDownTimeStamp) < MAX_TAP_DURATION)
      return;
  }
  __privateMethod$d(this, _setActive, setActive_fn).call(this);
  clearTimeout(__privateGet$s(this, _inactiveTimeout));
  const autohideOverControls = this.hasAttribute(
    Attributes$d.AUTOHIDE_OVER_CONTROLS
  );
  if ([this, this.media].includes(event.target) || autohideOverControls) {
    __privateMethod$d(this, _scheduleInactive, scheduleInactive_fn).call(this);
  }
}, "handlePointerMove_fn$2");
_handlePointerUp$1 = /* @__PURE__ */ new WeakSet();
handlePointerUp_fn$1 = /* @__PURE__ */ __name(function(event) {
  if (event.pointerType === "touch") {
    const controlsVisible = !this.hasAttribute(Attributes$d.USER_INACTIVE);
    if ([this, this.media].includes(event.target) && controlsVisible) {
      __privateMethod$d(this, _setInactive, setInactive_fn).call(this);
    } else {
      __privateMethod$d(this, _scheduleInactive, scheduleInactive_fn).call(this);
    }
  } else if (event.composedPath().some(
    (el) => ["media-play-button", "media-fullscreen-button"].includes(
      el == null ? void 0 : el.localName
    )
  )) {
    __privateMethod$d(this, _scheduleInactive, scheduleInactive_fn).call(this);
  }
}, "handlePointerUp_fn$1");
_setInactive = /* @__PURE__ */ new WeakSet();
setInactive_fn = /* @__PURE__ */ __name(function() {
  if (__privateGet$s(this, _autohide) < 0)
    return;
  if (this.hasAttribute(Attributes$d.USER_INACTIVE))
    return;
  this.setAttribute(Attributes$d.USER_INACTIVE, "");
  const evt = new GlobalThis.CustomEvent(
    MediaStateChangeEvents.USER_INACTIVE_CHANGE,
    { composed: true, bubbles: true, detail: true }
  );
  this.dispatchEvent(evt);
}, "setInactive_fn");
_setActive = /* @__PURE__ */ new WeakSet();
setActive_fn = /* @__PURE__ */ __name(function() {
  if (!this.hasAttribute(Attributes$d.USER_INACTIVE))
    return;
  this.removeAttribute(Attributes$d.USER_INACTIVE);
  const evt = new GlobalThis.CustomEvent(
    MediaStateChangeEvents.USER_INACTIVE_CHANGE,
    { composed: true, bubbles: true, detail: false }
  );
  this.dispatchEvent(evt);
}, "setActive_fn");
_scheduleInactive = /* @__PURE__ */ new WeakSet();
scheduleInactive_fn = /* @__PURE__ */ __name(function() {
  __privateMethod$d(this, _setActive, setActive_fn).call(this);
  clearTimeout(__privateGet$s(this, _inactiveTimeout));
  const autohide = parseInt(this.autohide);
  if (autohide < 0)
    return;
  __privateSet$p(this, _inactiveTimeout, setTimeout(() => {
    __privateMethod$d(this, _setInactive, setInactive_fn).call(this);
  }, autohide * 1e3));
}, "scheduleInactive_fn");
MediaContainer.shadowRootOptions = { mode: "open" };
MediaContainer.getTemplateHTML = getTemplateHTML$h;
if (!GlobalThis.customElements.get("media-container")) {
  GlobalThis.customElements.define("media-container", MediaContainer);
}
var __accessCheck$r = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$r");
var __privateGet$r = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$r(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$r");
var __privateAdd$r = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$r");
var __privateSet$o = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$r(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$o");
var _el, _attr, _defaultSet, _tokenSet, _tokens, tokens_get;
const _AttributeTokenList = class _AttributeTokenList {
  constructor(el, attr, { defaultValue } = { defaultValue: void 0 }) {
    __privateAdd$r(this, _tokens);
    __privateAdd$r(this, _el, void 0);
    __privateAdd$r(this, _attr, void 0);
    __privateAdd$r(this, _defaultSet, void 0);
    __privateAdd$r(this, _tokenSet, /* @__PURE__ */ new Set());
    __privateSet$o(this, _el, el);
    __privateSet$o(this, _attr, attr);
    __privateSet$o(this, _defaultSet, new Set(defaultValue));
  }
  [Symbol.iterator]() {
    return __privateGet$r(this, _tokens, tokens_get).values();
  }
  get length() {
    return __privateGet$r(this, _tokens, tokens_get).size;
  }
  get value() {
    var _a3;
    return (_a3 = [...__privateGet$r(this, _tokens, tokens_get)].join(" ")) != null ? _a3 : "";
  }
  set value(val) {
    var _a3;
    if (val === this.value)
      return;
    __privateSet$o(this, _tokenSet, /* @__PURE__ */ new Set());
    this.add(...(_a3 = val == null ? void 0 : val.split(" ")) != null ? _a3 : []);
  }
  toString() {
    return this.value;
  }
  item(index) {
    return [...__privateGet$r(this, _tokens, tokens_get)][index];
  }
  values() {
    return __privateGet$r(this, _tokens, tokens_get).values();
  }
  forEach(callback, thisArg) {
    __privateGet$r(this, _tokens, tokens_get).forEach(callback, thisArg);
  }
  add(...tokens) {
    var _a3, _b2;
    tokens.forEach((t2) => __privateGet$r(this, _tokenSet).add(t2));
    if (this.value === "" && !((_a3 = __privateGet$r(this, _el)) == null ? void 0 : _a3.hasAttribute(`${__privateGet$r(this, _attr)}`))) {
      return;
    }
    (_b2 = __privateGet$r(this, _el)) == null ? void 0 : _b2.setAttribute(`${__privateGet$r(this, _attr)}`, `${this.value}`);
  }
  remove(...tokens) {
    var _a3;
    tokens.forEach((t2) => __privateGet$r(this, _tokenSet).delete(t2));
    (_a3 = __privateGet$r(this, _el)) == null ? void 0 : _a3.setAttribute(`${__privateGet$r(this, _attr)}`, `${this.value}`);
  }
  contains(token) {
    return __privateGet$r(this, _tokens, tokens_get).has(token);
  }
  toggle(token, force) {
    if (typeof force !== "undefined") {
      if (force) {
        this.add(token);
        return true;
      } else {
        this.remove(token);
        return false;
      }
    }
    if (this.contains(token)) {
      this.remove(token);
      return false;
    }
    this.add(token);
    return true;
  }
  replace(oldToken, newToken) {
    this.remove(oldToken);
    this.add(newToken);
    return oldToken === newToken;
  }
};
__name(_AttributeTokenList, "AttributeTokenList");
let AttributeTokenList = _AttributeTokenList;
_el = /* @__PURE__ */ new WeakMap();
_attr = /* @__PURE__ */ new WeakMap();
_defaultSet = /* @__PURE__ */ new WeakMap();
_tokenSet = /* @__PURE__ */ new WeakMap();
_tokens = /* @__PURE__ */ new WeakSet();
tokens_get = /* @__PURE__ */ __name(function() {
  return __privateGet$r(this, _tokenSet).size ? __privateGet$r(this, _tokenSet) : __privateGet$r(this, _defaultSet);
}, "tokens_get");
const splitTextTracksStr = /* @__PURE__ */ __name((textTracksStr = "") => textTracksStr.split(/\s+/), "splitTextTracksStr");
const parseTextTrackStr = /* @__PURE__ */ __name((textTrackStr = "") => {
  const [kind, language, encodedLabel] = textTrackStr.split(":");
  const label = encodedLabel ? decodeURIComponent(encodedLabel) : void 0;
  return {
    kind: kind === "cc" ? TextTrackKinds.CAPTIONS : TextTrackKinds.SUBTITLES,
    language,
    label
  };
}, "parseTextTrackStr");
const parseTextTracksStr = /* @__PURE__ */ __name((textTracksStr = "", textTrackLikeObj = {}) => {
  return splitTextTracksStr(textTracksStr).map((textTrackStr) => {
    const textTrackObj = parseTextTrackStr(textTrackStr);
    return {
      ...textTrackLikeObj,
      ...textTrackObj
    };
  });
}, "parseTextTracksStr");
const parseTracks = /* @__PURE__ */ __name((trackOrTracks) => {
  if (!trackOrTracks)
    return [];
  if (Array.isArray(trackOrTracks)) {
    return trackOrTracks.map((trackObjOrStr) => {
      if (typeof trackObjOrStr === "string") {
        return parseTextTrackStr(trackObjOrStr);
      }
      return trackObjOrStr;
    });
  }
  if (typeof trackOrTracks === "string") {
    return parseTextTracksStr(trackOrTracks);
  }
  return [trackOrTracks];
}, "parseTracks");
const formatTextTrackObj = /* @__PURE__ */ __name(({ kind, label, language } = { kind: "subtitles" }) => {
  if (!label)
    return language;
  return `${kind === "captions" ? "cc" : "sb"}:${language}:${encodeURIComponent(
    label
  )}`;
}, "formatTextTrackObj");
const stringifyTextTrackList = /* @__PURE__ */ __name((textTracks = []) => {
  return Array.prototype.map.call(textTracks, formatTextTrackObj).join(" ");
}, "stringifyTextTrackList");
const isMatchingPropOf = /* @__PURE__ */ __name((key, value) => (obj) => obj[key] === value, "isMatchingPropOf");
const textTrackObjAsPred = /* @__PURE__ */ __name((filterObj) => {
  const preds = Object.entries(filterObj).map(([key, value]) => {
    return isMatchingPropOf(key, value);
  });
  return (textTrack) => preds.every((pred) => pred(textTrack));
}, "textTrackObjAsPred");
const updateTracksModeTo = /* @__PURE__ */ __name((mode, tracks = [], tracksToUpdate = []) => {
  const preds = parseTracks(tracksToUpdate).map(textTrackObjAsPred);
  const isTrackToUpdate = /* @__PURE__ */ __name((textTrack) => {
    return preds.some((pred) => pred(textTrack));
  }, "isTrackToUpdate");
  Array.from(tracks).filter(isTrackToUpdate).forEach((textTrack) => {
    textTrack.mode = mode;
  });
}, "updateTracksModeTo");
const getTextTracksList = /* @__PURE__ */ __name((media, filterPredOrObj = () => true) => {
  if (!(media == null ? void 0 : media.textTracks))
    return [];
  const filterPred = typeof filterPredOrObj === "function" ? filterPredOrObj : textTrackObjAsPred(filterPredOrObj);
  return Array.from(media.textTracks).filter(filterPred);
}, "getTextTracksList");
const areSubsOn = /* @__PURE__ */ __name((el) => {
  var _a3;
  const showingSubtitles = !!((_a3 = el.mediaSubtitlesShowing) == null ? void 0 : _a3.length) || el.hasAttribute(MediaUIAttributes.MEDIA_SUBTITLES_SHOWING);
  return showingSubtitles;
}, "areSubsOn");
const enterFullscreen = /* @__PURE__ */ __name((stateOwners) => {
  var _a3;
  const { media, fullscreenElement } = stateOwners;
  try {
    const enterFullscreenKey = fullscreenElement && "requestFullscreen" in fullscreenElement ? "requestFullscreen" : fullscreenElement && "webkitRequestFullScreen" in fullscreenElement ? "webkitRequestFullScreen" : void 0;
    if (enterFullscreenKey) {
      const maybePromise = (_a3 = fullscreenElement[enterFullscreenKey]) == null ? void 0 : _a3.call(fullscreenElement);
      if (maybePromise instanceof Promise) {
        return maybePromise.catch(() => {
        });
      }
    } else if (media == null ? void 0 : media.webkitEnterFullscreen) {
      media.webkitEnterFullscreen();
    } else if (media == null ? void 0 : media.requestFullscreen) {
      media.requestFullscreen();
    }
  } catch (e2) {
    console.error(e2);
  }
}, "enterFullscreen");
const exitFullscreenKey = "exitFullscreen" in Document$1 ? "exitFullscreen" : "webkitExitFullscreen" in Document$1 ? "webkitExitFullscreen" : "webkitCancelFullScreen" in Document$1 ? "webkitCancelFullScreen" : void 0;
const exitFullscreen = /* @__PURE__ */ __name((stateOwners) => {
  var _a3;
  const { documentElement } = stateOwners;
  if (exitFullscreenKey) {
    const maybePromise = (_a3 = documentElement == null ? void 0 : documentElement[exitFullscreenKey]) == null ? void 0 : _a3.call(documentElement);
    if (maybePromise instanceof Promise) {
      return maybePromise.catch(() => {
      });
    }
  }
}, "exitFullscreen");
const fullscreenElementKey = "fullscreenElement" in Document$1 ? "fullscreenElement" : "webkitFullscreenElement" in Document$1 ? "webkitFullscreenElement" : void 0;
const getFullscreenElement = /* @__PURE__ */ __name((stateOwners) => {
  const { documentElement, media } = stateOwners;
  const docFullscreenElement = documentElement == null ? void 0 : documentElement[fullscreenElementKey];
  if (!docFullscreenElement && "webkitDisplayingFullscreen" in media && "webkitPresentationMode" in media && media.webkitDisplayingFullscreen && media.webkitPresentationMode === WebkitPresentationModes.FULLSCREEN) {
    return media;
  }
  return docFullscreenElement;
}, "getFullscreenElement");
const isFullscreen = /* @__PURE__ */ __name((stateOwners) => {
  var _a3;
  const { media, documentElement, fullscreenElement = media } = stateOwners;
  if (!media || !documentElement)
    return false;
  const currentFullscreenElement = getFullscreenElement(stateOwners);
  if (!currentFullscreenElement)
    return false;
  if (currentFullscreenElement === fullscreenElement || currentFullscreenElement === media) {
    return true;
  }
  if (currentFullscreenElement.localName.includes("-")) {
    let currentRoot = currentFullscreenElement.shadowRoot;
    if (!(fullscreenElementKey in currentRoot)) {
      return containsComposedNode(
        currentFullscreenElement,
        /** @TODO clean up type assumptions (e.g. Node) (CJP) */
        // @ts-ignore
        fullscreenElement
      );
    }
    while (currentRoot == null ? void 0 : currentRoot[fullscreenElementKey]) {
      if (currentRoot[fullscreenElementKey] === fullscreenElement)
        return true;
      currentRoot = (_a3 = currentRoot[fullscreenElementKey]) == null ? void 0 : _a3.shadowRoot;
    }
  }
  return false;
}, "isFullscreen");
const fullscreenEnabledKey = "fullscreenEnabled" in Document$1 ? "fullscreenEnabled" : "webkitFullscreenEnabled" in Document$1 ? "webkitFullscreenEnabled" : void 0;
const isFullscreenEnabled = /* @__PURE__ */ __name((stateOwners) => {
  const { documentElement, media } = stateOwners;
  return !!(documentElement == null ? void 0 : documentElement[fullscreenEnabledKey]) || media && "webkitSupportsFullscreen" in media;
}, "isFullscreenEnabled");
let testMediaEl;
const getTestMediaEl = /* @__PURE__ */ __name(() => {
  var _a3, _b2;
  if (testMediaEl)
    return testMediaEl;
  testMediaEl = (_b2 = (_a3 = Document$1) == null ? void 0 : _a3.createElement) == null ? void 0 : _b2.call(_a3, "video");
  return testMediaEl;
}, "getTestMediaEl");
const hasVolumeSupportAsync = /* @__PURE__ */ __name(async (mediaEl = getTestMediaEl()) => {
  if (!mediaEl)
    return false;
  const prevVolume = mediaEl.volume;
  mediaEl.volume = prevVolume / 2 + 0.1;
  const abortController = new AbortController();
  const volumeSupported2 = await Promise.race([
    dispatchedVolumeChange(mediaEl, abortController.signal),
    volumeChanged(mediaEl, prevVolume)
  ]);
  abortController.abort();
  return volumeSupported2;
}, "hasVolumeSupportAsync");
const dispatchedVolumeChange = /* @__PURE__ */ __name((mediaEl, signal) => {
  return new Promise((resolve) => {
    mediaEl.addEventListener("volumechange", () => resolve(true), { signal });
  });
}, "dispatchedVolumeChange");
const volumeChanged = /* @__PURE__ */ __name(async (mediaEl, prevVolume) => {
  for (let i2 = 0; i2 < 10; i2++) {
    if (mediaEl.volume === prevVolume)
      return false;
    await delay(10);
  }
  return mediaEl.volume !== prevVolume;
}, "volumeChanged");
const isSafari = /.*Version\/.*Safari\/.*/.test(
  GlobalThis.navigator.userAgent
);
const hasPipSupport = /* @__PURE__ */ __name((mediaEl = getTestMediaEl()) => {
  if (GlobalThis.matchMedia("(display-mode: standalone)").matches && isSafari)
    return false;
  return typeof (mediaEl == null ? void 0 : mediaEl.requestPictureInPicture) === "function";
}, "hasPipSupport");
const hasFullscreenSupport = /* @__PURE__ */ __name((mediaEl = getTestMediaEl()) => {
  return isFullscreenEnabled({ documentElement: Document$1, media: mediaEl });
}, "hasFullscreenSupport");
const fullscreenSupported = hasFullscreenSupport();
const pipSupported = hasPipSupport();
const airplaySupported = !!GlobalThis.WebKitPlaybackTargetAvailabilityEvent;
const castSupported = !!GlobalThis.chrome;
const getSubtitleTracks = /* @__PURE__ */ __name((stateOwners) => {
  return getTextTracksList(stateOwners.media, (textTrack) => {
    return [TextTrackKinds.SUBTITLES, TextTrackKinds.CAPTIONS].includes(
      textTrack.kind
    );
  }).sort((a, b2) => a.kind >= b2.kind ? 1 : -1);
}, "getSubtitleTracks");
const getShowingSubtitleTracks = /* @__PURE__ */ __name((stateOwners) => {
  return getTextTracksList(stateOwners.media, (textTrack) => {
    return textTrack.mode === TextTrackModes.SHOWING && [TextTrackKinds.SUBTITLES, TextTrackKinds.CAPTIONS].includes(
      textTrack.kind
    );
  });
}, "getShowingSubtitleTracks");
const toggleSubtitleTracks = /* @__PURE__ */ __name((stateOwners, force) => {
  const tracks = getSubtitleTracks(stateOwners);
  const showingSubitleTracks = getShowingSubtitleTracks(stateOwners);
  const subtitlesShowing = !!showingSubitleTracks.length;
  if (!tracks.length)
    return;
  if (force === false || subtitlesShowing && force !== true) {
    updateTracksModeTo(TextTrackModes.DISABLED, tracks, showingSubitleTracks);
  } else if (force === true || !subtitlesShowing && force !== false) {
    let subTrack = tracks[0];
    const { options } = stateOwners;
    if (!(options == null ? void 0 : options.noSubtitlesLangPref)) {
      const subtitlesPref = globalThis.localStorage.getItem(
        "media-chrome-pref-subtitles-lang"
      );
      const userLangPrefs = subtitlesPref ? [subtitlesPref, ...globalThis.navigator.languages] : globalThis.navigator.languages;
      const preferredAvailableSubs = tracks.filter((textTrack) => {
        return userLangPrefs.some(
          (lang) => textTrack.language.toLowerCase().startsWith(lang.split("-")[0])
        );
      }).sort((textTrackA, textTrackB) => {
        const idxA = userLangPrefs.findIndex(
          (lang) => textTrackA.language.toLowerCase().startsWith(lang.split("-")[0])
        );
        const idxB = userLangPrefs.findIndex(
          (lang) => textTrackB.language.toLowerCase().startsWith(lang.split("-")[0])
        );
        return idxA - idxB;
      });
      if (preferredAvailableSubs[0]) {
        subTrack = preferredAvailableSubs[0];
      }
    }
    const { language, label, kind } = subTrack;
    updateTracksModeTo(TextTrackModes.DISABLED, tracks, showingSubitleTracks);
    updateTracksModeTo(TextTrackModes.SHOWING, tracks, [
      { language, label, kind }
    ]);
  }
}, "toggleSubtitleTracks");
const areValuesEq = /* @__PURE__ */ __name((x2, y2) => {
  if (x2 === y2)
    return true;
  if (x2 == null || y2 == null)
    return false;
  if (typeof x2 !== typeof y2)
    return false;
  if (typeof x2 === "number" && Number.isNaN(x2) && Number.isNaN(y2))
    return true;
  if (typeof x2 !== "object")
    return false;
  if (Array.isArray(x2))
    return areArraysEq(x2, y2);
  return Object.entries(x2).every(
    // NOTE: Checking key in y to disambiguate between between missing keys and keys whose value are undefined (CJP)
    ([key, value]) => key in y2 && areValuesEq(value, y2[key])
  );
}, "areValuesEq");
const areArraysEq = /* @__PURE__ */ __name((xs, ys) => {
  const xIsArray = Array.isArray(xs);
  const yIsArray = Array.isArray(ys);
  if (xIsArray !== yIsArray)
    return false;
  if (!(xIsArray || yIsArray))
    return true;
  if (xs.length !== ys.length)
    return false;
  return xs.every((x2, i2) => areValuesEq(x2, ys[i2]));
}, "areArraysEq");
const StreamTypeValues = Object.values(StreamTypes);
let volumeSupported;
const volumeSupportPromise = hasVolumeSupportAsync().then((supported) => {
  volumeSupported = supported;
  return volumeSupported;
});
const prepareStateOwners = /* @__PURE__ */ __name(async (...stateOwners) => {
  await Promise.all(
    stateOwners.filter((x2) => x2).map(async (stateOwner) => {
      if (!("localName" in stateOwner && stateOwner instanceof GlobalThis.HTMLElement)) {
        return;
      }
      const name = stateOwner.localName;
      if (!name.includes("-"))
        return;
      const classDef = GlobalThis.customElements.get(name);
      if (classDef && stateOwner instanceof classDef)
        return;
      await GlobalThis.customElements.whenDefined(name);
      GlobalThis.customElements.upgrade(stateOwner);
    })
  );
}, "prepareStateOwners");
const domParser = new GlobalThis.DOMParser();
const parseHtmlToText = /* @__PURE__ */ __name((text) => text ? domParser.parseFromString(text, "text/html").body.textContent || text : text, "parseHtmlToText");
const stateMediator = {
  mediaError: {
    get(stateOwners, event) {
      const { media } = stateOwners;
      if ((event == null ? void 0 : event.type) === "playing")
        return;
      return media == null ? void 0 : media.error;
    },
    mediaEvents: ["emptied", "error", "playing"]
  },
  mediaErrorCode: {
    get(stateOwners, event) {
      var _a3;
      const { media } = stateOwners;
      if ((event == null ? void 0 : event.type) === "playing")
        return;
      return (_a3 = media == null ? void 0 : media.error) == null ? void 0 : _a3.code;
    },
    mediaEvents: ["emptied", "error", "playing"]
  },
  mediaErrorMessage: {
    get(stateOwners, event) {
      var _a3, _b2;
      const { media } = stateOwners;
      if ((event == null ? void 0 : event.type) === "playing")
        return;
      return (_b2 = (_a3 = media == null ? void 0 : media.error) == null ? void 0 : _a3.message) != null ? _b2 : "";
    },
    mediaEvents: ["emptied", "error", "playing"]
  },
  mediaWidth: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return (_a3 = media == null ? void 0 : media.videoWidth) != null ? _a3 : 0;
    },
    mediaEvents: ["resize"]
  },
  mediaHeight: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return (_a3 = media == null ? void 0 : media.videoHeight) != null ? _a3 : 0;
    },
    mediaEvents: ["resize"]
  },
  mediaPaused: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return (_a3 = media == null ? void 0 : media.paused) != null ? _a3 : true;
    },
    set(value, stateOwners) {
      var _a3;
      const { media } = stateOwners;
      if (!media)
        return;
      if (value) {
        media.pause();
      } else {
        (_a3 = media.play()) == null ? void 0 : _a3.catch(() => {
        });
      }
    },
    mediaEvents: ["play", "playing", "pause", "emptied"]
  },
  mediaHasPlayed: {
    // We want to let the user know that the media started playing at any point (`media-has-played`).
    // Since these propagators are all called when boostrapping state, let's verify this is
    // a real playing event by checking that 1) there's media and 2) it isn't currently paused.
    get(stateOwners, event) {
      const { media } = stateOwners;
      if (!media)
        return false;
      if (!event)
        return !media.paused;
      return event.type === "playing";
    },
    mediaEvents: ["playing", "emptied"]
  },
  mediaEnded: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return (_a3 = media == null ? void 0 : media.ended) != null ? _a3 : false;
    },
    mediaEvents: ["seeked", "ended", "emptied"]
  },
  mediaPlaybackRate: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return (_a3 = media == null ? void 0 : media.playbackRate) != null ? _a3 : 1;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      if (!Number.isFinite(+value))
        return;
      media.playbackRate = +value;
    },
    mediaEvents: ["ratechange", "loadstart"]
  },
  mediaMuted: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return (_a3 = media == null ? void 0 : media.muted) != null ? _a3 : false;
    },
    set(value, stateOwners) {
      const { media, options: { noMutedPref } = {} } = stateOwners;
      if (!media)
        return;
      media.muted = value;
      try {
        const hasLocalStoragePrefMuted = GlobalThis.localStorage.getItem("media-chrome-pref-muted") !== null;
        const hasMutedAttribute = media.hasAttribute("muted");
        if (noMutedPref) {
          if (hasLocalStoragePrefMuted)
            GlobalThis.localStorage.removeItem("media-chrome-pref-muted");
          return;
        }
        if (hasMutedAttribute && !hasLocalStoragePrefMuted) {
          return;
        }
        GlobalThis.localStorage.setItem(
          "media-chrome-pref-muted",
          value ? "true" : "false"
        );
      } catch (e2) {
        console.debug("Error setting muted pref", e2);
      }
    },
    mediaEvents: ["volumechange"],
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        const {
          options: { noMutedPref }
        } = stateOwners;
        const { media } = stateOwners;
        if (!media || media.muted || noMutedPref)
          return;
        try {
          const mutedPref = GlobalThis.localStorage.getItem("media-chrome-pref-muted") === "true";
          stateMediator.mediaMuted.set(mutedPref, stateOwners);
          handler(mutedPref);
        } catch (e2) {
          console.debug("Error getting muted pref", e2);
        }
      }
    ]
  },
  mediaLoop: {
    get(stateOwners) {
      const { media } = stateOwners;
      return media == null ? void 0 : media.loop;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      media.loop = value;
    },
    mediaEvents: ["medialooprequest"]
  },
  mediaVolume: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return (_a3 = media == null ? void 0 : media.volume) != null ? _a3 : 1;
    },
    set(value, stateOwners) {
      const { media, options: { noVolumePref } = {} } = stateOwners;
      if (!media)
        return;
      try {
        if (value == null) {
          GlobalThis.localStorage.removeItem("media-chrome-pref-volume");
        } else if (!media.hasAttribute("muted") && !noVolumePref) {
          GlobalThis.localStorage.setItem(
            "media-chrome-pref-volume",
            value.toString()
          );
        }
      } catch (e2) {
        console.debug("Error setting volume pref", e2);
      }
      if (!Number.isFinite(+value))
        return;
      media.volume = +value;
    },
    mediaEvents: ["volumechange"],
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        const {
          options: { noVolumePref }
        } = stateOwners;
        if (noVolumePref)
          return;
        try {
          const { media } = stateOwners;
          if (!media)
            return;
          const volumePref = GlobalThis.localStorage.getItem(
            "media-chrome-pref-volume"
          );
          if (volumePref == null)
            return;
          stateMediator.mediaVolume.set(+volumePref, stateOwners);
          handler(+volumePref);
        } catch (e2) {
          console.debug("Error getting volume pref", e2);
        }
      }
    ]
  },
  // NOTE: Keeping this roughly equivalent to prior impl to reduce number of changes,
  // however we may want to model "derived" state differently from "primary" state
  // (in this case, derived === mediaVolumeLevel, primary === mediaMuted, mediaVolume) (CJP)
  mediaVolumeLevel: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (typeof (media == null ? void 0 : media.volume) == "undefined")
        return "high";
      if (media.muted || media.volume === 0)
        return "off";
      if (media.volume < 0.5)
        return "low";
      if (media.volume < 0.75)
        return "medium";
      return "high";
    },
    mediaEvents: ["volumechange"]
  },
  mediaCurrentTime: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return (_a3 = media == null ? void 0 : media.currentTime) != null ? _a3 : 0;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media || !isValidNumber(value))
        return;
      media.currentTime = value;
    },
    mediaEvents: ["timeupdate", "loadedmetadata"]
  },
  mediaDuration: {
    get(stateOwners) {
      const { media, options: { defaultDuration } = {} } = stateOwners;
      if (defaultDuration && (!media || !media.duration || Number.isNaN(media.duration) || !Number.isFinite(media.duration))) {
        return defaultDuration;
      }
      return Number.isFinite(media == null ? void 0 : media.duration) ? media.duration : Number.NaN;
    },
    mediaEvents: ["durationchange", "loadedmetadata", "emptied"]
  },
  mediaLoading: {
    get(stateOwners) {
      const { media } = stateOwners;
      return (media == null ? void 0 : media.readyState) < 3;
    },
    mediaEvents: ["waiting", "playing", "emptied"]
  },
  mediaSeekable: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      if (!((_a3 = media == null ? void 0 : media.seekable) == null ? void 0 : _a3.length))
        return void 0;
      const start = media.seekable.start(0);
      const end = media.seekable.end(media.seekable.length - 1);
      if (!start && !end)
        return void 0;
      return [Number(start.toFixed(3)), Number(end.toFixed(3))];
    },
    mediaEvents: ["loadedmetadata", "emptied", "progress", "seekablechange"]
  },
  mediaBuffered: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      const timeRanges = (_a3 = media == null ? void 0 : media.buffered) != null ? _a3 : [];
      return Array.from(timeRanges).map((_2, i2) => [
        Number(timeRanges.start(i2).toFixed(3)),
        Number(timeRanges.end(i2).toFixed(3))
      ]);
    },
    mediaEvents: ["progress", "emptied"]
  },
  mediaStreamType: {
    get(stateOwners) {
      const { media, options: { defaultStreamType } = {} } = stateOwners;
      const usedDefaultStreamType = [
        StreamTypes.LIVE,
        StreamTypes.ON_DEMAND
      ].includes(defaultStreamType) ? defaultStreamType : void 0;
      if (!media)
        return usedDefaultStreamType;
      const { streamType } = media;
      if (StreamTypeValues.includes(streamType)) {
        if (streamType === StreamTypes.UNKNOWN) {
          return usedDefaultStreamType;
        }
        return streamType;
      }
      const duration = media.duration;
      if (duration === Infinity) {
        return StreamTypes.LIVE;
      } else if (Number.isFinite(duration)) {
        return StreamTypes.ON_DEMAND;
      }
      return usedDefaultStreamType;
    },
    mediaEvents: [
      "emptied",
      "durationchange",
      "loadedmetadata",
      "streamtypechange"
    ]
  },
  mediaTargetLiveWindow: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return Number.NaN;
      const { targetLiveWindow } = media;
      const streamType = stateMediator.mediaStreamType.get(stateOwners);
      if ((targetLiveWindow == null || Number.isNaN(targetLiveWindow)) && streamType === StreamTypes.LIVE) {
        return 0;
      }
      return targetLiveWindow;
    },
    mediaEvents: [
      "emptied",
      "durationchange",
      "loadedmetadata",
      "streamtypechange",
      "targetlivewindowchange"
    ]
  },
  mediaTimeIsLive: {
    get(stateOwners) {
      const {
        media,
        // Default to 10 seconds
        options: { liveEdgeOffset = 10 } = {}
      } = stateOwners;
      if (!media)
        return false;
      if (typeof media.liveEdgeStart === "number") {
        if (Number.isNaN(media.liveEdgeStart))
          return false;
        return media.currentTime >= media.liveEdgeStart;
      }
      const live = stateMediator.mediaStreamType.get(stateOwners) === StreamTypes.LIVE;
      if (!live)
        return false;
      const seekable = media.seekable;
      if (!seekable)
        return true;
      if (!seekable.length)
        return false;
      const liveEdgeStart = seekable.end(seekable.length - 1) - liveEdgeOffset;
      return media.currentTime >= liveEdgeStart;
    },
    mediaEvents: ["playing", "timeupdate", "progress", "waiting", "emptied"]
  },
  // Text Tracks modeling
  mediaSubtitlesList: {
    get(stateOwners) {
      return getSubtitleTracks(stateOwners).map(
        ({ kind, label, language }) => ({ kind, label, language })
      );
    },
    mediaEvents: ["loadstart"],
    textTracksEvents: ["addtrack", "removetrack"]
  },
  mediaSubtitlesShowing: {
    get(stateOwners) {
      return getShowingSubtitleTracks(stateOwners).map(
        ({ kind, label, language }) => ({ kind, label, language })
      );
    },
    mediaEvents: ["loadstart"],
    textTracksEvents: ["addtrack", "removetrack", "change"],
    stateOwnersUpdateHandlers: [
      (_handler, stateOwners) => {
        var _a3, _b2;
        const { media, options } = stateOwners;
        if (!media)
          return;
        const updateDefaultSubtitlesCallback = /* @__PURE__ */ __name((event) => {
          var _a22;
          if (!options.defaultSubtitles)
            return;
          const nonSubsEvent = event && ![TextTrackKinds.CAPTIONS, TextTrackKinds.SUBTITLES].includes(
            // @ts-ignore
            (_a22 = event == null ? void 0 : event.track) == null ? void 0 : _a22.kind
          );
          if (nonSubsEvent)
            return;
          toggleSubtitleTracks(stateOwners, true);
        }, "updateDefaultSubtitlesCallback");
        media.addEventListener(
          "loadstart",
          updateDefaultSubtitlesCallback
        );
        (_a3 = media.textTracks) == null ? void 0 : _a3.addEventListener(
          "addtrack",
          updateDefaultSubtitlesCallback
        );
        (_b2 = media.textTracks) == null ? void 0 : _b2.addEventListener(
          "removetrack",
          updateDefaultSubtitlesCallback
        );
        return () => {
          var _a22, _b22;
          media.removeEventListener(
            "loadstart",
            updateDefaultSubtitlesCallback
          );
          (_a22 = media.textTracks) == null ? void 0 : _a22.removeEventListener(
            "addtrack",
            updateDefaultSubtitlesCallback
          );
          (_b22 = media.textTracks) == null ? void 0 : _b22.removeEventListener(
            "removetrack",
            updateDefaultSubtitlesCallback
          );
        };
      }
    ]
  },
  mediaChaptersCues: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      if (!media)
        return [];
      const [chaptersTrack] = getTextTracksList(media, {
        kind: TextTrackKinds.CHAPTERS
      });
      return Array.from((_a3 = chaptersTrack == null ? void 0 : chaptersTrack.cues) != null ? _a3 : []).map(
        ({ text, startTime, endTime }) => ({
          text: parseHtmlToText(text),
          startTime,
          endTime
        })
      );
    },
    mediaEvents: ["loadstart", "loadedmetadata"],
    textTracksEvents: ["addtrack", "removetrack", "change"],
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        var _a3;
        const { media } = stateOwners;
        if (!media)
          return;
        const chaptersTrack = media.querySelector(
          'track[kind="chapters"][default][src]'
        );
        const shadowChaptersTrack = (_a3 = media.shadowRoot) == null ? void 0 : _a3.querySelector(
          ':is(video,audio) > track[kind="chapters"][default][src]'
        );
        chaptersTrack == null ? void 0 : chaptersTrack.addEventListener("load", handler);
        shadowChaptersTrack == null ? void 0 : shadowChaptersTrack.addEventListener("load", handler);
        return () => {
          chaptersTrack == null ? void 0 : chaptersTrack.removeEventListener("load", handler);
          shadowChaptersTrack == null ? void 0 : shadowChaptersTrack.removeEventListener("load", handler);
        };
      }
    ]
  },
  // Modeling state tied to root node
  mediaIsPip: {
    get(stateOwners) {
      var _a3, _b2;
      const { media, documentElement } = stateOwners;
      if (!media || !documentElement)
        return false;
      if (!documentElement.pictureInPictureElement)
        return false;
      if (documentElement.pictureInPictureElement === media)
        return true;
      if (documentElement.pictureInPictureElement instanceof HTMLMediaElement) {
        if (!((_a3 = media.localName) == null ? void 0 : _a3.includes("-")))
          return false;
        return containsComposedNode(
          media,
          documentElement.pictureInPictureElement
        );
      }
      if (documentElement.pictureInPictureElement.localName.includes("-")) {
        let currentRoot = documentElement.pictureInPictureElement.shadowRoot;
        while (currentRoot == null ? void 0 : currentRoot.pictureInPictureElement) {
          if (currentRoot.pictureInPictureElement === media)
            return true;
          currentRoot = (_b2 = currentRoot.pictureInPictureElement) == null ? void 0 : _b2.shadowRoot;
        }
      }
      return false;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      if (value) {
        if (!Document$1.pictureInPictureEnabled) {
          console.warn("MediaChrome: Picture-in-picture is not enabled");
          return;
        }
        if (!media.requestPictureInPicture) {
          console.warn(
            "MediaChrome: The current media does not support picture-in-picture"
          );
          return;
        }
        const warnNotReady = /* @__PURE__ */ __name(() => {
          console.warn(
            "MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0."
          );
        }, "warnNotReady");
        media.requestPictureInPicture().catch((err) => {
          if (err.code === 11) {
            if (!media.src) {
              console.warn(
                "MediaChrome: The media is not ready for picture-in-picture. It must have a src set."
              );
              return;
            }
            if (media.readyState === 0 && media.preload === "none") {
              const cleanup = /* @__PURE__ */ __name(() => {
                media.removeEventListener("loadedmetadata", tryPip);
                media.preload = "none";
              }, "cleanup");
              const tryPip = /* @__PURE__ */ __name(() => {
                media.requestPictureInPicture().catch(warnNotReady);
                cleanup();
              }, "tryPip");
              media.addEventListener("loadedmetadata", tryPip);
              media.preload = "metadata";
              setTimeout(() => {
                if (media.readyState === 0)
                  warnNotReady();
                cleanup();
              }, 1e3);
            } else {
              throw err;
            }
          } else {
            throw err;
          }
        });
      } else if (Document$1.pictureInPictureElement) {
        Document$1.exitPictureInPicture();
      }
    },
    mediaEvents: ["enterpictureinpicture", "leavepictureinpicture"]
  },
  mediaRenditionList: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return [...(_a3 = media == null ? void 0 : media.videoRenditions) != null ? _a3 : []].map((videoRendition) => ({
        ...videoRendition
      }));
    },
    mediaEvents: ["emptied", "loadstart"],
    videoRenditionsEvents: ["addrendition", "removerendition"]
  },
  /** @TODO Model this as a derived value? (CJP) */
  mediaRenditionSelected: {
    get(stateOwners) {
      var _a3, _b2, _c2;
      const { media } = stateOwners;
      return (_c2 = (_b2 = media == null ? void 0 : media.videoRenditions) == null ? void 0 : _b2[(_a3 = media.videoRenditions) == null ? void 0 : _a3.selectedIndex]) == null ? void 0 : _c2.id;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.videoRenditions)) {
        console.warn(
          "MediaController: Rendition selection not supported by this media."
        );
        return;
      }
      const renditionId = value;
      const index = Array.prototype.findIndex.call(
        media.videoRenditions,
        (r10) => r10.id == renditionId
      );
      if (media.videoRenditions.selectedIndex != index) {
        media.videoRenditions.selectedIndex = index;
      }
    },
    mediaEvents: ["emptied"],
    videoRenditionsEvents: ["addrendition", "removerendition", "change"]
  },
  mediaAudioTrackList: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      return [...(_a3 = media == null ? void 0 : media.audioTracks) != null ? _a3 : []];
    },
    mediaEvents: ["emptied", "loadstart"],
    audioTracksEvents: ["addtrack", "removetrack"]
  },
  mediaAudioTrackEnabled: {
    get(stateOwners) {
      var _a3, _b2;
      const { media } = stateOwners;
      return (_b2 = [...(_a3 = media == null ? void 0 : media.audioTracks) != null ? _a3 : []].find(
        (audioTrack) => audioTrack.enabled
      )) == null ? void 0 : _b2.id;
    },
    set(value, stateOwners) {
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.audioTracks)) {
        console.warn(
          "MediaChrome: Audio track selection not supported by this media."
        );
        return;
      }
      const audioTrackId = value;
      for (const track of media.audioTracks) {
        track.enabled = audioTrackId == track.id;
      }
    },
    mediaEvents: ["emptied"],
    audioTracksEvents: ["addtrack", "removetrack", "change"]
  },
  mediaIsFullscreen: {
    get(stateOwners) {
      return isFullscreen(stateOwners);
    },
    set(value, stateOwners, event) {
      var _a3;
      if (!value) {
        exitFullscreen(stateOwners);
      } else {
        enterFullscreen(stateOwners);
        const isPointer = event.detail;
        if (isPointer)
          (_a3 = stateOwners.media) == null ? void 0 : _a3.focus();
      }
    },
    // older Safari version may require webkit-specific events
    rootEvents: ["fullscreenchange", "webkitfullscreenchange"],
    // iOS requires webkit-specific events on the video.
    mediaEvents: [
      "webkitbeginfullscreen",
      "webkitendfullscreen",
      "webkitpresentationmodechanged"
    ]
  },
  mediaIsCasting: {
    // Note this relies on a customized castable-video element.
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.remote) || ((_a3 = media.remote) == null ? void 0 : _a3.state) === "disconnected")
        return false;
      return !!media.remote.state;
    },
    set(value, stateOwners) {
      var _a3, _b2;
      const { media } = stateOwners;
      if (!media)
        return;
      if (value && ((_a3 = media.remote) == null ? void 0 : _a3.state) !== "disconnected")
        return;
      if (!value && ((_b2 = media.remote) == null ? void 0 : _b2.state) !== "connected")
        return;
      if (typeof media.remote.prompt !== "function") {
        console.warn(
          "MediaChrome: Casting is not supported in this environment"
        );
        return;
      }
      media.remote.prompt().catch(() => {
      });
    },
    remoteEvents: ["connect", "connecting", "disconnect"]
  },
  // NOTE: Newly added state for tracking airplaying
  mediaIsAirplaying: {
    // NOTE: Cannot know if airplaying since Safari doesn't fully support HTMLMediaElement::remote yet (e.g. remote::state) (CJP)
    get() {
      return false;
    },
    set(_value2, stateOwners) {
      const { media } = stateOwners;
      if (!media)
        return;
      if (!(media.webkitShowPlaybackTargetPicker && GlobalThis.WebKitPlaybackTargetAvailabilityEvent)) {
        console.error(
          "MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment"
        );
        return;
      }
      media.webkitShowPlaybackTargetPicker();
    },
    mediaEvents: ["webkitcurrentplaybacktargetiswirelesschanged"]
  },
  mediaFullscreenUnavailable: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (!fullscreenSupported || !hasFullscreenSupport(media))
        return AvailabilityStates.UNSUPPORTED;
      return void 0;
    }
  },
  mediaPipUnavailable: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (!pipSupported || !hasPipSupport(media))
        return AvailabilityStates.UNSUPPORTED;
      else if (media == null ? void 0 : media.disablePictureInPicture)
        return AvailabilityStates.UNAVAILABLE;
      return void 0;
    }
  },
  mediaVolumeUnavailable: {
    get(stateOwners) {
      const { media } = stateOwners;
      if (volumeSupported === false || (media == null ? void 0 : media.volume) == void 0) {
        return AvailabilityStates.UNSUPPORTED;
      }
      return void 0;
    },
    // NOTE: Slightly different impl here. Added generic support for
    // "stateOwnersUpdateHandlers" since the original impl had to hack around
    // race conditions. (CJP)
    stateOwnersUpdateHandlers: [
      (handler) => {
        if (volumeSupported == null) {
          volumeSupportPromise.then(
            (supported) => handler(supported ? void 0 : AvailabilityStates.UNSUPPORTED)
          );
        }
      }
    ]
  },
  mediaCastUnavailable: {
    // @ts-ignore
    get(stateOwners, { availability = "not-available" } = {}) {
      var _a3;
      const { media } = stateOwners;
      if (!castSupported || !((_a3 = media == null ? void 0 : media.remote) == null ? void 0 : _a3.state)) {
        return AvailabilityStates.UNSUPPORTED;
      }
      if (availability == null || availability === "available")
        return void 0;
      return AvailabilityStates.UNAVAILABLE;
    },
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        var _a3;
        const { media } = stateOwners;
        if (!media)
          return;
        const remotePlaybackDisabled = media.disableRemotePlayback || media.hasAttribute("disableremoteplayback");
        if (!remotePlaybackDisabled) {
          (_a3 = media == null ? void 0 : media.remote) == null ? void 0 : _a3.watchAvailability((availabilityBool) => {
            const availability = availabilityBool ? "available" : "not-available";
            handler({ availability });
          }).catch((error) => {
            if (error.name === "NotSupportedError") {
              handler({ availability: null });
            } else {
              handler({ availability: "not-available" });
            }
          });
        }
        return () => {
          var _a22;
          (_a22 = media == null ? void 0 : media.remote) == null ? void 0 : _a22.cancelWatchAvailability().catch(() => {
          });
        };
      }
    ]
  },
  mediaAirplayUnavailable: {
    get(_stateOwners, event) {
      if (!airplaySupported)
        return AvailabilityStates.UNSUPPORTED;
      if ((event == null ? void 0 : event.availability) === "not-available") {
        return AvailabilityStates.UNAVAILABLE;
      }
      return void 0;
    },
    // NOTE: Keeping this event, as it's still the documented way of monitoring
    // for AirPlay availability from Apple.
    // See: https://developer.apple.com/documentation/webkitjs/adding_an_airplay_button_to_your_safari_media_controls#2940021 (CJP)
    mediaEvents: ["webkitplaybacktargetavailabilitychanged"],
    stateOwnersUpdateHandlers: [
      (handler, stateOwners) => {
        var _a3;
        const { media } = stateOwners;
        if (!media)
          return;
        const remotePlaybackDisabled = media.disableRemotePlayback || media.hasAttribute("disableremoteplayback");
        if (!remotePlaybackDisabled) {
          (_a3 = media == null ? void 0 : media.remote) == null ? void 0 : _a3.watchAvailability((availabilityBool) => {
            const availability = availabilityBool ? "available" : "not-available";
            handler({ availability });
          }).catch((error) => {
            if (error.name === "NotSupportedError") {
              handler({ availability: null });
            } else {
              handler({ availability: "not-available" });
            }
          });
        }
        return () => {
          var _a22;
          (_a22 = media == null ? void 0 : media.remote) == null ? void 0 : _a22.cancelWatchAvailability().catch(() => {
          });
        };
      }
    ]
  },
  mediaRenditionUnavailable: {
    get(stateOwners) {
      var _a3;
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.videoRenditions)) {
        return AvailabilityStates.UNSUPPORTED;
      }
      if (!((_a3 = media.videoRenditions) == null ? void 0 : _a3.length)) {
        return AvailabilityStates.UNAVAILABLE;
      }
      return void 0;
    },
    mediaEvents: ["emptied", "loadstart"],
    videoRenditionsEvents: ["addrendition", "removerendition"]
  },
  mediaAudioTrackUnavailable: {
    get(stateOwners) {
      var _a3, _b2;
      const { media } = stateOwners;
      if (!(media == null ? void 0 : media.audioTracks)) {
        return AvailabilityStates.UNSUPPORTED;
      }
      if (((_b2 = (_a3 = media.audioTracks) == null ? void 0 : _a3.length) != null ? _b2 : 0) <= 1) {
        return AvailabilityStates.UNAVAILABLE;
      }
      return void 0;
    },
    mediaEvents: ["emptied", "loadstart"],
    audioTracksEvents: ["addtrack", "removetrack"]
  },
  mediaLang: {
    get(stateOwners) {
      const { options: { mediaLang } = {} } = stateOwners;
      return mediaLang != null ? mediaLang : "en";
    }
  }
};
const requestMap = {
  /**
   * @TODO Consider adding state to `StateMediator` for e.g. `mediaThumbnailCues` and use that for derived state here (CJP)
   */
  [MediaUIEvents.MEDIA_PREVIEW_REQUEST](stateMediator2, stateOwners, { detail }) {
    var _a3, _b2, _c2;
    const { media } = stateOwners;
    const mediaPreviewTime = detail != null ? detail : void 0;
    let mediaPreviewImage = void 0;
    let mediaPreviewCoords = void 0;
    if (media && mediaPreviewTime != null) {
      const [track] = getTextTracksList(media, {
        kind: TextTrackKinds.METADATA,
        label: "thumbnails"
      });
      const cue = Array.prototype.find.call((_a3 = track == null ? void 0 : track.cues) != null ? _a3 : [], (c2, i2, cs) => {
        if (i2 === 0)
          return c2.endTime > mediaPreviewTime;
        if (i2 === cs.length - 1)
          return c2.startTime <= mediaPreviewTime;
        return c2.startTime <= mediaPreviewTime && c2.endTime > mediaPreviewTime;
      });
      if (cue) {
        const base = !/'^(?:[a-z]+:)?\/\//i.test(cue.text) ? (_b2 = media == null ? void 0 : media.querySelector(
          'track[label="thumbnails"]'
        )) == null ? void 0 : _b2.src : void 0;
        const url = new URL(cue.text, base);
        const previewCoordsStr = new URLSearchParams(url.hash).get("#xywh");
        mediaPreviewCoords = previewCoordsStr.split(",").map((numStr) => +numStr);
        mediaPreviewImage = url.href;
      }
    }
    const mediaDuration = stateMediator2.mediaDuration.get(stateOwners);
    const mediaChaptersCues = stateMediator2.mediaChaptersCues.get(stateOwners);
    let mediaPreviewChapter = (_c2 = mediaChaptersCues.find((c2, i2, cs) => {
      if (i2 === cs.length - 1 && mediaDuration === c2.endTime) {
        return c2.startTime <= mediaPreviewTime && c2.endTime >= mediaPreviewTime;
      }
      return c2.startTime <= mediaPreviewTime && c2.endTime > mediaPreviewTime;
    })) == null ? void 0 : _c2.text;
    if (detail != null && mediaPreviewChapter == null) {
      mediaPreviewChapter = "";
    }
    return {
      mediaPreviewTime,
      mediaPreviewImage,
      mediaPreviewCoords,
      mediaPreviewChapter
    };
  },
  [MediaUIEvents.MEDIA_PAUSE_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaPaused";
    const value = true;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_PLAY_REQUEST](stateMediator2, stateOwners) {
    var _a3, _b2, _c2, _d2;
    const key = "mediaPaused";
    const value = false;
    const isLive = stateMediator2.mediaStreamType.get(stateOwners) === StreamTypes.LIVE;
    const canAutoSeekToLive = !((_a3 = stateOwners.options) == null ? void 0 : _a3.noAutoSeekToLive);
    const isDVR = stateMediator2.mediaTargetLiveWindow.get(stateOwners) > 0;
    if (isLive && canAutoSeekToLive && !isDVR) {
      const seekableEnd = (_b2 = stateMediator2.mediaSeekable.get(stateOwners)) == null ? void 0 : _b2[1];
      if (seekableEnd) {
        const seekToLiveOffset = (_d2 = (_c2 = stateOwners.options) == null ? void 0 : _c2.seekToLiveOffset) != null ? _d2 : 0;
        const liveEdgeTime = seekableEnd - seekToLiveOffset;
        stateMediator2.mediaCurrentTime.set(liveEdgeTime, stateOwners);
      }
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaPlaybackRate";
    const value = detail;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_MUTE_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaMuted";
    const value = true;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_UNMUTE_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaMuted";
    const value = false;
    if (!stateMediator2.mediaVolume.get(stateOwners)) {
      stateMediator2.mediaVolume.set(0.25, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_LOOP_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaLoop";
    const value = !!detail;
    stateMediator2[key].set(value, stateOwners);
    return { mediaLoop: value };
  },
  [MediaUIEvents.MEDIA_VOLUME_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaVolume";
    const value = detail;
    if (value && stateMediator2.mediaMuted.get(stateOwners)) {
      stateMediator2.mediaMuted.set(false, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_SEEK_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaCurrentTime";
    const value = detail;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_SEEK_TO_LIVE_REQUEST](stateMediator2, stateOwners) {
    var _a3, _b2, _c2;
    const key = "mediaCurrentTime";
    const seekableEnd = (_a3 = stateMediator2.mediaSeekable.get(stateOwners)) == null ? void 0 : _a3[1];
    if (Number.isNaN(Number(seekableEnd)))
      return;
    const seekToLiveOffset = (_c2 = (_b2 = stateOwners.options) == null ? void 0 : _b2.seekToLiveOffset) != null ? _c2 : 0;
    const value = seekableEnd - seekToLiveOffset;
    stateMediator2[key].set(value, stateOwners);
  },
  // Text Tracks state change requests
  [MediaUIEvents.MEDIA_SHOW_SUBTITLES_REQUEST](_stateMediator, stateOwners, { detail }) {
    var _a3;
    const { options } = stateOwners;
    const tracks = getSubtitleTracks(stateOwners);
    const tracksToUpdate = parseTracks(detail);
    const preferredLanguage = (_a3 = tracksToUpdate[0]) == null ? void 0 : _a3.language;
    if (preferredLanguage && !options.noSubtitlesLangPref) {
      GlobalThis.localStorage.setItem(
        "media-chrome-pref-subtitles-lang",
        preferredLanguage
      );
    }
    updateTracksModeTo(TextTrackModes.SHOWING, tracks, tracksToUpdate);
  },
  [MediaUIEvents.MEDIA_DISABLE_SUBTITLES_REQUEST](_stateMediator, stateOwners, { detail }) {
    const tracks = getSubtitleTracks(stateOwners);
    const tracksToUpdate = detail != null ? detail : [];
    updateTracksModeTo(TextTrackModes.DISABLED, tracks, tracksToUpdate);
  },
  [MediaUIEvents.MEDIA_TOGGLE_SUBTITLES_REQUEST](_stateMediator, stateOwners, { detail }) {
    toggleSubtitleTracks(stateOwners, detail);
  },
  // Renditions/Tracks state change requests
  [MediaUIEvents.MEDIA_RENDITION_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaRenditionSelected";
    const value = detail;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_AUDIO_TRACK_REQUEST](stateMediator2, stateOwners, { detail }) {
    const key = "mediaAudioTrackEnabled";
    const value = detail;
    stateMediator2[key].set(value, stateOwners);
  },
  // State change requests dependent on root node
  [MediaUIEvents.MEDIA_ENTER_PIP_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsPip";
    const value = true;
    if (stateMediator2.mediaIsFullscreen.get(stateOwners)) {
      stateMediator2.mediaIsFullscreen.set(false, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_EXIT_PIP_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsPip";
    const value = false;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_ENTER_FULLSCREEN_REQUEST](stateMediator2, stateOwners, event) {
    const key = "mediaIsFullscreen";
    const value = true;
    if (stateMediator2.mediaIsPip.get(stateOwners)) {
      stateMediator2.mediaIsPip.set(false, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners, event);
  },
  [MediaUIEvents.MEDIA_EXIT_FULLSCREEN_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsFullscreen";
    const value = false;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_ENTER_CAST_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsCasting";
    const value = true;
    if (stateMediator2.mediaIsFullscreen.get(stateOwners)) {
      stateMediator2.mediaIsFullscreen.set(false, stateOwners);
    }
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_EXIT_CAST_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsCasting";
    const value = false;
    stateMediator2[key].set(value, stateOwners);
  },
  [MediaUIEvents.MEDIA_AIRPLAY_REQUEST](stateMediator2, stateOwners) {
    const key = "mediaIsAirplaying";
    const value = true;
    stateMediator2[key].set(value, stateOwners);
  }
};
const createMediaStore = /* @__PURE__ */ __name(({
  media,
  fullscreenElement,
  documentElement,
  stateMediator: stateMediator$1 = stateMediator,
  requestMap: requestMap$1 = requestMap,
  options = {},
  monitorStateOwnersOnlyWithSubscriptions = true
}) => {
  const callbacks = [];
  const stateOwners = {
    // Spreading options here since folks should not rely on holding onto references
    // for any app-level logic wrt options.
    options: { ...options }
  };
  let state = Object.freeze({
    mediaPreviewTime: void 0,
    mediaPreviewImage: void 0,
    mediaPreviewCoords: void 0,
    mediaPreviewChapter: void 0
  });
  const updateState = /* @__PURE__ */ __name((nextStateDelta) => {
    if (nextStateDelta == void 0)
      return;
    if (areValuesEq(nextStateDelta, state)) {
      return;
    }
    state = Object.freeze({
      ...state,
      ...nextStateDelta
    });
    callbacks.forEach((cb) => cb(state));
  }, "updateState");
  const updateStateFromFacade = /* @__PURE__ */ __name(() => {
    const nextState = Object.entries(stateMediator$1).reduce(
      (nextState2, [stateName, { get }]) => {
        nextState2[stateName] = get(stateOwners);
        return nextState2;
      },
      {}
    );
    updateState(nextState);
  }, "updateStateFromFacade");
  const stateUpdateHandlers = {};
  let nextStateOwners = void 0;
  const updateStateOwners = /* @__PURE__ */ __name(async (nextStateOwnersDelta, nextSubscriberCount) => {
    var _a3, _b2, _c2, _d2, _e3, _f2, _g2, _h2, _i3, _j2, _k2, _l2, _m2, _n2, _o2, _p2;
    const pendingUpdate = !!nextStateOwners;
    nextStateOwners = {
      ...stateOwners,
      ...nextStateOwners != null ? nextStateOwners : {},
      ...nextStateOwnersDelta
    };
    if (pendingUpdate)
      return;
    await prepareStateOwners(...Object.values(nextStateOwnersDelta));
    const shouldTeardownFromSubscriberCount = callbacks.length > 0 && nextSubscriberCount === 0 && monitorStateOwnersOnlyWithSubscriptions;
    const mediaChanged = stateOwners.media !== nextStateOwners.media;
    const textTracksChanged = ((_a3 = stateOwners.media) == null ? void 0 : _a3.textTracks) !== ((_b2 = nextStateOwners.media) == null ? void 0 : _b2.textTracks);
    const videoRenditionsChanged = ((_c2 = stateOwners.media) == null ? void 0 : _c2.videoRenditions) !== ((_d2 = nextStateOwners.media) == null ? void 0 : _d2.videoRenditions);
    const audioTracksChanged = ((_e3 = stateOwners.media) == null ? void 0 : _e3.audioTracks) !== ((_f2 = nextStateOwners.media) == null ? void 0 : _f2.audioTracks);
    const remoteChanged = ((_g2 = stateOwners.media) == null ? void 0 : _g2.remote) !== ((_h2 = nextStateOwners.media) == null ? void 0 : _h2.remote);
    const rootNodeChanged = stateOwners.documentElement !== nextStateOwners.documentElement;
    const teardownMedia = !!stateOwners.media && (mediaChanged || shouldTeardownFromSubscriberCount);
    const teardownTextTracks = !!((_i3 = stateOwners.media) == null ? void 0 : _i3.textTracks) && (textTracksChanged || shouldTeardownFromSubscriberCount);
    const teardownVideoRenditions = !!((_j2 = stateOwners.media) == null ? void 0 : _j2.videoRenditions) && (videoRenditionsChanged || shouldTeardownFromSubscriberCount);
    const teardownAudioTracks = !!((_k2 = stateOwners.media) == null ? void 0 : _k2.audioTracks) && (audioTracksChanged || shouldTeardownFromSubscriberCount);
    const teardownRemote = !!((_l2 = stateOwners.media) == null ? void 0 : _l2.remote) && (remoteChanged || shouldTeardownFromSubscriberCount);
    const teardownRootNode = !!stateOwners.documentElement && (rootNodeChanged || shouldTeardownFromSubscriberCount);
    const teardownSomething = teardownMedia || teardownTextTracks || teardownVideoRenditions || teardownAudioTracks || teardownRemote || teardownRootNode;
    const shouldSetupFromSubscriberCount = callbacks.length === 0 && nextSubscriberCount === 1 && monitorStateOwnersOnlyWithSubscriptions;
    const setupMedia = !!nextStateOwners.media && (mediaChanged || shouldSetupFromSubscriberCount);
    const setupTextTracks = !!((_m2 = nextStateOwners.media) == null ? void 0 : _m2.textTracks) && (textTracksChanged || shouldSetupFromSubscriberCount);
    const setupVideoRenditions = !!((_n2 = nextStateOwners.media) == null ? void 0 : _n2.videoRenditions) && (videoRenditionsChanged || shouldSetupFromSubscriberCount);
    const setupAudioTracks = !!((_o2 = nextStateOwners.media) == null ? void 0 : _o2.audioTracks) && (audioTracksChanged || shouldSetupFromSubscriberCount);
    const setupRemote = !!((_p2 = nextStateOwners.media) == null ? void 0 : _p2.remote) && (remoteChanged || shouldSetupFromSubscriberCount);
    const setupRootNode = !!nextStateOwners.documentElement && (rootNodeChanged || shouldSetupFromSubscriberCount);
    const setupSomething = setupMedia || setupTextTracks || setupVideoRenditions || setupAudioTracks || setupRemote || setupRootNode;
    const somethingToDo = teardownSomething || setupSomething;
    if (!somethingToDo) {
      Object.entries(nextStateOwners).forEach(
        ([stateOwnerName, stateOwner]) => {
          stateOwners[stateOwnerName] = stateOwner;
        }
      );
      updateStateFromFacade();
      nextStateOwners = void 0;
      return;
    }
    Object.entries(stateMediator$1).forEach(
      ([
        stateName,
        {
          get,
          mediaEvents = [],
          textTracksEvents = [],
          videoRenditionsEvents = [],
          audioTracksEvents = [],
          remoteEvents = [],
          rootEvents = [],
          stateOwnersUpdateHandlers = []
        }
      ]) => {
        if (!stateUpdateHandlers[stateName]) {
          stateUpdateHandlers[stateName] = {};
        }
        const handler = /* @__PURE__ */ __name((event) => {
          const nextValue = get(stateOwners, event);
          updateState({ [stateName]: nextValue });
        }, "handler");
        let prevHandler;
        prevHandler = stateUpdateHandlers[stateName].mediaEvents;
        mediaEvents.forEach((eventType) => {
          if (prevHandler && teardownMedia) {
            stateOwners.media.removeEventListener(eventType, prevHandler);
            stateUpdateHandlers[stateName].mediaEvents = void 0;
          }
          if (setupMedia) {
            nextStateOwners.media.addEventListener(eventType, handler);
            stateUpdateHandlers[stateName].mediaEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].textTracksEvents;
        textTracksEvents.forEach((eventType) => {
          var _a22, _b22;
          if (prevHandler && teardownTextTracks) {
            (_a22 = stateOwners.media.textTracks) == null ? void 0 : _a22.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].textTracksEvents = void 0;
          }
          if (setupTextTracks) {
            (_b22 = nextStateOwners.media.textTracks) == null ? void 0 : _b22.addEventListener(
              eventType,
              handler
            );
            stateUpdateHandlers[stateName].textTracksEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].videoRenditionsEvents;
        videoRenditionsEvents.forEach((eventType) => {
          var _a22, _b22;
          if (prevHandler && teardownVideoRenditions) {
            (_a22 = stateOwners.media.videoRenditions) == null ? void 0 : _a22.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].videoRenditionsEvents = void 0;
          }
          if (setupVideoRenditions) {
            (_b22 = nextStateOwners.media.videoRenditions) == null ? void 0 : _b22.addEventListener(
              eventType,
              handler
            );
            stateUpdateHandlers[stateName].videoRenditionsEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].audioTracksEvents;
        audioTracksEvents.forEach((eventType) => {
          var _a22, _b22;
          if (prevHandler && teardownAudioTracks) {
            (_a22 = stateOwners.media.audioTracks) == null ? void 0 : _a22.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].audioTracksEvents = void 0;
          }
          if (setupAudioTracks) {
            (_b22 = nextStateOwners.media.audioTracks) == null ? void 0 : _b22.addEventListener(
              eventType,
              handler
            );
            stateUpdateHandlers[stateName].audioTracksEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].remoteEvents;
        remoteEvents.forEach((eventType) => {
          var _a22, _b22;
          if (prevHandler && teardownRemote) {
            (_a22 = stateOwners.media.remote) == null ? void 0 : _a22.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].remoteEvents = void 0;
          }
          if (setupRemote) {
            (_b22 = nextStateOwners.media.remote) == null ? void 0 : _b22.addEventListener(eventType, handler);
            stateUpdateHandlers[stateName].remoteEvents = handler;
          }
        });
        prevHandler = stateUpdateHandlers[stateName].rootEvents;
        rootEvents.forEach((eventType) => {
          if (prevHandler && teardownRootNode) {
            stateOwners.documentElement.removeEventListener(
              eventType,
              prevHandler
            );
            stateUpdateHandlers[stateName].rootEvents = void 0;
          }
          if (setupRootNode) {
            nextStateOwners.documentElement.addEventListener(
              eventType,
              handler
            );
            stateUpdateHandlers[stateName].rootEvents = handler;
          }
        });
        const prevHandlerTeardowns = stateUpdateHandlers[stateName].stateOwnersUpdateHandlers;
        if (prevHandlerTeardowns && teardownSomething) {
          const teardowns = Array.isArray(prevHandlerTeardowns) ? prevHandlerTeardowns : [prevHandlerTeardowns];
          teardowns.forEach((teardown) => {
            if (typeof teardown === "function") {
              teardown();
            }
          });
        }
        if (setupSomething) {
          const newTeardowns = stateOwnersUpdateHandlers.map((fn) => fn(handler, nextStateOwners)).filter((teardown) => typeof teardown === "function");
          stateUpdateHandlers[stateName].stateOwnersUpdateHandlers = newTeardowns.length === 1 ? newTeardowns[0] : newTeardowns;
        } else if (teardownSomething) {
          stateUpdateHandlers[stateName].stateOwnersUpdateHandlers = void 0;
        }
      }
    );
    Object.entries(nextStateOwners).forEach(([stateOwnerName, stateOwner]) => {
      stateOwners[stateOwnerName] = stateOwner;
    });
    updateStateFromFacade();
    nextStateOwners = void 0;
  }, "updateStateOwners");
  updateStateOwners({ media, fullscreenElement, documentElement, options });
  return {
    // note that none of these cases directly interact with the media element, root node, full screen element, etc.
    // note these "actions" could just be the events if we wanted, especially if we normalize on "detail" for
    // any payload-relevant values
    // This is roughly equivalent to our used to be in our state requests dictionary object, though much of the
    // "heavy lifting" is now moved into the facade `set()`
    dispatch(action) {
      const { type, detail } = action;
      if (requestMap$1[type] && state.mediaErrorCode == null) {
        updateState(requestMap$1[type](stateMediator$1, stateOwners, action));
        return;
      }
      if (type === "mediaelementchangerequest") {
        updateStateOwners({ media: detail });
      } else if (type === "fullscreenelementchangerequest") {
        updateStateOwners({ fullscreenElement: detail });
      } else if (type === "documentelementchangerequest") {
        updateStateOwners({ documentElement: detail });
      } else if (type === "optionschangerequest") {
        Object.entries(detail != null ? detail : {}).forEach(([optionName, optionValue]) => {
          stateOwners.options[optionName] = optionValue;
        });
        updateStateFromFacade();
      }
    },
    getState() {
      return state;
    },
    subscribe(callback) {
      updateStateOwners({}, callbacks.length + 1);
      callbacks.push(callback);
      callback(state);
      return () => {
        const idx = callbacks.indexOf(callback);
        if (idx >= 0) {
          updateStateOwners({}, callbacks.length - 1);
          callbacks.splice(idx, 1);
        }
      };
    }
  };
}, "createMediaStore");
var __accessCheck$q = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$q");
var __privateGet$q = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$q(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$q");
var __privateAdd$q = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$q");
var __privateSet$n = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$q(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$n");
var __privateMethod$c = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$q(obj, member, "access private method");
  return method;
}, "__privateMethod$c");
var _hotKeys, _fullscreenElement, _mediaStore, _keyboardShortcutsDialog, _mediaStateCallback, _mediaStoreUnsubscribe, _mediaStateEventHandler, _setupDefaultStore, setupDefaultStore_fn, _keyUpHandler, keyUpHandler_fn, _keyDownHandler$1, keyDownHandler_fn, _showKeyboardShortcutsDialog, showKeyboardShortcutsDialog_fn;
const ButtonPressedKeys$1 = [
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Enter",
  " ",
  "f",
  "m",
  "k",
  "c",
  "l",
  "j",
  ">",
  "<",
  "p"
];
const DEFAULT_SEEK_OFFSET$2 = 10;
const DEFAULT_VOLUME_STEP = 0.025;
const DEFAULT_PLAYBACK_RATE_STEP = 0.25;
const MIN_PLAYBACK_RATE = 0.25;
const MAX_PLAYBACK_RATE = 2;
const Attributes$c = {
  DEFAULT_SUBTITLES: "defaultsubtitles",
  DEFAULT_STREAM_TYPE: "defaultstreamtype",
  DEFAULT_DURATION: "defaultduration",
  FULLSCREEN_ELEMENT: "fullscreenelement",
  HOTKEYS: "hotkeys",
  KEYBOARD_BACKWARD_SEEK_OFFSET: "keyboardbackwardseekoffset",
  KEYBOARD_FORWARD_SEEK_OFFSET: "keyboardforwardseekoffset",
  KEYBOARD_DOWN_VOLUME_STEP: "keyboarddownvolumestep",
  KEYBOARD_UP_VOLUME_STEP: "keyboardupvolumestep",
  KEYS_USED: "keysused",
  LANG: "lang",
  LOOP: "loop",
  LIVE_EDGE_OFFSET: "liveedgeoffset",
  NO_AUTO_SEEK_TO_LIVE: "noautoseektolive",
  NO_DEFAULT_STORE: "nodefaultstore",
  NO_HOTKEYS: "nohotkeys",
  NO_MUTED_PREF: "nomutedpref",
  NO_SUBTITLES_LANG_PREF: "nosubtitleslangpref",
  NO_VOLUME_PREF: "novolumepref",
  SEEK_TO_LIVE_OFFSET: "seektoliveoffset"
};
const _MediaController = class _MediaController extends MediaContainer {
  constructor() {
    super();
    __privateAdd$q(this, _setupDefaultStore);
    __privateAdd$q(this, _keyUpHandler);
    __privateAdd$q(this, _keyDownHandler$1);
    __privateAdd$q(this, _showKeyboardShortcutsDialog);
    this.mediaStateReceivers = [];
    this.associatedElementSubscriptions = /* @__PURE__ */ new Map();
    __privateAdd$q(this, _hotKeys, new AttributeTokenList(this, Attributes$c.HOTKEYS));
    __privateAdd$q(this, _fullscreenElement, void 0);
    __privateAdd$q(this, _mediaStore, void 0);
    __privateAdd$q(this, _keyboardShortcutsDialog, null);
    __privateAdd$q(this, _mediaStateCallback, void 0);
    __privateAdd$q(this, _mediaStoreUnsubscribe, void 0);
    __privateAdd$q(this, _mediaStateEventHandler, (event) => {
      var _a3;
      (_a3 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _a3.dispatch(event);
    });
    this.associateElement(this);
    let prevState = {};
    __privateSet$n(this, _mediaStateCallback, (nextState) => {
      Object.entries(nextState).forEach(([stateName, stateValue]) => {
        if (stateName in prevState && prevState[stateName] === stateValue)
          return;
        this.propagateMediaState(stateName, stateValue);
        const attrName = stateName.toLowerCase();
        const evt = new GlobalThis.CustomEvent(
          AttributeToStateChangeEventMap[attrName],
          { composed: true, detail: stateValue }
        );
        this.dispatchEvent(evt);
      });
      prevState = nextState;
    });
    this.hasAttribute(Attributes$c.NO_HOTKEYS) ? this.disableHotkeys() : this.enableHotkeys();
  }
  static get observedAttributes() {
    return super.observedAttributes.concat(
      Attributes$c.NO_HOTKEYS,
      Attributes$c.HOTKEYS,
      Attributes$c.DEFAULT_STREAM_TYPE,
      Attributes$c.DEFAULT_SUBTITLES,
      Attributes$c.DEFAULT_DURATION,
      Attributes$c.NO_MUTED_PREF,
      Attributes$c.NO_VOLUME_PREF,
      Attributes$c.LANG,
      Attributes$c.LOOP
    );
  }
  get mediaStore() {
    return __privateGet$q(this, _mediaStore);
  }
  set mediaStore(value) {
    var _a3, _b2;
    if (__privateGet$q(this, _mediaStore)) {
      (_a3 = __privateGet$q(this, _mediaStoreUnsubscribe)) == null ? void 0 : _a3.call(this);
      __privateSet$n(this, _mediaStoreUnsubscribe, void 0);
    }
    __privateSet$n(this, _mediaStore, value);
    if (!__privateGet$q(this, _mediaStore) && !this.hasAttribute(Attributes$c.NO_DEFAULT_STORE)) {
      __privateMethod$c(this, _setupDefaultStore, setupDefaultStore_fn).call(this);
      return;
    }
    __privateSet$n(this, _mediaStoreUnsubscribe, (_b2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _b2.subscribe(
      __privateGet$q(this, _mediaStateCallback)
    ));
  }
  get fullscreenElement() {
    var _a3;
    return (_a3 = __privateGet$q(this, _fullscreenElement)) != null ? _a3 : this;
  }
  set fullscreenElement(element) {
    var _a3;
    if (this.hasAttribute(Attributes$c.FULLSCREEN_ELEMENT)) {
      this.removeAttribute(Attributes$c.FULLSCREEN_ELEMENT);
    }
    __privateSet$n(this, _fullscreenElement, element);
    (_a3 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _a3.dispatch({
      type: "fullscreenelementchangerequest",
      detail: this.fullscreenElement
    });
  }
  get defaultSubtitles() {
    return getBooleanAttr(this, Attributes$c.DEFAULT_SUBTITLES);
  }
  set defaultSubtitles(value) {
    setBooleanAttr(this, Attributes$c.DEFAULT_SUBTITLES, value);
  }
  get defaultStreamType() {
    return getStringAttr(this, Attributes$c.DEFAULT_STREAM_TYPE);
  }
  set defaultStreamType(value) {
    setStringAttr(this, Attributes$c.DEFAULT_STREAM_TYPE, value);
  }
  get defaultDuration() {
    return getNumericAttr(this, Attributes$c.DEFAULT_DURATION);
  }
  set defaultDuration(value) {
    setNumericAttr(this, Attributes$c.DEFAULT_DURATION, value);
  }
  get noHotkeys() {
    return getBooleanAttr(this, Attributes$c.NO_HOTKEYS);
  }
  set noHotkeys(value) {
    setBooleanAttr(this, Attributes$c.NO_HOTKEYS, value);
  }
  get keysUsed() {
    return getStringAttr(this, Attributes$c.KEYS_USED);
  }
  set keysUsed(value) {
    setStringAttr(this, Attributes$c.KEYS_USED, value);
  }
  get liveEdgeOffset() {
    return getNumericAttr(this, Attributes$c.LIVE_EDGE_OFFSET);
  }
  set liveEdgeOffset(value) {
    setNumericAttr(this, Attributes$c.LIVE_EDGE_OFFSET, value);
  }
  get noAutoSeekToLive() {
    return getBooleanAttr(this, Attributes$c.NO_AUTO_SEEK_TO_LIVE);
  }
  set noAutoSeekToLive(value) {
    setBooleanAttr(this, Attributes$c.NO_AUTO_SEEK_TO_LIVE, value);
  }
  get noVolumePref() {
    return getBooleanAttr(this, Attributes$c.NO_VOLUME_PREF);
  }
  set noVolumePref(value) {
    setBooleanAttr(this, Attributes$c.NO_VOLUME_PREF, value);
  }
  get noMutedPref() {
    return getBooleanAttr(this, Attributes$c.NO_MUTED_PREF);
  }
  set noMutedPref(value) {
    setBooleanAttr(this, Attributes$c.NO_MUTED_PREF, value);
  }
  get noSubtitlesLangPref() {
    return getBooleanAttr(this, Attributes$c.NO_SUBTITLES_LANG_PREF);
  }
  set noSubtitlesLangPref(value) {
    setBooleanAttr(this, Attributes$c.NO_SUBTITLES_LANG_PREF, value);
  }
  get noDefaultStore() {
    return getBooleanAttr(this, Attributes$c.NO_DEFAULT_STORE);
  }
  set noDefaultStore(value) {
    setBooleanAttr(this, Attributes$c.NO_DEFAULT_STORE, value);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2, _e3, _f2, _g2, _h2, _i3, _j2, _k2, _l2;
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === Attributes$c.NO_HOTKEYS) {
      if (newValue !== oldValue && newValue === "") {
        if (this.hasAttribute(Attributes$c.HOTKEYS)) {
          console.warn(
            "Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."
          );
        }
        this.disableHotkeys();
      } else if (newValue !== oldValue && newValue === null) {
        this.enableHotkeys();
      }
    } else if (attrName === Attributes$c.HOTKEYS) {
      __privateGet$q(this, _hotKeys).value = newValue;
    } else if (attrName === Attributes$c.DEFAULT_SUBTITLES && newValue !== oldValue) {
      (_a3 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _a3.dispatch({
        type: "optionschangerequest",
        detail: {
          defaultSubtitles: this.hasAttribute(Attributes$c.DEFAULT_SUBTITLES)
        }
      });
    } else if (attrName === Attributes$c.DEFAULT_STREAM_TYPE) {
      (_c2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _c2.dispatch({
        type: "optionschangerequest",
        detail: {
          defaultStreamType: (_b2 = this.getAttribute(Attributes$c.DEFAULT_STREAM_TYPE)) != null ? _b2 : void 0
        }
      });
    } else if (attrName === Attributes$c.LIVE_EDGE_OFFSET) {
      (_d2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _d2.dispatch({
        type: "optionschangerequest",
        detail: {
          liveEdgeOffset: this.hasAttribute(Attributes$c.LIVE_EDGE_OFFSET) ? +this.getAttribute(Attributes$c.LIVE_EDGE_OFFSET) : void 0,
          seekToLiveOffset: !this.hasAttribute(Attributes$c.SEEK_TO_LIVE_OFFSET) ? +this.getAttribute(Attributes$c.LIVE_EDGE_OFFSET) : void 0
        }
      });
    } else if (attrName === Attributes$c.SEEK_TO_LIVE_OFFSET) {
      (_e3 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _e3.dispatch({
        type: "optionschangerequest",
        detail: {
          seekToLiveOffset: this.hasAttribute(Attributes$c.SEEK_TO_LIVE_OFFSET) ? +this.getAttribute(Attributes$c.SEEK_TO_LIVE_OFFSET) : void 0
        }
      });
    } else if (attrName === Attributes$c.NO_AUTO_SEEK_TO_LIVE) {
      (_f2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _f2.dispatch({
        type: "optionschangerequest",
        detail: {
          noAutoSeekToLive: this.hasAttribute(Attributes$c.NO_AUTO_SEEK_TO_LIVE)
        }
      });
    } else if (attrName === Attributes$c.FULLSCREEN_ELEMENT) {
      const el = newValue ? (_g2 = this.getRootNode()) == null ? void 0 : _g2.getElementById(newValue) : void 0;
      __privateSet$n(this, _fullscreenElement, el);
      (_h2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _h2.dispatch({
        type: "fullscreenelementchangerequest",
        detail: this.fullscreenElement
      });
    } else if (attrName === Attributes$c.LANG && newValue !== oldValue) {
      setLanguage(newValue);
      (_i3 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _i3.dispatch({
        type: "optionschangerequest",
        detail: {
          mediaLang: newValue
        }
      });
    } else if (attrName === Attributes$c.LOOP && newValue !== oldValue) {
      (_j2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _j2.dispatch({
        type: MediaUIEvents.MEDIA_LOOP_REQUEST,
        detail: newValue != null
      });
    } else if (attrName === Attributes$c.NO_VOLUME_PREF && newValue !== oldValue) {
      (_k2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _k2.dispatch({
        type: "optionschangerequest",
        detail: {
          noVolumePref: this.hasAttribute(Attributes$c.NO_VOLUME_PREF)
        }
      });
    } else if (attrName === Attributes$c.NO_MUTED_PREF && newValue !== oldValue) {
      (_l2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _l2.dispatch({
        type: "optionschangerequest",
        detail: {
          noMutedPref: this.hasAttribute(Attributes$c.NO_MUTED_PREF)
        }
      });
    }
  }
  connectedCallback() {
    var _a3, _b2;
    if (!__privateGet$q(this, _mediaStore) && !this.hasAttribute(Attributes$c.NO_DEFAULT_STORE)) {
      __privateMethod$c(this, _setupDefaultStore, setupDefaultStore_fn).call(this);
    }
    (_a3 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _a3.dispatch({
      type: "documentelementchangerequest",
      detail: Document$1
    });
    super.connectedCallback();
    if (__privateGet$q(this, _mediaStore) && !__privateGet$q(this, _mediaStoreUnsubscribe)) {
      __privateSet$n(this, _mediaStoreUnsubscribe, (_b2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _b2.subscribe(
        __privateGet$q(this, _mediaStateCallback)
      ));
    }
    this.hasAttribute(Attributes$c.NO_HOTKEYS) ? this.disableHotkeys() : this.enableHotkeys();
  }
  disconnectedCallback() {
    var _a3, _b2, _c2, _d2;
    (_a3 = super.disconnectedCallback) == null ? void 0 : _a3.call(this);
    if (__privateGet$q(this, _mediaStore)) {
      (_b2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _b2.dispatch({
        type: "documentelementchangerequest",
        detail: void 0
      });
      (_c2 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _c2.dispatch({
        type: MediaUIEvents.MEDIA_TOGGLE_SUBTITLES_REQUEST,
        detail: false
      });
    }
    if (__privateGet$q(this, _mediaStoreUnsubscribe)) {
      (_d2 = __privateGet$q(this, _mediaStoreUnsubscribe)) == null ? void 0 : _d2.call(this);
      __privateSet$n(this, _mediaStoreUnsubscribe, void 0);
    }
  }
  /**
   * @override
   * @param {HTMLMediaElement} media
   */
  mediaSetCallback(media) {
    var _a3;
    super.mediaSetCallback(media);
    (_a3 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _a3.dispatch({
      type: "mediaelementchangerequest",
      detail: media
    });
    if (!media.hasAttribute("tabindex")) {
      media.tabIndex = -1;
    }
  }
  /**
   * @override
   * @param {HTMLMediaElement} media
   */
  mediaUnsetCallback(media) {
    var _a3;
    super.mediaUnsetCallback(media);
    (_a3 = __privateGet$q(this, _mediaStore)) == null ? void 0 : _a3.dispatch({
      type: "mediaelementchangerequest",
      detail: void 0
    });
  }
  propagateMediaState(stateName, state) {
    propagateMediaState(this.mediaStateReceivers, stateName, state);
  }
  associateElement(element) {
    if (!element)
      return;
    const { associatedElementSubscriptions } = this;
    if (associatedElementSubscriptions.has(element))
      return;
    const registerMediaStateReceiver = this.registerMediaStateReceiver.bind(this);
    const unregisterMediaStateReceiver = this.unregisterMediaStateReceiver.bind(this);
    const unsubscribe = monitorForMediaStateReceivers(
      element,
      registerMediaStateReceiver,
      unregisterMediaStateReceiver
    );
    Object.values(MediaUIEvents).forEach((eventName) => {
      element.addEventListener(eventName, __privateGet$q(this, _mediaStateEventHandler));
    });
    associatedElementSubscriptions.set(element, unsubscribe);
  }
  unassociateElement(element) {
    if (!element)
      return;
    const { associatedElementSubscriptions } = this;
    if (!associatedElementSubscriptions.has(element))
      return;
    const unsubscribe = associatedElementSubscriptions.get(element);
    unsubscribe();
    associatedElementSubscriptions.delete(element);
    Object.values(MediaUIEvents).forEach((eventName) => {
      element.removeEventListener(eventName, __privateGet$q(this, _mediaStateEventHandler));
    });
  }
  registerMediaStateReceiver(el) {
    if (!el)
      return;
    const els = this.mediaStateReceivers;
    const index = els.indexOf(el);
    if (index > -1)
      return;
    els.push(el);
    if (__privateGet$q(this, _mediaStore)) {
      Object.entries(__privateGet$q(this, _mediaStore).getState()).forEach(
        ([stateName, stateValue]) => {
          propagateMediaState([el], stateName, stateValue);
        }
      );
    }
  }
  unregisterMediaStateReceiver(el) {
    const els = this.mediaStateReceivers;
    const index = els.indexOf(el);
    if (index < 0)
      return;
    els.splice(index, 1);
  }
  enableHotkeys() {
    this.addEventListener("keydown", __privateMethod$c(this, _keyDownHandler$1, keyDownHandler_fn));
  }
  disableHotkeys() {
    this.removeEventListener("keydown", __privateMethod$c(this, _keyDownHandler$1, keyDownHandler_fn));
    this.removeEventListener("keyup", __privateMethod$c(this, _keyUpHandler, keyUpHandler_fn));
  }
  get hotkeys() {
    return getStringAttr(this, Attributes$c.HOTKEYS);
  }
  set hotkeys(value) {
    setStringAttr(this, Attributes$c.HOTKEYS, value);
  }
  keyboardShortcutHandler(e2) {
    var _a3, _b2, _c2, _d2, _e3, _f2, _g2, _h2, _i3;
    const target = e2.target;
    const keysUsed = ((_c2 = (_b2 = (_a3 = target.getAttribute(Attributes$c.KEYS_USED)) == null ? void 0 : _a3.split(" ")) != null ? _b2 : target == null ? void 0 : target.keysUsed) != null ? _c2 : []).map((key) => key === "Space" ? " " : key).filter(Boolean);
    if (keysUsed.includes(e2.key)) {
      return;
    }
    let eventName, detail, evt;
    if (__privateGet$q(this, _hotKeys).contains(`no${e2.key.toLowerCase()}`))
      return;
    if (e2.key === " " && __privateGet$q(this, _hotKeys).contains(`nospace`))
      return;
    const isShiftSlash = e2.shiftKey && (e2.key === "/" || e2.key === "?");
    if (isShiftSlash && __privateGet$q(this, _hotKeys).contains("noshift+/"))
      return;
    switch (e2.key) {
      case " ":
      case "k":
        eventName = __privateGet$q(this, _mediaStore).getState().mediaPaused ? MediaUIEvents.MEDIA_PLAY_REQUEST : MediaUIEvents.MEDIA_PAUSE_REQUEST;
        this.dispatchEvent(
          new GlobalThis.CustomEvent(eventName, {
            composed: true,
            bubbles: true
          })
        );
        break;
      case "m":
        eventName = this.mediaStore.getState().mediaVolumeLevel === "off" ? MediaUIEvents.MEDIA_UNMUTE_REQUEST : MediaUIEvents.MEDIA_MUTE_REQUEST;
        this.dispatchEvent(
          new GlobalThis.CustomEvent(eventName, {
            composed: true,
            bubbles: true
          })
        );
        break;
      case "f":
        eventName = this.mediaStore.getState().mediaIsFullscreen ? MediaUIEvents.MEDIA_EXIT_FULLSCREEN_REQUEST : MediaUIEvents.MEDIA_ENTER_FULLSCREEN_REQUEST;
        this.dispatchEvent(
          new GlobalThis.CustomEvent(eventName, {
            composed: true,
            bubbles: true
          })
        );
        break;
      case "c":
        this.dispatchEvent(
          new GlobalThis.CustomEvent(
            MediaUIEvents.MEDIA_TOGGLE_SUBTITLES_REQUEST,
            { composed: true, bubbles: true }
          )
        );
        break;
      case "ArrowLeft":
      case "j": {
        const offsetValue = this.hasAttribute(
          Attributes$c.KEYBOARD_BACKWARD_SEEK_OFFSET
        ) ? +this.getAttribute(Attributes$c.KEYBOARD_BACKWARD_SEEK_OFFSET) : DEFAULT_SEEK_OFFSET$2;
        detail = Math.max(
          ((_d2 = this.mediaStore.getState().mediaCurrentTime) != null ? _d2 : 0) - offsetValue,
          0
        );
        evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
          composed: true,
          bubbles: true,
          detail
        });
        this.dispatchEvent(evt);
        break;
      }
      case "ArrowRight":
      case "l": {
        const offsetValue = this.hasAttribute(
          Attributes$c.KEYBOARD_FORWARD_SEEK_OFFSET
        ) ? +this.getAttribute(Attributes$c.KEYBOARD_FORWARD_SEEK_OFFSET) : DEFAULT_SEEK_OFFSET$2;
        detail = Math.max(
          ((_e3 = this.mediaStore.getState().mediaCurrentTime) != null ? _e3 : 0) + offsetValue,
          0
        );
        evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
          composed: true,
          bubbles: true,
          detail
        });
        this.dispatchEvent(evt);
        break;
      }
      case "ArrowUp": {
        const step = this.hasAttribute(Attributes$c.KEYBOARD_UP_VOLUME_STEP) ? +this.getAttribute(Attributes$c.KEYBOARD_UP_VOLUME_STEP) : DEFAULT_VOLUME_STEP;
        detail = Math.min(
          ((_f2 = this.mediaStore.getState().mediaVolume) != null ? _f2 : 1) + step,
          1
        );
        evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_VOLUME_REQUEST, {
          composed: true,
          bubbles: true,
          detail
        });
        this.dispatchEvent(evt);
        break;
      }
      case "ArrowDown": {
        const step = this.hasAttribute(Attributes$c.KEYBOARD_DOWN_VOLUME_STEP) ? +this.getAttribute(Attributes$c.KEYBOARD_DOWN_VOLUME_STEP) : DEFAULT_VOLUME_STEP;
        detail = Math.max(
          ((_g2 = this.mediaStore.getState().mediaVolume) != null ? _g2 : 1) - step,
          0
        );
        evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_VOLUME_REQUEST, {
          composed: true,
          bubbles: true,
          detail
        });
        this.dispatchEvent(evt);
        break;
      }
      case "<": {
        const playbackRate = (_h2 = this.mediaStore.getState().mediaPlaybackRate) != null ? _h2 : 1;
        detail = Math.max(
          playbackRate - DEFAULT_PLAYBACK_RATE_STEP,
          MIN_PLAYBACK_RATE
        ).toFixed(2);
        evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST, {
          composed: true,
          bubbles: true,
          detail
        });
        this.dispatchEvent(evt);
        break;
      }
      case ">": {
        const playbackRate = (_i3 = this.mediaStore.getState().mediaPlaybackRate) != null ? _i3 : 1;
        detail = Math.min(
          playbackRate + DEFAULT_PLAYBACK_RATE_STEP,
          MAX_PLAYBACK_RATE
        ).toFixed(2);
        evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST, {
          composed: true,
          bubbles: true,
          detail
        });
        this.dispatchEvent(evt);
        break;
      }
      case "/":
      case "?": {
        if (e2.shiftKey) {
          __privateMethod$c(this, _showKeyboardShortcutsDialog, showKeyboardShortcutsDialog_fn).call(this);
        }
        break;
      }
      case "p": {
        eventName = this.mediaStore.getState().mediaIsPip ? MediaUIEvents.MEDIA_EXIT_PIP_REQUEST : MediaUIEvents.MEDIA_ENTER_PIP_REQUEST;
        evt = new GlobalThis.CustomEvent(eventName, {
          composed: true,
          bubbles: true
        });
        this.dispatchEvent(evt);
        break;
      }
    }
  }
};
__name(_MediaController, "MediaController");
let MediaController = _MediaController;
_hotKeys = /* @__PURE__ */ new WeakMap();
_fullscreenElement = /* @__PURE__ */ new WeakMap();
_mediaStore = /* @__PURE__ */ new WeakMap();
_keyboardShortcutsDialog = /* @__PURE__ */ new WeakMap();
_mediaStateCallback = /* @__PURE__ */ new WeakMap();
_mediaStoreUnsubscribe = /* @__PURE__ */ new WeakMap();
_mediaStateEventHandler = /* @__PURE__ */ new WeakMap();
_setupDefaultStore = /* @__PURE__ */ new WeakSet();
setupDefaultStore_fn = /* @__PURE__ */ __name(function() {
  var _a3;
  this.mediaStore = createMediaStore({
    media: this.media,
    fullscreenElement: this.fullscreenElement,
    options: {
      defaultSubtitles: this.hasAttribute(Attributes$c.DEFAULT_SUBTITLES),
      defaultDuration: this.hasAttribute(Attributes$c.DEFAULT_DURATION) ? +this.getAttribute(Attributes$c.DEFAULT_DURATION) : void 0,
      defaultStreamType: (
        /** @type {import('./media-store/state-mediator.js').StreamTypeValue} */
        (_a3 = this.getAttribute(
          Attributes$c.DEFAULT_STREAM_TYPE
        )) != null ? _a3 : void 0
      ),
      liveEdgeOffset: this.hasAttribute(Attributes$c.LIVE_EDGE_OFFSET) ? +this.getAttribute(Attributes$c.LIVE_EDGE_OFFSET) : void 0,
      seekToLiveOffset: this.hasAttribute(Attributes$c.SEEK_TO_LIVE_OFFSET) ? +this.getAttribute(Attributes$c.SEEK_TO_LIVE_OFFSET) : this.hasAttribute(Attributes$c.LIVE_EDGE_OFFSET) ? +this.getAttribute(Attributes$c.LIVE_EDGE_OFFSET) : void 0,
      noAutoSeekToLive: this.hasAttribute(Attributes$c.NO_AUTO_SEEK_TO_LIVE),
      // NOTE: This wasn't updated if it was changed later. Should it be? (CJP)
      noVolumePref: this.hasAttribute(Attributes$c.NO_VOLUME_PREF),
      noMutedPref: this.hasAttribute(Attributes$c.NO_MUTED_PREF),
      noSubtitlesLangPref: this.hasAttribute(
        Attributes$c.NO_SUBTITLES_LANG_PREF
      )
    }
  });
}, "setupDefaultStore_fn");
_keyUpHandler = /* @__PURE__ */ new WeakSet();
keyUpHandler_fn = /* @__PURE__ */ __name(function(e2) {
  const { key, shiftKey } = e2;
  const isShiftSlash = shiftKey && (key === "/" || key === "?");
  const shouldHandle = isShiftSlash || ButtonPressedKeys$1.includes(key);
  if (!shouldHandle) {
    this.removeEventListener("keyup", __privateMethod$c(this, _keyUpHandler, keyUpHandler_fn));
    return;
  }
  this.keyboardShortcutHandler(e2);
}, "keyUpHandler_fn");
_keyDownHandler$1 = /* @__PURE__ */ new WeakSet();
keyDownHandler_fn = /* @__PURE__ */ __name(function(e2) {
  var _a3;
  const { metaKey, altKey, key, shiftKey } = e2;
  const isShiftSlash = shiftKey && (key === "/" || key === "?");
  if (isShiftSlash && ((_a3 = __privateGet$q(this, _keyboardShortcutsDialog)) == null ? void 0 : _a3.open)) {
    this.removeEventListener("keyup", __privateMethod$c(this, _keyUpHandler, keyUpHandler_fn));
    return;
  }
  if (metaKey || altKey || !isShiftSlash && !ButtonPressedKeys$1.includes(key)) {
    this.removeEventListener("keyup", __privateMethod$c(this, _keyUpHandler, keyUpHandler_fn));
    return;
  }
  const target = e2.target;
  const isRangeInput = target instanceof HTMLElement && (target.tagName.toLowerCase() === "media-volume-range" || target.tagName.toLowerCase() === "media-time-range");
  if ([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(key) && !(__privateGet$q(this, _hotKeys).contains(`no${key.toLowerCase()}`) || key === " " && __privateGet$q(this, _hotKeys).contains("nospace")) && !isRangeInput) {
    e2.preventDefault();
  }
  this.addEventListener("keyup", __privateMethod$c(this, _keyUpHandler, keyUpHandler_fn), { once: true });
}, "keyDownHandler_fn");
_showKeyboardShortcutsDialog = /* @__PURE__ */ new WeakSet();
showKeyboardShortcutsDialog_fn = /* @__PURE__ */ __name(function() {
  if (!__privateGet$q(this, _keyboardShortcutsDialog)) {
    __privateSet$n(this, _keyboardShortcutsDialog, Document$1.createElement(
      "media-keyboard-shortcuts-dialog"
    ));
    this.appendChild(__privateGet$q(this, _keyboardShortcutsDialog));
  }
  __privateGet$q(this, _keyboardShortcutsDialog).open = true;
}, "showKeyboardShortcutsDialog_fn");
const MEDIA_UI_ATTRIBUTE_NAMES = Object.values(MediaUIAttributes);
const MEDIA_UI_PROP_NAMES = Object.values(MediaUIProps);
const getMediaUIAttributesFrom = /* @__PURE__ */ __name((child) => {
  var _a3, _b2, _c2, _d2;
  let { observedAttributes: observedAttributes2 } = child.constructor;
  if (!observedAttributes2 && ((_a3 = child.nodeName) == null ? void 0 : _a3.includes("-"))) {
    GlobalThis.customElements.upgrade(child);
    ({ observedAttributes: observedAttributes2 } = child.constructor);
  }
  const mediaChromeAttributesList = (_d2 = (_c2 = (_b2 = child == null ? void 0 : child.getAttribute) == null ? void 0 : _b2.call(child, MediaStateReceiverAttributes.MEDIA_CHROME_ATTRIBUTES)) == null ? void 0 : _c2.split) == null ? void 0 : _d2.call(_c2, /\s+/);
  if (!Array.isArray(observedAttributes2 || mediaChromeAttributesList))
    return [];
  return (observedAttributes2 || mediaChromeAttributesList).filter(
    (attrName) => MEDIA_UI_ATTRIBUTE_NAMES.includes(attrName)
  );
}, "getMediaUIAttributesFrom");
const hasMediaUIProps = /* @__PURE__ */ __name((mediaStateReceiverCandidate) => {
  var _a3, _b2;
  if (((_a3 = mediaStateReceiverCandidate.nodeName) == null ? void 0 : _a3.includes("-")) && !!GlobalThis.customElements.get(
    (_b2 = mediaStateReceiverCandidate.nodeName) == null ? void 0 : _b2.toLowerCase()
  ) && !(mediaStateReceiverCandidate instanceof GlobalThis.customElements.get(
    mediaStateReceiverCandidate.nodeName.toLowerCase()
  ))) {
    GlobalThis.customElements.upgrade(mediaStateReceiverCandidate);
  }
  return MEDIA_UI_PROP_NAMES.some(
    (propName) => propName in mediaStateReceiverCandidate
  );
}, "hasMediaUIProps");
const isMediaStateReceiver = /* @__PURE__ */ __name((child) => {
  return hasMediaUIProps(child) || !!getMediaUIAttributesFrom(child).length;
}, "isMediaStateReceiver");
const serializeTuple = /* @__PURE__ */ __name((tuple) => {
  var _a3;
  return (_a3 = tuple == null ? void 0 : tuple.join) == null ? void 0 : _a3.call(tuple, ":");
}, "serializeTuple");
const CustomAttrSerializer = {
  [MediaUIAttributes.MEDIA_SUBTITLES_LIST]: stringifyTextTrackList,
  [MediaUIAttributes.MEDIA_SUBTITLES_SHOWING]: stringifyTextTrackList,
  [MediaUIAttributes.MEDIA_SEEKABLE]: serializeTuple,
  [MediaUIAttributes.MEDIA_BUFFERED]: (tuples) => tuples == null ? void 0 : tuples.map(serializeTuple).join(" "),
  [MediaUIAttributes.MEDIA_PREVIEW_COORDS]: (coords) => coords == null ? void 0 : coords.join(" "),
  [MediaUIAttributes.MEDIA_RENDITION_LIST]: stringifyRenditionList,
  [MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST]: stringifyAudioTrackList
};
const setAttr = /* @__PURE__ */ __name(async (child, attrName, attrValue) => {
  var _a3, _b2;
  if (!child.isConnected) {
    await delay(0);
  }
  if (typeof attrValue === "boolean" || attrValue == null) {
    return setBooleanAttr(child, attrName, attrValue);
  }
  if (typeof attrValue === "number") {
    return setNumericAttr(child, attrName, attrValue);
  }
  if (typeof attrValue === "string") {
    return setStringAttr(child, attrName, attrValue);
  }
  if (Array.isArray(attrValue) && !attrValue.length) {
    return child.removeAttribute(attrName);
  }
  const val = (_b2 = (_a3 = CustomAttrSerializer[attrName]) == null ? void 0 : _a3.call(CustomAttrSerializer, attrValue)) != null ? _b2 : attrValue;
  return child.setAttribute(attrName, val);
}, "setAttr");
const isMediaSlotElementDescendant = /* @__PURE__ */ __name((el) => {
  var _a3;
  return !!((_a3 = el.closest) == null ? void 0 : _a3.call(el, '*[slot="media"]'));
}, "isMediaSlotElementDescendant");
const traverseForMediaStateReceivers = /* @__PURE__ */ __name((rootNode, mediaStateReceiverCallback) => {
  if (isMediaSlotElementDescendant(rootNode)) {
    return;
  }
  const traverseForMediaStateReceiversSync = /* @__PURE__ */ __name((rootNode2, mediaStateReceiverCallback2) => {
    var _a3, _b2;
    if (isMediaStateReceiver(rootNode2)) {
      mediaStateReceiverCallback2(rootNode2);
    }
    const { children = [] } = rootNode2 != null ? rootNode2 : {};
    const shadowChildren = (_b2 = (_a3 = rootNode2 == null ? void 0 : rootNode2.shadowRoot) == null ? void 0 : _a3.children) != null ? _b2 : [];
    const allChildren = [...children, ...shadowChildren];
    allChildren.forEach(
      (child) => traverseForMediaStateReceivers(
        child,
        mediaStateReceiverCallback2
      )
    );
  }, "traverseForMediaStateReceiversSync");
  const name = rootNode == null ? void 0 : rootNode.nodeName.toLowerCase();
  if (name.includes("-") && !isMediaStateReceiver(rootNode)) {
    GlobalThis.customElements.whenDefined(name).then(() => {
      traverseForMediaStateReceiversSync(rootNode, mediaStateReceiverCallback);
    });
    return;
  }
  traverseForMediaStateReceiversSync(rootNode, mediaStateReceiverCallback);
}, "traverseForMediaStateReceivers");
const propagateMediaState = /* @__PURE__ */ __name((els, stateName, val) => {
  els.forEach((el) => {
    if (stateName in el) {
      el[stateName] = val;
      return;
    }
    const relevantAttrs = getMediaUIAttributesFrom(el);
    const attrName = stateName.toLowerCase();
    if (!relevantAttrs.includes(attrName))
      return;
    setAttr(el, attrName, val);
  });
}, "propagateMediaState");
const monitorForMediaStateReceivers = /* @__PURE__ */ __name((rootNode, registerMediaStateReceiver, unregisterMediaStateReceiver) => {
  traverseForMediaStateReceivers(rootNode, registerMediaStateReceiver);
  const registerMediaStateReceiverHandler = /* @__PURE__ */ __name((evt) => {
    var _a3;
    const el = (_a3 = evt == null ? void 0 : evt.composedPath()[0]) != null ? _a3 : evt.target;
    registerMediaStateReceiver(el);
  }, "registerMediaStateReceiverHandler");
  const unregisterMediaStateReceiverHandler = /* @__PURE__ */ __name((evt) => {
    var _a3;
    const el = (_a3 = evt == null ? void 0 : evt.composedPath()[0]) != null ? _a3 : evt.target;
    unregisterMediaStateReceiver(el);
  }, "unregisterMediaStateReceiverHandler");
  rootNode.addEventListener(
    MediaUIEvents.REGISTER_MEDIA_STATE_RECEIVER,
    registerMediaStateReceiverHandler
  );
  rootNode.addEventListener(
    MediaUIEvents.UNREGISTER_MEDIA_STATE_RECEIVER,
    unregisterMediaStateReceiverHandler
  );
  const mutationCallback = /* @__PURE__ */ __name((mutationsList) => {
    mutationsList.forEach((mutationRecord) => {
      const {
        addedNodes = [],
        removedNodes = [],
        type,
        target,
        attributeName
      } = mutationRecord;
      if (type === "childList") {
        Array.prototype.forEach.call(
          addedNodes,
          (node) => traverseForMediaStateReceivers(
            node,
            registerMediaStateReceiver
          )
        );
        Array.prototype.forEach.call(
          removedNodes,
          (node) => traverseForMediaStateReceivers(
            node,
            unregisterMediaStateReceiver
          )
        );
      } else if (type === "attributes" && attributeName === MediaStateReceiverAttributes.MEDIA_CHROME_ATTRIBUTES) {
        if (isMediaStateReceiver(target)) {
          registerMediaStateReceiver(target);
        } else {
          unregisterMediaStateReceiver(target);
        }
      }
    });
  }, "mutationCallback");
  let prevSlotted = [];
  const slotChangeHandler = /* @__PURE__ */ __name((event) => {
    const slotEl = event.target;
    if (slotEl.name === "media")
      return;
    prevSlotted.forEach(
      (node) => traverseForMediaStateReceivers(node, unregisterMediaStateReceiver)
    );
    prevSlotted = [
      ...slotEl.assignedElements({ flatten: true })
    ];
    prevSlotted.forEach(
      (node) => traverseForMediaStateReceivers(node, registerMediaStateReceiver)
    );
  }, "slotChangeHandler");
  rootNode.addEventListener("slotchange", slotChangeHandler);
  const observer2 = new MutationObserver(mutationCallback);
  observer2.observe(rootNode, {
    childList: true,
    attributes: true,
    subtree: true
  });
  const unsubscribe = /* @__PURE__ */ __name(() => {
    traverseForMediaStateReceivers(rootNode, unregisterMediaStateReceiver);
    rootNode.removeEventListener("slotchange", slotChangeHandler);
    observer2.disconnect();
    rootNode.removeEventListener(
      MediaUIEvents.REGISTER_MEDIA_STATE_RECEIVER,
      registerMediaStateReceiverHandler
    );
    rootNode.removeEventListener(
      MediaUIEvents.UNREGISTER_MEDIA_STATE_RECEIVER,
      unregisterMediaStateReceiverHandler
    );
  }, "unsubscribe");
  return unsubscribe;
}, "monitorForMediaStateReceivers");
if (!GlobalThis.customElements.get("media-controller")) {
  GlobalThis.customElements.define("media-controller", MediaController);
}
var media_controller_default = MediaController;
const Attributes$b = {
  PLACEMENT: "placement",
  BOUNDS: "bounds"
};
function getTemplateHTML$g(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        --_tooltip-background-color: var(--media-tooltip-background-color, var(--media-secondary-color, rgba(20, 20, 30, .7)));
        --_tooltip-background: var(--media-tooltip-background, var(--_tooltip-background-color));
        --_tooltip-arrow-half-width: calc(var(--media-tooltip-arrow-width, 12px) / 2);
        --_tooltip-arrow-height: var(--media-tooltip-arrow-height, 5px);
        --_tooltip-arrow-background: var(--media-tooltip-arrow-color, var(--_tooltip-background-color));
        position: relative;
        pointer-events: none;
        display: var(--media-tooltip-display, inline-flex);
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        z-index: var(--media-tooltip-z-index, 1);
        background: var(--_tooltip-background);
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        font: var(--media-font,
          var(--media-font-weight, 400)
          var(--media-font-size, 13px) /
          var(--media-text-content-height, var(--media-control-height, 18px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        padding: var(--media-tooltip-padding, .35em .7em);
        border: var(--media-tooltip-border, none);
        border-radius: var(--media-tooltip-border-radius, 5px);
        filter: var(--media-tooltip-filter, drop-shadow(0 0 4px rgba(0, 0, 0, .2)));
        white-space: var(--media-tooltip-white-space, nowrap);
      }

      :host([hidden]) {
        display: none;
      }

      img, svg {
        display: inline-block;
      }

      #arrow {
        position: absolute;
        width: 0px;
        height: 0px;
        border-style: solid;
        display: var(--media-tooltip-arrow-display, block);
      }

      :host(:not([placement])),
      :host([placement="top"]) {
        position: absolute;
        bottom: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host(:not([placement])) #arrow,
      :host([placement="top"]) #arrow {
        top: 100%;
        left: 50%;
        border-width: var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width);
        border-color: var(--_tooltip-arrow-background) transparent transparent transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="right"]) {
        position: absolute;
        left: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="right"]) #arrow {
        top: 50%;
        right: 100%;
        border-width: var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width) 0;
        border-color: transparent var(--_tooltip-arrow-background) transparent transparent;
        transform: translate(0, -50%);
      }

      :host([placement="bottom"]) {
        position: absolute;
        top: calc(100% + var(--media-tooltip-distance, 12px));
        left: 50%;
        transform: translate(calc(-50% - var(--media-tooltip-offset-x, 0px)), 0);
      }
      :host([placement="bottom"]) #arrow {
        bottom: 100%;
        left: 50%;
        border-width: 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height) var(--_tooltip-arrow-half-width);
        border-color: transparent transparent var(--_tooltip-arrow-background) transparent;
        transform: translate(calc(-50% + var(--media-tooltip-offset-x, 0px)), 0);
      }

      :host([placement="left"]) {
        position: absolute;
        right: calc(100% + var(--media-tooltip-distance, 12px));
        top: 50%;
        transform: translate(0, -50%);
      }
      :host([placement="left"]) #arrow {
        top: 50%;
        left: 100%;
        border-width: var(--_tooltip-arrow-half-width) 0 var(--_tooltip-arrow-half-width) var(--_tooltip-arrow-height);
        border-color: transparent transparent transparent var(--_tooltip-arrow-background);
        transform: translate(0, -50%);
      }
      
      :host([placement="none"]) #arrow {
        display: none;
      }
    </style>
    <slot></slot>
    <div id="arrow"></div>
  `
  );
}
__name(getTemplateHTML$g, "getTemplateHTML$g");
const _MediaTooltip = class _MediaTooltip extends GlobalThis.HTMLElement {
  constructor() {
    super();
    this.updateXOffset = () => {
      var _a3;
      if (!isElementVisible(this, { checkOpacity: false, checkVisibilityCSS: false }))
        return;
      const placement = this.placement;
      if (placement === "left" || placement === "right") {
        this.style.removeProperty("--media-tooltip-offset-x");
        return;
      }
      const tooltipStyle = getComputedStyle(this);
      const containingEl = (_a3 = closestComposedNode(this, "#" + this.bounds)) != null ? _a3 : getMediaController(this);
      if (!containingEl)
        return;
      const { x: containerX, width: containerWidth } = containingEl.getBoundingClientRect();
      const { x: tooltipX, width: tooltipWidth } = this.getBoundingClientRect();
      const tooltipRight = tooltipX + tooltipWidth;
      const containerRight = containerX + containerWidth;
      const offsetXVal = tooltipStyle.getPropertyValue(
        "--media-tooltip-offset-x"
      );
      const currOffsetX = offsetXVal ? parseFloat(offsetXVal.replace("px", "")) : 0;
      const marginVal = tooltipStyle.getPropertyValue(
        "--media-tooltip-container-margin"
      );
      const currMargin = marginVal ? parseFloat(marginVal.replace("px", "")) : 0;
      const leftDiff = tooltipX - containerX + currOffsetX - currMargin;
      const rightDiff = tooltipRight - containerRight + currOffsetX + currMargin;
      if (leftDiff < 0) {
        this.style.setProperty("--media-tooltip-offset-x", `${leftDiff}px`);
        return;
      }
      if (rightDiff > 0) {
        this.style.setProperty("--media-tooltip-offset-x", `${rightDiff}px`);
        return;
      }
      this.style.removeProperty("--media-tooltip-offset-x");
    };
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
    this.arrowEl = this.shadowRoot.querySelector("#arrow");
    if (Object.prototype.hasOwnProperty.call(this, "placement")) {
      const placement = this.placement;
      delete this.placement;
      this.placement = placement;
    }
  }
  static get observedAttributes() {
    return [Attributes$b.PLACEMENT, Attributes$b.BOUNDS];
  }
  /**
   * Get or set tooltip placement
   */
  get placement() {
    return getStringAttr(this, Attributes$b.PLACEMENT);
  }
  set placement(value) {
    setStringAttr(this, Attributes$b.PLACEMENT, value);
  }
  /**
   * Get or set tooltip container ID selector that will constrain the tooltips
   * horizontal position.
   */
  get bounds() {
    return getStringAttr(this, Attributes$b.BOUNDS);
  }
  set bounds(value) {
    setStringAttr(this, Attributes$b.BOUNDS, value);
  }
};
__name(_MediaTooltip, "MediaTooltip");
let MediaTooltip = _MediaTooltip;
MediaTooltip.shadowRootOptions = { mode: "open" };
MediaTooltip.getTemplateHTML = getTemplateHTML$g;
if (!GlobalThis.customElements.get("media-tooltip")) {
  GlobalThis.customElements.define("media-tooltip", MediaTooltip);
}
var media_tooltip_default = MediaTooltip;
var __accessCheck$p = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$p");
var __privateGet$p = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$p(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$p");
var __privateAdd$p = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$p");
var __privateSet$m = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$p(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$m");
var __privateMethod$b = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$p(obj, member, "access private method");
  return method;
}, "__privateMethod$b");
var _mediaController$6, _clickListener, _positionTooltip, _keyupListener, _keydownListener, _setupTooltip, setupTooltip_fn;
const Attributes$a = {
  TOOLTIP_PLACEMENT: "tooltipplacement",
  DISABLED: "disabled",
  NO_TOOLTIP: "notooltip"
};
function getTemplateHTML$f(_attrs, _props = {}) {
  return (
    /*html*/
    `
    <style>
      :host {
        position: relative;
        font: var(--media-font,
          var(--media-font-weight, bold)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        padding: var(--media-button-padding, var(--media-control-padding, 10px));
        justify-content: var(--media-button-justify-content, center);
        display: inline-flex;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        transition: background .15s linear;
        pointer-events: auto;
        cursor: var(--media-cursor, pointer);
        -webkit-tap-highlight-color: transparent;
      }

      ${/*
      Only show outline when keyboard focusing.
      https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo
    */
    ""}
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      ${/*
    * hide default focus ring, particularly when using mouse
    */
    ""}
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgba(50 50 70 / .7));
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-button-icon-width);
        height: var(--media-button-icon-height, var(--media-control-height, 24px));
        transform: var(--media-button-icon-transform);
        transition: var(--media-button-icon-transition);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
      }

      media-tooltip {
        ${/** Make sure unpositioned tooltip doesn't cause page overflow (scroll). */
    ""}
        max-width: 0;
        overflow-x: clip;
        opacity: 0;
        transition: opacity .3s, max-width 0s 9s;
      }

      :host(:hover) media-tooltip,
      :host(:focus-visible) media-tooltip {
        max-width: 100vw;
        opacity: 1;
        transition: opacity .3s;
      }

      :host([notooltip]) slot[name="tooltip"] {
        display: none;
      }
    </style>

    ${this.getSlotTemplateHTML(_attrs, _props)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${media_tooltip_default.shadowRootOptions.mode}">
          ${media_tooltip_default.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(_attrs)}
        </slot>
      </media-tooltip>
    </slot>
  `
  );
}
__name(getTemplateHTML$f, "getTemplateHTML$f");
function getSlotTemplateHTML$n(_attrs, _props) {
  return (
    /*html*/
    `
    <slot></slot>
  `
  );
}
__name(getSlotTemplateHTML$n, "getSlotTemplateHTML$n");
function getTooltipContentHTML$g() {
  return "";
}
__name(getTooltipContentHTML$g, "getTooltipContentHTML$g");
const _MediaChromeButton = class _MediaChromeButton extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$p(this, _setupTooltip);
    __privateAdd$p(this, _mediaController$6, void 0);
    this.preventClick = false;
    this.tooltipEl = null;
    __privateAdd$p(this, _clickListener, (e2) => {
      if (!this.preventClick) {
        this.handleClick(e2);
      }
      setTimeout(__privateGet$p(this, _positionTooltip), 0);
    });
    __privateAdd$p(this, _positionTooltip, () => {
      var _a3, _b2;
      (_b2 = (_a3 = this.tooltipEl) == null ? void 0 : _a3.updateXOffset) == null ? void 0 : _b2.call(_a3);
    });
    __privateAdd$p(this, _keyupListener, (e2) => {
      const { key } = e2;
      if (!this.keysUsed.includes(key)) {
        this.removeEventListener("keyup", __privateGet$p(this, _keyupListener));
        return;
      }
      if (!this.preventClick) {
        this.handleClick(e2);
      }
    });
    __privateAdd$p(this, _keydownListener, (e2) => {
      const { metaKey, altKey, key } = e2;
      if (metaKey || altKey || !this.keysUsed.includes(key)) {
        this.removeEventListener("keyup", __privateGet$p(this, _keyupListener));
        return;
      }
      this.addEventListener("keyup", __privateGet$p(this, _keyupListener), { once: true });
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      const html = this.constructor.getTemplateHTML(attrs);
      this.shadowRoot.setHTMLUnsafe ? this.shadowRoot.setHTMLUnsafe(html) : this.shadowRoot.innerHTML = html;
    }
    this.tooltipEl = this.shadowRoot.querySelector("media-tooltip");
  }
  static get observedAttributes() {
    return [
      "disabled",
      Attributes$a.TOOLTIP_PLACEMENT,
      MediaStateReceiverAttributes.MEDIA_CONTROLLER,
      MediaUIAttributes.MEDIA_LANG
    ];
  }
  enable() {
    this.addEventListener("click", __privateGet$p(this, _clickListener));
    this.addEventListener("keydown", __privateGet$p(this, _keydownListener));
    this.tabIndex = 0;
  }
  disable() {
    this.removeEventListener("click", __privateGet$p(this, _clickListener));
    this.removeEventListener("keydown", __privateGet$p(this, _keydownListener));
    this.removeEventListener("keyup", __privateGet$p(this, _keyupListener));
    this.tabIndex = -1;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2, _e3;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b2 = (_a3 = __privateGet$p(this, _mediaController$6)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
        __privateSet$m(this, _mediaController$6, null);
      }
      if (newValue && this.isConnected) {
        __privateSet$m(this, _mediaController$6, (_c2 = this.getRootNode()) == null ? void 0 : _c2.getElementById(newValue));
        (_e3 = (_d2 = __privateGet$p(this, _mediaController$6)) == null ? void 0 : _d2.associateElement) == null ? void 0 : _e3.call(_d2, this);
      }
    } else if (attrName === "disabled" && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    } else if (attrName === Attributes$a.TOOLTIP_PLACEMENT && this.tooltipEl && newValue !== oldValue) {
      this.tooltipEl.placement = newValue;
    } else if (attrName === MediaUIAttributes.MEDIA_LANG) {
      this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML = this.constructor.getTooltipContentHTML();
    }
    __privateGet$p(this, _positionTooltip).call(this);
  }
  connectedCallback() {
    var _a3, _b2, _c2;
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    style.setProperty(
      "display",
      `var(--media-control-display, var(--${this.localName}-display, inline-flex))`
    );
    if (!this.hasAttribute("disabled")) {
      this.enable();
    } else {
      this.disable();
    }
    this.setAttribute("role", "button");
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet$m(
        this,
        _mediaController$6,
        // @ts-ignore
        (_a3 = this.getRootNode()) == null ? void 0 : _a3.getElementById(mediaControllerId)
      );
      (_c2 = (_b2 = __privateGet$p(this, _mediaController$6)) == null ? void 0 : _b2.associateElement) == null ? void 0 : _c2.call(_b2, this);
    }
    GlobalThis.customElements.whenDefined("media-tooltip").then(() => __privateMethod$b(this, _setupTooltip, setupTooltip_fn).call(this));
  }
  disconnectedCallback() {
    var _a3, _b2;
    this.disable();
    (_b2 = (_a3 = __privateGet$p(this, _mediaController$6)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
    __privateSet$m(this, _mediaController$6, null);
    this.removeEventListener("mouseenter", __privateGet$p(this, _positionTooltip));
    this.removeEventListener("focus", __privateGet$p(this, _positionTooltip));
    this.removeEventListener("click", __privateGet$p(this, _clickListener));
  }
  get keysUsed() {
    return ["Enter", " "];
  }
  /**
   * Get or set tooltip placement
   */
  get tooltipPlacement() {
    return getStringAttr(this, Attributes$a.TOOLTIP_PLACEMENT);
  }
  set tooltipPlacement(value) {
    setStringAttr(this, Attributes$a.TOOLTIP_PLACEMENT, value);
  }
  get mediaController() {
    return getStringAttr(this, MediaStateReceiverAttributes.MEDIA_CONTROLLER);
  }
  set mediaController(value) {
    setStringAttr(this, MediaStateReceiverAttributes.MEDIA_CONTROLLER, value);
  }
  get disabled() {
    return getBooleanAttr(this, Attributes$a.DISABLED);
  }
  set disabled(value) {
    setBooleanAttr(this, Attributes$a.DISABLED, value);
  }
  get noTooltip() {
    return getBooleanAttr(this, Attributes$a.NO_TOOLTIP);
  }
  set noTooltip(value) {
    setBooleanAttr(this, Attributes$a.NO_TOOLTIP, value);
  }
  /**
   * @abstract
   * @argument {Event} e
   */
  handleClick(e2) {
  }
  // eslint-disable-line
};
__name(_MediaChromeButton, "MediaChromeButton");
let MediaChromeButton = _MediaChromeButton;
_mediaController$6 = /* @__PURE__ */ new WeakMap();
_clickListener = /* @__PURE__ */ new WeakMap();
_positionTooltip = /* @__PURE__ */ new WeakMap();
_keyupListener = /* @__PURE__ */ new WeakMap();
_keydownListener = /* @__PURE__ */ new WeakMap();
_setupTooltip = /* @__PURE__ */ new WeakSet();
setupTooltip_fn = /* @__PURE__ */ __name(function() {
  this.addEventListener("mouseenter", __privateGet$p(this, _positionTooltip));
  this.addEventListener("focus", __privateGet$p(this, _positionTooltip));
  this.addEventListener("click", __privateGet$p(this, _clickListener));
  const initialPlacement = this.tooltipPlacement;
  if (initialPlacement && this.tooltipEl) {
    this.tooltipEl.placement = initialPlacement;
  }
}, "setupTooltip_fn");
MediaChromeButton.shadowRootOptions = { mode: "open" };
MediaChromeButton.getTemplateHTML = getTemplateHTML$f;
MediaChromeButton.getSlotTemplateHTML = getSlotTemplateHTML$n;
MediaChromeButton.getTooltipContentHTML = getTooltipContentHTML$g;
if (!GlobalThis.customElements.get("media-chrome-button")) {
  GlobalThis.customElements.define("media-chrome-button", MediaChromeButton);
}
const airplayIcon = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;
function getSlotTemplateHTML$m(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${MediaUIAttributes.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${airplayIcon}</slot>
      <slot name="exit">${airplayIcon}</slot>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$m, "getSlotTemplateHTML$m");
function getTooltipContentHTML$f() {
  return (
    /*html*/
    `
    <slot name="tooltip-enter">${t("start airplay")}</slot>
    <slot name="tooltip-exit">${t("stop airplay")}</slot>
  `
  );
}
__name(getTooltipContentHTML$f, "getTooltipContentHTML$f");
const updateAriaLabel$7 = /* @__PURE__ */ __name((el) => {
  const label = el.mediaIsAirplaying ? t("stop airplay") : t("start airplay");
  el.setAttribute("aria-label", label);
}, "updateAriaLabel$7");
const _MediaAirplayButton = class _MediaAirplayButton extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_IS_AIRPLAYING,
      MediaUIAttributes.MEDIA_AIRPLAY_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel$7(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_IS_AIRPLAYING) {
      updateAriaLabel$7(this);
    }
  }
  /**
   * Are we currently airplaying
   */
  get mediaIsAirplaying() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_IS_AIRPLAYING);
  }
  set mediaIsAirplaying(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_IS_AIRPLAYING, value);
  }
  /**
   * Airplay unavailability state
   */
  get mediaAirplayUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_AIRPLAY_UNAVAILABLE);
  }
  set mediaAirplayUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_AIRPLAY_UNAVAILABLE, value);
  }
  handleClick() {
    const evt = new GlobalThis.CustomEvent(
      MediaUIEvents.MEDIA_AIRPLAY_REQUEST,
      {
        composed: true,
        bubbles: true
      }
    );
    this.dispatchEvent(evt);
  }
};
__name(_MediaAirplayButton, "MediaAirplayButton");
let MediaAirplayButton = _MediaAirplayButton;
MediaAirplayButton.getSlotTemplateHTML = getSlotTemplateHTML$m;
MediaAirplayButton.getTooltipContentHTML = getTooltipContentHTML$f;
if (!GlobalThis.customElements.get("media-airplay-button")) {
  GlobalThis.customElements.define("media-airplay-button", MediaAirplayButton);
}
const ccIconOn$1 = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`;
const ccIconOff$1 = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;
function getSlotTemplateHTML$l(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${ccIconOn$1}</slot>
      <slot name="off">${ccIconOff$1}</slot>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$l, "getSlotTemplateHTML$l");
function getTooltipContentHTML$e() {
  return (
    /*html*/
    `
    <slot name="tooltip-enable">${t("Enable captions")}</slot>
    <slot name="tooltip-disable">${t("Disable captions")}</slot>
  `
  );
}
__name(getTooltipContentHTML$e, "getTooltipContentHTML$e");
const updateAriaChecked$1 = /* @__PURE__ */ __name((el) => {
  el.setAttribute("aria-checked", areSubsOn(el).toString());
}, "updateAriaChecked$1");
const _MediaCaptionsButton = class _MediaCaptionsButton extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_SUBTITLES_LIST,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "switch");
    this.setAttribute("aria-label", t("closed captions"));
    updateAriaChecked$1(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_SUBTITLES_SHOWING) {
      updateAriaChecked$1(this);
    }
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesList() {
    return getSubtitlesListAttr$2(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST);
  }
  set mediaSubtitlesList(list) {
    setSubtitlesListAttr$2(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST, list);
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesShowing() {
    return getSubtitlesListAttr$2(
      this,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    );
  }
  set mediaSubtitlesShowing(list) {
    setSubtitlesListAttr$2(this, MediaUIAttributes.MEDIA_SUBTITLES_SHOWING, list);
  }
  handleClick() {
    this.dispatchEvent(
      new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_TOGGLE_SUBTITLES_REQUEST, {
        composed: true,
        bubbles: true
      })
    );
  }
};
__name(_MediaCaptionsButton, "MediaCaptionsButton");
let MediaCaptionsButton = _MediaCaptionsButton;
MediaCaptionsButton.getSlotTemplateHTML = getSlotTemplateHTML$l;
MediaCaptionsButton.getTooltipContentHTML = getTooltipContentHTML$e;
const getSubtitlesListAttr$2 = /* @__PURE__ */ __name((el, attrName) => {
  const attrVal = el.getAttribute(attrName);
  return attrVal ? parseTextTracksStr(attrVal) : [];
}, "getSubtitlesListAttr$2");
const setSubtitlesListAttr$2 = /* @__PURE__ */ __name((el, attrName, list) => {
  if (!(list == null ? void 0 : list.length)) {
    el.removeAttribute(attrName);
    return;
  }
  const newValStr = stringifyTextTrackList(list);
  const oldVal = el.getAttribute(attrName);
  if (oldVal === newValStr)
    return;
  el.setAttribute(attrName, newValStr);
}, "setSubtitlesListAttr$2");
if (!GlobalThis.customElements.get("media-captions-button")) {
  GlobalThis.customElements.define(
    "media-captions-button",
    MediaCaptionsButton
  );
}
const enterIcon = `<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>`;
const exitIcon = `<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>`;
function getSlotTemplateHTML$k(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([${MediaUIAttributes.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${MediaUIAttributes.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${enterIcon}</slot>
      <slot name="exit">${exitIcon}</slot>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$k, "getSlotTemplateHTML$k");
function getTooltipContentHTML$d() {
  return (
    /*html*/
    `
    <slot name="tooltip-enter">${t("Start casting")}</slot>
    <slot name="tooltip-exit">${t("Stop casting")}</slot>
  `
  );
}
__name(getTooltipContentHTML$d, "getTooltipContentHTML$d");
const updateAriaLabel$6 = /* @__PURE__ */ __name((el) => {
  const label = el.mediaIsCasting ? t("stop casting") : t("start casting");
  el.setAttribute("aria-label", label);
}, "updateAriaLabel$6");
const _MediaCastButton = class _MediaCastButton extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_IS_CASTING,
      MediaUIAttributes.MEDIA_CAST_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel$6(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_IS_CASTING) {
      updateAriaLabel$6(this);
    }
  }
  /**
   * @type {boolean} Are we currently casting
   */
  get mediaIsCasting() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_IS_CASTING);
  }
  set mediaIsCasting(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_IS_CASTING, value);
  }
  /**
   * @type {string | undefined} Cast unavailability state
   */
  get mediaCastUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_CAST_UNAVAILABLE);
  }
  set mediaCastUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_CAST_UNAVAILABLE, value);
  }
  handleClick() {
    const eventName = this.mediaIsCasting ? MediaUIEvents.MEDIA_EXIT_CAST_REQUEST : MediaUIEvents.MEDIA_ENTER_CAST_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
__name(_MediaCastButton, "MediaCastButton");
let MediaCastButton = _MediaCastButton;
MediaCastButton.getSlotTemplateHTML = getSlotTemplateHTML$k;
MediaCastButton.getTooltipContentHTML = getTooltipContentHTML$d;
if (!GlobalThis.customElements.get("media-cast-button")) {
  GlobalThis.customElements.define("media-cast-button", MediaCastButton);
}
var __accessCheck$o = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$o");
var __privateGet$o = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$o(obj, member, "read from private field");
  return member.get(obj);
}, "__privateGet$o");
var __privateAdd$o = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$o");
var __privateSet$l = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$o(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$l");
var __privateMethod$a = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$o(obj, member, "access private method");
  return method;
}, "__privateMethod$a");
var _isInit, _previouslyFocused$1, _invokerElement$1, _init, init_fn, _handleOpen$1, handleOpen_fn$1, _handleClosed$1, handleClosed_fn$1, _handleInvoke$1, handleInvoke_fn$1, _handleFocusOut$1, handleFocusOut_fn$1, _handleKeyDown$2, handleKeyDown_fn$2;
function getTemplateHTML$e(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        display: var(--media-dialog-display, inline-flex);
        justify-content: center;
        align-items: center;
        ${/** The hide transition is defined below after a short delay. */
    ""}
        transition-behavior: allow-discrete;
        visibility: hidden;
        opacity: 0;
        transform: translateY(2px) scale(.99);
        pointer-events: none;
      }

      :host([open]) {
        transition: display .2s, visibility 0s, opacity .2s ease-out, transform .15s ease-out;
        visibility: visible;
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
      }

      #content {
        display: flex;
        position: relative;
        box-sizing: border-box;
        width: min(320px, 100%);
        word-wrap: break-word;
        max-height: 100%;
        overflow: auto;
        text-align: center;
        line-height: 1.4;
      }
    </style>
    ${this.getSlotTemplateHTML(_attrs)}
  `
  );
}
__name(getTemplateHTML$e, "getTemplateHTML$e");
function getSlotTemplateHTML$j(_attrs) {
  return (
    /*html*/
    `
    <slot id="content"></slot>
  `
  );
}
__name(getSlotTemplateHTML$j, "getSlotTemplateHTML$j");
const Attributes$9 = {
  OPEN: "open",
  ANCHOR: "anchor"
};
const _MediaChromeDialog = class _MediaChromeDialog extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$o(this, _init);
    __privateAdd$o(this, _handleOpen$1);
    __privateAdd$o(this, _handleClosed$1);
    __privateAdd$o(this, _handleInvoke$1);
    __privateAdd$o(this, _handleFocusOut$1);
    __privateAdd$o(this, _handleKeyDown$2);
    __privateAdd$o(this, _isInit, false);
    __privateAdd$o(this, _previouslyFocused$1, null);
    __privateAdd$o(this, _invokerElement$1, null);
    this.addEventListener("invoke", this);
    this.addEventListener("focusout", this);
    this.addEventListener("keydown", this);
  }
  static get observedAttributes() {
    return [Attributes$9.OPEN, Attributes$9.ANCHOR];
  }
  get open() {
    return getBooleanAttr(this, Attributes$9.OPEN);
  }
  set open(value) {
    setBooleanAttr(this, Attributes$9.OPEN, value);
  }
  handleEvent(event) {
    switch (event.type) {
      case "invoke":
        __privateMethod$a(this, _handleInvoke$1, handleInvoke_fn$1).call(this, event);
        break;
      case "focusout":
        __privateMethod$a(this, _handleFocusOut$1, handleFocusOut_fn$1).call(this, event);
        break;
      case "keydown":
        __privateMethod$a(this, _handleKeyDown$2, handleKeyDown_fn$2).call(this, event);
        break;
    }
  }
  connectedCallback() {
    __privateMethod$a(this, _init, init_fn).call(this);
    if (!this.role) {
      this.role = "dialog";
    }
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    __privateMethod$a(this, _init, init_fn).call(this);
    if (attrName === Attributes$9.OPEN && newValue !== oldValue) {
      if (this.open) {
        __privateMethod$a(this, _handleOpen$1, handleOpen_fn$1).call(this);
      } else {
        __privateMethod$a(this, _handleClosed$1, handleClosed_fn$1).call(this);
      }
    }
  }
  focus() {
    __privateSet$l(this, _previouslyFocused$1, getActiveElement());
    const focusCancelled = !this.dispatchEvent(new Event("focus", { composed: true, cancelable: true }));
    const focusInCancelled = !this.dispatchEvent(new Event("focusin", { composed: true, bubbles: true, cancelable: true }));
    if (focusCancelled || focusInCancelled)
      return;
    const focusable = this.querySelector(
      '[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]'
    );
    focusable == null ? void 0 : focusable.focus();
  }
  get keysUsed() {
    return ["Escape", "Tab"];
  }
};
__name(_MediaChromeDialog, "MediaChromeDialog");
let MediaChromeDialog = _MediaChromeDialog;
_isInit = /* @__PURE__ */ new WeakMap();
_previouslyFocused$1 = /* @__PURE__ */ new WeakMap();
_invokerElement$1 = /* @__PURE__ */ new WeakMap();
_init = /* @__PURE__ */ new WeakSet();
init_fn = /* @__PURE__ */ __name(function() {
  if (__privateGet$o(this, _isInit))
    return;
  __privateSet$l(this, _isInit, true);
  if (!this.shadowRoot) {
    this.attachShadow(this.constructor.shadowRootOptions);
    const attrs = namedNodeMapToObject(this.attributes);
    this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    queueMicrotask(() => {
      const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
      style.setProperty(
        "transition",
        `display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in`
      );
    });
  }
}, "init_fn");
_handleOpen$1 = /* @__PURE__ */ new WeakSet();
handleOpen_fn$1 = /* @__PURE__ */ __name(function() {
  var _a3;
  (_a3 = __privateGet$o(this, _invokerElement$1)) == null ? void 0 : _a3.setAttribute("aria-expanded", "true");
  this.dispatchEvent(new Event("open", { composed: true, bubbles: true }));
  this.addEventListener("transitionend", () => this.focus(), { once: true });
}, "handleOpen_fn$1");
_handleClosed$1 = /* @__PURE__ */ new WeakSet();
handleClosed_fn$1 = /* @__PURE__ */ __name(function() {
  var _a3;
  (_a3 = __privateGet$o(this, _invokerElement$1)) == null ? void 0 : _a3.setAttribute("aria-expanded", "false");
  this.dispatchEvent(new Event("close", { composed: true, bubbles: true }));
}, "handleClosed_fn$1");
_handleInvoke$1 = /* @__PURE__ */ new WeakSet();
handleInvoke_fn$1 = /* @__PURE__ */ __name(function(event) {
  __privateSet$l(this, _invokerElement$1, event.relatedTarget);
  if (!containsComposedNode(this, event.relatedTarget)) {
    this.open = !this.open;
  }
}, "handleInvoke_fn$1");
_handleFocusOut$1 = /* @__PURE__ */ new WeakSet();
handleFocusOut_fn$1 = /* @__PURE__ */ __name(function(event) {
  var _a3;
  if (!containsComposedNode(this, event.relatedTarget)) {
    (_a3 = __privateGet$o(this, _previouslyFocused$1)) == null ? void 0 : _a3.focus();
    if (__privateGet$o(this, _invokerElement$1) && __privateGet$o(this, _invokerElement$1) !== event.relatedTarget && this.open) {
      this.open = false;
    }
  }
}, "handleFocusOut_fn$1");
_handleKeyDown$2 = /* @__PURE__ */ new WeakSet();
handleKeyDown_fn$2 = /* @__PURE__ */ __name(function(event) {
  var _a3, _b2, _c2, _d2, _e3;
  const { key, ctrlKey, altKey, metaKey } = event;
  if (ctrlKey || altKey || metaKey) {
    return;
  }
  if (!this.keysUsed.includes(key)) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  if (key === "Tab") {
    if (event.shiftKey) {
      (_b2 = (_a3 = this.previousElementSibling) == null ? void 0 : _a3.focus) == null ? void 0 : _b2.call(_a3);
    } else {
      (_d2 = (_c2 = this.nextElementSibling) == null ? void 0 : _c2.focus) == null ? void 0 : _d2.call(_c2);
    }
    this.blur();
  } else if (key === "Escape") {
    (_e3 = __privateGet$o(this, _previouslyFocused$1)) == null ? void 0 : _e3.focus();
    this.open = false;
  }
}, "handleKeyDown_fn$2");
MediaChromeDialog.shadowRootOptions = { mode: "open" };
MediaChromeDialog.getTemplateHTML = getTemplateHTML$e;
MediaChromeDialog.getSlotTemplateHTML = getSlotTemplateHTML$j;
if (!GlobalThis.customElements.get("media-chrome-dialog")) {
  GlobalThis.customElements.define("media-chrome-dialog", MediaChromeDialog);
}
var __accessCheck$n = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$n");
var __privateGet$n = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$n(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$n");
var __privateAdd$n = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$n");
var __privateSet$k = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$n(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$k");
var __privateMethod$9 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$n(obj, member, "access private method");
  return method;
}, "__privateMethod$9");
var _mediaController$5, _isInputTarget, _startpoint, _endpoint, _cssRules, _segments, _onFocusIn, _onFocusOut, _updateComputedStyles, _updateActiveSegment, updateActiveSegment_fn, _enableUserEvents, enableUserEvents_fn, _disableUserEvents, disableUserEvents_fn, _handlePointerDown, handlePointerDown_fn, _handlePointerEnter, handlePointerEnter_fn, _handlePointerUp, handlePointerUp_fn, _handlePointerLeave, handlePointerLeave_fn, _handlePointerMove$1, handlePointerMove_fn$1;
function getTemplateHTML$d(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        ${/* Don't horizontal align w/ justify-content! #container can go negative on the x-axis w/ small width. */
    ""}
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; ${/* Prevent scrolling when dragging on mobile. */
    ""}
      }

      ${/* Reset before `outline` on track could be set by a CSS var */
    ""}
      input[type=range]:focus {
        outline: 0;
      }
      input[type=range]:focus::-webkit-slider-runnable-track {
        outline: 0;
      }

      :host(:hover) {
        background: var(--media-control-hover-background, rgb(50 50 70 / .7));
      }

      #leftgap {
        padding-left: var(--media-range-padding-left, var(--_media-range-padding));
      }

      #rightgap {
        padding-right: var(--media-range-padding-right, var(--_media-range-padding));
      }

      #startpoint,
      #endpoint {
        position: absolute;
      }

      #endpoint {
        right: 0;
      }

      #container {
        ${/* Not using the CSS `padding` prop makes it easier for slide open volume ranges so the width can be zero. */
    ""}
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        ${/* The input range acts as a hover and hit zone for input events. */
    ""}
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, -7px);
        height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; ${/* Hides the slider so that custom slider can be made */
    ""}
        -webkit-tap-highlight-color: transparent;
        background: transparent; ${/* Otherwise white in Chrome */
    ""}
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, -5px);
          height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
        }
      }

      ${/* Special styling for WebKit/Blink */
    ""}
      ${/* Make thumb width/height small so it has no effect on range click position. */
    ""}
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      ${/* The thumb is not positioned relative to the track in Firefox */
    ""}
      #range::-moz-range-thumb {
        background: transparent;
        border: transparent;
        width: .1px;
        height: .1px;
      }

      #appearance {
        height: var(--media-range-track-height, 4px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        position: absolute;
        ${/* Required for Safari to stop glitching track height on hover */
    ""}
        will-change: transform;
      }

      #track {
        background: var(--media-range-track-background, rgb(255 255 255 / .2));
        border-radius: var(--media-range-track-border-radius, 1px);
        border: var(--media-range-track-border, none);
        outline: var(--media-range-track-outline);
        outline-offset: var(--media-range-track-outline-offset);
        backdrop-filter: var(--media-range-track-backdrop-filter);
        -webkit-backdrop-filter: var(--media-range-track-backdrop-filter);
        box-shadow: var(--media-range-track-box-shadow, none);
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      #progress,
      #pointer {
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #progress {
        background: var(--media-range-bar-color, var(--media-primary-color, rgb(238 238 238)));
        transition: var(--media-range-track-transition);
      }

      #pointer {
        background: var(--media-range-track-pointer-background);
        border-right: var(--media-range-track-pointer-border-right);
        transition: visibility .25s, opacity .25s;
        visibility: hidden;
        opacity: 0;
      }

      @media (hover: hover) {
        :host(:hover) #pointer {
          transition: visibility .5s, opacity .5s;
          visibility: visible;
          opacity: 1;
        }
      }

      #thumb,
      ::slotted([slot=thumb]) {
        width: var(--media-range-thumb-width, 10px);
        height: var(--media-range-thumb-height, 10px);
        transition: var(--media-range-thumb-transition);
        transform: var(--media-range-thumb-transform, none);
        opacity: var(--media-range-thumb-opacity, 1);
        translate: -50%;
        position: absolute;
        left: 0;
        cursor: var(--media-cursor, pointer);
      }

      #thumb {
        border-radius: var(--media-range-thumb-border-radius, 10px);
        background: var(--media-range-thumb-background, var(--media-primary-color, rgb(238 238 238)));
        box-shadow: var(--media-range-thumb-box-shadow, 1px 1px 1px transparent);
        border: var(--media-range-thumb-border, none);
      }

      :host([disabled]) #thumb {
        background-color: #777;
      }

      .segments #appearance {
        height: var(--media-range-segment-hover-height, 7px);
      }

      #track {
        clip-path: url(#segments-clipping);
      }

      #segments {
        --segments-gap: var(--media-range-segments-gap, 2px);
        position: absolute;
        width: 100%;
        height: 100%;
      }

      #segments-clipping {
        transform: translateX(calc(var(--segments-gap) / 2));
      }

      #segments-clipping:empty {
        display: none;
      }

      #segments-clipping rect {
        height: var(--media-range-track-height, 4px);
        y: calc((var(--media-range-segment-hover-height, 7px) - var(--media-range-track-height, 4px)) / 2);
        transition: var(--media-range-segment-transition, transform .1s ease-in-out);
        transform: var(--media-range-segment-transform, scaleY(1));
        transform-origin: center;
      }
    </style>
    <div id="leftgap"></div>
    <div id="container">
      <div id="startpoint"></div>
      <div id="endpoint"></div>
      <div id="appearance">
        <div id="track" part="track">
          <div id="pointer"></div>
          <div id="progress" part="progress"></div>
        </div>
        <slot name="thumb">
          <div id="thumb" part="thumb"></div>
        </slot>
        <svg id="segments"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
      <input id="range" type="range" min="0" max="1" step="any" value="0">
    </div>
    <div id="rightgap"></div>
  `
  );
}
__name(getTemplateHTML$d, "getTemplateHTML$d");
const _MediaChromeRange = class _MediaChromeRange extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$n(this, _updateActiveSegment);
    __privateAdd$n(this, _enableUserEvents);
    __privateAdd$n(this, _disableUserEvents);
    __privateAdd$n(this, _handlePointerDown);
    __privateAdd$n(this, _handlePointerEnter);
    __privateAdd$n(this, _handlePointerUp);
    __privateAdd$n(this, _handlePointerLeave);
    __privateAdd$n(this, _handlePointerMove$1);
    __privateAdd$n(this, _mediaController$5, void 0);
    __privateAdd$n(this, _isInputTarget, void 0);
    __privateAdd$n(this, _startpoint, void 0);
    __privateAdd$n(this, _endpoint, void 0);
    __privateAdd$n(this, _cssRules, {});
    __privateAdd$n(this, _segments, []);
    __privateAdd$n(this, _onFocusIn, () => {
      if (this.range.matches(":focus-visible")) {
        const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
        style.setProperty(
          "--_focus-visible-box-shadow",
          "var(--_focus-box-shadow)"
        );
      }
    });
    __privateAdd$n(this, _onFocusOut, () => {
      const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
      style.removeProperty("--_focus-visible-box-shadow");
    });
    __privateAdd$n(this, _updateComputedStyles, () => {
      const clipping = this.shadowRoot.querySelector("#segments-clipping");
      if (clipping)
        clipping.parentNode.append(clipping);
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      const html = this.constructor.getTemplateHTML(attrs);
      this.shadowRoot.setHTMLUnsafe ? this.shadowRoot.setHTMLUnsafe(html) : this.shadowRoot.innerHTML = html;
    }
    this.container = this.shadowRoot.querySelector("#container");
    __privateSet$k(this, _startpoint, this.shadowRoot.querySelector("#startpoint"));
    __privateSet$k(this, _endpoint, this.shadowRoot.querySelector("#endpoint"));
    this.range = this.shadowRoot.querySelector("#range");
    this.appearance = this.shadowRoot.querySelector("#appearance");
  }
  static get observedAttributes() {
    return [
      "disabled",
      "aria-disabled",
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2, _e3;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b2 = (_a3 = __privateGet$n(this, _mediaController$5)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
        __privateSet$k(this, _mediaController$5, null);
      }
      if (newValue && this.isConnected) {
        __privateSet$k(this, _mediaController$5, (_c2 = this.getRootNode()) == null ? void 0 : _c2.getElementById(newValue));
        (_e3 = (_d2 = __privateGet$n(this, _mediaController$5)) == null ? void 0 : _d2.associateElement) == null ? void 0 : _e3.call(_d2, this);
      }
    } else if (attrName === "disabled" || attrName === "aria-disabled" && oldValue !== newValue) {
      if (newValue == null) {
        this.range.removeAttribute(attrName);
        __privateMethod$9(this, _enableUserEvents, enableUserEvents_fn).call(this);
      } else {
        this.range.setAttribute(attrName, newValue);
        __privateMethod$9(this, _disableUserEvents, disableUserEvents_fn).call(this);
      }
    }
  }
  connectedCallback() {
    var _a3, _b2, _c2;
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    style.setProperty(
      "display",
      `var(--media-control-display, var(--${this.localName}-display, inline-flex))`
    );
    __privateGet$n(this, _cssRules).pointer = getOrInsertCSSRule(this.shadowRoot, "#pointer");
    __privateGet$n(this, _cssRules).progress = getOrInsertCSSRule(this.shadowRoot, "#progress");
    __privateGet$n(this, _cssRules).thumb = getOrInsertCSSRule(
      this.shadowRoot,
      '#thumb, ::slotted([slot="thumb"])'
    );
    __privateGet$n(this, _cssRules).activeSegment = getOrInsertCSSRule(
      this.shadowRoot,
      "#segments-clipping rect:nth-child(0)"
    );
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet$k(this, _mediaController$5, (_a3 = this.getRootNode()) == null ? void 0 : _a3.getElementById(
        mediaControllerId
      ));
      (_c2 = (_b2 = __privateGet$n(this, _mediaController$5)) == null ? void 0 : _b2.associateElement) == null ? void 0 : _c2.call(_b2, this);
    }
    this.updateBar();
    this.shadowRoot.addEventListener("focusin", __privateGet$n(this, _onFocusIn));
    this.shadowRoot.addEventListener("focusout", __privateGet$n(this, _onFocusOut));
    __privateMethod$9(this, _enableUserEvents, enableUserEvents_fn).call(this);
    observeResize(this.container, __privateGet$n(this, _updateComputedStyles));
  }
  disconnectedCallback() {
    var _a3, _b2;
    __privateMethod$9(this, _disableUserEvents, disableUserEvents_fn).call(this);
    (_b2 = (_a3 = __privateGet$n(this, _mediaController$5)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
    __privateSet$k(this, _mediaController$5, null);
    this.shadowRoot.removeEventListener("focusin", __privateGet$n(this, _onFocusIn));
    this.shadowRoot.removeEventListener("focusout", __privateGet$n(this, _onFocusOut));
    unobserveResize(this.container, __privateGet$n(this, _updateComputedStyles));
  }
  updatePointerBar(evt) {
    var _a3;
    (_a3 = __privateGet$n(this, _cssRules).pointer) == null ? void 0 : _a3.style.setProperty(
      "width",
      `${this.getPointerRatio(evt) * 100}%`
    );
  }
  updateBar() {
    var _a3, _b2;
    const rangePercent = this.range.valueAsNumber * 100;
    (_a3 = __privateGet$n(this, _cssRules).progress) == null ? void 0 : _a3.style.setProperty("width", `${rangePercent}%`);
    (_b2 = __privateGet$n(this, _cssRules).thumb) == null ? void 0 : _b2.style.setProperty("left", `${rangePercent}%`);
  }
  updateSegments(segments) {
    const clipping = this.shadowRoot.querySelector("#segments-clipping");
    clipping.textContent = "";
    this.container.classList.toggle("segments", !!(segments == null ? void 0 : segments.length));
    if (!(segments == null ? void 0 : segments.length))
      return;
    const normalized = [
      .../* @__PURE__ */ new Set([
        +this.range.min,
        ...segments.flatMap((s2) => [s2.start, s2.end]),
        +this.range.max
      ])
    ];
    __privateSet$k(this, _segments, [...normalized]);
    const lastMarker = normalized.pop();
    for (const [i2, marker] of normalized.entries()) {
      const [isFirst, isLast] = [i2 === 0, i2 === normalized.length - 1];
      const x2 = isFirst ? "calc(var(--segments-gap) / -1)" : `${marker * 100}%`;
      const x22 = isLast ? lastMarker : normalized[i2 + 1];
      const width = `calc(${(x22 - marker) * 100}%${isFirst || isLast ? "" : ` - var(--segments-gap)`})`;
      const segmentEl = Document$1.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      const cssRule = insertCSSRule(
        this.shadowRoot,
        `#segments-clipping rect:nth-child(${i2 + 1})`
      );
      cssRule.style.setProperty("x", x2);
      cssRule.style.setProperty("width", width);
      clipping.append(segmentEl);
    }
  }
  getPointerRatio(evt) {
    return getPointProgressOnLine(
      evt.clientX,
      evt.clientY,
      __privateGet$n(this, _startpoint).getBoundingClientRect(),
      __privateGet$n(this, _endpoint).getBoundingClientRect()
    );
  }
  get dragging() {
    return this.hasAttribute("dragging");
  }
  handleEvent(evt) {
    switch (evt.type) {
      case "pointermove":
        __privateMethod$9(this, _handlePointerMove$1, handlePointerMove_fn$1).call(this, evt);
        break;
      case "input":
        this.updateBar();
        break;
      case "pointerenter":
        __privateMethod$9(this, _handlePointerEnter, handlePointerEnter_fn).call(this, evt);
        break;
      case "pointerdown":
        __privateMethod$9(this, _handlePointerDown, handlePointerDown_fn).call(this, evt);
        break;
      case "pointerup":
        __privateMethod$9(this, _handlePointerUp, handlePointerUp_fn).call(this);
        break;
      case "pointerleave":
        __privateMethod$9(this, _handlePointerLeave, handlePointerLeave_fn).call(this);
        break;
    }
  }
  get keysUsed() {
    return ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
  }
};
__name(_MediaChromeRange, "MediaChromeRange");
let MediaChromeRange = _MediaChromeRange;
_mediaController$5 = /* @__PURE__ */ new WeakMap();
_isInputTarget = /* @__PURE__ */ new WeakMap();
_startpoint = /* @__PURE__ */ new WeakMap();
_endpoint = /* @__PURE__ */ new WeakMap();
_cssRules = /* @__PURE__ */ new WeakMap();
_segments = /* @__PURE__ */ new WeakMap();
_onFocusIn = /* @__PURE__ */ new WeakMap();
_onFocusOut = /* @__PURE__ */ new WeakMap();
_updateComputedStyles = /* @__PURE__ */ new WeakMap();
_updateActiveSegment = /* @__PURE__ */ new WeakSet();
updateActiveSegment_fn = /* @__PURE__ */ __name(function(evt) {
  const rule = __privateGet$n(this, _cssRules).activeSegment;
  if (!rule)
    return;
  const pointerRatio = this.getPointerRatio(evt);
  const segmentIndex = __privateGet$n(this, _segments).findIndex((start, i2, arr) => {
    const end = arr[i2 + 1];
    return end != null && pointerRatio >= start && pointerRatio <= end;
  });
  const selectorText = `#segments-clipping rect:nth-child(${segmentIndex + 1})`;
  if (rule.selectorText != selectorText || !rule.style.transform) {
    rule.selectorText = selectorText;
    rule.style.setProperty(
      "transform",
      "var(--media-range-segment-hover-transform, scaleY(2))"
    );
  }
}, "updateActiveSegment_fn");
_enableUserEvents = /* @__PURE__ */ new WeakSet();
enableUserEvents_fn = /* @__PURE__ */ __name(function() {
  if (this.hasAttribute("disabled"))
    return;
  this.addEventListener("input", this);
  this.addEventListener("pointerdown", this);
  this.addEventListener("pointerenter", this);
}, "enableUserEvents_fn");
_disableUserEvents = /* @__PURE__ */ new WeakSet();
disableUserEvents_fn = /* @__PURE__ */ __name(function() {
  var _a3, _b2;
  this.removeEventListener("input", this);
  this.removeEventListener("pointerdown", this);
  this.removeEventListener("pointerenter", this);
  (_a3 = GlobalThis.window) == null ? void 0 : _a3.removeEventListener("pointerup", this);
  (_b2 = GlobalThis.window) == null ? void 0 : _b2.removeEventListener("pointermove", this);
}, "disableUserEvents_fn");
_handlePointerDown = /* @__PURE__ */ new WeakSet();
handlePointerDown_fn = /* @__PURE__ */ __name(function(evt) {
  var _a3;
  __privateSet$k(this, _isInputTarget, evt.composedPath().includes(this.range));
  (_a3 = GlobalThis.window) == null ? void 0 : _a3.addEventListener("pointerup", this);
}, "handlePointerDown_fn");
_handlePointerEnter = /* @__PURE__ */ new WeakSet();
handlePointerEnter_fn = /* @__PURE__ */ __name(function(evt) {
  var _a3;
  if (evt.pointerType !== "mouse")
    __privateMethod$9(this, _handlePointerDown, handlePointerDown_fn).call(this, evt);
  this.addEventListener("pointerleave", this);
  (_a3 = GlobalThis.window) == null ? void 0 : _a3.addEventListener("pointermove", this);
}, "handlePointerEnter_fn");
_handlePointerUp = /* @__PURE__ */ new WeakSet();
handlePointerUp_fn = /* @__PURE__ */ __name(function() {
  var _a3;
  (_a3 = GlobalThis.window) == null ? void 0 : _a3.removeEventListener("pointerup", this);
  this.toggleAttribute("dragging", false);
  this.range.disabled = this.hasAttribute("disabled");
}, "handlePointerUp_fn");
_handlePointerLeave = /* @__PURE__ */ new WeakSet();
handlePointerLeave_fn = /* @__PURE__ */ __name(function() {
  var _a3, _b2;
  this.removeEventListener("pointerleave", this);
  (_a3 = GlobalThis.window) == null ? void 0 : _a3.removeEventListener("pointermove", this);
  this.toggleAttribute("dragging", false);
  this.range.disabled = this.hasAttribute("disabled");
  (_b2 = __privateGet$n(this, _cssRules).activeSegment) == null ? void 0 : _b2.style.removeProperty("transform");
}, "handlePointerLeave_fn");
_handlePointerMove$1 = /* @__PURE__ */ new WeakSet();
handlePointerMove_fn$1 = /* @__PURE__ */ __name(function(evt) {
  if (evt.pointerType === "pen" && evt.buttons === 0) {
    return;
  }
  this.toggleAttribute(
    "dragging",
    evt.buttons === 1 || evt.pointerType !== "mouse"
  );
  this.updatePointerBar(evt);
  __privateMethod$9(this, _updateActiveSegment, updateActiveSegment_fn).call(this, evt);
  if (this.dragging && (evt.pointerType !== "mouse" || !__privateGet$n(this, _isInputTarget))) {
    this.range.disabled = true;
    this.range.valueAsNumber = this.getPointerRatio(evt);
    this.range.dispatchEvent(
      new Event("input", { bubbles: true, composed: true })
    );
  }
}, "handlePointerMove_fn$1");
MediaChromeRange.shadowRootOptions = { mode: "open" };
MediaChromeRange.getTemplateHTML = getTemplateHTML$d;
if (!GlobalThis.customElements.get("media-chrome-range")) {
  GlobalThis.customElements.define("media-chrome-range", MediaChromeRange);
}
var __accessCheck$m = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$m");
var __privateGet$m = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$m(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$m");
var __privateAdd$m = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$m");
var __privateSet$j = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$m(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$j");
var _mediaController$4;
function getTemplateHTML$c(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        ${/* Need position to display above video for some reason */
    ""}
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-control-bar-display, inline-flex));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --media-loading-indicator-icon-height: 44px;
      }

      ::slotted(media-time-range),
      ::slotted(media-volume-range) {
        min-height: 100%;
      }

      ::slotted(media-time-range),
      ::slotted(media-clip-selector) {
        flex-grow: 1;
      }

      ::slotted([role="menu"]) {
        position: absolute;
      }
    </style>

    <slot></slot>
  `
  );
}
__name(getTemplateHTML$c, "getTemplateHTML$c");
const _MediaControlBar = class _MediaControlBar extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$m(this, _mediaController$4, void 0);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  static get observedAttributes() {
    return [MediaStateReceiverAttributes.MEDIA_CONTROLLER];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2, _e3;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b2 = (_a3 = __privateGet$m(this, _mediaController$4)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
        __privateSet$j(this, _mediaController$4, null);
      }
      if (newValue && this.isConnected) {
        __privateSet$j(this, _mediaController$4, (_c2 = this.getRootNode()) == null ? void 0 : _c2.getElementById(newValue));
        (_e3 = (_d2 = __privateGet$m(this, _mediaController$4)) == null ? void 0 : _d2.associateElement) == null ? void 0 : _e3.call(_d2, this);
      }
    }
  }
  connectedCallback() {
    var _a3, _b2, _c2;
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet$j(this, _mediaController$4, (_a3 = this.getRootNode()) == null ? void 0 : _a3.getElementById(
        mediaControllerId
      ));
      (_c2 = (_b2 = __privateGet$m(this, _mediaController$4)) == null ? void 0 : _b2.associateElement) == null ? void 0 : _c2.call(_b2, this);
    }
  }
  disconnectedCallback() {
    var _a3, _b2;
    (_b2 = (_a3 = __privateGet$m(this, _mediaController$4)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
    __privateSet$j(this, _mediaController$4, null);
  }
};
__name(_MediaControlBar, "MediaControlBar");
let MediaControlBar = _MediaControlBar;
_mediaController$4 = /* @__PURE__ */ new WeakMap();
MediaControlBar.shadowRootOptions = { mode: "open" };
MediaControlBar.getTemplateHTML = getTemplateHTML$c;
if (!GlobalThis.customElements.get("media-control-bar")) {
  GlobalThis.customElements.define("media-control-bar", MediaControlBar);
}
var __accessCheck$l = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$l");
var __privateGet$l = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$l(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$l");
var __privateAdd$l = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$l");
var __privateSet$i = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$l(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$i");
var _mediaController$3;
function getTemplateHTML$b(_attrs, _props = {}) {
  return (
    /*html*/
    `
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        background: var(--media-text-background, var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7))));
        padding: var(--media-control-padding, 10px);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        pointer-events: auto;
      }

      ${/*
      Only show outline when keyboard focusing.
      https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo
    */
    ""}
      :host(:focus-visible) {
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }

      ${/*
    * hide default focus ring, particularly when using mouse
    */
    ""}
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(_attrs, _props)}
  `
  );
}
__name(getTemplateHTML$b, "getTemplateHTML$b");
function getSlotTemplateHTML$i(_attrs, _props) {
  return (
    /*html*/
    `
    <slot></slot>
  `
  );
}
__name(getSlotTemplateHTML$i, "getSlotTemplateHTML$i");
const _MediaTextDisplay = class _MediaTextDisplay extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$l(this, _mediaController$3, void 0);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  static get observedAttributes() {
    return [MediaStateReceiverAttributes.MEDIA_CONTROLLER];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2, _e3;
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b2 = (_a3 = __privateGet$l(this, _mediaController$3)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
        __privateSet$i(this, _mediaController$3, null);
      }
      if (newValue && this.isConnected) {
        __privateSet$i(this, _mediaController$3, (_c2 = this.getRootNode()) == null ? void 0 : _c2.getElementById(newValue));
        (_e3 = (_d2 = __privateGet$l(this, _mediaController$3)) == null ? void 0 : _d2.associateElement) == null ? void 0 : _e3.call(_d2, this);
      }
    }
  }
  connectedCallback() {
    var _a3, _b2, _c2;
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    style.setProperty(
      "display",
      `var(--media-control-display, var(--${this.localName}-display, inline-flex))`
    );
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet$i(this, _mediaController$3, (_a3 = this.getRootNode()) == null ? void 0 : _a3.getElementById(
        mediaControllerId
      ));
      (_c2 = (_b2 = __privateGet$l(this, _mediaController$3)) == null ? void 0 : _b2.associateElement) == null ? void 0 : _c2.call(_b2, this);
    }
  }
  disconnectedCallback() {
    var _a3, _b2;
    (_b2 = (_a3 = __privateGet$l(this, _mediaController$3)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
    __privateSet$i(this, _mediaController$3, null);
  }
};
__name(_MediaTextDisplay, "MediaTextDisplay");
let MediaTextDisplay = _MediaTextDisplay;
_mediaController$3 = /* @__PURE__ */ new WeakMap();
MediaTextDisplay.shadowRootOptions = { mode: "open" };
MediaTextDisplay.getTemplateHTML = getTemplateHTML$b;
MediaTextDisplay.getSlotTemplateHTML = getSlotTemplateHTML$i;
if (!GlobalThis.customElements.get("media-text-display")) {
  GlobalThis.customElements.define("media-text-display", MediaTextDisplay);
}
var __accessCheck$k = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$k");
var __privateGet$k = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$k(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$k");
var __privateAdd$k = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$k");
var __privateSet$h = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$k(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$h");
var _slot$3;
function getSlotTemplateHTML$h(_attrs, props) {
  return (
    /*html*/
    `
    <slot>${formatTime(props.mediaDuration)}</slot>
  `
  );
}
__name(getSlotTemplateHTML$h, "getSlotTemplateHTML$h");
const _MediaDurationDisplay = class _MediaDurationDisplay extends MediaTextDisplay {
  constructor() {
    var _a3;
    super();
    __privateAdd$k(this, _slot$3, void 0);
    __privateSet$h(this, _slot$3, this.shadowRoot.querySelector("slot"));
    __privateGet$k(this, _slot$3).textContent = formatTime((_a3 = this.mediaDuration) != null ? _a3 : 0);
  }
  static get observedAttributes() {
    return [...super.observedAttributes, MediaUIAttributes.MEDIA_DURATION];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === MediaUIAttributes.MEDIA_DURATION) {
      __privateGet$k(this, _slot$3).textContent = formatTime(+newValue);
    }
    super.attributeChangedCallback(attrName, oldValue, newValue);
  }
  /**
   * @type {number | undefined} In seconds
   */
  get mediaDuration() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_DURATION);
  }
  set mediaDuration(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_DURATION, time);
  }
};
__name(_MediaDurationDisplay, "MediaDurationDisplay");
let MediaDurationDisplay = _MediaDurationDisplay;
_slot$3 = /* @__PURE__ */ new WeakMap();
MediaDurationDisplay.getSlotTemplateHTML = getSlotTemplateHTML$h;
if (!GlobalThis.customElements.get("media-duration-display")) {
  GlobalThis.customElements.define(
    "media-duration-display",
    MediaDurationDisplay
  );
}
const defaultErrorTitles = {
  2: t("Network Error"),
  3: t("Decode Error"),
  4: t("Source Not Supported"),
  5: t("Encryption Error")
};
const defaultErrorMessages = {
  2: t("A network error caused the media download to fail."),
  3: t(
    "A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."
  ),
  4: t(
    "An unsupported error occurred. The server or network failed, or your browser does not support this format."
  ),
  5: t("The media is encrypted and there are no keys to decrypt it.")
};
const formatError = /* @__PURE__ */ __name((error) => {
  var _a3, _b2;
  if (error.code === 1)
    return null;
  return {
    title: (_a3 = defaultErrorTitles[error.code]) != null ? _a3 : `Error ${error.code}`,
    message: (_b2 = defaultErrorMessages[error.code]) != null ? _b2 : error.message
  };
}, "formatError");
var __accessCheck$j = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$j");
var __privateGet$j = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$j(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$j");
var __privateAdd$j = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$j");
var __privateSet$g = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$j(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$g");
var _mediaError;
function getSlotTemplateHTML$g(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        background: rgb(20 20 30 / .8);
      }

      #content {
        display: block;
        padding: 1.2em 1.5em;
      }

      h3,
      p {
        margin-block: 0 .3em;
      }
    </style>
    <slot name="error-${attrs.mediaerrorcode}" id="content">
      ${formatErrorMessage({ code: +attrs.mediaerrorcode, message: attrs.mediaerrormessage })}
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$g, "getSlotTemplateHTML$g");
function shouldOpenErrorDialog(error) {
  return error.code && formatError(error) !== null;
}
__name(shouldOpenErrorDialog, "shouldOpenErrorDialog");
function formatErrorMessage(error) {
  var _a3;
  const { title, message } = (_a3 = formatError(error)) != null ? _a3 : {};
  let html = "";
  if (title)
    html += `<slot name="error-${error.code}-title"><h3>${title}</h3></slot>`;
  if (message)
    html += `<slot name="error-${error.code}-message"><p>${message}</p></slot>`;
  return html;
}
__name(formatErrorMessage, "formatErrorMessage");
const observedAttributes = [
  MediaUIAttributes.MEDIA_ERROR_CODE,
  MediaUIAttributes.MEDIA_ERROR_MESSAGE
];
const _MediaErrorDialog = class _MediaErrorDialog extends MediaChromeDialog {
  constructor() {
    super(...arguments);
    __privateAdd$j(this, _mediaError, null);
  }
  static get observedAttributes() {
    return [...super.observedAttributes, ...observedAttributes];
  }
  formatErrorMessage(error) {
    return this.constructor.formatErrorMessage(error);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3;
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (!observedAttributes.includes(attrName))
      return;
    const mediaError = (_a3 = this.mediaError) != null ? _a3 : {
      code: this.mediaErrorCode,
      message: this.mediaErrorMessage
    };
    this.open = shouldOpenErrorDialog(mediaError);
    if (this.open) {
      this.shadowRoot.querySelector("slot").name = `error-${this.mediaErrorCode}`;
      this.shadowRoot.querySelector("#content").innerHTML = this.formatErrorMessage(mediaError);
    }
  }
  get mediaError() {
    return __privateGet$j(this, _mediaError);
  }
  set mediaError(value) {
    __privateSet$g(this, _mediaError, value);
  }
  get mediaErrorCode() {
    return getNumericAttr(this, "mediaerrorcode");
  }
  set mediaErrorCode(value) {
    setNumericAttr(this, "mediaerrorcode", value);
  }
  get mediaErrorMessage() {
    return getStringAttr(this, "mediaerrormessage");
  }
  set mediaErrorMessage(value) {
    setStringAttr(this, "mediaerrormessage", value);
  }
};
__name(_MediaErrorDialog, "MediaErrorDialog");
let MediaErrorDialog = _MediaErrorDialog;
_mediaError = /* @__PURE__ */ new WeakMap();
MediaErrorDialog.getSlotTemplateHTML = getSlotTemplateHTML$g;
MediaErrorDialog.formatErrorMessage = formatErrorMessage;
if (!GlobalThis.customElements.get("media-error-dialog")) {
  GlobalThis.customElements.define("media-error-dialog", MediaErrorDialog);
}
var media_error_dialog_default = MediaErrorDialog;
var __accessCheck$i = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$i");
var __privateGet$i = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$i(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$i");
var __privateAdd$i = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$i");
var _clickHandler, _keyDownHandler;
function getSlotTemplateHTML$f(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        background: rgb(20 20 30 / .8);
        backdrop-filter: blur(10px);
      }

      #content {
        display: block;
        width: clamp(400px, 40vw, 700px);
        max-width: 90vw;
        text-align: left;
      }

      h2 {
        margin: 0 0 1.5rem 0;
        font-size: 1.5rem;
        font-weight: 500;
        text-align: center;
      }

      .shortcuts-table {
        width: 100%;
        border-collapse: collapse;
      }

      .shortcuts-table tr {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .shortcuts-table tr:last-child {
        border-bottom: none;
      }

      .shortcuts-table td {
        padding: 0.75rem 0.5rem;
      }

      .shortcuts-table td:first-child {
        text-align: right;
        padding-right: 1rem;
        width: 40%;
        min-width: 120px;
      }

      .shortcuts-table td:last-child {
        padding-left: 1rem;
      }

      .key {
        display: inline-block;
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 4px;
        padding: 0.25rem 0.5rem;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        font-weight: 500;
        min-width: 1.5rem;
        text-align: center;
        margin: 0 0.2rem;
      }

      .description {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.95rem;
      }

      .key-combo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.3rem;
      }

      .key-separator {
        color: rgba(255, 255, 255, 0.5);
        font-size: 0.9rem;
      }
    </style>
    <slot id="content">
      ${formatKeyboardShortcuts()}
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$f, "getSlotTemplateHTML$f");
function formatKeyboardShortcuts() {
  const shortcuts = [
    { keys: ["Space", "k"], description: "Toggle Playback" },
    { keys: ["m"], description: "Toggle mute" },
    { keys: ["f"], description: "Toggle fullscreen" },
    { keys: ["c"], description: "Toggle captions or subtitles, if available" },
    { keys: ["p"], description: "Toggle Picture in Picture" },
    { keys: ["←", "j"], description: "Seek back 10s" },
    { keys: ["→", "l"], description: "Seek forward 10s" },
    { keys: ["↑"], description: "Turn volume up" },
    { keys: ["↓"], description: "Turn volume down" },
    { keys: ["< (SHIFT+,)"], description: "Decrease playback rate" },
    { keys: ["> (SHIFT+.)"], description: "Increase playback rate" }
  ];
  const rows = shortcuts.map(({ keys, description }) => {
    const keyCombo = keys.map(
      (key, index) => index > 0 ? `<span class="key-separator">or</span><span class="key">${key}</span>` : `<span class="key">${key}</span>`
    ).join("");
    return `
      <tr>
        <td>
          <div class="key-combo">${keyCombo}</div>
        </td>
        <td class="description">${description}</td>
      </tr>
    `;
  }).join("");
  return `
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${rows}</table>
  `;
}
__name(formatKeyboardShortcuts, "formatKeyboardShortcuts");
const _MediaKeyboardShortcutsDialog = class _MediaKeyboardShortcutsDialog extends MediaChromeDialog {
  constructor() {
    super(...arguments);
    __privateAdd$i(this, _clickHandler, (e2) => {
      var _a3;
      if (!this.open)
        return;
      const content = (_a3 = this.shadowRoot) == null ? void 0 : _a3.querySelector("#content");
      if (!content)
        return;
      const path = e2.composedPath();
      const isClickOnHost = path[0] === this || path.includes(this);
      const isClickInsideContent = path.includes(content);
      if (isClickOnHost && !isClickInsideContent) {
        this.open = false;
      }
    });
    __privateAdd$i(this, _keyDownHandler, (e2) => {
      if (!this.open)
        return;
      const isShiftSlash = e2.shiftKey && (e2.key === "/" || e2.key === "?");
      if ((e2.key === "Escape" || isShiftSlash) && !e2.ctrlKey && !e2.altKey && !e2.metaKey) {
        this.open = false;
        e2.preventDefault();
        e2.stopPropagation();
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.open) {
      this.addEventListener("click", __privateGet$i(this, _clickHandler));
      document.addEventListener("keydown", __privateGet$i(this, _keyDownHandler));
    }
  }
  disconnectedCallback() {
    this.removeEventListener("click", __privateGet$i(this, _clickHandler));
    document.removeEventListener("keydown", __privateGet$i(this, _keyDownHandler));
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === "open") {
      if (this.open) {
        this.addEventListener("click", __privateGet$i(this, _clickHandler));
        document.addEventListener("keydown", __privateGet$i(this, _keyDownHandler));
      } else {
        this.removeEventListener("click", __privateGet$i(this, _clickHandler));
        document.removeEventListener("keydown", __privateGet$i(this, _keyDownHandler));
      }
    }
  }
};
__name(_MediaKeyboardShortcutsDialog, "MediaKeyboardShortcutsDialog");
let MediaKeyboardShortcutsDialog = _MediaKeyboardShortcutsDialog;
_clickHandler = /* @__PURE__ */ new WeakMap();
_keyDownHandler = /* @__PURE__ */ new WeakMap();
MediaKeyboardShortcutsDialog.getSlotTemplateHTML = getSlotTemplateHTML$f;
if (!GlobalThis.customElements.get("media-keyboard-shortcuts-dialog")) {
  GlobalThis.customElements.define("media-keyboard-shortcuts-dialog", MediaKeyboardShortcutsDialog);
}
var __accessCheck$h = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$h");
var __privateGet$h = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$h(obj, member, "read from private field");
  return member.get(obj);
}, "__privateGet$h");
var __privateAdd$h = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$h");
var __privateSet$f = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$h(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$f");
var _lastActionEvent;
const enterFullscreenIcon = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`;
const exitFullscreenIcon = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;
function getSlotTemplateHTML$e(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${MediaUIAttributes.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${enterFullscreenIcon}</slot>
      <slot name="exit">${exitFullscreenIcon}</slot>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$e, "getSlotTemplateHTML$e");
function getTooltipContentHTML$c() {
  return (
    /*html*/
    `
    <slot name="tooltip-enter">${t("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${t("Exit fullscreen mode")}</slot>
  `
  );
}
__name(getTooltipContentHTML$c, "getTooltipContentHTML$c");
const updateAriaLabel$5 = /* @__PURE__ */ __name((el) => {
  const label = el.mediaIsFullscreen ? t("exit fullscreen mode") : t("enter fullscreen mode");
  el.setAttribute("aria-label", label);
}, "updateAriaLabel$5");
const _MediaFullscreenButton = class _MediaFullscreenButton extends MediaChromeButton {
  constructor() {
    super(...arguments);
    __privateAdd$h(this, _lastActionEvent, null);
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_IS_FULLSCREEN,
      MediaUIAttributes.MEDIA_FULLSCREEN_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel$5(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_IS_FULLSCREEN) {
      updateAriaLabel$5(this);
    }
  }
  /**
   * @type {string | undefined} Fullscreen unavailability state
   */
  get mediaFullscreenUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_FULLSCREEN_UNAVAILABLE);
  }
  set mediaFullscreenUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_FULLSCREEN_UNAVAILABLE, value);
  }
  /**
   * @type {boolean} Whether fullscreen is available
   */
  get mediaIsFullscreen() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_IS_FULLSCREEN);
  }
  set mediaIsFullscreen(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_IS_FULLSCREEN, value);
  }
  handleClick(e2) {
    __privateSet$f(this, _lastActionEvent, e2);
    const isPointerEvent = __privateGet$h(this, _lastActionEvent) instanceof PointerEvent;
    const event = this.mediaIsFullscreen ? new GlobalThis.CustomEvent(
      MediaUIEvents.MEDIA_EXIT_FULLSCREEN_REQUEST,
      { composed: true, bubbles: true }
    ) : new GlobalThis.CustomEvent(
      MediaUIEvents.MEDIA_ENTER_FULLSCREEN_REQUEST,
      { composed: true, bubbles: true, detail: isPointerEvent }
    );
    this.dispatchEvent(event);
  }
};
__name(_MediaFullscreenButton, "MediaFullscreenButton");
let MediaFullscreenButton = _MediaFullscreenButton;
_lastActionEvent = /* @__PURE__ */ new WeakMap();
MediaFullscreenButton.getSlotTemplateHTML = getSlotTemplateHTML$e;
MediaFullscreenButton.getTooltipContentHTML = getTooltipContentHTML$c;
if (!GlobalThis.customElements.get("media-fullscreen-button")) {
  GlobalThis.customElements.define(
    "media-fullscreen-button",
    MediaFullscreenButton
  );
}
const { MEDIA_TIME_IS_LIVE, MEDIA_PAUSED } = MediaUIAttributes;
const { MEDIA_SEEK_TO_LIVE_REQUEST, MEDIA_PLAY_REQUEST } = MediaUIEvents;
const indicatorSVG = '<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>';
function getSlotTemplateHTML$d(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        ${/* Override styles for icon-only buttons */
    ""}
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${MEDIA_TIME_IS_LIVE}]:not([${MEDIA_PAUSED}])) slot[name=indicator] > *,
      :host([${MEDIA_TIME_IS_LIVE}]:not([${MEDIA_PAUSED}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${MEDIA_TIME_IS_LIVE}]:not([${MEDIA_PAUSED}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${indicatorSVG}</slot>
    ${/*
      A new line between spacer and text creates inconsistent spacing
      between slotted items and default slots.
    */
    ""}
    <slot name="spacer">&nbsp;</slot><slot name="text">${t("live")}</slot>
  `
  );
}
__name(getSlotTemplateHTML$d, "getSlotTemplateHTML$d");
const updateAriaAttributes = /* @__PURE__ */ __name((el) => {
  var _a3;
  const isPausedOrNotLive = el.mediaPaused || !el.mediaTimeIsLive;
  const label = isPausedOrNotLive ? t("seek to live") : t("playing live");
  el.setAttribute("aria-label", label);
  const textSlot = (_a3 = el.shadowRoot) == null ? void 0 : _a3.querySelector('slot[name="text"]');
  if (textSlot)
    textSlot.textContent = t("live");
  isPausedOrNotLive ? el.removeAttribute("aria-disabled") : el.setAttribute("aria-disabled", "true");
}, "updateAriaAttributes");
const _MediaLiveButton = class _MediaLiveButton extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MEDIA_TIME_IS_LIVE,
      MEDIA_PAUSED
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaAttributes(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    updateAriaAttributes(this);
  }
  /**
   * @type {boolean} Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  /**
   * @type {boolean} Is the media playback currently live
   */
  get mediaTimeIsLive() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_TIME_IS_LIVE);
  }
  set mediaTimeIsLive(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_TIME_IS_LIVE, value);
  }
  handleClick() {
    if (!this.mediaPaused && this.mediaTimeIsLive)
      return;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(MEDIA_SEEK_TO_LIVE_REQUEST, {
        composed: true,
        bubbles: true
      })
    );
    if (this.hasAttribute(MEDIA_PAUSED)) {
      this.dispatchEvent(
        new GlobalThis.CustomEvent(MEDIA_PLAY_REQUEST, {
          composed: true,
          bubbles: true
        })
      );
    }
  }
};
__name(_MediaLiveButton, "MediaLiveButton");
let MediaLiveButton = _MediaLiveButton;
MediaLiveButton.getSlotTemplateHTML = getSlotTemplateHTML$d;
if (!GlobalThis.customElements.get("media-live-button")) {
  GlobalThis.customElements.define("media-live-button", MediaLiveButton);
}
var __accessCheck$g = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$g");
var __privateGet$g = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$g(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$g");
var __privateAdd$g = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$g");
var __privateSet$e = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$g(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$e");
var _mediaController$2, _delay;
const Attributes$8 = {
  LOADING_DELAY: "loadingdelay",
  NO_AUTOHIDE: "noautohide"
};
const DEFAULT_LOADING_DELAY = 500;
const loadingIndicatorIcon = `
<svg aria-hidden="true" viewBox="0 0 100 100">
  <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50">
    <animateTransform
       attributeName="transform"
       attributeType="XML"
       type="rotate"
       dur="1s"
       from="0 50 50"
       to="360 50 50"
       repeatCount="indefinite" />
  </path>
</svg>
`;
function getTemplateHTML$a(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${DEFAULT_LOADING_DELAY}ms);
      }

      #status {
        color: rgba(0,0,0,0);
        width: 0px;
        height: 0px;
      }

      :host slot[name=icon] > *,
      :host ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 0);
        transition: opacity 0.15s;
      }

      :host([${MediaUIAttributes.MEDIA_LOADING}]:not([${MediaUIAttributes.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${MediaUIAttributes.MEDIA_LOADING}]:not([${MediaUIAttributes.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${MediaUIAttributes.MEDIA_LOADING}]:not([${MediaUIAttributes.MEDIA_PAUSED}])) #status {
        visibility: var(--media-loading-indicator-opacity, visible);
        transition: visibility 0.15s var(--_loading-indicator-delay);
      }

      svg, img, ::slotted(svg), ::slotted(img) {
        width: var(--media-loading-indicator-icon-width);
        height: var(--media-loading-indicator-icon-height, 100px);
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        vertical-align: middle;
      }
    </style>

    <slot name="icon">${loadingIndicatorIcon}</slot>
    <div id="status" role="status" aria-live="polite">${t("media loading")}</div>
  `
  );
}
__name(getTemplateHTML$a, "getTemplateHTML$a");
const _MediaLoadingIndicator = class _MediaLoadingIndicator extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$g(this, _mediaController$2, void 0);
    __privateAdd$g(this, _delay, DEFAULT_LOADING_DELAY);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  static get observedAttributes() {
    return [
      MediaStateReceiverAttributes.MEDIA_CONTROLLER,
      MediaUIAttributes.MEDIA_PAUSED,
      MediaUIAttributes.MEDIA_LOADING,
      Attributes$8.LOADING_DELAY
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2, _e3;
    if (attrName === Attributes$8.LOADING_DELAY && oldValue !== newValue) {
      this.loadingDelay = Number(newValue);
    } else if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b2 = (_a3 = __privateGet$g(this, _mediaController$2)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
        __privateSet$e(this, _mediaController$2, null);
      }
      if (newValue && this.isConnected) {
        __privateSet$e(this, _mediaController$2, (_c2 = this.getRootNode()) == null ? void 0 : _c2.getElementById(newValue));
        (_e3 = (_d2 = __privateGet$g(this, _mediaController$2)) == null ? void 0 : _d2.associateElement) == null ? void 0 : _e3.call(_d2, this);
      }
    }
  }
  connectedCallback() {
    var _a3, _b2, _c2;
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet$e(this, _mediaController$2, (_a3 = this.getRootNode()) == null ? void 0 : _a3.getElementById(
        mediaControllerId
      ));
      (_c2 = (_b2 = __privateGet$g(this, _mediaController$2)) == null ? void 0 : _b2.associateElement) == null ? void 0 : _c2.call(_b2, this);
    }
  }
  disconnectedCallback() {
    var _a3, _b2;
    (_b2 = (_a3 = __privateGet$g(this, _mediaController$2)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
    __privateSet$e(this, _mediaController$2, null);
  }
  /**
   * Delay in ms
   */
  get loadingDelay() {
    return __privateGet$g(this, _delay);
  }
  set loadingDelay(delay2) {
    __privateSet$e(this, _delay, delay2);
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    style.setProperty(
      "--_loading-indicator-delay",
      `var(--media-loading-indicator-transition-delay, ${delay2}ms)`
    );
  }
  /**
   * Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  /**
   * Is the media loading
   */
  get mediaLoading() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_LOADING);
  }
  set mediaLoading(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_LOADING, value);
  }
  get mediaController() {
    return getStringAttr(this, MediaStateReceiverAttributes.MEDIA_CONTROLLER);
  }
  set mediaController(value) {
    setStringAttr(this, MediaStateReceiverAttributes.MEDIA_CONTROLLER, value);
  }
  get noAutohide() {
    return getBooleanAttr(this, Attributes$8.NO_AUTOHIDE);
  }
  set noAutohide(value) {
    setBooleanAttr(this, Attributes$8.NO_AUTOHIDE, value);
  }
};
__name(_MediaLoadingIndicator, "MediaLoadingIndicator");
let MediaLoadingIndicator = _MediaLoadingIndicator;
_mediaController$2 = /* @__PURE__ */ new WeakMap();
_delay = /* @__PURE__ */ new WeakMap();
MediaLoadingIndicator.shadowRootOptions = { mode: "open" };
MediaLoadingIndicator.getTemplateHTML = getTemplateHTML$a;
if (!GlobalThis.customElements.get("media-loading-indicator")) {
  GlobalThis.customElements.define(
    "media-loading-indicator",
    MediaLoadingIndicator
  );
}
const offIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`;
const lowIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`;
const highIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;
function getSlotTemplateHTML$c(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host(:not([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${MediaUIAttributes.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${offIcon}</slot>
      <slot name="low">${lowIcon}</slot>
      <slot name="medium">${lowIcon}</slot>
      <slot name="high">${highIcon}</slot>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$c, "getSlotTemplateHTML$c");
function getTooltipContentHTML$b() {
  return (
    /*html*/
    `
    <slot name="tooltip-mute">${t("Mute")}</slot>
    <slot name="tooltip-unmute">${t("Unmute")}</slot>
  `
  );
}
__name(getTooltipContentHTML$b, "getTooltipContentHTML$b");
const updateAriaLabel$4 = /* @__PURE__ */ __name((el) => {
  const muted = el.mediaVolumeLevel === "off";
  const label = muted ? t("unmute") : t("mute");
  el.setAttribute("aria-label", label);
}, "updateAriaLabel$4");
const _MediaMuteButton = class _MediaMuteButton extends MediaChromeButton {
  static get observedAttributes() {
    return [...super.observedAttributes, MediaUIAttributes.MEDIA_VOLUME_LEVEL];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel$4(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_VOLUME_LEVEL) {
      updateAriaLabel$4(this);
    }
  }
  /**
   * @type {string | undefined}
   */
  get mediaVolumeLevel() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_VOLUME_LEVEL);
  }
  set mediaVolumeLevel(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_VOLUME_LEVEL, value);
  }
  handleClick() {
    const eventName = this.mediaVolumeLevel === "off" ? MediaUIEvents.MEDIA_UNMUTE_REQUEST : MediaUIEvents.MEDIA_MUTE_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
__name(_MediaMuteButton, "MediaMuteButton");
let MediaMuteButton = _MediaMuteButton;
MediaMuteButton.getSlotTemplateHTML = getSlotTemplateHTML$c;
MediaMuteButton.getTooltipContentHTML = getTooltipContentHTML$b;
if (!GlobalThis.customElements.get("media-mute-button")) {
  GlobalThis.customElements.define("media-mute-button", MediaMuteButton);
}
const pipIcon = `<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;
function getSlotTemplateHTML$b(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${MediaUIAttributes.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${MediaUIAttributes.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${pipIcon}</slot>
      <slot name="exit">${pipIcon}</slot>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$b, "getSlotTemplateHTML$b");
function getTooltipContentHTML$a() {
  return (
    /*html*/
    `
    <slot name="tooltip-enter">${t("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${t("Exit picture in picture mode")}</slot>
  `
  );
}
__name(getTooltipContentHTML$a, "getTooltipContentHTML$a");
const updateAriaLabel$3 = /* @__PURE__ */ __name((el) => {
  const label = el.mediaIsPip ? t("exit picture in picture mode") : t("enter picture in picture mode");
  el.setAttribute("aria-label", label);
}, "updateAriaLabel$3");
const _MediaPipButton = class _MediaPipButton extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_IS_PIP,
      MediaUIAttributes.MEDIA_PIP_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel$3(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_IS_PIP) {
      updateAriaLabel$3(this);
    }
  }
  /**
   * @type {string | undefined} Pip unavailability state
   */
  get mediaPipUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_PIP_UNAVAILABLE);
  }
  set mediaPipUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_PIP_UNAVAILABLE, value);
  }
  /**
   * @type {boolean} Is the media currently playing picture-in-picture
   */
  get mediaIsPip() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_IS_PIP);
  }
  set mediaIsPip(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_IS_PIP, value);
  }
  handleClick() {
    const eventName = this.mediaIsPip ? MediaUIEvents.MEDIA_EXIT_PIP_REQUEST : MediaUIEvents.MEDIA_ENTER_PIP_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
__name(_MediaPipButton, "MediaPipButton");
let MediaPipButton = _MediaPipButton;
MediaPipButton.getSlotTemplateHTML = getSlotTemplateHTML$b;
MediaPipButton.getTooltipContentHTML = getTooltipContentHTML$a;
if (!GlobalThis.customElements.get("media-pip-button")) {
  GlobalThis.customElements.define("media-pip-button", MediaPipButton);
}
var __accessCheck$f = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$f");
var __privateGet$f = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$f(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$f");
var __privateAdd$f = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$f");
var _rates$1;
const Attributes$7 = {
  RATES: "rates"
};
const DEFAULT_RATES = [1, 1.2, 1.5, 1.7, 2];
const DEFAULT_RATE$1 = 1;
function getSlotTemplateHTML$a(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${attrs["mediaplaybackrate"] || DEFAULT_RATE$1}x</slot>
  `
  );
}
__name(getSlotTemplateHTML$a, "getSlotTemplateHTML$a");
function getTooltipContentHTML$9() {
  return t("Playback rate");
}
__name(getTooltipContentHTML$9, "getTooltipContentHTML$9");
const _MediaPlaybackRateButton = class _MediaPlaybackRateButton extends MediaChromeButton {
  constructor() {
    var _a3;
    super();
    __privateAdd$f(this, _rates$1, new AttributeTokenList(this, Attributes$7.RATES, {
      defaultValue: DEFAULT_RATES
    }));
    this.container = this.shadowRoot.querySelector('slot[name="icon"]');
    this.container.innerHTML = `${(_a3 = this.mediaPlaybackRate) != null ? _a3 : DEFAULT_RATE$1}x`;
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      Attributes$7.RATES
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === Attributes$7.RATES) {
      __privateGet$f(this, _rates$1).value = newValue;
    }
    if (attrName === MediaUIAttributes.MEDIA_PLAYBACK_RATE) {
      const newPlaybackRate = newValue ? +newValue : Number.NaN;
      const playbackRate = !Number.isNaN(newPlaybackRate) ? newPlaybackRate : DEFAULT_RATE$1;
      this.container.innerHTML = `${playbackRate}x`;
      this.setAttribute(
        "aria-label",
        t("Playback rate {playbackRate}", { playbackRate })
      );
    }
  }
  /**
   * Get the playback rates for the button.
   */
  get rates() {
    return __privateGet$f(this, _rates$1);
  }
  /**
   * Set the playback rates for the button.
   * For React 19+ compatibility, accept a string of space-separated rates.
   */
  set rates(value) {
    if (!value) {
      __privateGet$f(this, _rates$1).value = "";
    } else if (Array.isArray(value)) {
      __privateGet$f(this, _rates$1).value = value.join(" ");
    } else if (typeof value === "string") {
      __privateGet$f(this, _rates$1).value = value;
    }
  }
  /**
   * @type {number} The current playback rate
   */
  get mediaPlaybackRate() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      DEFAULT_RATE$1
    );
  }
  set mediaPlaybackRate(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, value);
  }
  handleClick() {
    var _a3, _b2;
    const availableRates = Array.from(__privateGet$f(this, _rates$1).values(), (str) => +str).sort(
      (a, b2) => a - b2
    );
    const detail = (_b2 = (_a3 = availableRates.find((r10) => r10 > this.mediaPlaybackRate)) != null ? _a3 : availableRates[0]) != null ? _b2 : DEFAULT_RATE$1;
    const evt = new GlobalThis.CustomEvent(
      MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST,
      { composed: true, bubbles: true, detail }
    );
    this.dispatchEvent(evt);
  }
};
__name(_MediaPlaybackRateButton, "MediaPlaybackRateButton");
let MediaPlaybackRateButton = _MediaPlaybackRateButton;
_rates$1 = /* @__PURE__ */ new WeakMap();
MediaPlaybackRateButton.getSlotTemplateHTML = getSlotTemplateHTML$a;
MediaPlaybackRateButton.getTooltipContentHTML = getTooltipContentHTML$9;
if (!GlobalThis.customElements.get("media-playback-rate-button")) {
  GlobalThis.customElements.define(
    "media-playback-rate-button",
    MediaPlaybackRateButton
  );
}
const playIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`;
const pauseIcon = `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;
function getSlotTemplateHTML$9(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host([${MediaUIAttributes.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${MediaUIAttributes.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${MediaUIAttributes.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${MediaUIAttributes.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${playIcon}</slot>
      <slot name="pause">${pauseIcon}</slot>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$9, "getSlotTemplateHTML$9");
function getTooltipContentHTML$8() {
  return (
    /*html*/
    `
    <slot name="tooltip-play">${t("Play")}</slot>
    <slot name="tooltip-pause">${t("Pause")}</slot>
  `
  );
}
__name(getTooltipContentHTML$8, "getTooltipContentHTML$8");
const updateAriaLabel$2 = /* @__PURE__ */ __name((el) => {
  const label = el.mediaPaused ? t("play") : t("pause");
  el.setAttribute("aria-label", label);
}, "updateAriaLabel$2");
const _MediaPlayButton = class _MediaPlayButton extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PAUSED,
      MediaUIAttributes.MEDIA_ENDED
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel$2(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PAUSED || attrName === MediaUIAttributes.MEDIA_LANG) {
      updateAriaLabel$2(this);
    }
  }
  /**
   * Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  handleClick() {
    const eventName = this.mediaPaused ? MediaUIEvents.MEDIA_PLAY_REQUEST : MediaUIEvents.MEDIA_PAUSE_REQUEST;
    this.dispatchEvent(
      new GlobalThis.CustomEvent(eventName, { composed: true, bubbles: true })
    );
  }
};
__name(_MediaPlayButton, "MediaPlayButton");
let MediaPlayButton = _MediaPlayButton;
MediaPlayButton.getSlotTemplateHTML = getSlotTemplateHTML$9;
MediaPlayButton.getTooltipContentHTML = getTooltipContentHTML$8;
if (!GlobalThis.customElements.get("media-play-button")) {
  GlobalThis.customElements.define("media-play-button", MediaPlayButton);
}
const Attributes$6 = {
  PLACEHOLDER_SRC: "placeholdersrc",
  SRC: "src"
};
function getTemplateHTML$9(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        pointer-events: none;
        display: var(--media-poster-image-display, inline-block);
        box-sizing: border-box;
      }

      img {
        max-width: 100%;
        max-height: 100%;
        min-width: 100%;
        min-height: 100%;
        background-repeat: no-repeat;
        background-position: var(--media-poster-image-background-position, var(--media-object-position, center));
        background-size: var(--media-poster-image-background-size, var(--media-object-fit, contain));
        object-fit: var(--media-object-fit, contain);
        object-position: var(--media-object-position, center);
      }
    </style>

    <img part="poster img" aria-hidden="true" id="image"/>
  `
  );
}
__name(getTemplateHTML$9, "getTemplateHTML$9");
const unsetBackgroundImage = /* @__PURE__ */ __name((el) => {
  el.style.removeProperty("background-image");
}, "unsetBackgroundImage");
const setBackgroundImage = /* @__PURE__ */ __name((el, image) => {
  el.style["background-image"] = `url('${image}')`;
}, "setBackgroundImage");
const _MediaPosterImage = class _MediaPosterImage extends GlobalThis.HTMLElement {
  static get observedAttributes() {
    return [Attributes$6.PLACEHOLDER_SRC, Attributes$6.SRC];
  }
  constructor() {
    super();
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
    this.image = this.shadowRoot.querySelector("#image");
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === Attributes$6.SRC) {
      if (newValue == null) {
        this.image.removeAttribute(Attributes$6.SRC);
      } else {
        this.image.setAttribute(Attributes$6.SRC, newValue);
      }
    }
    if (attrName === Attributes$6.PLACEHOLDER_SRC) {
      if (newValue == null) {
        unsetBackgroundImage(this.image);
      } else {
        setBackgroundImage(this.image, newValue);
      }
    }
  }
  /**
   *
   */
  get placeholderSrc() {
    return getStringAttr(this, Attributes$6.PLACEHOLDER_SRC);
  }
  set placeholderSrc(value) {
    setStringAttr(this, Attributes$6.SRC, value);
  }
  /**
   *
   */
  get src() {
    return getStringAttr(this, Attributes$6.SRC);
  }
  set src(value) {
    setStringAttr(this, Attributes$6.SRC, value);
  }
};
__name(_MediaPosterImage, "MediaPosterImage");
let MediaPosterImage = _MediaPosterImage;
MediaPosterImage.shadowRootOptions = { mode: "open" };
MediaPosterImage.getTemplateHTML = getTemplateHTML$9;
if (!GlobalThis.customElements.get("media-poster-image")) {
  GlobalThis.customElements.define("media-poster-image", MediaPosterImage);
}
var __accessCheck$e = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$e");
var __privateGet$e = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$e(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$e");
var __privateAdd$e = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$e");
var __privateSet$d = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$e(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$d");
var _slot$2;
const _MediaPreviewChapterDisplay = class _MediaPreviewChapterDisplay extends MediaTextDisplay {
  constructor() {
    super();
    __privateAdd$e(this, _slot$2, void 0);
    __privateSet$d(this, _slot$2, this.shadowRoot.querySelector("slot"));
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PREVIEW_CHAPTER,
      MediaUIAttributes.MEDIA_LANG
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PREVIEW_CHAPTER || attrName === MediaUIAttributes.MEDIA_LANG) {
      if (newValue !== oldValue && newValue != null) {
        __privateGet$e(this, _slot$2).textContent = newValue;
        if (newValue !== "") {
          const ariaValueText = t("chapter: {chapterName}", {
            chapterName: newValue
          });
          this.setAttribute("aria-valuetext", ariaValueText);
        } else {
          this.removeAttribute("aria-valuetext");
        }
      }
    }
  }
  /**
   * @type {string | undefined} Timeline preview chapter
   */
  get mediaPreviewChapter() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_CHAPTER);
  }
  set mediaPreviewChapter(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_CHAPTER, value);
  }
};
__name(_MediaPreviewChapterDisplay, "MediaPreviewChapterDisplay");
let MediaPreviewChapterDisplay = _MediaPreviewChapterDisplay;
_slot$2 = /* @__PURE__ */ new WeakMap();
if (!GlobalThis.customElements.get("media-preview-chapter-display")) {
  GlobalThis.customElements.define(
    "media-preview-chapter-display",
    MediaPreviewChapterDisplay
  );
}
var __accessCheck$d = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$d");
var __privateGet$d = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$d(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$d");
var __privateAdd$d = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$d");
var __privateSet$c = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$d(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$c");
var _mediaController$1;
function getTemplateHTML$8(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        box-sizing: border-box;
        display: var(--media-control-display, var(--media-preview-thumbnail-display, inline-block));
        overflow: hidden;
      }

      img {
        display: none;
        position: relative;
      }
    </style>
    <img crossorigin loading="eager" decoding="async">
  `
  );
}
__name(getTemplateHTML$8, "getTemplateHTML$8");
const _MediaPreviewThumbnail = class _MediaPreviewThumbnail extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$d(this, _mediaController$1, void 0);
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
  }
  static get observedAttributes() {
    return [
      MediaStateReceiverAttributes.MEDIA_CONTROLLER,
      MediaUIAttributes.MEDIA_PREVIEW_IMAGE,
      MediaUIAttributes.MEDIA_PREVIEW_COORDS
    ];
  }
  connectedCallback() {
    var _a3, _b2, _c2;
    const mediaControllerId = this.getAttribute(
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    );
    if (mediaControllerId) {
      __privateSet$c(
        this,
        _mediaController$1,
        // @ts-ignore
        (_a3 = this.getRootNode()) == null ? void 0 : _a3.getElementById(mediaControllerId)
      );
      (_c2 = (_b2 = __privateGet$d(this, _mediaController$1)) == null ? void 0 : _b2.associateElement) == null ? void 0 : _c2.call(_b2, this);
    }
  }
  disconnectedCallback() {
    var _a3, _b2;
    (_b2 = (_a3 = __privateGet$d(this, _mediaController$1)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
    __privateSet$c(this, _mediaController$1, null);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2, _e3;
    if ([
      MediaUIAttributes.MEDIA_PREVIEW_IMAGE,
      MediaUIAttributes.MEDIA_PREVIEW_COORDS
    ].includes(attrName)) {
      this.update();
    }
    if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b2 = (_a3 = __privateGet$d(this, _mediaController$1)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
        __privateSet$c(this, _mediaController$1, null);
      }
      if (newValue && this.isConnected) {
        __privateSet$c(this, _mediaController$1, (_c2 = this.getRootNode()) == null ? void 0 : _c2.getElementById(newValue));
        (_e3 = (_d2 = __privateGet$d(this, _mediaController$1)) == null ? void 0 : _d2.associateElement) == null ? void 0 : _e3.call(_d2, this);
      }
    }
  }
  /**
   * @type {string | undefined} The url of the preview image
   */
  get mediaPreviewImage() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_IMAGE);
  }
  set mediaPreviewImage(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_IMAGE, value);
  }
  /**
   * @type {Array<number> | undefined} Fixed length array [x, y, width, height] or undefined
   */
  get mediaPreviewCoords() {
    const attrVal = this.getAttribute(MediaUIAttributes.MEDIA_PREVIEW_COORDS);
    if (!attrVal)
      return void 0;
    return attrVal.split(/\s+/).map((coord) => +coord);
  }
  set mediaPreviewCoords(value) {
    if (!value) {
      this.removeAttribute(MediaUIAttributes.MEDIA_PREVIEW_COORDS);
      return;
    }
    this.setAttribute(MediaUIAttributes.MEDIA_PREVIEW_COORDS, value.join(" "));
  }
  update() {
    const coords = this.mediaPreviewCoords;
    const previewImage = this.mediaPreviewImage;
    if (!(coords && previewImage))
      return;
    const [x2, y2, w2, h2] = coords;
    const src = previewImage.split("#")[0];
    const computedStyle = getComputedStyle(this);
    const { maxWidth, maxHeight, minWidth, minHeight } = computedStyle;
    const maxRatio = Math.min(parseInt(maxWidth) / w2, parseInt(maxHeight) / h2);
    const minRatio = Math.max(parseInt(minWidth) / w2, parseInt(minHeight) / h2);
    const isScalingDown = maxRatio < 1;
    const scale = isScalingDown ? maxRatio : minRatio > 1 ? minRatio : 1;
    const { style } = getOrInsertCSSRule(this.shadowRoot, ":host");
    const imgStyle = getOrInsertCSSRule(this.shadowRoot, "img").style;
    const img = this.shadowRoot.querySelector("img");
    const extremum = isScalingDown ? "min" : "max";
    style.setProperty(`${extremum}-width`, "initial", "important");
    style.setProperty(`${extremum}-height`, "initial", "important");
    style.width = `${w2 * scale}px`;
    style.height = `${h2 * scale}px`;
    const resize = /* @__PURE__ */ __name(() => {
      imgStyle.width = `${this.imgWidth * scale}px`;
      imgStyle.height = `${this.imgHeight * scale}px`;
      imgStyle.display = "block";
    }, "resize");
    if (img.src !== src) {
      img.onload = () => {
        this.imgWidth = img.naturalWidth;
        this.imgHeight = img.naturalHeight;
        resize();
      };
      img.src = src;
      resize();
    }
    resize();
    imgStyle.transform = `translate(-${x2 * scale}px, -${y2 * scale}px)`;
  }
};
__name(_MediaPreviewThumbnail, "MediaPreviewThumbnail");
let MediaPreviewThumbnail = _MediaPreviewThumbnail;
_mediaController$1 = /* @__PURE__ */ new WeakMap();
MediaPreviewThumbnail.shadowRootOptions = { mode: "open" };
MediaPreviewThumbnail.getTemplateHTML = getTemplateHTML$8;
if (!GlobalThis.customElements.get("media-preview-thumbnail")) {
  GlobalThis.customElements.define(
    "media-preview-thumbnail",
    MediaPreviewThumbnail
  );
}
var media_preview_thumbnail_default = MediaPreviewThumbnail;
var __accessCheck$c = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$c");
var __privateGet$c = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$c(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$c");
var __privateAdd$c = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$c");
var __privateSet$b = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$c(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$b");
var _slot$1;
const _MediaPreviewTimeDisplay = class _MediaPreviewTimeDisplay extends MediaTextDisplay {
  constructor() {
    super();
    __privateAdd$c(this, _slot$1, void 0);
    __privateSet$b(this, _slot$1, this.shadowRoot.querySelector("slot"));
    __privateGet$c(this, _slot$1).textContent = formatTime(0);
  }
  static get observedAttributes() {
    return [...super.observedAttributes, MediaUIAttributes.MEDIA_PREVIEW_TIME];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PREVIEW_TIME && newValue != null) {
      __privateGet$c(this, _slot$1).textContent = formatTime(parseFloat(newValue));
    }
  }
  /**
   * Timeline preview time
   */
  get mediaPreviewTime() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_PREVIEW_TIME);
  }
  set mediaPreviewTime(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PREVIEW_TIME, value);
  }
};
__name(_MediaPreviewTimeDisplay, "MediaPreviewTimeDisplay");
let MediaPreviewTimeDisplay = _MediaPreviewTimeDisplay;
_slot$1 = /* @__PURE__ */ new WeakMap();
if (!GlobalThis.customElements.get("media-preview-time-display")) {
  GlobalThis.customElements.define(
    "media-preview-time-display",
    MediaPreviewTimeDisplay
  );
}
const Attributes$5 = {
  SEEK_OFFSET: "seekoffset"
};
const DEFAULT_SEEK_OFFSET$1 = 30;
const backwardIcon = /* @__PURE__ */ __name((seekOffset) => `
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${seekOffset}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`, "backwardIcon");
function getSlotTemplateHTML$8(_attrs, props) {
  return (
    /*html*/
    `
    <slot name="icon">${backwardIcon(props.seekOffset)}</slot>
  `
  );
}
__name(getSlotTemplateHTML$8, "getSlotTemplateHTML$8");
function getTooltipContentHTML$7() {
  return t("Seek backward");
}
__name(getTooltipContentHTML$7, "getTooltipContentHTML$7");
const DEFAULT_TIME$1 = 0;
const _MediaSeekBackwardButton = class _MediaSeekBackwardButton extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      Attributes$5.SEEK_OFFSET
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.seekOffset = getNumericAttr(
      this,
      Attributes$5.SEEK_OFFSET,
      DEFAULT_SEEK_OFFSET$1
    );
  }
  attributeChangedCallback(attrName, _oldValue, newValue) {
    super.attributeChangedCallback(attrName, _oldValue, newValue);
    if (attrName === Attributes$5.SEEK_OFFSET) {
      this.seekOffset = getNumericAttr(
        this,
        Attributes$5.SEEK_OFFSET,
        DEFAULT_SEEK_OFFSET$1
      );
    }
  }
  // Own props
  /**
   * Seek amount in seconds
   */
  get seekOffset() {
    return getNumericAttr(this, Attributes$5.SEEK_OFFSET, DEFAULT_SEEK_OFFSET$1);
  }
  set seekOffset(value) {
    setNumericAttr(this, Attributes$5.SEEK_OFFSET, value);
    this.setAttribute(
      "aria-label",
      t("seek back {seekOffset} seconds", { seekOffset: this.seekOffset })
    );
    updateIconText(getSlotted(this, "icon"), this.seekOffset);
  }
  // Props derived from Media UI Attributes
  /**
   * The current time in seconds
   */
  get mediaCurrentTime() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      DEFAULT_TIME$1
    );
  }
  set mediaCurrentTime(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, time);
  }
  handleClick() {
    const detail = Math.max(this.mediaCurrentTime - this.seekOffset, 0);
    const evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
      composed: true,
      bubbles: true,
      detail
    });
    this.dispatchEvent(evt);
  }
};
__name(_MediaSeekBackwardButton, "MediaSeekBackwardButton");
let MediaSeekBackwardButton = _MediaSeekBackwardButton;
MediaSeekBackwardButton.getSlotTemplateHTML = getSlotTemplateHTML$8;
MediaSeekBackwardButton.getTooltipContentHTML = getTooltipContentHTML$7;
if (!GlobalThis.customElements.get("media-seek-backward-button")) {
  GlobalThis.customElements.define(
    "media-seek-backward-button",
    MediaSeekBackwardButton
  );
}
const Attributes$4 = {
  SEEK_OFFSET: "seekoffset"
};
const DEFAULT_SEEK_OFFSET = 30;
const forwardIcon = /* @__PURE__ */ __name((seekOffset) => `
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${seekOffset}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`, "forwardIcon");
function getSlotTemplateHTML$7(_attrs, props) {
  return (
    /*html*/
    `
    <slot name="icon">${forwardIcon(props.seekOffset)}</slot>
  `
  );
}
__name(getSlotTemplateHTML$7, "getSlotTemplateHTML$7");
function getTooltipContentHTML$6() {
  return t("Seek forward");
}
__name(getTooltipContentHTML$6, "getTooltipContentHTML$6");
const DEFAULT_TIME = 0;
const _MediaSeekForwardButton = class _MediaSeekForwardButton extends MediaChromeButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      Attributes$4.SEEK_OFFSET
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.seekOffset = getNumericAttr(
      this,
      Attributes$4.SEEK_OFFSET,
      DEFAULT_SEEK_OFFSET
    );
  }
  attributeChangedCallback(attrName, _oldValue, newValue) {
    super.attributeChangedCallback(attrName, _oldValue, newValue);
    if (attrName === Attributes$4.SEEK_OFFSET) {
      this.seekOffset = getNumericAttr(
        this,
        Attributes$4.SEEK_OFFSET,
        DEFAULT_SEEK_OFFSET
      );
    }
  }
  // Own props
  /**
   * Seek amount in seconds
   */
  get seekOffset() {
    return getNumericAttr(this, Attributes$4.SEEK_OFFSET, DEFAULT_SEEK_OFFSET);
  }
  set seekOffset(value) {
    setNumericAttr(this, Attributes$4.SEEK_OFFSET, value);
    this.setAttribute(
      "aria-label",
      t("seek forward {seekOffset} seconds", { seekOffset: this.seekOffset })
    );
    updateIconText(getSlotted(this, "icon"), this.seekOffset);
  }
  // Props derived from Media UI Attributes
  /**
   * The current time in seconds
   */
  get mediaCurrentTime() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      DEFAULT_TIME
    );
  }
  set mediaCurrentTime(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, time);
  }
  handleClick() {
    const detail = this.mediaCurrentTime + this.seekOffset;
    const evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
      composed: true,
      bubbles: true,
      detail
    });
    this.dispatchEvent(evt);
  }
};
__name(_MediaSeekForwardButton, "MediaSeekForwardButton");
let MediaSeekForwardButton = _MediaSeekForwardButton;
MediaSeekForwardButton.getSlotTemplateHTML = getSlotTemplateHTML$7;
MediaSeekForwardButton.getTooltipContentHTML = getTooltipContentHTML$6;
if (!GlobalThis.customElements.get("media-seek-forward-button")) {
  GlobalThis.customElements.define(
    "media-seek-forward-button",
    MediaSeekForwardButton
  );
}
var __accessCheck$b = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$b");
var __privateGet$b = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$b(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$b");
var __privateAdd$b = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$b");
var __privateSet$a = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$b(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$a");
var _slot;
const Attributes$3 = {
  REMAINING: "remaining",
  SHOW_DURATION: "showduration",
  NO_TOGGLE: "notoggle"
};
const CombinedAttributes = [
  ...Object.values(Attributes$3),
  MediaUIAttributes.MEDIA_CURRENT_TIME,
  MediaUIAttributes.MEDIA_DURATION,
  MediaUIAttributes.MEDIA_SEEKABLE
];
const ButtonPressedKeys = ["Enter", " "];
const DEFAULT_TIMES_SEP = "&nbsp;/&nbsp;";
const formatTimesLabel = /* @__PURE__ */ __name((el, { timesSep = DEFAULT_TIMES_SEP } = {}) => {
  var _a3, _b2;
  const currentTime = (_a3 = el.mediaCurrentTime) != null ? _a3 : 0;
  const [, seekableEnd] = (_b2 = el.mediaSeekable) != null ? _b2 : [];
  let endTime = 0;
  if (Number.isFinite(el.mediaDuration)) {
    endTime = el.mediaDuration;
  } else if (Number.isFinite(seekableEnd)) {
    endTime = seekableEnd;
  }
  const timeLabel = el.remaining ? formatTime(0 - (endTime - currentTime)) : formatTime(currentTime);
  if (!el.showDuration)
    return timeLabel;
  return `${timeLabel}${timesSep}${formatTime(endTime)}`;
}, "formatTimesLabel");
const DEFAULT_MISSING_TIME_PHRASE$1 = "video not loaded, unknown time.";
const updateAriaValueText$1 = /* @__PURE__ */ __name((el) => {
  var _a3;
  const currentTime = el.mediaCurrentTime;
  const [, seekableEnd] = (_a3 = el.mediaSeekable) != null ? _a3 : [];
  let endTime = null;
  if (Number.isFinite(el.mediaDuration)) {
    endTime = el.mediaDuration;
  } else if (Number.isFinite(seekableEnd)) {
    endTime = seekableEnd;
  }
  if (currentTime == null || endTime === null) {
    el.setAttribute("aria-valuetext", DEFAULT_MISSING_TIME_PHRASE$1);
    return;
  }
  const currentTimePhrase = el.remaining ? formatAsTimePhrase(0 - (endTime - currentTime)) : formatAsTimePhrase(currentTime);
  if (!el.showDuration) {
    el.setAttribute("aria-valuetext", currentTimePhrase);
    return;
  }
  const totalTimePhrase = formatAsTimePhrase(endTime);
  const fullPhrase = `${currentTimePhrase} of ${totalTimePhrase}`;
  el.setAttribute("aria-valuetext", fullPhrase);
}, "updateAriaValueText$1");
function getSlotTemplateHTML$6(_attrs, props) {
  return (
    /*html*/
    `
    <slot>${formatTimesLabel(props)}</slot>
  `
  );
}
__name(getSlotTemplateHTML$6, "getSlotTemplateHTML$6");
const _MediaTimeDisplay = class _MediaTimeDisplay extends MediaTextDisplay {
  constructor() {
    super();
    __privateAdd$b(this, _slot, void 0);
    __privateSet$a(this, _slot, this.shadowRoot.querySelector("slot"));
    __privateGet$b(this, _slot).innerHTML = `${formatTimesLabel(this)}`;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, ...CombinedAttributes, "disabled"];
  }
  connectedCallback() {
    const { style } = getOrInsertCSSRule(
      this.shadowRoot,
      ":host(:hover:not([notoggle]))"
    );
    style.setProperty("cursor", "var(--media-cursor, pointer)");
    style.setProperty(
      "background",
      "var(--media-control-hover-background, rgba(50 50 70 / .7))"
    );
    if (!this.hasAttribute("disabled")) {
      this.enable();
    }
    this.setAttribute("role", "progressbar");
    this.setAttribute("aria-label", t("playback time"));
    const keyUpHandler = /* @__PURE__ */ __name((evt) => {
      const { key } = evt;
      if (!ButtonPressedKeys.includes(key)) {
        this.removeEventListener("keyup", keyUpHandler);
        return;
      }
      this.toggleTimeDisplay();
    }, "keyUpHandler");
    this.addEventListener("keydown", (evt) => {
      const { metaKey, altKey, key } = evt;
      if (metaKey || altKey || !ButtonPressedKeys.includes(key)) {
        this.removeEventListener("keyup", keyUpHandler);
        return;
      }
      this.addEventListener("keyup", keyUpHandler);
    });
    this.addEventListener("click", this.toggleTimeDisplay);
    super.connectedCallback();
  }
  toggleTimeDisplay() {
    if (this.noToggle) {
      return;
    }
    if (this.hasAttribute("remaining")) {
      this.removeAttribute("remaining");
    } else {
      this.setAttribute("remaining", "");
    }
  }
  disconnectedCallback() {
    this.disable();
    super.disconnectedCallback();
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (CombinedAttributes.includes(attrName)) {
      this.update();
    } else if (attrName === "disabled" && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    }
    super.attributeChangedCallback(attrName, oldValue, newValue);
  }
  enable() {
    this.tabIndex = 0;
  }
  disable() {
    this.tabIndex = -1;
  }
  // Own props
  /**
   * Whether to show the remaining time
   */
  get remaining() {
    return getBooleanAttr(this, Attributes$3.REMAINING);
  }
  set remaining(show) {
    setBooleanAttr(this, Attributes$3.REMAINING, show);
  }
  /**
   * Whether to show the duration
   */
  get showDuration() {
    return getBooleanAttr(this, Attributes$3.SHOW_DURATION);
  }
  set showDuration(show) {
    setBooleanAttr(this, Attributes$3.SHOW_DURATION, show);
  }
  /**
   * Disable the default behavior that toggles between current and remaining time
   */
  get noToggle() {
    return getBooleanAttr(this, Attributes$3.NO_TOGGLE);
  }
  set noToggle(noToggle) {
    setBooleanAttr(this, Attributes$3.NO_TOGGLE, noToggle);
  }
  // Props derived from media UI attributes
  /**
   * Get the duration
   */
  get mediaDuration() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_DURATION);
  }
  set mediaDuration(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_DURATION, time);
  }
  /**
   * The current time in seconds
   */
  get mediaCurrentTime() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME);
  }
  set mediaCurrentTime(time) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, time);
  }
  /**
   * Range of values that can be seeked to.
   * An array of two numbers [start, end]
   */
  get mediaSeekable() {
    const seekable = this.getAttribute(MediaUIAttributes.MEDIA_SEEKABLE);
    if (!seekable)
      return void 0;
    return seekable.split(":").map((time) => +time);
  }
  set mediaSeekable(range) {
    if (range == null) {
      this.removeAttribute(MediaUIAttributes.MEDIA_SEEKABLE);
      return;
    }
    this.setAttribute(MediaUIAttributes.MEDIA_SEEKABLE, range.join(":"));
  }
  update() {
    const timesLabel = formatTimesLabel(this);
    updateAriaValueText$1(this);
    if (timesLabel !== __privateGet$b(this, _slot).innerHTML) {
      __privateGet$b(this, _slot).innerHTML = timesLabel;
    }
  }
};
__name(_MediaTimeDisplay, "MediaTimeDisplay");
let MediaTimeDisplay = _MediaTimeDisplay;
_slot = /* @__PURE__ */ new WeakMap();
MediaTimeDisplay.getSlotTemplateHTML = getSlotTemplateHTML$6;
if (!GlobalThis.customElements.get("media-time-display")) {
  GlobalThis.customElements.define("media-time-display", MediaTimeDisplay);
}
var __accessCheck$a = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$a");
var __privateGet$a = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$a(obj, member, "read from private field");
  return member.get(obj);
}, "__privateGet$a");
var __privateAdd$a = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$a");
var __privateSet$9 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$a(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$9");
var __privateWrapper = /* @__PURE__ */ __name((obj, member, setter, getter) => ({
  set _(value) {
    __privateSet$9(obj, member, value);
  },
  get _() {
    return __privateGet$a(obj, member);
  }
}), "__privateWrapper");
var _range, _startTime, _previousTime, _deltaTime, _frameCount, _updateTimestamp, _updateStartValue, _lastRangeIncrease, _id, _animate;
const _RangeAnimation = class _RangeAnimation {
  constructor(range, callback, fps) {
    __privateAdd$a(this, _range, void 0);
    __privateAdd$a(this, _startTime, void 0);
    __privateAdd$a(this, _previousTime, void 0);
    __privateAdd$a(this, _deltaTime, void 0);
    __privateAdd$a(this, _frameCount, void 0);
    __privateAdd$a(this, _updateTimestamp, void 0);
    __privateAdd$a(this, _updateStartValue, void 0);
    __privateAdd$a(this, _lastRangeIncrease, void 0);
    __privateAdd$a(this, _id, 0);
    __privateAdd$a(this, _animate, (now = performance.now()) => {
      __privateSet$9(this, _id, requestAnimationFrame(__privateGet$a(this, _animate)));
      __privateSet$9(this, _deltaTime, performance.now() - __privateGet$a(this, _previousTime));
      const fpsInterval = 1e3 / this.fps;
      if (__privateGet$a(this, _deltaTime) > fpsInterval) {
        __privateSet$9(this, _previousTime, now - __privateGet$a(this, _deltaTime) % fpsInterval);
        const fps2 = 1e3 / ((now - __privateGet$a(this, _startTime)) / ++__privateWrapper(this, _frameCount)._);
        const delta = (now - __privateGet$a(this, _updateTimestamp)) / 1e3 / this.duration;
        let value = __privateGet$a(this, _updateStartValue) + delta * this.playbackRate;
        const increase = value - __privateGet$a(this, _range).valueAsNumber;
        if (increase > 0) {
          __privateSet$9(this, _lastRangeIncrease, this.playbackRate / this.duration / fps2);
        } else {
          __privateSet$9(this, _lastRangeIncrease, 0.995 * __privateGet$a(this, _lastRangeIncrease));
          value = __privateGet$a(this, _range).valueAsNumber + __privateGet$a(this, _lastRangeIncrease);
        }
        this.callback(value);
      }
    });
    __privateSet$9(this, _range, range);
    this.callback = callback;
    this.fps = fps;
  }
  start() {
    if (__privateGet$a(this, _id) !== 0)
      return;
    __privateSet$9(this, _previousTime, performance.now());
    __privateSet$9(this, _startTime, __privateGet$a(this, _previousTime));
    __privateSet$9(this, _frameCount, 0);
    __privateGet$a(this, _animate).call(this);
  }
  stop() {
    if (__privateGet$a(this, _id) === 0)
      return;
    cancelAnimationFrame(__privateGet$a(this, _id));
    __privateSet$9(this, _id, 0);
  }
  update({ start, duration, playbackRate }) {
    const increase = start - __privateGet$a(this, _range).valueAsNumber;
    const durationDelta = Math.abs(duration - this.duration);
    if (increase > 0 || increase < -0.03 || durationDelta >= 0.5) {
      this.callback(start);
    }
    __privateSet$9(this, _updateStartValue, start);
    __privateSet$9(this, _updateTimestamp, performance.now());
    this.duration = duration;
    this.playbackRate = playbackRate;
  }
};
__name(_RangeAnimation, "RangeAnimation");
let RangeAnimation = _RangeAnimation;
_range = /* @__PURE__ */ new WeakMap();
_startTime = /* @__PURE__ */ new WeakMap();
_previousTime = /* @__PURE__ */ new WeakMap();
_deltaTime = /* @__PURE__ */ new WeakMap();
_frameCount = /* @__PURE__ */ new WeakMap();
_updateTimestamp = /* @__PURE__ */ new WeakMap();
_updateStartValue = /* @__PURE__ */ new WeakMap();
_lastRangeIncrease = /* @__PURE__ */ new WeakMap();
_id = /* @__PURE__ */ new WeakMap();
_animate = /* @__PURE__ */ new WeakMap();
var __accessCheck$9 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$9");
var __privateGet$9 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$9(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$9");
var __privateAdd$9 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$9");
var __privateSet$8 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$9(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$8");
var __privateMethod$8 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$9(obj, member, "access private method");
  return method;
}, "__privateMethod$8");
var _rootNode, _animation, _boxes, _previewTime, _previewBox, _currentBox, _boxPaddingLeft, _boxPaddingRight, _mediaChaptersCues, _isPointerDown, _toggleRangeAnimation, toggleRangeAnimation_fn, _shouldRangeAnimate, shouldRangeAnimate_fn, _updateRange, _getElementRects, getElementRects_fn, _getBoxPosition, getBoxPosition_fn, _getBoxShiftPosition, getBoxShiftPosition_fn, _handlePointerMove, handlePointerMove_fn, _previewRequest, previewRequest_fn, _seekRequest, seekRequest_fn;
const DEFAULT_MISSING_TIME_PHRASE = "video not loaded, unknown time.";
const updateAriaValueText = /* @__PURE__ */ __name((el) => {
  const range = el.range;
  const currentTimePhrase = formatAsTimePhrase(+calcTimeFromRangeValue(el));
  const totalTimePhrase = formatAsTimePhrase(+el.mediaSeekableEnd);
  const fullPhrase = !(currentTimePhrase && totalTimePhrase) ? DEFAULT_MISSING_TIME_PHRASE : `${currentTimePhrase} of ${totalTimePhrase}`;
  range.setAttribute("aria-valuetext", fullPhrase);
}, "updateAriaValueText");
function getTemplateHTML$7(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeRange.getTemplateHTML(_attrs)}
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        ${/* 1% rail width trick was off in Safari, contain: layout seems to
    prevent the horizontal overflow as well. */
    ""}
        contain: layout;
      }

      #buffered {
        background: var(--media-time-range-buffered-color, rgb(255 255 255 / .4));
        position: absolute;
        height: 100%;
        will-change: width;
      }

      #preview-rail,
      #current-rail {
        width: 100%;
        position: absolute;
        left: 0;
        bottom: 100%;
        pointer-events: none;
        will-change: transform;
      }

      [part~="box"] {
        width: min-content;
        ${/* absolute position is needed here so the box doesn't overflow the bounds */
    ""}
        position: absolute;
        bottom: 100%;
        flex-direction: column;
        align-items: center;
        transform: translateX(-50%);
      }

      [part~="current-box"] {
        display: var(--media-current-box-display, var(--media-box-display, flex));
        margin: var(--media-current-box-margin, var(--media-box-margin, 0 0 5px));
        visibility: hidden;
      }

      [part~="preview-box"] {
        display: var(--media-preview-box-display, var(--media-box-display, flex));
        margin: var(--media-preview-box-margin, var(--media-box-margin, 0 0 5px));
        transition-property: var(--media-preview-transition-property, visibility, opacity);
        transition-duration: var(--media-preview-transition-duration-out, .25s);
        transition-delay: var(--media-preview-transition-delay-out, 0s);
        visibility: hidden;
        opacity: 0;
      }

      :host(:is([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}], [${MediaUIAttributes.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}], [${MediaUIAttributes.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        ${/* delay changing these CSS props until the preview box transition is ended */
    ""}
        transition: visibility 0s .25s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-thumbnail-background, var(--_preview-background));
        box-shadow: var(--media-preview-thumbnail-box-shadow, 0 0 4px rgb(0 0 0 / .2));
        max-width: var(--media-preview-thumbnail-max-width, 180px);
        max-height: var(--media-preview-thumbnail-max-height, 160px);
        min-width: var(--media-preview-thumbnail-min-width, 120px);
        min-height: var(--media-preview-thumbnail-min-height, 80px);
        border: var(--media-preview-thumbnail-border);
        border-radius: var(--media-preview-thumbnail-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius) 0 0);
      }

      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${MediaUIAttributes.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        ${/* delay changing these CSS props until the preview box transition is ended */
    ""}
        transition: min-width 0s, border-radius 0s, margin 0s, padding 0s, visibility 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-chapter-background, var(--_preview-background));
        border-radius: var(--media-preview-chapter-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-chapter-padding, 3.5px 9px);
        margin: var(--media-preview-chapter-margin, 0 0 5px);
        text-shadow: var(--media-preview-chapter-text-shadow, 0 0 4px rgb(0 0 0 / .75));
      }

      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${MediaUIAttributes.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${MediaUIAttributes.MEDIA_PREVIEW_CHAPTER}]) {
        visibility: visible;
      }

      media-preview-chapter-display:not([aria-valuetext]),
      ::slotted(media-preview-chapter-display:not([aria-valuetext])) {
        display: none;
      }

      media-preview-time-display,
      ::slotted(media-preview-time-display),
      media-time-display,
      ::slotted(media-time-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        ${/* delay changing these CSS props until the preview box transition is ended */
    ""}
        transition: min-width 0s, border-radius 0s;
        transition-delay: calc(var(--media-preview-transition-delay-out, 0s) + var(--media-preview-transition-duration-out, .25s));
        background: var(--media-preview-time-background, var(--_preview-background));
        border-radius: var(--media-preview-time-border-radius,
          var(--media-preview-border-radius) var(--media-preview-border-radius)
          var(--media-preview-border-radius) var(--media-preview-border-radius));
        padding: var(--media-preview-time-padding, 3.5px 9px);
        margin: var(--media-preview-time-margin, 0);
        text-shadow: var(--media-preview-time-text-shadow, 0 0 4px rgb(0 0 0 / .75));
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50%)
        ));
      }

      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${MediaUIAttributes.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${MediaUIAttributes.MEDIA_PREVIEW_TIME}]:hover) {
        --media-time-range-hover-display: block;
      }

      [part~="arrow"],
      ::slotted([part~="arrow"]) {
        display: var(--media-box-arrow-display, inline-block);
        transform: translateX(min(
          max(calc(50% - var(--_box-width) / 2 + var(--media-box-arrow-offset)),
          calc(var(--_box-shift, 0))),
          calc(var(--_box-width) / 2 - 50% - var(--media-box-arrow-offset))
        ));
        ${/* border-color has to come before border-top-color! */
    ""}
        border-color: transparent;
        border-top-color: var(--media-box-arrow-background, var(--_control-background));
        border-width: var(--media-box-arrow-border-width,
          var(--media-box-arrow-height, 5px) var(--media-box-arrow-width, 6px) 0);
        border-style: solid;
        justify-content: center;
        height: 0;
      }
    </style>
    <div id="preview-rail">
      <slot name="preview" part="box preview-box">
        <media-preview-thumbnail>
          <template shadowrootmode="${media_preview_thumbnail_default.shadowRootOptions.mode}">
            ${media_preview_thumbnail_default.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        ${/* Example: add the current time w/ arrow to the playhead
    <media-time-display slot="current"></media-time-display>
    <div part="arrow" slot="current"></div> */
    ""}
      </slot>
    </div>
  `
  );
}
__name(getTemplateHTML$7, "getTemplateHTML$7");
const calcRangeValueFromTime = /* @__PURE__ */ __name((el, time = el.mediaCurrentTime) => {
  const startTime = Number.isFinite(el.mediaSeekableStart) ? el.mediaSeekableStart : 0;
  const endTime = Number.isFinite(el.mediaDuration) ? el.mediaDuration : el.mediaSeekableEnd;
  if (Number.isNaN(endTime))
    return 0;
  const value = (time - startTime) / (endTime - startTime);
  return Math.max(0, Math.min(value, 1));
}, "calcRangeValueFromTime");
const calcTimeFromRangeValue = /* @__PURE__ */ __name((el, value = el.range.valueAsNumber) => {
  const startTime = Number.isFinite(el.mediaSeekableStart) ? el.mediaSeekableStart : 0;
  const endTime = Number.isFinite(el.mediaDuration) ? el.mediaDuration : el.mediaSeekableEnd;
  if (Number.isNaN(endTime))
    return 0;
  return value * (endTime - startTime) + startTime;
}, "calcTimeFromRangeValue");
const _MediaTimeRange = class _MediaTimeRange extends MediaChromeRange {
  constructor() {
    super();
    __privateAdd$9(this, _toggleRangeAnimation);
    __privateAdd$9(this, _shouldRangeAnimate);
    __privateAdd$9(this, _getElementRects);
    __privateAdd$9(this, _getBoxPosition);
    __privateAdd$9(this, _getBoxShiftPosition);
    __privateAdd$9(this, _handlePointerMove);
    __privateAdd$9(this, _previewRequest);
    __privateAdd$9(this, _seekRequest);
    __privateAdd$9(this, _rootNode, void 0);
    __privateAdd$9(this, _animation, void 0);
    __privateAdd$9(this, _boxes, void 0);
    __privateAdd$9(this, _previewTime, void 0);
    __privateAdd$9(this, _previewBox, void 0);
    __privateAdd$9(this, _currentBox, void 0);
    __privateAdd$9(this, _boxPaddingLeft, void 0);
    __privateAdd$9(this, _boxPaddingRight, void 0);
    __privateAdd$9(this, _mediaChaptersCues, void 0);
    __privateAdd$9(this, _isPointerDown, void 0);
    __privateAdd$9(this, _updateRange, (value) => {
      if (this.dragging)
        return;
      if (isValidNumber(value)) {
        this.range.valueAsNumber = value;
      }
      if (!__privateGet$9(this, _isPointerDown)) {
        this.updateBar();
      }
    });
    const track = this.shadowRoot.querySelector("#track");
    track.insertAdjacentHTML(
      "afterbegin",
      '<div id="buffered" part="buffered"></div>'
    );
    __privateSet$8(this, _boxes, this.shadowRoot.querySelectorAll('[part~="box"]'));
    __privateSet$8(this, _previewBox, this.shadowRoot.querySelector('[part~="preview-box"]'));
    __privateSet$8(this, _currentBox, this.shadowRoot.querySelector('[part~="current-box"]'));
    const computedStyle = getComputedStyle(this);
    __privateSet$8(this, _boxPaddingLeft, parseInt(
      computedStyle.getPropertyValue("--media-box-padding-left")
    ));
    __privateSet$8(this, _boxPaddingRight, parseInt(
      computedStyle.getPropertyValue("--media-box-padding-right")
    ));
    __privateSet$8(this, _animation, new RangeAnimation(this.range, __privateGet$9(this, _updateRange), 60));
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PAUSED,
      MediaUIAttributes.MEDIA_DURATION,
      MediaUIAttributes.MEDIA_SEEKABLE,
      MediaUIAttributes.MEDIA_CURRENT_TIME,
      MediaUIAttributes.MEDIA_PREVIEW_IMAGE,
      MediaUIAttributes.MEDIA_PREVIEW_TIME,
      MediaUIAttributes.MEDIA_PREVIEW_CHAPTER,
      MediaUIAttributes.MEDIA_BUFFERED,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      MediaUIAttributes.MEDIA_LOADING,
      MediaUIAttributes.MEDIA_ENDED
    ];
  }
  connectedCallback() {
    var _a3;
    super.connectedCallback();
    this.range.setAttribute("aria-label", t("seek"));
    __privateMethod$8(this, _toggleRangeAnimation, toggleRangeAnimation_fn).call(this);
    __privateSet$8(this, _rootNode, this.getRootNode());
    (_a3 = __privateGet$9(this, _rootNode)) == null ? void 0 : _a3.addEventListener("transitionstart", this);
  }
  disconnectedCallback() {
    var _a3;
    super.disconnectedCallback();
    __privateMethod$8(this, _toggleRangeAnimation, toggleRangeAnimation_fn).call(this);
    (_a3 = __privateGet$9(this, _rootNode)) == null ? void 0 : _a3.removeEventListener("transitionstart", this);
    __privateSet$8(this, _rootNode, null);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (oldValue == newValue)
      return;
    if (attrName === MediaUIAttributes.MEDIA_CURRENT_TIME || attrName === MediaUIAttributes.MEDIA_PAUSED || attrName === MediaUIAttributes.MEDIA_ENDED || attrName === MediaUIAttributes.MEDIA_LOADING || attrName === MediaUIAttributes.MEDIA_DURATION || attrName === MediaUIAttributes.MEDIA_SEEKABLE) {
      __privateGet$9(this, _animation).update({
        start: calcRangeValueFromTime(this),
        duration: this.mediaSeekableEnd - this.mediaSeekableStart,
        playbackRate: this.mediaPlaybackRate
      });
      __privateMethod$8(this, _toggleRangeAnimation, toggleRangeAnimation_fn).call(this);
      updateAriaValueText(this);
    } else if (attrName === MediaUIAttributes.MEDIA_BUFFERED) {
      this.updateBufferedBar();
    }
    if (attrName === MediaUIAttributes.MEDIA_DURATION || attrName === MediaUIAttributes.MEDIA_SEEKABLE) {
      this.mediaChaptersCues = __privateGet$9(this, _mediaChaptersCues);
      this.updateBar();
    }
  }
  get mediaChaptersCues() {
    return __privateGet$9(this, _mediaChaptersCues);
  }
  set mediaChaptersCues(value) {
    var _a3;
    __privateSet$8(this, _mediaChaptersCues, value);
    this.updateSegments(
      (_a3 = __privateGet$9(this, _mediaChaptersCues)) == null ? void 0 : _a3.map((c2) => ({
        start: calcRangeValueFromTime(this, c2.startTime),
        end: calcRangeValueFromTime(this, c2.endTime)
      }))
    );
  }
  /**
   * Is the media paused
   */
  get mediaPaused() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED);
  }
  set mediaPaused(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_PAUSED, value);
  }
  /**
   * Is the media loading
   */
  get mediaLoading() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_LOADING);
  }
  set mediaLoading(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_LOADING, value);
  }
  /**
   *
   */
  get mediaDuration() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_DURATION);
  }
  set mediaDuration(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_DURATION, value);
  }
  /**
   *
   */
  get mediaCurrentTime() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME);
  }
  set mediaCurrentTime(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_CURRENT_TIME, value);
  }
  /**
   *
   */
  get mediaPlaybackRate() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, 1);
  }
  set mediaPlaybackRate(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, value);
  }
  /**
   * An array of ranges, each range being an array of two numbers.
   * e.g. [[1, 2], [3, 4]]
   */
  get mediaBuffered() {
    const buffered = this.getAttribute(MediaUIAttributes.MEDIA_BUFFERED);
    if (!buffered)
      return [];
    return buffered.split(" ").map((timePair) => timePair.split(":").map((timeStr) => +timeStr));
  }
  set mediaBuffered(list) {
    if (!list) {
      this.removeAttribute(MediaUIAttributes.MEDIA_BUFFERED);
      return;
    }
    const strVal = list.map((tuple) => tuple.join(":")).join(" ");
    this.setAttribute(MediaUIAttributes.MEDIA_BUFFERED, strVal);
  }
  /**
   * Range of values that can be seeked to
   * An array of two numbers [start, end]
   */
  get mediaSeekable() {
    const seekable = this.getAttribute(MediaUIAttributes.MEDIA_SEEKABLE);
    if (!seekable)
      return void 0;
    return seekable.split(":").map((time) => +time);
  }
  set mediaSeekable(range) {
    if (range == null) {
      this.removeAttribute(MediaUIAttributes.MEDIA_SEEKABLE);
      return;
    }
    this.setAttribute(MediaUIAttributes.MEDIA_SEEKABLE, range.join(":"));
  }
  /**
   *
   */
  get mediaSeekableEnd() {
    var _a3;
    const [, end = this.mediaDuration] = (_a3 = this.mediaSeekable) != null ? _a3 : [];
    return end;
  }
  get mediaSeekableStart() {
    var _a3;
    const [start = 0] = (_a3 = this.mediaSeekable) != null ? _a3 : [];
    return start;
  }
  /**
   * The url of the preview image
   */
  get mediaPreviewImage() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_IMAGE);
  }
  set mediaPreviewImage(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_PREVIEW_IMAGE, value);
  }
  /**
   *
   */
  get mediaPreviewTime() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_PREVIEW_TIME);
  }
  set mediaPreviewTime(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PREVIEW_TIME, value);
  }
  /**
   *
   */
  get mediaEnded() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_ENDED);
  }
  set mediaEnded(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_ENDED, value);
  }
  /* Add a buffered progress bar */
  updateBar() {
    super.updateBar();
    this.updateBufferedBar();
    this.updateCurrentBox();
  }
  updateBufferedBar() {
    var _a3;
    const buffered = this.mediaBuffered;
    if (!buffered.length) {
      return;
    }
    let relativeBufferedEnd;
    if (!this.mediaEnded) {
      const currentTime = this.mediaCurrentTime;
      const [, bufferedEnd = this.mediaSeekableStart] = (_a3 = buffered.find(
        ([start, end]) => start <= currentTime && currentTime <= end
      )) != null ? _a3 : [];
      relativeBufferedEnd = calcRangeValueFromTime(this, bufferedEnd);
    } else {
      relativeBufferedEnd = 1;
    }
    const { style } = getOrInsertCSSRule(this.shadowRoot, "#buffered");
    style.setProperty("width", `${relativeBufferedEnd * 100}%`);
  }
  updateCurrentBox() {
    const currentSlot = this.shadowRoot.querySelector(
      'slot[name="current"]'
    );
    if (!currentSlot.assignedElements().length)
      return;
    const currentRailRule = getOrInsertCSSRule(
      this.shadowRoot,
      "#current-rail"
    );
    const currentBoxRule = getOrInsertCSSRule(
      this.shadowRoot,
      '[part~="current-box"]'
    );
    const rects = __privateMethod$8(this, _getElementRects, getElementRects_fn).call(this, __privateGet$9(this, _currentBox));
    const boxPos = __privateMethod$8(this, _getBoxPosition, getBoxPosition_fn).call(this, rects, this.range.valueAsNumber);
    const boxShift = __privateMethod$8(this, _getBoxShiftPosition, getBoxShiftPosition_fn).call(this, rects, this.range.valueAsNumber);
    currentRailRule.style.transform = `translateX(${boxPos})`;
    currentRailRule.style.setProperty("--_range-width", `${rects.range.width}`);
    currentBoxRule.style.setProperty("--_box-shift", `${boxShift}`);
    currentBoxRule.style.setProperty("--_box-width", `${rects.box.width}px`);
    currentBoxRule.style.setProperty("visibility", "initial");
  }
  handleEvent(evt) {
    super.handleEvent(evt);
    switch (evt.type) {
      case "input":
        __privateMethod$8(this, _seekRequest, seekRequest_fn).call(this);
        break;
      case "pointermove":
        __privateMethod$8(this, _handlePointerMove, handlePointerMove_fn).call(this, evt);
        break;
      case "pointerup":
        if (__privateGet$9(this, _isPointerDown))
          __privateSet$8(this, _isPointerDown, false);
        break;
      case "pointerdown":
        __privateSet$8(this, _isPointerDown, true);
        break;
      case "pointerleave":
        __privateMethod$8(this, _previewRequest, previewRequest_fn).call(this, null);
        break;
      case "transitionstart":
        if (containsComposedNode(evt.target, this)) {
          setTimeout(() => __privateMethod$8(this, _toggleRangeAnimation, toggleRangeAnimation_fn).call(this), 0);
        }
        break;
    }
  }
};
__name(_MediaTimeRange, "MediaTimeRange");
let MediaTimeRange = _MediaTimeRange;
_rootNode = /* @__PURE__ */ new WeakMap();
_animation = /* @__PURE__ */ new WeakMap();
_boxes = /* @__PURE__ */ new WeakMap();
_previewTime = /* @__PURE__ */ new WeakMap();
_previewBox = /* @__PURE__ */ new WeakMap();
_currentBox = /* @__PURE__ */ new WeakMap();
_boxPaddingLeft = /* @__PURE__ */ new WeakMap();
_boxPaddingRight = /* @__PURE__ */ new WeakMap();
_mediaChaptersCues = /* @__PURE__ */ new WeakMap();
_isPointerDown = /* @__PURE__ */ new WeakMap();
_toggleRangeAnimation = /* @__PURE__ */ new WeakSet();
toggleRangeAnimation_fn = /* @__PURE__ */ __name(function() {
  if (__privateMethod$8(this, _shouldRangeAnimate, shouldRangeAnimate_fn).call(this)) {
    __privateGet$9(this, _animation).start();
  } else {
    __privateGet$9(this, _animation).stop();
  }
}, "toggleRangeAnimation_fn");
_shouldRangeAnimate = /* @__PURE__ */ new WeakSet();
shouldRangeAnimate_fn = /* @__PURE__ */ __name(function() {
  return this.isConnected && !this.mediaPaused && !this.mediaLoading && !this.mediaEnded && this.mediaSeekableEnd > 0 && isElementVisible(this);
}, "shouldRangeAnimate_fn");
_updateRange = /* @__PURE__ */ new WeakMap();
_getElementRects = /* @__PURE__ */ new WeakSet();
getElementRects_fn = /* @__PURE__ */ __name(function(box) {
  var _a3;
  const bounds = (_a3 = this.getAttribute("bounds") ? closestComposedNode(this, `#${this.getAttribute("bounds")}`) : this.parentElement) != null ? _a3 : this;
  const boundsRect = bounds.getBoundingClientRect();
  const rangeRect = this.range.getBoundingClientRect();
  const width = box.offsetWidth;
  const min = -(rangeRect.left - boundsRect.left - width / 2);
  const max = boundsRect.right - rangeRect.left - width / 2;
  return {
    box: { width, min, max },
    bounds: boundsRect,
    range: rangeRect
  };
}, "getElementRects_fn");
_getBoxPosition = /* @__PURE__ */ new WeakSet();
getBoxPosition_fn = /* @__PURE__ */ __name(function(rects, ratio) {
  let position = `${ratio * 100}%`;
  const { width, min, max } = rects.box;
  if (!width)
    return position;
  if (!Number.isNaN(min)) {
    const pad = `var(--media-box-padding-left)`;
    const minPos = `calc(1 / var(--_range-width) * 100 * ${min}% + ${pad})`;
    position = `max(${minPos}, ${position})`;
  }
  if (!Number.isNaN(max)) {
    const pad = `var(--media-box-padding-right)`;
    const maxPos = `calc(1 / var(--_range-width) * 100 * ${max}% - ${pad})`;
    position = `min(${position}, ${maxPos})`;
  }
  return position;
}, "getBoxPosition_fn");
_getBoxShiftPosition = /* @__PURE__ */ new WeakSet();
getBoxShiftPosition_fn = /* @__PURE__ */ __name(function(rects, ratio) {
  const { width, min, max } = rects.box;
  const pointerX = ratio * rects.range.width;
  if (pointerX < min + __privateGet$9(this, _boxPaddingLeft)) {
    const offset = rects.range.left - rects.bounds.left - __privateGet$9(this, _boxPaddingLeft);
    return `${pointerX - width / 2 + offset}px`;
  }
  if (pointerX > max - __privateGet$9(this, _boxPaddingRight)) {
    const offset = rects.bounds.right - rects.range.right - __privateGet$9(this, _boxPaddingRight);
    return `${pointerX + width / 2 - offset - rects.range.width}px`;
  }
  return 0;
}, "getBoxShiftPosition_fn");
_handlePointerMove = /* @__PURE__ */ new WeakSet();
handlePointerMove_fn = /* @__PURE__ */ __name(function(evt) {
  const isOverBoxes = [...__privateGet$9(this, _boxes)].some(
    (b2) => evt.composedPath().includes(b2)
  );
  if (!this.dragging && (isOverBoxes || !evt.composedPath().includes(this))) {
    __privateMethod$8(this, _previewRequest, previewRequest_fn).call(this, null);
    return;
  }
  const duration = this.mediaSeekableEnd;
  if (!duration)
    return;
  const previewRailRule = getOrInsertCSSRule(
    this.shadowRoot,
    "#preview-rail"
  );
  const previewBoxRule = getOrInsertCSSRule(
    this.shadowRoot,
    '[part~="preview-box"]'
  );
  const rects = __privateMethod$8(this, _getElementRects, getElementRects_fn).call(this, __privateGet$9(this, _previewBox));
  let pointerRatio = (evt.clientX - rects.range.left) / rects.range.width;
  pointerRatio = Math.max(0, Math.min(1, pointerRatio));
  const boxPos = __privateMethod$8(this, _getBoxPosition, getBoxPosition_fn).call(this, rects, pointerRatio);
  const boxShift = __privateMethod$8(this, _getBoxShiftPosition, getBoxShiftPosition_fn).call(this, rects, pointerRatio);
  previewRailRule.style.transform = `translateX(${boxPos})`;
  previewRailRule.style.setProperty("--_range-width", `${rects.range.width}`);
  previewBoxRule.style.setProperty("--_box-shift", `${boxShift}`);
  previewBoxRule.style.setProperty("--_box-width", `${rects.box.width}px`);
  const diff = Math.round(__privateGet$9(this, _previewTime)) - Math.round(pointerRatio * duration);
  if (Math.abs(diff) < 1 && pointerRatio > 0.01 && pointerRatio < 0.99)
    return;
  __privateSet$8(this, _previewTime, pointerRatio * duration);
  __privateMethod$8(this, _previewRequest, previewRequest_fn).call(this, __privateGet$9(this, _previewTime));
}, "handlePointerMove_fn");
_previewRequest = /* @__PURE__ */ new WeakSet();
previewRequest_fn = /* @__PURE__ */ __name(function(detail) {
  this.dispatchEvent(
    new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_PREVIEW_REQUEST, {
      composed: true,
      bubbles: true,
      detail
    })
  );
}, "previewRequest_fn");
_seekRequest = /* @__PURE__ */ new WeakSet();
seekRequest_fn = /* @__PURE__ */ __name(function() {
  __privateGet$9(this, _animation).stop();
  const detail = calcTimeFromRangeValue(this);
  this.dispatchEvent(
    new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_SEEK_REQUEST, {
      composed: true,
      bubbles: true,
      detail
    })
  );
}, "seekRequest_fn");
MediaTimeRange.shadowRootOptions = { mode: "open" };
MediaTimeRange.getTemplateHTML = getTemplateHTML$7;
if (!GlobalThis.customElements.get("media-time-range")) {
  GlobalThis.customElements.define("media-time-range", MediaTimeRange);
}
const DEFAULT_VOLUME = 1;
const toVolume = /* @__PURE__ */ __name((el) => {
  if (el.mediaMuted)
    return 0;
  return el.mediaVolume;
}, "toVolume");
const formatAsPercentString = /* @__PURE__ */ __name((value) => `${Math.round(value * 100)}%`, "formatAsPercentString");
const _MediaVolumeRange = class _MediaVolumeRange extends MediaChromeRange {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_VOLUME,
      MediaUIAttributes.MEDIA_MUTED,
      MediaUIAttributes.MEDIA_VOLUME_UNAVAILABLE
    ];
  }
  constructor() {
    super();
    this.range.addEventListener("input", () => {
      const detail = this.range.value;
      const evt = new GlobalThis.CustomEvent(
        MediaUIEvents.MEDIA_VOLUME_REQUEST,
        {
          composed: true,
          bubbles: true,
          detail
        }
      );
      this.dispatchEvent(evt);
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this.range.setAttribute("aria-label", t("volume"));
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_VOLUME || attrName === MediaUIAttributes.MEDIA_MUTED) {
      this.range.valueAsNumber = toVolume(this);
      this.range.setAttribute(
        "aria-valuetext",
        formatAsPercentString(this.range.valueAsNumber)
      );
      this.updateBar();
    }
  }
  /**
   *
   */
  get mediaVolume() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_VOLUME, DEFAULT_VOLUME);
  }
  set mediaVolume(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_VOLUME, value);
  }
  /**
   * Is the media currently muted
   */
  get mediaMuted() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_MUTED);
  }
  set mediaMuted(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_MUTED, value);
  }
  /**
   * The volume unavailability state
   */
  get mediaVolumeUnavailable() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_VOLUME_UNAVAILABLE);
  }
  set mediaVolumeUnavailable(value) {
    setStringAttr(this, MediaUIAttributes.MEDIA_VOLUME_UNAVAILABLE, value);
  }
};
__name(_MediaVolumeRange, "MediaVolumeRange");
let MediaVolumeRange = _MediaVolumeRange;
if (!GlobalThis.customElements.get("media-volume-range")) {
  GlobalThis.customElements.define("media-volume-range", MediaVolumeRange);
}
function getSlotTemplateHTML$5(_attrs) {
  return (
    /*html*/
    `
      <style>
        :host {
          min-width: 4ch;
          padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1rem;
          font-weight: var(--media-button-font-weight, normal);
        }

        #checked-indicator {
          display: none;
        }

        :host([${MediaUIAttributes.MEDIA_LOOP}]) #checked-indicator {
          display: block;
        }
      </style>
      
      <span id="icon">
     </span>

      <div id="checked-indicator">
        <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
          <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
        </svg>
      </div>
    `
  );
}
__name(getSlotTemplateHTML$5, "getSlotTemplateHTML$5");
function getTooltipContentHTML$5() {
  return t("Loop");
}
__name(getTooltipContentHTML$5, "getTooltipContentHTML$5");
const _MediaLoopButton = class _MediaLoopButton extends MediaChromeButton {
  constructor() {
    super(...arguments);
    this.container = null;
  }
  static get observedAttributes() {
    return [...super.observedAttributes, MediaUIAttributes.MEDIA_LOOP];
  }
  connectedCallback() {
    var _a3;
    super.connectedCallback();
    this.container = ((_a3 = this.shadowRoot) == null ? void 0 : _a3.querySelector("#icon")) || null;
    if (this.container) {
      this.container.textContent = t("Loop");
    }
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_LOOP && this.container) {
      this.setAttribute(
        "aria-checked",
        this.mediaLoop ? "true" : "false"
      );
    }
  }
  get mediaLoop() {
    return getBooleanAttr(this, MediaUIAttributes.MEDIA_LOOP);
  }
  set mediaLoop(value) {
    setBooleanAttr(this, MediaUIAttributes.MEDIA_LOOP, value);
  }
  handleClick() {
    const looping = !this.mediaLoop;
    const evt = new GlobalThis.CustomEvent(MediaUIEvents.MEDIA_LOOP_REQUEST, {
      composed: true,
      bubbles: true,
      detail: looping
    });
    this.dispatchEvent(evt);
  }
};
__name(_MediaLoopButton, "MediaLoopButton");
let MediaLoopButton = _MediaLoopButton;
MediaLoopButton.getSlotTemplateHTML = getSlotTemplateHTML$5;
MediaLoopButton.getTooltipContentHTML = getTooltipContentHTML$5;
if (!GlobalThis.customElements.get("media-loop-button")) {
  GlobalThis.customElements.define("media-loop-button", MediaLoopButton);
}
var __accessCheck$8 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$8");
var __privateGet$8 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$8(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$8");
var __privateAdd$8 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$8");
var __privateSet$7 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$8(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$7");
var _parts, _processor, _items, _value, _element, _attributeName, _namespaceURI, _list, list_get, _parentNode, _nodes;
const ELEMENT = 1;
const STRING = 0;
const PART = 1;
const defaultProcessor = {
  processCallback(instance, parts, state) {
    if (!state)
      return;
    for (const [expression, part] of parts) {
      if (expression in state) {
        const value = state[expression];
        if (typeof value === "boolean" && part instanceof AttrPart && typeof part.element[part.attributeName] === "boolean") {
          part.booleanValue = value;
        } else if (typeof value === "function" && part instanceof AttrPart) {
          part.element[part.attributeName] = value;
        } else {
          part.value = value;
        }
      }
    }
  }
};
const _TemplateInstance = class _TemplateInstance extends GlobalThis.DocumentFragment {
  constructor(template, state, processor2 = defaultProcessor) {
    var _a3;
    super();
    __privateAdd$8(this, _parts, void 0);
    __privateAdd$8(this, _processor, void 0);
    this.append(template.content.cloneNode(true));
    __privateSet$7(this, _parts, parse(this));
    __privateSet$7(this, _processor, processor2);
    (_a3 = processor2.createCallback) == null ? void 0 : _a3.call(processor2, this, __privateGet$8(this, _parts), state);
    processor2.processCallback(this, __privateGet$8(this, _parts), state);
  }
  update(state) {
    __privateGet$8(this, _processor).processCallback(this, __privateGet$8(this, _parts), state);
  }
};
__name(_TemplateInstance, "TemplateInstance");
let TemplateInstance = _TemplateInstance;
_parts = /* @__PURE__ */ new WeakMap();
_processor = /* @__PURE__ */ new WeakMap();
const parse = /* @__PURE__ */ __name((element, parts = []) => {
  let type, value;
  for (const attr of element.attributes || []) {
    if (attr.value.includes("{{")) {
      const list = new AttrPartList();
      for ([type, value] of tokenize$1(attr.value)) {
        if (!type)
          list.append(value);
        else {
          const part = new AttrPart(element, attr.name, attr.namespaceURI);
          list.append(part);
          parts.push([value, part]);
        }
      }
      attr.value = list.toString();
    }
  }
  for (const node of element.childNodes) {
    if (node.nodeType === ELEMENT && !(node instanceof HTMLTemplateElement)) {
      parse(node, parts);
    } else {
      const data = node.data;
      if (node.nodeType === ELEMENT || data.includes("{{")) {
        const items = [];
        if (data) {
          for ([type, value] of tokenize$1(data))
            if (!type)
              items.push(new Text(value));
            else {
              const part = new ChildNodePart(element);
              items.push(part);
              parts.push([value, part]);
            }
        } else if (node instanceof HTMLTemplateElement) {
          const part = new InnerTemplatePart(element, node);
          items.push(part);
          parts.push([part.expression, part]);
        }
        node.replaceWith(
          ...items.flatMap((part) => part.replacementNodes || [part])
        );
      }
    }
  }
  return parts;
}, "parse");
const mem = {};
const tokenize$1 = /* @__PURE__ */ __name((text) => {
  let value = "", open = 0, tokens = mem[text], i2 = 0, c2;
  if (tokens)
    return tokens;
  else
    tokens = [];
  for (; c2 = text[i2]; i2++) {
    if (c2 === "{" && text[i2 + 1] === "{" && text[i2 - 1] !== "\\" && text[i2 + 2] && ++open == 1) {
      if (value)
        tokens.push([STRING, value]);
      value = "";
      i2++;
    } else if (c2 === "}" && text[i2 + 1] === "}" && text[i2 - 1] !== "\\" && !--open) {
      tokens.push([PART, value.trim()]);
      value = "";
      i2++;
    } else
      value += c2 || "";
  }
  if (value)
    tokens.push([STRING, (open > 0 ? "{{" : "") + value]);
  return mem[text] = tokens;
}, "tokenize$1");
const FRAGMENT = 11;
const _Part = class _Part {
  get value() {
    return "";
  }
  set value(val) {
  }
  toString() {
    return this.value;
  }
};
__name(_Part, "Part");
let Part = _Part;
const attrPartToList = /* @__PURE__ */ new WeakMap();
const _AttrPartList = class _AttrPartList {
  constructor() {
    __privateAdd$8(this, _items, []);
  }
  [Symbol.iterator]() {
    return __privateGet$8(this, _items).values();
  }
  get length() {
    return __privateGet$8(this, _items).length;
  }
  item(index) {
    return __privateGet$8(this, _items)[index];
  }
  append(...items) {
    for (const item of items) {
      if (item instanceof AttrPart) {
        attrPartToList.set(item, this);
      }
      __privateGet$8(this, _items).push(item);
    }
  }
  toString() {
    return __privateGet$8(this, _items).join("");
  }
};
__name(_AttrPartList, "AttrPartList");
let AttrPartList = _AttrPartList;
_items = /* @__PURE__ */ new WeakMap();
const _AttrPart = class _AttrPart extends Part {
  constructor(element, attributeName, namespaceURI) {
    super();
    __privateAdd$8(this, _list);
    __privateAdd$8(this, _value, "");
    __privateAdd$8(this, _element, void 0);
    __privateAdd$8(this, _attributeName, void 0);
    __privateAdd$8(this, _namespaceURI, void 0);
    __privateSet$7(this, _element, element);
    __privateSet$7(this, _attributeName, attributeName);
    __privateSet$7(this, _namespaceURI, namespaceURI);
  }
  get attributeName() {
    return __privateGet$8(this, _attributeName);
  }
  get attributeNamespace() {
    return __privateGet$8(this, _namespaceURI);
  }
  get element() {
    return __privateGet$8(this, _element);
  }
  get value() {
    return __privateGet$8(this, _value);
  }
  set value(newValue) {
    if (__privateGet$8(this, _value) === newValue)
      return;
    __privateSet$7(this, _value, newValue);
    if (!__privateGet$8(this, _list, list_get) || __privateGet$8(this, _list, list_get).length === 1) {
      if (newValue == null) {
        __privateGet$8(this, _element).removeAttributeNS(
          __privateGet$8(this, _namespaceURI),
          __privateGet$8(this, _attributeName)
        );
      } else {
        __privateGet$8(this, _element).setAttributeNS(
          __privateGet$8(this, _namespaceURI),
          __privateGet$8(this, _attributeName),
          newValue
        );
      }
    } else {
      __privateGet$8(this, _element).setAttributeNS(
        __privateGet$8(this, _namespaceURI),
        __privateGet$8(this, _attributeName),
        __privateGet$8(this, _list, list_get).toString()
      );
    }
  }
  get booleanValue() {
    return __privateGet$8(this, _element).hasAttributeNS(
      __privateGet$8(this, _namespaceURI),
      __privateGet$8(this, _attributeName)
    );
  }
  set booleanValue(value) {
    if (!__privateGet$8(this, _list, list_get) || __privateGet$8(this, _list, list_get).length === 1)
      this.value = value ? "" : null;
    else
      throw new DOMException("Value is not fully templatized");
  }
};
__name(_AttrPart, "AttrPart");
let AttrPart = _AttrPart;
_value = /* @__PURE__ */ new WeakMap();
_element = /* @__PURE__ */ new WeakMap();
_attributeName = /* @__PURE__ */ new WeakMap();
_namespaceURI = /* @__PURE__ */ new WeakMap();
_list = /* @__PURE__ */ new WeakSet();
list_get = /* @__PURE__ */ __name(function() {
  return attrPartToList.get(this);
}, "list_get");
const _ChildNodePart = class _ChildNodePart extends Part {
  constructor(parentNode, nodes) {
    super();
    __privateAdd$8(this, _parentNode, void 0);
    __privateAdd$8(this, _nodes, void 0);
    __privateSet$7(this, _parentNode, parentNode);
    __privateSet$7(this, _nodes, nodes ? [...nodes] : [new Text()]);
  }
  get replacementNodes() {
    return __privateGet$8(this, _nodes);
  }
  get parentNode() {
    return __privateGet$8(this, _parentNode);
  }
  get nextSibling() {
    return __privateGet$8(this, _nodes)[__privateGet$8(this, _nodes).length - 1].nextSibling;
  }
  get previousSibling() {
    return __privateGet$8(this, _nodes)[0].previousSibling;
  }
  // FIXME: not sure why do we need string serialization here? Just because parent class has type DOMString?
  get value() {
    return __privateGet$8(this, _nodes).map((node) => node.textContent).join("");
  }
  set value(newValue) {
    this.replace(newValue);
  }
  replace(...nodes) {
    const normalisedNodes = nodes.flat().flatMap(
      (node) => node == null ? [new Text()] : node.forEach ? [...node] : node.nodeType === FRAGMENT ? [...node.childNodes] : node.nodeType ? [node] : [new Text(node)]
    );
    if (!normalisedNodes.length)
      normalisedNodes.push(new Text());
    __privateSet$7(this, _nodes, swapdom(
      __privateGet$8(this, _nodes)[0].parentNode,
      __privateGet$8(this, _nodes),
      normalisedNodes,
      this.nextSibling
    ));
  }
};
__name(_ChildNodePart, "ChildNodePart");
let ChildNodePart = _ChildNodePart;
_parentNode = /* @__PURE__ */ new WeakMap();
_nodes = /* @__PURE__ */ new WeakMap();
const _InnerTemplatePart = class _InnerTemplatePart extends ChildNodePart {
  constructor(parentNode, template) {
    const directive = template.getAttribute("directive") || template.getAttribute("type");
    let expression = template.getAttribute("expression") || template.getAttribute(directive) || "";
    if (expression.startsWith("{{"))
      expression = expression.trim().slice(2, -2).trim();
    super(parentNode);
    this.expression = expression;
    this.template = template;
    this.directive = directive;
  }
};
__name(_InnerTemplatePart, "InnerTemplatePart");
let InnerTemplatePart = _InnerTemplatePart;
function swapdom(parent, a, b2, end = null) {
  let i2 = 0, cur, next, bi2, n2 = b2.length, m2 = a.length;
  while (i2 < n2 && i2 < m2 && a[i2] == b2[i2])
    i2++;
  while (i2 < n2 && i2 < m2 && b2[n2 - 1] == a[m2 - 1])
    end = b2[--m2, --n2];
  if (i2 == m2)
    while (i2 < n2)
      parent.insertBefore(b2[i2++], end);
  if (i2 == n2)
    while (i2 < m2)
      parent.removeChild(a[i2++]);
  else {
    cur = a[i2];
    while (i2 < n2) {
      bi2 = b2[i2++], next = cur ? cur.nextSibling : end;
      if (cur == bi2)
        cur = next;
      else if (i2 < n2 && b2[i2] == next)
        parent.replaceChild(bi2, cur), cur = next;
      else
        parent.insertBefore(bi2, cur);
    }
    while (cur != end)
      next = cur.nextSibling, parent.removeChild(cur), cur = next;
  }
  return b2;
}
__name(swapdom, "swapdom");
const pipeModifiers = {
  string: /* @__PURE__ */ __name((value) => String(value), "string")
};
const _PartialTemplate = class _PartialTemplate {
  constructor(template) {
    this.template = template;
    this.state = void 0;
  }
};
__name(_PartialTemplate, "PartialTemplate");
let PartialTemplate = _PartialTemplate;
const templates = /* @__PURE__ */ new WeakMap();
const templateInstances = /* @__PURE__ */ new WeakMap();
const Directives = {
  partial: /* @__PURE__ */ __name((part, state) => {
    state[part.expression] = new PartialTemplate(part.template);
  }, "partial"),
  if: /* @__PURE__ */ __name((part, state) => {
    var _a3;
    if (evaluateExpression(part.expression, state)) {
      if (templates.get(part) !== part.template) {
        templates.set(part, part.template);
        const tpl = new TemplateInstance(part.template, state, processor);
        part.replace(tpl);
        templateInstances.set(part, tpl);
      } else {
        (_a3 = templateInstances.get(part)) == null ? void 0 : _a3.update(state);
      }
    } else {
      part.replace("");
      templates.delete(part);
      templateInstances.delete(part);
    }
  }, "if")
};
const DirectiveNames = Object.keys(Directives);
const processor = {
  processCallback(instance, parts, state) {
    var _a3, _b2;
    if (!state)
      return;
    for (const [expression, part] of parts) {
      if (part instanceof InnerTemplatePart) {
        if (!part.directive) {
          const directive = DirectiveNames.find(
            (n2) => part.template.hasAttribute(n2)
          );
          if (directive) {
            part.directive = directive;
            part.expression = part.template.getAttribute(directive);
          }
        }
        (_a3 = Directives[part.directive]) == null ? void 0 : _a3.call(Directives, part, state);
        continue;
      }
      let value = evaluateExpression(expression, state);
      if (value instanceof PartialTemplate) {
        if (templates.get(part) !== value.template) {
          templates.set(part, value.template);
          value = new TemplateInstance(value.template, value.state, processor);
          part.value = value;
          templateInstances.set(part, value);
        } else {
          (_b2 = templateInstances.get(part)) == null ? void 0 : _b2.update(value.state);
        }
        continue;
      }
      if (value) {
        if (part instanceof AttrPart) {
          if (part.attributeName.startsWith("aria-")) {
            value = String(value);
          }
        }
        if (part instanceof AttrPart) {
          if (typeof value === "boolean") {
            part.booleanValue = value;
          } else if (typeof value === "function") {
            part.element[part.attributeName] = value;
          } else {
            part.value = value;
          }
        } else {
          part.value = value;
          templates.delete(part);
          templateInstances.delete(part);
        }
      } else {
        if (part instanceof AttrPart) {
          part.value = void 0;
        } else {
          part.value = void 0;
          templates.delete(part);
          templateInstances.delete(part);
        }
      }
    }
  }
};
const operators = {
  "!": /* @__PURE__ */ __name((a) => !a, "!"),
  "!!": /* @__PURE__ */ __name((a) => !!a, "!!"),
  "==": /* @__PURE__ */ __name((a, b2) => a == b2, "=="),
  "!=": /* @__PURE__ */ __name((a, b2) => a != b2, "!="),
  ">": /* @__PURE__ */ __name((a, b2) => a > b2, ">"),
  ">=": /* @__PURE__ */ __name((a, b2) => a >= b2, ">="),
  "<": /* @__PURE__ */ __name((a, b2) => a < b2, "<"),
  "<=": /* @__PURE__ */ __name((a, b2) => a <= b2, "<="),
  "??": /* @__PURE__ */ __name((a, b2) => a != null ? a : b2, "??"),
  "|": /* @__PURE__ */ __name((a, b2) => {
    var _a3;
    return (_a3 = pipeModifiers[b2]) == null ? void 0 : _a3.call(pipeModifiers, a);
  }, "|")
};
function tokenizeExpression(expr) {
  return tokenize(expr, {
    boolean: /true|false/,
    number: /-?\d+\.?\d*/,
    string: /(["'])((?:\\.|[^\\])*?)\1/,
    operator: /[!=><][=!]?|\?\?|\|/,
    ws: /\s+/,
    param: /[$a-z_][$\w]*/i
  }).filter(({ type }) => type !== "ws");
}
__name(tokenizeExpression, "tokenizeExpression");
function evaluateExpression(expr, state = {}) {
  var _a3, _b2, _c2, _d2, _e3, _f2, _g2;
  const tokens = tokenizeExpression(expr);
  if (tokens.length === 0 || tokens.some(({ type }) => !type)) {
    return invalidExpression(expr);
  }
  if (((_a3 = tokens[0]) == null ? void 0 : _a3.token) === ">") {
    const partial = state[(_b2 = tokens[1]) == null ? void 0 : _b2.token];
    if (!partial) {
      return invalidExpression(expr);
    }
    const partialState = { ...state };
    partial.state = partialState;
    const args = tokens.slice(2);
    for (let i2 = 0; i2 < args.length; i2 += 3) {
      const name = (_c2 = args[i2]) == null ? void 0 : _c2.token;
      const operator = (_d2 = args[i2 + 1]) == null ? void 0 : _d2.token;
      const value = (_e3 = args[i2 + 2]) == null ? void 0 : _e3.token;
      if (name && operator === "=") {
        partialState[name] = getParamValue(value, state);
      }
    }
    return partial;
  }
  if (tokens.length === 1) {
    if (!isValidParam(tokens[0])) {
      return invalidExpression(expr);
    }
    return getParamValue(tokens[0].token, state);
  }
  if (tokens.length === 2) {
    const operator = (_f2 = tokens[0]) == null ? void 0 : _f2.token;
    const run = operators[operator];
    if (!run || !isValidParam(tokens[1])) {
      return invalidExpression(expr);
    }
    const a = getParamValue(tokens[1].token, state);
    return run(a);
  }
  if (tokens.length === 3) {
    const operator = (_g2 = tokens[1]) == null ? void 0 : _g2.token;
    const run = operators[operator];
    if (!run || !isValidParam(tokens[0]) || !isValidParam(tokens[2])) {
      return invalidExpression(expr);
    }
    const a = getParamValue(tokens[0].token, state);
    if (operator === "|") {
      return run(a, tokens[2].token);
    }
    const b2 = getParamValue(tokens[2].token, state);
    return run(a, b2);
  }
}
__name(evaluateExpression, "evaluateExpression");
function invalidExpression(expr) {
  console.warn(`Warning: invalid expression \`${expr}\``);
  return false;
}
__name(invalidExpression, "invalidExpression");
function isValidParam({ type }) {
  return ["number", "boolean", "string", "param"].includes(type);
}
__name(isValidParam, "isValidParam");
function getParamValue(raw, state) {
  const firstChar = raw[0];
  const lastChar = raw.slice(-1);
  if (raw === "true" || raw === "false") {
    return raw === "true";
  }
  if (firstChar === lastChar && [`'`, `"`].includes(firstChar)) {
    return raw.slice(1, -1);
  }
  if (isNumericString(raw)) {
    return parseFloat(raw);
  }
  return state[raw];
}
__name(getParamValue, "getParamValue");
function tokenize(str, parsers) {
  let len, match, token;
  const tokens = [];
  while (str) {
    token = null;
    len = str.length;
    for (const key in parsers) {
      match = parsers[key].exec(str);
      if (match && match.index < len) {
        token = {
          token: match[0],
          type: key,
          matches: match.slice(1)
        };
        len = match.index;
      }
    }
    if (len) {
      tokens.push({
        token: str.substr(0, len),
        type: void 0
      });
    }
    if (token) {
      tokens.push(token);
    }
    str = str.substr(len + (token ? token.token.length : 0));
  }
  return tokens;
}
__name(tokenize, "tokenize");
var __accessCheck$7 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$7");
var __privateGet$7 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$7(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$7");
var __privateAdd$7 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$7");
var __privateSet$6 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$7(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$6");
var __privateMethod$7 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$7(obj, member, "access private method");
  return method;
}, "__privateMethod$7");
var _template, _prevTemplate, _prevTemplateId, _upgradeProperty, upgradeProperty_fn, _updateTemplate, updateTemplate_fn;
const observedMediaAttributes = {
  mediatargetlivewindow: "targetlivewindow",
  mediastreamtype: "streamtype"
};
const prependTemplate = Document$1.createElement("template");
prependTemplate.innerHTML = /*html*/
`
  <style>
    :host {
      display: inline-block;
      line-height: 0;
    }

    media-controller {
      width: 100%;
      height: 100%;
    }

    media-captions-button:not([mediasubtitleslist]),
    media-captions-menu:not([mediasubtitleslist]),
    media-captions-menu-button:not([mediasubtitleslist]),
    media-audio-track-menu[mediaaudiotrackunavailable],
    media-audio-track-menu-button[mediaaudiotrackunavailable],
    media-rendition-menu[mediarenditionunavailable],
    media-rendition-menu-button[mediarenditionunavailable],
    media-volume-range[mediavolumeunavailable],
    media-airplay-button[mediaairplayunavailable],
    media-fullscreen-button[mediafullscreenunavailable],
    media-cast-button[mediacastunavailable],
    media-pip-button[mediapipunavailable] {
      display: none;
    }
  </style>
`;
const _MediaThemeElement = class _MediaThemeElement extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$7(this, _upgradeProperty);
    __privateAdd$7(this, _updateTemplate);
    __privateAdd$7(this, _template, void 0);
    __privateAdd$7(this, _prevTemplate, void 0);
    __privateAdd$7(this, _prevTemplateId, void 0);
    if (this.shadowRoot) {
      this.renderRoot = this.shadowRoot;
    } else {
      this.renderRoot = this.attachShadow({ mode: "open" });
      this.createRenderer();
    }
    const observer2 = new MutationObserver((mutationList) => {
      var _a3;
      if (this.mediaController && !((_a3 = this.mediaController) == null ? void 0 : _a3.breakpointsComputed))
        return;
      if (mutationList.some((mutation) => {
        const target = mutation.target;
        if (target === this)
          return true;
        if (target.localName !== "media-controller")
          return false;
        if (observedMediaAttributes[mutation.attributeName])
          return true;
        if (mutation.attributeName.startsWith("breakpoint"))
          return true;
        return false;
      })) {
        this.render();
      }
    });
    observer2.observe(this, { attributes: true });
    observer2.observe(this.renderRoot, {
      attributes: true,
      subtree: true
    });
    this.addEventListener(
      MediaStateChangeEvents.BREAKPOINTS_COMPUTED,
      this.render
    );
    __privateMethod$7(this, _upgradeProperty, upgradeProperty_fn).call(this, "template");
  }
  /** @type {HTMLElement & { breakpointsComputed?: boolean }} */
  get mediaController() {
    return this.renderRoot.querySelector("media-controller");
  }
  get template() {
    var _a3;
    return (_a3 = __privateGet$7(this, _template)) != null ? _a3 : this.constructor.template;
  }
  set template(value) {
    if (value === null) {
      this.removeAttribute("template");
      return;
    }
    if (typeof value === "string") {
      this.setAttribute("template", value);
    } else if (value instanceof HTMLTemplateElement) {
      __privateSet$6(this, _template, value);
      __privateSet$6(this, _prevTemplateId, null);
      this.createRenderer();
    }
  }
  get props() {
    var _a3, _b2, _c2;
    const observedAttributes2 = [
      ...Array.from((_b2 = (_a3 = this.mediaController) == null ? void 0 : _a3.attributes) != null ? _b2 : []).filter(
        ({ name }) => {
          return observedMediaAttributes[name] || name.startsWith("breakpoint");
        }
      ),
      ...Array.from(this.attributes)
    ];
    const props = {};
    for (const attr of observedAttributes2) {
      const name = (_c2 = observedMediaAttributes[attr.name]) != null ? _c2 : camelCase(attr.name);
      let { value } = attr;
      if (value != null) {
        if (isNumericString(value)) {
          value = parseFloat(value);
        }
        props[name] = value === "" ? true : value;
      } else {
        props[name] = false;
      }
    }
    return props;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === "template" && oldValue != newValue) {
      __privateMethod$7(this, _updateTemplate, updateTemplate_fn).call(this);
    }
  }
  connectedCallback() {
    __privateMethod$7(this, _updateTemplate, updateTemplate_fn).call(this);
  }
  createRenderer() {
    if (this.template instanceof HTMLTemplateElement && this.template !== __privateGet$7(this, _prevTemplate)) {
      __privateSet$6(this, _prevTemplate, this.template);
      this.renderer = new TemplateInstance(
        this.template,
        this.props,
        // @ts-ignore
        this.constructor.processor
      );
      this.renderRoot.textContent = "";
      this.renderRoot.append(
        prependTemplate.content.cloneNode(true),
        this.renderer
      );
    }
  }
  render() {
    var _a3;
    (_a3 = this.renderer) == null ? void 0 : _a3.update(this.props);
  }
};
__name(_MediaThemeElement, "MediaThemeElement");
let MediaThemeElement = _MediaThemeElement;
_template = /* @__PURE__ */ new WeakMap();
_prevTemplate = /* @__PURE__ */ new WeakMap();
_prevTemplateId = /* @__PURE__ */ new WeakMap();
_upgradeProperty = /* @__PURE__ */ new WeakSet();
upgradeProperty_fn = /* @__PURE__ */ __name(function(prop) {
  if (Object.prototype.hasOwnProperty.call(this, prop)) {
    const value = this[prop];
    delete this[prop];
    this[prop] = value;
  }
}, "upgradeProperty_fn");
_updateTemplate = /* @__PURE__ */ new WeakSet();
updateTemplate_fn = /* @__PURE__ */ __name(function() {
  var _a3;
  const templateId = this.getAttribute("template");
  if (!templateId || templateId === __privateGet$7(this, _prevTemplateId))
    return;
  const rootNode = this.getRootNode();
  const template = (_a3 = rootNode == null ? void 0 : rootNode.getElementById) == null ? void 0 : _a3.call(
    rootNode,
    templateId
  );
  if (template) {
    __privateSet$6(this, _prevTemplateId, templateId);
    __privateSet$6(this, _template, template);
    this.createRenderer();
    return;
  }
  if (isValidUrl(templateId)) {
    __privateSet$6(this, _prevTemplateId, templateId);
    request(templateId).then((data) => {
      const template2 = Document$1.createElement("template");
      template2.innerHTML = data;
      __privateSet$6(this, _template, template2);
      this.createRenderer();
    }).catch(console.error);
  }
}, "updateTemplate_fn");
MediaThemeElement.observedAttributes = ["template"];
MediaThemeElement.processor = processor;
function isValidUrl(url) {
  if (!/^(\/|\.\/|https?:\/\/)/.test(url))
    return false;
  const base = /^https?:\/\//.test(url) ? void 0 : location.origin;
  try {
    new URL(url, base);
  } catch (e2) {
    return false;
  }
  return true;
}
__name(isValidUrl, "isValidUrl");
async function request(resource) {
  const response = await fetch(resource);
  if (response.status !== 200) {
    throw new Error(
      `Failed to load resource: the server responded with a status of ${response.status}`
    );
  }
  return response.text();
}
__name(request, "request");
if (!GlobalThis.customElements.get("media-theme")) {
  GlobalThis.customElements.define("media-theme", MediaThemeElement);
}
function computePosition({
  anchor,
  floating,
  placement
}) {
  const rects = getElementRects({ anchor, floating });
  const { x: x2, y: y2 } = computeCoordsFromPlacement(rects, placement);
  return { x: x2, y: y2 };
}
__name(computePosition, "computePosition");
function getElementRects({
  anchor,
  floating
}) {
  return {
    anchor: getRectRelativeToOffsetParent(anchor, floating.offsetParent),
    floating: {
      x: 0,
      y: 0,
      width: floating.offsetWidth,
      height: floating.offsetHeight
    }
  };
}
__name(getElementRects, "getElementRects");
function getRectRelativeToOffsetParent(element, offsetParent) {
  var _a3;
  const rect = element.getBoundingClientRect();
  const offsetRect = (_a3 = offsetParent == null ? void 0 : offsetParent.getBoundingClientRect()) != null ? _a3 : { x: 0, y: 0 };
  return {
    x: rect.x - offsetRect.x,
    y: rect.y - offsetRect.y,
    width: rect.width,
    height: rect.height
  };
}
__name(getRectRelativeToOffsetParent, "getRectRelativeToOffsetParent");
function computeCoordsFromPlacement({ anchor, floating }, placement) {
  const alignmentAxis = getSideAxis(placement) === "x" ? "y" : "x";
  const alignLength = alignmentAxis === "y" ? "height" : "width";
  const side = getSide(placement);
  const commonX = anchor.x + anchor.width / 2 - floating.width / 2;
  const commonY = anchor.y + anchor.height / 2 - floating.height / 2;
  const commonAlign = anchor[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = { x: commonX, y: anchor.y - floating.height };
      break;
    case "bottom":
      coords = { x: commonX, y: anchor.y + anchor.height };
      break;
    case "right":
      coords = { x: anchor.x + anchor.width, y: commonY };
      break;
    case "left":
      coords = { x: anchor.x - floating.width, y: commonY };
      break;
    default:
      coords = { x: anchor.x, y: anchor.y };
  }
  switch (placement.split("-")[1]) {
    case "start":
      coords[alignmentAxis] -= commonAlign;
      break;
    case "end":
      coords[alignmentAxis] += commonAlign;
      break;
  }
  return coords;
}
__name(computeCoordsFromPlacement, "computeCoordsFromPlacement");
function getSide(placement) {
  return placement.split("-")[0];
}
__name(getSide, "getSide");
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
__name(getSideAxis, "getSideAxis");
const _InvokeEvent = class _InvokeEvent extends Event {
  /**
   * @param init - The event options.
   */
  constructor({ action = "auto", relatedTarget, ...options }) {
    super("invoke", options);
    this.action = action;
    this.relatedTarget = relatedTarget;
  }
};
__name(_InvokeEvent, "InvokeEvent");
let InvokeEvent = _InvokeEvent;
const _ToggleEvent = class _ToggleEvent extends Event {
  /**
   * @param init - The event options.
   */
  constructor({ newState, oldState, ...options }) {
    super("toggle", options);
    this.newState = newState;
    this.oldState = oldState;
  }
};
__name(_ToggleEvent, "ToggleEvent");
let ToggleEvent = _ToggleEvent;
var __accessCheck$6 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$6");
var __privateGet$6 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$6(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$6");
var __privateAdd$6 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$6");
var __privateSet$5 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$6(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$5");
var __privateMethod$6 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$6(obj, member, "access private method");
  return method;
}, "__privateMethod$6");
var _mediaController, _previouslyFocused, _invokerElement, _previousItems, _mutationObserver, _isPopover, _cssRule, _handleSlotChange$1, handleSlotChange_fn$1, _toggleHeader, toggleHeader_fn, _handleMenuItems, _updateLayoutStyle, updateLayoutStyle_fn, _handleInvoke, handleInvoke_fn, _handleOpen, handleOpen_fn, _handleClosed, handleClosed_fn, _handleBoundsResize, _handleMenuResize, _positionMenu, positionMenu_fn, _resizeMenu, resizeMenu_fn, _handleClick, handleClick_fn, _backButtonElement, backButtonElement_get, _handleToggle, handleToggle_fn, _checkSubmenuHasExpanded, checkSubmenuHasExpanded_fn, _handleFocusOut, handleFocusOut_fn, _handleKeyDown$1, handleKeyDown_fn$1, _getItem, getItem_fn, _getTabItem, getTabItem_fn, _setTabItem, setTabItem_fn, _selectItem, selectItem_fn;
function createMenuItem({
  type,
  text,
  value,
  checked
}) {
  const item = Document$1.createElement(
    "media-chrome-menu-item"
  );
  item.type = type;
  item.part.add("menu-item");
  item.part.add(type);
  item.value = value;
  item.checked = checked;
  const label = Document$1.createElement("span");
  label.textContent = text;
  item.append(label);
  return item;
}
__name(createMenuItem, "createMenuItem");
function createIndicator(el, name) {
  let customIndicator = el.querySelector(`:scope > [slot="${name}"]`);
  if ((customIndicator == null ? void 0 : customIndicator.nodeName) == "SLOT")
    customIndicator = customIndicator.assignedElements({ flatten: true })[0];
  if (customIndicator) {
    customIndicator = customIndicator.cloneNode(true);
    return customIndicator;
  }
  const fallbackIndicator = el.shadowRoot.querySelector(
    `[name="${name}"] > svg`
  );
  if (fallbackIndicator) {
    return fallbackIndicator.cloneNode(true);
  }
  return "";
}
__name(createIndicator, "createIndicator");
function getTemplateHTML$6(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        font: var(--media-font,
          var(--media-font-weight, normal)
          var(--media-font-size, 14px) /
          var(--media-text-content-height, var(--media-control-height, 24px))
          var(--media-font-family, helvetica neue, segoe ui, roboto, arial, sans-serif));
        color: var(--media-text-color, var(--media-primary-color, rgb(238 238 238)));
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-menu-background, var(--media-control-background, var(--media-secondary-color, var(--_menu-bg))));
        border-radius: var(--media-menu-border-radius);
        border: var(--media-menu-border, none);
        display: var(--media-menu-display, inline-flex) !important;
        ${/* ^^Prevent override by Tailwind CSS causing the menu to not hide properly. */
    ""}
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        ${/* ^^Prevent transition override by media-container */
    ""}
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        ${/* Prevent overflowing a flex container */
    ""}
        min-height: 0;
        position: relative;
        bottom: var(--_menu-bottom);
        box-sizing: border-box;
      } 

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([hidden]) {
        transition: var(--media-menu-transition-out,
          visibility .15s ease-in,
          opacity .15s ease-in,
          transform .15s ease-in
        ) !important;
        visibility: var(--media-menu-hidden-visibility, hidden);
        opacity: var(--media-menu-hidden-opacity, 0);
        max-height: var(--media-menu-hidden-max-height,
          var(--media-menu-max-height, var(--_menu-max-height, 300px)));
        transform: var(--media-menu-transform-out, translateY(2px) scale(.99));
        pointer-events: none;
      }

      :host([slot="submenu"]) {
        background: none;
        width: 100%;
        min-height: 100%;
        position: absolute;
        bottom: 0;
        right: -100%;
      }

      #container {
        display: flex;
        flex-direction: column;
        min-height: 0;
        transition: transform .2s ease-out;
        transform: translate(0, 0);
      }

      #container.has-expanded {
        transition: transform .2s ease-in;
        transform: translate(-100%, 0);
      }

      button {
        background: none;
        color: inherit;
        border: none;
        padding: 0;
        font: inherit;
        outline: inherit;
        display: inline-flex;
        align-items: center;
      }

      slot[name="header"][hidden] {
        display: none;
      }

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .7em;
        border-bottom: 1px solid rgb(255 255 255 / .25);
        cursor: var(--media-cursor, default);
      }

      slot[name="header"] > button[part~="back"],
      slot[name="header"]::slotted(button[part~="back"]) {
        cursor: var(--media-cursor, pointer);
      }

      svg[part~="back"] {
        height: var(--media-menu-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
        margin-right: .5ch;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap);
        flex-direction: var(--media-menu-flex-direction, column);
        overflow: var(--media-menu-overflow, hidden auto);
        display: flex;
        min-height: 0;
      }

      :host([role="menu"]) slot:not([name]) {
        padding-block: .4em;
      }

      slot:not([name])::slotted([role="menu"]) {
        background: none;
      }

      media-chrome-menu-item > span {
        margin-right: .5ch;
        max-width: var(--media-menu-item-max-width);
        text-overflow: ellipsis;
        overflow: hidden;
      }
    </style>
    <style id="layout-row" media="width:0">

      slot[name="header"] > *,
      slot[name="header"]::slotted(*) {
        padding: .4em .5em;
      }

      slot:not([name]) {
        gap: var(--media-menu-gap, .25em);
        flex-direction: var(--media-menu-flex-direction, row);
        padding-inline: .5em;
      }

      media-chrome-menu-item {
        padding: .3em .5em;
      }

      media-chrome-menu-item[aria-checked="true"] {
        background: var(--media-menu-item-checked-background, rgb(255 255 255 / .2));
      }

      ${/* In row layout hide the checked indicator completely. */
    ""}
      media-chrome-menu-item::part(checked-indicator) {
        display: var(--media-menu-item-checked-indicator-display, none);
      }
    </style>
    <div id="container" part="container">
      <slot name="header" hidden>
        <button part="back button" aria-label="Back to previous menu">
          <slot name="back-icon">
            <svg aria-hidden="true" viewBox="0 0 20 24" part="back indicator">
              <path d="m11.88 17.585.742-.669-4.2-4.665 4.2-4.666-.743-.669-4.803 5.335 4.803 5.334Z"/>
            </svg>
          </slot>
          <slot name="title"></slot>
        </button>
      </slot>
      <slot></slot>
    </div>
    <slot name="checked-indicator" hidden></slot>
  `
  );
}
__name(getTemplateHTML$6, "getTemplateHTML$6");
const Attributes$2 = {
  STYLE: "style",
  HIDDEN: "hidden",
  DISABLED: "disabled",
  ANCHOR: "anchor"
};
const _MediaChromeMenu = class _MediaChromeMenu extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$6(this, _handleSlotChange$1);
    __privateAdd$6(this, _toggleHeader);
    __privateAdd$6(this, _updateLayoutStyle);
    __privateAdd$6(this, _handleInvoke);
    __privateAdd$6(this, _handleOpen);
    __privateAdd$6(this, _handleClosed);
    __privateAdd$6(this, _positionMenu);
    __privateAdd$6(this, _resizeMenu);
    __privateAdd$6(this, _handleClick);
    __privateAdd$6(this, _backButtonElement);
    __privateAdd$6(this, _handleToggle);
    __privateAdd$6(this, _checkSubmenuHasExpanded);
    __privateAdd$6(this, _handleFocusOut);
    __privateAdd$6(this, _handleKeyDown$1);
    __privateAdd$6(this, _getItem);
    __privateAdd$6(this, _getTabItem);
    __privateAdd$6(this, _setTabItem);
    __privateAdd$6(this, _selectItem);
    __privateAdd$6(this, _mediaController, null);
    __privateAdd$6(this, _previouslyFocused, null);
    __privateAdd$6(this, _invokerElement, null);
    __privateAdd$6(this, _previousItems, /* @__PURE__ */ new Set());
    __privateAdd$6(this, _mutationObserver, void 0);
    __privateAdd$6(this, _isPopover, false);
    __privateAdd$6(this, _cssRule, null);
    __privateAdd$6(this, _handleMenuItems, () => {
      const previousItems = __privateGet$6(this, _previousItems);
      const currentItems = new Set(this.items);
      for (const item of previousItems) {
        if (!currentItems.has(item)) {
          this.dispatchEvent(new CustomEvent("removemenuitem", { detail: item }));
        }
      }
      for (const item of currentItems) {
        if (!previousItems.has(item)) {
          this.dispatchEvent(new CustomEvent("addmenuitem", { detail: item }));
        }
      }
      __privateSet$5(this, _previousItems, currentItems);
    });
    __privateAdd$6(this, _handleBoundsResize, () => {
      __privateMethod$6(this, _positionMenu, positionMenu_fn).call(this);
      __privateMethod$6(this, _resizeMenu, resizeMenu_fn).call(this, false);
    });
    __privateAdd$6(this, _handleMenuResize, () => {
      __privateMethod$6(this, _positionMenu, positionMenu_fn).call(this);
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
    this.container = this.shadowRoot.querySelector("#container");
    this.defaultSlot = this.shadowRoot.querySelector(
      "slot:not([name])"
    );
    this.shadowRoot.addEventListener("slotchange", this);
    __privateSet$5(this, _mutationObserver, new MutationObserver(__privateGet$6(this, _handleMenuItems)));
    __privateGet$6(this, _mutationObserver).observe(this.defaultSlot, { childList: true });
  }
  static get observedAttributes() {
    return [
      Attributes$2.DISABLED,
      Attributes$2.HIDDEN,
      Attributes$2.STYLE,
      Attributes$2.ANCHOR,
      MediaStateReceiverAttributes.MEDIA_CONTROLLER
    ];
  }
  static formatMenuItemText(text, _data) {
    return text;
  }
  enable() {
    this.addEventListener("click", this);
    this.addEventListener("focusout", this);
    this.addEventListener("keydown", this);
    this.addEventListener("invoke", this);
    this.addEventListener("toggle", this);
  }
  disable() {
    this.removeEventListener("click", this);
    this.removeEventListener("focusout", this);
    this.removeEventListener("keyup", this);
    this.removeEventListener("invoke", this);
    this.removeEventListener("toggle", this);
  }
  handleEvent(event) {
    switch (event.type) {
      case "slotchange":
        __privateMethod$6(this, _handleSlotChange$1, handleSlotChange_fn$1).call(this, event);
        break;
      case "invoke":
        __privateMethod$6(this, _handleInvoke, handleInvoke_fn).call(this, event);
        break;
      case "click":
        __privateMethod$6(this, _handleClick, handleClick_fn).call(this, event);
        break;
      case "toggle":
        __privateMethod$6(this, _handleToggle, handleToggle_fn).call(this, event);
        break;
      case "focusout":
        __privateMethod$6(this, _handleFocusOut, handleFocusOut_fn).call(this, event);
        break;
      case "keydown":
        __privateMethod$6(this, _handleKeyDown$1, handleKeyDown_fn$1).call(this, event);
        break;
    }
  }
  connectedCallback() {
    var _a3, _b2;
    __privateSet$5(this, _cssRule, insertCSSRule(this.shadowRoot, ":host"));
    __privateMethod$6(this, _updateLayoutStyle, updateLayoutStyle_fn).call(this);
    if (!this.hasAttribute("disabled")) {
      this.enable();
    }
    if (!this.role) {
      this.role = "menu";
    }
    __privateSet$5(this, _mediaController, getAttributeMediaController(this));
    (_b2 = (_a3 = __privateGet$6(this, _mediaController)) == null ? void 0 : _a3.associateElement) == null ? void 0 : _b2.call(_a3, this);
    if (!this.hidden) {
      observeResize(getBoundsElement(this), __privateGet$6(this, _handleBoundsResize));
      observeResize(this, __privateGet$6(this, _handleMenuResize));
    }
    __privateMethod$6(this, _toggleHeader, toggleHeader_fn).call(this);
  }
  disconnectedCallback() {
    var _a3, _b2;
    unobserveResize(getBoundsElement(this), __privateGet$6(this, _handleBoundsResize));
    unobserveResize(this, __privateGet$6(this, _handleMenuResize));
    this.disable();
    (_b2 = (_a3 = __privateGet$6(this, _mediaController)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
    __privateSet$5(this, _mediaController, null);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    var _a3, _b2, _c2, _d2;
    if (attrName === Attributes$2.HIDDEN && newValue !== oldValue) {
      if (!__privateGet$6(this, _isPopover))
        __privateSet$5(this, _isPopover, true);
      if (this.hidden) {
        __privateMethod$6(this, _handleClosed, handleClosed_fn).call(this);
      } else {
        __privateMethod$6(this, _handleOpen, handleOpen_fn).call(this);
      }
      this.dispatchEvent(
        new ToggleEvent({
          oldState: this.hidden ? "open" : "closed",
          newState: this.hidden ? "closed" : "open",
          bubbles: true
        })
      );
    } else if (attrName === MediaStateReceiverAttributes.MEDIA_CONTROLLER) {
      if (oldValue) {
        (_b2 = (_a3 = __privateGet$6(this, _mediaController)) == null ? void 0 : _a3.unassociateElement) == null ? void 0 : _b2.call(_a3, this);
        __privateSet$5(this, _mediaController, null);
      }
      if (newValue && this.isConnected) {
        __privateSet$5(this, _mediaController, getAttributeMediaController(this));
        (_d2 = (_c2 = __privateGet$6(this, _mediaController)) == null ? void 0 : _c2.associateElement) == null ? void 0 : _d2.call(_c2, this);
      }
    } else if (attrName === Attributes$2.DISABLED && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    } else if (attrName === Attributes$2.STYLE && newValue !== oldValue) {
      __privateMethod$6(this, _updateLayoutStyle, updateLayoutStyle_fn).call(this);
    }
  }
  formatMenuItemText(text, data) {
    return this.constructor.formatMenuItemText(
      text,
      data
    );
  }
  get anchor() {
    return this.getAttribute("anchor");
  }
  set anchor(value) {
    this.setAttribute("anchor", `${value}`);
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    var _a3;
    if (this.anchor) {
      return (_a3 = getDocumentOrShadowRoot(this)) == null ? void 0 : _a3.querySelector(
        `#${this.anchor}`
      );
    }
    return null;
  }
  /**
   * Returns the menu items.
   */
  get items() {
    return this.defaultSlot.assignedElements({ flatten: true }).filter(isMenuItem);
  }
  get radioGroupItems() {
    return this.items.filter((item) => item.role === "menuitemradio");
  }
  get checkedItems() {
    return this.items.filter((item) => item.checked);
  }
  get value() {
    var _a3, _b2;
    return (_b2 = (_a3 = this.checkedItems[0]) == null ? void 0 : _a3.value) != null ? _b2 : "";
  }
  set value(newValue) {
    const item = this.items.find((item2) => item2.value === newValue);
    if (!item)
      return;
    __privateMethod$6(this, _selectItem, selectItem_fn).call(this, item);
  }
  focus() {
    __privateSet$5(this, _previouslyFocused, getActiveElement());
    if (this.items.length) {
      __privateMethod$6(this, _setTabItem, setTabItem_fn).call(this, this.items[0]);
      this.items[0].focus();
      return;
    }
    const focusable = this.querySelector(
      '[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]'
    );
    focusable == null ? void 0 : focusable.focus();
  }
  handleSelect(event) {
    var _a3;
    const item = __privateMethod$6(this, _getItem, getItem_fn).call(this, event);
    if (!item)
      return;
    __privateMethod$6(this, _selectItem, selectItem_fn).call(this, item, item.type === "checkbox");
    if (__privateGet$6(this, _invokerElement) && !this.hidden) {
      (_a3 = __privateGet$6(this, _previouslyFocused)) == null ? void 0 : _a3.focus();
      this.hidden = true;
    }
  }
  get keysUsed() {
    return [
      "Enter",
      "Escape",
      "Tab",
      " ",
      "ArrowDown",
      "ArrowUp",
      "Home",
      "End"
    ];
  }
  handleMove(event) {
    var _a3, _b2;
    const { key } = event;
    const items = this.items;
    const currentItem = (_b2 = (_a3 = __privateMethod$6(this, _getItem, getItem_fn).call(this, event)) != null ? _a3 : __privateMethod$6(this, _getTabItem, getTabItem_fn).call(this)) != null ? _b2 : items[0];
    const currentIndex = items.indexOf(currentItem);
    let index = Math.max(0, currentIndex);
    if (key === "ArrowDown") {
      index++;
    } else if (key === "ArrowUp") {
      index--;
    } else if (event.key === "Home") {
      index = 0;
    } else if (event.key === "End") {
      index = items.length - 1;
    }
    if (index < 0) {
      index = items.length - 1;
    }
    if (index > items.length - 1) {
      index = 0;
    }
    __privateMethod$6(this, _setTabItem, setTabItem_fn).call(this, items[index]);
    items[index].focus();
  }
};
__name(_MediaChromeMenu, "MediaChromeMenu");
let MediaChromeMenu = _MediaChromeMenu;
_mediaController = /* @__PURE__ */ new WeakMap();
_previouslyFocused = /* @__PURE__ */ new WeakMap();
_invokerElement = /* @__PURE__ */ new WeakMap();
_previousItems = /* @__PURE__ */ new WeakMap();
_mutationObserver = /* @__PURE__ */ new WeakMap();
_isPopover = /* @__PURE__ */ new WeakMap();
_cssRule = /* @__PURE__ */ new WeakMap();
_handleSlotChange$1 = /* @__PURE__ */ new WeakSet();
handleSlotChange_fn$1 = /* @__PURE__ */ __name(function(event) {
  const slot = event.target;
  for (const node of slot.assignedNodes({ flatten: true })) {
    if (node.nodeType === 3 && node.textContent.trim() === "") {
      node.remove();
    }
  }
  if (["header", "title"].includes(slot.name)) {
    __privateMethod$6(this, _toggleHeader, toggleHeader_fn).call(this);
  }
  if (!slot.name) {
    __privateGet$6(this, _handleMenuItems).call(this);
  }
}, "handleSlotChange_fn$1");
_toggleHeader = /* @__PURE__ */ new WeakSet();
toggleHeader_fn = /* @__PURE__ */ __name(function() {
  const header = this.shadowRoot.querySelector(
    'slot[name="header"]'
  );
  const title = this.shadowRoot.querySelector(
    'slot[name="title"]'
  );
  header.hidden = title.assignedNodes().length === 0 && header.assignedNodes().length === 0;
}, "toggleHeader_fn");
_handleMenuItems = /* @__PURE__ */ new WeakMap();
_updateLayoutStyle = /* @__PURE__ */ new WeakSet();
updateLayoutStyle_fn = /* @__PURE__ */ __name(function() {
  var _a3;
  const layoutRowStyle = this.shadowRoot.querySelector("#layout-row");
  const menuLayout = (_a3 = getComputedStyle(this).getPropertyValue("--media-menu-layout")) == null ? void 0 : _a3.trim();
  layoutRowStyle.setAttribute("media", menuLayout === "row" ? "" : "width:0");
}, "updateLayoutStyle_fn");
_handleInvoke = /* @__PURE__ */ new WeakSet();
handleInvoke_fn = /* @__PURE__ */ __name(function(event) {
  __privateSet$5(this, _invokerElement, event.relatedTarget);
  if (!containsComposedNode(this, event.relatedTarget)) {
    this.hidden = !this.hidden;
  }
}, "handleInvoke_fn");
_handleOpen = /* @__PURE__ */ new WeakSet();
handleOpen_fn = /* @__PURE__ */ __name(function() {
  var _a3;
  (_a3 = __privateGet$6(this, _invokerElement)) == null ? void 0 : _a3.setAttribute("aria-expanded", "true");
  this.addEventListener("transitionend", () => this.focus(), { once: true });
  observeResize(getBoundsElement(this), __privateGet$6(this, _handleBoundsResize));
  observeResize(this, __privateGet$6(this, _handleMenuResize));
}, "handleOpen_fn");
_handleClosed = /* @__PURE__ */ new WeakSet();
handleClosed_fn = /* @__PURE__ */ __name(function() {
  var _a3;
  (_a3 = __privateGet$6(this, _invokerElement)) == null ? void 0 : _a3.setAttribute("aria-expanded", "false");
  unobserveResize(getBoundsElement(this), __privateGet$6(this, _handleBoundsResize));
  unobserveResize(this, __privateGet$6(this, _handleMenuResize));
}, "handleClosed_fn");
_handleBoundsResize = /* @__PURE__ */ new WeakMap();
_handleMenuResize = /* @__PURE__ */ new WeakMap();
_positionMenu = /* @__PURE__ */ new WeakSet();
positionMenu_fn = /* @__PURE__ */ __name(function(menuWidth) {
  if (this.hasAttribute("mediacontroller") && !this.anchor)
    return;
  if (this.hidden || !this.anchorElement)
    return;
  const { x: x2, y: y2 } = computePosition({
    anchor: this.anchorElement,
    floating: this,
    placement: "top-start"
  });
  menuWidth != null ? menuWidth : menuWidth = this.offsetWidth;
  const bounds = getBoundsElement(this);
  const boundsRect = bounds.getBoundingClientRect();
  const right = boundsRect.width - x2 - menuWidth;
  const bottom = boundsRect.height - y2 - this.offsetHeight;
  const { style } = __privateGet$6(this, _cssRule);
  style.setProperty("position", "absolute");
  style.setProperty("right", `${Math.max(0, right)}px`);
  style.setProperty("--_menu-bottom", `${bottom}px`);
  const computedStyle = getComputedStyle(this);
  const isBottomCalc = style.getPropertyValue("--_menu-bottom") === computedStyle.bottom;
  const realBottom = isBottomCalc ? bottom : parseFloat(computedStyle.bottom);
  const maxHeight = boundsRect.height - realBottom - parseFloat(computedStyle.marginBottom);
  this.style.setProperty("--_menu-max-height", `${maxHeight}px`);
}, "positionMenu_fn");
_resizeMenu = /* @__PURE__ */ new WeakSet();
resizeMenu_fn = /* @__PURE__ */ __name(function(animate) {
  const expandedMenuItem = this.querySelector(
    '[role="menuitem"][aria-haspopup][aria-expanded="true"]'
  );
  const expandedSubmenu = expandedMenuItem == null ? void 0 : expandedMenuItem.querySelector(
    '[role="menu"]'
  );
  const { style } = __privateGet$6(this, _cssRule);
  if (!animate) {
    style.setProperty("--media-menu-transition-in", "none");
  }
  if (expandedSubmenu) {
    const height = expandedSubmenu.offsetHeight;
    const width = Math.max(
      expandedSubmenu.offsetWidth,
      expandedMenuItem.offsetWidth
    );
    this.style.setProperty("min-width", `${width}px`);
    this.style.setProperty("min-height", `${height}px`);
    __privateMethod$6(this, _positionMenu, positionMenu_fn).call(this, width);
  } else {
    this.style.removeProperty("min-width");
    this.style.removeProperty("min-height");
    __privateMethod$6(this, _positionMenu, positionMenu_fn).call(this);
  }
  style.removeProperty("--media-menu-transition-in");
}, "resizeMenu_fn");
_handleClick = /* @__PURE__ */ new WeakSet();
handleClick_fn = /* @__PURE__ */ __name(function(event) {
  var _a3;
  event.stopPropagation();
  if (event.composedPath().includes(__privateGet$6(this, _backButtonElement, backButtonElement_get))) {
    (_a3 = __privateGet$6(this, _previouslyFocused)) == null ? void 0 : _a3.focus();
    this.hidden = true;
    return;
  }
  const item = __privateMethod$6(this, _getItem, getItem_fn).call(this, event);
  if (!item || item.hasAttribute("disabled"))
    return;
  __privateMethod$6(this, _setTabItem, setTabItem_fn).call(this, item);
  this.handleSelect(event);
}, "handleClick_fn");
_backButtonElement = /* @__PURE__ */ new WeakSet();
backButtonElement_get = /* @__PURE__ */ __name(function() {
  var _a3;
  const headerSlot = this.shadowRoot.querySelector(
    'slot[name="header"]'
  );
  return (_a3 = headerSlot.assignedElements({ flatten: true })) == null ? void 0 : _a3.find((el) => el.matches('button[part~="back"]'));
}, "backButtonElement_get");
_handleToggle = /* @__PURE__ */ new WeakSet();
handleToggle_fn = /* @__PURE__ */ __name(function(event) {
  if (event.target === this)
    return;
  __privateMethod$6(this, _checkSubmenuHasExpanded, checkSubmenuHasExpanded_fn).call(this);
  const menuItemsWithSubmenu = Array.from(
    this.querySelectorAll('[role="menuitem"][aria-haspopup]')
  );
  for (const item of menuItemsWithSubmenu) {
    if (item.invokeTargetElement == event.target)
      continue;
    if (event.newState == "open" && item.getAttribute("aria-expanded") == "true" && !item.invokeTargetElement.hidden) {
      item.invokeTargetElement.dispatchEvent(
        new InvokeEvent({ relatedTarget: item })
      );
    }
  }
  for (const item of menuItemsWithSubmenu) {
    item.setAttribute("aria-expanded", `${!item.submenuElement.hidden}`);
  }
  __privateMethod$6(this, _resizeMenu, resizeMenu_fn).call(this, true);
}, "handleToggle_fn");
_checkSubmenuHasExpanded = /* @__PURE__ */ new WeakSet();
checkSubmenuHasExpanded_fn = /* @__PURE__ */ __name(function() {
  const selector = '[role="menuitem"] > [role="menu"]:not([hidden])';
  const expandedMenuItem = this.querySelector(selector);
  this.container.classList.toggle("has-expanded", !!expandedMenuItem);
}, "checkSubmenuHasExpanded_fn");
_handleFocusOut = /* @__PURE__ */ new WeakSet();
handleFocusOut_fn = /* @__PURE__ */ __name(function(event) {
  var _a3;
  if (!containsComposedNode(this, event.relatedTarget)) {
    if (__privateGet$6(this, _isPopover)) {
      (_a3 = __privateGet$6(this, _previouslyFocused)) == null ? void 0 : _a3.focus();
    }
    if (__privateGet$6(this, _invokerElement) && __privateGet$6(this, _invokerElement) !== event.relatedTarget && !this.hidden) {
      this.hidden = true;
    }
  }
}, "handleFocusOut_fn");
_handleKeyDown$1 = /* @__PURE__ */ new WeakSet();
handleKeyDown_fn$1 = /* @__PURE__ */ __name(function(event) {
  var _a3, _b2, _c2, _d2, _e3;
  const { key, ctrlKey, altKey, metaKey } = event;
  if (ctrlKey || altKey || metaKey) {
    return;
  }
  if (!this.keysUsed.includes(key)) {
    return;
  }
  event.preventDefault();
  event.stopPropagation();
  if (key === "Tab") {
    if (__privateGet$6(this, _isPopover)) {
      this.hidden = true;
      return;
    }
    if (event.shiftKey) {
      (_b2 = (_a3 = this.previousElementSibling) == null ? void 0 : _a3.focus) == null ? void 0 : _b2.call(_a3);
    } else {
      (_d2 = (_c2 = this.nextElementSibling) == null ? void 0 : _c2.focus) == null ? void 0 : _d2.call(_c2);
    }
    this.blur();
  } else if (key === "Escape") {
    (_e3 = __privateGet$6(this, _previouslyFocused)) == null ? void 0 : _e3.focus();
    if (__privateGet$6(this, _isPopover)) {
      this.hidden = true;
    }
  } else if (key === "Enter" || key === " ") {
    this.handleSelect(event);
  } else {
    this.handleMove(event);
  }
}, "handleKeyDown_fn$1");
_getItem = /* @__PURE__ */ new WeakSet();
getItem_fn = /* @__PURE__ */ __name(function(event) {
  return event.composedPath().find((el) => {
    return ["menuitemradio", "menuitemcheckbox"].includes(
      el.role
    );
  });
}, "getItem_fn");
_getTabItem = /* @__PURE__ */ new WeakSet();
getTabItem_fn = /* @__PURE__ */ __name(function() {
  return this.items.find((item) => item.tabIndex === 0);
}, "getTabItem_fn");
_setTabItem = /* @__PURE__ */ new WeakSet();
setTabItem_fn = /* @__PURE__ */ __name(function(tabItem) {
  for (const item of this.items) {
    item.tabIndex = item === tabItem ? 0 : -1;
  }
}, "setTabItem_fn");
_selectItem = /* @__PURE__ */ new WeakSet();
selectItem_fn = /* @__PURE__ */ __name(function(item, toggle) {
  const oldCheckedItems = [...this.checkedItems];
  if (item.type === "radio") {
    this.radioGroupItems.forEach((el) => el.checked = false);
  }
  if (toggle) {
    item.checked = !item.checked;
  } else {
    item.checked = true;
  }
  if (this.checkedItems.some((opt, i2) => opt != oldCheckedItems[i2])) {
    this.dispatchEvent(
      new Event("change", { bubbles: true, composed: true })
    );
  }
}, "selectItem_fn");
MediaChromeMenu.shadowRootOptions = { mode: "open" };
MediaChromeMenu.getTemplateHTML = getTemplateHTML$6;
function isMenuItem(element) {
  return ["menuitem", "menuitemradio", "menuitemcheckbox"].includes(
    element == null ? void 0 : element.role
  );
}
__name(isMenuItem, "isMenuItem");
function getBoundsElement(host) {
  var _a3;
  return (_a3 = host.getAttribute("bounds") ? closestComposedNode(host, `#${host.getAttribute("bounds")}`) : getMediaController(host) || host.parentElement) != null ? _a3 : host;
}
__name(getBoundsElement, "getBoundsElement");
if (!GlobalThis.customElements.get("media-chrome-menu")) {
  GlobalThis.customElements.define("media-chrome-menu", MediaChromeMenu);
}
var __accessCheck$5 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$5");
var __privateGet$5 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$5(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$5");
var __privateAdd$5 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$5");
var __privateSet$4 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$5(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$4");
var __privateMethod$5 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$5(obj, member, "access private method");
  return method;
}, "__privateMethod$5");
var _dirty, _ownerElement, _handleSlotChange, handleSlotChange_fn, _submenuConnected, submenuConnected_fn, _submenuDisconnected, submenuDisconnected_fn, _handleMenuItem, _handleKeyUp, handleKeyUp_fn, _handleKeyDown, handleKeyDown_fn, _reset, reset_fn;
function getTemplateHTML$5(_attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        transition: var(--media-menu-item-transition,
          background .15s linear,
          opacity .2s ease-in-out
        );
        outline: var(--media-menu-item-outline, 0);
        outline-offset: var(--media-menu-item-outline-offset, -1px);
        cursor: var(--media-cursor, pointer);
        display: flex;
        align-items: center;
        align-self: stretch;
        justify-self: stretch;
        white-space: nowrap;
        white-space-collapse: collapse;
        text-wrap: nowrap;
        padding: .4em .8em .4em 1em;
      }

      :host(:focus-visible) {
        box-shadow: var(--media-menu-item-focus-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: var(--media-menu-item-hover-outline, 0);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host(:hover) {
        cursor: var(--media-cursor, pointer);
        background: var(--media-menu-item-hover-background, rgb(92 92 102 / .5));
        outline: var(--media-menu-item-hover-outline);
        outline-offset: var(--media-menu-item-hover-outline-offset,  var(--media-menu-item-outline-offset, -1px));
      }

      :host([aria-checked="true"]) {
        background: var(--media-menu-item-checked-background);
      }

      :host([hidden]) {
        display: none;
      }

      :host([disabled]) {
        pointer-events: none;
        color: rgba(255, 255, 255, .3);
      }

      slot:not([name]) {
        width: 100%;
      }

      slot:not([name="submenu"]) {
        display: inline-flex;
        align-items: center;
        transition: inherit;
        opacity: var(--media-menu-item-opacity, 1);
      }

      slot[name="description"] {
        justify-content: end;
      }

      slot[name="description"] > span {
        display: inline-block;
        margin-inline: 1em .2em;
        max-width: var(--media-menu-item-description-max-width, 100px);
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: .8em;
        font-weight: 400;
        text-align: right;
        position: relative;
        top: .04em;
      }

      slot[name="checked-indicator"] {
        display: none;
      }

      :host(:is([role="menuitemradio"],[role="menuitemcheckbox"])) slot[name="checked-indicator"] {
        display: var(--media-menu-item-checked-indicator-display, inline-block);
      }

      ${/* For all slotted icons in prefix and suffix. */
    ""}
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      ${/* Only for indicator icons like checked-indicator or captions-indicator. */
    ""}
      [part~="indicator"],
      ::slotted([part~="indicator"]) {
        fill: var(--media-menu-item-indicator-fill,
          var(--media-icon-color, var(--media-primary-color, rgb(238 238 238))));
        height: var(--media-menu-item-indicator-height, 1.25em);
        margin-right: .5ch;
      }

      [part~="checked-indicator"] {
        visibility: hidden;
      }

      :host([aria-checked="true"]) [part~="checked-indicator"] {
        visibility: visible;
      }
    </style>
    <slot name="checked-indicator">
      <svg aria-hidden="true" viewBox="0 1 24 24" part="checked-indicator indicator">
        <path d="m10 15.17 9.193-9.191 1.414 1.414-10.606 10.606-6.364-6.364 1.414-1.414 4.95 4.95Z"/>
      </svg>
    </slot>
    <slot name="prefix"></slot>
    <slot></slot>
    <slot name="description"></slot>
    <slot name="suffix">
      ${this.getSuffixSlotInnerHTML(_attrs)}
    </slot>
    <slot name="submenu"></slot>
  `
  );
}
__name(getTemplateHTML$5, "getTemplateHTML$5");
function getSuffixSlotInnerHTML$1(_attrs) {
  return "";
}
__name(getSuffixSlotInnerHTML$1, "getSuffixSlotInnerHTML$1");
const Attributes$1 = {
  TYPE: "type",
  VALUE: "value",
  CHECKED: "checked",
  DISABLED: "disabled"
};
const _MediaChromeMenuItem = class _MediaChromeMenuItem extends GlobalThis.HTMLElement {
  constructor() {
    super();
    __privateAdd$5(this, _handleSlotChange);
    __privateAdd$5(this, _submenuConnected);
    __privateAdd$5(this, _submenuDisconnected);
    __privateAdd$5(this, _handleKeyUp);
    __privateAdd$5(this, _handleKeyDown);
    __privateAdd$5(this, _reset);
    __privateAdd$5(this, _dirty, false);
    __privateAdd$5(this, _ownerElement, void 0);
    __privateAdd$5(this, _handleMenuItem, () => {
      var _a3, _b2;
      if (this.submenuElement.items) {
        this.setAttribute("submenusize", `${this.submenuElement.items.length}`);
      }
      const descriptionSlot = this.shadowRoot.querySelector(
        'slot[name="description"]'
      );
      const checkedItem = (_a3 = this.submenuElement.checkedItems) == null ? void 0 : _a3[0];
      const description = (_b2 = checkedItem == null ? void 0 : checkedItem.dataset.description) != null ? _b2 : checkedItem == null ? void 0 : checkedItem.text;
      const span = Document$1.createElement("span");
      span.textContent = description != null ? description : "";
      descriptionSlot.replaceChildren(span);
    });
    if (!this.shadowRoot) {
      this.attachShadow(this.constructor.shadowRootOptions);
      const attrs = namedNodeMapToObject(this.attributes);
      this.shadowRoot.innerHTML = this.constructor.getTemplateHTML(attrs);
    }
    this.shadowRoot.addEventListener("slotchange", this);
  }
  static get observedAttributes() {
    return [
      Attributes$1.TYPE,
      Attributes$1.DISABLED,
      Attributes$1.CHECKED,
      Attributes$1.VALUE
    ];
  }
  enable() {
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "-1");
    }
    if (isCheckable(this) && !this.hasAttribute("aria-checked")) {
      this.setAttribute("aria-checked", "false");
    }
    this.addEventListener("click", this);
    this.addEventListener("keydown", this);
  }
  disable() {
    this.removeAttribute("tabindex");
    this.removeEventListener("click", this);
    this.removeEventListener("keydown", this);
    this.removeEventListener("keyup", this);
  }
  handleEvent(event) {
    switch (event.type) {
      case "slotchange":
        __privateMethod$5(this, _handleSlotChange, handleSlotChange_fn).call(this, event);
        break;
      case "click":
        this.handleClick(event);
        break;
      case "keydown":
        __privateMethod$5(this, _handleKeyDown, handleKeyDown_fn).call(this, event);
        break;
      case "keyup":
        __privateMethod$5(this, _handleKeyUp, handleKeyUp_fn).call(this, event);
        break;
    }
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (attrName === Attributes$1.CHECKED && isCheckable(this) && !__privateGet$5(this, _dirty)) {
      this.setAttribute("aria-checked", newValue != null ? "true" : "false");
    } else if (attrName === Attributes$1.TYPE && newValue !== oldValue) {
      this.role = "menuitem" + newValue;
    } else if (attrName === Attributes$1.DISABLED && newValue !== oldValue) {
      if (newValue == null) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }
  connectedCallback() {
    if (!this.hasAttribute(Attributes$1.DISABLED)) {
      this.enable();
    }
    this.role = "menuitem" + this.type;
    __privateSet$4(this, _ownerElement, closestMenuItemsContainer(this, this.parentNode));
    __privateMethod$5(this, _reset, reset_fn).call(this);
    if (this.submenuElement) {
      __privateMethod$5(this, _submenuConnected, submenuConnected_fn).call(this);
    }
  }
  disconnectedCallback() {
    this.disable();
    __privateMethod$5(this, _reset, reset_fn).call(this);
    __privateSet$4(this, _ownerElement, null);
  }
  get invokeTarget() {
    return this.getAttribute("invoketarget");
  }
  set invokeTarget(value) {
    this.setAttribute("invoketarget", `${value}`);
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute
   * or the slotted submenu element.
   */
  get invokeTargetElement() {
    var _a3;
    if (this.invokeTarget) {
      return (_a3 = getDocumentOrShadowRoot(this)) == null ? void 0 : _a3.querySelector(
        `#${this.invokeTarget}`
      );
    }
    return this.submenuElement;
  }
  /**
   * Returns the slotted submenu element.
   */
  get submenuElement() {
    const submenuSlot = this.shadowRoot.querySelector(
      'slot[name="submenu"]'
    );
    return submenuSlot.assignedElements({
      flatten: true
    })[0];
  }
  get type() {
    var _a3;
    return (_a3 = this.getAttribute(Attributes$1.TYPE)) != null ? _a3 : "";
  }
  set type(val) {
    this.setAttribute(Attributes$1.TYPE, `${val}`);
  }
  get value() {
    var _a3;
    return (_a3 = this.getAttribute(Attributes$1.VALUE)) != null ? _a3 : this.text;
  }
  set value(val) {
    this.setAttribute(Attributes$1.VALUE, val);
  }
  get text() {
    var _a3;
    return ((_a3 = this.textContent) != null ? _a3 : "").trim();
  }
  get checked() {
    if (!isCheckable(this))
      return void 0;
    return this.getAttribute("aria-checked") === "true";
  }
  set checked(value) {
    if (!isCheckable(this))
      return;
    __privateSet$4(this, _dirty, true);
    this.setAttribute("aria-checked", value ? "true" : "false");
    if (value) {
      this.part.add("checked");
    } else {
      this.part.remove("checked");
    }
  }
  handleClick(event) {
    if (isCheckable(this))
      return;
    if (this.invokeTargetElement && containsComposedNode(this, event.target)) {
      this.invokeTargetElement.dispatchEvent(
        new InvokeEvent({ relatedTarget: this })
      );
    }
  }
  get keysUsed() {
    return ["Enter", " "];
  }
};
__name(_MediaChromeMenuItem, "MediaChromeMenuItem");
let MediaChromeMenuItem = _MediaChromeMenuItem;
_dirty = /* @__PURE__ */ new WeakMap();
_ownerElement = /* @__PURE__ */ new WeakMap();
_handleSlotChange = /* @__PURE__ */ new WeakSet();
handleSlotChange_fn = /* @__PURE__ */ __name(function(event) {
  const slot = event.target;
  const isDefaultSlot = !(slot == null ? void 0 : slot.name);
  if (isDefaultSlot) {
    for (const node of slot.assignedNodes({ flatten: true })) {
      if (node instanceof Text && node.textContent.trim() === "") {
        node.remove();
      }
    }
  }
  if (slot.name === "submenu") {
    if (this.submenuElement) {
      __privateMethod$5(this, _submenuConnected, submenuConnected_fn).call(this);
    } else {
      __privateMethod$5(this, _submenuDisconnected, submenuDisconnected_fn).call(this);
    }
  }
}, "handleSlotChange_fn");
_submenuConnected = /* @__PURE__ */ new WeakSet();
submenuConnected_fn = /* @__PURE__ */ __name(async function() {
  this.setAttribute("aria-haspopup", "menu");
  this.setAttribute("aria-expanded", `${!this.submenuElement.hidden}`);
  this.submenuElement.addEventListener("change", __privateGet$5(this, _handleMenuItem));
  this.submenuElement.addEventListener("addmenuitem", __privateGet$5(this, _handleMenuItem));
  this.submenuElement.addEventListener(
    "removemenuitem",
    __privateGet$5(this, _handleMenuItem)
  );
  __privateGet$5(this, _handleMenuItem).call(this);
}, "submenuConnected_fn");
_submenuDisconnected = /* @__PURE__ */ new WeakSet();
submenuDisconnected_fn = /* @__PURE__ */ __name(function() {
  this.removeAttribute("aria-haspopup");
  this.removeAttribute("aria-expanded");
  this.submenuElement.removeEventListener("change", __privateGet$5(this, _handleMenuItem));
  this.submenuElement.removeEventListener(
    "addmenuitem",
    __privateGet$5(this, _handleMenuItem)
  );
  this.submenuElement.removeEventListener(
    "removemenuitem",
    __privateGet$5(this, _handleMenuItem)
  );
  __privateGet$5(this, _handleMenuItem).call(this);
}, "submenuDisconnected_fn");
_handleMenuItem = /* @__PURE__ */ new WeakMap();
_handleKeyUp = /* @__PURE__ */ new WeakSet();
handleKeyUp_fn = /* @__PURE__ */ __name(function(event) {
  const { key } = event;
  if (!this.keysUsed.includes(key)) {
    this.removeEventListener("keyup", __privateMethod$5(this, _handleKeyUp, handleKeyUp_fn));
    return;
  }
  this.handleClick(event);
}, "handleKeyUp_fn");
_handleKeyDown = /* @__PURE__ */ new WeakSet();
handleKeyDown_fn = /* @__PURE__ */ __name(function(event) {
  const { metaKey, altKey, key } = event;
  if (metaKey || altKey || !this.keysUsed.includes(key)) {
    this.removeEventListener("keyup", __privateMethod$5(this, _handleKeyUp, handleKeyUp_fn));
    return;
  }
  this.addEventListener("keyup", __privateMethod$5(this, _handleKeyUp, handleKeyUp_fn), { once: true });
}, "handleKeyDown_fn");
_reset = /* @__PURE__ */ new WeakSet();
reset_fn = /* @__PURE__ */ __name(function() {
  var _a3;
  const items = (_a3 = __privateGet$5(this, _ownerElement)) == null ? void 0 : _a3.radioGroupItems;
  if (!items)
    return;
  let checkedItem = items.filter((item) => item.getAttribute("aria-checked") === "true").pop();
  if (!checkedItem)
    checkedItem = items[0];
  for (const item of items) {
    item.setAttribute("aria-checked", "false");
  }
  checkedItem == null ? void 0 : checkedItem.setAttribute("aria-checked", "true");
}, "reset_fn");
MediaChromeMenuItem.shadowRootOptions = { mode: "open" };
MediaChromeMenuItem.getTemplateHTML = getTemplateHTML$5;
MediaChromeMenuItem.getSuffixSlotInnerHTML = getSuffixSlotInnerHTML$1;
function isCheckable(item) {
  return item.type === "radio" || item.type === "checkbox";
}
__name(isCheckable, "isCheckable");
function closestMenuItemsContainer(childNode, parentNode) {
  if (!childNode)
    return null;
  const { host } = childNode.getRootNode();
  if (!parentNode && host)
    return closestMenuItemsContainer(childNode, host);
  if (parentNode == null ? void 0 : parentNode.items)
    return parentNode;
  return closestMenuItemsContainer(parentNode, parentNode == null ? void 0 : parentNode.parentNode);
}
__name(closestMenuItemsContainer, "closestMenuItemsContainer");
if (!GlobalThis.customElements.get("media-chrome-menu-item")) {
  GlobalThis.customElements.define(
    "media-chrome-menu-item",
    MediaChromeMenuItem
  );
}
function getTemplateHTML$4(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeMenu.getTemplateHTML(_attrs)}
    <style>
      :host {
        --_menu-bg: rgb(20 20 30 / .8);
        background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
        min-width: var(--media-settings-menu-min-width, 170px);
        border-radius: 2px 2px 0 0;
        overflow: hidden;
      }

      @-moz-document url-prefix() {
        :host{
          --_menu-bg: rgb(20 20 30);
        }
      }

      :host([role="menu"]) {
        ${/* Bottom fix setting menu items for animation when the height expands. */
    ""}
        justify-content: end;
      }

      slot:not([name]) {
        justify-content: var(--media-settings-menu-justify-content);
        flex-direction: var(--media-settings-menu-flex-direction, column);
        overflow: visible;
      }

      #container.has-expanded {
        --media-settings-menu-item-opacity: 0;
      }
    </style>
  `
  );
}
__name(getTemplateHTML$4, "getTemplateHTML$4");
const _MediaSettingsMenu = class _MediaSettingsMenu extends MediaChromeMenu {
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    if (this.anchor !== "auto")
      return super.anchorElement;
    return getMediaController(this).querySelector(
      "media-settings-menu-button"
    );
  }
};
__name(_MediaSettingsMenu, "MediaSettingsMenu");
let MediaSettingsMenu = _MediaSettingsMenu;
MediaSettingsMenu.getTemplateHTML = getTemplateHTML$4;
if (!GlobalThis.customElements.get("media-settings-menu")) {
  GlobalThis.customElements.define("media-settings-menu", MediaSettingsMenu);
}
function getTemplateHTML$3(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeMenuItem.getTemplateHTML.call(this, _attrs)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `
  );
}
__name(getTemplateHTML$3, "getTemplateHTML$3");
function getSuffixSlotInnerHTML(_attrs) {
  return (
    /*html*/
    `
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `
  );
}
__name(getSuffixSlotInnerHTML, "getSuffixSlotInnerHTML");
const _MediaSettingsMenuItem = class _MediaSettingsMenuItem extends MediaChromeMenuItem {
};
__name(_MediaSettingsMenuItem, "MediaSettingsMenuItem");
let MediaSettingsMenuItem = _MediaSettingsMenuItem;
MediaSettingsMenuItem.shadowRootOptions = { mode: "open" };
MediaSettingsMenuItem.getTemplateHTML = getTemplateHTML$3;
MediaSettingsMenuItem.getSuffixSlotInnerHTML = getSuffixSlotInnerHTML;
if (!GlobalThis.customElements.get("media-settings-menu-item")) {
  GlobalThis.customElements.define(
    "media-settings-menu-item",
    MediaSettingsMenuItem
  );
}
const _MediaChromeMenuButton = class _MediaChromeMenuButton extends MediaChromeButton {
  connectedCallback() {
    super.connectedCallback();
    if (this.invokeTargetElement) {
      this.setAttribute("aria-haspopup", "menu");
    }
  }
  get invokeTarget() {
    return this.getAttribute("invoketarget");
  }
  set invokeTarget(value) {
    this.setAttribute("invoketarget", `${value}`);
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   * @return {HTMLElement | null}
   */
  get invokeTargetElement() {
    var _a3;
    if (this.invokeTarget) {
      return (_a3 = getDocumentOrShadowRoot(this)) == null ? void 0 : _a3.querySelector(
        `#${this.invokeTarget}`
      );
    }
    return null;
  }
  handleClick() {
    var _a3;
    (_a3 = this.invokeTargetElement) == null ? void 0 : _a3.dispatchEvent(
      new InvokeEvent({ relatedTarget: this })
    );
  }
};
__name(_MediaChromeMenuButton, "MediaChromeMenuButton");
let MediaChromeMenuButton = _MediaChromeMenuButton;
if (!GlobalThis.customElements.get("media-chrome-menu-button")) {
  GlobalThis.customElements.define(
    "media-chrome-menu-button",
    MediaChromeMenuButton
  );
}
function getSlotTemplateHTML$4() {
  return (
    /*html*/
    `
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M4.5 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Zm7.5 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
      </svg>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$4, "getSlotTemplateHTML$4");
function getTooltipContentHTML$4() {
  return t("Settings");
}
__name(getTooltipContentHTML$4, "getTooltipContentHTML$4");
const _MediaSettingsMenuButton = class _MediaSettingsMenuButton extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [...super.observedAttributes, "target"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-label", t("settings"));
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   * @return {HTMLElement | null}
   */
  get invokeTargetElement() {
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return getMediaController(this).querySelector("media-settings-menu");
  }
};
__name(_MediaSettingsMenuButton, "MediaSettingsMenuButton");
let MediaSettingsMenuButton = _MediaSettingsMenuButton;
MediaSettingsMenuButton.getSlotTemplateHTML = getSlotTemplateHTML$4;
MediaSettingsMenuButton.getTooltipContentHTML = getTooltipContentHTML$4;
if (!GlobalThis.customElements.get("media-settings-menu-button")) {
  GlobalThis.customElements.define(
    "media-settings-menu-button",
    MediaSettingsMenuButton
  );
}
var __accessCheck$4 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$4");
var __privateGet$4 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$4(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$4");
var __privateAdd$4 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$4");
var __privateSet$3 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$4(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$3");
var __privateMethod$4 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$4(obj, member, "access private method");
  return method;
}, "__privateMethod$4");
var _audioTrackList, _prevState$2, _render$3, render_fn$3, _onChange$3, onChange_fn$3;
const _MediaAudioTrackMenu = class _MediaAudioTrackMenu extends MediaChromeMenu {
  constructor() {
    super(...arguments);
    __privateAdd$4(this, _render$3);
    __privateAdd$4(this, _onChange$3);
    __privateAdd$4(this, _audioTrackList, []);
    __privateAdd$4(this, _prevState$2, void 0);
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_UNAVAILABLE
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED && oldValue !== newValue) {
      this.value = newValue;
    } else if (attrName === MediaUIAttributes.MEDIA_AUDIO_TRACK_LIST && oldValue !== newValue) {
      __privateSet$3(this, _audioTrackList, parseAudioTrackList(newValue != null ? newValue : ""));
      __privateMethod$4(this, _render$3, render_fn$3).call(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", __privateMethod$4(this, _onChange$3, onChange_fn$3));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", __privateMethod$4(this, _onChange$3, onChange_fn$3));
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    var _a3;
    if (this.anchor !== "auto")
      return super.anchorElement;
    return (_a3 = getMediaController(this)) == null ? void 0 : _a3.querySelector(
      "media-audio-track-menu-button"
    );
  }
  get mediaAudioTrackList() {
    return __privateGet$4(this, _audioTrackList);
  }
  set mediaAudioTrackList(list) {
    __privateSet$3(this, _audioTrackList, list);
    __privateMethod$4(this, _render$3, render_fn$3).call(this);
  }
  /**
   * Get enabled audio track id.
   */
  get mediaAudioTrackEnabled() {
    var _a3;
    return (_a3 = getStringAttr(this, MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED)) != null ? _a3 : "";
  }
  set mediaAudioTrackEnabled(id) {
    setStringAttr(this, MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED, id);
  }
};
__name(_MediaAudioTrackMenu, "MediaAudioTrackMenu");
let MediaAudioTrackMenu = _MediaAudioTrackMenu;
_audioTrackList = /* @__PURE__ */ new WeakMap();
_prevState$2 = /* @__PURE__ */ new WeakMap();
_render$3 = /* @__PURE__ */ new WeakSet();
render_fn$3 = /* @__PURE__ */ __name(function() {
  if (__privateGet$4(this, _prevState$2) === JSON.stringify(this.mediaAudioTrackList))
    return;
  __privateSet$3(this, _prevState$2, JSON.stringify(this.mediaAudioTrackList));
  const audioTrackList = this.mediaAudioTrackList;
  this.defaultSlot.textContent = "";
  audioTrackList.sort((a, b2) => a.id.localeCompare(b2.id, void 0, { numeric: true }));
  for (const audioTrack of audioTrackList) {
    const text = this.formatMenuItemText(audioTrack.label, audioTrack);
    const item = createMenuItem({
      type: "radio",
      text,
      value: `${audioTrack.id}`,
      checked: audioTrack.enabled
    });
    item.prepend(createIndicator(this, "checked-indicator"));
    this.defaultSlot.append(item);
  }
}, "render_fn$3");
_onChange$3 = /* @__PURE__ */ new WeakSet();
onChange_fn$3 = /* @__PURE__ */ __name(function() {
  if (this.value == null)
    return;
  const event = new GlobalThis.CustomEvent(
    MediaUIEvents.MEDIA_AUDIO_TRACK_REQUEST,
    {
      composed: true,
      bubbles: true,
      detail: this.value
    }
  );
  this.dispatchEvent(event);
}, "onChange_fn$3");
if (!GlobalThis.customElements.get("media-audio-track-menu")) {
  GlobalThis.customElements.define(
    "media-audio-track-menu",
    MediaAudioTrackMenu
  );
}
const audioTrackIcon = (
  /*html*/
  `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`
);
function getSlotTemplateHTML$3() {
  return (
    /*html*/
    `
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${audioTrackIcon}</slot>
  `
  );
}
__name(getSlotTemplateHTML$3, "getSlotTemplateHTML$3");
function getTooltipContentHTML$3() {
  return t("Audio");
}
__name(getTooltipContentHTML$3, "getTooltipContentHTML$3");
const updateAriaLabel$1 = /* @__PURE__ */ __name((el) => {
  const label = t("Audio");
  el.setAttribute("aria-label", label);
}, "updateAriaLabel$1");
const _MediaAudioTrackMenuButton = class _MediaAudioTrackMenuButton extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED,
      MediaUIAttributes.MEDIA_AUDIO_TRACK_UNAVAILABLE
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel$1(this);
  }
  attributeChangedCallback(attrName, _oldValue, newValue) {
    super.attributeChangedCallback(attrName, _oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_LANG) {
      updateAriaLabel$1(this);
    }
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   * @return {HTMLElement | null}
   */
  get invokeTargetElement() {
    var _a3;
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return (_a3 = getMediaController(this)) == null ? void 0 : _a3.querySelector("media-audio-track-menu");
  }
  /**
   * Get enabled audio track id.
   * @return {string}
   */
  get mediaAudioTrackEnabled() {
    var _a3;
    return (_a3 = getStringAttr(this, MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED)) != null ? _a3 : "";
  }
  set mediaAudioTrackEnabled(id) {
    setStringAttr(this, MediaUIAttributes.MEDIA_AUDIO_TRACK_ENABLED, id);
  }
};
__name(_MediaAudioTrackMenuButton, "MediaAudioTrackMenuButton");
let MediaAudioTrackMenuButton = _MediaAudioTrackMenuButton;
MediaAudioTrackMenuButton.getSlotTemplateHTML = getSlotTemplateHTML$3;
MediaAudioTrackMenuButton.getTooltipContentHTML = getTooltipContentHTML$3;
if (!GlobalThis.customElements.get("media-audio-track-menu-button")) {
  GlobalThis.customElements.define(
    "media-audio-track-menu-button",
    MediaAudioTrackMenuButton
  );
}
var __accessCheck$3 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$3");
var __privateGet$3 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$3(obj, member, "read from private field");
  return member.get(obj);
}, "__privateGet$3");
var __privateAdd$3 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$3");
var __privateSet$2 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$3(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$2");
var __privateMethod$3 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$3(obj, member, "access private method");
  return method;
}, "__privateMethod$3");
var _prevState$1, _render$2, render_fn$2, _onChange$2, onChange_fn$2;
const ccIcon = (
  /*html*/
  `
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`
);
function getTemplateHTML$2(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeMenu.getTemplateHTML(_attrs)}
    <slot name="captions-indicator" hidden>${ccIcon}</slot>
  `
  );
}
__name(getTemplateHTML$2, "getTemplateHTML$2");
const _MediaCaptionsMenu = class _MediaCaptionsMenu extends MediaChromeMenu {
  constructor() {
    super(...arguments);
    __privateAdd$3(this, _render$2);
    __privateAdd$3(this, _onChange$2);
    __privateAdd$3(this, _prevState$1, void 0);
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_SUBTITLES_LIST,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_SUBTITLES_LIST && oldValue !== newValue) {
      __privateMethod$3(this, _render$2, render_fn$2).call(this);
    } else if (attrName === MediaUIAttributes.MEDIA_SUBTITLES_SHOWING && oldValue !== newValue) {
      this.value = newValue || "";
      __privateMethod$3(this, _render$2, render_fn$2).call(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", __privateMethod$3(this, _onChange$2, onChange_fn$2));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", __privateMethod$3(this, _onChange$2, onChange_fn$2));
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    if (this.anchor !== "auto")
      return super.anchorElement;
    return getMediaController(this).querySelector("media-captions-menu-button");
  }
  /**
   * @type {Array<object>} An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesList() {
    return getSubtitlesListAttr$1(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST);
  }
  set mediaSubtitlesList(list) {
    setSubtitlesListAttr$1(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST, list);
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesShowing() {
    return getSubtitlesListAttr$1(
      this,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    );
  }
  set mediaSubtitlesShowing(list) {
    setSubtitlesListAttr$1(this, MediaUIAttributes.MEDIA_SUBTITLES_SHOWING, list);
  }
};
__name(_MediaCaptionsMenu, "MediaCaptionsMenu");
let MediaCaptionsMenu = _MediaCaptionsMenu;
_prevState$1 = /* @__PURE__ */ new WeakMap();
_render$2 = /* @__PURE__ */ new WeakSet();
render_fn$2 = /* @__PURE__ */ __name(function() {
  var _a3;
  const hasListChanged = __privateGet$3(this, _prevState$1) !== JSON.stringify(this.mediaSubtitlesList);
  const hasShowingChanged = this.value !== this.getAttribute(MediaUIAttributes.MEDIA_SUBTITLES_SHOWING);
  if (!hasListChanged && !hasShowingChanged)
    return;
  __privateSet$2(this, _prevState$1, JSON.stringify(this.mediaSubtitlesList));
  this.defaultSlot.textContent = "";
  const isOff = !this.value;
  const item = createMenuItem({
    type: "radio",
    text: this.formatMenuItemText(t("Off")),
    value: "off",
    checked: isOff
  });
  item.prepend(createIndicator(this, "checked-indicator"));
  this.defaultSlot.append(item);
  const subtitlesList = this.mediaSubtitlesList;
  for (const subs of subtitlesList) {
    const item2 = createMenuItem({
      type: "radio",
      text: this.formatMenuItemText(subs.label, subs),
      value: formatTextTrackObj(subs),
      checked: this.value == formatTextTrackObj(subs)
    });
    item2.prepend(createIndicator(this, "checked-indicator"));
    const type = (_a3 = subs.kind) != null ? _a3 : "subs";
    if (type === "captions") {
      item2.append(createIndicator(this, "captions-indicator"));
    }
    this.defaultSlot.append(item2);
  }
}, "render_fn$2");
_onChange$2 = /* @__PURE__ */ new WeakSet();
onChange_fn$2 = /* @__PURE__ */ __name(function() {
  const showingSubs = this.mediaSubtitlesShowing;
  const showingSubsStr = this.getAttribute(
    MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
  );
  const localStateChange = this.value !== showingSubsStr;
  if ((showingSubs == null ? void 0 : showingSubs.length) && localStateChange) {
    this.dispatchEvent(
      new GlobalThis.CustomEvent(
        MediaUIEvents.MEDIA_DISABLE_SUBTITLES_REQUEST,
        {
          composed: true,
          bubbles: true,
          detail: showingSubs
        }
      )
    );
  }
  if (!this.value || !localStateChange)
    return;
  const event = new GlobalThis.CustomEvent(
    MediaUIEvents.MEDIA_SHOW_SUBTITLES_REQUEST,
    {
      composed: true,
      bubbles: true,
      detail: this.value
    }
  );
  this.dispatchEvent(event);
}, "onChange_fn$2");
MediaCaptionsMenu.getTemplateHTML = getTemplateHTML$2;
const getSubtitlesListAttr$1 = /* @__PURE__ */ __name((el, attrName) => {
  const attrVal = el.getAttribute(attrName);
  return attrVal ? parseTextTracksStr(attrVal) : [];
}, "getSubtitlesListAttr$1");
const setSubtitlesListAttr$1 = /* @__PURE__ */ __name((el, attrName, list) => {
  if (!(list == null ? void 0 : list.length)) {
    el.removeAttribute(attrName);
    return;
  }
  const newValStr = stringifyTextTrackList(list);
  const oldVal = el.getAttribute(attrName);
  if (oldVal === newValStr)
    return;
  el.setAttribute(attrName, newValStr);
}, "setSubtitlesListAttr$1");
if (!GlobalThis.customElements.get("media-captions-menu")) {
  GlobalThis.customElements.define("media-captions-menu", MediaCaptionsMenu);
}
const ccIconOn = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`;
const ccIconOff = `<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;
function getSlotTemplateHTML$2() {
  return (
    /*html*/
    `
    <style>
      :host([data-captions-enabled="true"]) slot[name=off] {
        display: none !important;
      }

      ${/* Double negative, but safer if display doesn't equal 'block' */
    ""}
      :host(:not([data-captions-enabled="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${ccIconOn}</slot>
      <slot name="off">${ccIconOff}</slot>
    </slot>
  `
  );
}
__name(getSlotTemplateHTML$2, "getSlotTemplateHTML$2");
function getTooltipContentHTML$2() {
  return t("Captions");
}
__name(getTooltipContentHTML$2, "getTooltipContentHTML$2");
const updateAriaChecked = /* @__PURE__ */ __name((el) => {
  el.setAttribute("data-captions-enabled", areSubsOn(el).toString());
}, "updateAriaChecked");
const updateAriaLabel = /* @__PURE__ */ __name((el) => {
  el.setAttribute("aria-label", t("closed captions"));
}, "updateAriaLabel");
const _MediaCaptionsMenuButton = class _MediaCaptionsMenuButton extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_SUBTITLES_LIST,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING,
      MediaUIAttributes.MEDIA_LANG
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    updateAriaLabel(this);
    updateAriaChecked(this);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_SUBTITLES_SHOWING) {
      updateAriaChecked(this);
    } else if (attrName === MediaUIAttributes.MEDIA_LANG) {
      updateAriaLabel(this);
    }
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   * @return {HTMLElement | null}
   */
  get invokeTargetElement() {
    var _a3;
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return (_a3 = getMediaController(this)) == null ? void 0 : _a3.querySelector("media-captions-menu");
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesList() {
    return getSubtitlesListAttr(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST);
  }
  set mediaSubtitlesList(list) {
    setSubtitlesListAttr(this, MediaUIAttributes.MEDIA_SUBTITLES_LIST, list);
  }
  /**
   * An array of TextTrack-like objects.
   * Objects must have the properties: kind, language, and label.
   */
  get mediaSubtitlesShowing() {
    return getSubtitlesListAttr(
      this,
      MediaUIAttributes.MEDIA_SUBTITLES_SHOWING
    );
  }
  set mediaSubtitlesShowing(list) {
    setSubtitlesListAttr(this, MediaUIAttributes.MEDIA_SUBTITLES_SHOWING, list);
  }
};
__name(_MediaCaptionsMenuButton, "MediaCaptionsMenuButton");
let MediaCaptionsMenuButton = _MediaCaptionsMenuButton;
MediaCaptionsMenuButton.getSlotTemplateHTML = getSlotTemplateHTML$2;
MediaCaptionsMenuButton.getTooltipContentHTML = getTooltipContentHTML$2;
const getSubtitlesListAttr = /* @__PURE__ */ __name((el, attrName) => {
  const attrVal = el.getAttribute(attrName);
  return attrVal ? parseTextTracksStr(attrVal) : [];
}, "getSubtitlesListAttr");
const setSubtitlesListAttr = /* @__PURE__ */ __name((el, attrName, list) => {
  if (!(list == null ? void 0 : list.length)) {
    el.removeAttribute(attrName);
    return;
  }
  const newValStr = stringifyTextTrackList(list);
  const oldVal = el.getAttribute(attrName);
  if (oldVal === newValStr)
    return;
  el.setAttribute(attrName, newValStr);
}, "setSubtitlesListAttr");
if (!GlobalThis.customElements.get("media-captions-menu-button")) {
  GlobalThis.customElements.define(
    "media-captions-menu-button",
    MediaCaptionsMenuButton
  );
}
var __accessCheck$2 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$2");
var __privateGet$2 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$2");
var __privateAdd$2 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$2");
var __privateMethod$2 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$2(obj, member, "access private method");
  return method;
}, "__privateMethod$2");
var _rates, _render$1, render_fn$1, _onChange$1, onChange_fn$1;
const Attributes = {
  RATES: "rates"
};
const _MediaPlaybackRateMenu = class _MediaPlaybackRateMenu extends MediaChromeMenu {
  constructor() {
    super();
    __privateAdd$2(this, _render$1);
    __privateAdd$2(this, _onChange$1);
    __privateAdd$2(this, _rates, new AttributeTokenList(this, Attributes.RATES, {
      defaultValue: DEFAULT_RATES
    }));
    __privateMethod$2(this, _render$1, render_fn$1).call(this);
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      Attributes.RATES
    ];
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PLAYBACK_RATE && oldValue != newValue) {
      this.value = newValue;
      __privateMethod$2(this, _render$1, render_fn$1).call(this);
    } else if (attrName === Attributes.RATES && oldValue != newValue) {
      __privateGet$2(this, _rates).value = newValue;
      __privateMethod$2(this, _render$1, render_fn$1).call(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", __privateMethod$2(this, _onChange$1, onChange_fn$1));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", __privateMethod$2(this, _onChange$1, onChange_fn$1));
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    if (this.anchor !== "auto")
      return super.anchorElement;
    return getMediaController(this).querySelector(
      "media-playback-rate-menu-button"
    );
  }
  /**
   * Get the playback rates for the button.
   */
  get rates() {
    return __privateGet$2(this, _rates);
  }
  /**
   * Set the playback rates for the button.
   * For React 19+ compatibility, accept a string of space-separated rates.
   */
  set rates(value) {
    if (!value) {
      __privateGet$2(this, _rates).value = "";
    } else if (Array.isArray(value)) {
      __privateGet$2(this, _rates).value = value.join(" ");
    } else if (typeof value === "string") {
      __privateGet$2(this, _rates).value = value;
    }
    __privateMethod$2(this, _render$1, render_fn$1).call(this);
  }
  /**
   * The current playback rate
   */
  get mediaPlaybackRate() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      DEFAULT_RATE$1
    );
  }
  set mediaPlaybackRate(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, value);
  }
};
__name(_MediaPlaybackRateMenu, "MediaPlaybackRateMenu");
let MediaPlaybackRateMenu = _MediaPlaybackRateMenu;
_rates = /* @__PURE__ */ new WeakMap();
_render$1 = /* @__PURE__ */ new WeakSet();
render_fn$1 = /* @__PURE__ */ __name(function() {
  this.defaultSlot.textContent = "";
  const currentRate = this.mediaPlaybackRate;
  const ratesSet = new Set(Array.from(__privateGet$2(this, _rates)).map((rate) => Number(rate)));
  if (currentRate > 0 && !ratesSet.has(currentRate)) {
    ratesSet.add(currentRate);
  }
  const sortedRates = Array.from(ratesSet).sort((a, b2) => a - b2);
  for (const rate of sortedRates) {
    const item = createMenuItem({
      type: "radio",
      text: this.formatMenuItemText(`${rate}x`, rate),
      value: rate.toString(),
      checked: currentRate === rate
    });
    item.prepend(createIndicator(this, "checked-indicator"));
    this.defaultSlot.append(item);
  }
}, "render_fn$1");
_onChange$1 = /* @__PURE__ */ new WeakSet();
onChange_fn$1 = /* @__PURE__ */ __name(function() {
  if (!this.value)
    return;
  const event = new GlobalThis.CustomEvent(
    MediaUIEvents.MEDIA_PLAYBACK_RATE_REQUEST,
    {
      composed: true,
      bubbles: true,
      detail: this.value
    }
  );
  this.dispatchEvent(event);
}, "onChange_fn$1");
if (!GlobalThis.customElements.get("media-playback-rate-menu")) {
  GlobalThis.customElements.define(
    "media-playback-rate-menu",
    MediaPlaybackRateMenu
  );
}
const DEFAULT_RATE = 1;
function getSlotTemplateHTML$1(attrs) {
  return (
    /*html*/
    `
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
      
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${attrs["mediaplaybackrate"] || DEFAULT_RATE}x</slot>
  `
  );
}
__name(getSlotTemplateHTML$1, "getSlotTemplateHTML$1");
function getTooltipContentHTML$1() {
  return t("Playback rate");
}
__name(getTooltipContentHTML$1, "getTooltipContentHTML$1");
const _MediaPlaybackRateMenuButton = class _MediaPlaybackRateMenuButton extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE
    ];
  }
  constructor() {
    var _a3;
    super();
    this.container = this.shadowRoot.querySelector('slot[name="icon"]');
    this.container.innerHTML = `${(_a3 = this.mediaPlaybackRate) != null ? _a3 : DEFAULT_RATE}x`;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_PLAYBACK_RATE) {
      const newPlaybackRate = newValue ? +newValue : Number.NaN;
      const playbackRate = !Number.isNaN(newPlaybackRate) ? newPlaybackRate : DEFAULT_RATE;
      this.container.innerHTML = `${playbackRate}x`;
      this.setAttribute(
        "aria-label",
        t("Playback rate {playbackRate}", { playbackRate })
      );
    }
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   */
  get invokeTargetElement() {
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return getMediaController(this).querySelector("media-playback-rate-menu");
  }
  /**
   * The current playback rate
   */
  get mediaPlaybackRate() {
    return getNumericAttr(
      this,
      MediaUIAttributes.MEDIA_PLAYBACK_RATE,
      DEFAULT_RATE
    );
  }
  set mediaPlaybackRate(value) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_PLAYBACK_RATE, value);
  }
};
__name(_MediaPlaybackRateMenuButton, "MediaPlaybackRateMenuButton");
let MediaPlaybackRateMenuButton = _MediaPlaybackRateMenuButton;
MediaPlaybackRateMenuButton.getSlotTemplateHTML = getSlotTemplateHTML$1;
MediaPlaybackRateMenuButton.getTooltipContentHTML = getTooltipContentHTML$1;
if (!GlobalThis.customElements.get("media-playback-rate-menu-button")) {
  GlobalThis.customElements.define(
    "media-playback-rate-menu-button",
    MediaPlaybackRateMenuButton
  );
}
var __accessCheck$1 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck$1");
var __privateGet$1 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck$1(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet$1");
var __privateAdd$1 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd$1");
var __privateSet$1 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck$1(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet$1");
var __privateMethod$1 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck$1(obj, member, "access private method");
  return method;
}, "__privateMethod$1");
var _renditionList, _prevState, _render, render_fn, _onChange, onChange_fn;
const _MediaRenditionMenu = class _MediaRenditionMenu extends MediaChromeMenu {
  constructor() {
    super(...arguments);
    __privateAdd$1(this, _render);
    __privateAdd$1(this, _onChange);
    __privateAdd$1(this, _renditionList, []);
    __privateAdd$1(this, _prevState, {});
  }
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_RENDITION_LIST,
      MediaUIAttributes.MEDIA_RENDITION_SELECTED,
      MediaUIAttributes.MEDIA_RENDITION_UNAVAILABLE,
      MediaUIAttributes.MEDIA_HEIGHT
    ];
  }
  static formatMenuItemText(text, rendition) {
    return super.formatMenuItemText(text, rendition);
  }
  static formatRendition(rendition, { showBitrate = false } = {}) {
    const renditionText = `${Math.min(
      rendition.width,
      rendition.height
    )}p`;
    if (showBitrate && rendition.bitrate) {
      const mbps = rendition.bitrate / 1e6;
      const bitrateText = `${mbps.toFixed(mbps < 1 ? 1 : 0)} Mbps`;
      return `${renditionText} (${bitrateText})`;
    }
    return this.formatMenuItemText(renditionText, rendition);
  }
  static compareRendition(a, b2) {
    var _a3, _b2;
    return b2.height === a.height ? ((_a3 = b2.bitrate) != null ? _a3 : 0) - ((_b2 = a.bitrate) != null ? _b2 : 0) : b2.height - a.height;
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    super.attributeChangedCallback(attrName, oldValue, newValue);
    if (attrName === MediaUIAttributes.MEDIA_RENDITION_SELECTED && oldValue !== newValue) {
      this.value = newValue != null ? newValue : "auto";
      __privateMethod$1(this, _render, render_fn).call(this);
    } else if (attrName === MediaUIAttributes.MEDIA_RENDITION_LIST && oldValue !== newValue) {
      __privateSet$1(this, _renditionList, parseRenditionList(newValue));
      __privateMethod$1(this, _render, render_fn).call(this);
    } else if (attrName === MediaUIAttributes.MEDIA_HEIGHT && oldValue !== newValue) {
      __privateMethod$1(this, _render, render_fn).call(this);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("change", __privateMethod$1(this, _onChange, onChange_fn));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("change", __privateMethod$1(this, _onChange, onChange_fn));
  }
  /**
   * Returns the anchor element when it is a floating menu.
   */
  get anchorElement() {
    if (this.anchor !== "auto")
      return super.anchorElement;
    return getMediaController(this).querySelector(
      "media-rendition-menu-button"
    );
  }
  get mediaRenditionList() {
    return __privateGet$1(this, _renditionList);
  }
  set mediaRenditionList(list) {
    __privateSet$1(this, _renditionList, list);
    __privateMethod$1(this, _render, render_fn).call(this);
  }
  /**
   * Get selected rendition id.
   */
  get mediaRenditionSelected() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_RENDITION_SELECTED);
  }
  set mediaRenditionSelected(id) {
    setStringAttr(this, MediaUIAttributes.MEDIA_RENDITION_SELECTED, id);
  }
  get mediaHeight() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_HEIGHT);
  }
  set mediaHeight(height) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_HEIGHT, height);
  }
  compareRendition(a, b2) {
    const ctor = this.constructor;
    return ctor.compareRendition(a, b2);
  }
  formatMenuItemText(text, rendition) {
    const ctor = this.constructor;
    return ctor.formatMenuItemText(text, rendition);
  }
  formatRendition(rendition, options) {
    const ctor = this.constructor;
    return ctor.formatRendition(rendition, options);
  }
  showRenditionBitrate(rendition) {
    return this.mediaRenditionList.some(
      (r10) => r10 !== rendition && r10.height === rendition.height && r10.bitrate !== rendition.bitrate
    );
  }
};
__name(_MediaRenditionMenu, "MediaRenditionMenu");
let MediaRenditionMenu = _MediaRenditionMenu;
_renditionList = /* @__PURE__ */ new WeakMap();
_prevState = /* @__PURE__ */ new WeakMap();
_render = /* @__PURE__ */ new WeakSet();
render_fn = /* @__PURE__ */ __name(function() {
  if (__privateGet$1(this, _prevState).mediaRenditionList === JSON.stringify(this.mediaRenditionList) && __privateGet$1(this, _prevState).mediaHeight === this.mediaHeight)
    return;
  __privateGet$1(this, _prevState).mediaRenditionList = JSON.stringify(
    this.mediaRenditionList
  );
  __privateGet$1(this, _prevState).mediaHeight = this.mediaHeight;
  const renditionList = this.mediaRenditionList.sort(
    this.compareRendition.bind(this)
  );
  const selectedRendition = renditionList.find(
    (rendition) => rendition.id === this.mediaRenditionSelected
  );
  for (const rendition of renditionList) {
    rendition.selected = rendition === selectedRendition;
  }
  this.defaultSlot.textContent = "";
  const isAuto = !this.mediaRenditionSelected;
  for (const rendition of renditionList) {
    const text = this.formatRendition(rendition, {
      showBitrate: this.showRenditionBitrate(rendition)
    });
    const item2 = createMenuItem({
      type: "radio",
      text,
      value: `${rendition.id}`,
      checked: rendition.selected && !isAuto
    });
    item2.prepend(createIndicator(this, "checked-indicator"));
    this.defaultSlot.append(item2);
  }
  const showSelectedBitrate = selectedRendition && this.showRenditionBitrate(selectedRendition);
  const autoText = isAuto ? (
    // Auto • 1080p (4 Mbps)
    selectedRendition ? this.formatMenuItemText(
      `${t("Auto")} • ${this.formatRendition(selectedRendition, {
        showBitrate: showSelectedBitrate
      })}`,
      selectedRendition
    ) : this.formatMenuItemText(`${t("Auto")} (${this.mediaHeight}p)`)
  ) : this.formatMenuItemText(t("Auto"));
  const item = createMenuItem({
    type: "radio",
    text: autoText,
    value: "auto",
    checked: isAuto
  });
  item.dataset.description = autoText;
  item.prepend(createIndicator(this, "checked-indicator"));
  this.defaultSlot.append(item);
}, "render_fn");
_onChange = /* @__PURE__ */ new WeakSet();
onChange_fn = /* @__PURE__ */ __name(function() {
  if (this.value == null)
    return;
  const event = new GlobalThis.CustomEvent(
    MediaUIEvents.MEDIA_RENDITION_REQUEST,
    {
      composed: true,
      bubbles: true,
      detail: this.value
    }
  );
  this.dispatchEvent(event);
}, "onChange_fn");
if (!GlobalThis.customElements.get("media-rendition-menu")) {
  GlobalThis.customElements.define("media-rendition-menu", MediaRenditionMenu);
}
const renditionIcon = (
  /*html*/
  `<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`
);
function getSlotTemplateHTML() {
  return (
    /*html*/
    `
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${renditionIcon}</slot>
  `
  );
}
__name(getSlotTemplateHTML, "getSlotTemplateHTML");
function getTooltipContentHTML() {
  return t("Quality");
}
__name(getTooltipContentHTML, "getTooltipContentHTML");
const _MediaRenditionMenuButton = class _MediaRenditionMenuButton extends MediaChromeMenuButton {
  static get observedAttributes() {
    return [
      ...super.observedAttributes,
      MediaUIAttributes.MEDIA_RENDITION_SELECTED,
      MediaUIAttributes.MEDIA_RENDITION_UNAVAILABLE,
      MediaUIAttributes.MEDIA_HEIGHT
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("aria-label", t("quality"));
  }
  /**
   * Returns the element with the id specified by the `invoketarget` attribute.
   */
  get invokeTargetElement() {
    if (this.invokeTarget != void 0)
      return super.invokeTargetElement;
    return getMediaController(this).querySelector("media-rendition-menu");
  }
  /**
   * Get selected rendition id.
   */
  get mediaRenditionSelected() {
    return getStringAttr(this, MediaUIAttributes.MEDIA_RENDITION_SELECTED);
  }
  set mediaRenditionSelected(id) {
    setStringAttr(this, MediaUIAttributes.MEDIA_RENDITION_SELECTED, id);
  }
  get mediaHeight() {
    return getNumericAttr(this, MediaUIAttributes.MEDIA_HEIGHT);
  }
  set mediaHeight(height) {
    setNumericAttr(this, MediaUIAttributes.MEDIA_HEIGHT, height);
  }
};
__name(_MediaRenditionMenuButton, "MediaRenditionMenuButton");
let MediaRenditionMenuButton = _MediaRenditionMenuButton;
MediaRenditionMenuButton.getSlotTemplateHTML = getSlotTemplateHTML;
MediaRenditionMenuButton.getTooltipContentHTML = getTooltipContentHTML;
if (!GlobalThis.customElements.get("media-rendition-menu-button")) {
  GlobalThis.customElements.define(
    "media-rendition-menu-button",
    MediaRenditionMenuButton
  );
}
var __accessCheck2 = /* @__PURE__ */ __name((obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
}, "__accessCheck");
var __privateGet2 = /* @__PURE__ */ __name((obj, member, getter) => {
  __accessCheck2(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
}, "__privateGet");
var __privateAdd2 = /* @__PURE__ */ __name((obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
}, "__privateAdd");
var __privateSet2 = /* @__PURE__ */ __name((obj, member, value, setter) => {
  __accessCheck2(obj, member, "write to private field");
  member.set(obj, value);
  return value;
}, "__privateSet");
var __privateMethod2 = /* @__PURE__ */ __name((obj, member, method) => {
  __accessCheck2(obj, member, "access private method");
  return method;
}, "__privateMethod");
var _isContextMenuOpen, _updateVisibility, updateVisibility_fn, _closeContextMenu, closeContextMenu_fn, _closeOtherContextMenus, closeOtherContextMenus_fn, _isVideoContainer, isVideoContainer_fn, _onControllerContextMenu, _onContextMenu, onContextMenu_fn, _onDocumentClick, _onKeyDown, _onMenuClick;
function getTemplateHTML$1(_attrs) {
  return (
    /*html*/
    `
      ${MediaChromeMenu.getTemplateHTML(_attrs)}
      <style>
        :host {
          --_menu-bg: rgb(20 20 30 / .8);
          background: var(--media-settings-menu-background,
            var(--media-menu-background,
              var(--media-control-background,
                var(--media-secondary-color, var(--_menu-bg)))));
          min-width: var(--media-settings-menu-min-width, 170px);
          border-radius: 2px;
          overflow: hidden;
        }
      </style>
    `
  );
}
__name(getTemplateHTML$1, "getTemplateHTML$1");
const _MediaContextMenu = class _MediaContextMenu extends MediaChromeMenu {
  constructor() {
    super();
    __privateAdd2(this, _updateVisibility);
    __privateAdd2(this, _closeContextMenu);
    __privateAdd2(this, _closeOtherContextMenus);
    __privateAdd2(this, _isVideoContainer);
    __privateAdd2(this, _onContextMenu);
    __privateAdd2(this, _isContextMenuOpen, false);
    __privateAdd2(this, _onControllerContextMenu, (event) => {
      const target = event.target;
      const isVideoElement = (target == null ? void 0 : target.nodeName) === "VIDEO";
      const isVideoContainer = __privateMethod2(this, _isVideoContainer, isVideoContainer_fn).call(this, target);
      if (isVideoElement || isVideoContainer) {
        if (!__privateGet2(this, _isContextMenuOpen)) {
          __privateMethod2(this, _onContextMenu, onContextMenu_fn).call(this, event);
        } else {
          __privateMethod2(this, _closeContextMenu, closeContextMenu_fn).call(this);
        }
      }
    });
    __privateAdd2(this, _onDocumentClick, (event) => {
      const target = event.target;
      const isInsideMenu = this.contains(target);
      const isRightClick = event.button === 2;
      const isVideo = (target == null ? void 0 : target.nodeName) === "VIDEO";
      const isVideoContainer = __privateMethod2(this, _isVideoContainer, isVideoContainer_fn).call(this, target);
      if (isInsideMenu) {
        return;
      }
      const isRightClickOnVideo = isRightClick && (isVideo || isVideoContainer);
      if (isRightClickOnVideo) {
        return;
      }
      __privateMethod2(this, _closeContextMenu, closeContextMenu_fn).call(this);
    });
    __privateAdd2(this, _onKeyDown, (event) => {
      if (event.key === "Escape") {
        __privateMethod2(this, _closeContextMenu, closeContextMenu_fn).call(this);
      }
    });
    __privateAdd2(this, _onMenuClick, (event) => {
      var _a3, _b2;
      const target = event.target;
      if ((_a3 = target.matches) == null ? void 0 : _a3.call(target, 'button[invoke="copy"]')) {
        const input = (_b2 = target.closest("media-context-menu-item")) == null ? void 0 : _b2.querySelector('input[slot="copy"]');
        input && navigator.clipboard.writeText(input.value);
      }
      __privateMethod2(this, _closeContextMenu, closeContextMenu_fn).call(this);
    });
    this.setAttribute("noautohide", "");
    __privateMethod2(this, _updateVisibility, updateVisibility_fn).call(this);
  }
  connectedCallback() {
    super.connectedCallback();
    getMediaController(this).addEventListener(
      "contextmenu",
      __privateGet2(this, _onControllerContextMenu)
    );
    this.addEventListener("click", __privateGet2(this, _onMenuClick));
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    getMediaController(this).removeEventListener(
      "contextmenu",
      __privateGet2(this, _onControllerContextMenu)
    );
    this.removeEventListener("click", __privateGet2(this, _onMenuClick));
    document.removeEventListener("mousedown", __privateGet2(this, _onDocumentClick));
    document.removeEventListener("keydown", __privateGet2(this, _onKeyDown));
  }
};
__name(_MediaContextMenu, "MediaContextMenu");
let MediaContextMenu = _MediaContextMenu;
_isContextMenuOpen = /* @__PURE__ */ new WeakMap();
_updateVisibility = /* @__PURE__ */ new WeakSet();
updateVisibility_fn = /* @__PURE__ */ __name(function() {
  this.hidden = !__privateGet2(this, _isContextMenuOpen);
}, "updateVisibility_fn");
_closeContextMenu = /* @__PURE__ */ new WeakSet();
closeContextMenu_fn = /* @__PURE__ */ __name(function() {
  __privateSet2(this, _isContextMenuOpen, false);
  __privateMethod2(this, _updateVisibility, updateVisibility_fn).call(this);
}, "closeContextMenu_fn");
_closeOtherContextMenus = /* @__PURE__ */ new WeakSet();
closeOtherContextMenus_fn = /* @__PURE__ */ __name(function() {
  const allContextMenus = document.querySelectorAll("media-context-menu");
  allContextMenus.forEach((menu) => {
    var _a3;
    if (menu !== this) {
      __privateMethod2(_a3 = menu, _closeContextMenu, closeContextMenu_fn).call(_a3);
    }
  });
}, "closeOtherContextMenus_fn");
_isVideoContainer = /* @__PURE__ */ new WeakSet();
isVideoContainer_fn = /* @__PURE__ */ __name(function(element) {
  if (!element)
    return false;
  if (element.hasAttribute("slot") && element.getAttribute("slot") === "media") {
    return true;
  }
  if (element.nodeName.includes("-") && element.tagName.includes("-")) {
    const hasVideoAttributes = element.hasAttribute("src") || element.hasAttribute("poster") || element.hasAttribute("preload") || element.hasAttribute("playsinline");
    return hasVideoAttributes;
  }
  return false;
}, "isVideoContainer_fn");
_onControllerContextMenu = /* @__PURE__ */ new WeakMap();
_onContextMenu = /* @__PURE__ */ new WeakSet();
onContextMenu_fn = /* @__PURE__ */ __name(function(event) {
  event.preventDefault();
  __privateMethod2(this, _closeOtherContextMenus, closeOtherContextMenus_fn).call(this);
  __privateSet2(this, _isContextMenuOpen, true);
  this.style.position = "fixed";
  this.style.left = `${event.clientX}px`;
  this.style.top = `${event.clientY}px`;
  __privateMethod2(this, _updateVisibility, updateVisibility_fn).call(this);
  document.addEventListener("mousedown", __privateGet2(this, _onDocumentClick), {
    once: true
  });
  document.addEventListener("keydown", __privateGet2(this, _onKeyDown), { once: true });
}, "onContextMenu_fn");
_onDocumentClick = /* @__PURE__ */ new WeakMap();
_onKeyDown = /* @__PURE__ */ new WeakMap();
_onMenuClick = /* @__PURE__ */ new WeakMap();
MediaContextMenu.getTemplateHTML = getTemplateHTML$1;
if (!GlobalThis.customElements.get("media-context-menu")) {
  GlobalThis.customElements.define("media-context-menu", MediaContextMenu);
}
function getTemplateHTML(_attrs) {
  return (
    /*html*/
    `
    ${MediaChromeMenuItem.getTemplateHTML.call(this, _attrs)}
    <style>
        ::slotted(*) {
            color: var(--media-text-color, white);
            text-decoration: none;
            border: none;
            background: none;
            cursor: pointer;
            padding: 0;
            min-height: var(--media-control-height, 24px);
        }
    </style>
  `
  );
}
__name(getTemplateHTML, "getTemplateHTML");
const _MediaContextMenuItem = class _MediaContextMenuItem extends MediaChromeMenuItem {
};
__name(_MediaContextMenuItem, "MediaContextMenuItem");
let MediaContextMenuItem = _MediaContextMenuItem;
MediaContextMenuItem.shadowRootOptions = { mode: "open" };
MediaContextMenuItem.getTemplateHTML = getTemplateHTML;
if (!GlobalThis.customElements.get("media-context-menu-item")) {
  GlobalThis.customElements.define(
    "media-context-menu-item",
    MediaContextMenuItem
  );
}
var Je = /* @__PURE__ */ __name((t2) => {
  throw TypeError(t2);
}, "Je");
var he = /* @__PURE__ */ __name((t2, a, e2) => a.has(t2) || Je("Cannot " + e2), "he");
var u$1 = /* @__PURE__ */ __name((t2, a, e2) => (he(t2, a, "read from private field"), e2 ? e2.call(t2) : a.get(t2)), "u$1"), E$2 = /* @__PURE__ */ __name((t2, a, e2) => a.has(t2) ? Je("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(t2) : a.set(t2, e2), "E$2"), C = /* @__PURE__ */ __name((t2, a, e2, i2) => (he(t2, a, "write to private field"), a.set(t2, e2), e2), "C"), p$1 = /* @__PURE__ */ __name((t2, a, e2) => (he(t2, a, "access private method"), e2), "p$1");
var F = (_m = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent(a) {
    return true;
  }
}, __name(_m, "F"), _m);
if (typeof DocumentFragment == "undefined") {
  const _t3 = class _t3 extends F {
  };
  __name(_t3, "t");
  let t2 = _t3;
  globalThis.DocumentFragment = t2;
}
var G = (_n = class extends F {
}, __name(_n, "G"), _n), ge$1 = (_o = class extends F {
}, __name(_o, "ge"), _o), Ut = { get(t2) {
}, define(t2, a, e2) {
}, getName(t2) {
  return null;
}, upgrade(t2) {
}, whenDefined(t2) {
  return Promise.resolve(G);
} }, j, fe$1 = (_p = class {
  constructor(a, e2 = {}) {
    E$2(this, j);
    C(this, j, e2 == null ? void 0 : e2.detail);
  }
  get detail() {
    return u$1(this, j);
  }
  initCustomEvent() {
  }
}, __name(_p, "fe"), _p);
j = /* @__PURE__ */ new WeakMap();
function Vt(t2, a) {
  return new G();
}
__name(Vt, "Vt");
var et = { document: { createElement: Vt }, DocumentFragment, customElements: Ut, CustomEvent: fe$1, EventTarget: F, HTMLElement: G, HTMLVideoElement: ge$1 }, tt = typeof window == "undefined" || typeof globalThis.customElements == "undefined", k = tt ? et : globalThis, P$1 = tt ? et.document : globalThis.document;
function at(t2) {
  let a = "";
  return Object.entries(t2).forEach(([e2, i2]) => {
    i2 != null && (a += `${re$1(e2)}: ${i2}; `);
  }), a ? a.trim() : void 0;
}
__name(at, "at");
function re$1(t2) {
  return t2.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
__name(re$1, "re$1");
function oe$1(t2) {
  return t2.replace(/[-_]([a-z])/g, (a, e2) => e2.toUpperCase());
}
__name(oe$1, "oe$1");
function y(t2) {
  if (t2 == null) return;
  let a = +t2;
  return Number.isNaN(a) ? void 0 : a;
}
__name(y, "y");
function ye$1(t2) {
  let a = Bt(t2).toString();
  return a ? "?" + a : "";
}
__name(ye$1, "ye$1");
function Bt(t2) {
  let a = {};
  for (let e2 in t2) t2[e2] != null && (a[e2] = t2[e2]);
  return new URLSearchParams(a);
}
__name(Bt, "Bt");
var ve = /* @__PURE__ */ __name((t2, a) => !t2 || !a ? false : t2.contains(a) ? true : ve(t2, a.getRootNode().host), "ve");
var rt = "mux.com", Ht = /* @__PURE__ */ __name(() => {
  try {
    return "3.9.2";
  } catch {
  }
  return "UNKNOWN";
}, "Ht"), Kt = Ht(), se$1 = /* @__PURE__ */ __name(() => Kt, "se$1"), ot = /* @__PURE__ */ __name((t2, { token: a, customDomain: e2 = rt, thumbnailTime: i2, programTime: r10 } = {}) => {
  var l2;
  let n2 = a == null ? i2 : void 0, { aud: d2 } = (l2 = ee$2(a)) != null ? l2 : {};
  if (!(a && d2 !== "t")) return `https://image.${e2}/${t2}/thumbnail.webp${ye$1({ token: a, time: n2, program_time: r10 })}`;
}, "ot"), nt = /* @__PURE__ */ __name((t2, { token: a, customDomain: e2 = rt, programStartTime: i2, programEndTime: r10 } = {}) => {
  var d2;
  let { aud: n2 } = (d2 = ee$2(a)) != null ? d2 : {};
  if (!(a && n2 !== "s")) return `https://image.${e2}/${t2}/storyboard.vtt${ye$1({ token: a, format: "webp", program_start_time: i2, program_end_time: r10 })}`;
}, "nt"), z = /* @__PURE__ */ __name((t2) => {
  if (t2) {
    if ([_$1.LIVE, _$1.ON_DEMAND].includes(t2)) return t2;
    if (t2 != null && t2.includes("live")) return _$1.LIVE;
  }
}, "z");
var $t = { crossorigin: "crossOrigin", playsinline: "playsInline" };
function st(t2) {
  var a;
  return (a = $t[t2]) != null ? a : oe$1(t2);
}
__name(st, "st");
var D, U, v, ne$1 = (_q = class {
  constructor(a, e2) {
    E$2(this, D);
    E$2(this, U);
    E$2(this, v, []);
    C(this, D, a), C(this, U, e2);
  }
  [Symbol.iterator]() {
    return u$1(this, v).values();
  }
  get length() {
    return u$1(this, v).length;
  }
  get value() {
    var a;
    return (a = u$1(this, v).join(" ")) != null ? a : "";
  }
  set value(a) {
    var e2;
    a !== this.value && (C(this, v, []), this.add(...(e2 = a == null ? void 0 : a.split(" ")) != null ? e2 : []));
  }
  toString() {
    return this.value;
  }
  item(a) {
    return u$1(this, v)[a];
  }
  values() {
    return u$1(this, v).values();
  }
  keys() {
    return u$1(this, v).keys();
  }
  forEach(a) {
    u$1(this, v).forEach(a);
  }
  add(...a) {
    var e2, i2;
    a.forEach((r10) => {
      this.contains(r10) || u$1(this, v).push(r10);
    }), !(this.value === "" && !((e2 = u$1(this, D)) != null && e2.hasAttribute(`${u$1(this, U)}`))) && ((i2 = u$1(this, D)) == null || i2.setAttribute(`${u$1(this, U)}`, `${this.value}`));
  }
  remove(...a) {
    var e2;
    a.forEach((i2) => {
      u$1(this, v).splice(u$1(this, v).indexOf(i2), 1);
    }), (e2 = u$1(this, D)) == null || e2.setAttribute(`${u$1(this, U)}`, `${this.value}`);
  }
  contains(a) {
    return u$1(this, v).includes(a);
  }
  toggle(a, e2) {
    return typeof e2 != "undefined" ? e2 ? (this.add(a), true) : (this.remove(a), false) : this.contains(a) ? (this.remove(a), false) : (this.add(a), true);
  }
  replace(a, e2) {
    this.remove(a), this.add(e2);
  }
}, __name(_q, "ne"), _q);
D = /* @__PURE__ */ new WeakMap(), U = /* @__PURE__ */ new WeakMap(), v = /* @__PURE__ */ new WeakMap();
var dt = `[mux-player ${se$1()}]`;
function x$1(...t2) {
  console.warn(dt, ...t2);
}
__name(x$1, "x$1");
function T(...t2) {
  console.error(dt, ...t2);
}
__name(T, "T");
function Te(t2) {
  var e2;
  let a = (e2 = t2.message) != null ? e2 : "";
  t2.context && (a += ` ${t2.context}`), t2.file && (a += ` ${x$4("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t2.file}`), x$1(a);
}
__name(Te, "Te");
var g$1 = { AUTOPLAY: "autoplay", CROSSORIGIN: "crossorigin", LOOP: "loop", MUTED: "muted", PLAYSINLINE: "playsinline", PRELOAD: "preload" }, N = { VOLUME: "volume", PLAYBACKRATE: "playbackrate", MUTED: "muted" }, ut = Object.freeze({ length: 0, start(t2) {
  let a = t2 >>> 0;
  if (a >= this.length) throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${a}) is greater than or equal to the maximum bound (${this.length}).`);
  return 0;
}, end(t2) {
  let a = t2 >>> 0;
  if (a >= this.length) throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${a}) is greater than or equal to the maximum bound (${this.length}).`);
  return 0;
} }), Yt = Object.values(g$1).filter((t2) => g$1.PLAYSINLINE !== t2), Wt = Object.values(N), Zt = [...Yt, ...Wt], Ae = (_r = class extends k.HTMLElement {
  static get observedAttributes() {
    return Zt;
  }
  constructor() {
    super();
  }
  attributeChangedCallback(a, e2, i2) {
    var r10, n2;
    switch (a) {
      case N.MUTED: {
        this.media && (this.media.muted = i2 != null, this.media.defaultMuted = i2 != null);
        return;
      }
      case N.VOLUME: {
        let d2 = (r10 = y(i2)) != null ? r10 : 1;
        this.media && (this.media.volume = d2);
        return;
      }
      case N.PLAYBACKRATE: {
        let d2 = (n2 = y(i2)) != null ? n2 : 1;
        this.media && (this.media.playbackRate = d2, this.media.defaultPlaybackRate = d2);
        return;
      }
    }
  }
  play() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.play()) != null ? e2 : Promise.reject();
  }
  pause() {
    var a;
    (a = this.media) == null || a.pause();
  }
  load() {
    var a;
    (a = this.media) == null || a.load();
  }
  get media() {
    var a;
    return (a = this.shadowRoot) == null ? void 0 : a.querySelector("mux-video");
  }
  get audioTracks() {
    return this.media.audioTracks;
  }
  get videoTracks() {
    return this.media.videoTracks;
  }
  get audioRenditions() {
    return this.media.audioRenditions;
  }
  get videoRenditions() {
    return this.media.videoRenditions;
  }
  get paused() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.paused) != null ? e2 : true;
  }
  get duration() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.duration) != null ? e2 : NaN;
  }
  get ended() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.ended) != null ? e2 : false;
  }
  get buffered() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.buffered) != null ? e2 : ut;
  }
  get seekable() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.seekable) != null ? e2 : ut;
  }
  get readyState() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.readyState) != null ? e2 : 0;
  }
  get videoWidth() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.videoWidth) != null ? e2 : 0;
  }
  get videoHeight() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.videoHeight) != null ? e2 : 0;
  }
  get currentSrc() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.currentSrc) != null ? e2 : "";
  }
  get currentTime() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.currentTime) != null ? e2 : 0;
  }
  set currentTime(a) {
    this.media && (this.media.currentTime = Number(a));
  }
  get volume() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.volume) != null ? e2 : 1;
  }
  set volume(a) {
    this.media && (this.media.volume = Number(a));
  }
  get playbackRate() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.playbackRate) != null ? e2 : 1;
  }
  set playbackRate(a) {
    this.media && (this.media.playbackRate = Number(a));
  }
  get defaultPlaybackRate() {
    var a;
    return (a = y(this.getAttribute(N.PLAYBACKRATE))) != null ? a : 1;
  }
  set defaultPlaybackRate(a) {
    a != null ? this.setAttribute(N.PLAYBACKRATE, `${a}`) : this.removeAttribute(N.PLAYBACKRATE);
  }
  get crossOrigin() {
    return X(this, g$1.CROSSORIGIN);
  }
  set crossOrigin(a) {
    this.setAttribute(g$1.CROSSORIGIN, `${a}`);
  }
  get autoplay() {
    return X(this, g$1.AUTOPLAY) != null;
  }
  set autoplay(a) {
    a ? this.setAttribute(g$1.AUTOPLAY, typeof a == "string" ? a : "") : this.removeAttribute(g$1.AUTOPLAY);
  }
  get loop() {
    return X(this, g$1.LOOP) != null;
  }
  set loop(a) {
    a ? this.setAttribute(g$1.LOOP, "") : this.removeAttribute(g$1.LOOP);
  }
  get muted() {
    var a, e2;
    return (e2 = (a = this.media) == null ? void 0 : a.muted) != null ? e2 : false;
  }
  set muted(a) {
    this.media && (this.media.muted = !!a);
  }
  get defaultMuted() {
    return X(this, g$1.MUTED) != null;
  }
  set defaultMuted(a) {
    a ? this.setAttribute(g$1.MUTED, "") : this.removeAttribute(g$1.MUTED);
  }
  get playsInline() {
    return X(this, g$1.PLAYSINLINE) != null;
  }
  set playsInline(a) {
    T("playsInline is set to true by default and is not currently supported as a setter.");
  }
  get preload() {
    return this.media ? this.media.preload : this.getAttribute("preload");
  }
  set preload(a) {
    ["", "none", "metadata", "auto"].includes(a) ? this.setAttribute(g$1.PRELOAD, a) : this.removeAttribute(g$1.PRELOAD);
  }
}, __name(_r, "Ae"), _r);
function X(t2, a) {
  return t2.media ? t2.media.getAttribute(a) : t2.getAttribute(a);
}
__name(X, "X");
var Ce = Ae;
var mt = `:host {
  --media-control-display: var(--controls);
  --media-loading-indicator-display: var(--loading-indicator);
  --media-dialog-display: var(--dialog);
  --media-play-button-display: var(--play-button);
  --media-live-button-display: var(--live-button);
  --media-seek-backward-button-display: var(--seek-backward-button);
  --media-seek-forward-button-display: var(--seek-forward-button);
  --media-mute-button-display: var(--mute-button);
  --media-captions-button-display: var(--captions-button);
  --media-captions-menu-button-display: var(--captions-menu-button, var(--media-captions-button-display));
  --media-rendition-menu-button-display: var(--rendition-menu-button);
  --media-audio-track-menu-button-display: var(--audio-track-menu-button);
  --media-airplay-button-display: var(--airplay-button);
  --media-pip-button-display: var(--pip-button);
  --media-fullscreen-button-display: var(--fullscreen-button);
  --media-cast-button-display: var(--cast-button, var(--_cast-button-drm-display));
  --media-playback-rate-button-display: var(--playback-rate-button);
  --media-playback-rate-menu-button-display: var(--playback-rate-menu-button);
  --media-volume-range-display: var(--volume-range);
  --media-time-range-display: var(--time-range);
  --media-time-display-display: var(--time-display);
  --media-duration-display-display: var(--duration-display);
  --media-title-display-display: var(--title-display);

  display: inline-block;
  line-height: 0;
  width: 100%;
}

a {
  color: #fff;
  font-size: 0.9em;
  text-decoration: underline;
}

media-theme {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  direction: ltr;
}

media-poster-image {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
}

media-poster-image:not([src]):not([placeholdersrc]) {
  display: none;
}

::part(top),
[part~='top'] {
  --media-control-display: var(--controls, var(--top-controls));
  --media-play-button-display: var(--play-button, var(--top-play-button));
  --media-live-button-display: var(--live-button, var(--top-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--top-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--top-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--top-mute-button));
  --media-captions-button-display: var(--captions-button, var(--top-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--top-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--top-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--top-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--top-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--top-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--top-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--top-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--top-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --captions-menu-button,
    var(--media-playback-rate-button-display, var(--top-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--top-volume-range));
  --media-time-range-display: var(--time-range, var(--top-time-range));
  --media-time-display-display: var(--time-display, var(--top-time-display));
  --media-duration-display-display: var(--duration-display, var(--top-duration-display));
  --media-title-display-display: var(--title-display, var(--top-title-display));
}

::part(center),
[part~='center'] {
  --media-control-display: var(--controls, var(--center-controls));
  --media-play-button-display: var(--play-button, var(--center-play-button));
  --media-live-button-display: var(--live-button, var(--center-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--center-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--center-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--center-mute-button));
  --media-captions-button-display: var(--captions-button, var(--center-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--center-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--center-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--center-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--center-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--center-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--center-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--center-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--center-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--center-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--center-volume-range));
  --media-time-range-display: var(--time-range, var(--center-time-range));
  --media-time-display-display: var(--time-display, var(--center-time-display));
  --media-duration-display-display: var(--duration-display, var(--center-duration-display));
}

::part(bottom),
[part~='bottom'] {
  --media-control-display: var(--controls, var(--bottom-controls));
  --media-play-button-display: var(--play-button, var(--bottom-play-button));
  --media-live-button-display: var(--live-button, var(--bottom-live-button));
  --media-seek-backward-button-display: var(--seek-backward-button, var(--bottom-seek-backward-button));
  --media-seek-forward-button-display: var(--seek-forward-button, var(--bottom-seek-forward-button));
  --media-mute-button-display: var(--mute-button, var(--bottom-mute-button));
  --media-captions-button-display: var(--captions-button, var(--bottom-captions-button));
  --media-captions-menu-button-display: var(
    --captions-menu-button,
    var(--media-captions-button-display, var(--bottom-captions-menu-button))
  );
  --media-rendition-menu-button-display: var(--rendition-menu-button, var(--bottom-rendition-menu-button));
  --media-audio-track-menu-button-display: var(--audio-track-menu-button, var(--bottom-audio-track-menu-button));
  --media-airplay-button-display: var(--airplay-button, var(--bottom-airplay-button));
  --media-pip-button-display: var(--pip-button, var(--bottom-pip-button));
  --media-fullscreen-button-display: var(--fullscreen-button, var(--bottom-fullscreen-button));
  --media-cast-button-display: var(--cast-button, var(--bottom-cast-button, var(--_cast-button-drm-display)));
  --media-playback-rate-button-display: var(--playback-rate-button, var(--bottom-playback-rate-button));
  --media-playback-rate-menu-button-display: var(
    --playback-rate-menu-button,
    var(--media-playback-rate-button-display, var(--bottom-playback-rate-menu-button))
  );
  --media-volume-range-display: var(--volume-range, var(--bottom-volume-range));
  --media-time-range-display: var(--time-range, var(--bottom-time-range));
  --media-time-display-display: var(--time-display, var(--bottom-time-display));
  --media-duration-display-display: var(--duration-display, var(--bottom-duration-display));
  --media-title-display-display: var(--title-display, var(--bottom-title-display));
}

:host([no-tooltips]) {
  --media-tooltip-display: none;
}
`;
var q = /* @__PURE__ */ new WeakMap(), _e2 = (_s = class {
  constructor(a, e2) {
    this.element = a;
    this.type = e2;
    this.element.addEventListener(this.type, this);
    let i2 = q.get(this.element);
    i2 && i2.set(this.type, this);
  }
  set(a) {
    if (typeof a == "function") this.handleEvent = a.bind(this.element);
    else if (typeof a == "object" && typeof a.handleEvent == "function") this.handleEvent = a.handleEvent.bind(a);
    else {
      this.element.removeEventListener(this.type, this);
      let e2 = q.get(this.element);
      e2 && e2.delete(this.type);
    }
  }
  static for(a) {
    q.has(a.element) || q.set(a.element, /* @__PURE__ */ new Map());
    let e2 = a.attributeName.slice(2), i2 = q.get(a.element);
    return i2 && i2.has(e2) ? i2.get(e2) : new _s(a.element, e2);
  }
}, __name(_s, "t"), _s);
function zt(t2, a) {
  return t2 instanceof AttrPart && t2.attributeName.startsWith("on") ? (_e2.for(t2).set(a), t2.element.removeAttributeNS(t2.attributeNamespace, t2.attributeName), true) : false;
}
__name(zt, "zt");
function Xt(t2, a) {
  return a instanceof de$1 && t2 instanceof ChildNodePart ? (a.renderInto(t2), true) : false;
}
__name(Xt, "Xt");
function qt(t2, a) {
  return a instanceof DocumentFragment && t2 instanceof ChildNodePart ? (a.childNodes.length && t2.replace(...a.childNodes), true) : false;
}
__name(qt, "qt");
function Qt(t2, a) {
  if (t2 instanceof AttrPart) {
    let e2 = t2.attributeNamespace, i2 = t2.element.getAttributeNS(e2, t2.attributeName);
    return String(a) !== i2 && (t2.value = String(a)), true;
  }
  return t2.value = String(a), true;
}
__name(Qt, "Qt");
function Jt(t2, a) {
  if (t2 instanceof AttrPart && a instanceof Element) {
    let e2 = t2.element;
    return e2[t2.attributeName] !== a && (t2.element.removeAttributeNS(t2.attributeNamespace, t2.attributeName), e2[t2.attributeName] = a), true;
  }
  return false;
}
__name(Jt, "Jt");
function ea(t2, a) {
  if (typeof a == "boolean" && t2 instanceof AttrPart) {
    let e2 = t2.attributeNamespace, i2 = t2.element.hasAttributeNS(e2, t2.attributeName);
    return a !== i2 && (t2.booleanValue = a), true;
  }
  return false;
}
__name(ea, "ea");
function ta(t2, a) {
  return a === false && t2 instanceof ChildNodePart ? (t2.replace(""), true) : false;
}
__name(ta, "ta");
function aa(t2, a) {
  Jt(t2, a) || ea(t2, a) || zt(t2, a) || ta(t2, a) || Xt(t2, a) || qt(t2, a) || Qt(t2, a);
}
__name(aa, "aa");
var ke = /* @__PURE__ */ new Map(), ct = /* @__PURE__ */ new WeakMap(), pt = /* @__PURE__ */ new WeakMap(), de$1 = (_t2 = class {
  constructor(a, e2, i2) {
    this.strings = a;
    this.values = e2;
    this.processor = i2;
    this.stringsKey = this.strings.join("");
  }
  get template() {
    if (ke.has(this.stringsKey)) return ke.get(this.stringsKey);
    {
      let a = P$1.createElement("template"), e2 = this.strings.length - 1;
      return a.innerHTML = this.strings.reduce((i2, r10, n2) => i2 + r10 + (n2 < e2 ? `{{ ${n2} }}` : ""), ""), ke.set(this.stringsKey, a), a;
    }
  }
  renderInto(a) {
    var r10;
    let e2 = this.template;
    if (ct.get(a) !== e2) {
      ct.set(a, e2);
      let n2 = new TemplateInstance(e2, this.values, this.processor);
      pt.set(a, n2), a instanceof ChildNodePart ? a.replace(...n2.children) : a.appendChild(n2);
      return;
    }
    let i2 = pt.get(a);
    (r10 = i2 == null ? void 0 : i2.update) == null || r10.call(i2, this.values);
  }
}, __name(_t2, "de"), _t2), ia = { processCallback(t2, a, e2) {
  var i2;
  if (e2) {
    for (let [r10, n2] of a) if (r10 in e2) {
      let d2 = (i2 = e2[r10]) != null ? i2 : "";
      aa(n2, d2);
    }
  }
} };
function Q(t2, ...a) {
  return new de$1(t2, a, ia);
}
__name(Q, "Q");
function bt(t2, a) {
  t2.renderInto(a);
}
__name(bt, "bt");
var oa = /* @__PURE__ */ __name((t2) => {
  let { tokens: a } = t2;
  return a.drm ? ":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }" : "";
}, "oa"), gt = /* @__PURE__ */ __name((t2) => Q`
  <style>
    ${oa(t2)}
    ${mt}
  </style>
  ${la(t2)}
`, "gt"), na = /* @__PURE__ */ __name((t2) => {
  let a = t2.hotKeys ? `${t2.hotKeys}` : "";
  return z(t2.streamType) === "live" && (a += " noarrowleft noarrowright"), a;
}, "na"), sa = { TOP: "top", CENTER: "center", BOTTOM: "bottom", LAYER: "layer", MEDIA_LAYER: "media-layer", POSTER_LAYER: "poster-layer", VERTICAL_LAYER: "vertical-layer", CENTERED_LAYER: "centered-layer", GESTURE_LAYER: "gesture-layer", CONTROLLER_LAYER: "controller", BUTTON: "button", RANGE: "range", THUMB: "thumb", DISPLAY: "display", CONTROL_BAR: "control-bar", MENU_BUTTON: "menu-button", MENU: "menu", MENU_ITEM: "menu-item", OPTION: "option", POSTER: "poster", LIVE: "live", PLAY: "play", PRE_PLAY: "pre-play", SEEK_BACKWARD: "seek-backward", SEEK_FORWARD: "seek-forward", MUTE: "mute", CAPTIONS: "captions", AIRPLAY: "airplay", PIP: "pip", FULLSCREEN: "fullscreen", CAST: "cast", PLAYBACK_RATE: "playback-rate", VOLUME: "volume", TIME: "time", TITLE: "title", AUDIO_TRACK: "audio-track", RENDITION: "rendition" }, da = Object.values(sa).join(", "), la = /* @__PURE__ */ __name((t2) => {
  var a, e2, i2, r10, n2, d2, l2, b2, S2, Y2, _2, A2, R2, $2, h2, ie2, W2, Z2, Ie2, Pe2, De2, Ue2, Ve2, Be2, He2, Ke2, $e2, Fe2, Ye2, We2, Ze2, Ge2, je2, ze2, Xe2, qe2, Qe2;
  return Q`
  <media-theme
    template="${t2.themeTemplate || false}"
    defaultstreamtype="${(a = t2.defaultStreamType) != null ? a : false}"
    hotkeys="${na(t2) || false}"
    nohotkeys="${t2.noHotKeys || !t2.hasSrc || false}"
    noautoseektolive="${!!((e2 = t2.streamType) != null && e2.includes(_$1.LIVE)) && t2.targetLiveWindow !== 0}"
    novolumepref="${t2.novolumepref || false}"
    nomutedpref="${t2.nomutedpref || false}"
    disabled="${!t2.hasSrc || t2.isDialogOpen}"
    audio="${(i2 = t2.audio) != null ? i2 : false}"
    style="${(r10 = at({ "--media-primary-color": t2.primaryColor, "--media-secondary-color": t2.secondaryColor, "--media-accent-color": t2.accentColor })) != null ? r10 : false}"
    defaultsubtitles="${!t2.defaultHiddenCaptions}"
    forwardseekoffset="${(n2 = t2.forwardSeekOffset) != null ? n2 : false}"
    backwardseekoffset="${(d2 = t2.backwardSeekOffset) != null ? d2 : false}"
    playbackrates="${(l2 = t2.playbackRates) != null ? l2 : false}"
    defaultshowremainingtime="${(b2 = t2.defaultShowRemainingTime) != null ? b2 : false}"
    defaultduration="${(S2 = t2.defaultDuration) != null ? S2 : false}"
    hideduration="${(Y2 = t2.hideDuration) != null ? Y2 : false}"
    title="${(_2 = t2.title) != null ? _2 : false}"
    videotitle="${(A2 = t2.videoTitle) != null ? A2 : false}"
    proudlydisplaymuxbadge="${(R2 = t2.proudlyDisplayMuxBadge) != null ? R2 : false}"
    exportparts="${da}"
    onclose="${t2.onCloseErrorDialog}"
    onfocusin="${t2.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      inert="${($2 = t2.noHotKeys) != null ? $2 : false}"
      target-live-window="${(h2 = t2.targetLiveWindow) != null ? h2 : false}"
      stream-type="${(ie2 = z(t2.streamType)) != null ? ie2 : false}"
      crossorigin="${(W2 = t2.crossOrigin) != null ? W2 : ""}"
      playsinline
      autoplay="${(Z2 = t2.autoplay) != null ? Z2 : false}"
      muted="${(Ie2 = t2.muted) != null ? Ie2 : false}"
      loop="${(Pe2 = t2.loop) != null ? Pe2 : false}"
      preload="${(De2 = t2.preload) != null ? De2 : false}"
      debug="${(Ue2 = t2.debug) != null ? Ue2 : false}"
      prefer-cmcd="${(Ve2 = t2.preferCmcd) != null ? Ve2 : false}"
      disable-tracking="${(Be2 = t2.disableTracking) != null ? Be2 : false}"
      disable-cookies="${(He2 = t2.disableCookies) != null ? He2 : false}"
      prefer-playback="${(Ke2 = t2.preferPlayback) != null ? Ke2 : false}"
      start-time="${t2.startTime != null ? t2.startTime : false}"
      beacon-collection-domain="${($e2 = t2.beaconCollectionDomain) != null ? $e2 : false}"
      player-init-time="${(Fe2 = t2.playerInitTime) != null ? Fe2 : false}"
      player-software-name="${(Ye2 = t2.playerSoftwareName) != null ? Ye2 : false}"
      player-software-version="${(We2 = t2.playerSoftwareVersion) != null ? We2 : false}"
      env-key="${(Ze2 = t2.envKey) != null ? Ze2 : false}"
      custom-domain="${(Ge2 = t2.customDomain) != null ? Ge2 : false}"
      src="${t2.src ? t2.src : t2.playbackId ? qr(t2) : false}"
      cast-src="${t2.src ? t2.src : t2.playbackId ? qr(t2) : false}"
      cast-receiver="${(je2 = t2.castReceiver) != null ? je2 : false}"
      drm-token="${(Xe2 = (ze2 = t2.tokens) == null ? void 0 : ze2.drm) != null ? Xe2 : false}"
      exportparts="video"
      disable-pseudo-ended="${(qe2 = t2.disablePseudoEnded) != null ? qe2 : false}"
    >
      ${t2.storyboard ? Q`<track label="thumbnails" default kind="metadata" src="${t2.storyboard}" />` : Q``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t2.poster ? t2.poster : false}"
        placeholdersrc="${(Qe2 = t2.placeholder) != null ? Qe2 : false}"
      ></media-poster-image>
    </slot>
  </media-theme>
`;
}, "la");
var vt = /* @__PURE__ */ __name((t2) => t2.charAt(0).toUpperCase() + t2.slice(1), "vt"), ua = /* @__PURE__ */ __name((t2, a = false) => {
  var e2, i2;
  if (t2.muxCode) {
    let r10 = vt((e2 = t2.errorCategory) != null ? e2 : "video"), n2 = V$1((i2 = t2.errorCategory) != null ? i2 : C$2.VIDEO);
    if (t2.muxCode === D$2.NETWORK_OFFLINE) return x$4("Your device appears to be offline", a);
    if (t2.muxCode === D$2.NETWORK_TOKEN_EXPIRED) return x$4("{category} URL has expired", a).format({ category: r10 });
    if ([D$2.NETWORK_TOKEN_SUB_MISMATCH, D$2.NETWORK_TOKEN_AUD_MISMATCH, D$2.NETWORK_TOKEN_AUD_MISSING, D$2.NETWORK_TOKEN_MALFORMED].includes(t2.muxCode)) return x$4("{category} URL is formatted incorrectly", a).format({ category: r10 });
    if (t2.muxCode === D$2.NETWORK_TOKEN_MISSING) return x$4("Invalid {categoryName} URL", a).format({ categoryName: n2 });
    if (t2.muxCode === D$2.NETWORK_NOT_FOUND) return x$4("{category} does not exist", a).format({ category: r10 });
    if (t2.muxCode === D$2.NETWORK_NOT_READY) {
      let d2 = t2.streamType === "live" ? "Live stream" : "Video";
      return x$4("{mediaType} is not currently available", a).format({ mediaType: d2 });
    }
  }
  if (t2.code) {
    if (t2.code === f$3.MEDIA_ERR_NETWORK) return x$4("Network Error", a);
    if (t2.code === f$3.MEDIA_ERR_DECODE) return x$4("Media Error", a);
    if (t2.code === f$3.MEDIA_ERR_SRC_NOT_SUPPORTED) return x$4("Source Not Supported", a);
  }
  return x$4("Error", a);
}, "ua"), ma = /* @__PURE__ */ __name((t2, a = false) => {
  var e2, i2;
  if (t2.muxCode) {
    let r10 = vt((e2 = t2.errorCategory) != null ? e2 : "video"), n2 = V$1((i2 = t2.errorCategory) != null ? i2 : C$2.VIDEO);
    return t2.muxCode === D$2.NETWORK_OFFLINE ? x$4("Check your internet connection and try reloading this video.", a) : t2.muxCode === D$2.NETWORK_TOKEN_EXPIRED ? x$4("The video’s secured {tokenNamePrefix}-token has expired.", a).format({ tokenNamePrefix: n2 }) : t2.muxCode === D$2.NETWORK_TOKEN_SUB_MISMATCH ? x$4("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.", a).format({ tokenNamePrefix: n2 }) : t2.muxCode === D$2.NETWORK_TOKEN_MALFORMED ? x$4("{category} URL is formatted incorrectly", a).format({ category: r10 }) : [D$2.NETWORK_TOKEN_AUD_MISMATCH, D$2.NETWORK_TOKEN_AUD_MISSING].includes(t2.muxCode) ? x$4("The {tokenNamePrefix}-token is formatted with incorrect information.", a).format({ tokenNamePrefix: n2 }) : [D$2.NETWORK_TOKEN_MISSING, D$2.NETWORK_INVALID_URL].includes(t2.muxCode) ? x$4("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.", a).format({ tokenNamePrefix: n2 }) : t2.muxCode === D$2.NETWORK_NOT_FOUND ? "" : t2.message;
  }
  return t2.code && (t2.code === f$3.MEDIA_ERR_NETWORK || t2.code === f$3.MEDIA_ERR_DECODE || t2.code === f$3.MEDIA_ERR_SRC_NOT_SUPPORTED), t2.message;
}, "ma"), Et = /* @__PURE__ */ __name((t2, a = false) => {
  let e2 = ua(t2, a).toString(), i2 = ma(t2, a).toString();
  return { title: e2, message: i2 };
}, "Et"), ca = /* @__PURE__ */ __name((t2) => {
  if (t2.muxCode) {
    if (t2.muxCode === D$2.NETWORK_TOKEN_EXPIRED) return "403-expired-token.md";
    if (t2.muxCode === D$2.NETWORK_TOKEN_MALFORMED) return "403-malformatted-token.md";
    if ([D$2.NETWORK_TOKEN_AUD_MISMATCH, D$2.NETWORK_TOKEN_AUD_MISSING].includes(t2.muxCode)) return "403-incorrect-aud-value.md";
    if (t2.muxCode === D$2.NETWORK_TOKEN_SUB_MISMATCH) return "403-playback-id-mismatch.md";
    if (t2.muxCode === D$2.NETWORK_TOKEN_MISSING) return "missing-signed-tokens.md";
    if (t2.muxCode === D$2.NETWORK_NOT_FOUND) return "404-not-found.md";
    if (t2.muxCode === D$2.NETWORK_NOT_READY) return "412-not-playable.md";
  }
  if (t2.code) {
    if (t2.code === f$3.MEDIA_ERR_NETWORK) return "";
    if (t2.code === f$3.MEDIA_ERR_DECODE) return "media-decode-error.md";
    if (t2.code === f$3.MEDIA_ERR_SRC_NOT_SUPPORTED) return "media-src-not-supported.md";
  }
  return "";
}, "ca"), Re = /* @__PURE__ */ __name((t2, a) => {
  let e2 = ca(t2);
  return { message: t2.message, context: t2.context, file: e2 };
}, "Re");
var Tt = `<template id="media-theme-gerwig">
  <style>
    @keyframes pre-play-hide {
      0% {
        transform: scale(1);
        opacity: 1;
      }

      30% {
        transform: scale(0.7);
      }

      100% {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    :host {
      --_primary-color: var(--media-primary-color, #fff);
      --_secondary-color: var(--media-secondary-color, transparent);
      --_accent-color: var(--media-accent-color, #fa50b5);
      --_text-color: var(--media-text-color, #000);

      --media-icon-color: var(--_primary-color);
      --media-control-background: var(--_secondary-color);
      --media-control-hover-background: var(--_accent-color);
      --media-time-buffered-color: rgba(255, 255, 255, 0.4);
      --media-preview-time-text-shadow: none;
      --media-control-height: 14px;
      --media-control-padding: 6px;
      --media-tooltip-container-margin: 6px;
      --media-tooltip-distance: 18px;

      color: var(--_primary-color);
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    :host([audio]) {
      --_secondary-color: var(--media-secondary-color, black);
      --media-preview-time-text-shadow: none;
    }

    :host([audio]) ::slotted([slot='media']) {
      height: 0px;
    }

    :host([audio]) media-loading-indicator {
      display: none;
    }

    :host([audio]) media-controller {
      background: transparent;
    }

    :host([audio]) media-controller::part(vertical-layer) {
      background: transparent;
    }

    :host([audio]) media-control-bar {
      width: 100%;
      background-color: var(--media-control-background);
    }

    /*
     * 0.433s is the transition duration for VTT Regions.
     * Borrowed here, so the captions don't move too fast.
     */
    media-controller {
      --media-webkit-text-track-transform: translateY(0) scale(0.98);
      --media-webkit-text-track-transition: transform 0.433s ease-out 0.3s;
    }
    media-controller:is([mediapaused], :not([userinactive])) {
      --media-webkit-text-track-transform: translateY(-50px) scale(0.98);
      --media-webkit-text-track-transition: transform 0.15s ease;
    }

    /*
     * CSS specific to iOS devices.
     * See: https://stackoverflow.com/questions/30102792/css-media-query-to-target-only-ios-devices/60220757#60220757
     */
    @supports (-webkit-touch-callout: none) {
      /* Disable subtitle adjusting for iOS Safari */
      media-controller[mediaisfullscreen] {
        --media-webkit-text-track-transform: unset;
        --media-webkit-text-track-transition: unset;
      }
    }

    media-time-range {
      --media-box-padding-left: 6px;
      --media-box-padding-right: 6px;
      --media-range-bar-color: var(--_accent-color);
      --media-time-range-buffered-color: var(--_primary-color);
      --media-range-track-color: transparent;
      --media-range-track-background: rgba(255, 255, 255, 0.4);
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_accent-color) 25%,
        var(--_accent-color)
      );
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-transform: scale(0);
      --media-range-thumb-transition: transform 0.3s;
      --media-range-thumb-opacity: 1;
      --media-preview-background: var(--_primary-color);
      --media-box-arrow-background: var(--_primary-color);
      --media-preview-thumbnail-border: 5px solid var(--_primary-color);
      --media-preview-border-radius: 5px;
      --media-text-color: var(--_text-color);
      --media-control-hover-background: transparent;
      --media-preview-chapter-text-shadow: none;
      color: var(--_accent-color);
      padding: 0 6px;
    }

    :host([audio]) media-time-range {
      --media-preview-time-padding: 1.5px 6px;
      --media-preview-box-margin: 0 0 -5px;
    }

    media-time-range:hover {
      --media-range-thumb-transform: scale(1);
    }

    media-preview-thumbnail {
      border-bottom-width: 0;
    }

    [part~='menu'] {
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      bottom: 50px;
      padding: 2.5px 10px;
    }

    [part~='menu']::part(indicator) {
      fill: var(--_accent-color);
    }

    [part~='menu']::part(menu-item) {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 6px 10px;
      min-height: 34px;
    }

    [part~='menu']::part(checked) {
      font-weight: 700;
    }

    media-captions-menu,
    media-rendition-menu,
    media-audio-track-menu,
    media-playback-rate-menu {
      position: absolute; /* ensure they don't take up space in DOM on load */
      --media-menu-background: var(--_primary-color);
      --media-menu-item-checked-background: transparent;
      --media-text-color: var(--_text-color);
      --media-menu-item-hover-background: transparent;
      --media-menu-item-hover-outline: var(--_accent-color) solid 1px;
    }

    media-rendition-menu {
      min-width: 140px;
    }

    /* The icon is a circle so make it 16px high instead of 14px for more balance. */
    media-audio-track-menu-button {
      --media-control-padding: 5px;
      --media-control-height: 16px;
    }

    media-playback-rate-menu-button {
      --media-control-padding: 6px 3px;
      min-width: 4.4ch;
    }

    media-playback-rate-menu {
      --media-menu-flex-direction: row;
      --media-menu-item-checked-background: var(--_accent-color);
      --media-menu-item-checked-indicator-display: none;
      margin-right: 6px;
      padding: 0;
      --media-menu-gap: 0.25em;
    }

    media-playback-rate-menu[part~='menu']::part(menu-item) {
      padding: 6px 6px 6px 8px;
    }

    media-playback-rate-menu[part~='menu']::part(checked) {
      color: #fff;
    }

    :host(:not([audio])) media-time-range {
      /* Adding px is required here for calc() */
      --media-range-padding: 0px;
      background: transparent;
      z-index: 10;
      height: 10px;
      bottom: -3px;
      width: 100%;
    }

    media-control-bar :is([role='button'], [role='switch'], button) {
      line-height: 0;
    }

    media-control-bar :is([part*='button'], [part*='range'], [part*='display']) {
      border-radius: 3px;
    }

    .spacer {
      flex-grow: 1;
      background-color: var(--media-control-background, rgba(20, 20, 30, 0.7));
    }

    media-control-bar[slot~='top-chrome'] {
      min-height: 42px;
      pointer-events: none;
    }

    media-control-bar {
      --gradient-steps:
        hsl(0 0% 0% / 0) 0%, hsl(0 0% 0% / 0.013) 8.1%, hsl(0 0% 0% / 0.049) 15.5%, hsl(0 0% 0% / 0.104) 22.5%,
        hsl(0 0% 0% / 0.175) 29%, hsl(0 0% 0% / 0.259) 35.3%, hsl(0 0% 0% / 0.352) 41.2%, hsl(0 0% 0% / 0.45) 47.1%,
        hsl(0 0% 0% / 0.55) 52.9%, hsl(0 0% 0% / 0.648) 58.8%, hsl(0 0% 0% / 0.741) 64.7%, hsl(0 0% 0% / 0.825) 71%,
        hsl(0 0% 0% / 0.896) 77.5%, hsl(0 0% 0% / 0.951) 84.5%, hsl(0 0% 0% / 0.987) 91.9%, hsl(0 0% 0%) 100%;
    }

    :host([title]) media-control-bar[slot='top-chrome']::before,
    :host([videotitle]) media-control-bar[slot='top-chrome']::before {
      content: '';
      position: absolute;
      width: 100%;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to top, var(--gradient-steps));
      opacity: 0.8;
      pointer-events: none;
    }

    :host(:not([audio])) media-control-bar[part~='bottom']::before {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      padding-bottom: min(100px, 25%);
      background: linear-gradient(to bottom, var(--gradient-steps));
      opacity: 0.8;
      z-index: 1;
      pointer-events: none;
    }

    media-control-bar[part~='bottom'] > * {
      z-index: 20;
    }

    media-control-bar[part~='bottom'] {
      padding: 6px 6px;
    }

    media-control-bar[slot~='top-chrome'] > * {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      position: relative;
    }

    media-controller::part(vertical-layer) {
      transition: background-color 1s;
    }

    media-controller:is([mediapaused], :not([userinactive]))::part(vertical-layer) {
      background-color: var(--controls-backdrop-color, var(--controls, transparent));
      transition: background-color 0.25s;
    }

    .center-controls {
      --media-button-icon-width: 100%;
      --media-button-icon-height: auto;
      --media-tooltip-display: none;
      pointer-events: none;
      width: 100%;
      display: flex;
      flex-flow: row;
      align-items: center;
      justify-content: center;
      paint-order: stroke;
      stroke: rgba(102, 102, 102, 1);
      stroke-width: 0.3px;
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    .center-controls media-play-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      --media-control-padding: 0;
      width: 40px;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    [breakpointsm] .center-controls media-play-button {
      width: 90px;
      height: 90px;
      border-radius: 50%;
      transition: background 0.4s;
      padding: 24px;
      --media-control-background: #000;
      --media-control-hover-background: var(--_accent-color);
    }

    .center-controls media-seek-backward-button,
    .center-controls media-seek-forward-button {
      --media-control-background: transparent;
      --media-control-hover-background: transparent;
      padding: 0;
      margin: 0 20px;
      width: max(33px, min(8%, 40px));
      text-shadow:
        0 0 2px rgb(0 0 0 / 0.25),
        0 0 6px rgb(0 0 0 / 0.25);
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback {
      display: grid;
      align-items: initial;
      justify-content: initial;
      height: 100%;
      overflow: hidden;
    }

    [breakpointsm]:not([audio]) .center-controls.pre-playback media-play-button {
      place-self: var(--_pre-playback-place, center);
      grid-area: 1 / 1;
      margin: 16px;
    }

    /* Show and hide controls or pre-playback state */

    [breakpointsm]:is([mediahasplayed], :not([mediapaused])):not([audio])
      .center-controls.pre-playback
      media-play-button {
      /* Using \`forwards\` would lead to a laggy UI after the animation got in the end state */
      animation: 0.3s linear pre-play-hide;
      opacity: 0;
      pointer-events: none;
    }

    .autoplay-unmute {
      --media-control-hover-background: transparent;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.25)) drop-shadow(0 0 6px rgb(0 0 0 / 0.25));
    }

    .autoplay-unmute-btn {
      --media-control-height: 16px;
      border-radius: 8px;
      background: #000;
      color: var(--_primary-color);
      display: flex;
      align-items: center;
      padding: 8px 16px;
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }

    .autoplay-unmute-btn:hover {
      background: var(--_accent-color);
    }

    [breakpointsm] .autoplay-unmute-btn {
      --media-control-height: 30px;
      padding: 14px 24px;
      font-size: 26px;
    }

    .autoplay-unmute-btn svg {
      margin: 0 6px 0 0;
    }

    [breakpointsm] .autoplay-unmute-btn svg {
      margin: 0 10px 0 0;
    }

    media-controller:not([audio]):not([mediahasplayed]) *:is(media-control-bar, media-time-range) {
      display: none;
    }

    media-error-dialog:not([mediaerrorcode]) {
      opacity: 0;
    }

    media-loading-indicator {
      --media-loading-icon-width: 100%;
      --media-button-icon-height: auto;
      display: var(--media-control-display, var(--media-loading-indicator-display, flex));
      pointer-events: none;
      position: absolute;
      width: min(15%, 150px);
      flex-flow: row;
      align-items: center;
      justify-content: center;
    }

    /* Intentionally don't target the div for transition but the children
     of the div. Prevents messing with media-chrome's autohide feature. */
    media-loading-indicator + div * {
      transition: opacity 0.15s;
      opacity: 1;
    }

    media-loading-indicator[medialoading]:not([mediapaused]) ~ div > * {
      opacity: 0;
      transition-delay: 400ms;
    }

    media-volume-range {
      width: min(100%, 100px);
      --media-range-padding-left: 10px;
      --media-range-padding-right: 10px;
      --media-range-thumb-width: 12px;
      --media-range-thumb-height: 12px;
      --media-range-thumb-background: radial-gradient(
        circle,
        #000 0%,
        #000 25%,
        var(--_primary-color) 25%,
        var(--_primary-color)
      );
      --media-control-hover-background: none;
    }

    media-time-display {
      white-space: nowrap;
    }

    /* Generic style for explicitly disabled controls */
    media-control-bar[part~='bottom'] [disabled],
    media-control-bar[part~='bottom'] [aria-disabled='true'] {
      opacity: 60%;
      cursor: not-allowed;
    }

    media-text-display {
      --media-font-size: 16px;
      --media-control-padding: 14px;
      font-weight: 500;
    }

    media-play-button.animated *:is(g, path) {
      transition: all 0.3s;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt1 {
      opacity: 0;
    }

    media-play-button.animated[mediapaused] .pause-icon-pt2 {
      transform-origin: center center;
      transform: scaleY(0);
    }

    media-play-button.animated[mediapaused] .play-icon {
      clip-path: inset(0 0 0 0);
    }

    media-play-button.animated:not([mediapaused]) .play-icon {
      clip-path: inset(0 0 0 100%);
    }

    media-seek-forward-button,
    media-seek-backward-button {
      --media-font-weight: 400;
    }

    .mute-icon {
      display: inline-block;
    }

    .mute-icon :is(path, g) {
      transition: opacity 0.5s;
    }

    .muted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='low'] :is(.volume-medium, .volume-high),
    media-mute-button[mediavolumelevel='medium'] :is(.volume-high) {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .unmuted {
      opacity: 0;
    }

    media-mute-button[mediavolumelevel='off'] .muted {
      opacity: 1;
    }

    /**
     * Our defaults for these buttons are to hide them at small sizes
     * users can override this with CSS
     */
    media-controller:not([breakpointsm]):not([audio]) {
      --bottom-play-button: none;
      --bottom-seek-backward-button: none;
      --bottom-seek-forward-button: none;
      --bottom-time-display: none;
      --bottom-playback-rate-menu-button: none;
      --bottom-pip-button: none;
    }

    [part='mux-badge'] {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 2;
      opacity: 0.6;
      transition:
        opacity 0.2s ease-in-out,
        bottom 0.2s ease-in-out;
    }

    [part='mux-badge']:hover {
      opacity: 1;
    }

    [part='mux-badge'] a {
      font-size: 14px;
      font-family: var(--_font-family);
      color: var(--_primary-color);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    [part='mux-badge'] .mux-badge-text {
      transition: opacity 0.5s ease-in-out;
      opacity: 0;
    }

    [part='mux-badge'] .mux-badge-logo {
      width: 40px;
      height: auto;
      display: inline-block;
    }

    [part='mux-badge'] .mux-badge-logo svg {
      width: 100%;
      height: 100%;
      fill: white;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'],
    media-controller:not([userinactive]) [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      transition: bottom 0.1s ease-in-out;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      transition: bottom 0.2s ease-in-out 0.62s;
    }

    media-controller:not([userinactive]) [part='mux-badge'] .mux-badge-text,
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] .mux-badge-text {
      opacity: 1;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] .mux-badge-text {
      opacity: 0;
    }

    media-controller[userinactive]:not([mediapaused]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive]):not([mediahasplayed]) [part='mux-badge'] {
      bottom: 10px;
    }

    media-controller:not([userinactive])[mediahasplayed] [part='mux-badge'],
    media-controller[mediahasplayed][mediapaused] [part='mux-badge'] {
      bottom: calc(28px + var(--media-control-height, 0px) + var(--media-control-padding, 0px) * 2);
    }
  </style>

  <template partial="TitleDisplay">
    <template if="videotitle">
      <template if="videotitle != true">
        <media-text-display part="top title display" class="title-display">{{videotitle}}</media-text-display>
      </template>
    </template>
    <template if="!videotitle">
      <template if="title">
        <media-text-display part="top title display" class="title-display">{{title}}</media-text-display>
      </template>
    </template>
  </template>

  <template partial="PlayButton">
    <media-play-button
      part="{{section ?? 'bottom'}} play button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      class="animated"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon">
        <g class="play-icon">
          <path
            d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
          />
        </g>
        <g class="pause-icon">
          <path
            class="pause-icon-pt1"
            d="M5.90709 0H2.96889C2.46857 0 2.06299 0.405585 2.06299 0.9059V13.0941C2.06299 13.5944 2.46857 14 2.96889 14H5.90709C6.4074 14 6.81299 13.5944 6.81299 13.0941V0.9059C6.81299 0.405585 6.4074 0 5.90709 0Z"
          />
          <path
            class="pause-icon-pt2"
            d="M15.1571 0H12.2189C11.7186 0 11.313 0.405585 11.313 0.9059V13.0941C11.313 13.5944 11.7186 14 12.2189 14H15.1571C15.6574 14 16.063 13.5944 16.063 13.0941V0.9059C16.063 0.405585 15.6574 0 15.1571 0Z"
          />
        </g>
      </svg>
    </media-play-button>
  </template>

  <template partial="PrePlayButton">
    <media-play-button
      part="{{section ?? 'center'}} play button pre-play"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="icon" style="transform: translate(3px, 0)">
        <path
          d="M15.5987 6.2911L3.45577 0.110898C2.83667 -0.204202 2.06287 0.189698 2.06287 0.819798V13.1802C2.06287 13.8103 2.83667 14.2042 3.45577 13.8891L15.5987 7.7089C16.2178 7.3938 16.2178 6.6061 15.5987 6.2911Z"
        />
      </svg>
    </media-play-button>
  </template>

  <template partial="SeekBackwardButton">
    <media-seek-backward-button
      seekoffset="{{backwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-backward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <path
          d="M3.65 2.07888L0.0864 6.7279C-0.0288 6.87812 -0.0288 7.12188 0.0864 7.2721L3.65 11.9211C3.7792 12.0896 4 11.9703 4 11.7321V2.26787C4 2.02968 3.7792 1.9104 3.65 2.07888Z"
        />
        <text transform="translate(6 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
          {{backwardseekoffset}}
        </text>
      </svg>
    </media-seek-backward-button>
  </template>

  <template partial="SeekForwardButton">
    <media-seek-forward-button
      seekoffset="{{forwardseekoffset}}"
      part="{{section ?? 'bottom'}} seek-forward button"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <svg viewBox="0 0 22 14" aria-hidden="true" slot="icon">
        <g>
          <text transform="translate(-1 12)" style="font-size: 14px; font-family: 'ArialMT', 'Arial'">
            {{forwardseekoffset}}
          </text>
          <path
            d="M18.35 11.9211L21.9136 7.2721C22.0288 7.12188 22.0288 6.87812 21.9136 6.7279L18.35 2.07888C18.2208 1.91041 18 2.02968 18 2.26787V11.7321C18 11.9703 18.2208 12.0896 18.35 11.9211Z"
          />
        </g>
      </svg>
    </media-seek-forward-button>
  </template>

  <template partial="MuteButton">
    <media-mute-button part="bottom mute button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" slot="icon" class="mute-icon" aria-hidden="true">
        <g class="unmuted">
          <path
            d="M6.76786 1.21233L3.98606 3.98924H1.19937C0.593146 3.98924 0.101743 4.51375 0.101743 5.1607V6.96412L0 6.99998L0.101743 7.03583V8.83926C0.101743 9.48633 0.593146 10.0108 1.19937 10.0108H3.98606L6.76773 12.7877C7.23561 13.2547 8 12.9007 8 12.2171V1.78301C8 1.09925 7.23574 0.745258 6.76786 1.21233Z"
          />
          <path
            class="volume-low"
            d="M10 3.54781C10.7452 4.55141 11.1393 5.74511 11.1393 6.99991C11.1393 8.25471 10.7453 9.44791 10 10.4515L10.7988 11.0496C11.6734 9.87201 12.1356 8.47161 12.1356 6.99991C12.1356 5.52821 11.6735 4.12731 10.7988 2.94971L10 3.54781Z"
          />
          <path
            class="volume-medium"
            d="M12.3778 2.40086C13.2709 3.76756 13.7428 5.35806 13.7428 7.00026C13.7428 8.64246 13.2709 10.233 12.3778 11.5992L13.2106 12.1484C14.2107 10.6185 14.739 8.83796 14.739 7.00016C14.739 5.16236 14.2107 3.38236 13.2106 1.85156L12.3778 2.40086Z"
          />
          <path
            class="volume-high"
            d="M15.5981 0.75L14.7478 1.2719C15.7937 2.9919 16.3468 4.9723 16.3468 7C16.3468 9.0277 15.7937 11.0082 14.7478 12.7281L15.5981 13.25C16.7398 11.3722 17.343 9.211 17.343 7C17.343 4.789 16.7398 2.6268 15.5981 0.75Z"
          />
        </g>
        <g class="muted">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.39976 4.98924H1.19937C1.19429 4.98924 1.17777 4.98961 1.15296 5.01609C1.1271 5.04369 1.10174 5.09245 1.10174 5.1607V8.83926C1.10174 8.90761 1.12714 8.95641 1.15299 8.984C1.17779 9.01047 1.1943 9.01084 1.19937 9.01084H4.39977L7 11.6066V2.39357L4.39976 4.98924ZM7.47434 1.92006C7.4743 1.9201 7.47439 1.92002 7.47434 1.92006V1.92006ZM6.76773 12.7877L3.98606 10.0108H1.19937C0.593146 10.0108 0.101743 9.48633 0.101743 8.83926V7.03583L0 6.99998L0.101743 6.96412V5.1607C0.101743 4.51375 0.593146 3.98924 1.19937 3.98924H3.98606L6.76786 1.21233C7.23574 0.745258 8 1.09925 8 1.78301V12.2171C8 12.9007 7.23561 13.2547 6.76773 12.7877Z"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.2677 9.30323C15.463 9.49849 15.7796 9.49849 15.9749 9.30323C16.1701 9.10796 16.1701 8.79138 15.9749 8.59612L14.2071 6.82841L15.9749 5.06066C16.1702 4.8654 16.1702 4.54882 15.9749 4.35355C15.7796 4.15829 15.4631 4.15829 15.2678 4.35355L13.5 6.1213L11.7322 4.35348C11.537 4.15822 11.2204 4.15822 11.0251 4.35348C10.8298 4.54874 10.8298 4.86532 11.0251 5.06058L12.7929 6.82841L11.0251 8.59619C10.8299 8.79146 10.8299 9.10804 11.0251 9.3033C11.2204 9.49856 11.537 9.49856 11.7323 9.3033L13.5 7.53552L15.2677 9.30323Z"
          />
        </g>
      </svg>
    </media-mute-button>
  </template>

  <template partial="PipButton">
    <media-pip-button part="bottom pip button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M15.9891 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.989C0 13.0996 0.9004 14 2.011 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0ZM17 11.9891C17 12.5465 16.5465 13 15.9891 13H2.011C1.4536 13 1.0001 12.5465 1.0001 11.9891V2.0109C1.0001 1.4535 1.4536 0.9999 2.011 0.9999H15.9891C16.5465 0.9999 17 1.4535 17 2.0109V11.9891Z"
        />
        <path
          d="M15.356 5.67822H8.19523C8.03253 5.67822 7.90063 5.81012 7.90063 5.97282V11.3836C7.90063 11.5463 8.03253 11.6782 8.19523 11.6782H15.356C15.5187 11.6782 15.6506 11.5463 15.6506 11.3836V5.97282C15.6506 5.81012 15.5187 5.67822 15.356 5.67822Z"
        />
      </svg>
    </media-pip-button>
  </template>

  <template partial="CaptionsMenu">
    <media-captions-menu-button part="bottom captions button">
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="on">
        <path
          d="M15.989 0H2.011C0.9004 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9004 14 2.011 14H15.989C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.989 0ZM4.2292 8.7639C4.5954 9.1902 5.0935 9.4031 5.7233 9.4031C6.1852 9.4031 6.5544 9.301 6.8302 9.0969C7.1061 8.8933 7.2863 8.614 7.3702 8.26H8.4322C8.3062 8.884 8.0093 9.3733 7.5411 9.7273C7.0733 10.0813 6.4703 10.2581 5.732 10.2581C5.108 10.2581 4.5699 10.1219 4.1168 9.8489C3.6637 9.5759 3.3141 9.1946 3.0685 8.7058C2.8224 8.2165 2.6994 7.6511 2.6994 7.009C2.6994 6.3611 2.8224 5.7927 3.0685 5.3034C3.3141 4.8146 3.6637 4.4323 4.1168 4.1559C4.5699 3.88 5.108 3.7418 5.732 3.7418C6.4703 3.7418 7.0733 3.922 7.5411 4.2818C8.0094 4.6422 8.3062 5.1461 8.4322 5.794H7.3702C7.2862 5.4283 7.106 5.1368 6.8302 4.921C6.5544 4.7052 6.1852 4.5968 5.7233 4.5968C5.0934 4.5968 4.5954 4.8116 4.2292 5.2404C3.8635 5.6696 3.6804 6.259 3.6804 7.009C3.6804 7.7531 3.8635 8.3381 4.2292 8.7639ZM11.0974 8.7639C11.4636 9.1902 11.9617 9.4031 12.5915 9.4031C13.0534 9.4031 13.4226 9.301 13.6984 9.0969C13.9743 8.8933 14.1545 8.614 14.2384 8.26H15.3004C15.1744 8.884 14.8775 9.3733 14.4093 9.7273C13.9415 10.0813 13.3385 10.2581 12.6002 10.2581C11.9762 10.2581 11.4381 10.1219 10.985 9.8489C10.5319 9.5759 10.1823 9.1946 9.9367 8.7058C9.6906 8.2165 9.5676 7.6511 9.5676 7.009C9.5676 6.3611 9.6906 5.7927 9.9367 5.3034C10.1823 4.8146 10.5319 4.4323 10.985 4.1559C11.4381 3.88 11.9762 3.7418 12.6002 3.7418C13.3385 3.7418 13.9415 3.922 14.4093 4.2818C14.8776 4.6422 15.1744 5.1461 15.3004 5.794H14.2384C14.1544 5.4283 13.9742 5.1368 13.6984 4.921C13.4226 4.7052 13.0534 4.5968 12.5915 4.5968C11.9616 4.5968 11.4636 4.8116 11.0974 5.2404C10.7317 5.6696 10.5486 6.259 10.5486 7.009C10.5486 7.7531 10.7317 8.3381 11.0974 8.7639Z"
        />
      </svg>
      <svg aria-hidden="true" viewBox="0 0 18 14" slot="off">
        <path
          d="M5.73219 10.258C5.10819 10.258 4.57009 10.1218 4.11699 9.8488C3.66389 9.5758 3.31429 9.1945 3.06869 8.7057C2.82259 8.2164 2.69958 7.651 2.69958 7.0089C2.69958 6.361 2.82259 5.7926 3.06869 5.3033C3.31429 4.8145 3.66389 4.4322 4.11699 4.1558C4.57009 3.8799 5.10819 3.7417 5.73219 3.7417C6.47049 3.7417 7.07348 3.9219 7.54128 4.2817C8.00958 4.6421 8.30638 5.146 8.43238 5.7939H7.37039C7.28639 5.4282 7.10618 5.1367 6.83039 4.9209C6.55459 4.7051 6.18538 4.5967 5.72348 4.5967C5.09358 4.5967 4.59559 4.8115 4.22939 5.2403C3.86369 5.6695 3.68058 6.2589 3.68058 7.0089C3.68058 7.753 3.86369 8.338 4.22939 8.7638C4.59559 9.1901 5.09368 9.403 5.72348 9.403C6.18538 9.403 6.55459 9.3009 6.83039 9.0968C7.10629 8.8932 7.28649 8.6139 7.37039 8.2599H8.43238C8.30638 8.8839 8.00948 9.3732 7.54128 9.7272C7.07348 10.0812 6.47049 10.258 5.73219 10.258Z"
        />
        <path
          d="M12.6003 10.258C11.9763 10.258 11.4382 10.1218 10.9851 9.8488C10.532 9.5758 10.1824 9.1945 9.93685 8.7057C9.69075 8.2164 9.56775 7.651 9.56775 7.0089C9.56775 6.361 9.69075 5.7926 9.93685 5.3033C10.1824 4.8145 10.532 4.4322 10.9851 4.1558C11.4382 3.8799 11.9763 3.7417 12.6003 3.7417C13.3386 3.7417 13.9416 3.9219 14.4094 4.2817C14.8777 4.6421 15.1745 5.146 15.3005 5.7939H14.2385C14.1545 5.4282 13.9743 5.1367 13.6985 4.9209C13.4227 4.7051 13.0535 4.5967 12.5916 4.5967C11.9617 4.5967 11.4637 4.8115 11.0975 5.2403C10.7318 5.6695 10.5487 6.2589 10.5487 7.0089C10.5487 7.753 10.7318 8.338 11.0975 8.7638C11.4637 9.1901 11.9618 9.403 12.5916 9.403C13.0535 9.403 13.4227 9.3009 13.6985 9.0968C13.9744 8.8932 14.1546 8.6139 14.2385 8.2599H15.3005C15.1745 8.8839 14.8776 9.3732 14.4094 9.7272C13.9416 10.0812 13.3386 10.258 12.6003 10.258Z"
        />
        <path
          d="M15.9891 1C16.5465 1 17 1.4535 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H2.0109C1.4535 13 1 12.5465 1 11.9891V2.0109C1 1.4535 1.4535 0.9999 2.0109 0.9999L15.9891 1ZM15.9891 0H2.0109C0.9003 0 0 0.9003 0 2.0109V11.9891C0 13.0997 0.9003 14 2.0109 14H15.9891C17.0997 14 18 13.0997 18 11.9891V2.0109C18 0.9003 17.0997 0 15.9891 0Z"
        />
      </svg>
    </media-captions-menu-button>
    <media-captions-menu
      hidden
      anchor="auto"
      part="bottom captions menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg></div
    ></media-captions-menu>
  </template>

  <template partial="AirplayButton">
    <media-airplay-button part="bottom airplay button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="icon">
        <path
          d="M16.1383 0H1.8618C0.8335 0 0 0.8335 0 1.8617V10.1382C0 11.1664 0.8335 12 1.8618 12H3.076C3.1204 11.9433 3.1503 11.8785 3.2012 11.826L4.004 11H1.8618C1.3866 11 1 10.6134 1 10.1382V1.8617C1 1.3865 1.3866 0.9999 1.8618 0.9999H16.1383C16.6135 0.9999 17.0001 1.3865 17.0001 1.8617V10.1382C17.0001 10.6134 16.6135 11 16.1383 11H13.9961L14.7989 11.826C14.8499 11.8785 14.8798 11.9432 14.9241 12H16.1383C17.1665 12 18.0001 11.1664 18.0001 10.1382V1.8617C18 0.8335 17.1665 0 16.1383 0Z"
        />
        <path
          d="M9.55061 8.21903C9.39981 8.06383 9.20001 7.98633 9.00011 7.98633C8.80021 7.98633 8.60031 8.06383 8.44951 8.21903L4.09771 12.697C3.62471 13.1838 3.96961 13.9998 4.64831 13.9998H13.3518C14.0304 13.9998 14.3754 13.1838 13.9023 12.697L9.55061 8.21903Z"
        />
      </svg>
    </media-airplay-button>
  </template>

  <template partial="FullscreenButton">
    <media-fullscreen-button part="bottom fullscreen button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M1.00745 4.39539L1.01445 1.98789C1.01605 1.43049 1.47085 0.978289 2.02835 0.979989L6.39375 0.992589L6.39665 -0.007411L2.03125 -0.020011C0.920646 -0.023211 0.0176463 0.874489 0.0144463 1.98509L0.00744629 4.39539H1.00745Z"
        />
        <path
          d="M17.0144 2.03431L17.0076 4.39541H18.0076L18.0144 2.03721C18.0176 0.926712 17.1199 0.0237125 16.0093 0.0205125L11.6439 0.0078125L11.641 1.00781L16.0064 1.02041C16.5638 1.02201 17.016 1.47681 17.0144 2.03431Z"
        />
        <path
          d="M16.9925 9.60498L16.9855 12.0124C16.9839 12.5698 16.5291 13.022 15.9717 13.0204L11.6063 13.0078L11.6034 14.0078L15.9688 14.0204C17.0794 14.0236 17.9823 13.1259 17.9855 12.0153L17.9925 9.60498H16.9925Z"
        />
        <path
          d="M0.985626 11.9661L0.992426 9.60498H-0.0074737L-0.0142737 11.9632C-0.0174737 13.0738 0.880226 13.9767 1.99083 13.98L6.35623 13.9926L6.35913 12.9926L1.99373 12.98C1.43633 12.9784 0.983926 12.5236 0.985626 11.9661Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M5.39655 -0.0200195L5.38955 2.38748C5.38795 2.94488 4.93315 3.39708 4.37565 3.39538L0.0103463 3.38278L0.00744629 4.38278L4.37285 4.39538C5.48345 4.39858 6.38635 3.50088 6.38965 2.39028L6.39665 -0.0200195H5.39655Z"
        />
        <path
          d="M12.6411 2.36891L12.6479 0.0078125H11.6479L11.6411 2.36601C11.6379 3.47651 12.5356 4.37951 13.6462 4.38271L18.0116 4.39531L18.0145 3.39531L13.6491 3.38271C13.0917 3.38111 12.6395 2.92641 12.6411 2.36891Z"
        />
        <path
          d="M12.6034 14.0204L12.6104 11.613C12.612 11.0556 13.0668 10.6034 13.6242 10.605L17.9896 10.6176L17.9925 9.61759L13.6271 9.60499C12.5165 9.60179 11.6136 10.4995 11.6104 11.6101L11.6034 14.0204H12.6034Z"
        />
        <path
          d="M5.359 11.6315L5.3522 13.9926H6.3522L6.359 11.6344C6.3622 10.5238 5.4645 9.62088 4.3539 9.61758L-0.0115043 9.60498L-0.0144043 10.605L4.351 10.6176C4.9084 10.6192 5.3607 11.074 5.359 11.6315Z"
        />
      </svg>
    </media-fullscreen-button>
  </template>

  <template partial="CastButton">
    <media-cast-button part="bottom cast button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="enter">
        <path
          d="M16.0072 0H2.0291C0.9185 0 0.0181 0.9003 0.0181 2.011V5.5009C0.357 5.5016 0.6895 5.5275 1.0181 5.5669V2.011C1.0181 1.4536 1.4716 1 2.029 1H16.0072C16.5646 1 17.0181 1.4536 17.0181 2.011V11.9891C17.0181 12.5465 16.5646 13 16.0072 13H8.4358C8.4746 13.3286 8.4999 13.6611 8.4999 13.9999H16.0071C17.1177 13.9999 18.018 13.0996 18.018 11.989V2.011C18.0181 0.9003 17.1178 0 16.0072 0ZM0 6.4999V7.4999C3.584 7.4999 6.5 10.4159 6.5 13.9999H7.5C7.5 9.8642 4.1357 6.4999 0 6.4999ZM0 8.7499V9.7499C2.3433 9.7499 4.25 11.6566 4.25 13.9999H5.25C5.25 11.1049 2.895 8.7499 0 8.7499ZM0.0181 11V14H3.0181C3.0181 12.3431 1.675 11 0.0181 11Z"
        />
      </svg>
      <svg viewBox="0 0 18 14" aria-hidden="true" slot="exit">
        <path
          d="M15.9891 0H2.01103C0.900434 0 3.35947e-05 0.9003 3.35947e-05 2.011V5.5009C0.338934 5.5016 0.671434 5.5275 1.00003 5.5669V2.011C1.00003 1.4536 1.45353 1 2.01093 1H15.9891C16.5465 1 17 1.4536 17 2.011V11.9891C17 12.5465 16.5465 13 15.9891 13H8.41773C8.45653 13.3286 8.48183 13.6611 8.48183 13.9999H15.989C17.0996 13.9999 17.9999 13.0996 17.9999 11.989V2.011C18 0.9003 17.0997 0 15.9891 0ZM-0.0180664 6.4999V7.4999C3.56593 7.4999 6.48193 10.4159 6.48193 13.9999H7.48193C7.48193 9.8642 4.11763 6.4999 -0.0180664 6.4999ZM-0.0180664 8.7499V9.7499C2.32523 9.7499 4.23193 11.6566 4.23193 13.9999H5.23193C5.23193 11.1049 2.87693 8.7499 -0.0180664 8.7499ZM3.35947e-05 11V14H3.00003C3.00003 12.3431 1.65693 11 3.35947e-05 11Z"
        />
        <path d="M2.15002 5.634C5.18352 6.4207 7.57252 8.8151 8.35282 11.8499H15.8501V2.1499H2.15002V5.634Z" />
      </svg>
    </media-cast-button>
  </template>

  <template partial="LiveButton">
    <media-live-button part="{{section ?? 'top'}} live button" disabled="{{disabled}}" aria-disabled="{{disabled}}">
      <span slot="text">Live</span>
    </media-live-button>
  </template>

  <template partial="PlaybackRateMenu">
    <media-playback-rate-menu-button part="bottom playback-rate button"></media-playback-rate-menu-button>
    <media-playback-rate-menu
      hidden
      anchor="auto"
      rates="{{playbackrates}}"
      exportparts="menu-item"
      part="bottom playback-rate menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-playback-rate-menu>
  </template>

  <template partial="VolumeRange">
    <media-volume-range
      part="bottom volume range"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-volume-range>
  </template>

  <template partial="TimeDisplay">
    <media-time-display
      remaining="{{defaultshowremainingtime}}"
      showduration="{{!hideduration}}"
      part="bottom time display"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    ></media-time-display>
  </template>

  <template partial="TimeRange">
    <media-time-range part="bottom time range" disabled="{{disabled}}" aria-disabled="{{disabled}}" exportparts="thumb">
      <media-preview-thumbnail slot="preview"></media-preview-thumbnail>
      <media-preview-chapter-display slot="preview"></media-preview-chapter-display>
      <media-preview-time-display slot="preview"></media-preview-time-display>
      <div slot="preview" part="arrow"></div>
    </media-time-range>
  </template>

  <template partial="AudioTrackMenu">
    <media-audio-track-menu-button part="bottom audio-track button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 16">
        <path d="M9 15A7 7 0 1 1 9 1a7 7 0 0 1 0 14Zm0 1A8 8 0 1 0 9 0a8 8 0 0 0 0 16Z" />
        <path
          d="M5.2 6.3a.5.5 0 0 1 .5.5v2.4a.5.5 0 1 1-1 0V6.8a.5.5 0 0 1 .5-.5Zm2.4-2.4a.5.5 0 0 1 .5.5v7.2a.5.5 0 0 1-1 0V4.4a.5.5 0 0 1 .5-.5ZM10 5.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.4-.8a.5.5 0 0 1 .5.5v5.6a.5.5 0 0 1-1 0V5.2a.5.5 0 0 1 .5-.5Z"
        />
      </svg>
    </media-audio-track-menu-button>
    <media-audio-track-menu
      hidden
      anchor="auto"
      part="bottom audio-track menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
      exportparts="menu-item"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            display: none;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-audio-track-menu>
  </template>

  <template partial="RenditionMenu">
    <media-rendition-menu-button part="bottom rendition button">
      <svg aria-hidden="true" slot="icon" viewBox="0 0 18 14">
        <path
          d="M2.25 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM9 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6.75 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
      </svg>
    </media-rendition-menu-button>
    <media-rendition-menu
      hidden
      anchor="auto"
      part="bottom rendition menu"
      disabled="{{disabled}}"
      aria-disabled="{{disabled}}"
    >
      <div slot="checked-indicator">
        <style>
          .indicator {
            position: relative;
            top: 1px;
            width: 0.9em;
            height: auto;
            fill: var(--_accent-color);
            margin-right: 5px;
          }

          [aria-checked='false'] .indicator {
            opacity: 0;
          }
        </style>
        <svg viewBox="0 0 14 18" class="indicator">
          <path
            d="M12.252 3.48c-.115.033-.301.161-.425.291-.059.063-1.407 1.815-2.995 3.894s-2.897 3.79-2.908 3.802c-.013.014-.661-.616-1.672-1.624-.908-.905-1.702-1.681-1.765-1.723-.401-.27-.783-.211-1.176.183a1.285 1.285 0 0 0-.261.342.582.582 0 0 0-.082.35c0 .165.01.205.08.35.075.153.213.296 2.182 2.271 1.156 1.159 2.17 2.159 2.253 2.222.189.143.338.196.539.194.203-.003.412-.104.618-.299.205-.193 6.7-8.693 6.804-8.903a.716.716 0 0 0 .085-.345c.01-.179.005-.203-.062-.339-.124-.252-.45-.531-.746-.639a.784.784 0 0 0-.469-.027"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </media-rendition-menu>
  </template>

  <template partial="MuxBadge">
    <div part="mux-badge">
      <a href="https://www.mux.com/player" target="_blank">
        <span class="mux-badge-text">Powered by</span>
        <div class="mux-badge-logo">
          <svg
            viewBox="0 0 1600 500"
            style="fill-rule: evenodd; clip-rule: evenodd; stroke-linejoin: round; stroke-miterlimit: 2"
          >
            <g>
              <path
                d="M994.287,93.486c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m0,-93.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,68.943 -56.09,125.033 -125.032,125.033c-68.942,-0 -125.03,-56.09 -125.03,-125.033l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486c-34.509,-0 -62.484,27.976 -62.484,62.486l0,187.511c0,137.853 112.149,250.003 249.999,250.003c137.851,-0 250.001,-112.15 250.001,-250.003l0,-187.511c0,-34.51 -27.976,-62.486 -62.485,-62.486"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M1537.51,468.511c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m-275.883,-218.509l-143.33,143.329c-24.402,24.402 -24.402,63.966 0,88.368c24.402,24.402 63.967,24.402 88.369,-0l143.33,-143.329l143.328,143.329c24.402,24.4 63.967,24.402 88.369,-0c24.403,-24.402 24.403,-63.966 0.001,-88.368l-143.33,-143.329l0.001,-0.004l143.329,-143.329c24.402,-24.402 24.402,-63.965 0,-88.367c-24.402,-24.402 -63.967,-24.402 -88.369,-0l-143.329,143.328l-143.329,-143.328c-24.402,-24.401 -63.967,-24.402 -88.369,-0c-24.402,24.402 -24.402,63.965 0,88.367l143.329,143.329l0,0.004Z"
                style="fill-rule: nonzero"
              ></path>
              <path
                d="M437.511,468.521c-17.121,-0 -31,-13.879 -31,-31c0,-17.121 13.879,-31 31,-31c17.121,-0 31,13.879 31,31c0,17.121 -13.879,31 -31,31m23.915,-463.762c-23.348,-9.672 -50.226,-4.327 -68.096,13.544l-143.331,143.329l-143.33,-143.329c-17.871,-17.871 -44.747,-23.216 -68.096,-13.544c-23.349,9.671 -38.574,32.455 -38.574,57.729l0,375.026c0,34.51 27.977,62.486 62.487,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-224.173l80.843,80.844c24.404,24.402 63.965,24.402 88.369,-0l80.843,-80.844l0,224.173c0,34.51 27.976,62.486 62.486,62.486c34.51,-0 62.486,-27.976 62.486,-62.486l0,-375.026c0,-25.274 -15.224,-48.058 -38.573,-57.729"
                style="fill-rule: nonzero"
              ></path>
            </g>
          </svg>
        </div>
      </a>
    </div>
  </template>

  <media-controller
    part="controller"
    defaultstreamtype="{{defaultstreamtype ?? 'on-demand'}}"
    breakpoints="sm:470"
    gesturesdisabled="{{disabled}}"
    hotkeys="{{hotkeys}}"
    nohotkeys="{{nohotkeys}}"
    novolumepref="{{novolumepref}}"
    audio="{{audio}}"
    noautoseektolive="{{noautoseektolive}}"
    defaultsubtitles="{{defaultsubtitles}}"
    defaultduration="{{defaultduration ?? false}}"
    keyboardforwardseekoffset="{{forwardseekoffset}}"
    keyboardbackwardseekoffset="{{backwardseekoffset}}"
    exportparts="layer, media-layer, poster-layer, vertical-layer, centered-layer, gesture-layer"
    style="--_pre-playback-place:{{preplaybackplace ?? 'center'}}"
  >
    <slot name="media" slot="media"></slot>
    <slot name="poster" slot="poster"></slot>

    <media-loading-indicator slot="centered-chrome" noautohide></media-loading-indicator>

    <template if="!audio">
      <media-error-dialog slot="dialog" noautohide></media-error-dialog>
      <!-- Pre-playback UI -->
      <!-- same for both on-demand and live -->
      <div slot="centered-chrome" class="center-controls pre-playback">
        <template if="!breakpointsm">{{>PlayButton section="center"}}</template>
        <template if="breakpointsm">{{>PrePlayButton section="center"}}</template>
      </div>

      <!-- Mux Badge -->
      <template if="proudlydisplaymuxbadge"> {{>MuxBadge}} </template>

      <!-- Autoplay centered unmute button -->
      <!--
        todo: figure out how show this with available state variables
        needs to show when:
        - autoplay is enabled
        - playback has been successful
        - audio is muted
        - in place / instead of the pre-plaback play button
        - not to show again after user has interacted with this button
          - OR user has interacted with the mute button in the control bar
      -->
      <!--
        There should be a >MuteButton to the left of the "Unmute" text, but a templating bug
        makes it appear even if commented out in the markup, add it back when code is un-commented
      -->
      <!-- <div slot="centered-chrome" class="autoplay-unmute">
        <div role="button" class="autoplay-unmute-btn">Unmute</div>
      </div> -->

      <template if="streamtype == 'on-demand'">
        <template if="breakpointsm">
          <media-control-bar part="control-bar top" slot="top-chrome">{{>TitleDisplay}} </media-control-bar>
        </template>
        {{>TimeRange}}
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>SeekBackwardButton}} {{>SeekForwardButton}} {{>TimeDisplay}} {{>MuteButton}}
          {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>PlaybackRateMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}}
          {{>CastButton}} {{>PipButton}} {{>FullscreenButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <media-control-bar part="control-bar top" slot="top-chrome">
          {{>LiveButton}}
          <template if="breakpointsm"> {{>TitleDisplay}} </template>
        </media-control-bar>
        <template if="targetlivewindow > 0">{{>TimeRange}}</template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="targetlivewindow > 0">{{>SeekBackwardButton}} {{>SeekForwardButton}}</template>
          {{>MuteButton}} {{>VolumeRange}}
          <div class="spacer"></div>
          {{>RenditionMenu}} {{>AudioTrackMenu}} {{>CaptionsMenu}} {{>AirplayButton}} {{>CastButton}} {{>PipButton}}
          {{>FullscreenButton}}
        </media-control-bar>
      </template>
    </template>

    <template if="audio">
      <template if="streamtype == 'on-demand'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}}
          <template if="breakpointsm"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          {{>MuteButton}}
          <template if="breakpointsm">{{>VolumeRange}}</template>
          {{>TimeDisplay}} {{>TimeRange}}
          <template if="breakpointsm">{{>PlaybackRateMenu}}</template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>

      <template if="streamtype == 'live'">
        <template if="title">
          <media-control-bar part="control-bar top">{{>TitleDisplay}}</media-control-bar>
        </template>
        <media-control-bar part="control-bar bottom">
          {{>PlayButton}} {{>LiveButton section="bottom"}} {{>MuteButton}}
          <template if="breakpointsm">
            {{>VolumeRange}}
            <template if="targetlivewindow > 0"> {{>SeekBackwardButton}} {{>SeekForwardButton}} </template>
          </template>
          <template if="targetlivewindow > 0"> {{>TimeDisplay}} {{>TimeRange}} </template>
          <template if="!targetlivewindow"><div class="spacer"></div></template>
          {{>AirplayButton}} {{>CastButton}}
        </media-control-bar>
      </template>
    </template>

    <slot></slot>
  </media-controller>
</template>
`;
var xe$1 = P$1.createElement("template");
"innerHTML" in xe$1 && (xe$1.innerHTML = Tt);
var At, Ct, me$1 = (_u = class extends MediaThemeElement {
}, __name(_u, "me"), _u);
me$1.template = (Ct = (At = xe$1.content) == null ? void 0 : At.children) == null ? void 0 : Ct[0];
k.customElements.get("media-theme-gerwig") || k.customElements.define("media-theme-gerwig", me$1);
var va = "gerwig", M$1 = { SRC: "src", POSTER: "poster" }, o$1 = { STYLE: "style", DEFAULT_HIDDEN_CAPTIONS: "default-hidden-captions", PRIMARY_COLOR: "primary-color", SECONDARY_COLOR: "secondary-color", ACCENT_COLOR: "accent-color", FORWARD_SEEK_OFFSET: "forward-seek-offset", BACKWARD_SEEK_OFFSET: "backward-seek-offset", PLAYBACK_TOKEN: "playback-token", THUMBNAIL_TOKEN: "thumbnail-token", STORYBOARD_TOKEN: "storyboard-token", FULLSCREEN_ELEMENT: "fullscreen-element", DRM_TOKEN: "drm-token", STORYBOARD_SRC: "storyboard-src", THUMBNAIL_TIME: "thumbnail-time", AUDIO: "audio", NOHOTKEYS: "nohotkeys", HOTKEYS: "hotkeys", PLAYBACK_RATES: "playbackrates", DEFAULT_SHOW_REMAINING_TIME: "default-show-remaining-time", DEFAULT_DURATION: "default-duration", TITLE: "title", VIDEO_TITLE: "video-title", PLACEHOLDER: "placeholder", THEME: "theme", DEFAULT_STREAM_TYPE: "default-stream-type", TARGET_LIVE_WINDOW: "target-live-window", EXTRA_SOURCE_PARAMS: "extra-source-params", NO_VOLUME_PREF: "no-volume-pref", NO_MUTED_PREF: "no-muted-pref", CAST_RECEIVER: "cast-receiver", NO_TOOLTIPS: "no-tooltips", PROUDLY_DISPLAY_MUX_BADGE: "proudly-display-mux-badge", DISABLE_PSEUDO_ENDED: "disable-pseudo-ended" }, Se = ["audio", "backwardseekoffset", "defaultduration", "defaultshowremainingtime", "defaultsubtitles", "noautoseektolive", "disabled", "exportparts", "forwardseekoffset", "hideduration", "hotkeys", "nohotkeys", "playbackrates", "defaultstreamtype", "streamtype", "style", "targetlivewindow", "template", "title", "videotitle", "novolumepref", "nomutedpref", "proudlydisplaymuxbadge"];
function Ea(t2, a) {
  var i2, r10;
  return { src: !t2.playbackId && t2.src, playbackId: t2.playbackId, hasSrc: !!t2.playbackId || !!t2.src || !!t2.currentSrc, poster: t2.poster, storyboard: t2.storyboard, storyboardSrc: t2.getAttribute(o$1.STORYBOARD_SRC), fullscreenElement: t2.getAttribute(o$1.FULLSCREEN_ELEMENT), placeholder: t2.getAttribute("placeholder"), themeTemplate: Aa(t2), thumbnailTime: !t2.tokens.thumbnail && t2.thumbnailTime, autoplay: t2.autoplay, crossOrigin: t2.crossOrigin, loop: t2.loop, noHotKeys: t2.hasAttribute(o$1.NOHOTKEYS), hotKeys: t2.getAttribute(o$1.HOTKEYS), muted: t2.muted, paused: t2.paused, preload: t2.preload, envKey: t2.envKey, preferCmcd: t2.preferCmcd, debug: t2.debug, disableTracking: t2.disableTracking, disableCookies: t2.disableCookies, tokens: t2.tokens, beaconCollectionDomain: t2.beaconCollectionDomain, maxResolution: t2.maxResolution, minResolution: t2.minResolution, programStartTime: t2.programStartTime, programEndTime: t2.programEndTime, assetStartTime: t2.assetStartTime, assetEndTime: t2.assetEndTime, renditionOrder: t2.renditionOrder, metadata: t2.metadata, playerInitTime: t2.playerInitTime, playerSoftwareName: t2.playerSoftwareName, playerSoftwareVersion: t2.playerSoftwareVersion, startTime: t2.startTime, preferPlayback: t2.preferPlayback, audio: t2.audio, defaultStreamType: t2.defaultStreamType, targetLiveWindow: t2.getAttribute(e.TARGET_LIVE_WINDOW), streamType: z(t2.getAttribute(e.STREAM_TYPE)), primaryColor: t2.getAttribute(o$1.PRIMARY_COLOR), secondaryColor: t2.getAttribute(o$1.SECONDARY_COLOR), accentColor: t2.getAttribute(o$1.ACCENT_COLOR), forwardSeekOffset: t2.forwardSeekOffset, backwardSeekOffset: t2.backwardSeekOffset, defaultHiddenCaptions: t2.defaultHiddenCaptions, defaultDuration: t2.defaultDuration, defaultShowRemainingTime: t2.defaultShowRemainingTime, hideDuration: Ca(t2), playbackRates: t2.getAttribute(o$1.PLAYBACK_RATES), customDomain: (i2 = t2.getAttribute(e.CUSTOM_DOMAIN)) != null ? i2 : void 0, title: t2.getAttribute(o$1.TITLE), videoTitle: (r10 = t2.getAttribute(o$1.VIDEO_TITLE)) != null ? r10 : t2.getAttribute(o$1.TITLE), novolumepref: t2.hasAttribute(o$1.NO_VOLUME_PREF), nomutedpref: t2.hasAttribute(o$1.NO_MUTED_PREF), proudlyDisplayMuxBadge: t2.hasAttribute(o$1.PROUDLY_DISPLAY_MUX_BADGE), castReceiver: t2.castReceiver, disablePseudoEnded: t2.hasAttribute(o$1.DISABLE_PSEUDO_ENDED), ...a, extraSourceParams: t2.extraSourceParams };
}
__name(Ea, "Ea");
var Ta = media_error_dialog_default.formatErrorMessage;
media_error_dialog_default.formatErrorMessage = (t2) => {
  var a, e2;
  if (t2 instanceof f$3) {
    let i2 = Et(t2, false);
    return `
      ${i2 != null && i2.title ? `<h3>${i2.title}</h3>` : ""}
      ${i2 != null && i2.message || i2 != null && i2.linkUrl ? `<p>
        ${i2 == null ? void 0 : i2.message}
        ${i2 != null && i2.linkUrl ? `<a
              href="${i2.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(a = i2.linkText) != null ? a : ""} ${x$4("(opens in a new window)")}"
              >${(e2 = i2.linkText) != null ? e2 : i2.linkUrl}</a
            >` : ""}
      </p>` : ""}
    `;
  }
  return Ta(t2);
};
function Aa(t2) {
  var e2, i2;
  let a = t2.theme;
  if (a) {
    let r10 = (i2 = (e2 = t2.getRootNode()) == null ? void 0 : e2.getElementById) == null ? void 0 : i2.call(e2, a);
    if (r10 && r10 instanceof HTMLTemplateElement) return r10;
    a.startsWith("media-theme-") || (a = `media-theme-${a}`);
    let n2 = k.customElements.get(a);
    if (n2 != null && n2.template) return n2.template;
  }
}
__name(Aa, "Aa");
function Ca(t2) {
  var e2;
  let a = (e2 = t2.mediaController) == null ? void 0 : e2.querySelector("media-time-display");
  return a && getComputedStyle(a).getPropertyValue("--media-duration-display-display").trim() === "none";
}
__name(Ca, "Ca");
function xt(t2) {
  let a = t2.videoTitle ? { video_title: t2.videoTitle } : {};
  return t2.getAttributeNames().filter((e2) => e2.startsWith("metadata-")).reduce((e2, i2) => {
    let r10 = t2.getAttribute(i2);
    return r10 !== null && (e2[i2.replace(/^metadata-/, "").replace(/-/g, "_")] = r10), e2;
  }, a);
}
__name(xt, "xt");
var ka = Object.values(e), _a2 = Object.values(M$1), Ra = Object.values(o$1), Ot = se$1(), Lt = "mux-player", Mt = { isDialogOpen: false }, xa = { redundant_streams: true }, J, ee$1, te$1, I, ae$1, K, m, w, Nt, we, H, wt, It, Pt, Dt, Ne = (_v = class extends Ce {
  constructor() {
    super();
    E$2(this, m);
    E$2(this, J);
    E$2(this, ee$1, false);
    E$2(this, te$1, {});
    E$2(this, I, true);
    E$2(this, ae$1, new ne$1(this, "hotkeys"));
    E$2(this, K, { ...Mt, onCloseErrorDialog: /* @__PURE__ */ __name((e2) => {
      var r10;
      ((r10 = e2.composedPath()[0]) == null ? void 0 : r10.localName) === "media-error-dialog" && p$1(this, m, we).call(this, { isDialogOpen: false });
    }, "onCloseErrorDialog"), onFocusInErrorDialog: /* @__PURE__ */ __name((e2) => {
      var n2;
      if (((n2 = e2.composedPath()[0]) == null ? void 0 : n2.localName) !== "media-error-dialog") return;
      ve(this, P$1.activeElement) || e2.preventDefault();
    }, "onFocusInErrorDialog") });
    C(this, J, Gr()), this.attachShadow({ mode: "open" }), p$1(this, m, Nt).call(this), this.isConnected && p$1(this, m, w).call(this);
  }
  static get NAME() {
    return Lt;
  }
  static get VERSION() {
    return Ot;
  }
  static get observedAttributes() {
    var e2;
    return [...(e2 = Ce.observedAttributes) != null ? e2 : [], ..._a2, ...ka, ...Ra];
  }
  get mediaTheme() {
    var e2;
    return (e2 = this.shadowRoot) == null ? void 0 : e2.querySelector("media-theme");
  }
  get mediaController() {
    var e2, i2;
    return (i2 = (e2 = this.mediaTheme) == null ? void 0 : e2.shadowRoot) == null ? void 0 : i2.querySelector("media-controller");
  }
  connectedCallback() {
    let e2 = this.media;
    e2 && (e2.metadata = xt(this));
  }
  attributeChangedCallback(e$1, i2, r10) {
    switch (p$1(this, m, w).call(this), super.attributeChangedCallback(e$1, i2, r10), e$1) {
      case o$1.HOTKEYS:
        u$1(this, ae$1).value = r10;
        break;
      case o$1.THUMBNAIL_TIME: {
        r10 != null && this.tokens.thumbnail && x$1(x$4("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());
        break;
      }
      case o$1.THUMBNAIL_TOKEN: {
        if (r10) {
          let d2 = ee$2(r10);
          if (d2) {
            let { aud: l2 } = d2, b2 = se$2.THUMBNAIL;
            l2 !== b2 && x$1(x$4("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({ aud: l2, expectedAud: b2, tokenNamePrefix: "thumbnail" }));
          }
        }
        break;
      }
      case o$1.STORYBOARD_TOKEN: {
        if (r10) {
          let d2 = ee$2(r10);
          if (d2) {
            let { aud: l2 } = d2, b2 = se$2.STORYBOARD;
            l2 !== b2 && x$1(x$4("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({ aud: l2, expectedAud: b2, tokenNamePrefix: "storyboard" }));
          }
        }
        break;
      }
      case o$1.DRM_TOKEN: {
        if (r10) {
          let d2 = ee$2(r10);
          if (d2) {
            let { aud: l2 } = d2, b2 = se$2.DRM;
            l2 !== b2 && x$1(x$4("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({ aud: l2, expectedAud: b2, tokenNamePrefix: "drm" }));
          }
        }
        break;
      }
      case e.PLAYBACK_ID: {
        r10 != null && r10.includes("?token") && T(x$4("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({ playbackId: r10 }));
        break;
      }
      case e.STREAM_TYPE: {
        r10 && ![_$1.LIVE, _$1.ON_DEMAND, _$1.UNKNOWN].includes(r10) ? ["ll-live", "live:dvr", "ll-live:dvr"].includes(this.streamType) ? this.targetLiveWindow = r10.includes("dvr") ? Number.POSITIVE_INFINITY : 0 : Te({ file: "invalid-stream-type.md", message: x$4("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({ streamType: this.streamType }) }) : r10 === _$1.LIVE ? this.getAttribute(o$1.TARGET_LIVE_WINDOW) == null && (this.targetLiveWindow = 0) : this.targetLiveWindow = Number.NaN;
        break;
      }
      case o$1.FULLSCREEN_ELEMENT: {
        if (r10 != null || r10 !== i2) {
          let d2 = P$1.getElementById(r10), l2 = d2 == null ? void 0 : d2.querySelector("mux-player");
          this.mediaController && d2 && l2 && (this.mediaController.fullscreenElement = d2);
        }
        break;
      }
    }
    [e.PLAYBACK_ID, M$1.SRC, o$1.PLAYBACK_TOKEN].includes(e$1) && i2 !== r10 && C(this, K, { ...u$1(this, K), ...Mt }), p$1(this, m, H).call(this, { [st(e$1)]: r10 });
  }
  async requestFullscreen(e2) {
    var i2;
    if (!(!this.mediaController || this.mediaController.hasAttribute(MediaUIAttributes.MEDIA_IS_FULLSCREEN))) return (i2 = this.mediaController) == null || i2.dispatchEvent(new k.CustomEvent(MediaUIEvents.MEDIA_ENTER_FULLSCREEN_REQUEST, { composed: true, bubbles: true })), new Promise((r10, n2) => {
      var d2;
      (d2 = this.mediaController) == null || d2.addEventListener(MediaStateChangeEvents.MEDIA_IS_FULLSCREEN, () => r10(), { once: true });
    });
  }
  async exitFullscreen() {
    var e2;
    if (!(!this.mediaController || !this.mediaController.hasAttribute(MediaUIAttributes.MEDIA_IS_FULLSCREEN))) return (e2 = this.mediaController) == null || e2.dispatchEvent(new k.CustomEvent(MediaUIEvents.MEDIA_EXIT_FULLSCREEN_REQUEST, { composed: true, bubbles: true })), new Promise((i2, r10) => {
      var n2;
      (n2 = this.mediaController) == null || n2.addEventListener(MediaStateChangeEvents.MEDIA_IS_FULLSCREEN, () => i2(), { once: true });
    });
  }
  get preferCmcd() {
    var e$1;
    return (e$1 = this.getAttribute(e.PREFER_CMCD)) != null ? e$1 : void 0;
  }
  set preferCmcd(e$1) {
    e$1 !== this.preferCmcd && (e$1 ? Zt$1.includes(e$1) ? this.setAttribute(e.PREFER_CMCD, e$1) : x$1(`Invalid value for preferCmcd. Must be one of ${Zt$1.join()}`) : this.removeAttribute(e.PREFER_CMCD));
  }
  get hasPlayed() {
    var e2, i2;
    return (i2 = (e2 = this.mediaController) == null ? void 0 : e2.hasAttribute(MediaUIAttributes.MEDIA_HAS_PLAYED)) != null ? i2 : false;
  }
  get inLiveWindow() {
    var e2;
    return (e2 = this.mediaController) == null ? void 0 : e2.hasAttribute(MediaUIAttributes.MEDIA_TIME_IS_LIVE);
  }
  get _hls() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2._hls;
  }
  get mux() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.mux;
  }
  get theme() {
    var e2;
    return (e2 = this.getAttribute(o$1.THEME)) != null ? e2 : va;
  }
  set theme(e2) {
    this.setAttribute(o$1.THEME, `${e2}`);
  }
  get themeProps() {
    let e2 = this.mediaTheme;
    if (!e2) return;
    let i2 = {};
    for (let r10 of e2.getAttributeNames()) {
      if (Se.includes(r10)) continue;
      let n2 = e2.getAttribute(r10);
      i2[oe$1(r10)] = n2 === "" ? true : n2;
    }
    return i2;
  }
  set themeProps(e2) {
    var r10, n2;
    p$1(this, m, w).call(this);
    let i2 = { ...this.themeProps, ...e2 };
    for (let d2 in i2) {
      if (Se.includes(d2)) continue;
      let l2 = e2 == null ? void 0 : e2[d2];
      typeof l2 == "boolean" || l2 == null ? (r10 = this.mediaTheme) == null || r10.toggleAttribute(re$1(d2), !!l2) : (n2 = this.mediaTheme) == null || n2.setAttribute(re$1(d2), l2);
    }
  }
  get playbackId() {
    var e$1;
    return (e$1 = this.getAttribute(e.PLAYBACK_ID)) != null ? e$1 : void 0;
  }
  set playbackId(e$1) {
    e$1 ? this.setAttribute(e.PLAYBACK_ID, e$1) : this.removeAttribute(e.PLAYBACK_ID);
  }
  get src() {
    var e2, i2;
    return this.playbackId ? (e2 = V(this, M$1.SRC)) != null ? e2 : void 0 : (i2 = this.getAttribute(M$1.SRC)) != null ? i2 : void 0;
  }
  set src(e2) {
    e2 ? this.setAttribute(M$1.SRC, e2) : this.removeAttribute(M$1.SRC);
  }
  get poster() {
    var r10;
    let e2 = this.getAttribute(M$1.POSTER);
    if (e2 != null) return e2;
    let { tokens: i2 } = this;
    if (i2.playback && !i2.thumbnail) {
      x$1("Missing expected thumbnail token. No poster image will be shown");
      return;
    }
    if (this.playbackId && !this.audio) return ot(this.playbackId, { customDomain: this.customDomain, thumbnailTime: (r10 = this.thumbnailTime) != null ? r10 : this.startTime, programTime: this.programStartTime, token: i2.thumbnail });
  }
  set poster(e2) {
    e2 || e2 === "" ? this.setAttribute(M$1.POSTER, e2) : this.removeAttribute(M$1.POSTER);
  }
  get storyboardSrc() {
    var e2;
    return (e2 = this.getAttribute(o$1.STORYBOARD_SRC)) != null ? e2 : void 0;
  }
  set storyboardSrc(e2) {
    e2 ? this.setAttribute(o$1.STORYBOARD_SRC, e2) : this.removeAttribute(o$1.STORYBOARD_SRC);
  }
  get storyboard() {
    let { tokens: e2 } = this;
    if (this.storyboardSrc && !e2.storyboard) return this.storyboardSrc;
    if (!(this.audio || !this.playbackId || !this.streamType || [_$1.LIVE, _$1.UNKNOWN].includes(this.streamType) || e2.playback && !e2.storyboard)) return nt(this.playbackId, { customDomain: this.customDomain, token: e2.storyboard, programStartTime: this.programStartTime, programEndTime: this.programEndTime });
  }
  get audio() {
    return this.hasAttribute(o$1.AUDIO);
  }
  set audio(e2) {
    if (!e2) {
      this.removeAttribute(o$1.AUDIO);
      return;
    }
    this.setAttribute(o$1.AUDIO, "");
  }
  get hotkeys() {
    return u$1(this, ae$1);
  }
  get nohotkeys() {
    return this.hasAttribute(o$1.NOHOTKEYS);
  }
  set nohotkeys(e2) {
    if (!e2) {
      this.removeAttribute(o$1.NOHOTKEYS);
      return;
    }
    this.setAttribute(o$1.NOHOTKEYS, "");
  }
  get thumbnailTime() {
    return y(this.getAttribute(o$1.THUMBNAIL_TIME));
  }
  set thumbnailTime(e2) {
    this.setAttribute(o$1.THUMBNAIL_TIME, `${e2}`);
  }
  get videoTitle() {
    var e2, i2;
    return (i2 = (e2 = this.getAttribute(o$1.VIDEO_TITLE)) != null ? e2 : this.getAttribute(o$1.TITLE)) != null ? i2 : "";
  }
  set videoTitle(e2) {
    e2 !== this.videoTitle && (e2 ? this.setAttribute(o$1.VIDEO_TITLE, e2) : this.removeAttribute(o$1.VIDEO_TITLE));
  }
  get placeholder() {
    var e2;
    return (e2 = V(this, o$1.PLACEHOLDER)) != null ? e2 : "";
  }
  set placeholder(e2) {
    this.setAttribute(o$1.PLACEHOLDER, `${e2}`);
  }
  get primaryColor() {
    var i2, r10;
    let e2 = this.getAttribute(o$1.PRIMARY_COLOR);
    if (e2 != null || this.mediaTheme && (e2 = (r10 = (i2 = k.getComputedStyle(this.mediaTheme)) == null ? void 0 : i2.getPropertyValue("--_primary-color")) == null ? void 0 : r10.trim(), e2)) return e2;
  }
  set primaryColor(e2) {
    this.setAttribute(o$1.PRIMARY_COLOR, `${e2}`);
  }
  get secondaryColor() {
    var i2, r10;
    let e2 = this.getAttribute(o$1.SECONDARY_COLOR);
    if (e2 != null || this.mediaTheme && (e2 = (r10 = (i2 = k.getComputedStyle(this.mediaTheme)) == null ? void 0 : i2.getPropertyValue("--_secondary-color")) == null ? void 0 : r10.trim(), e2)) return e2;
  }
  set secondaryColor(e2) {
    this.setAttribute(o$1.SECONDARY_COLOR, `${e2}`);
  }
  get accentColor() {
    var i2, r10;
    let e2 = this.getAttribute(o$1.ACCENT_COLOR);
    if (e2 != null || this.mediaTheme && (e2 = (r10 = (i2 = k.getComputedStyle(this.mediaTheme)) == null ? void 0 : i2.getPropertyValue("--_accent-color")) == null ? void 0 : r10.trim(), e2)) return e2;
  }
  set accentColor(e2) {
    this.setAttribute(o$1.ACCENT_COLOR, `${e2}`);
  }
  get defaultShowRemainingTime() {
    return this.hasAttribute(o$1.DEFAULT_SHOW_REMAINING_TIME);
  }
  set defaultShowRemainingTime(e2) {
    e2 ? this.setAttribute(o$1.DEFAULT_SHOW_REMAINING_TIME, "") : this.removeAttribute(o$1.DEFAULT_SHOW_REMAINING_TIME);
  }
  get playbackRates() {
    if (this.hasAttribute(o$1.PLAYBACK_RATES)) return this.getAttribute(o$1.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map((e2) => Number(e2)).filter((e2) => !Number.isNaN(e2)).sort((e2, i2) => e2 - i2);
  }
  set playbackRates(e2) {
    if (!e2) {
      this.removeAttribute(o$1.PLAYBACK_RATES);
      return;
    }
    this.setAttribute(o$1.PLAYBACK_RATES, e2.join(" "));
  }
  get forwardSeekOffset() {
    var e2;
    return (e2 = y(this.getAttribute(o$1.FORWARD_SEEK_OFFSET))) != null ? e2 : 10;
  }
  set forwardSeekOffset(e2) {
    this.setAttribute(o$1.FORWARD_SEEK_OFFSET, `${e2}`);
  }
  get backwardSeekOffset() {
    var e2;
    return (e2 = y(this.getAttribute(o$1.BACKWARD_SEEK_OFFSET))) != null ? e2 : 10;
  }
  set backwardSeekOffset(e2) {
    this.setAttribute(o$1.BACKWARD_SEEK_OFFSET, `${e2}`);
  }
  get defaultHiddenCaptions() {
    return this.hasAttribute(o$1.DEFAULT_HIDDEN_CAPTIONS);
  }
  set defaultHiddenCaptions(e2) {
    e2 ? this.setAttribute(o$1.DEFAULT_HIDDEN_CAPTIONS, "") : this.removeAttribute(o$1.DEFAULT_HIDDEN_CAPTIONS);
  }
  get defaultDuration() {
    return y(this.getAttribute(o$1.DEFAULT_DURATION));
  }
  set defaultDuration(e2) {
    e2 == null ? this.removeAttribute(o$1.DEFAULT_DURATION) : this.setAttribute(o$1.DEFAULT_DURATION, `${e2}`);
  }
  get playerInitTime() {
    return this.hasAttribute(e.PLAYER_INIT_TIME) ? y(this.getAttribute(e.PLAYER_INIT_TIME)) : u$1(this, J);
  }
  set playerInitTime(e$1) {
    e$1 != this.playerInitTime && (e$1 == null ? this.removeAttribute(e.PLAYER_INIT_TIME) : this.setAttribute(e.PLAYER_INIT_TIME, `${+e$1}`));
  }
  get playerSoftwareName() {
    var e$1;
    return (e$1 = this.getAttribute(e.PLAYER_SOFTWARE_NAME)) != null ? e$1 : Lt;
  }
  get playerSoftwareVersion() {
    var e$1;
    return (e$1 = this.getAttribute(e.PLAYER_SOFTWARE_VERSION)) != null ? e$1 : Ot;
  }
  get beaconCollectionDomain() {
    var e$1;
    return (e$1 = this.getAttribute(e.BEACON_COLLECTION_DOMAIN)) != null ? e$1 : void 0;
  }
  set beaconCollectionDomain(e$1) {
    e$1 !== this.beaconCollectionDomain && (e$1 ? this.setAttribute(e.BEACON_COLLECTION_DOMAIN, e$1) : this.removeAttribute(e.BEACON_COLLECTION_DOMAIN));
  }
  get maxResolution() {
    var e$1;
    return (e$1 = this.getAttribute(e.MAX_RESOLUTION)) != null ? e$1 : void 0;
  }
  set maxResolution(e$1) {
    e$1 !== this.maxResolution && (e$1 ? this.setAttribute(e.MAX_RESOLUTION, e$1) : this.removeAttribute(e.MAX_RESOLUTION));
  }
  get minResolution() {
    var e$1;
    return (e$1 = this.getAttribute(e.MIN_RESOLUTION)) != null ? e$1 : void 0;
  }
  set minResolution(e$1) {
    e$1 !== this.minResolution && (e$1 ? this.setAttribute(e.MIN_RESOLUTION, e$1) : this.removeAttribute(e.MIN_RESOLUTION));
  }
  get renditionOrder() {
    var e$1;
    return (e$1 = this.getAttribute(e.RENDITION_ORDER)) != null ? e$1 : void 0;
  }
  set renditionOrder(e$1) {
    e$1 !== this.renditionOrder && (e$1 ? this.setAttribute(e.RENDITION_ORDER, e$1) : this.removeAttribute(e.RENDITION_ORDER));
  }
  get programStartTime() {
    return y(this.getAttribute(e.PROGRAM_START_TIME));
  }
  set programStartTime(e$1) {
    e$1 == null ? this.removeAttribute(e.PROGRAM_START_TIME) : this.setAttribute(e.PROGRAM_START_TIME, `${e$1}`);
  }
  get programEndTime() {
    return y(this.getAttribute(e.PROGRAM_END_TIME));
  }
  set programEndTime(e$1) {
    e$1 == null ? this.removeAttribute(e.PROGRAM_END_TIME) : this.setAttribute(e.PROGRAM_END_TIME, `${e$1}`);
  }
  get assetStartTime() {
    return y(this.getAttribute(e.ASSET_START_TIME));
  }
  set assetStartTime(e$1) {
    e$1 == null ? this.removeAttribute(e.ASSET_START_TIME) : this.setAttribute(e.ASSET_START_TIME, `${e$1}`);
  }
  get assetEndTime() {
    return y(this.getAttribute(e.ASSET_END_TIME));
  }
  set assetEndTime(e$1) {
    e$1 == null ? this.removeAttribute(e.ASSET_END_TIME) : this.setAttribute(e.ASSET_END_TIME, `${e$1}`);
  }
  get extraSourceParams() {
    return this.hasAttribute(o$1.EXTRA_SOURCE_PARAMS) ? [...new URLSearchParams(this.getAttribute(o$1.EXTRA_SOURCE_PARAMS)).entries()].reduce((e2, [i2, r10]) => (e2[i2] = r10, e2), {}) : xa;
  }
  set extraSourceParams(e2) {
    e2 == null ? this.removeAttribute(o$1.EXTRA_SOURCE_PARAMS) : this.setAttribute(o$1.EXTRA_SOURCE_PARAMS, new URLSearchParams(e2).toString());
  }
  get customDomain() {
    var e$1;
    return (e$1 = this.getAttribute(e.CUSTOM_DOMAIN)) != null ? e$1 : void 0;
  }
  set customDomain(e$1) {
    e$1 !== this.customDomain && (e$1 ? this.setAttribute(e.CUSTOM_DOMAIN, e$1) : this.removeAttribute(e.CUSTOM_DOMAIN));
  }
  get envKey() {
    var e$1;
    return (e$1 = V(this, e.ENV_KEY)) != null ? e$1 : void 0;
  }
  set envKey(e$1) {
    this.setAttribute(e.ENV_KEY, `${e$1}`);
  }
  get noVolumePref() {
    return this.hasAttribute(o$1.NO_VOLUME_PREF);
  }
  set noVolumePref(e2) {
    e2 ? this.setAttribute(o$1.NO_VOLUME_PREF, "") : this.removeAttribute(o$1.NO_VOLUME_PREF);
  }
  get noMutedPref() {
    return this.hasAttribute(o$1.NO_MUTED_PREF);
  }
  set noMutedPref(e2) {
    e2 ? this.setAttribute(o$1.NO_MUTED_PREF, "") : this.removeAttribute(o$1.NO_MUTED_PREF);
  }
  get debug() {
    return V(this, e.DEBUG) != null;
  }
  set debug(e$1) {
    e$1 ? this.setAttribute(e.DEBUG, "") : this.removeAttribute(e.DEBUG);
  }
  get disableTracking() {
    return V(this, e.DISABLE_TRACKING) != null;
  }
  set disableTracking(e$1) {
    this.toggleAttribute(e.DISABLE_TRACKING, !!e$1);
  }
  get disableCookies() {
    return V(this, e.DISABLE_COOKIES) != null;
  }
  set disableCookies(e$1) {
    e$1 ? this.setAttribute(e.DISABLE_COOKIES, "") : this.removeAttribute(e.DISABLE_COOKIES);
  }
  get streamType() {
    var e$1, i2, r10;
    return (r10 = (i2 = this.getAttribute(e.STREAM_TYPE)) != null ? i2 : (e$1 = this.media) == null ? void 0 : e$1.streamType) != null ? r10 : _$1.UNKNOWN;
  }
  set streamType(e$1) {
    this.setAttribute(e.STREAM_TYPE, `${e$1}`);
  }
  get defaultStreamType() {
    var e2, i2, r10;
    return (r10 = (i2 = this.getAttribute(o$1.DEFAULT_STREAM_TYPE)) != null ? i2 : (e2 = this.mediaController) == null ? void 0 : e2.getAttribute(o$1.DEFAULT_STREAM_TYPE)) != null ? r10 : _$1.ON_DEMAND;
  }
  set defaultStreamType(e2) {
    e2 ? this.setAttribute(o$1.DEFAULT_STREAM_TYPE, e2) : this.removeAttribute(o$1.DEFAULT_STREAM_TYPE);
  }
  get targetLiveWindow() {
    var e2, i2;
    return this.hasAttribute(o$1.TARGET_LIVE_WINDOW) ? +this.getAttribute(o$1.TARGET_LIVE_WINDOW) : (i2 = (e2 = this.media) == null ? void 0 : e2.targetLiveWindow) != null ? i2 : Number.NaN;
  }
  set targetLiveWindow(e2) {
    e2 == this.targetLiveWindow || Number.isNaN(e2) && Number.isNaN(this.targetLiveWindow) || (e2 == null ? this.removeAttribute(o$1.TARGET_LIVE_WINDOW) : this.setAttribute(o$1.TARGET_LIVE_WINDOW, `${+e2}`));
  }
  get liveEdgeStart() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.liveEdgeStart;
  }
  get startTime() {
    return y(V(this, e.START_TIME));
  }
  set startTime(e$1) {
    this.setAttribute(e.START_TIME, `${e$1}`);
  }
  get preferPlayback() {
    let e$1 = this.getAttribute(e.PREFER_PLAYBACK);
    if (e$1 === X$1.MSE || e$1 === X$1.NATIVE) return e$1;
  }
  set preferPlayback(e$1) {
    e$1 !== this.preferPlayback && (e$1 === X$1.MSE || e$1 === X$1.NATIVE ? this.setAttribute(e.PREFER_PLAYBACK, e$1) : this.removeAttribute(e.PREFER_PLAYBACK));
  }
  get metadata() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.metadata;
  }
  set metadata(e2) {
    if (p$1(this, m, w).call(this), !this.media) {
      T("underlying media element missing when trying to set metadata. metadata will not be set.");
      return;
    }
    this.media.metadata = { ...xt(this), ...e2 };
  }
  get _hlsConfig() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2._hlsConfig;
  }
  set _hlsConfig(e2) {
    if (p$1(this, m, w).call(this), !this.media) {
      T("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");
      return;
    }
    this.media._hlsConfig = e2;
  }
  async addCuePoints(e2) {
    var i2;
    if (p$1(this, m, w).call(this), !this.media) {
      T("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");
      return;
    }
    return (i2 = this.media) == null ? void 0 : i2.addCuePoints(e2);
  }
  get activeCuePoint() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.activeCuePoint;
  }
  get cuePoints() {
    var e2, i2;
    return (i2 = (e2 = this.media) == null ? void 0 : e2.cuePoints) != null ? i2 : [];
  }
  addChapters(e2) {
    var i2;
    if (p$1(this, m, w).call(this), !this.media) {
      T("underlying media element missing when trying to addChapters. chapters will not be added.");
      return;
    }
    return (i2 = this.media) == null ? void 0 : i2.addChapters(e2);
  }
  get activeChapter() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.activeChapter;
  }
  get chapters() {
    var e2, i2;
    return (i2 = (e2 = this.media) == null ? void 0 : e2.chapters) != null ? i2 : [];
  }
  getStartDate() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.getStartDate();
  }
  get currentPdt() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.currentPdt;
  }
  get tokens() {
    let e2 = this.getAttribute(o$1.PLAYBACK_TOKEN), i2 = this.getAttribute(o$1.DRM_TOKEN), r10 = this.getAttribute(o$1.THUMBNAIL_TOKEN), n2 = this.getAttribute(o$1.STORYBOARD_TOKEN);
    return { ...u$1(this, te$1), ...e2 != null ? { playback: e2 } : {}, ...i2 != null ? { drm: i2 } : {}, ...r10 != null ? { thumbnail: r10 } : {}, ...n2 != null ? { storyboard: n2 } : {} };
  }
  set tokens(e2) {
    C(this, te$1, e2 != null ? e2 : {});
  }
  get playbackToken() {
    var e2;
    return (e2 = this.getAttribute(o$1.PLAYBACK_TOKEN)) != null ? e2 : void 0;
  }
  set playbackToken(e2) {
    this.setAttribute(o$1.PLAYBACK_TOKEN, `${e2}`);
  }
  get drmToken() {
    var e2;
    return (e2 = this.getAttribute(o$1.DRM_TOKEN)) != null ? e2 : void 0;
  }
  set drmToken(e2) {
    this.setAttribute(o$1.DRM_TOKEN, `${e2}`);
  }
  get thumbnailToken() {
    var e2;
    return (e2 = this.getAttribute(o$1.THUMBNAIL_TOKEN)) != null ? e2 : void 0;
  }
  set thumbnailToken(e2) {
    this.setAttribute(o$1.THUMBNAIL_TOKEN, `${e2}`);
  }
  get storyboardToken() {
    var e2;
    return (e2 = this.getAttribute(o$1.STORYBOARD_TOKEN)) != null ? e2 : void 0;
  }
  set storyboardToken(e2) {
    this.setAttribute(o$1.STORYBOARD_TOKEN, `${e2}`);
  }
  addTextTrack(e2, i2, r10, n2) {
    var l2;
    let d2 = (l2 = this.media) == null ? void 0 : l2.nativeEl;
    if (d2) return ne$2(d2, e2, i2, r10, n2);
  }
  removeTextTrack(e2) {
    var r10;
    let i2 = (r10 = this.media) == null ? void 0 : r10.nativeEl;
    if (i2) return lt(i2, e2);
  }
  get textTracks() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.textTracks;
  }
  get castReceiver() {
    var e2;
    return (e2 = this.getAttribute(o$1.CAST_RECEIVER)) != null ? e2 : void 0;
  }
  set castReceiver(e2) {
    e2 !== this.castReceiver && (e2 ? this.setAttribute(o$1.CAST_RECEIVER, e2) : this.removeAttribute(o$1.CAST_RECEIVER));
  }
  get castCustomData() {
    var e2;
    return (e2 = this.media) == null ? void 0 : e2.castCustomData;
  }
  set castCustomData(e2) {
    if (!this.media) {
      T("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");
      return;
    }
    this.media.castCustomData = e2;
  }
  get noTooltips() {
    return this.hasAttribute(o$1.NO_TOOLTIPS);
  }
  set noTooltips(e2) {
    if (!e2) {
      this.removeAttribute(o$1.NO_TOOLTIPS);
      return;
    }
    this.setAttribute(o$1.NO_TOOLTIPS, "");
  }
  get proudlyDisplayMuxBadge() {
    return this.hasAttribute(o$1.PROUDLY_DISPLAY_MUX_BADGE);
  }
  set proudlyDisplayMuxBadge(e2) {
    e2 ? this.setAttribute(o$1.PROUDLY_DISPLAY_MUX_BADGE, "") : this.removeAttribute(o$1.PROUDLY_DISPLAY_MUX_BADGE);
  }
}, __name(_v, "Ne"), _v);
J = /* @__PURE__ */ new WeakMap(), ee$1 = /* @__PURE__ */ new WeakMap(), te$1 = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), ae$1 = /* @__PURE__ */ new WeakMap(), K = /* @__PURE__ */ new WeakMap(), m = /* @__PURE__ */ new WeakSet(), w = /* @__PURE__ */ __name(function() {
  var e2, i2, r10, n2;
  if (!u$1(this, ee$1)) {
    C(this, ee$1, true), p$1(this, m, H).call(this);
    try {
      if (customElements.upgrade(this.mediaTheme), !(this.mediaTheme instanceof k.HTMLElement)) throw "";
    } catch {
      T("<media-theme> failed to upgrade!");
    }
    try {
      customElements.upgrade(this.media);
    } catch {
      T("underlying media element failed to upgrade!");
    }
    try {
      if (customElements.upgrade(this.mediaController), !(this.mediaController instanceof media_controller_default)) throw "";
    } catch {
      T("<media-controller> failed to upgrade!");
    }
    p$1(this, m, wt).call(this), p$1(this, m, It).call(this), p$1(this, m, Pt).call(this), C(this, I, (i2 = (e2 = this.mediaController) == null ? void 0 : e2.hasAttribute(Attributes$d.USER_INACTIVE)) != null ? i2 : true), p$1(this, m, Dt).call(this), (r10 = this.media) == null || r10.addEventListener("streamtypechange", () => p$1(this, m, H).call(this)), (n2 = this.media) == null || n2.addEventListener("loadstart", () => p$1(this, m, H).call(this));
  }
}, "w"), Nt = /* @__PURE__ */ __name(function() {
  var e2, i2;
  try {
    (e2 = window == null ? void 0 : window.CSS) == null || e2.registerProperty({ name: "--media-primary-color", syntax: "<color>", inherits: true }), (i2 = window == null ? void 0 : window.CSS) == null || i2.registerProperty({ name: "--media-secondary-color", syntax: "<color>", inherits: true });
  } catch {
  }
}, "Nt"), we = /* @__PURE__ */ __name(function(e2) {
  Object.assign(u$1(this, K), e2), p$1(this, m, H).call(this);
}, "we"), H = /* @__PURE__ */ __name(function(e2 = {}) {
  bt(gt(Ea(this, { ...u$1(this, K), ...e2 })), this.shadowRoot);
}, "H"), wt = /* @__PURE__ */ __name(function() {
  let e2 = /* @__PURE__ */ __name((r10) => {
    var l2, b2;
    if (!(r10 != null && r10.startsWith("theme-"))) return;
    let n2 = r10.replace(/^theme-/, "");
    if (Se.includes(n2)) return;
    let d2 = this.getAttribute(r10);
    d2 != null ? (l2 = this.mediaTheme) == null || l2.setAttribute(n2, d2) : (b2 = this.mediaTheme) == null || b2.removeAttribute(n2);
  }, "e");
  new MutationObserver((r10) => {
    for (let { attributeName: n2 } of r10) e2(n2);
  }).observe(this, { attributes: true }), this.getAttributeNames().forEach(e2);
}, "wt"), It = /* @__PURE__ */ __name(function() {
  let e2 = /* @__PURE__ */ __name((i2) => {
    var d2;
    let r10 = (d2 = this.media) == null ? void 0 : d2.error;
    if (!(r10 instanceof f$3)) {
      let { message: l2, code: b2 } = r10 != null ? r10 : {};
      r10 = new f$3(l2, b2);
    }
    if (!(r10 != null && r10.fatal)) {
      x$1(r10), r10.data && x$1(`${r10.name} data:`, r10.data);
      return;
    }
    let n2 = Re(r10);
    n2.message && Te(n2), T(r10), r10.data && T(`${r10.name} data:`, r10.data), p$1(this, m, we).call(this, { isDialogOpen: true });
  }, "e");
  this.addEventListener("error", e2), this.media && (this.media.errorTranslator = (i2 = {}) => {
    var n2, d2, l2;
    if (!(((n2 = this.media) == null ? void 0 : n2.error) instanceof f$3)) return i2;
    let r10 = Re((d2 = this.media) == null ? void 0 : d2.error);
    return { player_error_code: (l2 = this.media) == null ? void 0 : l2.error.code, player_error_message: r10.message ? String(r10.message) : i2.player_error_message, player_error_context: r10.context ? String(r10.context) : i2.player_error_context };
  });
}, "It"), Pt = /* @__PURE__ */ __name(function() {
  var i2, r10, n2, d2;
  let e2 = /* @__PURE__ */ __name(() => p$1(this, m, H).call(this), "e");
  (r10 = (i2 = this.media) == null ? void 0 : i2.textTracks) == null || r10.addEventListener("addtrack", e2), (d2 = (n2 = this.media) == null ? void 0 : n2.textTracks) == null || d2.addEventListener("removetrack", e2);
}, "Pt"), Dt = /* @__PURE__ */ __name(function() {
  var S2, Y2;
  if (!/Firefox/i.test(navigator.userAgent)) return;
  let i2, r10 = /* @__PURE__ */ new WeakMap(), n2 = /* @__PURE__ */ __name(() => this.streamType === _$1.LIVE && !this.secondaryColor && this.offsetWidth >= 800, "n"), d2 = /* @__PURE__ */ __name((_2, A2, R2 = false) => {
    if (n2()) return;
    Array.from(_2 && _2.activeCues || []).forEach((h2) => {
      if (!(!h2.snapToLines || h2.line < -5 || h2.line >= 0 && h2.line < 10)) if (!A2 || this.paused) {
        let ie2 = h2.text.split(`
`).length, W2 = -3;
        this.streamType === _$1.LIVE && (W2 = -2);
        let Z2 = W2 - ie2;
        if (h2.line === Z2 && !R2) return;
        r10.has(h2) || r10.set(h2, h2.line), h2.line = Z2;
      } else setTimeout(() => {
        h2.line = r10.get(h2) || "auto";
      }, 500);
    });
  }, "d"), l2 = /* @__PURE__ */ __name(() => {
    var _2, A2;
    d2(i2, (A2 = (_2 = this.mediaController) == null ? void 0 : _2.hasAttribute(Attributes$d.USER_INACTIVE)) != null ? A2 : false);
  }, "l"), b2 = /* @__PURE__ */ __name(() => {
    var R2, $2;
    let A2 = Array.from((($2 = (R2 = this.mediaController) == null ? void 0 : R2.media) == null ? void 0 : $2.textTracks) || []).filter((h2) => ["subtitles", "captions"].includes(h2.kind) && h2.mode === "showing")[0];
    A2 !== i2 && (i2 == null || i2.removeEventListener("cuechange", l2)), i2 = A2, i2 == null || i2.addEventListener("cuechange", l2), d2(i2, u$1(this, I));
  }, "b");
  b2(), (S2 = this.textTracks) == null || S2.addEventListener("change", b2), (Y2 = this.textTracks) == null || Y2.addEventListener("addtrack", b2), this.addEventListener("userinactivechange", () => {
    var A2, R2;
    let _2 = (R2 = (A2 = this.mediaController) == null ? void 0 : A2.hasAttribute(Attributes$d.USER_INACTIVE)) != null ? R2 : true;
    u$1(this, I) !== _2 && (C(this, I, _2), d2(i2, u$1(this, I)));
  });
}, "Dt");
function V(t2, a) {
  return t2.media ? t2.media.getAttribute(a) : t2.getAttribute(a);
}
__name(V, "V");
var Ci = Ne;
var o = (_w = class {
  addEventListener() {
  }
  removeEventListener() {
  }
  dispatchEvent(t2) {
    return true;
  }
}, __name(_w, "o"), _w);
if (typeof DocumentFragment == "undefined") {
  const _e3 = class _e3 extends o {
  };
  __name(_e3, "e");
  let e2 = _e3;
  globalThis.DocumentFragment = e2;
}
var s = (_x = class extends o {
}, __name(_x, "s"), _x), b = { get(e2) {
}, define(e2, t2, n2) {
}, getName(e2) {
  return null;
}, upgrade(e2) {
}, whenDefined(e2) {
  return Promise.resolve(s);
} };
var h = { customElements: b }, E$1 = typeof window == "undefined" || typeof globalThis.customElements == "undefined", l = E$1 ? h : globalThis;
l.customElements.get("mux-player") || (l.customElements.define("mux-player", Ci), l.MuxPlayerElement = Ci);
var M = parseInt(React.version) >= 19, E = { className: "class", classname: "class", htmlFor: "for", crossOrigin: "crossorigin", viewBox: "viewBox", playsInline: "playsinline", autoPlay: "autoplay", playbackRate: "playbackrate" }, B = /* @__PURE__ */ __name((e2) => e2 == null, "B"), ee = /* @__PURE__ */ __name((e2, t2) => B(t2) ? false : e2 in t2, "ee"), te = /* @__PURE__ */ __name((e2) => e2.replace(/[A-Z]/g, (t2) => `-${t2.toLowerCase()}`), "te"), ne = /* @__PURE__ */ __name((e2, t2) => {
  if (!(!M && typeof t2 == "boolean" && !t2)) {
    if (ee(e2, E)) return E[e2];
    if (typeof t2 != "undefined") return /[A-Z]/.test(e2) ? te(e2) : e2;
  }
}, "ne");
var ae = /* @__PURE__ */ __name((e2, t2) => !M && typeof e2 == "boolean" ? "" : e2, "ae"), P = /* @__PURE__ */ __name((e2 = {}) => {
  let { ref: t2, ...n2 } = e2;
  return Object.entries(n2).reduce((o2, [a, l2]) => {
    let i2 = ne(a, l2);
    if (!i2) return o2;
    let c2 = ae(l2);
    return o2[i2] = c2, o2;
  }, {});
}, "P");
function x(e2, t2) {
  if (typeof e2 == "function") return e2(t2);
  e2 != null && (e2.current = t2);
}
__name(x, "x");
function re(...e2) {
  return (t2) => {
    let n2 = false, o2 = e2.map((a) => {
      let l2 = x(a, t2);
      return !n2 && typeof l2 == "function" && (n2 = true), l2;
    });
    if (n2) return () => {
      for (let a = 0; a < o2.length; a++) {
        let l2 = o2[a];
        typeof l2 == "function" ? l2() : x(e2[a], null);
      }
    };
  };
}
__name(re, "re");
function f(...e2) {
  return reactExports.useCallback(re(...e2), e2);
}
__name(f, "f");
var oe = Object.prototype.hasOwnProperty, ue = /* @__PURE__ */ __name((e2, t2) => {
  if (Object.is(e2, t2)) return true;
  if (typeof e2 != "object" || e2 === null || typeof t2 != "object" || t2 === null) return false;
  if (Array.isArray(e2)) return !Array.isArray(t2) || e2.length !== t2.length ? false : e2.some((a, l2) => t2[l2] === a);
  let n2 = Object.keys(e2), o2 = Object.keys(t2);
  if (n2.length !== o2.length) return false;
  for (let a = 0; a < n2.length; a++) if (!oe.call(t2, n2[a]) || !Object.is(e2[n2[a]], t2[n2[a]])) return false;
  return true;
}, "ue"), p = /* @__PURE__ */ __name((e2, t2, n2) => !ue(t2, e2[n2]), "p"), se = /* @__PURE__ */ __name((e2, t2, n2) => {
  e2[n2] = t2;
}, "se"), ie = /* @__PURE__ */ __name((e2, t2, n2, o2 = se, a = p) => reactExports.useEffect(() => {
  let l2 = n2 == null ? void 0 : n2.current;
  l2 && a(l2, t2, e2) && o2(l2, t2, e2);
}, [n2 == null ? void 0 : n2.current, t2]), "ie"), u = ie;
var ye = /* @__PURE__ */ __name(() => {
  try {
    return "3.9.2";
  } catch {
  }
  return "UNKNOWN";
}, "ye"), me = ye(), g = /* @__PURE__ */ __name(() => me, "g");
var r9 = /* @__PURE__ */ __name((e2, t2, n2) => reactExports.useEffect(() => {
  let o2 = t2 == null ? void 0 : t2.current;
  if (!o2 || !n2) return;
  let a = e2, l2 = n2;
  return o2.addEventListener(a, l2), () => {
    o2.removeEventListener(a, l2);
  };
}, [t2 == null ? void 0 : t2.current, n2, e2]), "r");
var Pe = React.forwardRef(({ children: e2, ...t2 }, n2) => React.createElement("mux-player", { suppressHydrationWarning: true, ...P(t2), ref: n2 }, e2)), xe = /* @__PURE__ */ __name((e2, t2) => {
  let { onAbort: n2, onCanPlay: o2, onCanPlayThrough: a, onEmptied: l2, onLoadStart: i2, onLoadedData: c2, onLoadedMetadata: v2, onProgress: R2, onDurationChange: T2, onVolumeChange: h2, onRateChange: b2, onResize: C2, onWaiting: k2, onPlay: O2, onPlaying: S2, onTimeUpdate: w2, onPause: N2, onSeeking: L2, onSeeked: A2, onStalled: I2, onSuspend: _2, onEnded: K2, onError: H2, onCuePointChange: D2, onChapterChange: V2, metadata: W2, tokens: U2, paused: z2, playbackId: F2, playbackRates: G2, currentTime: Z2, themeProps: j2, extraSourceParams: q2, castCustomData: J2, _hlsConfig: Y2, ...$2 } = t2;
  return u("tokens", U2, e2), u("playbackId", F2, e2), u("playbackRates", G2, e2), u("metadata", W2, e2), u("extraSourceParams", q2, e2), u("_hlsConfig", Y2, e2), u("themeProps", j2, e2), u("castCustomData", J2, e2), u("paused", z2, e2, (s2, y2) => {
    y2 != null && (y2 ? s2.pause() : s2.play());
  }, (s2, y2, Q2) => s2.hasAttribute("autoplay") && !s2.hasPlayed ? false : p(s2, y2, Q2)), u("currentTime", Z2, e2, (s2, y2) => {
    y2 != null && (s2.currentTime = y2);
  }), r9("abort", e2, n2), r9("canplay", e2, o2), r9("canplaythrough", e2, a), r9("emptied", e2, l2), r9("loadstart", e2, i2), r9("loadeddata", e2, c2), r9("loadedmetadata", e2, v2), r9("progress", e2, R2), r9("durationchange", e2, T2), r9("volumechange", e2, h2), r9("ratechange", e2, b2), r9("resize", e2, C2), r9("waiting", e2, k2), r9("play", e2, O2), r9("playing", e2, S2), r9("timeupdate", e2, w2), r9("pause", e2, N2), r9("seeking", e2, L2), r9("seeked", e2, A2), r9("stalled", e2, I2), r9("suspend", e2, _2), r9("ended", e2, K2), r9("error", e2, H2), r9("cuepointchange", e2, D2), r9("chapterchange", e2, V2), [$2];
}, "xe"), de = g(), fe = "mux-player-react", ge = React.forwardRef((e2, t2) => {
  var i2;
  let n2 = reactExports.useRef(null), o2 = f(n2, t2), [a] = xe(n2, e2), [l2] = reactExports.useState((i2 = e2.playerInitTime) != null ? i2 : Gr());
  return React.createElement(Pe, { ref: o2, defaultHiddenCaptions: e2.defaultHiddenCaptions, playerSoftwareName: fe, playerSoftwareVersion: de, playerInitTime: l2, ...a });
}), ze = ge;
export {
  rr as MaxResolution,
  f$3 as MediaError,
  nr as MinResolution,
  or as RenditionOrder,
  ze as default,
  Gr as generatePlayerInitTime,
  fe as playerSoftwareName,
  de as playerSoftwareVersion
};

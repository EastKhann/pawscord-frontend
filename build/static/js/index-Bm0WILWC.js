var Bf=Object.defineProperty;var n=(t,e)=>Bf(t,"name",{value:e,configurable:!0});import{a8 as gn,r as yn}from"./electron-Be_96jig.js";import{H as Wf,C as Ff}from"./hls-9ziT6Ol4.js";import{C as Hn,M as Kf}from"./mixin-DQogFkXs.js";var Vf=Object.create,Dm=Object.defineProperty,qf=Object.getOwnPropertyDescriptor,Yf=Object.getOwnPropertyNames,Gf=Object.getPrototypeOf,zf=Object.prototype.hasOwnProperty,Mm=n(function(t,e){return function(){return t&&(e=t(t=0)),e}},"mt$2"),ze=n(function(t,e){return function(){return e||t((e={exports:{}}).exports,e),e.exports}},"B$4"),Qf=n(function(t,e,i,a){if(e&&typeof e=="object"||typeof e=="function")for(var r=Yf(e),s=0,o=r.length,l;s<o;s++)l=r[s],!zf.call(t,l)&&l!==i&&Dm(t,l,{get:function(d){return e[d]}.bind(null,l),enumerable:!(a=qf(e,l))||a.enumerable});return t},"oa$1"),ct=n(function(t,e,i){return i=t!=null?Vf(Gf(t)):{},Qf(!t||!t.__esModule?Dm(i,"default",{value:t,enumerable:!0}):i,t)},"G$3"),ei=ze(function(t,e){var i;typeof window<"u"?i=window:typeof global<"u"?i=global:typeof self<"u"?i=self:i={},e.exports=i});function fa(t,e){return e!=null&&typeof Symbol<"u"&&e[Symbol.hasInstance]?!!e[Symbol.hasInstance](t):fa(t,e)}n(fa,"U$3");var Ea=Mm(function(){Ea()});function Om(t){"@swc/helpers - typeof";return t&&typeof Symbol<"u"&&t.constructor===Symbol?"symbol":typeof t}n(Om,"Me$2");var xm=Mm(function(){}),Nm=ze(function(t,e){var i=Array.prototype.slice;e.exports=a;function a(r,s){for(("length"in r)||(r=[r]),r=i.call(r);r.length;){var o=r.shift(),l=s(o);if(l)return l;o.childNodes&&o.childNodes.length&&(r=i.call(o.childNodes).concat(r))}}n(a,"Ca")}),jf=ze(function(t,e){Ea(),e.exports=i;function i(a,r){if(!fa(this,i))return new i(a,r);this.data=a,this.nodeValue=a,this.length=a.length,this.ownerDocument=r||null}n(i,"ye"),i.prototype.nodeType=8,i.prototype.nodeName="#comment",i.prototype.toString=function(){return"[object Comment]"}}),Zf=ze(function(t,e){Ea(),e.exports=i;function i(a,r){if(!fa(this,i))return new i(a);this.data=a||"",this.length=this.data.length,this.ownerDocument=r||null}n(i,"ne"),i.prototype.type="DOMTextNode",i.prototype.nodeType=3,i.prototype.nodeName="#text",i.prototype.toString=function(){return this.data},i.prototype.replaceData=function(a,r,s){var o=this.data,l=o.substring(0,a),d=o.substring(a+r,o.length);this.data=l+s+d,this.length=this.data.length}}),Pm=ze(function(t,e){e.exports=i;function i(a){var r=this,s=a.type;a.target||(a.target=r),r.listeners||(r.listeners={});var o=r.listeners[s];if(o)return o.forEach(function(l){a.currentTarget=r,typeof l=="function"?l(a):l.handleEvent(a)});r.parentNode&&r.parentNode.dispatchEvent(a)}n(i,"Ma")}),$m=ze(function(t,e){e.exports=i;function i(a,r){var s=this;s.listeners||(s.listeners={}),s.listeners[a]||(s.listeners[a]=[]),s.listeners[a].indexOf(r)===-1&&s.listeners[a].push(r)}n(i,"Ha")}),Um=ze(function(t,e){e.exports=i;function i(a,r){var s=this;if(s.listeners&&s.listeners[a]){var o=s.listeners[a],l=o.indexOf(r);l!==-1&&o.splice(l,1)}}n(i,"Ba")}),Xf=ze(function(t,e){xm(),e.exports=a;var i=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];function a(m){switch(m.nodeType){case 3:return p(m.data);case 8:return"<!--"+m.data+"-->";default:return r(m)}}n(a,"hr");function r(m){var u=[],f=m.tagName;return m.namespaceURI==="http://www.w3.org/1999/xhtml"&&(f=f.toLowerCase()),u.push("<"+f+c(m)+l(m)),i.indexOf(f)>-1?u.push(" />"):(u.push(">"),m.childNodes.length?u.push.apply(u,m.childNodes.map(a)):m.textContent||m.innerText?u.push(p(m.textContent||m.innerText)):m.innerHTML&&u.push(m.innerHTML),u.push("</"+f+">")),u.join("")}n(r,"Fa");function s(m,u){var f=Om(m[u]);return u==="style"&&Object.keys(m.style).length>0?!0:m.hasOwnProperty(u)&&(f==="string"||f==="boolean"||f==="number")&&u!=="nodeName"&&u!=="className"&&u!=="tagName"&&u!=="textContent"&&u!=="innerText"&&u!=="namespaceURI"&&u!=="innerHTML"}n(s,"Wa");function o(m){if(typeof m=="string")return m;var u="";return Object.keys(m).forEach(function(f){var _=m[f];f=f.replace(/[A-Z]/g,function(g){return"-"+g.toLowerCase()}),u+=f+":"+_+";"}),u}n(o,"ja");function l(m){var u=m.dataset,f=[];for(var _ in u)f.push({name:"data-"+_,value:u[_]});return f.length?d(f):""}n(l,"Va");function d(m){var u=[];return m.forEach(function(f){var _=f.name,g=f.value;_==="style"&&(g=o(g)),u.push(_+'="'+v(g)+'"')}),u.length?" "+u.join(" "):""}n(d,"yr");function c(m){var u=[];for(var f in m)s(m,f)&&u.push({name:f,value:m[f]});for(var _ in m._attributes)for(var g in m._attributes[_]){var T=m._attributes[_][g],A=(T.prefix?T.prefix+":":"")+g;u.push({name:A,value:T.value})}return m.className&&u.push({name:"class",value:m.className}),u.length?d(u):""}n(c,"Ga");function p(m){var u="";return typeof m=="string"?u=m:m&&(u=m.toString()),u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}n(p,"rt");function v(m){return p(m).replace(/"/g,"&quot;")}n(v,"Ja")}),Hm=ze(function(t,e){Ea();var i=Nm(),a=Pm(),r=$m(),s=Um(),o=Xf(),l="http://www.w3.org/1999/xhtml";e.exports=d;function d(c,p,v){if(!fa(this,d))return new d(c);var m=v===void 0?l:v||null;this.tagName=m===l?String(c).toUpperCase():c,this.nodeName=this.tagName,this.className="",this.dataset={},this.childNodes=[],this.parentNode=null,this.style={},this.ownerDocument=p||null,this.namespaceURI=m,this._attributes={},this.tagName==="INPUT"&&(this.type="text")}n(d,"I"),d.prototype.type="DOMElement",d.prototype.nodeType=1,d.prototype.appendChild=function(c){return c.parentNode&&c.parentNode.removeChild(c),this.childNodes.push(c),c.parentNode=this,c},d.prototype.replaceChild=function(c,p){c.parentNode&&c.parentNode.removeChild(c);var v=this.childNodes.indexOf(p);return p.parentNode=null,this.childNodes[v]=c,c.parentNode=this,p},d.prototype.removeChild=function(c){var p=this.childNodes.indexOf(c);return this.childNodes.splice(p,1),c.parentNode=null,c},d.prototype.insertBefore=function(c,p){c.parentNode&&c.parentNode.removeChild(c);var v=p==null?-1:this.childNodes.indexOf(p);return v>-1?this.childNodes.splice(v,0,c):this.childNodes.push(c),c.parentNode=this,c},d.prototype.setAttributeNS=function(c,p,v){var m=null,u=p,f=p.indexOf(":");if(f>-1&&(m=p.substr(0,f),u=p.substr(f+1)),this.tagName==="INPUT"&&p==="type")this.type=v;else{var _=this._attributes[c]||(this._attributes[c]={});_[u]={value:v,prefix:m}}},d.prototype.getAttributeNS=function(c,p){var v=this._attributes[c],m=v&&v[p]&&v[p].value;return this.tagName==="INPUT"&&p==="type"?this.type:typeof m!="string"?null:m},d.prototype.removeAttributeNS=function(c,p){var v=this._attributes[c];v&&delete v[p]},d.prototype.hasAttributeNS=function(c,p){var v=this._attributes[c];return!!v&&p in v},d.prototype.setAttribute=function(c,p){return this.setAttributeNS(null,c,p)},d.prototype.getAttribute=function(c){return this.getAttributeNS(null,c)},d.prototype.removeAttribute=function(c){return this.removeAttributeNS(null,c)},d.prototype.hasAttribute=function(c){return this.hasAttributeNS(null,c)},d.prototype.removeEventListener=s,d.prototype.addEventListener=r,d.prototype.dispatchEvent=a,d.prototype.focus=function(){},d.prototype.toString=function(){return o(this)},d.prototype.getElementsByClassName=function(c){var p=c.split(" "),v=[];return i(this,function(m){if(m.nodeType===1){var u=m.className||"",f=u.split(" ");p.every(function(_){return f.indexOf(_)!==-1})&&v.push(m)}}),v},d.prototype.getElementsByTagName=function(c){c=c.toLowerCase();var p=[];return i(this.childNodes,function(v){v.nodeType===1&&(c==="*"||v.tagName.toLowerCase()===c)&&p.push(v)}),p},d.prototype.contains=function(c){return i(this,function(p){return c===p})||!1}}),Jf=ze(function(t,e){Ea();var i=Hm();e.exports=a;function a(r){if(!fa(this,a))return new a;this.childNodes=[],this.parentNode=null,this.ownerDocument=r||null}n(a,"Y"),a.prototype.type="DocumentFragment",a.prototype.nodeType=11,a.prototype.nodeName="#document-fragment",a.prototype.appendChild=i.prototype.appendChild,a.prototype.replaceChild=i.prototype.replaceChild,a.prototype.removeChild=i.prototype.removeChild,a.prototype.toString=function(){return this.childNodes.map(function(r){return String(r)}).join("")}}),eE=ze(function(t,e){e.exports=i;function i(a){}n(i,"ot"),i.prototype.initEvent=function(a,r,s){this.type=a,this.bubbles=r,this.cancelable=s},i.prototype.preventDefault=function(){}}),tE=ze(function(t,e){Ea();var i=Nm(),a=jf(),r=Zf(),s=Hm(),o=Jf(),l=eE(),d=Pm(),c=$m(),p=Um();e.exports=v;function v(){if(!fa(this,v))return new v;this.head=this.createElement("head"),this.body=this.createElement("body"),this.documentElement=this.createElement("html"),this.documentElement.appendChild(this.head),this.documentElement.appendChild(this.body),this.childNodes=[this.documentElement],this.nodeType=9}n(v,"We");var m=v.prototype;m.createTextNode=function(u){return new r(u,this)},m.createElementNS=function(u,f){var _=u===null?null:String(u);return new s(f,this,_)},m.createElement=function(u){return new s(u,this)},m.createDocumentFragment=function(){return new o(this)},m.createEvent=function(u){return new l(u)},m.createComment=function(u){return new a(u,this)},m.getElementById=function(u){u=String(u);var f=i(this.childNodes,function(_){if(String(_.id)===u)return _});return f||null},m.getElementsByClassName=s.prototype.getElementsByClassName,m.getElementsByTagName=s.prototype.getElementsByTagName,m.contains=s.prototype.contains,m.removeEventListener=p,m.addEventListener=c,m.dispatchEvent=d}),iE=ze(function(t,e){var i=tE();e.exports=new i}),Bm=ze(function(t,e){var i=typeof global<"u"?global:typeof window<"u"?window:{},a=iE(),r;typeof document<"u"?r=document:(r=i["__GLOBAL_DOCUMENT_CACHE@4"],r||(r=i["__GLOBAL_DOCUMENT_CACHE@4"]=a)),e.exports=r});function aE(t){if(Array.isArray(t))return t}n(aE,"vt$2");function rE(t,e){var i=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(i!=null){var a=[],r=!0,s=!1,o,l;try{for(i=i.call(t);!(r=(o=i.next()).done)&&(a.push(o.value),!(e&&a.length===e));r=!0);}catch(d){s=!0,l=d}finally{try{!r&&i.return!=null&&i.return()}finally{if(s)throw l}}return a}}n(rE,"ht$2");function nE(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}n(nE,"yt$2");function Wl(t,e){(e==null||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}n(Wl,"Re$2");function Wm(t,e){if(t){if(typeof t=="string")return Wl(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);if(i==="Object"&&t.constructor&&(i=t.constructor.name),i==="Map"||i==="Set")return Array.from(i);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return Wl(t,e)}}n(Wm,"Le$2");function Ei(t,e){return aE(t)||rE(t,e)||Wm(t,e)||nE()}n(Ei,"H$1");var on=ct(ei()),zc=ct(ei()),sE=ct(ei()),oE={now:n(function(){var t=sE.default.performance,e=t&&t.timing,i=e&&e.navigationStart,a=typeof i=="number"&&typeof t.now=="function"?i+t.now():Date.now();return Math.round(a)},"now")},De=oE,Tn=n(function(){var t,e,i;if(typeof((t=zc.default.crypto)===null||t===void 0?void 0:t.getRandomValues)=="function"){i=new Uint8Array(32),zc.default.crypto.getRandomValues(i);for(var a=0;a<32;a++)i[a]=i[a]%16}else{i=[];for(var r=0;r<32;r++)i[r]=Math.random()*16|0}var s=0;e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(d){var c=d==="x"?i[s]:i[s]&3|8;return s++,c.toString(16)});var o=De.now(),l=o?.toString(16).substring(3);return l?e.substring(0,28)+l:e},"re$3"),Fm=n(function(){return("000000"+(Math.random()*Math.pow(36,6)<<0).toString(36)).slice(-6)},"Ie$2"),Et=n(function(t){if(t&&typeof t.nodeName<"u")return t.muxId||(t.muxId=Fm()),t.muxId;var e;try{e=document.querySelector(t)}catch{}return e&&!e.muxId&&(e.muxId=t),e?.muxId||t},"J$2"),Eo=n(function(t){var e;t&&typeof t.nodeName<"u"?(e=t,t=Et(e)):e=document.querySelector(t);var i=e&&e.nodeName?e.nodeName.toLowerCase():"";return[e,t,i]},"de$4");function lE(t){if(Array.isArray(t))return Wl(t)}n(lE,"wt");function dE(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}n(dE,"Tt$2");function uE(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}n(uE,"Et$1");function _t(t){return lE(t)||dE(t)||Wm(t)||uE()}n(_t,"W$2");var ra={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4},cE=n(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:3,i,a,r,s,o,l=[console,t],d=(i=console.trace).bind.apply(i,_t(l)),c=(a=console.info).bind.apply(a,_t(l)),p=(r=console.debug).bind.apply(r,_t(l)),v=(s=console.warn).bind.apply(s,_t(l)),m=(o=console.error).bind.apply(o,_t(l)),u=e;return{trace:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(u>ra.TRACE))return d.apply(void 0,_t(_))},"trace"),debug:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(u>ra.DEBUG))return p.apply(void 0,_t(_))},"debug"),info:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(u>ra.INFO))return c.apply(void 0,_t(_))},"info"),warn:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(u>ra.WARN))return v.apply(void 0,_t(_))},"warn"),error:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(u>ra.ERROR))return m.apply(void 0,_t(_))},"error"),get level(){return u},set level(f){f!==this.level&&(u=f??e)}}},"kt$2"),ie=cE("[mux]"),_l=ct(ei());function Fl(){var t=_l.default.doNotTrack||_l.default.navigator&&_l.default.navigator.doNotTrack;return t==="1"}n(Fl,"fe$2");function $(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n($,"b$3");Ea();function ve(t,e){if(!fa(t,e))throw new TypeError("Cannot call a class as a function")}n(ve,"k$3");function Qc(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}n(Qc,"xt$1");function ht(t,e,i){return e&&Qc(t.prototype,e),i&&Qc(t,i),t}n(ht,"N$2");function I(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}n(I,"l$2");function ur(t){return ur=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},ur(t)}n(ur,"$$2");function hE(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&(t=ur(t),t!==null););return t}n(hE,"Rt$2");function ns(t,e,i){return typeof Reflect<"u"&&Reflect.get?ns=Reflect.get:ns=n(function(a,r,s){var o=hE(a,r);if(o){var l=Object.getOwnPropertyDescriptor(o,r);return l.get?l.get.call(s||a):l.value}},"Se$2"),ns(t,e,i||t)}n(ns,"Se$2");function Kl(t,e){return Kl=Object.setPrototypeOf||function(i,a){return i.__proto__=a,i},Kl(t,e)}n(Kl,"Ce$2");function mE(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Kl(t,e)}n(mE,"Dt$1");function pE(t,e){if(t==null)return{};var i={},a=Object.keys(t),r,s;for(s=0;s<a.length;s++)r=a[s],!(e.indexOf(r)>=0)&&(i[r]=t[r]);return i}n(pE,"St$2");function vE(t,e){if(t==null)return{};var i=pE(t,e),a,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)a=s[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}n(vE,"qt$2");function fE(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}n(fE,"At$2");xm();function EE(t,e){return e&&(Om(e)==="object"||typeof e=="function")?e:$(t)}n(EE,"Ot$1");function _E(t){var e=fE();return function(){var i=ur(t),a;if(e){var r=ur(this).constructor;a=Reflect.construct(i,arguments,r)}else a=i.apply(this,arguments);return EE(this,a)}}n(_E,"Pt$1");var St=n(function(t){return An(t)[0]},"F$1"),An=n(function(t){if(typeof t!="string"||t==="")return["localhost"];var e=/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,i=t.match(e)||[],a=i[4],r;return a&&(r=(a.match(/[^\.]+\.[^\.]+$/)||[])[0]),[a,r]},"ie$3"),bl=ct(ei()),bE={exists:n(function(){var t=bl.default.performance,e=t&&t.timing;return e!==void 0},"exists"),domContentLoadedEventEnd:n(function(){var t=bl.default.performance,e=t&&t.timing;return e&&e.domContentLoadedEventEnd},"domContentLoadedEventEnd"),navigationStart:n(function(){var t=bl.default.performance,e=t&&t.timing;return e&&e.navigationStart},"navigationStart")},_o=bE;function we(t,e,i){i=i===void 0?1:i,t[e]=t[e]||0,t[e]+=i}n(we,"P$4");function kn(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{},a=Object.keys(i);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(i).filter(function(r){return Object.getOwnPropertyDescriptor(i,r).enumerable}))),a.forEach(function(r){I(t,r,i[r])})}return t}n(kn,"Z$2");function gE(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);i.push.apply(i,a)}return i}n(gE,"la$1");function ou(t,e){return e=e??{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):gE(Object(e)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}),t}n(ou,"me$3");var yE=["x-cdn","content-type"],Km=["x-request-id","cf-ray","x-amz-cf-id","x-akamai-request-id"],TE=yE.concat(Km);function lu(t){t=t||"";var e={},i=t.trim().split(/[\r\n]+/);return i.forEach(function(a){if(a){var r=a.split(": "),s=r.shift();s&&(TE.indexOf(s.toLowerCase())>=0||s.toLowerCase().indexOf("x-litix-")===0)&&(e[s]=r.join(": "))}}),e}n(lu,"ve$1");function bo(t){if(t){var e=Km.find(function(i){return t[i]!==void 0});return e?t[e]:void 0}}n(bo,"ce$2");var AE=n(function(t){var e={};for(var i in t){var a=t[i],r=a["DATA-ID"].search("io.litix.data.");if(r!==-1){var s=a["DATA-ID"].replace("io.litix.data.","");e[s]=a.VALUE}}return e},"_a$1"),Vm=AE,Bn=n(function(t){if(!t)return{};var e=_o.navigationStart(),i=t.loading,a=i?i.start:t.trequest,r=i?i.first:t.tfirst,s=i?i.end:t.tload;return{bytesLoaded:t.total,requestStart:Math.round(e+a),responseStart:Math.round(e+r),responseEnd:Math.round(e+s)}},"Ue$1"),Ar=n(function(t){if(!(!t||typeof t.getAllResponseHeaders!="function"))return lu(t.getAllResponseHeaders())},"qe$1"),kE=n(function(t,e,i){var a=arguments.length>4?arguments[4]:void 0,r=t.log,s=t.utils.secondsToMs,o=n(function(g){var T=parseInt(a.version),A;return T===1&&g.programDateTime!==null&&(A=g.programDateTime),T===0&&g.pdt!==null&&(A=g.pdt),A},"s");if(!_o.exists()){r.warn("performance timing not supported. Not tracking HLS.js.");return}var l=n(function(g,T){return t.emit(e,g,T)},"u"),d=n(function(g,T){var A=T.levels,y=T.audioTracks,S=T.url,M=T.stats,D=T.networkDetails,U=T.sessionData,W={},z={};A.forEach(function(fe,Be){W[Be]={width:fe.width,height:fe.height,bitrate:fe.bitrate,attrs:fe.attrs}}),y.forEach(function(fe,Be){z[Be]={name:fe.name,language:fe.lang,bitrate:fe.bitrate}});var F=Bn(M),H=F.bytesLoaded,Pe=F.requestStart,Qe=F.responseStart,je=F.responseEnd;l("requestcompleted",ou(kn({},Vm(U)),{request_event_type:g,request_bytes_loaded:H,request_start:Pe,request_response_start:Qe,request_response_end:je,request_type:"manifest",request_hostname:St(S),request_response_headers:Ar(D),request_rendition_lists:{media:W,audio:z,video:{}}}))},"p");i.on(a.Events.MANIFEST_LOADED,d);var c=n(function(g,T){var A=T.details,y=T.level,S=T.networkDetails,M=T.stats,D=Bn(M),U=D.bytesLoaded,W=D.requestStart,z=D.responseStart,F=D.responseEnd,H=A.fragments[A.fragments.length-1],Pe=o(H)+s(H.duration);l("requestcompleted",{request_event_type:g,request_bytes_loaded:U,request_start:W,request_response_start:z,request_response_end:F,request_current_level:y,request_type:"manifest",request_hostname:St(A.url),request_response_headers:Ar(S),video_holdback:A.holdBack&&s(A.holdBack),video_part_holdback:A.partHoldBack&&s(A.partHoldBack),video_part_target_duration:A.partTarget&&s(A.partTarget),video_target_duration:A.targetduration&&s(A.targetduration),video_source_is_live:A.live,player_manifest_newest_program_time:isNaN(Pe)?void 0:Pe})},"y");i.on(a.Events.LEVEL_LOADED,c);var p=n(function(g,T){var A=T.details,y=T.networkDetails,S=T.stats,M=Bn(S),D=M.bytesLoaded,U=M.requestStart,W=M.responseStart,z=M.responseEnd;l("requestcompleted",{request_event_type:g,request_bytes_loaded:D,request_start:U,request_response_start:W,request_response_end:z,request_type:"manifest",request_hostname:St(A.url),request_response_headers:Ar(y)})},"x");i.on(a.Events.AUDIO_TRACK_LOADED,p);var v=n(function(g,T){var A=T.stats,y=T.networkDetails,S=T.frag;A=A||S.stats;var M=Bn(A),D=M.bytesLoaded,U=M.requestStart,W=M.responseStart,z=M.responseEnd,F=y?Ar(y):void 0,H={request_event_type:g,request_bytes_loaded:D,request_start:U,request_response_start:W,request_response_end:z,request_hostname:y?St(y.responseURL):void 0,request_id:F?bo(F):void 0,request_response_headers:F,request_media_duration:S.duration,request_url:y?.responseURL};S.type==="main"?(H.request_type="media",H.request_current_level=S.level,H.request_video_width=(i.levels[S.level]||{}).width,H.request_video_height=(i.levels[S.level]||{}).height,H.request_labeled_bitrate=(i.levels[S.level]||{}).bitrate):H.request_type=S.type,l("requestcompleted",H)},"D");i.on(a.Events.FRAG_LOADED,v);var m=n(function(g,T){var A=T.frag,y=A.start,S=o(A),M={currentFragmentPDT:S,currentFragmentStart:s(y)};l("fragmentchange",M)},"f");i.on(a.Events.FRAG_CHANGED,m);var u=n(function(g,T){var A=T.type,y=T.details,S=T.response,M=T.fatal,D=T.frag,U=T.networkDetails,W=D?.url||T.url||"",z=U?Ar(U):void 0;if((y===a.ErrorDetails.MANIFEST_LOAD_ERROR||y===a.ErrorDetails.MANIFEST_LOAD_TIMEOUT||y===a.ErrorDetails.FRAG_LOAD_ERROR||y===a.ErrorDetails.FRAG_LOAD_TIMEOUT||y===a.ErrorDetails.LEVEL_LOAD_ERROR||y===a.ErrorDetails.LEVEL_LOAD_TIMEOUT||y===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||y===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT||y===a.ErrorDetails.SUBTITLE_LOAD_ERROR||y===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT||y===a.ErrorDetails.KEY_LOAD_ERROR||y===a.ErrorDetails.KEY_LOAD_TIMEOUT)&&l("requestfailed",{request_error:y,request_url:W,request_hostname:St(W),request_id:z?bo(z):void 0,request_type:y===a.ErrorDetails.FRAG_LOAD_ERROR||y===a.ErrorDetails.FRAG_LOAD_TIMEOUT?"media":y===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||y===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT?"audio":y===a.ErrorDetails.SUBTITLE_LOAD_ERROR||y===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT?"subtitle":y===a.ErrorDetails.KEY_LOAD_ERROR||y===a.ErrorDetails.KEY_LOAD_TIMEOUT?"encryption":"manifest",request_error_code:S?.code,request_error_text:S?.text}),M){var F,H="".concat(W?"url: ".concat(W,`
`):"")+"".concat(S&&(S.code||S.text)?"response: ".concat(S.code,", ").concat(S.text,`
`):"")+"".concat(T.reason?"failure reason: ".concat(T.reason,`
`):"")+"".concat(T.level?"level: ".concat(T.level,`
`):"")+"".concat(T.parent?"parent stream controller: ".concat(T.parent,`
`):"")+"".concat(T.buffer?"buffer length: ".concat(T.buffer,`
`):"")+"".concat(T.error?"error: ".concat(T.error,`
`):"")+"".concat(T.event?"event: ".concat(T.event,`
`):"")+"".concat(T.err?"error message: ".concat((F=T.err)===null||F===void 0?void 0:F.message,`
`):"");l("error",{player_error_code:A,player_error_message:y,player_error_context:H})}},"_");i.on(a.Events.ERROR,u);var f=n(function(g,T){var A=T.frag,y=A&&A._url||"";l("requestcanceled",{request_event_type:g,request_url:y,request_type:"media",request_hostname:St(y)})},"v");i.on(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,f);var _=n(function(g,T){var A=T.level,y=i.levels[A];if(y&&y.attrs&&y.attrs.BANDWIDTH){var S=y.attrs.BANDWIDTH,M,D=parseFloat(y.attrs["FRAME-RATE"]);isNaN(D)||(M=D),S?l("renditionchange",{video_source_fps:M,video_source_bitrate:S,video_source_width:y.width,video_source_height:y.height,video_source_rendition_name:y.name,video_source_codec:y?.videoCodec}):r.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js")}},"w");i.on(a.Events.LEVEL_SWITCHED,_),i._stopMuxMonitor=function(){i.off(a.Events.MANIFEST_LOADED,d),i.off(a.Events.LEVEL_LOADED,c),i.off(a.Events.AUDIO_TRACK_LOADED,p),i.off(a.Events.FRAG_LOADED,v),i.off(a.Events.FRAG_CHANGED,m),i.off(a.Events.ERROR,u),i.off(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,f),i.off(a.Events.LEVEL_SWITCHED,_),i.off(a.Events.DESTROYING,i._stopMuxMonitor),delete i._stopMuxMonitor},i.on(a.Events.DESTROYING,i._stopMuxMonitor)},"It$2"),SE=n(function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},"Nt$2"),jc=n(function(t,e){if(!t||!t.requestEndDate)return{};var i=St(t.url),a=t.url,r=t.bytesLoaded,s=new Date(t.requestStartDate).getTime(),o=new Date(t.firstByteDate).getTime(),l=new Date(t.requestEndDate).getTime(),d=isNaN(t.duration)?0:t.duration,c=typeof e.getMetricsFor=="function"?e.getMetricsFor(t.mediaType).HttpList:e.getDashMetrics().getHttpRequests(t.mediaType),p;c.length>0&&(p=lu(c[c.length-1]._responseHeaders||""));var v=p?bo(p):void 0;return{requestStart:s,requestResponseStart:o,requestResponseEnd:l,requestBytesLoaded:r,requestResponseHeaders:p,requestMediaDuration:d,requestHostname:i,requestUrl:a,requestId:v}},"Ct$2"),wE=n(function(t,e){if(typeof e.getCurrentRepresentationForType=="function"){var i=e.getCurrentRepresentationForType(t);return i?{currentLevel:i.absoluteIndex,renditionWidth:i.width||null,renditionHeight:i.height||null,renditionBitrate:i.bandwidth}:{}}var a=e.getQualityFor(t),r=e.getCurrentTrackFor(t).bitrateList;return r?{currentLevel:a,renditionWidth:r[a].width||null,renditionHeight:r[a].height||null,renditionBitrate:r[a].bandwidth}:{}},"fa$1"),IE=n(function(t){var e;return(e=t.match(/.*codecs\*?="(.*)"/))===null||e===void 0?void 0:e[1]},"pa$1"),RE=n(function(t){try{var e,i,a=(i=t.getVersion)===null||i===void 0||(e=i.call(t))===null||e===void 0?void 0:e.split(".").map(function(r){return parseInt(r)})[0];return a}catch{return!1}},"ma$1"),LE=n(function(t,e,i){var a=t.log;if(!i||!i.on){a.warn("Invalid dash.js player reference. Monitoring blocked.");return}var r=RE(i),s=n(function(A,y){return t.emit(e,A,y)},"o"),o=n(function(A){var y=A.type,S=A.data,M=(S||{}).url;s("requestcompleted",{request_event_type:y,request_start:0,request_response_start:0,request_response_end:0,request_bytes_loaded:-1,request_type:"manifest",request_hostname:St(M),request_url:M})},"s");i.on("manifestLoaded",o);var l={},d=n(function(A){if(typeof A.getRequests!="function")return null;var y=A.getRequests({state:"executed"});return y.length===0?null:y[y.length-1]},"p"),c=n(function(A){var y=A.type,S=A.fragmentModel,M=A.chunk,D=d(S);p({type:y,request:D,chunk:M})},"y"),p=n(function(A){var y=A.type,S=A.chunk,M=A.request,D=(S||{}).mediaInfo,U=D||{},W=U.type,z=U.bitrateList;z=z||[];var F={};z.forEach(function(Ze,Ie){F[Ie]={},F[Ie].width=Ze.width,F[Ie].height=Ze.height,F[Ie].bitrate=Ze.bandwidth,F[Ie].attrs={}}),W==="video"?l.video=F:W==="audio"?l.audio=F:l.media=F;var H=jc(M,i),Pe=H.requestStart,Qe=H.requestResponseStart,je=H.requestResponseEnd,fe=H.requestResponseHeaders,Be=H.requestMediaDuration,Lt=H.requestHostname,We=H.requestUrl,pt=H.requestId;s("requestcompleted",{request_event_type:y,request_start:Pe,request_response_start:Qe,request_response_end:je,request_bytes_loaded:-1,request_type:W+"_init",request_response_headers:fe,request_hostname:Lt,request_id:pt,request_url:We,request_media_duration:Be,request_rendition_lists:l})},"x");r>=4?i.on("initFragmentLoaded",p):i.on("initFragmentLoaded",c);var v=n(function(A){var y=A.type,S=A.fragmentModel,M=A.chunk,D=d(S);m({type:y,request:D,chunk:M})},"D"),m=n(function(A){var y=A.type,S=A.chunk,M=A.request,D=S||{},U=D.mediaInfo,W=D.start,z=U||{},F=z.type,H=jc(M,i),Pe=H.requestStart,Qe=H.requestResponseStart,je=H.requestResponseEnd,fe=H.requestBytesLoaded,Be=H.requestResponseHeaders,Lt=H.requestMediaDuration,We=H.requestHostname,pt=H.requestUrl,Ze=H.requestId,Ie=wE(F,i),$e=Ie.currentLevel,Fe=Ie.renditionWidth,ti=Ie.renditionHeight,Vi=Ie.renditionBitrate;s("requestcompleted",{request_event_type:y,request_start:Pe,request_response_start:Qe,request_response_end:je,request_bytes_loaded:fe,request_type:F,request_response_headers:Be,request_hostname:We,request_id:Ze,request_url:pt,request_media_start_time:W,request_media_duration:Lt,request_current_level:$e,request_labeled_bitrate:Vi,request_video_width:Fe,request_video_height:ti})},"f");r>=4?i.on("mediaFragmentLoaded",m):i.on("mediaFragmentLoaded",v);var u={video:void 0,audio:void 0,totalBitrate:void 0},f=n(function(){if(u.video&&typeof u.video.bitrate=="number"){if(!(u.video.width&&u.video.height)){a.warn("have bitrate info for video but missing width/height");return}var A=u.video.bitrate;if(u.audio&&typeof u.audio.bitrate=="number"&&(A+=u.audio.bitrate),A!==u.totalBitrate)return u.totalBitrate=A,{video_source_bitrate:A,video_source_height:u.video.height,video_source_width:u.video.width,video_source_codec:IE(u.video.codec)}}},"v"),_=n(function(A,y,S){var M=A.mediaType;if(M==="audio"||M==="video"){var D;if(typeof i.getRepresentationsByType=="function")if(A.newRepresentation)D={bitrate:A.newRepresentation.bandwidth,width:A.newRepresentation.width,height:A.newRepresentation.height,qualityIndex:A.newRepresentation.absoluteIndex};else{var U=i.getRepresentationsByType(M);if(U&&typeof A.newQuality=="number"){var W=U.find(function(F){return F.absoluteIndex===A.newQuality||F.index===A.newQuality});W&&(D={bitrate:W.bandwidth,width:W.width,height:W.height,qualityIndex:A.newQuality})}}else{if(typeof A.newQuality!="number"){a.warn("missing evt.newQuality in qualityChangeRendered event",A);return}D=i.getBitrateInfoListFor(M).find(function(F){var H=F.qualityIndex;return H===A.newQuality})}if(!(D&&typeof D.bitrate=="number")){a.warn("missing bitrate info for ".concat(M));return}u[M]=ou(kn({},D),{codec:i.getCurrentTrackFor(M).codec});var z=f();z&&s("renditionchange",z)}},"w");i.on("qualityChangeRendered",_);var g=n(function(A){var y=A.request,S=A.mediaType;y=y||{},s("requestcanceled",{request_event_type:y.type+"_"+y.action,request_url:y.url,request_type:S,request_hostname:St(y.url)})},"h");i.on("fragmentLoadingAbandoned",g);var T=n(function(A){var y=A.error,S,M,D=(y==null||(S=y.data)===null||S===void 0?void 0:S.request)||{},U=(y==null||(M=y.data)===null||M===void 0?void 0:M.response)||{};y?.code===27&&s("requestfailed",{request_error:D.type+"_"+D.action,request_url:D.url,request_hostname:St(D.url),request_type:D.mediaType,request_error_code:U.status,request_error_text:U.statusText});var W="".concat(D!=null&&D.url?"url: ".concat(D.url,`
`):"")+"".concat(U!=null&&U.status||U!=null&&U.statusText?"response: ".concat(U?.status,", ").concat(U?.statusText,`
`):"");s("error",{player_error_code:y?.code,player_error_message:y?.message,player_error_context:W})},"m");i.on("error",T),i._stopMuxMonitor=function(){i.off("manifestLoaded",o),i.off("initFragmentLoaded",p),i.off("mediaFragmentLoaded",m),i.off("qualityChangeRendered",_),i.off("error",T),i.off("fragmentLoadingAbandoned",g),delete i._stopMuxMonitor}},"Mt$2"),CE=n(function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},"Ht$1"),Zc=0,DE=(function(){function t(){ve(this,t),I(this,"_listeners",void 0)}return n(t,"r"),ht(t,[{key:"on",value:n(function(e,i,a){return i._eventEmitterGuid=i._eventEmitterGuid||++Zc,this._listeners=this._listeners||{},this._listeners[e]=this._listeners[e]||[],a&&(i=i.bind(a)),this._listeners[e].push(i),i},"value")},{key:"off",value:n(function(e,i){var a=this._listeners&&this._listeners[e];a&&a.forEach(function(r,s){r._eventEmitterGuid===i._eventEmitterGuid&&a.splice(s,1)})},"value")},{key:"one",value:n(function(e,i,a){var r=this;i._eventEmitterGuid=i._eventEmitterGuid||++Zc;var s=n(function(){r.off(e,s),i.apply(a||this,arguments)},"o");s._eventEmitterGuid=i._eventEmitterGuid,this.on(e,s)},"value")},{key:"emit",value:n(function(e,i){var a=this;if(this._listeners){i=i||{};var r=this._listeners["before"+e]||[],s=this._listeners["before*"]||[],o=this._listeners[e]||[],l=this._listeners["after"+e]||[],d=n(function(c,p){c=c.slice(),c.forEach(function(v){v.call(a,{type:e},p)})},"p");d(r,i),d(s,i),d(o,i),d(l,i)}},"value")}]),t})(),ME=DE,gl=ct(ei()),OE=(function(){function t(e){var i=this;ve(this,t),I(this,"_playbackHeartbeatInterval",void 0),I(this,"_playheadShouldBeProgressing",void 0),I(this,"pm",void 0),this.pm=e,this._playbackHeartbeatInterval=null,this._playheadShouldBeProgressing=!1,e.on("playing",function(){i._playheadShouldBeProgressing=!0}),e.on("play",this._startPlaybackHeartbeatInterval.bind(this)),e.on("playing",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adbreakstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplay",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplaying",this._startPlaybackHeartbeatInterval.bind(this)),e.on("devicewake",this._startPlaybackHeartbeatInterval.bind(this)),e.on("viewstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("rebufferstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("pause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("ended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("viewend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("error",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("aderror",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adpause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adbreakend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("seeked",function(){e.data.player_is_paused?i._stopPlaybackHeartbeatInterval():i._startPlaybackHeartbeatInterval()}),e.on("timeupdate",function(){i._playbackHeartbeatInterval!==null&&e.emit("playbackheartbeat")}),e.on("devicesleep",function(a,r){i._playbackHeartbeatInterval!==null&&(gl.default.clearInterval(i._playbackHeartbeatInterval),e.emit("playbackheartbeatend",{viewer_time:r.viewer_time}),i._playbackHeartbeatInterval=null)})}return n(t,"r"),ht(t,[{key:"_startPlaybackHeartbeatInterval",value:n(function(){var e=this;this._playbackHeartbeatInterval===null&&(this.pm.emit("playbackheartbeat"),this._playbackHeartbeatInterval=gl.default.setInterval(function(){e.pm.emit("playbackheartbeat")},this.pm.playbackHeartbeatTime))},"value")},{key:"_stopPlaybackHeartbeatInterval",value:n(function(){this._playheadShouldBeProgressing=!1,this._playbackHeartbeatInterval!==null&&(gl.default.clearInterval(this._playbackHeartbeatInterval),this.pm.emit("playbackheartbeatend"),this._playbackHeartbeatInterval=null)},"value")}]),t})(),xE=OE,NE=n(function t(e){var i=this;ve(this,t),I(this,"viewErrored",void 0),e.on("viewinit",function(){i.viewErrored=!1}),e.on("error",function(a,r){try{var s=e.errorTranslator({player_error_code:r.player_error_code,player_error_message:r.player_error_message,player_error_context:r.player_error_context,player_error_severity:r.player_error_severity,player_error_business_exception:r.player_error_business_exception});s&&(e.data.player_error_code=s.player_error_code||r.player_error_code,e.data.player_error_message=s.player_error_message||r.player_error_message,e.data.player_error_context=s.player_error_context||r.player_error_context,e.data.player_error_severity=s.player_error_severity||r.player_error_severity,e.data.player_error_business_exception=s.player_error_business_exception||r.player_error_business_exception,i.viewErrored=!0)}catch(o){e.mux.log.warn("Exception in error translator callback.",o),i.viewErrored=!0}}),e.on("aftererror",function(){var a,r,s,o,l;(a=e.data)===null||a===void 0||delete a.player_error_code,(r=e.data)===null||r===void 0||delete r.player_error_message,(s=e.data)===null||s===void 0||delete s.player_error_context,(o=e.data)===null||o===void 0||delete o.player_error_severity,(l=e.data)===null||l===void 0||delete l.player_error_business_exception})},"r"),PE=NE,$E=(function(){function t(e){ve(this,t),I(this,"_watchTimeTrackerLastCheckedTime",void 0),I(this,"pm",void 0),this.pm=e,this._watchTimeTrackerLastCheckedTime=null,e.on("playbackheartbeat",this._updateWatchTime.bind(this)),e.on("playbackheartbeatend",this._clearWatchTimeState.bind(this))}return n(t,"r"),ht(t,[{key:"_updateWatchTime",value:n(function(e,i){var a=i.viewer_time;this._watchTimeTrackerLastCheckedTime===null&&(this._watchTimeTrackerLastCheckedTime=a),we(this.pm.data,"view_watch_time",a-this._watchTimeTrackerLastCheckedTime),this._watchTimeTrackerLastCheckedTime=a},"value")},{key:"_clearWatchTimeState",value:n(function(e,i){this._updateWatchTime(e,i),this._watchTimeTrackerLastCheckedTime=null},"value")}]),t})(),UE=$E,HE=(function(){function t(e){var i=this;ve(this,t),I(this,"_playbackTimeTrackerLastPlayheadPosition",void 0),I(this,"_lastTime",void 0),I(this,"_isAdPlaying",void 0),I(this,"_callbackUpdatePlaybackTime",void 0),I(this,"pm",void 0),this.pm=e,this._playbackTimeTrackerLastPlayheadPosition=-1,this._lastTime=De.now(),this._isAdPlaying=!1,this._callbackUpdatePlaybackTime=null,e.on("viewinit",function(){i.pm.data.view_playing_time_ms_cumulative=0});var a=this._startPlaybackTimeTracking.bind(this);e.on("playing",a),e.on("adplaying",a);var r=n(function(){i.pm.data.player_is_paused||a()},"a");e.on("seeked",r),e.on("rebufferend",r);var s=this._stopPlaybackTimeTracking.bind(this);e.on("playbackheartbeatend",s),e.on("seeking",s),e.on("rebufferstart",s),e.on("adplaying",function(){i._isAdPlaying=!0}),e.on("adended",function(){i._isAdPlaying=!1}),e.on("adpause",function(){i._isAdPlaying=!1}),e.on("adbreakstart",function(){i._isAdPlaying=!1}),e.on("adbreakend",function(){i._isAdPlaying=!1}),e.on("adplay",function(){i._isAdPlaying=!1}),e.on("viewinit",function(){i._playbackTimeTrackerLastPlayheadPosition=-1,i._lastTime=De.now(),i._isAdPlaying=!1,i._callbackUpdatePlaybackTime=null})}return n(t,"r"),ht(t,[{key:"_startPlaybackTimeTracking",value:n(function(){this._callbackUpdatePlaybackTime===null&&(this._callbackUpdatePlaybackTime=this._updatePlaybackTime.bind(this),this._playbackTimeTrackerLastPlayheadPosition=this.pm.data.player_playhead_time,this._lastTime=De.now(),this.pm.on("playbackheartbeat",this._callbackUpdatePlaybackTime))},"value")},{key:"_stopPlaybackTimeTracking",value:n(function(){this._callbackUpdatePlaybackTime&&(this._updatePlaybackTime(),this.pm.off("playbackheartbeat",this._callbackUpdatePlaybackTime),this._callbackUpdatePlaybackTime=null,this._playbackTimeTrackerLastPlayheadPosition=-1)},"value")},{key:"_updatePlaybackTime",value:n(function(){var e=this.pm.data.player_playhead_time||0,i=De.now(),a=i-this._lastTime,r=-1;this._playbackTimeTrackerLastPlayheadPosition>=0&&e>this._playbackTimeTrackerLastPlayheadPosition?r=e-this._playbackTimeTrackerLastPlayheadPosition:this._isAdPlaying&&(r=a),r>0&&r<=1e3&&we(this.pm.data,"view_content_playback_time",r),this._callbackUpdatePlaybackTime!==null&&a>0&&a<=1e3&&(this._isAdPlaying&&we(this.pm.data,"ad_playing_time_ms_cumulative",a),we(this.pm.data,"view_playing_time_ms_cumulative",a)),this._playbackTimeTrackerLastPlayheadPosition=e,this._lastTime=i},"value")}]),t})(),BE=HE,WE=(function(){function t(e){ve(this,t),I(this,"pm",void 0),this.pm=e;var i=this._updatePlayheadTime.bind(this);e.on("playbackheartbeat",i),e.on("playbackheartbeatend",i),e.on("timeupdate",i),e.on("destroy",function(){e.off("timeupdate",i)})}return n(t,"r"),ht(t,[{key:"_updateMaxPlayheadPosition",value:n(function(){this.pm.data.view_max_playhead_position=typeof this.pm.data.view_max_playhead_position>"u"?this.pm.data.player_playhead_time:Math.max(this.pm.data.view_max_playhead_position,this.pm.data.player_playhead_time)},"value")},{key:"_updatePlayheadTime",value:n(function(e,i){var a=this,r=n(function(){a.pm.currentFragmentPDT&&a.pm.currentFragmentStart&&(a.pm.data.player_program_time=a.pm.currentFragmentPDT+a.pm.data.player_playhead_time-a.pm.currentFragmentStart)},"n");if(i&&i.player_playhead_time)this.pm.data.player_playhead_time=i.player_playhead_time,r(),this._updateMaxPlayheadPosition();else if(this.pm.getPlayheadTime){var s=this.pm.getPlayheadTime();typeof s<"u"&&(this.pm.data.player_playhead_time=s,r(),this._updateMaxPlayheadPosition())}},"value")}]),t})(),FE=WE,Xc=300*1e3,KE=n(function t(e){if(ve(this,t),!e.disableRebufferTracking){var i,a=n(function(s,o){r(o),i=void 0},"i"),r=n(function(s){if(i){var o=s.viewer_time-i;we(e.data,"view_rebuffer_duration",o),i=s.viewer_time,e.data.view_rebuffer_duration>Xc&&(e.emit("viewend"),e.send("viewend"),e.mux.log.warn("Ending view after rebuffering for longer than ".concat(Xc,"ms, future events will be ignored unless a programchange or videochange occurs.")))}e.data.view_watch_time>=0&&e.data.view_rebuffer_count>0&&(e.data.view_rebuffer_frequency=e.data.view_rebuffer_count/e.data.view_watch_time,e.data.view_rebuffer_percentage=e.data.view_rebuffer_duration/e.data.view_watch_time)},"a");e.on("playbackheartbeat",function(s,o){return r(o)}),e.on("rebufferstart",function(s,o){i||(we(e.data,"view_rebuffer_count",1),i=o.viewer_time,e.one("rebufferend",a))}),e.on("viewinit",function(){i=void 0,e.off("rebufferend",a)})}},"r"),VE=KE,qE=(function(){function t(e){var i=this;ve(this,t),I(this,"_lastCheckedTime",void 0),I(this,"_lastPlayheadTime",void 0),I(this,"_lastPlayheadTimeUpdatedTime",void 0),I(this,"_rebuffering",void 0),I(this,"pm",void 0),this.pm=e,!(e.disableRebufferTracking||e.disablePlayheadRebufferTracking)&&(this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null,e.on("playbackheartbeat",this._checkIfRebuffering.bind(this)),e.on("playbackheartbeatend",this._cleanupRebufferTracker.bind(this)),e.on("seeking",function(){i._cleanupRebufferTracker(null,{viewer_time:De.now()})}))}return n(t,"r"),ht(t,[{key:"_checkIfRebuffering",value:n(function(e,i){if(this.pm.seekingTracker.isSeeking||this.pm.adTracker.isAdBreak||!this.pm.playbackHeartbeat._playheadShouldBeProgressing){this._cleanupRebufferTracker(e,i);return}if(this._lastCheckedTime===null){this._prepareRebufferTrackerState(i.viewer_time);return}if(this._lastPlayheadTime!==this.pm.data.player_playhead_time){this._cleanupRebufferTracker(e,i,!0);return}var a=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.sustainedRebufferThreshold=="number"&&a>=this.pm.sustainedRebufferThreshold&&(this._rebuffering||(this._rebuffering=!0,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}))),this._lastCheckedTime=i.viewer_time},"value")},{key:"_clearRebufferTrackerState",value:n(function(){this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null},"value")},{key:"_prepareRebufferTrackerState",value:n(function(e){this._lastCheckedTime=e,this._lastPlayheadTime=this.pm.data.player_playhead_time,this._lastPlayheadTimeUpdatedTime=e},"value")},{key:"_cleanupRebufferTracker",value:n(function(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(this._rebuffering)this._rebuffering=!1,this.pm.emit("rebufferend",{viewer_time:i.viewer_time});else{if(this._lastCheckedTime===null)return;var r=this.pm.data.player_playhead_time-this._lastPlayheadTime,s=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.minimumRebufferDuration=="number"&&r>0&&s-r>this.pm.minimumRebufferDuration&&(this._lastCheckedTime=null,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}),this.pm.emit("rebufferend",{viewer_time:this._lastPlayheadTimeUpdatedTime+s-r}))}a?this._prepareRebufferTrackerState(i.viewer_time):this._clearRebufferTrackerState()},"value")}]),t})(),YE=qE,GE=(function(){function t(e){var i=this;ve(this,t),I(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){var a=e.data,r=a.view_id;if(!a.view_program_changed){var s=n(function(o,l){var d=l.viewer_time;(o.type==="playing"&&typeof e.data.view_time_to_first_frame>"u"||o.type==="adplaying"&&(typeof e.data.view_time_to_first_frame>"u"||i._inPrerollPosition()))&&i.calculateTimeToFirstFrame(d||De.now(),r)},"n");e.one("playing",s),e.one("adplaying",s),e.one("viewend",function(){e.off("playing",s),e.off("adplaying",s)})}})}return n(t,"r"),ht(t,[{key:"_inPrerollPosition",value:n(function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3},"value")},{key:"calculateTimeToFirstFrame",value:n(function(e,i){i===this.pm.data.view_id&&(this.pm.watchTimeTracker._updateWatchTime(null,{viewer_time:e}),this.pm.data.view_time_to_first_frame=this.pm.data.view_watch_time,(this.pm.data.player_autoplay_on||this.pm.data.video_is_autoplay)&&this.pm.pageLoadInitTime&&(this.pm.data.view_aggregate_startup_time=this.pm.data.view_start+this.pm.data.view_watch_time-this.pm.pageLoadInitTime))},"value")}]),t})(),zE=GE,QE=n(function t(e){var i=this;ve(this,t),I(this,"_lastPlayerHeight",void 0),I(this,"_lastPlayerWidth",void 0),I(this,"_lastPlayheadPosition",void 0),I(this,"_lastSourceHeight",void 0),I(this,"_lastSourceWidth",void 0),e.on("viewinit",function(){i._lastPlayheadPosition=-1});var a=["pause","rebufferstart","seeking","error","adbreakstart","hb","renditionchange","orientationchange","viewend","playbackmodechange"],r=["playing","hb","renditionchange","orientationchange","playbackmodechange"];a.forEach(function(s){e.on(s,function(){if(i._lastPlayheadPosition>=0&&e.data.player_playhead_time>=0&&i._lastPlayerWidth>=0&&i._lastSourceWidth>0&&i._lastPlayerHeight>=0&&i._lastSourceHeight>0){var o=e.data.player_playhead_time-i._lastPlayheadPosition;if(o<0){i._lastPlayheadPosition=-1;return}var l=Math.min(i._lastPlayerWidth/i._lastSourceWidth,i._lastPlayerHeight/i._lastSourceHeight),d=Math.max(0,l-1),c=Math.max(0,1-l);e.data.view_max_upscale_percentage=Math.max(e.data.view_max_upscale_percentage||0,d),e.data.view_max_downscale_percentage=Math.max(e.data.view_max_downscale_percentage||0,c),we(e.data,"view_total_content_playback_time",o),we(e.data,"view_total_upscaling",d*o),we(e.data,"view_total_downscaling",c*o)}i._lastPlayheadPosition=-1})}),r.forEach(function(s){e.on(s,function(){i._lastPlayheadPosition=e.data.player_playhead_time,i._lastPlayerWidth=e.data.player_width,i._lastPlayerHeight=e.data.player_height,i._lastSourceWidth=e.data.video_source_width,i._lastSourceHeight=e.data.video_source_height})})},"r"),jE=QE,ZE=2e3,XE=n(function t(e){var i=this;ve(this,t),I(this,"isSeeking",void 0),this.isSeeking=!1;var a=-1,r=n(function(){var s=De.now(),o=(e.data.viewer_time||s)-(a||s);we(e.data,"view_seek_duration",o),e.data.view_max_seek_time=Math.max(e.data.view_max_seek_time||0,o),i.isSeeking=!1,a=-1},"a");e.on("seeking",function(s,o){if(Object.assign(e.data,o),i.isSeeking&&o.viewer_time-a<=ZE){a=o.viewer_time;return}i.isSeeking&&r(),i.isSeeking=!0,a=o.viewer_time,we(e.data,"view_seek_count",1),e.send("seeking")}),e.on("seeked",function(){r()}),e.on("viewend",function(){i.isSeeking&&(r(),e.send("seeked")),i.isSeeking=!1,a=-1})},"r"),JE=XE,Jc=n(function(t,e){t.push(e),t.sort(function(i,a){return i.viewer_time-a.viewer_time})},"$t$2"),e_=["adbreakstart","adrequest","adresponse","adplay","adplaying","adpause","adended","adbreakend","aderror","adclicked","adskipped"],t_=(function(){function t(e){var i=this;ve(this,t),I(this,"_adHasPlayed",void 0),I(this,"_adRequests",void 0),I(this,"_adResponses",void 0),I(this,"_currentAdRequestNumber",void 0),I(this,"_currentAdResponseNumber",void 0),I(this,"_prerollPlayTime",void 0),I(this,"_wouldBeNewAdPlay",void 0),I(this,"isAdBreak",void 0),I(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){i.isAdBreak=!1,i._currentAdRequestNumber=0,i._currentAdResponseNumber=0,i._adRequests=[],i._adResponses=[],i._adHasPlayed=!1,i._wouldBeNewAdPlay=!0,i._prerollPlayTime=void 0}),e_.forEach(function(r){return e.on(r,i._updateAdData.bind(i))});var a=n(function(){i.isAdBreak=!1},"i");e.on("adbreakstart",function(){i.isAdBreak=!0}),e.on("play",a),e.on("playing",a),e.on("viewend",a),e.on("adrequest",function(r,s){s=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdRequestNumber++},s),Jc(i._adRequests,s),we(e.data,"view_ad_request_count"),i.inPrerollPosition()&&(e.data.view_preroll_requested=!0,i._adHasPlayed||we(e.data,"view_preroll_request_count"))}),e.on("adresponse",function(r,s){s=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdResponseNumber++},s),Jc(i._adResponses,s);var o=i.findAdRequest(s.ad_request_id);o&&we(e.data,"view_ad_request_time",Math.max(0,s.viewer_time-o.viewer_time))}),e.on("adplay",function(r,s){i._adHasPlayed=!0,i._wouldBeNewAdPlay&&(i._wouldBeNewAdPlay=!1,we(e.data,"view_ad_played_count")),i.inPrerollPosition()&&!e.data.view_preroll_played&&(e.data.view_preroll_played=!0,i._adRequests.length>0&&(e.data.view_preroll_request_time=Math.max(0,s.viewer_time-i._adRequests[0].viewer_time)),e.data.view_start&&(e.data.view_startup_preroll_request_time=Math.max(0,s.viewer_time-e.data.view_start)),i._prerollPlayTime=s.viewer_time)}),e.on("adplaying",function(r,s){i.inPrerollPosition()&&typeof e.data.view_preroll_load_time>"u"&&typeof i._prerollPlayTime<"u"&&(e.data.view_preroll_load_time=s.viewer_time-i._prerollPlayTime,e.data.view_startup_preroll_load_time=s.viewer_time-i._prerollPlayTime)}),e.on("adclicked",function(r,s){i._wouldBeNewAdPlay||we(e.data,"view_ad_clicked_count")}),e.on("adskipped",function(r,s){i._wouldBeNewAdPlay||we(e.data,"view_ad_skipped_count")}),e.on("adended",function(){i._wouldBeNewAdPlay=!0}),e.on("aderror",function(){i._wouldBeNewAdPlay=!0})}return n(t,"r"),ht(t,[{key:"inPrerollPosition",value:n(function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3},"value")},{key:"findAdRequest",value:n(function(e){for(var i=0;i<this._adRequests.length;i++)if(this._adRequests[i].ad_request_id===e)return this._adRequests[i]},"value")},{key:"_updateAdData",value:n(function(e,i){if(this.inPrerollPosition()){if(!this.pm.data.view_preroll_ad_tag_hostname&&i.ad_tag_url){var a=Ei(An(i.ad_tag_url),2),r=a[0],s=a[1];this.pm.data.view_preroll_ad_tag_domain=s,this.pm.data.view_preroll_ad_tag_hostname=r}if(!this.pm.data.view_preroll_ad_asset_hostname&&i.ad_asset_url){var o=Ei(An(i.ad_asset_url),2),l=o[0],d=o[1];this.pm.data.view_preroll_ad_asset_domain=d,this.pm.data.view_preroll_ad_asset_hostname=l}this.pm.data.ad_type="preroll"}this.pm.data.ad_asset_url=i?.ad_asset_url,this.pm.data.ad_tag_url=i?.ad_tag_url,this.pm.data.ad_creative_id=i?.ad_creative_id,this.pm.data.ad_id=i?.ad_id,this.pm.data.ad_universal_id=i?.ad_universal_id,i!=null&&i.ad_type&&(this.pm.data.ad_type=i?.ad_type)},"value")}]),t})(),i_=t_,a_=n(function t(e){var i=this;ve(this,t),I(this,"lastWallClockTime",void 0);var a=n(function(){i.lastWallClockTime=De.now(),e.on("before*",r)},"i"),r=n(function(s){var o=De.now(),l=i.lastWallClockTime;i.lastWallClockTime=o,o-l>3e4&&(e.emit("devicesleep",{viewer_time:l}),Object.assign(e.data,{viewer_time:l}),e.send("devicesleep"),e.emit("devicewake",{viewer_time:o}),Object.assign(e.data,{viewer_time:o}),e.send("devicewake"))},"a");e.one("playbackheartbeat",a),e.on("playbackheartbeatend",function(){e.off("before*",r),e.one("playbackheartbeat",a)})},"r"),r_=a_,yl=ct(ei()),qm=(function(t){return t()})(function(){var t=n(function(){for(var i=0,a={};i<arguments.length;i++){var r=arguments[i];for(var s in r)a[s]=r[s]}return a},"r");function e(i){function a(r,s,o){var l;if(typeof document<"u"){if(arguments.length>1){if(o=t({path:"/"},a.defaults,o),typeof o.expires=="number"){var d=new Date;d.setMilliseconds(d.getMilliseconds()+o.expires*864e5),o.expires=d}try{l=JSON.stringify(s),/^[\{\[]/.test(l)&&(s=l)}catch{}return i.write?s=i.write(s,r):s=encodeURIComponent(String(s)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),r=r.replace(/[\(\)]/g,escape),document.cookie=[r,"=",s,o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("")}r||(l={});for(var c=document.cookie?document.cookie.split("; "):[],p=/(%[0-9A-Z]{2})+/g,v=0;v<c.length;v++){var m=c[v].split("="),u=m.slice(1).join("=");u.charAt(0)==='"'&&(u=u.slice(1,-1));try{var f=m[0].replace(p,decodeURIComponent);if(u=i.read?i.read(u,f):i(u,f)||u.replace(p,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch{}if(r===f){l=u;break}r||(l[f]=u)}catch{}}return l}}return n(a,"i"),a.set=a,a.get=function(r){return a.call(a,r)},a.getJSON=function(){return a.apply({json:!0},[].slice.call(arguments))},a.defaults={},a.remove=function(r,s){a(r,"",t(s,{expires:-1}))},a.withConverter=e,a}return n(e,"e"),e(function(){})}),Ym="muxData",n_=n(function(t){return Object.entries(t).map(function(e){var i=Ei(e,2),a=i[0],r=i[1];return"".concat(a,"=").concat(r)}).join("&")},"Oa"),s_=n(function(t){return t.split("&").reduce(function(e,i){var a=Ei(i.split("="),2),r=a[0],s=a[1],o=+s,l=s&&o==s?o:s;return e[r]=l,e},{})},"Pa$1"),Gm=n(function(){var t;try{t=s_(qm.get(Ym)||"")}catch{t={}}return t},"rr$1"),zm=n(function(t){try{qm.set(Ym,n_(t),{expires:365})}catch{}},"ar$1"),o_=n(function(){var t=Gm();return t.mux_viewer_id=t.mux_viewer_id||Tn(),t.msn=t.msn||Math.random(),zm(t),{mux_viewer_id:t.mux_viewer_id,mux_sample_number:t.msn}},"ir$1"),l_=n(function(){var t=Gm(),e=De.now();return t.session_start&&(t.sst=t.session_start,delete t.session_start),t.session_id&&(t.sid=t.session_id,delete t.session_id),t.session_expires&&(t.sex=t.session_expires,delete t.session_expires),(!t.sex||t.sex<e)&&(t.sid=Tn(),t.sst=e),t.sex=e+1500*1e3,zm(t),{session_id:t.sid,session_start:t.sst,session_expires:t.sex}},"nr$1");function d_(t,e){var i=e.beaconCollectionDomain,a=e.beaconDomain;if(i){var r=/localhost(?::\d+)?$/.test(i)?"http://":"https://";return r+i}t=t||"inferred";var s=a||"litix.io";return t.match(/^[a-z0-9]+$/)?"https://"+t+"."+s:"https://img.litix.io/a.gif"}n(d_,"Xe$1");var u_={a:"env",b:"beacon",c:"custom",d:"ad",e:"event",f:"experiment",i:"internal",m:"mux",n:"response",p:"player",q:"request",r:"retry",s:"session",t:"timestamp",u:"viewer",v:"video",w:"page",x:"view",y:"sub"},c_=Qm(u_),h_={ad:"ad",af:"affiliate",ag:"aggregate",ap:"api",al:"application",ao:"audio",ar:"architecture",as:"asset",au:"autoplay",av:"average",bi:"bitrate",bn:"brand",br:"break",bw:"browser",by:"bytes",bz:"business",ca:"cached",cb:"cancel",cc:"codec",cd:"code",cg:"category",ch:"changed",ci:"client",ck:"clicked",cl:"canceled",cm:"cmcd",cn:"config",co:"count",ce:"counter",cp:"complete",cq:"creator",cr:"creative",cs:"captions",ct:"content",cu:"current",cv:"cumulative",cx:"connection",cz:"context",da:"data",dg:"downscaling",dm:"domain",dn:"cdn",do:"downscale",dr:"drm",dp:"dropped",du:"duration",dv:"device",dy:"dynamic",eb:"enabled",ec:"encoding",ed:"edge",en:"end",eg:"engine",em:"embed",er:"error",ep:"experiments",es:"errorcode",et:"errortext",ee:"event",ev:"events",ex:"expires",ez:"exception",fa:"failed",fi:"first",fm:"family",ft:"format",fp:"fps",fq:"frequency",fr:"frame",fs:"fullscreen",ha:"has",hb:"holdback",he:"headers",ho:"host",hn:"hostname",ht:"height",id:"id",ii:"init",in:"instance",ip:"ip",is:"is",ke:"key",la:"language",lb:"labeled",le:"level",li:"live",ld:"loaded",lo:"load",lw:"low",ls:"lists",lt:"latency",ma:"max",md:"media",me:"message",mf:"manifest",mi:"mime",ml:"midroll",mm:"min",mn:"manufacturer",mo:"model",mp:"mode",ms:"ms",mx:"mux",ne:"newest",nm:"name",no:"number",on:"on",or:"origin",os:"os",pa:"paused",pb:"playback",pd:"producer",pe:"percentage",pf:"played",pg:"program",ph:"playhead",pi:"plugin",pl:"preroll",pn:"playing",po:"poster",pp:"pip",pr:"preload",ps:"position",pt:"part",pv:"previous",py:"property",px:"pop",pz:"plan",ra:"rate",rd:"requested",re:"rebuffer",rf:"rendition",rg:"range",rm:"remote",ro:"ratio",rp:"response",rq:"request",rs:"requests",sa:"sample",sd:"skipped",se:"session",sh:"shift",sk:"seek",sm:"stream",so:"source",sq:"sequence",sr:"series",ss:"status",st:"start",su:"startup",sv:"server",sw:"software",sy:"severity",ta:"tag",tc:"tech",te:"text",tg:"target",th:"throughput",ti:"time",tl:"total",to:"to",tt:"title",ty:"type",ug:"upscaling",un:"universal",up:"upscale",ur:"url",us:"user",va:"variant",vd:"viewed",vi:"video",ve:"version",vw:"view",vr:"viewer",wd:"width",wa:"watch",wt:"waiting"},eh=Qm(h_);function Qm(t){var e={};for(var i in t)t.hasOwnProperty(i)&&(e[t[i]]=i);return e}n(Qm,"sr$1");function Vl(t){var e={},i={};return Object.keys(t).forEach(function(a){var r=!1;if(t.hasOwnProperty(a)&&t[a]!==void 0){var s=a.split("_"),o=s[0],l=c_[o];l||(ie.info("Data key word `"+s[0]+"` not expected in "+a),l=o+"_"),s.splice(1).forEach(function(d){d==="url"&&(r=!0),eh[d]?l+=eh[d]:Number.isInteger(Number(d))?l+=d:(ie.info("Data key word `"+d+"` not expected in "+a),l+="_"+d+"_")}),r?i[l]=t[a]:e[l]=t[a]}}),Object.assign(e,i)}n(Vl,"he$2");var sa=ct(ei()),m_=ct(Bm()),p_={maxBeaconSize:300,maxQueueLength:3600,baseTimeBetweenBeacons:1e4,maxPayloadKBSize:500},v_=56*1024,f_=["hb","requestcompleted","requestfailed","requestcanceled"],E_="https://img.litix.io",_i=n(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this._beaconUrl=t||E_,this._eventQueue=[],this._postInFlight=!1,this._resendAfterPost=!1,this._failureCount=0,this._sendTimeout=!1,this._options=Object.assign({},p_,e)},"ee$3");_i.prototype.queueEvent=function(t,e){var i=Object.assign({},e);return this._eventQueue.length<=this._options.maxQueueLength||t==="eventrateexceeded"?(this._eventQueue.push(i),this._sendTimeout||this._startBeaconSending(),this._eventQueue.length<=this._options.maxQueueLength):!1};_i.prototype.flushEvents=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;if(t&&this._eventQueue.length===1){this._eventQueue.pop();return}this._eventQueue.length&&this._sendBeaconQueue(),this._startBeaconSending()};_i.prototype.destroy=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;this.destroyed=!0,t?this._clearBeaconQueue():this.flushEvents(),sa.default.clearTimeout(this._sendTimeout)};_i.prototype._clearBeaconQueue=function(){var t=this._eventQueue.length>this._options.maxBeaconSize?this._eventQueue.length-this._options.maxBeaconSize:0,e=this._eventQueue.slice(t);t>0&&Object.assign(e[e.length-1],Vl({mux_view_message:"event queue truncated"}));var i=this._createPayload(e);jm(this._beaconUrl,i,!0,function(){})};_i.prototype._sendBeaconQueue=function(){var t=this;if(this._postInFlight){this._resendAfterPost=!0;return}var e=this._eventQueue.slice(0,this._options.maxBeaconSize);this._eventQueue=this._eventQueue.slice(this._options.maxBeaconSize),this._postInFlight=!0;var i=this._createPayload(e),a=De.now();jm(this._beaconUrl,i,!1,function(r,s){s?(t._eventQueue=e.concat(t._eventQueue),t._failureCount+=1,ie.info("Error sending beacon: "+s)):t._failureCount=0,t._roundTripTime=De.now()-a,t._postInFlight=!1,t._resendAfterPost&&(t._resendAfterPost=!1,t._eventQueue.length>0&&t._sendBeaconQueue())})};_i.prototype._getNextBeaconTime=function(){if(!this._failureCount)return this._options.baseTimeBetweenBeacons;var t=Math.pow(2,this._failureCount-1);return t=t*Math.random(),(1+t)*this._options.baseTimeBetweenBeacons};_i.prototype._startBeaconSending=function(){var t=this;sa.default.clearTimeout(this._sendTimeout),!this.destroyed&&(this._sendTimeout=sa.default.setTimeout(function(){t._eventQueue.length&&t._sendBeaconQueue(),t._startBeaconSending()},this._getNextBeaconTime()))};_i.prototype._createPayload=function(t){var e=this,i={transmission_timestamp:Math.round(De.now())};this._roundTripTime&&(i.rtt_ms=Math.round(this._roundTripTime));var a,r,s,o=n(function(){a=JSON.stringify({metadata:i,events:r||t}),s=a.length/1024},"o"),l=n(function(){return s<=e._options.maxPayloadKBSize},"s");return o(),l()||(ie.info("Payload size is too big ("+s+" kb). Removing unnecessary events."),r=t.filter(function(d){return f_.indexOf(d.e)===-1}),o()),l()||(ie.info("Payload size still too big ("+s+" kb). Cropping fields.."),r.forEach(function(d){for(var c in d){var p=d[c],v=50*1024;typeof p=="string"&&p.length>v&&(d[c]=p.substring(0,v))}}),o()),a};var __=typeof m_.default.exitPictureInPicture=="function"?function(t){return t.length<=v_}:function(t){return!1},jm=n(function(t,e,i,a){if(i&&navigator&&navigator.sendBeacon&&navigator.sendBeacon(t,e)){a();return}if(sa.default.fetch){sa.default.fetch(t,{method:"POST",body:e,headers:{"Content-Type":"text/plain"},keepalive:__(e)}).then(function(s){return a(null,s.ok?null:"Error")}).catch(function(s){return a(null,s)});return}if(sa.default.XMLHttpRequest){var r=new sa.default.XMLHttpRequest;r.onreadystatechange=function(){if(r.readyState===4)return a(null,r.status!==200?"error":void 0)},r.open("POST",t),r.setRequestHeader("Content-Type","text/plain"),r.send(e);return}a()},"Ir"),b_=_i,g_=["env_key","view_id","view_sequence_number","player_sequence_number","beacon_domain","player_playhead_time","viewer_time","mux_api_version","event","video_id","player_instance_id","player_error_code","player_error_message","player_error_context","player_error_severity","player_error_business_exception","view_playing_time_ms_cumulative","ad_playing_time_ms_cumulative"],y_=["adplay","adplaying","adpause","adfirstquartile","admidpoint","adthirdquartile","adended","adresponse","adrequest"],T_=["ad_id","ad_creative_id","ad_universal_id"],A_=["viewstart","error","ended","viewend"],k_=600*1e3,S_=(function(){function t(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};ve(this,t);var r,s,o,l,d,c,p,v,m,u,f,_;I(this,"mux",void 0),I(this,"envKey",void 0),I(this,"options",void 0),I(this,"eventQueue",void 0),I(this,"sampleRate",void 0),I(this,"disableCookies",void 0),I(this,"respectDoNotTrack",void 0),I(this,"previousBeaconData",void 0),I(this,"lastEventTime",void 0),I(this,"rateLimited",void 0),I(this,"pageLevelData",void 0),I(this,"viewerData",void 0),this.mux=e,this.envKey=i,this.options=a,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.eventQueue=new b_(d_(this.envKey,this.options));var g;this.sampleRate=(g=this.options.sampleRate)!==null&&g!==void 0?g:1;var T;this.disableCookies=(T=this.options.disableCookies)!==null&&T!==void 0?T:!1;var A;this.respectDoNotTrack=(A=this.options.respectDoNotTrack)!==null&&A!==void 0?A:!1,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.pageLevelData={mux_api_version:this.mux.API_VERSION,mux_embed:this.mux.NAME,mux_embed_version:this.mux.VERSION,viewer_application_name:(r=this.options.platform)===null||r===void 0?void 0:r.name,viewer_application_version:(s=this.options.platform)===null||s===void 0?void 0:s.version,viewer_application_engine:(o=this.options.platform)===null||o===void 0?void 0:o.layout,viewer_device_name:(l=this.options.platform)===null||l===void 0?void 0:l.product,viewer_device_category:"",viewer_device_manufacturer:(d=this.options.platform)===null||d===void 0?void 0:d.manufacturer,viewer_os_family:(p=this.options.platform)===null||p===void 0||(c=p.os)===null||c===void 0?void 0:c.family,viewer_os_architecture:(m=this.options.platform)===null||m===void 0||(v=m.os)===null||v===void 0?void 0:v.architecture,viewer_os_version:(f=this.options.platform)===null||f===void 0||(u=f.os)===null||u===void 0?void 0:u.version,page_url:yl.default===null||yl.default===void 0||(_=yl.default.location)===null||_===void 0?void 0:_.href},this.viewerData=this.disableCookies?{}:o_()}return n(t,"r"),ht(t,[{key:"send",value:n(function(e,i){if(!(!e||!(i!=null&&i.view_id))){if(this.respectDoNotTrack&&Fl())return ie.info("Not sending `"+e+"` because Do Not Track is enabled");if(!i||typeof i!="object")return ie.error("A data object was expected in send() but was not provided");var a=this.disableCookies?{}:l_(),r=ou(kn({},this.pageLevelData,i,a,this.viewerData),{event:e,env_key:this.envKey});r.user_id&&(r.viewer_user_id=r.user_id,delete r.user_id);var s,o=((s=r.mux_sample_number)!==null&&s!==void 0?s:0)>=this.sampleRate,l=this._deduplicateBeaconData(e,r),d=Vl(l);if(this.lastEventTime=this.mux.utils.now(),o)return ie.info("Not sending event due to sample rate restriction",e,r,d);if(this.envKey||ie.info("Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL",e,r,d),!this.rateLimited)if(ie.info("Sending event",e,r,d),this.rateLimited=!this.eventQueue.queueEvent(e,d),this.mux.WINDOW_UNLOADING&&e==="viewend")this.eventQueue.destroy(!0);else{if(this.mux.WINDOW_HIDDEN&&e==="hb")this.eventQueue.flushEvents(!0);else if(A_.indexOf(e)>=0){if(e==="error"&&i.player_error_severity==="warning")return;this.eventQueue.flushEvents()}if(this.rateLimited)return r.event="eventrateexceeded",d=Vl(r),this.eventQueue.queueEvent(r.event,d),ie.error("Beaconing disabled due to rate limit.")}}},"value")},{key:"destroy",value:n(function(){this.eventQueue.destroy(!1)},"value")},{key:"_deduplicateBeaconData",value:n(function(e,i){var a=this,r={},s=i.view_id;if(s==="-1"||e==="viewstart"||e==="viewend"||!this.previousBeaconData||this.mux.utils.now()-this.lastEventTime>=k_)r=kn({},i),s&&(this.previousBeaconData=r),s&&e==="viewend"&&(this.previousBeaconData=null);else{var o=e.indexOf("request")===0;Object.entries(i).forEach(function(l){var d=Ei(l,2),c=d[0],p=d[1];a.previousBeaconData&&(p!==a.previousBeaconData[c]||g_.indexOf(c)>-1||a.objectHasChanged(o,c,p,a.previousBeaconData[c])||a.eventRequiresKey(e,c))&&(r[c]=p,a.previousBeaconData[c]=p)})}return r},"value")},{key:"objectHasChanged",value:n(function(e,i,a,r){return!e||i.indexOf("request_")!==0?!1:i==="request_response_headers"||typeof a!="object"||typeof r!="object"?!0:Object.keys(a||{}).length!==Object.keys(r||{}).length},"value")},{key:"eventRequiresKey",value:n(function(e,i){return!!(e==="renditionchange"&&i.indexOf("video_source_")===0||T_.includes(i)&&y_.includes(e)||e==="playbackmodechange"&&i.indexOf("player_playback_mode")===0)},"value")}]),t})(),w_=n(function t(e){ve(this,t);var i=0,a=0,r=0,s=0,o=0,l=0,d=0,c=n(function(m,u){var f=u.request_start,_=u.request_response_start,g=u.request_response_end,T=u.request_bytes_loaded;s++;var A,y;if(_?(A=_-(f??0),y=(g??0)-_):y=(g??0)-(f??0),y>0&&T&&T>0){var S=T/y*8e3;o++,a+=T,r+=y,e.data.view_min_request_throughput=Math.min(e.data.view_min_request_throughput||1/0,S),e.data.view_average_request_throughput=a/r*8e3,e.data.view_request_count=s,A>0&&(i+=A,e.data.view_max_request_latency=Math.max(e.data.view_max_request_latency||0,A),e.data.view_average_request_latency=i/o)}},"p"),p=n(function(m,u){s++,l++,e.data.view_request_count=s,e.data.view_request_failed_count=l},"y"),v=n(function(m,u){s++,d++,e.data.view_request_count=s,e.data.view_request_canceled_count=d},"x");e.on("requestcompleted",c),e.on("requestfailed",p),e.on("requestcanceled",v)},"r"),I_=w_,R_=3600*1e3,L_=n(function t(e){var i=this;ve(this,t),I(this,"_lastEventTime",void 0),e.on("before*",function(a,r){var s=r.viewer_time,o=De.now(),l=i._lastEventTime;if(i._lastEventTime=o,l&&o-l>R_){var d=Object.keys(e.data).reduce(function(p,v){return v.indexOf("video_")===0?Object.assign(p,I({},v,e.data[v])):p},{});e.mux.log.info("Received event after at least an hour inactivity, creating a new view");var c=e.playbackHeartbeat._playheadShouldBeProgressing;e._resetView(Object.assign({viewer_time:s},d)),e.playbackHeartbeat._playheadShouldBeProgressing=c,e.playbackHeartbeat._playheadShouldBeProgressing&&a.type!=="play"&&a.type!=="adbreakstart"&&(e.emit("play",{viewer_time:s}),a.type!=="playing"&&e.emit("playing",{viewer_time:s}))}})},"r"),C_=L_,D_=n(function t(e){ve(this,t);var i=n(function(l){var d=M_(l),c=O_(l);if(d!=null&&!th(d,s)&&o<=c){s=d,o=c;var p={video_cdn:d};e.emit("cdnchange",p)}},"t"),a=null,r=null,s=null,o=0;e.on("viewinit",function(){a=null,r=null,s=null,o=0}),e.on("beforecdnchange",function(l,d){var c=d?.video_cdn;c&&(typeof d.video_previous_cdn>"u"||d.video_previous_cdn===null)&&(th(c,r)?d.video_previous_cdn=a??void 0:(d.video_previous_cdn=r??void 0,a=r,r=c))}),e.on("requestcompleted",function(l,d){i(d)})},"r");function th(t,e){return t?.toLowerCase()===e?.toLowerCase()}n(th,"Br");function M_(t){var e;return t!=null&&t.request_type&&(t.request_type==="media"||t.request_type==="video")&&!((e=t.request_response_headers)===null||e===void 0)&&e["x-cdn"]?t.request_response_headers["x-cdn"]:t!=null&&t.video_cdn?t.video_cdn:null}n(M_,"wi");function O_(t){return t!=null&&t.request_start?t.request_start:t!=null&&t.viewer_time?t.viewer_time:Date.now()}n(O_,"Ti");var x_=D_,N_=n(function(t){try{return JSON.parse(t),!0}catch{return!1}},"Ei"),P_=n(function t(e){var i=this;ve(this,t),I(this,"_emittingAutomaticEvent",!1),I(this,"_hasInitialized",!1),I(this,"_currentMode","standard"),e.on("viewstart",function(){i._hasInitialized||(i._hasInitialized=!0,i._currentMode=e.data.player_playback_mode||"standard",i._emittingAutomaticEvent=!0,e.emit("playbackmodechange",{player_playback_mode:i._currentMode,player_playback_mode_data:"{}"}),i._emittingAutomaticEvent=!1)}),e.on("viewend",function(){i._hasInitialized=!1}),e.on("playbackmodechange",function(a,r){i._emittingAutomaticEvent||(r.player_playback_mode_data?N_(r.player_playback_mode_data)||(e.mux.log.warn("Invalid JSON string for player_playback_mode_data"),r.player_playback_mode_data="{}"):r.player_playback_mode_data="{}",e.data.player_playback_mode_data=r.player_playback_mode_data,e.data.player_playback_mode=r.player_playback_mode,i._currentMode=r.player_playback_mode)})},"r"),$_=P_,U_=(function(){function t(e){ve(this,t),I(this,"pm",void 0),I(this,"_currentRangeStart",void 0),I(this,"_lastPlayheadTime",void 0),this.pm=e,this._currentRangeStart=null,this._lastPlayheadTime=null,e.on("playbackheartbeat",this._updatePlaybackRange.bind(this)),e.on("playbackheartbeatend",this._endPlaybackRange.bind(this))}return n(t,"r"),ht(t,[{key:"_updateLastRangeEnd",value:n(function(){var e=this.pm.data.video_playback_ranges;if(e&&e.length>0){var i=this.pm.data.player_playhead_time||0;e[e.length-1][1]=i}},"value")},{key:"_updatePlaybackRange",value:n(function(){var e,i=this.pm.data.player_playhead_time||0;if(!(!this.pm.disableAdPlaybackRangeFiltering&&!((e=this.pm.adTracker)===null||e===void 0)&&e.isAdBreak&&this._lastPlayheadTime!==null&&i<this._lastPlayheadTime)){if(this._lastPlayheadTime!==null&&this._currentRangeStart!==null){var a=Math.abs(i-this._lastPlayheadTime);if(a>1e3){var r=this.pm.data.video_playback_ranges;r&&r.length>0&&(r[r.length-1][1]=this._lastPlayheadTime),this._currentRangeStart=null}}if(this._currentRangeStart===null){var s=this.pm.data.video_playback_ranges||[];s.length>0&&s[s.length-1][1]===i?this._currentRangeStart=s[s.length-1][0]:(this._currentRangeStart=i,s.push([i,i])),this.pm.data.video_playback_ranges=s}else this._updateLastRangeEnd();this._lastPlayheadTime=i}},"value")},{key:"_endPlaybackRange",value:n(function(){this._currentRangeStart!==null&&(this._updateLastRangeEnd(),this._currentRangeStart=null,this._lastPlayheadTime=null)},"value")}]),t})(),H_=U_,Kt=Object.freeze({CELLULAR:"cellular",WIFI:"wifi",WIRED:"wired",OTHER:"other",NO_CONNECTION:"no_connection",UNKNOWN:"unknown"}),B_=n(function(t){if(!t)return Kt.UNKNOWN;switch(t){case"cellular":case"wimax":return Kt.CELLULAR;case"wifi":return Kt.WIFI;case"ethernet":return Kt.WIRED;case"none":return Kt.NO_CONNECTION;case"bluetooth":case"other":return Kt.OTHER;case"unknown":return Kt.UNKNOWN;default:return Kt.OTHER}},"jr"),W_=n(function(t){return typeof t=="object"&&"connection"in t&&typeof t.connection=="object"},"Vr"),qi=ct(ei()),F_=(function(){function t(e){var i=this;ve(this,t),I(this,"pm",void 0),I(this,"lastType",void 0),I(this,"lastLowDataMode",void 0),this.pm=e,this.pm.one("viewinit",function(){var a,r=i.emit.bind(i);r(),qi.default.addEventListener("online",r),qi.default.addEventListener("offline",r),(a=t.connection)===null||a===void 0||a.addEventListener("change",r),i.pm.on("destroy",function(){var s;(s=t.connection)===null||s===void 0||s.removeEventListener("change",r),qi.default.removeEventListener("online",r),qi.default.removeEventListener("offline",r)})})}return n(t,"r"),ht(t,[{key:"type",get:n(function(){var e,i;return((e=qi.default.navigator)===null||e===void 0?void 0:e.onLine)===!1?Kt.NO_CONNECTION:!((i=t.connection)===null||i===void 0)&&i.type?B_(t.connection.type):Kt.UNKNOWN},"get")},{key:"lowDataMode",get:n(function(){var e;return(e=t.connection)===null||e===void 0?void 0:e.saveData},"get")},{key:"emit",value:n(function(){var e=this.type,i=this.lowDataMode;e===this.lastType&&i===this.lastLowDataMode||(this.lastType=e,this.lastLowDataMode=i,this.pm.emit("networkchange",kn({viewer_connection_type:e},i!==void 0&&{viewer_connection_low_data_mode:i})))},"value")}],[{key:"connection",get:n(function(){return W_(qi.default.navigator)?qi.default.navigator.connection:null},"get")}]),t})(),K_=F_,V_=["viewstart","ended","loadstart","pause","play","playing","ratechange","waiting","adplay","adpause","adended","aderror","adplaying","adrequest","adresponse","adbreakstart","adbreakend","adfirstquartile","admidpoint","adthirdquartile","rebufferstart","rebufferend","seeked","error","hb","requestcompleted","requestfailed","requestcanceled","renditionchange","networkchange","cdnchange","playbackmodechange"],q_=new Set(["requestcompleted","requestfailed","requestcanceled"]),Y_=(function(t){mE(i,t);var e=_E(i);function i(a,r,s){ve(this,i);var o;o=e.call(this),I($(o),"pageLoadEndTime",void 0),I($(o),"pageLoadInitTime",void 0),I($(o),"_destroyed",void 0),I($(o),"_heartBeatTimeout",void 0),I($(o),"adTracker",void 0),I($(o),"dashjs",void 0),I($(o),"data",void 0),I($(o),"disablePlayheadRebufferTracking",void 0),I($(o),"disableRebufferTracking",void 0),I($(o),"disableAdPlaybackRangeFiltering",void 0),I($(o),"errorTracker",void 0),I($(o),"errorTranslator",void 0),I($(o),"emitTranslator",void 0),I($(o),"getAdData",void 0),I($(o),"getPlayheadTime",void 0),I($(o),"getStateData",void 0),I($(o),"stateDataTranslator",void 0),I($(o),"hlsjs",void 0),I($(o),"id",void 0),I($(o),"longResumeTracker",void 0),I($(o),"minimumRebufferDuration",void 0),I($(o),"mux",void 0),I($(o),"playbackEventDispatcher",void 0),I($(o),"playbackHeartbeat",void 0),I($(o),"playbackHeartbeatTime",void 0),I($(o),"playheadTime",void 0),I($(o),"seekingTracker",void 0),I($(o),"sustainedRebufferThreshold",void 0),I($(o),"watchTimeTracker",void 0),I($(o),"currentFragmentPDT",void 0),I($(o),"currentFragmentStart",void 0),o.pageLoadInitTime=_o.navigationStart(),o.pageLoadEndTime=_o.domContentLoadedEventEnd();var l={debug:!1,minimumRebufferDuration:250,sustainedRebufferThreshold:1e3,playbackHeartbeatTime:25,beaconDomain:"litix.io",sampleRate:1,disableCookies:!1,respectDoNotTrack:!1,disableRebufferTracking:!1,disablePlayheadRebufferTracking:!1,disableAdPlaybackRangeFiltering:!1,errorTranslator:n(function(m){return m},"errorTranslator"),emitTranslator:n(function(){for(var m=arguments.length,u=new Array(m),f=0;f<m;f++)u[f]=arguments[f];return u},"emitTranslator"),stateDataTranslator:n(function(m){return m},"stateDataTranslator")};o.mux=a,o.id=r,s!=null&&s.beaconDomain&&o.mux.log.warn("The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`."),s=Object.assign(l,s),s.data=s.data||{},s.data.property_key&&(s.data.env_key=s.data.property_key,delete s.data.property_key),ie.level=s.debug?ra.DEBUG:ra.WARN,o.getPlayheadTime=s.getPlayheadTime,o.getStateData=s.getStateData||function(){return{}},o.getAdData=s.getAdData||function(){},o.minimumRebufferDuration=s.minimumRebufferDuration,o.sustainedRebufferThreshold=s.sustainedRebufferThreshold,o.playbackHeartbeatTime=s.playbackHeartbeatTime,o.disableRebufferTracking=s.disableRebufferTracking,o.disableRebufferTracking&&o.mux.log.warn("Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering."),o.disablePlayheadRebufferTracking=s.disablePlayheadRebufferTracking,o.disableAdPlaybackRangeFiltering=s.disableAdPlaybackRangeFiltering,o.errorTranslator=s.errorTranslator,o.emitTranslator=s.emitTranslator,o.stateDataTranslator=s.stateDataTranslator,o.playbackEventDispatcher=new S_(a,s.data.env_key,s),o.data={player_instance_id:Tn(),mux_sample_rate:s.sampleRate,beacon_domain:s.beaconCollectionDomain||s.beaconDomain},o.data.view_sequence_number=1,o.data.player_sequence_number=1;var d=function(){typeof this.data.view_start>"u"&&(this.data.view_start=this.mux.utils.now(),this.emit("viewstart"),this.emit("renditionchange"))}.bind($(o));if(o.on("viewinit",function(m,u){this._resetVideoData(),this._resetViewData(),this._resetErrorData(),this._updateStateData(),Object.assign(this.data,u),this._initializeViewData(),this.one("play",d),this.one("adbreakstart",d)}),o.on("videochange",function(m,u){this._resetView(u)}),o.on("programchange",function(m,u){this.data.player_is_paused&&this.mux.log.warn("The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information."),this._resetView(Object.assign(u,{view_program_changed:!0})),d(),this.emit("play"),this.emit("playing")}),o.on("fragmentchange",function(m,u){this.currentFragmentPDT=u.currentFragmentPDT,this.currentFragmentStart=u.currentFragmentStart}),o.on("destroy",o.destroy),typeof window<"u"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"){var c=n(function(){var m=typeof o.data.view_start<"u";o.mux.WINDOW_HIDDEN=document.visibilityState==="hidden",m&&o.mux.WINDOW_HIDDEN&&(o.data.player_is_paused||o.emit("hb"))},"x");window.addEventListener("visibilitychange",c,!1);var p=n(function(m){m.persisted||o.destroy()},"D");window.addEventListener("pagehide",p,!1),o.on("destroy",function(){window.removeEventListener("visibilitychange",c),window.removeEventListener("pagehide",p)})}o.on("playerready",function(m,u){Object.assign(this.data,u)}),V_.forEach(function(m){o.on(m,function(u,f){m.indexOf("ad")!==0&&this._updateStateData(),Object.assign(this.data,f),this._sanitizeData()}),o.on("after"+m,function(){(m!=="error"||this.errorTracker.viewErrored)&&this.send(m)})}),o.on("viewend",function(m,u){Object.assign(o.data,u)});var v=n(function(m){var u=this.mux.utils.now();this.data.player_init_time&&(this.data.player_startup_time=u-this.data.player_init_time),this.pageLoadInitTime=this.data.page_load_init_time||this.pageLoadInitTime,this.pageLoadEndTime=this.data.page_load_end_time||this.pageLoadEndTime,!this.mux.PLAYER_TRACKED&&this.pageLoadInitTime&&(this.mux.PLAYER_TRACKED=!0,(this.data.player_init_time||this.pageLoadEndTime)&&(this.data.page_load_time=Math.min(this.data.player_init_time||1/0,this.pageLoadEndTime||1/0)-this.pageLoadInitTime)),this.send("playerready"),delete this.data.player_startup_time,delete this.data.page_load_time},"f");return o.one("playerready",v),o.longResumeTracker=new C_($(o)),o.errorTracker=new PE($(o)),new r_($(o)),o.seekingTracker=new JE($(o)),o.playheadTime=new FE($(o)),o.playbackHeartbeat=new xE($(o)),new jE($(o)),o.watchTimeTracker=new UE($(o)),new BE($(o)),new H_($(o)),o.adTracker=new i_($(o)),new YE($(o)),new VE($(o)),new zE($(o)),new I_($(o)),new x_($(o)),new $_($(o)),new K_($(o)),s.hlsjs&&o.addHLSJS(s),s.dashjs&&o.addDashJS(s),o.emit("viewinit",s.data),o}return n(i,"t"),ht(i,[{key:"emit",value:n(function(a,r){var s,o=Object.assign({viewer_time:this.mux.utils.now()},r),l=[a,o];if(this.emitTranslator)try{l=this.emitTranslator(a,o)}catch(d){this.mux.log.warn("Exception in emit translator callback.",d)}l!=null&&l.length&&(s=ns(ur(i.prototype),"emit",this)).call.apply(s,[this].concat(_t(l)))},"value")},{key:"destroy",value:n(function(){this._destroyed||(this._destroyed=!0,typeof this.data.view_start<"u"&&(this.emit("viewend"),this.send("viewend")),this.playbackEventDispatcher.destroy(),this.removeHLSJS(),this.removeDashJS(),window.clearTimeout(this._heartBeatTimeout))},"value")},{key:"send",value:n(function(a){if(this.data.view_id){var r=Object.assign({},this.data),s=["player_program_time","player_manifest_newest_program_time","player_live_edge_program_time","player_program_time","video_holdback","video_part_holdback","video_target_duration","video_part_target_duration"];if(r.video_source_is_live===void 0&&(r.player_source_duration===1/0||r.video_source_duration===1/0?r.video_source_is_live=!0:(r.player_source_duration>0||r.video_source_duration>0)&&(r.video_source_is_live=!1)),r.video_source_is_live||s.forEach(function(c){r[c]=void 0}),r.video_source_url=r.video_source_url||r.player_source_url,r.video_source_url){var o=Ei(An(r.video_source_url),2),l=o[0],d=o[1];r.video_source_domain=d,r.video_source_hostname=l}delete r.ad_request_id,r.video_playback_ranges&&(r.video_playback_range=JSON.stringify(r.video_playback_ranges.filter(function(c){return c[0]!==c[1]}).map(function(c){return"".concat(c[0],":").concat(c[1])})),delete r.video_playback_ranges),this.playbackEventDispatcher.send(a,r),this.data.view_sequence_number++,this.data.player_sequence_number++,q_.has(a)||this._restartHeartBeat(),a==="viewend"&&delete this.data.view_id}},"value")},{key:"_resetView",value:n(function(a){this.emit("viewend"),this.send("viewend"),this.emit("viewinit",a)},"value")},{key:"_updateStateData",value:n(function(){var a,r=this.getStateData();if(typeof this.stateDataTranslator=="function")try{r=this.stateDataTranslator(r)}catch(o){this.mux.log.warn("Exception in stateDataTranslator translator callback.",o)}if(!((a=this.data)===null||a===void 0)&&a.video_cdn&&r!=null&&r.video_cdn){r.video_cdn;var s=vE(r,["video_cdn"]);r=s}Object.assign(this.data,r),this.playheadTime._updatePlayheadTime(),this._sanitizeData()},"value")},{key:"_sanitizeData",value:n(function(){var a=this,r=["player_width","player_height","video_source_width","video_source_height","player_playhead_time","video_source_bitrate"];r.forEach(function(o){var l=parseInt(a.data[o],10);a.data[o]=isNaN(l)?void 0:l});var s=["player_source_url","video_source_url"];s.forEach(function(o){if(a.data[o]){var l=a.data[o].toLowerCase();(l.indexOf("data:")===0||l.indexOf("blob:")===0)&&(a.data[o]="MSE style URL")}})},"value")},{key:"_resetVideoData",value:n(function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("video_")===0&&delete a.data[r]})},"value")},{key:"_resetViewData",value:n(function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("view_")===0&&delete a.data[r]}),this.data.view_sequence_number=1},"value")},{key:"_resetErrorData",value:n(function(){delete this.data.player_error_code,delete this.data.player_error_message,delete this.data.player_error_context,delete this.data.player_error_severity,delete this.data.player_error_business_exception},"value")},{key:"_initializeViewData",value:n(function(){var a=this,r=this.data.view_id=Tn(),s=n(function(){r===a.data.view_id&&we(a.data,"player_view_count",1)},"o");this.data.player_is_paused?this.one("play",s):s()},"value")},{key:"_restartHeartBeat",value:n(function(){var a=this;window.clearTimeout(this._heartBeatTimeout),this._heartBeatTimeout=window.setTimeout(function(){a.data.player_is_paused||a.emit("hb")},1e4)},"value")},{key:"addHLSJS",value:n(function(a){if(!a.hlsjs){this.mux.log.warn("You must pass a valid hlsjs instance in order to track it.");return}if(this.hlsjs){this.mux.log.warn("An instance of HLS.js is already being monitored for this player.");return}this.hlsjs=a.hlsjs,kE(this.mux,this.id,a.hlsjs,{},a.Hls||window.Hls)},"value")},{key:"removeHLSJS",value:n(function(){this.hlsjs&&(SE(this.hlsjs),this.hlsjs=void 0)},"value")},{key:"addDashJS",value:n(function(a){if(!a.dashjs){this.mux.log.warn("You must pass a valid dashjs instance in order to track it.");return}if(this.dashjs){this.mux.log.warn("An instance of Dash.js is already being monitored for this player.");return}this.dashjs=a.dashjs,LE(this.mux,this.id,a.dashjs)},"value")},{key:"removeDashJS",value:n(function(){this.dashjs&&(CE(this.dashjs),this.dashjs=void 0)},"value")}]),i})(ME),G_=Y_,kr=ct(Bm());function Tl(){return kr.default&&!!(kr.default.fullscreenElement||kr.default.webkitFullscreenElement||kr.default.mozFullScreenElement||kr.default.msFullscreenElement)}n(Tl,"Pe$3");var z_=["loadstart","pause","play","playing","seeking","seeked","timeupdate","ratechange","stalled","waiting","error","ended"],Q_={1:"MEDIA_ERR_ABORTED",2:"MEDIA_ERR_NETWORK",3:"MEDIA_ERR_DECODE",4:"MEDIA_ERR_SRC_NOT_SUPPORTED"};function j_(t,e,i){var a=Ei(Eo(e),3),r=a[0],s=a[1],o=a[2],l=t.log,d=t.utils.getComputedStyle,c=t.utils.secondsToMs,p={automaticErrorTracking:!0};if(r){if(o!=="video"&&o!=="audio")return l.error("The element of `"+s+"` was not a media element.")}else return l.error("No element was found with the `"+s+"` query selector.");r.mux&&(r.mux.destroy(),delete r.mux,l.warn("Already monitoring this video element, replacing existing event listeners"));var v={getPlayheadTime:n(function(){return c(r.currentTime)},"getPlayheadTime"),getStateData:n(function(){var u,f,_,g=((u=(f=this).getPlayheadTime)===null||u===void 0?void 0:u.call(f))||c(r.currentTime),T=this.hlsjs&&this.hlsjs.url,A=this.dashjs&&typeof this.dashjs.getSource=="function"&&this.dashjs.getSource(),y={player_is_paused:r.paused,player_width:parseInt(d(r,"width")),player_height:parseInt(d(r,"height")),player_autoplay_on:r.autoplay,player_preload_on:r.preload,player_language_code:r.lang,player_is_fullscreen:Tl(),video_poster_url:r.poster,video_source_url:T||A||r.currentSrc,video_source_duration:c(r.duration),video_source_height:r.videoHeight,video_source_width:r.videoWidth,view_dropped_frame_count:r==null||(_=r.getVideoPlaybackQuality)===null||_===void 0?void 0:_.call(r).droppedVideoFrames};if(r.getStartDate&&g>0){var S=r.getStartDate();if(S&&typeof S.getTime=="function"&&S.getTime()){var M=S.getTime();if(y.player_program_time=M+g,r.seekable.length>0){var D=M+r.seekable.end(r.seekable.length-1);y.player_live_edge_program_time=D}}}return y},"getStateData")};i=Object.assign(p,i,v),i.data=Object.assign({player_software:"HTML5 Video Element",player_mux_plugin_name:"VideoElementMonitor",player_mux_plugin_version:t.VERSION},i.data),r.mux=r.mux||{},r.mux.deleted=!1,r.mux.emit=function(u,f){t.emit(s,u,f)},r.mux.updateData=function(u){r.mux.emit("hb",u)};var m=n(function(){l.error("The monitor for this video element has already been destroyed.")},"D");r.mux.destroy=function(){Object.keys(r.mux.listeners).forEach(function(u){r.removeEventListener(u,r.mux.listeners[u],!1)}),delete r.mux.listeners,r.mux.fullscreenChangeListener&&(document.removeEventListener("fullscreenchange",r.mux.fullscreenChangeListener,!1),delete r.mux.fullscreenChangeListener),r.mux.destroy=m,r.mux.swapElement=m,r.mux.emit=m,r.mux.addHLSJS=m,r.mux.addDashJS=m,r.mux.removeHLSJS=m,r.mux.removeDashJS=m,r.mux.updateData=m,r.mux.setEmitTranslator=m,r.mux.setStateDataTranslator=m,r.mux.setGetPlayheadTime=m,r.mux.deleted=!0,t.emit(s,"destroy")},r.mux.swapElement=function(u){var f=Ei(Eo(u),3),_=f[0],g=f[1],T=f[2];if(_){if(T!=="video"&&T!=="audio")return t.log.error("The element of `"+g+"` was not a media element.")}else return t.log.error("No element was found with the `"+g+"` query selector.");_.muxId=r.muxId,delete r.muxId,_.mux=_.mux||{},_.mux.listeners=Object.assign({},r.mux.listeners),delete r.mux.listeners,Object.keys(_.mux.listeners).forEach(function(A){r.removeEventListener(A,_.mux.listeners[A],!1),_.addEventListener(A,_.mux.listeners[A],!1)}),_.mux.fullscreenChangeListener=r.mux.fullscreenChangeListener,delete r.mux.fullscreenChangeListener,_.mux.swapElement=r.mux.swapElement,_.mux.destroy=r.mux.destroy,delete r.mux,r=_},r.mux.addHLSJS=function(u){t.addHLSJS(s,u)},r.mux.addDashJS=function(u){t.addDashJS(s,u)},r.mux.removeHLSJS=function(){t.removeHLSJS(s)},r.mux.removeDashJS=function(){t.removeDashJS(s)},r.mux.setEmitTranslator=function(u){t.setEmitTranslator(s,u)},r.mux.setStateDataTranslator=function(u){t.setStateDataTranslator(s,u)},r.mux.setGetPlayheadTime=function(u){u||(u=i.getPlayheadTime),t.setGetPlayheadTime(s,u)},t.init(s,i),t.emit(s,"playerready"),r.paused||(t.emit(s,"play"),r.readyState>2&&t.emit(s,"playing")),r.mux.listeners={},z_.forEach(function(u){u==="error"&&!i.automaticErrorTracking||(r.mux.listeners[u]=function(){var f={};if(u==="error"){if(!r.error||r.error.code===1)return;f.player_error_code=r.error.code,f.player_error_message=Q_[r.error.code]||r.error.message}t.emit(s,u,f)},r.addEventListener(u,r.mux.listeners[u],!1))}),r.mux.listeners.enterpictureinpicture=function(){t.emit(s,"playbackmodechange",{player_playback_mode:"pip",player_playback_mode_data:"{}"})},r.mux.listeners.leavepictureinpicture=function(){var u=Tl()?"fullscreen":"standard";t.emit(s,"playbackmodechange",{player_playback_mode:u,player_playback_mode_data:"{}"})},r.addEventListener("enterpictureinpicture",r.mux.listeners.enterpictureinpicture,!1),r.addEventListener("leavepictureinpicture",r.mux.listeners.leavepictureinpicture,!1),r.mux.fullscreenChangeListener=function(){var u=Tl(),f=document.fullscreenElement;if(u&&(f===r||f!=null&&f.contains(r)))t.emit(s,"playbackmodechange",{player_playback_mode:"fullscreen",player_playback_mode_data:"{}"});else if(!u){var _=document.pictureInPictureElement===r,g=_?"pip":"standard";t.emit(s,"playbackmodechange",{player_playback_mode:g,player_playback_mode_data:"{}"})}},document.addEventListener("fullscreenchange",r.mux.fullscreenChangeListener,!1)}n(j_,"ut$2");function Z_(t,e,i,a){var r=a;if(t&&typeof t[e]=="function")try{r=t[e].apply(t,i)}catch(s){ie.info("safeCall error",s)}return r}n(Z_,"lt$1");var ln=ct(ei()),wa;ln.default&&ln.default.WeakMap&&(wa=new WeakMap);function X_(t,e){if(!t||!e||!ln.default||typeof ln.default.getComputedStyle!="function")return"";var i;return wa&&wa.has(t)&&(i=wa.get(t)),i||(i=ln.default.getComputedStyle(t,null),wa&&wa.set(t,i)),i.getPropertyValue(e)}n(X_,"dt$1");function J_(t){return Math.floor(t*1e3)}n(J_,"ct$2");var Yi={TARGET_DURATION:"#EXT-X-TARGETDURATION",PART_INF:"#EXT-X-PART-INF",SERVER_CONTROL:"#EXT-X-SERVER-CONTROL",INF:"#EXTINF",PROGRAM_DATE_TIME:"#EXT-X-PROGRAM-DATE-TIME",VERSION:"#EXT-X-VERSION",SESSION_DATA:"#EXT-X-SESSION-DATA"},jo=n(function(t){return this.buffer="",this.manifest={segments:[],serverControl:{},sessionData:{}},this.currentUri={},this.process(t),this.manifest},"Ve$2");jo.prototype.process=function(t){var e;for(this.buffer+=t,e=this.buffer.indexOf(`
`);e>-1;e=this.buffer.indexOf(`
`))this.processLine(this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)};jo.prototype.processLine=function(t){var e=t.indexOf(":"),i=ab(t,e),a=i[0],r=i.length===2?du(i[1]):void 0;if(a[0]!=="#")this.currentUri.uri=a,this.manifest.segments.push(this.currentUri),this.manifest.targetDuration&&!("duration"in this.currentUri)&&(this.currentUri.duration=this.manifest.targetDuration),this.currentUri={};else switch(a){case Yi.TARGET_DURATION:{if(!isFinite(r)||r<0)return;this.manifest.targetDuration=r,this.setHoldBack();break}case Yi.PART_INF:{Al(this.manifest,i),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),this.setHoldBack();break}case Yi.SERVER_CONTROL:{Al(this.manifest,i),this.setHoldBack();break}case Yi.INF:{r===0?this.currentUri.duration=.01:r>0&&(this.currentUri.duration=r);break}case Yi.PROGRAM_DATE_TIME:{var s=r,o=new Date(s);this.manifest.dateTimeString||(this.manifest.dateTimeString=s,this.manifest.dateTimeObject=o),this.currentUri.dateTimeString=s,this.currentUri.dateTimeObject=o;break}case Yi.VERSION:{Al(this.manifest,i);break}case Yi.SESSION_DATA:{var l=rb(i[1]),d=Vm(l);Object.assign(this.manifest.sessionData,d)}}};jo.prototype.setHoldBack=function(){var t=this.manifest,e=t.serverControl,i=t.targetDuration,a=t.partTargetDuration;if(e){var r="holdBack",s="partHoldBack",o=i&&i*3,l=a&&a*2;i&&!e.hasOwnProperty(r)&&(e[r]=o),o&&e[r]<o&&(e[r]=o),a&&!e.hasOwnProperty(s)&&(e[s]=a*3),a&&e[s]<l&&(e[s]=l)}};var Al=n(function(t,e){var i=Zm(e[0].replace("#EXT-X-","")),a;ib(e[1])?(a={},a=Object.assign(tb(e[1]),a)):a=du(e[1]),t[i]=a},"_t$1"),Zm=n(function(t){return t.toLowerCase().replace(/-(\w)/g,function(e){return e[1].toUpperCase()})},"Qr"),du=n(function(t){if(t.toLowerCase()==="yes"||t.toLowerCase()==="no")return t.toLowerCase()==="yes";var e=t.indexOf(":")!==-1?t:parseFloat(t);return isNaN(e)?t:e},"ft$2"),eb=n(function(t){var e={},i=t.split("=");if(i.length>1){var a=Zm(i[0]);e[a]=du(i[1])}return e},"Pi"),tb=n(function(t){for(var e=t.split(","),i={},a=0;e.length>a;a++){var r=e[a],s=eb(r);i=Object.assign(s,i)}return i},"Li"),ib=n(function(t){return t.indexOf("=")>-1},"Ii$1"),ab=n(function(t,e){return e===-1?[t]:[t.substring(0,e),t.substring(e+1)]},"Ni"),rb=n(function(t){var e={};if(t){var i=t.search(","),a=t.slice(0,i),r=t.slice(i+1),s=[a,r];return s.forEach(function(o,l){for(var d=o.replace(/['"]+/g,"").split("="),c=0;c<d.length;c++)d[c]==="DATA-ID"&&(e["DATA-ID"]=d[1-c]),d[c]==="VALUE"&&(e.VALUE=d[1-c])}),{data:e}}},"Ci"),nb=jo,sb={safeCall:Z_,safeIncrement:we,getComputedStyle:X_,secondsToMs:J_,assign:Object.assign,headersStringToObject:lu,cdnHeadersToRequestId:bo,extractHostnameAndDomain:An,extractHostname:St,manifestParser:nb,generateShortID:Fm,generateUUID:Tn,now:De.now,findMediaElement:Eo},ob=sb,lb={PLAYER_READY:"playerready",VIEW_INIT:"viewinit",VIDEO_CHANGE:"videochange",PLAY:"play",PAUSE:"pause",PLAYING:"playing",TIME_UPDATE:"timeupdate",SEEKING:"seeking",SEEKED:"seeked",REBUFFER_START:"rebufferstart",REBUFFER_END:"rebufferend",ERROR:"error",ENDED:"ended",RENDITION_CHANGE:"renditionchange",ORIENTATION_CHANGE:"orientationchange",PLAYBACK_MODE_CHANGE:"playbackmodechange",NETWORK_CHANGE:"networkchange",AD_REQUEST:"adrequest",AD_RESPONSE:"adresponse",AD_BREAK_START:"adbreakstart",AD_PLAY:"adplay",AD_PLAYING:"adplaying",AD_PAUSE:"adpause",AD_FIRST_QUARTILE:"adfirstquartile",AD_MID_POINT:"admidpoint",AD_THIRD_QUARTILE:"adthirdquartile",AD_ENDED:"adended",AD_BREAK_END:"adbreakend",AD_ERROR:"aderror",REQUEST_COMPLETED:"requestcompleted",REQUEST_FAILED:"requestfailed",REQUEST_CANCELLED:"requestcanceled",HEARTBEAT:"hb",DESTROY:"destroy"},db=lb,ub="mux-embed",cb="5.18.1",hb="2.1",_e={},Hi=n(function(t){var e=arguments;typeof t=="string"?Hi.hasOwnProperty(t)?on.default.setTimeout(function(){e=Array.prototype.splice.call(e,1),Hi[t].apply(null,e)},0):ie.warn("`"+t+"` is an unknown task"):typeof t=="function"?on.default.setTimeout(function(){t(Hi)},0):ie.warn("`"+t+"` is invalid.")},"ue$2"),mb={loaded:De.now(),NAME:ub,VERSION:cb,API_VERSION:hb,PLAYER_TRACKED:!1,monitor:n(function(t,e){return j_(Hi,t,e)},"monitor"),destroyMonitor:n(function(t){var e=Ei(Eo(t),1),i=e[0];i&&i.mux&&typeof i.mux.destroy=="function"?i.mux.destroy():ie.error("A video element monitor for `"+t+"` has not been initialized via `mux.monitor`.")},"destroyMonitor"),addHLSJS:n(function(t,e){var i=Et(t);_e[i]?_e[i].addHLSJS(e):ie.error("A monitor for `"+i+"` has not been initialized.")},"addHLSJS"),addDashJS:n(function(t,e){var i=Et(t);_e[i]?_e[i].addDashJS(e):ie.error("A monitor for `"+i+"` has not been initialized.")},"addDashJS"),removeHLSJS:n(function(t){var e=Et(t);_e[e]?_e[e].removeHLSJS():ie.error("A monitor for `"+e+"` has not been initialized.")},"removeHLSJS"),removeDashJS:n(function(t){var e=Et(t);_e[e]?_e[e].removeDashJS():ie.error("A monitor for `"+e+"` has not been initialized.")},"removeDashJS"),init:n(function(t,e){Fl()&&e&&e.respectDoNotTrack&&ie.info("The browser's Do Not Track flag is enabled - Mux beaconing is disabled.");var i=Et(t);_e[i]=new G_(Hi,i,e)},"init"),emit:n(function(t,e,i){var a=Et(t);_e[a]?(_e[a].emit(e,i),e==="destroy"&&delete _e[a]):ie.error("A monitor for `"+a+"` has not been initialized.")},"emit"),updateData:n(function(t,e){var i=Et(t);_e[i]?_e[i].emit("hb",e):ie.error("A monitor for `"+i+"` has not been initialized.")},"updateData"),setEmitTranslator:n(function(t,e){var i=Et(t);_e[i]?_e[i].emitTranslator=e:ie.error("A monitor for `"+i+"` has not been initialized.")},"setEmitTranslator"),setStateDataTranslator:n(function(t,e){var i=Et(t);_e[i]?_e[i].stateDataTranslator=e:ie.error("A monitor for `"+i+"` has not been initialized.")},"setStateDataTranslator"),setGetPlayheadTime:n(function(t,e){var i=Et(t);_e[i]?_e[i].getPlayheadTime=e:ie.error("A monitor for `"+i+"` has not been initialized.")},"setGetPlayheadTime"),checkDoNotTrack:Fl,log:ie,utils:ob,events:db,WINDOW_HIDDEN:!1,WINDOW_UNLOADING:!1};Object.assign(Hi,mb);typeof on.default<"u"&&typeof on.default.addEventListener=="function"&&on.default.addEventListener("pagehide",function(t){t.persisted||(Hi.WINDOW_UNLOADING=!0)},!1);var uu=Hi;var V=Wf,X={VIDEO:"video",THUMBNAIL:"thumbnail",STORYBOARD:"storyboard",DRM:"drm"},N={NOT_AN_ERROR:0,NETWORK_OFFLINE:2000002,NETWORK_UNKNOWN_ERROR:2e6,NETWORK_NO_STATUS:2000001,NETWORK_INVALID_URL:24e5,NETWORK_NOT_FOUND:2404e3,NETWORK_NOT_READY:2412e3,NETWORK_GENERIC_SERVER_FAIL:25e5,NETWORK_TOKEN_MISSING:2403201,NETWORK_TOKEN_MALFORMED:2412202,NETWORK_TOKEN_EXPIRED:2403210,NETWORK_TOKEN_AUD_MISSING:2403221,NETWORK_TOKEN_AUD_MISMATCH:2403222,NETWORK_TOKEN_SUB_MISMATCH:2403232,ENCRYPTED_ERROR:5e6,ENCRYPTED_UNSUPPORTED_KEY_SYSTEM:5000001,ENCRYPTED_GENERATE_REQUEST_FAILED:5000002,ENCRYPTED_UPDATE_LICENSE_FAILED:5000003,ENCRYPTED_UPDATE_SERVER_CERT_FAILED:5000004,ENCRYPTED_CDM_ERROR:5000005,ENCRYPTED_OUTPUT_RESTRICTED:5000006,ENCRYPTED_MISSING_TOKEN:5000002},Zo=n(t=>t===X.VIDEO?"playback":t,"V"),Ti=class Nr extends Error{static{n(this,"_")}constructor(e,i=Nr.MEDIA_ERR_CUSTOM,a,r){var s;super(e),this.name="MediaError",this.code=i,this.context=r,this.fatal=a??(i>=Nr.MEDIA_ERR_NETWORK&&i<=Nr.MEDIA_ERR_ENCRYPTED),this.message||(this.message=(s=Nr.defaultMessages[this.code])!=null?s:"")}};Ti.MEDIA_ERR_ABORTED=1,Ti.MEDIA_ERR_NETWORK=2,Ti.MEDIA_ERR_DECODE=3,Ti.MEDIA_ERR_SRC_NOT_SUPPORTED=4,Ti.MEDIA_ERR_ENCRYPTED=5,Ti.MEDIA_ERR_CUSTOM=100,Ti.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail.",3:"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",4:"An unsupported error occurred. The server or network failed, or your browser does not support this format.",5:"The media is encrypted and there are no keys to decrypt it."};var R=Ti,pb=n(t=>t==null,"dt"),cu=n((t,e)=>pb(e)?!1:t in e,"K$2"),ql={ANY:"any",MUTED:"muted"},Z={ON_DEMAND:"on-demand",LIVE:"live",UNKNOWN:"unknown"},zt={MSE:"mse",NATIVE:"native"},Pr={HEADER:"header",QUERY:"query",NONE:"none"},go=Object.values(Pr),pi={M3U8:"application/vnd.apple.mpegurl",MP4:"video/mp4"},ih={HLS:pi.M3U8};[...Object.values(pi)];var Tk={upTo720p:"720p",upTo1080p:"1080p",upTo1440p:"1440p",upTo2160p:"2160p"},Ak={noLessThan480p:"480p",noLessThan540p:"540p",noLessThan720p:"720p",noLessThan1080p:"1080p",noLessThan1440p:"1440p",noLessThan2160p:"2160p"},kk={DESCENDING:"desc"},vb="en",Yl={code:vb},ye=n((t,e,i,a,r=t)=>{r.addEventListener(e,i,a),t.addEventListener("teardown",()=>{r.removeEventListener(e,i)},{once:!0})},"P$3");function fb(t,e,i){e&&i>e&&(i=e);for(let a=0;a<t.length;a++)if(t.start(a)<=i&&t.end(a)>=i)return!0;return!1}n(fb,"Me$1");var hu=n(t=>{let e=t.indexOf("?");if(e<0)return[t];let i=t.slice(0,e),a=t.slice(e);return[i,a]},"J$1"),Xo=n(t=>{let{type:e}=t;if(e){let i=e.toUpperCase();return cu(i,ih)?ih[i]:e}return Eb(t)},"W$1"),Xm=n(t=>t==="VOD"?Z.ON_DEMAND:Z.LIVE,"ne$2"),Jm=n(t=>t==="EVENT"?Number.POSITIVE_INFINITY:t==="VOD"?Number.NaN:0,"oe$2"),Eb=n(t=>{let{src:e}=t;if(!e)return"";let i="";try{i=mu(e).pathname}catch{console.error("Invalid url when trying to infer mime type",e)}let a=i.lastIndexOf(".");if(a<0)return gb(t)?pi.M3U8:"";let r=i.slice(a+1).toUpperCase();return cu(r,pi)?pi[r]:""},"ft$1"),Gl=n(t=>{try{return new URL(t),!1}catch{return!0}},"j"),_b=n(t=>t.split(`
`).find((e,i,a)=>i>0&&a[i-1].startsWith("#EXT-X-STREAM-INF")),"be$1"),mu=n((t,e)=>{var i;if(!Gl(t))return new URL(t);let a=(i=window?.location)==null?void 0:i.href,r=e??a;return e&&Gl(e.toString())&&(r=new URL(e,a)),new URL(t,r)},"G$2"),bb="mux.com",gb=n(({src:t,customDomain:e=bb})=>{let i;try{i=new URL(`${t}`)}catch{return!1}let a=i.protocol==="https:",r=i.hostname===`stream.${e}`.toLowerCase(),s=i.pathname.split("/"),o=s.length===2,l=!(s!=null&&s[1].includes("."));return a&&r&&o&&l},"Tt$1"),tr=n(t=>{let e=(t??"").split(".")[1];if(e)try{let i=e.replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(i).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(a)}catch{return}},"ae$2"),yb=n(({exp:t},e=Date.now())=>!t||t*1e3<e,"Re$1"),Tb=n(({sub:t},e)=>t!==e,"xe$1"),Ab=n(({aud:t},e)=>!t,"Ce$1"),kb=n(({aud:t},e)=>t!==e,"ve"),ep="en";function x(t,e=!0){var i,a;let r=e&&(a=(i=Yl)==null?void 0:i[t])!=null?a:t,s=e?Yl.code:ep;return new Sb(r,s)}n(x,"x$2");var Sb=class{static{n(this,"re")}constructor(e,i=(a=>(a=Yl)!=null?a:ep)()){this.message=e,this.locale=i}format(e){return this.message.replace(/\{(\w+)\}/g,(i,a)=>{var r;return(r=e[a])!=null?r:""})}toString(){return this.message}},wb=Object.values(ql),ah=n(t=>typeof t=="boolean"||typeof t=="string"&&wb.includes(t),"De"),Ib=n((t,e,i)=>{let{autoplay:a}=t,r=!1,s=!1,o=ah(a)?a:!!a,l=n(()=>{r||ye(e,"playing",()=>{r=!0},{once:!0})},"i");if(l(),ye(e,"loadstart",()=>{r=!1,l(),kl(e,o)},{once:!0}),ye(e,"loadstart",()=>{i||(t.streamType&&t.streamType!==Z.UNKNOWN?s=t.streamType===Z.LIVE:s=!Number.isFinite(e.duration)),kl(e,o)},{once:!0}),i&&i.once(V.Events.LEVEL_LOADED,(d,c)=>{var p;t.streamType&&t.streamType!==Z.UNKNOWN?s=t.streamType===Z.LIVE:s=(p=c.details.live)!=null?p:!1}),!o){let d=n(()=>{!s||Number.isFinite(t.startTime)||(i!=null&&i.liveSyncPosition?e.currentTime=i.liveSyncPosition:Number.isFinite(e.seekable.end(0))&&(e.currentTime=e.seekable.end(0)))},"u");i&&ye(e,"play",()=>{e.preload==="metadata"?i.once(V.Events.LEVEL_UPDATED,d):d()},{once:!0})}return d=>{r||(o=ah(d)?d:!!d,kl(e,o))}},"Pe$2"),kl=n((t,e)=>{if(!e)return;let i=t.muted,a=n(()=>t.muted=i,"n");switch(e){case ql.ANY:t.play().catch(()=>{t.muted=!0,t.play().catch(a)});break;case ql.MUTED:t.muted=!0,t.play().catch(a);break;default:t.play().catch(()=>{});break}},"se$2"),Rb=n(({preload:t,src:e},i,a)=>{let r=n(v=>{v!=null&&["","none","metadata","auto"].includes(v)?i.setAttribute("preload",v):i.removeAttribute("preload")},"o");if(!a)return r(t),r;let s=!1,o=!1,l=a.config.maxBufferLength,d=a.config.maxBufferSize,c=n(v=>{r(v);let m=v??i.preload;o||m==="none"||(m==="metadata"?(a.config.maxBufferLength=1,a.config.maxBufferSize=1):(a.config.maxBufferLength=l,a.config.maxBufferSize=d),p())},"u"),p=n(()=>{!s&&e&&(s=!0,a.loadSource(e))},"f");return ye(i,"play",()=>{o=!0,a.config.maxBufferLength=l,a.config.maxBufferSize=d,p()},{once:!0}),c(t),c},"Le$1"),Lb=n((t,e,i)=>{let{minPreloadSegments:a}=t;if(a==null||a<=0||!i)return;let r=0,s=!1,o=e.playbackRate||1,l=n(()=>{e.playbackRate!==0&&(o=e.playbackRate,e.playbackRate=0)},"i");e.playbackRate=0,ye(e,"ratechange",l);let d=n((c,{frag:p})=>{s||p.type!=="main"||(r++,r>=a&&(s=!0,e.removeEventListener("ratechange",l),e.playbackRate=o))},"l");i.on(V.Events.FRAG_BUFFERED,d),e.addEventListener("teardown",()=>{s||(s=!0,i.off(V.Events.FRAG_BUFFERED,d),e.playbackRate=o)},{once:!0})},"he$1"),Cb=n((t,e,i)=>{let{initialEstimateSegments:a}=t;if(a==null||a<=0||!i)return;let r=0;i.on(V.Events.FRAG_BUFFERED,(s,{frag:o})=>{o.type==="main"&&(r++,r<a&&i.abrController.resetEstimator(i.config.abrEwmaDefaultEstimate))})},"_e$1");function Db(t,e){var i;if(!("videoTracks"in t))return;let a=new WeakMap;e.on(V.Events.MANIFEST_PARSED,function(c,p){d();let v=t.addVideoTrack("main");v.selected=!0;for(let[m,u]of p.levels.entries()){let f=v.addRendition(u.url[0],u.width,u.height,u.videoCodec,u.bitrate);a.set(u,`${m}`),f.id=`${m}`}}),e.on(V.Events.AUDIO_TRACKS_UPDATED,function(c,p){l();for(let v of p.audioTracks){let m=v.default?"main":"alternative",u=t.addAudioTrack(m,v.name,v.lang);u.id=`${v.id}`,v.default&&(u.enabled=!0)}});let r=n(()=>{var c;let p=+((c=[...t.audioTracks].find(m=>m.enabled))==null?void 0:c.id),v=e.audioTracks.map(m=>m.id);p!=e.audioTrack&&v.includes(p)&&(e.audioTrack=p)},"n");t.audioTracks.addEventListener("change",r),e.on(V.Events.LEVELS_UPDATED,function(c,p){var v;let m=t.videoTracks[(v=t.videoTracks.selectedIndex)!=null?v:0];if(!m)return;let u=p.levels.map(f=>a.get(f));for(let f of t.videoRenditions)f.id&&!u.includes(f.id)&&m.removeRendition(f)});let s=n(c=>{let p=c.target.selectedIndex;p!=e.nextLevel&&(e.nextLevel=p)},"o");(i=t.videoRenditions)==null||i.addEventListener("change",s);let o=n(()=>{for(let c of t.videoTracks)t.removeVideoTrack(c)},"s"),l=n(()=>{for(let c of t.audioTracks)t.removeAudioTrack(c)},"a"),d=n(()=>{o(),l()},"i");e.once(V.Events.DESTROYING,()=>{var c,p;d(),(c=t.audioTracks)==null||c.removeEventListener("change",r),(p=t.videoRenditions)==null||p.removeEventListener("change",s)})}n(Db,"we");var Sl=n(t=>"time"in t?t.time:t.startTime,"ie$2");function Mb(t,e){e.on(V.Events.NON_NATIVE_TEXT_TRACKS_FOUND,(r,{tracks:s})=>{s.forEach(o=>{var l,d;let c=(l=o.subtitleTrack)!=null?l:o.closedCaptions,p=e.subtitleTracks.findIndex(({lang:m,name:u,type:f})=>m==c?.lang&&u===o.label&&f.toLowerCase()===o.kind),v=((d=o._id)!=null?d:o.default)?"default":`${o.kind}${p}`;pu(t,o.kind,o.label,c?.lang,v,o.default)})});let i=n(()=>{if(!e.subtitleTracks.length)return;let r=Array.from(t.textTracks).find(l=>l.id&&l.mode==="showing"&&["subtitles","captions"].includes(l.kind));if(!r)return;let s=e.subtitleTracks[e.subtitleTrack],o=s?s.default?"default":`${e.subtitleTracks[e.subtitleTrack].type.toLowerCase()}${e.subtitleTrack}`:void 0;if(e.subtitleTrack<0||r?.id!==o){let l=e.subtitleTracks.findIndex(({lang:d,name:c,type:p,default:v})=>r.id==="default"&&v||d==r.language&&c===r.label&&p.toLowerCase()===r.kind);e.subtitleTrack=l}r?.id===o&&r.cues&&Array.from(r.cues).forEach(l=>{r.addCue(l)})},"r");t.textTracks.addEventListener("change",i),e.on(V.Events.CUES_PARSED,(r,{track:s,cues:o})=>{let l=t.textTracks.getTrackById(s);if(!l)return;let d=l.mode==="disabled";d&&(l.mode="hidden"),o.forEach(c=>{var p;(p=l.cues)!=null&&p.getCueById(c.id)||l.addCue(c)}),d&&(l.mode="disabled")}),e.once(V.Events.DESTROYING,()=>{t.textTracks.removeEventListener("change",i),t.querySelectorAll("track[data-removeondestroy]").forEach(r=>{r.remove()})});let a=n(()=>{Array.from(t.textTracks).forEach(r=>{var s,o;if(!["subtitles","caption"].includes(r.kind)&&(r.label==="thumbnails"||r.kind==="chapters")){if(!((s=r.cues)!=null&&s.length)){let l="track";r.kind&&(l+=`[kind="${r.kind}"]`),r.label&&(l+=`[label="${r.label}"]`);let d=t.querySelector(l),c=(o=d?.getAttribute("src"))!=null?o:"";d?.removeAttribute("src"),setTimeout(()=>{d?.setAttribute("src",c)},0)}r.mode!=="hidden"&&(r.mode="hidden")}})},"n");e.once(V.Events.MANIFEST_LOADED,a),e.once(V.Events.MEDIA_ATTACHED,a)}n(Mb,"Ae$1");function pu(t,e,i,a,r,s){let o=document.createElement("track");return o.kind=e,o.label=i,a&&(o.srclang=a),r&&(o.id=r),s&&(o.default=!0),o.track.mode=["subtitles","captions"].includes(e)?"disabled":"hidden",o.setAttribute("data-removeondestroy",""),t.append(o),o.track}n(pu,"ce$1");function Ob(t,e){let i=Array.prototype.find.call(t.querySelectorAll("track"),a=>a.track===e);i?.remove()}n(Ob,"Et");function $n(t,e,i){var a;return(a=Array.from(t.querySelectorAll("track")).find(r=>r.track.label===e&&r.track.kind===i))==null?void 0:a.track}n($n,"U$2");async function tp(t,e,i,a){let r=$n(t,i,a);return r||(r=pu(t,a,i),r.mode="hidden",await new Promise(s=>setTimeout(()=>s(void 0),0))),r.mode!=="hidden"&&(r.mode="hidden"),[...e].sort((s,o)=>Sl(o)-Sl(s)).forEach(s=>{var o,l;let d=s.value,c=Sl(s);if("endTime"in s&&s.endTime!=null)r?.addCue(new VTTCue(c,s.endTime,a==="chapters"?d:JSON.stringify(d??null)));else{let p=Array.prototype.findIndex.call(r?.cues,f=>f.startTime>=c),v=(o=r?.cues)==null?void 0:o[p],m=v?v.startTime:Number.isFinite(t.duration)?t.duration:Number.MAX_SAFE_INTEGER,u=(l=r?.cues)==null?void 0:l[p-1];u&&(u.endTime=c),r?.addCue(new VTTCue(c,m,a==="chapters"?d:JSON.stringify(d??null)))}}),t.textTracks.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),r}n(tp,"Se$1");var vu="cuepoints",ip=Object.freeze({label:vu});async function ap(t,e,i=ip){return tp(t,e,i.label,"metadata")}n(ap,"Ne$1");var zl=n(t=>({time:t.startTime,value:JSON.parse(t.text)}),"q");function xb(t,e={label:vu}){let i=$n(t,e.label,"metadata");return i!=null&&i.cues?Array.from(i.cues,a=>zl(a)):[]}n(xb,"gt$1");function rp(t,e={label:vu}){var i,a;let r=$n(t,e.label,"metadata");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return zl(r.activeCues[0]);let{currentTime:s}=t,o=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:l,endTime:d})=>l<=s&&d>s);return zl(o||r.activeCues[0])}n(rp,"Oe$1");async function Nb(t,e=ip){return new Promise(i=>{ye(t,"loadstart",async()=>{let a=await ap(t,[],e);ye(t,"cuechange",()=>{let r=rp(t);if(r){let s=new CustomEvent("cuepointchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(s)}},{},a),i(a)})})}n(Nb,"Ue");var fu="chapters",np=Object.freeze({label:fu}),Ql=n(t=>({startTime:t.startTime,endTime:t.endTime,value:t.text}),"z");async function sp(t,e,i=np){return tp(t,e,i.label,"chapters")}n(sp,"Ke$1");function Pb(t,e={label:fu}){var i;let a=$n(t,e.label,"chapters");return(i=a?.cues)!=null&&i.length?Array.from(a.cues,r=>Ql(r)):[]}n(Pb,"Mt$1");function op(t,e={label:fu}){var i,a;let r=$n(t,e.label,"chapters");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return Ql(r.activeCues[0]);let{currentTime:s}=t,o=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:l,endTime:d})=>l<=s&&d>s);return Ql(o||r.activeCues[0])}n(op,"We");async function $b(t,e=np){return new Promise(i=>{ye(t,"loadstart",async()=>{let a=await sp(t,[],e);ye(t,"cuechange",()=>{let r=op(t);if(r){let s=new CustomEvent("chapterchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(s)}},{},a),i(a)})})}n($b,"Fe");function Ub(t,e){if(e){let i=e.playingDate;if(i!=null)return new Date(i.getTime()-t.currentTime*1e3)}return typeof t.getStartDate=="function"?t.getStartDate():new Date(NaN)}n(Ub,"bt$1");function Hb(t,e){if(e&&e.playingDate)return e.playingDate;if(typeof t.getStartDate=="function"){let i=t.getStartDate();return new Date(i.getTime()+t.currentTime*1e3)}return new Date(NaN)}n(Hb,"Rt$1");var dn={VIDEO:"v",THUMBNAIL:"t",STORYBOARD:"s",DRM:"d"},Bb=n(t=>{if(t===X.VIDEO)return dn.VIDEO;if(t===X.DRM)return dn.DRM},"xt"),Wb=n((t,e)=>{var i,a;let r=Zo(t),s=`${r}Token`;return(i=e.tokens)!=null&&i[r]?(a=e.tokens)==null?void 0:a[r]:cu(s,e)?e[s]:void 0},"Ct$1"),yo=n((t,e,i,a,r=!1,s=!(o=>(o=globalThis.navigator)==null?void 0:o.onLine)())=>{var o,l;if(s){let T=x("Your device appears to be offline",r),A,y=R.MEDIA_ERR_NETWORK,S=new R(T,y,!1,A);return S.errorCategory=e,S.muxCode=N.NETWORK_OFFLINE,S.data=t,S}let d="status"in t?t.status:t.code,c=Date.now(),p=R.MEDIA_ERR_NETWORK;if(d===200)return;let v=Zo(e),m=Wb(e,i),u=Bb(e),[f]=hu((o=i.playbackId)!=null?o:"");if(!d||!f)return;let _=tr(m);if(m&&!_){let T=x("The {tokenNamePrefix}-token provided is invalid or malformed.",r).format({tokenNamePrefix:v}),A=x("Compact JWT string: {token}",r).format({token:m}),y=new R(T,p,!0,A);return y.errorCategory=e,y.muxCode=N.NETWORK_TOKEN_MALFORMED,y.data=t,y}if(d>=500){let T=new R("",p,a??!0);return T.errorCategory=e,T.muxCode=N.NETWORK_UNKNOWN_ERROR,T}if(d===403)if(_){if(yb(_,c)){let T={timeStyle:"medium",dateStyle:"medium"},A=x("The video’s secured {tokenNamePrefix}-token has expired.",r).format({tokenNamePrefix:v}),y=x("Expired at: {expiredDate}. Current time: {currentDate}.",r).format({expiredDate:new Intl.DateTimeFormat("en",T).format((l=_.exp)!=null?l:0*1e3),currentDate:new Intl.DateTimeFormat("en",T).format(c)}),S=new R(A,p,!0,y);return S.errorCategory=e,S.muxCode=N.NETWORK_TOKEN_EXPIRED,S.data=t,S}if(Tb(_,f)){let T=x("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",r).format({tokenNamePrefix:v}),A=x("Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}",r).format({tokenNamePrefix:v,playbackId:f,tokenPlaybackId:_.sub}),y=new R(T,p,!0,A);return y.errorCategory=e,y.muxCode=N.NETWORK_TOKEN_SUB_MISMATCH,y.data=t,y}if(Ab(_)){let T=x("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:v}),A=x("The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.",r).format({tokenNamePrefix:v,expectedAud:u}),y=new R(T,p,!0,A);return y.errorCategory=e,y.muxCode=N.NETWORK_TOKEN_AUD_MISSING,y.data=t,y}if(kb(_,u)){let T=x("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:v}),A=x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.",r).format({tokenNamePrefix:v,expectedAud:u,aud:_.aud}),y=new R(T,p,!0,A);return y.errorCategory=e,y.muxCode=N.NETWORK_TOKEN_AUD_MISMATCH,y.data=t,y}}else{let T=x("Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.",r).format({tokenNamePrefix:v,category:e}),A=x("Specified playback ID: {playbackId}",r).format({playbackId:f}),y=new R(T,p,a??!0,A);return y.errorCategory=e,y.muxCode=N.NETWORK_TOKEN_MISSING,y.data=t,y}if(d===412){let T=x("This playback-id may belong to a live stream that is not currently active or an asset that is not ready.",r),A=x("Specified playback ID: {playbackId}",r).format({playbackId:f}),y=new R(T,p,a??!0,A);return y.errorCategory=e,y.muxCode=N.NETWORK_NOT_READY,y.streamType=i.streamType===Z.LIVE?"live":i.streamType===Z.ON_DEMAND?"on-demand":"unknown",y.data=t,y}if(d===404){let T=x("This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.",r),A=x("Specified playback ID: {playbackId}",r).format({playbackId:f}),y=new R(T,p,a??!0,A);return y.errorCategory=e,y.muxCode=N.NETWORK_NOT_FOUND,y.data=t,y}if(d===400){let T=x("The URL or playback-id was invalid. You may have used an invalid value as a playback-id."),A=x("Specified playback ID: {playbackId}",r).format({playbackId:f}),y=new R(T,p,a??!0,A);return y.errorCategory=e,y.muxCode=N.NETWORK_INVALID_URL,y.data=t,y}let g=new R("",p,a??!0);return g.errorCategory=e,g.muxCode=N.NETWORK_UNKNOWN_ERROR,g.data=t,g},"F"),rh=V.DefaultConfig.capLevelController,Fb={"720p":921600,"1080p":2073600,"1440p":4194304,"2160p":8294400};function Kb(t){let e=t.toLowerCase().trim();return Fb[e]}n(Kb,"kt$1");var jl=class $r extends rh{static{n(this,"S")}constructor(e){super(e)}static setMaxAutoResolution(e,i){i?$r.maxAutoResolution.set(e,i):$r.maxAutoResolution.delete(e)}getMaxAutoResolution(){var e;let i=this.hls;return(e=$r.maxAutoResolution.get(i))!=null?e:void 0}get levels(){var e;return(e=this.hls.levels)!=null?e:[]}getValidLevels(e){return this.levels.filter((i,a)=>this.isLevelAllowed(i)&&a<=e)}getMaxLevelCapped(e){let i=this.getValidLevels(e),a=this.getMaxAutoResolution();if(!a)return super.getMaxLevel(e);let r=Kb(a);if(!r)return super.getMaxLevel(e);let s=i.filter(d=>d.width*d.height<=r),o=s.findIndex(d=>d.width*d.height===r);if(o!==-1){let d=s[o];return i.findIndex(c=>c===d)}if(s.length===0)return 0;let l=s[s.length-1];return i.findIndex(d=>d===l)}getMaxLevel(e){if(this.getMaxAutoResolution()!==void 0)return this.getMaxLevelCapped(e);let i=super.getMaxLevel(e),a=this.getValidLevels(e);if(!a[i])return i;let r=Math.min(a[i].width,a[i].height),s=$r.minMaxResolution;return r>=s?i:rh.getMaxLevelByMediaSize(a,s*(16/9),s)}};jl.minMaxResolution=720,jl.maxAutoResolution=new WeakMap;var Vb=jl,Zl=Vb,qb="com.apple.fps.1_0",Yb="application/vnd.apple.mpegurl",Gb=n(({mediaEl:t,getAppCertificate:e,getLicenseKey:i,saveAndDispatchError:a,drmTypeCb:r})=>{if(!window.WebKitMediaKeys||!("onwebkitneedkey"in t)){console.error("No WebKitMediaKeys. FairPlay may not be supported");let m=x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),u=new R(m,R.MEDIA_ERR_ENCRYPTED,!0);return u.errorCategory=X.DRM,u.muxCode=N.ENCRYPTED_CDM_ERROR,a(t,u),()=>{}}let s=t,o=e(),l=null,d=n(m=>{(async()=>{try{s.webkitKeys||c();let u=await o;if(m.initData===null||u==null)return;let f=zb(m.initData,u);p(f)}catch(u){console.error("Could not start encrypted playback due to exception",u),a(s,u)}})()},"l"),c=n(()=>{try{let m=new WebKitMediaKeys(qb);s.webkitSetMediaKeys(m),r()}catch{let m="Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.",u=new R(m,R.MEDIA_ERR_ENCRYPTED,!0);throw u.errorCategory=X.DRM,u.muxCode=N.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,u}},"u"),p=n(m=>{let u=s.webkitKeys.createSession(Yb,m),f=n(async T=>{try{let A=T.message,y=await i(A);u.update(y)}catch(A){console.error("Error on FairPlay session message",A),a(t,A)}},"p"),_=n(T=>{let A=T.target.error;if(!A)return;console.error(`Internal Webkit Key Session Error - sysCode: ${A.systemCode} code: ${A.code}`);let y=x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser."),S=new R(y,R.MEDIA_ERR_ENCRYPTED,!0);S.errorCategory=X.DRM,S.muxCode=N.ENCRYPTED_CDM_ERROR,a(t,S)},"M"),g=n(()=>{u.removeEventListener("webkitkeymessage",f),u.removeEventListener("webkitkeyerror",_),t.removeEventListener("teardown",g),"webkitCurrentPlaybackTargetIsWireless"in t&&t.removeEventListener("webkitcurrentplaybacktargetiswirelesschanged",g),l=null;try{u.close()}catch{}},"E");"webkitCurrentPlaybackTargetIsWireless"in t&&t.addEventListener("webkitcurrentplaybacktargetiswirelesschanged",g,{once:!0}),u.addEventListener("webkitkeymessage",f),u.addEventListener("webkitkeyerror",_),t.addEventListener("teardown",g),l=g},"f"),v=n(()=>{t.removeEventListener("webkitneedkey",d),t.removeEventListener("teardown",v),l?.();try{s.webkitSetMediaKeys(null)}catch{}},"c");return t.addEventListener("webkitneedkey",d),t.addEventListener("teardown",v,{once:!0}),v},"Ye"),zb=n((t,e)=>{let i=jb(Qb(t)),a=new Uint8Array(t),r=new Uint8Array(i),s=new Uint8Array(e),o=a.byteLength+4+s.byteLength+4+r.byteLength,l=new Uint8Array(o),d=0,c=n(v=>{l.set(v,d),d+=v.byteLength},"u"),p=n(v=>{let m=new DataView(l.buffer),u=v.byteLength;m.setUint32(d,u,!0),d+=4,c(v)},"f");return c(a),p(r),p(s),l},"Lt$1"),Qb=n(t=>new TextDecoder("utf-16le").decode(t).replace("skd://","").slice(1),"ht$1");function jb(t){let e=new ArrayBuffer(t.length*2),i=new DataView(e);for(let a=0;a<t.length;a++)i.setUint16(a*2,t.charCodeAt(a),!0);return e}n(jb,"_t");var Zb=n(({mediaEl:t,getAppCertificate:e,getLicenseKey:i,saveAndDispatchError:a,drmTypeCb:r,fallbackToWebkitFairplay:s})=>{let o=null,l=n(async v=>{try{let m=v.initDataType;if(m!=="skd"){console.error(`Received unexpected initialization data type "${m}"`);return}t.mediaKeys||await d(m);let u=v.initData;if(u==null){console.error(`Could not start encrypted playback due to missing initData in ${v.type} event`);return}await c(m,u)}catch(m){a(t,m);return}},"i"),d=n(async v=>{let m=await navigator.requestMediaKeySystemAccess("com.apple.fps",[{initDataTypes:[v],videoCapabilities:[{contentType:"application/vnd.apple.mpegurl",robustness:""}],distinctiveIdentifier:"not-allowed",persistentState:"not-allowed",sessionTypes:["temporary"]}]).then(f=>(r(),f)).catch(()=>{let f=x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),_=new R(f,R.MEDIA_ERR_ENCRYPTED,!0);_.errorCategory=X.DRM,_.muxCode=N.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,a(t,_)});if(!m)return;let u=await m.createMediaKeys();try{let f=await e();await u.setServerCertificate(f).catch(()=>{let _=x("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."),g=new R(_,R.MEDIA_ERR_ENCRYPTED,!0);return g.errorCategory=X.DRM,g.muxCode=N.ENCRYPTED_UPDATE_SERVER_CERT_FAILED,Promise.reject(g)})}catch(f){a(t,f);return}await t.setMediaKeys(u)},"l"),c=n(async(v,m)=>{let u=t.mediaKeys.createSession(),f=n(async T=>{let A=T.message,y=await i(A);try{await u.update(y)}catch{let S=x("Failed to update DRM license. This may be an issue with the player or your protected content."),M=new R(S,R.MEDIA_ERR_ENCRYPTED,!0);M.errorCategory=X.DRM,M.muxCode=N.ENCRYPTED_UPDATE_LICENSE_FAILED,a(t,M)}},"p"),_=n(()=>{let T=n(A=>{let y;if(A==="internal-error"){let S=x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");y=new R(S,R.MEDIA_ERR_ENCRYPTED,!0),y.errorCategory=X.DRM,y.muxCode=N.ENCRYPTED_CDM_ERROR}else if(A==="output-restricted"||A==="output-downscaled"){let S=x("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");y=new R(S,R.MEDIA_ERR_ENCRYPTED,!1),y.errorCategory=X.DRM,y.muxCode=N.ENCRYPTED_OUTPUT_RESTRICTED}y&&a(t,y)},"D");u.keyStatuses.forEach(A=>T(A))},"M");u.addEventListener("keystatuseschange",_),u.addEventListener("message",f);let g=n(async()=>{u.removeEventListener("keystatuseschange",_),u.removeEventListener("message",f),"webkitCurrentPlaybackTargetIsWireless"in t&&t.removeEventListener("webkitcurrentplaybacktargetiswirelesschanged",g),t.removeEventListener("teardown",g),await u.close().catch(T=>{console.warn("There was an error when closing EME session",T)}),o=null},"E");"webkitCurrentPlaybackTargetIsWireless"in t&&t.addEventListener("webkitcurrentplaybacktargetiswirelesschanged",g,{once:!0}),t.addEventListener("teardown",g,{once:!0}),o=g,await u.generateRequest(v,m).catch(async T=>{if(T.name==="NotSupportedError"&&"webkitCurrentPlaybackTargetIsWireless"in t&&t.webkitCurrentPlaybackTargetIsWireless)console.warn("Failed to generate a DRM license request. Attempting to fallback to Webkit DRM"),s?.();else{let A=x("Failed to generate a DRM license request. This may be an issue with the player or your protected content."),y=new R(A,R.MEDIA_ERR_ENCRYPTED,!0);return y.errorCategory=X.DRM,y.muxCode=N.ENCRYPTED_GENERATE_REQUEST_FAILED,console.error("Failed to generate license request",T),Promise.reject(y)}})},"u"),p=n(async()=>{t.removeEventListener("encrypted",l),t.removeEventListener("teardown",p),o&&await o(),await t.setMediaKeys(null).catch(()=>{})},"f");return t.addEventListener("encrypted",l),t.addEventListener("teardown",p,{once:!0}),p},"$e"),ss={FAIRPLAY:"fairplay",PLAYREADY:"playready",WIDEVINE:"widevine"},Xb=n(t=>{if(t.includes("fps"))return ss.FAIRPLAY;if(t.includes("playready"))return ss.PLAYREADY;if(t.includes("widevine"))return ss.WIDEVINE},"At$1"),Jb=n((t,e)=>{let i=_b(t);if(!i)return Promise.reject(new Error("No media playlist URL found in multivariant playlist"));if(Gl(i)&&!e)return Promise.reject(new Error("masterPlaylistUrl is required to resolve relative media playlist URL"));let a;try{a=mu(i,e)}catch(r){return Promise.reject(r)}return fetch(a).then(r=>r.status!==200?Promise.reject(r):r.text())},"St$1"),eg=n(t=>{let e=t.split(`
`).filter(a=>a.startsWith("#EXT-X-SESSION-DATA"));if(!e.length)return{};let i={};for(let a of e){let r=ig(a),s=r["DATA-ID"];s&&(i[s]={...r})}return{sessionData:i}},"It$1"),tg=/([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g;function ig(t){let e=[...t.matchAll(tg)];return Object.fromEntries(e.map(([,i,a])=>[i,a]))}n(ig,"Ot");var ag=n(t=>{var e,i,a;let r=t.split(`
`),s=(i=((e=r.find(c=>c.startsWith("#EXT-X-PLAYLIST-TYPE")))!=null?e:"").split(":")[1])==null?void 0:i.trim(),o=Xm(s),l=Jm(s),d;if(o===Z.LIVE){let c=r.find(p=>p.startsWith("#EXT-X-PART-INF"));if(c)d=+c.split(":")[1].split("=")[1]*2;else{let p=r.find(m=>m.startsWith("#EXT-X-TARGETDURATION")),v=(a=p?.split(":"))==null?void 0:a[1];d=+(v??6)*3}}return{streamType:o,targetLiveWindow:l,liveEdgeStartOffset:d}},"Ut$1"),rg=n(async(t,e)=>{if(e===pi.MP4)return{streamType:Z.ON_DEMAND,targetLiveWindow:Number.NaN,liveEdgeStartOffset:void 0,sessionData:void 0};if(e===pi.M3U8){let i=await fetch(t);if(!i.ok)return Promise.reject(i);let a=await i.text(),r=await Jb(a,i.url);return{...eg(a),...ag(r)}}return console.error(`Media type ${e} is an unrecognized or unsupported type for src ${t}.`),{streamType:void 0,targetLiveWindow:void 0,liveEdgeStartOffset:void 0,sessionData:void 0}},"Ht"),ng=n(async(t,e,i=Xo({src:t}))=>{var a,r,s,o;let{streamType:l,targetLiveWindow:d,liveEdgeStartOffset:c,sessionData:p}=await rg(t,i),v=p?.["com.apple.hls.chapters"];(v!=null&&v.URI||v!=null&&v.VALUE.toLocaleLowerCase().startsWith("http"))&&Eu((a=v.URI)!=null?a:v.VALUE,e),((r=oe.get(e))!=null?r:{}).liveEdgeStartOffset=c,((s=oe.get(e))!=null?s:{}).targetLiveWindow=d,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((o=oe.get(e))!=null?o:{}).streamType=l,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},"Kt$1"),Eu=n(async(t,e)=>{var i,a;try{let r=await fetch(t);if(!r.ok)throw new Error(`Failed to fetch Mux metadata: ${r.status} ${r.statusText}`);let s=await r.json(),o={};if(!((i=s?.[0])!=null&&i.metadata))return;for(let d of s[0].metadata)d.key&&d.value&&(o[d.key]=d.value);((a=oe.get(e))!=null?a:{}).metadata=o;let l=new CustomEvent("muxmetadata");e.dispatchEvent(l)}catch(r){console.error(r)}},"Te"),sg=n(t=>{var e;let i=t.type,a=Xm(i),r=Jm(i),s,o=!!((e=t.partList)!=null&&e.length);return a===Z.LIVE&&(s=o?t.partTarget*2:t.targetduration*3),{streamType:a,targetLiveWindow:r,liveEdgeStartOffset:s,lowLatency:o}},"Wt$1"),og=n((t,e,i)=>{var a,r,s,o,l,d,c,p;let{streamType:v,targetLiveWindow:m,liveEdgeStartOffset:u,lowLatency:f}=sg(t);if(v===Z.LIVE){f?(i.config.backBufferLength=(a=i.userConfig.backBufferLength)!=null?a:4,i.config.maxFragLookUpTolerance=(r=i.userConfig.maxFragLookUpTolerance)!=null?r:.001,i.config.abrBandWidthUpFactor=(s=i.userConfig.abrBandWidthUpFactor)!=null?s:i.config.abrBandWidthFactor):i.config.backBufferLength=(o=i.userConfig.backBufferLength)!=null?o:8;let _=Object.freeze({get length(){return e.seekable.length},start(g){return e.seekable.start(g)},end(g){var T;return g>this.length||g<0||Number.isFinite(e.duration)?e.seekable.end(g):(T=i.liveSyncPosition)!=null?T:e.seekable.end(g)}});((l=oe.get(e))!=null?l:{}).seekable=_}((d=oe.get(e))!=null?d:{}).liveEdgeStartOffset=u,((c=oe.get(e))!=null?c:{}).targetLiveWindow=m,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((p=oe.get(e))!=null?p:{}).streamType=v,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},"Ft$1"),nh,sh,lp=(sh=(nh=globalThis?.navigator)==null?void 0:nh.userAgent)!=null?sh:"",oh,lh,dh,lg=(dh=(lh=(oh=globalThis?.navigator)==null?void 0:oh.userAgentData)==null?void 0:lh.platform)!=null?dh:"",dg=lp.toLowerCase().includes("android")||["x11","android"].some(t=>lg.toLowerCase().includes(t)),ug=n(t=>/^((?!chrome|android).)*safari/i.test(lp)&&!!t.canPlayType("application/vnd.apple.mpegurl"),"$t$1"),oe=new WeakMap,vi="mux.com",uh,ch,dp=(ch=(uh=V).isSupported)==null?void 0:ch.call(uh),cg=n(t=>dg||!ug(t),"Bt$1"),_u=n(()=>{if(typeof window<"u")return uu.utils.now()},"kn"),hg=uu.utils.generateUUID,Xl=n(({playbackId:t,customDomain:e=vi,maxResolution:i,minResolution:a,renditionOrder:r,programStartTime:s,programEndTime:o,assetStartTime:l,assetEndTime:d,playbackToken:c,tokens:{playback:p=c}={},extraSourceParams:v={}}={})=>{if(!t)return;let[m,u=""]=hu(t),f=new URL(`https://stream.${e}/${m}.m3u8${u}`);return p||f.searchParams.has("token")?(f.searchParams.forEach((_,g)=>{g!="token"&&f.searchParams.delete(g)}),p&&f.searchParams.set("token",p)):(i&&f.searchParams.set("max_resolution",i),a&&(f.searchParams.set("min_resolution",a),i&&+i.slice(0,-1)<+a.slice(0,-1)&&console.error("minResolution must be <= maxResolution","minResolution",a,"maxResolution",i)),r&&f.searchParams.set("rendition_order",r),s&&f.searchParams.set("program_start_time",`${s}`),o&&f.searchParams.set("program_end_time",`${o}`),l&&f.searchParams.set("asset_start_time",`${l}`),d&&f.searchParams.set("asset_end_time",`${d}`),Object.entries(v).forEach(([_,g])=>{g!=null&&f.searchParams.set(_,g)})),f.toString()},"Dn"),Jo=n(t=>{if(!t)return;let[e]=t.split("?");return e||void 0},"ee$2"),bu=n(t=>{if(!t||!t.startsWith("https://stream."))return;let[e]=new URL(t).pathname.slice(1).split(/\.m3u8|\//);return e||void 0},"tt"),mg=n(t=>{var e,i,a;return(e=t?.metadata)!=null&&e.video_id?t.metadata.video_id:_p(t)&&(a=(i=Jo(t.playbackId))!=null?i:bu(t.src))!=null?a:t.src},"Jt"),up=n(t=>{var e;return(e=oe.get(t))==null?void 0:e.error},"Gt$1"),pg=n(t=>{var e;return(e=oe.get(t))==null?void 0:e.metadata},"Pn"),Jl=n(t=>{var e,i;return(i=(e=oe.get(t))==null?void 0:e.streamType)!=null?i:Z.UNKNOWN},"Be$1"),vg=n(t=>{var e,i;return(i=(e=oe.get(t))==null?void 0:e.targetLiveWindow)!=null?i:Number.NaN},"Ln"),gu=n(t=>{var e,i;return(i=(e=oe.get(t))==null?void 0:e.seekable)!=null?i:t.seekable},"rt"),fg=n(t=>{var e;let i=(e=oe.get(t))==null?void 0:e.liveEdgeStartOffset;if(typeof i!="number")return Number.NaN;let a=gu(t);return a.length?a.end(a.length-1)-i:Number.NaN},"hn"),Eg=n(t=>{var e;return(e=oe.get(t))==null?void 0:e.coreReference},"_n"),yu=.034,_g=n((t,e,i=yu)=>Math.abs(t-e)<=i,"qt$1"),cp=n((t,e,i=yu)=>t>e||_g(t,e,i),"nt"),bg=n((t,e=yu)=>t.paused&&cp(t.currentTime,t.duration,e),"zt$1"),hp=n((t,e)=>{var i,a,r;if(!e||!t.buffered.length)return;if(t.readyState>2)return!1;let s=e.currentLevel>=0?(a=(i=e.levels)==null?void 0:i[e.currentLevel])==null?void 0:a.details:(r=e.levels.find(v=>!!v.details))==null?void 0:r.details;if(!s||s.live)return;let{fragments:o}=s;if(!(o!=null&&o.length))return;if(t.currentTime<t.duration-(s.targetduration+.5))return!1;let l=o[o.length-1];if(t.currentTime<=l.start)return!1;let d=l.start+l.duration/2,c=t.buffered.start(t.buffered.length-1),p=t.buffered.end(t.buffered.length-1);return d>c&&d<p},"ot"),mp=n((t,e)=>t.ended||t.loop?t.ended:e&&hp(t,e)?!0:bg(t),"Xt$1"),pp=n((t,e,i)=>{vp(e,i,t);let{metadata:a={}}=t,{view_session_id:r=hg()}=a,s=mg(t);a.view_session_id=r,a.video_id=s,t.metadata=a;let o=n(m=>{var u;(u=e.mux)==null||u.emit("hb",{view_drm_type:m})},"a");t.drmTypeCb=o,t.fallbackToWebkitFairplay=async()=>{var m;let u=!e.paused,f=e.currentTime;t.useWebkitFairplay=!0;let _=t.muxDataKeepSession;t.muxDataKeepSession=!0;let g=(m=oe.get(e))==null?void 0:m.coreReference;pp(t,e,g),t.muxDataKeepSession=_,t.useWebkitFairplay=!1,u&&await e.play().then(()=>{e.currentTime=f}).catch(()=>{}),e.currentTime=f},oe.set(e,{retryCount:0});let l=gg(t,e),d=Rb(t,e,l);t!=null&&t.muxDataKeepSession&&e!=null&&e.mux&&!e.mux.deleted?l&&e.mux.addHLSJS({hlsjs:l,Hls:l?V:void 0}):Ig(t,e,l),Rg(t,e,l),Nb(e),$b(e);let c=Ib(t,e,l);Lb(t,e,l),Cb(t,e,l);let p={engine:l,setAutoplay:c,setPreload:d},v=oe.get(e);return v&&(v.coreReference=p),p},"Qt$1"),vp=n((t,e,i)=>{let a=e?.engine;t!=null&&t.mux&&!t.mux.deleted&&(i!=null&&i.muxDataKeepSession?a&&t.mux.removeHLSJS():(t.mux.destroy(),delete t.mux)),a&&(a.detachMedia(),a.destroy()),t&&(t.hasAttribute("src")&&(t.removeAttribute("src"),t.load()),t.removeEventListener("error",gp),t.removeEventListener("error",ed),t.removeEventListener("durationchange",bp),oe.delete(t),t.dispatchEvent(new Event("teardown")))},"Zt$1");function fp(t,e){var i;let a=Xo(t);if(a!==pi.M3U8)return!0;let r=!a||((i=e.canPlayType(a))!=null?i:!0),{preferPlayback:s}=t,o=s===zt.MSE,l=s===zt.NATIVE,d=dp&&(o||cg(e));return r&&(l||!d)}n(fp,"at");var gg=n((t,e)=>{let{debug:i,streamType:a,startTime:r=-1,metadata:s,preferCmcd:o,_hlsConfig:l={},maxAutoResolution:d,initialBandwidthEstimateKbps:c}=t,p=Xo(t)===pi.M3U8,v=fp(t,e);if(p&&!v&&dp){let m={backBufferLength:30,renderTextTracksNatively:!1,liveDurationInfinity:!0,capLevelOnFPSDrop:!0,...c!=null?{abrEwmaDefaultEstimate:c*1e3}:{}},u=yg(a),f=Tg(t),_=[Pr.QUERY,Pr.HEADER].includes(o)?{useHeaders:o===Pr.HEADER,sessionId:s?.view_session_id,contentId:s?.video_id}:void 0,g=wg(t),T=new V({debug:i,startPosition:r,cmcd:_,xhrSetup:n((A,y)=>{var S,M;if(o&&o!==Pr.QUERY)return;let D=mu(y);if(!D.searchParams.has("CMCD"))return;let U=((M=(S=D.searchParams.get("CMCD"))==null?void 0:S.split(","))!=null?M:[]).filter(W=>W.startsWith("sid")||W.startsWith("cid")).join(",");D.searchParams.set("CMCD",U),A.open("GET",D)},"xhrSetup"),...m,...g,...u,...f,...l});return g.capLevelController===Zl&&d!==void 0&&Zl.setMaxAutoResolution(T,d),T.on(V.Events.MANIFEST_PARSED,async function(A,y){var S,M;let D=(S=y.sessionData)==null?void 0:S["com.apple.hls.chapters"];(D!=null&&D.URI||D!=null&&D.VALUE.toLocaleLowerCase().startsWith("http"))&&Eu((M=D?.URI)!=null?M:D?.VALUE,e)}),T}},"er"),yg=n(t=>t===Z.LIVE?{backBufferLength:8}:{},"tr"),Tg=n(t=>{let{tokens:{drm:e}={},playbackId:i,drmTypeCb:a}=t,r=Jo(i);return!e||!r?{}:{emeEnabled:!0,drmSystems:{"com.apple.fps":{licenseUrl:os(t,"fairplay"),serverCertificateUrl:Ep(t,"fairplay")},"com.widevine.alpha":{licenseUrl:os(t,"widevine")},"com.microsoft.playready":{licenseUrl:os(t,"playready")}},requestMediaKeySystemAccessFunc:n((s,o)=>(s==="com.widevine.alpha"&&(o=[...o.map(l=>{var d;let c=(d=l.videoCapabilities)==null?void 0:d.map(p=>({...p,robustness:"HW_SECURE_ALL"}));return{...l,videoCapabilities:c}}),...o]),navigator.requestMediaKeySystemAccess(s,o).then(l=>{let d=Xb(s);return a?.(d),l})),"requestMediaKeySystemAccessFunc")}},"rr"),Ag=n(async t=>{let e=await fetch(t);return e.status!==200?Promise.reject(e):await e.arrayBuffer()},"nr"),kg=n(async(t,e)=>{let i=await fetch(e,{method:"POST",headers:{"Content-type":"application/octet-stream"},body:t});if(i.status!==200)return Promise.reject(i);let a=await i.arrayBuffer();return new Uint8Array(a)},"or"),Sg=n((t,e)=>{let i={mediaEl:e,getAppCertificate:n(()=>Ag(Ep(t,"fairplay")).catch(a=>{if(a instanceof Response){let r=yo(a,X.DRM,t);return console.error("mediaError",r?.message,r?.context),r?Promise.reject(r):Promise.reject(new Error("Unexpected error in app cert request"))}return Promise.reject(a)}),"getAppCertificate"),getLicenseKey:n(a=>kg(a,os(t,"fairplay")).catch(r=>{if(r instanceof Response){let s=yo(r,X.DRM,t);return console.error("mediaError",s?.message,s?.context),s?Promise.reject(s):Promise.reject(new Error("Unexpected error in license key request"))}return Promise.reject(r)}),"getLicenseKey"),saveAndDispatchError:Ni,drmTypeCb:n(()=>{var a;(a=t.drmTypeCb)==null||a.call(t,ss.FAIRPLAY)},"drmTypeCb")};if(t.useWebkitFairplay)Gb(i);else{let a={fallbackToWebkitFairplay:n(async()=>{var s;await r(),(s=t.fallbackToWebkitFairplay)==null||s.call(t)},"fallbackToWebkitFairplay"),...i},r=Zb(a)}},"ar"),os=n(({playbackId:t,tokens:{drm:e}={},customDomain:i=vi},a)=>{let r=Jo(t);return`https://license.${i.toLocaleLowerCase().endsWith(vi)?i:vi}/license/${a}/${r}?token=${e}`},"Z$1"),Ep=n(({playbackId:t,tokens:{drm:e}={},customDomain:i=vi},a)=>{let r=Jo(t);return`https://license.${i.toLocaleLowerCase().endsWith(vi)?i:vi}/appcert/${a}/${r}?token=${e}`},"st"),_p=n(({playbackId:t,src:e,customDomain:i})=>{if(t)return!0;if(typeof e!="string")return!1;let a=window?.location.href,r=new URL(e,a).hostname.toLocaleLowerCase();return r.includes(vi)||!!i&&r.includes(i.toLocaleLowerCase())},"it"),wg=n((t,e)=>{let i={};return i.capLevelToPlayerSize=t.capRenditionToPlayerSize,i.capLevelToPlayerSize==null?(i.capLevelController=Zl,i.capLevelToPlayerSize=!0):i.capLevelController=Ff,i},"sr"),Ig=n((t,e,i)=>{var a;let{envKey:r,disableTracking:s,muxDataSDK:o=uu,muxDataSDKOptions:l={}}=t,d=_p(t);if(!s&&(r||d)){let{playerInitTime:c,playerSoftwareName:p,playerSoftwareVersion:v,beaconCollectionDomain:m,debug:u,disableCookies:f}=t,_={...t.metadata,video_title:((a=t?.metadata)==null?void 0:a.video_title)||void 0},g=n(T=>typeof T.player_error_code=="string"?!1:typeof t.errorTranslator=="function"?t.errorTranslator(T):T,"E");o.monitor(e,{debug:u,beaconCollectionDomain:m,hlsjs:i,Hls:i?V:void 0,automaticErrorTracking:!1,errorTranslator:g,disableCookies:f,...l,data:{...r?{env_key:r}:{},player_software_name:p,player_software:p,player_software_version:v,player_init_time:c,..._}})}},"ir"),Rg=n((t,e,i)=>{var a,r;let s=fp(t,e),{src:o,customDomain:l=vi}=t,d=n(()=>{e.ended||t.disablePseudoEnded||!mp(e,i)||(hp(e,i)?e.currentTime=e.buffered.end(e.buffered.length-1):e.dispatchEvent(new Event("ended")))},"a"),c,p,v=n(()=>{let m=gu(e),u,f;m.length>0&&(u=m.start(0),f=m.end(0)),(p!==f||c!==u)&&e.dispatchEvent(new CustomEvent("seekablechange",{composed:!0})),c=u,p=f},"u");if(ye(e,"durationchange",v),e&&s){let m=Xo(t);if(typeof o=="string"){if(o.endsWith(".mp4")&&o.includes(l)){let _=bu(o),g=new URL(`https://stream.${l}/${_}/metadata.json`);Eu(g.toString(),e)}let u=n(()=>{if(Jl(e)!==Z.LIVE||Number.isFinite(e.duration))return;let _=setInterval(v,1e3);e.addEventListener("teardown",()=>{clearInterval(_)},{once:!0}),ye(e,"durationchange",()=>{Number.isFinite(e.duration)&&clearInterval(_)})},"d"),f=n(async()=>ng(o,e,m).then(u).catch(_=>{if(_ instanceof Response){let g=yo(_,X.VIDEO,t);if(g){Ni(e,g);return}}}),"p");if(e.preload==="none"){let _=n(()=>{f(),e.removeEventListener("loadedmetadata",g)},"M"),g=n(()=>{f(),e.removeEventListener("play",_)},"E");ye(e,"play",_,{once:!0}),ye(e,"loadedmetadata",g,{once:!0})}else f();(a=t.tokens)!=null&&a.drm?Sg(t,e):ye(e,"encrypted",()=>{let _=x("Attempting to play DRM-protected content without providing a DRM token."),g=new R(_,R.MEDIA_ERR_ENCRYPTED,!0);g.errorCategory=X.DRM,g.muxCode=N.ENCRYPTED_MISSING_TOKEN,Ni(e,g)},{once:!0}),e.setAttribute("src",o),t.startTime&&(((r=oe.get(e))!=null?r:{}).startTime=t.startTime,e.addEventListener("durationchange",bp,{once:!0}))}else e.removeAttribute("src");e.addEventListener("error",gp),e.addEventListener("error",ed),e.addEventListener("emptied",()=>{e.querySelectorAll("track[data-removeondestroy]").forEach(u=>{u.remove()})},{once:!0}),ye(e,"pause",d),ye(e,"seeked",d),ye(e,"play",()=>{e.ended||cp(e.currentTime,e.duration)&&(e.currentTime=e.seekable.length?e.seekable.start(0):0)})}else i&&o?(i.once(V.Events.LEVEL_LOADED,(m,u)=>{og(u.details,e,i),v(),Jl(e)===Z.LIVE&&!Number.isFinite(e.duration)&&(i.on(V.Events.LEVEL_UPDATED,v),ye(e,"durationchange",()=>{Number.isFinite(e.duration)&&i.off(V.Events.LEVELS_UPDATED,v)}))}),i.on(V.Events.ERROR,(m,u)=>{var f,_;let g=Lg(u,t);if(g.muxCode===N.NETWORK_NOT_READY){let T=(f=oe.get(e))!=null?f:{},A=(_=T.retryCount)!=null?_:0;if(A<6){let y=A===0?5e3:6e4,S=new R(`Retrying in ${y/1e3} seconds...`,g.code,g.fatal);Object.assign(S,g),Ni(e,S);let M=setTimeout(()=>{T.retryCount=A+1,u.details==="manifestLoadError"&&u.url&&i.loadSource(u.url)},y);e.addEventListener("teardown",()=>clearTimeout(M),{once:!0});return}else{T.retryCount=0;let y=new R('Try again later or <a href="#" onclick="window.location.reload(); return false;" style="color: #4a90e2;">click here to retry</a>',g.code,g.fatal);Object.assign(y,g),Ni(e,y);return}}Ni(e,g)}),i.on(V.Events.MANIFEST_LOADED,()=>{let m=oe.get(e);m&&m.error&&(m.error=null,m.retryCount=0,e.dispatchEvent(new Event("emptied")),e.dispatchEvent(new Event("loadstart")))}),e.addEventListener("error",ed),ye(e,"waiting",d),Db(t,i),Mb(e,i),i.attachMedia(e)):console.error("It looks like the video you're trying to play will not work on this system! If possible, try upgrading to the newest versions of your browser or software.")},"cr");function bp(t){var e;let i=t.target,a=(e=oe.get(i))==null?void 0:e.startTime;if(a&&fb(i.seekable,i.duration,a)){let r=i.preload==="auto";r&&(i.preload="none"),i.currentTime=a,r&&(i.preload="auto")}}n(bp,"ct$1");async function gp(t){if(!t.isTrusted)return;t.stopImmediatePropagation();let e=t.target;if(!(e!=null&&e.error))return;let{message:i,code:a}=e.error,r=new R(i,a);if(e.src&&a===R.MEDIA_ERR_SRC_NOT_SUPPORTED&&e.readyState===HTMLMediaElement.HAVE_NOTHING){setTimeout(()=>{var s;let o=(s=up(e))!=null?s:e.error;o?.code===R.MEDIA_ERR_SRC_NOT_SUPPORTED&&Ni(e,r)},500);return}if(e.src&&(a!==R.MEDIA_ERR_DECODE||a!==void 0))try{let{status:s}=await fetch(e.src);r.data={response:{code:s}}}catch{}Ni(e,r)}n(gp,"ut$1");function Ni(t,e){var i;e.fatal&&(((i=oe.get(t))!=null?i:{}).error=e,t.dispatchEvent(new CustomEvent("error",{detail:e})))}n(Ni,"I$2");function ed(t){var e,i;if(!(t instanceof CustomEvent)||!(t.detail instanceof R))return;let a=t.target,r=t.detail;!r||!r.fatal||(((e=oe.get(a))!=null?e:{}).error=r,(i=a.mux)==null||i.emit("error",{player_error_code:r.code,player_error_message:r.message,player_error_context:r.context}))}n(ed,"fe$1");var Lg=n((t,e)=>{var i,a,r;t.fatal?console.error("getErrorFromHlsErrorData()",t):e.debug&&console.warn("getErrorFromHlsErrorData() (non-fatal)",t);let s={[V.ErrorTypes.NETWORK_ERROR]:R.MEDIA_ERR_NETWORK,[V.ErrorTypes.MEDIA_ERROR]:R.MEDIA_ERR_DECODE,[V.ErrorTypes.KEY_SYSTEM_ERROR]:R.MEDIA_ERR_ENCRYPTED},o=n(p=>[V.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,V.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED].includes(p.details)?R.MEDIA_ERR_NETWORK:s[p.type],"o"),l=n(p=>{if(p.type===V.ErrorTypes.KEY_SYSTEM_ERROR)return X.DRM;if(p.type===V.ErrorTypes.NETWORK_ERROR)return X.VIDEO},"s"),d,c=o(t);if(c===R.MEDIA_ERR_NETWORK&&t.response){let p=(i=l(t))!=null?i:X.VIDEO;d=(a=yo(t.response,p,e,t.fatal))!=null?a:new R("",c,t.fatal)}else if(c===R.MEDIA_ERR_ENCRYPTED)if(t.details===V.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE){let p=x("Attempting to play DRM-protected content without providing a DRM token.");d=new R(p,R.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=X.DRM,d.muxCode=N.ENCRYPTED_MISSING_TOKEN}else if(t.details===V.ErrorDetails.KEY_SYSTEM_NO_ACCESS){let p=x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.");d=new R(p,R.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=X.DRM,d.muxCode=N.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM}else if(t.details===V.ErrorDetails.KEY_SYSTEM_NO_SESSION){let p=x("Failed to generate a DRM license request. This may be an issue with the player or your protected content.");d=new R(p,R.MEDIA_ERR_ENCRYPTED,!0),d.errorCategory=X.DRM,d.muxCode=N.ENCRYPTED_GENERATE_REQUEST_FAILED}else if(t.details===V.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED){let p=x("Failed to update DRM license. This may be an issue with the player or your protected content.");d=new R(p,R.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=X.DRM,d.muxCode=N.ENCRYPTED_UPDATE_LICENSE_FAILED}else if(t.details===V.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED){let p=x("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.");d=new R(p,R.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=X.DRM,d.muxCode=N.ENCRYPTED_UPDATE_SERVER_CERT_FAILED}else if(t.details===V.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR){let p=x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");d=new R(p,R.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=X.DRM,d.muxCode=N.ENCRYPTED_CDM_ERROR}else if(t.details===V.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED){let p=x("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");d=new R(p,R.MEDIA_ERR_ENCRYPTED,!1),d.errorCategory=X.DRM,d.muxCode=N.ENCRYPTED_OUTPUT_RESTRICTED}else d=new R(t.error.message,R.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=X.DRM,d.muxCode=N.ENCRYPTED_ERROR;else d=new R("",c,t.fatal);return d.context||(d.context=`${t.url?`url: ${t.url}
`:""}${t.response&&(t.response.code||t.response.text)?`response: ${t.response.code}, ${t.response.text}
`:""}${t.reason?`failure reason: ${t.reason}
`:""}${t.level?`level: ${t.level}
`:""}${t.parent?`parent stream controller: ${t.parent}
`:""}${t.buffer?`buffer length: ${t.buffer}
`:""}${t.error?`error: ${t.error}
`:""}${t.event?`event: ${t.event}
`:""}${t.err?`error message: ${(r=t.err)==null?void 0:r.message}
`:""}`),d.data=t,d},"ur"),yp=n(t=>{throw TypeError(t)},"D$1"),Tu=n((t,e,i)=>e.has(t)||yp("Cannot "+i),"P$2"),be=n((t,e,i)=>(Tu(t,e,"read from private field"),i?i.call(t):e.get(t)),"r$2"),at=n((t,e,i)=>e.has(t)?yp("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"o$2"),Tt=n((t,e,i,a)=>(Tu(t,e,"write to private field"),e.set(t,i),i),"E$3"),Wn=n((t,e,i)=>(Tu(t,e,"access private method"),i),"b$2"),Cg=n(()=>{try{return"0.31.0"}catch{}return"UNKNOWN"},"Y$1"),Dg=Cg(),Mg=n(()=>Dg,"k$1"),Og=`
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`,E={BEACON_COLLECTION_DOMAIN:"beacon-collection-domain",CUSTOM_DOMAIN:"custom-domain",DEBUG:"debug",DISABLE_TRACKING:"disable-tracking",DISABLE_COOKIES:"disable-cookies",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended",DRM_TOKEN:"drm-token",PLAYBACK_TOKEN:"playback-token",ENV_KEY:"env-key",MAX_RESOLUTION:"max-resolution",MIN_RESOLUTION:"min-resolution",MAX_AUTO_RESOLUTION:"max-auto-resolution",RENDITION_ORDER:"rendition-order",PROGRAM_START_TIME:"program-start-time",PROGRAM_END_TIME:"program-end-time",ASSET_START_TIME:"asset-start-time",ASSET_END_TIME:"asset-end-time",METADATA_URL:"metadata-url",PLAYBACK_ID:"playback-id",PLAYER_SOFTWARE_NAME:"player-software-name",PLAYER_SOFTWARE_VERSION:"player-software-version",PLAYER_INIT_TIME:"player-init-time",PREFER_CMCD:"prefer-cmcd",PREFER_PLAYBACK:"prefer-playback",START_TIME:"start-time",STREAM_TYPE:"stream-type",TARGET_LIVE_WINDOW:"target-live-window",LIVE_EDGE_OFFSET:"live-edge-offset",TYPE:"type",LOGO:"logo",CAP_RENDITION_TO_PLAYER_SIZE:"cap-rendition-to-player-size",INITIAL_BANDWIDTH_ESTIMATE_KBPS:"initial-bandwidth-estimate-kbps",INITIAL_ESTIMATE_SEGMENTS:"initial-estimate-segments",MIN_PRELOAD_SEGMENTS:"min-preload-segments"},xg=Object.values(E),hh=Mg(),mh="mux-video",Ur,ls,Hr,ds,us,cs,hs,ms,Br,ps,st,Zi,vs,Wr,Ng=class extends Hn{static{n(this,"G")}constructor(){super(),at(this,st),at(this,Ur),at(this,ls),at(this,Hr,{}),at(this,ds,{}),at(this,us),at(this,cs),at(this,hs),at(this,ms),at(this,Br,""),at(this,ps,e=>{var i;let a=pg(this.nativeEl),r=(i=this.metadata)!=null?i:{};this.metadata={...a,...r},a?.["com.mux.video.branding"]==="mux-free-plan"&&(Tt(this,Br,"default"),this.updateLogo())}),at(this,vs),Tt(this,ls,_u())}static get NAME(){return mh}static get VERSION(){return hh}static get observedAttributes(){var e;return[...xg,...(e=Hn.observedAttributes)!=null?e:[]]}static getLogoHTML(e){return!e||e==="false"?"":e==="default"?Og:`<img part="logo" src="${e}" />`}static getTemplateHTML(e={}){var i;return`
      ${Hn.getTemplateHTML(e)}
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
        ${this.getLogoHTML((i=e[E.LOGO])!=null?i:"")}
      </slot>
    `}get preferCmcd(){var e;return(e=this.getAttribute(E.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?go.includes(e)?this.setAttribute(E.PREFER_CMCD,e):console.warn(`Invalid value for preferCmcd. Must be one of ${go.join()}`):this.removeAttribute(E.PREFER_CMCD))}get playerInitTime(){return this.hasAttribute(E.PLAYER_INIT_TIME)?+this.getAttribute(E.PLAYER_INIT_TIME):be(this,ls)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(E.PLAYER_INIT_TIME):this.setAttribute(E.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=be(this,hs))!=null?e:mh}set playerSoftwareName(e){Tt(this,hs,e)}get playerSoftwareVersion(){var e;return(e=be(this,cs))!=null?e:hh}set playerSoftwareVersion(e){Tt(this,cs,e)}get _hls(){var e;return(e=be(this,st,Zi))==null?void 0:e.engine}get mux(){var e;return(e=this.nativeEl)==null?void 0:e.mux}get error(){var e;return(e=up(this.nativeEl))!=null?e:null}get errorTranslator(){return be(this,ms)}set errorTranslator(e){Tt(this,ms,e)}get src(){return this.getAttribute("src")}set src(e){e!==this.src&&(e==null?this.removeAttribute("src"):this.setAttribute("src",e))}get type(){var e;return(e=this.getAttribute(E.TYPE))!=null?e:void 0}set type(e){e!==this.type&&(e?this.setAttribute(E.TYPE,e):this.removeAttribute(E.TYPE))}get preload(){let e=this.getAttribute("preload");return e===""?"auto":["none","metadata","auto"].includes(e)?e:super.preload}set preload(e){e!=this.getAttribute("preload")&&(["","none","metadata","auto"].includes(e)?this.setAttribute("preload",e):this.removeAttribute("preload"))}get debug(){return this.getAttribute(E.DEBUG)!=null}set debug(e){e!==this.debug&&(e?this.setAttribute(E.DEBUG,""):this.removeAttribute(E.DEBUG))}get disableTracking(){return this.hasAttribute(E.DISABLE_TRACKING)}set disableTracking(e){e!==this.disableTracking&&this.toggleAttribute(E.DISABLE_TRACKING,!!e)}get disableCookies(){return this.hasAttribute(E.DISABLE_COOKIES)}set disableCookies(e){e!==this.disableCookies&&(e?this.setAttribute(E.DISABLE_COOKIES,""):this.removeAttribute(E.DISABLE_COOKIES))}get disablePseudoEnded(){return this.hasAttribute(E.DISABLE_PSEUDO_ENDED)}set disablePseudoEnded(e){e!==this.disablePseudoEnded&&(e?this.setAttribute(E.DISABLE_PSEUDO_ENDED,""):this.removeAttribute(E.DISABLE_PSEUDO_ENDED))}get startTime(){let e=this.getAttribute(E.START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set startTime(e){e!==this.startTime&&(e==null?this.removeAttribute(E.START_TIME):this.setAttribute(E.START_TIME,`${e}`))}get initialBandwidthEstimateKbps(){let e=this.getAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set initialBandwidthEstimateKbps(e){e!==this.initialBandwidthEstimateKbps&&(e==null?this.removeAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS):this.setAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS,`${e}`))}get initialEstimateSegments(){let e=this.getAttribute(E.INITIAL_ESTIMATE_SEGMENTS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set initialEstimateSegments(e){e!==this.initialEstimateSegments&&(e==null?this.removeAttribute(E.INITIAL_ESTIMATE_SEGMENTS):this.setAttribute(E.INITIAL_ESTIMATE_SEGMENTS,`${e}`))}get minPreloadSegments(){let e=this.getAttribute(E.MIN_PRELOAD_SEGMENTS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set minPreloadSegments(e){e!==this.minPreloadSegments&&(e==null?this.removeAttribute(E.MIN_PRELOAD_SEGMENTS):this.setAttribute(E.MIN_PRELOAD_SEGMENTS,`${e}`))}get playbackId(){var e;return this.hasAttribute(E.PLAYBACK_ID)?this.getAttribute(E.PLAYBACK_ID):(e=bu(this.src))!=null?e:void 0}set playbackId(e){e!==this.playbackId&&(e?this.setAttribute(E.PLAYBACK_ID,e):this.removeAttribute(E.PLAYBACK_ID))}get maxResolution(){var e;return(e=this.getAttribute(E.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(E.MAX_RESOLUTION,e):this.removeAttribute(E.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(E.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(E.MIN_RESOLUTION,e):this.removeAttribute(E.MIN_RESOLUTION))}get maxAutoResolution(){var e;return(e=this.getAttribute(E.MAX_AUTO_RESOLUTION))!=null?e:void 0}set maxAutoResolution(e){e==null?this.removeAttribute(E.MAX_AUTO_RESOLUTION):this.setAttribute(E.MAX_AUTO_RESOLUTION,e)}get renditionOrder(){var e;return(e=this.getAttribute(E.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(E.RENDITION_ORDER,e):this.removeAttribute(E.RENDITION_ORDER))}get programStartTime(){let e=this.getAttribute(E.PROGRAM_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programStartTime(e){e==null?this.removeAttribute(E.PROGRAM_START_TIME):this.setAttribute(E.PROGRAM_START_TIME,`${e}`)}get programEndTime(){let e=this.getAttribute(E.PROGRAM_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programEndTime(e){e==null?this.removeAttribute(E.PROGRAM_END_TIME):this.setAttribute(E.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){let e=this.getAttribute(E.ASSET_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetStartTime(e){e==null?this.removeAttribute(E.ASSET_START_TIME):this.setAttribute(E.ASSET_START_TIME,`${e}`)}get assetEndTime(){let e=this.getAttribute(E.ASSET_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetEndTime(e){e==null?this.removeAttribute(E.ASSET_END_TIME):this.setAttribute(E.ASSET_END_TIME,`${e}`)}get customDomain(){var e;return(e=this.getAttribute(E.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(E.CUSTOM_DOMAIN,e):this.removeAttribute(E.CUSTOM_DOMAIN))}get capRenditionToPlayerSize(){var e;return((e=this._hlsConfig)==null?void 0:e.capLevelToPlayerSize)!=null?this._hlsConfig.capLevelToPlayerSize:be(this,vs)}set capRenditionToPlayerSize(e){Tt(this,vs,e)}get drmToken(){var e;return(e=this.getAttribute(E.DRM_TOKEN))!=null?e:void 0}set drmToken(e){e!==this.drmToken&&(e?this.setAttribute(E.DRM_TOKEN,e):this.removeAttribute(E.DRM_TOKEN))}get playbackToken(){var e,i,a,r;if(this.hasAttribute(E.PLAYBACK_TOKEN))return(e=this.getAttribute(E.PLAYBACK_TOKEN))!=null?e:void 0;if(this.hasAttribute(E.PLAYBACK_ID)){let[,s]=hu((i=this.playbackId)!=null?i:"");return(a=new URLSearchParams(s).get("token"))!=null?a:void 0}if(this.src)return(r=new URLSearchParams(this.src).get("token"))!=null?r:void 0}set playbackToken(e){e!==this.playbackToken&&(e?this.setAttribute(E.PLAYBACK_TOKEN,e):this.removeAttribute(E.PLAYBACK_TOKEN))}get tokens(){let e=this.getAttribute(E.PLAYBACK_TOKEN),i=this.getAttribute(E.DRM_TOKEN);return{...be(this,ds),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{}}}set tokens(e){Tt(this,ds,e??{})}get ended(){return mp(this.nativeEl,this._hls)}get envKey(){var e;return(e=this.getAttribute(E.ENV_KEY))!=null?e:void 0}set envKey(e){e!==this.envKey&&(e?this.setAttribute(E.ENV_KEY,e):this.removeAttribute(E.ENV_KEY))}get beaconCollectionDomain(){var e;return(e=this.getAttribute(E.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(E.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(E.BEACON_COLLECTION_DOMAIN))}get streamType(){var e;return(e=this.getAttribute(E.STREAM_TYPE))!=null?e:Jl(this.nativeEl)}set streamType(e){e!==this.streamType&&(e?this.setAttribute(E.STREAM_TYPE,e):this.removeAttribute(E.STREAM_TYPE))}get targetLiveWindow(){return this.hasAttribute(E.TARGET_LIVE_WINDOW)?+this.getAttribute(E.TARGET_LIVE_WINDOW):vg(this.nativeEl)}set targetLiveWindow(e){e!=this.targetLiveWindow&&(e==null?this.removeAttribute(E.TARGET_LIVE_WINDOW):this.setAttribute(E.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e,i;if(this.hasAttribute(E.LIVE_EDGE_OFFSET)){let{liveEdgeOffset:a}=this,r=(e=this.nativeEl.seekable.end(0))!=null?e:0,s=(i=this.nativeEl.seekable.start(0))!=null?i:0;return Math.max(s,r-a)}return fg(this.nativeEl)}get liveEdgeOffset(){if(this.hasAttribute(E.LIVE_EDGE_OFFSET))return+this.getAttribute(E.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){e!=this.liveEdgeOffset&&(e==null?this.removeAttribute(E.LIVE_EDGE_OFFSET):this.setAttribute(E.LIVE_EDGE_OFFSET,`${+e}`))}get seekable(){return gu(this.nativeEl)}async addCuePoints(e){return ap(this.nativeEl,e)}get activeCuePoint(){return rp(this.nativeEl)}get cuePoints(){return xb(this.nativeEl)}async addChapters(e){return sp(this.nativeEl,e)}get activeChapter(){return op(this.nativeEl)}get chapters(){return Pb(this.nativeEl)}getStartDate(){return Ub(this.nativeEl,this._hls)}get currentPdt(){return Hb(this.nativeEl,this._hls)}get preferPlayback(){let e=this.getAttribute(E.PREFER_PLAYBACK);if(e===zt.MSE||e===zt.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===zt.MSE||e===zt.NATIVE?this.setAttribute(E.PREFER_PLAYBACK,e):this.removeAttribute(E.PREFER_PLAYBACK))}get metadata(){return{...this.getAttributeNames().filter(e=>e.startsWith("metadata-")&&![E.METADATA_URL].includes(e)).reduce((e,i)=>{let a=this.getAttribute(i);return a!=null&&(e[i.replace(/^metadata-/,"").replace(/-/g,"_")]=a),e},{}),...be(this,Hr)}}set metadata(e){Tt(this,Hr,e??{}),this.mux&&this.mux.emit("hb",be(this,Hr))}get _hlsConfig(){return be(this,us)}set _hlsConfig(e){Tt(this,us,e)}get logo(){var e;return(e=this.getAttribute(E.LOGO))!=null?e:be(this,Br)}set logo(e){e?this.setAttribute(E.LOGO,e):this.removeAttribute(E.LOGO)}load(){pp(this,this.nativeEl,be(this,st,Zi))}unload(){vp(this.nativeEl,be(this,st,Zi),this)}attributeChangedCallback(e,i,a){var r,s;switch(Hn.observedAttributes.includes(e)&&!["src","autoplay","preload"].includes(e)&&super.attributeChangedCallback(e,i,a),e){case E.PLAYER_SOFTWARE_NAME:this.playerSoftwareName=a??void 0;break;case E.PLAYER_SOFTWARE_VERSION:this.playerSoftwareVersion=a??void 0;break;case"src":{let o=!!i,l=!!a;!o&&l?Wn(this,st,Wr).call(this):o&&!l?this.unload():o&&l&&(this.unload(),Wn(this,st,Wr).call(this));break}case"autoplay":if(a===i)break;(r=be(this,st,Zi))==null||r.setAutoplay(this.autoplay);break;case"preload":if(a===i)break;(s=be(this,st,Zi))==null||s.setPreload(a);break;case E.PLAYBACK_ID:case E.CUSTOM_DOMAIN:case E.MAX_RESOLUTION:case E.MIN_RESOLUTION:case E.RENDITION_ORDER:case E.PROGRAM_START_TIME:case E.PROGRAM_END_TIME:case E.ASSET_START_TIME:case E.ASSET_END_TIME:case E.PLAYBACK_TOKEN:this.src=Xl(this);break;case E.DEBUG:{let o=this.debug;this.mux&&console.info("Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."),this._hls&&(this._hls.config.debug=o);break}case E.METADATA_URL:a&&fetch(a).then(o=>o.json()).then(o=>this.metadata=o).catch(()=>console.error(`Unable to load or parse metadata JSON from metadata-url ${a}!`));break;case E.STREAM_TYPE:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}));break;case E.TARGET_LIVE_WINDOW:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0,detail:this.targetLiveWindow}));break;case E.LOGO:(a==null||a!==i)&&this.updateLogo();break;case E.DISABLE_TRACKING:{if(a==null||a!==i){let o=this.currentTime,l=this.paused;this.unload(),Wn(this,st,Wr).call(this).then(()=>{this.currentTime=o,l||this.play()})}break}case E.DISABLE_COOKIES:{(a==null||a!==i)&&this.disableCookies&&document.cookie.split(";").forEach(o=>{o.trim().startsWith("muxData")&&(document.cookie=o.replace(/^ +/,"").replace(/=.*/,"=;expires="+new Date().toUTCString()+";path=/"))});break}case E.CAP_RENDITION_TO_PLAYER_SIZE:(a==null||a!==i)&&(this.capRenditionToPlayerSize=a!=null?!0:void 0)}}updateLogo(){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelector('slot[name="logo"]');if(!e)return;let i=this.constructor.getLogoHTML(be(this,Br)||this.logo);e.innerHTML=i}connectedCallback(){var e,i;(e=super.connectedCallback)==null||e.call(this),(i=this.nativeEl)==null||i.addEventListener("muxmetadata",be(this,ps)),this.nativeEl&&this.src&&!be(this,st,Zi)&&Wn(this,st,Wr).call(this)}disconnectedCallback(){var e,i;(e=this.nativeEl)==null||e.removeEventListener("muxmetadata",be(this,ps)),this.unload(),(i=super.disconnectedCallback)==null||i.call(this)}handleEvent(e){e.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(e.type,{composed:!0,detail:e.detail}))}};Ur=new WeakMap,ls=new WeakMap,Hr=new WeakMap,ds=new WeakMap,us=new WeakMap,cs=new WeakMap,hs=new WeakMap,ms=new WeakMap,Br=new WeakMap,ps=new WeakMap,st=new WeakSet,Zi=n(function(){return Eg(this.nativeEl)},"A"),vs=new WeakMap,Wr=n(async function(){be(this,Ur)||(await Tt(this,Ur,Promise.resolve()),Tt(this,Ur,null),this.load())},"g$2");const Bi=new WeakMap;class wl extends Error{static{n(this,"InvalidStateError")}}class Pg extends Error{static{n(this,"NotSupportedError")}}const $g=["application/x-mpegURL","application/vnd.apple.mpegurl","audio/mpegurl"],Ug=globalThis.WeakRef?class extends Set{add(t){super.add(new WeakRef(t))}forEach(t){super.forEach(e=>{const i=e.deref();i&&t(i)})}}:Set;function Hg(t){globalThis.chrome?.cast?.isAvailable?globalThis.cast?.framework?t():customElements.whenDefined("google-cast-button").then(t):globalThis.__onGCastApiAvailable=()=>{customElements.whenDefined("google-cast-button").then(t)}}n(Hg,"onCastApiAvailable");function Bg(){return globalThis.chrome}n(Bg,"requiresCastFramework");function Wg(){const t="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";if(globalThis.chrome?.cast||document.querySelector(`script[src="${t}"]`))return;const e=document.createElement("script");e.src=t,document.head.append(e)}n(Wg,"loadCastFramework");function $i(){return globalThis.cast?.framework?.CastContext.getInstance()}n($i,"castContext");function Au(){return $i()?.getCurrentSession()}n(Au,"currentSession");function ku(){return Au()?.getSessionObj().media[0]}n(ku,"currentMedia");function Fg(t){return new Promise((e,i)=>{ku().editTracksInfo(t,e,i)})}n(Fg,"editTracksInfo");function Kg(t){return new Promise((e,i)=>{ku().getStatus(t,e,i)})}n(Kg,"getMediaStatus");function ph(t){return $i().setOptions({...Tp(),...t})}n(ph,"setCastOptions");function Tp(){return{receiverApplicationId:"CC1AD845",autoJoinPolicy:"origin_scoped",androidReceiverCompatible:!1,language:"en-US",resumeSavedSession:!0}}n(Tp,"getDefaultCastOptions");function vh(t){if(!t)return;const e=/\.([a-zA-Z0-9]+)(?:\?.*)?$/,i=t.match(e);return i?i[1]:null}n(vh,"getFormat");function Vg(t){for(const e of t.split(`
`)){const i=e.trim();if(i.startsWith("#EXT-X-MEDIA")&&/TYPE=AUDIO/i.test(i)){const a=i.match(/URI="([^"]+)"/i);if(a)return a[1]}}}n(Vg,"parseAudioRenditionUrl");function qg(t){const e=t.split(`
`),i=[];for(let a=0;a<e.length;a++)if(e[a].trim().startsWith("#EXT-X-STREAM-INF")){const s=e[a+1]?e[a+1].trim():"";s&&!s.startsWith("#")&&i.push(s)}return i}n(qg,"parsePlaylistUrls");function fh(t){return t.split(`
`).find(a=>!a.trim().startsWith("#")&&a.trim()!=="")?.trim()}n(fh,"parseSegment");async function Yg(t){if(!t)return!1;if(/\.m3u8?(\?.*)?$/i.test(t))return!0;if(t.startsWith("blob:"))return!1;try{const i=(await fetch(t,{method:"HEAD"})).headers.get("Content-Type");return $g.some(a=>i===a)}catch(e){return console.error("Error while trying to get the Content-Type of the manifest",e),!1}}n(Yg,"isHls");async function Gg(t){if(!t||t.startsWith("blob:"))return{videoFormat:void 0,audioFormat:void 0};try{const e=await(await fetch(t)).text();let i=e;const a=qg(e);if(a.length>0){const d=new URL(a[0],t).toString();i=await(await fetch(d)).text()}const r=fh(i),s=vh(r),o=Vg(e);let l=s;if(o)try{const d=new URL(o,t).toString(),c=await(await fetch(d)).text(),p=fh(c);l=vh(p)??s}catch(d){console.error("Error while trying to parse the audio rendition playlist",d)}return{videoFormat:s,audioFormat:l}}catch(e){return console.error("Error while trying to parse the manifest playlist",e),{videoFormat:void 0,audioFormat:void 0}}}n(Gg,"getPlaylistSegmentFormat");const fs=new Ug,ii=new WeakSet;let ke;Hg(()=>{if(!globalThis.chrome?.cast?.isAvailable){console.debug("chrome.cast.isAvailable",globalThis.chrome?.cast?.isAvailable);return}ke||(ke=cast.framework,$i().addEventListener(ke.CastContextEventType.CAST_STATE_CHANGED,t=>{fs.forEach(e=>Bi.get(e).onCastStateChanged?.(t))}),$i().addEventListener(ke.CastContextEventType.SESSION_STATE_CHANGED,t=>{fs.forEach(e=>Bi.get(e).onSessionStateChanged?.(t))}),fs.forEach(t=>Bi.get(t).init?.()))});let Eh=0;class zg extends EventTarget{static{n(this,"RemotePlayback")}#t;#r;#i;#a;#e="disconnected";#n=!1;#o=new Set;#h=new WeakMap;#l=n(()=>this.#c(),"#onTextTrackChange");constructor(e){super(),this.#t=e,fs.add(this),Bi.set(this,{init:n(()=>this.#u(),"init"),onCastStateChanged:n(()=>this.#d(),"onCastStateChanged"),onSessionStateChanged:n(()=>this.#v(),"onSessionStateChanged"),getCastPlayer:n(()=>this.#s,"getCastPlayer")}),this.#u()}destroy(){this.#t?.textTracks?.removeEventListener("change",this.#l),this.#a&&this.#i?.controller&&Object.entries(this.#a).forEach(([e,i])=>{this.#i.controller.removeEventListener(e,i)}),this.#t&&ii.delete(this.#t),this.#r=!1}get#s(){if(ii.has(this.#t))return this.#i}get state(){return this.#e}async watchAvailability(e){if(this.#t.disableRemotePlayback)throw new wl("disableRemotePlayback attribute is present.");return this.#h.set(e,++Eh),this.#o.add(e),queueMicrotask(()=>e(this.#p())),Eh}async cancelWatchAvailability(e){if(this.#t.disableRemotePlayback)throw new wl("disableRemotePlayback attribute is present.");e?this.#o.delete(e):this.#o.clear()}async prompt(){if(this.#t.disableRemotePlayback)throw new wl("disableRemotePlayback attribute is present.");if(!globalThis.chrome?.cast?.isAvailable)throw new Pg("The RemotePlayback API is disabled on this platform.");const e=ii.has(this.#t);ii.add(this.#t),ph(this.#t.castOptions),Object.entries(this.#a).forEach(([i,a])=>{this.#i.controller.addEventListener(i,a)});try{await $i().requestSession()}catch(i){if(e||ii.delete(this.#t),i==="cancel")return;throw new Error(i)}Bi.get(this.#t)?.loadOnPrompt?.()}#m(){ii.has(this.#t)&&(Object.entries(this.#a).forEach(([e,i])=>{this.#i.controller.removeEventListener(e,i)}),ii.delete(this.#t),this.#t.muted=this.#i.isMuted,this.#t.currentTime=this.#i.savedPlayerState.currentTime,this.#i.savedPlayerState.isPaused===!1&&this.#t.play())}#p(){const e=$i()?.getCastState();return e&&e!=="NO_DEVICES_AVAILABLE"}#d(){const e=$i().getCastState();if(ii.has(this.#t)&&e==="CONNECTING"&&(this.#e="connecting",this.dispatchEvent(new Event("connecting"))),!this.#n&&e?.includes("CONNECT")){this.#n=!0;for(let i of this.#o)i(!0)}else if(this.#n&&(!e||e==="NO_DEVICES_AVAILABLE")){this.#n=!1;for(let i of this.#o)i(!1)}}async#v(){const{SESSION_RESUMED:e}=ke.SessionState;if($i().getSessionState()===e&&this.#t.castSrc===ku()?.media.contentId){ii.add(this.#t),Object.entries(this.#a).forEach(([i,a])=>{this.#i.controller.addEventListener(i,a)});try{await Kg(new chrome.cast.media.GetStatusRequest)}catch(i){console.error(i)}this.#a[ke.RemotePlayerEventType.IS_PAUSED_CHANGED](),this.#a[ke.RemotePlayerEventType.PLAYER_STATE_CHANGED]()}}#u(){!ke||this.#r||(this.#r=!0,ph(this.#t.castOptions),this.#t.textTracks.addEventListener("change",this.#l),this.#d(),this.#i=new ke.RemotePlayer,new ke.RemotePlayerController(this.#i),this.#a={[ke.RemotePlayerEventType.IS_CONNECTED_CHANGED]:({value:e})=>{e===!0?(this.#e="connected",this.dispatchEvent(new Event("connect"))):(this.#m(),this.#e="disconnected",this.dispatchEvent(new Event("disconnect")))},[ke.RemotePlayerEventType.DURATION_CHANGED]:()=>{this.#t.dispatchEvent(new Event("durationchange"))},[ke.RemotePlayerEventType.VOLUME_LEVEL_CHANGED]:()=>{this.#t.dispatchEvent(new Event("volumechange"))},[ke.RemotePlayerEventType.IS_MUTED_CHANGED]:()=>{this.#t.dispatchEvent(new Event("volumechange"))},[ke.RemotePlayerEventType.CURRENT_TIME_CHANGED]:()=>{this.#s?.isMediaLoaded&&this.#t.dispatchEvent(new Event("timeupdate"))},[ke.RemotePlayerEventType.VIDEO_INFO_CHANGED]:()=>{this.#t.dispatchEvent(new Event("resize"))},[ke.RemotePlayerEventType.IS_PAUSED_CHANGED]:()=>{this.#t.dispatchEvent(new Event(this.paused?"pause":"play"))},[ke.RemotePlayerEventType.PLAYER_STATE_CHANGED]:()=>{this.#s?.playerState!==chrome.cast.media.PlayerState.PAUSED&&this.#t.dispatchEvent(new Event({[chrome.cast.media.PlayerState.PLAYING]:"playing",[chrome.cast.media.PlayerState.BUFFERING]:"waiting",[chrome.cast.media.PlayerState.IDLE]:"emptied"}[this.#s?.playerState]))},[ke.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED]:async()=>{this.#s?.isMediaLoaded&&(await Promise.resolve(),this.#f())}})}#f(){this.#c()}async#c(){if(!this.#s)return;const i=(this.#i.mediaInfo?.tracks??[]).filter(({type:v})=>v===chrome.cast.media.TrackType.TEXT),a=[...this.#t.textTracks].filter(({kind:v})=>v==="subtitles"||v==="captions"),r=i.map(({language:v,name:m,trackId:u})=>{const{mode:f}=a.find(_=>_.language===v&&_.label===m)??{};return f?{mode:f,trackId:u}:!1}).filter(Boolean),o=r.filter(({mode:v})=>v!=="showing").map(({trackId:v})=>v),l=r.find(({mode:v})=>v==="showing"),d=Au()?.getSessionObj().media[0]?.activeTrackIds??[];let c=d;if(d.length&&(c=c.filter(v=>!o.includes(v))),l?.trackId&&(c=[...c,l.trackId]),c=[...new Set(c)],!n((v,m)=>v.length===m.length&&v.every(u=>m.includes(u)),"arrayEquals")(d,c))try{const v=new chrome.cast.media.EditTracksInfoRequest(c);await Fg(v)}catch(v){console.error(v)}}}const Qg=n(t=>class extends t{static{n(this,"CastableMedia")}static observedAttributes=[...t.observedAttributes??[],"cast-src","cast-content-type","cast-stream-type","cast-receiver"];#t={paused:!1};#r=Tp();#i;#a;get remote(){return this.#a?this.#a:Bg()?this.isConnected?(this.disableRemotePlayback||Wg(),Bi.set(this,{loadOnPrompt:n(()=>this.#n(),"loadOnPrompt")}),this.#a=new zg(this)):void 0:super.remote}get#e(){return Bi.get(this.#a)?.getCastPlayer?.()}disconnectedCallback(){this.#a?.destroy(),this.#a=null,Bi.delete(this),super.disconnectedCallback?.()}attributeChangedCallback(i,a,r){if(super.attributeChangedCallback(i,a,r),i==="cast-receiver"&&r){this.#r.receiverApplicationId=r;return}if(this.#e)switch(i){case"cast-stream-type":case"cast-src":this.load();break}}async#n(){this.#t.paused=super.paused,super.pause(),this.muted=super.muted;try{await this.load()}catch(i){console.error(i)}}async load(){if(!this.#e)return super.load();const i=new chrome.cast.media.MediaInfo(this.castSrc,this.castContentType);i.customData=this.castCustomData;const a=[...this.querySelectorAll("track")].filter(({kind:d,src:c})=>c&&(d==="subtitles"||d==="captions")),r=[];let s=0;if(a.length&&(i.tracks=a.map(d=>{const c=++s;r.length===0&&d.track.mode==="showing"&&r.push(c);const p=new chrome.cast.media.Track(c,chrome.cast.media.TrackType.TEXT);return p.trackContentId=d.src,p.trackContentType="text/vtt",p.subtype=d.kind==="captions"?chrome.cast.media.TextTrackType.CAPTIONS:chrome.cast.media.TextTrackType.SUBTITLES,p.name=d.label,p.language=d.srclang,p})),this.castStreamType==="live"?i.streamType=chrome.cast.media.StreamType.LIVE:i.streamType=chrome.cast.media.StreamType.BUFFERED,i.metadata=new chrome.cast.media.GenericMediaMetadata,i.metadata.title=this.title,i.metadata.images=[{url:this.poster}],await Yg(this.castSrc)){i.contentType||(i.contentType="application/x-mpegURL");const{videoFormat:d,audioFormat:c}=await Gg(this.castSrc);d?.includes("m4s")||d?.includes("mp4")||d?.includes("m4a")?(i.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.FMP4,i.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.FMP4):c?.includes("aac")?(i.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.AAC,i.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.MPEG2_TS):(d?.includes("ts")||c?.includes("ts"))&&(i.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.TS,i.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.MPEG2_TS)}const l=new chrome.cast.media.LoadRequest(i);l.currentTime=super.currentTime??0,l.autoplay=!this.#t.paused,l.activeTrackIds=r,await Au()?.loadMedia(l),this.dispatchEvent(new Event("volumechange"))}play(){if(this.#e){this.#e.isPaused&&this.#e.controller?.playOrPause();return}return super.play()}pause(){if(this.#e){this.#e.isPaused||this.#e.controller?.playOrPause();return}super.pause()}get castOptions(){return this.#r}get castReceiver(){return this.getAttribute("cast-receiver")??void 0}set castReceiver(i){this.castReceiver!=i&&this.setAttribute("cast-receiver",`${i}`)}get castSrc(){const i=this.currentSrc,a=i?.startsWith("blob:")?void 0:i;return this.getAttribute("cast-src")??this.querySelector("source")?.src??a??this.getAttribute("src")??void 0}set castSrc(i){this.castSrc!=i&&this.setAttribute("cast-src",`${i}`)}get castContentType(){return this.getAttribute("cast-content-type")??void 0}set castContentType(i){this.setAttribute("cast-content-type",`${i}`)}get castStreamType(){return this.getAttribute("cast-stream-type")??this.streamType??void 0}set castStreamType(i){this.setAttribute("cast-stream-type",`${i}`)}get castCustomData(){return this.#i}set castCustomData(i){const a=typeof i;if(!["object","undefined"].includes(a)){console.error(`castCustomData must be nullish or an object but value was of type ${a}`);return}this.#i=i}get readyState(){if(this.#e)switch(this.#e.playerState){case chrome.cast.media.PlayerState.IDLE:return 0;case chrome.cast.media.PlayerState.BUFFERING:return 2;default:return 3}return super.readyState}get paused(){return this.#e?this.#e.isPaused:super.paused}get muted(){return this.#e?this.#e?.isMuted:super.muted}set muted(i){if(this.#e){(i&&!this.#e.isMuted||!i&&this.#e.isMuted)&&this.#e.controller?.muteOrUnmute();return}super.muted=i}get volume(){return this.#e?this.#e?.volumeLevel??1:super.volume}set volume(i){if(this.#e){this.#e.volumeLevel=+i,this.#e.controller?.setVolumeLevel();return}super.volume=i}get duration(){return this.#e&&this.#e?.isMediaLoaded?this.#e?.duration??NaN:super.duration}get currentTime(){return this.#e&&this.#e?.isMediaLoaded?this.#e?.currentTime??0:super.currentTime}set currentTime(i){if(this.#e){this.#e.currentTime=i,this.#e.controller?.seek();return}super.currentTime=i}},"CastableMediaMixin");var Ap=n(t=>{throw TypeError(t)},"f$2"),kp=n((t,e,i)=>e.has(t)||Ap("Cannot "+i),"g$1"),jg=n((t,e,i)=>(kp(t,e,"read from private field"),i?i.call(t):e.get(t)),"u$1"),Zg=n((t,e,i)=>e.has(t)?Ap("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"m$1"),Xg=n((t,e,i,a)=>(kp(t,e,"write to private field"),e.set(t,i),i),"d"),Sp=class{static{n(this,"s")}addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if(typeof DocumentFragment>"u"){class t extends Sp{static{n(this,"e")}}globalThis.DocumentFragment=t}var Jg=class extends Sp{static{n(this,"n")}},e0={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(Jg)}},t0={customElements:e0},i0=typeof window>"u"||typeof globalThis.customElements>"u",Il=i0?t0:globalThis,Es,_h=class extends Qg(Kf(Ng)){static{n(this,"i")}constructor(){super(...arguments),Zg(this,Es)}get autoplay(){let t=this.getAttribute("autoplay");return t===null?!1:t===""?!0:t}set autoplay(t){let e=this.autoplay;t!==e&&(t?this.setAttribute("autoplay",typeof t=="string"?t:""):this.removeAttribute("autoplay"))}get muxCastCustomData(){return{mux:{playbackId:this.playbackId,minResolution:this.minResolution,maxResolution:this.maxResolution,renditionOrder:this.renditionOrder,customDomain:this.customDomain,tokens:{drm:this.drmToken},envKey:this.envKey,metadata:this.metadata,disableCookies:this.disableCookies,disableTracking:this.disableTracking,beaconCollectionDomain:this.beaconCollectionDomain,startTime:this.startTime,preferCmcd:this.preferCmcd}}}get castCustomData(){var t;return(t=jg(this,Es))!=null?t:this.muxCastCustomData}set castCustomData(t){Xg(this,Es,t)}};Es=new WeakMap;Il.customElements.get("mux-video")||(Il.customElements.define("mux-video",_h),Il.MuxVideoElement=_h);const C={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},j={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},wp={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},Ip=Object.entries(wp),h=Ip.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),a0={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Jt=Ip.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...a0});Object.entries(Jt).reduce((t,[e,i])=>{const a=h[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const r0=Object.entries(h).reduce((t,[e,i])=>{const a=Jt[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),Zt={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},ir={DISABLED:"disabled",SHOWING:"showing"},Rl={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},Je={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},ui={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},n0={FULLSCREEN:"fullscreen"};function s0(t){return t?.map(l0).join(" ")}n(s0,"stringifyRenditionList");function o0(t){return t?.split(/\s+/).map(d0)}n(o0,"parseRenditionList");function l0(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}n(l0,"stringifyRendition");function d0(t){if(t){const[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}n(d0,"parseRendition");function u0(t){return t?.map(h0).join(" ")}n(u0,"stringifyAudioTrackList");function c0(t){return t?.split(/\s+/).map(m0)}n(c0,"parseAudioTrackList");function h0(t){if(t){const{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(s=>s!=null).join(":")}}n(h0,"stringifyAudioTrack");function m0(t){if(t){const[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}n(m0,"parseAudioTrack");function p0(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}n(p0,"camelCase");function Su(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}n(Su,"isValidNumber");function Rp(t){return typeof t!="string"?!1:!isNaN(t)&&!isNaN(parseFloat(t))}n(Rp,"isNumericString");const Lp=n(t=>new Promise(e=>setTimeout(e,t)),"delay"),v0={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."};var bh;const Ll={en:v0};let td=((bh=globalThis.navigator)==null?void 0:bh.language)||"en";const f0=n(t=>{td=t},"setLanguage"),E0=n(t=>{var e,i,a;const[r]=td.split("-");return((e=Ll[td])==null?void 0:e[t])||((i=Ll[r])==null?void 0:i[t])||((a=Ll.en)==null?void 0:a[t])||t},"resolveTranslation"),L=n((t,e={})=>E0(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),"t"),gh=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],_0=n((t,e)=>{const i=L(t===1?gh[e].singular:gh[e].plural);return`${t} ${i}`},"toTimeUnitPhrase"),un=n(t=>{if(!Su(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0),s=[a.getHours(),a.getMinutes(),a.getSeconds()].map((o,l)=>o&&_0(o,l)).filter(o=>o).join(", ");return i?L("{time} remaining",{time:s}):s},"formatAsTimePhrase");function Wi(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),s=Math.floor(t/3600);const o=Math.floor(e/60%60),l=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(s=r=a="0"),s=s>0||l>0?s+":":"",r=((s||o>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+s+r+a}n(Wi,"formatTime");let Cp=class{static{n(this,"EventTarget")}addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}};class Dp extends Cp{static{n(this,"Node")}}let yh=class extends Dp{static{n(this,"Element")}constructor(){super(...arguments),this.role=null}};class b0{static{n(this,"ResizeObserver")}observe(){}unobserve(){}disconnect(){}}const Mp={createElement:n(function(){return new Sn.HTMLElement},"createElement"),createElementNS:n(function(){return new Sn.HTMLElement},"createElementNS"),addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},Sn={ResizeObserver:b0,document:Mp,Node:Dp,Element:yh,HTMLElement:class extends yh{static{n(this,"HTMLElement")}constructor(){super(...arguments),this.innerHTML=""}get content(){return new Sn.DocumentFragment}},DocumentFragment:class extends Cp{static{n(this,"DocumentFragment")}},customElements:{get:n(function(){},"get"),define:n(function(){},"define"),whenDefined:n(function(){},"whenDefined")},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:n(function(){},"CustomEvent"),getComputedStyle:n(function(){},"getComputedStyle"),navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:class{static{n(this,"DOMParser")}parseFromString(e,i){return{body:{textContent:e}}}}},Op="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",xp=Object.keys(Sn).every(t=>t in globalThis),b=Op&&!xp?Sn:globalThis,Te=Op&&!xp?Mp:globalThis.document,Th=new WeakMap,wu=n(t=>{let e=Th.get(t);return e||Th.set(t,e=new Set),e},"getCallbacks"),Np=new b.ResizeObserver(t=>{for(const e of t)for(const i of wu(e.target))i(e)});function cr(t,e){wu(t).add(e),Np.observe(t)}n(cr,"observeResize");function hr(t,e){const i=wu(t);i.delete(e),i.size||Np.unobserve(t)}n(hr,"unobserveResize");function it(t){const e={};for(const i of t)e[i.name]=i.value;return e}n(it,"namedNodeMapToObject");function Ge(t){var e;return(e=id(t))!=null?e:Er(t,"media-controller")}n(Ge,"getMediaController");function id(t){var e;const{MEDIA_CONTROLLER:i}=j,a=t.getAttribute(i);if(a)return(e=el(t))==null?void 0:e.getElementById(a)}n(id,"getAttributeMediaController");const Pp=n((t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},"updateIconText"),g0=n((t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},"getAllSlotted"),$p=n((t,e)=>g0(t,e)[0],"getSlotted"),bi=n((t,e)=>!t||!e?!1:t?.contains(e)?!0:bi(t,e.getRootNode().host),"containsComposedNode"),Er=n((t,e)=>{if(!t)return null;const i=t.closest(e);return i||Er(t.getRootNode().host,e)},"closestComposedNode");function Iu(t=document){var e;const i=t?.activeElement;return i?(e=Iu(i.shadowRoot))!=null?e:i:null}n(Iu,"getActiveElement");function el(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}n(el,"getDocumentOrShadowRoot");function Up(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){const s=getComputedStyle(r);if(i&&s.opacity==="0"||a&&s.visibility==="hidden"||s.display==="none")return!1;r=r.parentElement,e--}return!0}n(Up,"isElementVisible");function y0(t,e,i,a){const r=a.x-i.x,s=a.y-i.y,o=r*r+s*s;if(o===0)return 0;const l=((t-i.x)*r+(e-i.y)*s)/o;return Math.max(0,Math.min(1,l))}n(y0,"getPointProgressOnLine");function Se(t,e){const i=T0(t,a=>a===e);return i||Ru(t,e)}n(Se,"getOrInsertCSSRule");function T0(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let s;try{s=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(const o of s??[])if(e(o.selectorText))return o}}n(T0,"getCSSRule");function Ru(t,e){var i,a;const r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],s=r?.[r.length-1];if(!s?.sheet)return console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:n(()=>{},"setProperty"),removeProperty:n(()=>"","removeProperty"),getPropertyValue:n(()=>"","getPropertyValue")}};const o=s?.sheet.insertRule(`${e}{}`,s.sheet.cssRules.length);return(a=s.sheet.cssRules)==null?void 0:a[o]}n(Ru,"insertCSSRule");function ae(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}n(ae,"getNumericAttr");function he(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}ae(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}n(he,"setNumericAttr");function Y(t,e){return t.hasAttribute(e)}n(Y,"getBooleanAttr");function G(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}Y(t,e)!=i&&t.toggleAttribute(e,i)}n(G,"setBooleanAttr");function le(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}n(le,"getStringAttr");function re(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;le(t,e,void 0)!==a&&t.setAttribute(e,a)}n(re,"setStringAttr");var Hp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$u"),ft=n((t,e,i)=>(Hp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$u"),A0=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$u"),Fn=n((t,e,i,a)=>(Hp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$q"),xe;function k0(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}n(k0,"getTemplateHTML$h");class tl extends b.HTMLElement{static{n(this,"MediaGestureReceiver")}constructor(){if(super(),A0(this,xe,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[j.MEDIA_CONTROLLER,h.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===j.MEDIA_CONTROLLER&&(i&&((s=(r=ft(this,xe))==null?void 0:r.unassociateElement)==null||s.call(r,this),Fn(this,xe,null)),a&&this.isConnected&&(Fn(this,xe,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=ft(this,xe))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Fn(this,xe,S0(this)),this.getAttribute(j.MEDIA_CONTROLLER)&&((i=(e=ft(this,xe))==null?void 0:e.associateElement)==null||i.call(e,this)),ft(this,xe)&&(ft(this,xe).addEventListener("pointerdown",this),ft(this,xe).addEventListener("click",this),ft(this,xe).hasAttribute("tabindex")||(ft(this,xe).tabIndex=0))}disconnectedCallback(){var e,i,a,r;this.getAttribute(j.MEDIA_CONTROLLER)&&((i=(e=ft(this,xe))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=ft(this,xe))==null||a.removeEventListener("pointerdown",this),(r=ft(this,xe))==null||r.removeEventListener("click",this),Fn(this,xe,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:s,clientY:o}=e,{left:l,top:d,width:c,height:p}=this.getBoundingClientRect(),v=s-l,m=o-d;if(v<0||m<0||v>c||m>p||c===0&&p===0)return;const u=this._pointerType||"mouse";if(this._pointerType=void 0,u===Rl.TOUCH){this.handleTap(e);return}else if(u===Rl.MOUSE||u===Rl.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return Y(this,h.MEDIA_PAUSED)}set mediaPaused(e){G(this,h.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?C.MEDIA_PLAY_REQUEST:C.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new b.CustomEvent(i,{composed:!0,bubbles:!0}))}}xe=new WeakMap;tl.shadowRootOptions={mode:"open"};tl.getTemplateHTML=k0;function S0(t){var e;const i=t.getAttribute(j.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):Er(t,"media-controller")}n(S0,"getMediaControllerEl");b.customElements.get("media-gesture-receiver")||b.customElements.define("media-gesture-receiver",tl);var Ah=tl,Lu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$t"),me=n((t,e,i)=>(Lu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$t"),Ke=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$t"),bt=n((t,e,i,a)=>(Lu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$p"),It=n((t,e,i)=>(Lu(t,e,"access private method"),i),"__privateMethod$e"),Fr,To,Ia,mr,ja,ad,Ra,_s,rd,Bp,nd,Wp,wn,il,al,Cu,pr,In,Ai,bs;const P={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function w0(t){return`
    <style>
      
      :host([${h.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
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

      :host(:not([${P.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
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

      
      :host([${P.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${P.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${P.AUDIO}])[${P.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${P.AUDIO}])[${P.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${P.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${P.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${P.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
        align-self: stretch;
        flex-grow: 1;
      }

      slot[name=middle-chrome] {
        display: inline;
        flex-grow: 1;
        pointer-events: none;
        background: none;
      }

      
      ::slotted([slot=media]),
      ::slotted([slot=poster]) {
        width: 100%;
        height: 100%;
      }

      
      :host(:not([${P.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${P.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${P.USER_INACTIVE}]:not([${h.MEDIA_PAUSED}]):not([${h.MEDIA_IS_AIRPLAYING}]):not([${h.MEDIA_IS_CASTING}]):not([${P.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${P.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${P.USER_INACTIVE}]:not([${P.NO_AUTOHIDE}]):not([${h.MEDIA_PAUSED}]):not([${h.MEDIA_IS_CASTING}]):not([${P.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${P.USER_INACTIVE}][${P.AUTOHIDE_OVER_CONTROLS}]:not([${P.NO_AUTOHIDE}]):not([${h.MEDIA_PAUSED}]):not([${h.MEDIA_IS_CASTING}]):not([${P.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${P.AUDIO}])[${h.MEDIA_HAS_PLAYED}]) slot[name=poster] {
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
        <template shadowrootmode="${Ah.shadowRootOptions.mode}">
          ${Ah.getTemplateHTML({})}
        </template>
      </media-gesture-receiver>
    </slot>
    <span part="layer vertical-layer">
      <slot name="top-chrome" part="top chrome"></slot>
      <slot name="middle-chrome" part="middle chrome"></slot>
      <slot name="centered-chrome" part="layer centered-layer center centered chrome"></slot>
      
      <slot part="bottom chrome"></slot>
    </span>
    <slot name="dialog" part="layer dialog-layer"></slot>
  `}n(w0,"getTemplateHTML$g");const I0=Object.values(h),R0="sm:384 md:576 lg:768 xl:960";function L0(t){Fp(t.target,t.contentRect.width)}n(L0,"resizeCallback");function Fp(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(P.BREAKPOINTS))!=null?i:R0,r=C0(a),s=D0(r,e);let o=!1;if(Object.keys(r).forEach(l=>{if(s.includes(l)){t.hasAttribute(`breakpoint${l}`)||(t.setAttribute(`breakpoint${l}`,""),o=!0);return}t.hasAttribute(`breakpoint${l}`)&&(t.removeAttribute(`breakpoint${l}`),o=!0)}),o){const l=new CustomEvent(Jt.BREAKPOINTS_CHANGE,{detail:s});t.dispatchEvent(l)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(Jt.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}n(Fp,"setBreakpoints");function C0(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}n(C0,"createBreakpointMap");function D0(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}n(D0,"getBreakpoints");class rl extends b.HTMLElement{static{n(this,"MediaContainer")}constructor(){if(super(),Ke(this,rd),Ke(this,nd),Ke(this,wn),Ke(this,al),Ke(this,pr),Ke(this,Fr,void 0),Ke(this,To,0),Ke(this,Ia,null),Ke(this,mr,null),Ke(this,ja,void 0),this.breakpointsComputed=!1,Ke(this,ad,e=>{const i=this.media;for(const a of e){if(a.type!=="childList")continue;const r=a.removedNodes;for(const s of r){if(s.slot!="media"||a.target!=this)continue;let o=a.previousSibling&&a.previousSibling.previousElementSibling;if(!o||!i)this.mediaUnsetCallback(s);else{let l=o.slot!=="media";for(;(o=o.previousSibling)!==null;)o.slot=="media"&&(l=!1);l&&this.mediaUnsetCallback(s)}}if(i)for(const s of a.addedNodes)s===i&&this.handleMediaUpdated(i)}}),Ke(this,Ra,!1),Ke(this,_s,e=>{me(this,Ra)||(setTimeout(()=>{L0(e),bt(this,Ra,!1)},0),bt(this,Ra,!0))}),Ke(this,Ai,void 0),Ke(this,bs,()=>{if(!me(this,Ai).assignedElements({flatten:!0}).length){me(this,Ia)&&this.mediaUnsetCallback(me(this,Ia));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}bt(this,Fr,new MutationObserver(me(this,ad)))}static get observedAttributes(){return[P.AUTOHIDE,P.GESTURES_DISABLED].concat(I0).filter(e=>![h.MEDIA_RENDITION_LIST,h.MEDIA_AUDIO_TRACK_LIST,h.MEDIA_CHAPTERS_CUES,h.MEDIA_WIDTH,h.MEDIA_HEIGHT,h.MEDIA_ERROR,h.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==P.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(bt(this,Ia,e),e.localName.includes("-")&&await b.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;me(this,Fr).observe(this,{childList:!0,subtree:!0}),cr(this,me(this,_s));const i=this.getAttribute(P.AUDIO)!=null,a=L(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(P.USER_INACTIVE,""),Fp(this,this.getBoundingClientRect().width);const r=this.querySelector(":scope > slot[slot=media]");r&&(bt(this,Ai,r),me(this,Ai).addEventListener("slotchange",me(this,bs))),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=b.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;hr(this,me(this,_s)),clearTimeout(me(this,mr)),me(this,Fr).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=b.window)==null||e.removeEventListener("mouseup",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointermove",this),this.removeEventListener("pointerup",this),this.removeEventListener("mouseleave",this),this.removeEventListener("keyup",this),me(this,Ai)&&(me(this,Ai).removeEventListener("slotchange",me(this,bs)),bt(this,Ai,null)),bt(this,Ra,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){bt(this,Ia,null)}handleEvent(e){switch(e.type){case"pointerdown":bt(this,To,e.timeStamp);break;case"pointermove":It(this,rd,Bp).call(this,e);break;case"pointerup":It(this,nd,Wp).call(this,e);break;case"mouseleave":It(this,wn,il).call(this);break;case"mouseup":this.removeAttribute(P.KEYBOARD_CONTROL);break;case"keyup":It(this,pr,In).call(this),this.setAttribute(P.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);bt(this,ja,isNaN(i)?0:i)}get autohide(){return(me(this,ja)===void 0?2:me(this,ja)).toString()}get breakpoints(){return le(this,P.BREAKPOINTS)}set breakpoints(e){re(this,P.BREAKPOINTS,e)}get audio(){return Y(this,P.AUDIO)}set audio(e){G(this,P.AUDIO,e)}get gesturesDisabled(){return Y(this,P.GESTURES_DISABLED)}set gesturesDisabled(e){G(this,P.GESTURES_DISABLED,e)}get keyboardControl(){return Y(this,P.KEYBOARD_CONTROL)}set keyboardControl(e){G(this,P.KEYBOARD_CONTROL,e)}get noAutohide(){return Y(this,P.NO_AUTOHIDE)}set noAutohide(e){G(this,P.NO_AUTOHIDE,e)}get autohideOverControls(){return Y(this,P.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){G(this,P.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return Y(this,P.USER_INACTIVE)}set userInteractive(e){G(this,P.USER_INACTIVE,e)}}Fr=new WeakMap;To=new WeakMap;Ia=new WeakMap;mr=new WeakMap;ja=new WeakMap;ad=new WeakMap;Ra=new WeakMap;_s=new WeakMap;rd=new WeakSet;Bp=n(function(t){if(t.pointerType!=="mouse"&&t.timeStamp-me(this,To)<250)return;It(this,al,Cu).call(this),clearTimeout(me(this,mr));const e=this.hasAttribute(P.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&It(this,pr,In).call(this)},"handlePointerMove_fn$2");nd=new WeakSet;Wp=n(function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(P.USER_INACTIVE);[this,this.media].includes(t.target)&&e?It(this,wn,il).call(this):It(this,pr,In).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&It(this,pr,In).call(this)},"handlePointerUp_fn$1");wn=new WeakSet;il=n(function(){if(me(this,ja)<0||this.hasAttribute(P.USER_INACTIVE))return;this.setAttribute(P.USER_INACTIVE,"");const t=new b.CustomEvent(Jt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)},"setInactive_fn");al=new WeakSet;Cu=n(function(){if(!this.hasAttribute(P.USER_INACTIVE))return;this.removeAttribute(P.USER_INACTIVE);const t=new b.CustomEvent(Jt.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)},"setActive_fn");pr=new WeakSet;In=n(function(){It(this,al,Cu).call(this),clearTimeout(me(this,mr));const t=parseInt(this.autohide);t<0||bt(this,mr,setTimeout(()=>{It(this,wn,il).call(this)},t*1e3))},"scheduleInactive_fn");Ai=new WeakMap;bs=new WeakMap;rl.shadowRootOptions={mode:"open"};rl.getTemplateHTML=w0;b.customElements.get("media-container")||b.customElements.define("media-container",rl);var Kp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$s"),Ce=n((t,e,i)=>(Kp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$s"),Sr=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$s"),Kn=n((t,e,i,a)=>(Kp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$o"),La,Ca,Ao,oa,ni,ki;class Du{static{n(this,"AttributeTokenList")}constructor(e,i,{defaultValue:a}={defaultValue:void 0}){Sr(this,ni),Sr(this,La,void 0),Sr(this,Ca,void 0),Sr(this,Ao,void 0),Sr(this,oa,new Set),Kn(this,La,e),Kn(this,Ca,i),Kn(this,Ao,new Set(a))}[Symbol.iterator](){return Ce(this,ni,ki).values()}get length(){return Ce(this,ni,ki).size}get value(){var e;return(e=[...Ce(this,ni,ki)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Kn(this,oa,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...Ce(this,ni,ki)][e]}values(){return Ce(this,ni,ki).values()}forEach(e,i){Ce(this,ni,ki).forEach(e,i)}add(...e){var i,a;e.forEach(r=>Ce(this,oa).add(r)),!(this.value===""&&!((i=Ce(this,La))!=null&&i.hasAttribute(`${Ce(this,Ca)}`)))&&((a=Ce(this,La))==null||a.setAttribute(`${Ce(this,Ca)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>Ce(this,oa).delete(a)),(i=Ce(this,La))==null||i.setAttribute(`${Ce(this,Ca)}`,`${this.value}`)}contains(e){return Ce(this,ni,ki).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}}La=new WeakMap;Ca=new WeakMap;Ao=new WeakMap;oa=new WeakMap;ni=new WeakSet;ki=n(function(){return Ce(this,oa).size?Ce(this,oa):Ce(this,Ao)},"tokens_get");const M0=n((t="")=>t.split(/\s+/),"splitTextTracksStr"),Vp=n((t="")=>{const[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?Zt.CAPTIONS:Zt.SUBTITLES,language:i,label:r}},"parseTextTrackStr"),nl=n((t="",e={})=>M0(t).map(i=>{const a=Vp(i);return{...e,...a}}),"parseTextTracksStr"),qp=n(t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?Vp(e):e):typeof t=="string"?nl(t):[t]:[],"parseTracks"),sd=n(({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,"formatTextTrackObj"),Rn=n((t=[])=>Array.prototype.map.call(t,sd).join(" "),"stringifyTextTrackList"),O0=n((t,e)=>i=>i[t]===e,"isMatchingPropOf"),Yp=n(t=>{const e=Object.entries(t).map(([i,a])=>O0(i,a));return i=>e.every(a=>a(i))},"textTrackObjAsPred"),cn=n((t,e=[],i=[])=>{const a=qp(i).map(Yp),r=n(s=>a.some(o=>o(s)),"isTrackToUpdate");Array.from(e).filter(r).forEach(s=>{s.mode=t})},"updateTracksModeTo"),sl=n((t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:Yp(e);return Array.from(t.textTracks).filter(i)},"getTextTracksList"),Gp=n(t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(h.MEDIA_SUBTITLES_SHOWING)},"areSubsOn"),x0=n(t=>{var e;const{media:i,fullscreenElement:a}=t;try{const r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){const s=(e=a[r])==null?void 0:e.call(a);if(s instanceof Promise)return s.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch(r){console.error(r)}},"enterFullscreen"),kh="exitFullscreen"in Te?"exitFullscreen":"webkitExitFullscreen"in Te?"webkitExitFullscreen":"webkitCancelFullScreen"in Te?"webkitCancelFullScreen":void 0,N0=n(t=>{var e;const{documentElement:i}=t;if(kh){const a=(e=i?.[kh])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},"exitFullscreen"),Kr="fullscreenElement"in Te?"fullscreenElement":"webkitFullscreenElement"in Te?"webkitFullscreenElement":void 0,P0=n(t=>{const{documentElement:e,media:i}=t,a=e?.[Kr];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===n0.FULLSCREEN?i:a},"getFullscreenElement"),$0=n(t=>{var e;const{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;const s=P0(t);if(!s)return!1;if(s===r||s===i)return!0;if(s.localName.includes("-")){let o=s.shadowRoot;if(!(Kr in o))return bi(s,r);for(;o?.[Kr];){if(o[Kr]===r)return!0;o=(e=o[Kr])==null?void 0:e.shadowRoot}}return!1},"isFullscreen"),U0="fullscreenEnabled"in Te?"fullscreenEnabled":"webkitFullscreenEnabled"in Te?"webkitFullscreenEnabled":void 0,H0=n(t=>{const{documentElement:e,media:i}=t;return!!e?.[U0]||i&&"webkitSupportsFullscreen"in i},"isFullscreenEnabled");let Vn;const Mu=n(()=>{var t,e;return Vn||(Vn=(e=(t=Te)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),Vn)},"getTestMediaEl"),B0=n(async(t=Mu())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([W0(t,i.signal),F0(t,e)]);return i.abort(),a},"hasVolumeSupportAsync"),W0=n((t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),"dispatchedVolumeChange"),F0=n(async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Lp(10)}return t.volume!==e},"volumeChanged"),K0=/.*Version\/.*Safari\/.*/.test(b.navigator.userAgent),zp=n((t=Mu())=>b.matchMedia("(display-mode: standalone)").matches&&K0?!1:typeof t?.requestPictureInPicture=="function","hasPipSupport"),Qp=n((t=Mu())=>H0({documentElement:Te,media:t}),"hasFullscreenSupport"),V0=Qp(),q0=zp(),Y0=!!b.WebKitPlaybackTargetAvailabilityEvent,G0=!!b.chrome,ko=n(t=>sl(t.media,e=>[Zt.SUBTITLES,Zt.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),"getSubtitleTracks"),jp=n(t=>sl(t.media,e=>e.mode===ir.SHOWING&&[Zt.SUBTITLES,Zt.CAPTIONS].includes(e.kind)),"getShowingSubtitleTracks"),Zp=n((t,e)=>{const i=ko(t),a=jp(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)cn(ir.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let s=i[0];const{options:o}=t;if(!o?.noSubtitlesLangPref){const p=b.localStorage.getItem("media-chrome-pref-subtitles-lang"),v=p?[p,...b.navigator.languages]:b.navigator.languages,m=i.filter(u=>v.some(f=>u.language.toLowerCase().startsWith(f.split("-")[0]))).sort((u,f)=>{const _=v.findIndex(T=>u.language.toLowerCase().startsWith(T.split("-")[0])),g=v.findIndex(T=>f.language.toLowerCase().startsWith(T.split("-")[0]));return _-g});m[0]&&(s=m[0])}const{language:l,label:d,kind:c}=s;cn(ir.DISABLED,i,a),cn(ir.SHOWING,i,[{language:l,label:d,kind:c}])}}},"toggleSubtitleTracks"),Ou=n((t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?z0(t,e):Object.entries(t).every(([i,a])=>i in e&&Ou(a,e[i])),"areValuesEq"),z0=n((t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,s)=>Ou(r,e[s])):!0},"areArraysEq"),Q0=Object.values(ui);let So;const j0=B0().then(t=>(So=t,So)),Z0=n(async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof b.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=b.customElements.get(i);a&&e instanceof a||(await b.customElements.whenDefined(i),b.customElements.upgrade(e))}))},"prepareStateOwners"),X0=new b.DOMParser,J0=n(t=>t&&(X0.parseFromString(t,"text/html").body.textContent||t),"parseHtmlToText"),Vr={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:r}=t;if(e?.type!=="playing")return(a=(i=r?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const r=b.localStorage.getItem("media-chrome-pref-muted")!==null,s=i.hasAttribute("muted");if(a){r&&b.localStorage.removeItem("media-chrome-pref-muted");return}if(s&&!r)return;b.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(r){console.debug("Error setting muted pref",r)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const r=b.localStorage.getItem("media-chrome-pref-muted")==="true";Vr.mediaMuted.set(r,e),t(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaLoop:{get(t){const{media:e}=t;return e?.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?b.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&b.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(r){console.debug("Error setting volume pref",r)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const r=b.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;Vr.mediaVolume.set(+r,e),t(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!Su(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((r,s)=>[Number(a.start(s).toFixed(3)),Number(a.end(s).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[ui.LIVE,ui.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:r}=e;if(Q0.includes(r))return r===ui.UNKNOWN?a:r;const s=e.duration;return s===1/0?ui.LIVE:Number.isFinite(s)?ui.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=Vr.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===ui.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Vr.mediaStreamType.get(t)===ui.LIVE))return!1;const r=e.seekable;if(!r)return!0;if(!r.length)return!1;const s=r.end(r.length-1)-i;return e.currentTime>=s},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return ko(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return jp(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:r,options:s}=e;if(!r)return;const o=n(l=>{var d;!s.defaultSubtitles||l&&![Zt.CAPTIONS,Zt.SUBTITLES].includes((d=l?.track)==null?void 0:d.kind)||Zp(e,!0)},"updateDefaultSubtitlesCallback");return r.addEventListener("loadstart",o),(i=r.textTracks)==null||i.addEventListener("addtrack",o),(a=r.textTracks)==null||a.addEventListener("removetrack",o),()=>{var l,d;r.removeEventListener("loadstart",o),(l=r.textTracks)==null||l.removeEventListener("addtrack",o),(d=r.textTracks)==null||d.removeEventListener("removetrack",o)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=sl(i,{kind:Zt.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:r,startTime:s,endTime:o})=>({text:J0(r),startTime:s,endTime:o}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const r=a.querySelector('track[kind="chapters"][default][src]'),s=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r?.addEventListener("load",t),s?.addEventListener("load",t),()=>{r?.removeEventListener("load",t),s?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?bi(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let s=r.pictureInPictureElement.shadowRoot;for(;s?.pictureInPictureElement;){if(s.pictureInPictureElement===a)return!0;s=(i=s.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!Te.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}const a=n(()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")},"warnNotReady");i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){const s=n(()=>{i.removeEventListener("loadedmetadata",o),i.preload="none"},"cleanup"),o=n(()=>{i.requestPictureInPicture().catch(a),s()},"tryPip");i.addEventListener("loadedmetadata",o),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),s()},1e3)}else throw r}else throw r})}else Te.pictureInPictureElement&&Te.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:r}=t;return(a=(i=r?.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions){console.warn("MediaController: Rendition selection not supported by this media.");return}const a=t,r=Array.prototype.findIndex.call(i.videoRenditions,s=>s.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks){console.warn("MediaChrome: Audio track selection not supported by this media.");return}const a=t;for(const r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return $0(t)},set(t,e,i){var a,r;t?(x0(e),i.detail&&!((a=e.media)!=null&&a.inert)&&((r=e.media)==null||r.focus())):N0(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;const{media:r}=e;if(r&&!(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&b.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!V0||!Qp(e))return Je.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!q0||!zp(e))return Je.UNSUPPORTED;if(e?.disablePictureInPicture)return Je.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(So===!1||e?.volume==null)return Je.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{So==null&&j0.then(e=>t(e?void 0:Je.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!G0||!((i=a?.remote)!=null&&i.state))return Je.UNSUPPORTED;if(!(e==null||e==="available"))return Je.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(s=>{t({availability:s?"available":"not-available"})}).catch(s=>{s.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var s;(s=a?.remote)==null||s.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!Y0)return Je.UNSUPPORTED;if(e?.availability==="not-available")return Je.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(s=>{t({availability:s?"available":"not-available"})}).catch(s=>{s.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var s;(s=a?.remote)==null||s.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return Je.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return Je.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return Je.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return Je.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},e1={[C.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,s;const{media:o}=e,l=i??void 0;let d,c;if(o&&l!=null){const[u]=sl(o,{kind:Zt.METADATA,label:"thumbnails"}),f=Array.prototype.find.call((a=u?.cues)!=null?a:[],(_,g,T)=>g===0?_.endTime>l:g===T.length-1?_.startTime<=l:_.startTime<=l&&_.endTime>l);if(f){const _=/'^(?:[a-z]+:)?\/\//i.test(f.text)||(r=o?.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,g=new URL(f.text,_);c=new URLSearchParams(g.hash).get("#xywh").split(",").map(A=>+A),d=g.href}}const p=t.mediaDuration.get(e);let m=(s=t.mediaChaptersCues.get(e).find((u,f,_)=>f===_.length-1&&p===u.endTime?u.startTime<=l&&u.endTime>=l:u.startTime<=l&&u.endTime>l))==null?void 0:s.text;return i!=null&&m==null&&(m=""),{mediaPreviewTime:l,mediaPreviewImage:d,mediaPreviewCoords:c,mediaPreviewChapter:m}},[C.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[C.MEDIA_PLAY_REQUEST](t,e){var i,a,r,s;const o="mediaPaused",d=t.mediaStreamType.get(e)===ui.LIVE,c=!((i=e.options)!=null&&i.noAutoSeekToLive),p=t.mediaTargetLiveWindow.get(e)>0;if(d&&c&&!p){const v=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(v){const m=(s=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?s:0,u=v-m;t.mediaCurrentTime.set(u,e)}}t[o].set(!1,e)},[C.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",r=i;t[a].set(r,e)},[C.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[C.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[C.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",r=!!i;return t[a].set(r,e),{mediaLoop:r}},[C.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[C.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",r=i;t[a].set(r,e)},[C.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;const s="mediaCurrentTime",o=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(o)))return;const l=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,d=o-l;t[s].set(d,e)},[C.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:r}=e,s=ko(e),o=qp(i),l=(a=o[0])==null?void 0:a.language;l&&!r.noSubtitlesLangPref&&b.localStorage.setItem("media-chrome-pref-subtitles-lang",l),cn(ir.SHOWING,s,o)},[C.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=ko(e),r=i??[];cn(ir.DISABLED,a,r)},[C.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){Zp(e,i)},[C.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",r=i;t[a].set(r,e)},[C.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[C.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[C.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[C.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[C.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[C.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[C.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[C.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},t1=n(({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=Vr,requestMap:r=e1,options:s={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{const l=[],d={options:{...s}};let c=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const p=n(_=>{_!=null&&(Ou(_,c)||(c=Object.freeze({...c,..._}),l.forEach(g=>g(c))))},"updateState"),v=n(()=>{const _=Object.entries(a).reduce((g,[T,{get:A}])=>(g[T]=A(d),g),{});p(_)},"updateStateFromFacade"),m={};let u;const f=n(async(_,g)=>{var T,A,y,S,M,D,U,W,z,F,H,Pe,Qe,je,fe,Be;const Lt=!!u;if(u={...d,...u??{},..._},Lt)return;await Z0(...Object.values(_));const We=l.length>0&&g===0&&o,pt=d.media!==u.media,Ze=((T=d.media)==null?void 0:T.textTracks)!==((A=u.media)==null?void 0:A.textTracks),Ie=((y=d.media)==null?void 0:y.videoRenditions)!==((S=u.media)==null?void 0:S.videoRenditions),$e=((M=d.media)==null?void 0:M.audioTracks)!==((D=u.media)==null?void 0:D.audioTracks),Fe=((U=d.media)==null?void 0:U.remote)!==((W=u.media)==null?void 0:W.remote),ti=d.documentElement!==u.documentElement,Vi=!!d.media&&(pt||We),Pc=!!((z=d.media)!=null&&z.textTracks)&&(Ze||We),$c=!!((F=d.media)!=null&&F.videoRenditions)&&(Ie||We),Uc=!!((H=d.media)!=null&&H.audioTracks)&&($e||We),Hc=!!((Pe=d.media)!=null&&Pe.remote)&&(Fe||We),Bc=!!d.documentElement&&(ti||We),El=Vi||Pc||$c||Uc||Hc||Bc,_a=l.length===0&&g===1&&o,Wc=!!u.media&&(pt||_a),Fc=!!((Qe=u.media)!=null&&Qe.textTracks)&&(Ze||_a),Kc=!!((je=u.media)!=null&&je.videoRenditions)&&(Ie||_a),Vc=!!((fe=u.media)!=null&&fe.audioTracks)&&($e||_a),qc=!!((Be=u.media)!=null&&Be.remote)&&(Fe||_a),Yc=!!u.documentElement&&(ti||_a),Gc=Wc||Fc||Kc||Vc||qc||Yc;if(!(El||Gc)){Object.entries(u).forEach(([J,Tr])=>{d[J]=Tr}),v(),u=void 0;return}Object.entries(a).forEach(([J,{get:Tr,mediaEvents:Of=[],textTracksEvents:xf=[],videoRenditionsEvents:Nf=[],audioTracksEvents:Pf=[],remoteEvents:$f=[],rootEvents:Uf=[],stateOwnersUpdateHandlers:Hf=[]}])=>{m[J]||(m[J]={});const Xe=n(de=>{const Ee=Tr(d,de);p({[J]:Ee})},"handler");let Re;Re=m[J].mediaEvents,Of.forEach(de=>{Re&&Vi&&(d.media.removeEventListener(de,Re),m[J].mediaEvents=void 0),Wc&&(u.media.addEventListener(de,Xe),m[J].mediaEvents=Xe)}),Re=m[J].textTracksEvents,xf.forEach(de=>{var Ee,vt;Re&&Pc&&((Ee=d.media.textTracks)==null||Ee.removeEventListener(de,Re),m[J].textTracksEvents=void 0),Fc&&((vt=u.media.textTracks)==null||vt.addEventListener(de,Xe),m[J].textTracksEvents=Xe)}),Re=m[J].videoRenditionsEvents,Nf.forEach(de=>{var Ee,vt;Re&&$c&&((Ee=d.media.videoRenditions)==null||Ee.removeEventListener(de,Re),m[J].videoRenditionsEvents=void 0),Kc&&((vt=u.media.videoRenditions)==null||vt.addEventListener(de,Xe),m[J].videoRenditionsEvents=Xe)}),Re=m[J].audioTracksEvents,Pf.forEach(de=>{var Ee,vt;Re&&Uc&&((Ee=d.media.audioTracks)==null||Ee.removeEventListener(de,Re),m[J].audioTracksEvents=void 0),Vc&&((vt=u.media.audioTracks)==null||vt.addEventListener(de,Xe),m[J].audioTracksEvents=Xe)}),Re=m[J].remoteEvents,$f.forEach(de=>{var Ee,vt;Re&&Hc&&((Ee=d.media.remote)==null||Ee.removeEventListener(de,Re),m[J].remoteEvents=void 0),qc&&((vt=u.media.remote)==null||vt.addEventListener(de,Xe),m[J].remoteEvents=Xe)}),Re=m[J].rootEvents,Uf.forEach(de=>{Re&&Bc&&(d.documentElement.removeEventListener(de,Re),m[J].rootEvents=void 0),Yc&&(u.documentElement.addEventListener(de,Xe),m[J].rootEvents=Xe)});const Un=m[J].stateOwnersUpdateHandlers;if(Un&&El&&(Array.isArray(Un)?Un:[Un]).forEach(Ee=>{typeof Ee=="function"&&Ee()}),Gc){const de=Hf.map(Ee=>Ee(Xe,u)).filter(Ee=>typeof Ee=="function");m[J].stateOwnersUpdateHandlers=de.length===1?de[0]:de}else El&&(m[J].stateOwnersUpdateHandlers=void 0)}),Object.entries(u).forEach(([J,Tr])=>{d[J]=Tr}),v(),u=void 0},"updateStateOwners");return f({media:t,fullscreenElement:e,documentElement:i,options:s}),{dispatch(_){const{type:g,detail:T}=_;if(r[g]&&c.mediaErrorCode==null){p(r[g](a,d,_));return}g==="mediaelementchangerequest"?f({media:T}):g==="fullscreenelementchangerequest"?f({fullscreenElement:T}):g==="documentelementchangerequest"?f({documentElement:T}):g==="optionschangerequest"&&(Object.entries(T??{}).forEach(([A,y])=>{d.options[A]=y}),v())},getState(){return c},subscribe(_){return f({},l.length+1),l.push(_),_(c),()=>{const g=l.indexOf(_);g>=0&&(f({},l.length-1),l.splice(g,1))}}}},"createMediaStore");var xu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$r"),O=n((t,e,i)=>(xu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$r"),rt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$r"),gt=n((t,e,i,a)=>(xu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$n"),wr=n((t,e,i)=>(xu(t,e,"access private method"),i),"__privateMethod$d"),ci,qr,q,Qt,Yr,Nt,gs,Gr,ys,od,ca,Ts,ld,dd,Xp;const Jp=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],Sh=10,wh=.025,Ih=.25,i1=.25,a1=2,w={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};class ev extends rl{static{n(this,"MediaController")}constructor(){super(),rt(this,ys),rt(this,Ts),rt(this,dd),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,rt(this,ci,new Du(this,w.HOTKEYS)),rt(this,qr,void 0),rt(this,q,void 0),rt(this,Qt,null),rt(this,Yr,void 0),rt(this,Nt,void 0),rt(this,gs,i=>{var a;(a=O(this,q))==null||a.dispatch(i)}),rt(this,Gr,void 0),rt(this,ca,i=>{const{key:a,shiftKey:r}=i;if(!(r&&(a==="/"||a==="?")||Jp.includes(a))){this.removeEventListener("keyup",O(this,ca));return}this.keyboardShortcutHandler(i)}),this.associateElement(this);let e={};gt(this,Yr,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);const s=a.toLowerCase(),o=new b.CustomEvent(r0[s],{composed:!0,detail:r});this.dispatchEvent(o)}),e=i})}static get observedAttributes(){return super.observedAttributes.concat(w.NO_HOTKEYS,w.HOTKEYS,w.DEFAULT_STREAM_TYPE,w.DEFAULT_SUBTITLES,w.DEFAULT_DURATION,w.NO_MUTED_PREF,w.NO_VOLUME_PREF,w.LANG,w.LOOP,w.LIVE_EDGE_OFFSET,w.SEEK_TO_LIVE_OFFSET,w.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return O(this,q)}set mediaStore(e){var i,a;if(O(this,q)&&((i=O(this,Nt))==null||i.call(this),gt(this,Nt,void 0)),gt(this,q,e),!O(this,q)&&!this.hasAttribute(w.NO_DEFAULT_STORE)){wr(this,ys,od).call(this);return}gt(this,Nt,(a=O(this,q))==null?void 0:a.subscribe(O(this,Yr)))}get fullscreenElement(){var e;return(e=O(this,qr))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(w.FULLSCREEN_ELEMENT)&&this.removeAttribute(w.FULLSCREEN_ELEMENT),gt(this,qr,e),(i=O(this,q))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return Y(this,w.DEFAULT_SUBTITLES)}set defaultSubtitles(e){G(this,w.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return le(this,w.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){re(this,w.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return ae(this,w.DEFAULT_DURATION)}set defaultDuration(e){he(this,w.DEFAULT_DURATION,e)}get noHotkeys(){return Y(this,w.NO_HOTKEYS)}set noHotkeys(e){G(this,w.NO_HOTKEYS,e)}get keysUsed(){return le(this,w.KEYS_USED)}set keysUsed(e){re(this,w.KEYS_USED,e)}get liveEdgeOffset(){return ae(this,w.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){he(this,w.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return Y(this,w.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){G(this,w.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return Y(this,w.NO_VOLUME_PREF)}set noVolumePref(e){G(this,w.NO_VOLUME_PREF,e)}get noMutedPref(){return Y(this,w.NO_MUTED_PREF)}set noMutedPref(e){G(this,w.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return Y(this,w.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){G(this,w.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return Y(this,w.NO_DEFAULT_STORE)}set noDefaultStore(e){G(this,w.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var r,s,o,l,d,c,p,v,m,u,f,_;if(super.attributeChangedCallback(e,i,a),e===w.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(w.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===w.HOTKEYS)O(this,ci).value=a;else if(e===w.DEFAULT_SUBTITLES&&a!==i)(r=O(this,q))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(w.DEFAULT_SUBTITLES)}});else if(e===w.DEFAULT_STREAM_TYPE)(o=O(this,q))==null||o.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(s=this.getAttribute(w.DEFAULT_STREAM_TYPE))!=null?s:void 0}});else if(e===w.LIVE_EDGE_OFFSET&&a!==i)(l=O(this,q))==null||l.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(w.LIVE_EDGE_OFFSET)?+this.getAttribute(w.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(w.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(w.SEEK_TO_LIVE_OFFSET):this.hasAttribute(w.LIVE_EDGE_OFFSET)?+this.getAttribute(w.LIVE_EDGE_OFFSET):void 0}});else if(e===w.SEEK_TO_LIVE_OFFSET&&a!==i)(d=O(this,q))==null||d.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(w.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(w.SEEK_TO_LIVE_OFFSET):this.hasAttribute(w.LIVE_EDGE_OFFSET)?+this.getAttribute(w.LIVE_EDGE_OFFSET):void 0}});else if(e===w.NO_AUTO_SEEK_TO_LIVE)(c=O(this,q))==null||c.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(w.NO_AUTO_SEEK_TO_LIVE)}});else if(e===w.FULLSCREEN_ELEMENT){const g=a?(p=this.getRootNode())==null?void 0:p.getElementById(a):void 0;gt(this,qr,g),(v=O(this,q))==null||v.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===w.LANG&&a!==i?(f0(a),(m=O(this,q))==null||m.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===w.LOOP&&a!==i?(u=O(this,q))==null||u.dispatch({type:C.MEDIA_LOOP_REQUEST,detail:a!=null}):e===w.NO_VOLUME_PREF&&a!==i?(f=O(this,q))==null||f.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(w.NO_VOLUME_PREF)}}):e===w.NO_MUTED_PREF&&a!==i&&((_=O(this,q))==null||_.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(w.NO_MUTED_PREF)}}))}connectedCallback(){var e,i,a;this.associateElement(this),!O(this,q)&&!this.hasAttribute(w.NO_DEFAULT_STORE)&&wr(this,ys,od).call(this),(e=O(this,q))==null||e.dispatch({type:"documentelementchangerequest",detail:Te}),(i=O(this,q))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement}),super.connectedCallback(),O(this,q)&&!O(this,Nt)&&gt(this,Nt,(a=O(this,q))==null?void 0:a.subscribe(O(this,Yr))),O(this,Gr)!==void 0&&O(this,q)&&this.media&&setTimeout(()=>{var r,s,o;(s=(r=this.media)==null?void 0:r.textTracks)!=null&&s.length&&((o=O(this,q))==null||o.dispatch({type:C.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:O(this,Gr)}))},0),this.hasAttribute(w.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,r,s,o;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),O(this,q)){const l=O(this,q).getState();gt(this,Gr,!!((i=l.mediaSubtitlesShowing)!=null&&i.length)),(a=O(this,q))==null||a.dispatch({type:"fullscreenelementchangerequest",detail:void 0}),(r=O(this,q))==null||r.dispatch({type:"documentelementchangerequest",detail:void 0}),(s=O(this,q))==null||s.dispatch({type:C.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}O(this,Nt)&&((o=O(this,Nt))==null||o.call(this),gt(this,Nt,void 0)),this.unassociateElement(this),O(this,Qt)&&(O(this,Qt).remove(),gt(this,Qt,null))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=O(this,q))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=O(this,q))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){Ch(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),s=d1(e,a,r);Object.values(C).forEach(o=>{e.addEventListener(o,O(this,gs))}),i.set(e,s)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(C).forEach(r=>{e.removeEventListener(r,O(this,gs))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),O(this,q)&&Object.entries(O(this,q).getState()).forEach(([r,s])=>{Ch([e],r,s)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",wr(this,Ts,ld))}disableHotkeys(){this.removeEventListener("keydown",wr(this,Ts,ld)),this.removeEventListener("keyup",O(this,ca))}get hotkeys(){return O(this,ci)}set hotkeys(e){re(this,w.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,s,o,l,d,c,p;const v=e.target;if(((r=(a=(i=v.getAttribute(w.KEYS_USED))==null?void 0:i.split(" "))!=null?a:v?.keysUsed)!=null?r:[]).map(T=>T==="Space"?" ":T).filter(Boolean).includes(e.key))return;let u,f,_;if(!(O(this,ci).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&O(this,ci).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&O(this,ci).contains("noshift+/")))switch(e.key){case" ":case"k":u=O(this,q).getState().mediaPaused?C.MEDIA_PLAY_REQUEST:C.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new b.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"m":u=this.mediaStore.getState().mediaVolumeLevel==="off"?C.MEDIA_UNMUTE_REQUEST:C.MEDIA_MUTE_REQUEST,this.dispatchEvent(new b.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"f":u=this.mediaStore.getState().mediaIsFullscreen?C.MEDIA_EXIT_FULLSCREEN_REQUEST:C.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new b.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new b.CustomEvent(C.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const T=this.hasAttribute(w.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(w.KEYBOARD_BACKWARD_SEEK_OFFSET):Sh;f=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)-T,0),_=new b.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowRight":case"l":{const T=this.hasAttribute(w.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(w.KEYBOARD_FORWARD_SEEK_OFFSET):Sh;f=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)+T,0),_=new b.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowUp":{const T=this.hasAttribute(w.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(w.KEYBOARD_UP_VOLUME_STEP):wh;f=Math.min(((l=this.mediaStore.getState().mediaVolume)!=null?l:1)+T,1),_=new b.CustomEvent(C.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowDown":{const T=this.hasAttribute(w.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(w.KEYBOARD_DOWN_VOLUME_STEP):wh;f=Math.max(((d=this.mediaStore.getState().mediaVolume)!=null?d:1)-T,0),_=new b.CustomEvent(C.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"<":{const T=(c=this.mediaStore.getState().mediaPlaybackRate)!=null?c:1;f=Math.max(T-Ih,i1).toFixed(2),_=new b.CustomEvent(C.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case">":{const T=(p=this.mediaStore.getState().mediaPlaybackRate)!=null?p:1;f=Math.min(T+Ih,a1).toFixed(2),_=new b.CustomEvent(C.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"/":case"?":{e.shiftKey&&wr(this,dd,Xp).call(this);break}case"p":{u=this.mediaStore.getState().mediaIsPip?C.MEDIA_EXIT_PIP_REQUEST:C.MEDIA_ENTER_PIP_REQUEST,_=new b.CustomEvent(u,{composed:!0,bubbles:!0}),this.dispatchEvent(_);break}}}}ci=new WeakMap;qr=new WeakMap;q=new WeakMap;Qt=new WeakMap;Yr=new WeakMap;Nt=new WeakMap;gs=new WeakMap;Gr=new WeakMap;ys=new WeakSet;od=n(function(){var t;this.mediaStore=t1({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(w.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(w.DEFAULT_DURATION)?+this.getAttribute(w.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(w.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(w.LIVE_EDGE_OFFSET)?+this.getAttribute(w.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(w.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(w.SEEK_TO_LIVE_OFFSET):this.hasAttribute(w.LIVE_EDGE_OFFSET)?+this.getAttribute(w.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(w.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(w.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(w.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(w.NO_SUBTITLES_LANG_PREF)}})},"setupDefaultStore_fn");ca=new WeakMap;Ts=new WeakSet;ld=n(function(t){var e;const{metaKey:i,altKey:a,key:r,shiftKey:s}=t,o=s&&(r==="/"||r==="?");if(o&&((e=O(this,Qt))!=null&&e.open)){this.removeEventListener("keyup",O(this,ca));return}if(i||a||!o&&!Jp.includes(r)){this.removeEventListener("keyup",O(this,ca));return}const l=t.target,d=l instanceof HTMLElement&&(l.tagName.toLowerCase()==="media-volume-range"||l.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)&&!(O(this,ci).contains(`no${r.toLowerCase()}`)||r===" "&&O(this,ci).contains("nospace"))&&!d&&t.preventDefault(),this.addEventListener("keyup",O(this,ca),{once:!0})},"keyDownHandler_fn");dd=new WeakSet;Xp=n(function(){O(this,Qt)||(gt(this,Qt,Te.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(O(this,Qt))),O(this,Qt).open=!0},"showKeyboardShortcutsDialog_fn");const r1=Object.values(h),n1=Object.values(wp),tv=n(t=>{var e,i,a,r;let{observedAttributes:s}=t.constructor;!s&&((e=t.nodeName)!=null&&e.includes("-"))&&(b.customElements.upgrade(t),{observedAttributes:s}=t.constructor);const o=(r=(a=(i=t?.getAttribute)==null?void 0:i.call(t,j.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(s||o)?(s||o).filter(l=>r1.includes(l)):[]},"getMediaUIAttributesFrom"),s1=n(t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&b.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof b.customElements.get(t.nodeName.toLowerCase()))&&b.customElements.upgrade(t),n1.some(a=>a in t)},"hasMediaUIProps"),ud=n(t=>s1(t)||!!tv(t).length,"isMediaStateReceiver"),Rh=n(t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},"serializeTuple"),Lh={[h.MEDIA_SUBTITLES_LIST]:Rn,[h.MEDIA_SUBTITLES_SHOWING]:Rn,[h.MEDIA_SEEKABLE]:Rh,[h.MEDIA_BUFFERED]:t=>t?.map(Rh).join(" "),[h.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[h.MEDIA_RENDITION_LIST]:s0,[h.MEDIA_AUDIO_TRACK_LIST]:u0},o1=n(async(t,e,i)=>{var a,r;if(t.isConnected||await Lp(0),typeof i=="boolean"||i==null)return G(t,e,i);if(typeof i=="number")return he(t,e,i);if(typeof i=="string")return re(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const s=(r=(a=Lh[e])==null?void 0:a.call(Lh,i))!=null?r:i;return t.setAttribute(e,s)},"setAttr"),l1=n(t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},"isMediaSlotElementDescendant"),Xi=n((t,e)=>{if(l1(t))return;const i=n((r,s)=>{var o,l;ud(r)&&s(r);const{children:d=[]}=r??{},c=(l=(o=r?.shadowRoot)==null?void 0:o.children)!=null?l:[];[...d,...c].forEach(v=>Xi(v,s))},"traverseForMediaStateReceiversSync"),a=t?.nodeName.toLowerCase();if(a.includes("-")&&!ud(t)){b.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},"traverseForMediaStateReceivers"),Ch=n((t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const r=tv(a),s=e.toLowerCase();r.includes(s)&&o1(a,s,i)})},"propagateMediaState"),d1=n((t,e,i)=>{Xi(t,e);const a=n(p=>{var v;const m=(v=p?.composedPath()[0])!=null?v:p.target;e(m)},"registerMediaStateReceiverHandler"),r=n(p=>{var v;const m=(v=p?.composedPath()[0])!=null?v:p.target;i(m)},"unregisterMediaStateReceiverHandler");t.addEventListener(C.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(C.UNREGISTER_MEDIA_STATE_RECEIVER,r);const s=n(p=>{p.forEach(v=>{const{addedNodes:m=[],removedNodes:u=[],type:f,target:_,attributeName:g}=v;f==="childList"?(Array.prototype.forEach.call(m,T=>Xi(T,e)),Array.prototype.forEach.call(u,T=>Xi(T,i))):f==="attributes"&&g===j.MEDIA_CHROME_ATTRIBUTES&&(ud(_)?e(_):i(_))})},"mutationCallback");let o=[];const l=n(p=>{const v=p.target;v.name!=="media"&&(o.forEach(m=>Xi(m,i)),o=[...v.assignedElements({flatten:!0})],o.forEach(m=>Xi(m,e)))},"slotChangeHandler");t.addEventListener("slotchange",l);const d=new MutationObserver(s);return d.observe(t,{childList:!0,attributes:!0,subtree:!0}),n(()=>{Xi(t,i),t.removeEventListener("slotchange",l),d.disconnect(),t.removeEventListener(C.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(C.UNREGISTER_MEDIA_STATE_RECEIVER,r)},"unsubscribe")},"monitorForMediaStateReceivers");b.customElements.get("media-controller")||b.customElements.define("media-controller",ev);var u1=ev;const ba={PLACEMENT:"placement",BOUNDS:"bounds"};function c1(t){return`
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
  `}n(c1,"getTemplateHTML$f");class ol extends b.HTMLElement{static{n(this,"MediaTooltip")}constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Up(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),r=(e=Er(this,"#"+this.bounds))!=null?e:Ge(this);if(!r)return;const{x:s,width:o}=r.getBoundingClientRect(),{x:l,width:d}=this.getBoundingClientRect(),c=l+d,p=s+o,v=a.getPropertyValue("--media-tooltip-offset-x"),m=v?parseFloat(v.replace("px","")):0,u=a.getPropertyValue("--media-tooltip-container-margin"),f=u?parseFloat(u.replace("px","")):0,_=l-s+m-f,g=c-p+m+f;if(_<0){this.style.setProperty("--media-tooltip-offset-x",`${_}px`);return}if(g>0){this.style.setProperty("--media-tooltip-offset-x",`${g}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[ba.PLACEMENT,ba.BOUNDS]}get placement(){return le(this,ba.PLACEMENT)}set placement(e){re(this,ba.PLACEMENT,e)}get bounds(){return le(this,ba.BOUNDS)}set bounds(e){re(this,ba.BOUNDS,e)}}ol.shadowRootOptions={mode:"open"};ol.getTemplateHTML=c1;b.customElements.get("media-tooltip")||b.customElements.define("media-tooltip",ol);var Dh=ol,Nu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$q"),ge=n((t,e,i)=>(Nu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$q"),ga=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$q"),qn=n((t,e,i,a)=>(Nu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$m"),h1=n((t,e,i)=>(Nu(t,e,"access private method"),i),"__privateMethod$c"),Pt,Za,Pi,Da,As,cd,iv;const gi={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function m1(t,e={}){return`
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

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }
      
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

    ${this.getSlotTemplateHTML(t,e)}

    <slot name="tooltip">
      <media-tooltip part="tooltip" aria-hidden="true">
        <template shadowrootmode="${Dh.shadowRootOptions.mode}">
          ${Dh.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}n(m1,"getTemplateHTML$e");function p1(t,e){return`
    <slot></slot>
  `}n(p1,"getSlotTemplateHTML$n");function v1(){return""}n(v1,"getTooltipContentHTML$g");class Me extends b.HTMLElement{static{n(this,"MediaChromeButton")}constructor(){if(super(),ga(this,cd),ga(this,Pt,void 0),this.preventClick=!1,this.tooltipEl=null,ga(this,Za,e=>{this.preventClick||this.handleClick(e),setTimeout(ge(this,Pi),0)}),ga(this,Pi,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),ga(this,Da,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",ge(this,Da));return}this.preventClick||this.handleClick(e)}),ga(this,As,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",ge(this,Da));return}this.addEventListener("keyup",ge(this,Da),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",gi.TOOLTIP_PLACEMENT,j.MEDIA_CONTROLLER,h.MEDIA_LANG]}enable(){this.addEventListener("click",ge(this,Za)),this.addEventListener("keydown",ge(this,As)),this.tabIndex=0}disable(){this.removeEventListener("click",ge(this,Za)),this.removeEventListener("keydown",ge(this,As)),this.removeEventListener("keyup",ge(this,Da)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===j.MEDIA_CONTROLLER?(i&&((s=(r=ge(this,Pt))==null?void 0:r.unassociateElement)==null||s.call(r,this),qn(this,Pt,null)),a&&this.isConnected&&(qn(this,Pt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=ge(this,Pt))==null?void 0:l.associateElement)==null||d.call(l,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===gi.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===h.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),ge(this,Pi).call(this)}connectedCallback(){var e,i,a;const{style:r}=Se(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const s=this.getAttribute(j.MEDIA_CONTROLLER);s&&(qn(this,Pt,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=ge(this,Pt))==null?void 0:i.associateElement)==null||a.call(i,this)),b.customElements.whenDefined("media-tooltip").then(()=>h1(this,cd,iv).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=ge(this,Pt))==null?void 0:e.unassociateElement)==null||i.call(e,this),qn(this,Pt,null),this.removeEventListener("mouseenter",ge(this,Pi)),this.removeEventListener("focus",ge(this,Pi)),this.removeEventListener("click",ge(this,Za))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return le(this,gi.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){re(this,gi.TOOLTIP_PLACEMENT,e)}get mediaController(){return le(this,j.MEDIA_CONTROLLER)}set mediaController(e){re(this,j.MEDIA_CONTROLLER,e)}get disabled(){return Y(this,gi.DISABLED)}set disabled(e){G(this,gi.DISABLED,e)}get noTooltip(){return Y(this,gi.NO_TOOLTIP)}set noTooltip(e){G(this,gi.NO_TOOLTIP,e)}handleClick(e){}}Pt=new WeakMap;Za=new WeakMap;Pi=new WeakMap;Da=new WeakMap;As=new WeakMap;cd=new WeakSet;iv=n(function(){this.addEventListener("mouseenter",ge(this,Pi)),this.addEventListener("focus",ge(this,Pi)),this.addEventListener("click",ge(this,Za));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)},"setupTooltip_fn");Me.shadowRootOptions={mode:"open"};Me.getTemplateHTML=m1;Me.getSlotTemplateHTML=p1;Me.getTooltipContentHTML=v1;b.customElements.get("media-chrome-button")||b.customElements.define("media-chrome-button",Me);const Mh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function f1(t){return`
    <style>
      :host([${h.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${h.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${h.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${h.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Mh}</slot>
      <slot name="exit">${Mh}</slot>
    </slot>
  `}n(f1,"getSlotTemplateHTML$m");function E1(){return`
    <slot name="tooltip-enter">${L("start airplay")}</slot>
    <slot name="tooltip-exit">${L("stop airplay")}</slot>
  `}n(E1,"getTooltipContentHTML$f");const Oh=n(t=>{const e=t.mediaIsAirplaying?L("stop airplay"):L("start airplay");t.setAttribute("aria-label",e)},"updateAriaLabel$a");class Pu extends Me{static{n(this,"MediaAirplayButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_IS_AIRPLAYING,h.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Oh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_IS_AIRPLAYING&&Oh(this)}get mediaIsAirplaying(){return Y(this,h.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){G(this,h.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return le(this,h.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){re(this,h.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new b.CustomEvent(C.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}Pu.getSlotTemplateHTML=f1;Pu.getTooltipContentHTML=E1;b.customElements.get("media-airplay-button")||b.customElements.define("media-airplay-button",Pu);const _1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,b1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function g1(t){return`
    <style>
      :host([aria-checked="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([aria-checked="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-checked="true"]) slot[name=tooltip-enable],
      :host(:not([aria-checked="true"])) slot[name=tooltip-disable] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${_1}</slot>
      <slot name="off">${b1}</slot>
    </slot>
  `}n(g1,"getSlotTemplateHTML$l");function y1(){return`
    <slot name="tooltip-enable">${L("Enable captions")}</slot>
    <slot name="tooltip-disable">${L("Disable captions")}</slot>
  `}n(y1,"getTooltipContentHTML$e");const xh=n(t=>{t.setAttribute("aria-checked",Gp(t).toString())},"updateAriaChecked$1");class $u extends Me{static{n(this,"MediaCaptionsButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_SUBTITLES_LIST,h.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("aria-label",L("closed captions")),xh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_SUBTITLES_SHOWING&&xh(this)}get mediaSubtitlesList(){return Nh(this,h.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Ph(this,h.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Nh(this,h.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Ph(this,h.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new b.CustomEvent(C.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}$u.getSlotTemplateHTML=g1;$u.getTooltipContentHTML=y1;const Nh=n((t,e)=>{const i=t.getAttribute(e);return i?nl(i):[]},"getSubtitlesListAttr$2"),Ph=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Rn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr$2");b.customElements.get("media-captions-button")||b.customElements.define("media-captions-button",$u);const T1='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',A1='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function k1(t){return`
    <style>
      :host([${h.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${h.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${h.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${h.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${T1}</slot>
      <slot name="exit">${A1}</slot>
    </slot>
  `}n(k1,"getSlotTemplateHTML$k");function S1(){return`
    <slot name="tooltip-enter">${L("Start casting")}</slot>
    <slot name="tooltip-exit">${L("Stop casting")}</slot>
  `}n(S1,"getTooltipContentHTML$d");const $h=n(t=>{const e=t.mediaIsCasting?L("stop casting"):L("start casting");t.setAttribute("aria-label",e)},"updateAriaLabel$9");class Uu extends Me{static{n(this,"MediaCastButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_IS_CASTING,h.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),$h(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_IS_CASTING&&$h(this)}get mediaIsCasting(){return Y(this,h.MEDIA_IS_CASTING)}set mediaIsCasting(e){G(this,h.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return le(this,h.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){re(this,h.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?C.MEDIA_EXIT_CAST_REQUEST:C.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new b.CustomEvent(e,{composed:!0,bubbles:!0}))}}Uu.getSlotTemplateHTML=k1;Uu.getTooltipContentHTML=S1;b.customElements.get("media-cast-button")||b.customElements.define("media-cast-button",Uu);var Hu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$p"),ha=n((t,e,i)=>(Hu(t,e,"read from private field"),e.get(t)),"__privateGet$p"),ai=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$p"),Bu=n((t,e,i,a)=>(Hu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$l"),Gi=n((t,e,i)=>(Hu(t,e,"access private method"),i),"__privateMethod$b"),wo,Ln,va,ks,hd,md,av,pd,rv,vd,nv,fd,sv,Ed,ov;function w1(t){return`
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
    ${this.getSlotTemplateHTML(t)}
  `}n(w1,"getTemplateHTML$d");function I1(t){return`
    <slot id="content"></slot>
  `}n(I1,"getSlotTemplateHTML$j");const Ir={OPEN:"open",ANCHOR:"anchor"};class _r extends b.HTMLElement{static{n(this,"MediaChromeDialog")}constructor(){super(),ai(this,ks),ai(this,md),ai(this,pd),ai(this,vd),ai(this,fd),ai(this,Ed),ai(this,wo,!1),ai(this,Ln,null),ai(this,va,null)}static get observedAttributes(){return[Ir.OPEN,Ir.ANCHOR]}get open(){return Y(this,Ir.OPEN)}set open(e){G(this,Ir.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":Gi(this,vd,nv).call(this,e);break;case"focusout":Gi(this,fd,sv).call(this,e);break;case"keydown":Gi(this,Ed,ov).call(this,e);break}}connectedCallback(){Gi(this,ks,hd).call(this),this.role||(this.role="dialog"),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}disconnectedCallback(){this.removeEventListener("invoke",this),this.removeEventListener("focusout",this),this.removeEventListener("keydown",this)}attributeChangedCallback(e,i,a){Gi(this,ks,hd).call(this),e===Ir.OPEN&&a!==i&&(this.open?Gi(this,md,av).call(this):Gi(this,pd,rv).call(this))}focus(){Bu(this,Ln,Iu());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}}wo=new WeakMap;Ln=new WeakMap;va=new WeakMap;ks=new WeakSet;hd=n(function(){if(!ha(this,wo)&&(Bu(this,wo,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=Se(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}},"init_fn");md=new WeakSet;av=n(function(){var t;(t=ha(this,va))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})},"handleOpen_fn$1");pd=new WeakSet;rv=n(function(){var t;(t=ha(this,va))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))},"handleClosed_fn$1");vd=new WeakSet;nv=n(function(t){Bu(this,va,t.relatedTarget),bi(this,t.relatedTarget)||(this.open=!this.open)},"handleInvoke_fn$1");fd=new WeakSet;sv=n(function(t){var e;bi(this,t.relatedTarget)||((e=ha(this,Ln))==null||e.focus(),ha(this,va)&&ha(this,va)!==t.relatedTarget&&this.open&&(this.open=!1))},"handleFocusOut_fn$1");Ed=new WeakSet;ov=n(function(t){var e,i,a,r,s;const{key:o,ctrlKey:l,altKey:d,metaKey:c}=t;l||d||c||this.keysUsed.includes(o)&&(t.preventDefault(),t.stopPropagation(),o==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):o==="Escape"&&((s=ha(this,Ln))==null||s.focus(),this.open=!1))},"handleKeyDown_fn$1");_r.shadowRootOptions={mode:"open"};_r.getTemplateHTML=w1;_r.getSlotTemplateHTML=I1;b.customElements.get("media-chrome-dialog")||b.customElements.define("media-chrome-dialog",_r);var Wu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$o"),ue=n((t,e,i)=>(Wu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$o"),Oe=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$o"),Si=n((t,e,i,a)=>(Wu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$k"),At=n((t,e,i)=>(Wu(t,e,"access private method"),i),"__privateMethod$a"),$t,ll,Ss,ws,kt,Io,Is,Rs,Ls,Fu,lv,Cs,_d,Ds,bd,Ro,Ku,gd,dv,yd,uv,Td,cv,Ad,hv;function R1(t){return`
    <style>
      :host {
        --_focus-box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        --_media-range-padding: var(--media-range-padding, var(--media-control-padding, 10px));

        box-shadow: var(--_focus-visible-box-shadow, none);
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        height: calc(var(--media-control-height, 24px) + 2 * var(--_media-range-padding));
        display: inline-flex;
        align-items: center;
        
        vertical-align: middle;
        box-sizing: border-box;
        position: relative;
        width: 100px;
        transition: background .15s linear;
        cursor: var(--media-cursor, pointer);
        pointer-events: auto;
        touch-action: none; 
      }

      
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
        
        width: var(--media-range-track-width, 100%);
        transform: translate(var(--media-range-track-translate-x, 0px), var(--media-range-track-translate-y, 0px));
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 40px;
      }

      #range {
        
        display: var(--media-time-range-hover-display, block);
        bottom: var(--media-time-range-hover-bottom, -7px);
        height: var(--media-time-range-hover-height, max(100% + 7px, 25px));
        width: 100%;
        position: absolute;
        cursor: var(--media-cursor, pointer);

        -webkit-appearance: none; 
        -webkit-tap-highlight-color: transparent;
        background: transparent; 
        margin: 0;
        z-index: 1;
      }

      @media (hover: hover) {
        #range {
          bottom: var(--media-time-range-hover-bottom, -5px);
          height: var(--media-time-range-hover-height, max(100% + 5px, 20px));
        }
      }

      
      
      #range::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: transparent;
        width: .1px;
        height: .1px;
      }

      
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

      /* Visible label for accessibility - positioned off-screen but technically visible (Firefox requires visible labels) */
      #range-label {
        position: absolute;
        left: -10000px;
        background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        pointer-events: none;
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
        <svg id="segments" aria-hidden="true"><clipPath id="segments-clipping"></clipPath></svg>
      </div>
        <input id="range" type="range" min="0" max="1" step="any" value="0">
        <label for="range" id="range-label"></label>

      ${this.getContainerTemplateHTML(t)}
    </div>
    <div id="rightgap"></div>
  `}n(R1,"getTemplateHTML$c");function L1(t){return""}n(L1,"getContainerTemplateHTML$1");class br extends b.HTMLElement{static{n(this,"MediaChromeRange")}constructor(){if(super(),Oe(this,Fu),Oe(this,Cs),Oe(this,Ds),Oe(this,Ro),Oe(this,gd),Oe(this,yd),Oe(this,Td),Oe(this,Ad),Oe(this,$t,void 0),Oe(this,ll,void 0),Oe(this,Ss,void 0),Oe(this,ws,void 0),Oe(this,kt,{}),Oe(this,Io,[]),Oe(this,Is,()=>{if(this.range.matches(":focus-visible")){const{style:e}=Se(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),Oe(this,Rs,()=>{const{style:e}=Se(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),Oe(this,Ls,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),Si(this,Ss,this.shadowRoot.querySelector("#startpoint")),Si(this,ws,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",j.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===j.MEDIA_CONTROLLER?(i&&((s=(r=ue(this,$t))==null?void 0:r.unassociateElement)==null||s.call(r,this),Si(this,$t,null)),a&&this.isConnected&&(Si(this,$t,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=ue(this,$t))==null?void 0:l.associateElement)==null||d.call(l,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),At(this,Cs,_d).call(this)):(this.range.setAttribute(e,a),At(this,Ds,bd).call(this)))}connectedCallback(){var e,i,a;const{style:r}=Se(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),ue(this,kt).pointer=Se(this.shadowRoot,"#pointer"),ue(this,kt).progress=Se(this.shadowRoot,"#progress"),ue(this,kt).thumb=Se(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),ue(this,kt).activeSegment=Se(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const s=this.getAttribute(j.MEDIA_CONTROLLER);s&&(Si(this,$t,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=ue(this,$t))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",ue(this,Is)),this.shadowRoot.addEventListener("focusout",ue(this,Rs)),At(this,Cs,_d).call(this),cr(this.container,ue(this,Ls))}disconnectedCallback(){var e,i;At(this,Ds,bd).call(this),(i=(e=ue(this,$t))==null?void 0:e.unassociateElement)==null||i.call(e,this),Si(this,$t,null),this.shadowRoot.removeEventListener("focusin",ue(this,Is)),this.shadowRoot.removeEventListener("focusout",ue(this,Rs)),hr(this.container,ue(this,Ls))}updatePointerBar(e){var i;(i=ue(this,kt).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=ue(this,kt).progress)==null||e.style.setProperty("width",`${a}%`),(i=ue(this,kt).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(s=>[s.start,s.end]),+this.range.max])];Si(this,Io,[...a]);const r=a.pop();for(const[s,o]of a.entries()){const[l,d]=[s===0,s===a.length-1],c=l?"calc(var(--segments-gap) / -1)":`${o*100}%`,v=`calc(${((d?r:a[s+1])-o)*100}%${l||d?"":" - var(--segments-gap)"})`,m=Te.createElementNS("http://www.w3.org/2000/svg","rect"),u=Ru(this.shadowRoot,`#segments-clipping rect:nth-child(${s+1})`);u.style.setProperty("x",c),u.style.setProperty("width",v),i.append(m)}}getPointerRatio(e){return y0(e.clientX,e.clientY,ue(this,Ss).getBoundingClientRect(),ue(this,ws).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":At(this,Ad,hv).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":At(this,gd,dv).call(this,e);break;case"pointerdown":At(this,Ro,Ku).call(this,e);break;case"pointerup":At(this,yd,uv).call(this);break;case"pointerleave":At(this,Td,cv).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}$t=new WeakMap;ll=new WeakMap;Ss=new WeakMap;ws=new WeakMap;kt=new WeakMap;Io=new WeakMap;Is=new WeakMap;Rs=new WeakMap;Ls=new WeakMap;Fu=new WeakSet;lv=n(function(t){const e=ue(this,kt).activeSegment;if(!e)return;const i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${ue(this,Io).findIndex((s,o,l)=>{const d=l[o+1];return d!=null&&i>=s&&i<=d})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))},"updateActiveSegment_fn");Cs=new WeakSet;_d=n(function(){this.hasAttribute("disabled")||!this.isConnected||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))},"enableUserEvents_fn");Ds=new WeakSet;bd=n(function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),this.removeEventListener("pointerleave",this),(t=b.window)==null||t.removeEventListener("pointerup",this),(e=b.window)==null||e.removeEventListener("pointermove",this)},"disableUserEvents_fn");Ro=new WeakSet;Ku=n(function(t){var e;Si(this,ll,t.composedPath().includes(this.range)),(e=b.window)==null||e.addEventListener("pointerup",this,{once:!0})},"handlePointerDown_fn");gd=new WeakSet;dv=n(function(t){var e;t.pointerType!=="mouse"&&At(this,Ro,Ku).call(this,t),this.addEventListener("pointerleave",this,{once:!0}),(e=b.window)==null||e.addEventListener("pointermove",this)},"handlePointerEnter_fn");yd=new WeakSet;uv=n(function(){var t;(t=b.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")},"handlePointerUp_fn");Td=new WeakSet;cv=n(function(){var t,e;this.removeEventListener("pointerleave",this),(t=b.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=ue(this,kt).activeSegment)==null||e.style.removeProperty("transform")},"handlePointerLeave_fn");Ad=new WeakSet;hv=n(function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),At(this,Fu,lv).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!ue(this,ll))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))},"handlePointerMove_fn$1");br.shadowRootOptions={mode:"open"};br.getTemplateHTML=R1;br.getContainerTemplateHTML=L1;b.customElements.get("media-chrome-range")||b.customElements.define("media-chrome-range",br);var mv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$n"),Yn=n((t,e,i)=>(mv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$n"),C1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$n"),Gn=n((t,e,i,a)=>(mv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$j"),Ut;function D1(t){return`
    <style>
      :host {
        
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
  `}n(D1,"getTemplateHTML$b");class Vu extends b.HTMLElement{static{n(this,"MediaControlBar")}constructor(){if(super(),C1(this,Ut,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[j.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===j.MEDIA_CONTROLLER&&(i&&((s=(r=Yn(this,Ut))==null?void 0:r.unassociateElement)==null||s.call(r,this),Gn(this,Ut,null)),a&&this.isConnected&&(Gn(this,Ut,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=Yn(this,Ut))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(j.MEDIA_CONTROLLER);r&&(Gn(this,Ut,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Yn(this,Ut))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Yn(this,Ut))==null?void 0:e.unassociateElement)==null||i.call(e,this),Gn(this,Ut,null)}}Ut=new WeakMap;Vu.shadowRootOptions={mode:"open"};Vu.getTemplateHTML=D1;b.customElements.get("media-control-bar")||b.customElements.define("media-control-bar",Vu);var pv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$m"),zn=n((t,e,i)=>(pv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$m"),M1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$m"),Qn=n((t,e,i,a)=>(pv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$i"),Ht;function O1(t,e={}){return`
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

      
      :host(:focus-visible) {
        box-shadow: var(--media-focus-box-shadow, inset 0 0 0 2px rgb(27 127 204 / .9));
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}
  `}n(O1,"getTemplateHTML$a");function x1(t,e){return`
    <slot></slot>
  `}n(x1,"getSlotTemplateHTML$i");class Fi extends b.HTMLElement{static{n(this,"MediaTextDisplay")}constructor(){if(super(),M1(this,Ht,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[j.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===j.MEDIA_CONTROLLER&&(i&&((s=(r=zn(this,Ht))==null?void 0:r.unassociateElement)==null||s.call(r,this),Qn(this,Ht,null)),a&&this.isConnected&&(Qn(this,Ht,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=zn(this,Ht))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const{style:r}=Se(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const s=this.getAttribute(j.MEDIA_CONTROLLER);s&&(Qn(this,Ht,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=zn(this,Ht))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=zn(this,Ht))==null?void 0:e.unassociateElement)==null||i.call(e,this),Qn(this,Ht,null)}}Ht=new WeakMap;Fi.shadowRootOptions={mode:"open"};Fi.getTemplateHTML=O1;Fi.getSlotTemplateHTML=x1;b.customElements.get("media-text-display")||b.customElements.define("media-text-display",Fi);var vv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$l"),Uh=n((t,e,i)=>(vv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$l"),N1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$l"),P1=n((t,e,i,a)=>(vv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$h"),zr;function $1(t,e){return`
    <slot>${Wi(e.mediaDuration)}</slot>
  `}n($1,"getSlotTemplateHTML$h");class fv extends Fi{static{n(this,"MediaDurationDisplay")}constructor(){var e;super(),N1(this,zr,void 0),P1(this,zr,this.shadowRoot.querySelector("slot")),Uh(this,zr).textContent=Wi((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===h.MEDIA_DURATION&&(Uh(this,zr).textContent=Wi(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return ae(this,h.MEDIA_DURATION)}set mediaDuration(e){he(this,h.MEDIA_DURATION,e)}}zr=new WeakMap;fv.getSlotTemplateHTML=$1;b.customElements.get("media-duration-display")||b.customElements.define("media-duration-display",fv);const U1={2:L("Network Error"),3:L("Decode Error"),4:L("Source Not Supported"),5:L("Encryption Error")},H1={2:L("A network error caused the media download to fail."),3:L("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:L("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:L("The media is encrypted and there are no keys to decrypt it.")},qu=n(t=>{var e,i;return t.code===1?null:{title:(e=U1[t.code])!=null?e:`Error ${t.code}`,message:(i=H1[t.code])!=null?i:t.message}},"formatError");var Ev=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$k"),B1=n((t,e,i)=>(Ev(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$k"),W1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$k"),F1=n((t,e,i,a)=>(Ev(t,e,"write to private field"),e.set(t,i),i),"__privateSet$g"),Ms;function K1(t){return`
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
    <slot name="error-${t.mediaerrorcode}" id="content">
      ${_v({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}n(K1,"getSlotTemplateHTML$g");function V1(t){return t.code&&qu(t)!==null}n(V1,"shouldOpenErrorDialog");function _v(t){var e;const{title:i,message:a}=(e=qu(t))!=null?e:{};let r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}n(_v,"formatErrorMessage");const Hh=[h.MEDIA_ERROR_CODE,h.MEDIA_ERROR_MESSAGE];class dl extends _r{static{n(this,"MediaErrorDialog")}constructor(){super(...arguments),W1(this,Ms,null)}static get observedAttributes(){return[...super.observedAttributes,...Hh]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!Hh.includes(e))return;const s=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=V1(s),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(s),!this.hasAttribute("aria-label"))){const{title:o}=qu(s);o&&this.setAttribute("aria-label",o)}}get mediaError(){return B1(this,Ms)}set mediaError(e){F1(this,Ms,e)}get mediaErrorCode(){return ae(this,"mediaerrorcode")}set mediaErrorCode(e){he(this,"mediaerrorcode",e)}get mediaErrorMessage(){return le(this,"mediaerrormessage")}set mediaErrorMessage(e){re(this,"mediaerrormessage",e)}}Ms=new WeakMap;dl.getSlotTemplateHTML=K1;dl.formatErrorMessage=_v;b.customElements.get("media-error-dialog")||b.customElements.define("media-error-dialog",dl);var bv=dl,q1=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$j"),yi=n((t,e,i)=>(q1(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$j"),Bh=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$j"),Ma,Oa;function Y1(t){return`
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
      ${G1()}
    </slot>
  `}n(Y1,"getSlotTemplateHTML$f");function G1(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((s,o)=>o>0?`<span class="key-separator">or</span><span class="key">${s}</span>`:`<span class="key">${s}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}n(G1,"formatKeyboardShortcuts");class gv extends _r{static{n(this,"MediaKeyboardShortcutsDialog")}constructor(){super(...arguments),Bh(this,Ma,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const r=e.composedPath(),s=r[0]===this||r.includes(this),o=r.includes(a);s&&!o&&(this.open=!1)}),Bh(this,Oa,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",yi(this,Ma)),document.addEventListener("keydown",yi(this,Oa)))}disconnectedCallback(){this.removeEventListener("click",yi(this,Ma)),document.removeEventListener("keydown",yi(this,Oa))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",yi(this,Ma)),document.addEventListener("keydown",yi(this,Oa))):(this.removeEventListener("click",yi(this,Ma)),document.removeEventListener("keydown",yi(this,Oa))))}}Ma=new WeakMap;Oa=new WeakMap;gv.getSlotTemplateHTML=Y1;b.customElements.get("media-keyboard-shortcuts-dialog")||b.customElements.define("media-keyboard-shortcuts-dialog",gv);var yv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$i"),z1=n((t,e,i)=>(yv(t,e,"read from private field"),e.get(t)),"__privateGet$i"),Q1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$i"),j1=n((t,e,i,a)=>(yv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$f"),Os;const Z1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,X1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function J1(t){return`
    <style>
      :host([${h.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${h.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${h.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${h.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Z1}</slot>
      <slot name="exit">${X1}</slot>
    </slot>
  `}n(J1,"getSlotTemplateHTML$e");function ey(){return`
    <slot name="tooltip-enter">${L("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${L("Exit fullscreen mode")}</slot>
  `}n(ey,"getTooltipContentHTML$c");const Wh=n(t=>{const e=t.mediaIsFullscreen?L("exit fullscreen mode"):L("enter fullscreen mode");t.setAttribute("aria-label",e)},"updateAriaLabel$8");class Yu extends Me{static{n(this,"MediaFullscreenButton")}constructor(){super(...arguments),Q1(this,Os,null)}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_IS_FULLSCREEN,h.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Wh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_IS_FULLSCREEN&&Wh(this)}get mediaFullscreenUnavailable(){return le(this,h.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){re(this,h.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return Y(this,h.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){G(this,h.MEDIA_IS_FULLSCREEN,e)}handleClick(e){j1(this,Os,e);const i=z1(this,Os)instanceof PointerEvent,a=this.mediaIsFullscreen?new b.CustomEvent(C.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new b.CustomEvent(C.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}}Os=new WeakMap;Yu.getSlotTemplateHTML=J1;Yu.getTooltipContentHTML=ey;b.customElements.get("media-fullscreen-button")||b.customElements.define("media-fullscreen-button",Yu);const{MEDIA_TIME_IS_LIVE:xs,MEDIA_PAUSED:hn}=h,{MEDIA_SEEK_TO_LIVE_REQUEST:ty,MEDIA_PLAY_REQUEST:iy}=C,ay='<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>';function ry(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${xs}]:not([${hn}])) slot[name=indicator] > *,
      :host([${xs}]:not([${hn}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${xs}]:not([${hn}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${ay}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${L("live")}</slot>
  `}n(ry,"getSlotTemplateHTML$d");const Fh=n(t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=L(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const r=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');r&&(r.textContent=L("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")},"updateAriaAttributes");class Tv extends Me{static{n(this,"MediaLiveButton")}static get observedAttributes(){return[...super.observedAttributes,xs,hn]}connectedCallback(){super.connectedCallback(),Fh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Fh(this)}get mediaPaused(){return Y(this,h.MEDIA_PAUSED)}set mediaPaused(e){G(this,h.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return Y(this,h.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){G(this,h.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new b.CustomEvent(ty,{composed:!0,bubbles:!0})),this.hasAttribute(hn)&&this.dispatchEvent(new b.CustomEvent(iy,{composed:!0,bubbles:!0})))}}Tv.getSlotTemplateHTML=ry;b.customElements.get("media-live-button")||b.customElements.define("media-live-button",Tv);var Av=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$h"),Rr=n((t,e,i)=>(Av(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$h"),Kh=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$h"),Lr=n((t,e,i,a)=>(Av(t,e,"write to private field"),e.set(t,i),i),"__privateSet$e"),Bt,Ns;const jn={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},kv=500,ny=`
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
`;function sy(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${kv}ms);
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

      :host([${h.MEDIA_LOADING}]:not([${h.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${h.MEDIA_LOADING}]:not([${h.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${h.MEDIA_LOADING}]:not([${h.MEDIA_PAUSED}])) #status {
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

    <slot name="icon">${ny}</slot>
    <div id="status" role="status" aria-live="polite">${L("media loading")}</div>
  `}n(sy,"getTemplateHTML$9");class Gu extends b.HTMLElement{static{n(this,"MediaLoadingIndicator")}constructor(){if(super(),Kh(this,Bt,void 0),Kh(this,Ns,kv),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[j.MEDIA_CONTROLLER,h.MEDIA_PAUSED,h.MEDIA_LOADING,jn.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===jn.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===j.MEDIA_CONTROLLER&&(i&&((s=(r=Rr(this,Bt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Lr(this,Bt,null)),a&&this.isConnected&&(Lr(this,Bt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=Rr(this,Bt))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(j.MEDIA_CONTROLLER);r&&(Lr(this,Bt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Rr(this,Bt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Rr(this,Bt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Lr(this,Bt,null)}get loadingDelay(){return Rr(this,Ns)}set loadingDelay(e){Lr(this,Ns,e);const{style:i}=Se(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return Y(this,h.MEDIA_PAUSED)}set mediaPaused(e){G(this,h.MEDIA_PAUSED,e)}get mediaLoading(){return Y(this,h.MEDIA_LOADING)}set mediaLoading(e){G(this,h.MEDIA_LOADING,e)}get mediaController(){return le(this,j.MEDIA_CONTROLLER)}set mediaController(e){re(this,j.MEDIA_CONTROLLER,e)}get noAutohide(){return Y(this,jn.NO_AUTOHIDE)}set noAutohide(e){G(this,jn.NO_AUTOHIDE,e)}}Bt=new WeakMap;Ns=new WeakMap;Gu.shadowRootOptions={mode:"open"};Gu.getTemplateHTML=sy;b.customElements.get("media-loading-indicator")||b.customElements.define("media-loading-indicator",Gu);const oy=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,Vh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,ly=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function dy(t){return`
    <style>
      :host(:not([${h.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${h.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${h.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${h.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${h.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${h.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${h.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${oy}</slot>
      <slot name="low">${Vh}</slot>
      <slot name="medium">${Vh}</slot>
      <slot name="high">${ly}</slot>
    </slot>
  `}n(dy,"getSlotTemplateHTML$c");function uy(){return`
    <slot name="tooltip-mute">${L("Mute")}</slot>
    <slot name="tooltip-unmute">${L("Unmute")}</slot>
  `}n(uy,"getTooltipContentHTML$b");const qh=n(t=>{const e=t.mediaVolumeLevel==="off",i=L(e?"unmute":"mute");t.setAttribute("aria-label",i)},"updateAriaLabel$7");class zu extends Me{static{n(this,"MediaMuteButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),qh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_VOLUME_LEVEL&&qh(this)}get mediaVolumeLevel(){return le(this,h.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){re(this,h.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?C.MEDIA_UNMUTE_REQUEST:C.MEDIA_MUTE_REQUEST;this.dispatchEvent(new b.CustomEvent(e,{composed:!0,bubbles:!0}))}}zu.getSlotTemplateHTML=dy;zu.getTooltipContentHTML=uy;b.customElements.get("media-mute-button")||b.customElements.define("media-mute-button",zu);const Yh=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function cy(t){return`
    <style>
      :host([${h.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${h.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${h.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${h.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${Yh}</slot>
      <slot name="exit">${Yh}</slot>
    </slot>
  `}n(cy,"getSlotTemplateHTML$b");function hy(){return`
    <slot name="tooltip-enter">${L("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${L("Exit picture in picture mode")}</slot>
  `}n(hy,"getTooltipContentHTML$a");const Gh=n(t=>{const e=t.mediaIsPip?L("exit picture in picture mode"):L("enter picture in picture mode");t.setAttribute("aria-label",e)},"updateAriaLabel$6");class Qu extends Me{static{n(this,"MediaPipButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_IS_PIP,h.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Gh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_IS_PIP&&Gh(this)}get mediaPipUnavailable(){return le(this,h.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){re(this,h.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return Y(this,h.MEDIA_IS_PIP)}set mediaIsPip(e){G(this,h.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?C.MEDIA_EXIT_PIP_REQUEST:C.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new b.CustomEvent(e,{composed:!0,bubbles:!0}))}}Qu.getSlotTemplateHTML=cy;Qu.getTooltipContentHTML=hy;b.customElements.get("media-pip-button")||b.customElements.define("media-pip-button",Qu);var my=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$g"),ya=n((t,e,i)=>(my(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$g"),py=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$g"),wi;const Cl={RATES:"rates"},Sv=[1,1.2,1.5,1.7,2],Xa=1;function vy(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||Xa}x</slot>
  `}n(vy,"getSlotTemplateHTML$a");function fy(){return L("Playback rate")}n(fy,"getTooltipContentHTML$9");class ju extends Me{static{n(this,"MediaPlaybackRateButton")}constructor(){var e;super(),py(this,wi,new Du(this,Cl.RATES,{defaultValue:Sv})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:Xa}x`}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_PLAYBACK_RATE,Cl.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Cl.RATES&&(ya(this,wi).value=a),e===h.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,s=Number.isNaN(r)?Xa:r;this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",L("Playback rate {playbackRate}",{playbackRate:s}))}}get rates(){return ya(this,wi)}set rates(e){e?Array.isArray(e)?ya(this,wi).value=e.join(" "):typeof e=="string"&&(ya(this,wi).value=e):ya(this,wi).value=""}get mediaPlaybackRate(){return ae(this,h.MEDIA_PLAYBACK_RATE,Xa)}set mediaPlaybackRate(e){he(this,h.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(ya(this,wi).values(),o=>+o).sort((o,l)=>o-l),r=(i=(e=a.find(o=>o>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:Xa,s=new b.CustomEvent(C.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(s)}}wi=new WeakMap;ju.getSlotTemplateHTML=vy;ju.getTooltipContentHTML=fy;b.customElements.get("media-playback-rate-button")||b.customElements.define("media-playback-rate-button",ju);const Ey=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,_y=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function by(t){return`
    <style>
      :host([${h.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${h.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${h.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${h.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${Ey}</slot>
      <slot name="pause">${_y}</slot>
    </slot>
  `}n(by,"getSlotTemplateHTML$9");function gy(){return`
    <slot name="tooltip-play">${L("Play")}</slot>
    <slot name="tooltip-pause">${L("Pause")}</slot>
  `}n(gy,"getTooltipContentHTML$8");const zh=n(t=>{const e=t.mediaPaused?L("play"):L("pause");t.setAttribute("aria-label",e)},"updateAriaLabel$5");class Zu extends Me{static{n(this,"MediaPlayButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_PAUSED,h.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),zh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===h.MEDIA_PAUSED||e===h.MEDIA_LANG)&&zh(this)}get mediaPaused(){return Y(this,h.MEDIA_PAUSED)}set mediaPaused(e){G(this,h.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?C.MEDIA_PLAY_REQUEST:C.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new b.CustomEvent(e,{composed:!0,bubbles:!0}))}}Zu.getSlotTemplateHTML=by;Zu.getTooltipContentHTML=gy;b.customElements.get("media-play-button")||b.customElements.define("media-play-button",Zu);const Ct={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function yy(t){return`
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
  `}n(yy,"getTemplateHTML$8");const Ty=n(t=>{t.style.removeProperty("background-image")},"unsetBackgroundImage"),Ay=n((t,e)=>{t.style["background-image"]=`url('${e}')`},"setBackgroundImage");class Xu extends b.HTMLElement{static{n(this,"MediaPosterImage")}static get observedAttributes(){return[Ct.PLACEHOLDER_SRC,Ct.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Ct.SRC&&(a==null?this.image.removeAttribute(Ct.SRC):this.image.setAttribute(Ct.SRC,a)),e===Ct.PLACEHOLDER_SRC&&(a==null?Ty(this.image):Ay(this.image,a))}get placeholderSrc(){return le(this,Ct.PLACEHOLDER_SRC)}set placeholderSrc(e){re(this,Ct.SRC,e)}get src(){return le(this,Ct.SRC)}set src(e){re(this,Ct.SRC,e)}}Xu.shadowRootOptions={mode:"open"};Xu.getTemplateHTML=yy;b.customElements.get("media-poster-image")||b.customElements.define("media-poster-image",Xu);var wv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$f"),ky=n((t,e,i)=>(wv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$f"),Sy=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$f"),wy=n((t,e,i,a)=>(wv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$d"),Ps;class Iy extends Fi{static{n(this,"MediaPreviewChapterDisplay")}constructor(){super(),Sy(this,Ps,void 0),wy(this,Ps,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_PREVIEW_CHAPTER,h.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===h.MEDIA_PREVIEW_CHAPTER||e===h.MEDIA_LANG)&&a!==i&&a!=null)if(ky(this,Ps).textContent=a,a!==""){const r=L("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",r)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return le(this,h.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){re(this,h.MEDIA_PREVIEW_CHAPTER,e)}}Ps=new WeakMap;b.customElements.get("media-preview-chapter-display")||b.customElements.define("media-preview-chapter-display",Iy);var Iv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$e"),Zn=n((t,e,i)=>(Iv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$e"),Ry=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$e"),Xn=n((t,e,i,a)=>(Iv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$c"),Wt;function Ly(t){return`
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
  `}n(Ly,"getTemplateHTML$7");class ul extends b.HTMLElement{static{n(this,"MediaPreviewThumbnail")}constructor(){if(super(),Ry(this,Wt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[j.MEDIA_CONTROLLER,h.MEDIA_PREVIEW_IMAGE,h.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const r=this.getAttribute(j.MEDIA_CONTROLLER);r&&(Xn(this,Wt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Zn(this,Wt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Zn(this,Wt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Xn(this,Wt,null)}attributeChangedCallback(e,i,a){var r,s,o,l,d;[h.MEDIA_PREVIEW_IMAGE,h.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===j.MEDIA_CONTROLLER&&(i&&((s=(r=Zn(this,Wt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Xn(this,Wt,null)),a&&this.isConnected&&(Xn(this,Wt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=Zn(this,Wt))==null?void 0:l.associateElement)==null||d.call(l,this)))}get mediaPreviewImage(){return le(this,h.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){re(this,h.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(h.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(h.MEDIA_PREVIEW_COORDS);return}this.setAttribute(h.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,r,s,o]=e,l=i.split("#")[0],d=getComputedStyle(this),{maxWidth:c,maxHeight:p,minWidth:v,minHeight:m}=d,u=d.getPropertyValue("--media-preview-thumbnail-object-fit").trim()||"contain";let f,_;if(u==="fill"){const D=parseInt(c)/s,U=parseInt(p)/o,W=parseInt(v)/s,z=parseInt(m)/o;f=D<1?D:Math.max(D,W),_=U<1?U:Math.max(U,z)}else{const D=Math.min(parseInt(c)/s,parseInt(p)/o),U=Math.max(parseInt(v)/s,parseInt(m)/o),z=D<1?D:U>1?U:1;f=z,_=z}const{style:g}=Se(this.shadowRoot,":host"),T=Se(this.shadowRoot,"img").style,A=this.shadowRoot.querySelector("img"),S=Math.min(f,_)<1?"min":"max";g.setProperty(`${S}-width`,"initial","important"),g.setProperty(`${S}-height`,"initial","important"),g.width=`${s*f}px`,g.height=`${o*_}px`;const M=n(()=>{T.width=`${this.imgWidth*f}px`,T.height=`${this.imgHeight*_}px`,T.display="block"},"resize");A.src!==l&&(A.onload=()=>{this.imgWidth=A.naturalWidth,this.imgHeight=A.naturalHeight,M(),A.onload=null},A.src=l,M()),M(),T.transform=`translate(-${a*f}px, -${r*_}px)`}}Wt=new WeakMap;ul.shadowRootOptions={mode:"open"};ul.getTemplateHTML=Ly;b.customElements.get("media-preview-thumbnail")||b.customElements.define("media-preview-thumbnail",ul);var Qh=ul,Rv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$d"),jh=n((t,e,i)=>(Rv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$d"),Cy=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$d"),Dy=n((t,e,i,a)=>(Rv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$b"),Qr;class My extends Fi{static{n(this,"MediaPreviewTimeDisplay")}constructor(){super(),Cy(this,Qr,void 0),Dy(this,Qr,this.shadowRoot.querySelector("slot")),jh(this,Qr).textContent=Wi(0)}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_PREVIEW_TIME&&a!=null&&(jh(this,Qr).textContent=Wi(parseFloat(a)))}get mediaPreviewTime(){return ae(this,h.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){he(this,h.MEDIA_PREVIEW_TIME,e)}}Qr=new WeakMap;b.customElements.get("media-preview-time-display")||b.customElements.define("media-preview-time-display",My);const Ta={SEEK_OFFSET:"seekoffset"},Dl=30,Oy=n(t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`,"backwardIcon");function xy(t,e){return`
    <slot name="icon">${Oy(e.seekOffset)}</slot>
  `}n(xy,"getSlotTemplateHTML$8");const Ny=n((t,e)=>{t.setAttribute("aria-label",L("seek back {seekOffset} seconds",{seekOffset:e}))},"updateAriaLabel$4");function Py(){return L("Seek backward")}n(Py,"getTooltipContentHTML$7");const $y=0;class Ju extends Me{static{n(this,"MediaSeekBackwardButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_CURRENT_TIME,Ta.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ae(this,Ta.SEEK_OFFSET,Dl)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),Ny(this,this.seekOffset),e===Ta.SEEK_OFFSET&&(this.seekOffset=ae(this,Ta.SEEK_OFFSET,Dl))}get seekOffset(){return ae(this,Ta.SEEK_OFFSET,Dl)}set seekOffset(e){he(this,Ta.SEEK_OFFSET,e),this.setAttribute("aria-label",L("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),Pp($p(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ae(this,h.MEDIA_CURRENT_TIME,$y)}set mediaCurrentTime(e){he(this,h.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new b.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}Ju.getSlotTemplateHTML=xy;Ju.getTooltipContentHTML=Py;b.customElements.get("media-seek-backward-button")||b.customElements.define("media-seek-backward-button",Ju);const Aa={SEEK_OFFSET:"seekoffset"},Ml=30,Uy=n(t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`,"forwardIcon");function Hy(t,e){return`
    <slot name="icon">${Uy(e.seekOffset)}</slot>
  `}n(Hy,"getSlotTemplateHTML$7");const By=n((t,e)=>{t.setAttribute("aria-label",L("seek forward {seekOffset} seconds",{seekOffset:e}))},"updateAriaLabel$3");function Wy(){return L("Seek forward")}n(Wy,"getTooltipContentHTML$6");const Fy=0;class ec extends Me{static{n(this,"MediaSeekForwardButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_CURRENT_TIME,Aa.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ae(this,Aa.SEEK_OFFSET,Ml)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),By(this,this.seekOffset),e===Aa.SEEK_OFFSET&&(this.seekOffset=ae(this,Aa.SEEK_OFFSET,Ml))}get seekOffset(){return ae(this,Aa.SEEK_OFFSET,Ml)}set seekOffset(e){he(this,Aa.SEEK_OFFSET,e),this.setAttribute("aria-label",L("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),Pp($p(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ae(this,h.MEDIA_CURRENT_TIME,Fy)}set mediaCurrentTime(e){he(this,h.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new b.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}ec.getSlotTemplateHTML=Hy;ec.getTooltipContentHTML=Wy;b.customElements.get("media-seek-forward-button")||b.customElements.define("media-seek-forward-button",ec);var tc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$c"),wt=n((t,e,i)=>(tc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$c"),zi=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$c"),ic=n((t,e,i,a)=>(tc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$a"),Mi=n((t,e,i)=>(tc(t,e,"access private method"),i),"__privateMethod$9"),xa,Xt,cl,ac,Lv,Lo,rc,jr,$s,Us,kd;const Ii={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},Zh=[...Object.values(Ii),h.MEDIA_CURRENT_TIME,h.MEDIA_DURATION,h.MEDIA_SEEKABLE],Cv=["Enter"," "],Ky="&nbsp;/&nbsp;",Sd=n((t,{timesSep:e=Ky}={})=>{var i,a;const r=(i=t.mediaCurrentTime)!=null?i:0,[,s]=(a=t.mediaSeekable)!=null?a:[];let o=0;Number.isFinite(t.mediaDuration)?o=t.mediaDuration:Number.isFinite(s)&&(o=s);const l=t.remaining?Wi(0-(o-r)):Wi(r);return t.showDuration?`${l}${e}${Wi(o)}`:l},"formatTimesLabel"),Vy=n(t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-description",L("video not loaded, unknown time."));return}const s=t.remaining?un(0-(r-i)):un(i);if(!t.showDuration){t.setAttribute("aria-description",s);return}const o=un(r),l=L("{currentTime} of {totalTime}",{currentTime:s,totalTime:o});t.setAttribute("aria-description",l)},"updateAriaDescription");function qy(t,e){return`
    <slot>${Sd(e)}</slot>
  `}n(qy,"getSlotTemplateHTML$6");const Yy=n(t=>{t.setAttribute("aria-label",L("playback time"))},"updateAriaLabel$2");class Dv extends Fi{static{n(this,"MediaTimeDisplay")}constructor(){super(),zi(this,ac),zi(this,Lo),zi(this,jr),zi(this,Us),zi(this,xa,void 0),zi(this,Xt,null),zi(this,cl,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!Cv.includes(r)){this.removeEventListener("keyup",wt(this,Xt));return}this.addEventListener("keyup",wt(this,Xt))}),ic(this,xa,this.shadowRoot.querySelector("slot")),wt(this,xa).innerHTML=`${Sd(this)}`}static get observedAttributes(){return[...super.observedAttributes,...Zh,"disabled"]}connectedCallback(){const{style:e}=Se(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.setAttribute("aria-label",L("playback time")),Mi(this,jr,$s).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),Mi(this,Lo,rc).call(this),super.disconnectedCallback()}attributeChangedCallback(e,i,a){Yy(this),Zh.includes(e)?this.update():e==="disabled"&&a!==i?a==null?Mi(this,jr,$s).call(this):Mi(this,Us,kd).call(this):e===Ii.NO_TOGGLE&&a!==i&&(this.noToggle?Mi(this,Us,kd).call(this):Mi(this,jr,$s).call(this)),super.attributeChangedCallback(e,i,a)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return Y(this,Ii.REMAINING)}set remaining(e){G(this,Ii.REMAINING,e)}get showDuration(){return Y(this,Ii.SHOW_DURATION)}set showDuration(e){G(this,Ii.SHOW_DURATION,e)}get noToggle(){return Y(this,Ii.NO_TOGGLE)}set noToggle(e){G(this,Ii.NO_TOGGLE,e)}get mediaDuration(){return ae(this,h.MEDIA_DURATION)}set mediaDuration(e){he(this,h.MEDIA_DURATION,e)}get mediaCurrentTime(){return ae(this,h.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){he(this,h.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(h.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(h.MEDIA_SEEKABLE);return}this.setAttribute(h.MEDIA_SEEKABLE,e.join(":"))}update(){const e=Sd(this);Vy(this),e!==wt(this,xa).innerHTML&&(wt(this,xa).innerHTML=e)}}xa=new WeakMap;Xt=new WeakMap;cl=new WeakMap;ac=new WeakSet;Lv=n(function(){wt(this,Xt)||(ic(this,Xt,t=>{const{key:e}=t;if(!Cv.includes(e)){this.removeEventListener("keyup",wt(this,Xt));return}this.toggleTimeDisplay()}),this.addEventListener("keydown",wt(this,cl)),this.addEventListener("click",this.toggleTimeDisplay))},"setupEventListeners_fn");Lo=new WeakSet;rc=n(function(){wt(this,Xt)&&(this.removeEventListener("keyup",wt(this,Xt)),this.removeEventListener("keydown",wt(this,cl)),this.removeEventListener("click",this.toggleTimeDisplay),ic(this,Xt,null))},"removeEventListeners_fn");jr=new WeakSet;$s=n(function(){!this.noToggle&&!this.hasAttribute("disabled")&&(this.setAttribute("role","button"),this.enable(),Mi(this,ac,Lv).call(this))},"makeInteractive_fn");Us=new WeakSet;kd=n(function(){this.removeAttribute("role"),this.disable(),Mi(this,Lo,rc).call(this)},"makeNonInteractive_fn");Dv.getSlotTemplateHTML=qy;b.customElements.get("media-time-display")||b.customElements.define("media-time-display",Dv);var Mv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$b"),Le=n((t,e,i)=>(Mv(t,e,"read from private field"),e.get(t)),"__privateGet$b"),Dt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$b"),et=n((t,e,i,a)=>(Mv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$9"),Gy=n((t,e,i,a)=>({set _(r){et(t,e,r)},get _(){return Le(t,e)}}),"__privateWrapper"),Na,Hs,Pa,Zr,Bs,Ws,Fs,$a,Ji,Ks;class zy{static{n(this,"RangeAnimation")}constructor(e,i,a){Dt(this,Na,void 0),Dt(this,Hs,void 0),Dt(this,Pa,void 0),Dt(this,Zr,void 0),Dt(this,Bs,void 0),Dt(this,Ws,void 0),Dt(this,Fs,void 0),Dt(this,$a,void 0),Dt(this,Ji,0),Dt(this,Ks,(r=performance.now())=>{et(this,Ji,requestAnimationFrame(Le(this,Ks))),et(this,Zr,performance.now()-Le(this,Pa));const s=1e3/this.fps;if(Le(this,Zr)>s){et(this,Pa,r-Le(this,Zr)%s);const o=1e3/((r-Le(this,Hs))/++Gy(this,Bs)._),l=(r-Le(this,Ws))/1e3/this.duration;let d=Le(this,Fs)+l*this.playbackRate;d-Le(this,Na).valueAsNumber>0?et(this,$a,this.playbackRate/this.duration/o):(et(this,$a,.995*Le(this,$a)),d=Le(this,Na).valueAsNumber+Le(this,$a)),this.callback(d)}}),et(this,Na,e),this.callback=i,this.fps=a}start(){Le(this,Ji)===0&&(et(this,Pa,performance.now()),et(this,Hs,Le(this,Pa)),et(this,Bs,0),Le(this,Ks).call(this))}stop(){Le(this,Ji)!==0&&(cancelAnimationFrame(Le(this,Ji)),et(this,Ji,0))}update({start:e,duration:i,playbackRate:a}){const r=e-Le(this,Na).valueAsNumber,s=Math.abs(i-this.duration);(r>0||r<-.03||s>=.5)&&this.callback(e),et(this,Fs,e),et(this,Ws,performance.now()),this.duration=i,this.playbackRate=a}}Na=new WeakMap;Hs=new WeakMap;Pa=new WeakMap;Zr=new WeakMap;Bs=new WeakMap;Ws=new WeakMap;Fs=new WeakMap;$a=new WeakMap;Ji=new WeakMap;Ks=new WeakMap;var nc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$a"),se=n((t,e,i)=>(nc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$a"),Ae=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$a"),ot=n((t,e,i,a)=>(nc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$8"),ut=n((t,e,i)=>(nc(t,e,"access private method"),i),"__privateMethod$8"),Ua,Oi,Co,mn,Do,Vs,Cn,Dn,Ha,Ba,Xr,wd,Ov,Id,Mo,sc,Oo,oc,xo,lc,Rd,xv,Mn,No,Ld,Nv;const Qy=n(t=>{const e=t.range,i=un(+Pv(t)),a=un(+t.mediaSeekableEnd),r=i&&a?L("{currentTime} of {totalTime}",{currentTime:i,totalTime:a}):L("video not loaded, unknown time.");e.setAttribute("aria-valuetext",r)},"updateAriaValueText");function jy(t){return`
    <style>
      :host {
        --media-box-border-radius: 4px;
        --media-box-padding-left: 10px;
        --media-box-padding-right: 10px;
        --media-preview-border-radius: var(--media-box-border-radius);
        --media-box-arrow-offset: var(--media-box-border-radius);
        --_control-background: var(--media-control-background, var(--media-secondary-color, rgb(20 20 30 / .7)));
        --_preview-background: var(--media-preview-background, var(--_control-background));

        
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

      :host(:is([${h.MEDIA_PREVIEW_IMAGE}], [${h.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${h.MEDIA_PREVIEW_IMAGE}], [${h.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
          transition-duration: var(--media-preview-transition-duration-in, .5s);
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
          opacity: 1;
        }
      }

      media-preview-thumbnail,
      ::slotted(media-preview-thumbnail) {
        visibility: hidden;
        
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

      :host([${h.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${h.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${h.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${h.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${h.MEDIA_PREVIEW_TIME}]:hover) {
          --media-time-range-hover-display: block;
        }
      }

      media-preview-chapter-display,
      ::slotted(media-preview-chapter-display) {
        font-size: var(--media-font-size, 13px);
        line-height: 17px;
        min-width: 0;
        visibility: hidden;
        
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

      :host([${h.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${h.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${h.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${h.MEDIA_PREVIEW_CHAPTER}]) {
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

      :host([${h.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${h.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${h.MEDIA_PREVIEW_TIME}]:hover) {
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
          <template shadowrootmode="${Qh.shadowRootOptions.mode}">
            ${Qh.getTemplateHTML({})}
          </template>
        </media-preview-thumbnail>
        <media-preview-chapter-display></media-preview-chapter-display>
        <media-preview-time-display></media-preview-time-display>
        <slot name="preview-arrow"><div part="arrow"></div></slot>
      </slot>
    </div>
    <div id="current-rail">
      <slot name="current" part="box current-box">
        
      </slot>
    </div>
  `}n(jy,"getContainerTemplateHTML");const Jn=n((t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},"calcRangeValueFromTime"),Pv=n((t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i},"calcTimeFromRangeValue");class dc extends br{static{n(this,"MediaTimeRange")}constructor(){super(),Ae(this,wd),Ae(this,Mo),Ae(this,Oo),Ae(this,xo),Ae(this,Rd),Ae(this,Mn),Ae(this,Ld),Ae(this,Ua,null),Ae(this,Oi,void 0),Ae(this,Co,void 0),Ae(this,mn,void 0),Ae(this,Do,void 0),Ae(this,Vs,void 0),Ae(this,Cn,void 0),Ae(this,Dn,void 0),Ae(this,Ha,void 0),Ae(this,Ba,void 0),Ae(this,Xr,()=>{ut(this,wd,Ov).call(this)?se(this,Oi).start():se(this,Oi).stop()}),Ae(this,Id,a=>{this.dragging||(Su(a)&&(this.range.valueAsNumber=a),se(this,Ba)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),ot(this,Co,this.shadowRoot.querySelectorAll('[part~="box"]')),ot(this,Do,this.shadowRoot.querySelector('[part~="preview-box"]')),ot(this,Vs,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);ot(this,Cn,parseInt(i.getPropertyValue("--media-box-padding-left"))),ot(this,Dn,parseInt(i.getPropertyValue("--media-box-padding-right"))),ot(this,Oi,new zy(this.range,se(this,Id),60))}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_PAUSED,h.MEDIA_DURATION,h.MEDIA_SEEKABLE,h.MEDIA_CURRENT_TIME,h.MEDIA_PREVIEW_IMAGE,h.MEDIA_PREVIEW_TIME,h.MEDIA_PREVIEW_CHAPTER,h.MEDIA_BUFFERED,h.MEDIA_PLAYBACK_RATE,h.MEDIA_LOADING,h.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",L("seek")),se(this,Xr).call(this),ot(this,Ua,this.getRootNode()),(e=se(this,Ua))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),se(this,Oi).stop(),(e=se(this,Ua))==null||e.removeEventListener("transitionstart",this),ot(this,Ua,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===h.MEDIA_CURRENT_TIME||e===h.MEDIA_PAUSED||e===h.MEDIA_ENDED||e===h.MEDIA_LOADING||e===h.MEDIA_DURATION||e===h.MEDIA_SEEKABLE?(se(this,Oi).update({start:Jn(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),se(this,Xr).call(this),Qy(this)):e===h.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===h.MEDIA_DURATION||e===h.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=se(this,Ha),this.updateBar()))}get mediaChaptersCues(){return se(this,Ha)}set mediaChaptersCues(e){var i;ot(this,Ha,e),this.updateSegments((i=se(this,Ha))==null?void 0:i.map(a=>({start:Jn(this,a.startTime),end:Jn(this,a.endTime)})))}get mediaPaused(){return Y(this,h.MEDIA_PAUSED)}set mediaPaused(e){G(this,h.MEDIA_PAUSED,e)}get mediaLoading(){return Y(this,h.MEDIA_LOADING)}set mediaLoading(e){G(this,h.MEDIA_LOADING,e)}get mediaDuration(){return ae(this,h.MEDIA_DURATION)}set mediaDuration(e){he(this,h.MEDIA_DURATION,e)}get mediaCurrentTime(){return ae(this,h.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){he(this,h.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return ae(this,h.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){he(this,h.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(h.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(h.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(h.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(h.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(h.MEDIA_SEEKABLE);return}this.setAttribute(h.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return le(this,h.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){re(this,h.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return ae(this,h.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){he(this,h.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return Y(this,h.MEDIA_ENDED)}set mediaEnded(e){G(this,h.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const s=this.mediaCurrentTime,[,o=this.mediaSeekableStart]=(e=i.find(([l,d])=>l<=s&&s<=d))!=null?e:[];a=Jn(this,o)}const{style:r}=Se(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=Se(this.shadowRoot,"#current-rail"),a=Se(this.shadowRoot,'[part~="current-box"]'),r=ut(this,Mo,sc).call(this,se(this,Vs)),s=ut(this,Oo,oc).call(this,r,this.range.valueAsNumber),o=ut(this,xo,lc).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${s})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${o}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":ut(this,Ld,Nv).call(this);break;case"pointermove":ut(this,Rd,xv).call(this,e);break;case"pointerup":se(this,Ba)&&ot(this,Ba,!1);break;case"pointerdown":ot(this,Ba,!0);break;case"pointerleave":ut(this,Mn,No).call(this,null);break;case"transitionstart":bi(e.target,this)&&setTimeout(()=>se(this,Xr).call(this),0);break}}}Ua=new WeakMap;Oi=new WeakMap;Co=new WeakMap;mn=new WeakMap;Do=new WeakMap;Vs=new WeakMap;Cn=new WeakMap;Dn=new WeakMap;Ha=new WeakMap;Ba=new WeakMap;Xr=new WeakMap;wd=new WeakSet;Ov=n(function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Up(this)},"shouldRangeAnimate_fn");Id=new WeakMap;Mo=new WeakSet;sc=n(function(t){var e;const a=((e=this.getAttribute("bounds")?Er(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),s=t.offsetWidth,o=-(r.left-a.left-s/2),l=a.right-r.left-s/2;return{box:{width:s,min:o,max:l},bounds:a,range:r}},"getElementRects_fn");Oo=new WeakSet;oc=n(function(t,e){let i=`${e*100}%`;const{width:a,min:r,max:s}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(s)){const l=`calc(1 / var(--_range-width) * 100 * ${s}% - var(--media-box-padding-right))`;i=`min(${i}, ${l})`}return i},"getBoxPosition_fn");xo=new WeakSet;lc=n(function(t,e){const{width:i,min:a,max:r}=t.box,s=e*t.range.width;if(s<a+se(this,Cn)){const o=t.range.left-t.bounds.left-se(this,Cn);return`${s-i/2+o}px`}if(s>r-se(this,Dn)){const o=t.bounds.right-t.range.right-se(this,Dn);return`${s+i/2-o-t.range.width}px`}return 0},"getBoxShiftPosition_fn");Rd=new WeakSet;xv=n(function(t){const e=[...se(this,Co)].some(p=>t.composedPath().includes(p));if(!this.dragging&&(e||!t.composedPath().includes(this))){ut(this,Mn,No).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=Se(this.shadowRoot,"#preview-rail"),r=Se(this.shadowRoot,'[part~="preview-box"]'),s=ut(this,Mo,sc).call(this,se(this,Do));let o=(t.clientX-s.range.left)/s.range.width;o=Math.max(0,Math.min(1,o));const l=ut(this,Oo,oc).call(this,s,o),d=ut(this,xo,lc).call(this,s,o);a.style.transform=`translateX(${l})`,a.style.setProperty("--_range-width",`${s.range.width}`),r.style.setProperty("--_box-shift",`${d}`),r.style.setProperty("--_box-width",`${s.box.width}px`);const c=Math.round(se(this,mn))-Math.round(o*i);Math.abs(c)<1&&o>.01&&o<.99||(ot(this,mn,o*i),ut(this,Mn,No).call(this,se(this,mn)))},"handlePointerMove_fn");Mn=new WeakSet;No=n(function(t){this.dispatchEvent(new b.CustomEvent(C.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))},"previewRequest_fn");Ld=new WeakSet;Nv=n(function(){se(this,Oi).stop();const t=Pv(this);this.dispatchEvent(new b.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))},"seekRequest_fn");dc.shadowRootOptions={mode:"open"};dc.getContainerTemplateHTML=jy;b.customElements.get("media-time-range")||b.customElements.define("media-time-range",dc);var Zy=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$9"),Xh=n((t,e,i)=>(Zy(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$9"),Xy=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$9"),qs;const Jy=1,eT=n(t=>t.mediaMuted?0:t.mediaVolume,"toVolume"),tT=n(t=>`${Math.round(t*100)}%`,"formatAsPercentString");class iT extends br{static{n(this,"MediaVolumeRange")}constructor(){super(...arguments),Xy(this,qs,()=>{const e=this.range.value,i=new b.CustomEvent(C.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_VOLUME,h.MEDIA_MUTED,h.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",L("volume")),this.range.addEventListener("input",Xh(this,qs))}disconnectedCallback(){this.range.removeEventListener("input",Xh(this,qs)),super.disconnectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===h.MEDIA_VOLUME||e===h.MEDIA_MUTED)&&(this.range.valueAsNumber=eT(this),this.range.setAttribute("aria-valuetext",tT(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return ae(this,h.MEDIA_VOLUME,Jy)}set mediaVolume(e){he(this,h.MEDIA_VOLUME,e)}get mediaMuted(){return Y(this,h.MEDIA_MUTED)}set mediaMuted(e){G(this,h.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return le(this,h.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){re(this,h.MEDIA_VOLUME_UNAVAILABLE,e)}}qs=new WeakMap;b.customElements.get("media-volume-range")||b.customElements.define("media-volume-range",iT);function aT(t){return`
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

        :host([${h.MEDIA_LOOP}]) #checked-indicator {
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
    `}n(aT,"getSlotTemplateHTML$5");function rT(){return L("Loop")}n(rT,"getTooltipContentHTML$5");class uc extends Me{static{n(this,"MediaLoopButton")}constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=L("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return Y(this,h.MEDIA_LOOP)}set mediaLoop(e){G(this,h.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new b.CustomEvent(C.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}uc.getSlotTemplateHTML=aT;uc.getTooltipContentHTML=rT;b.customElements.get("media-loop-button")||b.customElements.define("media-loop-button",uc);var $v=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$8"),K=n((t,e,i)=>($v(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$8"),Yt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$8"),mi=n((t,e,i,a)=>($v(t,e,"write to private field"),e.set(t,i),i),"__privateSet$7"),Wa,Ys,ea,Jr,Ri,Li,Ci,ta,Fa,Gs,yt;const Jh=1,em=0,nT=1,sT={processCallback(t,e,i){if(i){for(const[a,r]of e)if(a in i){const s=i[a];typeof s=="boolean"&&r instanceof Rt&&typeof r.element[r.attributeName]=="boolean"?r.booleanValue=s:typeof s=="function"&&r instanceof Rt?r.element[r.attributeName]=s:r.value=s}}}};class hl extends b.DocumentFragment{static{n(this,"TemplateInstance")}constructor(e,i,a=sT){var r;super(),Yt(this,Wa,void 0),Yt(this,Ys,void 0),this.append(e.content.cloneNode(!0)),mi(this,Wa,Uv(this)),mi(this,Ys,a),(r=a.createCallback)==null||r.call(a,this,K(this,Wa),i),a.processCallback(this,K(this,Wa),i)}update(e){K(this,Ys).processCallback(this,K(this,Wa),e)}}Wa=new WeakMap;Ys=new WeakMap;const Uv=n((t,e=[])=>{let i,a;for(const r of t.attributes||[])if(r.value.includes("{{")){const s=new lT;for([i,a]of im(r.value))if(!i)s.append(a);else{const o=new Rt(t,r.name,r.namespaceURI);s.append(o),e.push([a,o])}r.value=s.toString()}for(const r of t.childNodes)if(r.nodeType===Jh&&!(r instanceof HTMLTemplateElement))Uv(r,e);else{const s=r.data;if(r.nodeType===Jh||s.includes("{{")){const o=[];if(s)for([i,a]of im(s))if(!i)o.push(new Text(a));else{const l=new gr(t);o.push(l),e.push([a,l])}else if(r instanceof HTMLTemplateElement){const l=new Wv(t,r);o.push(l),e.push([l.expression,l])}r.replaceWith(...o.flatMap(l=>l.replacementNodes||[l]))}}return e},"parse"),tm={},im=n(t=>{let e="",i=0,a=tm[t],r=0,s;if(a)return a;for(a=[];s=t[r];r++)s==="{"&&t[r+1]==="{"&&t[r-1]!=="\\"&&t[r+2]&&++i==1?(e&&a.push([em,e]),e="",r++):s==="}"&&t[r+1]==="}"&&t[r-1]!=="\\"&&!--i?(a.push([nT,e.trim()]),e="",r++):e+=s||"";return e&&a.push([em,(i>0?"{{":"")+e]),tm[t]=a},"tokenize$1"),oT=11;class Hv{static{n(this,"Part")}get value(){return""}set value(e){}toString(){return this.value}}const Bv=new WeakMap;class lT{static{n(this,"AttrPartList")}constructor(){Yt(this,ea,[])}[Symbol.iterator](){return K(this,ea).values()}get length(){return K(this,ea).length}item(e){return K(this,ea)[e]}append(...e){for(const i of e)i instanceof Rt&&Bv.set(i,this),K(this,ea).push(i)}toString(){return K(this,ea).join("")}}ea=new WeakMap;class Rt extends Hv{static{n(this,"AttrPart")}constructor(e,i,a){super(),Yt(this,ta),Yt(this,Jr,""),Yt(this,Ri,void 0),Yt(this,Li,void 0),Yt(this,Ci,void 0),mi(this,Ri,e),mi(this,Li,i),mi(this,Ci,a)}get attributeName(){return K(this,Li)}get attributeNamespace(){return K(this,Ci)}get element(){return K(this,Ri)}get value(){return K(this,Jr)}set value(e){K(this,Jr)!==e&&(mi(this,Jr,e),!K(this,ta,Fa)||K(this,ta,Fa).length===1?e==null?K(this,Ri).removeAttributeNS(K(this,Ci),K(this,Li)):K(this,Ri).setAttributeNS(K(this,Ci),K(this,Li),e):K(this,Ri).setAttributeNS(K(this,Ci),K(this,Li),K(this,ta,Fa).toString()))}get booleanValue(){return K(this,Ri).hasAttributeNS(K(this,Ci),K(this,Li))}set booleanValue(e){if(!K(this,ta,Fa)||K(this,ta,Fa).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}}Jr=new WeakMap;Ri=new WeakMap;Li=new WeakMap;Ci=new WeakMap;ta=new WeakSet;Fa=n(function(){return Bv.get(this)},"list_get");class gr extends Hv{static{n(this,"ChildNodePart")}constructor(e,i){super(),Yt(this,Gs,void 0),Yt(this,yt,void 0),mi(this,Gs,e),mi(this,yt,i?[...i]:[new Text])}get replacementNodes(){return K(this,yt)}get parentNode(){return K(this,Gs)}get nextSibling(){return K(this,yt)[K(this,yt).length-1].nextSibling}get previousSibling(){return K(this,yt)[0].previousSibling}get value(){return K(this,yt).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){const i=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===oT?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);i.length||i.push(new Text),mi(this,yt,dT(K(this,yt)[0].parentNode,K(this,yt),i,this.nextSibling))}}Gs=new WeakMap;yt=new WeakMap;class Wv extends gr{static{n(this,"InnerTemplatePart")}constructor(e,i){const a=i.getAttribute("directive")||i.getAttribute("type");let r=i.getAttribute("expression")||i.getAttribute(a)||"";r.startsWith("{{")&&(r=r.trim().slice(2,-2).trim()),super(e),this.expression=r,this.template=i,this.directive=a}}function dT(t,e,i,a=null){let r=0,s,o,l,d=i.length,c=e.length;for(;r<d&&r<c&&e[r]==i[r];)r++;for(;r<d&&r<c&&i[d-1]==e[c-1];)a=i[--c,--d];if(r==c)for(;r<d;)t.insertBefore(i[r++],a);if(r==d)for(;r<c;)t.removeChild(e[r++]);else{for(s=e[r];r<d;)l=i[r++],o=s?s.nextSibling:a,s==l?s=o:r<d&&i[r]==o?(t.replaceChild(l,s),s=o):t.insertBefore(l,s);for(;s!=a;)o=s.nextSibling,t.removeChild(s),s=o}return i}n(dT,"swapdom");const am={string:n(t=>String(t),"string")};class Fv{static{n(this,"PartialTemplate")}constructor(e){this.template=e,this.state=void 0}}const la=new WeakMap,da=new WeakMap,Cd={partial:n((t,e)=>{e[t.expression]=new Fv(t.template)},"partial"),if:n((t,e)=>{var i;if(Kv(t.expression,e))if(la.get(t)!==t.template){la.set(t,t.template);const a=new hl(t.template,e,cc);t.replace(a),da.set(t,a)}else(i=da.get(t))==null||i.update(e);else t.replace(""),la.delete(t),da.delete(t)},"if")},uT=Object.keys(Cd),cc={processCallback(t,e,i){var a,r;if(i)for(const[s,o]of e){if(o instanceof Wv){if(!o.directive){const d=uT.find(c=>o.template.hasAttribute(c));d&&(o.directive=d,o.expression=o.template.getAttribute(d))}(a=Cd[o.directive])==null||a.call(Cd,o,i);continue}let l=Kv(s,i);if(l instanceof Fv){la.get(o)!==l.template?(la.set(o,l.template),l=new hl(l.template,l.state,cc),o.value=l,da.set(o,l)):(r=da.get(o))==null||r.update(l.state);continue}l?(o instanceof Rt&&o.attributeName.startsWith("aria-")&&(l=String(l)),o instanceof Rt?typeof l=="boolean"?o.booleanValue=l:typeof l=="function"?o.element[o.attributeName]=l:o.value=l:(o.value=l,la.delete(o),da.delete(o))):o instanceof Rt?o.value=void 0:(o.value=void 0,la.delete(o),da.delete(o))}}},rm={"!":n(t=>!t,"!"),"!!":n(t=>!!t,"!!"),"==":n((t,e)=>t==e,"=="),"!=":n((t,e)=>t!=e,"!="),">":n((t,e)=>t>e,">"),">=":n((t,e)=>t>=e,">="),"<":n((t,e)=>t<e,"<"),"<=":n((t,e)=>t<=e,"<="),"??":n((t,e)=>t??e,"??"),"|":n((t,e)=>{var i;return(i=am[e])==null?void 0:i.call(am,t)},"|")};function cT(t){return hT(t,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}n(cT,"tokenizeExpression");function Kv(t,e={}){var i,a,r,s,o,l,d;const c=cT(t);if(c.length===0||c.some(({type:p})=>!p))return Cr(t);if(((i=c[0])==null?void 0:i.token)===">"){const p=e[(a=c[1])==null?void 0:a.token];if(!p)return Cr(t);const v={...e};p.state=v;const m=c.slice(2);for(let u=0;u<m.length;u+=3){const f=(r=m[u])==null?void 0:r.token,_=(s=m[u+1])==null?void 0:s.token,g=(o=m[u+2])==null?void 0:o.token;f&&_==="="&&(v[f]=Dr(g,e))}return p}if(c.length===1)return es(c[0])?Dr(c[0].token,e):Cr(t);if(c.length===2){const p=(l=c[0])==null?void 0:l.token,v=rm[p];if(!v||!es(c[1]))return Cr(t);const m=Dr(c[1].token,e);return v(m)}if(c.length===3){const p=(d=c[1])==null?void 0:d.token,v=rm[p];if(!v||!es(c[0])||!es(c[2]))return Cr(t);const m=Dr(c[0].token,e);if(p==="|")return v(m,c[2].token);const u=Dr(c[2].token,e);return v(m,u)}}n(Kv,"evaluateExpression");function Cr(t){return console.warn(`Warning: invalid expression \`${t}\``),!1}n(Cr,"invalidExpression");function es({type:t}){return["number","boolean","string","param"].includes(t)}n(es,"isValidParam");function Dr(t,e){const i=t[0],a=t.slice(-1);return t==="true"||t==="false"?t==="true":i===a&&["'",'"'].includes(i)?t.slice(1,-1):Rp(t)?parseFloat(t):e[t]}n(Dr,"getParamValue");function hT(t,e){let i,a,r;const s=[];for(;t;){r=null,i=t.length;for(const o in e)a=e[o].exec(t),a&&a.index<i&&(r={token:a[0],type:o,matches:a.slice(1)},i=a.index);i&&s.push({token:t.substr(0,i),type:void 0}),r&&s.push(r),t=t.substr(i+(r?r.token.length:0))}return s}n(hT,"tokenize");var hc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$7"),Di=n((t,e,i)=>(hc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$7"),Qi=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$7"),hi=n((t,e,i,a)=>(hc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$6"),Ol=n((t,e,i)=>(hc(t,e,"access private method"),i),"__privateMethod$7"),ar,zs,rr,Ka,Dd,Vv,Qs,Md,en;const xl={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},qv=Te.createElement("template");qv.innerHTML=`
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
`;class ml extends b.HTMLElement{static{n(this,"MediaThemeElement")}constructor(){super(),Qi(this,Dd),Qi(this,Qs),Qi(this,ar,void 0),Qi(this,zs,void 0),Qi(this,rr,void 0),Qi(this,Ka,void 0),Qi(this,en,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer()),hi(this,Ka,new MutationObserver(e=>{var i;this.mediaController&&!((i=this.mediaController)!=null&&i.breakpointsComputed)||e.some(a=>{const r=a.target;return r===this?!0:r.localName!=="media-controller"?!1:!!(xl[a.attributeName]||a.attributeName.startsWith("breakpoint"))})&&this.render()})),hi(this,en,this.render.bind(this)),Ol(this,Dd,Vv).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=Di(this,ar))!=null?e:this.constructor.template}set template(e){if(e===null){this.removeAttribute("template");return}typeof e=="string"?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(hi(this,ar,e),hi(this,rr,null),this.createRenderer())}get props(){var e,i,a;const r=[...Array.from((i=(e=this.mediaController)==null?void 0:e.attributes)!=null?i:[]).filter(({name:o})=>xl[o]||o.startsWith("breakpoint")),...Array.from(this.attributes)],s={};for(const o of r){const l=(a=xl[o.name])!=null?a:p0(o.name);let{value:d}=o;d!=null?(Rp(d)&&(d=parseFloat(d)),s[l]=d===""?!0:d):s[l]=!1}return s}attributeChangedCallback(e,i,a){e==="template"&&i!=a&&Ol(this,Qs,Md).call(this)}connectedCallback(){this.addEventListener(Jt.BREAKPOINTS_COMPUTED,Di(this,en)),Di(this,Ka).observe(this,{attributes:!0}),Di(this,Ka).observe(this.renderRoot,{attributes:!0,subtree:!0}),Ol(this,Qs,Md).call(this)}disconnectedCallback(){this.removeEventListener(Jt.BREAKPOINTS_COMPUTED,Di(this,en)),Di(this,Ka).disconnect()}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==Di(this,zs)&&(hi(this,zs,this.template),this.renderer=new hl(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(qv.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}}ar=new WeakMap;zs=new WeakMap;rr=new WeakMap;Ka=new WeakMap;Dd=new WeakSet;Vv=n(function(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}},"upgradeProperty_fn");Qs=new WeakSet;Md=n(function(){var t;const e=this.getAttribute("template");if(!e||e===Di(this,rr))return;const i=this.getRootNode(),a=(t=i?.getElementById)==null?void 0:t.call(i,e);if(a){hi(this,rr,e),hi(this,ar,a),this.createRenderer();return}mT(e)&&(hi(this,rr,e),pT(e).then(r=>{const s=Te.createElement("template");s.innerHTML=r,hi(this,ar,s),this.createRenderer()}).catch(console.error))},"updateTemplate_fn");en=new WeakMap;ml.observedAttributes=["template"];ml.processor=cc;function mT(t){if(!/^(\/|\.\/|https?:\/\/)/.test(t))return!1;const e=/^https?:\/\//.test(t)?void 0:location.origin;try{new URL(t,e)}catch{return!1}return!0}n(mT,"isValidUrl");async function pT(t){const e=await fetch(t);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}n(pT,"request");b.customElements.get("media-theme")||b.customElements.define("media-theme",ml);function vT({anchor:t,floating:e,placement:i}){const a=fT({anchor:t,floating:e}),{x:r,y:s}=_T(a,i);return{x:r,y:s}}n(vT,"computePosition");function fT({anchor:t,floating:e}){return{anchor:ET(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}n(fT,"getElementRects");function ET(t,e){var i;const a=t.getBoundingClientRect(),r=(i=e?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}n(ET,"getRectRelativeToOffsetParent");function _T({anchor:t,floating:e},i){const a=bT(i)==="x"?"y":"x",r=a==="y"?"height":"width",s=Yv(i),o=t.x+t.width/2-e.width/2,l=t.y+t.height/2-e.height/2,d=t[r]/2-e[r]/2;let c;switch(s){case"top":c={x:o,y:t.y-e.height};break;case"bottom":c={x:o,y:t.y+t.height};break;case"right":c={x:t.x+t.width,y:l};break;case"left":c={x:t.x-e.width,y:l};break;default:c={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":c[a]-=d;break;case"end":c[a]+=d;break}return c}n(_T,"computeCoordsFromPlacement");function Yv(t){return t.split("-")[0]}n(Yv,"getSide");function bT(t){return["top","bottom"].includes(Yv(t))?"y":"x"}n(bT,"getSideAxis");class mc extends Event{static{n(this,"InvokeEvent")}constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}}class gT extends Event{static{n(this,"ToggleEvent")}constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}}var pc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$6"),Q=n((t,e,i)=>(pc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$6"),ee=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$6"),lt=n((t,e,i,a)=>(pc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$5"),te=n((t,e,i)=>(pc(t,e,"access private method"),i),"__privateMethod$6"),Ft,Ui,fi,js,tn,ma,On,Od,Gv,Po,vc,$o,Zs,xd,Nd,zv,Pd,Qv,$d,jv,nr,sr,or,xn,Uo,fc,Ud,Zv,Ec,Xv,Hd,Jv,_c,ef,Bd,tf,Wd,af,pn,Ho,Fd,rf,vn,Bo,Xs,Kd;function vr({type:t,text:e,value:i,checked:a}){const r=Te.createElement("media-chrome-menu-item");r.type=t,r.part.add("menu-item"),r.part.add(t),r.value=i,r.checked=a;const s=Te.createElement("span");return s.textContent=e,r.append(s),r}n(vr,"createMenuItem");function pa(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}n(pa,"createIndicator");function yT(t){return`
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
        
        transition: var(--media-menu-transition-in,
          visibility 0s,
          opacity .2s ease-out,
          transform .15s ease-out,
          left .2s ease-in-out,
          min-width .2s ease-in-out,
          min-height .2s ease-in-out
        ) !important;
        
        visibility: var(--media-menu-visibility, visible);
        opacity: var(--media-menu-opacity, 1);
        max-height: var(--media-menu-max-height, var(--_menu-max-height, 300px));
        transform: var(--media-menu-transform-in, translateY(0) scale(1));
        flex-direction: column;
        
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
  `}n(yT,"getTemplateHTML$6");const ji={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"};class mt extends b.HTMLElement{static{n(this,"MediaChromeMenu")}constructor(){if(super(),ee(this,Od),ee(this,Po),ee(this,Zs),ee(this,Nd),ee(this,Pd),ee(this,$d),ee(this,or),ee(this,Uo),ee(this,Ud),ee(this,Ec),ee(this,Hd),ee(this,_c),ee(this,Bd),ee(this,Wd),ee(this,pn),ee(this,Fd),ee(this,vn),ee(this,Xs),ee(this,Ft,null),ee(this,Ui,null),ee(this,fi,null),ee(this,js,new Set),ee(this,tn,void 0),ee(this,ma,!1),ee(this,On,null),ee(this,$o,()=>{const e=Q(this,js),i=new Set(this.items);for(const a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(const a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));lt(this,js,i)}),ee(this,nr,()=>{te(this,or,xn).call(this),te(this,Uo,fc).call(this,!1)}),ee(this,sr,()=>{te(this,or,xn).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),lt(this,tn,new MutationObserver(Q(this,$o)))}static get observedAttributes(){return[ji.DISABLED,ji.HIDDEN,ji.STYLE,ji.ANCHOR,j.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":te(this,Od,Gv).call(this,e);break;case"invoke":te(this,Nd,zv).call(this,e);break;case"click":te(this,Ud,Zv).call(this,e);break;case"toggle":te(this,Hd,Jv).call(this,e);break;case"focusout":te(this,Bd,tf).call(this,e);break;case"keydown":te(this,Wd,af).call(this,e);break}}connectedCallback(){var e,i;Q(this,tn).observe(this.defaultSlot,{childList:!0}),lt(this,On,Ru(this.shadowRoot,":host")),te(this,Zs,xd).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),lt(this,Ft,id(this)),(i=(e=Q(this,Ft))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(cr(Nn(this),Q(this,nr)),cr(this,Q(this,sr))),te(this,Po,vc).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){var e,i;Q(this,tn).disconnect(),hr(Nn(this),Q(this,nr)),hr(this,Q(this,sr)),this.disable(),(i=(e=Q(this,Ft))==null?void 0:e.unassociateElement)==null||i.call(e,this),lt(this,Ft,null),lt(this,Ui,null),lt(this,fi,null),this.shadowRoot.removeEventListener("slotchange",this)}attributeChangedCallback(e,i,a){var r,s,o,l;e===ji.HIDDEN&&a!==i?(Q(this,ma)||lt(this,ma,!0),this.hidden?te(this,$d,jv).call(this):te(this,Pd,Qv).call(this),this.dispatchEvent(new gT({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===j.MEDIA_CONTROLLER?(i&&((s=(r=Q(this,Ft))==null?void 0:r.unassociateElement)==null||s.call(r,this),lt(this,Ft,null)),a&&this.isConnected&&(lt(this,Ft,id(this)),(l=(o=Q(this,Ft))==null?void 0:o.associateElement)==null||l.call(o,this))):e===ji.DISABLED&&a!==i?a==null?this.enable():this.disable():e===ji.STYLE&&a!==i&&te(this,Zs,xd).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=el(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(TT)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){const i=this.items.find(a=>a.value===e);i&&te(this,Xs,Kd).call(this,i)}focus(){if(lt(this,Ui,Iu()),this.items.length){te(this,vn,Bo).call(this,this.items[0]),this.items[0].focus();return}const e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e?.focus()}handleSelect(e){var i;const a=te(this,pn,Ho).call(this,e);a&&(te(this,Xs,Kd).call(this,a,a.type==="checkbox"),Q(this,fi)&&!this.hidden&&((i=Q(this,Ui))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;const{key:r}=e,s=this.items,o=(a=(i=te(this,pn,Ho).call(this,e))!=null?i:te(this,Fd,rf).call(this))!=null?a:s[0],l=s.indexOf(o);let d=Math.max(0,l);r==="ArrowDown"?d++:r==="ArrowUp"?d--:e.key==="Home"?d=0:e.key==="End"&&(d=s.length-1),d<0&&(d=s.length-1),d>s.length-1&&(d=0),te(this,vn,Bo).call(this,s[d]),s[d].focus()}}Ft=new WeakMap;Ui=new WeakMap;fi=new WeakMap;js=new WeakMap;tn=new WeakMap;ma=new WeakMap;On=new WeakMap;Od=new WeakSet;Gv=n(function(t){const e=t.target;for(const i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(e.name)&&te(this,Po,vc).call(this),e.name||Q(this,$o).call(this)},"handleSlotChange_fn$1");Po=new WeakSet;vc=n(function(){const t=this.shadowRoot.querySelector('slot[name="header"]'),e=this.shadowRoot.querySelector('slot[name="title"]');t.hidden=e.assignedNodes().length===0&&t.assignedNodes().length===0},"toggleHeader_fn");$o=new WeakMap;Zs=new WeakSet;xd=n(function(){var t;const e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")},"updateLayoutStyle_fn");Nd=new WeakSet;zv=n(function(t){lt(this,fi,t.relatedTarget),bi(this,t.relatedTarget)||(this.hidden=!this.hidden)},"handleInvoke_fn");Pd=new WeakSet;Qv=n(function(){var t;(t=Q(this,fi))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),cr(Nn(this),Q(this,nr)),cr(this,Q(this,sr))},"handleOpen_fn");$d=new WeakSet;jv=n(function(){var t;(t=Q(this,fi))==null||t.setAttribute("aria-expanded","false"),hr(Nn(this),Q(this,nr)),hr(this,Q(this,sr))},"handleClosed_fn");nr=new WeakMap;sr=new WeakMap;or=new WeakSet;xn=n(function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:e,y:i}=vT({anchor:this.anchorElement,floating:this,placement:"top-start"});t??(t=this.offsetWidth);const r=Nn(this).getBoundingClientRect(),s=r.width-e-t,o=r.height-i-this.offsetHeight,{style:l}=Q(this,On);l.setProperty("position","absolute"),l.setProperty("right",`${Math.max(0,s)}px`),l.setProperty("--_menu-bottom",`${o}px`);const d=getComputedStyle(this),p=l.getPropertyValue("--_menu-bottom")===d.bottom?o:parseFloat(d.bottom),v=r.height-p-parseFloat(d.marginBottom);this.style.setProperty("--_menu-max-height",`${v}px`)},"positionMenu_fn");Uo=new WeakSet;fc=n(function(t){const e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e?.querySelector('[role="menu"]'),{style:a}=Q(this,On);if(t||a.setProperty("--media-menu-transition-in","none"),i){const r=i.offsetHeight,s=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${s}px`),this.style.setProperty("min-height",`${r}px`),te(this,or,xn).call(this,s)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),te(this,or,xn).call(this);a.removeProperty("--media-menu-transition-in")},"resizeMenu_fn");Ud=new WeakSet;Zv=n(function(t){var e;if(t.stopPropagation(),t.composedPath().includes(Q(this,Ec,Xv))){(e=Q(this,Ui))==null||e.focus(),this.hidden=!0;return}const i=te(this,pn,Ho).call(this,t);!i||i.hasAttribute("disabled")||(te(this,vn,Bo).call(this,i),this.handleSelect(t))},"handleClick_fn");Ec=new WeakSet;Xv=n(function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))},"backButtonElement_get");Hd=new WeakSet;Jv=n(function(t){if(t.target===this)return;te(this,_c,ef).call(this);const e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new mc({relatedTarget:i}));for(const i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);te(this,Uo,fc).call(this,!0)},"handleToggle_fn");_c=new WeakSet;ef=n(function(){const e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)},"checkSubmenuHasExpanded_fn");Bd=new WeakSet;tf=n(function(t){var e;bi(this,t.relatedTarget)||(Q(this,ma)&&((e=Q(this,Ui))==null||e.focus()),Q(this,fi)&&Q(this,fi)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))},"handleFocusOut_fn");Wd=new WeakSet;af=n(function(t){var e,i,a,r,s;const{key:o,ctrlKey:l,altKey:d,metaKey:c}=t;if(!(l||d||c)&&this.keysUsed.includes(o))if(t.preventDefault(),t.stopPropagation(),o==="Tab"){if(Q(this,ma)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else o==="Escape"?((s=Q(this,Ui))==null||s.focus(),Q(this,ma)&&(this.hidden=!0)):o==="Enter"||o===" "?this.handleSelect(t):this.handleMove(t)},"handleKeyDown_fn");pn=new WeakSet;Ho=n(function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))},"getItem_fn");Fd=new WeakSet;rf=n(function(){return this.items.find(t=>t.tabIndex===0)},"getTabItem_fn");vn=new WeakSet;Bo=n(function(t){for(const e of this.items)e.tabIndex=e===t?0:-1},"setTabItem_fn");Xs=new WeakSet;Kd=n(function(t,e){const i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))},"selectItem_fn");mt.shadowRootOptions={mode:"open"};mt.getTemplateHTML=yT;function TT(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t?.role)}n(TT,"isMenuItem");function Nn(t){var e;return(e=t.getAttribute("bounds")?Er(t,`#${t.getAttribute("bounds")}`):Ge(t)||t.parentElement)!=null?e:t}n(Nn,"getBoundsElement");b.customElements.get("media-chrome-menu")||b.customElements.define("media-chrome-menu",mt);var bc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$5"),Ve=n((t,e,i)=>(bc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$5"),ri=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$5"),Nl=n((t,e,i,a)=>(bc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$4"),Ja=n((t,e,i)=>(bc(t,e,"access private method"),i),"__privateMethod$5"),Js,fn,Vd,nf,Wo,gc,yc,sf,jt,Va,qd,eo,Yd;function AT(t){return`
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

      
      svg, img, ::slotted(svg), ::slotted(img) {
        height: var(--media-menu-item-icon-height, var(--media-control-height, 24px));
        fill: var(--media-icon-color, var(--media-primary-color, rgb(238 238 238)));
        display: block;
      }

      
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
      ${this.getSuffixSlotInnerHTML(t)}
    </slot>
    <slot name="submenu"></slot>
  `}n(AT,"getTemplateHTML$5");function kT(t){return""}n(kT,"getSuffixSlotInnerHTML$1");const nt={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"};class Ki extends b.HTMLElement{static{n(this,"MediaChromeMenuItem")}constructor(){if(super(),ri(this,Vd),ri(this,Wo),ri(this,yc),ri(this,eo),ri(this,Js,!1),ri(this,fn,void 0),ri(this,jt,()=>{var e,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],s=(i=r?.dataset.description)!=null?i:r?.text,o=Te.createElement("span");o.textContent=s??"",a.replaceChildren(o)}),ri(this,Va,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",Ve(this,Va));return}this.handleClick(e)}),ri(this,qd,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",Ve(this,Va));return}this.addEventListener("keyup",Ve(this,Va),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=it(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[nt.TYPE,nt.DISABLED,nt.CHECKED,nt.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),Mr(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":Ja(this,Vd,nf).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":Ve(this,qd).call(this,e);break;case"keyup":Ve(this,Va).call(this,e);break}}attributeChangedCallback(e,i,a){e===nt.CHECKED&&Mr(this)&&!Ve(this,Js)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===nt.TYPE&&a!==i?this.role="menuitem"+a:e===nt.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(nt.DISABLED)||this.enable(),this.role="menuitem"+this.type,Nl(this,fn,Gd(this,this.parentNode)),Ja(this,eo,Yd).call(this),this.submenuElement&&Ja(this,Wo,gc).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){this.disable(),Ja(this,eo,Yd).call(this),Nl(this,fn,null),this.shadowRoot.removeEventListener("slotchange",this)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=el(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(nt.TYPE))!=null?e:""}set type(e){this.setAttribute(nt.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(nt.VALUE))!=null?e:this.text}set value(e){this.setAttribute(nt.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(Mr(this))return this.getAttribute("aria-checked")==="true"}set checked(e){Mr(this)&&(Nl(this,Js,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){Mr(this)||this.invokeTargetElement&&bi(this,e.target)&&this.invokeTargetElement.dispatchEvent(new mc({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}}Js=new WeakMap;fn=new WeakMap;Vd=new WeakSet;nf=n(function(t){const e=t.target;if(!e?.name)for(const a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?Ja(this,Wo,gc).call(this):Ja(this,yc,sf).call(this))},"handleSlotChange_fn");Wo=new WeakSet;gc=n(async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",Ve(this,jt)),this.submenuElement.addEventListener("addmenuitem",Ve(this,jt)),this.submenuElement.addEventListener("removemenuitem",Ve(this,jt)),Ve(this,jt).call(this)},"submenuConnected_fn");yc=new WeakSet;sf=n(function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",Ve(this,jt)),this.submenuElement.removeEventListener("addmenuitem",Ve(this,jt)),this.submenuElement.removeEventListener("removemenuitem",Ve(this,jt)),Ve(this,jt).call(this)},"submenuDisconnected_fn");jt=new WeakMap;Va=new WeakMap;qd=new WeakMap;eo=new WeakSet;Yd=n(function(){var t;const e=(t=Ve(this,fn))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(const a of e)a.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")},"reset_fn");Ki.shadowRootOptions={mode:"open"};Ki.getTemplateHTML=AT;Ki.getSuffixSlotInnerHTML=kT;function Mr(t){return t.type==="radio"||t.type==="checkbox"}n(Mr,"isCheckable");function Gd(t,e){if(!t)return null;const{host:i}=t.getRootNode();return!e&&i?Gd(t,i):e?.items?e:Gd(e,e?.parentNode)}n(Gd,"closestMenuItemsContainer");b.customElements.get("media-chrome-menu-item")||b.customElements.define("media-chrome-menu-item",Ki);function ST(t){return`
    ${mt.getTemplateHTML(t)}
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
  `}n(ST,"getTemplateHTML$4");class of extends mt{static{n(this,"MediaSettingsMenu")}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Ge(this).querySelector("media-settings-menu-button")}}of.getTemplateHTML=ST;b.customElements.get("media-settings-menu")||b.customElements.define("media-settings-menu",of);function wT(t){return`
    ${Ki.getTemplateHTML.call(this,t)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}n(wT,"getTemplateHTML$3");function IT(t){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}n(IT,"getSuffixSlotInnerHTML");class pl extends Ki{static{n(this,"MediaSettingsMenuItem")}}pl.shadowRootOptions={mode:"open"};pl.getTemplateHTML=wT;pl.getSuffixSlotInnerHTML=IT;b.customElements.get("media-settings-menu-item")||b.customElements.define("media-settings-menu-item",pl);class yr extends Me{static{n(this,"MediaChromeMenuButton")}connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=el(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new mc({relatedTarget:this}))}}b.customElements.get("media-chrome-menu-button")||b.customElements.define("media-chrome-menu-button",yr);function RT(){return`
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
  `}n(RT,"getSlotTemplateHTML$4");function LT(){return L("Settings")}n(LT,"getTooltipContentHTML$4");class Tc extends yr{static{n(this,"MediaSettingsMenuButton")}static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",L("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Ge(this).querySelector("media-settings-menu")}}Tc.getSlotTemplateHTML=RT;Tc.getTooltipContentHTML=LT;b.customElements.get("media-settings-menu-button")||b.customElements.define("media-settings-menu-button",Tc);var Ac=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$4"),lf=n((t,e,i)=>(Ac(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$4"),ts=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$4"),zd=n((t,e,i,a)=>(Ac(t,e,"write to private field"),e.set(t,i),i),"__privateSet$3"),is=n((t,e,i)=>(Ac(t,e,"access private method"),i),"__privateMethod$4"),an,Fo,to,Qd,io,jd;class CT extends mt{static{n(this,"MediaAudioTrackMenu")}constructor(){super(...arguments),ts(this,to),ts(this,io),ts(this,an,[]),ts(this,Fo,void 0)}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_AUDIO_TRACK_LIST,h.MEDIA_AUDIO_TRACK_ENABLED,h.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===h.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(zd(this,an,c0(a??"")),is(this,to,Qd).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",is(this,io,jd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",is(this,io,jd))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=Ge(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return lf(this,an)}set mediaAudioTrackList(e){zd(this,an,e),is(this,to,Qd).call(this)}get mediaAudioTrackEnabled(){var e;return(e=le(this,h.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){re(this,h.MEDIA_AUDIO_TRACK_ENABLED,e)}}an=new WeakMap;Fo=new WeakMap;to=new WeakSet;Qd=n(function(){if(lf(this,Fo)===JSON.stringify(this.mediaAudioTrackList))return;zd(this,Fo,JSON.stringify(this.mediaAudioTrackList));const t=this.mediaAudioTrackList;this.defaultSlot.textContent="",t.sort((e,i)=>e.id.localeCompare(i.id,void 0,{numeric:!0}));for(const e of t){const i=this.formatMenuItemText(e.label,e),a=vr({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(a)}},"render_fn$3");io=new WeakSet;jd=n(function(){if(this.value==null)return;const t=new b.CustomEvent(C.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn$3");b.customElements.get("media-audio-track-menu")||b.customElements.define("media-audio-track-menu",CT);const DT=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function MT(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${DT}</slot>
  `}n(MT,"getSlotTemplateHTML$3");function OT(){return L("Audio")}n(OT,"getTooltipContentHTML$3");const nm=n(t=>{const e=L("Audio");t.setAttribute("aria-label",e)},"updateAriaLabel$1");class kc extends yr{static{n(this,"MediaAudioTrackMenuButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_AUDIO_TRACK_ENABLED,h.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),nm(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_LANG&&nm(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Ge(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=le(this,h.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){re(this,h.MEDIA_AUDIO_TRACK_ENABLED,e)}}kc.getSlotTemplateHTML=MT;kc.getTooltipContentHTML=OT;b.customElements.get("media-audio-track-menu-button")||b.customElements.define("media-audio-track-menu-button",kc);var Sc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$3"),xT=n((t,e,i)=>(Sc(t,e,"read from private field"),e.get(t)),"__privateGet$3"),Pl=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$3"),NT=n((t,e,i,a)=>(Sc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$2"),as=n((t,e,i)=>(Sc(t,e,"access private method"),i),"__privateMethod$3"),Ko,ao,Zd,ro,Xd;const PT=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function $T(t){return`
    ${mt.getTemplateHTML(t)}
    <slot name="captions-indicator" hidden>${PT}</slot>
  `}n($T,"getTemplateHTML$2");class df extends mt{static{n(this,"MediaCaptionsMenu")}constructor(){super(...arguments),Pl(this,ao),Pl(this,ro),Pl(this,Ko,void 0)}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_SUBTITLES_LIST,h.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_SUBTITLES_LIST&&i!==a?as(this,ao,Zd).call(this):e===h.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a||"",as(this,ao,Zd).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",as(this,ro,Xd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",as(this,ro,Xd))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Ge(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return sm(this,h.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){om(this,h.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return sm(this,h.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){om(this,h.MEDIA_SUBTITLES_SHOWING,e)}}Ko=new WeakMap;ao=new WeakSet;Zd=n(function(){var t;const e=xT(this,Ko)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(h.MEDIA_SUBTITLES_SHOWING);if(!e&&!i)return;NT(this,Ko,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const a=!this.value,r=vr({type:"radio",text:this.formatMenuItemText(L("Off")),value:"off",checked:a});r.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(r);const s=this.mediaSubtitlesList;for(const o of s){const l=vr({type:"radio",text:this.formatMenuItemText(o.label,o),value:sd(o),checked:this.value==sd(o)});l.prepend(pa(this,"checked-indicator")),((t=o.kind)!=null?t:"subs")==="captions"&&l.append(pa(this,"captions-indicator")),this.defaultSlot.append(l)}},"render_fn$2");ro=new WeakSet;Xd=n(function(){const t=this.mediaSubtitlesShowing,e=this.getAttribute(h.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t?.length&&i&&this.dispatchEvent(new b.CustomEvent(C.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;const a=new b.CustomEvent(C.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)},"onChange_fn$2");df.getTemplateHTML=$T;const sm=n((t,e)=>{const i=t.getAttribute(e);return i?nl(i):[]},"getSubtitlesListAttr$1"),om=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Rn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr$1");b.customElements.get("media-captions-menu")||b.customElements.define("media-captions-menu",df);const UT=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,HT=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function BT(){return`
    <style>
      :host([data-captions-enabled="true"]) slot[name=off] {
        display: none !important;
      }

      
      :host(:not([data-captions-enabled="true"])) slot[name=on] {
        display: none !important;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="on">${UT}</slot>
      <slot name="off">${HT}</slot>
    </slot>
  `}n(BT,"getSlotTemplateHTML$2");function WT(){return L("Captions")}n(WT,"getTooltipContentHTML$2");const lm=n(t=>{t.setAttribute("data-captions-enabled",Gp(t).toString())},"updateAriaChecked"),dm=n(t=>{t.setAttribute("aria-label",L("closed captions"))},"updateAriaLabel");class wc extends yr{static{n(this,"MediaCaptionsMenuButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_SUBTITLES_LIST,h.MEDIA_SUBTITLES_SHOWING,h.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),dm(this),lm(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_SUBTITLES_SHOWING?lm(this):e===h.MEDIA_LANG&&dm(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Ge(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return um(this,h.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){cm(this,h.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return um(this,h.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){cm(this,h.MEDIA_SUBTITLES_SHOWING,e)}}wc.getSlotTemplateHTML=BT;wc.getTooltipContentHTML=WT;const um=n((t,e)=>{const i=t.getAttribute(e);return i?nl(i):[]},"getSubtitlesListAttr"),cm=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=Rn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr");b.customElements.get("media-captions-menu-button")||b.customElements.define("media-captions-menu-button",wc);var uf=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$2"),qa=n((t,e,i)=>(uf(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$2"),$l=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$2"),ka=n((t,e,i)=>(uf(t,e,"access private method"),i),"__privateMethod$2"),xi,Ya,rn,no,Jd;const Ul={RATES:"rates"};class FT extends mt{static{n(this,"MediaPlaybackRateMenu")}constructor(){super(),$l(this,Ya),$l(this,no),$l(this,xi,new Du(this,Ul.RATES,{defaultValue:Sv})),ka(this,Ya,rn).call(this)}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_PLAYBACK_RATE,Ul.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===h.MEDIA_PLAYBACK_RATE&&i!=a?(this.value=a,ka(this,Ya,rn).call(this)):e===Ul.RATES&&i!=a&&(qa(this,xi).value=a,ka(this,Ya,rn).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ka(this,no,Jd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ka(this,no,Jd))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Ge(this).querySelector("media-playback-rate-menu-button")}get rates(){return qa(this,xi)}set rates(e){e?Array.isArray(e)?qa(this,xi).value=e.join(" "):typeof e=="string"&&(qa(this,xi).value=e):qa(this,xi).value="",ka(this,Ya,rn).call(this)}get mediaPlaybackRate(){return ae(this,h.MEDIA_PLAYBACK_RATE,Xa)}set mediaPlaybackRate(e){he(this,h.MEDIA_PLAYBACK_RATE,e)}}xi=new WeakMap;Ya=new WeakSet;rn=n(function(){this.defaultSlot.textContent="";const t=this.mediaPlaybackRate,e=new Set(Array.from(qa(this,xi)).map(a=>Number(a)));t>0&&!e.has(t)&&e.add(t);const i=Array.from(e).sort((a,r)=>a-r);for(const a of i){const r=vr({type:"radio",text:this.formatMenuItemText(`${a}x`,a),value:a.toString(),checked:t===a});r.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(r)}},"render_fn$1");no=new WeakSet;Jd=n(function(){if(!this.value)return;const t=new b.CustomEvent(C.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn$1");b.customElements.get("media-playback-rate-menu")||b.customElements.define("media-playback-rate-menu",FT);const so=1;function KT(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
      
      :host([aria-expanded="true"]) slot {
        display: block;
      }

      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||so}x</slot>
  `}n(KT,"getSlotTemplateHTML$1");function VT(){return L("Playback rate")}n(VT,"getTooltipContentHTML$1");class Ic extends yr{static{n(this,"MediaPlaybackRateMenuButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:so}x`}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===h.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,s=Number.isNaN(r)?so:r;this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",L("Playback rate {playbackRate}",{playbackRate:s}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Ge(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return ae(this,h.MEDIA_PLAYBACK_RATE,so)}set mediaPlaybackRate(e){he(this,h.MEDIA_PLAYBACK_RATE,e)}}Ic.getSlotTemplateHTML=KT;Ic.getTooltipContentHTML=VT;b.customElements.get("media-playback-rate-menu-button")||b.customElements.define("media-playback-rate-menu-button",Ic);var Rc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$1"),si=n((t,e,i)=>(Rc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$1"),rs=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$1"),hm=n((t,e,i,a)=>(Rc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$1"),Sa=n((t,e,i)=>(Rc(t,e,"access private method"),i),"__privateMethod$1"),nn,Vt,Ga,sn,oo,eu;class qT extends mt{static{n(this,"MediaRenditionMenu")}constructor(){super(...arguments),rs(this,Ga),rs(this,oo),rs(this,nn,[]),rs(this,Vt,{})}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_RENDITION_LIST,h.MEDIA_RENDITION_SELECTED,h.MEDIA_RENDITION_UNAVAILABLE,h.MEDIA_HEIGHT,h.MEDIA_WIDTH]}static formatMenuItemText(e,i){return super.formatMenuItemText(e,i)}static formatRendition(e,{showBitrate:i=!1}={}){const a=`${Math.min(e.width,e.height)}p`;if(i&&e.bitrate){const r=e.bitrate/1e6,s=`${r.toFixed(r<1?1:0)} Mbps`;return`${a} (${s})`}return this.formatMenuItemText(a,e)}static compareRendition(e,i){var a,r;return i.height===e.height?((a=i.bitrate)!=null?a:0)-((r=e.bitrate)!=null?r:0):i.height-e.height}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),i!==a)switch(e){case h.MEDIA_RENDITION_SELECTED:this.value=a??"auto",Sa(this,Ga,sn).call(this);break;case h.MEDIA_RENDITION_LIST:hm(this,nn,o0(a)),Sa(this,Ga,sn).call(this);break;case h.MEDIA_HEIGHT:case h.MEDIA_WIDTH:Sa(this,Ga,sn).call(this);break}}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Sa(this,oo,eu))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Sa(this,oo,eu))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Ge(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return si(this,nn)}set mediaRenditionList(e){hm(this,nn,e),Sa(this,Ga,sn).call(this)}get mediaRenditionSelected(){return le(this,h.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){re(this,h.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return ae(this,h.MEDIA_HEIGHT)}set mediaHeight(e){he(this,h.MEDIA_HEIGHT,e)}get mediaWidth(){return ae(this,h.MEDIA_WIDTH)}set mediaWidth(e){he(this,h.MEDIA_WIDTH,e)}compareRendition(e,i){return this.constructor.compareRendition(e,i)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}formatRendition(e,i){return this.constructor.formatRendition(e,i)}showRenditionBitrate(e){return this.mediaRenditionList.some(i=>i!==e&&i.height===e.height&&i.bitrate!==e.bitrate)}}nn=new WeakMap;Vt=new WeakMap;Ga=new WeakSet;sn=n(function(){const t=!this.mediaRenditionSelected;if(si(this,Vt).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&si(this,Vt).mediaHeight===this.mediaHeight&&si(this,Vt).mediaWidth===this.mediaWidth&&si(this,Vt).isAuto===t)return;si(this,Vt).mediaRenditionList=JSON.stringify(this.mediaRenditionList),si(this,Vt).mediaHeight=this.mediaHeight,si(this,Vt).mediaWidth=this.mediaWidth,si(this,Vt).isAuto=t;const e=this.mediaRenditionList.sort(this.compareRendition.bind(this)),i=e.find(o=>o.id===this.mediaRenditionSelected);for(const o of e)o.selected=o===i;this.defaultSlot.textContent="";for(const o of e){const l=this.formatRendition(o,{showBitrate:this.showRenditionBitrate(o)}),d=vr({type:"radio",text:l,value:`${o.id}`,checked:o.selected&&!t});d.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(d)}const a=i&&this.showRenditionBitrate(i);let r;t&&(i?r=this.formatMenuItemText(`${L("Auto")} • ${this.formatRendition(i,{showBitrate:a})}`,i):this.mediaHeight>0&&this.mediaWidth>0&&(r=this.formatMenuItemText(`${L("Auto")} (${Math.min(this.mediaWidth,this.mediaHeight)}p)`))),r||(r=this.formatMenuItemText(L("Auto")));const s=vr({type:"radio",text:r,value:"auto",checked:t});s.dataset.description=r,s.prepend(pa(this,"checked-indicator")),this.defaultSlot.append(s)},"render_fn");oo=new WeakSet;eu=n(function(){if(this.value==null)return;const t=new b.CustomEvent(C.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn");b.customElements.get("media-rendition-menu")||b.customElements.define("media-rendition-menu",qT);const YT=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function GT(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${YT}</slot>
  `}n(GT,"getSlotTemplateHTML");function zT(){return L("Quality")}n(zT,"getTooltipContentHTML");class Lc extends yr{static{n(this,"MediaRenditionMenuButton")}static get observedAttributes(){return[...super.observedAttributes,h.MEDIA_RENDITION_SELECTED,h.MEDIA_RENDITION_UNAVAILABLE,h.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",L("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Ge(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return le(this,h.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){re(this,h.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return ae(this,h.MEDIA_HEIGHT)}set mediaHeight(e){he(this,h.MEDIA_HEIGHT,e)}}Lc.getSlotTemplateHTML=GT;Lc.getTooltipContentHTML=zT;b.customElements.get("media-rendition-menu-button")||b.customElements.define("media-rendition-menu-button",Lc);var Cc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck"),qt=n((t,e,i)=>(Cc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet"),Mt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd"),cf=n((t,e,i,a)=>(Cc(t,e,"write to private field"),e.set(t,i),i),"__privateSet"),dt=n((t,e,i)=>(Cc(t,e,"access private method"),i),"__privateMethod"),fr,Pn,vl,na,er,Dc,hf,lo,tu,uo,iu,mf,Vo,qo,co;function QT(t){return`
      ${mt.getTemplateHTML(t)}
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
    `}n(QT,"getTemplateHTML$1");class pf extends mt{static{n(this,"MediaContextMenu")}constructor(){super(),Mt(this,Pn),Mt(this,na),Mt(this,Dc),Mt(this,lo),Mt(this,iu),Mt(this,fr,!1),Mt(this,uo,e=>{const i=e.target,a=i?.nodeName==="VIDEO",r=dt(this,lo,tu).call(this,i);(a||r)&&(qt(this,fr)?dt(this,na,er).call(this):dt(this,iu,mf).call(this,e))}),Mt(this,Vo,e=>{const i=e.target,a=this.contains(i),r=e.button===2,s=i?.nodeName==="VIDEO",o=dt(this,lo,tu).call(this,i);a||r&&(s||o)||dt(this,na,er).call(this)}),Mt(this,qo,e=>{e.key==="Escape"&&dt(this,na,er).call(this)}),Mt(this,co,e=>{var i,a;const r=e.target;if((i=r.matches)!=null&&i.call(r,'button[invoke="copy"]')){const s=(a=r.closest("media-context-menu-item"))==null?void 0:a.querySelector('input[slot="copy"]');s&&navigator.clipboard.writeText(s.value)}dt(this,na,er).call(this)}),this.setAttribute("noautohide",""),dt(this,Pn,vl).call(this)}connectedCallback(){super.connectedCallback(),Ge(this).addEventListener("contextmenu",qt(this,uo)),this.addEventListener("click",qt(this,co))}disconnectedCallback(){super.disconnectedCallback(),Ge(this).removeEventListener("contextmenu",qt(this,uo)),this.removeEventListener("click",qt(this,co)),document.removeEventListener("mousedown",qt(this,Vo)),document.removeEventListener("keydown",qt(this,qo))}}fr=new WeakMap;Pn=new WeakSet;vl=n(function(){this.hidden=!qt(this,fr)},"updateVisibility_fn");na=new WeakSet;er=n(function(){cf(this,fr,!1),dt(this,Pn,vl).call(this)},"closeContextMenu_fn");Dc=new WeakSet;hf=n(function(){document.querySelectorAll("media-context-menu").forEach(e=>{var i;e!==this&&dt(i=e,na,er).call(i)})},"closeOtherContextMenus_fn");lo=new WeakSet;tu=n(function(t){return t?t.hasAttribute("slot")&&t.getAttribute("slot")==="media"?!0:t.nodeName.includes("-")&&t.tagName.includes("-")?t.hasAttribute("src")||t.hasAttribute("poster")||t.hasAttribute("preload")||t.hasAttribute("playsinline"):!1:!1},"isVideoContainer_fn");uo=new WeakMap;iu=new WeakSet;mf=n(function(t){t.preventDefault(),dt(this,Dc,hf).call(this),cf(this,fr,!0),this.style.position="fixed",this.style.left=`${t.clientX}px`,this.style.top=`${t.clientY}px`,dt(this,Pn,vl).call(this),document.addEventListener("mousedown",qt(this,Vo),{once:!0}),document.addEventListener("keydown",qt(this,qo),{once:!0})},"onContextMenu_fn");Vo=new WeakMap;qo=new WeakMap;co=new WeakMap;pf.getTemplateHTML=QT;b.customElements.get("media-context-menu")||b.customElements.define("media-context-menu",pf);function jT(t){return`
    ${Ki.getTemplateHTML.call(this,t)}
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
  `}n(jT,"getTemplateHTML");class Mc extends Ki{static{n(this,"MediaContextMenuItem")}}Mc.shadowRootOptions={mode:"open"};Mc.getTemplateHTML=jT;b.customElements.get("media-context-menu-item")||b.customElements.define("media-context-menu-item",Mc);var vf=n(t=>{throw TypeError(t)},"lt"),Oc=n((t,e,i)=>e.has(t)||vf("Cannot "+i),"Ae"),B=n((t,e,i)=>(Oc(t,e,"read from private field"),i?i.call(t):e.get(t)),"l$1"),Ne=n((t,e,i)=>e.has(t)?vf("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"h$1"),Ye=n((t,e,i,a)=>(Oc(t,e,"write to private field"),e.set(t,i),i),"y"),pe=n((t,e,i)=>(Oc(t,e,"access private method"),i),"p$1"),fl=class{static{n(this,"Y")}addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends fl{static{n(this,"t")}}globalThis.DocumentFragment=t}var xc=class extends fl{static{n(this,"Q")}},ZT=class extends fl{static{n(this,"Ce")}},XT={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(xc)}},ho,JT=class{static{n(this,"ke")}constructor(t,e={}){Ne(this,ho),Ye(this,ho,e?.detail)}get detail(){return B(this,ho)}initCustomEvent(){}};ho=new WeakMap;function eA(t,e){return new xc}n(eA,"jt");var ff={document:{createElement:eA},DocumentFragment,customElements:XT,CustomEvent:JT,EventTarget:fl,HTMLElement:xc,HTMLVideoElement:ZT},Ef=typeof window>"u"||typeof globalThis.customElements>"u",Gt=Ef?ff:globalThis,Yo=Ef?ff.document:globalThis.document;function tA(t){let e="";return Object.entries(t).forEach(([i,a])=>{a!=null&&(e+=`${au(i)}: ${a}; `)}),e?e.trim():void 0}n(tA,"ct");function au(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}n(au,"me$1");function _f(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}n(_f,"ce");function He(t){if(t==null)return;let e=+t;return Number.isNaN(e)?void 0:e}n(He,"f$1");function bf(t){let e=iA(t).toString();return e?"?"+e:""}n(bf,"_e");function iA(t){let e={};for(let i in t)t[i]!=null&&(e[i]=t[i]);return new URLSearchParams(e)}n(iA,"zt");var gf=n((t,e)=>!t||!e?!1:t.contains(e)?!0:gf(t,e.getRootNode().host),"Re"),yf="mux.com",aA=n(()=>{try{return"3.13.0"}catch{}return"UNKNOWN"},"Xt"),rA=aA(),Tf=n(()=>rA,"be"),nA=n((t,{token:e,customDomain:i=yf,thumbnailTime:a,programTime:r}={})=>{var s;let o=e==null?a:void 0,{aud:l}=(s=tr(e))!=null?s:{};if(!(e&&l!=="t"))return`https://image.${i}/${t}/thumbnail.webp${bf({token:e,time:o,program_time:r})}`},"ht"),sA=n((t,{token:e,customDomain:i=yf,programStartTime:a,programEndTime:r}={})=>{var s;let{aud:o}=(s=tr(e))!=null?s:{};if(!(e&&o!=="s"))return`https://image.${i}/${t}/storyboard.vtt${bf({token:e,format:"webp",program_start_time:a,program_end_time:r})}`},"gt"),Nc=n(t=>{if(t){if([Z.LIVE,Z.ON_DEMAND].includes(t))return t;if(t!=null&&t.includes("live"))return Z.LIVE}},"ee$1"),oA={crossorigin:"crossOrigin",playsinline:"playsInline"};function lA(t){var e;return(e=oA[t])!=null?e:_f(t)}n(lA,"ft");var za,Qa,qe,dA=class{static{n(this,"pe")}constructor(t,e){Ne(this,za),Ne(this,Qa),Ne(this,qe,[]),Ye(this,za,t),Ye(this,Qa,e)}[Symbol.iterator](){return B(this,qe).values()}get length(){return B(this,qe).length}get value(){var t;return(t=B(this,qe).join(" "))!=null?t:""}set value(t){var e;t!==this.value&&(Ye(this,qe,[]),this.add(...(e=t?.split(" "))!=null?e:[]))}toString(){return this.value}item(t){return B(this,qe)[t]}values(){return B(this,qe).values()}keys(){return B(this,qe).keys()}forEach(t){B(this,qe).forEach(t)}add(...t){var e,i;t.forEach(a=>{this.contains(a)||B(this,qe).push(a)}),!(this.value===""&&!((e=B(this,za))!=null&&e.hasAttribute(`${B(this,Qa)}`)))&&((i=B(this,za))==null||i.setAttribute(`${B(this,Qa)}`,`${this.value}`))}remove(...t){var e;t.forEach(i=>{B(this,qe).splice(B(this,qe).indexOf(i),1)}),(e=B(this,za))==null||e.setAttribute(`${B(this,Qa)}`,`${this.value}`)}contains(t){return B(this,qe).includes(t)}toggle(t,e){return typeof e<"u"?e?(this.add(t),!0):(this.remove(t),!1):this.contains(t)?(this.remove(t),!1):(this.add(t),!0)}replace(t,e){this.remove(t),this.add(e)}};za=new WeakMap,Qa=new WeakMap,qe=new WeakMap;var Af=`[mux-player ${Tf()}]`;function oi(...t){console.warn(Af,...t)}n(oi,"O");function tt(...t){console.error(Af,...t)}n(tt,"k");function mm(t){var e;let i=(e=t.message)!=null?e:"";t.context&&(i+=` ${t.context}`),t.file&&(i+=` ${x("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t.file}`),oi(i)}n(mm,"Oe");var Ue={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},ia={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted"},pm=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),uA=Object.values(Ue).filter(t=>Ue.PLAYSINLINE!==t),cA=Object.values(ia),hA=[...uA,...cA],mA=class extends Gt.HTMLElement{static{n(this,"Le")}static get observedAttributes(){return hA}constructor(){super()}attributeChangedCallback(t,e,i){var a,r;switch(t){case ia.MUTED:{this.media&&(this.media.muted=i!=null,this.media.defaultMuted=i!=null);return}case ia.VOLUME:{let s=(a=He(i))!=null?a:1;this.media&&(this.media.volume=s);return}case ia.PLAYBACKRATE:{let s=(r=He(i))!=null?r:1;this.media&&(this.media.playbackRate=s,this.media.defaultPlaybackRate=s);return}}}play(){var t,e;return(e=(t=this.media)==null?void 0:t.play())!=null?e:Promise.reject()}pause(){var t;(t=this.media)==null||t.pause()}load(){var t;(t=this.media)==null||t.load()}get media(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("mux-video")}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var t,e;return(e=(t=this.media)==null?void 0:t.paused)!=null?e:!0}get duration(){var t,e;return(e=(t=this.media)==null?void 0:t.duration)!=null?e:NaN}get ended(){var t,e;return(e=(t=this.media)==null?void 0:t.ended)!=null?e:!1}get buffered(){var t,e;return(e=(t=this.media)==null?void 0:t.buffered)!=null?e:pm}get seekable(){var t,e;return(e=(t=this.media)==null?void 0:t.seekable)!=null?e:pm}get readyState(){var t,e;return(e=(t=this.media)==null?void 0:t.readyState)!=null?e:0}get videoWidth(){var t,e;return(e=(t=this.media)==null?void 0:t.videoWidth)!=null?e:0}get videoHeight(){var t,e;return(e=(t=this.media)==null?void 0:t.videoHeight)!=null?e:0}get currentSrc(){var t,e;return(e=(t=this.media)==null?void 0:t.currentSrc)!=null?e:""}get currentTime(){var t,e;return(e=(t=this.media)==null?void 0:t.currentTime)!=null?e:0}set currentTime(t){this.media&&(this.media.currentTime=Number(t))}get volume(){var t,e;return(e=(t=this.media)==null?void 0:t.volume)!=null?e:1}set volume(t){this.media&&(this.media.volume=Number(t))}get playbackRate(){var t,e;return(e=(t=this.media)==null?void 0:t.playbackRate)!=null?e:1}set playbackRate(t){this.media&&(this.media.playbackRate=Number(t))}get defaultPlaybackRate(){var t;return(t=He(this.getAttribute(ia.PLAYBACKRATE)))!=null?t:1}set defaultPlaybackRate(t){t!=null?this.setAttribute(ia.PLAYBACKRATE,`${t}`):this.removeAttribute(ia.PLAYBACKRATE)}get crossOrigin(){return Or(this,Ue.CROSSORIGIN)}set crossOrigin(t){this.setAttribute(Ue.CROSSORIGIN,`${t}`)}get autoplay(){return Or(this,Ue.AUTOPLAY)!=null}set autoplay(t){t?this.setAttribute(Ue.AUTOPLAY,typeof t=="string"?t:""):this.removeAttribute(Ue.AUTOPLAY)}get loop(){return Or(this,Ue.LOOP)!=null}set loop(t){t?this.setAttribute(Ue.LOOP,""):this.removeAttribute(Ue.LOOP)}get muted(){var t,e;return(e=(t=this.media)==null?void 0:t.muted)!=null?e:!1}set muted(t){this.media&&(this.media.muted=!!t)}get defaultMuted(){return Or(this,Ue.MUTED)!=null}set defaultMuted(t){t?this.setAttribute(Ue.MUTED,""):this.removeAttribute(Ue.MUTED)}get playsInline(){return Or(this,Ue.PLAYSINLINE)!=null}set playsInline(t){tt("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(t){["","none","metadata","auto"].includes(t)?this.setAttribute(Ue.PRELOAD,t):this.removeAttribute(Ue.PRELOAD)}};function Or(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}n(Or,"te$1");var vm=mA,pA=`:host {
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
`,xr=new WeakMap,vA=class kf{static{n(this,"t")}constructor(e,i){this.element=e,this.type=i,this.element.addEventListener(this.type,this);let a=xr.get(this.element);a&&a.set(this.type,this)}set(e){if(typeof e=="function")this.handleEvent=e.bind(this.element);else if(typeof e=="object"&&typeof e.handleEvent=="function")this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let i=xr.get(this.element);i&&i.delete(this.type)}}static for(e){xr.has(e.element)||xr.set(e.element,new Map);let i=e.attributeName.slice(2),a=xr.get(e.element);return a&&a.has(i)?a.get(i):new kf(e.element,i)}};function fA(t,e){return t instanceof Rt&&t.attributeName.startsWith("on")?(vA.for(t).set(e),t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),!0):!1}n(fA,"oa");function EA(t,e){return e instanceof Sf&&t instanceof gr?(e.renderInto(t),!0):!1}n(EA,"na");function _A(t,e){return e instanceof DocumentFragment&&t instanceof gr?(e.childNodes.length&&t.replace(...e.childNodes),!0):!1}n(_A,"sa");function bA(t,e){if(t instanceof Rt){let i=t.attributeNamespace,a=t.element.getAttributeNS(i,t.attributeName);return String(e)!==a&&(t.value=String(e)),!0}return t.value=String(e),!0}n(bA,"da");function gA(t,e){if(t instanceof Rt&&e instanceof Element){let i=t.element;return i[t.attributeName]!==e&&(t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),i[t.attributeName]=e),!0}return!1}n(gA,"la");function yA(t,e){if(typeof e=="boolean"&&t instanceof Rt){let i=t.attributeNamespace,a=t.element.hasAttributeNS(i,t.attributeName);return e!==a&&(t.booleanValue=e),!0}return!1}n(yA,"ua");function TA(t,e){return e===!1&&t instanceof gr?(t.replace(""),!0):!1}n(TA,"ma");function AA(t,e){gA(t,e)||yA(t,e)||fA(t,e)||TA(t,e)||EA(t,e)||_A(t,e)||bA(t,e)}n(AA,"ca");var Hl=new Map,fm=new WeakMap,Em=new WeakMap,Sf=class{static{n(this,"he")}constructor(t,e,i){this.strings=t,this.values=e,this.processor=i,this.stringsKey=this.strings.join("")}get template(){if(Hl.has(this.stringsKey))return Hl.get(this.stringsKey);{let t=Yo.createElement("template"),e=this.strings.length-1;return t.innerHTML=this.strings.reduce((i,a,r)=>i+a+(r<e?`{{ ${r} }}`:""),""),Hl.set(this.stringsKey,t),t}}renderInto(t){var e;let i=this.template;if(fm.get(t)!==i){fm.set(t,i);let r=new hl(i,this.values,this.processor);Em.set(t,r),t instanceof gr?t.replace(...r.children):t.appendChild(r);return}let a=Em.get(t);(e=a?.update)==null||e.call(a,this.values)}},kA={processCallback(t,e,i){var a;if(i){for(let[r,s]of e)if(r in i){let o=(a=i[r])!=null?a:"";AA(s,o)}}}};function mo(t,...e){return new Sf(t,e,kA)}n(mo,"ie$1");function SA(t,e){t.renderInto(e)}n(SA,"kt");var wA=n(t=>{let{tokens:e}=t;return e.drm?":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }":""},"ha"),IA=n(t=>mo`
  <style>
    ${wA(t)}
    ${pA}
  </style>
  ${DA(t)}
`,"Rt"),RA=n(t=>{let e=t.hotKeys?`${t.hotKeys}`:"";return Nc(t.streamType)==="live"&&(e+=" noarrowleft noarrowright"),e},"ga"),LA={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",THUMB:"thumb",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",MENU_ITEM:"menu-item",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},CA=Object.values(LA).join(", "),DA=n(t=>{var e,i,a,r,s,o,l,d,c,p,v,m,u,f,_,g,T,A,y,S,M,D,U,W,z,F,H,Pe,Qe,je,fe,Be,Lt,We,pt,Ze,Ie,$e,Fe,ti,Vi;return mo`
  <media-theme
    template="${t.themeTemplate||!1}"
    defaultstreamtype="${(e=t.defaultStreamType)!=null?e:!1}"
    hotkeys="${RA(t)||!1}"
    nohotkeys="${t.noHotKeys||!t.hasSrc||!1}"
    noautoseektolive="${!!((i=t.streamType)!=null&&i.includes(Z.LIVE))&&t.targetLiveWindow!==0}"
    novolumepref="${t.novolumepref||!1}"
    nomutedpref="${t.nomutedpref||!1}"
    disabled="${!t.hasSrc||t.isDialogOpen}"
    audio="${(a=t.audio)!=null?a:!1}"
    style="${(r=tA({"--media-primary-color":t.primaryColor,"--media-secondary-color":t.secondaryColor,"--media-accent-color":t.accentColor}))!=null?r:!1}"
    defaultsubtitles="${!t.defaultHiddenCaptions}"
    forwardseekoffset="${(s=t.forwardSeekOffset)!=null?s:!1}"
    backwardseekoffset="${(o=t.backwardSeekOffset)!=null?o:!1}"
    playbackrates="${(l=t.playbackRates)!=null?l:!1}"
    defaultshowremainingtime="${(d=t.defaultShowRemainingTime)!=null?d:!1}"
    defaultduration="${(c=t.defaultDuration)!=null?c:!1}"
    hideduration="${(p=t.hideDuration)!=null?p:!1}"
    title="${(v=t.title)!=null?v:!1}"
    videotitle="${(m=t.videoTitle)!=null?m:!1}"
    proudlydisplaymuxbadge="${(u=t.proudlyDisplayMuxBadge)!=null?u:!1}"
    exportparts="${CA}"
    onclose="${t.onCloseErrorDialog}"
    onfocusin="${t.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      inert="${(f=t.noHotKeys)!=null?f:!1}"
      target-live-window="${(_=t.targetLiveWindow)!=null?_:!1}"
      stream-type="${(g=Nc(t.streamType))!=null?g:!1}"
      crossorigin="${(T=t.crossOrigin)!=null?T:""}"
      playsinline
      autoplay="${(A=t.autoplay)!=null?A:!1}"
      muted="${(y=t.muted)!=null?y:!1}"
      loop="${(S=t.loop)!=null?S:!1}"
      preload="${(M=t.preload)!=null?M:!1}"
      debug="${(D=t.debug)!=null?D:!1}"
      prefer-cmcd="${(U=t.preferCmcd)!=null?U:!1}"
      disable-tracking="${(W=t.disableTracking)!=null?W:!1}"
      disable-cookies="${(z=t.disableCookies)!=null?z:!1}"
      prefer-playback="${(F=t.preferPlayback)!=null?F:!1}"
      start-time="${t.startTime!=null?t.startTime:!1}"
      initial-bandwidth-estimate-kbps="${t.initialBandwidthEstimateKbps!=null?t.initialBandwidthEstimateKbps:!1}"
      initial-estimate-segments="${t.initialEstimateSegments!=null?t.initialEstimateSegments:!1}"
      min-preload-segments="${t.minPreloadSegments!=null?t.minPreloadSegments:!1}"
      beacon-collection-domain="${(H=t.beaconCollectionDomain)!=null?H:!1}"
      player-init-time="${(Pe=t.playerInitTime)!=null?Pe:!1}"
      player-software-name="${(Qe=t.playerSoftwareName)!=null?Qe:!1}"
      player-software-version="${(je=t.playerSoftwareVersion)!=null?je:!1}"
      env-key="${(fe=t.envKey)!=null?fe:!1}"
      custom-domain="${(Be=t.customDomain)!=null?Be:!1}"
      src="${t.src?t.src:t.playbackId?Xl(t):!1}"
      cast-src="${t.src?t.src:t.playbackId?Xl(t):!1}"
      cast-receiver="${(Lt=t.castReceiver)!=null?Lt:!1}"
      drm-token="${(pt=(We=t.tokens)==null?void 0:We.drm)!=null?pt:!1}"
      playback-token="${(Ie=(Ze=t.tokens)==null?void 0:Ze.playback)!=null?Ie:!1}"
      exportparts="video"
      disable-pseudo-ended="${($e=t.disablePseudoEnded)!=null?$e:!1}"
      max-auto-resolution="${(Fe=t.maxAutoResolution)!=null?Fe:!1}"
      cap-rendition-to-player-size="${(ti=t.capRenditionToPlayerSize)!=null?ti:!1}"
    >
      ${t.storyboard?mo`<track label="thumbnails" default kind="metadata" src="${t.storyboard}" />`:mo``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t.poster?t.poster:!1}"
        placeholdersrc="${(Vi=t.placeholder)!=null?Vi:!1}"
      ></media-poster-image>
    </slot>
  </media-theme>
`},"Ea"),wf=n(t=>t.charAt(0).toUpperCase()+t.slice(1),"Lt"),MA=n((t,e=!1)=>{var i,a;if(t.muxCode){let r=wf((i=t.errorCategory)!=null?i:"video"),s=Zo((a=t.errorCategory)!=null?a:X.VIDEO);if(t.muxCode===N.NETWORK_OFFLINE)return x("Your device appears to be offline",e);if(t.muxCode===N.NETWORK_TOKEN_EXPIRED)return x("{category} URL has expired",e).format({category:r});if([N.NETWORK_TOKEN_SUB_MISMATCH,N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING,N.NETWORK_TOKEN_MALFORMED].includes(t.muxCode))return x("{category} URL is formatted incorrectly",e).format({category:r});if(t.muxCode===N.NETWORK_TOKEN_MISSING)return x("Invalid {categoryName} URL",e).format({categoryName:s});if(t.muxCode===N.NETWORK_NOT_FOUND)return x("{category} does not exist",e).format({category:r});if(t.muxCode===N.NETWORK_NOT_READY){let o=t.streamType==="live"?"Live stream":"Video";return x("{mediaType} is not currently available",e).format({mediaType:o})}}if(t.code){if(t.code===R.MEDIA_ERR_NETWORK)return x("Network Error",e);if(t.code===R.MEDIA_ERR_DECODE)return x("Media Error",e);if(t.code===R.MEDIA_ERR_SRC_NOT_SUPPORTED)return x("Source Not Supported",e)}return x("Error",e)},"Ta"),OA=n((t,e=!1)=>{var i,a;if(t.muxCode){let r=wf((i=t.errorCategory)!=null?i:"video"),s=Zo((a=t.errorCategory)!=null?a:X.VIDEO);return t.muxCode===N.NETWORK_OFFLINE?x("Check your internet connection and try reloading this video.",e):t.muxCode===N.NETWORK_TOKEN_EXPIRED?x("The video’s secured {tokenNamePrefix}-token has expired.",e).format({tokenNamePrefix:s}):t.muxCode===N.NETWORK_TOKEN_SUB_MISMATCH?x("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",e).format({tokenNamePrefix:s}):t.muxCode===N.NETWORK_TOKEN_MALFORMED?x("{category} URL is formatted incorrectly",e).format({category:r}):[N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode)?x("The {tokenNamePrefix}-token is formatted with incorrect information.",e).format({tokenNamePrefix:s}):[N.NETWORK_TOKEN_MISSING,N.NETWORK_INVALID_URL].includes(t.muxCode)?x("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",e).format({tokenNamePrefix:s}):t.muxCode===N.NETWORK_NOT_FOUND?"":t.message}return t.code&&(t.code===R.MEDIA_ERR_NETWORK||t.code===R.MEDIA_ERR_DECODE||(t.code,R.MEDIA_ERR_SRC_NOT_SUPPORTED)),t.message},"va"),xA=n((t,e=!1)=>{let i=MA(t,e).toString(),a=OA(t,e).toString();return{title:i,message:a}},"Mt"),NA=n(t=>{if(t.muxCode){if(t.muxCode===N.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(t.muxCode===N.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode))return"403-incorrect-aud-value.md";if(t.muxCode===N.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(t.muxCode===N.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(t.muxCode===N.NETWORK_NOT_FOUND)return"404-not-found.md";if(t.muxCode===N.NETWORK_NOT_READY)return"412-not-playable.md"}if(t.code){if(t.code===R.MEDIA_ERR_NETWORK)return"";if(t.code===R.MEDIA_ERR_DECODE)return"media-decode-error.md";if(t.code===R.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},"Aa"),If=n((t,e)=>{let i=NA(t);return{message:t.message,context:t.context,file:i}},"Ie"),PA=`<template id="media-theme-gerwig">
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
`,ru=Yo.createElement("template");"innerHTML"in ru&&(ru.innerHTML=PA);var _m,bm,Rf=class extends ml{static{n(this,"ye")}};Rf.template=(bm=(_m=ru.content)==null?void 0:_m.children)==null?void 0:bm[0];Gt.customElements.get("media-theme-gerwig")||Gt.customElements.define("media-theme-gerwig",Rf);var $A="gerwig",li={SRC:"src",POSTER:"poster"},k={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",FULLSCREEN_ELEMENT:"fullscreen-element",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",NO_MUTED_PREF:"no-muted-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended"},nu=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","nomutedpref","proudlydisplaymuxbadge"];function UA(t,e){var i,a,r;return{src:!t.playbackId&&t.src,playbackId:t.playbackId,hasSrc:!!t.playbackId||!!t.src||!!t.currentSrc,poster:t.poster,storyboard:((i=t.media)==null?void 0:i.currentSrc)&&t.storyboard,storyboardSrc:t.getAttribute(k.STORYBOARD_SRC),fullscreenElement:t.getAttribute(k.FULLSCREEN_ELEMENT),placeholder:t.getAttribute("placeholder"),themeTemplate:BA(t),thumbnailTime:!t.tokens.thumbnail&&t.thumbnailTime,autoplay:t.autoplay,crossOrigin:t.crossOrigin,loop:t.loop,noHotKeys:t.hasAttribute(k.NOHOTKEYS),hotKeys:t.getAttribute(k.HOTKEYS),muted:t.muted,paused:t.paused,preload:t.preload,envKey:t.envKey,preferCmcd:t.preferCmcd,debug:t.debug,disableTracking:t.disableTracking,disableCookies:t.disableCookies,tokens:t.tokens,beaconCollectionDomain:t.beaconCollectionDomain,maxResolution:t.maxResolution,minResolution:t.minResolution,maxAutoResolution:t.maxAutoResolution,programStartTime:t.programStartTime,programEndTime:t.programEndTime,assetStartTime:t.assetStartTime,assetEndTime:t.assetEndTime,renditionOrder:t.renditionOrder,metadata:t.metadata,playerInitTime:t.playerInitTime,playerSoftwareName:t.playerSoftwareName,playerSoftwareVersion:t.playerSoftwareVersion,startTime:t.startTime,initialBandwidthEstimateKbps:t.initialBandwidthEstimateKbps,initialEstimateSegments:t.initialEstimateSegments,minPreloadSegments:t.minPreloadSegments,preferPlayback:t.preferPlayback,audio:t.audio,defaultStreamType:t.defaultStreamType,targetLiveWindow:t.getAttribute(E.TARGET_LIVE_WINDOW),streamType:Nc(t.getAttribute(E.STREAM_TYPE)),primaryColor:t.getAttribute(k.PRIMARY_COLOR),secondaryColor:t.getAttribute(k.SECONDARY_COLOR),accentColor:t.getAttribute(k.ACCENT_COLOR),forwardSeekOffset:t.forwardSeekOffset,backwardSeekOffset:t.backwardSeekOffset,defaultHiddenCaptions:t.defaultHiddenCaptions,defaultDuration:t.defaultDuration,defaultShowRemainingTime:t.defaultShowRemainingTime,hideDuration:WA(t),playbackRates:t.getAttribute(k.PLAYBACK_RATES),customDomain:(a=t.getAttribute(E.CUSTOM_DOMAIN))!=null?a:void 0,title:t.getAttribute(k.TITLE),videoTitle:(r=t.getAttribute(k.VIDEO_TITLE))!=null?r:t.getAttribute(k.TITLE),novolumepref:t.hasAttribute(k.NO_VOLUME_PREF),nomutedpref:t.hasAttribute(k.NO_MUTED_PREF),proudlyDisplayMuxBadge:t.hasAttribute(k.PROUDLY_DISPLAY_MUX_BADGE),castReceiver:t.castReceiver,disablePseudoEnded:t.hasAttribute(k.DISABLE_PSEUDO_ENDED),capRenditionToPlayerSize:t.capRenditionToPlayerSize,...e,extraSourceParams:t.extraSourceParams}}n(UA,"Ma");var HA=bv.formatErrorMessage;bv.formatErrorMessage=t=>{var e,i;if(t instanceof R){let a=xA(t,!1);return`
      ${a!=null&&a.title?`<h3>${a.title}</h3>`:""}
      ${a!=null&&a.message||a!=null&&a.linkUrl?`<p>
        ${a?.message}
        ${a!=null&&a.linkUrl?`<a
              href="${a.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(e=a.linkText)!=null?e:""} ${x("(opens in a new window)")}"
              >${(i=a.linkText)!=null?i:a.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return HA(t)};function BA(t){var e,i;let a=t.theme;if(a){let r=(i=(e=t.getRootNode())==null?void 0:e.getElementById)==null?void 0:i.call(e,a);if(r&&r instanceof HTMLTemplateElement)return r;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let s=Gt.customElements.get(a);if(s!=null&&s.template)return s.template}}n(BA,"Na");function WA(t){var e;let i=(e=t.mediaController)==null?void 0:e.querySelector("media-time-display");return i&&getComputedStyle(i).getPropertyValue("--media-duration-display-display").trim()==="none"}n(WA,"Ia");function gm(t){let e=t.videoTitle?{video_title:t.videoTitle}:{};return t.getAttributeNames().filter(i=>i.startsWith("metadata-")).reduce((i,a)=>{let r=t.getAttribute(a);return r!==null&&(i[a.replace(/^metadata-/,"").replace(/-/g,"_")]=r),i},e)}n(gm,"Ut");var FA=Object.values(E),KA=Object.values(li),VA=Object.values(k),ym=Tf(),Tm="mux-player",Am={isDialogOpen:!1},qA={redundant_streams:!0},po,En,vo,aa,fo,_n,Go,zo,lr,bn,dr,Qo,ce,di,Lf,su,ua,km,Sm,wm,Im,YA=class extends vm{static{n(this,"Ve")}constructor(){super(),Ne(this,ce),Ne(this,po),Ne(this,En,!1),Ne(this,vo,{}),Ne(this,aa,!0),Ne(this,fo,new dA(this,"hotkeys")),Ne(this,_n),Ne(this,Go,()=>pe(this,ce,ua).call(this)),Ne(this,zo,()=>pe(this,ce,ua).call(this)),Ne(this,lr,()=>pe(this,ce,ua).call(this)),Ne(this,bn),Ne(this,dr,{...Am,onCloseErrorDialog:n(t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&pe(this,ce,su).call(this,{isDialogOpen:!1})},"onCloseErrorDialog"),onFocusInErrorDialog:n(t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&(gf(this,Yo.activeElement)||t.preventDefault())},"onFocusInErrorDialog")}),Ne(this,Qo,t=>{var e;let i=(e=this.media)==null?void 0:e.error;if(!(i instanceof R)){let{message:r,code:s}=i??{};i=new R(r,s)}if(!(i!=null&&i.fatal)){oi(i),i.data&&oi(`${i.name} data:`,i.data);return}let a=If(i);a.message&&mm(a),tt(i),i.data&&tt(`${i.name} data:`,i.data),pe(this,ce,su).call(this,{isDialogOpen:!0})}),Ye(this,po,_u()),this.attachShadow({mode:"open"}),pe(this,ce,Lf).call(this),this.isConnected&&pe(this,ce,di).call(this)}static get NAME(){return Tm}static get VERSION(){return ym}static get observedAttributes(){var t;return[...(t=vm.observedAttributes)!=null?t:[],...KA,...FA,...VA]}get mediaTheme(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("media-theme")}get mediaController(){var t,e;return(e=(t=this.mediaTheme)==null?void 0:t.shadowRoot)==null?void 0:e.querySelector("media-controller")}connectedCallback(){pe(this,ce,di).call(this);let t=this.media;t&&(t.metadata=gm(this))}disconnectedCallback(){var t,e,i,a,r,s,o,l;(t=B(this,_n))==null||t.disconnect(),(e=this.media)==null||e.removeEventListener("streamtypechange",B(this,Go)),(i=this.media)==null||i.removeEventListener("loadstart",B(this,zo)),this.removeEventListener("error",B(this,Qo)),this.media&&(this.media.errorTranslator=void 0),(r=(a=this.media)==null?void 0:a.textTracks)==null||r.removeEventListener("addtrack",B(this,lr)),(o=(s=this.media)==null?void 0:s.textTracks)==null||o.removeEventListener("removetrack",B(this,lr)),(l=B(this,bn))==null||l.call(this),Ye(this,bn,void 0),Ye(this,En,!1)}attributeChangedCallback(t,e,i){switch(pe(this,ce,di).call(this),super.attributeChangedCallback(t,e,i),t){case k.HOTKEYS:B(this,fo).value=i;break;case k.THUMBNAIL_TIME:{i!=null&&this.tokens.thumbnail&&oi(x("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case k.THUMBNAIL_TOKEN:{if(i){let a=tr(i);if(a){let{aud:r}=a,s=dn.THUMBNAIL;r!==s&&oi(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:s,tokenNamePrefix:"thumbnail"}))}}break}case k.STORYBOARD_TOKEN:{if(i){let a=tr(i);if(a){let{aud:r}=a,s=dn.STORYBOARD;r!==s&&oi(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:s,tokenNamePrefix:"storyboard"}))}}break}case k.DRM_TOKEN:{if(i){let a=tr(i);if(a){let{aud:r}=a,s=dn.DRM;r!==s&&oi(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:s,tokenNamePrefix:"drm"}))}}break}case E.PLAYBACK_ID:{i!=null&&i.includes("?token")&&tt(x("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:i}));break}case E.STREAM_TYPE:{i&&![Z.LIVE,Z.ON_DEMAND,Z.UNKNOWN].includes(i)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=i.includes("dvr")?Number.POSITIVE_INFINITY:0:mm({file:"invalid-stream-type.md",message:x("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):i===Z.LIVE?this.getAttribute(k.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN;break}case k.FULLSCREEN_ELEMENT:{if(i!=null||i!==e){let a=Yo.getElementById(i),r=a?.querySelector("mux-player");this.mediaController&&a&&r&&(this.mediaController.fullscreenElement=a)}break}case E.CAP_RENDITION_TO_PLAYER_SIZE:{(i==null||i!==e)&&(this.capRenditionToPlayerSize=i!=null?!0:void 0);break}}[E.PLAYBACK_ID,li.SRC,k.PLAYBACK_TOKEN].includes(t)&&e!==i&&Ye(this,dr,{...B(this,dr),...Am}),pe(this,ce,ua).call(this,{[lA(t)]:i})}async requestFullscreen(t){var e;if(!(!this.mediaController||this.mediaController.hasAttribute(h.MEDIA_IS_FULLSCREEN)))return(e=this.mediaController)==null||e.dispatchEvent(new Gt.CustomEvent(C.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((i,a)=>{var r;(r=this.mediaController)==null||r.addEventListener(Jt.MEDIA_IS_FULLSCREEN,()=>i(),{once:!0})})}async exitFullscreen(){var t;if(!(!this.mediaController||!this.mediaController.hasAttribute(h.MEDIA_IS_FULLSCREEN)))return(t=this.mediaController)==null||t.dispatchEvent(new Gt.CustomEvent(C.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((e,i)=>{var a;(a=this.mediaController)==null||a.addEventListener(Jt.MEDIA_IS_FULLSCREEN,()=>e(),{once:!0})})}get preferCmcd(){var t;return(t=this.getAttribute(E.PREFER_CMCD))!=null?t:void 0}set preferCmcd(t){t!==this.preferCmcd&&(t?go.includes(t)?this.setAttribute(E.PREFER_CMCD,t):oi(`Invalid value for preferCmcd. Must be one of ${go.join()}`):this.removeAttribute(E.PREFER_CMCD))}get hasPlayed(){var t,e;return(e=(t=this.mediaController)==null?void 0:t.hasAttribute(h.MEDIA_HAS_PLAYED))!=null?e:!1}get inLiveWindow(){var t;return(t=this.mediaController)==null?void 0:t.hasAttribute(h.MEDIA_TIME_IS_LIVE)}get _hls(){var t;return(t=this.media)==null?void 0:t._hls}get mux(){var t;return(t=this.media)==null?void 0:t.mux}get theme(){var t;return(t=this.getAttribute(k.THEME))!=null?t:$A}set theme(t){this.setAttribute(k.THEME,`${t}`)}get themeProps(){let t=this.mediaTheme;if(!t)return;let e={};for(let i of t.getAttributeNames()){if(nu.includes(i))continue;let a=t.getAttribute(i);e[_f(i)]=a===""?!0:a}return e}set themeProps(t){var e,i;pe(this,ce,di).call(this);let a={...this.themeProps,...t};for(let r in a){if(nu.includes(r))continue;let s=t?.[r];typeof s=="boolean"||s==null?(e=this.mediaTheme)==null||e.toggleAttribute(au(r),!!s):(i=this.mediaTheme)==null||i.setAttribute(au(r),s)}}get playbackId(){var t;return(t=this.getAttribute(E.PLAYBACK_ID))!=null?t:void 0}set playbackId(t){t?this.setAttribute(E.PLAYBACK_ID,t):this.removeAttribute(E.PLAYBACK_ID)}get src(){var t,e;return this.playbackId?(t=Ot(this,li.SRC))!=null?t:void 0:(e=this.getAttribute(li.SRC))!=null?e:void 0}set src(t){t?this.setAttribute(li.SRC,t):this.removeAttribute(li.SRC)}get poster(){var t;let e=this.getAttribute(li.POSTER);if(e!=null)return e;let{tokens:i}=this;if(i.playback&&!i.thumbnail){oi("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return nA(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(t=this.thumbnailTime)!=null?t:this.startTime,programTime:this.programStartTime,token:i.thumbnail})}set poster(t){t||t===""?this.setAttribute(li.POSTER,t):this.removeAttribute(li.POSTER)}get storyboardSrc(){var t;return(t=this.getAttribute(k.STORYBOARD_SRC))!=null?t:void 0}set storyboardSrc(t){t?this.setAttribute(k.STORYBOARD_SRC,t):this.removeAttribute(k.STORYBOARD_SRC)}get storyboard(){let{tokens:t}=this;if(this.storyboardSrc&&!t.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[Z.LIVE,Z.UNKNOWN].includes(this.streamType)||t.playback&&!t.storyboard))return sA(this.playbackId,{customDomain:this.customDomain,token:t.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(k.AUDIO)}set audio(t){if(!t){this.removeAttribute(k.AUDIO);return}this.setAttribute(k.AUDIO,"")}get hotkeys(){return B(this,fo)}get nohotkeys(){return this.hasAttribute(k.NOHOTKEYS)}set nohotkeys(t){if(!t){this.removeAttribute(k.NOHOTKEYS);return}this.setAttribute(k.NOHOTKEYS,"")}get thumbnailTime(){return He(this.getAttribute(k.THUMBNAIL_TIME))}set thumbnailTime(t){this.setAttribute(k.THUMBNAIL_TIME,`${t}`)}get videoTitle(){var t,e;return(e=(t=this.getAttribute(k.VIDEO_TITLE))!=null?t:this.getAttribute(k.TITLE))!=null?e:""}set videoTitle(t){t!==this.videoTitle&&(t?this.setAttribute(k.VIDEO_TITLE,t):this.removeAttribute(k.VIDEO_TITLE))}get placeholder(){var t;return(t=Ot(this,k.PLACEHOLDER))!=null?t:""}set placeholder(t){this.setAttribute(k.PLACEHOLDER,`${t}`)}get primaryColor(){var t,e;let i=this.getAttribute(k.PRIMARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Gt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_primary-color"))==null?void 0:e.trim(),i))return i}set primaryColor(t){this.setAttribute(k.PRIMARY_COLOR,`${t}`)}get secondaryColor(){var t,e;let i=this.getAttribute(k.SECONDARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Gt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_secondary-color"))==null?void 0:e.trim(),i))return i}set secondaryColor(t){this.setAttribute(k.SECONDARY_COLOR,`${t}`)}get accentColor(){var t,e;let i=this.getAttribute(k.ACCENT_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Gt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_accent-color"))==null?void 0:e.trim(),i))return i}set accentColor(t){this.setAttribute(k.ACCENT_COLOR,`${t}`)}get defaultShowRemainingTime(){return this.hasAttribute(k.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(t){t?this.setAttribute(k.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(k.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(k.PLAYBACK_RATES))return this.getAttribute(k.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(t=>Number(t)).filter(t=>!Number.isNaN(t)).sort((t,e)=>t-e)}set playbackRates(t){if(!t){this.removeAttribute(k.PLAYBACK_RATES);return}this.setAttribute(k.PLAYBACK_RATES,t.join(" "))}get forwardSeekOffset(){var t;return(t=He(this.getAttribute(k.FORWARD_SEEK_OFFSET)))!=null?t:10}set forwardSeekOffset(t){this.setAttribute(k.FORWARD_SEEK_OFFSET,`${t}`)}get backwardSeekOffset(){var t;return(t=He(this.getAttribute(k.BACKWARD_SEEK_OFFSET)))!=null?t:10}set backwardSeekOffset(t){this.setAttribute(k.BACKWARD_SEEK_OFFSET,`${t}`)}get defaultHiddenCaptions(){return this.hasAttribute(k.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(t){t?this.setAttribute(k.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(k.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return He(this.getAttribute(k.DEFAULT_DURATION))}set defaultDuration(t){t==null?this.removeAttribute(k.DEFAULT_DURATION):this.setAttribute(k.DEFAULT_DURATION,`${t}`)}get playerInitTime(){return this.hasAttribute(E.PLAYER_INIT_TIME)?He(this.getAttribute(E.PLAYER_INIT_TIME)):B(this,po)}set playerInitTime(t){t!=this.playerInitTime&&(t==null?this.removeAttribute(E.PLAYER_INIT_TIME):this.setAttribute(E.PLAYER_INIT_TIME,`${+t}`))}get playerSoftwareName(){var t;return(t=this.getAttribute(E.PLAYER_SOFTWARE_NAME))!=null?t:Tm}get playerSoftwareVersion(){var t;return(t=this.getAttribute(E.PLAYER_SOFTWARE_VERSION))!=null?t:ym}get beaconCollectionDomain(){var t;return(t=this.getAttribute(E.BEACON_COLLECTION_DOMAIN))!=null?t:void 0}set beaconCollectionDomain(t){t!==this.beaconCollectionDomain&&(t?this.setAttribute(E.BEACON_COLLECTION_DOMAIN,t):this.removeAttribute(E.BEACON_COLLECTION_DOMAIN))}get maxResolution(){var t;return(t=this.getAttribute(E.MAX_RESOLUTION))!=null?t:void 0}set maxResolution(t){t!==this.maxResolution&&(t?this.setAttribute(E.MAX_RESOLUTION,t):this.removeAttribute(E.MAX_RESOLUTION))}get minResolution(){var t;return(t=this.getAttribute(E.MIN_RESOLUTION))!=null?t:void 0}set minResolution(t){t!==this.minResolution&&(t?this.setAttribute(E.MIN_RESOLUTION,t):this.removeAttribute(E.MIN_RESOLUTION))}get maxAutoResolution(){var t;return(t=this.getAttribute(E.MAX_AUTO_RESOLUTION))!=null?t:void 0}set maxAutoResolution(t){t==null?this.removeAttribute(E.MAX_AUTO_RESOLUTION):this.setAttribute(E.MAX_AUTO_RESOLUTION,t)}get renditionOrder(){var t;return(t=this.getAttribute(E.RENDITION_ORDER))!=null?t:void 0}set renditionOrder(t){t!==this.renditionOrder&&(t?this.setAttribute(E.RENDITION_ORDER,t):this.removeAttribute(E.RENDITION_ORDER))}get programStartTime(){return He(this.getAttribute(E.PROGRAM_START_TIME))}set programStartTime(t){t==null?this.removeAttribute(E.PROGRAM_START_TIME):this.setAttribute(E.PROGRAM_START_TIME,`${t}`)}get programEndTime(){return He(this.getAttribute(E.PROGRAM_END_TIME))}set programEndTime(t){t==null?this.removeAttribute(E.PROGRAM_END_TIME):this.setAttribute(E.PROGRAM_END_TIME,`${t}`)}get assetStartTime(){return He(this.getAttribute(E.ASSET_START_TIME))}set assetStartTime(t){t==null?this.removeAttribute(E.ASSET_START_TIME):this.setAttribute(E.ASSET_START_TIME,`${t}`)}get assetEndTime(){return He(this.getAttribute(E.ASSET_END_TIME))}set assetEndTime(t){t==null?this.removeAttribute(E.ASSET_END_TIME):this.setAttribute(E.ASSET_END_TIME,`${t}`)}get extraSourceParams(){return this.hasAttribute(k.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(k.EXTRA_SOURCE_PARAMS)).entries()].reduce((t,[e,i])=>(t[e]=i,t),{}):qA}set extraSourceParams(t){t==null?this.removeAttribute(k.EXTRA_SOURCE_PARAMS):this.setAttribute(k.EXTRA_SOURCE_PARAMS,new URLSearchParams(t).toString())}get customDomain(){var t;return(t=this.getAttribute(E.CUSTOM_DOMAIN))!=null?t:void 0}set customDomain(t){t!==this.customDomain&&(t?this.setAttribute(E.CUSTOM_DOMAIN,t):this.removeAttribute(E.CUSTOM_DOMAIN))}get envKey(){var t;return(t=Ot(this,E.ENV_KEY))!=null?t:void 0}set envKey(t){this.setAttribute(E.ENV_KEY,`${t}`)}get noVolumePref(){return this.hasAttribute(k.NO_VOLUME_PREF)}set noVolumePref(t){t?this.setAttribute(k.NO_VOLUME_PREF,""):this.removeAttribute(k.NO_VOLUME_PREF)}get noMutedPref(){return this.hasAttribute(k.NO_MUTED_PREF)}set noMutedPref(t){t?this.setAttribute(k.NO_MUTED_PREF,""):this.removeAttribute(k.NO_MUTED_PREF)}get debug(){return Ot(this,E.DEBUG)!=null}set debug(t){t?this.setAttribute(E.DEBUG,""):this.removeAttribute(E.DEBUG)}get disableTracking(){return Ot(this,E.DISABLE_TRACKING)!=null}set disableTracking(t){this.toggleAttribute(E.DISABLE_TRACKING,!!t)}get disableCookies(){return Ot(this,E.DISABLE_COOKIES)!=null}set disableCookies(t){t?this.setAttribute(E.DISABLE_COOKIES,""):this.removeAttribute(E.DISABLE_COOKIES)}get streamType(){var t,e,i;return(i=(e=this.getAttribute(E.STREAM_TYPE))!=null?e:(t=this.media)==null?void 0:t.streamType)!=null?i:Z.UNKNOWN}set streamType(t){this.setAttribute(E.STREAM_TYPE,`${t}`)}get defaultStreamType(){var t,e,i;return(i=(e=this.getAttribute(k.DEFAULT_STREAM_TYPE))!=null?e:(t=this.mediaController)==null?void 0:t.getAttribute(k.DEFAULT_STREAM_TYPE))!=null?i:Z.ON_DEMAND}set defaultStreamType(t){t?this.setAttribute(k.DEFAULT_STREAM_TYPE,t):this.removeAttribute(k.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var t,e;return this.hasAttribute(k.TARGET_LIVE_WINDOW)?+this.getAttribute(k.TARGET_LIVE_WINDOW):(e=(t=this.media)==null?void 0:t.targetLiveWindow)!=null?e:Number.NaN}set targetLiveWindow(t){t==this.targetLiveWindow||Number.isNaN(t)&&Number.isNaN(this.targetLiveWindow)||(t==null?this.removeAttribute(k.TARGET_LIVE_WINDOW):this.setAttribute(k.TARGET_LIVE_WINDOW,`${+t}`))}get liveEdgeStart(){var t;return(t=this.media)==null?void 0:t.liveEdgeStart}get startTime(){return He(Ot(this,E.START_TIME))}set startTime(t){this.setAttribute(E.START_TIME,`${t}`)}get initialBandwidthEstimateKbps(){return He(Ot(this,E.INITIAL_BANDWIDTH_ESTIMATE_KBPS))}set initialBandwidthEstimateKbps(t){t==null?this.removeAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS):this.setAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS,`${t}`)}get initialEstimateSegments(){return He(Ot(this,E.INITIAL_ESTIMATE_SEGMENTS))}set initialEstimateSegments(t){t==null?this.removeAttribute(E.INITIAL_ESTIMATE_SEGMENTS):this.setAttribute(E.INITIAL_ESTIMATE_SEGMENTS,`${t}`)}get minPreloadSegments(){return He(Ot(this,E.MIN_PRELOAD_SEGMENTS))}set minPreloadSegments(t){t==null?this.removeAttribute(E.MIN_PRELOAD_SEGMENTS):this.setAttribute(E.MIN_PRELOAD_SEGMENTS,`${t}`)}get preferPlayback(){let t=this.getAttribute(E.PREFER_PLAYBACK);if(t===zt.MSE||t===zt.NATIVE)return t}set preferPlayback(t){t!==this.preferPlayback&&(t===zt.MSE||t===zt.NATIVE?this.setAttribute(E.PREFER_PLAYBACK,t):this.removeAttribute(E.PREFER_PLAYBACK))}get metadata(){var t;return(t=this.media)==null?void 0:t.metadata}set metadata(t){if(pe(this,ce,di).call(this),!this.media){tt("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...gm(this),...t}}get _hlsConfig(){var t;return(t=this.media)==null?void 0:t._hlsConfig}set _hlsConfig(t){if(pe(this,ce,di).call(this),!this.media){tt("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=t}async addCuePoints(t){var e;if(pe(this,ce,di).call(this),!this.media){tt("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(e=this.media)==null?void 0:e.addCuePoints(t)}get activeCuePoint(){var t;return(t=this.media)==null?void 0:t.activeCuePoint}get cuePoints(){var t,e;return(e=(t=this.media)==null?void 0:t.cuePoints)!=null?e:[]}addChapters(t){var e;if(pe(this,ce,di).call(this),!this.media){tt("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(e=this.media)==null?void 0:e.addChapters(t)}get activeChapter(){var t;return(t=this.media)==null?void 0:t.activeChapter}get chapters(){var t,e;return(e=(t=this.media)==null?void 0:t.chapters)!=null?e:[]}getStartDate(){var t;return(t=this.media)==null?void 0:t.getStartDate()}get currentPdt(){var t;return(t=this.media)==null?void 0:t.currentPdt}get tokens(){let t=this.getAttribute(k.PLAYBACK_TOKEN),e=this.getAttribute(k.DRM_TOKEN),i=this.getAttribute(k.THUMBNAIL_TOKEN),a=this.getAttribute(k.STORYBOARD_TOKEN);return{...B(this,vo),...t!=null?{playback:t}:{},...e!=null?{drm:e}:{},...i!=null?{thumbnail:i}:{},...a!=null?{storyboard:a}:{}}}set tokens(t){Ye(this,vo,t??{})}get playbackToken(){var t;return(t=this.getAttribute(k.PLAYBACK_TOKEN))!=null?t:void 0}set playbackToken(t){this.setAttribute(k.PLAYBACK_TOKEN,`${t}`)}get drmToken(){var t;return(t=this.getAttribute(k.DRM_TOKEN))!=null?t:void 0}set drmToken(t){this.setAttribute(k.DRM_TOKEN,`${t}`)}get thumbnailToken(){var t;return(t=this.getAttribute(k.THUMBNAIL_TOKEN))!=null?t:void 0}set thumbnailToken(t){this.setAttribute(k.THUMBNAIL_TOKEN,`${t}`)}get storyboardToken(){var t;return(t=this.getAttribute(k.STORYBOARD_TOKEN))!=null?t:void 0}set storyboardToken(t){this.setAttribute(k.STORYBOARD_TOKEN,`${t}`)}addTextTrack(t,e,i,a){var r;let s=(r=this.media)==null?void 0:r.nativeEl;if(s)return pu(s,t,e,i,a)}removeTextTrack(t){var e;let i=(e=this.media)==null?void 0:e.nativeEl;if(i)return Ob(i,t)}get textTracks(){var t;return(t=this.media)==null?void 0:t.textTracks}get castReceiver(){var t;return(t=this.getAttribute(k.CAST_RECEIVER))!=null?t:void 0}set castReceiver(t){t!==this.castReceiver&&(t?this.setAttribute(k.CAST_RECEIVER,t):this.removeAttribute(k.CAST_RECEIVER))}get castCustomData(){var t;return(t=this.media)==null?void 0:t.castCustomData}set castCustomData(t){if(!this.media){tt("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=t}get noTooltips(){return this.hasAttribute(k.NO_TOOLTIPS)}set noTooltips(t){if(!t){this.removeAttribute(k.NO_TOOLTIPS);return}this.setAttribute(k.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(k.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(t){t?this.setAttribute(k.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(k.PROUDLY_DISPLAY_MUX_BADGE)}get capRenditionToPlayerSize(){var t;return(t=this.media)==null?void 0:t.capRenditionToPlayerSize}set capRenditionToPlayerSize(t){if(!this.media){tt("underlying media element missing when trying to set capRenditionToPlayerSize");return}this.media.capRenditionToPlayerSize=t}};po=new WeakMap,En=new WeakMap,vo=new WeakMap,aa=new WeakMap,fo=new WeakMap,_n=new WeakMap,Go=new WeakMap,zo=new WeakMap,lr=new WeakMap,bn=new WeakMap,dr=new WeakMap,Qo=new WeakMap,ce=new WeakSet,di=n(function(){var t,e,i,a;if(!B(this,En)){Ye(this,En,!0),pe(this,ce,ua).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof Gt.HTMLElement))throw""}catch{tt("<media-theme> failed to upgrade!")}try{customElements.upgrade(this.media)}catch{tt("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof u1))throw""}catch{tt("<media-controller> failed to upgrade!")}pe(this,ce,km).call(this),pe(this,ce,Sm).call(this),pe(this,ce,wm).call(this),Ye(this,aa,(e=(t=this.mediaController)==null?void 0:t.hasAttribute(P.USER_INACTIVE))!=null?e:!0),pe(this,ce,Im).call(this),(i=this.media)==null||i.addEventListener("streamtypechange",B(this,Go)),(a=this.media)==null||a.addEventListener("loadstart",B(this,zo))}},"I"),Lf=n(function(){var t,e;try{(t=window?.CSS)==null||t.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(e=window?.CSS)==null||e.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},"$t"),su=n(function(t){Object.assign(B(this,dr),t),pe(this,ce,ua).call(this)},"Ke"),ua=n(function(t={}){SA(IA(UA(this,{...B(this,dr),...t})),this.shadowRoot)},"K"),km=n(function(){let t=n(e=>{var i,a;if(!(e!=null&&e.startsWith("theme-")))return;let r=e.replace(/^theme-/,"");if(nu.includes(r))return;let s=this.getAttribute(e);s!=null?(i=this.mediaTheme)==null||i.setAttribute(r,s):(a=this.mediaTheme)==null||a.removeAttribute(r)},"e");Ye(this,_n,new MutationObserver(e=>{for(let{attributeName:i}of e)t(i)})),B(this,_n).observe(this,{attributes:!0}),this.getAttributeNames().forEach(t)},"Ft"),Sm=n(function(){this.addEventListener("error",B(this,Qo)),this.media&&(this.media.errorTranslator=(t={})=>{var e,i,a;if(!(((e=this.media)==null?void 0:e.error)instanceof R))return t;let r=If((i=this.media)==null?void 0:i.error);return{player_error_code:(a=this.media)==null?void 0:a.error.code,player_error_message:r.message?String(r.message):t.player_error_message,player_error_context:r.context?String(r.context):t.player_error_context}})},"Yt"),wm=n(function(){var t,e,i,a;(e=(t=this.media)==null?void 0:t.textTracks)==null||e.addEventListener("addtrack",B(this,lr)),(a=(i=this.media)==null?void 0:i.textTracks)==null||a.addEventListener("removetrack",B(this,lr))},"Wt"),Im=n(function(){var t,e;if(!/Firefox/i.test(navigator.userAgent))return;let i,a=new WeakMap,r=n(()=>this.streamType===Z.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,"s"),s=n((c,p,v=!1)=>{r()||Array.from(c&&c.activeCues||[]).forEach(m=>{if(!(!m.snapToLines||m.line<-5||m.line>=0&&m.line<10))if(!p||this.paused){let u=m.text.split(`
`).length,f=-3;this.streamType===Z.LIVE&&(f=-2);let _=f-u;if(m.line===_&&!v)return;a.has(m)||a.set(m,m.line),m.line=_}else setTimeout(()=>{m.line=a.get(m)||"auto"},500)})},"d"),o=n(()=>{var c,p;s(i,(p=(c=this.mediaController)==null?void 0:c.hasAttribute(P.USER_INACTIVE))!=null?p:!1)},"u"),l=n(()=>{var c,p;let v=Array.from(((p=(c=this.mediaController)==null?void 0:c.media)==null?void 0:p.textTracks)||[]).filter(m=>["subtitles","captions"].includes(m.kind)&&m.mode==="showing")[0];v!==i&&i?.removeEventListener("cuechange",o),i=v,i?.addEventListener("cuechange",o),s(i,B(this,aa))},"b");l(),(t=this.textTracks)==null||t.addEventListener("change",l),(e=this.textTracks)==null||e.addEventListener("addtrack",l);let d=n(()=>{var c,p;let v=(p=(c=this.mediaController)==null?void 0:c.hasAttribute(P.USER_INACTIVE))!=null?p:!0;B(this,aa)!==v&&(Ye(this,aa,v),s(i,B(this,aa)))},"R");this.addEventListener("userinactivechange",d),Ye(this,bn,()=>{var c,p;i?.removeEventListener("cuechange",o),(c=this.textTracks)==null||c.removeEventListener("change",l),(p=this.textTracks)==null||p.removeEventListener("addtrack",l),this.removeEventListener("userinactivechange",d)})},"Zt");function Ot(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}n(Ot,"M$1");var Rm=YA,Cf=class{static{n(this,"o")}addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends Cf{static{n(this,"e")}}globalThis.DocumentFragment=t}var GA=class extends Cf{static{n(this,"s")}},zA={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(GA)}},QA={customElements:zA},jA=typeof window>"u"||typeof globalThis.customElements>"u",Bl=jA?QA:globalThis;Bl.customElements.get("mux-player")||(Bl.customElements.define("mux-player",Rm),Bl.MuxPlayerElement=Rm);var Df=parseInt(gn.version)>=19,Lm={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate"},ZA=n(t=>t==null,"B"),XA=n((t,e)=>ZA(e)?!1:t in e,"ee"),JA=n(t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),"te"),ek=n((t,e)=>{if(!(!Df&&typeof e=="boolean"&&!e)){if(XA(t,Lm))return Lm[t];if(typeof e<"u")return/[A-Z]/.test(t)?JA(t):t}},"ne"),tk=n((t,e)=>!Df&&typeof t=="boolean"?"":t,"ae"),ik=n((t={})=>{let{ref:e,...i}=t;return Object.entries(i).reduce((a,[r,s])=>{let o=ek(r,s);if(!o)return a;let l=tk(s);return a[o]=l,a},{})},"P");function Cm(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}n(Cm,"x");function ak(...t){return e=>{let i=!1,a=t.map(r=>{let s=Cm(r,e);return!i&&typeof s=="function"&&(i=!0),s});if(i)return()=>{for(let r=0;r<a.length;r++){let s=a[r];typeof s=="function"?s():Cm(t[r],null)}}}}n(ak,"re");function rk(...t){return yn.useCallback(ak(...t),t)}n(rk,"f");var nk=Object.prototype.hasOwnProperty,sk=n((t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((r,s)=>e[s]===r);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let r=0;r<i.length;r++)if(!nk.call(e,i[r])||!Object.is(t[i[r]],e[i[r]]))return!1;return!0},"ue"),Mf=n((t,e,i)=>!sk(e,t[i]),"p"),ok=n((t,e,i)=>{t[i]=e},"se"),lk=n((t,e,i,a=ok,r=Mf)=>yn.useEffect(()=>{let s=i?.current;s&&r(s,e,t)&&a(s,e,t)},[i?.current,e]),"ie"),xt=lk,dk=n(()=>{try{return"3.13.0"}catch{}return"UNKNOWN"},"ye"),uk=dk(),ck=n(()=>uk,"g"),ne=n((t,e,i)=>yn.useEffect(()=>{let a=e?.current;if(!a||!i)return;let r=t,s=i;return a.addEventListener(r,s),()=>{a.removeEventListener(r,s)}},[e?.current,i,t]),"r"),hk=gn.forwardRef(({children:t,...e},i)=>gn.createElement("mux-player",{suppressHydrationWarning:!0,...ik(e),ref:i},t)),mk=n((t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:s,onLoadStart:o,onLoadedData:l,onLoadedMetadata:d,onProgress:c,onDurationChange:p,onVolumeChange:v,onRateChange:m,onResize:u,onWaiting:f,onPlay:_,onPlaying:g,onTimeUpdate:T,onPause:A,onSeeking:y,onSeeked:S,onStalled:M,onSuspend:D,onEnded:U,onError:W,onCuePointChange:z,onChapterChange:F,metadata:H,tokens:Pe,paused:Qe,playbackId:je,playbackRates:fe,currentTime:Be,themeProps:Lt,extraSourceParams:We,castCustomData:pt,_hlsConfig:Ze,...Ie}=e;return xt("tokens",Pe,t),xt("playbackId",je,t),xt("playbackRates",fe,t),xt("metadata",H,t),xt("extraSourceParams",We,t),xt("_hlsConfig",Ze,t),xt("themeProps",Lt,t),xt("castCustomData",pt,t),xt("paused",Qe,t,($e,Fe)=>{Fe!=null&&(Fe?$e.pause():$e.play())},($e,Fe,ti)=>$e.hasAttribute("autoplay")&&!$e.hasPlayed?!1:Mf($e,Fe,ti)),xt("currentTime",Be,t,($e,Fe)=>{Fe!=null&&($e.currentTime=Fe)}),ne("abort",t,i),ne("canplay",t,a),ne("canplaythrough",t,r),ne("emptied",t,s),ne("loadstart",t,o),ne("loadeddata",t,l),ne("loadedmetadata",t,d),ne("progress",t,c),ne("durationchange",t,p),ne("volumechange",t,v),ne("ratechange",t,m),ne("resize",t,u),ne("waiting",t,f),ne("play",t,_),ne("playing",t,g),ne("timeupdate",t,T),ne("pause",t,A),ne("seeking",t,y),ne("seeked",t,S),ne("stalled",t,M),ne("suspend",t,D),ne("ended",t,U),ne("error",t,W),ne("cuepointchange",t,z),ne("chapterchange",t,F),[Ie]},"xe"),pk=ck(),vk="mux-player-react",fk=gn.forwardRef((t,e)=>{var i;let a=yn.useRef(null),r=rk(a,e),[s]=mk(a,t),[o]=yn.useState((i=t.playerInitTime)!=null?i:_u());return gn.createElement(hk,{ref:r,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:vk,playerSoftwareVersion:pk,playerInitTime:o,...s})}),Nk=fk;export{Tk as MaxResolution,R as MediaError,Ak as MinResolution,kk as RenditionOrder,Nk as default,_u as generatePlayerInitTime,vk as playerSoftwareName,pk as playerSoftwareVersion};

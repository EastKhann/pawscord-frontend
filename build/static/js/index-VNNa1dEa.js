var hf=Object.defineProperty;var n=(t,e)=>hf(t,"name",{value:e,configurable:!0});import{R as en,r as tn}from"./electron-QY9fnhXn.js";import{H as mf}from"./hls-B79YBYjf.js";import{C as Tn,M as pf}from"./mixin-Diuz3Ukq.js";var vf=Object.create,Jh=Object.defineProperty,ff=Object.getOwnPropertyDescriptor,Ef=Object.getOwnPropertyNames,_f=Object.getPrototypeOf,bf=Object.prototype.hasOwnProperty,em=n(function(t,e){return function(){return t&&(e=t(t=0)),e}},"pt$2"),We=n(function(t,e){return function(){return e||t((e={exports:{}}).exports,e),e.exports}},"B$3"),gf=n(function(t,e,i,a){if(e&&typeof e=="object"||typeof e=="function")for(var r=Ef(e),s=0,o=r.length,l;s<o;s++)l=r[s],!bf.call(t,l)&&l!==i&&Jh(t,l,{get:function(d){return e[d]}.bind(null,l),enumerable:!(a=ff(e,l))||a.enumerable});return t},"ta$1"),Xe=n(function(t,e,i){return i=t!=null?vf(_f(t)):{},gf(!t||!t.__esModule?Jh(i,"default",{value:t,enumerable:!0}):i,t)},"V$2"),Tt=We(function(t,e){var i;typeof window<"u"?i=window:typeof global<"u"?i=global:typeof self<"u"?i=self:i={},e.exports=i});function ra(t,e){return e!=null&&typeof Symbol<"u"&&e[Symbol.hasInstance]?!!e[Symbol.hasInstance](t):ra(t,e)}n(ra,"U$2");var na=em(function(){na()});function tm(t){"@swc/helpers - typeof";return t&&typeof Symbol<"u"&&t.constructor===Symbol?"symbol":typeof t}n(tm,"Ne$2");var im=em(function(){}),am=We(function(t,e){var i=Array.prototype.slice;e.exports=a;function a(r,s){for(("length"in r)||(r=[r]),r=i.call(r);r.length;){var o=r.shift(),l=s(o);if(l)return l;o.childNodes&&o.childNodes.length&&(r=i.call(o.childNodes).concat(r))}}n(a,"Pa")}),yf=We(function(t,e){na(),e.exports=i;function i(a,r){if(!ra(this,i))return new i(a,r);this.data=a,this.nodeValue=a,this.length=a.length,this.ownerDocument=r||null}n(i,"me"),i.prototype.nodeType=8,i.prototype.nodeName="#comment",i.prototype.toString=function(){return"[object Comment]"}}),Tf=We(function(t,e){na(),e.exports=i;function i(a,r){if(!ra(this,i))return new i(a);this.data=a||"",this.length=this.data.length,this.ownerDocument=r||null}n(i,"ae"),i.prototype.type="DOMTextNode",i.prototype.nodeType=3,i.prototype.nodeName="#text",i.prototype.toString=function(){return this.data},i.prototype.replaceData=function(a,r,s){var o=this.data,l=o.substring(0,a),d=o.substring(a+r,o.length);this.data=l+s+d,this.length=this.data.length}}),rm=We(function(t,e){e.exports=i;function i(a){var r=this,s=a.type;a.target||(a.target=r),r.listeners||(r.listeners={});var o=r.listeners[s];if(o)return o.forEach(function(l){a.currentTarget=r,typeof l=="function"?l(a):l.handleEvent(a)});r.parentNode&&r.parentNode.dispatchEvent(a)}n(i,"Ia")}),nm=We(function(t,e){e.exports=i;function i(a,r){var s=this;s.listeners||(s.listeners={}),s.listeners[a]||(s.listeners[a]=[]),s.listeners[a].indexOf(r)===-1&&s.listeners[a].push(r)}n(i,"Na")}),sm=We(function(t,e){e.exports=i;function i(a,r){var s=this;if(s.listeners&&s.listeners[a]){var o=s.listeners[a],l=o.indexOf(r);l!==-1&&o.splice(l,1)}}n(i,"La")}),Af=We(function(t,e){im(),e.exports=a;var i=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];function a(m){switch(m.nodeType){case 3:return p(m.data);case 8:return"<!--"+m.data+"-->";default:return r(m)}}n(a,"gr");function r(m){var h=[],f=m.tagName;return m.namespaceURI==="http://www.w3.org/1999/xhtml"&&(f=f.toLowerCase()),h.push("<"+f+u(m)+l(m)),i.indexOf(f)>-1?h.push(" />"):(h.push(">"),m.childNodes.length?h.push.apply(h,m.childNodes.map(a)):m.textContent||m.innerText?h.push(p(m.textContent||m.innerText)):m.innerHTML&&h.push(m.innerHTML),h.push("</"+f+">")),h.join("")}n(r,"Ma");function s(m,h){var f=tm(m[h]);return h==="style"&&Object.keys(m.style).length>0?!0:m.hasOwnProperty(h)&&(f==="string"||f==="boolean"||f==="number")&&h!=="nodeName"&&h!=="className"&&h!=="tagName"&&h!=="textContent"&&h!=="innerText"&&h!=="namespaceURI"&&h!=="innerHTML"}n(s,"Ha");function o(m){if(typeof m=="string")return m;var h="";return Object.keys(m).forEach(function(f){var _=m[f];f=f.replace(/[A-Z]/g,function(g){return"-"+g.toLowerCase()}),h+=f+":"+_+";"}),h}n(o,"Ba");function l(m){var h=m.dataset,f=[];for(var _ in h)f.push({name:"data-"+_,value:h[_]});return f.length?d(f):""}n(l,"Ua");function d(m){var h=[];return m.forEach(function(f){var _=f.name,g=f.value;_==="style"&&(g=o(g)),h.push(_+'="'+v(g)+'"')}),h.length?" "+h.join(" "):""}n(d,"br");function u(m){var h=[];for(var f in m)s(m,f)&&h.push({name:f,value:m[f]});for(var _ in m._attributes)for(var g in m._attributes[_]){var T=m._attributes[_][g],A=(T.prefix?T.prefix+":":"")+g;h.push({name:A,value:T.value})}return m.className&&h.push({name:"class",value:m.className}),h.length?d(h):""}n(u,"Fa");function p(m){var h="";return typeof m=="string"?h=m:m&&(h=m.toString()),h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}n(p,"et");function v(m){return p(m).replace(/"/g,"&quot;")}n(v,"Va")}),om=We(function(t,e){na();var i=am(),a=rm(),r=nm(),s=sm(),o=Af(),l="http://www.w3.org/1999/xhtml";e.exports=d;function d(u,p,v){if(!ra(this,d))return new d(u);var m=v===void 0?l:v||null;this.tagName=m===l?String(u).toUpperCase():u,this.nodeName=this.tagName,this.className="",this.dataset={},this.childNodes=[],this.parentNode=null,this.style={},this.ownerDocument=p||null,this.namespaceURI=m,this._attributes={},this.tagName==="INPUT"&&(this.type="text")}n(d,"I"),d.prototype.type="DOMElement",d.prototype.nodeType=1,d.prototype.appendChild=function(u){return u.parentNode&&u.parentNode.removeChild(u),this.childNodes.push(u),u.parentNode=this,u},d.prototype.replaceChild=function(u,p){u.parentNode&&u.parentNode.removeChild(u);var v=this.childNodes.indexOf(p);return p.parentNode=null,this.childNodes[v]=u,u.parentNode=this,p},d.prototype.removeChild=function(u){var p=this.childNodes.indexOf(u);return this.childNodes.splice(p,1),u.parentNode=null,u},d.prototype.insertBefore=function(u,p){u.parentNode&&u.parentNode.removeChild(u);var v=p==null?-1:this.childNodes.indexOf(p);return v>-1?this.childNodes.splice(v,0,u):this.childNodes.push(u),u.parentNode=this,u},d.prototype.setAttributeNS=function(u,p,v){var m=null,h=p,f=p.indexOf(":");if(f>-1&&(m=p.substr(0,f),h=p.substr(f+1)),this.tagName==="INPUT"&&p==="type")this.type=v;else{var _=this._attributes[u]||(this._attributes[u]={});_[h]={value:v,prefix:m}}},d.prototype.getAttributeNS=function(u,p){var v=this._attributes[u],m=v&&v[p]&&v[p].value;return this.tagName==="INPUT"&&p==="type"?this.type:typeof m!="string"?null:m},d.prototype.removeAttributeNS=function(u,p){var v=this._attributes[u];v&&delete v[p]},d.prototype.hasAttributeNS=function(u,p){var v=this._attributes[u];return!!v&&p in v},d.prototype.setAttribute=function(u,p){return this.setAttributeNS(null,u,p)},d.prototype.getAttribute=function(u){return this.getAttributeNS(null,u)},d.prototype.removeAttribute=function(u){return this.removeAttributeNS(null,u)},d.prototype.hasAttribute=function(u){return this.hasAttributeNS(null,u)},d.prototype.removeEventListener=s,d.prototype.addEventListener=r,d.prototype.dispatchEvent=a,d.prototype.focus=function(){},d.prototype.toString=function(){return o(this)},d.prototype.getElementsByClassName=function(u){var p=u.split(" "),v=[];return i(this,function(m){if(m.nodeType===1){var h=m.className||"",f=h.split(" ");p.every(function(_){return f.indexOf(_)!==-1})&&v.push(m)}}),v},d.prototype.getElementsByTagName=function(u){u=u.toLowerCase();var p=[];return i(this.childNodes,function(v){v.nodeType===1&&(u==="*"||v.tagName.toLowerCase()===u)&&p.push(v)}),p},d.prototype.contains=function(u){return i(this,function(p){return u===p})||!1}}),kf=We(function(t,e){na();var i=om();e.exports=a;function a(r){if(!ra(this,a))return new a;this.childNodes=[],this.parentNode=null,this.ownerDocument=r||null}n(a,"K"),a.prototype.type="DocumentFragment",a.prototype.nodeType=11,a.prototype.nodeName="#document-fragment",a.prototype.appendChild=i.prototype.appendChild,a.prototype.replaceChild=i.prototype.replaceChild,a.prototype.removeChild=i.prototype.removeChild,a.prototype.toString=function(){return this.childNodes.map(function(r){return String(r)}).join("")}}),Sf=We(function(t,e){e.exports=i;function i(a){}n(i,"it"),i.prototype.initEvent=function(a,r,s){this.type=a,this.bubbles=r,this.cancelable=s},i.prototype.preventDefault=function(){}}),wf=We(function(t,e){na();var i=am(),a=yf(),r=Tf(),s=om(),o=kf(),l=Sf(),d=rm(),u=nm(),p=sm();e.exports=v;function v(){if(!ra(this,v))return new v;this.head=this.createElement("head"),this.body=this.createElement("body"),this.documentElement=this.createElement("html"),this.documentElement.appendChild(this.head),this.documentElement.appendChild(this.body),this.childNodes=[this.documentElement],this.nodeType=9}n(v,"Be");var m=v.prototype;m.createTextNode=function(h){return new r(h,this)},m.createElementNS=function(h,f){var _=h===null?null:String(h);return new s(f,this,_)},m.createElement=function(h){return new s(h,this)},m.createDocumentFragment=function(){return new o(this)},m.createEvent=function(h){return new l(h)},m.createComment=function(h){return new a(h,this)},m.getElementById=function(h){h=String(h);var f=i(this.childNodes,function(_){if(String(_.id)===h)return _});return f||null},m.getElementsByClassName=s.prototype.getElementsByClassName,m.getElementsByTagName=s.prototype.getElementsByTagName,m.contains=s.prototype.contains,m.removeEventListener=p,m.addEventListener=u,m.dispatchEvent=d}),If=We(function(t,e){var i=wf();e.exports=new i}),lm=We(function(t,e){var i=typeof global<"u"?global:typeof window<"u"?window:{},a=If(),r;typeof document<"u"?r=document:(r=i["__GLOBAL_DOCUMENT_CACHE@4"],r||(r=i["__GLOBAL_DOCUMENT_CACHE@4"]=a)),e.exports=r});function Rf(t){if(Array.isArray(t))return t}n(Rf,"vt$2");function Cf(t,e){var i=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(i!=null){var a=[],r=!0,s=!1,o,l;try{for(i=i.call(t);!(r=(o=i.next()).done)&&(a.push(o.value),!(e&&a.length===e));r=!0);}catch(d){s=!0,l=d}finally{try{!r&&i.return!=null&&i.return()}finally{if(s)throw l}}return a}}n(Cf,"mt$2");function Df(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}n(Df,"ht$1");function El(t,e){(e==null||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}n(El,"ke$2");function dm(t,e){if(t){if(typeof t=="string")return El(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);if(i==="Object"&&t.constructor&&(i=t.constructor.name),i==="Map"||i==="Set")return Array.from(i);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return El(t,e)}}n(dm,"Ae$2");function ri(t,e){return Rf(t)||Cf(t,e)||dm(t,e)||Df()}n(ri,"H$2");var Vr=Xe(Tt()),vc=Xe(Tt()),Lf=Xe(Tt()),Mf={now:n(function(){var t=Lf.default.performance,e=t&&t.timing,i=e&&e.navigationStart,a=typeof i=="number"&&typeof t.now=="function"?i+t.now():Date.now();return Math.round(a)},"now")},ge=Mf,an=n(function(){var t,e,i;if(typeof((t=vc.default.crypto)===null||t===void 0?void 0:t.getRandomValues)=="function"){i=new Uint8Array(32),vc.default.crypto.getRandomValues(i);for(var a=0;a<32;a++)i[a]=i[a]%16}else{i=[];for(var r=0;r<32;r++)i[r]=Math.random()*16|0}var s=0;e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(d){var u=d==="x"?i[s]:i[s]&3|8;return s++,u.toString(16)});var o=ge.now(),l=o?.toString(16).substring(3);return l?e.substring(0,28)+l:e},"ee$3"),um=n(function(){return("000000"+(Math.random()*Math.pow(36,6)<<0).toString(36)).slice(-6)},"Oe$1"),mt=n(function(t){if(t&&typeof t.nodeName<"u")return t.muxId||(t.muxId=um()),t.muxId;var e;try{e=document.querySelector(t)}catch{}return e&&!e.muxId&&(e.muxId=t),e?.muxId||t},"Q$2"),zs=n(function(t){var e;t&&typeof t.nodeName<"u"?(e=t,t=mt(e)):e=document.querySelector(t);var i=e&&e.nodeName?e.nodeName.toLowerCase():"";return[e,t,i]},"se$3");function xf(t){if(Array.isArray(t))return El(t)}n(xf,"bt$2");function Of(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}n(Of,"Tt$2");function Nf(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}n(Nf,"wt$2");function pt(t){return xf(t)||Of(t)||dm(t)||Nf()}n(pt,"W$1");var Fi={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4},Pf=n(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:3,i,a,r,s,o,l=[console,t],d=(i=console.trace).bind.apply(i,pt(l)),u=(a=console.info).bind.apply(a,pt(l)),p=(r=console.debug).bind.apply(r,pt(l)),v=(s=console.warn).bind.apply(s,pt(l)),m=(o=console.error).bind.apply(o,pt(l)),h=e;return{trace:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(h>Fi.TRACE))return d.apply(void 0,pt(_))},"trace"),debug:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(h>Fi.DEBUG))return p.apply(void 0,pt(_))},"debug"),info:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(h>Fi.INFO))return u.apply(void 0,pt(_))},"info"),warn:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(h>Fi.WARN))return v.apply(void 0,pt(_))},"warn"),error:n(function(){for(var f=arguments.length,_=new Array(f),g=0;g<f;g++)_[g]=arguments[g];if(!(h>Fi.ERROR))return m.apply(void 0,pt(_))},"error"),get level(){return h},set level(f){f!==this.level&&(h=f??e)}}},"Et$2"),te=Pf("[mux]"),Qo=Xe(Tt());function _l(){var t=Qo.default.doNotTrack||Qo.default.navigator&&Qo.default.navigator.doNotTrack;return t==="1"}n(_l,"ce$1");function P(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n(P,"g$5");na();function Ce(t,e){if(!ra(t,e))throw new TypeError("Cannot call a class as a function")}n(Ce,"D$3");function $f(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}n($f,"kt$1");function Gt(t,e,i){return e&&$f(t.prototype,e),t}n(Gt,"L$1");function I(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}n(I,"l$1");function Xa(t){return Xa=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Xa(t)}n(Xa,"X$2");function Uf(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&(t=Xa(t),t!==null););return t}n(Uf,"xt$2");function Fn(t,e,i){return typeof Reflect<"u"&&Reflect.get?Fn=Reflect.get:Fn=n(function(a,r,s){var o=Uf(a,r);if(o){var l=Object.getOwnPropertyDescriptor(o,r);return l.get?l.get.call(s||a):l.value}},"De$1"),Fn(t,e,i||t)}n(Fn,"De$1");function bl(t,e){return bl=Object.setPrototypeOf||function(i,a){return i.__proto__=a,i},bl(t,e)}n(bl,"Ie$1");function Hf(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&bl(t,e)}n(Hf,"Dt$2");function Bf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}n(Bf,"St$1");im();function Wf(t,e){return e&&(tm(e)==="object"||typeof e=="function")?e:P(t)}n(Wf,"Rt$1");function Ff(t){var e=Bf();return function(){var i=Xa(t),a;if(e){var r=Xa(this).constructor;a=Reflect.construct(i,arguments,r)}else a=i.apply(this,arguments);return Wf(this,a)}}n(Ff,"qt$2");var bt=n(function(t){return rn(t)[0]},"F$2"),rn=n(function(t){if(typeof t!="string"||t==="")return["localhost"];var e=/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,i=t.match(e)||[],a=i[4],r;return a&&(r=(a.match(/[^\.]+\.[^\.]+$/)||[])[0]),[a,r]},"re$3"),Zo=Xe(Tt()),Kf={exists:n(function(){var t=Zo.default.performance,e=t&&t.timing;return e!==void 0},"exists"),domContentLoadedEventEnd:n(function(){var t=Zo.default.performance,e=t&&t.timing;return e&&e.domContentLoadedEventEnd},"domContentLoadedEventEnd"),navigationStart:n(function(){var t=Zo.default.performance,e=t&&t.timing;return e&&e.navigationStart},"navigationStart")},js=Kf;function be(t,e,i){i=i===void 0?1:i,t[e]=t[e]||0,t[e]+=i}n(be,"O$2");function Xs(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{},a=Object.keys(i);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(i).filter(function(r){return Object.getOwnPropertyDescriptor(i,r).enumerable}))),a.forEach(function(r){I(t,r,i[r])})}return t}n(Xs,"ue$1");function Vf(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);i.push.apply(i,a)}return i}n(Vf,"ia$1");function xd(t,e){return e=e??{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):Vf(Object(e)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}),t}n(xd,"fe$2");var qf=["x-cdn","content-type"],cm=["x-request-id","cf-ray","x-amz-cf-id","x-akamai-request-id"],Yf=qf.concat(cm);function Od(t){t=t||"";var e={},i=t.trim().split(/[\r\n]+/);return i.forEach(function(a){if(a){var r=a.split(": "),s=r.shift();s&&(Yf.indexOf(s.toLowerCase())>=0||s.toLowerCase().indexOf("x-litix-")===0)&&(e[s]=r.join(": "))}}),e}n(Od,"pe");function Js(t){if(t){var e=cm.find(function(i){return t[i]!==void 0});return e?t[e]:void 0}}n(Js,"de$3");var Gf=n(function(t){var e={};for(var i in t){var a=t[i],r=a["DATA-ID"].search("io.litix.data.");if(r!==-1){var s=a["DATA-ID"].replace("io.litix.data.","");e[s]=a.VALUE}}return e},"sa$1"),hm=Gf,An=n(function(t){if(!t)return{};var e=js.navigationStart(),i=t.loading,a=i?i.start:t.trequest,r=i?i.first:t.tfirst,s=i?i.end:t.tload;return{bytesLoaded:t.total,requestStart:Math.round(e+a),responseStart:Math.round(e+r),responseEnd:Math.round(e+s)}},"Me$1"),cr=n(function(t){if(!(!t||typeof t.getAllResponseHeaders!="function"))return Od(t.getAllResponseHeaders())},"Se$2"),Qf=n(function(t,e,i){var a=arguments.length>4?arguments[4]:void 0,r=t.log,s=t.utils.secondsToMs,o=n(function(g){var T=parseInt(a.version),A;return T===1&&g.programDateTime!==null&&(A=g.programDateTime),T===0&&g.pdt!==null&&(A=g.pdt),A},"s");if(!js.exists()){r.warn("performance timing not supported. Not tracking HLS.js.");return}var l=n(function(g,T){return t.emit(e,g,T)},"u"),d=n(function(g,T){var A=T.levels,b=T.audioTracks,S=T.url,L=T.stats,N=T.networkDetails,B=T.sessionData,G={},ee={};A.forEach(function(me,Pe){G[Pe]={width:me.width,height:me.height,bitrate:me.bitrate,attrs:me.attrs}}),b.forEach(function(me,Pe){ee[Pe]={name:me.name,language:me.lang,bitrate:me.bitrate}});var V=An(L),U=V.bytesLoaded,xe=V.requestStart,Fe=V.responseStart,Ke=V.responseEnd;l("requestcompleted",xd(Xs({},hm(B)),{request_event_type:g,request_bytes_loaded:U,request_start:xe,request_response_start:Fe,request_response_end:Ke,request_type:"manifest",request_hostname:bt(S),request_response_headers:cr(N),request_rendition_lists:{media:G,audio:ee,video:{}}}))},"p");i.on(a.Events.MANIFEST_LOADED,d);var u=n(function(g,T){var A=T.details,b=T.level,S=T.networkDetails,L=T.stats,N=An(L),B=N.bytesLoaded,G=N.requestStart,ee=N.responseStart,V=N.responseEnd,U=A.fragments[A.fragments.length-1],xe=o(U)+s(U.duration);l("requestcompleted",{request_event_type:g,request_bytes_loaded:B,request_start:G,request_response_start:ee,request_response_end:V,request_current_level:b,request_type:"manifest",request_hostname:bt(A.url),request_response_headers:cr(S),video_holdback:A.holdBack&&s(A.holdBack),video_part_holdback:A.partHoldBack&&s(A.partHoldBack),video_part_target_duration:A.partTarget&&s(A.partTarget),video_target_duration:A.targetduration&&s(A.targetduration),video_source_is_live:A.live,player_manifest_newest_program_time:isNaN(xe)?void 0:xe})},"b");i.on(a.Events.LEVEL_LOADED,u);var p=n(function(g,T){var A=T.details,b=T.networkDetails,S=T.stats,L=An(S),N=L.bytesLoaded,B=L.requestStart,G=L.responseStart,ee=L.responseEnd;l("requestcompleted",{request_event_type:g,request_bytes_loaded:N,request_start:B,request_response_start:G,request_response_end:ee,request_type:"manifest",request_hostname:bt(A.url),request_response_headers:cr(b)})},"k");i.on(a.Events.AUDIO_TRACK_LOADED,p);var v=n(function(g,T){var A=T.stats,b=T.networkDetails,S=T.frag;A=A||S.stats;var L=An(A),N=L.bytesLoaded,B=L.requestStart,G=L.responseStart,ee=L.responseEnd,V=b?cr(b):void 0,U={request_event_type:g,request_bytes_loaded:N,request_start:B,request_response_start:G,request_response_end:ee,request_hostname:b?bt(b.responseURL):void 0,request_id:V?Js(V):void 0,request_response_headers:V,request_media_duration:S.duration,request_url:b?.responseURL};S.type==="main"?(U.request_type="media",U.request_current_level=S.level,U.request_video_width=(i.levels[S.level]||{}).width,U.request_video_height=(i.levels[S.level]||{}).height,U.request_labeled_bitrate=(i.levels[S.level]||{}).bitrate):U.request_type=S.type,l("requestcompleted",U)},"y");i.on(a.Events.FRAG_LOADED,v);var m=n(function(g,T){var A=T.frag,b=A.start,S=o(A),L={currentFragmentPDT:S,currentFragmentStart:s(b)};l("fragmentchange",L)},"c");i.on(a.Events.FRAG_CHANGED,m);var h=n(function(g,T){var A=T.type,b=T.details,S=T.response,L=T.fatal,N=T.frag,B=T.networkDetails,G=N?.url||T.url||"",ee=B?cr(B):void 0;if((b===a.ErrorDetails.MANIFEST_LOAD_ERROR||b===a.ErrorDetails.MANIFEST_LOAD_TIMEOUT||b===a.ErrorDetails.FRAG_LOAD_ERROR||b===a.ErrorDetails.FRAG_LOAD_TIMEOUT||b===a.ErrorDetails.LEVEL_LOAD_ERROR||b===a.ErrorDetails.LEVEL_LOAD_TIMEOUT||b===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||b===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT||b===a.ErrorDetails.SUBTITLE_LOAD_ERROR||b===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT||b===a.ErrorDetails.KEY_LOAD_ERROR||b===a.ErrorDetails.KEY_LOAD_TIMEOUT)&&l("requestfailed",{request_error:b,request_url:G,request_hostname:bt(G),request_id:ee?Js(ee):void 0,request_type:b===a.ErrorDetails.FRAG_LOAD_ERROR||b===a.ErrorDetails.FRAG_LOAD_TIMEOUT?"media":b===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||b===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT?"audio":b===a.ErrorDetails.SUBTITLE_LOAD_ERROR||b===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT?"subtitle":b===a.ErrorDetails.KEY_LOAD_ERROR||b===a.ErrorDetails.KEY_LOAD_TIMEOUT?"encryption":"manifest",request_error_code:S?.code,request_error_text:S?.text}),L){var V,U="".concat(G?"url: ".concat(G,`
`):"")+"".concat(S&&(S.code||S.text)?"response: ".concat(S.code,", ").concat(S.text,`
`):"")+"".concat(T.reason?"failure reason: ".concat(T.reason,`
`):"")+"".concat(T.level?"level: ".concat(T.level,`
`):"")+"".concat(T.parent?"parent stream controller: ".concat(T.parent,`
`):"")+"".concat(T.buffer?"buffer length: ".concat(T.buffer,`
`):"")+"".concat(T.error?"error: ".concat(T.error,`
`):"")+"".concat(T.event?"event: ".concat(T.event,`
`):"")+"".concat(T.err?"error message: ".concat((V=T.err)===null||V===void 0?void 0:V.message,`
`):"");l("error",{player_error_code:A,player_error_message:b,player_error_context:U})}},"v");i.on(a.Events.ERROR,h);var f=n(function(g,T){var A=T.frag,b=A&&A._url||"";l("requestcanceled",{request_event_type:g,request_url:b,request_type:"media",request_hostname:bt(b)})},"T");i.on(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,f);var _=n(function(g,T){var A=T.level,b=i.levels[A];if(b&&b.attrs&&b.attrs.BANDWIDTH){var S=b.attrs.BANDWIDTH,L,N=parseFloat(b.attrs["FRAME-RATE"]);isNaN(N)||(L=N),S?l("renditionchange",{video_source_fps:L,video_source_bitrate:S,video_source_width:b.width,video_source_height:b.height,video_source_rendition_name:b.name,video_source_codec:b?.videoCodec}):r.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js")}},"x");i.on(a.Events.LEVEL_SWITCHED,_),i._stopMuxMonitor=function(){i.off(a.Events.MANIFEST_LOADED,d),i.off(a.Events.LEVEL_LOADED,u),i.off(a.Events.AUDIO_TRACK_LOADED,p),i.off(a.Events.FRAG_LOADED,v),i.off(a.Events.FRAG_CHANGED,m),i.off(a.Events.ERROR,h),i.off(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,f),i.off(a.Events.LEVEL_SWITCHED,_),i.off(a.Events.DESTROYING,i._stopMuxMonitor),delete i._stopMuxMonitor},i.on(a.Events.DESTROYING,i._stopMuxMonitor)},"Ot$2"),Zf=n(function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},"Pt$2"),fc=n(function(t,e){if(!t||!t.requestEndDate)return{};var i=bt(t.url),a=t.url,r=t.bytesLoaded,s=new Date(t.requestStartDate).getTime(),o=new Date(t.firstByteDate).getTime(),l=new Date(t.requestEndDate).getTime(),d=isNaN(t.duration)?0:t.duration,u=typeof e.getMetricsFor=="function"?e.getMetricsFor(t.mediaType).HttpList:e.getDashMetrics().getHttpRequests(t.mediaType),p;u.length>0&&(p=Od(u[u.length-1]._responseHeaders||""));var v=p?Js(p):void 0;return{requestStart:s,requestResponseStart:o,requestResponseEnd:l,requestBytesLoaded:r,requestResponseHeaders:p,requestMediaDuration:d,requestHostname:i,requestUrl:a,requestId:v}},"It$2"),zf=n(function(t,e){var i=e.getQualityFor(t),a=e.getCurrentTrackFor(t).bitrateList;return a?{currentLevel:i,renditionWidth:a[i].width||null,renditionHeight:a[i].height||null,renditionBitrate:a[i].bandwidth}:{}},"ua$1"),jf=n(function(t){var e;return(e=t.match(/.*codecs\*?="(.*)"/))===null||e===void 0?void 0:e[1]},"da$1"),Xf=n(function(t){try{var e,i,a=(i=t.getVersion)===null||i===void 0||(e=i.call(t))===null||e===void 0?void 0:e.split(".").map(function(r){return parseInt(r)})[0];return a}catch{return!1}},"la$1"),Jf=n(function(t,e,i){var a=t.log;if(!i||!i.on){a.warn("Invalid dash.js player reference. Monitoring blocked.");return}var r=Xf(i),s=n(function(A,b){return t.emit(e,A,b)},"o"),o=n(function(A){var b=A.type,S=A.data,L=(S||{}).url;s("requestcompleted",{request_event_type:b,request_start:0,request_response_start:0,request_response_end:0,request_bytes_loaded:-1,request_type:"manifest",request_hostname:bt(L),request_url:L})},"s");i.on("manifestLoaded",o);var l={},d=n(function(A){if(typeof A.getRequests!="function")return null;var b=A.getRequests({state:"executed"});return b.length===0?null:b[b.length-1]},"p"),u=n(function(A){var b=A.type,S=A.fragmentModel,L=A.chunk,N=d(S);p({type:b,request:N,chunk:L})},"b"),p=n(function(A){var b=A.type,S=A.chunk,L=A.request,N=(S||{}).mediaInfo,B=N||{},G=B.type,ee=B.bitrateList;ee=ee||[];var V={};ee.forEach(function(Ve,Se){V[Se]={},V[Se].width=Ve.width,V[Se].height=Ve.height,V[Se].bitrate=Ve.bandwidth,V[Se].attrs={}}),G==="video"?l.video=V:G==="audio"?l.audio=V:l.media=V;var U=fc(L,i),xe=U.requestStart,Fe=U.requestResponseStart,Ke=U.requestResponseEnd,me=U.requestResponseHeaders,Pe=U.requestMediaDuration,At=U.requestHostname,$e=U.requestUrl,dt=U.requestId;s("requestcompleted",{request_event_type:b,request_start:xe,request_response_start:Fe,request_response_end:Ke,request_bytes_loaded:-1,request_type:G+"_init",request_response_headers:me,request_hostname:At,request_id:dt,request_url:$e,request_media_duration:Pe,request_rendition_lists:l})},"k");r>=4?i.on("initFragmentLoaded",p):i.on("initFragmentLoaded",u);var v=n(function(A){var b=A.type,S=A.fragmentModel,L=A.chunk,N=d(S);m({type:b,request:N,chunk:L})},"y"),m=n(function(A){var b=A.type,S=A.chunk,L=A.request,N=S||{},B=N.mediaInfo,G=N.start,ee=B||{},V=ee.type,U=fc(L,i),xe=U.requestStart,Fe=U.requestResponseStart,Ke=U.requestResponseEnd,me=U.requestBytesLoaded,Pe=U.requestResponseHeaders,At=U.requestMediaDuration,$e=U.requestHostname,dt=U.requestUrl,Ve=U.requestId,Se=zf(V,i),qe=Se.currentLevel,et=Se.renditionWidth,sa=Se.renditionHeight,gn=Se.renditionBitrate;s("requestcompleted",{request_event_type:b,request_start:xe,request_response_start:Fe,request_response_end:Ke,request_bytes_loaded:me,request_type:V,request_response_headers:Pe,request_hostname:$e,request_id:Ve,request_url:dt,request_media_start_time:G,request_media_duration:At,request_current_level:qe,request_labeled_bitrate:gn,request_video_width:et,request_video_height:sa})},"c");r>=4?i.on("mediaFragmentLoaded",m):i.on("mediaFragmentLoaded",v);var h={video:void 0,audio:void 0,totalBitrate:void 0},f=n(function(){if(h.video&&typeof h.video.bitrate=="number"){if(!(h.video.width&&h.video.height)){a.warn("have bitrate info for video but missing width/height");return}var A=h.video.bitrate;if(h.audio&&typeof h.audio.bitrate=="number"&&(A+=h.audio.bitrate),A!==h.totalBitrate)return h.totalBitrate=A,{video_source_bitrate:A,video_source_height:h.video.height,video_source_width:h.video.width,video_source_codec:jf(h.video.codec)}}},"T"),_=n(function(A,b,S){if(typeof A.newQuality!="number"){a.warn("missing evt.newQuality in qualityChangeRendered event",A);return}var L=A.mediaType;if(L==="audio"||L==="video"){var N=i.getBitrateInfoListFor(L).find(function(G){var ee=G.qualityIndex;return ee===A.newQuality});if(!(N&&typeof N.bitrate=="number")){a.warn("missing bitrate info for ".concat(L));return}h[L]=xd(Xs({},N),{codec:i.getCurrentTrackFor(L).codec});var B=f();B&&s("renditionchange",B)}},"x");i.on("qualityChangeRendered",_);var g=n(function(A){var b=A.request,S=A.mediaType;b=b||{},s("requestcanceled",{request_event_type:b.type+"_"+b.action,request_url:b.url,request_type:S,request_hostname:bt(b.url)})},"m");i.on("fragmentLoadingAbandoned",g);var T=n(function(A){var b=A.error,S,L,N=(b==null||(S=b.data)===null||S===void 0?void 0:S.request)||{},B=(b==null||(L=b.data)===null||L===void 0?void 0:L.response)||{};b?.code===27&&s("requestfailed",{request_error:N.type+"_"+N.action,request_url:N.url,request_hostname:bt(N.url),request_type:N.mediaType,request_error_code:B.status,request_error_text:B.statusText});var G="".concat(N!=null&&N.url?"url: ".concat(N.url,`
`):"")+"".concat(B!=null&&B.status||B!=null&&B.statusText?"response: ".concat(B?.status,", ").concat(B?.statusText,`
`):"");s("error",{player_error_code:b?.code,player_error_message:b?.message,player_error_context:G})},"f");i.on("error",T),i._stopMuxMonitor=function(){i.off("manifestLoaded",o),i.off("initFragmentLoaded",p),i.off("mediaFragmentLoaded",m),i.off("qualityChangeRendered",_),i.off("error",T),i.off("fragmentLoadingAbandoned",g),delete i._stopMuxMonitor}},"Nt$2"),eE=n(function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},"Lt$2"),Ec=0,tE=(function(){function t(){Ce(this,t),I(this,"_listeners",void 0)}return n(t,"r"),Gt(t,[{key:"on",value:n(function(e,i,a){return i._eventEmitterGuid=i._eventEmitterGuid||++Ec,this._listeners=this._listeners||{},this._listeners[e]=this._listeners[e]||[],a&&(i=i.bind(a)),this._listeners[e].push(i),i},"value")},{key:"off",value:n(function(e,i){var a=this._listeners&&this._listeners[e];a&&a.forEach(function(r,s){r._eventEmitterGuid===i._eventEmitterGuid&&a.splice(s,1)})},"value")},{key:"one",value:n(function(e,i,a){var r=this;i._eventEmitterGuid=i._eventEmitterGuid||++Ec;var s=n(function(){r.off(e,s),i.apply(a||this,arguments)},"o");s._eventEmitterGuid=i._eventEmitterGuid,this.on(e,s)},"value")},{key:"emit",value:n(function(e,i){var a=this;if(this._listeners){i=i||{};var r=this._listeners["before*"]||[],s=this._listeners[e]||[],o=this._listeners["after"+e]||[],l=n(function(d,u){d=d.slice(),d.forEach(function(p){p.call(a,{type:e},u)})},"u");l(r,i),l(s,i),l(o,i)}},"value")}]),t})(),iE=tE,zo=Xe(Tt()),aE=(function(){function t(e){var i=this;Ce(this,t),I(this,"_playbackHeartbeatInterval",void 0),I(this,"_playheadShouldBeProgressing",void 0),I(this,"pm",void 0),this.pm=e,this._playbackHeartbeatInterval=null,this._playheadShouldBeProgressing=!1,e.on("playing",function(){i._playheadShouldBeProgressing=!0}),e.on("play",this._startPlaybackHeartbeatInterval.bind(this)),e.on("playing",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adbreakstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplay",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplaying",this._startPlaybackHeartbeatInterval.bind(this)),e.on("devicewake",this._startPlaybackHeartbeatInterval.bind(this)),e.on("viewstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("rebufferstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("pause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("ended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("viewend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("error",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("aderror",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adpause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adbreakend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("seeked",function(){e.data.player_is_paused?i._stopPlaybackHeartbeatInterval():i._startPlaybackHeartbeatInterval()}),e.on("timeupdate",function(){i._playbackHeartbeatInterval!==null&&e.emit("playbackheartbeat")}),e.on("devicesleep",function(a,r){i._playbackHeartbeatInterval!==null&&(zo.default.clearInterval(i._playbackHeartbeatInterval),e.emit("playbackheartbeatend",{viewer_time:r.viewer_time}),i._playbackHeartbeatInterval=null)})}return n(t,"r"),Gt(t,[{key:"_startPlaybackHeartbeatInterval",value:n(function(){var e=this;this._playbackHeartbeatInterval===null&&(this.pm.emit("playbackheartbeat"),this._playbackHeartbeatInterval=zo.default.setInterval(function(){e.pm.emit("playbackheartbeat")},this.pm.playbackHeartbeatTime))},"value")},{key:"_stopPlaybackHeartbeatInterval",value:n(function(){this._playheadShouldBeProgressing=!1,this._playbackHeartbeatInterval!==null&&(zo.default.clearInterval(this._playbackHeartbeatInterval),this.pm.emit("playbackheartbeatend"),this._playbackHeartbeatInterval=null)},"value")}]),t})(),rE=aE,nE=n(function t(e){var i=this;Ce(this,t),I(this,"viewErrored",void 0),e.on("viewinit",function(){i.viewErrored=!1}),e.on("error",function(a,r){try{var s=e.errorTranslator({player_error_code:r.player_error_code,player_error_message:r.player_error_message,player_error_context:r.player_error_context,player_error_severity:r.player_error_severity,player_error_business_exception:r.player_error_business_exception});s&&(e.data.player_error_code=s.player_error_code||r.player_error_code,e.data.player_error_message=s.player_error_message||r.player_error_message,e.data.player_error_context=s.player_error_context||r.player_error_context,e.data.player_error_severity=s.player_error_severity||r.player_error_severity,e.data.player_error_business_exception=s.player_error_business_exception||r.player_error_business_exception,i.viewErrored=!0)}catch(o){e.mux.log.warn("Exception in error translator callback.",o),i.viewErrored=!0}}),e.on("aftererror",function(){var a,r,s,o,l;(a=e.data)===null||a===void 0||delete a.player_error_code,(r=e.data)===null||r===void 0||delete r.player_error_message,(s=e.data)===null||s===void 0||delete s.player_error_context,(o=e.data)===null||o===void 0||delete o.player_error_severity,(l=e.data)===null||l===void 0||delete l.player_error_business_exception})},"r"),sE=nE,oE=(function(){function t(e){Ce(this,t),I(this,"_watchTimeTrackerLastCheckedTime",void 0),I(this,"pm",void 0),this.pm=e,this._watchTimeTrackerLastCheckedTime=null,e.on("playbackheartbeat",this._updateWatchTime.bind(this)),e.on("playbackheartbeatend",this._clearWatchTimeState.bind(this))}return n(t,"r"),Gt(t,[{key:"_updateWatchTime",value:n(function(e,i){var a=i.viewer_time;this._watchTimeTrackerLastCheckedTime===null&&(this._watchTimeTrackerLastCheckedTime=a),be(this.pm.data,"view_watch_time",a-this._watchTimeTrackerLastCheckedTime),this._watchTimeTrackerLastCheckedTime=a},"value")},{key:"_clearWatchTimeState",value:n(function(e,i){this._updateWatchTime(e,i),this._watchTimeTrackerLastCheckedTime=null},"value")}]),t})(),lE=oE,dE=(function(){function t(e){var i=this;Ce(this,t),I(this,"_playbackTimeTrackerLastPlayheadPosition",void 0),I(this,"_lastTime",void 0),I(this,"_isAdPlaying",void 0),I(this,"_callbackUpdatePlaybackTime",void 0),I(this,"pm",void 0),this.pm=e,this._playbackTimeTrackerLastPlayheadPosition=-1,this._lastTime=ge.now(),this._isAdPlaying=!1,this._callbackUpdatePlaybackTime=null;var a=this._startPlaybackTimeTracking.bind(this);e.on("playing",a),e.on("adplaying",a),e.on("seeked",a);var r=this._stopPlaybackTimeTracking.bind(this);e.on("playbackheartbeatend",r),e.on("seeking",r),e.on("adplaying",function(){i._isAdPlaying=!0}),e.on("adended",function(){i._isAdPlaying=!1}),e.on("adpause",function(){i._isAdPlaying=!1}),e.on("adbreakstart",function(){i._isAdPlaying=!1}),e.on("adbreakend",function(){i._isAdPlaying=!1}),e.on("adplay",function(){i._isAdPlaying=!1}),e.on("viewinit",function(){i._playbackTimeTrackerLastPlayheadPosition=-1,i._lastTime=ge.now(),i._isAdPlaying=!1,i._callbackUpdatePlaybackTime=null})}return n(t,"r"),Gt(t,[{key:"_startPlaybackTimeTracking",value:n(function(){this._callbackUpdatePlaybackTime===null&&(this._callbackUpdatePlaybackTime=this._updatePlaybackTime.bind(this),this._playbackTimeTrackerLastPlayheadPosition=this.pm.data.player_playhead_time,this.pm.on("playbackheartbeat",this._callbackUpdatePlaybackTime))},"value")},{key:"_stopPlaybackTimeTracking",value:n(function(){this._callbackUpdatePlaybackTime&&(this._updatePlaybackTime(),this.pm.off("playbackheartbeat",this._callbackUpdatePlaybackTime),this._callbackUpdatePlaybackTime=null,this._playbackTimeTrackerLastPlayheadPosition=-1)},"value")},{key:"_updatePlaybackTime",value:n(function(){var e=this.pm.data.player_playhead_time,i=ge.now(),a=-1;this._playbackTimeTrackerLastPlayheadPosition>=0&&e>this._playbackTimeTrackerLastPlayheadPosition?a=e-this._playbackTimeTrackerLastPlayheadPosition:this._isAdPlaying&&(a=i-this._lastTime),a>0&&a<=1e3&&be(this.pm.data,"view_content_playback_time",a),this._playbackTimeTrackerLastPlayheadPosition=e,this._lastTime=i},"value")}]),t})(),uE=dE,cE=(function(){function t(e){Ce(this,t),I(this,"pm",void 0),this.pm=e;var i=this._updatePlayheadTime.bind(this);e.on("playbackheartbeat",i),e.on("playbackheartbeatend",i),e.on("timeupdate",i),e.on("destroy",function(){e.off("timeupdate",i)})}return n(t,"r"),Gt(t,[{key:"_updateMaxPlayheadPosition",value:n(function(){this.pm.data.view_max_playhead_position=typeof this.pm.data.view_max_playhead_position>"u"?this.pm.data.player_playhead_time:Math.max(this.pm.data.view_max_playhead_position,this.pm.data.player_playhead_time)},"value")},{key:"_updatePlayheadTime",value:n(function(e,i){var a=this,r=n(function(){a.pm.currentFragmentPDT&&a.pm.currentFragmentStart&&(a.pm.data.player_program_time=a.pm.currentFragmentPDT+a.pm.data.player_playhead_time-a.pm.currentFragmentStart)},"n");if(i&&i.player_playhead_time)this.pm.data.player_playhead_time=i.player_playhead_time,r(),this._updateMaxPlayheadPosition();else if(this.pm.getPlayheadTime){var s=this.pm.getPlayheadTime();typeof s<"u"&&(this.pm.data.player_playhead_time=s,r(),this._updateMaxPlayheadPosition())}},"value")}]),t})(),hE=cE,_c=300*1e3,mE=n(function t(e){if(Ce(this,t),!e.disableRebufferTracking){var i,a=n(function(s,o){r(o),i=void 0},"i"),r=n(function(s){if(i){var o=s.viewer_time-i;be(e.data,"view_rebuffer_duration",o),i=s.viewer_time,e.data.view_rebuffer_duration>_c&&(e.emit("viewend"),e.send("viewend"),e.mux.log.warn("Ending view after rebuffering for longer than ".concat(_c,"ms, future events will be ignored unless a programchange or videochange occurs.")))}e.data.view_watch_time>=0&&e.data.view_rebuffer_count>0&&(e.data.view_rebuffer_frequency=e.data.view_rebuffer_count/e.data.view_watch_time,e.data.view_rebuffer_percentage=e.data.view_rebuffer_duration/e.data.view_watch_time)},"a");e.on("playbackheartbeat",function(s,o){return r(o)}),e.on("rebufferstart",function(s,o){i||(be(e.data,"view_rebuffer_count",1),i=o.viewer_time,e.one("rebufferend",a))}),e.on("viewinit",function(){i=void 0,e.off("rebufferend",a)})}},"r"),pE=mE,vE=(function(){function t(e){var i=this;Ce(this,t),I(this,"_lastCheckedTime",void 0),I(this,"_lastPlayheadTime",void 0),I(this,"_lastPlayheadTimeUpdatedTime",void 0),I(this,"_rebuffering",void 0),I(this,"pm",void 0),this.pm=e,!(e.disableRebufferTracking||e.disablePlayheadRebufferTracking)&&(this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null,e.on("playbackheartbeat",this._checkIfRebuffering.bind(this)),e.on("playbackheartbeatend",this._cleanupRebufferTracker.bind(this)),e.on("seeking",function(){i._cleanupRebufferTracker(null,{viewer_time:ge.now()})}))}return n(t,"r"),Gt(t,[{key:"_checkIfRebuffering",value:n(function(e,i){if(this.pm.seekingTracker.isSeeking||this.pm.adTracker.isAdBreak||!this.pm.playbackHeartbeat._playheadShouldBeProgressing){this._cleanupRebufferTracker(e,i);return}if(this._lastCheckedTime===null){this._prepareRebufferTrackerState(i.viewer_time);return}if(this._lastPlayheadTime!==this.pm.data.player_playhead_time){this._cleanupRebufferTracker(e,i,!0);return}var a=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.sustainedRebufferThreshold=="number"&&a>=this.pm.sustainedRebufferThreshold&&(this._rebuffering||(this._rebuffering=!0,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}))),this._lastCheckedTime=i.viewer_time},"value")},{key:"_clearRebufferTrackerState",value:n(function(){this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null},"value")},{key:"_prepareRebufferTrackerState",value:n(function(e){this._lastCheckedTime=e,this._lastPlayheadTime=this.pm.data.player_playhead_time,this._lastPlayheadTimeUpdatedTime=e},"value")},{key:"_cleanupRebufferTracker",value:n(function(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(this._rebuffering)this._rebuffering=!1,this.pm.emit("rebufferend",{viewer_time:i.viewer_time});else{if(this._lastCheckedTime===null)return;var r=this.pm.data.player_playhead_time-this._lastPlayheadTime,s=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.minimumRebufferDuration=="number"&&r>0&&s-r>this.pm.minimumRebufferDuration&&(this._lastCheckedTime=null,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}),this.pm.emit("rebufferend",{viewer_time:this._lastPlayheadTimeUpdatedTime+s-r}))}a?this._prepareRebufferTrackerState(i.viewer_time):this._clearRebufferTrackerState()},"value")}]),t})(),fE=vE,EE=(function(){function t(e){var i=this;Ce(this,t),I(this,"NAVIGATION_START",void 0),I(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){var a=e.data,r=a.view_id;if(!a.view_program_changed){var s=n(function(o,l){var d=l.viewer_time;(o.type==="playing"&&typeof e.data.view_time_to_first_frame>"u"||o.type==="adplaying"&&(typeof e.data.view_time_to_first_frame>"u"||i._inPrerollPosition()))&&i.calculateTimeToFirstFrame(d||ge.now(),r)},"n");e.one("playing",s),e.one("adplaying",s),e.one("viewend",function(){e.off("playing",s),e.off("adplaying",s)})}})}return n(t,"r"),Gt(t,[{key:"_inPrerollPosition",value:n(function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3},"value")},{key:"calculateTimeToFirstFrame",value:n(function(e,i){i===this.pm.data.view_id&&(this.pm.watchTimeTracker._updateWatchTime(null,{viewer_time:e}),this.pm.data.view_time_to_first_frame=this.pm.data.view_watch_time,(this.pm.data.player_autoplay_on||this.pm.data.video_is_autoplay)&&this.NAVIGATION_START&&(this.pm.data.view_aggregate_startup_time=this.pm.data.view_start+this.pm.data.view_watch_time-this.NAVIGATION_START))},"value")}]),t})(),_E=EE,bE=n(function t(e){var i=this;Ce(this,t),I(this,"_lastPlayerHeight",void 0),I(this,"_lastPlayerWidth",void 0),I(this,"_lastPlayheadPosition",void 0),I(this,"_lastSourceHeight",void 0),I(this,"_lastSourceWidth",void 0),e.on("viewinit",function(){i._lastPlayheadPosition=-1});var a=["pause","rebufferstart","seeking","error","adbreakstart","hb","renditionchange","orientationchange","viewend"],r=["playing","hb","renditionchange","orientationchange"];a.forEach(function(s){e.on(s,function(){if(i._lastPlayheadPosition>=0&&e.data.player_playhead_time>=0&&i._lastPlayerWidth>=0&&i._lastSourceWidth>0&&i._lastPlayerHeight>=0&&i._lastSourceHeight>0){var o=e.data.player_playhead_time-i._lastPlayheadPosition;if(o<0){i._lastPlayheadPosition=-1;return}var l=Math.min(i._lastPlayerWidth/i._lastSourceWidth,i._lastPlayerHeight/i._lastSourceHeight),d=Math.max(0,l-1),u=Math.max(0,1-l);e.data.view_max_upscale_percentage=Math.max(e.data.view_max_upscale_percentage||0,d),e.data.view_max_downscale_percentage=Math.max(e.data.view_max_downscale_percentage||0,u),be(e.data,"view_total_content_playback_time",o),be(e.data,"view_total_upscaling",d*o),be(e.data,"view_total_downscaling",u*o)}i._lastPlayheadPosition=-1})}),r.forEach(function(s){e.on(s,function(){i._lastPlayheadPosition=e.data.player_playhead_time,i._lastPlayerWidth=e.data.player_width,i._lastPlayerHeight=e.data.player_height,i._lastSourceWidth=e.data.video_source_width,i._lastSourceHeight=e.data.video_source_height})})},"r"),gE=bE,yE=2e3,TE=n(function t(e){var i=this;Ce(this,t),I(this,"isSeeking",void 0),this.isSeeking=!1;var a=-1,r=n(function(){var s=ge.now(),o=(e.data.viewer_time||s)-(a||s);be(e.data,"view_seek_duration",o),e.data.view_max_seek_time=Math.max(e.data.view_max_seek_time||0,o),i.isSeeking=!1,a=-1},"a");e.on("seeking",function(s,o){if(Object.assign(e.data,o),i.isSeeking&&o.viewer_time-a<=yE){a=o.viewer_time;return}i.isSeeking&&r(),i.isSeeking=!0,a=o.viewer_time,be(e.data,"view_seek_count",1),e.send("seeking")}),e.on("seeked",function(){r()}),e.on("viewend",function(){i.isSeeking&&(r(),e.send("seeked")),i.isSeeking=!1,a=-1})},"r"),AE=TE,bc=n(function(t,e){t.push(e),t.sort(function(i,a){return i.viewer_time-a.viewer_time})},"Kt$2"),kE=["adbreakstart","adrequest","adresponse","adplay","adplaying","adpause","adended","adbreakend","aderror","adclicked","adskipped"],SE=(function(){function t(e){var i=this;Ce(this,t),I(this,"_adHasPlayed",void 0),I(this,"_adRequests",void 0),I(this,"_adResponses",void 0),I(this,"_currentAdRequestNumber",void 0),I(this,"_currentAdResponseNumber",void 0),I(this,"_prerollPlayTime",void 0),I(this,"_wouldBeNewAdPlay",void 0),I(this,"isAdBreak",void 0),I(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){i.isAdBreak=!1,i._currentAdRequestNumber=0,i._currentAdResponseNumber=0,i._adRequests=[],i._adResponses=[],i._adHasPlayed=!1,i._wouldBeNewAdPlay=!0,i._prerollPlayTime=void 0}),kE.forEach(function(r){return e.on(r,i._updateAdData.bind(i))});var a=n(function(){i.isAdBreak=!1},"i");e.on("adbreakstart",function(){i.isAdBreak=!0}),e.on("play",a),e.on("playing",a),e.on("viewend",a),e.on("adrequest",function(r,s){s=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdRequestNumber++},s),bc(i._adRequests,s),be(e.data,"view_ad_request_count"),i.inPrerollPosition()&&(e.data.view_preroll_requested=!0,i._adHasPlayed||be(e.data,"view_preroll_request_count"))}),e.on("adresponse",function(r,s){s=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdResponseNumber++},s),bc(i._adResponses,s);var o=i.findAdRequest(s.ad_request_id);o&&be(e.data,"view_ad_request_time",Math.max(0,s.viewer_time-o.viewer_time))}),e.on("adplay",function(r,s){i._adHasPlayed=!0,i._wouldBeNewAdPlay&&(i._wouldBeNewAdPlay=!1,be(e.data,"view_ad_played_count")),i.inPrerollPosition()&&!e.data.view_preroll_played&&(e.data.view_preroll_played=!0,i._adRequests.length>0&&(e.data.view_preroll_request_time=Math.max(0,s.viewer_time-i._adRequests[0].viewer_time)),e.data.view_start&&(e.data.view_startup_preroll_request_time=Math.max(0,s.viewer_time-e.data.view_start)),i._prerollPlayTime=s.viewer_time)}),e.on("adplaying",function(r,s){i.inPrerollPosition()&&typeof e.data.view_preroll_load_time>"u"&&typeof i._prerollPlayTime<"u"&&(e.data.view_preroll_load_time=s.viewer_time-i._prerollPlayTime,e.data.view_startup_preroll_load_time=s.viewer_time-i._prerollPlayTime)}),e.on("adclicked",function(r,s){i._wouldBeNewAdPlay||be(e.data,"view_ad_clicked_count")}),e.on("adskipped",function(r,s){i._wouldBeNewAdPlay||be(e.data,"view_ad_skipped_count")}),e.on("adended",function(){i._wouldBeNewAdPlay=!0}),e.on("aderror",function(){i._wouldBeNewAdPlay=!0})}return n(t,"r"),Gt(t,[{key:"inPrerollPosition",value:n(function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3},"value")},{key:"findAdRequest",value:n(function(e){for(var i=0;i<this._adRequests.length;i++)if(this._adRequests[i].ad_request_id===e)return this._adRequests[i]},"value")},{key:"_updateAdData",value:n(function(e,i){if(this.inPrerollPosition()){if(!this.pm.data.view_preroll_ad_tag_hostname&&i.ad_tag_url){var a=ri(rn(i.ad_tag_url),2),r=a[0],s=a[1];this.pm.data.view_preroll_ad_tag_domain=s,this.pm.data.view_preroll_ad_tag_hostname=r}if(!this.pm.data.view_preroll_ad_asset_hostname&&i.ad_asset_url){var o=ri(rn(i.ad_asset_url),2),l=o[0],d=o[1];this.pm.data.view_preroll_ad_asset_domain=d,this.pm.data.view_preroll_ad_asset_hostname=l}}this.pm.data.ad_asset_url=i?.ad_asset_url,this.pm.data.ad_tag_url=i?.ad_tag_url,this.pm.data.ad_creative_id=i?.ad_creative_id,this.pm.data.ad_id=i?.ad_id,this.pm.data.ad_universal_id=i?.ad_universal_id},"value")}]),t})(),wE=SE,gc=Xe(Tt()),IE=n(function t(e){Ce(this,t);var i,a,r=n(function(){e.disableRebufferTracking||(be(e.data,"view_waiting_rebuffer_count",1),i=ge.now(),a=gc.default.setInterval(function(){if(i){var u=ge.now();be(e.data,"view_waiting_rebuffer_duration",u-i),i=u}},250))},"a"),s=n(function(){e.disableRebufferTracking||i&&(be(e.data,"view_waiting_rebuffer_duration",ge.now()-i),i=!1,gc.default.clearInterval(a))},"n"),o=!1,l=n(function(){o=!0},"s"),d=n(function(){o=!1,s()},"u");e.on("waiting",function(){o&&r()}),e.on("playing",function(){s(),l()}),e.on("pause",d),e.on("seeking",d)},"r"),RE=IE,CE=n(function t(e){var i=this;Ce(this,t),I(this,"lastWallClockTime",void 0);var a=n(function(){i.lastWallClockTime=ge.now(),e.on("before*",r)},"i"),r=n(function(s){var o=ge.now(),l=i.lastWallClockTime;i.lastWallClockTime=o,o-l>3e4&&(e.emit("devicesleep",{viewer_time:l}),Object.assign(e.data,{viewer_time:l}),e.send("devicesleep"),e.emit("devicewake",{viewer_time:o}),Object.assign(e.data,{viewer_time:o}),e.send("devicewake"))},"a");e.one("playbackheartbeat",a),e.on("playbackheartbeatend",function(){e.off("before*",r),e.one("playbackheartbeat",a)})},"r"),DE=CE,jo=Xe(Tt()),mm=(function(t){return t()})(function(){var t=n(function(){for(var i=0,a={};i<arguments.length;i++){var r=arguments[i];for(var s in r)a[s]=r[s]}return a},"r");function e(i){function a(r,s,o){var l;if(typeof document<"u"){if(arguments.length>1){if(o=t({path:"/"},a.defaults,o),typeof o.expires=="number"){var d=new Date;d.setMilliseconds(d.getMilliseconds()+o.expires*864e5),o.expires=d}try{l=JSON.stringify(s),/^[\{\[]/.test(l)&&(s=l)}catch{}return i.write?s=i.write(s,r):s=encodeURIComponent(String(s)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),r=r.replace(/[\(\)]/g,escape),document.cookie=[r,"=",s,o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("")}r||(l={});for(var u=document.cookie?document.cookie.split("; "):[],p=/(%[0-9A-Z]{2})+/g,v=0;v<u.length;v++){var m=u[v].split("="),h=m.slice(1).join("=");h.charAt(0)==='"'&&(h=h.slice(1,-1));try{var f=m[0].replace(p,decodeURIComponent);if(h=i.read?i.read(h,f):i(h,f)||h.replace(p,decodeURIComponent),this.json)try{h=JSON.parse(h)}catch{}if(r===f){l=h;break}r||(l[f]=h)}catch{}}return l}}return n(a,"i"),a.set=a,a.get=function(r){return a.call(a,r)},a.getJSON=function(){return a.apply({json:!0},[].slice.call(arguments))},a.defaults={},a.remove=function(r,s){a(r,"",t(s,{expires:-1}))},a.withConverter=e,a}return n(e,"e"),e(function(){})}),pm="muxData",LE=n(function(t){return Object.entries(t).map(function(e){var i=ri(e,2),a=i[0],r=i[1];return"".concat(a,"=").concat(r)}).join("&")},"Sa"),ME=n(function(t){return t.split("&").reduce(function(e,i){var a=ri(i.split("="),2),r=a[0],s=a[1],o=+s,l=s&&o==s?o:s;return e[r]=l,e},{})},"Ra$1"),vm=n(function(){var t;try{t=ME(mm.get(pm)||"")}catch{t={}}return t},"er"),fm=n(function(t){try{mm.set(pm,LE(t),{expires:365})}catch{}},"tr"),xE=n(function(){var t=vm();return t.mux_viewer_id=t.mux_viewer_id||an(),t.msn=t.msn||Math.random(),fm(t),{mux_viewer_id:t.mux_viewer_id,mux_sample_number:t.msn}},"rr$1"),OE=n(function(){var t=vm(),e=ge.now();return t.session_start&&(t.sst=t.session_start,delete t.session_start),t.session_id&&(t.sid=t.session_id,delete t.session_id),t.session_expires&&(t.sex=t.session_expires,delete t.session_expires),(!t.sex||t.sex<e)&&(t.sid=an(),t.sst=e),t.sex=e+1500*1e3,fm(t),{session_id:t.sid,session_start:t.sst,session_expires:t.sex}},"ar");function NE(t,e){var i=e.beaconCollectionDomain,a=e.beaconDomain;if(i)return"https://"+i;t=t||"inferred";var r=a||"litix.io";return t.match(/^[a-z0-9]+$/)?"https://"+t+"."+r:"https://img.litix.io/a.gif"}n(NE,"Ke$1");var PE=Xe(Tt()),Em=n(function(){var t;switch(_m()){case"cellular":t="cellular";break;case"ethernet":t="wired";break;case"wifi":t="wifi";break;case void 0:break;default:t="other"}return t},"nr$1"),_m=n(function(){var t=PE.default.navigator,e=t&&(t.connection||t.mozConnection||t.webkitConnection);return e&&e.type},"or$1");Em.getConnectionFromAPI=_m;var $E=Em,UE={a:"env",b:"beacon",c:"custom",d:"ad",e:"event",f:"experiment",i:"internal",m:"mux",n:"response",p:"player",q:"request",r:"retry",s:"session",t:"timestamp",u:"viewer",v:"video",w:"page",x:"view",y:"sub"},HE=bm(UE),BE={ad:"ad",af:"affiliate",ag:"aggregate",ap:"api",al:"application",ao:"audio",ar:"architecture",as:"asset",au:"autoplay",av:"average",bi:"bitrate",bn:"brand",br:"break",bw:"browser",by:"bytes",bz:"business",ca:"cached",cb:"cancel",cc:"codec",cd:"code",cg:"category",ch:"changed",ci:"client",ck:"clicked",cl:"canceled",cn:"config",co:"count",ce:"counter",cp:"complete",cq:"creator",cr:"creative",cs:"captions",ct:"content",cu:"current",cx:"connection",cz:"context",dg:"downscaling",dm:"domain",dn:"cdn",do:"downscale",dr:"drm",dp:"dropped",du:"duration",dv:"device",dy:"dynamic",eb:"enabled",ec:"encoding",ed:"edge",en:"end",eg:"engine",em:"embed",er:"error",ep:"experiments",es:"errorcode",et:"errortext",ee:"event",ev:"events",ex:"expires",ez:"exception",fa:"failed",fi:"first",fm:"family",ft:"format",fp:"fps",fq:"frequency",fr:"frame",fs:"fullscreen",ha:"has",hb:"holdback",he:"headers",ho:"host",hn:"hostname",ht:"height",id:"id",ii:"init",in:"instance",ip:"ip",is:"is",ke:"key",la:"language",lb:"labeled",le:"level",li:"live",ld:"loaded",lo:"load",ls:"lists",lt:"latency",ma:"max",md:"media",me:"message",mf:"manifest",mi:"mime",ml:"midroll",mm:"min",mn:"manufacturer",mo:"model",mx:"mux",ne:"newest",nm:"name",no:"number",on:"on",or:"origin",os:"os",pa:"paused",pb:"playback",pd:"producer",pe:"percentage",pf:"played",pg:"program",ph:"playhead",pi:"plugin",pl:"preroll",pn:"playing",po:"poster",pp:"pip",pr:"preload",ps:"position",pt:"part",py:"property",px:"pop",pz:"plan",ra:"rate",rd:"requested",re:"rebuffer",rf:"rendition",rg:"range",rm:"remote",ro:"ratio",rp:"response",rq:"request",rs:"requests",sa:"sample",sd:"skipped",se:"session",sh:"shift",sk:"seek",sm:"stream",so:"source",sq:"sequence",sr:"series",ss:"status",st:"start",su:"startup",sv:"server",sw:"software",sy:"severity",ta:"tag",tc:"tech",te:"text",tg:"target",th:"throughput",ti:"time",tl:"total",to:"to",tt:"title",ty:"type",ug:"upscaling",un:"universal",up:"upscale",ur:"url",us:"user",va:"variant",vd:"viewed",vi:"video",ve:"version",vw:"view",vr:"viewer",wd:"width",wa:"watch",wt:"waiting"},yc=bm(BE);function bm(t){var e={};for(var i in t)t.hasOwnProperty(i)&&(e[t[i]]=i);return e}n(bm,"dr");function gl(t){var e={},i={};return Object.keys(t).forEach(function(a){var r=!1;if(t.hasOwnProperty(a)&&t[a]!==void 0){var s=a.split("_"),o=s[0],l=HE[o];l||(te.info("Data key word `"+s[0]+"` not expected in "+a),l=o+"_"),s.splice(1).forEach(function(d){d==="url"&&(r=!0),yc[d]?l+=yc[d]:Number.isInteger(Number(d))?l+=d:(te.info("Data key word `"+d+"` not expected in "+a),l+="_"+d+"_")}),r?i[l]=t[a]:e[l]=t[a]}}),Object.assign(e,i)}n(gl,"ve$2");var Vi=Xe(Tt()),WE=Xe(lm()),FE={maxBeaconSize:300,maxQueueLength:3600,baseTimeBetweenBeacons:1e4,maxPayloadKBSize:500},KE=56*1024,VE=["hb","requestcompleted","requestfailed","requestcanceled"],qE="https://img.litix.io",si=n(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this._beaconUrl=t||qE,this._eventQueue=[],this._postInFlight=!1,this._resendAfterPost=!1,this._failureCount=0,this._sendTimeout=!1,this._options=Object.assign({},FE,e)},"$$1");si.prototype.queueEvent=function(t,e){var i=Object.assign({},e);return this._eventQueue.length<=this._options.maxQueueLength||t==="eventrateexceeded"?(this._eventQueue.push(i),this._sendTimeout||this._startBeaconSending(),this._eventQueue.length<=this._options.maxQueueLength):!1};si.prototype.flushEvents=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;if(t&&this._eventQueue.length===1){this._eventQueue.pop();return}this._eventQueue.length&&this._sendBeaconQueue(),this._startBeaconSending()};si.prototype.destroy=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;this.destroyed=!0,t?this._clearBeaconQueue():this.flushEvents(),Vi.default.clearTimeout(this._sendTimeout)};si.prototype._clearBeaconQueue=function(){var t=this._eventQueue.length>this._options.maxBeaconSize?this._eventQueue.length-this._options.maxBeaconSize:0,e=this._eventQueue.slice(t);t>0&&Object.assign(e[e.length-1],gl({mux_view_message:"event queue truncated"}));var i=this._createPayload(e);gm(this._beaconUrl,i,!0,function(){})};si.prototype._sendBeaconQueue=function(){var t=this;if(this._postInFlight){this._resendAfterPost=!0;return}var e=this._eventQueue.slice(0,this._options.maxBeaconSize);this._eventQueue=this._eventQueue.slice(this._options.maxBeaconSize),this._postInFlight=!0;var i=this._createPayload(e),a=ge.now();gm(this._beaconUrl,i,!1,function(r,s){s?(t._eventQueue=e.concat(t._eventQueue),t._failureCount+=1,te.info("Error sending beacon: "+s)):t._failureCount=0,t._roundTripTime=ge.now()-a,t._postInFlight=!1,t._resendAfterPost&&(t._resendAfterPost=!1,t._eventQueue.length>0&&t._sendBeaconQueue())})};si.prototype._getNextBeaconTime=function(){if(!this._failureCount)return this._options.baseTimeBetweenBeacons;var t=Math.pow(2,this._failureCount-1);return t=t*Math.random(),(1+t)*this._options.baseTimeBetweenBeacons};si.prototype._startBeaconSending=function(){var t=this;Vi.default.clearTimeout(this._sendTimeout),!this.destroyed&&(this._sendTimeout=Vi.default.setTimeout(function(){t._eventQueue.length&&t._sendBeaconQueue(),t._startBeaconSending()},this._getNextBeaconTime()))};si.prototype._createPayload=function(t){var e=this,i={transmission_timestamp:Math.round(ge.now())};this._roundTripTime&&(i.rtt_ms=Math.round(this._roundTripTime));var a,r,s,o=n(function(){a=JSON.stringify({metadata:i,events:r||t}),s=a.length/1024},"o"),l=n(function(){return s<=e._options.maxPayloadKBSize},"s");return o(),l()||(te.info("Payload size is too big ("+s+" kb). Removing unnecessary events."),r=t.filter(function(d){return VE.indexOf(d.e)===-1}),o()),l()||(te.info("Payload size still too big ("+s+" kb). Cropping fields.."),r.forEach(function(d){for(var u in d){var p=d[u],v=50*1024;typeof p=="string"&&p.length>v&&(d[u]=p.substring(0,v))}}),o()),a};var YE=typeof WE.default.exitPictureInPicture=="function"?function(t){return t.length<=KE}:function(t){return!1},gm=n(function(t,e,i,a){if(i&&navigator&&navigator.sendBeacon&&navigator.sendBeacon(t,e)){a();return}if(Vi.default.fetch){Vi.default.fetch(t,{method:"POST",body:e,headers:{"Content-Type":"text/plain"},keepalive:YE(e)}).then(function(s){return a(null,s.ok?null:"Error")}).catch(function(s){return a(null,s)});return}if(Vi.default.XMLHttpRequest){var r=new Vi.default.XMLHttpRequest;r.onreadystatechange=function(){if(r.readyState===4)return a(null,r.status!==200?"error":void 0)},r.open("POST",t),r.setRequestHeader("Content-Type","text/plain"),r.send(e);return}a()},"Cr"),GE=si,QE=["env_key","view_id","view_sequence_number","player_sequence_number","beacon_domain","player_playhead_time","viewer_time","mux_api_version","event","video_id","player_instance_id","player_error_code","player_error_message","player_error_context","player_error_severity","player_error_business_exception"],ZE=["adplay","adplaying","adpause","adfirstquartile","admidpoint","adthirdquartile","adended","adresponse","adrequest"],zE=["ad_id","ad_creative_id","ad_universal_id"],jE=["viewstart","error","ended","viewend"],XE=600*1e3,JE=(function(){function t(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};Ce(this,t);var r,s,o,l,d,u,p,v,m,h,f,_;I(this,"mux",void 0),I(this,"envKey",void 0),I(this,"options",void 0),I(this,"eventQueue",void 0),I(this,"sampleRate",void 0),I(this,"disableCookies",void 0),I(this,"respectDoNotTrack",void 0),I(this,"previousBeaconData",void 0),I(this,"lastEventTime",void 0),I(this,"rateLimited",void 0),I(this,"pageLevelData",void 0),I(this,"viewerData",void 0),this.mux=e,this.envKey=i,this.options=a,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.eventQueue=new GE(NE(this.envKey,this.options));var g;this.sampleRate=(g=this.options.sampleRate)!==null&&g!==void 0?g:1;var T;this.disableCookies=(T=this.options.disableCookies)!==null&&T!==void 0?T:!1;var A;this.respectDoNotTrack=(A=this.options.respectDoNotTrack)!==null&&A!==void 0?A:!1,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.pageLevelData={mux_api_version:this.mux.API_VERSION,mux_embed:this.mux.NAME,mux_embed_version:this.mux.VERSION,viewer_application_name:(r=this.options.platform)===null||r===void 0?void 0:r.name,viewer_application_version:(s=this.options.platform)===null||s===void 0?void 0:s.version,viewer_application_engine:(o=this.options.platform)===null||o===void 0?void 0:o.layout,viewer_device_name:(l=this.options.platform)===null||l===void 0?void 0:l.product,viewer_device_category:"",viewer_device_manufacturer:(d=this.options.platform)===null||d===void 0?void 0:d.manufacturer,viewer_os_family:(p=this.options.platform)===null||p===void 0||(u=p.os)===null||u===void 0?void 0:u.family,viewer_os_architecture:(m=this.options.platform)===null||m===void 0||(v=m.os)===null||v===void 0?void 0:v.architecture,viewer_os_version:(f=this.options.platform)===null||f===void 0||(h=f.os)===null||h===void 0?void 0:h.version,viewer_connection_type:$E(),page_url:jo.default===null||jo.default===void 0||(_=jo.default.location)===null||_===void 0?void 0:_.href},this.viewerData=this.disableCookies?{}:xE()}return n(t,"r"),Gt(t,[{key:"send",value:n(function(e,i){if(!(!e||!(i!=null&&i.view_id))){if(this.respectDoNotTrack&&_l())return te.info("Not sending `"+e+"` because Do Not Track is enabled");if(!i||typeof i!="object")return te.error("A data object was expected in send() but was not provided");var a=this.disableCookies?{}:OE(),r=xd(Xs({},this.pageLevelData,i,a,this.viewerData),{event:e,env_key:this.envKey});r.user_id&&(r.viewer_user_id=r.user_id,delete r.user_id);var s,o=((s=r.mux_sample_number)!==null&&s!==void 0?s:0)>=this.sampleRate,l=this._deduplicateBeaconData(e,r),d=gl(l);if(this.lastEventTime=this.mux.utils.now(),o)return te.info("Not sending event due to sample rate restriction",e,r,d);if(this.envKey||te.info("Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL",e,r,d),!this.rateLimited){if(te.info("Sending event",e,r,d),this.rateLimited=!this.eventQueue.queueEvent(e,d),this.mux.WINDOW_UNLOADING&&e==="viewend")this.eventQueue.destroy(!0);else if(this.mux.WINDOW_HIDDEN&&e==="hb"?this.eventQueue.flushEvents(!0):jE.indexOf(e)>=0&&this.eventQueue.flushEvents(),this.rateLimited)return r.event="eventrateexceeded",d=gl(r),this.eventQueue.queueEvent(r.event,d),te.error("Beaconing disabled due to rate limit.")}}},"value")},{key:"destroy",value:n(function(){this.eventQueue.destroy(!1)},"value")},{key:"_deduplicateBeaconData",value:n(function(e,i){var a=this,r={},s=i.view_id;if(s==="-1"||e==="viewstart"||e==="viewend"||!this.previousBeaconData||this.mux.utils.now()-this.lastEventTime>=XE)r=Xs({},i),s&&(this.previousBeaconData=r),s&&e==="viewend"&&(this.previousBeaconData=null);else{var o=e.indexOf("request")===0;Object.entries(i).forEach(function(l){var d=ri(l,2),u=d[0],p=d[1];a.previousBeaconData&&(p!==a.previousBeaconData[u]||QE.indexOf(u)>-1||a.objectHasChanged(o,u,p,a.previousBeaconData[u])||a.eventRequiresKey(e,u))&&(r[u]=p,a.previousBeaconData[u]=p)})}return r},"value")},{key:"objectHasChanged",value:n(function(e,i,a,r){return!e||i.indexOf("request_")!==0?!1:i==="request_response_headers"||typeof a!="object"||typeof r!="object"?!0:Object.keys(a||{}).length!==Object.keys(r||{}).length},"value")},{key:"eventRequiresKey",value:n(function(e,i){return!!(e==="renditionchange"&&i.indexOf("video_source_")===0||zE.includes(i)&&ZE.includes(e))},"value")}]),t})(),e_=n(function t(e){Ce(this,t);var i=0,a=0,r=0,s=0,o=0,l=0,d=0,u=n(function(m,h){var f=h.request_start,_=h.request_response_start,g=h.request_response_end,T=h.request_bytes_loaded;s++;var A,b;if(_?(A=_-(f??0),b=(g??0)-_):b=(g??0)-(f??0),b>0&&T&&T>0){var S=T/b*8e3;o++,a+=T,r+=b,e.data.view_min_request_throughput=Math.min(e.data.view_min_request_throughput||1/0,S),e.data.view_average_request_throughput=a/r*8e3,e.data.view_request_count=s,A>0&&(i+=A,e.data.view_max_request_latency=Math.max(e.data.view_max_request_latency||0,A),e.data.view_average_request_latency=i/o)}},"p"),p=n(function(m,h){s++,l++,e.data.view_request_count=s,e.data.view_request_failed_count=l},"b"),v=n(function(m,h){s++,d++,e.data.view_request_count=s,e.data.view_request_canceled_count=d},"k");e.on("requestcompleted",u),e.on("requestfailed",p),e.on("requestcanceled",v)},"r"),t_=e_,i_=3600*1e3,a_=n(function t(e){var i=this;Ce(this,t),I(this,"_lastEventTime",void 0),e.on("before*",function(a,r){var s=r.viewer_time,o=ge.now(),l=i._lastEventTime;if(i._lastEventTime=o,l&&o-l>i_){var d=Object.keys(e.data).reduce(function(p,v){return v.indexOf("video_")===0?Object.assign(p,I({},v,e.data[v])):p},{});e.mux.log.info("Received event after at least an hour inactivity, creating a new view");var u=e.playbackHeartbeat._playheadShouldBeProgressing;e._resetView(Object.assign({viewer_time:s},d)),e.playbackHeartbeat._playheadShouldBeProgressing=u,e.playbackHeartbeat._playheadShouldBeProgressing&&a.type!=="play"&&a.type!=="adbreakstart"&&(e.emit("play",{viewer_time:s}),a.type!=="playing"&&e.emit("playing",{viewer_time:s}))}})},"r"),r_=a_,n_=["viewstart","ended","loadstart","pause","play","playing","ratechange","waiting","adplay","adpause","adended","aderror","adplaying","adrequest","adresponse","adbreakstart","adbreakend","adfirstquartile","admidpoint","adthirdquartile","rebufferstart","rebufferend","seeked","error","hb","requestcompleted","requestfailed","requestcanceled","renditionchange"],s_=new Set(["requestcompleted","requestfailed","requestcanceled"]),o_=(function(t){Hf(i,t);var e=Ff(i);function i(a,r,s){Ce(this,i);var o;o=e.call(this),I(P(o),"DOM_CONTENT_LOADED_EVENT_END",void 0),I(P(o),"NAVIGATION_START",void 0),I(P(o),"_destroyed",void 0),I(P(o),"_heartBeatTimeout",void 0),I(P(o),"adTracker",void 0),I(P(o),"dashjs",void 0),I(P(o),"data",void 0),I(P(o),"disablePlayheadRebufferTracking",void 0),I(P(o),"disableRebufferTracking",void 0),I(P(o),"errorTracker",void 0),I(P(o),"errorTranslator",void 0),I(P(o),"emitTranslator",void 0),I(P(o),"getAdData",void 0),I(P(o),"getPlayheadTime",void 0),I(P(o),"getStateData",void 0),I(P(o),"stateDataTranslator",void 0),I(P(o),"hlsjs",void 0),I(P(o),"id",void 0),I(P(o),"longResumeTracker",void 0),I(P(o),"minimumRebufferDuration",void 0),I(P(o),"mux",void 0),I(P(o),"playbackEventDispatcher",void 0),I(P(o),"playbackHeartbeat",void 0),I(P(o),"playbackHeartbeatTime",void 0),I(P(o),"playheadTime",void 0),I(P(o),"seekingTracker",void 0),I(P(o),"sustainedRebufferThreshold",void 0),I(P(o),"watchTimeTracker",void 0),I(P(o),"currentFragmentPDT",void 0),I(P(o),"currentFragmentStart",void 0),o.DOM_CONTENT_LOADED_EVENT_END=js.domContentLoadedEventEnd(),o.NAVIGATION_START=js.navigationStart();var l={debug:!1,minimumRebufferDuration:250,sustainedRebufferThreshold:1e3,playbackHeartbeatTime:25,beaconDomain:"litix.io",sampleRate:1,disableCookies:!1,respectDoNotTrack:!1,disableRebufferTracking:!1,disablePlayheadRebufferTracking:!1,errorTranslator:n(function(m){return m},"errorTranslator"),emitTranslator:n(function(){for(var m=arguments.length,h=new Array(m),f=0;f<m;f++)h[f]=arguments[f];return h},"emitTranslator"),stateDataTranslator:n(function(m){return m},"stateDataTranslator")};o.mux=a,o.id=r,s!=null&&s.beaconDomain&&o.mux.log.warn("The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`."),s=Object.assign(l,s),s.data=s.data||{},s.data.property_key&&(s.data.env_key=s.data.property_key,delete s.data.property_key),te.level=s.debug?Fi.DEBUG:Fi.WARN,o.getPlayheadTime=s.getPlayheadTime,o.getStateData=s.getStateData||function(){return{}},o.getAdData=s.getAdData||function(){},o.minimumRebufferDuration=s.minimumRebufferDuration,o.sustainedRebufferThreshold=s.sustainedRebufferThreshold,o.playbackHeartbeatTime=s.playbackHeartbeatTime,o.disableRebufferTracking=s.disableRebufferTracking,o.disableRebufferTracking&&o.mux.log.warn("Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering."),o.disablePlayheadRebufferTracking=s.disablePlayheadRebufferTracking,o.errorTranslator=s.errorTranslator,o.emitTranslator=s.emitTranslator,o.stateDataTranslator=s.stateDataTranslator,o.playbackEventDispatcher=new JE(a,s.data.env_key,s),o.data={player_instance_id:an(),mux_sample_rate:s.sampleRate,beacon_domain:s.beaconCollectionDomain||s.beaconDomain},o.data.view_sequence_number=1,o.data.player_sequence_number=1;var d=function(){typeof this.data.view_start>"u"&&(this.data.view_start=this.mux.utils.now(),this.emit("viewstart"))}.bind(P(o));if(o.on("viewinit",function(m,h){this._resetVideoData(),this._resetViewData(),this._resetErrorData(),this._updateStateData(),Object.assign(this.data,h),this._initializeViewData(),this.one("play",d),this.one("adbreakstart",d)}),o.on("videochange",function(m,h){this._resetView(h)}),o.on("programchange",function(m,h){this.data.player_is_paused&&this.mux.log.warn("The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information."),this._resetView(Object.assign(h,{view_program_changed:!0})),d(),this.emit("play"),this.emit("playing")}),o.on("fragmentchange",function(m,h){this.currentFragmentPDT=h.currentFragmentPDT,this.currentFragmentStart=h.currentFragmentStart}),o.on("destroy",o.destroy),typeof window<"u"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"){var u=n(function(){var m=typeof o.data.view_start<"u";o.mux.WINDOW_HIDDEN=document.visibilityState==="hidden",m&&o.mux.WINDOW_HIDDEN&&(o.data.player_is_paused||o.emit("hb"))},"p");window.addEventListener("visibilitychange",u,!1);var p=n(function(m){m.persisted||o.destroy()},"b");window.addEventListener("pagehide",p,!1),o.on("destroy",function(){window.removeEventListener("visibilitychange",u),window.removeEventListener("pagehide",p)})}o.on("playerready",function(m,h){Object.assign(this.data,h)}),n_.forEach(function(m){o.on(m,function(h,f){m.indexOf("ad")!==0&&this._updateStateData(),Object.assign(this.data,f),this._sanitizeData()}),o.on("after"+m,function(){(m!=="error"||this.errorTracker.viewErrored)&&this.send(m)})}),o.on("viewend",function(m,h){Object.assign(o.data,h)});var v=n(function(m){var h=this.mux.utils.now();this.data.player_init_time&&(this.data.player_startup_time=h-this.data.player_init_time),!this.mux.PLAYER_TRACKED&&this.NAVIGATION_START&&(this.mux.PLAYER_TRACKED=!0,(this.data.player_init_time||this.DOM_CONTENT_LOADED_EVENT_END)&&(this.data.page_load_time=Math.min(this.data.player_init_time||1/0,this.DOM_CONTENT_LOADED_EVENT_END||1/0)-this.NAVIGATION_START)),this.send("playerready"),delete this.data.player_startup_time,delete this.data.page_load_time},"k");return o.one("playerready",v),o.longResumeTracker=new r_(P(o)),o.errorTracker=new sE(P(o)),new DE(P(o)),o.seekingTracker=new AE(P(o)),o.playheadTime=new hE(P(o)),o.playbackHeartbeat=new rE(P(o)),new gE(P(o)),o.watchTimeTracker=new lE(P(o)),new uE(P(o)),o.adTracker=new wE(P(o)),new fE(P(o)),new pE(P(o)),new _E(P(o)),new RE(P(o)),new t_(P(o)),s.hlsjs&&o.addHLSJS(s),s.dashjs&&o.addDashJS(s),o.emit("viewinit",s.data),o}return n(i,"t"),Gt(i,[{key:"emit",value:n(function(a,r){var s,o=Object.assign({viewer_time:this.mux.utils.now()},r),l=[a,o];if(this.emitTranslator)try{l=this.emitTranslator(a,o)}catch(d){this.mux.log.warn("Exception in emit translator callback.",d)}l!=null&&l.length&&(s=Fn(Xa(i.prototype),"emit",this)).call.apply(s,[this].concat(pt(l)))},"value")},{key:"destroy",value:n(function(){this._destroyed||(this._destroyed=!0,typeof this.data.view_start<"u"&&(this.emit("viewend"),this.send("viewend")),this.playbackEventDispatcher.destroy(),this.removeHLSJS(),this.removeDashJS(),window.clearTimeout(this._heartBeatTimeout))},"value")},{key:"send",value:n(function(a){if(this.data.view_id){var r=Object.assign({},this.data),s=["player_program_time","player_manifest_newest_program_time","player_live_edge_program_time","player_program_time","video_holdback","video_part_holdback","video_target_duration","video_part_target_duration"];if(r.video_source_is_live===void 0&&(r.player_source_duration===1/0||r.video_source_duration===1/0?r.video_source_is_live=!0:(r.player_source_duration>0||r.video_source_duration>0)&&(r.video_source_is_live=!1)),r.video_source_is_live||s.forEach(function(u){r[u]=void 0}),r.video_source_url=r.video_source_url||r.player_source_url,r.video_source_url){var o=ri(rn(r.video_source_url),2),l=o[0],d=o[1];r.video_source_domain=d,r.video_source_hostname=l}delete r.ad_request_id,this.playbackEventDispatcher.send(a,r),this.data.view_sequence_number++,this.data.player_sequence_number++,s_.has(a)||this._restartHeartBeat(),a==="viewend"&&delete this.data.view_id}},"value")},{key:"_resetView",value:n(function(a){this.emit("viewend"),this.send("viewend"),this.emit("viewinit",a)},"value")},{key:"_updateStateData",value:n(function(){var a=this.getStateData();if(typeof this.stateDataTranslator=="function")try{a=this.stateDataTranslator(a)}catch(r){this.mux.log.warn("Exception in stateDataTranslator translator callback.",r)}Object.assign(this.data,a),this.playheadTime._updatePlayheadTime(),this._sanitizeData()},"value")},{key:"_sanitizeData",value:n(function(){var a=this,r=["player_width","player_height","video_source_width","video_source_height","player_playhead_time","video_source_bitrate"];r.forEach(function(o){var l=parseInt(a.data[o],10);a.data[o]=isNaN(l)?void 0:l});var s=["player_source_url","video_source_url"];s.forEach(function(o){if(a.data[o]){var l=a.data[o].toLowerCase();(l.indexOf("data:")===0||l.indexOf("blob:")===0)&&(a.data[o]="MSE style URL")}})},"value")},{key:"_resetVideoData",value:n(function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("video_")===0&&delete a.data[r]})},"value")},{key:"_resetViewData",value:n(function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("view_")===0&&delete a.data[r]}),this.data.view_sequence_number=1},"value")},{key:"_resetErrorData",value:n(function(){delete this.data.player_error_code,delete this.data.player_error_message,delete this.data.player_error_context,delete this.data.player_error_severity,delete this.data.player_error_business_exception},"value")},{key:"_initializeViewData",value:n(function(){var a=this,r=this.data.view_id=an(),s=n(function(){r===a.data.view_id&&be(a.data,"player_view_count",1)},"o");this.data.player_is_paused?this.one("play",s):s()},"value")},{key:"_restartHeartBeat",value:n(function(){var a=this;window.clearTimeout(this._heartBeatTimeout),this._heartBeatTimeout=window.setTimeout(function(){a.data.player_is_paused||a.emit("hb")},1e4)},"value")},{key:"addHLSJS",value:n(function(a){if(!a.hlsjs){this.mux.log.warn("You must pass a valid hlsjs instance in order to track it.");return}if(this.hlsjs){this.mux.log.warn("An instance of HLS.js is already being monitored for this player.");return}this.hlsjs=a.hlsjs,Qf(this.mux,this.id,a.hlsjs,{},a.Hls||window.Hls)},"value")},{key:"removeHLSJS",value:n(function(){this.hlsjs&&(Zf(this.hlsjs),this.hlsjs=void 0)},"value")},{key:"addDashJS",value:n(function(a){if(!a.dashjs){this.mux.log.warn("You must pass a valid dashjs instance in order to track it.");return}if(this.dashjs){this.mux.log.warn("An instance of Dash.js is already being monitored for this player.");return}this.dashjs=a.dashjs,Jf(this.mux,this.id,a.dashjs)},"value")},{key:"removeDashJS",value:n(function(){this.dashjs&&(eE(this.dashjs),this.dashjs=void 0)},"value")}]),i})(iE),l_=o_,hr=Xe(lm());function d_(){return hr.default&&!!(hr.default.fullscreenElement||hr.default.webkitFullscreenElement||hr.default.mozFullScreenElement||hr.default.msFullscreenElement)}n(d_,"ot$1");var u_=["loadstart","pause","play","playing","seeking","seeked","timeupdate","ratechange","stalled","waiting","error","ended"],c_={1:"MEDIA_ERR_ABORTED",2:"MEDIA_ERR_NETWORK",3:"MEDIA_ERR_DECODE",4:"MEDIA_ERR_SRC_NOT_SUPPORTED"};function h_(t,e,i){var a=ri(zs(e),3),r=a[0],s=a[1],o=a[2],l=t.log,d=t.utils.getComputedStyle,u=t.utils.secondsToMs,p={automaticErrorTracking:!0};if(r){if(o!=="video"&&o!=="audio")return l.error("The element of `"+s+"` was not a media element.")}else return l.error("No element was found with the `"+s+"` query selector.");r.mux&&(r.mux.destroy(),delete r.mux,l.warn("Already monitoring this video element, replacing existing event listeners"));var v={getPlayheadTime:n(function(){return u(r.currentTime)},"getPlayheadTime"),getStateData:n(function(){var h,f,_,g=((h=(f=this).getPlayheadTime)===null||h===void 0?void 0:h.call(f))||u(r.currentTime),T=this.hlsjs&&this.hlsjs.url,A=this.dashjs&&typeof this.dashjs.getSource=="function"&&this.dashjs.getSource(),b={player_is_paused:r.paused,player_width:parseInt(d(r,"width")),player_height:parseInt(d(r,"height")),player_autoplay_on:r.autoplay,player_preload_on:r.preload,player_language_code:r.lang,player_is_fullscreen:d_(),video_poster_url:r.poster,video_source_url:T||A||r.currentSrc,video_source_duration:u(r.duration),video_source_height:r.videoHeight,video_source_width:r.videoWidth,view_dropped_frame_count:r==null||(_=r.getVideoPlaybackQuality)===null||_===void 0?void 0:_.call(r).droppedVideoFrames};if(r.getStartDate&&g>0){var S=r.getStartDate();if(S&&typeof S.getTime=="function"&&S.getTime()){var L=S.getTime();if(b.player_program_time=L+g,r.seekable.length>0){var N=L+r.seekable.end(r.seekable.length-1);b.player_live_edge_program_time=N}}}return b},"getStateData")};i=Object.assign(p,i,v),i.data=Object.assign({player_software:"HTML5 Video Element",player_mux_plugin_name:"VideoElementMonitor",player_mux_plugin_version:t.VERSION},i.data),r.mux=r.mux||{},r.mux.deleted=!1,r.mux.emit=function(h,f){t.emit(s,h,f)},r.mux.updateData=function(h){r.mux.emit("hb",h)};var m=n(function(){l.error("The monitor for this video element has already been destroyed.")},"y");r.mux.destroy=function(){Object.keys(r.mux.listeners).forEach(function(h){r.removeEventListener(h,r.mux.listeners[h],!1)}),delete r.mux.listeners,r.mux.destroy=m,r.mux.swapElement=m,r.mux.emit=m,r.mux.addHLSJS=m,r.mux.addDashJS=m,r.mux.removeHLSJS=m,r.mux.removeDashJS=m,r.mux.updateData=m,r.mux.setEmitTranslator=m,r.mux.setStateDataTranslator=m,r.mux.setGetPlayheadTime=m,r.mux.deleted=!0,t.emit(s,"destroy")},r.mux.swapElement=function(h){var f=ri(zs(h),3),_=f[0],g=f[1],T=f[2];if(_){if(T!=="video"&&T!=="audio")return t.log.error("The element of `"+g+"` was not a media element.")}else return t.log.error("No element was found with the `"+g+"` query selector.");_.muxId=r.muxId,delete r.muxId,_.mux=_.mux||{},_.mux.listeners=Object.assign({},r.mux.listeners),delete r.mux.listeners,Object.keys(_.mux.listeners).forEach(function(A){r.removeEventListener(A,_.mux.listeners[A],!1),_.addEventListener(A,_.mux.listeners[A],!1)}),_.mux.swapElement=r.mux.swapElement,_.mux.destroy=r.mux.destroy,delete r.mux,r=_},r.mux.addHLSJS=function(h){t.addHLSJS(s,h)},r.mux.addDashJS=function(h){t.addDashJS(s,h)},r.mux.removeHLSJS=function(){t.removeHLSJS(s)},r.mux.removeDashJS=function(){t.removeDashJS(s)},r.mux.setEmitTranslator=function(h){t.setEmitTranslator(s,h)},r.mux.setStateDataTranslator=function(h){t.setStateDataTranslator(s,h)},r.mux.setGetPlayheadTime=function(h){h||(h=i.getPlayheadTime),t.setGetPlayheadTime(s,h)},t.init(s,i),t.emit(s,"playerready"),r.paused||(t.emit(s,"play"),r.readyState>2&&t.emit(s,"playing")),r.mux.listeners={},u_.forEach(function(h){h==="error"&&!i.automaticErrorTracking||(r.mux.listeners[h]=function(){var f={};if(h==="error"){if(!r.error||r.error.code===1)return;f.player_error_code=r.error.code,f.player_error_message=c_[r.error.code]||r.error.message}t.emit(s,h,f)},r.addEventListener(h,r.mux.listeners[h],!1))})}n(h_,"st$2");function m_(t,e,i,a){var r=a;if(t&&typeof t[e]=="function")try{r=t[e].apply(t,i)}catch(s){te.info("safeCall error",s)}return r}n(m_,"ut$2");var qr=Xe(Tt()),va;qr.default&&qr.default.WeakMap&&(va=new WeakMap);function p_(t,e){if(!t||!e||!qr.default||typeof qr.default.getComputedStyle!="function")return"";var i;return va&&va.has(t)&&(i=va.get(t)),i||(i=qr.default.getComputedStyle(t,null),va&&va.set(t,i)),i.getPropertyValue(e)}n(p_,"dt$2");function v_(t){return Math.floor(t*1e3)}n(v_,"lt$1");var Ci={TARGET_DURATION:"#EXT-X-TARGETDURATION",PART_INF:"#EXT-X-PART-INF",SERVER_CONTROL:"#EXT-X-SERVER-CONTROL",INF:"#EXTINF",PROGRAM_DATE_TIME:"#EXT-X-PROGRAM-DATE-TIME",VERSION:"#EXT-X-VERSION",SESSION_DATA:"#EXT-X-SESSION-DATA"},Io=n(function(t){return this.buffer="",this.manifest={segments:[],serverControl:{},sessionData:{}},this.currentUri={},this.process(t),this.manifest},"Fe$1");Io.prototype.process=function(t){var e;for(this.buffer+=t,e=this.buffer.indexOf(`
`);e>-1;e=this.buffer.indexOf(`
`))this.processLine(this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)};Io.prototype.processLine=function(t){var e=t.indexOf(":"),i=b_(t,e),a=i[0],r=i.length===2?Nd(i[1]):void 0;if(a[0]!=="#")this.currentUri.uri=a,this.manifest.segments.push(this.currentUri),this.manifest.targetDuration&&!("duration"in this.currentUri)&&(this.currentUri.duration=this.manifest.targetDuration),this.currentUri={};else switch(a){case Ci.TARGET_DURATION:{if(!isFinite(r)||r<0)return;this.manifest.targetDuration=r,this.setHoldBack();break}case Ci.PART_INF:{Xo(this.manifest,i),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),this.setHoldBack();break}case Ci.SERVER_CONTROL:{Xo(this.manifest,i),this.setHoldBack();break}case Ci.INF:{r===0?this.currentUri.duration=.01:r>0&&(this.currentUri.duration=r);break}case Ci.PROGRAM_DATE_TIME:{var s=r,o=new Date(s);this.manifest.dateTimeString||(this.manifest.dateTimeString=s,this.manifest.dateTimeObject=o),this.currentUri.dateTimeString=s,this.currentUri.dateTimeObject=o;break}case Ci.VERSION:{Xo(this.manifest,i);break}case Ci.SESSION_DATA:{var l=g_(i[1]),d=hm(l);Object.assign(this.manifest.sessionData,d)}}};Io.prototype.setHoldBack=function(){var t=this.manifest,e=t.serverControl,i=t.targetDuration,a=t.partTargetDuration;if(e){var r="holdBack",s="partHoldBack",o=i&&i*3,l=a&&a*2;i&&!e.hasOwnProperty(r)&&(e[r]=o),o&&e[r]<o&&(e[r]=o),a&&!e.hasOwnProperty(s)&&(e[s]=a*3),a&&e[s]<l&&(e[s]=l)}};var Xo=n(function(t,e){var i=ym(e[0].replace("#EXT-X-","")),a;__(e[1])?(a={},a=Object.assign(E_(e[1]),a)):a=Nd(e[1]),t[i]=a},"ct$2"),ym=n(function(t){return t.toLowerCase().replace(/-(\w)/g,function(e){return e[1].toUpperCase()})},"Vr"),Nd=n(function(t){if(t.toLowerCase()==="yes"||t.toLowerCase()==="no")return t.toLowerCase()==="yes";var e=t.indexOf(":")!==-1?t:parseFloat(t);return isNaN(e)?t:e},"_t$1"),f_=n(function(t){var e={},i=t.split("=");if(i.length>1){var a=ym(i[0]);e[a]=Nd(i[1])}return e},"Ti"),E_=n(function(t){for(var e=t.split(","),i={},a=0;e.length>a;a++){var r=e[a],s=f_(r);i=Object.assign(s,i)}return i},"wi"),__=n(function(t){return t.indexOf("=")>-1},"Ei"),b_=n(function(t,e){return e===-1?[t]:[t.substring(0,e),t.substring(e+1)]},"ki"),g_=n(function(t){var e={};if(t){var i=t.search(","),a=t.slice(0,i),r=t.slice(i+1),s=[a,r];return s.forEach(function(o,l){for(var d=o.replace(/['"]+/g,"").split("="),u=0;u<d.length;u++)d[u]==="DATA-ID"&&(e["DATA-ID"]=d[1-u]),d[u]==="VALUE"&&(e.VALUE=d[1-u])}),{data:e}}},"xi"),y_=Io,T_={safeCall:m_,safeIncrement:be,getComputedStyle:p_,secondsToMs:v_,assign:Object.assign,headersStringToObject:Od,cdnHeadersToRequestId:Js,extractHostnameAndDomain:rn,extractHostname:bt,manifestParser:y_,generateShortID:um,generateUUID:an,now:ge.now,findMediaElement:zs},A_=T_,k_={PLAYER_READY:"playerready",VIEW_INIT:"viewinit",VIDEO_CHANGE:"videochange",PLAY:"play",PAUSE:"pause",PLAYING:"playing",TIME_UPDATE:"timeupdate",SEEKING:"seeking",SEEKED:"seeked",REBUFFER_START:"rebufferstart",REBUFFER_END:"rebufferend",ERROR:"error",ENDED:"ended",RENDITION_CHANGE:"renditionchange",ORIENTATION_CHANGE:"orientationchange",AD_REQUEST:"adrequest",AD_RESPONSE:"adresponse",AD_BREAK_START:"adbreakstart",AD_PLAY:"adplay",AD_PLAYING:"adplaying",AD_PAUSE:"adpause",AD_FIRST_QUARTILE:"adfirstquartile",AD_MID_POINT:"admidpoint",AD_THIRD_QUARTILE:"adthirdquartile",AD_ENDED:"adended",AD_BREAK_END:"adbreakend",AD_ERROR:"aderror",REQUEST_COMPLETED:"requestcompleted",REQUEST_FAILED:"requestfailed",REQUEST_CANCELLED:"requestcanceled",HEARTBEAT:"hb",DESTROY:"destroy"},S_=k_,w_="mux-embed",I_="5.9.0",R_="2.1",ve={},ki=n(function(t){var e=arguments;typeof t=="string"?ki.hasOwnProperty(t)?Vr.default.setTimeout(function(){e=Array.prototype.splice.call(e,1),ki[t].apply(null,e)},0):te.warn("`"+t+"` is an unknown task"):typeof t=="function"?Vr.default.setTimeout(function(){t(ki)},0):te.warn("`"+t+"` is invalid.")},"ne$3"),C_={loaded:ge.now(),NAME:w_,VERSION:I_,API_VERSION:R_,PLAYER_TRACKED:!1,monitor:n(function(t,e){return h_(ki,t,e)},"monitor"),destroyMonitor:n(function(t){var e=ri(zs(t),1),i=e[0];i&&i.mux&&typeof i.mux.destroy=="function"?i.mux.destroy():te.error("A video element monitor for `"+t+"` has not been initialized via `mux.monitor`.")},"destroyMonitor"),addHLSJS:n(function(t,e){var i=mt(t);ve[i]?ve[i].addHLSJS(e):te.error("A monitor for `"+i+"` has not been initialized.")},"addHLSJS"),addDashJS:n(function(t,e){var i=mt(t);ve[i]?ve[i].addDashJS(e):te.error("A monitor for `"+i+"` has not been initialized.")},"addDashJS"),removeHLSJS:n(function(t){var e=mt(t);ve[e]?ve[e].removeHLSJS():te.error("A monitor for `"+e+"` has not been initialized.")},"removeHLSJS"),removeDashJS:n(function(t){var e=mt(t);ve[e]?ve[e].removeDashJS():te.error("A monitor for `"+e+"` has not been initialized.")},"removeDashJS"),init:n(function(t,e){_l()&&e&&e.respectDoNotTrack&&te.info("The browser's Do Not Track flag is enabled - Mux beaconing is disabled.");var i=mt(t);ve[i]=new l_(ki,i,e)},"init"),emit:n(function(t,e,i){var a=mt(t);ve[a]?(ve[a].emit(e,i),e==="destroy"&&delete ve[a]):te.error("A monitor for `"+a+"` has not been initialized.")},"emit"),updateData:n(function(t,e){var i=mt(t);ve[i]?ve[i].emit("hb",e):te.error("A monitor for `"+i+"` has not been initialized.")},"updateData"),setEmitTranslator:n(function(t,e){var i=mt(t);ve[i]?ve[i].emitTranslator=e:te.error("A monitor for `"+i+"` has not been initialized.")},"setEmitTranslator"),setStateDataTranslator:n(function(t,e){var i=mt(t);ve[i]?ve[i].stateDataTranslator=e:te.error("A monitor for `"+i+"` has not been initialized.")},"setStateDataTranslator"),setGetPlayheadTime:n(function(t,e){var i=mt(t);ve[i]?ve[i].getPlayheadTime=e:te.error("A monitor for `"+i+"` has not been initialized.")},"setGetPlayheadTime"),checkDoNotTrack:_l,log:te,utils:A_,events:S_,WINDOW_HIDDEN:!1,WINDOW_UNLOADING:!1};Object.assign(ki,C_);typeof Vr.default<"u"&&typeof Vr.default.addEventListener=="function"&&Vr.default.addEventListener("pagehide",function(t){t.persisted||(ki.WINDOW_UNLOADING=!0)},!1);var Pd=ki;var W=mf,ie={VIDEO:"video",THUMBNAIL:"thumbnail",STORYBOARD:"storyboard",DRM:"drm"},O={NOT_AN_ERROR:0,NETWORK_OFFLINE:2000002,NETWORK_UNKNOWN_ERROR:2e6,NETWORK_NO_STATUS:2000001,NETWORK_INVALID_URL:24e5,NETWORK_NOT_FOUND:2404e3,NETWORK_NOT_READY:2412e3,NETWORK_GENERIC_SERVER_FAIL:25e5,NETWORK_TOKEN_MISSING:2403201,NETWORK_TOKEN_MALFORMED:2412202,NETWORK_TOKEN_EXPIRED:2403210,NETWORK_TOKEN_AUD_MISSING:2403221,NETWORK_TOKEN_AUD_MISMATCH:2403222,NETWORK_TOKEN_SUB_MISMATCH:2403232,ENCRYPTED_ERROR:5e6,ENCRYPTED_UNSUPPORTED_KEY_SYSTEM:5000001,ENCRYPTED_GENERATE_REQUEST_FAILED:5000002,ENCRYPTED_UPDATE_LICENSE_FAILED:5000003,ENCRYPTED_UPDATE_SERVER_CERT_FAILED:5000004,ENCRYPTED_CDM_ERROR:5000005,ENCRYPTED_OUTPUT_RESTRICTED:5000006,ENCRYPTED_MISSING_TOKEN:5000002},Ro=n(t=>t===ie.VIDEO?"playback":t,"V$1"),hi=class Ar extends Error{static{n(this,"L")}constructor(e,i=Ar.MEDIA_ERR_CUSTOM,a,r){var s;super(e),this.name="MediaError",this.code=i,this.context=r,this.fatal=a??(i>=Ar.MEDIA_ERR_NETWORK&&i<=Ar.MEDIA_ERR_ENCRYPTED),this.message||(this.message=(s=Ar.defaultMessages[this.code])!=null?s:"")}};hi.MEDIA_ERR_ABORTED=1,hi.MEDIA_ERR_NETWORK=2,hi.MEDIA_ERR_DECODE=3,hi.MEDIA_ERR_SRC_NOT_SUPPORTED=4,hi.MEDIA_ERR_ENCRYPTED=5,hi.MEDIA_ERR_CUSTOM=100,hi.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail.",3:"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",4:"An unsupported error occurred. The server or network failed, or your browser does not support this format.",5:"The media is encrypted and there are no keys to decrypt it."};var C=hi,D_=n(t=>t==null,"at$2"),$d=n((t,e)=>D_(e)?!1:t in e,"O$1"),yl={ANY:"any",MUTED:"muted"},Z={ON_DEMAND:"on-demand",LIVE:"live",UNKNOWN:"unknown"},Ft={MSE:"mse",NATIVE:"native"},kr={HEADER:"header",QUERY:"query",NONE:"none"},eo=Object.values(kr),ii={M3U8:"application/vnd.apple.mpegurl",MP4:"video/mp4"},Tc={HLS:ii.M3U8};[...Object.values(ii)];var IA={upTo720p:"720p",upTo1080p:"1080p",upTo1440p:"1440p",upTo2160p:"2160p"},RA={noLessThan480p:"480p",noLessThan540p:"540p",noLessThan720p:"720p",noLessThan1080p:"1080p",noLessThan1440p:"1440p",noLessThan2160p:"2160p"},CA={DESCENDING:"desc"},L_="en",Tl={code:L_},Ee=n((t,e,i,a,r=t)=>{r.addEventListener(e,i,a),t.addEventListener("teardown",()=>{r.removeEventListener(e,i)},{once:!0})},"v$2");function M_(t,e,i){e&&i>e&&(i=e);for(let a=0;a<t.length;a++)if(t.start(a)<=i&&t.end(a)>=i)return!0;return!1}n(M_,"Te$1");var Ud=n(t=>{let e=t.indexOf("?");if(e<0)return[t];let i=t.slice(0,e),a=t.slice(e);return[i,a]},"F$1"),Co=n(t=>{let{type:e}=t;if(e){let i=e.toUpperCase();return $d(i,Tc)?Tc[i]:e}return x_(t)},"U$1"),Tm=n(t=>t==="VOD"?Z.ON_DEMAND:Z.LIVE,"Q$1"),Am=n(t=>t==="EVENT"?Number.POSITIVE_INFINITY:t==="VOD"?Number.NaN:0,"Z"),x_=n(t=>{let{src:e}=t;if(!e)return"";let i="";try{i=new URL(e).pathname}catch{console.error("invalid url")}let a=i.lastIndexOf(".");if(a<0)return N_(t)?ii.M3U8:"";let r=i.slice(a+1).toUpperCase();return $d(r,ii)?ii[r]:""},"it"),O_="mux.com",N_=n(({src:t,customDomain:e=O_})=>{let i;try{i=new URL(`${t}`)}catch{return!1}let a=i.protocol==="https:",r=i.hostname===`stream.${e}`.toLowerCase(),s=i.pathname.split("/"),o=s.length===2,l=!(s!=null&&s[1].includes("."));return a&&r&&o&&l},"ut$1"),Ka=n(t=>{let e=(t??"").split(".")[1];if(e)try{let i=e.replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(i).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(a)}catch{return}},"ee$2"),P_=n(({exp:t},e=Date.now())=>!t||t*1e3<e,"ye$2"),$_=n(({sub:t},e)=>t!==e,"me$2"),U_=n(({aud:t},e)=>!t,"Ee"),H_=n(({aud:t},e)=>t!==e,"ge$2"),km="en";function M(t,e=!0){var i,a;let r=e&&(a=(i=Tl)==null?void 0:i[t])!=null?a:t,s=e?Tl.code:km;return new B_(r,s)}n(M,"x$4");var B_=class{static{n(this,"z")}constructor(e,i=(a=>(a=Tl)!=null?a:km)()){this.message=e,this.locale=i}format(e){return this.message.replace(/\{(\w+)\}/g,(i,a)=>{var r;return(r=e[a])!=null?r:""})}toString(){return this.message}},W_=Object.values(yl),Ac=n(t=>typeof t=="boolean"||typeof t=="string"&&W_.includes(t),"xe$2"),F_=n((t,e,i)=>{let{autoplay:a}=t,r=!1,s=!1,o=Ac(a)?a:!!a,l=n(()=>{r||Ee(e,"playing",()=>{r=!0},{once:!0})},"i");if(l(),Ee(e,"loadstart",()=>{r=!1,l(),Jo(e,o)},{once:!0}),Ee(e,"loadstart",()=>{i||(t.streamType&&t.streamType!==Z.UNKNOWN?s=t.streamType===Z.LIVE:s=!Number.isFinite(e.duration)),Jo(e,o)},{once:!0}),i&&i.once(W.Events.LEVEL_LOADED,(d,u)=>{var p;t.streamType&&t.streamType!==Z.UNKNOWN?s=t.streamType===Z.LIVE:s=(p=u.details.live)!=null?p:!1}),!o){let d=n(()=>{!s||Number.isFinite(t.startTime)||(i!=null&&i.liveSyncPosition?e.currentTime=i.liveSyncPosition:Number.isFinite(e.seekable.end(0))&&(e.currentTime=e.seekable.end(0)))},"u");i&&Ee(e,"play",()=>{e.preload==="metadata"?i.once(W.Events.LEVEL_UPDATED,d):d()},{once:!0})}return d=>{r||(o=Ac(d)?d:!!d,Jo(e,o))}},"Re$1"),Jo=n((t,e)=>{if(!e)return;let i=t.muted,a=n(()=>t.muted=i,"n");switch(e){case yl.ANY:t.play().catch(()=>{t.muted=!0,t.play().catch(a)});break;case yl.MUTED:t.muted=!0,t.play().catch(a);break;default:t.play().catch(()=>{});break}},"te$2"),K_=n(({preload:t,src:e},i,a)=>{let r=n(v=>{v!=null&&["","none","metadata","auto"].includes(v)?i.setAttribute("preload",v):i.removeAttribute("preload")},"o");if(!a)return r(t),r;let s=!1,o=!1,l=a.config.maxBufferLength,d=a.config.maxBufferSize,u=n(v=>{r(v);let m=v??i.preload;o||m==="none"||(m==="metadata"?(a.config.maxBufferLength=1,a.config.maxBufferSize=1):(a.config.maxBufferLength=l,a.config.maxBufferSize=d),p())},"u"),p=n(()=>{!s&&e&&(s=!0,a.loadSource(e))},"c");return Ee(i,"play",()=>{o=!0,a.config.maxBufferLength=l,a.config.maxBufferSize=d,p()},{once:!0}),u(t),u},"be");function V_(t,e){var i;if(!("videoTracks"in t))return;let a=new WeakMap;e.on(W.Events.MANIFEST_PARSED,function(d,u){l();let p=t.addVideoTrack("main");p.selected=!0;for(let[v,m]of u.levels.entries()){let h=p.addRendition(m.url[0],m.width,m.height,m.videoCodec,m.bitrate);a.set(m,`${v}`),h.id=`${v}`}}),e.on(W.Events.AUDIO_TRACKS_UPDATED,function(d,u){o();for(let p of u.audioTracks){let v=p.default?"main":"alternative",m=t.addAudioTrack(v,p.name,p.lang);m.id=`${p.id}`,p.default&&(m.enabled=!0)}}),t.audioTracks.addEventListener("change",()=>{var d;let u=+((d=[...t.audioTracks].find(v=>v.enabled))==null?void 0:d.id),p=e.audioTracks.map(v=>v.id);u!=e.audioTrack&&p.includes(u)&&(e.audioTrack=u)}),e.on(W.Events.LEVELS_UPDATED,function(d,u){var p;let v=t.videoTracks[(p=t.videoTracks.selectedIndex)!=null?p:0];if(!v)return;let m=u.levels.map(h=>a.get(h));for(let h of t.videoRenditions)h.id&&!m.includes(h.id)&&v.removeRendition(h)});let r=n(d=>{let u=d.target.selectedIndex;u!=e.nextLevel&&(e.nextLevel=u)},"n");(i=t.videoRenditions)==null||i.addEventListener("change",r);let s=n(()=>{for(let d of t.videoTracks)t.removeVideoTrack(d)},"o"),o=n(()=>{for(let d of t.audioTracks)t.removeAudioTrack(d)},"s"),l=n(()=>{s(),o()},"a");e.once(W.Events.DESTROYING,l)}n(V_,"De");var el=n(t=>"time"in t?t.time:t.startTime,"re$2");function q_(t,e){e.on(W.Events.NON_NATIVE_TEXT_TRACKS_FOUND,(r,{tracks:s})=>{s.forEach(o=>{var l,d;let u=(l=o.subtitleTrack)!=null?l:o.closedCaptions,p=e.subtitleTracks.findIndex(({lang:m,name:h,type:f})=>m==u?.lang&&h===o.label&&f.toLowerCase()===o.kind),v=((d=o._id)!=null?d:o.default)?"default":`${o.kind}${p}`;Hd(t,o.kind,o.label,u?.lang,v,o.default)})});let i=n(()=>{if(!e.subtitleTracks.length)return;let r=Array.from(t.textTracks).find(l=>l.id&&l.mode==="showing"&&["subtitles","captions"].includes(l.kind));if(!r)return;let s=e.subtitleTracks[e.subtitleTrack],o=s?s.default?"default":`${e.subtitleTracks[e.subtitleTrack].type.toLowerCase()}${e.subtitleTrack}`:void 0;if(e.subtitleTrack<0||r?.id!==o){let l=e.subtitleTracks.findIndex(({lang:d,name:u,type:p,default:v})=>r.id==="default"&&v||d==r.language&&u===r.label&&p.toLowerCase()===r.kind);e.subtitleTrack=l}r?.id===o&&r.cues&&Array.from(r.cues).forEach(l=>{r.addCue(l)})},"r");t.textTracks.addEventListener("change",i),e.on(W.Events.CUES_PARSED,(r,{track:s,cues:o})=>{let l=t.textTracks.getTrackById(s);if(!l)return;let d=l.mode==="disabled";d&&(l.mode="hidden"),o.forEach(u=>{var p;(p=l.cues)!=null&&p.getCueById(u.id)||l.addCue(u)}),d&&(l.mode="disabled")}),e.once(W.Events.DESTROYING,()=>{t.textTracks.removeEventListener("change",i),t.querySelectorAll("track[data-removeondestroy]").forEach(r=>{r.remove()})});let a=n(()=>{Array.from(t.textTracks).forEach(r=>{var s,o;if(!["subtitles","caption"].includes(r.kind)&&(r.label==="thumbnails"||r.kind==="chapters")){if(!((s=r.cues)!=null&&s.length)){let l="track";r.kind&&(l+=`[kind="${r.kind}"]`),r.label&&(l+=`[label="${r.label}"]`);let d=t.querySelector(l),u=(o=d?.getAttribute("src"))!=null?o:"";d?.removeAttribute("src"),setTimeout(()=>{d?.setAttribute("src",u)},0)}r.mode!=="hidden"&&(r.mode="hidden")}})},"n");e.once(W.Events.MANIFEST_LOADED,a),e.once(W.Events.MEDIA_ATTACHED,a)}n(q_,"Ce$1");function Hd(t,e,i,a,r,s){let o=document.createElement("track");return o.kind=e,o.label=i,a&&(o.srclang=a),r&&(o.id=r),s&&(o.default=!0),o.track.mode=["subtitles","captions"].includes(e)?"disabled":"hidden",o.setAttribute("data-removeondestroy",""),t.append(o),o.track}n(Hd,"ne$2");function Y_(t,e){let i=Array.prototype.find.call(t.querySelectorAll("track"),a=>a.track===e);i?.remove()}n(Y_,"lt");function bn(t,e,i){var a;return(a=Array.from(t.querySelectorAll("track")).find(r=>r.track.label===e&&r.track.kind===i))==null?void 0:a.track}n(bn,"w$1");async function Sm(t,e,i,a){let r=bn(t,i,a);return r||(r=Hd(t,a,i),r.mode="hidden",await new Promise(s=>setTimeout(()=>s(void 0),0))),r.mode!=="hidden"&&(r.mode="hidden"),[...e].sort((s,o)=>el(o)-el(s)).forEach(s=>{var o,l;let d=s.value,u=el(s);if("endTime"in s&&s.endTime!=null)r?.addCue(new VTTCue(u,s.endTime,a==="chapters"?d:JSON.stringify(d??null)));else{let p=Array.prototype.findIndex.call(r?.cues,f=>f.startTime>=u),v=(o=r?.cues)==null?void 0:o[p],m=v?v.startTime:Number.isFinite(t.duration)?t.duration:Number.MAX_SAFE_INTEGER,h=(l=r?.cues)==null?void 0:l[p-1];h&&(h.endTime=u),r?.addCue(new VTTCue(u,m,a==="chapters"?d:JSON.stringify(d??null)))}}),t.textTracks.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),r}n(Sm,"ve$1");var Bd="cuepoints",wm=Object.freeze({label:Bd});async function Im(t,e,i=wm){return Sm(t,e,i.label,"metadata")}n(Im,"_e$1");var Al=n(t=>({time:t.startTime,value:JSON.parse(t.text)}),"$");function G_(t,e={label:Bd}){let i=bn(t,e.label,"metadata");return i!=null&&i.cues?Array.from(i.cues,a=>Al(a)):[]}n(G_,"pt$1");function Rm(t,e={label:Bd}){var i,a;let r=bn(t,e.label,"metadata");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return Al(r.activeCues[0]);let{currentTime:s}=t,o=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:l,endTime:d})=>l<=s&&d>s);return Al(o||r.activeCues[0])}n(Rm,"ke$1");async function Q_(t,e=wm){return new Promise(i=>{Ee(t,"loadstart",async()=>{let a=await Im(t,[],e);Ee(t,"cuechange",()=>{let r=Rm(t);if(r){let s=new CustomEvent("cuepointchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(s)}},{},a),i(a)})})}n(Q_,"he$1");var Wd="chapters",Cm=Object.freeze({label:Wd}),kl=n(t=>({startTime:t.startTime,endTime:t.endTime,value:t.text}),"B$2");async function Dm(t,e,i=Cm){return Sm(t,e,i.label,"chapters")}n(Dm,"Ne$1");function Z_(t,e={label:Wd}){var i;let a=bn(t,e.label,"chapters");return(i=a?.cues)!=null&&i.length?Array.from(a.cues,r=>kl(r)):[]}n(Z_,"ft");function Lm(t,e={label:Wd}){var i,a;let r=bn(t,e.label,"chapters");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return kl(r.activeCues[0]);let{currentTime:s}=t,o=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:l,endTime:d})=>l<=s&&d>s);return kl(o||r.activeCues[0])}n(Lm,"Ie");async function z_(t,e=Cm){return new Promise(i=>{Ee(t,"loadstart",async()=>{let a=await Dm(t,[],e);Ee(t,"cuechange",()=>{let r=Lm(t);if(r){let s=new CustomEvent("chapterchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(s)}},{},a),i(a)})})}n(z_,"Ae$1");function j_(t,e){if(e){let i=e.playingDate;if(i!=null)return new Date(i.getTime()-t.currentTime*1e3)}return typeof t.getStartDate=="function"?t.getStartDate():new Date(NaN)}n(j_,"Tt$1");function X_(t,e){if(e&&e.playingDate)return e.playingDate;if(typeof t.getStartDate=="function"){let i=t.getStartDate();return new Date(i.getTime()+t.currentTime*1e3)}return new Date(NaN)}n(X_,"yt");var Yr={VIDEO:"v",THUMBNAIL:"t",STORYBOARD:"s",DRM:"d"},J_=n(t=>{if(t===ie.VIDEO)return Yr.VIDEO;if(t===ie.DRM)return Yr.DRM},"mt$1"),eb=n((t,e)=>{var i,a;let r=Ro(t),s=`${r}Token`;return(i=e.tokens)!=null&&i[r]?(a=e.tokens)==null?void 0:a[r]:$d(s,e)?e[s]:void 0},"Et$1"),to=n((t,e,i,a,r=!1,s=!(o=>(o=globalThis.navigator)==null?void 0:o.onLine)())=>{var o,l;if(s){let T=M("Your device appears to be offline",r),A,b=C.MEDIA_ERR_NETWORK,S=new C(T,b,!1,A);return S.errorCategory=e,S.muxCode=O.NETWORK_OFFLINE,S.data=t,S}let d="status"in t?t.status:t.code,u=Date.now(),p=C.MEDIA_ERR_NETWORK;if(d===200)return;let v=Ro(e),m=eb(e,i),h=J_(e),[f]=Ud((o=i.playbackId)!=null?o:"");if(!d||!f)return;let _=Ka(m);if(m&&!_){let T=M("The {tokenNamePrefix}-token provided is invalid or malformed.",r).format({tokenNamePrefix:v}),A=M("Compact JWT string: {token}",r).format({token:m}),b=new C(T,p,!0,A);return b.errorCategory=e,b.muxCode=O.NETWORK_TOKEN_MALFORMED,b.data=t,b}if(d>=500){let T=new C("",p,a??!0);return T.errorCategory=e,T.muxCode=O.NETWORK_UNKNOWN_ERROR,T}if(d===403)if(_){if(P_(_,u)){let T={timeStyle:"medium",dateStyle:"medium"},A=M("The video’s secured {tokenNamePrefix}-token has expired.",r).format({tokenNamePrefix:v}),b=M("Expired at: {expiredDate}. Current time: {currentDate}.",r).format({expiredDate:new Intl.DateTimeFormat("en",T).format((l=_.exp)!=null?l:0*1e3),currentDate:new Intl.DateTimeFormat("en",T).format(u)}),S=new C(A,p,!0,b);return S.errorCategory=e,S.muxCode=O.NETWORK_TOKEN_EXPIRED,S.data=t,S}if($_(_,f)){let T=M("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",r).format({tokenNamePrefix:v}),A=M("Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}",r).format({tokenNamePrefix:v,playbackId:f,tokenPlaybackId:_.sub}),b=new C(T,p,!0,A);return b.errorCategory=e,b.muxCode=O.NETWORK_TOKEN_SUB_MISMATCH,b.data=t,b}if(U_(_)){let T=M("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:v}),A=M("The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.",r).format({tokenNamePrefix:v,expectedAud:h}),b=new C(T,p,!0,A);return b.errorCategory=e,b.muxCode=O.NETWORK_TOKEN_AUD_MISSING,b.data=t,b}if(H_(_,h)){let T=M("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:v}),A=M("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.",r).format({tokenNamePrefix:v,expectedAud:h,aud:_.aud}),b=new C(T,p,!0,A);return b.errorCategory=e,b.muxCode=O.NETWORK_TOKEN_AUD_MISMATCH,b.data=t,b}}else{let T=M("Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.",r).format({tokenNamePrefix:v,category:e}),A=M("Specified playback ID: {playbackId}",r).format({playbackId:f}),b=new C(T,p,a??!0,A);return b.errorCategory=e,b.muxCode=O.NETWORK_TOKEN_MISSING,b.data=t,b}if(d===412){let T=M("This playback-id may belong to a live stream that is not currently active or an asset that is not ready.",r),A=M("Specified playback ID: {playbackId}",r).format({playbackId:f}),b=new C(T,p,a??!0,A);return b.errorCategory=e,b.muxCode=O.NETWORK_NOT_READY,b.streamType=i.streamType===Z.LIVE?"live":i.streamType===Z.ON_DEMAND?"on-demand":"unknown",b.data=t,b}if(d===404){let T=M("This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.",r),A=M("Specified playback ID: {playbackId}",r).format({playbackId:f}),b=new C(T,p,a??!0,A);return b.errorCategory=e,b.muxCode=O.NETWORK_NOT_FOUND,b.data=t,b}if(d===400){let T=M("The URL or playback-id was invalid. You may have used an invalid value as a playback-id."),A=M("Specified playback ID: {playbackId}",r).format({playbackId:f}),b=new C(T,p,a??!0,A);return b.errorCategory=e,b.muxCode=O.NETWORK_INVALID_URL,b.data=t,b}let g=new C("",p,a??!0);return g.errorCategory=e,g.muxCode=O.NETWORK_UNKNOWN_ERROR,g.data=t,g},"H$1"),kc=W.DefaultConfig.capLevelController,Mm=class xm extends kc{static{n(this,"j")}constructor(e){super(e)}get levels(){var e;return(e=this.hls.levels)!=null?e:[]}getValidLevels(e){return this.levels.filter((i,a)=>this.isLevelAllowed(i)&&a<=e)}getMaxLevel(e){let i=super.getMaxLevel(e),a=this.getValidLevels(e);if(!a[i])return i;let r=Math.min(a[i].width,a[i].height),s=xm.minMaxResolution;return r>=s?i:kc.getMaxLevelByMediaSize(a,s*(16/9),s)}};Mm.minMaxResolution=720;var tb=Mm,ib=tb,Kn={FAIRPLAY:"fairplay",PLAYREADY:"playready",WIDEVINE:"widevine"},ab=n(t=>{if(t.includes("fps"))return Kn.FAIRPLAY;if(t.includes("playready"))return Kn.PLAYREADY;if(t.includes("widevine"))return Kn.WIDEVINE},"gt$1"),rb=n(t=>{let e=t.split(`
`).find((i,a,r)=>a&&r[a-1].startsWith("#EXT-X-STREAM-INF"));return fetch(e).then(i=>i.status!==200?Promise.reject(i):i.text())},"Mt$1"),nb=n(t=>{let e=t.split(`
`).filter(a=>a.startsWith("#EXT-X-SESSION-DATA"));if(!e.length)return{};let i={};for(let a of e){let r=ob(a),s=r["DATA-ID"];s&&(i[s]={...r})}return{sessionData:i}},"xt$1"),sb=/([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g;function ob(t){let e=[...t.matchAll(sb)];return Object.fromEntries(e.map(([,i,a])=>[i,a]))}n(ob,"bt$1");var lb=n(t=>{var e,i,a;let r=t.split(`
`),s=(i=((e=r.find(u=>u.startsWith("#EXT-X-PLAYLIST-TYPE")))!=null?e:"").split(":")[1])==null?void 0:i.trim(),o=Tm(s),l=Am(s),d;if(o===Z.LIVE){let u=r.find(p=>p.startsWith("#EXT-X-PART-INF"));if(u)d=+u.split(":")[1].split("=")[1]*2;else{let p=r.find(m=>m.startsWith("#EXT-X-TARGETDURATION")),v=(a=p?.split(":"))==null?void 0:a[1];d=+(v??6)*3}}return{streamType:o,targetLiveWindow:l,liveEdgeStartOffset:d}},"Dt$1"),db=n(async(t,e)=>{if(e===ii.MP4)return{streamType:Z.ON_DEMAND,targetLiveWindow:Number.NaN,liveEdgeStartOffset:void 0,sessionData:void 0};if(e===ii.M3U8){let i=await fetch(t);if(!i.ok)return Promise.reject(i);let a=await i.text(),r=await rb(a);return{...nb(a),...lb(r)}}return console.error(`Media type ${e} is an unrecognized or unsupported type for src ${t}.`),{streamType:void 0,targetLiveWindow:void 0,liveEdgeStartOffset:void 0,sessionData:void 0}},"Ct$1"),ub=n(async(t,e,i=Co({src:t}))=>{var a,r,s,o;let{streamType:l,targetLiveWindow:d,liveEdgeStartOffset:u,sessionData:p}=await db(t,i),v=p?.["com.apple.hls.chapters"];(v!=null&&v.URI||v!=null&&v.VALUE.toLocaleLowerCase().startsWith("http"))&&Fd((a=v.URI)!=null?a:v.VALUE,e),((r=ue.get(e))!=null?r:{}).liveEdgeStartOffset=u,((s=ue.get(e))!=null?s:{}).targetLiveWindow=d,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((o=ue.get(e))!=null?o:{}).streamType=l,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},"vt$1"),Fd=n(async(t,e)=>{var i,a;try{let r=await fetch(t);if(!r.ok)throw new Error(`Failed to fetch Mux metadata: ${r.status} ${r.statusText}`);let s=await r.json(),o={};if(!((i=s?.[0])!=null&&i.metadata))return;for(let d of s[0].metadata)d.key&&d.value&&(o[d.key]=d.value);((a=ue.get(e))!=null?a:{}).metadata=o;let l=new CustomEvent("muxmetadata");e.dispatchEvent(l)}catch(r){console.error(r)}},"de$2"),cb=n(t=>{var e;let i=t.type,a=Tm(i),r=Am(i),s,o=!!((e=t.partList)!=null&&e.length);return a===Z.LIVE&&(s=o?t.partTarget*2:t.targetduration*3),{streamType:a,targetLiveWindow:r,liveEdgeStartOffset:s,lowLatency:o}},"Pt$1"),hb=n((t,e,i)=>{var a,r,s,o,l,d,u,p;let{streamType:v,targetLiveWindow:m,liveEdgeStartOffset:h,lowLatency:f}=cb(t);if(v===Z.LIVE){f?(i.config.backBufferLength=(a=i.userConfig.backBufferLength)!=null?a:4,i.config.maxFragLookUpTolerance=(r=i.userConfig.maxFragLookUpTolerance)!=null?r:.001,i.config.abrBandWidthUpFactor=(s=i.userConfig.abrBandWidthUpFactor)!=null?s:i.config.abrBandWidthFactor):i.config.backBufferLength=(o=i.userConfig.backBufferLength)!=null?o:8;let _=Object.freeze({get length(){return e.seekable.length},start(g){return e.seekable.start(g)},end(g){var T;return g>this.length||g<0||Number.isFinite(e.duration)?e.seekable.end(g):(T=i.liveSyncPosition)!=null?T:e.seekable.end(g)}});((l=ue.get(e))!=null?l:{}).seekable=_}((d=ue.get(e))!=null?d:{}).liveEdgeStartOffset=h,((u=ue.get(e))!=null?u:{}).targetLiveWindow=m,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((p=ue.get(e))!=null?p:{}).streamType=v,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},"_t"),Sc,wc,mb=(wc=(Sc=globalThis?.navigator)==null?void 0:Sc.userAgent)!=null?wc:"",Ic,Rc,Cc,pb=(Cc=(Rc=(Ic=globalThis?.navigator)==null?void 0:Ic.userAgentData)==null?void 0:Rc.platform)!=null?Cc:"",Dc,Lc,Mc,vb=(Mc=(Lc=(Dc=globalThis?.navigator)==null?void 0:Dc.userAgentData)==null?void 0:Lc.brands)!=null?Mc:[],fb=mb.toLowerCase().includes("android")||["x11","android"].some(t=>pb.toLowerCase().includes(t)),xc=vb.find(t=>t.brand==="Google Chrome"),Eb=n(t=>{var e;return xc&&parseInt((e=xc.version)!=null?e:"0")>=141&&!!t.canPlayType("application/vnd.apple.mpegurl")},"It$1"),ue=new WeakMap,ai="mux.com",Oc,Nc,Om=(Nc=(Oc=W).isSupported)==null?void 0:Nc.call(Oc),_b=n(t=>fb||Eb(t),"At$1"),Kd=n(()=>Pd.utils.now(),"Gr"),bb=Pd.utils.generateUUID,Sl=n(({playbackId:t,customDomain:e=ai,maxResolution:i,minResolution:a,renditionOrder:r,programStartTime:s,programEndTime:o,assetStartTime:l,assetEndTime:d,playbackToken:u,tokens:{playback:p=u}={},extraSourceParams:v={}}={})=>{if(!t)return;let[m,h=""]=Ud(t),f=new URL(`https://stream.${e}/${m}.m3u8${h}`);return p||f.searchParams.has("token")?(f.searchParams.forEach((_,g)=>{g!="token"&&f.searchParams.delete(g)}),p&&f.searchParams.set("token",p)):(i&&f.searchParams.set("max_resolution",i),a&&(f.searchParams.set("min_resolution",a),i&&+i.slice(0,-1)<+a.slice(0,-1)&&console.error("minResolution must be <= maxResolution","minResolution",a,"maxResolution",i)),r&&f.searchParams.set("rendition_order",r),s&&f.searchParams.set("program_start_time",`${s}`),o&&f.searchParams.set("program_end_time",`${o}`),l&&f.searchParams.set("asset_start_time",`${l}`),d&&f.searchParams.set("asset_end_time",`${d}`),Object.entries(v).forEach(([_,g])=>{g!=null&&f.searchParams.set(_,g)})),f.toString()},"qr"),Do=n(t=>{if(!t)return;let[e]=t.split("?");return e||void 0},"q$1"),Vd=n(t=>{if(!t||!t.startsWith("https://stream."))return;let[e]=new URL(t).pathname.slice(1).split(/\.m3u8|\//);return e||void 0},"qe"),gb=n(t=>{var e,i,a;return(e=t?.metadata)!=null&&e.video_id?t.metadata.video_id:Fm(t)&&(a=(i=Do(t.playbackId))!=null?i:Vd(t.src))!=null?a:t.src},"wt$1"),Nm=n(t=>{var e;return(e=ue.get(t))==null?void 0:e.error},"Ot$1"),yb=n(t=>{var e;return(e=ue.get(t))==null?void 0:e.metadata},"Xr"),wl=n(t=>{var e,i;return(i=(e=ue.get(t))==null?void 0:e.streamType)!=null?i:Z.UNKNOWN},"Ue"),Tb=n(t=>{var e,i;return(i=(e=ue.get(t))==null?void 0:e.targetLiveWindow)!=null?i:Number.NaN},"zr"),qd=n(t=>{var e,i;return(i=(e=ue.get(t))==null?void 0:e.seekable)!=null?i:t.seekable},"Xe"),Ab=n(t=>{var e;let i=(e=ue.get(t))==null?void 0:e.liveEdgeStartOffset;if(typeof i!="number")return Number.NaN;let a=qd(t);return a.length?a.end(a.length-1)-i:Number.NaN},"Qr"),Yd=.034,kb=n((t,e,i=Yd)=>Math.abs(t-e)<=i,"Ut$1"),Pm=n((t,e,i=Yd)=>t>e||kb(t,e,i),"ze$1"),Sb=n((t,e=Yd)=>t.paused&&Pm(t.currentTime,t.duration,e),"Ht$1"),$m=n((t,e)=>{var i,a,r;if(!e||!t.buffered.length)return;if(t.readyState>2)return!1;let s=e.currentLevel>=0?(a=(i=e.levels)==null?void 0:i[e.currentLevel])==null?void 0:a.details:(r=e.levels.find(v=>!!v.details))==null?void 0:r.details;if(!s||s.live)return;let{fragments:o}=s;if(!(o!=null&&o.length))return;if(t.currentTime<t.duration-(s.targetduration+.5))return!1;let l=o[o.length-1];if(t.currentTime<=l.start)return!1;let d=l.start+l.duration/2,u=t.buffered.start(t.buffered.length-1),p=t.buffered.end(t.buffered.length-1);return d>u&&d<p},"Qe"),Um=n((t,e)=>t.ended||t.loop?t.ended:e&&$m(t,e)?!0:Sb(t),"Vt$1"),wb=n((t,e,i)=>{Hm(e,i,t);let{metadata:a={}}=t,{view_session_id:r=bb()}=a,s=gb(t);a.view_session_id=r,a.video_id=s,t.metadata=a;let o=n(p=>{var v;(v=e.mux)==null||v.emit("hb",{view_drm_type:p})},"a");t.drmTypeCb=o,ue.set(e,{retryCount:0});let l=Ib(t,e),d=K_(t,e,l);t!=null&&t.muxDataKeepSession&&e!=null&&e.mux&&!e.mux.deleted?l&&e.mux.addHLSJS({hlsjs:l,Hls:l?W:void 0}):xb(t,e,l),Ob(t,e,l),Q_(e),z_(e);let u=F_(t,e,l);return{engine:l,setAutoplay:u,setPreload:d}},"Zr"),Hm=n((t,e,i)=>{let a=e?.engine;t!=null&&t.mux&&!t.mux.deleted&&(i!=null&&i.muxDataKeepSession?a&&t.mux.removeHLSJS():(t.mux.destroy(),delete t.mux)),a&&(a.detachMedia(),a.destroy()),t&&(t.hasAttribute("src")&&(t.removeAttribute("src"),t.load()),t.removeEventListener("error",Vm),t.removeEventListener("error",Il),t.removeEventListener("durationchange",Km),ue.delete(t),t.dispatchEvent(new Event("teardown")))},"Kt$1");function Bm(t,e){var i;let a=Co(t);if(a!==ii.M3U8)return!0;let r=!a||((i=e.canPlayType(a))!=null?i:!0),{preferPlayback:s}=t,o=s===Ft.MSE,l=s===Ft.NATIVE,d=Om&&(o||_b(e));return r&&(l||!d)}n(Bm,"Ze");var Ib=n((t,e)=>{let{debug:i,streamType:a,startTime:r=-1,metadata:s,preferCmcd:o,_hlsConfig:l={}}=t,d=Co(t)===ii.M3U8,u=Bm(t,e);if(d&&!u&&Om){let p={backBufferLength:30,renderTextTracksNatively:!1,liveDurationInfinity:!0,capLevelToPlayerSize:!0,capLevelOnFPSDrop:!0},v=Rb(a),m=Cb(t),h=[kr.QUERY,kr.HEADER].includes(o)?{useHeaders:o===kr.HEADER,sessionId:s?.view_session_id,contentId:s?.video_id}:void 0,f=l.capLevelToPlayerSize==null?{capLevelController:ib}:{},_=new W({debug:i,startPosition:r,cmcd:h,xhrSetup:n((g,T)=>{var A,b;if(o&&o!==kr.QUERY)return;let S=new URL(T);if(!S.searchParams.has("CMCD"))return;let L=((b=(A=S.searchParams.get("CMCD"))==null?void 0:A.split(","))!=null?b:[]).filter(N=>N.startsWith("sid")||N.startsWith("cid")).join(",");S.searchParams.set("CMCD",L),g.open("GET",S)},"xhrSetup"),...f,...p,...v,...m,...l});return _.on(W.Events.MANIFEST_PARSED,async function(g,T){var A,b;let S=(A=T.sessionData)==null?void 0:A["com.apple.hls.chapters"];(S!=null&&S.URI||S!=null&&S.VALUE.toLocaleLowerCase().startsWith("http"))&&Fd((b=S?.URI)!=null?b:S?.VALUE,e)}),_}},"Wt$1"),Rb=n(t=>t===Z.LIVE?{backBufferLength:8}:{},"Yt$1"),Cb=n(t=>{let{tokens:{drm:e}={},playbackId:i,drmTypeCb:a}=t,r=Do(i);return!e||!r?{}:{emeEnabled:!0,drmSystems:{"com.apple.fps":{licenseUrl:Vn(t,"fairplay"),serverCertificateUrl:Wm(t,"fairplay")},"com.widevine.alpha":{licenseUrl:Vn(t,"widevine")},"com.microsoft.playready":{licenseUrl:Vn(t,"playready")}},requestMediaKeySystemAccessFunc:n((s,o)=>(s==="com.widevine.alpha"&&(o=[...o.map(l=>{var d;let u=(d=l.videoCapabilities)==null?void 0:d.map(p=>({...p,robustness:"HW_SECURE_ALL"}));return{...l,videoCapabilities:u}}),...o]),navigator.requestMediaKeySystemAccess(s,o).then(l=>{let d=ab(s);return a?.(d),l})),"requestMediaKeySystemAccessFunc")}},"Ft"),Db=n(async t=>{let e=await fetch(t);return e.status!==200?Promise.reject(e):await e.arrayBuffer()},"$t$1"),Lb=n(async(t,e)=>{let i=await fetch(e,{method:"POST",headers:{"Content-type":"application/octet-stream"},body:t});if(i.status!==200)return Promise.reject(i);let a=await i.arrayBuffer();return new Uint8Array(a)},"Bt$1"),Mb=n((t,e)=>{Ee(e,"encrypted",async i=>{try{let a=i.initDataType;if(a!=="skd"){console.error(`Received unexpected initialization data type "${a}"`);return}if(!e.mediaKeys){let d=await navigator.requestMediaKeySystemAccess("com.apple.fps",[{initDataTypes:[a],videoCapabilities:[{contentType:"application/vnd.apple.mpegurl",robustness:""}],distinctiveIdentifier:"not-allowed",persistentState:"not-allowed",sessionTypes:["temporary"]}]).then(p=>{var v;return(v=t.drmTypeCb)==null||v.call(t,Kn.FAIRPLAY),p}).catch(()=>{let p=M("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),v=new C(p,C.MEDIA_ERR_ENCRYPTED,!0);v.errorCategory=ie.DRM,v.muxCode=O.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,st(e,v)});if(!d)return;let u=await d.createMediaKeys();try{let p=await Db(Wm(t,"fairplay")).catch(v=>{if(v instanceof Response){let m=to(v,ie.DRM,t);return console.error("mediaError",m?.message,m?.context),m?Promise.reject(m):Promise.reject(new Error("Unexpected error in app cert request"))}return Promise.reject(v)});await u.setServerCertificate(p).catch(()=>{let v=M("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."),m=new C(v,C.MEDIA_ERR_ENCRYPTED,!0);return m.errorCategory=ie.DRM,m.muxCode=O.ENCRYPTED_UPDATE_SERVER_CERT_FAILED,Promise.reject(m)})}catch(p){st(e,p);return}await e.setMediaKeys(u)}let r=i.initData;if(r==null){console.error(`Could not start encrypted playback due to missing initData in ${i.type} event`);return}let s=e.mediaKeys.createSession();s.addEventListener("keystatuseschange",()=>{s.keyStatuses.forEach(d=>{let u;if(d==="internal-error"){let p=M("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");u=new C(p,C.MEDIA_ERR_ENCRYPTED,!0),u.errorCategory=ie.DRM,u.muxCode=O.ENCRYPTED_CDM_ERROR}else if(d==="output-restricted"||d==="output-downscaled"){let p=M("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");u=new C(p,C.MEDIA_ERR_ENCRYPTED,!1),u.errorCategory=ie.DRM,u.muxCode=O.ENCRYPTED_OUTPUT_RESTRICTED}u&&st(e,u)})});let o=await Promise.all([s.generateRequest(a,r).catch(()=>{let d=M("Failed to generate a DRM license request. This may be an issue with the player or your protected content."),u=new C(d,C.MEDIA_ERR_ENCRYPTED,!0);u.errorCategory=ie.DRM,u.muxCode=O.ENCRYPTED_GENERATE_REQUEST_FAILED,st(e,u)}),new Promise(d=>{s.addEventListener("message",u=>{d(u.message)},{once:!0})})]).then(([,d])=>d),l=await Lb(o,Vn(t,"fairplay")).catch(d=>{if(d instanceof Response){let u=to(d,ie.DRM,t);return console.error("mediaError",u?.message,u?.context),u?Promise.reject(u):Promise.reject(new Error("Unexpected error in license key request"))}return Promise.reject(d)});await s.update(l).catch(()=>{let d=M("Failed to update DRM license. This may be an issue with the player or your protected content."),u=new C(d,C.MEDIA_ERR_ENCRYPTED,!0);return u.errorCategory=ie.DRM,u.muxCode=O.ENCRYPTED_UPDATE_LICENSE_FAILED,Promise.reject(u)})}catch(a){st(e,a);return}})},"jt"),Vn=n(({playbackId:t,tokens:{drm:e}={},customDomain:i=ai},a)=>{let r=Do(t);return`https://license.${i.toLocaleLowerCase().endsWith(ai)?i:ai}/license/${a}/${r}?token=${e}`},"G$1"),Wm=n(({playbackId:t,tokens:{drm:e}={},customDomain:i=ai},a)=>{let r=Do(t);return`https://license.${i.toLocaleLowerCase().endsWith(ai)?i:ai}/appcert/${a}/${r}?token=${e}`},"et$1"),Fm=n(({playbackId:t,src:e,customDomain:i})=>{if(t)return!0;if(typeof e!="string")return!1;let a=window?.location.href,r=new URL(e,a).hostname.toLocaleLowerCase();return r.includes(ai)||!!i&&r.includes(i.toLocaleLowerCase())},"tt$1"),xb=n((t,e,i)=>{var a;let{envKey:r,disableTracking:s,muxDataSDK:o=Pd,muxDataSDKOptions:l={}}=t,d=Fm(t);if(!s&&(r||d)){let{playerInitTime:u,playerSoftwareName:p,playerSoftwareVersion:v,beaconCollectionDomain:m,debug:h,disableCookies:f}=t,_={...t.metadata,video_title:((a=t?.metadata)==null?void 0:a.video_title)||void 0},g=n(T=>typeof T.player_error_code=="string"?!1:typeof t.errorTranslator=="function"?t.errorTranslator(T):T,"M");o.monitor(e,{debug:h,beaconCollectionDomain:m,hlsjs:i,Hls:i?W:void 0,automaticErrorTracking:!1,errorTranslator:g,disableCookies:f,...l,data:{...r?{env_key:r}:{},player_software_name:p,player_software:p,player_software_version:v,player_init_time:u,..._}})}},"Jt$1"),Ob=n((t,e,i)=>{var a,r;let s=Bm(t,e),{src:o,customDomain:l=ai}=t,d=n(()=>{e.ended||t.disablePseudoEnded||!Um(e,i)||($m(e,i)?e.currentTime=e.buffered.end(e.buffered.length-1):e.dispatchEvent(new Event("ended")))},"a"),u,p,v=n(()=>{let m=qd(e),h,f;m.length>0&&(h=m.start(0),f=m.end(0)),(p!==f||u!==h)&&e.dispatchEvent(new CustomEvent("seekablechange",{composed:!0})),u=h,p=f},"u");if(Ee(e,"durationchange",v),e&&s){let m=Co(t);if(typeof o=="string"){if(o.endsWith(".mp4")&&o.includes(l)){let _=Vd(o),g=new URL(`https://stream.${l}/${_}/metadata.json`);Fd(g.toString(),e)}let h=n(()=>{if(wl(e)!==Z.LIVE||Number.isFinite(e.duration))return;let _=setInterval(v,1e3);e.addEventListener("teardown",()=>{clearInterval(_)},{once:!0}),Ee(e,"durationchange",()=>{Number.isFinite(e.duration)&&clearInterval(_)})},"T"),f=n(async()=>ub(o,e,m).then(h).catch(_=>{if(_ instanceof Response){let g=to(_,ie.VIDEO,t);if(g){st(e,g);return}}}),"m");if(e.preload==="none"){let _=n(()=>{f(),e.removeEventListener("loadedmetadata",g)},"R"),g=n(()=>{f(),e.removeEventListener("play",_)},"M");Ee(e,"play",_,{once:!0}),Ee(e,"loadedmetadata",g,{once:!0})}else f();(a=t.tokens)!=null&&a.drm?Mb(t,e):Ee(e,"encrypted",()=>{let _=M("Attempting to play DRM-protected content without providing a DRM token."),g=new C(_,C.MEDIA_ERR_ENCRYPTED,!0);g.errorCategory=ie.DRM,g.muxCode=O.ENCRYPTED_MISSING_TOKEN,st(e,g)},{once:!0}),e.setAttribute("src",o),t.startTime&&(((r=ue.get(e))!=null?r:{}).startTime=t.startTime,e.addEventListener("durationchange",Km,{once:!0}))}else e.removeAttribute("src");e.addEventListener("error",Vm),e.addEventListener("error",Il),e.addEventListener("emptied",()=>{e.querySelectorAll("track[data-removeondestroy]").forEach(h=>{h.remove()})},{once:!0}),Ee(e,"pause",d),Ee(e,"seeked",d),Ee(e,"play",()=>{e.ended||Pm(e.currentTime,e.duration)&&(e.currentTime=e.seekable.length?e.seekable.start(0):0)})}else i&&o?(i.once(W.Events.LEVEL_LOADED,(m,h)=>{hb(h.details,e,i),v(),wl(e)===Z.LIVE&&!Number.isFinite(e.duration)&&(i.on(W.Events.LEVEL_UPDATED,v),Ee(e,"durationchange",()=>{Number.isFinite(e.duration)&&i.off(W.Events.LEVELS_UPDATED,v)}))}),i.on(W.Events.ERROR,(m,h)=>{var f,_;let g=Nb(h,t);if(g.muxCode===O.NETWORK_NOT_READY){let T=(f=ue.get(e))!=null?f:{},A=(_=T.retryCount)!=null?_:0;if(A<6){let b=A===0?5e3:6e4,S=new C(`Retrying in ${b/1e3} seconds...`,g.code,g.fatal);Object.assign(S,g),st(e,S),setTimeout(()=>{T.retryCount=A+1,h.details==="manifestLoadError"&&h.url&&i.loadSource(h.url)},b);return}else{T.retryCount=0;let b=new C('Try again later or <a href="#" onclick="window.location.reload(); return false;" style="color: #4a90e2;">click here to retry</a>',g.code,g.fatal);Object.assign(b,g),st(e,b);return}}st(e,g)}),i.on(W.Events.MANIFEST_LOADED,()=>{let m=ue.get(e);m&&m.error&&(m.error=null,m.retryCount=0,e.dispatchEvent(new Event("emptied")),e.dispatchEvent(new Event("loadstart")))}),e.addEventListener("error",Il),Ee(e,"waiting",d),V_(t,i),q_(e,i),i.attachMedia(e)):console.error("It looks like the video you're trying to play will not work on this system! If possible, try upgrading to the newest versions of your browser or software.")},"Gt");function Km(t){var e;let i=t.target,a=(e=ue.get(i))==null?void 0:e.startTime;if(a&&M_(i.seekable,i.duration,a)){let r=i.preload==="auto";r&&(i.preload="none"),i.currentTime=a,r&&(i.preload="auto")}}n(Km,"rt$1");async function Vm(t){if(!t.isTrusted)return;t.stopImmediatePropagation();let e=t.target;if(!(e!=null&&e.error))return;let{message:i,code:a}=e.error,r=new C(i,a);if(e.src&&a===C.MEDIA_ERR_SRC_NOT_SUPPORTED&&e.readyState===HTMLMediaElement.HAVE_NOTHING){setTimeout(()=>{var s;let o=(s=Nm(e))!=null?s:e.error;o?.code===C.MEDIA_ERR_SRC_NOT_SUPPORTED&&st(e,r)},500);return}if(e.src&&(a!==C.MEDIA_ERR_DECODE||a!==void 0))try{let{status:s}=await fetch(e.src);r.data={response:{code:s}}}catch{}st(e,r)}n(Vm,"nt$1");function st(t,e){var i;e.fatal&&(((i=ue.get(t))!=null?i:{}).error=e,t.dispatchEvent(new CustomEvent("error",{detail:e})))}n(st,"N$2");function Il(t){var e,i;if(!(t instanceof CustomEvent)||!(t.detail instanceof C))return;let a=t.target,r=t.detail;!r||!r.fatal||(((e=ue.get(a))!=null?e:{}).error=r,(i=a.mux)==null||i.emit("error",{player_error_code:r.code,player_error_message:r.message,player_error_context:r.context}))}n(Il,"ce");var Nb=n((t,e)=>{var i,a,r;t.fatal?console.error("getErrorFromHlsErrorData()",t):e.debug&&console.warn("getErrorFromHlsErrorData() (non-fatal)",t);let s={[W.ErrorTypes.NETWORK_ERROR]:C.MEDIA_ERR_NETWORK,[W.ErrorTypes.MEDIA_ERROR]:C.MEDIA_ERR_DECODE,[W.ErrorTypes.KEY_SYSTEM_ERROR]:C.MEDIA_ERR_ENCRYPTED},o=n(p=>[W.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,W.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED].includes(p.details)?C.MEDIA_ERR_NETWORK:s[p.type],"o"),l=n(p=>{if(p.type===W.ErrorTypes.KEY_SYSTEM_ERROR)return ie.DRM;if(p.type===W.ErrorTypes.NETWORK_ERROR)return ie.VIDEO},"s"),d,u=o(t);if(u===C.MEDIA_ERR_NETWORK&&t.response){let p=(i=l(t))!=null?i:ie.VIDEO;d=(a=to(t.response,p,e,t.fatal))!=null?a:new C("",u,t.fatal)}else if(u===C.MEDIA_ERR_ENCRYPTED)if(t.details===W.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE){let p=M("Attempting to play DRM-protected content without providing a DRM token.");d=new C(p,C.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ie.DRM,d.muxCode=O.ENCRYPTED_MISSING_TOKEN}else if(t.details===W.ErrorDetails.KEY_SYSTEM_NO_ACCESS){let p=M("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.");d=new C(p,C.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ie.DRM,d.muxCode=O.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM}else if(t.details===W.ErrorDetails.KEY_SYSTEM_NO_SESSION){let p=M("Failed to generate a DRM license request. This may be an issue with the player or your protected content.");d=new C(p,C.MEDIA_ERR_ENCRYPTED,!0),d.errorCategory=ie.DRM,d.muxCode=O.ENCRYPTED_GENERATE_REQUEST_FAILED}else if(t.details===W.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED){let p=M("Failed to update DRM license. This may be an issue with the player or your protected content.");d=new C(p,C.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ie.DRM,d.muxCode=O.ENCRYPTED_UPDATE_LICENSE_FAILED}else if(t.details===W.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED){let p=M("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.");d=new C(p,C.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ie.DRM,d.muxCode=O.ENCRYPTED_UPDATE_SERVER_CERT_FAILED}else if(t.details===W.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR){let p=M("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");d=new C(p,C.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ie.DRM,d.muxCode=O.ENCRYPTED_CDM_ERROR}else if(t.details===W.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED){let p=M("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");d=new C(p,C.MEDIA_ERR_ENCRYPTED,!1),d.errorCategory=ie.DRM,d.muxCode=O.ENCRYPTED_OUTPUT_RESTRICTED}else d=new C(t.error.message,C.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ie.DRM,d.muxCode=O.ENCRYPTED_ERROR;else d=new C("",u,t.fatal);return d.context||(d.context=`${t.url?`url: ${t.url}
`:""}${t.response&&(t.response.code||t.response.text)?`response: ${t.response.code}, ${t.response.text}
`:""}${t.reason?`failure reason: ${t.reason}
`:""}${t.level?`level: ${t.level}
`:""}${t.parent?`parent stream controller: ${t.parent}
`:""}${t.buffer?`buffer length: ${t.buffer}
`:""}${t.error?`error: ${t.error}
`:""}${t.event?`event: ${t.event}
`:""}${t.err?`error message: ${(r=t.err)==null?void 0:r.message}
`:""}`),d.data=t,d},"qt$1"),qm=n(t=>{throw TypeError(t)},"C$1"),Gd=n((t,e,i)=>e.has(t)||qm("Cannot "+i),"N$1"),Me=n((t,e,i)=>(Gd(t,e,"read from private field"),i?i.call(t):e.get(t)),"n$1"),ct=n((t,e,i)=>e.has(t)?qm("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"d$1"),at=n((t,e,i,a)=>(Gd(t,e,"write to private field"),e.set(t,i),i),"o$2"),kn=n((t,e,i)=>(Gd(t,e,"access private method"),i),"b$2"),Pb=n(()=>{try{return"0.28.2"}catch{}return"UNKNOWN"},"B$1"),$b=Pb(),Ub=n(()=>$b,"P$2"),Hb=`
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`,y={BEACON_COLLECTION_DOMAIN:"beacon-collection-domain",CUSTOM_DOMAIN:"custom-domain",DEBUG:"debug",DISABLE_TRACKING:"disable-tracking",DISABLE_COOKIES:"disable-cookies",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended",DRM_TOKEN:"drm-token",PLAYBACK_TOKEN:"playback-token",ENV_KEY:"env-key",MAX_RESOLUTION:"max-resolution",MIN_RESOLUTION:"min-resolution",RENDITION_ORDER:"rendition-order",PROGRAM_START_TIME:"program-start-time",PROGRAM_END_TIME:"program-end-time",ASSET_START_TIME:"asset-start-time",ASSET_END_TIME:"asset-end-time",METADATA_URL:"metadata-url",PLAYBACK_ID:"playback-id",PLAYER_SOFTWARE_NAME:"player-software-name",PLAYER_SOFTWARE_VERSION:"player-software-version",PLAYER_INIT_TIME:"player-init-time",PREFER_CMCD:"prefer-cmcd",PREFER_PLAYBACK:"prefer-playback",START_TIME:"start-time",STREAM_TYPE:"stream-type",TARGET_LIVE_WINDOW:"target-live-window",LIVE_EDGE_OFFSET:"live-edge-offset",TYPE:"type",LOGO:"logo"},Bb=Object.values(y),Pc=Ub(),$c="mux-video",Rt,Sr,qn,wr,Yn,Gn,Qn,Zn,zn,Ir,fa,Rr,Wb=class extends Tn{static{n(this,"K")}constructor(){super(),ct(this,fa),ct(this,Rt),ct(this,Sr),ct(this,qn),ct(this,wr,{}),ct(this,Yn,{}),ct(this,Gn),ct(this,Qn),ct(this,Zn),ct(this,zn),ct(this,Ir,""),at(this,qn,Kd()),this.nativeEl.addEventListener("muxmetadata",e=>{var i;let a=yb(this.nativeEl),r=(i=this.metadata)!=null?i:{};this.metadata={...a,...r},a?.["com.mux.video.branding"]==="mux-free-plan"&&(at(this,Ir,"default"),this.updateLogo())})}static get NAME(){return $c}static get VERSION(){return Pc}static get observedAttributes(){var e;return[...Bb,...(e=Tn.observedAttributes)!=null?e:[]]}static getLogoHTML(e){return!e||e==="false"?"":e==="default"?Hb:`<img part="logo" src="${e}" />`}static getTemplateHTML(e={}){var i;return`
      ${Tn.getTemplateHTML(e)}
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
        ${this.getLogoHTML((i=e[y.LOGO])!=null?i:"")}
      </slot>
    `}get preferCmcd(){var e;return(e=this.getAttribute(y.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?eo.includes(e)?this.setAttribute(y.PREFER_CMCD,e):console.warn(`Invalid value for preferCmcd. Must be one of ${eo.join()}`):this.removeAttribute(y.PREFER_CMCD))}get playerInitTime(){return this.hasAttribute(y.PLAYER_INIT_TIME)?+this.getAttribute(y.PLAYER_INIT_TIME):Me(this,qn)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(y.PLAYER_INIT_TIME):this.setAttribute(y.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=Me(this,Zn))!=null?e:$c}set playerSoftwareName(e){at(this,Zn,e)}get playerSoftwareVersion(){var e;return(e=Me(this,Qn))!=null?e:Pc}set playerSoftwareVersion(e){at(this,Qn,e)}get _hls(){var e;return(e=Me(this,Rt))==null?void 0:e.engine}get mux(){var e;return(e=this.nativeEl)==null?void 0:e.mux}get error(){var e;return(e=Nm(this.nativeEl))!=null?e:null}get errorTranslator(){return Me(this,zn)}set errorTranslator(e){at(this,zn,e)}get src(){return this.getAttribute("src")}set src(e){e!==this.src&&(e==null?this.removeAttribute("src"):this.setAttribute("src",e))}get type(){var e;return(e=this.getAttribute(y.TYPE))!=null?e:void 0}set type(e){e!==this.type&&(e?this.setAttribute(y.TYPE,e):this.removeAttribute(y.TYPE))}get preload(){let e=this.getAttribute("preload");return e===""?"auto":["none","metadata","auto"].includes(e)?e:super.preload}set preload(e){e!=this.getAttribute("preload")&&(["","none","metadata","auto"].includes(e)?this.setAttribute("preload",e):this.removeAttribute("preload"))}get debug(){return this.getAttribute(y.DEBUG)!=null}set debug(e){e!==this.debug&&(e?this.setAttribute(y.DEBUG,""):this.removeAttribute(y.DEBUG))}get disableTracking(){return this.hasAttribute(y.DISABLE_TRACKING)}set disableTracking(e){e!==this.disableTracking&&this.toggleAttribute(y.DISABLE_TRACKING,!!e)}get disableCookies(){return this.hasAttribute(y.DISABLE_COOKIES)}set disableCookies(e){e!==this.disableCookies&&(e?this.setAttribute(y.DISABLE_COOKIES,""):this.removeAttribute(y.DISABLE_COOKIES))}get disablePseudoEnded(){return this.hasAttribute(y.DISABLE_PSEUDO_ENDED)}set disablePseudoEnded(e){e!==this.disablePseudoEnded&&(e?this.setAttribute(y.DISABLE_PSEUDO_ENDED,""):this.removeAttribute(y.DISABLE_PSEUDO_ENDED))}get startTime(){let e=this.getAttribute(y.START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set startTime(e){e!==this.startTime&&(e==null?this.removeAttribute(y.START_TIME):this.setAttribute(y.START_TIME,`${e}`))}get playbackId(){var e;return this.hasAttribute(y.PLAYBACK_ID)?this.getAttribute(y.PLAYBACK_ID):(e=Vd(this.src))!=null?e:void 0}set playbackId(e){e!==this.playbackId&&(e?this.setAttribute(y.PLAYBACK_ID,e):this.removeAttribute(y.PLAYBACK_ID))}get maxResolution(){var e;return(e=this.getAttribute(y.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(y.MAX_RESOLUTION,e):this.removeAttribute(y.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(y.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(y.MIN_RESOLUTION,e):this.removeAttribute(y.MIN_RESOLUTION))}get renditionOrder(){var e;return(e=this.getAttribute(y.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(y.RENDITION_ORDER,e):this.removeAttribute(y.RENDITION_ORDER))}get programStartTime(){let e=this.getAttribute(y.PROGRAM_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programStartTime(e){e==null?this.removeAttribute(y.PROGRAM_START_TIME):this.setAttribute(y.PROGRAM_START_TIME,`${e}`)}get programEndTime(){let e=this.getAttribute(y.PROGRAM_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programEndTime(e){e==null?this.removeAttribute(y.PROGRAM_END_TIME):this.setAttribute(y.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){let e=this.getAttribute(y.ASSET_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetStartTime(e){e==null?this.removeAttribute(y.ASSET_START_TIME):this.setAttribute(y.ASSET_START_TIME,`${e}`)}get assetEndTime(){let e=this.getAttribute(y.ASSET_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetEndTime(e){e==null?this.removeAttribute(y.ASSET_END_TIME):this.setAttribute(y.ASSET_END_TIME,`${e}`)}get customDomain(){var e;return(e=this.getAttribute(y.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(y.CUSTOM_DOMAIN,e):this.removeAttribute(y.CUSTOM_DOMAIN))}get drmToken(){var e;return(e=this.getAttribute(y.DRM_TOKEN))!=null?e:void 0}set drmToken(e){e!==this.drmToken&&(e?this.setAttribute(y.DRM_TOKEN,e):this.removeAttribute(y.DRM_TOKEN))}get playbackToken(){var e,i,a,r;if(this.hasAttribute(y.PLAYBACK_TOKEN))return(e=this.getAttribute(y.PLAYBACK_TOKEN))!=null?e:void 0;if(this.hasAttribute(y.PLAYBACK_ID)){let[,s]=Ud((i=this.playbackId)!=null?i:"");return(a=new URLSearchParams(s).get("token"))!=null?a:void 0}if(this.src)return(r=new URLSearchParams(this.src).get("token"))!=null?r:void 0}set playbackToken(e){e!==this.playbackToken&&(e?this.setAttribute(y.PLAYBACK_TOKEN,e):this.removeAttribute(y.PLAYBACK_TOKEN))}get tokens(){let e=this.getAttribute(y.PLAYBACK_TOKEN),i=this.getAttribute(y.DRM_TOKEN);return{...Me(this,Yn),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{}}}set tokens(e){at(this,Yn,e??{})}get ended(){return Um(this.nativeEl,this._hls)}get envKey(){var e;return(e=this.getAttribute(y.ENV_KEY))!=null?e:void 0}set envKey(e){e!==this.envKey&&(e?this.setAttribute(y.ENV_KEY,e):this.removeAttribute(y.ENV_KEY))}get beaconCollectionDomain(){var e;return(e=this.getAttribute(y.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(y.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(y.BEACON_COLLECTION_DOMAIN))}get streamType(){var e;return(e=this.getAttribute(y.STREAM_TYPE))!=null?e:wl(this.nativeEl)}set streamType(e){e!==this.streamType&&(e?this.setAttribute(y.STREAM_TYPE,e):this.removeAttribute(y.STREAM_TYPE))}get targetLiveWindow(){return this.hasAttribute(y.TARGET_LIVE_WINDOW)?+this.getAttribute(y.TARGET_LIVE_WINDOW):Tb(this.nativeEl)}set targetLiveWindow(e){e!=this.targetLiveWindow&&(e==null?this.removeAttribute(y.TARGET_LIVE_WINDOW):this.setAttribute(y.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e,i;if(this.hasAttribute(y.LIVE_EDGE_OFFSET)){let{liveEdgeOffset:a}=this,r=(e=this.nativeEl.seekable.end(0))!=null?e:0,s=(i=this.nativeEl.seekable.start(0))!=null?i:0;return Math.max(s,r-a)}return Ab(this.nativeEl)}get liveEdgeOffset(){if(this.hasAttribute(y.LIVE_EDGE_OFFSET))return+this.getAttribute(y.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){e!=this.liveEdgeOffset&&(e==null?this.removeAttribute(y.LIVE_EDGE_OFFSET):this.setAttribute(y.LIVE_EDGE_OFFSET,`${+e}`))}get seekable(){return qd(this.nativeEl)}async addCuePoints(e){return Im(this.nativeEl,e)}get activeCuePoint(){return Rm(this.nativeEl)}get cuePoints(){return G_(this.nativeEl)}async addChapters(e){return Dm(this.nativeEl,e)}get activeChapter(){return Lm(this.nativeEl)}get chapters(){return Z_(this.nativeEl)}getStartDate(){return j_(this.nativeEl,this._hls)}get currentPdt(){return X_(this.nativeEl,this._hls)}get preferPlayback(){let e=this.getAttribute(y.PREFER_PLAYBACK);if(e===Ft.MSE||e===Ft.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===Ft.MSE||e===Ft.NATIVE?this.setAttribute(y.PREFER_PLAYBACK,e):this.removeAttribute(y.PREFER_PLAYBACK))}get metadata(){return{...this.getAttributeNames().filter(e=>e.startsWith("metadata-")&&![y.METADATA_URL].includes(e)).reduce((e,i)=>{let a=this.getAttribute(i);return a!=null&&(e[i.replace(/^metadata-/,"").replace(/-/g,"_")]=a),e},{}),...Me(this,wr)}}set metadata(e){at(this,wr,e??{}),this.mux&&this.mux.emit("hb",Me(this,wr))}get _hlsConfig(){return Me(this,Gn)}set _hlsConfig(e){at(this,Gn,e)}get logo(){var e;return(e=this.getAttribute(y.LOGO))!=null?e:Me(this,Ir)}set logo(e){e?this.setAttribute(y.LOGO,e):this.removeAttribute(y.LOGO)}load(){at(this,Rt,wb(this,this.nativeEl,Me(this,Rt)))}unload(){Hm(this.nativeEl,Me(this,Rt),this),at(this,Rt,void 0)}attributeChangedCallback(e,i,a){var r,s;switch(Tn.observedAttributes.includes(e)&&!["src","autoplay","preload"].includes(e)&&super.attributeChangedCallback(e,i,a),e){case y.PLAYER_SOFTWARE_NAME:this.playerSoftwareName=a??void 0;break;case y.PLAYER_SOFTWARE_VERSION:this.playerSoftwareVersion=a??void 0;break;case"src":{let o=!!i,l=!!a;!o&&l?kn(this,fa,Rr).call(this):o&&!l?this.unload():o&&l&&(this.unload(),kn(this,fa,Rr).call(this));break}case"autoplay":if(a===i)break;(r=Me(this,Rt))==null||r.setAutoplay(this.autoplay);break;case"preload":if(a===i)break;(s=Me(this,Rt))==null||s.setPreload(a);break;case y.PLAYBACK_ID:this.src=Sl(this);break;case y.DEBUG:{let o=this.debug;this.mux&&console.info("Cannot toggle debug mode of mux data after initialization. Make sure you set all metadata to override before setting the src."),this._hls&&(this._hls.config.debug=o);break}case y.METADATA_URL:a&&fetch(a).then(o=>o.json()).then(o=>this.metadata=o).catch(()=>console.error(`Unable to load or parse metadata JSON from metadata-url ${a}!`));break;case y.STREAM_TYPE:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}));break;case y.TARGET_LIVE_WINDOW:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0,detail:this.targetLiveWindow}));break;case y.LOGO:(a==null||a!==i)&&this.updateLogo();break;case y.DISABLE_TRACKING:{if(a==null||a!==i){let o=this.currentTime,l=this.paused;this.unload(),kn(this,fa,Rr).call(this).then(()=>{this.currentTime=o,l||this.play()})}break}case y.DISABLE_COOKIES:{(a==null||a!==i)&&this.disableCookies&&document.cookie.split(";").forEach(o=>{o.trim().startsWith("muxData")&&(document.cookie=o.replace(/^ +/,"").replace(/=.*/,"=;expires="+new Date().toUTCString()+";path=/"))});break}}}updateLogo(){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelector('slot[name="logo"]');if(!e)return;let i=this.constructor.getLogoHTML(Me(this,Ir)||this.logo);e.innerHTML=i}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.nativeEl&&this.src&&!Me(this,Rt)&&kn(this,fa,Rr).call(this)}disconnectedCallback(){this.unload()}handleEvent(e){e.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(e.type,{composed:!0,detail:e.detail}))}};Rt=new WeakMap,Sr=new WeakMap,qn=new WeakMap,wr=new WeakMap,Yn=new WeakMap,Gn=new WeakMap,Qn=new WeakMap,Zn=new WeakMap,zn=new WeakMap,Ir=new WeakMap,fa=new WeakSet,Rr=n(async function(){Me(this,Sr)||(await at(this,Sr,Promise.resolve()),at(this,Sr,null),this.load())},"T$1");const zi=new WeakMap;class tl extends Error{static{n(this,"InvalidStateError")}}class Fb extends Error{static{n(this,"NotSupportedError")}}const Kb=["application/x-mpegURL","application/vnd.apple.mpegurl","audio/mpegurl"],Vb=globalThis.WeakRef?class extends Set{add(t){super.add(new WeakRef(t))}forEach(t){super.forEach(e=>{const i=e.deref();i&&t(i)})}}:Set;function qb(t){globalThis.chrome?.cast?.isAvailable?globalThis.cast?.framework?t():customElements.whenDefined("google-cast-button").then(t):globalThis.__onGCastApiAvailable=()=>{customElements.whenDefined("google-cast-button").then(t)}}n(qb,"onCastApiAvailable");function Yb(){return globalThis.chrome}n(Yb,"requiresCastFramework");function Gb(){const t="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";if(globalThis.chrome?.cast||document.querySelector(`script[src="${t}"]`))return;const e=document.createElement("script");e.src=t,document.head.append(e)}n(Gb,"loadCastFramework");function Ai(){return globalThis.cast?.framework?.CastContext.getInstance()}n(Ai,"castContext");function Qd(){return Ai()?.getCurrentSession()}n(Qd,"currentSession");function Zd(){return Qd()?.getSessionObj().media[0]}n(Zd,"currentMedia");function Qb(t){return new Promise((e,i)=>{Zd().editTracksInfo(t,e,i)})}n(Qb,"editTracksInfo");function Zb(t){return new Promise((e,i)=>{Zd().getStatus(t,e,i)})}n(Zb,"getMediaStatus");function Uc(t){return Ai().setOptions({...Ym(),...t})}n(Uc,"setCastOptions");function Ym(){return{receiverApplicationId:"CC1AD845",autoJoinPolicy:"origin_scoped",androidReceiverCompatible:!1,language:"en-US",resumeSavedSession:!0}}n(Ym,"getDefaultCastOptions");function zb(t){if(!t)return;const e=/\.([a-zA-Z0-9]+)(?:\?.*)?$/,i=t.match(e);return i?i[1]:null}n(zb,"getFormat");function jb(t){const e=t.split(`
`),i=[];for(let a=0;a<e.length;a++)if(e[a].trim().startsWith("#EXT-X-STREAM-INF")){const s=e[a+1]?e[a+1].trim():"";s&&!s.startsWith("#")&&i.push(s)}return i}n(jb,"parsePlaylistUrls");function Xb(t){return t.split(`
`).find(a=>!a.trim().startsWith("#")&&a.trim()!=="")}n(Xb,"parseSegment");async function Jb(t){try{const i=(await fetch(t,{method:"HEAD"})).headers.get("Content-Type");return Kb.some(a=>i===a)}catch(e){return console.error("Error while trying to get the Content-Type of the manifest",e),!1}}n(Jb,"isHls");async function eg(t){try{const e=await(await fetch(t)).text();let i=e;const a=jb(e);if(a.length>0){const o=new URL(a[0],t).toString();i=await(await fetch(o)).text()}const r=Xb(i);return zb(r)}catch(e){console.error("Error while trying to parse the manifest playlist",e);return}}n(eg,"getPlaylistSegmentFormat");const jn=new Vb,li=new WeakSet;let Ae;qb(()=>{if(!globalThis.chrome?.cast?.isAvailable){console.debug("chrome.cast.isAvailable",globalThis.chrome?.cast?.isAvailable);return}Ae||(Ae=cast.framework,Ai().addEventListener(Ae.CastContextEventType.CAST_STATE_CHANGED,t=>{jn.forEach(e=>zi.get(e).onCastStateChanged?.(t))}),Ai().addEventListener(Ae.CastContextEventType.SESSION_STATE_CHANGED,t=>{jn.forEach(e=>zi.get(e).onSessionStateChanged?.(t))}),jn.forEach(t=>zi.get(t).init?.()))});let Hc=0;class tg extends EventTarget{static{n(this,"RemotePlayback")}#t;#s;#i;#a;#e="disconnected";#r=!1;#o=new Set;#c=new WeakMap;constructor(e){super(),this.#t=e,jn.add(this),zi.set(this,{init:n(()=>this.#d(),"init"),onCastStateChanged:n(()=>this.#l(),"onCastStateChanged"),onSessionStateChanged:n(()=>this.#p(),"onSessionStateChanged"),getCastPlayer:n(()=>this.#n,"getCastPlayer")}),this.#d()}get#n(){if(li.has(this.#t))return this.#i}get state(){return this.#e}async watchAvailability(e){if(this.#t.disableRemotePlayback)throw new tl("disableRemotePlayback attribute is present.");return this.#c.set(e,++Hc),this.#o.add(e),queueMicrotask(()=>e(this.#m())),Hc}async cancelWatchAvailability(e){if(this.#t.disableRemotePlayback)throw new tl("disableRemotePlayback attribute is present.");e?this.#o.delete(e):this.#o.clear()}async prompt(){if(this.#t.disableRemotePlayback)throw new tl("disableRemotePlayback attribute is present.");if(!globalThis.chrome?.cast?.isAvailable)throw new Fb("The RemotePlayback API is disabled on this platform.");const e=li.has(this.#t);li.add(this.#t),Uc(this.#t.castOptions),Object.entries(this.#a).forEach(([i,a])=>{this.#i.controller.addEventListener(i,a)});try{await Ai().requestSession()}catch(i){if(e||li.delete(this.#t),i==="cancel")return;throw new Error(i)}zi.get(this.#t)?.loadOnPrompt?.()}#h(){li.has(this.#t)&&(Object.entries(this.#a).forEach(([e,i])=>{this.#i.controller.removeEventListener(e,i)}),li.delete(this.#t),this.#t.muted=this.#i.isMuted,this.#t.currentTime=this.#i.savedPlayerState.currentTime,this.#i.savedPlayerState.isPaused===!1&&this.#t.play())}#m(){const e=Ai()?.getCastState();return e&&e!=="NO_DEVICES_AVAILABLE"}#l(){const e=Ai().getCastState();if(li.has(this.#t)&&e==="CONNECTING"&&(this.#e="connecting",this.dispatchEvent(new Event("connecting"))),!this.#r&&e?.includes("CONNECT")){this.#r=!0;for(let i of this.#o)i(!0)}else if(this.#r&&(!e||e==="NO_DEVICES_AVAILABLE")){this.#r=!1;for(let i of this.#o)i(!1)}}async#p(){const{SESSION_RESUMED:e}=Ae.SessionState;if(Ai().getSessionState()===e&&this.#t.castSrc===Zd()?.media.contentId){li.add(this.#t),Object.entries(this.#a).forEach(([i,a])=>{this.#i.controller.addEventListener(i,a)});try{await Zb(new chrome.cast.media.GetStatusRequest)}catch(i){console.error(i)}this.#a[Ae.RemotePlayerEventType.IS_PAUSED_CHANGED](),this.#a[Ae.RemotePlayerEventType.PLAYER_STATE_CHANGED]()}}#d(){!Ae||this.#s||(this.#s=!0,Uc(this.#t.castOptions),this.#t.textTracks.addEventListener("change",()=>this.#u()),this.#l(),this.#i=new Ae.RemotePlayer,new Ae.RemotePlayerController(this.#i),this.#a={[Ae.RemotePlayerEventType.IS_CONNECTED_CHANGED]:({value:e})=>{e===!0?(this.#e="connected",this.dispatchEvent(new Event("connect"))):(this.#h(),this.#e="disconnected",this.dispatchEvent(new Event("disconnect")))},[Ae.RemotePlayerEventType.DURATION_CHANGED]:()=>{this.#t.dispatchEvent(new Event("durationchange"))},[Ae.RemotePlayerEventType.VOLUME_LEVEL_CHANGED]:()=>{this.#t.dispatchEvent(new Event("volumechange"))},[Ae.RemotePlayerEventType.IS_MUTED_CHANGED]:()=>{this.#t.dispatchEvent(new Event("volumechange"))},[Ae.RemotePlayerEventType.CURRENT_TIME_CHANGED]:()=>{this.#n?.isMediaLoaded&&this.#t.dispatchEvent(new Event("timeupdate"))},[Ae.RemotePlayerEventType.VIDEO_INFO_CHANGED]:()=>{this.#t.dispatchEvent(new Event("resize"))},[Ae.RemotePlayerEventType.IS_PAUSED_CHANGED]:()=>{this.#t.dispatchEvent(new Event(this.paused?"pause":"play"))},[Ae.RemotePlayerEventType.PLAYER_STATE_CHANGED]:()=>{this.#n?.playerState!==chrome.cast.media.PlayerState.PAUSED&&this.#t.dispatchEvent(new Event({[chrome.cast.media.PlayerState.PLAYING]:"playing",[chrome.cast.media.PlayerState.BUFFERING]:"waiting",[chrome.cast.media.PlayerState.IDLE]:"emptied"}[this.#n?.playerState]))},[Ae.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED]:async()=>{this.#n?.isMediaLoaded&&(await Promise.resolve(),this.#v())}})}#v(){this.#u()}async#u(){if(!this.#n)return;const i=(this.#i.mediaInfo?.tracks??[]).filter(({type:v})=>v===chrome.cast.media.TrackType.TEXT),a=[...this.#t.textTracks].filter(({kind:v})=>v==="subtitles"||v==="captions"),r=i.map(({language:v,name:m,trackId:h})=>{const{mode:f}=a.find(_=>_.language===v&&_.label===m)??{};return f?{mode:f,trackId:h}:!1}).filter(Boolean),o=r.filter(({mode:v})=>v!=="showing").map(({trackId:v})=>v),l=r.find(({mode:v})=>v==="showing"),d=Qd()?.getSessionObj().media[0]?.activeTrackIds??[];let u=d;if(d.length&&(u=u.filter(v=>!o.includes(v))),l?.trackId&&(u=[...u,l.trackId]),u=[...new Set(u)],!n((v,m)=>v.length===m.length&&v.every(h=>m.includes(h)),"arrayEquals")(d,u))try{const v=new chrome.cast.media.EditTracksInfoRequest(u);await Qb(v)}catch(v){console.error(v)}}}const ig=n(t=>class extends t{static{n(this,"CastableMedia")}static observedAttributes=[...t.observedAttributes??[],"cast-src","cast-content-type","cast-stream-type","cast-receiver"];#t={paused:!1};#s=Ym();#i;#a;get remote(){return this.#a?this.#a:Yb()?(this.disableRemotePlayback||Gb(),zi.set(this,{loadOnPrompt:n(()=>this.#r(),"loadOnPrompt")}),this.#a=new tg(this)):super.remote}get#e(){return zi.get(this.remote)?.getCastPlayer?.()}attributeChangedCallback(i,a,r){if(super.attributeChangedCallback(i,a,r),i==="cast-receiver"&&r){this.#s.receiverApplicationId=r;return}if(this.#e)switch(i){case"cast-stream-type":case"cast-src":this.load();break}}async#r(){this.#t.paused=super.paused,super.pause(),this.muted=super.muted;try{await this.load()}catch(i){console.error(i)}}async load(){if(!this.#e)return super.load();const i=new chrome.cast.media.MediaInfo(this.castSrc,this.castContentType);i.customData=this.castCustomData;const a=[...this.querySelectorAll("track")].filter(({kind:l,src:d})=>d&&(l==="subtitles"||l==="captions")),r=[];let s=0;if(a.length&&(i.tracks=a.map(l=>{const d=++s;r.length===0&&l.track.mode==="showing"&&r.push(d);const u=new chrome.cast.media.Track(d,chrome.cast.media.TrackType.TEXT);return u.trackContentId=l.src,u.trackContentType="text/vtt",u.subtype=l.kind==="captions"?chrome.cast.media.TextTrackType.CAPTIONS:chrome.cast.media.TextTrackType.SUBTITLES,u.name=l.label,u.language=l.srclang,u})),this.castStreamType==="live"?i.streamType=chrome.cast.media.StreamType.LIVE:i.streamType=chrome.cast.media.StreamType.BUFFERED,i.metadata=new chrome.cast.media.GenericMediaMetadata,i.metadata.title=this.title,i.metadata.images=[{url:this.poster}],Jb(this.castSrc)){const l=await eg(this.castSrc);l?.includes("m4s")||l?.includes("mp4")?(i.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.FMP4,i.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.FMP4):l?.includes("ts")&&(i.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.TS,i.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.TS)}const o=new chrome.cast.media.LoadRequest(i);o.currentTime=super.currentTime??0,o.autoplay=!this.#t.paused,o.activeTrackIds=r,await Qd()?.loadMedia(o),this.dispatchEvent(new Event("volumechange"))}play(){if(this.#e){this.#e.isPaused&&this.#e.controller?.playOrPause();return}return super.play()}pause(){if(this.#e){this.#e.isPaused||this.#e.controller?.playOrPause();return}super.pause()}get castOptions(){return this.#s}get castReceiver(){return this.getAttribute("cast-receiver")??void 0}set castReceiver(i){this.castReceiver!=i&&this.setAttribute("cast-receiver",`${i}`)}get castSrc(){return this.getAttribute("cast-src")??this.querySelector("source")?.src??this.currentSrc}set castSrc(i){this.castSrc!=i&&this.setAttribute("cast-src",`${i}`)}get castContentType(){return this.getAttribute("cast-content-type")??void 0}set castContentType(i){this.setAttribute("cast-content-type",`${i}`)}get castStreamType(){return this.getAttribute("cast-stream-type")??this.streamType??void 0}set castStreamType(i){this.setAttribute("cast-stream-type",`${i}`)}get castCustomData(){return this.#i}set castCustomData(i){const a=typeof i;if(!["object","undefined"].includes(a)){console.error(`castCustomData must be nullish or an object but value was of type ${a}`);return}this.#i=i}get readyState(){if(this.#e)switch(this.#e.playerState){case chrome.cast.media.PlayerState.IDLE:return 0;case chrome.cast.media.PlayerState.BUFFERING:return 2;default:return 3}return super.readyState}get paused(){return this.#e?this.#e.isPaused:super.paused}get muted(){return this.#e?this.#e?.isMuted:super.muted}set muted(i){if(this.#e){(i&&!this.#e.isMuted||!i&&this.#e.isMuted)&&this.#e.controller?.muteOrUnmute();return}super.muted=i}get volume(){return this.#e?this.#e?.volumeLevel??1:super.volume}set volume(i){if(this.#e){this.#e.volumeLevel=+i,this.#e.controller?.setVolumeLevel();return}super.volume=i}get duration(){return this.#e&&this.#e?.isMediaLoaded?this.#e?.duration??NaN:super.duration}get currentTime(){return this.#e&&this.#e?.isMediaLoaded?this.#e?.currentTime??0:super.currentTime}set currentTime(i){if(this.#e){this.#e.currentTime=i,this.#e.controller?.seek();return}super.currentTime=i}},"CastableMediaMixin");var Gm=n(t=>{throw TypeError(t)},"f$1"),Qm=n((t,e,i)=>e.has(t)||Gm("Cannot "+i),"g$2"),ag=n((t,e,i)=>(Qm(t,e,"read from private field"),i?i.call(t):e.get(t)),"u$2"),rg=n((t,e,i)=>e.has(t)?Gm("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"m$1"),ng=n((t,e,i,a)=>(Qm(t,e,"write to private field"),e.set(t,i),i),"d"),Zm=class{static{n(this,"s")}addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}};if(typeof DocumentFragment>"u"){class t extends Zm{static{n(this,"e")}}globalThis.DocumentFragment=t}var sg=class extends Zm{static{n(this,"n")}},og={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(sg)}},lg={customElements:og},dg=typeof window>"u"||typeof globalThis.customElements>"u",il=dg?lg:globalThis,Xn,Bc=class extends ig(pf(Wb)){static{n(this,"i")}constructor(){super(...arguments),rg(this,Xn)}get autoplay(){let t=this.getAttribute("autoplay");return t===null?!1:t===""?!0:t}set autoplay(t){let e=this.autoplay;t!==e&&(t?this.setAttribute("autoplay",typeof t=="string"?t:""):this.removeAttribute("autoplay"))}get muxCastCustomData(){return{mux:{playbackId:this.playbackId,minResolution:this.minResolution,maxResolution:this.maxResolution,renditionOrder:this.renditionOrder,customDomain:this.customDomain,tokens:{drm:this.drmToken},envKey:this.envKey,metadata:this.metadata,disableCookies:this.disableCookies,disableTracking:this.disableTracking,beaconCollectionDomain:this.beaconCollectionDomain,startTime:this.startTime,preferCmcd:this.preferCmcd}}}get castCustomData(){var t;return(t=ag(this,Xn))!=null?t:this.muxCastCustomData}set castCustomData(t){ng(this,Xn,t)}};Xn=new WeakMap;il.customElements.get("mux-video")||(il.customElements.define("mux-video",Bc),il.MuxVideoElement=Bc);const R={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},Y={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},zm={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},jm=Object.entries(zm),c=jm.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),ug={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},ni=jm.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...ug});Object.entries(ni).reduce((t,[e,i])=>{const a=c[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const cg=Object.entries(c).reduce((t,[e,i])=>{const a=ni[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),qt={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},Va={DISABLED:"disabled",SHOWING:"showing"},al={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},Ge={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},Jt={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},hg={FULLSCREEN:"fullscreen"};function mg(t){return t?.map(vg).join(" ")}n(mg,"stringifyRenditionList");function pg(t){return t?.split(/\s+/).map(fg)}n(pg,"parseRenditionList");function vg(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}n(vg,"stringifyRendition");function fg(t){if(t){const[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}n(fg,"parseRendition");function Eg(t){return t?.map(bg).join(" ")}n(Eg,"stringifyAudioTrackList");function _g(t){return t?.split(/\s+/).map(gg)}n(_g,"parseAudioTrackList");function bg(t){if(t){const{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(s=>s!=null).join(":")}}n(bg,"stringifyAudioTrack");function gg(t){if(t){const[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}n(gg,"parseAudioTrack");function yg(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}n(yg,"camelCase");function zd(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}n(zd,"isValidNumber");function Xm(t){return typeof t!="string"?!1:!isNaN(t)&&!isNaN(parseFloat(t))}n(Xm,"isNumericString");const Jm=n(t=>new Promise(e=>setTimeout(e,t)),"delay"),Wc=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],Tg=n((t,e)=>{const i=t===1?Wc[e].singular:Wc[e].plural;return`${t} ${i}`},"toTimeUnitPhrase"),Gr=n(t=>{if(!zd(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0);return`${[a.getHours(),a.getMinutes(),a.getSeconds()].map((l,d)=>l&&Tg(l,d)).filter(l=>l).join(", ")}${i?" remaining":""}`},"formatAsTimePhrase");function Si(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),s=Math.floor(t/3600);const o=Math.floor(e/60%60),l=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(s=r=a="0"),s=s>0||l>0?s+":":"",r=((s||o>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+s+r+a}n(Si,"formatTime");const Ag={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."};var Fc;const rl={en:Ag};let Rl=((Fc=globalThis.navigator)==null?void 0:Fc.language)||"en";const kg=n(t=>{Rl=t},"setLanguage"),Sg=n(t=>{var e,i,a;const[r]=Rl.split("-");return((e=rl[Rl])==null?void 0:e[t])||((i=rl[r])==null?void 0:i[t])||((a=rl.en)==null?void 0:a[t])||t},"resolveTranslation"),D=n((t,e={})=>Sg(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),"t");let ep=class{static{n(this,"EventTarget")}addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}};class tp extends ep{static{n(this,"Node")}}let Kc=class extends tp{static{n(this,"Element")}constructor(){super(...arguments),this.role=null}};class wg{static{n(this,"ResizeObserver")}observe(){}unobserve(){}disconnect(){}}const ip={createElement:n(function(){return new nn.HTMLElement},"createElement"),createElementNS:n(function(){return new nn.HTMLElement},"createElementNS"),addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}},nn={ResizeObserver:wg,document:ip,Node:tp,Element:Kc,HTMLElement:class extends Kc{static{n(this,"HTMLElement")}constructor(){super(...arguments),this.innerHTML=""}get content(){return new nn.DocumentFragment}},DocumentFragment:class extends ep{static{n(this,"DocumentFragment")}},customElements:{get:n(function(){},"get"),define:n(function(){},"define"),whenDefined:n(function(){},"whenDefined")},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:n(function(){},"CustomEvent"),getComputedStyle:n(function(){},"getComputedStyle"),navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:class{static{n(this,"DOMParser")}parseFromString(e,i){return{body:{textContent:e}}}}},ap="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",rp=Object.keys(nn).every(t=>t in globalThis),E=ap&&!rp?nn:globalThis,ye=ap&&!rp?ip:globalThis.document,Vc=new WeakMap,jd=n(t=>{let e=Vc.get(t);return e||Vc.set(t,e=new Set),e},"getCallbacks"),np=new E.ResizeObserver(t=>{for(const e of t)for(const i of jd(e.target))i(e)});function Ja(t,e){jd(t).add(e),np.observe(t)}n(Ja,"observeResize");function er(t,e){const i=jd(t);i.delete(e),i.size||np.unobserve(t)}n(er,"unobserveResize");function Je(t){const e={};for(const i of t)e[i.name]=i.value;return e}n(Je,"namedNodeMapToObject");function Be(t){var e;return(e=Cl(t))!=null?e:nr(t,"media-controller")}n(Be,"getMediaController");function Cl(t){var e;const{MEDIA_CONTROLLER:i}=Y,a=t.getAttribute(i);if(a)return(e=Lo(t))==null?void 0:e.getElementById(a)}n(Cl,"getAttributeMediaController");const sp=n((t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},"updateIconText"),Ig=n((t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},"getAllSlotted"),op=n((t,e)=>Ig(t,e)[0],"getSlotted"),oi=n((t,e)=>!t||!e?!1:t?.contains(e)?!0:oi(t,e.getRootNode().host),"containsComposedNode"),nr=n((t,e)=>{if(!t)return null;const i=t.closest(e);return i||nr(t.getRootNode().host,e)},"closestComposedNode");function Xd(t=document){var e;const i=t?.activeElement;return i?(e=Xd(i.shadowRoot))!=null?e:i:null}n(Xd,"getActiveElement");function Lo(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}n(Lo,"getDocumentOrShadowRoot");function lp(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){const s=getComputedStyle(r);if(i&&s.opacity==="0"||a&&s.visibility==="hidden"||s.display==="none")return!1;r=r.parentElement,e--}return!0}n(lp,"isElementVisible");function Rg(t,e,i,a){const r=a.x-i.x,s=a.y-i.y,o=r*r+s*s;if(o===0)return 0;const l=((t-i.x)*r+(e-i.y)*s)/o;return Math.max(0,Math.min(1,l))}n(Rg,"getPointProgressOnLine");function ke(t,e){const i=Cg(t,a=>a===e);return i||Jd(t,e)}n(ke,"getOrInsertCSSRule");function Cg(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let s;try{s=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(const o of s??[])if(e(o.selectorText))return o}}n(Cg,"getCSSRule");function Jd(t,e){var i,a;const r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],s=r?.[r.length-1];return s?.sheet?(s?.sheet.insertRule(`${e}{}`,s.sheet.cssRules.length),(a=s.sheet.cssRules)==null?void 0:a[s.sheet.cssRules.length-1]):(console.warn("Media Chrome: No style sheet found on style tag of",t),{style:{setProperty:n(()=>{},"setProperty"),removeProperty:n(()=>"","removeProperty"),getPropertyValue:n(()=>"","getPropertyValue")}})}n(Jd,"insertCSSRule");function ae(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}n(ae,"getNumericAttr");function ce(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}ae(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}n(ce,"setNumericAttr");function F(t,e){return t.hasAttribute(e)}n(F,"getBooleanAttr");function K(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}F(t,e)!=i&&t.toggleAttribute(e,i)}n(K,"setBooleanAttr");function re(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}n(re,"getStringAttr");function ne(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;re(t,e,void 0)!==a&&t.setAttribute(e,a)}n(ne,"setStringAttr");var dp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$t"),di=n((t,e,i)=>(dp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$t"),Dg=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$t"),Sn=n((t,e,i,a)=>(dp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$q"),Ue;function Lg(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}n(Lg,"getTemplateHTML$i");class Mo extends E.HTMLElement{static{n(this,"MediaGestureReceiver")}constructor(){if(super(),Dg(this,Ue,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Y.MEDIA_CONTROLLER,c.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Y.MEDIA_CONTROLLER&&(i&&((s=(r=di(this,Ue))==null?void 0:r.unassociateElement)==null||s.call(r,this),Sn(this,Ue,null)),a&&this.isConnected&&(Sn(this,Ue,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=di(this,Ue))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a,r;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Sn(this,Ue,Mg(this)),this.getAttribute(Y.MEDIA_CONTROLLER)&&((i=(e=di(this,Ue))==null?void 0:e.associateElement)==null||i.call(e,this)),(a=di(this,Ue))==null||a.addEventListener("pointerdown",this),(r=di(this,Ue))==null||r.addEventListener("click",this)}disconnectedCallback(){var e,i,a,r;this.getAttribute(Y.MEDIA_CONTROLLER)&&((i=(e=di(this,Ue))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=di(this,Ue))==null||a.removeEventListener("pointerdown",this),(r=di(this,Ue))==null||r.removeEventListener("click",this),Sn(this,Ue,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:s,clientY:o}=e,{left:l,top:d,width:u,height:p}=this.getBoundingClientRect(),v=s-l,m=o-d;if(v<0||m<0||v>u||m>p||u===0&&p===0)return;const h=this._pointerType||"mouse";if(this._pointerType=void 0,h===al.TOUCH){this.handleTap(e);return}else if(h===al.MOUSE||h===al.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return F(this,c.MEDIA_PAUSED)}set mediaPaused(e){K(this,c.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?R.MEDIA_PLAY_REQUEST:R.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new E.CustomEvent(i,{composed:!0,bubbles:!0}))}}Ue=new WeakMap;Mo.shadowRootOptions={mode:"open"};Mo.getTemplateHTML=Lg;function Mg(t){var e;const i=t.getAttribute(Y.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):nr(t,"media-controller")}n(Mg,"getMediaControllerEl");E.customElements.get("media-gesture-receiver")||E.customElements.define("media-gesture-receiver",Mo);var qc=Mo,eu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$s"),je=n((t,e,i)=>(eu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$s"),Qe=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$s"),xi=n((t,e,i,a)=>(eu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$p"),ot=n((t,e,i)=>(eu(t,e,"access private method"),i),"__privateMethod$d"),io,Ea,sn,Ua,Jn,Dl,up,Cr,es,Ll,cp,Ml,hp,on,xo,Oo,tu,tr,ln;const x={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function xg(t){return`
    <style>
      
      :host([${c.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
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

      :host(:not([${x.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
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

      
      :host([${x.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${x.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${x.AUDIO}])[${x.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${x.AUDIO}])[${x.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${x.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${x.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${x.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
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

      
      :host(:not([${x.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${x.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${x.USER_INACTIVE}]:not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_AIRPLAYING}]):not([${c.MEDIA_IS_CASTING}]):not([${x.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${x.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${x.USER_INACTIVE}]:not([${x.NO_AUTOHIDE}]):not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_CASTING}]):not([${x.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${x.USER_INACTIVE}][${x.AUTOHIDE_OVER_CONTROLS}]:not([${x.NO_AUTOHIDE}]):not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_CASTING}]):not([${x.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${x.AUDIO}])[${c.MEDIA_HAS_PLAYED}]) slot[name=poster] {
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
        <template shadowrootmode="${qc.shadowRootOptions.mode}">
          ${qc.getTemplateHTML({})}
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
  `}n(xg,"getTemplateHTML$h");const Og=Object.values(c),Ng="sm:384 md:576 lg:768 xl:960";function Pg(t){mp(t.target,t.contentRect.width)}n(Pg,"resizeCallback");function mp(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(x.BREAKPOINTS))!=null?i:Ng,r=$g(a),s=Ug(r,e);let o=!1;if(Object.keys(r).forEach(l=>{if(s.includes(l)){t.hasAttribute(`breakpoint${l}`)||(t.setAttribute(`breakpoint${l}`,""),o=!0);return}t.hasAttribute(`breakpoint${l}`)&&(t.removeAttribute(`breakpoint${l}`),o=!0)}),o){const l=new CustomEvent(ni.BREAKPOINTS_CHANGE,{detail:s});t.dispatchEvent(l)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(ni.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}n(mp,"setBreakpoints");function $g(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}n($g,"createBreakpointMap");function Ug(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}n(Ug,"getBreakpoints");class No extends E.HTMLElement{static{n(this,"MediaContainer")}constructor(){if(super(),Qe(this,Dl),Qe(this,Ll),Qe(this,Ml),Qe(this,on),Qe(this,Oo),Qe(this,tr),Qe(this,io,0),Qe(this,Ea,null),Qe(this,sn,null),Qe(this,Ua,void 0),this.breakpointsComputed=!1,Qe(this,Jn,new MutationObserver(ot(this,Dl,up).bind(this))),Qe(this,Cr,!1),Qe(this,es,i=>{je(this,Cr)||(setTimeout(()=>{Pg(i),xi(this,Cr,!1)},0),xi(this,Cr,!0))}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const i=Je(this.attributes),a=this.constructor.getTemplateHTML(i);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(a):this.shadowRoot.innerHTML=a}const e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){je(this,Ea)&&this.mediaUnsetCallback(je(this,Ea));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[x.AUTOHIDE,x.GESTURES_DISABLED].concat(Og).filter(e=>![c.MEDIA_RENDITION_LIST,c.MEDIA_AUDIO_TRACK_LIST,c.MEDIA_CHAPTERS_CUES,c.MEDIA_WIDTH,c.MEDIA_HEIGHT,c.MEDIA_ERROR,c.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==x.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(xi(this,Ea,e),e.localName.includes("-")&&await E.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;je(this,Jn).observe(this,{childList:!0,subtree:!0}),Ja(this,je(this,es));const i=this.getAttribute(x.AUDIO)!=null,a=D(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(x.USER_INACTIVE,""),mp(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=E.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;je(this,Jn).disconnect(),er(this,je(this,es)),this.media&&this.mediaUnsetCallback(this.media),(e=E.window)==null||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){xi(this,Ea,null)}handleEvent(e){switch(e.type){case"pointerdown":xi(this,io,e.timeStamp);break;case"pointermove":ot(this,Ll,cp).call(this,e);break;case"pointerup":ot(this,Ml,hp).call(this,e);break;case"mouseleave":ot(this,on,xo).call(this);break;case"mouseup":this.removeAttribute(x.KEYBOARD_CONTROL);break;case"keyup":ot(this,tr,ln).call(this),this.setAttribute(x.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);xi(this,Ua,isNaN(i)?0:i)}get autohide(){return(je(this,Ua)===void 0?2:je(this,Ua)).toString()}get breakpoints(){return re(this,x.BREAKPOINTS)}set breakpoints(e){ne(this,x.BREAKPOINTS,e)}get audio(){return F(this,x.AUDIO)}set audio(e){K(this,x.AUDIO,e)}get gesturesDisabled(){return F(this,x.GESTURES_DISABLED)}set gesturesDisabled(e){K(this,x.GESTURES_DISABLED,e)}get keyboardControl(){return F(this,x.KEYBOARD_CONTROL)}set keyboardControl(e){K(this,x.KEYBOARD_CONTROL,e)}get noAutohide(){return F(this,x.NO_AUTOHIDE)}set noAutohide(e){K(this,x.NO_AUTOHIDE,e)}get autohideOverControls(){return F(this,x.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){K(this,x.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return F(this,x.USER_INACTIVE)}set userInteractive(e){K(this,x.USER_INACTIVE,e)}}io=new WeakMap;Ea=new WeakMap;sn=new WeakMap;Ua=new WeakMap;Jn=new WeakMap;Dl=new WeakSet;up=n(function(t){const e=this.media;for(const i of t){if(i.type!=="childList")continue;const a=i.removedNodes;for(const r of a){if(r.slot!="media"||i.target!=this)continue;let s=i.previousSibling&&i.previousSibling.previousElementSibling;if(!s||!e)this.mediaUnsetCallback(r);else{let o=s.slot!=="media";for(;(s=s.previousSibling)!==null;)s.slot=="media"&&(o=!1);o&&this.mediaUnsetCallback(r)}}if(e)for(const r of i.addedNodes)r===e&&this.handleMediaUpdated(e)}},"handleMutation_fn");Cr=new WeakMap;es=new WeakMap;Ll=new WeakSet;cp=n(function(t){if(t.pointerType!=="mouse"&&t.timeStamp-je(this,io)<250)return;ot(this,Oo,tu).call(this),clearTimeout(je(this,sn));const e=this.hasAttribute(x.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&ot(this,tr,ln).call(this)},"handlePointerMove_fn$2");Ml=new WeakSet;hp=n(function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(x.USER_INACTIVE);[this,this.media].includes(t.target)&&e?ot(this,on,xo).call(this):ot(this,tr,ln).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&ot(this,tr,ln).call(this)},"handlePointerUp_fn$1");on=new WeakSet;xo=n(function(){if(je(this,Ua)<0||this.hasAttribute(x.USER_INACTIVE))return;this.setAttribute(x.USER_INACTIVE,"");const t=new E.CustomEvent(ni.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)},"setInactive_fn");Oo=new WeakSet;tu=n(function(){if(!this.hasAttribute(x.USER_INACTIVE))return;this.removeAttribute(x.USER_INACTIVE);const t=new E.CustomEvent(ni.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)},"setActive_fn");tr=new WeakSet;ln=n(function(){ot(this,Oo,tu).call(this),clearTimeout(je(this,sn));const t=parseInt(this.autohide);t<0||xi(this,sn,setTimeout(()=>{ot(this,on,xo).call(this)},t*1e3))},"scheduleInactive_fn");No.shadowRootOptions={mode:"open"};No.getTemplateHTML=xg;E.customElements.get("media-container")||E.customElements.define("media-container",No);var pp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$r"),Re=n((t,e,i)=>(pp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$r"),mr=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$r"),wn=n((t,e,i,a)=>(pp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$o"),_a,ba,ao,qi,zt,mi;class iu{static{n(this,"AttributeTokenList")}constructor(e,i,{defaultValue:a}={defaultValue:void 0}){mr(this,zt),mr(this,_a,void 0),mr(this,ba,void 0),mr(this,ao,void 0),mr(this,qi,new Set),wn(this,_a,e),wn(this,ba,i),wn(this,ao,new Set(a))}[Symbol.iterator](){return Re(this,zt,mi).values()}get length(){return Re(this,zt,mi).size}get value(){var e;return(e=[...Re(this,zt,mi)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(wn(this,qi,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...Re(this,zt,mi)][e]}values(){return Re(this,zt,mi).values()}forEach(e,i){Re(this,zt,mi).forEach(e,i)}add(...e){var i,a;e.forEach(r=>Re(this,qi).add(r)),!(this.value===""&&!((i=Re(this,_a))!=null&&i.hasAttribute(`${Re(this,ba)}`)))&&((a=Re(this,_a))==null||a.setAttribute(`${Re(this,ba)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>Re(this,qi).delete(a)),(i=Re(this,_a))==null||i.setAttribute(`${Re(this,ba)}`,`${this.value}`)}contains(e){return Re(this,zt,mi).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}}_a=new WeakMap;ba=new WeakMap;ao=new WeakMap;qi=new WeakMap;zt=new WeakSet;mi=n(function(){return Re(this,qi).size?Re(this,qi):Re(this,ao)},"tokens_get");const Hg=n((t="")=>t.split(/\s+/),"splitTextTracksStr"),vp=n((t="")=>{const[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?qt.CAPTIONS:qt.SUBTITLES,language:i,label:r}},"parseTextTrackStr"),Po=n((t="",e={})=>Hg(t).map(i=>{const a=vp(i);return{...e,...a}}),"parseTextTracksStr"),fp=n(t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?vp(e):e):typeof t=="string"?Po(t):[t]:[],"parseTracks"),xl=n(({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,"formatTextTrackObj"),dn=n((t=[])=>Array.prototype.map.call(t,xl).join(" "),"stringifyTextTrackList"),Bg=n((t,e)=>i=>i[t]===e,"isMatchingPropOf"),Ep=n(t=>{const e=Object.entries(t).map(([i,a])=>Bg(i,a));return i=>e.every(a=>a(i))},"textTrackObjAsPred"),Qr=n((t,e=[],i=[])=>{const a=fp(i).map(Ep),r=n(s=>a.some(o=>o(s)),"isTrackToUpdate");Array.from(e).filter(r).forEach(s=>{s.mode=t})},"updateTracksModeTo"),$o=n((t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:Ep(e);return Array.from(t.textTracks).filter(i)},"getTextTracksList"),_p=n(t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(c.MEDIA_SUBTITLES_SHOWING)},"areSubsOn"),Wg=n(t=>{var e;const{media:i,fullscreenElement:a}=t;try{const r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){const s=(e=a[r])==null?void 0:e.call(a);if(s instanceof Promise)return s.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch(r){console.error(r)}},"enterFullscreen"),Yc="exitFullscreen"in ye?"exitFullscreen":"webkitExitFullscreen"in ye?"webkitExitFullscreen":"webkitCancelFullScreen"in ye?"webkitCancelFullScreen":void 0,Fg=n(t=>{var e;const{documentElement:i}=t;if(Yc){const a=(e=i?.[Yc])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},"exitFullscreen"),Dr="fullscreenElement"in ye?"fullscreenElement":"webkitFullscreenElement"in ye?"webkitFullscreenElement":void 0,Kg=n(t=>{const{documentElement:e,media:i}=t,a=e?.[Dr];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===hg.FULLSCREEN?i:a},"getFullscreenElement"),Vg=n(t=>{var e;const{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;const s=Kg(t);if(!s)return!1;if(s===r||s===i)return!0;if(s.localName.includes("-")){let o=s.shadowRoot;if(!(Dr in o))return oi(s,r);for(;o?.[Dr];){if(o[Dr]===r)return!0;o=(e=o[Dr])==null?void 0:e.shadowRoot}}return!1},"isFullscreen"),qg="fullscreenEnabled"in ye?"fullscreenEnabled":"webkitFullscreenEnabled"in ye?"webkitFullscreenEnabled":void 0,Yg=n(t=>{const{documentElement:e,media:i}=t;return!!e?.[qg]||i&&"webkitSupportsFullscreen"in i},"isFullscreenEnabled");let In;const au=n(()=>{var t,e;return In||(In=(e=(t=ye)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),In)},"getTestMediaEl"),Gg=n(async(t=au())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([Qg(t,i.signal),Zg(t,e)]);return i.abort(),a},"hasVolumeSupportAsync"),Qg=n((t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),"dispatchedVolumeChange"),Zg=n(async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Jm(10)}return t.volume!==e},"volumeChanged"),zg=/.*Version\/.*Safari\/.*/.test(E.navigator.userAgent),bp=n((t=au())=>E.matchMedia("(display-mode: standalone)").matches&&zg?!1:typeof t?.requestPictureInPicture=="function","hasPipSupport"),gp=n((t=au())=>Yg({documentElement:ye,media:t}),"hasFullscreenSupport"),jg=gp(),Xg=bp(),Jg=!!E.WebKitPlaybackTargetAvailabilityEvent,e0=!!E.chrome,ro=n(t=>$o(t.media,e=>[qt.SUBTITLES,qt.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),"getSubtitleTracks"),yp=n(t=>$o(t.media,e=>e.mode===Va.SHOWING&&[qt.SUBTITLES,qt.CAPTIONS].includes(e.kind)),"getShowingSubtitleTracks"),Tp=n((t,e)=>{const i=ro(t),a=yp(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)Qr(Va.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let s=i[0];const{options:o}=t;if(!o?.noSubtitlesLangPref){const p=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),v=p?[p,...globalThis.navigator.languages]:globalThis.navigator.languages,m=i.filter(h=>v.some(f=>h.language.toLowerCase().startsWith(f.split("-")[0]))).sort((h,f)=>{const _=v.findIndex(T=>h.language.toLowerCase().startsWith(T.split("-")[0])),g=v.findIndex(T=>f.language.toLowerCase().startsWith(T.split("-")[0]));return _-g});m[0]&&(s=m[0])}const{language:l,label:d,kind:u}=s;Qr(Va.DISABLED,i,a),Qr(Va.SHOWING,i,[{language:l,label:d,kind:u}])}}},"toggleSubtitleTracks"),ru=n((t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?t0(t,e):Object.entries(t).every(([i,a])=>i in e&&ru(a,e[i])),"areValuesEq"),t0=n((t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,s)=>ru(r,e[s])):!0},"areArraysEq"),i0=Object.values(Jt);let no;const a0=Gg().then(t=>(no=t,no)),r0=n(async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof E.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=E.customElements.get(i);a&&e instanceof a||(await E.customElements.whenDefined(i),E.customElements.upgrade(e))}))},"prepareStateOwners"),n0=new E.DOMParser,s0=n(t=>t&&(n0.parseFromString(t,"text/html").body.textContent||t),"parseHtmlToText"),Lr={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:r}=t;if(e?.type!=="playing")return(a=(i=r?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const r=E.localStorage.getItem("media-chrome-pref-muted")!==null,s=i.hasAttribute("muted");if(a){r&&E.localStorage.removeItem("media-chrome-pref-muted");return}if(s&&!r)return;E.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch(r){console.debug("Error setting muted pref",r)}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const r=E.localStorage.getItem("media-chrome-pref-muted")==="true";Lr.mediaMuted.set(r,e),t(r)}catch(r){console.debug("Error getting muted pref",r)}}]},mediaLoop:{get(t){const{media:e}=t;return e?.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?E.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&E.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch(r){console.debug("Error setting volume pref",r)}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const r=E.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;Lr.mediaVolume.set(+r,e),t(+r)}catch(a){console.debug("Error getting volume pref",a)}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!zd(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((r,s)=>[Number(a.start(s).toFixed(3)),Number(a.end(s).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[Jt.LIVE,Jt.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:r}=e;if(i0.includes(r))return r===Jt.UNKNOWN?a:r;const s=e.duration;return s===1/0?Jt.LIVE:Number.isFinite(s)?Jt.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=Lr.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===Jt.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Lr.mediaStreamType.get(t)===Jt.LIVE))return!1;const r=e.seekable;if(!r)return!0;if(!r.length)return!1;const s=r.end(r.length-1)-i;return e.currentTime>=s},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return ro(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return yp(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:r,options:s}=e;if(!r)return;const o=n(l=>{var d;!s.defaultSubtitles||l&&![qt.CAPTIONS,qt.SUBTITLES].includes((d=l?.track)==null?void 0:d.kind)||Tp(e,!0)},"updateDefaultSubtitlesCallback");return r.addEventListener("loadstart",o),(i=r.textTracks)==null||i.addEventListener("addtrack",o),(a=r.textTracks)==null||a.addEventListener("removetrack",o),()=>{var l,d;r.removeEventListener("loadstart",o),(l=r.textTracks)==null||l.removeEventListener("addtrack",o),(d=r.textTracks)==null||d.removeEventListener("removetrack",o)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=$o(i,{kind:qt.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:r,startTime:s,endTime:o})=>({text:s0(r),startTime:s,endTime:o}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const r=a.querySelector('track[kind="chapters"][default][src]'),s=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r?.addEventListener("load",t),s?.addEventListener("load",t),()=>{r?.removeEventListener("load",t),s?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?oi(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let s=r.pictureInPictureElement.shadowRoot;for(;s?.pictureInPictureElement;){if(s.pictureInPictureElement===a)return!0;s=(i=s.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!ye.pictureInPictureEnabled){console.warn("MediaChrome: Picture-in-picture is not enabled");return}if(!i.requestPictureInPicture){console.warn("MediaChrome: The current media does not support picture-in-picture");return}const a=n(()=>{console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a readyState > 0.")},"warnNotReady");i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src){console.warn("MediaChrome: The media is not ready for picture-in-picture. It must have a src set.");return}if(i.readyState===0&&i.preload==="none"){const s=n(()=>{i.removeEventListener("loadedmetadata",o),i.preload="none"},"cleanup"),o=n(()=>{i.requestPictureInPicture().catch(a),s()},"tryPip");i.addEventListener("loadedmetadata",o),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),s()},1e3)}else throw r}else throw r})}else ye.pictureInPictureElement&&ye.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:r}=t;return(a=(i=r?.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions){console.warn("MediaController: Rendition selection not supported by this media.");return}const a=t,r=Array.prototype.findIndex.call(i.videoRenditions,s=>s.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks){console.warn("MediaChrome: Audio track selection not supported by this media.");return}const a=t;for(const r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return Vg(t)},set(t,e,i){var a;t?(Wg(e),i.detail&&((a=e.media)==null||a.focus())):Fg(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;const{media:r}=e;if(r&&!(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected")&&!(!t&&((a=r.remote)==null?void 0:a.state)!=="connected")){if(typeof r.remote.prompt!="function"){console.warn("MediaChrome: Casting is not supported in this environment");return}r.remote.prompt().catch(()=>{})}},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;if(i){if(!(i.webkitShowPlaybackTargetPicker&&E.WebKitPlaybackTargetAvailabilityEvent)){console.error("MediaChrome: received a request to select AirPlay but AirPlay is not supported in this environment");return}i.webkitShowPlaybackTargetPicker()}},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!jg||!gp(e))return Ge.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!Xg||!bp(e))return Ge.UNSUPPORTED;if(e?.disablePictureInPicture)return Ge.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(no===!1||e?.volume==null)return Ge.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{no==null&&a0.then(e=>t(e?void 0:Ge.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!e0||!((i=a?.remote)!=null&&i.state))return Ge.UNSUPPORTED;if(!(e==null||e==="available"))return Ge.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(s=>{t({availability:s?"available":"not-available"})}).catch(s=>{s.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var s;(s=a?.remote)==null||s.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!Jg)return Ge.UNSUPPORTED;if(e?.availability==="not-available")return Ge.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(s=>{t({availability:s?"available":"not-available"})}).catch(s=>{s.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var s;(s=a?.remote)==null||s.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return Ge.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return Ge.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return Ge.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return Ge.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},o0={[R.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,s;const{media:o}=e,l=i??void 0;let d,u;if(o&&l!=null){const[h]=$o(o,{kind:qt.METADATA,label:"thumbnails"}),f=Array.prototype.find.call((a=h?.cues)!=null?a:[],(_,g,T)=>g===0?_.endTime>l:g===T.length-1?_.startTime<=l:_.startTime<=l&&_.endTime>l);if(f){const _=/'^(?:[a-z]+:)?\/\//i.test(f.text)||(r=o?.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,g=new URL(f.text,_);u=new URLSearchParams(g.hash).get("#xywh").split(",").map(A=>+A),d=g.href}}const p=t.mediaDuration.get(e);let m=(s=t.mediaChaptersCues.get(e).find((h,f,_)=>f===_.length-1&&p===h.endTime?h.startTime<=l&&h.endTime>=l:h.startTime<=l&&h.endTime>l))==null?void 0:s.text;return i!=null&&m==null&&(m=""),{mediaPreviewTime:l,mediaPreviewImage:d,mediaPreviewCoords:u,mediaPreviewChapter:m}},[R.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[R.MEDIA_PLAY_REQUEST](t,e){var i,a,r,s;const o="mediaPaused",d=t.mediaStreamType.get(e)===Jt.LIVE,u=!((i=e.options)!=null&&i.noAutoSeekToLive),p=t.mediaTargetLiveWindow.get(e)>0;if(d&&u&&!p){const v=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(v){const m=(s=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?s:0,h=v-m;t.mediaCurrentTime.set(h,e)}}t[o].set(!1,e)},[R.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",r=i;t[a].set(r,e)},[R.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[R.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[R.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",r=!!i;return t[a].set(r,e),{mediaLoop:r}},[R.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[R.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",r=i;t[a].set(r,e)},[R.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;const s="mediaCurrentTime",o=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(o)))return;const l=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,d=o-l;t[s].set(d,e)},[R.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:r}=e,s=ro(e),o=fp(i),l=(a=o[0])==null?void 0:a.language;l&&!r.noSubtitlesLangPref&&E.localStorage.setItem("media-chrome-pref-subtitles-lang",l),Qr(Va.SHOWING,s,o)},[R.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=ro(e),r=i??[];Qr(Va.DISABLED,a,r)},[R.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){Tp(e,i)},[R.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",r=i;t[a].set(r,e)},[R.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[R.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[R.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[R.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[R.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[R.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[R.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[R.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},l0=n(({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=Lr,requestMap:r=o0,options:s={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{const l=[],d={options:{...s}};let u=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const p=n(_=>{_!=null&&(ru(_,u)||(u=Object.freeze({...u,..._}),l.forEach(g=>g(u))))},"updateState"),v=n(()=>{const _=Object.entries(a).reduce((g,[T,{get:A}])=>(g[T]=A(d),g),{});p(_)},"updateStateFromFacade"),m={};let h;const f=n(async(_,g)=>{var T,A,b,S,L,N,B,G,ee,V,U,xe,Fe,Ke,me,Pe;const At=!!h;if(h={...d,...h??{},..._},At)return;await r0(...Object.values(_));const $e=l.length>0&&g===0&&o,dt=d.media!==h.media,Ve=((T=d.media)==null?void 0:T.textTracks)!==((A=h.media)==null?void 0:A.textTracks),Se=((b=d.media)==null?void 0:b.videoRenditions)!==((S=h.media)==null?void 0:S.videoRenditions),qe=((L=d.media)==null?void 0:L.audioTracks)!==((N=h.media)==null?void 0:N.audioTracks),et=((B=d.media)==null?void 0:B.remote)!==((G=h.media)==null?void 0:G.remote),sa=d.documentElement!==h.documentElement,gn=!!d.media&&(dt||$e),ac=!!((ee=d.media)!=null&&ee.textTracks)&&(Ve||$e),rc=!!((V=d.media)!=null&&V.videoRenditions)&&(Se||$e),nc=!!((U=d.media)!=null&&U.audioTracks)&&(qe||$e),sc=!!((xe=d.media)!=null&&xe.remote)&&(et||$e),oc=!!d.documentElement&&(sa||$e),Go=gn||ac||rc||nc||sc||oc,oa=l.length===0&&g===1&&o,lc=!!h.media&&(dt||oa),dc=!!((Fe=h.media)!=null&&Fe.textTracks)&&(Ve||oa),uc=!!((Ke=h.media)!=null&&Ke.videoRenditions)&&(Se||oa),cc=!!((me=h.media)!=null&&me.audioTracks)&&(qe||oa),hc=!!((Pe=h.media)!=null&&Pe.remote)&&(et||oa),mc=!!h.documentElement&&(sa||oa),pc=lc||dc||uc||cc||hc||mc;if(!(Go||pc)){Object.entries(h).forEach(([j,ur])=>{d[j]=ur}),v(),h=void 0;return}Object.entries(a).forEach(([j,{get:ur,mediaEvents:nf=[],textTracksEvents:sf=[],videoRenditionsEvents:of=[],audioTracksEvents:lf=[],remoteEvents:df=[],rootEvents:uf=[],stateOwnersUpdateHandlers:cf=[]}])=>{m[j]||(m[j]={});const Ye=n(oe=>{const pe=ur(d,oe);p({[j]:pe})},"handler");let we;we=m[j].mediaEvents,nf.forEach(oe=>{we&&gn&&(d.media.removeEventListener(oe,we),m[j].mediaEvents=void 0),lc&&(h.media.addEventListener(oe,Ye),m[j].mediaEvents=Ye)}),we=m[j].textTracksEvents,sf.forEach(oe=>{var pe,ut;we&&ac&&((pe=d.media.textTracks)==null||pe.removeEventListener(oe,we),m[j].textTracksEvents=void 0),dc&&((ut=h.media.textTracks)==null||ut.addEventListener(oe,Ye),m[j].textTracksEvents=Ye)}),we=m[j].videoRenditionsEvents,of.forEach(oe=>{var pe,ut;we&&rc&&((pe=d.media.videoRenditions)==null||pe.removeEventListener(oe,we),m[j].videoRenditionsEvents=void 0),uc&&((ut=h.media.videoRenditions)==null||ut.addEventListener(oe,Ye),m[j].videoRenditionsEvents=Ye)}),we=m[j].audioTracksEvents,lf.forEach(oe=>{var pe,ut;we&&nc&&((pe=d.media.audioTracks)==null||pe.removeEventListener(oe,we),m[j].audioTracksEvents=void 0),cc&&((ut=h.media.audioTracks)==null||ut.addEventListener(oe,Ye),m[j].audioTracksEvents=Ye)}),we=m[j].remoteEvents,df.forEach(oe=>{var pe,ut;we&&sc&&((pe=d.media.remote)==null||pe.removeEventListener(oe,we),m[j].remoteEvents=void 0),hc&&((ut=h.media.remote)==null||ut.addEventListener(oe,Ye),m[j].remoteEvents=Ye)}),we=m[j].rootEvents,uf.forEach(oe=>{we&&oc&&(d.documentElement.removeEventListener(oe,we),m[j].rootEvents=void 0),mc&&(h.documentElement.addEventListener(oe,Ye),m[j].rootEvents=Ye)});const yn=m[j].stateOwnersUpdateHandlers;if(yn&&Go&&(Array.isArray(yn)?yn:[yn]).forEach(pe=>{typeof pe=="function"&&pe()}),pc){const oe=cf.map(pe=>pe(Ye,h)).filter(pe=>typeof pe=="function");m[j].stateOwnersUpdateHandlers=oe.length===1?oe[0]:oe}else Go&&(m[j].stateOwnersUpdateHandlers=void 0)}),Object.entries(h).forEach(([j,ur])=>{d[j]=ur}),v(),h=void 0},"updateStateOwners");return f({media:t,fullscreenElement:e,documentElement:i,options:s}),{dispatch(_){const{type:g,detail:T}=_;if(r[g]&&u.mediaErrorCode==null){p(r[g](a,d,_));return}g==="mediaelementchangerequest"?f({media:T}):g==="fullscreenelementchangerequest"?f({fullscreenElement:T}):g==="documentelementchangerequest"?f({documentElement:T}):g==="optionschangerequest"&&(Object.entries(T??{}).forEach(([A,b])=>{d.options[A]=b}),v())},getState(){return u},subscribe(_){return f({},l.length+1),l.push(_),_(u),()=>{const g=l.indexOf(_);g>=0&&(f({},l.length-1),l.splice(g,1))}}}},"createMediaStore");var nu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$q"),$=n((t,e,i)=>(nu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$q"),ht=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$q"),jt=n((t,e,i,a)=>(nu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$n"),Ht=n((t,e,i)=>(nu(t,e,"access private method"),i),"__privateMethod$c"),yi,Mr,Q,Yi,xr,Ct,ts,is,Ol,ji,qa,as,Nl,Pl,Ap;const kp=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],Gc=10,Qc=.025,Zc=.25,d0=.25,u0=2,w={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"};class Sp extends No{static{n(this,"MediaController")}constructor(){super(),ht(this,is),ht(this,ji),ht(this,as),ht(this,Pl),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,ht(this,yi,new iu(this,w.HOTKEYS)),ht(this,Mr,void 0),ht(this,Q,void 0),ht(this,Yi,null),ht(this,xr,void 0),ht(this,Ct,void 0),ht(this,ts,i=>{var a;(a=$(this,Q))==null||a.dispatch(i)}),this.associateElement(this);let e={};jt(this,xr,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);const s=a.toLowerCase(),o=new E.CustomEvent(cg[s],{composed:!0,detail:r});this.dispatchEvent(o)}),e=i}),this.hasAttribute(w.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(w.NO_HOTKEYS,w.HOTKEYS,w.DEFAULT_STREAM_TYPE,w.DEFAULT_SUBTITLES,w.DEFAULT_DURATION,w.NO_MUTED_PREF,w.NO_VOLUME_PREF,w.LANG,w.LOOP)}get mediaStore(){return $(this,Q)}set mediaStore(e){var i,a;if($(this,Q)&&((i=$(this,Ct))==null||i.call(this),jt(this,Ct,void 0)),jt(this,Q,e),!$(this,Q)&&!this.hasAttribute(w.NO_DEFAULT_STORE)){Ht(this,is,Ol).call(this);return}jt(this,Ct,(a=$(this,Q))==null?void 0:a.subscribe($(this,xr)))}get fullscreenElement(){var e;return(e=$(this,Mr))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(w.FULLSCREEN_ELEMENT)&&this.removeAttribute(w.FULLSCREEN_ELEMENT),jt(this,Mr,e),(i=$(this,Q))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return F(this,w.DEFAULT_SUBTITLES)}set defaultSubtitles(e){K(this,w.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return re(this,w.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){ne(this,w.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return ae(this,w.DEFAULT_DURATION)}set defaultDuration(e){ce(this,w.DEFAULT_DURATION,e)}get noHotkeys(){return F(this,w.NO_HOTKEYS)}set noHotkeys(e){K(this,w.NO_HOTKEYS,e)}get keysUsed(){return re(this,w.KEYS_USED)}set keysUsed(e){ne(this,w.KEYS_USED,e)}get liveEdgeOffset(){return ae(this,w.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){ce(this,w.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return F(this,w.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){K(this,w.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return F(this,w.NO_VOLUME_PREF)}set noVolumePref(e){K(this,w.NO_VOLUME_PREF,e)}get noMutedPref(){return F(this,w.NO_MUTED_PREF)}set noMutedPref(e){K(this,w.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return F(this,w.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){K(this,w.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return F(this,w.NO_DEFAULT_STORE)}set noDefaultStore(e){K(this,w.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var r,s,o,l,d,u,p,v,m,h,f,_;if(super.attributeChangedCallback(e,i,a),e===w.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(w.HOTKEYS)&&console.warn("Media Chrome: Both `hotkeys` and `nohotkeys` have been set. All hotkeys will be disabled."),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===w.HOTKEYS)$(this,yi).value=a;else if(e===w.DEFAULT_SUBTITLES&&a!==i)(r=$(this,Q))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(w.DEFAULT_SUBTITLES)}});else if(e===w.DEFAULT_STREAM_TYPE)(o=$(this,Q))==null||o.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(s=this.getAttribute(w.DEFAULT_STREAM_TYPE))!=null?s:void 0}});else if(e===w.LIVE_EDGE_OFFSET)(l=$(this,Q))==null||l.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(w.LIVE_EDGE_OFFSET)?+this.getAttribute(w.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(w.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(w.LIVE_EDGE_OFFSET)}});else if(e===w.SEEK_TO_LIVE_OFFSET)(d=$(this,Q))==null||d.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(w.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(w.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===w.NO_AUTO_SEEK_TO_LIVE)(u=$(this,Q))==null||u.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(w.NO_AUTO_SEEK_TO_LIVE)}});else if(e===w.FULLSCREEN_ELEMENT){const g=a?(p=this.getRootNode())==null?void 0:p.getElementById(a):void 0;jt(this,Mr,g),(v=$(this,Q))==null||v.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===w.LANG&&a!==i?(kg(a),(m=$(this,Q))==null||m.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===w.LOOP&&a!==i?(h=$(this,Q))==null||h.dispatch({type:R.MEDIA_LOOP_REQUEST,detail:a!=null}):e===w.NO_VOLUME_PREF&&a!==i?(f=$(this,Q))==null||f.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(w.NO_VOLUME_PREF)}}):e===w.NO_MUTED_PREF&&a!==i&&((_=$(this,Q))==null||_.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(w.NO_MUTED_PREF)}}))}connectedCallback(){var e,i;!$(this,Q)&&!this.hasAttribute(w.NO_DEFAULT_STORE)&&Ht(this,is,Ol).call(this),(e=$(this,Q))==null||e.dispatch({type:"documentelementchangerequest",detail:ye}),super.connectedCallback(),$(this,Q)&&!$(this,Ct)&&jt(this,Ct,(i=$(this,Q))==null?void 0:i.subscribe($(this,xr))),this.hasAttribute(w.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,r;(e=super.disconnectedCallback)==null||e.call(this),$(this,Q)&&((i=$(this,Q))==null||i.dispatch({type:"documentelementchangerequest",detail:void 0}),(a=$(this,Q))==null||a.dispatch({type:R.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})),$(this,Ct)&&((r=$(this,Ct))==null||r.call(this),jt(this,Ct,void 0))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=$(this,Q))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=$(this,Q))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){Xc(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),s=f0(e,a,r);Object.values(R).forEach(o=>{e.addEventListener(o,$(this,ts))}),i.set(e,s)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(R).forEach(r=>{e.removeEventListener(r,$(this,ts))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),$(this,Q)&&Object.entries($(this,Q).getState()).forEach(([r,s])=>{Xc([e],r,s)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",Ht(this,as,Nl))}disableHotkeys(){this.removeEventListener("keydown",Ht(this,as,Nl)),this.removeEventListener("keyup",Ht(this,ji,qa))}get hotkeys(){return re(this,w.HOTKEYS)}set hotkeys(e){ne(this,w.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,s,o,l,d,u,p;const v=e.target;if(((r=(a=(i=v.getAttribute(w.KEYS_USED))==null?void 0:i.split(" "))!=null?a:v?.keysUsed)!=null?r:[]).map(T=>T==="Space"?" ":T).filter(Boolean).includes(e.key))return;let h,f,_;if(!($(this,yi).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&$(this,yi).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&$(this,yi).contains("noshift+/")))switch(e.key){case" ":case"k":h=$(this,Q).getState().mediaPaused?R.MEDIA_PLAY_REQUEST:R.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new E.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"m":h=this.mediaStore.getState().mediaVolumeLevel==="off"?R.MEDIA_UNMUTE_REQUEST:R.MEDIA_MUTE_REQUEST,this.dispatchEvent(new E.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"f":h=this.mediaStore.getState().mediaIsFullscreen?R.MEDIA_EXIT_FULLSCREEN_REQUEST:R.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new E.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new E.CustomEvent(R.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const T=this.hasAttribute(w.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(w.KEYBOARD_BACKWARD_SEEK_OFFSET):Gc;f=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)-T,0),_=new E.CustomEvent(R.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowRight":case"l":{const T=this.hasAttribute(w.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(w.KEYBOARD_FORWARD_SEEK_OFFSET):Gc;f=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)+T,0),_=new E.CustomEvent(R.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowUp":{const T=this.hasAttribute(w.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(w.KEYBOARD_UP_VOLUME_STEP):Qc;f=Math.min(((l=this.mediaStore.getState().mediaVolume)!=null?l:1)+T,1),_=new E.CustomEvent(R.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowDown":{const T=this.hasAttribute(w.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(w.KEYBOARD_DOWN_VOLUME_STEP):Qc;f=Math.max(((d=this.mediaStore.getState().mediaVolume)!=null?d:1)-T,0),_=new E.CustomEvent(R.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"<":{const T=(u=this.mediaStore.getState().mediaPlaybackRate)!=null?u:1;f=Math.max(T-Zc,d0).toFixed(2),_=new E.CustomEvent(R.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case">":{const T=(p=this.mediaStore.getState().mediaPlaybackRate)!=null?p:1;f=Math.min(T+Zc,u0).toFixed(2),_=new E.CustomEvent(R.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"/":case"?":{e.shiftKey&&Ht(this,Pl,Ap).call(this);break}case"p":{h=this.mediaStore.getState().mediaIsPip?R.MEDIA_EXIT_PIP_REQUEST:R.MEDIA_ENTER_PIP_REQUEST,_=new E.CustomEvent(h,{composed:!0,bubbles:!0}),this.dispatchEvent(_);break}}}}yi=new WeakMap;Mr=new WeakMap;Q=new WeakMap;Yi=new WeakMap;xr=new WeakMap;Ct=new WeakMap;ts=new WeakMap;is=new WeakSet;Ol=n(function(){var t;this.mediaStore=l0({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(w.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(w.DEFAULT_DURATION)?+this.getAttribute(w.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(w.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(w.LIVE_EDGE_OFFSET)?+this.getAttribute(w.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(w.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(w.SEEK_TO_LIVE_OFFSET):this.hasAttribute(w.LIVE_EDGE_OFFSET)?+this.getAttribute(w.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(w.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(w.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(w.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(w.NO_SUBTITLES_LANG_PREF)}})},"setupDefaultStore_fn");ji=new WeakSet;qa=n(function(t){const{key:e,shiftKey:i}=t;if(!(i&&(e==="/"||e==="?")||kp.includes(e))){this.removeEventListener("keyup",Ht(this,ji,qa));return}this.keyboardShortcutHandler(t)},"keyUpHandler_fn");as=new WeakSet;Nl=n(function(t){var e;const{metaKey:i,altKey:a,key:r,shiftKey:s}=t,o=s&&(r==="/"||r==="?");if(o&&((e=$(this,Yi))!=null&&e.open)){this.removeEventListener("keyup",Ht(this,ji,qa));return}if(i||a||!o&&!kp.includes(r)){this.removeEventListener("keyup",Ht(this,ji,qa));return}const l=t.target,d=l instanceof HTMLElement&&(l.tagName.toLowerCase()==="media-volume-range"||l.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)&&!($(this,yi).contains(`no${r.toLowerCase()}`)||r===" "&&$(this,yi).contains("nospace"))&&!d&&t.preventDefault(),this.addEventListener("keyup",Ht(this,ji,qa),{once:!0})},"keyDownHandler_fn");Pl=new WeakSet;Ap=n(function(){$(this,Yi)||(jt(this,Yi,ye.createElement("media-keyboard-shortcuts-dialog")),this.appendChild($(this,Yi))),$(this,Yi).open=!0},"showKeyboardShortcutsDialog_fn");const c0=Object.values(c),h0=Object.values(zm),wp=n(t=>{var e,i,a,r;let{observedAttributes:s}=t.constructor;!s&&((e=t.nodeName)!=null&&e.includes("-"))&&(E.customElements.upgrade(t),{observedAttributes:s}=t.constructor);const o=(r=(a=(i=t?.getAttribute)==null?void 0:i.call(t,Y.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(s||o)?(s||o).filter(l=>c0.includes(l)):[]},"getMediaUIAttributesFrom"),m0=n(t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&E.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof E.customElements.get(t.nodeName.toLowerCase()))&&E.customElements.upgrade(t),h0.some(a=>a in t)},"hasMediaUIProps"),$l=n(t=>m0(t)||!!wp(t).length,"isMediaStateReceiver"),zc=n(t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},"serializeTuple"),jc={[c.MEDIA_SUBTITLES_LIST]:dn,[c.MEDIA_SUBTITLES_SHOWING]:dn,[c.MEDIA_SEEKABLE]:zc,[c.MEDIA_BUFFERED]:t=>t?.map(zc).join(" "),[c.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[c.MEDIA_RENDITION_LIST]:mg,[c.MEDIA_AUDIO_TRACK_LIST]:Eg},p0=n(async(t,e,i)=>{var a,r;if(t.isConnected||await Jm(0),typeof i=="boolean"||i==null)return K(t,e,i);if(typeof i=="number")return ce(t,e,i);if(typeof i=="string")return ne(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const s=(r=(a=jc[e])==null?void 0:a.call(jc,i))!=null?r:i;return t.setAttribute(e,s)},"setAttr"),v0=n(t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},"isMediaSlotElementDescendant"),Oi=n((t,e)=>{if(v0(t))return;const i=n((r,s)=>{var o,l;$l(r)&&s(r);const{children:d=[]}=r??{},u=(l=(o=r?.shadowRoot)==null?void 0:o.children)!=null?l:[];[...d,...u].forEach(v=>Oi(v,s))},"traverseForMediaStateReceiversSync"),a=t?.nodeName.toLowerCase();if(a.includes("-")&&!$l(t)){E.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},"traverseForMediaStateReceivers"),Xc=n((t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const r=wp(a),s=e.toLowerCase();r.includes(s)&&p0(a,s,i)})},"propagateMediaState"),f0=n((t,e,i)=>{Oi(t,e);const a=n(p=>{var v;const m=(v=p?.composedPath()[0])!=null?v:p.target;e(m)},"registerMediaStateReceiverHandler"),r=n(p=>{var v;const m=(v=p?.composedPath()[0])!=null?v:p.target;i(m)},"unregisterMediaStateReceiverHandler");t.addEventListener(R.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(R.UNREGISTER_MEDIA_STATE_RECEIVER,r);const s=n(p=>{p.forEach(v=>{const{addedNodes:m=[],removedNodes:h=[],type:f,target:_,attributeName:g}=v;f==="childList"?(Array.prototype.forEach.call(m,T=>Oi(T,e)),Array.prototype.forEach.call(h,T=>Oi(T,i))):f==="attributes"&&g===Y.MEDIA_CHROME_ATTRIBUTES&&($l(_)?e(_):i(_))})},"mutationCallback");let o=[];const l=n(p=>{const v=p.target;v.name!=="media"&&(o.forEach(m=>Oi(m,i)),o=[...v.assignedElements({flatten:!0})],o.forEach(m=>Oi(m,e)))},"slotChangeHandler");t.addEventListener("slotchange",l);const d=new MutationObserver(s);return d.observe(t,{childList:!0,attributes:!0,subtree:!0}),n(()=>{Oi(t,i),t.removeEventListener("slotchange",l),d.disconnect(),t.removeEventListener(R.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(R.UNREGISTER_MEDIA_STATE_RECEIVER,r)},"unsubscribe")},"monitorForMediaStateReceivers");E.customElements.get("media-controller")||E.customElements.define("media-controller",Sp);var E0=Sp;const la={PLACEMENT:"placement",BOUNDS:"bounds"};function _0(t){return`
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
  `}n(_0,"getTemplateHTML$g");class Uo extends E.HTMLElement{static{n(this,"MediaTooltip")}constructor(){if(super(),this.updateXOffset=()=>{var e;if(!lp(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),r=(e=nr(this,"#"+this.bounds))!=null?e:Be(this);if(!r)return;const{x:s,width:o}=r.getBoundingClientRect(),{x:l,width:d}=this.getBoundingClientRect(),u=l+d,p=s+o,v=a.getPropertyValue("--media-tooltip-offset-x"),m=v?parseFloat(v.replace("px","")):0,h=a.getPropertyValue("--media-tooltip-container-margin"),f=h?parseFloat(h.replace("px","")):0,_=l-s+m-f,g=u-p+m+f;if(_<0){this.style.setProperty("--media-tooltip-offset-x",`${_}px`);return}if(g>0){this.style.setProperty("--media-tooltip-offset-x",`${g}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[la.PLACEMENT,la.BOUNDS]}get placement(){return re(this,la.PLACEMENT)}set placement(e){ne(this,la.PLACEMENT,e)}get bounds(){return re(this,la.BOUNDS)}set bounds(e){ne(this,la.BOUNDS,e)}}Uo.shadowRootOptions={mode:"open"};Uo.getTemplateHTML=_0;E.customElements.get("media-tooltip")||E.customElements.define("media-tooltip",Uo);var Jc=Uo,su=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$p"),fe=n((t,e,i)=>(su(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$p"),da=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$p"),Rn=n((t,e,i,a)=>(su(t,e,"write to private field"),e.set(t,i),i),"__privateSet$m"),b0=n((t,e,i)=>(su(t,e,"access private method"),i),"__privateMethod$b"),Dt,Ha,Ti,ga,rs,Ul,Ip;const ui={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function g0(t,e={}){return`
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
        <template shadowrootmode="${Jc.shadowRootOptions.mode}">
          ${Jc.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}n(g0,"getTemplateHTML$f");function y0(t,e){return`
    <slot></slot>
  `}n(y0,"getSlotTemplateHTML$n");function T0(){return""}n(T0,"getTooltipContentHTML$g");class De extends E.HTMLElement{static{n(this,"MediaChromeButton")}constructor(){if(super(),da(this,Ul),da(this,Dt,void 0),this.preventClick=!1,this.tooltipEl=null,da(this,Ha,e=>{this.preventClick||this.handleClick(e),setTimeout(fe(this,Ti),0)}),da(this,Ti,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),da(this,ga,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",fe(this,ga));return}this.preventClick||this.handleClick(e)}),da(this,rs,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",fe(this,ga));return}this.addEventListener("keyup",fe(this,ga),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",ui.TOOLTIP_PLACEMENT,Y.MEDIA_CONTROLLER,c.MEDIA_LANG]}enable(){this.addEventListener("click",fe(this,Ha)),this.addEventListener("keydown",fe(this,rs)),this.tabIndex=0}disable(){this.removeEventListener("click",fe(this,Ha)),this.removeEventListener("keydown",fe(this,rs)),this.removeEventListener("keyup",fe(this,ga)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Y.MEDIA_CONTROLLER?(i&&((s=(r=fe(this,Dt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Rn(this,Dt,null)),a&&this.isConnected&&(Rn(this,Dt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=fe(this,Dt))==null?void 0:l.associateElement)==null||d.call(l,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===ui.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===c.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),fe(this,Ti).call(this)}connectedCallback(){var e,i,a;const{style:r}=ke(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const s=this.getAttribute(Y.MEDIA_CONTROLLER);s&&(Rn(this,Dt,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=fe(this,Dt))==null?void 0:i.associateElement)==null||a.call(i,this)),E.customElements.whenDefined("media-tooltip").then(()=>b0(this,Ul,Ip).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=fe(this,Dt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Rn(this,Dt,null),this.removeEventListener("mouseenter",fe(this,Ti)),this.removeEventListener("focus",fe(this,Ti)),this.removeEventListener("click",fe(this,Ha))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return re(this,ui.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){ne(this,ui.TOOLTIP_PLACEMENT,e)}get mediaController(){return re(this,Y.MEDIA_CONTROLLER)}set mediaController(e){ne(this,Y.MEDIA_CONTROLLER,e)}get disabled(){return F(this,ui.DISABLED)}set disabled(e){K(this,ui.DISABLED,e)}get noTooltip(){return F(this,ui.NO_TOOLTIP)}set noTooltip(e){K(this,ui.NO_TOOLTIP,e)}handleClick(e){}}Dt=new WeakMap;Ha=new WeakMap;Ti=new WeakMap;ga=new WeakMap;rs=new WeakMap;Ul=new WeakSet;Ip=n(function(){this.addEventListener("mouseenter",fe(this,Ti)),this.addEventListener("focus",fe(this,Ti)),this.addEventListener("click",fe(this,Ha));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)},"setupTooltip_fn");De.shadowRootOptions={mode:"open"};De.getTemplateHTML=g0;De.getSlotTemplateHTML=y0;De.getTooltipContentHTML=T0;E.customElements.get("media-chrome-button")||E.customElements.define("media-chrome-button",De);const eh=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function A0(t){return`
    <style>
      :host([${c.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${c.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${c.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${c.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${eh}</slot>
      <slot name="exit">${eh}</slot>
    </slot>
  `}n(A0,"getSlotTemplateHTML$m");function k0(){return`
    <slot name="tooltip-enter">${D("start airplay")}</slot>
    <slot name="tooltip-exit">${D("stop airplay")}</slot>
  `}n(k0,"getTooltipContentHTML$f");const th=n(t=>{const e=t.mediaIsAirplaying?D("stop airplay"):D("start airplay");t.setAttribute("aria-label",e)},"updateAriaLabel$7");class ou extends De{static{n(this,"MediaAirplayButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_AIRPLAYING,c.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),th(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_AIRPLAYING&&th(this)}get mediaIsAirplaying(){return F(this,c.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){K(this,c.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return re(this,c.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){ne(this,c.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new E.CustomEvent(R.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}}ou.getSlotTemplateHTML=A0;ou.getTooltipContentHTML=k0;E.customElements.get("media-airplay-button")||E.customElements.define("media-airplay-button",ou);const S0=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,w0=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function I0(t){return`
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
      <slot name="on">${S0}</slot>
      <slot name="off">${w0}</slot>
    </slot>
  `}n(I0,"getSlotTemplateHTML$l");function R0(){return`
    <slot name="tooltip-enable">${D("Enable captions")}</slot>
    <slot name="tooltip-disable">${D("Disable captions")}</slot>
  `}n(R0,"getTooltipContentHTML$e");const ih=n(t=>{t.setAttribute("aria-checked",_p(t).toString())},"updateAriaChecked$1");class lu extends De{static{n(this,"MediaCaptionsButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",D("closed captions")),ih(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_SHOWING&&ih(this)}get mediaSubtitlesList(){return ah(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){rh(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return ah(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){rh(this,c.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new E.CustomEvent(R.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}}lu.getSlotTemplateHTML=I0;lu.getTooltipContentHTML=R0;const ah=n((t,e)=>{const i=t.getAttribute(e);return i?Po(i):[]},"getSubtitlesListAttr$2"),rh=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=dn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr$2");E.customElements.get("media-captions-button")||E.customElements.define("media-captions-button",lu);const C0='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',D0='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function L0(t){return`
    <style>
      :host([${c.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${c.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${c.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${c.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${C0}</slot>
      <slot name="exit">${D0}</slot>
    </slot>
  `}n(L0,"getSlotTemplateHTML$k");function M0(){return`
    <slot name="tooltip-enter">${D("Start casting")}</slot>
    <slot name="tooltip-exit">${D("Stop casting")}</slot>
  `}n(M0,"getTooltipContentHTML$d");const nh=n(t=>{const e=t.mediaIsCasting?D("stop casting"):D("start casting");t.setAttribute("aria-label",e)},"updateAriaLabel$6");class du extends De{static{n(this,"MediaCastButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_CASTING,c.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),nh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_CASTING&&nh(this)}get mediaIsCasting(){return F(this,c.MEDIA_IS_CASTING)}set mediaIsCasting(e){K(this,c.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return re(this,c.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){ne(this,c.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?R.MEDIA_EXIT_CAST_REQUEST:R.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new E.CustomEvent(e,{composed:!0,bubbles:!0}))}}du.getSlotTemplateHTML=L0;du.getTooltipContentHTML=M0;E.customElements.get("media-cast-button")||E.customElements.define("media-cast-button",du);var uu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$o"),Xi=n((t,e,i)=>(uu(t,e,"read from private field"),e.get(t)),"__privateGet$o"),Qt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$o"),cu=n((t,e,i,a)=>(uu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$l"),Di=n((t,e,i)=>(uu(t,e,"access private method"),i),"__privateMethod$a"),so,un,aa,ns,Hl,Bl,Rp,Wl,Cp,Fl,Dp,Kl,Lp,Vl,Mp;function x0(t){return`
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
  `}n(x0,"getTemplateHTML$e");function O0(t){return`
    <slot id="content"></slot>
  `}n(O0,"getSlotTemplateHTML$j");const pr={OPEN:"open",ANCHOR:"anchor"};class sr extends E.HTMLElement{static{n(this,"MediaChromeDialog")}constructor(){super(),Qt(this,ns),Qt(this,Bl),Qt(this,Wl),Qt(this,Fl),Qt(this,Kl),Qt(this,Vl),Qt(this,so,!1),Qt(this,un,null),Qt(this,aa,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[pr.OPEN,pr.ANCHOR]}get open(){return F(this,pr.OPEN)}set open(e){K(this,pr.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":Di(this,Fl,Dp).call(this,e);break;case"focusout":Di(this,Kl,Lp).call(this,e);break;case"keydown":Di(this,Vl,Mp).call(this,e);break}}connectedCallback(){Di(this,ns,Hl).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,i,a){Di(this,ns,Hl).call(this),e===pr.OPEN&&a!==i&&(this.open?Di(this,Bl,Rp).call(this):Di(this,Wl,Cp).call(this))}focus(){cu(this,un,Xd());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}}so=new WeakMap;un=new WeakMap;aa=new WeakMap;ns=new WeakSet;Hl=n(function(){if(!Xi(this,so)&&(cu(this,so,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=ke(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}},"init_fn");Bl=new WeakSet;Rp=n(function(){var t;(t=Xi(this,aa))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})},"handleOpen_fn$1");Wl=new WeakSet;Cp=n(function(){var t;(t=Xi(this,aa))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))},"handleClosed_fn$1");Fl=new WeakSet;Dp=n(function(t){cu(this,aa,t.relatedTarget),oi(this,t.relatedTarget)||(this.open=!this.open)},"handleInvoke_fn$1");Kl=new WeakSet;Lp=n(function(t){var e;oi(this,t.relatedTarget)||((e=Xi(this,un))==null||e.focus(),Xi(this,aa)&&Xi(this,aa)!==t.relatedTarget&&this.open&&(this.open=!1))},"handleFocusOut_fn$1");Vl=new WeakSet;Mp=n(function(t){var e,i,a,r,s;const{key:o,ctrlKey:l,altKey:d,metaKey:u}=t;l||d||u||this.keysUsed.includes(o)&&(t.preventDefault(),t.stopPropagation(),o==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):o==="Escape"&&((s=Xi(this,un))==null||s.focus(),this.open=!1))},"handleKeyDown_fn$2");sr.shadowRootOptions={mode:"open"};sr.getTemplateHTML=x0;sr.getSlotTemplateHTML=O0;E.customElements.get("media-chrome-dialog")||E.customElements.define("media-chrome-dialog",sr);var hu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$n"),le=n((t,e,i)=>(hu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$n"),Le=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$n"),pi=n((t,e,i,a)=>(hu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$k"),ft=n((t,e,i)=>(hu(t,e,"access private method"),i),"__privateMethod$9"),Lt,Ho,ss,os,Et,oo,ls,ds,us,mu,xp,cs,ql,hs,Yl,lo,pu,Gl,Op,Ql,Np,Zl,Pp,zl,$p;function N0(t){return`
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
  `}n(N0,"getTemplateHTML$d");class or extends E.HTMLElement{static{n(this,"MediaChromeRange")}constructor(){if(super(),Le(this,mu),Le(this,cs),Le(this,hs),Le(this,lo),Le(this,Gl),Le(this,Ql),Le(this,Zl),Le(this,zl),Le(this,Lt,void 0),Le(this,Ho,void 0),Le(this,ss,void 0),Le(this,os,void 0),Le(this,Et,{}),Le(this,oo,[]),Le(this,ls,()=>{if(this.range.matches(":focus-visible")){const{style:e}=ke(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),Le(this,ds,()=>{const{style:e}=ke(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),Le(this,us,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),pi(this,ss,this.shadowRoot.querySelector("#startpoint")),pi(this,os,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",Y.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Y.MEDIA_CONTROLLER?(i&&((s=(r=le(this,Lt))==null?void 0:r.unassociateElement)==null||s.call(r,this),pi(this,Lt,null)),a&&this.isConnected&&(pi(this,Lt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=le(this,Lt))==null?void 0:l.associateElement)==null||d.call(l,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),ft(this,cs,ql).call(this)):(this.range.setAttribute(e,a),ft(this,hs,Yl).call(this)))}connectedCallback(){var e,i,a;const{style:r}=ke(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),le(this,Et).pointer=ke(this.shadowRoot,"#pointer"),le(this,Et).progress=ke(this.shadowRoot,"#progress"),le(this,Et).thumb=ke(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),le(this,Et).activeSegment=ke(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const s=this.getAttribute(Y.MEDIA_CONTROLLER);s&&(pi(this,Lt,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=le(this,Lt))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",le(this,ls)),this.shadowRoot.addEventListener("focusout",le(this,ds)),ft(this,cs,ql).call(this),Ja(this.container,le(this,us))}disconnectedCallback(){var e,i;ft(this,hs,Yl).call(this),(i=(e=le(this,Lt))==null?void 0:e.unassociateElement)==null||i.call(e,this),pi(this,Lt,null),this.shadowRoot.removeEventListener("focusin",le(this,ls)),this.shadowRoot.removeEventListener("focusout",le(this,ds)),er(this.container,le(this,us))}updatePointerBar(e){var i;(i=le(this,Et).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=le(this,Et).progress)==null||e.style.setProperty("width",`${a}%`),(i=le(this,Et).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(s=>[s.start,s.end]),+this.range.max])];pi(this,oo,[...a]);const r=a.pop();for(const[s,o]of a.entries()){const[l,d]=[s===0,s===a.length-1],u=l?"calc(var(--segments-gap) / -1)":`${o*100}%`,v=`calc(${((d?r:a[s+1])-o)*100}%${l||d?"":" - var(--segments-gap)"})`,m=ye.createElementNS("http://www.w3.org/2000/svg","rect"),h=Jd(this.shadowRoot,`#segments-clipping rect:nth-child(${s+1})`);h.style.setProperty("x",u),h.style.setProperty("width",v),i.append(m)}}getPointerRatio(e){return Rg(e.clientX,e.clientY,le(this,ss).getBoundingClientRect(),le(this,os).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":ft(this,zl,$p).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":ft(this,Gl,Op).call(this,e);break;case"pointerdown":ft(this,lo,pu).call(this,e);break;case"pointerup":ft(this,Ql,Np).call(this);break;case"pointerleave":ft(this,Zl,Pp).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}}Lt=new WeakMap;Ho=new WeakMap;ss=new WeakMap;os=new WeakMap;Et=new WeakMap;oo=new WeakMap;ls=new WeakMap;ds=new WeakMap;us=new WeakMap;mu=new WeakSet;xp=n(function(t){const e=le(this,Et).activeSegment;if(!e)return;const i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${le(this,oo).findIndex((s,o,l)=>{const d=l[o+1];return d!=null&&i>=s&&i<=d})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))},"updateActiveSegment_fn");cs=new WeakSet;ql=n(function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))},"enableUserEvents_fn");hs=new WeakSet;Yl=n(function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),(t=E.window)==null||t.removeEventListener("pointerup",this),(e=E.window)==null||e.removeEventListener("pointermove",this)},"disableUserEvents_fn");lo=new WeakSet;pu=n(function(t){var e;pi(this,Ho,t.composedPath().includes(this.range)),(e=E.window)==null||e.addEventListener("pointerup",this)},"handlePointerDown_fn");Gl=new WeakSet;Op=n(function(t){var e;t.pointerType!=="mouse"&&ft(this,lo,pu).call(this,t),this.addEventListener("pointerleave",this),(e=E.window)==null||e.addEventListener("pointermove",this)},"handlePointerEnter_fn");Ql=new WeakSet;Np=n(function(){var t;(t=E.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")},"handlePointerUp_fn");Zl=new WeakSet;Pp=n(function(){var t,e;this.removeEventListener("pointerleave",this),(t=E.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=le(this,Et).activeSegment)==null||e.style.removeProperty("transform")},"handlePointerLeave_fn");zl=new WeakSet;$p=n(function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),ft(this,mu,xp).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!le(this,Ho))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))},"handlePointerMove_fn$1");or.shadowRootOptions={mode:"open"};or.getTemplateHTML=N0;E.customElements.get("media-chrome-range")||E.customElements.define("media-chrome-range",or);var Up=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$m"),Cn=n((t,e,i)=>(Up(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$m"),P0=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$m"),Dn=n((t,e,i,a)=>(Up(t,e,"write to private field"),e.set(t,i),i),"__privateSet$j"),Mt;function $0(t){return`
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
  `}n($0,"getTemplateHTML$c");class vu extends E.HTMLElement{static{n(this,"MediaControlBar")}constructor(){if(super(),P0(this,Mt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Y.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Y.MEDIA_CONTROLLER&&(i&&((s=(r=Cn(this,Mt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Dn(this,Mt,null)),a&&this.isConnected&&(Dn(this,Mt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=Cn(this,Mt))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(Y.MEDIA_CONTROLLER);r&&(Dn(this,Mt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=Cn(this,Mt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Cn(this,Mt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Dn(this,Mt,null)}}Mt=new WeakMap;vu.shadowRootOptions={mode:"open"};vu.getTemplateHTML=$0;E.customElements.get("media-control-bar")||E.customElements.define("media-control-bar",vu);var Hp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$l"),Ln=n((t,e,i)=>(Hp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$l"),U0=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$l"),Mn=n((t,e,i,a)=>(Hp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$i"),xt;function H0(t,e={}){return`
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
        box-shadow: inset 0 0 0 2px rgb(27 127 204 / .9);
        outline: 0;
      }

      
      :host(:where(:focus)) {
        box-shadow: none;
        outline: 0;
      }
    </style>

    ${this.getSlotTemplateHTML(t,e)}
  `}n(H0,"getTemplateHTML$b");function B0(t,e){return`
    <slot></slot>
  `}n(B0,"getSlotTemplateHTML$i");class Ii extends E.HTMLElement{static{n(this,"MediaTextDisplay")}constructor(){if(super(),U0(this,xt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Y.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Y.MEDIA_CONTROLLER&&(i&&((s=(r=Ln(this,xt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Mn(this,xt,null)),a&&this.isConnected&&(Mn(this,xt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=Ln(this,xt))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const{style:r}=ke(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const s=this.getAttribute(Y.MEDIA_CONTROLLER);s&&(Mn(this,xt,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=Ln(this,xt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Ln(this,xt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Mn(this,xt,null)}}xt=new WeakMap;Ii.shadowRootOptions={mode:"open"};Ii.getTemplateHTML=H0;Ii.getSlotTemplateHTML=B0;E.customElements.get("media-text-display")||E.customElements.define("media-text-display",Ii);var Bp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$k"),sh=n((t,e,i)=>(Bp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$k"),W0=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$k"),F0=n((t,e,i,a)=>(Bp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$h"),Or;function K0(t,e){return`
    <slot>${Si(e.mediaDuration)}</slot>
  `}n(K0,"getSlotTemplateHTML$h");class Wp extends Ii{static{n(this,"MediaDurationDisplay")}constructor(){var e;super(),W0(this,Or,void 0),F0(this,Or,this.shadowRoot.querySelector("slot")),sh(this,Or).textContent=Si((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===c.MEDIA_DURATION&&(sh(this,Or).textContent=Si(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return ae(this,c.MEDIA_DURATION)}set mediaDuration(e){ce(this,c.MEDIA_DURATION,e)}}Or=new WeakMap;Wp.getSlotTemplateHTML=K0;E.customElements.get("media-duration-display")||E.customElements.define("media-duration-display",Wp);const V0={2:D("Network Error"),3:D("Decode Error"),4:D("Source Not Supported"),5:D("Encryption Error")},q0={2:D("A network error caused the media download to fail."),3:D("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:D("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:D("The media is encrypted and there are no keys to decrypt it.")},Fp=n(t=>{var e,i;return t.code===1?null:{title:(e=V0[t.code])!=null?e:`Error ${t.code}`,message:(i=q0[t.code])!=null?i:t.message}},"formatError");var Kp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$j"),Y0=n((t,e,i)=>(Kp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$j"),G0=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$j"),Q0=n((t,e,i,a)=>(Kp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$g"),ms;function Z0(t){return`
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
      ${Vp({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}n(Z0,"getSlotTemplateHTML$g");function z0(t){return t.code&&Fp(t)!==null}n(z0,"shouldOpenErrorDialog");function Vp(t){var e;const{title:i,message:a}=(e=Fp(t))!=null?e:{};let r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}n(Vp,"formatErrorMessage");const oh=[c.MEDIA_ERROR_CODE,c.MEDIA_ERROR_MESSAGE];class Bo extends sr{static{n(this,"MediaErrorDialog")}constructor(){super(...arguments),G0(this,ms,null)}static get observedAttributes(){return[...super.observedAttributes,...oh]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!oh.includes(e))return;const s=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=z0(s),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(s))}get mediaError(){return Y0(this,ms)}set mediaError(e){Q0(this,ms,e)}get mediaErrorCode(){return ae(this,"mediaerrorcode")}set mediaErrorCode(e){ce(this,"mediaerrorcode",e)}get mediaErrorMessage(){return re(this,"mediaerrormessage")}set mediaErrorMessage(e){ne(this,"mediaerrormessage",e)}}ms=new WeakMap;Bo.getSlotTemplateHTML=Z0;Bo.formatErrorMessage=Vp;E.customElements.get("media-error-dialog")||E.customElements.define("media-error-dialog",Bo);var qp=Bo,j0=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$i"),ci=n((t,e,i)=>(j0(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$i"),lh=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$i"),ya,Ta;function X0(t){return`
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
      ${J0()}
    </slot>
  `}n(X0,"getSlotTemplateHTML$f");function J0(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((s,o)=>o>0?`<span class="key-separator">or</span><span class="key">${s}</span>`:`<span class="key">${s}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}n(J0,"formatKeyboardShortcuts");class Yp extends sr{static{n(this,"MediaKeyboardShortcutsDialog")}constructor(){super(...arguments),lh(this,ya,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const r=e.composedPath(),s=r[0]===this||r.includes(this),o=r.includes(a);s&&!o&&(this.open=!1)}),lh(this,Ta,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",ci(this,ya)),document.addEventListener("keydown",ci(this,Ta)))}disconnectedCallback(){this.removeEventListener("click",ci(this,ya)),document.removeEventListener("keydown",ci(this,Ta))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",ci(this,ya)),document.addEventListener("keydown",ci(this,Ta))):(this.removeEventListener("click",ci(this,ya)),document.removeEventListener("keydown",ci(this,Ta))))}}ya=new WeakMap;Ta=new WeakMap;Yp.getSlotTemplateHTML=X0;E.customElements.get("media-keyboard-shortcuts-dialog")||E.customElements.define("media-keyboard-shortcuts-dialog",Yp);var Gp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$h"),e1=n((t,e,i)=>(Gp(t,e,"read from private field"),e.get(t)),"__privateGet$h"),t1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$h"),i1=n((t,e,i,a)=>(Gp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$f"),ps;const a1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,r1=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function n1(t){return`
    <style>
      :host([${c.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${c.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${c.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${c.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${a1}</slot>
      <slot name="exit">${r1}</slot>
    </slot>
  `}n(n1,"getSlotTemplateHTML$e");function s1(){return`
    <slot name="tooltip-enter">${D("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${D("Exit fullscreen mode")}</slot>
  `}n(s1,"getTooltipContentHTML$c");const dh=n(t=>{const e=t.mediaIsFullscreen?D("exit fullscreen mode"):D("enter fullscreen mode");t.setAttribute("aria-label",e)},"updateAriaLabel$5");class fu extends De{static{n(this,"MediaFullscreenButton")}constructor(){super(...arguments),t1(this,ps,null)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_FULLSCREEN,c.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),dh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_FULLSCREEN&&dh(this)}get mediaFullscreenUnavailable(){return re(this,c.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){ne(this,c.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return F(this,c.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){K(this,c.MEDIA_IS_FULLSCREEN,e)}handleClick(e){i1(this,ps,e);const i=e1(this,ps)instanceof PointerEvent,a=this.mediaIsFullscreen?new E.CustomEvent(R.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new E.CustomEvent(R.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}}ps=new WeakMap;fu.getSlotTemplateHTML=n1;fu.getTooltipContentHTML=s1;E.customElements.get("media-fullscreen-button")||E.customElements.define("media-fullscreen-button",fu);const{MEDIA_TIME_IS_LIVE:vs,MEDIA_PAUSED:Zr}=c,{MEDIA_SEEK_TO_LIVE_REQUEST:o1,MEDIA_PLAY_REQUEST:l1}=R,d1='<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>';function u1(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${vs}]:not([${Zr}])) slot[name=indicator] > *,
      :host([${vs}]:not([${Zr}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${vs}]:not([${Zr}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${d1}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${D("live")}</slot>
  `}n(u1,"getSlotTemplateHTML$d");const uh=n(t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=D(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const r=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');r&&(r.textContent=D("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")},"updateAriaAttributes");class Qp extends De{static{n(this,"MediaLiveButton")}static get observedAttributes(){return[...super.observedAttributes,vs,Zr]}connectedCallback(){super.connectedCallback(),uh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),uh(this)}get mediaPaused(){return F(this,c.MEDIA_PAUSED)}set mediaPaused(e){K(this,c.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return F(this,c.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){K(this,c.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new E.CustomEvent(o1,{composed:!0,bubbles:!0})),this.hasAttribute(Zr)&&this.dispatchEvent(new E.CustomEvent(l1,{composed:!0,bubbles:!0})))}}Qp.getSlotTemplateHTML=u1;E.customElements.get("media-live-button")||E.customElements.define("media-live-button",Qp);var Zp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$g"),vr=n((t,e,i)=>(Zp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$g"),ch=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$g"),fr=n((t,e,i,a)=>(Zp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$e"),Ot,fs;const xn={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},zp=500,c1=`
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
`;function h1(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${zp}ms);
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

      :host([${c.MEDIA_LOADING}]:not([${c.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${c.MEDIA_LOADING}]:not([${c.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${c.MEDIA_LOADING}]:not([${c.MEDIA_PAUSED}])) #status {
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

    <slot name="icon">${c1}</slot>
    <div id="status" role="status" aria-live="polite">${D("media loading")}</div>
  `}n(h1,"getTemplateHTML$a");class Eu extends E.HTMLElement{static{n(this,"MediaLoadingIndicator")}constructor(){if(super(),ch(this,Ot,void 0),ch(this,fs,zp),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Y.MEDIA_CONTROLLER,c.MEDIA_PAUSED,c.MEDIA_LOADING,xn.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===xn.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===Y.MEDIA_CONTROLLER&&(i&&((s=(r=vr(this,Ot))==null?void 0:r.unassociateElement)==null||s.call(r,this),fr(this,Ot,null)),a&&this.isConnected&&(fr(this,Ot,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=vr(this,Ot))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(Y.MEDIA_CONTROLLER);r&&(fr(this,Ot,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=vr(this,Ot))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=vr(this,Ot))==null?void 0:e.unassociateElement)==null||i.call(e,this),fr(this,Ot,null)}get loadingDelay(){return vr(this,fs)}set loadingDelay(e){fr(this,fs,e);const{style:i}=ke(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return F(this,c.MEDIA_PAUSED)}set mediaPaused(e){K(this,c.MEDIA_PAUSED,e)}get mediaLoading(){return F(this,c.MEDIA_LOADING)}set mediaLoading(e){K(this,c.MEDIA_LOADING,e)}get mediaController(){return re(this,Y.MEDIA_CONTROLLER)}set mediaController(e){ne(this,Y.MEDIA_CONTROLLER,e)}get noAutohide(){return F(this,xn.NO_AUTOHIDE)}set noAutohide(e){K(this,xn.NO_AUTOHIDE,e)}}Ot=new WeakMap;fs=new WeakMap;Eu.shadowRootOptions={mode:"open"};Eu.getTemplateHTML=h1;E.customElements.get("media-loading-indicator")||E.customElements.define("media-loading-indicator",Eu);const m1=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,hh=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,p1=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function v1(t){return`
    <style>
      :host(:not([${c.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${c.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${c.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${c.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${c.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${c.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${c.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${m1}</slot>
      <slot name="low">${hh}</slot>
      <slot name="medium">${hh}</slot>
      <slot name="high">${p1}</slot>
    </slot>
  `}n(v1,"getSlotTemplateHTML$c");function f1(){return`
    <slot name="tooltip-mute">${D("Mute")}</slot>
    <slot name="tooltip-unmute">${D("Unmute")}</slot>
  `}n(f1,"getTooltipContentHTML$b");const mh=n(t=>{const e=t.mediaVolumeLevel==="off",i=D(e?"unmute":"mute");t.setAttribute("aria-label",i)},"updateAriaLabel$4");class _u extends De{static{n(this,"MediaMuteButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),mh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_VOLUME_LEVEL&&mh(this)}get mediaVolumeLevel(){return re(this,c.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){ne(this,c.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?R.MEDIA_UNMUTE_REQUEST:R.MEDIA_MUTE_REQUEST;this.dispatchEvent(new E.CustomEvent(e,{composed:!0,bubbles:!0}))}}_u.getSlotTemplateHTML=v1;_u.getTooltipContentHTML=f1;E.customElements.get("media-mute-button")||E.customElements.define("media-mute-button",_u);const ph=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function E1(t){return`
    <style>
      :host([${c.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${c.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${c.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${c.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${ph}</slot>
      <slot name="exit">${ph}</slot>
    </slot>
  `}n(E1,"getSlotTemplateHTML$b");function _1(){return`
    <slot name="tooltip-enter">${D("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${D("Exit picture in picture mode")}</slot>
  `}n(_1,"getTooltipContentHTML$a");const vh=n(t=>{const e=t.mediaIsPip?D("exit picture in picture mode"):D("enter picture in picture mode");t.setAttribute("aria-label",e)},"updateAriaLabel$3");class bu extends De{static{n(this,"MediaPipButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_PIP,c.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),vh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_PIP&&vh(this)}get mediaPipUnavailable(){return re(this,c.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){ne(this,c.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return F(this,c.MEDIA_IS_PIP)}set mediaIsPip(e){K(this,c.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?R.MEDIA_EXIT_PIP_REQUEST:R.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new E.CustomEvent(e,{composed:!0,bubbles:!0}))}}bu.getSlotTemplateHTML=E1;bu.getTooltipContentHTML=_1;E.customElements.get("media-pip-button")||E.customElements.define("media-pip-button",bu);var b1=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$f"),ua=n((t,e,i)=>(b1(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$f"),g1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$f"),vi;const nl={RATES:"rates"},jp=[1,1.2,1.5,1.7,2],Ba=1;function y1(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||Ba}x</slot>
  `}n(y1,"getSlotTemplateHTML$a");function T1(){return D("Playback rate")}n(T1,"getTooltipContentHTML$9");class gu extends De{static{n(this,"MediaPlaybackRateButton")}constructor(){var e;super(),g1(this,vi,new iu(this,nl.RATES,{defaultValue:jp})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:Ba}x`}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE,nl.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===nl.RATES&&(ua(this,vi).value=a),e===c.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,s=Number.isNaN(r)?Ba:r;this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",D("Playback rate {playbackRate}",{playbackRate:s}))}}get rates(){return ua(this,vi)}set rates(e){e?Array.isArray(e)?ua(this,vi).value=e.join(" "):typeof e=="string"&&(ua(this,vi).value=e):ua(this,vi).value=""}get mediaPlaybackRate(){return ae(this,c.MEDIA_PLAYBACK_RATE,Ba)}set mediaPlaybackRate(e){ce(this,c.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(ua(this,vi).values(),o=>+o).sort((o,l)=>o-l),r=(i=(e=a.find(o=>o>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:Ba,s=new E.CustomEvent(R.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(s)}}vi=new WeakMap;gu.getSlotTemplateHTML=y1;gu.getTooltipContentHTML=T1;E.customElements.get("media-playback-rate-button")||E.customElements.define("media-playback-rate-button",gu);const A1=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,k1=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function S1(t){return`
    <style>
      :host([${c.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${c.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${c.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${c.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${A1}</slot>
      <slot name="pause">${k1}</slot>
    </slot>
  `}n(S1,"getSlotTemplateHTML$9");function w1(){return`
    <slot name="tooltip-play">${D("Play")}</slot>
    <slot name="tooltip-pause">${D("Pause")}</slot>
  `}n(w1,"getTooltipContentHTML$8");const fh=n(t=>{const e=t.mediaPaused?D("play"):D("pause");t.setAttribute("aria-label",e)},"updateAriaLabel$2");class yu extends De{static{n(this,"MediaPlayButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PAUSED,c.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),fh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===c.MEDIA_PAUSED||e===c.MEDIA_LANG)&&fh(this)}get mediaPaused(){return F(this,c.MEDIA_PAUSED)}set mediaPaused(e){K(this,c.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?R.MEDIA_PLAY_REQUEST:R.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new E.CustomEvent(e,{composed:!0,bubbles:!0}))}}yu.getSlotTemplateHTML=S1;yu.getTooltipContentHTML=w1;E.customElements.get("media-play-button")||E.customElements.define("media-play-button",yu);const kt={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function I1(t){return`
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
  `}n(I1,"getTemplateHTML$9");const R1=n(t=>{t.style.removeProperty("background-image")},"unsetBackgroundImage"),C1=n((t,e)=>{t.style["background-image"]=`url('${e}')`},"setBackgroundImage");class Tu extends E.HTMLElement{static{n(this,"MediaPosterImage")}static get observedAttributes(){return[kt.PLACEHOLDER_SRC,kt.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===kt.SRC&&(a==null?this.image.removeAttribute(kt.SRC):this.image.setAttribute(kt.SRC,a)),e===kt.PLACEHOLDER_SRC&&(a==null?R1(this.image):C1(this.image,a))}get placeholderSrc(){return re(this,kt.PLACEHOLDER_SRC)}set placeholderSrc(e){ne(this,kt.SRC,e)}get src(){return re(this,kt.SRC)}set src(e){ne(this,kt.SRC,e)}}Tu.shadowRootOptions={mode:"open"};Tu.getTemplateHTML=I1;E.customElements.get("media-poster-image")||E.customElements.define("media-poster-image",Tu);var Xp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$e"),D1=n((t,e,i)=>(Xp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$e"),L1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$e"),M1=n((t,e,i,a)=>(Xp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$d"),Es;class x1 extends Ii{static{n(this,"MediaPreviewChapterDisplay")}constructor(){super(),L1(this,Es,void 0),M1(this,Es,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PREVIEW_CHAPTER,c.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===c.MEDIA_PREVIEW_CHAPTER||e===c.MEDIA_LANG)&&a!==i&&a!=null)if(D1(this,Es).textContent=a,a!==""){const r=D("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",r)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return re(this,c.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){ne(this,c.MEDIA_PREVIEW_CHAPTER,e)}}Es=new WeakMap;E.customElements.get("media-preview-chapter-display")||E.customElements.define("media-preview-chapter-display",x1);var Jp=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$d"),On=n((t,e,i)=>(Jp(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$d"),O1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$d"),Nn=n((t,e,i,a)=>(Jp(t,e,"write to private field"),e.set(t,i),i),"__privateSet$c"),Nt;function N1(t){return`
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
  `}n(N1,"getTemplateHTML$8");class Wo extends E.HTMLElement{static{n(this,"MediaPreviewThumbnail")}constructor(){if(super(),O1(this,Nt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Y.MEDIA_CONTROLLER,c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const r=this.getAttribute(Y.MEDIA_CONTROLLER);r&&(Nn(this,Nt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=On(this,Nt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=On(this,Nt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Nn(this,Nt,null)}attributeChangedCallback(e,i,a){var r,s,o,l,d;[c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===Y.MEDIA_CONTROLLER&&(i&&((s=(r=On(this,Nt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Nn(this,Nt,null)),a&&this.isConnected&&(Nn(this,Nt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=On(this,Nt))==null?void 0:l.associateElement)==null||d.call(l,this)))}get mediaPreviewImage(){return re(this,c.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){ne(this,c.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(c.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(c.MEDIA_PREVIEW_COORDS);return}this.setAttribute(c.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,r,s,o]=e,l=i.split("#")[0],d=getComputedStyle(this),{maxWidth:u,maxHeight:p,minWidth:v,minHeight:m}=d,h=Math.min(parseInt(u)/s,parseInt(p)/o),f=Math.max(parseInt(v)/s,parseInt(m)/o),_=h<1,g=_?h:f>1?f:1,{style:T}=ke(this.shadowRoot,":host"),A=ke(this.shadowRoot,"img").style,b=this.shadowRoot.querySelector("img"),S=_?"min":"max";T.setProperty(`${S}-width`,"initial","important"),T.setProperty(`${S}-height`,"initial","important"),T.width=`${s*g}px`,T.height=`${o*g}px`;const L=n(()=>{A.width=`${this.imgWidth*g}px`,A.height=`${this.imgHeight*g}px`,A.display="block"},"resize");b.src!==l&&(b.onload=()=>{this.imgWidth=b.naturalWidth,this.imgHeight=b.naturalHeight,L()},b.src=l,L()),L(),A.transform=`translate(-${a*g}px, -${r*g}px)`}}Nt=new WeakMap;Wo.shadowRootOptions={mode:"open"};Wo.getTemplateHTML=N1;E.customElements.get("media-preview-thumbnail")||E.customElements.define("media-preview-thumbnail",Wo);var Eh=Wo,ev=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$c"),_h=n((t,e,i)=>(ev(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$c"),P1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$c"),$1=n((t,e,i,a)=>(ev(t,e,"write to private field"),e.set(t,i),i),"__privateSet$b"),Nr;class U1 extends Ii{static{n(this,"MediaPreviewTimeDisplay")}constructor(){super(),P1(this,Nr,void 0),$1(this,Nr,this.shadowRoot.querySelector("slot")),_h(this,Nr).textContent=Si(0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_PREVIEW_TIME&&a!=null&&(_h(this,Nr).textContent=Si(parseFloat(a)))}get mediaPreviewTime(){return ae(this,c.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){ce(this,c.MEDIA_PREVIEW_TIME,e)}}Nr=new WeakMap;E.customElements.get("media-preview-time-display")||E.customElements.define("media-preview-time-display",U1);const ca={SEEK_OFFSET:"seekoffset"},sl=30,H1=n(t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`,"backwardIcon");function B1(t,e){return`
    <slot name="icon">${H1(e.seekOffset)}</slot>
  `}n(B1,"getSlotTemplateHTML$8");function W1(){return D("Seek backward")}n(W1,"getTooltipContentHTML$7");const F1=0;class Au extends De{static{n(this,"MediaSeekBackwardButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_CURRENT_TIME,ca.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ae(this,ca.SEEK_OFFSET,sl)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===ca.SEEK_OFFSET&&(this.seekOffset=ae(this,ca.SEEK_OFFSET,sl))}get seekOffset(){return ae(this,ca.SEEK_OFFSET,sl)}set seekOffset(e){ce(this,ca.SEEK_OFFSET,e),this.setAttribute("aria-label",D("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),sp(op(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ae(this,c.MEDIA_CURRENT_TIME,F1)}set mediaCurrentTime(e){ce(this,c.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new E.CustomEvent(R.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}Au.getSlotTemplateHTML=B1;Au.getTooltipContentHTML=W1;E.customElements.get("media-seek-backward-button")||E.customElements.define("media-seek-backward-button",Au);const ha={SEEK_OFFSET:"seekoffset"},ol=30,K1=n(t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`,"forwardIcon");function V1(t,e){return`
    <slot name="icon">${K1(e.seekOffset)}</slot>
  `}n(V1,"getSlotTemplateHTML$7");function q1(){return D("Seek forward")}n(q1,"getTooltipContentHTML$6");const Y1=0;class ku extends De{static{n(this,"MediaSeekForwardButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_CURRENT_TIME,ha.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=ae(this,ha.SEEK_OFFSET,ol)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===ha.SEEK_OFFSET&&(this.seekOffset=ae(this,ha.SEEK_OFFSET,ol))}get seekOffset(){return ae(this,ha.SEEK_OFFSET,ol)}set seekOffset(e){ce(this,ha.SEEK_OFFSET,e),this.setAttribute("aria-label",D("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),sp(op(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return ae(this,c.MEDIA_CURRENT_TIME,Y1)}set mediaCurrentTime(e){ce(this,c.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new E.CustomEvent(R.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}ku.getSlotTemplateHTML=V1;ku.getTooltipContentHTML=q1;E.customElements.get("media-seek-forward-button")||E.customElements.define("media-seek-forward-button",ku);var tv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$b"),ll=n((t,e,i)=>(tv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$b"),G1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$b"),Q1=n((t,e,i,a)=>(tv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$a"),Aa;const Ni={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},bh=[...Object.values(Ni),c.MEDIA_CURRENT_TIME,c.MEDIA_DURATION,c.MEDIA_SEEKABLE],gh=["Enter"," "],Z1="&nbsp;/&nbsp;",jl=n((t,{timesSep:e=Z1}={})=>{var i,a;const r=(i=t.mediaCurrentTime)!=null?i:0,[,s]=(a=t.mediaSeekable)!=null?a:[];let o=0;Number.isFinite(t.mediaDuration)?o=t.mediaDuration:Number.isFinite(s)&&(o=s);const l=t.remaining?Si(0-(o-r)):Si(r);return t.showDuration?`${l}${e}${Si(o)}`:l},"formatTimesLabel"),z1="video not loaded, unknown time.",j1=n(t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-valuetext",z1);return}const s=t.remaining?Gr(0-(r-i)):Gr(i);if(!t.showDuration){t.setAttribute("aria-valuetext",s);return}const o=Gr(r),l=`${s} of ${o}`;t.setAttribute("aria-valuetext",l)},"updateAriaValueText$1");function X1(t,e){return`
    <slot>${jl(e)}</slot>
  `}n(X1,"getSlotTemplateHTML$6");class iv extends Ii{static{n(this,"MediaTimeDisplay")}constructor(){super(),G1(this,Aa,void 0),Q1(this,Aa,this.shadowRoot.querySelector("slot")),ll(this,Aa).innerHTML=`${jl(this)}`}static get observedAttributes(){return[...super.observedAttributes,...bh,"disabled"]}connectedCallback(){const{style:e}=ke(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",D("playback time"));const i=n(a=>{const{key:r}=a;if(!gh.includes(r)){this.removeEventListener("keyup",i);return}this.toggleTimeDisplay()},"keyUpHandler");this.addEventListener("keydown",a=>{const{metaKey:r,altKey:s,key:o}=a;if(r||s||!gh.includes(o)){this.removeEventListener("keyup",i);return}this.addEventListener("keyup",i)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,i,a){bh.includes(e)?this.update():e==="disabled"&&a!==i&&(a==null?this.enable():this.disable()),super.attributeChangedCallback(e,i,a)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return F(this,Ni.REMAINING)}set remaining(e){K(this,Ni.REMAINING,e)}get showDuration(){return F(this,Ni.SHOW_DURATION)}set showDuration(e){K(this,Ni.SHOW_DURATION,e)}get noToggle(){return F(this,Ni.NO_TOGGLE)}set noToggle(e){K(this,Ni.NO_TOGGLE,e)}get mediaDuration(){return ae(this,c.MEDIA_DURATION)}set mediaDuration(e){ce(this,c.MEDIA_DURATION,e)}get mediaCurrentTime(){return ae(this,c.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){ce(this,c.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(c.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(c.MEDIA_SEEKABLE);return}this.setAttribute(c.MEDIA_SEEKABLE,e.join(":"))}update(){const e=jl(this);j1(this),e!==ll(this,Aa).innerHTML&&(ll(this,Aa).innerHTML=e)}}Aa=new WeakMap;iv.getSlotTemplateHTML=X1;E.customElements.get("media-time-display")||E.customElements.define("media-time-display",iv);var av=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$a"),Ie=n((t,e,i)=>(av(t,e,"read from private field"),e.get(t)),"__privateGet$a"),St=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$a"),Ze=n((t,e,i,a)=>(av(t,e,"write to private field"),e.set(t,i),i),"__privateSet$9"),J1=n((t,e,i,a)=>({set _(r){Ze(t,e,r)},get _(){return Ie(t,e)}}),"__privateWrapper"),ka,_s,Sa,Pr,bs,gs,ys,wa,Pi,Ts;class ey{static{n(this,"RangeAnimation")}constructor(e,i,a){St(this,ka,void 0),St(this,_s,void 0),St(this,Sa,void 0),St(this,Pr,void 0),St(this,bs,void 0),St(this,gs,void 0),St(this,ys,void 0),St(this,wa,void 0),St(this,Pi,0),St(this,Ts,(r=performance.now())=>{Ze(this,Pi,requestAnimationFrame(Ie(this,Ts))),Ze(this,Pr,performance.now()-Ie(this,Sa));const s=1e3/this.fps;if(Ie(this,Pr)>s){Ze(this,Sa,r-Ie(this,Pr)%s);const o=1e3/((r-Ie(this,_s))/++J1(this,bs)._),l=(r-Ie(this,gs))/1e3/this.duration;let d=Ie(this,ys)+l*this.playbackRate;d-Ie(this,ka).valueAsNumber>0?Ze(this,wa,this.playbackRate/this.duration/o):(Ze(this,wa,.995*Ie(this,wa)),d=Ie(this,ka).valueAsNumber+Ie(this,wa)),this.callback(d)}}),Ze(this,ka,e),this.callback=i,this.fps=a}start(){Ie(this,Pi)===0&&(Ze(this,Sa,performance.now()),Ze(this,_s,Ie(this,Sa)),Ze(this,bs,0),Ie(this,Ts).call(this))}stop(){Ie(this,Pi)!==0&&(cancelAnimationFrame(Ie(this,Pi)),Ze(this,Pi,0))}update({start:e,duration:i,playbackRate:a}){const r=e-Ie(this,ka).valueAsNumber,s=Math.abs(i-this.duration);(r>0||r<-.03||s>=.5)&&this.callback(e),Ze(this,ys,e),Ze(this,gs,performance.now()),this.duration=i,this.playbackRate=a}}ka=new WeakMap;_s=new WeakMap;Sa=new WeakMap;Pr=new WeakMap;bs=new WeakMap;gs=new WeakMap;ys=new WeakMap;wa=new WeakMap;Pi=new WeakMap;Ts=new WeakMap;var Su=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$9"),he=n((t,e,i)=>(Su(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$9"),Te=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$9"),it=n((t,e,i,a)=>(Su(t,e,"write to private field"),e.set(t,i),i),"__privateSet$8"),Ne=n((t,e,i)=>(Su(t,e,"access private method"),i),"__privateMethod$8"),Ia,Ji,uo,zr,co,As,cn,hn,Ra,Ca,Da,$r,wu,rv,Xl,ho,Iu,mo,Ru,po,Cu,Jl,nv,mn,vo,ed,sv;const ty="video not loaded, unknown time.",iy=n(t=>{const e=t.range,i=Gr(+ov(t)),a=Gr(+t.mediaSeekableEnd),r=i&&a?`${i} of ${a}`:ty;e.setAttribute("aria-valuetext",r)},"updateAriaValueText");function ay(t){return`
    ${or.getTemplateHTML(t)}
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

      :host(:is([${c.MEDIA_PREVIEW_IMAGE}], [${c.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${c.MEDIA_PREVIEW_IMAGE}], [${c.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
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

      :host([${c.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${c.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${c.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${c.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${c.MEDIA_PREVIEW_TIME}]:hover) {
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

      :host([${c.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${c.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${c.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${c.MEDIA_PREVIEW_CHAPTER}]) {
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

      :host([${c.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${c.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${c.MEDIA_PREVIEW_TIME}]:hover) {
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
          <template shadowrootmode="${Eh.shadowRootOptions.mode}">
            ${Eh.getTemplateHTML({})}
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
  `}n(ay,"getTemplateHTML$7");const Pn=n((t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},"calcRangeValueFromTime"),ov=n((t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i},"calcTimeFromRangeValue");class Du extends or{static{n(this,"MediaTimeRange")}constructor(){super(),Te(this,Da),Te(this,wu),Te(this,ho),Te(this,mo),Te(this,po),Te(this,Jl),Te(this,mn),Te(this,ed),Te(this,Ia,void 0),Te(this,Ji,void 0),Te(this,uo,void 0),Te(this,zr,void 0),Te(this,co,void 0),Te(this,As,void 0),Te(this,cn,void 0),Te(this,hn,void 0),Te(this,Ra,void 0),Te(this,Ca,void 0),Te(this,Xl,a=>{this.dragging||(zd(a)&&(this.range.valueAsNumber=a),he(this,Ca)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),it(this,uo,this.shadowRoot.querySelectorAll('[part~="box"]')),it(this,co,this.shadowRoot.querySelector('[part~="preview-box"]')),it(this,As,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);it(this,cn,parseInt(i.getPropertyValue("--media-box-padding-left"))),it(this,hn,parseInt(i.getPropertyValue("--media-box-padding-right"))),it(this,Ji,new ey(this.range,he(this,Xl),60))}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PAUSED,c.MEDIA_DURATION,c.MEDIA_SEEKABLE,c.MEDIA_CURRENT_TIME,c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_TIME,c.MEDIA_PREVIEW_CHAPTER,c.MEDIA_BUFFERED,c.MEDIA_PLAYBACK_RATE,c.MEDIA_LOADING,c.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",D("seek")),Ne(this,Da,$r).call(this),it(this,Ia,this.getRootNode()),(e=he(this,Ia))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),Ne(this,Da,$r).call(this),(e=he(this,Ia))==null||e.removeEventListener("transitionstart",this),it(this,Ia,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===c.MEDIA_CURRENT_TIME||e===c.MEDIA_PAUSED||e===c.MEDIA_ENDED||e===c.MEDIA_LOADING||e===c.MEDIA_DURATION||e===c.MEDIA_SEEKABLE?(he(this,Ji).update({start:Pn(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),Ne(this,Da,$r).call(this),iy(this)):e===c.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===c.MEDIA_DURATION||e===c.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=he(this,Ra),this.updateBar()))}get mediaChaptersCues(){return he(this,Ra)}set mediaChaptersCues(e){var i;it(this,Ra,e),this.updateSegments((i=he(this,Ra))==null?void 0:i.map(a=>({start:Pn(this,a.startTime),end:Pn(this,a.endTime)})))}get mediaPaused(){return F(this,c.MEDIA_PAUSED)}set mediaPaused(e){K(this,c.MEDIA_PAUSED,e)}get mediaLoading(){return F(this,c.MEDIA_LOADING)}set mediaLoading(e){K(this,c.MEDIA_LOADING,e)}get mediaDuration(){return ae(this,c.MEDIA_DURATION)}set mediaDuration(e){ce(this,c.MEDIA_DURATION,e)}get mediaCurrentTime(){return ae(this,c.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){ce(this,c.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return ae(this,c.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){ce(this,c.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(c.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(c.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(c.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(c.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(c.MEDIA_SEEKABLE);return}this.setAttribute(c.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return re(this,c.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){ne(this,c.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return ae(this,c.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){ce(this,c.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return F(this,c.MEDIA_ENDED)}set mediaEnded(e){K(this,c.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const s=this.mediaCurrentTime,[,o=this.mediaSeekableStart]=(e=i.find(([l,d])=>l<=s&&s<=d))!=null?e:[];a=Pn(this,o)}const{style:r}=ke(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=ke(this.shadowRoot,"#current-rail"),a=ke(this.shadowRoot,'[part~="current-box"]'),r=Ne(this,ho,Iu).call(this,he(this,As)),s=Ne(this,mo,Ru).call(this,r,this.range.valueAsNumber),o=Ne(this,po,Cu).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${s})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${o}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":Ne(this,ed,sv).call(this);break;case"pointermove":Ne(this,Jl,nv).call(this,e);break;case"pointerup":he(this,Ca)&&it(this,Ca,!1);break;case"pointerdown":it(this,Ca,!0);break;case"pointerleave":Ne(this,mn,vo).call(this,null);break;case"transitionstart":oi(e.target,this)&&setTimeout(()=>Ne(this,Da,$r).call(this),0);break}}}Ia=new WeakMap;Ji=new WeakMap;uo=new WeakMap;zr=new WeakMap;co=new WeakMap;As=new WeakMap;cn=new WeakMap;hn=new WeakMap;Ra=new WeakMap;Ca=new WeakMap;Da=new WeakSet;$r=n(function(){Ne(this,wu,rv).call(this)?he(this,Ji).start():he(this,Ji).stop()},"toggleRangeAnimation_fn");wu=new WeakSet;rv=n(function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&lp(this)},"shouldRangeAnimate_fn");Xl=new WeakMap;ho=new WeakSet;Iu=n(function(t){var e;const a=((e=this.getAttribute("bounds")?nr(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),s=t.offsetWidth,o=-(r.left-a.left-s/2),l=a.right-r.left-s/2;return{box:{width:s,min:o,max:l},bounds:a,range:r}},"getElementRects_fn");mo=new WeakSet;Ru=n(function(t,e){let i=`${e*100}%`;const{width:a,min:r,max:s}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(s)){const l=`calc(1 / var(--_range-width) * 100 * ${s}% - var(--media-box-padding-right))`;i=`min(${i}, ${l})`}return i},"getBoxPosition_fn");po=new WeakSet;Cu=n(function(t,e){const{width:i,min:a,max:r}=t.box,s=e*t.range.width;if(s<a+he(this,cn)){const o=t.range.left-t.bounds.left-he(this,cn);return`${s-i/2+o}px`}if(s>r-he(this,hn)){const o=t.bounds.right-t.range.right-he(this,hn);return`${s+i/2-o-t.range.width}px`}return 0},"getBoxShiftPosition_fn");Jl=new WeakSet;nv=n(function(t){const e=[...he(this,uo)].some(p=>t.composedPath().includes(p));if(!this.dragging&&(e||!t.composedPath().includes(this))){Ne(this,mn,vo).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=ke(this.shadowRoot,"#preview-rail"),r=ke(this.shadowRoot,'[part~="preview-box"]'),s=Ne(this,ho,Iu).call(this,he(this,co));let o=(t.clientX-s.range.left)/s.range.width;o=Math.max(0,Math.min(1,o));const l=Ne(this,mo,Ru).call(this,s,o),d=Ne(this,po,Cu).call(this,s,o);a.style.transform=`translateX(${l})`,a.style.setProperty("--_range-width",`${s.range.width}`),r.style.setProperty("--_box-shift",`${d}`),r.style.setProperty("--_box-width",`${s.box.width}px`);const u=Math.round(he(this,zr))-Math.round(o*i);Math.abs(u)<1&&o>.01&&o<.99||(it(this,zr,o*i),Ne(this,mn,vo).call(this,he(this,zr)))},"handlePointerMove_fn");mn=new WeakSet;vo=n(function(t){this.dispatchEvent(new E.CustomEvent(R.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))},"previewRequest_fn");ed=new WeakSet;sv=n(function(){he(this,Ji).stop();const t=ov(this);this.dispatchEvent(new E.CustomEvent(R.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))},"seekRequest_fn");Du.shadowRootOptions={mode:"open"};Du.getTemplateHTML=ay;E.customElements.get("media-time-range")||E.customElements.define("media-time-range",Du);const ry=1,ny=n(t=>t.mediaMuted?0:t.mediaVolume,"toVolume"),sy=n(t=>`${Math.round(t*100)}%`,"formatAsPercentString");class oy extends or{static{n(this,"MediaVolumeRange")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_VOLUME,c.MEDIA_MUTED,c.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{const e=this.range.value,i=new E.CustomEvent(R.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",D("volume"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===c.MEDIA_VOLUME||e===c.MEDIA_MUTED)&&(this.range.valueAsNumber=ny(this),this.range.setAttribute("aria-valuetext",sy(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return ae(this,c.MEDIA_VOLUME,ry)}set mediaVolume(e){ce(this,c.MEDIA_VOLUME,e)}get mediaMuted(){return F(this,c.MEDIA_MUTED)}set mediaMuted(e){K(this,c.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return re(this,c.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){ne(this,c.MEDIA_VOLUME_UNAVAILABLE,e)}}E.customElements.get("media-volume-range")||E.customElements.define("media-volume-range",oy);function ly(t){return`
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

        :host([${c.MEDIA_LOOP}]) #checked-indicator {
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
    `}n(ly,"getSlotTemplateHTML$5");function dy(){return D("Loop")}n(dy,"getTooltipContentHTML$5");class Lu extends De{static{n(this,"MediaLoopButton")}constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=D("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return F(this,c.MEDIA_LOOP)}set mediaLoop(e){K(this,c.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new E.CustomEvent(R.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}}Lu.getSlotTemplateHTML=ly;Lu.getTooltipContentHTML=dy;E.customElements.get("media-loop-button")||E.customElements.define("media-loop-button",Lu);var lv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$8"),H=n((t,e,i)=>(lv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$8"),Bt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$8"),ti=n((t,e,i,a)=>(lv(t,e,"write to private field"),e.set(t,i),i),"__privateSet$7"),La,ks,$i,Ur,fi,Ei,_i,Ui,Ma,Ss,vt;const yh=1,Th=0,uy=1,cy={processCallback(t,e,i){if(i){for(const[a,r]of e)if(a in i){const s=i[a];typeof s=="boolean"&&r instanceof yt&&typeof r.element[r.attributeName]=="boolean"?r.booleanValue=s:typeof s=="function"&&r instanceof yt?r.element[r.attributeName]=s:r.value=s}}}};class Fo extends E.DocumentFragment{static{n(this,"TemplateInstance")}constructor(e,i,a=cy){var r;super(),Bt(this,La,void 0),Bt(this,ks,void 0),this.append(e.content.cloneNode(!0)),ti(this,La,dv(this)),ti(this,ks,a),(r=a.createCallback)==null||r.call(a,this,H(this,La),i),a.processCallback(this,H(this,La),i)}update(e){H(this,ks).processCallback(this,H(this,La),e)}}La=new WeakMap;ks=new WeakMap;const dv=n((t,e=[])=>{let i,a;for(const r of t.attributes||[])if(r.value.includes("{{")){const s=new my;for([i,a]of kh(r.value))if(!i)s.append(a);else{const o=new yt(t,r.name,r.namespaceURI);s.append(o),e.push([a,o])}r.value=s.toString()}for(const r of t.childNodes)if(r.nodeType===yh&&!(r instanceof HTMLTemplateElement))dv(r,e);else{const s=r.data;if(r.nodeType===yh||s.includes("{{")){const o=[];if(s)for([i,a]of kh(s))if(!i)o.push(new Text(a));else{const l=new lr(t);o.push(l),e.push([a,l])}else if(r instanceof HTMLTemplateElement){const l=new hv(t,r);o.push(l),e.push([l.expression,l])}r.replaceWith(...o.flatMap(l=>l.replacementNodes||[l]))}}return e},"parse"),Ah={},kh=n(t=>{let e="",i=0,a=Ah[t],r=0,s;if(a)return a;for(a=[];s=t[r];r++)s==="{"&&t[r+1]==="{"&&t[r-1]!=="\\"&&t[r+2]&&++i==1?(e&&a.push([Th,e]),e="",r++):s==="}"&&t[r+1]==="}"&&t[r-1]!=="\\"&&!--i?(a.push([uy,e.trim()]),e="",r++):e+=s||"";return e&&a.push([Th,(i>0?"{{":"")+e]),Ah[t]=a},"tokenize$1"),hy=11;class uv{static{n(this,"Part")}get value(){return""}set value(e){}toString(){return this.value}}const cv=new WeakMap;class my{static{n(this,"AttrPartList")}constructor(){Bt(this,$i,[])}[Symbol.iterator](){return H(this,$i).values()}get length(){return H(this,$i).length}item(e){return H(this,$i)[e]}append(...e){for(const i of e)i instanceof yt&&cv.set(i,this),H(this,$i).push(i)}toString(){return H(this,$i).join("")}}$i=new WeakMap;class yt extends uv{static{n(this,"AttrPart")}constructor(e,i,a){super(),Bt(this,Ui),Bt(this,Ur,""),Bt(this,fi,void 0),Bt(this,Ei,void 0),Bt(this,_i,void 0),ti(this,fi,e),ti(this,Ei,i),ti(this,_i,a)}get attributeName(){return H(this,Ei)}get attributeNamespace(){return H(this,_i)}get element(){return H(this,fi)}get value(){return H(this,Ur)}set value(e){H(this,Ur)!==e&&(ti(this,Ur,e),!H(this,Ui,Ma)||H(this,Ui,Ma).length===1?e==null?H(this,fi).removeAttributeNS(H(this,_i),H(this,Ei)):H(this,fi).setAttributeNS(H(this,_i),H(this,Ei),e):H(this,fi).setAttributeNS(H(this,_i),H(this,Ei),H(this,Ui,Ma).toString()))}get booleanValue(){return H(this,fi).hasAttributeNS(H(this,_i),H(this,Ei))}set booleanValue(e){if(!H(this,Ui,Ma)||H(this,Ui,Ma).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}}Ur=new WeakMap;fi=new WeakMap;Ei=new WeakMap;_i=new WeakMap;Ui=new WeakSet;Ma=n(function(){return cv.get(this)},"list_get");class lr extends uv{static{n(this,"ChildNodePart")}constructor(e,i){super(),Bt(this,Ss,void 0),Bt(this,vt,void 0),ti(this,Ss,e),ti(this,vt,i?[...i]:[new Text])}get replacementNodes(){return H(this,vt)}get parentNode(){return H(this,Ss)}get nextSibling(){return H(this,vt)[H(this,vt).length-1].nextSibling}get previousSibling(){return H(this,vt)[0].previousSibling}get value(){return H(this,vt).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){const i=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===hy?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);i.length||i.push(new Text),ti(this,vt,py(H(this,vt)[0].parentNode,H(this,vt),i,this.nextSibling))}}Ss=new WeakMap;vt=new WeakMap;class hv extends lr{static{n(this,"InnerTemplatePart")}constructor(e,i){const a=i.getAttribute("directive")||i.getAttribute("type");let r=i.getAttribute("expression")||i.getAttribute(a)||"";r.startsWith("{{")&&(r=r.trim().slice(2,-2).trim()),super(e),this.expression=r,this.template=i,this.directive=a}}function py(t,e,i,a=null){let r=0,s,o,l,d=i.length,u=e.length;for(;r<d&&r<u&&e[r]==i[r];)r++;for(;r<d&&r<u&&i[d-1]==e[u-1];)a=i[--u,--d];if(r==u)for(;r<d;)t.insertBefore(i[r++],a);if(r==d)for(;r<u;)t.removeChild(e[r++]);else{for(s=e[r];r<d;)l=i[r++],o=s?s.nextSibling:a,s==l?s=o:r<d&&i[r]==o?(t.replaceChild(l,s),s=o):t.insertBefore(l,s);for(;s!=a;)o=s.nextSibling,t.removeChild(s),s=o}return i}n(py,"swapdom");const Sh={string:n(t=>String(t),"string")};class mv{static{n(this,"PartialTemplate")}constructor(e){this.template=e,this.state=void 0}}const Gi=new WeakMap,Qi=new WeakMap,td={partial:n((t,e)=>{e[t.expression]=new mv(t.template)},"partial"),if:n((t,e)=>{var i;if(pv(t.expression,e))if(Gi.get(t)!==t.template){Gi.set(t,t.template);const a=new Fo(t.template,e,Mu);t.replace(a),Qi.set(t,a)}else(i=Qi.get(t))==null||i.update(e);else t.replace(""),Gi.delete(t),Qi.delete(t)},"if")},vy=Object.keys(td),Mu={processCallback(t,e,i){var a,r;if(i)for(const[s,o]of e){if(o instanceof hv){if(!o.directive){const d=vy.find(u=>o.template.hasAttribute(u));d&&(o.directive=d,o.expression=o.template.getAttribute(d))}(a=td[o.directive])==null||a.call(td,o,i);continue}let l=pv(s,i);if(l instanceof mv){Gi.get(o)!==l.template?(Gi.set(o,l.template),l=new Fo(l.template,l.state,Mu),o.value=l,Qi.set(o,l)):(r=Qi.get(o))==null||r.update(l.state);continue}l?(o instanceof yt&&o.attributeName.startsWith("aria-")&&(l=String(l)),o instanceof yt?typeof l=="boolean"?o.booleanValue=l:typeof l=="function"?o.element[o.attributeName]=l:o.value=l:(o.value=l,Gi.delete(o),Qi.delete(o))):o instanceof yt?o.value=void 0:(o.value=void 0,Gi.delete(o),Qi.delete(o))}}},wh={"!":n(t=>!t,"!"),"!!":n(t=>!!t,"!!"),"==":n((t,e)=>t==e,"=="),"!=":n((t,e)=>t!=e,"!="),">":n((t,e)=>t>e,">"),">=":n((t,e)=>t>=e,">="),"<":n((t,e)=>t<e,"<"),"<=":n((t,e)=>t<=e,"<="),"??":n((t,e)=>t??e,"??"),"|":n((t,e)=>{var i;return(i=Sh[e])==null?void 0:i.call(Sh,t)},"|")};function fy(t){return Ey(t,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}n(fy,"tokenizeExpression");function pv(t,e={}){var i,a,r,s,o,l,d;const u=fy(t);if(u.length===0||u.some(({type:p})=>!p))return Er(t);if(((i=u[0])==null?void 0:i.token)===">"){const p=e[(a=u[1])==null?void 0:a.token];if(!p)return Er(t);const v={...e};p.state=v;const m=u.slice(2);for(let h=0;h<m.length;h+=3){const f=(r=m[h])==null?void 0:r.token,_=(s=m[h+1])==null?void 0:s.token,g=(o=m[h+2])==null?void 0:o.token;f&&_==="="&&(v[f]=_r(g,e))}return p}if(u.length===1)return $n(u[0])?_r(u[0].token,e):Er(t);if(u.length===2){const p=(l=u[0])==null?void 0:l.token,v=wh[p];if(!v||!$n(u[1]))return Er(t);const m=_r(u[1].token,e);return v(m)}if(u.length===3){const p=(d=u[1])==null?void 0:d.token,v=wh[p];if(!v||!$n(u[0])||!$n(u[2]))return Er(t);const m=_r(u[0].token,e);if(p==="|")return v(m,u[2].token);const h=_r(u[2].token,e);return v(m,h)}}n(pv,"evaluateExpression");function Er(t){return console.warn(`Warning: invalid expression \`${t}\``),!1}n(Er,"invalidExpression");function $n({type:t}){return["number","boolean","string","param"].includes(t)}n($n,"isValidParam");function _r(t,e){const i=t[0],a=t.slice(-1);return t==="true"||t==="false"?t==="true":i===a&&["'",'"'].includes(i)?t.slice(1,-1):Xm(t)?parseFloat(t):e[t]}n(_r,"getParamValue");function Ey(t,e){let i,a,r;const s=[];for(;t;){r=null,i=t.length;for(const o in e)a=e[o].exec(t),a&&a.index<i&&(r={token:a[0],type:o,matches:a.slice(1)},i=a.index);i&&s.push({token:t.substr(0,i),type:void 0}),r&&s.push(r),t=t.substr(i+(r?r.token.length:0))}return s}n(Ey,"tokenize");var xu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$7"),id=n((t,e,i)=>(xu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$7"),br=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$7"),Zi=n((t,e,i,a)=>(xu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$6"),dl=n((t,e,i)=>(xu(t,e,"access private method"),i),"__privateMethod$7"),Ya,ws,Ga,ad,vv,Is,rd;const ul={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},fv=ye.createElement("template");fv.innerHTML=`
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
`;class Ko extends E.HTMLElement{static{n(this,"MediaThemeElement")}constructor(){super(),br(this,ad),br(this,Is),br(this,Ya,void 0),br(this,ws,void 0),br(this,Ga,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer());const e=new MutationObserver(i=>{var a;this.mediaController&&!((a=this.mediaController)!=null&&a.breakpointsComputed)||i.some(r=>{const s=r.target;return s===this?!0:s.localName!=="media-controller"?!1:!!(ul[r.attributeName]||r.attributeName.startsWith("breakpoint"))})&&this.render()});e.observe(this,{attributes:!0}),e.observe(this.renderRoot,{attributes:!0,subtree:!0}),this.addEventListener(ni.BREAKPOINTS_COMPUTED,this.render),dl(this,ad,vv).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=id(this,Ya))!=null?e:this.constructor.template}set template(e){if(e===null){this.removeAttribute("template");return}typeof e=="string"?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(Zi(this,Ya,e),Zi(this,Ga,null),this.createRenderer())}get props(){var e,i,a;const r=[...Array.from((i=(e=this.mediaController)==null?void 0:e.attributes)!=null?i:[]).filter(({name:o})=>ul[o]||o.startsWith("breakpoint")),...Array.from(this.attributes)],s={};for(const o of r){const l=(a=ul[o.name])!=null?a:yg(o.name);let{value:d}=o;d!=null?(Xm(d)&&(d=parseFloat(d)),s[l]=d===""?!0:d):s[l]=!1}return s}attributeChangedCallback(e,i,a){e==="template"&&i!=a&&dl(this,Is,rd).call(this)}connectedCallback(){dl(this,Is,rd).call(this)}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==id(this,ws)&&(Zi(this,ws,this.template),this.renderer=new Fo(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(fv.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}}Ya=new WeakMap;ws=new WeakMap;Ga=new WeakMap;ad=new WeakSet;vv=n(function(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}},"upgradeProperty_fn");Is=new WeakSet;rd=n(function(){var t;const e=this.getAttribute("template");if(!e||e===id(this,Ga))return;const i=this.getRootNode(),a=(t=i?.getElementById)==null?void 0:t.call(i,e);if(a){Zi(this,Ga,e),Zi(this,Ya,a),this.createRenderer();return}_y(e)&&(Zi(this,Ga,e),by(e).then(r=>{const s=ye.createElement("template");s.innerHTML=r,Zi(this,Ya,s),this.createRenderer()}).catch(console.error))},"updateTemplate_fn");Ko.observedAttributes=["template"];Ko.processor=Mu;function _y(t){if(!/^(\/|\.\/|https?:\/\/)/.test(t))return!1;const e=/^https?:\/\//.test(t)?void 0:location.origin;try{new URL(t,e)}catch{return!1}return!0}n(_y,"isValidUrl");async function by(t){const e=await fetch(t);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}n(by,"request");E.customElements.get("media-theme")||E.customElements.define("media-theme",Ko);function gy({anchor:t,floating:e,placement:i}){const a=yy({anchor:t,floating:e}),{x:r,y:s}=Ay(a,i);return{x:r,y:s}}n(gy,"computePosition");function yy({anchor:t,floating:e}){return{anchor:Ty(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}n(yy,"getElementRects");function Ty(t,e){var i;const a=t.getBoundingClientRect(),r=(i=e?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}n(Ty,"getRectRelativeToOffsetParent");function Ay({anchor:t,floating:e},i){const a=ky(i)==="x"?"y":"x",r=a==="y"?"height":"width",s=Ev(i),o=t.x+t.width/2-e.width/2,l=t.y+t.height/2-e.height/2,d=t[r]/2-e[r]/2;let u;switch(s){case"top":u={x:o,y:t.y-e.height};break;case"bottom":u={x:o,y:t.y+t.height};break;case"right":u={x:t.x+t.width,y:l};break;case"left":u={x:t.x-e.width,y:l};break;default:u={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":u[a]-=d;break;case"end":u[a]+=d;break}return u}n(Ay,"computeCoordsFromPlacement");function Ev(t){return t.split("-")[0]}n(Ev,"getSide");function ky(t){return["top","bottom"].includes(Ev(t))?"y":"x"}n(ky,"getSideAxis");class Ou extends Event{static{n(this,"InvokeEvent")}constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}}class Sy extends Event{static{n(this,"ToggleEvent")}constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}}var Nu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$6"),q=n((t,e,i)=>(Nu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$6"),X=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$6"),Pt=n((t,e,i,a)=>(Nu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$5"),J=n((t,e,i)=>(Nu(t,e,"access private method"),i),"__privateMethod$6"),$t,ea,wi,Rs,Cs,ta,pn,nd,_v,fo,Pu,Eo,Ds,sd,od,bv,ld,gv,dd,yv,Qa,Za,za,vn,_o,$u,ud,Tv,Uu,Av,cd,kv,Hu,Sv,hd,wv,md,Iv,jr,bo,pd,Rv,Xr,go,Ls,vd;function ir({type:t,text:e,value:i,checked:a}){const r=ye.createElement("media-chrome-menu-item");r.type=t,r.part.add("menu-item"),r.part.add(t),r.value=i,r.checked=a;const s=ye.createElement("span");return s.textContent=e,r.append(s),r}n(ir,"createMenuItem");function ia(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}n(ia,"createIndicator");function wy(t){return`
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
  `}n(wy,"getTemplateHTML$6");const Li={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"};class lt extends E.HTMLElement{static{n(this,"MediaChromeMenu")}constructor(){if(super(),X(this,nd),X(this,fo),X(this,Ds),X(this,od),X(this,ld),X(this,dd),X(this,za),X(this,_o),X(this,ud),X(this,Uu),X(this,cd),X(this,Hu),X(this,hd),X(this,md),X(this,jr),X(this,pd),X(this,Xr),X(this,Ls),X(this,$t,null),X(this,ea,null),X(this,wi,null),X(this,Rs,new Set),X(this,Cs,void 0),X(this,ta,!1),X(this,pn,null),X(this,Eo,()=>{const e=q(this,Rs),i=new Set(this.items);for(const a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(const a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));Pt(this,Rs,i)}),X(this,Qa,()=>{J(this,za,vn).call(this),J(this,_o,$u).call(this,!1)}),X(this,Za,()=>{J(this,za,vn).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),this.shadowRoot.addEventListener("slotchange",this),Pt(this,Cs,new MutationObserver(q(this,Eo))),q(this,Cs).observe(this.defaultSlot,{childList:!0})}static get observedAttributes(){return[Li.DISABLED,Li.HIDDEN,Li.STYLE,Li.ANCHOR,Y.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":J(this,nd,_v).call(this,e);break;case"invoke":J(this,od,bv).call(this,e);break;case"click":J(this,ud,Tv).call(this,e);break;case"toggle":J(this,cd,kv).call(this,e);break;case"focusout":J(this,hd,wv).call(this,e);break;case"keydown":J(this,md,Iv).call(this,e);break}}connectedCallback(){var e,i;Pt(this,pn,Jd(this.shadowRoot,":host")),J(this,Ds,sd).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),Pt(this,$t,Cl(this)),(i=(e=q(this,$t))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(Ja(fn(this),q(this,Qa)),Ja(this,q(this,Za))),J(this,fo,Pu).call(this)}disconnectedCallback(){var e,i;er(fn(this),q(this,Qa)),er(this,q(this,Za)),this.disable(),(i=(e=q(this,$t))==null?void 0:e.unassociateElement)==null||i.call(e,this),Pt(this,$t,null)}attributeChangedCallback(e,i,a){var r,s,o,l;e===Li.HIDDEN&&a!==i?(q(this,ta)||Pt(this,ta,!0),this.hidden?J(this,dd,yv).call(this):J(this,ld,gv).call(this),this.dispatchEvent(new Sy({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===Y.MEDIA_CONTROLLER?(i&&((s=(r=q(this,$t))==null?void 0:r.unassociateElement)==null||s.call(r,this),Pt(this,$t,null)),a&&this.isConnected&&(Pt(this,$t,Cl(this)),(l=(o=q(this,$t))==null?void 0:o.associateElement)==null||l.call(o,this))):e===Li.DISABLED&&a!==i?a==null?this.enable():this.disable():e===Li.STYLE&&a!==i&&J(this,Ds,sd).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=Lo(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(Iy)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){const i=this.items.find(a=>a.value===e);i&&J(this,Ls,vd).call(this,i)}focus(){if(Pt(this,ea,Xd()),this.items.length){J(this,Xr,go).call(this,this.items[0]),this.items[0].focus();return}const e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e?.focus()}handleSelect(e){var i;const a=J(this,jr,bo).call(this,e);a&&(J(this,Ls,vd).call(this,a,a.type==="checkbox"),q(this,wi)&&!this.hidden&&((i=q(this,ea))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;const{key:r}=e,s=this.items,o=(a=(i=J(this,jr,bo).call(this,e))!=null?i:J(this,pd,Rv).call(this))!=null?a:s[0],l=s.indexOf(o);let d=Math.max(0,l);r==="ArrowDown"?d++:r==="ArrowUp"?d--:e.key==="Home"?d=0:e.key==="End"&&(d=s.length-1),d<0&&(d=s.length-1),d>s.length-1&&(d=0),J(this,Xr,go).call(this,s[d]),s[d].focus()}}$t=new WeakMap;ea=new WeakMap;wi=new WeakMap;Rs=new WeakMap;Cs=new WeakMap;ta=new WeakMap;pn=new WeakMap;nd=new WeakSet;_v=n(function(t){const e=t.target;for(const i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(e.name)&&J(this,fo,Pu).call(this),e.name||q(this,Eo).call(this)},"handleSlotChange_fn$1");fo=new WeakSet;Pu=n(function(){const t=this.shadowRoot.querySelector('slot[name="header"]'),e=this.shadowRoot.querySelector('slot[name="title"]');t.hidden=e.assignedNodes().length===0&&t.assignedNodes().length===0},"toggleHeader_fn");Eo=new WeakMap;Ds=new WeakSet;sd=n(function(){var t;const e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")},"updateLayoutStyle_fn");od=new WeakSet;bv=n(function(t){Pt(this,wi,t.relatedTarget),oi(this,t.relatedTarget)||(this.hidden=!this.hidden)},"handleInvoke_fn");ld=new WeakSet;gv=n(function(){var t;(t=q(this,wi))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),Ja(fn(this),q(this,Qa)),Ja(this,q(this,Za))},"handleOpen_fn");dd=new WeakSet;yv=n(function(){var t;(t=q(this,wi))==null||t.setAttribute("aria-expanded","false"),er(fn(this),q(this,Qa)),er(this,q(this,Za))},"handleClosed_fn");Qa=new WeakMap;Za=new WeakMap;za=new WeakSet;vn=n(function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:e,y:i}=gy({anchor:this.anchorElement,floating:this,placement:"top-start"});t??(t=this.offsetWidth);const r=fn(this).getBoundingClientRect(),s=r.width-e-t,o=r.height-i-this.offsetHeight,{style:l}=q(this,pn);l.setProperty("position","absolute"),l.setProperty("right",`${Math.max(0,s)}px`),l.setProperty("--_menu-bottom",`${o}px`);const d=getComputedStyle(this),p=l.getPropertyValue("--_menu-bottom")===d.bottom?o:parseFloat(d.bottom),v=r.height-p-parseFloat(d.marginBottom);this.style.setProperty("--_menu-max-height",`${v}px`)},"positionMenu_fn");_o=new WeakSet;$u=n(function(t){const e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e?.querySelector('[role="menu"]'),{style:a}=q(this,pn);if(t||a.setProperty("--media-menu-transition-in","none"),i){const r=i.offsetHeight,s=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${s}px`),this.style.setProperty("min-height",`${r}px`),J(this,za,vn).call(this,s)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),J(this,za,vn).call(this);a.removeProperty("--media-menu-transition-in")},"resizeMenu_fn");ud=new WeakSet;Tv=n(function(t){var e;if(t.stopPropagation(),t.composedPath().includes(q(this,Uu,Av))){(e=q(this,ea))==null||e.focus(),this.hidden=!0;return}const i=J(this,jr,bo).call(this,t);!i||i.hasAttribute("disabled")||(J(this,Xr,go).call(this,i),this.handleSelect(t))},"handleClick_fn");Uu=new WeakSet;Av=n(function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))},"backButtonElement_get");cd=new WeakSet;kv=n(function(t){if(t.target===this)return;J(this,Hu,Sv).call(this);const e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new Ou({relatedTarget:i}));for(const i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);J(this,_o,$u).call(this,!0)},"handleToggle_fn");Hu=new WeakSet;Sv=n(function(){const e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)},"checkSubmenuHasExpanded_fn");hd=new WeakSet;wv=n(function(t){var e;oi(this,t.relatedTarget)||(q(this,ta)&&((e=q(this,ea))==null||e.focus()),q(this,wi)&&q(this,wi)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))},"handleFocusOut_fn");md=new WeakSet;Iv=n(function(t){var e,i,a,r,s;const{key:o,ctrlKey:l,altKey:d,metaKey:u}=t;if(!(l||d||u)&&this.keysUsed.includes(o))if(t.preventDefault(),t.stopPropagation(),o==="Tab"){if(q(this,ta)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else o==="Escape"?((s=q(this,ea))==null||s.focus(),q(this,ta)&&(this.hidden=!0)):o==="Enter"||o===" "?this.handleSelect(t):this.handleMove(t)},"handleKeyDown_fn$1");jr=new WeakSet;bo=n(function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))},"getItem_fn");pd=new WeakSet;Rv=n(function(){return this.items.find(t=>t.tabIndex===0)},"getTabItem_fn");Xr=new WeakSet;go=n(function(t){for(const e of this.items)e.tabIndex=e===t?0:-1},"setTabItem_fn");Ls=new WeakSet;vd=n(function(t,e){const i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))},"selectItem_fn");lt.shadowRootOptions={mode:"open"};lt.getTemplateHTML=wy;function Iy(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t?.role)}n(Iy,"isMenuItem");function fn(t){var e;return(e=t.getAttribute("bounds")?nr(t,`#${t.getAttribute("bounds")}`):Be(t)||t.parentElement)!=null?e:t}n(fn,"getBoundsElement");E.customElements.get("media-chrome-menu")||E.customElements.define("media-chrome-menu",lt);var Bu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$5"),Kt=n((t,e,i)=>(Bu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$5"),Zt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$5"),cl=n((t,e,i,a)=>(Bu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$4"),gt=n((t,e,i)=>(Bu(t,e,"access private method"),i),"__privateMethod$5"),Ms,Jr,fd,Cv,yo,Wu,Fu,Dv,Vt,ar,En,Ed,Lv,xs,_d;function Ry(t){return`
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
  `}n(Ry,"getTemplateHTML$5");function Cy(t){return""}n(Cy,"getSuffixSlotInnerHTML$1");const tt={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"};class Ri extends E.HTMLElement{static{n(this,"MediaChromeMenuItem")}constructor(){if(super(),Zt(this,fd),Zt(this,yo),Zt(this,Fu),Zt(this,ar),Zt(this,Ed),Zt(this,xs),Zt(this,Ms,!1),Zt(this,Jr,void 0),Zt(this,Vt,()=>{var e,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],s=(i=r?.dataset.description)!=null?i:r?.text,o=ye.createElement("span");o.textContent=s??"",a.replaceChildren(o)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=Je(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.shadowRoot.addEventListener("slotchange",this)}static get observedAttributes(){return[tt.TYPE,tt.DISABLED,tt.CHECKED,tt.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),gr(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":gt(this,fd,Cv).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":gt(this,Ed,Lv).call(this,e);break;case"keyup":gt(this,ar,En).call(this,e);break}}attributeChangedCallback(e,i,a){e===tt.CHECKED&&gr(this)&&!Kt(this,Ms)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===tt.TYPE&&a!==i?this.role="menuitem"+a:e===tt.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(tt.DISABLED)||this.enable(),this.role="menuitem"+this.type,cl(this,Jr,bd(this,this.parentNode)),gt(this,xs,_d).call(this),this.submenuElement&&gt(this,yo,Wu).call(this)}disconnectedCallback(){this.disable(),gt(this,xs,_d).call(this),cl(this,Jr,null)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=Lo(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(tt.TYPE))!=null?e:""}set type(e){this.setAttribute(tt.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(tt.VALUE))!=null?e:this.text}set value(e){this.setAttribute(tt.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(gr(this))return this.getAttribute("aria-checked")==="true"}set checked(e){gr(this)&&(cl(this,Ms,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){gr(this)||this.invokeTargetElement&&oi(this,e.target)&&this.invokeTargetElement.dispatchEvent(new Ou({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}}Ms=new WeakMap;Jr=new WeakMap;fd=new WeakSet;Cv=n(function(t){const e=t.target;if(!e?.name)for(const a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?gt(this,yo,Wu).call(this):gt(this,Fu,Dv).call(this))},"handleSlotChange_fn");yo=new WeakSet;Wu=n(async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",Kt(this,Vt)),this.submenuElement.addEventListener("addmenuitem",Kt(this,Vt)),this.submenuElement.addEventListener("removemenuitem",Kt(this,Vt)),Kt(this,Vt).call(this)},"submenuConnected_fn");Fu=new WeakSet;Dv=n(function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",Kt(this,Vt)),this.submenuElement.removeEventListener("addmenuitem",Kt(this,Vt)),this.submenuElement.removeEventListener("removemenuitem",Kt(this,Vt)),Kt(this,Vt).call(this)},"submenuDisconnected_fn");Vt=new WeakMap;ar=new WeakSet;En=n(function(t){const{key:e}=t;if(!this.keysUsed.includes(e)){this.removeEventListener("keyup",gt(this,ar,En));return}this.handleClick(t)},"handleKeyUp_fn");Ed=new WeakSet;Lv=n(function(t){const{metaKey:e,altKey:i,key:a}=t;if(e||i||!this.keysUsed.includes(a)){this.removeEventListener("keyup",gt(this,ar,En));return}this.addEventListener("keyup",gt(this,ar,En),{once:!0})},"handleKeyDown_fn");xs=new WeakSet;_d=n(function(){var t;const e=(t=Kt(this,Jr))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(const a of e)a.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")},"reset_fn");Ri.shadowRootOptions={mode:"open"};Ri.getTemplateHTML=Ry;Ri.getSuffixSlotInnerHTML=Cy;function gr(t){return t.type==="radio"||t.type==="checkbox"}n(gr,"isCheckable");function bd(t,e){if(!t)return null;const{host:i}=t.getRootNode();return!e&&i?bd(t,i):e?.items?e:bd(e,e?.parentNode)}n(bd,"closestMenuItemsContainer");E.customElements.get("media-chrome-menu-item")||E.customElements.define("media-chrome-menu-item",Ri);function Dy(t){return`
    ${lt.getTemplateHTML(t)}
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
  `}n(Dy,"getTemplateHTML$4");class Mv extends lt{static{n(this,"MediaSettingsMenu")}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Be(this).querySelector("media-settings-menu-button")}}Mv.getTemplateHTML=Dy;E.customElements.get("media-settings-menu")||E.customElements.define("media-settings-menu",Mv);function Ly(t){return`
    ${Ri.getTemplateHTML.call(this,t)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}n(Ly,"getTemplateHTML$3");function My(t){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}n(My,"getSuffixSlotInnerHTML");class Vo extends Ri{static{n(this,"MediaSettingsMenuItem")}}Vo.shadowRootOptions={mode:"open"};Vo.getTemplateHTML=Ly;Vo.getSuffixSlotInnerHTML=My;E.customElements.get("media-settings-menu-item")||E.customElements.define("media-settings-menu-item",Vo);class dr extends De{static{n(this,"MediaChromeMenuButton")}connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=Lo(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new Ou({relatedTarget:this}))}}E.customElements.get("media-chrome-menu-button")||E.customElements.define("media-chrome-menu-button",dr);function xy(){return`
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
  `}n(xy,"getSlotTemplateHTML$4");function Oy(){return D("Settings")}n(Oy,"getTooltipContentHTML$4");class Ku extends dr{static{n(this,"MediaSettingsMenuButton")}static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",D("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Be(this).querySelector("media-settings-menu")}}Ku.getSlotTemplateHTML=xy;Ku.getTooltipContentHTML=Oy;E.customElements.get("media-settings-menu-button")||E.customElements.define("media-settings-menu-button",Ku);var Vu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$4"),xv=n((t,e,i)=>(Vu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$4"),Un=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$4"),gd=n((t,e,i,a)=>(Vu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$3"),Hn=n((t,e,i)=>(Vu(t,e,"access private method"),i),"__privateMethod$4"),Hr,To,Os,yd,Ns,Td;class Ny extends lt{static{n(this,"MediaAudioTrackMenu")}constructor(){super(...arguments),Un(this,Os),Un(this,Ns),Un(this,Hr,[]),Un(this,To,void 0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_AUDIO_TRACK_LIST,c.MEDIA_AUDIO_TRACK_ENABLED,c.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===c.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(gd(this,Hr,_g(a??"")),Hn(this,Os,yd).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Hn(this,Ns,Td))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Hn(this,Ns,Td))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=Be(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return xv(this,Hr)}set mediaAudioTrackList(e){gd(this,Hr,e),Hn(this,Os,yd).call(this)}get mediaAudioTrackEnabled(){var e;return(e=re(this,c.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){ne(this,c.MEDIA_AUDIO_TRACK_ENABLED,e)}}Hr=new WeakMap;To=new WeakMap;Os=new WeakSet;yd=n(function(){if(xv(this,To)===JSON.stringify(this.mediaAudioTrackList))return;gd(this,To,JSON.stringify(this.mediaAudioTrackList));const t=this.mediaAudioTrackList;this.defaultSlot.textContent="",t.sort((e,i)=>e.id.localeCompare(i.id,void 0,{numeric:!0}));for(const e of t){const i=this.formatMenuItemText(e.label,e),a=ir({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(ia(this,"checked-indicator")),this.defaultSlot.append(a)}},"render_fn$3");Ns=new WeakSet;Td=n(function(){if(this.value==null)return;const t=new E.CustomEvent(R.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn$3");E.customElements.get("media-audio-track-menu")||E.customElements.define("media-audio-track-menu",Ny);const Py=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function $y(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${Py}</slot>
  `}n($y,"getSlotTemplateHTML$3");function Uy(){return D("Audio")}n(Uy,"getTooltipContentHTML$3");const Ih=n(t=>{const e=D("Audio");t.setAttribute("aria-label",e)},"updateAriaLabel$1");class qu extends dr{static{n(this,"MediaAudioTrackMenuButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_AUDIO_TRACK_ENABLED,c.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Ih(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_LANG&&Ih(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Be(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=re(this,c.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){ne(this,c.MEDIA_AUDIO_TRACK_ENABLED,e)}}qu.getSlotTemplateHTML=$y;qu.getTooltipContentHTML=Uy;E.customElements.get("media-audio-track-menu-button")||E.customElements.define("media-audio-track-menu-button",qu);var Yu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$3"),Hy=n((t,e,i)=>(Yu(t,e,"read from private field"),e.get(t)),"__privateGet$3"),hl=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$3"),By=n((t,e,i,a)=>(Yu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$2"),Bn=n((t,e,i)=>(Yu(t,e,"access private method"),i),"__privateMethod$3"),Ao,Ps,Ad,$s,kd;const Wy=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function Fy(t){return`
    ${lt.getTemplateHTML(t)}
    <slot name="captions-indicator" hidden>${Wy}</slot>
  `}n(Fy,"getTemplateHTML$2");class Ov extends lt{static{n(this,"MediaCaptionsMenu")}constructor(){super(...arguments),hl(this,Ps),hl(this,$s),hl(this,Ao,void 0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_LIST&&i!==a?Bn(this,Ps,Ad).call(this):e===c.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a||"",Bn(this,Ps,Ad).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Bn(this,$s,kd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Bn(this,$s,kd))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Be(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return Rh(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Ch(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Rh(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Ch(this,c.MEDIA_SUBTITLES_SHOWING,e)}}Ao=new WeakMap;Ps=new WeakSet;Ad=n(function(){var t;const e=Hy(this,Ao)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(c.MEDIA_SUBTITLES_SHOWING);if(!e&&!i)return;By(this,Ao,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const a=!this.value,r=ir({type:"radio",text:this.formatMenuItemText(D("Off")),value:"off",checked:a});r.prepend(ia(this,"checked-indicator")),this.defaultSlot.append(r);const s=this.mediaSubtitlesList;for(const o of s){const l=ir({type:"radio",text:this.formatMenuItemText(o.label,o),value:xl(o),checked:this.value==xl(o)});l.prepend(ia(this,"checked-indicator")),((t=o.kind)!=null?t:"subs")==="captions"&&l.append(ia(this,"captions-indicator")),this.defaultSlot.append(l)}},"render_fn$2");$s=new WeakSet;kd=n(function(){const t=this.mediaSubtitlesShowing,e=this.getAttribute(c.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t?.length&&i&&this.dispatchEvent(new E.CustomEvent(R.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;const a=new E.CustomEvent(R.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)},"onChange_fn$2");Ov.getTemplateHTML=Fy;const Rh=n((t,e)=>{const i=t.getAttribute(e);return i?Po(i):[]},"getSubtitlesListAttr$1"),Ch=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=dn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr$1");E.customElements.get("media-captions-menu")||E.customElements.define("media-captions-menu",Ov);const Ky=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Vy=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function qy(){return`
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
      <slot name="on">${Ky}</slot>
      <slot name="off">${Vy}</slot>
    </slot>
  `}n(qy,"getSlotTemplateHTML$2");function Yy(){return D("Captions")}n(Yy,"getTooltipContentHTML$2");const Dh=n(t=>{t.setAttribute("data-captions-enabled",_p(t).toString())},"updateAriaChecked"),Lh=n(t=>{t.setAttribute("aria-label",D("closed captions"))},"updateAriaLabel");class Gu extends dr{static{n(this,"MediaCaptionsMenuButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING,c.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),Lh(this),Dh(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_SHOWING?Dh(this):e===c.MEDIA_LANG&&Lh(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=Be(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return Mh(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){xh(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Mh(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){xh(this,c.MEDIA_SUBTITLES_SHOWING,e)}}Gu.getSlotTemplateHTML=qy;Gu.getTooltipContentHTML=Yy;const Mh=n((t,e)=>{const i=t.getAttribute(e);return i?Po(i):[]},"getSubtitlesListAttr"),xh=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=dn(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr");E.customElements.get("media-captions-menu-button")||E.customElements.define("media-captions-menu-button",Gu);var Nv=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$2"),xa=n((t,e,i)=>(Nv(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$2"),ml=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$2"),ma=n((t,e,i)=>(Nv(t,e,"access private method"),i),"__privateMethod$2"),gi,Oa,Br,Us,Sd;const pl={RATES:"rates"};class Gy extends lt{static{n(this,"MediaPlaybackRateMenu")}constructor(){super(),ml(this,Oa),ml(this,Us),ml(this,gi,new iu(this,pl.RATES,{defaultValue:jp})),ma(this,Oa,Br).call(this)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE,pl.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_PLAYBACK_RATE&&i!=a?(this.value=a,ma(this,Oa,Br).call(this)):e===pl.RATES&&i!=a&&(xa(this,gi).value=a,ma(this,Oa,Br).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",ma(this,Us,Sd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",ma(this,Us,Sd))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Be(this).querySelector("media-playback-rate-menu-button")}get rates(){return xa(this,gi)}set rates(e){e?Array.isArray(e)?xa(this,gi).value=e.join(" "):typeof e=="string"&&(xa(this,gi).value=e):xa(this,gi).value="",ma(this,Oa,Br).call(this)}get mediaPlaybackRate(){return ae(this,c.MEDIA_PLAYBACK_RATE,Ba)}set mediaPlaybackRate(e){ce(this,c.MEDIA_PLAYBACK_RATE,e)}}gi=new WeakMap;Oa=new WeakSet;Br=n(function(){this.defaultSlot.textContent="";const t=this.mediaPlaybackRate,e=new Set(Array.from(xa(this,gi)).map(a=>Number(a)));t>0&&!e.has(t)&&e.add(t);const i=Array.from(e).sort((a,r)=>a-r);for(const a of i){const r=ir({type:"radio",text:this.formatMenuItemText(`${a}x`,a),value:a.toString(),checked:t===a});r.prepend(ia(this,"checked-indicator")),this.defaultSlot.append(r)}},"render_fn$1");Us=new WeakSet;Sd=n(function(){if(!this.value)return;const t=new E.CustomEvent(R.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn$1");E.customElements.get("media-playback-rate-menu")||E.customElements.define("media-playback-rate-menu",Gy);const Hs=1;function Qy(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
      
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||Hs}x</slot>
  `}n(Qy,"getSlotTemplateHTML$1");function Zy(){return D("Playback rate")}n(Zy,"getTooltipContentHTML$1");class Qu extends dr{static{n(this,"MediaPlaybackRateMenuButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:Hs}x`}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===c.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,s=Number.isNaN(r)?Hs:r;this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",D("Playback rate {playbackRate}",{playbackRate:s}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Be(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return ae(this,c.MEDIA_PLAYBACK_RATE,Hs)}set mediaPlaybackRate(e){ce(this,c.MEDIA_PLAYBACK_RATE,e)}}Qu.getSlotTemplateHTML=Qy;Qu.getTooltipContentHTML=Zy;E.customElements.get("media-playback-rate-menu-button")||E.customElements.define("media-playback-rate-menu-button",Qu);var Zu=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$1"),Wr=n((t,e,i)=>(Zu(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$1"),Wn=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$1"),Oh=n((t,e,i,a)=>(Zu(t,e,"write to private field"),e.set(t,i),i),"__privateSet$1"),pa=n((t,e,i)=>(Zu(t,e,"access private method"),i),"__privateMethod$1"),Fr,Wa,Na,Kr,Bs,wd;class zy extends lt{static{n(this,"MediaRenditionMenu")}constructor(){super(...arguments),Wn(this,Na),Wn(this,Bs),Wn(this,Fr,[]),Wn(this,Wa,{})}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_RENDITION_LIST,c.MEDIA_RENDITION_SELECTED,c.MEDIA_RENDITION_UNAVAILABLE,c.MEDIA_HEIGHT]}static formatMenuItemText(e,i){return super.formatMenuItemText(e,i)}static formatRendition(e,{showBitrate:i=!1}={}){const a=`${Math.min(e.width,e.height)}p`;if(i&&e.bitrate){const r=e.bitrate/1e6,s=`${r.toFixed(r<1?1:0)} Mbps`;return`${a} (${s})`}return this.formatMenuItemText(a,e)}static compareRendition(e,i){var a,r;return i.height===e.height?((a=i.bitrate)!=null?a:0)-((r=e.bitrate)!=null?r:0):i.height-e.height}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_RENDITION_SELECTED&&i!==a?(this.value=a??"auto",pa(this,Na,Kr).call(this)):e===c.MEDIA_RENDITION_LIST&&i!==a?(Oh(this,Fr,pg(a)),pa(this,Na,Kr).call(this)):e===c.MEDIA_HEIGHT&&i!==a&&pa(this,Na,Kr).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",pa(this,Bs,wd))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",pa(this,Bs,wd))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:Be(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return Wr(this,Fr)}set mediaRenditionList(e){Oh(this,Fr,e),pa(this,Na,Kr).call(this)}get mediaRenditionSelected(){return re(this,c.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){ne(this,c.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return ae(this,c.MEDIA_HEIGHT)}set mediaHeight(e){ce(this,c.MEDIA_HEIGHT,e)}compareRendition(e,i){return this.constructor.compareRendition(e,i)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}formatRendition(e,i){return this.constructor.formatRendition(e,i)}showRenditionBitrate(e){return this.mediaRenditionList.some(i=>i!==e&&i.height===e.height&&i.bitrate!==e.bitrate)}}Fr=new WeakMap;Wa=new WeakMap;Na=new WeakSet;Kr=n(function(){if(Wr(this,Wa).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&Wr(this,Wa).mediaHeight===this.mediaHeight)return;Wr(this,Wa).mediaRenditionList=JSON.stringify(this.mediaRenditionList),Wr(this,Wa).mediaHeight=this.mediaHeight;const t=this.mediaRenditionList.sort(this.compareRendition.bind(this)),e=t.find(o=>o.id===this.mediaRenditionSelected);for(const o of t)o.selected=o===e;this.defaultSlot.textContent="";const i=!this.mediaRenditionSelected;for(const o of t){const l=this.formatRendition(o,{showBitrate:this.showRenditionBitrate(o)}),d=ir({type:"radio",text:l,value:`${o.id}`,checked:o.selected&&!i});d.prepend(ia(this,"checked-indicator")),this.defaultSlot.append(d)}const a=e&&this.showRenditionBitrate(e),r=i?e?this.formatMenuItemText(`${D("Auto")} • ${this.formatRendition(e,{showBitrate:a})}`,e):this.formatMenuItemText(`${D("Auto")} (${this.mediaHeight}p)`):this.formatMenuItemText(D("Auto")),s=ir({type:"radio",text:r,value:"auto",checked:i});s.dataset.description=r,s.prepend(ia(this,"checked-indicator")),this.defaultSlot.append(s)},"render_fn");Bs=new WeakSet;wd=n(function(){if(this.value==null)return;const t=new E.CustomEvent(R.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn");E.customElements.get("media-rendition-menu")||E.customElements.define("media-rendition-menu",zy);const jy=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function Xy(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${jy}</slot>
  `}n(Xy,"getSlotTemplateHTML");function Jy(){return D("Quality")}n(Jy,"getTooltipContentHTML");class zu extends dr{static{n(this,"MediaRenditionMenuButton")}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_RENDITION_SELECTED,c.MEDIA_RENDITION_UNAVAILABLE,c.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",D("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:Be(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return re(this,c.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){ne(this,c.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return ae(this,c.MEDIA_HEIGHT)}set mediaHeight(e){ce(this,c.MEDIA_HEIGHT,e)}}zu.getSlotTemplateHTML=Xy;zu.getTooltipContentHTML=Jy;E.customElements.get("media-rendition-menu-button")||E.customElements.define("media-rendition-menu-button",zu);var ju=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck"),Ut=n((t,e,i)=>(ju(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet"),wt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd"),Pv=n((t,e,i,a)=>(ju(t,e,"write to private field"),e.set(t,i),i),"__privateSet"),rt=n((t,e,i)=>(ju(t,e,"access private method"),i),"__privateMethod"),rr,_n,qo,Ki,Fa,Xu,$v,Ws,Id,Fs,Rd,Uv,ko,So,Ks;function eT(t){return`
      ${lt.getTemplateHTML(t)}
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
    `}n(eT,"getTemplateHTML$1");class Hv extends lt{static{n(this,"MediaContextMenu")}constructor(){super(),wt(this,_n),wt(this,Ki),wt(this,Xu),wt(this,Ws),wt(this,Rd),wt(this,rr,!1),wt(this,Fs,e=>{const i=e.target,a=i?.nodeName==="VIDEO",r=rt(this,Ws,Id).call(this,i);(a||r)&&(Ut(this,rr)?rt(this,Ki,Fa).call(this):rt(this,Rd,Uv).call(this,e))}),wt(this,ko,e=>{const i=e.target,a=this.contains(i),r=e.button===2,s=i?.nodeName==="VIDEO",o=rt(this,Ws,Id).call(this,i);a||r&&(s||o)||rt(this,Ki,Fa).call(this)}),wt(this,So,e=>{e.key==="Escape"&&rt(this,Ki,Fa).call(this)}),wt(this,Ks,e=>{var i,a;const r=e.target;if((i=r.matches)!=null&&i.call(r,'button[invoke="copy"]')){const s=(a=r.closest("media-context-menu-item"))==null?void 0:a.querySelector('input[slot="copy"]');s&&navigator.clipboard.writeText(s.value)}rt(this,Ki,Fa).call(this)}),this.setAttribute("noautohide",""),rt(this,_n,qo).call(this)}connectedCallback(){super.connectedCallback(),Be(this).addEventListener("contextmenu",Ut(this,Fs)),this.addEventListener("click",Ut(this,Ks))}disconnectedCallback(){super.disconnectedCallback(),Be(this).removeEventListener("contextmenu",Ut(this,Fs)),this.removeEventListener("click",Ut(this,Ks)),document.removeEventListener("mousedown",Ut(this,ko)),document.removeEventListener("keydown",Ut(this,So))}}rr=new WeakMap;_n=new WeakSet;qo=n(function(){this.hidden=!Ut(this,rr)},"updateVisibility_fn");Ki=new WeakSet;Fa=n(function(){Pv(this,rr,!1),rt(this,_n,qo).call(this)},"closeContextMenu_fn");Xu=new WeakSet;$v=n(function(){document.querySelectorAll("media-context-menu").forEach(e=>{var i;e!==this&&rt(i=e,Ki,Fa).call(i)})},"closeOtherContextMenus_fn");Ws=new WeakSet;Id=n(function(t){return t?t.hasAttribute("slot")&&t.getAttribute("slot")==="media"?!0:t.nodeName.includes("-")&&t.tagName.includes("-")?t.hasAttribute("src")||t.hasAttribute("poster")||t.hasAttribute("preload")||t.hasAttribute("playsinline"):!1:!1},"isVideoContainer_fn");Fs=new WeakMap;Rd=new WeakSet;Uv=n(function(t){t.preventDefault(),rt(this,Xu,$v).call(this),Pv(this,rr,!0),this.style.position="fixed",this.style.left=`${t.clientX}px`,this.style.top=`${t.clientY}px`,rt(this,_n,qo).call(this),document.addEventListener("mousedown",Ut(this,ko),{once:!0}),document.addEventListener("keydown",Ut(this,So),{once:!0})},"onContextMenu_fn");ko=new WeakMap;So=new WeakMap;Ks=new WeakMap;Hv.getTemplateHTML=eT;E.customElements.get("media-context-menu")||E.customElements.define("media-context-menu",Hv);function tT(t){return`
    ${Ri.getTemplateHTML.call(this,t)}
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
  `}n(tT,"getTemplateHTML");class Ju extends Ri{static{n(this,"MediaContextMenuItem")}}Ju.shadowRootOptions={mode:"open"};Ju.getTemplateHTML=tT;E.customElements.get("media-context-menu-item")||E.customElements.define("media-context-menu-item",Ju);var Bv=n(t=>{throw TypeError(t)},"Je"),ec=n((t,e,i)=>e.has(t)||Bv("Cannot "+i),"he"),z=n((t,e,i)=>(ec(t,e,"read from private field"),i?i.call(t):e.get(t)),"u$1"),_t=n((t,e,i)=>e.has(t)?Bv("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"E$2"),Yt=n((t,e,i,a)=>(ec(t,e,"write to private field"),e.set(t,i),i),"C"),_e=n((t,e,i)=>(ec(t,e,"access private method"),i),"p$1"),Yo=class{static{n(this,"F")}addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends Yo{static{n(this,"t")}}globalThis.DocumentFragment=t}var tc=class extends Yo{static{n(this,"G")}},iT=class extends Yo{static{n(this,"ge")}},aT={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(tc)}},Vs,rT=class{static{n(this,"fe")}constructor(e,i={}){_t(this,Vs),Yt(this,Vs,i?.detail)}get detail(){return z(this,Vs)}initCustomEvent(){}};Vs=new WeakMap;function nT(t,e){return new tc}n(nT,"Vt");var Wv={document:{createElement:nT},DocumentFragment,customElements:aT,CustomEvent:rT,EventTarget:Yo,HTMLElement:tc,HTMLVideoElement:iT},Fv=typeof window>"u"||typeof globalThis.customElements>"u",Wt=Fv?Wv:globalThis,wo=Fv?Wv.document:globalThis.document;function sT(t){let e="";return Object.entries(t).forEach(([i,a])=>{a!=null&&(e+=`${Cd(i)}: ${a}; `)}),e?e.trim():void 0}n(sT,"at");function Cd(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}n(Cd,"re$1");function Kv(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}n(Kv,"oe$1");function ze(t){if(t==null)return;let e=+t;return Number.isNaN(e)?void 0:e}n(ze,"y");function Vv(t){let e=oT(t).toString();return e?"?"+e:""}n(Vv,"ye$1");function oT(t){let e={};for(let i in t)t[i]!=null&&(e[i]=t[i]);return new URLSearchParams(e)}n(oT,"Bt");var qv=n((t,e)=>!t||!e?!1:t.contains(e)?!0:qv(t,e.getRootNode().host),"ve"),Yv="mux.com",lT=n(()=>{try{return"3.9.2"}catch{}return"UNKNOWN"},"Ht"),dT=lT(),Gv=n(()=>dT,"se$1"),uT=n((t,{token:e,customDomain:i=Yv,thumbnailTime:a,programTime:r}={})=>{var s;let o=e==null?a:void 0,{aud:l}=(s=Ka(e))!=null?s:{};if(!(e&&l!=="t"))return`https://image.${i}/${t}/thumbnail.webp${Vv({token:e,time:o,program_time:r})}`},"ot"),cT=n((t,{token:e,customDomain:i=Yv,programStartTime:a,programEndTime:r}={})=>{var s;let{aud:o}=(s=Ka(e))!=null?s:{};if(!(e&&o!=="s"))return`https://image.${i}/${t}/storyboard.vtt${Vv({token:e,format:"webp",program_start_time:a,program_end_time:r})}`},"nt"),ic=n(t=>{if(t){if([Z.LIVE,Z.ON_DEMAND].includes(t))return t;if(t!=null&&t.includes("live"))return Z.LIVE}},"z"),hT={crossorigin:"crossOrigin",playsinline:"playsInline"};function mT(t){var e;return(e=hT[t])!=null?e:Kv(t)}n(mT,"st");var Pa,$a,He,pT=class{static{n(this,"ne")}constructor(e,i){_t(this,Pa),_t(this,$a),_t(this,He,[]),Yt(this,Pa,e),Yt(this,$a,i)}[Symbol.iterator](){return z(this,He).values()}get length(){return z(this,He).length}get value(){var e;return(e=z(this,He).join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Yt(this,He,[]),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return z(this,He)[e]}values(){return z(this,He).values()}keys(){return z(this,He).keys()}forEach(e){z(this,He).forEach(e)}add(...e){var i,a;e.forEach(r=>{this.contains(r)||z(this,He).push(r)}),!(this.value===""&&!((i=z(this,Pa))!=null&&i.hasAttribute(`${z(this,$a)}`)))&&((a=z(this,Pa))==null||a.setAttribute(`${z(this,$a)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>{z(this,He).splice(z(this,He).indexOf(a),1)}),(i=z(this,Pa))==null||i.setAttribute(`${z(this,$a)}`,`${this.value}`)}contains(e){return z(this,He).includes(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){this.remove(e),this.add(i)}};Pa=new WeakMap,$a=new WeakMap,He=new WeakMap;var Qv=`[mux-player ${Gv()}]`;function ei(...t){console.warn(Qv,...t)}n(ei,"x$1");function nt(...t){console.error(Qv,...t)}n(nt,"T");function Zv(t){var e;let i=(e=t.message)!=null?e:"";t.context&&(i+=` ${t.context}`),t.file&&(i+=` ${M("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t.file}`),ei(i)}n(Zv,"Te");var Oe={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},Hi={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted"},Nh=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),vT=Object.values(Oe).filter(t=>Oe.PLAYSINLINE!==t),fT=Object.values(Hi),ET=[...vT,...fT],_T=class extends Wt.HTMLElement{static{n(this,"Ae")}static get observedAttributes(){return ET}constructor(){super()}attributeChangedCallback(t,e,i){var a,r;switch(t){case Hi.MUTED:{this.media&&(this.media.muted=i!=null,this.media.defaultMuted=i!=null);return}case Hi.VOLUME:{let s=(a=ze(i))!=null?a:1;this.media&&(this.media.volume=s);return}case Hi.PLAYBACKRATE:{let s=(r=ze(i))!=null?r:1;this.media&&(this.media.playbackRate=s,this.media.defaultPlaybackRate=s);return}}}play(){var t,e;return(e=(t=this.media)==null?void 0:t.play())!=null?e:Promise.reject()}pause(){var t;(t=this.media)==null||t.pause()}load(){var t;(t=this.media)==null||t.load()}get media(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("mux-video")}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var t,e;return(e=(t=this.media)==null?void 0:t.paused)!=null?e:!0}get duration(){var t,e;return(e=(t=this.media)==null?void 0:t.duration)!=null?e:NaN}get ended(){var t,e;return(e=(t=this.media)==null?void 0:t.ended)!=null?e:!1}get buffered(){var t,e;return(e=(t=this.media)==null?void 0:t.buffered)!=null?e:Nh}get seekable(){var t,e;return(e=(t=this.media)==null?void 0:t.seekable)!=null?e:Nh}get readyState(){var t,e;return(e=(t=this.media)==null?void 0:t.readyState)!=null?e:0}get videoWidth(){var t,e;return(e=(t=this.media)==null?void 0:t.videoWidth)!=null?e:0}get videoHeight(){var t,e;return(e=(t=this.media)==null?void 0:t.videoHeight)!=null?e:0}get currentSrc(){var t,e;return(e=(t=this.media)==null?void 0:t.currentSrc)!=null?e:""}get currentTime(){var t,e;return(e=(t=this.media)==null?void 0:t.currentTime)!=null?e:0}set currentTime(t){this.media&&(this.media.currentTime=Number(t))}get volume(){var t,e;return(e=(t=this.media)==null?void 0:t.volume)!=null?e:1}set volume(t){this.media&&(this.media.volume=Number(t))}get playbackRate(){var t,e;return(e=(t=this.media)==null?void 0:t.playbackRate)!=null?e:1}set playbackRate(t){this.media&&(this.media.playbackRate=Number(t))}get defaultPlaybackRate(){var t;return(t=ze(this.getAttribute(Hi.PLAYBACKRATE)))!=null?t:1}set defaultPlaybackRate(t){t!=null?this.setAttribute(Hi.PLAYBACKRATE,`${t}`):this.removeAttribute(Hi.PLAYBACKRATE)}get crossOrigin(){return yr(this,Oe.CROSSORIGIN)}set crossOrigin(t){this.setAttribute(Oe.CROSSORIGIN,`${t}`)}get autoplay(){return yr(this,Oe.AUTOPLAY)!=null}set autoplay(t){t?this.setAttribute(Oe.AUTOPLAY,typeof t=="string"?t:""):this.removeAttribute(Oe.AUTOPLAY)}get loop(){return yr(this,Oe.LOOP)!=null}set loop(t){t?this.setAttribute(Oe.LOOP,""):this.removeAttribute(Oe.LOOP)}get muted(){var t,e;return(e=(t=this.media)==null?void 0:t.muted)!=null?e:!1}set muted(t){this.media&&(this.media.muted=!!t)}get defaultMuted(){return yr(this,Oe.MUTED)!=null}set defaultMuted(t){t?this.setAttribute(Oe.MUTED,""):this.removeAttribute(Oe.MUTED)}get playsInline(){return yr(this,Oe.PLAYSINLINE)!=null}set playsInline(t){nt("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(t){["","none","metadata","auto"].includes(t)?this.setAttribute(Oe.PRELOAD,t):this.removeAttribute(Oe.PRELOAD)}};function yr(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}n(yr,"X");var Ph=_T,bT=`:host {
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
`,Tr=new WeakMap,gT=class zv{static{n(this,"t")}constructor(e,i){this.element=e,this.type=i,this.element.addEventListener(this.type,this);let a=Tr.get(this.element);a&&a.set(this.type,this)}set(e){if(typeof e=="function")this.handleEvent=e.bind(this.element);else if(typeof e=="object"&&typeof e.handleEvent=="function")this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let i=Tr.get(this.element);i&&i.delete(this.type)}}static for(e){Tr.has(e.element)||Tr.set(e.element,new Map);let i=e.attributeName.slice(2),a=Tr.get(e.element);return a&&a.has(i)?a.get(i):new zv(e.element,i)}};function yT(t,e){return t instanceof yt&&t.attributeName.startsWith("on")?(gT.for(t).set(e),t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),!0):!1}n(yT,"zt");function TT(t,e){return e instanceof jv&&t instanceof lr?(e.renderInto(t),!0):!1}n(TT,"Xt");function AT(t,e){return e instanceof DocumentFragment&&t instanceof lr?(e.childNodes.length&&t.replace(...e.childNodes),!0):!1}n(AT,"qt");function kT(t,e){if(t instanceof yt){let i=t.attributeNamespace,a=t.element.getAttributeNS(i,t.attributeName);return String(e)!==a&&(t.value=String(e)),!0}return t.value=String(e),!0}n(kT,"Qt");function ST(t,e){if(t instanceof yt&&e instanceof Element){let i=t.element;return i[t.attributeName]!==e&&(t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),i[t.attributeName]=e),!0}return!1}n(ST,"Jt");function wT(t,e){if(typeof e=="boolean"&&t instanceof yt){let i=t.attributeNamespace,a=t.element.hasAttributeNS(i,t.attributeName);return e!==a&&(t.booleanValue=e),!0}return!1}n(wT,"ea");function IT(t,e){return e===!1&&t instanceof lr?(t.replace(""),!0):!1}n(IT,"ta");function RT(t,e){ST(t,e)||wT(t,e)||yT(t,e)||IT(t,e)||TT(t,e)||AT(t,e)||kT(t,e)}n(RT,"aa");var vl=new Map,$h=new WeakMap,Uh=new WeakMap,jv=class{static{n(this,"de")}constructor(e,i,a){this.strings=e,this.values=i,this.processor=a,this.stringsKey=this.strings.join("")}get template(){if(vl.has(this.stringsKey))return vl.get(this.stringsKey);{let e=wo.createElement("template"),i=this.strings.length-1;return e.innerHTML=this.strings.reduce((a,r,s)=>a+r+(s<i?`{{ ${s} }}`:""),""),vl.set(this.stringsKey,e),e}}renderInto(e){var i;let a=this.template;if($h.get(e)!==a){$h.set(e,a);let s=new Fo(a,this.values,this.processor);Uh.set(e,s),e instanceof lr?e.replace(...s.children):e.appendChild(s);return}let r=Uh.get(e);(i=r?.update)==null||i.call(r,this.values)}},CT={processCallback(t,e,i){var a;if(i){for(let[r,s]of e)if(r in i){let o=(a=i[r])!=null?a:"";RT(s,o)}}}};function qs(t,...e){return new jv(t,e,CT)}n(qs,"Q");function DT(t,e){t.renderInto(e)}n(DT,"bt");var LT=n(t=>{let{tokens:e}=t;return e.drm?":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }":""},"oa"),MT=n(t=>qs`
  <style>
    ${LT(t)}
    ${bT}
  </style>
  ${PT(t)}
`,"gt"),xT=n(t=>{let e=t.hotKeys?`${t.hotKeys}`:"";return ic(t.streamType)==="live"&&(e+=" noarrowleft noarrowright"),e},"na"),OT={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",THUMB:"thumb",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",MENU_ITEM:"menu-item",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},NT=Object.values(OT).join(", "),PT=n(t=>{var e,i,a,r,s,o,l,d,u,p,v,m,h,f,_,g,T,A,b,S,L,N,B,G,ee,V,U,xe,Fe,Ke,me,Pe,At,$e,dt,Ve,Se;return qs`
  <media-theme
    template="${t.themeTemplate||!1}"
    defaultstreamtype="${(e=t.defaultStreamType)!=null?e:!1}"
    hotkeys="${xT(t)||!1}"
    nohotkeys="${t.noHotKeys||!t.hasSrc||!1}"
    noautoseektolive="${!!((i=t.streamType)!=null&&i.includes(Z.LIVE))&&t.targetLiveWindow!==0}"
    novolumepref="${t.novolumepref||!1}"
    nomutedpref="${t.nomutedpref||!1}"
    disabled="${!t.hasSrc||t.isDialogOpen}"
    audio="${(a=t.audio)!=null?a:!1}"
    style="${(r=sT({"--media-primary-color":t.primaryColor,"--media-secondary-color":t.secondaryColor,"--media-accent-color":t.accentColor}))!=null?r:!1}"
    defaultsubtitles="${!t.defaultHiddenCaptions}"
    forwardseekoffset="${(s=t.forwardSeekOffset)!=null?s:!1}"
    backwardseekoffset="${(o=t.backwardSeekOffset)!=null?o:!1}"
    playbackrates="${(l=t.playbackRates)!=null?l:!1}"
    defaultshowremainingtime="${(d=t.defaultShowRemainingTime)!=null?d:!1}"
    defaultduration="${(u=t.defaultDuration)!=null?u:!1}"
    hideduration="${(p=t.hideDuration)!=null?p:!1}"
    title="${(v=t.title)!=null?v:!1}"
    videotitle="${(m=t.videoTitle)!=null?m:!1}"
    proudlydisplaymuxbadge="${(h=t.proudlyDisplayMuxBadge)!=null?h:!1}"
    exportparts="${NT}"
    onclose="${t.onCloseErrorDialog}"
    onfocusin="${t.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      inert="${(f=t.noHotKeys)!=null?f:!1}"
      target-live-window="${(_=t.targetLiveWindow)!=null?_:!1}"
      stream-type="${(g=ic(t.streamType))!=null?g:!1}"
      crossorigin="${(T=t.crossOrigin)!=null?T:""}"
      playsinline
      autoplay="${(A=t.autoplay)!=null?A:!1}"
      muted="${(b=t.muted)!=null?b:!1}"
      loop="${(S=t.loop)!=null?S:!1}"
      preload="${(L=t.preload)!=null?L:!1}"
      debug="${(N=t.debug)!=null?N:!1}"
      prefer-cmcd="${(B=t.preferCmcd)!=null?B:!1}"
      disable-tracking="${(G=t.disableTracking)!=null?G:!1}"
      disable-cookies="${(ee=t.disableCookies)!=null?ee:!1}"
      prefer-playback="${(V=t.preferPlayback)!=null?V:!1}"
      start-time="${t.startTime!=null?t.startTime:!1}"
      beacon-collection-domain="${(U=t.beaconCollectionDomain)!=null?U:!1}"
      player-init-time="${(xe=t.playerInitTime)!=null?xe:!1}"
      player-software-name="${(Fe=t.playerSoftwareName)!=null?Fe:!1}"
      player-software-version="${(Ke=t.playerSoftwareVersion)!=null?Ke:!1}"
      env-key="${(me=t.envKey)!=null?me:!1}"
      custom-domain="${(Pe=t.customDomain)!=null?Pe:!1}"
      src="${t.src?t.src:t.playbackId?Sl(t):!1}"
      cast-src="${t.src?t.src:t.playbackId?Sl(t):!1}"
      cast-receiver="${(At=t.castReceiver)!=null?At:!1}"
      drm-token="${(dt=($e=t.tokens)==null?void 0:$e.drm)!=null?dt:!1}"
      exportparts="video"
      disable-pseudo-ended="${(Ve=t.disablePseudoEnded)!=null?Ve:!1}"
    >
      ${t.storyboard?qs`<track label="thumbnails" default kind="metadata" src="${t.storyboard}" />`:qs``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t.poster?t.poster:!1}"
        placeholdersrc="${(Se=t.placeholder)!=null?Se:!1}"
      ></media-poster-image>
    </slot>
  </media-theme>
`},"la"),Xv=n(t=>t.charAt(0).toUpperCase()+t.slice(1),"vt"),$T=n((t,e=!1)=>{var i,a;if(t.muxCode){let r=Xv((i=t.errorCategory)!=null?i:"video"),s=Ro((a=t.errorCategory)!=null?a:ie.VIDEO);if(t.muxCode===O.NETWORK_OFFLINE)return M("Your device appears to be offline",e);if(t.muxCode===O.NETWORK_TOKEN_EXPIRED)return M("{category} URL has expired",e).format({category:r});if([O.NETWORK_TOKEN_SUB_MISMATCH,O.NETWORK_TOKEN_AUD_MISMATCH,O.NETWORK_TOKEN_AUD_MISSING,O.NETWORK_TOKEN_MALFORMED].includes(t.muxCode))return M("{category} URL is formatted incorrectly",e).format({category:r});if(t.muxCode===O.NETWORK_TOKEN_MISSING)return M("Invalid {categoryName} URL",e).format({categoryName:s});if(t.muxCode===O.NETWORK_NOT_FOUND)return M("{category} does not exist",e).format({category:r});if(t.muxCode===O.NETWORK_NOT_READY){let o=t.streamType==="live"?"Live stream":"Video";return M("{mediaType} is not currently available",e).format({mediaType:o})}}if(t.code){if(t.code===C.MEDIA_ERR_NETWORK)return M("Network Error",e);if(t.code===C.MEDIA_ERR_DECODE)return M("Media Error",e);if(t.code===C.MEDIA_ERR_SRC_NOT_SUPPORTED)return M("Source Not Supported",e)}return M("Error",e)},"ua"),UT=n((t,e=!1)=>{var i,a;if(t.muxCode){let r=Xv((i=t.errorCategory)!=null?i:"video"),s=Ro((a=t.errorCategory)!=null?a:ie.VIDEO);return t.muxCode===O.NETWORK_OFFLINE?M("Check your internet connection and try reloading this video.",e):t.muxCode===O.NETWORK_TOKEN_EXPIRED?M("The video’s secured {tokenNamePrefix}-token has expired.",e).format({tokenNamePrefix:s}):t.muxCode===O.NETWORK_TOKEN_SUB_MISMATCH?M("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",e).format({tokenNamePrefix:s}):t.muxCode===O.NETWORK_TOKEN_MALFORMED?M("{category} URL is formatted incorrectly",e).format({category:r}):[O.NETWORK_TOKEN_AUD_MISMATCH,O.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode)?M("The {tokenNamePrefix}-token is formatted with incorrect information.",e).format({tokenNamePrefix:s}):[O.NETWORK_TOKEN_MISSING,O.NETWORK_INVALID_URL].includes(t.muxCode)?M("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",e).format({tokenNamePrefix:s}):t.muxCode===O.NETWORK_NOT_FOUND?"":t.message}return t.code&&(t.code===C.MEDIA_ERR_NETWORK||t.code===C.MEDIA_ERR_DECODE||(t.code,C.MEDIA_ERR_SRC_NOT_SUPPORTED)),t.message},"ma"),HT=n((t,e=!1)=>{let i=$T(t,e).toString(),a=UT(t,e).toString();return{title:i,message:a}},"Et"),BT=n(t=>{if(t.muxCode){if(t.muxCode===O.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(t.muxCode===O.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([O.NETWORK_TOKEN_AUD_MISMATCH,O.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode))return"403-incorrect-aud-value.md";if(t.muxCode===O.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(t.muxCode===O.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(t.muxCode===O.NETWORK_NOT_FOUND)return"404-not-found.md";if(t.muxCode===O.NETWORK_NOT_READY)return"412-not-playable.md"}if(t.code){if(t.code===C.MEDIA_ERR_NETWORK)return"";if(t.code===C.MEDIA_ERR_DECODE)return"media-decode-error.md";if(t.code===C.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},"ca"),Hh=n((t,e)=>{let i=BT(t);return{message:t.message,context:t.context,file:i}},"Re"),WT=`<template id="media-theme-gerwig">
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
`,Dd=wo.createElement("template");"innerHTML"in Dd&&(Dd.innerHTML=WT);var Bh,Wh,Jv=class extends Ko{static{n(this,"me")}};Jv.template=(Wh=(Bh=Dd.content)==null?void 0:Bh.children)==null?void 0:Wh[0];Wt.customElements.get("media-theme-gerwig")||Wt.customElements.define("media-theme-gerwig",Jv);var FT="gerwig",Xt={SRC:"src",POSTER:"poster"},k={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",FULLSCREEN_ELEMENT:"fullscreen-element",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",NO_MUTED_PREF:"no-muted-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended"},Ld=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","nomutedpref","proudlydisplaymuxbadge"];function KT(t,e){var i,a;return{src:!t.playbackId&&t.src,playbackId:t.playbackId,hasSrc:!!t.playbackId||!!t.src||!!t.currentSrc,poster:t.poster,storyboard:t.storyboard,storyboardSrc:t.getAttribute(k.STORYBOARD_SRC),fullscreenElement:t.getAttribute(k.FULLSCREEN_ELEMENT),placeholder:t.getAttribute("placeholder"),themeTemplate:qT(t),thumbnailTime:!t.tokens.thumbnail&&t.thumbnailTime,autoplay:t.autoplay,crossOrigin:t.crossOrigin,loop:t.loop,noHotKeys:t.hasAttribute(k.NOHOTKEYS),hotKeys:t.getAttribute(k.HOTKEYS),muted:t.muted,paused:t.paused,preload:t.preload,envKey:t.envKey,preferCmcd:t.preferCmcd,debug:t.debug,disableTracking:t.disableTracking,disableCookies:t.disableCookies,tokens:t.tokens,beaconCollectionDomain:t.beaconCollectionDomain,maxResolution:t.maxResolution,minResolution:t.minResolution,programStartTime:t.programStartTime,programEndTime:t.programEndTime,assetStartTime:t.assetStartTime,assetEndTime:t.assetEndTime,renditionOrder:t.renditionOrder,metadata:t.metadata,playerInitTime:t.playerInitTime,playerSoftwareName:t.playerSoftwareName,playerSoftwareVersion:t.playerSoftwareVersion,startTime:t.startTime,preferPlayback:t.preferPlayback,audio:t.audio,defaultStreamType:t.defaultStreamType,targetLiveWindow:t.getAttribute(y.TARGET_LIVE_WINDOW),streamType:ic(t.getAttribute(y.STREAM_TYPE)),primaryColor:t.getAttribute(k.PRIMARY_COLOR),secondaryColor:t.getAttribute(k.SECONDARY_COLOR),accentColor:t.getAttribute(k.ACCENT_COLOR),forwardSeekOffset:t.forwardSeekOffset,backwardSeekOffset:t.backwardSeekOffset,defaultHiddenCaptions:t.defaultHiddenCaptions,defaultDuration:t.defaultDuration,defaultShowRemainingTime:t.defaultShowRemainingTime,hideDuration:YT(t),playbackRates:t.getAttribute(k.PLAYBACK_RATES),customDomain:(i=t.getAttribute(y.CUSTOM_DOMAIN))!=null?i:void 0,title:t.getAttribute(k.TITLE),videoTitle:(a=t.getAttribute(k.VIDEO_TITLE))!=null?a:t.getAttribute(k.TITLE),novolumepref:t.hasAttribute(k.NO_VOLUME_PREF),nomutedpref:t.hasAttribute(k.NO_MUTED_PREF),proudlyDisplayMuxBadge:t.hasAttribute(k.PROUDLY_DISPLAY_MUX_BADGE),castReceiver:t.castReceiver,disablePseudoEnded:t.hasAttribute(k.DISABLE_PSEUDO_ENDED),...e,extraSourceParams:t.extraSourceParams}}n(KT,"Ea");var VT=qp.formatErrorMessage;qp.formatErrorMessage=t=>{var e,i;if(t instanceof C){let a=HT(t,!1);return`
      ${a!=null&&a.title?`<h3>${a.title}</h3>`:""}
      ${a!=null&&a.message||a!=null&&a.linkUrl?`<p>
        ${a?.message}
        ${a!=null&&a.linkUrl?`<a
              href="${a.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(e=a.linkText)!=null?e:""} ${M("(opens in a new window)")}"
              >${(i=a.linkText)!=null?i:a.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return VT(t)};function qT(t){var e,i;let a=t.theme;if(a){let r=(i=(e=t.getRootNode())==null?void 0:e.getElementById)==null?void 0:i.call(e,a);if(r&&r instanceof HTMLTemplateElement)return r;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let s=Wt.customElements.get(a);if(s!=null&&s.template)return s.template}}n(qT,"Aa");function YT(t){var e;let i=(e=t.mediaController)==null?void 0:e.querySelector("media-time-display");return i&&getComputedStyle(i).getPropertyValue("--media-duration-display-display").trim()==="none"}n(YT,"Ca");function Fh(t){let e=t.videoTitle?{video_title:t.videoTitle}:{};return t.getAttributeNames().filter(i=>i.startsWith("metadata-")).reduce((i,a)=>{let r=t.getAttribute(a);return r!==null&&(i[a.replace(/^metadata-/,"").replace(/-/g,"_")]=r),i},e)}n(Fh,"xt");var GT=Object.values(y),QT=Object.values(Xt),ZT=Object.values(k),Kh=Gv(),Vh="mux-player",qh={isDialogOpen:!1},zT={redundant_streams:!0},Ys,Gs,Qs,Bi,Zs,ja,de,bi,ef,Md,Wi,Yh,Gh,Qh,Zh,jT=class extends Ph{static{n(this,"Ne")}constructor(){super(),_t(this,de),_t(this,Ys),_t(this,Gs,!1),_t(this,Qs,{}),_t(this,Bi,!0),_t(this,Zs,new pT(this,"hotkeys")),_t(this,ja,{...qh,onCloseErrorDialog:n(t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&_e(this,de,Md).call(this,{isDialogOpen:!1})},"onCloseErrorDialog"),onFocusInErrorDialog:n(t=>{var e;((e=t.composedPath()[0])==null?void 0:e.localName)==="media-error-dialog"&&(qv(this,wo.activeElement)||t.preventDefault())},"onFocusInErrorDialog")}),Yt(this,Ys,Kd()),this.attachShadow({mode:"open"}),_e(this,de,ef).call(this),this.isConnected&&_e(this,de,bi).call(this)}static get NAME(){return Vh}static get VERSION(){return Kh}static get observedAttributes(){var t;return[...(t=Ph.observedAttributes)!=null?t:[],...QT,...GT,...ZT]}get mediaTheme(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("media-theme")}get mediaController(){var t,e;return(e=(t=this.mediaTheme)==null?void 0:t.shadowRoot)==null?void 0:e.querySelector("media-controller")}connectedCallback(){let t=this.media;t&&(t.metadata=Fh(this))}attributeChangedCallback(t,e,i){switch(_e(this,de,bi).call(this),super.attributeChangedCallback(t,e,i),t){case k.HOTKEYS:z(this,Zs).value=i;break;case k.THUMBNAIL_TIME:{i!=null&&this.tokens.thumbnail&&ei(M("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case k.THUMBNAIL_TOKEN:{if(i){let a=Ka(i);if(a){let{aud:r}=a,s=Yr.THUMBNAIL;r!==s&&ei(M("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:s,tokenNamePrefix:"thumbnail"}))}}break}case k.STORYBOARD_TOKEN:{if(i){let a=Ka(i);if(a){let{aud:r}=a,s=Yr.STORYBOARD;r!==s&&ei(M("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:s,tokenNamePrefix:"storyboard"}))}}break}case k.DRM_TOKEN:{if(i){let a=Ka(i);if(a){let{aud:r}=a,s=Yr.DRM;r!==s&&ei(M("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:r,expectedAud:s,tokenNamePrefix:"drm"}))}}break}case y.PLAYBACK_ID:{i!=null&&i.includes("?token")&&nt(M("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:i}));break}case y.STREAM_TYPE:{i&&![Z.LIVE,Z.ON_DEMAND,Z.UNKNOWN].includes(i)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=i.includes("dvr")?Number.POSITIVE_INFINITY:0:Zv({file:"invalid-stream-type.md",message:M("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):i===Z.LIVE?this.getAttribute(k.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN;break}case k.FULLSCREEN_ELEMENT:{if(i!=null||i!==e){let a=wo.getElementById(i),r=a?.querySelector("mux-player");this.mediaController&&a&&r&&(this.mediaController.fullscreenElement=a)}break}}[y.PLAYBACK_ID,Xt.SRC,k.PLAYBACK_TOKEN].includes(t)&&e!==i&&Yt(this,ja,{...z(this,ja),...qh}),_e(this,de,Wi).call(this,{[mT(t)]:i})}async requestFullscreen(t){var e;if(!(!this.mediaController||this.mediaController.hasAttribute(c.MEDIA_IS_FULLSCREEN)))return(e=this.mediaController)==null||e.dispatchEvent(new Wt.CustomEvent(R.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((i,a)=>{var r;(r=this.mediaController)==null||r.addEventListener(ni.MEDIA_IS_FULLSCREEN,()=>i(),{once:!0})})}async exitFullscreen(){var t;if(!(!this.mediaController||!this.mediaController.hasAttribute(c.MEDIA_IS_FULLSCREEN)))return(t=this.mediaController)==null||t.dispatchEvent(new Wt.CustomEvent(R.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((e,i)=>{var a;(a=this.mediaController)==null||a.addEventListener(ni.MEDIA_IS_FULLSCREEN,()=>e(),{once:!0})})}get preferCmcd(){var t;return(t=this.getAttribute(y.PREFER_CMCD))!=null?t:void 0}set preferCmcd(t){t!==this.preferCmcd&&(t?eo.includes(t)?this.setAttribute(y.PREFER_CMCD,t):ei(`Invalid value for preferCmcd. Must be one of ${eo.join()}`):this.removeAttribute(y.PREFER_CMCD))}get hasPlayed(){var t,e;return(e=(t=this.mediaController)==null?void 0:t.hasAttribute(c.MEDIA_HAS_PLAYED))!=null?e:!1}get inLiveWindow(){var t;return(t=this.mediaController)==null?void 0:t.hasAttribute(c.MEDIA_TIME_IS_LIVE)}get _hls(){var t;return(t=this.media)==null?void 0:t._hls}get mux(){var t;return(t=this.media)==null?void 0:t.mux}get theme(){var t;return(t=this.getAttribute(k.THEME))!=null?t:FT}set theme(t){this.setAttribute(k.THEME,`${t}`)}get themeProps(){let t=this.mediaTheme;if(!t)return;let e={};for(let i of t.getAttributeNames()){if(Ld.includes(i))continue;let a=t.getAttribute(i);e[Kv(i)]=a===""?!0:a}return e}set themeProps(t){var e,i;_e(this,de,bi).call(this);let a={...this.themeProps,...t};for(let r in a){if(Ld.includes(r))continue;let s=t?.[r];typeof s=="boolean"||s==null?(e=this.mediaTheme)==null||e.toggleAttribute(Cd(r),!!s):(i=this.mediaTheme)==null||i.setAttribute(Cd(r),s)}}get playbackId(){var t;return(t=this.getAttribute(y.PLAYBACK_ID))!=null?t:void 0}set playbackId(t){t?this.setAttribute(y.PLAYBACK_ID,t):this.removeAttribute(y.PLAYBACK_ID)}get src(){var t,e;return this.playbackId?(t=Mi(this,Xt.SRC))!=null?t:void 0:(e=this.getAttribute(Xt.SRC))!=null?e:void 0}set src(t){t?this.setAttribute(Xt.SRC,t):this.removeAttribute(Xt.SRC)}get poster(){var t;let e=this.getAttribute(Xt.POSTER);if(e!=null)return e;let{tokens:i}=this;if(i.playback&&!i.thumbnail){ei("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return uT(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(t=this.thumbnailTime)!=null?t:this.startTime,programTime:this.programStartTime,token:i.thumbnail})}set poster(t){t||t===""?this.setAttribute(Xt.POSTER,t):this.removeAttribute(Xt.POSTER)}get storyboardSrc(){var t;return(t=this.getAttribute(k.STORYBOARD_SRC))!=null?t:void 0}set storyboardSrc(t){t?this.setAttribute(k.STORYBOARD_SRC,t):this.removeAttribute(k.STORYBOARD_SRC)}get storyboard(){let{tokens:t}=this;if(this.storyboardSrc&&!t.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[Z.LIVE,Z.UNKNOWN].includes(this.streamType)||t.playback&&!t.storyboard))return cT(this.playbackId,{customDomain:this.customDomain,token:t.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(k.AUDIO)}set audio(t){if(!t){this.removeAttribute(k.AUDIO);return}this.setAttribute(k.AUDIO,"")}get hotkeys(){return z(this,Zs)}get nohotkeys(){return this.hasAttribute(k.NOHOTKEYS)}set nohotkeys(t){if(!t){this.removeAttribute(k.NOHOTKEYS);return}this.setAttribute(k.NOHOTKEYS,"")}get thumbnailTime(){return ze(this.getAttribute(k.THUMBNAIL_TIME))}set thumbnailTime(t){this.setAttribute(k.THUMBNAIL_TIME,`${t}`)}get videoTitle(){var t,e;return(e=(t=this.getAttribute(k.VIDEO_TITLE))!=null?t:this.getAttribute(k.TITLE))!=null?e:""}set videoTitle(t){t!==this.videoTitle&&(t?this.setAttribute(k.VIDEO_TITLE,t):this.removeAttribute(k.VIDEO_TITLE))}get placeholder(){var t;return(t=Mi(this,k.PLACEHOLDER))!=null?t:""}set placeholder(t){this.setAttribute(k.PLACEHOLDER,`${t}`)}get primaryColor(){var t,e;let i=this.getAttribute(k.PRIMARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Wt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_primary-color"))==null?void 0:e.trim(),i))return i}set primaryColor(t){this.setAttribute(k.PRIMARY_COLOR,`${t}`)}get secondaryColor(){var t,e;let i=this.getAttribute(k.SECONDARY_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Wt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_secondary-color"))==null?void 0:e.trim(),i))return i}set secondaryColor(t){this.setAttribute(k.SECONDARY_COLOR,`${t}`)}get accentColor(){var t,e;let i=this.getAttribute(k.ACCENT_COLOR);if(i!=null||this.mediaTheme&&(i=(e=(t=Wt.getComputedStyle(this.mediaTheme))==null?void 0:t.getPropertyValue("--_accent-color"))==null?void 0:e.trim(),i))return i}set accentColor(t){this.setAttribute(k.ACCENT_COLOR,`${t}`)}get defaultShowRemainingTime(){return this.hasAttribute(k.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(t){t?this.setAttribute(k.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(k.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(k.PLAYBACK_RATES))return this.getAttribute(k.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(t=>Number(t)).filter(t=>!Number.isNaN(t)).sort((t,e)=>t-e)}set playbackRates(t){if(!t){this.removeAttribute(k.PLAYBACK_RATES);return}this.setAttribute(k.PLAYBACK_RATES,t.join(" "))}get forwardSeekOffset(){var t;return(t=ze(this.getAttribute(k.FORWARD_SEEK_OFFSET)))!=null?t:10}set forwardSeekOffset(t){this.setAttribute(k.FORWARD_SEEK_OFFSET,`${t}`)}get backwardSeekOffset(){var t;return(t=ze(this.getAttribute(k.BACKWARD_SEEK_OFFSET)))!=null?t:10}set backwardSeekOffset(t){this.setAttribute(k.BACKWARD_SEEK_OFFSET,`${t}`)}get defaultHiddenCaptions(){return this.hasAttribute(k.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(t){t?this.setAttribute(k.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(k.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return ze(this.getAttribute(k.DEFAULT_DURATION))}set defaultDuration(t){t==null?this.removeAttribute(k.DEFAULT_DURATION):this.setAttribute(k.DEFAULT_DURATION,`${t}`)}get playerInitTime(){return this.hasAttribute(y.PLAYER_INIT_TIME)?ze(this.getAttribute(y.PLAYER_INIT_TIME)):z(this,Ys)}set playerInitTime(t){t!=this.playerInitTime&&(t==null?this.removeAttribute(y.PLAYER_INIT_TIME):this.setAttribute(y.PLAYER_INIT_TIME,`${+t}`))}get playerSoftwareName(){var t;return(t=this.getAttribute(y.PLAYER_SOFTWARE_NAME))!=null?t:Vh}get playerSoftwareVersion(){var t;return(t=this.getAttribute(y.PLAYER_SOFTWARE_VERSION))!=null?t:Kh}get beaconCollectionDomain(){var t;return(t=this.getAttribute(y.BEACON_COLLECTION_DOMAIN))!=null?t:void 0}set beaconCollectionDomain(t){t!==this.beaconCollectionDomain&&(t?this.setAttribute(y.BEACON_COLLECTION_DOMAIN,t):this.removeAttribute(y.BEACON_COLLECTION_DOMAIN))}get maxResolution(){var t;return(t=this.getAttribute(y.MAX_RESOLUTION))!=null?t:void 0}set maxResolution(t){t!==this.maxResolution&&(t?this.setAttribute(y.MAX_RESOLUTION,t):this.removeAttribute(y.MAX_RESOLUTION))}get minResolution(){var t;return(t=this.getAttribute(y.MIN_RESOLUTION))!=null?t:void 0}set minResolution(t){t!==this.minResolution&&(t?this.setAttribute(y.MIN_RESOLUTION,t):this.removeAttribute(y.MIN_RESOLUTION))}get renditionOrder(){var t;return(t=this.getAttribute(y.RENDITION_ORDER))!=null?t:void 0}set renditionOrder(t){t!==this.renditionOrder&&(t?this.setAttribute(y.RENDITION_ORDER,t):this.removeAttribute(y.RENDITION_ORDER))}get programStartTime(){return ze(this.getAttribute(y.PROGRAM_START_TIME))}set programStartTime(t){t==null?this.removeAttribute(y.PROGRAM_START_TIME):this.setAttribute(y.PROGRAM_START_TIME,`${t}`)}get programEndTime(){return ze(this.getAttribute(y.PROGRAM_END_TIME))}set programEndTime(t){t==null?this.removeAttribute(y.PROGRAM_END_TIME):this.setAttribute(y.PROGRAM_END_TIME,`${t}`)}get assetStartTime(){return ze(this.getAttribute(y.ASSET_START_TIME))}set assetStartTime(t){t==null?this.removeAttribute(y.ASSET_START_TIME):this.setAttribute(y.ASSET_START_TIME,`${t}`)}get assetEndTime(){return ze(this.getAttribute(y.ASSET_END_TIME))}set assetEndTime(t){t==null?this.removeAttribute(y.ASSET_END_TIME):this.setAttribute(y.ASSET_END_TIME,`${t}`)}get extraSourceParams(){return this.hasAttribute(k.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(k.EXTRA_SOURCE_PARAMS)).entries()].reduce((t,[e,i])=>(t[e]=i,t),{}):zT}set extraSourceParams(t){t==null?this.removeAttribute(k.EXTRA_SOURCE_PARAMS):this.setAttribute(k.EXTRA_SOURCE_PARAMS,new URLSearchParams(t).toString())}get customDomain(){var t;return(t=this.getAttribute(y.CUSTOM_DOMAIN))!=null?t:void 0}set customDomain(t){t!==this.customDomain&&(t?this.setAttribute(y.CUSTOM_DOMAIN,t):this.removeAttribute(y.CUSTOM_DOMAIN))}get envKey(){var t;return(t=Mi(this,y.ENV_KEY))!=null?t:void 0}set envKey(t){this.setAttribute(y.ENV_KEY,`${t}`)}get noVolumePref(){return this.hasAttribute(k.NO_VOLUME_PREF)}set noVolumePref(t){t?this.setAttribute(k.NO_VOLUME_PREF,""):this.removeAttribute(k.NO_VOLUME_PREF)}get noMutedPref(){return this.hasAttribute(k.NO_MUTED_PREF)}set noMutedPref(t){t?this.setAttribute(k.NO_MUTED_PREF,""):this.removeAttribute(k.NO_MUTED_PREF)}get debug(){return Mi(this,y.DEBUG)!=null}set debug(t){t?this.setAttribute(y.DEBUG,""):this.removeAttribute(y.DEBUG)}get disableTracking(){return Mi(this,y.DISABLE_TRACKING)!=null}set disableTracking(t){this.toggleAttribute(y.DISABLE_TRACKING,!!t)}get disableCookies(){return Mi(this,y.DISABLE_COOKIES)!=null}set disableCookies(t){t?this.setAttribute(y.DISABLE_COOKIES,""):this.removeAttribute(y.DISABLE_COOKIES)}get streamType(){var t,e,i;return(i=(e=this.getAttribute(y.STREAM_TYPE))!=null?e:(t=this.media)==null?void 0:t.streamType)!=null?i:Z.UNKNOWN}set streamType(t){this.setAttribute(y.STREAM_TYPE,`${t}`)}get defaultStreamType(){var t,e,i;return(i=(e=this.getAttribute(k.DEFAULT_STREAM_TYPE))!=null?e:(t=this.mediaController)==null?void 0:t.getAttribute(k.DEFAULT_STREAM_TYPE))!=null?i:Z.ON_DEMAND}set defaultStreamType(t){t?this.setAttribute(k.DEFAULT_STREAM_TYPE,t):this.removeAttribute(k.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var t,e;return this.hasAttribute(k.TARGET_LIVE_WINDOW)?+this.getAttribute(k.TARGET_LIVE_WINDOW):(e=(t=this.media)==null?void 0:t.targetLiveWindow)!=null?e:Number.NaN}set targetLiveWindow(t){t==this.targetLiveWindow||Number.isNaN(t)&&Number.isNaN(this.targetLiveWindow)||(t==null?this.removeAttribute(k.TARGET_LIVE_WINDOW):this.setAttribute(k.TARGET_LIVE_WINDOW,`${+t}`))}get liveEdgeStart(){var t;return(t=this.media)==null?void 0:t.liveEdgeStart}get startTime(){return ze(Mi(this,y.START_TIME))}set startTime(t){this.setAttribute(y.START_TIME,`${t}`)}get preferPlayback(){let t=this.getAttribute(y.PREFER_PLAYBACK);if(t===Ft.MSE||t===Ft.NATIVE)return t}set preferPlayback(t){t!==this.preferPlayback&&(t===Ft.MSE||t===Ft.NATIVE?this.setAttribute(y.PREFER_PLAYBACK,t):this.removeAttribute(y.PREFER_PLAYBACK))}get metadata(){var t;return(t=this.media)==null?void 0:t.metadata}set metadata(t){if(_e(this,de,bi).call(this),!this.media){nt("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...Fh(this),...t}}get _hlsConfig(){var t;return(t=this.media)==null?void 0:t._hlsConfig}set _hlsConfig(t){if(_e(this,de,bi).call(this),!this.media){nt("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=t}async addCuePoints(t){var e;if(_e(this,de,bi).call(this),!this.media){nt("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(e=this.media)==null?void 0:e.addCuePoints(t)}get activeCuePoint(){var t;return(t=this.media)==null?void 0:t.activeCuePoint}get cuePoints(){var t,e;return(e=(t=this.media)==null?void 0:t.cuePoints)!=null?e:[]}addChapters(t){var e;if(_e(this,de,bi).call(this),!this.media){nt("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(e=this.media)==null?void 0:e.addChapters(t)}get activeChapter(){var t;return(t=this.media)==null?void 0:t.activeChapter}get chapters(){var t,e;return(e=(t=this.media)==null?void 0:t.chapters)!=null?e:[]}getStartDate(){var t;return(t=this.media)==null?void 0:t.getStartDate()}get currentPdt(){var t;return(t=this.media)==null?void 0:t.currentPdt}get tokens(){let t=this.getAttribute(k.PLAYBACK_TOKEN),e=this.getAttribute(k.DRM_TOKEN),i=this.getAttribute(k.THUMBNAIL_TOKEN),a=this.getAttribute(k.STORYBOARD_TOKEN);return{...z(this,Qs),...t!=null?{playback:t}:{},...e!=null?{drm:e}:{},...i!=null?{thumbnail:i}:{},...a!=null?{storyboard:a}:{}}}set tokens(t){Yt(this,Qs,t??{})}get playbackToken(){var t;return(t=this.getAttribute(k.PLAYBACK_TOKEN))!=null?t:void 0}set playbackToken(t){this.setAttribute(k.PLAYBACK_TOKEN,`${t}`)}get drmToken(){var t;return(t=this.getAttribute(k.DRM_TOKEN))!=null?t:void 0}set drmToken(t){this.setAttribute(k.DRM_TOKEN,`${t}`)}get thumbnailToken(){var t;return(t=this.getAttribute(k.THUMBNAIL_TOKEN))!=null?t:void 0}set thumbnailToken(t){this.setAttribute(k.THUMBNAIL_TOKEN,`${t}`)}get storyboardToken(){var t;return(t=this.getAttribute(k.STORYBOARD_TOKEN))!=null?t:void 0}set storyboardToken(t){this.setAttribute(k.STORYBOARD_TOKEN,`${t}`)}addTextTrack(t,e,i,a){var r;let s=(r=this.media)==null?void 0:r.nativeEl;if(s)return Hd(s,t,e,i,a)}removeTextTrack(t){var e;let i=(e=this.media)==null?void 0:e.nativeEl;if(i)return Y_(i,t)}get textTracks(){var t;return(t=this.media)==null?void 0:t.textTracks}get castReceiver(){var t;return(t=this.getAttribute(k.CAST_RECEIVER))!=null?t:void 0}set castReceiver(t){t!==this.castReceiver&&(t?this.setAttribute(k.CAST_RECEIVER,t):this.removeAttribute(k.CAST_RECEIVER))}get castCustomData(){var t;return(t=this.media)==null?void 0:t.castCustomData}set castCustomData(t){if(!this.media){nt("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=t}get noTooltips(){return this.hasAttribute(k.NO_TOOLTIPS)}set noTooltips(t){if(!t){this.removeAttribute(k.NO_TOOLTIPS);return}this.setAttribute(k.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(k.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(t){t?this.setAttribute(k.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(k.PROUDLY_DISPLAY_MUX_BADGE)}};Ys=new WeakMap,Gs=new WeakMap,Qs=new WeakMap,Bi=new WeakMap,Zs=new WeakMap,ja=new WeakMap,de=new WeakSet,bi=n(function(){var t,e,i,a;if(!z(this,Gs)){Yt(this,Gs,!0),_e(this,de,Wi).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof Wt.HTMLElement))throw""}catch{nt("<media-theme> failed to upgrade!")}try{customElements.upgrade(this.media)}catch{nt("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof E0))throw""}catch{nt("<media-controller> failed to upgrade!")}_e(this,de,Yh).call(this),_e(this,de,Gh).call(this),_e(this,de,Qh).call(this),Yt(this,Bi,(e=(t=this.mediaController)==null?void 0:t.hasAttribute(x.USER_INACTIVE))!=null?e:!0),_e(this,de,Zh).call(this),(i=this.media)==null||i.addEventListener("streamtypechange",()=>_e(this,de,Wi).call(this)),(a=this.media)==null||a.addEventListener("loadstart",()=>_e(this,de,Wi).call(this))}},"w"),ef=n(function(){var t,e;try{(t=window?.CSS)==null||t.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(e=window?.CSS)==null||e.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},"Nt"),Md=n(function(t){Object.assign(z(this,ja),t),_e(this,de,Wi).call(this)},"we"),Wi=n(function(t={}){DT(MT(KT(this,{...z(this,ja),...t})),this.shadowRoot)},"H"),Yh=n(function(){let t=n(e=>{var i,a;if(!(e!=null&&e.startsWith("theme-")))return;let r=e.replace(/^theme-/,"");if(Ld.includes(r))return;let s=this.getAttribute(e);s!=null?(i=this.mediaTheme)==null||i.setAttribute(r,s):(a=this.mediaTheme)==null||a.removeAttribute(r)},"e");new MutationObserver(e=>{for(let{attributeName:i}of e)t(i)}).observe(this,{attributes:!0}),this.getAttributeNames().forEach(t)},"wt"),Gh=n(function(){let t=n(e=>{var i;let a=(i=this.media)==null?void 0:i.error;if(!(a instanceof C)){let{message:s,code:o}=a??{};a=new C(s,o)}if(!(a!=null&&a.fatal)){ei(a),a.data&&ei(`${a.name} data:`,a.data);return}let r=Hh(a);r.message&&Zv(r),nt(a),a.data&&nt(`${a.name} data:`,a.data),_e(this,de,Md).call(this,{isDialogOpen:!0})},"e");this.addEventListener("error",t),this.media&&(this.media.errorTranslator=(e={})=>{var i,a,r;if(!(((i=this.media)==null?void 0:i.error)instanceof C))return e;let s=Hh((a=this.media)==null?void 0:a.error);return{player_error_code:(r=this.media)==null?void 0:r.error.code,player_error_message:s.message?String(s.message):e.player_error_message,player_error_context:s.context?String(s.context):e.player_error_context}})},"It"),Qh=n(function(){var t,e,i,a;let r=n(()=>_e(this,de,Wi).call(this),"e");(e=(t=this.media)==null?void 0:t.textTracks)==null||e.addEventListener("addtrack",r),(a=(i=this.media)==null?void 0:i.textTracks)==null||a.addEventListener("removetrack",r)},"Pt"),Zh=n(function(){var t,e;if(!/Firefox/i.test(navigator.userAgent))return;let i,a=new WeakMap,r=n(()=>this.streamType===Z.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,"n"),s=n((d,u,p=!1)=>{r()||Array.from(d&&d.activeCues||[]).forEach(v=>{if(!(!v.snapToLines||v.line<-5||v.line>=0&&v.line<10))if(!u||this.paused){let m=v.text.split(`
`).length,h=-3;this.streamType===Z.LIVE&&(h=-2);let f=h-m;if(v.line===f&&!p)return;a.has(v)||a.set(v,v.line),v.line=f}else setTimeout(()=>{v.line=a.get(v)||"auto"},500)})},"d"),o=n(()=>{var d,u;s(i,(u=(d=this.mediaController)==null?void 0:d.hasAttribute(x.USER_INACTIVE))!=null?u:!1)},"l"),l=n(()=>{var d,u;let p=Array.from(((u=(d=this.mediaController)==null?void 0:d.media)==null?void 0:u.textTracks)||[]).filter(v=>["subtitles","captions"].includes(v.kind)&&v.mode==="showing")[0];p!==i&&i?.removeEventListener("cuechange",o),i=p,i?.addEventListener("cuechange",o),s(i,z(this,Bi))},"b");l(),(t=this.textTracks)==null||t.addEventListener("change",l),(e=this.textTracks)==null||e.addEventListener("addtrack",l),this.addEventListener("userinactivechange",()=>{var d,u;let p=(u=(d=this.mediaController)==null?void 0:d.hasAttribute(x.USER_INACTIVE))!=null?u:!0;z(this,Bi)!==p&&(Yt(this,Bi,p),s(i,z(this,Bi)))})},"Dt");function Mi(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}n(Mi,"V");var zh=jT,tf=class{static{n(this,"o")}addEventListener(){}removeEventListener(){}dispatchEvent(t){return!0}};if(typeof DocumentFragment>"u"){class t extends tf{static{n(this,"e")}}globalThis.DocumentFragment=t}var XT=class extends tf{static{n(this,"s")}},JT={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(XT)}},eA={customElements:JT},tA=typeof window>"u"||typeof globalThis.customElements>"u",fl=tA?eA:globalThis;fl.customElements.get("mux-player")||(fl.customElements.define("mux-player",zh),fl.MuxPlayerElement=zh);var af=parseInt(en.version)>=19,jh={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate"},iA=n(t=>t==null,"B"),aA=n((t,e)=>iA(e)?!1:t in e,"ee"),rA=n(t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),"te"),nA=n((t,e)=>{if(!(!af&&typeof e=="boolean"&&!e)){if(aA(t,jh))return jh[t];if(typeof e<"u")return/[A-Z]/.test(t)?rA(t):t}},"ne"),sA=n((t,e)=>!af&&typeof t=="boolean"?"":t,"ae"),oA=n((t={})=>{let{ref:e,...i}=t;return Object.entries(i).reduce((a,[r,s])=>{let o=nA(r,s);if(!o)return a;let l=sA(s);return a[o]=l,a},{})},"P");function Xh(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}n(Xh,"x");function lA(...t){return e=>{let i=!1,a=t.map(r=>{let s=Xh(r,e);return!i&&typeof s=="function"&&(i=!0),s});if(i)return()=>{for(let r=0;r<a.length;r++){let s=a[r];typeof s=="function"?s():Xh(t[r],null)}}}}n(lA,"re");function dA(...t){return tn.useCallback(lA(...t),t)}n(dA,"f");var uA=Object.prototype.hasOwnProperty,cA=n((t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((r,s)=>e[s]===r);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let r=0;r<i.length;r++)if(!uA.call(e,i[r])||!Object.is(t[i[r]],e[i[r]]))return!1;return!0},"ue"),rf=n((t,e,i)=>!cA(e,t[i]),"p"),hA=n((t,e,i)=>{t[i]=e},"se"),mA=n((t,e,i,a=hA,r=rf)=>tn.useEffect(()=>{let s=i?.current;s&&r(s,e,t)&&a(s,e,t)},[i?.current,e]),"ie"),It=mA,pA=n(()=>{try{return"3.9.2"}catch{}return"UNKNOWN"},"ye"),vA=pA(),fA=n(()=>vA,"g"),se=n((t,e,i)=>tn.useEffect(()=>{let a=e?.current;if(!a||!i)return;let r=t,s=i;return a.addEventListener(r,s),()=>{a.removeEventListener(r,s)}},[e?.current,i,t]),"r"),EA=en.forwardRef(({children:t,...e},i)=>en.createElement("mux-player",{suppressHydrationWarning:!0,...oA(e),ref:i},t)),_A=n((t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:s,onLoadStart:o,onLoadedData:l,onLoadedMetadata:d,onProgress:u,onDurationChange:p,onVolumeChange:v,onRateChange:m,onResize:h,onWaiting:f,onPlay:_,onPlaying:g,onTimeUpdate:T,onPause:A,onSeeking:b,onSeeked:S,onStalled:L,onSuspend:N,onEnded:B,onError:G,onCuePointChange:ee,onChapterChange:V,metadata:U,tokens:xe,paused:Fe,playbackId:Ke,playbackRates:me,currentTime:Pe,themeProps:At,extraSourceParams:$e,castCustomData:dt,_hlsConfig:Ve,...Se}=e;return It("tokens",xe,t),It("playbackId",Ke,t),It("playbackRates",me,t),It("metadata",U,t),It("extraSourceParams",$e,t),It("_hlsConfig",Ve,t),It("themeProps",At,t),It("castCustomData",dt,t),It("paused",Fe,t,(qe,et)=>{et!=null&&(et?qe.pause():qe.play())},(qe,et,sa)=>qe.hasAttribute("autoplay")&&!qe.hasPlayed?!1:rf(qe,et,sa)),It("currentTime",Pe,t,(qe,et)=>{et!=null&&(qe.currentTime=et)}),se("abort",t,i),se("canplay",t,a),se("canplaythrough",t,r),se("emptied",t,s),se("loadstart",t,o),se("loadeddata",t,l),se("loadedmetadata",t,d),se("progress",t,u),se("durationchange",t,p),se("volumechange",t,v),se("ratechange",t,m),se("resize",t,h),se("waiting",t,f),se("play",t,_),se("playing",t,g),se("timeupdate",t,T),se("pause",t,A),se("seeking",t,b),se("seeked",t,S),se("stalled",t,L),se("suspend",t,N),se("ended",t,B),se("error",t,G),se("cuepointchange",t,ee),se("chapterchange",t,V),[Se]},"xe"),bA=fA(),gA="mux-player-react",yA=en.forwardRef((t,e)=>{var i;let a=tn.useRef(null),r=dA(a,e),[s]=_A(a,t),[o]=tn.useState((i=t.playerInitTime)!=null?i:Kd());return en.createElement(EA,{ref:r,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:gA,playerSoftwareVersion:bA,playerInitTime:o,...s})}),VA=yA;export{IA as MaxResolution,C as MediaError,RA as MinResolution,CA as RenditionOrder,VA as default,Kd as generatePlayerInitTime,gA as playerSoftwareName,bA as playerSoftwareVersion};

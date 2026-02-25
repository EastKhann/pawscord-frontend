var Hm=Object.defineProperty;var Cb=Object.getPrototypeOf;var Lb=Reflect.get;var Bm=t=>{throw TypeError(t)};var Db=(t,e,i)=>e in t?Hm(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var n=(t,e)=>Hm(t,"name",{value:e,configurable:!0});var Wm=(t,e,i)=>Db(t,typeof e!="symbol"?e+"":e,i),pd=(t,e,i)=>e.has(t)||Bm("Cannot "+i);var S=(t,e,i)=>(pd(t,e,"read from private field"),i?i.call(t):e.get(t)),Fe=(t,e,i)=>e.has(t)?Bm("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),dt=(t,e,i,a)=>(pd(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ut=(t,e,i)=>(pd(t,e,"access private method"),i);var $s=(t,e,i)=>Lb(Cb(t),i,e);import{a as Yn,r as Gn}from"./react-core-Djgtqrmb.js";import{H as Mb}from"./hls-BvDJDaNM.js";import{C as Us,M as xb}from"./mixin-3xgmAQp_.js";var Ob=Object.create,wv=Object.defineProperty,Nb=Object.getOwnPropertyDescriptor,Pb=Object.getOwnPropertyNames,$b=Object.getPrototypeOf,Ub=Object.prototype.hasOwnProperty,Iv=n(function(t,e){return function(){return t&&(e=t(t=0)),e}},"pt$2"),Ge=n(function(t,e){return function(){return e||t((e={exports:{}}).exports,e),e.exports}},"B$3"),Hb=n(function(t,e,i,a){if(e&&typeof e=="object"||typeof e=="function")for(var r=Pb(e),s=0,o=r.length,l;s<o;s++)l=r[s],!Ub.call(t,l)&&l!==i&&wv(t,l,{get:function(d){return e[d]}.bind(null,l),enumerable:!(a=Nb(e,l))||a.enumerable});return t},"ta$1"),st=n(function(t,e,i){return i=t!=null?Ob($b(t)):{},Hb(!t||!t.__esModule?wv(i,"default",{value:t,enumerable:!0}):i,t)},"V$2"),Lt=Ge(function(t,e){var i;typeof window<"u"?i=window:typeof global<"u"?i=global:typeof self<"u"?i=self:i={},e.exports=i});function ka(t,e){return e!=null&&typeof Symbol<"u"&&e[Symbol.hasInstance]?!!e[Symbol.hasInstance](t):ka(t,e)}n(ka,"U$2");var Sa=Iv(function(){Sa()});function Rv(t){"@swc/helpers - typeof";return t&&typeof Symbol<"u"&&t.constructor===Symbol?"symbol":typeof t}n(Rv,"Ne$2");var Cv=Iv(function(){}),Lv=Ge(function(t,e){var i=Array.prototype.slice;e.exports=a;function a(r,s){for(("length"in r)||(r=[r]),r=i.call(r);r.length;){var o=r.shift(),l=s(o);if(l)return l;o.childNodes&&o.childNodes.length&&(r=i.call(o.childNodes).concat(r))}}n(a,"Pa")}),Bb=Ge(function(t,e){Sa(),e.exports=i;function i(a,r){if(!ka(this,i))return new i(a,r);this.data=a,this.nodeValue=a,this.length=a.length,this.ownerDocument=r||null}n(i,"me"),i.prototype.nodeType=8,i.prototype.nodeName="#comment",i.prototype.toString=function(){return"[object Comment]"}}),Wb=Ge(function(t,e){Sa(),e.exports=i;function i(a,r){if(!ka(this,i))return new i(a);this.data=a||"",this.length=this.data.length,this.ownerDocument=r||null}n(i,"ae"),i.prototype.type="DOMTextNode",i.prototype.nodeType=3,i.prototype.nodeName="#text",i.prototype.toString=function(){return this.data},i.prototype.replaceData=function(a,r,s){var o=this.data,l=o.substring(0,a),d=o.substring(a+r,o.length);this.data=l+s+d,this.length=this.data.length}}),Dv=Ge(function(t,e){e.exports=i;function i(a){var r=this,s=a.type;a.target||(a.target=r),r.listeners||(r.listeners={});var o=r.listeners[s];if(o)return o.forEach(function(l){a.currentTarget=r,typeof l=="function"?l(a):l.handleEvent(a)});r.parentNode&&r.parentNode.dispatchEvent(a)}n(i,"Ia")}),Mv=Ge(function(t,e){e.exports=i;function i(a,r){var s=this;s.listeners||(s.listeners={}),s.listeners[a]||(s.listeners[a]=[]),s.listeners[a].indexOf(r)===-1&&s.listeners[a].push(r)}n(i,"Na")}),xv=Ge(function(t,e){e.exports=i;function i(a,r){var s=this;if(s.listeners&&s.listeners[a]){var o=s.listeners[a],l=o.indexOf(r);l!==-1&&o.splice(l,1)}}n(i,"La")}),Fb=Ge(function(t,e){Cv(),e.exports=a;var i=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];function a(m){switch(m.nodeType){case 3:return p(m.data);case 8:return"<!--"+m.data+"-->";default:return r(m)}}n(a,"gr");function r(m){var h=[],f=m.tagName;return m.namespaceURI==="http://www.w3.org/1999/xhtml"&&(f=f.toLowerCase()),h.push("<"+f+u(m)+l(m)),i.indexOf(f)>-1?h.push(" />"):(h.push(">"),m.childNodes.length?h.push.apply(h,m.childNodes.map(a)):m.textContent||m.innerText?h.push(p(m.textContent||m.innerText)):m.innerHTML&&h.push(m.innerHTML),h.push("</"+f+">")),h.join("")}n(r,"Ma");function s(m,h){var f=Rv(m[h]);return h==="style"&&Object.keys(m.style).length>0?!0:m.hasOwnProperty(h)&&(f==="string"||f==="boolean"||f==="number")&&h!=="nodeName"&&h!=="className"&&h!=="tagName"&&h!=="textContent"&&h!=="innerText"&&h!=="namespaceURI"&&h!=="innerHTML"}n(s,"Ha");function o(m){if(typeof m=="string")return m;var h="";return Object.keys(m).forEach(function(f){var _=m[f];f=f.replace(/[A-Z]/g,function(b){return"-"+b.toLowerCase()}),h+=f+":"+_+";"}),h}n(o,"Ba");function l(m){var h=m.dataset,f=[];for(var _ in h)f.push({name:"data-"+_,value:h[_]});return f.length?d(f):""}n(l,"Ua");function d(m){var h=[];return m.forEach(function(f){var _=f.name,b=f.value;_==="style"&&(b=o(b)),h.push(_+'="'+v(b)+'"')}),h.length?" "+h.join(" "):""}n(d,"br");function u(m){var h=[];for(var f in m)s(m,f)&&h.push({name:f,value:m[f]});for(var _ in m._attributes)for(var b in m._attributes[_]){var y=m._attributes[_][b],A=(y.prefix?y.prefix+":":"")+b;h.push({name:A,value:y.value})}return m.className&&h.push({name:"class",value:m.className}),h.length?d(h):""}n(u,"Fa");function p(m){var h="";return typeof m=="string"?h=m:m&&(h=m.toString()),h.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}n(p,"et");function v(m){return p(m).replace(/"/g,"&quot;")}n(v,"Va")}),Ov=Ge(function(t,e){Sa();var i=Lv(),a=Dv(),r=Mv(),s=xv(),o=Fb(),l="http://www.w3.org/1999/xhtml";e.exports=d;function d(u,p,v){if(!ka(this,d))return new d(u);var m=v===void 0?l:v||null;this.tagName=m===l?String(u).toUpperCase():u,this.nodeName=this.tagName,this.className="",this.dataset={},this.childNodes=[],this.parentNode=null,this.style={},this.ownerDocument=p||null,this.namespaceURI=m,this._attributes={},this.tagName==="INPUT"&&(this.type="text")}n(d,"I"),d.prototype.type="DOMElement",d.prototype.nodeType=1,d.prototype.appendChild=function(u){return u.parentNode&&u.parentNode.removeChild(u),this.childNodes.push(u),u.parentNode=this,u},d.prototype.replaceChild=function(u,p){u.parentNode&&u.parentNode.removeChild(u);var v=this.childNodes.indexOf(p);return p.parentNode=null,this.childNodes[v]=u,u.parentNode=this,p},d.prototype.removeChild=function(u){var p=this.childNodes.indexOf(u);return this.childNodes.splice(p,1),u.parentNode=null,u},d.prototype.insertBefore=function(u,p){u.parentNode&&u.parentNode.removeChild(u);var v=p==null?-1:this.childNodes.indexOf(p);return v>-1?this.childNodes.splice(v,0,u):this.childNodes.push(u),u.parentNode=this,u},d.prototype.setAttributeNS=function(u,p,v){var m=null,h=p,f=p.indexOf(":");if(f>-1&&(m=p.substr(0,f),h=p.substr(f+1)),this.tagName==="INPUT"&&p==="type")this.type=v;else{var _=this._attributes[u]||(this._attributes[u]={});_[h]={value:v,prefix:m}}},d.prototype.getAttributeNS=function(u,p){var v=this._attributes[u],m=v&&v[p]&&v[p].value;return this.tagName==="INPUT"&&p==="type"?this.type:typeof m!="string"?null:m},d.prototype.removeAttributeNS=function(u,p){var v=this._attributes[u];v&&delete v[p]},d.prototype.hasAttributeNS=function(u,p){var v=this._attributes[u];return!!v&&p in v},d.prototype.setAttribute=function(u,p){return this.setAttributeNS(null,u,p)},d.prototype.getAttribute=function(u){return this.getAttributeNS(null,u)},d.prototype.removeAttribute=function(u){return this.removeAttributeNS(null,u)},d.prototype.hasAttribute=function(u){return this.hasAttributeNS(null,u)},d.prototype.removeEventListener=s,d.prototype.addEventListener=r,d.prototype.dispatchEvent=a,d.prototype.focus=function(){},d.prototype.toString=function(){return o(this)},d.prototype.getElementsByClassName=function(u){var p=u.split(" "),v=[];return i(this,function(m){if(m.nodeType===1){var h=m.className||"",f=h.split(" ");p.every(function(_){return f.indexOf(_)!==-1})&&v.push(m)}}),v},d.prototype.getElementsByTagName=function(u){u=u.toLowerCase();var p=[];return i(this.childNodes,function(v){v.nodeType===1&&(u==="*"||v.tagName.toLowerCase()===u)&&p.push(v)}),p},d.prototype.contains=function(u){return i(this,function(p){return u===p})||!1}}),Kb=Ge(function(t,e){Sa();var i=Ov();e.exports=a;function a(r){if(!ka(this,a))return new a;this.childNodes=[],this.parentNode=null,this.ownerDocument=r||null}n(a,"K"),a.prototype.type="DocumentFragment",a.prototype.nodeType=11,a.prototype.nodeName="#document-fragment",a.prototype.appendChild=i.prototype.appendChild,a.prototype.replaceChild=i.prototype.replaceChild,a.prototype.removeChild=i.prototype.removeChild,a.prototype.toString=function(){return this.childNodes.map(function(r){return String(r)}).join("")}}),Vb=Ge(function(t,e){e.exports=i;function i(a){}n(i,"it"),i.prototype.initEvent=function(a,r,s){this.type=a,this.bubbles=r,this.cancelable=s},i.prototype.preventDefault=function(){}}),qb=Ge(function(t,e){Sa();var i=Lv(),a=Bb(),r=Wb(),s=Ov(),o=Kb(),l=Vb(),d=Dv(),u=Mv(),p=xv();e.exports=v;function v(){if(!ka(this,v))return new v;this.head=this.createElement("head"),this.body=this.createElement("body"),this.documentElement=this.createElement("html"),this.documentElement.appendChild(this.head),this.documentElement.appendChild(this.body),this.childNodes=[this.documentElement],this.nodeType=9}n(v,"Be");var m=v.prototype;m.createTextNode=function(h){return new r(h,this)},m.createElementNS=function(h,f){var _=h===null?null:String(h);return new s(f,this,_)},m.createElement=function(h){return new s(h,this)},m.createDocumentFragment=function(){return new o(this)},m.createEvent=function(h){return new l(h)},m.createComment=function(h){return new a(h,this)},m.getElementById=function(h){h=String(h);var f=i(this.childNodes,function(_){if(String(_.id)===h)return _});return f||null},m.getElementsByClassName=s.prototype.getElementsByClassName,m.getElementsByTagName=s.prototype.getElementsByTagName,m.contains=s.prototype.contains,m.removeEventListener=p,m.addEventListener=u,m.dispatchEvent=d}),Yb=Ge(function(t,e){var i=qb();e.exports=new i}),Nv=Ge(function(t,e){var i=typeof global<"u"?global:typeof window<"u"?window:{},a=Yb(),r;typeof document<"u"?r=document:(r=i["__GLOBAL_DOCUMENT_CACHE@4"],r||(r=i["__GLOBAL_DOCUMENT_CACHE@4"]=a)),e.exports=r});function Gb(t){if(Array.isArray(t))return t}n(Gb,"vt$2");function Qb(t,e){var i=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(i!=null){var a=[],r=!0,s=!1,o,l;try{for(i=i.call(t);!(r=(o=i.next()).done)&&(a.push(o.value),!(e&&a.length===e));r=!0);}catch(d){s=!0,l=d}finally{try{!r&&i.return!=null&&i.return()}finally{if(s)throw l}}return a}}n(Qb,"mt$2");function Zb(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}n(Zb,"ht$1");function $d(t,e){(e==null||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}n($d,"ke$2");function Pv(t,e){if(t){if(typeof t=="string")return $d(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);if(i==="Object"&&t.constructor&&(i=t.constructor.name),i==="Map"||i==="Set")return Array.from(i);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return $d(t,e)}}n(Pv,"Ae$2");function fi(t,e){return Gb(t)||Qb(t,e)||Pv(t,e)||Zb()}n(fi,"H$2");var Nn=st(Lt()),Fm=st(Lt()),jb=st(Lt()),zb={now:n(function(){var t=jb.default.performance,e=t&&t.timing,i=e&&e.navigationStart,a=typeof i=="number"&&typeof t.now=="function"?i+t.now():Date.now();return Math.round(a)},"now")},ke=zb,Qn=n(function(){var t,e,i;if(typeof((t=Fm.default.crypto)===null||t===void 0?void 0:t.getRandomValues)=="function"){i=new Uint8Array(32),Fm.default.crypto.getRandomValues(i);for(var a=0;a<32;a++)i[a]=i[a]%16}else{i=[];for(var r=0;r<32;r++)i[r]=Math.random()*16|0}var s=0;e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(d){var u=d==="x"?i[s]:i[s]&3|8;return s++,u.toString(16)});var o=ke.now(),l=o?.toString(16).substring(3);return l?e.substring(0,28)+l:e},"ee$3"),$v=n(function(){return("000000"+(Math.random()*Math.pow(36,6)<<0).toString(36)).slice(-6)},"Oe$1"),Tt=n(function(t){if(t&&typeof t.nodeName<"u")return t.muxId||(t.muxId=$v()),t.muxId;var e;try{e=document.querySelector(t)}catch{}return e&&!e.muxId&&(e.muxId=t),e?.muxId||t},"Q$2"),ml=n(function(t){var e;t&&typeof t.nodeName<"u"?(e=t,t=Tt(e)):e=document.querySelector(t);var i=e&&e.nodeName?e.nodeName.toLowerCase():"";return[e,t,i]},"se$3");function Xb(t){if(Array.isArray(t))return $d(t)}n(Xb,"bt$2");function Jb(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}n(Jb,"Tt$2");function e_(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}n(e_,"wt$2");function At(t){return Xb(t)||Jb(t)||Pv(t)||e_()}n(At,"W$1");var ra={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4},t_=n(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:3,i,a,r,s,o,l=[console,t],d=(i=console.trace).bind.apply(i,At(l)),u=(a=console.info).bind.apply(a,At(l)),p=(r=console.debug).bind.apply(r,At(l)),v=(s=console.warn).bind.apply(s,At(l)),m=(o=console.error).bind.apply(o,At(l)),h=e;return{trace:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(h>ra.TRACE))return d.apply(void 0,At(_))},"trace"),debug:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(h>ra.DEBUG))return p.apply(void 0,At(_))},"debug"),info:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(h>ra.INFO))return u.apply(void 0,At(_))},"info"),warn:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(h>ra.WARN))return v.apply(void 0,At(_))},"warn"),error:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(h>ra.ERROR))return m.apply(void 0,At(_))},"error"),get level(){return h},set level(f){f!==this.level&&(h=f??e)}}},"Et$2"),re=t_("[mux]"),vd=st(Lt());function Ud(){var t=vd.default.doNotTrack||vd.default.navigator&&vd.default.navigator.doNotTrack;return t==="1"}n(Ud,"ce$1");function $(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n($,"g$5");Sa();function Oe(t,e){if(!ka(t,e))throw new TypeError("Cannot call a class as a function")}n(Oe,"D$3");function i_(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}n(i_,"kt$1");function ri(t,e,i){return e&&i_(t.prototype,e),t}n(ri,"L$1");function R(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}n(R,"l$1");function Hr(t){return Hr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Hr(t)}n(Hr,"X$2");function a_(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&(t=Hr(t),t!==null););return t}n(a_,"xt$2");function ro(t,e,i){return typeof Reflect<"u"&&Reflect.get?ro=Reflect.get:ro=n(function(a,r,s){var o=a_(a,r);if(o){var l=Object.getOwnPropertyDescriptor(o,r);return l.get?l.get.call(s||a):l.value}},"De$1"),ro(t,e,i||t)}n(ro,"De$1");function Hd(t,e){return Hd=Object.setPrototypeOf||function(i,a){return i.__proto__=a,i},Hd(t,e)}n(Hd,"Ie$1");function r_(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&Hd(t,e)}n(r_,"Dt$2");function n_(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}n(n_,"St$1");Cv();function s_(t,e){return e&&(Rv(e)==="object"||typeof e=="function")?e:$(t)}n(s_,"Rt$1");function o_(t){var e=n_();return function(){var i=Hr(t),a;if(e){var r=Hr(this).constructor;a=Reflect.construct(i,arguments,r)}else a=i.apply(this,arguments);return s_(this,a)}}n(o_,"qt$2");var Rt=n(function(t){return Zn(t)[0]},"F$2"),Zn=n(function(t){if(typeof t!="string"||t==="")return["localhost"];var e=/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,i=t.match(e)||[],a=i[4],r;return a&&(r=(a.match(/[^\.]+\.[^\.]+$/)||[])[0]),[a,r]},"re$3"),fd=st(Lt()),l_={exists:n(function(){var t=fd.default.performance,e=t&&t.timing;return e!==void 0},"exists"),domContentLoadedEventEnd:n(function(){var t=fd.default.performance,e=t&&t.timing;return e&&e.domContentLoadedEventEnd},"domContentLoadedEventEnd"),navigationStart:n(function(){var t=fd.default.performance,e=t&&t.timing;return e&&e.navigationStart},"navigationStart")},pl=l_;function Ae(t,e,i){i=i===void 0?1:i,t[e]=t[e]||0,t[e]+=i}n(Ae,"O$2");function vl(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{},a=Object.keys(i);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(i).filter(function(r){return Object.getOwnPropertyDescriptor(i,r).enumerable}))),a.forEach(function(r){R(t,r,i[r])})}return t}n(vl,"ue$1");function d_(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);i.push.apply(i,a)}return i}n(d_,"ia$1");function vc(t,e){return e=e??{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):d_(Object(e)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}),t}n(vc,"fe$2");var u_=["x-cdn","content-type"],Uv=["x-request-id","cf-ray","x-amz-cf-id","x-akamai-request-id"],c_=u_.concat(Uv);function fc(t){t=t||"";var e={},i=t.trim().split(/[\r\n]+/);return i.forEach(function(a){if(a){var r=a.split(": "),s=r.shift();s&&(c_.indexOf(s.toLowerCase())>=0||s.toLowerCase().indexOf("x-litix-")===0)&&(e[s]=r.join(": "))}}),e}n(fc,"pe");function fl(t){if(t){var e=Uv.find(function(i){return t[i]!==void 0});return e?t[e]:void 0}}n(fl,"de$3");var h_=n(function(t){var e={};for(var i in t){var a=t[i],r=a["DATA-ID"].search("io.litix.data.");if(r!==-1){var s=a["DATA-ID"].replace("io.litix.data.","");e[s]=a.VALUE}}return e},"sa$1"),Hv=h_,Hs=n(function(t){if(!t)return{};var e=pl.navigationStart(),i=t.loading,a=i?i.start:t.trequest,r=i?i.first:t.tfirst,s=i?i.end:t.tload;return{bytesLoaded:t.total,requestStart:Math.round(e+a),responseStart:Math.round(e+r),responseEnd:Math.round(e+s)}},"Me$1"),an=n(function(t){if(!(!t||typeof t.getAllResponseHeaders!="function"))return fc(t.getAllResponseHeaders())},"Se$2"),m_=n(function(t,e,i){var a=arguments.length>4?arguments[4]:void 0,r=t.log,s=t.utils.secondsToMs,o=n(function(b){var y=parseInt(a.version),A;return y===1&&b.programDateTime!==null&&(A=b.programDateTime),y===0&&b.pdt!==null&&(A=b.pdt),A},"s");if(!pl.exists()){r.warn("performance timing not supported. Not tracking HLS.js.");return}var l=n(function(b,y){return t.emit(e,b,y)},"u"),d=n(function(b,y){var A=y.levels,g=y.audioTracks,w=y.url,M=y.stats,P=y.networkDetails,W=y.sessionData,Z={},ae={};A.forEach(function(Ee,Be){Z[Be]={width:Ee.width,height:Ee.height,bitrate:Ee.bitrate,attrs:Ee.attrs}}),g.forEach(function(Ee,Be){ae[Be]={name:Ee.name,language:Ee.lang,bitrate:Ee.bitrate}});var q=Hs(M),H=q.bytesLoaded,$e=q.requestStart,Qe=q.responseStart,Ze=q.responseEnd;l("requestcompleted",vc(vl({},Hv(W)),{request_event_type:b,request_bytes_loaded:H,request_start:$e,request_response_start:Qe,request_response_end:Ze,request_type:"manifest",request_hostname:Rt(w),request_response_headers:an(P),request_rendition_lists:{media:Z,audio:ae,video:{}}}))},"p");i.on(a.Events.MANIFEST_LOADED,d);var u=n(function(b,y){var A=y.details,g=y.level,w=y.networkDetails,M=y.stats,P=Hs(M),W=P.bytesLoaded,Z=P.requestStart,ae=P.responseStart,q=P.responseEnd,H=A.fragments[A.fragments.length-1],$e=o(H)+s(H.duration);l("requestcompleted",{request_event_type:b,request_bytes_loaded:W,request_start:Z,request_response_start:ae,request_response_end:q,request_current_level:g,request_type:"manifest",request_hostname:Rt(A.url),request_response_headers:an(w),video_holdback:A.holdBack&&s(A.holdBack),video_part_holdback:A.partHoldBack&&s(A.partHoldBack),video_part_target_duration:A.partTarget&&s(A.partTarget),video_target_duration:A.targetduration&&s(A.targetduration),video_source_is_live:A.live,player_manifest_newest_program_time:isNaN($e)?void 0:$e})},"b");i.on(a.Events.LEVEL_LOADED,u);var p=n(function(b,y){var A=y.details,g=y.networkDetails,w=y.stats,M=Hs(w),P=M.bytesLoaded,W=M.requestStart,Z=M.responseStart,ae=M.responseEnd;l("requestcompleted",{request_event_type:b,request_bytes_loaded:P,request_start:W,request_response_start:Z,request_response_end:ae,request_type:"manifest",request_hostname:Rt(A.url),request_response_headers:an(g)})},"k");i.on(a.Events.AUDIO_TRACK_LOADED,p);var v=n(function(b,y){var A=y.stats,g=y.networkDetails,w=y.frag;A=A||w.stats;var M=Hs(A),P=M.bytesLoaded,W=M.requestStart,Z=M.responseStart,ae=M.responseEnd,q=g?an(g):void 0,H={request_event_type:b,request_bytes_loaded:P,request_start:W,request_response_start:Z,request_response_end:ae,request_hostname:g?Rt(g.responseURL):void 0,request_id:q?fl(q):void 0,request_response_headers:q,request_media_duration:w.duration,request_url:g?.responseURL};w.type==="main"?(H.request_type="media",H.request_current_level=w.level,H.request_video_width=(i.levels[w.level]||{}).width,H.request_video_height=(i.levels[w.level]||{}).height,H.request_labeled_bitrate=(i.levels[w.level]||{}).bitrate):H.request_type=w.type,l("requestcompleted",H)},"y");i.on(a.Events.FRAG_LOADED,v);var m=n(function(b,y){var A=y.frag,g=A.start,w=o(A),M={currentFragmentPDT:w,currentFragmentStart:s(g)};l("fragmentchange",M)},"c");i.on(a.Events.FRAG_CHANGED,m);var h=n(function(b,y){var A=y.type,g=y.details,w=y.response,M=y.fatal,P=y.frag,W=y.networkDetails,Z=P?.url||y.url||"",ae=W?an(W):void 0;if((g===a.ErrorDetails.MANIFEST_LOAD_ERROR||g===a.ErrorDetails.MANIFEST_LOAD_TIMEOUT||g===a.ErrorDetails.FRAG_LOAD_ERROR||g===a.ErrorDetails.FRAG_LOAD_TIMEOUT||g===a.ErrorDetails.LEVEL_LOAD_ERROR||g===a.ErrorDetails.LEVEL_LOAD_TIMEOUT||g===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||g===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT||g===a.ErrorDetails.SUBTITLE_LOAD_ERROR||g===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT||g===a.ErrorDetails.KEY_LOAD_ERROR||g===a.ErrorDetails.KEY_LOAD_TIMEOUT)&&l("requestfailed",{request_error:g,request_url:Z,request_hostname:Rt(Z),request_id:ae?fl(ae):void 0,request_type:g===a.ErrorDetails.FRAG_LOAD_ERROR||g===a.ErrorDetails.FRAG_LOAD_TIMEOUT?"media":g===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||g===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT?"audio":g===a.ErrorDetails.SUBTITLE_LOAD_ERROR||g===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT?"subtitle":g===a.ErrorDetails.KEY_LOAD_ERROR||g===a.ErrorDetails.KEY_LOAD_TIMEOUT?"encryption":"manifest",request_error_code:w?.code,request_error_text:w?.text}),M){var q,H="".concat(Z?"url: ".concat(Z,`
`):"")+"".concat(w&&(w.code||w.text)?"response: ".concat(w.code,", ").concat(w.text,`
`):"")+"".concat(y.reason?"failure reason: ".concat(y.reason,`
`):"")+"".concat(y.level?"level: ".concat(y.level,`
`):"")+"".concat(y.parent?"parent stream controller: ".concat(y.parent,`
`):"")+"".concat(y.buffer?"buffer length: ".concat(y.buffer,`
`):"")+"".concat(y.error?"error: ".concat(y.error,`
`):"")+"".concat(y.event?"event: ".concat(y.event,`
`):"")+"".concat(y.err?"error message: ".concat((q=y.err)===null||q===void 0?void 0:q.message,`
`):"");l("error",{player_error_code:A,player_error_message:g,player_error_context:H})}},"v");i.on(a.Events.ERROR,h);var f=n(function(b,y){var A=y.frag,g=A&&A._url||"";l("requestcanceled",{request_event_type:b,request_url:g,request_type:"media",request_hostname:Rt(g)})},"T");i.on(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,f);var _=n(function(b,y){var A=y.level,g=i.levels[A];if(g&&g.attrs&&g.attrs.BANDWIDTH){var w=g.attrs.BANDWIDTH,M,P=parseFloat(g.attrs["FRAME-RATE"]);isNaN(P)||(M=P),w?l("renditionchange",{video_source_fps:M,video_source_bitrate:w,video_source_width:g.width,video_source_height:g.height,video_source_rendition_name:g.name,video_source_codec:g?.videoCodec}):r.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js")}},"x");i.on(a.Events.LEVEL_SWITCHED,_),i._stopMuxMonitor=function(){i.off(a.Events.MANIFEST_LOADED,d),i.off(a.Events.LEVEL_LOADED,u),i.off(a.Events.AUDIO_TRACK_LOADED,p),i.off(a.Events.FRAG_LOADED,v),i.off(a.Events.FRAG_CHANGED,m),i.off(a.Events.ERROR,h),i.off(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,f),i.off(a.Events.LEVEL_SWITCHED,_),i.off(a.Events.DESTROYING,i._stopMuxMonitor),delete i._stopMuxMonitor},i.on(a.Events.DESTROYING,i._stopMuxMonitor)},"Ot$2"),p_=n(function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},"Pt$2"),Km=n(function(t,e){if(!t||!t.requestEndDate)return{};var i=Rt(t.url),a=t.url,r=t.bytesLoaded,s=new Date(t.requestStartDate).getTime(),o=new Date(t.firstByteDate).getTime(),l=new Date(t.requestEndDate).getTime(),d=isNaN(t.duration)?0:t.duration,u=typeof e.getMetricsFor=="function"?e.getMetricsFor(t.mediaType).HttpList:e.getDashMetrics().getHttpRequests(t.mediaType),p;u.length>0&&(p=fc(u[u.length-1]._responseHeaders||""));var v=p?fl(p):void 0;return{requestStart:s,requestResponseStart:o,requestResponseEnd:l,requestBytesLoaded:r,requestResponseHeaders:p,requestMediaDuration:d,requestHostname:i,requestUrl:a,requestId:v}},"It$2"),v_=n(function(t,e){var i=e.getQualityFor(t),a=e.getCurrentTrackFor(t).bitrateList;return a?{currentLevel:i,renditionWidth:a[i].width||null,renditionHeight:a[i].height||null,renditionBitrate:a[i].bandwidth}:{}},"ua$1"),f_=n(function(t){var e;return(e=t.match(/.*codecs\*?="(.*)"/))===null||e===void 0?void 0:e[1]},"da$1"),E_=n(function(t){try{var e,i,a=(i=t.getVersion)===null||i===void 0||(e=i.call(t))===null||e===void 0?void 0:e.split(".").map(function(r){return parseInt(r)})[0];return a}catch{return!1}},"la$1"),b_=n(function(t,e,i){var a=t.log;if(!i||!i.on){a.warn("Invalid dash.js player reference. Monitoring blocked.");return}var r=E_(i),s=n(function(A,g){return t.emit(e,A,g)},"o"),o=n(function(A){var g=A.type,w=A.data,M=(w||{}).url;s("requestcompleted",{request_event_type:g,request_start:0,request_response_start:0,request_response_end:0,request_bytes_loaded:-1,request_type:"manifest",request_hostname:Rt(M),request_url:M})},"s");i.on("manifestLoaded",o);var l={},d=n(function(A){if(typeof A.getRequests!="function")return null;var g=A.getRequests({state:"executed"});return g.length===0?null:g[g.length-1]},"p"),u=n(function(A){var g=A.type,w=A.fragmentModel,M=A.chunk,P=d(w);p({type:g,request:P,chunk:M})},"b"),p=n(function(A){var g=A.type,w=A.chunk,M=A.request,P=(w||{}).mediaInfo,W=P||{},Z=W.type,ae=W.bitrateList;ae=ae||[];var q={};ae.forEach(function(je,Le){q[Le]={},q[Le].width=je.width,q[Le].height=je.height,q[Le].bitrate=je.bandwidth,q[Le].attrs={}}),Z==="video"?l.video=q:Z==="audio"?l.audio=q:l.media=q;var H=Km(M,i),$e=H.requestStart,Qe=H.requestResponseStart,Ze=H.requestResponseEnd,Ee=H.requestResponseHeaders,Be=H.requestMediaDuration,Dt=H.requestHostname,We=H.requestUrl,bt=H.requestId;s("requestcompleted",{request_event_type:g,request_start:$e,request_response_start:Qe,request_response_end:Ze,request_bytes_loaded:-1,request_type:Z+"_init",request_response_headers:Ee,request_hostname:Dt,request_id:bt,request_url:We,request_media_duration:Be,request_rendition_lists:l})},"k");r>=4?i.on("initFragmentLoaded",p):i.on("initFragmentLoaded",u);var v=n(function(A){var g=A.type,w=A.fragmentModel,M=A.chunk,P=d(w);m({type:g,request:P,chunk:M})},"y"),m=n(function(A){var g=A.type,w=A.chunk,M=A.request,P=w||{},W=P.mediaInfo,Z=P.start,ae=W||{},q=ae.type,H=Km(M,i),$e=H.requestStart,Qe=H.requestResponseStart,Ze=H.requestResponseEnd,Ee=H.requestBytesLoaded,Be=H.requestResponseHeaders,Dt=H.requestMediaDuration,We=H.requestHostname,bt=H.requestUrl,je=H.requestId,Le=v_(q,i),ze=Le.currentLevel,lt=Le.renditionWidth,wa=Le.renditionHeight,Ns=Le.renditionBitrate;s("requestcompleted",{request_event_type:g,request_start:$e,request_response_start:Qe,request_response_end:Ze,request_bytes_loaded:Ee,request_type:q,request_response_headers:Be,request_hostname:We,request_id:je,request_url:bt,request_media_start_time:Z,request_media_duration:Dt,request_current_level:ze,request_labeled_bitrate:Ns,request_video_width:lt,request_video_height:wa})},"c");r>=4?i.on("mediaFragmentLoaded",m):i.on("mediaFragmentLoaded",v);var h={video:void 0,audio:void 0,totalBitrate:void 0},f=n(function(){if(h.video&&typeof h.video.bitrate=="number"){if(!(h.video.width&&h.video.height)){a.warn("have bitrate info for video but missing width/height");return}var A=h.video.bitrate;if(h.audio&&typeof h.audio.bitrate=="number"&&(A+=h.audio.bitrate),A!==h.totalBitrate)return h.totalBitrate=A,{video_source_bitrate:A,video_source_height:h.video.height,video_source_width:h.video.width,video_source_codec:f_(h.video.codec)}}},"T"),_=n(function(A,g,w){if(typeof A.newQuality!="number"){a.warn("missing evt.newQuality in qualityChangeRendered event",A);return}var M=A.mediaType;if(M==="audio"||M==="video"){var P=i.getBitrateInfoListFor(M).find(function(Z){var ae=Z.qualityIndex;return ae===A.newQuality});if(!(P&&typeof P.bitrate=="number")){a.warn("missing bitrate info for ".concat(M));return}h[M]=vc(vl({},P),{codec:i.getCurrentTrackFor(M).codec});var W=f();W&&s("renditionchange",W)}},"x");i.on("qualityChangeRendered",_);var b=n(function(A){var g=A.request,w=A.mediaType;g=g||{},s("requestcanceled",{request_event_type:g.type+"_"+g.action,request_url:g.url,request_type:w,request_hostname:Rt(g.url)})},"m");i.on("fragmentLoadingAbandoned",b);var y=n(function(A){var g=A.error,w,M,P=(g==null||(w=g.data)===null||w===void 0?void 0:w.request)||{},W=(g==null||(M=g.data)===null||M===void 0?void 0:M.response)||{};g?.code===27&&s("requestfailed",{request_error:P.type+"_"+P.action,request_url:P.url,request_hostname:Rt(P.url),request_type:P.mediaType,request_error_code:W.status,request_error_text:W.statusText});var Z="".concat(P!=null&&P.url?"url: ".concat(P.url,`
`):"")+"".concat(W!=null&&W.status||W!=null&&W.statusText?"response: ".concat(W?.status,", ").concat(W?.statusText,`
`):"");s("error",{player_error_code:g?.code,player_error_message:g?.message,player_error_context:Z})},"f");i.on("error",y),i._stopMuxMonitor=function(){i.off("manifestLoaded",o),i.off("initFragmentLoaded",p),i.off("mediaFragmentLoaded",m),i.off("qualityChangeRendered",_),i.off("error",y),i.off("fragmentLoadingAbandoned",b),delete i._stopMuxMonitor}},"Nt$2"),__=n(function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},"Lt$2"),Vm=0,g_=(function(){function t(){Oe(this,t),R(this,"_listeners",void 0)}return n(t,"r"),ri(t,[{key:"on",value:n(function(e,i,a){return i._eventEmitterGuid=i._eventEmitterGuid||++Vm,this._listeners=this._listeners||{},this._listeners[e]=this._listeners[e]||[],a&&(i=i.bind(a)),this._listeners[e].push(i),i},"value")},{key:"off",value:n(function(e,i){var a=this._listeners&&this._listeners[e];a&&a.forEach(function(r,s){r._eventEmitterGuid===i._eventEmitterGuid&&a.splice(s,1)})},"value")},{key:"one",value:n(function(e,i,a){var r=this;i._eventEmitterGuid=i._eventEmitterGuid||++Vm;var s=n(function(){r.off(e,s),i.apply(a||this,arguments)},"o");s._eventEmitterGuid=i._eventEmitterGuid,this.on(e,s)},"value")},{key:"emit",value:n(function(e,i){var a=this;if(this._listeners){i=i||{};var r=this._listeners["before*"]||[],s=this._listeners[e]||[],o=this._listeners["after"+e]||[],l=n(function(d,u){d=d.slice(),d.forEach(function(p){p.call(a,{type:e},u)})},"u");l(r,i),l(s,i),l(o,i)}},"value")}]),t})(),y_=g_,Ed=st(Lt()),T_=(function(){function t(e){var i=this;Oe(this,t),R(this,"_playbackHeartbeatInterval",void 0),R(this,"_playheadShouldBeProgressing",void 0),R(this,"pm",void 0),this.pm=e,this._playbackHeartbeatInterval=null,this._playheadShouldBeProgressing=!1,e.on("playing",function(){i._playheadShouldBeProgressing=!0}),e.on("play",this._startPlaybackHeartbeatInterval.bind(this)),e.on("playing",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adbreakstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplay",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplaying",this._startPlaybackHeartbeatInterval.bind(this)),e.on("devicewake",this._startPlaybackHeartbeatInterval.bind(this)),e.on("viewstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("rebufferstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("pause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("ended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("viewend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("error",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("aderror",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adpause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adbreakend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("seeked",function(){e.data.player_is_paused?i._stopPlaybackHeartbeatInterval():i._startPlaybackHeartbeatInterval()}),e.on("timeupdate",function(){i._playbackHeartbeatInterval!==null&&e.emit("playbackheartbeat")}),e.on("devicesleep",function(a,r){i._playbackHeartbeatInterval!==null&&(Ed.default.clearInterval(i._playbackHeartbeatInterval),e.emit("playbackheartbeatend",{viewer_time:r.viewer_time}),i._playbackHeartbeatInterval=null)})}return n(t,"r"),ri(t,[{key:"_startPlaybackHeartbeatInterval",value:n(function(){var e=this;this._playbackHeartbeatInterval===null&&(this.pm.emit("playbackheartbeat"),this._playbackHeartbeatInterval=Ed.default.setInterval(function(){e.pm.emit("playbackheartbeat")},this.pm.playbackHeartbeatTime))},"value")},{key:"_stopPlaybackHeartbeatInterval",value:n(function(){this._playheadShouldBeProgressing=!1,this._playbackHeartbeatInterval!==null&&(Ed.default.clearInterval(this._playbackHeartbeatInterval),this.pm.emit("playbackheartbeatend"),this._playbackHeartbeatInterval=null)},"value")}]),t})(),A_=T_,k_=n(function t(e){var i=this;Oe(this,t),R(this,"viewErrored",void 0),e.on("viewinit",function(){i.viewErrored=!1}),e.on("error",function(a,r){try{var s=e.errorTranslator({player_error_code:r.player_error_code,player_error_message:r.player_error_message,player_error_context:r.player_error_context,player_error_severity:r.player_error_severity,player_error_business_exception:r.player_error_business_exception});s&&(e.data.player_error_code=s.player_error_code||r.player_error_code,e.data.player_error_message=s.player_error_message||r.player_error_message,e.data.player_error_context=s.player_error_context||r.player_error_context,e.data.player_error_severity=s.player_error_severity||r.player_error_severity,e.data.player_error_business_exception=s.player_error_business_exception||r.player_error_business_exception,i.viewErrored=!0)}catch(o){e.mux.log.warn("Exception in error translator callback.",o),i.viewErrored=!0}}),e.on("aftererror",function(){var a,r,s,o,l;(a=e.data)===null||a===void 0||delete a.player_error_code,(r=e.data)===null||r===void 0||delete r.player_error_message,(s=e.data)===null||s===void 0||delete s.player_error_context,(o=e.data)===null||o===void 0||delete o.player_error_severity,(l=e.data)===null||l===void 0||delete l.player_error_business_exception})},"r"),S_=k_,w_=(function(){function t(e){Oe(this,t),R(this,"_watchTimeTrackerLastCheckedTime",void 0),R(this,"pm",void 0),this.pm=e,this._watchTimeTrackerLastCheckedTime=null,e.on("playbackheartbeat",this._updateWatchTime.bind(this)),e.on("playbackheartbeatend",this._clearWatchTimeState.bind(this))}return n(t,"r"),ri(t,[{key:"_updateWatchTime",value:n(function(e,i){var a=i.viewer_time;this._watchTimeTrackerLastCheckedTime===null&&(this._watchTimeTrackerLastCheckedTime=a),Ae(this.pm.data,"view_watch_time",a-this._watchTimeTrackerLastCheckedTime),this._watchTimeTrackerLastCheckedTime=a},"value")},{key:"_clearWatchTimeState",value:n(function(e,i){this._updateWatchTime(e,i),this._watchTimeTrackerLastCheckedTime=null},"value")}]),t})(),I_=w_,R_=(function(){function t(e){var i=this;Oe(this,t),R(this,"_playbackTimeTrackerLastPlayheadPosition",void 0),R(this,"_lastTime",void 0),R(this,"_isAdPlaying",void 0),R(this,"_callbackUpdatePlaybackTime",void 0),R(this,"pm",void 0),this.pm=e,this._playbackTimeTrackerLastPlayheadPosition=-1,this._lastTime=ke.now(),this._isAdPlaying=!1,this._callbackUpdatePlaybackTime=null;var a=this._startPlaybackTimeTracking.bind(this);e.on("playing",a),e.on("adplaying",a),e.on("seeked",a);var r=this._stopPlaybackTimeTracking.bind(this);e.on("playbackheartbeatend",r),e.on("seeking",r),e.on("adplaying",function(){i._isAdPlaying=!0}),e.on("adended",function(){i._isAdPlaying=!1}),e.on("adpause",function(){i._isAdPlaying=!1}),e.on("adbreakstart",function(){i._isAdPlaying=!1}),e.on("adbreakend",function(){i._isAdPlaying=!1}),e.on("adplay",function(){i._isAdPlaying=!1}),e.on("viewinit",function(){i._playbackTimeTrackerLastPlayheadPosition=-1,i._lastTime=ke.now(),i._isAdPlaying=!1,i._callbackUpdatePlaybackTime=null})}return n(t,"r"),ri(t,[{key:"_startPlaybackTimeTracking",value:n(function(){this._callbackUpdatePlaybackTime===null&&(this._callbackUpdatePlaybackTime=this._updatePlaybackTime.bind(this),this._playbackTimeTrackerLastPlayheadPosition=this.pm.data.player_playhead_time,this.pm.on("playbackheartbeat",this._callbackUpdatePlaybackTime))},"value")},{key:"_stopPlaybackTimeTracking",value:n(function(){this._callbackUpdatePlaybackTime&&(this._updatePlaybackTime(),this.pm.off("playbackheartbeat",this._callbackUpdatePlaybackTime),this._callbackUpdatePlaybackTime=null,this._playbackTimeTrackerLastPlayheadPosition=-1)},"value")},{key:"_updatePlaybackTime",value:n(function(){var e=this.pm.data.player_playhead_time,i=ke.now(),a=-1;this._playbackTimeTrackerLastPlayheadPosition>=0&&e>this._playbackTimeTrackerLastPlayheadPosition?a=e-this._playbackTimeTrackerLastPlayheadPosition:this._isAdPlaying&&(a=i-this._lastTime),a>0&&a<=1e3&&Ae(this.pm.data,"view_content_playback_time",a),this._playbackTimeTrackerLastPlayheadPosition=e,this._lastTime=i},"value")}]),t})(),C_=R_,L_=(function(){function t(e){Oe(this,t),R(this,"pm",void 0),this.pm=e;var i=this._updatePlayheadTime.bind(this);e.on("playbackheartbeat",i),e.on("playbackheartbeatend",i),e.on("timeupdate",i),e.on("destroy",function(){e.off("timeupdate",i)})}return n(t,"r"),ri(t,[{key:"_updateMaxPlayheadPosition",value:n(function(){this.pm.data.view_max_playhead_position=typeof this.pm.data.view_max_playhead_position>"u"?this.pm.data.player_playhead_time:Math.max(this.pm.data.view_max_playhead_position,this.pm.data.player_playhead_time)},"value")},{key:"_updatePlayheadTime",value:n(function(e,i){var a=this,r=n(function(){a.pm.currentFragmentPDT&&a.pm.currentFragmentStart&&(a.pm.data.player_program_time=a.pm.currentFragmentPDT+a.pm.data.player_playhead_time-a.pm.currentFragmentStart)},"n");if(i&&i.player_playhead_time)this.pm.data.player_playhead_time=i.player_playhead_time,r(),this._updateMaxPlayheadPosition();else if(this.pm.getPlayheadTime){var s=this.pm.getPlayheadTime();typeof s<"u"&&(this.pm.data.player_playhead_time=s,r(),this._updateMaxPlayheadPosition())}},"value")}]),t})(),D_=L_,qm=300*1e3,M_=n(function t(e){if(Oe(this,t),!e.disableRebufferTracking){var i,a=n(function(s,o){r(o),i=void 0},"i"),r=n(function(s){if(i){var o=s.viewer_time-i;Ae(e.data,"view_rebuffer_duration",o),i=s.viewer_time,e.data.view_rebuffer_duration>qm&&(e.emit("viewend"),e.send("viewend"),e.mux.log.warn("Ending view after rebuffering for longer than ".concat(qm,"ms, future events will be ignored unless a programchange or videochange occurs.")))}e.data.view_watch_time>=0&&e.data.view_rebuffer_count>0&&(e.data.view_rebuffer_frequency=e.data.view_rebuffer_count/e.data.view_watch_time,e.data.view_rebuffer_percentage=e.data.view_rebuffer_duration/e.data.view_watch_time)},"a");e.on("playbackheartbeat",function(s,o){return r(o)}),e.on("rebufferstart",function(s,o){i||(Ae(e.data,"view_rebuffer_count",1),i=o.viewer_time,e.one("rebufferend",a))}),e.on("viewinit",function(){i=void 0,e.off("rebufferend",a)})}},"r"),x_=M_,O_=(function(){function t(e){var i=this;Oe(this,t),R(this,"_lastCheckedTime",void 0),R(this,"_lastPlayheadTime",void 0),R(this,"_lastPlayheadTimeUpdatedTime",void 0),R(this,"_rebuffering",void 0),R(this,"pm",void 0),this.pm=e,!(e.disableRebufferTracking||e.disablePlayheadRebufferTracking)&&(this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null,e.on("playbackheartbeat",this._checkIfRebuffering.bind(this)),e.on("playbackheartbeatend",this._cleanupRebufferTracker.bind(this)),e.on("seeking",function(){i._cleanupRebufferTracker(null,{viewer_time:ke.now()})}))}return n(t,"r"),ri(t,[{key:"_checkIfRebuffering",value:n(function(e,i){if(this.pm.seekingTracker.isSeeking||this.pm.adTracker.isAdBreak||!this.pm.playbackHeartbeat._playheadShouldBeProgressing){this._cleanupRebufferTracker(e,i);return}if(this._lastCheckedTime===null){this._prepareRebufferTrackerState(i.viewer_time);return}if(this._lastPlayheadTime!==this.pm.data.player_playhead_time){this._cleanupRebufferTracker(e,i,!0);return}var a=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.sustainedRebufferThreshold=="number"&&a>=this.pm.sustainedRebufferThreshold&&(this._rebuffering||(this._rebuffering=!0,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}))),this._lastCheckedTime=i.viewer_time},"value")},{key:"_clearRebufferTrackerState",value:n(function(){this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null},"value")},{key:"_prepareRebufferTrackerState",value:n(function(e){this._lastCheckedTime=e,this._lastPlayheadTime=this.pm.data.player_playhead_time,this._lastPlayheadTimeUpdatedTime=e},"value")},{key:"_cleanupRebufferTracker",value:n(function(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(this._rebuffering)this._rebuffering=!1,this.pm.emit("rebufferend",{viewer_time:i.viewer_time});else{if(this._lastCheckedTime===null)return;var r=this.pm.data.player_playhead_time-this._lastPlayheadTime,s=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.minimumRebufferDuration=="number"&&r>0&&s-r>this.pm.minimumRebufferDuration&&(this._lastCheckedTime=null,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}),this.pm.emit("rebufferend",{viewer_time:this._lastPlayheadTimeUpdatedTime+s-r}))}a?this._prepareRebufferTrackerState(i.viewer_time):this._clearRebufferTrackerState()},"value")}]),t})(),N_=O_,P_=(function(){function t(e){var i=this;Oe(this,t),R(this,"NAVIGATION_START",void 0),R(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){var a=e.data,r=a.view_id;if(!a.view_program_changed){var s=n(function(o,l){var d=l.viewer_time;(o.type==="playing"&&typeof e.data.view_time_to_first_frame>"u"||o.type==="adplaying"&&(typeof e.data.view_time_to_first_frame>"u"||i._inPrerollPosition()))&&i.calculateTimeToFirstFrame(d||ke.now(),r)},"n");e.one("playing",s),e.one("adplaying",s),e.one("viewend",function(){e.off("playing",s),e.off("adplaying",s)})}})}return n(t,"r"),ri(t,[{key:"_inPrerollPosition",value:n(function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3},"value")},{key:"calculateTimeToFirstFrame",value:n(function(e,i){i===this.pm.data.view_id&&(this.pm.watchTimeTracker._updateWatchTime(null,{viewer_time:e}),this.pm.data.view_time_to_first_frame=this.pm.data.view_watch_time,(this.pm.data.player_autoplay_on||this.pm.data.video_is_autoplay)&&this.NAVIGATION_START&&(this.pm.data.view_aggregate_startup_time=this.pm.data.view_start+this.pm.data.view_watch_time-this.NAVIGATION_START))},"value")}]),t})(),$_=P_,U_=n(function t(e){var i=this;Oe(this,t),R(this,"_lastPlayerHeight",void 0),R(this,"_lastPlayerWidth",void 0),R(this,"_lastPlayheadPosition",void 0),R(this,"_lastSourceHeight",void 0),R(this,"_lastSourceWidth",void 0),e.on("viewinit",function(){i._lastPlayheadPosition=-1});var a=["pause","rebufferstart","seeking","error","adbreakstart","hb","renditionchange","orientationchange","viewend"],r=["playing","hb","renditionchange","orientationchange"];a.forEach(function(s){e.on(s,function(){if(i._lastPlayheadPosition>=0&&e.data.player_playhead_time>=0&&i._lastPlayerWidth>=0&&i._lastSourceWidth>0&&i._lastPlayerHeight>=0&&i._lastSourceHeight>0){var o=e.data.player_playhead_time-i._lastPlayheadPosition;if(o<0){i._lastPlayheadPosition=-1;return}var l=Math.min(i._lastPlayerWidth/i._lastSourceWidth,i._lastPlayerHeight/i._lastSourceHeight),d=Math.max(0,l-1),u=Math.max(0,1-l);e.data.view_max_upscale_percentage=Math.max(e.data.view_max_upscale_percentage||0,d),e.data.view_max_downscale_percentage=Math.max(e.data.view_max_downscale_percentage||0,u),Ae(e.data,"view_total_content_playback_time",o),Ae(e.data,"view_total_upscaling",d*o),Ae(e.data,"view_total_downscaling",u*o)}i._lastPlayheadPosition=-1})}),r.forEach(function(s){e.on(s,function(){i._lastPlayheadPosition=e.data.player_playhead_time,i._lastPlayerWidth=e.data.player_width,i._lastPlayerHeight=e.data.player_height,i._lastSourceWidth=e.data.video_source_width,i._lastSourceHeight=e.data.video_source_height})})},"r"),H_=U_,B_=2e3,W_=n(function t(e){var i=this;Oe(this,t),R(this,"isSeeking",void 0),this.isSeeking=!1;var a=-1,r=n(function(){var s=ke.now(),o=(e.data.viewer_time||s)-(a||s);Ae(e.data,"view_seek_duration",o),e.data.view_max_seek_time=Math.max(e.data.view_max_seek_time||0,o),i.isSeeking=!1,a=-1},"a");e.on("seeking",function(s,o){if(Object.assign(e.data,o),i.isSeeking&&o.viewer_time-a<=B_){a=o.viewer_time;return}i.isSeeking&&r(),i.isSeeking=!0,a=o.viewer_time,Ae(e.data,"view_seek_count",1),e.send("seeking")}),e.on("seeked",function(){r()}),e.on("viewend",function(){i.isSeeking&&(r(),e.send("seeked")),i.isSeeking=!1,a=-1})},"r"),F_=W_,Ym=n(function(t,e){t.push(e),t.sort(function(i,a){return i.viewer_time-a.viewer_time})},"Kt$2"),K_=["adbreakstart","adrequest","adresponse","adplay","adplaying","adpause","adended","adbreakend","aderror","adclicked","adskipped"],V_=(function(){function t(e){var i=this;Oe(this,t),R(this,"_adHasPlayed",void 0),R(this,"_adRequests",void 0),R(this,"_adResponses",void 0),R(this,"_currentAdRequestNumber",void 0),R(this,"_currentAdResponseNumber",void 0),R(this,"_prerollPlayTime",void 0),R(this,"_wouldBeNewAdPlay",void 0),R(this,"isAdBreak",void 0),R(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){i.isAdBreak=!1,i._currentAdRequestNumber=0,i._currentAdResponseNumber=0,i._adRequests=[],i._adResponses=[],i._adHasPlayed=!1,i._wouldBeNewAdPlay=!0,i._prerollPlayTime=void 0}),K_.forEach(function(r){return e.on(r,i._updateAdData.bind(i))});var a=n(function(){i.isAdBreak=!1},"i");e.on("adbreakstart",function(){i.isAdBreak=!0}),e.on("play",a),e.on("playing",a),e.on("viewend",a),e.on("adrequest",function(r,s){s=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdRequestNumber++},s),Ym(i._adRequests,s),Ae(e.data,"view_ad_request_count"),i.inPrerollPosition()&&(e.data.view_preroll_requested=!0,i._adHasPlayed||Ae(e.data,"view_preroll_request_count"))}),e.on("adresponse",function(r,s){s=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdResponseNumber++},s),Ym(i._adResponses,s);var o=i.findAdRequest(s.ad_request_id);o&&Ae(e.data,"view_ad_request_time",Math.max(0,s.viewer_time-o.viewer_time))}),e.on("adplay",function(r,s){i._adHasPlayed=!0,i._wouldBeNewAdPlay&&(i._wouldBeNewAdPlay=!1,Ae(e.data,"view_ad_played_count")),i.inPrerollPosition()&&!e.data.view_preroll_played&&(e.data.view_preroll_played=!0,i._adRequests.length>0&&(e.data.view_preroll_request_time=Math.max(0,s.viewer_time-i._adRequests[0].viewer_time)),e.data.view_start&&(e.data.view_startup_preroll_request_time=Math.max(0,s.viewer_time-e.data.view_start)),i._prerollPlayTime=s.viewer_time)}),e.on("adplaying",function(r,s){i.inPrerollPosition()&&typeof e.data.view_preroll_load_time>"u"&&typeof i._prerollPlayTime<"u"&&(e.data.view_preroll_load_time=s.viewer_time-i._prerollPlayTime,e.data.view_startup_preroll_load_time=s.viewer_time-i._prerollPlayTime)}),e.on("adclicked",function(r,s){i._wouldBeNewAdPlay||Ae(e.data,"view_ad_clicked_count")}),e.on("adskipped",function(r,s){i._wouldBeNewAdPlay||Ae(e.data,"view_ad_skipped_count")}),e.on("adended",function(){i._wouldBeNewAdPlay=!0}),e.on("aderror",function(){i._wouldBeNewAdPlay=!0})}return n(t,"r"),ri(t,[{key:"inPrerollPosition",value:n(function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3},"value")},{key:"findAdRequest",value:n(function(e){for(var i=0;i<this._adRequests.length;i++)if(this._adRequests[i].ad_request_id===e)return this._adRequests[i]},"value")},{key:"_updateAdData",value:n(function(e,i){if(this.inPrerollPosition()){if(!this.pm.data.view_preroll_ad_tag_hostname&&i.ad_tag_url){var a=fi(Zn(i.ad_tag_url),2),r=a[0],s=a[1];this.pm.data.view_preroll_ad_tag_domain=s,this.pm.data.view_preroll_ad_tag_hostname=r}if(!this.pm.data.view_preroll_ad_asset_hostname&&i.ad_asset_url){var o=fi(Zn(i.ad_asset_url),2),l=o[0],d=o[1];this.pm.data.view_preroll_ad_asset_domain=d,this.pm.data.view_preroll_ad_asset_hostname=l}}this.pm.data.ad_asset_url=i?.ad_asset_url,this.pm.data.ad_tag_url=i?.ad_tag_url,this.pm.data.ad_creative_id=i?.ad_creative_id,this.pm.data.ad_id=i?.ad_id,this.pm.data.ad_universal_id=i?.ad_universal_id},"value")}]),t})(),q_=V_,Gm=st(Lt()),Y_=n(function t(e){Oe(this,t);var i,a,r=n(function(){e.disableRebufferTracking||(Ae(e.data,"view_waiting_rebuffer_count",1),i=ke.now(),a=Gm.default.setInterval(function(){if(i){var u=ke.now();Ae(e.data,"view_waiting_rebuffer_duration",u-i),i=u}},250))},"a"),s=n(function(){e.disableRebufferTracking||i&&(Ae(e.data,"view_waiting_rebuffer_duration",ke.now()-i),i=!1,Gm.default.clearInterval(a))},"n"),o=!1,l=n(function(){o=!0},"s"),d=n(function(){o=!1,s()},"u");e.on("waiting",function(){o&&r()}),e.on("playing",function(){s(),l()}),e.on("pause",d),e.on("seeking",d)},"r"),G_=Y_,Q_=n(function t(e){var i=this;Oe(this,t),R(this,"lastWallClockTime",void 0);var a=n(function(){i.lastWallClockTime=ke.now(),e.on("before*",r)},"i"),r=n(function(s){var o=ke.now(),l=i.lastWallClockTime;i.lastWallClockTime=o,o-l>3e4&&(e.emit("devicesleep",{viewer_time:l}),Object.assign(e.data,{viewer_time:l}),e.send("devicesleep"),e.emit("devicewake",{viewer_time:o}),Object.assign(e.data,{viewer_time:o}),e.send("devicewake"))},"a");e.one("playbackheartbeat",a),e.on("playbackheartbeatend",function(){e.off("before*",r),e.one("playbackheartbeat",a)})},"r"),Z_=Q_,bd=st(Lt()),Bv=(function(t){return t()})(function(){var t=n(function(){for(var i=0,a={};i<arguments.length;i++){var r=arguments[i];for(var s in r)a[s]=r[s]}return a},"r");function e(i){function a(r,s,o){var l;if(typeof document<"u"){if(arguments.length>1){if(o=t({path:"/"},a.defaults,o),typeof o.expires=="number"){var d=new Date;d.setMilliseconds(d.getMilliseconds()+o.expires*864e5),o.expires=d}try{l=JSON.stringify(s),/^[\{\[]/.test(l)&&(s=l)}catch{}return i.write?s=i.write(s,r):s=encodeURIComponent(String(s)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),r=r.replace(/[\(\)]/g,escape),document.cookie=[r,"=",s,o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("")}r||(l={});for(var u=document.cookie?document.cookie.split("; "):[],p=/(%[0-9A-Z]{2})+/g,v=0;v<u.length;v++){var m=u[v].split("="),h=m.slice(1).join("=");h.charAt(0)==='"'&&(h=h.slice(1,-1));try{var f=m[0].replace(p,decodeURIComponent);if(h=i.read?i.read(h,f):i(h,f)||h.replace(p,decodeURIComponent),this.json)try{h=JSON.parse(h)}catch{}if(r===f){l=h;break}r||(l[f]=h)}catch{}}return l}}return n(a,"i"),a.set=a,a.get=function(r){return a.call(a,r)},a.getJSON=function(){return a.apply({json:!0},[].slice.call(arguments))},a.defaults={},a.remove=function(r,s){a(r,"",t(s,{expires:-1}))},a.withConverter=e,a}return n(e,"e"),e(function(){})}),Wv="muxData",j_=n(function(t){return Object.entries(t).map(function(e){var i=fi(e,2),a=i[0],r=i[1];return"".concat(a,"=").concat(r)}).join("&")},"Sa"),z_=n(function(t){return t.split("&").reduce(function(e,i){var a=fi(i.split("="),2),r=a[0],s=a[1],o=+s,l=s&&o==s?o:s;return e[r]=l,e},{})},"Ra$1"),Fv=n(function(){var t;try{t=z_(Bv.get(Wv)||"")}catch{t={}}return t},"er"),Kv=n(function(t){try{Bv.set(Wv,j_(t),{expires:365})}catch{}},"tr"),X_=n(function(){var t=Fv();return t.mux_viewer_id=t.mux_viewer_id||Qn(),t.msn=t.msn||Math.random(),Kv(t),{mux_viewer_id:t.mux_viewer_id,mux_sample_number:t.msn}},"rr$1"),J_=n(function(){var t=Fv(),e=ke.now();return t.session_start&&(t.sst=t.session_start,delete t.session_start),t.session_id&&(t.sid=t.session_id,delete t.session_id),t.session_expires&&(t.sex=t.session_expires,delete t.session_expires),(!t.sex||t.sex<e)&&(t.sid=Qn(),t.sst=e),t.sex=e+1500*1e3,Kv(t),{session_id:t.sid,session_start:t.sst,session_expires:t.sex}},"ar");function eg(t,e){var i=e.beaconCollectionDomain,a=e.beaconDomain;if(i)return"https://"+i;t=t||"inferred";var r=a||"litix.io";return t.match(/^[a-z0-9]+$/)?"https://"+t+"."+r:"https://img.litix.io/a.gif"}n(eg,"Ke$1");var tg=st(Lt()),Vv=n(function(){var t;switch(qv()){case"cellular":t="cellular";break;case"ethernet":t="wired";break;case"wifi":t="wifi";break;case void 0:break;default:t="other"}return t},"nr$1"),qv=n(function(){var t=tg.default.navigator,e=t&&(t.connection||t.mozConnection||t.webkitConnection);return e&&e.type},"or$1");Vv.getConnectionFromAPI=qv;var ig=Vv,ag={a:"env",b:"beacon",c:"custom",d:"ad",e:"event",f:"experiment",i:"internal",m:"mux",n:"response",p:"player",q:"request",r:"retry",s:"session",t:"timestamp",u:"viewer",v:"video",w:"page",x:"view",y:"sub"},rg=Yv(ag),ng={ad:"ad",af:"affiliate",ag:"aggregate",ap:"api",al:"application",ao:"audio",ar:"architecture",as:"asset",au:"autoplay",av:"average",bi:"bitrate",bn:"brand",br:"break",bw:"browser",by:"bytes",bz:"business",ca:"cached",cb:"cancel",cc:"codec",cd:"code",cg:"category",ch:"changed",ci:"client",ck:"clicked",cl:"canceled",cn:"config",co:"count",ce:"counter",cp:"complete",cq:"creator",cr:"creative",cs:"captions",ct:"content",cu:"current",cx:"connection",cz:"context",dg:"downscaling",dm:"domain",dn:"cdn",do:"downscale",dr:"drm",dp:"dropped",du:"duration",dv:"device",dy:"dynamic",eb:"enabled",ec:"encoding",ed:"edge",en:"end",eg:"engine",em:"embed",er:"error",ep:"experiments",es:"errorcode",et:"errortext",ee:"event",ev:"events",ex:"expires",ez:"exception",fa:"failed",fi:"first",fm:"family",ft:"format",fp:"fps",fq:"frequency",fr:"frame",fs:"fullscreen",ha:"has",hb:"holdback",he:"headers",ho:"host",hn:"hostname",ht:"height",id:"id",ii:"init",in:"instance",ip:"ip",is:"is",ke:"key",la:"language",lb:"labeled",le:"level",li:"live",ld:"loaded",lo:"load",ls:"lists",lt:"latency",ma:"max",md:"media",me:"message",mf:"manifest",mi:"mime",ml:"midroll",mm:"min",mn:"manufacturer",mo:"model",mx:"mux",ne:"newest",nm:"name",no:"number",on:"on",or:"origin",os:"os",pa:"paused",pb:"playback",pd:"producer",pe:"percentage",pf:"played",pg:"program",ph:"playhead",pi:"plugin",pl:"preroll",pn:"playing",po:"poster",pp:"pip",pr:"preload",ps:"position",pt:"part",py:"property",px:"pop",pz:"plan",ra:"rate",rd:"requested",re:"rebuffer",rf:"rendition",rg:"range",rm:"remote",ro:"ratio",rp:"response",rq:"request",rs:"requests",sa:"sample",sd:"skipped",se:"session",sh:"shift",sk:"seek",sm:"stream",so:"source",sq:"sequence",sr:"series",ss:"status",st:"start",su:"startup",sv:"server",sw:"software",sy:"severity",ta:"tag",tc:"tech",te:"text",tg:"target",th:"throughput",ti:"time",tl:"total",to:"to",tt:"title",ty:"type",ug:"upscaling",un:"universal",up:"upscale",ur:"url",us:"user",va:"variant",vd:"viewed",vi:"video",ve:"version",vw:"view",vr:"viewer",wd:"width",wa:"watch",wt:"waiting"},Qm=Yv(ng);function Yv(t){var e={};for(var i in t)t.hasOwnProperty(i)&&(e[t[i]]=i);return e}n(Yv,"dr");function Bd(t){var e={},i={};return Object.keys(t).forEach(function(a){var r=!1;if(t.hasOwnProperty(a)&&t[a]!==void 0){var s=a.split("_"),o=s[0],l=rg[o];l||(re.info("Data key word `"+s[0]+"` not expected in "+a),l=o+"_"),s.splice(1).forEach(function(d){d==="url"&&(r=!0),Qm[d]?l+=Qm[d]:Number.isInteger(Number(d))?l+=d:(re.info("Data key word `"+d+"` not expected in "+a),l+="_"+d+"_")}),r?i[l]=t[a]:e[l]=t[a]}}),Object.assign(e,i)}n(Bd,"ve$2");var sa=st(Lt()),sg=st(Nv()),og={maxBeaconSize:300,maxQueueLength:3600,baseTimeBetweenBeacons:1e4,maxPayloadKBSize:500},lg=56*1024,dg=["hb","requestcompleted","requestfailed","requestcanceled"],ug="https://img.litix.io",bi=n(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this._beaconUrl=t||ug,this._eventQueue=[],this._postInFlight=!1,this._resendAfterPost=!1,this._failureCount=0,this._sendTimeout=!1,this._options=Object.assign({},og,e)},"$$1");bi.prototype.queueEvent=function(t,e){var i=Object.assign({},e);return this._eventQueue.length<=this._options.maxQueueLength||t==="eventrateexceeded"?(this._eventQueue.push(i),this._sendTimeout||this._startBeaconSending(),this._eventQueue.length<=this._options.maxQueueLength):!1};bi.prototype.flushEvents=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;if(t&&this._eventQueue.length===1){this._eventQueue.pop();return}this._eventQueue.length&&this._sendBeaconQueue(),this._startBeaconSending()};bi.prototype.destroy=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;this.destroyed=!0,t?this._clearBeaconQueue():this.flushEvents(),sa.default.clearTimeout(this._sendTimeout)};bi.prototype._clearBeaconQueue=function(){var t=this._eventQueue.length>this._options.maxBeaconSize?this._eventQueue.length-this._options.maxBeaconSize:0,e=this._eventQueue.slice(t);t>0&&Object.assign(e[e.length-1],Bd({mux_view_message:"event queue truncated"}));var i=this._createPayload(e);Gv(this._beaconUrl,i,!0,function(){})};bi.prototype._sendBeaconQueue=function(){var t=this;if(this._postInFlight){this._resendAfterPost=!0;return}var e=this._eventQueue.slice(0,this._options.maxBeaconSize);this._eventQueue=this._eventQueue.slice(this._options.maxBeaconSize),this._postInFlight=!0;var i=this._createPayload(e),a=ke.now();Gv(this._beaconUrl,i,!1,function(r,s){s?(t._eventQueue=e.concat(t._eventQueue),t._failureCount+=1,re.info("Error sending beacon: "+s)):t._failureCount=0,t._roundTripTime=ke.now()-a,t._postInFlight=!1,t._resendAfterPost&&(t._resendAfterPost=!1,t._eventQueue.length>0&&t._sendBeaconQueue())})};bi.prototype._getNextBeaconTime=function(){if(!this._failureCount)return this._options.baseTimeBetweenBeacons;var t=Math.pow(2,this._failureCount-1);return t=t*Math.random(),(1+t)*this._options.baseTimeBetweenBeacons};bi.prototype._startBeaconSending=function(){var t=this;sa.default.clearTimeout(this._sendTimeout),!this.destroyed&&(this._sendTimeout=sa.default.setTimeout(function(){t._eventQueue.length&&t._sendBeaconQueue(),t._startBeaconSending()},this._getNextBeaconTime()))};bi.prototype._createPayload=function(t){var e=this,i={transmission_timestamp:Math.round(ke.now())};this._roundTripTime&&(i.rtt_ms=Math.round(this._roundTripTime));var a,r,s,o=n(function(){a=JSON.stringify({metadata:i,events:r||t}),s=a.length/1024},"o"),l=n(function(){return s<=e._options.maxPayloadKBSize},"s");return o(),l()||(re.info("Payload size is too big ("+s+" kb). Removing unnecessary events."),r=t.filter(function(d){return dg.indexOf(d.e)===-1}),o()),l()||(re.info("Payload size still too big ("+s+" kb). Cropping fields.."),r.forEach(function(d){for(var u in d){var p=d[u],v=50*1024;typeof p=="string"&&p.length>v&&(d[u]=p.substring(0,v))}}),o()),a};var cg=typeof sg.default.exitPictureInPicture=="function"?function(t){return t.length<=lg}:function(t){return!1},Gv=n(function(t,e,i,a){if(i&&navigator&&navigator.sendBeacon&&navigator.sendBeacon(t,e)){a();return}if(sa.default.fetch){sa.default.fetch(t,{method:"POST",body:e,headers:{"Content-Type":"text/plain"},keepalive:cg(e)}).then(function(s){return a(null,s.ok?null:"Error")}).catch(function(s){return a(null,s)});return}if(sa.default.XMLHttpRequest){var r=new sa.default.XMLHttpRequest;r.onreadystatechange=function(){if(r.readyState===4)return a(null,r.status!==200?"error":void 0)},r.open("POST",t),r.setRequestHeader("Content-Type","text/plain"),r.send(e);return}a()},"Cr"),hg=bi,mg=["env_key","view_id","view_sequence_number","player_sequence_number","beacon_domain","player_playhead_time","viewer_time","mux_api_version","event","video_id","player_instance_id","player_error_code","player_error_message","player_error_context","player_error_severity","player_error_business_exception"],pg=["adplay","adplaying","adpause","adfirstquartile","admidpoint","adthirdquartile","adended","adresponse","adrequest"],vg=["ad_id","ad_creative_id","ad_universal_id"],fg=["viewstart","error","ended","viewend"],Eg=600*1e3,bg=(function(){function t(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};Oe(this,t);var r,s,o,l,d,u,p,v,m,h,f,_;R(this,"mux",void 0),R(this,"envKey",void 0),R(this,"options",void 0),R(this,"eventQueue",void 0),R(this,"sampleRate",void 0),R(this,"disableCookies",void 0),R(this,"respectDoNotTrack",void 0),R(this,"previousBeaconData",void 0),R(this,"lastEventTime",void 0),R(this,"rateLimited",void 0),R(this,"pageLevelData",void 0),R(this,"viewerData",void 0),this.mux=e,this.envKey=i,this.options=a,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.eventQueue=new hg(eg(this.envKey,this.options));var b;this.sampleRate=(b=this.options.sampleRate)!==null&&b!==void 0?b:1;var y;this.disableCookies=(y=this.options.disableCookies)!==null&&y!==void 0?y:!1;var A;this.respectDoNotTrack=(A=this.options.respectDoNotTrack)!==null&&A!==void 0?A:!1,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.pageLevelData={mux_api_version:this.mux.API_VERSION,mux_embed:this.mux.NAME,mux_embed_version:this.mux.VERSION,viewer_application_name:(r=this.options.platform)===null||r===void 0?void 0:r.name,viewer_application_version:(s=this.options.platform)===null||s===void 0?void 0:s.version,viewer_application_engine:(o=this.options.platform)===null||o===void 0?void 0:o.layout,viewer_device_name:(l=this.options.platform)===null||l===void 0?void 0:l.product,viewer_device_category:"",viewer_device_manufacturer:(d=this.options.platform)===null||d===void 0?void 0:d.manufacturer,viewer_os_family:(p=this.options.platform)===null||p===void 0||(u=p.os)===null||u===void 0?void 0:u.family,viewer_os_architecture:(m=this.options.platform)===null||m===void 0||(v=m.os)===null||v===void 0?void 0:v.architecture,viewer_os_version:(f=this.options.platform)===null||f===void 0||(h=f.os)===null||h===void 0?void 0:h.version,viewer_connection_type:ig(),page_url:bd.default===null||bd.default===void 0||(_=bd.default.location)===null||_===void 0?void 0:_.href},this.viewerData=this.disableCookies?{}:X_()}return n(t,"r"),ri(t,[{key:"send",value:n(function(e,i){if(!(!e||!(i!=null&&i.view_id))){if(this.respectDoNotTrack&&Ud())return re.info("Not sending `"+e+"` because Do Not Track is enabled");if(!i||typeof i!="object")return re.error("A data object was expected in send() but was not provided");var a=this.disableCookies?{}:J_(),r=vc(vl({},this.pageLevelData,i,a,this.viewerData),{event:e,env_key:this.envKey});r.user_id&&(r.viewer_user_id=r.user_id,delete r.user_id);var s,o=((s=r.mux_sample_number)!==null&&s!==void 0?s:0)>=this.sampleRate,l=this._deduplicateBeaconData(e,r),d=Bd(l);if(this.lastEventTime=this.mux.utils.now(),o)return re.info("Not sending event due to sample rate restriction",e,r,d);if(this.envKey||re.info("Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL",e,r,d),!this.rateLimited){if(re.info("Sending event",e,r,d),this.rateLimited=!this.eventQueue.queueEvent(e,d),this.mux.WINDOW_UNLOADING&&e==="viewend")this.eventQueue.destroy(!0);else if(this.mux.WINDOW_HIDDEN&&e==="hb"?this.eventQueue.flushEvents(!0):fg.indexOf(e)>=0&&this.eventQueue.flushEvents(),this.rateLimited)return r.event="eventrateexceeded",d=Bd(r),this.eventQueue.queueEvent(r.event,d),re.error("Beaconing disabled due to rate limit.")}}},"value")},{key:"destroy",value:n(function(){this.eventQueue.destroy(!1)},"value")},{key:"_deduplicateBeaconData",value:n(function(e,i){var a=this,r={},s=i.view_id;if(s==="-1"||e==="viewstart"||e==="viewend"||!this.previousBeaconData||this.mux.utils.now()-this.lastEventTime>=Eg)r=vl({},i),s&&(this.previousBeaconData=r),s&&e==="viewend"&&(this.previousBeaconData=null);else{var o=e.indexOf("request")===0;Object.entries(i).forEach(function(l){var d=fi(l,2),u=d[0],p=d[1];a.previousBeaconData&&(p!==a.previousBeaconData[u]||mg.indexOf(u)>-1||a.objectHasChanged(o,u,p,a.previousBeaconData[u])||a.eventRequiresKey(e,u))&&(r[u]=p,a.previousBeaconData[u]=p)})}return r},"value")},{key:"objectHasChanged",value:n(function(e,i,a,r){return!e||i.indexOf("request_")!==0?!1:i==="request_response_headers"||typeof a!="object"||typeof r!="object"?!0:Object.keys(a||{}).length!==Object.keys(r||{}).length},"value")},{key:"eventRequiresKey",value:n(function(e,i){return!!(e==="renditionchange"&&i.indexOf("video_source_")===0||vg.includes(i)&&pg.includes(e))},"value")}]),t})(),_g=n(function t(e){Oe(this,t);var i=0,a=0,r=0,s=0,o=0,l=0,d=0,u=n(function(m,h){var f=h.request_start,_=h.request_response_start,b=h.request_response_end,y=h.request_bytes_loaded;s++;var A,g;if(_?(A=_-(f??0),g=(b??0)-_):g=(b??0)-(f??0),g>0&&y&&y>0){var w=y/g*8e3;o++,a+=y,r+=g,e.data.view_min_request_throughput=Math.min(e.data.view_min_request_throughput||1/0,w),e.data.view_average_request_throughput=a/r*8e3,e.data.view_request_count=s,A>0&&(i+=A,e.data.view_max_request_latency=Math.max(e.data.view_max_request_latency||0,A),e.data.view_average_request_latency=i/o)}},"p"),p=n(function(m,h){s++,l++,e.data.view_request_count=s,e.data.view_request_failed_count=l},"b"),v=n(function(m,h){s++,d++,e.data.view_request_count=s,e.data.view_request_canceled_count=d},"k");e.on("requestcompleted",u),e.on("requestfailed",p),e.on("requestcanceled",v)},"r"),gg=_g,yg=3600*1e3,Tg=n(function t(e){var i=this;Oe(this,t),R(this,"_lastEventTime",void 0),e.on("before*",function(a,r){var s=r.viewer_time,o=ke.now(),l=i._lastEventTime;if(i._lastEventTime=o,l&&o-l>yg){var d=Object.keys(e.data).reduce(function(p,v){return v.indexOf("video_")===0?Object.assign(p,R({},v,e.data[v])):p},{});e.mux.log.info("Received event after at least an hour inactivity, creating a new view");var u=e.playbackHeartbeat._playheadShouldBeProgressing;e._resetView(Object.assign({viewer_time:s},d)),e.playbackHeartbeat._playheadShouldBeProgressing=u,e.playbackHeartbeat._playheadShouldBeProgressing&&a.type!=="play"&&a.type!=="adbreakstart"&&(e.emit("play",{viewer_time:s}),a.type!=="playing"&&e.emit("playing",{viewer_time:s}))}})},"r"),Ag=Tg,kg=["viewstart","ended","loadstart","pause","play","playing","ratechange","waiting","adplay","adpause","adended","aderror","adplaying","adrequest","adresponse","adbreakstart","adbreakend","adfirstquartile","admidpoint","adthirdquartile","rebufferstart","rebufferend","seeked","error","hb","requestcompleted","requestfailed","requestcanceled","renditionchange"],Sg=new Set(["requestcompleted","requestfailed","requestcanceled"]),wg=(function(t){r_(i,t);var e=o_(i);function i(a,r,s){Oe(this,i);var o;o=e.call(this),R($(o),"DOM_CONTENT_LOADED_EVENT_END",void 0),R($(o),"NAVIGATION_START",void 0),R($(o),"_destroyed",void 0),R($(o),"_heartBeatTimeout",void 0),R($(o),"adTracker",void 0),R($(o),"dashjs",void 0),R($(o),"data",void 0),R($(o),"disablePlayheadRebufferTracking",void 0),R($(o),"disableRebufferTracking",void 0),R($(o),"errorTracker",void 0),R($(o),"errorTranslator",void 0),R($(o),"emitTranslator",void 0),R($(o),"getAdData",void 0),R($(o),"getPlayheadTime",void 0),R($(o),"getStateData",void 0),R($(o),"stateDataTranslator",void 0),R($(o),"hlsjs",void 0),R($(o),"id",void 0),R($(o),"longResumeTracker",void 0),R($(o),"minimumRebufferDuration",void 0),R($(o),"mux",void 0),R($(o),"playbackEventDispatcher",void 0),R($(o),"playbackHeartbeat",void 0),R($(o),"playbackHeartbeatTime",void 0),R($(o),"playheadTime",void 0),R($(o),"seekingTracker",void 0),R($(o),"sustainedRebufferThreshold",void 0),R($(o),"watchTimeTracker",void 0),R($(o),"currentFragmentPDT",void 0),R($(o),"currentFragmentStart",void 0),o.DOM_CONTENT_LOADED_EVENT_END=pl.domContentLoadedEventEnd(),o.NAVIGATION_START=pl.navigationStart();var l={debug:!1,minimumRebufferDuration:250,sustainedRebufferThreshold:1e3,playbackHeartbeatTime:25,beaconDomain:"litix.io",sampleRate:1,disableCookies:!1,respectDoNotTrack:!1,disableRebufferTracking:!1,disablePlayheadRebufferTracking:!1,errorTranslator:n(function(m){return m},"errorTranslator"),emitTranslator:n(function(){for(var m=arguments.length,h=new Array(m),f=0;f<m;f++)h[f]=arguments[f];return h},"emitTranslator"),stateDataTranslator:n(function(m){return m},"stateDataTranslator")};o.mux=a,o.id=r,s!=null&&s.beaconDomain&&o.mux.log.warn("The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`."),s=Object.assign(l,s),s.data=s.data||{},s.data.property_key&&(s.data.env_key=s.data.property_key,delete s.data.property_key),re.level=s.debug?ra.DEBUG:ra.WARN,o.getPlayheadTime=s.getPlayheadTime,o.getStateData=s.getStateData||function(){return{}},o.getAdData=s.getAdData||function(){},o.minimumRebufferDuration=s.minimumRebufferDuration,o.sustainedRebufferThreshold=s.sustainedRebufferThreshold,o.playbackHeartbeatTime=s.playbackHeartbeatTime,o.disableRebufferTracking=s.disableRebufferTracking,o.disableRebufferTracking&&o.mux.log.warn("Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering."),o.disablePlayheadRebufferTracking=s.disablePlayheadRebufferTracking,o.errorTranslator=s.errorTranslator,o.emitTranslator=s.emitTranslator,o.stateDataTranslator=s.stateDataTranslator,o.playbackEventDispatcher=new bg(a,s.data.env_key,s),o.data={player_instance_id:Qn(),mux_sample_rate:s.sampleRate,beacon_domain:s.beaconCollectionDomain||s.beaconDomain},o.data.view_sequence_number=1,o.data.player_sequence_number=1;var d=function(){typeof this.data.view_start>"u"&&(this.data.view_start=this.mux.utils.now(),this.emit("viewstart"))}.bind($(o));if(o.on("viewinit",function(m,h){this._resetVideoData(),this._resetViewData(),this._resetErrorData(),this._updateStateData(),Object.assign(this.data,h),this._initializeViewData(),this.one("play",d),this.one("adbreakstart",d)}),o.on("videochange",function(m,h){this._resetView(h)}),o.on("programchange",function(m,h){this.data.player_is_paused&&this.mux.log.warn("The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information."),this._resetView(Object.assign(h,{view_program_changed:!0})),d(),this.emit("play"),this.emit("playing")}),o.on("fragmentchange",function(m,h){this.currentFragmentPDT=h.currentFragmentPDT,this.currentFragmentStart=h.currentFragmentStart}),o.on("destroy",o.destroy),typeof window<"u"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"){var u=n(function(){var m=typeof o.data.view_start<"u";o.mux.WINDOW_HIDDEN=document.visibilityState==="hidden",m&&o.mux.WINDOW_HIDDEN&&(o.data.player_is_paused||o.emit("hb"))},"p");window.addEventListener("visibilitychange",u,!1);var p=n(function(m){m.persisted||o.destroy()},"b");window.addEventListener("pagehide",p,!1),o.on("destroy",function(){window.removeEventListener("visibilitychange",u),window.removeEventListener("pagehide",p)})}o.on("playerready",function(m,h){Object.assign(this.data,h)}),kg.forEach(function(m){o.on(m,function(h,f){m.indexOf("ad")!==0&&this._updateStateData(),Object.assign(this.data,f),this._sanitizeData()}),o.on("after"+m,function(){(m!=="error"||this.errorTracker.viewErrored)&&this.send(m)})}),o.on("viewend",function(m,h){Object.assign(o.data,h)});var v=n(function(m){var h=this.mux.utils.now();this.data.player_init_time&&(this.data.player_startup_time=h-this.data.player_init_time),!this.mux.PLAYER_TRACKED&&this.NAVIGATION_START&&(this.mux.PLAYER_TRACKED=!0,(this.data.player_init_time||this.DOM_CONTENT_LOADED_EVENT_END)&&(this.data.page_load_time=Math.min(this.data.player_init_time||1/0,this.DOM_CONTENT_LOADED_EVENT_END||1/0)-this.NAVIGATION_START)),this.send("playerready"),delete this.data.player_startup_time,delete this.data.page_load_time},"k");return o.one("playerready",v),o.longResumeTracker=new Ag($(o)),o.errorTracker=new S_($(o)),new Z_($(o)),o.seekingTracker=new F_($(o)),o.playheadTime=new D_($(o)),o.playbackHeartbeat=new A_($(o)),new H_($(o)),o.watchTimeTracker=new I_($(o)),new C_($(o)),o.adTracker=new q_($(o)),new N_($(o)),new x_($(o)),new $_($(o)),new G_($(o)),new gg($(o)),s.hlsjs&&o.addHLSJS(s),s.dashjs&&o.addDashJS(s),o.emit("viewinit",s.data),o}return n(i,"t"),ri(i,[{key:"emit",value:n(function(a,r){var s,o=Object.assign({viewer_time:this.mux.utils.now()},r),l=[a,o];if(this.emitTranslator)try{l=this.emitTranslator(a,o)}catch(d){this.mux.log.warn("Exception in emit translator callback.",d)}l!=null&&l.length&&(s=ro(Hr(i.prototype),"emit",this)).call.apply(s,[this].concat(At(l)))},"value")},{key:"destroy",value:n(function(){this._destroyed||(this._destroyed=!0,typeof this.data.view_start<"u"&&(this.emit("viewend"),this.send("viewend")),this.playbackEventDispatcher.destroy(),this.removeHLSJS(),this.removeDashJS(),window.clearTimeout(this._heartBeatTimeout))},"value")},{key:"send",value:n(function(a){if(this.data.view_id){var r=Object.assign({},this.data),s=["player_program_time","player_manifest_newest_program_time","player_live_edge_program_time","player_program_time","video_holdback","video_part_holdback","video_target_duration","video_part_target_duration"];if(r.video_source_is_live===void 0&&(r.player_source_duration===1/0||r.video_source_duration===1/0?r.video_source_is_live=!0:(r.player_source_duration>0||r.video_source_duration>0)&&(r.video_source_is_live=!1)),r.video_source_is_live||s.forEach(function(u){r[u]=void 0}),r.video_source_url=r.video_source_url||r.player_source_url,r.video_source_url){var o=fi(Zn(r.video_source_url),2),l=o[0],d=o[1];r.video_source_domain=d,r.video_source_hostname=l}delete r.ad_request_id,this.playbackEventDispatcher.send(a,r),this.data.view_sequence_number++,this.data.player_sequence_number++,Sg.has(a)||this._restartHeartBeat(),a==="viewend"&&delete this.data.view_id}},"value")},{key:"_resetView",value:n(function(a){this.emit("viewend"),this.send("viewend"),this.emit("viewinit",a)},"value")},{key:"_updateStateData",value:n(function(){var a=this.getStateData();if(typeof this.stateDataTranslator=="function")try{a=this.stateDataTranslator(a)}catch(r){this.mux.log.warn("Exception in stateDataTranslator translator callback.",r)}Object.assign(this.data,a),this.playheadTime._updatePlayheadTime(),this._sanitizeData()},"value")},{key:"_sanitizeData",value:n(function(){var a=this,r=["player_width","player_height","video_source_width","video_source_height","player_playhead_time","video_source_bitrate"];r.forEach(function(o){var l=parseInt(a.data[o],10);a.data[o]=isNaN(l)?void 0:l});var s=["player_source_url","video_source_url"];s.forEach(function(o){if(a.data[o]){var l=a.data[o].toLowerCase();(l.indexOf("data:")===0||l.indexOf("blob:")===0)&&(a.data[o]="MSE style URL")}})},"value")},{key:"_resetVideoData",value:n(function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("video_")===0&&delete a.data[r]})},"value")},{key:"_resetViewData",value:n(function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("view_")===0&&delete a.data[r]}),this.data.view_sequence_number=1},"value")},{key:"_resetErrorData",value:n(function(){delete this.data.player_error_code,delete this.data.player_error_message,delete this.data.player_error_context,delete this.data.player_error_severity,delete this.data.player_error_business_exception},"value")},{key:"_initializeViewData",value:n(function(){var a=this,r=this.data.view_id=Qn(),s=n(function(){r===a.data.view_id&&Ae(a.data,"player_view_count",1)},"o");this.data.player_is_paused?this.one("play",s):s()},"value")},{key:"_restartHeartBeat",value:n(function(){var a=this;window.clearTimeout(this._heartBeatTimeout),this._heartBeatTimeout=window.setTimeout(function(){a.data.player_is_paused||a.emit("hb")},1e4)},"value")},{key:"addHLSJS",value:n(function(a){if(!a.hlsjs){this.mux.log.warn("You must pass a valid hlsjs instance in order to track it.");return}if(this.hlsjs){this.mux.log.warn("An instance of HLS.js is already being monitored for this player.");return}this.hlsjs=a.hlsjs,m_(this.mux,this.id,a.hlsjs,{},a.Hls||window.Hls)},"value")},{key:"removeHLSJS",value:n(function(){this.hlsjs&&(p_(this.hlsjs),this.hlsjs=void 0)},"value")},{key:"addDashJS",value:n(function(a){if(!a.dashjs){this.mux.log.warn("You must pass a valid dashjs instance in order to track it.");return}if(this.dashjs){this.mux.log.warn("An instance of Dash.js is already being monitored for this player.");return}this.dashjs=a.dashjs,b_(this.mux,this.id,a.dashjs)},"value")},{key:"removeDashJS",value:n(function(){this.dashjs&&(__(this.dashjs),this.dashjs=void 0)},"value")}]),i})(y_),Ig=wg,rn=st(Nv());function Rg(){return rn.default&&!!(rn.default.fullscreenElement||rn.default.webkitFullscreenElement||rn.default.mozFullScreenElement||rn.default.msFullscreenElement)}n(Rg,"ot$1");var Cg=["loadstart","pause","play","playing","seeking","seeked","timeupdate","ratechange","stalled","waiting","error","ended"],Lg={1:"MEDIA_ERR_ABORTED",2:"MEDIA_ERR_NETWORK",3:"MEDIA_ERR_DECODE",4:"MEDIA_ERR_SRC_NOT_SUPPORTED"};function Dg(t,e,i){var a=fi(ml(e),3),r=a[0],s=a[1],o=a[2],l=t.log,d=t.utils.getComputedStyle,u=t.utils.secondsToMs,p={automaticErrorTracking:!0};if(r){if(o!=="video"&&o!=="audio")return l.error("The element of `"+s+"` was not a media element.")}else return l.error("No element was found with the `"+s+"` query selector.");r.mux&&(r.mux.destroy(),delete r.mux,l.warn("Already monitoring this video element, replacing existing event listeners"));var v={getPlayheadTime:n(function(){return u(r.currentTime)},"getPlayheadTime"),getStateData:n(function(){var h,f,_,b=((h=(f=this).getPlayheadTime)===null||h===void 0?void 0:h.call(f))||u(r.currentTime),y=this.hlsjs&&this.hlsjs.url,A=this.dashjs&&typeof this.dashjs.getSource=="function"&&this.dashjs.getSource(),g={player_is_paused:r.paused,player_width:parseInt(d(r,"width")),player_height:parseInt(d(r,"height")),player_autoplay_on:r.autoplay,player_preload_on:r.preload,player_language_code:r.lang,player_is_fullscreen:Rg(),video_poster_url:r.poster,video_source_url:y||A||r.currentSrc,video_source_duration:u(r.duration),video_source_height:r.videoHeight,video_source_width:r.videoWidth,view_dropped_frame_count:r==null||(_=r.getVideoPlaybackQuality)===null||_===void 0?void 0:_.call(r).droppedVideoFrames};if(r.getStartDate&&b>0){var w=r.getStartDate();if(w&&typeof w.getTime=="function"&&w.getTime()){var M=w.getTime();if(g.player_program_time=M+b,r.seekable.length>0){var P=M+r.seekable.end(r.seekable.length-1);g.player_live_edge_program_time=P}}}return g},"getStateData")};i=Object.assign(p,i,v),i.data=Object.assign({player_software:"HTML5 Video Element",player_mux_plugin_name:"VideoElementMonitor",player_mux_plugin_version:t.VERSION},i.data),r.mux=r.mux||{},r.mux.deleted=!1,r.mux.emit=function(h,f){t.emit(s,h,f)},r.mux.updateData=function(h){r.mux.emit("hb",h)};var m=n(function(){l.error("The monitor for this video element has already been destroyed.")},"y");r.mux.destroy=function(){Object.keys(r.mux.listeners).forEach(function(h){r.removeEventListener(h,r.mux.listeners[h],!1)}),delete r.mux.listeners,r.mux.destroy=m,r.mux.swapElement=m,r.mux.emit=m,r.mux.addHLSJS=m,r.mux.addDashJS=m,r.mux.removeHLSJS=m,r.mux.removeDashJS=m,r.mux.updateData=m,r.mux.setEmitTranslator=m,r.mux.setStateDataTranslator=m,r.mux.setGetPlayheadTime=m,r.mux.deleted=!0,t.emit(s,"destroy")},r.mux.swapElement=function(h){var f=fi(ml(h),3),_=f[0],b=f[1],y=f[2];if(_){if(y!=="video"&&y!=="audio")return t.log.error("The element of `"+b+"` was not a media element.")}else return t.log.error("No element was found with the `"+b+"` query selector.");_.muxId=r.muxId,delete r.muxId,_.mux=_.mux||{},_.mux.listeners=Object.assign({},r.mux.listeners),delete r.mux.listeners,Object.keys(_.mux.listeners).forEach(function(A){r.removeEventListener(A,_.mux.listeners[A],!1),_.addEventListener(A,_.mux.listeners[A],!1)}),_.mux.swapElement=r.mux.swapElement,_.mux.destroy=r.mux.destroy,delete r.mux,r=_},r.mux.addHLSJS=function(h){t.addHLSJS(s,h)},r.mux.addDashJS=function(h){t.addDashJS(s,h)},r.mux.removeHLSJS=function(){t.removeHLSJS(s)},r.mux.removeDashJS=function(){t.removeDashJS(s)},r.mux.setEmitTranslator=function(h){t.setEmitTranslator(s,h)},r.mux.setStateDataTranslator=function(h){t.setStateDataTranslator(s,h)},r.mux.setGetPlayheadTime=function(h){h||(h=i.getPlayheadTime),t.setGetPlayheadTime(s,h)},t.init(s,i),t.emit(s,"playerready"),r.paused||(t.emit(s,"play"),r.readyState>2&&t.emit(s,"playing")),r.mux.listeners={},Cg.forEach(function(h){h==="error"&&!i.automaticErrorTracking||(r.mux.listeners[h]=function(){var f={};if(h==="error"){if(!r.error||r.error.code===1)return;f.player_error_code=r.error.code,f.player_error_message=Lg[r.error.code]||r.error.message}t.emit(s,h,f)},r.addEventListener(h,r.mux.listeners[h],!1))})}n(Dg,"st$2");function Mg(t,e,i,a){var r=a;if(t&&typeof t[e]=="function")try{r=t[e].apply(t,i)}catch(s){re.info("safeCall error",s)}return r}n(Mg,"ut$2");var Pn=st(Lt()),Na;Pn.default&&Pn.default.WeakMap&&(Na=new WeakMap);function xg(t,e){if(!t||!e||!Pn.default||typeof Pn.default.getComputedStyle!="function")return"";var i;return Na&&Na.has(t)&&(i=Na.get(t)),i||(i=Pn.default.getComputedStyle(t,null),Na&&Na.set(t,i)),i.getPropertyValue(e)}n(xg,"dt$2");function Og(t){return Math.floor(t*1e3)}n(Og,"lt$1");var Vi={TARGET_DURATION:"#EXT-X-TARGETDURATION",PART_INF:"#EXT-X-PART-INF",SERVER_CONTROL:"#EXT-X-SERVER-CONTROL",INF:"#EXTINF",PROGRAM_DATE_TIME:"#EXT-X-PROGRAM-DATE-TIME",VERSION:"#EXT-X-VERSION",SESSION_DATA:"#EXT-X-SESSION-DATA"},td=n(function(t){return this.buffer="",this.manifest={segments:[],serverControl:{},sessionData:{}},this.currentUri={},this.process(t),this.manifest},"Fe$1");td.prototype.process=function(t){var e;for(this.buffer+=t,e=this.buffer.indexOf(`
`);e>-1;e=this.buffer.indexOf(`
`))this.processLine(this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)};td.prototype.processLine=function(t){var e=t.indexOf(":"),i=Ug(t,e),a=i[0],r=i.length===2?Ec(i[1]):void 0;if(a[0]!=="#")this.currentUri.uri=a,this.manifest.segments.push(this.currentUri),this.manifest.targetDuration&&!("duration"in this.currentUri)&&(this.currentUri.duration=this.manifest.targetDuration),this.currentUri={};else switch(a){case Vi.TARGET_DURATION:{if(!isFinite(r)||r<0)return;this.manifest.targetDuration=r,this.setHoldBack();break}case Vi.PART_INF:{_d(this.manifest,i),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),this.setHoldBack();break}case Vi.SERVER_CONTROL:{_d(this.manifest,i),this.setHoldBack();break}case Vi.INF:{r===0?this.currentUri.duration=.01:r>0&&(this.currentUri.duration=r);break}case Vi.PROGRAM_DATE_TIME:{var s=r,o=new Date(s);this.manifest.dateTimeString||(this.manifest.dateTimeString=s,this.manifest.dateTimeObject=o),this.currentUri.dateTimeString=s,this.currentUri.dateTimeObject=o;break}case Vi.VERSION:{_d(this.manifest,i);break}case Vi.SESSION_DATA:{var l=Hg(i[1]),d=Hv(l);Object.assign(this.manifest.sessionData,d)}}};td.prototype.setHoldBack=function(){var t=this.manifest,e=t.serverControl,i=t.targetDuration,a=t.partTargetDuration;if(e){var r="holdBack",s="partHoldBack",o=i&&i*3,l=a&&a*2;i&&!e.hasOwnProperty(r)&&(e[r]=o),o&&e[r]<o&&(e[r]=o),a&&!e.hasOwnProperty(s)&&(e[s]=a*3),a&&e[s]<l&&(e[s]=l)}};var _d=n(function(t,e){var i=Qv(e[0].replace("#EXT-X-","")),a;$g(e[1])?(a={},a=Object.assign(Pg(e[1]),a)):a=Ec(e[1]),t[i]=a},"ct$2"),Qv=n(function(t){return t.toLowerCase().replace(/-(\w)/g,function(e){return e[1].toUpperCase()})},"Vr"),Ec=n(function(t){if(t.toLowerCase()==="yes"||t.toLowerCase()==="no")return t.toLowerCase()==="yes";var e=t.indexOf(":")!==-1?t:parseFloat(t);return isNaN(e)?t:e},"_t$1"),Ng=n(function(t){var e={},i=t.split("=");if(i.length>1){var a=Qv(i[0]);e[a]=Ec(i[1])}return e},"Ti"),Pg=n(function(t){for(var e=t.split(","),i={},a=0;e.length>a;a++){var r=e[a],s=Ng(r);i=Object.assign(s,i)}return i},"wi"),$g=n(function(t){return t.indexOf("=")>-1},"Ei"),Ug=n(function(t,e){return e===-1?[t]:[t.substring(0,e),t.substring(e+1)]},"ki"),Hg=n(function(t){var e={};if(t){var i=t.search(","),a=t.slice(0,i),r=t.slice(i+1),s=[a,r];return s.forEach(function(o,l){for(var d=o.replace(/['"]+/g,"").split("="),u=0;u<d.length;u++)d[u]==="DATA-ID"&&(e["DATA-ID"]=d[1-u]),d[u]==="VALUE"&&(e.VALUE=d[1-u])}),{data:e}}},"xi"),Bg=td,Wg={safeCall:Mg,safeIncrement:Ae,getComputedStyle:xg,secondsToMs:Og,assign:Object.assign,headersStringToObject:fc,cdnHeadersToRequestId:fl,extractHostnameAndDomain:Zn,extractHostname:Rt,manifestParser:Bg,generateShortID:$v,generateUUID:Qn,now:ke.now,findMediaElement:ml},Fg=Wg,Kg={PLAYER_READY:"playerready",VIEW_INIT:"viewinit",VIDEO_CHANGE:"videochange",PLAY:"play",PAUSE:"pause",PLAYING:"playing",TIME_UPDATE:"timeupdate",SEEKING:"seeking",SEEKED:"seeked",REBUFFER_START:"rebufferstart",REBUFFER_END:"rebufferend",ERROR:"error",ENDED:"ended",RENDITION_CHANGE:"renditionchange",ORIENTATION_CHANGE:"orientationchange",AD_REQUEST:"adrequest",AD_RESPONSE:"adresponse",AD_BREAK_START:"adbreakstart",AD_PLAY:"adplay",AD_PLAYING:"adplaying",AD_PAUSE:"adpause",AD_FIRST_QUARTILE:"adfirstquartile",AD_MID_POINT:"admidpoint",AD_THIRD_QUARTILE:"adthirdquartile",AD_ENDED:"adended",AD_BREAK_END:"adbreakend",AD_ERROR:"aderror",REQUEST_COMPLETED:"requestcompleted",REQUEST_FAILED:"requestfailed",REQUEST_CANCELLED:"requestcanceled",HEARTBEAT:"hb",DESTROY:"destroy"},Vg=Kg,qg="mux-embed",Yg="5.9.0",Gg="2.1",_e={},$i=n(function(t){var e=arguments;typeof t=="string"?$i.hasOwnProperty(t)?Nn.default.setTimeout(function(){e=Array.prototype.splice.call(e,1),$i[t].apply(null,e)},0):re.warn("`"+t+"` is an unknown task"):typeof t=="function"?Nn.default.setTimeout(function(){t($i)},0):re.warn("`"+t+"` is invalid.")},"ne$3"),Qg={loaded:ke.now(),NAME:qg,VERSION:Yg,API_VERSION:Gg,PLAYER_TRACKED:!1,monitor:n(function(t,e){return Dg($i,t,e)},"monitor"),destroyMonitor:n(function(t){var e=fi(ml(t),1),i=e[0];i&&i.mux&&typeof i.mux.destroy=="function"?i.mux.destroy():re.error("A video element monitor for `"+t+"` has not been initialized via `mux.monitor`.")},"destroyMonitor"),addHLSJS:n(function(t,e){var i=Tt(t);_e[i]?_e[i].addHLSJS(e):re.error("A monitor for `"+i+"` has not been initialized.")},"addHLSJS"),addDashJS:n(function(t,e){var i=Tt(t);_e[i]?_e[i].addDashJS(e):re.error("A monitor for `"+i+"` has not been initialized.")},"addDashJS"),removeHLSJS:n(function(t){var e=Tt(t);_e[e]?_e[e].removeHLSJS():re.error("A monitor for `"+e+"` has not been initialized.")},"removeHLSJS"),removeDashJS:n(function(t){var e=Tt(t);_e[e]?_e[e].removeDashJS():re.error("A monitor for `"+e+"` has not been initialized.")},"removeDashJS"),init:n(function(t,e){Ud()&&e&&e.respectDoNotTrack&&re.info("The browser's Do Not Track flag is enabled - Mux beaconing is disabled.");var i=Tt(t);_e[i]=new Ig($i,i,e)},"init"),emit:n(function(t,e,i){var a=Tt(t);_e[a]?(_e[a].emit(e,i),e==="destroy"&&delete _e[a]):re.error("A monitor for `"+a+"` has not been initialized.")},"emit"),updateData:n(function(t,e){var i=Tt(t);_e[i]?_e[i].emit("hb",e):re.error("A monitor for `"+i+"` has not been initialized.")},"updateData"),setEmitTranslator:n(function(t,e){var i=Tt(t);_e[i]?_e[i].emitTranslator=e:re.error("A monitor for `"+i+"` has not been initialized.")},"setEmitTranslator"),setStateDataTranslator:n(function(t,e){var i=Tt(t);_e[i]?_e[i].stateDataTranslator=e:re.error("A monitor for `"+i+"` has not been initialized.")},"setStateDataTranslator"),setGetPlayheadTime:n(function(t,e){var i=Tt(t);_e[i]?_e[i].getPlayheadTime=e:re.error("A monitor for `"+i+"` has not been initialized.")},"setGetPlayheadTime"),checkDoNotTrack:Ud,log:re,utils:Fg,events:Vg,WINDOW_HIDDEN:!1,WINDOW_UNLOADING:!1};Object.assign($i,Qg);typeof Nn.default<"u"&&typeof Nn.default.addEventListener=="function"&&Nn.default.addEventListener("pagehide",function(t){t.persisted||($i.WINDOW_UNLOADING=!0)},!1);var bc=$i;var F=Mb,ne={VIDEO:"video",THUMBNAIL:"thumbnail",STORYBOARD:"storyboard",DRM:"drm"},N={NOT_AN_ERROR:0,NETWORK_OFFLINE:2000002,NETWORK_UNKNOWN_ERROR:2e6,NETWORK_NO_STATUS:2000001,NETWORK_INVALID_URL:24e5,NETWORK_NOT_FOUND:2404e3,NETWORK_NOT_READY:2412e3,NETWORK_GENERIC_SERVER_FAIL:25e5,NETWORK_TOKEN_MISSING:2403201,NETWORK_TOKEN_MALFORMED:2412202,NETWORK_TOKEN_EXPIRED:2403210,NETWORK_TOKEN_AUD_MISSING:2403221,NETWORK_TOKEN_AUD_MISMATCH:2403222,NETWORK_TOKEN_SUB_MISMATCH:2403232,ENCRYPTED_ERROR:5e6,ENCRYPTED_UNSUPPORTED_KEY_SYSTEM:5000001,ENCRYPTED_GENERATE_REQUEST_FAILED:5000002,ENCRYPTED_UPDATE_LICENSE_FAILED:5000003,ENCRYPTED_UPDATE_SERVER_CERT_FAILED:5000004,ENCRYPTED_CDM_ERROR:5000005,ENCRYPTED_OUTPUT_RESTRICTED:5000006,ENCRYPTED_MISSING_TOKEN:5000002},id=n(t=>t===ne.VIDEO?"playback":t,"V$1"),jt,ki=(jt=class extends Error{constructor(e,i=jt.MEDIA_ERR_CUSTOM,a,r){var s;super(e),this.name="MediaError",this.code=i,this.context=r,this.fatal=a??(i>=jt.MEDIA_ERR_NETWORK&&i<=jt.MEDIA_ERR_ENCRYPTED),this.message||(this.message=(s=jt.defaultMessages[this.code])!=null?s:"")}},n(jt,"L"),jt);ki.MEDIA_ERR_ABORTED=1,ki.MEDIA_ERR_NETWORK=2,ki.MEDIA_ERR_DECODE=3,ki.MEDIA_ERR_SRC_NOT_SUPPORTED=4,ki.MEDIA_ERR_ENCRYPTED=5,ki.MEDIA_ERR_CUSTOM=100,ki.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail.",3:"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",4:"An unsupported error occurred. The server or network failed, or your browser does not support this format.",5:"The media is encrypted and there are no keys to decrypt it."};var L=ki,Zg=n(t=>t==null,"at$2"),_c=n((t,e)=>Zg(e)?!1:t in e,"O$1"),Wd={ANY:"any",MUTED:"muted"},X={ON_DEMAND:"on-demand",LIVE:"live",UNKNOWN:"unknown"},zt={MSE:"mse",NATIVE:"native"},vn={HEADER:"header",QUERY:"query",NONE:"none"},Fd=Object.values(vn),pi={M3U8:"application/vnd.apple.mpegurl",MP4:"video/mp4"},Zm={HLS:pi.M3U8};[...Object.values(pi)];var OS={upTo720p:"720p",upTo1080p:"1080p",upTo1440p:"1440p",upTo2160p:"2160p"},NS={noLessThan480p:"480p",noLessThan540p:"540p",noLessThan720p:"720p",noLessThan1080p:"1080p",noLessThan1440p:"1440p",noLessThan2160p:"2160p"},PS={DESCENDING:"desc"},jg="en",Kd={code:jg},ye=n((t,e,i,a,r=t)=>{r.addEventListener(e,i,a),t.addEventListener("teardown",()=>{r.removeEventListener(e,i)},{once:!0})},"v$2");function zg(t,e,i){e&&i>e&&(i=e);for(let a=0;a<t.length;a++)if(t.start(a)<=i&&t.end(a)>=i)return!0;return!1}n(zg,"Te$1");var gc=n(t=>{let e=t.indexOf("?");if(e<0)return[t];let i=t.slice(0,e),a=t.slice(e);return[i,a]},"F$1"),ad=n(t=>{let{type:e}=t;if(e){let i=e.toUpperCase();return _c(i,Zm)?Zm[i]:e}return Xg(t)},"U$1"),Zv=n(t=>t==="VOD"?X.ON_DEMAND:X.LIVE,"Q$1"),jv=n(t=>t==="EVENT"?Number.POSITIVE_INFINITY:t==="VOD"?Number.NaN:0,"Z"),Xg=n(t=>{let{src:e}=t;if(!e)return"";let i="";try{i=new URL(e).pathname}catch{}let a=i.lastIndexOf(".");if(a<0)return e0(t)?pi.M3U8:"";let r=i.slice(a+1).toUpperCase();return _c(r,pi)?pi[r]:""},"it"),Jg="mux.com",e0=n(({src:t,customDomain:e=Jg})=>{let i;try{i=new URL(`${t}`)}catch{return!1}let a=i.protocol==="https:",r=i.hostname===`stream.${e}`.toLowerCase(),s=i.pathname.split("/"),o=s.length===2,l=!(s!=null&&s[1].includes("."));return a&&r&&o&&l},"ut$1"),dr=n(t=>{let e=(t??"").split(".")[1];if(e)try{let i=e.replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(i).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(a)}catch{return}},"ee$2"),t0=n(({exp:t},e=Date.now())=>!t||t*1e3<e,"ye$2"),i0=n(({sub:t},e)=>t!==e,"me$2"),a0=n(({aud:t},e)=>!t,"Ee"),r0=n(({aud:t},e)=>t!==e,"ge$2"),zv="en";function x(t,e=!0){var i,a;let r=e&&(a=(i=Kd)==null?void 0:i[t])!=null?a:t,s=e?Kd.code:zv;return new n0(r,s)}n(x,"x$4");var br,n0=(br=class{constructor(e,i=(a=>(a=Kd)!=null?a:zv)()){this.message=e,this.locale=i}format(e){return this.message.replace(/\{(\w+)\}/g,(i,a)=>{var r;return(r=e[a])!=null?r:""})}toString(){return this.message}},n(br,"z"),br),s0=Object.values(Wd),jm=n(t=>typeof t=="boolean"||typeof t=="string"&&s0.includes(t),"xe$2"),o0=n((t,e,i)=>{let{autoplay:a}=t,r=!1,s=!1,o=jm(a)?a:!!a,l=n(()=>{r||ye(e,"playing",()=>{r=!0},{once:!0})},"i");if(l(),ye(e,"loadstart",()=>{r=!1,l(),gd(e,o)},{once:!0}),ye(e,"loadstart",()=>{i||(t.streamType&&t.streamType!==X.UNKNOWN?s=t.streamType===X.LIVE:s=!Number.isFinite(e.duration)),gd(e,o)},{once:!0}),i&&i.once(F.Events.LEVEL_LOADED,(d,u)=>{var p;t.streamType&&t.streamType!==X.UNKNOWN?s=t.streamType===X.LIVE:s=(p=u.details.live)!=null?p:!1}),!o){let d=n(()=>{!s||Number.isFinite(t.startTime)||(i!=null&&i.liveSyncPosition?e.currentTime=i.liveSyncPosition:Number.isFinite(e.seekable.end(0))&&(e.currentTime=e.seekable.end(0)))},"u");i&&ye(e,"play",()=>{e.preload==="metadata"?i.once(F.Events.LEVEL_UPDATED,d):d()},{once:!0})}return d=>{r||(o=jm(d)?d:!!d,gd(e,o))}},"Re$1"),gd=n((t,e)=>{if(!e)return;let i=t.muted,a=n(()=>t.muted=i,"n");switch(e){case Wd.ANY:t.play().catch(()=>{t.muted=!0,t.play().catch(a)});break;case Wd.MUTED:t.muted=!0,t.play().catch(a);break;default:t.play().catch(()=>{});break}},"te$2"),l0=n(({preload:t,src:e},i,a)=>{let r=n(v=>{v!=null&&["","none","metadata","auto"].includes(v)?i.setAttribute("preload",v):i.removeAttribute("preload")},"o");if(!a)return r(t),r;let s=!1,o=!1,l=a.config.maxBufferLength,d=a.config.maxBufferSize,u=n(v=>{r(v);let m=v??i.preload;o||m==="none"||(m==="metadata"?(a.config.maxBufferLength=1,a.config.maxBufferSize=1):(a.config.maxBufferLength=l,a.config.maxBufferSize=d),p())},"u"),p=n(()=>{!s&&e&&(s=!0,a.loadSource(e))},"c");return ye(i,"play",()=>{o=!0,a.config.maxBufferLength=l,a.config.maxBufferSize=d,p()},{once:!0}),u(t),u},"be");function d0(t,e){var i;if(!("videoTracks"in t))return;let a=new WeakMap;e.on(F.Events.MANIFEST_PARSED,function(d,u){l();let p=t.addVideoTrack("main");p.selected=!0;for(let[v,m]of u.levels.entries()){let h=p.addRendition(m.url[0],m.width,m.height,m.videoCodec,m.bitrate);a.set(m,`${v}`),h.id=`${v}`}}),e.on(F.Events.AUDIO_TRACKS_UPDATED,function(d,u){o();for(let p of u.audioTracks){let v=p.default?"main":"alternative",m=t.addAudioTrack(v,p.name,p.lang);m.id=`${p.id}`,p.default&&(m.enabled=!0)}}),t.audioTracks.addEventListener("change",()=>{var d;let u=+((d=[...t.audioTracks].find(v=>v.enabled))==null?void 0:d.id),p=e.audioTracks.map(v=>v.id);u!=e.audioTrack&&p.includes(u)&&(e.audioTrack=u)}),e.on(F.Events.LEVELS_UPDATED,function(d,u){var p;let v=t.videoTracks[(p=t.videoTracks.selectedIndex)!=null?p:0];if(!v)return;let m=u.levels.map(h=>a.get(h));for(let h of t.videoRenditions)h.id&&!m.includes(h.id)&&v.removeRendition(h)});let r=n(d=>{let u=d.target.selectedIndex;u!=e.nextLevel&&(e.nextLevel=u)},"n");(i=t.videoRenditions)==null||i.addEventListener("change",r);let s=n(()=>{for(let d of t.videoTracks)t.removeVideoTrack(d)},"o"),o=n(()=>{for(let d of t.audioTracks)t.removeAudioTrack(d)},"s"),l=n(()=>{s(),o()},"a");e.once(F.Events.DESTROYING,l)}n(d0,"De");var yd=n(t=>"time"in t?t.time:t.startTime,"re$2");function u0(t,e){e.on(F.Events.NON_NATIVE_TEXT_TRACKS_FOUND,(r,{tracks:s})=>{s.forEach(o=>{var l,d;let u=(l=o.subtitleTrack)!=null?l:o.closedCaptions,p=e.subtitleTracks.findIndex(({lang:m,name:h,type:f})=>m==u?.lang&&h===o.label&&f.toLowerCase()===o.kind),v=((d=o._id)!=null?d:o.default)?"default":`${o.kind}${p}`;yc(t,o.kind,o.label,u?.lang,v,o.default)})});let i=n(()=>{if(!e.subtitleTracks.length)return;let r=Array.from(t.textTracks).find(l=>l.id&&l.mode==="showing"&&["subtitles","captions"].includes(l.kind));if(!r)return;let s=e.subtitleTracks[e.subtitleTrack],o=s?s.default?"default":`${e.subtitleTracks[e.subtitleTrack].type.toLowerCase()}${e.subtitleTrack}`:void 0;if(e.subtitleTrack<0||r?.id!==o){let l=e.subtitleTracks.findIndex(({lang:d,name:u,type:p,default:v})=>r.id==="default"&&v||d==r.language&&u===r.label&&p.toLowerCase()===r.kind);e.subtitleTrack=l}r?.id===o&&r.cues&&Array.from(r.cues).forEach(l=>{r.addCue(l)})},"r");t.textTracks.addEventListener("change",i),e.on(F.Events.CUES_PARSED,(r,{track:s,cues:o})=>{let l=t.textTracks.getTrackById(s);if(!l)return;let d=l.mode==="disabled";d&&(l.mode="hidden"),o.forEach(u=>{var p;(p=l.cues)!=null&&p.getCueById(u.id)||l.addCue(u)}),d&&(l.mode="disabled")}),e.once(F.Events.DESTROYING,()=>{t.textTracks.removeEventListener("change",i),t.querySelectorAll("track[data-removeondestroy]").forEach(r=>{r.remove()})});let a=n(()=>{Array.from(t.textTracks).forEach(r=>{var s,o;if(!["subtitles","caption"].includes(r.kind)&&(r.label==="thumbnails"||r.kind==="chapters")){if(!((s=r.cues)!=null&&s.length)){let l="track";r.kind&&(l+=`[kind="${r.kind}"]`),r.label&&(l+=`[label="${r.label}"]`);let d=t.querySelector(l),u=(o=d?.getAttribute("src"))!=null?o:"";d?.removeAttribute("src"),setTimeout(()=>{d?.setAttribute("src",u)},0)}r.mode!=="hidden"&&(r.mode="hidden")}})},"n");e.once(F.Events.MANIFEST_LOADED,a),e.once(F.Events.MEDIA_ATTACHED,a)}n(u0,"Ce$1");function yc(t,e,i,a,r,s){let o=document.createElement("track");return o.kind=e,o.label=i,a&&(o.srclang=a),r&&(o.id=r),s&&(o.default=!0),o.track.mode=["subtitles","captions"].includes(e)?"disabled":"hidden",o.setAttribute("data-removeondestroy",""),t.append(o),o.track}n(yc,"ne$2");function c0(t,e){let i=Array.prototype.find.call(t.querySelectorAll("track"),a=>a.track===e);i?.remove()}n(c0,"lt");function Os(t,e,i){var a;return(a=Array.from(t.querySelectorAll("track")).find(r=>r.track.label===e&&r.track.kind===i))==null?void 0:a.track}n(Os,"w$1");async function Xv(t,e,i,a){let r=Os(t,i,a);return r||(r=yc(t,a,i),r.mode="hidden",await new Promise(s=>setTimeout(()=>s(void 0),0))),r.mode!=="hidden"&&(r.mode="hidden"),[...e].sort((s,o)=>yd(o)-yd(s)).forEach(s=>{var o,l;let d=s.value,u=yd(s);if("endTime"in s&&s.endTime!=null)r?.addCue(new VTTCue(u,s.endTime,a==="chapters"?d:JSON.stringify(d??null)));else{let p=Array.prototype.findIndex.call(r?.cues,f=>f.startTime>=u),v=(o=r?.cues)==null?void 0:o[p],m=v?v.startTime:Number.isFinite(t.duration)?t.duration:Number.MAX_SAFE_INTEGER,h=(l=r?.cues)==null?void 0:l[p-1];h&&(h.endTime=u),r?.addCue(new VTTCue(u,m,a==="chapters"?d:JSON.stringify(d??null)))}}),t.textTracks.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),r}n(Xv,"ve$1");var Tc="cuepoints",Jv=Object.freeze({label:Tc});async function ef(t,e,i=Jv){return Xv(t,e,i.label,"metadata")}n(ef,"_e$1");var Vd=n(t=>({time:t.startTime,value:JSON.parse(t.text)}),"$");function h0(t,e={label:Tc}){let i=Os(t,e.label,"metadata");return i!=null&&i.cues?Array.from(i.cues,a=>Vd(a)):[]}n(h0,"pt$1");function tf(t,e={label:Tc}){var i,a;let r=Os(t,e.label,"metadata");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return Vd(r.activeCues[0]);let{currentTime:s}=t,o=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:l,endTime:d})=>l<=s&&d>s);return Vd(o||r.activeCues[0])}n(tf,"ke$1");async function m0(t,e=Jv){return new Promise(i=>{ye(t,"loadstart",async()=>{let a=await ef(t,[],e);ye(t,"cuechange",()=>{let r=tf(t);if(r){let s=new CustomEvent("cuepointchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(s)}},{},a),i(a)})})}n(m0,"he$1");var Ac="chapters",af=Object.freeze({label:Ac}),qd=n(t=>({startTime:t.startTime,endTime:t.endTime,value:t.text}),"B$2");async function rf(t,e,i=af){return Xv(t,e,i.label,"chapters")}n(rf,"Ne$1");function p0(t,e={label:Ac}){var i;let a=Os(t,e.label,"chapters");return(i=a?.cues)!=null&&i.length?Array.from(a.cues,r=>qd(r)):[]}n(p0,"ft");function nf(t,e={label:Ac}){var i,a;let r=Os(t,e.label,"chapters");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return qd(r.activeCues[0]);let{currentTime:s}=t,o=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:l,endTime:d})=>l<=s&&d>s);return qd(o||r.activeCues[0])}n(nf,"Ie");async function v0(t,e=af){return new Promise(i=>{ye(t,"loadstart",async()=>{let a=await rf(t,[],e);ye(t,"cuechange",()=>{let r=nf(t);if(r){let s=new CustomEvent("chapterchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(s)}},{},a),i(a)})})}n(v0,"Ae$1");function f0(t,e){if(e){let i=e.playingDate;if(i!=null)return new Date(i.getTime()-t.currentTime*1e3)}return typeof t.getStartDate=="function"?t.getStartDate():new Date(NaN)}n(f0,"Tt$1");function E0(t,e){if(e&&e.playingDate)return e.playingDate;if(typeof t.getStartDate=="function"){let i=t.getStartDate();return new Date(i.getTime()+t.currentTime*1e3)}return new Date(NaN)}n(E0,"yt");var $n={VIDEO:"v",THUMBNAIL:"t",STORYBOARD:"s",DRM:"d"},b0=n(t=>{if(t===ne.VIDEO)return $n.VIDEO;if(t===ne.DRM)return $n.DRM},"mt$1"),_0=n((t,e)=>{var i,a;let r=id(t),s=`${r}Token`;return(i=e.tokens)!=null&&i[r]?(a=e.tokens)==null?void 0:a[r]:_c(s,e)?e[s]:void 0},"Et$1"),El=n((t,e,i,a,r=!1,s=!(o=>(o=globalThis.navigator)==null?void 0:o.onLine)())=>{var o,l;if(s){let y=x("Your device appears to be offline",r),A,g=L.MEDIA_ERR_NETWORK,w=new L(y,g,!1,A);return w.errorCategory=e,w.muxCode=N.NETWORK_OFFLINE,w.data=t,w}let d="status"in t?t.status:t.code,u=Date.now(),p=L.MEDIA_ERR_NETWORK;if(d===200)return;let v=id(e),m=_0(e,i),h=b0(e),[f]=gc((o=i.playbackId)!=null?o:"");if(!d||!f)return;let _=dr(m);if(m&&!_){let y=x("The {tokenNamePrefix}-token provided is invalid or malformed.",r).format({tokenNamePrefix:v}),A=x("Compact JWT string: {token}",r).format({token:m}),g=new L(y,p,!0,A);return g.errorCategory=e,g.muxCode=N.NETWORK_TOKEN_MALFORMED,g.data=t,g}if(d>=500){let y=new L("",p,a??!0);return y.errorCategory=e,y.muxCode=N.NETWORK_UNKNOWN_ERROR,y}if(d===403)if(_){if(t0(_,u)){let y={timeStyle:"medium",dateStyle:"medium"},A=x("The video’s secured {tokenNamePrefix}-token has expired.",r).format({tokenNamePrefix:v}),g=x("Expired at: {expiredDate}. Current time: {currentDate}.",r).format({expiredDate:new Intl.DateTimeFormat("en",y).format((l=_.exp)!=null?l:0*1e3),currentDate:new Intl.DateTimeFormat("en",y).format(u)}),w=new L(A,p,!0,g);return w.errorCategory=e,w.muxCode=N.NETWORK_TOKEN_EXPIRED,w.data=t,w}if(i0(_,f)){let y=x("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",r).format({tokenNamePrefix:v}),A=x("Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}",r).format({tokenNamePrefix:v,playbackId:f,tokenPlaybackId:_.sub}),g=new L(y,p,!0,A);return g.errorCategory=e,g.muxCode=N.NETWORK_TOKEN_SUB_MISMATCH,g.data=t,g}if(a0(_)){let y=x("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:v}),A=x("The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.",r).format({tokenNamePrefix:v,expectedAud:h}),g=new L(y,p,!0,A);return g.errorCategory=e,g.muxCode=N.NETWORK_TOKEN_AUD_MISSING,g.data=t,g}if(r0(_,h)){let y=x("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:v}),A=x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.",r).format({tokenNamePrefix:v,expectedAud:h,aud:_.aud}),g=new L(y,p,!0,A);return g.errorCategory=e,g.muxCode=N.NETWORK_TOKEN_AUD_MISMATCH,g.data=t,g}}else{let y=x("Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.",r).format({tokenNamePrefix:v,category:e}),A=x("Specified playback ID: {playbackId}",r).format({playbackId:f}),g=new L(y,p,a??!0,A);return g.errorCategory=e,g.muxCode=N.NETWORK_TOKEN_MISSING,g.data=t,g}if(d===412){let y=x("This playback-id may belong to a live stream that is not currently active or an asset that is not ready.",r),A=x("Specified playback ID: {playbackId}",r).format({playbackId:f}),g=new L(y,p,a??!0,A);return g.errorCategory=e,g.muxCode=N.NETWORK_NOT_READY,g.streamType=i.streamType===X.LIVE?"live":i.streamType===X.ON_DEMAND?"on-demand":"unknown",g.data=t,g}if(d===404){let y=x("This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.",r),A=x("Specified playback ID: {playbackId}",r).format({playbackId:f}),g=new L(y,p,a??!0,A);return g.errorCategory=e,g.muxCode=N.NETWORK_NOT_FOUND,g.data=t,g}if(d===400){let y=x("The URL or playback-id was invalid. You may have used an invalid value as a playback-id."),A=x("Specified playback ID: {playbackId}",r).format({playbackId:f}),g=new L(y,p,a??!0,A);return g.errorCategory=e,g.muxCode=N.NETWORK_INVALID_URL,g.data=t,g}let b=new L("",p,a??!0);return b.errorCategory=e,b.muxCode=N.NETWORK_UNKNOWN_ERROR,b.data=t,b},"H$1"),zm=F.DefaultConfig.capLevelController,ya,sf=(ya=class extends zm{constructor(e){super(e)}get levels(){var e;return(e=this.hls.levels)!=null?e:[]}getValidLevels(e){return this.levels.filter((i,a)=>this.isLevelAllowed(i)&&a<=e)}getMaxLevel(e){let i=super.getMaxLevel(e),a=this.getValidLevels(e);if(!a[i])return i;let r=Math.min(a[i].width,a[i].height),s=ya.minMaxResolution;return r>=s?i:zm.getMaxLevelByMediaSize(a,s*(16/9),s)}},n(ya,"j"),ya);sf.minMaxResolution=720;var g0=sf,y0=g0,no={FAIRPLAY:"fairplay",PLAYREADY:"playready",WIDEVINE:"widevine"},T0=n(t=>{if(t.includes("fps"))return no.FAIRPLAY;if(t.includes("playready"))return no.PLAYREADY;if(t.includes("widevine"))return no.WIDEVINE},"gt$1"),A0=n(t=>{let e=t.split(`
`).find((i,a,r)=>a&&r[a-1].startsWith("#EXT-X-STREAM-INF"));return fetch(e).then(i=>i.status!==200?Promise.reject(i):i.text())},"Mt$1"),k0=n(t=>{let e=t.split(`
`).filter(a=>a.startsWith("#EXT-X-SESSION-DATA"));if(!e.length)return{};let i={};for(let a of e){let r=w0(a),s=r["DATA-ID"];s&&(i[s]={...r})}return{sessionData:i}},"xt$1"),S0=/([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g;function w0(t){let e=[...t.matchAll(S0)];return Object.fromEntries(e.map(([,i,a])=>[i,a]))}n(w0,"bt$1");var I0=n(t=>{var e,i,a;let r=t.split(`
`),s=(i=((e=r.find(u=>u.startsWith("#EXT-X-PLAYLIST-TYPE")))!=null?e:"").split(":")[1])==null?void 0:i.trim(),o=Zv(s),l=jv(s),d;if(o===X.LIVE){let u=r.find(p=>p.startsWith("#EXT-X-PART-INF"));if(u)d=+u.split(":")[1].split("=")[1]*2;else{let p=r.find(m=>m.startsWith("#EXT-X-TARGETDURATION")),v=(a=p?.split(":"))==null?void 0:a[1];d=+(v??6)*3}}return{streamType:o,targetLiveWindow:l,liveEdgeStartOffset:d}},"Dt$1"),R0=n(async(t,e)=>{if(e===pi.MP4)return{streamType:X.ON_DEMAND,targetLiveWindow:Number.NaN,liveEdgeStartOffset:void 0,sessionData:void 0};if(e===pi.M3U8){let i=await fetch(t);if(!i.ok)return Promise.reject(i);let a=await i.text(),r=await A0(a);return{...k0(a),...I0(r)}}return{streamType:void 0,targetLiveWindow:void 0,liveEdgeStartOffset:void 0,sessionData:void 0}},"Ct$1"),C0=n(async(t,e,i=ad({src:t}))=>{var a,r,s,o;let{streamType:l,targetLiveWindow:d,liveEdgeStartOffset:u,sessionData:p}=await R0(t,i),v=p?.["com.apple.hls.chapters"];(v!=null&&v.URI||v!=null&&v.VALUE.toLocaleLowerCase().startsWith("http"))&&kc((a=v.URI)!=null?a:v.VALUE,e),((r=pe.get(e))!=null?r:{}).liveEdgeStartOffset=u,((s=pe.get(e))!=null?s:{}).targetLiveWindow=d,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((o=pe.get(e))!=null?o:{}).streamType=l,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},"vt$1"),kc=n(async(t,e)=>{var i,a;try{let r=await fetch(t);if(!r.ok)throw new Error(`Failed to fetch Mux metadata: ${r.status} ${r.statusText}`);let s=await r.json(),o={};if(!((i=s?.[0])!=null&&i.metadata))return;for(let d of s[0].metadata)d.key&&d.value&&(o[d.key]=d.value);((a=pe.get(e))!=null?a:{}).metadata=o;let l=new CustomEvent("muxmetadata");e.dispatchEvent(l)}catch{}},"de$2"),L0=n(t=>{var e;let i=t.type,a=Zv(i),r=jv(i),s,o=!!((e=t.partList)!=null&&e.length);return a===X.LIVE&&(s=o?t.partTarget*2:t.targetduration*3),{streamType:a,targetLiveWindow:r,liveEdgeStartOffset:s,lowLatency:o}},"Pt$1"),D0=n((t,e,i)=>{var a,r,s,o,l,d,u,p;let{streamType:v,targetLiveWindow:m,liveEdgeStartOffset:h,lowLatency:f}=L0(t);if(v===X.LIVE){f?(i.config.backBufferLength=(a=i.userConfig.backBufferLength)!=null?a:4,i.config.maxFragLookUpTolerance=(r=i.userConfig.maxFragLookUpTolerance)!=null?r:.001,i.config.abrBandWidthUpFactor=(s=i.userConfig.abrBandWidthUpFactor)!=null?s:i.config.abrBandWidthFactor):i.config.backBufferLength=(o=i.userConfig.backBufferLength)!=null?o:8;let _=Object.freeze({get length(){return e.seekable.length},start(b){return e.seekable.start(b)},end(b){var y;return b>this.length||b<0||Number.isFinite(e.duration)?e.seekable.end(b):(y=i.liveSyncPosition)!=null?y:e.seekable.end(b)}});((l=pe.get(e))!=null?l:{}).seekable=_}((d=pe.get(e))!=null?d:{}).liveEdgeStartOffset=h,((u=pe.get(e))!=null?u:{}).targetLiveWindow=m,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((p=pe.get(e))!=null?p:{}).streamType=v,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},"_t"),Xm,Jm,M0=(Jm=(Xm=globalThis?.navigator)==null?void 0:Xm.userAgent)!=null?Jm:"",ep,tp,ip,x0=(ip=(tp=(ep=globalThis?.navigator)==null?void 0:ep.userAgentData)==null?void 0:tp.platform)!=null?ip:"",ap,rp,np,O0=(np=(rp=(ap=globalThis?.navigator)==null?void 0:ap.userAgentData)==null?void 0:rp.brands)!=null?np:[],N0=M0.toLowerCase().includes("android")||["x11","android"].some(t=>x0.toLowerCase().includes(t)),sp=O0.find(t=>t.brand==="Google Chrome"),P0=n(t=>{var e;return sp&&parseInt((e=sp.version)!=null?e:"0")>=141&&!!t.canPlayType("application/vnd.apple.mpegurl")},"It$1"),pe=new WeakMap,vi="mux.com",op,lp,of=(lp=(op=F).isSupported)==null?void 0:lp.call(op),$0=n(t=>N0||P0(t),"At$1"),Sc=n(()=>bc.utils.now(),"Gr"),U0=bc.utils.generateUUID,Yd=n(({playbackId:t,customDomain:e=vi,maxResolution:i,minResolution:a,renditionOrder:r,programStartTime:s,programEndTime:o,assetStartTime:l,assetEndTime:d,playbackToken:u,tokens:{playback:p=u}={},extraSourceParams:v={}}={})=>{if(!t)return;let[m,h=""]=gc(t),f=new URL(`https://stream.${e}/${m}.m3u8${h}`);return p||f.searchParams.has("token")?(f.searchParams.forEach((_,b)=>{b!="token"&&f.searchParams.delete(b)}),p&&f.searchParams.set("token",p)):(i&&f.searchParams.set("max_resolution",i),a&&(f.searchParams.set("min_resolution",a),i&&+i.slice(0,-1)<+a.slice(0,-1)),r&&f.searchParams.set("rendition_order",r),s&&f.searchParams.set("program_start_time",`${s}`),o&&f.searchParams.set("program_end_time",`${o}`),l&&f.searchParams.set("asset_start_time",`${l}`),d&&f.searchParams.set("asset_end_time",`${d}`),Object.entries(v).forEach(([_,b])=>{b!=null&&f.searchParams.set(_,b)})),f.toString()},"qr"),rd=n(t=>{if(!t)return;let[e]=t.split("?");return e||void 0},"q$1"),wc=n(t=>{if(!t||!t.startsWith("https://stream."))return;let[e]=new URL(t).pathname.slice(1).split(/\.m3u8|\//);return e||void 0},"qe"),H0=n(t=>{var e,i,a;return(e=t?.metadata)!=null&&e.video_id?t.metadata.video_id:vf(t)&&(a=(i=rd(t.playbackId))!=null?i:wc(t.src))!=null?a:t.src},"wt$1"),lf=n(t=>{var e;return(e=pe.get(t))==null?void 0:e.error},"Ot$1"),B0=n(t=>{var e;return(e=pe.get(t))==null?void 0:e.metadata},"Xr"),Gd=n(t=>{var e,i;return(i=(e=pe.get(t))==null?void 0:e.streamType)!=null?i:X.UNKNOWN},"Ue"),W0=n(t=>{var e,i;return(i=(e=pe.get(t))==null?void 0:e.targetLiveWindow)!=null?i:Number.NaN},"zr"),Ic=n(t=>{var e,i;return(i=(e=pe.get(t))==null?void 0:e.seekable)!=null?i:t.seekable},"Xe"),F0=n(t=>{var e;let i=(e=pe.get(t))==null?void 0:e.liveEdgeStartOffset;if(typeof i!="number")return Number.NaN;let a=Ic(t);return a.length?a.end(a.length-1)-i:Number.NaN},"Qr"),Rc=.034,K0=n((t,e,i=Rc)=>Math.abs(t-e)<=i,"Ut$1"),df=n((t,e,i=Rc)=>t>e||K0(t,e,i),"ze$1"),V0=n((t,e=Rc)=>t.paused&&df(t.currentTime,t.duration,e),"Ht$1"),uf=n((t,e)=>{var i,a,r;if(!e||!t.buffered.length)return;if(t.readyState>2)return!1;let s=e.currentLevel>=0?(a=(i=e.levels)==null?void 0:i[e.currentLevel])==null?void 0:a.details:(r=e.levels.find(v=>!!v.details))==null?void 0:r.details;if(!s||s.live)return;let{fragments:o}=s;if(!(o!=null&&o.length))return;if(t.currentTime<t.duration-(s.targetduration+.5))return!1;let l=o[o.length-1];if(t.currentTime<=l.start)return!1;let d=l.start+l.duration/2,u=t.buffered.start(t.buffered.length-1),p=t.buffered.end(t.buffered.length-1);return d>u&&d<p},"Qe"),cf=n((t,e)=>t.ended||t.loop?t.ended:e&&uf(t,e)?!0:V0(t),"Vt$1"),q0=n((t,e,i)=>{hf(e,i,t);let{metadata:a={}}=t,{view_session_id:r=U0()}=a,s=H0(t);a.view_session_id=r,a.video_id=s,t.metadata=a;let o=n(p=>{var v;(v=e.mux)==null||v.emit("hb",{view_drm_type:p})},"a");t.drmTypeCb=o,pe.set(e,{retryCount:0});let l=Y0(t,e),d=l0(t,e,l);t!=null&&t.muxDataKeepSession&&e!=null&&e.mux&&!e.mux.deleted?l&&e.mux.addHLSJS({hlsjs:l,Hls:l?F:void 0}):X0(t,e,l),J0(t,e,l),m0(e),v0(e);let u=o0(t,e,l);return{engine:l,setAutoplay:u,setPreload:d}},"Zr"),hf=n((t,e,i)=>{let a=e?.engine;t!=null&&t.mux&&!t.mux.deleted&&(i!=null&&i.muxDataKeepSession?a&&t.mux.removeHLSJS():(t.mux.destroy(),delete t.mux)),a&&(a.detachMedia(),a.destroy()),t&&(t.hasAttribute("src")&&(t.removeAttribute("src"),t.load()),t.removeEventListener("error",Ef),t.removeEventListener("error",Qd),t.removeEventListener("durationchange",ff),pe.delete(t),t.dispatchEvent(new Event("teardown")))},"Kt$1");function mf(t,e){var i;let a=ad(t);if(a!==pi.M3U8)return!0;let r=!a||((i=e.canPlayType(a))!=null?i:!0),{preferPlayback:s}=t,o=s===zt.MSE,l=s===zt.NATIVE,d=of&&(o||$0(e));return r&&(l||!d)}n(mf,"Ze");var Y0=n((t,e)=>{let{debug:i,streamType:a,startTime:r=-1,metadata:s,preferCmcd:o,_hlsConfig:l={}}=t,d=ad(t)===pi.M3U8,u=mf(t,e);if(d&&!u&&of){let p={backBufferLength:30,renderTextTracksNatively:!1,liveDurationInfinity:!0,capLevelToPlayerSize:!0,capLevelOnFPSDrop:!0},v=G0(a),m=Q0(t),h=[vn.QUERY,vn.HEADER].includes(o)?{useHeaders:o===vn.HEADER,sessionId:s?.view_session_id,contentId:s?.video_id}:void 0,f=l.capLevelToPlayerSize==null?{capLevelController:y0}:{},_=new F({debug:i,startPosition:r,cmcd:h,xhrSetup:n((b,y)=>{var A,g;if(o&&o!==vn.QUERY)return;let w=new URL(y);if(!w.searchParams.has("CMCD"))return;let M=((g=(A=w.searchParams.get("CMCD"))==null?void 0:A.split(","))!=null?g:[]).filter(P=>P.startsWith("sid")||P.startsWith("cid")).join(",");w.searchParams.set("CMCD",M),b.open("GET",w)},"xhrSetup"),...f,...p,...v,...m,...l});return _.on(F.Events.MANIFEST_PARSED,async function(b,y){var A,g;let w=(A=y.sessionData)==null?void 0:A["com.apple.hls.chapters"];(w!=null&&w.URI||w!=null&&w.VALUE.toLocaleLowerCase().startsWith("http"))&&kc((g=w?.URI)!=null?g:w?.VALUE,e)}),_}},"Wt$1"),G0=n(t=>t===X.LIVE?{backBufferLength:8}:{},"Yt$1"),Q0=n(t=>{let{tokens:{drm:e}={},playbackId:i,drmTypeCb:a}=t,r=rd(i);return!e||!r?{}:{emeEnabled:!0,drmSystems:{"com.apple.fps":{licenseUrl:so(t,"fairplay"),serverCertificateUrl:pf(t,"fairplay")},"com.widevine.alpha":{licenseUrl:so(t,"widevine")},"com.microsoft.playready":{licenseUrl:so(t,"playready")}},requestMediaKeySystemAccessFunc:n((s,o)=>(s==="com.widevine.alpha"&&(o=[...o.map(l=>{var d;let u=(d=l.videoCapabilities)==null?void 0:d.map(p=>({...p,robustness:"HW_SECURE_ALL"}));return{...l,videoCapabilities:u}}),...o]),navigator.requestMediaKeySystemAccess(s,o).then(l=>{let d=T0(s);return a?.(d),l})),"requestMediaKeySystemAccessFunc")}},"Ft"),Z0=n(async t=>{let e=await fetch(t);return e.status!==200?Promise.reject(e):await e.arrayBuffer()},"$t$1"),j0=n(async(t,e)=>{let i=await fetch(e,{method:"POST",headers:{"Content-type":"application/octet-stream"},body:t});if(i.status!==200)return Promise.reject(i);let a=await i.arrayBuffer();return new Uint8Array(a)},"Bt$1"),z0=n((t,e)=>{ye(e,"encrypted",async i=>{try{let a=i.initDataType;if(a!=="skd")return;if(!e.mediaKeys){let d=await navigator.requestMediaKeySystemAccess("com.apple.fps",[{initDataTypes:[a],videoCapabilities:[{contentType:"application/vnd.apple.mpegurl",robustness:""}],distinctiveIdentifier:"not-allowed",persistentState:"not-allowed",sessionTypes:["temporary"]}]).then(p=>{var v;return(v=t.drmTypeCb)==null||v.call(t,no.FAIRPLAY),p}).catch(()=>{let p=x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),v=new L(p,L.MEDIA_ERR_ENCRYPTED,!0);v.errorCategory=ne.DRM,v.muxCode=N.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,ft(e,v)});if(!d)return;let u=await d.createMediaKeys();try{let p=await Z0(pf(t,"fairplay")).catch(v=>{if(v instanceof Response){let m=El(v,ne.DRM,t);return m?Promise.reject(m):Promise.reject(new Error("Unexpected error in app cert request"))}return Promise.reject(v)});await u.setServerCertificate(p).catch(()=>{let v=x("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."),m=new L(v,L.MEDIA_ERR_ENCRYPTED,!0);return m.errorCategory=ne.DRM,m.muxCode=N.ENCRYPTED_UPDATE_SERVER_CERT_FAILED,Promise.reject(m)})}catch(p){ft(e,p);return}await e.setMediaKeys(u)}let r=i.initData;if(r==null)return;let s=e.mediaKeys.createSession();s.addEventListener("keystatuseschange",()=>{s.keyStatuses.forEach(d=>{let u;if(d==="internal-error"){let p=x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");u=new L(p,L.MEDIA_ERR_ENCRYPTED,!0),u.errorCategory=ne.DRM,u.muxCode=N.ENCRYPTED_CDM_ERROR}else if(d==="output-restricted"||d==="output-downscaled"){let p=x("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");u=new L(p,L.MEDIA_ERR_ENCRYPTED,!1),u.errorCategory=ne.DRM,u.muxCode=N.ENCRYPTED_OUTPUT_RESTRICTED}u&&ft(e,u)})});let o=await Promise.all([s.generateRequest(a,r).catch(()=>{let d=x("Failed to generate a DRM license request. This may be an issue with the player or your protected content."),u=new L(d,L.MEDIA_ERR_ENCRYPTED,!0);u.errorCategory=ne.DRM,u.muxCode=N.ENCRYPTED_GENERATE_REQUEST_FAILED,ft(e,u)}),new Promise(d=>{s.addEventListener("message",u=>{d(u.message)},{once:!0})})]).then(([,d])=>d),l=await j0(o,so(t,"fairplay")).catch(d=>{if(d instanceof Response){let u=El(d,ne.DRM,t);return u?Promise.reject(u):Promise.reject(new Error("Unexpected error in license key request"))}return Promise.reject(d)});await s.update(l).catch(()=>{let d=x("Failed to update DRM license. This may be an issue with the player or your protected content."),u=new L(d,L.MEDIA_ERR_ENCRYPTED,!0);return u.errorCategory=ne.DRM,u.muxCode=N.ENCRYPTED_UPDATE_LICENSE_FAILED,Promise.reject(u)})}catch(a){ft(e,a);return}})},"jt"),so=n(({playbackId:t,tokens:{drm:e}={},customDomain:i=vi},a)=>{let r=rd(t);return`https://license.${i.toLocaleLowerCase().endsWith(vi)?i:vi}/license/${a}/${r}?token=${e}`},"G$1"),pf=n(({playbackId:t,tokens:{drm:e}={},customDomain:i=vi},a)=>{let r=rd(t);return`https://license.${i.toLocaleLowerCase().endsWith(vi)?i:vi}/appcert/${a}/${r}?token=${e}`},"et$1"),vf=n(({playbackId:t,src:e,customDomain:i})=>{if(t)return!0;if(typeof e!="string")return!1;let a=window?.location.href,r=new URL(e,a).hostname.toLocaleLowerCase();return r.includes(vi)||!!i&&r.includes(i.toLocaleLowerCase())},"tt$1"),X0=n((t,e,i)=>{var a;let{envKey:r,disableTracking:s,muxDataSDK:o=bc,muxDataSDKOptions:l={}}=t,d=vf(t);if(!s&&(r||d)){let{playerInitTime:u,playerSoftwareName:p,playerSoftwareVersion:v,beaconCollectionDomain:m,debug:h,disableCookies:f}=t,_={...t.metadata,video_title:((a=t?.metadata)==null?void 0:a.video_title)||void 0},b=n(y=>typeof y.player_error_code=="string"?!1:typeof t.errorTranslator=="function"?t.errorTranslator(y):y,"M");o.monitor(e,{debug:h,beaconCollectionDomain:m,hlsjs:i,Hls:i?F:void 0,automaticErrorTracking:!1,errorTranslator:b,disableCookies:f,...l,data:{...r?{env_key:r}:{},player_software_name:p,player_software:p,player_software_version:v,player_init_time:u,..._}})}},"Jt$1"),J0=n((t,e,i)=>{var a,r;let s=mf(t,e),{src:o,customDomain:l=vi}=t,d=n(()=>{e.ended||t.disablePseudoEnded||!cf(e,i)||(uf(e,i)?e.currentTime=e.buffered.end(e.buffered.length-1):e.dispatchEvent(new Event("ended")))},"a"),u,p,v=n(()=>{let m=Ic(e),h,f;m.length>0&&(h=m.start(0),f=m.end(0)),(p!==f||u!==h)&&e.dispatchEvent(new CustomEvent("seekablechange",{composed:!0})),u=h,p=f},"u");if(ye(e,"durationchange",v),e&&s){let m=ad(t);if(typeof o=="string"){if(o.endsWith(".mp4")&&o.includes(l)){let _=wc(o),b=new URL(`https://stream.${l}/${_}/metadata.json`);kc(b.toString(),e)}let h=n(()=>{if(Gd(e)!==X.LIVE||Number.isFinite(e.duration))return;let _=setInterval(v,1e3);e.addEventListener("teardown",()=>{clearInterval(_)},{once:!0}),ye(e,"durationchange",()=>{Number.isFinite(e.duration)&&clearInterval(_)})},"T"),f=n(async()=>C0(o,e,m).then(h).catch(_=>{if(_ instanceof Response){let b=El(_,ne.VIDEO,t);if(b){ft(e,b);return}}}),"m");if(e.preload==="none"){let _=n(()=>{f(),e.removeEventListener("loadedmetadata",b)},"R"),b=n(()=>{f(),e.removeEventListener("play",_)},"M");ye(e,"play",_,{once:!0}),ye(e,"loadedmetadata",b,{once:!0})}else f();(a=t.tokens)!=null&&a.drm?z0(t,e):ye(e,"encrypted",()=>{let _=x("Attempting to play DRM-protected content without providing a DRM token."),b=new L(_,L.MEDIA_ERR_ENCRYPTED,!0);b.errorCategory=ne.DRM,b.muxCode=N.ENCRYPTED_MISSING_TOKEN,ft(e,b)},{once:!0}),e.setAttribute("src",o),t.startTime&&(((r=pe.get(e))!=null?r:{}).startTime=t.startTime,e.addEventListener("durationchange",ff,{once:!0}))}else e.removeAttribute("src");e.addEventListener("error",Ef),e.addEventListener("error",Qd),e.addEventListener("emptied",()=>{e.querySelectorAll("track[data-removeondestroy]").forEach(h=>{h.remove()})},{once:!0}),ye(e,"pause",d),ye(e,"seeked",d),ye(e,"play",()=>{e.ended||df(e.currentTime,e.duration)&&(e.currentTime=e.seekable.length?e.seekable.start(0):0)})}else i&&o&&(i.once(F.Events.LEVEL_LOADED,(m,h)=>{D0(h.details,e,i),v(),Gd(e)===X.LIVE&&!Number.isFinite(e.duration)&&(i.on(F.Events.LEVEL_UPDATED,v),ye(e,"durationchange",()=>{Number.isFinite(e.duration)&&i.off(F.Events.LEVELS_UPDATED,v)}))}),i.on(F.Events.ERROR,(m,h)=>{var f,_;let b=e1(h,t);if(b.muxCode===N.NETWORK_NOT_READY){let y=(f=pe.get(e))!=null?f:{},A=(_=y.retryCount)!=null?_:0;if(A<6){let g=A===0?5e3:6e4,w=new L(`Retrying in ${g/1e3} seconds...`,b.code,b.fatal);Object.assign(w,b),ft(e,w),setTimeout(()=>{y.retryCount=A+1,h.details==="manifestLoadError"&&h.url&&i.loadSource(h.url)},g);return}else{y.retryCount=0;let g=new L('Try again later or <a href="#" onclick="window.location.reload(); return false;" style="color: #4a90e2;">click here to retry</a>',b.code,b.fatal);Object.assign(g,b),ft(e,g);return}}ft(e,b)}),i.on(F.Events.MANIFEST_LOADED,()=>{let m=pe.get(e);m&&m.error&&(m.error=null,m.retryCount=0,e.dispatchEvent(new Event("emptied")),e.dispatchEvent(new Event("loadstart")))}),e.addEventListener("error",Qd),ye(e,"waiting",d),d0(t,i),u0(e,i),i.attachMedia(e))},"Gt");function ff(t){var e;let i=t.target,a=(e=pe.get(i))==null?void 0:e.startTime;if(a&&zg(i.seekable,i.duration,a)){let r=i.preload==="auto";r&&(i.preload="none"),i.currentTime=a,r&&(i.preload="auto")}}n(ff,"rt$1");async function Ef(t){if(!t.isTrusted)return;t.stopImmediatePropagation();let e=t.target;if(!(e!=null&&e.error))return;let{message:i,code:a}=e.error,r=new L(i,a);if(e.src&&a===L.MEDIA_ERR_SRC_NOT_SUPPORTED&&e.readyState===HTMLMediaElement.HAVE_NOTHING){setTimeout(()=>{var s;let o=(s=lf(e))!=null?s:e.error;o?.code===L.MEDIA_ERR_SRC_NOT_SUPPORTED&&ft(e,r)},500);return}if(e.src&&(a!==L.MEDIA_ERR_DECODE||a!==void 0))try{let{status:s}=await fetch(e.src);r.data={response:{code:s}}}catch{}ft(e,r)}n(Ef,"nt$1");function ft(t,e){var i;e.fatal&&(((i=pe.get(t))!=null?i:{}).error=e,t.dispatchEvent(new CustomEvent("error",{detail:e})))}n(ft,"N$2");function Qd(t){var e,i;if(!(t instanceof CustomEvent)||!(t.detail instanceof L))return;let a=t.target,r=t.detail;!r||!r.fatal||(((e=pe.get(a))!=null?e:{}).error=r,(i=a.mux)==null||i.emit("error",{player_error_code:r.code,player_error_message:r.message,player_error_context:r.context}))}n(Qd,"ce");var e1=n((t,e)=>{var i,a,r;t.fatal||e.debug;let s={[F.ErrorTypes.NETWORK_ERROR]:L.MEDIA_ERR_NETWORK,[F.ErrorTypes.MEDIA_ERROR]:L.MEDIA_ERR_DECODE,[F.ErrorTypes.KEY_SYSTEM_ERROR]:L.MEDIA_ERR_ENCRYPTED},o=n(p=>[F.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,F.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED].includes(p.details)?L.MEDIA_ERR_NETWORK:s[p.type],"o"),l=n(p=>{if(p.type===F.ErrorTypes.KEY_SYSTEM_ERROR)return ne.DRM;if(p.type===F.ErrorTypes.NETWORK_ERROR)return ne.VIDEO},"s"),d,u=o(t);if(u===L.MEDIA_ERR_NETWORK&&t.response){let p=(i=l(t))!=null?i:ne.VIDEO;d=(a=El(t.response,p,e,t.fatal))!=null?a:new L("",u,t.fatal)}else if(u===L.MEDIA_ERR_ENCRYPTED)if(t.details===F.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE){let p=x("Attempting to play DRM-protected content without providing a DRM token.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ne.DRM,d.muxCode=N.ENCRYPTED_MISSING_TOKEN}else if(t.details===F.ErrorDetails.KEY_SYSTEM_NO_ACCESS){let p=x("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ne.DRM,d.muxCode=N.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM}else if(t.details===F.ErrorDetails.KEY_SYSTEM_NO_SESSION){let p=x("Failed to generate a DRM license request. This may be an issue with the player or your protected content.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,!0),d.errorCategory=ne.DRM,d.muxCode=N.ENCRYPTED_GENERATE_REQUEST_FAILED}else if(t.details===F.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED){let p=x("Failed to update DRM license. This may be an issue with the player or your protected content.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ne.DRM,d.muxCode=N.ENCRYPTED_UPDATE_LICENSE_FAILED}else if(t.details===F.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED){let p=x("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ne.DRM,d.muxCode=N.ENCRYPTED_UPDATE_SERVER_CERT_FAILED}else if(t.details===F.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR){let p=x("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ne.DRM,d.muxCode=N.ENCRYPTED_CDM_ERROR}else if(t.details===F.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED){let p=x("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,!1),d.errorCategory=ne.DRM,d.muxCode=N.ENCRYPTED_OUTPUT_RESTRICTED}else d=new L(t.error.message,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=ne.DRM,d.muxCode=N.ENCRYPTED_ERROR;else d=new L("",u,t.fatal);return d.context||(d.context=`${t.url?`url: ${t.url}
`:""}${t.response&&(t.response.code||t.response.text)?`response: ${t.response.code}, ${t.response.text}
`:""}${t.reason?`failure reason: ${t.reason}
`:""}${t.level?`level: ${t.level}
`:""}${t.parent?`parent stream controller: ${t.parent}
`:""}${t.buffer?`buffer length: ${t.buffer}
`:""}${t.error?`error: ${t.error}
`:""}${t.event?`event: ${t.event}
`:""}${t.err?`error message: ${(r=t.err)==null?void 0:r.message}
`:""}`),d.data=t,d},"qt$1"),bf=n(t=>{throw TypeError(t)},"C$1"),Cc=n((t,e,i)=>e.has(t)||bf("Cannot "+i),"N$1"),Pe=n((t,e,i)=>(Cc(t,e,"read from private field"),i?i.call(t):e.get(t)),"n$1"),gt=n((t,e,i)=>e.has(t)?bf("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"d$1"),mt=n((t,e,i,a)=>(Cc(t,e,"write to private field"),e.set(t,i),i),"o$2"),Bs=n((t,e,i)=>(Cc(t,e,"access private method"),i),"b$2"),t1=n(()=>{try{return"0.28.2"}catch{}return"UNKNOWN"},"B$1"),i1=t1(),a1=n(()=>i1,"P$2"),r1=`
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`,T={BEACON_COLLECTION_DOMAIN:"beacon-collection-domain",CUSTOM_DOMAIN:"custom-domain",DEBUG:"debug",DISABLE_TRACKING:"disable-tracking",DISABLE_COOKIES:"disable-cookies",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended",DRM_TOKEN:"drm-token",PLAYBACK_TOKEN:"playback-token",ENV_KEY:"env-key",MAX_RESOLUTION:"max-resolution",MIN_RESOLUTION:"min-resolution",RENDITION_ORDER:"rendition-order",PROGRAM_START_TIME:"program-start-time",PROGRAM_END_TIME:"program-end-time",ASSET_START_TIME:"asset-start-time",ASSET_END_TIME:"asset-end-time",METADATA_URL:"metadata-url",PLAYBACK_ID:"playback-id",PLAYER_SOFTWARE_NAME:"player-software-name",PLAYER_SOFTWARE_VERSION:"player-software-version",PLAYER_INIT_TIME:"player-init-time",PREFER_CMCD:"prefer-cmcd",PREFER_PLAYBACK:"prefer-playback",START_TIME:"start-time",STREAM_TYPE:"stream-type",TARGET_LIVE_WINDOW:"target-live-window",LIVE_EDGE_OFFSET:"live-edge-offset",TYPE:"type",LOGO:"logo"},n1=Object.values(T),dp=a1(),up="mux-video",Pt,fn,oo,En,lo,uo,co,ho,mo,bn,Pa,_n,_r,s1=(_r=class extends Us{constructor(){super(),gt(this,Pa),gt(this,Pt),gt(this,fn),gt(this,oo),gt(this,En,{}),gt(this,lo,{}),gt(this,uo),gt(this,co),gt(this,ho),gt(this,mo),gt(this,bn,""),mt(this,oo,Sc()),this.nativeEl.addEventListener("muxmetadata",e=>{var i;let a=B0(this.nativeEl),r=(i=this.metadata)!=null?i:{};this.metadata={...a,...r},a?.["com.mux.video.branding"]==="mux-free-plan"&&(mt(this,bn,"default"),this.updateLogo())})}static get NAME(){return up}static get VERSION(){return dp}static get observedAttributes(){var e;return[...n1,...(e=Us.observedAttributes)!=null?e:[]]}static getLogoHTML(e){return!e||e==="false"?"":e==="default"?r1:`<img part="logo" src="${e}" />`}static getTemplateHTML(e={}){var i;return`
      ${Us.getTemplateHTML(e)}
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
        ${this.getLogoHTML((i=e[T.LOGO])!=null?i:"")}
      </slot>
    `}get preferCmcd(){var e;return(e=this.getAttribute(T.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?Fd.includes(e)&&this.setAttribute(T.PREFER_CMCD,e):this.removeAttribute(T.PREFER_CMCD))}get playerInitTime(){return this.hasAttribute(T.PLAYER_INIT_TIME)?+this.getAttribute(T.PLAYER_INIT_TIME):Pe(this,oo)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(T.PLAYER_INIT_TIME):this.setAttribute(T.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=Pe(this,ho))!=null?e:up}set playerSoftwareName(e){mt(this,ho,e)}get playerSoftwareVersion(){var e;return(e=Pe(this,co))!=null?e:dp}set playerSoftwareVersion(e){mt(this,co,e)}get _hls(){var e;return(e=Pe(this,Pt))==null?void 0:e.engine}get mux(){var e;return(e=this.nativeEl)==null?void 0:e.mux}get error(){var e;return(e=lf(this.nativeEl))!=null?e:null}get errorTranslator(){return Pe(this,mo)}set errorTranslator(e){mt(this,mo,e)}get src(){return this.getAttribute("src")}set src(e){e!==this.src&&(e==null?this.removeAttribute("src"):this.setAttribute("src",e))}get type(){var e;return(e=this.getAttribute(T.TYPE))!=null?e:void 0}set type(e){e!==this.type&&(e?this.setAttribute(T.TYPE,e):this.removeAttribute(T.TYPE))}get preload(){let e=this.getAttribute("preload");return e===""?"auto":["none","metadata","auto"].includes(e)?e:super.preload}set preload(e){e!=this.getAttribute("preload")&&(["","none","metadata","auto"].includes(e)?this.setAttribute("preload",e):this.removeAttribute("preload"))}get debug(){return this.getAttribute(T.DEBUG)!=null}set debug(e){e!==this.debug&&(e?this.setAttribute(T.DEBUG,""):this.removeAttribute(T.DEBUG))}get disableTracking(){return this.hasAttribute(T.DISABLE_TRACKING)}set disableTracking(e){e!==this.disableTracking&&this.toggleAttribute(T.DISABLE_TRACKING,!!e)}get disableCookies(){return this.hasAttribute(T.DISABLE_COOKIES)}set disableCookies(e){e!==this.disableCookies&&(e?this.setAttribute(T.DISABLE_COOKIES,""):this.removeAttribute(T.DISABLE_COOKIES))}get disablePseudoEnded(){return this.hasAttribute(T.DISABLE_PSEUDO_ENDED)}set disablePseudoEnded(e){e!==this.disablePseudoEnded&&(e?this.setAttribute(T.DISABLE_PSEUDO_ENDED,""):this.removeAttribute(T.DISABLE_PSEUDO_ENDED))}get startTime(){let e=this.getAttribute(T.START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set startTime(e){e!==this.startTime&&(e==null?this.removeAttribute(T.START_TIME):this.setAttribute(T.START_TIME,`${e}`))}get playbackId(){var e;return this.hasAttribute(T.PLAYBACK_ID)?this.getAttribute(T.PLAYBACK_ID):(e=wc(this.src))!=null?e:void 0}set playbackId(e){e!==this.playbackId&&(e?this.setAttribute(T.PLAYBACK_ID,e):this.removeAttribute(T.PLAYBACK_ID))}get maxResolution(){var e;return(e=this.getAttribute(T.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(T.MAX_RESOLUTION,e):this.removeAttribute(T.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(T.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(T.MIN_RESOLUTION,e):this.removeAttribute(T.MIN_RESOLUTION))}get renditionOrder(){var e;return(e=this.getAttribute(T.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(T.RENDITION_ORDER,e):this.removeAttribute(T.RENDITION_ORDER))}get programStartTime(){let e=this.getAttribute(T.PROGRAM_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programStartTime(e){e==null?this.removeAttribute(T.PROGRAM_START_TIME):this.setAttribute(T.PROGRAM_START_TIME,`${e}`)}get programEndTime(){let e=this.getAttribute(T.PROGRAM_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programEndTime(e){e==null?this.removeAttribute(T.PROGRAM_END_TIME):this.setAttribute(T.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){let e=this.getAttribute(T.ASSET_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetStartTime(e){e==null?this.removeAttribute(T.ASSET_START_TIME):this.setAttribute(T.ASSET_START_TIME,`${e}`)}get assetEndTime(){let e=this.getAttribute(T.ASSET_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetEndTime(e){e==null?this.removeAttribute(T.ASSET_END_TIME):this.setAttribute(T.ASSET_END_TIME,`${e}`)}get customDomain(){var e;return(e=this.getAttribute(T.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(T.CUSTOM_DOMAIN,e):this.removeAttribute(T.CUSTOM_DOMAIN))}get drmToken(){var e;return(e=this.getAttribute(T.DRM_TOKEN))!=null?e:void 0}set drmToken(e){e!==this.drmToken&&(e?this.setAttribute(T.DRM_TOKEN,e):this.removeAttribute(T.DRM_TOKEN))}get playbackToken(){var e,i,a,r;if(this.hasAttribute(T.PLAYBACK_TOKEN))return(e=this.getAttribute(T.PLAYBACK_TOKEN))!=null?e:void 0;if(this.hasAttribute(T.PLAYBACK_ID)){let[,s]=gc((i=this.playbackId)!=null?i:"");return(a=new URLSearchParams(s).get("token"))!=null?a:void 0}if(this.src)return(r=new URLSearchParams(this.src).get("token"))!=null?r:void 0}set playbackToken(e){e!==this.playbackToken&&(e?this.setAttribute(T.PLAYBACK_TOKEN,e):this.removeAttribute(T.PLAYBACK_TOKEN))}get tokens(){let e=this.getAttribute(T.PLAYBACK_TOKEN),i=this.getAttribute(T.DRM_TOKEN);return{...Pe(this,lo),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{}}}set tokens(e){mt(this,lo,e??{})}get ended(){return cf(this.nativeEl,this._hls)}get envKey(){var e;return(e=this.getAttribute(T.ENV_KEY))!=null?e:void 0}set envKey(e){e!==this.envKey&&(e?this.setAttribute(T.ENV_KEY,e):this.removeAttribute(T.ENV_KEY))}get beaconCollectionDomain(){var e;return(e=this.getAttribute(T.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(T.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(T.BEACON_COLLECTION_DOMAIN))}get streamType(){var e;return(e=this.getAttribute(T.STREAM_TYPE))!=null?e:Gd(this.nativeEl)}set streamType(e){e!==this.streamType&&(e?this.setAttribute(T.STREAM_TYPE,e):this.removeAttribute(T.STREAM_TYPE))}get targetLiveWindow(){return this.hasAttribute(T.TARGET_LIVE_WINDOW)?+this.getAttribute(T.TARGET_LIVE_WINDOW):W0(this.nativeEl)}set targetLiveWindow(e){e!=this.targetLiveWindow&&(e==null?this.removeAttribute(T.TARGET_LIVE_WINDOW):this.setAttribute(T.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e,i;if(this.hasAttribute(T.LIVE_EDGE_OFFSET)){let{liveEdgeOffset:a}=this,r=(e=this.nativeEl.seekable.end(0))!=null?e:0,s=(i=this.nativeEl.seekable.start(0))!=null?i:0;return Math.max(s,r-a)}return F0(this.nativeEl)}get liveEdgeOffset(){if(this.hasAttribute(T.LIVE_EDGE_OFFSET))return+this.getAttribute(T.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){e!=this.liveEdgeOffset&&(e==null?this.removeAttribute(T.LIVE_EDGE_OFFSET):this.setAttribute(T.LIVE_EDGE_OFFSET,`${+e}`))}get seekable(){return Ic(this.nativeEl)}async addCuePoints(e){return ef(this.nativeEl,e)}get activeCuePoint(){return tf(this.nativeEl)}get cuePoints(){return h0(this.nativeEl)}async addChapters(e){return rf(this.nativeEl,e)}get activeChapter(){return nf(this.nativeEl)}get chapters(){return p0(this.nativeEl)}getStartDate(){return f0(this.nativeEl,this._hls)}get currentPdt(){return E0(this.nativeEl,this._hls)}get preferPlayback(){let e=this.getAttribute(T.PREFER_PLAYBACK);if(e===zt.MSE||e===zt.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===zt.MSE||e===zt.NATIVE?this.setAttribute(T.PREFER_PLAYBACK,e):this.removeAttribute(T.PREFER_PLAYBACK))}get metadata(){return{...this.getAttributeNames().filter(e=>e.startsWith("metadata-")&&![T.METADATA_URL].includes(e)).reduce((e,i)=>{let a=this.getAttribute(i);return a!=null&&(e[i.replace(/^metadata-/,"").replace(/-/g,"_")]=a),e},{}),...Pe(this,En)}}set metadata(e){mt(this,En,e??{}),this.mux&&this.mux.emit("hb",Pe(this,En))}get _hlsConfig(){return Pe(this,uo)}set _hlsConfig(e){mt(this,uo,e)}get logo(){var e;return(e=this.getAttribute(T.LOGO))!=null?e:Pe(this,bn)}set logo(e){e?this.setAttribute(T.LOGO,e):this.removeAttribute(T.LOGO)}load(){mt(this,Pt,q0(this,this.nativeEl,Pe(this,Pt)))}unload(){hf(this.nativeEl,Pe(this,Pt),this),mt(this,Pt,void 0)}attributeChangedCallback(e,i,a){var r,s;switch(Us.observedAttributes.includes(e)&&!["src","autoplay","preload"].includes(e)&&super.attributeChangedCallback(e,i,a),e){case T.PLAYER_SOFTWARE_NAME:this.playerSoftwareName=a??void 0;break;case T.PLAYER_SOFTWARE_VERSION:this.playerSoftwareVersion=a??void 0;break;case"src":{let o=!!i,l=!!a;!o&&l?Bs(this,Pa,_n).call(this):o&&!l?this.unload():o&&l&&(this.unload(),Bs(this,Pa,_n).call(this));break}case"autoplay":if(a===i)break;(r=Pe(this,Pt))==null||r.setAutoplay(this.autoplay);break;case"preload":if(a===i)break;(s=Pe(this,Pt))==null||s.setPreload(a);break;case T.PLAYBACK_ID:this.src=Yd(this);break;case T.DEBUG:{let o=this.debug;this.mux,this._hls&&(this._hls.config.debug=o);break}case T.METADATA_URL:a&&fetch(a).then(o=>o.json()).then(o=>this.metadata=o).catch(()=>{});break;case T.STREAM_TYPE:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}));break;case T.TARGET_LIVE_WINDOW:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0,detail:this.targetLiveWindow}));break;case T.LOGO:(a==null||a!==i)&&this.updateLogo();break;case T.DISABLE_TRACKING:{if(a==null||a!==i){let o=this.currentTime,l=this.paused;this.unload(),Bs(this,Pa,_n).call(this).then(()=>{this.currentTime=o,l||this.play()})}break}case T.DISABLE_COOKIES:{(a==null||a!==i)&&this.disableCookies&&document.cookie.split(";").forEach(o=>{o.trim().startsWith("muxData")&&(document.cookie=o.replace(/^ +/,"").replace(/=.*/,"=;expires="+new Date().toUTCString()+";path=/"))});break}}}updateLogo(){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelector('slot[name="logo"]');if(!e)return;let i=this.constructor.getLogoHTML(Pe(this,bn)||this.logo);e.innerHTML=i}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.nativeEl&&this.src&&!Pe(this,Pt)&&Bs(this,Pa,_n).call(this)}disconnectedCallback(){this.unload()}handleEvent(e){e.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(e.type,{composed:!0,detail:e.detail}))}},n(_r,"K"),_r);Pt=new WeakMap,fn=new WeakMap,oo=new WeakMap,En=new WeakMap,lo=new WeakMap,uo=new WeakMap,co=new WeakMap,ho=new WeakMap,mo=new WeakMap,bn=new WeakMap,Pa=new WeakSet,_n=n(async function(){Pe(this,fn)||(await mt(this,fn,Promise.resolve()),mt(this,fn,null),this.load())},"T$1");const pa=new WeakMap,fh=class fh extends Error{};n(fh,"InvalidStateError");let Un=fh;const Eh=class Eh extends Error{};n(Eh,"NotSupportedError");let Zd=Eh;const o1=["application/x-mpegURL","application/vnd.apple.mpegurl","audio/mpegurl"],l1=globalThis.WeakRef?class extends Set{add(t){super.add(new WeakRef(t))}forEach(t){super.forEach(e=>{const i=e.deref();i&&t(i)})}}:Set;function d1(t){globalThis.chrome?.cast?.isAvailable?globalThis.cast?.framework?t():customElements.whenDefined("google-cast-button").then(t):globalThis.__onGCastApiAvailable=()=>{customElements.whenDefined("google-cast-button").then(t)}}n(d1,"onCastApiAvailable");function u1(){return globalThis.chrome}n(u1,"requiresCastFramework");function c1(){const t="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";if(globalThis.chrome?.cast||document.querySelector(`script[src="${t}"]`))return;const e=document.createElement("script");e.src=t,document.head.append(e)}n(c1,"loadCastFramework");function Pi(){return globalThis.cast?.framework?.CastContext.getInstance()}n(Pi,"castContext");function Lc(){return Pi()?.getCurrentSession()}n(Lc,"currentSession");function Dc(){return Lc()?.getSessionObj().media[0]}n(Dc,"currentMedia");function h1(t){return new Promise((e,i)=>{Dc().editTracksInfo(t,e,i)})}n(h1,"editTracksInfo");function m1(t){return new Promise((e,i)=>{Dc().getStatus(t,e,i)})}n(m1,"getMediaStatus");function cp(t){return Pi().setOptions({..._f(),...t})}n(cp,"setCastOptions");function _f(){return{receiverApplicationId:"CC1AD845",autoJoinPolicy:"origin_scoped",androidReceiverCompatible:!1,language:"en-US",resumeSavedSession:!0}}n(_f,"getDefaultCastOptions");function p1(t){if(!t)return;const e=/\.([a-zA-Z0-9]+)(?:\?.*)?$/,i=t.match(e);return i?i[1]:null}n(p1,"getFormat");function v1(t){const e=t.split(`
`),i=[];for(let a=0;a<e.length;a++)if(e[a].trim().startsWith("#EXT-X-STREAM-INF")){const s=e[a+1]?e[a+1].trim():"";s&&!s.startsWith("#")&&i.push(s)}return i}n(v1,"parsePlaylistUrls");function f1(t){return t.split(`
`).find(a=>!a.trim().startsWith("#")&&a.trim()!=="")}n(f1,"parseSegment");async function E1(t){try{const i=(await fetch(t,{method:"HEAD"})).headers.get("Content-Type");return o1.some(a=>i===a)}catch{return!1}}n(E1,"isHls");async function b1(t){try{const e=await(await fetch(t)).text();let i=e;const a=v1(e);if(a.length>0){const o=new URL(a[0],t).toString();i=await(await fetch(o)).text()}const r=f1(i);return p1(r)}catch{return}}n(b1,"getPlaylistSegmentFormat");const po=new l1,gi=new WeakSet;let Re;d1(()=>{globalThis.chrome?.cast?.isAvailable&&(Re||(Re=cast.framework,Pi().addEventListener(Re.CastContextEventType.CAST_STATE_CHANGED,t=>{po.forEach(e=>pa.get(e).onCastStateChanged?.(t))}),Pi().addEventListener(Re.CastContextEventType.SESSION_STATE_CHANGED,t=>{po.forEach(e=>pa.get(e).onSessionStateChanged?.(t))}),po.forEach(t=>pa.get(t).init?.())))});let hp=0;var z,xs,at,hi,ha,ma,Ni,ed,se,Qi,gf,yf,zd,Tf,Xd,Af,Jd;const bh=class bh extends EventTarget{constructor(i){super();Fe(this,se);Fe(this,z);Fe(this,xs);Fe(this,at);Fe(this,hi);Fe(this,ha,"disconnected");Fe(this,ma,!1);Fe(this,Ni,new Set);Fe(this,ed,new WeakMap);dt(this,z,i),po.add(this),pa.set(this,{init:n(()=>ut(this,se,Xd).call(this),"init"),onCastStateChanged:n(()=>ut(this,se,zd).call(this),"onCastStateChanged"),onSessionStateChanged:n(()=>ut(this,se,Tf).call(this),"onSessionStateChanged"),getCastPlayer:n(()=>S(this,se,Qi),"getCastPlayer")}),ut(this,se,Xd).call(this)}get state(){return S(this,ha)}async watchAvailability(i){if(S(this,z).disableRemotePlayback)throw new Un("disableRemotePlayback attribute is present.");return S(this,ed).set(i,++hp),S(this,Ni).add(i),queueMicrotask(()=>i(ut(this,se,yf).call(this))),hp}async cancelWatchAvailability(i){if(S(this,z).disableRemotePlayback)throw new Un("disableRemotePlayback attribute is present.");i?S(this,Ni).delete(i):S(this,Ni).clear()}async prompt(){if(S(this,z).disableRemotePlayback)throw new Un("disableRemotePlayback attribute is present.");if(!globalThis.chrome?.cast?.isAvailable)throw new Zd("The RemotePlayback API is disabled on this platform.");const i=gi.has(S(this,z));gi.add(S(this,z)),cp(S(this,z).castOptions),Object.entries(S(this,hi)).forEach(([a,r])=>{S(this,at).controller.addEventListener(a,r)});try{await Pi().requestSession()}catch(a){if(i||gi.delete(S(this,z)),a==="cancel")return;throw new Error(a)}pa.get(S(this,z))?.loadOnPrompt?.()}};z=new WeakMap,xs=new WeakMap,at=new WeakMap,hi=new WeakMap,ha=new WeakMap,ma=new WeakMap,Ni=new WeakMap,ed=new WeakMap,se=new WeakSet,Qi=n(function(){if(gi.has(S(this,z)))return S(this,at)},"#castPlayer"),gf=n(function(){gi.has(S(this,z))&&(Object.entries(S(this,hi)).forEach(([i,a])=>{S(this,at).controller.removeEventListener(i,a)}),gi.delete(S(this,z)),S(this,z).muted=S(this,at).isMuted,S(this,z).currentTime=S(this,at).savedPlayerState.currentTime,S(this,at).savedPlayerState.isPaused===!1&&S(this,z).play())},"#disconnect"),yf=n(function(){const i=Pi()?.getCastState();return i&&i!=="NO_DEVICES_AVAILABLE"},"#hasDevicesAvailable"),zd=n(function(){const i=Pi().getCastState();if(gi.has(S(this,z))&&i==="CONNECTING"&&(dt(this,ha,"connecting"),this.dispatchEvent(new Event("connecting"))),!S(this,ma)&&i?.includes("CONNECT")){dt(this,ma,!0);for(let a of S(this,Ni))a(!0)}else if(S(this,ma)&&(!i||i==="NO_DEVICES_AVAILABLE")){dt(this,ma,!1);for(let a of S(this,Ni))a(!1)}},"#onCastStateChanged"),Tf=n(async function(){const{SESSION_RESUMED:i}=Re.SessionState;if(Pi().getSessionState()===i&&S(this,z).castSrc===Dc()?.media.contentId){gi.add(S(this,z)),Object.entries(S(this,hi)).forEach(([a,r])=>{S(this,at).controller.addEventListener(a,r)});try{await m1(new chrome.cast.media.GetStatusRequest)}catch{}S(this,hi)[Re.RemotePlayerEventType.IS_PAUSED_CHANGED](),S(this,hi)[Re.RemotePlayerEventType.PLAYER_STATE_CHANGED]()}},"#onSessionStateChanged"),Xd=n(function(){!Re||S(this,xs)||(dt(this,xs,!0),cp(S(this,z).castOptions),S(this,z).textTracks.addEventListener("change",()=>ut(this,se,Jd).call(this)),ut(this,se,zd).call(this),dt(this,at,new Re.RemotePlayer),new Re.RemotePlayerController(S(this,at)),dt(this,hi,{[Re.RemotePlayerEventType.IS_CONNECTED_CHANGED]:({value:i})=>{i===!0?(dt(this,ha,"connected"),this.dispatchEvent(new Event("connect"))):(ut(this,se,gf).call(this),dt(this,ha,"disconnected"),this.dispatchEvent(new Event("disconnect")))},[Re.RemotePlayerEventType.DURATION_CHANGED]:()=>{S(this,z).dispatchEvent(new Event("durationchange"))},[Re.RemotePlayerEventType.VOLUME_LEVEL_CHANGED]:()=>{S(this,z).dispatchEvent(new Event("volumechange"))},[Re.RemotePlayerEventType.IS_MUTED_CHANGED]:()=>{S(this,z).dispatchEvent(new Event("volumechange"))},[Re.RemotePlayerEventType.CURRENT_TIME_CHANGED]:()=>{S(this,se,Qi)?.isMediaLoaded&&S(this,z).dispatchEvent(new Event("timeupdate"))},[Re.RemotePlayerEventType.VIDEO_INFO_CHANGED]:()=>{S(this,z).dispatchEvent(new Event("resize"))},[Re.RemotePlayerEventType.IS_PAUSED_CHANGED]:()=>{S(this,z).dispatchEvent(new Event(this.paused?"pause":"play"))},[Re.RemotePlayerEventType.PLAYER_STATE_CHANGED]:()=>{S(this,se,Qi)?.playerState!==chrome.cast.media.PlayerState.PAUSED&&S(this,z).dispatchEvent(new Event({[chrome.cast.media.PlayerState.PLAYING]:"playing",[chrome.cast.media.PlayerState.BUFFERING]:"waiting",[chrome.cast.media.PlayerState.IDLE]:"emptied"}[S(this,se,Qi)?.playerState]))},[Re.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED]:async()=>{S(this,se,Qi)?.isMediaLoaded&&(await Promise.resolve(),ut(this,se,Af).call(this))}}))},"#init"),Af=n(function(){ut(this,se,Jd).call(this)},"#onRemoteMediaLoaded"),Jd=n(async function(){if(!S(this,se,Qi))return;const a=(S(this,at).mediaInfo?.tracks??[]).filter(({type:m})=>m===chrome.cast.media.TrackType.TEXT),r=[...S(this,z).textTracks].filter(({kind:m})=>m==="subtitles"||m==="captions"),s=a.map(({language:m,name:h,trackId:f})=>{const{mode:_}=r.find(b=>b.language===m&&b.label===h)??{};return _?{mode:_,trackId:f}:!1}).filter(Boolean),l=s.filter(({mode:m})=>m!=="showing").map(({trackId:m})=>m),d=s.find(({mode:m})=>m==="showing"),u=Lc()?.getSessionObj().media[0]?.activeTrackIds??[];let p=u;if(u.length&&(p=p.filter(m=>!l.includes(m))),d?.trackId&&(p=[...p,d.trackId]),p=[...new Set(p)],!n((m,h)=>m.length===h.length&&m.every(f=>h.includes(f)),"arrayEquals")(u,p))try{const m=new chrome.cast.media.EditTracksInfoRequest(p);await h1(m)}catch{}},"#updateRemoteTextTrack"),n(bh,"RemotePlayback");let jd=bh;const _1=n(t=>{var e,i,a,r,s,o,Y,kf;return e=class extends t{constructor(){super(...arguments);Fe(this,o);Fe(this,i,{paused:!1});Fe(this,a,_f());Fe(this,r);Fe(this,s)}get remote(){return S(this,s)?S(this,s):u1()?(this.disableRemotePlayback||c1(),pa.set(this,{loadOnPrompt:n(()=>ut(this,o,kf).call(this),"loadOnPrompt")}),dt(this,s,new jd(this))):super.remote}attributeChangedCallback(v,m,h){if(super.attributeChangedCallback(v,m,h),v==="cast-receiver"&&h){S(this,a).receiverApplicationId=h;return}if(S(this,o,Y))switch(v){case"cast-stream-type":case"cast-src":this.load();break}}async load(){if(!S(this,o,Y))return super.load();const v=new chrome.cast.media.MediaInfo(this.castSrc,this.castContentType);v.customData=this.castCustomData;const m=[...this.querySelectorAll("track")].filter(({kind:b,src:y})=>y&&(b==="subtitles"||b==="captions")),h=[];let f=0;if(m.length&&(v.tracks=m.map(b=>{const y=++f;h.length===0&&b.track.mode==="showing"&&h.push(y);const A=new chrome.cast.media.Track(y,chrome.cast.media.TrackType.TEXT);return A.trackContentId=b.src,A.trackContentType="text/vtt",A.subtype=b.kind==="captions"?chrome.cast.media.TextTrackType.CAPTIONS:chrome.cast.media.TextTrackType.SUBTITLES,A.name=b.label,A.language=b.srclang,A})),this.castStreamType==="live"?v.streamType=chrome.cast.media.StreamType.LIVE:v.streamType=chrome.cast.media.StreamType.BUFFERED,v.metadata=new chrome.cast.media.GenericMediaMetadata,v.metadata.title=this.title,v.metadata.images=[{url:this.poster}],E1(this.castSrc)){const b=await b1(this.castSrc);b?.includes("m4s")||b?.includes("mp4")?(v.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.FMP4,v.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.FMP4):b?.includes("ts")&&(v.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.TS,v.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.TS)}const _=new chrome.cast.media.LoadRequest(v);_.currentTime=super.currentTime??0,_.autoplay=!S(this,i).paused,_.activeTrackIds=h,await Lc()?.loadMedia(_),this.dispatchEvent(new Event("volumechange"))}play(){if(S(this,o,Y)){S(this,o,Y).isPaused&&S(this,o,Y).controller?.playOrPause();return}return super.play()}pause(){if(S(this,o,Y)){S(this,o,Y).isPaused||S(this,o,Y).controller?.playOrPause();return}super.pause()}get castOptions(){return S(this,a)}get castReceiver(){return this.getAttribute("cast-receiver")??void 0}set castReceiver(v){this.castReceiver!=v&&this.setAttribute("cast-receiver",`${v}`)}get castSrc(){return this.getAttribute("cast-src")??this.querySelector("source")?.src??this.currentSrc}set castSrc(v){this.castSrc!=v&&this.setAttribute("cast-src",`${v}`)}get castContentType(){return this.getAttribute("cast-content-type")??void 0}set castContentType(v){this.setAttribute("cast-content-type",`${v}`)}get castStreamType(){return this.getAttribute("cast-stream-type")??this.streamType??void 0}set castStreamType(v){this.setAttribute("cast-stream-type",`${v}`)}get castCustomData(){return S(this,r)}set castCustomData(v){const m=typeof v;["object","undefined"].includes(m)&&dt(this,r,v)}get readyState(){if(S(this,o,Y))switch(S(this,o,Y).playerState){case chrome.cast.media.PlayerState.IDLE:return 0;case chrome.cast.media.PlayerState.BUFFERING:return 2;default:return 3}return super.readyState}get paused(){return S(this,o,Y)?S(this,o,Y).isPaused:super.paused}get muted(){return S(this,o,Y)?S(this,o,Y)?.isMuted:super.muted}set muted(v){if(S(this,o,Y)){(v&&!S(this,o,Y).isMuted||!v&&S(this,o,Y).isMuted)&&S(this,o,Y).controller?.muteOrUnmute();return}super.muted=v}get volume(){return S(this,o,Y)?S(this,o,Y)?.volumeLevel??1:super.volume}set volume(v){if(S(this,o,Y)){S(this,o,Y).volumeLevel=+v,S(this,o,Y).controller?.setVolumeLevel();return}super.volume=v}get duration(){return S(this,o,Y)&&S(this,o,Y)?.isMediaLoaded?S(this,o,Y)?.duration??NaN:super.duration}get currentTime(){return S(this,o,Y)&&S(this,o,Y)?.isMediaLoaded?S(this,o,Y)?.currentTime??0:super.currentTime}set currentTime(v){if(S(this,o,Y)){S(this,o,Y).currentTime=v,S(this,o,Y).controller?.seek();return}super.currentTime=v}},i=new WeakMap,a=new WeakMap,r=new WeakMap,s=new WeakMap,o=new WeakSet,Y=n(function(){return pa.get(this.remote)?.getCastPlayer?.()},"#castPlayer"),kf=n(async function(){S(this,i).paused=$s(e.prototype,this,"paused"),$s(e.prototype,this,"pause").call(this),this.muted=$s(e.prototype,this,"muted");try{await this.load()}catch{}},"#loadOnPrompt"),n(e,"CastableMedia"),Wm(e,"observedAttributes",[...t.observedAttributes??[],"cast-src","cast-content-type","cast-stream-type","cast-receiver"]),e},"CastableMediaMixin");var Sf=n(t=>{throw TypeError(t)},"f$1"),wf=n((t,e,i)=>e.has(t)||Sf("Cannot "+i),"g$2"),g1=n((t,e,i)=>(wf(t,e,"read from private field"),i?i.call(t):e.get(t)),"u$2"),y1=n((t,e,i)=>e.has(t)?Sf("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"m$1"),T1=n((t,e,i,a)=>(wf(t,e,"write to private field"),e.set(t,i),i),"d"),gr,If=(gr=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}},n(gr,"s"),gr);if(typeof DocumentFragment>"u"){const e=class e extends If{};n(e,"e");let t=e;globalThis.DocumentFragment=t}var yr,A1=(yr=class extends If{},n(yr,"n"),yr),k1={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(A1)}},S1={customElements:k1},w1=typeof window>"u"||typeof globalThis.customElements>"u",Td=w1?S1:globalThis,vo,Tr,mp=(Tr=class extends _1(xb(s1)){constructor(){super(...arguments),y1(this,vo)}get autoplay(){let e=this.getAttribute("autoplay");return e===null?!1:e===""?!0:e}set autoplay(e){let i=this.autoplay;e!==i&&(e?this.setAttribute("autoplay",typeof e=="string"?e:""):this.removeAttribute("autoplay"))}get muxCastCustomData(){return{mux:{playbackId:this.playbackId,minResolution:this.minResolution,maxResolution:this.maxResolution,renditionOrder:this.renditionOrder,customDomain:this.customDomain,tokens:{drm:this.drmToken},envKey:this.envKey,metadata:this.metadata,disableCookies:this.disableCookies,disableTracking:this.disableTracking,beaconCollectionDomain:this.beaconCollectionDomain,startTime:this.startTime,preferCmcd:this.preferCmcd}}}get castCustomData(){var e;return(e=g1(this,vo))!=null?e:this.muxCastCustomData}set castCustomData(e){T1(this,vo,e)}},n(Tr,"i"),Tr);vo=new WeakMap;Td.customElements.get("mux-video")||(Td.customElements.define("mux-video",mp),Td.MuxVideoElement=mp);const C={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},Q={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},Rf={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},Cf=Object.entries(Rf),c=Cf.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),I1={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},Ei=Cf.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...I1});Object.entries(Ei).reduce((t,[e,i])=>{const a=c[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const R1=Object.entries(c).reduce((t,[e,i])=>{const a=Ei[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),ei={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},ur={DISABLED:"disabled",SHOWING:"showing"},Ad={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},Je={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},ui={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},C1={FULLSCREEN:"fullscreen"};function L1(t){return t?.map(M1).join(" ")}n(L1,"stringifyRenditionList");function D1(t){return t?.split(/\s+/).map(x1)}n(D1,"parseRenditionList");function M1(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}n(M1,"stringifyRendition");function x1(t){if(t){const[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}n(x1,"parseRendition");function O1(t){return t?.map(P1).join(" ")}n(O1,"stringifyAudioTrackList");function N1(t){return t?.split(/\s+/).map($1)}n(N1,"parseAudioTrackList");function P1(t){if(t){const{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(s=>s!=null).join(":")}}n(P1,"stringifyAudioTrack");function $1(t){if(t){const[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}n($1,"parseAudioTrack");function U1(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}n(U1,"camelCase");function Mc(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}n(Mc,"isValidNumber");function Lf(t){return typeof t!="string"?!1:!isNaN(t)&&!isNaN(parseFloat(t))}n(Lf,"isNumericString");const Df=n(t=>new Promise(e=>setTimeout(e,t)),"delay"),pp=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],H1=n((t,e)=>{const i=t===1?pp[e].singular:pp[e].plural;return`${t} ${i}`},"toTimeUnitPhrase"),Hn=n(t=>{if(!Mc(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0);return`${[a.getHours(),a.getMinutes(),a.getSeconds()].map((l,d)=>l&&H1(l,d)).filter(l=>l).join(", ")}${i?" remaining":""}`},"formatAsTimePhrase");function Ui(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),s=Math.floor(t/3600);const o=Math.floor(e/60%60),l=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(s=r=a="0"),s=s>0||l>0?s+":":"",r=((s||o>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+s+r+a}n(Ui,"formatTime");const B1={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it."};var vp;const kd={en:B1};let eu=((vp=globalThis.navigator)==null?void 0:vp.language)||"en";const W1=n(t=>{eu=t},"setLanguage"),F1=n(t=>{var e,i,a;const[r]=eu.split("-");return((e=kd[eu])==null?void 0:e[t])||((i=kd[r])==null?void 0:i[t])||((a=kd.en)==null?void 0:a[t])||t},"resolveTranslation"),D=n((t,e={})=>F1(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),"t");var Ar;let Mf=(Ar=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},n(Ar,"EventTarget"),Ar);const _h=class _h extends Mf{};n(_h,"Node");let bl=_h;var kr;let fp=(kr=class extends bl{constructor(){super(...arguments),this.role=null}},n(kr,"Element"),kr);const gh=class gh{observe(){}unobserve(){}disconnect(){}};n(gh,"ResizeObserver");let tu=gh;const xf={createElement:n(function(){return new jn.HTMLElement},"createElement"),createElementNS:n(function(){return new jn.HTMLElement},"createElementNS"),addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}};var Sr,wr,Ir;const jn={ResizeObserver:tu,document:xf,Node:bl,Element:fp,HTMLElement:(Sr=class extends fp{constructor(){super(...arguments),this.innerHTML=""}get content(){return new jn.DocumentFragment}},n(Sr,"HTMLElement"),Sr),DocumentFragment:(wr=class extends Mf{},n(wr,"DocumentFragment"),wr),customElements:{get:n(function(){},"get"),define:n(function(){},"define"),whenDefined:n(function(){},"whenDefined")},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:n(function(){},"CustomEvent"),getComputedStyle:n(function(){},"getComputedStyle"),navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:(Ir=class{parseFromString(e,i){return{body:{textContent:e}}}},n(Ir,"DOMParser"),Ir)},Of="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",Nf=Object.keys(jn).every(t=>t in globalThis),E=Of&&!Nf?jn:globalThis,Se=Of&&!Nf?xf:globalThis.document,Ep=new WeakMap,xc=n(t=>{let e=Ep.get(t);return e||Ep.set(t,e=new Set),e},"getCallbacks"),Pf=new E.ResizeObserver(t=>{for(const e of t)for(const i of xc(e.target))i(e)});function Br(t,e){xc(t).add(e),Pf.observe(t)}n(Br,"observeResize");function Wr(t,e){const i=xc(t);i.delete(e),i.size||Pf.unobserve(t)}n(Wr,"unobserveResize");function ot(t){const e={};for(const i of t)e[i.name]=i.value;return e}n(ot,"namedNodeMapToObject");function qe(t){var e;return(e=iu(t))!=null?e:en(t,"media-controller")}n(qe,"getMediaController");function iu(t){var e;const{MEDIA_CONTROLLER:i}=Q,a=t.getAttribute(i);if(a)return(e=nd(t))==null?void 0:e.getElementById(a)}n(iu,"getAttributeMediaController");const $f=n((t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},"updateIconText"),K1=n((t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},"getAllSlotted"),Uf=n((t,e)=>K1(t,e)[0],"getSlotted"),_i=n((t,e)=>!t||!e?!1:t?.contains(e)?!0:_i(t,e.getRootNode().host),"containsComposedNode"),en=n((t,e)=>{if(!t)return null;const i=t.closest(e);return i||en(t.getRootNode().host,e)},"closestComposedNode");function Oc(t=document){var e;const i=t?.activeElement;return i?(e=Oc(i.shadowRoot))!=null?e:i:null}n(Oc,"getActiveElement");function nd(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}n(nd,"getDocumentOrShadowRoot");function Hf(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){const s=getComputedStyle(r);if(i&&s.opacity==="0"||a&&s.visibility==="hidden"||s.display==="none")return!1;r=r.parentElement,e--}return!0}n(Hf,"isElementVisible");function V1(t,e,i,a){const r=a.x-i.x,s=a.y-i.y,o=r*r+s*s;if(o===0)return 0;const l=((t-i.x)*r+(e-i.y)*s)/o;return Math.max(0,Math.min(1,l))}n(V1,"getPointProgressOnLine");function Ce(t,e){const i=q1(t,a=>a===e);return i||Nc(t,e)}n(Ce,"getOrInsertCSSRule");function q1(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let s;try{s=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(const o of s??[])if(e(o.selectorText))return o}}n(q1,"getCSSRule");function Nc(t,e){var i,a;const r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],s=r?.[r.length-1];return s?.sheet?(s?.sheet.insertRule(`${e}{}`,s.sheet.cssRules.length),(a=s.sheet.cssRules)==null?void 0:a[s.sheet.cssRules.length-1]):{style:{setProperty:n(()=>{},"setProperty"),removeProperty:n(()=>"","removeProperty"),getPropertyValue:n(()=>"","getPropertyValue")}}}n(Nc,"insertCSSRule");function oe(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}n(oe,"getNumericAttr");function ve(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}oe(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}n(ve,"setNumericAttr");function K(t,e){return t.hasAttribute(e)}n(K,"getBooleanAttr");function V(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}K(t,e)!=i&&t.toggleAttribute(e,i)}n(V,"setBooleanAttr");function le(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}n(le,"getStringAttr");function de(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;le(t,e,void 0)!==a&&t.setAttribute(e,a)}n(de,"setStringAttr");var Bf=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$t"),yi=n((t,e,i)=>(Bf(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$t"),Y1=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$t"),Ws=n((t,e,i,a)=>(Bf(t,e,"write to private field"),e.set(t,i),i),"__privateSet$q"),Ke;function G1(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}n(G1,"getTemplateHTML$i");const yh=class yh extends E.HTMLElement{constructor(){if(super(),Y1(this,Ke,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,c.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Q.MEDIA_CONTROLLER&&(i&&((s=(r=yi(this,Ke))==null?void 0:r.unassociateElement)==null||s.call(r,this),Ws(this,Ke,null)),a&&this.isConnected&&(Ws(this,Ke,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=yi(this,Ke))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a,r;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),Ws(this,Ke,Q1(this)),this.getAttribute(Q.MEDIA_CONTROLLER)&&((i=(e=yi(this,Ke))==null?void 0:e.associateElement)==null||i.call(e,this)),(a=yi(this,Ke))==null||a.addEventListener("pointerdown",this),(r=yi(this,Ke))==null||r.addEventListener("click",this)}disconnectedCallback(){var e,i,a,r;this.getAttribute(Q.MEDIA_CONTROLLER)&&((i=(e=yi(this,Ke))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=yi(this,Ke))==null||a.removeEventListener("pointerdown",this),(r=yi(this,Ke))==null||r.removeEventListener("click",this),Ws(this,Ke,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:s,clientY:o}=e,{left:l,top:d,width:u,height:p}=this.getBoundingClientRect(),v=s-l,m=o-d;if(v<0||m<0||v>u||m>p||u===0&&p===0)return;const h=this._pointerType||"mouse";if(this._pointerType=void 0,h===Ad.TOUCH){this.handleTap(e);return}else if(h===Ad.MOUSE||h===Ad.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return K(this,c.MEDIA_PAUSED)}set mediaPaused(e){V(this,c.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?C.MEDIA_PLAY_REQUEST:C.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new E.CustomEvent(i,{composed:!0,bubbles:!0}))}};n(yh,"MediaGestureReceiver");let Fr=yh;Ke=new WeakMap;Fr.shadowRootOptions={mode:"open"};Fr.getTemplateHTML=G1;function Q1(t){var e;const i=t.getAttribute(Q.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):en(t,"media-controller")}n(Q1,"getMediaControllerEl");E.customElements.get("media-gesture-receiver")||E.customElements.define("media-gesture-receiver",Fr);var bp=Fr,Pc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$s"),rt=n((t,e,i)=>(Pc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$s"),et=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$s"),Zi=n((t,e,i,a)=>(Pc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$p"),Et=n((t,e,i)=>(Pc(t,e,"access private method"),i),"__privateMethod$d"),_l,$a,zn,rr,fo,au,Wf,gn,Eo,ru,Ff,nu,Kf,Xn,sd,od,$c,Kr,Jn;const O={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function Z1(t){return`
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

      :host(:not([${O.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
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

      
      :host([${O.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${O.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${O.AUDIO}])[${O.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${O.AUDIO}])[${O.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${O.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${O.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${O.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
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

      
      :host(:not([${O.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${O.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${O.USER_INACTIVE}]:not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_AIRPLAYING}]):not([${c.MEDIA_IS_CASTING}]):not([${O.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${O.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${O.USER_INACTIVE}]:not([${O.NO_AUTOHIDE}]):not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_CASTING}]):not([${O.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${O.USER_INACTIVE}][${O.AUTOHIDE_OVER_CONTROLS}]:not([${O.NO_AUTOHIDE}]):not([${c.MEDIA_PAUSED}]):not([${c.MEDIA_IS_CASTING}]):not([${O.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${O.AUDIO}])[${c.MEDIA_HAS_PLAYED}]) slot[name=poster] {
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
        <template shadowrootmode="${bp.shadowRootOptions.mode}">
          ${bp.getTemplateHTML({})}
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
  `}n(Z1,"getTemplateHTML$h");const j1=Object.values(c),z1="sm:384 md:576 lg:768 xl:960";function X1(t){Vf(t.target,t.contentRect.width)}n(X1,"resizeCallback");function Vf(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute(O.BREAKPOINTS))!=null?i:z1,r=J1(a),s=ey(r,e);let o=!1;if(Object.keys(r).forEach(l=>{if(s.includes(l)){t.hasAttribute(`breakpoint${l}`)||(t.setAttribute(`breakpoint${l}`,""),o=!0);return}t.hasAttribute(`breakpoint${l}`)&&(t.removeAttribute(`breakpoint${l}`),o=!0)}),o){const l=new CustomEvent(Ei.BREAKPOINTS_CHANGE,{detail:s});t.dispatchEvent(l)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(Ei.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}n(Vf,"setBreakpoints");function J1(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}n(J1,"createBreakpointMap");function ey(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}n(ey,"getBreakpoints");const Th=class Th extends E.HTMLElement{constructor(){if(super(),et(this,au),et(this,ru),et(this,nu),et(this,Xn),et(this,od),et(this,Kr),et(this,_l,0),et(this,$a,null),et(this,zn,null),et(this,rr,void 0),this.breakpointsComputed=!1,et(this,fo,new MutationObserver(Et(this,au,Wf).bind(this))),et(this,gn,!1),et(this,Eo,i=>{rt(this,gn)||(setTimeout(()=>{X1(i),Zi(this,gn,!1)},0),Zi(this,gn,!0))}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const i=ot(this.attributes),a=this.constructor.getTemplateHTML(i);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(a):this.shadowRoot.innerHTML=a}const e=this.querySelector(":scope > slot[slot=media]");e&&e.addEventListener("slotchange",()=>{if(!e.assignedElements({flatten:!0}).length){rt(this,$a)&&this.mediaUnsetCallback(rt(this,$a));return}this.handleMediaUpdated(this.media)})}static get observedAttributes(){return[O.AUTOHIDE,O.GESTURES_DISABLED].concat(j1).filter(e=>![c.MEDIA_RENDITION_LIST,c.MEDIA_AUDIO_TRACK_LIST,c.MEDIA_CHAPTERS_CUES,c.MEDIA_WIDTH,c.MEDIA_HEIGHT,c.MEDIA_ERROR,c.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==O.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Zi(this,$a,e),e.localName.includes("-")&&await E.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;rt(this,fo).observe(this,{childList:!0,subtree:!0}),Br(this,rt(this,Eo));const i=this.getAttribute(O.AUDIO)!=null,a=D(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute(O.USER_INACTIVE,""),Vf(this,this.getBoundingClientRect().width),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=E.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;rt(this,fo).disconnect(),Wr(this,rt(this,Eo)),this.media&&this.mediaUnsetCallback(this.media),(e=E.window)==null||e.removeEventListener("mouseup",this)}mediaSetCallback(e){}mediaUnsetCallback(e){Zi(this,$a,null)}handleEvent(e){switch(e.type){case"pointerdown":Zi(this,_l,e.timeStamp);break;case"pointermove":Et(this,ru,Ff).call(this,e);break;case"pointerup":Et(this,nu,Kf).call(this,e);break;case"mouseleave":Et(this,Xn,sd).call(this);break;case"mouseup":this.removeAttribute(O.KEYBOARD_CONTROL);break;case"keyup":Et(this,Kr,Jn).call(this),this.setAttribute(O.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);Zi(this,rr,isNaN(i)?0:i)}get autohide(){return(rt(this,rr)===void 0?2:rt(this,rr)).toString()}get breakpoints(){return le(this,O.BREAKPOINTS)}set breakpoints(e){de(this,O.BREAKPOINTS,e)}get audio(){return K(this,O.AUDIO)}set audio(e){V(this,O.AUDIO,e)}get gesturesDisabled(){return K(this,O.GESTURES_DISABLED)}set gesturesDisabled(e){V(this,O.GESTURES_DISABLED,e)}get keyboardControl(){return K(this,O.KEYBOARD_CONTROL)}set keyboardControl(e){V(this,O.KEYBOARD_CONTROL,e)}get noAutohide(){return K(this,O.NO_AUTOHIDE)}set noAutohide(e){V(this,O.NO_AUTOHIDE,e)}get autohideOverControls(){return K(this,O.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){V(this,O.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return K(this,O.USER_INACTIVE)}set userInteractive(e){V(this,O.USER_INACTIVE,e)}};n(Th,"MediaContainer");let Vr=Th;_l=new WeakMap;$a=new WeakMap;zn=new WeakMap;rr=new WeakMap;fo=new WeakMap;au=new WeakSet;Wf=n(function(t){const e=this.media;for(const i of t){if(i.type!=="childList")continue;const a=i.removedNodes;for(const r of a){if(r.slot!="media"||i.target!=this)continue;let s=i.previousSibling&&i.previousSibling.previousElementSibling;if(!s||!e)this.mediaUnsetCallback(r);else{let o=s.slot!=="media";for(;(s=s.previousSibling)!==null;)s.slot=="media"&&(o=!1);o&&this.mediaUnsetCallback(r)}}if(e)for(const r of i.addedNodes)r===e&&this.handleMediaUpdated(e)}},"handleMutation_fn");gn=new WeakMap;Eo=new WeakMap;ru=new WeakSet;Ff=n(function(t){if(t.pointerType!=="mouse"&&t.timeStamp-rt(this,_l)<250)return;Et(this,od,$c).call(this),clearTimeout(rt(this,zn));const e=this.hasAttribute(O.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&Et(this,Kr,Jn).call(this)},"handlePointerMove_fn$2");nu=new WeakSet;Kf=n(function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute(O.USER_INACTIVE);[this,this.media].includes(t.target)&&e?Et(this,Xn,sd).call(this):Et(this,Kr,Jn).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&Et(this,Kr,Jn).call(this)},"handlePointerUp_fn$1");Xn=new WeakSet;sd=n(function(){if(rt(this,rr)<0||this.hasAttribute(O.USER_INACTIVE))return;this.setAttribute(O.USER_INACTIVE,"");const t=new E.CustomEvent(Ei.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)},"setInactive_fn");od=new WeakSet;$c=n(function(){if(!this.hasAttribute(O.USER_INACTIVE))return;this.removeAttribute(O.USER_INACTIVE);const t=new E.CustomEvent(Ei.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)},"setActive_fn");Kr=new WeakSet;Jn=n(function(){Et(this,od,$c).call(this),clearTimeout(rt(this,zn));const t=parseInt(this.autohide);t<0||Zi(this,zn,setTimeout(()=>{Et(this,Xn,sd).call(this)},t*1e3))},"scheduleInactive_fn");Vr.shadowRootOptions={mode:"open"};Vr.getTemplateHTML=Z1;E.customElements.get("media-container")||E.customElements.define("media-container",Vr);var qf=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$r"),xe=n((t,e,i)=>(qf(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$r"),nn=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$r"),Fs=n((t,e,i,a)=>(qf(t,e,"write to private field"),e.set(t,i),i),"__privateSet$o"),Ua,Ha,gl,oa,oi,Si;const Ah=class Ah{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){nn(this,oi),nn(this,Ua,void 0),nn(this,Ha,void 0),nn(this,gl,void 0),nn(this,oa,new Set),Fs(this,Ua,e),Fs(this,Ha,i),Fs(this,gl,new Set(a))}[Symbol.iterator](){return xe(this,oi,Si).values()}get length(){return xe(this,oi,Si).size}get value(){var e;return(e=[...xe(this,oi,Si)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Fs(this,oa,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...xe(this,oi,Si)][e]}values(){return xe(this,oi,Si).values()}forEach(e,i){xe(this,oi,Si).forEach(e,i)}add(...e){var i,a;e.forEach(r=>xe(this,oa).add(r)),!(this.value===""&&!((i=xe(this,Ua))!=null&&i.hasAttribute(`${xe(this,Ha)}`)))&&((a=xe(this,Ua))==null||a.setAttribute(`${xe(this,Ha)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>xe(this,oa).delete(a)),(i=xe(this,Ua))==null||i.setAttribute(`${xe(this,Ha)}`,`${this.value}`)}contains(e){return xe(this,oi,Si).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}};n(Ah,"AttributeTokenList");let es=Ah;Ua=new WeakMap;Ha=new WeakMap;gl=new WeakMap;oa=new WeakMap;oi=new WeakSet;Si=n(function(){return xe(this,oa).size?xe(this,oa):xe(this,gl)},"tokens_get");const ty=n((t="")=>t.split(/\s+/),"splitTextTracksStr"),Yf=n((t="")=>{const[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?ei.CAPTIONS:ei.SUBTITLES,language:i,label:r}},"parseTextTrackStr"),ld=n((t="",e={})=>ty(t).map(i=>{const a=Yf(i);return{...e,...a}}),"parseTextTracksStr"),Gf=n(t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?Yf(e):e):typeof t=="string"?ld(t):[t]:[],"parseTracks"),su=n(({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,"formatTextTrackObj"),ts=n((t=[])=>Array.prototype.map.call(t,su).join(" "),"stringifyTextTrackList"),iy=n((t,e)=>i=>i[t]===e,"isMatchingPropOf"),Qf=n(t=>{const e=Object.entries(t).map(([i,a])=>iy(i,a));return i=>e.every(a=>a(i))},"textTrackObjAsPred"),Bn=n((t,e=[],i=[])=>{const a=Gf(i).map(Qf),r=n(s=>a.some(o=>o(s)),"isTrackToUpdate");Array.from(e).filter(r).forEach(s=>{s.mode=t})},"updateTracksModeTo"),dd=n((t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:Qf(e);return Array.from(t.textTracks).filter(i)},"getTextTracksList"),Zf=n(t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(c.MEDIA_SUBTITLES_SHOWING)},"areSubsOn"),ay=n(t=>{var e;const{media:i,fullscreenElement:a}=t;try{const r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){const s=(e=a[r])==null?void 0:e.call(a);if(s instanceof Promise)return s.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch{}},"enterFullscreen"),_p="exitFullscreen"in Se?"exitFullscreen":"webkitExitFullscreen"in Se?"webkitExitFullscreen":"webkitCancelFullScreen"in Se?"webkitCancelFullScreen":void 0,ry=n(t=>{var e;const{documentElement:i}=t;if(_p){const a=(e=i?.[_p])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},"exitFullscreen"),yn="fullscreenElement"in Se?"fullscreenElement":"webkitFullscreenElement"in Se?"webkitFullscreenElement":void 0,ny=n(t=>{const{documentElement:e,media:i}=t,a=e?.[yn];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===C1.FULLSCREEN?i:a},"getFullscreenElement"),sy=n(t=>{var e;const{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;const s=ny(t);if(!s)return!1;if(s===r||s===i)return!0;if(s.localName.includes("-")){let o=s.shadowRoot;if(!(yn in o))return _i(s,r);for(;o?.[yn];){if(o[yn]===r)return!0;o=(e=o[yn])==null?void 0:e.shadowRoot}}return!1},"isFullscreen"),oy="fullscreenEnabled"in Se?"fullscreenEnabled":"webkitFullscreenEnabled"in Se?"webkitFullscreenEnabled":void 0,ly=n(t=>{const{documentElement:e,media:i}=t;return!!e?.[oy]||i&&"webkitSupportsFullscreen"in i},"isFullscreenEnabled");let Ks;const Uc=n(()=>{var t,e;return Ks||(Ks=(e=(t=Se)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),Ks)},"getTestMediaEl"),dy=n(async(t=Uc())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([uy(t,i.signal),cy(t,e)]);return i.abort(),a},"hasVolumeSupportAsync"),uy=n((t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),"dispatchedVolumeChange"),cy=n(async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await Df(10)}return t.volume!==e},"volumeChanged"),hy=/.*Version\/.*Safari\/.*/.test(E.navigator.userAgent),jf=n((t=Uc())=>E.matchMedia("(display-mode: standalone)").matches&&hy?!1:typeof t?.requestPictureInPicture=="function","hasPipSupport"),zf=n((t=Uc())=>ly({documentElement:Se,media:t}),"hasFullscreenSupport"),my=zf(),py=jf(),vy=!!E.WebKitPlaybackTargetAvailabilityEvent,fy=!!E.chrome,yl=n(t=>dd(t.media,e=>[ei.SUBTITLES,ei.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),"getSubtitleTracks"),Xf=n(t=>dd(t.media,e=>e.mode===ur.SHOWING&&[ei.SUBTITLES,ei.CAPTIONS].includes(e.kind)),"getShowingSubtitleTracks"),Jf=n((t,e)=>{const i=yl(t),a=Xf(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)Bn(ur.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let s=i[0];const{options:o}=t;if(!o?.noSubtitlesLangPref){const p=globalThis.localStorage.getItem("media-chrome-pref-subtitles-lang"),v=p?[p,...globalThis.navigator.languages]:globalThis.navigator.languages,m=i.filter(h=>v.some(f=>h.language.toLowerCase().startsWith(f.split("-")[0]))).sort((h,f)=>{const _=v.findIndex(y=>h.language.toLowerCase().startsWith(y.split("-")[0])),b=v.findIndex(y=>f.language.toLowerCase().startsWith(y.split("-")[0]));return _-b});m[0]&&(s=m[0])}const{language:l,label:d,kind:u}=s;Bn(ur.DISABLED,i,a),Bn(ur.SHOWING,i,[{language:l,label:d,kind:u}])}}},"toggleSubtitleTracks"),Hc=n((t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?Ey(t,e):Object.entries(t).every(([i,a])=>i in e&&Hc(a,e[i])),"areValuesEq"),Ey=n((t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,s)=>Hc(r,e[s])):!0},"areArraysEq"),by=Object.values(ui);let Tl;const _y=dy().then(t=>(Tl=t,Tl)),gy=n(async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof E.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=E.customElements.get(i);a&&e instanceof a||(await E.customElements.whenDefined(i),E.customElements.upgrade(e))}))},"prepareStateOwners"),yy=new E.DOMParser,Ty=n(t=>t&&(yy.parseFromString(t,"text/html").body.textContent||t),"parseHtmlToText"),Tn={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:r}=t;if(e?.type!=="playing")return(a=(i=r?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const r=E.localStorage.getItem("media-chrome-pref-muted")!==null,s=i.hasAttribute("muted");if(a){r&&E.localStorage.removeItem("media-chrome-pref-muted");return}if(s&&!r)return;E.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch{}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const r=E.localStorage.getItem("media-chrome-pref-muted")==="true";Tn.mediaMuted.set(r,e),t(r)}catch{}}]},mediaLoop:{get(t){const{media:e}=t;return e?.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?E.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&E.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch{}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const r=E.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;Tn.mediaVolume.set(+r,e),t(+r)}catch{}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!Mc(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((r,s)=>[Number(a.start(s).toFixed(3)),Number(a.end(s).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[ui.LIVE,ui.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:r}=e;if(by.includes(r))return r===ui.UNKNOWN?a:r;const s=e.duration;return s===1/0?ui.LIVE:Number.isFinite(s)?ui.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=Tn.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===ui.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Tn.mediaStreamType.get(t)===ui.LIVE))return!1;const r=e.seekable;if(!r)return!0;if(!r.length)return!1;const s=r.end(r.length-1)-i;return e.currentTime>=s},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return yl(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return Xf(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:r,options:s}=e;if(!r)return;const o=n(l=>{var d;!s.defaultSubtitles||l&&![ei.CAPTIONS,ei.SUBTITLES].includes((d=l?.track)==null?void 0:d.kind)||Jf(e,!0)},"updateDefaultSubtitlesCallback");return r.addEventListener("loadstart",o),(i=r.textTracks)==null||i.addEventListener("addtrack",o),(a=r.textTracks)==null||a.addEventListener("removetrack",o),()=>{var l,d;r.removeEventListener("loadstart",o),(l=r.textTracks)==null||l.removeEventListener("addtrack",o),(d=r.textTracks)==null||d.removeEventListener("removetrack",o)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=dd(i,{kind:ei.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:r,startTime:s,endTime:o})=>({text:Ty(r),startTime:s,endTime:o}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const r=a.querySelector('track[kind="chapters"][default][src]'),s=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r?.addEventListener("load",t),s?.addEventListener("load",t),()=>{r?.removeEventListener("load",t),s?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?_i(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let s=r.pictureInPictureElement.shadowRoot;for(;s?.pictureInPictureElement;){if(s.pictureInPictureElement===a)return!0;s=(i=s.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!Se.pictureInPictureEnabled||!i.requestPictureInPicture)return;const a=n(()=>{},"warnNotReady");i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src)return;if(i.readyState===0&&i.preload==="none"){const s=n(()=>{i.removeEventListener("loadedmetadata",o),i.preload="none"},"cleanup"),o=n(()=>{i.requestPictureInPicture().catch(a),s()},"tryPip");i.addEventListener("loadedmetadata",o),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),s()},1e3)}else throw r}else throw r})}else Se.pictureInPictureElement&&Se.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:r}=t;return(a=(i=r?.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions)return;const a=t,r=Array.prototype.findIndex.call(i.videoRenditions,s=>s.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks)return;const a=t;for(const r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return sy(t)},set(t,e,i){var a;t?(ay(e),i.detail&&((a=e.media)==null||a.focus())):ry(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;const{media:r}=e;r&&(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected"||!t&&((a=r.remote)==null?void 0:a.state)!=="connected"||typeof r.remote.prompt=="function"&&r.remote.prompt().catch(()=>{}))},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;i&&i.webkitShowPlaybackTargetPicker&&E.WebKitPlaybackTargetAvailabilityEvent&&i.webkitShowPlaybackTargetPicker()},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!my||!zf(e))return Je.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!py||!jf(e))return Je.UNSUPPORTED;if(e?.disablePictureInPicture)return Je.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(Tl===!1||e?.volume==null)return Je.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{Tl==null&&_y.then(e=>t(e?void 0:Je.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!fy||!((i=a?.remote)!=null&&i.state))return Je.UNSUPPORTED;if(!(e==null||e==="available"))return Je.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(s=>{t({availability:s?"available":"not-available"})}).catch(s=>{s.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var s;(s=a?.remote)==null||s.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!vy)return Je.UNSUPPORTED;if(e?.availability==="not-available")return Je.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(s=>{t({availability:s?"available":"not-available"})}).catch(s=>{s.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var s;(s=a?.remote)==null||s.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return Je.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return Je.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return Je.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return Je.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},Ay={[C.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,s;const{media:o}=e,l=i??void 0;let d,u;if(o&&l!=null){const[h]=dd(o,{kind:ei.METADATA,label:"thumbnails"}),f=Array.prototype.find.call((a=h?.cues)!=null?a:[],(_,b,y)=>b===0?_.endTime>l:b===y.length-1?_.startTime<=l:_.startTime<=l&&_.endTime>l);if(f){const _=/'^(?:[a-z]+:)?\/\//i.test(f.text)||(r=o?.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,b=new URL(f.text,_);u=new URLSearchParams(b.hash).get("#xywh").split(",").map(A=>+A),d=b.href}}const p=t.mediaDuration.get(e);let m=(s=t.mediaChaptersCues.get(e).find((h,f,_)=>f===_.length-1&&p===h.endTime?h.startTime<=l&&h.endTime>=l:h.startTime<=l&&h.endTime>l))==null?void 0:s.text;return i!=null&&m==null&&(m=""),{mediaPreviewTime:l,mediaPreviewImage:d,mediaPreviewCoords:u,mediaPreviewChapter:m}},[C.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[C.MEDIA_PLAY_REQUEST](t,e){var i,a,r,s;const o="mediaPaused",d=t.mediaStreamType.get(e)===ui.LIVE,u=!((i=e.options)!=null&&i.noAutoSeekToLive),p=t.mediaTargetLiveWindow.get(e)>0;if(d&&u&&!p){const v=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(v){const m=(s=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?s:0,h=v-m;t.mediaCurrentTime.set(h,e)}}t[o].set(!1,e)},[C.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",r=i;t[a].set(r,e)},[C.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[C.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[C.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",r=!!i;return t[a].set(r,e),{mediaLoop:r}},[C.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[C.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",r=i;t[a].set(r,e)},[C.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;const s="mediaCurrentTime",o=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(o)))return;const l=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,d=o-l;t[s].set(d,e)},[C.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:r}=e,s=yl(e),o=Gf(i),l=(a=o[0])==null?void 0:a.language;l&&!r.noSubtitlesLangPref&&E.localStorage.setItem("media-chrome-pref-subtitles-lang",l),Bn(ur.SHOWING,s,o)},[C.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=yl(e),r=i??[];Bn(ur.DISABLED,a,r)},[C.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){Jf(e,i)},[C.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",r=i;t[a].set(r,e)},[C.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[C.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[C.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[C.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[C.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[C.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[C.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[C.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},ky=n(({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=Tn,requestMap:r=Ay,options:s={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{const l=[],d={options:{...s}};let u=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const p=n(_=>{_!=null&&(Hc(_,u)||(u=Object.freeze({...u,..._}),l.forEach(b=>b(u))))},"updateState"),v=n(()=>{const _=Object.entries(a).reduce((b,[y,{get:A}])=>(b[y]=A(d),b),{});p(_)},"updateStateFromFacade"),m={};let h;const f=n(async(_,b)=>{var y,A,g,w,M,P,W,Z,ae,q,H,$e,Qe,Ze,Ee,Be;const Dt=!!h;if(h={...d,...h??{},..._},Dt)return;await gy(...Object.values(_));const We=l.length>0&&b===0&&o,bt=d.media!==h.media,je=((y=d.media)==null?void 0:y.textTracks)!==((A=h.media)==null?void 0:A.textTracks),Le=((g=d.media)==null?void 0:g.videoRenditions)!==((w=h.media)==null?void 0:w.videoRenditions),ze=((M=d.media)==null?void 0:M.audioTracks)!==((P=h.media)==null?void 0:P.audioTracks),lt=((W=d.media)==null?void 0:W.remote)!==((Z=h.media)==null?void 0:Z.remote),wa=d.documentElement!==h.documentElement,Ns=!!d.media&&(bt||We),Im=!!((ae=d.media)!=null&&ae.textTracks)&&(je||We),Rm=!!((q=d.media)!=null&&q.videoRenditions)&&(Le||We),Cm=!!((H=d.media)!=null&&H.audioTracks)&&(ze||We),Lm=!!(($e=d.media)!=null&&$e.remote)&&(lt||We),Dm=!!d.documentElement&&(wa||We),md=Ns||Im||Rm||Cm||Lm||Dm,Ia=l.length===0&&b===1&&o,Mm=!!h.media&&(bt||Ia),xm=!!((Qe=h.media)!=null&&Qe.textTracks)&&(je||Ia),Om=!!((Ze=h.media)!=null&&Ze.videoRenditions)&&(Le||Ia),Nm=!!((Ee=h.media)!=null&&Ee.audioTracks)&&(ze||Ia),Pm=!!((Be=h.media)!=null&&Be.remote)&&(lt||Ia),$m=!!h.documentElement&&(wa||Ia),Um=Mm||xm||Om||Nm||Pm||$m;if(!(md||Um)){Object.entries(h).forEach(([ee,tn])=>{d[ee]=tn}),v(),h=void 0;return}Object.entries(a).forEach(([ee,{get:tn,mediaEvents:Tb=[],textTracksEvents:Ab=[],videoRenditionsEvents:kb=[],audioTracksEvents:Sb=[],remoteEvents:wb=[],rootEvents:Ib=[],stateOwnersUpdateHandlers:Rb=[]}])=>{m[ee]||(m[ee]={});const Xe=n(ce=>{const be=tn(d,ce);p({[ee]:be})},"handler");let De;De=m[ee].mediaEvents,Tb.forEach(ce=>{De&&Ns&&(d.media.removeEventListener(ce,De),m[ee].mediaEvents=void 0),Mm&&(h.media.addEventListener(ce,Xe),m[ee].mediaEvents=Xe)}),De=m[ee].textTracksEvents,Ab.forEach(ce=>{var be,_t;De&&Im&&((be=d.media.textTracks)==null||be.removeEventListener(ce,De),m[ee].textTracksEvents=void 0),xm&&((_t=h.media.textTracks)==null||_t.addEventListener(ce,Xe),m[ee].textTracksEvents=Xe)}),De=m[ee].videoRenditionsEvents,kb.forEach(ce=>{var be,_t;De&&Rm&&((be=d.media.videoRenditions)==null||be.removeEventListener(ce,De),m[ee].videoRenditionsEvents=void 0),Om&&((_t=h.media.videoRenditions)==null||_t.addEventListener(ce,Xe),m[ee].videoRenditionsEvents=Xe)}),De=m[ee].audioTracksEvents,Sb.forEach(ce=>{var be,_t;De&&Cm&&((be=d.media.audioTracks)==null||be.removeEventListener(ce,De),m[ee].audioTracksEvents=void 0),Nm&&((_t=h.media.audioTracks)==null||_t.addEventListener(ce,Xe),m[ee].audioTracksEvents=Xe)}),De=m[ee].remoteEvents,wb.forEach(ce=>{var be,_t;De&&Lm&&((be=d.media.remote)==null||be.removeEventListener(ce,De),m[ee].remoteEvents=void 0),Pm&&((_t=h.media.remote)==null||_t.addEventListener(ce,Xe),m[ee].remoteEvents=Xe)}),De=m[ee].rootEvents,Ib.forEach(ce=>{De&&Dm&&(d.documentElement.removeEventListener(ce,De),m[ee].rootEvents=void 0),$m&&(h.documentElement.addEventListener(ce,Xe),m[ee].rootEvents=Xe)});const Ps=m[ee].stateOwnersUpdateHandlers;if(Ps&&md&&(Array.isArray(Ps)?Ps:[Ps]).forEach(be=>{typeof be=="function"&&be()}),Um){const ce=Rb.map(be=>be(Xe,h)).filter(be=>typeof be=="function");m[ee].stateOwnersUpdateHandlers=ce.length===1?ce[0]:ce}else md&&(m[ee].stateOwnersUpdateHandlers=void 0)}),Object.entries(h).forEach(([ee,tn])=>{d[ee]=tn}),v(),h=void 0},"updateStateOwners");return f({media:t,fullscreenElement:e,documentElement:i,options:s}),{dispatch(_){const{type:b,detail:y}=_;if(r[b]&&u.mediaErrorCode==null){p(r[b](a,d,_));return}b==="mediaelementchangerequest"?f({media:y}):b==="fullscreenelementchangerequest"?f({fullscreenElement:y}):b==="documentelementchangerequest"?f({documentElement:y}):b==="optionschangerequest"&&(Object.entries(y??{}).forEach(([A,g])=>{d.options[A]=g}),v())},getState(){return u},subscribe(_){return f({},l.length+1),l.push(_),_(u),()=>{const b=l.indexOf(_);b>=0&&(f({},l.length-1),l.splice(b,1))}}}},"createMediaStore");var Bc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$q"),U=n((t,e,i)=>(Bc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$q"),yt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$q"),li=n((t,e,i,a)=>(Bc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$n"),Gt=n((t,e,i)=>(Bc(t,e,"access private method"),i),"__privateMethod$c"),xi,An,j,la,kn,$t,bo,_o,ou,va,cr,go,lu,du,eE;const tE=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],gp=10,yp=.025,Tp=.25,Sy=.25,wy=2,I={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"},kh=class kh extends Vr{constructor(){super(),yt(this,_o),yt(this,va),yt(this,go),yt(this,du),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,yt(this,xi,new es(this,I.HOTKEYS)),yt(this,An,void 0),yt(this,j,void 0),yt(this,la,null),yt(this,kn,void 0),yt(this,$t,void 0),yt(this,bo,i=>{var a;(a=U(this,j))==null||a.dispatch(i)}),this.associateElement(this);let e={};li(this,kn,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);const s=a.toLowerCase(),o=new E.CustomEvent(R1[s],{composed:!0,detail:r});this.dispatchEvent(o)}),e=i}),this.hasAttribute(I.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}static get observedAttributes(){return super.observedAttributes.concat(I.NO_HOTKEYS,I.HOTKEYS,I.DEFAULT_STREAM_TYPE,I.DEFAULT_SUBTITLES,I.DEFAULT_DURATION,I.NO_MUTED_PREF,I.NO_VOLUME_PREF,I.LANG,I.LOOP)}get mediaStore(){return U(this,j)}set mediaStore(e){var i,a;if(U(this,j)&&((i=U(this,$t))==null||i.call(this),li(this,$t,void 0)),li(this,j,e),!U(this,j)&&!this.hasAttribute(I.NO_DEFAULT_STORE)){Gt(this,_o,ou).call(this);return}li(this,$t,(a=U(this,j))==null?void 0:a.subscribe(U(this,kn)))}get fullscreenElement(){var e;return(e=U(this,An))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(I.FULLSCREEN_ELEMENT)&&this.removeAttribute(I.FULLSCREEN_ELEMENT),li(this,An,e),(i=U(this,j))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return K(this,I.DEFAULT_SUBTITLES)}set defaultSubtitles(e){V(this,I.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return le(this,I.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){de(this,I.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return oe(this,I.DEFAULT_DURATION)}set defaultDuration(e){ve(this,I.DEFAULT_DURATION,e)}get noHotkeys(){return K(this,I.NO_HOTKEYS)}set noHotkeys(e){V(this,I.NO_HOTKEYS,e)}get keysUsed(){return le(this,I.KEYS_USED)}set keysUsed(e){de(this,I.KEYS_USED,e)}get liveEdgeOffset(){return oe(this,I.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){ve(this,I.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return K(this,I.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){V(this,I.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return K(this,I.NO_VOLUME_PREF)}set noVolumePref(e){V(this,I.NO_VOLUME_PREF,e)}get noMutedPref(){return K(this,I.NO_MUTED_PREF)}set noMutedPref(e){V(this,I.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return K(this,I.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){V(this,I.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return K(this,I.NO_DEFAULT_STORE)}set noDefaultStore(e){V(this,I.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var r,s,o,l,d,u,p,v,m,h,f,_;if(super.attributeChangedCallback(e,i,a),e===I.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(I.HOTKEYS),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===I.HOTKEYS)U(this,xi).value=a;else if(e===I.DEFAULT_SUBTITLES&&a!==i)(r=U(this,j))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(I.DEFAULT_SUBTITLES)}});else if(e===I.DEFAULT_STREAM_TYPE)(o=U(this,j))==null||o.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(s=this.getAttribute(I.DEFAULT_STREAM_TYPE))!=null?s:void 0}});else if(e===I.LIVE_EDGE_OFFSET)(l=U(this,j))==null||l.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(I.LIVE_EDGE_OFFSET)?+this.getAttribute(I.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(I.SEEK_TO_LIVE_OFFSET)?void 0:+this.getAttribute(I.LIVE_EDGE_OFFSET)}});else if(e===I.SEEK_TO_LIVE_OFFSET)(d=U(this,j))==null||d.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(I.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(I.SEEK_TO_LIVE_OFFSET):void 0}});else if(e===I.NO_AUTO_SEEK_TO_LIVE)(u=U(this,j))==null||u.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(I.NO_AUTO_SEEK_TO_LIVE)}});else if(e===I.FULLSCREEN_ELEMENT){const b=a?(p=this.getRootNode())==null?void 0:p.getElementById(a):void 0;li(this,An,b),(v=U(this,j))==null||v.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===I.LANG&&a!==i?(W1(a),(m=U(this,j))==null||m.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===I.LOOP&&a!==i?(h=U(this,j))==null||h.dispatch({type:C.MEDIA_LOOP_REQUEST,detail:a!=null}):e===I.NO_VOLUME_PREF&&a!==i?(f=U(this,j))==null||f.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(I.NO_VOLUME_PREF)}}):e===I.NO_MUTED_PREF&&a!==i&&((_=U(this,j))==null||_.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(I.NO_MUTED_PREF)}}))}connectedCallback(){var e,i;!U(this,j)&&!this.hasAttribute(I.NO_DEFAULT_STORE)&&Gt(this,_o,ou).call(this),(e=U(this,j))==null||e.dispatch({type:"documentelementchangerequest",detail:Se}),super.connectedCallback(),U(this,j)&&!U(this,$t)&&li(this,$t,(i=U(this,j))==null?void 0:i.subscribe(U(this,kn))),this.hasAttribute(I.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,r;(e=super.disconnectedCallback)==null||e.call(this),U(this,j)&&((i=U(this,j))==null||i.dispatch({type:"documentelementchangerequest",detail:void 0}),(a=U(this,j))==null||a.dispatch({type:C.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})),U(this,$t)&&((r=U(this,$t))==null||r.call(this),li(this,$t,void 0))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=U(this,j))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=U(this,j))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){Sp(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),s=My(e,a,r);Object.values(C).forEach(o=>{e.addEventListener(o,U(this,bo))}),i.set(e,s)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(C).forEach(r=>{e.removeEventListener(r,U(this,bo))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),U(this,j)&&Object.entries(U(this,j).getState()).forEach(([r,s])=>{Sp([e],r,s)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",Gt(this,go,lu))}disableHotkeys(){this.removeEventListener("keydown",Gt(this,go,lu)),this.removeEventListener("keyup",Gt(this,va,cr))}get hotkeys(){return le(this,I.HOTKEYS)}set hotkeys(e){de(this,I.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,s,o,l,d,u,p;const v=e.target;if(((r=(a=(i=v.getAttribute(I.KEYS_USED))==null?void 0:i.split(" "))!=null?a:v?.keysUsed)!=null?r:[]).map(y=>y==="Space"?" ":y).filter(Boolean).includes(e.key))return;let h,f,_;if(!(U(this,xi).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&U(this,xi).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&U(this,xi).contains("noshift+/")))switch(e.key){case" ":case"k":h=U(this,j).getState().mediaPaused?C.MEDIA_PLAY_REQUEST:C.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new E.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"m":h=this.mediaStore.getState().mediaVolumeLevel==="off"?C.MEDIA_UNMUTE_REQUEST:C.MEDIA_MUTE_REQUEST,this.dispatchEvent(new E.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"f":h=this.mediaStore.getState().mediaIsFullscreen?C.MEDIA_EXIT_FULLSCREEN_REQUEST:C.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new E.CustomEvent(h,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new E.CustomEvent(C.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const y=this.hasAttribute(I.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(I.KEYBOARD_BACKWARD_SEEK_OFFSET):gp;f=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)-y,0),_=new E.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowRight":case"l":{const y=this.hasAttribute(I.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(I.KEYBOARD_FORWARD_SEEK_OFFSET):gp;f=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)+y,0),_=new E.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowUp":{const y=this.hasAttribute(I.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(I.KEYBOARD_UP_VOLUME_STEP):yp;f=Math.min(((l=this.mediaStore.getState().mediaVolume)!=null?l:1)+y,1),_=new E.CustomEvent(C.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowDown":{const y=this.hasAttribute(I.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(I.KEYBOARD_DOWN_VOLUME_STEP):yp;f=Math.max(((d=this.mediaStore.getState().mediaVolume)!=null?d:1)-y,0),_=new E.CustomEvent(C.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"<":{const y=(u=this.mediaStore.getState().mediaPlaybackRate)!=null?u:1;f=Math.max(y-Tp,Sy).toFixed(2),_=new E.CustomEvent(C.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case">":{const y=(p=this.mediaStore.getState().mediaPlaybackRate)!=null?p:1;f=Math.min(y+Tp,wy).toFixed(2),_=new E.CustomEvent(C.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"/":case"?":{e.shiftKey&&Gt(this,du,eE).call(this);break}case"p":{h=this.mediaStore.getState().mediaIsPip?C.MEDIA_EXIT_PIP_REQUEST:C.MEDIA_ENTER_PIP_REQUEST,_=new E.CustomEvent(h,{composed:!0,bubbles:!0}),this.dispatchEvent(_);break}}}};n(kh,"MediaController");let Al=kh;xi=new WeakMap;An=new WeakMap;j=new WeakMap;la=new WeakMap;kn=new WeakMap;$t=new WeakMap;bo=new WeakMap;_o=new WeakSet;ou=n(function(){var t;this.mediaStore=ky({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(I.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(I.DEFAULT_DURATION)?+this.getAttribute(I.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(I.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(I.LIVE_EDGE_OFFSET)?+this.getAttribute(I.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(I.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(I.SEEK_TO_LIVE_OFFSET):this.hasAttribute(I.LIVE_EDGE_OFFSET)?+this.getAttribute(I.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(I.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(I.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(I.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(I.NO_SUBTITLES_LANG_PREF)}})},"setupDefaultStore_fn");va=new WeakSet;cr=n(function(t){const{key:e,shiftKey:i}=t;if(!(i&&(e==="/"||e==="?")||tE.includes(e))){this.removeEventListener("keyup",Gt(this,va,cr));return}this.keyboardShortcutHandler(t)},"keyUpHandler_fn");go=new WeakSet;lu=n(function(t){var e;const{metaKey:i,altKey:a,key:r,shiftKey:s}=t,o=s&&(r==="/"||r==="?");if(o&&((e=U(this,la))!=null&&e.open)){this.removeEventListener("keyup",Gt(this,va,cr));return}if(i||a||!o&&!tE.includes(r)){this.removeEventListener("keyup",Gt(this,va,cr));return}const l=t.target,d=l instanceof HTMLElement&&(l.tagName.toLowerCase()==="media-volume-range"||l.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)&&!(U(this,xi).contains(`no${r.toLowerCase()}`)||r===" "&&U(this,xi).contains("nospace"))&&!d&&t.preventDefault(),this.addEventListener("keyup",Gt(this,va,cr),{once:!0})},"keyDownHandler_fn");du=new WeakSet;eE=n(function(){U(this,la)||(li(this,la,Se.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(U(this,la))),U(this,la).open=!0},"showKeyboardShortcutsDialog_fn");const Iy=Object.values(c),Ry=Object.values(Rf),iE=n(t=>{var e,i,a,r;let{observedAttributes:s}=t.constructor;!s&&((e=t.nodeName)!=null&&e.includes("-"))&&(E.customElements.upgrade(t),{observedAttributes:s}=t.constructor);const o=(r=(a=(i=t?.getAttribute)==null?void 0:i.call(t,Q.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(s||o)?(s||o).filter(l=>Iy.includes(l)):[]},"getMediaUIAttributesFrom"),Cy=n(t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&E.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof E.customElements.get(t.nodeName.toLowerCase()))&&E.customElements.upgrade(t),Ry.some(a=>a in t)},"hasMediaUIProps"),uu=n(t=>Cy(t)||!!iE(t).length,"isMediaStateReceiver"),Ap=n(t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},"serializeTuple"),kp={[c.MEDIA_SUBTITLES_LIST]:ts,[c.MEDIA_SUBTITLES_SHOWING]:ts,[c.MEDIA_SEEKABLE]:Ap,[c.MEDIA_BUFFERED]:t=>t?.map(Ap).join(" "),[c.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[c.MEDIA_RENDITION_LIST]:L1,[c.MEDIA_AUDIO_TRACK_LIST]:O1},Ly=n(async(t,e,i)=>{var a,r;if(t.isConnected||await Df(0),typeof i=="boolean"||i==null)return V(t,e,i);if(typeof i=="number")return ve(t,e,i);if(typeof i=="string")return de(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const s=(r=(a=kp[e])==null?void 0:a.call(kp,i))!=null?r:i;return t.setAttribute(e,s)},"setAttr"),Dy=n(t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},"isMediaSlotElementDescendant"),ji=n((t,e)=>{if(Dy(t))return;const i=n((r,s)=>{var o,l;uu(r)&&s(r);const{children:d=[]}=r??{},u=(l=(o=r?.shadowRoot)==null?void 0:o.children)!=null?l:[];[...d,...u].forEach(v=>ji(v,s))},"traverseForMediaStateReceiversSync"),a=t?.nodeName.toLowerCase();if(a.includes("-")&&!uu(t)){E.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},"traverseForMediaStateReceivers"),Sp=n((t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const r=iE(a),s=e.toLowerCase();r.includes(s)&&Ly(a,s,i)})},"propagateMediaState"),My=n((t,e,i)=>{ji(t,e);const a=n(p=>{var v;const m=(v=p?.composedPath()[0])!=null?v:p.target;e(m)},"registerMediaStateReceiverHandler"),r=n(p=>{var v;const m=(v=p?.composedPath()[0])!=null?v:p.target;i(m)},"unregisterMediaStateReceiverHandler");t.addEventListener(C.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(C.UNREGISTER_MEDIA_STATE_RECEIVER,r);const s=n(p=>{p.forEach(v=>{const{addedNodes:m=[],removedNodes:h=[],type:f,target:_,attributeName:b}=v;f==="childList"?(Array.prototype.forEach.call(m,y=>ji(y,e)),Array.prototype.forEach.call(h,y=>ji(y,i))):f==="attributes"&&b===Q.MEDIA_CHROME_ATTRIBUTES&&(uu(_)?e(_):i(_))})},"mutationCallback");let o=[];const l=n(p=>{const v=p.target;v.name!=="media"&&(o.forEach(m=>ji(m,i)),o=[...v.assignedElements({flatten:!0})],o.forEach(m=>ji(m,e)))},"slotChangeHandler");t.addEventListener("slotchange",l);const d=new MutationObserver(s);return d.observe(t,{childList:!0,attributes:!0,subtree:!0}),n(()=>{ji(t,i),t.removeEventListener("slotchange",l),d.disconnect(),t.removeEventListener(C.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(C.UNREGISTER_MEDIA_STATE_RECEIVER,r)},"unsubscribe")},"monitorForMediaStateReceivers");E.customElements.get("media-controller")||E.customElements.define("media-controller",Al);var xy=Al;const Ra={PLACEMENT:"placement",BOUNDS:"bounds"};function Oy(t){return`
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
  `}n(Oy,"getTemplateHTML$g");const Sh=class Sh extends E.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!Hf(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),r=(e=en(this,"#"+this.bounds))!=null?e:qe(this);if(!r)return;const{x:s,width:o}=r.getBoundingClientRect(),{x:l,width:d}=this.getBoundingClientRect(),u=l+d,p=s+o,v=a.getPropertyValue("--media-tooltip-offset-x"),m=v?parseFloat(v.replace("px","")):0,h=a.getPropertyValue("--media-tooltip-container-margin"),f=h?parseFloat(h.replace("px","")):0,_=l-s+m-f,b=u-p+m+f;if(_<0){this.style.setProperty("--media-tooltip-offset-x",`${_}px`);return}if(b>0){this.style.setProperty("--media-tooltip-offset-x",`${b}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Ra.PLACEMENT,Ra.BOUNDS]}get placement(){return le(this,Ra.PLACEMENT)}set placement(e){de(this,Ra.PLACEMENT,e)}get bounds(){return le(this,Ra.BOUNDS)}set bounds(e){de(this,Ra.BOUNDS,e)}};n(Sh,"MediaTooltip");let qr=Sh;qr.shadowRootOptions={mode:"open"};qr.getTemplateHTML=Oy;E.customElements.get("media-tooltip")||E.customElements.define("media-tooltip",qr);var wp=qr,Wc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$p"),ge=n((t,e,i)=>(Wc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$p"),Ca=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$p"),Vs=n((t,e,i,a)=>(Wc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$m"),Ny=n((t,e,i)=>(Wc(t,e,"access private method"),i),"__privateMethod$b"),Ut,nr,Oi,Ba,yo,cu,aE;const Ti={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function Py(t,e={}){return`
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
        <template shadowrootmode="${wp.shadowRootOptions.mode}">
          ${wp.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}n(Py,"getTemplateHTML$f");function $y(t,e){return`
    <slot></slot>
  `}n($y,"getSlotTemplateHTML$n");function Uy(){return""}n(Uy,"getTooltipContentHTML$g");const wh=class wh extends E.HTMLElement{constructor(){if(super(),Ca(this,cu),Ca(this,Ut,void 0),this.preventClick=!1,this.tooltipEl=null,Ca(this,nr,e=>{this.preventClick||this.handleClick(e),setTimeout(ge(this,Oi),0)}),Ca(this,Oi,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),Ca(this,Ba,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",ge(this,Ba));return}this.preventClick||this.handleClick(e)}),Ca(this,yo,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",ge(this,Ba));return}this.addEventListener("keyup",ge(this,Ba),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",Ti.TOOLTIP_PLACEMENT,Q.MEDIA_CONTROLLER,c.MEDIA_LANG]}enable(){this.addEventListener("click",ge(this,nr)),this.addEventListener("keydown",ge(this,yo)),this.tabIndex=0}disable(){this.removeEventListener("click",ge(this,nr)),this.removeEventListener("keydown",ge(this,yo)),this.removeEventListener("keyup",ge(this,Ba)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Q.MEDIA_CONTROLLER?(i&&((s=(r=ge(this,Ut))==null?void 0:r.unassociateElement)==null||s.call(r,this),Vs(this,Ut,null)),a&&this.isConnected&&(Vs(this,Ut,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=ge(this,Ut))==null?void 0:l.associateElement)==null||d.call(l,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===Ti.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===c.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),ge(this,Oi).call(this)}connectedCallback(){var e,i,a;const{style:r}=Ce(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const s=this.getAttribute(Q.MEDIA_CONTROLLER);s&&(Vs(this,Ut,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=ge(this,Ut))==null?void 0:i.associateElement)==null||a.call(i,this)),E.customElements.whenDefined("media-tooltip").then(()=>Ny(this,cu,aE).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=ge(this,Ut))==null?void 0:e.unassociateElement)==null||i.call(e,this),Vs(this,Ut,null),this.removeEventListener("mouseenter",ge(this,Oi)),this.removeEventListener("focus",ge(this,Oi)),this.removeEventListener("click",ge(this,nr))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return le(this,Ti.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){de(this,Ti.TOOLTIP_PLACEMENT,e)}get mediaController(){return le(this,Q.MEDIA_CONTROLLER)}set mediaController(e){de(this,Q.MEDIA_CONTROLLER,e)}get disabled(){return K(this,Ti.DISABLED)}set disabled(e){V(this,Ti.DISABLED,e)}get noTooltip(){return K(this,Ti.NO_TOOLTIP)}set noTooltip(e){V(this,Ti.NO_TOOLTIP,e)}handleClick(e){}};n(wh,"MediaChromeButton");let we=wh;Ut=new WeakMap;nr=new WeakMap;Oi=new WeakMap;Ba=new WeakMap;yo=new WeakMap;cu=new WeakSet;aE=n(function(){this.addEventListener("mouseenter",ge(this,Oi)),this.addEventListener("focus",ge(this,Oi)),this.addEventListener("click",ge(this,nr));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)},"setupTooltip_fn");we.shadowRootOptions={mode:"open"};we.getTemplateHTML=Py;we.getSlotTemplateHTML=$y;we.getTooltipContentHTML=Uy;E.customElements.get("media-chrome-button")||E.customElements.define("media-chrome-button",we);const Ip=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function Hy(t){return`
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
      <slot name="enter">${Ip}</slot>
      <slot name="exit">${Ip}</slot>
    </slot>
  `}n(Hy,"getSlotTemplateHTML$m");function By(){return`
    <slot name="tooltip-enter">${D("start airplay")}</slot>
    <slot name="tooltip-exit">${D("stop airplay")}</slot>
  `}n(By,"getTooltipContentHTML$f");const Rp=n(t=>{const e=t.mediaIsAirplaying?D("stop airplay"):D("start airplay");t.setAttribute("aria-label",e)},"updateAriaLabel$7"),Ih=class Ih extends we{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_AIRPLAYING,c.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Rp(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_AIRPLAYING&&Rp(this)}get mediaIsAirplaying(){return K(this,c.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){V(this,c.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return le(this,c.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){de(this,c.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new E.CustomEvent(C.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};n(Ih,"MediaAirplayButton");let is=Ih;is.getSlotTemplateHTML=Hy;is.getTooltipContentHTML=By;E.customElements.get("media-airplay-button")||E.customElements.define("media-airplay-button",is);const Wy=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Fy=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function Ky(t){return`
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
      <slot name="on">${Wy}</slot>
      <slot name="off">${Fy}</slot>
    </slot>
  `}n(Ky,"getSlotTemplateHTML$l");function Vy(){return`
    <slot name="tooltip-enable">${D("Enable captions")}</slot>
    <slot name="tooltip-disable">${D("Disable captions")}</slot>
  `}n(Vy,"getTooltipContentHTML$e");const Cp=n(t=>{t.setAttribute("aria-checked",Zf(t).toString())},"updateAriaChecked$1"),Rh=class Rh extends we{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","switch"),this.setAttribute("aria-label",D("closed captions")),Cp(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_SHOWING&&Cp(this)}get mediaSubtitlesList(){return Lp(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Dp(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Lp(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Dp(this,c.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new E.CustomEvent(C.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};n(Rh,"MediaCaptionsButton");let as=Rh;as.getSlotTemplateHTML=Ky;as.getTooltipContentHTML=Vy;const Lp=n((t,e)=>{const i=t.getAttribute(e);return i?ld(i):[]},"getSubtitlesListAttr$2"),Dp=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=ts(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr$2");E.customElements.get("media-captions-button")||E.customElements.define("media-captions-button",as);const qy='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',Yy='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function Gy(t){return`
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
      <slot name="enter">${qy}</slot>
      <slot name="exit">${Yy}</slot>
    </slot>
  `}n(Gy,"getSlotTemplateHTML$k");function Qy(){return`
    <slot name="tooltip-enter">${D("Start casting")}</slot>
    <slot name="tooltip-exit">${D("Stop casting")}</slot>
  `}n(Qy,"getTooltipContentHTML$d");const Mp=n(t=>{const e=t.mediaIsCasting?D("stop casting"):D("start casting");t.setAttribute("aria-label",e)},"updateAriaLabel$6"),Ch=class Ch extends we{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_CASTING,c.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Mp(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_CASTING&&Mp(this)}get mediaIsCasting(){return K(this,c.MEDIA_IS_CASTING)}set mediaIsCasting(e){V(this,c.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return le(this,c.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){de(this,c.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?C.MEDIA_EXIT_CAST_REQUEST:C.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new E.CustomEvent(e,{composed:!0,bubbles:!0}))}};n(Ch,"MediaCastButton");let rs=Ch;rs.getSlotTemplateHTML=Gy;rs.getTooltipContentHTML=Qy;E.customElements.get("media-cast-button")||E.customElements.define("media-cast-button",rs);var Fc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$o"),fa=n((t,e,i)=>(Fc(t,e,"read from private field"),e.get(t)),"__privateGet$o"),ni=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$o"),Kc=n((t,e,i,a)=>(Fc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$l"),qi=n((t,e,i)=>(Fc(t,e,"access private method"),i),"__privateMethod$a"),kl,ns,Aa,To,hu,mu,rE,pu,nE,vu,sE,fu,oE,Eu,lE;function Zy(t){return`
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
  `}n(Zy,"getTemplateHTML$e");function jy(t){return`
    <slot id="content"></slot>
  `}n(jy,"getSlotTemplateHTML$j");const sn={OPEN:"open",ANCHOR:"anchor"},Lh=class Lh extends E.HTMLElement{constructor(){super(),ni(this,To),ni(this,mu),ni(this,pu),ni(this,vu),ni(this,fu),ni(this,Eu),ni(this,kl,!1),ni(this,ns,null),ni(this,Aa,null),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}static get observedAttributes(){return[sn.OPEN,sn.ANCHOR]}get open(){return K(this,sn.OPEN)}set open(e){V(this,sn.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":qi(this,vu,sE).call(this,e);break;case"focusout":qi(this,fu,oE).call(this,e);break;case"keydown":qi(this,Eu,lE).call(this,e);break}}connectedCallback(){qi(this,To,hu).call(this),this.role||(this.role="dialog")}attributeChangedCallback(e,i,a){qi(this,To,hu).call(this),e===sn.OPEN&&a!==i&&(this.open?qi(this,mu,rE).call(this):qi(this,pu,nE).call(this))}focus(){Kc(this,ns,Oc());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}};n(Lh,"MediaChromeDialog");let Hi=Lh;kl=new WeakMap;ns=new WeakMap;Aa=new WeakMap;To=new WeakSet;hu=n(function(){if(!fa(this,kl)&&(Kc(this,kl,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=Ce(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}},"init_fn");mu=new WeakSet;rE=n(function(){var t;(t=fa(this,Aa))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})},"handleOpen_fn$1");pu=new WeakSet;nE=n(function(){var t;(t=fa(this,Aa))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))},"handleClosed_fn$1");vu=new WeakSet;sE=n(function(t){Kc(this,Aa,t.relatedTarget),_i(this,t.relatedTarget)||(this.open=!this.open)},"handleInvoke_fn$1");fu=new WeakSet;oE=n(function(t){var e;_i(this,t.relatedTarget)||((e=fa(this,ns))==null||e.focus(),fa(this,Aa)&&fa(this,Aa)!==t.relatedTarget&&this.open&&(this.open=!1))},"handleFocusOut_fn$1");Eu=new WeakSet;lE=n(function(t){var e,i,a,r,s;const{key:o,ctrlKey:l,altKey:d,metaKey:u}=t;l||d||u||this.keysUsed.includes(o)&&(t.preventDefault(),t.stopPropagation(),o==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):o==="Escape"&&((s=fa(this,ns))==null||s.focus(),this.open=!1))},"handleKeyDown_fn$2");Hi.shadowRootOptions={mode:"open"};Hi.getTemplateHTML=Zy;Hi.getSlotTemplateHTML=jy;E.customElements.get("media-chrome-dialog")||E.customElements.define("media-chrome-dialog",Hi);var Vc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$n"),he=n((t,e,i)=>(Vc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$n"),Ne=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$n"),wi=n((t,e,i,a)=>(Vc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$k"),St=n((t,e,i)=>(Vc(t,e,"access private method"),i),"__privateMethod$9"),Ht,ud,Ao,ko,wt,Sl,So,wo,Io,qc,dE,Ro,bu,Co,_u,wl,Yc,gu,uE,yu,cE,Tu,hE,Au,mE;function zy(t){return`
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
  `}n(zy,"getTemplateHTML$d");const Dh=class Dh extends E.HTMLElement{constructor(){if(super(),Ne(this,qc),Ne(this,Ro),Ne(this,Co),Ne(this,wl),Ne(this,gu),Ne(this,yu),Ne(this,Tu),Ne(this,Au),Ne(this,Ht,void 0),Ne(this,ud,void 0),Ne(this,Ao,void 0),Ne(this,ko,void 0),Ne(this,wt,{}),Ne(this,Sl,[]),Ne(this,So,()=>{if(this.range.matches(":focus-visible")){const{style:e}=Ce(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),Ne(this,wo,()=>{const{style:e}=Ce(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),Ne(this,Io,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),wi(this,Ao,this.shadowRoot.querySelector("#startpoint")),wi(this,ko,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Q.MEDIA_CONTROLLER?(i&&((s=(r=he(this,Ht))==null?void 0:r.unassociateElement)==null||s.call(r,this),wi(this,Ht,null)),a&&this.isConnected&&(wi(this,Ht,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=he(this,Ht))==null?void 0:l.associateElement)==null||d.call(l,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),St(this,Ro,bu).call(this)):(this.range.setAttribute(e,a),St(this,Co,_u).call(this)))}connectedCallback(){var e,i,a;const{style:r}=Ce(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),he(this,wt).pointer=Ce(this.shadowRoot,"#pointer"),he(this,wt).progress=Ce(this.shadowRoot,"#progress"),he(this,wt).thumb=Ce(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),he(this,wt).activeSegment=Ce(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const s=this.getAttribute(Q.MEDIA_CONTROLLER);s&&(wi(this,Ht,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=he(this,Ht))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",he(this,So)),this.shadowRoot.addEventListener("focusout",he(this,wo)),St(this,Ro,bu).call(this),Br(this.container,he(this,Io))}disconnectedCallback(){var e,i;St(this,Co,_u).call(this),(i=(e=he(this,Ht))==null?void 0:e.unassociateElement)==null||i.call(e,this),wi(this,Ht,null),this.shadowRoot.removeEventListener("focusin",he(this,So)),this.shadowRoot.removeEventListener("focusout",he(this,wo)),Wr(this.container,he(this,Io))}updatePointerBar(e){var i;(i=he(this,wt).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=he(this,wt).progress)==null||e.style.setProperty("width",`${a}%`),(i=he(this,wt).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(s=>[s.start,s.end]),+this.range.max])];wi(this,Sl,[...a]);const r=a.pop();for(const[s,o]of a.entries()){const[l,d]=[s===0,s===a.length-1],u=l?"calc(var(--segments-gap) / -1)":`${o*100}%`,v=`calc(${((d?r:a[s+1])-o)*100}%${l||d?"":" - var(--segments-gap)"})`,m=Se.createElementNS("http://www.w3.org/2000/svg","rect"),h=Nc(this.shadowRoot,`#segments-clipping rect:nth-child(${s+1})`);h.style.setProperty("x",u),h.style.setProperty("width",v),i.append(m)}}getPointerRatio(e){return V1(e.clientX,e.clientY,he(this,Ao).getBoundingClientRect(),he(this,ko).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":St(this,Au,mE).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":St(this,gu,uE).call(this,e);break;case"pointerdown":St(this,wl,Yc).call(this,e);break;case"pointerup":St(this,yu,cE).call(this);break;case"pointerleave":St(this,Tu,hE).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}};n(Dh,"MediaChromeRange");let Bi=Dh;Ht=new WeakMap;ud=new WeakMap;Ao=new WeakMap;ko=new WeakMap;wt=new WeakMap;Sl=new WeakMap;So=new WeakMap;wo=new WeakMap;Io=new WeakMap;qc=new WeakSet;dE=n(function(t){const e=he(this,wt).activeSegment;if(!e)return;const i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${he(this,Sl).findIndex((s,o,l)=>{const d=l[o+1];return d!=null&&i>=s&&i<=d})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))},"updateActiveSegment_fn");Ro=new WeakSet;bu=n(function(){this.hasAttribute("disabled")||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))},"enableUserEvents_fn");Co=new WeakSet;_u=n(function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),(t=E.window)==null||t.removeEventListener("pointerup",this),(e=E.window)==null||e.removeEventListener("pointermove",this)},"disableUserEvents_fn");wl=new WeakSet;Yc=n(function(t){var e;wi(this,ud,t.composedPath().includes(this.range)),(e=E.window)==null||e.addEventListener("pointerup",this)},"handlePointerDown_fn");gu=new WeakSet;uE=n(function(t){var e;t.pointerType!=="mouse"&&St(this,wl,Yc).call(this,t),this.addEventListener("pointerleave",this),(e=E.window)==null||e.addEventListener("pointermove",this)},"handlePointerEnter_fn");yu=new WeakSet;cE=n(function(){var t;(t=E.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")},"handlePointerUp_fn");Tu=new WeakSet;hE=n(function(){var t,e;this.removeEventListener("pointerleave",this),(t=E.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=he(this,wt).activeSegment)==null||e.style.removeProperty("transform")},"handlePointerLeave_fn");Au=new WeakSet;mE=n(function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),St(this,qc,dE).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!he(this,ud))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))},"handlePointerMove_fn$1");Bi.shadowRootOptions={mode:"open"};Bi.getTemplateHTML=zy;E.customElements.get("media-chrome-range")||E.customElements.define("media-chrome-range",Bi);var pE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$m"),qs=n((t,e,i)=>(pE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$m"),Xy=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$m"),Ys=n((t,e,i,a)=>(pE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$j"),Bt;function Jy(t){return`
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
  `}n(Jy,"getTemplateHTML$c");const Mh=class Mh extends E.HTMLElement{constructor(){if(super(),Xy(this,Bt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Q.MEDIA_CONTROLLER&&(i&&((s=(r=qs(this,Bt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Ys(this,Bt,null)),a&&this.isConnected&&(Ys(this,Bt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=qs(this,Bt))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(Ys(this,Bt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=qs(this,Bt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=qs(this,Bt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ys(this,Bt,null)}};n(Mh,"MediaControlBar");let ss=Mh;Bt=new WeakMap;ss.shadowRootOptions={mode:"open"};ss.getTemplateHTML=Jy;E.customElements.get("media-control-bar")||E.customElements.define("media-control-bar",ss);var vE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$l"),Gs=n((t,e,i)=>(vE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$l"),eT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$l"),Qs=n((t,e,i,a)=>(vE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$i"),Wt;function tT(t,e={}){return`
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
  `}n(tT,"getTemplateHTML$b");function iT(t,e){return`
    <slot></slot>
  `}n(iT,"getSlotTemplateHTML$i");const xh=class xh extends E.HTMLElement{constructor(){if(super(),eT(this,Wt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Q.MEDIA_CONTROLLER&&(i&&((s=(r=Gs(this,Wt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Qs(this,Wt,null)),a&&this.isConnected&&(Qs(this,Wt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=Gs(this,Wt))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const{style:r}=Ce(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const s=this.getAttribute(Q.MEDIA_CONTROLLER);s&&(Qs(this,Wt,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=Gs(this,Wt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=Gs(this,Wt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Qs(this,Wt,null)}};n(xh,"MediaTextDisplay");let ii=xh;Wt=new WeakMap;ii.shadowRootOptions={mode:"open"};ii.getTemplateHTML=tT;ii.getSlotTemplateHTML=iT;E.customElements.get("media-text-display")||E.customElements.define("media-text-display",ii);var fE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$k"),xp=n((t,e,i)=>(fE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$k"),aT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$k"),rT=n((t,e,i,a)=>(fE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$h"),Sn;function nT(t,e){return`
    <slot>${Ui(e.mediaDuration)}</slot>
  `}n(nT,"getSlotTemplateHTML$h");const Oh=class Oh extends ii{constructor(){var e;super(),aT(this,Sn,void 0),rT(this,Sn,this.shadowRoot.querySelector("slot")),xp(this,Sn).textContent=Ui((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===c.MEDIA_DURATION&&(xp(this,Sn).textContent=Ui(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return oe(this,c.MEDIA_DURATION)}set mediaDuration(e){ve(this,c.MEDIA_DURATION,e)}};n(Oh,"MediaDurationDisplay");let Il=Oh;Sn=new WeakMap;Il.getSlotTemplateHTML=nT;E.customElements.get("media-duration-display")||E.customElements.define("media-duration-display",Il);const sT={2:D("Network Error"),3:D("Decode Error"),4:D("Source Not Supported"),5:D("Encryption Error")},oT={2:D("A network error caused the media download to fail."),3:D("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:D("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:D("The media is encrypted and there are no keys to decrypt it.")},EE=n(t=>{var e,i;return t.code===1?null:{title:(e=sT[t.code])!=null?e:`Error ${t.code}`,message:(i=oT[t.code])!=null?i:t.message}},"formatError");var bE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$j"),lT=n((t,e,i)=>(bE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$j"),dT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$j"),uT=n((t,e,i,a)=>(bE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$g"),Lo;function cT(t){return`
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
      ${_E({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}n(cT,"getSlotTemplateHTML$g");function hT(t){return t.code&&EE(t)!==null}n(hT,"shouldOpenErrorDialog");function _E(t){var e;const{title:i,message:a}=(e=EE(t))!=null?e:{};let r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}n(_E,"formatErrorMessage");const Op=[c.MEDIA_ERROR_CODE,c.MEDIA_ERROR_MESSAGE],Nh=class Nh extends Hi{constructor(){super(...arguments),dT(this,Lo,null)}static get observedAttributes(){return[...super.observedAttributes,...Op]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!Op.includes(e))return;const s=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};this.open=hT(s),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(s))}get mediaError(){return lT(this,Lo)}set mediaError(e){uT(this,Lo,e)}get mediaErrorCode(){return oe(this,"mediaerrorcode")}set mediaErrorCode(e){ve(this,"mediaerrorcode",e)}get mediaErrorMessage(){return le(this,"mediaerrormessage")}set mediaErrorMessage(e){de(this,"mediaerrormessage",e)}};n(Nh,"MediaErrorDialog");let Yr=Nh;Lo=new WeakMap;Yr.getSlotTemplateHTML=cT;Yr.formatErrorMessage=_E;E.customElements.get("media-error-dialog")||E.customElements.define("media-error-dialog",Yr);var gE=Yr,mT=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$i"),Ai=n((t,e,i)=>(mT(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$i"),Np=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$i"),Wa,Fa;function pT(t){return`
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
      ${vT()}
    </slot>
  `}n(pT,"getSlotTemplateHTML$f");function vT(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((s,o)=>o>0?`<span class="key-separator">or</span><span class="key">${s}</span>`:`<span class="key">${s}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}n(vT,"formatKeyboardShortcuts");const Ph=class Ph extends Hi{constructor(){super(...arguments),Np(this,Wa,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const r=e.composedPath(),s=r[0]===this||r.includes(this),o=r.includes(a);s&&!o&&(this.open=!1)}),Np(this,Fa,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",Ai(this,Wa)),document.addEventListener("keydown",Ai(this,Fa)))}disconnectedCallback(){this.removeEventListener("click",Ai(this,Wa)),document.removeEventListener("keydown",Ai(this,Fa))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",Ai(this,Wa)),document.addEventListener("keydown",Ai(this,Fa))):(this.removeEventListener("click",Ai(this,Wa)),document.removeEventListener("keydown",Ai(this,Fa))))}};n(Ph,"MediaKeyboardShortcutsDialog");let Rl=Ph;Wa=new WeakMap;Fa=new WeakMap;Rl.getSlotTemplateHTML=pT;E.customElements.get("media-keyboard-shortcuts-dialog")||E.customElements.define("media-keyboard-shortcuts-dialog",Rl);var yE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$h"),fT=n((t,e,i)=>(yE(t,e,"read from private field"),e.get(t)),"__privateGet$h"),ET=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$h"),bT=n((t,e,i,a)=>(yE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$f"),Do;const _T=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,gT=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function yT(t){return`
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
      <slot name="enter">${_T}</slot>
      <slot name="exit">${gT}</slot>
    </slot>
  `}n(yT,"getSlotTemplateHTML$e");function TT(){return`
    <slot name="tooltip-enter">${D("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${D("Exit fullscreen mode")}</slot>
  `}n(TT,"getTooltipContentHTML$c");const Pp=n(t=>{const e=t.mediaIsFullscreen?D("exit fullscreen mode"):D("enter fullscreen mode");t.setAttribute("aria-label",e)},"updateAriaLabel$5"),$h=class $h extends we{constructor(){super(...arguments),ET(this,Do,null)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_FULLSCREEN,c.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Pp(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_FULLSCREEN&&Pp(this)}get mediaFullscreenUnavailable(){return le(this,c.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){de(this,c.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return K(this,c.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){V(this,c.MEDIA_IS_FULLSCREEN,e)}handleClick(e){bT(this,Do,e);const i=fT(this,Do)instanceof PointerEvent,a=this.mediaIsFullscreen?new E.CustomEvent(C.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new E.CustomEvent(C.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}};n($h,"MediaFullscreenButton");let os=$h;Do=new WeakMap;os.getSlotTemplateHTML=yT;os.getTooltipContentHTML=TT;E.customElements.get("media-fullscreen-button")||E.customElements.define("media-fullscreen-button",os);const{MEDIA_TIME_IS_LIVE:Mo,MEDIA_PAUSED:Wn}=c,{MEDIA_SEEK_TO_LIVE_REQUEST:AT,MEDIA_PLAY_REQUEST:kT}=C,ST='<svg viewBox="0 0 6 12"><circle cx="3" cy="6" r="2"></circle></svg>';function wT(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${Mo}]:not([${Wn}])) slot[name=indicator] > *,
      :host([${Mo}]:not([${Wn}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${Mo}]:not([${Wn}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${ST}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${D("live")}</slot>
  `}n(wT,"getSlotTemplateHTML$d");const $p=n(t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=D(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const r=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');r&&(r.textContent=D("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")},"updateAriaAttributes"),Uh=class Uh extends we{static get observedAttributes(){return[...super.observedAttributes,Mo,Wn]}connectedCallback(){super.connectedCallback(),$p(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),$p(this)}get mediaPaused(){return K(this,c.MEDIA_PAUSED)}set mediaPaused(e){V(this,c.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return K(this,c.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){V(this,c.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new E.CustomEvent(AT,{composed:!0,bubbles:!0})),this.hasAttribute(Wn)&&this.dispatchEvent(new E.CustomEvent(kT,{composed:!0,bubbles:!0})))}};n(Uh,"MediaLiveButton");let Cl=Uh;Cl.getSlotTemplateHTML=wT;E.customElements.get("media-live-button")||E.customElements.define("media-live-button",Cl);var TE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$g"),on=n((t,e,i)=>(TE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$g"),Up=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$g"),ln=n((t,e,i,a)=>(TE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$e"),Ft,xo;const Zs={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},AE=500,IT=`
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
`;function RT(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${AE}ms);
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

    <slot name="icon">${IT}</slot>
    <div id="status" role="status" aria-live="polite">${D("media loading")}</div>
  `}n(RT,"getTemplateHTML$a");const Hh=class Hh extends E.HTMLElement{constructor(){if(super(),Up(this,Ft,void 0),Up(this,xo,AE),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,c.MEDIA_PAUSED,c.MEDIA_LOADING,Zs.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===Zs.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===Q.MEDIA_CONTROLLER&&(i&&((s=(r=on(this,Ft))==null?void 0:r.unassociateElement)==null||s.call(r,this),ln(this,Ft,null)),a&&this.isConnected&&(ln(this,Ft,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=on(this,Ft))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(ln(this,Ft,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=on(this,Ft))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=on(this,Ft))==null?void 0:e.unassociateElement)==null||i.call(e,this),ln(this,Ft,null)}get loadingDelay(){return on(this,xo)}set loadingDelay(e){ln(this,xo,e);const{style:i}=Ce(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return K(this,c.MEDIA_PAUSED)}set mediaPaused(e){V(this,c.MEDIA_PAUSED,e)}get mediaLoading(){return K(this,c.MEDIA_LOADING)}set mediaLoading(e){V(this,c.MEDIA_LOADING,e)}get mediaController(){return le(this,Q.MEDIA_CONTROLLER)}set mediaController(e){de(this,Q.MEDIA_CONTROLLER,e)}get noAutohide(){return K(this,Zs.NO_AUTOHIDE)}set noAutohide(e){V(this,Zs.NO_AUTOHIDE,e)}};n(Hh,"MediaLoadingIndicator");let ls=Hh;Ft=new WeakMap;xo=new WeakMap;ls.shadowRootOptions={mode:"open"};ls.getTemplateHTML=RT;E.customElements.get("media-loading-indicator")||E.customElements.define("media-loading-indicator",ls);const CT=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,Hp=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,LT=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function DT(t){return`
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
      <slot name="off">${CT}</slot>
      <slot name="low">${Hp}</slot>
      <slot name="medium">${Hp}</slot>
      <slot name="high">${LT}</slot>
    </slot>
  `}n(DT,"getSlotTemplateHTML$c");function MT(){return`
    <slot name="tooltip-mute">${D("Mute")}</slot>
    <slot name="tooltip-unmute">${D("Unmute")}</slot>
  `}n(MT,"getTooltipContentHTML$b");const Bp=n(t=>{const e=t.mediaVolumeLevel==="off",i=D(e?"unmute":"mute");t.setAttribute("aria-label",i)},"updateAriaLabel$4"),Bh=class Bh extends we{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),Bp(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_VOLUME_LEVEL&&Bp(this)}get mediaVolumeLevel(){return le(this,c.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){de(this,c.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?C.MEDIA_UNMUTE_REQUEST:C.MEDIA_MUTE_REQUEST;this.dispatchEvent(new E.CustomEvent(e,{composed:!0,bubbles:!0}))}};n(Bh,"MediaMuteButton");let ds=Bh;ds.getSlotTemplateHTML=DT;ds.getTooltipContentHTML=MT;E.customElements.get("media-mute-button")||E.customElements.define("media-mute-button",ds);const Wp=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function xT(t){return`
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
      <slot name="enter">${Wp}</slot>
      <slot name="exit">${Wp}</slot>
    </slot>
  `}n(xT,"getSlotTemplateHTML$b");function OT(){return`
    <slot name="tooltip-enter">${D("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${D("Exit picture in picture mode")}</slot>
  `}n(OT,"getTooltipContentHTML$a");const Fp=n(t=>{const e=t.mediaIsPip?D("exit picture in picture mode"):D("enter picture in picture mode");t.setAttribute("aria-label",e)},"updateAriaLabel$3"),Wh=class Wh extends we{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_IS_PIP,c.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Fp(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_IS_PIP&&Fp(this)}get mediaPipUnavailable(){return le(this,c.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){de(this,c.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return K(this,c.MEDIA_IS_PIP)}set mediaIsPip(e){V(this,c.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?C.MEDIA_EXIT_PIP_REQUEST:C.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new E.CustomEvent(e,{composed:!0,bubbles:!0}))}};n(Wh,"MediaPipButton");let us=Wh;us.getSlotTemplateHTML=xT;us.getTooltipContentHTML=OT;E.customElements.get("media-pip-button")||E.customElements.define("media-pip-button",us);var NT=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$f"),La=n((t,e,i)=>(NT(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$f"),PT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$f"),Ii;const Sd={RATES:"rates"},kE=[1,1.2,1.5,1.7,2],sr=1;function $T(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||sr}x</slot>
  `}n($T,"getSlotTemplateHTML$a");function UT(){return D("Playback rate")}n(UT,"getTooltipContentHTML$9");const Fh=class Fh extends we{constructor(){var e;super(),PT(this,Ii,new es(this,Sd.RATES,{defaultValue:kE})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:sr}x`}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE,Sd.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===Sd.RATES&&(La(this,Ii).value=a),e===c.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,s=Number.isNaN(r)?sr:r;this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",D("Playback rate {playbackRate}",{playbackRate:s}))}}get rates(){return La(this,Ii)}set rates(e){e?Array.isArray(e)?La(this,Ii).value=e.join(" "):typeof e=="string"&&(La(this,Ii).value=e):La(this,Ii).value=""}get mediaPlaybackRate(){return oe(this,c.MEDIA_PLAYBACK_RATE,sr)}set mediaPlaybackRate(e){ve(this,c.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(La(this,Ii).values(),o=>+o).sort((o,l)=>o-l),r=(i=(e=a.find(o=>o>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:sr,s=new E.CustomEvent(C.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(s)}};n(Fh,"MediaPlaybackRateButton");let cs=Fh;Ii=new WeakMap;cs.getSlotTemplateHTML=$T;cs.getTooltipContentHTML=UT;E.customElements.get("media-playback-rate-button")||E.customElements.define("media-playback-rate-button",cs);const HT=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,BT=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function WT(t){return`
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
      <slot name="play">${HT}</slot>
      <slot name="pause">${BT}</slot>
    </slot>
  `}n(WT,"getSlotTemplateHTML$9");function FT(){return`
    <slot name="tooltip-play">${D("Play")}</slot>
    <slot name="tooltip-pause">${D("Pause")}</slot>
  `}n(FT,"getTooltipContentHTML$8");const Kp=n(t=>{const e=t.mediaPaused?D("play"):D("pause");t.setAttribute("aria-label",e)},"updateAriaLabel$2"),Kh=class Kh extends we{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PAUSED,c.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),Kp(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===c.MEDIA_PAUSED||e===c.MEDIA_LANG)&&Kp(this)}get mediaPaused(){return K(this,c.MEDIA_PAUSED)}set mediaPaused(e){V(this,c.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?C.MEDIA_PLAY_REQUEST:C.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new E.CustomEvent(e,{composed:!0,bubbles:!0}))}};n(Kh,"MediaPlayButton");let hs=Kh;hs.getSlotTemplateHTML=WT;hs.getTooltipContentHTML=FT;E.customElements.get("media-play-button")||E.customElements.define("media-play-button",hs);const Mt={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function KT(t){return`
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
  `}n(KT,"getTemplateHTML$9");const VT=n(t=>{t.style.removeProperty("background-image")},"unsetBackgroundImage"),qT=n((t,e)=>{t.style["background-image"]=`url('${e}')`},"setBackgroundImage"),Vh=class Vh extends E.HTMLElement{static get observedAttributes(){return[Mt.PLACEHOLDER_SRC,Mt.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Mt.SRC&&(a==null?this.image.removeAttribute(Mt.SRC):this.image.setAttribute(Mt.SRC,a)),e===Mt.PLACEHOLDER_SRC&&(a==null?VT(this.image):qT(this.image,a))}get placeholderSrc(){return le(this,Mt.PLACEHOLDER_SRC)}set placeholderSrc(e){de(this,Mt.SRC,e)}get src(){return le(this,Mt.SRC)}set src(e){de(this,Mt.SRC,e)}};n(Vh,"MediaPosterImage");let ms=Vh;ms.shadowRootOptions={mode:"open"};ms.getTemplateHTML=KT;E.customElements.get("media-poster-image")||E.customElements.define("media-poster-image",ms);var SE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$e"),YT=n((t,e,i)=>(SE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$e"),GT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$e"),QT=n((t,e,i,a)=>(SE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$d"),Oo;const qh=class qh extends ii{constructor(){super(),GT(this,Oo,void 0),QT(this,Oo,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PREVIEW_CHAPTER,c.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===c.MEDIA_PREVIEW_CHAPTER||e===c.MEDIA_LANG)&&a!==i&&a!=null)if(YT(this,Oo).textContent=a,a!==""){const r=D("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",r)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return le(this,c.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){de(this,c.MEDIA_PREVIEW_CHAPTER,e)}};n(qh,"MediaPreviewChapterDisplay");let ku=qh;Oo=new WeakMap;E.customElements.get("media-preview-chapter-display")||E.customElements.define("media-preview-chapter-display",ku);var wE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$d"),js=n((t,e,i)=>(wE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$d"),ZT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$d"),zs=n((t,e,i,a)=>(wE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$c"),Kt;function jT(t){return`
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
  `}n(jT,"getTemplateHTML$8");const Yh=class Yh extends E.HTMLElement{constructor(){if(super(),ZT(this,Kt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[Q.MEDIA_CONTROLLER,c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const r=this.getAttribute(Q.MEDIA_CONTROLLER);r&&(zs(this,Kt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=js(this,Kt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=js(this,Kt))==null?void 0:e.unassociateElement)==null||i.call(e,this),zs(this,Kt,null)}attributeChangedCallback(e,i,a){var r,s,o,l,d;[c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===Q.MEDIA_CONTROLLER&&(i&&((s=(r=js(this,Kt))==null?void 0:r.unassociateElement)==null||s.call(r,this),zs(this,Kt,null)),a&&this.isConnected&&(zs(this,Kt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=js(this,Kt))==null?void 0:l.associateElement)==null||d.call(l,this)))}get mediaPreviewImage(){return le(this,c.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){de(this,c.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(c.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(c.MEDIA_PREVIEW_COORDS);return}this.setAttribute(c.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,r,s,o]=e,l=i.split("#")[0],d=getComputedStyle(this),{maxWidth:u,maxHeight:p,minWidth:v,minHeight:m}=d,h=Math.min(parseInt(u)/s,parseInt(p)/o),f=Math.max(parseInt(v)/s,parseInt(m)/o),_=h<1,b=_?h:f>1?f:1,{style:y}=Ce(this.shadowRoot,":host"),A=Ce(this.shadowRoot,"img").style,g=this.shadowRoot.querySelector("img"),w=_?"min":"max";y.setProperty(`${w}-width`,"initial","important"),y.setProperty(`${w}-height`,"initial","important"),y.width=`${s*b}px`,y.height=`${o*b}px`;const M=n(()=>{A.width=`${this.imgWidth*b}px`,A.height=`${this.imgHeight*b}px`,A.display="block"},"resize");g.src!==l&&(g.onload=()=>{this.imgWidth=g.naturalWidth,this.imgHeight=g.naturalHeight,M()},g.src=l,M()),M(),A.transform=`translate(-${a*b}px, -${r*b}px)`}};n(Yh,"MediaPreviewThumbnail");let Gr=Yh;Kt=new WeakMap;Gr.shadowRootOptions={mode:"open"};Gr.getTemplateHTML=jT;E.customElements.get("media-preview-thumbnail")||E.customElements.define("media-preview-thumbnail",Gr);var Vp=Gr,IE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$c"),qp=n((t,e,i)=>(IE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$c"),zT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$c"),XT=n((t,e,i,a)=>(IE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$b"),wn;const Gh=class Gh extends ii{constructor(){super(),zT(this,wn,void 0),XT(this,wn,this.shadowRoot.querySelector("slot")),qp(this,wn).textContent=Ui(0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_PREVIEW_TIME&&a!=null&&(qp(this,wn).textContent=Ui(parseFloat(a)))}get mediaPreviewTime(){return oe(this,c.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){ve(this,c.MEDIA_PREVIEW_TIME,e)}};n(Gh,"MediaPreviewTimeDisplay");let Su=Gh;wn=new WeakMap;E.customElements.get("media-preview-time-display")||E.customElements.define("media-preview-time-display",Su);const Da={SEEK_OFFSET:"seekoffset"},wd=30,JT=n(t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`,"backwardIcon");function eA(t,e){return`
    <slot name="icon">${JT(e.seekOffset)}</slot>
  `}n(eA,"getSlotTemplateHTML$8");function tA(){return D("Seek backward")}n(tA,"getTooltipContentHTML$7");const iA=0,Qh=class Qh extends we{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_CURRENT_TIME,Da.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=oe(this,Da.SEEK_OFFSET,wd)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===Da.SEEK_OFFSET&&(this.seekOffset=oe(this,Da.SEEK_OFFSET,wd))}get seekOffset(){return oe(this,Da.SEEK_OFFSET,wd)}set seekOffset(e){ve(this,Da.SEEK_OFFSET,e),this.setAttribute("aria-label",D("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),$f(Uf(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return oe(this,c.MEDIA_CURRENT_TIME,iA)}set mediaCurrentTime(e){ve(this,c.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new E.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};n(Qh,"MediaSeekBackwardButton");let ps=Qh;ps.getSlotTemplateHTML=eA;ps.getTooltipContentHTML=tA;E.customElements.get("media-seek-backward-button")||E.customElements.define("media-seek-backward-button",ps);const Ma={SEEK_OFFSET:"seekoffset"},Id=30,aA=n(t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`,"forwardIcon");function rA(t,e){return`
    <slot name="icon">${aA(e.seekOffset)}</slot>
  `}n(rA,"getSlotTemplateHTML$7");function nA(){return D("Seek forward")}n(nA,"getTooltipContentHTML$6");const sA=0,Zh=class Zh extends we{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_CURRENT_TIME,Ma.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=oe(this,Ma.SEEK_OFFSET,Id)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===Ma.SEEK_OFFSET&&(this.seekOffset=oe(this,Ma.SEEK_OFFSET,Id))}get seekOffset(){return oe(this,Ma.SEEK_OFFSET,Id)}set seekOffset(e){ve(this,Ma.SEEK_OFFSET,e),this.setAttribute("aria-label",D("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),$f(Uf(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return oe(this,c.MEDIA_CURRENT_TIME,sA)}set mediaCurrentTime(e){ve(this,c.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new E.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};n(Zh,"MediaSeekForwardButton");let vs=Zh;vs.getSlotTemplateHTML=rA;vs.getTooltipContentHTML=nA;E.customElements.get("media-seek-forward-button")||E.customElements.define("media-seek-forward-button",vs);var RE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$b"),Rd=n((t,e,i)=>(RE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$b"),oA=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$b"),lA=n((t,e,i,a)=>(RE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$a"),Ka;const zi={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},Yp=[...Object.values(zi),c.MEDIA_CURRENT_TIME,c.MEDIA_DURATION,c.MEDIA_SEEKABLE],Gp=["Enter"," "],dA="&nbsp;/&nbsp;",wu=n((t,{timesSep:e=dA}={})=>{var i,a;const r=(i=t.mediaCurrentTime)!=null?i:0,[,s]=(a=t.mediaSeekable)!=null?a:[];let o=0;Number.isFinite(t.mediaDuration)?o=t.mediaDuration:Number.isFinite(s)&&(o=s);const l=t.remaining?Ui(0-(o-r)):Ui(r);return t.showDuration?`${l}${e}${Ui(o)}`:l},"formatTimesLabel"),uA="video not loaded, unknown time.",cA=n(t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-valuetext",uA);return}const s=t.remaining?Hn(0-(r-i)):Hn(i);if(!t.showDuration){t.setAttribute("aria-valuetext",s);return}const o=Hn(r),l=`${s} of ${o}`;t.setAttribute("aria-valuetext",l)},"updateAriaValueText$1");function hA(t,e){return`
    <slot>${wu(e)}</slot>
  `}n(hA,"getSlotTemplateHTML$6");const jh=class jh extends ii{constructor(){super(),oA(this,Ka,void 0),lA(this,Ka,this.shadowRoot.querySelector("slot")),Rd(this,Ka).innerHTML=`${wu(this)}`}static get observedAttributes(){return[...super.observedAttributes,...Yp,"disabled"]}connectedCallback(){const{style:e}=Ce(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.hasAttribute("disabled")||this.enable(),this.setAttribute("role","progressbar"),this.setAttribute("aria-label",D("playback time"));const i=n(a=>{const{key:r}=a;if(!Gp.includes(r)){this.removeEventListener("keyup",i);return}this.toggleTimeDisplay()},"keyUpHandler");this.addEventListener("keydown",a=>{const{metaKey:r,altKey:s,key:o}=a;if(r||s||!Gp.includes(o)){this.removeEventListener("keyup",i);return}this.addEventListener("keyup",i)}),this.addEventListener("click",this.toggleTimeDisplay),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),super.disconnectedCallback()}attributeChangedCallback(e,i,a){Yp.includes(e)?this.update():e==="disabled"&&a!==i&&(a==null?this.enable():this.disable()),super.attributeChangedCallback(e,i,a)}enable(){this.tabIndex=0}disable(){this.tabIndex=-1}get remaining(){return K(this,zi.REMAINING)}set remaining(e){V(this,zi.REMAINING,e)}get showDuration(){return K(this,zi.SHOW_DURATION)}set showDuration(e){V(this,zi.SHOW_DURATION,e)}get noToggle(){return K(this,zi.NO_TOGGLE)}set noToggle(e){V(this,zi.NO_TOGGLE,e)}get mediaDuration(){return oe(this,c.MEDIA_DURATION)}set mediaDuration(e){ve(this,c.MEDIA_DURATION,e)}get mediaCurrentTime(){return oe(this,c.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){ve(this,c.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(c.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(c.MEDIA_SEEKABLE);return}this.setAttribute(c.MEDIA_SEEKABLE,e.join(":"))}update(){const e=wu(this);cA(this),e!==Rd(this,Ka).innerHTML&&(Rd(this,Ka).innerHTML=e)}};n(jh,"MediaTimeDisplay");let Ll=jh;Ka=new WeakMap;Ll.getSlotTemplateHTML=hA;E.customElements.get("media-time-display")||E.customElements.define("media-time-display",Ll);var CE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$a"),Me=n((t,e,i)=>(CE(t,e,"read from private field"),e.get(t)),"__privateGet$a"),xt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$a"),tt=n((t,e,i,a)=>(CE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$9"),mA=n((t,e,i,a)=>({set _(r){tt(t,e,r)},get _(){return Me(t,e)}}),"__privateWrapper"),Va,No,qa,In,Po,$o,Uo,Ya,Xi,Ho;const zh=class zh{constructor(e,i,a){xt(this,Va,void 0),xt(this,No,void 0),xt(this,qa,void 0),xt(this,In,void 0),xt(this,Po,void 0),xt(this,$o,void 0),xt(this,Uo,void 0),xt(this,Ya,void 0),xt(this,Xi,0),xt(this,Ho,(r=performance.now())=>{tt(this,Xi,requestAnimationFrame(Me(this,Ho))),tt(this,In,performance.now()-Me(this,qa));const s=1e3/this.fps;if(Me(this,In)>s){tt(this,qa,r-Me(this,In)%s);const o=1e3/((r-Me(this,No))/++mA(this,Po)._),l=(r-Me(this,$o))/1e3/this.duration;let d=Me(this,Uo)+l*this.playbackRate;d-Me(this,Va).valueAsNumber>0?tt(this,Ya,this.playbackRate/this.duration/o):(tt(this,Ya,.995*Me(this,Ya)),d=Me(this,Va).valueAsNumber+Me(this,Ya)),this.callback(d)}}),tt(this,Va,e),this.callback=i,this.fps=a}start(){Me(this,Xi)===0&&(tt(this,qa,performance.now()),tt(this,No,Me(this,qa)),tt(this,Po,0),Me(this,Ho).call(this))}stop(){Me(this,Xi)!==0&&(cancelAnimationFrame(Me(this,Xi)),tt(this,Xi,0))}update({start:e,duration:i,playbackRate:a}){const r=e-Me(this,Va).valueAsNumber,s=Math.abs(i-this.duration);(r>0||r<-.03||s>=.5)&&this.callback(e),tt(this,Uo,e),tt(this,$o,performance.now()),this.duration=i,this.playbackRate=a}};n(zh,"RangeAnimation");let Iu=zh;Va=new WeakMap;No=new WeakMap;qa=new WeakMap;In=new WeakMap;Po=new WeakMap;$o=new WeakMap;Uo=new WeakMap;Ya=new WeakMap;Xi=new WeakMap;Ho=new WeakMap;var Gc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$9"),fe=n((t,e,i)=>(Gc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$9"),Ie=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$9"),ht=n((t,e,i,a)=>(Gc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$8"),He=n((t,e,i)=>(Gc(t,e,"access private method"),i),"__privateMethod$8"),Ga,Ea,Dl,Fn,Ml,Bo,fs,Es,Qa,Za,ja,Rn,Qc,LE,Ru,xl,Zc,Ol,jc,Nl,zc,Cu,DE,bs,Pl,Lu,ME;const pA="video not loaded, unknown time.",vA=n(t=>{const e=t.range,i=Hn(+xE(t)),a=Hn(+t.mediaSeekableEnd),r=i&&a?`${i} of ${a}`:pA;e.setAttribute("aria-valuetext",r)},"updateAriaValueText");function fA(t){return`
    ${Bi.getTemplateHTML(t)}
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
          <template shadowrootmode="${Vp.shadowRootOptions.mode}">
            ${Vp.getTemplateHTML({})}
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
  `}n(fA,"getTemplateHTML$7");const Xs=n((t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},"calcRangeValueFromTime"),xE=n((t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i},"calcTimeFromRangeValue"),Xh=class Xh extends Bi{constructor(){super(),Ie(this,ja),Ie(this,Qc),Ie(this,xl),Ie(this,Ol),Ie(this,Nl),Ie(this,Cu),Ie(this,bs),Ie(this,Lu),Ie(this,Ga,void 0),Ie(this,Ea,void 0),Ie(this,Dl,void 0),Ie(this,Fn,void 0),Ie(this,Ml,void 0),Ie(this,Bo,void 0),Ie(this,fs,void 0),Ie(this,Es,void 0),Ie(this,Qa,void 0),Ie(this,Za,void 0),Ie(this,Ru,a=>{this.dragging||(Mc(a)&&(this.range.valueAsNumber=a),fe(this,Za)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),ht(this,Dl,this.shadowRoot.querySelectorAll('[part~="box"]')),ht(this,Ml,this.shadowRoot.querySelector('[part~="preview-box"]')),ht(this,Bo,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);ht(this,fs,parseInt(i.getPropertyValue("--media-box-padding-left"))),ht(this,Es,parseInt(i.getPropertyValue("--media-box-padding-right"))),ht(this,Ea,new Iu(this.range,fe(this,Ru),60))}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PAUSED,c.MEDIA_DURATION,c.MEDIA_SEEKABLE,c.MEDIA_CURRENT_TIME,c.MEDIA_PREVIEW_IMAGE,c.MEDIA_PREVIEW_TIME,c.MEDIA_PREVIEW_CHAPTER,c.MEDIA_BUFFERED,c.MEDIA_PLAYBACK_RATE,c.MEDIA_LOADING,c.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",D("seek")),He(this,ja,Rn).call(this),ht(this,Ga,this.getRootNode()),(e=fe(this,Ga))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),He(this,ja,Rn).call(this),(e=fe(this,Ga))==null||e.removeEventListener("transitionstart",this),ht(this,Ga,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===c.MEDIA_CURRENT_TIME||e===c.MEDIA_PAUSED||e===c.MEDIA_ENDED||e===c.MEDIA_LOADING||e===c.MEDIA_DURATION||e===c.MEDIA_SEEKABLE?(fe(this,Ea).update({start:Xs(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),He(this,ja,Rn).call(this),vA(this)):e===c.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===c.MEDIA_DURATION||e===c.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=fe(this,Qa),this.updateBar()))}get mediaChaptersCues(){return fe(this,Qa)}set mediaChaptersCues(e){var i;ht(this,Qa,e),this.updateSegments((i=fe(this,Qa))==null?void 0:i.map(a=>({start:Xs(this,a.startTime),end:Xs(this,a.endTime)})))}get mediaPaused(){return K(this,c.MEDIA_PAUSED)}set mediaPaused(e){V(this,c.MEDIA_PAUSED,e)}get mediaLoading(){return K(this,c.MEDIA_LOADING)}set mediaLoading(e){V(this,c.MEDIA_LOADING,e)}get mediaDuration(){return oe(this,c.MEDIA_DURATION)}set mediaDuration(e){ve(this,c.MEDIA_DURATION,e)}get mediaCurrentTime(){return oe(this,c.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){ve(this,c.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return oe(this,c.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){ve(this,c.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(c.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(c.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(c.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(c.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(c.MEDIA_SEEKABLE);return}this.setAttribute(c.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return le(this,c.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){de(this,c.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return oe(this,c.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){ve(this,c.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return K(this,c.MEDIA_ENDED)}set mediaEnded(e){V(this,c.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const s=this.mediaCurrentTime,[,o=this.mediaSeekableStart]=(e=i.find(([l,d])=>l<=s&&s<=d))!=null?e:[];a=Xs(this,o)}const{style:r}=Ce(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=Ce(this.shadowRoot,"#current-rail"),a=Ce(this.shadowRoot,'[part~="current-box"]'),r=He(this,xl,Zc).call(this,fe(this,Bo)),s=He(this,Ol,jc).call(this,r,this.range.valueAsNumber),o=He(this,Nl,zc).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${s})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${o}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":He(this,Lu,ME).call(this);break;case"pointermove":He(this,Cu,DE).call(this,e);break;case"pointerup":fe(this,Za)&&ht(this,Za,!1);break;case"pointerdown":ht(this,Za,!0);break;case"pointerleave":He(this,bs,Pl).call(this,null);break;case"transitionstart":_i(e.target,this)&&setTimeout(()=>He(this,ja,Rn).call(this),0);break}}};n(Xh,"MediaTimeRange");let _s=Xh;Ga=new WeakMap;Ea=new WeakMap;Dl=new WeakMap;Fn=new WeakMap;Ml=new WeakMap;Bo=new WeakMap;fs=new WeakMap;Es=new WeakMap;Qa=new WeakMap;Za=new WeakMap;ja=new WeakSet;Rn=n(function(){He(this,Qc,LE).call(this)?fe(this,Ea).start():fe(this,Ea).stop()},"toggleRangeAnimation_fn");Qc=new WeakSet;LE=n(function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&Hf(this)},"shouldRangeAnimate_fn");Ru=new WeakMap;xl=new WeakSet;Zc=n(function(t){var e;const a=((e=this.getAttribute("bounds")?en(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),s=t.offsetWidth,o=-(r.left-a.left-s/2),l=a.right-r.left-s/2;return{box:{width:s,min:o,max:l},bounds:a,range:r}},"getElementRects_fn");Ol=new WeakSet;jc=n(function(t,e){let i=`${e*100}%`;const{width:a,min:r,max:s}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(s)){const l=`calc(1 / var(--_range-width) * 100 * ${s}% - var(--media-box-padding-right))`;i=`min(${i}, ${l})`}return i},"getBoxPosition_fn");Nl=new WeakSet;zc=n(function(t,e){const{width:i,min:a,max:r}=t.box,s=e*t.range.width;if(s<a+fe(this,fs)){const o=t.range.left-t.bounds.left-fe(this,fs);return`${s-i/2+o}px`}if(s>r-fe(this,Es)){const o=t.bounds.right-t.range.right-fe(this,Es);return`${s+i/2-o-t.range.width}px`}return 0},"getBoxShiftPosition_fn");Cu=new WeakSet;DE=n(function(t){const e=[...fe(this,Dl)].some(p=>t.composedPath().includes(p));if(!this.dragging&&(e||!t.composedPath().includes(this))){He(this,bs,Pl).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=Ce(this.shadowRoot,"#preview-rail"),r=Ce(this.shadowRoot,'[part~="preview-box"]'),s=He(this,xl,Zc).call(this,fe(this,Ml));let o=(t.clientX-s.range.left)/s.range.width;o=Math.max(0,Math.min(1,o));const l=He(this,Ol,jc).call(this,s,o),d=He(this,Nl,zc).call(this,s,o);a.style.transform=`translateX(${l})`,a.style.setProperty("--_range-width",`${s.range.width}`),r.style.setProperty("--_box-shift",`${d}`),r.style.setProperty("--_box-width",`${s.box.width}px`);const u=Math.round(fe(this,Fn))-Math.round(o*i);Math.abs(u)<1&&o>.01&&o<.99||(ht(this,Fn,o*i),He(this,bs,Pl).call(this,fe(this,Fn)))},"handlePointerMove_fn");bs=new WeakSet;Pl=n(function(t){this.dispatchEvent(new E.CustomEvent(C.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))},"previewRequest_fn");Lu=new WeakSet;ME=n(function(){fe(this,Ea).stop();const t=xE(this);this.dispatchEvent(new E.CustomEvent(C.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))},"seekRequest_fn");_s.shadowRootOptions={mode:"open"};_s.getTemplateHTML=fA;E.customElements.get("media-time-range")||E.customElements.define("media-time-range",_s);const EA=1,bA=n(t=>t.mediaMuted?0:t.mediaVolume,"toVolume"),_A=n(t=>`${Math.round(t*100)}%`,"formatAsPercentString"),Jh=class Jh extends Bi{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_VOLUME,c.MEDIA_MUTED,c.MEDIA_VOLUME_UNAVAILABLE]}constructor(){super(),this.range.addEventListener("input",()=>{const e=this.range.value,i=new E.CustomEvent(C.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",D("volume"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===c.MEDIA_VOLUME||e===c.MEDIA_MUTED)&&(this.range.valueAsNumber=bA(this),this.range.setAttribute("aria-valuetext",_A(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return oe(this,c.MEDIA_VOLUME,EA)}set mediaVolume(e){ve(this,c.MEDIA_VOLUME,e)}get mediaMuted(){return K(this,c.MEDIA_MUTED)}set mediaMuted(e){V(this,c.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return le(this,c.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){de(this,c.MEDIA_VOLUME_UNAVAILABLE,e)}};n(Jh,"MediaVolumeRange");let Du=Jh;E.customElements.get("media-volume-range")||E.customElements.define("media-volume-range",Du);function gA(t){return`
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
    `}n(gA,"getSlotTemplateHTML$5");function yA(){return D("Loop")}n(yA,"getTooltipContentHTML$5");const em=class em extends we{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=D("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return K(this,c.MEDIA_LOOP)}set mediaLoop(e){V(this,c.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new E.CustomEvent(C.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};n(em,"MediaLoopButton");let gs=em;gs.getSlotTemplateHTML=gA;gs.getTooltipContentHTML=yA;E.customElements.get("media-loop-button")||E.customElements.define("media-loop-button",gs);var OE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$8"),B=n((t,e,i)=>(OE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$8"),Qt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$8"),mi=n((t,e,i,a)=>(OE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$7"),za,Wo,Ji,Cn,Ri,Ci,Li,ea,Xa,Fo,kt;const Qp=1,Zp=0,TA=1,AA={processCallback(t,e,i){if(i){for(const[a,r]of e)if(a in i){const s=i[a];typeof s=="boolean"&&r instanceof nt&&typeof r.element[r.attributeName]=="boolean"?r.booleanValue=s:typeof s=="function"&&r instanceof nt?r.element[r.attributeName]=s:r.value=s}}}},tm=class tm extends E.DocumentFragment{constructor(e,i,a=AA){var r;super(),Qt(this,za,void 0),Qt(this,Wo,void 0),this.append(e.content.cloneNode(!0)),mi(this,za,NE(this)),mi(this,Wo,a),(r=a.createCallback)==null||r.call(a,this,B(this,za),i),a.processCallback(this,B(this,za),i)}update(e){B(this,Wo).processCallback(this,B(this,za),e)}};n(tm,"TemplateInstance");let Qr=tm;za=new WeakMap;Wo=new WeakMap;const NE=n((t,e=[])=>{let i,a;for(const r of t.attributes||[])if(r.value.includes("{{")){const s=new Mu;for([i,a]of zp(r.value))if(!i)s.append(a);else{const o=new nt(t,r.name,r.namespaceURI);s.append(o),e.push([a,o])}r.value=s.toString()}for(const r of t.childNodes)if(r.nodeType===Qp&&!(r instanceof HTMLTemplateElement))NE(r,e);else{const s=r.data;if(r.nodeType===Qp||s.includes("{{")){const o=[];if(s)for([i,a]of zp(s))if(!i)o.push(new Text(a));else{const l=new Wi(t);o.push(l),e.push([a,l])}else if(r instanceof HTMLTemplateElement){const l=new Ul(t,r);o.push(l),e.push([l.expression,l])}r.replaceWith(...o.flatMap(l=>l.replacementNodes||[l]))}}return e},"parse"),jp={},zp=n(t=>{let e="",i=0,a=jp[t],r=0,s;if(a)return a;for(a=[];s=t[r];r++)s==="{"&&t[r+1]==="{"&&t[r-1]!=="\\"&&t[r+2]&&++i==1?(e&&a.push([Zp,e]),e="",r++):s==="}"&&t[r+1]==="}"&&t[r-1]!=="\\"&&!--i?(a.push([TA,e.trim()]),e="",r++):e+=s||"";return e&&a.push([Zp,(i>0?"{{":"")+e]),jp[t]=a},"tokenize$1"),kA=11,im=class im{get value(){return""}set value(e){}toString(){return this.value}};n(im,"Part");let $l=im;const PE=new WeakMap,am=class am{constructor(){Qt(this,Ji,[])}[Symbol.iterator](){return B(this,Ji).values()}get length(){return B(this,Ji).length}item(e){return B(this,Ji)[e]}append(...e){for(const i of e)i instanceof nt&&PE.set(i,this),B(this,Ji).push(i)}toString(){return B(this,Ji).join("")}};n(am,"AttrPartList");let Mu=am;Ji=new WeakMap;const rm=class rm extends $l{constructor(e,i,a){super(),Qt(this,ea),Qt(this,Cn,""),Qt(this,Ri,void 0),Qt(this,Ci,void 0),Qt(this,Li,void 0),mi(this,Ri,e),mi(this,Ci,i),mi(this,Li,a)}get attributeName(){return B(this,Ci)}get attributeNamespace(){return B(this,Li)}get element(){return B(this,Ri)}get value(){return B(this,Cn)}set value(e){B(this,Cn)!==e&&(mi(this,Cn,e),!B(this,ea,Xa)||B(this,ea,Xa).length===1?e==null?B(this,Ri).removeAttributeNS(B(this,Li),B(this,Ci)):B(this,Ri).setAttributeNS(B(this,Li),B(this,Ci),e):B(this,Ri).setAttributeNS(B(this,Li),B(this,Ci),B(this,ea,Xa).toString()))}get booleanValue(){return B(this,Ri).hasAttributeNS(B(this,Li),B(this,Ci))}set booleanValue(e){if(!B(this,ea,Xa)||B(this,ea,Xa).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}};n(rm,"AttrPart");let nt=rm;Cn=new WeakMap;Ri=new WeakMap;Ci=new WeakMap;Li=new WeakMap;ea=new WeakSet;Xa=n(function(){return PE.get(this)},"list_get");const nm=class nm extends $l{constructor(e,i){super(),Qt(this,Fo,void 0),Qt(this,kt,void 0),mi(this,Fo,e),mi(this,kt,i?[...i]:[new Text])}get replacementNodes(){return B(this,kt)}get parentNode(){return B(this,Fo)}get nextSibling(){return B(this,kt)[B(this,kt).length-1].nextSibling}get previousSibling(){return B(this,kt)[0].previousSibling}get value(){return B(this,kt).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){const i=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===kA?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);i.length||i.push(new Text),mi(this,kt,SA(B(this,kt)[0].parentNode,B(this,kt),i,this.nextSibling))}};n(nm,"ChildNodePart");let Wi=nm;Fo=new WeakMap;kt=new WeakMap;const sm=class sm extends Wi{constructor(e,i){const a=i.getAttribute("directive")||i.getAttribute("type");let r=i.getAttribute("expression")||i.getAttribute(a)||"";r.startsWith("{{")&&(r=r.trim().slice(2,-2).trim()),super(e),this.expression=r,this.template=i,this.directive=a}};n(sm,"InnerTemplatePart");let Ul=sm;function SA(t,e,i,a=null){let r=0,s,o,l,d=i.length,u=e.length;for(;r<d&&r<u&&e[r]==i[r];)r++;for(;r<d&&r<u&&i[d-1]==e[u-1];)a=i[--u,--d];if(r==u)for(;r<d;)t.insertBefore(i[r++],a);if(r==d)for(;r<u;)t.removeChild(e[r++]);else{for(s=e[r];r<d;)l=i[r++],o=s?s.nextSibling:a,s==l?s=o:r<d&&i[r]==o?(t.replaceChild(l,s),s=o):t.insertBefore(l,s);for(;s!=a;)o=s.nextSibling,t.removeChild(s),s=o}return i}n(SA,"swapdom");const Xp={string:n(t=>String(t),"string")},om=class om{constructor(e){this.template=e,this.state=void 0}};n(om,"PartialTemplate");let Hl=om;const da=new WeakMap,ua=new WeakMap,xu={partial:n((t,e)=>{e[t.expression]=new Hl(t.template)},"partial"),if:n((t,e)=>{var i;if($E(t.expression,e))if(da.get(t)!==t.template){da.set(t,t.template);const a=new Qr(t.template,e,Xc);t.replace(a),ua.set(t,a)}else(i=ua.get(t))==null||i.update(e);else t.replace(""),da.delete(t),ua.delete(t)},"if")},wA=Object.keys(xu),Xc={processCallback(t,e,i){var a,r;if(i)for(const[s,o]of e){if(o instanceof Ul){if(!o.directive){const d=wA.find(u=>o.template.hasAttribute(u));d&&(o.directive=d,o.expression=o.template.getAttribute(d))}(a=xu[o.directive])==null||a.call(xu,o,i);continue}let l=$E(s,i);if(l instanceof Hl){da.get(o)!==l.template?(da.set(o,l.template),l=new Qr(l.template,l.state,Xc),o.value=l,ua.set(o,l)):(r=ua.get(o))==null||r.update(l.state);continue}l?(o instanceof nt&&o.attributeName.startsWith("aria-")&&(l=String(l)),o instanceof nt?typeof l=="boolean"?o.booleanValue=l:typeof l=="function"?o.element[o.attributeName]=l:o.value=l:(o.value=l,da.delete(o),ua.delete(o))):o instanceof nt?o.value=void 0:(o.value=void 0,da.delete(o),ua.delete(o))}}},Jp={"!":n(t=>!t,"!"),"!!":n(t=>!!t,"!!"),"==":n((t,e)=>t==e,"=="),"!=":n((t,e)=>t!=e,"!="),">":n((t,e)=>t>e,">"),">=":n((t,e)=>t>=e,">="),"<":n((t,e)=>t<e,"<"),"<=":n((t,e)=>t<=e,"<="),"??":n((t,e)=>t??e,"??"),"|":n((t,e)=>{var i;return(i=Xp[e])==null?void 0:i.call(Xp,t)},"|")};function IA(t){return RA(t,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}n(IA,"tokenizeExpression");function $E(t,e={}){var i,a,r,s,o,l,d;const u=IA(t);if(u.length===0||u.some(({type:p})=>!p))return dn(t);if(((i=u[0])==null?void 0:i.token)===">"){const p=e[(a=u[1])==null?void 0:a.token];if(!p)return dn(t);const v={...e};p.state=v;const m=u.slice(2);for(let h=0;h<m.length;h+=3){const f=(r=m[h])==null?void 0:r.token,_=(s=m[h+1])==null?void 0:s.token,b=(o=m[h+2])==null?void 0:o.token;f&&_==="="&&(v[f]=un(b,e))}return p}if(u.length===1)return Js(u[0])?un(u[0].token,e):dn(t);if(u.length===2){const p=(l=u[0])==null?void 0:l.token,v=Jp[p];if(!v||!Js(u[1]))return dn(t);const m=un(u[1].token,e);return v(m)}if(u.length===3){const p=(d=u[1])==null?void 0:d.token,v=Jp[p];if(!v||!Js(u[0])||!Js(u[2]))return dn(t);const m=un(u[0].token,e);if(p==="|")return v(m,u[2].token);const h=un(u[2].token,e);return v(m,h)}}n($E,"evaluateExpression");function dn(t){return!1}n(dn,"invalidExpression");function Js({type:t}){return["number","boolean","string","param"].includes(t)}n(Js,"isValidParam");function un(t,e){const i=t[0],a=t.slice(-1);return t==="true"||t==="false"?t==="true":i===a&&["'",'"'].includes(i)?t.slice(1,-1):Lf(t)?parseFloat(t):e[t]}n(un,"getParamValue");function RA(t,e){let i,a,r;const s=[];for(;t;){r=null,i=t.length;for(const o in e)a=e[o].exec(t),a&&a.index<i&&(r={token:a[0],type:o,matches:a.slice(1)},i=a.index);i&&s.push({token:t.substr(0,i),type:void 0}),r&&s.push(r),t=t.substr(i+(r?r.token.length:0))}return s}n(RA,"tokenize");var Jc=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$7"),Ou=n((t,e,i)=>(Jc(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$7"),cn=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$7"),ca=n((t,e,i,a)=>(Jc(t,e,"write to private field"),e.set(t,i),i),"__privateSet$6"),Cd=n((t,e,i)=>(Jc(t,e,"access private method"),i),"__privateMethod$7"),hr,Ko,mr,Nu,UE,Vo,Pu;const Ld={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},HE=Se.createElement("template");HE.innerHTML=`
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
`;const lm=class lm extends E.HTMLElement{constructor(){super(),cn(this,Nu),cn(this,Vo),cn(this,hr,void 0),cn(this,Ko,void 0),cn(this,mr,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer());const e=new MutationObserver(i=>{var a;this.mediaController&&!((a=this.mediaController)!=null&&a.breakpointsComputed)||i.some(r=>{const s=r.target;return s===this?!0:s.localName!=="media-controller"?!1:!!(Ld[r.attributeName]||r.attributeName.startsWith("breakpoint"))})&&this.render()});e.observe(this,{attributes:!0}),e.observe(this.renderRoot,{attributes:!0,subtree:!0}),this.addEventListener(Ei.BREAKPOINTS_COMPUTED,this.render),Cd(this,Nu,UE).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=Ou(this,hr))!=null?e:this.constructor.template}set template(e){if(e===null){this.removeAttribute("template");return}typeof e=="string"?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(ca(this,hr,e),ca(this,mr,null),this.createRenderer())}get props(){var e,i,a;const r=[...Array.from((i=(e=this.mediaController)==null?void 0:e.attributes)!=null?i:[]).filter(({name:o})=>Ld[o]||o.startsWith("breakpoint")),...Array.from(this.attributes)],s={};for(const o of r){const l=(a=Ld[o.name])!=null?a:U1(o.name);let{value:d}=o;d!=null?(Lf(d)&&(d=parseFloat(d)),s[l]=d===""?!0:d):s[l]=!1}return s}attributeChangedCallback(e,i,a){e==="template"&&i!=a&&Cd(this,Vo,Pu).call(this)}connectedCallback(){Cd(this,Vo,Pu).call(this)}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==Ou(this,Ko)&&(ca(this,Ko,this.template),this.renderer=new Qr(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(HE.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}};n(lm,"MediaThemeElement");let Zr=lm;hr=new WeakMap;Ko=new WeakMap;mr=new WeakMap;Nu=new WeakSet;UE=n(function(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}},"upgradeProperty_fn");Vo=new WeakSet;Pu=n(function(){var t;const e=this.getAttribute("template");if(!e||e===Ou(this,mr))return;const i=this.getRootNode(),a=(t=i?.getElementById)==null?void 0:t.call(i,e);if(a){ca(this,mr,e),ca(this,hr,a),this.createRenderer();return}CA(e)&&(ca(this,mr,e),LA(e).then(r=>{const s=Se.createElement("template");s.innerHTML=r,ca(this,hr,s),this.createRenderer()}).catch(console.error))},"updateTemplate_fn");Zr.observedAttributes=["template"];Zr.processor=Xc;function CA(t){if(!/^(\/|\.\/|https?:\/\/)/.test(t))return!1;const e=/^https?:\/\//.test(t)?void 0:location.origin;try{new URL(t,e)}catch{return!1}return!0}n(CA,"isValidUrl");async function LA(t){const e=await fetch(t);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}n(LA,"request");E.customElements.get("media-theme")||E.customElements.define("media-theme",Zr);function DA({anchor:t,floating:e,placement:i}){const a=MA({anchor:t,floating:e}),{x:r,y:s}=OA(a,i);return{x:r,y:s}}n(DA,"computePosition");function MA({anchor:t,floating:e}){return{anchor:xA(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}n(MA,"getElementRects");function xA(t,e){var i;const a=t.getBoundingClientRect(),r=(i=e?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}n(xA,"getRectRelativeToOffsetParent");function OA({anchor:t,floating:e},i){const a=NA(i)==="x"?"y":"x",r=a==="y"?"height":"width",s=BE(i),o=t.x+t.width/2-e.width/2,l=t.y+t.height/2-e.height/2,d=t[r]/2-e[r]/2;let u;switch(s){case"top":u={x:o,y:t.y-e.height};break;case"bottom":u={x:o,y:t.y+t.height};break;case"right":u={x:t.x+t.width,y:l};break;case"left":u={x:t.x-e.width,y:l};break;default:u={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":u[a]-=d;break;case"end":u[a]+=d;break}return u}n(OA,"computeCoordsFromPlacement");function BE(t){return t.split("-")[0]}n(BE,"getSide");function NA(t){return["top","bottom"].includes(BE(t))?"y":"x"}n(NA,"getSideAxis");const dm=class dm extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}};n(dm,"InvokeEvent");let ys=dm;const um=class um extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}};n(um,"ToggleEvent");let $u=um;var eh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$6"),G=n((t,e,i)=>(eh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$6"),te=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$6"),Vt=n((t,e,i,a)=>(eh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$5"),ie=n((t,e,i)=>(eh(t,e,"access private method"),i),"__privateMethod$6"),qt,ba,Fi,qo,Yo,_a,Ts,Uu,WE,Bl,th,Wl,Go,Hu,Bu,FE,Wu,KE,Fu,VE,pr,vr,fr,As,Fl,ih,Ku,qE,ah,YE,Vu,GE,rh,QE,qu,ZE,Yu,jE,Kn,Kl,Gu,zE,Vn,Vl,Qo,Qu;function jr({type:t,text:e,value:i,checked:a}){const r=Se.createElement("media-chrome-menu-item");r.type=t,r.part.add("menu-item"),r.part.add(t),r.value=i,r.checked=a;const s=Se.createElement("span");return s.textContent=e,r.append(s),r}n(jr,"createMenuItem");function ga(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}n(ga,"createIndicator");function PA(t){return`
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
  `}n(PA,"getTemplateHTML$6");const Yi={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"},cm=class cm extends E.HTMLElement{constructor(){if(super(),te(this,Uu),te(this,Bl),te(this,Go),te(this,Bu),te(this,Wu),te(this,Fu),te(this,fr),te(this,Fl),te(this,Ku),te(this,ah),te(this,Vu),te(this,rh),te(this,qu),te(this,Yu),te(this,Kn),te(this,Gu),te(this,Vn),te(this,Qo),te(this,qt,null),te(this,ba,null),te(this,Fi,null),te(this,qo,new Set),te(this,Yo,void 0),te(this,_a,!1),te(this,Ts,null),te(this,Wl,()=>{const e=G(this,qo),i=new Set(this.items);for(const a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(const a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));Vt(this,qo,i)}),te(this,pr,()=>{ie(this,fr,As).call(this),ie(this,Fl,ih).call(this,!1)}),te(this,vr,()=>{ie(this,fr,As).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),this.shadowRoot.addEventListener("slotchange",this),Vt(this,Yo,new MutationObserver(G(this,Wl))),G(this,Yo).observe(this.defaultSlot,{childList:!0})}static get observedAttributes(){return[Yi.DISABLED,Yi.HIDDEN,Yi.STYLE,Yi.ANCHOR,Q.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":ie(this,Uu,WE).call(this,e);break;case"invoke":ie(this,Bu,FE).call(this,e);break;case"click":ie(this,Ku,qE).call(this,e);break;case"toggle":ie(this,Vu,GE).call(this,e);break;case"focusout":ie(this,qu,ZE).call(this,e);break;case"keydown":ie(this,Yu,jE).call(this,e);break}}connectedCallback(){var e,i;Vt(this,Ts,Nc(this.shadowRoot,":host")),ie(this,Go,Hu).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),Vt(this,qt,iu(this)),(i=(e=G(this,qt))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(Br(ks(this),G(this,pr)),Br(this,G(this,vr))),ie(this,Bl,th).call(this)}disconnectedCallback(){var e,i;Wr(ks(this),G(this,pr)),Wr(this,G(this,vr)),this.disable(),(i=(e=G(this,qt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Vt(this,qt,null)}attributeChangedCallback(e,i,a){var r,s,o,l;e===Yi.HIDDEN&&a!==i?(G(this,_a)||Vt(this,_a,!0),this.hidden?ie(this,Fu,VE).call(this):ie(this,Wu,KE).call(this),this.dispatchEvent(new $u({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===Q.MEDIA_CONTROLLER?(i&&((s=(r=G(this,qt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Vt(this,qt,null)),a&&this.isConnected&&(Vt(this,qt,iu(this)),(l=(o=G(this,qt))==null?void 0:o.associateElement)==null||l.call(o,this))):e===Yi.DISABLED&&a!==i?a==null?this.enable():this.disable():e===Yi.STYLE&&a!==i&&ie(this,Go,Hu).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=nd(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter($A)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){const i=this.items.find(a=>a.value===e);i&&ie(this,Qo,Qu).call(this,i)}focus(){if(Vt(this,ba,Oc()),this.items.length){ie(this,Vn,Vl).call(this,this.items[0]),this.items[0].focus();return}const e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e?.focus()}handleSelect(e){var i;const a=ie(this,Kn,Kl).call(this,e);a&&(ie(this,Qo,Qu).call(this,a,a.type==="checkbox"),G(this,Fi)&&!this.hidden&&((i=G(this,ba))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;const{key:r}=e,s=this.items,o=(a=(i=ie(this,Kn,Kl).call(this,e))!=null?i:ie(this,Gu,zE).call(this))!=null?a:s[0],l=s.indexOf(o);let d=Math.max(0,l);r==="ArrowDown"?d++:r==="ArrowUp"?d--:e.key==="Home"?d=0:e.key==="End"&&(d=s.length-1),d<0&&(d=s.length-1),d>s.length-1&&(d=0),ie(this,Vn,Vl).call(this,s[d]),s[d].focus()}};n(cm,"MediaChromeMenu");let Ye=cm;qt=new WeakMap;ba=new WeakMap;Fi=new WeakMap;qo=new WeakMap;Yo=new WeakMap;_a=new WeakMap;Ts=new WeakMap;Uu=new WeakSet;WE=n(function(t){const e=t.target;for(const i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(e.name)&&ie(this,Bl,th).call(this),e.name||G(this,Wl).call(this)},"handleSlotChange_fn$1");Bl=new WeakSet;th=n(function(){const t=this.shadowRoot.querySelector('slot[name="header"]'),e=this.shadowRoot.querySelector('slot[name="title"]');t.hidden=e.assignedNodes().length===0&&t.assignedNodes().length===0},"toggleHeader_fn");Wl=new WeakMap;Go=new WeakSet;Hu=n(function(){var t;const e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")},"updateLayoutStyle_fn");Bu=new WeakSet;FE=n(function(t){Vt(this,Fi,t.relatedTarget),_i(this,t.relatedTarget)||(this.hidden=!this.hidden)},"handleInvoke_fn");Wu=new WeakSet;KE=n(function(){var t;(t=G(this,Fi))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),Br(ks(this),G(this,pr)),Br(this,G(this,vr))},"handleOpen_fn");Fu=new WeakSet;VE=n(function(){var t;(t=G(this,Fi))==null||t.setAttribute("aria-expanded","false"),Wr(ks(this),G(this,pr)),Wr(this,G(this,vr))},"handleClosed_fn");pr=new WeakMap;vr=new WeakMap;fr=new WeakSet;As=n(function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:e,y:i}=DA({anchor:this.anchorElement,floating:this,placement:"top-start"});t??(t=this.offsetWidth);const r=ks(this).getBoundingClientRect(),s=r.width-e-t,o=r.height-i-this.offsetHeight,{style:l}=G(this,Ts);l.setProperty("position","absolute"),l.setProperty("right",`${Math.max(0,s)}px`),l.setProperty("--_menu-bottom",`${o}px`);const d=getComputedStyle(this),p=l.getPropertyValue("--_menu-bottom")===d.bottom?o:parseFloat(d.bottom),v=r.height-p-parseFloat(d.marginBottom);this.style.setProperty("--_menu-max-height",`${v}px`)},"positionMenu_fn");Fl=new WeakSet;ih=n(function(t){const e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e?.querySelector('[role="menu"]'),{style:a}=G(this,Ts);if(t||a.setProperty("--media-menu-transition-in","none"),i){const r=i.offsetHeight,s=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${s}px`),this.style.setProperty("min-height",`${r}px`),ie(this,fr,As).call(this,s)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),ie(this,fr,As).call(this);a.removeProperty("--media-menu-transition-in")},"resizeMenu_fn");Ku=new WeakSet;qE=n(function(t){var e;if(t.stopPropagation(),t.composedPath().includes(G(this,ah,YE))){(e=G(this,ba))==null||e.focus(),this.hidden=!0;return}const i=ie(this,Kn,Kl).call(this,t);!i||i.hasAttribute("disabled")||(ie(this,Vn,Vl).call(this,i),this.handleSelect(t))},"handleClick_fn");ah=new WeakSet;YE=n(function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))},"backButtonElement_get");Vu=new WeakSet;GE=n(function(t){if(t.target===this)return;ie(this,rh,QE).call(this);const e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new ys({relatedTarget:i}));for(const i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);ie(this,Fl,ih).call(this,!0)},"handleToggle_fn");rh=new WeakSet;QE=n(function(){const e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)},"checkSubmenuHasExpanded_fn");qu=new WeakSet;ZE=n(function(t){var e;_i(this,t.relatedTarget)||(G(this,_a)&&((e=G(this,ba))==null||e.focus()),G(this,Fi)&&G(this,Fi)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))},"handleFocusOut_fn");Yu=new WeakSet;jE=n(function(t){var e,i,a,r,s;const{key:o,ctrlKey:l,altKey:d,metaKey:u}=t;if(!(l||d||u)&&this.keysUsed.includes(o))if(t.preventDefault(),t.stopPropagation(),o==="Tab"){if(G(this,_a)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else o==="Escape"?((s=G(this,ba))==null||s.focus(),G(this,_a)&&(this.hidden=!0)):o==="Enter"||o===" "?this.handleSelect(t):this.handleMove(t)},"handleKeyDown_fn$1");Kn=new WeakSet;Kl=n(function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))},"getItem_fn");Gu=new WeakSet;zE=n(function(){return this.items.find(t=>t.tabIndex===0)},"getTabItem_fn");Vn=new WeakSet;Vl=n(function(t){for(const e of this.items)e.tabIndex=e===t?0:-1},"setTabItem_fn");Qo=new WeakSet;Qu=n(function(t,e){const i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))},"selectItem_fn");Ye.shadowRootOptions={mode:"open"};Ye.getTemplateHTML=PA;function $A(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t?.role)}n($A,"isMenuItem");function ks(t){var e;return(e=t.getAttribute("bounds")?en(t,`#${t.getAttribute("bounds")}`):qe(t)||t.parentElement)!=null?e:t}n(ks,"getBoundsElement");E.customElements.get("media-chrome-menu")||E.customElements.define("media-chrome-menu",Ye);var nh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$5"),Xt=n((t,e,i)=>(nh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$5"),si=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$5"),Dd=n((t,e,i,a)=>(nh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$4"),Ct=n((t,e,i)=>(nh(t,e,"access private method"),i),"__privateMethod$5"),Zo,qn,Zu,XE,ql,sh,oh,JE,Jt,zr,Ss,ju,eb,jo,zu;function UA(t){return`
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
  `}n(UA,"getTemplateHTML$5");function HA(t){return""}n(HA,"getSuffixSlotInnerHTML$1");const ct={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"},hm=class hm extends E.HTMLElement{constructor(){if(super(),si(this,Zu),si(this,ql),si(this,oh),si(this,zr),si(this,ju),si(this,jo),si(this,Zo,!1),si(this,qn,void 0),si(this,Jt,()=>{var e,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],s=(i=r?.dataset.description)!=null?i:r?.text,o=Se.createElement("span");o.textContent=s??"",a.replaceChildren(o)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ot(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.shadowRoot.addEventListener("slotchange",this)}static get observedAttributes(){return[ct.TYPE,ct.DISABLED,ct.CHECKED,ct.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),hn(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":Ct(this,Zu,XE).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":Ct(this,ju,eb).call(this,e);break;case"keyup":Ct(this,zr,Ss).call(this,e);break}}attributeChangedCallback(e,i,a){e===ct.CHECKED&&hn(this)&&!Xt(this,Zo)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===ct.TYPE&&a!==i?this.role="menuitem"+a:e===ct.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(ct.DISABLED)||this.enable(),this.role="menuitem"+this.type,Dd(this,qn,Xu(this,this.parentNode)),Ct(this,jo,zu).call(this),this.submenuElement&&Ct(this,ql,sh).call(this)}disconnectedCallback(){this.disable(),Ct(this,jo,zu).call(this),Dd(this,qn,null)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=nd(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(ct.TYPE))!=null?e:""}set type(e){this.setAttribute(ct.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(ct.VALUE))!=null?e:this.text}set value(e){this.setAttribute(ct.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(hn(this))return this.getAttribute("aria-checked")==="true"}set checked(e){hn(this)&&(Dd(this,Zo,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){hn(this)||this.invokeTargetElement&&_i(this,e.target)&&this.invokeTargetElement.dispatchEvent(new ys({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};n(hm,"MediaChromeMenuItem");let ai=hm;Zo=new WeakMap;qn=new WeakMap;Zu=new WeakSet;XE=n(function(t){const e=t.target;if(!e?.name)for(const a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?Ct(this,ql,sh).call(this):Ct(this,oh,JE).call(this))},"handleSlotChange_fn");ql=new WeakSet;sh=n(async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",Xt(this,Jt)),this.submenuElement.addEventListener("addmenuitem",Xt(this,Jt)),this.submenuElement.addEventListener("removemenuitem",Xt(this,Jt)),Xt(this,Jt).call(this)},"submenuConnected_fn");oh=new WeakSet;JE=n(function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",Xt(this,Jt)),this.submenuElement.removeEventListener("addmenuitem",Xt(this,Jt)),this.submenuElement.removeEventListener("removemenuitem",Xt(this,Jt)),Xt(this,Jt).call(this)},"submenuDisconnected_fn");Jt=new WeakMap;zr=new WeakSet;Ss=n(function(t){const{key:e}=t;if(!this.keysUsed.includes(e)){this.removeEventListener("keyup",Ct(this,zr,Ss));return}this.handleClick(t)},"handleKeyUp_fn");ju=new WeakSet;eb=n(function(t){const{metaKey:e,altKey:i,key:a}=t;if(e||i||!this.keysUsed.includes(a)){this.removeEventListener("keyup",Ct(this,zr,Ss));return}this.addEventListener("keyup",Ct(this,zr,Ss),{once:!0})},"handleKeyDown_fn");jo=new WeakSet;zu=n(function(){var t;const e=(t=Xt(this,qn))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(const a of e)a.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")},"reset_fn");ai.shadowRootOptions={mode:"open"};ai.getTemplateHTML=UA;ai.getSuffixSlotInnerHTML=HA;function hn(t){return t.type==="radio"||t.type==="checkbox"}n(hn,"isCheckable");function Xu(t,e){if(!t)return null;const{host:i}=t.getRootNode();return!e&&i?Xu(t,i):e?.items?e:Xu(e,e?.parentNode)}n(Xu,"closestMenuItemsContainer");E.customElements.get("media-chrome-menu-item")||E.customElements.define("media-chrome-menu-item",ai);function BA(t){return`
    ${Ye.getTemplateHTML(t)}
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
  `}n(BA,"getTemplateHTML$4");const mm=class mm extends Ye{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:qe(this).querySelector("media-settings-menu-button")}};n(mm,"MediaSettingsMenu");let Yl=mm;Yl.getTemplateHTML=BA;E.customElements.get("media-settings-menu")||E.customElements.define("media-settings-menu",Yl);function WA(t){return`
    ${ai.getTemplateHTML.call(this,t)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}n(WA,"getTemplateHTML$3");function FA(t){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}n(FA,"getSuffixSlotInnerHTML");const pm=class pm extends ai{};n(pm,"MediaSettingsMenuItem");let Xr=pm;Xr.shadowRootOptions={mode:"open"};Xr.getTemplateHTML=WA;Xr.getSuffixSlotInnerHTML=FA;E.customElements.get("media-settings-menu-item")||E.customElements.define("media-settings-menu-item",Xr);const vm=class vm extends we{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=nd(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new ys({relatedTarget:this}))}};n(vm,"MediaChromeMenuButton");let Ki=vm;E.customElements.get("media-chrome-menu-button")||E.customElements.define("media-chrome-menu-button",Ki);function KA(){return`
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
  `}n(KA,"getSlotTemplateHTML$4");function VA(){return D("Settings")}n(VA,"getTooltipContentHTML$4");const fm=class fm extends Ki{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",D("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:qe(this).querySelector("media-settings-menu")}};n(fm,"MediaSettingsMenuButton");let ws=fm;ws.getSlotTemplateHTML=KA;ws.getTooltipContentHTML=VA;E.customElements.get("media-settings-menu-button")||E.customElements.define("media-settings-menu-button",ws);var lh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$4"),tb=n((t,e,i)=>(lh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$4"),eo=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$4"),Ju=n((t,e,i,a)=>(lh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$3"),to=n((t,e,i)=>(lh(t,e,"access private method"),i),"__privateMethod$4"),Ln,Gl,zo,ec,Xo,tc;const Em=class Em extends Ye{constructor(){super(...arguments),eo(this,zo),eo(this,Xo),eo(this,Ln,[]),eo(this,Gl,void 0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_AUDIO_TRACK_LIST,c.MEDIA_AUDIO_TRACK_ENABLED,c.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===c.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(Ju(this,Ln,N1(a??"")),to(this,zo,ec).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",to(this,Xo,tc))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",to(this,Xo,tc))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=qe(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return tb(this,Ln)}set mediaAudioTrackList(e){Ju(this,Ln,e),to(this,zo,ec).call(this)}get mediaAudioTrackEnabled(){var e;return(e=le(this,c.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){de(this,c.MEDIA_AUDIO_TRACK_ENABLED,e)}};n(Em,"MediaAudioTrackMenu");let ic=Em;Ln=new WeakMap;Gl=new WeakMap;zo=new WeakSet;ec=n(function(){if(tb(this,Gl)===JSON.stringify(this.mediaAudioTrackList))return;Ju(this,Gl,JSON.stringify(this.mediaAudioTrackList));const t=this.mediaAudioTrackList;this.defaultSlot.textContent="",t.sort((e,i)=>e.id.localeCompare(i.id,void 0,{numeric:!0}));for(const e of t){const i=this.formatMenuItemText(e.label,e),a=jr({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(ga(this,"checked-indicator")),this.defaultSlot.append(a)}},"render_fn$3");Xo=new WeakSet;tc=n(function(){if(this.value==null)return;const t=new E.CustomEvent(C.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn$3");E.customElements.get("media-audio-track-menu")||E.customElements.define("media-audio-track-menu",ic);const qA=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function YA(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${qA}</slot>
  `}n(YA,"getSlotTemplateHTML$3");function GA(){return D("Audio")}n(GA,"getTooltipContentHTML$3");const ev=n(t=>{const e=D("Audio");t.setAttribute("aria-label",e)},"updateAriaLabel$1"),bm=class bm extends Ki{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_AUDIO_TRACK_ENABLED,c.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),ev(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_LANG&&ev(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=qe(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=le(this,c.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){de(this,c.MEDIA_AUDIO_TRACK_ENABLED,e)}};n(bm,"MediaAudioTrackMenuButton");let Is=bm;Is.getSlotTemplateHTML=YA;Is.getTooltipContentHTML=GA;E.customElements.get("media-audio-track-menu-button")||E.customElements.define("media-audio-track-menu-button",Is);var dh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$3"),QA=n((t,e,i)=>(dh(t,e,"read from private field"),e.get(t)),"__privateGet$3"),Md=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$3"),ZA=n((t,e,i,a)=>(dh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$2"),io=n((t,e,i)=>(dh(t,e,"access private method"),i),"__privateMethod$3"),Ql,Jo,ac,el,rc;const jA=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function zA(t){return`
    ${Ye.getTemplateHTML(t)}
    <slot name="captions-indicator" hidden>${jA}</slot>
  `}n(zA,"getTemplateHTML$2");const _m=class _m extends Ye{constructor(){super(...arguments),Md(this,Jo),Md(this,el),Md(this,Ql,void 0)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_LIST&&i!==a?io(this,Jo,ac).call(this):e===c.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a||"",io(this,Jo,ac).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",io(this,el,rc))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",io(this,el,rc))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:qe(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return tv(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){iv(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return tv(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){iv(this,c.MEDIA_SUBTITLES_SHOWING,e)}};n(_m,"MediaCaptionsMenu");let Zl=_m;Ql=new WeakMap;Jo=new WeakSet;ac=n(function(){var t;const e=QA(this,Ql)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(c.MEDIA_SUBTITLES_SHOWING);if(!e&&!i)return;ZA(this,Ql,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const a=!this.value,r=jr({type:"radio",text:this.formatMenuItemText(D("Off")),value:"off",checked:a});r.prepend(ga(this,"checked-indicator")),this.defaultSlot.append(r);const s=this.mediaSubtitlesList;for(const o of s){const l=jr({type:"radio",text:this.formatMenuItemText(o.label,o),value:su(o),checked:this.value==su(o)});l.prepend(ga(this,"checked-indicator")),((t=o.kind)!=null?t:"subs")==="captions"&&l.append(ga(this,"captions-indicator")),this.defaultSlot.append(l)}},"render_fn$2");el=new WeakSet;rc=n(function(){const t=this.mediaSubtitlesShowing,e=this.getAttribute(c.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t?.length&&i&&this.dispatchEvent(new E.CustomEvent(C.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;const a=new E.CustomEvent(C.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)},"onChange_fn$2");Zl.getTemplateHTML=zA;const tv=n((t,e)=>{const i=t.getAttribute(e);return i?ld(i):[]},"getSubtitlesListAttr$1"),iv=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=ts(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr$1");E.customElements.get("media-captions-menu")||E.customElements.define("media-captions-menu",Zl);const XA=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,JA=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function ek(){return`
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
      <slot name="on">${XA}</slot>
      <slot name="off">${JA}</slot>
    </slot>
  `}n(ek,"getSlotTemplateHTML$2");function tk(){return D("Captions")}n(tk,"getTooltipContentHTML$2");const av=n(t=>{t.setAttribute("data-captions-enabled",Zf(t).toString())},"updateAriaChecked"),rv=n(t=>{t.setAttribute("aria-label",D("closed captions"))},"updateAriaLabel"),gm=class gm extends Ki{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_SUBTITLES_LIST,c.MEDIA_SUBTITLES_SHOWING,c.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),rv(this),av(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_SUBTITLES_SHOWING?av(this):e===c.MEDIA_LANG&&rv(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=qe(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return nv(this,c.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){sv(this,c.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return nv(this,c.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){sv(this,c.MEDIA_SUBTITLES_SHOWING,e)}};n(gm,"MediaCaptionsMenuButton");let Rs=gm;Rs.getSlotTemplateHTML=ek;Rs.getTooltipContentHTML=tk;const nv=n((t,e)=>{const i=t.getAttribute(e);return i?ld(i):[]},"getSubtitlesListAttr"),sv=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=ts(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr");E.customElements.get("media-captions-menu-button")||E.customElements.define("media-captions-menu-button",Rs);var ib=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$2"),Ja=n((t,e,i)=>(ib(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$2"),xd=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$2"),xa=n((t,e,i)=>(ib(t,e,"access private method"),i),"__privateMethod$2"),Mi,er,Dn,tl,nc;const Od={RATES:"rates"},ym=class ym extends Ye{constructor(){super(),xd(this,er),xd(this,tl),xd(this,Mi,new es(this,Od.RATES,{defaultValue:kE})),xa(this,er,Dn).call(this)}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE,Od.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_PLAYBACK_RATE&&i!=a?(this.value=a,xa(this,er,Dn).call(this)):e===Od.RATES&&i!=a&&(Ja(this,Mi).value=a,xa(this,er,Dn).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",xa(this,tl,nc))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",xa(this,tl,nc))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:qe(this).querySelector("media-playback-rate-menu-button")}get rates(){return Ja(this,Mi)}set rates(e){e?Array.isArray(e)?Ja(this,Mi).value=e.join(" "):typeof e=="string"&&(Ja(this,Mi).value=e):Ja(this,Mi).value="",xa(this,er,Dn).call(this)}get mediaPlaybackRate(){return oe(this,c.MEDIA_PLAYBACK_RATE,sr)}set mediaPlaybackRate(e){ve(this,c.MEDIA_PLAYBACK_RATE,e)}};n(ym,"MediaPlaybackRateMenu");let sc=ym;Mi=new WeakMap;er=new WeakSet;Dn=n(function(){this.defaultSlot.textContent="";const t=this.mediaPlaybackRate,e=new Set(Array.from(Ja(this,Mi)).map(a=>Number(a)));t>0&&!e.has(t)&&e.add(t);const i=Array.from(e).sort((a,r)=>a-r);for(const a of i){const r=jr({type:"radio",text:this.formatMenuItemText(`${a}x`,a),value:a.toString(),checked:t===a});r.prepend(ga(this,"checked-indicator")),this.defaultSlot.append(r)}},"render_fn$1");tl=new WeakSet;nc=n(function(){if(!this.value)return;const t=new E.CustomEvent(C.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn$1");E.customElements.get("media-playback-rate-menu")||E.customElements.define("media-playback-rate-menu",sc);const il=1;function ik(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
      
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||il}x</slot>
  `}n(ik,"getSlotTemplateHTML$1");function ak(){return D("Playback rate")}n(ak,"getTooltipContentHTML$1");const Tm=class Tm extends Ki{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:il}x`}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===c.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,s=Number.isNaN(r)?il:r;this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",D("Playback rate {playbackRate}",{playbackRate:s}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:qe(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return oe(this,c.MEDIA_PLAYBACK_RATE,il)}set mediaPlaybackRate(e){ve(this,c.MEDIA_PLAYBACK_RATE,e)}};n(Tm,"MediaPlaybackRateMenuButton");let Cs=Tm;Cs.getSlotTemplateHTML=ik;Cs.getTooltipContentHTML=ak;E.customElements.get("media-playback-rate-menu-button")||E.customElements.define("media-playback-rate-menu-button",Cs);var uh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$1"),Mn=n((t,e,i)=>(uh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$1"),ao=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$1"),ov=n((t,e,i,a)=>(uh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$1"),Oa=n((t,e,i)=>(uh(t,e,"access private method"),i),"__privateMethod$1"),xn,or,tr,On,al,oc;const Am=class Am extends Ye{constructor(){super(...arguments),ao(this,tr),ao(this,al),ao(this,xn,[]),ao(this,or,{})}static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_RENDITION_LIST,c.MEDIA_RENDITION_SELECTED,c.MEDIA_RENDITION_UNAVAILABLE,c.MEDIA_HEIGHT]}static formatMenuItemText(e,i){return super.formatMenuItemText(e,i)}static formatRendition(e,{showBitrate:i=!1}={}){const a=`${Math.min(e.width,e.height)}p`;if(i&&e.bitrate){const r=e.bitrate/1e6,s=`${r.toFixed(r<1?1:0)} Mbps`;return`${a} (${s})`}return this.formatMenuItemText(a,e)}static compareRendition(e,i){var a,r;return i.height===e.height?((a=i.bitrate)!=null?a:0)-((r=e.bitrate)!=null?r:0):i.height-e.height}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===c.MEDIA_RENDITION_SELECTED&&i!==a?(this.value=a??"auto",Oa(this,tr,On).call(this)):e===c.MEDIA_RENDITION_LIST&&i!==a?(ov(this,xn,D1(a)),Oa(this,tr,On).call(this)):e===c.MEDIA_HEIGHT&&i!==a&&Oa(this,tr,On).call(this)}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Oa(this,al,oc))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Oa(this,al,oc))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:qe(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return Mn(this,xn)}set mediaRenditionList(e){ov(this,xn,e),Oa(this,tr,On).call(this)}get mediaRenditionSelected(){return le(this,c.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){de(this,c.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return oe(this,c.MEDIA_HEIGHT)}set mediaHeight(e){ve(this,c.MEDIA_HEIGHT,e)}compareRendition(e,i){return this.constructor.compareRendition(e,i)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}formatRendition(e,i){return this.constructor.formatRendition(e,i)}showRenditionBitrate(e){return this.mediaRenditionList.some(i=>i!==e&&i.height===e.height&&i.bitrate!==e.bitrate)}};n(Am,"MediaRenditionMenu");let lc=Am;xn=new WeakMap;or=new WeakMap;tr=new WeakSet;On=n(function(){if(Mn(this,or).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&Mn(this,or).mediaHeight===this.mediaHeight)return;Mn(this,or).mediaRenditionList=JSON.stringify(this.mediaRenditionList),Mn(this,or).mediaHeight=this.mediaHeight;const t=this.mediaRenditionList.sort(this.compareRendition.bind(this)),e=t.find(o=>o.id===this.mediaRenditionSelected);for(const o of t)o.selected=o===e;this.defaultSlot.textContent="";const i=!this.mediaRenditionSelected;for(const o of t){const l=this.formatRendition(o,{showBitrate:this.showRenditionBitrate(o)}),d=jr({type:"radio",text:l,value:`${o.id}`,checked:o.selected&&!i});d.prepend(ga(this,"checked-indicator")),this.defaultSlot.append(d)}const a=e&&this.showRenditionBitrate(e),r=i?e?this.formatMenuItemText(`${D("Auto")} • ${this.formatRendition(e,{showBitrate:a})}`,e):this.formatMenuItemText(`${D("Auto")} (${this.mediaHeight}p)`):this.formatMenuItemText(D("Auto")),s=jr({type:"radio",text:r,value:"auto",checked:i});s.dataset.description=r,s.prepend(ga(this,"checked-indicator")),this.defaultSlot.append(s)},"render_fn");al=new WeakSet;oc=n(function(){if(this.value==null)return;const t=new E.CustomEvent(C.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn");E.customElements.get("media-rendition-menu")||E.customElements.define("media-rendition-menu",lc);const rk=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function nk(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${rk}</slot>
  `}n(nk,"getSlotTemplateHTML");function sk(){return D("Quality")}n(sk,"getTooltipContentHTML");const km=class km extends Ki{static get observedAttributes(){return[...super.observedAttributes,c.MEDIA_RENDITION_SELECTED,c.MEDIA_RENDITION_UNAVAILABLE,c.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",D("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:qe(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return le(this,c.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){de(this,c.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return oe(this,c.MEDIA_HEIGHT)}set mediaHeight(e){ve(this,c.MEDIA_HEIGHT,e)}};n(km,"MediaRenditionMenuButton");let Ls=km;Ls.getSlotTemplateHTML=nk;Ls.getTooltipContentHTML=sk;E.customElements.get("media-rendition-menu-button")||E.customElements.define("media-rendition-menu-button",Ls);var ch=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck"),Yt=n((t,e,i)=>(ch(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet"),Ot=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd"),ab=n((t,e,i,a)=>(ch(t,e,"write to private field"),e.set(t,i),i),"__privateSet"),pt=n((t,e,i)=>(ch(t,e,"access private method"),i),"__privateMethod"),Jr,Ds,cd,na,lr,hh,rb,rl,dc,nl,uc,nb,jl,zl,sl;function ok(t){return`
      ${Ye.getTemplateHTML(t)}
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
    `}n(ok,"getTemplateHTML$1");const Sm=class Sm extends Ye{constructor(){super(),Ot(this,Ds),Ot(this,na),Ot(this,hh),Ot(this,rl),Ot(this,uc),Ot(this,Jr,!1),Ot(this,nl,e=>{const i=e.target,a=i?.nodeName==="VIDEO",r=pt(this,rl,dc).call(this,i);(a||r)&&(Yt(this,Jr)?pt(this,na,lr).call(this):pt(this,uc,nb).call(this,e))}),Ot(this,jl,e=>{const i=e.target,a=this.contains(i),r=e.button===2,s=i?.nodeName==="VIDEO",o=pt(this,rl,dc).call(this,i);a||r&&(s||o)||pt(this,na,lr).call(this)}),Ot(this,zl,e=>{e.key==="Escape"&&pt(this,na,lr).call(this)}),Ot(this,sl,e=>{var i,a;const r=e.target;if((i=r.matches)!=null&&i.call(r,'button[invoke="copy"]')){const s=(a=r.closest("media-context-menu-item"))==null?void 0:a.querySelector('input[slot="copy"]');s&&navigator.clipboard.writeText(s.value)}pt(this,na,lr).call(this)}),this.setAttribute("noautohide",""),pt(this,Ds,cd).call(this)}connectedCallback(){super.connectedCallback(),qe(this).addEventListener("contextmenu",Yt(this,nl)),this.addEventListener("click",Yt(this,sl))}disconnectedCallback(){super.disconnectedCallback(),qe(this).removeEventListener("contextmenu",Yt(this,nl)),this.removeEventListener("click",Yt(this,sl)),document.removeEventListener("mousedown",Yt(this,jl)),document.removeEventListener("keydown",Yt(this,zl))}};n(Sm,"MediaContextMenu");let Xl=Sm;Jr=new WeakMap;Ds=new WeakSet;cd=n(function(){this.hidden=!Yt(this,Jr)},"updateVisibility_fn");na=new WeakSet;lr=n(function(){ab(this,Jr,!1),pt(this,Ds,cd).call(this)},"closeContextMenu_fn");hh=new WeakSet;rb=n(function(){document.querySelectorAll("media-context-menu").forEach(e=>{var i;e!==this&&pt(i=e,na,lr).call(i)})},"closeOtherContextMenus_fn");rl=new WeakSet;dc=n(function(t){return t?t.hasAttribute("slot")&&t.getAttribute("slot")==="media"?!0:t.nodeName.includes("-")&&t.tagName.includes("-")?t.hasAttribute("src")||t.hasAttribute("poster")||t.hasAttribute("preload")||t.hasAttribute("playsinline"):!1:!1},"isVideoContainer_fn");nl=new WeakMap;uc=new WeakSet;nb=n(function(t){t.preventDefault(),pt(this,hh,rb).call(this),ab(this,Jr,!0),this.style.position="fixed",this.style.left=`${t.clientX}px`,this.style.top=`${t.clientY}px`,pt(this,Ds,cd).call(this),document.addEventListener("mousedown",Yt(this,jl),{once:!0}),document.addEventListener("keydown",Yt(this,zl),{once:!0})},"onContextMenu_fn");jl=new WeakMap;zl=new WeakMap;sl=new WeakMap;Xl.getTemplateHTML=ok;E.customElements.get("media-context-menu")||E.customElements.define("media-context-menu",Xl);function lk(t){return`
    ${ai.getTemplateHTML.call(this,t)}
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
  `}n(lk,"getTemplateHTML");const wm=class wm extends ai{};n(wm,"MediaContextMenuItem");let Ms=wm;Ms.shadowRootOptions={mode:"open"};Ms.getTemplateHTML=lk;E.customElements.get("media-context-menu-item")||E.customElements.define("media-context-menu-item",Ms);var sb=n(t=>{throw TypeError(t)},"Je"),mh=n((t,e,i)=>e.has(t)||sb("Cannot "+i),"he"),J=n((t,e,i)=>(mh(t,e,"read from private field"),i?i.call(t):e.get(t)),"u$1"),It=n((t,e,i)=>e.has(t)?sb("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"E$2"),ti=n((t,e,i,a)=>(mh(t,e,"write to private field"),e.set(t,i),i),"C"),Te=n((t,e,i)=>(mh(t,e,"access private method"),i),"p$1"),Rr,hd=(Rr=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}},n(Rr,"F"),Rr);if(typeof DocumentFragment>"u"){const e=class e extends hd{};n(e,"t");let t=e;globalThis.DocumentFragment=t}var Cr,ph=(Cr=class extends hd{},n(Cr,"G"),Cr),Lr,dk=(Lr=class extends hd{},n(Lr,"ge"),Lr),uk={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(ph)}},ol,Dr,ck=(Dr=class{constructor(e,i={}){It(this,ol),ti(this,ol,i?.detail)}get detail(){return J(this,ol)}initCustomEvent(){}},n(Dr,"fe"),Dr);ol=new WeakMap;function hk(t,e){return new ph}n(hk,"Vt");var ob={document:{createElement:hk},DocumentFragment,customElements:uk,CustomEvent:ck,EventTarget:hd,HTMLElement:ph,HTMLVideoElement:dk},lb=typeof window>"u"||typeof globalThis.customElements>"u",Zt=lb?ob:globalThis,Jl=lb?ob.document:globalThis.document;function mk(t){let e="";return Object.entries(t).forEach(([i,a])=>{a!=null&&(e+=`${cc(i)}: ${a}; `)}),e?e.trim():void 0}n(mk,"at");function cc(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}n(cc,"re$1");function db(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}n(db,"oe$1");function it(t){if(t==null)return;let e=+t;return Number.isNaN(e)?void 0:e}n(it,"y");function ub(t){let e=pk(t).toString();return e?"?"+e:""}n(ub,"ye$1");function pk(t){let e={};for(let i in t)t[i]!=null&&(e[i]=t[i]);return new URLSearchParams(e)}n(pk,"Bt");var cb=n((t,e)=>!t||!e?!1:t.contains(e)?!0:cb(t,e.getRootNode().host),"ve"),hb="mux.com",vk=n(()=>{try{return"3.9.2"}catch{}return"UNKNOWN"},"Ht"),fk=vk(),mb=n(()=>fk,"se$1"),Ek=n((t,{token:e,customDomain:i=hb,thumbnailTime:a,programTime:r}={})=>{var s;let o=e==null?a:void 0,{aud:l}=(s=dr(e))!=null?s:{};if(!(e&&l!=="t"))return`https://image.${i}/${t}/thumbnail.webp${ub({token:e,time:o,program_time:r})}`},"ot"),bk=n((t,{token:e,customDomain:i=hb,programStartTime:a,programEndTime:r}={})=>{var s;let{aud:o}=(s=dr(e))!=null?s:{};if(!(e&&o!=="s"))return`https://image.${i}/${t}/storyboard.vtt${ub({token:e,format:"webp",program_start_time:a,program_end_time:r})}`},"nt"),vh=n(t=>{if(t){if([X.LIVE,X.ON_DEMAND].includes(t))return t;if(t!=null&&t.includes("live"))return X.LIVE}},"z"),_k={crossorigin:"crossOrigin",playsinline:"playsInline"};function gk(t){var e;return(e=_k[t])!=null?e:db(t)}n(gk,"st");var ir,ar,Ve,Mr,yk=(Mr=class{constructor(e,i){It(this,ir),It(this,ar),It(this,Ve,[]),ti(this,ir,e),ti(this,ar,i)}[Symbol.iterator](){return J(this,Ve).values()}get length(){return J(this,Ve).length}get value(){var e;return(e=J(this,Ve).join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(ti(this,Ve,[]),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return J(this,Ve)[e]}values(){return J(this,Ve).values()}keys(){return J(this,Ve).keys()}forEach(e){J(this,Ve).forEach(e)}add(...e){var i,a;e.forEach(r=>{this.contains(r)||J(this,Ve).push(r)}),!(this.value===""&&!((i=J(this,ir))!=null&&i.hasAttribute(`${J(this,ar)}`)))&&((a=J(this,ir))==null||a.setAttribute(`${J(this,ar)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>{J(this,Ve).splice(J(this,Ve).indexOf(a),1)}),(i=J(this,ir))==null||i.setAttribute(`${J(this,ar)}`,`${this.value}`)}contains(e){return J(this,Ve).includes(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){this.remove(e),this.add(i)}},n(Mr,"ne"),Mr);ir=new WeakMap,ar=new WeakMap,Ve=new WeakMap;var $S=`[mux-player ${mb()}]`;function ci(...t){}n(ci,"x$1");function vt(...t){}n(vt,"T");function pb(t){var e;let i=(e=t.message)!=null?e:"";t.context&&(i+=` ${t.context}`),t.file&&(i+=` ${x("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t.file}`),ci(i)}n(pb,"Te");var Ue={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},ta={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted"},lv=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),Tk=Object.values(Ue).filter(t=>Ue.PLAYSINLINE!==t),Ak=Object.values(ta),kk=[...Tk,...Ak],xr,Sk=(xr=class extends Zt.HTMLElement{static get observedAttributes(){return kk}constructor(){super()}attributeChangedCallback(e,i,a){var r,s;switch(e){case ta.MUTED:{this.media&&(this.media.muted=a!=null,this.media.defaultMuted=a!=null);return}case ta.VOLUME:{let o=(r=it(a))!=null?r:1;this.media&&(this.media.volume=o);return}case ta.PLAYBACKRATE:{let o=(s=it(a))!=null?s:1;this.media&&(this.media.playbackRate=o,this.media.defaultPlaybackRate=o);return}}}play(){var e,i;return(i=(e=this.media)==null?void 0:e.play())!=null?i:Promise.reject()}pause(){var e;(e=this.media)==null||e.pause()}load(){var e;(e=this.media)==null||e.load()}get media(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("mux-video")}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var e,i;return(i=(e=this.media)==null?void 0:e.paused)!=null?i:!0}get duration(){var e,i;return(i=(e=this.media)==null?void 0:e.duration)!=null?i:NaN}get ended(){var e,i;return(i=(e=this.media)==null?void 0:e.ended)!=null?i:!1}get buffered(){var e,i;return(i=(e=this.media)==null?void 0:e.buffered)!=null?i:lv}get seekable(){var e,i;return(i=(e=this.media)==null?void 0:e.seekable)!=null?i:lv}get readyState(){var e,i;return(i=(e=this.media)==null?void 0:e.readyState)!=null?i:0}get videoWidth(){var e,i;return(i=(e=this.media)==null?void 0:e.videoWidth)!=null?i:0}get videoHeight(){var e,i;return(i=(e=this.media)==null?void 0:e.videoHeight)!=null?i:0}get currentSrc(){var e,i;return(i=(e=this.media)==null?void 0:e.currentSrc)!=null?i:""}get currentTime(){var e,i;return(i=(e=this.media)==null?void 0:e.currentTime)!=null?i:0}set currentTime(e){this.media&&(this.media.currentTime=Number(e))}get volume(){var e,i;return(i=(e=this.media)==null?void 0:e.volume)!=null?i:1}set volume(e){this.media&&(this.media.volume=Number(e))}get playbackRate(){var e,i;return(i=(e=this.media)==null?void 0:e.playbackRate)!=null?i:1}set playbackRate(e){this.media&&(this.media.playbackRate=Number(e))}get defaultPlaybackRate(){var e;return(e=it(this.getAttribute(ta.PLAYBACKRATE)))!=null?e:1}set defaultPlaybackRate(e){e!=null?this.setAttribute(ta.PLAYBACKRATE,`${e}`):this.removeAttribute(ta.PLAYBACKRATE)}get crossOrigin(){return mn(this,Ue.CROSSORIGIN)}set crossOrigin(e){this.setAttribute(Ue.CROSSORIGIN,`${e}`)}get autoplay(){return mn(this,Ue.AUTOPLAY)!=null}set autoplay(e){e?this.setAttribute(Ue.AUTOPLAY,typeof e=="string"?e:""):this.removeAttribute(Ue.AUTOPLAY)}get loop(){return mn(this,Ue.LOOP)!=null}set loop(e){e?this.setAttribute(Ue.LOOP,""):this.removeAttribute(Ue.LOOP)}get muted(){var e,i;return(i=(e=this.media)==null?void 0:e.muted)!=null?i:!1}set muted(e){this.media&&(this.media.muted=!!e)}get defaultMuted(){return mn(this,Ue.MUTED)!=null}set defaultMuted(e){e?this.setAttribute(Ue.MUTED,""):this.removeAttribute(Ue.MUTED)}get playsInline(){return mn(this,Ue.PLAYSINLINE)!=null}set playsInline(e){vt("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(e){["","none","metadata","auto"].includes(e)?this.setAttribute(Ue.PRELOAD,e):this.removeAttribute(Ue.PRELOAD)}},n(xr,"Ae"),xr);function mn(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}n(mn,"X");var dv=Sk,wk=`:host {
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
`,pn=new WeakMap,Ta,Ik=(Ta=class{constructor(e,i){this.element=e,this.type=i,this.element.addEventListener(this.type,this);let a=pn.get(this.element);a&&a.set(this.type,this)}set(e){if(typeof e=="function")this.handleEvent=e.bind(this.element);else if(typeof e=="object"&&typeof e.handleEvent=="function")this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let i=pn.get(this.element);i&&i.delete(this.type)}}static for(e){pn.has(e.element)||pn.set(e.element,new Map);let i=e.attributeName.slice(2),a=pn.get(e.element);return a&&a.has(i)?a.get(i):new Ta(e.element,i)}},n(Ta,"t"),Ta);function Rk(t,e){return t instanceof nt&&t.attributeName.startsWith("on")?(Ik.for(t).set(e),t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),!0):!1}n(Rk,"zt");function Ck(t,e){return e instanceof vb&&t instanceof Wi?(e.renderInto(t),!0):!1}n(Ck,"Xt");function Lk(t,e){return e instanceof DocumentFragment&&t instanceof Wi?(e.childNodes.length&&t.replace(...e.childNodes),!0):!1}n(Lk,"qt");function Dk(t,e){if(t instanceof nt){let i=t.attributeNamespace,a=t.element.getAttributeNS(i,t.attributeName);return String(e)!==a&&(t.value=String(e)),!0}return t.value=String(e),!0}n(Dk,"Qt");function Mk(t,e){if(t instanceof nt&&e instanceof Element){let i=t.element;return i[t.attributeName]!==e&&(t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),i[t.attributeName]=e),!0}return!1}n(Mk,"Jt");function xk(t,e){if(typeof e=="boolean"&&t instanceof nt){let i=t.attributeNamespace,a=t.element.hasAttributeNS(i,t.attributeName);return e!==a&&(t.booleanValue=e),!0}return!1}n(xk,"ea");function Ok(t,e){return e===!1&&t instanceof Wi?(t.replace(""),!0):!1}n(Ok,"ta");function Nk(t,e){Mk(t,e)||xk(t,e)||Rk(t,e)||Ok(t,e)||Ck(t,e)||Lk(t,e)||Dk(t,e)}n(Nk,"aa");var Nd=new Map,uv=new WeakMap,cv=new WeakMap,Or,vb=(Or=class{constructor(e,i,a){this.strings=e,this.values=i,this.processor=a,this.stringsKey=this.strings.join("")}get template(){if(Nd.has(this.stringsKey))return Nd.get(this.stringsKey);{let e=Jl.createElement("template"),i=this.strings.length-1;return e.innerHTML=this.strings.reduce((a,r,s)=>a+r+(s<i?`{{ ${s} }}`:""),""),Nd.set(this.stringsKey,e),e}}renderInto(e){var i;let a=this.template;if(uv.get(e)!==a){uv.set(e,a);let s=new Qr(a,this.values,this.processor);cv.set(e,s),e instanceof Wi?e.replace(...s.children):e.appendChild(s);return}let r=cv.get(e);(i=r?.update)==null||i.call(r,this.values)}},n(Or,"de"),Or),Pk={processCallback(t,e,i){var a;if(i){for(let[r,s]of e)if(r in i){let o=(a=i[r])!=null?a:"";Nk(s,o)}}}};function ll(t,...e){return new vb(t,e,Pk)}n(ll,"Q");function $k(t,e){t.renderInto(e)}n($k,"bt");var Uk=n(t=>{let{tokens:e}=t;return e.drm?":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }":""},"oa"),Hk=n(t=>ll`
  <style>
    ${Uk(t)}
    ${wk}
  </style>
  ${Kk(t)}
`,"gt"),Bk=n(t=>{let e=t.hotKeys?`${t.hotKeys}`:"";return vh(t.streamType)==="live"&&(e+=" noarrowleft noarrowright"),e},"na"),Wk={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",THUMB:"thumb",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",MENU_ITEM:"menu-item",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},Fk=Object.values(Wk).join(", "),Kk=n(t=>{var e,i,a,r,s,o,l,d,u,p,v,m,h,f,_,b,y,A,g,w,M,P,W,Z,ae,q,H,$e,Qe,Ze,Ee,Be,Dt,We,bt,je,Le;return ll`
  <media-theme
    template="${t.themeTemplate||!1}"
    defaultstreamtype="${(e=t.defaultStreamType)!=null?e:!1}"
    hotkeys="${Bk(t)||!1}"
    nohotkeys="${t.noHotKeys||!t.hasSrc||!1}"
    noautoseektolive="${!!((i=t.streamType)!=null&&i.includes(X.LIVE))&&t.targetLiveWindow!==0}"
    novolumepref="${t.novolumepref||!1}"
    nomutedpref="${t.nomutedpref||!1}"
    disabled="${!t.hasSrc||t.isDialogOpen}"
    audio="${(a=t.audio)!=null?a:!1}"
    style="${(r=mk({"--media-primary-color":t.primaryColor,"--media-secondary-color":t.secondaryColor,"--media-accent-color":t.accentColor}))!=null?r:!1}"
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
    exportparts="${Fk}"
    onclose="${t.onCloseErrorDialog}"
    onfocusin="${t.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      inert="${(f=t.noHotKeys)!=null?f:!1}"
      target-live-window="${(_=t.targetLiveWindow)!=null?_:!1}"
      stream-type="${(b=vh(t.streamType))!=null?b:!1}"
      crossorigin="${(y=t.crossOrigin)!=null?y:""}"
      playsinline
      autoplay="${(A=t.autoplay)!=null?A:!1}"
      muted="${(g=t.muted)!=null?g:!1}"
      loop="${(w=t.loop)!=null?w:!1}"
      preload="${(M=t.preload)!=null?M:!1}"
      debug="${(P=t.debug)!=null?P:!1}"
      prefer-cmcd="${(W=t.preferCmcd)!=null?W:!1}"
      disable-tracking="${(Z=t.disableTracking)!=null?Z:!1}"
      disable-cookies="${(ae=t.disableCookies)!=null?ae:!1}"
      prefer-playback="${(q=t.preferPlayback)!=null?q:!1}"
      start-time="${t.startTime!=null?t.startTime:!1}"
      beacon-collection-domain="${(H=t.beaconCollectionDomain)!=null?H:!1}"
      player-init-time="${($e=t.playerInitTime)!=null?$e:!1}"
      player-software-name="${(Qe=t.playerSoftwareName)!=null?Qe:!1}"
      player-software-version="${(Ze=t.playerSoftwareVersion)!=null?Ze:!1}"
      env-key="${(Ee=t.envKey)!=null?Ee:!1}"
      custom-domain="${(Be=t.customDomain)!=null?Be:!1}"
      src="${t.src?t.src:t.playbackId?Yd(t):!1}"
      cast-src="${t.src?t.src:t.playbackId?Yd(t):!1}"
      cast-receiver="${(Dt=t.castReceiver)!=null?Dt:!1}"
      drm-token="${(bt=(We=t.tokens)==null?void 0:We.drm)!=null?bt:!1}"
      exportparts="video"
      disable-pseudo-ended="${(je=t.disablePseudoEnded)!=null?je:!1}"
    >
      ${t.storyboard?ll`<track label="thumbnails" default kind="metadata" src="${t.storyboard}" />`:ll``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t.poster?t.poster:!1}"
        placeholdersrc="${(Le=t.placeholder)!=null?Le:!1}"
      ></media-poster-image>
    </slot>
  </media-theme>
`},"la"),fb=n(t=>t.charAt(0).toUpperCase()+t.slice(1),"vt"),Vk=n((t,e=!1)=>{var i,a;if(t.muxCode){let r=fb((i=t.errorCategory)!=null?i:"video"),s=id((a=t.errorCategory)!=null?a:ne.VIDEO);if(t.muxCode===N.NETWORK_OFFLINE)return x("Your device appears to be offline",e);if(t.muxCode===N.NETWORK_TOKEN_EXPIRED)return x("{category} URL has expired",e).format({category:r});if([N.NETWORK_TOKEN_SUB_MISMATCH,N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING,N.NETWORK_TOKEN_MALFORMED].includes(t.muxCode))return x("{category} URL is formatted incorrectly",e).format({category:r});if(t.muxCode===N.NETWORK_TOKEN_MISSING)return x("Invalid {categoryName} URL",e).format({categoryName:s});if(t.muxCode===N.NETWORK_NOT_FOUND)return x("{category} does not exist",e).format({category:r});if(t.muxCode===N.NETWORK_NOT_READY){let o=t.streamType==="live"?"Live stream":"Video";return x("{mediaType} is not currently available",e).format({mediaType:o})}}if(t.code){if(t.code===L.MEDIA_ERR_NETWORK)return x("Network Error",e);if(t.code===L.MEDIA_ERR_DECODE)return x("Media Error",e);if(t.code===L.MEDIA_ERR_SRC_NOT_SUPPORTED)return x("Source Not Supported",e)}return x("Error",e)},"ua"),qk=n((t,e=!1)=>{var i,a;if(t.muxCode){let r=fb((i=t.errorCategory)!=null?i:"video"),s=id((a=t.errorCategory)!=null?a:ne.VIDEO);return t.muxCode===N.NETWORK_OFFLINE?x("Check your internet connection and try reloading this video.",e):t.muxCode===N.NETWORK_TOKEN_EXPIRED?x("The video’s secured {tokenNamePrefix}-token has expired.",e).format({tokenNamePrefix:s}):t.muxCode===N.NETWORK_TOKEN_SUB_MISMATCH?x("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",e).format({tokenNamePrefix:s}):t.muxCode===N.NETWORK_TOKEN_MALFORMED?x("{category} URL is formatted incorrectly",e).format({category:r}):[N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode)?x("The {tokenNamePrefix}-token is formatted with incorrect information.",e).format({tokenNamePrefix:s}):[N.NETWORK_TOKEN_MISSING,N.NETWORK_INVALID_URL].includes(t.muxCode)?x("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",e).format({tokenNamePrefix:s}):t.muxCode===N.NETWORK_NOT_FOUND?"":t.message}return t.code&&(t.code===L.MEDIA_ERR_NETWORK||t.code===L.MEDIA_ERR_DECODE||(t.code,L.MEDIA_ERR_SRC_NOT_SUPPORTED)),t.message},"ma"),Yk=n((t,e=!1)=>{let i=Vk(t,e).toString(),a=qk(t,e).toString();return{title:i,message:a}},"Et"),Gk=n(t=>{if(t.muxCode){if(t.muxCode===N.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(t.muxCode===N.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([N.NETWORK_TOKEN_AUD_MISMATCH,N.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode))return"403-incorrect-aud-value.md";if(t.muxCode===N.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(t.muxCode===N.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(t.muxCode===N.NETWORK_NOT_FOUND)return"404-not-found.md";if(t.muxCode===N.NETWORK_NOT_READY)return"412-not-playable.md"}if(t.code){if(t.code===L.MEDIA_ERR_NETWORK)return"";if(t.code===L.MEDIA_ERR_DECODE)return"media-decode-error.md";if(t.code===L.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},"ca"),hv=n((t,e)=>{let i=Gk(t);return{message:t.message,context:t.context,file:i}},"Re"),Qk=`<template id="media-theme-gerwig">
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
`,hc=Jl.createElement("template");"innerHTML"in hc&&(hc.innerHTML=Qk);var mv,pv,Nr,Eb=(Nr=class extends Zr{},n(Nr,"me"),Nr);Eb.template=(pv=(mv=hc.content)==null?void 0:mv.children)==null?void 0:pv[0];Zt.customElements.get("media-theme-gerwig")||Zt.customElements.define("media-theme-gerwig",Eb);var Zk="gerwig",di={SRC:"src",POSTER:"poster"},k={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",FULLSCREEN_ELEMENT:"fullscreen-element",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",NO_MUTED_PREF:"no-muted-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended"},mc=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","nomutedpref","proudlydisplaymuxbadge"];function jk(t,e){var i,a;return{src:!t.playbackId&&t.src,playbackId:t.playbackId,hasSrc:!!t.playbackId||!!t.src||!!t.currentSrc,poster:t.poster,storyboard:t.storyboard,storyboardSrc:t.getAttribute(k.STORYBOARD_SRC),fullscreenElement:t.getAttribute(k.FULLSCREEN_ELEMENT),placeholder:t.getAttribute("placeholder"),themeTemplate:Xk(t),thumbnailTime:!t.tokens.thumbnail&&t.thumbnailTime,autoplay:t.autoplay,crossOrigin:t.crossOrigin,loop:t.loop,noHotKeys:t.hasAttribute(k.NOHOTKEYS),hotKeys:t.getAttribute(k.HOTKEYS),muted:t.muted,paused:t.paused,preload:t.preload,envKey:t.envKey,preferCmcd:t.preferCmcd,debug:t.debug,disableTracking:t.disableTracking,disableCookies:t.disableCookies,tokens:t.tokens,beaconCollectionDomain:t.beaconCollectionDomain,maxResolution:t.maxResolution,minResolution:t.minResolution,programStartTime:t.programStartTime,programEndTime:t.programEndTime,assetStartTime:t.assetStartTime,assetEndTime:t.assetEndTime,renditionOrder:t.renditionOrder,metadata:t.metadata,playerInitTime:t.playerInitTime,playerSoftwareName:t.playerSoftwareName,playerSoftwareVersion:t.playerSoftwareVersion,startTime:t.startTime,preferPlayback:t.preferPlayback,audio:t.audio,defaultStreamType:t.defaultStreamType,targetLiveWindow:t.getAttribute(T.TARGET_LIVE_WINDOW),streamType:vh(t.getAttribute(T.STREAM_TYPE)),primaryColor:t.getAttribute(k.PRIMARY_COLOR),secondaryColor:t.getAttribute(k.SECONDARY_COLOR),accentColor:t.getAttribute(k.ACCENT_COLOR),forwardSeekOffset:t.forwardSeekOffset,backwardSeekOffset:t.backwardSeekOffset,defaultHiddenCaptions:t.defaultHiddenCaptions,defaultDuration:t.defaultDuration,defaultShowRemainingTime:t.defaultShowRemainingTime,hideDuration:Jk(t),playbackRates:t.getAttribute(k.PLAYBACK_RATES),customDomain:(i=t.getAttribute(T.CUSTOM_DOMAIN))!=null?i:void 0,title:t.getAttribute(k.TITLE),videoTitle:(a=t.getAttribute(k.VIDEO_TITLE))!=null?a:t.getAttribute(k.TITLE),novolumepref:t.hasAttribute(k.NO_VOLUME_PREF),nomutedpref:t.hasAttribute(k.NO_MUTED_PREF),proudlyDisplayMuxBadge:t.hasAttribute(k.PROUDLY_DISPLAY_MUX_BADGE),castReceiver:t.castReceiver,disablePseudoEnded:t.hasAttribute(k.DISABLE_PSEUDO_ENDED),...e,extraSourceParams:t.extraSourceParams}}n(jk,"Ea");var zk=gE.formatErrorMessage;gE.formatErrorMessage=t=>{var e,i;if(t instanceof L){let a=Yk(t,!1);return`
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
    `}return zk(t)};function Xk(t){var e,i;let a=t.theme;if(a){let r=(i=(e=t.getRootNode())==null?void 0:e.getElementById)==null?void 0:i.call(e,a);if(r&&r instanceof HTMLTemplateElement)return r;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let s=Zt.customElements.get(a);if(s!=null&&s.template)return s.template}}n(Xk,"Aa");function Jk(t){var e;let i=(e=t.mediaController)==null?void 0:e.querySelector("media-time-display");return i&&getComputedStyle(i).getPropertyValue("--media-duration-display-display").trim()==="none"}n(Jk,"Ca");function vv(t){let e=t.videoTitle?{video_title:t.videoTitle}:{};return t.getAttributeNames().filter(i=>i.startsWith("metadata-")).reduce((i,a)=>{let r=t.getAttribute(a);return r!==null&&(i[a.replace(/^metadata-/,"").replace(/-/g,"_")]=r),i},e)}n(vv,"xt");var eS=Object.values(T),tS=Object.values(di),iS=Object.values(k),fv=mb(),Ev="mux-player",bv={isDialogOpen:!1},aS={redundant_streams:!0},dl,ul,cl,ia,hl,Er,me,Di,bb,pc,aa,_v,gv,yv,Tv,Pr,rS=(Pr=class extends dv{constructor(){super(),It(this,me),It(this,dl),It(this,ul,!1),It(this,cl,{}),It(this,ia,!0),It(this,hl,new yk(this,"hotkeys")),It(this,Er,{...bv,onCloseErrorDialog:n(e=>{var i;((i=e.composedPath()[0])==null?void 0:i.localName)==="media-error-dialog"&&Te(this,me,pc).call(this,{isDialogOpen:!1})},"onCloseErrorDialog"),onFocusInErrorDialog:n(e=>{var i;((i=e.composedPath()[0])==null?void 0:i.localName)==="media-error-dialog"&&(cb(this,Jl.activeElement)||e.preventDefault())},"onFocusInErrorDialog")}),ti(this,dl,Sc()),this.attachShadow({mode:"open"}),Te(this,me,bb).call(this),this.isConnected&&Te(this,me,Di).call(this)}static get NAME(){return Ev}static get VERSION(){return fv}static get observedAttributes(){var e;return[...(e=dv.observedAttributes)!=null?e:[],...tS,...eS,...iS]}get mediaTheme(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("media-theme")}get mediaController(){var e,i;return(i=(e=this.mediaTheme)==null?void 0:e.shadowRoot)==null?void 0:i.querySelector("media-controller")}connectedCallback(){let e=this.media;e&&(e.metadata=vv(this))}attributeChangedCallback(e,i,a){switch(Te(this,me,Di).call(this),super.attributeChangedCallback(e,i,a),e){case k.HOTKEYS:J(this,hl).value=a;break;case k.THUMBNAIL_TIME:{a!=null&&this.tokens.thumbnail&&ci(x("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case k.THUMBNAIL_TOKEN:{if(a){let r=dr(a);if(r){let{aud:s}=r,o=$n.THUMBNAIL;s!==o&&ci(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:s,expectedAud:o,tokenNamePrefix:"thumbnail"}))}}break}case k.STORYBOARD_TOKEN:{if(a){let r=dr(a);if(r){let{aud:s}=r,o=$n.STORYBOARD;s!==o&&ci(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:s,expectedAud:o,tokenNamePrefix:"storyboard"}))}}break}case k.DRM_TOKEN:{if(a){let r=dr(a);if(r){let{aud:s}=r,o=$n.DRM;s!==o&&ci(x("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:s,expectedAud:o,tokenNamePrefix:"drm"}))}}break}case T.PLAYBACK_ID:{a!=null&&a.includes("?token")&&vt(x("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:a}));break}case T.STREAM_TYPE:{a&&![X.LIVE,X.ON_DEMAND,X.UNKNOWN].includes(a)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=a.includes("dvr")?Number.POSITIVE_INFINITY:0:pb({file:"invalid-stream-type.md",message:x("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):a===X.LIVE?this.getAttribute(k.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN;break}case k.FULLSCREEN_ELEMENT:{if(a!=null||a!==i){let r=Jl.getElementById(a),s=r?.querySelector("mux-player");this.mediaController&&r&&s&&(this.mediaController.fullscreenElement=r)}break}}[T.PLAYBACK_ID,di.SRC,k.PLAYBACK_TOKEN].includes(e)&&i!==a&&ti(this,Er,{...J(this,Er),...bv}),Te(this,me,aa).call(this,{[gk(e)]:a})}async requestFullscreen(e){var i;if(!(!this.mediaController||this.mediaController.hasAttribute(c.MEDIA_IS_FULLSCREEN)))return(i=this.mediaController)==null||i.dispatchEvent(new Zt.CustomEvent(C.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((a,r)=>{var s;(s=this.mediaController)==null||s.addEventListener(Ei.MEDIA_IS_FULLSCREEN,()=>a(),{once:!0})})}async exitFullscreen(){var e;if(!(!this.mediaController||!this.mediaController.hasAttribute(c.MEDIA_IS_FULLSCREEN)))return(e=this.mediaController)==null||e.dispatchEvent(new Zt.CustomEvent(C.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((i,a)=>{var r;(r=this.mediaController)==null||r.addEventListener(Ei.MEDIA_IS_FULLSCREEN,()=>i(),{once:!0})})}get preferCmcd(){var e;return(e=this.getAttribute(T.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?Fd.includes(e)?this.setAttribute(T.PREFER_CMCD,e):ci(`Invalid value for preferCmcd. Must be one of ${Fd.join()}`):this.removeAttribute(T.PREFER_CMCD))}get hasPlayed(){var e,i;return(i=(e=this.mediaController)==null?void 0:e.hasAttribute(c.MEDIA_HAS_PLAYED))!=null?i:!1}get inLiveWindow(){var e;return(e=this.mediaController)==null?void 0:e.hasAttribute(c.MEDIA_TIME_IS_LIVE)}get _hls(){var e;return(e=this.media)==null?void 0:e._hls}get mux(){var e;return(e=this.media)==null?void 0:e.mux}get theme(){var e;return(e=this.getAttribute(k.THEME))!=null?e:Zk}set theme(e){this.setAttribute(k.THEME,`${e}`)}get themeProps(){let e=this.mediaTheme;if(!e)return;let i={};for(let a of e.getAttributeNames()){if(mc.includes(a))continue;let r=e.getAttribute(a);i[db(a)]=r===""?!0:r}return i}set themeProps(e){var i,a;Te(this,me,Di).call(this);let r={...this.themeProps,...e};for(let s in r){if(mc.includes(s))continue;let o=e?.[s];typeof o=="boolean"||o==null?(i=this.mediaTheme)==null||i.toggleAttribute(cc(s),!!o):(a=this.mediaTheme)==null||a.setAttribute(cc(s),o)}}get playbackId(){var e;return(e=this.getAttribute(T.PLAYBACK_ID))!=null?e:void 0}set playbackId(e){e?this.setAttribute(T.PLAYBACK_ID,e):this.removeAttribute(T.PLAYBACK_ID)}get src(){var e,i;return this.playbackId?(e=Gi(this,di.SRC))!=null?e:void 0:(i=this.getAttribute(di.SRC))!=null?i:void 0}set src(e){e?this.setAttribute(di.SRC,e):this.removeAttribute(di.SRC)}get poster(){var e;let i=this.getAttribute(di.POSTER);if(i!=null)return i;let{tokens:a}=this;if(a.playback&&!a.thumbnail){ci("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return Ek(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(e=this.thumbnailTime)!=null?e:this.startTime,programTime:this.programStartTime,token:a.thumbnail})}set poster(e){e||e===""?this.setAttribute(di.POSTER,e):this.removeAttribute(di.POSTER)}get storyboardSrc(){var e;return(e=this.getAttribute(k.STORYBOARD_SRC))!=null?e:void 0}set storyboardSrc(e){e?this.setAttribute(k.STORYBOARD_SRC,e):this.removeAttribute(k.STORYBOARD_SRC)}get storyboard(){let{tokens:e}=this;if(this.storyboardSrc&&!e.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[X.LIVE,X.UNKNOWN].includes(this.streamType)||e.playback&&!e.storyboard))return bk(this.playbackId,{customDomain:this.customDomain,token:e.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(k.AUDIO)}set audio(e){if(!e){this.removeAttribute(k.AUDIO);return}this.setAttribute(k.AUDIO,"")}get hotkeys(){return J(this,hl)}get nohotkeys(){return this.hasAttribute(k.NOHOTKEYS)}set nohotkeys(e){if(!e){this.removeAttribute(k.NOHOTKEYS);return}this.setAttribute(k.NOHOTKEYS,"")}get thumbnailTime(){return it(this.getAttribute(k.THUMBNAIL_TIME))}set thumbnailTime(e){this.setAttribute(k.THUMBNAIL_TIME,`${e}`)}get videoTitle(){var e,i;return(i=(e=this.getAttribute(k.VIDEO_TITLE))!=null?e:this.getAttribute(k.TITLE))!=null?i:""}set videoTitle(e){e!==this.videoTitle&&(e?this.setAttribute(k.VIDEO_TITLE,e):this.removeAttribute(k.VIDEO_TITLE))}get placeholder(){var e;return(e=Gi(this,k.PLACEHOLDER))!=null?e:""}set placeholder(e){this.setAttribute(k.PLACEHOLDER,`${e}`)}get primaryColor(){var e,i;let a=this.getAttribute(k.PRIMARY_COLOR);if(a!=null||this.mediaTheme&&(a=(i=(e=Zt.getComputedStyle(this.mediaTheme))==null?void 0:e.getPropertyValue("--_primary-color"))==null?void 0:i.trim(),a))return a}set primaryColor(e){this.setAttribute(k.PRIMARY_COLOR,`${e}`)}get secondaryColor(){var e,i;let a=this.getAttribute(k.SECONDARY_COLOR);if(a!=null||this.mediaTheme&&(a=(i=(e=Zt.getComputedStyle(this.mediaTheme))==null?void 0:e.getPropertyValue("--_secondary-color"))==null?void 0:i.trim(),a))return a}set secondaryColor(e){this.setAttribute(k.SECONDARY_COLOR,`${e}`)}get accentColor(){var e,i;let a=this.getAttribute(k.ACCENT_COLOR);if(a!=null||this.mediaTheme&&(a=(i=(e=Zt.getComputedStyle(this.mediaTheme))==null?void 0:e.getPropertyValue("--_accent-color"))==null?void 0:i.trim(),a))return a}set accentColor(e){this.setAttribute(k.ACCENT_COLOR,`${e}`)}get defaultShowRemainingTime(){return this.hasAttribute(k.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(e){e?this.setAttribute(k.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(k.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(k.PLAYBACK_RATES))return this.getAttribute(k.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(e=>Number(e)).filter(e=>!Number.isNaN(e)).sort((e,i)=>e-i)}set playbackRates(e){if(!e){this.removeAttribute(k.PLAYBACK_RATES);return}this.setAttribute(k.PLAYBACK_RATES,e.join(" "))}get forwardSeekOffset(){var e;return(e=it(this.getAttribute(k.FORWARD_SEEK_OFFSET)))!=null?e:10}set forwardSeekOffset(e){this.setAttribute(k.FORWARD_SEEK_OFFSET,`${e}`)}get backwardSeekOffset(){var e;return(e=it(this.getAttribute(k.BACKWARD_SEEK_OFFSET)))!=null?e:10}set backwardSeekOffset(e){this.setAttribute(k.BACKWARD_SEEK_OFFSET,`${e}`)}get defaultHiddenCaptions(){return this.hasAttribute(k.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(e){e?this.setAttribute(k.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(k.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return it(this.getAttribute(k.DEFAULT_DURATION))}set defaultDuration(e){e==null?this.removeAttribute(k.DEFAULT_DURATION):this.setAttribute(k.DEFAULT_DURATION,`${e}`)}get playerInitTime(){return this.hasAttribute(T.PLAYER_INIT_TIME)?it(this.getAttribute(T.PLAYER_INIT_TIME)):J(this,dl)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(T.PLAYER_INIT_TIME):this.setAttribute(T.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=this.getAttribute(T.PLAYER_SOFTWARE_NAME))!=null?e:Ev}get playerSoftwareVersion(){var e;return(e=this.getAttribute(T.PLAYER_SOFTWARE_VERSION))!=null?e:fv}get beaconCollectionDomain(){var e;return(e=this.getAttribute(T.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(T.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(T.BEACON_COLLECTION_DOMAIN))}get maxResolution(){var e;return(e=this.getAttribute(T.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(T.MAX_RESOLUTION,e):this.removeAttribute(T.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(T.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(T.MIN_RESOLUTION,e):this.removeAttribute(T.MIN_RESOLUTION))}get renditionOrder(){var e;return(e=this.getAttribute(T.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(T.RENDITION_ORDER,e):this.removeAttribute(T.RENDITION_ORDER))}get programStartTime(){return it(this.getAttribute(T.PROGRAM_START_TIME))}set programStartTime(e){e==null?this.removeAttribute(T.PROGRAM_START_TIME):this.setAttribute(T.PROGRAM_START_TIME,`${e}`)}get programEndTime(){return it(this.getAttribute(T.PROGRAM_END_TIME))}set programEndTime(e){e==null?this.removeAttribute(T.PROGRAM_END_TIME):this.setAttribute(T.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){return it(this.getAttribute(T.ASSET_START_TIME))}set assetStartTime(e){e==null?this.removeAttribute(T.ASSET_START_TIME):this.setAttribute(T.ASSET_START_TIME,`${e}`)}get assetEndTime(){return it(this.getAttribute(T.ASSET_END_TIME))}set assetEndTime(e){e==null?this.removeAttribute(T.ASSET_END_TIME):this.setAttribute(T.ASSET_END_TIME,`${e}`)}get extraSourceParams(){return this.hasAttribute(k.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(k.EXTRA_SOURCE_PARAMS)).entries()].reduce((e,[i,a])=>(e[i]=a,e),{}):aS}set extraSourceParams(e){e==null?this.removeAttribute(k.EXTRA_SOURCE_PARAMS):this.setAttribute(k.EXTRA_SOURCE_PARAMS,new URLSearchParams(e).toString())}get customDomain(){var e;return(e=this.getAttribute(T.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(T.CUSTOM_DOMAIN,e):this.removeAttribute(T.CUSTOM_DOMAIN))}get envKey(){var e;return(e=Gi(this,T.ENV_KEY))!=null?e:void 0}set envKey(e){this.setAttribute(T.ENV_KEY,`${e}`)}get noVolumePref(){return this.hasAttribute(k.NO_VOLUME_PREF)}set noVolumePref(e){e?this.setAttribute(k.NO_VOLUME_PREF,""):this.removeAttribute(k.NO_VOLUME_PREF)}get noMutedPref(){return this.hasAttribute(k.NO_MUTED_PREF)}set noMutedPref(e){e?this.setAttribute(k.NO_MUTED_PREF,""):this.removeAttribute(k.NO_MUTED_PREF)}get debug(){return Gi(this,T.DEBUG)!=null}set debug(e){e?this.setAttribute(T.DEBUG,""):this.removeAttribute(T.DEBUG)}get disableTracking(){return Gi(this,T.DISABLE_TRACKING)!=null}set disableTracking(e){this.toggleAttribute(T.DISABLE_TRACKING,!!e)}get disableCookies(){return Gi(this,T.DISABLE_COOKIES)!=null}set disableCookies(e){e?this.setAttribute(T.DISABLE_COOKIES,""):this.removeAttribute(T.DISABLE_COOKIES)}get streamType(){var e,i,a;return(a=(i=this.getAttribute(T.STREAM_TYPE))!=null?i:(e=this.media)==null?void 0:e.streamType)!=null?a:X.UNKNOWN}set streamType(e){this.setAttribute(T.STREAM_TYPE,`${e}`)}get defaultStreamType(){var e,i,a;return(a=(i=this.getAttribute(k.DEFAULT_STREAM_TYPE))!=null?i:(e=this.mediaController)==null?void 0:e.getAttribute(k.DEFAULT_STREAM_TYPE))!=null?a:X.ON_DEMAND}set defaultStreamType(e){e?this.setAttribute(k.DEFAULT_STREAM_TYPE,e):this.removeAttribute(k.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var e,i;return this.hasAttribute(k.TARGET_LIVE_WINDOW)?+this.getAttribute(k.TARGET_LIVE_WINDOW):(i=(e=this.media)==null?void 0:e.targetLiveWindow)!=null?i:Number.NaN}set targetLiveWindow(e){e==this.targetLiveWindow||Number.isNaN(e)&&Number.isNaN(this.targetLiveWindow)||(e==null?this.removeAttribute(k.TARGET_LIVE_WINDOW):this.setAttribute(k.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e;return(e=this.media)==null?void 0:e.liveEdgeStart}get startTime(){return it(Gi(this,T.START_TIME))}set startTime(e){this.setAttribute(T.START_TIME,`${e}`)}get preferPlayback(){let e=this.getAttribute(T.PREFER_PLAYBACK);if(e===zt.MSE||e===zt.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===zt.MSE||e===zt.NATIVE?this.setAttribute(T.PREFER_PLAYBACK,e):this.removeAttribute(T.PREFER_PLAYBACK))}get metadata(){var e;return(e=this.media)==null?void 0:e.metadata}set metadata(e){if(Te(this,me,Di).call(this),!this.media){vt("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...vv(this),...e}}get _hlsConfig(){var e;return(e=this.media)==null?void 0:e._hlsConfig}set _hlsConfig(e){if(Te(this,me,Di).call(this),!this.media){vt("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=e}async addCuePoints(e){var i;if(Te(this,me,Di).call(this),!this.media){vt("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(i=this.media)==null?void 0:i.addCuePoints(e)}get activeCuePoint(){var e;return(e=this.media)==null?void 0:e.activeCuePoint}get cuePoints(){var e,i;return(i=(e=this.media)==null?void 0:e.cuePoints)!=null?i:[]}addChapters(e){var i;if(Te(this,me,Di).call(this),!this.media){vt("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(i=this.media)==null?void 0:i.addChapters(e)}get activeChapter(){var e;return(e=this.media)==null?void 0:e.activeChapter}get chapters(){var e,i;return(i=(e=this.media)==null?void 0:e.chapters)!=null?i:[]}getStartDate(){var e;return(e=this.media)==null?void 0:e.getStartDate()}get currentPdt(){var e;return(e=this.media)==null?void 0:e.currentPdt}get tokens(){let e=this.getAttribute(k.PLAYBACK_TOKEN),i=this.getAttribute(k.DRM_TOKEN),a=this.getAttribute(k.THUMBNAIL_TOKEN),r=this.getAttribute(k.STORYBOARD_TOKEN);return{...J(this,cl),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{},...a!=null?{thumbnail:a}:{},...r!=null?{storyboard:r}:{}}}set tokens(e){ti(this,cl,e??{})}get playbackToken(){var e;return(e=this.getAttribute(k.PLAYBACK_TOKEN))!=null?e:void 0}set playbackToken(e){this.setAttribute(k.PLAYBACK_TOKEN,`${e}`)}get drmToken(){var e;return(e=this.getAttribute(k.DRM_TOKEN))!=null?e:void 0}set drmToken(e){this.setAttribute(k.DRM_TOKEN,`${e}`)}get thumbnailToken(){var e;return(e=this.getAttribute(k.THUMBNAIL_TOKEN))!=null?e:void 0}set thumbnailToken(e){this.setAttribute(k.THUMBNAIL_TOKEN,`${e}`)}get storyboardToken(){var e;return(e=this.getAttribute(k.STORYBOARD_TOKEN))!=null?e:void 0}set storyboardToken(e){this.setAttribute(k.STORYBOARD_TOKEN,`${e}`)}addTextTrack(e,i,a,r){var s;let o=(s=this.media)==null?void 0:s.nativeEl;if(o)return yc(o,e,i,a,r)}removeTextTrack(e){var i;let a=(i=this.media)==null?void 0:i.nativeEl;if(a)return c0(a,e)}get textTracks(){var e;return(e=this.media)==null?void 0:e.textTracks}get castReceiver(){var e;return(e=this.getAttribute(k.CAST_RECEIVER))!=null?e:void 0}set castReceiver(e){e!==this.castReceiver&&(e?this.setAttribute(k.CAST_RECEIVER,e):this.removeAttribute(k.CAST_RECEIVER))}get castCustomData(){var e;return(e=this.media)==null?void 0:e.castCustomData}set castCustomData(e){if(!this.media){vt("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=e}get noTooltips(){return this.hasAttribute(k.NO_TOOLTIPS)}set noTooltips(e){if(!e){this.removeAttribute(k.NO_TOOLTIPS);return}this.setAttribute(k.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(k.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(e){e?this.setAttribute(k.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(k.PROUDLY_DISPLAY_MUX_BADGE)}},n(Pr,"Ne"),Pr);dl=new WeakMap,ul=new WeakMap,cl=new WeakMap,ia=new WeakMap,hl=new WeakMap,Er=new WeakMap,me=new WeakSet,Di=n(function(){var t,e,i,a;if(!J(this,ul)){ti(this,ul,!0),Te(this,me,aa).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof Zt.HTMLElement))throw""}catch{vt("<media-theme> failed to upgrade!")}try{customElements.upgrade(this.media)}catch{vt("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof xy))throw""}catch{vt("<media-controller> failed to upgrade!")}Te(this,me,_v).call(this),Te(this,me,gv).call(this),Te(this,me,yv).call(this),ti(this,ia,(e=(t=this.mediaController)==null?void 0:t.hasAttribute(O.USER_INACTIVE))!=null?e:!0),Te(this,me,Tv).call(this),(i=this.media)==null||i.addEventListener("streamtypechange",()=>Te(this,me,aa).call(this)),(a=this.media)==null||a.addEventListener("loadstart",()=>Te(this,me,aa).call(this))}},"w"),bb=n(function(){var t,e;try{(t=window?.CSS)==null||t.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(e=window?.CSS)==null||e.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},"Nt"),pc=n(function(t){Object.assign(J(this,Er),t),Te(this,me,aa).call(this)},"we"),aa=n(function(t={}){$k(Hk(jk(this,{...J(this,Er),...t})),this.shadowRoot)},"H"),_v=n(function(){let t=n(e=>{var i,a;if(!(e!=null&&e.startsWith("theme-")))return;let r=e.replace(/^theme-/,"");if(mc.includes(r))return;let s=this.getAttribute(e);s!=null?(i=this.mediaTheme)==null||i.setAttribute(r,s):(a=this.mediaTheme)==null||a.removeAttribute(r)},"e");new MutationObserver(e=>{for(let{attributeName:i}of e)t(i)}).observe(this,{attributes:!0}),this.getAttributeNames().forEach(t)},"wt"),gv=n(function(){let t=n(e=>{var i;let a=(i=this.media)==null?void 0:i.error;if(!(a instanceof L)){let{message:s,code:o}=a??{};a=new L(s,o)}if(!(a!=null&&a.fatal)){ci(a),a.data&&ci(`${a.name} data:`,a.data);return}let r=hv(a);r.message&&pb(r),vt(a),a.data&&vt(`${a.name} data:`,a.data),Te(this,me,pc).call(this,{isDialogOpen:!0})},"e");this.addEventListener("error",t),this.media&&(this.media.errorTranslator=(e={})=>{var i,a,r;if(!(((i=this.media)==null?void 0:i.error)instanceof L))return e;let s=hv((a=this.media)==null?void 0:a.error);return{player_error_code:(r=this.media)==null?void 0:r.error.code,player_error_message:s.message?String(s.message):e.player_error_message,player_error_context:s.context?String(s.context):e.player_error_context}})},"It"),yv=n(function(){var t,e,i,a;let r=n(()=>Te(this,me,aa).call(this),"e");(e=(t=this.media)==null?void 0:t.textTracks)==null||e.addEventListener("addtrack",r),(a=(i=this.media)==null?void 0:i.textTracks)==null||a.addEventListener("removetrack",r)},"Pt"),Tv=n(function(){var t,e;if(!/Firefox/i.test(navigator.userAgent))return;let i,a=new WeakMap,r=n(()=>this.streamType===X.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,"n"),s=n((d,u,p=!1)=>{r()||Array.from(d&&d.activeCues||[]).forEach(v=>{if(!(!v.snapToLines||v.line<-5||v.line>=0&&v.line<10))if(!u||this.paused){let m=v.text.split(`
`).length,h=-3;this.streamType===X.LIVE&&(h=-2);let f=h-m;if(v.line===f&&!p)return;a.has(v)||a.set(v,v.line),v.line=f}else setTimeout(()=>{v.line=a.get(v)||"auto"},500)})},"d"),o=n(()=>{var d,u;s(i,(u=(d=this.mediaController)==null?void 0:d.hasAttribute(O.USER_INACTIVE))!=null?u:!1)},"l"),l=n(()=>{var d,u;let p=Array.from(((u=(d=this.mediaController)==null?void 0:d.media)==null?void 0:u.textTracks)||[]).filter(v=>["subtitles","captions"].includes(v.kind)&&v.mode==="showing")[0];p!==i&&i?.removeEventListener("cuechange",o),i=p,i?.addEventListener("cuechange",o),s(i,J(this,ia))},"b");l(),(t=this.textTracks)==null||t.addEventListener("change",l),(e=this.textTracks)==null||e.addEventListener("addtrack",l),this.addEventListener("userinactivechange",()=>{var d,u;let p=(u=(d=this.mediaController)==null?void 0:d.hasAttribute(O.USER_INACTIVE))!=null?u:!0;J(this,ia)!==p&&(ti(this,ia,p),s(i,J(this,ia)))})},"Dt");function Gi(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}n(Gi,"V");var Av=rS,$r,_b=($r=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}},n($r,"o"),$r);if(typeof DocumentFragment>"u"){const e=class e extends _b{};n(e,"e");let t=e;globalThis.DocumentFragment=t}var Ur,nS=(Ur=class extends _b{},n(Ur,"s"),Ur),sS={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(nS)}},oS={customElements:sS},lS=typeof window>"u"||typeof globalThis.customElements>"u",Pd=lS?oS:globalThis;Pd.customElements.get("mux-player")||(Pd.customElements.define("mux-player",Av),Pd.MuxPlayerElement=Av);var gb=parseInt(Yn.version)>=19,kv={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate"},dS=n(t=>t==null,"B"),uS=n((t,e)=>dS(e)?!1:t in e,"ee"),cS=n(t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),"te"),hS=n((t,e)=>{if(!(!gb&&typeof e=="boolean"&&!e)){if(uS(t,kv))return kv[t];if(typeof e<"u")return/[A-Z]/.test(t)?cS(t):t}},"ne"),mS=n((t,e)=>!gb&&typeof t=="boolean"?"":t,"ae"),pS=n((t={})=>{let{ref:e,...i}=t;return Object.entries(i).reduce((a,[r,s])=>{let o=hS(r,s);if(!o)return a;let l=mS(s);return a[o]=l,a},{})},"P");function Sv(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}n(Sv,"x");function vS(...t){return e=>{let i=!1,a=t.map(r=>{let s=Sv(r,e);return!i&&typeof s=="function"&&(i=!0),s});if(i)return()=>{for(let r=0;r<a.length;r++){let s=a[r];typeof s=="function"?s():Sv(t[r],null)}}}}n(vS,"re");function fS(...t){return Gn.useCallback(vS(...t),t)}n(fS,"f");var ES=Object.prototype.hasOwnProperty,bS=n((t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((r,s)=>e[s]===r);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let r=0;r<i.length;r++)if(!ES.call(e,i[r])||!Object.is(t[i[r]],e[i[r]]))return!1;return!0},"ue"),yb=n((t,e,i)=>!bS(e,t[i]),"p"),_S=n((t,e,i)=>{t[i]=e},"se"),gS=n((t,e,i,a=_S,r=yb)=>Gn.useEffect(()=>{let s=i?.current;s&&r(s,e,t)&&a(s,e,t)},[i?.current,e]),"ie"),Nt=gS,yS=n(()=>{try{return"3.9.2"}catch{}return"UNKNOWN"},"ye"),TS=yS(),AS=n(()=>TS,"g"),ue=n((t,e,i)=>Gn.useEffect(()=>{let a=e?.current;if(!a||!i)return;let r=t,s=i;return a.addEventListener(r,s),()=>{a.removeEventListener(r,s)}},[e?.current,i,t]),"r"),kS=Yn.forwardRef(({children:t,...e},i)=>Yn.createElement("mux-player",{suppressHydrationWarning:!0,...pS(e),ref:i},t)),SS=n((t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:s,onLoadStart:o,onLoadedData:l,onLoadedMetadata:d,onProgress:u,onDurationChange:p,onVolumeChange:v,onRateChange:m,onResize:h,onWaiting:f,onPlay:_,onPlaying:b,onTimeUpdate:y,onPause:A,onSeeking:g,onSeeked:w,onStalled:M,onSuspend:P,onEnded:W,onError:Z,onCuePointChange:ae,onChapterChange:q,metadata:H,tokens:$e,paused:Qe,playbackId:Ze,playbackRates:Ee,currentTime:Be,themeProps:Dt,extraSourceParams:We,castCustomData:bt,_hlsConfig:je,...Le}=e;return Nt("tokens",$e,t),Nt("playbackId",Ze,t),Nt("playbackRates",Ee,t),Nt("metadata",H,t),Nt("extraSourceParams",We,t),Nt("_hlsConfig",je,t),Nt("themeProps",Dt,t),Nt("castCustomData",bt,t),Nt("paused",Qe,t,(ze,lt)=>{lt!=null&&(lt?ze.pause():ze.play())},(ze,lt,wa)=>ze.hasAttribute("autoplay")&&!ze.hasPlayed?!1:yb(ze,lt,wa)),Nt("currentTime",Be,t,(ze,lt)=>{lt!=null&&(ze.currentTime=lt)}),ue("abort",t,i),ue("canplay",t,a),ue("canplaythrough",t,r),ue("emptied",t,s),ue("loadstart",t,o),ue("loadeddata",t,l),ue("loadedmetadata",t,d),ue("progress",t,u),ue("durationchange",t,p),ue("volumechange",t,v),ue("ratechange",t,m),ue("resize",t,h),ue("waiting",t,f),ue("play",t,_),ue("playing",t,b),ue("timeupdate",t,y),ue("pause",t,A),ue("seeking",t,g),ue("seeked",t,w),ue("stalled",t,M),ue("suspend",t,P),ue("ended",t,W),ue("error",t,Z),ue("cuepointchange",t,ae),ue("chapterchange",t,q),[Le]},"xe"),wS=AS(),IS="mux-player-react",RS=Yn.forwardRef((t,e)=>{var i;let a=Gn.useRef(null),r=fS(a,e),[s]=SS(a,t),[o]=Gn.useState((i=t.playerInitTime)!=null?i:Sc());return Yn.createElement(kS,{ref:r,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:IS,playerSoftwareVersion:wS,playerInitTime:o,...s})}),US=RS;export{OS as MaxResolution,L as MediaError,NS as MinResolution,PS as RenditionOrder,US as default,Sc as generatePlayerInitTime,IS as playerSoftwareName,wS as playerSoftwareVersion};

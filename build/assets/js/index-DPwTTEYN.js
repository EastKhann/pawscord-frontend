var _p=Object.defineProperty;var rb=Object.getPrototypeOf;var nb=Reflect.get;var bp=t=>{throw TypeError(t)};var sb=(t,e,i)=>e in t?_p(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var n=(t,e)=>_p(t,"name",{value:e,configurable:!0});var gp=(t,e,i)=>sb(t,typeof e!="symbol"?e+"":e,i),Ud=(t,e,i)=>e.has(t)||bp("Cannot "+i);var k=(t,e,i)=>(Ud(t,e,"read from private field"),i?i.call(t):e.get(t)),Fe=(t,e,i)=>e.has(t)?bp("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),Ze=(t,e,i,a)=>(Ud(t,e,"write to private field"),a?a.call(t,i):e.set(t,i),i),ht=(t,e,i)=>(Ud(t,e,"access private method"),i);var eo=(t,e,i)=>nb(rb(t),i,e);import{e as cs,r as hs}from"./react-core-C4sSNWFT.js";import{H as ob,C as lb}from"./hls-DaOv0uJZ.js";import{C as to,M as db}from"./mixin-YjRXhI2x.js";var ub=Object.create,nf=Object.defineProperty,cb=Object.getOwnPropertyDescriptor,hb=Object.getOwnPropertyNames,mb=Object.getPrototypeOf,pb=Object.prototype.hasOwnProperty,sf=n(function(t,e){return function(){return t&&(e=t(t=0)),e}},"mt$2"),it=n(function(t,e){return function(){return e||t((e={exports:{}}).exports,e),e.exports}},"B$4"),vb=n(function(t,e,i,a){if(e&&typeof e=="object"||typeof e=="function")for(var r=hb(e),s=0,o=r.length,l;s<o;s++)l=r[s],!pb.call(t,l)&&l!==i&&nf(t,l,{get:function(d){return e[d]}.bind(null,l),enumerable:!(a=cb(e,l))||a.enumerable});return t},"oa$1"),yt=n(function(t,e,i){return i=t!=null?ub(mb(t)):{},vb(!t||!t.__esModule?nf(i,"default",{value:t,enumerable:!0}):i,t)},"G$3"),mi=it(function(t,e){var i;typeof window<"u"?i=window:typeof global<"u"?i=global:typeof self<"u"?i=self:i={},e.exports=i});function Pa(t,e){return e!=null&&typeof Symbol<"u"&&e[Symbol.hasInstance]?!!e[Symbol.hasInstance](t):Pa(t,e)}n(Pa,"U$3");var $a=sf(function(){$a()});function of(t){"@swc/helpers - typeof";return t&&typeof Symbol<"u"&&t.constructor===Symbol?"symbol":typeof t}n(of,"Me$2");var lf=sf(function(){}),df=it(function(t,e){var i=Array.prototype.slice;e.exports=a;function a(r,s){for(("length"in r)||(r=[r]),r=i.call(r);r.length;){var o=r.shift(),l=s(o);if(l)return l;o.childNodes&&o.childNodes.length&&(r=i.call(o.childNodes).concat(r))}}n(a,"Ca")}),fb=it(function(t,e){$a(),e.exports=i;function i(a,r){if(!Pa(this,i))return new i(a,r);this.data=a,this.nodeValue=a,this.length=a.length,this.ownerDocument=r||null}n(i,"ye"),i.prototype.nodeType=8,i.prototype.nodeName="#comment",i.prototype.toString=function(){return"[object Comment]"}}),Eb=it(function(t,e){$a(),e.exports=i;function i(a,r){if(!Pa(this,i))return new i(a);this.data=a||"",this.length=this.data.length,this.ownerDocument=r||null}n(i,"ne"),i.prototype.type="DOMTextNode",i.prototype.nodeType=3,i.prototype.nodeName="#text",i.prototype.toString=function(){return this.data},i.prototype.replaceData=function(a,r,s){var o=this.data,l=o.substring(0,a),d=o.substring(a+r,o.length);this.data=l+s+d,this.length=this.data.length}}),uf=it(function(t,e){e.exports=i;function i(a){var r=this,s=a.type;a.target||(a.target=r),r.listeners||(r.listeners={});var o=r.listeners[s];if(o)return o.forEach(function(l){a.currentTarget=r,typeof l=="function"?l(a):l.handleEvent(a)});r.parentNode&&r.parentNode.dispatchEvent(a)}n(i,"Ma")}),cf=it(function(t,e){e.exports=i;function i(a,r){var s=this;s.listeners||(s.listeners={}),s.listeners[a]||(s.listeners[a]=[]),s.listeners[a].indexOf(r)===-1&&s.listeners[a].push(r)}n(i,"Ha")}),hf=it(function(t,e){e.exports=i;function i(a,r){var s=this;if(s.listeners&&s.listeners[a]){var o=s.listeners[a],l=o.indexOf(r);l!==-1&&o.splice(l,1)}}n(i,"Ba")}),_b=it(function(t,e){lf(),e.exports=a;var i=["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];function a(c){switch(c.nodeType){case 3:return p(c.data);case 8:return"<!--"+c.data+"-->";default:return r(c)}}n(a,"hr");function r(c){var u=[],f=c.tagName;return c.namespaceURI==="http://www.w3.org/1999/xhtml"&&(f=f.toLowerCase()),u.push("<"+f+h(c)+l(c)),i.indexOf(f)>-1?u.push(" />"):(u.push(">"),c.childNodes.length?u.push.apply(u,c.childNodes.map(a)):c.textContent||c.innerText?u.push(p(c.textContent||c.innerText)):c.innerHTML&&u.push(c.innerHTML),u.push("</"+f+">")),u.join("")}n(r,"Fa");function s(c,u){var f=of(c[u]);return u==="style"&&Object.keys(c.style).length>0?!0:c.hasOwnProperty(u)&&(f==="string"||f==="boolean"||f==="number")&&u!=="nodeName"&&u!=="className"&&u!=="tagName"&&u!=="textContent"&&u!=="innerText"&&u!=="namespaceURI"&&u!=="innerHTML"}n(s,"Wa");function o(c){if(typeof c=="string")return c;var u="";return Object.keys(c).forEach(function(f){var _=c[f];f=f.replace(/[A-Z]/g,function(b){return"-"+b.toLowerCase()}),u+=f+":"+_+";"}),u}n(o,"ja");function l(c){var u=c.dataset,f=[];for(var _ in u)f.push({name:"data-"+_,value:u[_]});return f.length?d(f):""}n(l,"Va");function d(c){var u=[];return c.forEach(function(f){var _=f.name,b=f.value;_==="style"&&(b=o(b)),u.push(_+'="'+v(b)+'"')}),u.length?" "+u.join(" "):""}n(d,"yr");function h(c){var u=[];for(var f in c)s(c,f)&&u.push({name:f,value:c[f]});for(var _ in c._attributes)for(var b in c._attributes[_]){var T=c._attributes[_][b],A=(T.prefix?T.prefix+":":"")+b;u.push({name:A,value:T.value})}return c.className&&u.push({name:"class",value:c.className}),u.length?d(u):""}n(h,"Ga");function p(c){var u="";return typeof c=="string"?u=c:c&&(u=c.toString()),u.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}n(p,"rt");function v(c){return p(c).replace(/"/g,"&quot;")}n(v,"Ja")}),mf=it(function(t,e){$a();var i=df(),a=uf(),r=cf(),s=hf(),o=_b(),l="http://www.w3.org/1999/xhtml";e.exports=d;function d(h,p,v){if(!Pa(this,d))return new d(h);var c=v===void 0?l:v||null;this.tagName=c===l?String(h).toUpperCase():h,this.nodeName=this.tagName,this.className="",this.dataset={},this.childNodes=[],this.parentNode=null,this.style={},this.ownerDocument=p||null,this.namespaceURI=c,this._attributes={},this.tagName==="INPUT"&&(this.type="text")}n(d,"I"),d.prototype.type="DOMElement",d.prototype.nodeType=1,d.prototype.appendChild=function(h){return h.parentNode&&h.parentNode.removeChild(h),this.childNodes.push(h),h.parentNode=this,h},d.prototype.replaceChild=function(h,p){h.parentNode&&h.parentNode.removeChild(h);var v=this.childNodes.indexOf(p);return p.parentNode=null,this.childNodes[v]=h,h.parentNode=this,p},d.prototype.removeChild=function(h){var p=this.childNodes.indexOf(h);return this.childNodes.splice(p,1),h.parentNode=null,h},d.prototype.insertBefore=function(h,p){h.parentNode&&h.parentNode.removeChild(h);var v=p==null?-1:this.childNodes.indexOf(p);return v>-1?this.childNodes.splice(v,0,h):this.childNodes.push(h),h.parentNode=this,h},d.prototype.setAttributeNS=function(h,p,v){var c=null,u=p,f=p.indexOf(":");if(f>-1&&(c=p.substr(0,f),u=p.substr(f+1)),this.tagName==="INPUT"&&p==="type")this.type=v;else{var _=this._attributes[h]||(this._attributes[h]={});_[u]={value:v,prefix:c}}},d.prototype.getAttributeNS=function(h,p){var v=this._attributes[h],c=v&&v[p]&&v[p].value;return this.tagName==="INPUT"&&p==="type"?this.type:typeof c!="string"?null:c},d.prototype.removeAttributeNS=function(h,p){var v=this._attributes[h];v&&delete v[p]},d.prototype.hasAttributeNS=function(h,p){var v=this._attributes[h];return!!v&&p in v},d.prototype.setAttribute=function(h,p){return this.setAttributeNS(null,h,p)},d.prototype.getAttribute=function(h){return this.getAttributeNS(null,h)},d.prototype.removeAttribute=function(h){return this.removeAttributeNS(null,h)},d.prototype.hasAttribute=function(h){return this.hasAttributeNS(null,h)},d.prototype.removeEventListener=s,d.prototype.addEventListener=r,d.prototype.dispatchEvent=a,d.prototype.focus=function(){},d.prototype.toString=function(){return o(this)},d.prototype.getElementsByClassName=function(h){var p=h.split(" "),v=[];return i(this,function(c){if(c.nodeType===1){var u=c.className||"",f=u.split(" ");p.every(function(_){return f.indexOf(_)!==-1})&&v.push(c)}}),v},d.prototype.getElementsByTagName=function(h){h=h.toLowerCase();var p=[];return i(this.childNodes,function(v){v.nodeType===1&&(h==="*"||v.tagName.toLowerCase()===h)&&p.push(v)}),p},d.prototype.contains=function(h){return i(this,function(p){return h===p})||!1}}),bb=it(function(t,e){$a();var i=mf();e.exports=a;function a(r){if(!Pa(this,a))return new a;this.childNodes=[],this.parentNode=null,this.ownerDocument=r||null}n(a,"Y"),a.prototype.type="DocumentFragment",a.prototype.nodeType=11,a.prototype.nodeName="#document-fragment",a.prototype.appendChild=i.prototype.appendChild,a.prototype.replaceChild=i.prototype.replaceChild,a.prototype.removeChild=i.prototype.removeChild,a.prototype.toString=function(){return this.childNodes.map(function(r){return String(r)}).join("")}}),gb=it(function(t,e){e.exports=i;function i(a){}n(i,"ot"),i.prototype.initEvent=function(a,r,s){this.type=a,this.bubbles=r,this.cancelable=s},i.prototype.preventDefault=function(){}}),yb=it(function(t,e){$a();var i=df(),a=fb(),r=Eb(),s=mf(),o=bb(),l=gb(),d=uf(),h=cf(),p=hf();e.exports=v;function v(){if(!Pa(this,v))return new v;this.head=this.createElement("head"),this.body=this.createElement("body"),this.documentElement=this.createElement("html"),this.documentElement.appendChild(this.head),this.documentElement.appendChild(this.body),this.childNodes=[this.documentElement],this.nodeType=9}n(v,"We");var c=v.prototype;c.createTextNode=function(u){return new r(u,this)},c.createElementNS=function(u,f){var _=u===null?null:String(u);return new s(f,this,_)},c.createElement=function(u){return new s(u,this)},c.createDocumentFragment=function(){return new o(this)},c.createEvent=function(u){return new l(u)},c.createComment=function(u){return new a(u,this)},c.getElementById=function(u){u=String(u);var f=i(this.childNodes,function(_){if(String(_.id)===u)return _});return f||null},c.getElementsByClassName=s.prototype.getElementsByClassName,c.getElementsByTagName=s.prototype.getElementsByTagName,c.contains=s.prototype.contains,c.removeEventListener=p,c.addEventListener=h,c.dispatchEvent=d}),Tb=it(function(t,e){var i=yb();e.exports=new i}),pf=it(function(t,e){var i=typeof global<"u"?global:typeof window<"u"?window:{},a=Tb(),r;typeof document<"u"?r=document:(r=i["__GLOBAL_DOCUMENT_CACHE@4"],r||(r=i["__GLOBAL_DOCUMENT_CACHE@4"]=a)),e.exports=r});function Ab(t){if(Array.isArray(t))return t}n(Ab,"vt$2");function kb(t,e){var i=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(i!=null){var a=[],r=!0,s=!1,o,l;try{for(i=i.call(t);!(r=(o=i.next()).done)&&(a.push(o.value),!(e&&a.length===e));r=!0);}catch(d){s=!0,l=d}finally{try{!r&&i.return!=null&&i.return()}finally{if(s)throw l}}return a}}n(kb,"ht$2");function Sb(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}n(Sb,"yt$2");function ou(t,e){(e==null||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}n(ou,"Re$2");function vf(t,e){if(t){if(typeof t=="string")return ou(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);if(i==="Object"&&t.constructor&&(i=t.constructor.name),i==="Map"||i==="Set")return Array.from(i);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return ou(t,e)}}n(vf,"Le$2");function Ci(t,e){return Ab(t)||kb(t,e)||vf(t,e)||Sb()}n(Ci,"H$1");var Zn=yt(mi()),yp=yt(mi()),wb=yt(mi()),Ib={now:n(function(){var t=wb.default.performance,e=t&&t.timing,i=e&&e.navigationStart,a=typeof i=="number"&&typeof t.now=="function"?i+t.now():Date.now();return Math.round(a)},"now")},Pe=Ib,ms=n(function(){var t,e,i;if(typeof((t=yp.default.crypto)===null||t===void 0?void 0:t.getRandomValues)=="function"){i=new Uint8Array(32),yp.default.crypto.getRandomValues(i);for(var a=0;a<32;a++)i[a]=i[a]%16}else{i=[];for(var r=0;r<32;r++)i[r]=Math.random()*16|0}var s=0;e="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(d){var h=d==="x"?i[s]:i[s]&3|8;return s++,h.toString(16)});var o=Pe.now(),l=o?.toString(16).substring(3);return l?e.substring(0,28)+l:e},"re$3"),ff=n(function(){return("000000"+(Math.random()*Math.pow(36,6)<<0).toString(36)).slice(-6)},"Ie$2"),wt=n(function(t){if(t&&typeof t.nodeName<"u")return t.muxId||(t.muxId=ff()),t.muxId;var e;try{e=document.querySelector(t)}catch{}return e&&!e.muxId&&(e.muxId=t),e?.muxId||t},"J$2"),Ol=n(function(t){var e;t&&typeof t.nodeName<"u"?(e=t,t=wt(e)):e=document.querySelector(t);var i=e&&e.nodeName?e.nodeName.toLowerCase():"";return[e,t,i]},"de$4");function Rb(t){if(Array.isArray(t))return ou(t)}n(Rb,"wt");function Lb(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}n(Lb,"Tt$2");function Cb(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}n(Cb,"Et$1");function It(t){return Rb(t)||Lb(t)||vf(t)||Cb()}n(It,"W$2");var ya={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4},Db=n(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:3,i,a,r,s,o,l=[console,t],d=(i=console.trace).bind.apply(i,It(l)),h=(a=console.info).bind.apply(a,It(l)),p=(r=console.debug).bind.apply(r,It(l)),v=(s=console.warn).bind.apply(s,It(l)),c=(o=console.error).bind.apply(o,It(l)),u=e;return{trace:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(u>ya.TRACE))return d.apply(void 0,It(_))},"trace"),debug:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(u>ya.DEBUG))return p.apply(void 0,It(_))},"debug"),info:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(u>ya.INFO))return h.apply(void 0,It(_))},"info"),warn:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(u>ya.WARN))return v.apply(void 0,It(_))},"warn"),error:n(function(){for(var f=arguments.length,_=new Array(f),b=0;b<f;b++)_[b]=arguments[b];if(!(u>ya.ERROR))return c.apply(void 0,It(_))},"error"),get level(){return u},set level(f){f!==this.level&&(u=f??e)}}},"kt$2"),ne=Db("[mux]"),Hd=yt(mi());function lu(){var t=Hd.default.doNotTrack||Hd.default.navigator&&Hd.default.navigator.doNotTrack;return t==="1"}n(lu,"fe$2");function U(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}n(U,"b$3");$a();function be(t,e){if(!Pa(t,e))throw new TypeError("Cannot call a class as a function")}n(be,"k$3");function Tp(t,e){for(var i=0;i<e.length;i++){var a=e[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}n(Tp,"xt$1");function Tt(t,e,i){return e&&Tp(t.prototype,e),i&&Tp(t,i),t}n(Tt,"N$2");function R(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}n(R,"l$2");function Xr(t){return Xr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Xr(t)}n(Xr,"$$2");function Mb(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&(t=Xr(t),t!==null););return t}n(Mb,"Rt$2");function To(t,e,i){return typeof Reflect<"u"&&Reflect.get?To=Reflect.get:To=n(function(a,r,s){var o=Mb(a,r);if(o){var l=Object.getOwnPropertyDescriptor(o,r);return l.get?l.get.call(s||a):l.value}},"Se$2"),To(t,e,i||t)}n(To,"Se$2");function du(t,e){return du=Object.setPrototypeOf||function(i,a){return i.__proto__=a,i},du(t,e)}n(du,"Ce$2");function Ob(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&du(t,e)}n(Ob,"Dt$1");function xb(t,e){if(t==null)return{};var i={},a=Object.keys(t),r,s;for(s=0;s<a.length;s++)r=a[s],!(e.indexOf(r)>=0)&&(i[r]=t[r]);return i}n(xb,"St$2");function Nb(t,e){if(t==null)return{};var i=xb(t,e),a,r;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(r=0;r<s.length;r++)a=s[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(i[a]=t[a])}return i}n(Nb,"qt$2");function Pb(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}n(Pb,"At$2");lf();function $b(t,e){return e&&(of(e)==="object"||typeof e=="function")?e:U(t)}n($b,"Ot$1");function Ub(t){var e=Pb();return function(){var i=Xr(t),a;if(e){var r=Xr(this).constructor;a=Reflect.construct(i,arguments,r)}else a=i.apply(this,arguments);return $b(this,a)}}n(Ub,"Pt$1");var Nt=n(function(t){return ps(t)[0]},"F$1"),ps=n(function(t){if(typeof t!="string"||t==="")return["localhost"];var e=/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/,i=t.match(e)||[],a=i[4],r;return a&&(r=(a.match(/[^\.]+\.[^\.]+$/)||[])[0]),[a,r]},"ie$3"),Wd=yt(mi()),Hb={exists:n(function(){var t=Wd.default.performance,e=t&&t.timing;return e!==void 0},"exists"),domContentLoadedEventEnd:n(function(){var t=Wd.default.performance,e=t&&t.timing;return e&&e.domContentLoadedEventEnd},"domContentLoadedEventEnd"),navigationStart:n(function(){var t=Wd.default.performance,e=t&&t.timing;return e&&e.navigationStart},"navigationStart")},xl=Hb;function De(t,e,i){i=i===void 0?1:i,t[e]=t[e]||0,t[e]+=i}n(De,"P$4");function vs(t){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{},a=Object.keys(i);typeof Object.getOwnPropertySymbols=="function"&&(a=a.concat(Object.getOwnPropertySymbols(i).filter(function(r){return Object.getOwnPropertyDescriptor(i,r).enumerable}))),a.forEach(function(r){R(t,r,i[r])})}return t}n(vs,"Z$2");function Wb(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);i.push.apply(i,a)}return i}n(Wb,"la$1");function Kc(t,e){return e=e??{},Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):Wb(Object(e)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(e,i))}),t}n(Kc,"me$3");var Bb=["x-cdn","content-type"],Ef=["x-request-id","cf-ray","x-amz-cf-id","x-akamai-request-id"],Fb=Bb.concat(Ef);function Vc(t){t=t||"";var e={},i=t.trim().split(/[\r\n]+/);return i.forEach(function(a){if(a){var r=a.split(": "),s=r.shift();s&&(Fb.indexOf(s.toLowerCase())>=0||s.toLowerCase().indexOf("x-litix-")===0)&&(e[s]=r.join(": "))}}),e}n(Vc,"ve$1");function Nl(t){if(t){var e=Ef.find(function(i){return t[i]!==void 0});return e?t[e]:void 0}}n(Nl,"ce$2");var Kb=n(function(t){var e={};for(var i in t){var a=t[i],r=a["DATA-ID"].search("io.litix.data.");if(r!==-1){var s=a["DATA-ID"].replace("io.litix.data.","");e[s]=a.VALUE}}return e},"_a$1"),_f=Kb,io=n(function(t){if(!t)return{};var e=xl.navigationStart(),i=t.loading,a=i?i.start:t.trequest,r=i?i.first:t.tfirst,s=i?i.end:t.tload;return{bytesLoaded:t.total,requestStart:Math.round(e+a),responseStart:Math.round(e+r),responseEnd:Math.round(e+s)}},"Ue$1"),fn=n(function(t){if(!(!t||typeof t.getAllResponseHeaders!="function"))return Vc(t.getAllResponseHeaders())},"qe$1"),Vb=n(function(t,e,i){var a=arguments.length>4?arguments[4]:void 0,r=t.log,s=t.utils.secondsToMs,o=n(function(b){var T=parseInt(a.version),A;return T===1&&b.programDateTime!==null&&(A=b.programDateTime),T===0&&b.pdt!==null&&(A=b.pdt),A},"s");if(!xl.exists()){r.warn("performance timing not supported. Not tracking HLS.js.");return}var l=n(function(b,T){return t.emit(e,b,T)},"u"),d=n(function(b,T){var A=T.levels,g=T.audioTracks,w=T.url,O=T.stats,M=T.networkDetails,H=T.sessionData,F={},j={};A.forEach(function(ge,qe){F[qe]={width:ge.width,height:ge.height,bitrate:ge.bitrate,attrs:ge.attrs}}),g.forEach(function(ge,qe){j[qe]={name:ge.name,language:ge.lang,bitrate:ge.bitrate}});var K=io(O),W=K.bytesLoaded,We=K.requestStart,at=K.responseStart,rt=K.responseEnd;l("requestcompleted",Kc(vs({},_f(H)),{request_event_type:b,request_bytes_loaded:W,request_start:We,request_response_start:at,request_response_end:rt,request_type:"manifest",request_hostname:Nt(w),request_response_headers:fn(M),request_rendition_lists:{media:F,audio:j,video:{}}}))},"p");i.on(a.Events.MANIFEST_LOADED,d);var h=n(function(b,T){var A=T.details,g=T.level,w=T.networkDetails,O=T.stats,M=io(O),H=M.bytesLoaded,F=M.requestStart,j=M.responseStart,K=M.responseEnd,W=A.fragments[A.fragments.length-1],We=o(W)+s(W.duration);l("requestcompleted",{request_event_type:b,request_bytes_loaded:H,request_start:F,request_response_start:j,request_response_end:K,request_current_level:g,request_type:"manifest",request_hostname:Nt(A.url),request_response_headers:fn(w),video_holdback:A.holdBack&&s(A.holdBack),video_part_holdback:A.partHoldBack&&s(A.partHoldBack),video_part_target_duration:A.partTarget&&s(A.partTarget),video_target_duration:A.targetduration&&s(A.targetduration),video_source_is_live:A.live,player_manifest_newest_program_time:isNaN(We)?void 0:We})},"y");i.on(a.Events.LEVEL_LOADED,h);var p=n(function(b,T){var A=T.details,g=T.networkDetails,w=T.stats,O=io(w),M=O.bytesLoaded,H=O.requestStart,F=O.responseStart,j=O.responseEnd;l("requestcompleted",{request_event_type:b,request_bytes_loaded:M,request_start:H,request_response_start:F,request_response_end:j,request_type:"manifest",request_hostname:Nt(A.url),request_response_headers:fn(g)})},"x");i.on(a.Events.AUDIO_TRACK_LOADED,p);var v=n(function(b,T){var A=T.stats,g=T.networkDetails,w=T.frag;A=A||w.stats;var O=io(A),M=O.bytesLoaded,H=O.requestStart,F=O.responseStart,j=O.responseEnd,K=g?fn(g):void 0,W={request_event_type:b,request_bytes_loaded:M,request_start:H,request_response_start:F,request_response_end:j,request_hostname:g?Nt(g.responseURL):void 0,request_id:K?Nl(K):void 0,request_response_headers:K,request_media_duration:w.duration,request_url:g?.responseURL};w.type==="main"?(W.request_type="media",W.request_current_level=w.level,W.request_video_width=(i.levels[w.level]||{}).width,W.request_video_height=(i.levels[w.level]||{}).height,W.request_labeled_bitrate=(i.levels[w.level]||{}).bitrate):W.request_type=w.type,l("requestcompleted",W)},"D");i.on(a.Events.FRAG_LOADED,v);var c=n(function(b,T){var A=T.frag,g=A.start,w=o(A),O={currentFragmentPDT:w,currentFragmentStart:s(g)};l("fragmentchange",O)},"f");i.on(a.Events.FRAG_CHANGED,c);var u=n(function(b,T){var A=T.type,g=T.details,w=T.response,O=T.fatal,M=T.frag,H=T.networkDetails,F=M?.url||T.url||"",j=H?fn(H):void 0;if((g===a.ErrorDetails.MANIFEST_LOAD_ERROR||g===a.ErrorDetails.MANIFEST_LOAD_TIMEOUT||g===a.ErrorDetails.FRAG_LOAD_ERROR||g===a.ErrorDetails.FRAG_LOAD_TIMEOUT||g===a.ErrorDetails.LEVEL_LOAD_ERROR||g===a.ErrorDetails.LEVEL_LOAD_TIMEOUT||g===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||g===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT||g===a.ErrorDetails.SUBTITLE_LOAD_ERROR||g===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT||g===a.ErrorDetails.KEY_LOAD_ERROR||g===a.ErrorDetails.KEY_LOAD_TIMEOUT)&&l("requestfailed",{request_error:g,request_url:F,request_hostname:Nt(F),request_id:j?Nl(j):void 0,request_type:g===a.ErrorDetails.FRAG_LOAD_ERROR||g===a.ErrorDetails.FRAG_LOAD_TIMEOUT?"media":g===a.ErrorDetails.AUDIO_TRACK_LOAD_ERROR||g===a.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT?"audio":g===a.ErrorDetails.SUBTITLE_LOAD_ERROR||g===a.ErrorDetails.SUBTITLE_LOAD_TIMEOUT?"subtitle":g===a.ErrorDetails.KEY_LOAD_ERROR||g===a.ErrorDetails.KEY_LOAD_TIMEOUT?"encryption":"manifest",request_error_code:w?.code,request_error_text:w?.text}),O){var K,W="".concat(F?"url: ".concat(F,`
`):"")+"".concat(w&&(w.code||w.text)?"response: ".concat(w.code,", ").concat(w.text,`
`):"")+"".concat(T.reason?"failure reason: ".concat(T.reason,`
`):"")+"".concat(T.level?"level: ".concat(T.level,`
`):"")+"".concat(T.parent?"parent stream controller: ".concat(T.parent,`
`):"")+"".concat(T.buffer?"buffer length: ".concat(T.buffer,`
`):"")+"".concat(T.error?"error: ".concat(T.error,`
`):"")+"".concat(T.event?"event: ".concat(T.event,`
`):"")+"".concat(T.err?"error message: ".concat((K=T.err)===null||K===void 0?void 0:K.message,`
`):"");l("error",{player_error_code:A,player_error_message:g,player_error_context:W})}},"_");i.on(a.Events.ERROR,u);var f=n(function(b,T){var A=T.frag,g=A&&A._url||"";l("requestcanceled",{request_event_type:b,request_url:g,request_type:"media",request_hostname:Nt(g)})},"v");i.on(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,f);var _=n(function(b,T){var A=T.level,g=i.levels[A];if(g&&g.attrs&&g.attrs.BANDWIDTH){var w=g.attrs.BANDWIDTH,O,M=parseFloat(g.attrs["FRAME-RATE"]);isNaN(M)||(O=M),w?l("renditionchange",{video_source_fps:O,video_source_bitrate:w,video_source_width:g.width,video_source_height:g.height,video_source_rendition_name:g.name,video_source_codec:g?.videoCodec}):r.warn("missing BANDWIDTH from HLS manifest parsed by HLS.js")}},"w");i.on(a.Events.LEVEL_SWITCHED,_),i._stopMuxMonitor=function(){i.off(a.Events.MANIFEST_LOADED,d),i.off(a.Events.LEVEL_LOADED,h),i.off(a.Events.AUDIO_TRACK_LOADED,p),i.off(a.Events.FRAG_LOADED,v),i.off(a.Events.FRAG_CHANGED,c),i.off(a.Events.ERROR,u),i.off(a.Events.FRAG_LOAD_EMERGENCY_ABORTED,f),i.off(a.Events.LEVEL_SWITCHED,_),i.off(a.Events.DESTROYING,i._stopMuxMonitor),delete i._stopMuxMonitor},i.on(a.Events.DESTROYING,i._stopMuxMonitor)},"It$2"),qb=n(function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},"Nt$2"),Ap=n(function(t,e){if(!t||!t.requestEndDate)return{};var i=Nt(t.url),a=t.url,r=t.bytesLoaded,s=new Date(t.requestStartDate).getTime(),o=new Date(t.firstByteDate).getTime(),l=new Date(t.requestEndDate).getTime(),d=isNaN(t.duration)?0:t.duration,h=typeof e.getMetricsFor=="function"?e.getMetricsFor(t.mediaType).HttpList:e.getDashMetrics().getHttpRequests(t.mediaType),p;h.length>0&&(p=Vc(h[h.length-1]._responseHeaders||""));var v=p?Nl(p):void 0;return{requestStart:s,requestResponseStart:o,requestResponseEnd:l,requestBytesLoaded:r,requestResponseHeaders:p,requestMediaDuration:d,requestHostname:i,requestUrl:a,requestId:v}},"Ct$2"),Yb=n(function(t,e){if(typeof e.getCurrentRepresentationForType=="function"){var i=e.getCurrentRepresentationForType(t);return i?{currentLevel:i.absoluteIndex,renditionWidth:i.width||null,renditionHeight:i.height||null,renditionBitrate:i.bandwidth}:{}}var a=e.getQualityFor(t),r=e.getCurrentTrackFor(t).bitrateList;return r?{currentLevel:a,renditionWidth:r[a].width||null,renditionHeight:r[a].height||null,renditionBitrate:r[a].bandwidth}:{}},"fa$1"),Gb=n(function(t){var e;return(e=t.match(/.*codecs\*?="(.*)"/))===null||e===void 0?void 0:e[1]},"pa$1"),zb=n(function(t){try{var e,i,a=(i=t.getVersion)===null||i===void 0||(e=i.call(t))===null||e===void 0?void 0:e.split(".").map(function(r){return parseInt(r)})[0];return a}catch{return!1}},"ma$1"),Qb=n(function(t,e,i){var a=t.log;if(!i||!i.on){a.warn("Invalid dash.js player reference. Monitoring blocked.");return}var r=zb(i),s=n(function(A,g){return t.emit(e,A,g)},"o"),o=n(function(A){var g=A.type,w=A.data,O=(w||{}).url;s("requestcompleted",{request_event_type:g,request_start:0,request_response_start:0,request_response_end:0,request_bytes_loaded:-1,request_type:"manifest",request_hostname:Nt(O),request_url:O})},"s");i.on("manifestLoaded",o);var l={},d=n(function(A){if(typeof A.getRequests!="function")return null;var g=A.getRequests({state:"executed"});return g.length===0?null:g[g.length-1]},"p"),h=n(function(A){var g=A.type,w=A.fragmentModel,O=A.chunk,M=d(w);p({type:g,request:M,chunk:O})},"y"),p=n(function(A){var g=A.type,w=A.chunk,O=A.request,M=(w||{}).mediaInfo,H=M||{},F=H.type,j=H.bitrateList;j=j||[];var K={};j.forEach(function(nt,Me){K[Me]={},K[Me].width=nt.width,K[Me].height=nt.height,K[Me].bitrate=nt.bandwidth,K[Me].attrs={}}),F==="video"?l.video=K:F==="audio"?l.audio=K:l.media=K;var W=Ap(O,i),We=W.requestStart,at=W.requestResponseStart,rt=W.requestResponseEnd,ge=W.requestResponseHeaders,qe=W.requestMediaDuration,Ut=W.requestHostname,Ye=W.requestUrl,At=W.requestId;s("requestcompleted",{request_event_type:g,request_start:We,request_response_start:at,request_response_end:rt,request_bytes_loaded:-1,request_type:F+"_init",request_response_headers:ge,request_hostname:Ut,request_id:At,request_url:Ye,request_media_duration:qe,request_rendition_lists:l})},"x");r>=4?i.on("initFragmentLoaded",p):i.on("initFragmentLoaded",h);var v=n(function(A){var g=A.type,w=A.fragmentModel,O=A.chunk,M=d(w);c({type:g,request:M,chunk:O})},"D"),c=n(function(A){var g=A.type,w=A.chunk,O=A.request,M=w||{},H=M.mediaInfo,F=M.start,j=H||{},K=j.type,W=Ap(O,i),We=W.requestStart,at=W.requestResponseStart,rt=W.requestResponseEnd,ge=W.requestBytesLoaded,qe=W.requestResponseHeaders,Ut=W.requestMediaDuration,Ye=W.requestHostname,At=W.requestUrl,nt=W.requestId,Me=Yb(K,i),Be=Me.currentLevel,Ge=Me.renditionWidth,pi=Me.renditionHeight,sa=Me.renditionBitrate;s("requestcompleted",{request_event_type:g,request_start:We,request_response_start:at,request_response_end:rt,request_bytes_loaded:ge,request_type:K,request_response_headers:qe,request_hostname:Ye,request_id:nt,request_url:At,request_media_start_time:F,request_media_duration:Ut,request_current_level:Be,request_labeled_bitrate:sa,request_video_width:Ge,request_video_height:pi})},"f");r>=4?i.on("mediaFragmentLoaded",c):i.on("mediaFragmentLoaded",v);var u={video:void 0,audio:void 0,totalBitrate:void 0},f=n(function(){if(u.video&&typeof u.video.bitrate=="number"){if(!(u.video.width&&u.video.height)){a.warn("have bitrate info for video but missing width/height");return}var A=u.video.bitrate;if(u.audio&&typeof u.audio.bitrate=="number"&&(A+=u.audio.bitrate),A!==u.totalBitrate)return u.totalBitrate=A,{video_source_bitrate:A,video_source_height:u.video.height,video_source_width:u.video.width,video_source_codec:Gb(u.video.codec)}}},"v"),_=n(function(A,g,w){var O=A.mediaType;if(O==="audio"||O==="video"){var M;if(typeof i.getRepresentationsByType=="function")if(A.newRepresentation)M={bitrate:A.newRepresentation.bandwidth,width:A.newRepresentation.width,height:A.newRepresentation.height,qualityIndex:A.newRepresentation.absoluteIndex};else{var H=i.getRepresentationsByType(O);if(H&&typeof A.newQuality=="number"){var F=H.find(function(K){return K.absoluteIndex===A.newQuality||K.index===A.newQuality});F&&(M={bitrate:F.bandwidth,width:F.width,height:F.height,qualityIndex:A.newQuality})}}else{if(typeof A.newQuality!="number"){a.warn("missing evt.newQuality in qualityChangeRendered event",A);return}M=i.getBitrateInfoListFor(O).find(function(K){var W=K.qualityIndex;return W===A.newQuality})}if(!(M&&typeof M.bitrate=="number")){a.warn("missing bitrate info for ".concat(O));return}u[O]=Kc(vs({},M),{codec:i.getCurrentTrackFor(O).codec});var j=f();j&&s("renditionchange",j)}},"w");i.on("qualityChangeRendered",_);var b=n(function(A){var g=A.request,w=A.mediaType;g=g||{},s("requestcanceled",{request_event_type:g.type+"_"+g.action,request_url:g.url,request_type:w,request_hostname:Nt(g.url)})},"h");i.on("fragmentLoadingAbandoned",b);var T=n(function(A){var g=A.error,w,O,M=(g==null||(w=g.data)===null||w===void 0?void 0:w.request)||{},H=(g==null||(O=g.data)===null||O===void 0?void 0:O.response)||{};g?.code===27&&s("requestfailed",{request_error:M.type+"_"+M.action,request_url:M.url,request_hostname:Nt(M.url),request_type:M.mediaType,request_error_code:H.status,request_error_text:H.statusText});var F="".concat(M!=null&&M.url?"url: ".concat(M.url,`
`):"")+"".concat(H!=null&&H.status||H!=null&&H.statusText?"response: ".concat(H?.status,", ").concat(H?.statusText,`
`):"");s("error",{player_error_code:g?.code,player_error_message:g?.message,player_error_context:F})},"m");i.on("error",T),i._stopMuxMonitor=function(){i.off("manifestLoaded",o),i.off("initFragmentLoaded",p),i.off("mediaFragmentLoaded",c),i.off("qualityChangeRendered",_),i.off("error",T),i.off("fragmentLoadingAbandoned",b),delete i._stopMuxMonitor}},"Mt$2"),jb=n(function(t){t&&typeof t._stopMuxMonitor=="function"&&t._stopMuxMonitor()},"Ht$1"),kp=0,Zb=(function(){function t(){be(this,t),R(this,"_listeners",void 0)}return n(t,"r"),Tt(t,[{key:"on",value:n(function(e,i,a){return i._eventEmitterGuid=i._eventEmitterGuid||++kp,this._listeners=this._listeners||{},this._listeners[e]=this._listeners[e]||[],a&&(i=i.bind(a)),this._listeners[e].push(i),i},"value")},{key:"off",value:n(function(e,i){var a=this._listeners&&this._listeners[e];a&&a.forEach(function(r,s){r._eventEmitterGuid===i._eventEmitterGuid&&a.splice(s,1)})},"value")},{key:"one",value:n(function(e,i,a){var r=this;i._eventEmitterGuid=i._eventEmitterGuid||++kp;var s=n(function(){r.off(e,s),i.apply(a||this,arguments)},"o");s._eventEmitterGuid=i._eventEmitterGuid,this.on(e,s)},"value")},{key:"emit",value:n(function(e,i){var a=this;if(this._listeners){i=i||{};var r=this._listeners["before"+e]||[],s=this._listeners["before*"]||[],o=this._listeners[e]||[],l=this._listeners["after"+e]||[],d=n(function(h,p){h=h.slice(),h.forEach(function(v){v.call(a,{type:e},p)})},"p");d(r,i),d(s,i),d(o,i),d(l,i)}},"value")}]),t})(),Xb=Zb,Bd=yt(mi()),Jb=(function(){function t(e){var i=this;be(this,t),R(this,"_playbackHeartbeatInterval",void 0),R(this,"_playheadShouldBeProgressing",void 0),R(this,"pm",void 0),this.pm=e,this._playbackHeartbeatInterval=null,this._playheadShouldBeProgressing=!1,e.on("playing",function(){i._playheadShouldBeProgressing=!0}),e.on("play",this._startPlaybackHeartbeatInterval.bind(this)),e.on("playing",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adbreakstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplay",this._startPlaybackHeartbeatInterval.bind(this)),e.on("adplaying",this._startPlaybackHeartbeatInterval.bind(this)),e.on("devicewake",this._startPlaybackHeartbeatInterval.bind(this)),e.on("viewstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("rebufferstart",this._startPlaybackHeartbeatInterval.bind(this)),e.on("pause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("ended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("viewend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("error",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("aderror",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adpause",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adended",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("adbreakend",this._stopPlaybackHeartbeatInterval.bind(this)),e.on("seeked",function(){e.data.player_is_paused?i._stopPlaybackHeartbeatInterval():i._startPlaybackHeartbeatInterval()}),e.on("timeupdate",function(){i._playbackHeartbeatInterval!==null&&e.emit("playbackheartbeat")}),e.on("devicesleep",function(a,r){i._playbackHeartbeatInterval!==null&&(Bd.default.clearInterval(i._playbackHeartbeatInterval),e.emit("playbackheartbeatend",{viewer_time:r.viewer_time}),i._playbackHeartbeatInterval=null)})}return n(t,"r"),Tt(t,[{key:"_startPlaybackHeartbeatInterval",value:n(function(){var e=this;this._playbackHeartbeatInterval===null&&(this.pm.emit("playbackheartbeat"),this._playbackHeartbeatInterval=Bd.default.setInterval(function(){e.pm.emit("playbackheartbeat")},this.pm.playbackHeartbeatTime))},"value")},{key:"_stopPlaybackHeartbeatInterval",value:n(function(){this._playheadShouldBeProgressing=!1,this._playbackHeartbeatInterval!==null&&(Bd.default.clearInterval(this._playbackHeartbeatInterval),this.pm.emit("playbackheartbeatend"),this._playbackHeartbeatInterval=null)},"value")}]),t})(),eg=Jb,tg=n(function t(e){var i=this;be(this,t),R(this,"viewErrored",void 0),e.on("viewinit",function(){i.viewErrored=!1}),e.on("error",function(a,r){try{var s=e.errorTranslator({player_error_code:r.player_error_code,player_error_message:r.player_error_message,player_error_context:r.player_error_context,player_error_severity:r.player_error_severity,player_error_business_exception:r.player_error_business_exception});s&&(e.data.player_error_code=s.player_error_code||r.player_error_code,e.data.player_error_message=s.player_error_message||r.player_error_message,e.data.player_error_context=s.player_error_context||r.player_error_context,e.data.player_error_severity=s.player_error_severity||r.player_error_severity,e.data.player_error_business_exception=s.player_error_business_exception||r.player_error_business_exception,i.viewErrored=!0)}catch(o){e.mux.log.warn("Exception in error translator callback.",o),i.viewErrored=!0}}),e.on("aftererror",function(){var a,r,s,o,l;(a=e.data)===null||a===void 0||delete a.player_error_code,(r=e.data)===null||r===void 0||delete r.player_error_message,(s=e.data)===null||s===void 0||delete s.player_error_context,(o=e.data)===null||o===void 0||delete o.player_error_severity,(l=e.data)===null||l===void 0||delete l.player_error_business_exception})},"r"),ig=tg,ag=(function(){function t(e){be(this,t),R(this,"_watchTimeTrackerLastCheckedTime",void 0),R(this,"pm",void 0),this.pm=e,this._watchTimeTrackerLastCheckedTime=null,e.on("playbackheartbeat",this._updateWatchTime.bind(this)),e.on("playbackheartbeatend",this._clearWatchTimeState.bind(this))}return n(t,"r"),Tt(t,[{key:"_updateWatchTime",value:n(function(e,i){var a=i.viewer_time;this._watchTimeTrackerLastCheckedTime===null&&(this._watchTimeTrackerLastCheckedTime=a),De(this.pm.data,"view_watch_time",a-this._watchTimeTrackerLastCheckedTime),this._watchTimeTrackerLastCheckedTime=a},"value")},{key:"_clearWatchTimeState",value:n(function(e,i){this._updateWatchTime(e,i),this._watchTimeTrackerLastCheckedTime=null},"value")}]),t})(),rg=ag,ng=(function(){function t(e){var i=this;be(this,t),R(this,"_playbackTimeTrackerLastPlayheadPosition",void 0),R(this,"_lastTime",void 0),R(this,"_isAdPlaying",void 0),R(this,"_callbackUpdatePlaybackTime",void 0),R(this,"pm",void 0),this.pm=e,this._playbackTimeTrackerLastPlayheadPosition=-1,this._lastTime=Pe.now(),this._isAdPlaying=!1,this._callbackUpdatePlaybackTime=null,e.on("viewinit",function(){i.pm.data.view_playing_time_ms_cumulative=0});var a=this._startPlaybackTimeTracking.bind(this);e.on("playing",a),e.on("adplaying",a);var r=n(function(){i.pm.data.player_is_paused||a()},"a");e.on("seeked",r),e.on("rebufferend",r);var s=this._stopPlaybackTimeTracking.bind(this);e.on("playbackheartbeatend",s),e.on("seeking",s),e.on("rebufferstart",s),e.on("adplaying",function(){i._isAdPlaying=!0}),e.on("adended",function(){i._isAdPlaying=!1}),e.on("adpause",function(){i._isAdPlaying=!1}),e.on("adbreakstart",function(){i._isAdPlaying=!1}),e.on("adbreakend",function(){i._isAdPlaying=!1}),e.on("adplay",function(){i._isAdPlaying=!1}),e.on("viewinit",function(){i._playbackTimeTrackerLastPlayheadPosition=-1,i._lastTime=Pe.now(),i._isAdPlaying=!1,i._callbackUpdatePlaybackTime=null})}return n(t,"r"),Tt(t,[{key:"_startPlaybackTimeTracking",value:n(function(){this._callbackUpdatePlaybackTime===null&&(this._callbackUpdatePlaybackTime=this._updatePlaybackTime.bind(this),this._playbackTimeTrackerLastPlayheadPosition=this.pm.data.player_playhead_time,this._lastTime=Pe.now(),this.pm.on("playbackheartbeat",this._callbackUpdatePlaybackTime))},"value")},{key:"_stopPlaybackTimeTracking",value:n(function(){this._callbackUpdatePlaybackTime&&(this._updatePlaybackTime(),this.pm.off("playbackheartbeat",this._callbackUpdatePlaybackTime),this._callbackUpdatePlaybackTime=null,this._playbackTimeTrackerLastPlayheadPosition=-1)},"value")},{key:"_updatePlaybackTime",value:n(function(){var e=this.pm.data.player_playhead_time||0,i=Pe.now(),a=i-this._lastTime,r=-1;this._playbackTimeTrackerLastPlayheadPosition>=0&&e>this._playbackTimeTrackerLastPlayheadPosition?r=e-this._playbackTimeTrackerLastPlayheadPosition:this._isAdPlaying&&(r=a),r>0&&r<=1e3&&De(this.pm.data,"view_content_playback_time",r),this._callbackUpdatePlaybackTime!==null&&a>0&&a<=1e3&&(this._isAdPlaying&&De(this.pm.data,"ad_playing_time_ms_cumulative",a),De(this.pm.data,"view_playing_time_ms_cumulative",a)),this._playbackTimeTrackerLastPlayheadPosition=e,this._lastTime=i},"value")}]),t})(),sg=ng,og=(function(){function t(e){be(this,t),R(this,"pm",void 0),this.pm=e;var i=this._updatePlayheadTime.bind(this);e.on("playbackheartbeat",i),e.on("playbackheartbeatend",i),e.on("timeupdate",i),e.on("destroy",function(){e.off("timeupdate",i)})}return n(t,"r"),Tt(t,[{key:"_updateMaxPlayheadPosition",value:n(function(){this.pm.data.view_max_playhead_position=typeof this.pm.data.view_max_playhead_position>"u"?this.pm.data.player_playhead_time:Math.max(this.pm.data.view_max_playhead_position,this.pm.data.player_playhead_time)},"value")},{key:"_updatePlayheadTime",value:n(function(e,i){var a=this,r=n(function(){a.pm.currentFragmentPDT&&a.pm.currentFragmentStart&&(a.pm.data.player_program_time=a.pm.currentFragmentPDT+a.pm.data.player_playhead_time-a.pm.currentFragmentStart)},"n");if(i&&i.player_playhead_time)this.pm.data.player_playhead_time=i.player_playhead_time,r(),this._updateMaxPlayheadPosition();else if(this.pm.getPlayheadTime){var s=this.pm.getPlayheadTime();typeof s<"u"&&(this.pm.data.player_playhead_time=s,r(),this._updateMaxPlayheadPosition())}},"value")}]),t})(),lg=og,Sp=300*1e3,dg=n(function t(e){if(be(this,t),!e.disableRebufferTracking){var i,a=n(function(s,o){r(o),i=void 0},"i"),r=n(function(s){if(i){var o=s.viewer_time-i;De(e.data,"view_rebuffer_duration",o),i=s.viewer_time,e.data.view_rebuffer_duration>Sp&&(e.emit("viewend"),e.send("viewend"),e.mux.log.warn("Ending view after rebuffering for longer than ".concat(Sp,"ms, future events will be ignored unless a programchange or videochange occurs.")))}e.data.view_watch_time>=0&&e.data.view_rebuffer_count>0&&(e.data.view_rebuffer_frequency=e.data.view_rebuffer_count/e.data.view_watch_time,e.data.view_rebuffer_percentage=e.data.view_rebuffer_duration/e.data.view_watch_time)},"a");e.on("playbackheartbeat",function(s,o){return r(o)}),e.on("rebufferstart",function(s,o){i||(De(e.data,"view_rebuffer_count",1),i=o.viewer_time,e.one("rebufferend",a))}),e.on("viewinit",function(){i=void 0,e.off("rebufferend",a)})}},"r"),ug=dg,cg=(function(){function t(e){var i=this;be(this,t),R(this,"_lastCheckedTime",void 0),R(this,"_lastPlayheadTime",void 0),R(this,"_lastPlayheadTimeUpdatedTime",void 0),R(this,"_rebuffering",void 0),R(this,"pm",void 0),this.pm=e,!(e.disableRebufferTracking||e.disablePlayheadRebufferTracking)&&(this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null,e.on("playbackheartbeat",this._checkIfRebuffering.bind(this)),e.on("playbackheartbeatend",this._cleanupRebufferTracker.bind(this)),e.on("seeking",function(){i._cleanupRebufferTracker(null,{viewer_time:Pe.now()})}))}return n(t,"r"),Tt(t,[{key:"_checkIfRebuffering",value:n(function(e,i){if(this.pm.seekingTracker.isSeeking||this.pm.adTracker.isAdBreak||!this.pm.playbackHeartbeat._playheadShouldBeProgressing){this._cleanupRebufferTracker(e,i);return}if(this._lastCheckedTime===null){this._prepareRebufferTrackerState(i.viewer_time);return}if(this._lastPlayheadTime!==this.pm.data.player_playhead_time){this._cleanupRebufferTracker(e,i,!0);return}var a=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.sustainedRebufferThreshold=="number"&&a>=this.pm.sustainedRebufferThreshold&&(this._rebuffering||(this._rebuffering=!0,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}))),this._lastCheckedTime=i.viewer_time},"value")},{key:"_clearRebufferTrackerState",value:n(function(){this._lastCheckedTime=null,this._lastPlayheadTime=null,this._lastPlayheadTimeUpdatedTime=null},"value")},{key:"_prepareRebufferTrackerState",value:n(function(e){this._lastCheckedTime=e,this._lastPlayheadTime=this.pm.data.player_playhead_time,this._lastPlayheadTimeUpdatedTime=e},"value")},{key:"_cleanupRebufferTracker",value:n(function(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1;if(this._rebuffering)this._rebuffering=!1,this.pm.emit("rebufferend",{viewer_time:i.viewer_time});else{if(this._lastCheckedTime===null)return;var r=this.pm.data.player_playhead_time-this._lastPlayheadTime,s=i.viewer_time-this._lastPlayheadTimeUpdatedTime;typeof this.pm.minimumRebufferDuration=="number"&&r>0&&s-r>this.pm.minimumRebufferDuration&&(this._lastCheckedTime=null,this.pm.emit("rebufferstart",{viewer_time:this._lastPlayheadTimeUpdatedTime}),this.pm.emit("rebufferend",{viewer_time:this._lastPlayheadTimeUpdatedTime+s-r}))}a?this._prepareRebufferTrackerState(i.viewer_time):this._clearRebufferTrackerState()},"value")}]),t})(),hg=cg,mg=(function(){function t(e){var i=this;be(this,t),R(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){var a=e.data,r=a.view_id;if(!a.view_program_changed){var s=n(function(o,l){var d=l.viewer_time;(o.type==="playing"&&typeof e.data.view_time_to_first_frame>"u"||o.type==="adplaying"&&(typeof e.data.view_time_to_first_frame>"u"||i._inPrerollPosition()))&&i.calculateTimeToFirstFrame(d||Pe.now(),r)},"n");e.one("playing",s),e.one("adplaying",s),e.one("viewend",function(){e.off("playing",s),e.off("adplaying",s)})}})}return n(t,"r"),Tt(t,[{key:"_inPrerollPosition",value:n(function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3},"value")},{key:"calculateTimeToFirstFrame",value:n(function(e,i){i===this.pm.data.view_id&&(this.pm.watchTimeTracker._updateWatchTime(null,{viewer_time:e}),this.pm.data.view_time_to_first_frame=this.pm.data.view_watch_time,(this.pm.data.player_autoplay_on||this.pm.data.video_is_autoplay)&&this.pm.pageLoadInitTime&&(this.pm.data.view_aggregate_startup_time=this.pm.data.view_start+this.pm.data.view_watch_time-this.pm.pageLoadInitTime))},"value")}]),t})(),pg=mg,vg=n(function t(e){var i=this;be(this,t),R(this,"_lastPlayerHeight",void 0),R(this,"_lastPlayerWidth",void 0),R(this,"_lastPlayheadPosition",void 0),R(this,"_lastSourceHeight",void 0),R(this,"_lastSourceWidth",void 0),e.on("viewinit",function(){i._lastPlayheadPosition=-1});var a=["pause","rebufferstart","seeking","error","adbreakstart","hb","renditionchange","orientationchange","viewend","playbackmodechange"],r=["playing","hb","renditionchange","orientationchange","playbackmodechange"];a.forEach(function(s){e.on(s,function(){if(i._lastPlayheadPosition>=0&&e.data.player_playhead_time>=0&&i._lastPlayerWidth>=0&&i._lastSourceWidth>0&&i._lastPlayerHeight>=0&&i._lastSourceHeight>0){var o=e.data.player_playhead_time-i._lastPlayheadPosition;if(o<0){i._lastPlayheadPosition=-1;return}var l=Math.min(i._lastPlayerWidth/i._lastSourceWidth,i._lastPlayerHeight/i._lastSourceHeight),d=Math.max(0,l-1),h=Math.max(0,1-l);e.data.view_max_upscale_percentage=Math.max(e.data.view_max_upscale_percentage||0,d),e.data.view_max_downscale_percentage=Math.max(e.data.view_max_downscale_percentage||0,h),De(e.data,"view_total_content_playback_time",o),De(e.data,"view_total_upscaling",d*o),De(e.data,"view_total_downscaling",h*o)}i._lastPlayheadPosition=-1})}),r.forEach(function(s){e.on(s,function(){i._lastPlayheadPosition=e.data.player_playhead_time,i._lastPlayerWidth=e.data.player_width,i._lastPlayerHeight=e.data.player_height,i._lastSourceWidth=e.data.video_source_width,i._lastSourceHeight=e.data.video_source_height})})},"r"),fg=vg,Eg=2e3,_g=n(function t(e){var i=this;be(this,t),R(this,"isSeeking",void 0),this.isSeeking=!1;var a=-1,r=n(function(){var s=Pe.now(),o=(e.data.viewer_time||s)-(a||s);De(e.data,"view_seek_duration",o),e.data.view_max_seek_time=Math.max(e.data.view_max_seek_time||0,o),i.isSeeking=!1,a=-1},"a");e.on("seeking",function(s,o){if(Object.assign(e.data,o),i.isSeeking&&o.viewer_time-a<=Eg){a=o.viewer_time;return}i.isSeeking&&r(),i.isSeeking=!0,a=o.viewer_time,De(e.data,"view_seek_count",1),e.send("seeking")}),e.on("seeked",function(){r()}),e.on("viewend",function(){i.isSeeking&&(r(),e.send("seeked")),i.isSeeking=!1,a=-1})},"r"),bg=_g,wp=n(function(t,e){t.push(e),t.sort(function(i,a){return i.viewer_time-a.viewer_time})},"$t$2"),gg=["adbreakstart","adrequest","adresponse","adplay","adplaying","adpause","adended","adbreakend","aderror","adclicked","adskipped"],yg=(function(){function t(e){var i=this;be(this,t),R(this,"_adHasPlayed",void 0),R(this,"_adRequests",void 0),R(this,"_adResponses",void 0),R(this,"_currentAdRequestNumber",void 0),R(this,"_currentAdResponseNumber",void 0),R(this,"_prerollPlayTime",void 0),R(this,"_wouldBeNewAdPlay",void 0),R(this,"isAdBreak",void 0),R(this,"pm",void 0),this.pm=e,e.on("viewinit",function(){i.isAdBreak=!1,i._currentAdRequestNumber=0,i._currentAdResponseNumber=0,i._adRequests=[],i._adResponses=[],i._adHasPlayed=!1,i._wouldBeNewAdPlay=!0,i._prerollPlayTime=void 0}),gg.forEach(function(r){return e.on(r,i._updateAdData.bind(i))});var a=n(function(){i.isAdBreak=!1},"i");e.on("adbreakstart",function(){i.isAdBreak=!0}),e.on("play",a),e.on("playing",a),e.on("viewend",a),e.on("adrequest",function(r,s){s=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdRequestNumber++},s),wp(i._adRequests,s),De(e.data,"view_ad_request_count"),i.inPrerollPosition()&&(e.data.view_preroll_requested=!0,i._adHasPlayed||De(e.data,"view_preroll_request_count"))}),e.on("adresponse",function(r,s){s=Object.assign({ad_request_id:"generatedAdRequestId"+i._currentAdResponseNumber++},s),wp(i._adResponses,s);var o=i.findAdRequest(s.ad_request_id);o&&De(e.data,"view_ad_request_time",Math.max(0,s.viewer_time-o.viewer_time))}),e.on("adplay",function(r,s){i._adHasPlayed=!0,i._wouldBeNewAdPlay&&(i._wouldBeNewAdPlay=!1,De(e.data,"view_ad_played_count")),i.inPrerollPosition()&&!e.data.view_preroll_played&&(e.data.view_preroll_played=!0,i._adRequests.length>0&&(e.data.view_preroll_request_time=Math.max(0,s.viewer_time-i._adRequests[0].viewer_time)),e.data.view_start&&(e.data.view_startup_preroll_request_time=Math.max(0,s.viewer_time-e.data.view_start)),i._prerollPlayTime=s.viewer_time)}),e.on("adplaying",function(r,s){i.inPrerollPosition()&&typeof e.data.view_preroll_load_time>"u"&&typeof i._prerollPlayTime<"u"&&(e.data.view_preroll_load_time=s.viewer_time-i._prerollPlayTime,e.data.view_startup_preroll_load_time=s.viewer_time-i._prerollPlayTime)}),e.on("adclicked",function(r,s){i._wouldBeNewAdPlay||De(e.data,"view_ad_clicked_count")}),e.on("adskipped",function(r,s){i._wouldBeNewAdPlay||De(e.data,"view_ad_skipped_count")}),e.on("adended",function(){i._wouldBeNewAdPlay=!0}),e.on("aderror",function(){i._wouldBeNewAdPlay=!0})}return n(t,"r"),Tt(t,[{key:"inPrerollPosition",value:n(function(){return typeof this.pm.data.view_content_playback_time>"u"||this.pm.data.view_content_playback_time<=1e3},"value")},{key:"findAdRequest",value:n(function(e){for(var i=0;i<this._adRequests.length;i++)if(this._adRequests[i].ad_request_id===e)return this._adRequests[i]},"value")},{key:"_updateAdData",value:n(function(e,i){if(this.inPrerollPosition()){if(!this.pm.data.view_preroll_ad_tag_hostname&&i.ad_tag_url){var a=Ci(ps(i.ad_tag_url),2),r=a[0],s=a[1];this.pm.data.view_preroll_ad_tag_domain=s,this.pm.data.view_preroll_ad_tag_hostname=r}if(!this.pm.data.view_preroll_ad_asset_hostname&&i.ad_asset_url){var o=Ci(ps(i.ad_asset_url),2),l=o[0],d=o[1];this.pm.data.view_preroll_ad_asset_domain=d,this.pm.data.view_preroll_ad_asset_hostname=l}this.pm.data.ad_type="preroll"}this.pm.data.ad_asset_url=i?.ad_asset_url,this.pm.data.ad_tag_url=i?.ad_tag_url,this.pm.data.ad_creative_id=i?.ad_creative_id,this.pm.data.ad_id=i?.ad_id,this.pm.data.ad_universal_id=i?.ad_universal_id,i!=null&&i.ad_type&&(this.pm.data.ad_type=i?.ad_type)},"value")}]),t})(),Tg=yg,Ag=n(function t(e){var i=this;be(this,t),R(this,"lastWallClockTime",void 0);var a=n(function(){i.lastWallClockTime=Pe.now(),e.on("before*",r)},"i"),r=n(function(s){var o=Pe.now(),l=i.lastWallClockTime;i.lastWallClockTime=o,o-l>3e4&&(e.emit("devicesleep",{viewer_time:l}),Object.assign(e.data,{viewer_time:l}),e.send("devicesleep"),e.emit("devicewake",{viewer_time:o}),Object.assign(e.data,{viewer_time:o}),e.send("devicewake"))},"a");e.one("playbackheartbeat",a),e.on("playbackheartbeatend",function(){e.off("before*",r),e.one("playbackheartbeat",a)})},"r"),kg=Ag,Fd=yt(mi()),bf=(function(t){return t()})(function(){var t=n(function(){for(var i=0,a={};i<arguments.length;i++){var r=arguments[i];for(var s in r)a[s]=r[s]}return a},"r");function e(i){function a(r,s,o){var l;if(typeof document<"u"){if(arguments.length>1){if(o=t({path:"/"},a.defaults,o),typeof o.expires=="number"){var d=new Date;d.setMilliseconds(d.getMilliseconds()+o.expires*864e5),o.expires=d}try{l=JSON.stringify(s),/^[\{\[]/.test(l)&&(s=l)}catch{}return i.write?s=i.write(s,r):s=encodeURIComponent(String(s)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),r=encodeURIComponent(String(r)),r=r.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),r=r.replace(/[\(\)]/g,escape),document.cookie=[r,"=",s,o.expires?"; expires="+o.expires.toUTCString():"",o.path?"; path="+o.path:"",o.domain?"; domain="+o.domain:"",o.secure?"; secure":""].join("")}r||(l={});for(var h=document.cookie?document.cookie.split("; "):[],p=/(%[0-9A-Z]{2})+/g,v=0;v<h.length;v++){var c=h[v].split("="),u=c.slice(1).join("=");u.charAt(0)==='"'&&(u=u.slice(1,-1));try{var f=c[0].replace(p,decodeURIComponent);if(u=i.read?i.read(u,f):i(u,f)||u.replace(p,decodeURIComponent),this.json)try{u=JSON.parse(u)}catch{}if(r===f){l=u;break}r||(l[f]=u)}catch{}}return l}}return n(a,"i"),a.set=a,a.get=function(r){return a.call(a,r)},a.getJSON=function(){return a.apply({json:!0},[].slice.call(arguments))},a.defaults={},a.remove=function(r,s){a(r,"",t(s,{expires:-1}))},a.withConverter=e,a}return n(e,"e"),e(function(){})}),gf="muxData",Sg=n(function(t){return Object.entries(t).map(function(e){var i=Ci(e,2),a=i[0],r=i[1];return"".concat(a,"=").concat(r)}).join("&")},"Oa"),wg=n(function(t){return t.split("&").reduce(function(e,i){var a=Ci(i.split("="),2),r=a[0],s=a[1],o=+s,l=s&&o==s?o:s;return e[r]=l,e},{})},"Pa$1"),yf=n(function(){var t;try{t=wg(bf.get(gf)||"")}catch{t={}}return t},"rr$1"),Tf=n(function(t){try{bf.set(gf,Sg(t),{expires:365})}catch{}},"ar$1"),Ig=n(function(){var t=yf();return t.mux_viewer_id=t.mux_viewer_id||ms(),t.msn=t.msn||Math.random(),Tf(t),{mux_viewer_id:t.mux_viewer_id,mux_sample_number:t.msn}},"ir$1"),Rg=n(function(){var t=yf(),e=Pe.now();return t.session_start&&(t.sst=t.session_start,delete t.session_start),t.session_id&&(t.sid=t.session_id,delete t.session_id),t.session_expires&&(t.sex=t.session_expires,delete t.session_expires),(!t.sex||t.sex<e)&&(t.sid=ms(),t.sst=e),t.sex=e+1500*1e3,Tf(t),{session_id:t.sid,session_start:t.sst,session_expires:t.sex}},"nr$1");function Lg(t,e){var i=e.beaconCollectionDomain,a=e.beaconDomain;if(i){var r=/localhost(?::\d+)?$/.test(i)?"http://":"https://";return r+i}t=t||"inferred";var s=a||"litix.io";return t.match(/^[a-z0-9]+$/)?"https://"+t+"."+s:"https://img.litix.io/a.gif"}n(Lg,"Xe$1");var Cg={a:"env",b:"beacon",c:"custom",d:"ad",e:"event",f:"experiment",i:"internal",m:"mux",n:"response",p:"player",q:"request",r:"retry",s:"session",t:"timestamp",u:"viewer",v:"video",w:"page",x:"view",y:"sub"},Dg=Af(Cg),Mg={ad:"ad",af:"affiliate",ag:"aggregate",ap:"api",al:"application",ao:"audio",ar:"architecture",as:"asset",au:"autoplay",av:"average",bi:"bitrate",bn:"brand",br:"break",bw:"browser",by:"bytes",bz:"business",ca:"cached",cb:"cancel",cc:"codec",cd:"code",cg:"category",ch:"changed",ci:"client",ck:"clicked",cl:"canceled",cm:"cmcd",cn:"config",co:"count",ce:"counter",cp:"complete",cq:"creator",cr:"creative",cs:"captions",ct:"content",cu:"current",cv:"cumulative",cx:"connection",cz:"context",da:"data",dg:"downscaling",dm:"domain",dn:"cdn",do:"downscale",dr:"drm",dp:"dropped",du:"duration",dv:"device",dy:"dynamic",eb:"enabled",ec:"encoding",ed:"edge",en:"end",eg:"engine",em:"embed",er:"error",ep:"experiments",es:"errorcode",et:"errortext",ee:"event",ev:"events",ex:"expires",ez:"exception",fa:"failed",fi:"first",fm:"family",ft:"format",fp:"fps",fq:"frequency",fr:"frame",fs:"fullscreen",ha:"has",hb:"holdback",he:"headers",ho:"host",hn:"hostname",ht:"height",id:"id",ii:"init",in:"instance",ip:"ip",is:"is",ke:"key",la:"language",lb:"labeled",le:"level",li:"live",ld:"loaded",lo:"load",lw:"low",ls:"lists",lt:"latency",ma:"max",md:"media",me:"message",mf:"manifest",mi:"mime",ml:"midroll",mm:"min",mn:"manufacturer",mo:"model",mp:"mode",ms:"ms",mx:"mux",ne:"newest",nm:"name",no:"number",on:"on",or:"origin",os:"os",pa:"paused",pb:"playback",pd:"producer",pe:"percentage",pf:"played",pg:"program",ph:"playhead",pi:"plugin",pl:"preroll",pn:"playing",po:"poster",pp:"pip",pr:"preload",ps:"position",pt:"part",pv:"previous",py:"property",px:"pop",pz:"plan",ra:"rate",rd:"requested",re:"rebuffer",rf:"rendition",rg:"range",rm:"remote",ro:"ratio",rp:"response",rq:"request",rs:"requests",sa:"sample",sd:"skipped",se:"session",sh:"shift",sk:"seek",sm:"stream",so:"source",sq:"sequence",sr:"series",ss:"status",st:"start",su:"startup",sv:"server",sw:"software",sy:"severity",ta:"tag",tc:"tech",te:"text",tg:"target",th:"throughput",ti:"time",tl:"total",to:"to",tt:"title",ty:"type",ug:"upscaling",un:"universal",up:"upscale",ur:"url",us:"user",va:"variant",vd:"viewed",vi:"video",ve:"version",vw:"view",vr:"viewer",wd:"width",wa:"watch",wt:"waiting"},Ip=Af(Mg);function Af(t){var e={};for(var i in t)t.hasOwnProperty(i)&&(e[t[i]]=i);return e}n(Af,"sr$1");function uu(t){var e={},i={};return Object.keys(t).forEach(function(a){var r=!1;if(t.hasOwnProperty(a)&&t[a]!==void 0){var s=a.split("_"),o=s[0],l=Dg[o];l||(ne.info("Data key word `"+s[0]+"` not expected in "+a),l=o+"_"),s.splice(1).forEach(function(d){d==="url"&&(r=!0),Ip[d]?l+=Ip[d]:Number.isInteger(Number(d))?l+=d:(ne.info("Data key word `"+d+"` not expected in "+a),l+="_"+d+"_")}),r?i[l]=t[a]:e[l]=t[a]}}),Object.assign(e,i)}n(uu,"he$2");var Aa=yt(mi()),Og=yt(pf()),xg={maxBeaconSize:300,maxQueueLength:3600,baseTimeBetweenBeacons:1e4,maxPayloadKBSize:500},Ng=56*1024,Pg=["hb","requestcompleted","requestfailed","requestcanceled"],$g="https://img.litix.io",Di=n(function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};this._beaconUrl=t||$g,this._eventQueue=[],this._postInFlight=!1,this._resendAfterPost=!1,this._failureCount=0,this._sendTimeout=!1,this._options=Object.assign({},xg,e)},"ee$3");Di.prototype.queueEvent=function(t,e){var i=Object.assign({},e);return this._eventQueue.length<=this._options.maxQueueLength||t==="eventrateexceeded"?(this._eventQueue.push(i),this._sendTimeout||this._startBeaconSending(),this._eventQueue.length<=this._options.maxQueueLength):!1};Di.prototype.flushEvents=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;if(t&&this._eventQueue.length===1){this._eventQueue.pop();return}this._eventQueue.length&&this._sendBeaconQueue(),this._startBeaconSending()};Di.prototype.destroy=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;this.destroyed=!0,t?this._clearBeaconQueue():this.flushEvents(),Aa.default.clearTimeout(this._sendTimeout)};Di.prototype._clearBeaconQueue=function(){var t=this._eventQueue.length>this._options.maxBeaconSize?this._eventQueue.length-this._options.maxBeaconSize:0,e=this._eventQueue.slice(t);t>0&&Object.assign(e[e.length-1],uu({mux_view_message:"event queue truncated"}));var i=this._createPayload(e);kf(this._beaconUrl,i,!0,function(){})};Di.prototype._sendBeaconQueue=function(){var t=this;if(this._postInFlight){this._resendAfterPost=!0;return}var e=this._eventQueue.slice(0,this._options.maxBeaconSize);this._eventQueue=this._eventQueue.slice(this._options.maxBeaconSize),this._postInFlight=!0;var i=this._createPayload(e),a=Pe.now();kf(this._beaconUrl,i,!1,function(r,s){s?(t._eventQueue=e.concat(t._eventQueue),t._failureCount+=1,ne.info("Error sending beacon: "+s)):t._failureCount=0,t._roundTripTime=Pe.now()-a,t._postInFlight=!1,t._resendAfterPost&&(t._resendAfterPost=!1,t._eventQueue.length>0&&t._sendBeaconQueue())})};Di.prototype._getNextBeaconTime=function(){if(!this._failureCount)return this._options.baseTimeBetweenBeacons;var t=Math.pow(2,this._failureCount-1);return t=t*Math.random(),(1+t)*this._options.baseTimeBetweenBeacons};Di.prototype._startBeaconSending=function(){var t=this;Aa.default.clearTimeout(this._sendTimeout),!this.destroyed&&(this._sendTimeout=Aa.default.setTimeout(function(){t._eventQueue.length&&t._sendBeaconQueue(),t._startBeaconSending()},this._getNextBeaconTime()))};Di.prototype._createPayload=function(t){var e=this,i={transmission_timestamp:Math.round(Pe.now())};this._roundTripTime&&(i.rtt_ms=Math.round(this._roundTripTime));var a,r,s,o=n(function(){a=JSON.stringify({metadata:i,events:r||t}),s=a.length/1024},"o"),l=n(function(){return s<=e._options.maxPayloadKBSize},"s");return o(),l()||(ne.info("Payload size is too big ("+s+" kb). Removing unnecessary events."),r=t.filter(function(d){return Pg.indexOf(d.e)===-1}),o()),l()||(ne.info("Payload size still too big ("+s+" kb). Cropping fields.."),r.forEach(function(d){for(var h in d){var p=d[h],v=50*1024;typeof p=="string"&&p.length>v&&(d[h]=p.substring(0,v))}}),o()),a};var Ug=typeof Og.default.exitPictureInPicture=="function"?function(t){return t.length<=Ng}:function(t){return!1},kf=n(function(t,e,i,a){if(i&&navigator&&navigator.sendBeacon&&navigator.sendBeacon(t,e)){a();return}if(Aa.default.fetch){Aa.default.fetch(t,{method:"POST",body:e,headers:{"Content-Type":"text/plain"},keepalive:Ug(e)}).then(function(s){return a(null,s.ok?null:"Error")}).catch(function(s){return a(null,s)});return}if(Aa.default.XMLHttpRequest){var r=new Aa.default.XMLHttpRequest;r.onreadystatechange=function(){if(r.readyState===4)return a(null,r.status!==200?"error":void 0)},r.open("POST",t),r.setRequestHeader("Content-Type","text/plain"),r.send(e);return}a()},"Ir"),Hg=Di,Wg=["env_key","view_id","view_sequence_number","player_sequence_number","beacon_domain","player_playhead_time","viewer_time","mux_api_version","event","video_id","player_instance_id","player_error_code","player_error_message","player_error_context","player_error_severity","player_error_business_exception","view_playing_time_ms_cumulative","ad_playing_time_ms_cumulative"],Bg=["adplay","adplaying","adpause","adfirstquartile","admidpoint","adthirdquartile","adended","adresponse","adrequest"],Fg=["ad_id","ad_creative_id","ad_universal_id"],Kg=["viewstart","error","ended","viewend"],Vg=600*1e3,qg=(function(){function t(e,i){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};be(this,t);var r,s,o,l,d,h,p,v,c,u,f,_;R(this,"mux",void 0),R(this,"envKey",void 0),R(this,"options",void 0),R(this,"eventQueue",void 0),R(this,"sampleRate",void 0),R(this,"disableCookies",void 0),R(this,"respectDoNotTrack",void 0),R(this,"previousBeaconData",void 0),R(this,"lastEventTime",void 0),R(this,"rateLimited",void 0),R(this,"pageLevelData",void 0),R(this,"viewerData",void 0),this.mux=e,this.envKey=i,this.options=a,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.eventQueue=new Hg(Lg(this.envKey,this.options));var b;this.sampleRate=(b=this.options.sampleRate)!==null&&b!==void 0?b:1;var T;this.disableCookies=(T=this.options.disableCookies)!==null&&T!==void 0?T:!1;var A;this.respectDoNotTrack=(A=this.options.respectDoNotTrack)!==null&&A!==void 0?A:!1,this.previousBeaconData=null,this.lastEventTime=0,this.rateLimited=!1,this.pageLevelData={mux_api_version:this.mux.API_VERSION,mux_embed:this.mux.NAME,mux_embed_version:this.mux.VERSION,viewer_application_name:(r=this.options.platform)===null||r===void 0?void 0:r.name,viewer_application_version:(s=this.options.platform)===null||s===void 0?void 0:s.version,viewer_application_engine:(o=this.options.platform)===null||o===void 0?void 0:o.layout,viewer_device_name:(l=this.options.platform)===null||l===void 0?void 0:l.product,viewer_device_category:"",viewer_device_manufacturer:(d=this.options.platform)===null||d===void 0?void 0:d.manufacturer,viewer_os_family:(p=this.options.platform)===null||p===void 0||(h=p.os)===null||h===void 0?void 0:h.family,viewer_os_architecture:(c=this.options.platform)===null||c===void 0||(v=c.os)===null||v===void 0?void 0:v.architecture,viewer_os_version:(f=this.options.platform)===null||f===void 0||(u=f.os)===null||u===void 0?void 0:u.version,page_url:Fd.default===null||Fd.default===void 0||(_=Fd.default.location)===null||_===void 0?void 0:_.href},this.viewerData=this.disableCookies?{}:Ig()}return n(t,"r"),Tt(t,[{key:"send",value:n(function(e,i){if(!(!e||!(i!=null&&i.view_id))){if(this.respectDoNotTrack&&lu())return ne.info("Not sending `"+e+"` because Do Not Track is enabled");if(!i||typeof i!="object")return ne.error("A data object was expected in send() but was not provided");var a=this.disableCookies?{}:Rg(),r=Kc(vs({},this.pageLevelData,i,a,this.viewerData),{event:e,env_key:this.envKey});r.user_id&&(r.viewer_user_id=r.user_id,delete r.user_id);var s,o=((s=r.mux_sample_number)!==null&&s!==void 0?s:0)>=this.sampleRate,l=this._deduplicateBeaconData(e,r),d=uu(l);if(this.lastEventTime=this.mux.utils.now(),o)return ne.info("Not sending event due to sample rate restriction",e,r,d);if(this.envKey||ne.info("Missing environment key (envKey) - beacons will be dropped if the video source is not a valid mux video URL",e,r,d),!this.rateLimited)if(ne.info("Sending event",e,r,d),this.rateLimited=!this.eventQueue.queueEvent(e,d),this.mux.WINDOW_UNLOADING&&e==="viewend")this.eventQueue.destroy(!0);else{if(this.mux.WINDOW_HIDDEN&&e==="hb")this.eventQueue.flushEvents(!0);else if(Kg.indexOf(e)>=0){if(e==="error"&&i.player_error_severity==="warning")return;this.eventQueue.flushEvents()}if(this.rateLimited)return r.event="eventrateexceeded",d=uu(r),this.eventQueue.queueEvent(r.event,d),ne.error("Beaconing disabled due to rate limit.")}}},"value")},{key:"destroy",value:n(function(){this.eventQueue.destroy(!1)},"value")},{key:"_deduplicateBeaconData",value:n(function(e,i){var a=this,r={},s=i.view_id;if(s==="-1"||e==="viewstart"||e==="viewend"||!this.previousBeaconData||this.mux.utils.now()-this.lastEventTime>=Vg)r=vs({},i),s&&(this.previousBeaconData=r),s&&e==="viewend"&&(this.previousBeaconData=null);else{var o=e.indexOf("request")===0;Object.entries(i).forEach(function(l){var d=Ci(l,2),h=d[0],p=d[1];a.previousBeaconData&&(p!==a.previousBeaconData[h]||Wg.indexOf(h)>-1||a.objectHasChanged(o,h,p,a.previousBeaconData[h])||a.eventRequiresKey(e,h))&&(r[h]=p,a.previousBeaconData[h]=p)})}return r},"value")},{key:"objectHasChanged",value:n(function(e,i,a,r){return!e||i.indexOf("request_")!==0?!1:i==="request_response_headers"||typeof a!="object"||typeof r!="object"?!0:Object.keys(a||{}).length!==Object.keys(r||{}).length},"value")},{key:"eventRequiresKey",value:n(function(e,i){return!!(e==="renditionchange"&&i.indexOf("video_source_")===0||Fg.includes(i)&&Bg.includes(e)||e==="playbackmodechange"&&i.indexOf("player_playback_mode")===0)},"value")}]),t})(),Yg=n(function t(e){be(this,t);var i=0,a=0,r=0,s=0,o=0,l=0,d=0,h=n(function(c,u){var f=u.request_start,_=u.request_response_start,b=u.request_response_end,T=u.request_bytes_loaded;s++;var A,g;if(_?(A=_-(f??0),g=(b??0)-_):g=(b??0)-(f??0),g>0&&T&&T>0){var w=T/g*8e3;o++,a+=T,r+=g,e.data.view_min_request_throughput=Math.min(e.data.view_min_request_throughput||1/0,w),e.data.view_average_request_throughput=a/r*8e3,e.data.view_request_count=s,A>0&&(i+=A,e.data.view_max_request_latency=Math.max(e.data.view_max_request_latency||0,A),e.data.view_average_request_latency=i/o)}},"p"),p=n(function(c,u){s++,l++,e.data.view_request_count=s,e.data.view_request_failed_count=l},"y"),v=n(function(c,u){s++,d++,e.data.view_request_count=s,e.data.view_request_canceled_count=d},"x");e.on("requestcompleted",h),e.on("requestfailed",p),e.on("requestcanceled",v)},"r"),Gg=Yg,zg=3600*1e3,Qg=n(function t(e){var i=this;be(this,t),R(this,"_lastEventTime",void 0),e.on("before*",function(a,r){var s=r.viewer_time,o=Pe.now(),l=i._lastEventTime;if(i._lastEventTime=o,l&&o-l>zg){var d=Object.keys(e.data).reduce(function(p,v){return v.indexOf("video_")===0?Object.assign(p,R({},v,e.data[v])):p},{});e.mux.log.info("Received event after at least an hour inactivity, creating a new view");var h=e.playbackHeartbeat._playheadShouldBeProgressing;e._resetView(Object.assign({viewer_time:s},d)),e.playbackHeartbeat._playheadShouldBeProgressing=h,e.playbackHeartbeat._playheadShouldBeProgressing&&a.type!=="play"&&a.type!=="adbreakstart"&&(e.emit("play",{viewer_time:s}),a.type!=="playing"&&e.emit("playing",{viewer_time:s}))}})},"r"),jg=Qg,Zg=n(function t(e){be(this,t);var i=n(function(l){var d=Xg(l),h=Jg(l);if(d!=null&&!Rp(d,s)&&o<=h){s=d,o=h;var p={video_cdn:d};e.emit("cdnchange",p)}},"t"),a=null,r=null,s=null,o=0;e.on("viewinit",function(){a=null,r=null,s=null,o=0}),e.on("beforecdnchange",function(l,d){var h=d?.video_cdn;h&&(typeof d.video_previous_cdn>"u"||d.video_previous_cdn===null)&&(Rp(h,r)?d.video_previous_cdn=a??void 0:(d.video_previous_cdn=r??void 0,a=r,r=h))}),e.on("requestcompleted",function(l,d){i(d)})},"r");function Rp(t,e){return t?.toLowerCase()===e?.toLowerCase()}n(Rp,"Br");function Xg(t){var e;return t!=null&&t.request_type&&(t.request_type==="media"||t.request_type==="video")&&!((e=t.request_response_headers)===null||e===void 0)&&e["x-cdn"]?t.request_response_headers["x-cdn"]:t!=null&&t.video_cdn?t.video_cdn:null}n(Xg,"wi");function Jg(t){return t!=null&&t.request_start?t.request_start:t!=null&&t.viewer_time?t.viewer_time:Date.now()}n(Jg,"Ti");var e0=Zg,t0=n(function(t){try{return JSON.parse(t),!0}catch{return!1}},"Ei"),i0=n(function t(e){var i=this;be(this,t),R(this,"_emittingAutomaticEvent",!1),R(this,"_hasInitialized",!1),R(this,"_currentMode","standard"),e.on("viewstart",function(){i._hasInitialized||(i._hasInitialized=!0,i._currentMode=e.data.player_playback_mode||"standard",i._emittingAutomaticEvent=!0,e.emit("playbackmodechange",{player_playback_mode:i._currentMode,player_playback_mode_data:"{}"}),i._emittingAutomaticEvent=!1)}),e.on("viewend",function(){i._hasInitialized=!1}),e.on("playbackmodechange",function(a,r){i._emittingAutomaticEvent||(r.player_playback_mode_data?t0(r.player_playback_mode_data)||(e.mux.log.warn("Invalid JSON string for player_playback_mode_data"),r.player_playback_mode_data="{}"):r.player_playback_mode_data="{}",e.data.player_playback_mode_data=r.player_playback_mode_data,e.data.player_playback_mode=r.player_playback_mode,i._currentMode=r.player_playback_mode)})},"r"),a0=i0,r0=(function(){function t(e){be(this,t),R(this,"pm",void 0),R(this,"_currentRangeStart",void 0),R(this,"_lastPlayheadTime",void 0),this.pm=e,this._currentRangeStart=null,this._lastPlayheadTime=null,e.on("playbackheartbeat",this._updatePlaybackRange.bind(this)),e.on("playbackheartbeatend",this._endPlaybackRange.bind(this))}return n(t,"r"),Tt(t,[{key:"_updateLastRangeEnd",value:n(function(){var e=this.pm.data.video_playback_ranges;if(e&&e.length>0){var i=this.pm.data.player_playhead_time||0;e[e.length-1][1]=i}},"value")},{key:"_updatePlaybackRange",value:n(function(){var e,i=this.pm.data.player_playhead_time||0;if(!(!this.pm.disableAdPlaybackRangeFiltering&&!((e=this.pm.adTracker)===null||e===void 0)&&e.isAdBreak&&this._lastPlayheadTime!==null&&i<this._lastPlayheadTime)){if(this._lastPlayheadTime!==null&&this._currentRangeStart!==null){var a=Math.abs(i-this._lastPlayheadTime);if(a>1e3){var r=this.pm.data.video_playback_ranges;r&&r.length>0&&(r[r.length-1][1]=this._lastPlayheadTime),this._currentRangeStart=null}}if(this._currentRangeStart===null){var s=this.pm.data.video_playback_ranges||[];s.length>0&&s[s.length-1][1]===i?this._currentRangeStart=s[s.length-1][0]:(this._currentRangeStart=i,s.push([i,i])),this.pm.data.video_playback_ranges=s}else this._updateLastRangeEnd();this._lastPlayheadTime=i}},"value")},{key:"_endPlaybackRange",value:n(function(){this._currentRangeStart!==null&&(this._updateLastRangeEnd(),this._currentRangeStart=null,this._lastPlayheadTime=null)},"value")}]),t})(),n0=r0,Xt=Object.freeze({CELLULAR:"cellular",WIFI:"wifi",WIRED:"wired",OTHER:"other",NO_CONNECTION:"no_connection",UNKNOWN:"unknown"}),s0=n(function(t){if(!t)return Xt.UNKNOWN;switch(t){case"cellular":case"wimax":return Xt.CELLULAR;case"wifi":return Xt.WIFI;case"ethernet":return Xt.WIRED;case"none":return Xt.NO_CONNECTION;case"bluetooth":case"other":return Xt.OTHER;case"unknown":return Xt.UNKNOWN;default:return Xt.OTHER}},"jr"),o0=n(function(t){return typeof t=="object"&&"connection"in t&&typeof t.connection=="object"},"Vr"),oa=yt(mi()),l0=(function(){function t(e){var i=this;be(this,t),R(this,"pm",void 0),R(this,"lastType",void 0),R(this,"lastLowDataMode",void 0),this.pm=e,this.pm.one("viewinit",function(){var a,r=i.emit.bind(i);r(),oa.default.addEventListener("online",r),oa.default.addEventListener("offline",r),(a=t.connection)===null||a===void 0||a.addEventListener("change",r),i.pm.on("destroy",function(){var s;(s=t.connection)===null||s===void 0||s.removeEventListener("change",r),oa.default.removeEventListener("online",r),oa.default.removeEventListener("offline",r)})})}return n(t,"r"),Tt(t,[{key:"type",get:n(function(){var e,i;return((e=oa.default.navigator)===null||e===void 0?void 0:e.onLine)===!1?Xt.NO_CONNECTION:!((i=t.connection)===null||i===void 0)&&i.type?s0(t.connection.type):Xt.UNKNOWN},"get")},{key:"lowDataMode",get:n(function(){var e;return(e=t.connection)===null||e===void 0?void 0:e.saveData},"get")},{key:"emit",value:n(function(){var e=this.type,i=this.lowDataMode;e===this.lastType&&i===this.lastLowDataMode||(this.lastType=e,this.lastLowDataMode=i,this.pm.emit("networkchange",vs({viewer_connection_type:e},i!==void 0&&{viewer_connection_low_data_mode:i})))},"value")}],[{key:"connection",get:n(function(){return o0(oa.default.navigator)?oa.default.navigator.connection:null},"get")}]),t})(),d0=l0,u0=["viewstart","ended","loadstart","pause","play","playing","ratechange","waiting","adplay","adpause","adended","aderror","adplaying","adrequest","adresponse","adbreakstart","adbreakend","adfirstquartile","admidpoint","adthirdquartile","rebufferstart","rebufferend","seeked","error","hb","requestcompleted","requestfailed","requestcanceled","renditionchange","networkchange","cdnchange","playbackmodechange"],c0=new Set(["requestcompleted","requestfailed","requestcanceled"]),h0=(function(t){Ob(i,t);var e=Ub(i);function i(a,r,s){be(this,i);var o;o=e.call(this),R(U(o),"pageLoadEndTime",void 0),R(U(o),"pageLoadInitTime",void 0),R(U(o),"_destroyed",void 0),R(U(o),"_heartBeatTimeout",void 0),R(U(o),"adTracker",void 0),R(U(o),"dashjs",void 0),R(U(o),"data",void 0),R(U(o),"disablePlayheadRebufferTracking",void 0),R(U(o),"disableRebufferTracking",void 0),R(U(o),"disableAdPlaybackRangeFiltering",void 0),R(U(o),"errorTracker",void 0),R(U(o),"errorTranslator",void 0),R(U(o),"emitTranslator",void 0),R(U(o),"getAdData",void 0),R(U(o),"getPlayheadTime",void 0),R(U(o),"getStateData",void 0),R(U(o),"stateDataTranslator",void 0),R(U(o),"hlsjs",void 0),R(U(o),"id",void 0),R(U(o),"longResumeTracker",void 0),R(U(o),"minimumRebufferDuration",void 0),R(U(o),"mux",void 0),R(U(o),"playbackEventDispatcher",void 0),R(U(o),"playbackHeartbeat",void 0),R(U(o),"playbackHeartbeatTime",void 0),R(U(o),"playheadTime",void 0),R(U(o),"seekingTracker",void 0),R(U(o),"sustainedRebufferThreshold",void 0),R(U(o),"watchTimeTracker",void 0),R(U(o),"currentFragmentPDT",void 0),R(U(o),"currentFragmentStart",void 0),o.pageLoadInitTime=xl.navigationStart(),o.pageLoadEndTime=xl.domContentLoadedEventEnd();var l={debug:!1,minimumRebufferDuration:250,sustainedRebufferThreshold:1e3,playbackHeartbeatTime:25,beaconDomain:"litix.io",sampleRate:1,disableCookies:!1,respectDoNotTrack:!1,disableRebufferTracking:!1,disablePlayheadRebufferTracking:!1,disableAdPlaybackRangeFiltering:!1,errorTranslator:n(function(c){return c},"errorTranslator"),emitTranslator:n(function(){for(var c=arguments.length,u=new Array(c),f=0;f<c;f++)u[f]=arguments[f];return u},"emitTranslator"),stateDataTranslator:n(function(c){return c},"stateDataTranslator")};o.mux=a,o.id=r,s!=null&&s.beaconDomain&&o.mux.log.warn("The `beaconDomain` setting has been deprecated in favor of `beaconCollectionDomain`. Please change your integration to use `beaconCollectionDomain` instead of `beaconDomain`."),s=Object.assign(l,s),s.data=s.data||{},s.data.property_key&&(s.data.env_key=s.data.property_key,delete s.data.property_key),ne.level=s.debug?ya.DEBUG:ya.WARN,o.getPlayheadTime=s.getPlayheadTime,o.getStateData=s.getStateData||function(){return{}},o.getAdData=s.getAdData||function(){},o.minimumRebufferDuration=s.minimumRebufferDuration,o.sustainedRebufferThreshold=s.sustainedRebufferThreshold,o.playbackHeartbeatTime=s.playbackHeartbeatTime,o.disableRebufferTracking=s.disableRebufferTracking,o.disableRebufferTracking&&o.mux.log.warn("Disabling rebuffer tracking. This should only be used in specific circumstances as a last resort when your player is known to unreliably track rebuffering."),o.disablePlayheadRebufferTracking=s.disablePlayheadRebufferTracking,o.disableAdPlaybackRangeFiltering=s.disableAdPlaybackRangeFiltering,o.errorTranslator=s.errorTranslator,o.emitTranslator=s.emitTranslator,o.stateDataTranslator=s.stateDataTranslator,o.playbackEventDispatcher=new qg(a,s.data.env_key,s),o.data={player_instance_id:ms(),mux_sample_rate:s.sampleRate,beacon_domain:s.beaconCollectionDomain||s.beaconDomain},o.data.view_sequence_number=1,o.data.player_sequence_number=1;var d=function(){typeof this.data.view_start>"u"&&(this.data.view_start=this.mux.utils.now(),this.emit("viewstart"),this.emit("renditionchange"))}.bind(U(o));if(o.on("viewinit",function(c,u){this._resetVideoData(),this._resetViewData(),this._resetErrorData(),this._updateStateData(),Object.assign(this.data,u),this._initializeViewData(),this.one("play",d),this.one("adbreakstart",d)}),o.on("videochange",function(c,u){this._resetView(u)}),o.on("programchange",function(c,u){this.data.player_is_paused&&this.mux.log.warn("The `programchange` event is intended to be used when the content changes mid playback without the video source changing, however the video is not currently playing. If the video source is changing please use the videochange event otherwise you will lose startup time information."),this._resetView(Object.assign(u,{view_program_changed:!0})),d(),this.emit("play"),this.emit("playing")}),o.on("fragmentchange",function(c,u){this.currentFragmentPDT=u.currentFragmentPDT,this.currentFragmentStart=u.currentFragmentStart}),o.on("destroy",o.destroy),typeof window<"u"&&typeof window.addEventListener=="function"&&typeof window.removeEventListener=="function"){var h=n(function(){var c=typeof o.data.view_start<"u";o.mux.WINDOW_HIDDEN=document.visibilityState==="hidden",c&&o.mux.WINDOW_HIDDEN&&(o.data.player_is_paused||o.emit("hb"))},"x");window.addEventListener("visibilitychange",h,!1);var p=n(function(c){c.persisted||o.destroy()},"D");window.addEventListener("pagehide",p,!1),o.on("destroy",function(){window.removeEventListener("visibilitychange",h),window.removeEventListener("pagehide",p)})}o.on("playerready",function(c,u){Object.assign(this.data,u)}),u0.forEach(function(c){o.on(c,function(u,f){c.indexOf("ad")!==0&&this._updateStateData(),Object.assign(this.data,f),this._sanitizeData()}),o.on("after"+c,function(){(c!=="error"||this.errorTracker.viewErrored)&&this.send(c)})}),o.on("viewend",function(c,u){Object.assign(o.data,u)});var v=n(function(c){var u=this.mux.utils.now();this.data.player_init_time&&(this.data.player_startup_time=u-this.data.player_init_time),this.pageLoadInitTime=this.data.page_load_init_time||this.pageLoadInitTime,this.pageLoadEndTime=this.data.page_load_end_time||this.pageLoadEndTime,!this.mux.PLAYER_TRACKED&&this.pageLoadInitTime&&(this.mux.PLAYER_TRACKED=!0,(this.data.player_init_time||this.pageLoadEndTime)&&(this.data.page_load_time=Math.min(this.data.player_init_time||1/0,this.pageLoadEndTime||1/0)-this.pageLoadInitTime)),this.send("playerready"),delete this.data.player_startup_time,delete this.data.page_load_time},"f");return o.one("playerready",v),o.longResumeTracker=new jg(U(o)),o.errorTracker=new ig(U(o)),new kg(U(o)),o.seekingTracker=new bg(U(o)),o.playheadTime=new lg(U(o)),o.playbackHeartbeat=new eg(U(o)),new fg(U(o)),o.watchTimeTracker=new rg(U(o)),new sg(U(o)),new n0(U(o)),o.adTracker=new Tg(U(o)),new hg(U(o)),new ug(U(o)),new pg(U(o)),new Gg(U(o)),new e0(U(o)),new a0(U(o)),new d0(U(o)),s.hlsjs&&o.addHLSJS(s),s.dashjs&&o.addDashJS(s),o.emit("viewinit",s.data),o}return n(i,"t"),Tt(i,[{key:"emit",value:n(function(a,r){var s,o=Object.assign({viewer_time:this.mux.utils.now()},r),l=[a,o];if(this.emitTranslator)try{l=this.emitTranslator(a,o)}catch(d){this.mux.log.warn("Exception in emit translator callback.",d)}l!=null&&l.length&&(s=To(Xr(i.prototype),"emit",this)).call.apply(s,[this].concat(It(l)))},"value")},{key:"destroy",value:n(function(){this._destroyed||(this._destroyed=!0,typeof this.data.view_start<"u"&&(this.emit("viewend"),this.send("viewend")),this.playbackEventDispatcher.destroy(),this.removeHLSJS(),this.removeDashJS(),window.clearTimeout(this._heartBeatTimeout))},"value")},{key:"send",value:n(function(a){if(this.data.view_id){var r=Object.assign({},this.data),s=["player_program_time","player_manifest_newest_program_time","player_live_edge_program_time","player_program_time","video_holdback","video_part_holdback","video_target_duration","video_part_target_duration"];if(r.video_source_is_live===void 0&&(r.player_source_duration===1/0||r.video_source_duration===1/0?r.video_source_is_live=!0:(r.player_source_duration>0||r.video_source_duration>0)&&(r.video_source_is_live=!1)),r.video_source_is_live||s.forEach(function(h){r[h]=void 0}),r.video_source_url=r.video_source_url||r.player_source_url,r.video_source_url){var o=Ci(ps(r.video_source_url),2),l=o[0],d=o[1];r.video_source_domain=d,r.video_source_hostname=l}delete r.ad_request_id,r.video_playback_ranges&&(r.video_playback_range=JSON.stringify(r.video_playback_ranges.filter(function(h){return h[0]!==h[1]}).map(function(h){return"".concat(h[0],":").concat(h[1])})),delete r.video_playback_ranges),this.playbackEventDispatcher.send(a,r),this.data.view_sequence_number++,this.data.player_sequence_number++,c0.has(a)||this._restartHeartBeat(),a==="viewend"&&delete this.data.view_id}},"value")},{key:"_resetView",value:n(function(a){this.emit("viewend"),this.send("viewend"),this.emit("viewinit",a)},"value")},{key:"_updateStateData",value:n(function(){var a,r=this.getStateData();if(typeof this.stateDataTranslator=="function")try{r=this.stateDataTranslator(r)}catch(o){this.mux.log.warn("Exception in stateDataTranslator translator callback.",o)}if(!((a=this.data)===null||a===void 0)&&a.video_cdn&&r!=null&&r.video_cdn){r.video_cdn;var s=Nb(r,["video_cdn"]);r=s}Object.assign(this.data,r),this.playheadTime._updatePlayheadTime(),this._sanitizeData()},"value")},{key:"_sanitizeData",value:n(function(){var a=this,r=["player_width","player_height","video_source_width","video_source_height","player_playhead_time","video_source_bitrate"];r.forEach(function(o){var l=parseInt(a.data[o],10);a.data[o]=isNaN(l)?void 0:l});var s=["player_source_url","video_source_url"];s.forEach(function(o){if(a.data[o]){var l=a.data[o].toLowerCase();(l.indexOf("data:")===0||l.indexOf("blob:")===0)&&(a.data[o]="MSE style URL")}})},"value")},{key:"_resetVideoData",value:n(function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("video_")===0&&delete a.data[r]})},"value")},{key:"_resetViewData",value:n(function(){var a=this;Object.keys(this.data).forEach(function(r){r.indexOf("view_")===0&&delete a.data[r]}),this.data.view_sequence_number=1},"value")},{key:"_resetErrorData",value:n(function(){delete this.data.player_error_code,delete this.data.player_error_message,delete this.data.player_error_context,delete this.data.player_error_severity,delete this.data.player_error_business_exception},"value")},{key:"_initializeViewData",value:n(function(){var a=this,r=this.data.view_id=ms(),s=n(function(){r===a.data.view_id&&De(a.data,"player_view_count",1)},"o");this.data.player_is_paused?this.one("play",s):s()},"value")},{key:"_restartHeartBeat",value:n(function(){var a=this;window.clearTimeout(this._heartBeatTimeout),this._heartBeatTimeout=window.setTimeout(function(){a.data.player_is_paused||a.emit("hb")},1e4)},"value")},{key:"addHLSJS",value:n(function(a){if(!a.hlsjs){this.mux.log.warn("You must pass a valid hlsjs instance in order to track it.");return}if(this.hlsjs){this.mux.log.warn("An instance of HLS.js is already being monitored for this player.");return}this.hlsjs=a.hlsjs,Vb(this.mux,this.id,a.hlsjs,{},a.Hls||window.Hls)},"value")},{key:"removeHLSJS",value:n(function(){this.hlsjs&&(qb(this.hlsjs),this.hlsjs=void 0)},"value")},{key:"addDashJS",value:n(function(a){if(!a.dashjs){this.mux.log.warn("You must pass a valid dashjs instance in order to track it.");return}if(this.dashjs){this.mux.log.warn("An instance of Dash.js is already being monitored for this player.");return}this.dashjs=a.dashjs,Qb(this.mux,this.id,a.dashjs)},"value")},{key:"removeDashJS",value:n(function(){this.dashjs&&(jb(this.dashjs),this.dashjs=void 0)},"value")}]),i})(Xb),m0=h0,En=yt(pf());function Kd(){return En.default&&!!(En.default.fullscreenElement||En.default.webkitFullscreenElement||En.default.mozFullScreenElement||En.default.msFullscreenElement)}n(Kd,"Pe$3");var p0=["loadstart","pause","play","playing","seeking","seeked","timeupdate","ratechange","stalled","waiting","error","ended"],v0={1:"MEDIA_ERR_ABORTED",2:"MEDIA_ERR_NETWORK",3:"MEDIA_ERR_DECODE",4:"MEDIA_ERR_SRC_NOT_SUPPORTED"};function f0(t,e,i){var a=Ci(Ol(e),3),r=a[0],s=a[1],o=a[2],l=t.log,d=t.utils.getComputedStyle,h=t.utils.secondsToMs,p={automaticErrorTracking:!0};if(r){if(o!=="video"&&o!=="audio")return l.error("The element of `"+s+"` was not a media element.")}else return l.error("No element was found with the `"+s+"` query selector.");r.mux&&(r.mux.destroy(),delete r.mux,l.warn("Already monitoring this video element, replacing existing event listeners"));var v={getPlayheadTime:n(function(){return h(r.currentTime)},"getPlayheadTime"),getStateData:n(function(){var u,f,_,b=((u=(f=this).getPlayheadTime)===null||u===void 0?void 0:u.call(f))||h(r.currentTime),T=this.hlsjs&&this.hlsjs.url,A=this.dashjs&&typeof this.dashjs.getSource=="function"&&this.dashjs.getSource(),g={player_is_paused:r.paused,player_width:parseInt(d(r,"width")),player_height:parseInt(d(r,"height")),player_autoplay_on:r.autoplay,player_preload_on:r.preload,player_language_code:r.lang,player_is_fullscreen:Kd(),video_poster_url:r.poster,video_source_url:T||A||r.currentSrc,video_source_duration:h(r.duration),video_source_height:r.videoHeight,video_source_width:r.videoWidth,view_dropped_frame_count:r==null||(_=r.getVideoPlaybackQuality)===null||_===void 0?void 0:_.call(r).droppedVideoFrames};if(r.getStartDate&&b>0){var w=r.getStartDate();if(w&&typeof w.getTime=="function"&&w.getTime()){var O=w.getTime();if(g.player_program_time=O+b,r.seekable.length>0){var M=O+r.seekable.end(r.seekable.length-1);g.player_live_edge_program_time=M}}}return g},"getStateData")};i=Object.assign(p,i,v),i.data=Object.assign({player_software:"HTML5 Video Element",player_mux_plugin_name:"VideoElementMonitor",player_mux_plugin_version:t.VERSION},i.data),r.mux=r.mux||{},r.mux.deleted=!1,r.mux.emit=function(u,f){t.emit(s,u,f)},r.mux.updateData=function(u){r.mux.emit("hb",u)};var c=n(function(){l.error("The monitor for this video element has already been destroyed.")},"D");r.mux.destroy=function(){Object.keys(r.mux.listeners).forEach(function(u){r.removeEventListener(u,r.mux.listeners[u],!1)}),delete r.mux.listeners,r.mux.fullscreenChangeListener&&(document.removeEventListener("fullscreenchange",r.mux.fullscreenChangeListener,!1),delete r.mux.fullscreenChangeListener),r.mux.destroy=c,r.mux.swapElement=c,r.mux.emit=c,r.mux.addHLSJS=c,r.mux.addDashJS=c,r.mux.removeHLSJS=c,r.mux.removeDashJS=c,r.mux.updateData=c,r.mux.setEmitTranslator=c,r.mux.setStateDataTranslator=c,r.mux.setGetPlayheadTime=c,r.mux.deleted=!0,t.emit(s,"destroy")},r.mux.swapElement=function(u){var f=Ci(Ol(u),3),_=f[0],b=f[1],T=f[2];if(_){if(T!=="video"&&T!=="audio")return t.log.error("The element of `"+b+"` was not a media element.")}else return t.log.error("No element was found with the `"+b+"` query selector.");_.muxId=r.muxId,delete r.muxId,_.mux=_.mux||{},_.mux.listeners=Object.assign({},r.mux.listeners),delete r.mux.listeners,Object.keys(_.mux.listeners).forEach(function(A){r.removeEventListener(A,_.mux.listeners[A],!1),_.addEventListener(A,_.mux.listeners[A],!1)}),_.mux.fullscreenChangeListener=r.mux.fullscreenChangeListener,delete r.mux.fullscreenChangeListener,_.mux.swapElement=r.mux.swapElement,_.mux.destroy=r.mux.destroy,delete r.mux,r=_},r.mux.addHLSJS=function(u){t.addHLSJS(s,u)},r.mux.addDashJS=function(u){t.addDashJS(s,u)},r.mux.removeHLSJS=function(){t.removeHLSJS(s)},r.mux.removeDashJS=function(){t.removeDashJS(s)},r.mux.setEmitTranslator=function(u){t.setEmitTranslator(s,u)},r.mux.setStateDataTranslator=function(u){t.setStateDataTranslator(s,u)},r.mux.setGetPlayheadTime=function(u){u||(u=i.getPlayheadTime),t.setGetPlayheadTime(s,u)},t.init(s,i),t.emit(s,"playerready"),r.paused||(t.emit(s,"play"),r.readyState>2&&t.emit(s,"playing")),r.mux.listeners={},p0.forEach(function(u){u==="error"&&!i.automaticErrorTracking||(r.mux.listeners[u]=function(){var f={};if(u==="error"){if(!r.error||r.error.code===1)return;f.player_error_code=r.error.code,f.player_error_message=v0[r.error.code]||r.error.message}t.emit(s,u,f)},r.addEventListener(u,r.mux.listeners[u],!1))}),r.mux.listeners.enterpictureinpicture=function(){t.emit(s,"playbackmodechange",{player_playback_mode:"pip",player_playback_mode_data:"{}"})},r.mux.listeners.leavepictureinpicture=function(){var u=Kd()?"fullscreen":"standard";t.emit(s,"playbackmodechange",{player_playback_mode:u,player_playback_mode_data:"{}"})},r.addEventListener("enterpictureinpicture",r.mux.listeners.enterpictureinpicture,!1),r.addEventListener("leavepictureinpicture",r.mux.listeners.leavepictureinpicture,!1),r.mux.fullscreenChangeListener=function(){var u=Kd(),f=document.fullscreenElement;if(u&&(f===r||f!=null&&f.contains(r)))t.emit(s,"playbackmodechange",{player_playback_mode:"fullscreen",player_playback_mode_data:"{}"});else if(!u){var _=document.pictureInPictureElement===r,b=_?"pip":"standard";t.emit(s,"playbackmodechange",{player_playback_mode:b,player_playback_mode_data:"{}"})}},document.addEventListener("fullscreenchange",r.mux.fullscreenChangeListener,!1)}n(f0,"ut$2");function E0(t,e,i,a){var r=a;if(t&&typeof t[e]=="function")try{r=t[e].apply(t,i)}catch(s){ne.info("safeCall error",s)}return r}n(E0,"lt$1");var Xn=yt(mi()),Ya;Xn.default&&Xn.default.WeakMap&&(Ya=new WeakMap);function _0(t,e){if(!t||!e||!Xn.default||typeof Xn.default.getComputedStyle!="function")return"";var i;return Ya&&Ya.has(t)&&(i=Ya.get(t)),i||(i=Xn.default.getComputedStyle(t,null),Ya&&Ya.set(t,i)),i.getPropertyValue(e)}n(_0,"dt$1");function b0(t){return Math.floor(t*1e3)}n(b0,"ct$2");var la={TARGET_DURATION:"#EXT-X-TARGETDURATION",PART_INF:"#EXT-X-PART-INF",SERVER_CONTROL:"#EXT-X-SERVER-CONTROL",INF:"#EXTINF",PROGRAM_DATE_TIME:"#EXT-X-PROGRAM-DATE-TIME",VERSION:"#EXT-X-VERSION",SESSION_DATA:"#EXT-X-SESSION-DATA"},kd=n(function(t){return this.buffer="",this.manifest={segments:[],serverControl:{},sessionData:{}},this.currentUri={},this.process(t),this.manifest},"Ve$2");kd.prototype.process=function(t){var e;for(this.buffer+=t,e=this.buffer.indexOf(`
`);e>-1;e=this.buffer.indexOf(`
`))this.processLine(this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)};kd.prototype.processLine=function(t){var e=t.indexOf(":"),i=A0(t,e),a=i[0],r=i.length===2?qc(i[1]):void 0;if(a[0]!=="#")this.currentUri.uri=a,this.manifest.segments.push(this.currentUri),this.manifest.targetDuration&&!("duration"in this.currentUri)&&(this.currentUri.duration=this.manifest.targetDuration),this.currentUri={};else switch(a){case la.TARGET_DURATION:{if(!isFinite(r)||r<0)return;this.manifest.targetDuration=r,this.setHoldBack();break}case la.PART_INF:{Vd(this.manifest,i),this.manifest.partInf.partTarget&&(this.manifest.partTargetDuration=this.manifest.partInf.partTarget),this.setHoldBack();break}case la.SERVER_CONTROL:{Vd(this.manifest,i),this.setHoldBack();break}case la.INF:{r===0?this.currentUri.duration=.01:r>0&&(this.currentUri.duration=r);break}case la.PROGRAM_DATE_TIME:{var s=r,o=new Date(s);this.manifest.dateTimeString||(this.manifest.dateTimeString=s,this.manifest.dateTimeObject=o),this.currentUri.dateTimeString=s,this.currentUri.dateTimeObject=o;break}case la.VERSION:{Vd(this.manifest,i);break}case la.SESSION_DATA:{var l=k0(i[1]),d=_f(l);Object.assign(this.manifest.sessionData,d)}}};kd.prototype.setHoldBack=function(){var t=this.manifest,e=t.serverControl,i=t.targetDuration,a=t.partTargetDuration;if(e){var r="holdBack",s="partHoldBack",o=i&&i*3,l=a&&a*2;i&&!e.hasOwnProperty(r)&&(e[r]=o),o&&e[r]<o&&(e[r]=o),a&&!e.hasOwnProperty(s)&&(e[s]=a*3),a&&e[s]<l&&(e[s]=l)}};var Vd=n(function(t,e){var i=Sf(e[0].replace("#EXT-X-","")),a;T0(e[1])?(a={},a=Object.assign(y0(e[1]),a)):a=qc(e[1]),t[i]=a},"_t$1"),Sf=n(function(t){return t.toLowerCase().replace(/-(\w)/g,function(e){return e[1].toUpperCase()})},"Qr"),qc=n(function(t){if(t.toLowerCase()==="yes"||t.toLowerCase()==="no")return t.toLowerCase()==="yes";var e=t.indexOf(":")!==-1?t:parseFloat(t);return isNaN(e)?t:e},"ft$2"),g0=n(function(t){var e={},i=t.split("=");if(i.length>1){var a=Sf(i[0]);e[a]=qc(i[1])}return e},"Pi"),y0=n(function(t){for(var e=t.split(","),i={},a=0;e.length>a;a++){var r=e[a],s=g0(r);i=Object.assign(s,i)}return i},"Li"),T0=n(function(t){return t.indexOf("=")>-1},"Ii$1"),A0=n(function(t,e){return e===-1?[t]:[t.substring(0,e),t.substring(e+1)]},"Ni"),k0=n(function(t){var e={};if(t){var i=t.search(","),a=t.slice(0,i),r=t.slice(i+1),s=[a,r];return s.forEach(function(o,l){for(var d=o.replace(/['"]+/g,"").split("="),h=0;h<d.length;h++)d[h]==="DATA-ID"&&(e["DATA-ID"]=d[1-h]),d[h]==="VALUE"&&(e.VALUE=d[1-h])}),{data:e}}},"Ci"),S0=kd,w0={safeCall:E0,safeIncrement:De,getComputedStyle:_0,secondsToMs:b0,assign:Object.assign,headersStringToObject:Vc,cdnHeadersToRequestId:Nl,extractHostnameAndDomain:ps,extractHostname:Nt,manifestParser:S0,generateShortID:ff,generateUUID:ms,now:Pe.now,findMediaElement:Ol},I0=w0,R0={PLAYER_READY:"playerready",VIEW_INIT:"viewinit",VIDEO_CHANGE:"videochange",PLAY:"play",PAUSE:"pause",PLAYING:"playing",TIME_UPDATE:"timeupdate",SEEKING:"seeking",SEEKED:"seeked",REBUFFER_START:"rebufferstart",REBUFFER_END:"rebufferend",ERROR:"error",ENDED:"ended",RENDITION_CHANGE:"renditionchange",ORIENTATION_CHANGE:"orientationchange",PLAYBACK_MODE_CHANGE:"playbackmodechange",NETWORK_CHANGE:"networkchange",AD_REQUEST:"adrequest",AD_RESPONSE:"adresponse",AD_BREAK_START:"adbreakstart",AD_PLAY:"adplay",AD_PLAYING:"adplaying",AD_PAUSE:"adpause",AD_FIRST_QUARTILE:"adfirstquartile",AD_MID_POINT:"admidpoint",AD_THIRD_QUARTILE:"adthirdquartile",AD_ENDED:"adended",AD_BREAK_END:"adbreakend",AD_ERROR:"aderror",REQUEST_COMPLETED:"requestcompleted",REQUEST_FAILED:"requestfailed",REQUEST_CANCELLED:"requestcanceled",HEARTBEAT:"hb",DESTROY:"destroy"},L0=R0,C0="mux-embed",D0="5.18.1",M0="2.1",Te={},Ji=n(function(t){var e=arguments;typeof t=="string"?Ji.hasOwnProperty(t)?Zn.default.setTimeout(function(){e=Array.prototype.splice.call(e,1),Ji[t].apply(null,e)},0):ne.warn("`"+t+"` is an unknown task"):typeof t=="function"?Zn.default.setTimeout(function(){t(Ji)},0):ne.warn("`"+t+"` is invalid.")},"ue$2"),O0={loaded:Pe.now(),NAME:C0,VERSION:D0,API_VERSION:M0,PLAYER_TRACKED:!1,monitor:n(function(t,e){return f0(Ji,t,e)},"monitor"),destroyMonitor:n(function(t){var e=Ci(Ol(t),1),i=e[0];i&&i.mux&&typeof i.mux.destroy=="function"?i.mux.destroy():ne.error("A video element monitor for `"+t+"` has not been initialized via `mux.monitor`.")},"destroyMonitor"),addHLSJS:n(function(t,e){var i=wt(t);Te[i]?Te[i].addHLSJS(e):ne.error("A monitor for `"+i+"` has not been initialized.")},"addHLSJS"),addDashJS:n(function(t,e){var i=wt(t);Te[i]?Te[i].addDashJS(e):ne.error("A monitor for `"+i+"` has not been initialized.")},"addDashJS"),removeHLSJS:n(function(t){var e=wt(t);Te[e]?Te[e].removeHLSJS():ne.error("A monitor for `"+e+"` has not been initialized.")},"removeHLSJS"),removeDashJS:n(function(t){var e=wt(t);Te[e]?Te[e].removeDashJS():ne.error("A monitor for `"+e+"` has not been initialized.")},"removeDashJS"),init:n(function(t,e){lu()&&e&&e.respectDoNotTrack&&ne.info("The browser's Do Not Track flag is enabled - Mux beaconing is disabled.");var i=wt(t);Te[i]=new m0(Ji,i,e)},"init"),emit:n(function(t,e,i){var a=wt(t);Te[a]?(Te[a].emit(e,i),e==="destroy"&&delete Te[a]):ne.error("A monitor for `"+a+"` has not been initialized.")},"emit"),updateData:n(function(t,e){var i=wt(t);Te[i]?Te[i].emit("hb",e):ne.error("A monitor for `"+i+"` has not been initialized.")},"updateData"),setEmitTranslator:n(function(t,e){var i=wt(t);Te[i]?Te[i].emitTranslator=e:ne.error("A monitor for `"+i+"` has not been initialized.")},"setEmitTranslator"),setStateDataTranslator:n(function(t,e){var i=wt(t);Te[i]?Te[i].stateDataTranslator=e:ne.error("A monitor for `"+i+"` has not been initialized.")},"setStateDataTranslator"),setGetPlayheadTime:n(function(t,e){var i=wt(t);Te[i]?Te[i].getPlayheadTime=e:ne.error("A monitor for `"+i+"` has not been initialized.")},"setGetPlayheadTime"),checkDoNotTrack:lu,log:ne,utils:I0,events:L0,WINDOW_HIDDEN:!1,WINDOW_UNLOADING:!1};Object.assign(Ji,O0);typeof Zn.default<"u"&&typeof Zn.default.addEventListener=="function"&&Zn.default.addEventListener("pagehide",function(t){t.persisted||(Ji.WINDOW_UNLOADING=!0)},!1);var Yc=Ji;var q=ob,te={VIDEO:"video",THUMBNAIL:"thumbnail",STORYBOARD:"storyboard",DRM:"drm"},P={NOT_AN_ERROR:0,NETWORK_OFFLINE:2000002,NETWORK_UNKNOWN_ERROR:2e6,NETWORK_NO_STATUS:2000001,NETWORK_INVALID_URL:24e5,NETWORK_NOT_FOUND:2404e3,NETWORK_NOT_READY:2412e3,NETWORK_GENERIC_SERVER_FAIL:25e5,NETWORK_TOKEN_MISSING:2403201,NETWORK_TOKEN_MALFORMED:2412202,NETWORK_TOKEN_EXPIRED:2403210,NETWORK_TOKEN_AUD_MISSING:2403221,NETWORK_TOKEN_AUD_MISMATCH:2403222,NETWORK_TOKEN_SUB_MISMATCH:2403232,ENCRYPTED_ERROR:5e6,ENCRYPTED_UNSUPPORTED_KEY_SYSTEM:5000001,ENCRYPTED_GENERATE_REQUEST_FAILED:5000002,ENCRYPTED_UPDATE_LICENSE_FAILED:5000003,ENCRYPTED_UPDATE_SERVER_CERT_FAILED:5000004,ENCRYPTED_CDM_ERROR:5000005,ENCRYPTED_OUTPUT_RESTRICTED:5000006,ENCRYPTED_MISSING_TOKEN:5000002},Sd=n(t=>t===te.VIDEO?"playback":t,"V"),ai,Ni=(ai=class extends Error{constructor(e,i=ai.MEDIA_ERR_CUSTOM,a,r){var s;super(e),this.name="MediaError",this.code=i,this.context=r,this.fatal=a??(i>=ai.MEDIA_ERR_NETWORK&&i<=ai.MEDIA_ERR_ENCRYPTED),this.message||(this.message=(s=ai.defaultMessages[this.code])!=null?s:"")}},n(ai,"_"),ai);Ni.MEDIA_ERR_ABORTED=1,Ni.MEDIA_ERR_NETWORK=2,Ni.MEDIA_ERR_DECODE=3,Ni.MEDIA_ERR_SRC_NOT_SUPPORTED=4,Ni.MEDIA_ERR_ENCRYPTED=5,Ni.MEDIA_ERR_CUSTOM=100,Ni.defaultMessages={1:"You aborted the media playback",2:"A network error caused the media download to fail.",3:"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.",4:"An unsupported error occurred. The server or network failed, or your browser does not support this format.",5:"The media is encrypted and there are no keys to decrypt it."};var L=Ni,x0=n(t=>t==null,"dt"),Gc=n((t,e)=>x0(e)?!1:t in e,"K$2"),cu={ANY:"any",MUTED:"muted"},ee={ON_DEMAND:"on-demand",LIVE:"live",UNKNOWN:"unknown"},ni={MSE:"mse",NATIVE:"native"},Rn={HEADER:"header",QUERY:"query",NONE:"none"},hu=Object.values(Rn),Ii={M3U8:"application/vnd.apple.mpegurl",MP4:"video/mp4"},Lp={HLS:Ii.M3U8};[...Object.values(Ii)];var Cw={upTo720p:"720p",upTo1080p:"1080p",upTo1440p:"1440p",upTo2160p:"2160p"},Dw={noLessThan480p:"480p",noLessThan540p:"540p",noLessThan720p:"720p",noLessThan1080p:"1080p",noLessThan1440p:"1440p",noLessThan2160p:"2160p"},Mw={DESCENDING:"desc"},N0="en",mu={code:N0},Se=n((t,e,i,a,r=t)=>{r.addEventListener(e,i,a),t.addEventListener("teardown",()=>{r.removeEventListener(e,i)},{once:!0})},"P$3");function P0(t,e,i){e&&i>e&&(i=e);for(let a=0;a<t.length;a++)if(t.start(a)<=i&&t.end(a)>=i)return!0;return!1}n(P0,"Me$1");var zc=n(t=>{let e=t.indexOf("?");if(e<0)return[t];let i=t.slice(0,e),a=t.slice(e);return[i,a]},"J$1"),wd=n(t=>{let{type:e}=t;if(e){let i=e.toUpperCase();return Gc(i,Lp)?Lp[i]:e}return $0(t)},"W$1"),wf=n(t=>t==="VOD"?ee.ON_DEMAND:ee.LIVE,"ne$2"),If=n(t=>t==="EVENT"?Number.POSITIVE_INFINITY:t==="VOD"?Number.NaN:0,"oe$2"),$0=n(t=>{let{src:e}=t;if(!e)return"";let i="";try{i=Qc(e).pathname}catch{}let a=i.lastIndexOf(".");if(a<0)return W0(t)?Ii.M3U8:"";let r=i.slice(a+1).toUpperCase();return Gc(r,Ii)?Ii[r]:""},"ft$1"),pu=n(t=>{try{return new URL(t),!1}catch{return!0}},"j"),U0=n(t=>t.split(`
`).find((e,i,a)=>i>0&&a[i-1].startsWith("#EXT-X-STREAM-INF")),"be$1"),Qc=n((t,e)=>{var i;if(!pu(t))return new URL(t);let a=(i=window?.location)==null?void 0:i.href,r=e??a;return e&&pu(e.toString())&&(r=new URL(e,a)),new URL(t,r)},"G$2"),H0="mux.com",W0=n(({src:t,customDomain:e=H0})=>{let i;try{i=new URL(`${t}`)}catch{return!1}let a=i.protocol==="https:",r=i.hostname===`stream.${e}`.toLowerCase(),s=i.pathname.split("/"),o=s.length===2,l=!(s!=null&&s[1].includes("."));return a&&r&&o&&l},"Tt$1"),yr=n(t=>{let e=(t??"").split(".")[1];if(e)try{let i=e.replace(/-/g,"+").replace(/_/g,"/"),a=decodeURIComponent(atob(i).split("").map(function(r){return"%"+("00"+r.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(a)}catch{return}},"ae$2"),B0=n(({exp:t},e=Date.now())=>!t||t*1e3<e,"Re$1"),F0=n(({sub:t},e)=>t!==e,"xe$1"),K0=n(({aud:t},e)=>!t,"Ce$1"),V0=n(({aud:t},e)=>t!==e,"ve"),Rf="en";function N(t,e=!0){var i,a;let r=e&&(a=(i=mu)==null?void 0:i[t])!=null?a:t,s=e?mu.code:Rf;return new q0(r,s)}n(N,"x$2");var Cr,q0=(Cr=class{constructor(e,i=(a=>(a=mu)!=null?a:Rf)()){this.message=e,this.locale=i}format(e){return this.message.replace(/\{(\w+)\}/g,(i,a)=>{var r;return(r=e[a])!=null?r:""})}toString(){return this.message}},n(Cr,"re"),Cr),Y0=Object.values(cu),Cp=n(t=>typeof t=="boolean"||typeof t=="string"&&Y0.includes(t),"De"),G0=n((t,e,i)=>{let{autoplay:a}=t,r=!1,s=!1,o=Cp(a)?a:!!a,l=n(()=>{r||Se(e,"playing",()=>{r=!0},{once:!0})},"i");if(l(),Se(e,"loadstart",()=>{r=!1,l(),qd(e,o)},{once:!0}),Se(e,"loadstart",()=>{i||(t.streamType&&t.streamType!==ee.UNKNOWN?s=t.streamType===ee.LIVE:s=!Number.isFinite(e.duration)),qd(e,o)},{once:!0}),i&&i.once(q.Events.LEVEL_LOADED,(d,h)=>{var p;t.streamType&&t.streamType!==ee.UNKNOWN?s=t.streamType===ee.LIVE:s=(p=h.details.live)!=null?p:!1}),!o){let d=n(()=>{!s||Number.isFinite(t.startTime)||(i!=null&&i.liveSyncPosition?e.currentTime=i.liveSyncPosition:Number.isFinite(e.seekable.end(0))&&(e.currentTime=e.seekable.end(0)))},"u");i&&Se(e,"play",()=>{e.preload==="metadata"?i.once(q.Events.LEVEL_UPDATED,d):d()},{once:!0})}return d=>{r||(o=Cp(d)?d:!!d,qd(e,o))}},"Pe$2"),qd=n((t,e)=>{if(!e)return;let i=t.muted,a=n(()=>t.muted=i,"n");switch(e){case cu.ANY:t.play().catch(()=>{t.muted=!0,t.play().catch(a)});break;case cu.MUTED:t.muted=!0,t.play().catch(a);break;default:t.play().catch(()=>{});break}},"se$2"),z0=n(({preload:t,src:e},i,a)=>{let r=n(v=>{v!=null&&["","none","metadata","auto"].includes(v)?i.setAttribute("preload",v):i.removeAttribute("preload")},"o");if(!a)return r(t),r;let s=!1,o=!1,l=a.config.maxBufferLength,d=a.config.maxBufferSize,h=n(v=>{r(v);let c=v??i.preload;o||c==="none"||(c==="metadata"?(a.config.maxBufferLength=1,a.config.maxBufferSize=1):(a.config.maxBufferLength=l,a.config.maxBufferSize=d),p())},"u"),p=n(()=>{!s&&e&&(s=!0,a.loadSource(e))},"f");return Se(i,"play",()=>{o=!0,a.config.maxBufferLength=l,a.config.maxBufferSize=d,p()},{once:!0}),h(t),h},"Le$1"),Q0=n((t,e,i)=>{let{minPreloadSegments:a}=t;if(a==null||a<=0||!i)return;let r=0,s=!1,o=e.playbackRate||1,l=n(()=>{e.playbackRate!==0&&(o=e.playbackRate,e.playbackRate=0)},"i");e.playbackRate=0,Se(e,"ratechange",l);let d=n((h,{frag:p})=>{s||p.type!=="main"||(r++,r>=a&&(s=!0,e.removeEventListener("ratechange",l),e.playbackRate=o))},"l");i.on(q.Events.FRAG_BUFFERED,d),e.addEventListener("teardown",()=>{s||(s=!0,i.off(q.Events.FRAG_BUFFERED,d),e.playbackRate=o)},{once:!0})},"he$1"),j0=n((t,e,i)=>{let{initialEstimateSegments:a}=t;if(a==null||a<=0||!i)return;let r=0;i.on(q.Events.FRAG_BUFFERED,(s,{frag:o})=>{o.type==="main"&&(r++,r<a&&i.abrController.resetEstimator(i.config.abrEwmaDefaultEstimate))})},"_e$1");function Z0(t,e){var i;if(!("videoTracks"in t))return;let a=new WeakMap;e.on(q.Events.MANIFEST_PARSED,function(h,p){d();let v=t.addVideoTrack("main");v.selected=!0;for(let[c,u]of p.levels.entries()){let f=v.addRendition(u.url[0],u.width,u.height,u.videoCodec,u.bitrate);a.set(u,`${c}`),f.id=`${c}`}}),e.on(q.Events.AUDIO_TRACKS_UPDATED,function(h,p){l();for(let v of p.audioTracks){let c=v.default?"main":"alternative",u=t.addAudioTrack(c,v.name,v.lang);u.id=`${v.id}`,v.default&&(u.enabled=!0)}});let r=n(()=>{var h;let p=+((h=[...t.audioTracks].find(c=>c.enabled))==null?void 0:h.id),v=e.audioTracks.map(c=>c.id);p!=e.audioTrack&&v.includes(p)&&(e.audioTrack=p)},"n");t.audioTracks.addEventListener("change",r),e.on(q.Events.LEVELS_UPDATED,function(h,p){var v;let c=t.videoTracks[(v=t.videoTracks.selectedIndex)!=null?v:0];if(!c)return;let u=p.levels.map(f=>a.get(f));for(let f of t.videoRenditions)f.id&&!u.includes(f.id)&&c.removeRendition(f)});let s=n(h=>{let p=h.target.selectedIndex;p!=e.nextLevel&&(e.nextLevel=p)},"o");(i=t.videoRenditions)==null||i.addEventListener("change",s);let o=n(()=>{for(let h of t.videoTracks)t.removeVideoTrack(h)},"s"),l=n(()=>{for(let h of t.audioTracks)t.removeAudioTrack(h)},"a"),d=n(()=>{o(),l()},"i");e.once(q.Events.DESTROYING,()=>{var h,p;d(),(h=t.audioTracks)==null||h.removeEventListener("change",r),(p=t.videoRenditions)==null||p.removeEventListener("change",s)})}n(Z0,"we");var Yd=n(t=>"time"in t?t.time:t.startTime,"ie$2");function X0(t,e){e.on(q.Events.NON_NATIVE_TEXT_TRACKS_FOUND,(r,{tracks:s})=>{s.forEach(o=>{var l,d;let h=(l=o.subtitleTrack)!=null?l:o.closedCaptions,p=e.subtitleTracks.findIndex(({lang:c,name:u,type:f})=>c==h?.lang&&u===o.label&&f.toLowerCase()===o.kind),v=((d=o._id)!=null?d:o.default)?"default":`${o.kind}${p}`;jc(t,o.kind,o.label,h?.lang,v,o.default)})});let i=n(()=>{if(!e.subtitleTracks.length)return;let r=Array.from(t.textTracks).find(l=>l.id&&l.mode==="showing"&&["subtitles","captions"].includes(l.kind));if(!r)return;let s=e.subtitleTracks[e.subtitleTrack],o=s?s.default?"default":`${e.subtitleTracks[e.subtitleTrack].type.toLowerCase()}${e.subtitleTrack}`:void 0;if(e.subtitleTrack<0||r?.id!==o){let l=e.subtitleTracks.findIndex(({lang:d,name:h,type:p,default:v})=>r.id==="default"&&v||d==r.language&&h===r.label&&p.toLowerCase()===r.kind);e.subtitleTrack=l}r?.id===o&&r.cues&&Array.from(r.cues).forEach(l=>{r.addCue(l)})},"r");t.textTracks.addEventListener("change",i),e.on(q.Events.CUES_PARSED,(r,{track:s,cues:o})=>{let l=t.textTracks.getTrackById(s);if(!l)return;let d=l.mode==="disabled";d&&(l.mode="hidden"),o.forEach(h=>{var p;(p=l.cues)!=null&&p.getCueById(h.id)||l.addCue(h)}),d&&(l.mode="disabled")}),e.once(q.Events.DESTROYING,()=>{t.textTracks.removeEventListener("change",i),t.querySelectorAll("track[data-removeondestroy]").forEach(r=>{r.remove()})});let a=n(()=>{Array.from(t.textTracks).forEach(r=>{var s,o;if(!["subtitles","caption"].includes(r.kind)&&(r.label==="thumbnails"||r.kind==="chapters")){if(!((s=r.cues)!=null&&s.length)){let l="track";r.kind&&(l+=`[kind="${r.kind}"]`),r.label&&(l+=`[label="${r.label}"]`);let d=t.querySelector(l),h=(o=d?.getAttribute("src"))!=null?o:"";d?.removeAttribute("src"),setTimeout(()=>{d?.setAttribute("src",h)},0)}r.mode!=="hidden"&&(r.mode="hidden")}})},"n");e.once(q.Events.MANIFEST_LOADED,a),e.once(q.Events.MEDIA_ATTACHED,a)}n(X0,"Ae$1");function jc(t,e,i,a,r,s){let o=document.createElement("track");return o.kind=e,o.label=i,a&&(o.srclang=a),r&&(o.id=r),s&&(o.default=!0),o.track.mode=["subtitles","captions"].includes(e)?"disabled":"hidden",o.setAttribute("data-removeondestroy",""),t.append(o),o.track}n(jc,"ce$1");function J0(t,e){let i=Array.prototype.find.call(t.querySelectorAll("track"),a=>a.track===e);i?.remove()}n(J0,"Et");function Xs(t,e,i){var a;return(a=Array.from(t.querySelectorAll("track")).find(r=>r.track.label===e&&r.track.kind===i))==null?void 0:a.track}n(Xs,"U$2");async function Lf(t,e,i,a){let r=Xs(t,i,a);return r||(r=jc(t,a,i),r.mode="hidden",await new Promise(s=>setTimeout(()=>s(void 0),0))),r.mode!=="hidden"&&(r.mode="hidden"),[...e].sort((s,o)=>Yd(o)-Yd(s)).forEach(s=>{var o,l;let d=s.value,h=Yd(s);if("endTime"in s&&s.endTime!=null)r?.addCue(new VTTCue(h,s.endTime,a==="chapters"?d:JSON.stringify(d??null)));else{let p=Array.prototype.findIndex.call(r?.cues,f=>f.startTime>=h),v=(o=r?.cues)==null?void 0:o[p],c=v?v.startTime:Number.isFinite(t.duration)?t.duration:Number.MAX_SAFE_INTEGER,u=(l=r?.cues)==null?void 0:l[p-1];u&&(u.endTime=h),r?.addCue(new VTTCue(h,c,a==="chapters"?d:JSON.stringify(d??null)))}}),t.textTracks.dispatchEvent(new Event("change",{bubbles:!0,composed:!0})),r}n(Lf,"Se$1");var Zc="cuepoints",Cf=Object.freeze({label:Zc});async function Df(t,e,i=Cf){return Lf(t,e,i.label,"metadata")}n(Df,"Ne$1");var vu=n(t=>({time:t.startTime,value:JSON.parse(t.text)}),"q");function e1(t,e={label:Zc}){let i=Xs(t,e.label,"metadata");return i!=null&&i.cues?Array.from(i.cues,a=>vu(a)):[]}n(e1,"gt$1");function Mf(t,e={label:Zc}){var i,a;let r=Xs(t,e.label,"metadata");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return vu(r.activeCues[0]);let{currentTime:s}=t,o=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:l,endTime:d})=>l<=s&&d>s);return vu(o||r.activeCues[0])}n(Mf,"Oe$1");async function t1(t,e=Cf){return new Promise(i=>{Se(t,"loadstart",async()=>{let a=await Df(t,[],e);Se(t,"cuechange",()=>{let r=Mf(t);if(r){let s=new CustomEvent("cuepointchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(s)}},{},a),i(a)})})}n(t1,"Ue");var Xc="chapters",Of=Object.freeze({label:Xc}),fu=n(t=>({startTime:t.startTime,endTime:t.endTime,value:t.text}),"z");async function xf(t,e,i=Of){return Lf(t,e,i.label,"chapters")}n(xf,"Ke$1");function i1(t,e={label:Xc}){var i;let a=Xs(t,e.label,"chapters");return(i=a?.cues)!=null&&i.length?Array.from(a.cues,r=>fu(r)):[]}n(i1,"Mt$1");function Nf(t,e={label:Xc}){var i,a;let r=Xs(t,e.label,"chapters");if(!((i=r?.activeCues)!=null&&i.length))return;if(r.activeCues.length===1)return fu(r.activeCues[0]);let{currentTime:s}=t,o=Array.prototype.find.call((a=r.activeCues)!=null?a:[],({startTime:l,endTime:d})=>l<=s&&d>s);return fu(o||r.activeCues[0])}n(Nf,"We");async function a1(t,e=Of){return new Promise(i=>{Se(t,"loadstart",async()=>{let a=await xf(t,[],e);Se(t,"cuechange",()=>{let r=Nf(t);if(r){let s=new CustomEvent("chapterchange",{composed:!0,bubbles:!0,detail:r});t.dispatchEvent(s)}},{},a),i(a)})})}n(a1,"Fe");function r1(t,e){if(e){let i=e.playingDate;if(i!=null)return new Date(i.getTime()-t.currentTime*1e3)}return typeof t.getStartDate=="function"?t.getStartDate():new Date(NaN)}n(r1,"bt$1");function n1(t,e){if(e&&e.playingDate)return e.playingDate;if(typeof t.getStartDate=="function"){let i=t.getStartDate();return new Date(i.getTime()+t.currentTime*1e3)}return new Date(NaN)}n(n1,"Rt$1");var Jn={VIDEO:"v",THUMBNAIL:"t",STORYBOARD:"s",DRM:"d"},s1=n(t=>{if(t===te.VIDEO)return Jn.VIDEO;if(t===te.DRM)return Jn.DRM},"xt"),o1=n((t,e)=>{var i,a;let r=Sd(t),s=`${r}Token`;return(i=e.tokens)!=null&&i[r]?(a=e.tokens)==null?void 0:a[r]:Gc(s,e)?e[s]:void 0},"Ct$1"),Pl=n((t,e,i,a,r=!1,s=!(o=>(o=globalThis.navigator)==null?void 0:o.onLine)())=>{var o,l;if(s){let T=N("Your device appears to be offline",r),A,g=L.MEDIA_ERR_NETWORK,w=new L(T,g,!1,A);return w.errorCategory=e,w.muxCode=P.NETWORK_OFFLINE,w.data=t,w}let d="status"in t?t.status:t.code,h=Date.now(),p=L.MEDIA_ERR_NETWORK;if(d===200)return;let v=Sd(e),c=o1(e,i),u=s1(e),[f]=zc((o=i.playbackId)!=null?o:"");if(!d||!f)return;let _=yr(c);if(c&&!_){let T=N("The {tokenNamePrefix}-token provided is invalid or malformed.",r).format({tokenNamePrefix:v}),A=N("Compact JWT string: {token}",r).format({token:c}),g=new L(T,p,!0,A);return g.errorCategory=e,g.muxCode=P.NETWORK_TOKEN_MALFORMED,g.data=t,g}if(d>=500){let T=new L("",p,a??!0);return T.errorCategory=e,T.muxCode=P.NETWORK_UNKNOWN_ERROR,T}if(d===403)if(_){if(B0(_,h)){let T={timeStyle:"medium",dateStyle:"medium"},A=N("The video’s secured {tokenNamePrefix}-token has expired.",r).format({tokenNamePrefix:v}),g=N("Expired at: {expiredDate}. Current time: {currentDate}.",r).format({expiredDate:new Intl.DateTimeFormat("en",T).format((l=_.exp)!=null?l:0*1e3),currentDate:new Intl.DateTimeFormat("en",T).format(h)}),w=new L(A,p,!0,g);return w.errorCategory=e,w.muxCode=P.NETWORK_TOKEN_EXPIRED,w.data=t,w}if(F0(_,f)){let T=N("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",r).format({tokenNamePrefix:v}),A=N("Specified playback ID: {playbackId} and the playback ID encoded in the {tokenNamePrefix}-token: {tokenPlaybackId}",r).format({tokenNamePrefix:v,playbackId:f,tokenPlaybackId:_.sub}),g=new L(T,p,!0,A);return g.errorCategory=e,g.muxCode=P.NETWORK_TOKEN_SUB_MISMATCH,g.data=t,g}if(K0(_)){let T=N("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:v}),A=N("The {tokenNamePrefix}-token has no aud value. aud value should be {expectedAud}.",r).format({tokenNamePrefix:v,expectedAud:u}),g=new L(T,p,!0,A);return g.errorCategory=e,g.muxCode=P.NETWORK_TOKEN_AUD_MISSING,g.data=t,g}if(V0(_,u)){let T=N("The {tokenNamePrefix}-token is formatted with incorrect information.",r).format({tokenNamePrefix:v}),A=N("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.",r).format({tokenNamePrefix:v,expectedAud:u,aud:_.aud}),g=new L(T,p,!0,A);return g.errorCategory=e,g.muxCode=P.NETWORK_TOKEN_AUD_MISMATCH,g.data=t,g}}else{let T=N("Authorization error trying to access this {category} URL. If this is a signed URL, you might need to provide a {tokenNamePrefix}-token.",r).format({tokenNamePrefix:v,category:e}),A=N("Specified playback ID: {playbackId}",r).format({playbackId:f}),g=new L(T,p,a??!0,A);return g.errorCategory=e,g.muxCode=P.NETWORK_TOKEN_MISSING,g.data=t,g}if(d===412){let T=N("This playback-id may belong to a live stream that is not currently active or an asset that is not ready.",r),A=N("Specified playback ID: {playbackId}",r).format({playbackId:f}),g=new L(T,p,a??!0,A);return g.errorCategory=e,g.muxCode=P.NETWORK_NOT_READY,g.streamType=i.streamType===ee.LIVE?"live":i.streamType===ee.ON_DEMAND?"on-demand":"unknown",g.data=t,g}if(d===404){let T=N("This URL or playback-id does not exist. You may have used an Asset ID or an ID from a different resource.",r),A=N("Specified playback ID: {playbackId}",r).format({playbackId:f}),g=new L(T,p,a??!0,A);return g.errorCategory=e,g.muxCode=P.NETWORK_NOT_FOUND,g.data=t,g}if(d===400){let T=N("The URL or playback-id was invalid. You may have used an invalid value as a playback-id."),A=N("Specified playback ID: {playbackId}",r).format({playbackId:f}),g=new L(T,p,a??!0,A);return g.errorCategory=e,g.muxCode=P.NETWORK_INVALID_URL,g.data=t,g}let b=new L("",p,a??!0);return b.errorCategory=e,b.muxCode=P.NETWORK_UNKNOWN_ERROR,b.data=t,b},"F"),Dp=q.DefaultConfig.capLevelController,l1={"720p":921600,"1080p":2073600,"1440p":4194304,"2160p":8294400};function d1(t){let e=t.toLowerCase().trim();return l1[e]}n(d1,"kt$1");var ri,Eu=(ri=class extends Dp{constructor(e){super(e)}static setMaxAutoResolution(e,i){i?ri.maxAutoResolution.set(e,i):ri.maxAutoResolution.delete(e)}getMaxAutoResolution(){var e;let i=this.hls;return(e=ri.maxAutoResolution.get(i))!=null?e:void 0}get levels(){var e;return(e=this.hls.levels)!=null?e:[]}getValidLevels(e){return this.levels.filter((i,a)=>this.isLevelAllowed(i)&&a<=e)}getMaxLevelCapped(e){let i=this.getValidLevels(e),a=this.getMaxAutoResolution();if(!a)return super.getMaxLevel(e);let r=d1(a);if(!r)return super.getMaxLevel(e);let s=i.filter(d=>d.width*d.height<=r),o=s.findIndex(d=>d.width*d.height===r);if(o!==-1){let d=s[o];return i.findIndex(h=>h===d)}if(s.length===0)return 0;let l=s[s.length-1];return i.findIndex(d=>d===l)}getMaxLevel(e){if(this.getMaxAutoResolution()!==void 0)return this.getMaxLevelCapped(e);let i=super.getMaxLevel(e),a=this.getValidLevels(e);if(!a[i])return i;let r=Math.min(a[i].width,a[i].height),s=ri.minMaxResolution;return r>=s?i:Dp.getMaxLevelByMediaSize(a,s*(16/9),s)}},n(ri,"S"),ri);Eu.minMaxResolution=720,Eu.maxAutoResolution=new WeakMap;var u1=Eu,_u=u1,c1="com.apple.fps.1_0",h1="application/vnd.apple.mpegurl",m1=n(({mediaEl:t,getAppCertificate:e,getLicenseKey:i,saveAndDispatchError:a,drmTypeCb:r})=>{if(!window.WebKitMediaKeys||!("onwebkitneedkey"in t)){let c=N("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),u=new L(c,L.MEDIA_ERR_ENCRYPTED,!0);return u.errorCategory=te.DRM,u.muxCode=P.ENCRYPTED_CDM_ERROR,a(t,u),()=>{}}let s=t,o=e(),l=null,d=n(c=>{(async()=>{try{s.webkitKeys||h();let u=await o;if(c.initData===null||u==null)return;let f=p1(c.initData,u);p(f)}catch(u){a(s,u)}})()},"l"),h=n(()=>{try{let c=new WebKitMediaKeys(c1);s.webkitSetMediaKeys(c),r()}catch{let c="Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.",u=new L(c,L.MEDIA_ERR_ENCRYPTED,!0);throw u.errorCategory=te.DRM,u.muxCode=P.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,u}},"u"),p=n(c=>{let u=s.webkitKeys.createSession(h1,c),f=n(async T=>{try{let A=T.message,g=await i(A);u.update(g)}catch(A){a(t,A)}},"p"),_=n(T=>{if(!T.target.error)return;let g=N("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser."),w=new L(g,L.MEDIA_ERR_ENCRYPTED,!0);w.errorCategory=te.DRM,w.muxCode=P.ENCRYPTED_CDM_ERROR,a(t,w)},"M"),b=n(()=>{u.removeEventListener("webkitkeymessage",f),u.removeEventListener("webkitkeyerror",_),t.removeEventListener("teardown",b),"webkitCurrentPlaybackTargetIsWireless"in t&&t.removeEventListener("webkitcurrentplaybacktargetiswirelesschanged",b),l=null;try{u.close()}catch{}},"E");"webkitCurrentPlaybackTargetIsWireless"in t&&t.addEventListener("webkitcurrentplaybacktargetiswirelesschanged",b,{once:!0}),u.addEventListener("webkitkeymessage",f),u.addEventListener("webkitkeyerror",_),t.addEventListener("teardown",b),l=b},"f"),v=n(()=>{t.removeEventListener("webkitneedkey",d),t.removeEventListener("teardown",v),l?.();try{s.webkitSetMediaKeys(null)}catch{}},"c");return t.addEventListener("webkitneedkey",d),t.addEventListener("teardown",v,{once:!0}),v},"Ye"),p1=n((t,e)=>{let i=f1(v1(t)),a=new Uint8Array(t),r=new Uint8Array(i),s=new Uint8Array(e),o=a.byteLength+4+s.byteLength+4+r.byteLength,l=new Uint8Array(o),d=0,h=n(v=>{l.set(v,d),d+=v.byteLength},"u"),p=n(v=>{let c=new DataView(l.buffer),u=v.byteLength;c.setUint32(d,u,!0),d+=4,h(v)},"f");return h(a),p(r),p(s),l},"Lt$1"),v1=n(t=>new TextDecoder("utf-16le").decode(t).replace("skd://","").slice(1),"ht$1");function f1(t){let e=new ArrayBuffer(t.length*2),i=new DataView(e);for(let a=0;a<t.length;a++)i.setUint16(a*2,t.charCodeAt(a),!0);return e}n(f1,"_t");var E1=n(({mediaEl:t,getAppCertificate:e,getLicenseKey:i,saveAndDispatchError:a,drmTypeCb:r,fallbackToWebkitFairplay:s})=>{let o=null,l=n(async v=>{try{let c=v.initDataType;if(c!=="skd")return;t.mediaKeys||await d(c);let u=v.initData;if(u==null)return;await h(c,u)}catch(c){a(t,c);return}},"i"),d=n(async v=>{let c=await navigator.requestMediaKeySystemAccess("com.apple.fps",[{initDataTypes:[v],videoCapabilities:[{contentType:"application/vnd.apple.mpegurl",robustness:""}],distinctiveIdentifier:"not-allowed",persistentState:"not-allowed",sessionTypes:["temporary"]}]).then(f=>(r(),f)).catch(()=>{let f=N("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser."),_=new L(f,L.MEDIA_ERR_ENCRYPTED,!0);_.errorCategory=te.DRM,_.muxCode=P.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM,a(t,_)});if(!c)return;let u=await c.createMediaKeys();try{let f=await e();await u.setServerCertificate(f).catch(()=>{let _=N("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate."),b=new L(_,L.MEDIA_ERR_ENCRYPTED,!0);return b.errorCategory=te.DRM,b.muxCode=P.ENCRYPTED_UPDATE_SERVER_CERT_FAILED,Promise.reject(b)})}catch(f){a(t,f);return}await t.setMediaKeys(u)},"l"),h=n(async(v,c)=>{let u=t.mediaKeys.createSession(),f=n(async T=>{let A=T.message,g=await i(A);try{await u.update(g)}catch{let w=N("Failed to update DRM license. This may be an issue with the player or your protected content."),O=new L(w,L.MEDIA_ERR_ENCRYPTED,!0);O.errorCategory=te.DRM,O.muxCode=P.ENCRYPTED_UPDATE_LICENSE_FAILED,a(t,O)}},"p"),_=n(()=>{let T=n(A=>{let g;if(A==="internal-error"){let w=N("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");g=new L(w,L.MEDIA_ERR_ENCRYPTED,!0),g.errorCategory=te.DRM,g.muxCode=P.ENCRYPTED_CDM_ERROR}else if(A==="output-restricted"||A==="output-downscaled"){let w=N("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");g=new L(w,L.MEDIA_ERR_ENCRYPTED,!1),g.errorCategory=te.DRM,g.muxCode=P.ENCRYPTED_OUTPUT_RESTRICTED}g&&a(t,g)},"D");u.keyStatuses.forEach(A=>T(A))},"M");u.addEventListener("keystatuseschange",_),u.addEventListener("message",f);let b=n(async()=>{u.removeEventListener("keystatuseschange",_),u.removeEventListener("message",f),"webkitCurrentPlaybackTargetIsWireless"in t&&t.removeEventListener("webkitcurrentplaybacktargetiswirelesschanged",b),t.removeEventListener("teardown",b),await u.close().catch(T=>{}),o=null},"E");"webkitCurrentPlaybackTargetIsWireless"in t&&t.addEventListener("webkitcurrentplaybacktargetiswirelesschanged",b,{once:!0}),t.addEventListener("teardown",b,{once:!0}),o=b,await u.generateRequest(v,c).catch(async T=>{if(T.name==="NotSupportedError"&&"webkitCurrentPlaybackTargetIsWireless"in t&&t.webkitCurrentPlaybackTargetIsWireless)s?.();else{let A=N("Failed to generate a DRM license request. This may be an issue with the player or your protected content."),g=new L(A,L.MEDIA_ERR_ENCRYPTED,!0);return g.errorCategory=te.DRM,g.muxCode=P.ENCRYPTED_GENERATE_REQUEST_FAILED,Promise.reject(g)}})},"u"),p=n(async()=>{t.removeEventListener("encrypted",l),t.removeEventListener("teardown",p),o&&await o(),await t.setMediaKeys(null).catch(()=>{})},"f");return t.addEventListener("encrypted",l),t.addEventListener("teardown",p,{once:!0}),p},"$e"),Ao={FAIRPLAY:"fairplay",PLAYREADY:"playready",WIDEVINE:"widevine"},_1=n(t=>{if(t.includes("fps"))return Ao.FAIRPLAY;if(t.includes("playready"))return Ao.PLAYREADY;if(t.includes("widevine"))return Ao.WIDEVINE},"At$1"),b1=n((t,e)=>{let i=U0(t);if(!i)return Promise.reject(new Error("No media playlist URL found in multivariant playlist"));if(pu(i)&&!e)return Promise.reject(new Error("masterPlaylistUrl is required to resolve relative media playlist URL"));let a;try{a=Qc(i,e)}catch(r){return Promise.reject(r)}return fetch(a).then(r=>r.status!==200?Promise.reject(r):r.text())},"St$1"),g1=n(t=>{let e=t.split(`
`).filter(a=>a.startsWith("#EXT-X-SESSION-DATA"));if(!e.length)return{};let i={};for(let a of e){let r=T1(a),s=r["DATA-ID"];s&&(i[s]={...r})}return{sessionData:i}},"It$1"),y1=/([A-Z0-9-]+)="?(.*?)"?(?:,|$)/g;function T1(t){let e=[...t.matchAll(y1)];return Object.fromEntries(e.map(([,i,a])=>[i,a]))}n(T1,"Ot");var A1=n(t=>{var e,i,a;let r=t.split(`
`),s=(i=((e=r.find(h=>h.startsWith("#EXT-X-PLAYLIST-TYPE")))!=null?e:"").split(":")[1])==null?void 0:i.trim(),o=wf(s),l=If(s),d;if(o===ee.LIVE){let h=r.find(p=>p.startsWith("#EXT-X-PART-INF"));if(h)d=+h.split(":")[1].split("=")[1]*2;else{let p=r.find(c=>c.startsWith("#EXT-X-TARGETDURATION")),v=(a=p?.split(":"))==null?void 0:a[1];d=+(v??6)*3}}return{streamType:o,targetLiveWindow:l,liveEdgeStartOffset:d}},"Ut$1"),k1=n(async(t,e)=>{if(e===Ii.MP4)return{streamType:ee.ON_DEMAND,targetLiveWindow:Number.NaN,liveEdgeStartOffset:void 0,sessionData:void 0};if(e===Ii.M3U8){let i=await fetch(t);if(!i.ok)return Promise.reject(i);let a=await i.text(),r=await b1(a,i.url);return{...g1(a),...A1(r)}}return{streamType:void 0,targetLiveWindow:void 0,liveEdgeStartOffset:void 0,sessionData:void 0}},"Ht"),S1=n(async(t,e,i=wd({src:t}))=>{var a,r,s,o;let{streamType:l,targetLiveWindow:d,liveEdgeStartOffset:h,sessionData:p}=await k1(t,i),v=p?.["com.apple.hls.chapters"];(v!=null&&v.URI||v!=null&&v.VALUE.toLocaleLowerCase().startsWith("http"))&&Jc((a=v.URI)!=null?a:v.VALUE,e),((r=ce.get(e))!=null?r:{}).liveEdgeStartOffset=h,((s=ce.get(e))!=null?s:{}).targetLiveWindow=d,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((o=ce.get(e))!=null?o:{}).streamType=l,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},"Kt$1"),Jc=n(async(t,e)=>{var i,a;try{let r=await fetch(t);if(!r.ok)throw new Error(`Failed to fetch Mux metadata: ${r.status} ${r.statusText}`);let s=await r.json(),o={};if(!((i=s?.[0])!=null&&i.metadata))return;for(let d of s[0].metadata)d.key&&d.value&&(o[d.key]=d.value);((a=ce.get(e))!=null?a:{}).metadata=o;let l=new CustomEvent("muxmetadata");e.dispatchEvent(l)}catch{}},"Te"),w1=n(t=>{var e;let i=t.type,a=wf(i),r=If(i),s,o=!!((e=t.partList)!=null&&e.length);return a===ee.LIVE&&(s=o?t.partTarget*2:t.targetduration*3),{streamType:a,targetLiveWindow:r,liveEdgeStartOffset:s,lowLatency:o}},"Wt$1"),I1=n((t,e,i)=>{var a,r,s,o,l,d,h,p;let{streamType:v,targetLiveWindow:c,liveEdgeStartOffset:u,lowLatency:f}=w1(t);if(v===ee.LIVE){f?(i.config.backBufferLength=(a=i.userConfig.backBufferLength)!=null?a:4,i.config.maxFragLookUpTolerance=(r=i.userConfig.maxFragLookUpTolerance)!=null?r:.001,i.config.abrBandWidthUpFactor=(s=i.userConfig.abrBandWidthUpFactor)!=null?s:i.config.abrBandWidthFactor):i.config.backBufferLength=(o=i.userConfig.backBufferLength)!=null?o:8;let _=Object.freeze({get length(){return e.seekable.length},start(b){return e.seekable.start(b)},end(b){var T;return b>this.length||b<0||Number.isFinite(e.duration)?e.seekable.end(b):(T=i.liveSyncPosition)!=null?T:e.seekable.end(b)}});((l=ce.get(e))!=null?l:{}).seekable=_}((d=ce.get(e))!=null?d:{}).liveEdgeStartOffset=u,((h=ce.get(e))!=null?h:{}).targetLiveWindow=c,e.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0})),((p=ce.get(e))!=null?p:{}).streamType=v,e.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}))},"Ft$1"),Mp,Op,Pf=(Op=(Mp=globalThis?.navigator)==null?void 0:Mp.userAgent)!=null?Op:"",xp,Np,Pp,R1=(Pp=(Np=(xp=globalThis?.navigator)==null?void 0:xp.userAgentData)==null?void 0:Np.platform)!=null?Pp:"",L1=Pf.toLowerCase().includes("android")||["x11","android"].some(t=>R1.toLowerCase().includes(t)),C1=n(t=>/^((?!chrome|android).)*safari/i.test(Pf)&&!!t.canPlayType("application/vnd.apple.mpegurl"),"$t$1"),ce=new WeakMap,Ri="mux.com",$p,Up,$f=(Up=($p=q).isSupported)==null?void 0:Up.call($p),D1=n(t=>L1||!C1(t),"Bt$1"),eh=n(()=>{if(typeof window<"u")return Yc.utils.now()},"kn"),M1=Yc.utils.generateUUID,bu=n(({playbackId:t,customDomain:e=Ri,maxResolution:i,minResolution:a,renditionOrder:r,programStartTime:s,programEndTime:o,assetStartTime:l,assetEndTime:d,playbackToken:h,tokens:{playback:p=h}={},extraSourceParams:v={}}={})=>{if(!t)return;let[c,u=""]=zc(t),f=new URL(`https://stream.${e}/${c}.m3u8${u}`);return p||f.searchParams.has("token")?(f.searchParams.forEach((_,b)=>{b!="token"&&f.searchParams.delete(b)}),p&&f.searchParams.set("token",p)):(i&&f.searchParams.set("max_resolution",i),a&&(f.searchParams.set("min_resolution",a),i&&+i.slice(0,-1)<+a.slice(0,-1)),r&&f.searchParams.set("rendition_order",r),s&&f.searchParams.set("program_start_time",`${s}`),o&&f.searchParams.set("program_end_time",`${o}`),l&&f.searchParams.set("asset_start_time",`${l}`),d&&f.searchParams.set("asset_end_time",`${d}`),Object.entries(v).forEach(([_,b])=>{b!=null&&f.searchParams.set(_,b)})),f.toString()},"Dn"),Id=n(t=>{if(!t)return;let[e]=t.split("?");return e||void 0},"ee$2"),th=n(t=>{if(!t||!t.startsWith("https://stream."))return;let[e]=new URL(t).pathname.slice(1).split(/\.m3u8|\//);return e||void 0},"tt"),O1=n(t=>{var e,i,a;return(e=t?.metadata)!=null&&e.video_id?t.metadata.video_id:Yf(t)&&(a=(i=Id(t.playbackId))!=null?i:th(t.src))!=null?a:t.src},"Jt"),Uf=n(t=>{var e;return(e=ce.get(t))==null?void 0:e.error},"Gt$1"),x1=n(t=>{var e;return(e=ce.get(t))==null?void 0:e.metadata},"Pn"),gu=n(t=>{var e,i;return(i=(e=ce.get(t))==null?void 0:e.streamType)!=null?i:ee.UNKNOWN},"Be$1"),N1=n(t=>{var e,i;return(i=(e=ce.get(t))==null?void 0:e.targetLiveWindow)!=null?i:Number.NaN},"Ln"),ih=n(t=>{var e,i;return(i=(e=ce.get(t))==null?void 0:e.seekable)!=null?i:t.seekable},"rt"),P1=n(t=>{var e;let i=(e=ce.get(t))==null?void 0:e.liveEdgeStartOffset;if(typeof i!="number")return Number.NaN;let a=ih(t);return a.length?a.end(a.length-1)-i:Number.NaN},"hn"),$1=n(t=>{var e;return(e=ce.get(t))==null?void 0:e.coreReference},"_n"),ah=.034,U1=n((t,e,i=ah)=>Math.abs(t-e)<=i,"qt$1"),Hf=n((t,e,i=ah)=>t>e||U1(t,e,i),"nt"),H1=n((t,e=ah)=>t.paused&&Hf(t.currentTime,t.duration,e),"zt$1"),Wf=n((t,e)=>{var i,a,r;if(!e||!t.buffered.length)return;if(t.readyState>2)return!1;let s=e.currentLevel>=0?(a=(i=e.levels)==null?void 0:i[e.currentLevel])==null?void 0:a.details:(r=e.levels.find(v=>!!v.details))==null?void 0:r.details;if(!s||s.live)return;let{fragments:o}=s;if(!(o!=null&&o.length))return;if(t.currentTime<t.duration-(s.targetduration+.5))return!1;let l=o[o.length-1];if(t.currentTime<=l.start)return!1;let d=l.start+l.duration/2,h=t.buffered.start(t.buffered.length-1),p=t.buffered.end(t.buffered.length-1);return d>h&&d<p},"ot"),Bf=n((t,e)=>t.ended||t.loop?t.ended:e&&Wf(t,e)?!0:H1(t),"Xt$1"),Ff=n((t,e,i)=>{Kf(e,i,t);let{metadata:a={}}=t,{view_session_id:r=M1()}=a,s=O1(t);a.view_session_id=r,a.video_id=s,t.metadata=a;let o=n(c=>{var u;(u=e.mux)==null||u.emit("hb",{view_drm_type:c})},"a");t.drmTypeCb=o,t.fallbackToWebkitFairplay=async()=>{var c;let u=!e.paused,f=e.currentTime;t.useWebkitFairplay=!0;let _=t.muxDataKeepSession;t.muxDataKeepSession=!0;let b=(c=ce.get(e))==null?void 0:c.coreReference;Ff(t,e,b),t.muxDataKeepSession=_,t.useWebkitFairplay=!1,u&&await e.play().then(()=>{e.currentTime=f}).catch(()=>{}),e.currentTime=f},ce.set(e,{retryCount:0});let l=W1(t,e),d=z0(t,e,l);t!=null&&t.muxDataKeepSession&&e!=null&&e.mux&&!e.mux.deleted?l&&e.mux.addHLSJS({hlsjs:l,Hls:l?q:void 0}):G1(t,e,l),z1(t,e,l),t1(e),a1(e);let h=G0(t,e,l);Q0(t,e,l),j0(t,e,l);let p={engine:l,setAutoplay:h,setPreload:d},v=ce.get(e);return v&&(v.coreReference=p),p},"Qt$1"),Kf=n((t,e,i)=>{let a=e?.engine;t!=null&&t.mux&&!t.mux.deleted&&(i!=null&&i.muxDataKeepSession?a&&t.mux.removeHLSJS():(t.mux.destroy(),delete t.mux)),a&&(a.detachMedia(),a.destroy()),t&&(t.hasAttribute("src")&&(t.removeAttribute("src"),t.load()),t.removeEventListener("error",zf),t.removeEventListener("error",yu),t.removeEventListener("durationchange",Gf),ce.delete(t),t.dispatchEvent(new Event("teardown")))},"Zt$1");function Vf(t,e){var i;let a=wd(t);if(a!==Ii.M3U8)return!0;let r=!a||((i=e.canPlayType(a))!=null?i:!0),{preferPlayback:s}=t,o=s===ni.MSE,l=s===ni.NATIVE,d=$f&&(o||D1(e));return r&&(l||!d)}n(Vf,"at");var W1=n((t,e)=>{let{debug:i,streamType:a,startTime:r=-1,metadata:s,preferCmcd:o,_hlsConfig:l={},maxAutoResolution:d,initialBandwidthEstimateKbps:h}=t,p=wd(t)===Ii.M3U8,v=Vf(t,e);if(p&&!v&&$f){let c={backBufferLength:30,renderTextTracksNatively:!1,liveDurationInfinity:!0,capLevelOnFPSDrop:!0,...h!=null?{abrEwmaDefaultEstimate:h*1e3}:{}},u=B1(a),f=F1(t),_=[Rn.QUERY,Rn.HEADER].includes(o)?{useHeaders:o===Rn.HEADER,sessionId:s?.view_session_id,contentId:s?.video_id}:void 0,b=Y1(t),T=new q({debug:i,startPosition:r,cmcd:_,xhrSetup:n((A,g)=>{var w,O;if(o&&o!==Rn.QUERY)return;let M=Qc(g);if(!M.searchParams.has("CMCD"))return;let H=((O=(w=M.searchParams.get("CMCD"))==null?void 0:w.split(","))!=null?O:[]).filter(F=>F.startsWith("sid")||F.startsWith("cid")).join(",");M.searchParams.set("CMCD",H),A.open("GET",M)},"xhrSetup"),...c,...b,...u,...f,...l});return b.capLevelController===_u&&d!==void 0&&_u.setMaxAutoResolution(T,d),T.on(q.Events.MANIFEST_PARSED,async function(A,g){var w,O;let M=(w=g.sessionData)==null?void 0:w["com.apple.hls.chapters"];(M!=null&&M.URI||M!=null&&M.VALUE.toLocaleLowerCase().startsWith("http"))&&Jc((O=M?.URI)!=null?O:M?.VALUE,e)}),T}},"er"),B1=n(t=>t===ee.LIVE?{backBufferLength:8}:{},"tr"),F1=n(t=>{let{tokens:{drm:e}={},playbackId:i,drmTypeCb:a}=t,r=Id(i);return!e||!r?{}:{emeEnabled:!0,drmSystems:{"com.apple.fps":{licenseUrl:ko(t,"fairplay"),serverCertificateUrl:qf(t,"fairplay")},"com.widevine.alpha":{licenseUrl:ko(t,"widevine")},"com.microsoft.playready":{licenseUrl:ko(t,"playready")}},requestMediaKeySystemAccessFunc:n((s,o)=>(s==="com.widevine.alpha"&&(o=[...o.map(l=>{var d;let h=(d=l.videoCapabilities)==null?void 0:d.map(p=>({...p,robustness:"HW_SECURE_ALL"}));return{...l,videoCapabilities:h}}),...o]),navigator.requestMediaKeySystemAccess(s,o).then(l=>{let d=_1(s);return a?.(d),l})),"requestMediaKeySystemAccessFunc")}},"rr"),K1=n(async t=>{let e=await fetch(t);return e.status!==200?Promise.reject(e):await e.arrayBuffer()},"nr"),V1=n(async(t,e)=>{let i=await fetch(e,{method:"POST",headers:{"Content-type":"application/octet-stream"},body:t});if(i.status!==200)return Promise.reject(i);let a=await i.arrayBuffer();return new Uint8Array(a)},"or"),q1=n((t,e)=>{let i={mediaEl:e,getAppCertificate:n(()=>K1(qf(t,"fairplay")).catch(a=>{if(a instanceof Response){let r=Pl(a,te.DRM,t);return r?Promise.reject(r):Promise.reject(new Error("Unexpected error in app cert request"))}return Promise.reject(a)}),"getAppCertificate"),getLicenseKey:n(a=>V1(a,ko(t,"fairplay")).catch(r=>{if(r instanceof Response){let s=Pl(r,te.DRM,t);return s?Promise.reject(s):Promise.reject(new Error("Unexpected error in license key request"))}return Promise.reject(r)}),"getLicenseKey"),saveAndDispatchError:zi,drmTypeCb:n(()=>{var a;(a=t.drmTypeCb)==null||a.call(t,Ao.FAIRPLAY)},"drmTypeCb")};if(t.useWebkitFairplay)m1(i);else{let a={fallbackToWebkitFairplay:n(async()=>{var s;await r(),(s=t.fallbackToWebkitFairplay)==null||s.call(t)},"fallbackToWebkitFairplay"),...i},r=E1(a)}},"ar"),ko=n(({playbackId:t,tokens:{drm:e}={},customDomain:i=Ri},a)=>{let r=Id(t);return`https://license.${i.toLocaleLowerCase().endsWith(Ri)?i:Ri}/license/${a}/${r}?token=${e}`},"Z$1"),qf=n(({playbackId:t,tokens:{drm:e}={},customDomain:i=Ri},a)=>{let r=Id(t);return`https://license.${i.toLocaleLowerCase().endsWith(Ri)?i:Ri}/appcert/${a}/${r}?token=${e}`},"st"),Yf=n(({playbackId:t,src:e,customDomain:i})=>{if(t)return!0;if(typeof e!="string")return!1;let a=window?.location.href,r=new URL(e,a).hostname.toLocaleLowerCase();return r.includes(Ri)||!!i&&r.includes(i.toLocaleLowerCase())},"it"),Y1=n((t,e)=>{let i={};return i.capLevelToPlayerSize=t.capRenditionToPlayerSize,i.capLevelToPlayerSize==null?(i.capLevelController=_u,i.capLevelToPlayerSize=!0):i.capLevelController=lb,i},"sr"),G1=n((t,e,i)=>{var a;let{envKey:r,disableTracking:s,muxDataSDK:o=Yc,muxDataSDKOptions:l={}}=t,d=Yf(t);if(!s&&(r||d)){let{playerInitTime:h,playerSoftwareName:p,playerSoftwareVersion:v,beaconCollectionDomain:c,debug:u,disableCookies:f}=t,_={...t.metadata,video_title:((a=t?.metadata)==null?void 0:a.video_title)||void 0},b=n(T=>typeof T.player_error_code=="string"?!1:typeof t.errorTranslator=="function"?t.errorTranslator(T):T,"E");o.monitor(e,{debug:u,beaconCollectionDomain:c,hlsjs:i,Hls:i?q:void 0,automaticErrorTracking:!1,errorTranslator:b,disableCookies:f,...l,data:{...r?{env_key:r}:{},player_software_name:p,player_software:p,player_software_version:v,player_init_time:h,..._}})}},"ir"),z1=n((t,e,i)=>{var a,r;let s=Vf(t,e),{src:o,customDomain:l=Ri}=t,d=n(()=>{e.ended||t.disablePseudoEnded||!Bf(e,i)||(Wf(e,i)?e.currentTime=e.buffered.end(e.buffered.length-1):e.dispatchEvent(new Event("ended")))},"a"),h,p,v=n(()=>{let c=ih(e),u,f;c.length>0&&(u=c.start(0),f=c.end(0)),(p!==f||h!==u)&&e.dispatchEvent(new CustomEvent("seekablechange",{composed:!0})),h=u,p=f},"u");if(Se(e,"durationchange",v),e&&s){let c=wd(t);if(typeof o=="string"){if(o.endsWith(".mp4")&&o.includes(l)){let _=th(o),b=new URL(`https://stream.${l}/${_}/metadata.json`);Jc(b.toString(),e)}let u=n(()=>{if(gu(e)!==ee.LIVE||Number.isFinite(e.duration))return;let _=setInterval(v,1e3);e.addEventListener("teardown",()=>{clearInterval(_)},{once:!0}),Se(e,"durationchange",()=>{Number.isFinite(e.duration)&&clearInterval(_)})},"d"),f=n(async()=>S1(o,e,c).then(u).catch(_=>{if(_ instanceof Response){let b=Pl(_,te.VIDEO,t);if(b){zi(e,b);return}}}),"p");if(e.preload==="none"){let _=n(()=>{f(),e.removeEventListener("loadedmetadata",b)},"M"),b=n(()=>{f(),e.removeEventListener("play",_)},"E");Se(e,"play",_,{once:!0}),Se(e,"loadedmetadata",b,{once:!0})}else f();(a=t.tokens)!=null&&a.drm?q1(t,e):Se(e,"encrypted",()=>{let _=N("Attempting to play DRM-protected content without providing a DRM token."),b=new L(_,L.MEDIA_ERR_ENCRYPTED,!0);b.errorCategory=te.DRM,b.muxCode=P.ENCRYPTED_MISSING_TOKEN,zi(e,b)},{once:!0}),e.setAttribute("src",o),t.startTime&&(((r=ce.get(e))!=null?r:{}).startTime=t.startTime,e.addEventListener("durationchange",Gf,{once:!0}))}else e.removeAttribute("src");e.addEventListener("error",zf),e.addEventListener("error",yu),e.addEventListener("emptied",()=>{e.querySelectorAll("track[data-removeondestroy]").forEach(u=>{u.remove()})},{once:!0}),Se(e,"pause",d),Se(e,"seeked",d),Se(e,"play",()=>{e.ended||Hf(e.currentTime,e.duration)&&(e.currentTime=e.seekable.length?e.seekable.start(0):0)})}else i&&o&&(i.once(q.Events.LEVEL_LOADED,(c,u)=>{I1(u.details,e,i),v(),gu(e)===ee.LIVE&&!Number.isFinite(e.duration)&&(i.on(q.Events.LEVEL_UPDATED,v),Se(e,"durationchange",()=>{Number.isFinite(e.duration)&&i.off(q.Events.LEVELS_UPDATED,v)}))}),i.on(q.Events.ERROR,(c,u)=>{var f,_;let b=Q1(u,t);if(b.muxCode===P.NETWORK_NOT_READY){let T=(f=ce.get(e))!=null?f:{},A=(_=T.retryCount)!=null?_:0;if(A<6){let g=A===0?5e3:6e4,w=new L(`Retrying in ${g/1e3} seconds...`,b.code,b.fatal);Object.assign(w,b),zi(e,w);let O=setTimeout(()=>{T.retryCount=A+1,u.details==="manifestLoadError"&&u.url&&i.loadSource(u.url)},g);e.addEventListener("teardown",()=>clearTimeout(O),{once:!0});return}else{T.retryCount=0;let g=new L('Try again later or <a href="#" onclick="window.location.reload(); return false;" style="color: #4a90e2;">click here to retry</a>',b.code,b.fatal);Object.assign(g,b),zi(e,g);return}}zi(e,b)}),i.on(q.Events.MANIFEST_LOADED,()=>{let c=ce.get(e);c&&c.error&&(c.error=null,c.retryCount=0,e.dispatchEvent(new Event("emptied")),e.dispatchEvent(new Event("loadstart")))}),e.addEventListener("error",yu),Se(e,"waiting",d),Z0(t,i),X0(e,i),i.attachMedia(e))},"cr");function Gf(t){var e;let i=t.target,a=(e=ce.get(i))==null?void 0:e.startTime;if(a&&P0(i.seekable,i.duration,a)){let r=i.preload==="auto";r&&(i.preload="none"),i.currentTime=a,r&&(i.preload="auto")}}n(Gf,"ct$1");async function zf(t){if(!t.isTrusted)return;t.stopImmediatePropagation();let e=t.target;if(!(e!=null&&e.error))return;let{message:i,code:a}=e.error,r=new L(i,a);if(e.src&&a===L.MEDIA_ERR_SRC_NOT_SUPPORTED&&e.readyState===HTMLMediaElement.HAVE_NOTHING){setTimeout(()=>{var s;let o=(s=Uf(e))!=null?s:e.error;o?.code===L.MEDIA_ERR_SRC_NOT_SUPPORTED&&zi(e,r)},500);return}if(e.src&&(a!==L.MEDIA_ERR_DECODE||a!==void 0))try{let{status:s}=await fetch(e.src);r.data={response:{code:s}}}catch{}zi(e,r)}n(zf,"ut$1");function zi(t,e){var i;e.fatal&&(((i=ce.get(t))!=null?i:{}).error=e,t.dispatchEvent(new CustomEvent("error",{detail:e})))}n(zi,"I$2");function yu(t){var e,i;if(!(t instanceof CustomEvent)||!(t.detail instanceof L))return;let a=t.target,r=t.detail;!r||!r.fatal||(((e=ce.get(a))!=null?e:{}).error=r,(i=a.mux)==null||i.emit("error",{player_error_code:r.code,player_error_message:r.message,player_error_context:r.context}))}n(yu,"fe$1");var Q1=n((t,e)=>{var i,a,r;t.fatal||e.debug;let s={[q.ErrorTypes.NETWORK_ERROR]:L.MEDIA_ERR_NETWORK,[q.ErrorTypes.MEDIA_ERROR]:L.MEDIA_ERR_DECODE,[q.ErrorTypes.KEY_SYSTEM_ERROR]:L.MEDIA_ERR_ENCRYPTED},o=n(p=>[q.ErrorDetails.KEY_SYSTEM_LICENSE_REQUEST_FAILED,q.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED].includes(p.details)?L.MEDIA_ERR_NETWORK:s[p.type],"o"),l=n(p=>{if(p.type===q.ErrorTypes.KEY_SYSTEM_ERROR)return te.DRM;if(p.type===q.ErrorTypes.NETWORK_ERROR)return te.VIDEO},"s"),d,h=o(t);if(h===L.MEDIA_ERR_NETWORK&&t.response){let p=(i=l(t))!=null?i:te.VIDEO;d=(a=Pl(t.response,p,e,t.fatal))!=null?a:new L("",h,t.fatal)}else if(h===L.MEDIA_ERR_ENCRYPTED)if(t.details===q.ErrorDetails.KEY_SYSTEM_NO_CONFIGURED_LICENSE){let p=N("Attempting to play DRM-protected content without providing a DRM token.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=te.DRM,d.muxCode=P.ENCRYPTED_MISSING_TOKEN}else if(t.details===q.ErrorDetails.KEY_SYSTEM_NO_ACCESS){let p=N("Cannot play DRM-protected content with current security configuration on this browser. Try playing in another browser.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=te.DRM,d.muxCode=P.ENCRYPTED_UNSUPPORTED_KEY_SYSTEM}else if(t.details===q.ErrorDetails.KEY_SYSTEM_NO_SESSION){let p=N("Failed to generate a DRM license request. This may be an issue with the player or your protected content.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,!0),d.errorCategory=te.DRM,d.muxCode=P.ENCRYPTED_GENERATE_REQUEST_FAILED}else if(t.details===q.ErrorDetails.KEY_SYSTEM_SESSION_UPDATE_FAILED){let p=N("Failed to update DRM license. This may be an issue with the player or your protected content.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=te.DRM,d.muxCode=P.ENCRYPTED_UPDATE_LICENSE_FAILED}else if(t.details===q.ErrorDetails.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED){let p=N("Your server certificate failed when attempting to set it. This may be an issue with a no longer valid certificate.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=te.DRM,d.muxCode=P.ENCRYPTED_UPDATE_SERVER_CERT_FAILED}else if(t.details===q.ErrorDetails.KEY_SYSTEM_STATUS_INTERNAL_ERROR){let p=N("The DRM Content Decryption Module system had an internal failure. Try reloading the page, upading your browser, or playing in another browser.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=te.DRM,d.muxCode=P.ENCRYPTED_CDM_ERROR}else if(t.details===q.ErrorDetails.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED){let p=N("DRM playback is being attempted in an environment that is not sufficiently secure. User may see black screen.");d=new L(p,L.MEDIA_ERR_ENCRYPTED,!1),d.errorCategory=te.DRM,d.muxCode=P.ENCRYPTED_OUTPUT_RESTRICTED}else d=new L(t.error.message,L.MEDIA_ERR_ENCRYPTED,t.fatal),d.errorCategory=te.DRM,d.muxCode=P.ENCRYPTED_ERROR;else d=new L("",h,t.fatal);return d.context||(d.context=`${t.url?`url: ${t.url}
`:""}${t.response&&(t.response.code||t.response.text)?`response: ${t.response.code}, ${t.response.text}
`:""}${t.reason?`failure reason: ${t.reason}
`:""}${t.level?`level: ${t.level}
`:""}${t.parent?`parent stream controller: ${t.parent}
`:""}${t.buffer?`buffer length: ${t.buffer}
`:""}${t.error?`error: ${t.error}
`:""}${t.event?`event: ${t.event}
`:""}${t.err?`error message: ${(r=t.err)==null?void 0:r.message}
`:""}`),d.data=t,d},"ur"),Qf=n(t=>{throw TypeError(t)},"D$1"),rh=n((t,e,i)=>e.has(t)||Qf("Cannot "+i),"P$2"),Ae=n((t,e,i)=>(rh(t,e,"read from private field"),i?i.call(t):e.get(t)),"r$2"),mt=n((t,e,i)=>e.has(t)?Qf("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"o$2"),Dt=n((t,e,i,a)=>(rh(t,e,"write to private field"),e.set(t,i),i),"E$3"),ao=n((t,e,i)=>(rh(t,e,"access private method"),i),"b$2"),j1=n(()=>{try{return"0.31.0"}catch{}return"UNKNOWN"},"Y$1"),Z1=j1(),X1=n(()=>Z1,"k$1"),J1=`
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" part="logo" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2" viewBox="0 0 1600 500"><g fill="#fff"><path d="M994.287 93.486c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m0-93.486c-34.509 0-62.484 27.976-62.484 62.486v187.511c0 68.943-56.09 125.033-125.032 125.033s-125.03-56.09-125.03-125.033V62.486C681.741 27.976 653.765 0 619.256 0s-62.484 27.976-62.484 62.486v187.511C556.772 387.85 668.921 500 806.771 500c137.851 0 250.001-112.15 250.001-250.003V62.486c0-34.51-27.976-62.486-62.485-62.486M1537.51 468.511c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31m-275.883-218.509-143.33 143.329c-24.402 24.402-24.402 63.966 0 88.368 24.402 24.402 63.967 24.402 88.369 0l143.33-143.329 143.328 143.329c24.402 24.4 63.967 24.402 88.369 0 24.403-24.402 24.403-63.966.001-88.368l-143.33-143.329.001-.004 143.329-143.329c24.402-24.402 24.402-63.965 0-88.367s-63.967-24.402-88.369 0L1349.996 161.63 1206.667 18.302c-24.402-24.401-63.967-24.402-88.369 0s-24.402 63.965 0 88.367l143.329 143.329v.004ZM437.511 468.521c-17.121 0-31-13.879-31-31 0-17.121 13.879-31 31-31 17.121 0 31 13.879 31 31 0 17.121-13.879 31-31 31M461.426 4.759C438.078-4.913 411.2.432 393.33 18.303L249.999 161.632 106.669 18.303C88.798.432 61.922-4.913 38.573 4.759 15.224 14.43-.001 37.214-.001 62.488v375.026c0 34.51 27.977 62.486 62.487 62.486 34.51 0 62.486-27.976 62.486-62.486V213.341l80.843 80.844c24.404 24.402 63.965 24.402 88.369 0l80.843-80.844v224.173c0 34.51 27.976 62.486 62.486 62.486s62.486-27.976 62.486-62.486V62.488c0-25.274-15.224-48.058-38.573-57.729" style="fill-rule:nonzero"/></g></svg>`,E={BEACON_COLLECTION_DOMAIN:"beacon-collection-domain",CUSTOM_DOMAIN:"custom-domain",DEBUG:"debug",DISABLE_TRACKING:"disable-tracking",DISABLE_COOKIES:"disable-cookies",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended",DRM_TOKEN:"drm-token",PLAYBACK_TOKEN:"playback-token",ENV_KEY:"env-key",MAX_RESOLUTION:"max-resolution",MIN_RESOLUTION:"min-resolution",MAX_AUTO_RESOLUTION:"max-auto-resolution",RENDITION_ORDER:"rendition-order",PROGRAM_START_TIME:"program-start-time",PROGRAM_END_TIME:"program-end-time",ASSET_START_TIME:"asset-start-time",ASSET_END_TIME:"asset-end-time",METADATA_URL:"metadata-url",PLAYBACK_ID:"playback-id",PLAYER_SOFTWARE_NAME:"player-software-name",PLAYER_SOFTWARE_VERSION:"player-software-version",PLAYER_INIT_TIME:"player-init-time",PREFER_CMCD:"prefer-cmcd",PREFER_PLAYBACK:"prefer-playback",START_TIME:"start-time",STREAM_TYPE:"stream-type",TARGET_LIVE_WINDOW:"target-live-window",LIVE_EDGE_OFFSET:"live-edge-offset",TYPE:"type",LOGO:"logo",CAP_RENDITION_TO_PLAYER_SIZE:"cap-rendition-to-player-size",INITIAL_BANDWIDTH_ESTIMATE_KBPS:"initial-bandwidth-estimate-kbps",INITIAL_ESTIMATE_SEGMENTS:"initial-estimate-segments",MIN_PRELOAD_SEGMENTS:"min-preload-segments"},ey=Object.values(E),Hp=X1(),Wp="mux-video",Ln,So,Cn,wo,Io,Ro,Lo,Co,Dn,Do,ft,ma,Mo,Mn,Dr,ty=(Dr=class extends to{constructor(){super(),mt(this,ft),mt(this,Ln),mt(this,So),mt(this,Cn,{}),mt(this,wo,{}),mt(this,Io),mt(this,Ro),mt(this,Lo),mt(this,Co),mt(this,Dn,""),mt(this,Do,e=>{var i;let a=x1(this.nativeEl),r=(i=this.metadata)!=null?i:{};this.metadata={...a,...r},a?.["com.mux.video.branding"]==="mux-free-plan"&&(Dt(this,Dn,"default"),this.updateLogo())}),mt(this,Mo),Dt(this,So,eh())}static get NAME(){return Wp}static get VERSION(){return Hp}static get observedAttributes(){var e;return[...ey,...(e=to.observedAttributes)!=null?e:[]]}static getLogoHTML(e){return!e||e==="false"?"":e==="default"?J1:`<img part="logo" src="${e}" />`}static getTemplateHTML(e={}){var i;return`
      ${to.getTemplateHTML(e)}
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
    `}get preferCmcd(){var e;return(e=this.getAttribute(E.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?hu.includes(e)&&this.setAttribute(E.PREFER_CMCD,e):this.removeAttribute(E.PREFER_CMCD))}get playerInitTime(){return this.hasAttribute(E.PLAYER_INIT_TIME)?+this.getAttribute(E.PLAYER_INIT_TIME):Ae(this,So)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(E.PLAYER_INIT_TIME):this.setAttribute(E.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=Ae(this,Lo))!=null?e:Wp}set playerSoftwareName(e){Dt(this,Lo,e)}get playerSoftwareVersion(){var e;return(e=Ae(this,Ro))!=null?e:Hp}set playerSoftwareVersion(e){Dt(this,Ro,e)}get _hls(){var e;return(e=Ae(this,ft,ma))==null?void 0:e.engine}get mux(){var e;return(e=this.nativeEl)==null?void 0:e.mux}get error(){var e;return(e=Uf(this.nativeEl))!=null?e:null}get errorTranslator(){return Ae(this,Co)}set errorTranslator(e){Dt(this,Co,e)}get src(){return this.getAttribute("src")}set src(e){e!==this.src&&(e==null?this.removeAttribute("src"):this.setAttribute("src",e))}get type(){var e;return(e=this.getAttribute(E.TYPE))!=null?e:void 0}set type(e){e!==this.type&&(e?this.setAttribute(E.TYPE,e):this.removeAttribute(E.TYPE))}get preload(){let e=this.getAttribute("preload");return e===""?"auto":["none","metadata","auto"].includes(e)?e:super.preload}set preload(e){e!=this.getAttribute("preload")&&(["","none","metadata","auto"].includes(e)?this.setAttribute("preload",e):this.removeAttribute("preload"))}get debug(){return this.getAttribute(E.DEBUG)!=null}set debug(e){e!==this.debug&&(e?this.setAttribute(E.DEBUG,""):this.removeAttribute(E.DEBUG))}get disableTracking(){return this.hasAttribute(E.DISABLE_TRACKING)}set disableTracking(e){e!==this.disableTracking&&this.toggleAttribute(E.DISABLE_TRACKING,!!e)}get disableCookies(){return this.hasAttribute(E.DISABLE_COOKIES)}set disableCookies(e){e!==this.disableCookies&&(e?this.setAttribute(E.DISABLE_COOKIES,""):this.removeAttribute(E.DISABLE_COOKIES))}get disablePseudoEnded(){return this.hasAttribute(E.DISABLE_PSEUDO_ENDED)}set disablePseudoEnded(e){e!==this.disablePseudoEnded&&(e?this.setAttribute(E.DISABLE_PSEUDO_ENDED,""):this.removeAttribute(E.DISABLE_PSEUDO_ENDED))}get startTime(){let e=this.getAttribute(E.START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set startTime(e){e!==this.startTime&&(e==null?this.removeAttribute(E.START_TIME):this.setAttribute(E.START_TIME,`${e}`))}get initialBandwidthEstimateKbps(){let e=this.getAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set initialBandwidthEstimateKbps(e){e!==this.initialBandwidthEstimateKbps&&(e==null?this.removeAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS):this.setAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS,`${e}`))}get initialEstimateSegments(){let e=this.getAttribute(E.INITIAL_ESTIMATE_SEGMENTS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set initialEstimateSegments(e){e!==this.initialEstimateSegments&&(e==null?this.removeAttribute(E.INITIAL_ESTIMATE_SEGMENTS):this.setAttribute(E.INITIAL_ESTIMATE_SEGMENTS,`${e}`))}get minPreloadSegments(){let e=this.getAttribute(E.MIN_PRELOAD_SEGMENTS);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set minPreloadSegments(e){e!==this.minPreloadSegments&&(e==null?this.removeAttribute(E.MIN_PRELOAD_SEGMENTS):this.setAttribute(E.MIN_PRELOAD_SEGMENTS,`${e}`))}get playbackId(){var e;return this.hasAttribute(E.PLAYBACK_ID)?this.getAttribute(E.PLAYBACK_ID):(e=th(this.src))!=null?e:void 0}set playbackId(e){e!==this.playbackId&&(e?this.setAttribute(E.PLAYBACK_ID,e):this.removeAttribute(E.PLAYBACK_ID))}get maxResolution(){var e;return(e=this.getAttribute(E.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(E.MAX_RESOLUTION,e):this.removeAttribute(E.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(E.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(E.MIN_RESOLUTION,e):this.removeAttribute(E.MIN_RESOLUTION))}get maxAutoResolution(){var e;return(e=this.getAttribute(E.MAX_AUTO_RESOLUTION))!=null?e:void 0}set maxAutoResolution(e){e==null?this.removeAttribute(E.MAX_AUTO_RESOLUTION):this.setAttribute(E.MAX_AUTO_RESOLUTION,e)}get renditionOrder(){var e;return(e=this.getAttribute(E.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(E.RENDITION_ORDER,e):this.removeAttribute(E.RENDITION_ORDER))}get programStartTime(){let e=this.getAttribute(E.PROGRAM_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programStartTime(e){e==null?this.removeAttribute(E.PROGRAM_START_TIME):this.setAttribute(E.PROGRAM_START_TIME,`${e}`)}get programEndTime(){let e=this.getAttribute(E.PROGRAM_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set programEndTime(e){e==null?this.removeAttribute(E.PROGRAM_END_TIME):this.setAttribute(E.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){let e=this.getAttribute(E.ASSET_START_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetStartTime(e){e==null?this.removeAttribute(E.ASSET_START_TIME):this.setAttribute(E.ASSET_START_TIME,`${e}`)}get assetEndTime(){let e=this.getAttribute(E.ASSET_END_TIME);if(e==null)return;let i=+e;return Number.isNaN(i)?void 0:i}set assetEndTime(e){e==null?this.removeAttribute(E.ASSET_END_TIME):this.setAttribute(E.ASSET_END_TIME,`${e}`)}get customDomain(){var e;return(e=this.getAttribute(E.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(E.CUSTOM_DOMAIN,e):this.removeAttribute(E.CUSTOM_DOMAIN))}get capRenditionToPlayerSize(){var e;return((e=this._hlsConfig)==null?void 0:e.capLevelToPlayerSize)!=null?this._hlsConfig.capLevelToPlayerSize:Ae(this,Mo)}set capRenditionToPlayerSize(e){Dt(this,Mo,e)}get drmToken(){var e;return(e=this.getAttribute(E.DRM_TOKEN))!=null?e:void 0}set drmToken(e){e!==this.drmToken&&(e?this.setAttribute(E.DRM_TOKEN,e):this.removeAttribute(E.DRM_TOKEN))}get playbackToken(){var e,i,a,r;if(this.hasAttribute(E.PLAYBACK_TOKEN))return(e=this.getAttribute(E.PLAYBACK_TOKEN))!=null?e:void 0;if(this.hasAttribute(E.PLAYBACK_ID)){let[,s]=zc((i=this.playbackId)!=null?i:"");return(a=new URLSearchParams(s).get("token"))!=null?a:void 0}if(this.src)return(r=new URLSearchParams(this.src).get("token"))!=null?r:void 0}set playbackToken(e){e!==this.playbackToken&&(e?this.setAttribute(E.PLAYBACK_TOKEN,e):this.removeAttribute(E.PLAYBACK_TOKEN))}get tokens(){let e=this.getAttribute(E.PLAYBACK_TOKEN),i=this.getAttribute(E.DRM_TOKEN);return{...Ae(this,wo),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{}}}set tokens(e){Dt(this,wo,e??{})}get ended(){return Bf(this.nativeEl,this._hls)}get envKey(){var e;return(e=this.getAttribute(E.ENV_KEY))!=null?e:void 0}set envKey(e){e!==this.envKey&&(e?this.setAttribute(E.ENV_KEY,e):this.removeAttribute(E.ENV_KEY))}get beaconCollectionDomain(){var e;return(e=this.getAttribute(E.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(E.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(E.BEACON_COLLECTION_DOMAIN))}get streamType(){var e;return(e=this.getAttribute(E.STREAM_TYPE))!=null?e:gu(this.nativeEl)}set streamType(e){e!==this.streamType&&(e?this.setAttribute(E.STREAM_TYPE,e):this.removeAttribute(E.STREAM_TYPE))}get targetLiveWindow(){return this.hasAttribute(E.TARGET_LIVE_WINDOW)?+this.getAttribute(E.TARGET_LIVE_WINDOW):N1(this.nativeEl)}set targetLiveWindow(e){e!=this.targetLiveWindow&&(e==null?this.removeAttribute(E.TARGET_LIVE_WINDOW):this.setAttribute(E.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e,i;if(this.hasAttribute(E.LIVE_EDGE_OFFSET)){let{liveEdgeOffset:a}=this,r=(e=this.nativeEl.seekable.end(0))!=null?e:0,s=(i=this.nativeEl.seekable.start(0))!=null?i:0;return Math.max(s,r-a)}return P1(this.nativeEl)}get liveEdgeOffset(){if(this.hasAttribute(E.LIVE_EDGE_OFFSET))return+this.getAttribute(E.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){e!=this.liveEdgeOffset&&(e==null?this.removeAttribute(E.LIVE_EDGE_OFFSET):this.setAttribute(E.LIVE_EDGE_OFFSET,`${+e}`))}get seekable(){return ih(this.nativeEl)}async addCuePoints(e){return Df(this.nativeEl,e)}get activeCuePoint(){return Mf(this.nativeEl)}get cuePoints(){return e1(this.nativeEl)}async addChapters(e){return xf(this.nativeEl,e)}get activeChapter(){return Nf(this.nativeEl)}get chapters(){return i1(this.nativeEl)}getStartDate(){return r1(this.nativeEl,this._hls)}get currentPdt(){return n1(this.nativeEl,this._hls)}get preferPlayback(){let e=this.getAttribute(E.PREFER_PLAYBACK);if(e===ni.MSE||e===ni.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===ni.MSE||e===ni.NATIVE?this.setAttribute(E.PREFER_PLAYBACK,e):this.removeAttribute(E.PREFER_PLAYBACK))}get metadata(){return{...this.getAttributeNames().filter(e=>e.startsWith("metadata-")&&![E.METADATA_URL].includes(e)).reduce((e,i)=>{let a=this.getAttribute(i);return a!=null&&(e[i.replace(/^metadata-/,"").replace(/-/g,"_")]=a),e},{}),...Ae(this,Cn)}}set metadata(e){Dt(this,Cn,e??{}),this.mux&&this.mux.emit("hb",Ae(this,Cn))}get _hlsConfig(){return Ae(this,Io)}set _hlsConfig(e){Dt(this,Io,e)}get logo(){var e;return(e=this.getAttribute(E.LOGO))!=null?e:Ae(this,Dn)}set logo(e){e?this.setAttribute(E.LOGO,e):this.removeAttribute(E.LOGO)}load(){Ff(this,this.nativeEl,Ae(this,ft,ma))}unload(){Kf(this.nativeEl,Ae(this,ft,ma),this)}attributeChangedCallback(e,i,a){var r,s;switch(to.observedAttributes.includes(e)&&!["src","autoplay","preload"].includes(e)&&super.attributeChangedCallback(e,i,a),e){case E.PLAYER_SOFTWARE_NAME:this.playerSoftwareName=a??void 0;break;case E.PLAYER_SOFTWARE_VERSION:this.playerSoftwareVersion=a??void 0;break;case"src":{let o=!!i,l=!!a;!o&&l?ao(this,ft,Mn).call(this):o&&!l?this.unload():o&&l&&(this.unload(),ao(this,ft,Mn).call(this));break}case"autoplay":if(a===i)break;(r=Ae(this,ft,ma))==null||r.setAutoplay(this.autoplay);break;case"preload":if(a===i)break;(s=Ae(this,ft,ma))==null||s.setPreload(a);break;case E.PLAYBACK_ID:case E.CUSTOM_DOMAIN:case E.MAX_RESOLUTION:case E.MIN_RESOLUTION:case E.RENDITION_ORDER:case E.PROGRAM_START_TIME:case E.PROGRAM_END_TIME:case E.ASSET_START_TIME:case E.ASSET_END_TIME:case E.PLAYBACK_TOKEN:this.src=bu(this);break;case E.DEBUG:{let o=this.debug;this.mux,this._hls&&(this._hls.config.debug=o);break}case E.METADATA_URL:a&&fetch(a).then(o=>o.json()).then(o=>this.metadata=o).catch(()=>{});break;case E.STREAM_TYPE:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("streamtypechange",{composed:!0,bubbles:!0}));break;case E.TARGET_LIVE_WINDOW:(a==null||a!==i)&&this.dispatchEvent(new CustomEvent("targetlivewindowchange",{composed:!0,bubbles:!0,detail:this.targetLiveWindow}));break;case E.LOGO:(a==null||a!==i)&&this.updateLogo();break;case E.DISABLE_TRACKING:{if(a==null||a!==i){let o=this.currentTime,l=this.paused;this.unload(),ao(this,ft,Mn).call(this).then(()=>{this.currentTime=o,l||this.play()})}break}case E.DISABLE_COOKIES:{(a==null||a!==i)&&this.disableCookies&&document.cookie.split(";").forEach(o=>{o.trim().startsWith("muxData")&&(document.cookie=o.replace(/^ +/,"").replace(/=.*/,"=;expires="+new Date().toUTCString()+";path=/"))});break}case E.CAP_RENDITION_TO_PLAYER_SIZE:(a==null||a!==i)&&(this.capRenditionToPlayerSize=a!=null?!0:void 0)}}updateLogo(){if(!this.shadowRoot)return;let e=this.shadowRoot.querySelector('slot[name="logo"]');if(!e)return;let i=this.constructor.getLogoHTML(Ae(this,Dn)||this.logo);e.innerHTML=i}connectedCallback(){var e,i;(e=super.connectedCallback)==null||e.call(this),(i=this.nativeEl)==null||i.addEventListener("muxmetadata",Ae(this,Do)),this.nativeEl&&this.src&&!Ae(this,ft,ma)&&ao(this,ft,Mn).call(this)}disconnectedCallback(){var e,i;(e=this.nativeEl)==null||e.removeEventListener("muxmetadata",Ae(this,Do)),this.unload(),(i=super.disconnectedCallback)==null||i.call(this)}handleEvent(e){e.target===this.nativeEl&&this.dispatchEvent(new CustomEvent(e.type,{composed:!0,detail:e.detail}))}},n(Dr,"G"),Dr);Ln=new WeakMap,So=new WeakMap,Cn=new WeakMap,wo=new WeakMap,Io=new WeakMap,Ro=new WeakMap,Lo=new WeakMap,Co=new WeakMap,Dn=new WeakMap,Do=new WeakMap,ft=new WeakSet,ma=n(function(){return $1(this.nativeEl)},"A"),Mo=new WeakMap,Mn=n(async function(){Ae(this,Ln)||(await Dt(this,Ln,Promise.resolve()),Dt(this,Ln,null),this.load())},"g$2");const ea=new WeakMap,Qh=class Qh extends Error{};n(Qh,"InvalidStateError");let es=Qh;const jh=class jh extends Error{};n(jh,"NotSupportedError");let Tu=jh;const iy=["application/x-mpegURL","application/vnd.apple.mpegurl","audio/mpegurl"],ay=globalThis.WeakRef?class extends Set{add(t){super.add(new WeakRef(t))}forEach(t){super.forEach(e=>{const i=e.deref();i&&t(i)})}}:Set;function ry(t){globalThis.chrome?.cast?.isAvailable?globalThis.cast?.framework?t():customElements.whenDefined("google-cast-button").then(t):globalThis.__onGCastApiAvailable=()=>{customElements.whenDefined("google-cast-button").then(t)}}n(ry,"onCastApiAvailable");function ny(){return globalThis.chrome}n(ny,"requiresCastFramework");function sy(){const t="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";if(globalThis.chrome?.cast||document.querySelector(`script[src="${t}"]`))return;const e=document.createElement("script");e.src=t,document.head.append(e)}n(sy,"loadCastFramework");function Zi(){return globalThis.cast?.framework?.CastContext.getInstance()}n(Zi,"castContext");function nh(){return Zi()?.getCurrentSession()}n(nh,"currentSession");function sh(){return nh()?.getSessionObj().media[0]}n(sh,"currentMedia");function oy(t){return new Promise((e,i)=>{sh().editTracksInfo(t,e,i)})}n(oy,"editTracksInfo");function ly(t){return new Promise((e,i)=>{sh().getStatus(t,e,i)})}n(ly,"getMediaStatus");function Bp(t){return Zi().setOptions({...jf(),...t})}n(Bp,"setCastOptions");function jf(){return{receiverApplicationId:"CC1AD845",autoJoinPolicy:"origin_scoped",androidReceiverCompatible:!1,language:"en-US",resumeSavedSession:!0}}n(jf,"getDefaultCastOptions");function Fp(t){if(!t)return;const e=/\.([a-zA-Z0-9]+)(?:\?.*)?$/,i=t.match(e);return i?i[1]:null}n(Fp,"getFormat");function dy(t){for(const e of t.split(`
`)){const i=e.trim();if(i.startsWith("#EXT-X-MEDIA")&&/TYPE=AUDIO/i.test(i)){const a=i.match(/URI="([^"]+)"/i);if(a)return a[1]}}}n(dy,"parseAudioRenditionUrl");function uy(t){const e=t.split(`
`),i=[];for(let a=0;a<e.length;a++)if(e[a].trim().startsWith("#EXT-X-STREAM-INF")){const s=e[a+1]?e[a+1].trim():"";s&&!s.startsWith("#")&&i.push(s)}return i}n(uy,"parsePlaylistUrls");function Kp(t){return t.split(`
`).find(a=>!a.trim().startsWith("#")&&a.trim()!=="")?.trim()}n(Kp,"parseSegment");async function cy(t){if(!t)return!1;if(/\.m3u8?(\?.*)?$/i.test(t))return!0;if(t.startsWith("blob:"))return!1;try{const i=(await fetch(t,{method:"HEAD"})).headers.get("Content-Type");return iy.some(a=>i===a)}catch{return!1}}n(cy,"isHls");async function hy(t){if(!t||t.startsWith("blob:"))return{videoFormat:void 0,audioFormat:void 0};try{const e=await(await fetch(t)).text();let i=e;const a=uy(e);if(a.length>0){const d=new URL(a[0],t).toString();i=await(await fetch(d)).text()}const r=Kp(i),s=Fp(r),o=dy(e);let l=s;if(o)try{const d=new URL(o,t).toString(),h=await(await fetch(d)).text(),p=Kp(h);l=Fp(p)??s}catch{}return{videoFormat:s,audioFormat:l}}catch{return{videoFormat:void 0,audioFormat:void 0}}}n(hy,"getPlaylistSegmentFormat");const Oo=new ay,vi=new WeakSet;let Le;ry(()=>{globalThis.chrome?.cast?.isAvailable&&(Le||(Le=cast.framework,Zi().addEventListener(Le.CastContextEventType.CAST_STATE_CHANGED,t=>{Oo.forEach(e=>ea.get(e).onCastStateChanged?.(t))}),Zi().addEventListener(Le.CastContextEventType.SESSION_STATE_CHANGED,t=>{Oo.forEach(e=>ea.get(e).onSessionStateChanged?.(t))}),Oo.forEach(t=>ea.get(t).init?.())))});let Vp=0;var Q,Mr,Qe,xt,Ra,La,ji,Ad,Zs,oe,pa,Zf,Xf,ku,Jf,Su,eE,wu;const Zh=class Zh extends EventTarget{constructor(i){super();Fe(this,oe);Fe(this,Q);Fe(this,Mr);Fe(this,Qe);Fe(this,xt);Fe(this,Ra,"disconnected");Fe(this,La,!1);Fe(this,ji,new Set);Fe(this,Ad,new WeakMap);Fe(this,Zs,n(()=>ht(this,oe,wu).call(this),"#onTextTrackChange"));Ze(this,Q,i),Oo.add(this),ea.set(this,{init:n(()=>ht(this,oe,Su).call(this),"init"),onCastStateChanged:n(()=>ht(this,oe,ku).call(this),"onCastStateChanged"),onSessionStateChanged:n(()=>ht(this,oe,Jf).call(this),"onSessionStateChanged"),getCastPlayer:n(()=>k(this,oe,pa),"getCastPlayer")}),ht(this,oe,Su).call(this)}destroy(){k(this,Q)?.textTracks?.removeEventListener("change",k(this,Zs)),k(this,xt)&&k(this,Qe)?.controller&&Object.entries(k(this,xt)).forEach(([i,a])=>{k(this,Qe).controller.removeEventListener(i,a)}),k(this,Q)&&vi.delete(k(this,Q)),Ze(this,Mr,!1)}get state(){return k(this,Ra)}async watchAvailability(i){if(k(this,Q).disableRemotePlayback)throw new es("disableRemotePlayback attribute is present.");return k(this,Ad).set(i,++Vp),k(this,ji).add(i),queueMicrotask(()=>i(ht(this,oe,Xf).call(this))),Vp}async cancelWatchAvailability(i){if(k(this,Q).disableRemotePlayback)throw new es("disableRemotePlayback attribute is present.");i?k(this,ji).delete(i):k(this,ji).clear()}async prompt(){if(k(this,Q).disableRemotePlayback)throw new es("disableRemotePlayback attribute is present.");if(!globalThis.chrome?.cast?.isAvailable)throw new Tu("The RemotePlayback API is disabled on this platform.");const i=vi.has(k(this,Q));vi.add(k(this,Q)),Bp(k(this,Q).castOptions),Object.entries(k(this,xt)).forEach(([a,r])=>{k(this,Qe).controller.addEventListener(a,r)});try{await Zi().requestSession()}catch(a){if(i||vi.delete(k(this,Q)),a==="cancel")return;throw new Error(a)}ea.get(k(this,Q))?.loadOnPrompt?.()}};Q=new WeakMap,Mr=new WeakMap,Qe=new WeakMap,xt=new WeakMap,Ra=new WeakMap,La=new WeakMap,ji=new WeakMap,Ad=new WeakMap,Zs=new WeakMap,oe=new WeakSet,pa=n(function(){if(vi.has(k(this,Q)))return k(this,Qe)},"#castPlayer"),Zf=n(function(){vi.has(k(this,Q))&&(Object.entries(k(this,xt)).forEach(([i,a])=>{k(this,Qe).controller.removeEventListener(i,a)}),vi.delete(k(this,Q)),k(this,Q).muted=k(this,Qe).isMuted,k(this,Q).currentTime=k(this,Qe).savedPlayerState.currentTime,k(this,Qe).savedPlayerState.isPaused===!1&&k(this,Q).play())},"#disconnect"),Xf=n(function(){const i=Zi()?.getCastState();return i&&i!=="NO_DEVICES_AVAILABLE"},"#hasDevicesAvailable"),ku=n(function(){const i=Zi().getCastState();if(vi.has(k(this,Q))&&i==="CONNECTING"&&(Ze(this,Ra,"connecting"),this.dispatchEvent(new Event("connecting"))),!k(this,La)&&i?.includes("CONNECT")){Ze(this,La,!0);for(let a of k(this,ji))a(!0)}else if(k(this,La)&&(!i||i==="NO_DEVICES_AVAILABLE")){Ze(this,La,!1);for(let a of k(this,ji))a(!1)}},"#onCastStateChanged"),Jf=n(async function(){const{SESSION_RESUMED:i}=Le.SessionState;if(Zi().getSessionState()===i&&k(this,Q).castSrc===sh()?.media.contentId){vi.add(k(this,Q)),Object.entries(k(this,xt)).forEach(([a,r])=>{k(this,Qe).controller.addEventListener(a,r)});try{await ly(new chrome.cast.media.GetStatusRequest)}catch{}k(this,xt)[Le.RemotePlayerEventType.IS_PAUSED_CHANGED](),k(this,xt)[Le.RemotePlayerEventType.PLAYER_STATE_CHANGED]()}},"#onSessionStateChanged"),Su=n(function(){!Le||k(this,Mr)||(Ze(this,Mr,!0),Bp(k(this,Q).castOptions),k(this,Q).textTracks.addEventListener("change",k(this,Zs)),ht(this,oe,ku).call(this),Ze(this,Qe,new Le.RemotePlayer),new Le.RemotePlayerController(k(this,Qe)),Ze(this,xt,{[Le.RemotePlayerEventType.IS_CONNECTED_CHANGED]:({value:i})=>{i===!0?(Ze(this,Ra,"connected"),this.dispatchEvent(new Event("connect"))):(ht(this,oe,Zf).call(this),Ze(this,Ra,"disconnected"),this.dispatchEvent(new Event("disconnect")))},[Le.RemotePlayerEventType.DURATION_CHANGED]:()=>{k(this,Q).dispatchEvent(new Event("durationchange"))},[Le.RemotePlayerEventType.VOLUME_LEVEL_CHANGED]:()=>{k(this,Q).dispatchEvent(new Event("volumechange"))},[Le.RemotePlayerEventType.IS_MUTED_CHANGED]:()=>{k(this,Q).dispatchEvent(new Event("volumechange"))},[Le.RemotePlayerEventType.CURRENT_TIME_CHANGED]:()=>{k(this,oe,pa)?.isMediaLoaded&&k(this,Q).dispatchEvent(new Event("timeupdate"))},[Le.RemotePlayerEventType.VIDEO_INFO_CHANGED]:()=>{k(this,Q).dispatchEvent(new Event("resize"))},[Le.RemotePlayerEventType.IS_PAUSED_CHANGED]:()=>{k(this,Q).dispatchEvent(new Event(this.paused?"pause":"play"))},[Le.RemotePlayerEventType.PLAYER_STATE_CHANGED]:()=>{k(this,oe,pa)?.playerState!==chrome.cast.media.PlayerState.PAUSED&&k(this,Q).dispatchEvent(new Event({[chrome.cast.media.PlayerState.PLAYING]:"playing",[chrome.cast.media.PlayerState.BUFFERING]:"waiting",[chrome.cast.media.PlayerState.IDLE]:"emptied"}[k(this,oe,pa)?.playerState]))},[Le.RemotePlayerEventType.IS_MEDIA_LOADED_CHANGED]:async()=>{k(this,oe,pa)?.isMediaLoaded&&(await Promise.resolve(),ht(this,oe,eE).call(this))}}))},"#init"),eE=n(function(){ht(this,oe,wu).call(this)},"#onRemoteMediaLoaded"),wu=n(async function(){if(!k(this,oe,pa))return;const a=(k(this,Qe).mediaInfo?.tracks??[]).filter(({type:c})=>c===chrome.cast.media.TrackType.TEXT),r=[...k(this,Q).textTracks].filter(({kind:c})=>c==="subtitles"||c==="captions"),s=a.map(({language:c,name:u,trackId:f})=>{const{mode:_}=r.find(b=>b.language===c&&b.label===u)??{};return _?{mode:_,trackId:f}:!1}).filter(Boolean),l=s.filter(({mode:c})=>c!=="showing").map(({trackId:c})=>c),d=s.find(({mode:c})=>c==="showing"),h=nh()?.getSessionObj().media[0]?.activeTrackIds??[];let p=h;if(h.length&&(p=p.filter(c=>!l.includes(c))),d?.trackId&&(p=[...p,d.trackId]),p=[...new Set(p)],!n((c,u)=>c.length===u.length&&c.every(f=>u.includes(f)),"arrayEquals")(h,p))try{const c=new chrome.cast.media.EditTracksInfoRequest(p);await oy(c)}catch{}},"#updateRemoteTextTrack"),n(Zh,"RemotePlayback");let Au=Zh;const my=n(t=>{var e,i,a,r,s,o,Z,tE;return e=class extends t{constructor(){super(...arguments);Fe(this,o);Fe(this,i,{paused:!1});Fe(this,a,jf());Fe(this,r);Fe(this,s)}get remote(){return k(this,s)?k(this,s):ny()?this.isConnected?(this.disableRemotePlayback||sy(),ea.set(this,{loadOnPrompt:n(()=>ht(this,o,tE).call(this),"loadOnPrompt")}),Ze(this,s,new Au(this))):void 0:super.remote}disconnectedCallback(){k(this,s)?.destroy(),Ze(this,s,null),ea.delete(this),super.disconnectedCallback?.()}attributeChangedCallback(v,c,u){if(super.attributeChangedCallback(v,c,u),v==="cast-receiver"&&u){k(this,a).receiverApplicationId=u;return}if(k(this,o,Z))switch(v){case"cast-stream-type":case"cast-src":this.load();break}}async load(){if(!k(this,o,Z))return super.load();const v=new chrome.cast.media.MediaInfo(this.castSrc,this.castContentType);v.customData=this.castCustomData;const c=[...this.querySelectorAll("track")].filter(({kind:T,src:A})=>A&&(T==="subtitles"||T==="captions")),u=[];let f=0;if(c.length&&(v.tracks=c.map(T=>{const A=++f;u.length===0&&T.track.mode==="showing"&&u.push(A);const g=new chrome.cast.media.Track(A,chrome.cast.media.TrackType.TEXT);return g.trackContentId=T.src,g.trackContentType="text/vtt",g.subtype=T.kind==="captions"?chrome.cast.media.TextTrackType.CAPTIONS:chrome.cast.media.TextTrackType.SUBTITLES,g.name=T.label,g.language=T.srclang,g})),this.castStreamType==="live"?v.streamType=chrome.cast.media.StreamType.LIVE:v.streamType=chrome.cast.media.StreamType.BUFFERED,v.metadata=new chrome.cast.media.GenericMediaMetadata,v.metadata.title=this.title,v.metadata.images=[{url:this.poster}],await cy(this.castSrc)){v.contentType||(v.contentType="application/x-mpegURL");const{videoFormat:T,audioFormat:A}=await hy(this.castSrc);T?.includes("m4s")||T?.includes("mp4")||T?.includes("m4a")?(v.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.FMP4,v.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.FMP4):A?.includes("aac")?(v.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.AAC,v.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.MPEG2_TS):(T?.includes("ts")||A?.includes("ts"))&&(v.hlsSegmentFormat=chrome.cast.media.HlsSegmentFormat.TS,v.hlsVideoSegmentFormat=chrome.cast.media.HlsVideoSegmentFormat.MPEG2_TS)}const b=new chrome.cast.media.LoadRequest(v);b.currentTime=super.currentTime??0,b.autoplay=!k(this,i).paused,b.activeTrackIds=u,await nh()?.loadMedia(b),this.dispatchEvent(new Event("volumechange"))}play(){if(k(this,o,Z)){k(this,o,Z).isPaused&&k(this,o,Z).controller?.playOrPause();return}return super.play()}pause(){if(k(this,o,Z)){k(this,o,Z).isPaused||k(this,o,Z).controller?.playOrPause();return}super.pause()}get castOptions(){return k(this,a)}get castReceiver(){return this.getAttribute("cast-receiver")??void 0}set castReceiver(v){this.castReceiver!=v&&this.setAttribute("cast-receiver",`${v}`)}get castSrc(){const v=this.currentSrc,c=v?.startsWith("blob:")?void 0:v;return this.getAttribute("cast-src")??this.querySelector("source")?.src??c??this.getAttribute("src")??void 0}set castSrc(v){this.castSrc!=v&&this.setAttribute("cast-src",`${v}`)}get castContentType(){return this.getAttribute("cast-content-type")??void 0}set castContentType(v){this.setAttribute("cast-content-type",`${v}`)}get castStreamType(){return this.getAttribute("cast-stream-type")??this.streamType??void 0}set castStreamType(v){this.setAttribute("cast-stream-type",`${v}`)}get castCustomData(){return k(this,r)}set castCustomData(v){const c=typeof v;["object","undefined"].includes(c)&&Ze(this,r,v)}get readyState(){if(k(this,o,Z))switch(k(this,o,Z).playerState){case chrome.cast.media.PlayerState.IDLE:return 0;case chrome.cast.media.PlayerState.BUFFERING:return 2;default:return 3}return super.readyState}get paused(){return k(this,o,Z)?k(this,o,Z).isPaused:super.paused}get muted(){return k(this,o,Z)?k(this,o,Z)?.isMuted:super.muted}set muted(v){if(k(this,o,Z)){(v&&!k(this,o,Z).isMuted||!v&&k(this,o,Z).isMuted)&&k(this,o,Z).controller?.muteOrUnmute();return}super.muted=v}get volume(){return k(this,o,Z)?k(this,o,Z)?.volumeLevel??1:super.volume}set volume(v){if(k(this,o,Z)){k(this,o,Z).volumeLevel=+v,k(this,o,Z).controller?.setVolumeLevel();return}super.volume=v}get duration(){return k(this,o,Z)&&k(this,o,Z)?.isMediaLoaded?k(this,o,Z)?.duration??NaN:super.duration}get currentTime(){return k(this,o,Z)&&k(this,o,Z)?.isMediaLoaded?k(this,o,Z)?.currentTime??0:super.currentTime}set currentTime(v){if(k(this,o,Z)){k(this,o,Z).currentTime=v,k(this,o,Z).controller?.seek();return}super.currentTime=v}},i=new WeakMap,a=new WeakMap,r=new WeakMap,s=new WeakMap,o=new WeakSet,Z=n(function(){return ea.get(k(this,s))?.getCastPlayer?.()},"#castPlayer"),tE=n(async function(){k(this,i).paused=eo(e.prototype,this,"paused"),eo(e.prototype,this,"pause").call(this),this.muted=eo(e.prototype,this,"muted");try{await this.load()}catch{}},"#loadOnPrompt"),n(e,"CastableMedia"),gp(e,"observedAttributes",[...t.observedAttributes??[],"cast-src","cast-content-type","cast-stream-type","cast-receiver"]),e},"CastableMediaMixin");var iE=n(t=>{throw TypeError(t)},"f$2"),aE=n((t,e,i)=>e.has(t)||iE("Cannot "+i),"g$1"),py=n((t,e,i)=>(aE(t,e,"read from private field"),i?i.call(t):e.get(t)),"u$1"),vy=n((t,e,i)=>e.has(t)?iE("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"m$1"),fy=n((t,e,i,a)=>(aE(t,e,"write to private field"),e.set(t,i),i),"d"),Or,rE=(Or=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}},n(Or,"s"),Or);if(typeof DocumentFragment>"u"){const e=class e extends rE{};n(e,"e");let t=e;globalThis.DocumentFragment=t}var xr,Ey=(xr=class extends rE{},n(xr,"n"),xr),_y={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(Ey)}},by={customElements:_y},gy=typeof window>"u"||typeof globalThis.customElements>"u",Gd=gy?by:globalThis,xo,Nr,qp=(Nr=class extends my(db(ty)){constructor(){super(...arguments),vy(this,xo)}get autoplay(){let e=this.getAttribute("autoplay");return e===null?!1:e===""?!0:e}set autoplay(e){let i=this.autoplay;e!==i&&(e?this.setAttribute("autoplay",typeof e=="string"?e:""):this.removeAttribute("autoplay"))}get muxCastCustomData(){return{mux:{playbackId:this.playbackId,minResolution:this.minResolution,maxResolution:this.maxResolution,renditionOrder:this.renditionOrder,customDomain:this.customDomain,tokens:{drm:this.drmToken},envKey:this.envKey,metadata:this.metadata,disableCookies:this.disableCookies,disableTracking:this.disableTracking,beaconCollectionDomain:this.beaconCollectionDomain,startTime:this.startTime,preferCmcd:this.preferCmcd}}}get castCustomData(){var e;return(e=py(this,xo))!=null?e:this.muxCastCustomData}set castCustomData(e){fy(this,xo,e)}},n(Nr,"i"),Nr);xo=new WeakMap;Gd.customElements.get("mux-video")||(Gd.customElements.define("mux-video",qp),Gd.MuxVideoElement=qp);const D={MEDIA_PLAY_REQUEST:"mediaplayrequest",MEDIA_PAUSE_REQUEST:"mediapauserequest",MEDIA_MUTE_REQUEST:"mediamuterequest",MEDIA_UNMUTE_REQUEST:"mediaunmuterequest",MEDIA_LOOP_REQUEST:"medialooprequest",MEDIA_VOLUME_REQUEST:"mediavolumerequest",MEDIA_SEEK_REQUEST:"mediaseekrequest",MEDIA_AIRPLAY_REQUEST:"mediaairplayrequest",MEDIA_ENTER_FULLSCREEN_REQUEST:"mediaenterfullscreenrequest",MEDIA_EXIT_FULLSCREEN_REQUEST:"mediaexitfullscreenrequest",MEDIA_PREVIEW_REQUEST:"mediapreviewrequest",MEDIA_ENTER_PIP_REQUEST:"mediaenterpiprequest",MEDIA_EXIT_PIP_REQUEST:"mediaexitpiprequest",MEDIA_ENTER_CAST_REQUEST:"mediaentercastrequest",MEDIA_EXIT_CAST_REQUEST:"mediaexitcastrequest",MEDIA_SHOW_TEXT_TRACKS_REQUEST:"mediashowtexttracksrequest",MEDIA_HIDE_TEXT_TRACKS_REQUEST:"mediahidetexttracksrequest",MEDIA_SHOW_SUBTITLES_REQUEST:"mediashowsubtitlesrequest",MEDIA_DISABLE_SUBTITLES_REQUEST:"mediadisablesubtitlesrequest",MEDIA_TOGGLE_SUBTITLES_REQUEST:"mediatogglesubtitlesrequest",MEDIA_PLAYBACK_RATE_REQUEST:"mediaplaybackraterequest",MEDIA_RENDITION_REQUEST:"mediarenditionrequest",MEDIA_AUDIO_TRACK_REQUEST:"mediaaudiotrackrequest",MEDIA_SEEK_TO_LIVE_REQUEST:"mediaseektoliverequest",REGISTER_MEDIA_STATE_RECEIVER:"registermediastatereceiver",UNREGISTER_MEDIA_STATE_RECEIVER:"unregistermediastatereceiver"},J={MEDIA_CHROME_ATTRIBUTES:"mediachromeattributes",MEDIA_CONTROLLER:"mediacontroller"},nE={MEDIA_AIRPLAY_UNAVAILABLE:"mediaAirplayUnavailable",MEDIA_AUDIO_TRACK_ENABLED:"mediaAudioTrackEnabled",MEDIA_AUDIO_TRACK_LIST:"mediaAudioTrackList",MEDIA_AUDIO_TRACK_UNAVAILABLE:"mediaAudioTrackUnavailable",MEDIA_BUFFERED:"mediaBuffered",MEDIA_CAST_UNAVAILABLE:"mediaCastUnavailable",MEDIA_CHAPTERS_CUES:"mediaChaptersCues",MEDIA_CURRENT_TIME:"mediaCurrentTime",MEDIA_DURATION:"mediaDuration",MEDIA_ENDED:"mediaEnded",MEDIA_ERROR:"mediaError",MEDIA_ERROR_CODE:"mediaErrorCode",MEDIA_ERROR_MESSAGE:"mediaErrorMessage",MEDIA_FULLSCREEN_UNAVAILABLE:"mediaFullscreenUnavailable",MEDIA_HAS_PLAYED:"mediaHasPlayed",MEDIA_HEIGHT:"mediaHeight",MEDIA_IS_AIRPLAYING:"mediaIsAirplaying",MEDIA_IS_CASTING:"mediaIsCasting",MEDIA_IS_FULLSCREEN:"mediaIsFullscreen",MEDIA_IS_PIP:"mediaIsPip",MEDIA_LOADING:"mediaLoading",MEDIA_MUTED:"mediaMuted",MEDIA_LOOP:"mediaLoop",MEDIA_PAUSED:"mediaPaused",MEDIA_PIP_UNAVAILABLE:"mediaPipUnavailable",MEDIA_PLAYBACK_RATE:"mediaPlaybackRate",MEDIA_PREVIEW_CHAPTER:"mediaPreviewChapter",MEDIA_PREVIEW_COORDS:"mediaPreviewCoords",MEDIA_PREVIEW_IMAGE:"mediaPreviewImage",MEDIA_PREVIEW_TIME:"mediaPreviewTime",MEDIA_RENDITION_LIST:"mediaRenditionList",MEDIA_RENDITION_SELECTED:"mediaRenditionSelected",MEDIA_RENDITION_UNAVAILABLE:"mediaRenditionUnavailable",MEDIA_SEEKABLE:"mediaSeekable",MEDIA_STREAM_TYPE:"mediaStreamType",MEDIA_SUBTITLES_LIST:"mediaSubtitlesList",MEDIA_SUBTITLES_SHOWING:"mediaSubtitlesShowing",MEDIA_TARGET_LIVE_WINDOW:"mediaTargetLiveWindow",MEDIA_TIME_IS_LIVE:"mediaTimeIsLive",MEDIA_VOLUME:"mediaVolume",MEDIA_VOLUME_LEVEL:"mediaVolumeLevel",MEDIA_VOLUME_UNAVAILABLE:"mediaVolumeUnavailable",MEDIA_LANG:"mediaLang",MEDIA_WIDTH:"mediaWidth"},sE=Object.entries(nE),m=sE.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{}),yy={USER_INACTIVE_CHANGE:"userinactivechange",BREAKPOINTS_CHANGE:"breakpointchange",BREAKPOINTS_COMPUTED:"breakpointscomputed"},ui=sE.reduce((t,[e,i])=>(t[e]=i.toLowerCase(),t),{...yy});Object.entries(ui).reduce((t,[e,i])=>{const a=m[e];return a&&(t[i]=a),t},{userinactivechange:"userinactive"});const Ty=Object.entries(m).reduce((t,[e,i])=>{const a=ui[e];return a&&(t[i]=a),t},{userinactive:"userinactivechange"}),li={SUBTITLES:"subtitles",CAPTIONS:"captions",CHAPTERS:"chapters",METADATA:"metadata"},Tr={DISABLED:"disabled",SHOWING:"showing"},zd={MOUSE:"mouse",PEN:"pen",TOUCH:"touch"},ot={UNAVAILABLE:"unavailable",UNSUPPORTED:"unsupported"},Ai={LIVE:"live",ON_DEMAND:"on-demand",UNKNOWN:"unknown"},Ay={FULLSCREEN:"fullscreen"};function ky(t){return t?.map(wy).join(" ")}n(ky,"stringifyRenditionList");function Sy(t){return t?.split(/\s+/).map(Iy)}n(Sy,"parseRenditionList");function wy(t){if(t){const{id:e,width:i,height:a}=t;return[e,i,a].filter(r=>r!=null).join(":")}}n(wy,"stringifyRendition");function Iy(t){if(t){const[e,i,a]=t.split(":");return{id:e,width:+i,height:+a}}}n(Iy,"parseRendition");function Ry(t){return t?.map(Cy).join(" ")}n(Ry,"stringifyAudioTrackList");function Ly(t){return t?.split(/\s+/).map(Dy)}n(Ly,"parseAudioTrackList");function Cy(t){if(t){const{id:e,kind:i,language:a,label:r}=t;return[e,i,a,r].filter(s=>s!=null).join(":")}}n(Cy,"stringifyAudioTrack");function Dy(t){if(t){const[e,i,a,r]=t.split(":");return{id:e,kind:i,language:a,label:r}}}n(Dy,"parseAudioTrack");function My(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}n(My,"camelCase");function oh(t){return typeof t=="number"&&!Number.isNaN(t)&&Number.isFinite(t)}n(oh,"isValidNumber");function oE(t){return typeof t!="string"?!1:!isNaN(t)&&!isNaN(parseFloat(t))}n(oE,"isNumericString");const lE=n(t=>new Promise(e=>setTimeout(e,t)),"delay"),Oy={"Start airplay":"Start airplay","Stop airplay":"Stop airplay",Audio:"Audio",Captions:"Captions","Enable captions":"Enable captions","Disable captions":"Disable captions","Start casting":"Start casting","Stop casting":"Stop casting","Enter fullscreen mode":"Enter fullscreen mode","Exit fullscreen mode":"Exit fullscreen mode",Mute:"Mute",Unmute:"Unmute",Loop:"Loop","Enter picture in picture mode":"Enter picture in picture mode","Exit picture in picture mode":"Exit picture in picture mode",Play:"Play",Pause:"Pause","Playback rate":"Playback rate","Playback rate {playbackRate}":"Playback rate {playbackRate}",Quality:"Quality","Seek backward":"Seek backward","Seek forward":"Seek forward",Settings:"Settings",Auto:"Auto","audio player":"audio player","video player":"video player",volume:"volume",seek:"seek","closed captions":"closed captions","current playback rate":"current playback rate","playback time":"playback time","media loading":"media loading",settings:"settings","audio tracks":"audio tracks",quality:"quality",play:"play",pause:"pause",mute:"mute",unmute:"unmute","chapter: {chapterName}":"chapter: {chapterName}",live:"live",Off:"Off","start airplay":"start airplay","stop airplay":"stop airplay","start casting":"start casting","stop casting":"stop casting","enter fullscreen mode":"enter fullscreen mode","exit fullscreen mode":"exit fullscreen mode","enter picture in picture mode":"enter picture in picture mode","exit picture in picture mode":"exit picture in picture mode","seek to live":"seek to live","playing live":"playing live","seek back {seekOffset} seconds":"seek back {seekOffset} seconds","seek forward {seekOffset} seconds":"seek forward {seekOffset} seconds","Network Error":"Network Error","Decode Error":"Decode Error","Source Not Supported":"Source Not Supported","Encryption Error":"Encryption Error","A network error caused the media download to fail.":"A network error caused the media download to fail.","A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.":"A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format.","An unsupported error occurred. The server or network failed, or your browser does not support this format.":"An unsupported error occurred. The server or network failed, or your browser does not support this format.","The media is encrypted and there are no keys to decrypt it.":"The media is encrypted and there are no keys to decrypt it.",hour:"hour",hours:"hours",minute:"minute",minutes:"minutes",second:"second",seconds:"seconds","{time} remaining":"{time} remaining","{currentTime} of {totalTime}":"{currentTime} of {totalTime}","video not loaded, unknown time.":"video not loaded, unknown time."};var Yp;const Qd={en:Oy};let Iu=((Yp=globalThis.navigator)==null?void 0:Yp.language)||"en";const xy=n(t=>{Iu=t},"setLanguage"),Ny=n(t=>{var e,i,a;const[r]=Iu.split("-");return((e=Qd[Iu])==null?void 0:e[t])||((i=Qd[r])==null?void 0:i[t])||((a=Qd.en)==null?void 0:a[t])||t},"resolveTranslation"),C=n((t,e={})=>Ny(t).replace(/\{(\w+)\}/g,(i,a)=>a in e?String(e[a]):`{${a}}`),"t"),Gp=[{singular:"hour",plural:"hours"},{singular:"minute",plural:"minutes"},{singular:"second",plural:"seconds"}],Py=n((t,e)=>{const i=C(t===1?Gp[e].singular:Gp[e].plural);return`${t} ${i}`},"toTimeUnitPhrase"),ts=n(t=>{if(!oh(t))return"";const e=Math.abs(t),i=e!==t,a=new Date(0,0,0,0,0,e,0),s=[a.getHours(),a.getMinutes(),a.getSeconds()].map((o,l)=>o&&Py(o,l)).filter(o=>o).join(", ");return i?C("{time} remaining",{time:s}):s},"formatAsTimePhrase");function ta(t,e){let i=!1;t<0&&(i=!0,t=0-t),t=t<0?0:t;let a=Math.floor(t%60),r=Math.floor(t/60%60),s=Math.floor(t/3600);const o=Math.floor(e/60%60),l=Math.floor(e/3600);return(isNaN(t)||t===1/0)&&(s=r=a="0"),s=s>0||l>0?s+":":"",r=((s||o>=10)&&r<10?"0"+r:r)+":",a=a<10?"0"+a:a,(i?"-":"")+s+r+a}n(ta,"formatTime");var Pr;let dE=(Pr=class{addEventListener(){}removeEventListener(){}dispatchEvent(){return!0}},n(Pr,"EventTarget"),Pr);const Xh=class Xh extends dE{};n(Xh,"Node");let $l=Xh;var $r;let zp=($r=class extends $l{constructor(){super(...arguments),this.role=null}},n($r,"Element"),$r);const Jh=class Jh{observe(){}unobserve(){}disconnect(){}};n(Jh,"ResizeObserver");let Ru=Jh;const uE={createElement:n(function(){return new fs.HTMLElement},"createElement"),createElementNS:n(function(){return new fs.HTMLElement},"createElementNS"),addEventListener(){},removeEventListener(){},dispatchEvent(t){return!1}};var Ur,Hr,Wr;const fs={ResizeObserver:Ru,document:uE,Node:$l,Element:zp,HTMLElement:(Ur=class extends zp{constructor(){super(...arguments),this.innerHTML=""}get content(){return new fs.DocumentFragment}},n(Ur,"HTMLElement"),Ur),DocumentFragment:(Hr=class extends dE{},n(Hr,"DocumentFragment"),Hr),customElements:{get:n(function(){},"get"),define:n(function(){},"define"),whenDefined:n(function(){},"whenDefined")},localStorage:{getItem(t){return null},setItem(t,e){},removeItem(t){}},CustomEvent:n(function(){},"CustomEvent"),getComputedStyle:n(function(){},"getComputedStyle"),navigator:{languages:[],get userAgent(){return""}},matchMedia(t){return{matches:!1,media:t}},DOMParser:(Wr=class{parseFromString(e,i){return{body:{textContent:e}}}},n(Wr,"DOMParser"),Wr)},cE="global"in globalThis&&globalThis?.global===globalThis||typeof window>"u"||typeof window.customElements>"u",hE=Object.keys(fs).every(t=>t in globalThis),y=cE&&!hE?fs:globalThis,we=cE&&!hE?uE:globalThis.document,Qp=new WeakMap,lh=n(t=>{let e=Qp.get(t);return e||Qp.set(t,e=new Set),e},"getCallbacks"),mE=new y.ResizeObserver(t=>{for(const e of t)for(const i of lh(e.target))i(e)});function Jr(t,e){lh(t).add(e),mE.observe(t)}n(Jr,"observeResize");function en(t,e){const i=lh(t);i.delete(e),i.size||mE.unobserve(t)}n(en,"unobserveResize");function ct(t){const e={};for(const i of t)e[i.name]=i.value;return e}n(ct,"namedNodeMapToObject");function et(t){var e;return(e=Lu(t))!=null?e:pn(t,"media-controller")}n(et,"getMediaController");function Lu(t){var e;const{MEDIA_CONTROLLER:i}=J,a=t.getAttribute(i);if(a)return(e=Rd(t))==null?void 0:e.getElementById(a)}n(Lu,"getAttributeMediaController");const pE=n((t,e,i=".value")=>{const a=t.querySelector(i);a&&(a.textContent=e)},"updateIconText"),$y=n((t,e)=>{const i=`slot[name="${e}"]`,a=t.shadowRoot.querySelector(i);return a?a.children:[]},"getAllSlotted"),vE=n((t,e)=>$y(t,e)[0],"getSlotted"),Mi=n((t,e)=>!t||!e?!1:t?.contains(e)?!0:Mi(t,e.getRootNode().host),"containsComposedNode"),pn=n((t,e)=>{if(!t)return null;const i=t.closest(e);return i||pn(t.getRootNode().host,e)},"closestComposedNode");function dh(t=document){var e;const i=t?.activeElement;return i?(e=dh(i.shadowRoot))!=null?e:i:null}n(dh,"getActiveElement");function Rd(t){var e;const i=(e=t?.getRootNode)==null?void 0:e.call(t);return i instanceof ShadowRoot||i instanceof Document?i:null}n(Rd,"getDocumentOrShadowRoot");function fE(t,{depth:e=3,checkOpacity:i=!0,checkVisibilityCSS:a=!0}={}){if(t.checkVisibility)return t.checkVisibility({checkOpacity:i,checkVisibilityCSS:a});let r=t;for(;r&&e>0;){const s=getComputedStyle(r);if(i&&s.opacity==="0"||a&&s.visibility==="hidden"||s.display==="none")return!1;r=r.parentElement,e--}return!0}n(fE,"isElementVisible");function Uy(t,e,i,a){const r=a.x-i.x,s=a.y-i.y,o=r*r+s*s;if(o===0)return 0;const l=((t-i.x)*r+(e-i.y)*s)/o;return Math.max(0,Math.min(1,l))}n(Uy,"getPointProgressOnLine");function Ce(t,e){const i=Hy(t,a=>a===e);return i||uh(t,e)}n(Ce,"getOrInsertCSSRule");function Hy(t,e){var i,a;let r;for(r of(i=t.querySelectorAll("style:not([media])"))!=null?i:[]){let s;try{s=(a=r.sheet)==null?void 0:a.cssRules}catch{continue}for(const o of s??[])if(e(o.selectorText))return o}}n(Hy,"getCSSRule");function uh(t,e){var i,a;const r=(i=t.querySelectorAll("style:not([media])"))!=null?i:[],s=r?.[r.length-1];if(!s?.sheet)return{style:{setProperty:n(()=>{},"setProperty"),removeProperty:n(()=>"","removeProperty"),getPropertyValue:n(()=>"","getPropertyValue")}};const o=s?.sheet.insertRule(`${e}{}`,s.sheet.cssRules.length);return(a=s.sheet.cssRules)==null?void 0:a[o]}n(uh,"insertCSSRule");function se(t,e,i=Number.NaN){const a=t.getAttribute(e);return a!=null?+a:i}n(se,"getNumericAttr");function fe(t,e,i){const a=+i;if(i==null||Number.isNaN(a)){t.hasAttribute(e)&&t.removeAttribute(e);return}se(t,e,void 0)!==a&&t.setAttribute(e,`${a}`)}n(fe,"setNumericAttr");function G(t,e){return t.hasAttribute(e)}n(G,"getBooleanAttr");function z(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}G(t,e)!=i&&t.toggleAttribute(e,i)}n(z,"setBooleanAttr");function he(t,e,i=null){var a;return(a=t.getAttribute(e))!=null?a:i}n(he,"getStringAttr");function le(t,e,i){if(i==null){t.hasAttribute(e)&&t.removeAttribute(e);return}const a=`${i}`;he(t,e,void 0)!==a&&t.setAttribute(e,a)}n(le,"setStringAttr");var EE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$u"),St=n((t,e,i)=>(EE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$u"),Wy=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$u"),ro=n((t,e,i,a)=>(EE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$q"),Ue;function By(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-gesture-receiver-display, inline-block));
        box-sizing: border-box;
      }
    </style>
  `}n(By,"getTemplateHTML$h");const em=class em extends y.HTMLElement{constructor(){if(super(),Wy(this,Ue,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[J.MEDIA_CONTROLLER,m.MEDIA_PAUSED]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===J.MEDIA_CONTROLLER&&(i&&((s=(r=St(this,Ue))==null?void 0:r.unassociateElement)==null||s.call(r,this),ro(this,Ue,null)),a&&this.isConnected&&(ro(this,Ue,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=St(this,Ue))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i;this.tabIndex=-1,this.setAttribute("aria-hidden","true"),ro(this,Ue,Fy(this)),this.getAttribute(J.MEDIA_CONTROLLER)&&((i=(e=St(this,Ue))==null?void 0:e.associateElement)==null||i.call(e,this)),St(this,Ue)&&(St(this,Ue).addEventListener("pointerdown",this),St(this,Ue).addEventListener("click",this),St(this,Ue).hasAttribute("tabindex")||(St(this,Ue).tabIndex=0))}disconnectedCallback(){var e,i,a,r;this.getAttribute(J.MEDIA_CONTROLLER)&&((i=(e=St(this,Ue))==null?void 0:e.unassociateElement)==null||i.call(e,this)),(a=St(this,Ue))==null||a.removeEventListener("pointerdown",this),(r=St(this,Ue))==null||r.removeEventListener("click",this),ro(this,Ue,null)}handleEvent(e){var i;const a=(i=e.composedPath())==null?void 0:i[0];if(["video","media-controller"].includes(a?.localName)){if(e.type==="pointerdown")this._pointerType=e.pointerType;else if(e.type==="click"){const{clientX:s,clientY:o}=e,{left:l,top:d,width:h,height:p}=this.getBoundingClientRect(),v=s-l,c=o-d;if(v<0||c<0||v>h||c>p||h===0&&p===0)return;const u=this._pointerType||"mouse";if(this._pointerType=void 0,u===zd.TOUCH){this.handleTap(e);return}else if(u===zd.MOUSE||u===zd.PEN){this.handleMouseClick(e);return}}}}get mediaPaused(){return G(this,m.MEDIA_PAUSED)}set mediaPaused(e){z(this,m.MEDIA_PAUSED,e)}handleTap(e){}handleMouseClick(e){const i=this.mediaPaused?D.MEDIA_PLAY_REQUEST:D.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new y.CustomEvent(i,{composed:!0,bubbles:!0}))}};n(em,"MediaGestureReceiver");let tn=em;Ue=new WeakMap;tn.shadowRootOptions={mode:"open"};tn.getTemplateHTML=By;function Fy(t){var e;const i=t.getAttribute(J.MEDIA_CONTROLLER);return i?(e=t.getRootNode())==null?void 0:e.getElementById(i):pn(t,"media-controller")}n(Fy,"getMediaControllerEl");y.customElements.get("media-gesture-receiver")||y.customElements.define("media-gesture-receiver",tn);var jp=tn,ch=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$t"),Ee=n((t,e,i)=>(ch(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$t"),ze=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$t"),Rt=n((t,e,i,a)=>(ch(t,e,"write to private field"),e.set(t,i),i),"__privateSet$p"),$t=n((t,e,i)=>(ch(t,e,"access private method"),i),"__privateMethod$e"),On,Ul,Ga,an,fr,Cu,za,No,Du,_E,Mu,bE,Es,Ld,Cd,hh,rn,_s,Pi,Po;const $={AUDIO:"audio",AUTOHIDE:"autohide",BREAKPOINTS:"breakpoints",GESTURES_DISABLED:"gesturesdisabled",KEYBOARD_CONTROL:"keyboardcontrol",NO_AUTOHIDE:"noautohide",USER_INACTIVE:"userinactive",AUTOHIDE_OVER_CONTROLS:"autohideovercontrols"};function Ky(t){return`
    <style>
      
      :host([${m.MEDIA_IS_FULLSCREEN}]) ::slotted([slot=media]) {
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

      :host(:not([${$.AUDIO}])) [part~=layer]:not([part~=media-layer]) {
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

      
      :host([${$.AUDIO}]) slot[name=media] {
        display: var(--media-slot-display, none);
      }

      
      :host([${$.AUDIO}]) [part~=layer][part~=gesture-layer] {
        height: 0;
        display: block;
      }

      
      :host(:not([${$.AUDIO}])[${$.GESTURES_DISABLED}]) ::slotted([slot=gestures-chrome]),
          :host(:not([${$.AUDIO}])[${$.GESTURES_DISABLED}]) media-gesture-receiver[slot=gestures-chrome] {
        display: none;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not(media-loading-indicator):not([role=dialog]):not([hidden])) {
        pointer-events: auto;
      }

      :host(:not([${$.AUDIO}])) *[part~=layer][part~=centered-layer] {
        align-items: center;
        justify-content: center;
      }

      :host(:not([${$.AUDIO}])) ::slotted(media-gesture-receiver[slot=gestures-chrome]),
      :host(:not([${$.AUDIO}])) media-gesture-receiver[slot=gestures-chrome] {
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

      
      :host(:not([${$.AUDIO}])) .spacer {
        flex-grow: 1;
      }

      
      :host(:-webkit-full-screen) {
        
        width: 100% !important;
        height: 100% !important;
      }

      
      ::slotted(:not([slot=media]):not([slot=poster]):not([${$.NO_AUTOHIDE}]):not([hidden]):not([role=dialog])) {
        opacity: 1;
        transition: var(--media-control-transition-in, opacity 0.25s);
      }

      
      :host([${$.USER_INACTIVE}]:not([${m.MEDIA_PAUSED}]):not([${m.MEDIA_IS_AIRPLAYING}]):not([${m.MEDIA_IS_CASTING}]):not([${$.AUDIO}])) ::slotted(:not([slot=media]):not([slot=poster]):not([${$.NO_AUTOHIDE}]):not([role=dialog])) {
        opacity: 0;
        transition: var(--media-control-transition-out, opacity 1s);
      }

      :host([${$.USER_INACTIVE}]:not([${$.NO_AUTOHIDE}]):not([${m.MEDIA_PAUSED}]):not([${m.MEDIA_IS_CASTING}]):not([${$.AUDIO}])) ::slotted([slot=media]) {
        cursor: none;
      }

      :host([${$.USER_INACTIVE}][${$.AUTOHIDE_OVER_CONTROLS}]:not([${$.NO_AUTOHIDE}]):not([${m.MEDIA_PAUSED}]):not([${m.MEDIA_IS_CASTING}]):not([${$.AUDIO}])) * {
        --media-cursor: none;
        cursor: none;
      }


      ::slotted(media-control-bar)  {
        align-self: stretch;
      }

      
      :host(:not([${$.AUDIO}])[${m.MEDIA_HAS_PLAYED}]) slot[name=poster] {
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
        <template shadowrootmode="${jp.shadowRootOptions.mode}">
          ${jp.getTemplateHTML({})}
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
  `}n(Ky,"getTemplateHTML$g");const Vy=Object.values(m),qy="sm:384 md:576 lg:768 xl:960";function Yy(t){gE(t.target,t.contentRect.width)}n(Yy,"resizeCallback");function gE(t,e){var i;if(!t.isConnected)return;const a=(i=t.getAttribute($.BREAKPOINTS))!=null?i:qy,r=Gy(a),s=zy(r,e);let o=!1;if(Object.keys(r).forEach(l=>{if(s.includes(l)){t.hasAttribute(`breakpoint${l}`)||(t.setAttribute(`breakpoint${l}`,""),o=!0);return}t.hasAttribute(`breakpoint${l}`)&&(t.removeAttribute(`breakpoint${l}`),o=!0)}),o){const l=new CustomEvent(ui.BREAKPOINTS_CHANGE,{detail:s});t.dispatchEvent(l)}t.breakpointsComputed||(t.breakpointsComputed=!0,t.dispatchEvent(new CustomEvent(ui.BREAKPOINTS_COMPUTED,{bubbles:!0,composed:!0})))}n(gE,"setBreakpoints");function Gy(t){const e=t.split(/\s+/);return Object.fromEntries(e.map(i=>i.split(":")))}n(Gy,"createBreakpointMap");function zy(t,e){return Object.keys(t).filter(i=>e>=parseInt(t[i]))}n(zy,"getBreakpoints");const tm=class tm extends y.HTMLElement{constructor(){if(super(),ze(this,Du),ze(this,Mu),ze(this,Es),ze(this,Cd),ze(this,rn),ze(this,On,void 0),ze(this,Ul,0),ze(this,Ga,null),ze(this,an,null),ze(this,fr,void 0),this.breakpointsComputed=!1,ze(this,Cu,e=>{const i=this.media;for(const a of e){if(a.type!=="childList")continue;const r=a.removedNodes;for(const s of r){if(s.slot!="media"||a.target!=this)continue;let o=a.previousSibling&&a.previousSibling.previousElementSibling;if(!o||!i)this.mediaUnsetCallback(s);else{let l=o.slot!=="media";for(;(o=o.previousSibling)!==null;)o.slot=="media"&&(l=!1);l&&this.mediaUnsetCallback(s)}}if(i)for(const s of a.addedNodes)s===i&&this.handleMediaUpdated(i)}}),ze(this,za,!1),ze(this,No,e=>{Ee(this,za)||(setTimeout(()=>{Yy(e),Rt(this,za,!1)},0),Rt(this,za,!0))}),ze(this,Pi,void 0),ze(this,Po,()=>{if(!Ee(this,Pi).assignedElements({flatten:!0}).length){Ee(this,Ga)&&this.mediaUnsetCallback(Ee(this,Ga));return}this.handleMediaUpdated(this.media)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}Rt(this,On,new MutationObserver(Ee(this,Cu)))}static get observedAttributes(){return[$.AUTOHIDE,$.GESTURES_DISABLED].concat(Vy).filter(e=>![m.MEDIA_RENDITION_LIST,m.MEDIA_AUDIO_TRACK_LIST,m.MEDIA_CHAPTERS_CUES,m.MEDIA_WIDTH,m.MEDIA_HEIGHT,m.MEDIA_ERROR,m.MEDIA_ERROR_MESSAGE].includes(e))}attributeChangedCallback(e,i,a){e.toLowerCase()==$.AUTOHIDE&&(this.autohide=a)}get media(){let e=this.querySelector(":scope > [slot=media]");return e?.nodeName=="SLOT"&&(e=e.assignedElements({flatten:!0})[0]),e}async handleMediaUpdated(e){e&&(Rt(this,Ga,e),e.localName.includes("-")&&await y.customElements.whenDefined(e.localName),this.mediaSetCallback(e))}connectedCallback(){var e;Ee(this,On).observe(this,{childList:!0,subtree:!0}),Jr(this,Ee(this,No));const i=this.getAttribute($.AUDIO)!=null,a=C(i?"audio player":"video player");this.setAttribute("role","region"),this.setAttribute("aria-label",a),this.handleMediaUpdated(this.media),this.setAttribute($.USER_INACTIVE,""),gE(this,this.getBoundingClientRect().width);const r=this.querySelector(":scope > slot[slot=media]");r&&(Rt(this,Pi,r),Ee(this,Pi).addEventListener("slotchange",Ee(this,Po))),this.addEventListener("pointerdown",this),this.addEventListener("pointermove",this),this.addEventListener("pointerup",this),this.addEventListener("mouseleave",this),this.addEventListener("keyup",this),(e=y.window)==null||e.addEventListener("mouseup",this)}disconnectedCallback(){var e;en(this,Ee(this,No)),clearTimeout(Ee(this,an)),Ee(this,On).disconnect(),this.media&&this.mediaUnsetCallback(this.media),(e=y.window)==null||e.removeEventListener("mouseup",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointermove",this),this.removeEventListener("pointerup",this),this.removeEventListener("mouseleave",this),this.removeEventListener("keyup",this),Ee(this,Pi)&&(Ee(this,Pi).removeEventListener("slotchange",Ee(this,Po)),Rt(this,Pi,null)),Rt(this,za,!1)}mediaSetCallback(e){}mediaUnsetCallback(e){Rt(this,Ga,null)}handleEvent(e){switch(e.type){case"pointerdown":Rt(this,Ul,e.timeStamp);break;case"pointermove":$t(this,Du,_E).call(this,e);break;case"pointerup":$t(this,Mu,bE).call(this,e);break;case"mouseleave":$t(this,Es,Ld).call(this);break;case"mouseup":this.removeAttribute($.KEYBOARD_CONTROL);break;case"keyup":$t(this,rn,_s).call(this),this.setAttribute($.KEYBOARD_CONTROL,"");break}}set autohide(e){const i=Number(e);Rt(this,fr,isNaN(i)?0:i)}get autohide(){return(Ee(this,fr)===void 0?2:Ee(this,fr)).toString()}get breakpoints(){return he(this,$.BREAKPOINTS)}set breakpoints(e){le(this,$.BREAKPOINTS,e)}get audio(){return G(this,$.AUDIO)}set audio(e){z(this,$.AUDIO,e)}get gesturesDisabled(){return G(this,$.GESTURES_DISABLED)}set gesturesDisabled(e){z(this,$.GESTURES_DISABLED,e)}get keyboardControl(){return G(this,$.KEYBOARD_CONTROL)}set keyboardControl(e){z(this,$.KEYBOARD_CONTROL,e)}get noAutohide(){return G(this,$.NO_AUTOHIDE)}set noAutohide(e){z(this,$.NO_AUTOHIDE,e)}get autohideOverControls(){return G(this,$.AUTOHIDE_OVER_CONTROLS)}set autohideOverControls(e){z(this,$.AUTOHIDE_OVER_CONTROLS,e)}get userInteractive(){return G(this,$.USER_INACTIVE)}set userInteractive(e){z(this,$.USER_INACTIVE,e)}};n(tm,"MediaContainer");let nn=tm;On=new WeakMap;Ul=new WeakMap;Ga=new WeakMap;an=new WeakMap;fr=new WeakMap;Cu=new WeakMap;za=new WeakMap;No=new WeakMap;Du=new WeakSet;_E=n(function(t){if(t.pointerType!=="mouse"&&t.timeStamp-Ee(this,Ul)<250)return;$t(this,Cd,hh).call(this),clearTimeout(Ee(this,an));const e=this.hasAttribute($.AUTOHIDE_OVER_CONTROLS);([this,this.media].includes(t.target)||e)&&$t(this,rn,_s).call(this)},"handlePointerMove_fn$2");Mu=new WeakSet;bE=n(function(t){if(t.pointerType==="touch"){const e=!this.hasAttribute($.USER_INACTIVE);[this,this.media].includes(t.target)&&e?$t(this,Es,Ld).call(this):$t(this,rn,_s).call(this)}else t.composedPath().some(e=>["media-play-button","media-fullscreen-button"].includes(e?.localName))&&$t(this,rn,_s).call(this)},"handlePointerUp_fn$1");Es=new WeakSet;Ld=n(function(){if(Ee(this,fr)<0||this.hasAttribute($.USER_INACTIVE))return;this.setAttribute($.USER_INACTIVE,"");const t=new y.CustomEvent(ui.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!0});this.dispatchEvent(t)},"setInactive_fn");Cd=new WeakSet;hh=n(function(){if(!this.hasAttribute($.USER_INACTIVE))return;this.removeAttribute($.USER_INACTIVE);const t=new y.CustomEvent(ui.USER_INACTIVE_CHANGE,{composed:!0,bubbles:!0,detail:!1});this.dispatchEvent(t)},"setActive_fn");rn=new WeakSet;_s=n(function(){$t(this,Cd,hh).call(this),clearTimeout(Ee(this,an));const t=parseInt(this.autohide);t<0||Rt(this,an,setTimeout(()=>{$t(this,Es,Ld).call(this)},t*1e3))},"scheduleInactive_fn");Pi=new WeakMap;Po=new WeakMap;nn.shadowRootOptions={mode:"open"};nn.getTemplateHTML=Ky;y.customElements.get("media-container")||y.customElements.define("media-container",nn);var yE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$s"),Ne=n((t,e,i)=>(yE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$s"),_n=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$s"),no=n((t,e,i,a)=>(yE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$o"),Qa,ja,Hl,ka,_i,$i;const im=class im{constructor(e,i,{defaultValue:a}={defaultValue:void 0}){_n(this,_i),_n(this,Qa,void 0),_n(this,ja,void 0),_n(this,Hl,void 0),_n(this,ka,new Set),no(this,Qa,e),no(this,ja,i),no(this,Hl,new Set(a))}[Symbol.iterator](){return Ne(this,_i,$i).values()}get length(){return Ne(this,_i,$i).size}get value(){var e;return(e=[...Ne(this,_i,$i)].join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(no(this,ka,new Set),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return[...Ne(this,_i,$i)][e]}values(){return Ne(this,_i,$i).values()}forEach(e,i){Ne(this,_i,$i).forEach(e,i)}add(...e){var i,a;e.forEach(r=>Ne(this,ka).add(r)),!(this.value===""&&!((i=Ne(this,Qa))!=null&&i.hasAttribute(`${Ne(this,ja)}`)))&&((a=Ne(this,Qa))==null||a.setAttribute(`${Ne(this,ja)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>Ne(this,ka).delete(a)),(i=Ne(this,Qa))==null||i.setAttribute(`${Ne(this,ja)}`,`${this.value}`)}contains(e){return Ne(this,_i,$i).has(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){return this.remove(e),this.add(i),e===i}};n(im,"AttributeTokenList");let bs=im;Qa=new WeakMap;ja=new WeakMap;Hl=new WeakMap;ka=new WeakMap;_i=new WeakSet;$i=n(function(){return Ne(this,ka).size?Ne(this,ka):Ne(this,Hl)},"tokens_get");const Qy=n((t="")=>t.split(/\s+/),"splitTextTracksStr"),TE=n((t="")=>{const[e,i,a]=t.split(":"),r=a?decodeURIComponent(a):void 0;return{kind:e==="cc"?li.CAPTIONS:li.SUBTITLES,language:i,label:r}},"parseTextTrackStr"),Dd=n((t="",e={})=>Qy(t).map(i=>{const a=TE(i);return{...e,...a}}),"parseTextTracksStr"),AE=n(t=>t?Array.isArray(t)?t.map(e=>typeof e=="string"?TE(e):e):typeof t=="string"?Dd(t):[t]:[],"parseTracks"),Ou=n(({kind:t,label:e,language:i}={kind:"subtitles"})=>e?`${t==="captions"?"cc":"sb"}:${i}:${encodeURIComponent(e)}`:i,"formatTextTrackObj"),gs=n((t=[])=>Array.prototype.map.call(t,Ou).join(" "),"stringifyTextTrackList"),jy=n((t,e)=>i=>i[t]===e,"isMatchingPropOf"),kE=n(t=>{const e=Object.entries(t).map(([i,a])=>jy(i,a));return i=>e.every(a=>a(i))},"textTrackObjAsPred"),is=n((t,e=[],i=[])=>{const a=AE(i).map(kE),r=n(s=>a.some(o=>o(s)),"isTrackToUpdate");Array.from(e).filter(r).forEach(s=>{s.mode=t})},"updateTracksModeTo"),Md=n((t,e=()=>!0)=>{if(!t?.textTracks)return[];const i=typeof e=="function"?e:kE(e);return Array.from(t.textTracks).filter(i)},"getTextTracksList"),SE=n(t=>{var e;return!!((e=t.mediaSubtitlesShowing)!=null&&e.length)||t.hasAttribute(m.MEDIA_SUBTITLES_SHOWING)},"areSubsOn"),Zy=n(t=>{var e;const{media:i,fullscreenElement:a}=t;try{const r=a&&"requestFullscreen"in a?"requestFullscreen":a&&"webkitRequestFullScreen"in a?"webkitRequestFullScreen":void 0;if(r){const s=(e=a[r])==null?void 0:e.call(a);if(s instanceof Promise)return s.catch(()=>{})}else i?.webkitEnterFullscreen?i.webkitEnterFullscreen():i?.requestFullscreen&&i.requestFullscreen()}catch{}},"enterFullscreen"),Zp="exitFullscreen"in we?"exitFullscreen":"webkitExitFullscreen"in we?"webkitExitFullscreen":"webkitCancelFullScreen"in we?"webkitCancelFullScreen":void 0,Xy=n(t=>{var e;const{documentElement:i}=t;if(Zp){const a=(e=i?.[Zp])==null?void 0:e.call(i);if(a instanceof Promise)return a.catch(()=>{})}},"exitFullscreen"),xn="fullscreenElement"in we?"fullscreenElement":"webkitFullscreenElement"in we?"webkitFullscreenElement":void 0,Jy=n(t=>{const{documentElement:e,media:i}=t,a=e?.[xn];return!a&&"webkitDisplayingFullscreen"in i&&"webkitPresentationMode"in i&&i.webkitDisplayingFullscreen&&i.webkitPresentationMode===Ay.FULLSCREEN?i:a},"getFullscreenElement"),eT=n(t=>{var e;const{media:i,documentElement:a,fullscreenElement:r=i}=t;if(!i||!a)return!1;const s=Jy(t);if(!s)return!1;if(s===r||s===i)return!0;if(s.localName.includes("-")){let o=s.shadowRoot;if(!(xn in o))return Mi(s,r);for(;o?.[xn];){if(o[xn]===r)return!0;o=(e=o[xn])==null?void 0:e.shadowRoot}}return!1},"isFullscreen"),tT="fullscreenEnabled"in we?"fullscreenEnabled":"webkitFullscreenEnabled"in we?"webkitFullscreenEnabled":void 0,iT=n(t=>{const{documentElement:e,media:i}=t;return!!e?.[tT]||i&&"webkitSupportsFullscreen"in i},"isFullscreenEnabled");let so;const mh=n(()=>{var t,e;return so||(so=(e=(t=we)==null?void 0:t.createElement)==null?void 0:e.call(t,"video"),so)},"getTestMediaEl"),aT=n(async(t=mh())=>{if(!t)return!1;const e=t.volume;t.volume=e/2+.1;const i=new AbortController,a=await Promise.race([rT(t,i.signal),nT(t,e)]);return i.abort(),a},"hasVolumeSupportAsync"),rT=n((t,e)=>new Promise(i=>{t.addEventListener("volumechange",()=>i(!0),{signal:e})}),"dispatchedVolumeChange"),nT=n(async(t,e)=>{for(let i=0;i<10;i++){if(t.volume===e)return!1;await lE(10)}return t.volume!==e},"volumeChanged"),sT=/.*Version\/.*Safari\/.*/.test(y.navigator.userAgent),wE=n((t=mh())=>y.matchMedia("(display-mode: standalone)").matches&&sT?!1:typeof t?.requestPictureInPicture=="function","hasPipSupport"),IE=n((t=mh())=>iT({documentElement:we,media:t}),"hasFullscreenSupport"),oT=IE(),lT=wE(),dT=!!y.WebKitPlaybackTargetAvailabilityEvent,uT=!!y.chrome,Wl=n(t=>Md(t.media,e=>[li.SUBTITLES,li.CAPTIONS].includes(e.kind)).sort((e,i)=>e.kind>=i.kind?1:-1),"getSubtitleTracks"),RE=n(t=>Md(t.media,e=>e.mode===Tr.SHOWING&&[li.SUBTITLES,li.CAPTIONS].includes(e.kind)),"getShowingSubtitleTracks"),LE=n((t,e)=>{const i=Wl(t),a=RE(t),r=!!a.length;if(i.length){if(e===!1||r&&e!==!0)is(Tr.DISABLED,i,a);else if(e===!0||!r&&e!==!1){let s=i[0];const{options:o}=t;if(!o?.noSubtitlesLangPref){const p=y.localStorage.getItem("media-chrome-pref-subtitles-lang"),v=p?[p,...y.navigator.languages]:y.navigator.languages,c=i.filter(u=>v.some(f=>u.language.toLowerCase().startsWith(f.split("-")[0]))).sort((u,f)=>{const _=v.findIndex(T=>u.language.toLowerCase().startsWith(T.split("-")[0])),b=v.findIndex(T=>f.language.toLowerCase().startsWith(T.split("-")[0]));return _-b});c[0]&&(s=c[0])}const{language:l,label:d,kind:h}=s;is(Tr.DISABLED,i,a),is(Tr.SHOWING,i,[{language:l,label:d,kind:h}])}}},"toggleSubtitleTracks"),ph=n((t,e)=>t===e?!0:t==null||e==null||typeof t!=typeof e?!1:typeof t=="number"&&Number.isNaN(t)&&Number.isNaN(e)?!0:typeof t!="object"?!1:Array.isArray(t)?cT(t,e):Object.entries(t).every(([i,a])=>i in e&&ph(a,e[i])),"areValuesEq"),cT=n((t,e)=>{const i=Array.isArray(t),a=Array.isArray(e);return i!==a?!1:i||a?t.length!==e.length?!1:t.every((r,s)=>ph(r,e[s])):!0},"areArraysEq"),hT=Object.values(Ai);let Bl;const mT=aT().then(t=>(Bl=t,Bl)),pT=n(async(...t)=>{await Promise.all(t.filter(e=>e).map(async e=>{if(!("localName"in e&&e instanceof y.HTMLElement))return;const i=e.localName;if(!i.includes("-"))return;const a=y.customElements.get(i);a&&e instanceof a||(await y.customElements.whenDefined(i),y.customElements.upgrade(e))}))},"prepareStateOwners"),vT=new y.DOMParser,fT=n(t=>t&&(vT.parseFromString(t,"text/html").body.textContent||t),"parseHtmlToText"),Nn={mediaError:{get(t,e){const{media:i}=t;if(e?.type!=="playing")return i?.error},mediaEvents:["emptied","error","playing"]},mediaErrorCode:{get(t,e){var i;const{media:a}=t;if(e?.type!=="playing")return(i=a?.error)==null?void 0:i.code},mediaEvents:["emptied","error","playing"]},mediaErrorMessage:{get(t,e){var i,a;const{media:r}=t;if(e?.type!=="playing")return(a=(i=r?.error)==null?void 0:i.message)!=null?a:""},mediaEvents:["emptied","error","playing"]},mediaWidth:{get(t){var e;const{media:i}=t;return(e=i?.videoWidth)!=null?e:0},mediaEvents:["resize"]},mediaHeight:{get(t){var e;const{media:i}=t;return(e=i?.videoHeight)!=null?e:0},mediaEvents:["resize"]},mediaPaused:{get(t){var e;const{media:i}=t;return(e=i?.paused)!=null?e:!0},set(t,e){var i;const{media:a}=e;a&&(t?a.pause():(i=a.play())==null||i.catch(()=>{}))},mediaEvents:["play","playing","pause","emptied"]},mediaHasPlayed:{get(t,e){const{media:i}=t;return i?e?e.type==="playing":!i.paused:!1},mediaEvents:["playing","emptied"]},mediaEnded:{get(t){var e;const{media:i}=t;return(e=i?.ended)!=null?e:!1},mediaEvents:["seeked","ended","emptied"]},mediaPlaybackRate:{get(t){var e;const{media:i}=t;return(e=i?.playbackRate)!=null?e:1},set(t,e){const{media:i}=e;i&&Number.isFinite(+t)&&(i.playbackRate=+t)},mediaEvents:["ratechange","loadstart"]},mediaMuted:{get(t){var e;const{media:i}=t;return(e=i?.muted)!=null?e:!1},set(t,e){const{media:i,options:{noMutedPref:a}={}}=e;if(i){i.muted=t;try{const r=y.localStorage.getItem("media-chrome-pref-muted")!==null,s=i.hasAttribute("muted");if(a){r&&y.localStorage.removeItem("media-chrome-pref-muted");return}if(s&&!r)return;y.localStorage.setItem("media-chrome-pref-muted",t?"true":"false")}catch{}}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noMutedPref:i}}=e,{media:a}=e;if(!(!a||a.muted||i))try{const r=y.localStorage.getItem("media-chrome-pref-muted")==="true";Nn.mediaMuted.set(r,e),t(r)}catch{}}]},mediaLoop:{get(t){const{media:e}=t;return e?.loop},set(t,e){const{media:i}=e;i&&(i.loop=t)},mediaEvents:["medialooprequest"]},mediaVolume:{get(t){var e;const{media:i}=t;return(e=i?.volume)!=null?e:1},set(t,e){const{media:i,options:{noVolumePref:a}={}}=e;if(i){try{t==null?y.localStorage.removeItem("media-chrome-pref-volume"):!i.hasAttribute("muted")&&!a&&y.localStorage.setItem("media-chrome-pref-volume",t.toString())}catch{}Number.isFinite(+t)&&(i.volume=+t)}},mediaEvents:["volumechange"],stateOwnersUpdateHandlers:[(t,e)=>{const{options:{noVolumePref:i}}=e;if(!i)try{const{media:a}=e;if(!a)return;const r=y.localStorage.getItem("media-chrome-pref-volume");if(r==null)return;Nn.mediaVolume.set(+r,e),t(+r)}catch{}}]},mediaVolumeLevel:{get(t){const{media:e}=t;return typeof e?.volume>"u"?"high":e.muted||e.volume===0?"off":e.volume<.5?"low":e.volume<.75?"medium":"high"},mediaEvents:["volumechange"]},mediaCurrentTime:{get(t){var e;const{media:i}=t;return(e=i?.currentTime)!=null?e:0},set(t,e){const{media:i}=e;!i||!oh(t)||(i.currentTime=t)},mediaEvents:["timeupdate","loadedmetadata"]},mediaDuration:{get(t){const{media:e,options:{defaultDuration:i}={}}=t;return i&&(!e||!e.duration||Number.isNaN(e.duration)||!Number.isFinite(e.duration))?i:Number.isFinite(e?.duration)?e.duration:Number.NaN},mediaEvents:["durationchange","loadedmetadata","emptied"]},mediaLoading:{get(t){const{media:e}=t;return e?.readyState<3},mediaEvents:["waiting","playing","emptied"]},mediaSeekable:{get(t){var e;const{media:i}=t;if(!((e=i?.seekable)!=null&&e.length))return;const a=i.seekable.start(0),r=i.seekable.end(i.seekable.length-1);if(!(!a&&!r))return[Number(a.toFixed(3)),Number(r.toFixed(3))]},mediaEvents:["loadedmetadata","emptied","progress","seekablechange"]},mediaBuffered:{get(t){var e;const{media:i}=t,a=(e=i?.buffered)!=null?e:[];return Array.from(a).map((r,s)=>[Number(a.start(s).toFixed(3)),Number(a.end(s).toFixed(3))])},mediaEvents:["progress","emptied"]},mediaStreamType:{get(t){const{media:e,options:{defaultStreamType:i}={}}=t,a=[Ai.LIVE,Ai.ON_DEMAND].includes(i)?i:void 0;if(!e)return a;const{streamType:r}=e;if(hT.includes(r))return r===Ai.UNKNOWN?a:r;const s=e.duration;return s===1/0?Ai.LIVE:Number.isFinite(s)?Ai.ON_DEMAND:a},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange"]},mediaTargetLiveWindow:{get(t){const{media:e}=t;if(!e)return Number.NaN;const{targetLiveWindow:i}=e,a=Nn.mediaStreamType.get(t);return(i==null||Number.isNaN(i))&&a===Ai.LIVE?0:i},mediaEvents:["emptied","durationchange","loadedmetadata","streamtypechange","targetlivewindowchange"]},mediaTimeIsLive:{get(t){const{media:e,options:{liveEdgeOffset:i=10}={}}=t;if(!e)return!1;if(typeof e.liveEdgeStart=="number")return Number.isNaN(e.liveEdgeStart)?!1:e.currentTime>=e.liveEdgeStart;if(!(Nn.mediaStreamType.get(t)===Ai.LIVE))return!1;const r=e.seekable;if(!r)return!0;if(!r.length)return!1;const s=r.end(r.length-1)-i;return e.currentTime>=s},mediaEvents:["playing","timeupdate","progress","waiting","emptied"]},mediaSubtitlesList:{get(t){return Wl(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack"]},mediaSubtitlesShowing:{get(t){return RE(t).map(({kind:e,label:i,language:a})=>({kind:e,label:i,language:a}))},mediaEvents:["loadstart"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i,a;const{media:r,options:s}=e;if(!r)return;const o=n(l=>{var d;!s.defaultSubtitles||l&&![li.CAPTIONS,li.SUBTITLES].includes((d=l?.track)==null?void 0:d.kind)||LE(e,!0)},"updateDefaultSubtitlesCallback");return r.addEventListener("loadstart",o),(i=r.textTracks)==null||i.addEventListener("addtrack",o),(a=r.textTracks)==null||a.addEventListener("removetrack",o),()=>{var l,d;r.removeEventListener("loadstart",o),(l=r.textTracks)==null||l.removeEventListener("addtrack",o),(d=r.textTracks)==null||d.removeEventListener("removetrack",o)}}]},mediaChaptersCues:{get(t){var e;const{media:i}=t;if(!i)return[];const[a]=Md(i,{kind:li.CHAPTERS});return Array.from((e=a?.cues)!=null?e:[]).map(({text:r,startTime:s,endTime:o})=>({text:fT(r),startTime:s,endTime:o}))},mediaEvents:["loadstart","loadedmetadata"],textTracksEvents:["addtrack","removetrack","change"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;if(!a)return;const r=a.querySelector('track[kind="chapters"][default][src]'),s=(i=a.shadowRoot)==null?void 0:i.querySelector(':is(video,audio) > track[kind="chapters"][default][src]');return r?.addEventListener("load",t),s?.addEventListener("load",t),()=>{r?.removeEventListener("load",t),s?.removeEventListener("load",t)}}]},mediaIsPip:{get(t){var e,i;const{media:a,documentElement:r}=t;if(!a||!r||!r.pictureInPictureElement)return!1;if(r.pictureInPictureElement===a)return!0;if(r.pictureInPictureElement instanceof HTMLMediaElement)return(e=a.localName)!=null&&e.includes("-")?Mi(a,r.pictureInPictureElement):!1;if(r.pictureInPictureElement.localName.includes("-")){let s=r.pictureInPictureElement.shadowRoot;for(;s?.pictureInPictureElement;){if(s.pictureInPictureElement===a)return!0;s=(i=s.pictureInPictureElement)==null?void 0:i.shadowRoot}}return!1},set(t,e){const{media:i}=e;if(i)if(t){if(!we.pictureInPictureEnabled||!i.requestPictureInPicture)return;const a=n(()=>{},"warnNotReady");i.requestPictureInPicture().catch(r=>{if(r.code===11){if(!i.src)return;if(i.readyState===0&&i.preload==="none"){const s=n(()=>{i.removeEventListener("loadedmetadata",o),i.preload="none"},"cleanup"),o=n(()=>{i.requestPictureInPicture().catch(a),s()},"tryPip");i.addEventListener("loadedmetadata",o),i.preload="metadata",setTimeout(()=>{i.readyState===0&&a(),s()},1e3)}else throw r}else throw r})}else we.pictureInPictureElement&&we.exitPictureInPicture()},mediaEvents:["enterpictureinpicture","leavepictureinpicture"]},mediaRenditionList:{get(t){var e;const{media:i}=t;return[...(e=i?.videoRenditions)!=null?e:[]].map(a=>({...a}))},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaRenditionSelected:{get(t){var e,i,a;const{media:r}=t;return(a=(i=r?.videoRenditions)==null?void 0:i[(e=r.videoRenditions)==null?void 0:e.selectedIndex])==null?void 0:a.id},set(t,e){const{media:i}=e;if(!i?.videoRenditions)return;const a=t,r=Array.prototype.findIndex.call(i.videoRenditions,s=>s.id==a);i.videoRenditions.selectedIndex!=r&&(i.videoRenditions.selectedIndex=r)},mediaEvents:["emptied"],videoRenditionsEvents:["addrendition","removerendition","change"]},mediaAudioTrackList:{get(t){var e;const{media:i}=t;return[...(e=i?.audioTracks)!=null?e:[]]},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaAudioTrackEnabled:{get(t){var e,i;const{media:a}=t;return(i=[...(e=a?.audioTracks)!=null?e:[]].find(r=>r.enabled))==null?void 0:i.id},set(t,e){const{media:i}=e;if(!i?.audioTracks)return;const a=t;for(const r of i.audioTracks)r.enabled=a==r.id},mediaEvents:["emptied"],audioTracksEvents:["addtrack","removetrack","change"]},mediaIsFullscreen:{get(t){return eT(t)},set(t,e,i){var a,r;t?(Zy(e),i.detail&&!((a=e.media)!=null&&a.inert)&&((r=e.media)==null||r.focus())):Xy(e)},rootEvents:["fullscreenchange","webkitfullscreenchange"],mediaEvents:["webkitbeginfullscreen","webkitendfullscreen","webkitpresentationmodechanged"]},mediaIsCasting:{get(t){var e;const{media:i}=t;return!i?.remote||((e=i.remote)==null?void 0:e.state)==="disconnected"?!1:!!i.remote.state},set(t,e){var i,a;const{media:r}=e;r&&(t&&((i=r.remote)==null?void 0:i.state)!=="disconnected"||!t&&((a=r.remote)==null?void 0:a.state)!=="connected"||typeof r.remote.prompt=="function"&&r.remote.prompt().catch(()=>{}))},remoteEvents:["connect","connecting","disconnect"]},mediaIsAirplaying:{get(){return!1},set(t,e){const{media:i}=e;i&&i.webkitShowPlaybackTargetPicker&&y.WebKitPlaybackTargetAvailabilityEvent&&i.webkitShowPlaybackTargetPicker()},mediaEvents:["webkitcurrentplaybacktargetiswirelesschanged"]},mediaFullscreenUnavailable:{get(t){const{media:e}=t;if(!oT||!IE(e))return ot.UNSUPPORTED}},mediaPipUnavailable:{get(t){const{media:e}=t;if(!lT||!wE(e))return ot.UNSUPPORTED;if(e?.disablePictureInPicture)return ot.UNAVAILABLE}},mediaVolumeUnavailable:{get(t){const{media:e}=t;if(Bl===!1||e?.volume==null)return ot.UNSUPPORTED},stateOwnersUpdateHandlers:[t=>{Bl==null&&mT.then(e=>t(e?void 0:ot.UNSUPPORTED))}]},mediaCastUnavailable:{get(t,{availability:e="not-available"}={}){var i;const{media:a}=t;if(!uT||!((i=a?.remote)!=null&&i.state))return ot.UNSUPPORTED;if(!(e==null||e==="available"))return ot.UNAVAILABLE},stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(s=>{t({availability:s?"available":"not-available"})}).catch(s=>{s.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var s;(s=a?.remote)==null||s.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaAirplayUnavailable:{get(t,e){if(!dT)return ot.UNSUPPORTED;if(e?.availability==="not-available")return ot.UNAVAILABLE},mediaEvents:["webkitplaybacktargetavailabilitychanged"],stateOwnersUpdateHandlers:[(t,e)=>{var i;const{media:a}=e;return a?(a.disableRemotePlayback||a.hasAttribute("disableremoteplayback")||(i=a?.remote)==null||i.watchAvailability(s=>{t({availability:s?"available":"not-available"})}).catch(s=>{s.name==="NotSupportedError"?t({availability:null}):t({availability:"not-available"})}),()=>{var s;(s=a?.remote)==null||s.cancelWatchAvailability().catch(()=>{})}):void 0}]},mediaRenditionUnavailable:{get(t){var e;const{media:i}=t;if(!i?.videoRenditions)return ot.UNSUPPORTED;if(!((e=i.videoRenditions)!=null&&e.length))return ot.UNAVAILABLE},mediaEvents:["emptied","loadstart"],videoRenditionsEvents:["addrendition","removerendition"]},mediaAudioTrackUnavailable:{get(t){var e,i;const{media:a}=t;if(!a?.audioTracks)return ot.UNSUPPORTED;if(((i=(e=a.audioTracks)==null?void 0:e.length)!=null?i:0)<=1)return ot.UNAVAILABLE},mediaEvents:["emptied","loadstart"],audioTracksEvents:["addtrack","removetrack"]},mediaLang:{get(t){const{options:{mediaLang:e}={}}=t;return e??"en"}}},ET={[D.MEDIA_PREVIEW_REQUEST](t,e,{detail:i}){var a,r,s;const{media:o}=e,l=i??void 0;let d,h;if(o&&l!=null){const[u]=Md(o,{kind:li.METADATA,label:"thumbnails"}),f=Array.prototype.find.call((a=u?.cues)!=null?a:[],(_,b,T)=>b===0?_.endTime>l:b===T.length-1?_.startTime<=l:_.startTime<=l&&_.endTime>l);if(f){const _=/'^(?:[a-z]+:)?\/\//i.test(f.text)||(r=o?.querySelector('track[label="thumbnails"]'))==null?void 0:r.src,b=new URL(f.text,_);h=new URLSearchParams(b.hash).get("#xywh").split(",").map(A=>+A),d=b.href}}const p=t.mediaDuration.get(e);let c=(s=t.mediaChaptersCues.get(e).find((u,f,_)=>f===_.length-1&&p===u.endTime?u.startTime<=l&&u.endTime>=l:u.startTime<=l&&u.endTime>l))==null?void 0:s.text;return i!=null&&c==null&&(c=""),{mediaPreviewTime:l,mediaPreviewImage:d,mediaPreviewCoords:h,mediaPreviewChapter:c}},[D.MEDIA_PAUSE_REQUEST](t,e){t["mediaPaused"].set(!0,e)},[D.MEDIA_PLAY_REQUEST](t,e){var i,a,r,s;const o="mediaPaused",d=t.mediaStreamType.get(e)===Ai.LIVE,h=!((i=e.options)!=null&&i.noAutoSeekToLive),p=t.mediaTargetLiveWindow.get(e)>0;if(d&&h&&!p){const v=(a=t.mediaSeekable.get(e))==null?void 0:a[1];if(v){const c=(s=(r=e.options)==null?void 0:r.seekToLiveOffset)!=null?s:0,u=v-c;t.mediaCurrentTime.set(u,e)}}t[o].set(!1,e)},[D.MEDIA_PLAYBACK_RATE_REQUEST](t,e,{detail:i}){const a="mediaPlaybackRate",r=i;t[a].set(r,e)},[D.MEDIA_MUTE_REQUEST](t,e){t["mediaMuted"].set(!0,e)},[D.MEDIA_UNMUTE_REQUEST](t,e){const i="mediaMuted";t.mediaVolume.get(e)||t.mediaVolume.set(.25,e),t[i].set(!1,e)},[D.MEDIA_LOOP_REQUEST](t,e,{detail:i}){const a="mediaLoop",r=!!i;return t[a].set(r,e),{mediaLoop:r}},[D.MEDIA_VOLUME_REQUEST](t,e,{detail:i}){const a="mediaVolume",r=i;r&&t.mediaMuted.get(e)&&t.mediaMuted.set(!1,e),t[a].set(r,e)},[D.MEDIA_SEEK_REQUEST](t,e,{detail:i}){const a="mediaCurrentTime",r=i;t[a].set(r,e)},[D.MEDIA_SEEK_TO_LIVE_REQUEST](t,e){var i,a,r;const s="mediaCurrentTime",o=(i=t.mediaSeekable.get(e))==null?void 0:i[1];if(Number.isNaN(Number(o)))return;const l=(r=(a=e.options)==null?void 0:a.seekToLiveOffset)!=null?r:0,d=o-l;t[s].set(d,e)},[D.MEDIA_SHOW_SUBTITLES_REQUEST](t,e,{detail:i}){var a;const{options:r}=e,s=Wl(e),o=AE(i),l=(a=o[0])==null?void 0:a.language;l&&!r.noSubtitlesLangPref&&y.localStorage.setItem("media-chrome-pref-subtitles-lang",l),is(Tr.SHOWING,s,o)},[D.MEDIA_DISABLE_SUBTITLES_REQUEST](t,e,{detail:i}){const a=Wl(e),r=i??[];is(Tr.DISABLED,a,r)},[D.MEDIA_TOGGLE_SUBTITLES_REQUEST](t,e,{detail:i}){LE(e,i)},[D.MEDIA_RENDITION_REQUEST](t,e,{detail:i}){const a="mediaRenditionSelected",r=i;t[a].set(r,e)},[D.MEDIA_AUDIO_TRACK_REQUEST](t,e,{detail:i}){const a="mediaAudioTrackEnabled",r=i;t[a].set(r,e)},[D.MEDIA_ENTER_PIP_REQUEST](t,e){const i="mediaIsPip";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[D.MEDIA_EXIT_PIP_REQUEST](t,e){t["mediaIsPip"].set(!1,e)},[D.MEDIA_ENTER_FULLSCREEN_REQUEST](t,e,i){const a="mediaIsFullscreen";t.mediaIsPip.get(e)&&t.mediaIsPip.set(!1,e),t[a].set(!0,e,i)},[D.MEDIA_EXIT_FULLSCREEN_REQUEST](t,e){t["mediaIsFullscreen"].set(!1,e)},[D.MEDIA_ENTER_CAST_REQUEST](t,e){const i="mediaIsCasting";t.mediaIsFullscreen.get(e)&&t.mediaIsFullscreen.set(!1,e),t[i].set(!0,e)},[D.MEDIA_EXIT_CAST_REQUEST](t,e){t["mediaIsCasting"].set(!1,e)},[D.MEDIA_AIRPLAY_REQUEST](t,e){t["mediaIsAirplaying"].set(!0,e)}},_T=n(({media:t,fullscreenElement:e,documentElement:i,stateMediator:a=Nn,requestMap:r=ET,options:s={},monitorStateOwnersOnlyWithSubscriptions:o=!0})=>{const l=[],d={options:{...s}};let h=Object.freeze({mediaPreviewTime:void 0,mediaPreviewImage:void 0,mediaPreviewCoords:void 0,mediaPreviewChapter:void 0});const p=n(_=>{_!=null&&(ph(_,h)||(h=Object.freeze({...h,..._}),l.forEach(b=>b(h))))},"updateState"),v=n(()=>{const _=Object.entries(a).reduce((b,[T,{get:A}])=>(b[T]=A(d),b),{});p(_)},"updateStateFromFacade"),c={};let u;const f=n(async(_,b)=>{var T,A,g,w,O,M,H,F,j,K,W,We,at,rt,ge,qe;const Ut=!!u;if(u={...d,...u??{},..._},Ut)return;await pT(...Object.values(_));const Ye=l.length>0&&b===0&&o,At=d.media!==u.media,nt=((T=d.media)==null?void 0:T.textTracks)!==((A=u.media)==null?void 0:A.textTracks),Me=((g=d.media)==null?void 0:g.videoRenditions)!==((w=u.media)==null?void 0:w.videoRenditions),Be=((O=d.media)==null?void 0:O.audioTracks)!==((M=u.media)==null?void 0:M.audioTracks),Ge=((H=d.media)==null?void 0:H.remote)!==((F=u.media)==null?void 0:F.remote),pi=d.documentElement!==u.documentElement,sa=!!d.media&&(At||Ye),sp=!!((j=d.media)!=null&&j.textTracks)&&(nt||Ye),op=!!((K=d.media)!=null&&K.videoRenditions)&&(Me||Ye),lp=!!((W=d.media)!=null&&W.audioTracks)&&(Be||Ye),dp=!!((We=d.media)!=null&&We.remote)&&(Ge||Ye),up=!!d.documentElement&&(pi||Ye),$d=sa||sp||op||lp||dp||up,Ua=l.length===0&&b===1&&o,cp=!!u.media&&(At||Ua),hp=!!((at=u.media)!=null&&at.textTracks)&&(nt||Ua),mp=!!((rt=u.media)!=null&&rt.videoRenditions)&&(Me||Ua),pp=!!((ge=u.media)!=null&&ge.audioTracks)&&(Be||Ua),vp=!!((qe=u.media)!=null&&qe.remote)&&(Ge||Ua),fp=!!u.documentElement&&(pi||Ua),Ep=cp||hp||mp||pp||vp||fp;if(!($d||Ep)){Object.entries(u).forEach(([ie,vn])=>{d[ie]=vn}),v(),u=void 0;return}Object.entries(a).forEach(([ie,{get:vn,mediaEvents:Z_=[],textTracksEvents:X_=[],videoRenditionsEvents:J_=[],audioTracksEvents:eb=[],remoteEvents:tb=[],rootEvents:ib=[],stateOwnersUpdateHandlers:ab=[]}])=>{c[ie]||(c[ie]={});const st=n(me=>{const ye=vn(d,me);p({[ie]:ye})},"handler");let Oe;Oe=c[ie].mediaEvents,Z_.forEach(me=>{Oe&&sa&&(d.media.removeEventListener(me,Oe),c[ie].mediaEvents=void 0),cp&&(u.media.addEventListener(me,st),c[ie].mediaEvents=st)}),Oe=c[ie].textTracksEvents,X_.forEach(me=>{var ye,kt;Oe&&sp&&((ye=d.media.textTracks)==null||ye.removeEventListener(me,Oe),c[ie].textTracksEvents=void 0),hp&&((kt=u.media.textTracks)==null||kt.addEventListener(me,st),c[ie].textTracksEvents=st)}),Oe=c[ie].videoRenditionsEvents,J_.forEach(me=>{var ye,kt;Oe&&op&&((ye=d.media.videoRenditions)==null||ye.removeEventListener(me,Oe),c[ie].videoRenditionsEvents=void 0),mp&&((kt=u.media.videoRenditions)==null||kt.addEventListener(me,st),c[ie].videoRenditionsEvents=st)}),Oe=c[ie].audioTracksEvents,eb.forEach(me=>{var ye,kt;Oe&&lp&&((ye=d.media.audioTracks)==null||ye.removeEventListener(me,Oe),c[ie].audioTracksEvents=void 0),pp&&((kt=u.media.audioTracks)==null||kt.addEventListener(me,st),c[ie].audioTracksEvents=st)}),Oe=c[ie].remoteEvents,tb.forEach(me=>{var ye,kt;Oe&&dp&&((ye=d.media.remote)==null||ye.removeEventListener(me,Oe),c[ie].remoteEvents=void 0),vp&&((kt=u.media.remote)==null||kt.addEventListener(me,st),c[ie].remoteEvents=st)}),Oe=c[ie].rootEvents,ib.forEach(me=>{Oe&&up&&(d.documentElement.removeEventListener(me,Oe),c[ie].rootEvents=void 0),fp&&(u.documentElement.addEventListener(me,st),c[ie].rootEvents=st)});const Js=c[ie].stateOwnersUpdateHandlers;if(Js&&$d&&(Array.isArray(Js)?Js:[Js]).forEach(ye=>{typeof ye=="function"&&ye()}),Ep){const me=ab.map(ye=>ye(st,u)).filter(ye=>typeof ye=="function");c[ie].stateOwnersUpdateHandlers=me.length===1?me[0]:me}else $d&&(c[ie].stateOwnersUpdateHandlers=void 0)}),Object.entries(u).forEach(([ie,vn])=>{d[ie]=vn}),v(),u=void 0},"updateStateOwners");return f({media:t,fullscreenElement:e,documentElement:i,options:s}),{dispatch(_){const{type:b,detail:T}=_;if(r[b]&&h.mediaErrorCode==null){p(r[b](a,d,_));return}b==="mediaelementchangerequest"?f({media:T}):b==="fullscreenelementchangerequest"?f({fullscreenElement:T}):b==="documentelementchangerequest"?f({documentElement:T}):b==="optionschangerequest"&&(Object.entries(T??{}).forEach(([A,g])=>{d.options[A]=g}),v())},getState(){return h},subscribe(_){return f({},l.length+1),l.push(_),_(h),()=>{const b=l.indexOf(_);b>=0&&(f({},l.length-1),l.splice(b,1))}}}},"createMediaStore");var vh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$r"),x=n((t,e,i)=>(vh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$r"),pt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$r"),Lt=n((t,e,i,a)=>(vh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$n"),bn=n((t,e,i)=>(vh(t,e,"access private method"),i),"__privateMethod$d"),ki,Pn,Y,si,$n,Vt,$o,Un,Uo,xu,Ca,Ho,Nu,Pu,CE;const DE=["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Enter"," ","f","m","k","c","l","j",">","<","p"],Xp=10,Jp=.025,ev=.25,bT=.25,gT=2,I={DEFAULT_SUBTITLES:"defaultsubtitles",DEFAULT_STREAM_TYPE:"defaultstreamtype",DEFAULT_DURATION:"defaultduration",FULLSCREEN_ELEMENT:"fullscreenelement",HOTKEYS:"hotkeys",KEYBOARD_BACKWARD_SEEK_OFFSET:"keyboardbackwardseekoffset",KEYBOARD_FORWARD_SEEK_OFFSET:"keyboardforwardseekoffset",KEYBOARD_DOWN_VOLUME_STEP:"keyboarddownvolumestep",KEYBOARD_UP_VOLUME_STEP:"keyboardupvolumestep",KEYS_USED:"keysused",LANG:"lang",LOOP:"loop",LIVE_EDGE_OFFSET:"liveedgeoffset",NO_AUTO_SEEK_TO_LIVE:"noautoseektolive",NO_DEFAULT_STORE:"nodefaultstore",NO_HOTKEYS:"nohotkeys",NO_MUTED_PREF:"nomutedpref",NO_SUBTITLES_LANG_PREF:"nosubtitleslangpref",NO_VOLUME_PREF:"novolumepref",SEEK_TO_LIVE_OFFSET:"seektoliveoffset"},am=class am extends nn{constructor(){super(),pt(this,Uo),pt(this,Ho),pt(this,Pu),this.mediaStateReceivers=[],this.associatedElementSubscriptions=new Map,pt(this,ki,new bs(this,I.HOTKEYS)),pt(this,Pn,void 0),pt(this,Y,void 0),pt(this,si,null),pt(this,$n,void 0),pt(this,Vt,void 0),pt(this,$o,i=>{var a;(a=x(this,Y))==null||a.dispatch(i)}),pt(this,Un,void 0),pt(this,Ca,i=>{const{key:a,shiftKey:r}=i;if(!(r&&(a==="/"||a==="?")||DE.includes(a))){this.removeEventListener("keyup",x(this,Ca));return}this.keyboardShortcutHandler(i)}),this.associateElement(this);let e={};Lt(this,$n,i=>{Object.entries(i).forEach(([a,r])=>{if(a in e&&e[a]===r)return;this.propagateMediaState(a,r);const s=a.toLowerCase(),o=new y.CustomEvent(Ty[s],{composed:!0,detail:r});this.dispatchEvent(o)}),e=i})}static get observedAttributes(){return super.observedAttributes.concat(I.NO_HOTKEYS,I.HOTKEYS,I.DEFAULT_STREAM_TYPE,I.DEFAULT_SUBTITLES,I.DEFAULT_DURATION,I.NO_MUTED_PREF,I.NO_VOLUME_PREF,I.LANG,I.LOOP,I.LIVE_EDGE_OFFSET,I.SEEK_TO_LIVE_OFFSET,I.NO_AUTO_SEEK_TO_LIVE)}get mediaStore(){return x(this,Y)}set mediaStore(e){var i,a;if(x(this,Y)&&((i=x(this,Vt))==null||i.call(this),Lt(this,Vt,void 0)),Lt(this,Y,e),!x(this,Y)&&!this.hasAttribute(I.NO_DEFAULT_STORE)){bn(this,Uo,xu).call(this);return}Lt(this,Vt,(a=x(this,Y))==null?void 0:a.subscribe(x(this,$n)))}get fullscreenElement(){var e;return(e=x(this,Pn))!=null?e:this}set fullscreenElement(e){var i;this.hasAttribute(I.FULLSCREEN_ELEMENT)&&this.removeAttribute(I.FULLSCREEN_ELEMENT),Lt(this,Pn,e),(i=x(this,Y))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}get defaultSubtitles(){return G(this,I.DEFAULT_SUBTITLES)}set defaultSubtitles(e){z(this,I.DEFAULT_SUBTITLES,e)}get defaultStreamType(){return he(this,I.DEFAULT_STREAM_TYPE)}set defaultStreamType(e){le(this,I.DEFAULT_STREAM_TYPE,e)}get defaultDuration(){return se(this,I.DEFAULT_DURATION)}set defaultDuration(e){fe(this,I.DEFAULT_DURATION,e)}get noHotkeys(){return G(this,I.NO_HOTKEYS)}set noHotkeys(e){z(this,I.NO_HOTKEYS,e)}get keysUsed(){return he(this,I.KEYS_USED)}set keysUsed(e){le(this,I.KEYS_USED,e)}get liveEdgeOffset(){return se(this,I.LIVE_EDGE_OFFSET)}set liveEdgeOffset(e){fe(this,I.LIVE_EDGE_OFFSET,e)}get noAutoSeekToLive(){return G(this,I.NO_AUTO_SEEK_TO_LIVE)}set noAutoSeekToLive(e){z(this,I.NO_AUTO_SEEK_TO_LIVE,e)}get noVolumePref(){return G(this,I.NO_VOLUME_PREF)}set noVolumePref(e){z(this,I.NO_VOLUME_PREF,e)}get noMutedPref(){return G(this,I.NO_MUTED_PREF)}set noMutedPref(e){z(this,I.NO_MUTED_PREF,e)}get noSubtitlesLangPref(){return G(this,I.NO_SUBTITLES_LANG_PREF)}set noSubtitlesLangPref(e){z(this,I.NO_SUBTITLES_LANG_PREF,e)}get noDefaultStore(){return G(this,I.NO_DEFAULT_STORE)}set noDefaultStore(e){z(this,I.NO_DEFAULT_STORE,e)}attributeChangedCallback(e,i,a){var r,s,o,l,d,h,p,v,c,u,f,_;if(super.attributeChangedCallback(e,i,a),e===I.NO_HOTKEYS)a!==i&&a===""?(this.hasAttribute(I.HOTKEYS),this.disableHotkeys()):a!==i&&a===null&&this.enableHotkeys();else if(e===I.HOTKEYS)x(this,ki).value=a;else if(e===I.DEFAULT_SUBTITLES&&a!==i)(r=x(this,Y))==null||r.dispatch({type:"optionschangerequest",detail:{defaultSubtitles:this.hasAttribute(I.DEFAULT_SUBTITLES)}});else if(e===I.DEFAULT_STREAM_TYPE)(o=x(this,Y))==null||o.dispatch({type:"optionschangerequest",detail:{defaultStreamType:(s=this.getAttribute(I.DEFAULT_STREAM_TYPE))!=null?s:void 0}});else if(e===I.LIVE_EDGE_OFFSET&&a!==i)(l=x(this,Y))==null||l.dispatch({type:"optionschangerequest",detail:{liveEdgeOffset:this.hasAttribute(I.LIVE_EDGE_OFFSET)?+this.getAttribute(I.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(I.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(I.SEEK_TO_LIVE_OFFSET):this.hasAttribute(I.LIVE_EDGE_OFFSET)?+this.getAttribute(I.LIVE_EDGE_OFFSET):void 0}});else if(e===I.SEEK_TO_LIVE_OFFSET&&a!==i)(d=x(this,Y))==null||d.dispatch({type:"optionschangerequest",detail:{seekToLiveOffset:this.hasAttribute(I.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(I.SEEK_TO_LIVE_OFFSET):this.hasAttribute(I.LIVE_EDGE_OFFSET)?+this.getAttribute(I.LIVE_EDGE_OFFSET):void 0}});else if(e===I.NO_AUTO_SEEK_TO_LIVE)(h=x(this,Y))==null||h.dispatch({type:"optionschangerequest",detail:{noAutoSeekToLive:this.hasAttribute(I.NO_AUTO_SEEK_TO_LIVE)}});else if(e===I.FULLSCREEN_ELEMENT){const b=a?(p=this.getRootNode())==null?void 0:p.getElementById(a):void 0;Lt(this,Pn,b),(v=x(this,Y))==null||v.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement})}else e===I.LANG&&a!==i?(xy(a),(c=x(this,Y))==null||c.dispatch({type:"optionschangerequest",detail:{mediaLang:a}})):e===I.LOOP&&a!==i?(u=x(this,Y))==null||u.dispatch({type:D.MEDIA_LOOP_REQUEST,detail:a!=null}):e===I.NO_VOLUME_PREF&&a!==i?(f=x(this,Y))==null||f.dispatch({type:"optionschangerequest",detail:{noVolumePref:this.hasAttribute(I.NO_VOLUME_PREF)}}):e===I.NO_MUTED_PREF&&a!==i&&((_=x(this,Y))==null||_.dispatch({type:"optionschangerequest",detail:{noMutedPref:this.hasAttribute(I.NO_MUTED_PREF)}}))}connectedCallback(){var e,i,a;this.associateElement(this),!x(this,Y)&&!this.hasAttribute(I.NO_DEFAULT_STORE)&&bn(this,Uo,xu).call(this),(e=x(this,Y))==null||e.dispatch({type:"documentelementchangerequest",detail:we}),(i=x(this,Y))==null||i.dispatch({type:"fullscreenelementchangerequest",detail:this.fullscreenElement}),super.connectedCallback(),x(this,Y)&&!x(this,Vt)&&Lt(this,Vt,(a=x(this,Y))==null?void 0:a.subscribe(x(this,$n))),x(this,Un)!==void 0&&x(this,Y)&&this.media&&setTimeout(()=>{var r,s,o;(s=(r=this.media)==null?void 0:r.textTracks)!=null&&s.length&&((o=x(this,Y))==null||o.dispatch({type:D.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:x(this,Un)}))},0),this.hasAttribute(I.NO_HOTKEYS)?this.disableHotkeys():this.enableHotkeys()}disconnectedCallback(){var e,i,a,r,s,o;if((e=super.disconnectedCallback)==null||e.call(this),this.disableHotkeys(),x(this,Y)){const l=x(this,Y).getState();Lt(this,Un,!!((i=l.mediaSubtitlesShowing)!=null&&i.length)),(a=x(this,Y))==null||a.dispatch({type:"fullscreenelementchangerequest",detail:void 0}),(r=x(this,Y))==null||r.dispatch({type:"documentelementchangerequest",detail:void 0}),(s=x(this,Y))==null||s.dispatch({type:D.MEDIA_TOGGLE_SUBTITLES_REQUEST,detail:!1})}x(this,Vt)&&((o=x(this,Vt))==null||o.call(this),Lt(this,Vt,void 0)),this.unassociateElement(this),x(this,si)&&(x(this,si).remove(),Lt(this,si,null))}mediaSetCallback(e){var i;super.mediaSetCallback(e),(i=x(this,Y))==null||i.dispatch({type:"mediaelementchangerequest",detail:e}),e.hasAttribute("tabindex")||(e.tabIndex=-1)}mediaUnsetCallback(e){var i;super.mediaUnsetCallback(e),(i=x(this,Y))==null||i.dispatch({type:"mediaelementchangerequest",detail:void 0})}propagateMediaState(e,i){av(this.mediaStateReceivers,e,i)}associateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(i.has(e))return;const a=this.registerMediaStateReceiver.bind(this),r=this.unregisterMediaStateReceiver.bind(this),s=wT(e,a,r);Object.values(D).forEach(o=>{e.addEventListener(o,x(this,$o))}),i.set(e,s)}unassociateElement(e){if(!e)return;const{associatedElementSubscriptions:i}=this;if(!i.has(e))return;i.get(e)(),i.delete(e),Object.values(D).forEach(r=>{e.removeEventListener(r,x(this,$o))})}registerMediaStateReceiver(e){if(!e)return;const i=this.mediaStateReceivers;i.indexOf(e)>-1||(i.push(e),x(this,Y)&&Object.entries(x(this,Y).getState()).forEach(([r,s])=>{av([e],r,s)}))}unregisterMediaStateReceiver(e){const i=this.mediaStateReceivers,a=i.indexOf(e);a<0||i.splice(a,1)}enableHotkeys(){this.addEventListener("keydown",bn(this,Ho,Nu))}disableHotkeys(){this.removeEventListener("keydown",bn(this,Ho,Nu)),this.removeEventListener("keyup",x(this,Ca))}get hotkeys(){return x(this,ki)}set hotkeys(e){le(this,I.HOTKEYS,e)}keyboardShortcutHandler(e){var i,a,r,s,o,l,d,h,p;const v=e.target;if(((r=(a=(i=v.getAttribute(I.KEYS_USED))==null?void 0:i.split(" "))!=null?a:v?.keysUsed)!=null?r:[]).map(T=>T==="Space"?" ":T).filter(Boolean).includes(e.key))return;let u,f,_;if(!(x(this,ki).contains(`no${e.key.toLowerCase()}`)||e.key===" "&&x(this,ki).contains("nospace")||e.shiftKey&&(e.key==="/"||e.key==="?")&&x(this,ki).contains("noshift+/")))switch(e.key){case" ":case"k":u=x(this,Y).getState().mediaPaused?D.MEDIA_PLAY_REQUEST:D.MEDIA_PAUSE_REQUEST,this.dispatchEvent(new y.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"m":u=this.mediaStore.getState().mediaVolumeLevel==="off"?D.MEDIA_UNMUTE_REQUEST:D.MEDIA_MUTE_REQUEST,this.dispatchEvent(new y.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"f":u=this.mediaStore.getState().mediaIsFullscreen?D.MEDIA_EXIT_FULLSCREEN_REQUEST:D.MEDIA_ENTER_FULLSCREEN_REQUEST,this.dispatchEvent(new y.CustomEvent(u,{composed:!0,bubbles:!0}));break;case"c":this.dispatchEvent(new y.CustomEvent(D.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}));break;case"ArrowLeft":case"j":{const T=this.hasAttribute(I.KEYBOARD_BACKWARD_SEEK_OFFSET)?+this.getAttribute(I.KEYBOARD_BACKWARD_SEEK_OFFSET):Xp;f=Math.max(((s=this.mediaStore.getState().mediaCurrentTime)!=null?s:0)-T,0),_=new y.CustomEvent(D.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowRight":case"l":{const T=this.hasAttribute(I.KEYBOARD_FORWARD_SEEK_OFFSET)?+this.getAttribute(I.KEYBOARD_FORWARD_SEEK_OFFSET):Xp;f=Math.max(((o=this.mediaStore.getState().mediaCurrentTime)!=null?o:0)+T,0),_=new y.CustomEvent(D.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowUp":{const T=this.hasAttribute(I.KEYBOARD_UP_VOLUME_STEP)?+this.getAttribute(I.KEYBOARD_UP_VOLUME_STEP):Jp;f=Math.min(((l=this.mediaStore.getState().mediaVolume)!=null?l:1)+T,1),_=new y.CustomEvent(D.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"ArrowDown":{const T=this.hasAttribute(I.KEYBOARD_DOWN_VOLUME_STEP)?+this.getAttribute(I.KEYBOARD_DOWN_VOLUME_STEP):Jp;f=Math.max(((d=this.mediaStore.getState().mediaVolume)!=null?d:1)-T,0),_=new y.CustomEvent(D.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"<":{const T=(h=this.mediaStore.getState().mediaPlaybackRate)!=null?h:1;f=Math.max(T-ev,bT).toFixed(2),_=new y.CustomEvent(D.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case">":{const T=(p=this.mediaStore.getState().mediaPlaybackRate)!=null?p:1;f=Math.min(T+ev,gT).toFixed(2),_=new y.CustomEvent(D.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:f}),this.dispatchEvent(_);break}case"/":case"?":{e.shiftKey&&bn(this,Pu,CE).call(this);break}case"p":{u=this.mediaStore.getState().mediaIsPip?D.MEDIA_EXIT_PIP_REQUEST:D.MEDIA_ENTER_PIP_REQUEST,_=new y.CustomEvent(u,{composed:!0,bubbles:!0}),this.dispatchEvent(_);break}}}};n(am,"MediaController");let Fl=am;ki=new WeakMap;Pn=new WeakMap;Y=new WeakMap;si=new WeakMap;$n=new WeakMap;Vt=new WeakMap;$o=new WeakMap;Un=new WeakMap;Uo=new WeakSet;xu=n(function(){var t;this.mediaStore=_T({media:this.media,fullscreenElement:this.fullscreenElement,options:{defaultSubtitles:this.hasAttribute(I.DEFAULT_SUBTITLES),defaultDuration:this.hasAttribute(I.DEFAULT_DURATION)?+this.getAttribute(I.DEFAULT_DURATION):void 0,defaultStreamType:(t=this.getAttribute(I.DEFAULT_STREAM_TYPE))!=null?t:void 0,liveEdgeOffset:this.hasAttribute(I.LIVE_EDGE_OFFSET)?+this.getAttribute(I.LIVE_EDGE_OFFSET):void 0,seekToLiveOffset:this.hasAttribute(I.SEEK_TO_LIVE_OFFSET)?+this.getAttribute(I.SEEK_TO_LIVE_OFFSET):this.hasAttribute(I.LIVE_EDGE_OFFSET)?+this.getAttribute(I.LIVE_EDGE_OFFSET):void 0,noAutoSeekToLive:this.hasAttribute(I.NO_AUTO_SEEK_TO_LIVE),noVolumePref:this.hasAttribute(I.NO_VOLUME_PREF),noMutedPref:this.hasAttribute(I.NO_MUTED_PREF),noSubtitlesLangPref:this.hasAttribute(I.NO_SUBTITLES_LANG_PREF)}})},"setupDefaultStore_fn");Ca=new WeakMap;Ho=new WeakSet;Nu=n(function(t){var e;const{metaKey:i,altKey:a,key:r,shiftKey:s}=t,o=s&&(r==="/"||r==="?");if(o&&((e=x(this,si))!=null&&e.open)){this.removeEventListener("keyup",x(this,Ca));return}if(i||a||!o&&!DE.includes(r)){this.removeEventListener("keyup",x(this,Ca));return}const l=t.target,d=l instanceof HTMLElement&&(l.tagName.toLowerCase()==="media-volume-range"||l.tagName.toLowerCase()==="media-time-range");[" ","ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(r)&&!(x(this,ki).contains(`no${r.toLowerCase()}`)||r===" "&&x(this,ki).contains("nospace"))&&!d&&t.preventDefault(),this.addEventListener("keyup",x(this,Ca),{once:!0})},"keyDownHandler_fn");Pu=new WeakSet;CE=n(function(){x(this,si)||(Lt(this,si,we.createElement("media-keyboard-shortcuts-dialog")),this.appendChild(x(this,si))),x(this,si).open=!0},"showKeyboardShortcutsDialog_fn");const yT=Object.values(m),TT=Object.values(nE),ME=n(t=>{var e,i,a,r;let{observedAttributes:s}=t.constructor;!s&&((e=t.nodeName)!=null&&e.includes("-"))&&(y.customElements.upgrade(t),{observedAttributes:s}=t.constructor);const o=(r=(a=(i=t?.getAttribute)==null?void 0:i.call(t,J.MEDIA_CHROME_ATTRIBUTES))==null?void 0:a.split)==null?void 0:r.call(a,/\s+/);return Array.isArray(s||o)?(s||o).filter(l=>yT.includes(l)):[]},"getMediaUIAttributesFrom"),AT=n(t=>{var e,i;return(e=t.nodeName)!=null&&e.includes("-")&&y.customElements.get((i=t.nodeName)==null?void 0:i.toLowerCase())&&!(t instanceof y.customElements.get(t.nodeName.toLowerCase()))&&y.customElements.upgrade(t),TT.some(a=>a in t)},"hasMediaUIProps"),$u=n(t=>AT(t)||!!ME(t).length,"isMediaStateReceiver"),tv=n(t=>{var e;return(e=t?.join)==null?void 0:e.call(t,":")},"serializeTuple"),iv={[m.MEDIA_SUBTITLES_LIST]:gs,[m.MEDIA_SUBTITLES_SHOWING]:gs,[m.MEDIA_SEEKABLE]:tv,[m.MEDIA_BUFFERED]:t=>t?.map(tv).join(" "),[m.MEDIA_PREVIEW_COORDS]:t=>t?.join(" "),[m.MEDIA_RENDITION_LIST]:ky,[m.MEDIA_AUDIO_TRACK_LIST]:Ry},kT=n(async(t,e,i)=>{var a,r;if(t.isConnected||await lE(0),typeof i=="boolean"||i==null)return z(t,e,i);if(typeof i=="number")return fe(t,e,i);if(typeof i=="string")return le(t,e,i);if(Array.isArray(i)&&!i.length)return t.removeAttribute(e);const s=(r=(a=iv[e])==null?void 0:a.call(iv,i))!=null?r:i;return t.setAttribute(e,s)},"setAttr"),ST=n(t=>{var e;return!!((e=t.closest)!=null&&e.call(t,'*[slot="media"]'))},"isMediaSlotElementDescendant"),va=n((t,e)=>{if(ST(t))return;const i=n((r,s)=>{var o,l;$u(r)&&s(r);const{children:d=[]}=r??{},h=(l=(o=r?.shadowRoot)==null?void 0:o.children)!=null?l:[];[...d,...h].forEach(v=>va(v,s))},"traverseForMediaStateReceiversSync"),a=t?.nodeName.toLowerCase();if(a.includes("-")&&!$u(t)){y.customElements.whenDefined(a).then(()=>{i(t,e)});return}i(t,e)},"traverseForMediaStateReceivers"),av=n((t,e,i)=>{t.forEach(a=>{if(e in a){a[e]=i;return}const r=ME(a),s=e.toLowerCase();r.includes(s)&&kT(a,s,i)})},"propagateMediaState"),wT=n((t,e,i)=>{va(t,e);const a=n(p=>{var v;const c=(v=p?.composedPath()[0])!=null?v:p.target;e(c)},"registerMediaStateReceiverHandler"),r=n(p=>{var v;const c=(v=p?.composedPath()[0])!=null?v:p.target;i(c)},"unregisterMediaStateReceiverHandler");t.addEventListener(D.REGISTER_MEDIA_STATE_RECEIVER,a),t.addEventListener(D.UNREGISTER_MEDIA_STATE_RECEIVER,r);const s=n(p=>{p.forEach(v=>{const{addedNodes:c=[],removedNodes:u=[],type:f,target:_,attributeName:b}=v;f==="childList"?(Array.prototype.forEach.call(c,T=>va(T,e)),Array.prototype.forEach.call(u,T=>va(T,i))):f==="attributes"&&b===J.MEDIA_CHROME_ATTRIBUTES&&($u(_)?e(_):i(_))})},"mutationCallback");let o=[];const l=n(p=>{const v=p.target;v.name!=="media"&&(o.forEach(c=>va(c,i)),o=[...v.assignedElements({flatten:!0})],o.forEach(c=>va(c,e)))},"slotChangeHandler");t.addEventListener("slotchange",l);const d=new MutationObserver(s);return d.observe(t,{childList:!0,attributes:!0,subtree:!0}),n(()=>{va(t,i),t.removeEventListener("slotchange",l),d.disconnect(),t.removeEventListener(D.REGISTER_MEDIA_STATE_RECEIVER,a),t.removeEventListener(D.UNREGISTER_MEDIA_STATE_RECEIVER,r)},"unsubscribe")},"monitorForMediaStateReceivers");y.customElements.get("media-controller")||y.customElements.define("media-controller",Fl);var IT=Fl;const Ha={PLACEMENT:"placement",BOUNDS:"bounds"};function RT(t){return`
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
  `}n(RT,"getTemplateHTML$f");const rm=class rm extends y.HTMLElement{constructor(){if(super(),this.updateXOffset=()=>{var e;if(!fE(this,{checkOpacity:!1,checkVisibilityCSS:!1}))return;const i=this.placement;if(i==="left"||i==="right"){this.style.removeProperty("--media-tooltip-offset-x");return}const a=getComputedStyle(this),r=(e=pn(this,"#"+this.bounds))!=null?e:et(this);if(!r)return;const{x:s,width:o}=r.getBoundingClientRect(),{x:l,width:d}=this.getBoundingClientRect(),h=l+d,p=s+o,v=a.getPropertyValue("--media-tooltip-offset-x"),c=v?parseFloat(v.replace("px","")):0,u=a.getPropertyValue("--media-tooltip-container-margin"),f=u?parseFloat(u.replace("px","")):0,_=l-s+c-f,b=h-p+c+f;if(_<0){this.style.setProperty("--media-tooltip-offset-x",`${_}px`);return}if(b>0){this.style.setProperty("--media-tooltip-offset-x",`${b}px`);return}this.style.removeProperty("--media-tooltip-offset-x")},!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}if(this.arrowEl=this.shadowRoot.querySelector("#arrow"),Object.prototype.hasOwnProperty.call(this,"placement")){const e=this.placement;delete this.placement,this.placement=e}}static get observedAttributes(){return[Ha.PLACEMENT,Ha.BOUNDS]}get placement(){return he(this,Ha.PLACEMENT)}set placement(e){le(this,Ha.PLACEMENT,e)}get bounds(){return he(this,Ha.BOUNDS)}set bounds(e){le(this,Ha.BOUNDS,e)}};n(rm,"MediaTooltip");let sn=rm;sn.shadowRootOptions={mode:"open"};sn.getTemplateHTML=RT;y.customElements.get("media-tooltip")||y.customElements.define("media-tooltip",sn);var rv=sn,fh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$q"),ke=n((t,e,i)=>(fh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$q"),Wa=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$q"),oo=n((t,e,i,a)=>(fh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$m"),LT=n((t,e,i)=>(fh(t,e,"access private method"),i),"__privateMethod$c"),qt,Er,Qi,Za,Wo,Uu,OE;const Oi={TOOLTIP_PLACEMENT:"tooltipplacement",DISABLED:"disabled",NO_TOOLTIP:"notooltip"};function CT(t,e={}){return`
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
        <template shadowrootmode="${rv.shadowRootOptions.mode}">
          ${rv.getTemplateHTML({})}
        </template>
        <slot name="tooltip-content">
          ${this.getTooltipContentHTML(t)}
        </slot>
      </media-tooltip>
    </slot>
  `}n(CT,"getTemplateHTML$e");function DT(t,e){return`
    <slot></slot>
  `}n(DT,"getSlotTemplateHTML$n");function MT(){return""}n(MT,"getTooltipContentHTML$g");const nm=class nm extends y.HTMLElement{constructor(){if(super(),Wa(this,Uu),Wa(this,qt,void 0),this.preventClick=!1,this.tooltipEl=null,Wa(this,Er,e=>{this.preventClick||this.handleClick(e),setTimeout(ke(this,Qi),0)}),Wa(this,Qi,()=>{var e,i;(i=(e=this.tooltipEl)==null?void 0:e.updateXOffset)==null||i.call(e)}),Wa(this,Za,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",ke(this,Za));return}this.preventClick||this.handleClick(e)}),Wa(this,Wo,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",ke(this,Za));return}this.addEventListener("keyup",ke(this,Za),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.tooltipEl=this.shadowRoot.querySelector("media-tooltip")}static get observedAttributes(){return["disabled",Oi.TOOLTIP_PLACEMENT,J.MEDIA_CONTROLLER,m.MEDIA_LANG]}enable(){this.addEventListener("click",ke(this,Er)),this.addEventListener("keydown",ke(this,Wo)),this.tabIndex=0}disable(){this.removeEventListener("click",ke(this,Er)),this.removeEventListener("keydown",ke(this,Wo)),this.removeEventListener("keyup",ke(this,Za)),this.tabIndex=-1}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===J.MEDIA_CONTROLLER?(i&&((s=(r=ke(this,qt))==null?void 0:r.unassociateElement)==null||s.call(r,this),oo(this,qt,null)),a&&this.isConnected&&(oo(this,qt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=ke(this,qt))==null?void 0:l.associateElement)==null||d.call(l,this))):e==="disabled"&&a!==i?a==null?this.enable():this.disable():e===Oi.TOOLTIP_PLACEMENT&&this.tooltipEl&&a!==i?this.tooltipEl.placement=a:e===m.MEDIA_LANG&&(this.shadowRoot.querySelector('slot[name="tooltip-content"]').innerHTML=this.constructor.getTooltipContentHTML()),ke(this,Qi).call(this)}connectedCallback(){var e,i,a;const{style:r}=Ce(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),this.hasAttribute("disabled")?this.disable():this.enable(),this.setAttribute("role","button");const s=this.getAttribute(J.MEDIA_CONTROLLER);s&&(oo(this,qt,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=ke(this,qt))==null?void 0:i.associateElement)==null||a.call(i,this)),y.customElements.whenDefined("media-tooltip").then(()=>LT(this,Uu,OE).call(this))}disconnectedCallback(){var e,i;this.disable(),(i=(e=ke(this,qt))==null?void 0:e.unassociateElement)==null||i.call(e,this),oo(this,qt,null),this.removeEventListener("mouseenter",ke(this,Qi)),this.removeEventListener("focus",ke(this,Qi)),this.removeEventListener("click",ke(this,Er))}get keysUsed(){return["Enter"," "]}get tooltipPlacement(){return he(this,Oi.TOOLTIP_PLACEMENT)}set tooltipPlacement(e){le(this,Oi.TOOLTIP_PLACEMENT,e)}get mediaController(){return he(this,J.MEDIA_CONTROLLER)}set mediaController(e){le(this,J.MEDIA_CONTROLLER,e)}get disabled(){return G(this,Oi.DISABLED)}set disabled(e){z(this,Oi.DISABLED,e)}get noTooltip(){return G(this,Oi.NO_TOOLTIP)}set noTooltip(e){z(this,Oi.NO_TOOLTIP,e)}handleClick(e){}};n(nm,"MediaChromeButton");let Ie=nm;qt=new WeakMap;Er=new WeakMap;Qi=new WeakMap;Za=new WeakMap;Wo=new WeakMap;Uu=new WeakSet;OE=n(function(){this.addEventListener("mouseenter",ke(this,Qi)),this.addEventListener("focus",ke(this,Qi)),this.addEventListener("click",ke(this,Er));const t=this.tooltipPlacement;t&&this.tooltipEl&&(this.tooltipEl.placement=t)},"setupTooltip_fn");Ie.shadowRootOptions={mode:"open"};Ie.getTemplateHTML=CT;Ie.getSlotTemplateHTML=DT;Ie.getTooltipContentHTML=MT;y.customElements.get("media-chrome-button")||y.customElements.define("media-chrome-button",Ie);const nv=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.13 3H3.87a.87.87 0 0 0-.87.87v13.26a.87.87 0 0 0 .87.87h3.4L9 16H5V5h16v11h-4l1.72 2h3.4a.87.87 0 0 0 .87-.87V3.87a.87.87 0 0 0-.86-.87Zm-8.75 11.44a.5.5 0 0 0-.76 0l-4.91 5.73a.5.5 0 0 0 .38.83h9.82a.501.501 0 0 0 .38-.83l-4.91-5.73Z"/>
</svg>
`;function OT(t){return`
    <style>
      :host([${m.MEDIA_IS_AIRPLAYING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${m.MEDIA_IS_AIRPLAYING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${m.MEDIA_IS_AIRPLAYING}]) slot[name=tooltip-enter],
      :host(:not([${m.MEDIA_IS_AIRPLAYING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${nv}</slot>
      <slot name="exit">${nv}</slot>
    </slot>
  `}n(OT,"getSlotTemplateHTML$m");function xT(){return`
    <slot name="tooltip-enter">${C("start airplay")}</slot>
    <slot name="tooltip-exit">${C("stop airplay")}</slot>
  `}n(xT,"getTooltipContentHTML$f");const sv=n(t=>{const e=t.mediaIsAirplaying?C("stop airplay"):C("start airplay");t.setAttribute("aria-label",e)},"updateAriaLabel$a"),sm=class sm extends Ie{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_IS_AIRPLAYING,m.MEDIA_AIRPLAY_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),sv(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_IS_AIRPLAYING&&sv(this)}get mediaIsAirplaying(){return G(this,m.MEDIA_IS_AIRPLAYING)}set mediaIsAirplaying(e){z(this,m.MEDIA_IS_AIRPLAYING,e)}get mediaAirplayUnavailable(){return he(this,m.MEDIA_AIRPLAY_UNAVAILABLE)}set mediaAirplayUnavailable(e){le(this,m.MEDIA_AIRPLAY_UNAVAILABLE,e)}handleClick(){const e=new y.CustomEvent(D.MEDIA_AIRPLAY_REQUEST,{composed:!0,bubbles:!0});this.dispatchEvent(e)}};n(sm,"MediaAirplayButton");let ys=sm;ys.getSlotTemplateHTML=OT;ys.getTooltipContentHTML=xT;y.customElements.get("media-airplay-button")||y.customElements.define("media-airplay-button",ys);const NT=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,PT=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function $T(t){return`
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
      <slot name="on">${NT}</slot>
      <slot name="off">${PT}</slot>
    </slot>
  `}n($T,"getSlotTemplateHTML$l");function UT(){return`
    <slot name="tooltip-enable">${C("Enable captions")}</slot>
    <slot name="tooltip-disable">${C("Disable captions")}</slot>
  `}n(UT,"getTooltipContentHTML$e");const ov=n(t=>{t.setAttribute("aria-checked",SE(t).toString())},"updateAriaChecked$1"),om=class om extends Ie{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_SUBTITLES_LIST,m.MEDIA_SUBTITLES_SHOWING]}connectedCallback(){super.connectedCallback(),this.setAttribute("role","button"),this.setAttribute("aria-label",C("closed captions")),ov(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_SUBTITLES_SHOWING&&ov(this)}get mediaSubtitlesList(){return lv(this,m.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){dv(this,m.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return lv(this,m.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){dv(this,m.MEDIA_SUBTITLES_SHOWING,e)}handleClick(){this.dispatchEvent(new y.CustomEvent(D.MEDIA_TOGGLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0}))}};n(om,"MediaCaptionsButton");let Ts=om;Ts.getSlotTemplateHTML=$T;Ts.getTooltipContentHTML=UT;const lv=n((t,e)=>{const i=t.getAttribute(e);return i?Dd(i):[]},"getSubtitlesListAttr$2"),dv=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=gs(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr$2");y.customElements.get("media-captions-button")||y.customElements.define("media-captions-button",Ts);const HT='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/></g></svg>',WT='<svg aria-hidden="true" viewBox="0 0 24 24"><g><path class="cast_caf_icon_arch0" d="M1,18 L1,21 L4,21 C4,19.3 2.66,18 1,18 L1,18 Z"/><path class="cast_caf_icon_arch1" d="M1,14 L1,16 C3.76,16 6,18.2 6,21 L8,21 C8,17.13 4.87,14 1,14 L1,14 Z"/><path class="cast_caf_icon_arch2" d="M1,10 L1,12 C5.97,12 10,16.0 10,21 L12,21 C12,14.92 7.07,10 1,10 L1,10 Z"/><path class="cast_caf_icon_box" d="M21,3 L3,3 C1.9,3 1,3.9 1,5 L1,8 L3,8 L3,5 L21,5 L21,19 L14,19 L14,21 L21,21 C22.1,21 23,20.1 23,19 L23,5 C23,3.9 22.1,3 21,3 L21,3 Z"/><path class="cast_caf_icon_boxfill" d="M5,7 L5,8.63 C8,8.6 13.37,14 13.37,17 L19,17 L19,7 Z"/></g></svg>';function BT(t){return`
    <style>
      :host([${m.MEDIA_IS_CASTING}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${m.MEDIA_IS_CASTING}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${m.MEDIA_IS_CASTING}]) slot[name=tooltip-enter],
      :host(:not([${m.MEDIA_IS_CASTING}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${HT}</slot>
      <slot name="exit">${WT}</slot>
    </slot>
  `}n(BT,"getSlotTemplateHTML$k");function FT(){return`
    <slot name="tooltip-enter">${C("Start casting")}</slot>
    <slot name="tooltip-exit">${C("Stop casting")}</slot>
  `}n(FT,"getTooltipContentHTML$d");const uv=n(t=>{const e=t.mediaIsCasting?C("stop casting"):C("start casting");t.setAttribute("aria-label",e)},"updateAriaLabel$9"),lm=class lm extends Ie{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_IS_CASTING,m.MEDIA_CAST_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),uv(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_IS_CASTING&&uv(this)}get mediaIsCasting(){return G(this,m.MEDIA_IS_CASTING)}set mediaIsCasting(e){z(this,m.MEDIA_IS_CASTING,e)}get mediaCastUnavailable(){return he(this,m.MEDIA_CAST_UNAVAILABLE)}set mediaCastUnavailable(e){le(this,m.MEDIA_CAST_UNAVAILABLE,e)}handleClick(){const e=this.mediaIsCasting?D.MEDIA_EXIT_CAST_REQUEST:D.MEDIA_ENTER_CAST_REQUEST;this.dispatchEvent(new y.CustomEvent(e,{composed:!0,bubbles:!0}))}};n(lm,"MediaCastButton");let As=lm;As.getSlotTemplateHTML=BT;As.getTooltipContentHTML=FT;y.customElements.get("media-cast-button")||y.customElements.define("media-cast-button",As);var Eh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$p"),Da=n((t,e,i)=>(Eh(t,e,"read from private field"),e.get(t)),"__privateGet$p"),fi=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$p"),_h=n((t,e,i,a)=>(Eh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$l"),da=n((t,e,i)=>(Eh(t,e,"access private method"),i),"__privateMethod$b"),Kl,ks,Na,Bo,Hu,Wu,xE,Bu,NE,Fu,PE,Ku,$E,Vu,UE;function KT(t){return`
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
  `}n(KT,"getTemplateHTML$d");function VT(t){return`
    <slot id="content"></slot>
  `}n(VT,"getSlotTemplateHTML$j");const gn={OPEN:"open",ANCHOR:"anchor"},dm=class dm extends y.HTMLElement{constructor(){super(),fi(this,Bo),fi(this,Wu),fi(this,Bu),fi(this,Fu),fi(this,Ku),fi(this,Vu),fi(this,Kl,!1),fi(this,ks,null),fi(this,Na,null)}static get observedAttributes(){return[gn.OPEN,gn.ANCHOR]}get open(){return G(this,gn.OPEN)}set open(e){z(this,gn.OPEN,e)}handleEvent(e){switch(e.type){case"invoke":da(this,Fu,PE).call(this,e);break;case"focusout":da(this,Ku,$E).call(this,e);break;case"keydown":da(this,Vu,UE).call(this,e);break}}connectedCallback(){da(this,Bo,Hu).call(this),this.role||(this.role="dialog"),this.addEventListener("invoke",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this)}disconnectedCallback(){this.removeEventListener("invoke",this),this.removeEventListener("focusout",this),this.removeEventListener("keydown",this)}attributeChangedCallback(e,i,a){da(this,Bo,Hu).call(this),e===gn.OPEN&&a!==i&&(this.open?da(this,Wu,xE).call(this):da(this,Bu,NE).call(this))}focus(){_h(this,ks,dh());const e=!this.dispatchEvent(new Event("focus",{composed:!0,cancelable:!0})),i=!this.dispatchEvent(new Event("focusin",{composed:!0,bubbles:!0,cancelable:!0}));if(e||i)return;const a=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');a?.focus()}get keysUsed(){return["Escape","Tab"]}};n(dm,"MediaChromeDialog");let ia=dm;Kl=new WeakMap;ks=new WeakMap;Na=new WeakMap;Bo=new WeakSet;Hu=n(function(){if(!Da(this,Kl)&&(_h(this,Kl,!0),!this.shadowRoot)){this.attachShadow(this.constructor.shadowRootOptions);const t=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(t),queueMicrotask(()=>{const{style:e}=Ce(this.shadowRoot,":host");e.setProperty("transition","display .15s, visibility .15s, opacity .15s ease-in, transform .15s ease-in")})}},"init_fn");Wu=new WeakSet;xE=n(function(){var t;(t=Da(this,Na))==null||t.setAttribute("aria-expanded","true"),this.dispatchEvent(new Event("open",{composed:!0,bubbles:!0})),this.addEventListener("transitionend",()=>this.focus(),{once:!0})},"handleOpen_fn$1");Bu=new WeakSet;NE=n(function(){var t;(t=Da(this,Na))==null||t.setAttribute("aria-expanded","false"),this.dispatchEvent(new Event("close",{composed:!0,bubbles:!0}))},"handleClosed_fn$1");Fu=new WeakSet;PE=n(function(t){_h(this,Na,t.relatedTarget),Mi(this,t.relatedTarget)||(this.open=!this.open)},"handleInvoke_fn$1");Ku=new WeakSet;$E=n(function(t){var e;Mi(this,t.relatedTarget)||((e=Da(this,ks))==null||e.focus(),Da(this,Na)&&Da(this,Na)!==t.relatedTarget&&this.open&&(this.open=!1))},"handleFocusOut_fn$1");Vu=new WeakSet;UE=n(function(t){var e,i,a,r,s;const{key:o,ctrlKey:l,altKey:d,metaKey:h}=t;l||d||h||this.keysUsed.includes(o)&&(t.preventDefault(),t.stopPropagation(),o==="Tab"?(t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()):o==="Escape"&&((s=Da(this,ks))==null||s.focus(),this.open=!1))},"handleKeyDown_fn$1");ia.shadowRootOptions={mode:"open"};ia.getTemplateHTML=KT;ia.getSlotTemplateHTML=VT;y.customElements.get("media-chrome-dialog")||y.customElements.define("media-chrome-dialog",ia);var bh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$o"),pe=n((t,e,i)=>(bh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$o"),$e=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$o"),Ui=n((t,e,i,a)=>(bh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$k"),Mt=n((t,e,i)=>(bh(t,e,"access private method"),i),"__privateMethod$a"),Yt,Od,Fo,Ko,Ot,Vl,Vo,qo,Yo,gh,HE,Go,qu,zo,Yu,ql,yh,Gu,WE,zu,BE,Qu,FE,ju,KE;function qT(t){return`
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
  `}n(qT,"getTemplateHTML$c");function YT(t){return""}n(YT,"getContainerTemplateHTML$1");const um=class um extends y.HTMLElement{constructor(){if(super(),$e(this,gh),$e(this,Go),$e(this,zo),$e(this,ql),$e(this,Gu),$e(this,zu),$e(this,Qu),$e(this,ju),$e(this,Yt,void 0),$e(this,Od,void 0),$e(this,Fo,void 0),$e(this,Ko,void 0),$e(this,Ot,{}),$e(this,Vl,[]),$e(this,Vo,()=>{if(this.range.matches(":focus-visible")){const{style:e}=Ce(this.shadowRoot,":host");e.setProperty("--_focus-visible-box-shadow","var(--_focus-box-shadow)")}}),$e(this,qo,()=>{const{style:e}=Ce(this.shadowRoot,":host");e.removeProperty("--_focus-visible-box-shadow")}),$e(this,Yo,()=>{const e=this.shadowRoot.querySelector("#segments-clipping");e&&e.parentNode.append(e)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes),i=this.constructor.getTemplateHTML(e);this.shadowRoot.setHTMLUnsafe?this.shadowRoot.setHTMLUnsafe(i):this.shadowRoot.innerHTML=i}this.container=this.shadowRoot.querySelector("#container"),Ui(this,Fo,this.shadowRoot.querySelector("#startpoint")),Ui(this,Ko,this.shadowRoot.querySelector("#endpoint")),this.range=this.shadowRoot.querySelector("#range"),this.appearance=this.shadowRoot.querySelector("#appearance")}static get observedAttributes(){return["disabled","aria-disabled",J.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===J.MEDIA_CONTROLLER?(i&&((s=(r=pe(this,Yt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Ui(this,Yt,null)),a&&this.isConnected&&(Ui(this,Yt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=pe(this,Yt))==null?void 0:l.associateElement)==null||d.call(l,this))):(e==="disabled"||e==="aria-disabled"&&i!==a)&&(a==null?(this.range.removeAttribute(e),Mt(this,Go,qu).call(this)):(this.range.setAttribute(e,a),Mt(this,zo,Yu).call(this)))}connectedCallback(){var e,i,a;const{style:r}=Ce(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`),pe(this,Ot).pointer=Ce(this.shadowRoot,"#pointer"),pe(this,Ot).progress=Ce(this.shadowRoot,"#progress"),pe(this,Ot).thumb=Ce(this.shadowRoot,'#thumb, ::slotted([slot="thumb"])'),pe(this,Ot).activeSegment=Ce(this.shadowRoot,"#segments-clipping rect:nth-child(0)");const s=this.getAttribute(J.MEDIA_CONTROLLER);s&&(Ui(this,Yt,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=pe(this,Yt))==null?void 0:i.associateElement)==null||a.call(i,this)),this.updateBar(),this.shadowRoot.addEventListener("focusin",pe(this,Vo)),this.shadowRoot.addEventListener("focusout",pe(this,qo)),Mt(this,Go,qu).call(this),Jr(this.container,pe(this,Yo))}disconnectedCallback(){var e,i;Mt(this,zo,Yu).call(this),(i=(e=pe(this,Yt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Ui(this,Yt,null),this.shadowRoot.removeEventListener("focusin",pe(this,Vo)),this.shadowRoot.removeEventListener("focusout",pe(this,qo)),en(this.container,pe(this,Yo))}updatePointerBar(e){var i;(i=pe(this,Ot).pointer)==null||i.style.setProperty("width",`${this.getPointerRatio(e)*100}%`)}updateBar(){var e,i;const a=this.range.valueAsNumber*100;(e=pe(this,Ot).progress)==null||e.style.setProperty("width",`${a}%`),(i=pe(this,Ot).thumb)==null||i.style.setProperty("left",`${a}%`)}updateSegments(e){const i=this.shadowRoot.querySelector("#segments-clipping");if(i.textContent="",this.container.classList.toggle("segments",!!e?.length),!e?.length)return;const a=[...new Set([+this.range.min,...e.flatMap(s=>[s.start,s.end]),+this.range.max])];Ui(this,Vl,[...a]);const r=a.pop();for(const[s,o]of a.entries()){const[l,d]=[s===0,s===a.length-1],h=l?"calc(var(--segments-gap) / -1)":`${o*100}%`,v=`calc(${((d?r:a[s+1])-o)*100}%${l||d?"":" - var(--segments-gap)"})`,c=we.createElementNS("http://www.w3.org/2000/svg","rect"),u=uh(this.shadowRoot,`#segments-clipping rect:nth-child(${s+1})`);u.style.setProperty("x",h),u.style.setProperty("width",v),i.append(c)}}getPointerRatio(e){return Uy(e.clientX,e.clientY,pe(this,Fo).getBoundingClientRect(),pe(this,Ko).getBoundingClientRect())}get dragging(){return this.hasAttribute("dragging")}handleEvent(e){switch(e.type){case"pointermove":Mt(this,ju,KE).call(this,e);break;case"input":this.updateBar();break;case"pointerenter":Mt(this,Gu,WE).call(this,e);break;case"pointerdown":Mt(this,ql,yh).call(this,e);break;case"pointerup":Mt(this,zu,BE).call(this);break;case"pointerleave":Mt(this,Qu,FE).call(this);break}}get keysUsed(){return["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"]}};n(um,"MediaChromeRange");let aa=um;Yt=new WeakMap;Od=new WeakMap;Fo=new WeakMap;Ko=new WeakMap;Ot=new WeakMap;Vl=new WeakMap;Vo=new WeakMap;qo=new WeakMap;Yo=new WeakMap;gh=new WeakSet;HE=n(function(t){const e=pe(this,Ot).activeSegment;if(!e)return;const i=this.getPointerRatio(t),r=`#segments-clipping rect:nth-child(${pe(this,Vl).findIndex((s,o,l)=>{const d=l[o+1];return d!=null&&i>=s&&i<=d})+1})`;(e.selectorText!=r||!e.style.transform)&&(e.selectorText=r,e.style.setProperty("transform","var(--media-range-segment-hover-transform, scaleY(2))"))},"updateActiveSegment_fn");Go=new WeakSet;qu=n(function(){this.hasAttribute("disabled")||!this.isConnected||(this.addEventListener("input",this),this.addEventListener("pointerdown",this),this.addEventListener("pointerenter",this))},"enableUserEvents_fn");zo=new WeakSet;Yu=n(function(){var t,e;this.removeEventListener("input",this),this.removeEventListener("pointerdown",this),this.removeEventListener("pointerenter",this),this.removeEventListener("pointerleave",this),(t=y.window)==null||t.removeEventListener("pointerup",this),(e=y.window)==null||e.removeEventListener("pointermove",this)},"disableUserEvents_fn");ql=new WeakSet;yh=n(function(t){var e;Ui(this,Od,t.composedPath().includes(this.range)),(e=y.window)==null||e.addEventListener("pointerup",this,{once:!0})},"handlePointerDown_fn");Gu=new WeakSet;WE=n(function(t){var e;t.pointerType!=="mouse"&&Mt(this,ql,yh).call(this,t),this.addEventListener("pointerleave",this,{once:!0}),(e=y.window)==null||e.addEventListener("pointermove",this)},"handlePointerEnter_fn");zu=new WeakSet;BE=n(function(){var t;(t=y.window)==null||t.removeEventListener("pointerup",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled")},"handlePointerUp_fn");Qu=new WeakSet;FE=n(function(){var t,e;this.removeEventListener("pointerleave",this),(t=y.window)==null||t.removeEventListener("pointermove",this),this.toggleAttribute("dragging",!1),this.range.disabled=this.hasAttribute("disabled"),(e=pe(this,Ot).activeSegment)==null||e.style.removeProperty("transform")},"handlePointerLeave_fn");ju=new WeakSet;KE=n(function(t){t.pointerType==="pen"&&t.buttons===0||(this.toggleAttribute("dragging",t.buttons===1||t.pointerType!=="mouse"),this.updatePointerBar(t),Mt(this,gh,HE).call(this,t),this.dragging&&(t.pointerType!=="mouse"||!pe(this,Od))&&(this.range.disabled=!0,this.range.valueAsNumber=this.getPointerRatio(t),this.range.dispatchEvent(new Event("input",{bubbles:!0,composed:!0}))))},"handlePointerMove_fn$1");aa.shadowRootOptions={mode:"open"};aa.getTemplateHTML=qT;aa.getContainerTemplateHTML=YT;y.customElements.get("media-chrome-range")||y.customElements.define("media-chrome-range",aa);var VE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$n"),lo=n((t,e,i)=>(VE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$n"),GT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$n"),uo=n((t,e,i,a)=>(VE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$j"),Gt;function zT(t){return`
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
  `}n(zT,"getTemplateHTML$b");const cm=class cm extends y.HTMLElement{constructor(){if(super(),GT(this,Gt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[J.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===J.MEDIA_CONTROLLER&&(i&&((s=(r=lo(this,Gt))==null?void 0:r.unassociateElement)==null||s.call(r,this),uo(this,Gt,null)),a&&this.isConnected&&(uo(this,Gt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=lo(this,Gt))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(J.MEDIA_CONTROLLER);r&&(uo(this,Gt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=lo(this,Gt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=lo(this,Gt))==null?void 0:e.unassociateElement)==null||i.call(e,this),uo(this,Gt,null)}};n(cm,"MediaControlBar");let Ss=cm;Gt=new WeakMap;Ss.shadowRootOptions={mode:"open"};Ss.getTemplateHTML=zT;y.customElements.get("media-control-bar")||y.customElements.define("media-control-bar",Ss);var qE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$m"),co=n((t,e,i)=>(qE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$m"),QT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$m"),ho=n((t,e,i,a)=>(qE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$i"),zt;function jT(t,e={}){return`
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
  `}n(jT,"getTemplateHTML$a");function ZT(t,e){return`
    <slot></slot>
  `}n(ZT,"getSlotTemplateHTML$i");const hm=class hm extends y.HTMLElement{constructor(){if(super(),QT(this,zt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[J.MEDIA_CONTROLLER]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===J.MEDIA_CONTROLLER&&(i&&((s=(r=co(this,zt))==null?void 0:r.unassociateElement)==null||s.call(r,this),ho(this,zt,null)),a&&this.isConnected&&(ho(this,zt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=co(this,zt))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const{style:r}=Ce(this.shadowRoot,":host");r.setProperty("display",`var(--media-control-display, var(--${this.localName}-display, inline-flex))`);const s=this.getAttribute(J.MEDIA_CONTROLLER);s&&(ho(this,zt,(e=this.getRootNode())==null?void 0:e.getElementById(s)),(a=(i=co(this,zt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=co(this,zt))==null?void 0:e.unassociateElement)==null||i.call(e,this),ho(this,zt,null)}};n(hm,"MediaTextDisplay");let ci=hm;zt=new WeakMap;ci.shadowRootOptions={mode:"open"};ci.getTemplateHTML=jT;ci.getSlotTemplateHTML=ZT;y.customElements.get("media-text-display")||y.customElements.define("media-text-display",ci);var YE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$l"),cv=n((t,e,i)=>(YE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$l"),XT=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$l"),JT=n((t,e,i,a)=>(YE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$h"),Hn;function eA(t,e){return`
    <slot>${ta(e.mediaDuration)}</slot>
  `}n(eA,"getSlotTemplateHTML$h");const mm=class mm extends ci{constructor(){var e;super(),XT(this,Hn,void 0),JT(this,Hn,this.shadowRoot.querySelector("slot")),cv(this,Hn).textContent=ta((e=this.mediaDuration)!=null?e:0)}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_DURATION]}attributeChangedCallback(e,i,a){e===m.MEDIA_DURATION&&(cv(this,Hn).textContent=ta(+a)),super.attributeChangedCallback(e,i,a)}get mediaDuration(){return se(this,m.MEDIA_DURATION)}set mediaDuration(e){fe(this,m.MEDIA_DURATION,e)}};n(mm,"MediaDurationDisplay");let Yl=mm;Hn=new WeakMap;Yl.getSlotTemplateHTML=eA;y.customElements.get("media-duration-display")||y.customElements.define("media-duration-display",Yl);const tA={2:C("Network Error"),3:C("Decode Error"),4:C("Source Not Supported"),5:C("Encryption Error")},iA={2:C("A network error caused the media download to fail."),3:C("A media error caused playback to be aborted. The media could be corrupt or your browser does not support this format."),4:C("An unsupported error occurred. The server or network failed, or your browser does not support this format."),5:C("The media is encrypted and there are no keys to decrypt it.")},Th=n(t=>{var e,i;return t.code===1?null:{title:(e=tA[t.code])!=null?e:`Error ${t.code}`,message:(i=iA[t.code])!=null?i:t.message}},"formatError");var GE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$k"),aA=n((t,e,i)=>(GE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$k"),rA=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$k"),nA=n((t,e,i,a)=>(GE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$g"),Qo;function sA(t){return`
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
      ${zE({code:+t.mediaerrorcode,message:t.mediaerrormessage})}
    </slot>
  `}n(sA,"getSlotTemplateHTML$g");function oA(t){return t.code&&Th(t)!==null}n(oA,"shouldOpenErrorDialog");function zE(t){var e;const{title:i,message:a}=(e=Th(t))!=null?e:{};let r="";return i&&(r+=`<slot name="error-${t.code}-title"><h3>${i}</h3></slot>`),a&&(r+=`<slot name="error-${t.code}-message"><p>${a}</p></slot>`),r}n(zE,"formatErrorMessage");const hv=[m.MEDIA_ERROR_CODE,m.MEDIA_ERROR_MESSAGE],pm=class pm extends ia{constructor(){super(...arguments),rA(this,Qo,null)}static get observedAttributes(){return[...super.observedAttributes,...hv]}formatErrorMessage(e){return this.constructor.formatErrorMessage(e)}attributeChangedCallback(e,i,a){var r;if(super.attributeChangedCallback(e,i,a),!hv.includes(e))return;const s=(r=this.mediaError)!=null?r:{code:this.mediaErrorCode,message:this.mediaErrorMessage};if(this.open=oA(s),this.open&&(this.shadowRoot.querySelector("slot").name=`error-${this.mediaErrorCode}`,this.shadowRoot.querySelector("#content").innerHTML=this.formatErrorMessage(s),!this.hasAttribute("aria-label"))){const{title:o}=Th(s);o&&this.setAttribute("aria-label",o)}}get mediaError(){return aA(this,Qo)}set mediaError(e){nA(this,Qo,e)}get mediaErrorCode(){return se(this,"mediaerrorcode")}set mediaErrorCode(e){fe(this,"mediaerrorcode",e)}get mediaErrorMessage(){return he(this,"mediaerrormessage")}set mediaErrorMessage(e){le(this,"mediaerrormessage",e)}};n(pm,"MediaErrorDialog");let on=pm;Qo=new WeakMap;on.getSlotTemplateHTML=sA;on.formatErrorMessage=zE;y.customElements.get("media-error-dialog")||y.customElements.define("media-error-dialog",on);var QE=on,lA=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$j"),xi=n((t,e,i)=>(lA(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$j"),mv=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$j"),Xa,Ja;function dA(t){return`
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
      ${uA()}
    </slot>
  `}n(dA,"getSlotTemplateHTML$f");function uA(){return`
    <h2>Keyboard Shortcuts</h2>
    <table class="shortcuts-table">${[{keys:["Space","k"],description:"Toggle Playback"},{keys:["m"],description:"Toggle mute"},{keys:["f"],description:"Toggle fullscreen"},{keys:["c"],description:"Toggle captions or subtitles, if available"},{keys:["p"],description:"Toggle Picture in Picture"},{keys:["←","j"],description:"Seek back 10s"},{keys:["→","l"],description:"Seek forward 10s"},{keys:["↑"],description:"Turn volume up"},{keys:["↓"],description:"Turn volume down"},{keys:["< (SHIFT+,)"],description:"Decrease playback rate"},{keys:["> (SHIFT+.)"],description:"Increase playback rate"}].map(({keys:i,description:a})=>`
      <tr>
        <td>
          <div class="key-combo">${i.map((s,o)=>o>0?`<span class="key-separator">or</span><span class="key">${s}</span>`:`<span class="key">${s}</span>`).join("")}</div>
        </td>
        <td class="description">${a}</td>
      </tr>
    `).join("")}</table>
  `}n(uA,"formatKeyboardShortcuts");const vm=class vm extends ia{constructor(){super(...arguments),mv(this,Xa,e=>{var i;if(!this.open)return;const a=(i=this.shadowRoot)==null?void 0:i.querySelector("#content");if(!a)return;const r=e.composedPath(),s=r[0]===this||r.includes(this),o=r.includes(a);s&&!o&&(this.open=!1)}),mv(this,Ja,e=>{if(!this.open)return;const i=e.shiftKey&&(e.key==="/"||e.key==="?");(e.key==="Escape"||i)&&!e.ctrlKey&&!e.altKey&&!e.metaKey&&(this.open=!1,e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),this.open&&(this.addEventListener("click",xi(this,Xa)),document.addEventListener("keydown",xi(this,Ja)))}disconnectedCallback(){this.removeEventListener("click",xi(this,Xa)),document.removeEventListener("keydown",xi(this,Ja))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e==="open"&&(this.open?(this.addEventListener("click",xi(this,Xa)),document.addEventListener("keydown",xi(this,Ja))):(this.removeEventListener("click",xi(this,Xa)),document.removeEventListener("keydown",xi(this,Ja))))}};n(vm,"MediaKeyboardShortcutsDialog");let Gl=vm;Xa=new WeakMap;Ja=new WeakMap;Gl.getSlotTemplateHTML=dA;y.customElements.get("media-keyboard-shortcuts-dialog")||y.customElements.define("media-keyboard-shortcuts-dialog",Gl);var jE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$i"),cA=n((t,e,i)=>(jE(t,e,"read from private field"),e.get(t)),"__privateGet$i"),hA=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$i"),mA=n((t,e,i,a)=>(jE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$f"),jo;const pA=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M16 3v2.5h3.5V9H22V3h-6ZM4 9h2.5V5.5H10V3H4v6Zm15.5 9.5H16V21h6v-6h-2.5v3.5ZM6.5 15H4v6h6v-2.5H6.5V15Z"/>
</svg>`,vA=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M18.5 6.5V3H16v6h6V6.5h-3.5ZM16 21h2.5v-3.5H22V15h-6v6ZM4 17.5h3.5V21H10v-6H4v2.5Zm3.5-11H4V9h6V3H7.5v3.5Z"/>
</svg>`;function fA(t){return`
    <style>
      :host([${m.MEDIA_IS_FULLSCREEN}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      
      :host(:not([${m.MEDIA_IS_FULLSCREEN}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${m.MEDIA_IS_FULLSCREEN}]) slot[name=tooltip-enter],
      :host(:not([${m.MEDIA_IS_FULLSCREEN}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${pA}</slot>
      <slot name="exit">${vA}</slot>
    </slot>
  `}n(fA,"getSlotTemplateHTML$e");function EA(){return`
    <slot name="tooltip-enter">${C("Enter fullscreen mode")}</slot>
    <slot name="tooltip-exit">${C("Exit fullscreen mode")}</slot>
  `}n(EA,"getTooltipContentHTML$c");const pv=n(t=>{const e=t.mediaIsFullscreen?C("exit fullscreen mode"):C("enter fullscreen mode");t.setAttribute("aria-label",e)},"updateAriaLabel$8"),fm=class fm extends Ie{constructor(){super(...arguments),hA(this,jo,null)}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_IS_FULLSCREEN,m.MEDIA_FULLSCREEN_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),pv(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_IS_FULLSCREEN&&pv(this)}get mediaFullscreenUnavailable(){return he(this,m.MEDIA_FULLSCREEN_UNAVAILABLE)}set mediaFullscreenUnavailable(e){le(this,m.MEDIA_FULLSCREEN_UNAVAILABLE,e)}get mediaIsFullscreen(){return G(this,m.MEDIA_IS_FULLSCREEN)}set mediaIsFullscreen(e){z(this,m.MEDIA_IS_FULLSCREEN,e)}handleClick(e){mA(this,jo,e);const i=cA(this,jo)instanceof PointerEvent,a=this.mediaIsFullscreen?new y.CustomEvent(D.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0}):new y.CustomEvent(D.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0,detail:i});this.dispatchEvent(a)}};n(fm,"MediaFullscreenButton");let ws=fm;jo=new WeakMap;ws.getSlotTemplateHTML=fA;ws.getTooltipContentHTML=EA;y.customElements.get("media-fullscreen-button")||y.customElements.define("media-fullscreen-button",ws);const{MEDIA_TIME_IS_LIVE:Zo,MEDIA_PAUSED:as}=m,{MEDIA_SEEK_TO_LIVE_REQUEST:_A,MEDIA_PLAY_REQUEST:bA}=D,gA='<svg viewBox="0 0 6 12" aria-hidden="true"><circle cx="3" cy="6" r="2"></circle></svg>';function yA(t){return`
    <style>
      :host { --media-tooltip-display: none; }
      
      slot[name=indicator] > *,
      :host ::slotted([slot=indicator]) {
        
        min-width: auto;
        fill: var(--media-live-button-icon-color, rgb(140, 140, 140));
        color: var(--media-live-button-icon-color, rgb(140, 140, 140));
      }

      :host([${Zo}]:not([${as}])) slot[name=indicator] > *,
      :host([${Zo}]:not([${as}])) ::slotted([slot=indicator]) {
        fill: var(--media-live-button-indicator-color, rgb(255, 0, 0));
        color: var(--media-live-button-indicator-color, rgb(255, 0, 0));
      }

      :host([${Zo}]:not([${as}])) {
        cursor: var(--media-cursor, not-allowed);
      }

      slot[name=text]{
        text-transform: uppercase;
      }

    </style>

    <slot name="indicator">${gA}</slot>
    
    <slot name="spacer">&nbsp;</slot><slot name="text">${C("live")}</slot>
  `}n(yA,"getSlotTemplateHTML$d");const vv=n(t=>{var e;const i=t.mediaPaused||!t.mediaTimeIsLive,a=C(i?"seek to live":"playing live");t.setAttribute("aria-label",a);const r=(e=t.shadowRoot)==null?void 0:e.querySelector('slot[name="text"]');r&&(r.textContent=C("live")),i?t.removeAttribute("aria-disabled"):t.setAttribute("aria-disabled","true")},"updateAriaAttributes"),Em=class Em extends Ie{static get observedAttributes(){return[...super.observedAttributes,Zo,as]}connectedCallback(){super.connectedCallback(),vv(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),vv(this)}get mediaPaused(){return G(this,m.MEDIA_PAUSED)}set mediaPaused(e){z(this,m.MEDIA_PAUSED,e)}get mediaTimeIsLive(){return G(this,m.MEDIA_TIME_IS_LIVE)}set mediaTimeIsLive(e){z(this,m.MEDIA_TIME_IS_LIVE,e)}handleClick(){!this.mediaPaused&&this.mediaTimeIsLive||(this.dispatchEvent(new y.CustomEvent(_A,{composed:!0,bubbles:!0})),this.hasAttribute(as)&&this.dispatchEvent(new y.CustomEvent(bA,{composed:!0,bubbles:!0})))}};n(Em,"MediaLiveButton");let zl=Em;zl.getSlotTemplateHTML=yA;y.customElements.get("media-live-button")||y.customElements.define("media-live-button",zl);var ZE=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$h"),yn=n((t,e,i)=>(ZE(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$h"),fv=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$h"),Tn=n((t,e,i,a)=>(ZE(t,e,"write to private field"),e.set(t,i),i),"__privateSet$e"),Qt,Xo;const mo={LOADING_DELAY:"loadingdelay",NO_AUTOHIDE:"noautohide"},XE=500,TA=`
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
`;function AA(t){return`
    <style>
      :host {
        display: var(--media-control-display, var(--media-loading-indicator-display, inline-block));
        vertical-align: middle;
        box-sizing: border-box;
        --_loading-indicator-delay: var(--media-loading-indicator-transition-delay, ${XE}ms);
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

      :host([${m.MEDIA_LOADING}]:not([${m.MEDIA_PAUSED}])) slot[name=icon] > *,
      :host([${m.MEDIA_LOADING}]:not([${m.MEDIA_PAUSED}])) ::slotted([slot=icon]) {
        opacity: var(--media-loading-indicator-opacity, 1);
        transition: opacity 0.15s var(--_loading-indicator-delay);
      }

      :host #status {
        visibility: var(--media-loading-indicator-opacity, hidden);
        transition: visibility 0.15s;
      }

      :host([${m.MEDIA_LOADING}]:not([${m.MEDIA_PAUSED}])) #status {
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

    <slot name="icon">${TA}</slot>
    <div id="status" role="status" aria-live="polite">${C("media loading")}</div>
  `}n(AA,"getTemplateHTML$9");const _m=class _m extends y.HTMLElement{constructor(){if(super(),fv(this,Qt,void 0),fv(this,Xo,XE),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[J.MEDIA_CONTROLLER,m.MEDIA_PAUSED,m.MEDIA_LOADING,mo.LOADING_DELAY]}attributeChangedCallback(e,i,a){var r,s,o,l,d;e===mo.LOADING_DELAY&&i!==a?this.loadingDelay=Number(a):e===J.MEDIA_CONTROLLER&&(i&&((s=(r=yn(this,Qt))==null?void 0:r.unassociateElement)==null||s.call(r,this),Tn(this,Qt,null)),a&&this.isConnected&&(Tn(this,Qt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=yn(this,Qt))==null?void 0:l.associateElement)==null||d.call(l,this)))}connectedCallback(){var e,i,a;const r=this.getAttribute(J.MEDIA_CONTROLLER);r&&(Tn(this,Qt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=yn(this,Qt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=yn(this,Qt))==null?void 0:e.unassociateElement)==null||i.call(e,this),Tn(this,Qt,null)}get loadingDelay(){return yn(this,Xo)}set loadingDelay(e){Tn(this,Xo,e);const{style:i}=Ce(this.shadowRoot,":host");i.setProperty("--_loading-indicator-delay",`var(--media-loading-indicator-transition-delay, ${e}ms)`)}get mediaPaused(){return G(this,m.MEDIA_PAUSED)}set mediaPaused(e){z(this,m.MEDIA_PAUSED,e)}get mediaLoading(){return G(this,m.MEDIA_LOADING)}set mediaLoading(e){z(this,m.MEDIA_LOADING,e)}get mediaController(){return he(this,J.MEDIA_CONTROLLER)}set mediaController(e){le(this,J.MEDIA_CONTROLLER,e)}get noAutohide(){return G(this,mo.NO_AUTOHIDE)}set noAutohide(e){z(this,mo.NO_AUTOHIDE,e)}};n(_m,"MediaLoadingIndicator");let Is=_m;Qt=new WeakMap;Xo=new WeakMap;Is.shadowRootOptions={mode:"open"};Is.getTemplateHTML=AA;y.customElements.get("media-loading-indicator")||y.customElements.define("media-loading-indicator",Is);const kA=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M16.5 12A4.5 4.5 0 0 0 14 8v2.18l2.45 2.45a4.22 4.22 0 0 0 .05-.63Zm2.5 0a6.84 6.84 0 0 1-.54 2.64L20 16.15A8.8 8.8 0 0 0 21 12a9 9 0 0 0-7-8.77v2.06A7 7 0 0 1 19 12ZM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25A6.92 6.92 0 0 1 14 18.7v2.06A9 9 0 0 0 17.69 19l2 2.05L21 19.73l-9-9L4.27 3ZM12 4 9.91 6.09 12 8.18V4Z"/>
</svg>`,Ev=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4Z"/>
</svg>`,SA=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.47 4.47 0 0 0 2.5-4ZM14 3.23v2.06a7 7 0 0 1 0 13.42v2.06a9 9 0 0 0 0-17.54Z"/>
</svg>`;function wA(t){return`
    <style>
      :host(:not([${m.MEDIA_VOLUME_LEVEL}])) slot[name=icon] slot:not([name=high]),
      :host([${m.MEDIA_VOLUME_LEVEL}=high]) slot[name=icon] slot:not([name=high]) {
        display: none !important;
      }

      :host([${m.MEDIA_VOLUME_LEVEL}=off]) slot[name=icon] slot:not([name=off]) {
        display: none !important;
      }

      :host([${m.MEDIA_VOLUME_LEVEL}=low]) slot[name=icon] slot:not([name=low]) {
        display: none !important;
      }

      :host([${m.MEDIA_VOLUME_LEVEL}=medium]) slot[name=icon] slot:not([name=medium]) {
        display: none !important;
      }

      :host(:not([${m.MEDIA_VOLUME_LEVEL}=off])) slot[name=tooltip-unmute],
      :host([${m.MEDIA_VOLUME_LEVEL}=off]) slot[name=tooltip-mute] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="off">${kA}</slot>
      <slot name="low">${Ev}</slot>
      <slot name="medium">${Ev}</slot>
      <slot name="high">${SA}</slot>
    </slot>
  `}n(wA,"getSlotTemplateHTML$c");function IA(){return`
    <slot name="tooltip-mute">${C("Mute")}</slot>
    <slot name="tooltip-unmute">${C("Unmute")}</slot>
  `}n(IA,"getTooltipContentHTML$b");const _v=n(t=>{const e=t.mediaVolumeLevel==="off",i=C(e?"unmute":"mute");t.setAttribute("aria-label",i)},"updateAriaLabel$7"),bm=class bm extends Ie{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_VOLUME_LEVEL]}connectedCallback(){super.connectedCallback(),_v(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_VOLUME_LEVEL&&_v(this)}get mediaVolumeLevel(){return he(this,m.MEDIA_VOLUME_LEVEL)}set mediaVolumeLevel(e){le(this,m.MEDIA_VOLUME_LEVEL,e)}handleClick(){const e=this.mediaVolumeLevel==="off"?D.MEDIA_UNMUTE_REQUEST:D.MEDIA_MUTE_REQUEST;this.dispatchEvent(new y.CustomEvent(e,{composed:!0,bubbles:!0}))}};n(bm,"MediaMuteButton");let Rs=bm;Rs.getSlotTemplateHTML=wA;Rs.getTooltipContentHTML=IA;y.customElements.get("media-mute-button")||y.customElements.define("media-mute-button",Rs);const bv=`<svg aria-hidden="true" viewBox="0 0 28 24">
  <path d="M24 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1Zm-1 16H5V5h18v14Zm-3-8h-7v5h7v-5Z"/>
</svg>`;function RA(t){return`
    <style>
      :host([${m.MEDIA_IS_PIP}]) slot[name=icon] slot:not([name=exit]) {
        display: none !important;
      }

      :host(:not([${m.MEDIA_IS_PIP}])) slot[name=icon] slot:not([name=enter]) {
        display: none !important;
      }

      :host([${m.MEDIA_IS_PIP}]) slot[name=tooltip-enter],
      :host(:not([${m.MEDIA_IS_PIP}])) slot[name=tooltip-exit] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="enter">${bv}</slot>
      <slot name="exit">${bv}</slot>
    </slot>
  `}n(RA,"getSlotTemplateHTML$b");function LA(){return`
    <slot name="tooltip-enter">${C("Enter picture in picture mode")}</slot>
    <slot name="tooltip-exit">${C("Exit picture in picture mode")}</slot>
  `}n(LA,"getTooltipContentHTML$a");const gv=n(t=>{const e=t.mediaIsPip?C("exit picture in picture mode"):C("enter picture in picture mode");t.setAttribute("aria-label",e)},"updateAriaLabel$6"),gm=class gm extends Ie{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_IS_PIP,m.MEDIA_PIP_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),gv(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_IS_PIP&&gv(this)}get mediaPipUnavailable(){return he(this,m.MEDIA_PIP_UNAVAILABLE)}set mediaPipUnavailable(e){le(this,m.MEDIA_PIP_UNAVAILABLE,e)}get mediaIsPip(){return G(this,m.MEDIA_IS_PIP)}set mediaIsPip(e){z(this,m.MEDIA_IS_PIP,e)}handleClick(){const e=this.mediaIsPip?D.MEDIA_EXIT_PIP_REQUEST:D.MEDIA_ENTER_PIP_REQUEST;this.dispatchEvent(new y.CustomEvent(e,{composed:!0,bubbles:!0}))}};n(gm,"MediaPipButton");let Ls=gm;Ls.getSlotTemplateHTML=RA;Ls.getTooltipContentHTML=LA;y.customElements.get("media-pip-button")||y.customElements.define("media-pip-button",Ls);var CA=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$g"),Ba=n((t,e,i)=>(CA(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$g"),DA=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$g"),Hi;const jd={RATES:"rates"},JE=[1,1.2,1.5,1.7,2],_r=1;function MA(t){return`
    <style>
      :host {
        min-width: 5ch;
        padding: var(--media-button-padding, var(--media-control-padding, 10px 5px));
      }
    </style>
    <slot name="icon">${t.mediaplaybackrate||_r}x</slot>
  `}n(MA,"getSlotTemplateHTML$a");function OA(){return C("Playback rate")}n(OA,"getTooltipContentHTML$9");const ym=class ym extends Ie{constructor(){var e;super(),DA(this,Hi,new bs(this,jd.RATES,{defaultValue:JE})),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:_r}x`}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_PLAYBACK_RATE,jd.RATES]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===jd.RATES&&(Ba(this,Hi).value=a),e===m.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,s=Number.isNaN(r)?_r:r;this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",C("Playback rate {playbackRate}",{playbackRate:s}))}}get rates(){return Ba(this,Hi)}set rates(e){e?Array.isArray(e)?Ba(this,Hi).value=e.join(" "):typeof e=="string"&&(Ba(this,Hi).value=e):Ba(this,Hi).value=""}get mediaPlaybackRate(){return se(this,m.MEDIA_PLAYBACK_RATE,_r)}set mediaPlaybackRate(e){fe(this,m.MEDIA_PLAYBACK_RATE,e)}handleClick(){var e,i;const a=Array.from(Ba(this,Hi).values(),o=>+o).sort((o,l)=>o-l),r=(i=(e=a.find(o=>o>this.mediaPlaybackRate))!=null?e:a[0])!=null?i:_r,s=new y.CustomEvent(D.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:r});this.dispatchEvent(s)}};n(ym,"MediaPlaybackRateButton");let Cs=ym;Hi=new WeakMap;Cs.getSlotTemplateHTML=MA;Cs.getTooltipContentHTML=OA;y.customElements.get("media-playback-rate-button")||y.customElements.define("media-playback-rate-button",Cs);const xA=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="m6 21 15-9L6 3v18Z"/>
</svg>`,NA=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M6 20h4V4H6v16Zm8-16v16h4V4h-4Z"/>
</svg>`;function PA(t){return`
    <style>
      :host([${m.MEDIA_PAUSED}]) slot[name=pause],
      :host(:not([${m.MEDIA_PAUSED}])) slot[name=play] {
        display: none !important;
      }

      :host([${m.MEDIA_PAUSED}]) slot[name=tooltip-pause],
      :host(:not([${m.MEDIA_PAUSED}])) slot[name=tooltip-play] {
        display: none;
      }
    </style>

    <slot name="icon">
      <slot name="play">${xA}</slot>
      <slot name="pause">${NA}</slot>
    </slot>
  `}n(PA,"getSlotTemplateHTML$9");function $A(){return`
    <slot name="tooltip-play">${C("Play")}</slot>
    <slot name="tooltip-pause">${C("Pause")}</slot>
  `}n($A,"getTooltipContentHTML$8");const yv=n(t=>{const e=t.mediaPaused?C("play"):C("pause");t.setAttribute("aria-label",e)},"updateAriaLabel$5"),Tm=class Tm extends Ie{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_PAUSED,m.MEDIA_ENDED]}connectedCallback(){super.connectedCallback(),yv(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===m.MEDIA_PAUSED||e===m.MEDIA_LANG)&&yv(this)}get mediaPaused(){return G(this,m.MEDIA_PAUSED)}set mediaPaused(e){z(this,m.MEDIA_PAUSED,e)}handleClick(){const e=this.mediaPaused?D.MEDIA_PLAY_REQUEST:D.MEDIA_PAUSE_REQUEST;this.dispatchEvent(new y.CustomEvent(e,{composed:!0,bubbles:!0}))}};n(Tm,"MediaPlayButton");let Ds=Tm;Ds.getSlotTemplateHTML=PA;Ds.getTooltipContentHTML=$A;y.customElements.get("media-play-button")||y.customElements.define("media-play-button",Ds);const Ht={PLACEHOLDER_SRC:"placeholdersrc",SRC:"src"};function UA(t){return`
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
  `}n(UA,"getTemplateHTML$8");const HA=n(t=>{t.style.removeProperty("background-image")},"unsetBackgroundImage"),WA=n((t,e)=>{t.style["background-image"]=`url('${e}')`},"setBackgroundImage"),Am=class Am extends y.HTMLElement{static get observedAttributes(){return[Ht.PLACEHOLDER_SRC,Ht.SRC]}constructor(){if(super(),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.image=this.shadowRoot.querySelector("#image")}attributeChangedCallback(e,i,a){e===Ht.SRC&&(a==null?this.image.removeAttribute(Ht.SRC):this.image.setAttribute(Ht.SRC,a)),e===Ht.PLACEHOLDER_SRC&&(a==null?HA(this.image):WA(this.image,a))}get placeholderSrc(){return he(this,Ht.PLACEHOLDER_SRC)}set placeholderSrc(e){le(this,Ht.SRC,e)}get src(){return he(this,Ht.SRC)}set src(e){le(this,Ht.SRC,e)}};n(Am,"MediaPosterImage");let Ms=Am;Ms.shadowRootOptions={mode:"open"};Ms.getTemplateHTML=UA;y.customElements.get("media-poster-image")||y.customElements.define("media-poster-image",Ms);var e_=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$f"),BA=n((t,e,i)=>(e_(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$f"),FA=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$f"),KA=n((t,e,i,a)=>(e_(t,e,"write to private field"),e.set(t,i),i),"__privateSet$d"),Jo;const km=class km extends ci{constructor(){super(),FA(this,Jo,void 0),KA(this,Jo,this.shadowRoot.querySelector("slot"))}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_PREVIEW_CHAPTER,m.MEDIA_LANG]}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),(e===m.MEDIA_PREVIEW_CHAPTER||e===m.MEDIA_LANG)&&a!==i&&a!=null)if(BA(this,Jo).textContent=a,a!==""){const r=C("chapter: {chapterName}",{chapterName:a});this.setAttribute("aria-valuetext",r)}else this.removeAttribute("aria-valuetext")}get mediaPreviewChapter(){return he(this,m.MEDIA_PREVIEW_CHAPTER)}set mediaPreviewChapter(e){le(this,m.MEDIA_PREVIEW_CHAPTER,e)}};n(km,"MediaPreviewChapterDisplay");let Zu=km;Jo=new WeakMap;y.customElements.get("media-preview-chapter-display")||y.customElements.define("media-preview-chapter-display",Zu);var t_=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$e"),po=n((t,e,i)=>(t_(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$e"),VA=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$e"),vo=n((t,e,i,a)=>(t_(t,e,"write to private field"),e.set(t,i),i),"__privateSet$c"),jt;function qA(t){return`
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
  `}n(qA,"getTemplateHTML$7");const Sm=class Sm extends y.HTMLElement{constructor(){if(super(),VA(this,jt,void 0),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[J.MEDIA_CONTROLLER,m.MEDIA_PREVIEW_IMAGE,m.MEDIA_PREVIEW_COORDS]}connectedCallback(){var e,i,a;const r=this.getAttribute(J.MEDIA_CONTROLLER);r&&(vo(this,jt,(e=this.getRootNode())==null?void 0:e.getElementById(r)),(a=(i=po(this,jt))==null?void 0:i.associateElement)==null||a.call(i,this))}disconnectedCallback(){var e,i;(i=(e=po(this,jt))==null?void 0:e.unassociateElement)==null||i.call(e,this),vo(this,jt,null)}attributeChangedCallback(e,i,a){var r,s,o,l,d;[m.MEDIA_PREVIEW_IMAGE,m.MEDIA_PREVIEW_COORDS].includes(e)&&this.update(),e===J.MEDIA_CONTROLLER&&(i&&((s=(r=po(this,jt))==null?void 0:r.unassociateElement)==null||s.call(r,this),vo(this,jt,null)),a&&this.isConnected&&(vo(this,jt,(o=this.getRootNode())==null?void 0:o.getElementById(a)),(d=(l=po(this,jt))==null?void 0:l.associateElement)==null||d.call(l,this)))}get mediaPreviewImage(){return he(this,m.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){le(this,m.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewCoords(){const e=this.getAttribute(m.MEDIA_PREVIEW_COORDS);if(e)return e.split(/\s+/).map(i=>+i)}set mediaPreviewCoords(e){if(!e){this.removeAttribute(m.MEDIA_PREVIEW_COORDS);return}this.setAttribute(m.MEDIA_PREVIEW_COORDS,e.join(" "))}update(){const e=this.mediaPreviewCoords,i=this.mediaPreviewImage;if(!(e&&i))return;const[a,r,s,o]=e,l=i.split("#")[0],d=getComputedStyle(this),{maxWidth:h,maxHeight:p,minWidth:v,minHeight:c}=d,u=d.getPropertyValue("--media-preview-thumbnail-object-fit").trim()||"contain";let f,_;if(u==="fill"){const M=parseInt(h)/s,H=parseInt(p)/o,F=parseInt(v)/s,j=parseInt(c)/o;f=M<1?M:Math.max(M,F),_=H<1?H:Math.max(H,j)}else{const M=Math.min(parseInt(h)/s,parseInt(p)/o),H=Math.max(parseInt(v)/s,parseInt(c)/o),j=M<1?M:H>1?H:1;f=j,_=j}const{style:b}=Ce(this.shadowRoot,":host"),T=Ce(this.shadowRoot,"img").style,A=this.shadowRoot.querySelector("img"),w=Math.min(f,_)<1?"min":"max";b.setProperty(`${w}-width`,"initial","important"),b.setProperty(`${w}-height`,"initial","important"),b.width=`${s*f}px`,b.height=`${o*_}px`;const O=n(()=>{T.width=`${this.imgWidth*f}px`,T.height=`${this.imgHeight*_}px`,T.display="block"},"resize");A.src!==l&&(A.onload=()=>{this.imgWidth=A.naturalWidth,this.imgHeight=A.naturalHeight,O(),A.onload=null},A.src=l,O()),O(),T.transform=`translate(-${a*f}px, -${r*_}px)`}};n(Sm,"MediaPreviewThumbnail");let ln=Sm;jt=new WeakMap;ln.shadowRootOptions={mode:"open"};ln.getTemplateHTML=qA;y.customElements.get("media-preview-thumbnail")||y.customElements.define("media-preview-thumbnail",ln);var Tv=ln,i_=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$d"),Av=n((t,e,i)=>(i_(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$d"),YA=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$d"),GA=n((t,e,i,a)=>(i_(t,e,"write to private field"),e.set(t,i),i),"__privateSet$b"),Wn;const wm=class wm extends ci{constructor(){super(),YA(this,Wn,void 0),GA(this,Wn,this.shadowRoot.querySelector("slot")),Av(this,Wn).textContent=ta(0)}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_PREVIEW_TIME]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_PREVIEW_TIME&&a!=null&&(Av(this,Wn).textContent=ta(parseFloat(a)))}get mediaPreviewTime(){return se(this,m.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){fe(this,m.MEDIA_PREVIEW_TIME,e)}};n(wm,"MediaPreviewTimeDisplay");let Xu=wm;Wn=new WeakMap;y.customElements.get("media-preview-time-display")||y.customElements.define("media-preview-time-display",Xu);const Fa={SEEK_OFFSET:"seekoffset"},Zd=30,zA=n(t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(2.18 19.87)">${t}</text>
    <path d="M10 6V3L4.37 7 10 10.94V8a5.54 5.54 0 0 1 1.9 10.48v2.12A7.5 7.5 0 0 0 10 6Z"/>
  </svg>`,"backwardIcon");function QA(t,e){return`
    <slot name="icon">${zA(e.seekOffset)}</slot>
  `}n(QA,"getSlotTemplateHTML$8");const jA=n((t,e)=>{t.setAttribute("aria-label",C("seek back {seekOffset} seconds",{seekOffset:e}))},"updateAriaLabel$4");function ZA(){return C("Seek backward")}n(ZA,"getTooltipContentHTML$7");const XA=0,Im=class Im extends Ie{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_CURRENT_TIME,Fa.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=se(this,Fa.SEEK_OFFSET,Zd)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),jA(this,this.seekOffset),e===Fa.SEEK_OFFSET&&(this.seekOffset=se(this,Fa.SEEK_OFFSET,Zd))}get seekOffset(){return se(this,Fa.SEEK_OFFSET,Zd)}set seekOffset(e){fe(this,Fa.SEEK_OFFSET,e),this.setAttribute("aria-label",C("seek back {seekOffset} seconds",{seekOffset:this.seekOffset})),pE(vE(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return se(this,m.MEDIA_CURRENT_TIME,XA)}set mediaCurrentTime(e){fe(this,m.MEDIA_CURRENT_TIME,e)}handleClick(){const e=Math.max(this.mediaCurrentTime-this.seekOffset,0),i=new y.CustomEvent(D.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};n(Im,"MediaSeekBackwardButton");let Os=Im;Os.getSlotTemplateHTML=QA;Os.getTooltipContentHTML=ZA;y.customElements.get("media-seek-backward-button")||y.customElements.define("media-seek-backward-button",Os);const Ka={SEEK_OFFSET:"seekoffset"},Xd=30,JA=n(t=>`
  <svg aria-hidden="true" viewBox="0 0 20 24">
    <defs>
      <style>.text{font-size:8px;font-family:Arial-BoldMT, Arial;font-weight:700;}</style>
    </defs>
    <text class="text value" transform="translate(8.9 19.87)">${t}</text>
    <path d="M10 6V3l5.61 4L10 10.94V8a5.54 5.54 0 0 0-1.9 10.48v2.12A7.5 7.5 0 0 1 10 6Z"/>
  </svg>`,"forwardIcon");function ek(t,e){return`
    <slot name="icon">${JA(e.seekOffset)}</slot>
  `}n(ek,"getSlotTemplateHTML$7");const tk=n((t,e)=>{t.setAttribute("aria-label",C("seek forward {seekOffset} seconds",{seekOffset:e}))},"updateAriaLabel$3");function ik(){return C("Seek forward")}n(ik,"getTooltipContentHTML$6");const ak=0,Rm=class Rm extends Ie{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_CURRENT_TIME,Ka.SEEK_OFFSET]}connectedCallback(){super.connectedCallback(),this.seekOffset=se(this,Ka.SEEK_OFFSET,Xd)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),tk(this,this.seekOffset),e===Ka.SEEK_OFFSET&&(this.seekOffset=se(this,Ka.SEEK_OFFSET,Xd))}get seekOffset(){return se(this,Ka.SEEK_OFFSET,Xd)}set seekOffset(e){fe(this,Ka.SEEK_OFFSET,e),this.setAttribute("aria-label",C("seek forward {seekOffset} seconds",{seekOffset:this.seekOffset})),pE(vE(this,"icon"),this.seekOffset)}get mediaCurrentTime(){return se(this,m.MEDIA_CURRENT_TIME,ak)}set mediaCurrentTime(e){fe(this,m.MEDIA_CURRENT_TIME,e)}handleClick(){const e=this.mediaCurrentTime+this.seekOffset,i=new y.CustomEvent(D.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};n(Rm,"MediaSeekForwardButton");let xs=Rm;xs.getSlotTemplateHTML=ek;xs.getTooltipContentHTML=ik;y.customElements.get("media-seek-forward-button")||y.customElements.define("media-seek-forward-button",xs);var Ah=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$c"),Pt=n((t,e,i)=>(Ah(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$c"),ua=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$c"),kh=n((t,e,i,a)=>(Ah(t,e,"write to private field"),e.set(t,i),i),"__privateSet$a"),qi=n((t,e,i)=>(Ah(t,e,"access private method"),i),"__privateMethod$9"),er,di,xd,Sh,a_,Ql,wh,Bn,el,tl,Ju;const Wi={REMAINING:"remaining",SHOW_DURATION:"showduration",NO_TOGGLE:"notoggle"},kv=[...Object.values(Wi),m.MEDIA_CURRENT_TIME,m.MEDIA_DURATION,m.MEDIA_SEEKABLE],r_=["Enter"," "],rk="&nbsp;/&nbsp;",ec=n((t,{timesSep:e=rk}={})=>{var i,a;const r=(i=t.mediaCurrentTime)!=null?i:0,[,s]=(a=t.mediaSeekable)!=null?a:[];let o=0;Number.isFinite(t.mediaDuration)?o=t.mediaDuration:Number.isFinite(s)&&(o=s);const l=t.remaining?ta(0-(o-r)):ta(r);return t.showDuration?`${l}${e}${ta(o)}`:l},"formatTimesLabel"),nk=n(t=>{var e;const i=t.mediaCurrentTime,[,a]=(e=t.mediaSeekable)!=null?e:[];let r=null;if(Number.isFinite(t.mediaDuration)?r=t.mediaDuration:Number.isFinite(a)&&(r=a),i==null||r===null){t.setAttribute("aria-description",C("video not loaded, unknown time."));return}const s=t.remaining?ts(0-(r-i)):ts(i);if(!t.showDuration){t.setAttribute("aria-description",s);return}const o=ts(r),l=C("{currentTime} of {totalTime}",{currentTime:s,totalTime:o});t.setAttribute("aria-description",l)},"updateAriaDescription");function sk(t,e){return`
    <slot>${ec(e)}</slot>
  `}n(sk,"getSlotTemplateHTML$6");const ok=n(t=>{t.setAttribute("aria-label",C("playback time"))},"updateAriaLabel$2"),Lm=class Lm extends ci{constructor(){super(),ua(this,Sh),ua(this,Ql),ua(this,Bn),ua(this,tl),ua(this,er,void 0),ua(this,di,null),ua(this,xd,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!r_.includes(r)){this.removeEventListener("keyup",Pt(this,di));return}this.addEventListener("keyup",Pt(this,di))}),kh(this,er,this.shadowRoot.querySelector("slot")),Pt(this,er).innerHTML=`${ec(this)}`}static get observedAttributes(){return[...super.observedAttributes,...kv,"disabled"]}connectedCallback(){const{style:e}=Ce(this.shadowRoot,":host(:hover:not([notoggle]))");e.setProperty("cursor","var(--media-cursor, pointer)"),e.setProperty("background","var(--media-control-hover-background, rgba(50 50 70 / .7))"),this.setAttribute("aria-label",C("playback time")),qi(this,Bn,el).call(this),super.connectedCallback()}toggleTimeDisplay(){this.noToggle||(this.hasAttribute("remaining")?this.removeAttribute("remaining"):this.setAttribute("remaining",""))}disconnectedCallback(){this.disable(),qi(this,Ql,wh).call(this),super.disconnectedCallback()}attributeChangedCallback(e,i,a){ok(this),kv.includes(e)?this.update():e==="disabled"&&a!==i?a==null?qi(this,Bn,el).call(this):qi(this,tl,Ju).call(this):e===Wi.NO_TOGGLE&&a!==i&&(this.noToggle?qi(this,tl,Ju).call(this):qi(this,Bn,el).call(this)),super.attributeChangedCallback(e,i,a)}enable(){this.noToggle||(this.tabIndex=0)}disable(){this.tabIndex=-1}get remaining(){return G(this,Wi.REMAINING)}set remaining(e){z(this,Wi.REMAINING,e)}get showDuration(){return G(this,Wi.SHOW_DURATION)}set showDuration(e){z(this,Wi.SHOW_DURATION,e)}get noToggle(){return G(this,Wi.NO_TOGGLE)}set noToggle(e){z(this,Wi.NO_TOGGLE,e)}get mediaDuration(){return se(this,m.MEDIA_DURATION)}set mediaDuration(e){fe(this,m.MEDIA_DURATION,e)}get mediaCurrentTime(){return se(this,m.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){fe(this,m.MEDIA_CURRENT_TIME,e)}get mediaSeekable(){const e=this.getAttribute(m.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(m.MEDIA_SEEKABLE);return}this.setAttribute(m.MEDIA_SEEKABLE,e.join(":"))}update(){const e=ec(this);nk(this),e!==Pt(this,er).innerHTML&&(Pt(this,er).innerHTML=e)}};n(Lm,"MediaTimeDisplay");let jl=Lm;er=new WeakMap;di=new WeakMap;xd=new WeakMap;Sh=new WeakSet;a_=n(function(){Pt(this,di)||(kh(this,di,t=>{const{key:e}=t;if(!r_.includes(e)){this.removeEventListener("keyup",Pt(this,di));return}this.toggleTimeDisplay()}),this.addEventListener("keydown",Pt(this,xd)),this.addEventListener("click",this.toggleTimeDisplay))},"setupEventListeners_fn");Ql=new WeakSet;wh=n(function(){Pt(this,di)&&(this.removeEventListener("keyup",Pt(this,di)),this.removeEventListener("keydown",Pt(this,xd)),this.removeEventListener("click",this.toggleTimeDisplay),kh(this,di,null))},"removeEventListeners_fn");Bn=new WeakSet;el=n(function(){!this.noToggle&&!this.hasAttribute("disabled")&&(this.setAttribute("role","button"),this.enable(),qi(this,Sh,a_).call(this))},"makeInteractive_fn");tl=new WeakSet;Ju=n(function(){this.removeAttribute("role"),this.disable(),qi(this,Ql,wh).call(this)},"makeNonInteractive_fn");jl.getSlotTemplateHTML=sk;y.customElements.get("media-time-display")||y.customElements.define("media-time-display",jl);var n_=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$b"),xe=n((t,e,i)=>(n_(t,e,"read from private field"),e.get(t)),"__privateGet$b"),Wt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$b"),lt=n((t,e,i,a)=>(n_(t,e,"write to private field"),e.set(t,i),i),"__privateSet$9"),lk=n((t,e,i,a)=>({set _(r){lt(t,e,r)},get _(){return xe(t,e)}}),"__privateWrapper"),tr,il,ir,Fn,al,rl,nl,ar,fa,sl;const Cm=class Cm{constructor(e,i,a){Wt(this,tr,void 0),Wt(this,il,void 0),Wt(this,ir,void 0),Wt(this,Fn,void 0),Wt(this,al,void 0),Wt(this,rl,void 0),Wt(this,nl,void 0),Wt(this,ar,void 0),Wt(this,fa,0),Wt(this,sl,(r=performance.now())=>{lt(this,fa,requestAnimationFrame(xe(this,sl))),lt(this,Fn,performance.now()-xe(this,ir));const s=1e3/this.fps;if(xe(this,Fn)>s){lt(this,ir,r-xe(this,Fn)%s);const o=1e3/((r-xe(this,il))/++lk(this,al)._),l=(r-xe(this,rl))/1e3/this.duration;let d=xe(this,nl)+l*this.playbackRate;d-xe(this,tr).valueAsNumber>0?lt(this,ar,this.playbackRate/this.duration/o):(lt(this,ar,.995*xe(this,ar)),d=xe(this,tr).valueAsNumber+xe(this,ar)),this.callback(d)}}),lt(this,tr,e),this.callback=i,this.fps=a}start(){xe(this,fa)===0&&(lt(this,ir,performance.now()),lt(this,il,xe(this,ir)),lt(this,al,0),xe(this,sl).call(this))}stop(){xe(this,fa)!==0&&(cancelAnimationFrame(xe(this,fa)),lt(this,fa,0))}update({start:e,duration:i,playbackRate:a}){const r=e-xe(this,tr).valueAsNumber,s=Math.abs(i-this.duration);(r>0||r<-.03||s>=.5)&&this.callback(e),lt(this,nl,e),lt(this,rl,performance.now()),this.duration=i,this.playbackRate=a}};n(Cm,"RangeAnimation");let tc=Cm;tr=new WeakMap;il=new WeakMap;ir=new WeakMap;Fn=new WeakMap;al=new WeakMap;rl=new WeakMap;nl=new WeakMap;ar=new WeakMap;fa=new WeakMap;sl=new WeakMap;var Ih=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$a"),ue=n((t,e,i)=>(Ih(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$a"),Re=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$a"),Et=n((t,e,i,a)=>(Ih(t,e,"write to private field"),e.set(t,i),i),"__privateSet$8"),gt=n((t,e,i)=>(Ih(t,e,"access private method"),i),"__privateMethod$8"),rr,Yi,Zl,rs,Xl,ol,Ns,Ps,nr,sr,Kn,ic,s_,ac,Jl,Rh,ed,Lh,td,Ch,rc,o_,$s,id,nc,l_;const dk=n(t=>{const e=t.range,i=ts(+d_(t)),a=ts(+t.mediaSeekableEnd),r=i&&a?C("{currentTime} of {totalTime}",{currentTime:i,totalTime:a}):C("video not loaded, unknown time.");e.setAttribute("aria-valuetext",r)},"updateAriaValueText");function uk(t){return`
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

      :host(:is([${m.MEDIA_PREVIEW_IMAGE}], [${m.MEDIA_PREVIEW_TIME}])[dragging]) [part~="preview-box"] {
        transition-duration: var(--media-preview-transition-duration-in, .5s);
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
        opacity: 1;
      }

      @media (hover: hover) {
        :host(:is([${m.MEDIA_PREVIEW_IMAGE}], [${m.MEDIA_PREVIEW_TIME}]):hover) [part~="preview-box"] {
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

      :host([${m.MEDIA_PREVIEW_IMAGE}][dragging]) media-preview-thumbnail,
      :host([${m.MEDIA_PREVIEW_IMAGE}][dragging]) ::slotted(media-preview-thumbnail) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        visibility: visible;
      }

      @media (hover: hover) {
        :host([${m.MEDIA_PREVIEW_IMAGE}]:hover) media-preview-thumbnail,
        :host([${m.MEDIA_PREVIEW_IMAGE}]:hover) ::slotted(media-preview-thumbnail) {
          transition-delay: var(--media-preview-transition-delay-in, .25s);
          visibility: visible;
        }

        :host([${m.MEDIA_PREVIEW_TIME}]:hover) {
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

      :host([${m.MEDIA_PREVIEW_IMAGE}]) media-preview-chapter-display,
      :host([${m.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-chapter-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-chapter-border-radius, 0);
        padding: var(--media-preview-chapter-padding, 3.5px 9px 0);
        margin: var(--media-preview-chapter-margin, 0);
        min-width: 100%;
      }

      media-preview-chapter-display[${m.MEDIA_PREVIEW_CHAPTER}],
      ::slotted(media-preview-chapter-display[${m.MEDIA_PREVIEW_CHAPTER}]) {
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

      :host([${m.MEDIA_PREVIEW_IMAGE}]) media-preview-time-display,
      :host([${m.MEDIA_PREVIEW_IMAGE}]) ::slotted(media-preview-time-display) {
        transition-delay: var(--media-preview-transition-delay-in, .25s);
        border-radius: var(--media-preview-time-border-radius,
          0 0 var(--media-preview-border-radius) var(--media-preview-border-radius));
        min-width: 100%;
      }

      :host([${m.MEDIA_PREVIEW_TIME}]:hover) {
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
          <template shadowrootmode="${Tv.shadowRootOptions.mode}">
            ${Tv.getTemplateHTML({})}
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
  `}n(uk,"getContainerTemplateHTML");const fo=n((t,e=t.mediaCurrentTime)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;if(Number.isNaN(a))return 0;const r=(e-i)/(a-i);return Math.max(0,Math.min(r,1))},"calcRangeValueFromTime"),d_=n((t,e=t.range.valueAsNumber)=>{const i=Number.isFinite(t.mediaSeekableStart)?t.mediaSeekableStart:0,a=Number.isFinite(t.mediaDuration)?t.mediaDuration:t.mediaSeekableEnd;return Number.isNaN(a)?0:e*(a-i)+i},"calcTimeFromRangeValue"),Dm=class Dm extends aa{constructor(){super(),Re(this,ic),Re(this,Jl),Re(this,ed),Re(this,td),Re(this,rc),Re(this,$s),Re(this,nc),Re(this,rr,null),Re(this,Yi,void 0),Re(this,Zl,void 0),Re(this,rs,void 0),Re(this,Xl,void 0),Re(this,ol,void 0),Re(this,Ns,void 0),Re(this,Ps,void 0),Re(this,nr,void 0),Re(this,sr,void 0),Re(this,Kn,()=>{gt(this,ic,s_).call(this)?ue(this,Yi).start():ue(this,Yi).stop()}),Re(this,ac,a=>{this.dragging||(oh(a)&&(this.range.valueAsNumber=a),ue(this,sr)||this.updateBar())}),this.shadowRoot.querySelector("#track").insertAdjacentHTML("afterbegin",'<div id="buffered" part="buffered"></div>'),Et(this,Zl,this.shadowRoot.querySelectorAll('[part~="box"]')),Et(this,Xl,this.shadowRoot.querySelector('[part~="preview-box"]')),Et(this,ol,this.shadowRoot.querySelector('[part~="current-box"]'));const i=getComputedStyle(this);Et(this,Ns,parseInt(i.getPropertyValue("--media-box-padding-left"))),Et(this,Ps,parseInt(i.getPropertyValue("--media-box-padding-right"))),Et(this,Yi,new tc(this.range,ue(this,ac),60))}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_PAUSED,m.MEDIA_DURATION,m.MEDIA_SEEKABLE,m.MEDIA_CURRENT_TIME,m.MEDIA_PREVIEW_IMAGE,m.MEDIA_PREVIEW_TIME,m.MEDIA_PREVIEW_CHAPTER,m.MEDIA_BUFFERED,m.MEDIA_PLAYBACK_RATE,m.MEDIA_LOADING,m.MEDIA_ENDED]}connectedCallback(){var e;super.connectedCallback(),this.range.setAttribute("aria-label",C("seek")),ue(this,Kn).call(this),Et(this,rr,this.getRootNode()),(e=ue(this,rr))==null||e.addEventListener("transitionstart",this)}disconnectedCallback(){var e;super.disconnectedCallback(),ue(this,Yi).stop(),(e=ue(this,rr))==null||e.removeEventListener("transitionstart",this),Et(this,rr,null)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),i!=a&&(e===m.MEDIA_CURRENT_TIME||e===m.MEDIA_PAUSED||e===m.MEDIA_ENDED||e===m.MEDIA_LOADING||e===m.MEDIA_DURATION||e===m.MEDIA_SEEKABLE?(ue(this,Yi).update({start:fo(this),duration:this.mediaSeekableEnd-this.mediaSeekableStart,playbackRate:this.mediaPlaybackRate}),ue(this,Kn).call(this),dk(this)):e===m.MEDIA_BUFFERED&&this.updateBufferedBar(),(e===m.MEDIA_DURATION||e===m.MEDIA_SEEKABLE)&&(this.mediaChaptersCues=ue(this,nr),this.updateBar()))}get mediaChaptersCues(){return ue(this,nr)}set mediaChaptersCues(e){var i;Et(this,nr,e),this.updateSegments((i=ue(this,nr))==null?void 0:i.map(a=>({start:fo(this,a.startTime),end:fo(this,a.endTime)})))}get mediaPaused(){return G(this,m.MEDIA_PAUSED)}set mediaPaused(e){z(this,m.MEDIA_PAUSED,e)}get mediaLoading(){return G(this,m.MEDIA_LOADING)}set mediaLoading(e){z(this,m.MEDIA_LOADING,e)}get mediaDuration(){return se(this,m.MEDIA_DURATION)}set mediaDuration(e){fe(this,m.MEDIA_DURATION,e)}get mediaCurrentTime(){return se(this,m.MEDIA_CURRENT_TIME)}set mediaCurrentTime(e){fe(this,m.MEDIA_CURRENT_TIME,e)}get mediaPlaybackRate(){return se(this,m.MEDIA_PLAYBACK_RATE,1)}set mediaPlaybackRate(e){fe(this,m.MEDIA_PLAYBACK_RATE,e)}get mediaBuffered(){const e=this.getAttribute(m.MEDIA_BUFFERED);return e?e.split(" ").map(i=>i.split(":").map(a=>+a)):[]}set mediaBuffered(e){if(!e){this.removeAttribute(m.MEDIA_BUFFERED);return}const i=e.map(a=>a.join(":")).join(" ");this.setAttribute(m.MEDIA_BUFFERED,i)}get mediaSeekable(){const e=this.getAttribute(m.MEDIA_SEEKABLE);if(e)return e.split(":").map(i=>+i)}set mediaSeekable(e){if(e==null){this.removeAttribute(m.MEDIA_SEEKABLE);return}this.setAttribute(m.MEDIA_SEEKABLE,e.join(":"))}get mediaSeekableEnd(){var e;const[,i=this.mediaDuration]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaSeekableStart(){var e;const[i=0]=(e=this.mediaSeekable)!=null?e:[];return i}get mediaPreviewImage(){return he(this,m.MEDIA_PREVIEW_IMAGE)}set mediaPreviewImage(e){le(this,m.MEDIA_PREVIEW_IMAGE,e)}get mediaPreviewTime(){return se(this,m.MEDIA_PREVIEW_TIME)}set mediaPreviewTime(e){fe(this,m.MEDIA_PREVIEW_TIME,e)}get mediaEnded(){return G(this,m.MEDIA_ENDED)}set mediaEnded(e){z(this,m.MEDIA_ENDED,e)}updateBar(){super.updateBar(),this.updateBufferedBar(),this.updateCurrentBox()}updateBufferedBar(){var e;const i=this.mediaBuffered;if(!i.length)return;let a;if(this.mediaEnded)a=1;else{const s=this.mediaCurrentTime,[,o=this.mediaSeekableStart]=(e=i.find(([l,d])=>l<=s&&s<=d))!=null?e:[];a=fo(this,o)}const{style:r}=Ce(this.shadowRoot,"#buffered");r.setProperty("width",`${a*100}%`)}updateCurrentBox(){if(!this.shadowRoot.querySelector('slot[name="current"]').assignedElements().length)return;const i=Ce(this.shadowRoot,"#current-rail"),a=Ce(this.shadowRoot,'[part~="current-box"]'),r=gt(this,Jl,Rh).call(this,ue(this,ol)),s=gt(this,ed,Lh).call(this,r,this.range.valueAsNumber),o=gt(this,td,Ch).call(this,r,this.range.valueAsNumber);i.style.transform=`translateX(${s})`,i.style.setProperty("--_range-width",`${r.range.width}`),a.style.setProperty("--_box-shift",`${o}`),a.style.setProperty("--_box-width",`${r.box.width}px`),a.style.setProperty("visibility","initial")}handleEvent(e){switch(super.handleEvent(e),e.type){case"input":gt(this,nc,l_).call(this);break;case"pointermove":gt(this,rc,o_).call(this,e);break;case"pointerup":ue(this,sr)&&Et(this,sr,!1);break;case"pointerdown":Et(this,sr,!0);break;case"pointerleave":gt(this,$s,id).call(this,null);break;case"transitionstart":Mi(e.target,this)&&setTimeout(()=>ue(this,Kn).call(this),0);break}}};n(Dm,"MediaTimeRange");let Us=Dm;rr=new WeakMap;Yi=new WeakMap;Zl=new WeakMap;rs=new WeakMap;Xl=new WeakMap;ol=new WeakMap;Ns=new WeakMap;Ps=new WeakMap;nr=new WeakMap;sr=new WeakMap;Kn=new WeakMap;ic=new WeakSet;s_=n(function(){return this.isConnected&&!this.mediaPaused&&!this.mediaLoading&&!this.mediaEnded&&this.mediaSeekableEnd>0&&fE(this)},"shouldRangeAnimate_fn");ac=new WeakMap;Jl=new WeakSet;Rh=n(function(t){var e;const a=((e=this.getAttribute("bounds")?pn(this,`#${this.getAttribute("bounds")}`):this.parentElement)!=null?e:this).getBoundingClientRect(),r=this.range.getBoundingClientRect(),s=t.offsetWidth,o=-(r.left-a.left-s/2),l=a.right-r.left-s/2;return{box:{width:s,min:o,max:l},bounds:a,range:r}},"getElementRects_fn");ed=new WeakSet;Lh=n(function(t,e){let i=`${e*100}%`;const{width:a,min:r,max:s}=t.box;if(!a)return i;if(Number.isNaN(r)||(i=`max(${`calc(1 / var(--_range-width) * 100 * ${r}% + var(--media-box-padding-left))`}, ${i})`),!Number.isNaN(s)){const l=`calc(1 / var(--_range-width) * 100 * ${s}% - var(--media-box-padding-right))`;i=`min(${i}, ${l})`}return i},"getBoxPosition_fn");td=new WeakSet;Ch=n(function(t,e){const{width:i,min:a,max:r}=t.box,s=e*t.range.width;if(s<a+ue(this,Ns)){const o=t.range.left-t.bounds.left-ue(this,Ns);return`${s-i/2+o}px`}if(s>r-ue(this,Ps)){const o=t.bounds.right-t.range.right-ue(this,Ps);return`${s+i/2-o-t.range.width}px`}return 0},"getBoxShiftPosition_fn");rc=new WeakSet;o_=n(function(t){const e=[...ue(this,Zl)].some(p=>t.composedPath().includes(p));if(!this.dragging&&(e||!t.composedPath().includes(this))){gt(this,$s,id).call(this,null);return}const i=this.mediaSeekableEnd;if(!i)return;const a=Ce(this.shadowRoot,"#preview-rail"),r=Ce(this.shadowRoot,'[part~="preview-box"]'),s=gt(this,Jl,Rh).call(this,ue(this,Xl));let o=(t.clientX-s.range.left)/s.range.width;o=Math.max(0,Math.min(1,o));const l=gt(this,ed,Lh).call(this,s,o),d=gt(this,td,Ch).call(this,s,o);a.style.transform=`translateX(${l})`,a.style.setProperty("--_range-width",`${s.range.width}`),r.style.setProperty("--_box-shift",`${d}`),r.style.setProperty("--_box-width",`${s.box.width}px`);const h=Math.round(ue(this,rs))-Math.round(o*i);Math.abs(h)<1&&o>.01&&o<.99||(Et(this,rs,o*i),gt(this,$s,id).call(this,ue(this,rs)))},"handlePointerMove_fn");$s=new WeakSet;id=n(function(t){this.dispatchEvent(new y.CustomEvent(D.MEDIA_PREVIEW_REQUEST,{composed:!0,bubbles:!0,detail:t}))},"previewRequest_fn");nc=new WeakSet;l_=n(function(){ue(this,Yi).stop();const t=d_(this);this.dispatchEvent(new y.CustomEvent(D.MEDIA_SEEK_REQUEST,{composed:!0,bubbles:!0,detail:t}))},"seekRequest_fn");Us.shadowRootOptions={mode:"open"};Us.getContainerTemplateHTML=uk;y.customElements.get("media-time-range")||y.customElements.define("media-time-range",Us);var ck=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$9"),Sv=n((t,e,i)=>(ck(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$9"),hk=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$9"),ll;const mk=1,pk=n(t=>t.mediaMuted?0:t.mediaVolume,"toVolume"),vk=n(t=>`${Math.round(t*100)}%`,"formatAsPercentString"),Mm=class Mm extends aa{constructor(){super(...arguments),hk(this,ll,()=>{const e=this.range.value,i=new y.CustomEvent(D.MEDIA_VOLUME_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)})}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_VOLUME,m.MEDIA_MUTED,m.MEDIA_VOLUME_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),this.range.setAttribute("aria-label",C("volume")),this.range.addEventListener("input",Sv(this,ll))}disconnectedCallback(){this.range.removeEventListener("input",Sv(this,ll)),super.disconnectedCallback()}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),(e===m.MEDIA_VOLUME||e===m.MEDIA_MUTED)&&(this.range.valueAsNumber=pk(this),this.range.setAttribute("aria-valuetext",vk(this.range.valueAsNumber)),this.updateBar())}get mediaVolume(){return se(this,m.MEDIA_VOLUME,mk)}set mediaVolume(e){fe(this,m.MEDIA_VOLUME,e)}get mediaMuted(){return G(this,m.MEDIA_MUTED)}set mediaMuted(e){z(this,m.MEDIA_MUTED,e)}get mediaVolumeUnavailable(){return he(this,m.MEDIA_VOLUME_UNAVAILABLE)}set mediaVolumeUnavailable(e){le(this,m.MEDIA_VOLUME_UNAVAILABLE,e)}};n(Mm,"MediaVolumeRange");let sc=Mm;ll=new WeakMap;y.customElements.get("media-volume-range")||y.customElements.define("media-volume-range",sc);function fk(t){return`
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

        :host([${m.MEDIA_LOOP}]) #checked-indicator {
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
    `}n(fk,"getSlotTemplateHTML$5");function Ek(){return C("Loop")}n(Ek,"getTooltipContentHTML$5");const Om=class Om extends Ie{constructor(){super(...arguments),this.container=null}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_LOOP]}connectedCallback(){var e;super.connectedCallback(),this.container=((e=this.shadowRoot)==null?void 0:e.querySelector("#icon"))||null,this.container&&(this.container.textContent=C("Loop"))}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_LOOP&&this.container&&this.setAttribute("aria-checked",this.mediaLoop?"true":"false")}get mediaLoop(){return G(this,m.MEDIA_LOOP)}set mediaLoop(e){z(this,m.MEDIA_LOOP,e)}handleClick(){const e=!this.mediaLoop,i=new y.CustomEvent(D.MEDIA_LOOP_REQUEST,{composed:!0,bubbles:!0,detail:e});this.dispatchEvent(i)}};n(Om,"MediaLoopButton");let Hs=Om;Hs.getSlotTemplateHTML=fk;Hs.getTooltipContentHTML=Ek;y.customElements.get("media-loop-button")||y.customElements.define("media-loop-button",Hs);var u_=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$8"),V=n((t,e,i)=>(u_(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$8"),ti=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$8"),wi=n((t,e,i,a)=>(u_(t,e,"write to private field"),e.set(t,i),i),"__privateSet$7"),or,dl,Ea,Vn,Bi,Fi,Ki,_a,lr,ul,Ct;const wv=1,Iv=0,_k=1,bk={processCallback(t,e,i){if(i){for(const[a,r]of e)if(a in i){const s=i[a];typeof s=="boolean"&&r instanceof ut&&typeof r.element[r.attributeName]=="boolean"?r.booleanValue=s:typeof s=="function"&&r instanceof ut?r.element[r.attributeName]=s:r.value=s}}}},xm=class xm extends y.DocumentFragment{constructor(e,i,a=bk){var r;super(),ti(this,or,void 0),ti(this,dl,void 0),this.append(e.content.cloneNode(!0)),wi(this,or,c_(this)),wi(this,dl,a),(r=a.createCallback)==null||r.call(a,this,V(this,or),i),a.processCallback(this,V(this,or),i)}update(e){V(this,dl).processCallback(this,V(this,or),e)}};n(xm,"TemplateInstance");let dn=xm;or=new WeakMap;dl=new WeakMap;const c_=n((t,e=[])=>{let i,a;for(const r of t.attributes||[])if(r.value.includes("{{")){const s=new oc;for([i,a]of Lv(r.value))if(!i)s.append(a);else{const o=new ut(t,r.name,r.namespaceURI);s.append(o),e.push([a,o])}r.value=s.toString()}for(const r of t.childNodes)if(r.nodeType===wv&&!(r instanceof HTMLTemplateElement))c_(r,e);else{const s=r.data;if(r.nodeType===wv||s.includes("{{")){const o=[];if(s)for([i,a]of Lv(s))if(!i)o.push(new Text(a));else{const l=new ra(t);o.push(l),e.push([a,l])}else if(r instanceof HTMLTemplateElement){const l=new rd(t,r);o.push(l),e.push([l.expression,l])}r.replaceWith(...o.flatMap(l=>l.replacementNodes||[l]))}}return e},"parse"),Rv={},Lv=n(t=>{let e="",i=0,a=Rv[t],r=0,s;if(a)return a;for(a=[];s=t[r];r++)s==="{"&&t[r+1]==="{"&&t[r-1]!=="\\"&&t[r+2]&&++i==1?(e&&a.push([Iv,e]),e="",r++):s==="}"&&t[r+1]==="}"&&t[r-1]!=="\\"&&!--i?(a.push([_k,e.trim()]),e="",r++):e+=s||"";return e&&a.push([Iv,(i>0?"{{":"")+e]),Rv[t]=a},"tokenize$1"),gk=11,Nm=class Nm{get value(){return""}set value(e){}toString(){return this.value}};n(Nm,"Part");let ad=Nm;const h_=new WeakMap,Pm=class Pm{constructor(){ti(this,Ea,[])}[Symbol.iterator](){return V(this,Ea).values()}get length(){return V(this,Ea).length}item(e){return V(this,Ea)[e]}append(...e){for(const i of e)i instanceof ut&&h_.set(i,this),V(this,Ea).push(i)}toString(){return V(this,Ea).join("")}};n(Pm,"AttrPartList");let oc=Pm;Ea=new WeakMap;const $m=class $m extends ad{constructor(e,i,a){super(),ti(this,_a),ti(this,Vn,""),ti(this,Bi,void 0),ti(this,Fi,void 0),ti(this,Ki,void 0),wi(this,Bi,e),wi(this,Fi,i),wi(this,Ki,a)}get attributeName(){return V(this,Fi)}get attributeNamespace(){return V(this,Ki)}get element(){return V(this,Bi)}get value(){return V(this,Vn)}set value(e){V(this,Vn)!==e&&(wi(this,Vn,e),!V(this,_a,lr)||V(this,_a,lr).length===1?e==null?V(this,Bi).removeAttributeNS(V(this,Ki),V(this,Fi)):V(this,Bi).setAttributeNS(V(this,Ki),V(this,Fi),e):V(this,Bi).setAttributeNS(V(this,Ki),V(this,Fi),V(this,_a,lr).toString()))}get booleanValue(){return V(this,Bi).hasAttributeNS(V(this,Ki),V(this,Fi))}set booleanValue(e){if(!V(this,_a,lr)||V(this,_a,lr).length===1)this.value=e?"":null;else throw new DOMException("Value is not fully templatized")}};n($m,"AttrPart");let ut=$m;Vn=new WeakMap;Bi=new WeakMap;Fi=new WeakMap;Ki=new WeakMap;_a=new WeakSet;lr=n(function(){return h_.get(this)},"list_get");const Um=class Um extends ad{constructor(e,i){super(),ti(this,ul,void 0),ti(this,Ct,void 0),wi(this,ul,e),wi(this,Ct,i?[...i]:[new Text])}get replacementNodes(){return V(this,Ct)}get parentNode(){return V(this,ul)}get nextSibling(){return V(this,Ct)[V(this,Ct).length-1].nextSibling}get previousSibling(){return V(this,Ct)[0].previousSibling}get value(){return V(this,Ct).map(e=>e.textContent).join("")}set value(e){this.replace(e)}replace(...e){const i=e.flat().flatMap(a=>a==null?[new Text]:a.forEach?[...a]:a.nodeType===gk?[...a.childNodes]:a.nodeType?[a]:[new Text(a)]);i.length||i.push(new Text),wi(this,Ct,yk(V(this,Ct)[0].parentNode,V(this,Ct),i,this.nextSibling))}};n(Um,"ChildNodePart");let ra=Um;ul=new WeakMap;Ct=new WeakMap;const Hm=class Hm extends ra{constructor(e,i){const a=i.getAttribute("directive")||i.getAttribute("type");let r=i.getAttribute("expression")||i.getAttribute(a)||"";r.startsWith("{{")&&(r=r.trim().slice(2,-2).trim()),super(e),this.expression=r,this.template=i,this.directive=a}};n(Hm,"InnerTemplatePart");let rd=Hm;function yk(t,e,i,a=null){let r=0,s,o,l,d=i.length,h=e.length;for(;r<d&&r<h&&e[r]==i[r];)r++;for(;r<d&&r<h&&i[d-1]==e[h-1];)a=i[--h,--d];if(r==h)for(;r<d;)t.insertBefore(i[r++],a);if(r==d)for(;r<h;)t.removeChild(e[r++]);else{for(s=e[r];r<d;)l=i[r++],o=s?s.nextSibling:a,s==l?s=o:r<d&&i[r]==o?(t.replaceChild(l,s),s=o):t.insertBefore(l,s);for(;s!=a;)o=s.nextSibling,t.removeChild(s),s=o}return i}n(yk,"swapdom");const Cv={string:n(t=>String(t),"string")},Wm=class Wm{constructor(e){this.template=e,this.state=void 0}};n(Wm,"PartialTemplate");let nd=Wm;const Sa=new WeakMap,wa=new WeakMap,lc={partial:n((t,e)=>{e[t.expression]=new nd(t.template)},"partial"),if:n((t,e)=>{var i;if(m_(t.expression,e))if(Sa.get(t)!==t.template){Sa.set(t,t.template);const a=new dn(t.template,e,Dh);t.replace(a),wa.set(t,a)}else(i=wa.get(t))==null||i.update(e);else t.replace(""),Sa.delete(t),wa.delete(t)},"if")},Tk=Object.keys(lc),Dh={processCallback(t,e,i){var a,r;if(i)for(const[s,o]of e){if(o instanceof rd){if(!o.directive){const d=Tk.find(h=>o.template.hasAttribute(h));d&&(o.directive=d,o.expression=o.template.getAttribute(d))}(a=lc[o.directive])==null||a.call(lc,o,i);continue}let l=m_(s,i);if(l instanceof nd){Sa.get(o)!==l.template?(Sa.set(o,l.template),l=new dn(l.template,l.state,Dh),o.value=l,wa.set(o,l)):(r=wa.get(o))==null||r.update(l.state);continue}l?(o instanceof ut&&o.attributeName.startsWith("aria-")&&(l=String(l)),o instanceof ut?typeof l=="boolean"?o.booleanValue=l:typeof l=="function"?o.element[o.attributeName]=l:o.value=l:(o.value=l,Sa.delete(o),wa.delete(o))):o instanceof ut?o.value=void 0:(o.value=void 0,Sa.delete(o),wa.delete(o))}}},Dv={"!":n(t=>!t,"!"),"!!":n(t=>!!t,"!!"),"==":n((t,e)=>t==e,"=="),"!=":n((t,e)=>t!=e,"!="),">":n((t,e)=>t>e,">"),">=":n((t,e)=>t>=e,">="),"<":n((t,e)=>t<e,"<"),"<=":n((t,e)=>t<=e,"<="),"??":n((t,e)=>t??e,"??"),"|":n((t,e)=>{var i;return(i=Cv[e])==null?void 0:i.call(Cv,t)},"|")};function Ak(t){return kk(t,{boolean:/true|false/,number:/-?\d+\.?\d*/,string:/(["'])((?:\\.|[^\\])*?)\1/,operator:/[!=><][=!]?|\?\?|\|/,ws:/\s+/,param:/[$a-z_][$\w]*/i}).filter(({type:e})=>e!=="ws")}n(Ak,"tokenizeExpression");function m_(t,e={}){var i,a,r,s,o,l,d;const h=Ak(t);if(h.length===0||h.some(({type:p})=>!p))return An(t);if(((i=h[0])==null?void 0:i.token)===">"){const p=e[(a=h[1])==null?void 0:a.token];if(!p)return An(t);const v={...e};p.state=v;const c=h.slice(2);for(let u=0;u<c.length;u+=3){const f=(r=c[u])==null?void 0:r.token,_=(s=c[u+1])==null?void 0:s.token,b=(o=c[u+2])==null?void 0:o.token;f&&_==="="&&(v[f]=kn(b,e))}return p}if(h.length===1)return Eo(h[0])?kn(h[0].token,e):An(t);if(h.length===2){const p=(l=h[0])==null?void 0:l.token,v=Dv[p];if(!v||!Eo(h[1]))return An(t);const c=kn(h[1].token,e);return v(c)}if(h.length===3){const p=(d=h[1])==null?void 0:d.token,v=Dv[p];if(!v||!Eo(h[0])||!Eo(h[2]))return An(t);const c=kn(h[0].token,e);if(p==="|")return v(c,h[2].token);const u=kn(h[2].token,e);return v(c,u)}}n(m_,"evaluateExpression");function An(t){return!1}n(An,"invalidExpression");function Eo({type:t}){return["number","boolean","string","param"].includes(t)}n(Eo,"isValidParam");function kn(t,e){const i=t[0],a=t.slice(-1);return t==="true"||t==="false"?t==="true":i===a&&["'",'"'].includes(i)?t.slice(1,-1):oE(t)?parseFloat(t):e[t]}n(kn,"getParamValue");function kk(t,e){let i,a,r;const s=[];for(;t;){r=null,i=t.length;for(const o in e)a=e[o].exec(t),a&&a.index<i&&(r={token:a[0],type:o,matches:a.slice(1)},i=a.index);i&&s.push({token:t.substr(0,i),type:void 0}),r&&s.push(r),t=t.substr(i+(r?r.token.length:0))}return s}n(kk,"tokenize");var Mh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$7"),Vi=n((t,e,i)=>(Mh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$7"),ca=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$7"),Si=n((t,e,i,a)=>(Mh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$6"),Jd=n((t,e,i)=>(Mh(t,e,"access private method"),i),"__privateMethod$7"),Ar,cl,kr,dr,dc,p_,hl,uc,qn;const eu={mediatargetlivewindow:"targetlivewindow",mediastreamtype:"streamtype"},v_=we.createElement("template");v_.innerHTML=`
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
`;const Bm=class Bm extends y.HTMLElement{constructor(){super(),ca(this,dc),ca(this,hl),ca(this,Ar,void 0),ca(this,cl,void 0),ca(this,kr,void 0),ca(this,dr,void 0),ca(this,qn,void 0),this.shadowRoot?this.renderRoot=this.shadowRoot:(this.renderRoot=this.attachShadow({mode:"open"}),this.createRenderer()),Si(this,dr,new MutationObserver(e=>{var i;this.mediaController&&!((i=this.mediaController)!=null&&i.breakpointsComputed)||e.some(a=>{const r=a.target;return r===this?!0:r.localName!=="media-controller"?!1:!!(eu[a.attributeName]||a.attributeName.startsWith("breakpoint"))})&&this.render()})),Si(this,qn,this.render.bind(this)),Jd(this,dc,p_).call(this,"template")}get mediaController(){return this.renderRoot.querySelector("media-controller")}get template(){var e;return(e=Vi(this,Ar))!=null?e:this.constructor.template}set template(e){if(e===null){this.removeAttribute("template");return}typeof e=="string"?this.setAttribute("template",e):e instanceof HTMLTemplateElement&&(Si(this,Ar,e),Si(this,kr,null),this.createRenderer())}get props(){var e,i,a;const r=[...Array.from((i=(e=this.mediaController)==null?void 0:e.attributes)!=null?i:[]).filter(({name:o})=>eu[o]||o.startsWith("breakpoint")),...Array.from(this.attributes)],s={};for(const o of r){const l=(a=eu[o.name])!=null?a:My(o.name);let{value:d}=o;d!=null?(oE(d)&&(d=parseFloat(d)),s[l]=d===""?!0:d):s[l]=!1}return s}attributeChangedCallback(e,i,a){e==="template"&&i!=a&&Jd(this,hl,uc).call(this)}connectedCallback(){this.addEventListener(ui.BREAKPOINTS_COMPUTED,Vi(this,qn)),Vi(this,dr).observe(this,{attributes:!0}),Vi(this,dr).observe(this.renderRoot,{attributes:!0,subtree:!0}),Jd(this,hl,uc).call(this)}disconnectedCallback(){this.removeEventListener(ui.BREAKPOINTS_COMPUTED,Vi(this,qn)),Vi(this,dr).disconnect()}createRenderer(){this.template instanceof HTMLTemplateElement&&this.template!==Vi(this,cl)&&(Si(this,cl,this.template),this.renderer=new dn(this.template,this.props,this.constructor.processor),this.renderRoot.textContent="",this.renderRoot.append(v_.content.cloneNode(!0),this.renderer))}render(){var e;(e=this.renderer)==null||e.update(this.props)}};n(Bm,"MediaThemeElement");let un=Bm;Ar=new WeakMap;cl=new WeakMap;kr=new WeakMap;dr=new WeakMap;dc=new WeakSet;p_=n(function(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];delete this[t],this[t]=e}},"upgradeProperty_fn");hl=new WeakSet;uc=n(function(){var t;const e=this.getAttribute("template");if(!e||e===Vi(this,kr))return;const i=this.getRootNode(),a=(t=i?.getElementById)==null?void 0:t.call(i,e);if(a){Si(this,kr,e),Si(this,Ar,a),this.createRenderer();return}Sk(e)&&(Si(this,kr,e),wk(e).then(r=>{const s=we.createElement("template");s.innerHTML=r,Si(this,Ar,s),this.createRenderer()}).catch(console.error))},"updateTemplate_fn");qn=new WeakMap;un.observedAttributes=["template"];un.processor=Dh;function Sk(t){if(!/^(\/|\.\/|https?:\/\/)/.test(t))return!1;const e=/^https?:\/\//.test(t)?void 0:location.origin;try{new URL(t,e)}catch{return!1}return!0}n(Sk,"isValidUrl");async function wk(t){const e=await fetch(t);if(e.status!==200)throw new Error(`Failed to load resource: the server responded with a status of ${e.status}`);return e.text()}n(wk,"request");y.customElements.get("media-theme")||y.customElements.define("media-theme",un);function Ik({anchor:t,floating:e,placement:i}){const a=Rk({anchor:t,floating:e}),{x:r,y:s}=Ck(a,i);return{x:r,y:s}}n(Ik,"computePosition");function Rk({anchor:t,floating:e}){return{anchor:Lk(t,e.offsetParent),floating:{x:0,y:0,width:e.offsetWidth,height:e.offsetHeight}}}n(Rk,"getElementRects");function Lk(t,e){var i;const a=t.getBoundingClientRect(),r=(i=e?.getBoundingClientRect())!=null?i:{x:0,y:0};return{x:a.x-r.x,y:a.y-r.y,width:a.width,height:a.height}}n(Lk,"getRectRelativeToOffsetParent");function Ck({anchor:t,floating:e},i){const a=Dk(i)==="x"?"y":"x",r=a==="y"?"height":"width",s=f_(i),o=t.x+t.width/2-e.width/2,l=t.y+t.height/2-e.height/2,d=t[r]/2-e[r]/2;let h;switch(s){case"top":h={x:o,y:t.y-e.height};break;case"bottom":h={x:o,y:t.y+t.height};break;case"right":h={x:t.x+t.width,y:l};break;case"left":h={x:t.x-e.width,y:l};break;default:h={x:t.x,y:t.y}}switch(i.split("-")[1]){case"start":h[a]-=d;break;case"end":h[a]+=d;break}return h}n(Ck,"computeCoordsFromPlacement");function f_(t){return t.split("-")[0]}n(f_,"getSide");function Dk(t){return["top","bottom"].includes(f_(t))?"y":"x"}n(Dk,"getSideAxis");const Fm=class Fm extends Event{constructor({action:e="auto",relatedTarget:i,...a}){super("invoke",a),this.action=e,this.relatedTarget=i}};n(Fm,"InvokeEvent");let Ws=Fm;const Km=class Km extends Event{constructor({newState:e,oldState:i,...a}){super("toggle",a),this.newState=e,this.oldState=i}};n(Km,"ToggleEvent");let cc=Km;var Oh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$6"),X=n((t,e,i)=>(Oh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$6"),ae=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$6"),_t=n((t,e,i,a)=>(Oh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$5"),re=n((t,e,i)=>(Oh(t,e,"access private method"),i),"__privateMethod$6"),Zt,Xi,Li,ml,Yn,Ma,Bs,hc,E_,sd,xh,od,pl,mc,pc,__,vc,b_,fc,g_,Sr,wr,Ir,Fs,ld,Nh,Ec,y_,Ph,T_,_c,A_,$h,k_,bc,S_,gc,w_,ns,dd,yc,I_,ss,ud,vl,Tc;function cn({type:t,text:e,value:i,checked:a}){const r=we.createElement("media-chrome-menu-item");r.type=t,r.part.add("menu-item"),r.part.add(t),r.value=i,r.checked=a;const s=we.createElement("span");return s.textContent=e,r.append(s),r}n(cn,"createMenuItem");function Oa(t,e){let i=t.querySelector(`:scope > [slot="${e}"]`);if(i?.nodeName=="SLOT"&&(i=i.assignedElements({flatten:!0})[0]),i)return i=i.cloneNode(!0),i;const a=t.shadowRoot.querySelector(`[name="${e}"] > svg`);return a?a.cloneNode(!0):""}n(Oa,"createIndicator");function Mk(t){return`
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
  `}n(Mk,"getTemplateHTML$6");const ha={STYLE:"style",HIDDEN:"hidden",DISABLED:"disabled",ANCHOR:"anchor"},Vm=class Vm extends y.HTMLElement{constructor(){if(super(),ae(this,hc),ae(this,sd),ae(this,pl),ae(this,pc),ae(this,vc),ae(this,fc),ae(this,Ir),ae(this,ld),ae(this,Ec),ae(this,Ph),ae(this,_c),ae(this,$h),ae(this,bc),ae(this,gc),ae(this,ns),ae(this,yc),ae(this,ss),ae(this,vl),ae(this,Zt,null),ae(this,Xi,null),ae(this,Li,null),ae(this,ml,new Set),ae(this,Yn,void 0),ae(this,Ma,!1),ae(this,Bs,null),ae(this,od,()=>{const e=X(this,ml),i=new Set(this.items);for(const a of e)i.has(a)||this.dispatchEvent(new CustomEvent("removemenuitem",{detail:a}));for(const a of i)e.has(a)||this.dispatchEvent(new CustomEvent("addmenuitem",{detail:a}));_t(this,ml,i)}),ae(this,Sr,()=>{re(this,Ir,Fs).call(this),re(this,ld,Nh).call(this,!1)}),ae(this,wr,()=>{re(this,Ir,Fs).call(this)}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}this.container=this.shadowRoot.querySelector("#container"),this.defaultSlot=this.shadowRoot.querySelector("slot:not([name])"),_t(this,Yn,new MutationObserver(X(this,od)))}static get observedAttributes(){return[ha.DISABLED,ha.HIDDEN,ha.STYLE,ha.ANCHOR,J.MEDIA_CONTROLLER]}static formatMenuItemText(e,i){return e}enable(){this.addEventListener("click",this),this.addEventListener("focusout",this),this.addEventListener("keydown",this),this.addEventListener("invoke",this),this.addEventListener("toggle",this)}disable(){this.removeEventListener("click",this),this.removeEventListener("focusout",this),this.removeEventListener("keyup",this),this.removeEventListener("invoke",this),this.removeEventListener("toggle",this)}handleEvent(e){switch(e.type){case"slotchange":re(this,hc,E_).call(this,e);break;case"invoke":re(this,pc,__).call(this,e);break;case"click":re(this,Ec,y_).call(this,e);break;case"toggle":re(this,_c,A_).call(this,e);break;case"focusout":re(this,bc,S_).call(this,e);break;case"keydown":re(this,gc,w_).call(this,e);break}}connectedCallback(){var e,i;X(this,Yn).observe(this.defaultSlot,{childList:!0}),_t(this,Bs,uh(this.shadowRoot,":host")),re(this,pl,mc).call(this),this.hasAttribute("disabled")||this.enable(),this.role||(this.role="menu"),_t(this,Zt,Lu(this)),(i=(e=X(this,Zt))==null?void 0:e.associateElement)==null||i.call(e,this),this.hidden||(Jr(Ks(this),X(this,Sr)),Jr(this,X(this,wr))),re(this,sd,xh).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){var e,i;X(this,Yn).disconnect(),en(Ks(this),X(this,Sr)),en(this,X(this,wr)),this.disable(),(i=(e=X(this,Zt))==null?void 0:e.unassociateElement)==null||i.call(e,this),_t(this,Zt,null),_t(this,Xi,null),_t(this,Li,null),this.shadowRoot.removeEventListener("slotchange",this)}attributeChangedCallback(e,i,a){var r,s,o,l;e===ha.HIDDEN&&a!==i?(X(this,Ma)||_t(this,Ma,!0),this.hidden?re(this,fc,g_).call(this):re(this,vc,b_).call(this),this.dispatchEvent(new cc({oldState:this.hidden?"open":"closed",newState:this.hidden?"closed":"open",bubbles:!0}))):e===J.MEDIA_CONTROLLER?(i&&((s=(r=X(this,Zt))==null?void 0:r.unassociateElement)==null||s.call(r,this),_t(this,Zt,null)),a&&this.isConnected&&(_t(this,Zt,Lu(this)),(l=(o=X(this,Zt))==null?void 0:o.associateElement)==null||l.call(o,this))):e===ha.DISABLED&&a!==i?a==null?this.enable():this.disable():e===ha.STYLE&&a!==i&&re(this,pl,mc).call(this)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}get anchor(){return this.getAttribute("anchor")}set anchor(e){this.setAttribute("anchor",`${e}`)}get anchorElement(){var e;return this.anchor?(e=Rd(this))==null?void 0:e.querySelector(`#${this.anchor}`):null}get items(){return this.defaultSlot.assignedElements({flatten:!0}).filter(Ok)}get radioGroupItems(){return this.items.filter(e=>e.role==="menuitemradio")}get checkedItems(){return this.items.filter(e=>e.checked)}get value(){var e,i;return(i=(e=this.checkedItems[0])==null?void 0:e.value)!=null?i:""}set value(e){const i=this.items.find(a=>a.value===e);i&&re(this,vl,Tc).call(this,i)}focus(){if(_t(this,Xi,dh()),this.items.length){re(this,ss,ud).call(this,this.items[0]),this.items[0].focus();return}const e=this.querySelector('[autofocus], [tabindex]:not([tabindex="-1"]), [role="menu"]');e?.focus()}handleSelect(e){var i;const a=re(this,ns,dd).call(this,e);a&&(re(this,vl,Tc).call(this,a,a.type==="checkbox"),X(this,Li)&&!this.hidden&&((i=X(this,Xi))==null||i.focus(),this.hidden=!0))}get keysUsed(){return["Enter","Escape","Tab"," ","ArrowDown","ArrowUp","Home","End"]}handleMove(e){var i,a;const{key:r}=e,s=this.items,o=(a=(i=re(this,ns,dd).call(this,e))!=null?i:re(this,yc,I_).call(this))!=null?a:s[0],l=s.indexOf(o);let d=Math.max(0,l);r==="ArrowDown"?d++:r==="ArrowUp"?d--:e.key==="Home"?d=0:e.key==="End"&&(d=s.length-1),d<0&&(d=s.length-1),d>s.length-1&&(d=0),re(this,ss,ud).call(this,s[d]),s[d].focus()}};n(Vm,"MediaChromeMenu");let tt=Vm;Zt=new WeakMap;Xi=new WeakMap;Li=new WeakMap;ml=new WeakMap;Yn=new WeakMap;Ma=new WeakMap;Bs=new WeakMap;hc=new WeakSet;E_=n(function(t){const e=t.target;for(const i of e.assignedNodes({flatten:!0}))i.nodeType===3&&i.textContent.trim()===""&&i.remove();["header","title"].includes(e.name)&&re(this,sd,xh).call(this),e.name||X(this,od).call(this)},"handleSlotChange_fn$1");sd=new WeakSet;xh=n(function(){const t=this.shadowRoot.querySelector('slot[name="header"]'),e=this.shadowRoot.querySelector('slot[name="title"]');t.hidden=e.assignedNodes().length===0&&t.assignedNodes().length===0},"toggleHeader_fn");od=new WeakMap;pl=new WeakSet;mc=n(function(){var t;const e=this.shadowRoot.querySelector("#layout-row"),i=(t=getComputedStyle(this).getPropertyValue("--media-menu-layout"))==null?void 0:t.trim();e.setAttribute("media",i==="row"?"":"width:0")},"updateLayoutStyle_fn");pc=new WeakSet;__=n(function(t){_t(this,Li,t.relatedTarget),Mi(this,t.relatedTarget)||(this.hidden=!this.hidden)},"handleInvoke_fn");vc=new WeakSet;b_=n(function(){var t;(t=X(this,Li))==null||t.setAttribute("aria-expanded","true"),this.addEventListener("transitionend",()=>this.focus(),{once:!0}),Jr(Ks(this),X(this,Sr)),Jr(this,X(this,wr))},"handleOpen_fn");fc=new WeakSet;g_=n(function(){var t;(t=X(this,Li))==null||t.setAttribute("aria-expanded","false"),en(Ks(this),X(this,Sr)),en(this,X(this,wr))},"handleClosed_fn");Sr=new WeakMap;wr=new WeakMap;Ir=new WeakSet;Fs=n(function(t){if(this.hasAttribute("mediacontroller")&&!this.anchor||this.hidden||!this.anchorElement)return;const{x:e,y:i}=Ik({anchor:this.anchorElement,floating:this,placement:"top-start"});t??(t=this.offsetWidth);const r=Ks(this).getBoundingClientRect(),s=r.width-e-t,o=r.height-i-this.offsetHeight,{style:l}=X(this,Bs);l.setProperty("position","absolute"),l.setProperty("right",`${Math.max(0,s)}px`),l.setProperty("--_menu-bottom",`${o}px`);const d=getComputedStyle(this),p=l.getPropertyValue("--_menu-bottom")===d.bottom?o:parseFloat(d.bottom),v=r.height-p-parseFloat(d.marginBottom);this.style.setProperty("--_menu-max-height",`${v}px`)},"positionMenu_fn");ld=new WeakSet;Nh=n(function(t){const e=this.querySelector('[role="menuitem"][aria-haspopup][aria-expanded="true"]'),i=e?.querySelector('[role="menu"]'),{style:a}=X(this,Bs);if(t||a.setProperty("--media-menu-transition-in","none"),i){const r=i.offsetHeight,s=Math.max(i.offsetWidth,e.offsetWidth);this.style.setProperty("min-width",`${s}px`),this.style.setProperty("min-height",`${r}px`),re(this,Ir,Fs).call(this,s)}else this.style.removeProperty("min-width"),this.style.removeProperty("min-height"),re(this,Ir,Fs).call(this);a.removeProperty("--media-menu-transition-in")},"resizeMenu_fn");Ec=new WeakSet;y_=n(function(t){var e;if(t.stopPropagation(),t.composedPath().includes(X(this,Ph,T_))){(e=X(this,Xi))==null||e.focus(),this.hidden=!0;return}const i=re(this,ns,dd).call(this,t);!i||i.hasAttribute("disabled")||(re(this,ss,ud).call(this,i),this.handleSelect(t))},"handleClick_fn");Ph=new WeakSet;T_=n(function(){var t;return(t=this.shadowRoot.querySelector('slot[name="header"]').assignedElements({flatten:!0}))==null?void 0:t.find(i=>i.matches('button[part~="back"]'))},"backButtonElement_get");_c=new WeakSet;A_=n(function(t){if(t.target===this)return;re(this,$h,k_).call(this);const e=Array.from(this.querySelectorAll('[role="menuitem"][aria-haspopup]'));for(const i of e)i.invokeTargetElement!=t.target&&t.newState=="open"&&i.getAttribute("aria-expanded")=="true"&&!i.invokeTargetElement.hidden&&i.invokeTargetElement.dispatchEvent(new Ws({relatedTarget:i}));for(const i of e)i.setAttribute("aria-expanded",`${!i.submenuElement.hidden}`);re(this,ld,Nh).call(this,!0)},"handleToggle_fn");$h=new WeakSet;k_=n(function(){const e=this.querySelector('[role="menuitem"] > [role="menu"]:not([hidden])');this.container.classList.toggle("has-expanded",!!e)},"checkSubmenuHasExpanded_fn");bc=new WeakSet;S_=n(function(t){var e;Mi(this,t.relatedTarget)||(X(this,Ma)&&((e=X(this,Xi))==null||e.focus()),X(this,Li)&&X(this,Li)!==t.relatedTarget&&!this.hidden&&(this.hidden=!0))},"handleFocusOut_fn");gc=new WeakSet;w_=n(function(t){var e,i,a,r,s;const{key:o,ctrlKey:l,altKey:d,metaKey:h}=t;if(!(l||d||h)&&this.keysUsed.includes(o))if(t.preventDefault(),t.stopPropagation(),o==="Tab"){if(X(this,Ma)){this.hidden=!0;return}t.shiftKey?(i=(e=this.previousElementSibling)==null?void 0:e.focus)==null||i.call(e):(r=(a=this.nextElementSibling)==null?void 0:a.focus)==null||r.call(a),this.blur()}else o==="Escape"?((s=X(this,Xi))==null||s.focus(),X(this,Ma)&&(this.hidden=!0)):o==="Enter"||o===" "?this.handleSelect(t):this.handleMove(t)},"handleKeyDown_fn");ns=new WeakSet;dd=n(function(t){return t.composedPath().find(e=>["menuitemradio","menuitemcheckbox"].includes(e.role))},"getItem_fn");yc=new WeakSet;I_=n(function(){return this.items.find(t=>t.tabIndex===0)},"getTabItem_fn");ss=new WeakSet;ud=n(function(t){for(const e of this.items)e.tabIndex=e===t?0:-1},"setTabItem_fn");vl=new WeakSet;Tc=n(function(t,e){const i=[...this.checkedItems];t.type==="radio"&&this.radioGroupItems.forEach(a=>a.checked=!1),e?t.checked=!t.checked:t.checked=!0,this.checkedItems.some((a,r)=>a!=i[r])&&this.dispatchEvent(new Event("change",{bubbles:!0,composed:!0}))},"selectItem_fn");tt.shadowRootOptions={mode:"open"};tt.getTemplateHTML=Mk;function Ok(t){return["menuitem","menuitemradio","menuitemcheckbox"].includes(t?.role)}n(Ok,"isMenuItem");function Ks(t){var e;return(e=t.getAttribute("bounds")?pn(t,`#${t.getAttribute("bounds")}`):et(t)||t.parentElement)!=null?e:t}n(Ks,"getBoundsElement");y.customElements.get("media-chrome-menu")||y.customElements.define("media-chrome-menu",tt);var Uh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$5"),je=n((t,e,i)=>(Uh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$5"),Ei=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$5"),tu=n((t,e,i,a)=>(Uh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$4"),br=n((t,e,i)=>(Uh(t,e,"access private method"),i),"__privateMethod$5"),fl,os,Ac,R_,cd,Hh,Wh,L_,oi,ur,kc,El,Sc;function xk(t){return`
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
  `}n(xk,"getTemplateHTML$5");function Nk(t){return""}n(Nk,"getSuffixSlotInnerHTML$1");const vt={TYPE:"type",VALUE:"value",CHECKED:"checked",DISABLED:"disabled"},qm=class qm extends y.HTMLElement{constructor(){if(super(),Ei(this,Ac),Ei(this,cd),Ei(this,Wh),Ei(this,El),Ei(this,fl,!1),Ei(this,os,void 0),Ei(this,oi,()=>{var e,i;this.submenuElement.items&&this.setAttribute("submenusize",`${this.submenuElement.items.length}`);const a=this.shadowRoot.querySelector('slot[name="description"]'),r=(e=this.submenuElement.checkedItems)==null?void 0:e[0],s=(i=r?.dataset.description)!=null?i:r?.text,o=we.createElement("span");o.textContent=s??"",a.replaceChildren(o)}),Ei(this,ur,e=>{const{key:i}=e;if(!this.keysUsed.includes(i)){this.removeEventListener("keyup",je(this,ur));return}this.handleClick(e)}),Ei(this,kc,e=>{const{metaKey:i,altKey:a,key:r}=e;if(i||a||!this.keysUsed.includes(r)){this.removeEventListener("keyup",je(this,ur));return}this.addEventListener("keyup",je(this,ur),{once:!0})}),!this.shadowRoot){this.attachShadow(this.constructor.shadowRootOptions);const e=ct(this.attributes);this.shadowRoot.innerHTML=this.constructor.getTemplateHTML(e)}}static get observedAttributes(){return[vt.TYPE,vt.DISABLED,vt.CHECKED,vt.VALUE]}enable(){this.hasAttribute("tabindex")||this.setAttribute("tabindex","-1"),Sn(this)&&!this.hasAttribute("aria-checked")&&this.setAttribute("aria-checked","false"),this.addEventListener("click",this),this.addEventListener("keydown",this)}disable(){this.removeAttribute("tabindex"),this.removeEventListener("click",this),this.removeEventListener("keydown",this),this.removeEventListener("keyup",this)}handleEvent(e){switch(e.type){case"slotchange":br(this,Ac,R_).call(this,e);break;case"click":this.handleClick(e);break;case"keydown":je(this,kc).call(this,e);break;case"keyup":je(this,ur).call(this,e);break}}attributeChangedCallback(e,i,a){e===vt.CHECKED&&Sn(this)&&!je(this,fl)?this.setAttribute("aria-checked",a!=null?"true":"false"):e===vt.TYPE&&a!==i?this.role="menuitem"+a:e===vt.DISABLED&&a!==i&&(a==null?this.enable():this.disable())}connectedCallback(){this.hasAttribute(vt.DISABLED)||this.enable(),this.role="menuitem"+this.type,tu(this,os,wc(this,this.parentNode)),br(this,El,Sc).call(this),this.submenuElement&&br(this,cd,Hh).call(this),this.shadowRoot.addEventListener("slotchange",this)}disconnectedCallback(){this.disable(),br(this,El,Sc).call(this),tu(this,os,null),this.shadowRoot.removeEventListener("slotchange",this)}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=Rd(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):this.submenuElement}get submenuElement(){return this.shadowRoot.querySelector('slot[name="submenu"]').assignedElements({flatten:!0})[0]}get type(){var e;return(e=this.getAttribute(vt.TYPE))!=null?e:""}set type(e){this.setAttribute(vt.TYPE,`${e}`)}get value(){var e;return(e=this.getAttribute(vt.VALUE))!=null?e:this.text}set value(e){this.setAttribute(vt.VALUE,e)}get text(){var e;return((e=this.textContent)!=null?e:"").trim()}get checked(){if(Sn(this))return this.getAttribute("aria-checked")==="true"}set checked(e){Sn(this)&&(tu(this,fl,!0),this.setAttribute("aria-checked",e?"true":"false"),e?this.part.add("checked"):this.part.remove("checked"))}handleClick(e){Sn(this)||this.invokeTargetElement&&Mi(this,e.target)&&this.invokeTargetElement.dispatchEvent(new Ws({relatedTarget:this}))}get keysUsed(){return["Enter"," "]}};n(qm,"MediaChromeMenuItem");let hi=qm;fl=new WeakMap;os=new WeakMap;Ac=new WeakSet;R_=n(function(t){const e=t.target;if(!e?.name)for(const a of e.assignedNodes({flatten:!0}))a instanceof Text&&a.textContent.trim()===""&&a.remove();e.name==="submenu"&&(this.submenuElement?br(this,cd,Hh).call(this):br(this,Wh,L_).call(this))},"handleSlotChange_fn");cd=new WeakSet;Hh=n(async function(){this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",`${!this.submenuElement.hidden}`),this.submenuElement.addEventListener("change",je(this,oi)),this.submenuElement.addEventListener("addmenuitem",je(this,oi)),this.submenuElement.addEventListener("removemenuitem",je(this,oi)),je(this,oi).call(this)},"submenuConnected_fn");Wh=new WeakSet;L_=n(function(){this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"),this.submenuElement.removeEventListener("change",je(this,oi)),this.submenuElement.removeEventListener("addmenuitem",je(this,oi)),this.submenuElement.removeEventListener("removemenuitem",je(this,oi)),je(this,oi).call(this)},"submenuDisconnected_fn");oi=new WeakMap;ur=new WeakMap;kc=new WeakMap;El=new WeakSet;Sc=n(function(){var t;const e=(t=je(this,os))==null?void 0:t.radioGroupItems;if(!e)return;let i=e.filter(a=>a.getAttribute("aria-checked")==="true").pop();i||(i=e[0]);for(const a of e)a.setAttribute("aria-checked","false");i?.setAttribute("aria-checked","true")},"reset_fn");hi.shadowRootOptions={mode:"open"};hi.getTemplateHTML=xk;hi.getSuffixSlotInnerHTML=Nk;function Sn(t){return t.type==="radio"||t.type==="checkbox"}n(Sn,"isCheckable");function wc(t,e){if(!t)return null;const{host:i}=t.getRootNode();return!e&&i?wc(t,i):e?.items?e:wc(e,e?.parentNode)}n(wc,"closestMenuItemsContainer");y.customElements.get("media-chrome-menu-item")||y.customElements.define("media-chrome-menu-item",hi);function Pk(t){return`
    ${tt.getTemplateHTML(t)}
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
  `}n(Pk,"getTemplateHTML$4");const Ym=class Ym extends tt{get anchorElement(){return this.anchor!=="auto"?super.anchorElement:et(this).querySelector("media-settings-menu-button")}};n(Ym,"MediaSettingsMenu");let hd=Ym;hd.getTemplateHTML=Pk;y.customElements.get("media-settings-menu")||y.customElements.define("media-settings-menu",hd);function $k(t){return`
    ${hi.getTemplateHTML.call(this,t)}
    <style>
      slot:not([name="submenu"]) {
        opacity: var(--media-settings-menu-item-opacity, var(--media-menu-item-opacity));
      }

      :host([aria-expanded="true"]:hover) {
        background: transparent;
      }
    </style>
  `}n($k,"getTemplateHTML$3");function Uk(t){return`
    <svg aria-hidden="true" viewBox="0 0 20 24">
      <path d="m8.12 17.585-.742-.669 4.2-4.665-4.2-4.666.743-.669 4.803 5.335-4.803 5.334Z"/>
    </svg>
  `}n(Uk,"getSuffixSlotInnerHTML");const Gm=class Gm extends hi{};n(Gm,"MediaSettingsMenuItem");let hn=Gm;hn.shadowRootOptions={mode:"open"};hn.getTemplateHTML=$k;hn.getSuffixSlotInnerHTML=Uk;y.customElements.get("media-settings-menu-item")||y.customElements.define("media-settings-menu-item",hn);const zm=class zm extends Ie{connectedCallback(){super.connectedCallback(),this.invokeTargetElement&&this.setAttribute("aria-haspopup","menu")}get invokeTarget(){return this.getAttribute("invoketarget")}set invokeTarget(e){this.setAttribute("invoketarget",`${e}`)}get invokeTargetElement(){var e;return this.invokeTarget?(e=Rd(this))==null?void 0:e.querySelector(`#${this.invokeTarget}`):null}handleClick(){var e;(e=this.invokeTargetElement)==null||e.dispatchEvent(new Ws({relatedTarget:this}))}};n(zm,"MediaChromeMenuButton");let na=zm;y.customElements.get("media-chrome-menu-button")||y.customElements.define("media-chrome-menu-button",na);function Hk(){return`
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
  `}n(Hk,"getSlotTemplateHTML$4");function Wk(){return C("Settings")}n(Wk,"getTooltipContentHTML$4");const Qm=class Qm extends na{static get observedAttributes(){return[...super.observedAttributes,"target"]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",C("settings"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:et(this).querySelector("media-settings-menu")}};n(Qm,"MediaSettingsMenuButton");let Vs=Qm;Vs.getSlotTemplateHTML=Hk;Vs.getTooltipContentHTML=Wk;y.customElements.get("media-settings-menu-button")||y.customElements.define("media-settings-menu-button",Vs);var Bh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$4"),C_=n((t,e,i)=>(Bh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$4"),_o=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$4"),Ic=n((t,e,i,a)=>(Bh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$3"),bo=n((t,e,i)=>(Bh(t,e,"access private method"),i),"__privateMethod$4"),Gn,md,_l,Rc,bl,Lc;const jm=class jm extends tt{constructor(){super(...arguments),_o(this,_l),_o(this,bl),_o(this,Gn,[]),_o(this,md,void 0)}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_AUDIO_TRACK_LIST,m.MEDIA_AUDIO_TRACK_ENABLED,m.MEDIA_AUDIO_TRACK_UNAVAILABLE]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_AUDIO_TRACK_ENABLED&&i!==a?this.value=a:e===m.MEDIA_AUDIO_TRACK_LIST&&i!==a&&(Ic(this,Gn,Ly(a??"")),bo(this,_l,Rc).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",bo(this,bl,Lc))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",bo(this,bl,Lc))}get anchorElement(){var e;return this.anchor!=="auto"?super.anchorElement:(e=et(this))==null?void 0:e.querySelector("media-audio-track-menu-button")}get mediaAudioTrackList(){return C_(this,Gn)}set mediaAudioTrackList(e){Ic(this,Gn,e),bo(this,_l,Rc).call(this)}get mediaAudioTrackEnabled(){var e;return(e=he(this,m.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){le(this,m.MEDIA_AUDIO_TRACK_ENABLED,e)}};n(jm,"MediaAudioTrackMenu");let Cc=jm;Gn=new WeakMap;md=new WeakMap;_l=new WeakSet;Rc=n(function(){if(C_(this,md)===JSON.stringify(this.mediaAudioTrackList))return;Ic(this,md,JSON.stringify(this.mediaAudioTrackList));const t=this.mediaAudioTrackList;this.defaultSlot.textContent="",t.sort((e,i)=>e.id.localeCompare(i.id,void 0,{numeric:!0}));for(const e of t){const i=this.formatMenuItemText(e.label,e),a=cn({type:"radio",text:i,value:`${e.id}`,checked:e.enabled});a.prepend(Oa(this,"checked-indicator")),this.defaultSlot.append(a)}},"render_fn$3");bl=new WeakSet;Lc=n(function(){if(this.value==null)return;const t=new y.CustomEvent(D.MEDIA_AUDIO_TRACK_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn$3");y.customElements.get("media-audio-track-menu")||y.customElements.define("media-audio-track-menu",Cc);const Bk=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M11 17H9.5V7H11v10Zm-3-3H6.5v-4H8v4Zm6-5h-1.5v6H14V9Zm3 7h-1.5V8H17v8Z"/>
  <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-2 0a8 8 0 1 0-16 0 8 8 0 0 0 16 0Z"/>
</svg>`;function Fk(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${Bk}</slot>
  `}n(Fk,"getSlotTemplateHTML$3");function Kk(){return C("Audio")}n(Kk,"getTooltipContentHTML$3");const Mv=n(t=>{const e=C("Audio");t.setAttribute("aria-label",e)},"updateAriaLabel$1"),Zm=class Zm extends na{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_AUDIO_TRACK_ENABLED,m.MEDIA_AUDIO_TRACK_UNAVAILABLE]}connectedCallback(){super.connectedCallback(),Mv(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_LANG&&Mv(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=et(this))==null?void 0:e.querySelector("media-audio-track-menu")}get mediaAudioTrackEnabled(){var e;return(e=he(this,m.MEDIA_AUDIO_TRACK_ENABLED))!=null?e:""}set mediaAudioTrackEnabled(e){le(this,m.MEDIA_AUDIO_TRACK_ENABLED,e)}};n(Zm,"MediaAudioTrackMenuButton");let qs=Zm;qs.getSlotTemplateHTML=Fk;qs.getTooltipContentHTML=Kk;y.customElements.get("media-audio-track-menu-button")||y.customElements.define("media-audio-track-menu-button",qs);var Fh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$3"),Vk=n((t,e,i)=>(Fh(t,e,"read from private field"),e.get(t)),"__privateGet$3"),iu=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$3"),qk=n((t,e,i,a)=>(Fh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$2"),go=n((t,e,i)=>(Fh(t,e,"access private method"),i),"__privateMethod$3"),pd,gl,Dc,yl,Mc;const Yk=`
  <svg aria-hidden="true" viewBox="0 0 26 24" part="captions-indicator indicator">
    <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
  </svg>`;function Gk(t){return`
    ${tt.getTemplateHTML(t)}
    <slot name="captions-indicator" hidden>${Yk}</slot>
  `}n(Gk,"getTemplateHTML$2");const Xm=class Xm extends tt{constructor(){super(...arguments),iu(this,gl),iu(this,yl),iu(this,pd,void 0)}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_SUBTITLES_LIST,m.MEDIA_SUBTITLES_SHOWING]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_SUBTITLES_LIST&&i!==a?go(this,gl,Dc).call(this):e===m.MEDIA_SUBTITLES_SHOWING&&i!==a&&(this.value=a||"",go(this,gl,Dc).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",go(this,yl,Mc))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",go(this,yl,Mc))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:et(this).querySelector("media-captions-menu-button")}get mediaSubtitlesList(){return Ov(this,m.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){xv(this,m.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return Ov(this,m.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){xv(this,m.MEDIA_SUBTITLES_SHOWING,e)}};n(Xm,"MediaCaptionsMenu");let vd=Xm;pd=new WeakMap;gl=new WeakSet;Dc=n(function(){var t;const e=Vk(this,pd)!==JSON.stringify(this.mediaSubtitlesList),i=this.value!==this.getAttribute(m.MEDIA_SUBTITLES_SHOWING);if(!e&&!i)return;qk(this,pd,JSON.stringify(this.mediaSubtitlesList)),this.defaultSlot.textContent="";const a=!this.value,r=cn({type:"radio",text:this.formatMenuItemText(C("Off")),value:"off",checked:a});r.prepend(Oa(this,"checked-indicator")),this.defaultSlot.append(r);const s=this.mediaSubtitlesList;for(const o of s){const l=cn({type:"radio",text:this.formatMenuItemText(o.label,o),value:Ou(o),checked:this.value==Ou(o)});l.prepend(Oa(this,"checked-indicator")),((t=o.kind)!=null?t:"subs")==="captions"&&l.append(Oa(this,"captions-indicator")),this.defaultSlot.append(l)}},"render_fn$2");yl=new WeakSet;Mc=n(function(){const t=this.mediaSubtitlesShowing,e=this.getAttribute(m.MEDIA_SUBTITLES_SHOWING),i=this.value!==e;if(t?.length&&i&&this.dispatchEvent(new y.CustomEvent(D.MEDIA_DISABLE_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:t})),!this.value||!i)return;const a=new y.CustomEvent(D.MEDIA_SHOW_SUBTITLES_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(a)},"onChange_fn$2");vd.getTemplateHTML=Gk;const Ov=n((t,e)=>{const i=t.getAttribute(e);return i?Dd(i):[]},"getSubtitlesListAttr$1"),xv=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=gs(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr$1");y.customElements.get("media-captions-menu")||y.customElements.define("media-captions-menu",vd);const zk=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M22.83 5.68a2.58 2.58 0 0 0-2.3-2.5c-3.62-.24-11.44-.24-15.06 0a2.58 2.58 0 0 0-2.3 2.5c-.23 4.21-.23 8.43 0 12.64a2.58 2.58 0 0 0 2.3 2.5c3.62.24 11.44.24 15.06 0a2.58 2.58 0 0 0 2.3-2.5c.23-4.21.23-8.43 0-12.64Zm-11.39 9.45a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.92 3.92 0 0 1 .92-2.77 3.18 3.18 0 0 1 2.43-1 2.94 2.94 0 0 1 2.13.78c.364.359.62.813.74 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.17 1.61 1.61 0 0 0-1.29.58 2.79 2.79 0 0 0-.5 1.89 3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.48 1.48 0 0 0 1-.37 2.1 2.1 0 0 0 .59-1.14l1.4.44a3.23 3.23 0 0 1-1.07 1.69Zm7.22 0a3.07 3.07 0 0 1-1.91.57 3.06 3.06 0 0 1-2.34-1 3.75 3.75 0 0 1-.92-2.67 3.88 3.88 0 0 1 .93-2.77 3.14 3.14 0 0 1 2.42-1 3 3 0 0 1 2.16.82 2.8 2.8 0 0 1 .73 1.31l-1.43.35a1.49 1.49 0 0 0-1.51-1.21 1.61 1.61 0 0 0-1.29.58A2.79 2.79 0 0 0 15 12a3 3 0 0 0 .49 1.93 1.61 1.61 0 0 0 1.27.58 1.44 1.44 0 0 0 1-.37 2.1 2.1 0 0 0 .6-1.15l1.4.44a3.17 3.17 0 0 1-1.1 1.7Z"/>
</svg>`,Qk=`<svg aria-hidden="true" viewBox="0 0 26 24">
  <path d="M17.73 14.09a1.4 1.4 0 0 1-1 .37 1.579 1.579 0 0 1-1.27-.58A3 3 0 0 1 15 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34A2.89 2.89 0 0 0 19 9.07a3 3 0 0 0-2.14-.78 3.14 3.14 0 0 0-2.42 1 3.91 3.91 0 0 0-.93 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.17 3.17 0 0 0 1.07-1.74l-1.4-.45c-.083.43-.3.822-.62 1.12Zm-7.22 0a1.43 1.43 0 0 1-1 .37 1.58 1.58 0 0 1-1.27-.58A3 3 0 0 1 7.76 12a2.8 2.8 0 0 1 .5-1.85 1.63 1.63 0 0 1 1.29-.57 1.47 1.47 0 0 1 1.51 1.2l1.43-.34a2.81 2.81 0 0 0-.74-1.32 2.94 2.94 0 0 0-2.13-.78 3.18 3.18 0 0 0-2.43 1 4 4 0 0 0-.92 2.78 3.74 3.74 0 0 0 .92 2.66 3.07 3.07 0 0 0 2.34 1 3.07 3.07 0 0 0 1.91-.57 3.23 3.23 0 0 0 1.07-1.74l-1.4-.45a2.06 2.06 0 0 1-.6 1.07Zm12.32-8.41a2.59 2.59 0 0 0-2.3-2.51C18.72 3.05 15.86 3 13 3c-2.86 0-5.72.05-7.53.17a2.59 2.59 0 0 0-2.3 2.51c-.23 4.207-.23 8.423 0 12.63a2.57 2.57 0 0 0 2.3 2.5c1.81.13 4.67.19 7.53.19 2.86 0 5.72-.06 7.53-.19a2.57 2.57 0 0 0 2.3-2.5c.23-4.207.23-8.423 0-12.63Zm-1.49 12.53a1.11 1.11 0 0 1-.91 1.11c-1.67.11-4.45.18-7.43.18-2.98 0-5.76-.07-7.43-.18a1.11 1.11 0 0 1-.91-1.11c-.21-4.14-.21-8.29 0-12.43a1.11 1.11 0 0 1 .91-1.11C7.24 4.56 10 4.49 13 4.49s5.76.07 7.43.18a1.11 1.11 0 0 1 .91 1.11c.21 4.14.21 8.29 0 12.43Z"/>
</svg>`;function jk(){return`
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
      <slot name="on">${zk}</slot>
      <slot name="off">${Qk}</slot>
    </slot>
  `}n(jk,"getSlotTemplateHTML$2");function Zk(){return C("Captions")}n(Zk,"getTooltipContentHTML$2");const Nv=n(t=>{t.setAttribute("data-captions-enabled",SE(t).toString())},"updateAriaChecked"),Pv=n(t=>{t.setAttribute("aria-label",C("closed captions"))},"updateAriaLabel"),Jm=class Jm extends na{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_SUBTITLES_LIST,m.MEDIA_SUBTITLES_SHOWING,m.MEDIA_LANG]}connectedCallback(){super.connectedCallback(),Pv(this),Nv(this)}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_SUBTITLES_SHOWING?Nv(this):e===m.MEDIA_LANG&&Pv(this)}get invokeTargetElement(){var e;return this.invokeTarget!=null?super.invokeTargetElement:(e=et(this))==null?void 0:e.querySelector("media-captions-menu")}get mediaSubtitlesList(){return $v(this,m.MEDIA_SUBTITLES_LIST)}set mediaSubtitlesList(e){Uv(this,m.MEDIA_SUBTITLES_LIST,e)}get mediaSubtitlesShowing(){return $v(this,m.MEDIA_SUBTITLES_SHOWING)}set mediaSubtitlesShowing(e){Uv(this,m.MEDIA_SUBTITLES_SHOWING,e)}};n(Jm,"MediaCaptionsMenuButton");let Ys=Jm;Ys.getSlotTemplateHTML=jk;Ys.getTooltipContentHTML=Zk;const $v=n((t,e)=>{const i=t.getAttribute(e);return i?Dd(i):[]},"getSubtitlesListAttr"),Uv=n((t,e,i)=>{if(!i?.length){t.removeAttribute(e);return}const a=gs(i);t.getAttribute(e)!==a&&t.setAttribute(e,a)},"setSubtitlesListAttr");y.customElements.get("media-captions-menu-button")||y.customElements.define("media-captions-menu-button",Ys);var D_=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$2"),cr=n((t,e,i)=>(D_(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$2"),au=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$2"),Va=n((t,e,i)=>(D_(t,e,"access private method"),i),"__privateMethod$2"),Gi,hr,zn,Tl,Oc;const ru={RATES:"rates"},ep=class ep extends tt{constructor(){super(),au(this,hr),au(this,Tl),au(this,Gi,new bs(this,ru.RATES,{defaultValue:JE})),Va(this,hr,zn).call(this)}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_PLAYBACK_RATE,ru.RATES]}attributeChangedCallback(e,i,a){super.attributeChangedCallback(e,i,a),e===m.MEDIA_PLAYBACK_RATE&&i!=a?(this.value=a,Va(this,hr,zn).call(this)):e===ru.RATES&&i!=a&&(cr(this,Gi).value=a,Va(this,hr,zn).call(this))}connectedCallback(){super.connectedCallback(),this.addEventListener("change",Va(this,Tl,Oc))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",Va(this,Tl,Oc))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:et(this).querySelector("media-playback-rate-menu-button")}get rates(){return cr(this,Gi)}set rates(e){e?Array.isArray(e)?cr(this,Gi).value=e.join(" "):typeof e=="string"&&(cr(this,Gi).value=e):cr(this,Gi).value="",Va(this,hr,zn).call(this)}get mediaPlaybackRate(){return se(this,m.MEDIA_PLAYBACK_RATE,_r)}set mediaPlaybackRate(e){fe(this,m.MEDIA_PLAYBACK_RATE,e)}};n(ep,"MediaPlaybackRateMenu");let xc=ep;Gi=new WeakMap;hr=new WeakSet;zn=n(function(){this.defaultSlot.textContent="";const t=this.mediaPlaybackRate,e=new Set(Array.from(cr(this,Gi)).map(a=>Number(a)));t>0&&!e.has(t)&&e.add(t);const i=Array.from(e).sort((a,r)=>a-r);for(const a of i){const r=cn({type:"radio",text:this.formatMenuItemText(`${a}x`,a),value:a.toString(),checked:t===a});r.prepend(Oa(this,"checked-indicator")),this.defaultSlot.append(r)}},"render_fn$1");Tl=new WeakSet;Oc=n(function(){if(!this.value)return;const t=new y.CustomEvent(D.MEDIA_PLAYBACK_RATE_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn$1");y.customElements.get("media-playback-rate-menu")||y.customElements.define("media-playback-rate-menu",xc);const Al=1;function Xk(t){return`
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
    <slot name="icon">${t.mediaplaybackrate||Al}x</slot>
  `}n(Xk,"getSlotTemplateHTML$1");function Jk(){return C("Playback rate")}n(Jk,"getTooltipContentHTML$1");const tp=class tp extends na{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_PLAYBACK_RATE]}constructor(){var e;super(),this.container=this.shadowRoot.querySelector('slot[name="icon"]'),this.container.innerHTML=`${(e=this.mediaPlaybackRate)!=null?e:Al}x`}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),e===m.MEDIA_PLAYBACK_RATE){const r=a?+a:Number.NaN,s=Number.isNaN(r)?Al:r;this.container.innerHTML=`${s}x`,this.setAttribute("aria-label",C("Playback rate {playbackRate}",{playbackRate:s}))}}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:et(this).querySelector("media-playback-rate-menu")}get mediaPlaybackRate(){return se(this,m.MEDIA_PLAYBACK_RATE,Al)}set mediaPlaybackRate(e){fe(this,m.MEDIA_PLAYBACK_RATE,e)}};n(tp,"MediaPlaybackRateMenuButton");let Gs=tp;Gs.getSlotTemplateHTML=Xk;Gs.getTooltipContentHTML=Jk;y.customElements.get("media-playback-rate-menu-button")||y.customElements.define("media-playback-rate-menu-button",Gs);var Kh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck$1"),bi=n((t,e,i)=>(Kh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet$1"),yo=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd$1"),Hv=n((t,e,i,a)=>(Kh(t,e,"write to private field"),e.set(t,i),i),"__privateSet$1"),qa=n((t,e,i)=>(Kh(t,e,"access private method"),i),"__privateMethod$1"),Qn,Jt,mr,jn,kl,Nc;const ip=class ip extends tt{constructor(){super(...arguments),yo(this,mr),yo(this,kl),yo(this,Qn,[]),yo(this,Jt,{})}static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_RENDITION_LIST,m.MEDIA_RENDITION_SELECTED,m.MEDIA_RENDITION_UNAVAILABLE,m.MEDIA_HEIGHT,m.MEDIA_WIDTH]}static formatMenuItemText(e,i){return super.formatMenuItemText(e,i)}static formatRendition(e,{showBitrate:i=!1}={}){const a=`${Math.min(e.width,e.height)}p`;if(i&&e.bitrate){const r=e.bitrate/1e6,s=`${r.toFixed(r<1?1:0)} Mbps`;return`${a} (${s})`}return this.formatMenuItemText(a,e)}static compareRendition(e,i){var a,r;return i.height===e.height?((a=i.bitrate)!=null?a:0)-((r=e.bitrate)!=null?r:0):i.height-e.height}attributeChangedCallback(e,i,a){if(super.attributeChangedCallback(e,i,a),i!==a)switch(e){case m.MEDIA_RENDITION_SELECTED:this.value=a??"auto",qa(this,mr,jn).call(this);break;case m.MEDIA_RENDITION_LIST:Hv(this,Qn,Sy(a)),qa(this,mr,jn).call(this);break;case m.MEDIA_HEIGHT:case m.MEDIA_WIDTH:qa(this,mr,jn).call(this);break}}connectedCallback(){super.connectedCallback(),this.addEventListener("change",qa(this,kl,Nc))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("change",qa(this,kl,Nc))}get anchorElement(){return this.anchor!=="auto"?super.anchorElement:et(this).querySelector("media-rendition-menu-button")}get mediaRenditionList(){return bi(this,Qn)}set mediaRenditionList(e){Hv(this,Qn,e),qa(this,mr,jn).call(this)}get mediaRenditionSelected(){return he(this,m.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){le(this,m.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return se(this,m.MEDIA_HEIGHT)}set mediaHeight(e){fe(this,m.MEDIA_HEIGHT,e)}get mediaWidth(){return se(this,m.MEDIA_WIDTH)}set mediaWidth(e){fe(this,m.MEDIA_WIDTH,e)}compareRendition(e,i){return this.constructor.compareRendition(e,i)}formatMenuItemText(e,i){return this.constructor.formatMenuItemText(e,i)}formatRendition(e,i){return this.constructor.formatRendition(e,i)}showRenditionBitrate(e){return this.mediaRenditionList.some(i=>i!==e&&i.height===e.height&&i.bitrate!==e.bitrate)}};n(ip,"MediaRenditionMenu");let Pc=ip;Qn=new WeakMap;Jt=new WeakMap;mr=new WeakSet;jn=n(function(){const t=!this.mediaRenditionSelected;if(bi(this,Jt).mediaRenditionList===JSON.stringify(this.mediaRenditionList)&&bi(this,Jt).mediaHeight===this.mediaHeight&&bi(this,Jt).mediaWidth===this.mediaWidth&&bi(this,Jt).isAuto===t)return;bi(this,Jt).mediaRenditionList=JSON.stringify(this.mediaRenditionList),bi(this,Jt).mediaHeight=this.mediaHeight,bi(this,Jt).mediaWidth=this.mediaWidth,bi(this,Jt).isAuto=t;const e=this.mediaRenditionList.sort(this.compareRendition.bind(this)),i=e.find(o=>o.id===this.mediaRenditionSelected);for(const o of e)o.selected=o===i;this.defaultSlot.textContent="";for(const o of e){const l=this.formatRendition(o,{showBitrate:this.showRenditionBitrate(o)}),d=cn({type:"radio",text:l,value:`${o.id}`,checked:o.selected&&!t});d.prepend(Oa(this,"checked-indicator")),this.defaultSlot.append(d)}const a=i&&this.showRenditionBitrate(i);let r;t&&(i?r=this.formatMenuItemText(`${C("Auto")} • ${this.formatRendition(i,{showBitrate:a})}`,i):this.mediaHeight>0&&this.mediaWidth>0&&(r=this.formatMenuItemText(`${C("Auto")} (${Math.min(this.mediaWidth,this.mediaHeight)}p)`))),r||(r=this.formatMenuItemText(C("Auto")));const s=cn({type:"radio",text:r,value:"auto",checked:t});s.dataset.description=r,s.prepend(Oa(this,"checked-indicator")),this.defaultSlot.append(s)},"render_fn");kl=new WeakSet;Nc=n(function(){if(this.value==null)return;const t=new y.CustomEvent(D.MEDIA_RENDITION_REQUEST,{composed:!0,bubbles:!0,detail:this.value});this.dispatchEvent(t)},"onChange_fn");y.customElements.get("media-rendition-menu")||y.customElements.define("media-rendition-menu",Pc);const eS=`<svg aria-hidden="true" viewBox="0 0 24 24">
  <path d="M13.5 2.5h2v6h-2v-2h-11v-2h11v-2Zm4 2h4v2h-4v-2Zm-12 4h2v6h-2v-2h-3v-2h3v-2Zm4 2h12v2h-12v-2Zm1 4h2v6h-2v-2h-8v-2h8v-2Zm4 2h7v2h-7v-2Z" />
</svg>`;function tS(){return`
    <style>
      :host([aria-expanded="true"]) slot[name=tooltip] {
        display: none;
      }
    </style>
    <slot name="icon">${eS}</slot>
  `}n(tS,"getSlotTemplateHTML");function iS(){return C("Quality")}n(iS,"getTooltipContentHTML");const ap=class ap extends na{static get observedAttributes(){return[...super.observedAttributes,m.MEDIA_RENDITION_SELECTED,m.MEDIA_RENDITION_UNAVAILABLE,m.MEDIA_HEIGHT]}connectedCallback(){super.connectedCallback(),this.setAttribute("aria-label",C("quality"))}get invokeTargetElement(){return this.invokeTarget!=null?super.invokeTargetElement:et(this).querySelector("media-rendition-menu")}get mediaRenditionSelected(){return he(this,m.MEDIA_RENDITION_SELECTED)}set mediaRenditionSelected(e){le(this,m.MEDIA_RENDITION_SELECTED,e)}get mediaHeight(){return se(this,m.MEDIA_HEIGHT)}set mediaHeight(e){fe(this,m.MEDIA_HEIGHT,e)}};n(ap,"MediaRenditionMenuButton");let zs=ap;zs.getSlotTemplateHTML=tS;zs.getTooltipContentHTML=iS;y.customElements.get("media-rendition-menu-button")||y.customElements.define("media-rendition-menu-button",zs);var Vh=n((t,e,i)=>{if(!e.has(t))throw TypeError("Cannot "+i)},"__accessCheck"),ei=n((t,e,i)=>(Vh(t,e,"read from private field"),i?i.call(t):e.get(t)),"__privateGet"),Bt=n((t,e,i)=>{if(e.has(t))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(t):e.set(t,i)},"__privateAdd"),M_=n((t,e,i,a)=>(Vh(t,e,"write to private field"),e.set(t,i),i),"__privateSet"),bt=n((t,e,i)=>(Vh(t,e,"access private method"),i),"__privateMethod"),mn,Qs,Nd,Ta,gr,qh,O_,Sl,$c,wl,Uc,x_,fd,Ed,Il;function aS(t){return`
      ${tt.getTemplateHTML(t)}
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
    `}n(aS,"getTemplateHTML$1");const rp=class rp extends tt{constructor(){super(),Bt(this,Qs),Bt(this,Ta),Bt(this,qh),Bt(this,Sl),Bt(this,Uc),Bt(this,mn,!1),Bt(this,wl,e=>{const i=e.target,a=i?.nodeName==="VIDEO",r=bt(this,Sl,$c).call(this,i);(a||r)&&(ei(this,mn)?bt(this,Ta,gr).call(this):bt(this,Uc,x_).call(this,e))}),Bt(this,fd,e=>{const i=e.target,a=this.contains(i),r=e.button===2,s=i?.nodeName==="VIDEO",o=bt(this,Sl,$c).call(this,i);a||r&&(s||o)||bt(this,Ta,gr).call(this)}),Bt(this,Ed,e=>{e.key==="Escape"&&bt(this,Ta,gr).call(this)}),Bt(this,Il,e=>{var i,a;const r=e.target;if((i=r.matches)!=null&&i.call(r,'button[invoke="copy"]')){const s=(a=r.closest("media-context-menu-item"))==null?void 0:a.querySelector('input[slot="copy"]');s&&navigator.clipboard.writeText(s.value)}bt(this,Ta,gr).call(this)}),this.setAttribute("noautohide",""),bt(this,Qs,Nd).call(this)}connectedCallback(){super.connectedCallback(),et(this).addEventListener("contextmenu",ei(this,wl)),this.addEventListener("click",ei(this,Il))}disconnectedCallback(){super.disconnectedCallback(),et(this).removeEventListener("contextmenu",ei(this,wl)),this.removeEventListener("click",ei(this,Il)),document.removeEventListener("mousedown",ei(this,fd)),document.removeEventListener("keydown",ei(this,Ed))}};n(rp,"MediaContextMenu");let _d=rp;mn=new WeakMap;Qs=new WeakSet;Nd=n(function(){this.hidden=!ei(this,mn)},"updateVisibility_fn");Ta=new WeakSet;gr=n(function(){M_(this,mn,!1),bt(this,Qs,Nd).call(this)},"closeContextMenu_fn");qh=new WeakSet;O_=n(function(){document.querySelectorAll("media-context-menu").forEach(e=>{var i;e!==this&&bt(i=e,Ta,gr).call(i)})},"closeOtherContextMenus_fn");Sl=new WeakSet;$c=n(function(t){return t?t.hasAttribute("slot")&&t.getAttribute("slot")==="media"?!0:t.nodeName.includes("-")&&t.tagName.includes("-")?t.hasAttribute("src")||t.hasAttribute("poster")||t.hasAttribute("preload")||t.hasAttribute("playsinline"):!1:!1},"isVideoContainer_fn");wl=new WeakMap;Uc=new WeakSet;x_=n(function(t){t.preventDefault(),bt(this,qh,O_).call(this),M_(this,mn,!0),this.style.position="fixed",this.style.left=`${t.clientX}px`,this.style.top=`${t.clientY}px`,bt(this,Qs,Nd).call(this),document.addEventListener("mousedown",ei(this,fd),{once:!0}),document.addEventListener("keydown",ei(this,Ed),{once:!0})},"onContextMenu_fn");fd=new WeakMap;Ed=new WeakMap;Il=new WeakMap;_d.getTemplateHTML=aS;y.customElements.get("media-context-menu")||y.customElements.define("media-context-menu",_d);function rS(t){return`
    ${hi.getTemplateHTML.call(this,t)}
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
  `}n(rS,"getTemplateHTML");const np=class np extends hi{};n(np,"MediaContextMenuItem");let js=np;js.shadowRootOptions={mode:"open"};js.getTemplateHTML=rS;y.customElements.get("media-context-menu-item")||y.customElements.define("media-context-menu-item",js);var N_=n(t=>{throw TypeError(t)},"lt"),Yh=n((t,e,i)=>e.has(t)||N_("Cannot "+i),"Ae"),B=n((t,e,i)=>(Yh(t,e,"read from private field"),i?i.call(t):e.get(t)),"l$1"),He=n((t,e,i)=>e.has(t)?N_("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,i),"h$1"),Je=n((t,e,i,a)=>(Yh(t,e,"write to private field"),e.set(t,i),i),"y"),_e=n((t,e,i)=>(Yh(t,e,"access private method"),i),"p$1"),Br,Pd=(Br=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}},n(Br,"Y"),Br);if(typeof DocumentFragment>"u"){const e=class e extends Pd{};n(e,"t");let t=e;globalThis.DocumentFragment=t}var Fr,Gh=(Fr=class extends Pd{},n(Fr,"Q"),Fr),Kr,nS=(Kr=class extends Pd{},n(Kr,"Ce"),Kr),sS={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(Gh)}},Rl,Vr,oS=(Vr=class{constructor(e,i={}){He(this,Rl),Je(this,Rl,i?.detail)}get detail(){return B(this,Rl)}initCustomEvent(){}},n(Vr,"ke"),Vr);Rl=new WeakMap;function lS(t,e){return new Gh}n(lS,"jt");var P_={document:{createElement:lS},DocumentFragment,customElements:sS,CustomEvent:oS,EventTarget:Pd,HTMLElement:Gh,HTMLVideoElement:nS},$_=typeof window>"u"||typeof globalThis.customElements>"u",ii=$_?P_:globalThis,bd=$_?P_.document:globalThis.document;function dS(t){let e="";return Object.entries(t).forEach(([i,a])=>{a!=null&&(e+=`${Hc(i)}: ${a}; `)}),e?e.trim():void 0}n(dS,"ct");function Hc(t){return t.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}n(Hc,"me$1");function U_(t){return t.replace(/[-_]([a-z])/g,(e,i)=>i.toUpperCase())}n(U_,"ce");function Ve(t){if(t==null)return;let e=+t;return Number.isNaN(e)?void 0:e}n(Ve,"f$1");function H_(t){let e=uS(t).toString();return e?"?"+e:""}n(H_,"_e");function uS(t){let e={};for(let i in t)t[i]!=null&&(e[i]=t[i]);return new URLSearchParams(e)}n(uS,"zt");var W_=n((t,e)=>!t||!e?!1:t.contains(e)?!0:W_(t,e.getRootNode().host),"Re"),B_="mux.com",cS=n(()=>{try{return"3.13.0"}catch{}return"UNKNOWN"},"Xt"),hS=cS(),F_=n(()=>hS,"be"),mS=n((t,{token:e,customDomain:i=B_,thumbnailTime:a,programTime:r}={})=>{var s;let o=e==null?a:void 0,{aud:l}=(s=yr(e))!=null?s:{};if(!(e&&l!=="t"))return`https://image.${i}/${t}/thumbnail.webp${H_({token:e,time:o,program_time:r})}`},"ht"),pS=n((t,{token:e,customDomain:i=B_,programStartTime:a,programEndTime:r}={})=>{var s;let{aud:o}=(s=yr(e))!=null?s:{};if(!(e&&o!=="s"))return`https://image.${i}/${t}/storyboard.vtt${H_({token:e,format:"webp",program_start_time:a,program_end_time:r})}`},"gt"),zh=n(t=>{if(t){if([ee.LIVE,ee.ON_DEMAND].includes(t))return t;if(t!=null&&t.includes("live"))return ee.LIVE}},"ee$1"),vS={crossorigin:"crossOrigin",playsinline:"playsInline"};function fS(t){var e;return(e=vS[t])!=null?e:U_(t)}n(fS,"ft");var pr,vr,Xe,qr,ES=(qr=class{constructor(e,i){He(this,pr),He(this,vr),He(this,Xe,[]),Je(this,pr,e),Je(this,vr,i)}[Symbol.iterator](){return B(this,Xe).values()}get length(){return B(this,Xe).length}get value(){var e;return(e=B(this,Xe).join(" "))!=null?e:""}set value(e){var i;e!==this.value&&(Je(this,Xe,[]),this.add(...(i=e?.split(" "))!=null?i:[]))}toString(){return this.value}item(e){return B(this,Xe)[e]}values(){return B(this,Xe).values()}keys(){return B(this,Xe).keys()}forEach(e){B(this,Xe).forEach(e)}add(...e){var i,a;e.forEach(r=>{this.contains(r)||B(this,Xe).push(r)}),!(this.value===""&&!((i=B(this,pr))!=null&&i.hasAttribute(`${B(this,vr)}`)))&&((a=B(this,pr))==null||a.setAttribute(`${B(this,vr)}`,`${this.value}`))}remove(...e){var i;e.forEach(a=>{B(this,Xe).splice(B(this,Xe).indexOf(a),1)}),(i=B(this,pr))==null||i.setAttribute(`${B(this,vr)}`,`${this.value}`)}contains(e){return B(this,Xe).includes(e)}toggle(e,i){return typeof i<"u"?i?(this.add(e),!0):(this.remove(e),!1):this.contains(e)?(this.remove(e),!1):(this.add(e),!0)}replace(e,i){this.remove(e),this.add(i)}},n(qr,"pe"),qr);pr=new WeakMap,vr=new WeakMap,Xe=new WeakMap;var Ow=`[mux-player ${F_()}]`;function gi(...t){}n(gi,"O");function dt(...t){}n(dt,"k");function Wv(t){var e;let i=(e=t.message)!=null?e:"";t.context&&(i+=` ${t.context}`),t.file&&(i+=` ${N("Read more: ")}
https://github.com/muxinc/elements/blob/main/errors/${t.file}`),gi(i)}n(Wv,"Oe");var Ke={AUTOPLAY:"autoplay",CROSSORIGIN:"crossorigin",LOOP:"loop",MUTED:"muted",PLAYSINLINE:"playsinline",PRELOAD:"preload"},ba={VOLUME:"volume",PLAYBACKRATE:"playbackrate",MUTED:"muted"},Bv=Object.freeze({length:0,start(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'start' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0},end(t){let e=t>>>0;if(e>=this.length)throw new DOMException(`Failed to execute 'end' on 'TimeRanges': The index provided (${e}) is greater than or equal to the maximum bound (${this.length}).`);return 0}}),_S=Object.values(Ke).filter(t=>Ke.PLAYSINLINE!==t),bS=Object.values(ba),gS=[..._S,...bS],Yr,yS=(Yr=class extends ii.HTMLElement{static get observedAttributes(){return gS}constructor(){super()}attributeChangedCallback(e,i,a){var r,s;switch(e){case ba.MUTED:{this.media&&(this.media.muted=a!=null,this.media.defaultMuted=a!=null);return}case ba.VOLUME:{let o=(r=Ve(a))!=null?r:1;this.media&&(this.media.volume=o);return}case ba.PLAYBACKRATE:{let o=(s=Ve(a))!=null?s:1;this.media&&(this.media.playbackRate=o,this.media.defaultPlaybackRate=o);return}}}play(){var e,i;return(i=(e=this.media)==null?void 0:e.play())!=null?i:Promise.reject()}pause(){var e;(e=this.media)==null||e.pause()}load(){var e;(e=this.media)==null||e.load()}get media(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("mux-video")}get audioTracks(){return this.media.audioTracks}get videoTracks(){return this.media.videoTracks}get audioRenditions(){return this.media.audioRenditions}get videoRenditions(){return this.media.videoRenditions}get paused(){var e,i;return(i=(e=this.media)==null?void 0:e.paused)!=null?i:!0}get duration(){var e,i;return(i=(e=this.media)==null?void 0:e.duration)!=null?i:NaN}get ended(){var e,i;return(i=(e=this.media)==null?void 0:e.ended)!=null?i:!1}get buffered(){var e,i;return(i=(e=this.media)==null?void 0:e.buffered)!=null?i:Bv}get seekable(){var e,i;return(i=(e=this.media)==null?void 0:e.seekable)!=null?i:Bv}get readyState(){var e,i;return(i=(e=this.media)==null?void 0:e.readyState)!=null?i:0}get videoWidth(){var e,i;return(i=(e=this.media)==null?void 0:e.videoWidth)!=null?i:0}get videoHeight(){var e,i;return(i=(e=this.media)==null?void 0:e.videoHeight)!=null?i:0}get currentSrc(){var e,i;return(i=(e=this.media)==null?void 0:e.currentSrc)!=null?i:""}get currentTime(){var e,i;return(i=(e=this.media)==null?void 0:e.currentTime)!=null?i:0}set currentTime(e){this.media&&(this.media.currentTime=Number(e))}get volume(){var e,i;return(i=(e=this.media)==null?void 0:e.volume)!=null?i:1}set volume(e){this.media&&(this.media.volume=Number(e))}get playbackRate(){var e,i;return(i=(e=this.media)==null?void 0:e.playbackRate)!=null?i:1}set playbackRate(e){this.media&&(this.media.playbackRate=Number(e))}get defaultPlaybackRate(){var e;return(e=Ve(this.getAttribute(ba.PLAYBACKRATE)))!=null?e:1}set defaultPlaybackRate(e){e!=null?this.setAttribute(ba.PLAYBACKRATE,`${e}`):this.removeAttribute(ba.PLAYBACKRATE)}get crossOrigin(){return wn(this,Ke.CROSSORIGIN)}set crossOrigin(e){this.setAttribute(Ke.CROSSORIGIN,`${e}`)}get autoplay(){return wn(this,Ke.AUTOPLAY)!=null}set autoplay(e){e?this.setAttribute(Ke.AUTOPLAY,typeof e=="string"?e:""):this.removeAttribute(Ke.AUTOPLAY)}get loop(){return wn(this,Ke.LOOP)!=null}set loop(e){e?this.setAttribute(Ke.LOOP,""):this.removeAttribute(Ke.LOOP)}get muted(){var e,i;return(i=(e=this.media)==null?void 0:e.muted)!=null?i:!1}set muted(e){this.media&&(this.media.muted=!!e)}get defaultMuted(){return wn(this,Ke.MUTED)!=null}set defaultMuted(e){e?this.setAttribute(Ke.MUTED,""):this.removeAttribute(Ke.MUTED)}get playsInline(){return wn(this,Ke.PLAYSINLINE)!=null}set playsInline(e){dt("playsInline is set to true by default and is not currently supported as a setter.")}get preload(){return this.media?this.media.preload:this.getAttribute("preload")}set preload(e){["","none","metadata","auto"].includes(e)?this.setAttribute(Ke.PRELOAD,e):this.removeAttribute(Ke.PRELOAD)}},n(Yr,"Le"),Yr);function wn(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}n(wn,"te$1");var Fv=yS,TS=`:host {
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
`,In=new WeakMap,xa,AS=(xa=class{constructor(e,i){this.element=e,this.type=i,this.element.addEventListener(this.type,this);let a=In.get(this.element);a&&a.set(this.type,this)}set(e){if(typeof e=="function")this.handleEvent=e.bind(this.element);else if(typeof e=="object"&&typeof e.handleEvent=="function")this.handleEvent=e.handleEvent.bind(e);else{this.element.removeEventListener(this.type,this);let i=In.get(this.element);i&&i.delete(this.type)}}static for(e){In.has(e.element)||In.set(e.element,new Map);let i=e.attributeName.slice(2),a=In.get(e.element);return a&&a.has(i)?a.get(i):new xa(e.element,i)}},n(xa,"t"),xa);function kS(t,e){return t instanceof ut&&t.attributeName.startsWith("on")?(AS.for(t).set(e),t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),!0):!1}n(kS,"oa");function SS(t,e){return e instanceof K_&&t instanceof ra?(e.renderInto(t),!0):!1}n(SS,"na");function wS(t,e){return e instanceof DocumentFragment&&t instanceof ra?(e.childNodes.length&&t.replace(...e.childNodes),!0):!1}n(wS,"sa");function IS(t,e){if(t instanceof ut){let i=t.attributeNamespace,a=t.element.getAttributeNS(i,t.attributeName);return String(e)!==a&&(t.value=String(e)),!0}return t.value=String(e),!0}n(IS,"da");function RS(t,e){if(t instanceof ut&&e instanceof Element){let i=t.element;return i[t.attributeName]!==e&&(t.element.removeAttributeNS(t.attributeNamespace,t.attributeName),i[t.attributeName]=e),!0}return!1}n(RS,"la");function LS(t,e){if(typeof e=="boolean"&&t instanceof ut){let i=t.attributeNamespace,a=t.element.hasAttributeNS(i,t.attributeName);return e!==a&&(t.booleanValue=e),!0}return!1}n(LS,"ua");function CS(t,e){return e===!1&&t instanceof ra?(t.replace(""),!0):!1}n(CS,"ma");function DS(t,e){RS(t,e)||LS(t,e)||kS(t,e)||CS(t,e)||SS(t,e)||wS(t,e)||IS(t,e)}n(DS,"ca");var nu=new Map,Kv=new WeakMap,Vv=new WeakMap,Gr,K_=(Gr=class{constructor(e,i,a){this.strings=e,this.values=i,this.processor=a,this.stringsKey=this.strings.join("")}get template(){if(nu.has(this.stringsKey))return nu.get(this.stringsKey);{let e=bd.createElement("template"),i=this.strings.length-1;return e.innerHTML=this.strings.reduce((a,r,s)=>a+r+(s<i?`{{ ${s} }}`:""),""),nu.set(this.stringsKey,e),e}}renderInto(e){var i;let a=this.template;if(Kv.get(e)!==a){Kv.set(e,a);let s=new dn(a,this.values,this.processor);Vv.set(e,s),e instanceof ra?e.replace(...s.children):e.appendChild(s);return}let r=Vv.get(e);(i=r?.update)==null||i.call(r,this.values)}},n(Gr,"he"),Gr),MS={processCallback(t,e,i){var a;if(i){for(let[r,s]of e)if(r in i){let o=(a=i[r])!=null?a:"";DS(s,o)}}}};function Ll(t,...e){return new K_(t,e,MS)}n(Ll,"ie$1");function OS(t,e){t.renderInto(e)}n(OS,"kt");var xS=n(t=>{let{tokens:e}=t;return e.drm?":host(:not([cast-receiver])) { --_cast-button-drm-display: none; }":""},"ha"),NS=n(t=>Ll`
  <style>
    ${xS(t)}
    ${TS}
  </style>
  ${HS(t)}
`,"Rt"),PS=n(t=>{let e=t.hotKeys?`${t.hotKeys}`:"";return zh(t.streamType)==="live"&&(e+=" noarrowleft noarrowright"),e},"ga"),$S={TOP:"top",CENTER:"center",BOTTOM:"bottom",LAYER:"layer",MEDIA_LAYER:"media-layer",POSTER_LAYER:"poster-layer",VERTICAL_LAYER:"vertical-layer",CENTERED_LAYER:"centered-layer",GESTURE_LAYER:"gesture-layer",CONTROLLER_LAYER:"controller",BUTTON:"button",RANGE:"range",THUMB:"thumb",DISPLAY:"display",CONTROL_BAR:"control-bar",MENU_BUTTON:"menu-button",MENU:"menu",MENU_ITEM:"menu-item",OPTION:"option",POSTER:"poster",LIVE:"live",PLAY:"play",PRE_PLAY:"pre-play",SEEK_BACKWARD:"seek-backward",SEEK_FORWARD:"seek-forward",MUTE:"mute",CAPTIONS:"captions",AIRPLAY:"airplay",PIP:"pip",FULLSCREEN:"fullscreen",CAST:"cast",PLAYBACK_RATE:"playback-rate",VOLUME:"volume",TIME:"time",TITLE:"title",AUDIO_TRACK:"audio-track",RENDITION:"rendition"},US=Object.values($S).join(", "),HS=n(t=>{var e,i,a,r,s,o,l,d,h,p,v,c,u,f,_,b,T,A,g,w,O,M,H,F,j,K,W,We,at,rt,ge,qe,Ut,Ye,At,nt,Me,Be,Ge,pi,sa;return Ll`
  <media-theme
    template="${t.themeTemplate||!1}"
    defaultstreamtype="${(e=t.defaultStreamType)!=null?e:!1}"
    hotkeys="${PS(t)||!1}"
    nohotkeys="${t.noHotKeys||!t.hasSrc||!1}"
    noautoseektolive="${!!((i=t.streamType)!=null&&i.includes(ee.LIVE))&&t.targetLiveWindow!==0}"
    novolumepref="${t.novolumepref||!1}"
    nomutedpref="${t.nomutedpref||!1}"
    disabled="${!t.hasSrc||t.isDialogOpen}"
    audio="${(a=t.audio)!=null?a:!1}"
    style="${(r=dS({"--media-primary-color":t.primaryColor,"--media-secondary-color":t.secondaryColor,"--media-accent-color":t.accentColor}))!=null?r:!1}"
    defaultsubtitles="${!t.defaultHiddenCaptions}"
    forwardseekoffset="${(s=t.forwardSeekOffset)!=null?s:!1}"
    backwardseekoffset="${(o=t.backwardSeekOffset)!=null?o:!1}"
    playbackrates="${(l=t.playbackRates)!=null?l:!1}"
    defaultshowremainingtime="${(d=t.defaultShowRemainingTime)!=null?d:!1}"
    defaultduration="${(h=t.defaultDuration)!=null?h:!1}"
    hideduration="${(p=t.hideDuration)!=null?p:!1}"
    title="${(v=t.title)!=null?v:!1}"
    videotitle="${(c=t.videoTitle)!=null?c:!1}"
    proudlydisplaymuxbadge="${(u=t.proudlyDisplayMuxBadge)!=null?u:!1}"
    exportparts="${US}"
    onclose="${t.onCloseErrorDialog}"
    onfocusin="${t.onFocusInErrorDialog}"
  >
    <mux-video
      slot="media"
      inert="${(f=t.noHotKeys)!=null?f:!1}"
      target-live-window="${(_=t.targetLiveWindow)!=null?_:!1}"
      stream-type="${(b=zh(t.streamType))!=null?b:!1}"
      crossorigin="${(T=t.crossOrigin)!=null?T:""}"
      playsinline
      autoplay="${(A=t.autoplay)!=null?A:!1}"
      muted="${(g=t.muted)!=null?g:!1}"
      loop="${(w=t.loop)!=null?w:!1}"
      preload="${(O=t.preload)!=null?O:!1}"
      debug="${(M=t.debug)!=null?M:!1}"
      prefer-cmcd="${(H=t.preferCmcd)!=null?H:!1}"
      disable-tracking="${(F=t.disableTracking)!=null?F:!1}"
      disable-cookies="${(j=t.disableCookies)!=null?j:!1}"
      prefer-playback="${(K=t.preferPlayback)!=null?K:!1}"
      start-time="${t.startTime!=null?t.startTime:!1}"
      initial-bandwidth-estimate-kbps="${t.initialBandwidthEstimateKbps!=null?t.initialBandwidthEstimateKbps:!1}"
      initial-estimate-segments="${t.initialEstimateSegments!=null?t.initialEstimateSegments:!1}"
      min-preload-segments="${t.minPreloadSegments!=null?t.minPreloadSegments:!1}"
      beacon-collection-domain="${(W=t.beaconCollectionDomain)!=null?W:!1}"
      player-init-time="${(We=t.playerInitTime)!=null?We:!1}"
      player-software-name="${(at=t.playerSoftwareName)!=null?at:!1}"
      player-software-version="${(rt=t.playerSoftwareVersion)!=null?rt:!1}"
      env-key="${(ge=t.envKey)!=null?ge:!1}"
      custom-domain="${(qe=t.customDomain)!=null?qe:!1}"
      src="${t.src?t.src:t.playbackId?bu(t):!1}"
      cast-src="${t.src?t.src:t.playbackId?bu(t):!1}"
      cast-receiver="${(Ut=t.castReceiver)!=null?Ut:!1}"
      drm-token="${(At=(Ye=t.tokens)==null?void 0:Ye.drm)!=null?At:!1}"
      playback-token="${(Me=(nt=t.tokens)==null?void 0:nt.playback)!=null?Me:!1}"
      exportparts="video"
      disable-pseudo-ended="${(Be=t.disablePseudoEnded)!=null?Be:!1}"
      max-auto-resolution="${(Ge=t.maxAutoResolution)!=null?Ge:!1}"
      cap-rendition-to-player-size="${(pi=t.capRenditionToPlayerSize)!=null?pi:!1}"
    >
      ${t.storyboard?Ll`<track label="thumbnails" default kind="metadata" src="${t.storyboard}" />`:Ll``}
      <slot></slot>
    </mux-video>
    <slot name="poster" slot="poster">
      <media-poster-image
        part="poster"
        exportparts="poster, img"
        src="${t.poster?t.poster:!1}"
        placeholdersrc="${(sa=t.placeholder)!=null?sa:!1}"
      ></media-poster-image>
    </slot>
  </media-theme>
`},"Ea"),V_=n(t=>t.charAt(0).toUpperCase()+t.slice(1),"Lt"),WS=n((t,e=!1)=>{var i,a;if(t.muxCode){let r=V_((i=t.errorCategory)!=null?i:"video"),s=Sd((a=t.errorCategory)!=null?a:te.VIDEO);if(t.muxCode===P.NETWORK_OFFLINE)return N("Your device appears to be offline",e);if(t.muxCode===P.NETWORK_TOKEN_EXPIRED)return N("{category} URL has expired",e).format({category:r});if([P.NETWORK_TOKEN_SUB_MISMATCH,P.NETWORK_TOKEN_AUD_MISMATCH,P.NETWORK_TOKEN_AUD_MISSING,P.NETWORK_TOKEN_MALFORMED].includes(t.muxCode))return N("{category} URL is formatted incorrectly",e).format({category:r});if(t.muxCode===P.NETWORK_TOKEN_MISSING)return N("Invalid {categoryName} URL",e).format({categoryName:s});if(t.muxCode===P.NETWORK_NOT_FOUND)return N("{category} does not exist",e).format({category:r});if(t.muxCode===P.NETWORK_NOT_READY){let o=t.streamType==="live"?"Live stream":"Video";return N("{mediaType} is not currently available",e).format({mediaType:o})}}if(t.code){if(t.code===L.MEDIA_ERR_NETWORK)return N("Network Error",e);if(t.code===L.MEDIA_ERR_DECODE)return N("Media Error",e);if(t.code===L.MEDIA_ERR_SRC_NOT_SUPPORTED)return N("Source Not Supported",e)}return N("Error",e)},"Ta"),BS=n((t,e=!1)=>{var i,a;if(t.muxCode){let r=V_((i=t.errorCategory)!=null?i:"video"),s=Sd((a=t.errorCategory)!=null?a:te.VIDEO);return t.muxCode===P.NETWORK_OFFLINE?N("Check your internet connection and try reloading this video.",e):t.muxCode===P.NETWORK_TOKEN_EXPIRED?N("The video’s secured {tokenNamePrefix}-token has expired.",e).format({tokenNamePrefix:s}):t.muxCode===P.NETWORK_TOKEN_SUB_MISMATCH?N("The video’s playback ID does not match the one encoded in the {tokenNamePrefix}-token.",e).format({tokenNamePrefix:s}):t.muxCode===P.NETWORK_TOKEN_MALFORMED?N("{category} URL is formatted incorrectly",e).format({category:r}):[P.NETWORK_TOKEN_AUD_MISMATCH,P.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode)?N("The {tokenNamePrefix}-token is formatted with incorrect information.",e).format({tokenNamePrefix:s}):[P.NETWORK_TOKEN_MISSING,P.NETWORK_INVALID_URL].includes(t.muxCode)?N("The video URL or {tokenNamePrefix}-token are formatted with incorrect or incomplete information.",e).format({tokenNamePrefix:s}):t.muxCode===P.NETWORK_NOT_FOUND?"":t.message}return t.code&&(t.code===L.MEDIA_ERR_NETWORK||t.code===L.MEDIA_ERR_DECODE||(t.code,L.MEDIA_ERR_SRC_NOT_SUPPORTED)),t.message},"va"),FS=n((t,e=!1)=>{let i=WS(t,e).toString(),a=BS(t,e).toString();return{title:i,message:a}},"Mt"),KS=n(t=>{if(t.muxCode){if(t.muxCode===P.NETWORK_TOKEN_EXPIRED)return"403-expired-token.md";if(t.muxCode===P.NETWORK_TOKEN_MALFORMED)return"403-malformatted-token.md";if([P.NETWORK_TOKEN_AUD_MISMATCH,P.NETWORK_TOKEN_AUD_MISSING].includes(t.muxCode))return"403-incorrect-aud-value.md";if(t.muxCode===P.NETWORK_TOKEN_SUB_MISMATCH)return"403-playback-id-mismatch.md";if(t.muxCode===P.NETWORK_TOKEN_MISSING)return"missing-signed-tokens.md";if(t.muxCode===P.NETWORK_NOT_FOUND)return"404-not-found.md";if(t.muxCode===P.NETWORK_NOT_READY)return"412-not-playable.md"}if(t.code){if(t.code===L.MEDIA_ERR_NETWORK)return"";if(t.code===L.MEDIA_ERR_DECODE)return"media-decode-error.md";if(t.code===L.MEDIA_ERR_SRC_NOT_SUPPORTED)return"media-src-not-supported.md"}return""},"Aa"),q_=n((t,e)=>{let i=KS(t);return{message:t.message,context:t.context,file:i}},"Ie"),VS=`<template id="media-theme-gerwig">
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
`,Wc=bd.createElement("template");"innerHTML"in Wc&&(Wc.innerHTML=VS);var qv,Yv,zr,Y_=(zr=class extends un{},n(zr,"ye"),zr);Y_.template=(Yv=(qv=Wc.content)==null?void 0:qv.children)==null?void 0:Yv[0];ii.customElements.get("media-theme-gerwig")||ii.customElements.define("media-theme-gerwig",Y_);var qS="gerwig",yi={SRC:"src",POSTER:"poster"},S={STYLE:"style",DEFAULT_HIDDEN_CAPTIONS:"default-hidden-captions",PRIMARY_COLOR:"primary-color",SECONDARY_COLOR:"secondary-color",ACCENT_COLOR:"accent-color",FORWARD_SEEK_OFFSET:"forward-seek-offset",BACKWARD_SEEK_OFFSET:"backward-seek-offset",PLAYBACK_TOKEN:"playback-token",THUMBNAIL_TOKEN:"thumbnail-token",STORYBOARD_TOKEN:"storyboard-token",FULLSCREEN_ELEMENT:"fullscreen-element",DRM_TOKEN:"drm-token",STORYBOARD_SRC:"storyboard-src",THUMBNAIL_TIME:"thumbnail-time",AUDIO:"audio",NOHOTKEYS:"nohotkeys",HOTKEYS:"hotkeys",PLAYBACK_RATES:"playbackrates",DEFAULT_SHOW_REMAINING_TIME:"default-show-remaining-time",DEFAULT_DURATION:"default-duration",TITLE:"title",VIDEO_TITLE:"video-title",PLACEHOLDER:"placeholder",THEME:"theme",DEFAULT_STREAM_TYPE:"default-stream-type",TARGET_LIVE_WINDOW:"target-live-window",EXTRA_SOURCE_PARAMS:"extra-source-params",NO_VOLUME_PREF:"no-volume-pref",NO_MUTED_PREF:"no-muted-pref",CAST_RECEIVER:"cast-receiver",NO_TOOLTIPS:"no-tooltips",PROUDLY_DISPLAY_MUX_BADGE:"proudly-display-mux-badge",DISABLE_PSEUDO_ENDED:"disable-pseudo-ended"},Bc=["audio","backwardseekoffset","defaultduration","defaultshowremainingtime","defaultsubtitles","noautoseektolive","disabled","exportparts","forwardseekoffset","hideduration","hotkeys","nohotkeys","playbackrates","defaultstreamtype","streamtype","style","targetlivewindow","template","title","videotitle","novolumepref","nomutedpref","proudlydisplaymuxbadge"];function YS(t,e){var i,a,r;return{src:!t.playbackId&&t.src,playbackId:t.playbackId,hasSrc:!!t.playbackId||!!t.src||!!t.currentSrc,poster:t.poster,storyboard:((i=t.media)==null?void 0:i.currentSrc)&&t.storyboard,storyboardSrc:t.getAttribute(S.STORYBOARD_SRC),fullscreenElement:t.getAttribute(S.FULLSCREEN_ELEMENT),placeholder:t.getAttribute("placeholder"),themeTemplate:zS(t),thumbnailTime:!t.tokens.thumbnail&&t.thumbnailTime,autoplay:t.autoplay,crossOrigin:t.crossOrigin,loop:t.loop,noHotKeys:t.hasAttribute(S.NOHOTKEYS),hotKeys:t.getAttribute(S.HOTKEYS),muted:t.muted,paused:t.paused,preload:t.preload,envKey:t.envKey,preferCmcd:t.preferCmcd,debug:t.debug,disableTracking:t.disableTracking,disableCookies:t.disableCookies,tokens:t.tokens,beaconCollectionDomain:t.beaconCollectionDomain,maxResolution:t.maxResolution,minResolution:t.minResolution,maxAutoResolution:t.maxAutoResolution,programStartTime:t.programStartTime,programEndTime:t.programEndTime,assetStartTime:t.assetStartTime,assetEndTime:t.assetEndTime,renditionOrder:t.renditionOrder,metadata:t.metadata,playerInitTime:t.playerInitTime,playerSoftwareName:t.playerSoftwareName,playerSoftwareVersion:t.playerSoftwareVersion,startTime:t.startTime,initialBandwidthEstimateKbps:t.initialBandwidthEstimateKbps,initialEstimateSegments:t.initialEstimateSegments,minPreloadSegments:t.minPreloadSegments,preferPlayback:t.preferPlayback,audio:t.audio,defaultStreamType:t.defaultStreamType,targetLiveWindow:t.getAttribute(E.TARGET_LIVE_WINDOW),streamType:zh(t.getAttribute(E.STREAM_TYPE)),primaryColor:t.getAttribute(S.PRIMARY_COLOR),secondaryColor:t.getAttribute(S.SECONDARY_COLOR),accentColor:t.getAttribute(S.ACCENT_COLOR),forwardSeekOffset:t.forwardSeekOffset,backwardSeekOffset:t.backwardSeekOffset,defaultHiddenCaptions:t.defaultHiddenCaptions,defaultDuration:t.defaultDuration,defaultShowRemainingTime:t.defaultShowRemainingTime,hideDuration:QS(t),playbackRates:t.getAttribute(S.PLAYBACK_RATES),customDomain:(a=t.getAttribute(E.CUSTOM_DOMAIN))!=null?a:void 0,title:t.getAttribute(S.TITLE),videoTitle:(r=t.getAttribute(S.VIDEO_TITLE))!=null?r:t.getAttribute(S.TITLE),novolumepref:t.hasAttribute(S.NO_VOLUME_PREF),nomutedpref:t.hasAttribute(S.NO_MUTED_PREF),proudlyDisplayMuxBadge:t.hasAttribute(S.PROUDLY_DISPLAY_MUX_BADGE),castReceiver:t.castReceiver,disablePseudoEnded:t.hasAttribute(S.DISABLE_PSEUDO_ENDED),capRenditionToPlayerSize:t.capRenditionToPlayerSize,...e,extraSourceParams:t.extraSourceParams}}n(YS,"Ma");var GS=QE.formatErrorMessage;QE.formatErrorMessage=t=>{var e,i;if(t instanceof L){let a=FS(t,!1);return`
      ${a!=null&&a.title?`<h3>${a.title}</h3>`:""}
      ${a!=null&&a.message||a!=null&&a.linkUrl?`<p>
        ${a?.message}
        ${a!=null&&a.linkUrl?`<a
              href="${a.linkUrl}"
              target="_blank"
              rel="external noopener"
              aria-label="${(e=a.linkText)!=null?e:""} ${N("(opens in a new window)")}"
              >${(i=a.linkText)!=null?i:a.linkUrl}</a
            >`:""}
      </p>`:""}
    `}return GS(t)};function zS(t){var e,i;let a=t.theme;if(a){let r=(i=(e=t.getRootNode())==null?void 0:e.getElementById)==null?void 0:i.call(e,a);if(r&&r instanceof HTMLTemplateElement)return r;a.startsWith("media-theme-")||(a=`media-theme-${a}`);let s=ii.customElements.get(a);if(s!=null&&s.template)return s.template}}n(zS,"Na");function QS(t){var e;let i=(e=t.mediaController)==null?void 0:e.querySelector("media-time-display");return i&&getComputedStyle(i).getPropertyValue("--media-duration-display-display").trim()==="none"}n(QS,"Ia");function Gv(t){let e=t.videoTitle?{video_title:t.videoTitle}:{};return t.getAttributeNames().filter(i=>i.startsWith("metadata-")).reduce((i,a)=>{let r=t.getAttribute(a);return r!==null&&(i[a.replace(/^metadata-/,"").replace(/-/g,"_")]=r),i},e)}n(Gv,"Ut");var jS=Object.values(E),ZS=Object.values(yi),XS=Object.values(S),zv=F_(),Qv="mux-player",jv={isDialogOpen:!1},JS={redundant_streams:!0},Cl,ls,Dl,ga,Ml,ds,gd,yd,Rr,us,Lr,Td,ve,Ti,G_,Fc,Ia,Zv,Xv,Jv,ef,Qr,ew=(Qr=class extends Fv{constructor(){super(),He(this,ve),He(this,Cl),He(this,ls,!1),He(this,Dl,{}),He(this,ga,!0),He(this,Ml,new ES(this,"hotkeys")),He(this,ds),He(this,gd,()=>_e(this,ve,Ia).call(this)),He(this,yd,()=>_e(this,ve,Ia).call(this)),He(this,Rr,()=>_e(this,ve,Ia).call(this)),He(this,us),He(this,Lr,{...jv,onCloseErrorDialog:n(e=>{var i;((i=e.composedPath()[0])==null?void 0:i.localName)==="media-error-dialog"&&_e(this,ve,Fc).call(this,{isDialogOpen:!1})},"onCloseErrorDialog"),onFocusInErrorDialog:n(e=>{var i;((i=e.composedPath()[0])==null?void 0:i.localName)==="media-error-dialog"&&(W_(this,bd.activeElement)||e.preventDefault())},"onFocusInErrorDialog")}),He(this,Td,e=>{var i;let a=(i=this.media)==null?void 0:i.error;if(!(a instanceof L)){let{message:s,code:o}=a??{};a=new L(s,o)}if(!(a!=null&&a.fatal)){gi(a),a.data&&gi(`${a.name} data:`,a.data);return}let r=q_(a);r.message&&Wv(r),dt(a),a.data&&dt(`${a.name} data:`,a.data),_e(this,ve,Fc).call(this,{isDialogOpen:!0})}),Je(this,Cl,eh()),this.attachShadow({mode:"open"}),_e(this,ve,G_).call(this),this.isConnected&&_e(this,ve,Ti).call(this)}static get NAME(){return Qv}static get VERSION(){return zv}static get observedAttributes(){var e;return[...(e=Fv.observedAttributes)!=null?e:[],...ZS,...jS,...XS]}get mediaTheme(){var e;return(e=this.shadowRoot)==null?void 0:e.querySelector("media-theme")}get mediaController(){var e,i;return(i=(e=this.mediaTheme)==null?void 0:e.shadowRoot)==null?void 0:i.querySelector("media-controller")}connectedCallback(){_e(this,ve,Ti).call(this);let e=this.media;e&&(e.metadata=Gv(this))}disconnectedCallback(){var e,i,a,r,s,o,l,d;(e=B(this,ds))==null||e.disconnect(),(i=this.media)==null||i.removeEventListener("streamtypechange",B(this,gd)),(a=this.media)==null||a.removeEventListener("loadstart",B(this,yd)),this.removeEventListener("error",B(this,Td)),this.media&&(this.media.errorTranslator=void 0),(s=(r=this.media)==null?void 0:r.textTracks)==null||s.removeEventListener("addtrack",B(this,Rr)),(l=(o=this.media)==null?void 0:o.textTracks)==null||l.removeEventListener("removetrack",B(this,Rr)),(d=B(this,us))==null||d.call(this),Je(this,us,void 0),Je(this,ls,!1)}attributeChangedCallback(e,i,a){switch(_e(this,ve,Ti).call(this),super.attributeChangedCallback(e,i,a),e){case S.HOTKEYS:B(this,Ml).value=a;break;case S.THUMBNAIL_TIME:{a!=null&&this.tokens.thumbnail&&gi(N("Use of thumbnail-time with thumbnail-token is currently unsupported. Ignore thumbnail-time.").toString());break}case S.THUMBNAIL_TOKEN:{if(a){let r=yr(a);if(r){let{aud:s}=r,o=Jn.THUMBNAIL;s!==o&&gi(N("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:s,expectedAud:o,tokenNamePrefix:"thumbnail"}))}}break}case S.STORYBOARD_TOKEN:{if(a){let r=yr(a);if(r){let{aud:s}=r,o=Jn.STORYBOARD;s!==o&&gi(N("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:s,expectedAud:o,tokenNamePrefix:"storyboard"}))}}break}case S.DRM_TOKEN:{if(a){let r=yr(a);if(r){let{aud:s}=r,o=Jn.DRM;s!==o&&gi(N("The {tokenNamePrefix}-token has an incorrect aud value: {aud}. aud value should be {expectedAud}.").format({aud:s,expectedAud:o,tokenNamePrefix:"drm"}))}}break}case E.PLAYBACK_ID:{a!=null&&a.includes("?token")&&dt(N("The specificed playback ID {playbackId} contains a token which must be provided via the playback-token attribute.").format({playbackId:a}));break}case E.STREAM_TYPE:{a&&![ee.LIVE,ee.ON_DEMAND,ee.UNKNOWN].includes(a)?["ll-live","live:dvr","ll-live:dvr"].includes(this.streamType)?this.targetLiveWindow=a.includes("dvr")?Number.POSITIVE_INFINITY:0:Wv({file:"invalid-stream-type.md",message:N("Invalid stream-type value supplied: `{streamType}`. Please provide stream-type as either: `on-demand` or `live`").format({streamType:this.streamType})}):a===ee.LIVE?this.getAttribute(S.TARGET_LIVE_WINDOW)==null&&(this.targetLiveWindow=0):this.targetLiveWindow=Number.NaN;break}case S.FULLSCREEN_ELEMENT:{if(a!=null||a!==i){let r=bd.getElementById(a),s=r?.querySelector("mux-player");this.mediaController&&r&&s&&(this.mediaController.fullscreenElement=r)}break}case E.CAP_RENDITION_TO_PLAYER_SIZE:{(a==null||a!==i)&&(this.capRenditionToPlayerSize=a!=null?!0:void 0);break}}[E.PLAYBACK_ID,yi.SRC,S.PLAYBACK_TOKEN].includes(e)&&i!==a&&Je(this,Lr,{...B(this,Lr),...jv}),_e(this,ve,Ia).call(this,{[fS(e)]:a})}async requestFullscreen(e){var i;if(!(!this.mediaController||this.mediaController.hasAttribute(m.MEDIA_IS_FULLSCREEN)))return(i=this.mediaController)==null||i.dispatchEvent(new ii.CustomEvent(D.MEDIA_ENTER_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((a,r)=>{var s;(s=this.mediaController)==null||s.addEventListener(ui.MEDIA_IS_FULLSCREEN,()=>a(),{once:!0})})}async exitFullscreen(){var e;if(!(!this.mediaController||!this.mediaController.hasAttribute(m.MEDIA_IS_FULLSCREEN)))return(e=this.mediaController)==null||e.dispatchEvent(new ii.CustomEvent(D.MEDIA_EXIT_FULLSCREEN_REQUEST,{composed:!0,bubbles:!0})),new Promise((i,a)=>{var r;(r=this.mediaController)==null||r.addEventListener(ui.MEDIA_IS_FULLSCREEN,()=>i(),{once:!0})})}get preferCmcd(){var e;return(e=this.getAttribute(E.PREFER_CMCD))!=null?e:void 0}set preferCmcd(e){e!==this.preferCmcd&&(e?hu.includes(e)?this.setAttribute(E.PREFER_CMCD,e):gi(`Invalid value for preferCmcd. Must be one of ${hu.join()}`):this.removeAttribute(E.PREFER_CMCD))}get hasPlayed(){var e,i;return(i=(e=this.mediaController)==null?void 0:e.hasAttribute(m.MEDIA_HAS_PLAYED))!=null?i:!1}get inLiveWindow(){var e;return(e=this.mediaController)==null?void 0:e.hasAttribute(m.MEDIA_TIME_IS_LIVE)}get _hls(){var e;return(e=this.media)==null?void 0:e._hls}get mux(){var e;return(e=this.media)==null?void 0:e.mux}get theme(){var e;return(e=this.getAttribute(S.THEME))!=null?e:qS}set theme(e){this.setAttribute(S.THEME,`${e}`)}get themeProps(){let e=this.mediaTheme;if(!e)return;let i={};for(let a of e.getAttributeNames()){if(Bc.includes(a))continue;let r=e.getAttribute(a);i[U_(a)]=r===""?!0:r}return i}set themeProps(e){var i,a;_e(this,ve,Ti).call(this);let r={...this.themeProps,...e};for(let s in r){if(Bc.includes(s))continue;let o=e?.[s];typeof o=="boolean"||o==null?(i=this.mediaTheme)==null||i.toggleAttribute(Hc(s),!!o):(a=this.mediaTheme)==null||a.setAttribute(Hc(s),o)}}get playbackId(){var e;return(e=this.getAttribute(E.PLAYBACK_ID))!=null?e:void 0}set playbackId(e){e?this.setAttribute(E.PLAYBACK_ID,e):this.removeAttribute(E.PLAYBACK_ID)}get src(){var e,i;return this.playbackId?(e=Ft(this,yi.SRC))!=null?e:void 0:(i=this.getAttribute(yi.SRC))!=null?i:void 0}set src(e){e?this.setAttribute(yi.SRC,e):this.removeAttribute(yi.SRC)}get poster(){var e;let i=this.getAttribute(yi.POSTER);if(i!=null)return i;let{tokens:a}=this;if(a.playback&&!a.thumbnail){gi("Missing expected thumbnail token. No poster image will be shown");return}if(this.playbackId&&!this.audio)return mS(this.playbackId,{customDomain:this.customDomain,thumbnailTime:(e=this.thumbnailTime)!=null?e:this.startTime,programTime:this.programStartTime,token:a.thumbnail})}set poster(e){e||e===""?this.setAttribute(yi.POSTER,e):this.removeAttribute(yi.POSTER)}get storyboardSrc(){var e;return(e=this.getAttribute(S.STORYBOARD_SRC))!=null?e:void 0}set storyboardSrc(e){e?this.setAttribute(S.STORYBOARD_SRC,e):this.removeAttribute(S.STORYBOARD_SRC)}get storyboard(){let{tokens:e}=this;if(this.storyboardSrc&&!e.storyboard)return this.storyboardSrc;if(!(this.audio||!this.playbackId||!this.streamType||[ee.LIVE,ee.UNKNOWN].includes(this.streamType)||e.playback&&!e.storyboard))return pS(this.playbackId,{customDomain:this.customDomain,token:e.storyboard,programStartTime:this.programStartTime,programEndTime:this.programEndTime})}get audio(){return this.hasAttribute(S.AUDIO)}set audio(e){if(!e){this.removeAttribute(S.AUDIO);return}this.setAttribute(S.AUDIO,"")}get hotkeys(){return B(this,Ml)}get nohotkeys(){return this.hasAttribute(S.NOHOTKEYS)}set nohotkeys(e){if(!e){this.removeAttribute(S.NOHOTKEYS);return}this.setAttribute(S.NOHOTKEYS,"")}get thumbnailTime(){return Ve(this.getAttribute(S.THUMBNAIL_TIME))}set thumbnailTime(e){this.setAttribute(S.THUMBNAIL_TIME,`${e}`)}get videoTitle(){var e,i;return(i=(e=this.getAttribute(S.VIDEO_TITLE))!=null?e:this.getAttribute(S.TITLE))!=null?i:""}set videoTitle(e){e!==this.videoTitle&&(e?this.setAttribute(S.VIDEO_TITLE,e):this.removeAttribute(S.VIDEO_TITLE))}get placeholder(){var e;return(e=Ft(this,S.PLACEHOLDER))!=null?e:""}set placeholder(e){this.setAttribute(S.PLACEHOLDER,`${e}`)}get primaryColor(){var e,i;let a=this.getAttribute(S.PRIMARY_COLOR);if(a!=null||this.mediaTheme&&(a=(i=(e=ii.getComputedStyle(this.mediaTheme))==null?void 0:e.getPropertyValue("--_primary-color"))==null?void 0:i.trim(),a))return a}set primaryColor(e){this.setAttribute(S.PRIMARY_COLOR,`${e}`)}get secondaryColor(){var e,i;let a=this.getAttribute(S.SECONDARY_COLOR);if(a!=null||this.mediaTheme&&(a=(i=(e=ii.getComputedStyle(this.mediaTheme))==null?void 0:e.getPropertyValue("--_secondary-color"))==null?void 0:i.trim(),a))return a}set secondaryColor(e){this.setAttribute(S.SECONDARY_COLOR,`${e}`)}get accentColor(){var e,i;let a=this.getAttribute(S.ACCENT_COLOR);if(a!=null||this.mediaTheme&&(a=(i=(e=ii.getComputedStyle(this.mediaTheme))==null?void 0:e.getPropertyValue("--_accent-color"))==null?void 0:i.trim(),a))return a}set accentColor(e){this.setAttribute(S.ACCENT_COLOR,`${e}`)}get defaultShowRemainingTime(){return this.hasAttribute(S.DEFAULT_SHOW_REMAINING_TIME)}set defaultShowRemainingTime(e){e?this.setAttribute(S.DEFAULT_SHOW_REMAINING_TIME,""):this.removeAttribute(S.DEFAULT_SHOW_REMAINING_TIME)}get playbackRates(){if(this.hasAttribute(S.PLAYBACK_RATES))return this.getAttribute(S.PLAYBACK_RATES).trim().split(/\s*,?\s+/).map(e=>Number(e)).filter(e=>!Number.isNaN(e)).sort((e,i)=>e-i)}set playbackRates(e){if(!e){this.removeAttribute(S.PLAYBACK_RATES);return}this.setAttribute(S.PLAYBACK_RATES,e.join(" "))}get forwardSeekOffset(){var e;return(e=Ve(this.getAttribute(S.FORWARD_SEEK_OFFSET)))!=null?e:10}set forwardSeekOffset(e){this.setAttribute(S.FORWARD_SEEK_OFFSET,`${e}`)}get backwardSeekOffset(){var e;return(e=Ve(this.getAttribute(S.BACKWARD_SEEK_OFFSET)))!=null?e:10}set backwardSeekOffset(e){this.setAttribute(S.BACKWARD_SEEK_OFFSET,`${e}`)}get defaultHiddenCaptions(){return this.hasAttribute(S.DEFAULT_HIDDEN_CAPTIONS)}set defaultHiddenCaptions(e){e?this.setAttribute(S.DEFAULT_HIDDEN_CAPTIONS,""):this.removeAttribute(S.DEFAULT_HIDDEN_CAPTIONS)}get defaultDuration(){return Ve(this.getAttribute(S.DEFAULT_DURATION))}set defaultDuration(e){e==null?this.removeAttribute(S.DEFAULT_DURATION):this.setAttribute(S.DEFAULT_DURATION,`${e}`)}get playerInitTime(){return this.hasAttribute(E.PLAYER_INIT_TIME)?Ve(this.getAttribute(E.PLAYER_INIT_TIME)):B(this,Cl)}set playerInitTime(e){e!=this.playerInitTime&&(e==null?this.removeAttribute(E.PLAYER_INIT_TIME):this.setAttribute(E.PLAYER_INIT_TIME,`${+e}`))}get playerSoftwareName(){var e;return(e=this.getAttribute(E.PLAYER_SOFTWARE_NAME))!=null?e:Qv}get playerSoftwareVersion(){var e;return(e=this.getAttribute(E.PLAYER_SOFTWARE_VERSION))!=null?e:zv}get beaconCollectionDomain(){var e;return(e=this.getAttribute(E.BEACON_COLLECTION_DOMAIN))!=null?e:void 0}set beaconCollectionDomain(e){e!==this.beaconCollectionDomain&&(e?this.setAttribute(E.BEACON_COLLECTION_DOMAIN,e):this.removeAttribute(E.BEACON_COLLECTION_DOMAIN))}get maxResolution(){var e;return(e=this.getAttribute(E.MAX_RESOLUTION))!=null?e:void 0}set maxResolution(e){e!==this.maxResolution&&(e?this.setAttribute(E.MAX_RESOLUTION,e):this.removeAttribute(E.MAX_RESOLUTION))}get minResolution(){var e;return(e=this.getAttribute(E.MIN_RESOLUTION))!=null?e:void 0}set minResolution(e){e!==this.minResolution&&(e?this.setAttribute(E.MIN_RESOLUTION,e):this.removeAttribute(E.MIN_RESOLUTION))}get maxAutoResolution(){var e;return(e=this.getAttribute(E.MAX_AUTO_RESOLUTION))!=null?e:void 0}set maxAutoResolution(e){e==null?this.removeAttribute(E.MAX_AUTO_RESOLUTION):this.setAttribute(E.MAX_AUTO_RESOLUTION,e)}get renditionOrder(){var e;return(e=this.getAttribute(E.RENDITION_ORDER))!=null?e:void 0}set renditionOrder(e){e!==this.renditionOrder&&(e?this.setAttribute(E.RENDITION_ORDER,e):this.removeAttribute(E.RENDITION_ORDER))}get programStartTime(){return Ve(this.getAttribute(E.PROGRAM_START_TIME))}set programStartTime(e){e==null?this.removeAttribute(E.PROGRAM_START_TIME):this.setAttribute(E.PROGRAM_START_TIME,`${e}`)}get programEndTime(){return Ve(this.getAttribute(E.PROGRAM_END_TIME))}set programEndTime(e){e==null?this.removeAttribute(E.PROGRAM_END_TIME):this.setAttribute(E.PROGRAM_END_TIME,`${e}`)}get assetStartTime(){return Ve(this.getAttribute(E.ASSET_START_TIME))}set assetStartTime(e){e==null?this.removeAttribute(E.ASSET_START_TIME):this.setAttribute(E.ASSET_START_TIME,`${e}`)}get assetEndTime(){return Ve(this.getAttribute(E.ASSET_END_TIME))}set assetEndTime(e){e==null?this.removeAttribute(E.ASSET_END_TIME):this.setAttribute(E.ASSET_END_TIME,`${e}`)}get extraSourceParams(){return this.hasAttribute(S.EXTRA_SOURCE_PARAMS)?[...new URLSearchParams(this.getAttribute(S.EXTRA_SOURCE_PARAMS)).entries()].reduce((e,[i,a])=>(e[i]=a,e),{}):JS}set extraSourceParams(e){e==null?this.removeAttribute(S.EXTRA_SOURCE_PARAMS):this.setAttribute(S.EXTRA_SOURCE_PARAMS,new URLSearchParams(e).toString())}get customDomain(){var e;return(e=this.getAttribute(E.CUSTOM_DOMAIN))!=null?e:void 0}set customDomain(e){e!==this.customDomain&&(e?this.setAttribute(E.CUSTOM_DOMAIN,e):this.removeAttribute(E.CUSTOM_DOMAIN))}get envKey(){var e;return(e=Ft(this,E.ENV_KEY))!=null?e:void 0}set envKey(e){this.setAttribute(E.ENV_KEY,`${e}`)}get noVolumePref(){return this.hasAttribute(S.NO_VOLUME_PREF)}set noVolumePref(e){e?this.setAttribute(S.NO_VOLUME_PREF,""):this.removeAttribute(S.NO_VOLUME_PREF)}get noMutedPref(){return this.hasAttribute(S.NO_MUTED_PREF)}set noMutedPref(e){e?this.setAttribute(S.NO_MUTED_PREF,""):this.removeAttribute(S.NO_MUTED_PREF)}get debug(){return Ft(this,E.DEBUG)!=null}set debug(e){e?this.setAttribute(E.DEBUG,""):this.removeAttribute(E.DEBUG)}get disableTracking(){return Ft(this,E.DISABLE_TRACKING)!=null}set disableTracking(e){this.toggleAttribute(E.DISABLE_TRACKING,!!e)}get disableCookies(){return Ft(this,E.DISABLE_COOKIES)!=null}set disableCookies(e){e?this.setAttribute(E.DISABLE_COOKIES,""):this.removeAttribute(E.DISABLE_COOKIES)}get streamType(){var e,i,a;return(a=(i=this.getAttribute(E.STREAM_TYPE))!=null?i:(e=this.media)==null?void 0:e.streamType)!=null?a:ee.UNKNOWN}set streamType(e){this.setAttribute(E.STREAM_TYPE,`${e}`)}get defaultStreamType(){var e,i,a;return(a=(i=this.getAttribute(S.DEFAULT_STREAM_TYPE))!=null?i:(e=this.mediaController)==null?void 0:e.getAttribute(S.DEFAULT_STREAM_TYPE))!=null?a:ee.ON_DEMAND}set defaultStreamType(e){e?this.setAttribute(S.DEFAULT_STREAM_TYPE,e):this.removeAttribute(S.DEFAULT_STREAM_TYPE)}get targetLiveWindow(){var e,i;return this.hasAttribute(S.TARGET_LIVE_WINDOW)?+this.getAttribute(S.TARGET_LIVE_WINDOW):(i=(e=this.media)==null?void 0:e.targetLiveWindow)!=null?i:Number.NaN}set targetLiveWindow(e){e==this.targetLiveWindow||Number.isNaN(e)&&Number.isNaN(this.targetLiveWindow)||(e==null?this.removeAttribute(S.TARGET_LIVE_WINDOW):this.setAttribute(S.TARGET_LIVE_WINDOW,`${+e}`))}get liveEdgeStart(){var e;return(e=this.media)==null?void 0:e.liveEdgeStart}get startTime(){return Ve(Ft(this,E.START_TIME))}set startTime(e){this.setAttribute(E.START_TIME,`${e}`)}get initialBandwidthEstimateKbps(){return Ve(Ft(this,E.INITIAL_BANDWIDTH_ESTIMATE_KBPS))}set initialBandwidthEstimateKbps(e){e==null?this.removeAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS):this.setAttribute(E.INITIAL_BANDWIDTH_ESTIMATE_KBPS,`${e}`)}get initialEstimateSegments(){return Ve(Ft(this,E.INITIAL_ESTIMATE_SEGMENTS))}set initialEstimateSegments(e){e==null?this.removeAttribute(E.INITIAL_ESTIMATE_SEGMENTS):this.setAttribute(E.INITIAL_ESTIMATE_SEGMENTS,`${e}`)}get minPreloadSegments(){return Ve(Ft(this,E.MIN_PRELOAD_SEGMENTS))}set minPreloadSegments(e){e==null?this.removeAttribute(E.MIN_PRELOAD_SEGMENTS):this.setAttribute(E.MIN_PRELOAD_SEGMENTS,`${e}`)}get preferPlayback(){let e=this.getAttribute(E.PREFER_PLAYBACK);if(e===ni.MSE||e===ni.NATIVE)return e}set preferPlayback(e){e!==this.preferPlayback&&(e===ni.MSE||e===ni.NATIVE?this.setAttribute(E.PREFER_PLAYBACK,e):this.removeAttribute(E.PREFER_PLAYBACK))}get metadata(){var e;return(e=this.media)==null?void 0:e.metadata}set metadata(e){if(_e(this,ve,Ti).call(this),!this.media){dt("underlying media element missing when trying to set metadata. metadata will not be set.");return}this.media.metadata={...Gv(this),...e}}get _hlsConfig(){var e;return(e=this.media)==null?void 0:e._hlsConfig}set _hlsConfig(e){if(_e(this,ve,Ti).call(this),!this.media){dt("underlying media element missing when trying to set _hlsConfig. _hlsConfig will not be set.");return}this.media._hlsConfig=e}async addCuePoints(e){var i;if(_e(this,ve,Ti).call(this),!this.media){dt("underlying media element missing when trying to addCuePoints. cuePoints will not be added.");return}return(i=this.media)==null?void 0:i.addCuePoints(e)}get activeCuePoint(){var e;return(e=this.media)==null?void 0:e.activeCuePoint}get cuePoints(){var e,i;return(i=(e=this.media)==null?void 0:e.cuePoints)!=null?i:[]}addChapters(e){var i;if(_e(this,ve,Ti).call(this),!this.media){dt("underlying media element missing when trying to addChapters. chapters will not be added.");return}return(i=this.media)==null?void 0:i.addChapters(e)}get activeChapter(){var e;return(e=this.media)==null?void 0:e.activeChapter}get chapters(){var e,i;return(i=(e=this.media)==null?void 0:e.chapters)!=null?i:[]}getStartDate(){var e;return(e=this.media)==null?void 0:e.getStartDate()}get currentPdt(){var e;return(e=this.media)==null?void 0:e.currentPdt}get tokens(){let e=this.getAttribute(S.PLAYBACK_TOKEN),i=this.getAttribute(S.DRM_TOKEN),a=this.getAttribute(S.THUMBNAIL_TOKEN),r=this.getAttribute(S.STORYBOARD_TOKEN);return{...B(this,Dl),...e!=null?{playback:e}:{},...i!=null?{drm:i}:{},...a!=null?{thumbnail:a}:{},...r!=null?{storyboard:r}:{}}}set tokens(e){Je(this,Dl,e??{})}get playbackToken(){var e;return(e=this.getAttribute(S.PLAYBACK_TOKEN))!=null?e:void 0}set playbackToken(e){this.setAttribute(S.PLAYBACK_TOKEN,`${e}`)}get drmToken(){var e;return(e=this.getAttribute(S.DRM_TOKEN))!=null?e:void 0}set drmToken(e){this.setAttribute(S.DRM_TOKEN,`${e}`)}get thumbnailToken(){var e;return(e=this.getAttribute(S.THUMBNAIL_TOKEN))!=null?e:void 0}set thumbnailToken(e){this.setAttribute(S.THUMBNAIL_TOKEN,`${e}`)}get storyboardToken(){var e;return(e=this.getAttribute(S.STORYBOARD_TOKEN))!=null?e:void 0}set storyboardToken(e){this.setAttribute(S.STORYBOARD_TOKEN,`${e}`)}addTextTrack(e,i,a,r){var s;let o=(s=this.media)==null?void 0:s.nativeEl;if(o)return jc(o,e,i,a,r)}removeTextTrack(e){var i;let a=(i=this.media)==null?void 0:i.nativeEl;if(a)return J0(a,e)}get textTracks(){var e;return(e=this.media)==null?void 0:e.textTracks}get castReceiver(){var e;return(e=this.getAttribute(S.CAST_RECEIVER))!=null?e:void 0}set castReceiver(e){e!==this.castReceiver&&(e?this.setAttribute(S.CAST_RECEIVER,e):this.removeAttribute(S.CAST_RECEIVER))}get castCustomData(){var e;return(e=this.media)==null?void 0:e.castCustomData}set castCustomData(e){if(!this.media){dt("underlying media element missing when trying to set castCustomData. castCustomData will not be set.");return}this.media.castCustomData=e}get noTooltips(){return this.hasAttribute(S.NO_TOOLTIPS)}set noTooltips(e){if(!e){this.removeAttribute(S.NO_TOOLTIPS);return}this.setAttribute(S.NO_TOOLTIPS,"")}get proudlyDisplayMuxBadge(){return this.hasAttribute(S.PROUDLY_DISPLAY_MUX_BADGE)}set proudlyDisplayMuxBadge(e){e?this.setAttribute(S.PROUDLY_DISPLAY_MUX_BADGE,""):this.removeAttribute(S.PROUDLY_DISPLAY_MUX_BADGE)}get capRenditionToPlayerSize(){var e;return(e=this.media)==null?void 0:e.capRenditionToPlayerSize}set capRenditionToPlayerSize(e){if(!this.media){dt("underlying media element missing when trying to set capRenditionToPlayerSize");return}this.media.capRenditionToPlayerSize=e}},n(Qr,"Ve"),Qr);Cl=new WeakMap,ls=new WeakMap,Dl=new WeakMap,ga=new WeakMap,Ml=new WeakMap,ds=new WeakMap,gd=new WeakMap,yd=new WeakMap,Rr=new WeakMap,us=new WeakMap,Lr=new WeakMap,Td=new WeakMap,ve=new WeakSet,Ti=n(function(){var t,e,i,a;if(!B(this,ls)){Je(this,ls,!0),_e(this,ve,Ia).call(this);try{if(customElements.upgrade(this.mediaTheme),!(this.mediaTheme instanceof ii.HTMLElement))throw""}catch{dt("<media-theme> failed to upgrade!")}try{customElements.upgrade(this.media)}catch{dt("underlying media element failed to upgrade!")}try{if(customElements.upgrade(this.mediaController),!(this.mediaController instanceof IT))throw""}catch{dt("<media-controller> failed to upgrade!")}_e(this,ve,Zv).call(this),_e(this,ve,Xv).call(this),_e(this,ve,Jv).call(this),Je(this,ga,(e=(t=this.mediaController)==null?void 0:t.hasAttribute($.USER_INACTIVE))!=null?e:!0),_e(this,ve,ef).call(this),(i=this.media)==null||i.addEventListener("streamtypechange",B(this,gd)),(a=this.media)==null||a.addEventListener("loadstart",B(this,yd))}},"I"),G_=n(function(){var t,e;try{(t=window?.CSS)==null||t.registerProperty({name:"--media-primary-color",syntax:"<color>",inherits:!0}),(e=window?.CSS)==null||e.registerProperty({name:"--media-secondary-color",syntax:"<color>",inherits:!0})}catch{}},"$t"),Fc=n(function(t){Object.assign(B(this,Lr),t),_e(this,ve,Ia).call(this)},"Ke"),Ia=n(function(t={}){OS(NS(YS(this,{...B(this,Lr),...t})),this.shadowRoot)},"K"),Zv=n(function(){let t=n(e=>{var i,a;if(!(e!=null&&e.startsWith("theme-")))return;let r=e.replace(/^theme-/,"");if(Bc.includes(r))return;let s=this.getAttribute(e);s!=null?(i=this.mediaTheme)==null||i.setAttribute(r,s):(a=this.mediaTheme)==null||a.removeAttribute(r)},"e");Je(this,ds,new MutationObserver(e=>{for(let{attributeName:i}of e)t(i)})),B(this,ds).observe(this,{attributes:!0}),this.getAttributeNames().forEach(t)},"Ft"),Xv=n(function(){this.addEventListener("error",B(this,Td)),this.media&&(this.media.errorTranslator=(t={})=>{var e,i,a;if(!(((e=this.media)==null?void 0:e.error)instanceof L))return t;let r=q_((i=this.media)==null?void 0:i.error);return{player_error_code:(a=this.media)==null?void 0:a.error.code,player_error_message:r.message?String(r.message):t.player_error_message,player_error_context:r.context?String(r.context):t.player_error_context}})},"Yt"),Jv=n(function(){var t,e,i,a;(e=(t=this.media)==null?void 0:t.textTracks)==null||e.addEventListener("addtrack",B(this,Rr)),(a=(i=this.media)==null?void 0:i.textTracks)==null||a.addEventListener("removetrack",B(this,Rr))},"Wt"),ef=n(function(){var t,e;if(!/Firefox/i.test(navigator.userAgent))return;let i,a=new WeakMap,r=n(()=>this.streamType===ee.LIVE&&!this.secondaryColor&&this.offsetWidth>=800,"s"),s=n((h,p,v=!1)=>{r()||Array.from(h&&h.activeCues||[]).forEach(c=>{if(!(!c.snapToLines||c.line<-5||c.line>=0&&c.line<10))if(!p||this.paused){let u=c.text.split(`
`).length,f=-3;this.streamType===ee.LIVE&&(f=-2);let _=f-u;if(c.line===_&&!v)return;a.has(c)||a.set(c,c.line),c.line=_}else setTimeout(()=>{c.line=a.get(c)||"auto"},500)})},"d"),o=n(()=>{var h,p;s(i,(p=(h=this.mediaController)==null?void 0:h.hasAttribute($.USER_INACTIVE))!=null?p:!1)},"u"),l=n(()=>{var h,p;let v=Array.from(((p=(h=this.mediaController)==null?void 0:h.media)==null?void 0:p.textTracks)||[]).filter(c=>["subtitles","captions"].includes(c.kind)&&c.mode==="showing")[0];v!==i&&i?.removeEventListener("cuechange",o),i=v,i?.addEventListener("cuechange",o),s(i,B(this,ga))},"b");l(),(t=this.textTracks)==null||t.addEventListener("change",l),(e=this.textTracks)==null||e.addEventListener("addtrack",l);let d=n(()=>{var h,p;let v=(p=(h=this.mediaController)==null?void 0:h.hasAttribute($.USER_INACTIVE))!=null?p:!0;B(this,ga)!==v&&(Je(this,ga,v),s(i,B(this,ga)))},"R");this.addEventListener("userinactivechange",d),Je(this,us,()=>{var h,p;i?.removeEventListener("cuechange",o),(h=this.textTracks)==null||h.removeEventListener("change",l),(p=this.textTracks)==null||p.removeEventListener("addtrack",l),this.removeEventListener("userinactivechange",d)})},"Zt");function Ft(t,e){return t.media?t.media.getAttribute(e):t.getAttribute(e)}n(Ft,"M$1");var tf=ew,jr,z_=(jr=class{addEventListener(){}removeEventListener(){}dispatchEvent(e){return!0}},n(jr,"o"),jr);if(typeof DocumentFragment>"u"){const e=class e extends z_{};n(e,"e");let t=e;globalThis.DocumentFragment=t}var Zr,tw=(Zr=class extends z_{},n(Zr,"s"),Zr),iw={get(t){},define(t,e,i){},getName(t){return null},upgrade(t){},whenDefined(t){return Promise.resolve(tw)}},aw={customElements:iw},rw=typeof window>"u"||typeof globalThis.customElements>"u",su=rw?aw:globalThis;su.customElements.get("mux-player")||(su.customElements.define("mux-player",tf),su.MuxPlayerElement=tf);var Q_=parseInt(cs.version)>=19,af={className:"class",classname:"class",htmlFor:"for",crossOrigin:"crossorigin",viewBox:"viewBox",playsInline:"playsinline",autoPlay:"autoplay",playbackRate:"playbackrate"},nw=n(t=>t==null,"B"),sw=n((t,e)=>nw(e)?!1:t in e,"ee"),ow=n(t=>t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`),"te"),lw=n((t,e)=>{if(!(!Q_&&typeof e=="boolean"&&!e)){if(sw(t,af))return af[t];if(typeof e<"u")return/[A-Z]/.test(t)?ow(t):t}},"ne"),dw=n((t,e)=>!Q_&&typeof t=="boolean"?"":t,"ae"),uw=n((t={})=>{let{ref:e,...i}=t;return Object.entries(i).reduce((a,[r,s])=>{let o=lw(r,s);if(!o)return a;let l=dw(s);return a[o]=l,a},{})},"P");function rf(t,e){if(typeof t=="function")return t(e);t!=null&&(t.current=e)}n(rf,"x");function cw(...t){return e=>{let i=!1,a=t.map(r=>{let s=rf(r,e);return!i&&typeof s=="function"&&(i=!0),s});if(i)return()=>{for(let r=0;r<a.length;r++){let s=a[r];typeof s=="function"?s():rf(t[r],null)}}}}n(cw,"re");function hw(...t){return hs.useCallback(cw(...t),t)}n(hw,"f");var mw=Object.prototype.hasOwnProperty,pw=n((t,e)=>{if(Object.is(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;if(Array.isArray(t))return!Array.isArray(e)||t.length!==e.length?!1:t.some((r,s)=>e[s]===r);let i=Object.keys(t),a=Object.keys(e);if(i.length!==a.length)return!1;for(let r=0;r<i.length;r++)if(!mw.call(e,i[r])||!Object.is(t[i[r]],e[i[r]]))return!1;return!0},"ue"),j_=n((t,e,i)=>!pw(e,t[i]),"p"),vw=n((t,e,i)=>{t[i]=e},"se"),fw=n((t,e,i,a=vw,r=j_)=>hs.useEffect(()=>{let s=i?.current;s&&r(s,e,t)&&a(s,e,t)},[i?.current,e]),"ie"),Kt=fw,Ew=n(()=>{try{return"3.13.0"}catch{}return"UNKNOWN"},"ye"),_w=Ew(),bw=n(()=>_w,"g"),de=n((t,e,i)=>hs.useEffect(()=>{let a=e?.current;if(!a||!i)return;let r=t,s=i;return a.addEventListener(r,s),()=>{a.removeEventListener(r,s)}},[e?.current,i,t]),"r"),gw=cs.forwardRef(({children:t,...e},i)=>cs.createElement("mux-player",{suppressHydrationWarning:!0,...uw(e),ref:i},t)),yw=n((t,e)=>{let{onAbort:i,onCanPlay:a,onCanPlayThrough:r,onEmptied:s,onLoadStart:o,onLoadedData:l,onLoadedMetadata:d,onProgress:h,onDurationChange:p,onVolumeChange:v,onRateChange:c,onResize:u,onWaiting:f,onPlay:_,onPlaying:b,onTimeUpdate:T,onPause:A,onSeeking:g,onSeeked:w,onStalled:O,onSuspend:M,onEnded:H,onError:F,onCuePointChange:j,onChapterChange:K,metadata:W,tokens:We,paused:at,playbackId:rt,playbackRates:ge,currentTime:qe,themeProps:Ut,extraSourceParams:Ye,castCustomData:At,_hlsConfig:nt,...Me}=e;return Kt("tokens",We,t),Kt("playbackId",rt,t),Kt("playbackRates",ge,t),Kt("metadata",W,t),Kt("extraSourceParams",Ye,t),Kt("_hlsConfig",nt,t),Kt("themeProps",Ut,t),Kt("castCustomData",At,t),Kt("paused",at,t,(Be,Ge)=>{Ge!=null&&(Ge?Be.pause():Be.play())},(Be,Ge,pi)=>Be.hasAttribute("autoplay")&&!Be.hasPlayed?!1:j_(Be,Ge,pi)),Kt("currentTime",qe,t,(Be,Ge)=>{Ge!=null&&(Be.currentTime=Ge)}),de("abort",t,i),de("canplay",t,a),de("canplaythrough",t,r),de("emptied",t,s),de("loadstart",t,o),de("loadeddata",t,l),de("loadedmetadata",t,d),de("progress",t,h),de("durationchange",t,p),de("volumechange",t,v),de("ratechange",t,c),de("resize",t,u),de("waiting",t,f),de("play",t,_),de("playing",t,b),de("timeupdate",t,T),de("pause",t,A),de("seeking",t,g),de("seeked",t,w),de("stalled",t,O),de("suspend",t,M),de("ended",t,H),de("error",t,F),de("cuepointchange",t,j),de("chapterchange",t,K),[Me]},"xe"),Tw=bw(),Aw="mux-player-react",kw=cs.forwardRef((t,e)=>{var i;let a=hs.useRef(null),r=hw(a,e),[s]=yw(a,t),[o]=hs.useState((i=t.playerInitTime)!=null?i:eh());return cs.createElement(gw,{ref:r,defaultHiddenCaptions:t.defaultHiddenCaptions,playerSoftwareName:Aw,playerSoftwareVersion:Tw,playerInitTime:o,...s})}),xw=kw;export{Cw as MaxResolution,L as MediaError,Dw as MinResolution,Mw as RenditionOrder,xw as default,eh as generatePlayerInitTime,Aw as playerSoftwareName,Tw as playerSoftwareVersion};

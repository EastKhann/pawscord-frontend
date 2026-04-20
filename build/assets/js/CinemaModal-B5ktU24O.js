var I=Object.defineProperty;var t=(l,s)=>I(l,"name",{value:s,configurable:!0});import{_ as B}from"./feature-voice-QKNc0aQk.js";import{r as n,j as e}from"./react-core-CVJb_REf.js";import{e as O,l as C,P as S}from"./main-BXfHpMF8.js";import{F as W,Z as L,a1 as z,ba as M,h as U}from"./icons-vendor-B4drzZI6.js";import{u as V}from"./i18n-vendor-gfeeXaIB.js";import"./app-vendor-i9UMv2t6.js";const D=n.lazy(()=>B(()=>import("./media-vendor-BzBYkuDR.js").then(l=>l.i),[])),N=t(({onClose:l,ws:s})=>{const{t:g}=V(),[j,k]=n.useState("https://www.youtube.com/watch?v=jfKfPfyJRdk"),[x,v]=n.useState(""),[c,d]=n.useState(!1),[P,J]=n.useState(.8),[y,b]=n.useState(null),[R,f]=n.useState(!1),i=n.useRef(null),p=n.useRef(!1),m=t(()=>{if(i.current&&typeof i.current.getCurrentTime=="function")try{return i.current.getCurrentTime()}catch{return 0}return 0},"getCurrentTimeSafe");n.useEffect(()=>{if(!s.current)return;const r=t(h=>{try{const o=JSON.parse(h.data);if(o.type==="media_sync"){if(p.current=!0,o.action==="change_url")d(!1),f(!1),k(o.payload.url),b(null);else if(o.action==="play"){const _=m();Math.abs(_-o.payload.time)>2&&i.current&&typeof i.current.seekTo=="function"&&i.current.seekTo(o.payload.time),d(!0)}else o.action==="pause"&&d(!1);setTimeout(()=>{p.current=!1},1e3)}}catch(o){C.error("WS Error:",o)}},"handleMessage");return s.current.addEventListener("message",r),()=>s.current?.removeEventListener("message",r)},[s]);const u=t((r,h={})=>{p.current||s.current?.readyState===WebSocket.OPEN&&s.current.send(JSON.stringify({type:"media_sync",action:r,payload:h}))},"sendSignal"),E=t(r=>{r.preventDefault(),x.trim()&&(p.current=!1,d(!1),f(!1),k(x),b(null),u("change_url",{url:x}),v(""))},"handleLoadUrl"),{overlayProps:F,dialogProps:T}=O({onClose:l,label:"Cinema & Music"});return e.jsx("div",{"aria-label":"cinema modal",style:a.overlay,...F,children:e.jsxs("div",{style:a.modal,...T,children:[e.jsxs("div",{style:a.header,children:[e.jsx("h3",{children:"🍿 Cinema & Music"}),e.jsx("button",{onClick:l,style:a.closeBtn,"aria-label":"Close",children:e.jsx(W,{})})]}),e.jsxs("div",{style:a.playerWrapper,children:[y&&e.jsxs("div",{style:a.statusOverlay,children:[e.jsx(L,{size:40,color:"#f23f42"}),e.jsx("p",{children:y})]}),!R&&!y&&e.jsxs("div",{style:a.statusOverlay,children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:g("common.loading")})]}),e.jsx(n.Suspense,{fallback:e.jsx("div",{children:"Oynatıcı yükleniyor..."}),children:e.jsx(D,{ref:i,url:j,playing:c,volume:P,controls:!0,width:"100%",height:"100%",onReady:t(()=>{f(!0)},"onReady"),onError:t(r=>{C.error("Video Playback Error:",r),b("Video oynatılamadı. Bağlantı geçersiz olabilir."),f(!0)},"onError"),onPlay:t(()=>{const r=m();u("play",{time:r})},"onPlay"),onPause:t(()=>{u("pause")},"onPause"),onProgress:t(()=>{},"onProgress")},j)})]}),e.jsxs("div",{style:a.controls,children:[e.jsxs("form",{onSubmit:E,style:a.urlForm,children:[e.jsx(z,{}),e.jsx("input",{type:"text",value:x,onChange:t(r=>v(r.target.value),"onChange"),placeholder:g("cinema.paste_youtube_link"),"aria-label":"Video URL input",style:a.input}),e.jsx("button",{type:"submit",style:a.loadBtn,children:g("common.upload")})]}),e.jsx("button",{onClick:t(()=>{if(p.current=!1,c)d(!1),u("pause");else{d(!0);const r=m();u("play",{time:r})}},"onClick"),style:{...a.loadBtn,background:c?"linear-gradient(135deg, #f23f42 0%, #d93235 100%)":"linear-gradient(135deg, #23a559 0%, #1d8f4a 100%)",boxShadow:c?"0 3px 0 #a82b2e, 0 6px 16px rgba(242,63,66,0.30)":"0 3px 0 #177a3e, 0 6px 16px rgba(35,165,89,0.30)",marginLeft:10,width:110,display:"flex",alignItems:"center",justifyContent:"center",gap:5},children:c?e.jsxs(e.Fragment,{children:[e.jsx(M,{})," Dur"]}):e.jsxs(e.Fragment,{children:[e.jsx(U,{})," Oynat"]})})]})]})})},"CinemaModal"),a={overlay:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",zIndex:2e3,display:"flex",justifyContent:"center",alignItems:"center"},modal:{width:"90%",maxWidth:"900px",background:"rgba(30,31,35,0.92)",backdropFilter:"blur(48px) saturate(180%)",WebkitBackdropFilter:"blur(48px) saturate(180%)",borderRadius:"16px",overflow:"hidden",boxShadow:"0 0 0 1px rgba(88,101,242,0.10), 0 16px 48px rgba(0,0,0,0.6)",border:"1px solid rgba(255,255,255,0.07)"},header:{padding:"16px 20px",background:"linear-gradient(135deg, rgba(88,101,242,0.15), rgba(114,137,218,0.08))",display:"flex",justifyContent:"space-between",alignItems:"center",color:"white",borderBottom:"1px solid rgba(255,255,255,0.06)"},playerWrapper:{position:"relative",paddingTop:"56.25%",backgroundColor:"black"},closeBtn:{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.10)",borderRadius:"8px",width:"32px",height:"32px",color:"white",fontSize:"1.2em",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"},controls:{padding:"16px 20px",display:"flex",alignItems:"center",gap:"10px"},urlForm:{display:"flex",gap:"10px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",padding:"10px",borderRadius:"13px",flex:1},input:{flex:1,background:"transparent",border:"none",color:"white",outline:"none"},loadBtn:{padding:"8px 20px",background:"linear-gradient(135deg, #5865f2 0%, #4752c4 100%)",border:"none",borderRadius:"13px",color:"white",fontWeight:"bold",cursor:"pointer",boxShadow:"0 3px 0 #3b45c7, 0 6px 16px rgba(88,101,242,0.30)",transition:"all 0.15s"},statusOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.7)",color:"white",zIndex:10}},w=document.createElement("style");w.innerText=`


    .spinner {


        border: 4px solid rgba(255, 255, 255, 0.3);


        border-radius: 50%;


        border-top: 4px solid #ffffff;


        width: 40px;


        height: 40px;


        animation: spin 1s linear infinite;


    }


    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }


`;document.head.appendChild(w);N.propTypes={onClose:S.func,ws:S.object};export{N as default};

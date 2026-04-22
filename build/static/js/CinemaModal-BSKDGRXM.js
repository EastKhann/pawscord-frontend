const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DSfBZvKG.js","./electron-DmHst6A-.js","../css/electron-vJRuAeUp.css"])))=>i.map(i=>d[i]);
var I=Object.defineProperty;var t=(x,o)=>I(x,"name",{value:o,configurable:!0});import{b as L,r as n,Z as B,j as e,_ as M,ae as O,l as C,af as W,ag as U,y as z,ah as V,P as S}from"./electron-DmHst6A-.js";const D=n.lazy(()=>V(()=>import("./index-DSfBZvKG.js"),__vite__mapDeps([0,1,2]),import.meta.url)),N=t(({onClose:x,ws:o})=>{const{t:i}=L(),[j,v]=n.useState("https://www.youtube.com/watch?v=jfKfPfyJRdk"),[f,k]=n.useState(""),[c,d]=n.useState(!1),[P,J]=n.useState(.8),[y,b]=n.useState(null),[R,g]=n.useState(!1),l=n.useRef(null),u=n.useRef(!1),m=t(()=>{if(l.current&&typeof l.current.getCurrentTime=="function")try{return l.current.getCurrentTime()}catch{return 0}return 0},"getCurrentTimeSafe");n.useEffect(()=>{if(!o.current)return;const r=t(h=>{try{const s=JSON.parse(h.data);if(s.type==="media_sync"){if(u.current=!0,s.action==="change_url")d(!1),g(!1),v(s.payload.url),b(null);else if(s.action==="play"){const F=m();Math.abs(F-s.payload.time)>2&&l.current&&typeof l.current.seekTo=="function"&&l.current.seekTo(s.payload.time),d(!0)}else s.action==="pause"&&d(!1);setTimeout(()=>{u.current=!1},1e3)}}catch(s){C.error("WS Error:",s)}},"handleMessage");return o.current.addEventListener("message",r),()=>o.current?.removeEventListener("message",r)},[o]);const p=t((r,h={})=>{u.current||o.current?.readyState===WebSocket.OPEN&&o.current.send(JSON.stringify({type:"media_sync",action:r,payload:h}))},"sendSignal"),E=t(r=>{r.preventDefault(),f.trim()&&(u.current=!1,d(!1),g(!1),v(f),b(null),p("change_url",{url:f}),k(""))},"handleLoadUrl"),{overlayProps:T,dialogProps:_}=B({onClose:x,label:"Cinema & Music"});return e.jsx("div",{"aria-label":i("aria.cinemaModal","Cinema & Music"),style:a.overlay,...T,children:e.jsxs("div",{style:a.modal,..._,children:[e.jsxs("div",{style:a.header,children:[e.jsx("h3",{children:"🍿 Cinema & Music"}),e.jsx("button",{onClick:x,style:a.closeBtn,"aria-label":i("common.close"),children:e.jsx(M,{})})]}),e.jsxs("div",{style:a.playerWrapper,children:[y&&e.jsxs("div",{style:a.statusOverlay,children:[e.jsx(O,{size:40,color:"#f23f42"}),e.jsx("p",{children:y})]}),!R&&!y&&e.jsxs("div",{style:a.statusOverlay,children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{children:i("common.loading")})]}),e.jsx(n.Suspense,{fallback:e.jsx("div",{children:i("cinema.playerLoading","Loading player...")}),children:e.jsx(D,{ref:l,url:j,playing:c,volume:P,controls:!0,width:"100%",height:"100%",onReady:t(()=>{g(!0)},"onReady"),onError:t(r=>{C.error("Video Playback Error:",r),b(i("cinema.videoError","Video could not be played. The link may be invalid.")),g(!0)},"onError"),onPlay:t(()=>{const r=m();p("play",{time:r})},"onPlay"),onPause:t(()=>{p("pause")},"onPause"),onProgress:t(()=>{},"onProgress")},j)})]}),e.jsxs("div",{style:a.controls,children:[e.jsxs("form",{onSubmit:E,style:a.urlForm,children:[e.jsx(W,{}),e.jsx("input",{type:"text",value:f,onChange:t(r=>k(r.target.value),"onChange"),placeholder:i("cinema.paste_youtube_link"),"aria-label":i("media.videoUrl","Video URL"),style:a.input}),e.jsx("button",{type:"submit",style:a.loadBtn,children:i("common.upload")})]}),e.jsx("button",{onClick:t(()=>{if(u.current=!1,c)d(!1),p("pause");else{d(!0);const r=m();p("play",{time:r})}},"onClick"),style:{...a.loadBtn,background:c?"linear-gradient(135deg, #f23f42 0%, #d93235 100%)":"linear-gradient(135deg, #23a559 0%, #1d8f4a 100%)",boxShadow:c?"0 3px 0 #a82b2e, 0 6px 16px rgba(242,63,66,0.30)":"0 3px 0 #177a3e, 0 6px 16px rgba(35,165,89,0.30)",marginLeft:10,width:110,display:"flex",alignItems:"center",justifyContent:"center",gap:5},children:c?e.jsxs(e.Fragment,{children:[e.jsx(U,{})," Dur"]}):e.jsxs(e.Fragment,{children:[e.jsx(z,{})," Oynat"]})})]})]})})},"CinemaModal"),a={overlay:{position:"fixed",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.8)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",zIndex:2e3,display:"flex",justifyContent:"center",alignItems:"center"},modal:{width:"90%",maxWidth:"900px",background:"rgba(30,31,35,0.92)",backdropFilter:"blur(48px) saturate(180%)",WebkitBackdropFilter:"blur(48px) saturate(180%)",borderRadius:"16px",overflow:"hidden",boxShadow:"0 0 0 1px rgba(88,101,242,0.10), 0 16px 48px rgba(0,0,0,0.6)",border:"1px solid rgba(255,255,255,0.07)"},header:{padding:"16px 20px",background:"linear-gradient(135deg, rgba(88,101,242,0.15), rgba(114,137,218,0.08))",display:"flex",justifyContent:"space-between",alignItems:"center",color:"white",borderBottom:"1px solid rgba(255,255,255,0.06)"},playerWrapper:{position:"relative",paddingTop:"56.25%",backgroundColor:"black"},closeBtn:{background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.10)",borderRadius:"8px",width:"32px",height:"32px",color:"white",fontSize:"1.2em",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"},controls:{padding:"16px 20px",display:"flex",alignItems:"center",gap:"10px"},urlForm:{display:"flex",gap:"10px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.07)",padding:"10px",borderRadius:"13px",flex:1},input:{flex:1,background:"transparent",border:"none",color:"white",outline:"none"},loadBtn:{padding:"8px 20px",background:"linear-gradient(135deg, #5865f2 0%, #4752c4 100%)",border:"none",borderRadius:"13px",color:"white",fontWeight:"bold",cursor:"pointer",boxShadow:"0 3px 0 #3b45c7, 0 6px 16px rgba(88,101,242,0.30)",transition:"all 0.15s"},statusOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.7)",color:"white",zIndex:10}},w=document.createElement("style");w.innerText=`


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

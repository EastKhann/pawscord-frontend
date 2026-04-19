const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BdaITtIA.js","./electron-FB3C4NAk.js","../css/electron-CfBoz1oC.css"])))=>i.map(i=>d[i]);
var k=Object.defineProperty;var t=(s,o)=>k(s,"name",{value:o,configurable:!0});import{b as S,bn as P,r as a,j as e,ae as R,ag as _,y as w,af as I,ah as E}from"./electron-FB3C4NAk.js";const T=a.lazy(()=>E(()=>import("./index-BdaITtIA.js"),__vite__mapDeps([0,1,2]),import.meta.url)),F=t(()=>{const{t:s}=S(),{cinemaState:o,sendCinemaSignal:l,setCinemaState:N}=P(),{url:y,playing:n,time:c,lastSyncAction:u}=o,[d,h]=a.useState(""),[g,O]=a.useState(.8),[p,b]=a.useState(null),[j,f]=a.useState(!1),i=a.useRef(null);a.useRef(!1),a.useEffect(()=>{u==="change_url"?(f(!1),b(null)):u==="play"&&Math.abs(x()-c)>2&&i.current&&i.current.seekTo(c)},[y,n,c,u]);const x=t(()=>{try{return i.current?i.current.getCurrentTime():0}catch{return 0}},"getCurrentTimeSafe"),v=t(m=>{m.preventDefault(),d.trim()&&(l("change_url",{url:d}),h(""))},"handleLoadUrl"),C=t(()=>{n?l("pause"):l("play",{time:x()})},"handlePlayPause");return e.jsxs("div",{style:r.container,children:[e.jsxs("div",{style:r.playerWrapper,children:[p&&e.jsxs("div",{style:r.statusOverlay,children:[e.jsx(R,{size:40,color:"#f23f42"}),e.jsx("p",{className:"mt-10",children:p})]}),!j&&!p&&e.jsxs("div",{style:r.statusOverlay,children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{className:"mt-10",children:s("common.loading")})]}),e.jsx(a.Suspense,{fallback:e.jsx("div",{children:"Oynatıcı yükleniyor..."}),children:e.jsx(T,{ref:i,url:y,playing:n,volume:g,controls:!0,width:"100%",height:"100%",onReady:t(()=>f(!0),"onReady"),onError:t(()=>{b(s("ui.video_oynatilamadi")),f(!0)},"onError"),onPlay:t(()=>{n||l("play",{time:x()})},"onPlay"),onPause:t(()=>{n&&l("pause")},"onPause")})})]}),e.jsxs("div",{style:r.controls,children:[e.jsx("button",{"aria-label":"handle Play Pause",onClick:C,style:{...r.btn,backgroundColor:n?"#da373c":"#23a559",width:"40px",height:"40px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"},children:n?e.jsx(_,{}):e.jsx(w,{className:"ml-2"})}),e.jsxs("form",{onSubmit:v,style:r.urlForm,children:[e.jsx(I,{className:"icon-chat"}),e.jsx("input",{type:"text",value:d,onChange:t(m=>h(m.target.value),"onChange"),placeholder:"YouTube Link...",style:r.input,"aria-label":"Input Url"}),e.jsx("button",{"aria-label":"Submit",type:"submit",children:s("common.upload")})]})]}),e.jsx("style",{children:`

                .spinner {

                    border: 4px solid rgba(255, 255, 255, 0.3);

                    border-radius: 50%;

                    border-top: 4px solid #ffffff;

                    width: 30px; height: 30px;

                    animation: spin 1s linear infinite;

                }

                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

            `})]})},"CinemaPlayer"),r={container:{width:"100%",height:"100%",display:"flex",flexDirection:"column",backgroundColor:"black"},playerWrapper:{flex:1,position:"relative",overflow:"hidden"},controls:{padding:"10px",display:"flex",gap:"10px",backgroundColor:"#0d0e10",alignItems:"center"},urlForm:{flex:1,display:"flex",gap:"8px",backgroundColor:"#1e2024",padding:"5px 10px",borderRadius:"4px",alignItems:"center"},input:{flex:1,background:"transparent",border:"none",color:"white",outline:"none",fontSize:"14px"},btn:{border:"none",color:"white",cursor:"pointer",borderRadius:"4px",fontWeight:"bold"},statusOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.7)",color:"white",zIndex:10}};F.propTypes={};export{F as default};

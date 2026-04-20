var k=Object.defineProperty;var t=(n,i)=>k(n,"name",{value:i,configurable:!0});import{u as S,_ as P}from"./feature-voice-QKNc0aQk.js";import{r,j as e}from"./react-core-CVJb_REf.js";import{Z as R,ba as _,h as w,a1 as I}from"./icons-vendor-B4drzZI6.js";import"./main-BXfHpMF8.js";import{u as E}from"./i18n-vendor-gfeeXaIB.js";import"./app-vendor-i9UMv2t6.js";const T=r.lazy(()=>P(()=>import("./media-vendor-BzBYkuDR.js").then(n=>n.i),[])),F=t(()=>{const{t:n}=E(),{cinemaState:i,sendCinemaSignal:l,setCinemaState:N}=S(),{url:y,playing:s,time:c,lastSyncAction:u}=i,[d,h]=r.useState(""),[g,O]=r.useState(.8),[p,b]=r.useState(null),[j,f]=r.useState(!1),o=r.useRef(null);r.useRef(!1),r.useEffect(()=>{u==="change_url"?(f(!1),b(null)):u==="play"&&Math.abs(m()-c)>2&&o.current&&o.current.seekTo(c)},[y,s,c,u]);const m=t(()=>{try{return o.current?o.current.getCurrentTime():0}catch{return 0}},"getCurrentTimeSafe"),v=t(x=>{x.preventDefault(),d.trim()&&(l("change_url",{url:d}),h(""))},"handleLoadUrl"),C=t(()=>{s?l("pause"):l("play",{time:m()})},"handlePlayPause");return e.jsxs("div",{style:a.container,children:[e.jsxs("div",{style:a.playerWrapper,children:[p&&e.jsxs("div",{style:a.statusOverlay,children:[e.jsx(R,{size:40,color:"#f23f42"}),e.jsx("p",{className:"mt-10",children:p})]}),!j&&!p&&e.jsxs("div",{style:a.statusOverlay,children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{className:"mt-10",children:n("common.loading")})]}),e.jsx(r.Suspense,{fallback:e.jsx("div",{children:"Oynatıcı yükleniyor..."}),children:e.jsx(T,{ref:o,url:y,playing:s,volume:g,controls:!0,width:"100%",height:"100%",onReady:t(()=>f(!0),"onReady"),onError:t(()=>{b(n("ui.video_oynatilamadi")),f(!0)},"onError"),onPlay:t(()=>{s||l("play",{time:m()})},"onPlay"),onPause:t(()=>{s&&l("pause")},"onPause")})})]}),e.jsxs("div",{style:a.controls,children:[e.jsx("button",{"aria-label":"handle Play Pause",onClick:C,style:{...a.btn,backgroundColor:s?"#da373c":"#23a559",width:"40px",height:"40px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"},children:s?e.jsx(_,{}):e.jsx(w,{className:"ml-2"})}),e.jsxs("form",{onSubmit:v,style:a.urlForm,children:[e.jsx(I,{className:"icon-chat"}),e.jsx("input",{type:"text",value:d,onChange:t(x=>h(x.target.value),"onChange"),placeholder:"YouTube Link...",style:a.input,"aria-label":"Input Url"}),e.jsx("button",{"aria-label":"Submit",type:"submit",children:n("common.upload")})]})]}),e.jsx("style",{children:`

                .spinner {

                    border: 4px solid rgba(255, 255, 255, 0.3);

                    border-radius: 50%;

                    border-top: 4px solid #ffffff;

                    width: 30px; height: 30px;

                    animation: spin 1s linear infinite;

                }

                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

            `})]})},"CinemaPlayer"),a={container:{width:"100%",height:"100%",display:"flex",flexDirection:"column",backgroundColor:"black"},playerWrapper:{flex:1,position:"relative",overflow:"hidden"},controls:{padding:"10px",display:"flex",gap:"10px",backgroundColor:"#0d0e10",alignItems:"center"},urlForm:{flex:1,display:"flex",gap:"8px",backgroundColor:"#1e2024",padding:"5px 10px",borderRadius:"4px",alignItems:"center"},input:{flex:1,background:"transparent",border:"none",color:"white",outline:"none",fontSize:"14px"},btn:{border:"none",color:"white",cursor:"pointer",borderRadius:"4px",fontWeight:"bold"},statusOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.7)",color:"white",zIndex:10}};F.propTypes={};export{F as default};

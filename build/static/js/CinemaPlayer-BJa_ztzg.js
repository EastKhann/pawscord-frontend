const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-BY23ATJo.js","./electron-B8pg0kW7.js","../css/electron-B9WL9Jhb.css"])))=>i.map(i=>d[i]);
var k=Object.defineProperty;var t=(a,o)=>k(a,"name",{value:o,configurable:!0});import{b as P,bp as R,r,j as e,ag as S,ai as _,y as w,ah as I,aj as E}from"./electron-B8pg0kW7.js";const T=r.lazy(()=>E(()=>import("./index-BY23ATJo.js"),__vite__mapDeps([0,1,2]),import.meta.url)),F=t(()=>{const{t:a}=P(),{cinemaState:o,sendCinemaSignal:l,setCinemaState:L}=R(),{url:y,playing:s,time:c,lastSyncAction:u}=o,[d,h]=r.useState(""),[g,N]=r.useState(.8),[p,b]=r.useState(null),[j,m]=r.useState(!1),i=r.useRef(null);r.useRef(!1),r.useEffect(()=>{u==="change_url"?(m(!1),b(null)):u==="play"&&Math.abs(f()-c)>2&&i.current&&i.current.seekTo(c)},[y,s,c,u]);const f=t(()=>{try{return i.current?i.current.getCurrentTime():0}catch{return 0}},"getCurrentTimeSafe"),v=t(x=>{x.preventDefault(),d.trim()&&(l("change_url",{url:d}),h(""))},"handleLoadUrl"),C=t(()=>{s?l("pause"):l("play",{time:f()})},"handlePlayPause");return e.jsxs("div",{style:n.container,children:[e.jsxs("div",{style:n.playerWrapper,children:[p&&e.jsxs("div",{style:n.statusOverlay,children:[e.jsx(S,{size:40,color:"#f23f42"}),e.jsx("p",{className:"mt-10",children:p})]}),!j&&!p&&e.jsxs("div",{style:n.statusOverlay,children:[e.jsx("div",{className:"spinner"}),e.jsx("p",{className:"mt-10",children:a("common.loading")})]}),e.jsx(r.Suspense,{fallback:e.jsx("div",{children:"Oynatici y�kleniyor..."}),children:e.jsx(T,{ref:i,url:y,playing:s,volume:g,controls:!0,width:"100%",height:"100%",onReady:t(()=>m(!0),"onReady"),onError:t(()=>{b(a("ui.video_oynatilamadi")),m(!0)},"onError"),onPlay:t(()=>{s||l("play",{time:f()})},"onPlay"),onPause:t(()=>{s&&l("pause")},"onPause")})})]}),e.jsxs("div",{style:n.controls,children:[e.jsx("button",{"aria-label":a("cinema.playPause","Play/Pause"),onClick:C,style:{...n.btn,backgroundColor:s?"#da373c":"#23a559",width:"40px",height:"40px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"},children:s?e.jsx(_,{}):e.jsx(w,{className:"ml-2"})}),e.jsxs("form",{onSubmit:v,style:n.urlForm,children:[e.jsx(I,{className:"icon-chat"}),e.jsx("input",{type:"text",value:d,onChange:t(x=>h(x.target.value),"onChange"),placeholder:a("cinema.urlPlaceholder","YouTube Link..."),style:n.input,"aria-label":a("cinema.urlInput","Video URL")}),e.jsx("button",{"aria-label":a("common.submit"),type:"submit",children:a("common.upload")})]})]}),e.jsx("style",{children:`

                .spinner {

                    border: 4px solid rgba(255, 255, 255, 0.3);

                    border-radius: 50%;

                    border-top: 4px solid #ffffff;

                    width: 30px; height: 30px;

                    animation: spin 1s linear infinite;

                }

                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

            `})]})},"CinemaPlayer"),n={container:{width:"100%",height:"100%",display:"flex",flexDirection:"column",backgroundColor:"black"},playerWrapper:{flex:1,position:"relative",overflow:"hidden"},controls:{padding:"10px",display:"flex",gap:"10px",backgroundColor:"#0d0e10",alignItems:"center"},urlForm:{flex:1,display:"flex",gap:"8px",backgroundColor:"#1e2024",padding:"5px 10px",borderRadius:"4px",alignItems:"center"},input:{flex:1,background:"transparent",border:"none",color:"white",outline:"none",fontSize:"14px"},btn:{border:"none",color:"white",cursor:"pointer",borderRadius:"4px",fontWeight:"bold"},statusOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backgroundColor:"rgba(0,0,0,0.7)",color:"white",zIndex:10}};F.propTypes={};export{F as default};

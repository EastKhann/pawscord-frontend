import{b as e}from"./react-core-9vc7GIjk.js";import{m as s,a as c,B as d}from"./icons-vendor-NoxEirJf.js";import"./editor-vendor-DiU449Dh.js";const m=({isLoading:l,summaryText:a,onClose:n})=>e.createElement("div",{style:t.overlay},e.createElement("div",{style:t.modal},e.createElement("div",{style:t.header},e.createElement("div",{style:t.headerTitle},e.createElement(s,{style:{color:"#eb459e"}}),e.createElement("span",null,"AI Sohbet Özeti")),e.createElement("button",{onClick:n,style:t.closeBtn},e.createElement(c,null))),e.createElement("div",{style:t.content},l?e.createElement("div",{style:t.loadingState},e.createElement("div",{className:"ai-pulse"},e.createElement(d,{size:40,color:"#5865f2"})),e.createElement("p",{style:{marginTop:15,color:"#dbdee1"}},"Sohbet okunuyor ve analiz ediliyor..."),e.createElement("span",{style:{fontSize:"0.8em",color:"#949ba4"}},"(Bu işlem sohbet yoğunluğuna göre 5-10 sn sürebilir)")):e.createElement("div",{style:t.summaryText},a?a.split(`
`).map((r,i)=>e.createElement("p",{key:i,style:{margin:"0 0 8px 0"}},r)):e.createElement("p",{style:{color:"#da373c"}},"Özet çıkarılamadı veya hata oluştu."))))),t={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,backdropFilter:"blur(2px)"},modal:{width:"90%",maxWidth:"500px",backgroundColor:"#2b2d31",borderRadius:"12px",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid #1e1f22",overflow:"hidden",animation:"popIn 0.3s ease-out"},header:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 20px",backgroundColor:"#1e1f22",borderBottom:"1px solid #111214"},headerTitle:{display:"flex",alignItems:"center",gap:"10px",fontSize:"1.1em",fontWeight:"bold",color:"#fff"},closeBtn:{background:"none",border:"none",color:"#b9bbbe",cursor:"pointer",fontSize:"1.2em",padding:"5px",display:"flex",alignItems:"center"},content:{padding:"25px",minHeight:"150px",maxHeight:"60vh",overflowY:"auto",color:"#dcddde",lineHeight:"1.5",fontSize:"0.95em"},loadingState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",height:"100%",padding:"20px 0"},summaryText:{whiteSpace:"pre-wrap"}},o=document.createElement("style");o.innerText=`
    @keyframes popIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
    .ai-pulse {
        animation: aiPulse 1.5s infinite ease-in-out;
    }
    @keyframes aiPulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }
`;document.head.appendChild(o);const u=e.memo(m);export{u as default};

var d=Object.defineProperty;var i=(a,o)=>d(a,"name",{value:o,configurable:!0});import{a as c,j as e}from"./react-core-Djgtqrmb.js";import{r as p,a as m,B as x}from"./icons-vendor-BMXAt4pj.js";const y=i(({isLoading:a,summaryText:o,onClose:l})=>e.jsx("div",{style:t.overlay,children:e.jsxs("div",{style:t.modal,children:[e.jsxs("div",{style:t.header,children:[e.jsxs("div",{style:t.headerTitle,children:[e.jsx(p,{style:{color:"#eb459e"}}),e.jsx("span",{children:"AI Sohbet Özeti"})]}),e.jsx("button",{onClick:l,style:t.closeBtn,children:e.jsx(m,{})})]}),e.jsx("div",{style:t.content,children:a?e.jsxs("div",{style:t.loadingState,children:[e.jsx("div",{className:"ai-pulse",children:e.jsx(x,{size:40,color:"#5865f2"})}),e.jsx("p",{style:{marginTop:15,color:"#dbdee1"},children:"Sohbet okunuyor ve analiz ediliyor..."}),e.jsx("span",{style:{fontSize:"0.8em",color:"#949ba4"},children:"(Bu işlem sohbet yoğunluğuna göre 5-10 sn sürebilir)"})]}):e.jsx("div",{style:t.summaryText,children:o?o.split(`
`).map((s,r)=>e.jsx("p",{style:{margin:"0 0 8px 0"},children:s},r)):e.jsx("p",{style:{color:"#da373c"},children:"Özet çıkarılamadı veya hata oluştu."})})})]})}),"SummaryModal"),t={overlay:{position:"fixed",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(0, 0, 0, 0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9999,backdropFilter:"blur(2px)"},modal:{width:"90%",maxWidth:"500px",backgroundColor:"#2b2d31",borderRadius:"12px",boxShadow:"0 8px 30px rgba(0,0,0,0.5)",border:"1px solid #1e1f22",overflow:"hidden",animation:"popIn 0.3s ease-out"},header:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"15px 20px",backgroundColor:"#1e1f22",borderBottom:"1px solid #111214"},headerTitle:{display:"flex",alignItems:"center",gap:"10px",fontSize:"1.1em",fontWeight:"bold",color:"#fff"},closeBtn:{background:"none",border:"none",color:"#b9bbbe",cursor:"pointer",fontSize:"1.2em",padding:"5px",display:"flex",alignItems:"center"},content:{padding:"25px",minHeight:"150px",maxHeight:"60vh",overflowY:"auto",color:"#dcddde",lineHeight:"1.5",fontSize:"0.95em"},loadingState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",height:"100%",padding:"20px 0"},summaryText:{whiteSpace:"pre-wrap"}},n=document.createElement("style");n.innerText=`
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
`;document.head.appendChild(n);const b=c.memo(y);export{b as default};

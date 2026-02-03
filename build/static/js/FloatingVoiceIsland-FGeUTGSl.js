import{R,r,j as e}from"./react-vendor-D4QjtNWS.js";import{b3 as H,b4 as P}from"./vendor-Brv1On52.js";import"./state-vendor-T8XA44Ud.js";import"./perf-vendor-CmoV45_-.js";const W=({islandState:f,onDrag:w,onResize:p,children:y,isMobile:a,headerActions:g})=>{const x=r.useRef(null),[l,i]=r.useState(!1),[o,v]=r.useState(!1),[z,s]=r.useState(!1),[S,b]=r.useState("");r.useEffect(()=>{b("island-enter");const n=setTimeout(()=>b(""),600);return()=>clearTimeout(n)},[]);const d=f||{x:a?10:window.innerWidth/2-175,y:a?60:window.innerHeight*.15,width:a?window.innerWidth-20:350,height:a?200:280},k=a?[200,150]:[320,220],j=[window.innerWidth-20,window.innerHeight-80],m=()=>{v(!o)},h=a?180:220,u=50,C=o?h:d.width,I=o?u:d.height;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                @keyframes island-enter {
                    from {
                        opacity: 0;
                        transform: scale(0.85) translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }

                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 5px 40px rgba(88, 101, 242, 0.3), 0 0 20px rgba(88, 101, 242, 0.1); }
                    50% { box-shadow: 0 5px 50px rgba(88, 101, 242, 0.5), 0 0 30px rgba(88, 101, 242, 0.2); }
                }

                @keyframes slide-up {
                    from { transform: translateY(10px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                .island-enter {
                    animation: island-enter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .island-container {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .island-container:hover {
                    box-shadow: 0 8px 50px rgba(88, 101, 242, 0.4), 0 0 30px rgba(88, 101, 242, 0.15) !important;
                }

                .drag-handle-modern {
                    transition: all 0.25s ease;
                }

                .drag-handle-modern:hover {
                    background: linear-gradient(135deg, rgba(88, 101, 242, 0.25), rgba(114, 137, 218, 0.25)) !important;
                }

                .voice-btn-modern {
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .voice-btn-modern:hover {
                    transform: translateY(-2px) scale(1.05);
                    box-shadow: 0 5px 15px rgba(88, 101, 242, 0.4);
                }

                .voice-btn-modern:active {
                    transform: translateY(0) scale(0.98);
                }

                /* Mobile touch optimization */
                @media (max-width: 768px) {
                    .voice-btn-modern {
                        min-width: 44px;
                        min-height: 44px;
                    }
                }

                /* Scrollbar styling */
                .content-area-modern::-webkit-scrollbar {
                    width: 6px;
                }

                .content-area-modern::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 3px;
                }

                .content-area-modern::-webkit-scrollbar-thumb {
                    background: rgba(88, 101, 242, 0.5);
                    border-radius: 3px;
                }

                .content-area-modern::-webkit-scrollbar-thumb:hover {
                    background: rgba(88, 101, 242, 0.7);
                }
            `}),e.jsx(H,{nodeRef:x,handle:".drag-handle-modern",position:{x:d.x||0,y:d.y||0},onStart:()=>i(!0),onStop:(n,c)=>{i(!1),w(c)},disabled:!1,bounds:"parent",children:e.jsx("div",{ref:x,style:{position:"absolute",zIndex:1e3},className:S,children:o?e.jsx("div",{style:{...t.minimizedContainer,width:h,height:u},onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),children:e.jsxs("div",{className:"drag-handle-modern",style:t.minimizedDragHandle,children:[e.jsx("span",{style:t.minimizedIcon,children:"🎤"}),e.jsx("span",{style:t.minimizedText,children:"Voice Chat"}),e.jsx("button",{onClick:m,onMouseDown:n=>n.stopPropagation(),onTouchStart:n=>n.stopPropagation(),style:t.expandButton,className:"voice-btn-modern",children:"⬆️"})]})}):e.jsxs(P.ResizableBox,{width:C,height:I,minConstraints:k,maxConstraints:j,onResizeStart:n=>{n.stopPropagation(),i(!0)},onResizeStop:(n,c)=>{n.stopPropagation(),i(!1),p&&p(c.size)},style:{...t.islandContainer,animation:z?"pulse-glow 2s infinite":"none"},className:"island-container",draggableOpts:{enableUserSelectHack:!1},children:[e.jsx("div",{className:"drag-handle-modern",style:t.dragHandle,onMouseEnter:()=>s(!0),onMouseLeave:()=>s(!1),children:e.jsxs("div",{style:t.headerContent,children:[e.jsxs("div",{style:t.headerLeft,children:[e.jsx("span",{style:t.voiceIcon,children:"🎤"}),e.jsx("h3",{style:t.panelHeader,children:"VOICE CHAT"})]}),e.jsxs("div",{style:t.headerRight,children:[e.jsx("div",{onMouseDown:n=>n.stopPropagation(),onTouchStart:n=>n.stopPropagation(),onClick:n=>n.stopPropagation(),children:g&&g}),e.jsx("button",{onClick:m,onMouseDown:n=>n.stopPropagation(),onTouchStart:n=>n.stopPropagation(),style:t.minimizeButton,className:"voice-btn-modern",title:"Minimize",children:"➖"})]})]})}),e.jsx("div",{className:"content-area-modern",style:{...t.contentArea,pointerEvents:l?"none":"auto",opacity:l?.92:1},children:y}),l&&e.jsx("div",{style:t.interactionShield})]})})})]})},t={islandContainer:{background:"linear-gradient(135deg, rgba(30, 31, 34, 0.95), rgba(35, 36, 40, 0.95))",backdropFilter:"blur(20px) saturate(180%)",WebkitBackdropFilter:"blur(20px) saturate(180%)",borderRadius:"16px",boxShadow:"0 8px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(88, 101, 242, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",display:"flex",flexDirection:"column",overflow:"hidden",border:"1px solid rgba(88, 101, 242, 0.3)"},minimizedContainer:{background:"linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))",backdropFilter:"blur(15px)",borderRadius:"25px",boxShadow:"0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(88, 101, 242, 0.25)",border:"1px solid rgba(88, 101, 242, 0.4)",overflow:"hidden",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"},minimizedDragHandle:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"100%",cursor:"move",userSelect:"none"},minimizedIcon:{fontSize:"20px",marginRight:"8px"},minimizedText:{flex:1,color:"rgba(255, 255, 255, 0.9)",fontSize:"14px",fontWeight:"600",letterSpacing:"0.5px"},expandButton:{background:"rgba(88, 101, 242, 0.2)",border:"1px solid rgba(88, 101, 242, 0.4)",borderRadius:"8px",padding:"6px 10px",cursor:"pointer",fontSize:"14px",transition:"all 0.2s ease",outline:"none"},dragHandle:{padding:"14px 16px",cursor:"move",background:"linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(114, 137, 218, 0.15))",borderBottom:"1px solid rgba(88, 101, 242, 0.3)",userSelect:"none",backdropFilter:"blur(10px)"},headerContent:{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"},headerLeft:{display:"flex",alignItems:"center",gap:"10px"},voiceIcon:{fontSize:"20px",filter:"drop-shadow(0 0 8px rgba(88, 101, 242, 0.6))"},panelHeader:{margin:0,color:"rgba(255, 255, 255, 0.95)",fontSize:"15px",fontWeight:"700",letterSpacing:"1.5px",textShadow:"0 0 10px rgba(88, 101, 242, 0.5)"},headerRight:{display:"flex",gap:"8px"},minimizeButton:{background:"rgba(88, 101, 242, 0.2)",border:"1px solid rgba(88, 101, 242, 0.4)",borderRadius:"6px",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"14px",outline:"none",color:"rgba(255, 255, 255, 0.9)"},contentArea:{flex:1,padding:"0",overflowY:"auto",overflowX:"hidden",display:"flex",flexWrap:"wrap",gap:"0",alignContent:"flex-start",justifyContent:"center",background:"linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3))",position:"relative"},interactionShield:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:9999,cursor:"grabbing",backgroundColor:"transparent"}},F=R.memo(W);export{F as default};

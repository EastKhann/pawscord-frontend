// frontend/src/FloatingVoiceIsland.js

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const FloatingVoiceIsland = ({ islandState, onDrag, onResize, children, isMobile, headerActions }) => {
    const nodeRef = useRef(null);

    // Enhanced state management
    const [isInteracting, setIsInteracting] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    // Entrance animation
    useEffect(() => {
        setAnimationClass('island-enter');
        const timer = setTimeout(() => setAnimationClass(''), 600);
        return () => clearTimeout(timer);
    }, []);

    // Safe defaults with responsive sizing
    const safeIslandState = islandState || {
        x: isMobile ? 10 : (window.innerWidth / 2) - 175,
        y: isMobile ? 60 : window.innerHeight * 0.15,
        width: isMobile ? window.innerWidth - 20 : 350,
        height: isMobile ? 200 : 280,
    };

    const minConstraints = isMobile ? [200, 150] : [320, 220];
    const maxConstraints = [window.innerWidth - 20, window.innerHeight - 80];

    // Toggle minimize state
    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    // Minimized dimensions
    const minimizedWidth = isMobile ? 180 : 220;
    const minimizedHeight = 50;

    const currentWidth = isMinimized ? minimizedWidth : safeIslandState.width;
    const currentHeight = isMinimized ? minimizedHeight : safeIslandState.height;

    const handleStopPropagation = useCallback((e) => e.stopPropagation(), []);
    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);
    const handleDragStart = useCallback(() => setIsInteracting(true), []);
    const handleDragStop = useCallback((e, data) => { setIsInteracting(false); onDrag(data); }, [onDrag]);
    const handleResizeStart = useCallback((e) => { e.stopPropagation(); setIsInteracting(true); }, []);
    const handleResizeStop = useCallback((e, data) => { e.stopPropagation(); setIsInteracting(false); if (onResize) onResize(data.size); }, [onResize]);

    return (
        <>
            {/* 🌟 GLOBAL STYLES - INJECT ANIMATIONS */}
            <style>{`
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
            `}</style>

            <Draggable
                nodeRef={nodeRef}
                handle=".drag-handle-modern"
                position={{ x: safeIslandState.x || 0, y: safeIslandState.y || 0 }}
                onStart={handleDragStart}
                onStop={handleDragStop}
                disabled={false}
                bounds="parent"
            >
                <div
                    ref={nodeRef}
                    style={{
                        position: 'absolute',
                        zIndex: 1000,
                    }}
                    className={animationClass}
                >
                    {isMinimized ? (
                        // 🎯 MINIMIZED STATE - Compact Bar
                        <div
                            style={{
                                ...styles.minimizedContainer,
                                width: minimizedWidth,
                                height: minimizedHeight,
                            }}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="drag-handle-modern" style={styles.minimizedDragHandle}>
                                <span style={styles.minimizedIcon}>🎤</span>
                                <span style={styles.minimizedText}>Voice Chat</span>
                                <button
                                    onClick={handleMinimize}
                                    onMouseDown={handleStopPropagation}
                                    onTouchStart={handleStopPropagation}
                                    style={styles.expandButton}
                                    className="voice-btn-modern"
                                >
                                    ⬆️
                                </button>
                            </div>
                        </div>
                    ) : (
                        // 🎯 EXPANDED STATE - Full Panel
                        <ResizableBox
                            width={currentWidth}
                            height={currentHeight}
                            minConstraints={minConstraints}
                            maxConstraints={maxConstraints}
                            onResizeStart={handleResizeStart}
                            onResizeStop={handleResizeStop}
                            style={{
                                ...styles.islandContainer,
                                animation: isHovered ? 'pulse-glow 2s infinite' : 'none',
                            }}
                            className="island-container"
                            draggableOpts={{ enableUserSelectHack: false }}
                        >
                            {/* 🎨 MODERN HEADER */}
                            <div
                                className="drag-handle-modern"
                                style={styles.dragHandle}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div style={styles.headerContent}>
                                    <div style={styles.headerLeft}>
                                        <span style={styles.voiceIcon}>🎤</span>
                                        <h3 style={styles.panelHeader}>VOICE CHAT</h3>
                                    </div>
                                    <div style={styles.headerRight}>
                                        {/* 🛠️ Custom Header Actions */}
                                        <div
                                            onMouseDown={handleStopPropagation}
                                            onTouchStart={handleStopPropagation}
                                            onClick={handleStopPropagation}
                                        >
                                            {headerActions && headerActions}
                                        </div>

                                        <button
                                            onClick={handleMinimize}
                                            onMouseDown={handleStopPropagation}
                                            onTouchStart={handleStopPropagation}
                                            style={styles.minimizeButton}
                                            className="voice-btn-modern"
                                            title="Minimize"
                                        >
                                            ➖
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* 🌊 GLASSMORPHISM CONTENT AREA */}
                            <div
                                className="content-area-modern"
                                style={{
                                    ...styles.contentArea,
                                    pointerEvents: isInteracting ? 'none' : 'auto',
                                    opacity: isInteracting ? 0.92 : 1,
                                }}>
                                {children}
                            </div>

                            {/* 🛡️ INTERACTION SHIELD */}
                            {isInteracting && (
                                <div style={styles.interactionShield} />
                            )}
                        </ResizableBox>
                    )}
                </div>
            </Draggable>
        </>
    );
};

const styles = {
    // 🎨 MAIN CONTAINER - Glassmorphism Design
    islandContainer: {
        background: 'linear-gradient(135deg, rgba(30, 31, 34, 0.95), rgba(35, 36, 40, 0.95))',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRadius: '16px',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.7), 0 0 20px rgba(88, 101, 242, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid rgba(88, 101, 242, 0.3)',
    },

    // 🎯 MINIMIZED CONTAINER
    minimizedContainer: {
        background: 'linear-gradient(135deg, rgba(30, 31, 34, 0.98), rgba(35, 36, 40, 0.98))',
        backdropFilter: 'blur(15px)',
        borderRadius: '25px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(88, 101, 242, 0.25)',
        border: '1px solid rgba(88, 101, 242, 0.4)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },

    minimizedDragHandle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        height: '100%',
        cursor: 'move',
        userSelect: 'none',
    },

    minimizedIcon: {
        fontSize: '20px',
        marginRight: '8px',
    },

    minimizedText: {
        flex: 1,
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '14px',
        fontWeight: '600',
        letterSpacing: '0.5px',
    },

    expandButton: {
        background: 'rgba(88, 101, 242, 0.2)',
        border: '1px solid rgba(88, 101, 242, 0.4)',
        borderRadius: '8px',
        padding: '6px 10px',
        cursor: 'pointer',
        fontSize: '14px',
        transition: 'all 0.2s ease',
        outline: 'none',
    },

    // 🎨 MODERN DRAG HANDLE
    dragHandle: {
        padding: '14px 16px',
        cursor: 'move',
        background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(114, 137, 218, 0.15))',
        borderBottom: '1px solid rgba(88, 101, 242, 0.3)',
        userSelect: 'none',
        backdropFilter: 'blur(10px)',
    },

    headerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },

    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },

    voiceIcon: {
        fontSize: '20px',
        filter: 'drop-shadow(0 0 8px rgba(88, 101, 242, 0.6))',
    },

    panelHeader: {
        margin: 0,
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: '15px',
        fontWeight: '700',
        letterSpacing: '1.5px',
        textShadow: '0 0 10px rgba(88, 101, 242, 0.5)',
    },

    headerRight: {
        display: 'flex',
        gap: '8px',
    },

    minimizeButton: {
        background: 'rgba(88, 101, 242, 0.2)',
        border: '1px solid rgba(88, 101, 242, 0.4)',
        borderRadius: '6px',
        width: '30px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '14px',
        outline: 'none',
        color: 'rgba(255, 255, 255, 0.9)',
    },

    // 🌊 GLASSMORPHISM CONTENT
    contentArea: {
        flex: 1,
        padding: '0', // 🔥 REMOVED PADDING for full-width immersive feel
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0', // Handled by inner grid
        alignContent: 'flex-start',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3))',
        position: 'relative',
    },

    // 🛡️ INTERACTION SHIELD
    interactionShield: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        cursor: 'grabbing',
        backgroundColor: 'transparent',
    }
};

export default React.memo(FloatingVoiceIsland);


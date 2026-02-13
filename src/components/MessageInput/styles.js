// frontend/src/components/MessageInput/styles.js
// Extracted from MessageInput.js — inline styles + CSS keyframe injection

const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#383a40',
        borderRadius: '8px',
        padding: isMobile ? '6px' : '8px',
        margin: isMobile ? '8px' : '16px',
    },
    replyPreview: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        borderLeft: '3px solid #5865f2',
        borderRadius: '4px',
        marginBottom: '8px',
        fontSize: '0.9em',
    },
    replyContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    editPreview: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        backgroundColor: 'rgba(250, 166, 26, 0.1)',
        borderLeft: '3px solid #faa61a',
        borderRadius: '4px',
        marginBottom: '8px',
        fontSize: '0.9em',
    },
    recordingIndicator: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: 'rgba(237, 66, 69, 0.1)',
        borderRadius: '4px',
        marginBottom: '8px',
    },
    recordingPulse: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#ed4245',
    },
    stopButton: {
        padding: '6px 12px',
        backgroundColor: '#ed4245',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: 'auto',
    },
    cancelButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '16px',
        padding: '4px 8px',
        transition: 'color 0.2s',
    },
    inputWrapper: {
        display: 'flex',
        alignItems: 'flex-end',
        gap: '4px',
    },
    leftActions: {
        display: 'flex',
        gap: '2px',
        marginBottom: '4px',
        flexShrink: 0,
    },
    rightActions: {
        display: 'flex',
        gap: '2px',
        marginBottom: '4px',
        flexShrink: 0,
        flexWrap: 'wrap',
    },
    actionButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: isMobile ? '16px' : '20px',
        padding: isMobile ? '6px' : '8px',
        borderRadius: '4px',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: isMobile ? '32px' : '36px',
        minHeight: isMobile ? '32px' : '36px',
    },
    sendButton: {
        background: '#5865f2',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '10px 12px',
        borderRadius: '4px',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textarea: {
        flex: 1,
        background: '#40444b',
        border: 'none',
        outline: 'none',
        color: '#dcddde',
        fontSize: isMobile ? '14px' : '15px',
        padding: isMobile ? '8px 10px' : '11px',
        borderRadius: '8px',
        resize: 'none',
        fontFamily: 'inherit',
        lineHeight: '1.375',
        maxHeight: '200px',
        overflowY: 'auto',
        minWidth: 0,
    },
    pickerWrapper: {
        position: 'absolute',
        bottom: '100%',
        right: 0,
        marginBottom: '8px',
        zIndex: 1000,
        boxShadow: '0 8px 16px rgba(0,0,0,0.24)',
        borderRadius: '8px',
    },
    mobileMenu: {
        position: 'absolute',
        bottom: '110%',
        left: 0,
        backgroundColor: '#2b2d31',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '8px',
        padding: '8px',
        minWidth: '200px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    mobileMenuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        backgroundColor: 'transparent',
        border: 'none',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        textAlign: 'left',
        width: '100%',
        whiteSpace: 'nowrap',
    },
    draftSaved: {
        position: 'absolute',
        top: '-30px',
        right: '10px',
        fontSize: '0.75em',
        color: '#43b581',
        backgroundColor: 'rgba(67, 181, 129, 0.1)',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '1px solid #43b581',
        animation: 'fadeIn 0.3s ease-in-out',
    },
    // 🎤 Voice Recording Styles
    micButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: isMobile ? '18px' : '20px',
        padding: isMobile ? '6px' : '8px',
        borderRadius: '50%',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        minWidth: isMobile ? '36px' : '40px',
        minHeight: isMobile ? '36px' : '40px',
    },
    recordingContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        flex: 1,
        backgroundColor: 'rgba(237, 66, 69, 0.06)',
        borderRadius: '12px',
        padding: '10px 16px',
        border: '1px solid rgba(237, 66, 69, 0.25)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
    },
    waveformBg: {
        position: 'absolute',
        left: '80px',
        right: '120px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3px',
        height: '24px',
        pointerEvents: 'none',
        zIndex: 0,
    },
    recLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: 1,
    },
    recordingDot: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#ed4245',
    },
    recordingTime: {
        fontSize: '15px',
        color: '#ed4245',
        fontWeight: '700',
        fontVariantNumeric: 'tabular-nums',
        minWidth: '44px',
        letterSpacing: '0.5px',
    },
    slideToLock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        marginLeft: 'auto',
        zIndex: 1,
        cursor: 'default',
    },
    slideMicCircle: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s ease',
        fontSize: '14px',
    },
    slideTrack: {
        width: '4px',
        height: '22px',
        borderRadius: '2px',
        backgroundColor: 'rgba(114, 118, 125, 0.25)',
        overflow: 'hidden',
        position: 'relative',
    },
    slideTrackFill: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        borderRadius: '2px',
        transition: 'height 0.05s linear',
    },
    slideLabel: {
        fontSize: '10px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        transition: 'color 0.15s ease',
        whiteSpace: 'nowrap',
    },
    lockedActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginLeft: 'auto',
        zIndex: 1,
    },
    lockedBadge: {
        fontSize: '12px',
        color: '#43b581',
        backgroundColor: 'rgba(67, 181, 129, 0.15)',
        padding: '4px 10px',
        borderRadius: '12px',
        fontWeight: '700',
        border: '1px solid rgba(67,181,129,0.3)',
    },
    cancelRecButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '7px 14px',
        backgroundColor: 'rgba(237, 66, 69, 0.12)',
        color: '#ed4245',
        border: '1px solid rgba(237, 66, 69, 0.3)',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.15s',
    },
    sendVoiceButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '7px 14px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '600',
        transition: 'all 0.15s',
        boxShadow: '0 2px 8px rgba(88,101,242,0.3)',
    },
    // 🆕 Pending Files Styles
    pendingFilesContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
        padding: '8px',
        marginBottom: '8px',
    },
    pendingFilesHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        fontSize: '12px',
        color: '#b9bbbe',
    },
    clearAllButton: {
        background: 'none',
        border: 'none',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '11px',
        padding: '4px 8px',
        borderRadius: '4px',
        transition: 'background 0.2s',
    },
    pendingFilesList: {
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        maxHeight: '200px',
        overflowY: 'auto',
    },
    pendingFileItem: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#40444b',
        borderRadius: '8px',
        padding: '8px',
        width: '100px',
        gap: '4px',
    },
    filePreviewImage: {
        width: '80px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    filePreviewVideo: {
        width: '80px',
        height: '60px',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    filePreviewIcon: {
        width: '80px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2b2d31',
        borderRadius: '4px',
        color: '#b9bbbe',
    },
    fileInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
    },
    fileName: {
        fontSize: '10px',
        color: '#dcddde',
        textAlign: 'center',
        wordBreak: 'break-all',
    },
    fileSize: {
        fontSize: '9px',
        color: '#72767d',
    },
    removeFileButton: {
        position: 'absolute',
        top: '-4px',
        right: '-4px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#ed4245',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        transition: 'transform 0.2s',
    },
    // 🆕 Drag & Drop Overlay Styles
    dragOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(88, 101, 242, 0.9)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        pointerEvents: 'none',
    },
    dragContent: {
        textAlign: 'center',
        color: 'white',
        padding: '20px',
    },
};

// CSS keyframe animations — injected once into <head>
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* 🎤 Recording container glow */
    .rec-container-glow {
        animation: recGlow 2s ease-in-out infinite;
    }
    @keyframes recGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(237, 66, 69, 0); border-color: rgba(237, 66, 69, 0.25); }
        50% { box-shadow: 0 0 16px 2px rgba(237, 66, 69, 0.12); border-color: rgba(237, 66, 69, 0.45); }
    }

    /* 🎤 Recording pulse dot */
    .rec-pulse {
        animation: recPulse 1s ease-in-out infinite;
    }
    @keyframes recPulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(237, 66, 69, 0.6); }
        50% { transform: scale(1.2); box-shadow: 0 0 0 8px rgba(237, 66, 69, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(237, 66, 69, 0); }
    }
    
    /* 🎤 Waveform bars */
    .rec-waveform {
        display: flex !important;
    }
    .rec-wave-bar {
        width: 3px;
        border-radius: 2px;
        background: linear-gradient(180deg, #ed4245 0%, #f04747 50%, #ed4245 100%);
        animation: waveBar 0.8s ease-in-out infinite alternate;
    }
    @keyframes waveBar {
        0% { height: 4px; opacity: 0.3; }
        50% { height: 18px; opacity: 0.7; }
        100% { height: 6px; opacity: 0.4; }
    }
    
    /* 🎤 Mic button hover/active states */
    .mic-button:hover {
        color: #ed4245 !important;
        background: rgba(237, 66, 69, 0.1) !important;
    }
    .mic-button:active {
        transform: scale(1.15);
        color: #ed4245 !important;
        background: rgba(237, 66, 69, 0.2) !important;
    }
    
    textarea::-webkit-scrollbar {
        width: 8px;
    }
    
    textarea::-webkit-scrollbar-thumb {
        background: #202225;
        border-radius: 4px;
    }
    
    textarea::-webkit-scrollbar-thumb:hover {
        background: #18191c;
    }
    
    .action-button:hover {
        color: #dcddde;
        background-color: rgba(79, 84, 92, 0.4);
    }
`;
document.head.appendChild(styleSheet);

export default styles;

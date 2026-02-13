// Message/styles.js
// Styles and CSS injection extracted from Message.js

const styles = {
    chatMessage: {
        display: 'flex',
        padding: '8px 20px',
        marginBottom: '2px',
        position: 'relative',
        transition: 'background-color 0.1s ease',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: '0'
    },

    avatarContainer: {
        marginTop: '4px',
        marginRight: '16px',
        flexShrink: 0
    },
    userAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    messageHeader: {
        display: 'flex',
        alignItems: 'baseline',
        marginBottom: '4px',
        gap: '8px'
    },
    username: {
        fontWeight: '600',
        cursor: 'pointer',
        fontSize: '1rem',
        lineHeight: '1.375rem',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    timestamp: {
        fontSize: '0.75rem',
        color: '#949ba4',
        fontWeight: '400',
        lineHeight: '1.375rem',
        marginLeft: '4px',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    messageContent: {
        color: '#dcddde',
        fontSize: '1rem',
        lineHeight: '1.375rem',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontWeight: '400',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    contentWrapper: { flex: 1, minWidth: 0, maxWidth: '100%' },

    messageActions: {
        position: 'absolute',
        top: '-10px',
        right: '10px',
        backgroundColor: '#313338',
        borderRadius: '8px',
        padding: '4px',
        display: 'flex',
        gap: '4px',
        border: '1px solid rgba(255,255,255,0.08)',
        zIndex: 50,
        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
    },
    actionButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '1.2em',
        padding: '6px',
        display: 'flex',
        borderRadius: '4px',
        transition: 'all 0.1s'
    },

    inlineCode: {
        backgroundColor: '#2b2d31',
        padding: '2px 4px',
        borderRadius: '3px',
        fontFamily: "'Consolas', monospace",
        fontSize: '0.85em',
        border: '1px solid rgba(255,255,255,0.05)'
    },

    messageImage: {
        maxWidth: 'min(300px, 70%)',
        maxHeight: '250px',
        width: 'auto',
        height: 'auto',
        display: 'block',
        objectFit: 'cover',
        borderRadius: '8px',
        marginTop: '8px',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    messageVideo: {
        maxWidth: 'min(400px, 80%)',
        maxHeight: '300px',
        width: 'auto',
        height: 'auto',
        borderRadius: '8px',
        marginTop: '8px',
        backgroundColor: 'black'
    },

    fileDownload: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#2b2d31',
        borderRadius: '6px',
        marginTop: '6px',
        textDecoration: 'none',
        color: '#00a8fc',
        border: '1px solid rgba(255,255,255,0.05)',
        width: 'fit-content'
    },

    fileAttachment: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: '#2b2d31',
        borderRadius: 8,
        marginTop: 8,
        border: '1px solid rgba(255,255,255,0.06)',
        maxWidth: 490,
        transition: 'all 0.2s ease',
        cursor: 'default'
    },
    fileIcon: {
        fontSize: 28,
        marginRight: 12,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
    },
    fileInfo: {
        flex: 1,
        minWidth: 0,
        marginRight: 12
    },
    fileName: {
        color: '#00a8fc',
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 2,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    fileDetails: {
        color: '#72767d',
        fontSize: 12,
        fontFamily: "'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    },
    downloadButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 14px',
        backgroundColor: 'transparent',
        color: '#b5bac1',
        borderRadius: 4,
        textDecoration: 'none',
        fontSize: 20,
        transition: 'all 0.2s ease',
        border: 'none',
        cursor: 'pointer',
        flexShrink: 0
    },

    reactionsRow: { display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' },
    reactionTag: {
        backgroundColor: '#2b2d31',
        padding: '4px 8px',
        borderRadius: '8px',
        fontSize: '0.85em',
        cursor: 'pointer',
        color: '#b9bbbe',
        border: '1px solid transparent',
        display: 'flex', alignItems: 'center', gap: '4px'
    },
    activeReaction: {
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        borderColor: '#5865f2',
        color: '#dee0fc'
    },

    footerRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', minHeight: '20px' },
    readReceipt: { fontSize: '0.75em', color: '#b9bbbe', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' },

    replyContainer: { display: 'flex', alignItems: 'center', fontSize: '0.85em', color: '#b9bbbe', marginBottom: '4px', opacity: 0.8 },
    replyLine: { width: '30px', borderTop: '2px solid #4f545c', borderLeft: '2px solid #4f545c', height: '10px', marginRight: '8px', borderTopLeftRadius: '6px', marginTop: '6px' },

    historyDropdown: { position: 'absolute', top: '100%', left: 0, width: '280px', backgroundColor: '#1e1f22', border: '1px solid #111214', borderRadius: '8px', padding: '12px', zIndex: 100, boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
    historyHeader: { margin: '0 0 10px 0', fontSize: '0.9em', color: '#fff', borderBottom: '1px solid #2f3136', paddingBottom: '8px' },
    historyItem: { marginBottom: '12px', fontSize: '0.85em', color: '#b9bbbe', paddingBottom: '8px', borderBottom: '1px solid #2b2d31' },

    langBadge: { textTransform: 'uppercase', fontSize: '0.7em', fontWeight: 'bold', padding: '2px 4px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)', marginLeft: '8px' },
    chartBtn: { marginTop: '5px', backgroundColor: 'rgba(240, 178, 50, 0.1)', border: '1px solid #f0b232', color: '#f0b232', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85em', display: 'inline-flex', alignItems: 'center', gap: '6px' },
    pollContainer: { marginTop: '10px', padding: '12px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.2)' },
    pollOption: { display: 'flex', justifyContent: 'space-between', width: '100%', padding: '10px', margin: '6px 0', border: 'none', borderRadius: '6px', color: 'white', cursor: 'pointer', textAlign: 'left', backgroundColor: 'rgba(255,255,255,0.05)', transition: 'background 0.2s' },

    snippetContainer: {
        marginTop: '8px',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
    },
    snippetHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px',
        backgroundColor: '#2b2d31',
        fontSize: '0.85em',
        color: '#b9bbbe',
    },

    contextMenu: {
        position: 'fixed',
        backgroundColor: '#18191c',
        border: '1px solid #2b2d31',
        borderRadius: '6px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 10000,
        minWidth: '220px',
        overflow: 'hidden',
        padding: '6px 0'
    },
    contextMenuItem: {
        padding: '10px 14px',
        cursor: 'pointer',
        color: '#b5bac1',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 0.15s',
        backgroundColor: 'transparent'
    },
    contextMenuDivider: {
        height: '1px',
        backgroundColor: '#2b2d31',
        margin: '6px 0'
    },
    voiceTranscription: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        marginTop: '8px',
        padding: '10px 12px',
        backgroundColor: 'rgba(114, 137, 218, 0.1)',
        border: '1px solid rgba(114, 137, 218, 0.3)',
        borderRadius: '8px',
        maxWidth: '400px'
    },
    transcriptionIcon: {
        fontSize: '16px',
        flexShrink: 0,
        marginTop: '2px'
    },
    transcriptionText: {
        flex: 1,
        fontSize: '13px',
        lineHeight: '1.5',
        color: '#dcddde',
        fontStyle: 'italic'
    },
    transcribeButton: {
        marginTop: '8px',
        padding: '6px 12px',
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        border: '1px solid rgba(88, 101, 242, 0.4)',
        borderRadius: '6px',
        color: '#7289da',
        fontSize: '12px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
    },
    transcribingLoader: {
        marginTop: '8px',
        padding: '6px 12px',
        color: '#72767d',
        fontSize: '12px',
        fontStyle: 'italic'
    }
};

// CSS Injection for Hover Effects (Message Item & Action Buttons)
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
    .message-hover-trigger:hover { background-color: rgba(255, 255, 255, 0.03) !important; }
    .action-button:hover { background-color: rgba(255, 255, 255, 0.1); color: white; }
    .poll-option:hover { background-color: rgba(255, 255, 255, 0.1) !important; }
    .context-menu-item:hover { background-color: #5865f2 !important; color: #fff !important; }
    .context-menu-item.danger:hover { background-color: #ed4245 !important; }
    
    /* 🆕 File Attachment Hover Effects */
    .file-attachment-hover:hover {
        background-color: #32353b !important;
        border-color: rgba(255,255,255,0.1) !important;
    }
    .download-button-hover:hover {
        color: #dcddde !important;
        background-color: rgba(255,255,255,0.06) !important;
        border-radius: 4px;
    }
    .download-button-hover:active {
        transform: scale(0.95);
    }
    
    /* FileCodePreview hover */
    .file-code-preview-hover:hover {
        border-color: rgba(255,255,255,0.12) !important;
    }
    .file-code-header-btn:hover {
        background-color: rgba(255,255,255,0.1) !important;
        color: #dcddde !important;
    }
    .file-code-footer:hover {
        background-color: #32353b !important;
    }
`;
    document.head.appendChild(styleSheet);
}

export default styles;

// frontend/src/VoiceUserList/styles.js

const styles = {
    container: {
        width: '100%',
        backgroundColor: 'transparent',
        color: '#ccc',
        padding: '4px 0',
        minHeight: '30px',
        maxHeight: '400px',
        overflowY: 'auto'
    },
    header: {
        fontSize: '0.7em',
        padding: '4px 8px',
        marginBottom: '4px',
        color: '#99aab5',
        textTransform: 'uppercase',
        fontWeight: '600',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
    },
    userList: {
        padding: '0 2px',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    userItemNew: {
        padding: '4px 6px',
        fontSize: '0.8em',
        borderRadius: '4px',
        background: 'rgba(255, 255, 255, 0.02)',
        transition: 'all 0.15s ease',
        cursor: 'pointer',
        border: '1px solid transparent',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userClickArea: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: '100%',
        flexDirection: 'row',
    },
    avatarContainer: {
        position: 'relative',
        flexShrink: 0,
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        objectFit: 'cover',
        transition: 'all 0.2s ease',
        display: 'block',
        backgroundColor: '#2f3136',
        flexShrink: 0,
        minWidth: '22px',
        minHeight: '22px',
    },
    statusBadge: {
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '6px',
        border: '1px solid #2f3136',
        boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
    },
    userInfo: {
        flex: 1,
        overflow: 'hidden',
        marginLeft: '2px',
    },
    username: {
        display: 'block',
        fontSize: '0.85em',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    sharingIndicator: {
        fontSize: '0.65em',
        color: '#5865f2',
        marginTop: '0',
        fontWeight: '500',
    },
    talkingUser: { color: '#4CAF50', fontWeight: 'bold' },
    activeUser: { color: '#CCCCCC' },
    mutedUser: { color: '#e67e22' },
    deafenedUser: { color: '#e74c3c' },
    volumeControl: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0 2px',
        gap: '4px',
    },
    volumeSlider: {
        flexGrow: 1,
        height: '3px',
        cursor: 'pointer',
        borderRadius: '2px',
        WebkitAppearance: 'none',
        background: 'rgba(255, 255, 255, 0.1)',
        outline: 'none',
    },
    volumeText: {
        fontSize: '0.7em',
        minWidth: '35px',
        textAlign: 'right',
        color: '#99aab5',
        fontWeight: '500',
    },
    contextMenu: {
        position: 'fixed',
        backgroundColor: '#111214',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 10000,
        minWidth: '240px',
        maxWidth: '280px',
        overflow: 'hidden',
        animation: 'contextMenuIn 0.12s ease-out',
    },
    menuHeader: {
        padding: '14px 12px',
        fontWeight: '600',
        color: '#fff',
        backgroundColor: '#1a1b1e',
        fontSize: '0.9em',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    menuSection: {
        padding: '4px 0',
    },
    menuDivider: {
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '4px 8px',
    },
    volumeSection: {
        padding: '10px 14px 12px',
        backgroundColor: '#1a1b1e',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    menuItem: {
        padding: '8px 12px',
        cursor: 'pointer',
        color: '#dcddde',
        fontSize: '13px',
        transition: 'background-color 0.1s, color 0.1s',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px',
        margin: '0 4px',
    },
    subMenu: {
        position: 'absolute',
        backgroundColor: '#18191c',
        border: '1px solid #2b2d31',
        borderRadius: '6px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
        zIndex: 2147483647,
        minWidth: '180px',
        overflow: 'hidden',
        marginLeft: '4px',
    },
};

// CSS-in-JS stylesheet injection
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes contextMenuIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }

    div[style*="userItemNew"]:hover {
        background: rgba(88, 101, 242, 0.08) !important;
        border-color: rgba(88, 101, 242, 0.2) !important;
        transform: translateX(1px);
    }
    
    .user-context-menu-item:hover {
        background-color: rgba(88, 101, 242, 0.15) !important;
        color: #fff !important;
    }
    
    .user-context-menu-item-danger:hover {
        background-color: rgba(237, 66, 69, 0.15) !important;
        color: #ed4245 !important;
    }
    
    .user-context-submenu-item:hover {
        background-color: rgba(88, 101, 242, 0.15) !important;
        color: #fff !important;
    }
    
    .voice-user-dragging {
        opacity: 0.4 !important;
        border: 1px dashed rgba(88, 101, 242, 0.5) !important;
    }
    
    .voice-channel-drop-target {
        background: rgba(88, 101, 242, 0.15) !important;
        border-color: rgba(88, 101, 242, 0.6) !important;
        box-shadow: inset 0 0 12px rgba(88, 101, 242, 0.2) !important;
    }
    
    .voice-channel-drop-target::after {
        content: '🔀 Buraya bırak';
        position: absolute;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 10px;
        color: #5865f2;
        font-weight: 600;
        background: rgba(88, 101, 242, 0.15);
        padding: 2px 8px;
        border-radius: 4px;
    }

    .voice-volume-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4), 0 0 0 1px rgba(88, 101, 242, 0.3);
        border: 2px solid #5865f2;
        transition: transform 0.1s, box-shadow 0.1s;
        position: relative;
        z-index: 3;
    }
    .voice-volume-slider::-webkit-slider-thumb:hover {
        transform: scale(1.15);
        box-shadow: 0 1px 6px rgba(88, 101, 242, 0.5), 0 0 0 2px rgba(88, 101, 242, 0.2);
    }
    .voice-volume-slider::-webkit-slider-thumb:active {
        transform: scale(1.25);
        background: #5865f2;
        border-color: #fff;
    }
    .voice-volume-slider::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
        border: 2px solid #5865f2;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    }
    .voice-volume-slider::-webkit-slider-runnable-track {
        height: 6px;
        background: transparent;
        border-radius: 3px;
    }
    .voice-volume-slider::-moz-range-track {
        height: 6px;
        background: transparent;
        border-radius: 3px;
    }

    input[type="range"]:not(.voice-volume-slider)::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #5865f2;
        cursor: pointer;
        box-shadow: 0 0 3px rgba(88, 101, 242, 0.5);
    }
    
    input[type="range"]:not(.voice-volume-slider)::-moz-range-thumb {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #5865f2;
        cursor: pointer;
        border: none;
        box-shadow: 0 0 3px rgba(88, 101, 242, 0.5);
    }
`;
if (!document.head.querySelector('style[data-voice-user-list]')) {
    styleSheet.setAttribute('data-voice-user-list', 'true');
    document.head.appendChild(styleSheet);
}

export default styles;

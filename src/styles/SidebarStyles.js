// frontend/src/SidebarStyles.js

// ✨ PREMIUM DARK GLASS PALETTE
const SURFACE_PRIMARY = '#18191c'; // Chat area
const SURFACE_SECONDARY = '#111214'; // Channel sidebar — very deep
const SURFACE_RAIL = '#0d0e10'; // Server rail — deepest
const SURFACE_ELEVATED = '#1e2024'; // Cards/elevated
const SURFACE_BOTTOM = '#0f1012'; // Bottom user bar
const BORDER_SUBTLE = '1px solid rgba(255, 255, 255, 0.055)';
const BLURPLE = '#5865f2';
const TEXT_PRIMARY = '#f2f3f5';
const TEXT_SECONDARY = '#b5bac1';
const TEXT_MUTED = '#80848e';
const FONT_FAMILY = "'gg sans', 'Noto Sans', system-ui, -apple-system, sans-serif";

// Legacy aliases
const GLASS_BG = SURFACE_SECONDARY;
const GLASS_BORDER = BORDER_SUBTLE;

export const styles = {
    // --- SOL EN DAR KISIM (SERVER RAIL) ---
    serverRail: {
        width: '72px',
        background: 'linear-gradient(180deg, #0a0b0d 0%, #0d0e10 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '12px',
        overflowY: 'auto',
        flexShrink: 0,
        borderRight: '1px solid rgba(255,255,255,0.04)',
        fontFamily: FONT_FAMILY,
    },
    serverIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '24px',
        backgroundColor: '#1a1c1f',
        marginBottom: '8px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: TEXT_PRIMARY,
        transition:
            'border-radius 0.25s cubic-bezier(0.175,0.885,0.32,1.2), background-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease',
        position: 'relative',
        boxShadow: '0 2px 10px rgba(0,0,0,0.45)',
    },
    serverBadge: {
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        backgroundColor: '#f23f42',
        color: '#fff',
        borderRadius: '12px',
        padding: '1px 5px',
        fontSize: '11px',
        fontWeight: 'bold',
        border: '3px solid #0b0e1b',
        boxShadow: '0 1px 4px rgba(242,63,66,0.5)',
    },
    separator: {
        height: '1px',
        width: '32px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)',
        borderRadius: '1px',
        margin: '4px 0 8px',
    },

    // --- ORTA KISIM (KANAL LİSTESİ) ---
    sidebar: {
        width: '240px',
        minWidth: '240px',
        background: 'linear-gradient(180deg, #0f1012 0%, #111214 100%)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        borderRight: '1px solid rgba(255,255,255,0.05)',
        fontFamily: FONT_FAMILY,
    },
    topSection: {
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: 0,
        paddingBottom: '8px',
    },
    // Server Header (Title)
    serverHeader: {
        padding: '0 16px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        marginBottom: '8px',
        height: '52px',
        fontSize: '15px',
        fontWeight: '700',
        color: TEXT_PRIMARY,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.025)',
        boxShadow: '0 1px 0 rgba(0,0,0,0.3)',
        cursor: 'pointer',
        backdropFilter: 'blur(48px) saturate(180%)',
    },
    headerTitle: {
        padding: '0 16px',
        height: '52px',
        fontSize: '15px',
        fontWeight: '700',
        color: TEXT_PRIMARY,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(48px) saturate(180%)',
    },

    // Categoryler ve Odalar
    categoryHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '18px 6px 6px 10px',
        cursor: 'pointer',
        color: TEXT_MUTED,
        fontSize: '10.5px',
        fontWeight: '700',
        textTransform: 'uppercase',
        userSelect: 'none',
        letterSpacing: '1px',
        transition: 'color 0.15s ease',
    },
    roomItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '7px 10px 7px 10px',
        cursor: 'pointer',
        color: TEXT_MUTED,
        borderRadius: '8px',
        margin: '1px 8px',
        transition: 'background-color 0.12s ease, color 0.12s ease',
        fontSize: '14.5px',
        fontWeight: '500',
    },
    channelContent: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        minWidth: 0,
    },
    hashtagIcon: {
        color: '#5a5f69',
        marginRight: '7px',
        fontSize: '1em',
        flexShrink: 0,
    },
    voiceIcon: {
        color: '#5a5f69',
        marginRight: '7px',
        fontSize: '1em',
        flexShrink: 0,
    },
    channelNameText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 1,
    },

    // --- ALT KISIM (KULLANICI PANELİ) ---
    bottomSection: {
        background: 'linear-gradient(180deg, #0a0b0e 0%, #0d0e10 100%)',
        padding: '8px',
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
        borderTop: '1px solid rgba(255,255,255,0.05)',
        backdropFilter: 'blur(48px) saturate(180%)',
    },
    userPanel: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box',
        padding: '7px 10px',
        borderRadius: '8px',
        cursor: 'pointer',
        backgroundColor: 'transparent',
        transition: 'background-color 0.15s ease',
        gap: '8px',
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover',
        backgroundColor: '#1a1c1f',
        flexShrink: 0,
        boxShadow: '0 0 0 2px rgba(88,101,242,0.25), 0 2px 8px rgba(0,0,0,0.4)',
    },
    userInfo: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        overflow: 'hidden',
    },
    usernameText: {
        color: TEXT_PRIMARY,
        fontWeight: '600',
        fontSize: '13px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.3',
    },
    statusText: {
        color: TEXT_MUTED,
        fontSize: '11px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        lineHeight: '1.3',
    },

    // --- DM LİSTESİ ---
    dmListContainer: {
        padding: '0 8px',
        marginTop: '4px',
    },
    groupHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '18px 4px 6px 8px',
        color: TEXT_MUTED,
        fontSize: '10.5px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
    },
    dmItem: {
        display: 'flex',
        alignItems: 'center',
        minWidth: 0,
        padding: '8px 10px',
        borderRadius: '8px',
        cursor: 'pointer',
        color: TEXT_MUTED,
        marginBottom: '1px',
        transition: 'background-color 0.12s ease, color 0.12s ease',
        fontSize: '14.5px',
        fontWeight: '500',
    },
    avatarSmall: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '#1a1c1f',
        marginRight: '10px',
        flexShrink: 0,
        boxShadow: '0 1px 6px rgba(0,0,0,0.35)',
    },

    // --- ORTAK BUTONLAR ---
    iconBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: TEXT_SECONDARY,
        cursor: 'pointer',
        padding: '5px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.15s ease, background 0.15s ease',
    },
    addDmButton: {
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: TEXT_SECONDARY,
        cursor: 'pointer',
        fontSize: '11.5px',
        fontWeight: '600',
        padding: '3px 8px',
        borderRadius: '6px',
        transition: 'background 0.15s ease, color 0.15s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
    },
    settingsButton: {
        background: 'none',
        border: 'none',
        color: TEXT_SECONDARY,
        cursor: 'pointer',
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        borderRadius: '6px',
        transition: 'color 0.15s ease, transform 0.2s ease',
    },
    unreadBadge: {
        background: 'linear-gradient(135deg, #f23f42, #e03437)',
        color: 'white',
        fontSize: '10px',
        padding: '2px 6px',
        borderRadius: '10px',
        marginLeft: 'auto',
        fontWeight: '700',
        boxShadow: '0 1px 6px rgba(242,63,66,0.45)',
    },

    // --- MODALLAR ---
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        backdropFilter: 'blur(8px)',
    },
    selectionModalContent: {
        background: 'rgba(17, 18, 20, 0.95)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        padding: '24px',
        borderRadius: '16px',
        width: '300px',
        maxWidth: '90%',
        boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 24px 64px rgba(0,0,0,0.8)',
        border: '1px solid rgba(255,255,255,0.07)',
        fontFamily: FONT_FAMILY,
        animation: 'fadeIn 0.18s ease-out',
    },
    selectionButton: {
        width: '100%',
        padding: '12px 16px',
        marginBottom: '8px',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'filter 0.15s ease',
        boxShadow: '0 4px 0 rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.3)',
    },

    // Form Elemanları
    addCategoryForm: {
        padding: '10px',
        marginBottom: '8px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.06)',
    },
    addRoomInput: {
        width: '100%',
        padding: '9px 12px',
        borderRadius: '13px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        color: TEXT_PRIMARY,
        marginBottom: '6px',
        outline: 'none',
        fontSize: '14px',
        fontFamily: FONT_FAMILY,
        transition: 'border-color 0.15s ease',
    },
    addRoomButton: {
        padding: '7px 16px',
        background: 'linear-gradient(135deg, #5865f2, #4549c4)',
        color: 'white',
        border: 'none',
        borderRadius: '13px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        transition: 'opacity 0.15s ease',
        boxShadow: '0 4px 0 #3b45c7, 0 8px 24px rgba(88,101,242,0.35)',
    },
    channelTypeSelect: {
        width: '100%',
        padding: '9px 12px',
        borderRadius: '8px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.09)',
        color: TEXT_PRIMARY,
        marginBottom: '6px',
        outline: 'none',
        cursor: 'pointer',
        fontFamily: FONT_FAMILY,
    },

    // Mobilde Sidebar Closema Butonu
    closeSidebarButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '5px',
    },

    // 🔥 YENİ: Drag & Drop Overlay
    dragOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(88, 101, 242, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        pointerEvents: 'none', // Click'leri engelleme
    },
    dragOverlayContent: {
        textAlign: 'center',
        color: '#fff',
        padding: '32px',
        borderRadius: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: '3px dashed rgba(255, 255, 255, 0.6)',
        animation: 'pulse 1.5s infinite',
    },
    // 🆕 Upload Progress Styles
    uploadProgressContainer: {
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        border: '1px solid rgba(88, 101, 242, 0.3)',
    },
    uploadProgressInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    uploadFileName: {
        fontSize: '13px',
        color: '#dbdee1',
        fontWeight: '500',
    },
    uploadThucent: {
        fontSize: '13px',
        color: '#5865f2',
        fontWeight: 'bold',
    },
    uploadProgressBar: {
        height: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '3px',
        overflow: 'hidden',
    },
    uploadProgressFill: {
        height: '100%',
        backgroundColor: '#5865f2',
        borderRadius: '3px',
        transition: 'width 0.2s ease-out',
    },
};

// CSS Injection for Animations + Hover States
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.94) translateY(4px); } to { opacity: 1; transform: scale(1) translateY(0); } }

    /* Channel item hover */
    .channel-item:hover { background-color: rgba(255,255,255,0.07) !important; color: #e3e5e8 !important; }
    .channel-item.active { background: linear-gradient(90deg, rgba(88,101,242,0.20), rgba(88,101,242,0.10)) !important; color: #f2f3f5 !important; }
    .channel-item.active .channel-icon { color: #a8acb8 !important; }

    /* DM item hover */
    .dm-item:hover { background-color: rgba(255,255,255,0.07) !important; color: #e3e5e8 !important; }
    .dm-item.active { background: rgba(88,101,242,0.18) !important; color: #f2f3f5 !important; }

    /* Server icon hover */
    .server-icon:hover { border-radius: 14px !important; background: linear-gradient(135deg, #5865f2, #4549c4) !important; color: #fff !important; transform: scale(1.04) !important; box-shadow: 0 4px 16px rgba(88,101,242,0.45) !important; }
    .server-icon.active { border-radius: 14px !important; background: linear-gradient(135deg, #5865f2, #4549c4) !important; color: #fff !important; box-shadow: 0 4px 16px rgba(88,101,242,0.40) !important; }

    /* User panel hover */
    .user-panel:hover { background: rgba(255,255,255,0.07) !important; }

    /* Settings button hover */
    .settings-btn:hover { color: #e3e5e8 !important; transform: rotate(18deg) scale(1.1); }

    /* Icon button hover */
    .icon-btn:hover { color: #e3e5e8 !important; background-color: rgba(255,255,255,0.08) !important; }

    /* Category header hover */
    .category-header:hover { color: #b5bac1 !important; }

    /* Scrollbars — ultra thin and subtle */
    *::-webkit-scrollbar { width: 3px; height: 3px; }
    *::-webkit-scrollbar-track { background: transparent; }
    *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }
    *::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.16); }

    /* Input focus */
    .sidebar-input:focus { border-color: rgba(88,101,242,0.7) !important; box-shadow: 0 0 0 2px rgba(88,101,242,0.15) !important; }

    /* addDmButton hover */
    .add-dm-btn:hover { background: rgba(88,101,242,0.18) !important; color: #a8adff !important; border-color: rgba(88,101,242,0.3) !important; }
`;
document.head.appendChild(style);

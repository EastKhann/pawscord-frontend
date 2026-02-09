// frontend/src/SidebarStyles.js

// ✨ MODERN GLASSMORPHISM PALETTE
const GLASS_BG = "rgba(30, 31, 34, 0.85)"; // Yarı saydam arka plan
const GLASS_BORDER = "1px solid rgba(255, 255, 255, 0.08)";
const GLASS_HIGHLIGHT = "rgba(255, 255, 255, 0.1)";
const GLASS_SHADOW = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";
const BACKDROP_FILTER = "blur(12px)";
const FONT_FAMILY = "'gg sans', 'Noto Sans', system-ui, -apple-system, sans-serif";

export const styles = {
    // --- SOL EN DAR KISIM (SERVER RAIL) ---
    serverRail: {
        width: '72px',
        backgroundColor: 'rgba(17, 18, 20, 0.95)', // Biraz daha koyu
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '12px',
        overflowY: 'auto',
        flexShrink: 0,
        borderRight: GLASS_BORDER,
        backdropFilter: BACKDROP_FILTER,
        fontFamily: FONT_FAMILY
    },
    serverIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        backgroundColor: '#313338',
        marginBottom: '8px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        color: '#dbdee1',
        transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Yaylanma efekti
        position: 'relative',
        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
    },
    // Hover efekti CSS ile yapılacak, burada stil veriyoruz
    serverBadge: {
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        backgroundColor: '#f23f42',
        color: '#fff',
        borderRadius: '12px',
        padding: '2px 6px',
        fontSize: '11px',
        fontWeight: 'bold',
        border: '3px solid #1e1f22'
    },
    separator: {
        height: '2px',
        width: '32px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: '1px',
        margin: '8px 0'
    },

    // --- ORTA KISIM (KANAL LİSTESİ) ---
    sidebar: {
        width: '240px',
        backgroundColor: GLASS_BG,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        height: '100%',
        borderRight: GLASS_BORDER,
        backdropFilter: BACKDROP_FILTER,
        fontFamily: FONT_FAMILY
    },
    topSection: {
        flex: 1,
        overflowY: 'auto',
        paddingBottom: '10px' // Alt kısma yapışmaması için
    },
    // Server Header (Başlık)
    serverHeader: {
        padding: '16px',
        borderBottom: GLASS_BORDER,
        marginBottom: '8px',
        fontSize: '15px',
        fontWeight: '700',
        color: '#f2f3f5',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.03)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    headerTitle: {
        padding: '16px',
        fontSize: '15px',
        fontWeight: '700',
        color: '#f2f3f5',
        borderBottom: GLASS_BORDER,
        marginBottom: '10px',
        background: 'rgba(255,255,255,0.03)'
    },

    // Kategoriler ve Odalar
    categoryHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 8px', // Biraz daha geniş
        cursor: 'pointer',
        color: '#949ba4',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase',
        userSelect: 'none',
        letterSpacing: '0.6px',
        transition: 'color 0.2s ease'
    },
    roomItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px', // Odalar daha rahat
        cursor: 'pointer',
        color: '#949ba4',
        borderRadius: '6px',
        margin: '2px 8px',
        transition: 'all 0.15s ease',
        fontSize: '15px', // Oda isimleri biraz daha büyük (okunabilirlik)
        fontWeight: '500'
    },
    channelContent: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        minWidth: 0
    },
    hashtagIcon: {
        color: '#80848e',
        marginRight: '8px',
        fontSize: '1.1em'
    },
    voiceIcon: {
        color: '#80848e',
        marginRight: '8px',
        fontSize: '1.1em'
    },
    channelNameText: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        flex: 1
    },

    // --- ALT KISIM (KULLANICI PANELİ) ---
    bottomSection: {
        backgroundColor: 'rgba(20, 21, 24, 0.7)', // Biraz daha koyu cam
        padding: '10px',
        flexShrink: 0,
        borderTop: GLASS_BORDER,
        backdropFilter: 'blur(15px)'
    },
    userPanel: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: 'rgba(255,255,255,0.03)', // Hafif dolgu
        transition: 'background-color 0.2s ease',
        gap: '10px',
        border: GLASS_BORDER
    },
    avatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        objectFit: 'cover',
        backgroundColor: '#1e1f22',
        position: 'relative',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },
    usernameText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    statusText: {
        color: '#b5bac1',
        fontSize: '12px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },

    // --- DM LİSTESİ ---
    dmListContainer: {
        padding: '0 8px',
        marginTop: '10px'
    },
    groupHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 10px',
        color: '#949ba4',
        fontSize: '11px',
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    dmItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderRadius: '6px',
        cursor: 'pointer',
        color: '#949ba4',
        marginBottom: '2px',
        transition: 'all 0.15s ease',
        fontSize: '15px'
    },
    avatarSmall: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        marginRight: '12px'
    },

    // --- ORTAK BUTONLAR (Modernize Edilmiş) ---
    iconBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'color 0.2s, background-color 0.2s'
    },
    addDmButton: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600',
        transition: 'color 0.2s'
    },
    settingsButton: {
        background: 'none',
        border: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'transform 0.2s ease',
    },
    unreadBadge: {
        backgroundColor: '#f23f42',
        color: 'white',
        fontSize: '11px',
        padding: '2px 8px',
        borderRadius: '10px', // Hap şekli
        marginLeft: 'auto',
        fontWeight: 'bold',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
    },

    // --- MODALLAR (Glassmorphism) ---
    modalOverlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Arkaplanı biraz daha karart
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999, // 🔥 Sidebar'ın üstünde görünsün
        backdropFilter: 'blur(5px)' // Arka planı bulanıklaştır
    },
    selectionModalContent: {
        backgroundColor: '#313338', // Yarı saydam değil, içerik okunsun
        padding: '24px',
        borderRadius: '12px',
        width: '320px',
        maxWidth: '90%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.05)',
        fontFamily: FONT_FAMILY,
        animation: 'fadeIn 0.2s ease-out'
    },
    selectionButton: {
        width: '100%',
        padding: '14px',
        marginBottom: '10px',
        border: 'none',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        fontSize: '15px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        transition: 'transform 0.1s ease, filter 0.2s',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },

    // Form Elemanları
    addCategoryForm: {
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '6px'
    },
    addRoomInput: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        color: 'white',
        marginBottom: '8px',
        outline: 'none',
        fontSize: '14px',
        fontFamily: FONT_FAMILY,
        transition: 'border-color 0.2s'
    },
    addRoomButton: {
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '13px',
        transition: 'background-color 0.2s'
    },
    channelTypeSelect: {
        width: '100%',
        padding: '10px',
        borderRadius: '6px',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        color: 'white',
        marginBottom: '8px',
        outline: 'none',
        cursor: 'pointer',
        fontFamily: FONT_FAMILY
    },

    // Mobilde Sidebar Kapatma Butonu
    closeSidebarButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '5px'
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
        pointerEvents: 'none' // Click'leri engelleme
    },
    dragOverlayContent: {
        textAlign: 'center',
        color: '#fff',
        padding: '32px',
        borderRadius: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        border: '3px dashed rgba(255, 255, 255, 0.6)',
        animation: 'pulse 1.5s infinite'
    },
    // 🆕 Upload Progress Styles
    uploadProgressContainer: {
        backgroundColor: 'rgba(88, 101, 242, 0.15)',
        borderRadius: '8px',
        padding: '12px',
        marginBottom: '8px',
        border: '1px solid rgba(88, 101, 242, 0.3)'
    },
    uploadProgressInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px'
    },
    uploadFileName: {
        fontSize: '13px',
        color: '#dcddde',
        fontWeight: '500'
    },
    uploadPercent: {
        fontSize: '13px',
        color: '#5865f2',
        fontWeight: 'bold'
    },
    uploadProgressBar: {
        height: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    uploadProgressFill: {
        height: '100%',
        backgroundColor: '#5865f2',
        borderRadius: '3px',
        transition: 'width 0.2s ease-out'
    }
};

// CSS Injection for Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
    
    /* Scrollbar Güzelleştirme */
    *::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
    *::-webkit-scrollbar-track {
        background: #2b2d31; 
        border-radius: 4px;
    }
    *::-webkit-scrollbar-thumb {
        background: #1a1b1e; 
        border-radius: 4px;
    }
    *::-webkit-scrollbar-thumb:hover {
        background: #111214; 
    }
`;
document.head.appendChild(style);


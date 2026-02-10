// frontend/src/styles/appStyles.js
// Extracted from App.js for cleaner architecture
// =============================================

export // --- STİLLER ---
const styles = {
    // ✨ GLASSMORPHISM - ANA PENCERE
    mainContainer: {
        display: 'flex',
        width: '100%',
        height: '100dvh',
        backgroundColor: '#1E1F22', // Deep dark base
        backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(88, 101, 242, 0.05) 0%, transparent 40%)', // Subtle glow
        color: 'white',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif"
    },

    // 2. YERLEŞİM DÜZENİ
    chatLayout: {
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
    },

    // 3. SOL MENÜ (Sidebar)
    sidebarWrapper: {
        width: '312px',
        backgroundColor: 'rgba(30, 31, 34, 0.6)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'row',
        flexShrink: 0,
        height: '100%',
        borderRight: '1px solid rgba(255,255,255,0.05)'
    },

    // 4. SAĞ TARAFTAKİ ANA İÇERİK
    mainContent: {
        flex: 1,
        display: 'flex',
        minWidth: 0,
        position: 'relative',
        height: '100%',
        overflow: 'hidden'
    },

    // 5. CHAT ALANI (Başlık + Mesajlar + Input)
    chatArea: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'transparent',
        minWidth: 0,
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
    },

    chatHeader: {
        height: '54px',
        minHeight: '54px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        flexShrink: 0,
        backgroundColor: 'rgba(20, 21, 24, 0.7)',
        backdropFilter: 'blur(15px)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        zIndex: 10
    },

    // 🔥 DÜZELTİLEN MESAJ KUTUSU
    messageBox: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        scrollBehavior: 'smooth',
        minHeight: 0
    },

    // 7. INPUT ALANI (En altta sabit)
    inputContainer: {
        padding: '0 20px 24px 20px',
        backgroundColor: 'transparent',
        position: 'relative',
        flexShrink: 0,
        minHeight: 'auto',
        zIndex: 20
    },

    inputForm: {
        display: 'flex',
        backgroundColor: 'rgba(56, 58, 64, 0.5)',
        borderRadius: '12px', // Yuvarlatılmış köşeler
        padding: '12px',
        alignItems: 'flex-end',
        gap: '12px',
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    },

    // ... Diğer stiller (Modernize)
    chatUserListPanel: {
        width: '240px',
        backgroundColor: 'rgba(30, 31, 34, 0.6)',
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
        height: '100%',
        backdropFilter: 'blur(10px)'
    },
    mobileSidebar: { position: 'fixed', zIndex: 100, top: 0, bottom: 0, left: 0, width: '85vw', maxWidth: '350px', boxShadow: '5px 0 15px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' },
    mobileRightSidebar: { position: 'fixed', zIndex: 100, top: 0, bottom: 0, right: 0, width: '85vw', maxWidth: '300px', boxShadow: '-5px 0 15px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' },

    // 🔥 MOBİL OVERLAY - Sidebar açıldığında arka planı karartır ve tıklanabilir yapar
    mobileOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: 99, // Sidebar'ın altında
        backdropFilter: 'blur(3px)'
    },

    mobileMenuButton: { background: 'none', border: 'none', color: 'white', fontSize: '1.5em', marginRight: '10px', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', transition: 'all 0.2s' },

    iconButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '1.3em',
        cursor: 'pointer',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50%',
        transition: 'all 0.2s',
        ':hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' }
    },
    micButton: { background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.3em', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', transition: 'color 0.2s' },
    sendButton: {
        backgroundColor: '#5865f2',
        border: 'none',
        color: '#ffffff',
        fontSize: '1.3em',
        cursor: 'pointer',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        transition: 'all 0.2s',
        boxShadow: '0 2px 5px rgba(88, 101, 242, 0.4)'
    },

    videoGrid: { display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '5px', alignContent: 'center', justifyContent: 'center', alignItems: 'center' },
    systemMessage: { color: '#949ba4', textAlign: 'center', fontSize: '0.85em', margin: '10px 0', fontStyle: 'italic' },

    searchForm: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: '4px',
        padding: '0 8px',
        height: '32px',
        marginRight: '8px',
        border: '1px solid rgba(255,255,255,0.05)'
    },
    searchInput: { backgroundColor: 'transparent', border: 'none', color: '#dcddde', fontSize: '0.9em', width: '140px', outline: 'none' },
    searchIcon: { color: '#949ba4', fontSize: '0.8em', cursor: 'pointer' },
    typingIndicator: { color: '#dbdee1', fontSize: '0.85em', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold' },

    connectionPillOnline: { marginLeft: '10px', padding: '4px 8px', borderRadius: '999px', backgroundColor: 'rgba(59, 165, 93, 0.2)', border: '1px solid #3ba55d', color: '#3ba55d', fontSize: '0.75em', fontWeight: 700 },
    connectionPillOffline: { marginLeft: '10px', padding: '4px 8px', borderRadius: '999px', backgroundColor: 'rgba(218, 55, 60, 0.2)', border: '1px solid #da373c', color: '#da373c', fontSize: '0.75em', fontWeight: 700 },

    scrollToBottomButton: { position: 'absolute', right: '16px', bottom: '110px', backgroundColor: '#5865f2', color: '#fff', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.35)', cursor: 'pointer', fontWeight: 600 },
    quickEmojiRow: { display: 'flex', gap: '6px', marginTop: '8px', paddingLeft: '4px' },
    quickEmojiButton: { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer', color: '#fff', fontSize: '14px', transition: 'background 0.2s' },

    // 🔥 MOBİL KENAR ÇUBUĞU HEADER STİLİ
    mobileSidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 15px',
        backgroundColor: '#202225',
        borderBottom: '1px solid #111214',
        minHeight: '54px',
        flexShrink: 0
    },
    closeSidebarButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        fontSize: '22px',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.2s, color 0.2s'
    },

    // 🔥 AÇILIR MENÜ ITEM STİLİ
    menuItem: {
        width: '100%',
        padding: '10px 16px',
        background: 'transparent',
        border: 'none',
        color: '#dcddde',
        textAlign: 'left',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.15s ease',
        borderRadius: '0',
    },
    menuItemHover: {
        backgroundColor: '#5865f2',
        color: '#ffffff'
    }
};

export default styles;

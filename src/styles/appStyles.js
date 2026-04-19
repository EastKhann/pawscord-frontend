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
            backgroundColor: '#0b0e1b', // Deep navy blue base
            backgroundImage:
                'radial-gradient(circle at 50% 0%, rgba(88, 101, 242, 0.18) 0%, rgba(59, 91, 219, 0.06) 35%, transparent 65%)', // Blue ambient glow
            color: 'white',
            overflow: 'hidden',
            fontFamily: "'Inter', sans-serif",
        },

        // 2. YERLEŞİM DÜZENİ
        chatLayout: {
            display: 'flex',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
        },

        // 3. SOL MENÜ (Sidebar)
        sidebarWrapper: {
            width: '312px',
            backgroundColor: 'rgba(9, 12, 28, 0.82)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            display: 'flex',
            flexDirection: 'row',
            flexShrink: 0,
            height: '100%',
            borderRight: '1px solid rgba(88, 101, 242, 0.1)',
        },

        // 4. SAĞ TARAFTAKİ ANA İÇERİK
        mainContent: {
            flex: 1,
            display: 'flex',
            minWidth: 0,
            position: 'relative',
            height: '100%',
            overflow: 'hidden',
        },

        // 5. CHAT ALANI (Title + Mesajlar + Input)
        chatArea: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
        },

        chatHeader: {
            height: '52px',
            minHeight: '52px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            flexShrink: 0,
            zIndex: 10,
        },

        messageBox: {
            flex: 1,
            overflowY: 'auto',
            padding: '8px 0 16px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            scrollBehavior: 'smooth',
            minHeight: 0,
        },

        // 7. INPUT ALANI (En altta sabit)
        inputContainer: {
            padding: '0 16px 20px 16px',
            backgroundColor: 'transparent',
            position: 'relative',
            flexShrink: 0,
            minHeight: 'auto',
            zIndex: 20,
        },

        inputForm: {
            display: 'flex',
            backgroundColor: 'rgba(20, 25, 42, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '13px',
            padding: '0 12px',
            alignItems: 'flex-end',
            gap: '8px',
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.22)',
            minHeight: '48px',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
        },

        // ... Other stiller (Modernize)
        chatUserListPanel: {
            width: '240px',
            backgroundColor: 'rgba(9, 12, 28, 0.82)',
            borderLeft: '1px solid rgba(88, 101, 242, 0.12)',
            flexShrink: 0,
            height: '100%',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
        },
        mobileSidebar: {
            position: 'fixed',
            zIndex: 100,
            top: 0,
            bottom: 0,
            left: 0,
            width: '85vw',
            maxWidth: '350px',
            boxShadow: '5px 0 15px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
        },
        mobileRightSidebar: {
            position: 'fixed',
            zIndex: 100,
            top: 0,
            bottom: 0,
            right: 0,
            width: '85vw',
            maxWidth: '300px',
            boxShadow: '-5px 0 15px rgba(0,0,0,0.5)',
            display: 'flex',
            flexDirection: 'column',
        },

        // 🔥 MOBİL OVERLAY - Sidebar açıldığında arka planı karartır ve tıklanabilir yapar
        mobileOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 99, // Sidebar'ın altında
            backdropFilter: 'blur(3px)',
        },

        mobileMenuButton: {
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5em',
            marginRight: '10px',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.2s',
        },

        iconButton: {
            background: 'none',
            border: 'none',
            color: '#b5bac1',
            fontSize: '1.3em',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            borderRadius: '50%',
            transition: 'all 0.2s',
            ':hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff' },
        },
        micButton: {
            background: 'none',
            border: 'none',
            color: '#b5bac1',
            fontSize: '1.3em',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            transition: 'color 0.2s',
        },
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
            boxShadow: '0 2px 5px rgba(88, 101, 242, 0.4)',
        },

        videoGrid: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5px',
            padding: '5px',
            alignContent: 'center',
            justifyContent: 'center',
            alignItems: 'center',
        },
        systemMessage: {
            color: '#949ba4',
            textAlign: 'center',
            fontSize: '0.85em',
            margin: '10px 0',
            fontStyle: 'italic',
        },

        searchForm: {
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
            padding: '0 8px',
            height: '32px',
            marginRight: '8px',
            border: '1px solid rgba(255,255,255,0.05)',
        },
        searchInput: {
            backgroundColor: 'transparent',
            border: 'none',
            color: '#dbdee1',
            fontSize: '0.9em',
            width: '140px',
            outline: 'none',
        },
        searchIcon: { color: '#949ba4', fontSize: '0.8em', cursor: 'pointer' },
        typingIndicator: {
            color: '#dbdee1',
            fontSize: '0.85em',
            maxWidth: '180px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: 'bold',
        },

        connectionPillOnline: {
            marginLeft: '8px',
            padding: '2px 6px',
            borderRadius: '999px',
            backgroundColor: 'rgba(59, 165, 93, 0.15)',
            color: '#3ba55d',
            fontSize: '0.7em',
            fontWeight: 600,
            letterSpacing: '0.02em',
        },
        connectionPillOffline: {
            marginLeft: '8px',
            padding: '2px 6px',
            borderRadius: '999px',
            backgroundColor: 'rgba(218, 55, 60, 0.15)',
            color: '#da373c',
            fontSize: '0.7em',
            fontWeight: 600,
            animation: 'statusPulse 2s ease-in-out infinite',
            letterSpacing: '0.02em',
        },

        scrollToBottomButton: {
            position: 'absolute',
            right: '16px',
            bottom: '110px',
            backgroundColor: '#5865f2',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.35)',
            cursor: 'pointer',
            fontWeight: 600,
        },
        quickEmojiRow: { display: 'flex', gap: '6px', marginTop: '8px', paddingLeft: '4px' },
        quickEmojiButton: {
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
            padding: '4px 8px',
            cursor: 'pointer',
            color: '#fff',
            fontSize: '14px',
            transition: 'background 0.2s',
        },

        // 🔥 MOBİL KENAR ÇUBUĞU HEADER STİLİ
        mobileSidebarHeader: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 15px',
            backgroundColor: '#0b0e1b',
            borderBottom: '1px solid #0e1222',
            minHeight: '54px',
            flexShrink: 0,
        },
        mobileSidebarLogo: {
            width: '28px',
            height: '28px',
            objectFit: 'contain',
            borderRadius: '6px',
            flexShrink: 0,
        },
        closeSidebarButton: {
            background: 'none',
            border: 'none',
            color: '#b5bac1',
            fontSize: '22px',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background 0.2s, color 0.2s',
        },

        // 🔥 AÇILIR MENÜ ITEM STİLİ
        menuItem: {
            width: '100%',
            padding: '10px 16px',
            background: 'transparent',
            border: 'none',
            color: '#dbdee1',
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
            color: '#ffffff',
        },
    };

export default styles;

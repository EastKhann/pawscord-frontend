// Extracted from ServerSettingsModal.js — centralized styles object

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 },
    modal: { backgroundColor: '#313338', borderRadius: '12px', width: '900px', maxWidth: '95vw', height: '650px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.6)' },

    // Layout
    layoutContainer: { display: 'flex', flex: 1, overflow: 'hidden' },

    // ═══ SIDEBAR ═══
    sidebar: {
        width: '220px',
        minWidth: '220px',
        backgroundColor: '#2b2d31',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.06)',
    },
    sidebarHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '20px 16px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    sidebarServerIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        backgroundColor: '#5865f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: '700',
        fontSize: '16px',
        flexShrink: 0,
    },
    sidebarServerInfo: {
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    sidebarServerName: {
        color: '#fff',
        fontWeight: '700',
        fontSize: '14px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    sidebarServerSub: {
        color: '#949ba4',
        fontSize: '11px',
        marginTop: '2px',
    },
    sidebarNav: {
        flex: 1,
        overflowY: 'auto',
        padding: '8px',
    },
    navSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
    },
    navSectionLabel: {
        fontSize: '11px',
        fontWeight: '700',
        color: '#949ba4',
        letterSpacing: '0.04em',
        padding: '8px 10px 4px',
        userSelect: 'none',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 10px',
        borderRadius: '6px',
        border: 'none',
        background: 'none',
        color: '#b5bac1',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'all 0.15s ease',
        textAlign: 'left',
        width: '100%',
    },
    navItemActive: {
        backgroundColor: 'rgba(88,101,242,0.15)',
        color: '#fff',
    },
    navIcon: {
        fontSize: '14px',
        opacity: 0.8,
        flexShrink: 0,
    },
    navDivider: {
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '8px 10px',
    },

    // ═══ MAIN CONTENT ═══
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    contentTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '1.2em',
        fontWeight: '700',
    },
    closeBtn: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', padding: '4px', borderRadius: '4px', transition: 'color 0.15s' },
    content: { flex: 1, padding: '20px 24px', overflow: 'auto' },

    // Legacy compat (header/tabs removed - kept for inner usage)
    header: { display: 'none' },
    headerTitle: { margin: 0, color: '#fff', fontSize: '1.2em' },
    tabs: { display: 'none' },
    tabBtn: { display: 'none' },
    activeTab: {},

    // Sol Menü
    rolesSidebar: { width: '200px', borderRight: '1px solid #1e1f22', display: 'flex', flexDirection: 'column', gap: '10px' },
    newRoleBtn: { padding: '10px', backgroundColor: '#232428', color: '#fff', border: '1px solid #1e1f22', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' },
    rolesList: { overflowY: 'auto', flex: 1 },
    roleItem: { padding: '10px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '4px', marginBottom: '2px', color: '#b9bbbe' },

    // Sağ Editör
    roleEditor: { flex: 1, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' },
    editorTitle: { margin: 0, color: '#fff', borderBottom: '1px solid #40444b', paddingBottom: '10px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '5px', color: '#b9bbbe', fontSize: '0.9em' },
    input: { padding: '10px', backgroundColor: '#1e1f22', border: 'none', borderRadius: '4px', color: '#fff', outline: 'none' },
    colorPreview: { width: '40px', height: '40px', borderRadius: '4px', border: '1px solid #fff', cursor: 'pointer' },

    // 🔥 KAPLAMA (COVER) STİLİ: Tüm ekranı kaplar ama z-index ile picker'ın altında kalır
    cover: { position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px', zIndex: 999 },

    permissionsGrid: { display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#2b2d31', padding: '15px', borderRadius: '8px' },

    // 🛡️ Moderation Cards - YENİ KAPSAMLI STİLLER
    moderationTab: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
    },
    moderationHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        backgroundColor: '#1e1f22',
        borderRadius: '12px',
        marginBottom: '8px'
    },
    moderationTitleSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    serverStats: {
        display: 'flex',
        gap: '24px'
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    statNumber: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#5865f2'
    },
    statLabel: {
        fontSize: '12px',
        color: '#72767d'
    },
    quickStatsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
    },
    quickStatCard: {
        backgroundColor: '#2b2d31',
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    quickStatValue: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff'
    },
    quickStatLabel: {
        fontSize: '12px',
        color: '#72767d'
    },
    moderationCardsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px'
    },
    modCard: {
        backgroundColor: '#2b2d31',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #1e1f22',
        transition: 'transform 0.2s, box-shadow 0.2s'
    },
    modCardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '16px'
    },
    modCardIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modCardBadge: {
        backgroundColor: 'rgba(88, 101, 242, 0.2)',
        color: '#5865f2',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600'
    },
    modCardTitle: {
        margin: '0 0 8px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600'
    },
    modCardDesc: {
        color: '#b9bbbe',
        fontSize: '13px',
        lineHeight: '1.5',
        marginBottom: '16px'
    },
    modCardFeatures: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        marginBottom: '16px'
    },
    modCardFeature: {
        backgroundColor: '#1e1f22',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '11px',
        color: '#b9bbbe'
    },
    modCardBtn: {
        width: '100%',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        padding: '12px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'opacity 0.2s'
    },
    quickActionsSection: {
        backgroundColor: '#1e1f22',
        padding: '20px',
        borderRadius: '12px'
    },
    quickActionsTitle: {
        margin: '0 0 16px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    quickActionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px'
    },
    quickActionBtn: {
        backgroundColor: '#2b2d31',
        color: '#b9bbbe',
        border: '1px solid #40444b',
        borderRadius: '8px',
        padding: '12px 16px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s'
    },
    moderationCard: {
        backgroundColor: '#1e1f22',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #2b2d31'
    },
    moderationBtn: {
        width: '100%',
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'background-color 0.2s'
    },
    permLabel: { display: 'flex', gap: '10px', alignItems: 'center', color: '#dbdee1', cursor: 'pointer' },

    editorFooter: { marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #40444b', paddingTop: '15px' },
    saveBtn: { padding: '10px 20px', backgroundColor: '#23a559', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },
    deleteBtn: { padding: '10px 20px', backgroundColor: 'transparent', color: '#da373c', border: '1px solid #1e1f22', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' },

    // 🔥 YENİ: SUNUCU YÖNETİMİ TAB STİLLERİ
    managementTab: {
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        maxWidth: '600px',
        margin: '0 auto'
    },
    sectionTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '1.1em',
        borderBottom: '2px solid #40444b',
        paddingBottom: '10px'
    },
    settingBox: {
        backgroundColor: '#2b2d31',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px'
    },
    settingInfo: {
        flex: 1
    },
    settingLabel: {
        color: '#fff',
        fontSize: '1em',
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    settingDesc: {
        color: '#b9bbbe',
        fontSize: '0.9em'
    },
    actionBtn: {
        padding: '10px 20px',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.95em',
        whiteSpace: 'nowrap'
    },
    divider: {
        height: '1px',
        backgroundColor: '#40444b',
        margin: '10px 0'
    },
    dangerBox: {
        backgroundColor: '#2b2d31',
        padding: '20px',
        borderRadius: '8px',
        border: '2px solid #da373c',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px'
    },
    dangerBtn: {
        padding: '10px 20px',
        backgroundColor: '#da373c',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.95em'
    },
    deleteConfirmation: {
        marginTop: '15px',
        padding: '15px',
        backgroundColor: '#1e1f22',
        borderRadius: '4px'
    },
    confirmInput: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#313338',
        border: '1px solid #da373c',
        borderRadius: '4px',
        color: '#fff',
        fontSize: '0.95em',
        outline: 'none'
    },
    cancelBtn: {
        padding: '10px 20px',
        backgroundColor: 'transparent',
        color: '#b9bbbe',
        border: '1px solid #40444b',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold'
    }
};

export default styles;

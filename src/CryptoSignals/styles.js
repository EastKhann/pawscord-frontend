// CryptoSignals/styles.js
// Styles and CSS injection extracted from CryptoSignals.js

const S = {
    page: {
        minHeight: '100vh', backgroundColor: '#1e1f22', color: '#dbdee1',
        padding: '16px', boxSizing: 'border-box',
        paddingTop: 'max(16px, env(safe-area-inset-top))',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    loadingBox: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', height: '70vh'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #2b2d31',
        flexWrap: 'wrap', gap: 10
    },
    headerLeft: { display: 'flex', flexDirection: 'column', gap: 4 },
    headerRight: { display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
    backBtn: {
        textDecoration: 'none', color: '#949ba4', fontSize: '0.85em',
        display: 'flex', alignItems: 'center', gap: 5
    },
    title: {
        margin: 0, fontSize: '1.4em', display: 'flex', alignItems: 'center',
        gap: 10, fontWeight: 700, color: '#fff'
    },
    versionBadge: {
        fontSize: '0.4em', color: '#949ba4', backgroundColor: '#2b2d31',
        padding: '2px 8px', borderRadius: 8
    },
    updateTime: {
        fontSize: '0.8em', color: '#949ba4', display: 'flex',
        alignItems: 'center', gap: 4
    },
    checkboxLabel: {
        fontSize: '0.8em', color: '#b9bbbe', display: 'flex',
        alignItems: 'center', gap: 4, cursor: 'pointer'
    },
    primaryBtn: {
        backgroundColor: '#5865f2', color: '#fff', border: 'none',
        padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600,
        fontSize: '0.85em', transition: 'background-color 0.2s'
    },
    modeToggle: { display: 'flex', gap: 8, marginBottom: 12 },
    fileTabBar: {
        display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center',
        overflowX: 'auto', paddingBottom: 8, paddingTop: 2,
        borderBottom: '2px solid #2f3136'
    },
    fileTabBtn: {
        backgroundColor: '#2b2d31', border: '2px solid #40444b',
        color: '#949ba4', padding: '10px 20px', borderRadius: 10,
        cursor: 'pointer', fontWeight: 700, fontSize: '0.9em',
        whiteSpace: 'nowrap', transition: 'all 0.2s', flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 6
    },
    fileTabBtnActive: {
        backgroundColor: '#5865f2', borderColor: '#5865f2',
        color: '#fff', boxShadow: '0 4px 14px rgba(88,101,242,0.35)'
    },
    modeBtn: {
        flex: 1, padding: '10px 16px', borderRadius: 10,
        border: '2px solid #40444b', backgroundColor: '#2b2d31',
        color: '#949ba4', cursor: 'pointer', fontWeight: 700,
        fontSize: '0.9em', display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 8, transition: 'all 0.2s'
    },
    modeBtnActive: {
        backgroundColor: '#313338', color: '#fff',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    },
    statsBar: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
        gap: 8, marginBottom: 12
    },
    statCard: {
        backgroundColor: '#2b2d31', borderRadius: 10, padding: '10px 8px',
        textAlign: 'center', border: '1px solid #2f3136'
    },
    statNum: { display: 'block', fontSize: '1.2em', fontWeight: 700, color: '#fff' },
    statLabel: { display: 'block', fontSize: '0.72em', color: '#949ba4', marginTop: 2 },
    tabBar: {
        display: 'flex', gap: 6, marginBottom: 12, overflowX: 'auto',
        paddingBottom: 4
    },
    tabBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b',
        color: '#949ba4', padding: '8px 14px', borderRadius: 10,
        cursor: 'pointer', fontWeight: 500, fontSize: '0.85em',
        display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
        transition: 'all 0.2s', flexShrink: 0
    },
    filterBar: {
        display: 'flex', gap: 10, marginBottom: 12, alignItems: 'center',
        flexWrap: 'wrap', justifyContent: 'space-between'
    },
    searchBox: {
        display: 'flex', alignItems: 'center', backgroundColor: '#2b2d31',
        borderRadius: 8, padding: '7px 12px', border: '1px solid #40444b',
        flex: 1, maxWidth: 360, gap: 8
    },
    searchInput: {
        backgroundColor: 'transparent', border: 'none', outline: 'none',
        color: '#dbdee1', fontSize: '0.88em', flex: 1
    },
    clearBtn: {
        background: 'none', border: 'none', color: '#949ba4',
        cursor: 'pointer', padding: '2px 4px', fontSize: '0.9em'
    },
    viewToggle: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b',
        color: '#dbdee1', padding: '6px 10px', borderRadius: 6,
        cursor: 'pointer', fontSize: '1em'
    },
    posBanner: {
        padding: '10px 14px', backgroundColor: 'rgba(240,178,50,0.06)',
        border: '1px solid rgba(240,178,50,0.15)', borderRadius: 10,
        marginBottom: 12, fontSize: '0.85em', color: '#dbdee1',
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'
    },
    posTag: {
        padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: '0.82em',
        display: 'inline-flex', alignItems: 'center', gap: 3, transition: 'all 0.2s'
    },
    tableWrap: {
        overflowX: 'auto', borderRadius: 12, border: '1px solid #2f3136',
        backgroundColor: '#2b2d31'
    },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85em' },
    th: {
        padding: '10px 10px', textAlign: 'center', backgroundColor: '#202225',
        color: '#b9bbbe', fontWeight: 600, fontSize: '0.82em',
        borderBottom: '2px solid #40444b', position: 'sticky', top: 0, zIndex: 1
    },
    td: {
        padding: '8px 8px', textAlign: 'center',
        borderBottom: '1px solid rgba(47,49,54,0.6)'
    },
    tfBadge: {
        backgroundColor: '#40444b', color: '#dbdee1', padding: '2px 8px',
        borderRadius: 4, fontSize: '0.82em', fontWeight: 600
    },
    linkBtn: {
        color: '#5865f2', fontSize: '0.85em', padding: '4px 8px',
        borderRadius: 4, display: 'inline-flex'
    },
    pagination: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 6, marginTop: 16, paddingBottom: 24
    },
    pageBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b', color: '#dbdee1',
        padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontWeight: 600
    },
    pageNumBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b', color: '#949ba4',
        padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.85em',
        minWidth: 32, textAlign: 'center'
    },
    pageNumActive: {
        backgroundColor: '#5865f2', borderColor: '#5865f2', color: '#fff', fontWeight: 700
    },
    cardGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: 12
    },
    coinCard: {
        backgroundColor: '#2b2d31', borderRadius: 12, padding: 14,
        border: '1px solid #2f3136', cursor: 'pointer',
        transition: 'all 0.2s ease'
    },
    cardHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid #40444b'
    },
    cardCoinName: { color: '#f0b232', fontWeight: 700, fontSize: '1.1em' },
    cardBody: { display: 'flex', flexDirection: 'column', gap: 6 },
    cardRow: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '4px 0'
    },
    cardRowLabel: { color: '#949ba4', fontSize: '0.82em' },
    cardRowValue: { color: '#dbdee1', fontSize: '0.9em', fontWeight: 600 },
    cardFooter: { marginTop: 10, paddingTop: 8, borderTop: '1px solid #40444b' },
    miniBarBg: {
        width: '100%', height: 4, backgroundColor: '#da373c',
        borderRadius: 4, overflow: 'hidden'
    },
    miniBar: { height: '100%', borderRadius: 4, backgroundColor: '#23a559', transition: 'width 0.3s ease' },
    emptyState: {
        textAlign: 'center', padding: '60px 20px', color: '#949ba4'
    },
    modalOverlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 2000,
        padding: 16, backdropFilter: 'blur(6px)'
    },
    modal: {
        backgroundColor: '#1e1f22', borderRadius: 16, width: '100%',
        maxWidth: 700, maxHeight: '88vh', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        border: '1px solid #f0b232',
        boxShadow: '0 20px 60px rgba(240,178,50,0.2)'
    },
    modalHeader: {
        padding: '16px 20px', borderBottom: '1px solid #2f3136',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #2b2d31 0%, #1e1f22 100%)'
    },
    modalBadge: {
        padding: '4px 10px', backgroundColor: '#5865f2', borderRadius: 16,
        fontSize: '0.72em', fontWeight: 600, color: '#fff'
    },
    modalCloseBtn: {
        background: 'none', border: 'none', color: '#b9bbbe',
        fontSize: 22, cursor: 'pointer', padding: 8, borderRadius: 8,
        lineHeight: 1, transition: 'color 0.2s'
    },
    modalStats: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: 10, padding: '16px 20px',
        borderBottom: '1px solid #2f3136',
        background: 'linear-gradient(180deg, rgba(240,178,50,0.04) 0%, transparent 100%)'
    },
    mStatCard: {
        textAlign: 'center', padding: '10px 6px', backgroundColor: '#2b2d31',
        borderRadius: 10, border: '1px solid #40444b'
    },
    mStatLabel: { display: 'block', fontSize: '0.7em', color: '#949ba4', marginTop: 2, textTransform: 'uppercase' },
    modalBody: { flex: 1, overflow: 'auto', padding: '16px 20px' },
    strategyList: { display: 'flex', flexDirection: 'column', gap: 10 },
    strategyCard: {
        backgroundColor: '#2b2d31', borderRadius: 10, padding: 14,
        border: '1px solid #40444b',
        animation: 'cryptoSlideIn 0.35s ease forwards',
        opacity: 0, transform: 'translateX(15px)'
    },
    strategyGrid: {
        display: 'grid',
        gridTemplateColumns: window.innerWidth < 640 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: 8
    },
    stratItem: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '5px 10px', backgroundColor: '#202225', borderRadius: 6,
        fontSize: '0.85em'
    },
    stratItemLabel: { color: '#949ba4', fontSize: '0.85em' },
    stratItemVal: { color: '#dbdee1', fontWeight: 600 }
};

// === GLOBAL CSS ===
if (typeof document !== 'undefined' && !document.getElementById('crypto-signals-v4-styles')) {
    const sheet = document.createElement('style');
    sheet.id = 'crypto-signals-v4-styles';
    sheet.textContent = `
        @keyframes cryptoSlideIn {
            from { opacity: 0; transform: translateX(15px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes cryptoSpin {
            100% { transform: rotate(360deg); }
        }
        .crypto-spin { animation: cryptoSpin 1s linear infinite; display: inline-block; }
    `;
    document.head.appendChild(sheet);
}

export default S;

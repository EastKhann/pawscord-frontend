const styles = {
    pageContainer: {
        minHeight: '100%', backgroundColor: '#1e1f22', color: '#dbdee1',
        padding: '20px', boxSizing: 'border-box'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #2b2d31',
        flexWrap: 'wrap', gap: 10
    },
    headerLeft: { display: 'flex', flexDirection: 'column', gap: '5px' },
    title: {
        margin: 0, fontSize: '1.4em', display: 'flex', alignItems: 'center',
        fontWeight: '700', color: '#fff'
    },
    backButton: {
        textDecoration: 'none', color: '#949ba4', fontSize: '0.9em',
        display: 'flex', alignItems: 'center', gap: '5px'
    },
    refreshButton: {
        backgroundColor: '#5865f2', color: 'white', border: 'none',
        padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600'
    },
    portfolioBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #f0b232', color: '#f0b232',
        padding: '8px 16px', borderRadius: '6px', cursor: 'pointer',
        fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px'
    },
    metaBar: {
        display: 'flex', gap: 20, flexWrap: 'wrap', padding: '8px 12px',
        backgroundColor: '#2b2d31', borderRadius: 8, marginBottom: 15,
        fontSize: '0.85em', color: '#dbdee1', alignItems: 'center'
    },
    modeToggleContainer: { display: 'flex', gap: 10, marginBottom: 15 },
    modeToggleBtn: {
        flex: 1, padding: '12px 20px', borderRadius: 8,
        border: '2px solid #40444b', backgroundColor: '#2b2d31',
        color: '#949ba4', cursor: 'pointer', fontWeight: 700,
        fontSize: '0.95em', display: 'flex', alignItems: 'center',
        justifyContent: 'center', transition: 'all 0.2s'
    },
    modeToggleActive: {
        backgroundColor: '#313338', color: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
    },
    tabBar: { marginBottom: 15, overflowX: 'auto' },
    tabs: { display: 'flex', gap: '6px', paddingBottom: '5px', minWidth: 'max-content' },
    tabButton: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b',
        color: '#949ba4', padding: '8px 14px', borderRadius: '8px',
        cursor: 'pointer', fontWeight: '500', fontSize: '0.85em',
        display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
        transition: 'all 0.2s'
    },
    activeTab: { color: '#fff', fontWeight: '700', boxShadow: '0 2px 6px rgba(0,0,0,0.3)' },
    filterBar: {
        display: 'flex', gap: 15, marginBottom: 15, alignItems: 'center', flexWrap: 'wrap'
    },
    searchBox: {
        display: 'flex', alignItems: 'center', backgroundColor: '#2b2d31',
        borderRadius: 8, padding: '6px 12px', border: '1px solid #40444b',
        flex: 1, maxWidth: 400
    },
    searchInput: {
        backgroundColor: 'transparent', border: 'none', outline: 'none',
        color: '#dbdee1', fontSize: '0.9em', flex: 1
    },
    clearSearchBtn: {
        background: 'none', border: 'none', color: '#949ba4', cursor: 'pointer', padding: '2px 5px'
    },
    resultInfo: { display: 'flex', alignItems: 'center', gap: 10 },
    positionBanner: {
        padding: '10px 15px', backgroundColor: 'rgba(240,178,50,0.08)',
        border: '1px solid rgba(240,178,50,0.2)', borderRadius: 8,
        marginBottom: 15, fontSize: '0.85em', color: '#dbdee1',
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap'
    },
    positionCoinTag: {
        padding: '3px 10px', borderRadius: 6, fontWeight: 700, fontSize: '0.8em',
        display: 'inline-flex', alignItems: 'center', gap: 3, transition: 'all 0.2s'
    },
    content: {},
    tableContainer: {
        overflowX: 'auto', borderRadius: 10, border: '1px solid #2f3136',
        backgroundColor: '#2b2d31'
    },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85em' },
    tableHeaderRow: { backgroundColor: '#202225', borderBottom: '2px solid #40444b' },
    tfBadge: {
        backgroundColor: '#40444b', color: '#dbdee1', padding: '2px 6px',
        borderRadius: 4, fontSize: '0.8em', fontWeight: 600
    },
    miniTradeBtn: {
        backgroundColor: '#23a559', color: 'white', border: 'none',
        padding: '5px 8px', borderRadius: 4, cursor: 'pointer',
        fontSize: '0.8em', display: 'flex', alignItems: 'center'
    },
    pagination: {
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        gap: 10, marginTop: 20, paddingBottom: 30
    },
    pageBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b', color: '#dbdee1',
        padding: '8px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.85em'
    },
    pageNumbers: { display: 'flex', gap: 4 },
    pageNumBtn: {
        backgroundColor: '#2b2d31', border: '1px solid #40444b', color: '#949ba4',
        padding: '6px 10px', borderRadius: 4, cursor: 'pointer', fontSize: '0.85em',
        minWidth: 32, textAlign: 'center'
    },
    pageNumActive: {
        backgroundColor: '#5865f2', borderColor: '#5865f2', color: '#fff', fontWeight: 700
    },
    loader: { textAlign: 'center', marginTop: 80, color: '#949ba4', fontSize: '1.1em' },
    modalOverlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 2000
    },
    modalContent: {
        backgroundColor: '#313338', padding: '25px', borderRadius: '12px',
        width: '90%', maxWidth: '400px', border: '1px solid #40444b',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
    },
    modalHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 20, color: 'white', borderBottom: '1px solid #444', paddingBottom: 10
    },
    closeBtn: { background: 'none', border: 'none', color: '#bbb', fontSize: '1.2em', cursor: 'pointer' },
    modeBtn: {
        flex: 1, padding: '12px', color: 'white', border: 'none',
        borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1em'
    },
    inputWrapper: { marginBottom: 15 },
    input: {
        flex: 1, padding: '12px', borderRadius: '6px 0 0 6px',
        border: '1px solid #40444b', backgroundColor: '#202225', color: 'white',
        fontSize: '1.1em', outline: 'none', width: '100%'
    },
    maxBtn: {
        padding: '0 15px', backgroundColor: '#40444b', border: '1px solid #40444b',
        borderRadius: '0 6px 6px 0', color: '#f0b232', fontWeight: 'bold', cursor: 'pointer'
    },
    confirmBtn: {
        width: '100%', padding: '15px', border: 'none', borderRadius: '6px',
        color: 'white', fontWeight: 'bold', fontSize: '1.1em', cursor: 'pointer', marginTop: 10
    },
    balanceCard: {
        backgroundColor: '#202225', padding: '15px', borderRadius: '8px',
        textAlign: 'center', marginBottom: '20px', border: '1px solid #f0b232'
    },
    holdingsList: { maxHeight: '250px', overflowY: 'auto', margin: '10px 0' },
    holdingItem: {
        display: 'flex', justifyContent: 'space-between', padding: '10px',
        borderBottom: '1px solid #40444b', alignItems: 'center'
    }
};

// Global CSS injection
if (typeof document !== 'undefined') {
    const id = 'crypto-dashboard-styles';
    if (!document.getElementById(id)) {
        const styleSheet = document.createElement("style");
        styleSheet.id = id;
        styleSheet.innerText = `
  @keyframes flashGreen { 0% { color: #fff; background: rgba(35, 165, 89, 0.5); } 100% { color: #23a559; background: transparent; } }
  @keyframes flashRed { 0% { color: #fff; background: rgba(218, 55, 60, 0.5); } 100% { color: #da373c; background: transparent; } }
  .flash-green { animation: flashGreen 1s ease-out; }
  .flash-red { animation: flashRed 1s ease-out; }
  td, th { padding: 8px 10px; text-align: center; border-bottom: 1px solid #2f3136; }
  th { color: #949ba4; font-weight: 600; font-size: 0.8em; }
  input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
`;
        document.head.appendChild(styleSheet);
    }
}

export default styles;

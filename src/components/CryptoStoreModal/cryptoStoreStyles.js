const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px', boxSizing: 'border-box' },
    modal: { backgroundColor: '#2b2d31', width: '100%', maxWidth: '600px', maxHeight: '90vh', borderRadius: '12px', overflow: 'hidden', border: '1px solid #1e1f22', display: 'flex', flexDirection: 'column' },
    header: { padding: '20px', backgroundColor: '#202225', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 },
    closeBtn: { background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', fontSize: '1.2em', padding: '10px', minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    balanceBar: { padding: '10px 12px', backgroundColor: '#2f3136', color: 'white', borderBottom: '1px solid #1e1f22', flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    tabs: { display: 'flex', borderBottom: '1px solid #1e1f22', backgroundColor: '#202225', flexShrink: 0 },
    tab: { flex: 1, padding: '15px', background: 'none', border: 'none', color: '#bbb', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '44px', touchAction: 'manipulation' },
    activeTab: { flex: 1, padding: '15px', background: 'rgba(255,255,255,0.05)', border: 'none', color: 'white', cursor: 'pointer', borderBottom: '2px solid #5865f2', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', minHeight: '44px', touchAction: 'manipulation' },
    content: { padding: '20px', overflowY: 'auto', flex: 1, WebkitOverflowScrolling: 'touch', overflowX: 'hidden' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '15px', paddingBottom: '20px' },
    itemCard: { backgroundColor: '#202225', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid #1e1f22', display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', minHeight: '180px' },
    iconPlace: { width: 60, height: 60, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, flexShrink: 0 },
    buyBtn: { marginTop: 'auto', padding: '12px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '0.9em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: '44px', touchAction: 'manipulation', fontWeight: '600' },
    ownedBtn: { marginTop: 'auto', padding: '12px', backgroundColor: '#40444b', color: '#aaa', border: 'none', borderRadius: '4px', width: '100%', fontSize: '0.9em', minHeight: '44px' },
    useBtn: { marginTop: 'auto', padding: '12px', backgroundColor: '#23a559', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', fontSize: '0.9em', minHeight: '44px', touchAction: 'manipulation', fontWeight: '600' },
    equippedBtn: { marginTop: 'auto', padding: '12px', backgroundColor: 'transparent', color: '#23a559', border: '1px solid #23a559', borderRadius: '4px', width: '100%', fontSize: '0.9em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, minHeight: '44px' },
    dailyBtn: { padding: '4px 8px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '0.75em', lineHeight: 1, minHeight: '24px', marginLeft: '8px' },
};

export default styles;

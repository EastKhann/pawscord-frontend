// frontend/src/components/UserWarningsPanel/styles.js
const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 10000,
        backdropFilter: 'blur(5px)'
    },
    panel: {
        backgroundColor: '#2b2d31', borderRadius: '12px', width: '90%',
        maxWidth: '1000px', maxHeight: '90vh', display: 'flex',
        flexDirection: 'column', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)', overflow: 'hidden'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px', borderBottom: '1px solid #1e1f22'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    headerIcon: { fontSize: '24px', color: '#f0b132' },
    title: { margin: 0, color: '#fff', fontSize: '24px', fontWeight: '600' },
    headerRight: { display: 'flex', gap: '12px' },
    addBtn: {
        backgroundColor: '#43b581', color: '#fff', border: 'none', borderRadius: '6px',
        padding: '8px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
        display: 'flex', alignItems: 'center', gap: '8px'
    },
    closeButton: {
        background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer',
        fontSize: '24px', padding: '8px'
    },
    statsGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px', padding: '20px', borderBottom: '1px solid #1e1f22'
    },
    statCard: { backgroundColor: '#1e1f22', borderRadius: '8px', padding: '16px', textAlign: 'center' },
    statIcon: { fontSize: '32px', marginBottom: '8px' },
    statValue: { fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' },
    statLabel: { fontSize: '13px', color: '#b9bbbe' },
    searchBar: {
        display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px',
        borderBottom: '1px solid #1e1f22', backgroundColor: '#1e1f22'
    },
    searchIcon: { color: '#b9bbbe', fontSize: '16px' },
    searchInput: {
        flex: 1, backgroundColor: '#2b2d31', border: '1px solid #1e1f22',
        borderRadius: '6px', padding: '8px 12px', color: '#fff', fontSize: '14px'
    },
    warningsList: { flex: 1, overflowY: 'auto', padding: '20px' },
    loading: { textAlign: 'center', color: '#b9bbbe', padding: '40px', fontSize: '14px' },
    empty: { textAlign: 'center', color: '#b9bbbe', padding: '60px' },
    emptyIcon: { fontSize: '48px', marginBottom: '16px', opacity: 0.5 },
    userCard: { backgroundColor: '#1e1f22', borderRadius: '8px', padding: '16px', marginBottom: '16px' },
    userHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #2b2d31'
    },
    userInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
    userIcon: { fontSize: '20px', color: '#5865f2' },
    userName: { color: '#fff', fontSize: '18px', fontWeight: '600' },
    badge: {
        padding: '4px 8px', borderRadius: '4px', fontSize: '11px',
        fontWeight: '600', color: '#fff', textTransform: 'uppercase'
    },
    riskBadge: {
        padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700',
        color: '#fff', backgroundColor: '#ed4245', animation: 'pulse 1.5s infinite'
    },
    banBtn: {
        backgroundColor: '#ed4245', color: '#fff', border: 'none', borderRadius: '6px',
        padding: '8px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
        display: 'flex', alignItems: 'center', gap: '8px'
    },
    userWarnings: { display: 'flex', flexDirection: 'column', gap: '8px' },
    warningItem: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px', backgroundColor: '#2b2d31', borderRadius: '6px'
    },
    warningLeft: { display: 'flex', alignItems: 'center', gap: '12px', flex: 1 },
    severityDot: { width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0 },
    warningContent: { flex: 1 },
    warningReason: { color: '#fff', fontSize: '14px', marginBottom: '4px' },
    warningMeta: { color: '#72767d', fontSize: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' },
    removeBtn: { background: 'none', border: 'none', color: '#ed4245', cursor: 'pointer', fontSize: '14px', padding: '8px' },
    modalOverlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 10001
    },
    modal: {
        backgroundColor: '#2b2d31', borderRadius: '12px', width: '90%', maxWidth: '500px',
        maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden'
    },
    modalHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px', borderBottom: '1px solid #1e1f22'
    },
    modalTitle: { margin: 0, color: '#fff', fontSize: '20px', fontWeight: '600' },
    modalClose: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '20px' },
    modalContent: { flex: 1, overflowY: 'auto', padding: '20px' },
    formGroup: { marginBottom: '20px' },
    label: { display: 'block', color: '#b9bbbe', fontSize: '14px', fontWeight: '600', marginBottom: '8px' },
    select: {
        width: '100%', backgroundColor: '#1e1f22', border: '1px solid #2b2d31',
        borderRadius: '6px', padding: '10px', color: '#fff', fontSize: '14px'
    },
    input: {
        width: '100%', backgroundColor: '#1e1f22', border: '1px solid #2b2d31',
        borderRadius: '6px', padding: '10px', color: '#fff', fontSize: '14px'
    },
    textarea: {
        width: '100%', backgroundColor: '#1e1f22', border: '1px solid #2b2d31',
        borderRadius: '6px', padding: '10px', color: '#fff', fontSize: '14px',
        resize: 'vertical', fontFamily: 'inherit'
    },
    hint: { color: '#72767d', fontSize: '12px', marginTop: '4px' },
    modalActions: {
        display: 'flex', gap: '12px', padding: '16px 20px', borderTop: '1px solid #1e1f22'
    },
    cancelBtn: {
        flex: 1, backgroundColor: '#2b2d31', color: '#fff', border: 'none',
        borderRadius: '6px', padding: '10px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '600'
    },
    submitBtn: {
        flex: 1, backgroundColor: '#43b581', color: '#fff', border: 'none',
        borderRadius: '6px', padding: '10px 16px', cursor: 'pointer', fontSize: '14px', fontWeight: '600',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
    }
};

export default styles;

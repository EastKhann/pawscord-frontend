// PaymentPanel/styles.js
const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e', borderRadius: '8px',
        width: '90%', maxWidth: '800px', maxHeight: '80vh',
        display: 'flex', flexDirection: 'column', color: '#fff'
    },
    header: {
        padding: '20px', borderBottom: '1px solid #444',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    closeBtn: {
        background: 'none', border: 'none', color: '#fff',
        fontSize: '24px', cursor: 'pointer', padding: '8px'
    },
    tabs: { display: 'flex', borderBottom: '1px solid #444', padding: '0 20px' },
    tab: {
        background: 'none', border: 'none', color: '#99aab5',
        padding: '12px 20px', cursor: 'pointer', fontSize: '14px',
        display: 'flex', alignItems: 'center', gap: '8px',
        borderBottom: '2px solid transparent', transition: 'all 0.2s'
    },
    activeTab: { color: '#5865f2', borderBottomColor: '#5865f2' },
    content: { padding: '20px', overflowY: 'auto', flex: 1 },
    loading: { textAlign: 'center', padding: '40px', color: '#99aab5' },
    balanceView: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px'
    },
    balanceCard: {
        backgroundColor: '#2c2f33', borderRadius: '12px', padding: '40px',
        textAlign: 'center', width: '100%', maxWidth: '400px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'
    },
    balanceAmount: { fontSize: '48px', fontWeight: 'bold', color: '#faa61a' },
    balanceLabel: { fontSize: '14px', color: '#99aab5' },
    quickActions: { display: 'flex', gap: '12px', width: '100%', maxWidth: '400px' },
    actionBtn: {
        flex: 1, padding: '12px 20px', backgroundColor: '#5865f2',
        border: 'none', borderRadius: '6px', color: '#fff', cursor: 'pointer',
        fontSize: '14px', fontWeight: '600',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', transition: 'background 0.2s'
    },
    buyView: { display: 'flex', flexDirection: 'column', gap: '20px' },
    sectionTitle: { fontSize: '16px', fontWeight: '600', margin: 0, marginBottom: '12px' },
    packages: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' },
    package: {
        backgroundColor: '#2c2f33', borderRadius: '8px', padding: '20px',
        textAlign: 'center', cursor: 'pointer', border: '2px solid transparent',
        transition: 'all 0.2s', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
    },
    selectedPackage: { borderColor: '#5865f2', backgroundColor: '#2c3136' },
    pkgAmount: { fontSize: '24px', fontWeight: 'bold', color: '#faa61a' },
    bonus: {
        fontSize: '10px', color: '#43b581', fontWeight: 'bold',
        padding: '2px 8px', backgroundColor: 'rgba(67, 181, 129, 0.1)', borderRadius: '4px'
    },
    pkgPrice: { fontSize: '18px', fontWeight: '600', color: '#fff' },
    purchaseSection: { marginTop: '24px' },
    paymentMethods: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px', marginBottom: '32px'
    },
    paymentMethodCard: {
        padding: '20px', background: '#2b2d31', border: '2px solid #40444b',
        borderRadius: '12px', textAlign: 'center', cursor: 'pointer',
        transition: 'all 0.3s ease'
    },
    selectedPaymentMethod: {
        background: '#5865f2', borderColor: '#5865f2',
        transform: 'scale(1.05)', boxShadow: '0 4px 16px rgba(88, 101, 242, 0.3)'
    },
    pmIcon: { fontSize: '48px', marginBottom: '12px' },
    pmTitle: { fontSize: '16px', fontWeight: '600', color: 'white', marginBottom: '6px' },
    pmDesc: { fontSize: '13px', color: '#b9bbbe', marginBottom: '8px' },
    pmBadge: {
        display: 'inline-block', padding: '4px 12px', background: '#40444b',
        borderRadius: '12px', fontSize: '11px', color: '#43b581', fontWeight: '600'
    },
    paymentInfo: {
        background: '#2b2d31', borderRadius: '12px', padding: '16px', marginBottom: '16px'
    },
    paymentInfoRow: {
        display: 'flex', justifyContent: 'space-between', padding: '8px 0',
        fontSize: '14px', color: '#b9bbbe', borderBottom: '1px solid #40444b'
    },
    paymentNote: { textAlign: 'center', fontSize: '12px', color: '#43b581', marginTop: '12px' },
    price: { fontSize: '18px', fontWeight: '600', color: '#fff' },
    paymentMethod: { marginTop: '12px' },
    label: {
        display: 'block', fontSize: '14px', fontWeight: '600',
        marginBottom: '8px', color: '#dcddde'
    },
    select: {
        width: '100%', padding: '10px', backgroundColor: '#2c2f33',
        border: '1px solid #444', borderRadius: '4px', color: '#fff', fontSize: '14px'
    },
    purchaseBtn: {
        width: '100%', padding: '14px', backgroundColor: '#43b581',
        border: 'none', borderRadius: '6px', color: '#fff',
        fontSize: '16px', fontWeight: '600', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', marginTop: '12px'
    },
    transferView: { maxWidth: '500px', margin: '0 auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '16px' },
    formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    input: {
        padding: '10px', backgroundColor: '#2c2f33',
        border: '1px solid #444', borderRadius: '4px', color: '#fff', fontSize: '14px'
    },
    hint: { fontSize: '12px', color: '#99aab5' },
    transferBtn: {
        width: '100%', padding: '14px', backgroundColor: '#5865f2',
        border: 'none', borderRadius: '6px', color: '#fff',
        fontSize: '16px', fontWeight: '600', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px', marginTop: '12px'
    },
    historyView: { display: 'flex', flexDirection: 'column', gap: '16px' },
    transactions: { display: 'flex', flexDirection: 'column', gap: '8px' },
    transaction: {
        backgroundColor: '#2c2f33', borderRadius: '6px', padding: '16px',
        display: 'flex', alignItems: 'center', gap: '12px'
    },
    txIcon: { fontSize: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    txDetails: { flex: 1 },
    txTitle: { fontSize: '14px', fontWeight: '600' },
    txDate: { fontSize: '12px', color: '#99aab5', marginTop: '4px' },
    txAmount: { fontSize: '18px', fontWeight: 'bold' },
    empty: { textAlign: 'center', padding: '40px', color: '#99aab5' }
};

export default styles;

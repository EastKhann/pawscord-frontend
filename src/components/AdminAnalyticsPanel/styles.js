const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 10000, backdropFilter: 'blur(5px)'
    },
    modal: {
        backgroundColor: '#2b2d31', borderRadius: '12px',
        width: '90%', maxWidth: '1200px', maxHeight: '90vh',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
    },
    header: {
        padding: '20px', borderBottom: '1px solid #1e1f22',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' },
    headerRight: { display: 'flex', gap: '10px' },
    title: { margin: 0, fontSize: '24px', color: '#fff' },
    exportButton: {
        background: '#23a559', border: 'none', color: '#fff',
        padding: '10px 15px', borderRadius: '6px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: '8px'
    },
    closeButton: {
        background: '#da373c', border: 'none', color: '#fff',
        padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px'
    },
    tabs: {
        display: 'flex', padding: '0 20px', borderBottom: '1px solid #1e1f22', gap: '5px'
    },
    tab: {
        background: 'none', border: 'none', color: '#b9bbbe',
        padding: '12px 20px', cursor: 'pointer', fontSize: '14px', fontWeight: '500',
        borderBottom: '2px solid transparent',
        display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
    },
    activeTab: { color: '#fff', borderBottomColor: '#5865f2' },
    content: { flex: 1, overflow: 'auto', padding: '20px' },
    tabContent: { display: 'flex', flexDirection: 'column', gap: '20px' },
    statsGrid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px'
    },
    statCard: {
        backgroundColor: '#1e1f22', borderRadius: '8px', padding: '20px',
        display: 'flex', alignItems: 'center', gap: '15px'
    },
    statIcon: { fontSize: '32px' },
    statContent: { flex: 1 },
    statLabel: { color: '#b9bbbe', fontSize: '12px', marginBottom: '5px' },
    statValue: { color: '#fff', fontSize: '24px', fontWeight: 'bold' },
    statSubtitle: { color: '#747f8d', fontSize: '11px', marginTop: '3px' },
    section: { backgroundColor: '#1e1f22', borderRadius: '8px', padding: '20px' },
    sectionTitle: { color: '#fff', fontSize: '16px', marginBottom: '15px', margin: '0 0 15px 0' },
    activityList: { display: 'flex', flexDirection: 'column', gap: '10px' },
    activityItem: {
        display: 'flex', alignItems: 'center', padding: '10px',
        backgroundColor: '#2b2d31', borderRadius: '6px'
    },
    activityIcon: { color: '#5865f2', marginRight: '12px', fontSize: '18px' },
    activityLabel: { flex: 1, color: '#b9bbbe', fontSize: '14px' },
    activityValue: { color: '#fff', fontSize: '16px', fontWeight: 'bold' },
    list: { display: 'flex', flexDirection: 'column', gap: '8px' },
    listItem: {
        display: 'flex', justifyContent: 'space-between', padding: '10px',
        backgroundColor: '#2b2d31', borderRadius: '6px', color: '#b9bbbe', fontSize: '14px'
    },
    pieChart: { display: 'flex', flexDirection: 'column', gap: '12px' },
    pieItem: { display: 'flex', alignItems: 'center', gap: '12px' },
    pieColor: { width: '20px', height: '20px', borderRadius: '4px' },
    pieLabel: { flex: 1, color: '#b9bbbe', fontSize: '14px' },
    pieValue: { color: '#fff', fontSize: '16px', fontWeight: 'bold' },
    loading: { color: '#fff', textAlign: 'center', padding: '40px' },
    error: { color: '#da373c', textAlign: 'center', padding: '40px' },
    growthSection: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px', marginBottom: '20px'
    },
    growthCard: {
        backgroundColor: '#1e1f22', borderRadius: '8px', padding: '15px',
        display: 'flex', flexDirection: 'column', gap: '8px'
    },
    growthLabel: { color: '#b9bbbe', fontSize: '12px' },
    growthValue: {
        display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 'bold'
    },
    deviceStats: { display: 'flex', gap: '20px', flexWrap: 'wrap' },
    deviceCard: {
        flex: '1 1 200px', display: 'flex', alignItems: 'center', gap: '15px',
        backgroundColor: '#2b2d31', padding: '20px', borderRadius: '8px'
    },
    deviceInfo: { display: 'flex', flexDirection: 'column', gap: '4px' },
    deviceLabel: { color: '#b9bbbe', fontSize: '12px' },
    deviceValue: { color: '#fff', fontSize: '24px', fontWeight: 'bold' },
    devicePercent: { color: '#5865f2', fontSize: '14px', fontWeight: 'bold' }
};

export default styles;

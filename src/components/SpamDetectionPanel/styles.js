const styles = {
    container: { backgroundColor: '#2f3136', borderRadius: '8px', overflow: 'hidden' },
    loading: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '16px', padding: '60px', color: '#b9bbbe'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px', borderBottom: '1px solid #202225'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
    headerRight: { display: 'flex', alignItems: 'center' },
    title: { margin: 0, fontSize: '18px', fontWeight: '600', color: '#fff' },
    subtitle: { margin: '4px 0 0', fontSize: '13px', color: '#72767d' },
    statusBadge: { padding: '6px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' },
    tabs: { display: 'flex', padding: '0 20px', borderBottom: '1px solid #202225', gap: '8px' },
    tab: {
        display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px',
        border: 'none', borderRadius: '4px 4px 0 0', cursor: 'pointer',
        fontSize: '13px', fontWeight: '500', transition: 'all 0.15s'
    },
    content: { padding: '20px' },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '24px' },
    statCard: {
        display: 'flex', alignItems: 'center', gap: '12px', padding: '16px',
        backgroundColor: '#202225', borderRadius: '8px'
    },
    statIcon: {
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: '40px', height: '40px', backgroundColor: '#36393f', borderRadius: '8px'
    },
    statInfo: { flex: 1 },
    statValue: { fontSize: '20px', fontWeight: '700', color: '#fff' },
    statLabel: { fontSize: '12px', color: '#72767d' },
    section: { marginBottom: '24px' },
    sectionTitle: {
        margin: '0 0 16px', fontSize: '14px', fontWeight: '600', color: '#fff',
        textTransform: 'uppercase', letterSpacing: '0.5px'
    },
    detectionsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
    detectionItem: {
        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
        backgroundColor: '#202225', borderRadius: '6px'
    },
    detectionIcon: { color: '#faa61a' },
    detectionInfo: { flex: 1 },
    detectionUser: { display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '14px' },
    detectionType: {
        fontSize: '11px', color: '#72767d', backgroundColor: '#40444b', padding: '2px 6px', borderRadius: '3px'
    },
    detectionMessage: { fontSize: '12px', color: '#72767d', marginTop: '4px' },
    actionBadge: {
        padding: '4px 10px', borderRadius: '4px', color: '#fff',
        fontSize: '11px', fontWeight: '600', textTransform: 'uppercase'
    },
    offendersList: { display: 'flex', flexDirection: 'column', gap: '8px' },
    offenderItem: {
        display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
        backgroundColor: '#202225', borderRadius: '6px'
    },
    offenderRank: {
        width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#40444b', borderRadius: '50%', fontSize: '12px', fontWeight: '600', color: '#fff'
    },
    offenderInfo: { flex: 1, display: 'flex', flexDirection: 'column' },
    offenderName: { color: '#fff', fontSize: '14px', fontWeight: '500' },
    offenderCount: { color: '#72767d', fontSize: '12px' },
    settingRow: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px', backgroundColor: '#202225', borderRadius: '8px', marginBottom: '16px'
    },
    settingInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
    settingTitle: { color: '#fff', fontSize: '14px', fontWeight: '500' },
    settingDesc: { color: '#72767d', fontSize: '12px' },
    toggleButton: {
        width: '44px', height: '24px', border: 'none', borderRadius: '12px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background-color 0.2s'
    },
    sensitivityGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' },
    sensitivityButton: {
        padding: '12px', border: '2px solid transparent', borderRadius: '8px',
        cursor: 'pointer', color: '#fff', fontSize: '13px', fontWeight: '500', transition: 'all 0.15s'
    },
    patternsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' },
    patternItem: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 16px', backgroundColor: '#202225', borderRadius: '6px'
    },
    patternInfo: { display: 'flex', alignItems: 'center', gap: '10px', color: '#dcddde', fontSize: '13px' },
    miniToggle: {
        width: '28px', height: '18px', border: 'none', borderRadius: '9px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background-color 0.2s'
    },
    actionsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' },
    actionItem: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 16px', backgroundColor: '#202225', borderRadius: '6px'
    },
    actionInfo: { display: 'flex', alignItems: 'center', gap: '8px', color: '#dcddde', fontSize: '13px' },
    actionDot: { width: '8px', height: '8px', borderRadius: '50%' },
    saveButton: {
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        width: '100%', padding: '12px', backgroundColor: '#43b581', border: 'none',
        borderRadius: '4px', color: '#fff', fontSize: '14px', fontWeight: '500',
        cursor: 'pointer', transition: 'background-color 0.15s'
    },
    logsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    filterSelect: {
        padding: '8px 12px', backgroundColor: '#202225', border: '1px solid #40444b',
        borderRadius: '4px', color: '#dcddde', fontSize: '13px'
    },
    logsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
    logItem: {
        display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 16px',
        backgroundColor: '#202225', borderRadius: '6px'
    },
    logTime: { fontSize: '11px', color: '#72767d', whiteSpace: 'nowrap' },
    logContent: { flex: 1, fontSize: '13px', color: '#dcddde' },
    logMessage: { fontSize: '12px', color: '#72767d', marginTop: '4px', fontStyle: 'italic' }
};

export default styles;

export const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        backdropFilter: 'blur(5px)'
    },
    panel: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerIcon: { fontSize: '24px' },
    title: { margin: 0, color: '#fff', fontSize: '24px', fontWeight: '600' },
    lockdownBadge: {
        backgroundColor: '#ed4245',
        color: '#fff',
        padding: '4px 12px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: '700',
        animation: 'pulse 1.5s infinite'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '24px',
        padding: '8px',
        borderRadius: '4px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    statCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center'
    },
    statIcon: { fontSize: '32px', marginBottom: '8px' },
    statValue: { fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '4px' },
    statLabel: { fontSize: '13px', color: '#b9bbbe' },
    section: {
        padding: '20px',
        borderBottom: '1px solid #1e1f22',
        overflowY: 'auto'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    sectionTitle: {
        color: '#fff',
        fontSize: '18px',
        fontWeight: '600',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    masterSwitch: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer'
    },
    switchSlider: {
        position: 'relative',
        width: '48px',
        height: '24px',
        backgroundColor: '#72767d',
        borderRadius: '24px',
        transition: '0.3s'
    },
    switchLabel: { color: '#fff', fontSize: '14px', fontWeight: '600' },
    settings: { display: 'flex', flexDirection: 'column', gap: '20px' },
    setting: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: '#1e1f22',
        borderRadius: '8px'
    },
    settingInfo: { flex: 1 },
    settingLabel: { color: '#fff', fontSize: '15px', fontWeight: '600', marginBottom: '4px' },
    settingDesc: { color: '#b9bbbe', fontSize: '13px' },
    slider: { width: '200px', marginLeft: '20px' },
    select: {
        backgroundColor: '#2b2d31',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '8px 12px',
        color: '#fff',
        fontSize: '14px',
        marginLeft: '20px',
        minWidth: '150px'
    },
    toggleSwitch: {
        position: 'relative',
        width: '48px',
        height: '24px',
        marginLeft: '20px'
    },
    toggleSlider: {
        position: 'absolute',
        cursor: 'pointer',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: '#72767d',
        transition: '0.3s',
        borderRadius: '24px'
    },
    lockdownBtn: {
        backgroundColor: '#ed4245',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginLeft: '20px'
    },
    lockdownDeactivateBtn: {
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        marginLeft: '20px'
    },
    activityList: { display: 'flex', flexDirection: 'column', gap: '12px' },
    empty: { textAlign: 'center', color: '#b9bbbe', padding: '40px', fontSize: '14px' },
    activityItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#1e1f22',
        borderRadius: '6px'
    },
    activityIcon: { fontSize: '24px' },
    activityContent: { flex: 1 },
    activityText: { color: '#fff', fontSize: '14px', marginBottom: '4px' },
    activityTime: { color: '#72767d', fontSize: '12px' },
    activityAction: { marginLeft: 'auto' },
    actionBadge: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
        backgroundColor: '#5865f2',
        color: '#fff'
    },
    infoBox: {
        display: 'flex',
        gap: '16px',
        padding: '20px',
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        borderTop: '1px solid #5865f2'
    },
    infoIcon: { fontSize: '24px', color: '#5865f2', marginTop: '4px' },
    infoContent: { color: '#fff', fontSize: '14px' },
    infoList: { margin: '8px 0 0 0', paddingLeft: '20px', color: '#b9bbbe' }
};

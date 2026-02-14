const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
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
        maxWidth: '1000px',
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
    headerIcon: {
        fontSize: '24px',
        color: '#5865f2'
    },
    title: {
        margin: 0,
        color: '#fff',
        fontSize: '24px',
        fontWeight: '600'
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
    statIcon: {
        fontSize: '32px',
        marginBottom: '8px'
    },
    statValue: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '4px'
    },
    statLabel: {
        fontSize: '14px',
        color: '#b9bbbe'
    },
    section: {
        padding: '20px',
        borderBottom: '1px solid #1e1f22',
        overflowY: 'auto'
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
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
    addButton: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '8px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '14px',
        fontWeight: '600'
    },
    loading: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px',
        fontSize: '14px'
    },
    rulesList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    ruleCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px'
    },
    ruleHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    ruleType: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff'
    },
    ruleActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    switch: {
        position: 'relative',
        display: 'inline-block',
        width: '44px',
        height: '24px'
    },
    slider: {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#72767d',
        transition: '0.3s',
        borderRadius: '24px'
    },
    deleteBtn: {
        background: 'none',
        border: 'none',
        color: '#ed4245',
        cursor: 'pointer',
        fontSize: '18px',
        padding: '4px'
    },
    ruleDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    ruleInfo: {
        display: 'flex',
        gap: '8px',
        fontSize: '14px'
    },
    ruleLabel: {
        color: '#b9bbbe',
        fontWeight: '500'
    },
    ruleValue: {
        color: '#fff'
    },
    logsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    logItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        backgroundColor: '#1e1f22',
        borderRadius: '6px',
        padding: '12px'
    },
    logIcon: {
        fontSize: '24px'
    },
    logContent: {
        flex: 1
    },
    logText: {
        color: '#fff',
        fontSize: '14px',
        marginBottom: '4px'
    },
    logMeta: {
        color: '#72767d',
        fontSize: '12px'
    },
    logAction: {
        marginLeft: 'auto'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001
    },
    modal: {
        backgroundColor: '#2b2d31',
        borderRadius: '12px',
        padding: '24px',
        width: '90%',
        maxWidth: '500px'
    },
    modalTitle: {
        color: '#fff',
        fontSize: '20px',
        marginBottom: '20px'
    },
    formGroup: {
        marginBottom: '16px'
    },
    label: {
        display: 'block',
        color: '#b9bbbe',
        fontSize: '14px',
        marginBottom: '8px',
        fontWeight: '500'
    },
    select: {
        width: '100%',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '10px',
        color: '#fff',
        fontSize: '14px'
    },
    input: {
        width: '100%',
        backgroundColor: '#1e1f22',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '10px',
        color: '#fff',
        fontSize: '14px'
    },
    modalButtons: {
        display: 'flex',
        gap: '12px',
        justifyContent: 'flex-end',
        marginTop: '20px'
    },
    cancelBtn: {
        backgroundColor: '#4e5058',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    createBtn: {
        backgroundColor: '#5865f2',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600'
    }
};

export default styles;

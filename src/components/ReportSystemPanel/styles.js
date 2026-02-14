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
        color: '#f0b132'
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
        padding: '8px'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
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
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: '4px'
    },
    statLabel: {
        fontSize: '13px',
        color: '#b9bbbe'
    },
    filters: {
        padding: '16px 20px',
        borderBottom: '1px solid #1e1f22',
        backgroundColor: '#1e1f22'
    },
    filterGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    filterIcon: {
        color: '#b9bbbe',
        fontSize: '16px'
    },
    filterSelect: {
        backgroundColor: '#2b2d31',
        border: '1px solid #1e1f22',
        borderRadius: '6px',
        padding: '8px 12px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer'
    },
    reportsList: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    loading: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '40px',
        fontSize: '14px'
    },
    empty: {
        textAlign: 'center',
        color: '#b9bbbe',
        padding: '60px'
    },
    emptyIcon: {
        fontSize: '48px',
        marginBottom: '16px',
        opacity: 0.5
    },
    reportCard: {
        backgroundColor: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '12px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
            backgroundColor: '#2b2d31'
        }
    },
    reportHeader: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '12px'
    },
    reportIcon: {
        fontSize: '20px',
        color: '#f0b132',
        marginTop: '4px'
    },
    reportInfo: {
        flex: 1
    },
    reportTitle: {
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '4px'
    },
    reportMeta: {
        color: '#72767d',
        fontSize: '13px',
        display: 'flex',
        gap: '8px'
    },
    reportBadges: {
        display: 'flex',
        gap: '8px'
    },
    badge: {
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#fff',
        textTransform: 'uppercase'
    },
    reportContent: {
        paddingLeft: '32px'
    },
    reportText: {
        color: '#b9bbbe',
        fontSize: '14px',
        margin: '0 0 12px 0'
    },
    reportedContent: {
        backgroundColor: '#2b2d31',
        padding: '12px',
        borderRadius: '6px',
        borderLeft: '3px solid #ed4245',
        marginBottom: '12px'
    },
    reportedUser: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#b9bbbe',
        fontSize: '13px'
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
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px',
        borderBottom: '1px solid #1e1f22'
    },
    modalTitle: {
        margin: 0,
        color: '#fff',
        fontSize: '20px',
        fontWeight: '600'
    },
    modalClose: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        fontSize: '20px'
    },
    modalContent: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    detailRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #1e1f22',
        color: '#fff',
        fontSize: '14px'
    },
    detailSection: {
        marginTop: '20px'
    },
    detailText: {
        color: '#b9bbbe',
        fontSize: '14px',
        marginTop: '8px',
        lineHeight: '1.5'
    },
    messageBox: {
        backgroundColor: '#1e1f22',
        padding: '12px',
        borderRadius: '6px',
        borderLeft: '3px solid #ed4245',
        color: '#fff',
        fontSize: '14px',
        marginTop: '8px'
    },
    modalActions: {
        display: 'flex',
        gap: '12px',
        padding: '16px 20px',
        borderTop: '1px solid #1e1f22',
        flexWrap: 'wrap'
    },
    actionBtn: {
        flex: 1,
        backgroundColor: '#43b581',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '10px 16px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minWidth: '120px'
    }
};

export default styles;

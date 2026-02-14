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
        padding: '20px'
    },
    panel: {
        backgroundColor: '#2f3136',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        borderBottom: '1px solid #202225'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerActions: {
        display: 'flex',
        gap: '12px'
    },
    title: {
        margin: 0,
        fontSize: '20px',
        color: '#ffffff'
    },
    createButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    closeButton: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '8px'
    },
    filters: {
        display: 'flex',
        gap: '8px',
        padding: '16px 20px',
        borderBottom: '1px solid #202225'
    },
    filterButton: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        color: '#ffffff',
        cursor: 'pointer',
        fontSize: '13px'
    },
    content: {
        flex: 1,
        overflowY: 'auto',
        padding: '20px'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#b9bbbe'
    },
    tournamentGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px'
    },
    tournamentCard: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start'
    },
    tournamentName: {
        color: '#ffffff',
        fontSize: '16px',
        fontWeight: 'bold',
        flex: 1
    },
    statusBadge: {
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '11px',
        color: '#ffffff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    cardBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    cardInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#b9bbbe',
        fontSize: '13px'
    },
    cardFooter: {
        display: 'flex',
        gap: '8px',
        marginTop: 'auto'
    },
    viewButton: {
        flex: 1,
        backgroundColor: '#202225',
        color: '#ffffff',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px'
    },
    joinButton: {
        flex: 1,
        backgroundColor: '#3ba55d',
        color: '#ffffff',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 'bold'
    },
    leaveButton: {
        flex: 1,
        backgroundColor: '#ed4245',
        color: '#ffffff',
        border: 'none',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '13px'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10001
    },
    modal: {
        backgroundColor: '#36393f',
        borderRadius: '8px',
        padding: '24px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
    },
    modalTitle: {
        color: '#ffffff',
        marginBottom: '16px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    input: {
        width: '100%',
        backgroundColor: '#202225',
        border: 'none',
        color: '#dcddde',
        padding: '10px',
        borderRadius: '4px',
        fontSize: '14px',
        outline: 'none'
    },
    modalButtons: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'flex-end',
        marginTop: '16px'
    },
    cancelButton: {
        backgroundColor: 'transparent',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    submitButton: {
        backgroundColor: '#5865f2',
        color: '#ffffff',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '500'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    modalClose: {
        background: 'none',
        border: 'none',
        color: '#b9bbbe',
        cursor: 'pointer',
        padding: '4px'
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
    },
    detailSection: {
        backgroundColor: '#2f3136',
        padding: '16px',
        borderRadius: '8px'
    },
    bracketInfo: {
        textAlign: 'center',
        padding: '20px',
        color: '#b9bbbe'
    },
    participantList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '8px'
    },
    participant: {
        backgroundColor: '#36393f',
        padding: '8px 12px',
        borderRadius: '4px',
        color: '#dcddde',
        fontSize: '13px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    seed: {
        color: '#faa61a',
        fontWeight: 'bold'
    }
};

export default styles;

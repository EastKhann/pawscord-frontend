export const styles = {
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
        zIndex: 999999
    },
    modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        color: '#fff'
    },
    header: {
        padding: '20px',
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    addBtn: {
        padding: '8px 16px',
        backgroundColor: '#43b581',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '8px'
    },
    content: {
        padding: '20px',
        overflowY: 'auto',
        flex: 1
    },
    loading: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    },
    empty: {
        textAlign: 'center',
        padding: '60px 20px',
        color: '#dcddde'
    },
    createForm: {
        maxWidth: '600px',
        margin: '0 auto'
    },
    formTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '24px'
    },
    formGroup: {
        marginBottom: '20px'
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '16px'
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#dcddde'
    },
    input: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
        boxSizing: 'border-box'
    },
    select: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px'
    },
    checkboxGroup: {
        marginBottom: '20px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    checkbox: {
        width: '18px',
        height: '18px',
        cursor: 'pointer'
    },
    formActions: {
        display: 'flex',
        gap: '12px',
        marginTop: '24px'
    },
    submitBtn: {
        flex: 1,
        padding: '12px',
        backgroundColor: '#5865f2',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
    },
    cancelBtn: {
        padding: '12px 24px',
        backgroundColor: '#4e5058',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer'
    },
    announcementsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    announcementCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        gap: '16px',
        position: 'relative',
        overflow: 'hidden'
    },
    statusIndicator: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px'
    },
    announcementContent: {
        flex: 1,
        paddingLeft: '12px'
    },
    announcementTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '8px'
    },
    announcementMessage: {
        fontSize: '14px',
        color: '#dcddde',
        marginBottom: '12px',
        lineHeight: '1.6'
    },
    announcementMeta: {
        fontSize: '12px',
        color: '#99aab5',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    announcementActions: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px'
    },
    deleteIconBtn: {
        padding: '8px',
        backgroundColor: '#f04747',
        border: 'none',
        borderRadius: '6px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '14px'
    }
};

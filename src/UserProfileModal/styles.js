// UserProfileModal/styles.js
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
        zIndex: 1000,
        backdropFilter: 'blur(8px)'
    },
    modal: {
        width: '500px',
        maxWidth: '90vw',
        backgroundColor: '#2f3136',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        maxHeight: '90vh',
        border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    actionButton: {
        padding: '12px 20px',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontSize: '14px',
        transition: 'all 0.2s',
        cursor: 'pointer'
    },
    messageButton: {
        padding: '12px 20px',
        backgroundColor: '#5865f2',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.9em'
    },
    content: {
        padding: '20px',
        maxHeight: '60vh',
        overflowY: 'auto'
    },
    username: {
        color: 'var(--text-primary)',
        margin: '0 0 10px 0',
        fontSize: '1.8em'
    },
    friendCodeContainer: {
        backgroundColor: 'rgba(88, 101, 242, 0.1)',
        padding: '10px 15px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px dashed #5865f2',
        marginBottom: '15px',
        transition: 'background-color 0.2s'
    },
    friendCodeLabel: {
        fontSize: '0.75em',
        color: '#949ba4',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    friendCodeValue: {
        fontSize: '1.3em',
        color: '#5865f2',
        fontWeight: '800',
        letterSpacing: '2px'
    },
    section: {
        marginTop: '20px'
    },
    sectionTitle: {
        color: 'var(--text-secondary)',
        fontSize: '0.8em',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        margin: '0 0 8px 0',
        borderBottom: '1px solid var(--border-primary)',
        paddingBottom: '5px'
    },
    statusText: {
        color: 'var(--text-primary)',
        margin: 0,
        fontSize: '0.9em'
    },
    linksContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    linkButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '4px',
        color: 'var(--text-primary)',
        textDecoration: 'none',
        transition: 'background-color 0.2s ease',
        border: 'none',
        fontFamily: 'inherit',
        fontSize: '1em',
        width: 'auto',
        cursor: 'pointer',
        textAlign: 'left',
        alignSelf: 'flex-start'
    },
    linkText: {
        marginLeft: '10px',
        fontWeight: '500'
    },
    tabsContainer: {
        display: 'flex',
        gap: '10px',
        borderBottom: '2px solid var(--background-tertiary)',
        marginBottom: '20px'
    },
    tabButton: {
        background: 'none',
        border: 'none',
        padding: '10px 20px',
        color: 'var(--text-secondary)',
        cursor: 'pointer',
        fontWeight: '500',
        borderBottom: '2px solid transparent',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
    },
    activeTab: {
        color: 'var(--brand-color)',
        borderBottomColor: 'var(--brand-color)'
    },
    presenceTimeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '15px'
    },
    presenceEntry: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px',
        backgroundColor: 'var(--background-secondary)',
        borderRadius: '6px',
        transition: 'background-color 0.2s'
    },
    presenceStatus: {
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        flexShrink: 0
    },
    presenceDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: 1
    },
    presenceStatusText: {
        color: 'var(--text-primary)',
        fontWeight: '500',
        fontSize: '0.95em'
    },
    presenceTime: {
        color: 'var(--text-secondary)',
        fontSize: '0.85em'
    },
    noDataText: {
        color: 'var(--text-secondary)',
        textAlign: 'center',
        padding: '20px',
        fontStyle: 'italic'
    }
};

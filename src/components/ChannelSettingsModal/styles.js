// frontend/src/components/ChannelSettingsModal/styles.js
// Extracted from ChannelSettingsModal.js

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
        overflow: 'auto'
    },
    modal: {
        background: '#313338',
        width: '960px',
        maxWidth: '100%',
        borderRadius: '8px',
        overflow: 'hidden',
        maxHeight: 'calc(100vh - 40px)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '600px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
        position: 'relative',
        alignSelf: 'center'
    },
    header: {
        padding: '24px 28px',
        borderBottom: '1px solid #1e1f22',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        flexShrink: 0
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#bbb',
        cursor: 'pointer',
        fontSize: '1.4em',
        transition: 'color 0.2s',
        padding: '8px'
    },
    tabs: {
        display: 'flex',
        borderBottom: '1px solid #1e1f22',
        background: '#2b2d31',
        flexShrink: 0
    },
    tab: {
        flex: 1,
        padding: '14px 20px',
        background: 'transparent',
        border: 'none',
        color: '#949ba4',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '1em',
        transition: 'all 0.2s',
        borderBottom: '2px solid transparent'
    },
    tabActive: {
        flex: 1,
        padding: '14px 20px',
        background: 'transparent',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        fontSize: '1em',
        fontWeight: 'bold',
        borderBottom: '2px solid #5865f2'
    },
    body: {
        padding: '28px 32px',
        overflowY: 'auto',
        flex: 1
    },
    section: {
        marginBottom: '24px',
        color: '#dbdee1',
        fontSize: '1em'
    },
    input: {
        width: '100%',
        padding: '12px 14px',
        background: '#1e1f22',
        border: '1px solid #1e1f22',
        color: 'white',
        borderRadius: '6px',
        marginTop: '8px',
        boxSizing: 'border-box',
        fontSize: '0.95em',
        transition: 'border-color 0.2s'
    },
    rolesList: {
        maxHeight: '250px',
        overflowY: 'auto',
        background: '#2b2d31',
        padding: '12px',
        borderRadius: '6px',
        marginTop: '12px'
    },
    roleItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 12px',
        cursor: 'pointer',
        borderBottom: '1px solid #333',
        color: 'white',
        alignItems: 'center',
        fontSize: '0.95em',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
    },
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '28px',
        paddingTop: '20px',
        borderTop: '1px solid #1e1f22'
    },
    saveBtn: {
        background: '#23a559',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontWeight: 'bold',
        fontSize: '0.95em',
        transition: 'background-color 0.2s'
    },
    deleteBtn: {
        background: 'transparent',
        color: '#da373c',
        border: '1px solid #da373c',
        padding: '12px 24px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: '0.95em',
        transition: 'all 0.2s'
    },
    permissionsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: '1px solid #1e1f22'
    },
    addPermBtn: {
        background: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '0.9em',
        fontWeight: 'bold'
    },
    permSection: {
        marginBottom: '20px'
    },
    permissionItem: {
        background: '#2b2d31',
        padding: '12px',
        borderRadius: '6px',
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        position: 'relative'
    },
    removeBtn: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: '#da373c',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.8em'
    },
    addPermModal: {
        background: '#2b2d31',
        padding: '20px',
        borderRadius: '8px',
        marginTop: '20px',
        border: '2px solid #5865f2'
    },
    cancelBtn: {
        background: 'transparent',
        color: '#b9bbbe',
        border: '1px solid #4e5058',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.95em',
        transition: 'all 0.2s'
    },
    confirmBtn: {
        background: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.95em',
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
    },
    label: {
        color: '#b5bac1',
        fontSize: '0.875em',
        fontWeight: '600',
        textTransform: 'uppercase',
        marginBottom: '8px',
        display: 'block',
        letterSpacing: '0.5px'
    },
    checkboxLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        fontSize: '0.95em',
        padding: '8px 0'
    },
    // 🔗 ENTEGRASYONLAR TAB STİLLERİ
    integrationHeader: {
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid #1e1f22'
    },
    integrationCard: {
        background: '#2b2d31',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: '1px solid #3f4147',
        transition: 'border-color 0.2s'
    },
    integrationCardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    integrationIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        background: 'rgba(88, 101, 242, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    integrationTitle: {
        color: '#fff',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: 0
    },
    integrationDesc: {
        color: '#72767d',
        fontSize: '0.85em',
        margin: '4px 0 0 0'
    },
    integrationBtn: {
        background: '#5865f2',
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9em',
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
    },
    // ⚙️ GELİŞMİŞ TAB STİLLERİ
    advancedSection: {
        background: '#2b2d31',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '16px',
        border: '1px solid #3f4147'
    },
    advancedSectionTitle: {
        color: '#fff',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    advancedOption: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderTop: '1px solid #3f4147'
    },
    advancedOptionTitle: {
        color: '#dbdee1',
        fontSize: '0.95em',
        fontWeight: '500',
        margin: 0
    },
    advancedOptionDesc: {
        color: '#72767d',
        fontSize: '0.8em',
        margin: '4px 0 0 0'
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px'
    },
    statBox: {
        background: '#1e1f22',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px'
    },
    statValue: {
        color: '#5865f2',
        fontSize: '1.5em',
        fontWeight: 'bold'
    },
    statLabel: {
        color: '#72767d',
        fontSize: '0.8em'
    },
    dangerZone: {
        background: 'rgba(237, 66, 69, 0.1)',
        borderRadius: '12px',
        padding: '20px',
        marginTop: '24px',
        border: '1px solid rgba(237, 66, 69, 0.3)'
    },
    dangerZoneTitle: {
        color: '#ed4245',
        fontSize: '1em',
        fontWeight: 'bold',
        margin: '0 0 16px 0',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    dangerBtnSmall: {
        background: '#ed4245',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.85em',
        fontWeight: 'bold'
    },
    dangerBtnLarge: {
        background: '#ed4245',
        color: 'white',
        border: 'none',
        padding: '12px 24px',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.9em',
        fontWeight: 'bold',
        transition: 'background-color 0.2s'
    }
};

export default styles;

const localStyles = {
    container: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#313338', color: '#dcddde' },
    topBar: {
        padding: '10px 15px', borderBottom: '1px solid #1f2023', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', backgroundColor: '#313338', height: '50px', boxSizing: 'border-box'
    },
    headerLeft: { display: 'flex', alignItems: 'center', flex: 1, overflow: 'hidden' },
    title: {
        fontSize: '1em', fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center',
        marginRight: '10px', paddingRight: '10px', borderRight: '1px solid #4f545c', whiteSpace: 'nowrap'
    },
    tabButtons: { display: 'flex', gap: '10px', overflowX: 'auto' },
    tabBtn: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '0.9em', padding: '2px 8px', borderRadius: '4px', fontWeight: '500', transition: 'all 0.2s', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '5px' },
    activeTabBtn: { color: '#fff', backgroundColor: 'rgba(79,84,92,0.32)' },
    addFriendBtn: { backgroundColor: '#23a559', color: '#fff', border: 'none', borderRadius: '4px', padding: '2px 10px', fontSize: '0.9em', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' },
    activeAddFriendBtn: { backgroundColor: 'transparent', color: '#23a559', border: '1px solid transparent' },
    closeHeaderBtn: { background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.5em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', borderRadius: '50%' },
    contentArea: { flexGrow: 1, padding: '20px', overflowY: 'auto' },
    addSection: { maxWidth: '100%', borderBottom: '1px solid #4f545c', paddingBottom: '20px' },
    addForm: {
        display: 'flex', flexDirection: window.innerWidth <= 768 ? 'column' : 'row', gap: '10px',
        backgroundColor: '#1e1f22', padding: '10px', borderRadius: '8px', border: '1px solid #1e1f22',
        alignItems: 'stretch', marginTop: '10px'
    },
    input: { flexGrow: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '1em', outline: 'none', minHeight: '40px' },
    sendRequestBtn: { backgroundColor: '#5865f2', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' },
    listContainer: {},
    listHeader: { fontSize: '0.8em', color: '#b9bbbe', textTransform: 'uppercase', marginBottom: '15px', borderBottom: '1px solid #4f545c', paddingBottom: '10px' },
    emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '50px' },
    emptyText: { color: '#72767d', fontStyle: 'italic', marginBottom: '20px', textAlign: 'center' },
    emptyBtn: { padding: '10px 20px', backgroundColor: '#5865f2', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' },
    listItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderTop: '1px solid #4f545c', cursor: 'pointer', transition: 'background-color 0.2s' },
    userInfo: { display: 'flex', alignItems: 'center' },
    avatar: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' },
    username: { color: '#fff', fontWeight: '600' },
    status: { fontSize: '0.8em', color: '#b9bbbe' },
    actions: { display: 'flex', gap: '10px' },
    iconButton: { padding: '8px', borderRadius: '50%', backgroundColor: '#2f3136', border: 'none', color: '#b9bbbe', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    acceptBtn: { padding: '8px', borderRadius: '50%', backgroundColor: '#2f3136', border: 'none', color: '#43b581', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    rejectBtn: { padding: '8px', borderRadius: '50%', backgroundColor: '#2f3136', border: 'none', color: '#f04747', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    badgePulse: {
        backgroundColor: '#f04747', color: '#fff', borderRadius: '50%', padding: '1px 6px', fontSize: '0.75em', marginLeft: '5px',
        animation: 'pulseBadge 1.5s infinite'
    }
};

// CSS Animations
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  @keyframes pulseBadge {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(240, 71, 71, 0.7); }
    70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(240, 71, 71, 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(240, 71, 71, 0); }
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(styleSheet);

export default localStyles;

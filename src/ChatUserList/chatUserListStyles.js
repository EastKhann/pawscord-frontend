export const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: 'transparent',
        overflowY: 'auto'
    },
    emptyState: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 16px 8px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0
    },
    headerTitle: {
        fontSize: '12px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    headerCount: {
        fontSize: '11px',
        color: '#72767d',
        fontWeight: '500'
    },
    userList: {
        padding: '8px',
        overflowY: 'auto',
        flex: 1
    },
    sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 8px 4px 8px',
        marginBottom: '4px'
    },
    sectionTitle: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    userItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        marginBottom: '2px'
    },
    avatarContainer: {
        position: 'relative',
        flexShrink: 0
    },
    avatar: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        objectFit: 'cover'
    },
    statusDot: {
        position: 'absolute',
        bottom: '-2px',
        right: '-2px',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        border: '2px solid rgba(30, 31, 34, 1)'
    },
    userInfo: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    usernameRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
    },
    username: {
        fontSize: '14px',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    customStatus: {
        fontSize: '12px',
        color: '#b9bbbe',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    activityRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        marginTop: '2px',
        overflow: 'hidden'
    },
    quickAccessSection: {
        padding: '16px',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    quickAccessHeader: {
        fontSize: '11px',
        fontWeight: '600',
        color: '#b9bbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginBottom: '4px'
    },
    quickAccessButton: {
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)',
        border: 'none',
        borderRadius: '6px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 2px 8px rgba(88, 101, 242, 0.3)'
    },
    pawscordLogo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '8px',
        padding: '12px',
        borderRadius: '8px',
        background: 'rgba(255, 255, 255, 0.02)'
    }
};

// Hover effect (CSS-in-JS alternative)
if (typeof window !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
    .user-item:hover {
      background-color: rgba(79, 84, 92, 0.3) !important;
    }
  `;
    document.head.appendChild(styleSheet);
}

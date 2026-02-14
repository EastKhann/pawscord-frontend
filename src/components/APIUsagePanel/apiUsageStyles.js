export const calculateTimeUntilReset = (resetAt) => {
    const now = new Date();
    const reset = new Date(resetAt);
    const diff = reset - now;

    if (diff <= 0) return 'Soon';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

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
        width: '95%',
        maxWidth: '1200px',
        maxHeight: '90vh',
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
    timeRangeSelect: {
        padding: '8px 12px',
        backgroundColor: '#2c2f33',
        border: '1px solid #444',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '14px',
        cursor: 'pointer'
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
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
    },
    statCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    statIcon: {
        fontSize: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    statInfo: {
        flex: 1
    },
    statValue: {
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '4px'
    },
    statLabel: {
        fontSize: '12px',
        color: '#99aab5',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    section: {
        marginBottom: '32px'
    },
    sectionTitle: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '16px'
    },
    rateLimitCard: {
        backgroundColor: '#2c2f33',
        borderRadius: '8px',
        padding: '20px',
        borderLeft: '4px solid'
    },
    rateLimitInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px'
    },
    rateLimitText: {
        fontSize: '14px',
        fontWeight: '600'
    },
    rateLimitStatus: {
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    rateLimitBar: {
        height: '8px',
        backgroundColor: '#202225',
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '8px'
    },
    rateLimitProgress: {
        height: '100%',
        transition: 'width 0.3s ease'
    },
    rateLimitReset: {
        fontSize: '12px',
        color: '#99aab5'
    },
    endpointsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    endpointItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'background 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    endpointRank: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#5865f2',
        minWidth: '40px'
    },
    endpointDetails: {
        flex: 1
    },
    endpointPath: {
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '4px',
        fontFamily: 'monospace'
    },
    endpointMethod: {
        display: 'inline-block',
        padding: '2px 8px',
        backgroundColor: '#5865f2',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 'bold',
        marginRight: '8px'
    },
    endpointStats: {
        fontSize: '12px',
        color: '#99aab5'
    },
    endpointBar: {
        width: '100px',
        height: '6px',
        backgroundColor: '#202225',
        borderRadius: '3px',
        overflow: 'hidden'
    },
    endpointBarFill: {
        height: '100%',
        transition: 'width 0.3s ease'
    },
    timeline: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    timelineItem: {
        backgroundColor: '#2c2f33',
        borderRadius: '6px',
        padding: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
    },
    timelineIcon: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff'
    },
    timelineContent: {
        flex: 1
    },
    timelinePath: {
        fontSize: '14px',
        fontWeight: '600',
        fontFamily: 'monospace',
        marginBottom: '4px'
    },
    timelineMethod: {
        display: 'inline-block',
        padding: '2px 6px',
        backgroundColor: '#5865f2',
        borderRadius: '3px',
        fontSize: '10px',
        fontWeight: 'bold',
        marginRight: '8px'
    },
    timelineMeta: {
        fontSize: '12px',
        color: '#99aab5'
    },
    empty: {
        textAlign: 'center',
        padding: '40px',
        color: '#99aab5'
    }
};

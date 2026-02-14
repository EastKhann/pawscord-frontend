const S = {
    overlay: {
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5000,
    },
    modal: {
        display: 'flex', width: '95vw', maxWidth: 900, height: '85vh',
        backgroundColor: '#313338', borderRadius: 12, overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    },
    sidebar: {
        width: 220, backgroundColor: '#2b2d31', flexShrink: 0,
        display: 'flex', flexDirection: 'column',
    },
    sidebarScroll: {
        flex: 1, overflowY: 'auto', padding: '12px 8px',
    },
    sectionLabel: {
        fontSize: 11, fontWeight: 700, color: '#949ba4', padding: '8px 10px 4px',
        letterSpacing: '0.04em',
    },
    tabBtn: {
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 10px', border: 'none', borderRadius: 4,
        cursor: 'pointer', fontSize: 14, fontWeight: 500,
        textAlign: 'left', transition: 'all 0.1s',
        background: 'transparent',
    },
    divider: {
        height: 1, backgroundColor: 'rgba(255,255,255,0.06)', margin: '8px 10px',
    },
    content: {
        flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    },
    contentHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    closeBtn: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        background: 'none', border: '2px solid #949ba4', color: '#949ba4',
        width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
        justifyContent: 'center', fontSize: 14, transition: 'all 0.15s',
    },
    contentBody: {
        flex: 1, overflowY: 'auto', padding: '20px 24px',
    },
    actionBtn: {
        padding: '8px 16px', backgroundColor: 'rgba(88,101,242,0.1)',
        border: '1px solid rgba(88,101,242,0.3)', borderRadius: 4,
        color: '#5865f2', cursor: 'pointer', fontSize: 14, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 8,
    },
    themeBtn: {
        width: 100, height: 70, borderRadius: 8, border: '2px solid',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', transition: 'border-color 0.15s',
    },
    kbd: {
        padding: '3px 8px', backgroundColor: '#1e1f22', borderRadius: 4,
        color: '#dcddde', fontSize: 12, fontFamily: 'monospace',
        border: '1px solid rgba(255,255,255,0.08)',
    },
    volumeRow: {
        display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
    },
};

export default S;

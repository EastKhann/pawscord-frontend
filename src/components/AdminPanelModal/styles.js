// AdminPanelModal styles - extracted from AdminPanelModal.js
const styles = {
    overlay: {
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.92)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        backdropFilter: 'blur(8px)'
    },
    modal: {
        width: '96%',
        maxWidth: '1600px',
        height: '94vh',
        backgroundColor: '#0f0f10',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
        border: '1px solid #1f2023'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 24px',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderBottom: '1px solid #2d2f34'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    title: { color: '#fff', fontSize: '18px', fontWeight: '700', margin: 0 },
    closeButton: {
        background: 'rgba(255,255,255,0.1)',
        border: 'none', color: '#fff', cursor: 'pointer',
        padding: '10px', borderRadius: '8px', fontSize: '18px'
    },
    body: { display: 'flex', flex: 1, overflow: 'hidden' },
    sidebar: {
        width: '200px',
        backgroundColor: '#0d0d0f',
        padding: '10px 8px',
        overflowY: 'auto',
        borderRight: '1px solid #1f2023'
    },
    sidebarButton: (active) => ({
        width: '100%',
        padding: '10px 12px',
        background: active ? 'linear-gradient(135deg, #5865f2 0%, #7c3aed 100%)' : 'transparent',
        border: 'none',
        borderRadius: '8px',
        color: active ? '#fff' : '#8b8d91',
        cursor: 'pointer',
        fontWeight: active ? '600' : '500',
        fontSize: '12px',
        textAlign: 'left',
        transition: 'all 0.15s',
        marginBottom: '3px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    }),
    content: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',
        backgroundColor: '#111113'
    },
    statCard: {
        backgroundColor: '#1a1a1e',
        borderRadius: '12px',
        padding: '16px',
        border: '1px solid #2a2a2e'
    },
    statValue: { fontSize: '28px', fontWeight: '700', color: '#fff' },
    statLabel: { fontSize: '11px', color: '#8b8d91', textTransform: 'uppercase', letterSpacing: '0.5px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: {
        padding: '12px', textAlign: 'left', backgroundColor: '#0d0d0f',
        color: '#8b8d91', fontWeight: '600', fontSize: '11px',
        textTransform: 'uppercase', borderBottom: '1px solid #2a2a2e'
    },
    td: { padding: '12px', color: '#e5e7eb', fontSize: '13px', borderBottom: '1px solid #1f2023' },
    actionBtn: (color) => ({
        padding: '6px 10px', backgroundColor: color, border: 'none',
        borderRadius: '6px', color: '#fff', cursor: 'pointer',
        fontSize: '11px', fontWeight: '500', marginRight: '4px'
    }),
    searchInput: {
        flex: 1, padding: '10px 14px', backgroundColor: '#1a1a1e',
        border: '1px solid #2a2a2e', borderRadius: '8px',
        color: '#fff', fontSize: '13px', outline: 'none'
    },
    badge: (color) => ({
        display: 'inline-block', padding: '3px 8px', borderRadius: '12px',
        fontSize: '10px', fontWeight: '600', backgroundColor: `${color}20`, color: color
    }),
    miniCard: {
        backgroundColor: '#1a1a1e', borderRadius: '8px', padding: '12px',
        border: '1px solid #2a2a2e', textAlign: 'center'
    }
};

export default styles;

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999,
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backdropFilter: 'blur(8px)'
    },
    container: {
        backgroundColor: '#2f3136', borderRadius: '16px', width: '90%', maxWidth: '900px',
        maxHeight: '85vh', overflow: 'auto', padding: '32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'
    },
    title: {
        margin: 0, fontSize: '1.5em', color: '#fff'
    },
    closeBtn: {
        background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.5em', cursor: 'pointer'
    },
    section: {
        marginBottom: '20px'
    },
    sectionTitle: (color) => ({
        color, fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px'
    }),
    grid: {
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px'
    },
    button: {
        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px',
        backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px',
        transition: 'all 0.2s', textAlign: 'left'
    },
    buttonIcon: {
        fontSize: '16px'
    },
};

export default styles;

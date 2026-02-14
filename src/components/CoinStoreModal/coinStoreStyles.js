export const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
    animation: 'fadeIn 0.2s ease-in'
  },
  modal: {
    background: 'linear-gradient(135deg, #2a2d35 0%, #1e2024 100%)',
    borderRadius: '24px',
    maxWidth: '1000px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(255, 215, 0, 0.1)',
    border: '1px solid rgba(255, 215, 0, 0.2)',
    animation: 'slideUp 0.3s ease-out'
  },
  header: {
    position: 'sticky',
    top: 0,
    background: 'linear-gradient(135deg, #2a2d35 0%, #1e2024 100%)',
    borderBottom: '2px solid rgba(255, 215, 0, 0.15)',
    padding: '24px 32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
    borderRadius: '24px 24px 0 0'
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px'
  },
  coinIcon: { fontSize: '36px', color: '#ffd700', filter: 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))' },
  balanceText: { fontSize: '14px', color: '#b9bbbe', marginTop: '4px' },
  balanceAmount: { color: '#ffd700', fontWeight: 'bold', fontSize: '16px', textShadow: '0 0 10px rgba(255, 215, 0, 0.3)' },
  closeBtn: {
    color: '#b9bbbe',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  packagesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px'
  },
  infoBox: {
    marginTop: '32px',
    padding: '24px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
  },
  infoList: { fontSize: '14px', color: '#dcddde', display: 'flex', flexDirection: 'column', gap: '12px' },
  infoItem: { display: 'flex', alignItems: 'flex-start', gap: '10px' }
};

export const ANIMATIONS_CSS = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%, 100% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.05); } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes rotate { to { transform: rotate(360deg); } }
`;

export const INFO_ITEMS = [
  { icon: '✓', color: '#57f287', text: "Coin'ler hesabınıza anında eklenir" },
  { icon: '✓', color: '#57f287', text: 'Güvenli ödeme Stripe ile korunuyor' },
  { icon: '✓', color: '#57f287', text: "Bonus coin'ler belirli paketlere dahildir" },
  { icon: '⚠', color: '#faa61a', text: 'Test modunda çalışıyor - gerçek ödeme alınmıyor', small: true }
];

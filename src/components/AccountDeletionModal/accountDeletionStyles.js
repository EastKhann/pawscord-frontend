export const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, animation: 'fadeIn 0.2s ease' },
  modal: { backgroundColor: '#36393f', borderRadius: '8px', width: '480px', maxWidth: '95vw', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', animation: 'slideUp 0.3s ease' },
  header: { display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #2f3136', gap: '12px' },
  headerIcon: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, margin: 0, fontSize: '18px', fontWeight: '600', color: '#fff' },
  closeButton: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' },
  content: { padding: '20px' },
  warningBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px', backgroundColor: 'rgba(240,71,71,0.1)', borderRadius: '8px', marginBottom: '16px' },
  warningTitle: { color: '#f04747', margin: '12px 0 8px', fontSize: '18px' },
  warningText: { color: '#b9bbbe', margin: 0, fontSize: '14px' },
  deleteList: { listStyle: 'none', margin: '16px 0', backgroundColor: '#2f3136', borderRadius: '8px', padding: '16px 20px' },
  infoBox: { backgroundColor: 'rgba(250,166,26,0.1)', border: '1px solid rgba(250,166,26,0.3)', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px' },
  confirmBox: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px', marginBottom: '16px' },
  confirmTitle: { color: '#fff', margin: '12px 0 8px', fontSize: '16px' },
  confirmText: { color: '#b9bbbe', margin: 0, fontSize: '14px' },
  errorBox: { backgroundColor: 'rgba(240,71,71,0.2)', border: '1px solid #f04747', borderRadius: '4px', padding: '10px 14px', marginBottom: '16px', color: '#f04747', fontSize: '14px' },
  inputGroup: { marginBottom: '16px' },
  label: { display: 'block', color: '#b9bbbe', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' },
  code: { backgroundColor: '#2f3136', padding: '2px 6px', borderRadius: '3px', color: '#f04747', fontFamily: 'monospace' },
  input: { width: '100%', padding: '10px 12px', backgroundColor: '#202225', border: '1px solid #40444b', borderRadius: '4px', color: '#dcddde', fontSize: '14px', outline: 'none', transition: 'border-color 0.15s', boxSizing: 'border-box' },
  buttonGroup: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' },
  cancelButton: { padding: '10px 20px', backgroundColor: 'transparent', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '14px', cursor: 'pointer', transition: 'all 0.15s' },
  dangerButton: { padding: '10px 20px', backgroundColor: '#f04747', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s' },
  deleteButton: { padding: '10px 20px', backgroundColor: '#f04747', border: 'none', borderRadius: '4px', color: '#fff', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' }
};

// CSS Animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
`;
document.head.appendChild(styleSheet);

export default styles;

export const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
  },
  panel: {
    background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  },
  header: {
    padding: '24px 32px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    flexShrink: 0,
  },
  headerTitle: {
    color: '#fff', margin: 0, fontSize: '24px', fontWeight: 700,
  },
  content: {
    padding: '24px 32px',
    overflowY: 'auto',
    flex: 1,
  },
  section: {
    marginBottom: '20px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
  },
  sectionLast: {
    marginBottom: '32px',
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
  },
  checkLabel: {
    display: 'flex', alignItems: 'center', gap: '12px',
    cursor: 'pointer', color: '#fff',
  },
  checkbox: {
    width: '20px', height: '20px', cursor: 'pointer',
  },
  title: { fontWeight: 600, fontSize: '16px' },
  titleSmall: { fontWeight: 600, fontSize: '14px', marginBottom: '8px' },
  desc: {
    fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)', marginTop: '4px',
  },
  descNoMargin: {
    fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)',
  },
  sectionHeader: {
    marginBottom: '12px', color: '#fff',
  },
  sectionTitleRow: {
    fontWeight: 600, fontSize: '16px', marginBottom: '4px',
  },
  select: {
    width: '100%', padding: '10px',
    background: '#2b2d31',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    color: '#fff', fontSize: '14px', cursor: 'pointer',
  },
  footer: {
    padding: '20px 32px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    flexShrink: 0,
    display: 'flex', gap: '12px', justifyContent: 'flex-end',
    background: 'rgba(0, 0, 0, 0.2)',
  },
  cancelBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none', borderRadius: '8px',
    padding: '12px 24px', color: '#fff',
    cursor: 'pointer', fontSize: '14px', fontWeight: 600,
  },
  saveBtn: {
    background: 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)',
    border: 'none', borderRadius: '8px',
    padding: '12px 24px', color: '#fff',
    cursor: 'pointer', fontSize: '14px', fontWeight: 600,
    boxShadow: '0 4px 16px rgba(88, 101, 242, 0.4)',
  },
  testBtn: (isTesting) => ({
    width: '100%', padding: '10px',
    background: isTesting ? '#43b581' : '#5865f2',
    border: 'none', borderRadius: '8px',
    color: '#fff', fontSize: '14px', fontWeight: 600,
    cursor: 'pointer', marginBottom: '12px',
  }),
  levelBar: {
    height: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '4px', overflow: 'hidden', marginBottom: '8px',
  },
};
